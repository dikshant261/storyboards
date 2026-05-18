/**
 * Quadrilateral Animation Sequence Component
 * 
 * Generic, reusable component for orchestrating quadrilateral animation sequences.
 * Can be used on any page (page 3, page 4, etc.) by providing a configuration object.
 * 
 * CONFIGURATION OBJECT STRUCTURE:
 * 
 * {
 *   quadComponentId: "page3-shape-display", // ID of the quadrilateral component
 *   messageBoxId: "page3-messagebox", // ID of the messagebox component
 *   initialDelay: 500, // Initial delay before starting (ms)
 *   completionEventName: "page3AnimationComplete", // Event name to dispatch on completion
 *   nextButtonId: "page3-next-button", // Optional: ID of next button to enable when animation completes
 *   tapAnimationId: "page3-tap-next", // Optional: ID of tap animation to enable when animation completes
 *   
 *   // First pair configuration
 *   firstPair: {
 *     side1Index: 0, // Side index (0=AB, 1=BC, 2=CD, 3=DA)
 *     side2Index: 2, // Side index
 *     pairIndex: 0, // Animation pair index (0=AB/CD, 1=BC/DA)
 *     pairName: "AB-CD", // Name for symbols
 *     highlightColor: "#00FF00", // Color for highlighting
 *     chevronColor: "#006400", // Color for chevron arrows
 *     doubleChevron: false, // Whether to use double chevron
 *     initialMessage: "Opposite sides are parallel...", // Message before first pair
 *     provenMessage: "AB and CD are parallel to each other" // Message when proven
 *   },
 *   
 *   // Second pair configuration (optional - if not provided, only first pair is animated)
 *   secondPair: {
 *     side1Index: 1,
 *     side2Index: 3,
 *     pairIndex: 1,
 *     pairName: "BC-DA",
 *     highlightColor: "#FF6600",
 *     chevronColor: "#CC4400",
 *     doubleChevron: true,
 *     initialMessage: "Opposite sides are parallel...", // Shown before second pair
 *     provenMessage: "BC and DA are parallel to each other"
 *   },
 *   
 *   // Timing configuration
 *   timing: {
 *     messageDuration: 1000, // Duration for initial message (ms)
 *     sideHighlightDuration: 1000, // Duration for side highlighting (ms)
 *     parallelAnimationCycles: 2, // Number of animation cycles
 *     symbolDelay: 500, // Delay before adding symbols (ms)
 *     waitBetweenPairs: 1000, // Wait between first and second pair (ms)
 *     conclusionDelay: 1000 // Delay before conclusion message (ms)
 *   },
 *   
 *   // Conclusion message (optional)
 *   conclusionMessage: "Two pairs of opposite sides are parallel"
 * }
 */

const QuadAnimationSequenceComponent = React.memo((props) => {
  const {
    id,
    position,
    processedStyles,
    elementZIndex,
    sequenceConfig // Configuration object for the animation sequence
  } = props;

  // Validate and extract config with defaults
  if (!sequenceConfig) {
    console.error('QuadAnimationSequenceComponent: sequenceConfig is required');
    return null;
  }

  const {
    quadComponentId,
    messageBoxId,
    initialDelay = 500,
    completionEventName,
    nextButtonId, // Optional: ID of next button to enable
    nextButtonName, // Optional: Element name of next button (e.g., "next-button")
    tapAnimationId, // Optional: ID of tap animation to enable
    tapAnimationName, // Optional: Element name of tap animation (e.g., "tap-gif")
    firstPair,
    secondPair, // Optional - if not provided, only first pair is animated
    timing = {},
    conclusionMessage,
    conclusionMessageKey, // Optional: i18n key to resolve at display time (e.g. "pages.page3.animationSequence.conclusionMessage")
    secondDescriptionText, // Optional: Second description text to add after final step
    sidesABEqualMessage, // Message after AB/CD equality animation (page 3)
    sidesBCEqualMessage, // Message after BC/DA equality animation (page 3)
    sidesEqualConclusionMessage, // Conclusion message for "two pairs equal in length" (page 3)
    // All four sides equal animation (e.g. for square)
    useAllSidesEqualAnimation = false,
    sideEqualityAnimationDuration = 2000,
    sideEqualityAnimationWaitTime = 500,
    sideEqualityAnimationCycles = 2,
    sidesEqualAtVertex0Message, // e.g. "Sides DA and AB are equal"
    sidesEqualAtVertex1Message, // e.g. "Sides AB and BC are equal"
    sidesEqualAtVertex2Message, // e.g. "Sides BC and CD are equal"
    sidesEqualAtVertex3Message, // e.g. "Sides CD and DA are equal"
    allSidesEqualConclusionMessage, // "All four sides are equal in length."
    allSidesEqualDescriptionText, // Second description for property showcase
    // Angle marker configuration (for Step 1)
    showAngleMarkers = false, // Whether to show angle markers in Step 1
    angleMarkerColor = '#FF6600', // Color for angle markers
    angleMarkerFill = true, // Whether to fill the arcs
    angleMarkerBlink = true, // Whether to make the fills blink
    // Property showcase configuration for Step 2
    step2PropertyName, // Property name to add description to (e.g., "Angles")
    step2DescriptionText, // Description text to add in Step 2
    propertyShowcaseId, // ID of property showcase component (used in Step 2 and later steps)
    propertyDescriptionFontSize = '28gc', // Font size for dynamically added descriptions (gc); converted to px at 90% to match PropertyShowcaseComponent
    // Step 3 configuration
    step3Message, // Message to display in Step 3
    step3AnglesDescriptionText, // Description text to add to Angles property in Step 3
    // All angles 90° measurement animation (before adjacent angles supplementary)
    showAllAngles90 = false, // Enable all angles 90° measurement
    allAngles90IntroMessage, // "Let's measure each interior angle."
    allAngles90MessageA, // "∠A = 90°"
    allAngles90MessageB, // "∠B = 90°"
    allAngles90MessageC, // "∠C = 90°"
    allAngles90MessageD, // "∠D = 90°"
    allAngles90ConclusionMessage, // "All interior angles are 90°."
    allAngles90DescriptionText, // Description for property showcase: "1. All interior angles are 90°."
    // Diagonal configuration (for page 5)
    showDiagonals = false, // Whether to show diagonals in Step 1
    step2Message, // Message to display in Step 2 (for diagonals)
    step3PropertyIndex, // Property index to update in Step 3 (for diagonals)
    step3DescriptionText, // Description text to add in Step 3 (for diagonals)
    step6Message, // Message to display in Step 6 (after diagonal equality animation)
    step6DescriptionText, // Description text to append in Step 6 (for diagonals)
    // Measure diagonal angle configuration (for page 5 - after diagonal equality)
    measureDiagonalAngle = false, // Whether to measure the diagonal angle after diagonal equality
    step7Message, // Message before measuring diagonal angle
    step7DescriptionText, // Description text for diagonal angle property
    diagonalAngleMessage, // Message with angle e.g. "The diagonals intersect at {angle}°."
    // Diagonal bisection (after angle measurement)
    step8Message, // Message before bisection: "We will now check if the diagonals bisect each other."
    step8ACMessage, // Message when AC is proven bisected: "O, the intersection point, bisects diagonal AC."
    step8BDMessage, // Message when BD is proven bisected: "O, the intersection point, bisects diagonal BD."
    step8ProvenMessage, // Message after proven: "The diagonals of a parallelogram bisect each other."
    step8DescriptionText, // Description to append to Diagonals property
    // Diagonal angle bisection (after diagonal bisection - specific to square)
    showDiagonalAngleBisection = false, // Whether to show diagonal angle bisection animation
    step9Message, // Message before angle bisection: "Now let's see how each diagonal bisects the interior angles."
    step9ACMessage, // Message when AC diagonal bisects angles: "Diagonal AC bisects the angles at A and C."
    step9BDMessage, // Message when BD diagonal bisects angles: "Diagonal BD bisects the angles at B and D."
    step9ProvenMessage, // Message after proven: "The diagonals bisect the interior angles!"
    step9DescriptionText, // Description to append to Diagonals property
    // Symmetry animation configuration (for page 6)
    showSymmetryAnimation = false, // Whether to show symmetry animation in Step 1
    symmetryAxis = 'horizontal', // 'horizontal' | 'vertical' - axis for first symmetry fold
    symmetryDuration = 2000, // Duration of symmetry animation (ms)
    symmetryHoldTime = 1500, // Time to hold at folded position (ms)
    // Step 1: Message before horizontal symmetry check
    step1SymmetryMessage, // "Let's check symmetry of this shape along the horizontal axis"
    // Step 2 configuration (after first symmetry animation)
    step2SymmetryMessage, // Message after first symmetry animation (e.g., "The shape is not symmetric...")
    // Step 3: Message before vertical symmetry check; second symmetry animation
    step3SymmetryMessage, // "Let's check symmetry of this shape along the vertical axis"
    // Step 3 configuration (second symmetry animation)
    step3SymmetryAxis = 'vertical', // Axis for second symmetry animation
    step3SymmetryCycles = 1, // Number of cycles for second symmetry animation
    // Step 4 configuration (after second symmetry animation)
    step4SymmetryMessage, // Message after second symmetry animation
    // Step 4b: Diagonal symmetry (after horizontal and vertical)
    showDiagonalSymmetry = false, // Whether to show diagonal symmetry fold after vertical
    step4bSymmetryMessage, // Message before diagonal symmetry check
    step4cSymmetryMessage, // Message after diagonal symmetry (e.g. "The shape is also symmetric along the diagonals.")
    step4bSymmetryAxis = 'diagonal1', // Axis for diagonal fold: 'diagonal1' | 'diagonal2'
    step4bSymmetryCycles = 1,
    // Step 5 configuration (property update)
    step5PropertyIndex, // Property index to update (e.g., 3 for Symmetry)
    step5DescriptionText, // Description text to add
    // Rotational symmetry configuration (after line symmetry)
    showRotationalSymmetry = false,
    step6RotationalMessage, // "Now let's check for rotational symmetry of this shape"
    step6RotationalMatchMessage, // "The shape has rotational symmetry at {angles}."
    step6RotationalProvenMessage, // "The shape has rotational symmetry of order 2"
    step6RotationalDescriptionText, // Description text for rotational symmetry property
    // Instruction text configuration
    instructionId, // ID of instruction text element
    instructionText, // New instruction text to set
    // Angle measurement label configuration
    angleLabelPositionRatio = 0.2, // Position ratio for angle labels (0.2 = 1/5 distance from vertex to center)
    // Can be a single number (applied to all vertices) or an array [A, B, C, D] for per-vertex ratios
    // Array format: [ratioForA, ratioForB, ratioForC, ratioForD] where index 0=A, 1=B, 2=C, 3=D
    // Adjacent angles supplementary configuration (Steps 7-10)
    showAdjacentAnglesSupplementary = false, // Whether to show adjacent angles supplementary animation
    adjacentAnglesMessage1, // Message: "Now let's check if adjacent angles are supplementary..."
    adjacentAnglesMessage2, // Message: "∠A + ∠B = 180°. Adjacent angles A and B are supplementary!"
    adjacentAnglesMessage3, // Message: "∠B + ∠C = 180°. Adjacent angles B and C are supplementary!"
    adjacentAnglesMessage4, // Message: "∠C + ∠D = 180°. Adjacent angles C and D are supplementary!"
    adjacentAnglesMessage5, // Message: "∠D + ∠A = 180°. Adjacent angles D and A are supplementary!"
    adjacentAnglesFinalMessage, // Message: "All pairs of adjacent angles are supplementary..."
    adjacentAnglesDescriptionText, // Description text: "2. Adjacent angles are supplementary (sum to 180°)."
    angleEqualityMessageAC, // Message: "Both angles are perfectly equal, ∠ A = ∠ C"
    angleEqualityMessageBD, // Message: "Both angles are perfectly equal, ∠ B = ∠ D"
    oppositeAnglesEqualMessage, // Message: "Opposite angles are equal because they have the same angle measures."
  } = sequenceConfig;

  // Extract timing with defaults
  const {
    messageDuration = 1000,
    sideHighlightDuration = 1000,
    parallelAnimationCycles = 2,
    symbolDelay = 500,
    waitBetweenPairs = 1000,
    conclusionDelay = 1000
  } = timing;

  // Validate required config
  // quadComponentId and messageBoxId are always required
  if (!quadComponentId || !messageBoxId) {
    console.error('QuadAnimationSequenceComponent: Missing required config (quadComponentId, messageBoxId)');
    return null;
  }
  
  // firstPair is only required if we're not using showDiagonals, showAngleMarkers, or showSymmetryAnimation
  if (!showDiagonals && !showAngleMarkers && !showSymmetryAnimation && !firstPair) {
    console.error('QuadAnimationSequenceComponent: Missing required config (firstPair) - required when showDiagonals, showAngleMarkers, and showSymmetryAnimation are all false');
    return null;
  }

  const [currentStep, setCurrentStep] = React.useState(0);
  const messageTimeoutRef = React.useRef(null);
  const animationTimeoutRef = React.useRef(null);
  const secondPairTimeoutRef = React.useRef(null);
  const startTimeoutRef = React.useRef(null);
  const diagonalEqualityCompletedRef = React.useRef(false);

  // When Next/Prev is pressed, stop all sequence timeouts so animations don't continue
  React.useEffect(() => {
    if (typeof window === 'undefined' || !id) return;
    const pageMatch = id.match(/page(\d+)/);
    const componentPageNum = pageMatch ? parseInt(pageMatch[1], 10) : null;
    const clearAllTimeouts = () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
        messageTimeoutRef.current = null;
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      if (secondPairTimeoutRef.current) {
        clearTimeout(secondPairTimeoutRef.current);
        secondPairTimeoutRef.current = null;
      }
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
    };
    const handlePageStateReset = (e) => {
      const resetPage = e.detail?.page;
      if (resetPage != null && resetPage === componentPageNum) {
        clearAllTimeouts();
      }
    };
    window.addEventListener('pageStateReset', handlePageStateReset);
    return () => window.removeEventListener('pageStateReset', handlePageStateReset);
  }, [id]);

  // Get messagebox element reference
  const getMessageBoxElement = React.useCallback(() => {
    if (typeof document !== 'undefined') {
      return document.getElementById(messageBoxId);
    }
    return null;
  }, [messageBoxId]);

  // Update messagebox text content
  const updateMessageBox = React.useCallback((text) => {
    const messageBoxElement = getMessageBoxElement();
    if (messageBoxElement) {
      // Check if text contains HTML
      const containsHTML = typeof text === 'string' && /<[^>]+>/.test(text);
      if (containsHTML) {
        messageBoxElement.innerHTML = text;
      } else {
        messageBoxElement.textContent = text;
      }
    } else {
      console.warn(`Messagebox element ${messageBoxId} not found`);
    }
  }, [getMessageBoxElement, messageBoxId]);

  // Update instruction text
  const updateInstructionText = React.useCallback((instructionId, text) => {
    if (typeof document === 'undefined') return;
    
    const instructionElement = document.getElementById(instructionId);
    if (!instructionElement) {
      console.warn(`Instruction element ${instructionId} not found`);
      return;
    }
    
    instructionElement.textContent = text;
  }, []);

  // Enable next button and tap animation.
  // When dispatchCompletionEvent is true (default), dispatches the quiz completion event (e.g. page5AnimationComplete).
  // Only pass false for fallback/timeout paths so the completion event is dispatched only when all animations are over.
  const enableNextButtonAndTap = React.useCallback((dispatchCompletionEvent = true) => {
    if (typeof document === 'undefined') return;

    // Dispatch quiz completion event only when all animations are over (not on fallback/timeout)
    if (dispatchCompletionEvent && completionEventName && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(completionEventName, {
        detail: { completed: true }
      }));
    }

    // Helper function to find element with retry logic
    // Accepts both ID and element name for flexible searching
    const findElementWithRetry = (id, elementName = null, maxAttempts = 5, delay = 200) => {
      let attempts = 0;
      const tryFind = () => {
        attempts++;
        // Try multiple search strategies
        let element = document.getElementById(id);
        
        // If not found by ID, try by element name
        if (!element && elementName) {
          // Try finding by data-element-name
          element = document.querySelector(`[data-element-name="${elementName}"]`);
        }
        
        // Try finding by data-component-id
        if (!element) {
          element = document.querySelector(`[data-component-id="${id}"]`);
        }
        
        // Try finding by class name containing the element name or id
        if (!element) {
          const searchName = elementName || id.replace(/^page\d+-/, '');
          // Try various class patterns
          element = document.querySelector(`.${searchName}`);
          if (!element) {
            element = document.querySelector(`.${searchName}-container`);
          }
          if (!element) {
            element = document.querySelector(`[class*="${searchName}"]`);
          }
        }
        
        if (element) {
          return element;
        }
        
        if (attempts < maxAttempts) {
          setTimeout(tryFind, delay);
          return null;
        }
        
        return null;
      };
      return tryFind();
    };

    // Enable next button with retry logic
    if (nextButtonId) {
      setTimeout(() => {
        // Extract element name from ID if not provided (remove "pageX-" prefix)
        const buttonName = nextButtonName || nextButtonId.replace(/^page\d+-/, '');
        const nextButton = findElementWithRetry(nextButtonId, buttonName);
        if (nextButton) {
          // NextButtonComponent renders a div container, not an actual <button> element
          // The container itself is the interactive element with data-element-type="next-button"
          
          // Enable the container directly
          nextButton.classList.remove('disabled');
          nextButton.removeAttribute('data-disabled');
          nextButton.style.opacity = '1';
          nextButton.style.pointerEvents = 'auto';
          nextButton.style.cursor = 'pointer';
          
          // Also try to find and enable any nested button elements (if they exist)
          const nestedButton = nextButton.querySelector('button');
          if (nestedButton) {
            nestedButton.disabled = false;
            nestedButton.style.opacity = '1';
            nestedButton.style.pointerEvents = 'auto';
            nestedButton.style.cursor = 'pointer';
          }
          
        } else {
          console.warn(`Next button ${nextButtonId} (name: ${buttonName}) not found after retries`);
        }
      }, 100);
    }

    // Enable tap animation with retry logic
    if (tapAnimationId) {
      setTimeout(() => {
        // Extract element name from ID if not provided (remove "pageX-" prefix)
        const tapName = tapAnimationName || tapAnimationId.replace(/^page\d+-/, '');
        const tapAnimation = findElementWithRetry(tapAnimationId, tapName);
        if (tapAnimation) {
          tapAnimation.style.display = 'flex';
          // Also try to find and update any nested elements
          const tapImage = tapAnimation.querySelector('img');
          if (tapImage) {
            tapImage.style.display = 'block';
            tapImage.style.visibility = 'visible';
          }
        } else {
          // Try global search by element name as fallback
          if (tapName) {
            const globalTap = document.querySelector(`[data-element-name="${tapName}"]`);
            if (globalTap) {
              globalTap.style.display = 'flex';
              const tapImage = globalTap.querySelector('img');
              if (tapImage) {
                tapImage.style.display = 'block';
                tapImage.style.visibility = 'visible';
              }
            } else {
              console.warn(`Tap animation ${tapAnimationId} (name: ${tapName}) not found after retries and global search`);
            }
          } else {
            console.warn(`Tap animation ${tapAnimationId} not found after retries`);
          }
        }
      }, 100);
    }
  }, [nextButtonId, nextButtonName, tapAnimationId, tapAnimationName, completionEventName]);

  // Use general quadrilateral animation utilities (not page-specific)
  const updateQuadSides = React.useCallback((side1Color, side2Color, side1Blink, side2Blink, side1Index = 0, side2Index = 2) => {
    if (window.QuadrilateralAnimations && window.QuadrilateralAnimations.updateQuadSides) {
      window.QuadrilateralAnimations.updateQuadSides(quadComponentId, side1Color, side2Color, side1Blink, side2Blink, side1Index, side2Index);
    } else {
      console.warn('QuadrilateralAnimations.updateQuadSides not available');
    }
  }, [quadComponentId]);

  // Trigger parallel lines animation with callback
  const triggerParallelAnimation = React.useCallback((pairIndex, onComplete) => {
    if (window.QuadrilateralAnimations && window.QuadrilateralAnimations.triggerParallelAnimation) {
      window.QuadrilateralAnimations.triggerParallelAnimation(quadComponentId, pairIndex, onComplete);
    } else {
      console.warn('QuadrilateralAnimations.triggerParallelAnimation not available');
    }
  }, [quadComponentId]);

  // Trigger opposite side equality animation
  const triggerOppositeSideEqualityAnimation = React.useCallback((pairIndex) => {
    if (typeof document === 'undefined') return;
    
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) {
      console.warn(`Quadrilateral element ${quadComponentId} not found`);
      return;
    }

    // Try to call the method directly on the element
    if (quadElement.animateOppositeSideEquality) {
      quadElement.animateOppositeSideEquality(pairIndex);
    } else if (window.quadrilateralAnimations && window.quadrilateralAnimations[quadComponentId]) {
      // Try via registry
      if (window.quadrilateralAnimations[quadComponentId].animateOppositeSideEquality) {
        window.quadrilateralAnimations[quadComponentId].animateOppositeSideEquality(pairIndex);
      } else {
        console.warn('animateOppositeSideEquality method not found');
      }
    } else {
      console.warn('Quadrilateral animations not available');
    }
  }, [quadComponentId]);

  // Trigger side equality animation (adjacent sides at vertex) - for "all four sides equal" (e.g. square)
  const triggerSideEqualityAnimation = React.useCallback((vertexIndex) => {
    if (typeof document === 'undefined') return;
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) {
      console.warn(`Quadrilateral element ${quadComponentId} not found`);
      return;
    }
    if (quadElement.animateSideEquality) {
      quadElement.animateSideEquality(vertexIndex);
    } else if (window.quadrilateralAnimations && window.quadrilateralAnimations[quadComponentId]?.animateSideEquality) {
      window.quadrilateralAnimations[quadComponentId].animateSideEquality(vertexIndex);
    } else {
      console.warn('animateSideEquality method not found');
    }
  }, [quadComponentId]);

  // Add arrow symbols to indicate parallel sides
  const addParallelArrows = React.useCallback((side1Index = 0, side2Index = 2, pairName = 'AB-CD', arrowColor = '#FF6600', doubleChevron = false) => {
    if (window.QuadrilateralAnimations && window.QuadrilateralAnimations.addParallelArrows) {
      window.QuadrilateralAnimations.addParallelArrows(quadComponentId, side1Index, side2Index, pairName, arrowColor, doubleChevron);
    } else {
      console.warn('QuadrilateralAnimations.addParallelArrows not available');
    }
  }, [quadComponentId]);

  // Show all angle markers
  const showAllAngleMarkers = React.useCallback((color, fill, blink) => {
    if (window.QuadrilateralAnimations && window.QuadrilateralAnimations.showAllAngleMarkers) {
      window.QuadrilateralAnimations.showAllAngleMarkers(quadComponentId, color, fill, blink);
    } else {
      console.warn('QuadrilateralAnimations.showAllAngleMarkers not available');
    }
  }, [quadComponentId]);

  // Highlight adjacent angle pair with special color and show their sum
  const highlightAdjacentAnglePair = React.useCallback((vertexIndex1, vertexIndex2, highlightColor = "#FFFF00", blink = true) => {
    if (typeof document === 'undefined') return;
    
    console.log(`🔧 highlightAdjacentAnglePair called: vertices=${vertexIndex1},${vertexIndex2}, color=${highlightColor}`);
    
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) {
      console.warn(`❌ Quadrilateral element ${quadComponentId} not found`);
      return;
    }
    
    let angleMarkers = Array.from(quadElement.querySelectorAll('.angle-marker-component'));
    if (angleMarkers.length === 0) {
      angleMarkers = Array.from(quadElement.querySelectorAll('[data-angle-marker], [data-angle]'));
    }
    
    if (angleMarkers.length === 0) {
      console.error(`❌ No angle markers found in quad element ${quadComponentId}`);
      return;
    }
    
    // Update the two specified angle markers
    [vertexIndex1, vertexIndex2].forEach((vertexIndex) => {
      if (angleMarkers[vertexIndex]) {
        const marker = angleMarkers[vertexIndex];
        
        // Update fill paths
        const fillPaths = marker.querySelectorAll('path[fill]');
        fillPaths.forEach((path) => {
          const fillAttr = path.getAttribute('fill');
          if (fillAttr && fillAttr !== 'none') {
            path.setAttribute('fill', highlightColor);
            path.setAttribute('fill-opacity', '0.6');
            if (blink) {
              path.classList.add('angle-arc-blink');
            } else {
              path.classList.remove('angle-arc-blink');
            }
          }
        });
        
        // Update stroke paths
        const strokePaths = marker.querySelectorAll('path[stroke]');
        strokePaths.forEach((path) => {
          path.setAttribute('stroke', highlightColor);
        });
      }
    });
  }, [quadComponentId]);

  // Reset angle markers to their original colors (for switching between adjacent pairs)
  const resetAngleMarkerColors = React.useCallback((vertexIndices, originalColor = "#FF6600") => {
    if (typeof document === 'undefined') return;
    
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) return;
    
    let angleMarkers = Array.from(quadElement.querySelectorAll('.angle-marker-component'));
    if (angleMarkers.length === 0) {
      angleMarkers = Array.from(quadElement.querySelectorAll('[data-angle-marker], [data-angle]'));
    }
    
    vertexIndices.forEach((vertexIndex) => {
      if (angleMarkers[vertexIndex]) {
        const marker = angleMarkers[vertexIndex];
        
        // Reset fill paths
        const fillPaths = marker.querySelectorAll('path[fill]');
        fillPaths.forEach((path) => {
          const fillAttr = path.getAttribute('fill');
          if (fillAttr && fillAttr !== 'none') {
            path.setAttribute('fill', originalColor);
            path.setAttribute('fill-opacity', '0.3');
            path.classList.remove('angle-arc-blink');
          }
        });
        
        // Reset stroke paths
        const strokePaths = marker.querySelectorAll('path[stroke]');
        strokePaths.forEach((path) => {
          path.setAttribute('stroke', originalColor);
        });
      }
    });
  }, [quadComponentId]);

  // Trigger angle sum animation (for supplementary angles)
  const triggerAngleSumAnimation = React.useCallback((vertex1Index, vertex2Index, duration, onComplete) => {
    if (typeof document === 'undefined') return;
    
    console.log(`🔧 triggerAngleSumAnimation called: vertices=${vertex1Index},${vertex2Index}, duration=${duration}`);
    
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) {
      console.warn(`❌ Quadrilateral element ${quadComponentId} not found`);
      if (onComplete) {
        setTimeout(() => onComplete(), duration);
      }
      return;
    }

    // Try to call the method directly on the element
    if (quadElement.animateAngleSum) {
      console.log(`🔧 Calling animateAngleSum with callback: ${!!onComplete}`);
      quadElement.animateAngleSum(vertex1Index, vertex2Index, duration, 'adjacent', onComplete);
    } else if (window.quadrilateralAnimations?.[quadComponentId]?.animateSum) {
      console.log(`🔧 Calling animateSum via registry with callback: ${!!onComplete}`);
      window.quadrilateralAnimations[quadComponentId].animateSum(vertex1Index, vertex2Index, duration, 'adjacent', onComplete);
    } else {
      console.warn('❌ animateAngleSum method not found');
      if (onComplete) {
        console.log('🔧 Calling onComplete as fallback');
        setTimeout(() => onComplete(), duration);
      }
    }
  }, [quadComponentId]);

  // Helper function to update angle markers and add equality tick mark
  const updateAngleMarkersWithEqualityTick = React.useCallback((vertexIndices, quadComponentId, color = "#00FF00") => {
    if (typeof document === 'undefined') return;
    
    console.log(`🔧 updateAngleMarkersWithEqualityTick called: vertices=${vertexIndices.join(',')}, color=${color}`);
    
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) {
      console.warn(`❌ Quadrilateral element ${quadComponentId} not found`);
      return;
    }
    
    let angleMarkers = Array.from(quadElement.querySelectorAll('.angle-marker-component'));
    console.log(`🔧 Found ${angleMarkers.length} angle markers with .angle-marker-component`);
    
    // If not found, try alternative selectors
    if (angleMarkers.length === 0) {
      angleMarkers = Array.from(quadElement.querySelectorAll('[data-angle-marker], [data-angle]'));
    }
    
    if (angleMarkers.length === 0) {
      // Try finding by looking for elements containing angle marker SVGs
      const allElements = Array.from(quadElement.querySelectorAll('*'));
      angleMarkers = allElements.filter(el => {
        const svg = el.querySelector('svg');
        return svg && (svg.querySelector('path[d*="A"]') || el.textContent?.includes('°'));
      });
    }
    
    if (angleMarkers.length === 0) {
      console.error(`❌ No angle markers found in quad element ${quadComponentId}`);
      return;
    }
    
    // Process gc units to viewBox units (similar to side symbols)
    const processGcToViewBox = (gcValue, viewBoxSize, containerGc) => {
      // Convert gc to viewBox units
      // viewBox is typically "0 0 viewBoxSize viewBoxSize"
      // containerGc is average of container width and height in gc
      const avgContainerGc = containerGc || 800; // Default fallback
      return (gcValue / avgContainerGc) * viewBoxSize;
    };
    
    vertexIndices.forEach((vertexIndex) => {
      if (angleMarkers[vertexIndex]) {
        const marker = angleMarkers[vertexIndex];
        
        // Update fill paths - set to green, fully opaque (opacity = 1.0)
        const fillPaths = marker.querySelectorAll('path[fill]');
        fillPaths.forEach((path) => {
          const fillAttr = path.getAttribute('fill');
          if (fillAttr && fillAttr !== 'none') {
            path.setAttribute('fill', color);
            path.setAttribute('fill-opacity', '1.0');
            path.classList.remove('angle-arc-blink');
            path.style.animation = 'none';
          }
        });
        
        // Update stroke paths - set to provided color
        const strokePaths = marker.querySelectorAll('path[stroke]');
        strokePaths.forEach((path) => {
          path.setAttribute('stroke', color);
          path.style.animation = 'none';
        });
        
        // Add equality tick mark (single stroke) to the angle arc
        // Find the SVG element within this marker
        const svgElement = marker.querySelector('svg');
        if (svgElement) {
          // Check if tick mark already exists (to avoid duplicates)
          const existingTick = svgElement.querySelector('.equality-tick-mark');
          if (!existingTick) {
            // Find the arc path to calculate midpoint
            // Try stroke path first: "M x1 y1 A radius radius 0 largeArc sweep x2 y2"
            let arcPath = marker.querySelector('path[stroke]:not([stroke="none"])');
            let pathData = arcPath ? arcPath.getAttribute('d') : null;
            let arcMatch = null;
            let x1, y1, radius, sweepFlag, x2, y2;
            
            if (pathData) {
              // Try stroke path format first
              arcMatch = pathData.match(/M\s+([-\d.eE]+)\s+([-\d.eE]+)\s+A\s+([-\d.eE]+)\s+([-\d.eE]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([-\d.eE]+)\s+([-\d.eE]+)/);
            }
            
            // If stroke path not found or doesn't match, try fill path format
            if (!arcMatch) {
              const fillPath = marker.querySelector('path[fill]:not([fill="none"])');
              if (fillPath) {
                pathData = fillPath.getAttribute('d');
                // Fill path format: "M 0 0 L x1 y1 A radius radius 0 largeArc sweep x2 y2 Z"
                arcMatch = pathData.match(/M\s*0\s*0\s*L\s*([-\d.eE]+)\s+([-\d.eE]+)\s+A\s+([-\d.eE]+)\s+([-\d.eE]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([-\d.eE]+)\s+([-\d.eE]+)\s*Z/i);
                if (!arcMatch) {
                  arcMatch = pathData.match(/M\s*0\s*0\s*L\s*([-\d.eE]+)[\s,]+([-\d.eE]+)[\s,]+A[\s,]+([-\d.eE]+)[\s,]+([-\d.eE]+)[\s,]+(\d+)[\s,]+(\d+)[\s,]+(\d+)[\s,]+([-\d.eE]+)[\s,]+([-\d.eE]+)\s*Z/i);
                }
                if (!arcMatch) {
                  // Fallback: extract numbers directly
                  const numbers = pathData.match(/([-\d.eE]+)/g);
                  if (numbers && numbers.length >= 11) {
                    arcMatch = ['', numbers[2], numbers[3], numbers[4], numbers[5], numbers[6], numbers[7], numbers[8], numbers[9], numbers[10]];
                  }
                }
              }
            }
            
            if (arcMatch) {
              x1 = parseFloat(arcMatch[1]);
              y1 = parseFloat(arcMatch[2]);
              radius = parseFloat(arcMatch[3]);
              sweepFlag = parseInt(arcMatch[6]);
              x2 = parseFloat(arcMatch[8]);
              y2 = parseFloat(arcMatch[9]);
              
              // Get viewBox size from SVG
              const viewBox = svgElement.getAttribute('viewBox');
              let viewBoxSize = 100; // Default
              if (viewBox) {
                const viewBoxParts = viewBox.split(' ');
                if (viewBoxParts.length >= 4) {
                  viewBoxSize = Math.max(
                    Math.abs(parseFloat(viewBoxParts[2])),
                    Math.abs(parseFloat(viewBoxParts[3]))
                  );
                }
              }
              
              // Get container dimensions from the quadrilateral element
              // The angle marker uses the same coordinate system as the quadrilateral
              const containerElement = quadElement.closest('[data-component-id]') || quadElement;
              const containerRect = containerElement.getBoundingClientRect();
              const containerWidthGc = containerRect.width || 800;
              const containerHeightGc = containerRect.height || 600;
              const avgContainerGc = (containerWidthGc + containerHeightGc) / 2;
              
              // Calculate angles for start and end points
              const startAngle = Math.atan2(y1, x1);
              const endAngle = Math.atan2(y2, x2);
              
              // Calculate the angle difference
              let angleDiff = endAngle - startAngle;
              
              // Handle wrap-around for arcs that cross 0°
              if (sweepFlag === 0) {
                // Counter-clockwise (negative direction)
                if (angleDiff > 0) angleDiff -= 2 * Math.PI;
              } else {
                // Clockwise (positive direction)
                if (angleDiff < 0) angleDiff += 2 * Math.PI;
              }
              
              // Calculate midpoint angle
              const midAngle = startAngle + angleDiff / 2;
              
              // Calculate midpoint on the arc
              const arcMidX = radius * Math.cos(midAngle);
              const arcMidY = radius * Math.sin(midAngle);
                
                // Use gc units for tick length (convert to viewBox units)
                // Tick length: 8gc (responsive)
                const tickLengthGc = 8; // 8gc
                const tickLength = processGcToViewBox(tickLengthGc, viewBoxSize, avgContainerGc);
                
                // Calculate tick endpoints along the arc
                const tickAngle1 = midAngle - (tickLength / radius) / 2;
                const tickAngle2 = midAngle + (tickLength / radius) / 2;
                
                const tickX1 = radius * Math.cos(tickAngle1);
                const tickY1 = radius * Math.sin(tickAngle1);
                const tickX2 = radius * Math.cos(tickAngle2);
                const tickY2 = radius * Math.sin(tickAngle2);
                
                // Stroke width in gc units (2gc)
                const strokeWidthGc = 2;
                const strokeWidth = processGcToViewBox(strokeWidthGc, viewBoxSize, avgContainerGc);
                
                // Create tick mark line element
                const tickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                tickLine.setAttribute('x1', tickX1.toString());
                tickLine.setAttribute('y1', tickY1.toString());
                tickLine.setAttribute('x2', tickX2.toString());
                tickLine.setAttribute('y2', tickY2.toString());
                tickLine.setAttribute('stroke', color); // Use provided color to match the arc
                tickLine.setAttribute('stroke-width', strokeWidth.toString());
                tickLine.setAttribute('stroke-linecap', 'round');
                tickLine.classList.add('equality-tick-mark');
                
                // Add to SVG (before closing tag)
                svgElement.appendChild(tickLine);
              }
            }
          }
        }
      });
    // Notify quad of vertex colors so moving arc in adjacent-angles sum animation uses same color
    const vertexColors = Object.fromEntries(vertexIndices.map((i) => [i, color]));
    quadElement.dispatchEvent(new CustomEvent('angleMarkersEqualityUpdated', { detail: { vertexColors }, bubbles: true }));
  }, []);

  // Trigger angle equality animation
  const triggerAngleEqualityAnimation = React.useCallback((sourceVertexIndex, targetVertexIndex, duration, onComplete) => {
    if (typeof document === 'undefined') return;
    
    const quadElement = document.getElementById(quadComponentId);
    if (!quadElement) {
      console.warn(`❌ Quadrilateral element ${quadComponentId} not found`);
      if (onComplete) {
        setTimeout(() => onComplete(), duration);
      }
      return;
    }

    // Try to call the method directly on the element
    if (quadElement.animateAngleEquality) {
      console.log(`🔧 Calling animateAngleEquality with callback: ${!!onComplete}`);
      quadElement.animateAngleEquality(sourceVertexIndex, targetVertexIndex, duration, onComplete);
    } else if (window.quadrilateralAnimations?.[quadComponentId]?.animateEquality) {
      console.log(`🔧 Calling animateEquality via registry with callback: ${!!onComplete}`);
      window.quadrilateralAnimations[quadComponentId].animateEquality(sourceVertexIndex, targetVertexIndex, duration, onComplete);
    } else {
      console.warn('❌ animateAngleEquality method not found');
      if (onComplete) {
        console.log('🔧 Calling onComplete as fallback');
        setTimeout(() => onComplete(), duration);
      }
    }
  }, [quadComponentId]);

  // Add property showcase description (adds to descriptions array, doesn't replace)
  const addPropertyShowcaseDescription = React.useCallback((propertyShowcaseId, propertyIndex, descriptionText) => {
    if (typeof document === 'undefined') return;
    
    
    // Helper function to find element with retry logic
    const findElementWithRetry = (id, maxAttempts = 10, delay = 200) => {
      let attempts = 0;
      const tryFind = () => {
        attempts++;
        let element = document.getElementById(id);
        
        // If not found by ID, try by data-component-id
        if (!element) {
          element = document.querySelector(`[data-component-id="${id}"]`);
        }
        
        // Try finding by data-element-name
        if (!element) {
          const elementName = id.replace(/^page\d+-/, '');
          element = document.querySelector(`[data-element-name="${elementName}"]`);
        }
        
        if (element) {
          return element;
        }
        
        if (attempts < maxAttempts) {
          setTimeout(tryFind, delay);
          return null;
        }
        
        return null;
      };
      return tryFind();
    };
    
    // Helper: get description text font size in px (90% of propertyDescriptionFontSize, same as PropertyShowcaseComponent)
    const getDescriptionFontSizePx = () => {
      if (typeof propertyDescriptionFontSize === 'string' && propertyDescriptionFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const fullPx = window.GridCellFontUtils.processGcProperty(propertyDescriptionFontSize, 'fontSize');
        if (typeof fullPx === 'string' && fullPx.endsWith('px')) {
          const pxNum = parseFloat(fullPx) || 18;
          return Math.round(pxNum * 0.9) + 'px';
        }
      }
      return '15px'; // fallback
    };
    const descriptionFontSizePx = getDescriptionFontSizePx();

    // Helper function to add description to the found element
    const addDescriptionToElement = (element, propIndex, descText) => {
      
      // Structure: root div > [header?, headerDescription?, properties-container div > property divs]
      // Find the properties container - it's a direct child div that contains property divs
      // The properties container has key='properties-container' but React doesn't expose keys in DOM
      // So we look for a div that has multiple direct children (property divs)
      let propertiesContainer = null;
      
      // Strategy 1: Look for a div with multiple children (likely the properties container)
      for (const child of Array.from(element.children)) {
        if (child.tagName === 'DIV' && child.children.length > 0) {
          // Check if this looks like a properties container (has divs that look like property containers)
          const childDivs = Array.from(child.children).filter(c => c.tagName === 'DIV');
          if (childDivs.length >= 2) { // At least 2 properties (Sides, Angles, etc.)
            propertiesContainer = child;
            break;
          }
        }
      }
      
      // Strategy 2: If not found, the properties might be direct children of the root
      if (!propertiesContainer) {
        // Check if root element's direct children look like property containers
        const directPropertyDivs = Array.from(element.children).filter(child => {
          if (child.tagName !== 'DIV') return false;
          // Property container has at least one child (property-row)
          return child.children.length >= 1;
        });
        
        if (directPropertyDivs.length >= 2) {
          // Properties are direct children of root
          propertiesContainer = element;
        }
      }
      
      if (!propertiesContainer) {
        console.error(`❌ Could not find properties container`);
        return;
      }
      
      // Get all property containers (direct children of properties container)
      const propertyContainers = Array.from(propertiesContainer.children).filter(child => {
        // Property containers are divs with at least 1 child (property-row)
        return child.tagName === 'DIV' && child.children.length >= 1;
      });
      
      
      if (propIndex < 0 || propIndex >= propertyContainers.length) {
        console.error(`❌ Invalid property index ${propIndex}. Available indices: 0-${propertyContainers.length - 1}`);
        return;
      }
      
      // Get the target property container
      const propertyContainer = propertyContainers[propIndex];
      
      // Find the descriptions container within this property
      // Structure: property container > [property-row div, descriptions-container div]
      let descriptionsContainer = null;
      
      // Look for the descriptions container (should be a sibling of property-row)
      for (const child of Array.from(propertyContainer.children)) {
        if (child.tagName !== 'DIV') continue;
        
        // Property-row contains the property name (short text)
        // Descriptions container is the other div (may be empty or have description divs)
        const hasShortText = Array.from(child.children).some(grandchild => {
          const text = (grandchild.textContent || '').trim();
          // Property row contains short text (property name like "Sides", "Angles")
          return text.length > 0 && text.length < 20;
        });
        
        if (!hasShortText) {
          // This is likely the descriptions container
          descriptionsContainer = child;
          break;
        }
      }
      
      // If not found, create it (matching React structure)
      if (!descriptionsContainer) {
        descriptionsContainer = document.createElement('div');
        // Match React component structure: descriptions-container-{propertyIndex}
        descriptionsContainer.setAttribute('data-descriptions-container', propIndex);
        
        // Copy styles from existing descriptions containers if available
        const otherProperties = Array.from(propertiesContainer.children);
        for (const otherProp of otherProperties) {
          const otherDescContainer = Array.from(otherProp.children).find(child => {
            if (child.tagName !== 'DIV') return false;
            const hasShortText = Array.from(child.children).some(grandchild => {
              const text = (grandchild.textContent || '').trim();
              return text.length > 0 && text.length < 20;
            });
            return !hasShortText; // This is the descriptions container
          });
          
          if (otherDescContainer) {
            const computedStyle = window.getComputedStyle(otherDescContainer);
            descriptionsContainer.style.display = computedStyle.display || 'flex';
            descriptionsContainer.style.flexDirection = computedStyle.flexDirection || 'column';
            descriptionsContainer.style.overflow = computedStyle.overflow || 'hidden';
            descriptionsContainer.style.transition = computedStyle.transition || 'max-height 0.3s ease';
            descriptionsContainer.style.maxHeight = 'none'; // Make it visible
            break;
          }
        }
        
        // Default styles if no existing container found
        if (!descriptionsContainer.style.display) {
          descriptionsContainer.style.cssText = 
            'display: flex;' +
            'flex-direction: column;' +
            'gap: 8px;' +
            'overflow: visible;' + // Make it visible
            'max-height: none;' + // No height restriction
            'transition: max-height 0.3s ease;';
        }
        
        propertyContainer.appendChild(descriptionsContainer);
      } else {
        // Ensure existing container is visible/expanded
        descriptionsContainer.style.maxHeight = 'none';
        descriptionsContainer.style.overflow = 'visible';
      }
      
      // Check if description already exists (avoid duplicates)
      const existingDescriptions = Array.from(descriptionsContainer.children);
      const descriptionTextContent = typeof descText === 'string' ? descText.replace(/<[^>]+>/g, '') : '';
      const isDuplicate = existingDescriptions.some(desc => {
        const existingText = (desc.textContent || '').replace(/<[^>]+>/g, '');
        return existingText.trim() === descriptionTextContent.trim();
      });
      
      if (isDuplicate) {
        console.log(`⚠️ Description already exists for property index ${propIndex}, skipping...`);
        return;
      }
      
      // Get the next description index (count existing descriptions)
      const existingDescriptionCount = descriptionsContainer.children.length;
      const descriptionIndex = existingDescriptionCount;
      
      // Create new description element matching React structure exactly
      // Structure: description div (key: description-{propertyIndex}-{descriptionIndex}) > text div (key: text-{propertyIndex}-{descriptionIndex})
      const descriptionDiv = document.createElement('div');
      
      // Create text div with HTML content (matches React structure)
      const textDiv = document.createElement('div');
      
      const containsHTML = typeof descText === 'string' && /<[^>]+>/.test(descText);
      const containsLaTeX = typeof descText === 'string' && /\$/.test(descText);
      
      // Copy ALL styles from existing descriptions if available (must match exactly)
      if (existingDescriptions.length > 0) {
        const firstExisting = existingDescriptions[0];
        const firstTextDiv = firstExisting.querySelector('div');
        
        if (firstTextDiv) {
          // Use exact styles as specified (don't copy from existing, use the standard style)
          descriptionDiv.style.cssText = 
            'display: flex;' +
            'align-items: flex-start;' +
            'gap: 12px;' +
            'padding: 16px;' +
            'margin-left: 40px;' +
            'background-color: rgba(0, 229, 255, 0.15);' +
            'border-radius: 8px;' +
            'border-left: 3px solid rgb(0, 229, 255);' +
            'box-shadow: rgba(0, 229, 255, 0.3) 0px 4px 8px;' +
            'transition: background-color 0.3s, border-color 0.3s, opacity 0.3s, transform 0.3s, box-shadow 0.3s;' +
            'opacity: 1;';
          
          textDiv.style.cssText = 
            'font-size: ' + descriptionFontSizePx + ';' +
            'color: rgb(255, 255, 255);' +
            'font-weight: normal;' +
            'opacity: 1;' +
            'flex: 1 1 0%;' +
            'line-height: 1.4;';
        }
      } else {
        // Default styles: use same description font size as PropertyShowcaseComponent (gc → px at 90%)
        descriptionDiv.style.cssText = 
          'display: flex;' +
          'align-items: flex-start;' +
          'gap: 12px;' +
          'padding: 16px;' +
          'margin-left: 40px;' +
          'background-color: rgba(0, 229, 255, 0.15);' +
          'border-radius: 8px;' +
          'border-left: 3px solid rgb(0, 229, 255);' +
          'box-shadow: rgba(0, 229, 255, 0.3) 0px 4px 8px;' +
          'transition: background-color 0.3s, border-color 0.3s, opacity 0.3s, transform 0.3s, box-shadow 0.3s;' +
          'opacity: 1;';
        
        textDiv.style.cssText = 
          'font-size: ' + descriptionFontSizePx + ';' +
          'color: rgb(255, 255, 255);' +
          'font-weight: normal;' +
          'opacity: 1;' +
          'flex: 1 1 0%;' +
          'line-height: 1.4;';
      }
      
      // Set HTML content (React uses dangerouslySetInnerHTML for HTML)
      if (containsHTML || containsLaTeX) {
        textDiv.innerHTML = descText;
      } else {
        textDiv.textContent = descText;
      }
      
      // Mark as dynamically added for easy identification during reset
      descriptionDiv.setAttribute('data-dynamic', 'true');
      descriptionDiv.setAttribute('data-description-index', descriptionsContainer.children.length);
      
      // Append text div to description div, then description div to container
      descriptionDiv.appendChild(textDiv);
      descriptionsContainer.appendChild(descriptionDiv);
      
      
    };
    
    // Try to find the element
    let propertyShowcaseElement = document.getElementById(propertyShowcaseId);
    
    if (!propertyShowcaseElement) {
      // Try alternative methods
      propertyShowcaseElement = document.querySelector(`[data-component-id="${propertyShowcaseId}"]`) ||
                                document.querySelector(`[data-element-name="${propertyShowcaseId.replace(/^page\d+-/, '')}"]`);
    }
    
    if (!propertyShowcaseElement) {
      // Retry with delay (element might not be rendered yet)
      setTimeout(() => {
        const retryElement = document.getElementById(propertyShowcaseId) ||
                            document.querySelector(`[data-component-id="${propertyShowcaseId}"]`) ||
                            document.querySelector(`[data-element-name="${propertyShowcaseId.replace(/^page\d+-/, '')}"]`);
        
        if (retryElement) {
          addDescriptionToElement(retryElement, propertyIndex, descriptionText);
        } else {
          console.warn(`Property showcase element ${propertyShowcaseId} not found after retry`);
        }
      }, 500);
      return;
    }
    
    // Call the helper function with the found element
    addDescriptionToElement(propertyShowcaseElement, propertyIndex, descriptionText);
  }, [propertyDescriptionFontSize]);

  // Handle animation complete for second pair (if configured)
  const handleSecondPairAnimationComplete = React.useCallback(() => {
    if (!secondPair) return;
    
    
    // Step: Show proven message
    setCurrentStep(9);
    updateMessageBox(secondPair.provenMessage);
    // Keep sides highlighted but stop blinking
    updateQuadSides(secondPair.highlightColor, secondPair.highlightColor, false, false, secondPair.side1Index, secondPair.side2Index);
    
    // Step: Add Parallel Symbols
    setTimeout(() => {
      setCurrentStep(10);
      // Add chevrons using configured color and type
      addParallelArrows(secondPair.side1Index, secondPair.side2Index, secondPair.pairName, secondPair.chevronColor, secondPair.doubleChevron);
      // Stop blinking after adding arrows
      updateQuadSides(secondPair.highlightColor, secondPair.highlightColor, false, false, secondPair.side1Index, secondPair.side2Index);
      
      // Step 11: Update property showcase description
        setTimeout(() => {
        setCurrentStep(11);
        // Note: Property showcase description is now added in Step 12, not Step 11

        const propertyShowcaseId = sequenceConfig.propertyShowcaseId || 'page3-property-showcase';
        const firstDescriptionText = sequenceConfig.propertyDescriptionText || "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Two pairs</span> <span style='color: #FFFFFF;'>of opposite sides are</span> <span style='color: #FF9900;'>parallel.</span>";
        addPropertyShowcaseDescription(propertyShowcaseId, 0, firstDescriptionText); // Index 0 = "Sides"

        if (useAllSidesEqualAnimation) {
          // All four sides equal: line rotates once to next side then moves on (no repeat)
          const totalSideAnimationTime = sideEqualityAnimationDuration + sideEqualityAnimationWaitTime;

          const runVertex = (vertexIndex, stepNum, message, onDone) => {
            const delay = (vertexIndex === 1) ? 500 : 600;
            setTimeout(() => {
              setCurrentStep(stepNum);
              triggerSideEqualityAnimation(vertexIndex);
              setTimeout(() => {
                updateMessageBox(message);
                if (onDone) onDone();
              }, totalSideAnimationTime);
            }, delay);
          };

          // Order: B(1), C(2), D(3), A(0) so line starts on AB, pivots B→BC→C→CD→D→DA→A→AB
          runVertex(1, 12, sidesEqualAtVertex1Message || "Sides AB and BC are equal.", () => {
            runVertex(2, 13, sidesEqualAtVertex2Message || "Sides BC and CD are equal.", () => {
              runVertex(3, 14, sidesEqualAtVertex3Message || "Sides CD and DA are equal.", () => {
                runVertex(0, 15, sidesEqualAtVertex0Message || "Sides DA and AB are equal.", () => {
                  setTimeout(() => {
                    setCurrentStep(16);
                    updateMessageBox(allSidesEqualConclusionMessage || "All four sides are equal in length.");
                    if (allSidesEqualDescriptionText) {
                      addPropertyShowcaseDescription(propertyShowcaseId, 0, allSidesEqualDescriptionText);
                    }
                    if (typeof window !== 'undefined' && quadComponentId) {
                      window.dispatchEvent(new CustomEvent('quadrilateralShowSideSymbols', { detail: { quadId: quadComponentId } }));
                    }
                    const instructionId = sequenceConfig.instructionId;
                    if (instructionId && sequenceConfig.instructionText) {
                      updateInstructionText(instructionId, sequenceConfig.instructionText);
                    }
                    enableNextButtonAndTap();
                  }, 2000);
                });
              });
            });
          });
        } else {
          // Opposite side equality animation (original: AB/CD then BC/DA)
          setTimeout(() => {
            setCurrentStep(12);
            triggerOppositeSideEqualityAnimation(0);
            const oppositeSideAnimationDuration = sequenceConfig.oppositeSideAnimationDuration || 2000;
            const oppositeSideAnimationWaitTime = sequenceConfig.oppositeSideAnimationWaitTime || 500;
            const oppositeSideAnimationCycles = sequenceConfig.oppositeSideAnimationCycles || 2;
            const cycleTime = (oppositeSideAnimationDuration + oppositeSideAnimationWaitTime) * 2;
            const totalAnimationTime = cycleTime * oppositeSideAnimationCycles;

            setTimeout(() => {
              setCurrentStep(13);
              updateMessageBox(sidesABEqualMessage || "The sides AB and CD are equal");
              setTimeout(() => {
                setCurrentStep(14);
                triggerOppositeSideEqualityAnimation(1);
                setTimeout(() => {
                  setCurrentStep(15);
                  updateMessageBox(sidesBCEqualMessage || "The sides BC and DA are equal");
                  setTimeout(() => {
                    setCurrentStep(16);
                    updateMessageBox(sidesEqualConclusionMessage || "Two pairs of opposite sides are equal in length.");
                    if (secondDescriptionText) {
                      addPropertyShowcaseDescription(propertyShowcaseId, 0, secondDescriptionText);
                    }
                    const instructionId = sequenceConfig.instructionId;
                    if (instructionId && sequenceConfig.instructionText) {
                      updateInstructionText(instructionId, sequenceConfig.instructionText);
                    }
                    enableNextButtonAndTap();
                  }, 2000);
                }, totalAnimationTime);
              }, 1000);
            }, totalAnimationTime);
          }, 1500);
        }
      }, symbolDelay);
    }, symbolDelay);
  }, [secondPair, updateMessageBox, updateQuadSides, addParallelArrows, conclusionMessage, conclusionDelay, enableNextButtonAndTap, addPropertyShowcaseDescription, triggerOppositeSideEqualityAnimation, triggerSideEqualityAnimation, updateInstructionText, sequenceConfig, sidesABEqualMessage, sidesBCEqualMessage, sidesEqualConclusionMessage, useAllSidesEqualAnimation, sideEqualityAnimationDuration, sideEqualityAnimationWaitTime, sideEqualityAnimationCycles, sidesEqualAtVertex0Message, sidesEqualAtVertex1Message, sidesEqualAtVertex2Message, sidesEqualAtVertex3Message, allSidesEqualConclusionMessage, allSidesEqualDescriptionText, secondDescriptionText]);

  // Start second pair sequence (if configured)
  const startSecondPairSequence = React.useCallback(() => {
    if (!secondPair) return;
    
    // Step: Show initial message again and highlight sides
    setCurrentStep(7);
    if (secondPair.initialMessage) {
      updateMessageBox(secondPair.initialMessage);
    }
    // Make sides highlighted and blinking
    updateQuadSides(secondPair.highlightColor, secondPair.highlightColor, true, true, secondPair.side1Index, secondPair.side2Index);

    // Step: Trigger parallel animation
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentStep(8);
      triggerParallelAnimation(secondPair.pairIndex, handleSecondPairAnimationComplete);
    }, sideHighlightDuration);
  }, [secondPair, sideHighlightDuration, updateQuadSides, triggerParallelAnimation, handleSecondPairAnimationComplete, updateMessageBox]);

  // Handle animation complete for first pair
  const handleFirstPairAnimationComplete = React.useCallback(() => {
    
    // Step: Show proven message
    setCurrentStep(4);
    updateMessageBox(firstPair.provenMessage);
    // Keep sides highlighted but stop blinking
    updateQuadSides(firstPair.highlightColor, firstPair.highlightColor, false, false, firstPair.side1Index, firstPair.side2Index);
    
    // Step: Add Parallel Symbols
    setTimeout(() => {
      setCurrentStep(5);
      // Add chevrons using configured color and type
      addParallelArrows(firstPair.side1Index, firstPair.side2Index, firstPair.pairName, firstPair.chevronColor, firstPair.doubleChevron);
      // Stop blinking after adding arrows
      updateQuadSides(firstPair.highlightColor, firstPair.highlightColor, false, false, firstPair.side1Index, firstPair.side2Index);
      
      // If second pair is configured, wait and start it
      if (secondPair) {
        setTimeout(() => {
          setCurrentStep(6);
          startSecondPairSequence();
        }, waitBetweenPairs);
      } else {
        // No second pair - show conclusion and enable next button/tap animation
        if (conclusionMessage || conclusionMessageKey) {
          const conclusionText = (typeof window !== 'undefined' && window.i18n && conclusionMessageKey) ? window.i18n.t(conclusionMessageKey) : conclusionMessage;
          setTimeout(() => {
            updateMessageBox(conclusionText);
            // Enable next button and tap animation
            enableNextButtonAndTap();
          }, conclusionDelay);
        } else {
          // Enable next button and tap animation even without conclusion message
          setTimeout(() => {
            enableNextButtonAndTap();
          }, conclusionDelay);
        }
      }
    }, symbolDelay);
  }, [firstPair, updateMessageBox, updateQuadSides, addParallelArrows, secondPair, waitBetweenPairs, startSecondPairSequence, conclusionMessage, conclusionMessageKey, conclusionDelay, enableNextButtonAndTap]);

  // Function to show diagonals programmatically
  const showDiagonalsProgrammatically = React.useCallback((quadComponentId) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      console.warn('Document or window not available');
      return;
    }
    
    console.log(`🔍 Attempting to show diagonals for ${quadComponentId}`);
    
    // Dispatch custom event for quadrilateral to listen - no global state needed
    const event = new CustomEvent('quadDisplayChanged', {
      detail: {
        quadId: quadComponentId,
        property: 'showDiagonals',
        value: true
      }
    });
    window.dispatchEvent(event);
    console.log(`✅ Dispatched quadDisplayChanged event for ${quadComponentId}`);
    
    // Retry after a short delay to ensure component is mounted
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
        detail: {
          quadId: quadComponentId,
          property: 'showDiagonals',
          value: true
        }
      }));
      console.log(`🔄 Re-dispatched event after delay`);
    }, 200);
  }, []);

  // Function to trigger symmetry fold animation
  const triggerSymmetryAnimation = React.useCallback((quadComponentId, axis, duration, holdTime, onComplete, cycles = 1) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      console.warn('Document or window not available');
      return;
    }
    
    console.log(`🔍 Attempting to trigger symmetry animation for ${quadComponentId} along ${axis} axis`);
    
    // Helper function to try triggering the animation
    const tryTriggerAnimation = (maxAttempts = 5, attempt = 1) => {
      console.log(`🔍 Attempt ${attempt}/${maxAttempts}: Looking for element with ID: ${quadComponentId}`);
      
      // Find the quadrilateral element
      let quadElement = document.getElementById(quadComponentId);
      if (!quadElement) {
        console.log(`⚠️ Element not found by ID, trying alternative methods...`);
        // Try alternative methods
        const elementName = quadComponentId.replace(/^page\d+-/, '');
        quadElement = document.querySelector(`[data-component-id="${quadComponentId}"]`) ||
                      document.querySelector(`[data-element-name="${elementName}"]`);
        console.log(`🔍 Tried data-component-id and data-element-name="${elementName}", found:`, quadElement ? 'YES' : 'NO');
      } else {
        console.log(`✅ Found element by ID:`, quadElement);
      }
      
      if (quadElement) {
        console.log(`🔍 Checking for animateSymmetryFold method on element...`);
        console.log(`   - Element ID: ${quadElement.id}`);
        console.log(`   - Element classes: ${quadElement.className}`);
        console.log(`   - Has animateSymmetryFold: ${!!quadElement.animateSymmetryFold}`);
        console.log(`   - Available methods:`, Object.keys(quadElement).filter(k => k.includes('animate') || k.includes('Symmetry')));
        
        if (quadElement.animateSymmetryFold) {
          // Call the symmetry fold animation method
          try {
            console.log(`🎬 Calling animateSymmetryFold with axis="${axis}", duration=${duration}, holdTime=${holdTime}, cycles=${cycles}`);
            
            // If cycles > 1, run the animation multiple times
            if (cycles > 1) {
              let currentCycle = 0;
              const runCycle = () => {
                currentCycle++;
                console.log(`🔄 Running symmetry animation cycle ${currentCycle}/${cycles}`);
                
                const isLastCycle = currentCycle === cycles;
                quadElement.animateSymmetryFold(axis, {
                  duration: duration,
                  holdTime: holdTime,
                  onComplete: isLastCycle ? onComplete : () => {
                    // Wait a bit before next cycle
                    setTimeout(() => {
                      runCycle();
                    }, 500); // Small delay between cycles
                  }
                });
              };
              runCycle();
            } else {
              // Single cycle
              quadElement.animateSymmetryFold(axis, {
                duration: duration,
                holdTime: holdTime,
                onComplete: onComplete
              });
            }
            console.log(`✅ Successfully triggered symmetry fold animation along ${axis} axis`);
            return true;
          } catch (error) {
            console.error(`❌ Error calling animateSymmetryFold:`, error);
            console.error(`   Error stack:`, error.stack);
            return false;
          }
        }
      }
      
      // If element found but method not available, try alternative methods
      // Try alternative methods
        const quadId = quadComponentId.replace(/-/g, '_');
        const globalFunction = window[`animateSymmetryFold_${quadId}`];
        if (globalFunction) {
          try {
            // Handle cycles for global function
            if (cycles > 1) {
              let currentCycle = 0;
              const runCycle = () => {
                currentCycle++;
                const isLastCycle = currentCycle === cycles;
                globalFunction(axis, { 
                  duration, 
                  holdTime, 
                  onComplete: isLastCycle ? onComplete : () => {
                    setTimeout(() => runCycle(), 500);
                  }
                });
              };
              runCycle();
            } else {
              globalFunction(axis, { duration, holdTime, onComplete });
            }
            console.log(`✅ Triggered symmetry fold animation via global function`);
            return true;
          } catch (error) {
            console.error(`❌ Error calling global symmetry function:`, error);
            return false;
          }
        } else if (window.quadrilateralAnimations && window.quadrilateralAnimations[quadComponentId]) {
          const animObj = window.quadrilateralAnimations[quadComponentId];
          if (animObj.animateSymmetryFold) {
            try {
              // Handle cycles for registry function
              if (cycles > 1) {
                let currentCycle = 0;
                const runCycle = () => {
                  currentCycle++;
                  const isLastCycle = currentCycle === cycles;
                  animObj.animateSymmetryFold(axis, { 
                    duration, 
                    holdTime, 
                    onComplete: isLastCycle ? onComplete : () => {
                      setTimeout(() => runCycle(), 500);
                    }
                  });
                };
                runCycle();
              } else {
                animObj.animateSymmetryFold(axis, { duration, holdTime, onComplete });
              }
              console.log(`✅ Triggered symmetry fold animation via registry`);
              return true;
            } catch (error) {
              console.error(`❌ Error calling registry symmetry function:`, error);
              return false;
            }
          }
        }
        
      // Retry if not found and attempts remaining
      if (attempt < maxAttempts) {
        console.log(`⚠️ Symmetry animation function not found, retrying... (attempt ${attempt}/${maxAttempts})`);
        setTimeout(() => {
          tryTriggerAnimation(maxAttempts, attempt + 1);
        }, 300); // Wait 300ms before retry
        return false;
      } else {
        console.warn(`⚠️ Could not find symmetry fold animation function for ${quadComponentId} after ${maxAttempts} attempts`);
        return false;
      }
    };
    
    // Start trying to trigger the animation
    tryTriggerAnimation();
  }, []);

  // Start animation sequence
  React.useEffect(() => {
    // Step 0: Initialization - Wait for components to mount
    startTimeoutRef.current = setTimeout(() => {
      // Symmetry animation sequence (for page 6)
      if (showSymmetryAnimation) {
        setCurrentStep(1);
        // Step 1: Update message box first
        updateMessageBox(step1SymmetryMessage || "Let's check symmetry of this shape along the horizontal axis");
        
        // Step 1: Trigger symmetry fold animation along horizontal axis
        // Wait 2000ms before starting the animation
        setTimeout(() => {
          const totalAnimationTime = symmetryDuration + symmetryHoldTime + symmetryDuration; // fold + hold + unfold
          
          triggerSymmetryAnimation(
            quadComponentId,
            symmetryAxis,
            symmetryDuration,
            symmetryHoldTime,
            () => {
              // Step 1 complete - now Step 2
              setCurrentStep(2);
              
              // Step 2: Update message box
              if (step2SymmetryMessage) {
                updateMessageBox(step2SymmetryMessage);
              }
              
              // Step 3: Wait a bit, then trigger vertical symmetry animation
              setTimeout(() => {
                setCurrentStep(3);
                updateMessageBox(step3SymmetryMessage || "Let's check symmetry of this shape along the vertical axis");
                
                // Wait 2000ms before starting vertical animation
                setTimeout(() => {
                  triggerSymmetryAnimation(
                    quadComponentId,
                    step3SymmetryAxis || 'vertical',
                    symmetryDuration,
                    symmetryHoldTime,
                    () => {
                      // Step 3 complete - now Step 4
                      setCurrentStep(4);
                      if (step4SymmetryMessage) {
                        updateMessageBox(step4SymmetryMessage);
                      }
                      
                      const runStep5AndBeyond = () => {
                        setCurrentStep(5);
                        if (step5PropertyIndex !== undefined && step5DescriptionText && propertyShowcaseId) {
                          addPropertyShowcaseDescription(propertyShowcaseId, step5PropertyIndex, step5DescriptionText);
                        }
                        if (showRotationalSymmetry) {
                          // Step 6: Rotational symmetry animation
                          setTimeout(() => {
                            setCurrentStep(6);
                            if (step6RotationalMessage) {
                              updateMessageBox(step6RotationalMessage);
                            }
                            
                            // Wait 500ms then start rotational symmetry animation
                            setTimeout(() => {
                              const quadEl = document.getElementById(quadComponentId);
                              if (quadEl && quadEl.animateRotationalSymmetry) {
                                let rotationalFallbackId;
                                const matchedAngles = [];
                                
                                // Format angles for message: "180°" or "180° and 360°" or "90°, 180° and 270°"
                                const formatAngles = (angles) => {
                                  if (angles.length === 0) return '';
                                  if (angles.length === 1) return angles[0] + ' deg';
                                  if (angles.length === 2) return angles[0] + ' deg and ' + angles[1] + ' deg';
                                  const last = angles.pop();
                                  return angles.map(a => a + ' deg').join(', ') + ' and ' + last + ' deg';
                                };
                                
                                // Handler for each rotational symmetry match (pause at 180°, 360°, etc.)
                                const handleRotationalMatch = (e) => {
                                  console.log('[Sequence] rotationalSymmetryMatch received', e.detail, 'quadComponentId=', quadComponentId, 'match?', e.detail && e.detail.quadId === quadComponentId);
                                  if (!e.detail || e.detail.quadId !== quadComponentId) return;
                                  const angle = e.detail.angle;
                                  if (typeof angle === 'number' && matchedAngles.indexOf(angle) === -1) {
                                    matchedAngles.push(angle);
                                    matchedAngles.sort((a, b) => a - b);
                                    const anglesText = formatAngles(matchedAngles.slice());
                                    const message = step6RotationalMatchMessage ? step6RotationalMatchMessage.replace(/\{angles\}/g, anglesText) : '';
                                    console.log('[Sequence] updating messagebox with match message', { matchedAngles, anglesText, message });
                                    if (step6RotationalMatchMessage) {
                                      updateMessageBox(message);
                                    }
                                  }
                                };
                                
                                // Handler for when animation completes
                                const handleRotationalComplete = (e) => {
                                  console.log('[Sequence] rotationalSymmetryAnimationComplete received', e.detail, 'quadComponentId=', quadComponentId, 'match?', e.detail && e.detail.quadId === quadComponentId);
                                  if (!e.detail || e.detail.quadId !== quadComponentId) return;
                                  clearTimeout(rotationalFallbackId);
                                  window.removeEventListener('rotationalSymmetryAnimationComplete', handleRotationalComplete);
                                  window.removeEventListener('rotationalSymmetryMatch', handleRotationalMatch);
                                  
                                  // Do not update message box - leave it at "180 deg and 360 deg"
                                  
                                  // Add description to property showcase
                                  if (step6RotationalDescriptionText && step5PropertyIndex !== undefined && propertyShowcaseId) {
                                    setTimeout(() => {
                                      addPropertyShowcaseDescription(propertyShowcaseId, step5PropertyIndex, step6RotationalDescriptionText);
                                    }, 800);
                                  }
                                  
                                  // Update instruction text and enable next button
                                  setTimeout(() => {
                                    if (instructionId && instructionText) {
                                      updateInstructionText(instructionId, instructionText);
                                    }
                                    enableNextButtonAndTap();
                                  }, 1500);
                                };
                                
                                console.log('[Sequence] adding rotational symmetry listeners and starting animation', { quadComponentId });
                                window.addEventListener('rotationalSymmetryMatch', handleRotationalMatch);
                                window.addEventListener('rotationalSymmetryAnimationComplete', handleRotationalComplete);
                                quadEl.animateRotationalSymmetry();
                                
                                // Fallback timeout
                                // Fallback must be longer than actual animation (e.g. duration 10000 + pause 3000*2 = 16000ms)
                                rotationalFallbackId = setTimeout(() => {
                                  console.log('[Sequence] rotational symmetry FALLBACK timeout fired');
                                  window.removeEventListener('rotationalSymmetryAnimationComplete', handleRotationalComplete);
                                  window.removeEventListener('rotationalSymmetryMatch', handleRotationalMatch);
                                  if (step6RotationalDescriptionText && step5PropertyIndex !== undefined && propertyShowcaseId) {
                                    addPropertyShowcaseDescription(propertyShowcaseId, step5PropertyIndex, step6RotationalDescriptionText);
                                  }
                                  if (instructionId && instructionText) updateInstructionText(instructionId, instructionText);
                                  enableNextButtonAndTap();
                                }, 20000); // 20s so it doesn't fire before animation ends (animation can be ~16s)
                              } else {
                                // No rotational symmetry animation, proceed to completion
                                if (instructionId && instructionText) updateInstructionText(instructionId, instructionText);
                                enableNextButtonAndTap();
                              }
                            }, 500);
                          }, 1000); // Wait 1000ms after Step 5
                        } else {
                          setTimeout(() => {
                            if (instructionId && instructionText) {
                              updateInstructionText(instructionId, instructionText);
                            }
                            setTimeout(() => enableNextButtonAndTap(), 500);
                          }, 1000);
                        }
                      };
                      if (showDiagonalSymmetry && step4bSymmetryMessage) {
                        setTimeout(() => {
                          updateMessageBox(step4bSymmetryMessage);
                          triggerSymmetryAnimation(
                            quadComponentId,
                            step4bSymmetryAxis || 'diagonal1',
                            symmetryDuration,
                            symmetryHoldTime,
                            () => {
                              if (step4cSymmetryMessage) updateMessageBox(step4cSymmetryMessage);
                              setTimeout(runStep5AndBeyond, 1000);
                            },
                            step4bSymmetryCycles
                          );
                        }, 1000);
                      } else {
                        setTimeout(runStep5AndBeyond, 1000);
                      }
                    },
                    1 // Always run only once - each animation happens only once
                  );
                }, 2000); // Wait 2000ms before starting vertical animation
              }, 1000); // Wait 1000ms after Step 2
            },
            1 // Always run only once - each animation happens only once
          );
        }, 2000); // 2000ms delay before starting first animation
      } else if (showDiagonals) {
        setCurrentStep(1);
        // Step 1: Show diagonals
        // Wait a bit longer to ensure the component is fully mounted
        setTimeout(() => {
          showDiagonalsProgrammatically(quadComponentId);
          
          // Step 2: Update message box
          setTimeout(() => {
            setCurrentStep(2);
            if (step2Message) {
              updateMessageBox(step2Message);
            }
            
            // Step 3: Update property showcase
            setTimeout(() => {
              setCurrentStep(3);
              if (step3PropertyIndex !== undefined && step3DescriptionText && propertyShowcaseId) {
                addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step3DescriptionText);
              }
              
              // Step 5: Wait 2000ms and run diagonal equality animation
              setTimeout(() => {
                setCurrentStep(5);
                
                // Resolve quad: DOM element with methods, or global registry (in case id is on a wrapper)
                const quadElement = document.getElementById(quadComponentId);
                const registry = (typeof window !== 'undefined' && window.quadrilateralAnimations) ? window.quadrilateralAnimations[quadComponentId] : null;
                const animateDiagonalEqualityFn = (quadElement && quadElement.animateDiagonalEquality) ? quadElement.animateDiagonalEquality.bind(quadElement) : (registry && typeof registry.animateDiagonalEquality === 'function' ? registry.animateDiagonalEquality : null);
                const stopDiagonalEqualityFn = (quadElement && quadElement.stopDiagonalEqualityAnimation) ? quadElement.stopDiagonalEqualityAnimation.bind(quadElement) : (registry && typeof registry.stopDiagonalEqualityAnimation === 'function' ? registry.stopDiagonalEqualityAnimation : null);
                
                if (animateDiagonalEqualityFn) {
                  const onComplete = () => {
                    if (diagonalEqualityCompletedRef.current) return;
                    diagonalEqualityCompletedRef.current = true;
                    // Remove dashed animation overlay and set both diagonals to orange, solid
                    if (stopDiagonalEqualityFn) {
                      stopDiagonalEqualityFn();
                    }
                    const orangeSolid = { color: '#FF6600', thickness: '4gc', style: 'solid' };
                    window.dispatchEvent(new CustomEvent('quadDisplayChanged', { detail: { quadId: quadComponentId, property: 'diagonal1', value: orangeSolid } }));
                    window.dispatchEvent(new CustomEvent('quadDisplayChanged', { detail: { quadId: quadComponentId, property: 'diagonal2', value: orangeSolid } }));
                    // Step 6: After animation completes
                    setCurrentStep(6);
                    if (step6Message) {
                      updateMessageBox(step6Message);
                    }
                    if (step6DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                      addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step6DescriptionText);
                    }
                    
                    // Check if we should measure diagonal angle
                    if (measureDiagonalAngle) {
                      // Step 7: Measure diagonal angle
                      setTimeout(() => {
                        setCurrentStep(7);
                        
                        if (step7Message) {
                          updateMessageBox(step7Message);
                        }
                        
                        // Trigger measure diagonal angle animation
                        setTimeout(() => {
                          const quadElement = document.getElementById(quadComponentId);
                          if (quadElement && quadElement.animateMeasureDiagonalAngle) {
                            let measureAngleFallbackId;
                            const handleMeasureComplete = (event) => {
                              if (!event.detail || event.detail.quadId !== quadComponentId) return;
                              clearTimeout(measureAngleFallbackId);
                              window.removeEventListener('measureDiagonalAngleComplete', handleMeasureComplete);
                              
                              // Step 8: Show angle and add description
                              setCurrentStep(8);
                              const angle = event.detail.angle;
                              if (typeof angle === 'number' && diagonalAngleMessage) {
                                updateMessageBox(diagonalAngleMessage.replace(/\{angle\}/g, String(angle)));
                              }
                              if (step7DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step7DescriptionText);
                              }
                              // Wait 1500ms then run diagonal bisection step
                              setTimeout(() => {
                                // Hide the protractor before the bisection animation starts
                                if (typeof window !== 'undefined' && window.removeAllProtractors) {
                                  window.removeAllProtractors();
                                }
                                if (step8Message) {
                                  updateMessageBox(step8Message);
                                }
                                setTimeout(() => {
                                  const quadEl = document.getElementById(quadComponentId);
                                  if (quadEl && quadEl.animateDiagonalBisection) {
                                    let bisectionFallbackId;
                                    
                                    // Handler for when AC diagonal bisection is proven (AO rotated to OC)
                                    const handleACProven = (e) => {
                                      if (!e.detail || e.detail.quadId !== quadComponentId) return;
                                      window.removeEventListener('diagonalBisectionACProven', handleACProven);
                                      if (step8ACMessage) {
                                        updateMessageBox(step8ACMessage);
                                      }
                                    };
                                    
                                    // Handler for when BD diagonal bisection is proven (BO rotated to OD)
                                    const handleBDProven = (e) => {
                                      if (!e.detail || e.detail.quadId !== quadComponentId) return;
                                      window.removeEventListener('diagonalBisectionBDProven', handleBDProven);
                                      if (step8BDMessage) {
                                        updateMessageBox(step8BDMessage);
                                      }
                                    };
                                    
                                    // Handler for when entire bisection animation is complete
                                    const handleBisectionComplete = (e) => {
                                      if (!e.detail || e.detail.quadId !== quadComponentId) return;
                                      clearTimeout(bisectionFallbackId);
                                      window.removeEventListener('diagonalBisectionAnimationComplete', handleBisectionComplete);
                                      window.removeEventListener('diagonalBisectionACProven', handleACProven);
                                      window.removeEventListener('diagonalBisectionBDProven', handleBDProven);
                                      if (step8ProvenMessage) {
                                        updateMessageBox(step8ProvenMessage);
                                      }
                                      if (step8DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                        addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step8DescriptionText);
                                      }
                                      
                                      // Check if we should run diagonal angle bisection (square-specific)
                                      if (showDiagonalAngleBisection) {
                                        setTimeout(() => {
                                          // Step 9: Diagonal angle bisection animation
                                          if (step9Message) {
                                            updateMessageBox(step9Message);
                                          }
                                          
                                          setTimeout(() => {
                                            const quadEl = document.getElementById(quadComponentId);
                                            const registry = (typeof window !== 'undefined' && window.quadrilateralAnimations) ? window.quadrilateralAnimations[quadComponentId] : null;
                                            const animateDiagonalAngleBisectionFn = (quadEl && typeof quadEl.animateDiagonalAngleBisection === 'function')
                                              ? quadEl.animateDiagonalAngleBisection.bind(quadEl)
                                              : (registry && typeof registry.animateDiagonalAngleBisection === 'function' ? registry.animateDiagonalAngleBisection : null);
                                            if (animateDiagonalAngleBisectionFn) {
                                              let angleBisectionFallbackId;
                                              
                                              // Handler for when a vertex's angle bisection is proven (no message update per vertex; we update when each diagonal is fully done)
                                              const handleVertexProven = () => {};
                                              
                                              // Handler for when diagonal AC angle bisection is complete: update message, then run BD
                                              const handleACAngleBisectionComplete = (e) => {
                                                if (!e.detail || e.detail.quadId !== quadComponentId) return;
                                                if (e.detail.diagonalIndex !== 0) return;
                                                
                                                // AC done: update message to "Diagonal AC bisects both angle A and C"
                                                if (step9ACMessage) {
                                                  updateMessageBox(step9ACMessage);
                                                }
                                                // Then animate diagonal BD (angles at B and D)
                                                setTimeout(() => {
                                                  animateDiagonalAngleBisectionFn(1, () => {
                                                    // BD done: update message to "Diagonal BD bisects both angle B and D", then show final message
                                                    window.removeEventListener('diagonalAngleBisectionVertexProven', handleVertexProven);
                                                    window.removeEventListener('diagonalAngleBisectionAnimationComplete', handleACAngleBisectionComplete);
                                                    clearTimeout(angleBisectionFallbackId);
                                                    
                                                    if (step9BDMessage) {
                                                      updateMessageBox(step9BDMessage);
                                                    }
                                                    setTimeout(() => {
                                                      // Do not set message box to step9ProvenMessage ("The diagonals bisect the interior angles!")
                                                      if (step9DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                                        addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step9DescriptionText);
                                                      }
                                                      setTimeout(() => {
                                                        if (instructionId && instructionText) {
                                                          updateInstructionText(instructionId, instructionText);
                                                        }
                                                        enableNextButtonAndTap();
                                                      }, 800);
                                                    }, 800);
                                                  });
                                                }, 500);
                                              };
                                              
                                              window.addEventListener('diagonalAngleBisectionVertexProven', handleVertexProven);
                                              window.addEventListener('diagonalAngleBisectionAnimationComplete', handleACAngleBisectionComplete);
                                              
                                              // Start with diagonal AC (index 0)
                                              animateDiagonalAngleBisectionFn(0);
                                              
                                              // Fallback timeout (do not dispatch completion event — animations did not finish)
                                              angleBisectionFallbackId = setTimeout(() => {
                                                window.removeEventListener('diagonalAngleBisectionVertexProven', handleVertexProven);
                                                window.removeEventListener('diagonalAngleBisectionAnimationComplete', handleACAngleBisectionComplete);
                                                // Do not set message box to step9ProvenMessage
                                                if (step9DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                                  addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step9DescriptionText);
                                                }
                                                if (instructionId && instructionText) updateInstructionText(instructionId, instructionText);
                                                enableNextButtonAndTap(false);
                                              }, 20000);
                                            } else {
                                              if (instructionId && instructionText) updateInstructionText(instructionId, instructionText);
                                              enableNextButtonAndTap(false);
                                            }
                                          }, 1000);
                                        }, 1500);
                                      } else {
                                        setTimeout(() => {
                                          if (instructionId && instructionText) {
                                            updateInstructionText(instructionId, instructionText);
                                          }
                                          enableNextButtonAndTap();
                                        }, 800);
                                      }
                                    };
                                    
                                    // Add event listeners
                                    window.addEventListener('diagonalBisectionACProven', handleACProven);
                                    window.addEventListener('diagonalBisectionBDProven', handleBDProven);
                                    window.addEventListener('diagonalBisectionAnimationComplete', handleBisectionComplete);
                                    
                                    // Start the animation
                                    quadEl.animateDiagonalBisection();
                                    
                                    // Fallback timeout (do not dispatch completion event — animations did not finish)
                                    bisectionFallbackId = setTimeout(() => {
                                      window.removeEventListener('diagonalBisectionAnimationComplete', handleBisectionComplete);
                                      window.removeEventListener('diagonalBisectionACProven', handleACProven);
                                      window.removeEventListener('diagonalBisectionBDProven', handleBDProven);
                                      if (step8ProvenMessage) updateMessageBox(step8ProvenMessage);
                                      if (step8DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                        addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step8DescriptionText);
                                      }
                                      // If diagonal angle bisection is enabled, still run it after timeout
                                      if (showDiagonalAngleBisection) {
                                        // Do not set message box to step9ProvenMessage
                                        if (step9DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                          addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step9DescriptionText);
                                        }
                                      }
                                      if (instructionId && instructionText) updateInstructionText(instructionId, instructionText);
                                      enableNextButtonAndTap(false);
                                    }, 18000); // 2 diagonals × 2 cycles × (rotate*2 + wait) = ~16s + buffer
                                  } else {
                                    if (instructionId && instructionText) updateInstructionText(instructionId, instructionText);
                                    enableNextButtonAndTap(false);
                                  }
                                }, 1000);
                              }, 1500);
                            };
                            
                            window.addEventListener('measureDiagonalAngleComplete', handleMeasureComplete);
                            quadElement.animateMeasureDiagonalAngle();
                            
                            measureAngleFallbackId = setTimeout(() => {
                              window.removeEventListener('measureDiagonalAngleComplete', handleMeasureComplete);
                              if (step7DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                                addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step7DescriptionText);
                              }
                              if (instructionId && instructionText) {
                                updateInstructionText(instructionId, instructionText);
                              }
                              enableNextButtonAndTap();
                            }, 5000);
                          } else {
                            if (instructionId && instructionText) {
                              updateInstructionText(instructionId, instructionText);
                            }
                            enableNextButtonAndTap();
                          }
                        }, 1000);
                      }, 1000);
                    } else {
                      if (instructionId && instructionText) {
                        updateInstructionText(instructionId, instructionText);
                      }
                      enableNextButtonAndTap();
                    }
                  };
                  
                  // Call animateDiagonalEquality - it will run for the configured cycles
                  animateDiagonalEqualityFn();
                  
                  // Listen for animation completion event
                  const handleAnimationComplete = (event) => {
                    console.log('[Sequence] diagonalEqualityAnimationComplete received', event.detail, 'quadId match:', !!(event.detail && event.detail.quadId === quadComponentId));
                    if (event.detail && event.detail.quadId === quadComponentId) {
                      window.removeEventListener('diagonalEqualityAnimationComplete', handleAnimationComplete);
                      console.log('[Sequence] calling onComplete (from event)');
                      onComplete();
                    }
                  };

                  window.addEventListener('diagonalEqualityAnimationComplete', handleAnimationComplete);
                  
                  // Fallback timeout in case event doesn't fire
                  const diagonalEqualityConfig = sequenceConfig.diagonalEqualityAnimationConfig || {};
                  const duration = diagonalEqualityConfig.duration || 1500;
                  const waitTime = diagonalEqualityConfig.waitTime || 1000;
                  const cycles = diagonalEqualityConfig.cycles || 2;
                  // Each cycle: duration (translate) + waitTime (wait) + duration (translate back) + waitTime (wait)
                  const cycleTime = (duration + waitTime) * 2;
                  const totalAnimationTime = cycleTime * cycles + 500; // Add 500ms buffer
                  
                  setTimeout(() => {
                    window.removeEventListener('diagonalEqualityAnimationComplete', handleAnimationComplete);
                    const quadEl = document.getElementById(quadComponentId);
                    const stillRunning = quadEl ? quadEl.querySelector('[data-diagonal-equality-animation]') : null;
                    const willCall = !diagonalEqualityCompletedRef.current && (!quadEl || !stillRunning);
                    console.log('[Sequence] fallback timeout fired', { totalAnimationTime, stillRunning: !!stillRunning, diagonalEqualityCompletedRef: diagonalEqualityCompletedRef.current, willCallOnComplete: willCall });
                    if (willCall) {
                      console.log('[Sequence] calling onComplete (from fallback timeout)');
                      onComplete();
                    }
                  }, totalAnimationTime);
                } else {
                  console.warn('❌ Diagonal equality animation not available for quad:', quadComponentId, '(element:', !!quadElement, ', registry:', !!registry, ')');
                  // Fallback: enable next button immediately
                  enableNextButtonAndTap();
                }
              }, 2000); // Wait 2000ms before Step 5
            }, 1000); // Wait 1000ms after Step 2
          }, 500); // Wait 500ms after Step 1
        }, 500); // Increased delay to ensure component is ready
      } else if (showAngleMarkers) {
        // Step 1: Show all angle markers (if enabled). Quad may start with arcs hidden (page 4);
        // dispatch so the quad renders arcs, then style them after re-render.
        setCurrentStep(1);
        window.dispatchEvent(new CustomEvent('quadDisplayChanged', {
          detail: {
            quadId: quadComponentId,
            property: 'showAngleArcs',
            value: true,
            showAngleText: false
          }
        }));
        setTimeout(() => {
          showAllAngleMarkers(angleMarkerColor, angleMarkerFill, angleMarkerBlink);
        }, 200);
        
        // Step 2: Display message and update angles description (swapped from Step 3)
        messageTimeoutRef.current = setTimeout(() => {
          setCurrentStep(2);
          
          // Display Step 2 message
          if (step3Message) {
            updateMessageBox(step3Message);
          }
          
          // Update angles description in property showcase
          if (step3AnglesDescriptionText && propertyShowcaseId) {
            addPropertyShowcaseDescription(propertyShowcaseId, 1, step3AnglesDescriptionText); // Index 1 = "Angles"
          }
        }, 500); // Wait 500ms after showing angles
        
        // Delay before Step 6: 5000ms if we run opposite-angles animation (1000+2000+2000), else 1500ms
        const step6Delay = step2DescriptionText ? 5000 : 1500;
        
        // Step 3 & 4: Show angle equality (A=C, B=D) only when opposite angles equal is configured
        if (step2DescriptionText) {
          setTimeout(() => {
            setCurrentStep(3);
            
            // Trigger angle equality animation: A (index 0) to C (index 2)
            const angleEqualityDuration = 2000; // 2 seconds
            triggerAngleEqualityAnimation(0, 2, angleEqualityDuration, () => {
              console.log('✅ Step 3 callback called');
              
              const quadComponentId = sequenceConfig.quadComponentId || 'page4-shape-display';
              const quadElement = document.getElementById(quadComponentId);
              
              if (!quadElement) {
                console.error('❌ Step 3: Quad element not found');
                return;
              }
              
              setTimeout(() => {
                if (quadElement) {
                  const allDivs = Array.from(quadElement.querySelectorAll('div'));
                  const animatedArcContainer = allDivs.find(div => {
                    const style = window.getComputedStyle(div);
                    return (style.animation && style.animation.includes('angleEqualityBlink')) || 
                           (parseInt(style.zIndex) > 200 && div.querySelector('svg'));
                  });
                  
                  if (animatedArcContainer) {
                    animatedArcContainer.style.animation = 'none';
                    animatedArcContainer.querySelectorAll('svg, path').forEach(el => {
                      el.style.animation = 'none';
                    });
                  }
                  
                  updateAngleMarkersWithEqualityTick([0, 2], quadComponentId);
                  if (angleEqualityMessageAC) {
                    updateMessageBox(angleEqualityMessageAC);
                  }
                  
                  setTimeout(() => {
                    setCurrentStep(4);
                    const angleEqualityDuration2 = 2000;
                    triggerAngleEqualityAnimation(1, 3, angleEqualityDuration2, () => {
                      setTimeout(() => {
                        if (quadElement) {
                          const allDivs = Array.from(quadElement.querySelectorAll('div'));
                          const animatedArcContainer = allDivs.find(div => {
                            const style = window.getComputedStyle(div);
                            const hasAnimation = style.animation && style.animation.includes('angleEqualityBlink');
                            const hasHighZIndex = parseInt(style.zIndex) > 200;
                            return hasAnimation || (hasHighZIndex && div.querySelector('svg'));
                          });
                          if (animatedArcContainer) {
                            animatedArcContainer.style.animation = 'none';
                            animatedArcContainer.querySelectorAll('svg, path').forEach(el => {
                              el.style.animation = 'none';
                            });
                          }
                          updateAngleMarkersWithEqualityTick([1, 3], quadComponentId, "#FF6600");
                          if (angleEqualityMessageBD) {
                            updateMessageBox(angleEqualityMessageBD);
                          }
                        }
                      }, 100);
                    });
                  }, 500);
                }
              }, 100);
            });
          }, 1000);
        }
        
        // Step 6: Add description to property showcase (when step2DescriptionText set), or go straight to adjacent angles
        if ((step2PropertyName && propertyShowcaseId) || showAdjacentAnglesSupplementary) {
          setTimeout(() => {
            setCurrentStep(6);
            if (step2DescriptionText && propertyShowcaseId) {
              addPropertyShowcaseDescription(propertyShowcaseId, 1, step2DescriptionText); // Index 1 = "Angles"
            }
            if (oppositeAnglesEqualMessage) {
              updateMessageBox(oppositeAnglesEqualMessage);
            }
            
            // Check if we should show all angles 90° measurement animation
            if (showAllAngles90) {
              // Step 6a: Intro message
              setTimeout(() => {
                if (allAngles90IntroMessage) {
                  updateMessageBox(allAngles90IntroMessage);
                }
                
                // Get quad element
                const quadEl = document.getElementById(quadComponentId);
                if (!quadEl || !quadEl.animateMeasureAngleAtVertex) {
                  console.error('❌ animateMeasureAngleAtVertex not available');
                  proceedToAdjacentAngles();
                  return;
                }
                
                // Step 6b: Measure angle A after 1500ms (quad hides protractor and shows 90° marker after hold delay)
                setTimeout(() => {
                  quadEl.animateMeasureAngleAtVertex(0, (angle) => {
                    if (allAngles90MessageA) {
                      updateMessageBox(allAngles90MessageA);
                    }
                    
                    // Step 6c: Measure angle B after 2000ms
                    setTimeout(() => {
                      quadEl.animateMeasureAngleAtVertex(1, (angle) => {
                        if (allAngles90MessageB) {
                          updateMessageBox(allAngles90MessageB);
                        }
                        
                        // Step 6d: Measure angle C after 2000ms
                        setTimeout(() => {
                          quadEl.animateMeasureAngleAtVertex(2, (angle) => {
                            if (allAngles90MessageC) {
                              updateMessageBox(allAngles90MessageC);
                            }
                            
                            // Step 6e: Measure angle D after 2000ms
                            setTimeout(() => {
                              quadEl.animateMeasureAngleAtVertex(3, (angle) => {
                                if (allAngles90MessageD) {
                                  updateMessageBox(allAngles90MessageD);
                                }
                                
                                // Step 6f: Conclusion message and add description after 2000ms
                                setTimeout(() => {
                                  if (allAngles90ConclusionMessage) {
                                    updateMessageBox(allAngles90ConclusionMessage);
                                  }
                                  if (allAngles90DescriptionText && propertyShowcaseId) {
                                    addPropertyShowcaseDescription(propertyShowcaseId, 1, allAngles90DescriptionText);
                                  }
                                  
                                  // Now proceed to adjacent angles supplementary if configured
                                  setTimeout(proceedToAdjacentAngles, 1000);
                                }, 2000);
                              });
                            }, 2000);
                          });
                        }, 2000);
                      });
                    }, 2000);
                  });
                }, 1500);
              }, 500);
            } else {
              // Skip all angles 90° and go straight to adjacent angles
              proceedToAdjacentAngles();
            }
            
            // Function to proceed to adjacent angles supplementary animation
            function proceedToAdjacentAngles() {
              // Check if we should show adjacent angles supplementary animation
              if (showAdjacentAnglesSupplementary) {
              // Step 7: Start adjacent angles supplementary animation after 2000ms
              setTimeout(() => {
                setCurrentStep(7);
                // Show message about checking adjacent angles
                if (adjacentAnglesMessage1) {
                  updateMessageBox(adjacentAnglesMessage1);
                }
                
                // Step 8: Trigger angle sum animation for first adjacent pair (A and B) after 2000ms
                const angleSumDuration = 4000; // 4 seconds (half speed for arc movement)
                const semicircleDrawDurationMs = 1750; // Matches quadrilateral: semicircle stroke draw animation (2s per cycle)
                const semicircleDrawCyclesBeforeNext = 2; // Wait for semicircle to draw 3 times before next angle pair
                const waitAfterSemicircleMs = semicircleDrawDurationMs * semicircleDrawCyclesBeforeNext; // 6000ms
                setTimeout(() => {
                  setCurrentStep(8);
                  
                  // Trigger angle sum animation: A (index 0) + B (index 1) = 180°
                  triggerAngleSumAnimation(0, 1, angleSumDuration, () => {
                    console.log('✅ Step 8 callback called - A + B animation complete');
                    
                    // After animation completes, show message
                    setTimeout(() => {
                      if (adjacentAnglesMessage2) {
                        updateMessageBox(adjacentAnglesMessage2);
                      }
                      
                      // Step 9: Wait for semicircle to draw 3 times, then trigger B + C
                      setTimeout(() => {
                        setCurrentStep(9);
                        
                        // Trigger angle sum animation: B (index 1) + C (index 2) = 180°
                        triggerAngleSumAnimation(1, 2, angleSumDuration, () => {
                          console.log('✅ Step 9 callback called - B + C animation complete');
                          
                          setTimeout(() => {
                            if (adjacentAnglesMessage3) {
                              updateMessageBox(adjacentAnglesMessage3);
                            }
                            
                            // Step 10: Wait 3 semicircle draws, then C to D
                            setTimeout(() => {
                              setCurrentStep(10);
                              triggerAngleSumAnimation(2, 3, angleSumDuration, () => {
                                console.log('✅ Step 10 callback called - C + D animation complete');
                                setTimeout(() => {
                                  if (adjacentAnglesMessage4) {
                                    updateMessageBox(adjacentAnglesMessage4);
                                  }
                                  
                                  // Step 11: Wait 3 semicircle draws, then D to A
                                  setTimeout(() => {
                                    setCurrentStep(11);
                                    triggerAngleSumAnimation(3, 0, angleSumDuration, () => {
                                      console.log('✅ Step 11 callback called - D + A animation complete');
                                      setTimeout(() => {
                                        if (adjacentAnglesMessage5) {
                                          updateMessageBox(adjacentAnglesMessage5);
                                        }
                                        
                                        // Step 12: Wait 3 semicircle draws, then clear angle-sum visuals
                                        setTimeout(() => {
                                          setCurrentStep(12);
                                          const quadEl = document.getElementById(quadComponentId);
                                          if (quadEl && typeof quadEl.stopAngleSumAnimation === 'function') {
                                            quadEl.stopAngleSumAnimation();
                                          }
                                          if (adjacentAnglesFinalMessage) {
                                            updateMessageBox(adjacentAnglesFinalMessage);
                                          }
                                          if (adjacentAnglesDescriptionText && propertyShowcaseId) {
                                            addPropertyShowcaseDescription(propertyShowcaseId, 1, adjacentAnglesDescriptionText);
                                          }
                                          if (instructionId && instructionText) {
                                            updateInstructionText(instructionId, instructionText);
                                          }
                                          setTimeout(() => {
                                            enableNextButtonAndTap();
                                          }, 1000);
                                        }, waitAfterSemicircleMs);
                                      }, 500);
                                    });
                                  }, waitAfterSemicircleMs);
                                }, 500);
                              });
                            }, waitAfterSemicircleMs);
                          }, 500);
                        });
                      }, waitAfterSemicircleMs); // Wait for semicircle to draw 3 times after A+B before B+C
                    }, 500); // Wait 500ms after A+B animation before showing message
                  });
                }, 2000); // Wait 2000ms for Step 8
              }, 2000); // Wait 2000ms after Step 6 before starting adjacent angles animation
            } else {
              // If adjacent angles supplementary not enabled, update instruction and enable next button
              if (instructionId && instructionText) {
                updateInstructionText(instructionId, instructionText);
              }
              
              // Enable next button and tap animation after Step 6
              setTimeout(() => {
                enableNextButtonAndTap();
              }, 1000); // Wait 1000ms after adding description
            }
            } // End proceedToAdjacentAngles function
          }, step6Delay);
        } else {
          // If Step 6 is not configured, enable next button after Step 4 (or after Step 2 if no opp-angles)
          setTimeout(() => {
            enableNextButtonAndTap();
          }, step6Delay);
        }
      } else if (firstPair) {
        // Original sequence (no angle markers, no diagonals)
        // Step 1: Display Initial Message
        setCurrentStep(1);
        if (firstPair.initialMessage) {
          updateMessageBox(firstPair.initialMessage);
        }

        // Step 2: Highlight Opposite Sides
        messageTimeoutRef.current = setTimeout(() => {
          setCurrentStep(2);
          // Make sides highlighted and blinking
          updateQuadSides(firstPair.highlightColor, firstPair.highlightColor, true, true, firstPair.side1Index, firstPair.side2Index);

          // Step 3: Parallel Lines Animation
          animationTimeoutRef.current = setTimeout(() => {
            setCurrentStep(3);
            // Trigger animation with callback
            triggerParallelAnimation(firstPair.pairIndex, handleFirstPairAnimationComplete);
          }, sideHighlightDuration);
        }, messageDuration);
      } else {
        // No valid sequence configuration
        console.warn('QuadAnimationSequenceComponent: No valid sequence configuration provided');
      }
    }, initialDelay);

    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      if (secondPairTimeoutRef.current) clearTimeout(secondPairTimeoutRef.current);
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
    };
  }, [initialDelay, messageDuration, sideHighlightDuration, firstPair, updateQuadSides, triggerParallelAnimation, updateMessageBox, handleFirstPairAnimationComplete, showAngleMarkers, angleMarkerColor, angleMarkerFill, angleMarkerBlink, step2PropertyName, step2DescriptionText, showAllAngleMarkers, addPropertyShowcaseDescription, propertyShowcaseId, step3Message, step3AnglesDescriptionText, enableNextButtonAndTap, triggerAngleEqualityAnimation, updateAngleMarkersWithEqualityTick, updateInstructionText, instructionId, instructionText, showDiagonals, showDiagonalsProgrammatically, step2Message, step3PropertyIndex, step3DescriptionText, step6Message, step6DescriptionText, quadComponentId, showSymmetryAnimation, symmetryAxis, symmetryDuration, symmetryHoldTime, triggerSymmetryAnimation, step1SymmetryMessage, step2SymmetryMessage, step3SymmetryAxis, step3SymmetryCycles, step3SymmetryMessage, step4SymmetryMessage, showDiagonalSymmetry, step4bSymmetryMessage, step4cSymmetryMessage, step4bSymmetryAxis, step4bSymmetryCycles, step5PropertyIndex, step5DescriptionText, showRotationalSymmetry, step6RotationalMessage, step6RotationalMatchMessage, step6RotationalProvenMessage, step6RotationalDescriptionText, showAllAngles90, allAngles90IntroMessage, allAngles90MessageA, allAngles90MessageB, allAngles90MessageC, allAngles90MessageD, allAngles90ConclusionMessage, allAngles90DescriptionText, showAdjacentAnglesSupplementary, adjacentAnglesMessage1, adjacentAnglesMessage2, adjacentAnglesMessage3, adjacentAnglesMessage4, adjacentAnglesMessage5, adjacentAnglesFinalMessage, adjacentAnglesDescriptionText, angleEqualityMessageAC, angleEqualityMessageBD, oppositeAnglesEqualMessage, triggerAngleSumAnimation, measureDiagonalAngle, step7Message, step7DescriptionText, diagonalAngleMessage, step8Message, step8ACMessage, step8BDMessage, step8ProvenMessage, step8DescriptionText, showDiagonalAngleBisection, step9Message, step9ACMessage, step9BDMessage, step9ProvenMessage, step9DescriptionText]);

  // Component doesn't render any UI - it just controls the messagebox and quad animations
  return React.createElement('div', {
    style: {
      ...(position?.css || {}),
      ...(processedStyles || {}),
      position: 'absolute',
      zIndex: elementZIndex || 1000,
      pointerEvents: 'none', // Don't block interactions
      display: 'none' // Hidden component - only controls other elements
    },
    'data-component-id': id
  });
});

// Set display name for debugging
QuadAnimationSequenceComponent.displayName = 'QuadAnimationSequenceComponent';

// Export to window for global access
if (typeof window !== 'undefined') {
  window.QuadAnimationSequenceComponent = {
    QuadAnimationSequenceComponent: QuadAnimationSequenceComponent
  };
  console.log('✅ QuadAnimationSequenceComponent loaded and exported to window.QuadAnimationSequenceComponent');
}

