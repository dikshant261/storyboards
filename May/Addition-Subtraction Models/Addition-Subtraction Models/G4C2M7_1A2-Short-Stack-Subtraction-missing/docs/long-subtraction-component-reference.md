# Long Subtraction Component — Reference Manual

This document is the **authoritative, granular reference** for `LongSubtractionComponent`: layout, typography, reveal behavior, interactive **types**, cell addressing, callbacks, styling, the scripted engine, and the user-driven borrow chain (the subtraction-specific feature set).

The component is intentionally parallel to `LongAdditionComponent` in surface area — same panel/row/cell vocabulary, same reveal/animation engine, same `PageConfig` wiring style. Subtraction-specific differences are called out throughout (math operation, borrow row, split-borrow animation, "Borrow from" pad button, cell-click button panel, donor strike-through).

---

## Table of contents

1. [What it is](#1-what-it-is)
2. [Where it lives in the project](#2-where-it-lives-in-the-project)
3. [Minimal PageConfig wiring](#3-minimal-pageconfig-wiring)
4. [Variants and layout](#4-variants-and-layout)
5. [Step reveal (auto mode)](#5-step-reveal-auto-mode)
6. [Cell model: panels, rows, columns](#6-cell-model-panels-rows-columns)
7. [Interactive `type` overview](#7-interactive-type-overview)
8. [Scripted engine (`script`)](#8-scripted-engine-script)
9. [Borrow row + split-borrow animation](#9-borrow-row--split-borrow-animation)
10. [Pad borrow button + cell-click button panel (subtraction-only)](#10-pad-borrow-button--cell-click-button-panel-subtraction-only)
11. [Strike-through visual (donor-struck)](#11-strike-through-visual-donor-struck)
12. [Prop reference (all props)](#12-prop-reference-all-props)
13. [Callbacks and events](#13-callbacks-and-events)
14. [DOM, data attributes, and CSS](#14-dom-data-attributes-and-css)
15. [Grid cell (`gc`) units and fonts](#15-grid-cell-gc-units-and-fonts)
16. [Worked example: page 2 long subtraction `guided_flow_short`](#16-worked-example-page-2-long-subtraction-guided_flow_short)
17. [Troubleshooting](#17-troubleshooting)
18. [Related docs](#18-related-docs)

---

## 1. What it is

`LongSubtractionComponent` renders **column subtraction** for **two or three** non-negative integers (each **up to 5 digits**), with:

- **Simple** view: stacked digits, header row (place labels), divider line, difference.
- **Expanded** view: place labels, place-value row (e.g. 1000, 100, …), each operand as digit × place sums separated by `+`, divider, expanded difference.
- **Both** view: simple **left**, expanded **right**, advancing in **lock-step** on a shared step timeline.

It supports **passive animation** (`type: 'auto'`) and **interactive learning modes** (`guided`, `incorrect`, `fill-missing`) with optional **locked cells**, **callbacks**, and **UI overlays** (instruction bar, progress bar, number pad).

**Math:** `numbers[0] − numbers[1] − …` (first entry is the minuend; remaining entries are subtracted in order).

**Sign convention:**
- Operator: `−` (en-dash).
- Position: `'left'` (English `− b`) or `'right'` (Indonesian `b−`); `'auto'` picks `'right'` when `window.AppData.currentLanguage === 'id'`, else `'left'`.

---

## 2. Where it lives in the project

| Artifact | Path |
|----------|------|
| Component implementation | `js/components/long-subtraction-component.js` |
| Registry branch (`componentType`) | `js/components/elements-registry.js` (`LongSubtractionComponent`) |
| Global export | `window.LongSubtractionComponent` (object with `LongSubtractionComponent`, `LongSubtractionElement`) |
| Shared interactive CSS | `css/long-addition-interactive.css` (subtraction uses the same stylesheet) |
| PageConfig usage (page 2 subtraction) | `js/PageConfig.js` → `buildPage2LongSubtractionGuidedFlowShortScript` |
| Page-level constants | `js/constants.js` (`PAGE2_LONG_SUBTRACTION_NUMBERS`, `PAGE2_LONG_SUBTRACTION_MODE`, etc.) |

**HTML:** `index.html` / `index-en.html` must load (order matters):

1. React
2. `js/GridCellFontUtils.js` (or wherever `GridCellFontUtils` is defined)
3. `js/components/long-subtraction-component.js`
4. `js/components/elements-registry.js`
5. Stylesheet: `css/long-addition-interactive.css` (for interactive classes)

---

## 3. Minimal PageConfig wiring

Every long subtraction instance is a **`custom`** element whose `props.componentType` is **`LongSubtractionComponent`**.

```javascript
{
  id: "my-long-subtraction",
  name: "my-long-subtraction",
  type: "custom",
  coordinates: [400, 100, 1550, 790],   // grid coords → math-applet maps to % CSS
  zIndex: "var(--z-elevated)",
  props: {
    componentType: "LongSubtractionComponent",
    numbers: [2503, 1167],
    variant: "both",
    // …all other props optional…
  },
}
```

**Required for meaningful display:** `numbers` (array of 2–3 integers, minuend first). Everything else has defaults inside the component.

---

## 4. Variants and layout

### 4.1 `variant`

| Value | Meaning |
|-------|---------|
| `"simple"` | Header + operands + divider + difference only. |
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
| `"left"` | `−` to the **left** of the bottom operand row (common English layout). |
| `"right"` | `−` to the **right** of the bottom operand row (Indonesian style). |

**Note:** The expanded panel's operand rows always use `+` as the *internal* digit separator (each number's decomposition is additive, regardless of overall operation). The subtraction operator lives only on the simple panel — the expanded panel does **not** render a leading/trailing `−`.

### 4.4 Block widths: `leftBlock`, `middleBlock`, `rightBlock`

Optional layout overrides (px number or **`gc`** string resolved via `GridCellFontUtils`):

| Prop | Applies when | Role |
|------|--------------|------|
| `leftBlock` | `simple` or `both` | Target column slot width for simple stacked digits. |
| `rightBlock` | `expanded` or `both` | Target column slot width for expanded digit/label cards. |
| `middleBlock` | `variant === "both"` | Middle strip width between panels. |

### 4.5 Gaps and separators

| Prop | Role |
|------|------|
| `gap` | Default horizontal gap between simple columns; also used for vertical row gap if `rowGap` omitted. |
| `rowGap` | Vertical gap between row bands. |
| `columnGap` | Horizontal gap between simple columns. |
| `expandedColumnGap` | Horizontal gap in expanded panel (width of `+` columns + related separators). |

### 4.6 Panel outlines and debug grid

| Prop | Default | Role |
|------|---------|------|
| `showPanelBorders` | `false` | Orange 2px outlines around layout regions. |
| `showPanelGridLines` | `true` | When also `showPanelBorders`, draws orange 1px row/column guides. |
| `debugPanelLayout` | `false` | Logs `[LongSubtractionPanelLayout]`; sets `data-layout-debug-tag` on root. |

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
| `autoPlay` | `true` | If true, timeline runs; if false, starts paused. |
| `stepDurationMs` | `700` | Interval between step increments (min 50 ms). |
| `startDelayMs` | `0` | Delay before the first tick. |
| `loop` | `false` | Wrap to step 0 after `maxStep`. |

### 5.3 Step plan (`maxStep`)

Rough order:

- **`simple`:** header → each operand → divider → difference.
- **`expanded`:** header → place row → each operand → divider → difference.
- **`both`:** uses the longer expanded timeline; simple panel skips the "place" step (no-op visually).

`effectiveStep` drives **opacity / visibility** of each row fragment in `auto` mode. When a `script` is present, the script controls reveals instead.

### 5.4 Imperative API (`onReadyApi`)

After mount, the component calls **`onReadyApi(api)`** once with:

```typescript
type LongSubtractionApi = {
  play(): void;
  pause(): void;
  next(): void;
  prev(): void;
  goto(step: number): void;
  reset(): void;
  getStep(): number;
  getMaxStep(): number;
};
```

`play`/`pause`/`next`/`prev`/`goto`/`reset` affect **self** mode only.

---

## 6. Cell model: panels, rows, columns

### 6.1 Cell ID string

Every interactive cell is addressed by a stable string:

```text
<panel>:<row>:<column>
```

Examples:
- `simple:sum:O` — simple panel, difference row, Ones column.
- `expanded:operand-0:H` — expanded panel, minuend row, Hundreds column.
- `expanded:borrow:T` — expanded panel, **borrow row** (subtraction-specific), Tens column.

**Implementation:** `createCellId(panel, row, column)` in `long-subtraction-component.js`. `parseCellId(cellId)` does the reverse.

### 6.2 `panel`

| Value | Meaning |
|-------|---------|
| `simple` | Left/stacked region. |
| `expanded` | Right/decomposed region. |

### 6.3 `row`

| Value | Meaning |
|-------|---------|
| `header` | Place header row (TTh / Th / H / T / O labels). |
| `place` | Expanded place-value row (1000, 100, …). |
| `operand-0` | Minuend (top number) |
| `operand-1` | First subtrahend |
| `operand-2` | Optional second subtrahend (3-number subtraction) |
| `divider` | Horizontal line under operands. |
| `sum` | Difference row (the **answer**). The internal name is still `sum` for layout-engine parity with the addition component. |
| **`borrow`** | **Subtraction-specific:** above the operand rows in either panel. Used by `guided_flow_short` scripts and the split-borrow animation. Cell IDs: `simple:borrow:T`, `expanded:borrow:H`, etc. |

### 6.4 `column` (place keys)

Internal keys are drawn from:

```javascript
const PLACE_KEYS = ['TTh', 'Th', 'H', 'T', 'O'];
```

For **N** total columns, the visible slice is the **rightmost N** keys:

| totalCols | Columns (left → right) |
|-----------|-------------------------|
| 5 | TTh, Th, H, T, O |
| 4 | Th, H, T, O |
| 3 | H, T, O |

When authoring `lockedCells` / `incorrectCells` / `missingCells` / `guidedSteps` / `script`, the `column` string must match this key.

### 6.5 `lockedCells` pattern matching

```javascript
{ panel: "simple", row: "header" }            // entire header row on simple
{ panel: "simple", row: "operand-0" }         // entire minuend row
{ panel: "simple", row: "sum", column: "O" }  // single answer cell
```

If `column` is omitted, **all columns** in that panel+row are locked.

---

## 7. Interactive `type` overview

| `type` | User goal | Typical config |
|--------|-----------|----------------|
| `auto` (default) | Watch steps reveal | `mode`, `stepDurationMs`, optional `onStepChange` |
| `guided` | Follow prompts; click expected cells | `guidedSteps` (legacy) or `script` |
| `incorrect` | Find cells that are intentionally wrong | `incorrectCells`, `lockedCells` |
| `fill-missing` | Fill blanks with number pad; validate on external Check only | `missingCells`, `lockedCells` |
| `guided_flow_short` | Same runtime as `guided`; supply a shorter `script` in PageConfig | `script` |

Invalid `type` strings fall back to **`auto`**. In auto mode, passing interactive props (`incorrectCells`, `missingCells`, `guidedSteps`, `lockedCells`) emits a `console.warn`.

### 7.1 External Check button (`incorrect` + `fill-missing`)

Both modes listen for a window event:

```javascript
window.dispatchEvent(
  new CustomEvent('longSubtractionCheck', { detail: { id: '<component-id>' } })
);
```

- **`incorrect`:** Validates the current pending selection batch.
- **`fill-missing`:** Reads drafts from `cellValues`, validates every non-empty missing cell in one pass.

After Check:
- Correct cells get `la-cell--correct` (green tint + outline). Correct cells are also locked.
- Incorrect cells get `la-cell--incorrect` (salmon tint + outline).
- **No line-through** on correctly checked cells — this behavior was removed (previously incorrect mode struck through identified wrong tiles).

### 7.2 `fill-missing` — number pad and caps

- **No Submit** on the pad: digits append until column numeric max is reached.
- **Caps:** simple panel digits capped at 9; expanded panel by column: O 99, T 999, H 9999, Th 99999, TTh 999999.
- Tapping outside saves a draft (or discards if empty) and closes the pad.

---

## 8. Scripted engine (`script`)

The scripted engine is a unified runtime that drives all four `type` modes from a single ordered `script` array. When `script` is non-empty, it **overrides** the legacy `effectiveStep` / `guidedSteps` reveal logic. When absent, the legacy flows are preserved.

### Step shape (full whitelist)

```js
{
  stepId: 0,                                  // optional, for callbacks
  instruction: "We need to subtract these numbers.",
  instructionOnAnimate: null,                 // optional override during animation

  // Layout deltas added to the visible set at this step (cumulative).
  reveal: {
    panels: ["expanded"],                     // SCOPE for `rows`, not a wildcard
    panelsWildcard: ["simple"],               // true wildcard
    rows: ["operand-0", "borrow", "divider"],
    cells: [{ panel: "expanded", row: "borrow", column: "H" }],
    elements: ["operator-minus"]
  },

  // Optional cell highlight (la-cell--highlighted / yellow-blink).
  highlight: { panel: "expanded", row: "operand-0", column: "H" },
  highlightAppearance: "yellow-blink" | null,
  emphasize: [{ panel, row, column }],
  emphasizeContainer: { panel: "expanded", rows: ["operand-0"], paddingPx: 14, ... },

  // Source/target for animations.
  source: { panel: "expanded", row: "operand-0", column: "H" },
  target: { panel: "expanded", row: "borrow", column: "T" },
  secondSource: null,                         // converge-to-target uses two sources

  // The cell-level interaction the engine expects from the user.
  action: { type: "select-cell" | "enter-value" | "next",
            panel, row, column, expected: "5", maxNumericValue: 99 },

  // Per-step input-mode override (resolved from `guidedInputMode` if absent).
  inputMode: "type" | "reveal" | "choice",
  // Per-step validation override.
  validation: "per-entry" | "row-check" | "both" | "none",
  // For inputMode: "choice".
  choiceOptions: ["5", "50", "500"],

  // How to advance from this step.
  advance: { type: "next" | "tap-revealed" | "auto", delayMs: 1500 },

  // Declarative animation hints.
  animation: "split-borrow" | "transfer-source-to-target" | "converge-to-target" | null,

  // For split-borrow.
  split: { sumDigit: "400", carryDigit: "100" },

  // Phase 1 right/wrong validation (subtraction-only).
  borrowOption: "tens",                       // pad button label; renders if set
  borrowAction: "advance" | "wrong" | null,   // pad button click behavior
  digitsAlwaysWrong: false,                   // Check on typed value flagged wrong

  // Phase 2 cell-click button panel (subtraction-only).
  cellPanelTarget: { panel: "expanded", row: "operand-0", column: "H" },
  cellPanelOptions: [
    { label: "Borrow from this (Hundreds Place)", action: "split-borrow" },
    { label: "Borrow from Thousands Place", action: "wrong" },
  ],

  // Phase 3 strike-through (subtraction-only).
  strikeThroughOnDonor: true,

  // When true, clear the target cell's previous value when this step becomes active.
  resetTargetCell: false,
  // When true, cells revealed by this step show "?" until explicitly filled.
  revealWithPlaceholder: false,

  // Hand off cell handling to a legacy mode-specific handler.
  phase: "hunt" | "fill" | null,
}
```

### Visibility

- `reveal.panels: ["expanded"]` is a **scope** for `reveal.rows`. To wildcard the entire panel, use `reveal.panelsWildcard: ["expanded"]` or `reveal.all: true`.
- Row-level visibility is true whenever any of its cells is in the revealed set.
- Cell-level visibility within an already-visible row: cell renders only when its row was wildcard-revealed or the cell itself is revealed.

### Input modes

- **`type`** — opens the number-pad overlay; the user types the value and commits per script.
- **`reveal`** — user taps the highlighted source (or target); engine animates the value flying from source to target via a transient ghost element.
- **`choice`** — user picks from `step.choiceOptions` chips; tapped option commits.

All three resolve to the same internal `commitCellValue(cellId, value, { expected })` which runs validation and (for `per-entry`) auto-advances.

### Validation

- **`per-entry`** — validate each commit; correct answers auto-advance, wrong answers flash + clear.
- **`row-check`** — validation deferred until external Check.
- **`both`** — per-entry feedback plus a final row-check.
- **`none`** — accept any value.

### Advance mechanisms

- **`{ type: "next" }`** — instruction panel shows a Next ›/Done button.
- **`{ type: "tap-revealed" }`** — any click on a revealed element advances.
- **`{ type: "auto", delayMs }`** — engine auto-advances after the delay.
- Input steps: advance is implicit on commit (per-entry) or on Check (row-check).
- Animation steps: advance is implicit when the animation commits.

### Element selectors

- `panel:row` — full row, e.g. `simple:operand-0`.
- `panel:row:column` — single cell, e.g. `expanded:sum:O`.
- `element:<name>` — special elements such as `operator-minus`.
- `*` — wildcard everything.
- `expanded:*` — wildcard a panel.

---

## 9. Borrow row + split-borrow animation

### 9.1 The borrow row

`simple:borrow:*` and `expanded:borrow:*` cells sit **above** the operand rows in their respective panels. They are only allocated when:

- The script reveals any borrow cell (`reveal.cells` with `row: "borrow"`, or `reveal.rows: ["borrow"]`), **or**
- A script step's `target.row === 'borrow'`.

**Visibility rule (expanded panel):** the borrow row is allocated as soon as any borrow cell is in the revealed set, even before it has a value. This guarantees the cell exists in the DOM as a chip-animation destination.

**Sizing:** borrow cells render at the **same font size and card height** as digit cells in the expanded panel. The class `la-cell--borrow-place` adds `font-style: italic` and transparent background so the value reads like a place-value label.

### 9.2 What the borrow row holds

The borrow row stores each column's **effective post-operation value** so that consumers can apply the rule:

> Use the borrow row if it's populated; otherwise use operand-0.

- **Donor column** (the one giving 10): borrow row holds the **remainder** (operand − carry). Example: H donates 100, `operand-0:H = 500`, `borrow:H = 400`.
- **Receiver column** (the one getting 10): borrow row holds **operand + carry**. Example: O receives 10, `operand-0:O = 3`, `borrow:O = 13`.
- **Intermediate column** (chain link): same as receiver semantically. The borrow row was filled in a prior animation; the current animation may then read from it as a source and overwrite it with `before − carry`.

### 9.3 Split-borrow animation

When a script step has `animation: 'split-borrow'`, tapping the source (or, in the click-driven flow, the "Borrow from this" button on the cell panel) plays a three-phase animation:

1. **Rise** (500 ms) — the source value lifts off as a single overlay above the source cell.
2. **Morph** (2000 ms) — overlay text becomes `${remainder} + ${carryAmount}` (e.g., `400 + 100`).
3. **Split** (700 ms) — two chips fly apart: `carryDigit` to `target`, `remainder` to `expanded:borrow:{sourceColumn}`.

After commit:
- `scriptCellValues.set(borrow:{sourceColumn}, remainder)`.
- `scriptCellValues.set(targetId, operand_target + carry)` — for `target.row === 'borrow'` cells, the carry is **combined with the target column's operand** so the borrow row stores the final effective value.
- Both source column and target column's `operand-0` cells receive `cellStates: 'donor-struck'` (see §11).

### 9.4 Script step fields used by split-borrow

```js
{
  source: { panel: "expanded", row: "operand-0" | "borrow", column: "H" },
  target: { panel: "expanded", row: "borrow", column: "T" },
  split: { sumDigit: "400", carryDigit: "100" },
  animation: "split-borrow",
  strikeThroughOnDonor: true,                 // Phase 3 visual
}
```

**Cardinal rule:** `operand-0` cells are **never** written to via `scriptCellValues`. Their displayed value stays as the natural decomposition. The strike-through state is purely a visual marker; the cell content is preserved.

---

## 10. Pad borrow button + cell-click button panel (subtraction-only)

### 10.1 Pad borrow button (`borrowOption`)

When the number pad is open for an `inputMode: 'type'` step, the script can request an extra "Borrow from {place} place" button below the digit grid:

```js
{
  borrowOption: "tens",                       // string → renders the button
  borrowAction: "advance" | "wrong",          // click behavior
  digitsAlwaysWrong: true | false,            // typed value validation
}
```

- `borrowAction: 'advance'` (default when `borrowOption` is set) — closes the pad and advances the script.
- `borrowAction: 'wrong'` — plays the wrong sound, flashes the target as `missed`, doesn't advance. Used on no-borrow columns where the user shouldn't tap borrow.
- `digitsAlwaysWrong: true` — Check on any typed value flags it as wrong (red flash + sound + buffer clear). Used on borrow columns where the only correct action is the borrow button.

### 10.2 Cell-click button panel

`cellPanelTarget` + `cellPanelOptions` define a small floating panel anchored above the clicked cell:

```js
{
  cellPanelTarget: { panel: "expanded", row: "operand-0", column: "H" },
  cellPanelOptions: [
    { label: "Borrow from this (Hundreds Place)", action: "split-borrow" },
    { label: "Borrow from Thousands Place", action: "wrong" },
  ],
}
```

Click behavior per option:

- **`action: "advance"`** — closes the panel and advances the script.
- **`action: "wrong"`** — flashes the anchor cell + plays wrong sound; panel stays open so the user can pick the other option.
- **`action: "split-borrow"`** — closes the panel and **directly triggers** the split-borrow animation defined on the same step (`source` / `target` / `split` / `strikeThroughOnDonor`). The animation auto-advances the script on commit. No intermediate "click the source cell" step is required.

### 10.3 Cell-panel dimming

When the cell-panel overlay is open, all cells except `cellPanelTarget` receive `la-cell--script-numpad-dimmed` (same dim treatment as the number-pad overlay). The anchor cell gets `la-cell--script-numpad-focus`.

---

## 11. Strike-through visual (donor-struck)

When `strikeThroughOnDonor: true` and a split-borrow animation commits, both the source column's `operand-0` cell and the target column's `operand-0` cell receive `cellStates: 'donor-struck'`. The resulting CSS class `la-cell--donor-struck` adds:

```css
.la-cell--donor-struck {
  position: relative;
  text-decoration: none;
  opacity: 0.85;
}
.la-cell--donor-struck::after {
  /* diagonal red bar bottom-left → top-right, 5px thick, with subtle glow */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top right,
    transparent calc(50% - 2.5px),
    rgba(220, 38, 38, 0.98) calc(50% - 2.5px),
    rgba(220, 38, 38, 0.98) calc(50% + 2.5px),
    transparent calc(50% + 2.5px)
  );
  filter: drop-shadow(0 0 1.5px rgba(220, 38, 38, 0.6));
  pointer-events: none;
  z-index: 3;
}
```

(Lives in `css/long-addition-interactive.css`.)

---

## 12. Prop reference (all props)

### 12.1 Identity and placement (host-supplied)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | `useId()` | HTML `id` on root div. |
| `elementName` | string | — | Used as `data-element-name` and fallback id. |
| `position` | object | — | From layout pipeline. Do not hand-author. |
| `elementZIndex` | number \| string | `402` | Root `z-index` if not overridden by `position.css`. |
| `processedStyles` | object | — | Pipeline-merged styles. |

### 12.2 Problem definition

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numbers` | `number[]` | `[0,0]` | 2–3 entries. First is the **minuend**; remaining are subtracted in order. Negatives clamped to 0; floored; max 99999; array padded to length 2 if shorter. |

### 12.3 Visual variant and i18n

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"simple"` \| `"expanded"` \| `"both"` | `"simple"` | Which layout(s) to render. |
| `placeValueRow` | `"full"` \| `"skip-ones"` | `"full"` | Whether the expanded place row includes ones. |
| `operatorPosition` | `"auto"` \| `"left"` \| `"right"` | `"auto"` | `−` placement. |
| `placeLabelsI18nKey` | string | `"common.longAddition.placeLabels"` | Dot path for `window.i18n.t(...)`. (Subtraction reuses the shared place-label/key namespace.) |
| `placeLabels` | object | — | Per-key fallback if i18n missing. |
| `placeColorsI18nKey` | string | `"common.longAddition.placeColors"` | Dot path to color map. |
| `colors` | object | — | Explicit overrides `{ TTh, Th, H, T, O: "#rrggbb" }`. |

### 12.4 Typography and card metrics

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `digitFontSize` | number \| string | (derived) | Operand + difference digits. `gc` supported. |
| `placeFontSize` | number \| string | (derived) | Expanded place row. |
| `headerFontSize` | number \| string | (derived) | Header row. |
| `digitFontStyle` | object | `{ fontWeight: "bold" }` | Allowed keys: weight, style, family, textDecoration\*, letterSpacing, fontVariant\*. |
| `placeFontStyle` | object | `{ fontWeight: "bold" }` | Same. |
| `headerFontStyle` | object | `{ fontWeight: "bold" }` | Same. |
| `textWidthBuffer` | number \| string | `10` | Extra px (or `gc`) added to measured text width per card. |
| `cardPadding` | number \| string | — | Text-width fallback. |
| `cardRadius` | number \| string | (derived) | Border radius of digit cards. |
| `lineThickness` | number \| string | (derived) | Divider line thickness. |
| `lineColor` | string | `"#FFFFFF"` | Divider color. |

### 12.5 Spacing and panel blocks

(See §4.4–4.5.)

| Prop | Type |
|------|------|
| `gap` / `rowGap` / `columnGap` / `expandedColumnGap` | number \| string |
| `leftBlock` / `middleBlock` / `rightBlock` | number \| string |

### 12.6 Reveal / timeline

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"self"` \| `"controlled"` | `"self"` | Step-index ownership. |
| `currentStep` | number | — | Controlled mode: visible step. |
| `autoPlay` | boolean | `true` | Self mode: start unpaused if true. |
| `stepDurationMs` | number | `700` | Self mode tick. |
| `startDelayMs` | number | `0` | Initial delay. |
| `loop` | boolean | `false` | Wrap to step 0. |

### 12.7 Overlays / debug

| Prop | Type | Default |
|------|------|---------|
| `debugPanelLayout` | boolean | `false` |
| `showPanelBorders` | boolean | `false` |
| `showPanelGridLines` | boolean | `true` |

### 12.8 Interactive: `type` and data

| Prop | Type | Default | When used |
|------|------|---------|-----------|
| `type` | string | `"auto"` | Selects interactive mode. |
| `lockedCells` | `LockRule[]` | — | Non-clickable regions. |
| `incorrectCells` | `IncorrectCell[]` | — | `type === 'incorrect'`. |
| `missingCells` | `MissingCell[]` | — | `type === 'fill-missing'`. |
| `impactedTilesCount` | number | — | Auto-pick wrong/missing tiles when explicit list is empty. |
| `impactTiles` | `string[]` | — | Filter for auto-impact (`'simple-sum'`, `'expanded-operand'`, `'expanded-sum'`). |
| `incorrectProgressPanelCoordinates` | `[x1,y1,x2,y2]` | — | Portal incorrect progress UI to a grid region. |
| `incorrectOverlayPanelStyle` | object | — | Shallow-merged styles for the portaled bar. |
| `fillMissingProgressPanelCoordinates` | `[x1,y1,x2,y2]` | — | Same for fill-missing. |
| `fillMissingOverlayPanelStyle` | object | — | Same. |
| `instructionTargetId` | string | — | DOM id where instruction text is portaled. |

### 12.9 Scripted engine

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `script` | `Step[]` | — | When non-empty, overrides legacy reveal logic. |
| `guidedSteps` | `Step[]` | — | Legacy guided format; normalized into `script` if present. |
| `guidedInputMode` | `"reveal"` \| `"type"` \| `"choice"` | `"reveal"` | Default per-step input mode. |
| `guidedValidation` | `"per-entry"` \| `"row-check"` \| `"both"` \| `"none"` | `"per-entry"` | Default validation. |
| `convergeFlightDurationMs` | number | `4000` | Duration of `converge-to-target` ghost flight. |

### 12.10 Callbacks

| Prop | Signature | When |
|------|-----------|------|
| `onReadyApi` | `(api) => void` | Once mounted (and on dependency changes). |
| `onStepChange` | `(step: number) => void` | Self mode: each step tick. |
| `onCellClick` | `(cellId: string) => void` | Interactive cell click. |
| `onCellFocus` | `(cellId: string) => void` | Fill-missing pad open. |
| `onCellBlur` | `(cellId: string) => void` | Pad closed after save/dismiss. |
| `onTypeComplete` | `(stats) => void` | Incorrect: all errors found. Fill-missing: all blanks correct after Check. |
| `onScriptStep` | `({ stepIndex, step, totalSteps }) => void` | Each active step change. |
| `onScriptComplete` | `({ totalSteps, timeElapsed }) => void` | Last step advanced past. |

---

## 13. Callbacks and events

### 13.1 Custom events dispatched

| Event | Detail | When |
|-------|--------|------|
| `longSubtractionStepChanged` | `{ id, step }` | Self mode: every step change. |

### 13.2 Custom events listened for

| Event | Detail | Effect |
|-------|--------|--------|
| `longSubtractionCheck` | `{ id }` | Triggers validation in `incorrect` / `fill-missing`. |

**Important:** `detail.id` must match the component's `id` / `elementName` / generated id.

---

## 14. DOM, data attributes, and CSS

### 14.1 Root

```html
<div
  data-element-name="page2-long-subtraction"
  data-layout-debug-tag="page2-long-subtraction"
  class="long-addition-component"
  data-type="guided_flow_short"
  ...
>
```

(Yes, the class name is `long-addition-component` — both addition and subtraction components share the same shell class for CSS reuse. The `data-type` attribute distinguishes interactive modes.)

### 14.2 Per-cell attributes

```html
<div
  class="la-cell la-cell--clickable la-cell--highlighted ..."
  data-cell-id="expanded:operand-0:H"
  data-has-override="true"
  ...
>500</div>
```

`data-cell-id` is the stable string from §6.1. `data-has-override` is set when `scriptCellValues` or `cellValueOverrides` holds a value for this cell.

### 14.3 Key CSS classes

| Class | Purpose |
|-------|---------|
| `la-cell` | Base cell |
| `la-cell--clickable` | Interactive cell in non-locked state |
| `la-cell--locked` | Locked (not clickable) |
| `la-cell--highlighted` | Active script highlight |
| `la-cell--highlight-yellow-blink` | Pulsing yellow highlight |
| `la-cell--target-blink` | `converge-to-target` blink |
| `la-cell--flip-reveal` | `converge-to-target` post-flip flash |
| `la-cell--correct` | Validated correct (incorrect/fill-missing modes) |
| `la-cell--incorrect` | Validated wrong (red salmon tint) |
| `la-cell--script-source-released` | Source cell after gesture, before animation |
| `la-cell--emphasis` | Dashed border (script `emphasize`) |
| `la-cell--carry` | Carry-row chip (used by guided flows; legacy from addition) |
| `la-cell--carry-place` / `la-cell--borrow-place` | Expanded right-block carry/borrow values (text-only, place-colored, italic) |
| `la-cell--donor-struck` | Diagonal strike on donor operand digit |
| `la-cell--script-numpad-focus` / `la-cell--script-numpad-dimmed` | Number-pad / cell-panel focus + dim |
| `la-emphasis-container` | Dashed container around a group of cells |

---

## 15. Grid cell (`gc`) units and fonts

Lengths can be given as plain numbers (px) or `Ngc` strings. `gc` resolves to the current grid cell size via `GridCellFontUtils`. Used for `digitFontSize`, `placeFontSize`, `headerFontSize`, `textWidthBuffer`, `cardPadding`, `cardRadius`, `lineThickness`, `gap`, `rowGap`, `columnGap`, `expandedColumnGap`, `leftBlock`, `middleBlock`, `rightBlock`.

When font sizes are set explicitly via props, the component's font-clamp logic is skipped so configured sizes take effect verbatim.

---

## 16. Worked example: page 2 long subtraction `guided_flow_short`

**Source:** `js/PageConfig.js` → `buildPage2LongSubtractionGuidedFlowShortScript`.

For `numbers = [2503, 1167]` (chain `[H, T, O]`, T = 0 intermediate):

```text
0  intro                                — reveal simple operands + −, tap-revealed
1  header                               — reveal simple header, tap-revealed
2  decompose 1 focus                    — emphasize simple operand-0, tap-revealed
3  decompose 1 done                     — reveal expanded header + operand-0, auto 900ms
4  decompose 2 focus                    — emphasize simple operand-1, tap-revealed
5  decompose 2 done                     — reveal expanded operand-1 + divider, auto 1100ms
6  ones columnInput-with-borrow         — pad opens with "Borrow from tens place" button.
                                          Typing wrong → red flash. Borrow → advance.
7  escalate at operand-0:T              — cellPanel with [wrong "this", advance "hundreds"]
8  donor at operand-0:H                  — cellPanel with [split-borrow "this", wrong "thousands"]
                                          On "this" → animation H → borrow:T (commit:
                                          borrow:H = 400, borrow:T = 100, donor-struck on H + T)
9  going-down at borrow:T                — cellPanel with [split-borrow "this", wrong "hundreds"]
                                          On "this" → animation borrow:T → borrow:O (commit:
                                          borrow:T = 90, borrow:O = 13, donor-struck on T + O)
10 follow-up ones columnInput            — pad opens (digits only). Type 6 → Check.
11 tens columnInput                      — pad opens. Type 30 → Check.
12 hundreds columnInput                  — pad opens. Type 300 → Check.
13 thousands columnInput                 — pad opens (no borrow button — leftmost). Type 1000 → Check.
14 bring-back reveal                     — reveal simple:sum cells as ? placeholders.
15 transfer Th → simple:sum:Th           — tap source, animate.
16 transfer H  → simple:sum:H            — tap source, animate.
17 transfer T  → simple:sum:T            — tap source, animate.
18 transfer O  → simple:sum:O            — tap source, animate.
19 final                                  — "2503 − 1167 = 1336. Great work!"
```

**Math interpretation per column (use borrow row if populated, else operand):**

- **O:** borrow:O = 13. 13 − 7 = **6** ✓
- **T:** borrow:T = 90.  90 − 60 = **30** ✓
- **H:** borrow:H = 400. 400 − 100 = **300** ✓
- **Th:** operand 2000 (untouched). 2000 − 1000 = **1000** ✓

---

## 17. Troubleshooting

### Borrow row doesn't show / chip flies to wrong cell

- Ensure your script's clickToSplit / animation-bearing cellPanel step reveals **both** the source's borrow row cell and the target's. The component pre-populates the source/target borrow cells with a space placeholder on `split-borrow` button click, but explicit reveal in the script is recommended.
- Check `expandedBorrowRowVisible` — it returns true as soon as any borrow cell is in the revealed set (no value required).

### Strike-through doesn't appear

- Confirm `strikeThroughOnDonor: true` on the animation step.
- After commit, both source-column and target-column `operand-0` cells should receive `cellStates: 'donor-struck'`. CSS lives in `css/long-addition-interactive.css`.

### "Borrow from this" doesn't run the animation

- The cellPanel option must use `action: "split-borrow"`.
- The same script step must carry `animation: "split-borrow"` + `source` + `target` + `split.sumDigit` + `split.carryDigit`.

### Extra `−` showing in Indonesian incorrect/fill-missing

- The expanded panel's trailing `−` was removed (the simple panel's `−` is the only operator). If you see an extra, check for stale CSS caching or another place setting `trailingPlus`.

### `donor-struck` showing on correctly-checked tiles

- This was an old behavior (line-through on identified-correct cells in `incorrect` mode). It has been removed; check `css/long-addition-interactive.css` and the inline `identifiedStyle` if you see it return.

### Cell-panel doesn't open on click

- The cell must be in `revealedSet` (script's `reveal.cells` or `reveal.rows`).
- The cell must not be locked (`lockedCells` / mode-specific locks).
- The cellPanel branch in `handleScriptCellClick` runs **before** `tap-revealed`, so a cellPanel step's anchor cell won't accidentally advance via tap-revealed.

### Number pad doesn't show borrow button

- The script step must set `borrowOption: "<placename>"` (string, not null).
- `normalizeScript` whitelists `borrowOption`, `borrowAction`, `digitsAlwaysWrong`, `cellPanelTarget`, `cellPanelOptions`, `strikeThroughOnDonor`.

---

## 18. Related docs

- `docs/long-addition-component-reference.md` — sister component; shares vocabulary, layout, scripted engine.
- `docs/long-addition-interactive-types-spec.md` — original spec for `type` modes (most concepts apply to subtraction with `+` → `−` and `carry` → `borrow`).
- `js/PageConfig.js` — the canonical authoring example (page 2 subtraction `guided_flow_short`).
- `css/long-addition-interactive.css` — shared CSS for both components.
