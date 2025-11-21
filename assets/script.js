// assets/script.js


(async function(){
// Utility: format authors (simple)
function formatAuthors(a){
if(!a) return '';
// BibTeX authors are often "Last, First and Last2, First2"
return a.replace(/\s+and\s+/g, ', ');
}


// fetch refs.bib
async function loadBib(){
try{
const res = await fetch('refs.bib');
if(!res.ok) throw new Error('refs.bib not found in site root');
const text = await res.text();
const parsed = bibtexParse.toJSON(text);
const pubs = parsed.map(e => {
const t = e.entryTags || {};
return {
id: e.citationKey || t.key || Math.random().toString(36).slice(2),
title: (t.title||'').replace(/[{}]/g,''),
authors: formatAuthors(t.author || t.editor),
journal: (t.journal || t.booktitle || '').replace(/[{}]/g,''),
year: t.year ? parseInt(t.year,10) : null,
doi: t.doi || null,
eprint: t.eprint || null,
link: t.doi ? `https://doi.org/${t.doi}` : (t.eprint ? `https://arxiv.org/abs/${t.eprint}` : '#')
};
});


return pubs;
}catch(err){
console.warn(err);
return [];
}
}


function renderPubs(pubs){
const container = document.getElementById('pubList');
container.innerHTML = '';
pubs.forEach(p => {
const card = document.createElement('div');
card.className = 'p-4 bg-slate-900 rounded-lg border border-white/5';
card.innerHTML = `
<h3 class="font-semibold">${p.title}</h3>
<div class="text-sm opacity-80 mt-1">${p.authors} — <em>${p.journal||''}</em>${p.year?`, ${p.year}`:''}</div>
<div class="mt-2"><a href="${p.link}" class="text-indigo-300 underline" target="_blank">View</a></div>
`;
container.appendChild(card);
});
}


// initial load
let pubs = await loadBib();
// if none found, include your provided sample entry
if(!pubs || pubs.length===0){
pubs = [{
id: 'Kumar:2025dlc',
title: 'Constraints on maximum neutron star mass from protoneutron star evolution',
authors: 'D. Kumar, T. Malik, H. Mishra, C. Providência',
journal: 'Phys. Rev. D',
year: 2025,
link: 'https://arxiv.org/abs/2505.18888'
}];
}


function sortPubs(mode){
if(mode==='year-desc') pubs.sort((a,b)=>(b.year||0)-(a.year||0));
else if(mode==='year-asc') pubs.sort((a,b)=>(a.year||0)-(b.year||0));
else if(mode==='title') pubs.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
renderPubs(pubs);
}


document.getElementById('sortSelect').addEventListener('change', (e)=> sortPubs(e.target.value));


// render initial
sortPubs('year-desc');


// CV modal
const cvModal = documen
