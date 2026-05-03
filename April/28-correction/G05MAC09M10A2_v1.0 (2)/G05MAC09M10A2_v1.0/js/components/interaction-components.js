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
 * - hideOnEvent (string, optional) - Event name to listen for to hide the component (e.g., 'page3CheckClicked')
 * - hideOnEventFilter (object, optional) - Filter criteria for hideOnEvent
 * - showOnQuizCompleted (boolean, default: true) - If false, quizCompleted does not force this tap visible (e.g. check-button hint)
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
    hideOnEvent = null,
    hideOnEventFilter = null,
    showOnQuizCompleted = true,
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
  React.useEffect(() => {
    const pageNumber = getPageNumber;

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

  React.useEffect(() => {
    if (!hideOnEvent) return;

    const handleHide = (event) => {
      if (hideOnEventFilter) {
        const matches = Object.entries(hideOnEventFilter).every(
          ([key, value]) => event.detail?.[key] === value
        );
        if (!matches) return;
      }
      setIsVisible(false);
    };

    window.addEventListener(hideOnEvent, handleHide);
    return () => {
      window.removeEventListener(hideOnEvent, handleHide);
    };
  }, [hideOnEvent, hideOnEventFilter]);

  // Restore initial visibility when this page is reset (in-applet reset, not only navigation)
  React.useEffect(() => {
    if (getPageNumber === null) return;

    const handlePageReset = (event) => {
      if (event.detail?.page !== getPageNumber) return;
      setIsVisible(initialVisible);
    };

    window.addEventListener('pageStateReset', handlePageReset);
    window.addEventListener('globalPageReset', handlePageReset);
    return () => {
      window.removeEventListener('pageStateReset', handlePageReset);
      window.removeEventListener('globalPageReset', handlePageReset);
    };
  }, [initialVisible, getPageNumber]);
  
  // Listen for quizCompleted events to show tap animation when quiz is completed
  // (Tap animation is hidden on quiz pages initially, then shown when quiz is completed)
  React.useEffect(() => {
    if (getPageNumber === null || !showOnQuizCompleted) return;
    
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
  }, [getPageNumber, showOnQuizCompleted]);
  
  // Reset to initialVisible when page changes (to handle navigation between pages)
  React.useEffect(() => {
    if (getPageNumber === null) return;

    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      const pageNumber = getPageNumber;
      console.log(`🔍 [TapGif] Page change event: newPage=${newPage}, componentPage=${pageNumber}`);
      if (newPage === pageNumber) {
        console.log(`🔍 [TapGif] Page changed to ${pageNumber}, resetting to initialVisible: ${initialVisible}`);
        setIsVisible(initialVisible);
      }
    };

    // Also check current page on mount
    const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
    if (currentPage === getPageNumber) {
      console.log(`🔍 [TapGif] On mount, current page is ${getPageNumber}, resetting to initialVisible: ${initialVisible}`);
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

  const isPageMarkedCompleted = React.useCallback(() => {
    const pageNumber = getPageNumber;
    if (!pageNumber) return false;
    return typeof window !== 'undefined' && window.completedPages && window.completedPages[pageNumber] === true;
  }, [getPageNumber]);
  
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
    
    const shouldEnableFromCompletion =
      enableOnEvent === 'quizCompleted' && initialEnabled === false && isPageMarkedCompleted();
    console.log(`🔍 [NextButton] Resetting enabled state (currentPage: ${currentPage}, buttonPage: ${pageNumber})`, {
      initialEnabled,
      shouldEnableFromCompletion
    });
    setIsEnabled(shouldEnableFromCompletion ? true : initialEnabled);
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
        const shouldEnableFromCompletion =
          enableOnEvent === 'quizCompleted' && initialEnabled === false && isPageMarkedCompleted();
        console.log(`🔍 [NextButton] Page changed to ${getPageNumber}, restoring enabled state`, {
          initialEnabled,
          shouldEnableFromCompletion
        });
        setIsEnabled(shouldEnableFromCompletion ? true : initialEnabled);
        
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
      const shouldEnableFromCompletion =
        enableOnEvent === 'quizCompleted' && initialEnabled === false && isPageMarkedCompleted();
      console.log(`🔍 [NextButton] On mount, current page matches button page (${getPageNumber}), restoring enabled state`, {
        initialEnabled,
        shouldEnableFromCompletion
      });
      setIsEnabled(shouldEnableFromCompletion ? true : initialEnabled);
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
  InteractionElements
};

console.log('✅ Interaction components loaded successfully');
