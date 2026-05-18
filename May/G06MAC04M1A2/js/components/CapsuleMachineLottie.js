/**
 * Browser build: requires global `React` and `lottie` (see index.html script order).
 */
const React = window.React;
const {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  memo,
} = React;

/**
 * CapsuleMachineLottie
 * --------------------
 * A reusable React wrapper around a Lottie animation exported from After Effects.
 *
 * This component was extracted from the original static applet in this folder.
 * It is designed for animations that:
 * - are rendered by lottie-web
 * - contain marker entries that define playable scenes
 * - expose editable After Effects controls on a named layer, such as "Machine"
 *
 * The component accepts animationData as input, discovers scenes from markers,
 * discovers slider/color controls from a named Lottie layer, and optionally
 * renders built-in controls for effects, scenes, and common Fill/Serve actions.
 *
 * Installation in a normal React app:
 *
 *   npm install lottie-web
 *
 * Example usage with a bundler:
 *
 *   import lottie from "lottie-web";
 *   import animationData from "./animData.json";
 *   import CapsuleMachineLottie from "./CapsuleMachineLottie";
 *
 *   export default function App() {
 *     return (
 *       <CapsuleMachineLottie
 *         lottie={lottie}
 *         animationData={animationData}
 *         assetBasePath="/images/"
 *         effectLayerName="Machine"
 *         hiddenEffects={["step"]}
 *         onEffectChange={(name, value) => console.log(name, value)}
 *       />
 *     );
 *   }
 *
 * Example usage with the existing global lottie.min.js script:
 *
 *   <CapsuleMachineLottie animationData={animationData} />
 *
 * In that setup, the component will look for window.lottie or window.bodymovin.
 */

const DEFAULT_PANEL_STYLE = {
  position: "absolute",
  top: 12,
  left: 12,
  maxWidth: 320,
  maxHeight: "85vh",
  overflowY: "auto",
  background: "rgba(255, 255, 255, 0.95)",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 12,
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  fontFamily: "system-ui, sans-serif",
  fontSize: 13,
  zIndex: 10,
};

const DEFAULT_ACTIONS = {
  fillSceneIndex: 0,
  firstServeSceneIndex: 1,
  repeatServeSceneIndex: 3,
  servesEffectName: "serves",
};

const DEFAULT_HIDDEN_EFFECTS = ["step"];

/** Fallback if comp has no FILL/SERVE text layers (comp-relative %). */
const DEFAULT_LOTTIE_TOUCH_TARGETS = {
  fill: { left: "38%", top: "54%", width: "24%", height: "11%" },
  serve: { left: "38%", top: "63%", width: "24%", height: "11%" },
};

function readVec2Lottie(prop) {
  if (!prop || prop.k === undefined) return [0, 0];
  const k = prop.k;
  if (typeof k === "number") return [0, 0];
  if (Array.isArray(k) && k.length >= 2 && typeof k[0] === "number") return [k[0], k[1]];
  if (k && typeof k === "object" && Array.isArray(k.s)) return [k.s[0], k.s[1]];
  return [0, 0];
}

function readScaleLottie(prop) {
  const k = prop && prop.k;
  if (Array.isArray(k) && k.length >= 2 && typeof k[0] === "number") return [k[0] / 100, k[1] / 100];
  if (k && k[0] && k[0].s && Array.isArray(k[0].s)) return [k[0].s[0] / 100, k[0].s[1] / 100];
  return [1, 1];
}

/**
 * Approximate world (x,y) in comp space for a layer named `name` (e.g. FILL, SERVE).
 * Matches Bodymovin parent chain with position/anchor/scale; rotation assumed 0 for UI text.
 */
function worldCompXYForNamedLayer(animationData, name) {
  const layers = animationData?.layers;
  if (!Array.isArray(layers)) return null;
  const layer = layers.find((L) => L.nm === name);
  if (!layer) return null;
  const byInd = {};
  layers.forEach((L) => {
    byInd[L.ind] = L;
  });
  const chain = [];
  let cur = layer;
  while (cur) {
    chain.unshift(cur);
    cur = cur.parent != null ? byInd[cur.parent] : null;
  }
  let x = 0;
  let y = 0;
  for (const L of chain) {
    const p = readVec2Lottie(L.ks.p);
    const a = readVec2Lottie(L.ks.a);
    const s = readScaleLottie(L.ks.s);
    const sxx = s[0];
    const syy = s[1];
    x = x * sxx + (p[0] - a[0] * sxx);
    y = y * syy + (p[1] - a[1] * syy);
  }
  return [x, y];
}

function estimateTextButtonSize(layer, fallbackName) {
  const tk = layer?.t?.d?.k?.[0]?.s;
  const fontSize = (tk && tk.s) || 36;
  const text = (tk && tk.t) || fallbackName;
  const w = Math.max(String(text).length * fontSize * 0.55, 120);
  const h = Math.max(fontSize * 1.45, 52);
  return { w, h };
}

/** Canvas font string for `measureText` — must align with Lottie `fonts.list` / `f` on the text doc. */
function lottieTextDocToCanvasFont(textDoc) {
  const fontSize = Number(textDoc && textDoc.s) || 36;
  const fName = String((textDoc && textDoc.f) || "");
  if (fName === "MyriadPro-Bold") {
    return `700 ${fontSize}px "Myriad Pro","MyriadPro-Bold",sans-serif`;
  }
  const spaced = fName.replace(/-/g, " ");
  const face = spaced.includes(" ") ? `"${spaced}"` : spaced;
  return `700 ${fontSize}px ${face},sans-serif`;
}

function measureLottieTextWidth(textDoc, fallbackText) {
  const text = String((textDoc && textDoc.t) || fallbackText || "");
  const fontSize = Number(textDoc && textDoc.s) || 36;
  const heuristic = text.length * fontSize * 0.55;

  if (typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext && canvas.getContext("2d");
    if (context) {
      context.font = lottieTextDocToCanvasFont(textDoc);
      const metrics = context.measureText(text);
      if (metrics && Number.isFinite(metrics.width) && metrics.width > 0) {
        return Math.max(metrics.width, heuristic);
      }
    }
  }

  return heuristic;
}

function boxPctFromCenter(cx, cy, bw, bh, compW, compH) {
  const pad = 1.2;
  const w = Math.min(compW * 0.42, bw * pad);
  const h = Math.min(compH * 0.22, bh * pad);
  const left = ((cx - w / 2) / compW) * 100;
  const top = ((cy - h / 2) / compH) * 100;
  const width = (w / compW) * 100;
  const height = (h / compH) * 100;
  return {
    left: `${Math.max(0, Math.min(100 - width, left)).toFixed(2)}%`,
    top: `${Math.max(0, Math.min(100 - height, top)).toFixed(2)}%`,
    width: `${Math.min(100, width).toFixed(2)}%`,
    height: `${Math.min(100, height).toFixed(2)}%`,
  };
}

/** Derive Fill/Serve hit boxes from FILL & SERVE text layer positions in the JSON. */
function buildAutoTouchTargetsFromAnimationData(animationData) {
  const W = animationData?.w || 1920;
  const H = animationData?.h || 1080;
  const layers = animationData?.layers;
  if (!Array.isArray(layers)) return null;
  const fillXY = worldCompXYForNamedLayer(animationData, "FILL");
  const serveXY = worldCompXYForNamedLayer(animationData, "SERVE");
  if (!fillXY || !serveXY) return null;
  const fillLayer = layers.find((L) => L.nm === "FILL");
  const serveLayer = layers.find((L) => L.nm === "SERVE");
  const fs = fillLayer ? estimateTextButtonSize(fillLayer, "FILL") : { w: 150, h: 52 };
  const ss = serveLayer ? estimateTextButtonSize(serveLayer, "SERVE") : { w: 170, h: 52 };
  return {
    fill: boxPctFromCenter(fillXY[0], fillXY[1], fs.w, fs.h, W, H),
    serve: boxPctFromCenter(serveXY[0], serveXY[1], ss.w, ss.h, W, H),
  };
}

/**
 * Wire clicks on SVG nodes Bodymovin tagged with `data-name` (usually AE layer / group names).
 * Returns { removers, wired } — `wired` if at least one new element was bound.
 */
function bindSvgDataNameClicks(svg, names, action, getMachineApi, playSound, boundElSet) {
  const removers = [];
  let wired = false;
  const nameList = Array.isArray(names) ? names : [names];
  for (let i = 0; i < nameList.length; i += 1) {
    const nm = nameList[i];
    if (!nm) continue;
    const safe = typeof CSS !== "undefined" && CSS.escape
      ? CSS.escape(String(nm))
      : String(nm).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    let list;
    try {
      list = svg.querySelectorAll(`[data-name="${safe}"]`);
    } catch {
      continue;
    }
    if (!list || !list.length) continue;
    list.forEach((el) => {
      if (boundElSet.has(el)) return;
      boundElSet.add(el);
      wired = true;
      el.style.cursor = "pointer";
      el.style.pointerEvents = "auto";
      const fn = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const api = getMachineApi();
        if (!api) return;
        const isDisabled = action === "fill"
          ? api.isFillDisabled?.() === true
          : api.isServeDisabled?.() === true;
        if (isDisabled) return;
        playSound();
        if (action === "fill") api.fill?.();
        else api.serve?.();
      };
      el.addEventListener("click", fn, true);
      removers.push(() => {
        el.removeEventListener("click", fn, true);
        el.style.cursor = "";
        el.style.pointerEvents = "";
        boundElSet.delete(el);
      });
    });
    if (wired) break;
  }
  return { removers, wired };
}

function activatePillGroupPointerEvents(g) {
  g.querySelectorAll("path, rect, ellipse, polygon").forEach((node) => {
    node.style.pointerEvents = "visiblePainted";
  });
}

/**
 * Many shape groups have no `data-name` on the inner `<g>` that wraps the pill paths.
 * Finds parent `<g>` of paths whose `d` matches any `pillPathMarkers`, sorts by Y (or X if
 * vertically aligned), binds Fill then Serve (unless `invertPillFillServeOrder`).
 */
function bindFillServeByPillPathParents(
  svg,
  getMachineApi,
  playSound,
  boundElSet,
  needsFill,
  needsServe,
  pillPathMarkers,
  invertPillFillServeOrder,
) {
  const removers = [];
  const markers = Array.isArray(pillPathMarkers) && pillPathMarkers.length
    ? pillPathMarkers
    : ["85,-12.518"];
  const parents = new Set();
  markers.forEach((marker) => {
    if (!marker) return;
    svg.querySelectorAll("path").forEach((path) => {
      const d = path.getAttribute("d") || "";
      if (!d.includes(marker)) return;
      const g = path.parentElement;
      if (!g || String(g.tagName).toLowerCase() !== "g") return;
      parents.add(g);
    });
  });
  if (!parents.size) return removers;

  let scored = [...parents].map((g) => {
    const r = g.getBoundingClientRect();
    return { g, midY: r.top + r.height / 2, midX: r.left + r.width / 2 };
  });
  scored.sort((a, b) => a.midY - b.midY);
  const ySpan = scored.length >= 2 ? Math.abs(scored[scored.length - 1].midY - scored[0].midY) : 0;
  if (ySpan < 6 && scored.length >= 2) {
    scored.sort((a, b) => a.midX - b.midX);
  }
  if (invertPillFillServeOrder) {
    scored.reverse();
  }
  if (scored.length > 2) {
    scored = scored.slice(0, 2);
  }

  const bindGroup = (g, action) => {
    if (boundElSet.has(g)) return;
    boundElSet.add(g);
    activatePillGroupPointerEvents(g);
    g.style.cursor = "pointer";
    g.style.pointerEvents = "auto";
    const fn = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const api = getMachineApi();
      if (!api) return;
      const isDisabled = action === "fill"
        ? api.isFillDisabled?.() === true
        : api.isServeDisabled?.() === true;
      if (isDisabled) return;
      playSound();
      if (action === "fill") api.fill?.();
      else api.serve?.();
    };
    g.addEventListener("click", fn, true);
    removers.push(() => {
      g.removeEventListener("click", fn, true);
      g.style.cursor = "";
      g.style.pointerEvents = "";
      g.querySelectorAll("path, rect, ellipse, polygon").forEach((node) => {
        node.style.pointerEvents = "";
      });
      boundElSet.delete(g);
    });
  };

  if (needsFill && scored[0]) {
    bindGroup(scored[0].g, "fill");
  }
  if (needsServe && scored[1]) {
    bindGroup(scored[1].g, "serve");
  } else if (needsServe && !needsFill && scored[0]) {
    bindGroup(scored[0].g, "serve");
  }

  return removers;
}

function attachLottieSvgActionClicks(anim, opts) {
  if (!anim) {
    return () => {};
  }
  const {
    fillNames = ["FILL", "refill"],
    serveNames = ["SERVE", "serve"],
    playSound,
    getMachineApi,
    pillPathMarkers = ["85,-12.518"],
    invertPillFillServeOrder = false,
    /** When true, never wire Fill (text or pill); pill fallback can bind top pill as Serve only. */
    disableFillAction = false,
  } = opts;

  const getSvg = () => {
    const wrap = anim.wrapper || anim.container;
    if (wrap && wrap.querySelector) {
      const s = wrap.querySelector("svg");
      if (s) return s;
    }
    if (anim.renderer && anim.renderer.svgElement) return anim.renderer.svgElement;
    return null;
  };

  let flatRemovers = [];
  const bind = () => {
    flatRemovers.forEach((r) => r());
    flatRemovers = [];
    const svg = getSvg();
    if (!svg) return;
    svg.style.pointerEvents = "auto";

    const boundElSet = new Set();
    const fillHit = disableFillAction
      ? { removers: [], wired: true }
      : bindSvgDataNameClicks(svg, fillNames, "fill", getMachineApi, playSound, boundElSet);
    const serveHit = bindSvgDataNameClicks(svg, serveNames, "serve", getMachineApi, playSound, boundElSet);
    flatRemovers.push(...fillHit.removers, ...serveHit.removers);

    const needsFillPill = !disableFillAction && !fillHit.wired;
    const needsServePill = !serveHit.wired;
    if (needsFillPill || needsServePill) {
      flatRemovers.push(
        ...bindFillServeByPillPathParents(
          svg,
          getMachineApi,
          playSound,
          boundElSet,
          needsFillPill,
          needsServePill,
          pillPathMarkers,
          invertPillFillServeOrder,
        ),
      );
    }
  };

  bind();
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(bind);
  }
  const onDom = () => {
    bind();
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(bind);
    }
  };
  anim.addEventListener("DOMLoaded", onDom);
  return () => {
    try {
      if (anim && typeof anim.removeEventListener === "function") {
        anim.removeEventListener("DOMLoaded", onDom);
      }
    } catch (_err) {
      /* AnimationItem may already be destroyed; lottie can leave listeners in a bad state. */
    }
    flatRemovers.forEach((r) => r());
    flatRemovers = [];
  };
}

const DEFAULT_SLIDER_CONFIG = {
  min: 0,
  max: 20,
  step: 0.1,
};
const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

function cloneAnimationData(animationData) {
  if (!animationData) return null;
  if (typeof structuredClone === "function") {
    return structuredClone(animationData);
  }
  return JSON.parse(JSON.stringify(animationData));
}

/** Generic UI click for Fill/Serve (same key as PageConfig and other applet controls). */
function playCapsuleActionClickSound() {
  if (typeof window !== "undefined" && typeof window.playCarClickSound === "function") {
    window.playCarClickSound("click");
  }
}

/** i18n helper for Lottie face + overlays (must match AE layer names `FILL` / `SERVE` for hit wiring). */
function tCapsuleMachineFaceLabel(i18nKey, fallback) {
  if (typeof window === "undefined" || !window.i18n || typeof window.i18n.t !== "function") {
    return fallback;
  }
  const v = window.i18n.t(i18nKey);
  if (typeof v !== "string" || v.startsWith("[Missing:")) return fallback;
  return v;
}

/**
 * Replace visible text on text layers named `FILL` and `SERVE` (same names used for SVG hit detection).
 */
function applyCapsuleMachineFaceLabels(animationData, fillText, serveText) {
  if (!animationData || typeof animationData !== "object") return;
  const applyToLayer = (layer) => {
    if (!layer || layer.ty !== 5 || !layer.t || !layer.t.d) return;
    const nm = layer.nm;
    let newText = null;
    if (nm === "FILL") newText = fillText;
    else if (nm === "SERVE") newText = serveText;
    else return;
    if (!newText || typeof newText !== "string") return;
    const kd = layer.t.d.k;
    if (!Array.isArray(kd)) return;
    for (let i = 0; i < kd.length; i += 1) {
      const kf = kd[i];
      if (kf && kf.s && typeof kf.s === "object" && Object.prototype.hasOwnProperty.call(kf.s, "t")) {
        const prevText = String(kf.s.t);
        const anchor = layer.ks && layer.ks.a && layer.ks.a.k;
        const prevHalf = measureLottieTextWidth(kf.s, prevText) / 2;
        kf.s.t = newText;
        kf.s.j = 0;
        delete kf.s.sz;
        delete kf.s.ps;

        if (Array.isArray(anchor) && typeof anchor[0] === "number") {
          const nextHalf = measureLottieTextWidth(kf.s, newText) / 2;
          if (prevHalf > 1e-3) {
            anchor[0] *= nextHalf / prevHalf;
          } else {
            anchor[0] = nextHalf;
          }
        }
      }
    }
  };
  const walk = (layers) => {
    if (!Array.isArray(layers)) return;
    for (let li = 0; li < layers.length; li += 1) {
      const layer = layers[li];
      applyToLayer(layer);
      if (layer && Array.isArray(layer.layers)) walk(layer.layers);
    }
  };
  walk(animationData.layers);
  if (Array.isArray(animationData.assets)) {
    for (let ai = 0; ai < animationData.assets.length; ai += 1) {
      const asset = animationData.assets[ai];
      if (asset && Array.isArray(asset.layers)) walk(asset.layers);
    }
  }
}

function normalizeEffectName(name) {
  return String(name || "").trim().toLowerCase();
}

function arraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function toHex(k) {
  const r = Math.round((k[0] || 0) * 255);
  const g = Math.round((k[1] || 0) * 255);
  const b = Math.round((k[2] || 0) * 255);
  return `#${[r, g, b]
    .map((x) => `0${Math.max(0, Math.min(255, x)).toString(16)}`.slice(-2))
    .join("")}`;
}

function fromHex(hex) {
  const m = String(hex || "").match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return [1, 1, 1, 1];
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
    1,
  ];
}

/** @param {string|number[]|undefined|null} value @returns {number[]|null} RGBA 0–1 or null to omit */
function normalizeLottieColorProp(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("#")) return fromHex(trimmed);
    return null;
  }
  if (!Array.isArray(value) || value.length < 3) return null;
  const r = Number(value[0]);
  const g = Number(value[1]);
  const b = Number(value[2]);
  const a = value.length >= 4 ? Number(value[3]) : 1;
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return [r, g, b, a];
}

const DEFAULT_SERVE_COLOR_ORDER = [1, 2, 3, 4];

/** @param {unknown} value @returns {number[]} Integers 1–4 = `color1`…`color4`; any length, repeats allowed; whole list cycles on Serve. */
function normalizeServeColorOrder(value) {
  const src = Array.isArray(value) && value.length ? value : DEFAULT_SERVE_COLOR_ORDER;
  const out = [];
  for (let i = 0; i < src.length; i += 1) {
    const n = Math.round(Number(src[i]));
    if (n >= 1 && n <= 4) out.push(n);
  }
  return out.length ? out : [...DEFAULT_SERVE_COLOR_ORDER];
}

/** @returns {number|null} Positive integer cap, or null = unlimited */
function effectiveMaxDraws(value) {
  if (value == null || value === "") return null;
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

function getScenesFromMarkers(animationData, sceneLabels = {}, loopScenes = []) {
  const markers = animationData?.markers ? animationData.markers.slice() : [];
  const loopSet = new Set(loopScenes);

  return markers.slice(0, -1).map((mStart, index) => {
    const mEnd = markers[index + 1];
    const startFrame = typeof mStart.tm === "number" ? mStart.tm : 0;
    const endFrame = typeof mEnd.tm === "number" ? mEnd.tm : startFrame;

    return {
      id: index + 1,
      index,
      label: sceneLabels[index] || `Scene ${index + 1}`,
      startFrame,
      endFrame,
      startMarker: mStart.cm || String(index + 1),
      endMarker: mEnd.cm || String(index + 2),
      isLoop: loopSet.has(index),
    };
  });
}

function findLayerIndex(animationData, layerName) {
  const layers = animationData?.layers;
  if (!Array.isArray(layers)) return -1;
  return layers.findIndex((layer) => layer.nm === layerName);
}

function analyseLayerEffects(animationData, layerName, hiddenEffects = []) {
  const layers = animationData?.layers;
  const layerIndex = findLayerIndex(animationData, layerName);
  const hidden = new Set(hiddenEffects.map(normalizeEffectName));

  if (!Array.isArray(layers) || layerIndex === -1) return [];

  const layer = layers[layerIndex];
  const effects = Array.isArray(layer.ef) ? layer.ef : [];

  return effects.flatMap((effect, effectIndex) => {
    const effectName = effect.nm || `effect_${effectIndex}`;
    if (hidden.has(normalizeEffectName(effectName))) return [];

    const prop = Array.isArray(effect.ef) ? effect.ef[0] : null;
    if (!prop) return [];

    if (prop.ty === 0) {
      let value = 0;
      const v = prop.v;
      if (v && typeof v.k !== "undefined") {
        if (v.a === 1 && Array.isArray(v.k) && v.k.length > 0) {
          const first = v.k[0];
          value = typeof first.s !== "undefined" ? first.s[0] : first.t;
          if (Array.isArray(value)) value = value[0];
        } else {
          value = Array.isArray(v.k) ? v.k[0] : v.k;
        }
      }

      return [{
        effectName,
        effectIndex,
        controlType: "slider",
        value: typeof value === "number" ? value : 0,
        path: [layerIndex, effectIndex],
      }];
    }

    if (prop.ty === 2) {
      return [{
        effectName,
        effectIndex,
        controlType: "color",
        value: prop.v?.k ? prop.v.k.slice(0, 4) : [1, 1, 1, 1],
        path: [layerIndex, effectIndex],
      }];
    }

    return [];
  });
}

function setEffectValue(animationData, path, value) {
  const layer = animationData?.layers?.[path?.[0]];
  const effect = layer?.ef?.[path?.[1]];
  const prop = effect?.ef?.[0];
  if (!prop) return false;

  if (prop.ty === 0) {
    prop.v = {
      a: 0,
      k: typeof value === "number" ? value : Number(value),
      ix: prop.ix,
    };
    return true;
  }

  if (prop.ty === 2) {
    const k = Array.isArray(value) ? value.slice(0, 4) : [1, 1, 1, 1];
    if (k.length === 3) k.push(1);
    prop.v = { a: 0, k, ix: prop.ix };
    return true;
  }

  return false;
}

function setEffectValueByName(animationData, layerName, effectName, value) {
  const controls = analyseLayerEffects(animationData, layerName, []);
  const target = controls.find(
    (control) => normalizeEffectName(control.effectName) === normalizeEffectName(effectName),
  );
  if (!target) return false;
  return setEffectValue(animationData, target.path, value);
}

/** Read current slider / color value from animation JSON (after mutations). */
function getEffectValueByName(animationData, layerName, effectName) {
  const controls = analyseLayerEffects(animationData, layerName, []);
  const target = controls.find(
    (control) => normalizeEffectName(control.effectName) === normalizeEffectName(effectName),
  );
  if (!target) return null;
  const layer = animationData?.layers?.[target.path[0]];
  const effect = layer?.ef?.[target.path[1]];
  const prop = effect?.ef?.[0];
  if (!prop) return null;
  if (prop.ty === 2) {
    const k = prop.v?.k;
    return Array.isArray(k) ? k.slice(0, 4) : null;
  }
  if (prop.ty === 0) {
    const v = prop.v;
    if (v && typeof v.k === "number") return v.k;
    if (v && Array.isArray(v.k) && v.k.length) {
      const first = v.k[0];
      if (first && typeof first.s !== "undefined") return first.s[0];
    }
    return null;
  }
  return null;
}

/** Tube slots use color1…4; falling drop reads `drop new` / `drop old` on Machine. */
function syncDropNewFromQueueHead(animationData, layerName, headColorIndex1to4) {
  const n = Math.max(1, Math.min(4, Math.round(Number(headColorIndex1to4)) || 1));
  const head = getEffectValueByName(animationData, layerName, `color${n}`);
  if (Array.isArray(head) && head.length >= 3) {
    setEffectValueByName(animationData, layerName, "drop new", head);
  }
}

function applyAssetBasePath(animationData, assetBasePath) {
  if (!assetBasePath || !Array.isArray(animationData?.assets)) return;
  animationData.assets.forEach((asset) => {
    if (asset && typeof asset.u === "string") {
      asset.u = assetBasePath;
    }
  });
}

function getLottieInstance(explicitLottie) {
  if (explicitLottie) return explicitLottie;
  if (typeof window === "undefined") return null;
  return window.lottie || window.bodymovin || null;
}

/**
 * @typedef {Object} CapsuleMachineLottieProps
 *
 * @property {Object} animationData
 * The Lottie animation object. This should be a plain JavaScript object, not the
 * `var animationData = ...` wrapper from the raw exported file. If your export is
 * currently a JS global, pass that global value into this prop.
 *
 * @property {Object} [lottie]
 * Optional lottie-web module instance. Pass `import lottie from "lottie-web"`.
 * If omitted, the component falls back to `window.lottie` or `window.bodymovin`.
 *
 * @property {string} [assetBasePath]
 * Optional replacement for every Lottie image asset's `u` path. Use this when
 * React serves images from a different public folder, such as `/images/`.
 *
 * @property {string} [effectLayerName="Machine"]
 * Name of the Lottie/After Effects layer containing editable slider and color
 * controls. In this applet, that layer is named "Machine".
 *
 * @property {"svg"|"canvas"|"html"} [renderer="svg"]
 * Lottie renderer. SVG is recommended for crisp UI-like animations.
 *
 * @property {boolean} [autoplay=false]
 * Whether the whole animation should play immediately after loading.
 *
 * @property {boolean} [loop=false]
 * Whether the whole animation should loop. Scene playback temporarily disables
 * looping so a segment can stop cleanly at its end frame.
 *
 * @property {boolean} [showControls=true]
 * Whether to show generated slider and color inputs.
 *
 * @property {boolean} [showActions=true]
 * Whether to show high-level Fill and Serve action buttons.

 * @property {boolean} [disableFillAction=false]
 * Whether Fill interactions should be disabled.

 * @property {boolean} [disableServeAction=false]
 * Whether Serve interactions should be disabled.
 *
 * @property {boolean} [showScenes=true]
 * Whether to show marker-derived scene buttons.
 *
 * @property {string[]} [hiddenEffects=["step"]]
 * Effect names to hide from the generated controls. "step" is hidden by default
 * because it is expression-driven in this animation and should usually be
 * controlled indirectly through "serves".
 *
 * @property {Object.<string, number|number[]>} [initialEffects]
 * Optional initial effect values keyed by effect name. Numbers target slider
 * controls. RGBA arrays target color controls, using values from 0 to 1.
 *
 * @property {string|number[]} [color1]
 * @property {string|number[]} [color2]
 * @property {string|number[]} [color3]
 * @property {string|number[]} [color4]
 * Convenience props for the Machine layer color effects `color1`…`color4`
 * (same as Bodymovin / AE). Hex string `#rrggbb` or RGBA array with values 0–1.
 * When set, these override the same keys in `initialEffects`.
 * Serve / fill also copy these into the Machine `drop new` (and `drop old` on serve)
 * effect, because the falling-drop shapes read `drop new` / `drop old`, not `color1`–4.
 *
 * @property {number[]} [serveColorOrder=[1,2,3,4]]
 * Per-Serve order: each value is 1–4 meaning Machine `color1`…`color4`. The array can be
 * **any length** (e.g. `[1,2,3,3,3,1,2,4,1,3,3]`); duplicates are fine. After the last
 * entry, the **whole pattern repeats**. Fill resets the index to 0 and sets `drop new`
 * from the first entry.
 *
 * @property {boolean} [prefillMachine=false]
 * Start as if Fill already completed: `serves` is 1 and the first load seeks to the fill
 * scene end (no fill animation). Resets when `animationData` reloads.
 *
 * @property {number} [maxDraws]
 * Max successful Serves after each Fill; omit or values below 1 for unlimited. Fill resets the count.
 *
 * @property {Object.<string, {min?: number, max?: number, step?: number}>} [sliderConfig]
 * Per-slider range configuration. Keys are effect names.
 *
 * @property {Object.<number, string>} [sceneLabels]
 * Optional scene labels keyed by zero-based scene index.
 *
 * @property {number[]} [loopScenes]
 * Zero-based scene indexes that should loop when played.
 *
 * @property {{fillSceneIndex?: number, firstServeSceneIndex?: number, repeatServeSceneIndex?: number, servesEffectName?: string}} [actions]
 * Config for the built-in Fill and Serve buttons.
 *
 * @property {(animation: Object) => void} [onReady]
 * Called after lottie-web creates the animation instance.
 *
 * @property {(effectName: string, value: number|number[]) => void} [onEffectChange]
 * Called after an effect value changes.
 *
 * @property {(scene: Object) => void} [onSceneChange]
 * Called when scene playback starts.
 *
 * @property {(scene: Object) => void} [onSceneComplete]
 * Called when scene playback reaches its end frame.

 * @property {(payload: {drawCount: number, colorNumber: number}) => void} [onServe]
 * Called when a Serve action is accepted.

 * @property {(payload: {drawCount: number}) => void} [onFill]
 * Called when Fill resets the machine.
 *
 * @property {string} [serveBroadcastId]
 * When set (e.g. grid element id), a `capsuleServeInvoked` window event is dispatched after each successful Serve so UI hints can hide.
 *
 * @property {string} [className]
 * Class name for the outer wrapper.
 *
 * @property {React.CSSProperties} [style]
 * Inline style for the outer wrapper.
 *
 * @property {React.CSSProperties} [controlPanelStyle]
 * Inline style override for the floating control panel.
 */

const CapsuleMachineLottie = forwardRef(function CapsuleMachineLottie(
  {
    animationData,
    lottie,
    assetBasePath,
    effectLayerName = "Machine",
    renderer = "svg",
    autoplay = false,
    loop = false,
    showControls = true,
    showActions = true,
    showScenes = true,
    disableFillAction = false,
    disableServeAction = false,
    hiddenEffects = DEFAULT_HIDDEN_EFFECTS,
    initialEffects = EMPTY_OBJECT,
    color1,
    color2,
    color3,
    color4,
    serveColorOrder,
    prefillMachine = false,
    maxDraws,
    sliderConfig = EMPTY_OBJECT,
    sceneLabels = EMPTY_OBJECT,
    loopScenes = EMPTY_ARRAY,
    actions = EMPTY_OBJECT,
    onReady,
    onEffectChange,
    onSceneChange,
    onSceneComplete,
    onServe,
    onFill,
    serveBroadcastId,
    className,
    style,
    controlPanelStyle,
    /** Visible Lottie text for the `FILL` layer; omit to use `buttons.lottieFill` from i18n. */
    faceFillText,
    /** Visible Lottie text for the `SERVE` layer; omit to use `buttons.lottieServe` from i18n. */
    faceServeText,
  },
  ref,
) {
  const wrapperRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const animRef = useRef(null);
  const intervalRef = useRef(null);
  const enterFrameHandlerRef = useRef(null);
  const currentSceneRef = useRef(null);
  /** Index into `resolvedServeColorOrder` for the next Serve. */
  const nextServeSequenceIndexRef = useRef(0);
  /** Successful serves since last Fill (for `maxDraws`). */
  const drawsSinceFillRef = useRef(0);
  /** One-time seek to post-fill frame when `prefillMachine` (reset when animation data reloads). */
  const prefillAppliedRef = useRef(false);
  /** After editing `drop new`/`drop old`, lottie-web must reload the comp; then we play this scene (load effect). */
  const pendingPlaySceneAfterLoadRef = useRef(null);
  const playSceneLatestRef = useRef(() => false);

  const mergedActions = useMemo(() => ({ ...DEFAULT_ACTIONS, ...actions }), [actions]);
  const resolvedInitialEffects = useMemo(() => {
    const out = { ...initialEffects };
    const assign = (key, propVal) => {
      const rgba = normalizeLottieColorProp(propVal);
      if (rgba != null) out[key] = rgba;
    };
    assign("color1", color1);
    assign("color2", color2);
    assign("color3", color3);
    assign("color4", color4);
    return out;
  }, [initialEffects, color1, color2, color3, color4]);
  const resolvedServeColorOrder = useMemo(
    () => normalizeServeColorOrder(serveColorOrder),
    [serveColorOrder],
  );
  const resolvedMaxDraws = useMemo(() => effectiveMaxDraws(maxDraws), [maxDraws]);
  const lottieApi = getLottieInstance(lottie);

  const [workingData, setWorkingData] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [effectControls, setEffectControls] = useState([]);
  const [activeSceneIndex, setActiveSceneIndex] = useState(null);
  const [effectValues, setEffectValues] = useState({});
  const [drawsSinceFillCount, setDrawsSinceFillCount] = useState(0);

  const scenes = useMemo(
    () => getScenesFromMarkers(workingData, sceneLabels, loopScenes),
    [workingData, sceneLabels, loopScenes],
  );

  const clearPlaybackGuards = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (animRef.current && enterFrameHandlerRef.current) {
      animRef.current.removeEventListener("enterFrame", enterFrameHandlerRef.current);
      enterFrameHandlerRef.current = null;
    }
  }, []);

  const refreshControls = useCallback((data) => {
    const controls = analyseLayerEffects(data, effectLayerName, hiddenEffects);
    setEffectControls(controls);

    setEffectValues((current) => {
      const next = { ...current };
      controls.forEach((control) => {
        const existing = next[control.effectName];
        if (existing === undefined) {
          next[control.effectName] = control.value;
        }
      });
      return next;
    });
  }, [effectLayerName, hiddenEffects]);

  const i18nLocale =
    typeof window !== "undefined"
    && window.i18n
    && typeof window.i18n.getCurrentLanguage === "function"
      ? window.i18n.getCurrentLanguage()
      : "";

  useEffect(() => {
    const data = cloneAnimationData(animationData);
    if (!data) {
      setWorkingData(null);
      setEffectControls([]);
      setEffectValues({});
      return;
    }

    // Bodymovin glyph mode only embeds shapes for characters present in the AE comp at export
    // (here: FILL + SERVE → E F I L R S V). Runtime i18n can use other letters; without this,
    // missing glyphs warn in the console and are skipped (e.g. "SAJI" → "SI"). Dropping `chars`
    // makes lottie-web render these layers with `fonts.list` instead so any string works.
    if ("chars" in data) {
      delete data.chars;
    }

    applyAssetBasePath(data, assetBasePath);

    const fillFace =
      typeof faceFillText === "string" && faceFillText.trim() !== ""
        ? faceFillText.trim()
        : tCapsuleMachineFaceLabel("buttons.lottieFill", "FILL");
    const serveFace =
      typeof faceServeText === "string" && faceServeText.trim() !== ""
        ? faceServeText.trim()
        : tCapsuleMachineFaceLabel("buttons.lottieServe", "SERVE");
    applyCapsuleMachineFaceLabels(data, fillFace, serveFace);

    Object.entries(resolvedInitialEffects).forEach(([effectName, value]) => {
      setEffectValueByName(data, effectLayerName, effectName, value);
    });

    syncDropNewFromQueueHead(data, effectLayerName, resolvedServeColorOrder[0] ?? 1);
    nextServeSequenceIndexRef.current = 0;
    drawsSinceFillRef.current = 0;
    prefillAppliedRef.current = false;
    setDrawsSinceFillCount(0);

    if (prefillMachine) {
      setEffectValueByName(data, effectLayerName, mergedActions.servesEffectName, 1);
    }

    setWorkingData(data);
    setEffectValues(resolvedInitialEffects);
    refreshControls(data);
    setReloadKey((key) => key + 1);
  }, [
    animationData,
    assetBasePath,
    effectLayerName,
    mergedActions.servesEffectName,
    prefillMachine,
    resolvedInitialEffects,
    resolvedServeColorOrder,
    refreshControls,
    i18nLocale,
    faceFillText,
    faceServeText,
  ]);

  useEffect(() => {
    if (!workingData || !lottieApi || !lottieContainerRef.current) return undefined;

    clearPlaybackGuards();
    if (animRef.current) {
      animRef.current.destroy();
      animRef.current = null;
    }

    const animation = lottieApi.loadAnimation({
      container: lottieContainerRef.current,
      renderer,
      loop,
      autoplay,
      animationData: workingData,
    });

    animRef.current = animation;
    onReady?.(animation);

    const pendingScene = pendingPlaySceneAfterLoadRef.current;
    let pendingSceneDomHandler = null;
    if (pendingScene != null) {
      pendingPlaySceneAfterLoadRef.current = null;
      const runPendingScene = () => {
        playSceneLatestRef.current(pendingScene);
      };
      if (animation.isLoaded) {
        requestAnimationFrame(runPendingScene);
      } else {
        pendingSceneDomHandler = runPendingScene;
        animation.addEventListener("DOMLoaded", pendingSceneDomHandler, { once: true });
      }
    }

    const fillSceneForPrefill = scenes[mergedActions.fillSceneIndex];
    let prefillDomHandler = null;
    if (
      prefillMachine
      && !prefillAppliedRef.current
      && pendingScene == null
      && fillSceneForPrefill
    ) {
      prefillAppliedRef.current = true;
      const endF = fillSceneForPrefill.endFrame;
      const applyPrefillPose = () => {
        if (animRef.current !== animation) return;
        try {
          animation.goToAndStop(endF, true);
        } catch (_err) {
          /* ignore */
        }
      };
      if (animation.isLoaded) {
        requestAnimationFrame(applyPrefillPose);
      } else {
        prefillDomHandler = applyPrefillPose;
        animation.addEventListener("DOMLoaded", prefillDomHandler, { once: true });
      }
    }

    return () => {
      clearPlaybackGuards();
      if (prefillDomHandler) {
        try {
          if (animation && typeof animation.removeEventListener === "function") {
            animation.removeEventListener("DOMLoaded", prefillDomHandler);
          }
        } catch (_err) {
          /* destroyed AnimationItem */
        }
      }
      if (pendingSceneDomHandler) {
        try {
          if (animation && typeof animation.removeEventListener === "function") {
            animation.removeEventListener("DOMLoaded", pendingSceneDomHandler);
          }
        } catch (_err) {
          /* same as attachLottieSvgActionClicks: destroyed AnimationItem */
        }
      }
      try {
        animation.destroy();
      } catch (_err) {
        /* ignore */
      }
      if (animRef.current === animation) {
        animRef.current = null;
      }
    };
  }, [
    autoplay,
    clearPlaybackGuards,
    loop,
    lottieApi,
    mergedActions.fillSceneIndex,
    onReady,
    prefillMachine,
    reloadKey,
    renderer,
    scenes,
    workingData,
  ]);

  const reloadAnimation = useCallback(() => {
    clearPlaybackGuards();
    setReloadKey((key) => key + 1);
  }, [clearPlaybackGuards]);

  const setNamedEffect = useCallback((effectName, value, options = {}) => {
    if (!workingData) return false;

    const controls = analyseLayerEffects(workingData, effectLayerName, []);
    const target = controls.find(
      (control) => normalizeEffectName(control.effectName) === normalizeEffectName(effectName),
    );
    if (!target) return false;

    const didSet = setEffectValue(workingData, target.path, value);
    if (!didSet) return false;

    setEffectValues((current) => ({ ...current, [target.effectName]: value }));
    refreshControls(workingData);
    onEffectChange?.(target.effectName, value);

    if (options.reload !== false) {
      reloadAnimation();
    }

    return true;
  }, [effectLayerName, onEffectChange, refreshControls, reloadAnimation, workingData]);

  const stop = useCallback(() => {
    clearPlaybackGuards();
    animRef.current?.stop();
    setActiveSceneIndex(null);
  }, [clearPlaybackGuards]);

  const playScene = useCallback((sceneOrIndex) => {
    const animation = animRef.current;
    const scene = typeof sceneOrIndex === "number" ? scenes[sceneOrIndex] : sceneOrIndex;
    if (!animation || !scene) return false;

    if (animation.isPlaying) animation.stop();
    clearPlaybackGuards();

    const frameStart = scene.startFrame;
    const frameEnd = scene.endFrame;
    const holdFrame = scene.endFrame;
    let isPlaying = true;

    currentSceneRef.current = scene;
    setActiveSceneIndex(scene.index);
    onSceneChange?.(scene);

    animation.setLoop(false);

    if (scene.isLoop) {
      const segment = [[frameStart, frameEnd]];
      const loopHandler = () => {
        const currentFrame = Math.round(animation.currentFrame);
        if (currentFrame >= frameEnd) {
          animation.removeEventListener("enterFrame", loopHandler);
          enterFrameHandlerRef.current = null;
          animation.playSegments(segment, true);
        }
      };

      enterFrameHandlerRef.current = loopHandler;
      animation.addEventListener("enterFrame", loopHandler);
      animation.goToAndStop(frameStart, true);
      animation.playSegments(segment, true);
      return true;
    }

    const completeScene = () => {
      if (!isPlaying) return;
      isPlaying = false;
      if (animation.isPlaying) animation.stop();
      animation.goToAndStop(holdFrame, true);
      clearPlaybackGuards();
      onSceneComplete?.(scene);
    };

    const frameHandler = () => {
      if (!isPlaying || !animation) return;
      if (Math.round(animation.currentFrame) >= frameEnd) {
        completeScene();
      }
    };

    enterFrameHandlerRef.current = frameHandler;
    animation.addEventListener("enterFrame", frameHandler);
    animation.goToAndStop(frameStart, true);

    window.setTimeout(() => {
      if (!animRef.current || animRef.current !== animation || !isPlaying) return;
      animation.goToAndStop(frameStart, true);
      animation.play();
    }, 50);

    intervalRef.current = window.setInterval(() => {
      if (!animRef.current || animRef.current !== animation || !isPlaying) {
        clearPlaybackGuards();
        return;
      }

      if (Math.round(animation.currentFrame) >= frameEnd) {
        completeScene();
      }
    }, 16);

    return true;
  }, [clearPlaybackGuards, onSceneChange, onSceneComplete, scenes]);

  playSceneLatestRef.current = playScene;

  const fill = useCallback(() => {
    if (disableFillAction) return false;
    nextServeSequenceIndexRef.current = 0;
    drawsSinceFillRef.current = 0;
    setDrawsSinceFillCount(0);
    onFill?.({ drawCount: 0 });
    if (!workingData) {
      setNamedEffect(mergedActions.servesEffectName, 1, { reload: false });
      return playScene(mergedActions.fillSceneIndex);
    }
    const headN = resolvedServeColorOrder[0] ?? 1;
    const head = getEffectValueByName(workingData, effectLayerName, `color${headN}`);
    if (Array.isArray(head) && head.length >= 3) {
      setEffectValueByName(workingData, effectLayerName, "drop new", head.slice(0, 4));
    }
    setEffectValueByName(workingData, effectLayerName, mergedActions.servesEffectName, 1);
    setEffectValues((c) => ({
      ...c,
      [mergedActions.servesEffectName]: 1,
      "drop new": getEffectValueByName(workingData, effectLayerName, "drop new"),
    }));
    pendingPlaySceneAfterLoadRef.current = mergedActions.fillSceneIndex;
    reloadAnimation();
    return true;
  }, [
    effectLayerName,
    mergedActions.fillSceneIndex,
    mergedActions.servesEffectName,
    playScene,
    reloadAnimation,
    resolvedServeColorOrder,
    setNamedEffect,
    workingData,
    disableFillAction,
    onFill,
  ]);

  const serve = useCallback(() => {
    if (disableServeAction) {
      return false;
    }
    if (resolvedMaxDraws != null && drawsSinceFillRef.current >= resolvedMaxDraws) {
      return false;
    }

    let needsReload = false;
    const seq = resolvedServeColorOrder;
    const hi = nextServeSequenceIndexRef.current % seq.length;
    const servedColorNumber = seq[hi] ?? 1;
    const currentServesValue = Number(
      getEffectValueByName(workingData, effectLayerName, mergedActions.servesEffectName)
      ?? effectValues[mergedActions.servesEffectName]
      ?? 1,
    );
    const nextServesValue = currentServesValue + 1;
    if (workingData) {
      const rgba = getEffectValueByName(workingData, effectLayerName, `color${servedColorNumber}`);
      if (Array.isArray(rgba) && rgba.length >= 3) {
        nextServeSequenceIndexRef.current = hi + 1;
        const prevNew = getEffectValueByName(workingData, effectLayerName, "drop new");
        if (Array.isArray(prevNew) && prevNew.length >= 3) {
          setEffectValueByName(workingData, effectLayerName, "drop old", prevNew.slice(0, 4));
        }
        setEffectValueByName(workingData, effectLayerName, "drop new", rgba.slice(0, 4));
        setEffectValueByName(workingData, effectLayerName, mergedActions.servesEffectName, nextServesValue);
        setEffectValues((c) => ({
          ...c,
          [mergedActions.servesEffectName]: nextServesValue,
          "drop old": getEffectValueByName(workingData, effectLayerName, "drop old"),
          "drop new": getEffectValueByName(workingData, effectLayerName, "drop new"),
        }));
        needsReload = true;
      }
    }
    const sceneIndex = currentServesValue === 1
      ? mergedActions.firstServeSceneIndex
      : mergedActions.repeatServeSceneIndex;

    if (needsReload) {
      pendingPlaySceneAfterLoadRef.current = sceneIndex;
      reloadAnimation();
      drawsSinceFillRef.current += 1;
      setDrawsSinceFillCount(drawsSinceFillRef.current);
      onServe?.({
        drawCount: drawsSinceFillRef.current,
        colorNumber: servedColorNumber,
      });
      if (serveBroadcastId && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("capsuleServeInvoked", { detail: { machineId: serveBroadcastId } }),
        );
      }
      return true;
    }
    const played = playScene(sceneIndex);
    if (played) {
      drawsSinceFillRef.current += 1;
      setDrawsSinceFillCount(drawsSinceFillRef.current);
      onServe?.({
        drawCount: drawsSinceFillRef.current,
        colorNumber: servedColorNumber,
      });
      if (serveBroadcastId && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("capsuleServeInvoked", { detail: { machineId: serveBroadcastId } }),
        );
      }
    }
    return played;
  }, [
    disableServeAction,
    effectLayerName,
    effectValues,
    mergedActions.firstServeSceneIndex,
    mergedActions.repeatServeSceneIndex,
    mergedActions.servesEffectName,
    onServe,
    playScene,
    reloadAnimation,
    resolvedMaxDraws,
    resolvedServeColorOrder,
    serveBroadcastId,
    workingData,
  ]);

  const isFillActionDisabled = disableFillAction;
  const isServeActionDisabled = disableServeAction
    || (resolvedMaxDraws != null && drawsSinceFillCount >= resolvedMaxDraws);

  useImperativeHandle(ref, () => ({
    getAnimation: () => animRef.current,
    getAnimationData: () => workingData,
    getScenes: () => scenes,
    getEffects: () => effectControls,
    playScene,
    setEffect: setNamedEffect,
    fill,
    serve,
    isFillDisabled: () => isFillActionDisabled,
    isServeDisabled: () => isServeActionDisabled,
    stop,
  }), [
    effectControls,
    fill,
    isFillActionDisabled,
    isServeActionDisabled,
    playScene,
    scenes,
    serve,
    setNamedEffect,
    stop,
    workingData,
  ]);

  const handleControlChange = useCallback((control, rawValue) => {
    const value = control.controlType === "slider" ? Number(rawValue) : fromHex(rawValue);
    const previous = effectValues[control.effectName];

    if (control.controlType === "color" && arraysEqual(previous, value)) return;
    if (control.controlType === "slider" && previous === value) return;

    setNamedEffect(control.effectName, value);
  }, [effectValues, setNamedEffect]);

  const wrapperStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background: "#fff",
    ...style,
  };

  const panelChildren = [];

  if (showControls) {
    const controlChildren = [
      React.createElement(
        "h3",
        { key: "heading", style: { margin: "0 0 10px", fontSize: 14 } },
        "Machine effects",
      ),
    ];

    if (!effectControls.length) {
      controlChildren.push(
        React.createElement(
          "p",
          { key: "empty" },
          `No effect controls found on layer "${effectLayerName}".`,
        ),
      );
    }

    effectControls.forEach((control) => {
      const value = effectValues[control.effectName] ?? control.value;

      if (control.controlType === "slider") {
        const config = {
          ...DEFAULT_SLIDER_CONFIG,
          ...(sliderConfig[control.effectName] || {}),
        };

        controlChildren.push(
          React.createElement(
            "label",
            {
              key: control.effectName,
              style: { display: "block", marginBottom: 10, color: "#555" },
            },
            React.createElement(
              "span",
              { style: { display: "block", marginBottom: 2 } },
              control.effectName,
            ),
            React.createElement("input", {
              type: "range",
              min: config.min,
              max: config.max,
              step: config.step,
              value: Number(value),
              onChange: (event) => handleControlChange(control, event.target.value),
              style: { width: "100%" },
            }),
            React.createElement(
              "span",
              { style: { fontSize: 11, color: "#888" } },
              Number(value),
            ),
          ),
        );
        return;
      }

      controlChildren.push(
        React.createElement(
          "label",
          {
            key: control.effectName,
            style: { display: "block", marginBottom: 10, color: "#555" },
          },
          React.createElement(
            "span",
            { style: { display: "block", marginBottom: 2 } },
            control.effectName,
          ),
          React.createElement("input", {
            type: "color",
            value: toHex(value),
            onChange: (event) => handleControlChange(control, event.target.value),
            style: {
              width: "100%",
              height: 28,
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: 4,
            },
          }),
        ),
      );
    });

    panelChildren.push(
      React.createElement("section", { key: "controls" }, controlChildren),
    );
  }

  if (showActions) {
    panelChildren.push(
      React.createElement(
        "section",
        {
          key: "actions",
          style: { marginTop: 12, paddingTop: 12, borderTop: "1px solid #eee" },
        },
        React.createElement(
          "h3",
          { style: { margin: "0 0 8px", fontSize: 14 } },
          "Actions",
        ),
        React.createElement(
          ButtonRow,
          null,
          React.createElement(
            PanelButton,
            {
              onClick: () => {
                playCapsuleActionClickSound();
                fill();
              },
              disabled: isFillActionDisabled,
            },
            tCapsuleMachineFaceLabel("buttons.machineFill", "Fill"),
          ),
          React.createElement(
            PanelButton,
            {
              onClick: () => {
                playCapsuleActionClickSound();
                serve();
              },
              disabled: isServeActionDisabled,
            },
            tCapsuleMachineFaceLabel("buttons.machineServe", "Serve"),
          ),
        ),
      ),
    );
  }

  if (showScenes) {
    panelChildren.push(
      React.createElement(
        "section",
        {
          key: "scenes",
          style: { marginTop: 12, paddingTop: 12, borderTop: "1px solid #eee" },
        },
        React.createElement(
          "h3",
          { style: { margin: "0 0 8px", fontSize: 14 } },
          "Scenes",
        ),
        React.createElement(
          ButtonRow,
          null,
          scenes.map((scene) => React.createElement(
            PanelButton,
            {
              key: scene.index,
              active: activeSceneIndex === scene.index,
              onClick: () => playScene(scene),
            },
            `${scene.label} (${Math.round(scene.startFrame)}-${Math.round(scene.endFrame)})`,
            scene.isLoop ? " [loop]" : "",
          )),
        ),
      ),
    );
  }

  const children = [
    React.createElement("div", {
      key: "lottie",
      ref: lottieContainerRef,
      style: {
        width: "100%",
        height: "100%",
        display: "block",
        overflow: "hidden",
        transform: "translate3d(0, 0, 0)",
        textAlign: "center",
      },
    }),
  ];

  if (showControls || showActions || showScenes) {
    children.push(
      React.createElement(
        "div",
        {
          key: "panel",
          style: { ...DEFAULT_PANEL_STYLE, ...controlPanelStyle },
        },
        panelChildren,
      ),
    );
  }

  if (!lottieApi) {
    children.push(
      React.createElement(
        "div",
        {
          key: "missing-lottie",
          style: {
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: 24,
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          },
        },
        "Provide a lottie-web instance through the lottie prop or load lottie.min.js globally.",
      ),
    );
  }

  return React.createElement(
    "div",
    { ref: wrapperRef, className, style: wrapperStyle },
    children,
  );
});

function ButtonRow({ children }) {
  return React.createElement(
    "div",
    { style: { display: "flex", flexWrap: "wrap", gap: 6 } },
    children,
  );
}

function PanelButton({ active = false, children, ...props }) {
  return React.createElement(
    "button",
    {
      type: "button",
      ...props,
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6px 12px",
        fontSize: 12,
        lineHeight: 1,
        border: `1px solid ${active ? "#333" : "#ccc"}`,
        borderRadius: 4,
        background: active ? "#333" : "#f5f5f5",
        color: active ? "#fff" : "#111",
        cursor: "pointer",
      },
    },
    children,
  );
}

/**
 * Page shell: optional fetch from `animationPath`, same chrome props as TeacherNote-style boxes.
 */
const CapsuleMachineLottiePagePanel = memo(function CapsuleMachineLottiePagePanel(props) {
  const {
    id,
    position,
    processedStyles,
    elementZIndex,
    animationPath,
    animationData: inlineAnimationData,
    assetBasePath,
    backgroundColor,
    border,
    borderRadius,
    padding,
    text: _text,
    textColor: _textColor,
    fontSize: _fontSize,
    allowHtml: _allowHtml,
    showControls = false,
    showActions = true,
    showScenes = false,
    disableFillAction = false,
    disableServeAction = false,
    effectLayerName,
    lottieStyle,
    autoplay,
    loop,
    hiddenEffects,
    initialEffects,
    color1,
    color2,
    color3,
    color4,
    serveColorOrder,
    prefillMachine = false,
    maxDraws,
    sliderConfig,
    sceneLabels,
    loopScenes,
    actions,
    onReady,
    onEffectChange,
    onSceneChange,
    onSceneComplete,
    onServe,
    onFill,
    className,
    controlPanelStyle,
    renderer,
    showImageActionOverlays,
    lottieTouchTargets,
    playClickSoundOnLottieActions = true,
    autoLottieTouchTargets = true,
    useSvgActionClicks = true,
    svgClickDataNames,
    pillPathMarkers,
    invertPillFillServeOrder = false,
    lottieScale = 1,
    faceFillText,
    faceServeText,
  } = props;

  // Always show overlay hitboxes for Serve/Fill to guarantee clickability
  const useImageActionOverlays = true;

  const lottieMachineRef = useRef(null);
  const svgClickDetachRef = useRef(() => {});

  const [data, setData] = useState(inlineAnimationData || null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(Boolean(!inlineAnimationData && animationPath));

  useEffect(() => {
    if (inlineAnimationData) {
      setData(inlineAnimationData);
      setLoading(false);
      setErr(null);
      return undefined;
    }
    if (!animationPath) {
      setData(null);
      setLoading(false);
      setErr("Set animationPath or animationData.");
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setErr(null);
    fetch(animationPath)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText || String(res.status));
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setErr(e && e.message ? e.message : String(e));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [animationPath, inlineAnimationData]);

  const playOverlayClickSound = useCallback(() => {
    if (!playClickSoundOnLottieActions) return;
    playCapsuleActionClickSound();
  }, [playClickSoundOnLottieActions]);

  useEffect(() => {
    if (!id) return undefined;
    const onProxyServe = (event) => {
      if (event.detail?.machineId !== id) return;
      const api = lottieMachineRef.current;
      if (!api || api.isServeDisabled?.() === true) return;
      playOverlayClickSound();
      api.serve?.();
    };
    window.addEventListener("proxyCapsuleServeRequest", onProxyServe);
    return () => {
      window.removeEventListener("proxyCapsuleServeRequest", onProxyServe);
    };
  }, [id, playOverlayClickSound]);

  const handlePanelLottieReady = useCallback(
    (anim) => {
      svgClickDetachRef.current();
      svgClickDetachRef.current = () => {};
      if (useSvgActionClicks && anim) {
        const names = svgClickDataNames || {};
        svgClickDetachRef.current = attachLottieSvgActionClicks(anim, {
          fillNames: names.fill != null ? names.fill : ["FILL", "refill"],
          serveNames: names.serve != null ? names.serve : ["SERVE", "serve"],
          playSound: playOverlayClickSound,
          getMachineApi: () => lottieMachineRef.current,
          pillPathMarkers: (pillPathMarkers && pillPathMarkers.length)
            ? pillPathMarkers
            : ["85,-12.518", "12.518999"],
          invertPillFillServeOrder,
          disableFillAction,
        });
      }
      if (typeof onReady === "function") {
        onReady(anim);
      }
    },
    [
      useSvgActionClicks,
      svgClickDataNames,
      onReady,
      playOverlayClickSound,
      pillPathMarkers,
      invertPillFillServeOrder,
      disableFillAction,
    ],
  );

  useEffect(() => () => {
    svgClickDetachRef.current();
    svgClickDetachRef.current = () => {};
  }, []);

  const autoTouchFromJson = useMemo(() => {
    if (!autoLottieTouchTargets || !data) return null;
    return buildAutoTouchTargetsFromAnimationData(data);
  }, [autoLottieTouchTargets, data]);

  const touchTargets = useMemo(() => {
    const base = autoTouchFromJson || DEFAULT_LOTTIE_TOUCH_TARGETS;
    const ov = lottieTouchTargets || {};
    return {
      fill: { ...base.fill, ...(ov.fill || {}) },
      serve: { ...base.serve, ...(ov.serve || {}) },
    };
  }, [autoTouchFromJson, lottieTouchTargets]);

  const nonCssProcessedKeys = new Set([
    "componentType",
    "animationPath",
    "animationData",
    "assetBasePath",
    "text",
    "textColor",
    "fontSize",
    "allowHtml",
    "showControls",
    "showActions",
    "showScenes",
    "disableFillAction",
    "disableServeAction",
    "autoplay",
    "loop",
    "effectLayerName",
    "hiddenEffects",
    "initialEffects",
    "color1",
    "color2",
    "color3",
    "color4",
    "serveColorOrder",
    "prefillMachine",
    "maxDraws",
    "sliderConfig",
    "sceneLabels",
    "loopScenes",
    "actions",
    "lottieStyle",
    "onReady",
    "onEffectChange",
    "onSceneChange",
    "onSceneComplete",
    "onServe",
    "onFill",
    "className",
    "controlPanelStyle",
    "renderer",
    "processedStyles",
    "id",
    "name",
    "elementName",
    "showImageActionOverlays",
    "lottieTouchTargets",
    "playClickSoundOnLottieActions",
    "autoLottieTouchTargets",
    "useSvgActionClicks",
    "svgClickDataNames",
    "pillPathMarkers",
    "invertPillFillServeOrder",
    "lottieScale",
    "faceFillText",
    "faceServeText",
  ]);
  const processedCssOnly = {};
  if (processedStyles && typeof processedStyles === "object") {
    Object.keys(processedStyles).forEach((key) => {
      if (!nonCssProcessedKeys.has(key)) {
        processedCssOnly[key] = processedStyles[key];
      }
    });
  }

  const scale = typeof lottieScale === "number" && lottieScale > 0 ? lottieScale : 1;

  const outerStyle = {
    ...(position?.css || {}),
    ...processedCssOnly,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    minWidth: 0,
    overflow: scale > 1 ? "visible" : "hidden",
    backgroundColor: backgroundColor || "rgba(0,0,0,0.7)",
    border: border || "2px solid #70ACC7",
    borderRadius: borderRadius || "15gc",
    padding: padding || "15gc",
    zIndex: elementZIndex != null && elementZIndex !== "" ? elementZIndex : undefined,
  };

  const innerStyle = {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...(scale > 1 ? { overflow: "visible" } : {}),
  };

  if (loading) {
    return React.createElement(
      "div",
      { style: outerStyle },
      React.createElement(
        "div",
        { style: { color: "#fff", textAlign: "center", fontFamily: "system-ui, sans-serif" } },
        "Loading…",
      ),
    );
  }

  if (err || !data) {
    return React.createElement(
      "div",
      { style: outerStyle },
      React.createElement(
        "div",
        {
          style: {
            color: "#fff",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
          },
        },
        err || "No animation data.",
      ),
    );
  }

  const faceFillLabel =
    typeof faceFillText === "string" && faceFillText.trim() !== ""
      ? faceFillText.trim()
      : tCapsuleMachineFaceLabel("buttons.lottieFill", "FILL");
  const faceServeLabel =
    typeof faceServeText === "string" && faceServeText.trim() !== ""
      ? faceServeText.trim()
      : tCapsuleMachineFaceLabel("buttons.lottieServe", "SERVE");

  const overlayLayer = useImageActionOverlays
    ? React.createElement(
        "div",
        {
          key: "lottie-action-overlays",
          style: {
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          },
        },
        ["fill", "serve"].map((action) => {
          const box = touchTargets[action];
          if (!box || !box.width) return null;
          return React.createElement(
            "button",
            {
              type: "button",
              key: `lottie-hit-${action}`,
              "aria-label": action === "fill" ? faceFillLabel : faceServeLabel,
              onClick: () => {
                playOverlayClickSound();
                const api = lottieMachineRef.current;
                if (!api) return;
                const isDisabled = action === "fill"
                  ? api.isFillDisabled?.() === true
                  : api.isServeDisabled?.() === true;
                if (isDisabled) return;
                if (action === "fill") api.fill?.();
                else api.serve?.();
              },
              disabled: action === "fill"
                ? lottieMachineRef.current?.isFillDisabled?.() === true
                : lottieMachineRef.current?.isServeDisabled?.() === true,
              style: {
                position: "absolute",
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
                border: "none",
                margin: 0,
                padding: 0,
                cursor: "pointer",
                background: "transparent",
                pointerEvents: "auto",
                borderRadius: 8,
              },
            },
          );
        }),
      )
    : null;

  const cw = data.w || 1920;
  const ch = data.h || 1080;
  const aspectBoxStyle = {
    position: "relative",
    maxWidth: "100%",
    maxHeight: "100%",
    height: "100%",
    width: "auto",
    aspectRatio: `${cw} / ${ch}`,
    ...(scale !== 1
      ? {
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }
      : {}),
  };

  return React.createElement(
    "div",
    { style: outerStyle },
    React.createElement(
      "div",
      { style: innerStyle },
      React.createElement(
        "div",
        { style: aspectBoxStyle },
        React.createElement(CapsuleMachineLottie, {
          ref: lottieMachineRef,
          animationData: data,
          assetBasePath,
          effectLayerName: effectLayerName || "Machine",
          showControls,
          showActions,
          showScenes,
          disableFillAction,
          disableServeAction,
          serveBroadcastId: id || undefined,
          style: { background: "transparent", ...lottieStyle },
          autoplay,
          loop,
          hiddenEffects,
          initialEffects,
          color1,
          color2,
          color3,
          color4,
          serveColorOrder,
          prefillMachine,
          maxDraws,
          sliderConfig,
          sceneLabels,
          loopScenes,
          actions,
          onReady: handlePanelLottieReady,
          onEffectChange,
          onSceneChange,
          onSceneComplete,
          onServe,
          onFill,
          className,
          controlPanelStyle,
          renderer,
          faceFillText,
          faceServeText,
        }),
        overlayLayer,
      ),
    ),
  );
});

const CapsuleServeTrackerComponent = memo(function CapsuleServeTrackerComponent(props) {
  const {
    position,
    width,
    processedStyles,
    elementZIndex,
    pageNumber,
    /** When set, only events whose detail.serveChannel matches are applied (same page, multiple machines). */
    serveChannel = null,
    totalSlots = 10,
    prefilledServeOrder = null,
    colorMap = {},
    fillDelayMs = 500,
    boxGap = "10gc",
    boxBorderWidth = "1.5gc",
    boxBorderRadius = "8gc",
    boxBorderStyleEmpty = "dashed",
    boxBorderStyleFilled = "solid",
    boxPadding = "6gc 2gc 4gc",
    boxFontSize = "10gc",
    pillSize = "14gc",
    hideNumberWhenFilled = true,
    emptyBorderColor = "rgba(255, 255, 255, 0.65)",
    filledBorderColor = "rgba(255, 255, 255, 0.95)",
    numberColor = "#f2f2f2",
    capsuleStrokeColor = "rgba(255, 255, 255, 0.2)",
    slotBackgroundColor = "rgba(16, 54, 78, 0.45)",
  } = props;

  const slotCount = Math.max(1, Math.floor(Number(totalSlots)) || 10);
  const prefilledServeOrderKey = Array.isArray(prefilledServeOrder)
    ? prefilledServeOrder.join(",")
    : "";

  const buildServedSlotsFromOrder = useCallback((serveOrder) => {
    const normalizedOrder = Array.isArray(serveOrder) ? serveOrder : [];
    return Array.from({ length: slotCount }, (_, index) => {
      const colorNumber = Number(normalizedOrder[index]);
      return colorMap[colorNumber] || null;
    });
  }, [colorMap, slotCount]);

  const [servedSlots, setServedSlots] = useState(() => buildServedSlotsFromOrder(prefilledServeOrder));
  const fillTimeoutsRef = useRef([]);

  const processGcProperty = useCallback((value, propertyType) => {
    if (
      value && typeof value === "string" && value.includes("gc")
      && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty
    ) {
      return window.GridCellFontUtils.processGcProperty(value, propertyType);
    }
    return value;
  }, []);

  const processedBoxGap = processGcProperty(boxGap, "gap");
  const processedBoxBorderWidth = processGcProperty(boxBorderWidth, "borderWidth");
  const processedBoxBorderRadius = processGcProperty(boxBorderRadius, "borderRadius");
  const processedBoxFontSize = processGcProperty(boxFontSize, "fontSize");
  const processedPillSize = processGcProperty(pillSize, "width");
  const processedBoxPadding = useMemo(() => {
    if (typeof boxPadding !== "string") return boxPadding;
    return boxPadding
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => processGcProperty(part, "padding"))
      .join(" ");
  }, [boxPadding, processGcProperty]);

  useEffect(() => {
    setServedSlots(buildServedSlotsFromOrder(prefilledServeOrder));
  }, [buildServedSlotsFromOrder, pageNumber, prefilledServeOrderKey, slotCount]);

  useEffect(() => () => {
    fillTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    fillTimeoutsRef.current = [];
  }, []);

  useEffect(() => {
    const handleServeProgress = (event) => {
      if (event.detail?.pageNumber !== pageNumber) return;
      if (
        serveChannel != null &&
        serveChannel !== "" &&
        event.detail?.serveChannel !== serveChannel
      ) {
        return;
      }
      const drawCount = Number(event.detail?.drawCount);
      if (!Number.isFinite(drawCount) || drawCount < 1 || drawCount > slotCount) return;
      const colorNumber = Number(event.detail?.colorNumber);
      const capsuleColor = colorMap[colorNumber] || "#ffffff";
      const timeoutId = window.setTimeout(() => {
        setServedSlots((current) => {
          const next = current.slice();
          next[drawCount - 1] = capsuleColor;
          return next;
        });
        fillTimeoutsRef.current = fillTimeoutsRef.current.filter((id) => id !== timeoutId);
      }, Math.max(0, Number(fillDelayMs) || 0));
      fillTimeoutsRef.current.push(timeoutId);
    };

    const handleServeReset = (event) => {
      if (event.detail?.pageNumber !== pageNumber) return;
      if (
        serveChannel != null &&
        serveChannel !== "" &&
        event.detail?.serveChannel !== serveChannel
      ) {
        return;
      }
      fillTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      fillTimeoutsRef.current = [];
      setServedSlots(buildServedSlotsFromOrder(prefilledServeOrder));
    };

    window.addEventListener("capsuleServeProgress", handleServeProgress);
    window.addEventListener("capsuleServeReset", handleServeReset);

    return () => {
      window.removeEventListener("capsuleServeProgress", handleServeProgress);
      window.removeEventListener("capsuleServeReset", handleServeReset);
    };
  }, [
    buildServedSlotsFromOrder,
    colorMap,
    fillDelayMs,
    pageNumber,
    prefilledServeOrderKey,
    serveChannel,
    slotCount,
  ]);

  const nonCssProcessedKeys = new Set([
    "componentType",
    "processedStyles",
    "pageNumber",
    "serveChannel",
    "totalSlots",
    "prefilledServeOrder",
    "colorMap",
    "fillDelayMs",
    "boxGap",
    "boxBorderWidth",
    "boxBorderRadius",
    "boxBorderStyleEmpty",
    "boxBorderStyleFilled",
    "boxPadding",
    "boxFontSize",
    "pillSize",
    "hideNumberWhenFilled",
    "emptyBorderColor",
    "filledBorderColor",
    "numberColor",
    "capsuleStrokeColor",
    "slotBackgroundColor",
    "id",
    "name",
    "elementName",
  ]);
  const processedCssOnly = {};
  if (processedStyles && typeof processedStyles === "object") {
    Object.keys(processedStyles).forEach((key) => {
      if (!nonCssProcessedKeys.has(key)) {
        processedCssOnly[key] = processedStyles[key];
      }
    });
  }

  const outerStyle = {
    ...(position?.css || {}),
    ...processedCssOnly,
    boxSizing: "border-box",
    display: "flex",
    width: width,
    gap: processedBoxGap,
    alignItems: "stretch",
    justifyContent: "center",
    zIndex: elementZIndex != null && elementZIndex !== "" ? elementZIndex : undefined,
  };

  return React.createElement(
    "div",
    { style: outerStyle },
    Array.from({ length: slotCount }, (_, index) => {
      const capsuleColor = servedSlots[index];
      const isFilled = Boolean(capsuleColor);
      return React.createElement(
        "div",
        {
          key: `serve-slot-${index + 1}`,
          style: {
            flex: 1,
            minWidth: 0,
            maxWidth: `calc((100% - (${slotCount - 1} * ${processedBoxGap})) / ${slotCount})`,
            border: `${processedBoxBorderWidth} ${isFilled ? boxBorderStyleFilled : boxBorderStyleEmpty} ${isFilled ? filledBorderColor : emptyBorderColor}`,
            borderRadius: processedBoxBorderRadius,
            backgroundColor: slotBackgroundColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: processedBoxPadding,
            gap: processGcProperty("2gc", "gap"),
          },
        },
        React.createElement("div", {
          style: {
            width: processedPillSize,
            height: processedPillSize,
            borderRadius: "50%",
            backgroundColor: capsuleColor || "transparent",
            border: capsuleColor ? `${processGcProperty("1gc", "borderWidth")} solid ${capsuleStrokeColor}` : "none",
            boxShadow: capsuleColor
              ? "inset -4px -6px 0 rgba(0, 0, 0, 0.18), inset 4px 6px 0 rgba(255, 255, 255, 0.08)"
              : "none",
            position: "relative",
          },
        },
        capsuleColor
          ? React.createElement("div", {
            style: {
              position: "absolute",
              top: processGcProperty("2gc", "top") || "12%",
              left: processGcProperty("2gc", "left") || "14%",
              width: `calc(${processedPillSize} * 0.28)`,
              height: `calc(${processedPillSize} * 0.28)`,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.38)",
              pointerEvents: "none",
            },
          })
          : null,
        ),
        React.createElement(
          "div",
          {
            style: {
              color: numberColor,
              fontSize: processedBoxFontSize,
              fontStyle: "italic",
              lineHeight: 1,
              width: "100%",
              display: hideNumberWhenFilled && isFilled ? "none" : "flex",
              justifyContent: "center",
            },
          },
          String(index + 1),
        ),
      );
    }),
  );
});

window.CapsuleMachineLottie = CapsuleMachineLottie;
window.CapsuleMachineLottiePagePanel = CapsuleMachineLottiePagePanel;
window.CapsuleServeTrackerComponent = CapsuleServeTrackerComponent;
window.CapsuleMachineLottieUtils = {
  analyseLayerEffects,
  getScenesFromMarkers,
  setEffectValueByName,
  getEffectValueByName,
  normalizeServeColorOrder,
  effectiveMaxDraws,
  attachLottieSvgActionClicks,
};
