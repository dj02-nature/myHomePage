// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Slideshow
(() => {
  const slides = document.querySelectorAll('.slide');
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 4200);
})();

// PDF loader (lazy – no auto download)
function openPDF(path, btn){
  document.querySelectorAll('.tab-buttons button')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const frame = document.getElementById('pdfFrame');
  frame.src = path + '#toolbar=1&navpanes=0';
  frame.style.display = 'block';

  document.getElementById('pdfPlaceholder').style.display = 'none';
}

function closePDF(btn){
  document.getElementById('pdfFrame').src = '';
  document.getElementById('pdfFrame').style.display = 'none';
  document.getElementById('pdfPlaceholder').style.display = 'block';

  document.querySelectorAll('.tab-buttons button')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// News updater (editable)
const newsItems = [
  { date:'2025-01-10', text:'Upcoming seminar on <span class="highlight">Non-radial oscillations</span>.' },
  { date:'2024-12-02', text:'Preprint submitted on relativistic pulsation equations.' }
];

const list = document.getElementById('news-list');
newsItems.forEach(n => {
  const li = document.createElement('li');
  li.innerHTML = `<time class="text-gray-500">${n.date}</time> — ${n.text}`;
  list.appendChild(li);
});
