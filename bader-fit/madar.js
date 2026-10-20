/* MADAR personal app presentation layer.
   Render-only enhancements. Does not alter authentication, data models,
   exercise logging, HealthKit bridge, push subscriptions or timer state. */
(function(){
  "use strict";
  const sectionNames={
    Today:["اليوم","Today"],
    Plan:["البرنامج","Program"],
    Nutrition:["الغذاء","Nutrition"],
    Progress:["التقدم","Progress"],
    Settings:["الإعدادات","Settings"]
  };
  const headingNames={
    Plan:["خطة الأسبوع","كل جلسة في وقتها. اختر يومًا لعرض التمارين والأوزان المقترحة.","خطتك في مدار"],
    Nutrition:["غذاؤك","سعراتك ووجباتك وماؤك، بوضوح ومن دون ازدحام.","توازن يومك"],
    Progress:["صحتك وتقدمك","استمراريتك ونشاطك ونبضك ونومك، في مكان واحد.","رحلتك بالأرقام"],
    Settings:["إعدادات مدار","تحكم بالتنبيهات والأهداف والمزامنة لكل جهاز.","تخصيص مساحتك"]
  };
  const trainingNames={
    "Upper A":"تمارين الجزء العلوي A",
    "Upper B":"تمارين الجزء العلوي B",
    "Lower A":"تمارين الجزء السفلي A",
    "Lower B":"تمارين الجزء السفلي B",
    "Cardio + Posture":"الكارديو والقوام",
    "Cardio Endurance":"تمارين التحمل",
    "Recovery":"يوم الاستشفاء"
  };
  const weekdays={
    Sunday:"الأحد",Monday:"الاثنين",Tuesday:"الثلاثاء",
    Wednesday:"الأربعاء",Thursday:"الخميس",Friday:"الجمعة",Saturday:"السبت"
  };
  const BRAND="مدار";
  document.title="مدار | MADAR — مساحتك اليومية";
  const favicon=document.querySelector('link[rel="icon"]');
  if(favicon)favicon.href="./icon.svg?v=madar2";

  // One-time install instructions were declined. Do not permanently display them.
  if(typeof foInstallGuide==="function")foInstallGuide=function(){return ""};

  function greetingMarkup(){
    const hour=Number(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Riyadh",hour:"2-digit",hourCycle:"h23"}).format(new Date()));
    const greeting=hour<12?"صباح الخير":hour<18?"نهارك جميل":"مساء الخير";
    let formatted="";
    try{
      formatted=new Intl.DateTimeFormat("ar-SA-u-ca-gregory",{weekday:"long",day:"numeric",month:"long",timeZone:"Asia/Riyadh"}).format(new Date(day+"T12:00:00+03:00"));
    }catch{formatted=day}
    return '<section class="madar-hello" dir="rtl" aria-label="ترحيب مدار">'+
      '<div><span>مدار • كل يوم خطوة</span><strong>'+greeting+'</strong></div>'+
      '<span class="madar-date">'+formatted+'</span></section>';
  }
  function enhanceToday(app){
    if(!app.querySelector(".madar-hello"))app.insertAdjacentHTML("afterbegin",greetingMarkup());
    const hero=app.querySelector(".card.hero");
    if(hero){
      if(!hero.querySelector(".madar-orb-art")){
        hero.insertAdjacentHTML("afterbegin",'<img class="madar-orb-art" src="./icon.svg?v=madar2" alt="" aria-hidden="true" loading="eager">');
      }
      const title=hero.querySelector("h1");
      if(title&&trainingNames[title.textContent.trim()]){
        title.textContent=trainingNames[title.textContent.trim()];
        title.setAttribute("dir","rtl");
        title.style.textAlign="left";
      }
    }
    const subtitle=hero?.querySelector("p");
    if(subtitle&&subtitle.textContent.includes("Your work starts here")){
      subtitle.textContent="كل خطوة محسوبة، وعلى وتيرتك.";
      subtitle.setAttribute("lang","ar");
    }
    const tag=hero?.querySelector(".todaytag");
    if(tag&&tag.textContent.includes("SESSION"))tag.textContent="جلسة اليوم "+(tag.textContent.match(/\d+/)?.[0]||"");
    const statLabels={
      "STRENGTH":"القوة","ENGINE":"الكارديو","STATUS":"الحالة",
      "SETS COMPLETE":"المجموعات المنجزة","CARDIO LOGGED":"الكارديو المسجل","DAILY MISSION":"مهمة اليوم"
    };
    app.querySelectorAll(".stat small").forEach(el=>{
      let label=el.textContent.trim();
      for(const [from,to] of Object.entries(statLabels))label=label.replace(from,to);
      el.textContent=label;
    });
    const rings=app.querySelector(".rings-panel h2");
    if(rings)rings.textContent="حلقات النشاط";
    const session=app.querySelector(".section-heading h2");
    if(session)session.textContent="تمارين اليوم";
  }
  function enhanceSection(app,which){
    const heading=app.querySelector(".fo-page-heading");
    const name=headingNames[which];if(!heading||!name)return;
    const kicker=heading.querySelector(".section-kicker");
    const title=heading.querySelector("h1");
    const subtitle=heading.querySelector("p");
    if(kicker)kicker.textContent=name[2];
    if(title){title.textContent=name[0];title.setAttribute("dir","rtl")}
    if(subtitle){subtitle.textContent=name[1];subtitle.setAttribute("dir","rtl")}
    heading.setAttribute("aria-label",name[0]);
    const sectionCardTitles={
      Progress:[[".fo-consistency h2","الاستمرارية"],[".fo-watch h2","تحليل الساعة"],[".fo-sleep h2","النوم والتعافي"],[".rings-panel h2","حلقات النشاط"]],
      Nutrition:[[".fo-fuel-summary h2","الرصيد اليومي"],[".fo-meals h2","وجبات اليوم"]]
    };
    for(const [selector,text] of sectionCardTitles[which]||[]){
      const el=app.querySelector(selector);if(el){const count=selector===".fo-meals h2"?(el.querySelector("small")?.textContent||""):"";el.textContent=text+(count?" "+count:"");}
    }
    if(which==="Plan"){
      app.querySelectorAll(".fo-plan-day .fo-day-meta strong").forEach(el=>{
        let text=el.textContent;
        for(const [eng,ar] of Object.entries(weekdays))text=text.replace(eng,ar);
        for(const [eng,ar] of Object.entries(trainingNames))text=text.replace(eng,ar);
        el.textContent=text;
      });
    }
  }
  function enhanceNavigation(){
    const buttons=document.querySelectorAll("#nav button");
    buttons.forEach((button,index)=>{
      const key=["Today","Plan","Nutrition","Progress","Settings"][index];
      if(!key)return;
      let label=button.querySelector("span");
      if(label)label.textContent=sectionNames[key][0];
      button.setAttribute("aria-label",sectionNames[key][1]+" — "+sectionNames[key][0]);
      button.setAttribute("title",sectionNames[key][0]);
      button.setAttribute("lang","ar");
    });
  }
  function replaceVisibleOldBrand(app){
    // Do not rewrite innerHTML or event handlers; only explicit display strings.
    app.querySelectorAll("h1,h2,.section-kicker").forEach(el=>{
      if(el.textContent.trim()==="FORM / ONE"||el.textContent.trim()==="FORM ONE"){
        el.textContent=BRAND;
      }
    });
  }
  const previousRender=render;
  render=function(){
    previousRender();
    const status=document.getElementById("status");
    if(status)status.textContent=uid?"☁ حسابك":"تسجيل الدخول";
    const normalized=view==="Exercise"?"Plan":view;
    document.body.dataset.formSection=normalized;
    enhanceNavigation();
    const app=document.getElementById("app");
    if(!app||!uid)return;
    if(view==="Today")enhanceToday(app);
    else if(view==="Plan"||view==="Progress"||view==="Nutrition"||view==="Settings")enhanceSection(app,view);
    replaceVisibleOldBrand(app);
  };
  render();
})();
