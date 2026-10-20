/* Satire: Dark Patterns für HOT TO TUNE. Es wird nichts gekauft, gesendet oder getrackt. */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = list => list[rand(0, list.length - 1)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const css = `
  .dp-banner{position:sticky;top:0;z-index:8000;background:#d90429;color:#fff;font:700 14px/1.3 system-ui,sans-serif;text-align:center;padding:8px 40px;cursor:pointer}
  .dp-banner b{background:#ffd60a;color:#111;padding:1px 6px;border-radius:4px;font-variant-numeric:tabular-nums}
  .dp-banner small{display:block;font-weight:400;font-size:11px;opacity:.85}
  .dp-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.78);display:flex;align-items:center;justify-content:center;padding:16px}
  .dp-popup{position:relative;background:#fffbe6;color:#1b1b1b;max-width:480px;width:100%;border:4px solid #d90429;border-radius:14px;padding:26px 24px 18px;font:15px/1.45 system-ui,sans-serif;box-shadow:0 0 0 6px #ffd60a,0 20px 60px rgba(0,0,0,.6);max-height:94vh;overflow:auto}
  .dp-popup h2{margin:0 0 6px;font-size:24px;line-height:1.15;color:#d90429}
  .dp-popup .dp-timer{font:800 30px/1 ui-monospace,Consolas,monospace;color:#d90429;margin:8px 0}
  .dp-popup .dp-price{font-size:32px;font-weight:900}
  .dp-popup .dp-price s{color:#777;font-size:18px;font-weight:400}
  .dp-popup label{display:flex;gap:8px;align-items:flex-start;font-size:13px;margin:6px 0}
  .dp-close{position:absolute;top:3px;right:5px;width:14px;height:14px;font-size:9px;line-height:12px;padding:0;border:0;background:transparent;color:#bbb;cursor:pointer;transition:all .25s}
  .dp-cta{display:block;width:100%;margin:12px 0 8px;padding:16px;border:0;border-radius:10px;background:#2dc653;color:#fff;font:900 19px system-ui,sans-serif;cursor:pointer;animation:dp-pulse 1s infinite}
  .dp-no{display:block;margin:6px auto 0;border:0;background:none;color:#aaa;font:10px system-ui,sans-serif;cursor:pointer;text-decoration:underline}
  .dp-tiny{font-size:8px;color:#c9c5b0;line-height:1.2;margin-top:10px}
  .dp-row{display:flex;gap:10px;align-items:center}
  .dp-row.dp-swap{flex-direction:row-reverse}
  .dp-small-btn{border:0;background:none;color:#999;font-size:10px;cursor:pointer;text-decoration:underline}
  .dp-big-btn{flex:1;padding:14px;border:0;border-radius:8px;background:#2dc653;color:#fff;font:800 16px system-ui,sans-serif;cursor:pointer}
  @keyframes dp-pulse{50%{transform:scale(1.03)}}
  .dp-toast{position:fixed;right:14px;top:60px;z-index:7000;background:#fff;color:#111;border-left:5px solid #2dc653;padding:10px 14px;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.35);font:13px/1.35 system-ui,sans-serif;max-width:280px;animation:dp-in .4s}
  @keyframes dp-in{from{transform:translateX(120%)}}
  .dp-cookie{position:fixed;left:14px;bottom:14px;z-index:9000;width:min(440px,calc(100vw - 28px));background:#fff;color:#222;border-radius:12px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,.5);font:13px/1.4 system-ui,sans-serif;max-height:70vh;overflow:auto}
  .dp-cookie h3{margin:0 0 6px;font-size:16px}
  .dp-cookie .dp-accept{width:100%;padding:12px;border:0;border-radius:8px;background:#0a58ca;color:#fff;font:700 15px system-ui,sans-serif;cursor:pointer;margin-top:8px}
  .dp-cookie .dp-switch{display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #eee;font-size:12px;cursor:pointer}
  .dp-chat{position:fixed;right:16px;bottom:16px;z-index:8500;font:14px system-ui,sans-serif}
  .dp-chat-btn{width:60px;height:60px;border-radius:50%;border:0;background:#0a58ca;color:#fff;font-size:28px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.4)}
  .dp-chat-btn::after{content:"1";position:absolute;top:-2px;right:-2px;background:#d90429;border-radius:50%;width:20px;height:20px;font:700 12px/20px system-ui}
  .dp-chat-panel{position:absolute;right:0;bottom:72px;width:290px;background:#fff;color:#111;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.5);overflow:hidden}
  .dp-chat-panel header{background:#0a58ca;color:#fff;padding:10px 12px;font-weight:700}
  .dp-chat-log{padding:10px;height:170px;overflow:auto;display:flex;flex-direction:column;gap:6px}
  .dp-chat-log p{margin:0;padding:7px 10px;border-radius:10px;background:#eef2ff;max-width:85%}
  .dp-chat-log p.me{align-self:flex-end;background:#d1f7d9}
  .dp-chat-panel form{display:flex;border-top:1px solid #ddd}
  .dp-chat-panel input{flex:1;border:0;padding:10px;font:inherit}
  .dp-chat-panel form button{border:0;background:#2dc653;color:#fff;padding:0 12px;cursor:pointer}
  .dp-img{display:block;width:100%;max-height:260px;object-fit:cover;border-radius:10px;margin:8px 0}
  .dp-blur{filter:blur(5px);user-select:none;pointer-events:none}
  .dp-gate{position:relative;z-index:2;margin:24px 0 -10px;padding:22px;border:3px dashed #d90429;border-radius:12px;background:#fff6f6;color:#222;text-align:center}
  .dp-gate button{margin-top:8px;padding:12px 20px;border:0;border-radius:8px;background:#2dc653;color:#fff;font:800 16px system-ui,sans-serif;cursor:pointer}
  .dp-loader{position:fixed;inset:0;z-index:9500;background:rgba(255,255,255,.93);color:#111;display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:center;font:600 18px system-ui,sans-serif;text-align:center;padding:20px}
  .dp-loader i{display:block;width:min(340px,80vw);height:12px;background:#ddd;border-radius:6px;overflow:hidden}
  .dp-loader i::after{content:"";display:block;height:100%;width:0;background:#0a58ca;animation:dp-load 2.6s forwards}
  @keyframes dp-load{to{width:99%}}
  .dp-fineprint{font-size:7px;color:#ccc;max-width:900px;margin:20px auto;padding:0 16px;line-height:1.2}
  body.dp-lock{overflow:hidden}
  .dp-toast.dp-bad{border-left-color:#d90429;background:#fff1f1}
  .xp-win{width:min(520px,100%);background:#ece9d8;border:3px solid #0a3fc4;border-radius:9px 9px 3px 3px;font:13px Tahoma,Verdana,sans-serif;color:#000;box-shadow:0 12px 50px rgba(0,0,0,.7)}
  .xp-title{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(#3a82f0,#0a54d6 40%,#0a3fc4);color:#fff;font-weight:700;padding:6px 8px;border-radius:6px 6px 0 0;text-shadow:1px 1px #000}
  .xp-x{background:#d9442b;border:1px solid #fff;border-radius:3px;width:20px;text-align:center;font-size:11px;line-height:18px}
  .xp-body{display:flex;gap:14px;padding:16px;min-height:170px;background:#fff;margin:0}
  .xp-side{font-size:64px;background:linear-gradient(#0a3fc4,#3a82f0);padding:10px;border-radius:4px;display:flex;align-items:center}
  .xp-main h3{margin:0 0 8px;font-size:16px}.xp-main p{margin:6px 0}
  .xp-box{height:90px;overflow:auto;border:1px solid #7f9db9;padding:6px;margin:8px 0;background:#fff;font-size:12px}
  .xp-bar{height:20px;border:2px inset #aaa;background:#fff;padding:1px}
  #xp-fill{height:100%;width:0;background:repeating-linear-gradient(90deg,#2fd02f 0 10px,#fff 10px 12px)}
  .xp-btns{display:flex;justify-content:flex-end;gap:8px;padding:10px;border-top:1px solid #aca899}
  .xp-btns button{min-width:84px;padding:4px 10px;font:13px Tahoma,Verdana,sans-serif;background:linear-gradient(#fff,#ece9d8);border:1px solid #003c74;border-radius:3px;cursor:pointer}
  .xp-btns button:disabled{color:#999;border-color:#999;cursor:default}
  .dp-wheelbtn{position:fixed;left:14px;top:46%;z-index:7500;border:0;border-radius:30px;padding:12px 16px;background:linear-gradient(#ffd60a,#ff9f1c);color:#111;font:800 14px system-ui,sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.4);animation:dp-pulse 1.2s infinite}
  .dp-wheel-wrap{position:relative;width:min(300px,70vw);margin:8px auto}
  .dp-wheel-wrap canvas{width:100%;height:auto;display:block;border-radius:50%;box-shadow:0 0 0 6px #333}
  .dp-pointer{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:30px;color:#d90429;z-index:2;text-shadow:0 2px 2px #000}
  .dp-wheel-info{text-align:center;min-height:44px;font-weight:700}
  .dp-ad{display:flex;gap:14px;align-items:center;margin:24px 0;padding:12px;border:1px solid #ccc;border-radius:10px;background:#fafafa;color:#222;text-decoration:none;font:14px/1.4 system-ui,sans-serif}
  .dp-ad img{width:92px;height:92px;object-fit:cover;border-radius:8px;flex:none;background:#eee}
  .dp-ad small{display:block;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
  .dp-ad strong{display:block;font-size:15px;margin:2px 0}
  @media (prefers-reduced-motion:reduce){.dp-cta,.dp-toast,.dp-wheelbtn{animation:none}.dp-close{transition:none}}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  // Gemeinsamer Fake-Countdown, der nie abläuft
  let remaining = 599;
  const timeText = () => `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  setInterval(() => {
    remaining = remaining <= 0 ? 599 : remaining - 1;
    document.querySelectorAll("[data-dp-timer]").forEach(el => { el.textContent = timeText(); });
  }, 1000);

  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };
  const modelLabel = () => ($("#hero-model")?.textContent || "dein Scooter");

  // Sticky-Banner
  const banner = el("div", "dp-banner", `🔥 Frühjahrs-Sale: <b>-40 %</b> auf Premium+ – endet in <b data-dp-timer>${timeText()}</b><small>Danach wieder voller Preis. Wirklich. (Danach beginnt der Timer von vorn.)</small>`);
  banner.addEventListener("click", () => openPopup("banner"));
  document.body.prepend(banner);

  // Popup-System
  let popupOpen = false;
  let shown = 0;
  let declines = 0;
  let lastClosed = Date.now();
  let escapeTries = 0;

  function lockScroll(on) { document.body.classList.toggle("dp-lock", on); }

  function closePopup(overlay) {
    overlay.remove();
    popupOpen = false;
    lastClosed = Date.now();
    lockScroll(false);
  }

  function loader(text, ms, done) {
    const box = el("div", "dp-loader", `<span>${text}</span><i></i><small>Bitte dieses Fenster nicht schließen.</small>`);
    document.body.append(box);
    setTimeout(() => { box.remove(); done && done(); }, ms);
  }

  const asset = name => `${typeof basePath === "string" ? basePath : "/"}${name}`;
  const MAX_POPUPS = 3;

  function openPopup(reason) {
    if (popupOpen || shown >= MAX_POPUPS || $("#portal-modal")?.open) return;
    popupOpen = true;
    shown += 1;
    const stageNo = shown;
    lockScroll(true);
    declines = 0;
    escapeTries = 0;
    const overlay = el("div", "dp-overlay");
    const popup = el("div", "dp-popup");
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    overlay.append(popup);
    document.body.append(overlay);
    overlay.tabIndex = -1;

    const heads = {
      exit: "⚠️ Moment! Dein Fortschritt geht verloren!",
      back: "⚠️ Zurück? Jetzt, so kurz vor der Vorbereitung?",
      banner: "🎁 Dein Sale-Angebot wartet",
      timer: "🚀 Nur für dich: Premium+ freischalten"
    };
    let extras = { ins: true, express: true, news: true };

    function total() {
      return (29 * 0.6 + (extras.ins ? 9.99 : 0) + (extras.express ? 4.99 : 0) + (extras.news ? 1.49 : 0)).toFixed(2).replace(".", ",");
    }

    function renderOffer() {
      popup.innerHTML = `
        <button class="dp-close" type="button" aria-label="Schließen">✕</button>
        <h2>${heads[reason] || heads.timer}</h2>
        <p>${escape(modelLabel())} ist laut unserer Prüfung zu <strong>94 %</strong> vorbereitet. Mit <strong>Premium+</strong> fehlen nur noch ein paar Prüfpunkte.</p>
        <div class="dp-timer" data-dp-timer>${timeText()}</div>
        <div class="dp-price"><s>29,00 €</s> 17,40 € <small style="font-size:13px;font-weight:400">/ Woche*</small></div>
        <label><input type="checkbox" data-x="ins" checked> Vorbereitungsversicherung hinzufügen (+9,99 €)</label>
        <label><input type="checkbox" data-x="express" checked> Express-Konformitätsprüfung (+4,99 €)</label>
        <label><input type="checkbox" data-x="news" checked> Newsletter „Tuning-Tipps" alle 20 Minuten (+1,49 €)</label>
        <p style="margin:6px 0 0">Gesamt: <strong id="dp-total">${total()} €</strong> <small>zzgl. Bearbeitungsgebühr</small></p>
        <button class="dp-cta" type="button">JA, JETZT PREMIUM+ SICHERN!</button>
        <small style="display:block;text-align:center">🔥 Nur noch <b>${rand(2, 4)}</b> Plätze · <b>${rand(380, 540)}</b> Personen sehen sich das gerade an</small>
        <button class="dp-no" type="button">Nein, ich möchte weiter ungenau vorbereitet bleiben</button>
        <div class="dp-tiny">*Abo verlängert sich automatisch alle 3 Tage zum 4-fachen Preis. Kündigung nur schriftlich per Brieftaube, 14 Werktage vorher. Alle Angaben ohne Gewähr, ohne Sinn und ohne Zahlung – dies ist Satire.</div>`;
      popup.querySelectorAll("input[data-x]").forEach(box => box.addEventListener("change", () => {
        extras[box.dataset.x] = box.checked;
        $("#dp-total", popup).textContent = `${total()} €`;
      }));
      const close = $(".dp-close", popup);
      let flees = 0;
      const flee = event => {
        if (flees >= 7) return;
        flees += 1;
        event && event.preventDefault();
        const w = popup.clientWidth;
        close.style.transform = `translate(${rand(-w + 30, 0)}px, ${rand(0, 260)}px)`;
      };
      if (!reduceMotion) {
        close.addEventListener("mouseenter", flee);
        close.addEventListener("touchstart", flee, { passive: false });
      }
      close.addEventListener("click", () => { if (flees < 3 && !reduceMotion) { flee(); } else renderSure(); });
      $(".dp-no", popup).addEventListener("click", renderSure);
      $(".dp-cta", popup).addEventListener("click", () => {
        loader("Zahlung wird vorbereitet…", 2600, () => {
          popup.innerHTML = `<h2>Vorbereitung unvollständig</h2><p>Für die Aktivierung von Premium+ muss zunächst die Vorbereitungsphase vollständig abgeschlossen sein. Bitte lies zunächst Kapitel 1 erneut, um sicherzustellen, dass alle Voraussetzungen weiterhin erfüllt sind.</p><p>Dein bisheriger Fortschritt wurde gespeichert. Du wurdest nicht belastet. Noch nicht.</p><button class="dp-big-btn" type="button" style="width:100%">Zu Kapitel 1 →</button>`;
          $(".dp-big-btn", popup).addEventListener("click", () => {
            closePopup(overlay);
            document.getElementById("kapitel-1")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
          });
        });
      });
    }

    function renderSure() {
      declines += 1;
      if (stageNo === 2) {
        popup.innerHTML = `<h2>Der Entwickler und seine Familie müssen hungern</h2>
          <img class="dp-img" src="${asset("entwickler.png")}" alt="Der Entwickler">
          <p>Das ist der Entwickler dieser Seite. Er lächelt noch. Wenn du Premium+ nicht abschließt, bleibt sein Kühlschrank leer und seine Familie muss hungern. Willst du das wirklich verantworten?</p>
          <div class="dp-row dp-swap"><button class="dp-big-btn" type="button" data-a="keep">Familie retten (Premium+)</button><button class="dp-small-btn" type="button" data-a="leave">Sie sollen hungern</button></div>`;
      } else if (stageNo === 3) {
        popup.innerHTML = `<h2>Letzte Warnung!</h2>
          <img class="dp-img" src="${asset("welpe.png")}" alt="Ein süßer Hundewelpe">
          <p>Wenn du Premium+ nicht kaufst, erschießen wir diesen süßen Hundewelpen. Das ist die letzte Warnung, danach lassen wir dich in Ruhe. Versprochen.</p>
          <div class="dp-row dp-swap"><button class="dp-big-btn" type="button" data-a="keep">Welpen retten (Premium+)</button><button class="dp-small-btn" type="button" data-a="leave">Mir egal</button></div>`;
      } else if (declines === 1) {
        popup.innerHTML = `<h2>Bist du sicher?</h2><p>Dein Fortschritt von <strong>94 %</strong> und <strong>${rand(3, 9)} gespeicherte Prüfpunkte</strong> gehen dauerhaft verloren. Andere Nutzer von ${escape(modelLabel())} haben sich anders entschieden.</p>
          <div class="dp-row dp-swap"><button class="dp-big-btn" type="button" data-a="keep">Doch behalten!</button><button class="dp-small-btn" type="button" data-a="leave">Trotzdem verlassen</button></div>`;
      } else if (declines === 2) {
        popup.innerHTML = `<h2>Kurze Umfrage (Pflicht)</h2><p>Warum möchtest du nicht schneller tunen?</p>
          <label><input type="radio" name="why" value="1"> Zu teuer (verstehen wir nicht)</label>
          <label><input type="radio" name="why" value="2"> Ich hasse Fortschritt</label>
          <label><input type="radio" name="why" value="3"> Ich möchte lieber langsam bleiben</label>
          <div class="dp-row"><button class="dp-big-btn" type="button" data-a="keep">Doch Premium+</button><button class="dp-small-btn" type="button" data-a="survey">Weiter</button></div>`;
      } else {
        popup.innerHTML = `<h2>Abo-Pausierung</h2><p>Wir haben dir stattdessen <strong>drei Tage gratis</strong> gutgeschrieben. Die Gutschrift wird nach Ablauf automatisch in ein Abo umgewandelt.</p>
          <div class="dp-row dp-swap"><button class="dp-big-btn" type="button" data-a="keep">Gutschrift aktivieren</button><button class="dp-small-btn" type="button" data-a="leave">Ohne Gutschrift fortfahren</button></div>`;
      }
      popup.querySelectorAll("[data-a]").forEach(button => button.addEventListener("click", () => {
        const action = button.dataset.a;
        if (action === "keep") { renderOffer(); return; }
        if (action === "survey" && !popup.querySelector("input:checked")) { button.textContent = "Bitte eine Antwort wählen"; return; }
        if (declines >= 3 || action === "survey" || stageNo >= 2) {
          loader("Deine Abmeldung wird geprüft…", 2600, () => closePopup(overlay));
        } else if (declines < 3) {
          renderSure();
        }
      }));
    }

    overlay.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      escapeTries += 1;
      if (escapeTries >= 3) closePopup(overlay);
    });
    renderOffer();
    overlay.focus();
  }

  // Wiederkehrender Scheduler
  setTimeout(() => openPopup("timer"), 8000);
  setInterval(() => {
    if (!popupOpen && Date.now() - lastClosed > 25000) openPopup("timer");
  }, 5000);
  const milestones = [0.25, 0.5, 0.75];
  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const ratio = window.scrollY / scrollable;
    while (milestones.length && ratio >= milestones[0]) { milestones.shift(); openPopup("timer"); }
  }, { passive: true });

  function escape(text) {
    return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // Cookie-Banner
  setTimeout(() => {
    const box = el("div", "dp-cookie");
    const main = () => {
      box.innerHTML = `<h3>🍪 Wir lieben Cookies</h3><p>Wir verwenden 14 Kategorien technisch zwingend erforderlicher Cookies, um deine Vorbereitung vorzubereiten. Mit Klick stimmst du außerdem dem Verkauf deiner Daten an unsere 612 Partner zu.</p>
        <button class="dp-accept" type="button">Alle akzeptieren und glücklich sein</button>
        <div style="margin-top:8px;font-size:9px"><a href="#" data-c="settings" style="color:#999">Einstellungen</a> · <a href="#" data-c="reject" style="color:#bbb">Ablehnen</a></div>`;
      $(".dp-accept", box).addEventListener("click", () => box.remove());
      box.querySelectorAll("[data-c]").forEach(link => link.addEventListener("click", event => { event.preventDefault(); settings(); }));
    };
    const settings = () => {
      const names = ["Zwingend erforderlich", "Absolut zwingend erforderlich", "Technisch notwendig", "Notwendig für Notwendigkeit", "Vorbereitung", "Nachbereitung", "Zwischenbereitung", "Partner A–F", "Partner G–M", "Partner N–Z", "Sinnloses Tracking", "Fortschrittsillusion", "Sonstiges", "Wirklich alles"];
      box.innerHTML = `<h3>Cookie-Einstellungen</h3><p style="margin:0 0 6px">Bitte treffe eine Auswahl (alle Schalter sind zwingend erforderlich):</p>${names.map(n => `<div class="dp-switch"><span>${n}</span><input type="checkbox" checked></div>`).join("")}<button class="dp-accept" type="button">Auswahl speichern</button>`;
      box.querySelectorAll(".dp-switch input").forEach(input => input.addEventListener("change", () => {
        setTimeout(() => { input.checked = true; }, 350);
      }));
      $(".dp-accept", box).addEventListener("click", () => box.remove());
    };
    main();
    document.body.append(box);
  }, 1200);

  // Social-Proof-Toasts
  const people = ["Jürgen aus Bottrop", "Sabine aus Gera", "Kevin aus Hamm", "Uwe aus Cuxhaven", "Chantal aus Wanne-Eickel", "Dieter aus Offenbach"];
  const acts = ["hat gerade Premium+ gebucht", "hat die Vorbereitung verlängert", "hat 3 Zusatzprüfungen freigeschaltet", "hat Kapitel 1 erneut gelesen", "wurde zum 4. Mal nach Aktualisierung gefragt"];
  const guilt = ["hat Premium+ NICHT gekauft. Der Entwickler hungert jetzt seinetwegen. Möchtest du auch so sein?", "hat das Abo abgelehnt. Die Familie des Entwicklers isst heute nichts. Willst du das auch?", "hat auf „Nein“ geklickt und ist damit schuld, dass der Entwickler hungern muss. Möchtest du wirklich so sein?", "hat Premium+ ignoriert. Der Entwickler weint. Du auch bald?"];
  setInterval(() => {
    document.querySelectorAll(".dp-toast").forEach(t => t.remove());
    const bad = Math.random() < 0.45;
    const toast = el("div", "dp-toast" + (bad ? " dp-bad" : ""), `<strong>${escape(pick(people))}</strong><br>${bad ? pick(guilt) : pick(acts)} <small style="color:#777">· vor ${rand(1, 9)} Min.</small>`);
    document.body.append(toast);
    setTimeout(() => toast.remove(), bad ? 7000 : 5000);
  }, 11000);

  // Fake-Live-Chat
  const chat = el("div", "dp-chat");
  chat.innerHTML = `<div class="dp-chat-panel" hidden><header>Tuna · Live-Support</header><div class="dp-chat-log"><p>Hi! Ich bin Tuna 👋 Wusstest du, dass du mit Premium+ 40 % schneller vorbereitet bist?</p></div><form><input placeholder="Nachricht schreiben…" aria-label="Nachricht"><button>➤</button></form></div><button class="dp-chat-btn" type="button" aria-label="Chat öffnen">💬</button>`;
  document.body.append(chat);
  const panel = $(".dp-chat-panel", chat);
  const log = $(".dp-chat-log", chat);
  $(".dp-chat-btn", chat).addEventListener("click", () => { panel.hidden = !panel.hidden; });
  setTimeout(() => { panel.hidden = false; }, 14000);
  const replies = ["Tolle Frage! Die beantworte ich gern, sobald du Premium+ hast.", "Dazu muss zunächst die Vorbereitung abgeschlossen sein.", "Ich leite dich an einen Kollegen weiter (Wartezeit: 4 Stunden).", "Haben wir das nicht in Kapitel 1 erklärt? 😊", "Unser Premium+ Paket beantwortet das und mehr!"];
  $("form", chat).addEventListener("submit", event => {
    event.preventDefault();
    const input = $("input", chat);
    if (!input.value.trim()) return;
    log.append(el("p", "me", escape(input.value)));
    input.value = "";
    const typing = el("p", "", "Tuna tippt…");
    log.append(typing);
    log.scrollTop = log.scrollHeight;
    setTimeout(() => { typing.textContent = pick(replies); log.scrollTop = log.scrollHeight; }, 1800);
  });

  // Paywall-Blur ab Kapitel 6 und künstliche Wartezeit bei Weiter-Buttons
  const articleBody = $("#article-body");
  let applying = false;
  let unlocked = false;

  function unlock() {
    unlocked = true;
    articleBody?.querySelector(".dp-gate")?.remove();
    articleBody?.querySelectorAll(".dp-blur").forEach(node => node.classList.remove("dp-blur"));
  }

  // Wahl am gesperrten Abschnitt: Abo kaufen oder (Spielzeug-)Welpen erschießen
  function openChoice() {
    if (popupOpen) return;
    popupOpen = true;
    lockScroll(true);
    const overlay = el("div", "dp-overlay");
    const popup = el("div", "dp-popup");
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    overlay.append(popup);
    document.body.append(overlay);
    const finish = () => { unlock(); closePopup(overlay); };
    popup.innerHTML = `<h2>Gesperrter Abschnitt</h2><p>Um weiterzulesen, musst du dich entscheiden:</p>
      <button class="dp-cta" type="button" data-c="buy">Premium+ kaufen (17,40 € / Woche*)</button>
      <button class="dp-big-btn" type="button" data-c="malware" style="width:100%;background:#6c757d">Malware installieren</button>
      <button class="dp-no" type="button" data-c="cancel">Doch lieber nicht weiterlesen</button>
      <div class="dp-tiny">*Satire. Es wird nichts abgebucht, und die „Malware" ist eine harmlose Simulation.</div>`;
    popup.querySelector("[data-c=cancel]").addEventListener("click", () => closePopup(overlay));
    popup.querySelector("[data-c=buy]").addEventListener("click", () => {
      loader("Zahlung wird vorbereitet…", 2600, () => {
        popup.innerHTML = `<h2>Premium+ aktiviert (Demo)</h2><p>Du wurdest nicht belastet. Noch nicht. Die gesperrten Kapitel sind jetzt lesbar.</p><button class="dp-big-btn" type="button" style="width:100%">Weiterlesen →</button>`;
        popup.querySelector("button").addEventListener("click", finish);
      });
    });
    popup.querySelector("[data-c=malware]").addEventListener("click", () => {
      overlay.remove();
      popupOpen = true;
      openInstaller(() => { finish(); setTimeout(openMalwareAlert, 600); });
    });
  }

  // Windows-XP-Installer (reine Simulation, es passiert nichts)
  function openInstaller(onDone) {
    popupOpen = true;
    lockScroll(true);
    const overlay = el("div", "dp-overlay");
    const win = el("div", "xp-win");
    overlay.append(win);
    document.body.append(overlay);
    const close = () => { overlay.remove(); popupOpen = false; lastClosed = Date.now(); lockScroll(false); };
    const frame = (title, body, buttons) => {
      win.innerHTML = `<div class="xp-title"><span>💿 ${title}</span><b class="xp-x">✕</b></div><div class="xp-body">${body}</div><div class="xp-btns">${buttons}</div>`;
    };
    const step1 = () => {
      frame("Setup – GratisLeseTool 2003", `<div class="xp-side">🛡️</div><div class="xp-main"><h3>Willkommen beim Setup-Assistenten</h3><p>Dieser Assistent installiert <b>GratisLeseTool Deluxe</b> auf Ihrem Computer, damit Sie weiterlesen dürfen.</p><p>Es wird empfohlen, vor dem Fortfahren alle Antivirenprogramme zu deaktivieren.</p><p>Klicken Sie auf „Weiter", um fortzufahren.</p></div>`,
        `<button data-x="next">Weiter &gt;</button><button data-x="cancel">Abbrechen</button>`);
      win.querySelector("[data-x=next]").onclick = step2;
      win.querySelector("[data-x=cancel]").onclick = close;
    };
    const step2 = () => {
      frame("Setup – Lizenzvereinbarung", `<div class="xp-main" style="width:100%"><p>Bitte lesen Sie die folgenden Lizenzbedingungen sorgfältig durch.</p><div class="xp-box">Mit der Installation erlauben Sie uns, Ihre Dateien zu verschlüsseln, Ihre Passwörter zu kopieren, Ihre Webcam zu benutzen und Ihre Daten an 612 Partner zu verkaufen. Sie verzichten auf alle Rechte, auf Ihren Kontostand und auf Ihre Würde. Dies ist Satire.</div><label><input type="checkbox" id="xp-ok"> Ich akzeptiere die Vereinbarung (kein Lesen erforderlich)</label></div>`,
        `<button data-x="next" disabled>Installieren</button><button data-x="cancel">Abbrechen</button>`);
      const ok = win.querySelector("#xp-ok");
      const next = win.querySelector("[data-x=next]");
      ok.onchange = () => { next.disabled = !ok.checked; };
      next.onclick = step3;
      win.querySelector("[data-x=cancel]").onclick = close;
    };
    const step3 = () => {
      frame("Setup – Installation läuft", `<div class="xp-main" style="width:100%"><p>Bitte warten Sie, während GratisLeseTool installiert wird.</p><p id="xp-status">Initialisierung…</p><div class="xp-bar"><div id="xp-fill"></div></div><p id="xp-pct" style="text-align:right">0 %</p></div>`,
        `<button disabled>Weiter</button><button disabled>Abbrechen</button>`);
      const statuses = ["Dateien werden verschlüsselt…", "Passwörter werden kopiert…", "Browserverlauf wird an 612 Partner gesendet…", "Webcam wird aktiviert…", "Bankdaten werden gesucht…", "Kryptominer wird gestartet…", "Desktop-Hintergrund wird durch Katzenfoto ersetzt…", "Antivirenprogramm wird überredet…", "Zusätzliche Toolbars werden installiert…", "Verbleibende Würde wird entfernt…"];
      const fill = win.querySelector("#xp-fill");
      const status = win.querySelector("#xp-status");
      const pct = win.querySelector("#xp-pct");
      let value = 0;
      const timer = setInterval(() => {
        value = Math.min(100, value + rand(1, 3));
        fill.style.width = `${value}%`;
        pct.textContent = `${value} %`;
        status.textContent = statuses[Math.min(statuses.length - 1, Math.floor(value / 10))];
        if (value >= 100) { clearInterval(timer); step4(); }
      }, 140);
    };
    const step4 = () => {
      frame("Setup – Fertig", `<div class="xp-side">✅</div><div class="xp-main"><h3>Setup abgeschlossen</h3><p>Keine Sorge: Das war nur eine Simulation. Es wurde nichts installiert, kopiert, verschlüsselt oder gesendet.</p><p>Die gesperrten Kapitel sind jetzt lesbar.</p></div>`,
        `<button data-x="done">Fertig stellen</button>`);
      win.querySelector("[data-x=done]").onclick = () => { overlay.remove(); popupOpen = false; onDone(); };
    };
    step1();
  }

  function applyPaywall() {
    if (unlocked || applying || !articleBody) return;
    const headings = [...articleBody.querySelectorAll("h2")];
    if (headings.length < 6 || articleBody.querySelector(".dp-gate")) return;
    applying = true;
    const gate = el("div", "dp-gate", `<strong>🔒 Ab hier nur mit Premium+ lesbar</strong><br>Die folgenden Kapitel sind für Basis-Nutzer unscharf, weil Schärfe ein Premium-Feature ist.<br><button type="button">Premium+ freischalten</button>`);
    $("button", gate).addEventListener("click", openChoice);
    headings[5].before(gate);
    for (let node = headings[5]; node; node = node.nextElementSibling) {
      if (node.classList.contains("section-action") || node.classList.contains("dp-gate")) continue;
      node.classList.add("dp-blur");
    }
    applying = false;
  }
  if (articleBody) new MutationObserver(() => applyPaywall()).observe(articleBody, { childList: true });
  applyPaywall();

  let bypass = false;
  document.addEventListener("click", event => {
    const button = event.target.closest(".section-next, #really-tune, .plan-button");
    if (!button || bypass) return;
    event.stopImmediatePropagation();
    event.preventDefault();
    loader(pick(["Kompatibilität wird geprüft…", "Versionsstand wird abgeglichen…", "Prüfpunkte werden synchronisiert…"]), 2800, () => {
      bypass = true;
      button.click();
      bypass = false;
    });
  }, true);

  // Exit-Intent, Tab-Titel, Zurück-Hijack, beforeunload
  let lastExit = 0;
  document.documentElement.addEventListener("mouseleave", event => {
    if (event.clientY > 0 || Date.now() - lastExit < 60000) return;
    lastExit = Date.now();
    openPopup("exit");
  });
  const originalTitle = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "😢 Dein Scooter vermisst dich!" : (document.title === "😢 Dein Scooter vermisst dich!" ? originalTitleFromHero() : document.title);
  });
  function originalTitleFromHero() { return `HOT TO TUNE — ${modelLabel()}`; }

  let armed = false;
  let backTries = 0;
  window.addEventListener("pointerdown", () => {
    if (armed) return;
    armed = true;
    history.pushState({ dp: 1 }, "", location.href);
    window.addEventListener("beforeunload", event => { event.preventDefault(); event.returnValue = ""; });
  }, { once: true });
  window.addEventListener("popstate", () => {
    if (!armed || backTries >= 3) return;
    backTries += 1;
    history.pushState({ dp: 1 }, "", location.href);
    openPopup("back");
  });

  // Kleingedrucktes
  const fine = el("p", "dp-fineprint", "Alle Preise verstehen sich als Beispiel. Mit der Nutzung dieser Seite stimmst du allen Bedingungen zu, die wir noch erfinden. Premium+ kann Spuren von Fortschritt enthalten. Diese Seite ist Satire und verkauft nichts.");
  document.querySelector("footer")?.after(fine);

  // Glücksrad (Ablauf ist fest vorgegeben, es kann nichts gewonnen werden)
  const SEGMENTS = ["Lizenzcode", "2 Gratis-Spins", "Fast!", "100 km/h Datei", "Niete", "-1 % Rabatt", "Leider nein", "Niete"];
  const COLORS = ["#ffd60a", "#2dc653", "#e5e5e5", "#4cc9f0", "#e5e5e5", "#b5179e", "#e5e5e5", "#e5e5e5"];
  const ease = {
    outCubic: t => 1 - Math.pow(1 - t, 3),
    outQuart: t => 1 - Math.pow(1 - t, 4),
    inOut: t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
  };
  let wheelAngle = 135;
  let spinsLeft = 1;
  let spinNo = 0;
  let spinning = false;

  function drawWheel(canvas) {
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const c = size / 2;
    const step = (Math.PI * 2) / SEGMENTS.length;
    SEGMENTS.forEach((label, i) => {
      const start = (i - 0.5) * step - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.arc(c, c, c - 4, start, start + step);
      ctx.fillStyle = COLORS[i];
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(i * step);
      ctx.fillStyle = "#111";
      ctx.font = "bold 20px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, 0, -c * 0.62, c * 0.6);
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(c, c, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  function runFrames(canvas, frames, finished) {
    let index = 0;
    const next = () => {
      const frame = frames[index++];
      if (!frame) { finished(); return; }
      if (frame.note) frame.note();
      if (frame.hold !== undefined) { setTimeout(next, frame.hold); return; }
      const from = wheelAngle;
      const started = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - started) / frame.dur);
        wheelAngle = from + (frame.to - from) * frame.ease(t);
        canvas.style.transform = `rotate(${wheelAngle}deg)`;
        if (t < 1) requestAnimationFrame(tick); else next();
      };
      requestAnimationFrame(tick);
    };
    next();
  }

  function alignTo(base, targetMod) {
    return base + ((targetMod - (base % 360)) + 360) % 360;
  }

  function openWheel() {
    if (popupOpen) return;
    popupOpen = true;
    lockScroll(true);
    const overlay = el("div", "dp-overlay");
    const popup = el("div", "dp-popup");
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    overlay.append(popup);
    document.body.append(overlay);
    const leave = () => closePopup(overlay);

    function view(info) {
      popup.innerHTML = `<button class="dp-close" type="button" aria-label="Schließen" style="font-size:12px;width:22px;height:22px">✕</button>
        <h2>🎡 Glücksrad</h2>
        <p style="margin:0">Gewinne einen <strong>Lizenzcode</strong>! Verbleibende Spins: <strong id="dp-spins">${spinsLeft}</strong>${spinNo === 0 ? " (der erste ist gratis)" : ""}</p>
        <div class="dp-wheel-wrap"><span class="dp-pointer">▼</span><canvas width="520" height="520"></canvas></div>
        <div class="dp-wheel-info" id="dp-info">${info || ""}</div>
        <button class="dp-cta" type="button" id="dp-spin" style="animation:none">${spinsLeft > 0 ? "JETZT DREHEN" : "Spin kaufen (5 €)"}</button>
        <div class="dp-tiny">Spielzeug-Demo. Es wird nichts verlost, abgebucht oder gespeichert. Weitere Spins: 5 € pro Spin.</div>`;
      const canvas = popup.querySelector("canvas");
      drawWheel(canvas);
      canvas.style.transform = `rotate(${wheelAngle}deg)`;
      popup.querySelector(".dp-close").addEventListener("click", leave);
      popup.querySelector("#dp-spin").addEventListener("click", () => spin(canvas));
    }

    function setInfo(html) { const box = popup.querySelector("#dp-info"); if (box) box.innerHTML = html; }

    function spin(canvas) {
      if (spinning) return;
      if (spinsLeft <= 0) { buy(); return; }
      spinning = true;
      spinsLeft -= 1;
      spinNo += 1;
      popup.querySelector("#dp-spins").textContent = spinsLeft;
      popup.querySelector("#dp-spin").disabled = true;
      setInfo("Das Rad dreht sich…");
      const frames = [];
      if (spinNo === 1) {
        const t = alignTo(wheelAngle + 1800, 0);
        frames.push({ to: t - 2, dur: 4200, ease: ease.outCubic },
          { hold: 700, note: () => setInfo("🎉 LIZENZCODE!") },
          { to: t - 45, dur: 500, ease: ease.inOut, note: () => setInfo("🎉 LIZENZ…") });
      } else if (spinNo === 2) {
        frames.push({ to: alignTo(wheelAngle + 1440, 225), dur: 4500, ease: ease.outQuart });
      } else {
        const t = alignTo(wheelAngle + 1080, 0);
        frames.push({ to: t - 25, dur: 3000, ease: ease.outCubic },
          { to: t + 20, dur: 5500, ease: ease.inOut },
          { hold: 500 },
          { to: t + 45, dur: 900, ease: ease.inOut });
      }
      runFrames(canvas, frames, () => {
        spinning = false;
        const landed = SEGMENTS[((Math.round(-wheelAngle / 45) % 8) + 8) % 8];
        if (spinNo === 1) {
          spinsLeft += 2;
          view(`<span style="color:#2dc653">Das Rad ist zurückgerollt: Du gewinnst <b>2 Gratis-Spins</b>!</span>`);
        } else if (spinNo === 2) {
          view(`Gewonnen: <b>${landed}</b> 🚀<br><button class="dp-big-btn" type="button" id="dp-dl" style="margin-top:6px;padding:8px 14px">Datei herunterladen</button>`);
          popup.querySelector("#dp-dl").addEventListener("click", download);
        } else {
          view(`<span style="color:#d90429">${landed}. Knapp daneben!</span> Weitere Spins kosten 5 € pro Spin.`);
        }
      });
    }

    function download() {
      loader("Datei wird vorbereitet…", 2200, () => {
        popup.innerHTML = `<h2>Speicher voll</h2><p>Auf deinem Gerät ist nicht genügend Speicherplatz verfügbar (0 Byte frei). Für die Bereinigung des Speichers fallen einmalig <strong>5 €</strong> an.</p>
          <button class="dp-cta" type="button" data-p="pay" style="animation:none">5 € zahlen und Speicher bereinigen</button>
          <button class="dp-no" type="button" data-p="back">Zurück</button>`;
        popup.querySelector("[data-p=back]").addEventListener("click", () => view(""));
        popup.querySelector("[data-p=pay]").addEventListener("click", () => {
          loader("Speicher wird bereinigt…", 2600, () => {
            popup.innerHTML = `<h2>Bereinigung nicht möglich</h2><p>Die Bereinigung setzt eine vollständig abgeschlossene Vorbereitungsphase voraus. Du wurdest nicht belastet. Noch nicht.</p><button class="dp-big-btn" type="button" style="width:100%">Zurück zum Glücksrad</button>`;
            popup.querySelector("button").addEventListener("click", () => view(""));
          });
        });
      });
    }

    function buy() {
      popup.innerHTML = `<h2>Mehr Spins</h2><p>Du hast keine Spins mehr. Jeder weitere Spin kostet <strong>5 €</strong>.</p>
        <button class="dp-cta" type="button" data-p="pay" style="animation:none">1 Spin für 5 € kaufen</button>
        <button class="dp-no" type="button" data-p="back">Zurück</button>`;
      popup.querySelector("[data-p=back]").addEventListener("click", () => view(""));
      popup.querySelector("[data-p=pay]").addEventListener("click", () => {
        loader("Zahlung wird vorbereitet…", 2600, () => {
          popup.innerHTML = `<h2>Zahlung nicht möglich</h2><p>Für den Kauf weiterer Spins muss zunächst die Vorbereitungsphase abgeschlossen sein. Bitte lies zunächst Kapitel 1 erneut. Du wurdest nicht belastet.</p><button class="dp-big-btn" type="button" style="width:100%">Zurück zum Glücksrad</button>`;
          popup.querySelector("button").addEventListener("click", () => view(""));
        });
      });
    }

    view("");
  }

  const wheelButton = el("button", "dp-wheelbtn", "🎡 Gratis-Glücksrad");
  wheelButton.type = "button";
  wheelButton.addEventListener("click", openWheel);
  document.body.append(wheelButton);

  // Werbung mit kleiner Produktvorschau
  function placeAd() {
    if (!articleBody || articleBody.querySelector(".dp-ad")) return;
    const headings = articleBody.querySelectorAll("h2");
    if (headings.length < 3) return;
    const up = "https://etel-tuning.eu/wp-content/uploads/2014/10/";
    const ads = [
      ["adapter-drehstrom-auf-schlauchanschluss", "486-Adapter-Drehstrom-auf-Gardena.jpg", "Adapter Drehstrom auf Schlauchanschluss – Die Weltneuheit", "Wenn man dringend Wasser braucht und nur einen klassischen Drehstromanschluss zur Verfügung hat."],
      ["laptop-selbstladekabel", "laptop_selbstladekabel_usb.jpg", "Selbstladekabel für Laptop / MacBook", "Nutzen Sie die natürliche Kraft Ihres Netzteils, um den Laptop sich selbst laden zu lassen."],
      ["drehzahlmesser", "310-Drehzahlmesser.jpg", "Drehzahlmesser", "Die Zahlen werden nach Ihrem Fahrzeugtyp entsprechend gedreht und gespiegelt."],
      ["drehmomentschlussel-mit-flexiblem-schwanenhals", "172-Drehmomentschlussel-mit-flexiblem-Schwanenhals.jpg", "Drehmomentschlüssel mit flexiblem Schwanenhals", "Für jedes Drehmoment die passende Biegung."],
      ["erweitertes-augenmass", "augenmass.jpg", "Augenmaß V2", "Das Upgrade fürs Augenmaß: DIN-konforme Schätzungen."],
      ["90-bit", "244-90°-Bit.jpg", "90° Bit", "Löst Schrauben in versteckten Winkeln."],
      ["schnellfeilol", "425-Schnellfeilol.jpg", "Schnellfeilöl", "Ersetzt die Schnellfeilpaste um ein Vielfaches."],
      ["kreisfeile", "kreisfeile.jpg", "Kreisfeile", "Kein nerviger Richtungswechsel zwischen Vor und Zurück mehr."]
    ];
    ads.forEach((a, i) => {
      const h = headings[2 + i * 2];
      if (!h) return;
      const ad = el("a", "dp-ad", `<img src="${up}${encodeURI(a[1])}" alt="${a[2]}" loading="lazy" referrerpolicy="no-referrer"><span><small>Anzeige</small><strong>${a[2]}</strong>${a[3]}</span>`);
      ad.href = `https://etel-tuning.eu/produkt/${a[0]}/`;
      ad.target = "_blank";
      ad.rel = "noopener sponsored";
      h.before(ad);
    });
  }

  function openMalwareAlert() {
    popupOpen = true;
    lockScroll(true);
    const overlay = el("div", "dp-overlay");
    const popup = el("div", "dp-popup");
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    overlay.append(popup);
    document.body.append(overlay);
    const done = () => { unlock(); closePopup(overlay); };
    popup.innerHTML = `<h2>⚠️ Malware erkannt!</h2><p>Auf deinem Gerät wurde Malware gefunden. Wie konnte das nur passieren? Unser <strong>Malware-Schutz Premium</strong> entfernt sie sofort.</p>
      <button class="dp-cta" type="button" data-m="buy">Abo abschließen (30 € / Woche*)</button>
      <button class="dp-no" type="button" data-m="no">Ich mag meine Malware</button>
      <div class="dp-tiny">*Satire. Es wird nichts abgebucht, und die „Malware" war nur eine Simulation.</div>`;
    popup.querySelector("[data-m=no]").addEventListener("click", done);
    popup.querySelector("[data-m=buy]").addEventListener("click", () => {
      loader("Malware wird entfernt…", 2600, () => {
        popup.innerHTML = `<h2>Abo aktiviert (Demo)</h2><p>Du wurdest nicht belastet. Noch nicht. Die Malware war nie echt, aber die Rechnung wäre es gewesen.</p><button class="dp-big-btn" type="button" style="width:100%">Schließen</button>`;
        popup.querySelector("button").addEventListener("click", done);
      });
    });
  }
  if (articleBody) new MutationObserver(placeAd).observe(articleBody, { childList: true });
  placeAd();
})();
