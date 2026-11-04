"use strict";

/* ============================================================
   1. 分類攻略資料（World Street Photo Awards 2026, 20 組）
   ============================================================ */
const CATEGORIES = [
  {ico:"🪞", name:"反射", en:"Reflection", tip:"玻璃、水窪、鏡子製造的第二層畫面。評審愛「雙重世界」——真實與倒影互相呼應或矛盾。找到乾淨、不雜亂的反射面，讓倒影裡有完整故事。"},
  {ico:"🌧️", name:"天氣", en:"Weather", tip:"雨、霧、雪、強光改變了街道的情緒。重點是『人如何回應天氣』：撐傘的剪影、霧中的孤單身影。氛圍 > 清晰。"},
  {ico:"📐", name:"幾何", en:"Geometry", tip:"建築線條、對稱、重複圖案當骨架，再放一個人進去打破或點綴。評審看的是秩序感與人的對比。"},
  {ico:"⬛", name:"黑白", en:"Black & White", tip:"去掉顏色後靠光影、對比、形狀說話。別投『沒事發生的黑白路人照』——那是最常被秒刷的類型。要有強烈的明暗與決定性瞬間。"},
  {ico:"🎨", name:"彩色", en:"Color", tip:"顏色本身就是主角。找撞色、單一主色塊、紅點效應。顏色要『有意義』地推動畫面，不是剛好很花。"},
  {ico:"👤", name:"剪影", en:"Silhouette", tip:"逆光把主體壓成純黑形狀。成敗在『輪廓辨識度』——姿態、動作一眼可讀，背景乾淨不打架。"},
  {ico:"💡", name:"光影", en:"Light & Shadow", tip:"硬光投下的長影、光束、光斑。常見高分打法：讓影子成為主角，或人站在一道光裡。對比拉開、暗部要沉得下去。"},
  {ico:"🏃", name:"動態", en:"Movement & Motion", tip:"追焦、慢快門拖影、凝結的跳躍。要讓『動』是刻意的語言，而不是手震的失敗。動與靜的對比最強。"},
  {ico:"🚇", name:"交通", en:"Transport", tip:"地鐵、公車、機車、人力車——移動中的人間劇場。車窗當框、月台當舞台。找通勤裡的孤獨或荒謬。"},
  {ico:"⚡", name:"決定性瞬間", en:"The Decisive Moment", tip:"本賽最經典也最難的一組。所有元素在同一秒對齊：手勢、表情、位置、背景。這組評審標準最嚴，送件前反覆問：早 0.5 秒或晚 0.5 秒還成立嗎？"},
  {ico:"◻️", name:"極簡", en:"Minimalism", tip:"大量留白 + 一個小小的主體。負空間是武器，主體通常放在三分點。畫面越空、主體越要精準。"},
  {ico:"🌃", name:"夜 / 低光", en:"Night & Low Light", tip:"霓虹、路燈、店面光。擁抱噪點與暗，不要硬拉亮。光源當構圖核心，讓人物沒入或浮出光裡。"},
  {ico:"🎬", name:"電影感", en:"Cinematic Streets", tip:"像電影停格：氛圍、光比、色調、孤獨的人物。常用較暗的影調與留白，讓人想像故事的前後。"},
  {ico:"🌀", name:"抽象 / 超現實", en:"Abstract & Surrealism", tip:"錯位、剪影拼貼、讓人『看不懂但想看』的畫面。原創性拉滿的一組，越不像傳統街拍越好。"},
  {ico:"🔀", name:"並置", en:"Juxtaposition", tip:"兩個對比的元素同框產生意義：窮與富、人與廣告看板、大與小。這是街拍最吃香的『想法型』組別。"},
  {ico:"🧅", name:"層次", en:"Layers", tip:"前中後景各有一個小故事，疊成一張複雜而有序的畫面。難度高、分數也高。要亂中有序，每層都讀得到。"},
  {ico:"🔍", name:"細節", en:"Details", tip:"手、鞋、局部的特寫說出整體。以小見大，讓一個局部承載情緒或故事。"},
  {ico:"🐕", name:"動物", en:"Animals", tip:"街上的狗、鴿子、貓與人的互動。幽默、呼應、擬人瞬間最討喜。動物的表情/動作要是主角。"},
  {ico:"📱", name:"手機攝影", en:"Mobile Phone", tip:"只能用手機拍。評審會更看『瞬間與想法』而非畫質。善用手機的機動性抓到相機來不及的瞬間。"},
  {ico:"🗂️", name:"開放主題", en:"Open Theme", tip:"不限主題的綜合組。放你最強、最有個人風格的那張。這組競爭最激烈，要夠獨特才進得去。"}
];

/* ============================================================
   2. 主觀自我檢查清單（對應創意 / 原創性）
   ============================================================ */
const SUBJECTIVE = [
  "畫面有一個清楚的『想法』，我能用一句話說出它在講什麼",
  "這是真實、未擺拍的瞬間（candid）",
  "有決定性瞬間——早一點或晚一點按都不成立",
  "有並置／反差／幽默等讓人看第二眼的巧思",
  "縮到拇指大小，主體與故事仍然讀得出來",
  "這個視角/題材，評審大概沒看過幾百張雷同的",
  "四個邊乾淨：沒有砍到人、沒有無關的半個路人",
  "後製是克制的，沒有假天空或過度 HDR 破壞真實感"
];

/* ============================================================
   3. 建立頁面靜態區塊
   ============================================================ */
function buildCategories(){
  const grid = document.getElementById("catGrid");
  CATEGORIES.forEach((c,i)=>{
    const el = document.createElement("button");
    el.className = "cat-chip";
    el.type = "button";
    el.innerHTML =
      `<span class="c-ico">${c.ico}</span>
       <span class="c-name">${c.name}</span>
       <span class="c-en">${c.en}</span>
       <span class="c-tip">${c.tip}</span>`;
    el.addEventListener("click",()=>{
      const wasOpen = el.classList.contains("open");
      grid.querySelectorAll(".cat-chip.open").forEach(x=>x.classList.remove("open"));
      if(!wasOpen) el.classList.add("open");
    });
    grid.appendChild(el);
  });
}

function buildSubjective(){
  const box = document.getElementById("subjCheck");
  SUBJECTIVE.forEach((t,i)=>{
    const lbl = document.createElement("label");
    lbl.className = "subj-item";
    lbl.innerHTML = `<input type="checkbox" id="subj${i}"><span>${t}</span>`;
    box.appendChild(lbl);
  });
}

/* ============================================================
   4. 影像分析引擎（全部在瀏覽器本地）
   ============================================================ */
const ANALYZE_MAX = 900; // 分析用縮圖長邊

function analyzeImage(img){
  // 縮圖到分析尺寸
  const scale = Math.min(1, ANALYZE_MAX / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d", {willReadFrequently:true});
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const N = w * h;

  // 亮度圖 + 直方圖 + 色彩統計
  const lum = new Float32Array(N);
  const hist = new Float32Array(256);
  let sumR=0,sumG=0,sumB=0;
  let sumRG=0,sumYB=0,sumRG2=0,sumYB2=0; // Hasler-Süsstrunk colorfulness
  let satSum=0;
  for(let i=0,p=0;i<N;i++,p+=4){
    const r=data[p], g=data[p+1], b=data[p+2];
    const l = 0.2126*r + 0.7152*g + 0.0722*b;
    lum[i]=l;
    hist[Math.min(255,Math.round(l))]++;
    sumR+=r; sumG+=g; sumB+=b;
    const rg = r-g;
    const yb = 0.5*(r+g)-b;
    sumRG+=rg; sumYB+=yb; sumRG2+=rg*rg; sumYB2+=yb*yb;
    const mx=Math.max(r,g,b), mn=Math.min(r,g,b);
    satSum += mx===0 ? 0 : (mx-mn)/mx;
  }
  const meanL = (()=>{let s=0;for(let i=0;i<N;i++)s+=lum[i];return s/N;})();
  // 對比：亮度標準差
  let varL=0; for(let i=0;i<N;i++){const d=lum[i]-meanL;varL+=d*d;}
  const stdL = Math.sqrt(varL/N);
  // 色度
  const meanRG=sumRG/N, meanYB=sumYB/N;
  const stdRG=Math.sqrt(Math.max(0,sumRG2/N-meanRG*meanRG));
  const stdYB=Math.sqrt(Math.max(0,sumYB2/N-meanYB*meanYB));
  const colorfulness = Math.sqrt(stdRG*stdRG+stdYB*stdYB)+0.3*Math.sqrt(meanRG*meanRG+meanYB*meanYB);
  const avgSat = satSum/N;
  const isBW = colorfulness < 14; // 近乎無彩 = 黑白
  // 白平衡色偏
  const avgR=sumR/N, avgG=sumG/N, avgB=sumB/N;
  const castRB = avgR-avgB; // 正=偏暖, 負=偏冷
  const castG  = avgG-(avgR+avgB)/2; // 綠/洋紅

  // 剪裁比例
  let clipHi=0, clipLo=0;
  for(let v=251;v<256;v++) clipHi+=hist[v];
  for(let v=0;v<5;v++)   clipLo+=hist[v];
  clipHi/=N; clipLo/=N;
  // 動態範圍（1%~99% 分位）
  const p = q=>{let acc=0,t=q*N;for(let v=0;v<256;v++){acc+=hist[v];if(acc>=t)return v;}return 255;};
  const dr = p(0.99)-p(0.01);

  // 銳利度：亮度 Laplacian 變異數
  let lapSum=0,lapSum2=0,lapN=0;
  for(let y=1;y<h-1;y++){
    for(let x=1;x<w-1;x++){
      const i=y*w+x;
      const lap = 4*lum[i]-lum[i-1]-lum[i+1]-lum[i-w]-lum[i+w];
      lapSum+=lap; lapSum2+=lap*lap; lapN++;
    }
  }
  const lapMean=lapSum/lapN;
  const sharpVar=lapSum2/lapN-lapMean*lapMean; // 高=銳利

  // 構圖：梯度(細節)圖 → 視覺重心 + 三分點對齊 + 邊緣雜物
  const GX=w-2, GY=h-2;
  const grad = new Float32Array(GX*GY);
  let gSum=0;
  for(let y=1;y<h-1;y++){
    for(let x=1;x<w-1;x++){
      const i=y*w+x;
      const gx=lum[i+1]-lum[i-1];
      const gy=lum[i+w]-lum[i-w];
      const m=Math.abs(gx)+Math.abs(gy);
      grad[(y-1)*GX+(x-1)]=m; gSum+=m;
    }
  }
  // 視覺重心（細節加權）
  let cx=0,cy=0;
  if(gSum>0){
    for(let y=0;y<GY;y++)for(let x=0;x<GX;x++){const m=grad[y*GX+x];cx+=x*m;cy+=y*m;}
    cx/=gSum; cy/=gSum;
  }else{cx=GX/2;cy=GY/2;}
  const relX=cx/GX, relY=cy/GY; // 0~1
  // 與四個三分點的最近距離
  const thirds=[[1/3,1/3],[2/3,1/3],[1/3,2/3],[2/3,2/3]];
  let nearest=1;
  thirds.forEach(([tx,ty])=>{const d=Math.hypot(relX-tx,relY-ty);if(d<nearest)nearest=d;});
  const distCenter=Math.hypot(relX-0.5,relY-0.5);

  // 邊框雜物：外圈 7% 邊框的細節密度 vs 全圖
  const bx=Math.max(1,Math.round(GX*0.07)), by=Math.max(1,Math.round(GY*0.07));
  let borderSum=0,borderN=0;
  for(let y=0;y<GY;y++)for(let x=0;x<GX;x++){
    if(x<bx||x>=GX-bx||y<by||y>=GY-by){borderSum+=grad[y*GX+x];borderN++;}
  }
  const meanGrad=gSum/(GX*GY);
  const borderMean=borderN?borderSum/borderN:0;
  const borderRatio=meanGrad>0?borderMean/meanGrad:0; // >1 表示邊緣比中間還雜

  // 主體佔比估計（負空間）：細節高於均值 1.3 倍的像素比例
  let busyN=0; const thr=meanGrad*1.3;
  for(let i=0;i<grad.length;i++) if(grad[i]>thr) busyN++;
  const busyRatio=busyN/grad.length;

  return {w,h,meanL,stdL,colorfulness,avgSat,isBW,castRB,castG,
    clipHi,clipLo,dr,sharpVar,relX,relY,nearest,distCenter,borderRatio,busyRatio,meanGrad};
}

/* ============================================================
   5. 指標 → 分數 & 建議（對照評分四標準）
   ============================================================ */
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function cls(score){return score>=75?"good":score>=50?"warn":"bad";}

function scoreMetrics(a){
  const M=[]; // {key,name,val,score,note,group}
  const strengths=[], improve=[];

  // 曝光
  let expScore=100, expNote;
  if(a.clipHi>0.04){expScore-=Math.min(55,a.clipHi*700);}
  if(a.clipLo>0.10){expScore-=Math.min(25,(a.clipLo-0.10)*180);}
  if(a.meanL<42){expScore-=Math.min(30,(42-a.meanL)*1.6);}
  if(a.meanL>215){expScore-=Math.min(30,(a.meanL-215)*1.5);}
  expScore=clamp(Math.round(expScore),0,100);
  expNote=`高光裁切 ${(a.clipHi*100).toFixed(1)}%、暗部 ${(a.clipLo*100).toFixed(1)}%、平均亮度 ${Math.round(a.meanL)}`;
  M.push({name:"曝光控制",group:"技術",val:`${expScore}`,score:expScore,note:expNote});
  if(a.clipHi>0.04) improve.push(`高光過曝 ${(a.clipHi*100).toFixed(1)}%——亮部細節救不回來。拍攝時 -0.3~-0.7EV，或後製壓高光。`);
  else if(expScore>=80) strengths.push("曝光乾淨，亮部暗部都有細節，過了技術門檻。");
  if(a.clipLo>0.14 && a.meanL>60) improve.push("暗部大片死黑。若非刻意低調，拉一點陰影找回層次。");

  // 對比 / 動態範圍
  let conScore;
  const sc=a.stdL; // 典型 30~75
  if(sc<24) conScore=clamp(Math.round(40+sc*1.2),0,70);
  else if(sc>82) conScore=clamp(Math.round(100-(sc-82)*1.1),55,100);
  else conScore=clamp(Math.round(70+(sc-24)*0.52),0,100);
  M.push({name:"對比 / 影調",group:"技術",val:`σ ${sc.toFixed(0)}`,score:conScore,
    note:`亮度標準差 ${sc.toFixed(0)}、動態範圍 ${a.dr}/255`});
  if(sc<24) improve.push("影調偏灰平，缺乏力量。拉對比、讓黑色沉下去——街拍很吃強烈明暗。");
  else if(conScore>=80) strengths.push("影調有力，黑白灰層次分明，視覺衝擊夠。");

  // 銳利度
  const sv=a.sharpVar;
  let shScore;
  if(sv<45) shScore=clamp(Math.round(sv*0.9),0,55);
  else if(sv<220) shScore=clamp(Math.round(55+(sv-45)*0.26),0,100);
  else shScore=100;
  M.push({name:"銳利度 / 對焦",group:"技術",val:sv<45?"偏軟":sv<220?"適中":"銳利",score:shScore,
    note:`邊緣能量指數 ${sv.toFixed(0)}（越高越銳）`});
  if(sv<45) improve.push("整體偏鬆散，可能失焦或手震。若不是刻意的動態模糊，主體對焦要再確實。");
  else if(shScore>=80) strengths.push("主體清晰銳利，縮圖也讀得出細節。");

  // 色彩
  if(a.isBW){
    M.push({name:"色彩",group:"技術",val:"黑白",score:80,note:`色度 ${a.colorfulness.toFixed(0)}（判定為黑白作品）`});
    strengths.push("黑白作品——記得靠光影與形狀取勝，可投『黑白』組。");
  }else{
    let colScore=clamp(Math.round(45+a.colorfulness*0.9),0,100);
    if(a.colorfulness>110) colScore=clamp(colScore-10,0,95);
    M.push({name:"色彩表現",group:"技術",val:`${a.colorfulness.toFixed(0)}`,score:colScore,
      note:`色彩豐富度 ${a.colorfulness.toFixed(0)}、平均飽和 ${(a.avgSat*100).toFixed(0)}%`});
    if(a.colorfulness>70) strengths.push("色彩飽滿有張力，適合主打『彩色』組。");
    if(a.colorfulness<28) improve.push("顏色偏淡、不夠有存在感。若想走彩色，找更強的主色塊或撞色；否則考慮轉黑白。");
    if(Math.abs(a.castRB)>26) improve.push(`明顯${a.castRB>0?"偏暖(橘黃)":"偏冷(藍)"}色偏。確認是氛圍需要還是白平衡跑掉，必要時校正。`);
    if(Math.abs(a.castG)>14) improve.push(`畫面偏${a.castG>0?"綠":"洋紅"}，常見於日光燈/混光，建議微調白平衡。`);
  }

  // 構圖：三分點對齊
  const near=a.nearest;
  let compScore = near<0.06?96 : near<0.12?86 : near<0.2?72 : a.distCenter<0.08?64 : 52;
  M.push({name:"構圖 · 主體位置",group:"構圖",val:near<0.12?"貼三分點":a.distCenter<0.08?"置中":"偏離",score:compScore,
    note:`視覺重心 (${(a.relX*100).toFixed(0)}%, ${(a.relY*100).toFixed(0)}%)，距最近三分點 ${(near*100).toFixed(0)}%`});
  if(near<0.12) strengths.push("視覺重心落在三分點附近，構圖安排有意圖。");
  else if(a.distCenter<0.08) improve.push("主體幾乎正中央。若非對稱式刻意構圖，試著把主體放到三分點，畫面會更有張力。");
  else if(near>0.22) improve.push("視覺重心偏離經典位置。檢查是不是有雜訊把重心帶歪，或重新裁切。");

  // 構圖：邊緣乾淨度
  let edgeScore = a.borderRatio<0.75?92 : a.borderRatio<1.0?78 : a.borderRatio<1.3?58 : 40;
  M.push({name:"邊緣乾淨度",group:"構圖",val:a.borderRatio<1.0?"乾淨":"偏雜",score:edgeScore,
    note:`邊框細節 / 全圖 = ${a.borderRatio.toFixed(2)}（<1 表示邊緣比中央乾淨）`});
  if(a.borderRatio>=1.2) improve.push("四邊偏雜，可能砍到人或有干擾物。重裁或拍攝時退半步照顧邊角——評審對『乾淨邊緣』很敏感。");
  else if(edgeScore>=85) strengths.push("邊緣乾淨，沒有搶戲的雜物，加分。");

  // 構圖：負空間 / 繁簡
  let spaceNote, spaceScore=75;
  if(a.busyRatio<0.14){spaceScore=82;spaceNote="留白充足——很適合『極簡』組";}
  else if(a.busyRatio<0.40){spaceScore=80;spaceNote="繁簡平衡";}
  else {spaceScore=60;spaceNote="畫面偏滿，注意是否有兩個主角在搶戲";}
  M.push({name:"繁簡 / 負空間",group:"構圖",val:`${(a.busyRatio*100).toFixed(0)}% 細節`,score:spaceScore,note:spaceNote});
  if(a.busyRatio>=0.45) improve.push("資訊密度很高。確認是刻意的『層次』，否則簡化到一個主體一個想法。");

  return {M,strengths,improve};
}

/* 技術總分：技術類與構圖類指標加權平均 */
function overallScore(M){
  const w={"技術":1,"構圖":1.1};
  let s=0,tw=0;
  M.forEach(m=>{const wt=w[m.group]||1;s+=m.score*wt;tw+=wt;});
  return Math.round(s/tw);
}

/* 分類推薦 */
function suggestCategory(a){
  const picks=[];
  if(a.isBW) picks.push("黑白");
  if(!a.isBW && a.colorfulness>70) picks.push("彩色");
  if(a.meanL<55 && a.clipLo>0.2) picks.push("夜 / 低光");
  if(a.stdL>70 && a.meanL<110) picks.push("光影");
  if(a.busyRatio<0.14) picks.push("極簡");
  if(a.busyRatio>0.45) picks.push("層次");
  if(a.clipLo>0.3 && a.stdL>60) picks.push("剪影");
  if(picks.length===0) picks.push("開放主題");
  // 去重、最多三個
  return [...new Set(picks)].slice(0,3);
}

/* ============================================================
   6. 渲染結果
   ============================================================ */
let currentImg=null;

function renderResult(img){
  const a=analyzeImage(img);
  const {M,strengths,improve}=scoreMetrics(a);
  const overall=overallScore(M);

  // 預覽圖
  const cv=document.getElementById("previewCanvas");
  const dispMax=760;
  const sc=Math.min(1,dispMax/Math.max(img.naturalWidth,img.naturalHeight));
  cv.width=Math.round(img.naturalWidth*sc);
  cv.height=Math.round(img.naturalHeight*sc);
  cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);

  // 三分線 + 視覺重心
  const ov=document.getElementById("thirdsOverlay");
  ov.innerHTML=
    `<div class="line v" style="left:33.33%"></div><div class="line v" style="left:66.66%"></div>
     <div class="line h" style="top:33.33%"></div><div class="line h" style="top:66.66%"></div>
     <div class="poi" style="left:33.33%;top:33.33%"></div><div class="poi" style="left:66.66%;top:33.33%"></div>
     <div class="poi" style="left:33.33%;top:66.66%"></div><div class="poi" style="left:66.66%;top:66.66%"></div>
     <div class="sal-dot" style="left:${(a.relX*100).toFixed(1)}%;top:${(a.relY*100).toFixed(1)}%;display:none"></div>`;
  applyOverlayToggles();

  // 總分環
  const ring=document.getElementById("overallRing");
  const col=overall>=75?"var(--good)":overall>=55?"var(--accent)":"var(--warn)";
  ring.style.background=`conic-gradient(${col} ${overall*3.6}deg, var(--line) 0deg)`;
  document.getElementById("overallScore").textContent=overall;
  const verdict=overall>=80?"技術地基非常穩，門檻輕鬆過。接下來比的是創意與原創性——看右邊的主觀清單。"
    :overall>=65?"技術大致過關，還有幾個點能補強到更安全（見『建議加強』）。"
    :overall>=50?"技術上有明顯可修的地方，先把下面紅/黃項處理掉，別讓技術拖累好瞬間。"
    :"技術完成度偏低，評審第一關就可能刷掉。先把曝光/對焦/構圖的基本盤顧好。";
  document.getElementById("overallVerdict").textContent=verdict;

  // 推薦組別
  const cats=suggestCategory(a);
  document.getElementById("bestCategory").innerHTML=
    `<div style="color:var(--ink-3);font-size:12px;margin-bottom:6px">這張最適合投</div>`+
    cats.map(c=>`<b>${c}</b>`).join(" · ")+
    `<div style="color:var(--ink-3);font-size:12.5px;margin-top:8px">依色彩/影調/繁簡自動判斷，點上方分類看各組攻略。</div>`;

  // 指標卡
  const mBox=document.getElementById("metrics");
  mBox.innerHTML="";
  M.forEach(m=>{
    const c=cls(m.score);
    const card=document.createElement("div");
    card.className="metric";
    card.innerHTML=
      `<div class="metric-head"><span class="metric-name">${m.name}</span>
         <span class="metric-val s-${c}">${m.val}</span></div>
       <div class="metric-bar"><i class="bar-${c}" style="width:${m.score}%"></i></div>
       <p class="metric-note">${m.note}</p>`;
    mBox.appendChild(card);
  });

  // 強項 / 加強
  const sList=document.getElementById("strengthsList");
  const iList=document.getElementById("improveList");
  sList.innerHTML = strengths.length?strengths.map(s=>`<li>${s}</li>`).join("")
    :`<li class="empty">技術強項不明顯——先把左邊建議補起來。</li>`;
  iList.innerHTML = improve.length?improve.map(s=>`<li>${s}</li>`).join("")
    :`<li class="empty">技術層面沒有明顯問題，很棒！接下來專心打磨想法與瞬間。</li>`;

  document.getElementById("reviewResult").hidden=false;
  document.getElementById("reviewResult").scrollIntoView({behavior:"smooth",block:"start"});
}

function applyOverlayToggles(){
  const ov=document.getElementById("thirdsOverlay");
  if(!ov) return;
  const showT=document.getElementById("toggleThirds").checked;
  const showS=document.getElementById("toggleSaliency").checked;
  ov.querySelectorAll(".line,.poi").forEach(e=>e.style.display=showT?"block":"none");
  const dot=ov.querySelector(".sal-dot");
  if(dot) dot.style.display=showS?"block":"none";
}

/* ============================================================
   7. 檔案輸入
   ============================================================ */
function handleFile(file){
  if(!file || !file.type.startsWith("image/")) return;
  const url=URL.createObjectURL(file);
  const img=new Image();
  img.onload=()=>{currentImg=img;renderResult(img);URL.revokeObjectURL(url);};
  img.onerror=()=>{alert("無法讀取這張圖片，換一張試試。");URL.revokeObjectURL(url);};
  img.src=url;
}

function initReview(){
  const dz=document.getElementById("dropZone");
  const input=document.getElementById("fileInput");
  document.getElementById("browseBtn").addEventListener("click",e=>{e.stopPropagation();input.click();});
  dz.addEventListener("click",()=>input.click());
  input.addEventListener("change",e=>handleFile(e.target.files[0]));
  ["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("drag");}));
  ["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("drag");}));
  dz.addEventListener("drop",e=>{if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0]);});
  document.getElementById("toggleThirds").addEventListener("change",applyOverlayToggles);
  document.getElementById("toggleSaliency").addEventListener("change",applyOverlayToggles);
  document.getElementById("resetBtn").addEventListener("click",()=>{
    document.getElementById("reviewResult").hidden=true;
    input.value="";
    document.getElementById("review").scrollIntoView({behavior:"smooth"});
  });
}

/* init */
buildCategories();
buildSubjective();
initReview();
