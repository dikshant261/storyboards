# Long Addition Component — Reference Manual

This document is the **authoritative, granular reference** for `LongAdditionComponent`: layout, typography, reveal behavior, interactive **types**, cell addressing, callbacks, styling, and how to wire it from `PageConfig.js`.

---

## Table of contents

1. [What it is](#1-what-it-is)
2. [Where it lives in the project](#2-where-it-lives-in-the-project)
3. [Minimal PageConfig wiring](#3-minimal-pageconfig-wiring)
4. [Variants and layout](#4-variants-and-layout)
5. [Step reveal (auto mode)](#5-step-reveal-auto-mode)
6. [Cell model: panels, rows, columns](#6-cell-model-panels-rows-columns)
7. [Interactive `type` overview](#7-interactive-type-overview)
   1. [Scripted engine (`script`)](#7b-scripted-engine-script)
8. [Prop reference (all props)](#8-prop-reference-all-props)
9. [Callbacks and events](#9-callbacks-and-events)
10. [DOM, data attributes, and CSS](#10-dom-data-attributes-and-css)
11. [Grid cell (`gc`) units and fonts](#11-grid-cell-gc-units-and-fonts)
12. [Remounting and cache keys](#12-remounting-and-cache-keys)
13. [Worked examples](#13-worked-examples)
14. [Troubleshooting](#14-troubleshooting)
15. [Related docs](#15-related-docs)

---

## 1. What it is

`LongAdditionComponent` renders **column addition** for **two or three** non‑negative integers (each **up to 5 digits**), with:

- **Simple** view: stacked digits, header row (place labels), divider line, sum.
- **Expanded** view: place labels, place‑value row (e.g. 1000, 100, …), each operand as digit×place sums separated by `+`, divider, expanded sum.
- **Both** view: simple **left**, expanded **right**, advancing in **lock‑step** on a shared step timeline.

It supports **passive animation** (`type: 'auto'`) and **interactive learning modes** (`guided`, `incorrect`, `fill-missing`) with optional **locked cells**, **callbacks**, and **UI overlays** (instruction bar, progress bar, number pad).

---

## 2. Where it lives in the project

| Artifact | Path |
|----------|------|
| Component implementation | `js/components/long-addition-component.js` |
| Registry branch (`componentType`) | `js/components/elements-registry.js` (`LongAdditionComponent`) |
| Global export | `window.LongAdditionComponent` (object with `LongAdditionComponent`, `LongAdditionElement`) |
| Interactive CSS | `css/long-addition-interactive.css` |
| Spec (architecture) | `docs/long-addition-interactive-types-spec.md` |
| Copy‑paste examples | `docs/long-addition-interactive-examples.js` |
| Phase notes | `docs/PHASE-1-COMPLETE.md` … `docs/PHASE-5-COMPLETE.md` |

**HTML:** `index.html` / `index-en.html` must load (order matters):

1. React
2. `js/GridCellFontUtils.js` (or wherever `GridCellFontUtils` is defined)
3. `js/components/long-addition-component.js`
4. `js/components/elements-registry.js`
5. Stylesheet: `css/long-addition-interactive.css` (for interactive classes)

---

## 3. Minimal PageConfig wiring

Every long addition instance is a **`custom`** element whose `props.componentType` is **`LongAdditionComponent`**.

```javascript
{
  id: "my-long-addition",
  name: "my-long-addition",
  type: "custom",
  coordinates: [400, 100, 1550, 790],  // grid coords → math-applet maps to % CSS
  zIndex: "var(--z-elevated)",
  props: {
    componentType: "LongAdditionComponent",
    numbers: [23, 45],
    variant: "simple",
    // …all other props optional…
  },
}
```

**Required for meaningful display:** `numbers` (array of 2–3 integers). Everything else has defaults inside the component.

---

## 4. Variants and layout

### 4.1 `variant`

| Value | Meaning |
|-------|---------|
| `"simple"` | Header + operands + divider + sum only. |
| `"expanded"` | Expanded form only (includes place row when applicable). |
| `"both"` | Simple panel + middle strip (optional `=`) + expanded panel. |

### 4.2 `placeValueRow`

| Value | Effect |
|-------|--------|
| `"full"` | Expanded place row shows all place values including ones (`1`). |
| `"skip-ones"` | Expanded place row **omits** the ones column token (empty slot for ones). |

### 4.3 `operatorPosition`

| Value | Meaning |
|-------|---------|
| `"auto"` | Uses `window.AppData.currentLanguage`: **`id` → `"right"`**, otherwise **`"left"`**. Requires `AppData` / `window.AppData` to be set for predictable behavior. |
| `"left"` | `+` to the **left** of the bottom operand row (common English layout). |
| `"right"` | `+` to the **right** of the bottom operand row (Indonesian style). |

**Layout note (`both` + `right`):** The simple panel’s digit columns start at column **0** when the operator is on the right (no extra left column reserved for `+`), so the `+` does not overlap the middle strip.

### 4.4 Block widths: `leftBlock`, `middleBlock`, `rightBlock`

These are **optional** layout overrides (number **px** or **`gc`** string resolved via `GridCellFontUtils` as **width**):

| Prop | Applies when | Role |
|------|----------------|------|
| `leftBlock` | `simple` or `both` | Target **column slot width** for simple stacked digits. |
| `rightBlock` | `expanded` or `both` | Target **column slot width** for expanded digit/label cards. |
| `middleBlock` | `variant === "both"` | Width of the **middle strip** between panels (leading `=` lives here when used). |

If omitted, the component derives widths from the container and internal ratios.

### 4.5 Gaps and separators

| Prop | Role |
|------|------|
| `gap` | Default horizontal gap between simple columns; also used for **vertical** row gap if `rowGap` omitted. |
| `rowGap` | Vertical gap between row bands (overrides vertical use of `gap`). |
| `columnGap` | Horizontal gap between **simple** columns (overrides horizontal part of `gap`). |
| `expandedColumnGap` | Horizontal gap in **expanded** panel: width of `+` columns and related separators; influences min column width (can drop to **22px** when set aggressively). |

### 4.6 Panel outlines and debug grid

| Prop | Default | Role |
|------|---------|------|
| `showPanelBorders` | `false` | Orange **2px** outlines around layout regions (left / middle / right in `both`, or single region in `simple` / `expanded`). |
| `showPanelGridLines` | `true` | When **also** `showPanelBorders`, draws **orange 1px** row/column guides inside regions. Set **`false`** to hide internal grid while keeping outlines. |
| `debugPanelLayout` | `false` | Logs `[LongAdditionPanelLayout]` and sets `data-layout-debug-tag` on root for DevTools filtering. |

---

## 5. Step reveal (auto mode)

### 5.1 `mode`

| Value | Who advances steps |
|-------|---------------------|
| `"self"` | Internal timer (`stepDurationMs`, `startDelayMs`, `autoPlay`, `loop`). |
| `"controlled"` | Parent passes `currentStep` (clamped to `0…maxStep`). |

### 5.2 Timing props (`mode === "self"`)

| Prop | Default | Meaning |
|------|---------|---------|
| `autoPlay` | `true` | If `true`, timeline runs; if `false`, starts **paused** until `api.play()`. |
| `stepDurationMs` | `700` | Interval between step increments (minimum **50** ms enforced). |
| `startDelayMs` | `0` | Delay before the first interval tick. |
| `loop` | `false` | If `true`, when step reaches `maxStep`, next tick wraps to **0**. |

### 5.3 Step plan (`maxStep`)

The component builds a **linear step index** `0 … maxStep`. Rough order:

- **`simple`:** header → each operand → divider → sum.
- **`expanded`:** header → place row → each operand → divider → sum.
- **`both`:** uses the **longer** expanded timeline; on the “place” step the simple side has no extra row (no‑op visually for simple).

`effectiveStep` is what drives **opacity / visibility** of each row fragment.

### 5.4 Imperative API (`onReadyApi`)

After mount, the component calls **`onReadyApi(api)`** once (and when dependencies change) with:

```typescript
type LongAdditionApi = {
  play(): void;      // self mode: unpause timer
  pause(): void;     // self mode: pause timer
  next(): void;      // self mode: step +1 clamped
  prev(): void;      // self mode: step -1 clamped
  goto(step: number): void;
  reset(): void;     // step 0; paused if !autoPlay
  getStep(): number;
  getMaxStep(): number;
};
```

**Note:** `play` / `pause` / `next` / `prev` / `goto` / `reset` affect **self** mode only; controlled mode is driven by `currentStep`.

---

## 6. Cell model: panels, rows, columns

### 6.1 Cell ID string

Every interactive cell is addressed by a stable string:

```text
<panel>:<row>:<column>
```

Example: `simple:sum:O` means simple panel, sum row, Ones column.

**Implementation:** `createCellId(panel, row, column)` in `long-addition-component.js`.

### 6.2 `panel`

| Value | Meaning |
|-------|---------|
| `simple` | Left/simple stacked region. |
| `expanded` | Right/expanded region. |

### 6.3 `row`

| Value | Meaning |
|-------|---------|
| `header` | Place header row (TTh / Th / H / T / O labels — depends on digit width). |
| `place` | Expanded **place value** row (e.g. 1000, 100, …). |
| `operand-0`, `operand-1`, `operand-2` | Operand index **0-based** (max 3 numbers → `operand-2`). |
| `sum` | Result row. |

### 6.4 `column` (place keys)

Internal keys are drawn from:

```javascript
const PLACE_KEYS = ['TTh', 'Th', 'H', 'T', 'O'];
```

For **N** total columns (from padded width of operands), the visible slice is the **rightmost N** keys:

| totalCols | Columns (left → right) |
|-----------|-------------------------|
| 5 | TTh, Th, H, T, O |
| 4 | Th, H, T, O |
| 3 | H, T, O |
| … | … |

**When authoring `lockedCells` / `incorrectCells` / `missingCells` / `guidedSteps`**, the `column` string must match this key for the column you mean (e.g. ones is **`O`**, tens **`T`**).

### 6.5 `lockedCells` pattern matching

Each lock rule is an object:

```javascript
{ panel: "simple", row: "header" }           // entire header row on simple
{ panel: "simple", row: "operand-0" }      // entire first operand row
{ panel: "simple", row: "sum", column: "O" } // single cell
```

**Rule:** If `column` is **omitted**, **all columns** in that `panel`+`row` are locked. If `column` is present, only that cell is locked.

**Auto mode:** All cells are treated as locked (no clicks).

---

## 7. Interactive `type` overview

| `type` | User goal | Typical config |
|--------|-----------|----------------|
| `auto` (default) | Watch steps reveal | `mode`, `stepDurationMs`, optional `onStepChange` |
| `guided` | Follow prompts; click expected cells | `guidedSteps`, optional `lockedCells` |
| `incorrect` | Find cells that are intentionally wrong | `incorrectCells`, `lockedCells` |
| `fill-missing` | Fill blanks with number pad; **validate on external Check only** | `missingCells`, `lockedCells`, optional progress overlay props |
| `guided_flow_short` | Same runtime as `guided`; use a shorter `script` in PageConfig | `script`, optional `guidedSteps` |

**Invalid `type`** strings fall back to **`auto`**.

**Auto + interactive props:** If `type === "auto"` but you pass `incorrectCells`, `missingCells`, `guidedSteps`, or `lockedCells`, the component **`console.warn`s** that those props are ignored — useful to catch mis‑wired pages.

### 7.1 External **Check** button (`incorrect` + `fill-missing`)

Both modes listen for a window event (dispatched from `PageConfig` on page 1, etc.):

```javascript
window.dispatchEvent(
  new CustomEvent('longAdditionCheck', { detail: { id: '<same-as-component-id>' } })
);
```

- **`detail.id`** must match the long addition element’s `id` / `elementName` / generated id (same value used for `longAdditionStepChanged`).
- **`incorrect`:** Validates the current **pending** selection batch, updates found/missed counts, clears pending, updates instruction feedback.
- **`fill-missing`:** Reads **draft** values from `cellValues` (saved when the number pad closes), validates every **non‑empty** missing cell in one pass, updates `validatedCells` + tile styling. Does **not** validate on each digit or on pad close alone. When every missing cell is filled and all answers are correct, fires `onTypeComplete` (see §9.2).

### 7.2 `fill-missing` — number pad and caps

- **No Submit** on the pad: digits append until column **numeric max** is reached; **Clear** / **Backspace** edit the buffer; tapping outside saves a **draft** (or discards if empty) and closes the pad.
- **Caps:** simple (left) panel digits are capped at **9**; expanded panel caps by column: **O** 99, **T** 999, **H** 9999, **Th** 99999, **TTh** 999999 (enforced while typing and again on Check via `acceptableValues` / `correctValue`).
- **After Check:** wrong → salmon tint + outline; correct → green tint + outline; **correct tiles** get `la-cell--locked` (not clickable). Digit colour remains the **place column** colour from `colors` / `placeColorsI18nKey`.

---

## 7B. Scripted engine (`script`)

The **scripted engine** is a unified runtime that drives all four `type` modes from a single ordered `script` array. It controls visibility, instruction copy, input, validation, and animations, so that one engine can author auto reveals, guided pedagogical flows, and warm‑up reveals for incorrect/fill-missing problems.

When `script` is non-empty, **`script` overrides** the legacy `effectiveStep`/`guidedSteps` reveal logic. When absent, the component behaves exactly as before (legacy `auto`/`guided`/`incorrect`/`fill-missing` flows preserved).

### Step shape

```js
{
  stepId: 0,                                   // optional, for callbacks
  instruction: "We need to add these two numbers.",

  // Layout deltas added to the visible set at this step (cumulative across steps).
  reveal: {
    panels: ["simple"],                        // SCOPE for `rows` (not a wildcard)
    panelsWildcard: ["simple"],                // wildcard reveal (whole panel)
    rows: ["operand-0", "operand-1", "divider"],
    cells: [{ panel: "expanded", row: "operand-0", column: "O" }],
    elements: ["operator-plus"]                // 'operator-plus', etc.
  },

  // Optional cell highlight (gets the `la-cell--highlighted` class).
  highlight: { panel: "simple", row: "operand-0", column: "O" },

  // For transfer-fly animations.
  source: { panel: "simple", row: "operand-0", column: "O" },
  target: { panel: "expanded", row: "operand-0", column: "O" },

  // The cell-level interaction the engine expects from the user.
  action: { type: "select-cell" | "enter-value" | "next" | "reveal-next",
             panel, row, column, expected: "9" },

  // Per-step input-mode override.
  inputMode: "type" | "reveal" | "choice",
  // Per-step validation override.
  validation: "per-entry" | "row-check" | "both" | "none",
  // For inputMode: "choice".
  choiceOptions: ["9", "90", "900"],

  // How to advance from this step.
  advance: { type: "next" | "tap-revealed" | "auto", delayMs: 1500 },

  // Optional declarative animation hints.
  animation: "transfer-source-to-target" | "open-carry-row" | ...,

  // Hand off cell handling to a legacy mode-specific handler.
  // Used by warm-up scripts for `incorrect` / `fill-missing` types.
  phase: "hunt" | "fill",
}
```

### Visibility

`reveal.panels` is a **scope** for `reveal.rows`, not a wildcard. To wildcard the entire panel (everything visible), use `reveal.panelsWildcard: ["simple"]` or `reveal.all: true`.

**Row-level visibility** is `true` whenever any of its cells is in the revealed set (so per-cell reveals work). **Cell-level visibility** is gated within an already-visible row: a cell renders only when its row was wildcard-revealed *or* the cell itself is revealed.

### Carry row

The component reserves a **carry row** above the operand digits in the simple panel when:

1. The problem will produce a carry (computed up-front from `numbers`), or
2. The script declares `reveal.rows: ["carry"]` or any `target.row === "carry"`.

When reserved, the row is hidden by default and **opens up** with a slide-down + fade-in animation (`@keyframes openCarryRow`) the first time it is revealed. Carry cells use a smaller chip (`.la-cell--carry`) and address as `simple:carry:T`, `simple:carry:H`, etc.

### Input modes

Component-level `guidedInputMode` (default `"reveal"`), per-step `step.inputMode` overrides:

- **`type`** — opens a number-pad overlay; user types the value and commits per script (Submit may appear in scripted flows; **fill-missing**’s own pad has no Submit — see §7.2).
- **`reveal`** — user taps the highlighted source (or target), engine animates the value flying from source to target via a transient ghost element.
- **`choice`** — user picks from `step.choiceOptions` chips; tapped option commits.

All three resolve to the same internal `commitCellValue(cellId, value, { expected })` which runs validation and (for `per-entry`) auto-advances.

### Validation

Component-level `guidedValidation` (default `"per-entry"`), per-step `step.validation` overrides:

- **`per-entry`** — validate each commit; correct answers auto-advance, wrong answers shake and clear.
- **`row-check`** — validation deferred until the user clicks the **Check** button on the instruction panel.
- **`both`** — per-entry feedback plus a final row-check.
- **`none`** — accept any value, never validate.

### Advance mechanisms

- **`{ type: "next" }`** — instruction panel shows a Next ›/Done button.
- **`{ type: "tap-revealed" }`** — any click on a revealed element advances.
- **`{ type: "auto", delayMs: 1500 }`** — engine auto-advances after the delay.
- For input steps, advance is **implicit**: on commit (per-entry) or on Check (row-check).

### Element selectors

- `panel:row` — full row, e.g. `simple:operand-0`.
- `panel:row:column` — single cell, e.g. `expanded:sum:O`.
- `element:<name>` — special elements such as `operator-plus`.
- `*` — wildcard everything.
- `simple:*` — wildcard a panel.

### Worked example: page 1 long addition

`PageConfig.js` page 1 demonstrates the scripted engine end-to-end. The script:

1. Introduces 5459 + 3965 (operands + `+` + divider only).
2. Reveals the simple-panel place-value headers and explains place values.
3. Reveals the expanded panel (header + place row).
4. Walks the user through decomposing each operand digit-by-digit, animating the value from the simple to the expanded panel.
5. Performs column-by-column addition on the expanded panel; opens the carry row the first time a carry is needed.
6. Transfers the right-block answer back to the simple sum row.

See `js/PageConfig.js` -> `page1-long-addition` for the full script.

---

## 8. Prop reference (all props)

Below, **“PageConfig”** means: fields go under `element.props` for a `type: "custom"` element.

### 8.1 Identity and placement (from host / registry)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | `useId()` | HTML `id` on root div. |
| `elementName` | string | — | Used as `data-element-name` and fallback id. |
| `position` | object | — | From layout: `{ coordinates, css }` — **do not hand‑author** in PageConfig; math-applet supplies it. |
| `elementZIndex` | number \| string | `402` | Root `z-index` if not overridden by `position.css`. |
| `processedStyles` | object | — | Merged styles from pipeline; several layout props read from here if top‑level missing. |

### 8.2 Problem definition

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numbers` | `number[]` | `[0,0]` | **2–3** entries; negatives clamped to `0`; values floored; max **99999**; array padded to length 2 if shorter. |

### 8.3 Visual variant and i18n

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"simple"` \| `"expanded"` \| `"both"` | `"simple"` | Which layout(s) to render. |
| `placeValueRow` | `"full"` \| `"skip-ones"` | `"full"` | Expanded place row includes ones or not. |
| `operatorPosition` | `"auto"` \| `"left"` \| `"right"` | `"auto"` | `+` placement; `auto` uses `AppData.currentLanguage`. |
| `placeLabelsI18nKey` | string | `"common.longAddition.placeLabels"` | Dot path for `window.i18n.t(...)`. |
| `placeLabels` | object | — | Per‑key fallback if i18n missing a key. |
| `placeColorsI18nKey` | string | `"common.longAddition.placeColors"` | Dot path for color map via i18n object. |
| `colors` | object | — | Explicit overrides `{ TTh, Th, H, T, O: "#rrggbb" }`. |

### 8.4 Typography and card metrics

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `digitFontSize` | number \| string | (derived) | Operand + sum digits; **`gc`** supported. If set explicitly, **font clamp is skipped** so config takes effect. |
| `placeFontSize` | number \| string | (derived) | Expanded place row; **`gc`** supported; same clamp rule as digits when explicit. |
| `headerFontSize` | number \| string | (derived) | Header row; **`gc`** supported; same explicit rule. |
| `digitFontStyle` | object | `{ fontWeight: "bold" }` | Allowed keys: weight, style, family, textDecoration*, letterSpacing, fontVariant*. |
| `placeFontStyle` | object | `{ fontWeight: "bold" }` | Same allowed keys. |
| `headerFontStyle` | object | `{ fontWeight: "bold" }` | Same allowed keys. |
| `textWidthBuffer` | number \| string | `10` | Extra px (or `gc` as width) added to measured text width per card; falls back to `cardPadding` if unset. |
| `cardPadding` | number \| string | — | Fallback for text width buffer only (not the same as CSS cell padding). |
| `cardRadius` | number \| string | (derived from chip height) | Border radius of digit cards. |
| `lineThickness` | number \| string | (derived) | Divider line thickness. |
| `lineColor` | string | `"#FFFFFF"` | Divider line color. |

**Cell padding / alignment:** Each rendered cell uses **~2% of min(width,height)** as inner padding and **flex centering** so content stays centered even with custom font styles.

### 8.5 Spacing and panel blocks

(See §4.4–4.5 for semantics.)

| Prop | Type | Default |
|------|------|---------|
| `gap` | number \| string | — |
| `rowGap` | number \| string | — |
| `columnGap` | number \| string | — |
| `expandedColumnGap` | number \| string | — |
| `leftBlock` | number \| string | — |
| `middleBlock` | number \| string | — |
| `rightBlock` | number \| string | — |

### 8.6 Reveal / timeline

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"self"` \| `"controlled"` | `"self"` | Who owns `currentStep`. |
| `currentStep` | number | — | **Controlled** mode: visible step index. |
| `autoPlay` | boolean | `true` | Self mode: start unpaused if true. |
| `stepDurationMs` | number | `700` | Self mode interval. |
| `startDelayMs` | number | `0` | Initial delay before stepping. |
| `loop` | boolean | `false` | Restart from step 0 after max. |

### 8.7 Overlays / debug

| Prop | Type | Default |
|------|------|---------|
| `debugPanelLayout` | boolean | `false` |
| `showPanelBorders` | boolean | `false` |
| `showPanelGridLines` | boolean | `true` |

### 8.8 Interactive: `type` and data

| Prop | Type | Default | When used |
|------|------|---------|-----------|
| `type` | string | `"auto"` | Selects interactive mode. |
| `lockedCells` | `LockRule[]` | — | Non‑clickable regions in interactive modes. |
| `incorrectCells` | `IncorrectCell[]` | — | `type === "incorrect"`. If empty, wrong tiles can be chosen via `impactedTilesCount` / `impactTiles`. |
| `missingCells` | `MissingCell[]` | — | `type === "fill-missing"`. If empty, blanks can be chosen via `impactedTilesCount` / `impactTiles`. |
| `impactedTilesCount` | number | `0` | When `incorrectCells` or `missingCells` is empty, how many random eligible tiles to mark wrong / blank. |
| `impactTiles` | `{ panel, row, column }[]` | `[]` | When non-empty, explicit list of impacted tiles (overrides random pick). |
| `guidedSteps` | `GuidedStep[]` | — | Legacy `type === "guided"`; auto-converted to a `script`. |
| `script` | `Step[]` | — | **Scripted engine** (preferred). See [§7B](#7b-scripted-engine-script). Drives `auto`/`guided`/`guided_flow_short`/`incorrect`/`fill-missing`. |
| `incorrectProgressPanelCoordinates` | `[x1,y1,x2,y2]` | — | Page grid rect to portal incorrect progress / completion bars into `.main-container`. |
| `incorrectOverlayPanelStyle` | object | — | Shallow-merged onto portaled incorrect bars (e.g. `{ zIndex: 1200 }`). |
| `fillMissingProgressPanelCoordinates` | `[x1,y1,x2,y2]` | — | Same for fill-missing teal progress / completion UI. |
| `fillMissingOverlayPanelStyle` | object | — | Shallow-merged onto fill-missing bars. |
| `instructionTargetId` | string | — | Optional element id whose text is updated for scripted instruction + Check feedback. |
| `guidedInputMode` | `"reveal"` \| `"type"` \| `"choice"` | `"reveal"` | Default input mechanism for `enter-value` steps; per-step `step.inputMode` overrides. |
| `guidedValidation` | `"per-entry"` \| `"row-check"` \| `"both"` \| `"none"` | `"per-entry"` | Default validation mode; per-step `step.validation` overrides. |
| `onScriptStep` | `({ stepIndex, step, totalSteps }) => void` | — | Fires whenever the active script step changes. |
| `onScriptComplete` | `({ totalSteps, timeElapsed }) => void` | — | Fires when the user advances past the last step. |

#### Type: `LockRule`

```typescript
type LockRule = {
  panel: "simple" | "expanded";
  row: string;       // "header" | "place" | "operand-0" | … | "sum"
  column?: string;  // if omitted → entire row locked
};
```

#### Type: `IncorrectCell`

```typescript
type IncorrectCell = {
  panel: "simple" | "expanded";
  row: string;
  column: string;
  displayValue: string | number;  // rendered instead of computed digit/token
  correctValue?: string | number; // informational / future reveal
  id?: string;                     // optional author id
};
```

#### Type: `MissingCell`

```typescript
type MissingCell = {
  panel: "simple" | "expanded";
  row: string;
  column: string;
  correctValue: string | number;
  acceptableValues?: string[];   // default: [String(correctValue)]
  hint?: string;                 // shown in number pad
  id?: string;
};
```

#### Type: `GuidedStep`

```typescript
type GuidedStep = {
  stepId?: number;
  instruction: string;           // shown in bottom instruction bar
  action: GuidedAction;
};

type GuidedAction =
  | { type: "select-cell"; panel: string; row: string; column: string }
  | { type: "enter-value"; panel: string; row: string; column: string; expectedValue?: string }
  | { type: "reveal-next" };
```

**Guided behavior (current implementation):**

- `select-cell` / `enter-value`: user must click the cell matching `panel` / `row` / `column`. Correct click → brief success styling → auto‑advance. Wrong click → shake, attempt counter; state clears after animation.
- `reveal-next`: any click advances (rarely needed).
- **Number entry for `enter-value`** is still simplified (click target acts like select‑cell); full keypad binding per step can be extended later.

### 8.9 Callback props

| Prop | Signature | When |
|------|-----------|------|
| `onStepChange` | `(step: number) => void` | Whenever `effectiveStep` changes. |
| `onComplete` | `() => void` | When `effectiveStep >= maxStep` (auto timeline). |
| `onReadyApi` | `(api: LongAdditionApi) => void` | After mount / when API identity changes. |
| `onCellClick` | `(cellId: string, parsed: {panel,row,column} \| null) => void` | Any interactive cell click (after internal handling). |
| `onCellFocus` | `(cellId, parsed) => void` | Fill‑missing: number pad opened; guided: not used for pad. |
| `onCellBlur` | `(cellId, parsed) => void` | Fill‑missing: pad closed after **saving a draft** (non‑empty) or dismiss (empty). |
| `onTypeComplete` | `(stats: object) => void` | When an interactive mode reaches completion criteria. |

---

## 9. Callbacks and events

### 9.1 Window events (auto timeline)

| Event | `detail` |
|-------|----------|
| `longAdditionStepChanged` | `{ id, step }` |
| `longAdditionComplete` | `{ id, step }` |

`id` is the component’s `id` / `elementName` / generated id.

### 9.1b Window event: **`longAdditionCheck`**

| Event | `detail` | When handled |
|-------|----------|----------------|
| `longAdditionCheck` | `{ id }` | `type` is `incorrect` or `fill-missing` **and** `detail.id` matches this instance |

See [§7.1](#71-external-check-button-incorrect--fill-missing).

### 9.2 `onTypeComplete` payloads (by `type`)

**`incorrect`** (when all errors have been found; often after **Check**):

```javascript
{
  type: "incorrect",
  totalErrors: number,
  foundErrors: number,
  missedClicks: number,
  timeElapsed: number,   // ms since interaction tracking started
  triggeredBy: "check-button", // when fired from the external Check flow
}
```

**`fill-missing`** (only when, after **Check**, every missing cell has a value and **all** are correct):

```javascript
{
  type: "fill-missing",
  totalCells: number,       // missing cell count
  filledCells: number,      // non-empty values at completion
  correctCells: number,     // equals totalCells when this fires
  incorrectAttempts: number,
  timeElapsed: number,
  triggeredBy: "check-button",
}
```

There is **no** `onTypeComplete` for fill-missing on each pad close; completion is **Check‑gated** as above.

**`guided`:**

```javascript
{
  type: "guided",
  totalSteps: number,
  completedSteps: number,
  totalAttempts: number,
  timeElapsed: number,
}
```

---

## 10. DOM, data attributes, and CSS

### 10.1 Root element

- **Tag:** `div`
- **Classes:** `long-addition-component`
- **Important attributes:**
  - `data-element-type="long-addition"`
  - `data-element-name` from config
  - `data-type` = current `type`
  - `data-step`, `data-max-step` = timeline indices
  - `data-expanded-sep-px`, `data-expanded-equals-sep-px`, `data-expanded-column-gap-raw`
  - `data-both-panel-gap-px` when `variant === "both"`
  - Guided: `data-guided-step`, `data-guided-total`
  - Incorrect: `data-incorrect-found`, `data-incorrect-total`
  - Fill‑missing: `data-fill-missing-correct`, `data-fill-missing-total`
  - Fill‑missing pad open: `data-fill-missing-numpad-open="true"` (dims non‑focused grid chrome)

### 10.2 Per‑cell attributes

- `data-cell-id="simple:sum:O"`
- `data-has-override` present when the rendered character comes from **`displayValue`** (incorrect) or **`?`/user value** (fill‑missing).

### 10.3 CSS classes (interactive)

Loaded from `css/long-addition-interactive.css`. Common classes:

| Class | Meaning |
|-------|---------|
| `la-cell` | Base cell. |
| `la-cell--clickable` | Pointer cursor when interactive and not locked. |
| `la-cell--locked` | Locked / non‑interactive. |
| `la-cell--selected` | Selection highlight. |
| `la-cell--correct` | Incorrect mode: identified error; fill‑missing: **Check** marked correct (green tint + outline). |
| `la-cell--incorrect` | Wrong click (incorrect) / fill‑missing **Check** marked wrong (salmon tint + outline). |
| `la-cell--focused` | Fill‑missing: active pad target (yellow tile). |
| `la-cell--highlighted` | Guided expected cell pulse. |
| `la-cell--expanded` | Expanded panel cells. |

Overlay / panel classes include: `la-guided-instruction`, `la-guided-completion`, `la-incorrect-progress`, `la-incorrect-completion`, `la-fill-missing-progress`, `la-fill-missing-completion`, `la-number-pad-overlay`, `la-number-pad`, `la-numpad-btn`, etc.

---

## 11. Grid cell (`gc`) units and fonts

Many props accept strings like `"34gc"`. Resolution uses `window.GridCellFontUtils.convertGcToPixels(value, propertyName)`.

**Important:** `GridCellFontUtils.processGcStyles` also converts **`digitFontSize`**, **`placeFontSize`**, and **`headerFontSize`** when they appear in processed style objects — this keeps PageConfig and pipeline output consistent.

---

## 12. Remounting and cache keys

`math-applet.js` uses `elementRendererListKey` so the long addition element **remounts** when layout‑affecting props change (otherwise stale closures / layout could persist):

Current key includes:

`expandedColumnGap`, `columnGap`, `rowGap`, `gap`, `variant`, `leftBlock`, `rightBlock`, `middleBlock`, `debugPanelLayout`, `showPanelBorders`, `showPanelGridLines`.

If you add a new layout prop and find **hot reload doesn’t apply**, extend this key similarly.

---

## 13. Worked examples

### 13.1 Production‑style auto demo (`both`, i18n labels)

This mirrors `PageConfig.js` → `page1-long-addition` (simplified):

```javascript
{
  id: "page1-long-addition",
  name: "page1-long-addition",
  type: "custom",
  coordinates: [400, 100, 1550, 790],
  zIndex: "var(--z-elevated)",
  props: {
    componentType: "LongAdditionComponent",
    numbers: [5459, 3965],
    variant: "both",
    placeValueRow: "skip-ones",
    operatorPosition: "auto",
    mode: "self",
    autoPlay: true,
    stepDurationMs: 700,
    startDelayMs: 400,
    placeLabelsI18nKey: "common.longAddition.placeLabels",
    placeColorsI18nKey: "common.longAddition.placeColors",
    digitFontSize: "34gc",
    placeFontSize: "34gc",
    headerFontSize: "34gc",
    digitFontStyle: { fontWeight: "bold" },
    placeFontStyle: { fontWeight: "bold" },
    headerFontStyle: { fontWeight: "bold" },
    cardRadius: "4gc",
    textWidthBuffer: "60gc",
    rowGap: "30gc",
    columnGap: "5gc",
    expandedColumnGap: "50gc",
    leftBlock: "50gc",
    rightBlock: "200gc",
    middleBlock: "50gc",
    showPanelBorders: false,
    showPanelGridLines: false,
    debugPanelLayout: false,
  },
}
```

### 13.2 Incorrect mode (wrong sum digits, operands locked)

```javascript
{
  id: "page-incorrect-23-45",
  name: "page-incorrect-23-45",
  type: "custom",
  coordinates: [400, 120, 1200, 720],
  zIndex: "var(--z-elevated)",
  props: {
    componentType: "LongAdditionComponent",
    type: "incorrect",
    numbers: [23, 45],
    variant: "simple",
    showPanelBorders: false,
    showPanelGridLines: false,
    incorrectCells: [
      { panel: "simple", row: "sum", column: "O", displayValue: "6", correctValue: "8" },
      { panel: "simple", row: "sum", column: "T", displayValue: "7", correctValue: "6" },
    ],
    lockedCells: [
      { panel: "simple", row: "header" },
      { panel: "simple", row: "operand-0" },
      { panel: "simple", row: "operand-1" },
    ],
    onTypeComplete: (stats) => {
      console.log("[incorrect] done", stats);
    },
  },
}
```

### 13.3 Fill‑missing (sum blanks, number pad, **Check** to validate)

Wire an on‑page **Check** button that dispatches `longAdditionCheck` with the same `id` as this element (see `PageConfig.js` page 1). Until Check, cells only store **drafts** from the pad.

```javascript
{
  id: "page-fill-23-45",
  name: "page-fill-23-45",
  type: "custom",
  coordinates: [400, 120, 1200, 720],
  zIndex: "var(--z-elevated)",
  props: {
    componentType: "LongAdditionComponent",
    type: "fill-missing",
    numbers: [23, 45],
    variant: "simple",
    missingCells: [
      {
        panel: "simple",
        row: "sum",
        column: "O",
        correctValue: "8",
        acceptableValues: ["8"],
        hint: "3 + 5 = ?",
      },
      {
        panel: "simple",
        row: "sum",
        column: "T",
        correctValue: "6",
        acceptableValues: ["6"],
        hint: "2 + 4 = ?",
      },
    ],
    lockedCells: [
      { panel: "simple", row: "header" },
      { panel: "simple", row: "operand-0" },
      { panel: "simple", row: "operand-1" },
    ],
    onTypeComplete: (stats) => console.log("[fill-missing] done", stats),
  },
}
```

### 13.4 Guided mode (simple 2‑digit sum)

```javascript
{
  id: "page-guided-23-45",
  name: "page-guided-23-45",
  type: "custom",
  coordinates: [400, 120, 1200, 720],
  zIndex: "var(--z-elevated)",
  props: {
    componentType: "LongAdditionComponent",
    type: "guided",
    numbers: [23, 45],
    variant: "simple",
    guidedSteps: [
      {
        stepId: 0,
        instruction: "Click the Ones header (O).",
        action: { type: "select-cell", panel: "simple", row: "header", column: "O" },
      },
      {
        stepId: 1,
        instruction: "Click the sum digit in the Ones column.",
        action: { type: "select-cell", panel: "simple", row: "sum", column: "O" },
      },
    ],
    onTypeComplete: (s) => console.log("[guided] done", s),
  },
}
```

### 13.5 Controlled reveal (parent drives `currentStep`)

```javascript
// Pseudocode: store step in parent state
props: {
  componentType: "LongAdditionComponent",
  type: "auto",
  numbers: [12, 34],
  variant: "simple",
  mode: "controlled",
  currentStep: 3, // parent updates this on button click
  onStepChange: (step) => console.log("step", step),
}
```

---

## 14. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Changing `digitFontSize` / `gc` has no effect | Font clamp or gc not processed | Use explicit `digitFontSize` string like `"36gc"`; ensure `GridCellFontUtils` loads before component; check `processGcStyles` for your pipeline. |
| `operatorPosition: "auto"` wrong language | `AppData.currentLanguage` not visible on `window` | Ensure `window.AppData = AppData` (or equivalent) and language drives re‑render (`i18nTick`). |
| Interactive clicks do nothing | `type` still `auto` or cells locked | Set `type`, verify `lockedCells` patterns, check `data-type` on DOM. |
| Layout prop change doesn’t refresh | Remount key | Extend `elementRendererListKey` in `math-applet.js`. |
| `Th` vs `TTh` mismatch | Wrong `column` for width | Print `digitsOf` width or inspect `data-cell-id` in DOM. |

---

## 15. Related docs

- `docs/long-addition-interactive-types-spec.md` — product/spec narrative and phased plan  
- `docs/long-addition-interactive-examples.js` — ready‑to‑paste `const example…` blocks  
- `docs/PHASE-1-COMPLETE.md` … `docs/PHASE-5-COMPLETE.md` — implementation notes per phase  

---

**Document version:** 1.1 (fill‑missing Check‑only validation, external `longAdditionCheck`, overlay/prop notes, `guided_flow_short`, impacted tile props). If behavior and this file diverge, treat **`long-addition-component.js`** as the source of truth and update this reference accordingly.
