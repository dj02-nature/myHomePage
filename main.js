/* ---------- AOS ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({ duration: 900, once: true });
  }
});

/* ---------- PDF TAB LOADER ---------- */
function switchPDF(index) {
  const frames = document.querySelectorAll(".pdf-frame");
  const buttons = document.querySelectorAll(".tab-buttons button");

  frames.forEach(f => f.style.display = "none");
  buttons.forEach(b => b.classList.remove("active"));

  if (index >= 0 && frames[index]) {
    const frame = frames[index];
    if (!frame.src) {
      frame.src = frame.dataset.src; // lazy load
    }
    frame.style.display = "block";
    buttons[index].classList.add("active");
  }
}

/* ---------- LOCAL VISIT COUNTER (fallback-safe) ---------- */
(function(){
  try {
    const key = "localVisitCount_v1";
    let count = parseInt(localStorage.getItem(key) || "0", 10);
    count++;
    localStorage.setItem(key, count);

    const el = document.getElementById("visitCountLocal");
    if (el) el.textContent = `Visits (this browser): ${count}`;
  } catch (e) {}
})();
