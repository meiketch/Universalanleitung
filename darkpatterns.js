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
  @media (prefers-reduced-motion:reduce){.dp-cta,.dp-toast{animation:none}.dp-close{transition:none}}
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
  setInterval(() => {
    document.querySelectorAll(".dp-toast").forEach(t => t.remove());
    const toast = el("div", "dp-toast", `<strong>${escape(pick(people))}</strong><br>${pick(acts)} <small style="color:#777">· vor ${rand(1, 9)} Min.</small>`);
    document.body.append(toast);
    setTimeout(() => toast.remove(), 5000);
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
      <button class="dp-big-btn" type="button" data-c="shoot" style="width:100%;background:#6c757d">Einen süßen Hundewelpen erschießen</button>
      <button class="dp-no" type="button" data-c="cancel">Doch lieber nicht weiterlesen</button>
      <div class="dp-tiny">*Satire. Es wird nichts abgebucht und kein Tier kommt zu Schaden.</div>`;
    popup.querySelector("[data-c=cancel]").addEventListener("click", () => closePopup(overlay));
    popup.querySelector("[data-c=buy]").addEventListener("click", () => {
      loader("Zahlung wird vorbereitet…", 2600, () => {
        popup.innerHTML = `<h2>Premium+ aktiviert (Demo)</h2><p>Du wurdest nicht belastet. Noch nicht. Die gesperrten Kapitel sind jetzt lesbar.</p><button class="dp-big-btn" type="button" style="width:100%">Weiterlesen →</button>`;
        popup.querySelector("button").addEventListener("click", finish);
      });
    });
    popup.querySelector("[data-c=shoot]").addEventListener("click", () => {
      popup.innerHTML = `<h2>Bist du dir sicher?</h2><img class="dp-img" src="${asset("welpe.png")}" alt="Ein süßer Hundewelpe"><p>Er schaut dich an. Er vertraut dir.</p>
        <div class="dp-row dp-swap"><button class="dp-big-btn" type="button" data-s="no">Nein, Welpe retten</button><button class="dp-small-btn" type="button" data-s="yes">Ja, erschießen</button></div>`;
      popup.querySelector("[data-s=no]").addEventListener("click", () => closePopup(overlay));
      popup.querySelector("[data-s=yes]").addEventListener("click", () => {
        loader("Spielzeugpistole wird geladen…", 2600, () => {
          popup.innerHTML = `<h2>PENG! 💥</h2><p>Aus der Pistole kam nur ein Fähnchen mit der Aufschrift „PENG". Dem Welpen geht es bestens, er hat sich ein Leckerli verdient. Die gesperrten Kapitel sind jetzt lesbar.</p><button class="dp-big-btn" type="button" style="width:100%">Weiterlesen →</button>`;
          popup.querySelector("button").addEventListener("click", finish);
        });
      });
    });
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
})();
