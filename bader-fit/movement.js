/* MADAR | Daily movement preparation
   Each day: targeted dynamic warm-up -> the unchanged workout -> gentle cooldown.
   Saves only user_data.payload.workouts[day].routineChecklist; no new database or auth.
*/
const mdVideo={
 upper:"https://www.youtube.com/watch?v=k9MY1ijAvGo",
 arm:"https://youtu.be/hniUI4ykF64",
 leg:"https://youtu.be/dgZdWsoJiHg",
 squat:"https://youtu.be/FGMRgTr4Syc",
 march:"https://www.youtube.com/watch?v=dt7FAEYRLC4",
 lower:"https://www.youtube.com/watch?v=QLkLKfL_7F0",
 recovery:"https://www.youtube.com/watch?v=Rrs2vY6A3lE",
 catcow:"https://www.youtube.com/watch?v=cg2-Ha4zaJw",
 wallpush:"https://www.youtube.com/watch?v=wIPJvBQs7RA",
 hipcircles:"https://www.youtube.com/watch?v=oU_oVMJL3-8",
 scapula:"https://youtu.be/Kn9mAgIhBW0",
 hinge:"https://resources.specialolympics.org/sports-essentials/sports-and-coaching/warm-up-and-cool-down-videos/dynamic-warm-up-hip-hinges",
 presswarm:"https://www.teamgb.com/video/shauna-coxseys-warm-up-routine/7mfuGIyBGDuS2eRbbFOcnv",
 ankle:"https://www.youtube.com/watch?v=mzTQGYGI0Ng",
 hip:"https://www.youtube.com/watch?v=IQ-h2WuJhXM",
 ham:"https://www.youtube.com/watch?v=oRdXgERlSag",
 calf:"https://www.youtube.com/watch?v=0xd5KRCQP-s",
 glute:"https://www.youtube.com/watch?v=63oscRDvoYw",
 stretch:"https://www.youtube.com/watch?v=myN0dGpJabc"
};
function mdItem(id,name,duration,explain,videoOrQuery){return{id,name,duration,explain,video:mdVideo[videoOrQuery]||"",query:mdVideo[videoOrQuery]?"":videoOrQuery}}
const mdRoutine=[
 {kind:"upper",warm:[
   mdItem("walk","مشي خفيف وتنشيط الذراعين","دقيقتان","امشِ بوتيرة مريحة وزِد حركة الذراعين تدريجيًا، دون لهاث.","march"),
   mdItem("shoulders","دوائر الكتفين والذراعين","30 ثانية لكل اتجاه","دوائر صغيرة تكبر تدريجيًا، بلا ألم أو رفع مفرط للكتف.","arm"),
   mdItem("scapula","سحب لوحي الكتف للخلف","10–12 تكرارًا","اسحب اللوحين للخلف والأسفل بهدوء، ثم اتركهما يعودان، دون هز الرقبة.","scapula"),
   mdItem("wallpush","ضغط الحائط الخفيف","8–10 تكرارات","ضع الكفين على الحائط واثنِ المرفقين بتحكم، لتجهيز الصدر والكتف.","wallpush"),
   mdItem("ramp","مجموعتا تهيئة Chest Press","8 ثم 5 تكرارات","الأولى نحو 40–50% ثم 60–70% من وزن عملك المعتاد؛ راحة قصيرة، ولا تُحسب من مجموعات التمرين.","presswarm")
 ],cool:[
   mdItem("chest","إطالة الصدر على الباب","20–30 ثانية لكل جهة","راحة اليد والساعد قرب إطار الباب، خطوة صغيرة للأمام حتى شد خفيف فقط.","doorway chest stretch physical therapist"),
   mdItem("lat","إطالة العضلة العريضة للظهر","20–30 ثانية لكل جهة","ضع يديك على طاولة ثابتة وارجع بالوركين للخلف قليلًا دون ضغط على أسفل الظهر.","lat stretch desk physiotherapy"),
   mdItem("shoulder","إطالة الكتف خلف الجسم","20–30 ثانية لكل جهة","مرر الذراع أمام صدرك واسندها بالأخرى برفق، دون سحب قوي.","cross body shoulder stretch doctor jo"),
   mdItem("biceps","إطالة الساعد والرسغ","20 ثانية لكل جهة","ابسط الذراع ومدد الرسغ بلطف، ولا تضغط على المفاصل.","wrist flexor stretch physio")
 ]},
 {kind:"lower",warm:[
   mdItem("walk","مشي متدرج","دقيقتان","ابدأ بالمشي الهادئ، ثم زد السرعة قليلًا لتنشيط الساقين.","lower"),
   mdItem("hip","فتح الورك بحركة دائرية","8 لكل جهة","استند على حائط، وارسم دائرة صغيرة بالركبة دون تحريك الظهر.","hipcircles"),
   mdItem("leg","تأرجح الساق للأمام والخلف","10 لكل ساق","استند على الحائط وحرك الساق بمدى مريح دون ركل أو اندفاع.","leg"),
   mdItem("squat","سكوات بوزن الجسم","10 تكرارات","انزل قليلًا وتحكم بمحاذاة الركبة، مع ثبات القدمين.","squat"),
   mdItem("hinge","ثني الورك بدون وزن (Hip hinge)","8 تكرارات","ادفع الوركين للخلف والظهر محايد؛ جرّب حركة الـRDL بدون دمبل.","hinge"),
   mdItem("ramp","مجموعتا تهيئة للتمرين الأول","8 ثم 5 تكرارات","ابدأ بحركة خفيفة ثم وزن نحو 50–70% من وزن العمل إذا كان آمنًا ومتاحًا؛ لا تُحسب من المجموعات الأساسية.","lower")
 ],cool:[
   mdItem("quads","إطالة الفخذ الأمامي","20–30 ثانية لكل جهة","تمسك بجدار وارفع الكعب ناحية المقعدة حتى شد مريح، دون تقويس الظهر.","standing quadriceps stretch doctor jo"),
   mdItem("ham","إطالة خلف الفخذ","20–30 ثانية لكل جهة","مدّ ساقًا أمامك وامِل من مفصل الورك مع إبقاء الظهر مستقيمًا.","ham"),
   mdItem("calf","إطالة بطة الساق","20–30 ثانية لكل جهة","استند إلى جدار وثبت الكعب الخلفي على الأرض، دون ألم في الركبة.","calf"),
   mdItem("hipflex","إطالة مثنيات الورك","20–30 ثانية لكل جهة","اتخذ وضع نصف ركوع مع شد بسيط للأرداف وحرك الحوض للأمام قليلًا.","hip")
 ]},
 {kind:"posture",warm:[
   mdItem("walk","مشي خفيف","دقيقتان","نشيط هادئ على السير دون رفع سرعة قوي.","lower"),
   mdItem("cat","حركة Cat–Cow","8 تكرارات","على أربع، بدّل بين تقويس الظهر وتمديده بلطف دون ضغط.","catcow"),
   mdItem("scapula","سحب لوحي الكتف","10 تكرارات","ارجع بالكتفين للخلف والأسفل من غير رفع الرقبة.","scapula"),
   mdItem("ankle","دوائر الكاحل","8 في كل اتجاه لكل قدم","دوّر الكاحل ببطء وحافظ على حركة محدودة ومريحة.","ankle")
 ],cool:[
   mdItem("hipflex","إطالة مقدمة الورك","20 ثانية لكل جهة","ثبّت الجذع واشعر بشد لطيف أمام الورك.","hip"),
   mdItem("chest","فتح الصدر بلطف","20 ثانية لكل جهة","إطالة بسيطة عند الباب، دون فرد الذراع للخلف بشدة.","doorway pec stretch physical therapy"),
   mdItem("calf","إطالة السمانة","20 ثانية لكل جهة","تحرك باتجاه الحائط والكعب مستقر بالأرض.","calf"),
   mdItem("breath","تهدئة التنفس","دقيقة واحدة","شهيق أنفي مريح وزفير أطول قليلًا، دون حبس النفس.","recovery")
 ]},
 {kind:"endurance",warm:[
   mdItem("walk","مشي مريح","دقيقتان","ابدأ عند سرعة مريحة ولا تبدأ الكارديو بسرعة عالية.","lower"),
   mdItem("ankle","حركة الكاحل والكعب","10 تكرارات","ارفع الكعب ثم الأصابع بالتبادل لتنشيط مفصل الكاحل.","ankle"),
   mdItem("leg","تأرجح الساق","10 لكل جهة","استند على الجدار وحرك الساق أمامًا وخلفًا بمدى صغير.","leg"),
   mdItem("speed","زيادة السرعة تدريجيًا","دقيقتان","ارفع سرعة السير أو ميله تدريجيًا، ثم ابدأ دقائق الكارديو المقررة.","lower")
 ],cool:[
   mdItem("slow","مشي بطيء","دقيقتان","انزل بالسرعة تدريجيًا بدل التوقف المفاجئ.","easy walking cool down"),
   mdItem("calf","إطالة السمانة","20–30 ثانية لكل جهة","تحكم في الكعب وثبته على الأرض.","calf"),
   mdItem("ham","إطالة خلف الفخذ","20–30 ثانية لكل جهة","امِل من الورك مع انحناء بسيط للركبة إذا لزم.","ham"),
   mdItem("hipflex","إطالة مقدمة الورك","20–30 ثانية لكل جهة","تمدّد بمدى بسيط ودون مبالغة.","hip")
 ]},
 {kind:"recovery",warm:[
   mdItem("easy","مشي مريح اختياري","دقيقتان","اليوم يوم استشفاء؛ لا تحتاج إحماءً ثقيلًا.","recovery"),
   mdItem("mobility","حركة لطيفة للظهر والكتفين","8 تكرارات","حركات Cat–Cow والتنفس بهدوء، بلا إجهاد.","catcow")
 ],cool:[
   mdItem("breathing","استرخاء وتنفس","دقيقة واحدة","حركة وتنفس فقط حسب رغبتك. اليوم راحة مخططة.","recovery"),
   mdItem("calf","إطالة خفيفة اختيارية","20 ثانية لكل جهة","إطالة قصيرة إذا شعرت أنها مريحة، ويمكنك تخطيها.","calf")
 ]}
];
function mdDayRoutine(index){
 if(index===0)return{...mdRoutine[0],day:plan[index].name,video:mdVideo.upper};
 if(index===3)return{...mdRoutine[0],day:plan[index].name,video:mdVideo.upper,
  warm:mdRoutine[0].warm.map(item=>item.id!=="ramp"?item:mdItem("ramp","تهيئة Push-up وLat Pulldown","مجموعتان خفيفتان","6 تكرارات ضغط حائط أو ضغط مائل، ثم 8–10 سحبات Lat Pulldown بوزن خفيف. لا تحسبها من مجموعاتك الأساسية.","upper"))};
 if(index===1)return{...mdRoutine[1],day:plan[index].name,video:mdVideo.lower};
 if(index===4)return{...mdRoutine[1],day:plan[index].name,video:mdVideo.lower,
  warm:mdRoutine[1].warm.map(item=>item.id!=="ramp"?item:mdItem("ramp","تهيئة Split Squat","8 لكل ساق ثم 5 لكل ساق","الجولة الأولى Split Squat بدون دمبل مع دعم، ثم جولة خفيفة إذا أمكن؛ لا تحتاج إلى وزن ثقيل.","lower"))};
 if(index===2)return{...mdRoutine[2],day:plan[index].name,video:mdVideo.upper};
 if(index===5)return{...mdRoutine[3],day:plan[index].name,video:mdVideo.lower};
 return{...mdRoutine[4],day:plan[index].name,video:mdVideo.recovery};
}
function mdDayIndex(){return new Date(day+"T12:00:00+03:00").getDay()}
function mdChecklist(){const work=w();if(!work.routineChecklist||typeof work.routineChecklist!=="object")work.routineChecklist={warm:{},cool:{}};return work.routineChecklist}
function mdStageProgress(kind,entry){const done=mdChecklist()[kind]||{};return entry.filter(x=>done[x.id]).length}
function mdVideoUrl(item){return item.video||"https://www.youtube.com/results?search_query="+encodeURIComponent(item.query+" demonstration safe technique")}
function mdMovementCard(item,kind){
 const checked=mdChecklist()[kind]?.[item.id]===true;
 return '<div class="md-movement '+(checked?'md-checked':'')+'" data-md-kind="'+kind+'" data-md-id="'+item.id+'">'+
 '<button class="md-check" type="button" aria-label="'+(checked?'إلغاء إنجاز ':'تم إنجاز ')+esc(item.name)+'" aria-pressed="'+checked+'" onclick="mdMarkPrep(\''+kind+'\',\''+item.id+'\')">'+(checked?'✓':'○')+'</button>'+
 '<div class="md-move-content"><div class="md-move-top"><b>'+esc(item.name)+'</b><span>'+esc(item.duration)+'</span></div>'+
 '<p>'+esc(item.explain)+'</p>'+
 '<a href="'+mdVideoUrl(item)+'" target="_blank" rel="noopener noreferrer" class="md-video-link">▶ '+(item.video?'مشاهدة الشرح':'فيديوهات الحركة')+' ↗</a>'+
 '</div></div>'
}
function mdStage(kind,entry,video){
 const isWarm=kind==="warm",done=mdStageProgress(kind,entry),total=entry.length;
 return '<section class="md-phase md-'+kind+'" id="madar-'+kind+'" aria-label="'+(isWarm?'إحماء اليوم':'إطالات بعد التمرين')+'">'+
 '<div class="md-phase-header"><span class="md-phase-number">'+(isWarm?'01':'03')+'</span><div class="md-phase-headings"><span class="md-phase-kicker">'+(isWarm?'DYNAMIC PREP':'COOL DOWN')+'</span><h2>'+(isWarm?'إحماء اليوم':'إطالات ما بعد التمرين')+'</h2><p>'+(isWarm?'جهّز عضلات اليوم، ثم انتقل للتمرين.':'تهدئة تدريجية وإطالات مريحة بعد الانتهاء.')+'</p></div><strong class="md-phase-progress" data-md-progress="'+kind+'">'+done+'/'+total+'</strong></div>'+
 '<div class="md-phase-progressbar"><i data-md-bar="'+kind+'" style="width:'+Math.round(done/total*100)+'%"></i></div>'+
 (isWarm&&video?'<a class="md-guided-video" href="'+video+'" target="_blank" rel="noopener noreferrer">▶ شاهد روتين الإحماء المرئي لليوم ↗</a>':'')+
 '<div class="md-movement-list">'+entry.map(it=>mdMovementCard(it,kind)).join('')+'</div>'+
 '<p class="md-phase-note">'+(isWarm?'إحماء ديناميكي ثم مجموعات تهيئة خفيفة. لا تبدأ بثقل العمل مباشرة.':'إطالة خفيفة غير مؤلمة، وليست اختبارًا للمرونة. ألم التمرين المتأخر لا يمكن ضمان منعه بالإطالات.')+'</p>'+
 (isWarm?'<a class="md-next-phase" href="#madar-training">التالي: التمرين ↓</a>':'<div class="md-phase-done" data-md-summary="'+kind+'">'+(done===total?'✓ اكتملت المرحلة':'أكمل الحركات بحسب راحتك')+'</div>')+
 '</section>'
}
function mdStagesNav(warm,cool){
 return '<nav class="md-stage-nav" aria-label="مراحل تمرين اليوم" dir="rtl">'+
 '<a href="#madar-warm" class="md-step warm"><b>01</b><span>إحماء</span><small>'+mdStageProgress("warm",warm)+'/'+warm.length+'</small></a>'+
 '<a href="#madar-training" class="md-step train"><b>02</b><span>تمارين</span><small>'+plan[mdDayIndex()].ex.length+' حركات</small></a>'+
 '<a href="#madar-cool" class="md-step cool"><b>03</b><span>إطالات</span><small>'+mdStageProgress("cool",cool)+'/'+cool.length+'</small></a>'+
 '</nav>'
}
function mdMarkPrep(kind,id){
 if(!uid||!["warm","cool"].includes(kind))return;
 const routine=mdDayRoutine(mdDayIndex()),moves=routine[kind];
 if(!moves.some(item=>item.id===id))return;
 const list=mdChecklist();list[kind]??={};
 const before=mdStageProgress(kind,moves);
 list[kind][id]=!list[kind][id];save();
 const after=mdStageProgress(kind,moves);
 const row=Array.from(document.querySelectorAll(".md-movement")).find(el=>el.dataset.mdKind===kind&&el.dataset.mdId===id);
 if(row){row.classList.toggle("md-checked",list[kind][id]);const button=row.querySelector(".md-check");if(button){button.textContent=list[kind][id]?'✓':'○';button.setAttribute("aria-pressed",String(!!list[kind][id]));button.setAttribute("aria-label",(list[kind][id]?"إلغاء إنجاز ":"تم إنجاز ")+moves.find(x=>x.id===id).name)}}
 document.querySelectorAll('[data-md-progress="'+kind+'"]').forEach(el=>el.textContent=after+"/"+moves.length);
 document.querySelectorAll('[data-md-bar="'+kind+'"]').forEach(el=>el.style.width=Math.round(after/moves.length*100)+"%");
 document.querySelectorAll(".md-step."+kind+" small").forEach(el=>el.textContent=after+"/"+moves.length);
 document.querySelectorAll('[data-md-summary="'+kind+'"]').forEach(el=>el.textContent=after===moves.length?"✓ اكتملت المرحلة":"أكمل الحركات بحسب راحتك");
 if(before<moves.length&&after===moves.length){foUnlockAudio();foPlaySound(kind==="warm"?"set":"ring");foFeedback(kind==="warm"?"✓ READY TO TRAIN":"✓ COOL DOWN COMPLETE")}
}
const mdCoreToday=today;
today=function(){
 const html=mdCoreToday();
 if(!uid)return html;
 const r=mdDayRoutine(mdDayIndex());
 const stageNav=mdStagesNav(r.warm,r.cool);const prefix=mdStage("warm",r.warm,r.video);
 const trainingMarker='<div class="section-heading"><div><span class="section-kicker">THE WORK</span>';
 const workoutAnchor='<div id="madar-training" class="md-training-heading"><span class="md-phase-number">02</span><span>تمارين اليوم</span></div>';
 const footer=mdStage("cool",r.cool);
 let out=html;
 const activityMarker='<div class="card rings-panel">';
 if(out.includes(activityMarker))out=out.replace(activityMarker,stageNav+activityMarker);
 else out=stageNav+out;
 if(out.includes(trainingMarker))out=out.replace(trainingMarker,prefix+workoutAnchor+trainingMarker);
 else out=prefix+workoutAnchor+out;
 const endButton='<button class="end-day"';
 if(out.includes(endButton))out=out.replace(endButton,footer+endButton);
 else out+=footer;
 return out
};
