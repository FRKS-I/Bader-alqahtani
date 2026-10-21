/* MADAR audio signature — distinct audible motifs for rest, ring and completed session.
   Generated locally via Web Audio; no media downloads or microphone.
   iOS installed-PWA sound is subject to device volume, mute and foreground limitations.
*/
function mdGetSoundPrefs(){
 try{
  const x=JSON.parse(localStorage.getItem(foSfxStorage)||"{}");
  return{enabled:x.enabled!==false,level:Math.max(0,Math.min(1,Number.isFinite(Number(x.level))?Number(x.level):.85))}
 }catch{return{enabled:true,level:.85}}
}
foSfxPrefs=mdGetSoundPrefs;
let mdAudioOutput=null,mdAudioContextId=null;
function mdAudioBus(context){
 if(mdAudioContextId!==context){
  const limiter=context.createDynamicsCompressor();
  limiter.threshold.value=-14;limiter.knee.value=10;limiter.ratio.value=3.5;limiter.attack.value=.003;limiter.release.value=.21;
  const master=context.createGain();master.gain.value=.82;
  limiter.connect(master);master.connect(context.destination);
  mdAudioOutput=limiter;mdAudioContextId=context;
 }
 return mdAudioOutput
}
function mdTone(ctx,start,frequency,duration,volume,wave="triangle",detune=0){
 if(!(ctx&&Number.isFinite(start)))return;
 const osc=ctx.createOscillator(),g=ctx.createGain();
 osc.type=wave;osc.frequency.setValueAtTime(frequency,start);osc.detune.setValueAtTime(detune,start);
 g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(Math.max(.0001,volume),start+.017);
 g.gain.exponentialRampToValueAtTime(Math.max(.0001,volume*.39),start+Math.max(.04,duration*.36));
 g.gain.exponentialRampToValueAtTime(.0001,start+duration);
 osc.connect(g);g.connect(mdAudioBus(ctx));
 osc.start(start);osc.stop(start+duration+.025);
}
foPlaySound=function(type){
 const pref=foSfxPrefs();
 if(pref.enabled===false||pref.level<=.001||document.visibilityState==="hidden")return;
 const ctx=foAudioCtx||foUnlockAudio();if(!ctx)return;
 if(ctx.state!=="running"){ctx.resume().then(()=>{if(ctx.state==="running")foPlaySound(type)}).catch(()=>{});return}
 const level=pref.level,now=ctx.currentTime+.016;
 if(type==="timer"){
  // Short bright three-note signal, a different rhythm from all other alerts.
  [[740,0,.18],[988,.21,.18],[1480,.44,.44]].forEach(([hz,dur,len],i)=>{
   mdTone(ctx,now+dur,hz,len,.27*level,"triangle");
   mdTone(ctx,now+dur,hz*2,len*.78,.072*level,"sine")
  });
 }else if(type==="session"){
  // Triumphant but soft ascending fanfare ending in a sustained major chord.
  [[392,0,.27],[493.88,.22,.28],[587.33,.44,.30],[783.99,.67,.34],[1046.5,.91,.73]].forEach(([hz,delay,len])=>{
   mdTone(ctx,now+delay,hz,len,.22*level,"triangle");
   mdTone(ctx,now+delay,hz*2,len*.8,.045*level,"sine")
  });
  [523.25,659.25,783.99].forEach((hz,i)=>mdTone(ctx,now+1.19,hz,.87,(i===0?.11:.088)*level,"sine"));
 }else if(type==="ring"){
  // Floating glassy ripple: high bell overtone + trailing sparkle.
  [[880,0,.56],[1174.66,.145,.76],[1760,.38,.95]].forEach(([hz,delay,len])=>{
   mdTone(ctx,now+delay,hz,len,.18*level,"sine");
   mdTone(ctx,now+delay,hz*2.01,len*.62,.045*level,"triangle");
  });
 }else{
  // Short wooden confirmation, less intrusive than a timer.
  mdTone(ctx,now,440,.09,.12*level,"triangle");
  mdTone(ctx,now+.09,660,.13,.12*level,"triangle")
 }
};
foPreviewSound=function(type){
 // Called by a real tap, so AudioContext unlocking is permitted in iOS.
 foUnlockAudio();foPlaySound(type)
};
const mdOldSoundSettings=foSoundSettings;
foSoundSettings=function(){
 return mdOldSoundSettings()
  .replace("3 soft notification melodies","3 distinct sounds · clearer volume")
  .replace("♪ Rest done","♬ REST · ثلاث نغمات")
  .replace("♫ Session done","★ FINISH · لحن ختامي")
  .replace("✦ Ring closed","◇ RING · رنين زجاجي")
  .replace("Tap a preview once to allow audio on iPhone. Sounds work while the website is active; iOS may pause background audio and timers. The mute switch applies on this device.","اضغط على أي نغمة لتجربتها. يعمل الصوت المخصص داخل مدار وهو مفتوح، لكن iOS يحدد صوت إشعارات شاشة القفل ولا يسمح لمواقع الويب بتعيين نغمة خارجية مخصصة. الصوت يعتمد على مستوى صوت الجهاز ووضع الصامت.");
};
const mdOldVolume=foSfxSaveLevel;
foSfxSaveLevel=function(value){
 mdOldVolume(value);
 const label=document.querySelector(".fo-audio-panel label");
 if(label){const n=label.firstChild;if(n&&n.nodeType===3)n.nodeValue="مستوى الصوت · "+Math.round(Number(value))+"%";}
};
