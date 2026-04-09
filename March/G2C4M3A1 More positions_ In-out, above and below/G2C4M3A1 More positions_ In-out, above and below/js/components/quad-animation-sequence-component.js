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
    secondDescriptionText, // Optional: Second description text to add after final step
    // Angle marker configuration (for Step 1)
    showAngleMarkers = false, // Whether to show angle markers in Step 1
    angleMarkerColor = '#FF6600', // Color for angle markers
    angleMarkerFill = true, // Whether to fill the arcs
    angleMarkerBlink = true, // Whether to make the fills blink
    // Property showcase configuration for Step 2
    step2PropertyName, // Property name to add description to (e.g., "Angles")
    step2DescriptionText, // Description text to add in Step 2
    propertyShowcaseId, // ID of property showcase component (used in Step 2 and later steps)
    // Step 3 configuration
    step3Message, // Message to display in Step 3
    step3AnglesDescriptionText, // Description text to add to Angles property in Step 3
    // Diagonal configuration (for page 5)
    showDiagonals = false, // Whether to show diagonals in Step 1
    step2Message, // Message to display in Step 2 (for diagonals)
    step3PropertyIndex, // Property index to update in Step 3 (for diagonals)
    step3DescriptionText, // Description text to add in Step 3 (for diagonals)
    step6Message, // Message to display in Step 6 (after diagonal equality animation)
    step6DescriptionText, // Description text to append in Step 6 (for diagonals)
    // Symmetry animation configuration (for page 6)
    showSymmetryAnimation = false, // Whether to show symmetry animation in Step 1
    symmetryAxis = 'horizontal', // 'horizontal' | 'vertical' - axis for first symmetry fold
    symmetryDuration = 2000, // Duration of symmetry animation (ms)
    symmetryHoldTime = 1500, // Time to hold at folded position (ms)
    // Step 2 configuration (after first symmetry animation)
    step2SymmetryMessage, // Message after first symmetry animation (e.g., "The shape is not symmetric...")
    // Step 3 configuration (second symmetry animation)
    step3SymmetryAxis = 'vertical', // Axis for second symmetry animation
    step3SymmetryCycles = 1, // Number of cycles for second symmetry animation
    // Step 4 configuration (after second symmetry animation)
    step4SymmetryMessage, // Message after second symmetry animation
    // Step 5 configuration (property update)
    step5PropertyIndex, // Property index to update (e.g., 3 for Symmetry)
    step5DescriptionText, // Description text to add
    // Instruction text configuration
    instructionId, // ID of instruction text element
    instructionText, // New instruction text to set
    // Angle measurement label configuration
    angleLabelPositionRatio = 0.2 // Position ratio for angle labels (0.2 = 1/5 distance from vertex to center)
    // Can be a single number (applied to all vertices) or an array [A, B, C, D] for per-vertex ratios
    // Array format: [ratioForA, ratioForB, ratioForC, ratioForD] where index 0=A, 1=B, 2=C, 3=D
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

  // Enable next button and tap animation
  const enableNextButtonAndTap = React.useCallback(() => {
    if (typeof document === 'undefined') return;

    // First, dispatch event for React components that listen to it
    // This allows React components to update their state
    if (completionEventName && typeof window !== 'undefined') {
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
            'font-size: 25px;' +
            'color: rgb(255, 255, 255);' +
            'font-weight: normal;' +
            'opacity: 1;' +
            'flex: 1 1 0%;' +
            'line-height: 1.4;';
        }
      } else {
        // Default styles matching the exact specification provided
        // Use exact pixel values as specified in the HTML
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
          'font-size: 25px;' +
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
  }, []);

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
        
         // Step 12: Opposite Side Equality Animation for AB and CD
         setTimeout(() => {
           setCurrentStep(12);
           // Trigger opposite side equality animation for pair 0 (AB and CD)
           triggerOppositeSideEqualityAnimation(0);
           
          // Add description to property showcase after step 12 starts
          const propertyShowcaseId = sequenceConfig.propertyShowcaseId || 'page3-property-showcase';
          const newDescriptionText = "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Two pairs</span> <span style='color: #FFFFFF;'>of opposite sides are</span> <span style='color: #FF9900;'>parallel.</span>";
          addPropertyShowcaseDescription(propertyShowcaseId, 0, newDescriptionText); // Index 0 = "Sides"
           
           // Calculate animation duration: 2 cycles, each cycle = duration + waitTime + duration + waitTime
           // duration = 2000ms, waitTime = 500ms
           // One cycle = 2000 + 500 + 2000 + 500 = 5000ms
           // Two cycles = 10000ms
           const oppositeSideAnimationDuration = sequenceConfig.oppositeSideAnimationDuration || 2000;
           const oppositeSideAnimationWaitTime = sequenceConfig.oppositeSideAnimationWaitTime || 500;
           const oppositeSideAnimationCycles = sequenceConfig.oppositeSideAnimationCycles || 2;
           const cycleTime = (oppositeSideAnimationDuration + oppositeSideAnimationWaitTime) * 2; // translate + wait + translate back + wait
           const totalAnimationTime = cycleTime * oppositeSideAnimationCycles;
           
           // Step 13: Update message box after AB/CD animation completes
          setTimeout(() => {
            setCurrentStep(13);
            updateMessageBox("The sides AB and CD are equal");
            
            // Step 14: Wait 1000ms and repeat for BC and DA
            setTimeout(() => {
              setCurrentStep(14);
              // Trigger opposite side equality animation for pair 1 (BC and DA)
              triggerOppositeSideEqualityAnimation(1);
              
              // Step 15: Update message box after BC/DA animation completes
              setTimeout(() => {
                setCurrentStep(15);
                updateMessageBox("The sides BC and DA are equal");
                
                // Step 16: Wait 2000ms and show conclusion message
                setTimeout(() => {
                  setCurrentStep(16);
                  updateMessageBox("Two pairs of opposite sides are equal in length.");
                  
                  // Add second description to property showcase
                  if (secondDescriptionText) {
                    const propertyShowcaseId = sequenceConfig.propertyShowcaseId || 'page3-property-showcase';
                    addPropertyShowcaseDescription(propertyShowcaseId, 0, secondDescriptionText); // Index 0 = "Sides"
                  }
                  
                  // Update instruction text
                  const instructionId = sequenceConfig.instructionId;
                  if (instructionId && sequenceConfig.instructionText) {
                    updateInstructionText(instructionId, sequenceConfig.instructionText);
                  }
                  
                  // Enable next button and tap animation
                  enableNextButtonAndTap();
                }, 2000); // Wait 2000ms before conclusion
              }, totalAnimationTime); // Wait for BC/DA animation to complete
            }, 1000); // Wait 1000ms before starting BC/DA animation
          }, totalAnimationTime); // Wait for AB/CD animation to complete
        }, 1500); // Wait 1500ms after Step 11
      }, symbolDelay);
    }, symbolDelay);
  }, [secondPair, updateMessageBox, updateQuadSides, addParallelArrows, conclusionMessage, conclusionDelay, enableNextButtonAndTap, addPropertyShowcaseDescription, triggerOppositeSideEqualityAnimation, updateInstructionText, sequenceConfig]);

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
        if (conclusionMessage) {
          setTimeout(() => {
            updateMessageBox(conclusionMessage);
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
  }, [firstPair, updateMessageBox, updateQuadSides, addParallelArrows, secondPair, waitBetweenPairs, startSecondPairSequence, conclusionMessage, conclusionDelay, enableNextButtonAndTap]);

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
    const startTimeout = setTimeout(() => {
      // Symmetry animation sequence (for page 6)
      if (showSymmetryAnimation) {
        setCurrentStep(1);
        // Step 1: Update message box first
        updateMessageBox("Let's check symmetry of this shape along the horizontal axis");
        
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
                updateMessageBox("Let's check symmetry of this shape along the vertical axis");
                
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
                      
                      // Step 4: Update message box
                      if (step4SymmetryMessage) {
                        updateMessageBox(step4SymmetryMessage);
                      }
                      
                      // Step 5: Update property showcase
                      setTimeout(() => {
                        setCurrentStep(5);
                        if (step5PropertyIndex !== undefined && step5DescriptionText && propertyShowcaseId) {
                          addPropertyShowcaseDescription(propertyShowcaseId, step5PropertyIndex, step5DescriptionText);
                        }
                        
                        // Update instruction text
                        if (instructionId && instructionText) {
                          updateInstructionText(instructionId, instructionText);
                        }
                        
                        // Enable next button and tap animation after all steps complete
                        setTimeout(() => {
                          enableNextButtonAndTap();
                        }, 500);
                      }, 1000); // Wait 1000ms after Step 4
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
                
                // Trigger diagonal equality animation
                const quadElement = document.getElementById(quadComponentId);
                if (quadElement && quadElement.animateDiagonalEquality) {
                  const onComplete = () => {
                    // Step 6: After animation completes
                    setCurrentStep(6);
                    if (step6Message) {
                      updateMessageBox(step6Message);
                    }
                    if (step6DescriptionText && step3PropertyIndex !== undefined && propertyShowcaseId) {
                      addPropertyShowcaseDescription(propertyShowcaseId, step3PropertyIndex, step6DescriptionText);
                    }
                    if (instructionId && instructionText) {
                      updateInstructionText(instructionId, instructionText);
                    }
                    enableNextButtonAndTap();
                  };
                  
                  // Call animateDiagonalEquality - it will run for the configured cycles
                  quadElement.animateDiagonalEquality();
                  
                  // Listen for animation completion event
                  const handleAnimationComplete = (event) => {
                    if (event.detail && event.detail.quadId === quadComponentId) {
                      window.removeEventListener('diagonalEqualityAnimationComplete', handleAnimationComplete);
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
                    // Only call onComplete if event hasn't already fired
                    if (quadElement && document.getElementById(quadComponentId)) {
                      // Check if animation is still running
                      const stillRunning = quadElement.querySelector('[data-diagonal-equality-animation]');
                      if (!stillRunning) {
                        onComplete();
                      }
                    }
                  }, totalAnimationTime);
                } else {
                  console.warn('❌ Diagonal equality animation not available on quad element');
                  // Fallback: enable next button immediately
                  enableNextButtonAndTap();
                }
              }, 2000); // Wait 2000ms before Step 5
            }, 1000); // Wait 1000ms after Step 2
          }, 500); // Wait 500ms after Step 1
        }, 500); // Increased delay to ensure component is ready
      } else if (showAngleMarkers) {
        // Step 1: Show all angle markers (if enabled)
        setCurrentStep(1);
        // Add a small delay to ensure the quadrilateral component has fully rendered the angle markers
        setTimeout(() => {
          showAllAngleMarkers(angleMarkerColor, angleMarkerFill, angleMarkerBlink);
        }, 100);
        
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
        
        // Step 3: Show angle equality between angle A and C
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
            
            // After animation completes:
            // 1. Stop blinking on the animated arc (the one that moved from A to C)
            setTimeout(() => {
              if (quadElement) {
                // Find and stop blinking on the animated arc
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
                
                // Update angle markers A and C to green with equality tick
                console.log('🔧 Calling updateAngleMarkersWithEqualityTick for A and C');
                updateAngleMarkersWithEqualityTick([0, 2], quadComponentId);
                
                // Show message
                console.log('🔧 Calling updateMessageBox');
                updateMessageBox("Both angles are perfectly equal, ∠ A = ∠ C");
                
                // Step 4: Start after Step 3 completes (wait 500ms after Step 3 updates)
                setTimeout(() => {
                  setCurrentStep(4);
                  
                  // Trigger angle equality animation: B (index 1) to D (index 3)
                  const angleEqualityDuration2 = 2000; // 2 seconds
                  triggerAngleEqualityAnimation(1, 3, angleEqualityDuration2, () => {
                    // After animation completes:
                    // 1. Stop blinking on the animated arc (the one that moved from B to D)
                    setTimeout(() => {
                      if (quadElement) {
                        // Find the animated angle arc container by looking for divs with high z-index and animation
                        const allDivs = Array.from(quadElement.querySelectorAll('div'));
                        const animatedArcContainer = allDivs.find(div => {
                          const style = window.getComputedStyle(div);
                          const hasAnimation = style.animation && style.animation.includes('angleEqualityBlink');
                          const hasHighZIndex = parseInt(style.zIndex) > 200;
                          return hasAnimation || (hasHighZIndex && div.querySelector('svg'));
                        });
                        
                        if (animatedArcContainer) {
                          // Remove the blinking animation
                          animatedArcContainer.style.animation = 'none';
                          // Also remove from any child elements
                          const svgElements = animatedArcContainer.querySelectorAll('svg, path');
                          svgElements.forEach(el => {
                            el.style.animation = 'none';
                          });
                        }
                        
                        // 2. Change ONLY angle markers for B (index 1) and D (index 3) to orange, fully opaque, no blink, add tick mark
                        updateAngleMarkersWithEqualityTick([1, 3], quadComponentId, "#FF6600"); // Orange color
                        
                        // 3. Show message with angle symbol
                        updateMessageBox("Both angles are perfectly equal, ∠ B = ∠ D");
                      }
                    }, 100); // Small delay to ensure elements are rendered
                  });
                }, 500); // Wait 500ms after Step 3 completes
              }
            }, 100); // Small delay to ensure elements are rendered
          });
        }, 1000); // Wait 1000ms after Step 2
        
        // Step 5: Display angle measurement labels for all angles
        // Labels are positioned on a line from vertex to quad center, at 1/5 distance from vertex
        setTimeout(() => {
          setCurrentStep(5);
          
          const quadComponentId = sequenceConfig.quadComponentId || 'page4-shape-display';
          const quadElement = document.getElementById(quadComponentId);
          if (!quadElement) {
            console.error('❌ Quad element not found:', quadComponentId);
            return;
          }
          
          // Find all angle marker components
          const angleMarkers = Array.from(quadElement.querySelectorAll('.angle-marker-component'));
          
          if (angleMarkers.length === 0) {
            console.error('❌ No angle markers found');
            return;
          }
          
          // Get vertex positions from the angle markers' computed styles
          // The markers are positioned at the vertices using left/top percentages
          const vertexPositions = angleMarkers.map((marker, idx) => {
            const style = window.getComputedStyle(marker);
            const left = parseFloat(style.left) || 0;
            const top = parseFloat(style.top) || 0;
            // Get the parent container's dimensions
            const parent = marker.parentElement;
            const parentRect = parent ? parent.getBoundingClientRect() : { width: 1, height: 1 };
            // Convert to percentage of parent
            const leftPercent = (left / parentRect.width) * 100;
            const topPercent = (top / parentRect.height) * 100;
            return { leftPercent, topPercent, index: idx };
          });
          
          // Calculate quad center (average of all vertex positions)
          const centerLeftPercent = vertexPositions.reduce((sum, v) => sum + v.leftPercent, 0) / vertexPositions.length;
          const centerTopPercent = vertexPositions.reduce((sum, v) => sum + v.topPercent, 0) / vertexPositions.length;
          
          console.log('📍 Quad center calculated:', { centerLeftPercent, centerTopPercent });
          console.log('📍 Vertex positions:', vertexPositions);
          
          // Get vertex positions from the quadrilateral component
          // The angle markers are rendered in vertex order: A (0), B (1), C (2), D (3)
          angleMarkers.forEach((marker, index) => {
            // Get angle value from data attribute
            const angleValue = parseFloat(marker.getAttribute('data-angle')) || null;
            if (angleValue === null) {
              console.warn(`⚠️ No angle value found for marker ${index}`);
              return;
            }
            
            // Check if label already exists
            const existingLabel = marker.querySelector('.angle-measurement-label');
            if (existingLabel) {
              // Make existing label visible
              existingLabel.style.display = 'block';
              existingLabel.style.visibility = 'visible';
              existingLabel.style.opacity = '1';
              return;
            }
            
            // Get this vertex's position
            const vertexPos = vertexPositions[index];
            
            // Get the position ratio for this specific vertex
            // angleLabelPositionRatio can be:
            // - A single number (applied to all vertices)
            // - An array [A, B, C, D] for per-vertex ratios (index 0=A, 1=B, 2=C, 3=D)
            let ratio = angleLabelPositionRatio;
            if (Array.isArray(angleLabelPositionRatio)) {
              // Use the ratio for this vertex index, or fallback to 0.2 if not provided
              ratio = angleLabelPositionRatio[index] !== undefined ? angleLabelPositionRatio[index] : 0.2;
            }
            
            // Calculate label position: ratio of the way from vertex to center
            // This places the label inside the quad, near the vertex
            // Default is 0.2 (1/5), but can be configured via sequenceConfig.angleLabelPositionRatio
            const labelLeftPercent = vertexPos.leftPercent + (centerLeftPercent - vertexPos.leftPercent) * ratio;
            const labelTopPercent = vertexPos.topPercent + (centerTopPercent - vertexPos.topPercent) * ratio;
            
            // Get responsive font size using gc units
            let responsiveFontSize = '24px'; // Fallback
            if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
              responsiveFontSize = window.GridCellFontUtils.processGcProperty('24gc');
            }
            
            // Create label and position it relative to the quad container (not the arc div)
            const labelDiv = document.createElement('div');
            labelDiv.className = 'angle-measurement-label';
            labelDiv.textContent = Math.round(angleValue) + '°';
            labelDiv.style.cssText = 
              'position: absolute;' +
              'left: ' + labelLeftPercent + '%;' +
              'top: ' + labelTopPercent + '%;' +
              'transform: translate(-50%, -50%);' +
              'font-size: ' + responsiveFontSize + ';' +
              'font-family: Arial, sans-serif;' +
              'font-weight: bold;' +
              'color: #000000;' +
              'background-color: transparent;' +
              'padding: 2px 6px;' +
              'border-radius: 4px;' +
              'white-space: nowrap;' +
              'border: none;' +
              'pointer-events: none;' +
              'z-index: 1100;' +
              'text-align: center;' +
              'display: block;' +
              'visibility: visible;' +
              'opacity: 1;';
            
            console.log(`📍 Label ${index} position:`, {
              vertexLeft: vertexPos.leftPercent.toFixed(2) + '%',
              vertexTop: vertexPos.topPercent.toFixed(2) + '%',
              labelLeft: labelLeftPercent.toFixed(2) + '%',
              labelTop: labelTopPercent.toFixed(2) + '%',
              angleValue: Math.round(angleValue) + '°'
            });
            
            // Add label to the quad container (parent of angle markers)
            // This ensures the label is positioned relative to the quad, not the arc
            const quadContainer = marker.parentElement;
            if (quadContainer) {
              quadContainer.appendChild(labelDiv);
            } else {
              // Fallback: add to marker
              marker.appendChild(labelDiv);
            }
          });
          
        }, 5000); // Wait 5000ms after Step 2 (1000ms delay + 2000ms Step 3 + 2000ms Step 4)
        
        // Step 6: Add description to property showcase (swapped from Step 2, renumbered from Step 5)
        // For page 4, this should always be added to "Angles" property
        if (step2PropertyName && step2DescriptionText && propertyShowcaseId) {
          setTimeout(() => {
            setCurrentStep(6);
            // Use property index 1 for "Angles" (0=Sides, 1=Angles, 2=Diagonals, 3=Symmetry)
            addPropertyShowcaseDescription(propertyShowcaseId, 1, step2DescriptionText); // Index 1 = "Angles"
            
            // Update instruction text if provided
            if (instructionId && instructionText) {
              updateInstructionText(instructionId, instructionText);
            }
            
            // Update message box text
            updateMessageBox("Opposite angles are equal because they have the same angle measures.");
            
            // Enable next button and tap animation after Step 6
            setTimeout(() => {
              enableNextButtonAndTap();
            }, 1000); // Wait 1000ms after adding description
          }, 6000); // Wait 6000ms after Step 2 (1000ms delay + 2000ms Step 3 + 2000ms Step 4 + 1000ms Step 5)
        } else {
          // If Step 6 is not configured, enable next button after Step 5
          setTimeout(() => {
            enableNextButtonAndTap();
          }, 6000); // Wait 6000ms after Step 2 (1000ms delay + 2000ms Step 3 + 2000ms Step 4 + 1000ms Step 5)
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
      clearTimeout(startTimeout);
    };
  }, [initialDelay, messageDuration, sideHighlightDuration, firstPair, updateQuadSides, triggerParallelAnimation, updateMessageBox, handleFirstPairAnimationComplete, showAngleMarkers, angleMarkerColor, angleMarkerFill, angleMarkerBlink, step2PropertyName, step2DescriptionText, showAllAngleMarkers, addPropertyShowcaseDescription, propertyShowcaseId, step3Message, step3AnglesDescriptionText, enableNextButtonAndTap, triggerAngleEqualityAnimation, updateAngleMarkersWithEqualityTick, updateInstructionText, instructionId, instructionText, showDiagonals, showDiagonalsProgrammatically, step2Message, step3PropertyIndex, step3DescriptionText, step6Message, step6DescriptionText, quadComponentId, showSymmetryAnimation, symmetryAxis, symmetryDuration, symmetryHoldTime, triggerSymmetryAnimation, step2SymmetryMessage, step3SymmetryAxis, step3SymmetryCycles, step4SymmetryMessage, step5PropertyIndex, step5DescriptionText]);

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

