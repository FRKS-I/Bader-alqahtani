(()=>{'use strict';
const FIXES={"new_midterm_page_1.webp":[0.1574,0.3111,0.6571,0.3699],"new_midterm_page_2.webp":[0,0.5565,0.4464,0.1457],"new_midterm_page_4.webp":[0.2063,0.3996,0.7403,0.1145],"new_midterm_page_5.webp":[0.4231,0.2465,0.5602,0.1618],"new_midterm_page_6.webp":[0.4198,0.2614,0.5702,0.2527],"new_midterm_page_7.webp":[0.5031,0.056,0.4869,0.2365],"new_midterm_page_9.webp":[0.083,0.3063,0.2601,0.1345],"new_midterm_page_10.webp":[0.2264,0.2328,0.4002,0.1071],"new_midterm_page_11.webp":[0.4898,0.7482,0.5002,0.1295],"new_midterm_page_13.webp":[0.3831,0.422,0.6036,0.1469],"new_midterm_page_15.webp":[0.5798,0.1681,0.4135,0.0834],"new_midterm_page_16.webp":[0.4931,0.1755,0.2668,0.1282],"new_midterm_page_18.webp":[0.5932,0.0324,0.4035,0.1394],"new_midterm_page_20.webp":[0.6265,0.0249,0.3701,0.1245],"new_midterm_page_21.webp":[0.4931,0.0473,0.4969,0.1407],"new_midterm_page_22.webp":[0.213,0.0697,0.4335,0.0834],"new_midterm_page_23.webp":[0.6599,0.3847,0.3301,0.1071],"new_midterm_page_24.webp":[0.4164,0.1917,0.5802,0.188],"new_midterm_page_25.webp":[0.1963,0.0473,0.3335,0.1581],"new_midterm_page_26.webp":"tum1_50_0.webp","new_midterm_page_28.webp":[0.4631,0.1992,0.5235,0.1519],"added_source_29.webp":[0.3674,0.001,0.6285,0.1429],"added_source_30.webp":[0.3087,0.2614,0.6913,0.1528],"added_source_31.webp":[0.1872,0.1666,0.8002,0.1669],"added_source_32.webp":[0.1956,0.3392,0.7877,0.1754],"added_source_38.webp":[0.0077,0.1064,0.8929,0.5983],"added_source_41.webp":[0.1099,0.5578,0.7937,0.441],"added_source_46.webp":[0.1099,0.0471,0.6764,0.3817],"added_source_49.webp":[0.0768,0.127,0.7425,0.3791],"added_source_53.webp":[0.0768,0.1038,0.6073,0.4178],"added_source_56.webp":[0.146,0.3179,0.7726,0.4333],"added_source_65.webp":[0.0017,0.1683,0.6343,0.6345],"added_source_68.webp":[0.0017,0.2998,0.9169,0.5287],"added_source_73.webp":[0.0017,0.2947,0.8057,0.5622],"added_source_77.webp":[0.125,0.2455,0.7588,0.5902],"added_source_78.webp":[0.0543,0.1547,0.8927,0.7701],"added_source_81.webp":[0.1414,0.0454,0.6338,0.8441],"added_source_82.webp":[0.0417,0.2018,0.8876,0.6962],"added_source_85.webp":[0.0328,0.2674,0.4255,0.5667],"added_source_88.webp":[0.0328,0.2556,0.9419,0.6524],"added_source_89.webp":[0.0253,0.0673,0.947,0.866],"added_source_92.webp":[0.0997,0.0572,0.6907,0.4053],"added_source_93.webp":[0.0922,0.3229,0.8649,0.4439],"added_source_35.webp":"cyst1_03_1.webp","added_source_59.webp":"non_09_0.webp","added_source_62.webp":"non_02_2.webp","osteo_acute_hist.webp":[0.015,0,0.72,0.71],"osteo_11_0.webp":[0.132,0.251,0.535,0.7],"osteo_22_0.webp":[0.02,0.03,0.52,0.49],"cyst2_06_1.webp":[0,0,1,0.83],"tum1_41_0.webp":[0,0,1,0.87]};
const photo=document.getElementById('qPhoto');
const cache=new Map(),pending=new Map();
const placeholder='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="520" height="290" viewBox="0 0 520 290"><rect width="520" height="290" fill="#091729"/><text x="260" y="150" text-anchor="middle" font-family="sans-serif" fill="#a0bfd4" font-size="21">Loading diagnostic image…</text></svg>');
function cleaned(key){
 if(!key||!Object.prototype.hasOwnProperty.call(FIXES,key))return Promise.resolve(images[key]);
 if(cache.has(key))return Promise.resolve(cache.get(key));
 if(pending.has(key))return pending.get(key);
 const rule=FIXES[key];
 if(typeof rule==='string'){let p=cleaned(rule).then(src=>{cache.set(key,src);pending.delete(key);return src});pending.set(key,p);return p;}
 const p=new Promise(resolve=>{
  const img=new Image();
  img.onload=()=>{
   try{
    const [nx,ny,nw,nh]=rule;
    const x=Math.max(0,Math.round(img.naturalWidth*nx)),y=Math.max(0,Math.round(img.naturalHeight*ny));
    const w=Math.max(1,Math.min(img.naturalWidth-x,Math.round(img.naturalWidth*nw)));
    const h=Math.max(1,Math.min(img.naturalHeight-y,Math.round(img.naturalHeight*nh)));
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
    canvas.getContext('2d').drawImage(img,x,y,w,h,0,0,w,h);
    const src=canvas.toDataURL('image/webp',0.92);
    cache.set(key,src);resolve(src);
   }catch(e){console.warn('OSPE image crop failed',key,e);resolve(images[key]);}
   pending.delete(key);
  };
  img.onerror=()=>{console.warn('OSPE image unavailable',key);pending.delete(key);resolve(images[key])};
  img.src=images[key];
 });
 pending.set(key,p);return p;
}
let showNonce=0;
const priorShow=showQuestion;
showQuestion=function(){
 priorShow();
 const q=queue[index]; if(!q||!q.img||!FIXES[q.img])return;
 const nonce=++showNonce;photo.src=placeholder;
 cleaned(q.img).then(src=>{
  if(nonce===showNonce && queue[index]?.id===q.id){photo.src=src;photo.alt='Cropped source diagnostic image';}
 });
};
openFull=function(){
 const q=queue[index];if(!q||!q.img)return;
 document.getElementById('lightbox').classList.add('show');
 document.getElementById('fullImg').src=FIXES[q.img]?placeholder:images[q.img];
 cleaned(q.img).then(src=>{if(queue[index]?.id===q.id)document.getElementById('fullImg').src=src});
};
document.documentElement.setAttribute('data-image-crop-fixes',String(Object.keys(FIXES).length));
})();