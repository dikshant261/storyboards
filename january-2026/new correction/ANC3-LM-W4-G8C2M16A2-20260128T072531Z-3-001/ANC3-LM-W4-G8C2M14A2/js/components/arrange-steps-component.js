/**
 * Arrange Steps Component - React 18 Optimized
 * 
 * This component displays shuffled steps as draggable buttons that users can reorder.
 * Auto-validates after each move and triggers quiz completion when correctly arranged.
 * 
 * UX Design Principles:
 * - Destination should be more visually prominent than the dragged object
 * - Uses "destination slot" instead of line indicators
 * - Neighbors displacement creates a "corridor effect"
 * - Dragged item morphs toward its future state
 * - Drop moment should feel boring (minimal animation)
 */

// Dependencies: React, Draggable component should be loaded before this file

/**
 * Arrange Steps Component
 */
const ArrangeStepsComponent = React.memo((props) => {
  const elementId = React.useId();
  const componentId = props.id || elementId;
  
  // Extract page number from component ID (e.g., 'page8-arrange-steps' -> 'page8')
  const pageMatch = componentId.match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : 'page1';
  const feedbackStateKey = `${pageId}FeedbackState`;
  const feedbackEventName = `${pageId}FeedbackUpdate`;
  
  const {
    position,
    processedStyles,
    elementZIndex,
    // Steps array (correct order)
    steps = [],
    // Step labels (optional - if provided, used instead of "Step 1", "Step 2", etc.)
    stepLabels = null, // Array of strings like ['2.a', '2.b', '2.c'] or null for default
    // Layout orientation
    orientation = 'vertical', // 'vertical' or 'horizontal'
    // Button styling
    initialButtonColor = '#FFA500', // Default orange color (--color-orange)
    buttonColor, // Deprecated, use initialButtonColor
    buttonFontColor = '#000000',
    buttonFontSize = '24gc',
    buttonFontWeight = 700, // Font weight for button text (default: 700)
    buttonBorderRadius = '8gc',
    buttonPadding = '12gc',
    gap = '10gc',
    // Feedback colors
    correctColor = '#10b981',
    incorrectColor = '#ef4444',
    // Feedback settings
    showFeedback = true,
    showFeedbackText = true, // Toggle visibility of feedback text (default: true)
    feedbackText = { correct: 'Correct! Steps are in the right order.', incorrect: 'Not quite. Try rearranging the steps.' },
    // Sound settings
    playDropSound = true, // Play click sound when item is dropped
    // Instruction text
    instructionText = 'Drag to arrange in correct order',
    showInstructionText = true, // Toggle visibility of instruction text (default: true)
    instructionFontSize = '20gc',
    instructionFontColor = '#ffffff',
    instructionTextAlign = 'left', // Text alignment for instruction text: 'left', 'center', 'right' (default: 'left')
    instructionFontWeight = 'normal', // Font weight for instruction text: 'normal', 'bold', 'lighter', etc. (default: 'normal')
    instructionRowHeight = 20, // Percentage of container height for instruction text (default: 20%)
    stepsContainerWidth = 80, // Percentage of container width for steps container (default: 80%)
    stepsContainerBackgroundColor = 'transparent', // Background color for entire container (default: transparent, use 'rgba(0, 0, 0, 0.3)' for black opaque like solution steps)
    // Container styling
    containerBackgroundColor = 'transparent', // Note: stepsContainerBackgroundColor takes precedence if set
    containerBorderWidth = '0gc',
    containerBorderColor = 'transparent',
    containerBorderType = 'solid',
    // Panel update props (similar to FillBlanksComponent)
    keyConcepts = [],
    impFormulae = [],
    // Tap animation props
    showTapAnimation = false, // Show tap.gif animation on first bar
    tapAnimationOpacity = 0.4, // Opacity of tap animation (40%)
    tapAnimationDuration = 1000, // Duration of move-down animation in ms (deprecated, use tapAnimationCycleDuration)
    tapAnimationCycleDuration = 3000, // Duration of full cycle through all bars in ms
    tapAnimationSrc = 'assets/tap.gif', // Source of tap animation image
    // Step number box props
    stepNumberBackgroundColor = '#4A3728', // Dark purple/maroon for step boxes
    stepNumberBorderColor = '#6B5344', // Border color for step boxes
    stepNumberTextColor = '#ffffff', // Text color for step boxes
    stepNumberFontSize = '28gc', // Font size for step numbers
    stepNumberFontWeight = 700, // Font weight for step numbers (default: 700)
    stepNumberBorderRadius = '12gc', // Border radius for step boxes
    stepNumberPadding = '10gc', // Padding for step boxes
    stepNumberBorderWidth = '2gc', // Border width for step boxes
    stepBarColor = 'var(--color-rose-light)', // Color for step number boxes (default: --color-rose-light)
    rowColumnMargin = '5gc', // Margin on all sides for rows and columns (default: 5gc)
    showRowColumnBorders = false, // Toggle visibility of borders for rows and columns (default: false)
    leftColumnWidth = '20%', // Width of the left column (step number box) - default: 20%
    
    // NEW: Destination-focused UX props
    // Destination slot styling
    slotBackgroundColor = 'rgba(255, 200, 100, 0.06)', // Warm tint for destination
    slotGlowColor = 'rgba(255, 200, 100, 0.25)', // Glow color for breathing animation
    slotGlowDuration = 1000, // ms for breathing cycle
    slotBorderColor = 'rgba(255, 200, 100, 0.4)', // Border color for slot
    
    // Displacement settings
    neighborDisplacement = '6gc', // How far neighbors shift
    displacementDuration = 150, // ms
    
    // Morphing settings
    draggedScaleOnDrag = 0.98, // Scale while dragging
    draggedShadowOnDrag = 'none', // Shadow while dragging (flat)
    
    // Origin fade
    originOpacity = 0.7, // Opacity of origin placeholder
    
    // Drop animation
    settleDuration = 50 // ms for soft settle animation
  } = props;
  
  // Process gc units using GridCellFontUtils
  const processGcProperty = (value, propertyType = 'fontSize') => {
    if (value && typeof value === 'string' && value.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(value, propertyType);
    }
    return value;
  };
  
  const processedButtonFontSize = processGcProperty(buttonFontSize, 'fontSize');
  const processedButtonBorderRadius = processGcProperty(buttonBorderRadius, 'borderRadius');
  const processedButtonPadding = processGcProperty(buttonPadding, 'padding');
  const processedGap = processGcProperty(gap, 'gap');
  const processedInstructionFontSize = processGcProperty(instructionFontSize, 'fontSize');
  const processedContainerBorderWidth = processGcProperty(containerBorderWidth, 'borderWidth');
  const processedStepNumberFontSize = processGcProperty(stepNumberFontSize, 'fontSize');
  const processedStepNumberBorderRadius = processGcProperty(stepNumberBorderRadius, 'borderRadius');
  const processedStepNumberPadding = processGcProperty(stepNumberPadding, 'padding');
  const processedStepNumberBorderWidth = processGcProperty(stepNumberBorderWidth, 'borderWidth');
  const processedRowColumnMargin = processGcProperty(rowColumnMargin, 'margin');
  const processedNeighborDisplacement = processGcProperty(neighborDisplacement, 'margin');
  // Process fixed height values (convert 60px to 60gc and process)
  const processedRowHeight = processGcProperty('60gc', 'height');
  const processedTapAnimationSize = processGcProperty('50gc', 'width');
  const processedMinWidth = processGcProperty('100gc', 'minWidth');
  // Process border widths (convert px to gc)
  const processedBorderWidth1 = processGcProperty('1gc', 'borderWidth');
  const processedBorderWidth2 = processGcProperty('2gc', 'borderWidth');
  const processedBorderWidth3 = processGcProperty('3gc', 'borderWidth');
  
  // Use initialButtonColor or fallback to buttonColor for backwards compatibility
  const activeButtonColor = initialButtonColor || buttonColor || '#FFA500';
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = React.useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);
  
  // Create initial shuffled indices
  const createShuffledIndices = React.useCallback(() => {
    const indices = steps.map((_, index) => index);
    // Keep shuffling until NO step is in its correct position (if more than 1 step)
    if (steps.length > 1) {
      let shuffled = shuffleArray(indices);
      // Check if any step is in its correct position
      const hasAnyCorrectPosition = (order) => {
        return order.some((stepIndex, position) => stepIndex === position);
      };
      
      // Keep shuffling until no step is in correct position
      let attempts = 0;
      while (hasAnyCorrectPosition(shuffled) && attempts < 1000) {
        shuffled = shuffleArray(indices);
        attempts++;
      }
      
      // If we couldn't find a perfect derangement after 1000 attempts,
      // try a few more times with a different approach
      if (hasAnyCorrectPosition(shuffled) && attempts >= 1000) {
        // Try a more aggressive shuffle: swap each element with a random other element
        shuffled = [...indices];
        for (let i = 0; i < shuffled.length; i++) {
          let swapIndex;
          do {
            swapIndex = Math.floor(Math.random() * shuffled.length);
          } while (swapIndex === i); // Ensure we swap with a different position
          [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
        }
        
        // Verify no correct positions
        attempts = 0;
        while (hasAnyCorrectPosition(shuffled) && attempts < 100) {
          shuffled = shuffleArray(indices);
          attempts++;
        }
      }
      
      return shuffled;
    }
    return indices;
  }, [steps, shuffleArray]);
  
  // Track if initial shuffle has been done for this component
  const initialShuffleRef = React.useRef(null);
  // Track if we just initialized to skip sync effect
  const justInitializedRef = React.useRef(false);
  
  // State for current order (array of indices into steps array)
  const [currentOrder, setCurrentOrder] = React.useState([]);
  // Visual order during drag (for preview, doesn't affect actual order until drop)
  const [visualOrder, setVisualOrder] = React.useState([]);
  const [isComplete, setIsComplete] = React.useState(false);
  const [feedbackState, setFeedbackState] = React.useState(null); // null, 'correct', 'incorrect'
  const [currentFeedbackText, setCurrentFeedbackText] = React.useState('');
  const [draggedIndex, setDraggedIndex] = React.useState(null); // Position in currentOrder
  const [draggedStepIndex, setDraggedStepIndex] = React.useState(null); // The actual stepIndex being dragged
  const [destinationSlotIndex, setDestinationSlotIndex] = React.useState(null); // Where the slot appears
  const [originIndex, setOriginIndex] = React.useState(null); // Original position of dragged item
  const [dragDirection, setDragDirection] = React.useState(null); // 'up' or 'down' for micro-nudges
  const [lastMouseY, setLastMouseY] = React.useState(null); // Track mouse Y for direction
  const [isSettling, setIsSettling] = React.useState(false); // For soft settle animation
  // Track if first rearrangement has happened (to hide tap animation)
  const [hasFirstRearrangement, setHasFirstRearrangement] = React.useState(false);
  // Track dragging state for immediate updates (used by Draggable component)
  const [isAnyDraggingState, setIsAnyDraggingState] = React.useState(false);
  
  // Ref for container (used for querying draggable items)
  const containerRef = React.useRef(null);
  // Ref to track previous target index to prevent unnecessary updates
  const previousTargetIndexRef = React.useRef(null);
  // Refs to access current state values in callbacks (avoid stale closures)
  const visualOrderRef = React.useRef(visualOrder);
  const draggedStepIndexRef = React.useRef(draggedStepIndex);
  const draggedIndexRef = React.useRef(draggedIndex);
  // Ref to track if we're actively dragging (for immediate updates)
  const isDraggingRef = React.useRef(false);
  // Ref to track if current drag is using touch (to prevent DOM reordering during touch drag)
  const isTouchDragRef = React.useRef(false);
  
  // Keep refs in sync with state
  React.useEffect(() => {
    visualOrderRef.current = visualOrder;
  }, [visualOrder]);
  
  React.useEffect(() => {
    draggedStepIndexRef.current = draggedStepIndex;
    draggedIndexRef.current = draggedIndex;
    isDraggingRef.current = draggedStepIndex !== null;
  }, [draggedStepIndex, draggedIndex]);
  
  // Debug: Track isAnyDraggingState changes
  React.useEffect(() => {
    console.log('🔄 [ArrangeSteps] isAnyDraggingState changed:', {
      isAnyDraggingState,
      draggedStepIndex,
      draggedIndex,
      timestamp: Date.now()
    });
  }, [isAnyDraggingState, draggedStepIndex, draggedIndex]);
  
  // Initialize global state store if it doesn't exist
  if (typeof window !== 'undefined' && !window.arrangeStepsStateStore) {
    window.arrangeStepsStateStore = {};
  }
  
  // Restore or initialize state when componentId changes (page navigation)
  React.useEffect(() => {
    const stateKey = componentId;
    const savedState = window.arrangeStepsStateStore?.[stateKey];
    
    if (savedState && savedState.currentOrder && savedState.currentOrder.length > 0) {
      justInitializedRef.current = true;
      setCurrentOrder(savedState.currentOrder);
      setVisualOrder(savedState.currentOrder);
      visualOrderRef.current = savedState.currentOrder;
      const restoredIsComplete = savedState.isComplete || false;
      setIsComplete(restoredIsComplete);
      setFeedbackState(savedState.feedbackState || null);
      setCurrentFeedbackText(savedState.feedbackText || '');
      setHasFirstRearrangement(savedState.hasFirstRearrangement || false);
      initialShuffleRef.current = componentId;
      
      // If quiz was already completed, ensure page completion is set
      if (restoredIsComplete && typeof window !== 'undefined') {
        const pageNumber = window.getCurrentPage?.() || null;
        if (pageNumber && window.PageCompletionManager) {
          window.PageCompletionManager.markPageCompleted(pageNumber);
        }
        // Also dispatch quizCompleted event to ensure next button is enabled
        const enableNextEvent = new CustomEvent('quizCompleted', {
          detail: {
            componentId: componentId,
            componentType: 'ArrangeStepsComponent',
            pageNumber: pageNumber
          }
        });
        window.dispatchEvent(enableNextEvent);
      }
      
      setTimeout(() => { justInitializedRef.current = false; }, 0);
    } else if (steps.length > 0 && initialShuffleRef.current !== componentId) {
      justInitializedRef.current = true;
      const newOrder = createShuffledIndices();
      setCurrentOrder(newOrder);
      setVisualOrder(newOrder);
      visualOrderRef.current = newOrder;
      setIsComplete(false);
      setFeedbackState(null);
      setCurrentFeedbackText('');
      setHasFirstRearrangement(false);
      initialShuffleRef.current = componentId;
      setTimeout(() => { justInitializedRef.current = false; }, 0);
    }
  }, [componentId, steps.length]);
  
  // Sync visual order with current order when current order changes (but not during drag)
  React.useEffect(() => {
    if (justInitializedRef.current) {
      return;
    }
    if (draggedIndex === null && draggedStepIndex === null && currentOrder.length > 0) {
      // Use functional update to avoid stale closure issues
      setVisualOrder(prevVisualOrder => {
        // Prevent unnecessary updates
        if (prevVisualOrder.length !== currentOrder.length) {
          return currentOrder;
        }
        const isDifferent = prevVisualOrder.some((val, idx) => val !== currentOrder[idx]);
        // Only update if actually different
        if (!isDifferent) {
          return prevVisualOrder; // Return same reference to prevent re-render
        }
        return currentOrder;
      });
    }
  }, [currentOrder, draggedIndex, draggedStepIndex]);
  
  // Save state to global store whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.arrangeStepsStateStore) {
      window.arrangeStepsStateStore[componentId] = {
        currentOrder,
        isComplete,
        feedbackState,
        feedbackText: currentFeedbackText,
        hasFirstRearrangement
      };
    }
  }, [componentId, currentOrder, isComplete, feedbackState, currentFeedbackText, hasFirstRearrangement]);
  
  // Calculate bar positions for tap animation cycle
  const calculateBarPositions = React.useMemo(() => {
    if (!showTapAnimation || steps.length === 0) return [];
    
    const paddingValue = typeof processedButtonPadding === 'string' ? 
      parseFloat(processedButtonPadding) || 15 : 
      (typeof processedButtonPadding === 'number' ? processedButtonPadding : 15);
    const barHeight = 60;
    const gapValue = typeof processedGap === 'string' ? 
      parseFloat(processedGap) || 15 : 
      (typeof processedGap === 'number' ? processedGap : 15);
    
    const positions = [];
    let currentTop = gapValue + (barHeight / 2);
    
    for (let i = 0; i < steps.length; i++) {
      positions.push(currentTop);
      if (i < steps.length - 1) {
        currentTop += barHeight + gapValue;
      }
    }
    
    return positions;
  }, [showTapAnimation, steps.length, processedGap, processedButtonPadding]);
  
  // Tap animation keyframes
  const tapAnimationKeyframes = React.useMemo(() => {
    if (!calculateBarPositions || calculateBarPositions.length === 0) return '';
    
    const positions = calculateBarPositions;
    const numBars = positions.length;
    
    let keyframeString = '@keyframes tapCycleThroughBars {\n';
    
    positions.forEach((pos, index) => {
      const percentage = (index / numBars) * 100;
      keyframeString += `  ${percentage}% { top: ${pos}px; }\n`;
    });
    
    keyframeString += `  100% { top: ${positions[0]}px; }\n`;
    keyframeString += '}';
    
    return keyframeString;
  }, [calculateBarPositions]);
  
  // Check if current order matches correct order
  const checkCorrectOrder = (order) => {
    return order.every((stepIndex, position) => stepIndex === position);
  };
  
  // Update concept summary panel
  const updateConceptSummaryPanel = () => {
    if (typeof window !== 'undefined') {
      if (keyConcepts && keyConcepts.length > 0) {
        const updateKeyConceptsEvent = new CustomEvent('updateKeyConcepts', {
          detail: { keyConcepts }
        });
        window.dispatchEvent(updateKeyConceptsEvent);
      }
      
      if (impFormulae && impFormulae.length > 0) {
        const updateFormulaeEvent = new CustomEvent('updateImpFormulae', {
          detail: { impFormulae }
        });
        window.dispatchEvent(updateFormulaeEvent);
      }
    }
  };
  
  // Handle drag start
  const handleDragStart = (draggableId, position) => {
    console.log('🚀 [ArrangeSteps] handleDragStart called:', {
      draggableId,
      position,
      currentDraggedStepIndex: draggedStepIndex,
      isAnyDraggingState
    });
    
    if (draggedStepIndex !== null) {
      console.log('⚠️ [ArrangeSteps] Drag already in progress, ignoring');
      return;
    }
    
    const stepIndex = parseInt(draggableId.replace('step-', ''), 10);
    const actualDisplayIndex = currentOrder.indexOf(stepIndex);
    
    console.log('✅ [ArrangeSteps] Starting drag:', {
      stepIndex,
      actualDisplayIndex,
      currentOrder: [...currentOrder]
    });
    
    setDraggedIndex(actualDisplayIndex);
    setDraggedStepIndex(stepIndex);
    draggedStepIndexRef.current = stepIndex;
    draggedIndexRef.current = actualDisplayIndex;
    isDraggingRef.current = true;
    setIsAnyDraggingState(true); // Update state immediately for React re-render
    setOriginIndex(actualDisplayIndex); // Track original position for origin fade
    setDestinationSlotIndex(null); // Reset destination
    setDragDirection(null);
    setLastMouseY(position.y);
    setVisualOrder(currentOrder);
    visualOrderRef.current = currentOrder;
    previousTargetIndexRef.current = null;
    isTouchDragRef.current = false; // Reset touch drag detection
    
    console.log('🎯 [ArrangeSteps] Drag state set:', {
      draggedStepIndex: stepIndex,
      isDraggingRef: isDraggingRef.current,
      isAnyDraggingState: true
    });
  };
  
  // Handle drag move - calculate destination slot and update visual order
  const handleDragMove = React.useCallback((draggableId, mousePosition) => {
    console.log('📍 [ArrangeSteps] handleDragMove called:', {
      draggableId,
      mousePosition,
      draggedStepIndexRef: draggedStepIndexRef.current,
      hasContainer: !!containerRef.current
    });
    
    const currentVisualOrder = visualOrderRef.current;
    const currentDraggedStepIndex = draggedStepIndexRef.current;
    
    if (currentDraggedStepIndex === null || !containerRef.current) {
      console.log('⚠️ [ArrangeSteps] handleDragMove: Early return', {
        currentDraggedStepIndex,
        hasContainer: !!containerRef.current
      });
      return;
    }
    
    const stepIndexFromId = parseInt(draggableId.replace('step-', ''), 10);
    
    if (stepIndexFromId !== currentDraggedStepIndex) {
      console.log('⚠️ [ArrangeSteps] handleDragMove: stepIndex mismatch', {
        stepIndexFromId,
        currentDraggedStepIndex
      });
      return;
    }
    
    // Detect if this is a touch device
    // On touch devices, skip visual order updates during drag to prevent browser from canceling touch
    // This is safer than trying to detect active touches, which may not be reliable
    if (!isTouchDragRef.current) {
      const isTouchDevice = typeof window !== 'undefined' && 
                           ('ontouchstart' in window || 
                            (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
                            (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0));
      
      if (isTouchDevice) {
        isTouchDragRef.current = true;
        console.log('👆 [ArrangeSteps] Touch device detected - will skip visual order updates during drag to prevent touch cancellation');
      }
    }
    
    // Track drag direction for micro-nudges
    if (lastMouseY !== null) {
      const deltaY = mousePosition.y - lastMouseY;
      if (Math.abs(deltaY) > 3) { // Threshold to avoid jitter
        setDragDirection(deltaY > 0 ? 'down' : 'up');
      }
    }
    setLastMouseY(mousePosition.y);
    
    // Calculate target index using simple proportional calculation
    // This uses fixed container positions that don't change during drag
    const numSteps = currentOrder.length;
    let targetIndex = 0;
    
    if (numSteps > 0 && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      
      if (orientation === 'vertical') {
        // Calculate target based on mouse Y position relative to container bounds
        const relativeY = mousePosition.y - containerRect.top;
        const zoneHeight = containerRect.height / numSteps;
        targetIndex = Math.floor(relativeY / zoneHeight);
      } else {
        // Calculate target based on mouse X position relative to container bounds
        const relativeX = mousePosition.x - containerRect.left;
        const zoneWidth = containerRect.width / numSteps;
        targetIndex = Math.floor(relativeX / zoneWidth);
      }
      
      console.log('🎯 [ArrangeSteps] Proportional zone calculation:', {
        mousePosition,
        containerRect: { top: containerRect.top, left: containerRect.left, height: containerRect.height, width: containerRect.width },
        targetIndex,
        numSteps
      });
    }
    
    // Clamp targetIndex to valid range (0 to numSteps-1)
    targetIndex = Math.max(0, Math.min(targetIndex, numSteps - 1));
    
    const previousTarget = previousTargetIndexRef.current;
    
    // Update whenever target changes
    if (targetIndex !== previousTarget) {
      console.log('🔄 [ArrangeSteps] Updating visual order:', {
        targetIndex,
        previousTarget,
        currentVisualOrder: [...currentVisualOrder],
        isTouchDrag: isTouchDragRef.current
      });
      previousTargetIndexRef.current = targetIndex;
      
      // Set destination slot index (where the "empty chair" appears)
      // The slot appears AT the target position
      setDestinationSlotIndex(targetIndex);
      
      // For touch drags, skip visual order updates during drag to prevent DOM reordering
      // which causes the browser to cancel the touch sequence
      // The visual order will update on drag end
      if (isTouchDragRef.current) {
        console.log('👆 [ArrangeSteps] Skipping visual order update for touch drag (will update on drop)');
        return;
      }
      
      // For mouse drags, update visual order immediately for preview
      // Use requestAnimationFrame to batch the update
      requestAnimationFrame(() => {
        // Update visual order for preview
        // Always update based on target index - this allows jumping multiple positions at once
        setVisualOrder(prevVisualOrder => {
        const newVisualOrder = [...prevVisualOrder];
        const draggedItemIndex = newVisualOrder.findIndex(stepIdx => stepIdx === currentDraggedStepIndex);
        
        console.log('🔄 [ArrangeSteps] Inside setVisualOrder:', {
          prevVisualOrder: [...prevVisualOrder],
          draggedItemIndex,
          targetIndex,
          currentDraggedStepIndex
        });
        
        if (draggedItemIndex !== -1) {
          // Remove the dragged item from its current position
          const [removed] = newVisualOrder.splice(draggedItemIndex, 1);
          
          // Calculate the correct insert index
          // After removing the item, the array is shorter by 1
          // The targetIndex represents where we want the item to be in the FINAL array (after insertion)
          // targetIndex is 0-based and can be 0 to numSteps (inclusive, where numSteps means "at the end")
          let adjustedInsertIndex;
          
          // If targetIndex is at or beyond the original array length, insert at the end
          if (targetIndex >= prevVisualOrder.length) {
            adjustedInsertIndex = newVisualOrder.length;
          } else if (draggedItemIndex < targetIndex) {
            // Moving forward: targetIndex is where we want the item in the FINAL array
            // After removing the item, the array is shorter, but targetIndex still represents
            // the position in the final array. So we insert at targetIndex in the shortened array.
            // Example: [A, B, C], move A (0) to position 1 → want [B, A, C]
            // After remove: [B, C], insert at 1 → [B, A, C] ✓
            // Example: [A, B, C], move A (0) to position 2 → want [B, C, A]
            // After remove: [B, C], insert at 2 (length) → [B, C, A] ✓
            adjustedInsertIndex = targetIndex;
          } else {
            // Moving backward: items before targetIndex are unaffected by removal
            // So we can insert directly at targetIndex
            adjustedInsertIndex = targetIndex;
          }
          
          // Clamp the insert index to valid range (0 to newVisualOrder.length)
          const finalInsertIndex = Math.max(0, Math.min(adjustedInsertIndex, newVisualOrder.length));
          
          console.log('🔢 [ArrangeSteps] Insert index calculation:', {
            draggedItemIndex,
            targetIndex,
            prevVisualOrderLength: prevVisualOrder.length,
            newVisualOrderLength: newVisualOrder.length,
            adjustedInsertIndex,
            finalInsertIndex,
            willBeAtFinalPos: finalInsertIndex,
            prevOrder: [...prevVisualOrder],
            newOrderAfterInsert: (() => {
              const test = [...newVisualOrder];
              test.splice(finalInsertIndex, 0, removed);
              return test;
            })()
          });
          
        console.log('🔄 [ArrangeSteps] Reordering:', {
          draggedItemIndex,
          targetIndex,
          adjustedInsertIndex,
          finalInsertIndex,
          newVisualOrderBeforeInsert: [...newVisualOrder],
          removedItem: removed
        });
        
        // Always update to the target position (allows jumping multiple positions)
        newVisualOrder.splice(finalInsertIndex, 0, removed);
        
        console.log('✅ [ArrangeSteps] New visual order:', {
          newVisualOrder: [...newVisualOrder],
          oldVisualOrder: [...prevVisualOrder],
          draggedStepIndex: currentDraggedStepIndex,
          finalPosition: newVisualOrder.findIndex(stepIdx => stepIdx === currentDraggedStepIndex)
        });
          
          // Update ref immediately for next calculation
          visualOrderRef.current = newVisualOrder;
          return newVisualOrder;
        }
        
        console.log('⚠️ [ArrangeSteps] Dragged item not found in visual order');
        // Return same array if dragged item not found (shouldn't happen)
        return prevVisualOrder;
        });
      });
    }
  }, [orientation, lastMouseY, currentOrder]);
  
  // Handle drag end - reorder items with soft settle
  const handleDragEnd = (draggableId, position) => {
    // Use refs to get current values (synchronous, won't be stale)
    let currentDraggedStepIndex = draggedStepIndexRef.current;
    let currentDraggedIndex = draggedIndexRef.current;
    const currentVisualOrder = visualOrderRef.current;
    
    // If refs are null, try to derive from draggableId (fallback)
    if (currentDraggedStepIndex === null && draggableId) {
      const stepIndex = parseInt(draggableId.replace('step-', ''), 10);
      const actualDisplayIndex = currentOrder.indexOf(stepIndex);
      if (actualDisplayIndex !== -1) {
        console.log('🔄 [ArrangeSteps] Recovering drag state from draggableId:', {
          draggableId,
          stepIndex,
          actualDisplayIndex
        });
        currentDraggedStepIndex = stepIndex;
        currentDraggedIndex = actualDisplayIndex;
        // Update refs immediately
        draggedStepIndexRef.current = stepIndex;
        draggedIndexRef.current = actualDisplayIndex;
      }
    }
    
    console.log('🏁 [ArrangeSteps] handleDragEnd called:', {
      draggableId,
      position,
      draggedIndex: currentDraggedIndex,
      draggedStepIndex: currentDraggedStepIndex,
      draggedIndexState: draggedIndex,
      draggedStepIndexState: draggedStepIndex,
      isComplete,
      isAnyDraggingState,
      isDraggingRef: isDraggingRef.current
    });
    
    if (currentDraggedIndex === null || currentDraggedStepIndex === null || isComplete) {
      console.log('⚠️ [ArrangeSteps] Invalid drag end state, clearing anyway');
      // Clear all drag state immediately
      draggedStepIndexRef.current = null;
      draggedIndexRef.current = null;
      isDraggingRef.current = false;
      previousTargetIndexRef.current = null;
      setIsAnyDraggingState(false); // Update state to trigger re-render
      setDraggedIndex(null);
      setDraggedStepIndex(null);
      setDestinationSlotIndex(null);
      setOriginIndex(null);
      setDragDirection(null);
      console.log('✅ [ArrangeSteps] Drag state cleared (early return)');
      return;
    }
    
    // Capture values before clearing state (use refs for reliable values)
    const capturedDraggedStepIndex = currentDraggedStepIndex;
    const capturedDraggedIndex = currentDraggedIndex;
    const wasTouchDrag = isTouchDragRef.current;
    const finalTargetIndex = previousTargetIndexRef.current; // Last calculated target for touch drags
    // Use the ref directly to get the most up-to-date visual order
    let capturedVisualOrder = [...visualOrderRef.current];
    const capturedCurrentOrder = [...currentOrder];
    
    // For touch drags, visual order wasn't updated during drag, so calculate it now
    if (wasTouchDrag && finalTargetIndex !== null) {
      console.log('👆 [ArrangeSteps] Touch drag ended - calculating final visual order:', {
        finalTargetIndex,
        capturedVisualOrder,
        capturedDraggedStepIndex
      });
      const newVisualOrder = [...capturedCurrentOrder];
      const draggedItemIndex = newVisualOrder.findIndex(stepIdx => stepIdx === capturedDraggedStepIndex);
      if (draggedItemIndex !== -1) {
        const [removed] = newVisualOrder.splice(draggedItemIndex, 1);
        const adjustedInsertIndex = draggedItemIndex < finalTargetIndex ? finalTargetIndex : finalTargetIndex;
        const finalInsertIndex = Math.max(0, Math.min(adjustedInsertIndex, newVisualOrder.length));
        newVisualOrder.splice(finalInsertIndex, 0, removed);
        capturedVisualOrder = newVisualOrder;
        // Update visual order ref and state
        visualOrderRef.current = newVisualOrder;
        setVisualOrder(newVisualOrder);
      }
    }
    
    console.log('📦 [ArrangeSteps] Captured values before clearing:', {
      capturedDraggedStepIndex,
      capturedDraggedIndex,
      capturedVisualOrder,
      capturedCurrentOrder,
      wasTouchDrag,
      finalTargetIndex
    });
    
    // Clear drag state IMMEDIATELY to prevent items from being disabled
    // Update refs first for immediate effect (refs update synchronously)
    isDraggingRef.current = false;
    draggedStepIndexRef.current = null;
    draggedIndexRef.current = null;
    previousTargetIndexRef.current = null;
    isTouchDragRef.current = false; // Reset touch drag flag
    // Update state immediately to trigger re-render (state updates are batched but will trigger render)
    setIsAnyDraggingState(false); // This will trigger re-render and enable all items
    setDraggedIndex(null);
    setDraggedStepIndex(null);
    setDestinationSlotIndex(null);
    setOriginIndex(null);
    setDragDirection(null);
    setLastMouseY(null);
    
    console.log('✅ [ArrangeSteps] Drag state cleared:', {
      isDraggingRef: isDraggingRef.current,
      draggedStepIndexRef: draggedStepIndexRef.current,
      isAnyDraggingState: false,
      'state updates queued': true
    });
    
    const finalVisualPos = capturedVisualOrder.findIndex(stepIdx => stepIdx === capturedDraggedStepIndex);
    const originalPos = capturedCurrentOrder.findIndex(stepIdx => stepIdx === capturedDraggedStepIndex);
    
    console.log('📍 [ArrangeSteps] Position comparison:', {
      finalVisualPos,
      originalPos,
      capturedDraggedStepIndex,
      capturedVisualOrder: [...capturedVisualOrder],
      capturedCurrentOrder: [...capturedCurrentOrder],
      willUpdate: finalVisualPos !== originalPos,
      stepAtFinalPos: capturedVisualOrder[finalVisualPos],
      stepAtOriginalPos: capturedCurrentOrder[originalPos],
      visualOrderRef: [...visualOrderRef.current]
    });
    
    // Trigger soft settle animation
    setIsSettling(true);
    setTimeout(() => setIsSettling(false), settleDuration);
    
    if (finalVisualPos !== originalPos) {
      console.log('✅ [ArrangeSteps] Updating currentOrder:', {
        originalPos,
        finalVisualPos,
        capturedDraggedStepIndex
      });
      if (!hasFirstRearrangement) {
        setHasFirstRearrangement(true);
      }
      
      setCurrentOrder(prevOrder => {
        const newOrder = [...prevOrder];
        const [removed] = newOrder.splice(originalPos, 1);
        // Insert at finalVisualPos directly (same logic as setVisualOrder)
        // After removing the item, the array is shorter, but finalVisualPos represents
        // the position in the final array, so we insert at finalVisualPos
        const insertIndex = finalVisualPos;
        newOrder.splice(insertIndex, 0, removed);
        
        console.log('✅ [ArrangeSteps] currentOrder updated:', {
          oldOrder: [...capturedCurrentOrder],
          newOrder: [...newOrder]
        });
        return newOrder;
      });
      
      // Calculate new order from captured values (not from state to avoid stale closure)
      const newOrder = [...capturedCurrentOrder];
      const [removed] = newOrder.splice(originalPos, 1);
      const insertIndex = finalVisualPos;
      newOrder.splice(insertIndex, 0, removed);
      
      // Update visual order and check completion AFTER currentOrder update
      // Use setTimeout to ensure this runs after the state update completes
      setTimeout(() => {
        setVisualOrder(newOrder);
        visualOrderRef.current = newOrder;
        
        if (playDropSound && typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('click');
        }
        
        const isCorrect = checkCorrectOrder(newOrder);
        
        if (isCorrect && !isComplete) {
          setIsComplete(true);
          if (showFeedback) {
            setFeedbackState('correct');
            setCurrentFeedbackText(feedbackText.correct || 'Correct! Steps are in the right order.');
          }
          
          if (typeof window !== 'undefined' && window.playCarClickSound) {
            window.playCarClickSound('correct');
          }
          
          if (typeof window !== 'undefined') {
            const enableNextEvent = new CustomEvent('quizCompleted', {
              detail: {
                componentId: componentId,
                componentType: 'ArrangeStepsComponent',
                pageNumber: window.getCurrentPage?.() || null
              }
            });
            window.dispatchEvent(enableNextEvent);
          }
          
          updateConceptSummaryPanel();
        } else if (!isCorrect && showFeedback) {
          setFeedbackState('incorrect');
          setCurrentFeedbackText(feedbackText.incorrect || 'Not quite. Try rearranging the steps.');
          
          setTimeout(() => {
            setFeedbackState(null);
            setCurrentFeedbackText('');
          }, 2000);
        }
      }, 0);
    } else {
      console.log('⚠️ [ArrangeSteps] No position change, keeping current order:', {
        finalVisualPos,
        originalPos,
        capturedVisualOrder: [...capturedVisualOrder],
        capturedCurrentOrder: [...capturedCurrentOrder],
        capturedDraggedStepIndex
      });
      setVisualOrder(capturedCurrentOrder);
      visualOrderRef.current = capturedCurrentOrder;
    }
  };
  
  // Update global feedback state
  React.useEffect(() => {
    if (!showFeedbackText) {
      // If feedback text is disabled, clear it
      if (window[feedbackStateKey]) {
        window[feedbackStateKey].text = '';
        window[feedbackStateKey].mode = 'normal';
      }
      return;
    }
    
    if (!window[feedbackStateKey]) {
      window[feedbackStateKey] = {
        text: '',
        mode: 'normal'
      };
    }
    
    if (currentFeedbackText && feedbackState) {
      window[feedbackStateKey].text = currentFeedbackText;
      window[feedbackStateKey].mode = feedbackState === 'correct' ? 'correct' : 'incorrect';
    } else {
      const existingState = window[feedbackStateKey];
      if (existingState && existingState.mode !== 'summary') {
        window[feedbackStateKey].text = '';
        window[feedbackStateKey].mode = 'normal';
      }
    }
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(feedbackEventName, {
        detail: {
          text: window[feedbackStateKey].text,
          mode: window[feedbackStateKey].mode
        }
      }));
    }
  }, [feedbackState, currentFeedbackText, feedbackStateKey, feedbackEventName, showFeedbackText]);
  
  // Get Draggable component
  const Draggable = window.DraggableComponent?.Draggable;
  
  if (!Draggable) {
    console.error('❌ [ArrangeSteps] Draggable component not found!');
    return React.createElement('div', {
      style: { color: 'red', padding: processGcProperty('20gc', 'padding') }
    }, 'Error: Draggable component not loaded');
  }
  
  // Don't render if order not yet initialized
  if (!currentOrder || currentOrder.length === 0) {
    return React.createElement('div', {
      style: { color: '#ffffff', padding: processGcProperty('20gc', 'padding') }
    }, 'Loading...');
  }
  
  // Calculate right column width
  const rightColumnWidth = typeof leftColumnWidth === 'string' && leftColumnWidth.includes('%') 
    ? `${100 - parseFloat(leftColumnWidth)}%` 
    : `calc(100% - ${leftColumnWidth})`;
  
  // Render destination slot (the "empty chair waiting to be filled")
  const renderDestinationSlot = () => {
    if (destinationSlotIndex === null || !isDraggingRef.current) {
      return null;
    }
    
    const slotStyle = {
      backgroundColor: slotBackgroundColor,
      border: `2px solid ${slotBorderColor}`,
      borderRadius: processedButtonBorderRadius,
      minHeight: processedRowHeight,
      width: '100%',
      boxSizing: 'border-box',
      animation: `breathingGlow ${slotGlowDuration}ms ease-in-out infinite`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `all ${displacementDuration}ms ease-out`
    };
    
    return React.createElement('div', {
      key: 'destination-slot',
      className: 'drag-destination-slot',
      style: slotStyle
    });
  };
  
  // Render step rows with destination-focused UX
  const renderSteps = () => {
    const orderToRender = isDraggingRef.current ? visualOrder : currentOrder;
    const draggedVisualIndex = isDraggingRef.current && draggedStepIndexRef.current !== null 
      ? visualOrder.findIndex(stepIdx => stepIdx === draggedStepIndexRef.current) 
      : null;
    
    console.log('🎨 [ArrangeSteps] renderSteps called:', {
      isDraggingRef: isDraggingRef.current,
      isAnyDraggingState,
      draggedStepIndex,
      draggedStepIndexRef: draggedStepIndexRef.current,
      orderToRender: [...orderToRender],
      currentOrder: [...currentOrder],
      visualOrder: [...visualOrder]
    });
    
    const rows = [];
    
    orderToRender.forEach((stepIndex, displayIndex) => {
      const stepText = steps[stepIndex];
      const isCorrectPosition = stepIndex === displayIndex;
      // Check both ref and state - ref is source of truth for active dragging
      const currentDraggedStepIndex = isDraggingRef.current ? (draggedStepIndexRef.current || draggedStepIndex) : null;
      const isThisDraggedItem = currentDraggedStepIndex !== null && stepIndex === currentDraggedStepIndex;
      const isOriginPosition = originIndex !== null && displayIndex === originIndex && !isThisDraggedItem;
      
      // Calculate displacement for corridor effect
      let displacementY = 0;
      if (destinationSlotIndex !== null && isDraggingRef.current && !isThisDraggedItem) {
        const draggedCurrentPos = visualOrder.findIndex(stepIdx => stepIdx === currentDraggedStepIndex);
        
        // Bars shift away from the destination slot
        if (displayIndex < destinationSlotIndex && displayIndex >= draggedCurrentPos) {
          // Bars above destination shift up
          displacementY = -parseFloat(processedNeighborDisplacement) || -6;
        } else if (displayIndex >= destinationSlotIndex && displayIndex <= draggedCurrentPos) {
          // Bars below destination shift down
          displacementY = parseFloat(processedNeighborDisplacement) || 6;
        }
      }
      
      // Determine background color
      let bgColor = activeButtonColor;
      if (isComplete) {
        bgColor = correctColor;
      }
      
      // Button style with morphing for dragged item
      const buttonStyle = {
        backgroundColor: bgColor,
        color: buttonFontColor,
        fontSize: processedButtonFontSize,
        fontWeight: buttonFontWeight,
        borderRadius: processedButtonBorderRadius,
        padding: processedButtonPadding,
        cursor: isComplete ? 'default' : 'grab',
        // Origin position: faded (not harsh)
        opacity: isOriginPosition ? originOpacity : (isThisDraggedItem ? 0.95 : 1),
        // Dragged item: flat shadow, smaller scale, no rotation
        boxShadow: isThisDraggedItem ? draggedShadowOnDrag : 'none',
        transform: isThisDraggedItem 
          ? `scale(${draggedScaleOnDrag})` 
          : (displacementY !== 0 ? `translateY(${displacementY}px)` : 'none'),
        transition: isThisDraggedItem 
          ? 'none' 
          : `all ${displacementDuration}ms ease-out`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minWidth: orientation === 'horizontal' ? processedMinWidth : 'auto',
        minHeight: processedRowHeight,
        height: '100%',
        boxSizing: 'border-box',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: isThisDraggedItem ? 1000 : 'auto',
        width: '100%',
        // Soft settle animation
        animation: isSettling && !isThisDraggedItem ? `softSettle ${settleDuration}ms ease-out` : 'none'
      };
      
      // Check if text contains HTML
      const containsHTML = stepText && typeof stepText === 'string' && /<[^>]+>/.test(stepText);
      
      const buttonContent = containsHTML ?
        React.createElement('span', {
          dangerouslySetInnerHTML: { __html: stepText },
          style: { pointerEvents: 'none' }
        }) :
        stepText;
      
      // Step number box style (left column)
      // Use correct color if the step is in the correct position
      const stepNumberBgColor = isCorrectPosition ? correctColor : stepBarColor;
      const stepNumberStyle = {
        backgroundColor: stepNumberBgColor,
        border: showRowColumnBorders ? `${processedStepNumberBorderWidth} solid ${stepNumberBorderColor}` : 'none',
        borderRadius: processedStepNumberBorderRadius,
        color: stepNumberTextColor,
        fontSize: processedStepNumberFontSize,
        fontWeight: stepNumberFontWeight,
        padding: processedStepNumberPadding,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: leftColumnWidth,
        minHeight: processedRowHeight,
        flex: '0 0 auto',
        alignSelf: 'stretch',
        margin: processedRowColumnMargin,
        // Apply same displacement to step number for visual consistency
        transform: displacementY !== 0 ? `translateY(${displacementY}px)` : 'none',
        transition: `all ${displacementDuration}ms ease-out`
      };
      
      // Row container style
      const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '100%', // Prevent horizontal overflow
        alignItems: 'stretch',
        marginTop: processedRowColumnMargin,
        marginLeft: processedRowColumnMargin,
        marginBottom: orientation === 'vertical' ? processedGap : processedRowColumnMargin,
        marginRight: orientation === 'horizontal' ? processedGap : processedRowColumnMargin,
        position: 'relative',
        border: showRowColumnBorders ? `${processedBorderWidth1} solid rgba(255, 255, 255, 0.3)` : 'none',
        minHeight: processedRowHeight,
        flex: 1,
        boxSizing: 'border-box',
        overflow: 'hidden' // Prevent any content from overflowing horizontally
      };
      
      // Right column style - drop zone, no dashed borders or "Drop here" text
      const rightColumnStyle = {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: processedRowColumnMargin,
        border: showRowColumnBorders ? `${processedBorderWidth1} solid rgba(255, 255, 255, 0.3)` : 'none',
        boxSizing: 'border-box',
        minHeight: processedRowHeight,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        transition: `all ${displacementDuration}ms ease-out`
      };
      
      const currentDraggingId = isThisDraggedItem ? `step-${stepIndex}` : null;
      // Only disable items when actively dragging
      // Use state variable for React re-renders (state updates trigger re-renders)
      // Ref is updated synchronously, but state ensures React knows to re-render
      const isActivelyDragging = isAnyDraggingState;
      const isDisabled = isComplete || (isActivelyDragging && !isThisDraggedItem);
      
      // Debug logging for disabled items
      if (isDisabled && !isComplete) {
        console.log(`🚫 [ArrangeSteps] Item ${displayIndex} (step ${stepIndex}) is disabled:`, {
          displayIndex,
          stepIndex,
          isComplete,
          isActivelyDragging,
          isAnyDraggingState,
          isThisDraggedItem,
          isDisabled
        });
      }
      
      const draggableBar = React.createElement(Draggable, {
        key: `step-${stepIndex}`, // Use stable key based on stepIndex only, not displayIndex
        draggableId: `step-${stepIndex}`,
        onDragStart: handleDragStart,
        onDragMove: handleDragMove,
        onDragEnd: handleDragEnd,
        isDisabled: isDisabled,
        isAnyDragging: isAnyDraggingState,
        currentDraggingId: currentDraggingId,
        style: buttonStyle,
        'data-step-index': displayIndex,
        'data-actual-step-index': stepIndex
      }, buttonContent);
      
      // Check if this is the destination slot position
      // The slot appears at the destination, even if the dragged item is visually there
      const isDestinationSlot = destinationSlotIndex !== null &&
                                displayIndex === destinationSlotIndex &&
                                isDraggingRef.current;
      
      // Create row
      rows.push(React.createElement('div', {
        key: `row-${displayIndex}`,
        style: rowStyle
      }, [
        // Step number box (left column)
        // Use stepIndex (correct position) to determine label, not displayIndex (current position)
        React.createElement('div', {
          key: `step-number-${displayIndex}`,
          style: stepNumberStyle
        }, stepLabels && Array.isArray(stepLabels) && stepLabels.length > stepIndex 
          ? stepLabels[stepIndex] 
          : `Step ${displayIndex + 1}`),
        // Draggable bar container (right column) - acts as drop zone
        React.createElement('div', {
          key: `bar-container-${displayIndex}`,
          style: rightColumnStyle,
          'data-drop-zone-index': displayIndex
        }, [
          // Always show destination slot at destination position (behind everything)
          isDestinationSlot ? React.createElement('div', {
            key: 'destination-slot-wrapper',
            style: {
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none'
            }
          }, renderDestinationSlot()) : null,
          // Show the bar - if it's the destination and not the dragged item, fade it
          isDestinationSlot && !isThisDraggedItem ? React.createElement('div', {
            key: 'bar-behind-slot',
            style: {
              width: '100%',
              height: '100%',
              opacity: 0.2,
              pointerEvents: 'none',
              position: 'relative',
              zIndex: 2
            }
          }, draggableBar) : React.createElement('div', {
            key: 'bar-normal',
            style: {
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: isThisDraggedItem ? 1000 : 2
            }
          }, draggableBar)
        ].filter(Boolean))
      ]));
    });
    
    return rows;
  };
  
  // Container style
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: stepsContainerBackgroundColor !== 'transparent' ? stepsContainerBackgroundColor : containerBackgroundColor, // Use stepsContainerBackgroundColor if set, otherwise use containerBackgroundColor
    border: `${processedContainerBorderWidth} ${containerBorderType} ${containerBorderColor}`,
    borderRadius: processedGap, // Use gap as border radius for rounded corners
    boxSizing: 'border-box',
    overflowX: 'hidden', // Prevent horizontal scrolling at container level
    // Only set width/maxWidth if not already set by position.css
    ...(position?.css?.width ? {} : { width: '100%', maxWidth: '100%' })
  };
  
  // Steps container style
  const stepsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    padding: processedGap,
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex: `1 1 ${showInstructionText ? (100 - instructionRowHeight) : 100}%`, // Take remaining height (100% - instruction height, or 100% if instruction hidden)
    position: 'relative',
    minHeight: 0,
    overflowX: 'hidden', // Prevent horizontal scrolling
    overflowY: 'auto', // Allow vertical scrolling only
    width: `${stepsContainerWidth}%`, // Use specified percentage of container width (default: 80%)
    boxSizing: 'border-box',
    margin: '0 auto' // Center the steps container horizontally
  };
  
  // Instruction style
  const instructionStyle = {
    fontSize: processedInstructionFontSize,
    color: instructionFontColor,
    fontWeight: instructionFontWeight, // Use prop for font weight
    textAlign: instructionTextAlign, // Use prop for alignment
    padding: processedGap,
    marginBottom: '0',
    flex: `0 0 ${instructionRowHeight}%`, // Take specified percentage of container height
    display: 'flex',
    alignItems: 'center',
    justifyContent: instructionTextAlign === 'center' ? 'center' : instructionTextAlign === 'right' ? 'flex-end' : 'flex-start',
    boxSizing: 'border-box',
    minHeight: 0
  };
  
  // Render tap animation
  const renderTapAnimation = () => {
    if (!showTapAnimation || hasFirstRearrangement || isComplete || !calculateBarPositions || calculateBarPositions.length === 0) {
      return null;
    }
    
    const styleElement = React.createElement('style', {
      key: 'tap-animation-keyframes',
      dangerouslySetInnerHTML: { __html: tapAnimationKeyframes }
    });
    
    const tapAnimationStyle = {
      position: 'absolute',
      top: `${calculateBarPositions[0]}px`,
      left: `calc(${leftColumnWidth} + ${rightColumnWidth} / 2)`,
      transform: 'translate(-50%, -50%)',
      width: processedTapAnimationSize,
      height: processedTapAnimationSize,
      opacity: tapAnimationOpacity,
      animation: hasFirstRearrangement ? 'none' : `tapCycleThroughBars ${tapAnimationCycleDuration}ms ease-in-out infinite`,
      pointerEvents: 'none',
      zIndex: 1001,
      display: hasFirstRearrangement ? 'none' : 'block'
    };
    
    const tapImage = React.createElement('img', {
      key: 'tap-animation-image',
      src: tapAnimationSrc,
      alt: 'Tap to drag',
      style: tapAnimationStyle
    });
    
    return [styleElement, tapImage];
  };
  
  return React.createElement('div', {
    id: componentId || elementId, // Use componentId for better quiz detection (contains "arrange-steps")
    ref: containerRef,
    'data-component-type': 'ArrangeStepsComponent',
    'data-component': 'ArrangeStepsComponent', // Also set for quiz detection compatibility
    'data-component-id': componentId,
    style: containerStyle
  }, [
    // Instruction text
    showInstructionText && instructionText && React.createElement('div', {
      key: 'instruction',
      style: instructionStyle
    }, instructionText),
    
    // Steps container with tap animation
    React.createElement('div', {
      key: 'steps-container',
      style: { ...stepsContainerStyle, position: 'relative' }
    }, [
      ...renderSteps(),
      showTapAnimation && !hasFirstRearrangement && !isComplete && React.createElement('div', {
        key: 'tap-animation-container',
        style: {
          position: 'absolute',
          top: processedGap,
          left: leftColumnWidth,
          width: rightColumnWidth,
          height: processedRowHeight,
          pointerEvents: 'none',
          display: hasFirstRearrangement ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }
      }, renderTapAnimation())
    ].filter(Boolean))
  ]);
});

// Arrange Steps Element Configuration
const ArrangeStepsElement = {
  arrangeSteps: {
    type: 'arrange-steps',
    coordinates: [0, 0, 600, 400],
    zIndex: 'var(--z-content)',
    props: {
      steps: ['Step 1', 'Step 2', 'Step 3'],
      orientation: 'vertical',
      buttonColor: '#2a3f5f',
      buttonFontColor: '#ffffff',
      buttonFontSize: '24gc',
      buttonBorderRadius: '8gc',
      buttonPadding: '12gc',
      gap: '10gc',
      correctColor: '#10b981',
      incorrectColor: '#ef4444',
      showFeedback: true,
      feedbackText: { correct: 'Correct!', incorrect: 'Try again.' },
      instructionText: 'Drag to arrange in correct order'
    }
  }
};

// Export component and configuration
window.ArrangeStepsComponent = {
  ArrangeStepsComponent,
  ArrangeStepsElement
};

console.log('✅ Arrange Steps component loaded successfully');
