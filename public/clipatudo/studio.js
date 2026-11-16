"use strict";

const get = (id) => document.getElementById(id);
const clip = get("clip");
const stage = get("stage");
const scrub = get("scrub");
const caption = get("caption");
const fields = [get("titleTop"), get("titleBottom")];
const buttons = [...document.querySelectorAll("[data-style]")].filter((element) => element instanceof HTMLButtonElement);
let key = "toguro";
let currentCue;
let wordElements = [];
let animation;

const storageKey = () => "clipatudo-preset-v1:" + key;
const clock = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(2).padStart(5, "0")}`;

function readAdjustments() {
  try {
    return JSON.parse(localStorage.getItem(storageKey())) ?? {};
  } catch {
    return {};
  }
}

function applyFields() {
  get("top").textContent = fields[0].value;
  get("bottom").textContent = fields[1].value;
  stage.style.setProperty("--caption", get("captionY").value + "%");
  get("captionValue").value = get("captionY").value + "%";
}

function updateFields(saved = {}) {
  const preset = presets[key];
  fields.forEach((input, i) => { input.value = saved.titles?.[i] ?? preset.titles[i]; });
  get("captionY").value = saved.captionY ?? preset.captionY;
  applyFields();
}

function interpolate(points, time, fallback) {
  if (!points?.length) return fallback;
  const next = points.findIndex(([offset]) => offset > time);
  if (next === -1) return points.at(-1)[1];
  if (next === 0) return points[0][1];
  const [from, low] = points[next - 1];
  const [to, high] = points[next];
  return low + (high - low) * (time - from) / (to - from);
}

function draw() {
  const preset = presets[key];
  const time = Math.min(clip.currentTime, preset.length);
  const shot = preset.cuts.findLast((cut) => cut.start <= time + 0.0001) ?? preset.cuts[0];
  const [scale, x, y] = shot.transform;
  const local = time - shot.start;
  const frames = shot.keyframes;
  stage.style.setProperty("--zoom", interpolate(frames.KFTypeScaleX, local, scale) * 100 + "%");
  stage.style.setProperty("--x", 50 + interpolate(frames.KFTypePositionX, local, x) * 50 + "%");
  stage.style.setProperty("--y", 50 - interpolate(frames.KFTypePositionY, local, y) * 50 + "%");
  get("flash").style.opacity = preset.flash === null || time < preset.flash ? 0 :
    Math.max(0, 1 - (time - preset.flash) / 0.467) * 0.72;
  scrub.value = time;
  get("time").value = clock(time);
  const cue = preset.captions.find((row) => time >= row.start && time < row.end);
  if (currentCue !== cue) {
    currentCue = cue;
    wordElements = (cue?.words ?? []).map(([word]) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.className = "word";
      return span;
    });
    caption.replaceChildren(...wordElements.flatMap((word, i) => i ? [" ", word] : [word]));
  }
  cue?.words.forEach(([, start, end], i) => wordElements[i].classList.toggle("active", time >= start && time < end));
}

function tick() {
  draw();
  if (!clip.paused) animation = requestAnimationFrame(tick);
}

function syncControls() {
  const paused = clip.paused;
  const play = get("play");
  play.textContent = paused ? "▶" : "❚❚";
  play.setAttribute("aria-label", paused ? "Reproduzir" : "Pausar");
  cancelAnimationFrame(animation);
  tick();
}

function select(style) {
  clip.pause();
  key = style;
  stage.dataset.style = key;
  const preset = presets[key];
  buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.style === key)));
  get("compare").checked = false;
  get("reference").hidden = true;
  get("reference").src = `media/${key}-referencia.jpg`;
  get("art").src = `media/${key}.webp`;
  get("error").hidden = true;
  get("status").textContent = "";
  scrub.max = preset.length;
  get("duration").textContent = preset.length.toLocaleString("pt-BR") + " s";
  clip.src = `media/${key}.mp4`;
  updateFields(readAdjustments());
  draw();
}

function togglePlayback() {
  if (clip.paused) {
    get("compare").checked = false;
    get("reference").hidden = true;
    if (clip.ended) clip.currentTime = 0;
    clip.play().catch(() => { get("error").hidden = false; });
  } else {
    clip.pause();
  }
}

get("play").addEventListener("click", togglePlayback);
clip.addEventListener("click", togglePlayback);
for (const event of ["play", "pause", "ended"]) clip.addEventListener(event, syncControls);
for (const event of ["seeked", "loadeddata"]) clip.addEventListener(event, draw);
clip.addEventListener("error", () => { get("error").hidden = false; });
scrub.addEventListener("input", () => {
  if (clip.readyState) clip.currentTime = Number(scrub.value);
  draw();
});
get("mute").addEventListener("click", () => {
  clip.muted = !clip.muted;
  get("mute").setAttribute("aria-pressed", String(clip.muted));
  get("mute").setAttribute("aria-label", clip.muted ? "Ativar som" : "Silenciar");
  get("mute").firstElementChild.textContent = clip.muted ? "×" : "♪";
});
get("compare").addEventListener("change", (event) => {
  get("reference").hidden = !event.target.checked;
  if (event.target.checked) clip.pause();
});
buttons.forEach((button) => button.addEventListener("click", () => select(button.dataset.style)));
[...fields, get("captionY")].forEach((input) => input.addEventListener("input", applyFields));
get("save").addEventListener("click", () => {
  try {
    localStorage.setItem(storageKey(), JSON.stringify({
      titles: fields.map((input) => input.value),
      captionY: Number(get("captionY").value),
    }));
    get("status").textContent = "Ajustes salvos neste navegador.";
  } catch {
    get("status").textContent = "Este navegador não permite salvar os ajustes.";
  }
});
get("reset").addEventListener("click", () => {
  try {
    localStorage.removeItem(storageKey());
    get("status").textContent = "Preset restaurado.";
  } catch {
    get("status").textContent = "Preset restaurado nesta sessão.";
  }
  updateFields();
});
select("toguro");
