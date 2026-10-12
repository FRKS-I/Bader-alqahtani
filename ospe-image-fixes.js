(()=>{'use strict';
// Prefer the intact, higher-resolution individual medical figures already extracted
// from the original lecture PDFs, instead of re-cropping thumbnail slide screenshots.
const originalQuestions=DATA.questions.filter(q=>q.img&&images[q.img]&&!/^(NEW|ADD)/.test(q.id));
const groups=new Map();
for(const q of originalQuestions){const k=q.d||q.diagnosis.toLowerCase();if(!groups.has(k))groups.set(k,[]);const row=groups.get(k);if(!row.some(x=>x.img===q.img))row.push(q);}
const lower=s=>String(s||'').toLowerCase();
function imageKind(q){const t=lower(q.imgType),b=lower(q.askB);if(t.includes('radiog'))return 'radiog';if(t.includes('histo'))return 'histo';if(t.includes('clinical'))return 'clinical';if(b.includes('histolog')||b.includes('microscop')||b.includes('epithel')||b.includes('calcification pattern'))return 'histo';if(b.includes('radiograph')||b.includes('radiolucen')||b.includes('tooth vitality')||b.includes('inverted pear'))return 'radiog';if(b.includes('clinical color')||b.includes('swelling')||b.includes('location'))return 'clinical';return '';}
function bestSource(q){
 const group=groups.get(q.d||q.diagnosis.toLowerCase())||[];
 if(!group.length)return null;
 const t=imageKind(q);
 const preferred=group.filter(x=>lower(x.imgType).includes(t)&&t);
 const options=preferred.length?preferred:group;
 // Larger original picture files usually preserve more of the pathology details.
 const ranked=options.slice().sort((a,b)=>(images[b.img]?.length||0)-(images[a.img]?.length||0));
 return ranked[Number(q.id.slice(-1))%Math.min(ranked.length,2)];
}
const sourceCache=new Map();
function sourceFor(q){
 if(!q||!q.img)return null;
 if(!/^(NEW|ADD)/.test(q.id))return {src:images[q.img],type:q.imgType||'Diagnostic image',original:true};
 if(sourceCache.has(q.id))return sourceCache.get(q.id);
 const old=bestSource(q);
 const result=old?{src:images[old.img],type:old.imgType||'Diagnostic image',original:true}:{src:images[q.img],type:q.imgType||'Diagnostic image',original:false};
 sourceCache.set(q.id,result);return result;
}
const css=document.createElement('style');
css.textContent='.photo{min-height:230px!important;padding:18px 8px!important;overflow:visible!important}.photo img{width:auto!important;height:auto!important;max-width:100%!important;max-height:min(68vh,720px)!important;object-fit:contain!important;image-rendering:auto!important}.photo .photoflag{z-index:3}.photo .enlarge{z-index:3}.overlay img{width:auto!important;height:auto!important;max-height:90vh!important;max-width:96vw!important;object-fit:contain!important}';
document.head.appendChild(css);
const qPhoto=document.getElementById('qPhoto');
const previousShow=showQuestion;
showQuestion=function(){previousShow();const q=queue[index];if(!q?.img)return;const photo=sourceFor(q);qPhoto.src=photo.src;document.getElementById('photoType').textContent=photo.type;};
openFull=function(){const q=queue[index];if(!q?.img)return;const image=sourceFor(q);document.getElementById('fullImg').src=image.src;document.getElementById('lightbox').classList.add('show');};
const info=document.createElement('small');info.textContent='Medical figure from the original lecture · image shown without tight cropping';info.style.cssText='display:block;color:#91a7c2;text-align:center;padding:0 15px 15px;font-size:11px;';document.getElementById('photoFrame').after(info);
const baseShow2=showQuestion;showQuestion=function(){baseShow2();info.style.display=queue[index]?.img?'':'none';};
document.documentElement.dataset.figureQuality='lecture-originals-no-extra-cropping';
})();