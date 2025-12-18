import { researchLinks } from "./linksdata.js";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#links .links-grid");
  if (!grid) return;

  researchLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.className = "link-item";

    a.innerHTML = `
      <div class="icon-circle">
        ${getIconSVG(link.icon)}
      </div>
      <div>
        <div class="item-title">${link.title}</div>
        <div class="item-sub">${link.sub}</div>
      </div>
    `;

    grid.appendChild(a);
  });
});

function getIconSVG(type) {
  // Adaptive color: prefers-color-scheme fallback
  const s = `stroke="var(--fg-500, ${getAdaptiveColor()})" fill="none"`;

  const icons = {
    wave: `<svg viewBox="0 0 24 24"><path d="M2 14c3-6 5 6 8 0s5 6 8 0" ${s} stroke-width="1.5"/></svg>`,
    orbit: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" ${s} stroke-width="1.5"/><path d="M2 12h20" ${s} stroke-width="1"/></svg>`,
    doc: `<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" ${s} stroke-width="1.5"/><path d="M8 8h8M8 12h8M8 16h5" ${s} stroke-width="1.2"/></svg>`,
    cross: `<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" ${s} stroke-width="1.5"/></svg>`,
    star: `<svg viewBox="0 0 24 24"><path d="M12 3l2.5 6h6l-5 4 2 6-5.5-4-5.5 4 2-6-5-4h6z" ${s} stroke-width="1.3"/></svg>`,
    shell: `<svg viewBox="0 0 24 24"><path d="M4 12c0-5 4-9 8-9s8 4 8 9-4 9-8 9-8-4-8-9z" ${s} stroke-width="1.4"/></svg>`,
    globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" ${s} stroke-width="1.5"/><path d="M12 3v18M3 12h18" ${s} stroke-width="1.2"/></svg>`,
    database: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" ${s} stroke-width="1.5"/><path d="M5 6v10c0 2 14 2 14 0V6" ${s} stroke-width="1.5"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24"><path d="M4 12h14l-4-4m4 4l-4 4" ${s} stroke-width="1.5" stroke-linecap="round"/></svg>`,
    drop: `<svg viewBox="0 0 24 24"><path d="M12 3c4 6 6 8 6 11a6 6 0 1 1-12 0c0-3 2-5 6-11z" ${s} stroke-width="1.4"/></svg>`,
    badge: `<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="4" ${s} stroke-width="1.5"/><path d="M8 13l-2 8 6-3 6 3-2-8" ${s} stroke-width="1.5"/></svg>`,
    house: `<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v10H3z" ${s} stroke-width="1.5"/></svg>`,
    file: `<svg viewBox="0 0 24 24"><path d="M6 2h8l4 4v16H6z" ${s} stroke-width="1.5"/><path d="M14 2v6h6" ${s} stroke-width="1.2"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" ${s} stroke-width="1.5"/><path d="M12 7v6l3 2" ${s} stroke-width="1.5" stroke-linecap="round"/></svg>`,
    plus: `<svg viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" ${s} stroke-width="1.5"/></svg>`,
    grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ${s} stroke-width="1.5"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18" ${s} stroke-width="1.2"/></svg>`,
    rank: `<svg viewBox="0 0 24 24"><path d="M5 20V8M12 20V4M19 20v-12" ${s} stroke-width="1.8" stroke-linecap="round"/></svg>`,

    // New future-ready icons
    rocket: `<svg viewBox="0 0 24 24"><path d="M12 2l4 6-4 14-4-14 4-6z" ${s} stroke-width="1.5"/></svg>`,
    magnet: `<svg viewBox="0 0 24 24"><path d="M6 2v10a6 6 0 0 0 12 0V2" ${s} stroke-width="1.5"/></svg>`,
    heart: `<svg viewBox="0 0 24 24"><path d="M12 21s-6-5-10-9a6 6 0 0 1 10-8 6 6 0 0 1 10 8c-4 4-10 9-10 9z" ${s} stroke-width="1.5"/></svg>`,
    lightning: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9z" ${s} stroke-width="1.5"/></svg>`,
    book: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ${s} stroke-width="1.5"/><path d="M7 7h10M7 11h10M7 15h10" ${s} stroke-width="1.2"/></svg>`
  };

  return icons[type];
}

// Adaptive color helper
function getAdaptiveColor() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return darkMode ? "#e2e8f0" : "#1a202c"; // light gray for dark mode, dark gray for light mode
}

