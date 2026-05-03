/**
 * Interaction Components - React 18 Optimized
 * 
 * This file contains all interaction-related components:
 * - Character
 * - Dialog Bubble
 * - Next Button
 * - Previous Button
 */

// Dependencies: SharedUtuttilities, GridCellFontUtils should be loaded before this file

/**
 * Character Component with image loading optimization
 */
const CharacterComponent = React.memo((props) => {
  const elementId = React.useId();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  
  const handleImageLoad = React.useCallback(() => {
    startTransition(() => {
      setImageLoaded(true);
    });
  }, []);
  
  return React.createElement('div', {
    id: elementId,
    className: 'character-container',
    style: GridCellFontUtils.processGcStyles(props.style || {}),
    'data-element-type': 'character'
  }, [
    !imageLoaded && React.createElement(window.SharedUtilities?.ElementLoadingFallback || 'div', {
      key: 'loading',
      elementType: 'image'
    }),
    React.createElement('img', {
      key: 'image',
      src: props.src,
      alt: props.alt,
      className: props.className || 'character-image',
      onLoad: handleImageLoad,
      style: {
        opacity: imageLoaded ? 1 : 0
      }
    })
  ]);
});

/**
 * Dialog Bubble Component
 */
const DialogBubbleComponent = React.memo((props) => {
  const elementId = React.useId();
  const deferredText = React.useDeferredValue(props.text);
  const processedOptions = React.useMemo(() => 
    GridCellFontUtils.processGcStyles(props.options || {}), 
    [props.options]
  );
  
  return React.createElement('div', {
    id: elementId,
    className: 'dialog-bubble math-app-dialog-bubble',
    style: processedOptions,
    'data-element-type': 'dialog'
  }, deferredText);
});

/**
 * Shared state for standalone MCQ-style buttons on one page (mirrors QuizPanel option rules).
 */
if (typeof window !== 'undefined' && !window.__standaloneQuizOptionStore) {
  window.__standaloneQuizOptionStore = (function createStandaloneQuizOptionStore() {
    const groups = new Map();
    return {
      _ensure(groupId) {
        if (!groups.has(groupId)) {
          groups.set(groupId, { clickedKeys: new Set(), completed: false, subs: new Set() });
        }
        return groups.get(groupId);
      },
      subscribe(groupId, cb) {
        const g = this._ensure(groupId);
        g.subs.add(cb);
        return () => {
          g.subs.delete(cb);
        };
      },
      _notify(groupId) {
        const g = groups.get(groupId);
        if (g) g.subs.forEach((fn) => fn());
      },
      resetGroup(groupId) {
        const g = groups.get(groupId);
        if (!g) return;
        g.clickedKeys.clear();
        g.completed = false;
        this._notify(groupId);
      },
      tryClick(groupId, optionKey, iscorrect) {
        const g = this._ensure(groupId);
        if (g.clickedKeys.has(optionKey) || g.completed) return false;
        g.clickedKeys.add(optionKey);
        if (iscorrect) g.completed = true;
        this._notify(groupId);
        return true;
      },
      isClicked(groupId, optionKey) {
        const g = groups.get(groupId);
        return !!(g && g.clickedKeys.has(optionKey));
      },
      isCompleted(groupId) {
        const g = groups.get(groupId);
        return !!(g && g.completed);
      }
    };
  })();
}

function runStandaloneQuizOptionClick({
  groupId,
  optionKey,
  iscorrect,
  pageNumber,
  text,
  dispatchQuizCompleted = true
}) {
  const st = window.__standaloneQuizOptionStore;
  if (!st || !optionKey) return false;
  const accepted = st.tryClick(groupId, optionKey, iscorrect);
  if (!accepted) return false;
  if (typeof window !== 'undefined' && window.playAnswerSound) {
    window.playAnswerSound(iscorrect);
  }
  const resolvedPage = pageNumber != null ? pageNumber : (window.getCurrentPage?.() ?? null);
  const quizId = `page${resolvedPage}-standalone-mcq`;
  window.dispatchEvent(new CustomEvent('imageChange', {
    detail: {
      quizId,
      optionKey,
      optionData: { text, iscorrect },
      isCorrect: iscorrect,
      pageNumber: resolvedPage
    }
  }));
  if (iscorrect && dispatchQuizCompleted) {
    window.dispatchEvent(new CustomEvent('quizCompleted', {
      detail: {
        quizId,
        pageNumber: resolvedPage
      }
    }));
  }
  return true;
}

/**
 * Inline pill sharing the same MCQ store as QuizStandaloneOptionButtonComponent (subscribe only; no resetGroup).
 */
const QuizStandaloneOptionPillComponent = React.memo((props) => {
  const {
    groupId = 'standalone-mcq',
    optionKey,
    iscorrect = false,
    pageNumber = null,
    text = '',
    optionButtonTextColor = '#000000',
    defaultBackgroundColor = '#FFAB40',
    borderRadius = '11gc',
    fontSize = '24gc',
    dispatchQuizCompleted = true
  } = props;

  const [, setTick] = React.useState(0);
  const bump = React.useCallback(() => setTick((t) => t + 1), []);

  const getColorVariable = React.useCallback((varName) => {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      const v = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return v || null;
    }
    return null;
  }, []);

  React.useEffect(() => {
    const store = window.__standaloneQuizOptionStore;
    if (!store || !groupId) return undefined;
    const unsub = store.subscribe(groupId, bump);
    bump();
    return () => unsub();
  }, [groupId, bump]);

  const store = typeof window !== 'undefined' ? window.__standaloneQuizOptionStore : null;
  const gold = getColorVariable('--color-gold') || defaultBackgroundColor || '#FFAB40';
  const greenColor = getColorVariable('--color-green') || '#4CAF50';
  const salmonColor = getColorVariable('--color-salmon') || '#FA8072';

  const clicked = store && optionKey ? store.isClicked(groupId, optionKey) : false;
  const completed = store ? store.isCompleted(groupId) : false;
  const lockedUnclicked = completed && !clicked;
  // Pills: only hard-disable pointer/keyboard after THIS option was used (salmon/green).
  // If quiz finished via Duration first, panel may appear with lockedUnclicked — still allow
  // clicks (tryClick no-ops) so UI is not stuck with pointer-events: none.
  const blockPillPointer = clicked;

  let buttonBackgroundColor = gold;
  let buttonCursor = 'pointer';
  let buttonOpacity = 1;

  if (clicked) {
    buttonBackgroundColor = iscorrect ? greenColor : salmonColor;
    buttonCursor = 'not-allowed';
  } else if (lockedUnclicked) {
    buttonBackgroundColor = gold;
    buttonCursor = 'pointer';
    buttonOpacity = 1;
  }

  let processedBorderRadius = borderRadius;
  if (typeof window.GridCellFontUtils !== 'undefined' && window.GridCellFontUtils.convertGcToPx) {
    processedBorderRadius = window.GridCellFontUtils.convertGcToPx(borderRadius);
  }
  let processedFontSize = fontSize;
  if (typeof window.GridCellFontUtils !== 'undefined' && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  const frameGapPx = '3px';
  const buttonWrapperStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBackgroundColor,
    borderRadius: processedBorderRadius,
    cursor: buttonCursor,
    opacity: buttonOpacity,
    boxSizing: 'border-box',
    padding: '9px 17px',
    flexShrink: 0
  };

  const buttonFrameStyle = {
    position: 'absolute',
    top: frameGapPx,
    left: frameGapPx,
    right: frameGapPx,
    bottom: frameGapPx,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 1,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%)',
    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)'
  };

  const buttonContentStyle = {
    position: 'relative',
    zIndex: 2,
    color: optionButtonTextColor,
    fontSize: processedFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  };

  const handleClick = React.useCallback(() => {
    runStandaloneQuizOptionClick({
      groupId,
      optionKey,
      iscorrect,
      pageNumber,
      text,
      dispatchQuizCompleted
    });
  }, [groupId, optionKey, iscorrect, pageNumber, text, dispatchQuizCompleted]);

  return React.createElement('div', {
    className: 'quiz-standalone-option-pill',
    role: 'button',
    tabIndex: blockPillPointer ? -1 : 0,
    'aria-disabled': blockPillPointer ? true : undefined,
    style: {
      display: 'inline-flex',
      position: 'relative',
      zIndex: 2,
      cursor: clicked ? 'not-allowed' : 'pointer',
      pointerEvents: blockPillPointer ? 'none' : 'auto'
    },
    onClick: handleClick,
    onKeyDown: (e) => {
      if (blockPillPointer) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    }
  }, React.createElement('div', { style: buttonWrapperStyle }, [
    React.createElement('div', { key: 'frame', style: buttonFrameStyle }),
    React.createElement('div', { key: 'content', style: buttonContentStyle }, text)
  ]));
});

/**
 * Dashed panel with label + quiz-linked pills (same store as standalone MCQ buttons).
 */
const ChooseOptionPanelWithQuizPillsComponent = React.memo((props) => {
  const {
    id,
    elementName,
    position,
    processedStyles,
    elementZIndex,
    backgroundColor = 'rgba(0, 0, 0, 0.65)',
    border = '3gc dashed #ffffff',
    borderRadius = '15gc',
    padding = '8gc',
    textColor = '#ffffff',
    fontSize = '27gc',
    labelText = 'Choose the correct option:',
    groupId = 'page2-mcq',
    pageNumber = 2,
    pills = [],
    pillBorderRadius = '11gc',
    pillFontSize = '22gc',
    optionButtonTextColor = '#000000',
    defaultBackgroundColor = '#FFAB40',
    initialVisible = true,
    showOnEvent = null,
    showOnEventFilter = null,
    /** When false, correct pill clicks do not dispatch quizCompleted (avoids enabling Next / page completion for auxiliary panel quizzes). */
    pillDispatchQuizCompleted = true,
    /** After the correct answer, hide the whole panel after this delay (ms). 0 = immediate. */
    hidePillsAfterCorrectDelayMs = 450,
    /** If set, dispatched when the group completes (correct answer), after the hide delay — detail: { pageNumber }. */
    revealOnCorrectEvent = null,
    /** When true, dispatch quizCompleted (page{N}-standalone-mcq) after the same hide delay as revealOnCorrectEvent. */
    dispatchQuizCompletedAfterCorrectHide = false
  } = props;

  const [isVisible, setIsVisible] = React.useState(initialVisible);
  const [panelHiddenAfterCorrect, setPanelHiddenAfterCorrect] = React.useState(false);
  const hideScheduledRef = React.useRef(false);

  React.useEffect(() => {
    setIsVisible(initialVisible);
  }, [initialVisible]);

  React.useEffect(() => {
    if (!showOnEvent) return undefined;
    const handler = (event) => {
      if (showOnEventFilter) {
        const matches = Object.entries(showOnEventFilter).every(
          ([key, value]) => event.detail?.[key] === value
        );
        if (!matches) return;
      }
      setIsVisible(true);
    };
    window.addEventListener(showOnEvent, handler);
    return () => window.removeEventListener(showOnEvent, handler);
  }, [showOnEvent, showOnEventFilter]);

  React.useEffect(() => {
    const store = window.__standaloneQuizOptionStore;
    if (!store || !groupId) return undefined;
    setPanelHiddenAfterCorrect(false);
    hideScheduledRef.current = false;
    store.resetGroup(groupId);
    let hideTimer;
    const unsub = store.subscribe(groupId, () => {
      if (!store.isCompleted(groupId) || hideScheduledRef.current) return;
      hideScheduledRef.current = true;
      const delay = hidePillsAfterCorrectDelayMs;
      const runHide = () => {
        setPanelHiddenAfterCorrect(true);
        if (typeof window !== 'undefined') {
          if (revealOnCorrectEvent) {
            window.dispatchEvent(
              new CustomEvent(revealOnCorrectEvent, {
                detail: { pageNumber }
              })
            );
          }
          if (dispatchQuizCompletedAfterCorrectHide && pageNumber != null) {
            const quizId = `page${pageNumber}-standalone-mcq`;
            window.dispatchEvent(
              new CustomEvent('quizCompleted', {
                detail: { quizId, pageNumber }
              })
            );
          }
        }
      };
      if (delay <= 0) {
        runHide();
      } else {
        hideTimer = window.setTimeout(runHide, delay);
      }
    });
    return () => {
      unsub();
      if (hideTimer) window.clearTimeout(hideTimer);
      store.resetGroup(groupId);
      hideScheduledRef.current = false;
    };
  }, [
    groupId,
    hidePillsAfterCorrectDelayMs,
    revealOnCorrectEvent,
    pageNumber,
    dispatchQuizCompletedAfterCorrectHide
  ]);

  let processedBorder = border;
  if (border && border.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');
      if (width.includes('gc')) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedLabelFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedLabelFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  const outerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex != null ? elementZIndex : 90,
    backgroundColor,
    border: processedBorder,
    borderRadius: processedBorderRadius,
    padding: processedPadding,
    color: textColor,
    fontSize: processedLabelFontSize,
    display: isVisible && !panelHiddenAfterCorrect ? 'flex' : 'none',
    pointerEvents: isVisible && !panelHiddenAfterCorrect ? 'auto' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    boxSizing: 'border-box',
    position: 'absolute',
    flexWrap: 'wrap',
    gap: '12px'
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    lineHeight: 1.4
  };

  return React.createElement(
    'div',
    {
      id: id || undefined,
      className: 'choose-option-panel-quiz-pills',
      style: outerStyle,
      'data-element-name': elementName
    },
    React.createElement('div', { style: rowStyle }, [
      React.createElement('span', { key: 'label' }, labelText),
      ...pills.map((p, idx) =>
        React.createElement(QuizStandaloneOptionPillComponent, {
          key: p.optionKey || idx,
          groupId,
          pageNumber,
          optionKey: p.optionKey,
          iscorrect: !!p.iscorrect,
          text: p.text,
          borderRadius: pillBorderRadius,
          fontSize: pillFontSize,
          optionButtonTextColor,
          defaultBackgroundColor,
          dispatchQuizCompleted: pillDispatchQuizCompleted
        })
      )
    ])
  );
});

/**
 * Single MCQ option styled and behaved like QuizPanel option buttons (gold → green/salmon, sounds, quizCompleted).
 *
 * Props: groupId, optionKey (unique within group), iscorrect, pageNumber, text, fontSize, borderRadius,
 * optionButtonTextColor, defaultBackgroundColor, position, processedStyles, elementZIndex, id, elementName,
 * shiftUpOnQuizCompletedGc — optional number of gc units to translate up when quizCompleted fires for this pageNumber.
 * shiftUpOnCustomEvent — optional custom event name that also triggers the shift-up (e.g. "page2ChoosePanelOnePmCorrect").
 * shiftUpOnCustomEventFilter — optional object filter for shiftUpOnCustomEvent (e.g. { pageNumber: 2 }).
 * dispatchQuizCompleted — when false, correct clicks do not dispatch quizCompleted (default true).
 */
const QuizStandaloneOptionButtonComponent = React.memo((props) => {
  const {
    id,
    elementName,
    position,
    processedStyles,
    elementZIndex,
    text = '',
    iscorrect = false,
    pageNumber = null,
    groupId = 'standalone-mcq',
    optionKey,
    fontSize = '24gc',
    optionButtonTextColor = '#ffffff',
    borderRadius = '50gc',
    defaultBackgroundColor,
    shiftUpOnQuizCompletedGc = null,
    shiftUpOnCustomEvent = null,
    shiftUpOnCustomEventFilter = null,
    dispatchQuizCompleted = true
  } = props;

  const [, setTick] = React.useState(0);
  const [shiftUpApplied, setShiftUpApplied] = React.useState(false);
  const bump = React.useCallback(() => setTick((t) => t + 1), []);

  const getColorVariable = React.useCallback((varName) => {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      const v = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return v || null;
    }
    return null;
  }, []);

  React.useEffect(() => {
    const store = window.__standaloneQuizOptionStore;
    if (!store || !groupId) return undefined;
    const unsub = store.subscribe(groupId, bump);
    store.resetGroup(groupId);
    return () => {
      unsub();
      store.resetGroup(groupId);
    };
  }, [groupId, bump]);

  React.useEffect(() => {
    if (shiftUpOnQuizCompletedGc == null || pageNumber == null) return undefined;
    const expectedQuizId = `page${pageNumber}-standalone-mcq`;
    const handler = (event) => {
      if (event.detail?.pageNumber !== pageNumber) return;
      if (event.detail?.quizId != null && event.detail.quizId !== expectedQuizId) return;
      setShiftUpApplied(true);
    };
    window.addEventListener('quizCompleted', handler);
    return () => window.removeEventListener('quizCompleted', handler);
  }, [shiftUpOnQuizCompletedGc, pageNumber]);

  React.useEffect(() => {
    if (!shiftUpOnCustomEvent || shiftUpOnQuizCompletedGc == null) return undefined;
    const handler = (event) => {
      if (shiftUpOnCustomEventFilter) {
        const matches = Object.entries(shiftUpOnCustomEventFilter).every(
          ([key, value]) => event.detail?.[key] === value
        );
        if (!matches) return;
      }
      setShiftUpApplied(true);
    };
    window.addEventListener(shiftUpOnCustomEvent, handler);
    return () => window.removeEventListener(shiftUpOnCustomEvent, handler);
  }, [shiftUpOnCustomEvent, shiftUpOnCustomEventFilter, shiftUpOnQuizCompletedGc]);

  const shiftUpTranslate = React.useMemo(() => {
    if (!shiftUpApplied || shiftUpOnQuizCompletedGc == null) return null;
    if (typeof window.GridCellFontUtils === 'undefined' || !window.GridCellFontUtils.convertGcToPixels) {
      return null;
    }
    const raw = window.GridCellFontUtils.convertGcToPixels(
      `${shiftUpOnQuizCompletedGc}gc`,
      'height',
    );
    if (typeof raw !== 'string' || !raw.endsWith('px')) return null;
    return `translateY(-${raw})`;
  }, [shiftUpApplied, shiftUpOnQuizCompletedGc]);

  const store = typeof window !== 'undefined' ? window.__standaloneQuizOptionStore : null;
  const gold = getColorVariable('--color-gold') || defaultBackgroundColor || '#FFAB40';
  const greenColor = getColorVariable('--color-green') || '#4CAF50';
  const salmonColor = getColorVariable('--color-salmon') || '#FA8072';

  const clicked = store && optionKey ? store.isClicked(groupId, optionKey) : false;
  const completed = store ? store.isCompleted(groupId) : false;
  const lockedUnclicked = completed && !clicked;

  let buttonBackgroundColor = gold;
  let buttonCursor = 'pointer';
  let buttonOpacity = 1;

  if (clicked) {
    if (iscorrect) {
      buttonBackgroundColor = greenColor;
    } else if (completed) {
      // Correct option was chosen after wrong tries — revert wrong picks to default gold
      buttonBackgroundColor = gold;
    } else {
      buttonBackgroundColor = salmonColor;
    }
    buttonCursor = 'not-allowed';
  } else if (lockedUnclicked) {
    // Correct answer chosen: other options stay default gold, full opacity, non-interactive
    buttonBackgroundColor = gold;
    buttonCursor = 'not-allowed';
    buttonOpacity = 1;
  }

  let processedBorderRadius = borderRadius;
  if (typeof window.GridCellFontUtils !== 'undefined' && window.GridCellFontUtils.convertGcToPx) {
    processedBorderRadius = window.GridCellFontUtils.convertGcToPx(borderRadius);
  }
  let processedFontSize = fontSize;
  if (typeof window.GridCellFontUtils !== 'undefined' && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  const frameGapPx = '5px';
  const buttonWrapperStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: buttonBackgroundColor,
    borderRadius: processedBorderRadius,
    cursor: buttonCursor,
    opacity: buttonOpacity,
    boxSizing: 'border-box'
  };

  const buttonFrameStyle = {
    position: 'absolute',
    top: frameGapPx,
    left: frameGapPx,
    right: frameGapPx,
    bottom: frameGapPx,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 1,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%)',
    boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.3), inset 0 -1px 3px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const buttonContentStyle = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: optionButtonTextColor,
    fontSize: processedFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    padding: '8%',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const handleClick = React.useCallback(() => {
    runStandaloneQuizOptionClick({
      groupId,
      optionKey,
      iscorrect,
      pageNumber,
      text,
      dispatchQuizCompleted
    });
  }, [groupId, optionKey, iscorrect, pageNumber, text, dispatchQuizCompleted]);

  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 402,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    position: 'absolute',
    ...(shiftUpTranslate ? { transform: shiftUpTranslate } : {}),
    ...(completed ? { pointerEvents: 'none' } : {})
  };

  return React.createElement('div', {
    id: id || undefined,
    className: 'quiz-standalone-option-button',
    style: containerStyle,
    'data-element-name': elementName,
    onClick: handleClick,
    role: 'button',
    tabIndex: completed ? -1 : 0,
    'aria-disabled': completed ? true : undefined,
    onKeyDown: (e) => {
      if (completed) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    }
  }, React.createElement('div', { style: buttonWrapperStyle }, [
    React.createElement('div', { key: 'frame', style: buttonFrameStyle }),
    React.createElement('div', { key: 'content', style: buttonContentStyle }, text)
  ]));
});

/**
 * Text block hidden until a window event fires (e.g. quizCompleted when the correct option is chosen).
 */
const RevealOnEventTextComponent = React.memo((props) => {
  const {
    id,
    elementName,
    position,
    processedStyles,
    elementZIndex,
    text: textProp = '',
    color = '#000000',
    fontSize = '36gc',
    fontWeight = 'normal',
    textAlign = 'center',
    backgroundColor = 'transparent',
    initialVisible = false,
    showOnEvent = 'quizCompleted',
    showOnEventFilter = null
  } = props;

  const [isVisible, setIsVisible] = React.useState(initialVisible);

  React.useEffect(() => {
    setIsVisible(initialVisible);
  }, [initialVisible]);

  React.useEffect(() => {
    if (!showOnEvent) return undefined;
    const handler = (event) => {
      if (showOnEventFilter) {
        const matches = Object.entries(showOnEventFilter).every(
          ([key, value]) => event.detail?.[key] === value
        );
        if (!matches) return;
      }
      setIsVisible(true);
    };
    window.addEventListener(showOnEvent, handler);
    return () => window.removeEventListener(showOnEvent, handler);
  }, [showOnEvent, showOnEventFilter]);

  let processedFontSize = fontSize;
  if (typeof window.GridCellFontUtils !== 'undefined' && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  const innerStyle = {
    color,
    fontSize: processedFontSize,
    fontWeight,
    textAlign,
    backgroundColor,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  };

  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 402,
    boxSizing: 'border-box',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: isVisible ? 'flex' : 'none'
  };

  return React.createElement('div', {
    id: id || undefined,
    className: 'reveal-on-event-text',
    style: containerStyle,
    'data-element-name': elementName
  }, React.createElement('div', { style: innerStyle }, textProp));
});

/**
 * Tap GIF Component - Shows/hides based on props and events
 * 
 * Props:
 * - initialVisible (boolean, default: true) - Initial visibility state
 * - showOnEvent (string, optional) - Event name to listen for to show the component (e.g., 'quizCompleted')
 * - showOnEventFilter (object, optional) - Filter criteria for the event (e.g., { pageNumber: 7 })
 */
const TapGifComponent = React.memo((props) => {
  const generatedId = React.useId();
  
  const {
    id, // Use id from props if provided
    position,
    processedStyles,
    elementZIndex,
    imageSrc = 'assets/tap.gif',
    imageAlt = 'Tap',
    // NEW: Simplified state management props
    initialVisible = true, // Initial visibility state (default: visible)
    showOnEvent = null, // Event name to listen for to show the component
    showOnEventFilter = null, // Filter criteria for the event (e.g., { pageNumber: 7 })
    opacity = 1.0, // Opacity for the tap animation (0.0 to 1.0)
    ...otherProps
  } = props;
  
  // Use provided id or fallback to generated id
  const elementId = id || generatedId;
  
  // Extract page number from component ID or props
  // Try to get page number from showOnEventFilter first (most reliable)
  // Otherwise try to extract from element ID
  const getPageNumber = React.useMemo(() => {
    // First, try to get from showOnEventFilter if it has pageNumber
    if (showOnEventFilter?.pageNumber) {
      return showOnEventFilter.pageNumber;
    }
    // Otherwise, try to extract from element ID
    const componentId = id || elementId;
    const pageMatch = componentId?.toString().match(/page(\d+)/);
    return pageMatch ? parseInt(pageMatch[1], 10) : null;
  }, [showOnEventFilter, id, elementId]);
  
  // State for visibility - starts with initialVisible value
  const [isVisible, setIsVisible] = React.useState(initialVisible);
  
  // Reset to initialVisible on mount and when initialVisible changes
  // But check if quiz is already completed first
  React.useEffect(() => {
    const pageNumber = getPageNumber;
    
    // Check if quiz is already completed for this page
    if (pageNumber) {
      // Check PageCompletionManager and quiz component state stores
      let isQuizCompleted = false;
      
      // Check PageCompletionManager
      if (window.PageCompletionManager && window.pageCompletionState) {
        const completionKey = `page${pageNumber}Completed`;
        if (window.pageCompletionState[completionKey] === true) {
          // Verify there's actual quiz state indicating completion
          if (window.quizPanelStateStore) {
            Object.keys(window.quizPanelStateStore).forEach(key => {
              if (key.includes(`page${pageNumber}`)) {
                const state = window.quizPanelStateStore[key];
                if (state.clickedOptions && state.clickedOptions.length > 0) {
                  const totalCorrect = state.options?.filter(opt => opt.iscorrect).length || 0;
                  const clickedCorrect = Array.from(state.clickedOptions || []).filter(optIndex => {
                    return state.options?.[optIndex]?.iscorrect;
                  }).length;
                  if (clickedCorrect === totalCorrect && totalCorrect > 0) {
                    isQuizCompleted = true;
                  }
                }
              }
            });
          }
          
          if (window.fillBlanksStateStore) {
            const fillBlanksKey = `page${pageNumber}-fill-blanks`;
            const fillBlanksState = window.fillBlanksStateStore[fillBlanksKey];
            if (fillBlanksState && fillBlanksState.filledBlanks && Object.keys(fillBlanksState.filledBlanks).length > 0) {
              isQuizCompleted = true;
            }
          }
          
          if (isQuizCompleted) {
            console.log(`✅ [TapGif] Quiz already completed for page ${pageNumber}, showing tap animation`);
            setIsVisible(true);
            return;
          }
        }
      }
    }
    
    console.log(`🔍 [TapGif] Resetting to initialVisible: ${initialVisible} (page: ${pageNumber})`);
    setIsVisible(initialVisible);
  }, [initialVisible, getPageNumber]);
  
  // Listen for showOnEvent to show the component
  React.useEffect(() => {
    if (!showOnEvent) return;
    
    const handleEvent = (event) => {
      // Check filter criteria if provided
      if (showOnEventFilter) {
        const matches = Object.entries(showOnEventFilter).every(
          ([key, value]) => event.detail?.[key] === value
        );
        if (!matches) {
          console.log(`🔍 [TapGif] Event ${showOnEvent} received but filter didn't match:`, {
            filter: showOnEventFilter,
            eventDetail: event.detail
          });
          return;
        }
      }
      console.log(`🔍 [TapGif] Showing component due to ${showOnEvent} event`, event.detail);
      setIsVisible(true);
    };
    
    window.addEventListener(showOnEvent, handleEvent);
    console.log(`🔍 [TapGif] Listening for ${showOnEvent} event with filter:`, showOnEventFilter);
    
    return () => {
      window.removeEventListener(showOnEvent, handleEvent);
    };
  }, [showOnEvent, showOnEventFilter]);
  
  // Listen for quizCompleted events to show tap animation when quiz is completed
  // (Tap animation is hidden on quiz pages initially, then shown when quiz is completed)
  React.useEffect(() => {
    if (getPageNumber === null) return;
    
    const handleQuizCompleted = (event) => {
      const eventPageNumber = event.detail?.pageNumber;
      if (eventPageNumber === getPageNumber) {
        console.log(`🔍 [TapGif] Quiz completed for page ${getPageNumber}, showing tap animation`);
        setIsVisible(true);
      }
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);
    
    return () => {
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, [getPageNumber]);
  
  // Reset to initialVisible when page changes (to handle navigation between pages)
  // But check if quiz is already completed first
  React.useEffect(() => {
    if (getPageNumber === null) return;
    
    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      const pageNumber = getPageNumber;
      console.log(`🔍 [TapGif] Page change event: newPage=${newPage}, componentPage=${pageNumber}`);
      if (newPage === pageNumber) {
        // Check if quiz is already completed for this page
        let isQuizCompleted = false;
        
        if (window.PageCompletionManager && window.pageCompletionState) {
          const completionKey = `page${pageNumber}Completed`;
          if (window.pageCompletionState[completionKey] === true) {
            // Verify there's actual quiz state indicating completion
            if (window.quizPanelStateStore) {
              Object.keys(window.quizPanelStateStore).forEach(key => {
                if (key.includes(`page${pageNumber}`)) {
                  const state = window.quizPanelStateStore[key];
                  if (state.clickedOptions && state.clickedOptions.length > 0) {
                    const totalCorrect = state.options?.filter(opt => opt.iscorrect).length || 0;
                    const clickedCorrect = Array.from(state.clickedOptions || []).filter(optIndex => {
                      return state.options?.[optIndex]?.iscorrect;
                    }).length;
                    if (clickedCorrect === totalCorrect && totalCorrect > 0) {
                      isQuizCompleted = true;
                    }
                  }
                }
              });
            }
            
            if (window.fillBlanksStateStore) {
              const fillBlanksKey = `page${pageNumber}-fill-blanks`;
              const fillBlanksState = window.fillBlanksStateStore[fillBlanksKey];
              if (fillBlanksState && fillBlanksState.filledBlanks && Object.keys(fillBlanksState.filledBlanks).length > 0) {
                isQuizCompleted = true;
              }
            }
            
            if (isQuizCompleted) {
              console.log(`✅ [TapGif] Quiz already completed for page ${pageNumber}, hiding tap animation`);
              setIsVisible(false);
              return;
            }
          }
        }
        
        // Page changed to this component's page - reset to initial state
        console.log(`🔍 [TapGif] Page changed to ${pageNumber}, resetting to initialVisible: ${initialVisible}`);
        setIsVisible(initialVisible);
      }
    };
    
    // Also check current page on mount
    const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
    const pageNumber = getPageNumber;
    if (currentPage === pageNumber) {
      // Check if quiz is already completed
      let isQuizCompleted = false;
      
      if (window.PageCompletionManager && window.pageCompletionState) {
        const completionKey = `page${pageNumber}Completed`;
        if (window.pageCompletionState[completionKey] === true) {
          // Verify there's actual quiz state indicating completion
          if (window.quizPanelStateStore) {
            Object.keys(window.quizPanelStateStore).forEach(key => {
              if (key.includes(`page${pageNumber}`)) {
                const state = window.quizPanelStateStore[key];
                if (state.clickedOptions && state.clickedOptions.length > 0) {
                  const totalCorrect = state.options?.filter(opt => opt.iscorrect).length || 0;
                  const clickedCorrect = Array.from(state.clickedOptions || []).filter(optIndex => {
                    return state.options?.[optIndex]?.iscorrect;
                  }).length;
                  if (clickedCorrect === totalCorrect && totalCorrect > 0) {
                    isQuizCompleted = true;
                  }
                }
              }
            });
          }
          
          if (window.fillBlanksStateStore) {
            const fillBlanksKey = `page${pageNumber}-fill-blanks`;
            const fillBlanksState = window.fillBlanksStateStore[fillBlanksKey];
            if (fillBlanksState && fillBlanksState.filledBlanks && Object.keys(fillBlanksState.filledBlanks).length > 0) {
              isQuizCompleted = true;
            }
          }
          
          if (isQuizCompleted) {
            console.log(`✅ [TapGif] Quiz already completed for page ${pageNumber}, showing tap animation`);
            setIsVisible(true);
            return;
          }
        }
      }
      
      console.log(`🔍 [TapGif] On mount, current page is ${pageNumber}, resetting to initialVisible: ${initialVisible}`);
      setIsVisible(initialVisible);
    }
    
    window.addEventListener('pageChanged', handlePageChange);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
    };
  }, [initialVisible, getPageNumber]);
  
  // Determine visibility based on state
  const shouldHide = !isVisible;
  
  console.log('🔍 [TapGif] Visibility state:', {
    initialVisible,
    isVisible,
    showOnEvent,
    shouldHide
  });
  
  const containerStyle = {
    ...(position?.css || {}),
    ...processedStyles,
    display: shouldHide ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: elementZIndex || 402,
    position: 'absolute'
  };
  
  const processedOpacity = typeof opacity === 'number' ? opacity : parseFloat(opacity) || 1.0;
  
  return React.createElement('div', {
    id: elementId,
    className: 'tap-gif-container',
    style: containerStyle,
    'data-element-type': 'tap-gif'
  }, React.createElement('img', {
    src: imageSrc,
    alt: imageAlt,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      pointerEvents: 'none',
      opacity: processedOpacity
    }
  }));
});

/**
 * Next Button Component - Three Layer Structure
 * 
 * Props:
 * - initialEnabled (boolean, default: true) - Initial enabled state
 * - enableOnEvent (string, optional) - Event name to listen for to enable the button (e.g., 'quizCompleted')
 * - enableOnEventFilter (object, optional) - Filter criteria for the event (e.g., { pageNumber: 7 })
 * - disabled (boolean) - Explicit disabled state (overrides initialEnabled)
 */
const NextButtonComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  
  // Default values for next button
  const {
    className = 'applet-button',
    frameClassName = 'applet-button-frame',
    contentClassName = 'applet-button-content',
    frameGap = '6.25gc',
    text = '»',
    backgroundColor = '#FF9900',
    color = 'white',
    fontSize = '50gc',
    fontWeight = 'bold',
    borderRadius = '15gc',
    cursor = 'pointer',
    textAlign = 'center',
    display = 'flex',
    alignItems = 'center',
    justifyContent = 'center',
    disabled = false,
    // NEW: Simplified state management props
    initialEnabled = true, // Initial enabled state (default: enabled)
    enableOnEvent = null, // Event name to listen for to enable the button
    enableOnEventFilter = null, // Filter criteria for the event (e.g., { pageNumber: 7 })
    opacity = '1',
    pulsate = false,
    ...otherProps
  } = props;

  // Extract page number from component ID or props
  // Try to get page number from enableOnEventFilter first (most reliable)
  // Otherwise try to extract from element ID
  const getPageNumber = React.useMemo(() => {
    // First, try to get from enableOnEventFilter if it has pageNumber
    if (enableOnEventFilter?.pageNumber) {
      return enableOnEventFilter.pageNumber;
    }
    // Otherwise, try to extract from element ID
    // The element renderer should pass id through props, but we can also check otherProps
    const componentId = props.id || otherProps.id || elementId;
    const pageMatch = componentId?.toString().match(/page(\d+)/);
    return pageMatch ? parseInt(pageMatch[1], 10) : null;
  }, [enableOnEventFilter, props.id, otherProps.id, elementId]);

  // State for enabled/disabled - starts with initialEnabled value
  const [isEnabled, setIsEnabled] = React.useState(initialEnabled);
  
  // Listen for enableOnEvent to enable the button
  React.useEffect(() => {
    if (!enableOnEvent) return;
    
    const handleEvent = (event) => {
      // Check filter criteria if provided
      if (enableOnEventFilter) {
        const matches = Object.entries(enableOnEventFilter).every(
          ([key, value]) => event.detail?.[key] === value
        );
        if (!matches) {
          console.log(`🔍 [NextButton] Event ${enableOnEvent} received but filter didn't match:`, {
            filter: enableOnEventFilter,
            eventDetail: event.detail
          });
          return;
        }
      }
      console.log(`🔍 [NextButton] Enabling button due to ${enableOnEvent} event`, event.detail);
      setIsEnabled(true);
    };
    
    // Check if event was already dispatched (for cases where component mounts after event)
    // But only if there's actual quiz state indicating completion
    if (enableOnEvent === 'quizCompleted' && getPageNumber) {
      // Check PageCompletionManager AND verify there's actual quiz completion state
      if (window.PageCompletionManager && window.pageCompletionState) {
        const completionKey = `page${getPageNumber}Completed`;
        const isMarkedCompleted = window.pageCompletionState[completionKey] === true;
        
        if (isMarkedCompleted) {
          // Verify there's actual quiz state indicating completion
          let hasActualCompletion = false;
          
          // Check quiz component state stores
          if (window.quizPanelStateStore) {
            Object.keys(window.quizPanelStateStore).forEach(key => {
              if (key.includes(`page${getPageNumber}`)) {
                const state = window.quizPanelStateStore[key];
                if (state.clickedOptions && state.clickedOptions.length > 0) {
                  const totalCorrect = state.options?.filter(opt => opt.iscorrect).length || 0;
                  const clickedCorrect = Array.from(state.clickedOptions || []).filter(optIndex => {
                    return state.options?.[optIndex]?.iscorrect;
                  }).length;
                  if (clickedCorrect === totalCorrect && totalCorrect > 0) {
                    hasActualCompletion = true;
                  }
                }
              }
            });
          }
          
          if (window.fillBlanksStateStore) {
            const fillBlanksKey = `page${getPageNumber}-fill-blanks`;
            const fillBlanksState = window.fillBlanksStateStore[fillBlanksKey];
            if (fillBlanksState && fillBlanksState.filledBlanks && Object.keys(fillBlanksState.filledBlanks).length > 0) {
              hasActualCompletion = true;
            }
          }
          
          if (hasActualCompletion) {
            console.log(`✅ [NextButton] Page ${getPageNumber} already marked as completed with actual quiz state, enabling button`);
            setIsEnabled(true);
          } else {
            // Marked as completed but no actual state - reset to false
            window.PageCompletionManager.setPageCompleted(getPageNumber, false);
            console.log(`🔄 [NextButton] Reset page ${getPageNumber} completion state (no actual quiz state found)`);
          }
        }
      }
    }
    
    window.addEventListener(enableOnEvent, handleEvent);
    console.log(`🔍 [NextButton] Listening for ${enableOnEvent} event with filter:`, enableOnEventFilter);
    
    return () => {
      window.removeEventListener(enableOnEvent, handleEvent);
    };
  }, [enableOnEvent, enableOnEventFilter, getPageNumber]);
  
  // Reset to initialEnabled when component re-mounts or when page changes
  // Always reset to initialEnabled - don't check PageCompletionManager here
  // PageCompletionManager defaults to true, but we want to respect initialEnabled for quiz pages
  React.useEffect(() => {
    const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
    const pageNumber = getPageNumber;
    
    // If this is a quiz page (initialEnabled is false), initialize PageCompletionManager to false
    // This prevents the default true value from causing the button to be enabled immediately
    // The quiz components will check their state and dispatch quizCompleted event if actually completed
    if (enableOnEvent === 'quizCompleted' && pageNumber && initialEnabled === false) {
      if (window.PageCompletionManager) {
        // Always initialize quiz pages to false on mount
        // Quiz components will check their state and dispatch quizCompleted event if they're actually completed
        window.PageCompletionManager.setPageCompleted(pageNumber, false);
        console.log(`🔄 [NextButton] Initialized page ${pageNumber} completion state to false (quiz page, will be set to true by quiz component if completed)`);
      }
    }
    
    console.log(`🔍 [NextButton] Resetting to initialEnabled: ${initialEnabled} (currentPage: ${currentPage}, buttonPage: ${pageNumber})`);
    setIsEnabled(initialEnabled);
  }, [initialEnabled, getPageNumber, enableOnEvent]);
  
  // Check if quiz was already completed on page load
  React.useEffect(() => {
    if (getPageNumber === null || !enableOnEvent || enableOnEvent !== 'quizCompleted') return;
    
    // Function to check if quiz is already completed
    const checkQuizCompletion = () => {
      const pageNumber = getPageNumber;
      
      // Check various quiz component state stores
      let isCompleted = false;
      
      // Check QuizPanelComponent state
      if (window.quizPanelStateStore) {
        Object.keys(window.quizPanelStateStore).forEach(key => {
          if (key.includes(`page${pageNumber}`)) {
            const state = window.quizPanelStateStore[key];
            if (state.clickedOptions && state.clickedOptions.length > 0) {
              // This is a simplified check - actual completion depends on all correct answers being clicked
              // We'll rely on the component dispatching quizCompleted event if truly completed
            }
          }
        });
      }
      
      // Check FillBlanksComponent state
      if (window.fillBlanksStateStore) {
        const fillBlanksKey = `page${pageNumber}-fill-blanks`;
        const fillBlanksState = window.fillBlanksStateStore[fillBlanksKey];
        if (fillBlanksState && fillBlanksState.filledBlanks) {
          // Check if all fillable blanks are filled
          // This requires knowing which blanks should be filled, which is complex
          // So we'll rely on the component dispatching quizCompleted event
        }
      }
      
      // Check ArrangeStepsComponent state
      if (window.arrangeStepsStateStore) {
        Object.keys(window.arrangeStepsStateStore).forEach(key => {
          if (key.includes(`page${pageNumber}`)) {
            const state = window.arrangeStepsStateStore[key];
            if (state.isComplete === true) {
              isCompleted = true;
              console.log(`✅ [NextButton] Quiz already completed (ArrangeSteps) for page ${pageNumber}`);
            }
          }
        });
      }
      
      // Check PageCompletionManager
      if (window.PageCompletionManager && pageNumber) {
        const completionKey = `page${pageNumber}Completed`;
        if (window.pageCompletionState && window.pageCompletionState[completionKey] === true) {
          isCompleted = true;
          console.log(`✅ [NextButton] Page ${pageNumber} marked as completed in PageCompletionManager`);
        }
      }
      
      if (isCompleted) {
        console.log(`✅ [NextButton] Quiz already completed for page ${pageNumber}, enabling button`);
        setIsEnabled(true);
      }
    };
    
    // Check after a short delay to allow components to restore state
    const timeoutId = setTimeout(checkQuizCompletion, 200);
    
    return () => clearTimeout(timeoutId);
  }, [getPageNumber, enableOnEvent]);
  
  // Reset to initialEnabled when page changes (to handle navigation between pages)
  React.useEffect(() => {
    if (getPageNumber === null) return;
    
    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      console.log(`🔍 [NextButton] Page change event: newPage=${newPage}, buttonPage=${getPageNumber}`);
      if (newPage === getPageNumber) {
        // Page changed to this button's page - reset to initial state
        console.log(`🔍 [NextButton] Page changed to ${getPageNumber}, resetting to initialEnabled: ${initialEnabled}`);
        setIsEnabled(initialEnabled);
        
        // After resetting, check if quiz was already completed
        setTimeout(() => {
          if (enableOnEvent === 'quizCompleted') {
            // Check PageCompletionManager
            if (window.PageCompletionManager && window.pageCompletionState) {
              const completionKey = `page${newPage}Completed`;
              if (window.pageCompletionState[completionKey] === true) {
                console.log(`✅ [NextButton] Page ${newPage} already completed, enabling button`);
                setIsEnabled(true);
                return;
              }
            }
            
            // Check ArrangeStepsComponent
            if (window.arrangeStepsStateStore) {
              Object.keys(window.arrangeStepsStateStore).forEach(key => {
                if (key.includes(`page${newPage}`)) {
                  const state = window.arrangeStepsStateStore[key];
                  if (state.isComplete === true) {
                    console.log(`✅ [NextButton] Quiz already completed (ArrangeSteps) for page ${newPage}`);
                    setIsEnabled(true);
                  }
                }
              });
            }
          }
        }, 200);
      }
    };
    
    // Check current page immediately on mount
    const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
    if (currentPage === getPageNumber) {
      console.log(`🔍 [NextButton] On mount, current page matches button page (${getPageNumber}), resetting to initialEnabled: ${initialEnabled}`);
      setIsEnabled(initialEnabled);
    }
    
    window.addEventListener('pageChanged', handlePageChange);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
    };
  }, [initialEnabled, getPageNumber, enableOnEvent]);

  // Determine if button should be disabled
  // disabled prop takes precedence, otherwise use isEnabled state
  const isDisabled = disabled || !isEnabled;
  
  console.log('🔍 [NextButton] Disabled state calculation:', {
    disabled,
    initialEnabled,
    isEnabled,
    enableOnEvent,
    finalDisabled: isDisabled,
    reason: isDisabled ? 
      (disabled ? 'explicitly disabled' : 'waiting for enableOnEvent') : 
      'enabled'
  });
  
  const deferredText = React.useDeferredValue(text);
  
  // Process font size for gc units
  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
    console.log('🔍 NextButtonComponent font size processing:', {
      original: fontSize,
      processed: processedFontSize,
      hasGridCellFontUtils: !!window.GridCellFontUtils,
      hasProcessGcProperty: !!window.GridCellFontUtils?.processGcProperty,
      windowInnerHeight: window.innerHeight
    });
  } else {
    console.log('🔍 NextButtonComponent font size NOT processed:', {
      fontSize,
      hasGc: fontSize?.includes('gc'),
      hasGridCellFontUtils: !!window.GridCellFontUtils,
      hasProcessGcProperty: !!window.GridCellFontUtils?.processGcProperty
    });
  }
  
  // Process border radius for gc units
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }
  
  const handleClick = React.useCallback(() => {
    if (isDisabled) {
      console.log('🔍 [NextButton] Click ignored - button is disabled');
      return;
    }
    startTransition(() => {
      otherProps.onClick?.();
    });
  }, [otherProps.onClick, isDisabled]);

  // Only attach click handler if not disabled
  const clickHandler = isDisabled ? undefined : handleClick;
  
  // Check if this is an applet button (3-layer system)
  const isAppletButton = className === 'applet-button' || 
    frameClassName === 'applet-button-frame' || 
    contentClassName === 'applet-button-content';
  
  
  if (isAppletButton) {
    // Three-layer button structure
    let frameGapPx = '5px';
    if (frameGap) {
      if (typeof frameGap === 'string' && frameGap.includes('gc')) {
        // Convert grid cell units to pixels using GridCellFontUtils if available
        if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPx) {
          frameGapPx = GridCellFontUtils.convertGcToPx(frameGap);
        } else {
          // Fallback conversion (approximate)
          const gcValue = parseFloat(frameGap.replace('gc', ''));
          frameGapPx = `${gcValue * 0.5}px`;
        }
      } else {
        frameGapPx = frameGap;
      }
    }
    
    const containerStyle = {
      // Apply grid positioning from the element renderer
      ...(otherProps.position?.css || {}),
      // Apply processed styles
      ...(otherProps.processedStyles || {}),
      // Apply z-index
      zIndex: otherProps.elementZIndex || 402,
      // Apply default styles
      backgroundColor: backgroundColor,
      borderRadius: processedBorderRadius,
      cursor: isDisabled ? 'not-allowed' : cursor,
      display: display,
      alignItems: alignItems,
      justifyContent: justifyContent,
      opacity: isDisabled ? '0.5' : opacity,
      pointerEvents: isDisabled ? 'none' : 'auto'
      // REMOVED: GridCellFontUtils.processGcStyles(props) - this was interfering with positioning
    };
    
    console.log('🔍 NextButtonComponent container style:', {
      processedFontSize,
      fontSize,
      otherPropsProcessedStyles: otherProps.processedStyles,
      containerStyle
    });
    
    return React.createElement('div', {
      id: elementId,
      className: `applet-button-container next-button-container${isPending ? ' pending' : ''}${isDisabled ? ' disabled' : ''}`,
      style: containerStyle,
      onClick: clickHandler,
      'data-element-type': 'next-button',
      'data-disabled': isDisabled
    }, [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: 'applet-button-frame next-button-frame',
        style: {
          position: 'absolute',
          top: frameGapPx,
          left: frameGapPx,
          right: frameGapPx,
          bottom: frameGapPx,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1
        }
      }),
      // Content layer
      (() => {
        const contentStyle = {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Apply other processed styles first
          ...(otherProps.processedStyles || {}),
          // Apply our processed styles last to ensure they take precedence
          fontSize: processedFontSize || 'inherit',
          fontWeight: fontWeight || 'inherit',
          color: color || 'inherit'
        };
        
        console.log('🔍 NextButtonComponent content style:', {
          processedFontSize,
          otherPropsProcessedStylesFontSize: otherProps.processedStyles?.fontSize,
          finalFontSize: contentStyle.fontSize,
          contentStyle
        });
        
        return React.createElement('div', {
          key: 'content',
          className: 'applet-button-content next-button-content',
          style: contentStyle
        }, deferredText);
      })()
    ]);
  }
  
  // Fallback to single-layer button for backward compatibility
  const fallbackStyle = {
    // Apply grid positioning from the element renderer
    ...(otherProps.position?.css || {}),
    // Apply processed styles first
    ...(otherProps.processedStyles || {}),
    // Apply z-index
    zIndex: otherProps.elementZIndex || 402,
    // Apply default styles last to ensure they take precedence
    backgroundColor: backgroundColor,
    color: color,
    fontSize: processedFontSize,
    fontWeight: fontWeight,
    borderRadius: processedBorderRadius,
    cursor: isDisabled ? 'not-allowed' : cursor,
    textAlign: textAlign,
    display: display,
    alignItems: alignItems,
    justifyContent: justifyContent,
    opacity: isDisabled ? '0.5' : opacity,
    pointerEvents: isDisabled ? 'none' : 'auto'
    // REMOVED: GridCellFontUtils.processGcStyles(props) - this was interfering with positioning
  };
  
  console.log('🔍 NextButtonComponent fallback style:', {
    processedFontSize,
    otherPropsProcessedStylesFontSize: otherProps.processedStyles?.fontSize,
    finalFontSize: fallbackStyle.fontSize,
    fallbackStyle
  });
  
  return React.createElement('button', {
    id: elementId,
    className: `next-button math-app-button${isPending ? ' pending' : ''}${isDisabled ? ' disabled' : ''}`,
    style: fallbackStyle,
    onClick: clickHandler,
    disabled: isDisabled || isPending,
    'data-element-type': 'next-button',
    'data-disabled': isDisabled
  }, deferredText);
});

/**
 * Previous Button Component - Three Layer Structure
 */
const PreviousButtonComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  
  // Default values for previous button
  const {
    className = 'applet-button',
    frameClassName = 'applet-button-frame',
    contentClassName = 'applet-button-content',
    frameGap = '6.25gc',
    text = '«',
    backgroundColor = '#FF9900',
    color = 'white',
    fontSize = '50gc',
    fontWeight = 'bold',
    borderRadius = '15gc',
    cursor = 'pointer',
    textAlign = 'center',
    display = 'flex',
    alignItems = 'center',
    justifyContent = 'center',
    disabled = false,
    opacity = '1',
    pulsate = false,
    ...otherProps
  } = props;
  
  const deferredText = React.useDeferredValue(text);
  
  // For previous button, isDisabled is just the disabled prop (no quiz logic needed)
  const isDisabled = disabled;
  
  // Process font size for gc units
  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }
  
  // Process border radius for gc units
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }
  
  const handleClick = React.useCallback(() => {
    startTransition(() => {
      otherProps.onClick?.();
    });
  }, [otherProps.onClick]);
  
  // Check if this is an applet button (3-layer system)
  const isAppletButton = className === 'applet-button' || 
    frameClassName === 'applet-button-frame' || 
    contentClassName === 'applet-button-content';
  
  
  if (isAppletButton) {
    // Three-layer button structure
    let frameGapPx = '5px';
    if (frameGap) {
      if (typeof frameGap === 'string' && frameGap.includes('gc')) {
        // Convert grid cell units to pixels using GridCellFontUtils if available
        if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.convertGcToPx) {
          frameGapPx = GridCellFontUtils.convertGcToPx(frameGap);
        } else {
          // Fallback conversion (approximate)
          const gcValue = parseFloat(frameGap.replace('gc', ''));
          frameGapPx = `${gcValue * 0.5}px`;
        }
      } else {
        frameGapPx = frameGap;
      }
    }
    
    return React.createElement('div', {
      id: elementId,
      className: `applet-button-container previous-button-container${isPending ? ' pending' : ''}`,
      style: {
        // Apply grid positioning from the element renderer
        ...(otherProps.position?.css || {}),
        // Apply processed styles
        ...(otherProps.processedStyles || {}),
        // Apply z-index
        zIndex: otherProps.elementZIndex || 402,
        // Apply default styles
        backgroundColor: backgroundColor,
        borderRadius: processedBorderRadius,
        cursor: isDisabled ? 'not-allowed' : cursor,
        display: display,
        alignItems: alignItems,
        justifyContent: justifyContent,
        opacity: isDisabled ? '0.5' : opacity
        // REMOVED: GridCellFontUtils.processGcStyles(props) - this was interfering with positioning
      },
      onClick: handleClick,
      'data-element-type': 'previous-button'
    }, [
      // Frame layer
      React.createElement('div', {
        key: 'frame',
        className: 'applet-button-frame previous-button-frame',
        style: {
          position: 'absolute',
          top: frameGapPx,
          left: frameGapPx,
          right: frameGapPx,
          bottom: frameGapPx,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1
        }
      }),
      // Content layer
      React.createElement('div', {
        key: 'content',
        className: 'applet-button-content previous-button-content',
        style: {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Apply other processed styles first
          ...(otherProps.processedStyles || {}),
          // Apply our processed styles last to ensure they take precedence
          fontSize: processedFontSize || 'inherit',
          fontWeight: fontWeight || 'inherit',
          color: color || 'inherit'
        }
      }, deferredText)
    ]);
  }
  
  // Fallback to single-layer button for backward compatibility
  const fallbackStyle = {
    // Apply grid positioning from the element renderer
    ...(otherProps.position?.css || {}),
    // Apply processed styles first
    ...(otherProps.processedStyles || {}),
    // Apply z-index
    zIndex: otherProps.elementZIndex || 402,
    // Apply default styles last to ensure they take precedence
    backgroundColor: backgroundColor,
    color: color,
    fontSize: processedFontSize,
    fontWeight: fontWeight,
    borderRadius: processedBorderRadius,
    cursor: isDisabled ? 'not-allowed' : cursor,
    textAlign: textAlign,
    display: display,
    alignItems: alignItems,
    justifyContent: justifyContent,
    opacity: isDisabled ? '0.5' : opacity
    // REMOVED: GridCellFontUtils.processGcStyles(props) - this was interfering with positioning
  };
  
  return React.createElement('button', {
    id: elementId,
    className: `previous-button math-app-button${isPending ? ' pending' : ''}`,
    style: fallbackStyle,
    onClick: handleClick,
    disabled: disabled || isPending,
    'data-element-type': 'previous-button'
  }, deferredText);
});

// Interaction Elements Configuration
const InteractionElements = {
  'tap-gif': {
    type: 'custom',
    component: TapGifComponent,
    props: {
      imageSrc: 'assets/tap.gif',
      imageAlt: 'Tap'
    }
  },
  character: {
    type: 'image',
    coordinates: [2, 34, 28, 72],
    zIndex: 'var(--z-content)',
    props: {
      src: 'assets/character_excited.png',
      alt: 'Excited Character',
      className: 'character-image'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('image', (props, elementId) => {
      return React.createElement(CharacterComponent, props);
    })
  },

  dialogBubble: {
    type: 'textbox',
    coordinates: [2, 6, 28, 33],
    zIndex: 'var(--z-elevated)',
    props: {
      // Common default options for all dialog bubbles with React 18 optimizations
      getOptions(overrides = {}) {
        const defaultOptions = {
          fontSize: '300gc',
          lineHeight: '500gc',
          textAlign: "left",
          textJustify: "auto",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          borderRadius: '75gc',
          padding: '200gc',
          showTail: true,
          tailBorder: "bottom",
          tailPlacement: "middle",
          tailDirection: "south"
        };
        
        // Merge overrides with defaults
        const mergedOptions = { ...defaultOptions, ...overrides };
        return GridCellFontUtils.processGcStyles(mergedOptions);
      },
      
      // Default options getter (for backward compatibility)
      get options() {
        return this.getOptions();
      }
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('dialog', (props, elementId) => {
      return React.createElement(DialogBubbleComponent, props);
    })
  },

  nextButton: {
    type: 'button',
    coordinates: [110, 64, 125, 68],
    zIndex: 'var(--z-button)',
    props: {
      get text() {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : 'Next';
      },
      backgroundColor: '#FF9900',
      color: 'white',
      fontSize: '375gc',
      fontWeight: 'bold',
      borderRadius: '50gc',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center'
    },
    
    generateProps: (targetPage) => {
      return {
        get text() {
          return typeof i18n !== 'undefined' ? i18n.t('buttons.next') : 'Next';
        },
        backgroundColor: '#FF9900',
        color: 'white',
        fontSize: '375gc',
        fontWeight: 'bold',
        borderRadius: '50gc',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        onClick: () => {
          console.log(`🔄 [Next Button] Navigating to page ${targetPage}`);
          if (typeof window !== 'undefined' && window.changePageAndNotify) {
            window.changePageAndNotify(targetPage);
          }
        }
      };
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('button', (props, elementId) => {
      return React.createElement(NextButtonComponent, props);
    })
  },
  
  previousButton: {
    type: 'button',
    coordinates: [4, 64, 19, 68],
    zIndex: 'var(--z-button)',
    props: {
      get text() {
        return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : 'Previous';
      },
      backgroundColor: '#6699CC',
      color: 'white',
      fontSize: '375gc',
      fontWeight: 'bold',
      borderRadius: '50gc',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center'
    },
    
    generateProps: (targetPage) => {
      return {
        get text() {
          return typeof i18n !== 'undefined' ? i18n.t('buttons.previous') : 'Previous';
        },
        backgroundColor: '#6699CC',
        color: 'white',
        fontSize: '375gc',
        fontWeight: 'bold',
        borderRadius: '50gc',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        onClick: () => {
          console.log(`🔄 [Previous Button] Navigating to page ${targetPage}`);
          if (typeof window !== 'undefined' && window.changePageAndNotify) {
            window.changePageAndNotify(targetPage);
          }
        }
      };
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('button', (props, elementId) => {
      return React.createElement(PreviousButtonComponent, props);
    })
  }
};

// Export components and configuration
window.InteractionComponents = {
  CharacterComponent,
  DialogBubbleComponent,
  TapGifComponent,
  NextButtonComponent,
  PreviousButtonComponent,
  QuizStandaloneOptionButtonComponent,
  ChooseOptionPanelWithQuizPillsComponent,
  RevealOnEventTextComponent,
  InteractionElements
};

console.log('✅ Interaction components loaded successfully');
