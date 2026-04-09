/**
 * AnimatedDotComponent
 * 
 * A component that displays an animated dot that moves from a start position to an end position.
 * The dot matches the protractor center marker style (orange circle with inner dot).
 */

const AnimatedDotComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    zIndex,
    startX,
    startY,
    endX,
    endY,
    deltaXPx,
    deltaYPx,
    vertexAPos,
    vertexBPos,
    vertexCPos,
    size = "24gc",
    innerSize = "8gc",
    color = "#FF9900",
    borderColor = "#FF9900",
    borderWidth = "3gc",
    show: showProp = true
  } = props;
  
  // Debug: Log component mount and props
  React.useEffect(() => {
    if (id && id.includes('page2')) {
      // console.log('🎯 [AnimatedDot] Component mounted/updated:', {
      //   id,
      //   currentPage,
      //   pageState: typeof window !== 'undefined' ? (window.page2State || 'undefined') : 'undefined',
      //   pageStep: typeof window !== 'undefined' ? (window.page2Step !== undefined ? window.page2Step : 'undefined') : 'undefined',
      //   showProp,
      //   vertexAPos,
      //   vertexBPos,
      //   vertexCPos,
      //   startX,
      //   startY
      // });
    }
  }, [id, currentPage, showProp, vertexAPos, vertexBPos, vertexCPos, startX, startY]);

  // Helper function to get page-specific state
  const getPageState = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2State || 'C'; // Default to 'C' for page 2
    if (currentPage === 4) return window.page4State || 'C';
    if (currentPage === 6) return window.page6State || 'C';
    return null;
  }, [currentPage]);
  
  // Helper function to get page-specific step
  const getPageStep = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2Step || 1;
    if (currentPage === 4) return window.page4Step || 1;
    if (currentPage === 6) return window.page6Step || 1;
    return null;
  }, [currentPage]);
  
  // Helper function to get page-specific state changed event name
  const getPageStateChangedEventName = React.useCallback(() => {
    if (currentPage === 2) return 'pageStateChanged';
    if (currentPage === 4) return 'page4StateChanged';
    if (currentPage === 6) return 'page6StateChanged';
    return null;
  }, [currentPage]);
  
  // Helper function to get page-specific step changed event name
  const getPageStepChangedEventName = React.useCallback(() => {
    if (currentPage === 2) return 'page2StepChanged';
    if (currentPage === 4) return 'page4StepChanged';
    if (currentPage === 6) return 'page6StepChanged';
    return null;
  }, [currentPage]);

  // Check page-specific state dynamically
  const [pageState, setPageState] = React.useState(() => getPageState());

  // Track protractor position dynamically (for pages 4 and 6)
  const [protractorPosition, setProtractorPosition] = React.useState(() => {
    if (typeof window !== 'undefined' && window.protractorCenterPosition) {
      return window.protractorCenterPosition;
    }
    return { x: startX, y: startY };
  });

  // Track ruler zero mark position dynamically (for page 2). Always start null so we never use a stale value from another page.
  const [rulerZeroMarkPosition, setRulerZeroMarkPosition] = React.useState(() => null);

  // Track if protractor is being dragged
  const [isDragging, setIsDragging] = React.useState(false);

  // Track page-specific step to restart animation when dragging stops
  const [pageStep, setPageStep] = React.useState(() => getPageStep());

  // Listen for page-specific step changes
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) return;

    const checkPageStep = () => {
      const currentStep = getPageStep();
      if (currentStep !== null && currentStep !== undefined) {
        setPageStep(prevStep => {
          if (prevStep !== currentStep) {
            // console.log(`[STATE:page${currentPage}Step] Changed: ${prevStep || 'undefined'} → ${currentStep} (AnimatedDotComponent - interval check)`);
            return currentStep;
          }
          return prevStep;
        });
      }
    };

    // Check immediately
    checkPageStep();

    // Set up interval to check for step changes
    const interval = setInterval(checkPageStep, 100);

    // Listen for custom events
    const stepEventName = getPageStepChangedEventName();
    const handleStepChange = () => checkPageStep();
    if (stepEventName) {
      window.addEventListener(stepEventName, handleStepChange);
    }

    return () => {
      clearInterval(interval);
      if (stepEventName) {
        window.removeEventListener(stepEventName, handleStepChange);
      }
    };
  }, [currentPage, getPageStep, getPageStepChangedEventName]);

  // Listen for page-specific state changes
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) return;

    const handlePageStateChange = () => {
      const currentState = getPageState();
      if (currentState !== null) {
        setPageState(prevState => {
          if (prevState !== currentState) {
            // console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${currentState} (AnimatedDotComponent - event handler)`);
            return currentState;
          }
          return prevState;
        });
      }
    };

    // Check state periodically
    const interval = setInterval(() => {
      const currentState = getPageState();
      if (currentState !== null && currentState !== pageState) {
        setPageState(prevState => {
          if (prevState !== currentState) {
            // console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${currentState} (AnimatedDotComponent - interval check)`);
            return currentState;
          }
          return prevState;
        });
      }
    }, 100);

    // Listen for custom events
    const stateEventName = getPageStateChangedEventName();
    if (typeof window !== 'undefined' && stateEventName) {
      window.addEventListener(stateEventName, handlePageStateChange);
    }

    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined' && stateEventName) {
        window.removeEventListener(stateEventName, handlePageStateChange);
      }
    };
  }, [currentPage, pageState, getPageState, getPageStateChangedEventName]);

  // Sync ruler zero mark position on mount (useLayoutEffect so we read after ruler has set it, before paint)
  // Page 2 and page 4 both use ruler zero mark for "from" position
  React.useLayoutEffect(() => {
    if (currentPage !== 2 && currentPage !== 4) return;
    if (typeof window !== 'undefined' && window.rulerZeroMarkPosition && window.rulerZeroMarkPosition.x !== undefined && window.rulerZeroMarkPosition.y !== undefined) {
      setRulerZeroMarkPosition({ x: window.rulerZeroMarkPosition.x, y: window.rulerZeroMarkPosition.y });
    }
    const rafId = requestAnimationFrame(() => {
      if (typeof window !== 'undefined' && window.rulerZeroMarkPosition && window.rulerZeroMarkPosition.x !== undefined && window.rulerZeroMarkPosition.y !== undefined) {
        setRulerZeroMarkPosition(prev => {
          const pos = window.rulerZeroMarkPosition;
          if (!prev || prev.x !== pos.x || prev.y !== pos.y) return { x: pos.x, y: pos.y };
          return prev;
        });
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [currentPage]);

  // Listen for ruler zero mark position changes (for page 2 and page 4 - both use ruler)
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4) return;
    
    const handleRulerPositionChange = (event) => {
      const { zeroMarkPos } = event.detail || {};
      if (zeroMarkPos && zeroMarkPos.x !== undefined && zeroMarkPos.y !== undefined) {
        setRulerZeroMarkPosition(prevPos => {
          if (!prevPos || prevPos.x !== zeroMarkPos.x || prevPos.y !== zeroMarkPos.y) {
            // console.log(`[STATE:rulerZeroMarkPosition] Changed: (${prevPos?.x || 'N/A'}, ${prevPos?.y || 'N/A'}) → (${zeroMarkPos.x}, ${zeroMarkPos.y}) (AnimatedDotComponent - event)`);
            return { x: zeroMarkPos.x, y: zeroMarkPos.y };
          }
          return prevPos;
        });
      }
    };
    
    // Check window.rulerZeroMarkPosition immediately on mount
    const checkRulerPosition = () => {
      if (typeof window !== 'undefined') {
        if (window.rulerZeroMarkPosition) {
          const pos = window.rulerZeroMarkPosition;
          setRulerZeroMarkPosition(prev => {
            if (!prev || prev.x !== pos.x || prev.y !== pos.y) {
              // console.log(`[STATE:rulerZeroMarkPosition] Changed: (${prev?.x || 'N/A'}, ${prev?.y || 'N/A'}) → (${pos.x}, ${pos.y}) (AnimatedDotComponent - check)`);
              return pos;
            }
            return prev;
          });
        } else {
          // console.log('⚠️ [AnimatedDot] window.rulerZeroMarkPosition is not set yet');
        }
      }
    };
    
    // Check immediately on mount
    checkRulerPosition();
    
    // Multiple delayed checks so we catch ruler's initial emit and 120ms/350ms refinements (no dependency on mount order)
    const t100 = setTimeout(checkRulerPosition, 100);
    const t200 = setTimeout(checkRulerPosition, 200);
    const t400 = setTimeout(checkRulerPosition, 400);
    
    // Also check periodically in case ruler emits position after mount
    const interval = setInterval(checkRulerPosition, 50);
    
    if (typeof window !== 'undefined') {
      window.addEventListener('rulerPositionChanged', handleRulerPositionChange);
    }
    
    return () => {
      clearTimeout(t100);
      clearTimeout(t200);
      clearTimeout(t400);
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('rulerPositionChanged', handleRulerPositionChange);
      }
    };
  }, [currentPage]);
  
  // Listen for protractor position changes (for pages 4 and 6)
  // Track last drag event time to detect when dragging truly stops
  const lastDragEventTimeRef = React.useRef(0);
  
  React.useEffect(() => {
    if (currentPage !== 4 && currentPage !== 6) return;

    const handleProtractorPositionChange = (event) => {
      const { x, y, isDragging: dragging } = event.detail || {};
      if (x !== undefined && y !== undefined) {
        const now = Date.now();
        // Track when we receive a dragging event
        if (dragging) {
          lastDragEventTimeRef.current = now;
        }
        
        setProtractorPosition(prevPos => {
          if (!prevPos || prevPos.x !== x || prevPos.y !== y) {
            // console.log(`[STATE:protractorPosition] Changed: (${prevPos?.x || 'N/A'}, ${prevPos?.y || 'N/A'}) → (${x}, ${y}) [Dragging: ${dragging || false}] (AnimatedDotComponent)`);
            return { x, y };
          }
          return prevPos;
        });
        setIsDragging(prevDragging => {
          const newDragging = dragging || false;
          if (prevDragging !== newDragging) {
            // console.log(`[STATE:protractorDragging] Changed: ${prevDragging} → ${newDragging} (AnimatedDotComponent - event)`);
            return newDragging;
          }
          return prevDragging;
        });
        // console.log('📍 [AnimatedDot] Protractor position updated:', { x, y, isDragging: dragging });
      }
    };

    // Also check window.protractorCenterPosition periodically
    const checkPosition = () => {
      if (typeof window !== 'undefined' && window.protractorCenterPosition) {
        const pos = window.protractorCenterPosition;
        setProtractorPosition(prev => {
          if (prev.x !== pos.x || prev.y !== pos.y) {
            // console.log(`[STATE:protractorPosition] Changed: (${prev.x}, ${prev.y}) → (${pos.x}, ${pos.y}) (AnimatedDotComponent - interval check)`);
            return pos;
          }
          return prev;
        });
      }
    };

    const interval = setInterval(checkPosition, 50);

    if (typeof window !== 'undefined') {
      window.addEventListener('protractorPositionChanged', handleProtractorPositionChange);
    }

    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('protractorPositionChanged', handleProtractorPositionChange);
      }
    };
  }, [currentPage]);

  // Determine target vertex: use step config animatedDotTarget when available (page 2/4/6), else fallback by state
  const targetVertex = React.useMemo(() => {
    if (currentPage === 2 && typeof window !== 'undefined' && window.getPage2StepConfig) {
      const stepConfig = window.getPage2StepConfig(pageState, pageStep);
      const target = stepConfig?.animatedDotTarget;
      if (target === 'A' && vertexAPos) return vertexAPos;
      if (target === 'B' && vertexBPos) return vertexBPos;
      if (target === 'C' && vertexCPos) return vertexCPos;
    }
    if (currentPage === 4 && typeof window !== 'undefined' && window.getPage4StepConfig) {
      const stepConfig = window.getPage4StepConfig(pageState, pageStep);
      const target = stepConfig?.animatedDotTarget;
      if (target === 'A' && vertexAPos) return vertexAPos;
      if (target === 'B' && vertexBPos) return vertexBPos;
      if (target === 'C' && vertexCPos) return vertexCPos;
    }
    if (currentPage === 6 && typeof window !== 'undefined' && window.getPage6StepConfig) {
      const stepConfig = window.getPage6StepConfig(pageState, pageStep);
      const target = stepConfig?.animatedDotTarget;
      if (target === 'A' && vertexAPos) return vertexAPos;
      if (target === 'B' && vertexBPos) return vertexBPos;
      if (target === 'C' && vertexCPos) return vertexCPos;
    }
    // Fallback: state name maps to vertex (A→vertexA, B→vertexB, C→vertexC)
    if (pageState === 'A' && vertexAPos) return vertexAPos;
    if (pageState === 'B' && vertexBPos) return vertexBPos;
    if (pageState === 'C' && vertexCPos) return vertexCPos;
    return vertexCPos || vertexBPos || vertexAPos;
  }, [currentPage, pageState, pageStep, vertexAPos, vertexBPos, vertexCPos]);

  // Only show when page-specific state is A, B, or C, step === 1, and showProp is true
  const show = showProp && (currentPage === 2 || currentPage === 4 || currentPage === 6) && pageStep === 1 && (pageState === 'A' || pageState === 'B' || pageState === 'C');
  
  // Debug visibility calculation
  React.useEffect(() => {
    if (id && id.includes('page2')) {
      // console.log('🔍 [AnimatedDot] Visibility check:', {
      //   id,
      //   currentPage,
      //   pageState,
      //   pageStep,
      //   showProp,
      //   show,
      //   rulerZeroMarkPosition,
      //   protractorPosition
      // });
    }
  }, [id, currentPage, pageState, pageStep, showProp, show, rulerZeroMarkPosition, protractorPosition]);

  // Convert GC units to pixels
  const gcToPx = React.useMemo(() => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    return {
      x: viewportWidth / 1600,
      y: viewportHeight / 900
    };
  }, []);

  // Convert GC size to pixels
  const sizePx = React.useMemo(() => {
    const sizeNum = parseFloat(size.replace('gc', ''));
    return sizeNum * gcToPx.x;
  }, [size, gcToPx]);

  const innerSizePx = React.useMemo(() => {
    const innerSizeNum = parseFloat(innerSize.replace('gc', ''));
    return innerSizeNum * gcToPx.x;
  }, [innerSize, gcToPx]);

  const borderWidthPx = React.useMemo(() => {
    const borderWidthNum = parseFloat(borderWidth.replace('gc', ''));
    return borderWidthNum * gcToPx.x;
  }, [borderWidth, gcToPx]);

  // Calculate container position (start position) - use dynamic protractor/ruler position
  const containerStyle = React.useMemo(() => {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    
    // Page 2 and page 4: use ruler zero mark position (pixels). Page 6: use protractor position.
    let x1, y1;
    if (currentPage === 2 || currentPage === 4) {
      if (rulerZeroMarkPosition && rulerZeroMarkPosition.x !== undefined && rulerZeroMarkPosition.y !== undefined) {
        x1 = rulerZeroMarkPosition.x;
        y1 = rulerZeroMarkPosition.y;
      } else {
        return {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: zIndex || 10001,
          pointerEvents: 'none',
          display: 'none'
        };
      }
    } else if (currentPage === 6 && protractorPosition && protractorPosition.x !== undefined && protractorPosition.y !== undefined) {
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      x1 = (protractorPosition.x / gridCols) * viewportWidth;
      y1 = (protractorPosition.y / gridRows) * viewportHeight;
    } else if (coordinates && coordinates.length === 4) {
      // Coordinates are in grid coordinates (gc), convert to pixels
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      x1 = (coordinates[0] / gridCols) * viewportWidth;
      y1 = (coordinates[1] / gridRows) * viewportHeight;
    } else {
      return {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: zIndex || 10001,
        pointerEvents: 'none',
        display: show ? 'block' : 'none'
      };
    }

    // Convert pixels to percentage
    const left = (x1 / viewportWidth) * 100;
    const top = (y1 / viewportHeight) * 100;

    return {
      position: 'absolute',
      left: `${left}%`,
      top: `${top}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: zIndex || 10001,
      pointerEvents: 'none',
      display: show ? 'block' : 'none'
    };
  }, [currentPage, rulerZeroMarkPosition, protractorPosition, coordinates, zIndex, show]);

  // Use dynamic protractor/ruler position as start position (or fallback to props)
  const currentStartX = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4) {
      if (rulerZeroMarkPosition && rulerZeroMarkPosition.x !== undefined) {
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return (rulerZeroMarkPosition.x / viewportWidth) * gridCols;
      }
      return null;
    }
    if (currentPage === 6 && protractorPosition && protractorPosition.x !== undefined) {
      return protractorPosition.x;
    }
    return startX;
  }, [currentPage, rulerZeroMarkPosition, protractorPosition, startX]);
  
  const currentStartY = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4) {
      if (rulerZeroMarkPosition && rulerZeroMarkPosition.y !== undefined) {
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
        const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        return (rulerZeroMarkPosition.y / viewportHeight) * gridRows;
      }
      return null;
    }
    if (currentPage === 6 && protractorPosition && protractorPosition.y !== undefined) {
      return protractorPosition.y;
    }
    return startY;
  }, [currentPage, rulerZeroMarkPosition, protractorPosition, startY]);

  // Calculate animation delta dynamically based on target vertex and current protractor/ruler position
  const animationDelta = React.useMemo(() => {
    if ((currentPage === 2 || currentPage === 4) && !rulerZeroMarkPosition) {
      return { x: 0, y: 0 };
    }
    if ((currentPage === 2 || currentPage === 4) && (currentStartX === null || currentStartY === null)) {
      return { x: 0, y: 0 };
    }
    
    if (!targetVertex || currentStartX === null || currentStartX === undefined || currentStartY === null || currentStartY === undefined) {
      // console.log('⚠️ [AnimatedDot] Missing target vertex or start position:', {
      //   targetVertex,
      //   currentStartX,
      //   currentStartY,
      //   currentPage,
      //   rulerZeroMarkPosition,
      //   protractorPosition
      // });
      return { x: 0, y: 0 };
    }
    
    // Calculate delta in pixels based on current viewport
    // currentStartX/Y are in grid coordinates (gc), convert to pixels
    const startXPx = currentStartX * gcToPx.x;
    const startYPx = currentStartY * gcToPx.y;
    const endXPx = targetVertex.x * gcToPx.x;
    const endYPx = targetVertex.y * gcToPx.y;
    
    // console.log('🎯 [AnimatedDot] Animation delta calculation:', {
    //   currentPage,
    //   pageState,
    //   pageStep,
    //   currentStartX,
    //   currentStartY,
    //   targetVertex,
    //   startXPx,
    //   startYPx,
    //   endXPx,
    //   endYPx,
    //   rulerZeroMarkPosition,
    //   show
    // });
    
    const calculatedDeltaX = endXPx - startXPx;
    const calculatedDeltaY = endYPx - startYPx;
    
    // console.log('🔍 [AnimatedDot] Animation delta:', {
    //   pageState,
    //   targetVertex,
    //   currentStartX, currentStartY,
    //   endX: targetVertex.x, endY: targetVertex.y,
    //   calculatedDeltaX, calculatedDeltaY,
    //   isDragging,
    //   gcToPx
    // });
    
    return { x: calculatedDeltaX, y: calculatedDeltaY };
  }, [currentStartX, currentStartY, targetVertex, pageState, isDragging, gcToPx, currentPage, rulerZeroMarkPosition, protractorPosition]);
  
  // Create keyframes dynamically using inline style
  // Stop animation when dragging, restart when dragging stops and page2Step === 1
  const animationKeyframes = React.useMemo(() => {
    if ((currentPage === 2 || currentPage === 4) && !rulerZeroMarkPosition) {
      return null;
    }
    
    // Don't animate when dragging
    if (isDragging) {
      // console.log('⏸️ [AnimatedDot] Animation paused - protractor is being dragged');
      return null;
    }
    
    // Only animate when page2Step === 1
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && pageStep !== 1) {
      // console.log(`⏸️ [AnimatedDot] Animation paused - page${currentPage}Step is ${pageStep}, not 1`);
      return null;
    }
    
    if (!animationDelta || (animationDelta.x === 0 && animationDelta.y === 0)) {
      // console.log('⚠️ [AnimatedDot] No animation delta, skipping keyframes');
      return null;
    }
    
    const animationName = `dotMove-${id || 'default'}`;
    const keyframes = `
      @keyframes ${animationName} {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(${animationDelta.x}px, ${animationDelta.y}px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `;
    
    // Inject keyframes into a style element
    const styleId = `dot-animation-${id || 'default'}`;
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
      // console.log(`✅ [AnimatedDot] Created style element: ${styleId}`);
    }
    styleElement.textContent = keyframes;
    // console.log(`✅ [AnimatedDot] Injected keyframes: ${animationName} with delta (${animationDelta.x}px, ${animationDelta.y}px)`);
    
    return animationName;
  }, [animationDelta, id, pageState, isDragging, pageStep, currentPage, rulerZeroMarkPosition]);
  
  // Debug logging (after animationKeyframes is defined)
  React.useEffect(() => {
    if (currentPage === 2) {
      // console.log('🔍 [AnimatedDot] State check:', {
      //   currentPage,
      //   pageStep,
      //   windowPageStep: typeof window !== 'undefined' ? getPageStep() : 'undefined',
      //   isDragging,
      //   showProp,
      //   show,
      //   animationKeyframes: animationKeyframes ? 'active' : 'paused'
      // });
    }
  }, [currentPage, pageStep, isDragging, showProp, show, animationKeyframes]);
  
  // Track animation restart counter to force remount when dragging stops and page2Step === 1
  const [animationRestartCounter, setAnimationRestartCounter] = React.useState(0);
  
  // Track previous dragging state to detect when dragging stops
  const prevIsDraggingRef = React.useRef(isDragging);
  const restartTimeoutRef = React.useRef(null);
  
  // Monitor when dragging stops and page2Step === 1 to restart animation
  React.useEffect(() => {
    // Clear any existing timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    // Only restart if dragging just stopped (was true, now false) and page2Step === 1
    const wasDragging = prevIsDraggingRef.current;
    const isNowDragging = isDragging;
    
    // console.log(`🔍 [AnimatedDot] Dragging state check: was=${wasDragging}, now=${isNowDragging}, pageStep=${pageStep}, currentPage=${currentPage}`);
    
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && wasDragging === true && isNowDragging === false && pageStep === 1) {
      // Capture the timestamp when dragging stopped
      const dragStopTime = Date.now();
      const lastDragTimeAtStop = lastDragEventTimeRef.current;
      
      // Use a delay and continuously check that dragging stays false
      restartTimeoutRef.current = setTimeout(() => {
        // Check if we've received any NEW drag events since we detected the stop
        const timeSinceLastDrag = Date.now() - (lastDragEventTimeRef.current || 0);
        const timeSinceStop = Date.now() - dragStopTime;
        const noNewDragEvents = lastDragEventTimeRef.current === lastDragTimeAtStop;
        
        // Get current state values (may have changed)
        const currentIsDragging = isDragging;
        const currentPageStep = pageStep;
        
        // console.log(`🔍 [AnimatedDot] Restart check: isDragging=${currentIsDragging}, pageStep=${currentPageStep}, timeSinceStop=${timeSinceStop}ms, timeSinceLastDrag=${timeSinceLastDrag}ms, noNewDragEvents=${noNewDragEvents}, lastDragTimeAtStop=${lastDragTimeAtStop}, currentLastDrag=${lastDragEventTimeRef.current}`);
        
        // Double-check that we're still not dragging and pageStep is still 1
        // Also verify no new drag events were received since we detected the stop
        if (!currentIsDragging && currentPageStep === 1 && noNewDragEvents && timeSinceStop >= 500) {
          setAnimationRestartCounter(prev => {
            const newCounter = prev + 1;
            // console.log(`🔄 [AnimatedDot] Restarting animation - counter: ${prev} → ${newCounter} (dragging stopped: ${wasDragging} → ${isNowDragging}, pageStep === ${currentPageStep}, timeSinceStop=${timeSinceStop}ms)`);
            return newCounter;
          });
        } else {
          // console.log(`⏸️ [AnimatedDot] Animation restart cancelled - isDragging=${currentIsDragging}, pageStep=${currentPageStep}, timeSinceStop=${timeSinceStop}ms, noNewDragEvents=${noNewDragEvents}`);
        }
        
        restartTimeoutRef.current = null;
      }, 500); // 500ms delay to ensure state has stabilized
    } else if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && isNowDragging === true && pageStep === 1) {
      // If dragging starts again, clear any pending restart
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
        // console.log(`⏸️ [AnimatedDot] Cancelled animation restart - dragging started again`);
      }
    }
    
    // Update ref to track previous state for next render
    prevIsDraggingRef.current = isDragging;
    
    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };
  }, [isDragging, pageStep, currentPage]);
  
  // Create animation key that changes when animation should restart
  const animationKey = React.useMemo(() => {
    // Key includes restart counter to force remount when dragging stops
    return `dot-animation-${id || 'default'}-${animationRestartCounter}`;
  }, [id, animationRestartCounter]);
  
  // Cleanup style element on unmount
  React.useEffect(() => {
    return () => {
      const styleId = `dot-animation-${id || 'default'}`;
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [id]);

  // Debug: Log when component should be visible
  React.useEffect(() => {
    if (currentPage === 2) {
      // console.log(`🔍 [AnimatedDot] Render check:`, {
      //   show,
      //   currentPage,
      //   pageState,
      //   windowPageState: typeof window !== 'undefined' ? getPageState() : 'undefined',
      //   targetVertex,
      //   showProp,
      //   animationKeyframes,
      //   animationDelta
      // });
    }
  }, [show, currentPage, pageState, targetVertex, showProp, animationKeyframes, animationDelta]);

  if (!show) {
    // console.log(`⚠️ [AnimatedDot] Not showing - show=${show}, currentPage=${currentPage}, pageState=${pageState}`);
    return null;
  }

  // console.log(`✅ [AnimatedDot] Rendering with animation: ${animationKeyframes || 'none'}`);

  return React.createElement('div', {
    id: id || `animated-dot-${elementName}`,
    className: 'animated-dot-container',
    style: containerStyle
  }, [
    React.createElement('svg', {
      key: animationKey, // Use animationKey to force remount and restart animation
      width: sizePx * 2,
      height: sizePx * 2,
      viewBox: `0 0 ${sizePx * 2} ${sizePx * 2}`,
      style: animationKeyframes ? {
        animation: `${animationKeyframes} 2s ease-in-out infinite`,
        willChange: 'transform',
        transform: 'translateZ(0)'
      } : {
        willChange: 'transform',
        transform: 'translateZ(0)'
      }
    }, [
      // Outer circle (border)
      React.createElement('circle', {
        key: 'outer-circle',
        cx: sizePx,
        cy: sizePx,
        r: sizePx - borderWidthPx / 2,
        fill: 'none',
        stroke: borderColor,
        strokeWidth: borderWidthPx
      }),
      // Inner circle (fill)
      React.createElement('circle', {
        key: 'inner-circle',
        cx: sizePx,
        cy: sizePx,
        r: innerSizePx,
        fill: color
      })
    ])
  ]);
});

AnimatedDotComponent.displayName = 'AnimatedDotComponent';

// Export component
if (typeof window !== 'undefined') {
  window.AnimatedDotComponent = { AnimatedDotComponent };
  // console.log('✅ AnimatedDotComponent loaded and exported to window.AnimatedDotComponent');
} else {
  // console.warn('⚠️ AnimatedDotComponent: window is undefined, cannot export');
}
