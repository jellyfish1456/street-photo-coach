"use strict";

/* 區段選單（與 app.js 同邏輯，獨立一份供 px3 使用） */
function initViewMenu(){
  const menu = document.getElementById("viewMenu");
  if(!menu) return;
  const views = [...document.querySelectorAll(".view")];
  const btns = [...document.querySelectorAll("[data-view]")];
  function show(id){
    if(!views.some(v=>v.id===id)) id = views[0].id;
    views.forEach(v=>{v.hidden = v.id!==id;});
    btns.forEach(b=>b.classList.toggle("active", b.dataset.view===id));
    history.replaceState(null,"","#"+id);
    window.scrollTo({top:0,behavior:"instant"});
  }
  btns.forEach(b=>b.addEventListener("click",e=>{e.preventDefault();show(b.dataset.view);}));
  show((location.hash||"").replace("#",""));
}

/* ============================================================
   PX3 2025 得獎資料（圖片為官方 S3 連結，不重製託管）
   每類別：Pro 年度得主 + Best New Talent 新秀
   ============================================================ */
const S3 = "https://s3-us-west-2.amazonaws.com/px3fr/upload/";
const PX3_2025 = [
 {cat:"廣告", en:"Advertising", ico:"📢",
  tip:"商業影像看概念與完成度——一個清楚的視覺點子、乾淨的執行、能放上看板的衝擊力。",
  win:[
   {role:"🏆",rk:"年度得主",t:"Adaptive boxers",a:"Peter Muller",
    u:S3+"3226831/1-119671-25/medium/a26a2e872de78e0ef8dc85834a81d029.jpg",
    src:"https://px3.fr/winners/px3/2025/15746",
    note:"霓虹街區裡輪椅上的拳擊手，環境肖像＋電影感光色。把身障運動拍成英雄敘事——概念、情緒、執行俱佳，打敗全場成為本屆年度攝影師。",also:"本屆年度攝影師 Photographer of the Year"},
   {role:"🌱",rk:"新秀",t:"Circle of Solitude",a:"Hiko",
    u:S3+"3281155/1-123927-25/medium/c285baf98a6ae986c94a26bdc26c30b3.jpeg",
    src:"https://px3.fr/winners/px3/2025/15767",
    note:"大片黑裡一道圓形天光，下方一台渺小機車。極簡戲劇性、商業質感。"}
  ]},
 {cat:"底片", en:"Analog / Film", ico:"🎞️",
  tip:"用底片的質地與不完美說話——顆粒、色偏、時間感是重點，不是把數位做舊。",
  win:[
   {role:"🏆",rk:"年度得主",t:"Life is still a garden, don't say otherwise",a:"Veronika Trubnikova",
    u:S3+"3277301/1-123999-25/medium/ea5db1b7f88cc869ea59eb94569ebf2b.jpg",
    src:"https://px3.fr/winners/px3/2025/15749",
    note:"褐調底片，人物慵懶臥於花園，夢境般的懷舊——底片質地本身就是情緒。"},
   {role:"🌱",rk:"新秀",t:"Vehicles and their owners",a:"Jose Luis Gea Arques",
    u:S3+"3279902/1-119945-25/medium/dfdfb0ef83ff11f0eea1b71e817590ee.jpg",
    src:"https://px3.fr/winners/px3/2025/15769",
    note:"車主與老車（青綠 Renault 4）的肖像系列，底片的紀實溫度。系列思維加分。"}
  ]},
 {cat:"建築", en:"Architecture", ico:"🏛️",
  tip:"建築攝影要抽象化——線條、量體、光，把房子拍成雕塑或幾何，而非紀錄。",
  win:[
   {role:"🏆",rk:"年度得主",t:"Desert Crystal",a:"Svetlana Fadeeva",
    u:S3+"3279381/1-119585-24/medium/f95e6ab38803fc0fc4d318460e97089e.jpg",
    src:"https://px3.fr/winners/px3/2025/15788",
    note:"砂色折板建築被拍成抽象雕塑，純粹的幾何與光，去掉脈絡只留形體。"},
   {role:"🌱",rk:"新秀",t:"The House with Hair",a:"Nick Green",
    u:S3+"3269618/1-121744-25/medium/2044191ecbe102098eb41a1806c119bb.jpg",
    src:"https://px3.fr/winners/px3/2025/15771",
    note:"霧中一棟頂上長草的孤獨小屋，超現實極簡。"}
  ]},
 {cat:"攝影書", en:"Book", ico:"📖",
  tip:"這組看整本書的編輯與敘事——封面、跨頁、序列的整體語言，不是單張漂亮。",
  win:[
   {role:"🏆",rk:"年度得主",t:"TREASURES (Limited Edition Book)",a:"Cheraine Collette",
    u:S3+"3270918/1-122698-25/medium/70ead65abc27555ced635581e532147c.jpg",
    src:"https://px3.fr/winners/px3/2025/15792",
    note:"攤開的巴洛克華麗肖像攝影書，印刷與裝幀本身就是作品——書組贏在整體製作。"},
   {role:"🌱",rk:"新秀",t:"Promenade",a:"Leila Forés",
    u:S3+"3250945/1-121864-25/medium/a12e320b5e94eeb9f77cd700b47aeb35.jpg",
    src:"https://px3.fr/winners/px3/2025/15775",
    note:"極簡淡雅的書封設計，留白與質感。"}
  ]},
 {cat:"純藝術", en:"Fine Art", ico:"🖼️",
  tip:"概念最重——一個能被策展、能掛畫廊的想法與視覺語言，系列思維優於單張。",
  win:[
   {role:"🏆",rk:"年度得主",t:"The Independence Movement: Layered Gazes",a:"Hakbong Kwon",
    u:S3+"3276841/1-120865-25/medium/76e4dcf8d9755a98ed2fc64374555c7f.jpg",
    src:"https://px3.fr/winners/px3/2025/15754",
    note:"暗調、層疊的傳統身影與凝視，談歷史與身份的概念性作品——純藝術組吃的就是這種可策展的厚度。"},
   {role:"🌱",rk:"新秀",t:"Les demoiselles",a:"Agnes Doolag",
    u:S3+"3280825/1-122955-25/medium/c103930e739dad3fa8c47461ad612a28.jpg",
    src:"https://px3.fr/winners/px3/2025/15774",
    note:"女子與紅鶴的超現實擺拍合成，夢境式的繪畫感。"}
  ]},
 {cat:"自然", en:"Nature", ico:"🦏",
  tip:"野生動物不只要稀有瞬間，要有張力、戲劇光與敘事，黑白常被偏好。",
  win:[
   {role:"🏆",rk:"年度得主",t:"The Amboseli Wildlife",a:"Paolo Ameli",
    u:S3+"3256174/1-121547-25/medium/8de3010f09301f2df730856b3f19d0bc.jpg",
    src:"https://px3.fr/winners/px3/2025/15757",
    note:"黑白象群橫越，經典而有史詩感的動物攝影，靠影調與構圖的分量取勝。"},
   {role:"🌱",rk:"新秀",t:"Jurassic Park",a:"Alessandro Marena",
    u:S3+"3281039/1-123525-25/medium/cfdb0ba121a987c8e409faf8a22b72cd.jpeg",
    src:"https://px3.fr/winners/px3/2025/15780",
    note:"黑白，傷痕累累的犀牛＋群鳥飛舞，史前般的戲劇張力。"}
  ]},
 {cat:"人像", en:"Portraiture", ico:"👤",
  tip:"人像要有凝視與故事——不是好看，是讓人記住這張臉背後的生命。",
  win:[
   {role:"🏆",rk:"年度得主",t:"The Outside of the Inside",a:"Martina Holmberg",
    u:S3+"3280455/1-121357-25/medium/9ac53071ecec9b94582d738df9d11c3e.jpg",
    src:"https://px3.fr/winners/px3/2025/15759",
    note:"嚴酷而尊嚴的燒傷臉孔特寫，直視傷痕＝強烈情緒與人性衝擊。人像組的高分在 overall impact。"}
  ]},
 {cat:"新聞紀實", en:"Press / Editorial", ico:"📰",
  tip:"新聞紀實看「現場的重量」——事件、情緒、見證的力量，倫理與衝擊並重。",
  win:[
   {role:"🏆",rk:"年度得主",t:"Faith Amid the Rubble",a:"Abdelrahman Alkahlout",
    u:S3+"3281236/1-124314-25/medium/91fccd573952b464a995bd33b39ba283.jpg",
    src:"https://px3.fr/winners/px3/2025/15761",
    note:"空拍瓦礫中成排禱告的人群（加薩），信仰與廢墟的強烈對比——見證之作，衝擊力滿分。"},
   {role:"🌱",rk:"新秀",t:"Faces of loss in Ukraine",a:"Hanna Kuzmych",
    u:S3+"3280864/1-123818-25/medium/74ff80fbed2f6ac399edce74fecd2be3.jpg",
    src:"https://px3.fr/winners/px3/2025/15782",
    note:"被炸毀的公寓前，彩色兒童遊具與一個身影，講戰爭對平民的日常傷害。"}
  ]},
 {cat:"特殊 / 綜合", en:"Special", ico:"✨",
  tip:"放最有個人觀點、最難歸類的作品——街拍、極簡、抽象都在此一較高下。",
  win:[
   {role:"🏆",rk:"年度得主",t:"View from",a:"Aurelie Beeston",
    u:S3+"3280531/1-121868-25/medium/df456d603992f93d78491a26b5919543.jpg",
    src:"https://px3.fr/winners/px3/2025/15763",
    note:"近乎全白的高調抽象，幾筆淡痕，極簡到接近留白——用「少」製造詩意。"},
   {role:"🌱",rk:"新秀",t:"The Third Man",a:"Kazuhito Hirai",
    u:S3+"3271391/1-119367-24/medium/dddab21ba4a7abaca2716f3e3a720963.jpg",
    src:"https://px3.fr/winners/px3/2025/15797",
    note:"黑白歐洲街頭，門邊彎身的人＋條紋柱，古典街拍瞬間——街拍在 PX3 投這組。"}
  ]},
 {cat:"運動", en:"Sports", ico:"🏅",
  tip:"運動攝影的高分在「抽象與瞬間」——把動作拍成線條、張力或失重感，而非記分板。",
  win:[
   {role:"🏆",rk:"年度得主",t:"Silent steps",a:"Elias Ejderhamn",
    u:S3+"3280690/1-122314-25/medium/5f59ee889b3821d9e867280d111ab016.jpg",
    src:"https://px3.fr/winners/px3/2025/15765",
    note:"黑白雪地上一道光的斜線與渺小身影，把運動極簡抽象化，靜謐而有張力。"},
   {role:"🌱",rk:"新秀",t:"Weightless in the Guggenheim Museum",a:"Angel Sanchez",
    u:S3+"3279722/1-120534-25/medium/5969b9def12037d2af82679dceb7d155.jpg",
    src:"https://px3.fr/winners/px3/2025/15786",
    note:"滑板飛越古根漢曲線屋頂，天空中的「失重」瞬間＋建築幾何。"}
  ]}
];

/* 本屆焦點：年度攝影師 + 總新秀 */
const PX3_HERO = [
 {label:"Photographer of the Year",t:"Adaptive boxers",a:"Peter Muller",cat:"廣告 Advertising",
  u:S3+"3226831/1-119671-25/medium/a26a2e872de78e0ef8dc85834a81d029.jpg",
  src:"https://px3.fr/winners/special/2025/88"},
 {label:"Best New Talent",t:"Wilting",a:"Alena Solomonova",cat:"總新秀",
  u:S3+"3279846/1-119768-25/medium/efc6417e9a44afe6758b5b5762bf6fe5.jpg",
  src:"https://px3.fr/winners/special/2025/87"}
];

let PX3_GOLDS = {};
let PX3_CURRENT = 0;

function goldGalleryHtml(catName){
  const list = PX3_GOLDS[catName] || PX3_GOLDS[catName.replace(/\s+/g,"")];
  if(!list || !list.length) return "";
  const cells = list.map(g=>
    `<a class="gold-cell" href="${g.h}" target="_blank" rel="noopener" title="${g.t} — ${g.a}（到官方看）">
       <img src="${g.u}" alt="${g.t}" loading="lazy" referrerpolicy="no-referrer">
       <span class="gold-cap"><b>${g.t}</b><br>${g.a}</span>
     </a>`).join("");
  return `<div class="gold-block">
       <h4 class="gold-h">該類別 Pro 金獎 · 共 ${list.length} 件 <span>（每個子分類一面金獎，點圖看官方原圖）</span></h4>
       <div class="gold-gallery">${cells}</div>
     </div>`;
}

function renderPx3Detail(i){
  PX3_CURRENT = i;
  const c = PX3_2025[i];
  const detail = document.getElementById("px3Detail");
  if(!detail) return;
  const winHtml = c.win.map(w=>
    `<article class="win-row">
       <a class="win-thumb" href="${w.src}" target="_blank" rel="noopener" title="到官方頁面看原圖">
         <span class="win-medal">${w.role}</span>
         <img src="${w.u}" alt="${w.t} — ${w.a}" loading="lazy" referrerpolicy="no-referrer">
       </a>
       <div class="win-info">
         <div class="win-titleline"><h4>${w.t}</h4><span class="win-rk">${w.rk}</span>${w.also?`<span class="win-also">↗ ${w.also}</span>`:""}</div>
         <p class="win-author">${w.a}</p>
         <p class="win-note">${w.note}</p>
       </div>
     </article>`).join("");
  detail.innerHTML =
    `<div class="cat-detail-head">
       <span class="cd-ico">${c.ico}</span>
       <div><h3>${c.cat} <span class="cd-en">${c.en}</span></h3>
         <p class="cd-tip"><b>評審要什麼：</b>${c.tip}</p></div>
     </div>
     <div class="win-list">${winHtml}</div>
     ${goldGalleryHtml(c.cat)}`;
  detail.hidden = false;
  document.querySelectorAll(".catb-card").forEach((el,idx)=>el.classList.toggle("active", idx===i));
}

function buildPx3(){
  const hero = document.getElementById("px3Hero");
  if(hero){
    hero.innerHTML = PX3_HERO.map(h=>
      `<a class="px3-hero-card" href="${h.src}" target="_blank" rel="noopener">
         <img src="${h.u}" alt="${h.t} — ${h.a}" loading="lazy" referrerpolicy="no-referrer">
         <div class="px3-hero-body">
           <span class="px3-hero-label">${h.label}</span>
           <strong>${h.t}</strong>
           <span class="px3-hero-meta">${h.a} · ${h.cat}</span>
         </div>
       </a>`).join("");
  }
  const grid = document.getElementById("px3Browse");
  if(!grid) return;
  PX3_2025.forEach((c,i)=>{
    const card = document.createElement("button");
    card.type = "button";
    card.className = "catb-card";
    card.innerHTML =
      `<span class="catb-ico">${c.ico}</span>
       <span class="catb-name">${c.cat}</span>
       <span class="catb-en">${c.en}</span>
       <span class="catb-count">年度 + 新秀</span>`;
    card.addEventListener("click",()=>{
      renderPx3Detail(i);
      document.getElementById("px3Detail").scrollIntoView({behavior:"smooth",block:"start"});
    });
    grid.appendChild(card);
  });
  renderPx3Detail(0);
}

initViewMenu();
buildPx3();
fetch("px3-golds.json").then(r=>r.json()).then(d=>{PX3_GOLDS=d; renderPx3Detail(PX3_CURRENT);}).catch(e=>{});
