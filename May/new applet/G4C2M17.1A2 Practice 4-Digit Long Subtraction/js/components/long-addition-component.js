/**
 * Long Addition Component - React 18 Optimized
 *
 * A reusable visual component that renders stacked column addition for two or
 * three numbers (each up to 5 digits) using colored digit cards.
 *
 * Variants:
 *   - 'simple'   : just the stacked addition (header row, operands, divider, sum)
 *   - 'expanded' : the place-value expansion form (header, place-values row,
 *                  each operand expanded as digit*place + ..., divider, sum expanded)
 *   - 'both'     : simple on the left, expanded on the right, advancing in lock-step
 *
 * Reveal modes:
 *   - 'self'       : the component drives a step timer (autoPlay/stepDurationMs)
 *   - 'controlled' : the parent passes currentStep and the component renders that state
 *
 * Operator position:
 *   - 'auto'  : reads window.AppData.currentLanguage; 'id' -> 'right', else 'left'
 *   - 'left'  : '+' on the left of the bottom operand row (English style)
 *   - 'right' : '+' on the right of the bottom operand row (Indonesian style)
 *
 * Place-value header text (Th / H / T / O …):
 *   - `placeLabelsI18nKey` (default `common.longAddition.placeLabels`): dot path passed
 *     to `window.i18n.t(...)`. Strings live in data.js only. Optional `placeLabels`
 *     object merges as fallback per key when a translation entry is missing.
 *   - On language change, `appLanguageChanged` is dispatched from i18n.setLanguage
 *     so labels refresh.
 *
 * Colors per place column:
 *   - `placeColorsI18nKey` (default `common.longAddition.placeColors`): i18n object in
 *     data.js, merged after built-in defaults. Optional `colors` prop overrides per key.
 *
 * Defaults: TTh purple, Th green, H yellow, T blue, O red.
 *
 * Font sizes (optional; numbers or strings with `gc` via GridCellFontUtils):
 *   - `digitFontSize` — operand and sum digits (stacked + expanded value cards).
 *   - `placeFontSize` — place-value number row (1000, 100, …) and separators; default
 *     scales from row height when omitted.
 *   - `headerFontSize` — Th / H / T / O header row; defaults to `placeFontSize` when omitted.
 *
 * `textWidthBuffer` (optional, number px or string with px/gc): horizontal padding added to
 * canvas-measured text width for each card (default 10). If omitted, `cardPadding` is used
 * as a fallback when set; otherwise 10px.
 *
 * `gap` (optional, px or gc): default horizontal gap between simple column slots (`width`
 * for gc). When `columnGap` is set, horizontal spacing uses `columnGap` instead. When
 * `rowGap` is omitted, the same prop is also read with `paddingTop` for vertical space
 * between rows (default 10px if unset).
 *
 * `rowGap` (optional, number px or string px/gc): vertical gap between stacked row bands.
 * When set, overrides the vertical part of `gap`. Row band height is capped by column
 * chip geometry so extra container height is not converted into taller rows (which would
 * nearly cancel changes to row gap). Also read from `processedStyles.rowGap` if the
 * top-level prop is missing.
 *
 * `columnGap` (optional, px or gc): horizontal gap between simple stacked columns (`width`
 * for gc). When set, overrides the horizontal part of `gap` for the simple panel only.
 * Also read from `processedStyles.columnGap` if the top-level prop is missing.
 *
 * `expandedColumnGap` (optional, px or gc): target horizontal gap for the **expanded**
 * panel — separator width between digit slots and for `=` / `+` (`width` for gc). When
 * set, that value is used (floor, min 4px); column slots may shrink to **22px** minimum
 * (instead of 36) so large values like `50gc` are not always capped to the same max-sep
 * formula. When omitted, layout uses the default ratio (sep ≈ 0.4 × slot). Also read from
 * `processedStyles.expandedColumnGap` if the top-level prop is missing.
 *
 * Column width overrides (optional, px or gc, `width` for gc). When set, layout refits
 * so the row still fits the region (may shrink other dimensions):
 *   - `leftBlock` — slot width for the **simple** (left) stacked columns.
 *   - `rightBlock` — slot width for **expanded** digit / label cards.
 *   - `middleBlock` — when `variant` is **`both`**, width of the **middle strip** (px / gc as
 *     `width`, default **24px**): holds the leading **`=`** for expanded operand/sum rows and
 *     any horizontal space between the simple and digit columns (the **`=`** is not in the
 *     right block). **`+`** separators stay in the expanded panel (`expandedColumnGap` / auto).
 *   Also read from `processedStyles.leftBlock` / `rightBlock` / `middleBlock` when missing.
 *
 * `showPanelBorders` (optional, boolean): when true, draws **orange** 2px outlines around the
 * left / middle / right layout regions (`both` mode) and simple / expanded single-region frames.
 *
 * `showPanelGridLines` (optional, boolean, default **true**): when true together with
 * `showPanelBorders`, draws **orange** 1px row and column guides inside each region. Set to
 * **false** to keep panel outlines only (no internal grid).
 *
 * `debugPanelLayout` (optional, boolean): when true, logs **`[LongAdditionPanelLayout]`** to
 * the console (filter bar) with panel sizes vs block props (`data-layout-debug-tag` on root).
 *
 * === INTERACTIVE TYPES (Phase 1+) ===
 *
 * `type` (optional, string, default **'auto'**): Controls interaction mode.
 *   - **'auto'** (default): Passive demonstration. Steps reveal via `mode` / timer. All cells locked.
 *   - **'guided'**: Step-by-step prompts; uses `guidedSteps` (or unified `script`).
 *   - **'guided_flow_short'**: Same engine as guided; supply a shorter `script` in PageConfig.
 *   - **'incorrect'**: Intentional wrong digits from `incorrectCells`. User selects up to N tiles,
 *     then presses the page **Check** control (`CustomEvent('longAdditionCheck', { detail: { id } })`
 *     with `id` matching this instance). Selections validate on Check. Optional `impactedTilesCount` /
 *     `impactTiles` auto-pick wrong tiles when `incorrectCells` is empty. Progress UI can be
 *     portaled with `incorrectProgressPanelCoordinates` + `incorrectOverlayPanelStyle` (see `constants.js`).
 *   - **'fill-missing'**: Blanks from `missingCells`. Tap a blank → number pad (no Submit); digits
 *     obey per-column caps (`getFillMissingNumericMax`: simple max 9; expanded O…TTh up to 99…999999).
 *     Closing the pad **saves a draft** into the cell; correctness runs **only on Check** (same
 *     `longAdditionCheck` event as incorrect). After Check: wrong → salmon tint + outline, right →
 *     green tint + outline; **correct cells are locked** (not clickable). Digit **color** stays the
 *     place-value column color from `colors` / i18n. Optional `fillMissingProgressPanelCoordinates` /
 *     `fillMissingOverlayPanelStyle` for the teal progress strip (often hidden via CSS on some pages).
 *
 * **Interactive props (ignored when `type === 'auto'`):**
 *   - `lockedCells` — lock patterns (see `isCellLocked` in source).
 *   - `incorrectCells` — incorrect mode: `{ panel, row, column, displayValue, correctValue? }`.
 *   - `missingCells` — fill-missing: `{ panel, row, column, correctValue, acceptableValues?, hint?, id? }`.
 *   - `guidedSteps` — legacy guided steps; normalized into `script` when present.
 *   - `script` — scripted engine (reveal, highlights, `enter-value`, warm-up `phase: 'hunt'|'fill'`).
 *   - `guidedInputMode`, `guidedValidation` — defaults for script `enter-value` / validation.
 *   - `impactedTilesCount`, `impactTiles` — incorrect / fill-missing auto-impact when explicit lists empty.
 *   - `incorrectProgressPanelCoordinates`, `incorrectOverlayPanelStyle`,
 *     `fillMissingProgressPanelCoordinates`, `fillMissingOverlayPanelStyle` — overlay bars.
 *   - `instructionTargetId` — optional DOM id for live instruction / Check feedback text.
 *
 * **Callbacks:**
 *   - `onCellClick`, `onCellFocus` (fill-missing pad open), `onCellBlur` (pad closed after save/dismiss).
 *   - `onTypeComplete(stats)` — incorrect when all errors found (may include `triggeredBy: 'check-button'`);
 *     fill-missing when all blanks correct after Check (`filledCells`, `correctCells`, `incorrectAttempts`, …).
 *   - `onScriptStep`, `onScriptComplete` — script engine hooks.
 *
 * **Backward compatibility:** Default `type: 'auto'`. Unknown `type` values fall back to `'auto'`.
 *
 * === END INTERACTIVE TYPES ===
 *
 * Font styling (optional plain objects; merged over defaults, default fontWeight `bold`):
 *   - `headerFontStyle` — Th / H / T / O labels (simple + expanded).
 *   - `placeFontStyle` — place-value number row (1000, 100, …) in expanded view.
 *   - `digitFontStyle` — operand digits, sums, expanded value cards, `+` / `=`.
 *   Allowed keys: fontWeight, fontStyle, fontFamily, textDecoration*, letterSpacing,
 *   fontVariant, fontVariantNumeric.
 *
 * Card shape:
 *   - **Height** (row band): chip height = min(row band height, column width), with the
 *     same height on simple and expanded when `variant` is `both` (shared chip height).
 *   - **Width**: each card is `measureText(label) + buffer`, capped by the column slot
 *     width, then centered in the slot. Set `textWidthBuffer` (or fallback `cardPadding`)
 *     to tune extra horizontal space around the measured text.
 *   - `cardRadius`: px or gc; if omitted, radius scales from the chip height.
 */

// Dependencies: GridCellFontUtils should be loaded before this file.

(() => {
  /** Filter DevTools console with this string to see panel sizes vs `leftBlock` / `middleBlock` / `rightBlock`. */
  const LONG_ADDITION_PANEL_LAYOUT_LOG = '[LongAdditionPanelLayout]';

  const PLACE_KEYS = ['TTh', 'Th', 'H', 'T', 'O'];
  const PLACE_VALUES = [10000, 1000, 100, 10, 1];

  // ===== INTERACTIVE TYPES: Cell Identification System =====
  
  /**
   * Creates a unique cell identifier for interaction tracking.
   * @param {string} panel - 'simple' | 'expanded'
   * @param {string} row - 'header' | 'place' | 'operand-0' | 'operand-1' | 'sum'
   * @param {string} column - 'TTh' | 'Th' | 'H' | 'T' | 'O'
   * @returns {string} Encoded cell ID like "simple:operand-0:T"
   */
  const createCellId = (panel, row, column) => {
    return `${panel}:${row}:${column}`;
  };

  /**
   * Parses a cell ID back into its components.
   * @param {string} cellId - e.g. "simple:operand-0:T"
   * @returns {{ panel: string, row: string, column: string } | null}
   */
  const parseCellId = (cellId) => {
    if (!cellId || typeof cellId !== 'string') return null;
    const parts = cellId.split(':');
    if (parts.length !== 3) return null;
    return { panel: parts[0], row: parts[1], column: parts[2] };
  };

  /**
   * Fill-missing: max numeric entry by panel + place column.
   * Simple (left): single-digit cap 9. Expanded (right): by magnitude of place column.
   */
  const getFillMissingNumericMax = (panel, column) => {
    if (panel === 'simple') return 9;
    if (panel !== 'expanded') return Infinity;
    switch (column) {
      case 'O':
        return 99;
      case 'T':
        return 999;
      case 'H':
        return 9999;
      case 'Th':
        return 99999;
      case 'TTh':
        return 999999;
      default:
        return Infinity;
    }
  };

  /**
   * Checks if a cell is locked (not clickable) based on type and config.
   * @param {string} cellId
   * @param {string} type - 'auto' | 'guided' | 'incorrect' | 'fill-missing'
   * @param {Array} lockedCells - Array of lock patterns
   * @param {boolean} [incorrectAllFound] - when true, incorrect mode locks every cell
   * @returns {boolean}
   */
  const isCellLocked = (cellId, type, lockedCells = [], incorrectAllFound = false) => {
    if (type === 'auto') return true; // All cells locked in auto mode
    
    const parsed = parseCellId(cellId);
    if (!parsed) return true;

    if (type === 'incorrect' && incorrectAllFound) return true;

    // Incorrect mode: stacked addends in the left (simple) block are not hunted;
    // only expanded tiles and the simple answer row participate.
    if (
      type === 'incorrect' &&
      parsed.panel === 'simple' &&
      typeof parsed.row === 'string' &&
      parsed.row.startsWith('operand-')
    ) {
      return true;
    }

    // Incorrect / fill-missing: place labels (both panels) and expanded 1000/100/… row are not interactive.
    if (type === 'incorrect' || type === 'fill-missing') {
      if (
        parsed.row === 'header' &&
        (parsed.panel === 'simple' || parsed.panel === 'expanded')
      ) {
        return true;
      }
      if (parsed.row === 'place' && parsed.panel === 'expanded') {
        return true;
      }
    }

    // Check explicit locked cells
    for (const lock of lockedCells) {
      // Full match
      if (lock.panel === parsed.panel && lock.row === parsed.row && 
          (!lock.column || lock.column === parsed.column)) {
        return true;
      }
    }
    
    return false;
  };

  /**
   * Interactive types configuration validator.
   */
  const validateInteractiveType = (type) => {
    const validTypes = ['auto', 'guided', 'guided_flow_short', 'incorrect', 'fill-missing'];
    return validTypes.includes(type) ? type : 'auto';
  };

  const FONT_STYLE_KEYS = new Set([
    'fontWeight',
    'fontStyle',
    'fontFamily',
    'textDecoration',
    'textDecorationLine',
    'textDecorationStyle',
    'textDecorationColor',
    'letterSpacing',
    'fontVariant',
    'fontVariantNumeric',
  ]);

  const mergeUserFontStyle = (defaults, userProp) => {
    const base = { ...(defaults && typeof defaults === 'object' ? defaults : {}) };
    if (!userProp || typeof userProp !== 'object' || Array.isArray(userProp)) return base;
    for (const [k, v] of Object.entries(userProp)) {
      if (FONT_STYLE_KEYS.has(k) && v != null && v !== '') base[k] = v;
    }
    return base;
  };
  const DEFAULT_COLORS = {
    TTh: '#A78BFA',
    Th: '#22C55E',
    H: '#FACC15',
    T: '#3B82F6',
    O: '#EF4444',
  };
  const CARD_BG = '#0E1E33';
  /** Fill-missing: active entry tile (must match inline styles — CSS alone loses to CARD_BG / place color). */
  const FILL_MISSING_FOCUS_BG = '#FCD34D';
  const FILL_MISSING_FOCUS_FG = '#000000';

  const getAppCurrentLanguage = () => {
    if (typeof window !== 'undefined' && window.AppData && window.AppData.currentLanguage) {
      return window.AppData.currentLanguage;
    }
    if (typeof AppData !== 'undefined' && AppData && AppData.currentLanguage) {
      return AppData.currentLanguage;
    }
    return 'en';
  };

  const resolveOperatorPosition = (op) => {
    if (op === 'left' || op === 'right') return op;
    const lang = getAppCurrentLanguage();
    return lang === 'id' ? 'right' : 'left';
  };

  const sanitizeNumbers = (arr) => {
    if (!Array.isArray(arr)) return [0, 0];
    const cleaned = arr
      .map((n) => {
        const v = Number(n);
        if (!Number.isFinite(v) || v < 0) return 0;
        return Math.min(99999, Math.floor(v));
      })
      .slice(0, 3);
    while (cleaned.length < 2) cleaned.push(0);
    return cleaned;
  };

  // Pad number to `width` digits, returning array of digit characters (left -> right).
  const digitsOf = (n, width) => String(n).padStart(width, ' ').slice(-width).split('');

  const placeKeyForColumn = (colIndex, totalCols) => {
    // colIndex is 0-based from the left. For totalCols=4: [Th,H,T,O]; totalCols=5: [TTh,Th,H,T,O]
    const offset = PLACE_KEYS.length - totalCols; // 4 cols => offset 1, 5 cols => 0
    return PLACE_KEYS[colIndex + offset];
  };

  const placeValueForColumn = (colIndex, totalCols) => {
    const offset = PLACE_VALUES.length - totalCols;
    return PLACE_VALUES[colIndex + offset];
  };

  // Convert a gc-aware token to px string for inline styles.
  const fetchI18nObject = (dotKey) => {
    if (!dotKey || typeof dotKey !== 'string') return {};
    try {
      if (
        typeof window !== 'undefined' &&
        window.i18n &&
        typeof window.i18n.t === 'function'
      ) {
        const raw = window.i18n.t(dotKey);
        if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
      }
    } catch (_) {
      /* ignore */
    }
    return {};
  };

  /** Dot-key string lookup with `{param}` interpolation (same as PageConfig `getI18nText`). */
  const translateI18nKey = (key, params = {}) => {
    try {
      if (
        typeof window !== 'undefined' &&
        window.i18n &&
        typeof window.i18n.t === 'function'
      ) {
        return window.i18n.t(key, params);
      }
    } catch (_) {
      /* ignore */
    }
    return key;
  };

  /** @returns {number[] | null} */
  const normalizeProgressPanelGridCoords = (raw) => {
    if (!Array.isArray(raw) || raw.length !== 4) return null;
    const n = raw.map(Number);
    if (!n.every((v) => Number.isFinite(v))) return null;
    return n;
  };

  /** Same `left/top/width/height` % as other page elements (via gridPositions). */
  const cssFromProgressPanelGridCoords = (coords4) => {
    if (!coords4) return null;
    try {
      if (
        typeof window !== 'undefined' &&
        window.gridPositions &&
        typeof window.gridPositions.convertToCSS === 'function'
      ) {
        const r = window.gridPositions.convertToCSS(
          coords4,
          'long-addition-progress',
          'page',
          'custom'
        );
        if (r && r.css && typeof r.css === 'object') return { ...r.css };
      }
    } catch (_) {
      /* ignore */
    }
    return null;
  };

  // `propertyName` is passed to GridCellFontUtils.convertGcToPixels (e.g. 'fontSize', 'width', 'borderRadius').
  const toPx = (val, propertyName) => {
    if (val == null) return undefined;
    if (typeof val === 'number') return `${val}px`;
    if (typeof val !== 'string') return val;
    if (val.endsWith('gc')) {
      try {
        if (window.GridCellFontUtils && window.GridCellFontUtils.convertGcToPixels) {
          return window.GridCellFontUtils.convertGcToPixels(
            val,
            propertyName || 'fontSize'
          );
        }
      } catch (_) {
        /* ignore */
      }
    }
    return val;
  };

  /** @type {HTMLCanvasElement|undefined} */
  let measureCanvas;
  /** @type {CanvasRenderingContext2D|null|undefined} */
  let measureCtx;
  const getMeasureCtx = () => {
    if (typeof document === 'undefined') return null;
    if (!measureCanvas) {
      measureCanvas = document.createElement('canvas');
      measureCtx = measureCanvas.getContext('2d');
    }
    return measureCtx;
  };

  /**
   * Approximate rendered text width in px (bold label / digit cards).
   * @param {string} text
   * @param {number} fontSizePx
   * @param {Record<string, unknown>} fontStyleObj merged font style (fontWeight, fontFamily)
   */
  const measureLabelWidthPx = (text, fontSizePx, fontStyleObj) => {
    const s = text != null ? String(text) : '';
    if (!s) return 0;
    if (!Number.isFinite(fontSizePx) || fontSizePx <= 0) return s.length * 10;
    const fw =
      (fontStyleObj && typeof fontStyleObj.fontWeight === 'string' && fontStyleObj.fontWeight) ||
      'bold';
    const ctx = getMeasureCtx();
    if (ctx) {
      try {
        ctx.font = `${fw} ${fontSizePx}px Arial, Helvetica, "Segoe UI", system-ui, sans-serif`;
        return Math.ceil(ctx.measureText(s).width);
      } catch (_) {
        /* fall through */
      }
    }
    return Math.ceil(s.length * fontSizePx * 0.62);
  };

  const CARD_WIDTH_MIN_PX = 24;

  /**
   * Card width: measured text + buffer, clamped to slot width.
   */
  const contentCardWidth = (text, fontSizePx, slotColW, fontStyleObj, bufferPx) => {
    const slot = Number.isFinite(slotColW) && slotColW > 0 ? Math.floor(slotColW) : 40;
    const buf = Number.isFinite(bufferPx) && bufferPx >= 0 ? bufferPx : 10;
    const raw = measureLabelWidthPx(text, fontSizePx, fontStyleObj || {}) + buf;
    return Math.min(Math.max(CARD_WIDTH_MIN_PX, raw), slot);
  };

  /** Uniform padding (px): 2% of min(cell width, cell height), at least 1px. */
  const cellPadding2Pct = (cellW, cellH) => {
    const w = Number.isFinite(cellW) && cellW > 0 ? cellW : 0;
    const h = Number.isFinite(cellH) && cellH > 0 ? cellH : 0;
    const base = w > 0 && h > 0 ? Math.min(w, h) : w || h || 0;
    return Math.max(1, Math.round(base * 0.02));
  };

  /** Applied after `*CardFontStyle` spreads so config cannot break cell centering. */
  const cellContentCenterStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  // ===== SCRIPTED ENGINE (Phase A) =====

  /**
   * Canonical element selector used by reveal/visibility lookups.
   * Examples:
   *   elSel('simple','operand-0')        => 'simple:operand-0'
   *   elSel('simple','operand-0','O')    => 'simple:operand-0:O'
   *   elSel('element','operator-plus')   => 'element:operator-plus'
   */
  const elSel = (a, b, c) => (c ? `${a}:${b}:${c}` : `${a}:${b}`);

  /**
   * Normalize a script into canonical step objects. Accepts either:
   *   - new `script` array with reveal/action/advance/animation
   *   - legacy `guidedSteps` array with { instruction, action, ... } only
   * Returns [] when neither is provided.
   */
  const normalizeScript = (scriptProp, legacyGuided) => {
    const raw = Array.isArray(scriptProp) && scriptProp.length > 0
      ? scriptProp
      : Array.isArray(legacyGuided) && legacyGuided.length > 0
        ? legacyGuided.map((s, i) => ({
            stepId: s.stepId != null ? s.stepId : i,
            instruction: s.instruction,
            action: s.action,
            // For action-bearing steps the action drives advance; the Next button
            // is reserved for purely informational steps.
            advance: s.action ? null : { type: 'next' },
            // Legacy steps treat layout as fully visible -> wildcard reveal.
            reveal: { all: true },
          }))
        : [];
    return raw.map((s, i) => ({
      stepId: s.stepId != null ? s.stepId : i,
      instruction: s.instruction || '',
      instructionOnAnimate: s.instructionOnAnimate || null,
      reveal: s.reveal || null,
      highlight: s.highlight || null,
      highlightAppearance: s.highlightAppearance || null,
      emphasize: s.emphasize || null,
      secondSource: s.secondSource || null,
      emphasizeContainer: s.emphasizeContainer || null,
      source: s.source || null,
      target: s.target || null,
      action: s.action || null,
      advance: s.advance || (s.action ? null : { type: 'next' }),
      inputMode: s.inputMode || null,
      validation: s.validation || null,
      choiceOptions: s.choiceOptions || null,
      animation: s.animation || null,
      // `split` is consumed by the split-carry animation: { sumDigit, carryDigit }.
      split: s.split || null,
      phase: s.phase || null,
      // When true, clear the target cell's previous value when this step becomes active
      // (e.g. after entering "14", the remainder-digit step resets so the tile shows "?").
      resetTargetCell: !!s.resetTargetCell,
      // When true, cells revealed by this step show "?" until explicitly filled.
      revealWithPlaceholder: !!s.revealWithPlaceholder,
    }));
  };

  /**
   * Build the union set of revealed element selectors for steps [0..uptoIndex].
   * Each step's reveal can declare:
   *   { all: true }                                  -> entire layout visible
   *   { panels: ['simple','expanded'] }              -> 'panel:*' wildcards
   *   { rows: ['header','operand-0'] }               -> 'panel:row' for each declared panel
   *                                                     (or both panels when no panels declared)
   *   { cells: [{ panel,row,column }, ...] }         -> specific cells
   *   { elements: ['operator-plus','divider'] }      -> 'element:<name>'
   *
   * Highlights, sources, and targets do NOT auto-reveal -- authors must include the
   * referenced row/cell in `reveal` (or earlier reveals) for it to be visible.
   */
  const computeRevealedSet = (script, uptoIndex) => {
    const set = new Set();
    if (!Array.isArray(script) || script.length === 0) return set;
    const last = Math.min(uptoIndex, script.length - 1);
    for (let i = 0; i <= last; i++) {
      const r = script[i] && script[i].reveal;
      if (!r) continue;
      if (r.all) {
        set.add('*');
        continue;
      }
      // `panels` is treated as the scope for `rows` rather than a wildcard
      // reveal of the whole panel, so authors can grow visibility row-by-row.
      // To wildcard a panel, use { panelsWildcard: ['simple'] }.
      const scopePanels = Array.isArray(r.panels) && r.panels.length > 0
        ? r.panels
        : ['simple', 'expanded'];
      if (Array.isArray(r.panelsWildcard)) {
        for (const p of r.panelsWildcard) set.add(elSel(p, '*'));
      }
      if (Array.isArray(r.rows)) {
        for (const row of r.rows) {
          for (const p of scopePanels) set.add(elSel(p, row));
        }
      }
      if (Array.isArray(r.cells)) {
        for (const c of r.cells) {
          if (c && c.panel && c.row && c.column) {
            set.add(elSel(c.panel, c.row, c.column));
          }
        }
      }
      if (Array.isArray(r.elements)) {
        for (const e of r.elements) set.add(elSel('element', e));
      }
    }
    return set;
  };

  /**
   * Test whether an element is visible given a revealed set.
   * Accepts wildcards: '*', 'simple:*'. Cell-level checks also pass when the
   * row or panel is wildcarded.
   *
   * Important: a ROW is also considered revealed when ANY of its cells is
   * revealed. This lets per-cell `reveal` directives display only specific
   * cells of an otherwise hidden row.
   */
  const isRevealed = (revealedSet, panel, row, column) => {
    if (!revealedSet || revealedSet.size === 0) return false;
    if (revealedSet.has('*')) return true;
    if (panel) {
      if (revealedSet.has(elSel(panel, '*'))) return true;
      if (row) {
        if (revealedSet.has(elSel(panel, row))) return true;
        if (column) {
          if (revealedSet.has(elSel(panel, row, column))) return true;
        } else {
          // Row-level check with no column: also true if any cell in this row
          // appears in the revealedSet.
          const prefix = `${panel}:${row}:`;
          for (const sel of revealedSet) {
            if (sel.indexOf(prefix) === 0) return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * Whether a problem will require a carry row, by simulating column addition.
   * Used to RESERVE the slot at layout time even though the row stays hidden
   * until a step opens it.
   */
  const willHaveCarry = (numbersArr, totalCols) => {
    let carry = 0;
    for (let c = totalCols - 1; c >= 0; c--) {
      let s = carry;
      for (let i = 0; i < numbersArr.length; i++) {
        const d = digitsOf(numbersArr[i], totalCols)[c];
        const dn = parseInt(d, 10);
        if (Number.isFinite(dn)) s += dn;
      }
      if (s >= 10) return true;
      carry = Math.floor(s / 10);
    }
    return false;
  };

  /**
   * Compute the step plan for a given variant + operand count.
   * Returns { maxStep, simple: { headerStep, operandSteps, dividerStep, sumStep },
   *           expanded: { headerStep, placeStep, operandSteps, dividerStep, sumStep } }
   * For 'both' mode the per-section step indices match each other where natural.
   */
  const buildStepPlan = (variant, operandCount) => {
    const N = operandCount;
    let cursor = 0;
    const plan = { variant, operandCount: N };
    if (variant === 'simple') {
      const headerStep = cursor++;
      const operandSteps = [];
      for (let i = 0; i < N; i++) operandSteps.push(cursor++);
      const dividerStep = cursor++;
      const sumStep = cursor++;
      plan.simple = { headerStep, operandSteps, dividerStep, sumStep };
      plan.maxStep = cursor - 1;
      return plan;
    }
    if (variant === 'expanded') {
      const headerStep = cursor++;
      const placeStep = cursor++;
      const operandSteps = [];
      for (let i = 0; i < N; i++) operandSteps.push(cursor++);
      const dividerStep = cursor++;
      const sumStep = cursor++;
      plan.expanded = { headerStep, placeStep, operandSteps, dividerStep, sumStep };
      plan.maxStep = cursor - 1;
      return plan;
    }
    // both: simple has no place row; expanded does. Lock-step both timelines using
    // the longer one (expanded) so that simple's place-row step is a no-op for it.
    const headerStep = cursor++;       // both halves show header
    const placeStep = cursor++;        // expanded shows place values; simple still just header
    const operandSteps = [];
    for (let i = 0; i < N; i++) operandSteps.push(cursor++);
    const dividerStep = cursor++;
    const sumStep = cursor++;
    plan.simple = {
      headerStep,
      operandSteps,
      dividerStep,
      sumStep,
    };
    plan.expanded = {
      headerStep,
      placeStep,
      operandSteps,
      dividerStep,
      sumStep,
    };
    plan.maxStep = cursor - 1;
    return plan;
  };

  /**
   * Renders a single row of the stacked addition (header / operand / sum),
   * positioned absolutely inside a parent that uses `position: relative`.
   *
   * @param {Object} args
   * @param {string[]} args.cells  one entry per column ('' for blank)
   * @param {number} args.totalCols
   * @param {string} args.kind     'header' | 'digits'
   * @param {boolean} args.visible
   * @param {Object} args.geom     { startX, top, colW, rowH, gap, cardRadius, textWidthBufferPx?,
   *                                  headerFontSize, digitFontSize, headerCardFontStyle, digitCardFontStyle }
   * @param {Object} args.colors
   * @param {string|null} args.operatorLeft   '+' to render on left, null otherwise
   * @param {string|null} args.operatorRight  '+' to render on right, null otherwise
   * @param {string} args.panel - 'simple' | 'expanded' (for cell ID)
   * @param {string} args.rowType - e.g. 'header', 'operand-0', 'sum' (for cell ID)
   * @param {Function} args.onCellClick - Click handler
   * @param {Function} args.getCellClasses - Get CSS classes for cell
   * @param {Map} args.cellValueOverrides - Map of cellId -> displayValue for incorrect mode
   * @param {Map} args.cellStates - Map of cellId -> state for visual styling
   */
  const renderStackedRow = (args) => {
    const {
      cells,
      totalCols,
      kind,
      visible,
      geom,
      colors,
      operatorLeft,
      operatorRight,
      keyPrefix,
      panel,
      rowType,
      onCellClick,
      getCellClasses,
      cellValueOverrides,
      cellStates,
      extraCellClass,
      // When provided (script mode), gates per-cell visibility within an
      // already-visible row. If a cell is not in the revealedSet, we skip it.
      revealedSet,
      interactiveType = 'auto',
      fillMissingFocusedCellId = null,
    } = args;
    const { startX, top, colW, rowH, gap, cardRadius } = geom;
    const textBuf =
      Number.isFinite(geom.textWidthBufferPx) && geom.textWidthBufferPx >= 0
        ? geom.textWidthBufferPx
        : 10;
    const headerFs = geom.headerCardFontStyle || {};
    const digitFs = geom.digitCardFontStyle || {};
    const fontSize =
      kind === 'header' ? geom.headerFontSize : geom.digitFontSize;
    const pad = cellPadding2Pct(colW, rowH);
    const children = [];
    for (let c = 0; c < totalCols; c++) {
      const originalCh = cells[c];
      const placeKey = placeKeyForColumn(c, totalCols);
      const color = colors[placeKey] || '#fff';
      const cellId = panel && rowType ? createCellId(panel, rowType, placeKey) : null;
      const hasOverride = cellValueOverrides && cellId && cellValueOverrides.has(cellId);
      // Script-mode cell visibility gate.
      if (revealedSet && panel && rowType) {
        const rowWide = revealedSet.has('*')
          || revealedSet.has(`${panel}:*`)
          || revealedSet.has(`${panel}:${rowType}`);
        const cellRevealed = revealedSet.has(`${panel}:${rowType}:${placeKey}`);
        if (!rowWide && !cellRevealed) continue;
      }
      if ((originalCh === '' || originalCh == null) && !hasOverride) {
        // blank slot, still occupies width
        continue;
      }

      const ch = hasOverride ? cellValueOverrides.get(cellId) : originalCh;
      
      // Check cell state for identified errors (show strikethrough or correction)
      const currentState = cellStates && cellId ? cellStates.get(cellId) : null;
      const isIdentified = currentState === 'identified';
      
      const slotLeft = startX + c * (colW + gap);
      const rowFs = kind === 'header' ? headerFs : digitFs;
      const cardW = contentCardWidth(ch, fontSize, colW, rowFs, textBuf);
      const left = slotLeft + Math.max(0, Math.floor((colW - cardW) / 2));
      
      const baseCellClass = extraCellClass ? `la-cell ${extraCellClass}` : 'la-cell';
      const cellClasses = getCellClasses && cellId ? getCellClasses(cellId, baseCellClass) : baseCellClass;
      const clickHandler = onCellClick && cellId ? () => onCellClick(cellId) : undefined;
      
      // Incorrect mode only: strikethrough on the wrong digit once identified (hasOverride
      // is also used for scripted ?→value display — do not strike through guided cells).
      const identifiedStyle =
        interactiveType === 'incorrect' && isIdentified && hasOverride
          ? {
              textDecoration: 'line-through',
              textDecorationColor: '#EF4444',
              textDecorationThickness: '2px',
            }
          : {};

      const fillMissingFocusStyle =
        interactiveType === 'fill-missing' &&
        fillMissingFocusedCellId &&
        cellId === fillMissingFocusedCellId
          ? {
              backgroundColor: FILL_MISSING_FOCUS_BG,
              color: FILL_MISSING_FOCUS_FG,
            }
          : {};

      children.push(
        React.createElement(
          'div',
          {
            key: `${keyPrefix}-cell-${c}`,
            className: cellClasses,
            onClick: clickHandler,
            'data-cell-id': cellId || undefined,
            'data-has-override': hasOverride || undefined,
            style: {
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${cardW}px`,
              height: `${rowH}px`,
              backgroundColor: CARD_BG,
              color: color,
              borderRadius: `${cardRadius}px`,
              fontWeight: 'bold',
              fontSize: `${fontSize}px`,
              fontFamily:
                'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
              lineHeight: 1,
              padding: `${pad}px`,
              overflow: 'hidden',
              ...(kind === 'header' ? headerFs : digitFs),
              ...cellContentCenterStyle,
              ...identifiedStyle,
              ...fillMissingFocusStyle,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 220ms ease, transform 220ms ease',
              boxSizing: 'border-box',
            },
          },
          ch
        )
      );
    }
    if (operatorLeft) {
      const opW = contentCardWidth(
        operatorLeft,
        geom.digitFontSize,
        colW,
        digitFs,
        textBuf
      );
      const slotLeft = startX - colW - gap;
      const left = slotLeft + Math.max(0, Math.floor((colW - opW) / 2));
      children.push(
        React.createElement(
          'div',
          {
            key: `${keyPrefix}-op-left`,
            className: 'la-numpad-dimmable-chrome',
            style: {
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${opW}px`,
              height: `${rowH}px`,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: `${geom.digitFontSize}px`,
              padding: `${pad}px`,
              boxSizing: 'border-box',
              ...digitFs,
              ...cellContentCenterStyle,
              opacity: visible ? 1 : 0,
              transition: 'opacity 220ms ease',
            },
          },
          operatorLeft
        )
      );
    }
    if (operatorRight) {
      const opW = contentCardWidth(
        operatorRight,
        geom.digitFontSize,
        colW,
        digitFs,
        textBuf
      );
      const slotLeft = startX + totalCols * (colW + gap);
      const left = slotLeft + Math.max(0, Math.floor((colW - opW) / 2));
      children.push(
        React.createElement(
          'div',
          {
            key: `${keyPrefix}-op-right`,
            className: 'la-numpad-dimmable-chrome',
            style: {
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${opW}px`,
              height: `${rowH}px`,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: `${geom.digitFontSize}px`,
              padding: `${pad}px`,
              boxSizing: 'border-box',
              ...digitFs,
              ...cellContentCenterStyle,
              opacity: visible ? 1 : 0,
              transition: 'opacity 220ms ease',
            },
          },
          operatorRight
        )
      );
    }
    return children;
  };

  /**
   * Render the divider line under operands. Spans the operand columns only.
   */
  const renderDividerLine = (args) => {
    const { startX, top, colW, gap, totalCols, lineColor, lineThickness, visible, keyPrefix } = args;
    const width = totalCols * colW + (totalCols - 1) * gap;
    return React.createElement('div', {
      key: `${keyPrefix}-line`,
      className: 'la-numpad-dimmable-chrome',
      style: {
        position: 'absolute',
        left: `${startX}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${lineThickness}px`,
        backgroundColor: lineColor,
        borderRadius: `${Math.max(1, Math.floor(lineThickness / 2))}px`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 220ms ease',
      },
    });
  };

  /**
   * Render an "expanded" row, e.g. for 5459: cards "5000 + 400 + 50 + 9".
   * Each token is a colored card (digit*place value). Each '+' sits in its own column
   * (width `plusSepWidth`) between digit columns (width `colW`).
   * The final operand token in Indonesian mode also gets a trailing '+'.
   *
   * @param {Object} args
   * @param {string[]} args.tokens   the values to render as cards, length = totalCols
   *                                 (use '' for skipped columns / blanks)
   * @param {string} args.kind        'header' | 'place' | 'digits'
   * @param {boolean} args.equalsLeading  if true, render '=' before the first card
   * @param {boolean} args.trailingPlus   if true, render '+' after the last card
   * @param {boolean} args.visible
   * @param {Object} args.geom        { startX, top, colW, rowH, gap, cardRadius, sepWidth,
   *                                    plusSepWidth?, equalsSepWidth? (default sepWidth),
   *                                    textWidthBufferPx?, headerFontSize, digitFontSize,
   *                                    headerCardFontStyle, placeCardFontStyle, digitCardFontStyle }
   * @param {string} args.panel - 'simple' | 'expanded' (for cell ID)
   * @param {string} args.rowType - e.g. 'header', 'operand-0', 'sum' (for cell ID)
   * @param {Function} args.onCellClick - Click handler
   * @param {Function} args.getCellClasses - Get CSS classes for cell
   * @param {Map} args.cellValueOverrides - Map of cellId -> displayValue for incorrect mode
   * @param {Map} args.cellStates - Map of cellId -> state for visual styling
   */
  const renderExpandedRow = (args) => {
    const {
      tokens,
      totalCols,
      kind,
      equalsLeading,
      trailingPlus,
      visible,
      geom,
      colors,
      keyPrefix,
      panel,
      rowType,
      onCellClick,
      getCellClasses,
      cellValueOverrides,
      cellStates,
      revealedSet,
      interactiveType = 'auto',
      fillMissingFocusedCellId = null,
    } = args;
    const { startX, top, colW, rowH, gap, cardRadius, sepWidth } = geom;
    const plusSepW =
      geom.plusSepWidth != null && Number.isFinite(geom.plusSepWidth)
        ? geom.plusSepWidth
        : sepWidth;
    const equalsSepW =
      geom.equalsSepWidth != null && Number.isFinite(geom.equalsSepWidth)
        ? geom.equalsSepWidth
        : sepWidth;
    const textBuf =
      Number.isFinite(geom.textWidthBufferPx) && geom.textWidthBufferPx >= 0
        ? geom.textWidthBufferPx
        : 10;
    const headerFs = geom.headerCardFontStyle || {};
    const placeFs = geom.placeCardFontStyle || {};
    const digitFs = geom.digitCardFontStyle || {};
    const rowCardFs =
      kind === 'header' ? headerFs : kind === 'place' ? placeFs : digitFs;
    const fontSize = kind === 'header' ? geom.headerFontSize : geom.digitFontSize;
    const padDigit = cellPadding2Pct(colW, rowH);
    const padPlus = cellPadding2Pct(plusSepW, rowH);
    const padEq = cellPadding2Pct(equalsSepW, rowH);
    const children = [];
    if (equalsLeading) {
      children.push(
        React.createElement(
          'div',
          {
            key: `${keyPrefix}-eq`,
            className: 'la-numpad-dimmable-chrome',
            style: {
              position: 'absolute',
              left: `${startX - equalsSepW}px`,
              top: `${top}px`,
              width: `${equalsSepW}px`,
              height: `${rowH}px`,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: `${geom.digitFontSize}px`,
              padding: `${padEq}px`,
              boxSizing: 'border-box',
              ...digitFs,
              ...cellContentCenterStyle,
              opacity: visible ? 1 : 0,
              transition: 'opacity 220ms ease',
            },
          },
          '='
        )
      );
    }
    // Digit columns (width colW) and '+' columns (width plusSepW) alternate; '+' always
    // occupies its own column slot so layout matches row/column grids.
    let xWalk = startX;
    for (let c = 0; c < totalCols; c++) {
      const digitColLeft = xWalk;
      const originalToken = tokens[c];
      const placeKey = placeKeyForColumn(c, totalCols);
      const color = colors[placeKey] || '#fff';
      
      // Create cell ID for interactive modes
      const cellId = panel && rowType ? createCellId(panel, rowType, placeKey) : null;
      
      // Phase 4: Check for value overrides (incorrect mode)
      const hasOverride = cellValueOverrides && cellId && cellValueOverrides.has(cellId);
      const token = hasOverride ? cellValueOverrides.get(cellId) : originalToken;
      
      // Check cell state for identified errors
      const currentState = cellStates && cellId ? cellStates.get(cellId) : null;
      const isIdentified = currentState === 'identified';

      // Script-mode cell visibility gate.
      let cellGateBlocked = false;
      if (revealedSet && panel && rowType) {
        const rowWide = revealedSet.has('*')
          || revealedSet.has(`${panel}:*`)
          || revealedSet.has(`${panel}:${rowType}`);
        const cellRevealed = revealedSet.has(`${panel}:${rowType}:${placeKey}`);
        if (!rowWide && !cellRevealed) cellGateBlocked = true;
      }

      if (!cellGateBlocked && token !== '' && token != null) {
        const cardW = contentCardWidth(
          token,
          fontSize,
          colW,
          rowCardFs,
          textBuf
        );
        const left =
          digitColLeft + Math.max(0, Math.floor((colW - cardW) / 2));
        
        const cellClasses = getCellClasses && cellId ? getCellClasses(cellId, 'la-cell la-cell--expanded') : 'la-cell la-cell--expanded';
        const clickHandler = onCellClick && cellId ? () => onCellClick(cellId) : undefined;
        
        const identifiedStyle =
          interactiveType === 'incorrect' && isIdentified && hasOverride
            ? {
                textDecoration: 'line-through',
                textDecorationColor: '#EF4444',
                textDecorationThickness: '2px',
              }
            : {};

        const fillMissingFocusStyle =
          interactiveType === 'fill-missing' &&
          fillMissingFocusedCellId &&
          cellId === fillMissingFocusedCellId
            ? {
                backgroundColor: FILL_MISSING_FOCUS_BG,
                color: FILL_MISSING_FOCUS_FG,
              }
            : {};

        children.push(
          React.createElement(
            'div',
            {
              key: `${keyPrefix}-card-${c}`,
              className: cellClasses,
              onClick: clickHandler,
              'data-cell-id': cellId || undefined,
              'data-has-override': hasOverride || undefined,
              style: {
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                width: `${cardW}px`,
                height: `${rowH}px`,
                backgroundColor: CARD_BG,
                color: color,
                borderRadius: `${cardRadius}px`,
                fontWeight: 'bold',
                fontSize: `${fontSize}px`,
                fontFamily:
                  'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
                lineHeight: 1,
                padding: `${padDigit}px`,
                overflow: 'hidden',
                ...rowCardFs,
                ...cellContentCenterStyle,
                ...identifiedStyle,
                ...fillMissingFocusStyle,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
                transition:
                  'opacity 220ms ease, transform 220ms ease',
                boxSizing: 'border-box',
              },
            },
            token
          )
        );
      }
      xWalk += colW;
      if (c < totalCols - 1) {
        const nextToken = tokens[c + 1];
        const showSep =
          (token !== '' && token != null) &&
          (nextToken !== '' && nextToken != null);
        const plusColLeft = xWalk;
        if (showSep) {
          children.push(
            React.createElement(
              'div',
              {
                key: `${keyPrefix}-sep-${c}`,
                className: 'la-numpad-dimmable-chrome',
                style: {
                  position: 'absolute',
                  left: `${plusColLeft}px`,
                  top: `${top}px`,
                  width: `${plusSepW}px`,
                  height: `${rowH}px`,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: `${geom.digitFontSize}px`,
                  padding: `${padPlus}px`,
                  boxSizing: 'border-box',
                  ...digitFs,
                  ...cellContentCenterStyle,
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 220ms ease',
                },
              },
              '+'
            )
          );
        }
        xWalk += plusSepW;
      }
    }
    if (trailingPlus) {
      // Find the last visible token's column
      let lastCol = -1;
      for (let c = totalCols - 1; c >= 0; c--) {
        if (tokens[c] !== '' && tokens[c] != null) {
          lastCol = c;
          break;
        }
      }
      if (lastCol >= 0) {
        const trailLeft = startX + lastCol * (colW + plusSepW) + colW;
        children.push(
          React.createElement(
            'div',
            {
              key: `${keyPrefix}-trail-plus`,
              className: 'la-numpad-dimmable-chrome',
              style: {
                position: 'absolute',
                left: `${trailLeft}px`,
                top: `${top}px`,
                width: `${plusSepW}px`,
                height: `${rowH}px`,
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: `${geom.digitFontSize}px`,
                padding: `${padPlus}px`,
                boxSizing: 'border-box',
                ...digitFs,
                ...cellContentCenterStyle,
                opacity: visible ? 1 : 0,
                transition: 'opacity 220ms ease',
              },
            },
            '+'
          )
        );
      }
    }
    return children;
  };

  /** Vertical x positions: digit col, '+' col, …, trailing '+' col (aligned to renderExpandedRow). */
  const expandedRowColumnBounds = (startX0, n, digitColW, plusColW) => {
    const out = [startX0];
    let gx = startX0;
    for (let c = 0; c < n; c++) {
      gx += digitColW;
      out.push(gx);
      gx += plusColW;
      out.push(gx);
    }
    return out;
  };

  /** Leading '=' in the middle strip (variant `both`): absolute in [simpleRegionWidth, gap). */
  const renderMiddleStripEquals = (args) => {
    const {
      middleLeftPx,
      middleWidthPx,
      top,
      rowH,
      visible,
      digitFontSizePx,
      digitCardFontStyle,
      keyPrefix,
    } = args;
    if (middleWidthPx <= 0) return [];
    const padMid = cellPadding2Pct(middleWidthPx, rowH);
    return [
      React.createElement(
        'div',
        {
          key: `${keyPrefix}-eq-mid`,
          className: 'la-numpad-dimmable-chrome',
          style: {
            position: 'absolute',
            left: `${middleLeftPx}px`,
            top: `${top}px`,
            width: `${middleWidthPx}px`,
            height: `${rowH}px`,
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: `${digitFontSizePx}px`,
            padding: `${padMid}px`,
            boxSizing: 'border-box',
            ...(digitCardFontStyle && typeof digitCardFontStyle === 'object'
              ? digitCardFontStyle
              : {}),
            ...cellContentCenterStyle,
            opacity: visible ? 1 : 0,
            transition: 'opacity 220ms ease',
            pointerEvents: 'none',
          },
        },
        '='
      ),
    ];
  };

  const LongAdditionComponent = React.memo((props) => {
    const generatedId = React.useId();
    const componentId = props.id || props.elementName || generatedId;

    const {
      numbers: numbersProp,
      variant: variantProp = 'simple',
      placeValueRow: placeValueRowProp = 'full',
      colors: colorsProp,
      placeLabels: placeLabelsProp,
      placeLabelsI18nKey: placeLabelsI18nKeyProp = 'common.longAddition.placeLabels',
      placeColorsI18nKey: placeColorsI18nKeyProp = 'common.longAddition.placeColors',
      operatorPosition: opPosProp = 'auto',
      mode: modeProp = 'self',
      autoPlay = true,
      stepDurationMs = 700,
      startDelayMs = 0,
      loop = false,
      currentStep: currentStepProp,
      onStepChange,
      onComplete,
      onReadyApi,
      digitFontSize: digitFontSizeProp,
      placeFontSize: placeFontSizeProp,
      headerFontSize: headerFontSizeProp,
      digitFontStyle: digitFontStyleProp,
      placeFontStyle: placeFontStyleProp,
      headerFontStyle: headerFontStyleProp,
      gap: gapProp,
      rowGap: rowGapProp,
      columnGap: columnGapProp,
      expandedColumnGap: expandedColumnGapProp,
      leftBlock: leftBlockProp,
      rightBlock: rightBlockProp,
      middleBlock: middleBlockProp,
      textWidthBuffer: textWidthBufferProp,
      cardPadding: cardPaddingProp,
      cardRadius: cardRadiusProp,
      lineThickness: lineThicknessProp,
      lineColor = '#FFFFFF',
      processedStyles: processedStylesIgnored,
      position,
      elementZIndex,
      debugPanelLayout = false,
      showPanelBorders = false,
      showPanelGridLines = true,
      
      // Interactive types (Phase 1)
      type: typeProp = 'auto',
      lockedCells: lockedCellsProp,
      incorrectCells: incorrectCellsExplicitProp,
      missingCells: missingCellsExplicitProp,
      guidedSteps: guidedStepsProp,
      // Convenience props for `incorrect` / `fill-missing` modes:
      // - `impactedTilesCount` (number): how many tiles to mark incorrect / blank.
      // - `impactTiles` (array of { panel, row, column }): explicit tiles to impact.
      //   When non-empty, that list is used verbatim; when empty, `impactedTilesCount`
      //   tiles are picked at random from the eligible pool (excludes headers, the
      //   place-value row in the expanded panel, and operand rows in the simple/left
      //   block — answer rows and expanded operand decompositions are eligible).
      impactedTilesCount: impactedTilesCountProp,
      impactTiles: impactTilesProp,
      /**
       * Optional positioning / sizing for incorrect-mode progress + completion bars
       * (`.la-incorrect-progress`, `.la-incorrect-completion`). Shallow-merged over
       * defaults — e.g. `{ bottom: '-30px', left: '8px', right: '8px' }`.
       */
      incorrectOverlayPanelStyle: incorrectOverlayPanelStyleProp,
      /**
       * Same for fill-missing mode (`.la-fill-missing-progress`, `.la-fill-missing-completion`).
       */
      fillMissingOverlayPanelStyle: fillMissingOverlayPanelStyleProp,
      /**
       * Optional page grid `[x1, y1, x2, y2]` (same system as `PageConfig` elements).
       * When set, incorrect progress + completion bars are portaled into
       * `.main-container` and positioned with `gridPositions.convertToCSS`.
       * `incorrectOverlayPanelStyle` still shallow-merges on top (e.g. zIndex).
       */
      incorrectProgressPanelCoordinates: incorrectProgressPanelCoordinatesProp,
      /**
       * Same for fill-missing progress + completion bars.
       */
      fillMissingProgressPanelCoordinates: fillMissingProgressPanelCoordinatesProp,

      // Scripted engine (unified step engine, all four modes)
      script: scriptProp,
      guidedInputMode: guidedInputModeProp = 'reveal',
      guidedValidation: guidedValidationProp = 'per-entry',
      instructionTargetId: instructionTargetIdProp,
      onScriptStep,
      onScriptComplete,
      /** Duration (ms) of scripted `converge-to-target` ghost flight; commit/flip follows this. */
      convergeFlightDurationMs: convergeFlightDurationMsProp = 4000,

      // Interactive callbacks
      onCellClick,
      onCellFocus,
      onCellBlur,
      onTypeComplete,
    } = props;

    const flowType = validateInteractiveType(typeProp);
    const isGuidedFlowShort = flowType === 'guided_flow_short';
    // `guided_flow_short` is a guided variant; keep `type` as 'guided' so
    // styling + guided/script logic continue to work unchanged.
    const type = isGuidedFlowShort ? 'guided' : flowType;
    const isInteractive = type !== 'auto';

    const incorrectOverlayStyleExtra =
      incorrectOverlayPanelStyleProp &&
      typeof incorrectOverlayPanelStyleProp === 'object' &&
      !Array.isArray(incorrectOverlayPanelStyleProp)
        ? incorrectOverlayPanelStyleProp
        : {};
    const fillMissingOverlayStyleExtra =
      fillMissingOverlayPanelStyleProp &&
      typeof fillMissingOverlayPanelStyleProp === 'object' &&
      !Array.isArray(fillMissingOverlayPanelStyleProp)
        ? fillMissingOverlayPanelStyleProp
        : {};

    const incorrectProgressCoords4 = React.useMemo(
      () => normalizeProgressPanelGridCoords(incorrectProgressPanelCoordinatesProp),
      [incorrectProgressPanelCoordinatesProp]
    );
    const fillMissingProgressCoords4 = React.useMemo(
      () => normalizeProgressPanelGridCoords(fillMissingProgressPanelCoordinatesProp),
      [fillMissingProgressPanelCoordinatesProp]
    );

    // Phase 2: Validate auto mode doesn't have interactive props
    React.useEffect(() => {
      if (type === 'auto' && typeof console !== 'undefined') {
        const warnings = [];
        if (incorrectCellsExplicitProp && incorrectCellsExplicitProp.length > 0) {
          warnings.push('incorrectCells is ignored in auto mode');
        }
        if (missingCellsExplicitProp && missingCellsExplicitProp.length > 0) {
          warnings.push('missingCells is ignored in auto mode');
        }
        if (guidedStepsProp && guidedStepsProp.length > 0) {
          warnings.push('guidedSteps is ignored in auto mode');
        }
        if (lockedCellsProp && lockedCellsProp.length > 0) {
          warnings.push('lockedCells is ignored in auto mode');
        }
        if (warnings.length > 0) {
          console.warn(
            `[LongAddition ${componentId}] Auto mode warnings:`,
            warnings.join(', ')
          );
        }
      }
    }, [type, incorrectCellsExplicitProp, missingCellsExplicitProp, guidedStepsProp, lockedCellsProp, componentId]);

    const variant =
      variantProp === 'expanded' || variantProp === 'both' ? variantProp : 'simple';
    const placeValueRow =
      placeValueRowProp === 'skip-ones' ? 'skip-ones' : 'full';
    const mode = modeProp === 'controlled' ? 'controlled' : 'self';

    const convergeFlightDurationMs = React.useMemo(() => {
      const n = Number(convergeFlightDurationMsProp);
      if (!Number.isFinite(n)) return 4000;
      return Math.max(0, Math.min(120000, Math.round(n)));
    }, [convergeFlightDurationMsProp]);

    const numbers = React.useMemo(() => sanitizeNumbers(numbersProp), [numbersProp]);
    const sum = React.useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers]);
    const totalCols = React.useMemo(() => {
      const max = Math.max(sum, ...numbers);
      return String(max).length >= 5 ? 5 : 4;
    }, [numbers, sum]);

    // Convenience builder for `incorrect` and `fill-missing` modes.
    // When `incorrectCells` / `missingCells` are not explicitly provided, derive
    // them from `impactedTilesCount` + `impactTiles`. Eligible tiles include the
    // simple-panel sum row and the expanded-panel operand + sum rows. Excluded:
    // headers (both panels), the expanded place-value row, and the simple-panel
    // operand rows (i.e. left-block "numbers"). The dividers and carry rows
    // are not impacted (carry is only revealed by guided scripts anyway).
    const autoImpactCells = React.useMemo(() => {
      if (typeProp !== 'incorrect' && typeProp !== 'fill-missing') return null;
      const explicit = typeProp === 'incorrect'
        ? incorrectCellsExplicitProp
        : missingCellsExplicitProp;
      if (Array.isArray(explicit) && explicit.length > 0) return null;

      const wantList = Array.isArray(impactTilesProp) ? impactTilesProp.filter(Boolean) : [];
      const desiredCount = Math.max(0, Math.floor(Number(impactedTilesCountProp) || 0));
      if (wantList.length === 0 && desiredCount === 0) return [];

      const variantLocal = variantProp === 'expanded' || variantProp === 'both' ? variantProp : 'simple';
      const showSimple = variantLocal === 'simple' || variantLocal === 'both';
      const showExpanded = variantLocal === 'expanded' || variantLocal === 'both';

      const sumDigits = String(sum).padStart(totalCols, ' ').slice(-totalCols).split('');
      const operandDigitsArr = numbers.map((n) =>
        String(n).padStart(totalCols, ' ').slice(-totalCols).split('')
      );

      // Eligible cell pool, each annotated with the digit + place value so we can
      // generate a believable wrong-display value for `incorrect` mode.
      const eligible = [];
      const pushIf = (panel, row, column, digitChar, placeValue) => {
        if (digitChar == null || digitChar === '' || digitChar === ' ') return;
        const d = parseInt(digitChar, 10);
        if (!Number.isFinite(d)) return;
        const correctValue = panel === 'expanded' ? String(d * placeValue) : String(d);
        eligible.push({
          panel,
          row,
          column,
          digit: d,
          placeValue,
          correctValue,
        });
      };

      if (showSimple) {
        for (let c = 0; c < totalCols; c++) {
          const placeKey = placeKeyForColumn(c, totalCols);
          const pv = placeValueForColumn(c, totalCols);
          pushIf('simple', 'sum', placeKey, sumDigits[c], pv);
        }
      }
      if (showExpanded) {
        for (let i = 0; i < numbers.length; i++) {
          for (let c = 0; c < totalCols; c++) {
            const placeKey = placeKeyForColumn(c, totalCols);
            const pv = placeValueForColumn(c, totalCols);
            pushIf('expanded', `operand-${i}`, placeKey, operandDigitsArr[i][c], pv);
          }
        }
        for (let c = 0; c < totalCols; c++) {
          const placeKey = placeKeyForColumn(c, totalCols);
          const pv = placeValueForColumn(c, totalCols);
          pushIf('expanded', 'sum', placeKey, sumDigits[c], pv);
        }
      }

      const findEligible = (sel) =>
        eligible.find(
          (e) => e.panel === sel.panel && e.row === sel.row && e.column === sel.column
        );

      let selected;
      if (wantList.length > 0) {
        const matched = [];
        for (const sel of wantList) {
          if (!sel || !sel.panel || !sel.row || !sel.column) continue;
          const e = findEligible(sel);
          if (e) matched.push(e);
        }
        selected = matched;
      } else {
        const shuffled = eligible.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
        }
        selected = shuffled.slice(0, Math.min(desiredCount, shuffled.length));
      }

      if (typeProp === 'incorrect') {
        return selected.map((e) => {
          let wrongDigit = e.digit;
          // Pick a different digit 0-9 (deterministic-ish: bias to off-by-one for clarity).
          const candidates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => d !== e.digit);
          if (candidates.length > 0) {
            wrongDigit = candidates[Math.floor(Math.random() * candidates.length)];
          }
          const wrongValue = e.panel === 'expanded'
            ? String(wrongDigit * e.placeValue)
            : String(wrongDigit);
          return {
            panel: e.panel,
            row: e.row,
            column: e.column,
            displayValue: wrongValue,
            correctValue: e.correctValue,
          };
        });
      }

      // fill-missing: just expose correctValue + acceptableValues.
      return selected.map((e) => ({
        panel: e.panel,
        row: e.row,
        column: e.column,
        correctValue: e.correctValue,
        acceptableValues: [e.correctValue],
      }));
    }, [
      typeProp,
      incorrectCellsExplicitProp,
      missingCellsExplicitProp,
      impactedTilesCountProp,
      impactTilesProp,
      numbers,
      sum,
      totalCols,
      variantProp,
    ]);

    // Effective interactive props: explicit list wins; otherwise auto-built list.
    const incorrectCellsProp = React.useMemo(() => {
      if (Array.isArray(incorrectCellsExplicitProp) && incorrectCellsExplicitProp.length > 0) {
        return incorrectCellsExplicitProp;
      }
      if (typeProp === 'incorrect' && Array.isArray(autoImpactCells)) return autoImpactCells;
      return incorrectCellsExplicitProp;
    }, [typeProp, incorrectCellsExplicitProp, autoImpactCells]);

    const missingCellsProp = React.useMemo(() => {
      if (Array.isArray(missingCellsExplicitProp) && missingCellsExplicitProp.length > 0) {
        return missingCellsExplicitProp;
      }
      if (typeProp === 'fill-missing' && Array.isArray(autoImpactCells)) return autoImpactCells;
      return missingCellsExplicitProp;
    }, [typeProp, missingCellsExplicitProp, autoImpactCells]);

    const [i18nTick, setI18nTick] = React.useState(0);
    React.useEffect(() => {
      const bump = () => setI18nTick((t) => t + 1);
      if (typeof window === 'undefined' || !window.addEventListener) return undefined;
      window.addEventListener('appLanguageChanged', bump);
      return () => window.removeEventListener('appLanguageChanged', bump);
    }, []);

    const i18nLang = getAppCurrentLanguage();

    const placeLabels = React.useMemo(() => {
      const fromData = fetchI18nObject(placeLabelsI18nKeyProp);
      const prop =
        placeLabelsProp && typeof placeLabelsProp === 'object' ? placeLabelsProp : {};
      const out = {};
      PLACE_KEYS.forEach((k) => {
        const i18nVal = fromData[k];
        const p = prop[k];
        if (i18nVal != null && String(i18nVal).length > 0) out[k] = i18nVal;
        else if (p != null && String(p).length > 0) out[k] = p;
        else out[k] = k;
      });
      return out;
    }, [placeLabelsProp, placeLabelsI18nKeyProp, i18nLang, i18nTick]);

    const colors = React.useMemo(() => {
      const fromData = fetchI18nObject(placeColorsI18nKeyProp);
      return { ...DEFAULT_COLORS, ...fromData, ...(colorsProp || {}) };
    }, [colorsProp, placeColorsI18nKeyProp, i18nLang, i18nTick]);

    const headerCardFontStyle = React.useMemo(
      () => mergeUserFontStyle({ fontWeight: 'bold' }, headerFontStyleProp),
      [headerFontStyleProp]
    );
    const placeCardFontStyle = React.useMemo(
      () => mergeUserFontStyle({ fontWeight: 'bold' }, placeFontStyleProp),
      [placeFontStyleProp]
    );
    const digitCardFontStyle = React.useMemo(
      () => mergeUserFontStyle({ fontWeight: 'bold' }, digitFontStyleProp),
      [digitFontStyleProp]
    );

    const operatorPosition = React.useMemo(
      () => resolveOperatorPosition(opPosProp),
      [opPosProp, i18nTick]
    );

    // ===== INTERACTIVE STATE MANAGEMENT (Phase 1) =====
    
    // Shared interactive state
    const [selectedCells, setSelectedCells] = React.useState(new Set());
    const [cellStates, setCellStates] = React.useState(new Map()); // cellId -> state
    const cellStatesRef = React.useRef(cellStates);
    cellStatesRef.current = cellStates;
    /** Latest fill-missing validator for `longAdditionCheck` listener (registered earlier in the hook list). */
    const validateFillMissingForCheckRef = React.useRef(() => false);
    const [interactionStats, setInteractionStats] = React.useState({
      totalClicks: 0,
      correctActions: 0,
      incorrectActions: 0,
      startTime: null,
    });

    // Type-specific state
    const [incorrectState, setIncorrectState] = React.useState({
      identifiedErrors: new Set(),
      missedSelections: new Set(),
      /** Tiles the learner tapped; validated only when Check is pressed. */
      pendingCheck: new Set(),
    });

    const [fillMissingState, setFillMissingState] = React.useState({
      cellValues: new Map(),        // cellId -> user entered value
      validatedCells: new Map(),    // cellId -> 'correct' | 'incorrect' | null
      focusedCell: null,            // Currently focused cell for input
      inputValue: '',               // Current input buffer
      showNumberPad: false,         // Whether number pad overlay is visible
    });
    const [numberPadPosition, setNumberPadPosition] = React.useState(null);

    // Sticky feedback set when the external Check button is pressed in
    // `incorrect` / `fill-missing` modes. Overrides the default progress
    // string in the instruction dialog until the next interaction clears it.
    const [checkFeedback, setCheckFeedback] = React.useState(null);

    const [guidedState, setGuidedState] = React.useState({
      currentStepIndex: 0,
      completedSteps: [],
      attemptCount: 0,
    });

    // ===== SCRIPTED ENGINE STATE (Phase A) =====

    // Canonicalized script (handles both `script` and legacy `guidedSteps`).
    // `guided_flow_short` is authored by supplying a shorter `script` in PageConfig;
    // do not auto-truncate here (different pages may want different short flows).
    const script = React.useMemo(
      () => normalizeScript(scriptProp, guidedStepsProp),
      [scriptProp, guidedStepsProp]
    );
    const hasActiveScript = script.length > 0;
    const instructionTargetId = (typeof instructionTargetIdProp === 'string' && instructionTargetIdProp.trim())
      ? instructionTargetIdProp.trim()
      : null;
    const useExternalInstructionTarget = !!instructionTargetId;

    // Index of the most recently active step (drives revealedSet + instruction panel).
    const [scriptStepIndex, setScriptStepIndex] = React.useState(0);

    // Prevent accidental double-advances when multiple click handlers fire
    // for the same user gesture (e.g., emphasis overlay + underlying cell).
    const advanceScriptGuardRef = React.useRef(0);

    // Per-cell user-entered values (used by 'reveal' / 'choice' / 'type' input modes).
    // Map<cellId, string>
    const [scriptCellValues, setScriptCellValues] = React.useState(new Map());

    // Generic value-input overlay state (replaces fill-missing-only number pad).
    // { open, mode, target, options, expected, buffer, maxNumericValue }
    const [valueOverlay, setValueOverlay] = React.useState({
      open: false,
      mode: null,
      target: null,
      options: null,
      expected: null,
      buffer: '',
      maxNumericValue: null,
    });

    // Pending transfer-fly animation, if any. { source, target, value, key }
    const [pendingTransfer, setPendingTransfer] = React.useState(null);

    // Pending converge animation — two ghosts fly toward the target.
    // { sources: [{id, label}], target, key }
    const [pendingConverge, setPendingConverge] = React.useState(null);

    // Pending split animation — multi-phase: rise, morph, then split to sum+carry.
    // { sourceId, targetId, total, remainder, carryAmount, phase, key }
    const [pendingSplitAnim, setPendingSplitAnim] = React.useState(null);

    // After the learner taps a scripted source digit, drop yellow/dashed cue styling on
    // that cell so it returns to the normal chip look while the fly animation runs.
    const [scriptGestureReleasedCellIds, setScriptGestureReleasedCellIds] = React.useState(
      () => new Set()
    );

    // During scripted animations, temporarily override the displayed instruction text.
    const [scriptInstructionOverride, setScriptInstructionOverride] = React.useState(null);

    // `handleCellClick` is declared before the specialized handlers below; keep refs
    // so every cell tap always calls the latest scripted handler (avoids stale step 3).
    const handleIncorrectCellClickRef = React.useRef(() => {});
    const handleFillMissingCellClickRef = React.useRef(() => {});
    const handleGuidedCellClickRef = React.useRef(() => {});
    const handleScriptCellClickRef = React.useRef(() => {});
    const convergeRunLockRef = React.useRef(false);
    const componentRootRef = React.useRef(null);

    // Dashed overlay box is computed from layout geometry (gc→px based),
    // so it remains stable across screen resolutions/scales.

    // Set of element selectors revealed up to current step.
    const revealedSet = React.useMemo(
      () => computeRevealedSet(script, scriptStepIndex),
      [script, scriptStepIndex]
    );

    // Reset script state when script identity changes.
    React.useEffect(() => {
      setScriptStepIndex(0);
      setScriptCellValues(new Map());
      setValueOverlay({
        open: false,
        mode: null,
        target: null,
        options: null,
        expected: null,
        buffer: '',
        maxNumericValue: null,
      });
      setPendingTransfer(null);
      setPendingConverge(null);
      setScriptGestureReleasedCellIds(new Set());
      setScriptInstructionOverride(null);
    }, [scriptProp, guidedStepsProp]);

    // Notify parent when active step changes.
    React.useEffect(() => {
      if (!hasActiveScript) return;
      if (typeof onScriptStep === 'function') {
        onScriptStep({
          stepIndex: scriptStepIndex,
          step: script[scriptStepIndex] || null,
          totalSteps: script.length,
        });
      }
    }, [hasActiveScript, scriptStepIndex, script, onScriptStep]);

    // Reset target cell value when a step with resetTargetCell becomes active.
    // Used when the same tile is reused for a second entry (e.g. column total → remainder digit).
    React.useEffect(() => {
      if (!hasActiveScript) return;
      const step = script[scriptStepIndex];
      if (!step || !step.resetTargetCell) return;
      const sel = step.target || (step.action && step.action.type === 'enter-value' ? step.action : null);
      if (!sel || !sel.panel || !sel.row || !sel.column) return;
      const cellId = createCellId(sel.panel, sel.row, sel.column);
      setScriptCellValues((prev) => {
        if (!prev.has(cellId)) return prev;
        const next = new Map(prev);
        next.delete(cellId);
        return next;
      });
    }, [hasActiveScript, script, scriptStepIndex]);

    const currentScriptStep = hasActiveScript
      ? script[Math.min(scriptStepIndex, script.length - 1)] || null
      : null;
    const isScriptComplete = hasActiveScript && scriptStepIndex >= script.length - 1
      && (() => {
        const last = script[script.length - 1];
        if (!last) return true;
        // Last step is "done" when:
        //   - it has no action (informational), OR
        //   - it has an action that has been resolved (will be marked via advance).
        // For now, treat reaching the last index as "in progress"; complete fires on advance.
        return false;
      })();

    // Resolved guided input/validation (component-level + per-step override).
    const resolveStepInputMode = React.useCallback((step) => {
      const m = (step && step.inputMode) || guidedInputModeProp || 'reveal';
      return ['type', 'reveal', 'choice'].includes(m) ? m : 'reveal';
    }, [guidedInputModeProp]);

    const resolveStepValidation = React.useCallback((step) => {
      const v = (step && step.validation) || guidedValidationProp || 'per-entry';
      return ['per-entry', 'row-check', 'both', 'none'].includes(v) ? v : 'per-entry';
    }, [guidedValidationProp]);

    /**
     * Visibility resolver: when a script is active the revealedSet rules
     * everything; otherwise we fall through to the legacy plan-step logic
     * via the optional `fallback` argument.
     */
    const resolveVisible = React.useCallback(
      (panel, row, column, fallback) => {
        if (hasActiveScript) {
          return isRevealed(revealedSet, panel, row, column);
        }
        return !!fallback;
      },
      [hasActiveScript, revealedSet]
    );

    // Push instruction text into an external page element, if configured.
    React.useEffect(() => {
      if (!useExternalInstructionTarget) return;
      if (typeof document === 'undefined') return;

      const txt = hasActiveScript
        ? (scriptInstructionOverride != null
            ? String(scriptInstructionOverride)
            : (currentScriptStep && currentScriptStep.instruction) || '')
        : (() => {
            if (type === 'guided') {
              const steps = Array.isArray(guidedStepsProp) ? guidedStepsProp : [];
              const s = steps[guidedState.currentStepIndex];
              return (s && s.instruction) || '';
            }
            if (type === 'incorrect') {
              const total = (incorrectCellsProp || []).length;
              if (total === 0) return '';
              const found = Math.min(
                incorrectState.identifiedErrors.size,
                total
              );
              if (found >= total) {
                return translateI18nKey(
                  'common.longAddition.interactive.incorrectAllFound',
                  { total }
                );
              }
            }

            // Sticky feedback (set by the Check button) wins over the default
            // running-progress string until the next interaction clears it.
            if (checkFeedback != null) return String(checkFeedback);

            if (type === 'incorrect') {
              const total = (incorrectCellsProp || []).length;
              if (total === 0) return '';
              const found = Math.min(
                incorrectState.identifiedErrors.size,
                total
              );
              return translateI18nKey(
                'common.longAddition.interactive.incorrectFind',
                { total, found }
              );
            }
            if (type === 'fill-missing') {
              const cells = missingCellsProp || [];
              const total = cells.length;
              if (total === 0) return '';
              let filled = 0;
              for (const cell of cells) {
                const cid = createCellId(cell.panel, cell.row, cell.column);
                const v = fillMissingState.cellValues.get(cid);
                if (v !== undefined && String(v).trim() !== '') filled++;
              }
              filled = Math.min(filled, total);
              return translateI18nKey(
                'common.longAddition.interactive.fillFind',
                { total, filled }
              );
            }
            return '';
          })();

      const el = document.getElementById(instructionTargetId);
      if (!el) return;

      const textNode =
        el.querySelector('.math-app-dialog-text') ||
        el.querySelector('[data-text]') ||
        el.querySelector('.textbox-text') ||
        el.querySelector('.text') ||
        null;

      const next = String(txt);
      if (textNode && textNode.textContent !== next) textNode.textContent = next;

      if (textNode && textNode.style) {
        if (type === 'incorrect') {
          const total = (incorrectCellsProp || []).length;
          const allFound =
            total > 0 && incorrectState.identifiedErrors.size >= total;
          textNode.style.color = allFound ? '#22C55E' : '#ffffff';
        } else {
          textNode.style.removeProperty('color');
        }
      }
    }, [
      useExternalInstructionTarget,
      instructionTargetId,
      hasActiveScript,
      scriptInstructionOverride,
      currentScriptStep,
      type,
      guidedStepsProp,
      guidedState.currentStepIndex,
      checkFeedback,
      incorrectCellsProp,
      incorrectState.identifiedErrors,
      missingCellsProp,
      fillMissingState.cellValues,
    ]);

    // Clear sticky Check-button feedback whenever the user interacts again,
    // so the dialog reverts to the live progress text.
    React.useEffect(() => {
      if (checkFeedback != null) setCheckFeedback(null);
      // We deliberately depend only on the user-progress signals here: the
      // setter is stable and `checkFeedback` itself is intentionally NOT a
      // dep so we only fire on real interaction changes.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      incorrectState.identifiedErrors,
      incorrectState.missedSelections,
      incorrectState.pendingCheck.size,
      fillMissingState.cellValues,
    ]);

    // Listen for external "Check" button clicks (dispatched from PageConfig).
    // Uses `validateFillMissingForCheckRef` so this hook can stay before `validateFillMissingCell`.
    React.useEffect(() => {
      if (typeof window === 'undefined') return undefined;
      if (type !== 'incorrect' && type !== 'fill-missing') return undefined;

      const handler = (e) => {
        const targetId = e && e.detail && e.detail.id;
        if (targetId && targetId !== componentId) return;

        if (type === 'incorrect') {
          const total = (incorrectCellsProp || []).length;
          if (total === 0) return;

          const pending = Array.from(incorrectState.pendingCheck);
          let identifiedSize = incorrectState.identifiedErrors.size;
          let missedSize = incorrectState.missedSelections.size;

          if (pending.length > 0) {
            const toIdentify = [];
            const toMiss = [];
            for (const cellId of pending) {
              if (incorrectState.identifiedErrors.has(cellId)) continue;
              const isActuallyIncorrect = (incorrectCellsProp || []).some(
                (cell) =>
                  createCellId(cell.panel, cell.row, cell.column) === cellId
              );
              if (isActuallyIncorrect) toIdentify.push(cellId);
              else toMiss.push(cellId);
            }

            identifiedSize += toIdentify.length;
            missedSize += toMiss.length;

            setIncorrectState((prev) => ({
              identifiedErrors: new Set([...prev.identifiedErrors, ...toIdentify]),
              missedSelections: new Set([...prev.missedSelections, ...toMiss]),
              pendingCheck: new Set(),
            }));

            setCellStates((prev) => {
              const next = new Map(prev);
              for (const id of toIdentify) next.set(id, 'identified');
              for (const id of toMiss) next.set(id, 'missed');
              return next;
            });

            setInteractionStats((prev) => ({
              ...prev,
              correctActions: prev.correctActions + toIdentify.length,
              incorrectActions: prev.incorrectActions + toMiss.length,
            }));

            for (const cellId of toMiss) {
              setTimeout(() => {
                setCellStates((prev) => {
                  const next = new Map(prev);
                  if (next.get(cellId) === 'missed') next.delete(cellId);
                  return next;
                });
              }, 600);
            }
          }

          const found = Math.min(identifiedSize, total);
          const remaining = Math.max(total - found, 0);
          const missed = missedSize;
          const missedSuffix = missed > 0
            ? translateI18nKey(
                'common.longAddition.interactive.incorrectMissedClicks',
                { missed }
              )
            : '';
          const base =
            remaining === 0
              ? translateI18nKey(
                  'common.longAddition.interactive.incorrectAllFound',
                  { total }
                )
              : translateI18nKey(
                  'common.longAddition.interactive.incorrectMissing',
                  { remaining }
                );
          setCheckFeedback(base + missedSuffix);
          if (remaining === 0 && typeof onTypeComplete === 'function') {
            const elapsed = interactionStats.startTime
              ? Date.now() - interactionStats.startTime
              : 0;
            onTypeComplete({
              type: 'incorrect',
              totalErrors: total,
              foundErrors: found,
              missedClicks: missed,
              timeElapsed: elapsed,
              triggeredBy: 'check-button',
            });
          }
          return;
        }

        // type === 'fill-missing' — validate all filled cells only on Check
        const validateCell = validateFillMissingForCheckRef.current;
        const cells = missingCellsProp || [];
        const total = cells.length;
        if (total === 0) return;

        const prevValidated = fillMissingState.validatedCells;
        const newValidated = new Map();
        let filled = 0;
        let correct = 0;
        let addCorrect = 0;
        let addIncorrect = 0;

        for (const cell of cells) {
          const cid = createCellId(cell.panel, cell.row, cell.column);
          const raw = fillMissingState.cellValues.get(cid);
          const trimmed = raw !== undefined && raw !== null ? String(raw).trim() : '';
          if (!trimmed) continue;
          filled += 1;
          const ok = validateCell(cid, trimmed);
          const nextSt = ok ? 'correct' : 'incorrect';
          const prevSt = prevValidated.get(cid);
          newValidated.set(cid, nextSt);
          if (prevSt !== nextSt) {
            if (nextSt === 'correct') addCorrect += 1;
            else addIncorrect += 1;
          }
          if (ok) correct += 1;
        }

        const remainingFill = Math.max(total - filled, 0);
        const wrong = Math.max(filled - correct, 0);

        setInteractionStats((prev) => ({
          ...prev,
          correctActions: prev.correctActions + addCorrect,
          incorrectActions: prev.incorrectActions + addIncorrect,
        }));

        setFillMissingState((prev) => ({
          ...prev,
          validatedCells: newValidated,
        }));

        setCellStates((prev) => {
          const next = new Map(prev);
          for (const cell of cells) {
            const cid = createCellId(cell.panel, cell.row, cell.column);
            const raw = fillMissingState.cellValues.get(cid);
            const trimmed = raw !== undefined && raw !== null ? String(raw).trim() : '';
            if (!trimmed) {
              next.delete(cid);
              continue;
            }
            const ok = validateCell(cid, trimmed);
            next.set(cid, ok ? 'identified' : 'missed');
          }
          return next;
        });

        if (remainingFill === 0 && wrong === 0) {
          setCheckFeedback(
            translateI18nKey(
              'common.longAddition.interactive.fillAllCorrect',
              { total }
            )
          );
          if (typeof onTypeComplete === 'function') {
            const elapsed = interactionStats.startTime
              ? Date.now() - interactionStats.startTime
              : 0;
            onTypeComplete({
              type: 'fill-missing',
              totalCells: total,
              filledCells: filled,
              correctCells: correct,
              incorrectAttempts: interactionStats.incorrectActions + addIncorrect,
              timeElapsed: elapsed,
              triggeredBy: 'check-button',
            });
          }
          return;
        }
        if (remainingFill > 0) {
          setCheckFeedback(
            translateI18nKey(
              'common.longAddition.interactive.fillIncomplete',
              { remaining: remainingFill }
            )
          );
        } else {
          setCheckFeedback(
            translateI18nKey(
              'common.longAddition.interactive.fillSomeWrong',
              { wrong }
            )
          );
        }
      };

      window.addEventListener('longAdditionCheck', handler);
      return () => window.removeEventListener('longAdditionCheck', handler);
    }, [
      type,
      componentId,
      incorrectCellsProp,
      incorrectState.identifiedErrors,
      incorrectState.missedSelections,
      incorrectState.pendingCheck,
      missingCellsProp,
      fillMissingState.cellValues,
      fillMissingState.validatedCells,
      interactionStats,
      onTypeComplete,
    ]);

    const isIncorrectComplete = React.useMemo(() => {
      if (type !== 'incorrect' || !incorrectCellsProp) return false;
      return incorrectState.identifiedErrors.size >= incorrectCellsProp.length;
    }, [type, incorrectCellsProp, incorrectState.identifiedErrors.size]);

    React.useEffect(() => {
      if (typeof window === 'undefined') return;
      const prev = window.PAGE1_LA_INCORRECT_ALL_FOUND;
      const next = type === 'incorrect' ? isIncorrectComplete : false;
      window.PAGE1_LA_INCORRECT_ALL_FOUND = next;
      if (prev !== next) {
        window.forceAppUpdate?.();
      }
    }, [type, isIncorrectComplete]);

    // Initialize interaction stats on type change
    React.useEffect(() => {
      if (isInteractive && !interactionStats.startTime) {
        setInteractionStats(prev => ({ ...prev, startTime: Date.now() }));
      }
    }, [isInteractive, interactionStats.startTime]);

    // Cell click handler
    const handleCellClick = React.useCallback((cellId, event) => {
      if (!isInteractive) return;
      
      const locked = isCellLocked(
        cellId,
        type,
        lockedCellsProp || [],
        type === 'incorrect' && isIncorrectComplete
      );
      if (locked) return;

      setInteractionStats(prev => ({ 
        ...prev, 
        totalClicks: prev.totalClicks + 1 
      }));

      // Scripted engine takes priority when a script is active. The current
      // step may set `phase: 'hunt' | 'fill'` to delegate cell handling back
      // to the legacy mode-specific handlers (used by incorrect / fill-missing
      // warm-up scripts).
      if (hasActiveScript) {
        const step = script[Math.min(scriptStepIndex, script.length - 1)];
        const phase = step && step.phase;
        if (phase === 'hunt' && type === 'incorrect') {
          handleIncorrectCellClickRef.current(cellId);
        } else if (phase === 'fill' && type === 'fill-missing') {
          handleFillMissingCellClickRef.current(cellId);
        } else {
          handleScriptCellClickRef.current(cellId);
        }
      } else {
        // Route to type-specific handler (legacy)
        switch (type) {
          case 'incorrect':
            handleIncorrectCellClickRef.current(cellId);
            break;
          case 'fill-missing':
            handleFillMissingCellClickRef.current(cellId);
            break;
          case 'guided':
            handleGuidedCellClickRef.current(cellId);
            break;
          default:
            break;
        }
      }

      if (onCellClick) {
        onCellClick(cellId, parseCellId(cellId));
      }
    }, [isInteractive, type, lockedCellsProp, onCellClick, hasActiveScript, script, scriptStepIndex, isIncorrectComplete]);

    // Type-specific click handlers
    // === PHASE 4: INCORRECT MODE POLISH ===
    
    // Build cell value overrides map from incorrectCells OR missingCells
    const cellValueOverrides = React.useMemo(() => {
      const overrides = new Map();
      
      // Incorrect mode: show wrong displayValues
      if (type === 'incorrect' && incorrectCellsProp && incorrectCellsProp.length > 0) {
        for (const cell of incorrectCellsProp) {
          if (cell.displayValue !== undefined) {
            const cellId = createCellId(cell.panel, cell.row, cell.column);
            overrides.set(cellId, cell.displayValue);
          }
        }
      }
      
      // Fill-missing mode: show "?" for unfilled, user value for filled
      if (type === 'fill-missing' && missingCellsProp && missingCellsProp.length > 0) {
        for (const cell of missingCellsProp) {
          const cellId = createCellId(cell.panel, cell.row, cell.column);
          const userValue = fillMissingState.cellValues.get(cellId);
          // Show user value if entered, otherwise "?"
          overrides.set(cellId, userValue !== undefined && userValue !== '' ? userValue : '?');
        }
        // Live digits from the number pad into the focused tile while it is open.
        if (fillMissingState.showNumberPad && fillMissingState.focusedCell) {
          const fid = fillMissingState.focusedCell;
          const live =
            fillMissingState.inputValue != null ? String(fillMissingState.inputValue) : '';
          overrides.set(fid, live !== '' ? live : '?');
        }
      }

      // Scripted engine: show user-entered values for input cells, and "?"
      // placeholders for revealed-but-not-yet-filled input targets.
      if (hasActiveScript) {
        // Walk steps up to (and including) currentStepIndex; for each enter-value
        // action whose target is revealed but not yet committed, render "?".
        const upto = Math.min(scriptStepIndex, script.length - 1);
        for (let i = 0; i <= upto; i++) {
          const s = script[i];
          if (!s) continue;
          if (s.action && s.action.type === 'enter-value') {
            const sel = s.target || s.action;
            if (!sel || !sel.panel || !sel.row || !sel.column) continue;
            const id = createCellId(sel.panel, sel.row, sel.column);
            if (scriptCellValues.has(id)) {
              const v = scriptCellValues.get(id);
              if (v != null && v !== '') overrides.set(id, v);
            } else if (isRevealed(revealedSet, sel.panel, sel.row, sel.column)) {
              overrides.set(id, '?');
            }
          }
          // split-carry animation: target carry cell renders a "?" placeholder
          // until the flying carry digit settles, so the carry row band exists
          // (and `data-cell-id` is in the DOM) for the transfer ghost to target.
          if (s.animation === 'split-carry' && s.target) {
            const sel = s.target;
            if (sel.panel && sel.row && sel.column) {
              const id = createCellId(sel.panel, sel.row, sel.column);
              if (!scriptCellValues.has(id) && isRevealed(revealedSet, sel.panel, sel.row, sel.column)) {
                overrides.set(id, '?');
              }
            }
          }
          // revealWithPlaceholder: cells revealed by this step show "?" until filled
          if (s.revealWithPlaceholder && s.reveal && s.reveal.cells) {
            for (const cell of s.reveal.cells) {
              if (!cell || !cell.panel || !cell.row || !cell.column) continue;
              const id = createCellId(cell.panel, cell.row, cell.column);
              if (!scriptCellValues.has(id) && isRevealed(revealedSet, cell.panel, cell.row, cell.column)) {
                overrides.set(id, '?');
              }
            }
          }
        }
        // User-committed values from any cell.
        for (const [cellId, value] of scriptCellValues.entries()) {
          if (value !== undefined && value !== '') overrides.set(cellId, value);
        }

        // Live digits while the type-mode overlay is open — tile shows entry directly (no pad display).
        if (
          valueOverlay.open &&
          valueOverlay.mode === 'type' &&
          valueOverlay.target
        ) {
          const tid = valueOverlay.target;
          const live = valueOverlay.buffer != null ? String(valueOverlay.buffer).trim() : '';
          if (live !== '') overrides.set(tid, live);
        }
      }

      return overrides;
    }, [type, incorrectCellsProp, missingCellsProp, fillMissingState.cellValues, fillMissingState.showNumberPad, fillMissingState.focusedCell, fillMissingState.inputValue, scriptCellValues, hasActiveScript, scriptStepIndex, script, revealedSet, valueOverlay.open, valueOverlay.mode, valueOverlay.target, valueOverlay.buffer]);

    // Get the correct value for a cell (used for reveal-on-correct)
    const getCorrectValue = React.useCallback((cellId) => {
      if (!incorrectCellsProp) return null;
      for (const cell of incorrectCellsProp) {
        if (createCellId(cell.panel, cell.row, cell.column) === cellId) {
          return cell.correctValue;
        }
      }
      return null;
    }, [incorrectCellsProp]);

    // Progress stats for incorrect mode
    const incorrectProgress = React.useMemo(() => {
      if (type !== 'incorrect' || !incorrectCellsProp) {
        return { found: 0, total: 0, percentage: 0 };
      }
      const total = incorrectCellsProp.length;
      const found = incorrectState.identifiedErrors.size;
      return {
        found,
        total,
        percentage: total > 0 ? Math.round((found / total) * 100) : 0,
      };
    }, [type, incorrectCellsProp, incorrectState.identifiedErrors.size]);

    const handleIncorrectCellClick = React.useCallback((cellId) => {
      setIncorrectState((prev) => {
        const totalErrs = (incorrectCellsProp || []).length;
        if (totalErrs === 0 || prev.identifiedErrors.size >= totalErrs) return prev;
        if (prev.identifiedErrors.has(cellId)) return prev;
        const remainingErrs = totalErrs - prev.identifiedErrors.size;
        const nextPending = new Set(prev.pendingCheck);
        if (nextPending.has(cellId)) {
          nextPending.delete(cellId);
          return { ...prev, pendingCheck: nextPending };
        }
        if (nextPending.size >= remainingErrs) return prev;
        nextPending.add(cellId);
        return { ...prev, pendingCheck: nextPending };
      });
    }, [incorrectCellsProp]);
    handleIncorrectCellClickRef.current = handleIncorrectCellClick;

    // === PHASE 5: FILL-MISSING MODE IMPLEMENTATION ===
    
    // Build missing cells map from missingCells prop
    const missingCellsMap = React.useMemo(() => {
      if (type !== 'fill-missing' || !missingCellsProp || missingCellsProp.length === 0) {
        return new Map();
      }
      const missing = new Map();
      for (const cell of missingCellsProp) {
        const cellId = createCellId(cell.panel, cell.row, cell.column);
        missing.set(cellId, {
          correctValue: cell.correctValue,
          acceptableValues: cell.acceptableValues || [cell.correctValue],
          hint: cell.hint || null,
        });
      }
      return missing;
    }, [type, missingCellsProp]);

    // Check if a cell is a missing cell
    const isMissingCell = React.useCallback((cellId) => {
      return missingCellsMap.has(cellId);
    }, [missingCellsMap]);

    // Get the display value for a cell (user input or "?" for empty)
    const getMissingCellDisplay = React.useCallback((cellId) => {
      if (!isMissingCell(cellId)) return null;
      const userValue = fillMissingState.cellValues.get(cellId);
      return userValue !== undefined && userValue !== '' ? userValue : '?';
    }, [isMissingCell, fillMissingState.cellValues]);

    // Check if fill-missing mode is complete
    const isFillMissingComplete = React.useMemo(() => {
      if (type !== 'fill-missing' || !missingCellsProp) return false;
      const totalMissing = missingCellsProp.length;
      let correctCount = 0;
      for (const [cellId, status] of fillMissingState.validatedCells) {
        if (status === 'correct') correctCount++;
      }
      return correctCount >= totalMissing;
    }, [type, missingCellsProp, fillMissingState.validatedCells]);

    // Progress stats for fill-missing mode
    const fillMissingProgress = React.useMemo(() => {
      if (type !== 'fill-missing' || !missingCellsProp) {
        return { filled: 0, correct: 0, total: 0, percentage: 0 };
      }
      const total = missingCellsProp.length;
      let filled = 0;
      let correct = 0;
      for (const [cellId] of missingCellsMap) {
        const val = fillMissingState.cellValues.get(cellId);
        if (val !== undefined && val !== '') filled++;
        if (fillMissingState.validatedCells.get(cellId) === 'correct') correct++;
      }
      return {
        filled,
        correct,
        total,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
      };
    }, [type, missingCellsProp, missingCellsMap, fillMissingState.cellValues, fillMissingState.validatedCells]);

    // Validate a cell's value
    const validateFillMissingCell = React.useCallback((cellId, value) => {
      const cellConfig = missingCellsMap.get(cellId);
      if (!cellConfig) return false;
      const trimmed = String(value).trim();
      const parsed = parseCellId(cellId);
      if (parsed) {
        const max = getFillMissingNumericMax(parsed.panel, parsed.column);
        if (Number.isFinite(max) && max < Infinity) {
          const n = parseInt(trimmed, 10);
          if (!Number.isFinite(n) || n > max) return false;
        }
      }
      const acceptable = cellConfig.acceptableValues || [cellConfig.correctValue];
      return acceptable.includes(trimmed);
    }, [missingCellsMap]);
    validateFillMissingForCheckRef.current = validateFillMissingCell;

    // Save draft value from pad (no correctness until Check); clears prior validation for that cell
    const saveFillMissingFromPad = React.useCallback((cellId, value) => {
      if (!cellId) return;

      setNumberPadPosition(null);

      setFillMissingState((prev) => {
        const newCellValues = new Map(prev.cellValues);
        newCellValues.set(cellId, value);
        const newValidatedCells = new Map(prev.validatedCells);
        newValidatedCells.delete(cellId);
        return {
          ...prev,
          cellValues: newCellValues,
          validatedCells: newValidatedCells,
          inputValue: '',
          showNumberPad: false,
          focusedCell: null,
        };
      });

      setCellStates((prev) => {
        const next = new Map(prev);
        next.delete(cellId);
        return next;
      });

      if (onCellBlur) {
        onCellBlur(cellId, parseCellId(cellId));
      }
    }, [onCellBlur]);

    // Handle number pad input
    const handleNumberPadInput = React.useCallback((digit) => {
      const d = String(digit);
      if (!/^\d$/.test(d)) return;

      setFillMissingState((prev) => {
        if (!prev.focusedCell) return prev;
        const next = `${prev.inputValue}${d}`;
        const parsed = parseCellId(prev.focusedCell);
        if (!parsed) {
          return { ...prev, inputValue: next };
        }
        const max = getFillMissingNumericMax(parsed.panel, parsed.column);
        if (!Number.isFinite(max) || max === Infinity) {
          return { ...prev, inputValue: next };
        }
        const n = parseInt(next, 10);
        if (!Number.isFinite(n) || n > max) return prev;
        return { ...prev, inputValue: next };
      });
    }, []);

    // Handle number pad clear
    const handleNumberPadClear = React.useCallback(() => {
      setFillMissingState(prev => ({
        ...prev,
        inputValue: '',
      }));
    }, []);

    // Handle number pad backspace
    const handleNumberPadBackspace = React.useCallback(() => {
      setFillMissingState(prev => ({
        ...prev,
        inputValue: prev.inputValue.slice(0, -1),
      }));
    }, []);

    // Close number pad; save non-empty draft (validity applied on Check), else discard
    const handleNumberPadClose = React.useCallback(() => {
      setNumberPadPosition(null);
      setFillMissingState((prev) => {
        const { focusedCell, inputValue } = prev;
        const trimmed = String(inputValue).trim();
        if (focusedCell && trimmed !== '') {
          queueMicrotask(() => saveFillMissingFromPad(focusedCell, trimmed));
          return {
            ...prev,
            showNumberPad: false,
            focusedCell: null,
            inputValue: '',
          };
        }
        if (focusedCell && onCellBlur) {
          onCellBlur(focusedCell, parseCellId(focusedCell));
        }
        return {
          ...prev,
          showNumberPad: false,
          focusedCell: null,
          inputValue: '',
        };
      });
    }, [saveFillMissingFromPad, onCellBlur]);

    const handleFillMissingCellClick = React.useCallback((cellId) => {
      // Don't allow editing already correct cells
      if (fillMissingState.validatedCells.get(cellId) === 'correct') return;
      
      // Only allow clicking on missing cells
      if (!isMissingCell(cellId)) return;
      
      // Get existing value if any
      const existingValue = fillMissingState.cellValues.get(cellId) || '';

      setNumberPadPosition(null);
      setFillMissingState(prev => ({
        ...prev,
        focusedCell: cellId,
        inputValue: existingValue,
        showNumberPad: true,
      }));
      
      setCellStates(prev => new Map(prev).set(cellId, 'focused'));
      
      if (onCellFocus) {
        onCellFocus(cellId, parseCellId(cellId));
      }
    }, [isMissingCell, fillMissingState.validatedCells, fillMissingState.cellValues, onCellFocus]);
    handleFillMissingCellClickRef.current = handleFillMissingCellClick;

    // === PHASE 3: GUIDED MODE IMPLEMENTATION ===
    
    // Get current guided step
    const currentGuidedStep = React.useMemo(() => {
      if (type !== 'guided' || !guidedStepsProp || guidedStepsProp.length === 0) {
        return null;
      }
      return guidedStepsProp[guidedState.currentStepIndex] || null;
    }, [type, guidedStepsProp, guidedState.currentStepIndex]);

    // Get expected cell ID for current guided step
    const expectedCellId = React.useMemo(() => {
      if (!currentGuidedStep || !currentGuidedStep.action) return null;
      const action = currentGuidedStep.action;
      if (action.type === 'select-cell' || action.type === 'enter-value') {
        return createCellId(action.panel, action.row, action.column);
      }
      return null;
    }, [currentGuidedStep]);

    // Check if guided mode is complete
    const isGuidedComplete = React.useMemo(() => {
      if (type !== 'guided' || !guidedStepsProp) return false;
      return guidedState.currentStepIndex >= guidedStepsProp.length;
    }, [type, guidedStepsProp, guidedState.currentStepIndex]);

    // Advance to next guided step
    const advanceGuidedStep = React.useCallback(() => {
      if (!guidedStepsProp || isGuidedComplete) return;
      
      const nextIndex = guidedState.currentStepIndex + 1;
      const completedStep = guidedStepsProp[guidedState.currentStepIndex];
      
      setGuidedState(prev => ({
        ...prev,
        currentStepIndex: nextIndex,
        completedSteps: [...prev.completedSteps, completedStep?.stepId],
        attemptCount: 0, // Reset attempts for new step
      }));

      // Check completion
      if (nextIndex >= guidedStepsProp.length && onTypeComplete) {
        const elapsed = Date.now() - interactionStats.startTime;
        onTypeComplete({
          type: 'guided',
          totalSteps: guidedStepsProp.length,
          completedSteps: nextIndex,
          totalAttempts: interactionStats.totalClicks,
          timeElapsed: elapsed,
        });
      }
    }, [guidedStepsProp, guidedState.currentStepIndex, isGuidedComplete, interactionStats, onTypeComplete]);

    // Handle guided cell click
    const handleGuidedCellClick = React.useCallback((cellId) => {
      if (!currentGuidedStep || !currentGuidedStep.action) return;
      
      const action = currentGuidedStep.action;
      
      // For 'reveal-next' actions, any click advances
      if (action.type === 'reveal-next') {
        advanceGuidedStep();
        return;
      }
      
      // Check if user clicked the expected cell
      const isCorrectCell = cellId === expectedCellId;
      
      if (isCorrectCell) {
        // Correct cell clicked
        setCellStates(prev => new Map(prev).set(cellId, 'identified'));
        setInteractionStats(prev => ({ 
          ...prev, 
          correctActions: prev.correctActions + 1 
        }));
        
        // For 'select-cell' actions, advance immediately
        if (action.type === 'select-cell') {
          // Brief visual feedback then advance; drop `identified` so place-value styling returns.
          setTimeout(() => {
            setCellStates((prev) => {
              const next = new Map(prev);
              if (next.get(cellId) === 'identified') next.delete(cellId);
              return next;
            });
            advanceGuidedStep();
          }, 400);
        }
        // For 'enter-value' actions, we'll need number pad (Phase 5)
        // For now, just mark as correct and advance
        if (action.type === 'enter-value') {
          // TODO: Phase 5 will add number pad input
          // For now, auto-advance after correct cell selection
          setTimeout(() => {
            advanceGuidedStep();
          }, 400);
        }
      } else {
        // Wrong cell clicked
        setCellStates(prev => new Map(prev).set(cellId, 'missed'));
        setGuidedState(prev => ({
          ...prev,
          attemptCount: prev.attemptCount + 1,
        }));
        setInteractionStats(prev => ({ 
          ...prev, 
          incorrectActions: prev.incorrectActions + 1 
        }));
        
        // Clear the "missed" state after animation
        setTimeout(() => {
          setCellStates(prev => {
            const next = new Map(prev);
            if (next.get(cellId) === 'missed') {
              next.delete(cellId);
            }
            return next;
          });
        }, 600);
      }
    }, [currentGuidedStep, expectedCellId, advanceGuidedStep]);
    handleGuidedCellClickRef.current = handleGuidedCellClick;

    // === SCRIPTED ENGINE: ADVANCE + COMMIT (Phase A/C) ===

    /**
     * Move to the next script step. If we are already at the last step and
     * the step is "informational" (no action), fire onScriptComplete.
     */
    const advanceScript = React.useCallback(() => {
      if (!hasActiveScript) return;
      const now = Date.now();
      if (now - advanceScriptGuardRef.current < 250) return;
      advanceScriptGuardRef.current = now;
      setScriptStepIndex((prev) => {
        const next = Math.min(prev + 1, script.length);
        if (next >= script.length && typeof onScriptComplete === 'function') {
          const elapsed = interactionStats.startTime
            ? Date.now() - interactionStats.startTime
            : 0;
          onScriptComplete({
            totalSteps: script.length,
            timeElapsed: elapsed,
          });
        }
        return next;
      });
    }, [hasActiveScript, script.length, onScriptComplete, interactionStats.startTime]);

    /**
     * Commit a value into a target cell. Triggers per-entry validation,
     * stores the value in scriptCellValues, plays optional animations,
     * and (when correct + per-entry) advances the script.
     */
    const commitCellValue = React.useCallback((cellId, value, opts = {}) => {
      if (!cellId) return;
      const step = currentScriptStep;
      const expected = (opts.expected != null
        ? opts.expected
        : (step && step.action && step.action.expected != null
            ? String(step.action.expected)
            : null));
      const validation = resolveStepValidation(step);
      const trimmed = value == null ? '' : String(value).trim();
      const isCorrect = expected == null ? true : trimmed === String(expected);

      setScriptCellValues((prev) => {
        const next = new Map(prev);
        next.set(cellId, trimmed);
        return next;
      });

      setCellStates((prev) => {
        const next = new Map(prev);
        next.set(cellId, isCorrect ? 'identified' : 'missed');
        return next;
      });

      setInteractionStats((prev) => ({
        ...prev,
        correctActions: prev.correctActions + (isCorrect ? 1 : 0),
        incorrectActions: prev.incorrectActions + (isCorrect ? 0 : 1),
      }));

      if (isCorrect && (validation === 'per-entry' || validation === 'none')) {
        setTimeout(() => {
          advanceScript();
          // Drop success tint so place-value colors return (same idea as converge flip).
          setCellStates((prev) => {
            const next = new Map(prev);
            if (next.get(cellId) === 'identified') next.delete(cellId);
            return next;
          });
        }, 450);
      } else if (!isCorrect && hasActiveScript) {
        const wh = step && step.action && step.action.wrongHint;
        if (wh && wh.kind === 'columnTotal' && typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
          const place = wh.place || '';
          const hint = window.i18n.t(
            'common.longAddition.guidedFlowShort.wrongColumnTotal',
            { place }
          );
          if (hint && !String(hint).startsWith('[Missing:')) {
            setScriptInstructionOverride(String(hint));
          }
        }
      }
      // Incorrect: keep `missed` + wrong value on the tile (salmon) until the learner
      // enters a new digit on the pad; first digit then clears and replaces (see handleNum).
    }, [currentScriptStep, resolveStepValidation, advanceScript, hasActiveScript]);

    /**
     * Open the value input overlay for the current step (type or choice mode).
     * For reveal mode, the engine instead plays a transfer animation on click.
     */
    const openValueOverlay = React.useCallback((step) => {
      if (!step || !step.action || step.action.type !== 'enter-value') return;
      const mode = resolveStepInputMode(step);
      const targetSel = step.target || step.action;
      const target = createCellId(targetSel.panel, targetSel.row, targetSel.column);
      const maxRaw = step.action && step.action.maxNumericValue;
      const maxNumericValue =
        maxRaw != null && Number.isFinite(Number(maxRaw)) ? Number(maxRaw) : null;
      if (mode === 'type') {
        setScriptInstructionOverride(null);
        setValueOverlay({
          open: true,
          mode: 'type',
          target,
          options: null,
          expected: step.action.expected != null ? String(step.action.expected) : null,
          buffer: '',
          maxNumericValue,
        });
      } else if (mode === 'choice') {
        setScriptInstructionOverride(null);
        setValueOverlay({
          open: true,
          mode: 'choice',
          target,
          options: Array.isArray(step.choiceOptions) ? step.choiceOptions.slice() : [],
          expected: step.action.expected != null ? String(step.action.expected) : null,
          buffer: '',
          maxNumericValue: null,
        });
      }
    }, [resolveStepInputMode]);

    const closeValueOverlay = React.useCallback(() => {
      setValueOverlay({
        open: false,
        mode: null,
        target: null,
        options: null,
        expected: null,
        buffer: '',
        maxNumericValue: null,
      });
    }, []);

    /**
     * Dispatch a click on a cell when a script is active. Behaviour depends
     * on the current step's action and advance.type.
     */
    const handleScriptCellClick = React.useCallback((cellId) => {
      const step = currentScriptStep;
      if (!step) return;

      const action = step.action;
      const advance = step.advance || (action ? null : { type: 'next' });

      // No-action informational steps with tap-revealed advance.
      if (advance && advance.type === 'tap-revealed') {
        // Any click on a revealed element advances.
        const parsed = parseCellId(cellId);
        if (parsed && isRevealed(revealedSet, parsed.panel, parsed.row, parsed.column)) {
          advanceScript();
        }
        return;
      }

      // split-carry animation: click the source (or target) cell to animate the split.
      // Multi-phase: total rises up → morphs to "total = carry + remainder" → splits.
      if (step.animation === 'split-carry' && step.split) {
        const split = step.split;
        if (split.sumDigit == null || split.carryDigit == null) return;
        const srcSel = step.source;
        const tgtSel = step.target;
        if (!srcSel || !tgtSel) return;
        const srcId = createCellId(srcSel.panel, srcSel.row, srcSel.column);
        const tgtId = createCellId(tgtSel.panel, tgtSel.row, tgtSel.column);
        if (cellId !== srcId && cellId !== tgtId) return;
        if (convergeRunLockRef.current) return;
        convergeRunLockRef.current = true;

        const remainder = String(split.sumDigit);
        const carryAmount = String(split.carryDigit);
        const total = scriptCellValues.get(srcId) || String(Number(remainder) + Number(carryAmount));

        // Start multi-phase split animation
        setPendingSplitAnim({
          sourceId: srcId,
          targetId: tgtId,
          total,
          remainder,
          carryAmount,
          phase: 'rise',
          key: Date.now(),
        });
        return;
      }

      if (!action) return;

      if (action.type === 'select-cell') {
        const expectedId = createCellId(action.panel, action.row, action.column);
        if (cellId === expectedId) {
          setCellStates((prev) => new Map(prev).set(cellId, 'identified'));
          setInteractionStats((prev) => ({ ...prev, correctActions: prev.correctActions + 1 }));
          // Brief success flash only: `identified` adds green `la-cell--correct` which overrides
          // place-value chip colors — clear it when advancing so the digit returns to normal.
          setTimeout(() => {
            setCellStates((prev) => {
              const next = new Map(prev);
              if (next.get(cellId) === 'identified') next.delete(cellId);
              return next;
            });
            advanceScript();
          }, 350);
        } else {
          setCellStates((prev) => new Map(prev).set(cellId, 'missed'));
          setInteractionStats((prev) => ({ ...prev, incorrectActions: prev.incorrectActions + 1 }));
          setTimeout(() => {
            setCellStates((prev) => {
              const next = new Map(prev);
              if (next.get(cellId) === 'missed') next.delete(cellId);
              return next;
            });
          }, 600);
        }
        return;
      }

      if (action.type === 'enter-value') {
        const mode = resolveStepInputMode(step);
        const targetSel = step.target || action;
        const targetId = createCellId(targetSel.panel, targetSel.row, targetSel.column);
        const expectedVal = action.expected != null ? String(action.expected) : '';
        const sourceSel = step.source;
        const srcId = sourceSel ? createCellId(sourceSel.panel, sourceSel.row, sourceSel.column) : null;

        // converge-to-target: two ghosts (source digit + secondary label) fly to target,
        // then the tile flips to reveal the committed value.
        if (step.animation === 'converge-to-target' && mode === 'reveal') {
          if (cellId !== srcId && cellId !== targetId) return;
          if (convergeRunLockRef.current) return;
          convergeRunLockRef.current = true;
          if (step.instructionOnAnimate != null) {
            setScriptInstructionOverride(String(step.instructionOnAnimate));
          }
          {
            const sources = [];
            if (srcId) {
              const primaryGhost =
                sourceSel && sourceSel.ghostLabel != null
                  ? String(sourceSel.ghostLabel)
                  : expectedVal;
              sources.push({ id: srcId, label: primaryGhost });
            }
            if (step.secondSource) {
              const ss = step.secondSource;
              const ssId = createCellId(ss.panel, ss.row, ss.column);
              sources.push({ id: ssId, label: ss.ghostLabel != null ? String(ss.ghostLabel) : '1' });
            }
            setScriptGestureReleasedCellIds((prev) => {
              const n = new Set(prev);
              for (const s of sources) if (s && s.id) n.add(s.id);
              return n;
            });
            setPendingConverge({
              sources,
              target: targetId,
              key: Date.now(),
              durationMs: convergeFlightDurationMs,
            });
            setTimeout(() => {
              // commit value + start flip
              setScriptCellValues((prev) => { const n = new Map(prev); n.set(targetId, expectedVal); return n; });
              setCellStates((prev) => new Map(prev).set(targetId, 'flip-reveal'));
              setPendingConverge(null);
              // after flip completes: drop scripted success styling — `identified` adds
              // green `la-cell--correct`; script overrides count as hasOverride and drew
              // incorrect-mode strikethrough. Restore normal place-value chip styling.
              setTimeout(() => {
                setCellStates((prev) => {
                  const n = new Map(prev);
                  if (n.get(targetId) === 'flip-reveal') n.delete(targetId);
                  return n;
                });
                advanceScript();
                convergeRunLockRef.current = false;
              }, 700);
            }, convergeFlightDurationMs);
          }
          return;
        }

        if (mode === 'reveal') {
          // Reveal mode: clicking the source (or the target) reveals the value
          // by flying it from source to target; commit the expected value.
          if (sourceSel) {
            // Only react if user clicked source or target.
            if (cellId === srcId || cellId === targetId) {
              if (srcId) {
                setScriptGestureReleasedCellIds((prev) => new Set(prev).add(srcId));
              }
              // Use ghostLabel if provided for the flying chip, otherwise expectedVal
              const ghostVal = sourceSel.ghostLabel != null ? String(sourceSel.ghostLabel) : expectedVal;
              setPendingTransfer({
                source: srcId,
                target: targetId,
                value: ghostVal,
                key: Date.now(),
              });
              setTimeout(() => {
                commitCellValue(targetId, expectedVal, { expected: expectedVal });
                setPendingTransfer(null);
              }, 600);
            }
          } else if (cellId === targetId) {
            commitCellValue(targetId, expectedVal, { expected: expectedVal });
          }
          return;
        }

        // type/choice mode: open the overlay if user tapped target (or source).
        if (cellId === targetId || cellId === srcId) {
          if (
            resolveStepInputMode(step) === 'type' &&
            valueOverlay.open &&
            valueOverlay.mode === 'type' &&
            valueOverlay.target === targetId
          ) {
            return;
          }
          openValueOverlay(step);
        }
        return;
      }

      if (action.type === 'next') {
        // Any click advances when explicitly configured.
        advanceScript();
      }
    }, [currentScriptStep, revealedSet, advanceScript, openValueOverlay, commitCellValue, resolveStepInputMode,
        setPendingConverge, setScriptCellValues, setCellStates, convergeFlightDurationMs,
        valueOverlay.open, valueOverlay.mode, valueOverlay.target]);
    handleScriptCellClickRef.current = handleScriptCellClick;

    React.useEffect(() => {
      convergeRunLockRef.current = false;
      setScriptGestureReleasedCellIds(new Set());
      setScriptInstructionOverride(null);
    }, [scriptStepIndex]);

    /**
     * Auto-advance handling for steps with advance: { type: 'auto', delayMs }.
     */
    React.useEffect(() => {
      if (!hasActiveScript) return undefined;
      const step = currentScriptStep;
      if (!step || !step.advance || step.advance.type !== 'auto') return undefined;
      const delay = Number.isFinite(step.advance.delayMs) ? step.advance.delayMs : 1500;
      const timer = setTimeout(() => advanceScript(), delay);
      return () => clearTimeout(timer);
    }, [hasActiveScript, currentScriptStep, advanceScript]);

    // Split-carry animation is now click-triggered via handleScriptCellClick,
    // not auto-triggered. See the split-carry block in handleScriptCellClick.

    // Get cell state for rendering (used to apply CSS classes)
    const getCellState = React.useCallback((cellId) => {
      return cellStates.get(cellId) || 'normal';
    }, [cellStates]);

    // Get cell CSS classes based on state
    const getCellClasses = React.useCallback((cellId, baseClasses = '') => {
      const state = getCellState(cellId);
      const locked = isCellLocked(
        cellId,
        type,
        lockedCellsProp || [],
        type === 'incorrect' && isIncorrectComplete
      );
      const fillMissingAnswerLocked =
        type === 'fill-missing' && fillMissingState.validatedCells.get(cellId) === 'correct';
      const effectiveLocked = locked || fillMissingAnswerLocked;

      const classes = [baseClasses];

      if (isInteractive && !effectiveLocked) {
        classes.push('la-cell--clickable');
      }
      if (effectiveLocked) {
        classes.push('la-cell--locked');
      }
      if (selectedCells.has(cellId)) {
        classes.push('la-cell--selected');
      }
      if (type === 'incorrect' && incorrectState.pendingCheck.has(cellId)) {
        classes.push('la-cell--selected');
      }
      if (scriptGestureReleasedCellIds.has(cellId)) {
        classes.push('la-cell--script-source-released');
      }
      
      // Guided mode: highlight expected cell (legacy guidedSteps)
      if (type === 'guided' && expectedCellId === cellId && state !== 'identified') {
        classes.push('la-cell--highlighted');
      }

      // Scripted engine: highlight the active step's highlight or action target
      if (
        hasActiveScript &&
        currentScriptStep &&
        state !== 'identified' &&
        !scriptGestureReleasedCellIds.has(cellId)
      ) {
        const sel = currentScriptStep.highlight
          || (currentScriptStep.action && (currentScriptStep.action.type === 'select-cell'
                ? currentScriptStep.action
                : null));
        if (sel) {
          const hid = createCellId(sel.panel, sel.row, sel.column);
          if (hid === cellId) {
            const app = currentScriptStep.highlightAppearance;
            if (app === 'yellow-blink') {
              classes.push('la-cell--highlight-yellow-blink');
            } else {
              classes.push('la-cell--highlighted');
            }
          }
        }
      }

      // Scripted engine: emphasize rows/cells (e.g. dashed border around operands).
      if (
        hasActiveScript &&
        currentScriptStep &&
        currentScriptStep.emphasize &&
        !scriptGestureReleasedCellIds.has(cellId)
      ) {
        const parsed = parseCellId(cellId);
        const rules = Array.isArray(currentScriptStep.emphasize) ? currentScriptStep.emphasize : [];
        for (const r of rules) {
          if (!r) continue;
          const panelOk = r.panel ? r.panel === parsed?.panel : true;
          const rowOk = r.row ? r.row === parsed?.row : true;
          const colOk = r.column ? r.column === parsed?.column : true;
          if (panelOk && rowOk && colOk) {
            classes.push('la-cell--emphasis');
            break;
          }
        }
      }
      
      // Converge animation: blink the target ? tile so it's obviously clickable.
      if (hasActiveScript && currentScriptStep && currentScriptStep.animation === 'converge-to-target' && state !== 'identified') {
        const tSel = currentScriptStep.target || (currentScriptStep.action);
        if (tSel && tSel.panel && tSel.row && tSel.column) {
          const tid = createCellId(tSel.panel, tSel.row, tSel.column);
          if (tid === cellId) classes.push('la-cell--target-blink');
        }
      }

      // Typed entry (column sum, etc.): yellow prompt tile with orange border.
      if (
        hasActiveScript &&
        currentScriptStep &&
        currentScriptStep.action &&
        currentScriptStep.action.type === 'enter-value' &&
        resolveStepInputMode(currentScriptStep) === 'type' &&
        currentScriptStep.animation !== 'converge-to-target' &&
        state !== 'identified'
      ) {
        const tSel = currentScriptStep.target || currentScriptStep.action;
        if (tSel && tSel.panel && tSel.row && tSel.column) {
          const tid = createCellId(tSel.panel, tSel.row, tSel.column);
          if (tid === cellId) classes.push('la-cell--column-sum-input');
        }
      }

      // Type-mode numpad: non-focus cells look dimmed; no black scrim — only opacity/filter here.
      if (
        valueOverlay.open &&
        valueOverlay.mode === 'type' &&
        valueOverlay.target &&
        cellId &&
        cellId !== valueOverlay.target
      ) {
        classes.push('la-cell--script-numpad-dimmed');
      }

      // Focus tile above transparent click-catcher (z-index).
      if (
        valueOverlay.open &&
        valueOverlay.mode === 'type' &&
        valueOverlay.target &&
        cellId === valueOverlay.target
      ) {
        classes.push('la-cell--script-numpad-focus');
      }

      // Fill-missing number pad: same dim / focus stacking as scripted type numpad.
      if (
        type === 'fill-missing' &&
        fillMissingState.showNumberPad &&
        fillMissingState.focusedCell &&
        cellId &&
        cellId !== fillMissingState.focusedCell
      ) {
        classes.push('la-cell--script-numpad-dimmed');
      }
      if (
        type === 'fill-missing' &&
        fillMissingState.showNumberPad &&
        fillMissingState.focusedCell &&
        cellId === fillMissingState.focusedCell
      ) {
        classes.push('la-cell--script-numpad-focus');
      }

      // State-specific classes
      switch (state) {
        case 'identified':
          classes.push('la-cell--correct');
          break;
        case 'flip-reveal':
          classes.push('la-cell--flip-reveal');
          break;
        case 'missed':
          classes.push('la-cell--incorrect');
          break;
        case 'focused':
          classes.push('la-cell--focused');
          break;
        default:
          break;
      }
      
      return classes.filter(Boolean).join(' ');
    }, [getCellState, type, lockedCellsProp, isInteractive, selectedCells, incorrectState.pendingCheck, isIncorrectComplete, expectedCellId, hasActiveScript, currentScriptStep, scriptGestureReleasedCellIds, resolveStepInputMode, valueOverlay.open, valueOverlay.mode, valueOverlay.target, fillMissingState.showNumberPad, fillMissingState.focusedCell, fillMissingState.validatedCells]);

    const plan = React.useMemo(
      () => buildStepPlan(variant, numbers.length),
      [variant, numbers.length]
    );

    // Recompute grid→px layout when .main-container size settles (same idea as math-applet ResizeObserver):
    // first paint can use a stale rect; gc-based spacingPx/toPx then disagrees with real layout.
    const [layoutGcTick, setLayoutGcTick] = React.useState(0);
    React.useLayoutEffect(() => {
      if (typeof document === 'undefined') return undefined;
      const mc = document.querySelector('.main-container');
      if (!mc || typeof ResizeObserver === 'undefined') {
        const id = requestAnimationFrame(() => setLayoutGcTick((n) => n + 1));
        return () => cancelAnimationFrame(id);
      }
      let raf = 0;
      const schedule = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          raf = 0;
          setLayoutGcTick((t) => t + 1);
        });
      };
      const ro = new ResizeObserver(() => schedule());
      ro.observe(mc);
      schedule();
      return () => {
        ro.disconnect();
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);

    const incorrectProgressPanelGridCss = React.useMemo(
      () => cssFromProgressPanelGridCoords(incorrectProgressCoords4),
      [incorrectProgressCoords4, layoutGcTick]
    );
    const fillMissingProgressPanelGridCss = React.useMemo(
      () => cssFromProgressPanelGridCoords(fillMissingProgressCoords4),
      [fillMissingProgressCoords4, layoutGcTick]
    );

    React.useLayoutEffect(() => {
      if (type !== 'fill-missing' || !fillMissingState.showNumberPad || !fillMissingState.focusedCell) {
        setNumberPadPosition(null);
        return undefined;
      }
      if (typeof document === 'undefined') return undefined;

      let raf = 0;
      const measure = () => {
        const root = componentRootRef.current;
        if (!root) return;
        const host = document.querySelector('.main-container') || root;
        const cell = root.querySelector(`[data-cell-id="${fillMissingState.focusedCell}"]`);
        const pad = document.querySelector('.la-number-pad[data-fill-missing-pad="true"]');
        if (!host || !cell || !pad) return;

        const hostRect = host.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();
        const padRect = pad.getBoundingClientRect();
        const gapPx = Math.max(0, parseFloat(toPx('50gc', 'width')) || 50);
        const edgePad = 8;

        const hostWidth = hostRect.width;
        const hostHeight = hostRect.height;
        const padWidth = padRect.width;
        const padHeight = padRect.height;
        const rightLeft = cellRect.right - hostRect.left + gapPx;
        const leftLeft = cellRect.left - hostRect.left - gapPx - padWidth;
        const rightRoom = hostRect.right - cellRect.right - gapPx;
        const leftRoom = cellRect.left - hostRect.left - gapPx;

        let left;
        if (rightRoom >= padWidth) left = rightLeft;
        else if (leftRoom >= padWidth) left = leftLeft;
        else if (rightRoom >= leftRoom) left = Math.min(rightLeft, hostWidth - padWidth - edgePad);
        else left = Math.max(edgePad, leftLeft);

        const cellCenterY = cellRect.top - hostRect.top + cellRect.height / 2;
        const maxTop = Math.max(edgePad, hostHeight - padHeight - edgePad);
        const top = Math.min(Math.max(edgePad, cellCenterY - padHeight / 2), maxTop);

        setNumberPadPosition((prev) => {
          const next = {
            left: Math.round(left),
            top: Math.round(top),
          };
          if (prev && prev.left === next.left && prev.top === next.top) return prev;
          return next;
        });
      };

      raf = requestAnimationFrame(measure);
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    }, [
      type,
      fillMissingState.showNumberPad,
      fillMissingState.focusedCell,
      fillMissingState.inputValue,
      layoutGcTick,
    ]);

    // Step state for self mode; for controlled mode we read currentStepProp.
    const [internalStep, setInternalStep] = React.useState(0);
    const [paused, setPaused] = React.useState(!autoPlay);
    const stepRef = React.useRef(0);

    const clampStep = React.useCallback(
      (s) => Math.max(0, Math.min(plan.maxStep, Math.floor(s))),
      [plan.maxStep]
    );

    const effectiveStep =
      mode === 'controlled'
        ? clampStep(currentStepProp == null ? plan.maxStep : currentStepProp)
        : internalStep;

    React.useEffect(() => {
      stepRef.current = effectiveStep;
    }, [effectiveStep]);

    // Reset internal step when inputs that change the timeline change.
    React.useEffect(() => {
      if (mode !== 'self') return;
      setInternalStep(0);
      setPaused(!autoPlay);
    }, [variant, numbers.length, autoPlay, mode]);

    // Self-driven timer.
    React.useEffect(() => {
      if (mode !== 'self') return;
      if (paused) return;
      let cancelled = false;
      let intervalId = null;
      const startTimerId = setTimeout(() => {
        if (cancelled) return;
        intervalId = setInterval(() => {
          setInternalStep((prev) => {
            if (prev >= plan.maxStep) {
              if (loop) return 0;
              clearInterval(intervalId);
              return prev;
            }
            return prev + 1;
          });
        }, Math.max(50, stepDurationMs));
      }, Math.max(0, startDelayMs));
      return () => {
        cancelled = true;
        clearTimeout(startTimerId);
        if (intervalId) clearInterval(intervalId);
      };
    }, [mode, paused, plan.maxStep, stepDurationMs, startDelayMs, loop]);

    // Notify on step change.
    React.useEffect(() => {
      if (typeof onStepChange === 'function') {
        try {
          onStepChange(effectiveStep);
        } catch (_) {
          /* ignore */
        }
      }
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent('longAdditionStepChanged', {
            detail: { id: componentId, step: effectiveStep },
          })
        );
      }
      if (effectiveStep >= plan.maxStep) {
        if (typeof onComplete === 'function') {
          try {
            onComplete();
          } catch (_) {
            /* ignore */
          }
        }
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(
            new CustomEvent('longAdditionComplete', {
              detail: { id: componentId, step: effectiveStep },
            })
          );
        }
      }
    }, [effectiveStep, plan.maxStep, componentId, onStepChange, onComplete]);

    // Imperative API.
    React.useEffect(() => {
      if (typeof onReadyApi !== 'function') return;
      const api = {
        play: () => {
          if (mode === 'self') setPaused(false);
        },
        pause: () => {
          if (mode === 'self') setPaused(true);
        },
        next: () => {
          if (mode === 'self') {
            setInternalStep((p) => clampStep(p + 1));
          }
        },
        prev: () => {
          if (mode === 'self') {
            setInternalStep((p) => clampStep(p - 1));
          }
        },
        goto: (s) => {
          if (mode === 'self') setInternalStep(clampStep(s));
        },
        reset: () => {
          if (mode === 'self') {
            setInternalStep(0);
            setPaused(!autoPlay);
          }
        },
        getStep: () => stepRef.current,
        getMaxStep: () => plan.maxStep,
      };
      try {
        onReadyApi(api);
      } catch (_) {
        /* ignore */
      }
    }, [onReadyApi, mode, autoPlay, plan.maxStep, clampStep]);

    // Resolve container size in px: prefer grid span × .main-container (matches % layout);
    // avoid treating "47.5%" as 47.5 px from position.css.
    const layoutDims = React.useMemo(() => {
      const coords = position?.coordinates;
      const el =
        typeof document !== 'undefined'
          ? document.querySelector('.main-container')
          : null;
      if (
        coords &&
        coords.length >= 4 &&
        el &&
        typeof el.getBoundingClientRect === 'function'
      ) {
        try {
          const [x1, y1, x2, y2] = coords.map(Number);
          const r = el.getBoundingClientRect();
          const prec =
            (typeof window !== 'undefined' &&
              window.GridPrecisionConfig &&
              window.GridPrecisionConfig.precisionSettings &&
              window.GridPrecisionConfig.precisionSettings[
                window.GridPrecisionConfig.currentPrecision ?? 100
              ]) || { cols: 1600, rows: 900 };
          const w = ((x2 - x1) / prec.cols) * r.width;
          const h = ((y2 - y1) / prec.rows) * r.height;
          if (Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0) {
            return { widthPx: w, heightPx: h };
          }
        } catch (_) {
          /* ignore */
        }
      }
      const containerCss = position?.css || {};
      const parseCssDim = (v) => {
        if (typeof v === 'number' && Number.isFinite(v)) return v;
        if (typeof v !== 'string') return 0;
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : 0;
      };
      return {
        widthPx: parseCssDim(containerCss.width),
        heightPx: parseCssDim(containerCss.height),
      };
    }, [layoutGcTick, position]);

    const widthPx = layoutDims.widthPx;
    const heightPx = layoutDims.heightPx;

    // Geometry derivation.
    // - Horizontal bands: rowH is at most the chip band implied by column widths; extra
    //   container height is left unused so rowGap (verticalGap) reads clearly instead of
    //   being absorbed into a stretched rowH (fixed H ⇒ r+v grows only as v/n otherwise).
    // - For both mode, split width: ~35% simple / rest expanded, minus `middleBlock` gap between panels.
    const showSimple = variant === 'simple' || variant === 'both';
    const showExpanded = variant === 'expanded' || variant === 'both';
    const equalsInMiddleStrip =
      variant === 'both' && showSimple && showExpanded;

    // Simple-panel carry row (left block): show only when a revealed simple:carry cell
    // has a digit, override, or scripted placeholder.
    const simpleCarryRowVisible = React.useMemo(() => {
      if (!hasActiveScript) return false;
      for (let c = 0; c < totalCols; c++) {
        const pk = placeKeyForColumn(c, totalCols);
        if (!isRevealed(revealedSet, 'simple', 'carry', pk)) continue;
        const id = createCellId('simple', 'carry', pk);
        if (cellValueOverrides.has(id)) return true;
        const v = scriptCellValues.get(id);
        if (v != null && v !== '') return true;
      }
      return false;
    }, [hasActiveScript, revealedSet, totalCols, cellValueOverrides, scriptCellValues]);

    // Expanded-panel carry row (right block): used by `guided_flow_short` split-carry
    // so carries land above operands in the expanded grid, not on the simple panel.
    const expandedCarryRowVisible = React.useMemo(() => {
      if (!hasActiveScript) return false;
      for (let c = 0; c < totalCols; c++) {
        const pk = placeKeyForColumn(c, totalCols);
        if (!isRevealed(revealedSet, 'expanded', 'carry', pk)) continue;
        const id = createCellId('expanded', 'carry', pk);
        if (cellValueOverrides.has(id)) return true;
        const v = scriptCellValues.get(id);
        if (v != null && v !== '') return true;
      }
      return false;
    }, [hasActiveScript, revealedSet, totalCols, cellValueOverrides, scriptCellValues]);

    // Expanded place-value row (1000, 100, …): when hidden by the script, it must not
    // still consume a vertical band — that empty strip is what learners read as an
    // extra "carry" row on the right.
    const bothExpandedPlaceRowRevealed = React.useMemo(
      () =>
        variant === 'both' &&
        hasActiveScript &&
        isRevealed(revealedSet, 'expanded', 'place', null),
      [variant, hasActiveScript, revealedSet]
    );

    const scriptBothUsesMiddleBandRow = React.useMemo(
      () =>
        simpleCarryRowVisible ||
        expandedCarryRowVisible ||
        bothExpandedPlaceRowRevealed,
      [simpleCarryRowVisible, expandedCarryRowVisible, bothExpandedPlaceRowRevealed]
    );

    // Simple-panel operand/sum vertical indices. Scripted `both`: one shared "middle"
    // row band only while the expanded place row or either panel's carry row is active.
    const simpleOperandRowOffset = React.useMemo(() => {
      if (variant === 'both') {
        if (hasActiveScript) return scriptBothUsesMiddleBandRow ? 2 : 1;
        return 2;
      }
      return simpleCarryRowVisible ? 2 : 1;
    }, [variant, hasActiveScript, scriptBothUsesMiddleBandRow, simpleCarryRowVisible]);

    const numRows = (() => {
      if (variant === 'simple') {
        // header + (carry?) + operands + sum — extra row only while carry is revealed
        return numbers.length + 2 + (simpleCarryRowVisible ? 1 : 0);
      }
      if (variant === 'expanded')
        return 1 /* header */ + 1 /* place */ + numbers.length /* operands */ + 1 /* sum */;
      // both: same row count as expanded; simple operands shift down one band when
      // the carry row is revealed so they stay aligned with expanded operand rows.
      return 1 + 1 + numbers.length + 1;
    })();

    const layoutNumRows = React.useMemo(() => {
      if (variant === 'both' && hasActiveScript) {
        return numbers.length + 2 + (scriptBothUsesMiddleBandRow ? 1 : 0);
      }
      return numRows;
    }, [variant, hasActiveScript, numbers.length, scriptBothUsesMiddleBandRow, numRows]);

    const expandedOperandRowBase = React.useMemo(() => {
      if (variant === 'both' && hasActiveScript) {
        return scriptBothUsesMiddleBandRow ? 2 : 1;
      }
      return 2;
    }, [variant, hasActiveScript, scriptBothUsesMiddleBandRow]);

    /** Parse px number from number, "12px", or "5gc" (gc via toPx + GridCellFontUtils). */
    const spacingPx = (raw, gcPropertyName) => {
      if (raw == null || raw === '') return NaN;
      if (typeof raw === 'number' && Number.isFinite(raw)) return Math.max(0, raw);
      if (typeof raw === 'string') {
        const t = raw.trim();
        if (!t) return NaN;
        if (t.endsWith('gc')) {
          const pxStr = toPx(t, gcPropertyName);
          const n = parseFloat(pxStr);
          return Number.isFinite(n) ? Math.max(0, n) : NaN;
        }
        const n = parseFloat(t);
        return Number.isFinite(n) ? Math.max(0, n) : NaN;
      }
      return NaN;
    };

    const rowGapRaw =
      rowGapProp != null && rowGapProp !== ''
        ? rowGapProp
        : processedStylesIgnored &&
            typeof processedStylesIgnored === 'object' &&
            processedStylesIgnored.rowGap != null &&
            processedStylesIgnored.rowGap !== ''
          ? processedStylesIgnored.rowGap
          : undefined;

    const columnGapRaw =
      columnGapProp != null && columnGapProp !== ''
        ? columnGapProp
        : processedStylesIgnored &&
            typeof processedStylesIgnored === 'object' &&
            processedStylesIgnored.columnGap != null &&
            processedStylesIgnored.columnGap !== ''
          ? processedStylesIgnored.columnGap
          : undefined;

    const verticalGap = (() => {
      const fromRow = spacingPx(rowGapRaw, 'paddingTop');
      if (Number.isFinite(fromRow)) return fromRow;
      const fromGap = spacingPx(gapProp, 'paddingTop');
      return Number.isFinite(fromGap) && fromGap >= 0 ? fromGap : 10;
    })();

    const columnGapPx = (() => {
      if (columnGapRaw == null || columnGapRaw === '') return NaN;
      return spacingPx(columnGapRaw, 'width');
    })();

    const expandedColumnGapRaw = (() => {
      const cands = [
        props.expandedColumnGap,
        props.processedStyles && props.processedStyles.expandedColumnGap,
        expandedColumnGapProp,
        processedStylesIgnored &&
          typeof processedStylesIgnored === 'object' &&
          processedStylesIgnored.expandedColumnGap,
      ];
      for (let i = 0; i < cands.length; i++) {
        const v = cands[i];
        if (v != null && v !== '') return v;
      }
      return undefined;
    })();

    const expandedColumnGapPx = (() => {
      if (expandedColumnGapRaw == null || expandedColumnGapRaw === '') return NaN;
      return spacingPx(expandedColumnGapRaw, 'width');
    })();

    const minColExpanded =
      expandedColumnGapRaw != null && expandedColumnGapRaw !== '' ? 22 : 36;

    const middleGapRaw = (() => {
      const cands = [
        props.middleBlock,
        props.processedStyles && props.processedStyles.middleBlock,
        middleBlockProp,
        processedStylesIgnored &&
          typeof processedStylesIgnored === 'object' &&
          processedStylesIgnored.middleBlock,
      ];
      for (let i = 0; i < cands.length; i++) {
        const v = cands[i];
        if (v != null && v !== '') return v;
      }
      return undefined;
    })();
    const middleGapPx = (() => {
      if (middleGapRaw == null || middleGapRaw === '') return NaN;
      return spacingPx(middleGapRaw, 'width');
    })();

    const rightColumnWidthRaw = (() => {
      const cands = [
        props.rightBlock,
        props.processedStyles && props.processedStyles.rightBlock,
        rightBlockProp,
        processedStylesIgnored &&
          typeof processedStylesIgnored === 'object' &&
          processedStylesIgnored.rightBlock,
      ];
      for (let i = 0; i < cands.length; i++) {
        const v = cands[i];
        if (v != null && v !== '') return v;
      }
      return undefined;
    })();
    const rightColumnWidthPx = (() => {
      if (rightColumnWidthRaw == null || rightColumnWidthRaw === '') return NaN;
      return spacingPx(rightColumnWidthRaw, 'width');
    })();

    // --- Horizontal layout (needed before rowH so chip band does not steal rowGap) ---
    const colGap = (() => {
      if (Number.isFinite(columnGapPx) && columnGapPx >= 0) return columnGapPx;
      const g = parseFloat(toPx(gapProp, 'width')) || 10;
      return g;
    })();

    const simpleCols = totalCols + 1; // +1 for operator slot
    const simpleRegionWidth = (() => {
      if (!showSimple) return 0;
      if (variant === 'both') return Math.max(180, Math.floor(widthPx * 0.34));
      return widthPx;
    })();
    const leftColumnWidthRaw = (() => {
      const cands = [
        props.leftBlock,
        props.processedStyles && props.processedStyles.leftBlock,
        leftBlockProp,
        processedStylesIgnored &&
          typeof processedStylesIgnored === 'object' &&
          processedStylesIgnored.leftBlock,
      ];
      for (let i = 0; i < cands.length; i++) {
        const v = cands[i];
        if (v != null && v !== '') return v;
      }
      return undefined;
    })();
    const leftColumnWidthPx = (() => {
      if (leftColumnWidthRaw == null || leftColumnWidthRaw === '') return NaN;
      return spacingPx(leftColumnWidthRaw, 'width');
    })();

    const simpleColWComputed = (() => {
      if (!showSimple || simpleRegionWidth <= 0) return 56;
      const totalGapW = colGap * (simpleCols - 1);
      const usable = simpleRegionWidth - totalGapW;
      return Math.max(34, Math.floor(usable / simpleCols));
    })();

    let simpleColW = simpleColWComputed;
    if (
      showSimple &&
      simpleRegionWidth > 0 &&
      Number.isFinite(leftColumnWidthPx) &&
      leftColumnWidthPx >= 0
    ) {
      const rawMaxSimple = Math.floor(
        (simpleRegionWidth - (simpleCols - 1) * colGap) / simpleCols
      );
      simpleColW = Math.max(
        34,
        Math.min(Math.floor(leftColumnWidthPx), rawMaxSimple)
      );
    }

    /** Horizontal space between simple (left) and expanded (right) when `variant === 'both'`. */
    const bothPanelGapPx = (() => {
      if (variant !== 'both') return 0;
      if (Number.isFinite(middleGapPx) && middleGapPx >= 0) {
        return Math.max(0, Math.floor(middleGapPx));
      }
      return 24;
    })();

    const expandedRegionWidth = (() => {
      if (!showExpanded) return 0;
      if (variant === 'both') {
        return Math.max(0, widthPx - simpleRegionWidth - bothPanelGapPx);
      }
      return widthPx;
    })();
    const expandedSlotCount = totalCols;
    // Width budget in the **right** expanded region: with `both`, '=' sits in middleBlock, so
    // only the n '+' lanes (between digits + trailing) count here; else include leading '='.
    const layoutSepCount = equalsInMiddleStrip
      ? expandedSlotCount
      : 1 + expandedSlotCount;
    const expandedColWBase = (() => {
      if (!showExpanded || expandedRegionWidth <= 0) return 84;
      const ratio = 1.0;
      const sepRatio = 0.4;
      const totalUnits = expandedSlotCount * ratio + layoutSepCount * sepRatio;
      const unit = expandedRegionWidth / totalUnits;
      return Math.max(36, Math.floor(unit * ratio));
    })();
    const expandedSepWidthBase = (() => {
      if (!showExpanded || expandedRegionWidth <= 0) return 28;
      const w = Math.max(16, Math.floor(expandedColWBase * 0.4));
      return w;
    })();

    let expandedColW = expandedColWBase;
    let expandedSepWidth = expandedSepWidthBase;
    if (
      showExpanded &&
      expandedRegionWidth > 0 &&
      Number.isFinite(expandedColumnGapPx) &&
      expandedColumnGapPx >= 0
    ) {
      const n = expandedSlotCount;
      const s = layoutSepCount;
      const W = expandedRegionWidth;
      // Default auto layout keeps columns ≥36px. When the author sets expandedColumnGap, allow
      // narrower slots so large gc values are not always forced back to ~floor((W-4*36)/5) ("clamped").
      const minCol = minColExpanded;
      // Use the configured value as the *target* sep width. Min 4px (not 16): auto layout
      // already clamps seps to 16px, so 10–14gc often became 16px and matched the default — no visible change.
      let sepW = Math.max(4, Math.floor(expandedColumnGapPx));
      let colW = Math.floor((W - s * sepW) / n);
      if (colW < minCol) {
        sepW = Math.max(4, Math.floor((W - n * minCol) / s));
        colW = Math.max(minCol, Math.floor((W - s * sepW) / n));
      }
      expandedColW = colW;
      expandedSepWidth = sepW;
    }

    let expandedEqualsSepWidth = expandedSepWidth;

    const nExp = expandedSlotCount;
    const Wexp = expandedRegionWidth;
    const refitExpandedCore = () => {
      if (!showExpanded || Wexp <= 0 || nExp <= 0) return;
      let eq = equalsInMiddleStrip ? 0 : expandedEqualsSepWidth;
      let pl = expandedSepWidth;
      let cw = Math.floor((Wexp - eq - nExp * pl) / nExp);
      if (cw >= minColExpanded) {
        expandedColW = cw;
        return;
      }
      pl = Math.max(4, Math.floor((Wexp - eq - nExp * minColExpanded) / nExp));
      expandedSepWidth = pl;
      cw = Math.max(
        minColExpanded,
        Math.floor((Wexp - eq - nExp * pl) / nExp)
      );
      if (cw < minColExpanded) {
        if (!equalsInMiddleStrip) {
          eq = Math.max(4, Wexp - nExp * minColExpanded - nExp * 4);
          expandedEqualsSepWidth = eq;
        }
        pl = 4;
        expandedSepWidth = 4;
        cw = Math.max(
          minColExpanded,
          Math.floor((Wexp - eq - nExp * pl) / nExp)
        );
      }
      expandedColW = cw;
    };

    refitExpandedCore();

    if (
      showExpanded &&
      Wexp > 0 &&
      Number.isFinite(rightColumnWidthPx) &&
      rightColumnWidthPx >= 0
    ) {
      const want = Math.max(minColExpanded, Math.floor(rightColumnWidthPx));
      const maxCw = Math.floor(
        (Wexp -
          (equalsInMiddleStrip ? 0 : expandedEqualsSepWidth) -
          nExp * expandedSepWidth) /
          nExp
      );
      expandedColW = Math.min(want, Math.max(minColExpanded, maxCw));
    }

    for (let guard = 0; guard < 48; guard++) {
      if (!showExpanded || Wexp <= 0) break;
      const inner =
        (equalsInMiddleStrip ? 0 : expandedEqualsSepWidth) +
        nExp * expandedColW +
        nExp * expandedSepWidth;
      if (inner <= Wexp) break;
      if (expandedColW > minColExpanded) {
        expandedColW -= 1;
        continue;
      }
      if (expandedSepWidth > 4) {
        expandedSepWidth -= 1;
        continue;
      }
      if (!equalsInMiddleStrip && expandedEqualsSepWidth > 4) {
        expandedEqualsSepWidth -= 1;
        continue;
      }
      break;
    }

    const chipSide = (colWCell, rowBand) => {
      const band =
        Number.isFinite(rowBand) && rowBand > 0 ? rowBand : colWCell;
      const m = Math.min(band, colWCell);
      return Math.max(28, Math.floor(m));
    };

    const bothPanels = equalsInMiddleStrip;
    const bigBand = Number.MAX_SAFE_INTEGER;

    const idealRowBand = (() => {
      if (bothPanels) {
        return chipSide(Math.min(simpleColW, expandedColW), bigBand);
      }
      if (showSimple) return chipSide(simpleColW, bigBand);
      if (showExpanded) return chipSide(expandedColW, bigBand);
      return 70;
    })();

    const rowHFill =
      heightPx <= 0
        ? 70
        : Math.max(
            28,
            Math.floor(
              (heightPx - verticalGap * (layoutNumRows - 1)) / layoutNumRows
            )
          );

    const rowH = Math.min(idealRowBand, rowHFill);

    const lineThickness = (() => {
      const t = parseFloat(toPx(lineThicknessProp, 'borderWidth'));
      if (Number.isFinite(t) && t > 0) return t;
      return Math.max(2, Math.floor(rowH * 0.06));
    })();

    const digitFontSizeBase = (() => {
      const f = parseFloat(toPx(digitFontSizeProp, 'fontSize'));
      if (Number.isFinite(f) && f > 0) return f;
      return Math.max(14, Math.floor(rowH * 0.55));
    })();

    const placeFontSizeBase = (() => {
      const f = parseFloat(toPx(placeFontSizeProp, 'fontSize'));
      if (Number.isFinite(f) && f > 0) return f;
      return Math.max(12, Math.floor(rowH * 0.42));
    })();

    const headerFontSizeBase = (() => {
      const f = parseFloat(toPx(headerFontSizeProp, 'fontSize'));
      if (Number.isFinite(f) && f > 0) return f;
      return placeFontSizeBase;
    })();

    // Compute starting X for each region
    const simpleStartX = (() => {
      if (!showSimple) return 0;
      const innerWidth =
        simpleCols * simpleColW + (simpleCols - 1) * colGap;
      const xOffset = Math.max(0, Math.floor((simpleRegionWidth - innerWidth) / 2));
      // `simpleCols = totalCols + 1` includes one operator lane. English (`left`): that lane
      // is before the digits — skip it so `renderStackedRow` operatorLeft aligns to col 0.
      // Indonesian (`right`): operator is after digits — digits start at col 0; do not skip.
      if (operatorPosition === 'left') {
        return xOffset + simpleColW + colGap;
      }
      return xOffset;
    })();

    const expandedStartX = (() => {
      if (!showExpanded) return 0;
      const xBase = variant === 'both' ? simpleRegionWidth + bothPanelGapPx : 0;
      const n = expandedSlotCount;
      if (equalsInMiddleStrip) {
        const innerNoEq = n * expandedColW + n * expandedSepWidth;
        const xOffset = Math.max(
          0,
          Math.floor((expandedRegionWidth - innerNoEq) / 2)
        );
        return xBase + xOffset;
      }
      const innerWidth =
        expandedEqualsSepWidth + n * expandedColW + n * expandedSepWidth;
      const xOffset = Math.max(
        0,
        Math.floor((expandedRegionWidth - innerWidth) / 2)
      );
      return xBase + xOffset + expandedEqualsSepWidth;
    })();

    // Square chips: height from row band rowH; width from text + buffer (see header).
    const unifiedChipS = bothPanels
      ? chipSide(Math.min(simpleColW, expandedColW), rowH)
      : null;
    const simpleChipS = showSimple
      ? unifiedChipS != null
        ? unifiedChipS
        : chipSide(simpleColW, rowH)
      : rowH;
    const expandedChipS = showExpanded
      ? unifiedChipS != null
        ? unifiedChipS
        : chipSide(expandedColW, rowH)
      : rowH;

    const textWidthBufferPx = (() => {
      const parseBuf = (val) => {
        if (val == null) return NaN;
        if (typeof val === 'number') return val;
        return parseFloat(toPx(val, 'paddingLeft'));
      };
      const fromPrimary = parseBuf(textWidthBufferProp);
      if (Number.isFinite(fromPrimary) && fromPrimary >= 0) return fromPrimary;
      const fromPadding = parseBuf(cardPaddingProp);
      if (Number.isFinite(fromPadding) && fromPadding >= 0) return fromPadding;
      return 10;
    })();

    const simpleCardH = simpleChipS;
    const expandedCardH = expandedChipS;

    const cardRadius = (() => {
      const rExplicit = parseFloat(toPx(cardRadiusProp, 'borderRadius'));
      if (Number.isFinite(rExplicit) && rExplicit > 0) return rExplicit;
      const ref = Math.min(
        showSimple ? simpleCardH : rowH,
        showExpanded ? expandedCardH : rowH
      );
      return Math.max(6, Math.min(22, Math.floor(ref * 0.2)));
    })();

    const rowTop = (rowIndex) => rowIndex * (rowH + verticalGap);
    const simpleInsetTop = (rowIndex) =>
      rowTop(rowIndex) + Math.floor((rowH - simpleCardH) / 2);
    const expandedInsetTop = (rowIndex) =>
      rowTop(rowIndex) + Math.floor((rowH - expandedCardH) / 2);

    // Scripted emphasis container bounds computed from layout geometry (not DOM rects).
    const emphasisBox = React.useMemo(() => {
      if (!hasActiveScript || !currentScriptStep || !currentScriptStep.emphasizeContainer) return null;
      const cfg = currentScriptStep.emphasizeContainer;
      if (!cfg || !cfg.panel) return null;
      const pad = Number.isFinite(cfg.paddingPx) ? cfg.paddingPx : 10;
      const transparentBg = !!cfg.transparentBackground;
      const emphasisColor = typeof cfg.borderColor === 'string' && cfg.borderColor.trim()
        ? cfg.borderColor.trim()
        : null;

      if (cfg.panel === 'simple') {
        const rows = Array.isArray(cfg.rows) ? cfg.rows : [];
        if (rows.length === 0) return null;

        const operandRowOffset = simpleOperandRowOffset;
        const rowIndexFor = (rowType) => {
          if (rowType === 'header') return 0;
          if (rowType === 'carry') return simpleCarryRowVisible ? 1 : null;
          if (rowType === 'divider') return null;
          if (rowType === 'sum') return operandRowOffset + numbers.length;
          if (typeof rowType === 'string' && rowType.startsWith('operand-')) {
            const idx = parseInt(rowType.slice('operand-'.length), 10);
            if (!Number.isFinite(idx) || idx < 0) return null;
            return operandRowOffset + idx;
          }
          return null;
        };

        const indices = rows.map(rowIndexFor).filter((n) => n != null);
        if (indices.length === 0) return null;
        const minIdx = Math.min(...indices);
        const maxIdx = Math.max(...indices);

        const left = Math.max(0, simpleStartX - pad);
        const width = Math.max(0, (totalCols * simpleColW + (totalCols - 1) * colGap) + pad * 2);
        const top = Math.max(0, simpleInsetTop(minIdx) - pad);
        const bottom = simpleInsetTop(maxIdx) + simpleCardH + pad;
        const height = Math.max(0, bottom - top);

        return {
          key: `simple:${rows.join(',')}:${scriptStepIndex}`,
          left,
          top,
          width,
          height,
          transparentBg,
          emphasisColor,
        };
      }

      if (cfg.panel === 'expanded' && showExpanded) {
        const cols = Array.isArray(cfg.columns) ? cfg.columns : [];
        if (cols.length === 0) return null;
        let minC = Infinity;
        let maxC = -Infinity;
        for (const pk of cols) {
          let cIdx = -1;
          for (let i = 0; i < totalCols; i++) {
            if (placeKeyForColumn(i, totalCols) === pk) {
              cIdx = i;
              break;
            }
          }
          if (cIdx < 0) continue;
          minC = Math.min(minC, cIdx);
          maxC = Math.max(maxC, cIdx);
        }
        if (!Number.isFinite(minC) || maxC < 0) return null;
        const colSpanW =
          (maxC - minC + 1) * expandedColW + (maxC - minC) * expandedSepWidth;
        const left = expandedStartX + minC * (expandedColW + expandedSepWidth) - pad;
        const width = Math.max(0, colSpanW + pad * 2);
        const minRow = 0;
        const maxRow = expandedOperandRowBase + numbers.length;
        const top = Math.max(0, expandedInsetTop(minRow) - pad);
        const bottom = expandedInsetTop(maxRow) + expandedCardH + pad;
        const height = Math.max(0, bottom - top);
        return {
          key: `expanded:${cols.join(',')}:${scriptStepIndex}`,
          left,
          top,
          width,
          height,
          transparentBg,
          emphasisColor,
        };
      }

      return null;
    }, [
      hasActiveScript,
      currentScriptStep,
      scriptStepIndex,
      variant,
      showExpanded,
      simpleOperandRowOffset,
      simpleCarryRowVisible,
      numbers.length,
      simpleStartX,
      simpleColW,
      simpleCardH,
      colGap,
      totalCols,
      simpleInsetTop,
      expandedStartX,
      expandedColW,
      expandedSepWidth,
      expandedCardH,
      expandedInsetTop,
      expandedOperandRowBase,
    ]);

    // Keep **default** font sizes inside card bounds. When the author sets digit/place/header
    // font sizes in config, do not clamp — otherwise 24gc vs 36gc often collapse to the same
    // cap (~58% of chip) and changing PageConfig appears to do nothing.
    const capFontToCell = (sizePx, cellW, cellH) => {
      if (!Number.isFinite(sizePx) || sizePx <= 0) return sizePx;
      const cw = Number.isFinite(cellW) && cellW > 0 ? cellW : 0;
      const ch = Number.isFinite(cellH) && cellH > 0 ? cellH : 0;
      if (cw <= 0 || ch <= 0) return sizePx;
      const cellMin = Math.min(cw, ch);
      const cap = Math.max(8, Math.floor(cellMin * 0.58) - 2);
      return Math.min(sizePx, cap);
    };

    const explicitFont = (prop) =>
      prop != null && String(prop).trim() !== '';

    const explicitDigitFont = explicitFont(digitFontSizeProp);
    const explicitPlaceFont = explicitFont(placeFontSizeProp);
    const explicitHeaderFont = explicitFont(headerFontSizeProp);

    let digitFontSize = digitFontSizeBase;
    let placeFontSize = placeFontSizeBase;
    let headerFontSize = headerFontSizeBase;
    if (showSimple) {
      if (!explicitDigitFont) {
        digitFontSize = capFontToCell(digitFontSize, simpleColW, simpleCardH);
      }
      if (!explicitPlaceFont) {
        placeFontSize = capFontToCell(placeFontSize, simpleColW, simpleCardH);
      }
      if (!explicitHeaderFont) {
        headerFontSize = capFontToCell(headerFontSize, simpleColW, simpleCardH);
      }
    }
    if (showExpanded) {
      if (!explicitDigitFont) {
        digitFontSize = capFontToCell(digitFontSize, expandedColW, expandedCardH);
      }
      if (!explicitPlaceFont) {
        placeFontSize = capFontToCell(placeFontSize, expandedColW, expandedCardH);
      }
      if (!explicitHeaderFont) {
        headerFontSize = capFontToCell(headerFontSize, expandedColW, expandedCardH);
      }
    }

    const fillMissingFocusedCellIdForRows =
      type === 'fill-missing' && fillMissingState.focusedCell
        ? fillMissingState.focusedCell
        : null;

    // ===== Build SIMPLE view rows =====
    const simpleChildren = [];
    if (showSimple) {
      const planRef = plan.simple || plan.expanded; // both shares plan.simple
      // Header row
      const headerCells = [];
      for (let c = 0; c < totalCols; c++) {
        headerCells.push(placeKeyForColumn(c, totalCols));
      }
      const headerVisible = resolveVisible('simple', 'header', null, effectiveStep >= planRef.headerStep);
      simpleChildren.push(
        ...renderStackedRow({
          cells: headerCells,
          totalCols,
          kind: 'header',
          visible: headerVisible,
          geom: {
            startX: simpleStartX,
            top: simpleInsetTop(0),
            colW: simpleColW,
            rowH: simpleCardH,
            gap: colGap,
            cardRadius,
            textWidthBufferPx,
            headerFontSize,
            digitFontSize,
            headerCardFontStyle,
            digitCardFontStyle,
            placeCardFontStyle,
          },
          colors,
          operatorLeft: null,
          operatorRight: null,
          keyPrefix: 'simple-h',
          panel: 'simple',
          rowType: 'header',
          onCellClick: isInteractive ? handleCellClick : undefined,
          getCellClasses: isInteractive ? getCellClasses : undefined,
          cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
          cellStates: isInteractive ? cellStates : undefined,
          revealedSet: hasActiveScript ? revealedSet : undefined,
          interactiveType: type,
          fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
        })
      );

      // Operand rows — vertical offset from `simpleOperandRowOffset` (see simpleCarryRowVisible).
      const operandRowOffset = simpleOperandRowOffset;
      // ---- Carry row (Phase B): simple panel only, after reveal ----
      if (simpleCarryRowVisible) {
        const carryRowIdx = 1; // immediately after header
        const carryVisible = resolveVisible('simple', 'carry', null, false);
        const carryCardH = Math.max(
          Math.floor(simpleCardH * 0.6),
          Math.min(simpleCardH, 18)
        );
        const carryFontSize = Math.max(
          Math.floor(digitFontSize * 0.65),
          10
        );
        const carryTopOffset = rowTop(carryRowIdx)
          + Math.floor((rowH - carryCardH) / 2);
        const carryCells = [];
        for (let c = 0; c < totalCols; c++) {
          const placeKey = placeKeyForColumn(c, totalCols);
          const cellId = createCellId('simple', 'carry', placeKey);
          const userVal = scriptCellValues.get(cellId);
          carryCells.push(userVal != null && userVal !== '' ? String(userVal) : '');
        }
        simpleChildren.push(
          ...renderStackedRow({
            cells: carryCells,
            totalCols,
            kind: 'digits',
            visible: carryVisible,
            geom: {
              startX: simpleStartX,
              top: carryTopOffset,
              colW: simpleColW,
              rowH: carryCardH,
              gap: colGap,
              cardRadius: Math.max(2, Math.floor(cardRadius * 0.7)),
              textWidthBufferPx,
              headerFontSize: carryFontSize,
              digitFontSize: carryFontSize,
              headerCardFontStyle,
              digitCardFontStyle,
              placeCardFontStyle,
            },
            colors,
            operatorLeft: null,
            operatorRight: null,
            keyPrefix: 'simple-carry',
            panel: 'simple',
            rowType: 'carry',
            onCellClick: isInteractive ? handleCellClick : undefined,
            getCellClasses: isInteractive ? getCellClasses : undefined,
            cellValueOverrides: hasActiveScript ? cellValueOverrides : undefined,
            cellStates: isInteractive ? cellStates : undefined,
            revealedSet: hasActiveScript ? revealedSet : undefined,
            extraCellClass: 'la-cell--carry',
            interactiveType: type,
            fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
          })
        );
      }
      for (let i = 0; i < numbers.length; i++) {
        const visible = resolveVisible(
          'simple',
          `operand-${i}`,
          null,
          effectiveStep >= planRef.operandSteps[i]
        );
        const cells = digitsOf(numbers[i], totalCols);
        const isBottom = i === numbers.length - 1;
        // Operator: when scripted, also requires explicit `element:operator-plus` reveal.
        const operatorRevealed = hasActiveScript
          ? isRevealed(revealedSet, 'element', 'operator-plus')
          : true;
        const operatorLeft =
          isBottom && operatorPosition === 'left' && visible && operatorRevealed ? '+' : null;
        const operatorRight =
          isBottom && operatorPosition === 'right' && visible && operatorRevealed ? '+' : null;
        simpleChildren.push(
          ...renderStackedRow({
            cells,
            totalCols,
            kind: 'digits',
            visible,
            geom: {
              startX: simpleStartX,
              top: simpleInsetTop(operandRowOffset + i),
              colW: simpleColW,
              rowH: simpleCardH,
              gap: colGap,
              cardRadius,
              textWidthBufferPx,
              headerFontSize,
              digitFontSize,
              headerCardFontStyle,
              digitCardFontStyle,
              placeCardFontStyle,
            },
            colors,
            operatorLeft,
            operatorRight,
            keyPrefix: `simple-op-${i}`,
            panel: 'simple',
            rowType: `operand-${i}`,
            onCellClick: isInteractive ? handleCellClick : undefined,
            getCellClasses: isInteractive ? getCellClasses : undefined,
            cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
            cellStates: isInteractive ? cellStates : undefined,
            revealedSet: hasActiveScript ? revealedSet : undefined,
            interactiveType: type,
            fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
          })
        );
      }

      // Divider: in the vertical gap between last operand row band and sum row (not
      // centered in the sum band — that misaligns once rowH + verticalGap layout is used).
      const dividerVisible = resolveVisible('simple', 'divider', null, effectiveStep >= planRef.dividerStep);
      const lastOpRowIdx = operandRowOffset + numbers.length - 1;
      const gapAfterOperandsY = rowTop(lastOpRowIdx) + rowH;
      const dividerTop =
        gapAfterOperandsY +
        Math.max(0, Math.floor((verticalGap - lineThickness) / 2));
      simpleChildren.push(
        renderDividerLine({
          startX: simpleStartX,
          top: dividerTop,
          colW: simpleColW,
          gap: colGap,
          totalCols,
          lineColor,
          lineThickness,
          visible: dividerVisible,
          keyPrefix: 'simple',
        })
      );

      // Sum row
      const sumVisible = resolveVisible('simple', 'sum', null, effectiveStep >= planRef.sumStep);
      const sumCells = digitsOf(sum, totalCols);
      simpleChildren.push(
        ...renderStackedRow({
          cells: sumCells,
          totalCols,
          kind: 'digits',
          visible: sumVisible,
          geom: {
            startX: simpleStartX,
            top: simpleInsetTop(operandRowOffset + numbers.length),
            colW: simpleColW,
            rowH: simpleCardH,
            gap: colGap,
            cardRadius,
            textWidthBufferPx,
            headerFontSize,
            digitFontSize,
            headerCardFontStyle,
            digitCardFontStyle,
            placeCardFontStyle,
          },
          colors,
          operatorLeft: null,
          operatorRight: null,
          keyPrefix: 'simple-sum',
          panel: 'simple',
          rowType: 'sum',
          onCellClick: isInteractive ? handleCellClick : undefined,
          getCellClasses: isInteractive ? getCellClasses : undefined,
          cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
          cellStates: isInteractive ? cellStates : undefined,
          revealedSet: hasActiveScript ? revealedSet : undefined,
          interactiveType: type,
          fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
        })
      );
    }

    // ===== Build EXPANDED view rows =====
    const expandedChildren = [];
    if (showExpanded) {
      const planRef = plan.expanded;
      // Row 0: header
      const headerVisible = resolveVisible('expanded', 'header', null, effectiveStep >= planRef.headerStep);
      const headerTokens = [];
      for (let c = 0; c < totalCols; c++) {
        const pk = placeKeyForColumn(c, totalCols);
        const label = placeLabels[pk];
        headerTokens.push(label != null && label !== '' ? String(label) : pk);
      }
      expandedChildren.push(
        ...renderExpandedRow({
          tokens: headerTokens,
          totalCols,
          kind: 'header',
          equalsLeading: false,
          trailingPlus: false,
          visible: headerVisible,
          geom: {
            startX: expandedStartX,
            top: expandedInsetTop(0),
            colW: expandedColW,
            rowH: expandedCardH,
            gap: expandedSepWidth,
            sepWidth: expandedSepWidth,
            plusSepWidth: expandedSepWidth,
            equalsSepWidth: expandedEqualsSepWidth,
            cardRadius,
            textWidthBufferPx,
            headerFontSize,
            digitFontSize,
            headerCardFontStyle,
            digitCardFontStyle,
            placeCardFontStyle,
          },
          colors,
          keyPrefix: 'exp-h',
          panel: 'expanded',
          rowType: 'header',
          onCellClick: isInteractive ? handleCellClick : undefined,
          getCellClasses: isInteractive ? getCellClasses : undefined,
          cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
          cellStates: isInteractive ? cellStates : undefined,
          revealedSet: hasActiveScript ? revealedSet : undefined,
          interactiveType: type,
          fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
        })
      );

      const showExpandedPlaceRow =
        !hasActiveScript || variant !== 'both' || bothExpandedPlaceRowRevealed;

      // Expanded carry row (right block): same vertical band as simple carry when the
      // script reveals `expanded:carry:*` (e.g. guided_flow_short split-carry). Only
      // row 1 while the expanded place row is hidden — if place is shown, carries use
      // the simple panel in other flows.
      if (expandedCarryRowVisible && !showExpandedPlaceRow) {
        const expCarryRowIdx = 1;
        const expCarryVisible = resolveVisible('expanded', 'carry', null, false);
        const expCarryCardH = Math.max(
          Math.floor(expandedCardH * 0.6),
          Math.min(expandedCardH, 18)
        );
        const expCarryFontSize = Math.max(
          Math.floor(digitFontSize * 0.65),
          10
        );
        const expCarryTopOffset = rowTop(expCarryRowIdx)
          + Math.floor((rowH - expCarryCardH) / 2);
        const expCarryCells = [];
        for (let c = 0; c < totalCols; c++) {
          const placeKey = placeKeyForColumn(c, totalCols);
          const cellId = createCellId('expanded', 'carry', placeKey);
          const userVal = scriptCellValues.get(cellId);
          expCarryCells.push(userVal != null && userVal !== '' ? String(userVal) : '');
        }
        expandedChildren.push(
          ...renderStackedRow({
            cells: expCarryCells,
            totalCols,
            kind: 'digits',
            visible: expCarryVisible,
            geom: {
              startX: expandedStartX,
              top: expCarryTopOffset,
              colW: expandedColW,
              rowH: expCarryCardH,
              gap: expandedSepWidth,
              cardRadius: Math.max(2, Math.floor(cardRadius * 0.7)),
              textWidthBufferPx,
              headerFontSize: expCarryFontSize,
              digitFontSize: expCarryFontSize,
              headerCardFontStyle,
              digitCardFontStyle,
              placeCardFontStyle,
            },
            colors,
            operatorLeft: null,
            operatorRight: null,
            keyPrefix: 'exp-carry',
            panel: 'expanded',
            rowType: 'carry',
            onCellClick: isInteractive ? handleCellClick : undefined,
            getCellClasses: isInteractive ? getCellClasses : undefined,
            cellValueOverrides: hasActiveScript ? cellValueOverrides : undefined,
            cellStates: isInteractive ? cellStates : undefined,
            revealedSet: hasActiveScript ? revealedSet : undefined,
            // In the expanded (right) block we want carry values to read like place-value labels:
            // no background, and text color matches the column place color.
            extraCellClass: 'la-cell--carry-place',
            interactiveType: type,
            fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
          })
        );
      }

      // Row 1: place values (omit entirely while scripted `both` hides this row so it
      // does not reserve a blank band between header and operands).
      if (showExpandedPlaceRow) {
        const placeVisible = resolveVisible('expanded', 'place', null, effectiveStep >= planRef.placeStep);
        const placeTokens = [];
        for (let c = 0; c < totalCols; c++) {
          const pv = placeValueForColumn(c, totalCols);
          if (placeValueRow === 'skip-ones' && pv === 1) {
            placeTokens.push('');
          } else {
            placeTokens.push(String(pv));
          }
        }
        expandedChildren.push(
          ...renderExpandedRow({
            tokens: placeTokens,
            totalCols,
            kind: 'place',
            equalsLeading: false,
            trailingPlus: false,
            visible: placeVisible,
            geom: {
              startX: expandedStartX,
              top: expandedInsetTop(1),
              colW: expandedColW,
              rowH: expandedCardH,
              gap: expandedSepWidth,
              sepWidth: expandedSepWidth,
              plusSepWidth: expandedSepWidth,
              equalsSepWidth: expandedEqualsSepWidth,
              cardRadius,
              textWidthBufferPx,
              headerFontSize,
              digitFontSize: placeFontSize,
              headerCardFontStyle,
              digitCardFontStyle,
              placeCardFontStyle,
            },
            colors,
            keyPrefix: 'exp-place',
            panel: 'expanded',
            rowType: 'place',
            onCellClick: isInteractive ? handleCellClick : undefined,
            getCellClasses: isInteractive ? getCellClasses : undefined,
            cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
            cellStates: isInteractive ? cellStates : undefined,
            revealedSet: hasActiveScript ? revealedSet : undefined,
            interactiveType: type,
            fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
          })
        );
      }

      // Operand rows: each digit*place value as a card
      for (let i = 0; i < numbers.length; i++) {
        const visible = resolveVisible(
          'expanded',
          `operand-${i}`,
          null,
          effectiveStep >= planRef.operandSteps[i]
        );
        const digits = digitsOf(numbers[i], totalCols);
        const tokens = digits.map((d, c) => {
          if (d === ' ' || d === '') return '';
          const dn = parseInt(d, 10);
          if (!Number.isFinite(dn)) return '';
          const pv = placeValueForColumn(c, totalCols);
          // For pv = 1, value = digit itself
          return String(dn * pv);
        });
        const isBottom = i === numbers.length - 1;
        const trailingPlus =
          isBottom && operatorPosition === 'right' && visible;
        // For English (operator left), the simple side already shows '+' on the
        // bottom operand. Expanded side mirrors by leading '+' before each non-first
        // operand line; we keep it consistent by placing equals leading on each
        // operand row.
        if (equalsInMiddleStrip) {
          expandedChildren.push(
            ...renderMiddleStripEquals({
              middleLeftPx: simpleRegionWidth,
              middleWidthPx: bothPanelGapPx,
              top: expandedInsetTop(expandedOperandRowBase + i),
              rowH: expandedCardH,
              visible,
              digitFontSizePx: digitFontSize,
              digitCardFontStyle: digitCardFontStyle,
              keyPrefix: `exp-op-${i}`,
            })
          );
        }
        expandedChildren.push(
          ...renderExpandedRow({
            tokens,
            totalCols,
            kind: 'digits',
            equalsLeading: !equalsInMiddleStrip,
            trailingPlus,
            visible,
            geom: {
              startX: expandedStartX,
              top: expandedInsetTop(expandedOperandRowBase + i),
              colW: expandedColW,
              rowH: expandedCardH,
              gap: expandedSepWidth,
              sepWidth: expandedSepWidth,
              plusSepWidth: expandedSepWidth,
              equalsSepWidth: expandedEqualsSepWidth,
              cardRadius,
              textWidthBufferPx,
              headerFontSize,
              digitFontSize,
              headerCardFontStyle,
              digitCardFontStyle,
              placeCardFontStyle,
            },
            colors,
            keyPrefix: `exp-op-${i}`,
            panel: 'expanded',
            rowType: `operand-${i}`,
            onCellClick: isInteractive ? handleCellClick : undefined,
            getCellClasses: isInteractive ? getCellClasses : undefined,
            cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
            cellStates: isInteractive ? cellStates : undefined,
            revealedSet: hasActiveScript ? revealedSet : undefined,
            interactiveType: type,
            fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
          })
        );
      }

      // Divider line in the gap between last operand row and sum row (same as simple).
      const dividerVisible = resolveVisible('expanded', 'divider', null, effectiveStep >= planRef.dividerStep);
      const lastExpOpRowIdx = expandedOperandRowBase + numbers.length - 1;
      const gapAfterExpOperandsY = rowTop(lastExpOpRowIdx) + rowH;
      const dividerTop =
        gapAfterExpOperandsY +
        Math.max(0, Math.floor((verticalGap - lineThickness) / 2));
      // Width spans the operand region (= sign + cards + separators)
      const dividerWidth =
        expandedSlotCount * expandedColW +
        (expandedSlotCount - 1) * expandedSepWidth;
      expandedChildren.push(
        React.createElement('div', {
          key: 'exp-line',
          className: 'la-numpad-dimmable-chrome',
          style: {
            position: 'absolute',
            left: `${expandedStartX}px`,
            top: `${dividerTop}px`,
            width: `${dividerWidth}px`,
            height: `${lineThickness}px`,
            backgroundColor: lineColor,
            borderRadius: `${Math.max(1, Math.floor(lineThickness / 2))}px`,
            opacity: dividerVisible ? 1 : 0,
            transition: 'opacity 220ms ease',
          },
        })
      );

      // Sum row (expanded)
      const sumVisible = resolveVisible('expanded', 'sum', null, effectiveStep >= planRef.sumStep);
      const sumDigits = digitsOf(sum, totalCols);
      const sumTokens = sumDigits.map((d, c) => {
        if (d === ' ' || d === '') return '';
        const dn = parseInt(d, 10);
        if (!Number.isFinite(dn)) return '';
        const pv = placeValueForColumn(c, totalCols);
        return String(dn * pv);
      });
      if (equalsInMiddleStrip) {
        expandedChildren.push(
          ...renderMiddleStripEquals({
            middleLeftPx: simpleRegionWidth,
            middleWidthPx: bothPanelGapPx,
            top: expandedInsetTop(expandedOperandRowBase + numbers.length),
            rowH: expandedCardH,
            visible: sumVisible,
            digitFontSizePx: digitFontSize,
            digitCardFontStyle: digitCardFontStyle,
            keyPrefix: 'exp-sum',
          })
        );
      }
      expandedChildren.push(
        ...renderExpandedRow({
          tokens: sumTokens,
          totalCols,
          kind: 'digits',
          equalsLeading: !equalsInMiddleStrip,
          trailingPlus: false,
          visible: sumVisible,
          geom: {
            startX: expandedStartX,
            top: expandedInsetTop(expandedOperandRowBase + numbers.length),
            colW: expandedColW,
            rowH: expandedCardH,
            gap: expandedSepWidth,
            sepWidth: expandedSepWidth,
            plusSepWidth: expandedSepWidth,
            equalsSepWidth: expandedEqualsSepWidth,
            cardRadius,
            textWidthBufferPx,
            headerFontSize,
            digitFontSize,
            headerCardFontStyle,
            digitCardFontStyle,
            placeCardFontStyle,
          },
          colors,
          keyPrefix: 'exp-sum',
          panel: 'expanded',
          rowType: 'sum',
          onCellClick: isInteractive ? handleCellClick : undefined,
          getCellClasses: isInteractive ? getCellClasses : undefined,
          cellValueOverrides: (type === 'incorrect' || hasActiveScript || type === 'fill-missing') ? cellValueOverrides : undefined,
          cellStates: isInteractive ? cellStates : undefined,
          revealedSet: hasActiveScript ? revealedSet : undefined,
          interactiveType: type,
          fillMissingFocusedCellId: fillMissingFocusedCellIdForRows,
        })
      );
    }

    React.useLayoutEffect(() => {
      if (!debugPanelLayout || typeof console === 'undefined') return;
      const tag = LONG_ADDITION_PANEL_LAYOUT_LOG;
      const id = props.elementName || componentId;
      const leftReq = Number.isFinite(leftColumnWidthPx) ? Math.floor(leftColumnWidthPx) : null;
      const rightReq = Number.isFinite(rightColumnWidthPx) ? Math.floor(rightColumnWidthPx) : null;
      const middleReq = Number.isFinite(middleGapPx) ? Math.floor(middleGapPx) : null;

      console.groupCollapsed(`${tag} ${id}`);
      console.log(
        `${tag} — type this in the console filter bar to find these logs`
      );
      console.log('container', {
        widthPx: Math.round(widthPx),
        heightPx: Math.round(heightPx),
        variant,
      });

      if (variant === 'both' && showSimple && showExpanded) {
        console.log('leftBlock (simple panel region)', {
          propRaw: leftColumnWidthRaw ?? null,
          propResolvedPx: leftReq,
          actualPanel: { widthPx: Math.round(simpleRegionWidth), heightPx: Math.round(heightPx) },
          simpleColumnSlotPx: simpleColW,
          slotVsProp:
            leftReq != null
              ? { propPx: leftReq, usedSlotPx: simpleColW, delta: simpleColW - leftReq }
              : null,
        });
        console.log('middleBlock (strip: leading "=" + space between panels)', {
          propRaw: middleGapRaw ?? null,
          propResolvedPx: middleReq,
          actualStripPx: bothPanelGapPx,
          equalsDrawnInMiddle: true,
          usesDefault24px:
            (middleGapRaw == null || middleGapRaw === '') && !Number.isFinite(middleGapPx),
          stripVsProp:
            middleReq != null
              ? { propPx: middleReq, usedStripPx: bothPanelGapPx, delta: bothPanelGapPx - middleReq }
              : null,
        });
        console.log('rightBlock (expanded panel region)', {
          propRaw: rightColumnWidthRaw ?? null,
          propResolvedPx: rightReq,
          actualPanel: {
            widthPx: Math.round(expandedRegionWidth),
            heightPx: Math.round(heightPx),
          },
          expandedColumnSlotPx: expandedColW,
          slotVsProp:
            rightReq != null
              ? { propPx: rightReq, usedSlotPx: expandedColW, delta: expandedColW - rightReq }
              : null,
        });
      } else {
        console.log('single-region layout', {
          variant,
          panel: { widthPx: Math.round(widthPx), heightPx: Math.round(heightPx) },
        });
      }
      console.groupEnd();
    }, [
      componentId,
      props.elementName,
      variant,
      widthPx,
      heightPx,
      showSimple,
      showExpanded,
      simpleRegionWidth,
      expandedRegionWidth,
      bothPanelGapPx,
      simpleColW,
      expandedColW,
      leftColumnWidthRaw,
      leftColumnWidthPx,
      middleGapRaw,
      middleGapPx,
      rightColumnWidthRaw,
      rightColumnWidthPx,
      debugPanelLayout,
      equalsInMiddleStrip,
    ]);

    const PANEL_OUTLINE_ORANGE = '#ea580c';
    const PANEL_GRID_ORANGE = '#fb923c';

    const panelOutlineBase = {
      position: 'absolute',
      top: 0,
      boxSizing: 'border-box',
      border: `2px solid ${PANEL_OUTLINE_ORANGE}`,
      pointerEvents: 'none',
      zIndex: 0,
    };

    const panelGridChildren = [];
    const pushGridLine = (key, left, top, width, height) => {
      if (width <= 0 || height <= 0) return;
      panelGridChildren.push(
        React.createElement('div', {
          key,
          className: 'long-addition-panel-grid-line',
          style: {
            position: 'absolute',
            left: `${Math.round(left)}px`,
            top: `${Math.round(top)}px`,
            width: `${Math.round(width)}px`,
            height: `${Math.round(height)}px`,
            backgroundColor: PANEL_GRID_ORANGE,
            pointerEvents: 'none',
            zIndex: 0,
            boxSizing: 'border-box',
          },
        })
      );
    };

    if (showPanelBorders && showPanelGridLines && heightPx > 0) {
      const drawRowBands = (keyPrefix, leftBase, panelWidth) => {
        if (panelWidth <= 0) return;
        for (let r = 0; r < numRows; r++) {
          const yTop = rowTop(r);
          const yBot = yTop + rowH;
          if (yTop >= 0 && yTop < heightPx) {
            pushGridLine(`${keyPrefix}-rt-${r}`, leftBase, yTop, panelWidth, 1);
          }
          if (yBot >= 0 && yBot <= heightPx + 1) {
            pushGridLine(`${keyPrefix}-rb-${r}`, leftBase, yBot, panelWidth, 1);
          }
        }
      };

      if (equalsInMiddleStrip) {
        const simpleInnerW =
          simpleCols * simpleColW + (simpleCols - 1) * colGap;
        const simpleX0 = Math.max(
          0,
          Math.floor((simpleRegionWidth - simpleInnerW) / 2)
        );

        drawRowBands('la-grid-L', 0, simpleRegionWidth);
        for (let k = 0; k <= simpleCols; k++) {
          const vx =
            k < simpleCols
              ? simpleX0 + k * (simpleColW + colGap)
              : simpleX0 + simpleInnerW;
          if (vx >= 0 && vx <= simpleRegionWidth + 1) {
            pushGridLine(`la-grid-L-v-${k}`, vx, 0, 1, heightPx);
          }
        }
        if (simpleX0 + simpleInnerW < simpleRegionWidth - 1) {
          pushGridLine('la-grid-L-v-panelR', simpleRegionWidth - 1, 0, 1, heightPx);
        }

        drawRowBands('la-grid-M', simpleRegionWidth, bothPanelGapPx);
        pushGridLine('la-grid-M-v0', simpleRegionWidth, 0, 1, heightPx);
        if (bothPanelGapPx > 1) {
          pushGridLine(
            'la-grid-M-v1',
            simpleRegionWidth + bothPanelGapPx - 1,
            0,
            1,
            heightPx
          );
        }

        const rightLeft = simpleRegionWidth + bothPanelGapPx;
        const rightInnerW =
          expandedSlotCount * expandedColW +
          expandedSlotCount * expandedSepWidth;
        drawRowBands('la-grid-R', rightLeft, expandedRegionWidth);
        const rBounds = expandedRowColumnBounds(
          expandedStartX,
          expandedSlotCount,
          expandedColW,
          expandedSepWidth
        );
        for (let idx = 0; idx < rBounds.length; idx++) {
          const vx = rBounds[idx];
          if (vx >= rightLeft - 1 && vx <= rightLeft + expandedRegionWidth + 2) {
            pushGridLine(`la-grid-R-v-${idx}`, vx, 0, 1, heightPx);
          }
        }
        if (expandedStartX + rightInnerW < rightLeft + expandedRegionWidth - 1) {
          pushGridLine(
            'la-grid-R-v-panelR',
            rightLeft + expandedRegionWidth - 1,
            0,
            1,
            heightPx
          );
        }
      } else if (variant === 'simple' && showSimple) {
        const sw = widthPx;
        const simpleInnerW =
          simpleCols * simpleColW + (simpleCols - 1) * colGap;
        const simpleX0 = Math.max(0, Math.floor((sw - simpleInnerW) / 2));
        drawRowBands('la-grid-S', 0, sw);
        for (let k = 0; k <= simpleCols; k++) {
          const vx =
            k < simpleCols
              ? simpleX0 + k * (simpleColW + colGap)
              : simpleX0 + simpleInnerW;
          if (vx >= 0 && vx <= sw + 1) {
            pushGridLine(`la-grid-S-v-${k}`, vx, 0, 1, heightPx);
          }
        }
        if (simpleX0 + simpleInnerW < sw - 1) {
          pushGridLine('la-grid-S-vR', sw - 1, 0, 1, heightPx);
        }
      } else if (variant === 'expanded' && showExpanded) {
        const sw = widthPx;
        drawRowBands('la-grid-E', 0, sw);
        const eq = expandedEqualsSepWidth;
        pushGridLine('la-grid-E-v-eqL', expandedStartX - eq, 0, 1, heightPx);
        const eBounds = expandedRowColumnBounds(
          expandedStartX,
          expandedSlotCount,
          expandedColW,
          expandedSepWidth
        );
        for (let idx = 0; idx < eBounds.length; idx++) {
          const vx = eBounds[idx];
          if (vx >= 0 && vx <= sw + 1) {
            pushGridLine(`la-grid-E-v-${idx}`, vx, 0, 1, heightPx);
          }
        }
        const innerR =
          expandedEqualsSepWidth +
          expandedSlotCount * expandedColW +
          expandedSlotCount * expandedSepWidth;
        const rightX = expandedStartX - eq + innerR;
        if (rightX <= sw + 1) {
          pushGridLine('la-grid-E-vR', Math.min(rightX, sw) - 1, 0, 1, heightPx);
        }
        if (rightX < sw - 1) {
          pushGridLine('la-grid-E-v-panelR', sw - 1, 0, 1, heightPx);
        }
      }
    }

    const panelOutlines = [];
    if (showPanelBorders && equalsInMiddleStrip) {
      panelOutlines.push(
        React.createElement('div', {
          key: 'la-panel-outline-left',
          className: 'long-addition-panel-outline long-addition-panel-outline--left',
          'data-panel': 'left',
          style: {
            ...panelOutlineBase,
            left: 0,
            width: `${simpleRegionWidth}px`,
            height: `${heightPx}px`,
          },
        }),
        React.createElement('div', {
          key: 'la-panel-outline-middle',
          className: 'long-addition-panel-outline long-addition-panel-outline--middle',
          'data-panel': 'middle',
          style: {
            ...panelOutlineBase,
            left: `${simpleRegionWidth}px`,
            width: `${bothPanelGapPx}px`,
            height: `${heightPx}px`,
          },
        }),
        React.createElement('div', {
          key: 'la-panel-outline-right',
          className: 'long-addition-panel-outline long-addition-panel-outline--right',
          'data-panel': 'right',
          style: {
            ...panelOutlineBase,
            left: `${simpleRegionWidth + bothPanelGapPx}px`,
            width: `${expandedRegionWidth}px`,
            height: `${heightPx}px`,
          },
        })
      );
    } else if (showPanelBorders && variant === 'simple' && showSimple) {
      panelOutlines.push(
        React.createElement('div', {
          key: 'la-panel-outline-simple',
          className: 'long-addition-panel-outline long-addition-panel-outline--simple',
          'data-panel': 'simple',
          style: {
            ...panelOutlineBase,
            left: 0,
            width: `${widthPx}px`,
            height: `${heightPx}px`,
          },
        })
      );
    } else if (showPanelBorders && variant === 'expanded' && showExpanded) {
      panelOutlines.push(
        React.createElement('div', {
          key: 'la-panel-outline-expanded',
          className: 'long-addition-panel-outline long-addition-panel-outline--expanded',
          'data-panel': 'expanded',
          style: {
            ...panelOutlineBase,
            left: 0,
            width: `${widthPx}px`,
            height: `${heightPx}px`,
          },
        })
      );
    }

    // Outer container
    const columnSumBorderPx = (() => {
      const px = parseFloat(toPx('3gc', 'borderWidth'));
      return Number.isFinite(px) && px > 0 ? px : 3;
    })();
    const containerStyle = {
      ...(position?.css || {}),
      zIndex: elementZIndex || 402,
      position: 'absolute',
      overflow: 'visible',
      boxSizing: 'border-box',
      '--la-column-sum-border': `${columnSumBorderPx}px`,
    };

    // ===== SCRIPTED ENGINE OVERLAYS (Phase C) =====

    /**
     * Script-driven instruction panel. Replaces the legacy guidedInstructionPanel
     * when a script is active. Supports advance.types: next, tap-revealed, auto.
     */
    const scriptInstructionPanel = React.useMemo(() => {
      if (!hasActiveScript || scriptStepIndex >= script.length) return null;
      if (useExternalInstructionTarget) return null;
      const step = script[scriptStepIndex];
      if (!step) return null;
      const advance = step.advance || (step.action ? null : { type: 'next' });
      const showNext = advance && advance.type === 'next';
      const showAuto = advance && advance.type === 'auto';

      const instructionText =
        scriptInstructionOverride != null
          ? String(scriptInstructionOverride)
          : (step.instruction || '');

      const children = [
        React.createElement('span', {
          key: 'instruction-text',
          style: { flex: 1, textAlign: 'center', padding: '0 8px' },
        }, instructionText),
      ];

      if (showNext) {
        children.push(
          React.createElement('button', {
            key: 'next-btn',
            className: 'la-next-btn',
            onClick: () => advanceScript(),
          }, scriptStepIndex >= script.length - 1 ? 'Done' : 'Next ›')
        );
      } else if (showAuto) {
        children.push(
          React.createElement('span', {
            key: 'auto-indicator',
            style: { fontSize: '12px', color: '#93C5FD', marginLeft: '12px' },
          }, '⏵ auto')
        );
      }

      // Row-check button: when validation === 'row-check' or 'both' and the
      // step's row is partially filled. Simple heuristic: show after at least
      // one cell value committed for this row.
      const validation = resolveStepValidation(step);
      const wantsRowCheck = (validation === 'row-check' || validation === 'both')
        && step.action && step.action.type === 'enter-value';
      if (wantsRowCheck) {
        children.push(
          React.createElement('button', {
            key: 'check-btn',
            className: 'la-check-btn',
            onClick: () => advanceScript(),
            style: { marginLeft: '8px' },
          }, 'Check')
        );
      }

      return React.createElement('div', {
        key: 'script-instruction-panel',
        className: 'la-instruction-panel',
        style: {
          position: 'absolute',
          bottom: '-50px',
          left: 0,
          right: 0,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(30, 58, 138, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        },
      }, children);
    }, [hasActiveScript, scriptStepIndex, script, advanceScript, resolveStepValidation, useExternalInstructionTarget, scriptInstructionOverride]);

    /**
     * Script completion panel — shown after the last step completes.
     */
    const scriptCompletionPanel = React.useMemo(() => {
      if (!hasActiveScript) return null;
      if (scriptStepIndex < script.length) return null;
      return React.createElement('div', {
        key: 'script-completion-panel',
        className: 'la-guided-completion',
        style: {
          position: 'absolute',
          bottom: '-50px',
          left: 0,
          right: 0,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(16, 185, 129, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        },
      }, `✓ Complete! ${script.length} steps finished.`);
    }, [hasActiveScript, scriptStepIndex, script.length]);

    /**
     * Converge ghosts: two chips fly from their respective origins toward the
     * target `?` tile when animation === 'converge-to-target' is active.
     */
    const convergeGhosts = React.useMemo(() => {
      if (!pendingConverge) return null;
      const { sources, target, key } = pendingConverge;
      return sources.map((src, i) =>
        React.createElement('div', {
          key: `converge-ghost-${key}-${i}`,
          className: 'la-converge-ghost',
          'data-converge-target': target,
          'data-converge-source': src.id,
          'data-converge-idx': String(i),
          style: {
            fontSize: `${Math.max(14, Math.floor(digitFontSize * 0.9))}px`,
            minWidth: `${Math.max(20, Math.floor(simpleColW * 0.7))}px`,
            height: `${Math.max(20, Math.floor(simpleCardH * 0.7))}px`,
            padding: '0 6px',
          },
        }, src.label)
      );
    }, [pendingConverge, digitFontSize, simpleColW, simpleCardH]);

    /**
     * Position each converge ghost from its source cell toward the target cell.
     */
    React.useLayoutEffect(() => {
      if (!pendingConverge || typeof document === 'undefined') return undefined;
      const root = document.querySelector(`[data-element-name="${props.elementName || componentId}"]`);
      if (!root) return undefined;
      const rootRect = root.getBoundingClientRect();
      const tgt = root.querySelector(`[data-cell-id="${pendingConverge.target}"]`);
      if (!tgt) return undefined;
      const tRect = tgt.getBoundingClientRect();
      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animations = [];

      pendingConverge.sources.forEach((src, i) => {
        const ghost = root.querySelector(`.la-converge-ghost[data-converge-idx="${i}"]`);
        const srcEl = root.querySelector(`[data-cell-id="${src.id}"]`);
        if (!ghost || !srcEl) return;
        const sRect = srcEl.getBoundingClientRect();
        const sLeft = sRect.left - rootRect.left;
        const sTop = sRect.top - rootRect.top;
        const dx = tRect.left - sRect.left;
        const dy = tRect.top - sRect.top;
        ghost.style.left = `${sLeft}px`;
        ghost.style.top = `${sTop}px`;
        ghost.style.animation = 'none';

        const easing = 'cubic-bezier(0.42, 0, 0.38, 1)';
        const rawMs = pendingConverge.durationMs;
        const flightMs = Number.isFinite(Number(rawMs)) ? Math.round(Number(rawMs)) : 4000;
        const duration = reduceMotion ? 1 : flightMs;

        if (typeof ghost.animate === 'function') {
          const anim = ghost.animate(
            [
              { offset: 0, transform: 'translate(0, 0) scale(0.85)', opacity: 0 },
              { offset: 0.06, transform: 'translate(0, 0) scale(1.05)', opacity: 1 },
              { offset: 0.1, transform: 'translate(0, 0) scale(1)', opacity: 1 },
              { offset: 0.8, transform: `translate(${dx}px, ${dy}px) scale(1.12)`, opacity: 1 },
              { offset: 0.92, transform: `translate(${dx}px, ${dy}px) scale(0.85)`, opacity: 0.6 },
              { offset: 1, transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 },
            ],
            { duration, easing, fill: 'forwards' }
          );
          animations.push(anim);
        } else {
          ghost.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ease-out`;
          ghost.style.transform = 'translate(0, 0) scale(1)';
          ghost.style.opacity = '1';
          requestAnimationFrame(() => {
            ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
            ghost.style.opacity = '0';
          });
        }
      });

      return () => {
        animations.forEach((a) => {
          try {
            a.cancel();
          } catch (_e) {
            /* ignore */
          }
        });
      };
    }, [pendingConverge, props.elementName, componentId]);

    /**
     * Transfer-fly ghost: renders a flying value from source to target during
     * a 'reveal' input or animation: 'transfer-source-to-target' step.
     */
    const transferGhost = React.useMemo(() => {
      if (!pendingTransfer) return null;
      const { source, target, value, key } = pendingTransfer;
      // Read the DOM positions of source/target on render via a measurement effect.
      // To keep this simple we provide a placeholder div that the layout effect repositions.
      return React.createElement('div', {
        key: `transfer-ghost-${key}`,
        className: 'la-transfer-ghost',
        'data-transfer-source': source,
        'data-transfer-target': target,
        style: {
          fontSize: `${Math.max(14, Math.floor(digitFontSize * 0.9))}px`,
          minWidth: `${Math.max(20, Math.floor(simpleColW * 0.7))}px`,
          height: `${Math.max(20, Math.floor(simpleCardH * 0.7))}px`,
          padding: '0 6px',
        },
      }, value);
    }, [pendingTransfer, digitFontSize, simpleColW, simpleCardH]);

    /**
     * Position the transfer ghost based on source/target cell DOM.
     */
    React.useLayoutEffect(() => {
      if (!pendingTransfer || typeof document === 'undefined') return undefined;
      const root = document.querySelector(`[data-element-name="${props.elementName || componentId}"]`);
      if (!root) return undefined;
      const ghost = root.querySelector(`.la-transfer-ghost[data-transfer-source="${pendingTransfer.source}"]`);
      const src = root.querySelector(`[data-cell-id="${pendingTransfer.source}"]`);
      const tgt = root.querySelector(`[data-cell-id="${pendingTransfer.target}"]`);
      if (!ghost || !src || !tgt) return undefined;
      const rootRect = root.getBoundingClientRect();
      const sRect = src.getBoundingClientRect();
      const tRect = tgt.getBoundingClientRect();
      const sLeft = sRect.left - rootRect.left;
      const sTop = sRect.top - rootRect.top;
      const dx = tRect.left - sRect.left;
      const dy = tRect.top - sRect.top;
      ghost.style.left = `${sLeft}px`;
      ghost.style.top = `${sTop}px`;
      ghost.style.animation = 'none';

      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = reduceMotion ? 1 : 600;
      const easing = 'cubic-bezier(0.5, 0, 0.5, 1)';

      if (typeof ghost.animate === 'function') {
        const anim = ghost.animate(
          [
            { offset: 0, transform: 'translate(0, 0) scale(0.9)', opacity: 0 },
            { offset: 0.18, transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { offset: 0.85, transform: `translate(${dx}px, ${dy}px) scale(1.05)`, opacity: 1 },
            { offset: 1, transform: `translate(${dx}px, ${dy}px) scale(0.9)`, opacity: 0 },
          ],
          { duration, easing, fill: 'forwards' }
        );
        return () => {
          try {
            anim.cancel();
          } catch (_e) {
            /* ignore */
          }
        };
      }

      ghost.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ease-out`;
      ghost.style.transform = 'translate(0, 0) scale(1)';
      ghost.style.opacity = '1';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0.9)`;
          ghost.style.opacity = '0';
        });
      });
      return undefined;
    }, [pendingTransfer, props.elementName, componentId]);

    /**
     * Multi-phase split animation overlay.
     * Phases: rise → morph (shows "total = carry + remainder") → split (fly apart)
     */
    const splitAnimOverlay = React.useMemo(() => {
      if (!pendingSplitAnim) return null;
      const { sourceId, total, remainder, carryAmount, phase, key } = pendingSplitAnim;
      const fontSize = Math.max(16, Math.floor(digitFontSize * 0.85));
      const chipH = Math.max(24, Math.floor(simpleCardH * 0.75));
      const chipPad = '4px 10px';

      if (phase === 'rise' || phase === 'morph') {
        // Single overlay showing total, then equation
        const content = phase === 'rise'
          ? total
          : `${total} = ${carryAmount} + ${remainder}`;
        return React.createElement('div', {
          key: `split-anim-${key}`,
          className: `la-split-overlay la-split-overlay--${phase}`,
          'data-split-source': sourceId,
          style: {
            fontSize: `${fontSize}px`,
            minHeight: `${chipH}px`,
            padding: chipPad,
          },
        }, content);
      }

      if (phase === 'split') {
        // Two chips flying apart: carryAmount → carry cell, remainder → sum cell
        return [
          React.createElement('div', {
            key: `split-carry-${key}`,
            className: 'la-split-chip la-split-chip--carry',
            'data-split-role': 'carry',
            style: {
              fontSize: `${fontSize}px`,
              minHeight: `${chipH}px`,
              padding: chipPad,
            },
          }, carryAmount),
          React.createElement('div', {
            key: `split-remainder-${key}`,
            className: 'la-split-chip la-split-chip--remainder',
            'data-split-role': 'remainder',
            style: {
              fontSize: `${fontSize}px`,
              minHeight: `${chipH}px`,
              padding: chipPad,
            },
          }, remainder),
        ];
      }
      return null;
    }, [pendingSplitAnim, digitFontSize, simpleCardH]);

    /**
     * Position the split animation overlay and run phase animations.
     */
    React.useLayoutEffect(() => {
      if (!pendingSplitAnim || typeof document === 'undefined') return undefined;
      const root = document.querySelector(`[data-element-name="${props.elementName || componentId}"]`);
      if (!root) return undefined;
      const rootRect = root.getBoundingClientRect();
      const srcEl = root.querySelector(`[data-cell-id="${pendingSplitAnim.sourceId}"]`);
      if (!srcEl) return undefined;
      const sRect = srcEl.getBoundingClientRect();
      const sLeft = sRect.left - rootRect.left;
      const sTop = sRect.top - rootRect.top;
      const sCenterX = sLeft + sRect.width / 2;

      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const { phase, targetId } = pendingSplitAnim;

      if (phase === 'rise' || phase === 'morph') {
        const overlay = root.querySelector('.la-split-overlay');
        if (!overlay) return undefined;
        const overlayW = overlay.offsetWidth;
        overlay.style.left = `${sCenterX - overlayW / 2}px`;
        overlay.style.top = `${sTop}px`;

        if (phase === 'rise') {
          const riseDuration = reduceMotion ? 1 : 500;
          if (typeof overlay.animate === 'function') {
            overlay.animate(
              [
                { offset: 0, transform: 'translateY(0) scale(0.8)', opacity: 0 },
                { offset: 0.3, transform: 'translateY(-20px) scale(1.1)', opacity: 1 },
                { offset: 1, transform: 'translateY(-40px) scale(1)', opacity: 1 },
              ],
              { duration: riseDuration, easing: 'ease-out', fill: 'forwards' }
            );
          } else {
            overlay.style.transform = 'translateY(-40px) scale(1)';
            overlay.style.opacity = '1';
          }
        } else if (phase === 'morph') {
          overlay.style.transform = 'translateY(-40px) scale(1)';
          overlay.style.opacity = '1';
        }
        return undefined;
      }

      if (phase === 'split') {
        const carryChip = root.querySelector('.la-split-chip--carry');
        const remChip = root.querySelector('.la-split-chip--remainder');
        const tgtEl = root.querySelector(`[data-cell-id="${targetId}"]`);
        if (!carryChip || !remChip || !tgtEl) return undefined;

        const tRect = tgtEl.getBoundingClientRect();
        const carryW = carryChip.offsetWidth;
        const remW = remChip.offsetWidth;

        // Start both chips near the equation position (above source)
        const startTop = sTop - 40;
        const startCarryLeft = sCenterX - carryW - 10;
        const startRemLeft = sCenterX + 10;

        // Carry flies to target (carry row)
        const carryDx = (tRect.left - rootRect.left + tRect.width / 2 - carryW / 2) - startCarryLeft;
        const carryDy = (tRect.top - rootRect.top) - startTop;

        // Remainder returns to source (sum tile)
        const remDx = (sLeft + sRect.width / 2 - remW / 2) - startRemLeft;
        const remDy = sTop - startTop;

        carryChip.style.left = `${startCarryLeft}px`;
        carryChip.style.top = `${startTop}px`;
        remChip.style.left = `${startRemLeft}px`;
        remChip.style.top = `${startTop}px`;

        const splitDuration = reduceMotion ? 1 : 700;

        if (typeof carryChip.animate === 'function') {
          carryChip.animate(
            [
              { offset: 0, transform: 'translate(0, 0) scale(1)', opacity: 1 },
              { offset: 0.7, transform: `translate(${carryDx}px, ${carryDy}px) scale(1.1)`, opacity: 1 },
              { offset: 1, transform: `translate(${carryDx}px, ${carryDy}px) scale(0.9)`, opacity: 0 },
            ],
            { duration: splitDuration, easing: 'ease-in-out', fill: 'forwards' }
          );
          remChip.animate(
            [
              { offset: 0, transform: 'translate(0, 0) scale(1)', opacity: 1 },
              { offset: 0.7, transform: `translate(${remDx}px, ${remDy}px) scale(1.1)`, opacity: 1 },
              { offset: 1, transform: `translate(${remDx}px, ${remDy}px) scale(0.9)`, opacity: 0 },
            ],
            { duration: splitDuration, easing: 'ease-in-out', fill: 'forwards' }
          );
        } else {
          carryChip.style.transition = `transform ${splitDuration}ms ease-in-out, opacity ${splitDuration}ms`;
          remChip.style.transition = `transform ${splitDuration}ms ease-in-out, opacity ${splitDuration}ms`;
          requestAnimationFrame(() => {
            carryChip.style.transform = `translate(${carryDx}px, ${carryDy}px)`;
            carryChip.style.opacity = '0';
            remChip.style.transform = `translate(${remDx}px, ${remDy}px)`;
            remChip.style.opacity = '0';
          });
        }
        return undefined;
      }
      return undefined;
    }, [pendingSplitAnim, props.elementName, componentId]);

    /**
     * Handle split animation phase transitions with timers.
     */
    React.useEffect(() => {
      if (!pendingSplitAnim) return undefined;
      const { phase, sourceId, targetId, remainder, carryAmount } = pendingSplitAnim;

      if (phase === 'rise') {
        // After rise completes (500ms), transition to morph
        const timer = setTimeout(() => {
          setPendingSplitAnim((prev) => prev ? { ...prev, phase: 'morph' } : null);
        }, 500);
        return () => clearTimeout(timer);
      }

      if (phase === 'morph') {
        // After 2000ms showing the equation, transition to split
        const timer = setTimeout(() => {
          setPendingSplitAnim((prev) => prev ? { ...prev, phase: 'split' } : null);
        }, 2000);
        return () => clearTimeout(timer);
      }

      if (phase === 'split') {
        // After split animation (700ms), commit values and advance
        const timer = setTimeout(() => {
          setScriptCellValues((prev) => {
            const next = new Map(prev);
            next.set(sourceId, remainder);
            next.set(targetId, carryAmount);
            return next;
          });
          setPendingSplitAnim(null);
          setTimeout(() => {
            advanceScript();
            convergeRunLockRef.current = false;
          }, 200);
        }, 700);
        return () => clearTimeout(timer);
      }

      return undefined;
    }, [pendingSplitAnim, setScriptCellValues, advanceScript]);

    // NOTE: the previous DOMRect-based approach drifted under scale/resolution.
    // We now compute emphasis bounds from the same geometry used to place rows/cells.

    /**
     * Choice chips overlay (shown when current step has inputMode 'choice').
     */
    const choiceChipsOverlay = React.useMemo(() => {
      if (!valueOverlay.open || valueOverlay.mode !== 'choice') return null;
      const opts = Array.isArray(valueOverlay.options) ? valueOverlay.options : [];
      return React.createElement('div', {
        key: 'choice-chips-overlay',
        className: 'la-number-pad-overlay',
        style: {
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        },
        onClick: (e) => { if (e.target === e.currentTarget) closeValueOverlay(); },
      }, React.createElement('div', {
        key: 'chips-container',
        style: {
          backgroundColor: 'rgba(30, 58, 138, 0.98)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          maxWidth: '420px',
        },
      }, [
        React.createElement('div', {
          key: 'chips-prompt',
          style: { color: '#FFFFFF', fontSize: '14px', textAlign: 'center', marginBottom: '14px' },
        }, 'Pick the value:'),
        React.createElement('div', {
          key: 'chips-row',
          className: 'la-choice-chips',
        }, opts.map((opt, i) => React.createElement('button', {
          key: `chip-${i}`,
          className: 'la-choice-chip',
          onClick: () => {
            const target = valueOverlay.target;
            const value = String(opt);
            closeValueOverlay();
            // Optional: animate-fly into target. For now, commit directly.
            commitCellValue(target, value, { expected: valueOverlay.expected });
          },
        }, String(opt))),
        )
      ]));
    }, [valueOverlay, closeValueOverlay, commitCellValue]);

    /**
     * Generic value input overlay (numeric pad) for inputMode 'type'.
     * Reuses the same layout as the fill-missing pad but is driven by the engine.
     */
    const scriptValueInputOverlay = React.useMemo(() => {
      if (!valueOverlay.open || valueOverlay.mode !== 'type') return null;
      const buf = valueOverlay.buffer;
      const maxN = valueOverlay.maxNumericValue;
      const handleNum = (n) => {
        const tid = valueOverlay.target;
        const prevBuf = valueOverlay.buffer || '';
        const retryAfterWrong =
          prevBuf === '' &&
          tid &&
          cellStatesRef.current.get(tid) === 'missed';
        const nextBuf = retryAfterWrong ? String(n) : prevBuf + String(n);
        if (maxN != null && Number.isFinite(maxN)) {
          const v = parseInt(nextBuf, 10);
          if (!Number.isNaN(v) && v > maxN) {
            if (typeof window !== 'undefined' && window.playAnswerSound) {
              window.playAnswerSound(false);
            }
            return;
          }
        }
        if (retryAfterWrong) {
          setCellStates((cs) => {
            const m = new Map(cs);
            if (m.get(tid) === 'missed') m.delete(tid);
            return m;
          });
          setScriptCellValues((sv) => {
            const m = new Map(sv);
            m.delete(tid);
            return m;
          });
        }
        setValueOverlay((prev) => ({ ...prev, buffer: nextBuf }));
      };
      const handleClear = () => setValueOverlay((prev) => ({ ...prev, buffer: '' }));
      const handleBack = () => setValueOverlay((prev) => ({ ...prev, buffer: (prev.buffer || '').slice(0, -1) }));
      const handleCheck = () => {
        const target = valueOverlay.target;
        const value = buf;
        const expected = valueOverlay.expected;
        closeValueOverlay();
        commitCellValue(target, value, { expected });
      };
      // Responsive number-pad sizing: every length is in `gc` so the pad
      // scales with the page grid. Width-axis dimensions are scaled 1.25×
      // and height-axis dimensions 1.2× from the base.
      const PAD_BG = toPx('20gc', 'borderRadius');
      const PAD_PADDING_V = toPx('24gc', 'width');
      const PAD_PADDING_H = toPx('25gc', 'width');
      const PAD_MIN_WIDTH = toPx('300gc', 'width');
      const PAD_GAP = toPx('8gc', 'width');
      const BTN_PAD_V = toPx('19gc', 'width');
      const BTN_PAD_H = toPx('20gc', 'width');
      const BTN_FONT = toPx('24gc', 'fontSize');
      const BTN_RADIUS = toPx('8gc', 'borderRadius');
      const AUX_FONT = toPx('20gc', 'fontSize');
      const SUBMIT_FONT = toPx('22gc', 'fontSize');
      const SUBMIT_PAD_V = toPx('17gc', 'width');
      const SUBMIT_PAD_H = toPx('18gc', 'width');
      const SUBMIT_MARGIN_TOP = toPx('12gc', 'width');

      const numBtn = (n) => React.createElement('button', {
        key: `num-${n}`,
        className: 'la-numpad-btn',
        style: {
          padding: `${BTN_PAD_V} ${BTN_PAD_H}`,
          fontSize: BTN_FONT,
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          border: 'none',
          borderRadius: BTN_RADIUS,
          color: '#FFFFFF',
          cursor: 'pointer',
        },
        onClick: () => handleNum(n),
      }, String(n));

      return React.createElement('div', {
        key: 'script-value-input-overlay',
        className: 'la-number-pad-overlay la-number-pad-overlay--no-scrim',
        style: {
          position: 'absolute',
          inset: 0,
          backgroundColor: 'transparent',
          zIndex: 2000,
          pointerEvents: 'none',
        },
      }, React.createElement('div', {
        key: 'pad',
        className: 'la-number-pad',
        'data-numpad-target': valueOverlay.target,
        style: {
          // `left` / `top` set by useLayoutEffect so the pad is anchored
          // beside the focused cell (never overlapping).
          position: 'absolute',
          backgroundColor: 'rgba(30, 58, 138, 0.98)',
          borderRadius: PAD_BG,
          padding: `${PAD_PADDING_V} ${PAD_PADDING_H}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          minWidth: PAD_MIN_WIDTH,
          pointerEvents: 'auto',
        },
      }, [
        React.createElement('div', {
          key: 'grid',
          style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: PAD_GAP },
        }, [
          numBtn(1), numBtn(2), numBtn(3),
          numBtn(4), numBtn(5), numBtn(6),
          numBtn(7), numBtn(8), numBtn(9),
          React.createElement('button', {
            key: 'clear', className: 'la-numpad-btn la-numpad-clear',
            style: { padding: `${BTN_PAD_V} ${BTN_PAD_H}`, fontSize: AUX_FONT, fontWeight: 'bold', backgroundColor: 'rgba(239, 68, 68, 0.3)', border: 'none', borderRadius: BTN_RADIUS, color: '#FCA5A5', cursor: 'pointer' },
            onClick: handleClear,
          }, 'C'),
          numBtn(0),
          React.createElement('button', {
            key: 'back', className: 'la-numpad-btn la-numpad-backspace',
            style: { padding: `${BTN_PAD_V} ${BTN_PAD_H}`, fontSize: AUX_FONT, fontWeight: 'bold', backgroundColor: 'rgba(251, 191, 36, 0.3)', border: 'none', borderRadius: BTN_RADIUS, color: '#FCD34D', cursor: 'pointer' },
            onClick: handleBack,
          }, '←'),
        ]),
        React.createElement('button', {
          key: 'check', className: 'la-numpad-submit',
          style: {
            width: '100%', marginTop: SUBMIT_MARGIN_TOP, padding: `${SUBMIT_PAD_V} ${SUBMIT_PAD_H}`,
            fontSize: SUBMIT_FONT, fontWeight: 'bold',
            backgroundColor: buf ? '#22C55E' : 'rgba(255, 255, 255, 0.1)',
            border: 'none', borderRadius: BTN_RADIUS,
            color: buf ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
            cursor: buf ? 'pointer' : 'not-allowed',
          },
          onClick: buf ? handleCheck : undefined,
          disabled: !buf,
        }, 'Check'),
      ]));
    }, [valueOverlay, closeValueOverlay, commitCellValue]);

    /**
     * Position the number pad so it sits BESIDE the focused cell, never
     * overlapping it. Side chosen by which root edge has more room.
     */
    React.useLayoutEffect(() => {
      if (!valueOverlay.open || valueOverlay.mode !== 'type') return undefined;
      if (typeof document === 'undefined') return undefined;
      const root = document.querySelector(`[data-element-name="${props.elementName || componentId}"]`);
      if (!root) return undefined;
      const pad = root.querySelector(`[data-numpad-target="${valueOverlay.target}"]`);
      const focus = root.querySelector(`[data-cell-id="${valueOverlay.target}"]`);
      if (!pad || !focus) return undefined;
      const rootRect = root.getBoundingClientRect();
      const fRect = focus.getBoundingClientRect();
      const padW = pad.offsetWidth;
      const padH = pad.offsetHeight;
      const rootW = rootRect.width;
      const rootH = rootRect.height;
      const margin = parseFloat(toPx('50gc', 'width')) || 50;

      const focusLeft = fRect.left - rootRect.left;
      const focusRight = fRect.right - rootRect.left;
      const focusTop = fRect.top - rootRect.top;
      const focusBottom = fRect.bottom - rootRect.top;
      const focusCenterY = (focusTop + focusBottom) / 2;

      const roomRight = rootW - focusRight;
      const roomLeft = focusLeft;
      const placeOnRight = roomRight >= roomLeft;
      const rawLeft = placeOnRight
        ? focusRight + margin
        : focusLeft - padW - margin;
      const rawTop = focusCenterY - padH / 2;
      const left = Math.max(margin, Math.min(rootW - padW - margin, rawLeft));
      const top = Math.max(margin, Math.min(rootH - padH - margin, rawTop));
      pad.style.left = `${left}px`;
      pad.style.top = `${top}px`;
      return undefined;
    }, [valueOverlay, props.elementName, componentId]);

    // Guided mode instruction panel
    const guidedInstructionPanel = React.useMemo(() => {
      if (useExternalInstructionTarget) return null;
      if (type !== 'guided' || !currentGuidedStep) return null;
      
      const instruction = currentGuidedStep.instruction || '';
      const stepNum = guidedState.currentStepIndex + 1;
      const totalSteps = (guidedStepsProp || []).length;
      const attempts = guidedState.attemptCount;
      
      return React.createElement('div', {
        key: 'guided-instruction-panel',
        className: 'la-guided-instruction',
        style: {
          position: 'absolute',
          bottom: '-50px',
          left: 0,
          right: 0,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(30, 58, 138, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        },
      }, [
        // Instruction text
        React.createElement('span', {
          key: 'instruction-text',
          style: {
            flex: 1,
            textAlign: 'center',
          },
        }, instruction),
        // Attempt indicator (if wrong attempts made)
        attempts > 0 ? React.createElement('span', {
          key: 'attempt-indicator',
          style: {
            marginLeft: '12px',
            color: '#FCA5A5',
            fontSize: '12px',
          },
        }, `(${attempts} wrong)`) : null,
      ]);
    }, [useExternalInstructionTarget, type, currentGuidedStep, guidedState.currentStepIndex, guidedState.attemptCount, guidedStepsProp]);

    // Guided completion message
    const guidedCompletionPanel = React.useMemo(() => {
      if (type !== 'guided' || !isGuidedComplete) return null;
      
      const totalSteps = (guidedStepsProp || []).length;
      
      return React.createElement('div', {
        key: 'guided-completion-panel',
        className: 'la-guided-completion',
        style: {
          position: 'absolute',
          bottom: '-50px',
          left: 0,
          right: 0,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(16, 185, 129, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        },
      }, `✓ Complete! All ${totalSteps} steps finished.`);
    }, [type, isGuidedComplete, guidedStepsProp]);

    // === PHASE 4: INCORRECT MODE PROGRESS PANEL ===
    const incorrectProgressPanel = React.useMemo(() => {
      if (type !== 'incorrect' || !incorrectCellsProp || incorrectCellsProp.length === 0) return null;
      if (isIncorrectComplete) return null;
      
      const { found, total, percentage } = incorrectProgress;
      const missed = incorrectState.missedSelections.size;
      const positionBase = incorrectProgressPanelGridCss
        ? incorrectProgressPanelGridCss
        : {
            position: 'absolute',
            bottom: '-50px',
            left: 0,
            right: 0,
          };

      const panelEl = React.createElement('div', {
        key: 'incorrect-progress-panel',
        className: 'la-incorrect-progress',
        style: {
          ...positionBase,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(124, 58, 237, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          ...incorrectOverlayStyleExtra,
        },
      }, [
        // Progress text
        React.createElement('span', {
          key: 'progress-text',
          style: {
            fontWeight: 'bold',
            color: '#C4B5FD',
          },
        }, `${found} / ${total} errors found`),
        // Progress bar
        React.createElement('div', {
          key: 'progress-bar-container',
          style: {
            flex: 1,
            marginLeft: '16px',
            marginRight: '16px',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
          },
        }, React.createElement('div', {
          key: 'progress-bar-fill',
          style: {
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#22C55E',
            borderRadius: '4px',
            transition: 'width 300ms ease',
          },
        })),
        // Instruction
        React.createElement('span', {
          key: 'instruction',
          style: {
            fontSize: '12px',
            opacity: 0.9,
          },
        }, 'Click the incorrect values'),
        // Missed count (if any)
        missed > 0 ? React.createElement('span', {
          key: 'missed-count',
          style: {
            marginLeft: '12px',
            color: '#FCA5A5',
            fontSize: '12px',
          },
        }, `(${missed} wrong clicks)`) : null,
      ]);

      if (incorrectProgressPanelGridCss && typeof document !== 'undefined') {
        const mc = document.querySelector('.main-container');
        const RD =
          typeof ReactDOM !== 'undefined'
            ? ReactDOM
            : typeof window !== 'undefined'
              ? window.ReactDOM
              : null;
        if (mc && RD && typeof RD.createPortal === 'function') {
          return RD.createPortal(panelEl, mc);
        }
      }
      return panelEl;
    }, [type, incorrectCellsProp, isIncorrectComplete, incorrectProgress, incorrectState.missedSelections.size, incorrectOverlayStyleExtra, incorrectProgressPanelGridCss]);

    // Incorrect mode completion panel
    const incorrectCompletionPanel = React.useMemo(() => {
      if (type !== 'incorrect' || !isIncorrectComplete) return null;
      
      const { total } = incorrectProgress;
      const missed = incorrectState.missedSelections.size;
      const accuracy = total > 0 ? Math.round(((total) / (total + missed)) * 100) : 100;
      const positionBase = incorrectProgressPanelGridCss
        ? incorrectProgressPanelGridCss
        : {
            position: 'absolute',
            bottom: '-50px',
            left: 0,
            right: 0,
          };

      const panelEl = React.createElement('div', {
        key: 'incorrect-completion-panel',
        className: 'la-incorrect-completion',
        style: {
          ...positionBase,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(16, 185, 129, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          ...incorrectOverlayStyleExtra,
        },
      }, [
        React.createElement('span', { key: 'check' }, '✓ '),
        React.createElement('span', { key: 'text' }, `All ${total} errors found!`),
        missed > 0 ? React.createElement('span', {
          key: 'accuracy',
          style: {
            marginLeft: '16px',
            fontSize: '14px',
            fontWeight: 'normal',
            opacity: 0.9,
          },
        }, `(${accuracy}% accuracy)`) : null,
      ]);

      if (incorrectProgressPanelGridCss && typeof document !== 'undefined') {
        const mc = document.querySelector('.main-container');
        const RD =
          typeof ReactDOM !== 'undefined'
            ? ReactDOM
            : typeof window !== 'undefined'
              ? window.ReactDOM
              : null;
        if (mc && RD && typeof RD.createPortal === 'function') {
          return RD.createPortal(panelEl, mc);
        }
      }
      return panelEl;
    }, [type, isIncorrectComplete, incorrectProgress, incorrectState.missedSelections.size, incorrectOverlayStyleExtra, incorrectProgressPanelGridCss]);

    // === PHASE 5: FILL-MISSING MODE PANELS ===
    
    // Number pad overlay
    const numberPadOverlay = React.useMemo(() => {
      if (type !== 'fill-missing' || !fillMissingState.showNumberPad) return null;

      const npRadius = toPx('18gc', 'borderRadius');
      const npBtnRadius = toPx('10gc', 'borderRadius');
      const npPad = toPx('18gc', 'padding');
      const npGap = toPx('10gc', 'gap');
      const npDigitPad = toPx('18gc', 'padding');
      const npDigitFs = toPx('22gc', 'fontSize');
      const npSmallFs = toPx('14gc', 'fontSize');
      const npMinW = toPx('95gc', 'minWidth');
      const sy = toPx('8gc', 'height');
      const sb = toPx('28gc', 'width');
      const npShadow =
        sy && sb && String(sy).endsWith('px') && String(sb).endsWith('px')
          ? `0 ${sy} ${sb} rgba(0, 0, 0, 0.45)`
          : '0 8px 28px rgba(0, 0, 0, 0.45)';

      const overlayEl = React.createElement('div', {
        key: 'number-pad-overlay',
        className: 'la-number-pad-overlay la-number-pad-overlay--no-scrim',
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
          zIndex: 2147483647,
        },
        onClick: (e) => {
          if (e.target === e.currentTarget) handleNumberPadClose();
        },
      }, React.createElement('div', {
        key: 'number-pad-container',
        className: 'la-number-pad',
        'data-fill-missing-pad': 'true',
        style: {
          position: 'absolute',
          left: numberPadPosition ? `${numberPadPosition.left}px` : '50%',
          top: numberPadPosition ? `${numberPadPosition.top}px` : '50%',
          // +25% width, +20% height vs gc-based layout (measurement uses getBoundingClientRect).
          transform: numberPadPosition
            ? 'scale(1.25, 1.2)'
            : 'translate(-50%, -50%) scale(1.25, 1.2)',
          transformOrigin: numberPadPosition ? 'top left' : 'center center',
          backgroundColor: 'rgba(30, 58, 138, 0.98)',
          borderRadius: npRadius,
          padding: npPad,
          boxShadow: npShadow,
          minWidth: npMinW,
          zIndex: 2147483647,
        },
        onClick: (e) => e.stopPropagation(),
      }, [
        // Number grid
        React.createElement('div', {
          key: 'grid',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: npGap,
          },
        }, [
          // Numbers 1-9
          ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => 
            React.createElement('button', {
              key: `num-${n}`,
              className: 'la-numpad-btn',
              style: {
                padding: npDigitPad,
                fontSize: npDigitFs,
                fontWeight: 'bold',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: npBtnRadius,
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background-color 150ms',
              },
              onClick: () => handleNumberPadInput(String(n)),
            }, n)
          ),
          // Clear button
          React.createElement('button', {
            key: 'clear',
            className: 'la-numpad-btn la-numpad-clear',
            style: {
              padding: npDigitPad,
              fontSize: npSmallFs,
              fontWeight: 'bold',
              backgroundColor: 'rgba(239, 68, 68, 0.3)',
              border: 'none',
              borderRadius: npBtnRadius,
              color: '#FCA5A5',
              cursor: 'pointer',
            },
            onClick: handleNumberPadClear,
          }, 'C'),
          // Zero
          React.createElement('button', {
            key: 'num-0',
            className: 'la-numpad-btn',
            style: {
              padding: npDigitPad,
              fontSize: npDigitFs,
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: npBtnRadius,
              color: '#FFFFFF',
              cursor: 'pointer',
            },
            onClick: () => handleNumberPadInput('0'),
          }, '0'),
          // Backspace
          React.createElement('button', {
            key: 'backspace',
            className: 'la-numpad-btn la-numpad-backspace',
            style: {
              padding: npDigitPad,
              fontSize: npSmallFs,
              fontWeight: 'bold',
              backgroundColor: 'rgba(251, 191, 36, 0.3)',
              border: 'none',
              borderRadius: npBtnRadius,
              color: '#FCD34D',
              cursor: 'pointer',
            },
            onClick: handleNumberPadBackspace,
          }, '←'),
        ]),
      ]));

      if (typeof document !== 'undefined') {
        const mc = document.querySelector('.main-container');
        const RD =
          typeof ReactDOM !== 'undefined'
            ? ReactDOM
            : typeof window !== 'undefined'
              ? window.ReactDOM
              : null;
        if (mc && RD && typeof RD.createPortal === 'function') {
          return RD.createPortal(overlayEl, mc);
        }
      }
      return overlayEl;
    }, [type, fillMissingState.showNumberPad,
        handleNumberPadInput, handleNumberPadClear, handleNumberPadBackspace,
        handleNumberPadClose, numberPadPosition, layoutGcTick]);

    // Fill-missing progress panel
    const fillMissingProgressPanel = React.useMemo(() => {
      if (type !== 'fill-missing' || !missingCellsProp || missingCellsProp.length === 0) return null;
      if (isFillMissingComplete) return null;
      
      const { filled, correct, total, percentage } = fillMissingProgress;
      const incorrect = interactionStats.incorrectActions;
      const positionBase = fillMissingProgressPanelGridCss
        ? fillMissingProgressPanelGridCss
        : {
            position: 'absolute',
            bottom: '-50px',
            left: 0,
            right: 0,
          };

      const panelEl = React.createElement('div', {
        key: 'fill-missing-progress-panel',
        className: 'la-fill-missing-progress',
        style: {
          ...positionBase,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(14, 116, 144, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          ...fillMissingOverlayStyleExtra,
        },
      }, [
        // Progress text
        React.createElement('span', {
          key: 'progress-text',
          style: {
            fontWeight: 'bold',
            color: '#A5F3FC',
          },
        }, `${correct} / ${total} filled correctly`),
        // Progress bar
        React.createElement('div', {
          key: 'progress-bar-container',
          style: {
            flex: 1,
            marginLeft: '16px',
            marginRight: '16px',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
          },
        }, React.createElement('div', {
          key: 'progress-bar-fill',
          style: {
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#22C55E',
            borderRadius: '4px',
            transition: 'width 300ms ease',
          },
        })),
        // Instruction
        React.createElement('span', {
          key: 'instruction',
          style: {
            fontSize: '12px',
            opacity: 0.9,
          },
        }, 'Click ? cells to fill'),
        // Wrong attempts
        incorrect > 0 ? React.createElement('span', {
          key: 'incorrect-count',
          style: {
            marginLeft: '12px',
            color: '#FCA5A5',
            fontSize: '12px',
          },
        }, `(${incorrect} wrong)`) : null,
      ]);

      if (fillMissingProgressPanelGridCss && typeof document !== 'undefined') {
        const mc = document.querySelector('.main-container');
        const RD =
          typeof ReactDOM !== 'undefined'
            ? ReactDOM
            : typeof window !== 'undefined'
              ? window.ReactDOM
              : null;
        if (mc && RD && typeof RD.createPortal === 'function') {
          return RD.createPortal(panelEl, mc);
        }
      }
      return panelEl;
    }, [type, missingCellsProp, isFillMissingComplete, fillMissingProgress, interactionStats.incorrectActions, fillMissingOverlayStyleExtra, fillMissingProgressPanelGridCss]);

    // Fill-missing completion panel
    const fillMissingCompletionPanel = React.useMemo(() => {
      if (type !== 'fill-missing' || !isFillMissingComplete) return null;
      
      const { total } = fillMissingProgress;
      const incorrect = interactionStats.incorrectActions;
      const accuracy = total > 0 ? Math.round((total / (total + incorrect)) * 100) : 100;
      const positionBase = fillMissingProgressPanelGridCss
        ? fillMissingProgressPanelGridCss
        : {
            position: 'absolute',
            bottom: '-50px',
            left: 0,
            right: 0,
          };

      const panelEl = React.createElement('div', {
        key: 'fill-missing-completion-panel',
        className: 'la-fill-missing-completion',
        style: {
          ...positionBase,
          minHeight: '40px',
          padding: '8px 16px',
          backgroundColor: 'rgba(16, 185, 129, 0.95)',
          borderRadius: '8px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Arial, Helvetica, "Segoe UI", system-ui, sans-serif',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          ...fillMissingOverlayStyleExtra,
        },
      }, [
        React.createElement('span', { key: 'check' }, '✓ '),
        React.createElement('span', { key: 'text' }, `All ${total} blanks filled correctly!`),
        incorrect > 0 ? React.createElement('span', {
          key: 'accuracy',
          style: {
            marginLeft: '16px',
            fontSize: '14px',
            fontWeight: 'normal',
            opacity: 0.9,
          },
        }, `(${accuracy}% accuracy)`) : null,
      ]);

      if (fillMissingProgressPanelGridCss && typeof document !== 'undefined') {
        const mc = document.querySelector('.main-container');
        const RD =
          typeof ReactDOM !== 'undefined'
            ? ReactDOM
            : typeof window !== 'undefined'
              ? window.ReactDOM
              : null;
        if (mc && RD && typeof RD.createPortal === 'function') {
          return RD.createPortal(panelEl, mc);
        }
      }
      return panelEl;
    }, [type, isFillMissingComplete, fillMissingProgress, interactionStats.incorrectActions, fillMissingOverlayStyleExtra, fillMissingProgressPanelGridCss]);

    const scriptTypeNumpadOpen =
      valueOverlay.open && valueOverlay.mode === 'type';
    const fillMissingNumpadOpen =
      type === 'fill-missing' &&
      fillMissingState.showNumberPad &&
      !!fillMissingState.focusedCell;
    const anyNumpadModalOpen = scriptTypeNumpadOpen || fillMissingNumpadOpen;
    // Transparent layer: blocks interaction with grid below the focus tile (no dark tint).
    const scriptNumpadDimmer = anyNumpadModalOpen
      ? React.createElement('div', {
          key: 'la-script-numpad-dimmer',
          className: 'la-script-numpad-dimmer',
          'aria-hidden': 'true',
          style: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            zIndex: 1500,
            pointerEvents: 'auto',
          },
        })
      : null;

    return React.createElement(
      'div',
      {
        id: componentId,
        ref: componentRootRef,
        className: 'long-addition-component',
        style: containerStyle,
        'data-element-type': 'long-addition',
        'data-element-name': props.elementName || componentId,
        'data-type': type,
        'data-flow-type': flowType,
        'data-script-numpad-open': scriptTypeNumpadOpen ? 'true' : undefined,
        'data-fill-missing-numpad-open': fillMissingNumpadOpen ? 'true' : undefined,
        'data-step': effectiveStep,
        'data-max-step': plan.maxStep,
        'data-guided-step': type === 'guided' ? String(guidedState.currentStepIndex) : undefined,
        'data-guided-total': type === 'guided' && guidedStepsProp ? String(guidedStepsProp.length) : undefined,
        'data-incorrect-found': type === 'incorrect' ? String(incorrectProgress.found) : undefined,
        'data-incorrect-total': type === 'incorrect' ? String(incorrectProgress.total) : undefined,
        'data-fill-missing-correct': type === 'fill-missing' ? String(fillMissingProgress.correct) : undefined,
        'data-fill-missing-total': type === 'fill-missing' ? String(fillMissingProgress.total) : undefined,
        'data-script-step': hasActiveScript ? String(scriptStepIndex) : undefined,
        'data-script-total': hasActiveScript ? String(script.length) : undefined,
        'data-expanded-sep-px': String(expandedSepWidth),
        'data-expanded-equals-sep-px': String(expandedEqualsSepWidth),
        'data-expanded-column-gap-raw': String(expandedColumnGapRaw ?? ''),
        ...(variant === 'both'
          ? { 'data-both-panel-gap-px': String(bothPanelGapPx) }
          : {}),
        ...(debugPanelLayout
          ? { 'data-layout-debug-tag': LONG_ADDITION_PANEL_LAYOUT_LOG }
          : {}),
      },
      [
        ...panelOutlines, 
        ...panelGridChildren, 
        // Script emphasis overlay (e.g. one dashed container around both operands).
        // Uses layout geometry so it stays correct across resolutions.
        emphasisBox && React.createElement('div', {
          key: `emphasis-${emphasisBox.key}`,
          className:
            'la-emphasis-container la-numpad-dimmable-chrome' +
            (emphasisBox.transparentBg ? ' la-emphasis-container--transparent' : ''),
          style: {
            position: 'absolute',
            left: `${Math.round(emphasisBox.left)}px`,
            top: `${Math.round(emphasisBox.top)}px`,
            width: `${Math.round(emphasisBox.width)}px`,
            height: `${Math.round(emphasisBox.height)}px`,
            // 3gc border thickness (gc→px) so it scales with layout.
            '--la-emphasis-border': `${(() => {
              const px = parseFloat(toPx('3gc', 'borderWidth'));
              return Number.isFinite(px) && px > 0 ? px : 3;
            })()}px`,
            ...(emphasisBox.emphasisColor
              ? {
                  '--la-emphasis-color': emphasisBox.emphasisColor,
                  '--la-emphasis-bg': emphasisBox.transparentBg ? 'transparent' : 'rgba(34, 197, 94, 0.20)',
                  '--la-emphasis-shadow': 'rgba(34, 197, 94, 0.25)',
                }
              : null),
            pointerEvents: hasActiveScript && currentScriptStep && currentScriptStep.advance && currentScriptStep.advance.type === 'tap-revealed'
              ? 'auto'
              : 'none',
            zIndex: 1,
          },
          onClick: (e) => {
            if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            if (hasActiveScript && currentScriptStep && currentScriptStep.advance && currentScriptStep.advance.type === 'tap-revealed') {
              advanceScript();
            }
          },
        }),
        ...simpleChildren, 
        ...expandedChildren,
        scriptNumpadDimmer,
        // Legacy panels (only when no script is active to avoid duplicates).
        !hasActiveScript ? guidedInstructionPanel : null,
        !hasActiveScript ? guidedCompletionPanel : null,
        incorrectProgressPanel,
        incorrectCompletionPanel,
        fillMissingProgressPanel,
        fillMissingCompletionPanel,
        numberPadOverlay,
        // Scripted engine UI (Phase C)
        scriptInstructionPanel,
        scriptCompletionPanel,
        transferGhost,
        ...(convergeGhosts || []),
        ...(Array.isArray(splitAnimOverlay) ? splitAnimOverlay : splitAnimOverlay ? [splitAnimOverlay] : []),
        choiceChipsOverlay,
        scriptValueInputOverlay,
      ].filter(Boolean)
    );
  });

  // Element configuration (default props for the registry).
  const LongAdditionElement = {
    'long-addition': {
      type: 'custom',
      coordinates: [10, 10, 90, 60],
      zIndex: 'var(--z-elevated)',
      props: {
        componentType: 'LongAdditionComponent',
        numbers: [0, 0],
        variant: 'simple',
        placeValueRow: 'full',
        operatorPosition: 'auto',
        mode: 'self',
        autoPlay: true,
        stepDurationMs: 700,
        placeLabelsI18nKey: 'common.longAddition.placeLabels',
        placeColorsI18nKey: 'common.longAddition.placeColors',
        convergeFlightDurationMs: 4000,
      },
    },
  };

  window.LongAdditionComponent = {
    LongAdditionComponent,
    LongAdditionElement,
  };

  console.log('✅ LongAdditionComponent loaded');
})();
