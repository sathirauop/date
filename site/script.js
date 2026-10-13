// ============================================================
//  EDIT THESE BEFORE YOU SEND THE LINK 💌
// ============================================================
const CONFIG = {
  herName: "My Love",          // her name or a nickname
  yourName: "Yours, always",   // how you sign off

  // Email: her answer is sent here via FormSubmit.co (free, no signup).
  // The very first submission sends you an activation email — click it once.
  email: "sathira97@gmail.com",

  // Optional instant phone notification via ntfy.sh (free, no signup).
  // Install the "ntfy" app, subscribe to a hard-to-guess topic, put it here.
  ntfyTopic: "",               // e.g. "dinner-date-k39xq7"

  // Optional: shows a "send it on WhatsApp" button on the last page.
  whatsappNumber: "94017568407",          // international format, digits only, e.g. "94771234567"
};

const PLACES = [
  { emoji: "🥡", name: "Chinese Date", desc: "Dumplings, noodles & fortune cookies" },
  { emoji: "🍣", name: "Japanese Date", desc: "Sushi, ramen & chopstick fails" },
  { emoji: "🌮", name: "Street Food", desc: "Wander, snack & share bites" },
  { emoji: "🌃", name: "Rooftop Dinner", desc: "City lights & dessert" },
  { emoji: "🍝", name: "Italian", desc: "Pasta, pizza & candlelight" },
  { emoji: "✨", name: "Somewhere else", desc: "Your call — tell me!", other: true },
];

const NO_TEXTS = [
  "No", "Are you sure? 🥺", "Really sure??", "Think again 💔", "Pleeease 🥹",
  "I'll be so sad 😢", "Nope, can't catch me 😜", "Just click Yes 💖",
  "Wrong button!", "Too slow 😝", "You know you want to 🍕", "Not happening 🙈",
];

// ============================================================

const $ = (id) => document.getElementById(id);

document.querySelectorAll("[data-her-name]").forEach((el) => (el.textContent = CONFIG.herName));
document.querySelectorAll("[data-your-name]").forEach((el) => (el.textContent = CONFIG.yourName));

function showPage(id) {
  document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === id));
  window.scrollTo({ top: 0 });
}

// ---------- Floating hearts ----------
const HEART_EMOJIS = ["💖", "💕", "💗", "💓", "❤️", "🌸", "💘"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 26 + "px";
  h.style.animationDuration = 7 + Math.random() * 7 + "s";
  $("hearts").appendChild(h);
  h.addEventListener("animationend", () => h.remove());
}
if (!reduceMotion) setInterval(spawnHeart, 450);

function burstHearts(x, y, count = 28) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement("span");
    b.className = "burst";
    b.textContent = HEART_EMOJIS[i % HEART_EMOJIS.length];
    const angle = (Math.PI * 2 * i) / count;
    const dist = 120 + Math.random() * 160;
    b.style.left = x + "px";
    b.style.top = y + "px";
    b.style.fontSize = 18 + Math.random() * 18 + "px";
    b.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    b.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(b);
    b.addEventListener("animationend", () => b.remove());
  }
}

// ---------- The un-clickable "No" button ----------
const yesBtn = $("yesBtn");
const noBtn = $("noBtn");
let noAttempts = 0;
let escaped = false;

// Move the button out of the card into <body> so position:fixed is relative
// to the viewport (the card's backdrop-filter would otherwise trap it).
function detachNoButton() {
  if (escaped) return;
  const r = noBtn.getBoundingClientRect();
  const placeholder = document.createElement("span");
  placeholder.style.cssText = `display:inline-block;width:${r.width}px;height:${r.height}px`;
  noBtn.replaceWith(placeholder);
  document.body.appendChild(noBtn);
  noBtn.classList.add("runaway");
  noBtn.style.left = r.left + "px";
  noBtn.style.top = r.top + "px";
  escaped = true;
}

function flee(px, py) {
  detachNoButton();
  noAttempts++;
  noBtn.textContent = NO_TEXTS[noAttempts % NO_TEXTS.length];
  yesBtn.style.transform = `scale(${Math.min(1 + noAttempts * 0.07, 1.6)})`;

  const r = noBtn.getBoundingClientRect();
  if (px == null) { px = r.left + r.width / 2; py = r.top + r.height / 2; }

  const pad = 12;
  const maxX = Math.max(pad, window.innerWidth - noBtn.offsetWidth - pad);
  const maxY = Math.max(pad, window.innerHeight - noBtn.offsetHeight - pad);
  let best = null;
  let bestDist = -1;
  for (let i = 0; i < 30; i++) {
    const x = pad + Math.random() * (maxX - pad);
    const y = pad + Math.random() * (maxY - pad);
    const d = Math.hypot(x + noBtn.offsetWidth / 2 - px, y + noBtn.offsetHeight / 2 - py);
    if (d > bestDist) { best = { x, y }; bestDist = d; }
    if (d > 260 && Math.random() < 0.5) break; // keep it unpredictable
  }
  noBtn.style.left = best.x + "px";
  noBtn.style.top = best.y + "px";

  noBtn.classList.remove("pop");
  void noBtn.offsetWidth; // restart animation
  noBtn.classList.add("pop");
}

// Run away when the cursor gets close (before it can even touch the button)
document.addEventListener("mousemove", (e) => {
  if (!$("page-sorry").classList.contains("active")) return;
  const r = noBtn.getBoundingClientRect();
  const m = 80;
  if (e.clientX > r.left - m && e.clientX < r.right + m &&
      e.clientY > r.top - m && e.clientY < r.bottom + m) {
    flee(e.clientX, e.clientY);
  }
});

// Safety nets: hover, press, touch, focus, click — all just make it run.
noBtn.addEventListener("pointerenter", (e) => flee(e.clientX, e.clientY));
noBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); flee(e.clientX, e.clientY); });
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const t = e.touches[0];
  flee(t.clientX, t.clientY);
}, { passive: false });
noBtn.addEventListener("focus", () => { noBtn.blur(); flee(); });
noBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopImmediatePropagation(); flee(e.clientX, e.clientY); });

window.addEventListener("resize", () => {
  if (!escaped) return;
  const maxX = window.innerWidth - noBtn.offsetWidth - 12;
  const maxY = window.innerHeight - noBtn.offsetHeight - 12;
  noBtn.style.left = Math.min(parseFloat(noBtn.style.left), maxX) + "px";
  noBtn.style.top = Math.min(parseFloat(noBtn.style.top), maxY) + "px";
});

// ---------- Notifications ----------
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve(false), ms))]);
}

async function sendEmail(subject, fields) {
  if (!CONFIG.email || CONFIG.email.endsWith("example.com")) return false;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.email)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _template: "table", ...fields }),
    });
    const json = await res.json().catch(() => ({}));
    return res.ok && String(json.success) !== "false";
  } catch {
    return false;
  }
}

async function sendPush(title, fields) {
  if (!CONFIG.ntfyTopic) return false;
  try {
    const message = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
    const res = await fetch("https://ntfy.sh/", {
      method: "POST",
      body: JSON.stringify({ topic: CONFIG.ntfyTopic, title, message, tags: ["heart"], priority: 5 }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function notify(subject, fields) {
  const results = await withTimeout(
    Promise.all([sendEmail(subject, fields), sendPush(subject, fields)]),
    10000
  );
  return Array.isArray(results) && results.some(Boolean);
}

const now = () => new Date().toLocaleString();

// ---------- YES ----------
yesBtn.addEventListener("click", () => {
  const r = yesBtn.getBoundingClientRect();
  burstHearts(r.left + r.width / 2, r.top + r.height / 2);
  noBtn.remove();
  notify("💖 She said YES to dinner tonight!", {
    "Answer": "YES 💖",
    "Times she tried to click No": noAttempts,
    "Answered at": now(),
  });
  setTimeout(() => showPage("page-choose"), 900);
});

// ---------- Place picker ----------
let selectedPlace = null;

const placesEl = $("places");
PLACES.forEach((p) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "place";
  b.innerHTML = `<span class="emoji">${p.emoji}</span><span class="name">${p.name}</span><span class="desc">${p.desc}</span>`;
  b.addEventListener("click", () => {
    placesEl.querySelectorAll(".place").forEach((x) => x.classList.remove("selected"));
    b.classList.add("selected");
    selectedPlace = p;
    $("otherWrap").classList.toggle("hidden", !p.other);
    if (p.other) $("otherInput").focus();
    $("error").classList.add("hidden");
  });
  placesEl.appendChild(b);
});

function showError(msg) {
  $("error").textContent = msg;
  $("error").classList.remove("hidden");
}

// ---------- Confirm ----------
$("confirmBtn").addEventListener("click", async () => {
  const otherText = $("otherInput").value.trim();
  if (!selectedPlace) return showError("Pick a place first, love 😊");
  if (selectedPlace.other && !otherText) return showError("Tell me where you'd like to go 💭");

  const placeName = selectedPlace.other ? otherText : selectedPlace.name;
  const note = $("note").value.trim();
  const btn = $("confirmBtn");
  btn.disabled = true;
  btn.textContent = "Sending with love… 💌";

  const fields = {
    "Place": `${selectedPlace.emoji} ${placeName}`,
    "Her note": note || "—",
    "Times she tried to click No": noAttempts,
    "Answered at": now(),
  };
  const sent = await notify(`🍽️ Dinner date tonight: ${placeName}`, fields);

  $("summary").textContent = `${selectedPlace.emoji} ${placeName} · tonight`;
  if (!sent) $("fallback").classList.remove("hidden");

  if (CONFIG.whatsappNumber) {
    const msg = `It's a date! 💖\n${placeName} tonight.` + (note ? `\n\n${note}` : "");
    $("waBtn").href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    $("waBtn").classList.remove("hidden");
  }

  showPage("page-done");
  burstHearts(window.innerWidth / 2, window.innerHeight / 3, 36);
});
