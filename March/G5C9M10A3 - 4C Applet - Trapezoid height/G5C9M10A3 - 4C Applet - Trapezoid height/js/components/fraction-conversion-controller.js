/**
 * Fraction Conversion Controller Component
 * 
 * This component manages the state machine for the mixed-to-improper fraction conversion
 * exercise on page 15. It handles:
 * - Highlighting the current fraction being converted
 * - Managing number pad input for numerator and denominator
 * - Validating answers and providing feedback
 * - Updating the working area boxes when conversions are complete
 */

const FractionConversionController = React.memo((props) => {
  const {
    pageId = 'page15',
    // Fraction 1 config: 1 1/2 = 3/2
    fraction1 = {
      mixedWhole: 1,
      mixedNumerator: 1,
      mixedDenominator: 2,
      improperNumerator: 3,
      improperDenominator: 2,
      numberBoxId: 'page15-number-box-1',
      workingBoxId: 'page15-working-box-1'
    },
    // Fraction 2 config: 2 1/4 = 9/4
    fraction2 = {
      mixedWhole: 2,
      mixedNumerator: 1,
      mixedDenominator: 4,
      improperNumerator: 9,
      improperDenominator: 4,
      numberBoxId: 'page15-number-box-3',
      workingBoxId: 'page15-working-box-2'
    },
    // UI element IDs
    mixedNumberTextId = 'page15-mixed-number-text',
    wholeNumberBoxId = null, // Optional, for page 19
    numeratorBoxId = 'page15-numerator-box',
    denominatorBoxId = 'page15-denominator-box',
    // Colors
    highlightColor = '#F59E0B', // Gold/amber highlight
    correctColor = '#22C55E', // Green for correct
    defaultBgColor = '#4A5568', // Default gray
    activeBorderColor = '#FF8C00', // Orange border for active input
    // Callbacks
    onComplete,
    onStepChange
  } = props;
  
  console.log('🎮 [FractionConversionController] Component mounted with props:', props);

  // State machine states:
  // 'fraction1-numerator' - Entering numerator for fraction 1
  // 'fraction1-denominator' - Entering denominator for fraction 1
  // 'fraction2-numerator' - Entering numerator for fraction 2
  // 'fraction2-denominator' - Entering denominator for fraction 2
  // For page 19:
  // 'whole-number' - Entering whole number part
  // 'numerator' - Entering numerator part
  // 'denominator' - Entering denominator part
  // 'complete' - All conversions done
  const getInitialState = React.useCallback(() => {
    return pageId === 'page19' ? 'whole-number' : 'fraction1-numerator';
  }, [pageId]);
  
  const [currentState, setCurrentState] = React.useState(() => getInitialState());
  
  // Reset state to initial when pageId changes (ensures clean state on page navigation)
  React.useEffect(() => {
    const initialState = getInitialState();
    setCurrentState(initialState);
    isInitialMount.current = true;
    console.log(`🔄 [FractionConversionController] Reset state to initial: ${initialState} for ${pageId}`);
  }, [pageId, getInitialState]);
  const [inputValue, setInputValue] = React.useState('');
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [feedbackType, setFeedbackType] = React.useState(''); // 'correct', 'incorrect', ''
  const [blinkingElement, setBlinkingElement] = React.useState(null);
  
  // Ref to store handleCheck function to avoid initialization order issues
  const handleCheckRef = React.useRef(null);
  
  // Ref to store current state to avoid stale closure issues in global functions
  const currentStateRef = React.useRef(getInitialState());

  // Get current fraction config based on state
  const getCurrentFraction = React.useCallback(() => {
    if (currentState.startsWith('fraction1')) return fraction1;
    if (currentState.startsWith('fraction2')) return fraction2;
    return null;
  }, [currentState, fraction1, fraction2]);

  // Get correct answer for current state
  const getCorrectAnswer = React.useCallback(() => {
    // For page 19, correct answers are: whole number = 3, numerator = 151, denominator = 200
    if (pageId === 'page19') {
      if (currentState === 'whole-number') {
        return 3;
      } else if (currentState === 'numerator') {
        return 151;
      } else if (currentState === 'denominator') {
        return 200;
      }
      return null;
    }
    
    const fraction = getCurrentFraction();
    if (!fraction) return null;
    
    if (currentState.endsWith('-numerator')) {
      // For page 17, calculate equivalent numerator when denominator is 200
      if (pageId === 'page17') {
        // Calculate: (improperNumerator / improperDenominator) * 200
        return Math.round((fraction.improperNumerator / fraction.improperDenominator) * 200);
      }
      // For page 18, correct answer is 751
      if (pageId === 'page18') {
        return 751;
      }
      return fraction.improperNumerator;
    } else if (currentState.endsWith('-denominator')) {
      // For page 17 and page 18, denominator is always 200
      if (pageId === 'page17' || pageId === 'page18') {
        return 200;
      }
      return fraction.improperDenominator;
    }
    return null;
  }, [pageId, currentState, getCurrentFraction]);

  // Create mixed number HTML
  const createMixedNumberHTML = React.useCallback((whole, num, den) => {
    return `<span style="color: #ffffff;">${whole}</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">${num}</span><span style="display: block; padding: 0 4px; color: #ffffff;">${den}</span></span>`;
  }, []);

  // Create fraction HTML for working box
  const createFractionHTML = React.useCallback((num, den) => {
    return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 2px solid #ffffff; padding: 0 8px; color: #ffffff; font-size: 0.9em;">${num}</span><span style="display: block; padding: 0 8px; color: #ffffff; font-size: 0.9em;">${den}</span></span>`;
  }, []);

  // Update element style
  const updateElementStyle = React.useCallback((elementId, styles) => {
    const element = document.getElementById(elementId);
    if (element) {
      Object.assign(element.style, styles);
    }
  }, []);

  // Update element innerHTML
  const updateElementContent = React.useCallback((elementId, content) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = content;
    }
  }, []);

  // Reset working boxes to default state (for page 16 to clear any inherited styles from page 15)
  const resetWorkingBoxes = React.useCallback(() => {
    if (pageId === 'page16') {
      // Reset all working boxes to default background color
      const workingBox1 = document.getElementById(fraction1.workingBoxId);
      const workingBox2 = document.getElementById(fraction2.workingBoxId);
      
      if (workingBox1) {
        workingBox1.style.removeProperty('background-color');
        workingBox1.style.removeProperty('background');
        workingBox1.style.setProperty('background-color', defaultBgColor, 'important');
        console.log(`🔄 [FractionConversionController] Reset ${fraction1.workingBoxId} to default background`);
      }
      
      if (workingBox2) {
        workingBox2.style.removeProperty('background-color');
        workingBox2.style.removeProperty('background');
        workingBox2.style.setProperty('background-color', defaultBgColor, 'important');
        console.log(`🔄 [FractionConversionController] Reset ${fraction2.workingBoxId} to default background`);
      }
    }
  }, [pageId, fraction1, fraction2, defaultBgColor]);

  // Apply highlight to working box (equation 2) and third box (equation 3)
  // Do NOT highlight number box (equation 1)
  const applyHighlight = React.useCallback((fraction, highlight = true) => {
    // Skip highlighting for page 16, page 18, and page 19
    if (pageId === 'page16' || pageId === 'page18' || pageId === 'page19') {
      return;
    }
    const bgColor = highlight ? highlightColor : defaultBgColor;
    
    // Only highlight working box (equation 2), NOT number box (equation 1)
    updateElementStyle(fraction.workingBoxId, { backgroundColor: bgColor });
    
    // For page 17, also highlight the corresponding third equation box
    if (pageId === 'page17') {
      // Map working boxes to third boxes
      // fraction1 -> third-box-1, fraction2 -> third-box-3
      const thirdBoxId = fraction.workingBoxId === 'page17-working-box-1' 
        ? 'page17-third-box-1' 
        : fraction.workingBoxId === 'page17-working-box-2'
        ? 'page17-third-box-3'
        : null;
      
      if (thirdBoxId) {
        updateElementStyle(thirdBoxId, { backgroundColor: bgColor });
      }
    }
  }, [pageId, highlightColor, defaultBgColor, updateElementStyle]);

  // Set number box (equation 1) or working box (equation 2) to complete (green with fraction)
  // For page 17: update third equation boxes (third-box-1 and third-box-3)
  // For page 15: update working boxes (equation 2)
  const setWorkingBoxComplete = React.useCallback((fraction) => {
    // Determine which box to update based on page
    let targetBoxId;
    let equivalentNumerator;
    let equivalentDenominator;
    
    if (pageId === 'page17') {
      // For page 17, update third equation boxes with equivalent fractions (denominator 200)
      // Map fraction1 -> third-box-1, fraction2 -> third-box-3
      targetBoxId = fraction.workingBoxId === 'page17-working-box-1' 
        ? 'page17-third-box-1' 
        : fraction.workingBoxId === 'page17-working-box-2'
        ? 'page17-third-box-3'
        : null;
      
      // Calculate equivalent fraction with denominator 200
      equivalentNumerator = Math.round((fraction.improperNumerator / fraction.improperDenominator) * 200);
      equivalentDenominator = 200;
    } else if (pageId === 'page18') {
      // For page 18, update fourth equation box (fourth-box) with correct fraction
      // The correct answer is 751/200
      targetBoxId = 'page18-fourth-box';
      equivalentNumerator = 751; // Correct answer for page 18
      equivalentDenominator = 200;
    } else {
      // For page 15, update working boxes
      targetBoxId = fraction.workingBoxId;
      equivalentNumerator = fraction.improperNumerator;
      equivalentDenominator = fraction.improperDenominator;
    }
    
    if (!targetBoxId) {
      console.error(`❌ [FractionConversionController] Could not determine target box for fraction:`, fraction);
      return;
    }
    
    console.log(`🎯 [FractionConversionController] Setting ${pageId === 'page17' ? 'third equation box' : pageId === 'page18' ? 'fourth equation box' : 'working box'} complete: ${targetBoxId} with fraction ${equivalentNumerator}/${equivalentDenominator}`);
    
    // Try to find the element with retry logic
    // For page 18, use longer delays since elements might take longer to render
    const maxAttempts = pageId === 'page18' ? 30 : 20;
    const retryDelay = pageId === 'page18' ? 200 : 100;
    
    const updateElement = (attempt = 0) => {
      let element = document.getElementById(targetBoxId);
      
      // If not found by ID, try to find by name or data attribute
      if (!element) {
        const nameToSearch = targetBoxId.replace('page15-', '').replace('page17-', '').replace('page18-', '');
        element = document.querySelector(`[name="${nameToSearch}"]`) ||
                  document.querySelector(`[data-element-name="${nameToSearch}"]`);
      }
      if (!element) {
        // Try to find by box type based on page
        const boxType = pageId === 'page17' ? 'number-box' : pageId === 'page18' ? 'fourth-box' : 'working-box';
        element = document.querySelector(`[data-element-name*="${boxType}"]`);
      }
      
      if (element) {
        console.log(`✅ [FractionConversionController] Found element ${targetBoxId}, updating...`);
        console.log(`🔍 [FractionConversionController] Element before update:`, {
          id: element.id,
          backgroundColor: element.style.backgroundColor,
          innerHTML: element.innerHTML,
          computedStyle: window.getComputedStyle(element).backgroundColor
        });
        
        // Force update using both style and setAttribute for maximum compatibility
        element.style.setProperty('background-color', correctColor, 'important');
        element.style.backgroundColor = correctColor;
        
        // Use equivalent fraction (for page 17, denominator is 200)
        const fractionHTML = createFractionHTML(equivalentNumerator, equivalentDenominator);
        
        // Try to update innerHTML, but also try to find and update child text nodes
        element.innerHTML = fractionHTML;
        
        // If TeacherNoteComponent uses a specific structure, try to update that too
        const textElement = element.querySelector('.teacher-note-text') || 
                           element.querySelector('[data-text-content]') ||
                           element.firstElementChild;
        if (textElement) {
          textElement.innerHTML = fractionHTML;
        }
        
        // Also try to update via data attributes that React might be watching
        element.setAttribute('data-fraction-num', equivalentNumerator);
        element.setAttribute('data-fraction-den', equivalentDenominator);
        element.setAttribute('data-complete', 'true');
        element.setAttribute('data-text', fractionHTML);
        
        console.log(`✅ [FractionConversionController] Updated ${targetBoxId} with HTML:`, fractionHTML);
        console.log(`🔍 [FractionConversionController] Element after update:`, {
          backgroundColor: element.style.backgroundColor,
          innerHTML: element.innerHTML,
          computedStyle: window.getComputedStyle(element).backgroundColor
        });
        
        // Force a reflow to ensure the style is applied
        void element.offsetHeight;
        
        // Verify the update took effect
        setTimeout(() => {
          const verifyElement = document.getElementById(targetBoxId);
          if (verifyElement) {
            const computedBg = window.getComputedStyle(verifyElement).backgroundColor;
            console.log(`🔍 [FractionConversionController] Verification - computed background: ${computedBg}, innerHTML: ${verifyElement.innerHTML.substring(0, 50)}...`);
            
            // If this is fraction 2 (working-box-2 for page 15, third-box-3 for page 17, or fourth-box for page 18), dispatch quiz completion event and disable number pad
            const isFraction2Complete = pageId === 'page17' 
              ? (targetBoxId === 'page17-third-box-3' || targetBoxId.includes('third-box-3'))
              : pageId === 'page18'
              ? (targetBoxId === 'page18-fourth-box' || targetBoxId.includes('fourth-box'))
              : (fraction.workingBoxId === 'page15-working-box-2' || fraction.workingBoxId.includes('working-box-2'));
            
            if (isFraction2Complete) {
              console.log(`🎯 [FractionConversionController] Working box 2 completed, dispatching quizCompleted event and disabling number pad`);
              if (typeof window !== 'undefined') {
                // Set global flag to disable number pad
                window.fractionConversionDisabled = true;
                console.log('🔒 [FractionConversionController] Number pad disabled');
                
                // Disable the number pad UI
                const numberPadId = pageId === 'page17' ? 'page17-number-pad' : pageId === 'page18' ? 'page18-number-pad' : pageId === 'page19' ? 'page19-number-pad' : 'page15-number-pad';
                const numberPadElement = document.getElementById(numberPadId) || 
                                        document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                                        document.querySelector(`[id*="${numberPadId}"]`);
                if (numberPadElement) {
                  numberPadElement.style.pointerEvents = 'none';
                  numberPadElement.style.opacity = '0.5';
                  console.log(`🔒 [FractionConversionController] Number pad UI disabled for ${numberPadId}`);
                }
                
                // Change denominator box font color to black (only for page 15)
                if (pageId === 'page15') {
                  const denominatorBox = document.getElementById(denominatorBoxId);
                  if (denominatorBox) {
                    denominatorBox.style.setProperty('color', '#000000', 'important');
                    // Also update any child text elements
                    const textElements = denominatorBox.querySelectorAll('*');
                    textElements.forEach(el => {
                      el.style.setProperty('color', '#000000', 'important');
                    });
                    console.log('🎨 [FractionConversionController] Denominator box font color changed to black');
                  }
                }
                
            // Dispatch quizCompleted event - SectionHeaderComponent will listen and update instruction text
            const pageNumber = pageId === 'page17' ? 17 : pageId === 'page18' ? 18 : pageId === 'page19' ? 19 : 15;
                const quizCompletedEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    componentType: 'FractionConversionController',
                    pageNumber: pageNumber
                  }
                });
                window.dispatchEvent(quizCompletedEvent);
                console.log('✅ [FractionConversionController] Dispatched quizCompleted event from setWorkingBoxComplete');
              }
            }
          }
        }, 50);
      } else if (attempt < maxAttempts) {
        console.log(`⏳ [FractionConversionController] Element ${targetBoxId} not found, retrying... (attempt ${attempt + 1}/${maxAttempts})`);
        setTimeout(() => updateElement(attempt + 1), retryDelay);
      } else {
        console.error(`❌ [FractionConversionController] Could not find element ${targetBoxId} after ${attempt} attempts`);
        const boxType = pageId === 'page17' ? 'number-box' : pageId === 'page18' ? 'fourth-box' : 'working-box';
        console.error(`🔍 [FractionConversionController] Available elements with '${boxType}' in ID:`, 
          Array.from(document.querySelectorAll(`[id*="${boxType}"]`)).map(el => ({ id: el.id, tagName: el.tagName })));
        console.error(`🔍 [FractionConversionController] All elements with '${pageId}' in ID:`, 
          Array.from(document.querySelectorAll(`[id*="${pageId}"]`)).slice(0, 20).map(el => el.id));
      }
    };
    
    updateElement(0);
  }, [pageId, correctColor, createFractionHTML]);

  // Update mixed number display (or improper fraction for page 17/19)
  const updateMixedNumberDisplay = React.useCallback((fraction) => {
    let content;
    if (pageId === 'page17') {
      // For page 17, show the improper fraction (e.g., "3/2")
      content = createFractionHTML(fraction.improperNumerator, fraction.improperDenominator);
    } else if (pageId === 'page18') {
      // For page 18, keep it blank
      content = '';
    } else if (pageId === 'page19') {
      // For page 19, show the sum improper fraction 751/200
      content = createFractionHTML(751, 200);
    } else {
      // For page 15, show the mixed number (e.g., "1 1/2")
      content = createMixedNumberHTML(fraction.mixedWhole, fraction.mixedNumerator, fraction.mixedDenominator);
    }
    updateElementContent(mixedNumberTextId, content);
    
    // For page 17 and page 18, also set the denominator box to show "200" (LCM)
    if (pageId === 'page17' || pageId === 'page18') {
      updateElementContent(denominatorBoxId, '200');
    }
  }, [pageId, mixedNumberTextId, denominatorBoxId, createMixedNumberHTML, createFractionHTML, updateElementContent]);

  // Set input box active (blinking border)
  // For page 17, only the numerator box should be active (denominator shows "200")
  // For page 19, activate whole number, numerator, or denominator based on state
  const setInputBoxActive = React.useCallback((boxId, active = true) => {
    // For page 17 and page 18, don't activate the denominator box (it shows "200", not for input)
    if ((pageId === 'page17' || pageId === 'page18') && boxId === denominatorBoxId) {
      return;
    }
    
    const element = document.getElementById(boxId);
    if (element) {
      if (active) {
        element.style.border = `3px solid ${activeBorderColor}`;
        element.style.animation = 'pulse-border 1s infinite';
        // All active boxes should have highlight color background
        element.style.pointerEvents = 'auto'; // Allow interaction when active
        element.style.backgroundColor = highlightColor;
        element.style.opacity = '1'; // Fully visible when active
        setBlinkingElement(boxId);
      } else {
        // Disable the box - remove active styling
        element.style.border = `2px solid ${activeBorderColor}`;
        element.style.animation = 'none';
        element.style.pointerEvents = 'none'; // Prevent interaction when disabled
        
        // For page 19, check if the box has a correct value (white background with black text)
        // If it does, keep it white; otherwise make it gray
        if (pageId === 'page19') {
          const computedBg = window.getComputedStyle(element).backgroundColor;
          const isWhite = computedBg === 'rgb(255, 255, 255)' || computedBg === '#ffffff' || 
                         element.style.backgroundColor === '#ffffff' || 
                         element.style.getPropertyValue('background-color') === 'rgb(255, 255, 255)';
          const hasContent = element.textContent.trim() !== '' || element.innerHTML.trim() !== '';
          
          if (isWhite && hasContent) {
            // Box has correct value, keep it white with black text
            element.style.backgroundColor = '#ffffff';
            element.style.color = '#000000';
            element.style.opacity = '1';
          } else {
            // Box is empty or incorrect, make it gray
            element.style.backgroundColor = '#4A5568';
            element.style.opacity = '0.6';
          }
        } else {
          element.style.backgroundColor = '#ffffff';
        }
      }
    }
  }, [pageId, denominatorBoxId, wholeNumberBoxId, activeBorderColor, highlightColor]);

  // Cleanup: Reset styles when component unmounts or page changes away from this controller's page
  React.useEffect(() => {
    return () => {
      // Cleanup function - reset working boxes when component unmounts
      console.log(`🧹 [FractionConversionController] Cleaning up for ${pageId}`);
      
      // Reset working boxes to default (in case navigating away)
      const workingBox1 = document.getElementById(fraction1.workingBoxId);
      const workingBox2 = document.getElementById(fraction2.workingBoxId);
      
      if (workingBox1 && pageId === 'page15') {
        workingBox1.style.removeProperty('background-color');
        workingBox1.style.setProperty('background-color', defaultBgColor, 'important');
      }
      
      if (workingBox2 && pageId === 'page15') {
        workingBox2.style.removeProperty('background-color');
        workingBox2.style.setProperty('background-color', defaultBgColor, 'important');
      }
    };
  }, [pageId, fraction1, fraction2, defaultBgColor]);

  // Initialize state on mount
  React.useEffect(() => {
    console.log(`🎮 [FractionConversionController] Initializing for ${pageId}`);
    
    // Reset disabled flag when controller initializes (ensures clean state on page load)
    if (typeof window !== 'undefined') {
      window.fractionConversionDisabled = false;
      console.log(`🔄 [FractionConversionController] Reset disabled flag on initialization for ${pageId}`);
      
      // Re-enable the number pad UI
      const numberPadId = pageId === 'page17' ? 'page17-number-pad' : pageId === 'page18' ? 'page18-number-pad' : pageId === 'page19' ? 'page19-number-pad' : 'page15-number-pad';
      const numberPadElement = document.getElementById(numberPadId) || 
                              document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                              document.querySelector(`[id*="${numberPadId}"]`);
      if (numberPadElement) {
        numberPadElement.style.pointerEvents = '';
        numberPadElement.style.opacity = '';
        console.log(`🔄 [FractionConversionController] Re-enabled number pad UI for ${numberPadId}`);
      }
    }
    
    // Listen for page change events to reset disabled flag when navigating to this page
    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      const pageNumber = pageId === 'page17' ? 17 : pageId === 'page18' ? 18 : pageId === 'page19' ? 19 : 15;
      if (newPage === pageNumber) {
        console.log(`🔄 [FractionConversionController] Page changed to ${pageNumber}, resetting disabled flag`);
        if (typeof window !== 'undefined') {
          window.fractionConversionDisabled = false;
          
          // Re-enable the number pad UI
          const numberPadId = pageId === 'page17' ? 'page17-number-pad' : pageId === 'page18' ? 'page18-number-pad' : pageId === 'page19' ? 'page19-number-pad' : 'page15-number-pad';
          const numberPadElement = document.getElementById(numberPadId) || 
                                  document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                                  document.querySelector(`[id*="${numberPadId}"]`);
          if (numberPadElement) {
            numberPadElement.style.pointerEvents = '';
            numberPadElement.style.opacity = '';
            console.log(`🔄 [FractionConversionController] Re-enabled number pad UI for ${numberPadId} on page change`);
          }
        }
      }
    };
    
    window.addEventListener('pageChanged', handlePageChange);
    
    // Add CSS animation for blinking
    if (!document.getElementById('fraction-conversion-styles')) {
      const style = document.createElement('style');
      style.id = 'fraction-conversion-styles';
      style.textContent = `
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(255, 140, 0, 0); }
        }
      `;
      document.head.appendChild(style);
    }

    // Initial setup - highlight fraction 1, show its mixed number
    setTimeout(() => {
      // Reset working boxes first (especially important for page 16 to clear page 15 styles)
      resetWorkingBoxes();
      
      if (pageId === 'page19') {
        // For page 19, show 751/200 and activate whole number box only
        updateMixedNumberDisplay(fraction1);
        if (wholeNumberBoxId) {
          setInputBoxActive(wholeNumberBoxId, true);
          updateElementContent(wholeNumberBoxId, '');
        }
        // Disable numerator and denominator boxes initially
        setInputBoxActive(numeratorBoxId, false);
        setInputBoxActive(denominatorBoxId, false);
        updateElementContent(numeratorBoxId, '');
        updateElementContent(denominatorBoxId, '');
      } else {
        applyHighlight(fraction1, true);
        applyHighlight(fraction2, false);
        updateMixedNumberDisplay(fraction1);
        setInputBoxActive(numeratorBoxId, true);
        
        // Clear the numerator box
        updateElementContent(numeratorBoxId, '');
        // For page 17 and page 18, set denominator to "200", otherwise clear it
        if (pageId === 'page17' || pageId === 'page18') {
          updateElementContent(denominatorBoxId, '200');
        } else {
          updateElementContent(denominatorBoxId, '');
        }
      }
    }, 500);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
    };
  }, [pageId, fraction1, fraction2, applyHighlight, updateMixedNumberDisplay, setInputBoxActive, numeratorBoxId, denominatorBoxId, wholeNumberBoxId, updateElementContent, resetWorkingBoxes]);

  // Update state ref whenever currentState changes
  React.useEffect(() => {
    currentStateRef.current = currentState;
    console.log(`🔄 [FractionConversionController] State ref updated to: ${currentState}`);
  }, [currentState]);
  
  // Track if this is the initial mount to prevent auto-completing
  const isInitialMount = React.useRef(true);
  
  // Handle state transitions
  React.useEffect(() => {
    console.log(`🔄 [FractionConversionController] State changed to: ${currentState}`);
    
    // Mark that initial mount is complete after first effect
    if (isInitialMount.current && currentState !== 'complete') {
      isInitialMount.current = false;
    }
    
    // Skip 'complete' state handling on initial mount - it should only be reached after user interaction
    if (currentState === 'complete' && isInitialMount.current) {
      console.log(`⚠️ [FractionConversionController] Ignoring 'complete' state on initial mount - this indicates a bug`);
      isInitialMount.current = false;
      return;
    }
    
    // For 'complete' state, we don't need getCurrentFraction, we handle it separately
    if (currentState === 'complete') {
      // For page 19 we now use a FlipTile for the final answer, so we no longer
      // overwrite the fourth-box content or background here. We only disable the
      // number pad and dispatch quizCompleted; the tile itself controls its flip state.
      if (pageId === 'page19') {
        console.log(`🎯 [FractionConversionController] Page 19 complete, disabling number pad and dispatching quizCompleted (FlipTile handles visual state)`);
        
        if (typeof window !== 'undefined') {
          // Set global flag to disable number pad
          window.fractionConversionDisabled = true;
          console.log('🔒 [FractionConversionController] Number pad disabled');
          
          // Disable the number pad UI
          const numberPadId = 'page19-number-pad';
          const numberPadElement =
            document.getElementById(numberPadId) ||
            document.querySelector(`[data-element-name="${numberPadId}"]`) ||
            document.querySelector(`[id*="${numberPadId}"]`);
          if (numberPadElement) {
            numberPadElement.style.pointerEvents = 'none';
            numberPadElement.style.opacity = '0.5';
            console.log(`🔒 [FractionConversionController] Number pad UI disabled for ${numberPadId}`);
          }
          
          // Dispatch quizCompleted event for page 19
          const quizCompletedEvent = new CustomEvent('quizCompleted', {
            detail: {
              componentType: 'FractionConversionController',
              pageNumber: 19,
            },
          });
          window.dispatchEvent(quizCompletedEvent);
          console.log('✅ [FractionConversionController] Dispatched quizCompleted event for page 19');
        }

        onComplete?.();
        onStepChange?.(currentState);
        return;
      }
      
      // For page 18, use fraction1 (only one input); for page 17, use fraction2; for page 15, use fraction2
      const fractionToUse = pageId === 'page18' ? fraction1 : fraction2;
      // For page 17, use third-box-3; for page 18, use fourth-box; for page 15, use working-box-2
      const targetBoxId = pageId === 'page17' 
        ? (fraction2.workingBoxId === 'page17-working-box-2' ? 'page17-third-box-3' : null)
        : pageId === 'page18'
        ? 'page18-fourth-box'
        : fraction2.workingBoxId;
      console.log(`🎯 [FractionConversionController] State is complete, updating ${pageId === 'page17' ? 'third equation box' : pageId === 'page18' ? 'fourth equation box' : 'working box'}...`);
      console.log(`🔍 [FractionConversionController] Fraction config:`, fractionToUse);
      console.log(`🔍 [FractionConversionController] Looking for element: ${targetBoxId}`);
      
      if (pageId !== 'page18') {
        applyHighlight(fraction2, false);
      }
      
      // Check if element exists immediately
      const checkElement = () => {
        const element = document.getElementById(targetBoxId);
        console.log(`🔍 [FractionConversionController] Element check - found: ${!!element}, ID: ${targetBoxId}`);
        if (element) {
          console.log(`✅ [FractionConversionController] Element exists, calling setWorkingBoxComplete immediately`);
          setWorkingBoxComplete(fractionToUse);
        } else {
          console.log(`⏳ [FractionConversionController] Element not found, will retry in 100ms`);
        }
      };
      
      checkElement();
      
      // Use setTimeout to ensure DOM is ready (retry with increasing delays)
      // For page 18, elements might take longer to render, so use longer delays
      const retryDelays = pageId === 'page18' ? [200, 500, 1000, 2000] : [100, 500, 1000];
      
      retryDelays.forEach((delay, index) => {
        setTimeout(() => {
          console.log(`🔄 [FractionConversionController] Retry ${index + 1}: calling setWorkingBoxComplete for ${targetBoxId} after ${delay}ms`);
          setWorkingBoxComplete(fractionToUse);
        }, delay);
      });
      
      setInputBoxActive(numeratorBoxId, false);
      setInputBoxActive(denominatorBoxId, false);
      
      // Note: quizCompleted event is primarily dispatched in setWorkingBoxComplete when the box is updated
      // This ensures the event is dispatched only after the UI is actually updated
      // Fallback: dispatch after a delay if the box update doesn't trigger it
      setTimeout(() => {
        // Check if the box has been updated (has data-complete attribute)
        // For page 17, check third-box-3; for page 18, check fourth-box; for page 15, check working-box-2
        const targetBoxId = pageId === 'page17' 
          ? (fraction2.workingBoxId === 'page17-working-box-2' ? 'page17-third-box-3' : null)
          : pageId === 'page18'
          ? 'page18-fourth-box'
          : fraction2.workingBoxId;
        const completedBox = document.getElementById(targetBoxId);
        if (completedBox && completedBox.getAttribute('data-complete') === 'true') {
          console.log(`✅ [FractionConversionController] ${pageId === 'page17' ? 'Third equation box' : pageId === 'page18' ? 'Fourth equation box' : 'Working box'} confirmed complete, quiz should already be completed`);
        } else {
          // Fallback: dispatch if box wasn't updated (shouldn't happen, but just in case)
          console.log(`⚠️ [FractionConversionController] ${pageId === 'page17' ? 'Third equation box' : pageId === 'page18' ? 'Fourth equation box' : 'Working box'} not updated yet, dispatching quizCompleted as fallback`);
          if (typeof window !== 'undefined') {
            // Set global flag to disable number pad
            window.fractionConversionDisabled = true;
            console.log('🔒 [FractionConversionController] Number pad disabled (fallback)');
            
            // Disable the number pad UI
            const numberPadId = pageId === 'page17' ? 'page17-number-pad' : 'page15-number-pad';
            const numberPadElement = document.getElementById(numberPadId) || 
                                    document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                                    document.querySelector(`[id*="${numberPadId}"]`);
            if (numberPadElement) {
              numberPadElement.style.pointerEvents = 'none';
              numberPadElement.style.opacity = '0.5';
              console.log('🔒 [FractionConversionController] Number pad UI disabled (fallback)');
            }
            
            // Change denominator box font color to black (only for page 15)
            if (pageId === 'page15') {
              const denominatorBox = document.getElementById(denominatorBoxId);
              if (denominatorBox) {
                denominatorBox.style.setProperty('color', '#000000', 'important');
                // Also update any child text elements
                const textElements = denominatorBox.querySelectorAll('*');
                textElements.forEach(el => {
                  el.style.setProperty('color', '#000000', 'important');
                });
                console.log('🎨 [FractionConversionController] Denominator box font color changed to black (fallback)');
              }
            }
            
            // Dispatch quizCompleted event - SectionHeaderComponent will listen and update instruction text
            const pageNumber = pageId === 'page17' ? 17 : 15;
            const quizCompletedEvent = new CustomEvent('quizCompleted', {
              detail: {
                componentType: 'FractionConversionController',
                pageNumber: pageNumber
              }
            });
            window.dispatchEvent(quizCompletedEvent);
            console.log('✅ [FractionConversionController] Dispatched quizCompleted event (fallback)');
          }
        }
      }, 600);
      
      onComplete?.();
      
      onStepChange?.(currentState);
      return; // Early return for complete state
    }
    
    // Update UI based on current state
    // For page 19, handle whole-number, numerator, denominator states (no fraction needed)
    if (pageId === 'page19') {
      if (currentState === 'whole-number') {
        updateMixedNumberDisplay(fraction1);
        if (wholeNumberBoxId) {
          setInputBoxActive(wholeNumberBoxId, true);
          updateElementContent(wholeNumberBoxId, '');
        }
        setInputBoxActive(numeratorBoxId, false);
        setInputBoxActive(denominatorBoxId, false);
        updateElementContent(numeratorBoxId, '');
        updateElementContent(denominatorBoxId, '');
      } else if (currentState === 'numerator') {
        // Deactivate whole number box but keep its value and white background if correct
        if (wholeNumberBoxId) {
          const wholeBox = document.getElementById(wholeNumberBoxId);
          if (wholeBox && wholeBox.textContent.trim() !== '') {
            // Keep white background with black text for correct value
            wholeBox.style.backgroundColor = '#ffffff';
            wholeBox.style.color = '#000000';
            wholeBox.style.border = `2px solid ${activeBorderColor}`;
            wholeBox.style.animation = 'none';
            wholeBox.style.pointerEvents = 'none';
            wholeBox.style.opacity = '1';
          } else {
            setInputBoxActive(wholeNumberBoxId, false);
          }
        }
        setInputBoxActive(numeratorBoxId, true);
        setInputBoxActive(denominatorBoxId, false);
        updateElementContent(numeratorBoxId, '');
        updateElementContent(denominatorBoxId, '');
      } else if (currentState === 'denominator') {
        // Deactivate whole number and numerator boxes but keep their values and white backgrounds if correct
        if (wholeNumberBoxId) {
          const wholeBox = document.getElementById(wholeNumberBoxId);
          if (wholeBox && wholeBox.textContent.trim() !== '') {
            wholeBox.style.backgroundColor = '#ffffff';
            wholeBox.style.color = '#000000';
            wholeBox.style.border = `2px solid ${activeBorderColor}`;
            wholeBox.style.animation = 'none';
            wholeBox.style.pointerEvents = 'none';
            wholeBox.style.opacity = '1';
          } else {
            setInputBoxActive(wholeNumberBoxId, false);
          }
        }
        const numBox = document.getElementById(numeratorBoxId);
        if (numBox && numBox.textContent.trim() !== '') {
          numBox.style.backgroundColor = '#ffffff';
          numBox.style.color = '#000000';
          numBox.style.border = `2px solid ${activeBorderColor}`;
          numBox.style.animation = 'none';
          numBox.style.pointerEvents = 'none';
          numBox.style.opacity = '1';
        } else {
          setInputBoxActive(numeratorBoxId, false);
        }
        setInputBoxActive(denominatorBoxId, true);
        updateElementContent(denominatorBoxId, '');
      }
      onStepChange?.(currentState);
      return;
    }
    
    if (currentState === 'fraction1-numerator') {
      applyHighlight(fraction1, true);
      applyHighlight(fraction2, false);
      updateMixedNumberDisplay(fraction1);
      setInputBoxActive(numeratorBoxId, true);
      setInputBoxActive(denominatorBoxId, false);
      updateElementContent(numeratorBoxId, '');
      // For page 17 and page 18, set denominator to "200", otherwise clear it
      if (pageId === 'page17' || pageId === 'page18') {
        updateElementContent(denominatorBoxId, '200');
      } else {
        updateElementContent(denominatorBoxId, '');
      }
    } else if (currentState === 'fraction1-denominator') {
      // For page 17 and page 18, skip denominator state (it shows "200")
      if (pageId === 'page17' || pageId === 'page18') {
        return;
      }
      setInputBoxActive(numeratorBoxId, false);
      setInputBoxActive(denominatorBoxId, true);
      // Keep numerator value visible
      updateElementContent(denominatorBoxId, '');
    } else if (currentState === 'fraction2-numerator') {
      console.log(`🎯 [FractionConversionController] Moving to fraction2, completing fraction1...`);
      applyHighlight(fraction1, false);
      
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        setWorkingBoxComplete(fraction1);
      }, 100);
      
      applyHighlight(fraction2, true);
      updateMixedNumberDisplay(fraction2);
      setInputBoxActive(numeratorBoxId, true);
      setInputBoxActive(denominatorBoxId, false);
      updateElementContent(numeratorBoxId, '');
      // For page 17 and page 18, set denominator to "200", otherwise clear it
      if (pageId === 'page17' || pageId === 'page18') {
        updateElementContent(denominatorBoxId, '200');
      } else {
        updateElementContent(denominatorBoxId, '');
      }
    } else if (currentState === 'fraction2-denominator') {
      // For page 17 and page 18, skip denominator state (it shows "200")
      if (pageId === 'page17' || pageId === 'page18') {
        return;
      }
      setInputBoxActive(numeratorBoxId, false);
      setInputBoxActive(denominatorBoxId, true);
      updateElementContent(denominatorBoxId, '');
    }

    onStepChange?.(currentState);
  }, [currentState, fraction1, fraction2, getCurrentFraction, applyHighlight, updateMixedNumberDisplay, 
      setInputBoxActive, setWorkingBoxComplete, numeratorBoxId, denominatorBoxId, wholeNumberBoxId, pageId, createMixedNumberHTML, correctColor, updateElementContent, onComplete, onStepChange]);

  // Listen for number pad input
  React.useEffect(() => {
    const handleNumberPadInput = (event) => {
      const { number, action } = event.detail || {};
      
      if (currentState === 'complete') return;
      
      if (action === 'clear') {
        setInputValue('');
        setFeedbackMessage('');
        setFeedbackType('');
        // Update display
        let targetBox;
        if (pageId === 'page19') {
          if (currentState === 'whole-number') {
            targetBox = wholeNumberBoxId;
          } else if (currentState === 'numerator') {
            targetBox = numeratorBoxId;
          } else {
            targetBox = denominatorBoxId;
          }
        } else {
          targetBox = currentState.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
        }
        if (targetBox) {
          updateElementContent(targetBox, '');
        }
        return;
      }
      
      if (action === 'backspace') {
        setInputValue(prev => {
          const newValue = prev.slice(0, -1);
          let targetBox;
          if (pageId === 'page19') {
            if (currentState === 'whole-number') {
              targetBox = wholeNumberBoxId;
            } else if (currentState === 'numerator') {
              targetBox = numeratorBoxId;
            } else {
              targetBox = denominatorBoxId;
            }
          } else {
            targetBox = currentState.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
          }
          if (targetBox) {
            updateElementContent(targetBox, newValue);
          }
          return newValue;
        });
        return;
      }
      
      if (action === 'check') {
        // Use ref to access handleCheck to avoid initialization order issues
        if (handleCheckRef.current) {
          handleCheckRef.current();
        }
        return;
      }
      
      if (number !== undefined) {
        setInputValue(prev => {
          const newValue = prev + number.toString();
          let targetBox;
          if (pageId === 'page19') {
            if (currentState === 'whole-number') {
              targetBox = wholeNumberBoxId;
            } else if (currentState === 'numerator') {
              targetBox = numeratorBoxId;
            } else {
              targetBox = denominatorBoxId;
            }
          } else {
            targetBox = currentState.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
          }
          if (targetBox) {
            updateElementContent(targetBox, newValue);
          }
          return newValue;
        });
        setFeedbackMessage('');
        setFeedbackType('');
      }
    };

    window.addEventListener('numberPadInput', handleNumberPadInput);
    return () => window.removeEventListener('numberPadInput', handleNumberPadInput);
  }, [currentState, numeratorBoxId, denominatorBoxId, wholeNumberBoxId, pageId, updateElementContent]);

  // Handle check button
  const handleCheck = React.useCallback(() => {
    const correctAnswer = getCorrectAnswer();
    const userAnswer = parseInt(inputValue, 10);
    
    console.log(`🔍 [FractionConversionController] Checking: user=${userAnswer}, correct=${correctAnswer}`);
    
    if (isNaN(userAnswer)) {
      setFeedbackMessage('Please enter a number');
      setFeedbackType('incorrect');
      if (typeof window !== 'undefined' && window.playAnswerSound) {
        window.playAnswerSound(false);
      }
      return;
    }
    
    if (userAnswer === correctAnswer) {
      // Correct!
      setFeedbackMessage('Correct! ✓');
      setFeedbackType('correct');
      
      if (typeof window !== 'undefined' && window.playAnswerSound) {
        window.playAnswerSound(true);
      }
      
      // Update the input box to show correct state
      let targetBox;
      if (pageId === 'page19') {
        if (currentState === 'whole-number') {
          targetBox = wholeNumberBoxId;
        } else if (currentState === 'numerator') {
          targetBox = numeratorBoxId;
        } else {
          targetBox = denominatorBoxId;
        }
      } else {
        targetBox = currentState.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
      }
      if (targetBox) {
        // For page 19, use white background with black text for correct answers
        if (pageId === 'page19') {
          updateElementStyle(targetBox, { 
            backgroundColor: '#ffffff',
            color: '#000000',
            border: `2px solid ${correctColor}`,
            animation: 'none'
          });
        } else {
          updateElementStyle(targetBox, { 
            backgroundColor: correctColor,
            border: `2px solid ${correctColor}`,
            animation: 'none'
          });
        }
      }
      
      // Move to next state after a short delay
      setTimeout(() => {
        setInputValue('');
        setFeedbackMessage('');
        setFeedbackType('');
        
        // State transition
        // For page 19: whole-number → numerator → denominator → complete
        if (pageId === 'page19') {
          if (currentState === 'whole-number') {
            setCurrentState('numerator');
          } else if (currentState === 'numerator') {
            setCurrentState('denominator');
          } else if (currentState === 'denominator') {
            setCurrentState('complete');
          }
          return;
        }
        // For page 17, skip denominator states (denominator is fixed at 200)
        // For page 18, only one numerator input, so go directly to complete
        if (pageId === 'page17') {
          if (currentState === 'fraction1-numerator') {
            setCurrentState('fraction2-numerator');
          } else if (currentState === 'fraction2-numerator') {
            setCurrentState('complete');
          }
        } else if (pageId === 'page18') {
          // For page 18, only one input (numerator), so go directly to complete
          if (currentState === 'fraction1-numerator') {
            setCurrentState('complete');
          }
        } else {
          // For page 15, use all states
          if (currentState === 'fraction1-numerator') {
            setCurrentState('fraction1-denominator');
          } else if (currentState === 'fraction1-denominator') {
            setCurrentState('fraction2-numerator');
          } else if (currentState === 'fraction2-numerator') {
            setCurrentState('fraction2-denominator');
          } else if (currentState === 'fraction2-denominator') {
            setCurrentState('complete');
          }
        }
      }, 1000);
    } else {
      // Incorrect
      setFeedbackMessage('Try again');
      setFeedbackType('incorrect');
      
      if (typeof window !== 'undefined' && window.playAnswerSound) {
        window.playAnswerSound(false);
      }
      
      // Flash the input box red briefly
      let targetBox;
      if (pageId === 'page19') {
        if (currentState === 'whole-number') {
          targetBox = wholeNumberBoxId;
        } else if (currentState === 'numerator') {
          targetBox = numeratorBoxId;
        } else {
          targetBox = denominatorBoxId;
        }
      } else {
        targetBox = currentState.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
      }
      if (targetBox) {
        updateElementStyle(targetBox, { backgroundColor: '#EF4444' });
        setTimeout(() => {
          if (pageId === 'page19' && currentState === 'whole-number') {
            updateElementStyle(targetBox, { backgroundColor: '#ffffff' });
          } else if (pageId === 'page19') {
            updateElementStyle(targetBox, { backgroundColor: highlightColor });
          } else {
            updateElementStyle(targetBox, { backgroundColor: highlightColor });
          }
        }, 500);
      }
    }
  }, [currentState, inputValue, getCorrectAnswer, numeratorBoxId, denominatorBoxId, wholeNumberBoxId, pageId, updateElementStyle, correctColor, highlightColor]);
  
  // Update ref whenever handleCheck changes
  React.useEffect(() => {
    handleCheckRef.current = handleCheck;
  }, [handleCheck]);

  // Expose check function globally for number pad to call
  React.useEffect(() => {
    window.fractionConversionCheck = handleCheck;
    window.fractionConversionInput = (value) => {
      // Use ref to get current state to avoid stale closure
      const state = currentStateRef.current;
      console.log(`🔢 [FractionConversionController] Input received: value=${value}, state=${state}, pageId=${pageId}`);
      if (state === 'complete') return;
      
      setInputValue(prev => {
        const newValue = prev + value.toString();
        let targetBox;
        if (pageId === 'page19') {
          if (state === 'whole-number') {
            targetBox = wholeNumberBoxId;
          } else if (state === 'numerator') {
            targetBox = numeratorBoxId;
          } else {
            targetBox = denominatorBoxId;
          }
        } else {
          targetBox = state.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
        }
        console.log(`🎯 [FractionConversionController] Target box: ${targetBox} (state: ${state})`);
        if (targetBox) {
          updateElementContent(targetBox, newValue);
        } else {
          console.error(`❌ [FractionConversionController] No target box found for state: ${state}`);
        }
        return newValue;
      });
      setFeedbackMessage('');
      setFeedbackType('');
    };
    window.fractionConversionClear = () => {
      // Use ref to get current state to avoid stale closure
      const state = currentStateRef.current;
      setInputValue('');
      setFeedbackMessage('');
      setFeedbackType('');
      let targetBox;
      if (pageId === 'page19') {
        if (state === 'whole-number') {
          targetBox = wholeNumberBoxId;
        } else if (state === 'numerator') {
          targetBox = numeratorBoxId;
        } else {
          targetBox = denominatorBoxId;
        }
      } else {
        targetBox = state.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
      }
      if (targetBox) {
        updateElementContent(targetBox, '');
      }
    };
    window.fractionConversionBackspace = () => {
      // Use ref to get current state to avoid stale closure
      const state = currentStateRef.current;
      setInputValue(prev => {
        const newValue = prev.slice(0, -1);
        let targetBox;
        if (pageId === 'page19') {
          if (state === 'whole-number') {
            targetBox = wholeNumberBoxId;
          } else if (state === 'numerator') {
            targetBox = numeratorBoxId;
          } else {
            targetBox = denominatorBoxId;
          }
        } else {
          targetBox = state.endsWith('-numerator') ? numeratorBoxId : denominatorBoxId;
        }
        if (targetBox) {
          updateElementContent(targetBox, newValue);
        }
        return newValue;
      });
    };
    
    return () => {
      // Clean up global functions when component unmounts to prevent state sharing between pages
      delete window.fractionConversionCheck;
      delete window.fractionConversionInput;
      delete window.fractionConversionClear;
      delete window.fractionConversionBackspace;
      console.log(`🧹 [FractionConversionController] Cleaned up global functions for ${pageId}`);
    };
  }, [handleCheck, numeratorBoxId, denominatorBoxId, wholeNumberBoxId, pageId, updateElementContent]);

  // This component doesn't render any visible UI - it just manages state
  // The feedback is shown in the number pad's feedback area
  return React.createElement('div', {
    id: `${pageId}-fraction-conversion-controller`,
    style: { display: 'none' },
    'data-component-type': 'FractionConversionController', // For quiz detection
    'data-component': 'FractionConversionController', // Also set for quiz detection compatibility
    'data-current-state': currentState,
    'data-feedback': feedbackMessage,
    'data-feedback-type': feedbackType
  });
});

// Register the component globally
if (typeof window !== 'undefined') {
  window.FractionConversionController = FractionConversionController;
}

