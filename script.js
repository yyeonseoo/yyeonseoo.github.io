const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal-on-scroll");

if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.add("is-resetting");
          entry.target.classList.remove("is-visible");
          requestAnimationFrame(() => {
            entry.target.classList.remove("is-resetting");
          });
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
}

const carousel = document.querySelector(".project-carousel");

if (carousel) {
  const ring = carousel.querySelector(".project-ring");
  const items = [...carousel.querySelectorAll(".project-item")];
  const dots = [...carousel.querySelectorAll(".carousel-dots button")];
  const label = carousel.querySelector("#carousel-label");
  const date = carousel.querySelector("#carousel-date");
  const title = carousel.querySelector("#carousel-title");
  const detailLink = carousel.querySelector("#carousel-link");
  const stepAngle = 360 / items.length;
  let rotation = 0;
  let activeIndex = 0;
  let pointerStart = 0;
  let rotationStart = 0;
  let dragging = false;
  let moved = false;
  let pressedLink = null;

  const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;

  function render() {
    carousel.style.setProperty("--rotation", `${rotation}deg`);
  }

  function updateActive() {
    activeIndex = modulo(-Math.round(rotation / stepAngle), items.length);
    const active = items[activeIndex];
    items.forEach((item, index) => item.classList.toggle("is-active", index === activeIndex));
    dots.forEach((dot, index) => {
      const selected = index === activeIndex;
      dot.classList.toggle("is-active", selected);
      dot.toggleAttribute("aria-current", selected);
    });
    label.textContent = active.dataset.label;
    date.textContent = active.dataset.date;
    title.textContent = active.dataset.title;
    detailLink.href = active.dataset.href;
  }

  function snap() {
    rotation = Math.round(rotation / stepAngle) * stepAngle;
    render();
    updateActive();
  }

  function rotateBy(direction) {
    rotation -= direction * stepAngle;
    render();
    updateActive();
  }

  carousel.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    if (event.target.closest("button, .carousel-current a")) return;
    dragging = true;
    pressedLink = event.target.closest(".project-card");
    pointerStart = event.clientX;
    rotationStart = rotation;
    moved = false;
    carousel.classList.add("is-dragging");
    carousel.setPointerCapture(event.pointerId);
  });

  carousel.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    if (Math.abs(event.clientX - pointerStart) > 6) moved = true;
    rotation = rotationStart + (event.clientX - pointerStart) * 0.28;
    render();
    updateActive();
  });

  function endDrag(event) {
    if (!dragging) return;
    const linkToOpen = !moved ? pressedLink : null;
    dragging = false;
    pressedLink = null;
    carousel.classList.remove("is-dragging");
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
    snap();
    if (linkToOpen) window.location.href = linkToOpen.href;
  }

  carousel.addEventListener("pointerup", endDrag);
  carousel.addEventListener("pointercancel", endDrag);
  carousel.addEventListener("click", (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);
  carousel.querySelector(".carousel-prev").addEventListener("click", () => rotateBy(-1));
  carousel.querySelector(".carousel-next").addEventListener("click", () => rotateBy(1));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); rotateBy(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); rotateBy(1); }
  });
  dots.forEach((dot, targetIndex) => {
    dot.addEventListener("click", () => {
      const delta = modulo(targetIndex - activeIndex + 2, items.length) - 2;
      rotation -= delta * stepAngle;
      render();
      updateActive();
    });
  });

  render();
  updateActive();
}
