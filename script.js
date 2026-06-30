const projects = {
  uxui: {
    label: "01 · UX/UI · 2026.04—06",
    title: "사용자 없이 완성되는 프로젝트는 없다",
    image: "assets/uxui.png",
    alt: "AI 행정 비서 UXUI 프로젝트 화면",
    summary: "복잡하게 흩어진 대학 행정 정보를 학생 중심으로 재구성한 AI 행정 비서 서비스입니다. 자연어 문의를 분석해 공지사항을 우선 안내하고, 필요한 경우 담당 부서와 절차를 연결합니다.",
    details: [
      ["초기 설계", "AI 부서 라우팅, 실시간 채팅, 문의 이력 관리, 부서별 업무 안내를 중심으로 프로토타입을 설계했습니다."],
      ["사용자 검증", "민원인과 행정 담당자를 대상으로 사용성 테스트를 진행해 문의 이송 과정과 서비스 진입성의 문제를 확인했습니다."],
      ["개선", "이송 상태 배지와 선제적 공지 안내를 추가하고, 불필요한 문의와 이동을 줄이는 방향으로 화면 흐름을 개선했습니다."],
    ],
  },
  temi: {
    label: "02 · TEAM · 2026.04—06",
    title: "서비스 완성도를 높인 협업",
    image: "assets/temi.png",
    alt: "Temi Robot 연동 프로젝트 화면",
    summary: "행사장에서 참가자가 필요한 정보를 빠르게 얻도록 TEMI 로봇과 모바일 웹을 연동한 스마트 안내 서비스입니다. 길 안내, 스탬프 랠리, AI 추천과 포토부스를 하나의 흐름으로 통합했습니다.",
    details: [
      ["담당 역할", "사용자 경험을 고려한 서비스 흐름 설계와 웹·앱 개발을 담당했습니다."],
      ["문제", "팀원별 기술 스택이 달라 협업이 어려웠고, 이벤트 데이터가 DB에 저장되지 않아 기록 유실과 기능 누락 가능성이 있었습니다."],
      ["해결", "DB 저장 기능을 보완하고 Notion 기반 협업 체계를 구축해 역할과 진행 상황을 공유했습니다. 로봇과 모바일 웹이 안정적으로 연결되는 서비스를 완성했습니다."],
    ],
  },
  band: {
    label: "03 · WEB · 2025.12—2026.01",
    title: "실제 운영에서 발견한 문제를 해결하다",
    image: "assets/band.png",
    alt: "밴드 공연 운영 웹 프로젝트 화면",
    summary: "공연 입장 관리, 음료 예약, 경품 이벤트를 수작업으로 처리하며 발생한 혼선과 대기 시간을 줄이기 위해 운영 전반을 하나의 웹 서비스로 통합했습니다.",
    details: [
      ["배경", "실제 밴드 공연 운영 경험에서 반복되는 입장 번호 발급과 현장 대기의 문제를 발견했습니다."],
      ["문제", "동시 요청 시 동일한 입장 번호가 중복 발급되는 Race Condition이 발생했습니다."],
      ["해결", "번호 발급을 데이터베이스의 원자적 처리 방식으로 변경해 동시 접속 환경에서도 모든 사용자에게 고유 번호가 안정적으로 발급되도록 개선했습니다."],
    ],
  },
  scheduler: {
    label: "04 · PERSONAL · 2026.06—",
    title: "불편을 시스템으로 해결하는 기획과 설계",
    image: "assets/scheduler.png",
    alt: "동아리 통합 일정 관리 프로젝트 화면",
    summary: "여러 팀의 일정 조사와 수작업 취합에 드는 시간을 줄이기 위해, 한 번 입력한 일정이 모든 소속 팀에 자동 반영되는 통합 동아리 운영 플랫폼을 기획했습니다.",
    details: [
      ["서비스 기획", "운영진과 구성원의 사용 흐름을 나누고 하나의 플랫폼에서 동아리 운영이 가능하도록 일정 관리 과정을 설계했습니다."],
      ["핵심 기능", "통합 일정, 공지사항, 권한 관리와 팀별 대표 색상을 적용한 직관적인 UI를 구성했습니다."],
      ["기대 효과", "반복적인 일정 조사와 수작업 취합을 자동화하고, 여러 플랫폼으로 분산된 운영 경험을 하나로 통합합니다."],
    ],
  },
};

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

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--ry", `${(x - 0.5) * 13}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 13}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});

const dialog = document.querySelector("#project-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogLabel = document.querySelector("#dialog-label");
const dialogTitle = document.querySelector("#dialog-title");
const dialogSummary = document.querySelector("#dialog-summary");
const dialogDetails = document.querySelector("#dialog-details");
let activeCard = null;

function openProject(projectId, card) {
  const project = projects[projectId];
  if (!project) return;
  activeCard = card;
  dialogImage.src = project.image;
  dialogImage.alt = project.alt;
  dialogLabel.textContent = project.label;
  dialogTitle.textContent = project.title;
  dialogSummary.textContent = project.summary;
  dialogDetails.replaceChildren(
    ...project.details.map(([term, description]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = term;
      dd.textContent = description;
      row.append(dt, dd);
      return row;
    }),
  );
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
  activeCard?.focus();
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project, card));
});

document.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
