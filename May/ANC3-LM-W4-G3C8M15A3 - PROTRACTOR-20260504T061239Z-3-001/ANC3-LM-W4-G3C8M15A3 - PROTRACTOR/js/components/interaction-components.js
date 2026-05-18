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
 * Tap GIF Component - Shows/hides based on quiz panel completion state
 * Uses the same logic as NextButtonComponent
 */
const TapGifComponent = React.memo((props) => {
  const elementId = React.useId();
  const [pageCompleted, setPageCompleted] = React.useState(false);
  const [enabledByEvent, setEnabledByEvent] = React.useState(null); // null = use page completion, true/false = override
  
  const {
    position,
    processedStyles,
    elementZIndex,
    imageSrc = 'assets/tap.gif',
    imageAlt = 'Tap',
    enabled, // Prop to enable/disable (overrides page completion if set)
    opacity = 1,
    scale, // Optional: scale factor for the image (e.g. 1.2 = 20% larger)
    ...otherProps
  } = props;
  
  // Get current page number
  const getCurrentPage = () => {
    return typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;
  };
  
  // Update page completion state when page changes or completion changes
  React.useEffect(() => {
    const updatePageCompleted = () => {
      const currentPage = getCurrentPage();
      if (window.PageCompletionManager) {
        const completed = window.PageCompletionManager.getPageCompleted(currentPage);
        setPageCompleted(completed);
        console.log(`🔍 [TapGif] Page ${currentPage} completed: ${completed}`);
      }
    };
    
    // Update on mount
    updatePageCompleted();
    
    // Listen for page changes — reset enabledByEvent so tap stays hidden on pages 3–6 until animation completes
    const handlePageChange = () => {
      setEnabledByEvent(null);
      setTimeout(updatePageCompleted, 150); // Wait for DOM to update
    };
    
    // Listen for page completion changes
    const handlePageCompletionChanged = (event) => {
      const currentPage = getCurrentPage();
      if (event.detail.pageNumber === currentPage) {
        setPageCompleted(event.detail.completed);
        console.log(`🔍 [TapGif] Page ${currentPage} completion changed: ${event.detail.completed}`);
      }
    };
    
    window.addEventListener('pageChanged', handlePageChange);
    window.addEventListener('pageCompletionChanged', handlePageCompletionChanged);
    
    // Listen for page 3 animation completion event
    const handlePage3AnimationComplete = (event) => {
      console.log('🔍 [TapGif] Page 3 animation complete event received');
      setEnabledByEvent(true);
    };
    
    // Listen for page 4 animation completion event
    const handlePage4AnimationComplete = (event) => {
      console.log('🔍 [TapGif] Page 4 animation complete event received');
      setEnabledByEvent(true);
    };
    
    // Listen for page 5 animation completion event
    const handlePage5AnimationComplete = (event) => {
      console.log('🔍 [TapGif] Page 5 animation complete event received');
      setEnabledByEvent(true);
    };
    
    // Listen for page 6 animation completion event
    const handlePage6AnimationComplete = (event) => {
      console.log('🔍 [TapGif] Page 6 animation complete event received');
      setEnabledByEvent(true);
    };
    
    window.addEventListener('page3AnimationComplete', handlePage3AnimationComplete);
    window.addEventListener('page4AnimationComplete', handlePage4AnimationComplete);
    window.addEventListener('page5AnimationComplete', handlePage5AnimationComplete);
    window.addEventListener('page6AnimationComplete', handlePage6AnimationComplete);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
      window.removeEventListener('pageCompletionChanged', handlePageCompletionChanged);
      window.removeEventListener('page3AnimationComplete', handlePage3AnimationComplete);
      window.removeEventListener('page4AnimationComplete', handlePage4AnimationComplete);
      window.removeEventListener('page5AnimationComplete', handlePage5AnimationComplete);
      window.removeEventListener('page6AnimationComplete', handlePage6AnimationComplete);
    };
  }, []);
  
  // Determine visibility (tap follows next button: hidden until animation completes, then show):
  // - If enabledByEvent is set (animation complete event fired), use it — allows tap to show when animation completes even when enabled: false
  // - Else if enabled prop is explicitly false, hide (e.g. pages 3–6 start with next disabled)
  // - Else if enabled is true or pageCompleted, show
  const isEnabled = (enabledByEvent !== null && enabledByEvent !== undefined)
    ? enabledByEvent
    : (enabled === false ? false : (enabled !== undefined ? enabled : pageCompleted));
  const shouldHide = !isEnabled;
  
  console.log('🔍 [TapGif] Visibility state:', {
    enabled,
    enabledByEvent,
    pageCompleted,
    isEnabled,
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
    opacity,
    ...(scale != null && scale !== 1 ? { overflow: 'visible' } : {})
  };
  
  const imgElement = React.createElement('img', {
    src: imageSrc,
    alt: imageAlt,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      pointerEvents: 'none',
      ...(scale != null && scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: 'center' } : {})
    }
  });
  const content = scale != null && scale !== 1
    ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' } }, imgElement)
    : imgElement;

  return React.createElement('div', {
    id: elementId,
    className: 'tap-gif-container',
    style: containerStyle,
    'data-element-type': 'tap-gif'
  }, content);
});

/**
 * Next Button Component - Three Layer Structure
 */
const NextButtonComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const [pageCompleted, setPageCompleted] = React.useState(false);
  const [enabledByEvent, setEnabledByEvent] = React.useState(null); // null = use page completion, true/false = override
  
  // Use ref to store current enabled state for click handler
  const enabledStateRef = React.useRef({ enabled: null, enabledByEvent: null, pageCompleted: false, disabled: false });
  
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
    enabled, // Prop to enable/disable (overrides page completion if set)
    opacity = '1',
    pulsate = false,
    allowHTML = false,
    ...otherProps
  } = props;

  // Get current page number
  const getCurrentPage = () => {
    return typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;
  };
  
  // Update page completion state when page changes or completion changes
  React.useEffect(() => {
    const updatePageCompleted = () => {
      const currentPage = getCurrentPage();
      if (window.PageCompletionManager) {
        const completed = window.PageCompletionManager.getPageCompleted(currentPage);
        setPageCompleted(completed);
        console.log(`🔍 [NextButton] Page ${currentPage} completed: ${completed}`);
      }
    };
    
    // Update on mount
    updatePageCompleted();
    
    // Listen for page changes — reset enabledByEvent so next button starts disabled on pages 4–6 until animation completes
    const handlePageChange = () => {
      setEnabledByEvent(null);
      setTimeout(updatePageCompleted, 150); // Wait for DOM to update
    };
    
    // Listen for page completion changes
    const handlePageCompletionChanged = (event) => {
      const currentPage = getCurrentPage();
      if (event.detail.pageNumber === currentPage) {
        setPageCompleted(event.detail.completed);
        console.log(`🔍 [NextButton] Page ${currentPage} completion changed: ${event.detail.completed}`);
      }
    };
    
    window.addEventListener('pageChanged', handlePageChange);
    window.addEventListener('pageCompletionChanged', handlePageCompletionChanged);
    
    // Listen for page 3 animation completion event
    const handlePage3AnimationComplete = (event) => {
      console.log('🔍 [NextButton] Page 3 animation complete event received');
      setEnabledByEvent(true);
    };
    
    // Listen for page 4 animation completion event
    const handlePage4AnimationComplete = (event) => {
      console.log('🔍 [NextButton] Page 4 animation complete event received');
      setEnabledByEvent(true);
    };
    
    // Listen for page 5 animation completion event
    const handlePage5AnimationComplete = (event) => {
      console.log('🔍 [NextButton] Page 5 animation complete event received');
      setEnabledByEvent(true);
    };
    
    // Listen for page 6 animation completion event
    const handlePage6AnimationComplete = (event) => {
      console.log('🔍 [NextButton] Page 6 animation complete event received');
      setEnabledByEvent(true);
    };
    
    window.addEventListener('page3AnimationComplete', handlePage3AnimationComplete);
    window.addEventListener('page4AnimationComplete', handlePage4AnimationComplete);
    window.addEventListener('page5AnimationComplete', handlePage5AnimationComplete);
    window.addEventListener('page6AnimationComplete', handlePage6AnimationComplete);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
      window.removeEventListener('pageCompletionChanged', handlePageCompletionChanged);
      window.removeEventListener('page3AnimationComplete', handlePage3AnimationComplete);
      window.removeEventListener('page4AnimationComplete', handlePage4AnimationComplete);
      window.removeEventListener('page5AnimationComplete', handlePage5AnimationComplete);
      window.removeEventListener('page6AnimationComplete', handlePage6AnimationComplete);
    };
  }, []);
  

  // Determine if button should be disabled:
  // - If enabledByEvent is set to true (from custom event), it can override enabled: false (allows enabling via event)
  // - If enabled prop is explicitly set to false AND enabledByEvent is not true, disable
  // - If enabled prop is explicitly set to true, use it
  // - Otherwise, use disabled prop or page completion state
  const isEnabled = (enabledByEvent === true) ? true : (enabled === false ? false : (enabled !== undefined ? enabled : pageCompleted));
  const isDisabled = disabled || !isEnabled;
  
  // Update ref with current state for click handler
  React.useEffect(() => {
    enabledStateRef.current = { enabled, enabledByEvent, pageCompleted, disabled, isEnabled, isDisabled };
  }, [enabled, enabledByEvent, pageCompleted, disabled, isEnabled, isDisabled]);
  
  console.log('🔍 [NextButton] Disabled state calculation:', {
    disabled,
    enabled,
    enabledByEvent,
    pageCompleted,
    isEnabled,
    finalDisabled: isDisabled,
    reason: isDisabled ? 
      (disabled ? 'explicitly disabled' : 
       (enabled === false ? 'explicitly disabled via enabled prop' :
        (enabledByEvent === false ? 'disabled by event' :
         'page not completed'))) : 
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
    // Read current state from ref at click time (ensures we have latest values)
    const currentState = enabledStateRef.current;
    
    // Recalculate isEnabled at click time to ensure we have the latest logic
    const clickTimeIsEnabled = (currentState.enabledByEvent === true) ? true : 
      (currentState.enabled === false ? false : 
       (currentState.enabled !== undefined ? currentState.enabled : currentState.pageCompleted));
    const clickTimeIsDisabled = currentState.disabled || !clickTimeIsEnabled;
    
    if (clickTimeIsDisabled) {
      console.log('🔍 [NextButton] Click ignored - button is disabled', {
        ...currentState,
        clickTimeIsEnabled,
        clickTimeIsDisabled,
        calculation: `enabledByEvent=${currentState.enabledByEvent}, enabled=${currentState.enabled}, pageCompleted=${currentState.pageCompleted}`
      });
      return;
    }
    
    console.log('🔍 [NextButton] Click handler executing', {
      ...currentState,
      clickTimeIsEnabled,
      hasOnClick: !!otherProps.onClick
    });
    
    if (otherProps.onClick) {
      startTransition(() => {
        otherProps.onClick();
      });
    } else {
      console.warn('🔍 [NextButton] No onClick handler provided');
    }
  }, [otherProps.onClick]);

  // Always attach click handler - it will check disabled state internally
  const clickHandler = handleClick;
  
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
      onMouseDown: (e) => {
        // Prevent click if disabled, but allow React to handle it
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      'data-element-type': 'next-button',
      'data-disabled': isDisabled,
      'data-enabled': isEnabled
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
        
        const useHtmlContent = allowHTML && typeof deferredText === 'string' && deferredText.includes('<');
        return React.createElement('div', {
          key: 'content',
          className: 'applet-button-content next-button-content',
          style: contentStyle,
          ...(useHtmlContent ? { dangerouslySetInnerHTML: { __html: deferredText } } : { children: deferredText })
        });
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
  
  const useHtmlContentFallback = allowHTML && typeof deferredText === 'string' && deferredText.includes('<');
  return React.createElement('button', {
    id: elementId,
    className: `next-button math-app-button${isPending ? ' pending' : ''}${isDisabled ? ' disabled' : ''}`,
    style: fallbackStyle,
    onClick: clickHandler,
    disabled: isDisabled || isPending,
    'data-element-type': 'next-button',
    'data-disabled': isDisabled,
    ...(useHtmlContentFallback ? { dangerouslySetInnerHTML: { __html: deferredText } } : { children: deferredText })
  });
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
