/* RKHP avatar guide: walks along the page as you scroll, then stops to "read" each section.
   Usage: <script src="avatar-guide.js"></script> just before </body> */
(function () {
  if (window.innerWidth < 600) return;

  // Edit these notes freely. Keys match section ids ("hero" = top of page).
  const notes = {
    hero: "Hi, I'm Rachna. I build data systems you can trust, from pipelines to models.",
    about: "5+ years across healthcare, pharma and research: data engineering, AI/ML and analytics.",
    journey: "Ingest, Trust, Model, Understand, Decide. Trust is the step I never skip.",
    experience: "Now at TechMentee building Fabric Lakehouses for HCA Healthcare. Before: Genpact, UNT, Eka Care.",
    skills: "Python, SQL, PySpark, Delta Lake, Power BI, TensorFlow, PyTorch, U-Net and more.",
    projects: "Medallion Lakehouse, U-Net segmentation (+22% IoU), 87% accurate models, clinical OCR.",
    education: "M.S. Data Science, UNT (2023). B.S. Computer Science (2021).",
    contact: "Let's build something meaningful. Say hello below!"
  };

  const css = `
  .rk-av{position:fixed;left:0;bottom:10px;width:60px;height:120px;z-index:90;pointer-events:none;will-change:transform}
  .rk-flip{width:60px;height:120px;transition:transform .25s}
  .rk-av svg{width:60px;height:120px;overflow:visible}
  .rk-av g{transform-box:view-box}
  .rk-bob{animation:rkIdle 3s ease-in-out infinite}
  .rk-walking .rk-bob{animation:rkBob .46s ease-in-out infinite}
  .rk-ll{transform-origin:25px 68px}.rk-lr{transform-origin:35px 68px}
  .rk-al{transform-origin:21px 33px}.rk-ar{transform-origin:39px 33px}
  .rk-walking .rk-ll{animation:rkSwing .92s ease-in-out infinite}
  .rk-walking .rk-lr{animation:rkSwing .92s ease-in-out infinite reverse}
  .rk-walking .rk-al{animation:rkSwing .92s ease-in-out infinite reverse}
  .rk-walking .rk-ar{animation:rkSwing .92s ease-in-out infinite}
  .rk-reading .rk-al{transform:rotate(-58deg);transition:transform .4s}
  .rk-reading .rk-ar{transform:rotate(58deg);transition:transform .4s}
  .rk-book{opacity:0;transition:opacity .3s}
  .rk-reading .rk-book{opacity:1}
  .rk-eye{transform-origin:center;animation:rkBlink 4s infinite}
  .rk-shadow{position:absolute;left:8px;bottom:-4px;width:44px;height:8px;border-radius:50%;background:rgba(0,0,0,.55);filter:blur(4px)}
  .rk-bubble{position:absolute;bottom:128px;left:30px;width:240px;padding:12px 14px;border:1px solid rgba(88,224,202,.35);
    border-radius:12px;background:rgba(10,13,19,.88);backdrop-filter:blur(14px);color:#c9cfdb;
    font:500 .72rem/1.6 "JetBrains Mono",monospace;opacity:0;transform:translateX(-50%) translateY(6px);transition:opacity .3s,transform .3s}
  .rk-bubble b{display:block;color:#58e0ca;font-size:.6rem;letter-spacing:.16em;margin-bottom:5px}
  .rk-bubble::after{content:"";position:absolute;bottom:-6px;left:calc(50% - 5px - var(--shift,0px));width:10px;height:10px;
    background:rgba(10,13,19,.95);border-right:1px solid rgba(88,224,202,.35);border-bottom:1px solid rgba(88,224,202,.35);transform:rotate(45deg)}
  .rk-reading .rk-bubble{opacity:1}
  @keyframes rkSwing{0%,100%{transform:rotate(-26deg)}50%{transform:rotate(26deg)}}
  @keyframes rkBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  @keyframes rkIdle{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
  @keyframes rkBlink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
  @media (prefers-reduced-motion:reduce){.rk-av *{animation:none!important}}
  @media (max-width:600px){.rk-av{display:none}}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const el = document.createElement("div");
  el.className = "rk-av";
  el.innerHTML = `
  <div class="rk-bubble"><b>READING</b><span class="rk-text"></span></div>
  <div class="rk-shadow"></div>
  <div class="rk-flip"><svg viewBox="0 0 60 120">
    <g class="rk-bob">
      <g class="rk-ll"><rect x="21" y="66" width="8" height="42" rx="4" fill="#10141d"/><rect x="19" y="104" width="12" height="6" rx="3" fill="#58e0ca"/></g>
      <g class="rk-lr"><rect x="31" y="66" width="8" height="42" rx="4" fill="#10141d"/><rect x="29" y="104" width="12" height="6" rx="3" fill="#58e0ca"/></g>
      <g class="rk-al"><rect x="17" y="30" width="8" height="30" rx="4" fill="#1b202c"/><circle cx="21" cy="61" r="4" fill="#b87958"/></g>
      <rect x="18" y="28" width="24" height="42" rx="11" fill="#252c3a"/>
      <rect x="28" y="32" width="4" height="26" rx="2" fill="#9b8cff" opacity=".55"/>
      <rect x="27" y="22" width="6" height="8" fill="#b87958"/>
      <ellipse cx="30" cy="15" rx="10" ry="11" fill="#d7a37e"/>
      <path d="M19 14C19 3 29 0 36 3c5 2 6 8 5 13l-2 -6c-5 1 -12 0 -16 -2z" fill="#211d29"/>
      <path d="M38 10c4 4 5 14 1 24-3-4-3-14-1-24z" fill="#211d29"/>
      <g class="rk-eye"><circle cx="33" cy="16" r="1.4" fill="#211d29"/><circle cx="27" cy="16" r="1.4" fill="#211d29"/></g>
      <path d="M28 21q3 2 5 0" stroke="#8a4f3a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <g class="rk-book"><rect x="18" y="40" width="24" height="16" rx="2" fill="#0d1118" stroke="#58e0ca"/>
        <line x1="30" y1="41" x2="30" y2="55" stroke="#58e0ca" opacity=".6"/>
        <line x1="21" y1="46" x2="28" y2="46" stroke="#9b8cff"/><line x1="21" y1="50" x2="27" y2="50" stroke="#9b8cff"/>
        <line x1="32" y1="46" x2="39" y2="46" stroke="#9b8cff"/><line x1="32" y1="50" x2="38" y2="50" stroke="#9b8cff"/></g>
      <g class="rk-ar"><rect x="35" y="30" width="8" height="30" rx="4" fill="#1b202c"/><circle cx="39" cy="61" r="4" fill="#b87958"/></g>
    </g></svg></div>`;
  document.body.appendChild(el);

  const flip = el.querySelector(".rk-flip");
  const bubble = el.querySelector(".rk-bubble");
  const textEl = el.querySelector(".rk-text");
  const sections = [...document.querySelectorAll("section")];
  const idOf = (s) => s.id || (s.classList.contains("hero") ? "hero" : "");

  let x = 12, dir = 1, shown = null, typer = null, idleTimer = null;

  function targetX() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    return 12 + p * (innerWidth - 90);
  }
  function currentId() {
    const mid = innerHeight * 0.4;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) return idOf(s);
    }
    return "hero";
  }
  function typeText(msg) {
    clearInterval(typer);
    textEl.textContent = "";
    let i = 0;
    typer = setInterval(() => {
      textEl.textContent = msg.slice(0, ++i);
      if (i >= msg.length) clearInterval(typer);
    }, 22);
  }
  function startReading() {
    const id = currentId();
    const msg = notes[id];
    if (!msg) return;
    const center = x + 30, half = 120;
    let shift = 0;
    if (center - half < 12) shift = 12 - (center - half);
    else if (center + half > innerWidth - 12) shift = innerWidth - 12 - (center + half);
    bubble.style.transform = `translateX(calc(-50% + ${shift}px)) translateY(0)`;
    bubble.style.setProperty("--shift", shift + "px");
    el.classList.add("rk-reading");
    if (shown !== id) { shown = id; typeText(msg); }
  }
  function stopReading() {
    el.classList.remove("rk-reading");
    bubble.style.transform = "translateX(-50%) translateY(6px)";
  }

  function tick() {
    const dx = targetX() - x;
    if (Math.abs(dx) > 2) {
      const step = Math.sign(dx) * Math.min(Math.abs(dx) * 0.08 + 1.4, 4);
      x += step;
      dir = Math.sign(dx);
      flip.style.transform = dir < 0 ? "scaleX(-1)" : "scaleX(1)";
      if (!el.classList.contains("rk-walking")) { el.classList.add("rk-walking"); stopReading(); }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { el.classList.remove("rk-walking"); startReading(); }, 450);
    } else if (el.classList.contains("rk-walking")) {
      el.classList.remove("rk-walking");
      clearTimeout(idleTimer);
      idleTimer = setTimeout(startReading, 300);
    }
    el.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(tick);
  }
  window.addEventListener("scroll", () => { shown = null; }, { passive: true });
  // face forward while reading
  new MutationObserver(() => {
    if (el.classList.contains("rk-reading")) flip.style.transform = "scaleX(1)";
  }).observe(el, { attributes: true, attributeFilter: ["class"] });

  setTimeout(() => { tick(); setTimeout(startReading, 1800); }, 1200);
})();
