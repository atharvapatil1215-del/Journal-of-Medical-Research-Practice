
const ARTICLES = [
 {id:1,title:"Determinants and Outcomes of Primary Caesarean Section: A Retrospective Study",authors:"A. Sharma, R. Patil",type:"Original Article",issue:"2026-10",year:2026,keywords:"obstetrics caesarean outcomes"},
 {id:2,title:"Bilateral Large Spermatocele Masquerading as a Large Hydrocele",authors:"S. Kulkarni",type:"Case Report",issue:"2026-10",year:2026,keywords:"urology case"},
 {id:3,title:"Retinol-binding Protein 4 and Diabetes Mellitus: A Review",authors:"M. Deshmukh, P. Rao",type:"Review Article",issue:"2026-10",year:2026,keywords:"diabetes biomarker"},
 {id:4,title:"Early Online: Vitamin D Levels in Urban Adults",authors:"N. Joshi",type:"Original Article",issue:"online",year:2026,keywords:"vitamin d"},
 {id:5,title:"Anaemia Patterns Among Adolescent Girls",authors:"K. Pawar",type:"Original Article",issue:"2026-09",year:2026,keywords:"anaemia adolescent"}
];
function articleHTML(a){
 return `<div class="article"><div class="tag">${a.type} · ${a.authors}</div><h3>${a.title}</h3>
 <div class="links"><a href="#">Abstract</a><a href="#">Full Text</a><a href="#">PDF</a></div></div>`;
}
function renderList(id,list){
 const el=document.getElementById(id);
 el.innerHTML=list.length?list.map(articleHTML).join(''):'<p>No articles yet.</p>';
}
function searchPage(){
 const q=document.getElementById('q'), r=document.getElementById('results');
 const params=new URLSearchParams(location.search); if(params.get('q')) q.value=params.get('q');
 const run=()=>{const t=q.value.toLowerCase().trim();
  renderList('results',ARTICLES.filter(a=>!t||(a.title+a.authors+a.keywords).toLowerCase().includes(t)));};
 q.addEventListener('input',run); run();
}
function advSearch(){
 document.getElementById('adv').addEventListener('submit',e=>{e.preventDefault();
  const t=aTitle.value.toLowerCase(),au=aAuthor.value.toLowerCase(),ty=aType.value,y=aYear.value.trim();
  renderList('advResults',ARTICLES.filter(a=>(!t||a.title.toLowerCase().includes(t))&&(!au||a.authors.toLowerCase().includes(au))&&(!ty||a.type===ty)&&(!y||String(a.year)===y)));
 });
}
function demoForm(formId,msgId,prefix){
 const f=document.getElementById(formId),m=document.getElementById(msgId);
 f.addEventListener('submit',e=>{e.preventDefault();
  m.textContent=prefix+Math.random().toString(36).slice(2,9).toUpperCase();
  m.style.display='block'; f.reset();});
}
const o=document.getElementById('online'); if(o) o.textContent=Math.floor(80+Math.random()*120);
