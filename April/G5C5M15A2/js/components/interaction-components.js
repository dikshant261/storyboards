/**
 * Interaction Components - React 18 Optimized
 * 
 * This file contains all interaction-related components:
 * - Character
 * - Dialog Bubble
 * - Next Button
 * - Previous Button
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

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
    hideOnPage5State = null, // Legacy: single state string to hide on (merged with hideInPage5InteractionStates)
    hideInPage5InteractionStates = null, // string[] — hide when detail.state matches any entry
    hideInPage8InteractionStates = null, // string[] — same for window.page8InteractionState / page8InteractionStateChange
    hideInPage9InteractionStates = null, // string[] — window.page9InteractionState / page9InteractionStateChange
    hideInPage11InteractionStates = null, // string[] — window.page11InteractionState / page11InteractionStateChange
    hideInPage12InteractionStates = null, // string[] — window.page12InteractionState / page12InteractionStateChange
    hideInPage13InteractionStates = null, // string[] — window.page13InteractionState / page13InteractionStateChange
    opacity = 1.0, // Opacity for the tap animation (0.0 to 1.0)
    pointerEvents: pointerEventsProp = 'none',
    ...otherProps
  } = props;

  const mergedHidePage5States = React.useMemo(() => {
    const list = [];
    if (Array.isArray(hideInPage5InteractionStates)) {
      list.push(...hideInPage5InteractionStates);
    }
    if (hideOnPage5State) {
      list.push(hideOnPage5State);
    }
    return list.length ? list : null;
  }, [hideInPage5InteractionStates, hideOnPage5State]);

  const mergedHidePage8States = React.useMemo(() => {
    if (!Array.isArray(hideInPage8InteractionStates) || hideInPage8InteractionStates.length === 0) {
      return null;
    }
    return hideInPage8InteractionStates;
  }, [hideInPage8InteractionStates]);

  const mergedHidePage9States = React.useMemo(() => {
    if (!Array.isArray(hideInPage9InteractionStates) || hideInPage9InteractionStates.length === 0) {
      return null;
    }
    return hideInPage9InteractionStates;
  }, [hideInPage9InteractionStates]);

  const mergedHidePage11States = React.useMemo(() => {
    if (!Array.isArray(hideInPage11InteractionStates) || hideInPage11InteractionStates.length === 0) {
      return null;
    }
    return hideInPage11InteractionStates;
  }, [hideInPage11InteractionStates]);

  const mergedHidePage12States = React.useMemo(() => {
    if (!Array.isArray(hideInPage12InteractionStates) || hideInPage12InteractionStates.length === 0) {
      return null;
    }
    return hideInPage12InteractionStates;
  }, [hideInPage12InteractionStates]);

  const mergedHidePage13States = React.useMemo(() => {
    if (!Array.isArray(hideInPage13InteractionStates) || hideInPage13InteractionStates.length === 0) {
      return null;
    }
    return hideInPage13InteractionStates;
  }, [hideInPage13InteractionStates]);
  
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

    if (
      (pageNumber === 10 || pageNumber === 14) &&
      mergedHidePage9States &&
      mergedHidePage9States.length > 0 &&
      typeof id === 'string' &&
      (id.startsWith('page10-tap') ||
        id.startsWith('page14-tap') ||
        id.startsWith('page15-tap') ||
        id.startsWith('page16-tap'))
    ) {
      const p9Load =
        typeof window !== 'undefined' ? window.page9InteractionState || 'default' : 'default';
      setIsVisible(!mergedHidePage9States.includes(p9Load));
      return;
    }

    if (
      pageNumber === 17 &&
      mergedHidePage9States &&
      mergedHidePage9States.length > 0 &&
      typeof id === 'string' &&
      id.startsWith('page17-tap')
    ) {
      const p9Load =
        typeof window !== 'undefined' ? window.page9InteractionState || 'default' : 'default';
      setIsVisible(!mergedHidePage9States.includes(p9Load));
      return;
    }

    if (
      pageNumber === 11 &&
      mergedHidePage11States &&
      mergedHidePage11States.length > 0 &&
      typeof id === 'string' &&
      id.startsWith('page11-tap')
    ) {
      const p11Load =
        typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
      setIsVisible(!mergedHidePage11States.includes(p11Load));
      return;
    }

    if (
      pageNumber === 12 &&
      mergedHidePage12States &&
      mergedHidePage12States.length > 0 &&
      typeof id === 'string' &&
      id.startsWith('page12-tap')
    ) {
      const p12Load =
        typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
      setIsVisible(!mergedHidePage12States.includes(p12Load));
      return;
    }

    if (
      pageNumber === 13 &&
      mergedHidePage13States &&
      mergedHidePage13States.length > 0 &&
      typeof id === 'string' &&
      id.startsWith('page13-tap')
    ) {
      const p13Load =
        typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';
      setIsVisible(!mergedHidePage13States.includes(p13Load));
      return;
    }

    if (
      pageNumber === 18 &&
      typeof id === 'string' &&
      id.startsWith('page18-tap-gif-text-button')
    ) {
      const st18 =
        typeof window !== 'undefined' ? window.page18InteractionState || 'state-18-def' : 'state-18-def';
      if (id === 'page18-tap-gif-text-button-1') setIsVisible(st18 === 'state-18-def');
      else if (id === 'page18-tap-gif-text-button-2') setIsVisible(st18 === 'state-18-equal');
      else if (id === 'page18-tap-gif-text-button-3') setIsVisible(st18 === 'state-18-leftover');
      return;
    }

    if (
      pageNumber === 11 &&
      typeof id === 'string' &&
      id === 'page11-tap-animation' &&
      typeof window !== 'undefined' &&
      window.page11InteractionState === 'state-4-packets'
    ) {
      const p11Load =
        typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
      if (mergedHidePage11States?.length && mergedHidePage11States.includes(p11Load)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
      return;
    }

    if (
      pageNumber === 12 &&
      typeof id === 'string' &&
      id === 'page12-tap-animation' &&
      typeof window !== 'undefined' &&
      window.page12InteractionState === 'state-4-packets'
    ) {
      const p12Load =
        typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
      if (mergedHidePage12States?.length && mergedHidePage12States.includes(p12Load)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
      return;
    }

    if (
      pageNumber === 13 &&
      typeof id === 'string' &&
      id === 'page13-tap-animation' &&
      typeof window !== 'undefined' &&
      window.page13InteractionState === 'state-4-packets'
    ) {
      const p13Load =
        typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';
      if (mergedHidePage13States?.length && mergedHidePage13States.includes(p13Load)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
      return;
    }

    // Check if quiz is already completed for this page
    if (pageNumber) {
      // Check PageCompletionManager and quiz component state stores
      let isQuizCompleted = false;
      
      // Check PageCompletionManager
      if (window.PageCompletionManager && window.pageCompletionState) {
        const completionKey = `page${pageNumber}Completed`;
        if (window.pageCompletionState[completionKey] === true) {
          // Page 11: packing-only flow — never infer completion from quiz stores.
          if (pageNumber !== 11) {
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
          }

          if (
            pageNumber === 5 &&
            typeof window !== 'undefined' &&
            window.page5InteractionState === 'state-2-packets'
          ) {
            isQuizCompleted = true;
          }
          if (
            pageNumber === 8 &&
            typeof window !== 'undefined' &&
            window.page8InteractionState === 'state-3-packets'
          ) {
            isQuizCompleted = true;
          }
          if (
            pageNumber === 9 &&
            typeof window !== 'undefined' &&
            window.page9InteractionState === 'state-4-packets'
          ) {
            isQuizCompleted = true;
          }
          if (
            pageNumber === 17 &&
            typeof window !== 'undefined' &&
            window.page9InteractionState === 'state-6-packets'
          ) {
            isQuizCompleted = true;
          }
          if (
            pageNumber === 11 &&
            typeof window !== 'undefined' &&
            window.page11InteractionState === 'state-4-packets'
          ) {
            isQuizCompleted = true;
          }
          if (
            pageNumber === 12 &&
            typeof window !== 'undefined' &&
            window.page12InteractionState === 'state-4-packets'
          ) {
            isQuizCompleted = true;
          }
          if (
            pageNumber === 13 &&
            typeof window !== 'undefined' &&
            window.page13InteractionState === 'state-4-packets'
          ) {
            isQuizCompleted = true;
          }
          
          if (isQuizCompleted) {
            const p5Load =
              typeof window !== 'undefined' ? window.page5InteractionState || 'default' : 'default';
            const p8Load =
              typeof window !== 'undefined' ? window.page8InteractionState || 'default' : 'default';
            const p9Load =
              typeof window !== 'undefined' ? window.page9InteractionState || 'default' : 'default';
            const p11Load =
              typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
            const p12Load =
              typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
            const p13Load =
              typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';
            if (
              mergedHidePage5States &&
              mergedHidePage5States.length > 0 &&
              mergedHidePage5States.includes(p5Load)
            ) {
              setIsVisible(false);
              return;
            }
            if (
              mergedHidePage8States &&
              mergedHidePage8States.length > 0 &&
              mergedHidePage8States.includes(p8Load)
            ) {
              setIsVisible(false);
              return;
            }
            if (
              mergedHidePage9States &&
              mergedHidePage9States.length > 0 &&
              mergedHidePage9States.includes(p9Load)
            ) {
              setIsVisible(false);
              return;
            }
            if (
              mergedHidePage11States &&
              mergedHidePage11States.length > 0 &&
              mergedHidePage11States.includes(p11Load)
            ) {
              setIsVisible(false);
              return;
            }
            if (
              mergedHidePage12States &&
              mergedHidePage12States.length > 0 &&
              mergedHidePage12States.includes(p12Load)
            ) {
              setIsVisible(false);
              return;
            }
            if (
              mergedHidePage13States &&
              mergedHidePage13States.length > 0 &&
              mergedHidePage13States.includes(p13Load)
            ) {
              setIsVisible(false);
              return;
            }
            console.log(`✅ [TapGif] Quiz already completed for page ${pageNumber}, showing tap animation`);
            setIsVisible(true);
            return;
          }
        }
      }
    }
    
    console.log(`🔍 [TapGif] Resetting to initialVisible: ${initialVisible} (page: ${pageNumber})`);
    setIsVisible(initialVisible);
  }, [
    initialVisible,
    getPageNumber,
    mergedHidePage5States,
    mergedHidePage8States,
    mergedHidePage9States,
    mergedHidePage11States,
    mergedHidePage12States,
    mergedHidePage13States,
    id
  ]);
  
  // Listen for showOnEvent to show the component
  React.useEffect(() => {
    if (!showOnEvent) return;
    
    const handleEvent = (event) => {
      // Check filter criteria if provided
      if (showOnEventFilter) {
        const matches = Object.entries(showOnEventFilter).every(([key, value]) => {
          const v = event.detail?.[key];
          if (Array.isArray(value)) return value.includes(v);
          return v === value;
        });
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

  // Page 5: hide when interaction state matches hideOnPage5State and/or hideInPage5InteractionStates
  React.useEffect(() => {
    if (!mergedHidePage5States) return undefined;
    const handlePage5State = (event) => {
      const st = event.detail?.state;
      if (mergedHidePage5States.includes(st)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('page5InteractionStateChange', handlePage5State);
    return () => window.removeEventListener('page5InteractionStateChange', handlePage5State);
  }, [mergedHidePage5States]);

  // Page 8: hide when interaction state matches hideInPage8InteractionStates
  React.useEffect(() => {
    if (!mergedHidePage8States) return undefined;
    const handlePage8State = (event) => {
      const st = event.detail?.state;
      if (mergedHidePage8States.includes(st)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('page8InteractionStateChange', handlePage8State);
    return () => window.removeEventListener('page8InteractionStateChange', handlePage8State);
  }, [mergedHidePage8States]);

  // Page 9: hide when interaction state matches hideInPage9InteractionStates
  React.useEffect(() => {
    if (!mergedHidePage9States) return undefined;
    const handlePage9State = (event) => {
      const st = event.detail?.state;
      if (mergedHidePage9States.includes(st)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('page9InteractionStateChange', handlePage9State);
    return () => window.removeEventListener('page9InteractionStateChange', handlePage9State);
  }, [mergedHidePage9States]);

  // Page 11: hide when interaction state matches hideInPage11InteractionStates
  React.useEffect(() => {
    if (!mergedHidePage11States) return undefined;
    const handlePage11State = (event) => {
      const st = event.detail?.state;
      if (mergedHidePage11States.includes(st)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('page11InteractionStateChange', handlePage11State);
    return () => window.removeEventListener('page11InteractionStateChange', handlePage11State);
  }, [mergedHidePage11States]);

  // Page 12: hide when interaction state matches hideInPage12InteractionStates
  React.useEffect(() => {
    if (!mergedHidePage12States) return undefined;
    const handlePage12State = (event) => {
      const st = event.detail?.state;
      if (mergedHidePage12States.includes(st)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('page12InteractionStateChange', handlePage12State);
    return () => window.removeEventListener('page12InteractionStateChange', handlePage12State);
  }, [mergedHidePage12States]);

  // Page 13: hide when interaction state matches hideInPage13InteractionStates
  React.useEffect(() => {
    if (!mergedHidePage13States) return undefined;
    const handlePage13State = (event) => {
      const st = event.detail?.state;
      if (mergedHidePage13States.includes(st)) {
        setIsVisible(false);
      }
    };
    window.addEventListener('page13InteractionStateChange', handlePage13State);
    return () => window.removeEventListener('page13InteractionStateChange', handlePage13State);
  }, [mergedHidePage13States]);

  // Page 18 GCF text rows: tap.gif 1 only in state-18-def; 2 in state-18-equal; 3 in state-18-leftover
  React.useEffect(() => {
    if (typeof id !== 'string' || !id.startsWith('page18-tap-gif-text-button')) return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page18InteractionState || 'state-18-def' : 'state-18-def';
      if (id === 'page18-tap-gif-text-button-1') setIsVisible(st === 'state-18-def');
      else if (id === 'page18-tap-gif-text-button-2') setIsVisible(st === 'state-18-equal');
      else if (id === 'page18-tap-gif-text-button-3') setIsVisible(st === 'state-18-leftover');
    };
    sync();
    window.addEventListener('page18InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    return () => {
      window.removeEventListener('page18InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
    };
  }, [id]);

  // Page 18 footer: tap.gif beside Start Over (same slot as page 17 next tap) when flow reaches state-18-max
  React.useEffect(() => {
    if (typeof id !== 'string' || id !== 'page18-tap-animation') return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page18InteractionState || 'state-18-def' : 'state-18-def';
      setIsVisible(st === 'state-18-max');
    };
    sync();
    window.addEventListener('page18InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    return () => {
      window.removeEventListener('page18InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
    };
  }, [id]);

  // Align visibility with current interaction state on mount / prop change (hide/show listeners only run on *events*).
  React.useEffect(() => {
    if (typeof window === 'undefined' || getPageNumber == null) return;
    const p8 = window.page8InteractionState;
    const p9 = window.page9InteractionState;
    const p11 = window.page11InteractionState;
    const p12 = window.page12InteractionState;
    const p13 = window.page13InteractionState;
    const p5 = window.page5InteractionState || 'default';
    const detailMatches = (filter, detail) => {
      if (!filter || !detail) return false;
      return Object.entries(filter).every(([key, value]) => {
        const v = detail[key];
        if (Array.isArray(value)) return value.includes(v);
        return v === value;
      });
    };
    if (getPageNumber === 8 && mergedHidePage8States?.length && p8 && mergedHidePage8States.includes(p8)) {
      setIsVisible(false);
      return;
    }
    if (
      (getPageNumber === 9 ||
        getPageNumber === 17 ||
        ((getPageNumber === 10 || getPageNumber === 14) &&
          typeof id === 'string' &&
          (id.startsWith('page10-tap') ||
        id.startsWith('page14-tap') ||
        id.startsWith('page15-tap') ||
        id.startsWith('page16-tap')))) &&
      mergedHidePage9States?.length &&
      p9 &&
      mergedHidePage9States.includes(p9)
    ) {
      setIsVisible(false);
      return;
    }
    if (
      getPageNumber === 11 &&
      typeof id === 'string' &&
      id.startsWith('page11-tap') &&
      mergedHidePage11States?.length &&
      p11 &&
      mergedHidePage11States.includes(p11)
    ) {
      setIsVisible(false);
      return;
    }
    if (
      getPageNumber === 12 &&
      typeof id === 'string' &&
      id.startsWith('page12-tap') &&
      mergedHidePage12States?.length &&
      p12 &&
      mergedHidePage12States.includes(p12)
    ) {
      setIsVisible(false);
      return;
    }
    if (
      getPageNumber === 13 &&
      typeof id === 'string' &&
      id.startsWith('page13-tap') &&
      mergedHidePage13States?.length &&
      p13 &&
      mergedHidePage13States.includes(p13)
    ) {
      setIsVisible(false);
      return;
    }
    if (getPageNumber === 5 && mergedHidePage5States?.length && mergedHidePage5States.includes(p5)) {
      setIsVisible(false);
      return;
    }
    if (getPageNumber === 8 && showOnEvent === 'page8InteractionStateChange' && showOnEventFilter && p8) {
      if (detailMatches(showOnEventFilter, { state: p8 })) {
        setIsVisible(true);
        return;
      }
    }
    if (
      (getPageNumber === 9 ||
        getPageNumber === 17 ||
        ((getPageNumber === 10 || getPageNumber === 14) &&
          typeof id === 'string' &&
          (id.startsWith('page10-tap') ||
        id.startsWith('page14-tap') ||
        id.startsWith('page15-tap') ||
        id.startsWith('page16-tap')))) &&
      showOnEvent === 'page9InteractionStateChange' &&
      showOnEventFilter &&
      p9
    ) {
      if (detailMatches(showOnEventFilter, { state: p9 })) {
        setIsVisible(true);
        return;
      }
    }
    if (
      getPageNumber === 11 &&
      typeof id === 'string' &&
      id.startsWith('page11-tap') &&
      showOnEvent === 'page11InteractionStateChange' &&
      showOnEventFilter &&
      p11
    ) {
      if (detailMatches(showOnEventFilter, { state: p11 })) {
        setIsVisible(true);
        return;
      }
    }
    if (
      getPageNumber === 12 &&
      typeof id === 'string' &&
      id.startsWith('page12-tap') &&
      showOnEvent === 'page12InteractionStateChange' &&
      showOnEventFilter &&
      p12
    ) {
      if (detailMatches(showOnEventFilter, { state: p12 })) {
        setIsVisible(true);
        return;
      }
    }
    if (
      getPageNumber === 13 &&
      typeof id === 'string' &&
      id.startsWith('page13-tap') &&
      showOnEvent === 'page13InteractionStateChange' &&
      showOnEventFilter &&
      p13
    ) {
      if (detailMatches(showOnEventFilter, { state: p13 })) {
        setIsVisible(true);
        return;
      }
    }
    if (getPageNumber === 5 && showOnEvent === 'page5InteractionStateChange' && showOnEventFilter) {
      if (detailMatches(showOnEventFilter, { state: p5 })) {
        setIsVisible(true);
      }
    }
  }, [
    getPageNumber,
    mergedHidePage8States,
    mergedHidePage9States,
    mergedHidePage11States,
    mergedHidePage12States,
    mergedHidePage5States,
    showOnEvent,
    showOnEventFilter,
    id
  ]);

  // Page 5: reset visibility to initialVisible when state returns to default
  React.useEffect(() => {
    const handleDefault = (event) => {
      if (event.detail?.state === 'default') {
        setIsVisible(initialVisible);
      }
    };
    window.addEventListener('page5InteractionStateChange', handleDefault);
    return () => window.removeEventListener('page5InteractionStateChange', handleDefault);
  }, [initialVisible]);

  // Page 8: reset visibility to initialVisible when state returns to default
  React.useEffect(() => {
    const handleDefault8 = (event) => {
      if (event.detail?.state === 'default') {
        setIsVisible(initialVisible);
      }
    };
    window.addEventListener('page8InteractionStateChange', handleDefault8);
    return () => window.removeEventListener('page8InteractionStateChange', handleDefault8);
  }, [initialVisible]);

  // Page 9: reset visibility to initialVisible when state returns to default
  React.useEffect(() => {
    const handleDefault9 = (event) => {
      if (event.detail?.state === 'default') {
        setIsVisible(initialVisible);
      }
    };
    window.addEventListener('page9InteractionStateChange', handleDefault9);
    return () => window.removeEventListener('page9InteractionStateChange', handleDefault9);
  }, [initialVisible]);

  // Page 11: reset visibility to initialVisible when state returns to default
  React.useEffect(() => {
    const handleDefault11 = (event) => {
      if (event.detail?.state === 'default') {
        setIsVisible(initialVisible);
      }
    };
    window.addEventListener('page11InteractionStateChange', handleDefault11);
    return () => window.removeEventListener('page11InteractionStateChange', handleDefault11);
  }, [initialVisible]);

  // Page 12: reset visibility to initialVisible when state returns to default
  React.useEffect(() => {
    const handleDefault12 = (event) => {
      if (event.detail?.state === 'default') {
        setIsVisible(initialVisible);
      }
    };
    window.addEventListener('page12InteractionStateChange', handleDefault12);
    return () => window.removeEventListener('page12InteractionStateChange', handleDefault12);
  }, [initialVisible]);

  // Page 13: reset visibility to initialVisible when state returns to default
  React.useEffect(() => {
    const handleDefault13 = (event) => {
      if (event.detail?.state === 'default') {
        setIsVisible(initialVisible);
      }
    };
    window.addEventListener('page13InteractionStateChange', handleDefault13);
    return () => window.removeEventListener('page13InteractionStateChange', handleDefault13);
  }, [initialVisible]);
  
  // Listen for quizCompleted events to show tap animation when quiz is completed
  // (Tap animation is hidden on quiz pages initially, then shown when quiz is completed)
  React.useEffect(() => {
    if (getPageNumber === null) return;
    if (getPageNumber === 11) return;

    const handleQuizCompleted = (event) => {
      const eventPageNumber = event.detail?.pageNumber;
      if (eventPageNumber !== getPageNumber) return;
      if (id === 'page18-tap-animation') return;
      const p5 =
        typeof window !== 'undefined' ? window.page5InteractionState || 'default' : 'default';
      const p8 =
        typeof window !== 'undefined' ? window.page8InteractionState || 'default' : 'default';
      const p9 =
        typeof window !== 'undefined' ? window.page9InteractionState || 'default' : 'default';
      const p11 =
        typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
      const p12 =
        typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
      const p13 =
        typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';
      if (
        mergedHidePage5States &&
        mergedHidePage5States.length > 0 &&
        mergedHidePage5States.includes(p5)
      ) {
        setIsVisible(false);
        return;
      }
      if (
        mergedHidePage8States &&
        mergedHidePage8States.length > 0 &&
        mergedHidePage8States.includes(p8)
      ) {
        setIsVisible(false);
        return;
      }
      if (
        mergedHidePage9States &&
        mergedHidePage9States.length > 0 &&
        mergedHidePage9States.includes(p9)
      ) {
        setIsVisible(false);
        return;
      }
      if (
        mergedHidePage11States &&
        mergedHidePage11States.length > 0 &&
        mergedHidePage11States.includes(p11)
      ) {
        setIsVisible(false);
        return;
      }
      if (
        mergedHidePage12States &&
        mergedHidePage12States.length > 0 &&
        mergedHidePage12States.includes(p12)
      ) {
        setIsVisible(false);
        return;
      }
      if (
        mergedHidePage13States &&
        mergedHidePage13States.length > 0 &&
        mergedHidePage13States.includes(p13)
      ) {
        setIsVisible(false);
        return;
      }
      console.log(`🔍 [TapGif] Quiz completed for page ${getPageNumber}, showing tap animation`);
      setIsVisible(true);
    };
    
    window.addEventListener('quizCompleted', handleQuizCompleted);
    
    return () => {
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, [
    getPageNumber,
    id,
    mergedHidePage5States,
    mergedHidePage8States,
    mergedHidePage9States,
    mergedHidePage11States,
    mergedHidePage12States,
    mergedHidePage13States
  ]);

  // Page 11: no quiz — show tap GIF when packing reaches state-4-packets
  React.useEffect(() => {
    if (getPageNumber !== 11 || id !== 'page11-tap-animation') return undefined;
    const onP11 = (event) => {
      if (event.detail?.state !== 'state-4-packets') return;
      const p11 =
        typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
      if (mergedHidePage11States?.length && mergedHidePage11States.includes(p11)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
    };
    window.addEventListener('page11InteractionStateChange', onP11);
    return () => window.removeEventListener('page11InteractionStateChange', onP11);
  }, [getPageNumber, id, mergedHidePage11States]);

  // Page 12: no quiz — show tap GIF when packing reaches state-4-packets
  React.useEffect(() => {
    if (getPageNumber !== 12 || id !== 'page12-tap-animation') return undefined;
    const onP12 = (event) => {
      if (event.detail?.state !== 'state-4-packets') return;
      const p12 =
        typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
      if (mergedHidePage12States?.length && mergedHidePage12States.includes(p12)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
    };
    window.addEventListener('page12InteractionStateChange', onP12);
    return () => window.removeEventListener('page12InteractionStateChange', onP12);
  }, [getPageNumber, id, mergedHidePage12States]);

  // Page 13: no quiz — show tap GIF when packing reaches state-4-packets
  React.useEffect(() => {
    if (getPageNumber !== 13 || id !== 'page13-tap-animation') return undefined;
    const onP13 = (event) => {
      if (event.detail?.state !== 'state-4-packets') return;
      const p13 =
        typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';
      if (mergedHidePage13States?.length && mergedHidePage13States.includes(p13)) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
    };
    window.addEventListener('page13InteractionStateChange', onP13);
    return () => window.removeEventListener('page13InteractionStateChange', onP13);
  }, [getPageNumber, id, mergedHidePage13States]);
  
  // Reset to initialVisible when page changes (to handle navigation between pages)
  // But check if quiz is already completed first
  React.useEffect(() => {
    if (getPageNumber === null) return;
    
    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      const pageNumber = getPageNumber;
      console.log(`🔍 [TapGif] Page change event: newPage=${newPage}, componentPage=${pageNumber}`);
      if (newPage === pageNumber) {
        if (pageNumber !== 11) {
          let isQuizCompleted = false;

          if (window.PageCompletionManager && window.pageCompletionState) {
            const completionKey = `page${pageNumber}Completed`;
            if (window.pageCompletionState[completionKey] === true) {
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
      if (pageNumber !== 11) {
        let isQuizCompleted = false;

        if (window.PageCompletionManager && window.pageCompletionState) {
          const completionKey = `page${pageNumber}Completed`;
          if (window.pageCompletionState[completionKey] === true) {
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

      if (
        pageNumber === 11 &&
        id === 'page11-tap-animation' &&
        typeof window !== 'undefined' &&
        window.page11InteractionState === 'state-4-packets'
      ) {
        const p11 = window.page11InteractionState || 'default';
        if (!(mergedHidePage11States?.length && mergedHidePage11States.includes(p11))) {
          console.log(`✅ [TapGif] Page 11 at state-4-packets on mount, showing tap animation`);
          setIsVisible(true);
          return;
        }
      }

      if (
        pageNumber === 12 &&
        id === 'page12-tap-animation' &&
        typeof window !== 'undefined' &&
        window.page12InteractionState === 'state-4-packets'
      ) {
        const p12 = window.page12InteractionState || 'default';
        if (!(mergedHidePage12States?.length && mergedHidePage12States.includes(p12))) {
          console.log(`✅ [TapGif] Page 12 at state-4-packets on mount, showing tap animation`);
          setIsVisible(true);
          return;
        }
      }

      if (
        pageNumber === 13 &&
        id === 'page13-tap-animation' &&
        typeof window !== 'undefined' &&
        window.page13InteractionState === 'state-4-packets'
      ) {
        const p13 = window.page13InteractionState || 'default';
        if (!(mergedHidePage13States?.length && mergedHidePage13States.includes(p13))) {
          console.log(`✅ [TapGif] Page 13 at state-4-packets on mount, showing tap animation`);
          setIsVisible(true);
          return;
        }
      }
      
      console.log(`🔍 [TapGif] On mount, current page is ${pageNumber}, resetting to initialVisible: ${initialVisible}`);
      setIsVisible(initialVisible);
    }
    
    window.addEventListener('pageChanged', handlePageChange);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
    };
  }, [initialVisible, getPageNumber, id, mergedHidePage11States, mergedHidePage12States, mergedHidePage13States]);
  
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
    position: 'absolute',
    pointerEvents: pointerEventsProp
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
    if (pageMatch) {
      return parseInt(pageMatch[1], 10);
    }
    // Fallback: page N interaction events (e.g. embedded buttons that omit element.id)
    if (typeof enableOnEvent === 'string') {
      const evMatch = enableOnEvent.match(/^page(\d+)InteractionStateChange$/);
      if (evMatch) {
        return parseInt(evMatch[1], 10);
      }
    }
    return null;
  }, [enableOnEventFilter, props.id, otherProps.id, elementId, enableOnEvent]);

  // State for enabled/disabled - starts with initialEnabled value
  const [isEnabled, setIsEnabled] = React.useState(initialEnabled);

  // Reset to initialEnabled first so interaction- / quiz-sync effects below can override on mount
  // (If this ran after the listener effect, it would overwrite e.g. page 11 next when already at state-4-packets.)
  React.useEffect(() => {
    const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
    const pageNumber = getPageNumber;

    if (enableOnEvent === 'quizCompleted' && pageNumber && initialEnabled === false) {
      if (window.PageCompletionManager) {
        window.PageCompletionManager.setPageCompleted(pageNumber, false);
        console.log(`🔄 [NextButton] Initialized page ${pageNumber} completion state to false (quiz page, will be set to true by quiz component if completed)`);
      }
    }

    console.log(`🔍 [NextButton] Resetting to initialEnabled: ${initialEnabled} (currentPage: ${currentPage}, buttonPage: ${pageNumber})`);
    setIsEnabled(initialEnabled);
  }, [initialEnabled, getPageNumber, enableOnEvent]);

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

          if (
            getPageNumber === 5 &&
            typeof window !== 'undefined' &&
            window.page5InteractionState === 'state-2-packets'
          ) {
            hasActualCompletion = true;
          }
          if (
            getPageNumber === 8 &&
            typeof window !== 'undefined' &&
            window.page8InteractionState === 'state-3-packets'
          ) {
            hasActualCompletion = true;
          }
          if (
            getPageNumber === 9 &&
            typeof window !== 'undefined' &&
            window.page9InteractionState === 'state-4-packets'
          ) {
            hasActualCompletion = true;
          }
          if (
            getPageNumber === 17 &&
            typeof window !== 'undefined' &&
            window.page9InteractionState === 'state-6-packets'
          ) {
            hasActualCompletion = true;
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

    if (
      enableOnEvent === 'page11InteractionStateChange' &&
      getPageNumber === 11 &&
      enableOnEventFilter &&
      typeof window !== 'undefined' &&
      window.page11InteractionState === enableOnEventFilter.state
    ) {
      setIsEnabled(true);
    }

    if (
      enableOnEvent === 'page12InteractionStateChange' &&
      getPageNumber === 12 &&
      enableOnEventFilter &&
      typeof window !== 'undefined' &&
      window.page12InteractionState === enableOnEventFilter.state
    ) {
      setIsEnabled(true);
    }

    if (
      enableOnEvent === 'page13InteractionStateChange' &&
      getPageNumber === 13 &&
      enableOnEventFilter &&
      typeof window !== 'undefined' &&
      window.page13InteractionState === enableOnEventFilter.state
    ) {
      setIsEnabled(true);
    }

    if (
      enableOnEvent === 'page18InteractionStateChange' &&
      enableOnEventFilter &&
      typeof window !== 'undefined' &&
      window.page18InteractionState === enableOnEventFilter.state
    ) {
      setIsEnabled(true);
    }
    
    window.addEventListener(enableOnEvent, handleEvent);
    console.log(`🔍 [NextButton] Listening for ${enableOnEvent} event with filter:`, enableOnEventFilter);
    
    return () => {
      window.removeEventListener(enableOnEvent, handleEvent);
    };
  }, [enableOnEvent, enableOnEventFilter, getPageNumber]);

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
      
      // Page 5 / 8: completion follows interaction state (not stale PageCompletion after re-enter)
      if (pageNumber === 5 && typeof window !== 'undefined') {
        if (window.page5InteractionState === 'state-2-packets') {
          isCompleted = true;
          console.log(`✅ [NextButton] Page 5 at state-2-packets, enabling button`);
        }
      } else if (pageNumber === 8 && typeof window !== 'undefined') {
        if (window.page8InteractionState === 'state-3-packets') {
          isCompleted = true;
          console.log(`✅ [NextButton] Page 8 at state-3-packets, enabling button`);
        }
      } else if (
        pageNumber === 9 &&
        typeof window !== 'undefined' &&
        window.page9InteractionState === 'state-4-packets'
      ) {
        isCompleted = true;
        console.log(`✅ [NextButton] Page 9 at state-4-packets, enabling button`);
      } else if (
        pageNumber === 17 &&
        typeof window !== 'undefined' &&
        window.page9InteractionState === 'state-6-packets'
      ) {
        isCompleted = true;
        console.log(`✅ [NextButton] Page 17 at state-6-packets, enabling button`);
      } else if (window.PageCompletionManager && pageNumber) {
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
            if (newPage === 5 && typeof window !== 'undefined') {
              if (window.page5InteractionState === 'state-2-packets') {
                console.log(`✅ [NextButton] Page 5 at state-2-packets after navigation, enabling button`);
                setIsEnabled(true);
              }
              return;
            }
            if (newPage === 8 && typeof window !== 'undefined') {
              if (window.page8InteractionState === 'state-3-packets') {
                console.log(`✅ [NextButton] Page 8 at state-3-packets after navigation, enabling button`);
                setIsEnabled(true);
              }
              return;
            }
            if (newPage === 9 && typeof window !== 'undefined') {
              if (window.page9InteractionState === 'state-4-packets') {
                console.log(`✅ [NextButton] Page 9 at state-4-packets after navigation, enabling button`);
                setIsEnabled(true);
              }
              return;
            }
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
          if (
            enableOnEvent === 'page11InteractionStateChange' &&
            newPage === 11 &&
            typeof window !== 'undefined' &&
            window.page11InteractionState === enableOnEventFilter?.state
          ) {
            console.log(`✅ [NextButton] Page 11 packing complete after navigation, enabling button`);
            setIsEnabled(true);
          }
          if (
            enableOnEvent === 'page12InteractionStateChange' &&
            newPage === 12 &&
            typeof window !== 'undefined' &&
            window.page12InteractionState === enableOnEventFilter?.state
          ) {
            console.log(`✅ [NextButton] Page 12 packing complete after navigation, enabling button`);
            setIsEnabled(true);
          }
          if (
            enableOnEvent === 'page13InteractionStateChange' &&
            newPage === 13 &&
            typeof window !== 'undefined' &&
            window.page13InteractionState === enableOnEventFilter?.state
          ) {
            console.log(`✅ [NextButton] Page 13 packing complete after navigation, enabling button`);
            setIsEnabled(true);
          }
        }, 200);
      }
    };

    // Do not call setIsEnabled(initialEnabled) here on mount: the reset effect above already applies
    // initialEnabled, and the enableOnEvent listener effect runs after and may enable (e.g. page 11 at
    // state-4-packets). This block previously ran after those effects and kept the next button disabled.

    window.addEventListener('pageChanged', handlePageChange);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
    };
  }, [initialEnabled, getPageNumber, enableOnEvent, enableOnEventFilter]);

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
    // Do not wrap in startTransition: navigation re-renders most of the tree and triggers
    // "large number of updates inside startTransition" warnings with no real benefit.
    otherProps.onClick?.();
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
      className: `applet-button-container next-button-container${isDisabled ? ' disabled' : ''}`,
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
    className: `next-button math-app-button${isDisabled ? ' disabled' : ''}`,
    style: fallbackStyle,
    onClick: clickHandler,
    disabled: isDisabled,
    'data-element-type': 'next-button',
    'data-disabled': isDisabled
  }, deferredText);
});

/**
 * Previous Button Component - Three Layer Structure
 */
const PreviousButtonComponent = React.memo((props) => {
  const elementId = React.useId();

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
    otherProps.onClick?.();
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
      className: 'applet-button-container previous-button-container',
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
    className: 'previous-button math-app-button',
    style: fallbackStyle,
    onClick: handleClick,
    disabled,
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
        return typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function'
          ? window.i18n.t('buttons.next')
          : 'Next';
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
          return typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function'
          ? window.i18n.t('buttons.next')
          : 'Next';
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
        return typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function'
          ? window.i18n.t('buttons.previous')
          : 'Previous';
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
          return typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function'
          ? window.i18n.t('buttons.previous')
          : 'Previous';
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
  InteractionElements
};

console.log('✅ Interaction components loaded successfully');
