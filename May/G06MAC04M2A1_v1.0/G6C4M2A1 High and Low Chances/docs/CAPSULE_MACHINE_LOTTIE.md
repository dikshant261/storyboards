# Capsule machine (Lottie) components

This project embeds a **capsule toy machine** as a Lottie animation with **Fill** and **Serve** interactions. Two React surfaces are exposed globally (no bundler required):

| Global | Role |
|--------|------|
| `window.CapsuleMachineLottie` | Core Lottie wrapper: effects, scenes, Fill/Serve. |
| `window.CapsuleMachineLottiePagePanel` | Layout shell for grid pages: panel chrome, optional fetch, SVG hit targets, scaling. |
| `window.CapsuleMachineLottieUtils` | Pure helpers for inspection and SVG wiring. |

**Runtime requirements**

- Global **`React`** (from `react.development.js` / `react-dom` as used by the applet).
- Global **`lottie`** or **`bodymovin`** (`js/lottie.min.js`), loaded before `CapsuleMachineLottie.js`.
- Animation JSON: typically `js/animData.js` assigning `window.capsuleMachineAnimationData`.

Script order in `index.html` should include `animData.js` and `CapsuleMachineLottie.js` before `elements-registry.js` so the registry can render `CapsuleMachineLottiePagePanel`.

---

## How the capsule Lottie is wired (Bodymovin)

### Machine layer (`effectLayerName`, default `"Machine"`)

After Effects **expression controls** on this layer drive the lesson:

| Effect (typical names) | Type | Role |
|------------------------|------|------|
| `serves` | Slider | Filled vs empty state; Fill sets it to `1`. Serve scenes depend on it. |
| `step` | Slider | Often expression-driven; usually hidden from generated UI (`hiddenEffects`). |
| `drop old` / `drop new` | Color | Used by **falling drop** vector layers via expressions (`thisComp.layer('Machine').effect('drop new')('Color')`, etc.). |
| `color1` … `color4` | Color | Used by **tube / slot** artwork; these are the author-facing “capsule colors”. |

**Important:** Tube art reads **`color1`–`color4`**. The **falling pill** reads **`drop new`** / **`drop old`**. The component copies the active queue color into `drop new` (and shifts `drop old`) before each Serve, then **reloads** the animation instance so lottie-web picks up effect changes (in-place JSON edits alone are not enough for expressions).

### Scenes (markers)

Scene segments come from Lottie **`markers`**. Defaults for actions map marker-derived indices:

- **`fillSceneIndex`** (default `0`) — Fill animation.
- **`firstServeSceneIndex`** (default `1`) — First Serve after a fill (`serves === 1`).
- **`repeatServeSceneIndex`** (default `3`) — Later serves when `serves !== 1`.

Override via the **`actions`** prop.

---

## `CapsuleMachineLottie` — props

All props below are optional unless noted.

### Data and renderer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`animationData`** | `object` | — | **Required.** Parsed Lottie JSON (not the raw `var animationData = …` wrapper unless you assign the object). |
| **`lottie`** | `object` | `window.lottie` \| `window.bodymovin` | lottie-web module instance. |
| **`assetBasePath`** | `string` | — | Replaces every asset’s `u` field (e.g. `"assets/"` so images resolve next to the app). |
| **`effectLayerName`** | `string` | `"Machine"` | Layer name whose `ef[]` controls are discovered. |
| **`renderer`** | `"svg"` \| `"canvas"` \| `"html"` | `"svg"` | Renderer passed to `loadAnimation`. |
| **`autoplay`** | `boolean` | `false` | Full-comp autoplay. |
| **`loop`** | `boolean` | `false` | Full-comp loop (scene playback temporarily disables loop). |

### UI toggles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`showControls`** | `boolean` | `true` | Auto-generated sliders / color pickers for Machine effects. |
| **`showActions`** | `boolean` | `true` | Fill / Serve buttons in the floating panel. |
| **`showScenes`** | `boolean` | `true` | Buttons to play each marker-derived scene. |

### Effects

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`hiddenEffects`** | `string[]` | `["step"]` | Effect names excluded from generated controls (case-insensitive match). |
| **`initialEffects`** | `Record<string, number \| number[]>` | `{}` | Initial slider numbers or color **RGBA 0–1** keyed by effect `nm`. |
| **`sliderConfig`** | `Record<string, { min?, max?, step? }>` | `{}` | Per-slider UI ranges. |

### Convenience colors (`color1` … `color4`)

| Prop | Type | Description |
|------|------|-------------|
| **`color1`** … **`color4`** | `#rrggbb` **or** `[r,g,b]` / `[r,g,b,a]` (0–1) | Shorthand for `initialEffects.colorN`. **Overrides** the same key in `initialEffects` when set. |

### Serve sequence and limits

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`serveColorOrder`** | `number[]` | `[1,2,3,4]` | Each entry is **1–4** = `color1`…`color4`. **Any length**; duplicates allowed (e.g. `[1,2,3,3,3,1,2,4,1,3,3]`). After the last index, the **whole list repeats**. **Fill** resets the index to `0` and sets `drop new` from **`serveColorOrder[0]`** (not always physical `color1`). |
| **`prefillMachine`** | `boolean` | `false` | Start as after Fill: sets **`serves`** to `1` on load and seeks once to the **end frame of the fill scene** (no fill animation). Resets when `animationData` is reloaded. |
| **`maxDraws`** | `number` | unlimited | Integer **≥ 1**: max **successful** Serves after each **Fill**. `serve()` returns `false` when capped. Omit, `null`, or values **below 1** for unlimited. **Fill** resets the counter. |

### Scenes and actions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`sceneLabels`** | `Record<number, string>` | `{}` | Optional labels by **zero-based** scene index. |
| **`loopScenes`** | `number[]` | `[]` | Scene indexes that should **loop** while playing. |
| **`actions`** | `object` | see below | Merged with defaults. |

**`actions` default and overrides**

```js
{
  fillSceneIndex: 0,
  firstServeSceneIndex: 1,
  repeatServeSceneIndex: 3,
  servesEffectName: "serves",
}
```

### Callbacks and styling

| Prop | Type | Description |
|------|------|-------------|
| **`onReady`** | `(animation: AnimationItem) => void` | After `loadAnimation` in the inner effect (each reload). |
| **`onEffectChange`** | `(name: string, value: number \| number[]) => void` | After a named effect value changes. |
| **`onSceneChange`** | `(scene: object) => void` | When a scene segment **starts**. |
| **`onSceneComplete`** | `(scene: object) => void` | When a scene segment **finishes** (hold frame). |
| **`className`** | `string` | Wrapper class. |
| **`style`** | `React.CSSProperties` | Wrapper style (default includes relative sizing). |
| **`controlPanelStyle`** | `React.CSSProperties` | Floating panel style override. |

---

## `CapsuleMachineLottie` — ref API (`useImperativeHandle`)

Call via `ref` on `CapsuleMachineLottie` (the inner ref on `CapsuleMachineLottiePagePanel` is `lottieMachineRef`).

| Method | Returns | Description |
|--------|---------|-------------|
| **`getAnimation()`** | `AnimationItem \| null` | Current lottie-web instance. |
| **`getAnimationData()`** | `object \| null` | **Mutable** working JSON (clone with edits). |
| **`getScenes()`** | `array` | Marker-derived scene descriptors. |
| **`getEffects()`** | `array` | Analysed controls from Machine layer. |
| **`playScene(indexOrScene)`** | `boolean` | Play scene by index or scene object. |
| **`setEffect(name, value, options?)`** | `boolean` | Set effect by name; `options.reload` defaults to **reload** animation. |
| **`fill()`** | `boolean` | Run Fill: reset serve index & draw count, sync `drop new`, `serves = 1`, reload + play fill scene. |
| **`serve()`** | `boolean` | Run Serve (respects `maxDraws`); may reload then play serve scene. **`false`** if capped or cannot play. |
| **`stop()`** | `void` | Stop playback and clear scene guards. |

---

## `CapsuleMachineLottiePagePanel` — extra props

Extends the core props with layout and interaction chrome used on **grid pages** (`PageConfig.js` → `elements-registry.js`).

### Data source

| Prop | Type | Description |
|------|------|-------------|
| **`animationData`** | `object` | Inline Lottie object (e.g. getter returning `window.capsuleMachineAnimationData`). |
| **`animationPath`** | `string` | If set and no `animationData`, panel **fetches** JSON from this URL. |

### Panel chrome (TeacherNote-style)

| Prop | Type | Description |
|------|------|-------------|
| **`position`** | `object` | Often `{ css: … }` from layout system. |
| **`processedStyles`** | `object` | Merged into outer box; keys in `nonCssProcessedKeys` are stripped from CSS merge. |
| **`elementZIndex`** | `number \| string` | Optional stacking. |
| **`backgroundColor`**, **`border`**, **`borderRadius`**, **`padding`** | CSS strings | Panel frame. |
| **`text`**, **`textColor`**, **`fontSize`**, **`allowHtml`** | — | Accepted for registry parity; not used as main content when Lottie is shown. |

### Defaults (typical applet page)

| Prop | Default | Description |
|------|---------|-------------|
| **`showControls`** | `false` | Hide effect panel. |
| **`showActions`** | `true` | Can be `false` when using SVG clicks only. |

### Lottie layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`lottieStyle`** | `object` | — | Merged into inner `CapsuleMachineLottie` `style`. |
| **`lottieScale`** | `number` | `1` | Uniform scale around center; `> 1` may set `overflow: visible` on wrappers. |

### Clicks on the artwork (no panel buttons)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`useSvgActionClicks`** | `boolean` | `true` | Wire Fill/Serve to SVG elements with `data-name` (and pill-path fallback). |
| **`svgClickDataNames`** | `{ fill?: string[], serve?: string[] }` | FILL/refill, SERVE/serve | Layer names to treat as Fill vs Serve. |
| **`pillPathMarkers`** | `string[]` | `["85,-12.518", "12.518999"]` | Path `d` fragments to locate pill groups when names are missing. |
| **`invertPillFillServeOrder`** | `boolean` | `false` | Swap which pill group maps to Fill vs Serve when using path fallback. |
| **`playClickSoundOnLottieActions`** | `boolean` | `true` | Calls `window.playCarClickSound("next")` on Fill/Serve if defined. |

### Fallback hit areas (HTML)

| Prop | Type | Description |
|------|------|-------------|
| **`showImageActionOverlays`** | `boolean` | If set, forces transparent overlay buttons. If **omitted**: `true` when `showActions` and `useSvgActionClicks` are both **false**. |
| **`autoLottieTouchTargets`** | `boolean` | `true`: derive Fill/Serve hit `%` from **FILL** / **SERVE** text layer positions in JSON. |
| **`lottieTouchTargets`** | `{ fill?: object, serve?: object }` | Partial override of `left` / `top` / `width` / `height` as CSS `%` strings. |

---

## `window.CapsuleMachineLottieUtils`

| Export | Purpose |
|--------|---------|
| **`analyseLayerEffects(animationData, layerName, hiddenEffects?)`** | List slider/color controls on a layer. |
| **`getScenesFromMarkers(animationData, sceneLabels?, loopScenes?)`** | Build scene list from markers. |
| **`setEffectValueByName(animationData, layerName, effectName, value)`** | Mutate JSON effect value. |
| **`getEffectValueByName(animationData, layerName, effectName)`** | Read current value from JSON. |
| **`normalizeServeColorOrder(value)`** | Sanitize `serveColorOrder` to a non-empty `1…4` array. |
| **`effectiveMaxDraws(value)`** | Returns a positive cap or `null` for unlimited. |
| **`attachLottieSvgActionClicks(anim, opts)`** | Returns a **detach** function for Fill/Serve SVG wiring. |

---

## Examples

### 1) Page grid (`PageConfig.js`)

Used with `componentType: "CapsuleMachineLottiePagePanel"` and props under `props` (see `js/PageConfig.js` page 2).

```javascript
props: {
  componentType: "CapsuleMachineLottiePagePanel",
  get animationData() {
    return typeof window !== "undefined" ? window.capsuleMachineAnimationData : null;
  },
  assetBasePath: "assets/",
  backgroundColor: "rgb(0,0,0,0.7)",
  border: "2px solid #70ACC7",
  borderRadius: "15gc",
  padding: "15gc",
  showControls: false,
  showActions: false,
  showScenes: false,
  autoplay: false,
  loop: false,
  useSvgActionClicks: true,
  svgClickDataNames: {
    fill: ["refill", "FILL"],
    serve: ["serve", "SERVE"],
  },
  pillPathMarkers: ["85,-12.518", "12.518999"],
  invertPillFillServeOrder: false,
  lottieScale: 1.296,

  color1: "#e74c3c",
  color2: "#f1c40f",
  color3: "#3498db",
  color4: "#ff8ec7",

  serveColorOrder: [1, 2, 3, 3, 3, 1, 2, 4, 1, 3, 3],
  prefillMachine: true,
  maxDraws: 8,
},
```

### 2) React `createElement` (same globals as applet)

```javascript
const e = React.createElement;
e(window.CapsuleMachineLottiePagePanel, {
  animationData: window.capsuleMachineAnimationData,
  assetBasePath: "assets/",
  showControls: false,
  showActions: false,
  useSvgActionClicks: true,
  color1: "#2ecc71",
  serveColorOrder: [4, 3, 2, 1],
  maxDraws: 4,
});
```

### 3) Imperative calls after `ref` is set

```javascript
// panelRef.current points to CapsuleMachineLottie API if you put ref on inner component;
// in this codebase the panel uses lottieMachineRef internally — from parent you’d pass
// a ref callback or expose fill/serve from a wrapper.

machineRef.current.fill();
const ok = machineRef.current.serve();
machineRef.current.setEffect("color2", [0.2, 0.6, 0.9, 1], { reload: true });
```

### 4) Debugging effect names in the console

```javascript
const data = window.capsuleMachineAnimationData;
window.CapsuleMachineLottieUtils.analyseLayerEffects(data, "Machine", []);
```

---

## Behaviour summary

| Action | What happens |
|--------|----------------|
| **Fill** | Resets `serveColorOrder` index and `maxDraws` counter; sets `drop new` from first sequence color; sets `serves` to `1`; **reloads** Lottie and plays **fill** scene. |
| **Serve** | If under `maxDraws`, copies queue color to `drop new` / `drop old`, **reloads**, plays first or repeat **serve** scene from `actions` and `serves` value; increments draw count on success. |
| **Prefill** | Initial data has `serves === 1`; first instance seeks to **fill scene end** once (no fill animation). |

---

## Files to read in-repo

| File | Content |
|------|---------|
| `js/components/CapsuleMachineLottie.js` | Full implementation, defaults, SVG attach. |
| `js/components/elements-registry.js` | `CapsuleMachineLottiePagePanel` branch and merged props. |
| `js/PageConfig.js` | Live page 2 configuration. |
| `js/animData.js` | Large Lottie JSON + `window.capsuleMachineAnimationData`. |
| `index.html` | Script order for Lottie, anim data, component, registry. |

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Machine invisible / wrong size | Panel needs `position` / `processedStyles` from layout; check **`lottieScale`** and overflow. |
| Fill/Serve not clickable | **`useSvgActionClicks`** and `svgClickDataNames` / **`pillPathMarkers`**; ensure SVG `data-name` matches AE layer names. |
| Wrong drop color | Tube uses `colorN`; drop uses `drop new` — component syncs on Serve; requires **reload** (handled internally). |
| `removeEventListener` / DOMLoaded errors | Destroy order vs detach — current code guards `attachLottieSvgActionClicks` cleanup; keep **lottie** version aligned. |

---

*Last updated to match the capsule implementation in this repository (CapsuleMachineLottie / CapsuleMachineLottiePagePanel).*
