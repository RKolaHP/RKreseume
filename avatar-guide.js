/* RKHP mascot "Byte": follows your cursor and reads whatever you hover.
   Usage: <script src="avatar-guide.js"></script> just before </body> (after your main </script>) */
(function () {
  if (window.innerWidth < 600 || matchMedia("(hover:none)").matches) return;

  // Things the mascot will read when hovered. Add data-read="custom text" on any element to override its text.
  const READABLE = "[data-read],a,button,.skill,.tag,.metric,.capability,.journey-step,.project,.experience li,.experience h3,.company,.education-card,.about-text p,.hero-description,.journey-statement,.contact p,h2,.title";

  
  // Explanations spoken/typed when you hover something containing these words (first match wins).
  const INFO = {
    "medallion": "Medallion architecture: Bronze keeps raw source data, Silver cleans and validates it, Gold serves curated, decision-ready datasets. Rachna builds this on Microsoft Fabric for HCA Healthcare.",
    "microsoft fabric": "Microsoft Fabric is Microsoft's unified analytics platform. Rachna designs Lakehouse solutions on OneLake with PySpark, SQL and Delta Lake, feeding Power BI.",
    "u-net": "U-Net is a deep-learning model for medical image segmentation. Rachna improved segmentation IoU by about 22% through preprocessing, augmentation, training and error analysis.",
    "87%": "Her predictive models reached about 87% accuracy while cutting model variance by 18%, using feature engineering, model selection and statistical validation.",
    "ocr": "At Eka Care she built OCR and NLP workflows that turn prescriptions and lab reports into structured data: tests, values, units and reference ranges.",
    "delta lake": "Delta Lake gives reliable, versioned tables with fast queries. She optimizes joins, partitioning and incremental processing on it.",
    "power bi": "Power BI and Tableau dashboards sit on top of curated Gold datasets she builds, giving stakeholders trusted KPIs.",
    "data quality": "Data quality controls: completeness, uniqueness, referential integrity, schema consistency, valid ranges and business rules, with reconciliation across every layer.",
    "hca healthcare": "Current role (May 2026 to present): Data Engineer at TechMentee, Inc., working for HCA Healthcare on Fabric Lakehouse solutions.",
    "hikma": "Genpact, May 2024 to May 2026: built pharma data workflows, predictive models and U-Net segmentation for Hikma Pharmaceuticals.",
    "eka care": "Eka Care, Aug 2021 to Jul 2022: healthcare data science, OCR post-processing, synthetic data and feature engineering.",
    "pohl": "UNT Pohl Recreation Center, 2022 to 2023: analytics engineering, KPI reporting and utilization trend analysis.",
    "master of science": "M.S. in Data Science, University of North Texas, graduated December 2023, GPA 3.63.",
    "bachelor of science": "B.S. in Computer Science, Malla Reddy Engineering College for Women, May 2021, GPA 3.50.",
    "ingest": "Her approach: ingest, trust, model, understand, decide. Data earns trust through validation before it informs any decision.",
    "pytorch": "PyTorch and TensorFlow power her deep-learning work, including CNNs and U-Net for computer vision.",
    "linkedin": "Connect with Rachna on LinkedIn to see her full professional profile.",
    "start a conversation": "Click here to email Rachna. She enjoys ambiguous problems between data engineering, analytics and AI."
  };
  function explain(t) {
    const s = (t.innerText || "").toLowerCase();
    for (const k in INFO) if (s.includes(k)) return INFO[k];
    return "";
  }
  // Real avatar: put a transparent PNG named avatar.png beside your HTML (size below is in pixels).
  const AV = { src: "data:image/jpeg;base64,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", w: 110, h: 110, round: true };

  const css = `
  .bt{position:fixed;left:0;bottom:8px;width:64px;height:90px;z-index:90;pointer-events:none;will-change:transform}
  .bt-flip{width:64px;height:90px;transition:transform .2s}
  .bt svg{width:64px;height:90px;overflow:visible}
  .bt g{transform-box:view-box}
  .bt-bob{animation:btIdle 3s ease-in-out infinite}
  .bt-walk .bt-bob{animation:btBob .4s ease-in-out infinite}
  .bt-ll{transform-origin:24px 66px}.bt-lr{transform-origin:40px 66px}
  .bt-al{transform-origin:12px 42px}.bt-ar{transform-origin:52px 42px}
  .bt-walk .bt-ll,.bt-walk .bt-ar{animation:btSwing .8s ease-in-out infinite}
  .bt-walk .bt-lr,.bt-walk .bt-al{animation:btSwing .8s ease-in-out infinite reverse}
  .bt-read .bt-al{transform:rotate(-70deg);transition:transform .35s}
  .bt-read .bt-ar{transform:rotate(70deg);transition:transform .35s}
  .bt-book{opacity:0;transition:opacity .25s}
  .bt-read .bt-book{opacity:1}
  .bt-ant{transform-origin:32px 18px;animation:btAnt 2.4s ease-in-out infinite}
  .bt-lid{transform-origin:center;animation:btBlink 4.5s infinite}
  .bt-shadow{position:absolute;left:10px;bottom:-4px;width:44px;height:8px;border-radius:50%;background:rgba(0,0,0,.55);filter:blur(4px)}
  .bt-bubble{position:absolute;bottom:98px;left:32px;width:260px;padding:12px 14px;border:1px solid rgba(88,224,202,.38);
    border-radius:12px;background:rgba(10,13,19,.92);backdrop-filter:blur(14px);color:#c9cfdb;
    font:500 .72rem/1.6 "JetBrains Mono",monospace;opacity:0;transform:translateX(-50%) translateY(6px);transition:opacity .25s,transform .25s}
  .bt-bubble b{display:block;color:#58e0ca;font-size:.58rem;letter-spacing:.16em;margin-bottom:5px}
  .bt-bubble::after{content:"";position:absolute;bottom:-6px;left:calc(50% - 5px - var(--shift,0px));width:10px;height:10px;
    background:rgba(10,13,19,.98);border-right:1px solid rgba(88,224,202,.38);border-bottom:1px solid rgba(88,224,202,.38);transform:rotate(45deg)}
  .bt-read .bt-bubble{opacity:1}
  .bt-hl{outline:1px dashed rgba(88,224,202,.7)!important;outline-offset:4px}
  .bt-voice{position:fixed;right:16px;bottom:16px;z-index:91;padding:7px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.14);
    background:rgba(10,13,19,.85);color:#9ca5b5;font:600 .6rem "JetBrains Mono",monospace;letter-spacing:.08em;cursor:pointer}
  .bt-voice.on{color:#58e0ca;border-color:#58e0ca}
  @keyframes btSwing{0%,100%{transform:rotate(-26deg)}50%{transform:rotate(26deg)}}
  @keyframes btBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  @keyframes btIdle{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
  @keyframes btAnt{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
  @keyframes btBlink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
  .bt-round img{border-radius:50%;object-fit:cover!important;object-position:center!important;border:2px solid #58e0ca;box-shadow:0 0 24px rgba(88,224,202,.35)}
  .bt-real img{width:100%;height:100%;object-fit:contain;object-position:bottom;transform-origin:50% 100%;user-select:none}
  .bt-real.bt-walk img{animation:btStep .55s ease-in-out infinite}
  .bt-real.bt-read img{animation:btTalk 1.1s ease-in-out infinite}
  @keyframes btStep{0%,100%{transform:rotate(-2.2deg) translateY(0)}50%{transform:rotate(2.2deg) translateY(-5px)}}
  @keyframes btTalk{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
  @media (prefers-reduced-motion:reduce){.bt *{animation:none!important}}`;
  document.head.appendChild(Object.assign(document.createElement("style"), { textContent: css }));

  const el = document.createElement("div");
  el.className = "bt";
  el.innerHTML = `
  <div class="bt-bubble"><b>READING</b><span class="bt-text"></span></div>
  <div class="bt-shadow"></div>
  <div class="bt-flip"><svg viewBox="0 0 64 90"><defs>
    <linearGradient id="btg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a99cff"/><stop offset="1" stop-color="#7a69e8"/></linearGradient></defs>
    <g class="bt-bob">
      <g class="bt-ll"><rect x="18" y="64" width="11" height="18" rx="5" fill="#5a4cc4"/><ellipse cx="22" cy="83" rx="8" ry="4" fill="#58e0ca"/></g>
      <g class="bt-lr"><rect x="35" y="64" width="11" height="18" rx="5" fill="#5a4cc4"/><ellipse cx="42" cy="83" rx="8" ry="4" fill="#58e0ca"/></g>
      <g class="bt-al"><rect x="5" y="40" width="9" height="22" rx="4.5" fill="#8c7cf0"/></g>
      <g class="bt-ant"><line x1="32" y1="18" x2="32" y2="6" stroke="#bfc5d2" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="5" r="4" fill="#58e0ca"/></g>
      <rect x="8" y="16" width="48" height="54" rx="24" fill="url(#btg)"/>
      <ellipse cx="32" cy="56" rx="14" ry="10" fill="#c9c1ff" opacity=".45"/>
      <rect x="12" y="26" width="40" height="18" rx="9" fill="#10141d"/>
      <g class="bt-lid"><circle cx="24" cy="35" r="6.5" fill="#fff"/><circle cx="40" cy="35" r="6.5" fill="#fff"/>
        <circle class="bt-pl" cx="24" cy="35" r="3" fill="#10141d"/><circle class="bt-pr" cx="40" cy="35" r="3" fill="#10141d"/></g>
      <path d="M27 50q5 4 10 0" stroke="#10141d" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g class="bt-book"><rect x="17" y="46" width="30" height="18" rx="2" fill="#0d1118" stroke="#58e0ca"/>
        <line x1="32" y1="47" x2="32" y2="63" stroke="#58e0ca" opacity=".6"/>
        <line x1="20" y1="52" x2="29" y2="52" stroke="#9b8cff"/><line x1="20" y1="57" x2="28" y2="57" stroke="#9b8cff"/>
        <line x1="35" y1="52" x2="44" y2="52" stroke="#9b8cff"/><line x1="35" y1="57" x2="43" y2="57" stroke="#9b8cff"/></g>
      <g class="bt-ar"><rect x="50" y="40" width="9" height="22" rx="4.5" fill="#8c7cf0"/></g>
    </g></svg></div>`;
  document.body.appendChild(el);

  const flip = el.querySelector(".bt-flip"), bubble = el.querySelector(".bt-bubble"), textEl = el.querySelector(".bt-text");
  const pl = el.querySelector(".bt-pl"), pr = el.querySelector(".bt-pr");

  let W = 64, H = 90;
  const probe = new Image();
  probe.onload = () => {
    W = AV.w; H = AV.h; el.classList.add("bt-real"); if (AV.round) el.classList.add("bt-round");
    el.style.width = W + "px"; el.style.height = H + "px";
    flip.style.width = W + "px"; flip.style.height = H + "px";
    flip.innerHTML = '<img src="' + AV.src + '" alt="" draggable="false">';
    bubble.style.bottom = (H + 8) + "px"; bubble.style.left = (W / 2) + "px";
  };
  probe.src = AV.src;

  const vbtn = document.createElement("button");
  vbtn.className = "bt-voice"; vbtn.textContent = "VOICE: OFF";
  let voice = false;
  vbtn.onclick = () => {
    voice = !voice; vbtn.classList.toggle("on", voice);
    vbtn.textContent = "VOICE: " + (voice ? "ON" : "OFF");
    if (!voice && window.speechSynthesis) speechSynthesis.cancel();
  };
  document.body.appendChild(vbtn);

  let x = 12, tx = 12, mx = 0, my = 0, typer = null, hoverT = null, idleT = null, cur = null, hl = null;

  function say(msg) {
    clearInterval(typer); textEl.textContent = "";
    let i = 0;
    typer = setInterval(() => { textEl.textContent = msg.slice(0, ++i); if (i >= msg.length) clearInterval(typer); }, 14);
    if (voice && window.speechSynthesis) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(msg)); }
  }
  function readTarget(t) {
    let msg = (t.dataset.read || explain(t) || t.innerText || t.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
    if (!msg) return;
    if (msg.length > 260) msg = msg.slice(0, 257).trimEnd() + "…";
    const center = x + W / 2, half = 130;
    let shift = 0;
    if (center - half < 12) shift = 12 - (center - half);
    else if (center + half > innerWidth - 12) shift = innerWidth - 12 - (center + half);
    bubble.style.transform = `translateX(calc(-50% + ${shift}px)) translateY(0)`;
    bubble.style.setProperty("--shift", shift + "px");
    el.classList.add("bt-read");
    if (hl) hl.classList.remove("bt-hl");
    hl = t; t.classList.add("bt-hl");
    say(msg);
  }
  function stopReading() {
    el.classList.remove("bt-read");
    bubble.style.transform = "translateX(-50%) translateY(6px)";
    if (hl) { hl.classList.remove("bt-hl"); hl = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    tx = Math.max(8, Math.min(innerWidth - W - 16, mx - W / 2));
    const t = e.target.closest && e.target.closest(READABLE);
    if (t !== cur) {
      cur = t; clearTimeout(hoverT);
      stopReading();
      if (t) hoverT = setTimeout(() => readTarget(t), 300);
    }
  }, { passive: true });
  document.addEventListener("mouseleave", () => { cur = null; clearTimeout(hoverT); stopReading(); });

  function tick() {
    const dx = tx - x;
    if (Math.abs(dx) > 3) {
      x += Math.sign(dx) * Math.min(Math.abs(dx) * 0.07 + 1.2, 5);
      if (!AV.round) flip.style.transform = dx < 0 ? "scaleX(-1)" : "scaleX(1)";
      el.classList.add("bt-walk");
      clearTimeout(idleT);
      idleT = setTimeout(() => el.classList.remove("bt-walk"), 120);
    } else el.classList.remove("bt-walk");
    el.style.transform = `translateX(${x}px)`;
    // eyes follow the pointer
    const cx = x + W / 2, cy = innerHeight - 8 - H * 0.6;
    const ang = Math.atan2(my - cy, mx - cx), d = 2.4;
    const ox = Math.cos(ang) * d, oy = Math.sin(ang) * d;
    pl.setAttribute("cx", 24 + ox); pl.setAttribute("cy", 35 + oy);
    pr.setAttribute("cx", 40 + ox); pr.setAttribute("cy", 35 + oy);
    requestAnimationFrame(tick);
  }
  setTimeout(tick, 1200);
})();
