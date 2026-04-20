/**
 * LCM Input Controller Component
 * 
 * This component manages the LCM input for page 16. It handles:
 * - Number pad input for the LCM box
 * - Validating the answer (correct: 200)
 * - Providing feedback and updating the box color
 */

const LCMInputController = React.memo((props) => {
  const {
    pageId = 'page16',
    lcmBoxId = 'page16-lcm-box',
    correctAnswer = 200,
    correctColor = '#22C55E',
    activeBorderColor = '#FF8C00'
  } = props;
  
  console.log('🔢 [LCMInputController] Component mounted with props:', props);

  const [inputValue, setInputValue] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);
  
  // Use refs to avoid stale closures in global functions
  const inputValueRef = React.useRef('');
  const isCompleteRef = React.useRef(false);
  
  // Keep refs in sync with state
  React.useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);
  
  React.useEffect(() => {
    isCompleteRef.current = isComplete;
  }, [isComplete]);

  // Update LCM box content
  const updateLCMBox = React.useCallback((value) => {
    const element = document.getElementById(lcmBoxId);
    if (element) {
      // Use both textContent and innerHTML to ensure value persists
      // Also set data attribute for persistence
      element.textContent = value;
      element.innerHTML = value;
      element.setAttribute('data-lcm-value', value);
      // Force a reflow to ensure the update is applied
      void element.offsetHeight;
      console.log(`📝 [LCMInputController] Updated LCM box with value: "${value}"`);
    } else {
      console.warn(`⚠️ [LCMInputController] LCM box element not found: ${lcmBoxId}`);
    }
  }, [lcmBoxId]);

  // Set LCM box active (orange border, blinking)
  const setLCMBoxActive = React.useCallback((active = true) => {
    const element = document.getElementById(lcmBoxId);
    if (element) {
      if (active) {
        element.style.border = `3px solid ${activeBorderColor}`;
        element.style.animation = 'pulse-border 1s infinite';
      } else {
        element.style.border = `3px solid ${activeBorderColor}`;
        element.style.animation = 'none';
      }
    }
  }, [lcmBoxId, activeBorderColor]);

  // Handle check button
  const handleCheck = React.useCallback(() => {
    const userAnswer = parseInt(inputValue, 10);
    const correct = userAnswer === correctAnswer;
    
    console.log(`🔍 [LCMInputController] Checking: user=${userAnswer}, correct=${correctAnswer}, result=${correct}`);
    
    const element = document.getElementById(lcmBoxId);
    if (element) {
      if (correct) {
        // Correct answer - green background
        element.style.setProperty('background-color', correctColor, 'important');
        element.style.border = `3px solid ${correctColor}`;
        element.style.animation = 'none';
        setIsComplete(true);
        
        // Play correct sound
        if (typeof window !== 'undefined' && window.playCorrectSound) {
          window.playCorrectSound();
        } else if (typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('correct');
        }
        
        // Dispatch quiz completed event
        if (typeof window !== 'undefined') {
          const quizCompletedEvent = new CustomEvent('quizCompleted', {
            detail: {
              componentType: 'LCMInputController',
              pageNumber: 16
            }
          });
          window.dispatchEvent(quizCompletedEvent);
          console.log('✅ [LCMInputController] Dispatched quizCompleted event');
        }
        
        // Disable number pad
        window.lcmInputDisabled = true;
        const numberPadElement = document.getElementById('page16-number-pad') || 
                                document.querySelector('[data-element-name="page16-number-pad"]') ||
                                document.querySelector('[id*="page16-number-pad"]');
        if (numberPadElement) {
          numberPadElement.style.pointerEvents = 'none';
          numberPadElement.style.opacity = '0.5';
          console.log('🔒 [LCMInputController] Number pad disabled');
        }
      } else {
        // Incorrect answer - red flash
        element.style.animation = 'none';
        const originalBg = element.style.backgroundColor;
        element.style.setProperty('background-color', '#EF4444', 'important');
        
        // Play incorrect sound
        if (typeof window !== 'undefined' && window.playIncorrectSound) {
          window.playIncorrectSound();
        } else if (typeof window !== 'undefined' && window.playCarClickSound) {
          window.playCarClickSound('wrong');
        }
        
        // Flash red then return to white
        setTimeout(() => {
          if (element) {
            element.style.setProperty('background-color', '#ffffff', 'important');
            setLCMBoxActive(true);
          }
        }, 500);
      }
    }
  }, [inputValue, correctAnswer, correctColor, lcmBoxId, setLCMBoxActive]);

  // Add pulse-border animation CSS if not already present
  React.useEffect(() => {
    if (!document.getElementById('lcm-pulse-border-style')) {
      const style = document.createElement('style');
      style.id = 'lcm-pulse-border-style';
      style.textContent = `
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(255, 140, 0, 0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Reset working boxes and number boxes to default state when page 16 loads (clear any styles from page 15)
  React.useEffect(() => {
    // Reset disabled flag when controller initializes (ensures clean state on page load)
    if (typeof window !== 'undefined') {
      window.lcmInputDisabled = false;
      console.log(`🔄 [LCMInputController] Reset disabled flag on initialization for ${pageId}`);
      
      // Re-enable the number pad UI
      const numberPadId = 'page16-number-pad';
      const numberPadElement = document.getElementById(numberPadId) || 
                              document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                              document.querySelector(`[id*="${numberPadId}"]`);
      if (numberPadElement) {
        numberPadElement.style.pointerEvents = '';
        numberPadElement.style.opacity = '';
        console.log(`🔄 [LCMInputController] Re-enabled number pad UI for ${numberPadId}`);
      }
    }
    
    const resetBoxes = () => {
      // Reset working boxes
      const workingBox1 = document.getElementById('page16-working-box-1');
      const workingBox2 = document.getElementById('page16-working-box-2');
      
      if (workingBox1) {
        workingBox1.style.removeProperty('background-color');
        workingBox1.style.removeProperty('background');
        workingBox1.style.setProperty('background-color', '#4A5568', 'important');
        console.log('🔄 [LCMInputController] Reset page16-working-box-1 to default background');
      }
      
      if (workingBox2) {
        workingBox2.style.removeProperty('background-color');
        workingBox2.style.removeProperty('background');
        workingBox2.style.setProperty('background-color', '#4A5568', 'important');
        console.log('🔄 [LCMInputController] Reset page16-working-box-2 to default background');
      }
      
      // Also reset number boxes (in case they were highlighted on page 15)
      const numberBox1 = document.getElementById('page16-number-box-1');
      const numberBox2 = document.getElementById('page16-number-box-2');
      const numberBox3 = document.getElementById('page16-number-box-3');
      
      [numberBox1, numberBox2, numberBox3].forEach((box, index) => {
        if (box) {
          box.style.removeProperty('background-color');
          box.style.removeProperty('background');
          box.style.setProperty('background-color', '#4A5568', 'important');
          console.log(`🔄 [LCMInputController] Reset page16-number-box-${index + 1} to default background`);
        }
      });
    };
    
    // Reset immediately and also after delays to ensure DOM is ready
    resetBoxes();
    setTimeout(resetBoxes, 100);
    setTimeout(resetBoxes, 300);
    setTimeout(resetBoxes, 500);
    setTimeout(resetBoxes, 1000);
    
    // Also listen for page change events to reset when navigating to page 16
    const handlePageChange = (event) => {
      const newPage = event.detail?.page;
      if (newPage === 16) {
        console.log('🔄 [LCMInputController] Page changed to 16, resetting boxes and disabled flag');
        
        // Reset disabled flag
        if (typeof window !== 'undefined') {
          window.lcmInputDisabled = false;
          
          // Re-enable the number pad UI
          const numberPadId = 'page16-number-pad';
          const numberPadElement = document.getElementById(numberPadId) || 
                                  document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                                  document.querySelector(`[id*="${numberPadId}"]`);
          if (numberPadElement) {
            numberPadElement.style.pointerEvents = '';
            numberPadElement.style.opacity = '';
            console.log(`🔄 [LCMInputController] Re-enabled number pad UI for ${numberPadId} on page change`);
          }
        }
        
        setTimeout(resetBoxes, 100);
        setTimeout(resetBoxes, 500);
      }
    };
    
    window.addEventListener('pageChanged', handlePageChange);
    
    return () => {
      window.removeEventListener('pageChanged', handlePageChange);
    };
  }, []);

  // Register global functions for number pad
  React.useEffect(() => {
    window.lcmInput = (number) => {
      if (window.lcmInputDisabled || isCompleteRef.current) {
        console.log('🔒 [LCMInputController] Input disabled or complete, ignoring');
        return;
      }
      console.log(`🔢 [LCMInputController] Number input: ${number}`);
      
      // Get current value from ref to avoid stale closure
      const currentValue = inputValueRef.current;
      const newValue = currentValue + number.toString();
      
      // Update both state and ref immediately
      setInputValue(newValue);
      inputValueRef.current = newValue;
      
      // Update DOM directly to ensure it persists even if component remounts
      const element = document.getElementById(lcmBoxId);
      if (element) {
        element.textContent = newValue;
        element.innerHTML = newValue;
        element.setAttribute('data-lcm-value', newValue);
        void element.offsetHeight; // Force reflow
        console.log(`✅ [LCMInputController] Set LCM box to: "${newValue}"`);
      } else {
        console.warn(`⚠️ [LCMInputController] LCM box element not found: ${lcmBoxId}`);
      }
    };

    window.lcmCheck = () => {
      if (window.lcmInputDisabled || isCompleteRef.current) {
        console.log('🔒 [LCMInputController] Check disabled or complete, ignoring');
        return;
      }
      console.log('🔄 [LCMInputController] Check button clicked');
      // handleCheck will use the current inputValue from state
      handleCheck();
    };

    window.lcmClear = () => {
      if (window.lcmInputDisabled || isCompleteRef.current) {
        console.log('🔒 [LCMInputController] Clear disabled or complete, ignoring');
        return;
      }
      console.log('🔢 [LCMInputController] Clear button clicked');
      
      // Update both state and DOM immediately
      setInputValue('');
      inputValueRef.current = '';
      
      // Update DOM directly
      const element = document.getElementById(lcmBoxId);
      if (element) {
        element.textContent = '';
        element.innerHTML = '';
        element.setAttribute('data-lcm-value', '');
        void element.offsetHeight; // Force reflow
        console.log(`✅ [LCMInputController] Cleared LCM box`);
      }
    };

    window.lcmBackspace = () => {
      if (window.lcmInputDisabled || isCompleteRef.current) {
        console.log('🔒 [LCMInputController] Backspace disabled or complete, ignoring');
        return;
      }
      console.log('🔢 [LCMInputController] Backspace button clicked');
      
      // Get current value from ref
      const currentValue = inputValueRef.current;
      const newValue = currentValue.slice(0, -1);
      
      // Update both state and ref immediately
      setInputValue(newValue);
      inputValueRef.current = newValue;
      
      // Update DOM directly
      const element = document.getElementById(lcmBoxId);
      if (element) {
        element.textContent = newValue;
        element.innerHTML = newValue;
        element.setAttribute('data-lcm-value', newValue);
        void element.offsetHeight; // Force reflow
        console.log(`✅ [LCMInputController] Set LCM box to: "${newValue}"`);
      }
    };

    // Also listen for number pad events
    const handleNumberPadInput = (event) => {
      if (window.lcmInputDisabled || isCompleteRef.current) return;
      
      const { number, action } = event.detail || {};
      
      if (action === 'clear') {
        window.lcmClear();
      } else if (action === 'backspace') {
        window.lcmBackspace();
      } else if (action === 'check') {
        window.lcmCheck();
      } else if (number !== undefined) {
        window.lcmInput(number);
      }
    };

    window.addEventListener('numberPadInput', handleNumberPadInput);

    // Initial setup - activate LCM box
    // Only clear if there's no existing value (preserve value on remount)
    setTimeout(() => {
      const element = document.getElementById(lcmBoxId);
      const existingValue = element?.getAttribute('data-lcm-value') || element?.textContent?.trim() || '';
      
      setLCMBoxActive(true);
      
      // Only clear if there's no existing value, otherwise restore it
      if (!existingValue || existingValue === '') {
        updateLCMBox('');
        setInputValue('');
        inputValueRef.current = '';
      } else {
        // Restore existing value
        setInputValue(existingValue);
        inputValueRef.current = existingValue;
        updateLCMBox(existingValue);
        console.log(`🔄 [LCMInputController] Restored existing LCM value: "${existingValue}"`);
      }
    }, 500);

    return () => {
      window.removeEventListener('numberPadInput', handleNumberPadInput);
      // Clean up global functions when component unmounts to prevent state sharing between pages
      delete window.lcmInput;
      delete window.lcmCheck;
      delete window.lcmClear;
      delete window.lcmBackspace;
      console.log(`🧹 [LCMInputController] Cleaned up global functions for ${pageId}`);
    };
  }, [lcmBoxId, setLCMBoxActive, handleCheck, pageId]); // Added pageId to deps

  return null; // This component has no visual representation
});

// Export component
window.LCMInputController = LCMInputController;

console.log('✅ LCM Input Controller component loaded successfully');

