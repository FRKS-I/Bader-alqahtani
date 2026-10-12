(()=>{'use strict';
const get=id=>document.getElementById(id);
const all=DATA.questions.filter(q=>q.img&&DATA.images[q.img]);
DATA.meta.total=all.length;DATA.meta.imageQuestions=all.length;
get('s-all').textContent=all.length;get('s-img').textContent=all.length;
const countOption=document.createElement('option');countOption.value='173';countOption.textContent='173 stations · Complete image bank';get('amount').appendChild(countOption);
get('amount').value='173';
let answerMode='written', typed={A:'',B:''};
const css=document.createElement('style');css.textContent='.answer-mode{display:flex;gap:9px;margin:12px 0 18px}.answer-mode button{flex:1;padding:13px;border:1px solid #35516a;background:#102338;color:#dbefff;border-radius:12px;font-weight:700}.answer-mode button.active{background:#25c4bf;color:#06222b}.written-box{display:block;width:100%;min-height:95px;border:1px solid #4e6c86;border-radius:12px;padding:13px;background:#091b2c;color:white;font:inherit;resize:vertical}.written-hint{font-size:12px;color:#9eb1cc;margin-top:7px}';document.head.appendChild(css);
const optionsA=get('optionsA'),optionsB=get('optionsB');optionsA.style.display='none';optionsB.style.display='none';renderOptions=function(){ /* written answers only: no options are rendered */ };
const modeTag=document.createElement('span');modeTag.className='tag';modeTag.textContent='SHORT ANSWER ONLY';get('examArea').querySelector('.exammeta').appendChild(modeTag);
const tagline=document.querySelector('.hero p');if(tagline)tagline.innerHTML='173 image-based OSPE stations from your lectures. <b>Written answers only.</b> Enter your own diagnosis and follow-up answer, then compare with the model answers.';
for(const w of ['A','B']){const div=document.createElement('div');div.id='ramiTyped'+w;div.innerHTML='<textarea id="ramiInput'+w+'" class="written-box" placeholder="Type your answer in English"></textarea><div class="written-hint">Compare your answer with the model answer after submitting.</div>';get('options'+w).after(div);}
function syncMode(){for(const w of ['A','B']){get('options'+w).style.display=answerMode==='written'?'none':'';get('ramiTyped'+w).style.display=answerMode==='written'?'':'none';get('ramiInput'+w).disabled=false;get('ramiInput'+w).value=typed[w]||'';}if(!revealed)get('stationState').textContent=answerMode==='written'?'Write both answers, then check':'Select both answers, then check';}
const baseShow=showQuestion;showQuestion=function(){typed={A:'',B:''};baseShow();syncMode()};

function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim()}
function match(user,answer){const a=norm(user),b=norm(answer);return !!a&&(a===b||(a.length>=7&&b.includes(a))||(b.length>=7&&a.includes(b)))}
grade=function(timedOut=false){if(revealed)return;const q=queue[index];typed={A:get('ramiInputA').value.trim(),B:get('ramiInputB').value.trim()};if(!timedOut&&(!typed.A||!typed.B)){toast('Write both answers first');return}const a=match(typed.A,q.ansA),b=match(typed.B,q.ansB);revealed=true;
get('feedbackTitle').textContent=a&&b?'Answers matched — review':'Compare with the model answers';get('answerA').textContent=q.ansA;get('answerB').textContent=q.ansB;get('gradingA').textContent=a?'✓ Approximate match':'Review manually';get('gradingB').textContent=b?'✓ Approximate match':'Review manually';get('diagnosticReason').textContent=(q.clue||'')+'\n'+(q.contrast||'');get('answerSource').textContent='Lecture source: '+q.source;get('feedback').classList.remove('hidden');get('submitButton').textContent=index===queue.length-1?'Results':'Next station →';get('skipBtn').style.display='none';get('stationState').textContent=(Number(a)+Number(b))+'/2 · approximate scoring';for(const w of ['A','B'])get('ramiInput'+w).disabled=true;
answers.push({id:q.id,q,typedA:typed.A,typedB:typed.B,A:a,B:b});history.seen[q.id]=(history.seen[q.id]||0)+1;if(!a||!b)history.weak[q.id]=(history.weak[q.id]||0)+1;else delete history.weak[q.id];history.total+=2;history.earned+=Number(a)+Number(b);save();get('feedback').scrollIntoView({behavior:'smooth',block:'nearest'});
};
syncMode();
})();