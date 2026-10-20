/* MADAR push-only Service Worker: no offline cache or Health data interception. */
const HOME="https://frks-i.github.io/Bader-alqahtani/bader-fit/index.html";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
self.addEventListener("push",event=>{
  let payload={title:"مدار",body:"لديك تحديث جديد في رحلتك اليومية.",data:{url:HOME}};
  try{
    if(event.data){
      const parsed=event.data.json();
      if(parsed&&typeof parsed==="object")payload={...payload,...parsed};
    }
  }catch{ /* never drop an incoming push without showing a notification */ }
  const safeUrl=typeof payload.data?.url==="string"&&payload.data.url.startsWith("https://frks-i.github.io/Bader-alqahtani/bader-fit/")?payload.data.url:HOME;
  event.waitUntil(self.registration.showNotification(String(payload.title||"FORM / ONE").slice(0,100),{
    body:String(payload.body||"").slice(0,240),
    icon:"./icon.svg",
    badge:"./icon.svg",
    tag:String(payload.tag||"formone-update").slice(0,120),
    timestamp:Number(payload.timestamp)||Date.now(),
    data:{url:safeUrl},
    renotify:false
  }));
});
self.addEventListener("notificationclick",event=>{
  event.notification.close();
  const target=typeof event.notification.data?.url==="string"?event.notification.data.url:HOME;
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const client of windows){
      if(client.url.startsWith("https://frks-i.github.io/Bader-alqahtani/bader-fit/")){
        await client.focus();
        client.postMessage({type:"FORMONE_PUSH_OPEN",url:target});
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});