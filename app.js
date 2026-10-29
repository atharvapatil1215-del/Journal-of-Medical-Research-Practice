
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

const MEDIA = [
 {id:1,kind:"video",title:"Ultrasound-guided Nerve Block: Step-by-step Technique",cat:"Anaesthesia",dur:"6:42",src:"media/nerve-block.mp4",article:"Sample Original Article, Issue 10 2026"},
 {id:2,kind:"video",title:"Endoscopic View of a Gastric Polyp Removal",cat:"Surgery",dur:"3:15",src:"media/polyp-removal.mp4",article:"Sample Case Report, Issue 10 2026"},
 {id:3,kind:"audio",title:"Author Interview: Findings on Caesarean Section Outcomes",cat:"Obstetrics",dur:"12:20",src:"media/interview-caesarean.mp3",article:"Sample Original Article, Issue 10 2026"},
 {id:4,kind:"audio",title:"Heart Murmur Sounds: Normal vs Pathological",cat:"Cardiology",dur:"4:05",src:"media/murmur.mp3",article:"Sample Review Article, Issue 09 2026"},
 {id:5,kind:"image",title:"Bilateral Spermatocele: Ultrasound Images",cat:"Urology",dur:"",src:"media/spermatocele.jpg",article:"Sample Case Report, Issue 10 2026"},
 {id:6,kind:"image",title:"Peripheral Smear Showing Microcytic Hypochromic Cells",cat:"Pathology",dur:"",src:"media/smear.jpg",article:"Sample Original Article, Issue 09 2026"}
];
const AV_ICON={video:"▶",audio:"♫",image:"🖼"};
function avPage(){
 const grid=document.getElementById('avGrid'),modal=document.getElementById('avModal'),player=document.getElementById('avPlayer');
 const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function draw(f){
  const list=MEDIA.filter(m=>f==='all'||m.kind===f);
  grid.innerHTML=list.map(m=>`<div class="av-card"><button class="av-thumb ${m.kind}" data-id="${m.id}" aria-label="Open ${esc(m.title)}">${AV_ICON[m.kind]}${m.dur?`<span class="dur">${m.dur}</span>`:''}</button>
  <div class="av-body"><span class="meta">${m.kind.toUpperCase()} · ${esc(m.cat)}</span><h3>${esc(m.title)}</h3><span class="meta">${esc(m.article)}</span><a href="current-issue.html">View related article &rarr;</a></div></div>`).join('')||'<p>No items yet.</p>';
 }
 function open_(m){
  const tag=m.kind==='video'?`<video controls autoplay src="${m.src}"></video>`:m.kind==='audio'?`<audio controls autoplay src="${m.src}"></audio>`:`<img src="${m.src}" alt="${esc(m.title)}">`;
  player.innerHTML=`<h3 style="margin-bottom:10px">${esc(m.title)}</h3>${tag}<p style="font-size:13px;color:#667;margin-top:8px">Place the file at <code>${m.src}</code> to play it here.</p>`;
  modal.classList.add('open');
 }
 function close_(){modal.classList.remove('open');player.innerHTML='';}
 grid.addEventListener('click',e=>{const b=e.target.closest('.av-thumb');if(b)open_(MEDIA.find(m=>m.id==b.dataset.id));});
 document.getElementById('avClose').onclick=close_;
 modal.addEventListener('click',e=>{if(e.target===modal)close_();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close_();});
 document.getElementById('avTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  document.querySelectorAll('#avTabs button').forEach(x=>x.classList.toggle('on',x===b));draw(b.dataset.f);});
 draw('all');
}
const o=document.getElementById('online'); if(o) o.textContent=Math.floor(80+Math.random()*120);
