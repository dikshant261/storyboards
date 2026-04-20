/**
 * ParcelDisplayComponent — parcel box + optional inner region + grid of images + optional label.
 * PageConfig: type "custom", props.componentType "ParcelDisplayComponent".
 *
 * Inner grid: use **parcelRows** — each entry describes one row:
 *   - imageName (or image_name): key into assets — 'milk' | 'lollipop' | 'biscuit'
 *   - number: how many images in that row (evenly spaced across inner width)
 *   - isVisible: if false, the row takes no space and renders nothing
 * Optional per row: rowWeight — vertical share within visible rows.
 * Optional per row: layoutColumns — when set (e.g. 4), that row’s n images wrap in a grid with at
 * most that many columns (remaining rows stack below), instead of a single horizontal strip.
 * **innerMargins** `{ left, top, right, bottom }` (grid units) derives **inner** rect from parcel
 * **coordinates**; omit and use **innerCoordinates** only for an absolute inner rect.
 * **rowHeights**: optional number[] same length as **parcelRows** for relative row bands; if omitted
 * or length mismatch, visible rows share the inner height **equally**.
 *
 * Left-over line: set **leftOverValue** (top-level) or **leftOverLabel.value** (number). Display is
 *   prefix + (value === 0 ? nilWord : integer value). Prefix/nil use i18n keys
 *   pages.page5.leftOverPrefix / pages.page5.leftOverNil unless overridden on leftOverLabel.
 * If neither value is set, leftOverLabel falls back to text / textI18nKey as plain TeacherNote.
 * **leftOverLabel.staticTextOnly**: when true with text or textI18nKey, always show that string and
 * ignore computed leftover / leftOverValue (e.g. page 18 and page 17 parcel 6a at state-6-packets).
 * Page 9 parcel 1 at **state-4-milk**: shows prefix + milk bottle images (count = computed leftover)
 * instead of a numeric suffix.
 * **Pages 9–16:** biscuit (packet) images inside `page9-parcel-display-*` … `page16-parcel-display-*` (pages 11, 14–16 parcel DOM hidden like page 11)
 * use **115%** width/height (centered in each cell) so packets read larger inside the box overlay.
 *
 * Label placement: derive from the parcel **coordinates** using **leftOverLabel.margins**
 * `{ left, top, right, bottom?, height? }` in the same grid units — x1 = outer.x1 + left,
 * y1 = outer.y1 + top, x2 = outer.x2 - right, y2 = y1 + height or outer.y2 - bottom.
 * Omit margins and set **leftOverLabel.coordinates** only if you need a fixed absolute rect.
 *
 * **hideLeftOverInPage5States**: optional `string[]`. When `window.page5InteractionState` equals
 * any listed value, the leftover label is not rendered (re-renders on page 5 state / page change).
 */
(function (global) {
  const React = global.React;
  const TeacherNoteComponent = global.LayoutComponents?.TeacherNoteComponent;

  function i18nT(key, fallback) {
    if (typeof window === 'undefined' || !window.i18n || typeof window.i18n.t !== 'function') {
      return fallback;
    }
    const s = window.i18n.t(key);
    if (typeof s === 'string' && s.length > 0 && !s.startsWith('[Missing:')) return s;
    return fallback;
  }

  const DEFAULT_ASSETS = {
    milk: { imageSrc: 'assets/milk.png', imageAlt: 'Milk box' },
    lollipop: { imageSrc: 'assets/lollipop.png', imageAlt: 'Lollipop' },
    biscuit: { imageSrc: 'assets/biscuit.png', imageAlt: 'Biscuit packet' }
  };

  function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  /**
   * Label rect from parcel outer bounds + margins (grid units), or explicit coordinates.
   * @param {number[]} outer [x1,y1,x2,y2] parcel element coordinates
   * @param {object} label leftOverLabel config
   * @returns {number[]|null} [x1,y1,x2,y2]
   */
  function resolveLeftOverRect(outer, label) {
    if (!outer || outer.length !== 4 || !label) return null;
    if (label.margins && typeof label.margins === 'object') {
      const m = label.margins;
      const [ox1, oy1, ox2, oy2] = outer;
      const x1 = ox1 + (m.left ?? 0);
      const y1 = oy1 + (m.top ?? 0);
      const x2 = ox2 - (m.right ?? 0);
      let y2;
      if (m.height != null && Number.isFinite(Number(m.height))) {
        y2 = y1 + Number(m.height);
      } else if (m.bottom != null && Number.isFinite(Number(m.bottom))) {
        y2 = oy2 - Number(m.bottom);
      } else {
        y2 = y1 + 44;
      }
      if (x2 <= x1 || y2 <= y1) return null;
      return [x1, y1, x2, y2];
    }
    if (Array.isArray(label.coordinates) && label.coordinates.length === 4) {
      return label.coordinates;
    }
    return null;
  }

  /**
   * Inner content rect from parcel outer + insets, or explicit innerCoordinates.
   * @param {number[]} outer
   * @param {{ innerMargins?: object, innerCoordinates?: number[] }} cfg
   */
  function resolveInnerRect(outer, cfg) {
    if (!outer || outer.length !== 4) return null;
    const { innerMargins, innerCoordinates } = cfg || {};
    if (innerMargins && typeof innerMargins === 'object') {
      const m = innerMargins;
      const [ox1, oy1, ox2, oy2] = outer;
      const x1 = ox1 + (m.left ?? 0);
      const y1 = oy1 + (m.top ?? 0);
      const x2 = ox2 - (m.right ?? 0);
      const y2 = oy2 - (m.bottom ?? 0);
      if (x2 <= x1 || y2 <= y1) return null;
      return [x1, y1, x2, y2];
    }
    if (Array.isArray(innerCoordinates) && innerCoordinates.length === 4) {
      return innerCoordinates;
    }
    return null;
  }

  /** Absolute grid rect [x1,y1,x2,y2] → style as % of outer bounds */
  function absRectToPctStyle(outer, rect) {
    const [ox1, oy1, ox2, oy2] = outer;
    const [x1, y1, x2, y2] = rect;
    const w = ox2 - ox1;
    const h = oy2 - oy1;
    return {
      position: 'absolute',
      left: `${((x1 - ox1) / w) * 100}%`,
      top: `${((y1 - oy1) / h) * 100}%`,
      width: `${((x2 - x1) / w) * 100}%`,
      height: `${((y2 - y1) / h) * 100}%`
    };
  }

  function rowImageKey(row) {
    if (!row || typeof row !== 'object') return null;
    return row.imageName != null ? row.imageName : row.image_name;
  }

  function rowCount(row) {
    const n = row && row.number != null ? Number(row.number) : 0;
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  }

  function processGcStyleValue(value, cssProperty) {
    if (
      typeof value === 'string' &&
      value.includes('gc') &&
      typeof window !== 'undefined' &&
      window.GridCellFontUtils &&
      typeof window.GridCellFontUtils.processGcProperty === 'function'
    ) {
      return window.GridCellFontUtils.processGcProperty(value, cssProperty);
    }
    return value;
  }

  function rowIsVisible(row) {
    if (row == null || typeof row !== 'object') return false;
    if (row.isVisible === false || row.is_visible === false) return false;
    return true;
  }

  /** Collapse consecutive visible biscuit rows into one row (wrap as layoutColumns-wide grid). */
  function mergeBiscuitRowsWithColumnLayout(rows, layoutColumns = 4) {
    if (!Array.isArray(rows)) return rows;
    const cols = Math.max(1, Math.floor(Number(layoutColumns)) || 4);
    const out = [];
    let run = [];
    const flush = () => {
      if (run.length === 0) return;
      const total = run.reduce((s, r) => s + (Number(r.number) || 0), 0);
      if (total > 0) {
        out.push({ imageName: 'biscuit', number: total, isVisible: true, layoutColumns: cols });
      }
      run = [];
    };
    rows.forEach((r) => {
      const k = rowImageKey(r);
      if (rowIsVisible(r) && k === 'biscuit') {
        run.push(r);
      } else {
        flush();
        out.push(r);
      }
    });
    flush();
    return out;
  }

  function mergeBiscuitRowsWithFourColumnLayout(rows) {
    return mergeBiscuitRowsWithColumnLayout(rows, 4);
  }

  function countRowsByImageName(rows, imageName) {
    if (!Array.isArray(rows) || !imageName) return 0;
    return rows.reduce((total, row) => {
      if (!rowIsVisible(row) || rowImageKey(row) !== imageName) return total;
      return total + rowCount(row);
    }, 0);
  }

  function getRoundRobinRevealCount(step, parcelNumber, totalParcels, maxCount) {
    const safeStep = Math.max(0, Math.floor(Number(step)) || 0);
    const safeParcelNumber = Math.max(1, Math.floor(Number(parcelNumber)) || 1);
    const safeTotalParcels = Math.max(1, Math.floor(Number(totalParcels)) || 1);
    const safeMax = Math.max(0, Math.floor(Number(maxCount)) || 0);
    const rawCount = Math.floor((safeStep + safeTotalParcels - safeParcelNumber) / safeTotalParcels);
    return Math.max(0, Math.min(safeMax, rawCount));
  }

  function applyRoundRobinRevealToRows(rows, revealImageName, step, parcelNumber, totalParcels) {
    if (!Array.isArray(rows) || !revealImageName) return rows;
    return rows.map((row) => {
      if (rowImageKey(row) !== revealImageName) return row;
      const targetCount = rowCount(row);
      const revealCount = getRoundRobinRevealCount(step, parcelNumber, totalParcels, targetCount);
      return {
        ...row,
        isVisible: true,
        revealCount
      };
    });
  }

  function getPage17ParcelIndex(elementId) {
    if (typeof elementId !== 'string') return null;
    const match = elementId.match(/^page17-parcel-display-6([a-f])$/);
    if (!match) return null;
    return 'abcdef'.indexOf(match[1]) + 1;
  }

  function isPage18ParcelHighlight(elementId) {
    if (typeof elementId !== 'string' || !elementId.startsWith('page18-parcel-display-6')) return false;
    if (typeof window === 'undefined') return false;
    return (window.page18InteractionState || 'state-18-def') === 'state-18-max';
  }

  /** Pages 9–13: biscuit (packet) icons inside parcel overlays render ~15% larger */
  const PAGE910_PARCEL_PACKET_SCALE = 1.15;
  function parcelBiscuitPacketScale(elementId, elementName) {
    const a = typeof elementId === 'string' ? elementId : '';
    const b = typeof elementName === 'string' ? elementName : '';
    return a.startsWith('page9-parcel-display-') ||
      a.startsWith('page10-parcel-display-') ||
      a.startsWith('page11-parcel-display-') ||
      a.startsWith('page12-parcel-display-') ||
      a.startsWith('page13-parcel-display-') ||
      a.startsWith('page14-parcel-display-') ||
      a.startsWith('page15-parcel-display-') ||
      a.startsWith('page16-parcel-display-') ||
      a.startsWith('page17-parcel-display-6') ||
      b.startsWith('page9-parcel-display-') ||
      b.startsWith('page10-parcel-display-') ||
      b.startsWith('page11-parcel-display-') ||
      b.startsWith('page12-parcel-display-') ||
      b.startsWith('page13-parcel-display-') ||
      b.startsWith('page14-parcel-display-') ||
      b.startsWith('page15-parcel-display-') ||
      b.startsWith('page16-parcel-display-') ||
      b.startsWith('page17-parcel-display-6')
      ? PAGE910_PARCEL_PACKET_SCALE
      : 1;
  }

  /** Page 17 six-parcel stage: scale milk/lollipop/biscuit icons like page 9–16 biscuits. */
  function parcelCellIconScale(elementId, elementName, isBiscuitPacket) {
    const a = typeof elementId === 'string' ? elementId : '';
    if (a.startsWith('page17-parcel-display-6')) return PAGE910_PARCEL_PACKET_SCALE;
    if (isBiscuitPacket && parcelBiscuitPacketScale(elementId, elementName) > 1) {
      return PAGE910_PARCEL_PACKET_SCALE;
    }
    return 1;
  }

  /** Larger layout box (not transform) so size change survives parent clipping / stacking. */
  function scaledPacketCellPlacement(scale, fracLeft, fracTop, fracW, fracH) {
    if (!(scale > 1)) return null;
    const inv = (1 - scale) / 2;
    return {
      left: `${(fracLeft + fracW * inv) * 100}%`,
      top: `${(fracTop + fracH * inv) * 100}%`,
      width: `${fracW * scale * 100}%`,
      height: `${fracH * scale * 100}%`
    };
  }

  const ParcelDisplayComponent = React.memo((props) => {
    const {
      id,
      elementName,
      position,
      elementZIndex = 56,
      processedStyles,
      boxImageSrc = 'assets/box.png',
      boxImageAlt = 'Parcel box',
      innerCoordinates,
      innerMargins,
      parcelRows = [],
      rowHeights,
      assets = DEFAULT_ASSETS,
      leftOverValue,
      leftOverLabel = null,
      hideLeftOverInPage5States = null,
      visible = true
    } = props;

    const [leftOverI18nTick, setLeftOverI18nTick] = React.useState(0);
    React.useEffect(() => {
      const onLang = () => setLeftOverI18nTick((n) => n + 1);
      if (typeof window === 'undefined') return undefined;
      window.addEventListener('appLanguageChanged', onLang);
      return () => window.removeEventListener('appLanguageChanged', onLang);
    }, []);

    const [p5Tick, setP5Tick] = React.useState(0);
    const [p18Tick, setP18Tick] = React.useState(0);
    React.useEffect(() => {
      if (typeof window === 'undefined') return undefined;
      const bump = () => setP5Tick((t) => t + 1);
      window.addEventListener('page5InteractionStateChange', bump);
      window.addEventListener('page8InteractionStateChange', bump);
      window.addEventListener('page9InteractionStateChange', bump);
      window.addEventListener('page11InteractionStateChange', bump);
      window.addEventListener('page12InteractionStateChange', bump);
      window.addEventListener('page13InteractionStateChange', bump);
      window.addEventListener('pageChanged', bump);
      return () => {
        window.removeEventListener('page5InteractionStateChange', bump);
        window.removeEventListener('page8InteractionStateChange', bump);
        window.removeEventListener('page9InteractionStateChange', bump);
        window.removeEventListener('page11InteractionStateChange', bump);
        window.removeEventListener('page12InteractionStateChange', bump);
        window.removeEventListener('page13InteractionStateChange', bump);
        window.removeEventListener('pageChanged', bump);
      };
    }, []);
    React.useEffect(() => {
      if (typeof window === 'undefined' || typeof id !== 'string' || !id.startsWith('page18-parcel-display-6'))
        return undefined;
      const bump = () => setP18Tick((t) => t + 1);
      window.addEventListener('page18InteractionStateChange', bump);
      window.addEventListener('pageChanged', bump);
      return () => {
        window.removeEventListener('page18InteractionStateChange', bump);
        window.removeEventListener('pageChanged', bump);
      };
    }, [id]);

    const [roundRobinRevealStep, setRoundRobinRevealStep] = React.useState(0);
    React.useEffect(() => {
      if (typeof window === 'undefined' || typeof id !== 'string') {
        setRoundRobinRevealStep(0);
        return undefined;
      }

      let interactionState = null;
      if (id.startsWith('page5-parcel-display-')) {
        interactionState = window.page5InteractionState || 'default';
      } else if (id.startsWith('page8-parcel-display-')) {
        interactionState = window.page8InteractionState || 'default';
      } else if (id.startsWith('page9-parcel-display-')) {
        interactionState = window.page9InteractionState || 'default';
      } else if (id.startsWith('page17-parcel-display-6')) {
        interactionState = window.page9InteractionState || 'default';
      } else {
        setRoundRobinRevealStep(0);
        return undefined;
      }

      const revealImageName =
        interactionState.endsWith('-milk')
          ? 'milk'
          : interactionState.endsWith('-lollipop')
            ? 'lollipop'
            : interactionState.endsWith('-packets')
              ? 'biscuit'
              : null;

      if (!revealImageName) {
        setRoundRobinRevealStep(0);
        return undefined;
      }

      const totalSteps = countRowsByImageName(parcelRows, revealImageName);
      if (totalSteps <= 0) {
        setRoundRobinRevealStep(0);
        return undefined;
      }

      let step = 1;
      setRoundRobinRevealStep(1);

      const timerId = window.setInterval(() => {
        step += 1;
        if (step >= totalSteps) {
          setRoundRobinRevealStep(totalSteps);
          window.clearInterval(timerId);
          return;
        }
        setRoundRobinRevealStep(step);
      }, 160);

      return () => window.clearInterval(timerId);
    }, [id, parcelRows, p5Tick]);

    const parcelLayout = React.useMemo(() => {
      const usePage9Or10 =
        typeof id === 'string' &&
        (id.startsWith('page9-') ||
          id.startsWith('page10-parcel-display-') ||
          id.startsWith('page14-parcel-display-') ||
          id.startsWith('page15-parcel-display-') ||
          id.startsWith('page16-parcel-display-') ||
          id.startsWith('page17-parcel-display-'));
      const usePage11Parcels = typeof id === 'string' && id.startsWith('page11-parcel-display-');
      const usePage12Parcels = typeof id === 'string' && id.startsWith('page12-parcel-display-');
      const usePage13Parcels = typeof id === 'string' && id.startsWith('page13-parcel-display-');
      const usePage8 = typeof id === 'string' && id.startsWith('page8-');
      const st =
        typeof window !== 'undefined'
          ? usePage13Parcels
            ? window.page13InteractionState || 'default'
            : usePage12Parcels
              ? window.page12InteractionState || 'default'
              : usePage11Parcels
                ? window.page11InteractionState || 'default'
                : usePage9Or10
                  ? window.page9InteractionState || 'default'
                  : usePage8
                    ? window.page8InteractionState || 'default'
                    : window.page5InteractionState || 'default'
          : usePage13Parcels || usePage12Parcels || usePage11Parcels || usePage9Or10 || usePage8
            ? 'default'
            : 'default';
      // Page 11 / page 14: keep parcel boxes hidden (shared 9–12 logic would otherwise show them).
      if (
        typeof id === 'string' &&
        (id.startsWith('page11-parcel-display-') ||
          id.startsWith('page14-parcel-display-') ||
          id.startsWith('page15-parcel-display-') ||
          id.startsWith('page16-parcel-display-'))
      ) {
        return {
          effectiveVisible: false,
          effectiveRows: Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows,
          effectiveLeftOver: null
        };
      }
      if (typeof id === 'string' && id.startsWith('page18-parcel-display-6')) {
        const st18 =
          typeof window !== 'undefined' ? window.page18InteractionState || 'state-18-def' : 'state-18-def';
        if (st18 === 'state-18-def') {
          return {
            effectiveVisible: true,
            effectiveRows: Array.isArray(parcelRows)
              ? parcelRows.map((r) => ({ ...r, isVisible: false }))
              : parcelRows,
            effectiveLeftOver: null
          };
        }
        return {
          effectiveVisible: visible !== false,
          effectiveRows: parcelRows,
          effectiveLeftOver: null
        };
      }
      let effectiveVisible = visible !== false;
      let effectiveRows = parcelRows;
      let effectiveLeftOver = null;

      /** Sum over types: totalCount - containers * floor(totalCount/containers). */
      const page5PackingLeftoverSum = (rows, rowIndexVisible, divisor) => {
        const d = Number(divisor) > 0 ? Math.floor(Number(divisor)) : 1;
        if (!Array.isArray(rows)) return 0;
        const totals = {};
        rows.forEach((r, i) => {
          if (!rowIndexVisible(i)) return;
          const k = rowImageKey(r);
          if (!k) return;
          const t = Number(r.number);
          const add = Number.isFinite(t) ? t : 0;
          totals[k] = (totals[k] || 0) + add;
        });
        return Object.keys(totals).reduce((sum, k) => {
          const T = totals[k];
          return sum + (T - d * Math.floor(T / d));
        }, 0);
      };

      /** Per type in each parcel: floor(totalCount/containers); aggregates config rows by imageName. */
      const page5ParcelSplitRowsByType = (rows, rowIndexVisible, divisor) => {
        const d = Number(divisor) > 0 ? Math.floor(Number(divisor)) : 1;
        if (!Array.isArray(rows)) return rows;
        const order = [];
        const totals = {};
        rows.forEach((r, i) => {
          if (!rowIndexVisible(i)) return;
          const k = rowImageKey(r);
          if (!k) return;
          const t = Number(r.number);
          const add = Number.isFinite(t) ? t : 0;
          if (!(k in totals)) {
            totals[k] = 0;
            order.push(k);
          }
          totals[k] += add;
        });
        return order.map((k) => ({
          imageName: k,
          number: Math.floor((totals[k] || 0) / d),
          isVisible: true
        }));
      };
      const parcel1StatesPage5 = [
        'state-1-def',
        'state-1-milk',
        'state-1-lollipop',
        'state-1-packets',
        'state-2-def',
        'state-2-milk',
        'state-2-lollipop',
        'state-2-packets'
      ];
      const parcel1StatesPage8 = [
        ...parcel1StatesPage5,
        'state-3-def',
        'state-3-reveal',
        'state-3-milk',
        'state-3-lollipop',
        'state-3-packets'
      ];
      const parcel1StatesPage9 = [
        ...parcel1StatesPage8,
        'state-4-def',
        'state-4-reveal',
        'state-4-milk',
        'state-4-lollipop',
        'state-4-packets'
      ];
      const parcel1Active =
        (id === 'page5-parcel-display-1' && parcel1StatesPage5.includes(st)) ||
        (id === 'page8-parcel-display-1' && parcel1StatesPage8.includes(st)) ||
        ((id === 'page9-parcel-display-1' || id === 'page10-parcel-display-1' || id === 'page11-parcel-display-1' || id === 'page12-parcel-display-1' || id === 'page13-parcel-display-1' || id === 'page14-parcel-display-1' || id === 'page15-parcel-display-1' || id === 'page16-parcel-display-1' || id === 'page17-parcel-display-1') && parcel1StatesPage9.includes(st));
      if (parcel1Active) {
        const axis3Parcel1 = id === 'page8-parcel-display-1' || (id === 'page9-parcel-display-1' || id === 'page10-parcel-display-1' || id === 'page11-parcel-display-1' || id === 'page12-parcel-display-1' || id === 'page13-parcel-display-1' || id === 'page14-parcel-display-1' || id === 'page15-parcel-display-1' || id === 'page16-parcel-display-1' || id === 'page17-parcel-display-1');
        const axis34Parcel1 =
          axis3Parcel1 &&
          (st.startsWith('state-3') || ((id === 'page9-parcel-display-1' || id === 'page10-parcel-display-1' || id === 'page11-parcel-display-1' || id === 'page12-parcel-display-1' || id === 'page13-parcel-display-1' || id === 'page14-parcel-display-1' || id === 'page15-parcel-display-1' || id === 'page16-parcel-display-1') && st.startsWith('state-4')));
        const divisor34 =
          (id === 'page9-parcel-display-1' || id === 'page10-parcel-display-1' || id === 'page11-parcel-display-1' || id === 'page12-parcel-display-1' || id === 'page13-parcel-display-1' || id === 'page14-parcel-display-1' || id === 'page15-parcel-display-1' || id === 'page16-parcel-display-1') && st.startsWith('state-4') ? 4 : 3;
        // 6 biscuits / parcel → 2 rows × 3 cols (cols=2 would stack 3 icon rows)
        const biscuitCols34 = divisor34 === 4 ? 3 : 4;
        effectiveVisible = true;
        if (axis34Parcel1 && (st === 'state-3-def' || st === 'state-4-def')) {
          effectiveVisible = false;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (axis34Parcel1 && (st === 'state-3-reveal' || st === 'state-4-reveal')) {
          effectiveVisible = true;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (axis34Parcel1 && (st === 'state-3-packets' || st === 'state-4-packets')) {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, divisor34);
          effectiveRows = mergeBiscuitRowsWithColumnLayout(
            page5ParcelSplitRowsByType(parcelRows, () => true, divisor34),
            biscuitCols34
          );
        } else if (axis34Parcel1 && (st === 'state-3-milk' || st === 'state-4-milk')) {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, divisor34);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, divisor34);
        } else if (axis34Parcel1 && (st === 'state-3-lollipop' || st === 'state-4-lollipop')) {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, divisor34);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, divisor34);
        } else if (st === 'state-2-def') {
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (st === 'state-2-milk') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, 2);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, 2);
        } else if (st === 'state-2-lollipop') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, 2);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, 2);
        } else if (st === 'state-2-packets') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, 2);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, () => true, 2);
        } else if (st === 'state-1-packets') {
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: true }))
            : parcelRows;
        } else if (st === 'state-1-lollipop') {
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r, i) => ({ ...r, isVisible: i < 3 }))
            : parcelRows;
        } else if (st === 'state-1-milk') {
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r, i) => ({ ...r, isVisible: i === 0 }))
            : parcelRows;
        } else {
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        }
      }
      const parcel2StatesPage5 = ['state-2-def', 'state-2-milk', 'state-2-lollipop', 'state-2-packets'];
      const parcel2StatesPage8 = [
        ...parcel2StatesPage5,
        'state-3-def',
        'state-3-reveal',
        'state-3-milk',
        'state-3-lollipop',
        'state-3-packets'
      ];
      const parcel2StatesPage9 = [
        ...parcel2StatesPage8,
        'state-4-def',
        'state-4-reveal',
        'state-4-milk',
        'state-4-lollipop',
        'state-4-packets'
      ];
      const parcel2Active =
        (id === 'page5-parcel-display-2' && parcel2StatesPage5.includes(st)) ||
        (id === 'page8-parcel-display-2' && parcel2StatesPage8.includes(st)) ||
        ((id === 'page9-parcel-display-2' || id === 'page10-parcel-display-2' || id === 'page11-parcel-display-2' || id === 'page12-parcel-display-2' || id === 'page13-parcel-display-2' || id === 'page14-parcel-display-2' || id === 'page15-parcel-display-2' || id === 'page16-parcel-display-2' || id === 'page17-parcel-display-2') && parcel2StatesPage9.includes(st));
      if (parcel2Active) {
        const axis3Parcel2 = id === 'page8-parcel-display-2' || (id === 'page9-parcel-display-2' || id === 'page10-parcel-display-2' || id === 'page11-parcel-display-2' || id === 'page12-parcel-display-2' || id === 'page13-parcel-display-2' || id === 'page14-parcel-display-2' || id === 'page15-parcel-display-2' || id === 'page16-parcel-display-2' || id === 'page17-parcel-display-2');
        const axis34Parcel2 =
          axis3Parcel2 &&
          (st.startsWith('state-3') || ((id === 'page9-parcel-display-2' || id === 'page10-parcel-display-2' || id === 'page11-parcel-display-2' || id === 'page12-parcel-display-2' || id === 'page13-parcel-display-2' || id === 'page14-parcel-display-2' || id === 'page15-parcel-display-2' || id === 'page16-parcel-display-2') && st.startsWith('state-4')));
        const divisor34 =
          (id === 'page9-parcel-display-2' || id === 'page10-parcel-display-2' || id === 'page11-parcel-display-2' || id === 'page12-parcel-display-2' || id === 'page13-parcel-display-2' || id === 'page14-parcel-display-2' || id === 'page15-parcel-display-2' || id === 'page16-parcel-display-2') && st.startsWith('state-4') ? 4 : 3;
        const biscuitCols34 = divisor34 === 4 ? 3 : 4;
        effectiveVisible = true;
        if (axis34Parcel2 && (st === 'state-3-def' || st === 'state-4-def')) {
          effectiveVisible = false;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (axis34Parcel2 && (st === 'state-3-reveal' || st === 'state-4-reveal')) {
          effectiveVisible = true;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (axis34Parcel2 && (st === 'state-3-packets' || st === 'state-4-packets')) {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, divisor34);
          effectiveRows = mergeBiscuitRowsWithColumnLayout(
            page5ParcelSplitRowsByType(parcelRows, () => true, divisor34),
            biscuitCols34
          );
        } else if (axis34Parcel2 && (st === 'state-3-lollipop' || st === 'state-4-lollipop')) {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, divisor34);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, divisor34);
        } else if (axis34Parcel2 && (st === 'state-3-milk' || st === 'state-4-milk')) {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, divisor34);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, divisor34);
        } else if (st === 'state-2-def') {
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (st === 'state-2-packets') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, 2);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, () => true, 2);
        } else if (st === 'state-2-lollipop') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, 2);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, 2);
        } else if (st === 'state-2-milk') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, 2);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, 2);
        }
      }
      if (
        (id === 'page8-parcel-display-3' || (id === 'page9-parcel-display-3' || id === 'page10-parcel-display-3' || id === 'page11-parcel-display-3' || id === 'page12-parcel-display-3' || id === 'page13-parcel-display-3' || id === 'page14-parcel-display-3' || id === 'page15-parcel-display-3' || id === 'page16-parcel-display-3' || id === 'page17-parcel-display-3')) &&
        (st === 'state-3-def' ||
          st === 'state-3-reveal' ||
          st === 'state-3-milk' ||
          st === 'state-3-lollipop' ||
          st === 'state-3-packets' ||
          ((id === 'page9-parcel-display-3' || id === 'page10-parcel-display-3' || id === 'page11-parcel-display-3' || id === 'page12-parcel-display-3' || id === 'page13-parcel-display-3' || id === 'page14-parcel-display-3' || id === 'page15-parcel-display-3' || id === 'page16-parcel-display-3') &&
            (st === 'state-4-def' ||
              st === 'state-4-reveal' ||
              st === 'state-4-milk' ||
              st === 'state-4-lollipop' ||
              st === 'state-4-packets')))
      ) {
        const d3 =
          (id === 'page9-parcel-display-3' || id === 'page10-parcel-display-3' || id === 'page11-parcel-display-3' || id === 'page12-parcel-display-3' || id === 'page13-parcel-display-3' || id === 'page14-parcel-display-3' || id === 'page15-parcel-display-3' || id === 'page16-parcel-display-3') && st.startsWith('state-4') ? 4 : 3;
        const bcols = d3 === 4 ? 3 : 4;
        if (st === 'state-3-def' || st === 'state-4-def') {
          effectiveVisible = false;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (st === 'state-3-reveal' || st === 'state-4-reveal') {
          effectiveVisible = true;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else {
          effectiveVisible = true;
        }
        if (st === 'state-3-packets' || st === 'state-4-packets') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, d3);
          effectiveRows = mergeBiscuitRowsWithColumnLayout(
            page5ParcelSplitRowsByType(parcelRows, () => true, d3),
            bcols
          );
        } else if (st === 'state-3-lollipop' || st === 'state-4-lollipop') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, d3);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, d3);
        } else if (st === 'state-3-milk' || st === 'state-4-milk') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, d3);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, d3);
        }
      }
      if (
        (id === 'page9-parcel-display-4' || id === 'page10-parcel-display-4' || id === 'page11-parcel-display-4' || id === 'page12-parcel-display-4' || id === 'page13-parcel-display-4' || id === 'page14-parcel-display-4' || id === 'page15-parcel-display-4' || id === 'page16-parcel-display-4' || id === 'page17-parcel-display-4') &&
        (st === 'state-4-def' ||
          st === 'state-4-reveal' ||
          st === 'state-4-milk' ||
          st === 'state-4-lollipop' ||
          st === 'state-4-packets')
      ) {
        const d4 = 4;
        const bcols4 = 3;
        if (st === 'state-4-def') {
          effectiveVisible = false;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (st === 'state-4-reveal') {
          effectiveVisible = true;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else {
          effectiveVisible = true;
        }
        if (st === 'state-4-packets') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, d4);
          effectiveRows = mergeBiscuitRowsWithColumnLayout(
            page5ParcelSplitRowsByType(parcelRows, () => true, d4),
            bcols4
          );
        } else if (st === 'state-4-lollipop') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, d4);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, d4);
        } else if (st === 'state-4-milk') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, d4);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, d4);
        }
      }
      if ((id === 'page9-parcel-display-4' || id === 'page10-parcel-display-4' || id === 'page11-parcel-display-4' || id === 'page12-parcel-display-4' || id === 'page13-parcel-display-4' || id === 'page14-parcel-display-4' || id === 'page15-parcel-display-4' || id === 'page16-parcel-display-4' || id === 'page17-parcel-display-4') && !String(st).startsWith('state-4')) {
        effectiveVisible = false;
      }

      const page5ParcelMatch = typeof id === 'string' ? id.match(/^page5-parcel-display-(\d+)$/) : null;
      if (page5ParcelMatch && String(st).startsWith('state-2-')) {
        const revealImageName =
          st === 'state-2-milk'
            ? 'milk'
            : st === 'state-2-lollipop'
              ? 'lollipop'
              : st === 'state-2-packets'
                ? 'biscuit'
                : null;
        if (revealImageName) {
          effectiveRows = applyRoundRobinRevealToRows(
            effectiveRows,
            revealImageName,
            roundRobinRevealStep,
            Number(page5ParcelMatch[1]),
            2
          );
        }
      }

      const page8ParcelMatch = typeof id === 'string' ? id.match(/^page8-parcel-display-(\d+)$/) : null;
      if (page8ParcelMatch && String(st).startsWith('state-3-')) {
        const revealImageName =
          st === 'state-3-milk'
            ? 'milk'
            : st === 'state-3-lollipop'
              ? 'lollipop'
              : st === 'state-3-packets'
                ? 'biscuit'
                : null;
        if (revealImageName) {
          effectiveRows = applyRoundRobinRevealToRows(
            effectiveRows,
            revealImageName,
            roundRobinRevealStep,
            Number(page8ParcelMatch[1]),
            3
          );
        }
      }

      const page9ParcelMatch = typeof id === 'string' ? id.match(/^page9-parcel-display-(\d+)$/) : null;
      if (page9ParcelMatch && String(st).startsWith('state-4-')) {
        const revealImageName =
          st === 'state-4-milk'
            ? 'milk'
            : st === 'state-4-lollipop'
              ? 'lollipop'
              : st === 'state-4-packets'
                ? 'biscuit'
                : null;
        if (revealImageName) {
          effectiveRows = applyRoundRobinRevealToRows(
            effectiveRows,
            revealImageName,
            roundRobinRevealStep,
            Number(page9ParcelMatch[1]),
            4
          );
        }
      }

      // Page 17: hide parcels 1-4 during state-6 (they're replaced by 6-parcel layout)
      if (
        (id === 'page17-parcel-display-1' ||
          id === 'page17-parcel-display-2' ||
          id === 'page17-parcel-display-3' ||
          id === 'page17-parcel-display-4') &&
        String(st).startsWith('state-6')
      ) {
        effectiveVisible = false;
      }
      // Page 17 container-6: 6 parcels (6a-6f), divisor=6; packets = one row × 4 columns (not 2×2)
      if (
        typeof id === 'string' &&
        id.startsWith('page17-parcel-display-6') &&
        (st === 'state-6-def' ||
          st === 'state-6-reveal' ||
          st === 'state-6-milk' ||
          st === 'state-6-lollipop' ||
          st === 'state-6-packets')
      ) {
        const d6 = 6;
        const bcols6 = 4;
        if (st === 'state-6-def') {
          effectiveVisible = false;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else if (st === 'state-6-reveal') {
          effectiveVisible = true;
          effectiveRows = Array.isArray(parcelRows)
            ? parcelRows.map((r) => ({ ...r, isVisible: false }))
            : parcelRows;
        } else {
          effectiveVisible = true;
        }
        if (st === 'state-6-packets') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, () => true, d6);
          effectiveRows = mergeBiscuitRowsWithColumnLayout(
            page5ParcelSplitRowsByType(parcelRows, () => true, d6),
            bcols6
          );
        } else if (st === 'state-6-lollipop') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i < 3, d6);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i < 3, d6);
        } else if (st === 'state-6-milk') {
          effectiveLeftOver = page5PackingLeftoverSum(parcelRows, (i) => i === 0, d6);
          effectiveRows = page5ParcelSplitRowsByType(parcelRows, (i) => i === 0, d6);
        }
      }

      const page17ParcelIndex = getPage17ParcelIndex(id);
      if (page17ParcelIndex && String(st).startsWith('state-6-')) {
        const revealImageName =
          st === 'state-6-milk'
            ? 'milk'
            : st === 'state-6-lollipop'
              ? 'lollipop'
              : st === 'state-6-packets'
                ? 'biscuit'
                : null;
        if (revealImageName) {
          effectiveRows = applyRoundRobinRevealToRows(
            effectiveRows,
            revealImageName,
            roundRobinRevealStep,
            page17ParcelIndex,
            6
          );
        }
      }
      return { effectiveVisible, effectiveRows, effectiveLeftOver };
    }, [id, visible, parcelRows, p5Tick, p18Tick, roundRobinRevealStep]);

    const leftOverNoteContent = React.useMemo(() => {
      if (!leftOverLabel) return null;
      const label = leftOverLabel;
      if (label.staticTextOnly && (label.textI18nKey || label.text)) {
        return {
          type: 'text',
          text: label.text,
          textI18nKey: label.textI18nKey,
          textI18nFallback: label.textI18nFallback
        };
      }
      const dyn =
        parcelLayout.effectiveLeftOver !== null && parcelLayout.effectiveLeftOver !== undefined
          ? Number(parcelLayout.effectiveLeftOver)
          : NaN;
      let numeric = Number.isFinite(dyn) && !Number.isNaN(dyn)
        ? Math.floor(dyn)
        : leftOverValue !== undefined && leftOverValue !== null
          ? Number(leftOverValue)
          : NaN;
      if (Number.isNaN(numeric) && label.value !== undefined && label.value !== null) {
        numeric = Number(label.value);
      }
      const parcel1PackingSt =
        id === 'page13-parcel-display-1' && typeof window !== 'undefined'
          ? window.page13InteractionState || ''
          : id === 'page12-parcel-display-1' && typeof window !== 'undefined'
            ? window.page12InteractionState || ''
            : id === 'page11-parcel-display-1' && typeof window !== 'undefined'
              ? window.page11InteractionState || ''
              : (id === 'page9-parcel-display-1' ||
                    id === 'page10-parcel-display-1' ||
                    id === 'page14-parcel-display-1' || id === 'page15-parcel-display-1' || id === 'page16-parcel-display-1' || id === 'page17-parcel-display-1') && typeof window !== 'undefined'
                ? window.page9InteractionState || ''
                : '';
      const page9MilkIconLeftOverStates = ['state-4-milk', 'state-4-lollipop', 'state-4-packets'];
      if (
        (id === 'page9-parcel-display-1' ||
          id === 'page10-parcel-display-1' ||
          id === 'page11-parcel-display-1' ||
          id === 'page12-parcel-display-1' ||
          id === 'page13-parcel-display-1' ||
          id === 'page14-parcel-display-1' || id === 'page15-parcel-display-1' || id === 'page16-parcel-display-1') &&
        page9MilkIconLeftOverStates.includes(parcel1PackingSt) &&
        Number.isFinite(numeric) &&
        numeric > 0
      ) {
        const prefix =
          label.textPrefix ||
          i18nT(
            label.textPrefixI18nKey || 'pages.page5.leftOverPrefix',
            'Left Over : '
          );
        return {
          type: 'milkIcons',
          prefix,
          count: Math.min(Math.floor(numeric), 24)
        };
      }
      if (Number.isFinite(numeric)) {
        const n = Math.floor(numeric);
        const prefix =
          label.textPrefix ||
          i18nT(
            label.textPrefixI18nKey || 'pages.page5.leftOverPrefix',
            'Left Over : '
          );
        const nilWord =
          label.textNil || i18nT(label.textNilI18nKey || 'pages.page5.leftOverNil', 'Nil');
        const suffix = n === 0 ? nilWord : String(n);
        return {
          type: 'text',
          text: prefix + suffix,
          textI18nKey: undefined,
          textI18nFallback: undefined
        };
      }
      return {
        type: 'text',
        text: label.text,
        textI18nKey: label.textI18nKey,
        textI18nFallback: label.textI18nFallback
      };
    }, [id, leftOverLabel, leftOverValue, leftOverI18nTick, parcelLayout]);

    const outer = position?.coordinates;
    const rootStyle = {
      ...(position?.css || {}),
      ...(processedStyles || {}),
      zIndex: elementZIndex,
      overflow: 'visible',
      ...(parcelLayout.effectiveVisible === false ? { display: 'none' } : {})
    };

    if (!outer || outer.length !== 4) {
      return React.createElement(
        'div',
        { style: rootStyle, 'data-error': 'parcel-display' },
        'ParcelDisplayComponent: invalid position.coordinates'
      );
    }

    const children = [];

    const parcelBoxHighlightStyle = isPage18ParcelHighlight(id)
      ? {
          filter:
            'drop-shadow(0 0 8px rgba(255, 214, 10, 0.95)) drop-shadow(0 0 18px rgba(255, 214, 10, 0.7))',
          transform: 'scale(1.01)'
        }
      : null;

    children.push(
      React.createElement('img', {
        key: 'parcel-box',
        src: boxImageSrc,
        alt: boxImageAlt,
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          zIndex: 0,
          pointerEvents: 'none',
          ...(parcelBoxHighlightStyle || {})
        }
      })
    );

    const parcelRowsForRender = parcelLayout.effectiveRows;
    const useParcelRows = Array.isArray(parcelRowsForRender) && parcelRowsForRender.length > 0;
    const innerRect = resolveInnerRect(outer, { innerMargins, innerCoordinates });
    const rowHeightsAligned =
      Array.isArray(rowHeights) && rowHeights.length === parcelRowsForRender.length;

    if (innerRect && innerRect.length === 4 && useParcelRows) {
      const innerIconsOverflowVisible =
        (typeof id === 'string' && id.startsWith('page17-parcel-display-6')) ||
        parcelBiscuitPacketScale(id, elementName) > 1;
      const innerWrapStyle = {
        ...absRectToPctStyle(outer, innerRect),
        zIndex: 1,
        pointerEvents: 'none',
        boxSizing: 'border-box',
        overflow: innerIconsOverflowVisible ? 'visible' : 'hidden'
      };

      const weights = parcelRowsForRender.map((row, i) => {
        if (!rowIsVisible(row)) return 0;
        if (row.rowWeight != null && Number.isFinite(Number(row.rowWeight))) {
          return Math.max(0, Number(row.rowWeight));
        }
        if (rowHeightsAligned && rowHeights[i] != null) {
          return Math.max(0, Number(rowHeights[i]) || 0);
        }
        return 1;
      });
      const sumW = sum(weights);
      const denom = sumW > 0 ? sumW : 1;

      const cellNodes = [];
      let yOff = 0;
      parcelRowsForRender.forEach((row, r) => {
        if (!rowIsVisible(row)) return;
        const wRow = weights[r] / denom;
        const n = rowCount(row);
        const revealCount =
          row && row.revealCount != null
            ? Math.max(0, Math.min(n, Math.floor(Number(row.revealCount)) || 0))
            : n;
        const key = rowImageKey(row);
        const asset = (assets && assets[key]) || DEFAULT_ASSETS[key];
        const isBiscuitPacket =
          key === 'biscuit' || (asset && String(asset.imageSrc || '').toLowerCase().includes('biscuit'));
        if (!asset || n <= 0) {
          yOff += wRow;
          return;
        }
        const layoutColsRaw =
          row.layoutColumns != null && Number(row.layoutColumns) > 0
            ? Math.floor(Number(row.layoutColumns))
            : null;
        if (layoutColsRaw != null) {
          const cols = Math.min(layoutColsRaw, n);
          const imgRows = Math.max(1, Math.ceil(n / cols));
          const cellW = 1 / cols;
          const cellH = wRow / imgRows;
          for (let k = 0; k < revealCount; k++) {
            const col = k % cols;
            const imgRow = Math.floor(k / cols);
            const fracL = col * cellW;
            const fracT = yOff + imgRow * cellH;
            const cellIconSc = parcelCellIconScale(id, elementName, isBiscuitPacket);
            const scaledPlace =
              cellIconSc > 1 ? scaledPacketCellPlacement(cellIconSc, fracL, fracT, cellW, cellH) : null;
            cellNodes.push(
              React.createElement('img', {
                key: `cell-${r}-${k}`,
                src: asset.imageSrc,
                alt: asset.imageAlt || '',
                style: {
                  position: 'absolute',
                  ...(scaledPlace || {
                    left: `${fracL * 100}%`,
                    top: `${fracT * 100}%`,
                    width: `${cellW * 100}%`,
                    height: `${cellH * 100}%`
                  }),
                  objectFit: 'contain',
                  display: 'block',
                  boxSizing: 'border-box',
                  zIndex: 2
                }
              })
            );
          }
        } else {
          const cw = 1 / n;
          for (let c = 0; c < revealCount; c++) {
            const fracL2 = c * cw;
            const fracT2 = yOff;
            const cellIconSc2 = parcelCellIconScale(id, elementName, isBiscuitPacket);
            const scaledPlace2 =
              cellIconSc2 > 1 ? scaledPacketCellPlacement(cellIconSc2, fracL2, fracT2, cw, wRow) : null;
            cellNodes.push(
              React.createElement('img', {
                key: `cell-${r}-${c}`,
                src: asset.imageSrc,
                alt: asset.imageAlt || '',
                style: {
                  position: 'absolute',
                  ...(scaledPlace2 || {
                    left: `${fracL2 * 100}%`,
                    top: `${fracT2 * 100}%`,
                    width: `${cw * 100}%`,
                    height: `${wRow * 100}%`
                  }),
                  objectFit: 'contain',
                  display: 'block',
                  boxSizing: 'border-box',
                  zIndex: 2
                }
              })
            );
          }
        }
        yOff += wRow;
      });

      children.push(
        React.createElement(
          'div',
          { key: 'parcel-inner', style: innerWrapStyle },
          cellNodes
        )
      );
    } else if (innerRect && innerRect.length === 4) {
      children.push(
        React.createElement('div', {
          key: 'parcel-inner-empty',
          style: {
            ...absRectToPctStyle(outer, innerRect),
            zIndex: 1,
            pointerEvents: 'none',
            boxSizing: 'border-box',
            backgroundColor: 'transparent'
          }
        })
      );
    }

    const usePage9Or10LeftOver =
      typeof id === 'string' &&
      (id.startsWith('page9-') ||
        id.startsWith('page10-parcel-display-') ||
        id.startsWith('page14-parcel-display-') ||
        id.startsWith('page15-parcel-display-') ||
        id.startsWith('page16-parcel-display-') ||
        id.startsWith('page17-parcel-display-'));
    const usePage11ParcelsLeftOver = typeof id === 'string' && id.startsWith('page11-parcel-display-');
    const usePage12ParcelsLeftOver = typeof id === 'string' && id.startsWith('page12-parcel-display-');
    const usePage13ParcelsLeftOver = typeof id === 'string' && id.startsWith('page13-parcel-display-');
    const usePage8LeftOver = typeof id === 'string' && id.startsWith('page8-');
    const usePage18ParcelsLeftOver =
      typeof id === 'string' && id.startsWith('page18-parcel-display-6');
    const interactionStLeftOver =
      typeof window !== 'undefined'
        ? usePage18ParcelsLeftOver
          ? window.page18InteractionState || 'state-18-def'
          : usePage13ParcelsLeftOver
            ? window.page13InteractionState || 'default'
            : usePage12ParcelsLeftOver
              ? window.page12InteractionState || 'default'
              : usePage11ParcelsLeftOver
                ? window.page11InteractionState || 'default'
                : usePage9Or10LeftOver
                  ? window.page9InteractionState || 'default'
                  : usePage8LeftOver
                    ? window.page8InteractionState || 'default'
                    : window.page5InteractionState || 'default'
        : usePage18ParcelsLeftOver ||
            usePage13ParcelsLeftOver ||
            usePage12ParcelsLeftOver ||
            usePage11ParcelsLeftOver ||
            usePage9Or10LeftOver ||
            usePage8LeftOver
          ? 'default'
          : 'default';
    const hideLeftOverByPage5Prop =
      Array.isArray(hideLeftOverInPage5States) &&
      hideLeftOverInPage5States.length > 0 &&
      hideLeftOverInPage5States.includes(interactionStLeftOver);

    const leftOverRect =
      outer && leftOverLabel && !hideLeftOverByPage5Prop ? resolveLeftOverRect(outer, leftOverLabel) : null;

    if (leftOverLabel && !hideLeftOverByPage5Prop && leftOverRect && leftOverNoteContent) {
      const labelCss = {
        ...absRectToPctStyle(outer, leftOverRect),
        position: 'absolute'
      };
      if (leftOverNoteContent.type === 'milkIcons') {
        const milkAsset = (assets && assets.milk) || DEFAULT_ASSETS.milk;
        const nIcons = Math.min(24, Math.max(0, Math.floor(Number(leftOverNoteContent.count)) || 0));
        const processedLabelFontSize = processGcStyleValue(leftOverLabel.fontSize || '24gc', 'fontSize');
        const processedLabelBorderRadius = processGcStyleValue(leftOverLabel.borderRadius || '8gc', 'borderRadius');
        const processedLabelPadding = processGcStyleValue(
          leftOverLabel.padding != null ? leftOverLabel.padding : '6gc',
          'padding'
        );
        const iconNodes = [];
        for (let i = 0; i < nIcons; i++) {
          iconNodes.push(
            React.createElement('img', {
              key: `parcel-left-over-milk-${i}`,
              src: milkAsset.imageSrc,
              alt: milkAsset.imageAlt || 'Milk',
              style: {
                height: '1.15em',
                width: 'auto',
                objectFit: 'contain',
                flexShrink: 0,
                display: 'block'
              }
            })
          );
        }
        const ta = leftOverLabel.textAlign || 'center';
        const justify =
          ta === 'right' ? 'flex-end' : ta === 'left' ? 'flex-start' : 'center';
        children.push(
          React.createElement(
            'div',
            {
              key: 'parcel-left-over',
              id: leftOverLabel.id || (id ? `${id}-left-over` : 'parcel-left-over'),
              style: {
                ...labelCss,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: justify,
                gap: '6px',
                boxSizing: 'border-box',
                overflow: 'visible',
                lineHeight: 1.2,
                fontSize: processedLabelFontSize || '24px',
                color: leftOverLabel.textColor || '#ffffff',
                backgroundColor: leftOverLabel.backgroundColor || 'transparent',
                border: leftOverLabel.border != null ? leftOverLabel.border : 'none',
                borderRadius: processedLabelBorderRadius || '8px',
                padding: processedLabelPadding != null ? processedLabelPadding : '6px'
              }
            },
            [
              React.createElement(
                'span',
                { key: 'parcel-left-over-prefix', style: { whiteSpace: 'nowrap', lineHeight: 'inherit' } },
                leftOverNoteContent.prefix
              ),
              ...iconNodes
            ]
          )
        );
      } else if (TeacherNoteComponent && leftOverNoteContent.type === 'text') {
        children.push(
          React.createElement(TeacherNoteComponent, {
            key: 'parcel-left-over',
            id: leftOverLabel.id || (id ? `${id}-left-over` : 'parcel-left-over'),
            position: { css: labelCss },
            elementZIndex: 10,
            text: leftOverNoteContent.text,
            textI18nKey: leftOverNoteContent.textI18nKey,
            textI18nFallback: leftOverNoteContent.textI18nFallback,
            fontSize: leftOverLabel.fontSize || '24gc',
            textColor: leftOverLabel.textColor || '#ffffff',
            backgroundColor: leftOverLabel.backgroundColor || 'transparent',
            border: leftOverLabel.border != null ? leftOverLabel.border : 'none',
            borderRadius: leftOverLabel.borderRadius || '8gc',
            padding: leftOverLabel.padding != null ? leftOverLabel.padding : '6gc',
            textAlign: leftOverLabel.textAlign || 'center'
          })
        );
      }
    }

    return React.createElement(
      'div',
      {
        className: 'parcel-display-component',
        'data-element-id': id || '',
        style: rootStyle
      },
      children
    );
  });

  global.ParcelDisplayComponent = { ParcelDisplayComponent };
})(typeof window !== 'undefined' ? window : this);
