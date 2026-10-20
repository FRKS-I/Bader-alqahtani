/* FORM / ONE — Web Push on individual signed-in devices. */
const foPushPublicKey="BJcPk9PfA7pvPVxf9cro9gyAV_sBHLax7XRYZWeezQYS71crYaI3g0dw4EJ_-sTaBu4FMaYEGF3qXQN8RBKnxkc";
const foPushDefaults={workout:true,rest:true,streak:true,rings:true,sleep:true,weekly:true,workout_hour:18,sleep_hour:21};
let foPushState={subscribed:false,enabled:false,preferences:{...foPushDefaults},busy:false,error:""},foPushFetchedAt=0;
function foPushDeviceId(){const key="formone-push-device-v1";let id=localStorage.getItem(key);if(!id){id=crypto.randomUUID();localStorage.setItem(key,id)}return id}
function foPushBase64Bytes(s){const b=atob(s.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(s.length/4)*4,"="));return Uint8Array.from(b,c=>c.charCodeAt(0))}
function foPushInstalled(){return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}
function foPushSupported(){return isSecureContext&&"serviceWorker" in navigator&&"PushManager" in window&&"Notification" in window&&crypto?.randomUUID}
async function foPushRequest(action,body={}){
 if(!uid||!token)throw Error("Sign in first");
 const res=await fetch(URL_+"/functions/v1/formone-push",{method:"POST",headers:authHeader(),body:JSON.stringify({action,device_id:foPushDeviceId(),...body})});
 const json=await res.json().catch(()=>({}));
 if(!res.ok)throw Error(json.error||"Push service unavailable");
 return json
}
function foPushStatusMessage(){
 if(foPushState.error)return '<span class="fo-push-error">'+esc(foPushState.error)+'</span>';
 if(!foPushSupported())return 'Open FORM ONE from its Home Screen icon on a supported device.';
 if(!foPushInstalled()&&/iPad|iPhone|iPod/i.test(navigator.userAgent))return 'Open FORM ONE from its Home Screen icon, not Safari.';
 if(Notification.permission==="denied")return 'Notifications are blocked in iOS Settings. Allow them for FORM ONE.';
 return foPushState.subscribed&&foPushState.enabled&&Notification.permission==="granted"?'● CONNECTED · Notifications enabled on this device':'○ Not connected on this device';
}
function foPushPanel(){
 const p=foPushState.preferences||foPushDefaults,on=foPushState.subscribed&&foPushState.enabled;
 const options=[["workout","Workout reminder","Reminder on training days"],["rest","Rest timer","Timer completion when app is closed"],["streak","Streaks & achievements","Milestone sessions"],["rings","Activity goals","After Apple Health sync"],["sleep","Sleep reminder","Recovery journal"],["weekly","Weekly report","Weekly consistency recap"]];
 const hours=key=>Array.from({length:24},(_,i)=>'<option value="'+i+'" '+(Number(p[key])===i?'selected':'')+'>'+String(i).padStart(2,'0')+':00</option>').join('');
 return '<div class="card fo-push-panel"><div class="fo-section-line"><span class="fo-icon-disc">♧</span><div><span class="section-kicker">IPHONE & IPAD</span><h2>Push notifications</h2></div></div><p class="muted">Get alerts on your Lock Screen even when FORM ONE is closed. Each device has its own preferences.</p><div class="fo-push-status">'+foPushStatusMessage()+'</div><div class="fo-push-actions"><button '+(foPushState.busy?'disabled':'')+' onclick="foPushEnable()">'+(on?'Reconnect':'Enable Notifications')+'</button>'+(on?'<button class="secondary" onclick="foPushTest()">Send test</button><button class="secondary" onclick="foPushDisable()">Turn off</button>':'')+'</div>'+(on?'<div class="fo-push-options">'+options.map(([k,name,description])=>'<label class="fo-push-option"><span><b>'+name+'</b><small>'+description+'</small></span><input type="checkbox" '+(p[k]!==false?'checked':'')+' onchange="foPushToggle(\''+k+'\',this.checked)"></label>').join('')+'<div class="fo-push-time-row"><label>Workout hour · Saudi time<select onchange="foPushHour(\'workout_hour\',this.value)">'+hours('workout_hour')+'</select></label><label>Sleep hour · Saudi time<select onchange="foPushHour(\'sleep_hour\',this.value)">'+hours('sleep_hour')+'</select></label></div></div>':'')+'<p class="muted">Tap Enable, then Allow on the Apple prompt. Reminders depend on the background scheduler, connectivity and iOS delivery; rest reminders may be late.</p></div>'
}
function foPushReplacePanel(){const old=document.querySelector(".fo-push-panel");if(!old)return;const el=document.createElement("div");el.innerHTML=foPushPanel();old.replaceWith(el.firstElementChild)}
async function foPushRefresh(force=false){
 if(!uid||foPushState.busy||(!force&&Date.now()-foPushFetchedAt<30000))return;
 foPushFetchedAt=Date.now();
 try{const r=await foPushRequest("status");foPushState={...foPushState,subscribed:r.subscribed===true,enabled:r.enabled===true,preferences:r.preferences||foPushDefaults,error:"",loaded:true}}
 catch(e){foPushState.error=String(e.message||e)}
 foPushReplacePanel()
}
async function foPushEnable(){
 if(foPushState.busy)return;
 if(!foPushSupported()){foPushState.error="Push notifications are not supported here.";foPushReplacePanel();return}
 if(!foPushInstalled()&&/iPad|iPhone|iPod/i.test(navigator.userAgent)){foPushState.error="Launch the app icon on your Home Screen first.";foPushReplacePanel();return}
 /* Prompt during the user's tap, before the first await. */
 const permission=Notification.permission==="granted"?Promise.resolve("granted"):Notification.requestPermission();
 foPushState.busy=true;foPushState.error="";foPushReplacePanel();
 try{
  if(await permission!=="granted")throw Error("Permission not granted. If previously denied, change it in iOS Settings.");
  const reg=await navigator.serviceWorker.register("./sw.js",{scope:"./"});
  await navigator.serviceWorker.ready;
  let sub=await reg.pushManager.getSubscription();
  if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:foPushBase64Bytes(foPushPublicKey)});
  const r=await foPushRequest("subscribe",{subscription:sub.toJSON(),preferences:foPushState.preferences,label:(navigator.platform||"Apple device").slice(0,70),platform:/iPad|iPhone|iPod/i.test(navigator.userAgent)?"ios-pwa":"web"});
  foPushState={...foPushState,subscribed:true,enabled:true,preferences:r.preferences||foPushDefaults,error:""};foPushFetchedAt=Date.now();notice("Notifications connected on this device");
 }catch(e){foPushState.error=String(e.message||e)}
 finally{foPushState.busy=false;foPushReplacePanel()}
}
async function foPushTest(){try{const r=await foPushRequest("test");notice(r.accepted?"Test accepted by push service":"Already sent recently or reconnect needed")}catch(e){notice("Test failed: "+String(e.message||e))}}
async function foPushDisable(){
 if(!confirm("Turn off push notifications on this device?"))return;
 try{
  await foPushRequest("unsubscribe");
  const reg=await navigator.serviceWorker.getRegistration("./");const sub=await reg?.pushManager.getSubscription();if(sub)await sub.unsubscribe();
  foPushState.subscribed=false;foPushState.enabled=false;foPushState.error="";foPushReplacePanel();notice("Notifications turned off");
 }catch(e){foPushState.error=String(e.message||e);foPushReplacePanel()}
}
async function foPushUpdate(values){
 foPushState.preferences={...foPushState.preferences,...values};
 try{const r=await foPushRequest("preferences",{preferences:foPushState.preferences});foPushState.preferences=r.preferences||foPushState.preferences;foPushState.error="";notice("Notification preference saved")}
 catch(e){foPushState.error=String(e.message||e)}
 foPushReplacePanel()
}
function foPushToggle(key,v){foPushUpdate({[key]:v})}
function foPushHour(key,v){const n=Number(v);if(Number.isInteger(n)&&n>=0&&n<24)foPushUpdate({[key]:n})}
let foRestId=null;
const foTimerPushBase=timer;
timer=function(s){
 const secondsNumber=Math.max(1,Math.round(Number(s)||30));foTimerPushBase(secondsNumber);
 if(!foPushState.subscribed||!foPushState.enabled||foPushState.preferences.rest===false)return;
 const id=crypto.randomUUID();foRestId=id;
 foPushRequest("rest_schedule",{timer_id:id,due_at:new Date(Date.now()+secondsNumber*1000).toISOString(),exercise_name:current()?.ex?.[ix]?.n||""}).catch(e=>console.warn("Rest push unavailable",String(e.message||e)))
};
const foSettingsPushBase=settings;
settings=function(){return foPushPanel()+foSettingsPushBase()};
const foRenderPushBase=render;
render=function(){foRenderPushBase();if(uid&&(view==="Settings"||!foPushState.loaded))foPushRefresh().catch(()=>{})};
render();
