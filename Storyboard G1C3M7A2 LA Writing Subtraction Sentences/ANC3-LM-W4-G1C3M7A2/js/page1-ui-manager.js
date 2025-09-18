/**
 * Page 1 UI Manager
 * 
 * This module handles all UI updates for page 1 based on the store state.
 * It subscribes to the page1Store and updates DOM elements accordingly.
 */

const Page1UIManager = (() => {
  let unsubscribe = null;
  let isInitialized = false;

  // DOM element selectors
  const SELECTORS = {
    checkButton: '[data-element-name="check-button"]',
    tapAnimationPage1: '[data-element-name="tap-animation-page1"]',
    tapAnimationNextPage1: '[data-element-name="tap-animation-next-page1"]',
    nextButton: '[data-element-name="next-button"]',
    prevButton: '[data-element-name="previous-button"]',
    feedbackPage1: '[data-element-name="feedback-page1"]',
    cars: '[data-element-name^="car-"]:not([data-element-name*="cross"])',
    carCrosses: '[data-element-name$="-cross"]'
  };

  // CSS classes and styles
  const STYLES = {
    pulsating: {
      animation: 'pulse 2s infinite',
      boxShadow: '0 0 20px rgba(255, 171, 64, 0.8), 0 0 40px rgba(255, 171, 64, 0.6)',
      filter: 'brightness(1.2)'
    },
    disabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      pointerEvents: 'none'
    },
    enabled: {
      opacity: '1',
      cursor: 'pointer',
      pointerEvents: 'auto'
    },
    hidden: {
      display: 'none'
    },
    visible: {
      display: 'block'
    },
    flexVisible: {
      display: 'flex'
    }
  };

  // Apply styles to element
  const applyStyles = (element, styles) => {
    if (!element) return;
    
    Object.entries(styles).forEach(([property, value]) => {
      if (property === 'animation' && value === '') {
        element.style.removeProperty('animation');
      } else {
        element.style[property] = value;
      }
    });
  };

  // Remove styles from element
  const removeStyles = (element, properties) => {
    if (!element) return;
    
    properties.forEach(property => {
      element.style.removeProperty(property);
    });
  };

  // Update check button based on state
  const updateCheckButton = (state) => {
    const checkButton = document.querySelector(SELECTORS.checkButton);
    if (!checkButton) return;

    console.log('🔄 [Page1UI] Updating check button:', {
      pulsating: state.checkButtonPulsating,
      disabled: state.checkButtonDisabled
    });

    if (state.checkButtonDisabled) {
      // Disabled state
      applyStyles(checkButton, STYLES.disabled);
      checkButton.disabled = true;
      
      // Remove pulsating animation
      removeStyles(checkButton, ['animation', 'boxShadow', 'filter']);
      checkButton.classList.remove('pulsating');
      
      // Set success color if page is complete
      if (state.page1Complete) {
        checkButton.style.backgroundColor = '#4CAF50';
        checkButton.style.border = '3px solid #2E7D32';
      }
    } else {
      // Enabled state
      applyStyles(checkButton, STYLES.enabled);
      checkButton.disabled = false;
      
      if (state.checkButtonPulsating) {
        // Add pulsating animation
        applyStyles(checkButton, STYLES.pulsating);
        checkButton.classList.add('pulsating');
      } else {
        // Remove pulsating animation
        removeStyles(checkButton, ['animation', 'boxShadow', 'filter']);
        checkButton.classList.remove('pulsating');
      }
    }
  };

  // Update tap animations based on state
  const updateTapAnimations = (state) => {
    const tapAnimationPage1 = document.querySelector(SELECTORS.tapAnimationPage1);
    const tapAnimationNextPage1 = document.querySelector(SELECTORS.tapAnimationNextPage1);

    console.log('🔄 [Page1UI] Updating tap animations:', {
      page1Visible: state.tapAnimationPage1Visible,
      nextPage1Hidden: state.tapAnimationNextPage1Hidden
    });

    if (tapAnimationPage1) {
      applyStyles(tapAnimationPage1, 
        state.tapAnimationPage1Visible ? STYLES.visible : STYLES.hidden
      );
    }

    if (tapAnimationNextPage1) {
      applyStyles(tapAnimationNextPage1, 
        state.tapAnimationNextPage1Hidden ? STYLES.hidden : STYLES.visible
      );
    }
  };

  // Update next button based on state
  const updateNextButton = (state) => {
    const nextButton = document.querySelector(SELECTORS.nextButton);
    if (!nextButton) return;

    console.log('🔄 [Page1UI] Updating next button:', {
      enabled: state.nextButtonEnabled,
      pulsating: state.nextButtonPulsating
    });

    if (state.nextButtonEnabled) {
      // Enabled state
      applyStyles(nextButton, STYLES.enabled);
      nextButton.disabled = false;
      
      // Override the click handler to ensure navigation works
      nextButton.onclick = () => {
        console.log('🔄 [Next Button] Click handler called from UI Manager');
        
        // Double-check completion status
        const currentState = window.page1Store ? window.page1Store.getState() : null;
        const isCompleted = currentState ? currentState.page1Complete : (window.page1complete || false);
        
        // Always allow navigation - next button is always enabled
        console.log('🔄 [Next Button] Navigating to page 2 (always allowed)');
        
        console.log('✅ [Next Button] Page completed, navigating to page 2');
        
        // Play sound
        if (typeof window.playCarClickSound === 'function') {
          window.playCarClickSound('next');
        }
        
        // Navigate to page 2 with multiple fallbacks
        if (typeof window.changePageAndNotify === 'function') {
          console.log('🔄 [Next Button] Using changePageAndNotify');
          window.changePageAndNotify(2);
        } else if (typeof window.navigateToPage === 'function') {
          console.log('🔄 [Next Button] Using navigateToPage');
          window.navigateToPage(2);
        } else {
          console.log('🔄 [Next Button] Using event dispatch fallback');
          window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
        }
      };
      
      if (state.nextButtonPulsating) {
        // Add pulsating animation
        applyStyles(nextButton, STYLES.pulsating);
        nextButton.classList.add('pulsating');
      }
    } else {
      // Disabled state
      applyStyles(nextButton, STYLES.disabled);
      nextButton.disabled = true;
      
      // Remove click handler when disabled
      nextButton.onclick = () => {
        console.log('🚫 [Next Button] Click blocked - button disabled');
      };
      
      // Remove pulsating animation
      removeStyles(nextButton, ['animation', 'boxShadow', 'filter']);
      nextButton.classList.remove('pulsating');
    }
  };

  // Update previous button based on state
  const updatePrevButton = (state) => {
    const prevButton = document.querySelector(SELECTORS.prevButton);
    if (!prevButton) return;

    console.log('🔄 [Page1UI] Updating prev button:', {
      disabled: state.prevButtonDisabled
    });

    if (state.prevButtonDisabled) {
      applyStyles(prevButton, STYLES.disabled);
      prevButton.disabled = true;
    } else {
      applyStyles(prevButton, STYLES.enabled);
      prevButton.disabled = false;
    }
  };

  // Update car clickability based on state (guided demo: always disabled)
  const updateCarsClickability = (state) => {
    const cars = document.querySelectorAll(SELECTORS.cars);
    
    console.log('🔄 [Page1UI] Updating cars clickability (guided demo - always disabled):', {
      carCount: cars.length
    });

    // For guided demo: Page 1 cars are never clickable
    cars.forEach(car => {
      applyStyles(car, STYLES.disabled);
      car.style.cursor = 'default';
      car.style.pointerEvents = 'none';
    });
  };

  // Restore individual car states (crossed/uncrossed) based on guided demo logic
  const restoreCarStates = (state) => {
    console.log('🔄 [Page1UI] Restoring car states for guided demo');

    // Get current question info for guided demo
    const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
      ? window.currentQuestionIndex : 0;
    const currentQuestion = typeof window !== 'undefined' && window.QUESTIONS && window.QUESTIONS[currentIndex] 
      ? window.QUESTIONS[currentIndex] : null;
    
    if (!currentQuestion) {
      console.log('🔄 [Page1UI] No current question found, using defaults');
      return;
    }
    
    const carCount = currentQuestion.minuend;
    const subtrahend = currentQuestion.subtrahend;
    
    console.log('🔄 [Page1UI] Guided demo - auto-crossing cars:', {
      carCount,
      subtrahend,
      carsToCross: `${carCount - subtrahend + 1} to ${carCount}`
    });

    // Get all car numbers by finding car elements
    const carElements = document.querySelectorAll(SELECTORS.cars);
    
    carElements.forEach(carElement => {
      const elementName = carElement.getAttribute('data-element-name');
      const carMatch = elementName.match(/car-(\d+)/);
      
      if (carMatch) {
        const carNumber = parseInt(carMatch[1]);
        const crossElement = document.querySelector(`[data-element-name="car-${carNumber}-cross"]`);
        
        if (crossElement) {
          // For guided demo: automatically cross the last 'subtrahend' number of cars
          const shouldBeCrossed = carNumber > (carCount - subtrahend);
          
          if (shouldBeCrossed) {
            // Car should be crossed out (guided demo)
            crossElement.style.display = 'flex';
            carElement.style.opacity = '0.3';
            console.log(`🚗❌ [Page1UI] Car ${carNumber} auto-crossed for guided demo`);
          } else {
            // Car should not be crossed out
            crossElement.style.display = 'none';
            carElement.style.opacity = '1';
            console.log(`🚗✅ [Page1UI] Car ${carNumber} not crossed`);
          }
        }
      }
    });
  };

  // Update feedback display based on state
  const updateFeedback = (state) => {
    const feedbackElement = document.querySelector(SELECTORS.feedbackPage1);
    if (!feedbackElement) return;

    console.log('🔄 [Page1UI] Updating feedback:', {
      visible: state.feedbackVisible,
      text: state.feedbackText,
      type: state.feedbackType
    });

    if (state.feedbackVisible && state.feedbackText) {
      feedbackElement.innerHTML = state.feedbackText;
      applyStyles(feedbackElement, STYLES.flexVisible);
      
      // Apply feedback type styling
      switch (state.feedbackType) {
        case 'success':
          feedbackElement.style.backgroundColor = '#4CAF50';
          feedbackElement.style.border = '3px solid #2E7D32';
          feedbackElement.style.color = '#ffffff';
          break;
        case 'error':
          feedbackElement.style.backgroundColor = '#F44336';
          feedbackElement.style.border = '3px solid #C62828';
          feedbackElement.style.color = '#ffffff';
          break;
        default:
          feedbackElement.style.backgroundColor = 'transparent';
          feedbackElement.style.border = '3px solid transparent';
          feedbackElement.style.color = '#ffffff';
      }
    } else {
      applyStyles(feedbackElement, STYLES.hidden);
      feedbackElement.innerHTML = '';
    }
  };

  // Update instruction header based on completion state
  const updateInstructionHeader = (state) => {
    const instructionElement = document.querySelector('[data-element-name="instruction-header"]');
    if (!instructionElement) return;

    console.log('🔄 [Page1UI] Updating instruction header, page1Complete:', state.page1Complete);

    if (state.page1Complete) {
      // Page completed - show "Tap Next to continue"
      const completedText = typeof i18n !== 'undefined' ? 
        i18n.t('subtraction.page1.instructionHeaderCompleted') : 
        'Tap Next to continue';
      instructionElement.innerHTML = completedText;
      console.log('✅ [Page1UI] Instruction header updated to completed state');
    } else {
      // Page not completed - show default instruction
      const defaultText = typeof i18n !== 'undefined' ? 
        i18n.t('subtraction.page1.instructionHeader') : 
        'Tap cars to remove, then tap CHECK.';
      instructionElement.innerHTML = defaultText;
      console.log('🔄 [Page1UI] Instruction header updated to default state');
    }
  };

  // Update all UI elements based on current state
  const updateUI = (state) => {
    console.log('🔄 [Page1UI] Updating all UI elements with state:', state);
    
    updateCheckButton(state);
    updateTapAnimations(state);
    updateNextButton(state);
    updatePrevButton(state);
    updateCarsClickability(state);
    restoreCarStates(state);
    updateFeedback(state);
    updateInstructionHeader(state);
  };

  // Initialize the UI manager
  const initialize = () => {
    if (isInitialized) {
      console.warn('⚠️ [Page1UI] Already initialized');
      return;
    }

    if (typeof window.page1Store === 'undefined') {
      console.error('❌ [Page1UI] page1Store not available');
      return;
    }

    console.log('🚀 [Page1UI] Initializing UI Manager');

    // Subscribe to store changes
    unsubscribe = window.page1Store.subscribe((state) => {
      updateUI(state);
    });

    // Initial UI update
    updateUI(window.page1Store.getState());

    isInitialized = true;
    console.log('✅ [Page1UI] UI Manager initialized');
  };

  // Cleanup function
  const cleanup = () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    isInitialized = false;
    console.log('🧹 [Page1UI] UI Manager cleaned up');
  };

  // Force UI update (useful for debugging or manual refresh)
  const forceUpdate = () => {
    if (typeof window.page1Store !== 'undefined') {
      updateUI(window.page1Store.getState());
      console.log('🔄 [Page1UI] Forced UI update');
    }
  };

  // Public API
  return {
    initialize,
    cleanup,
    forceUpdate,
    updateUI
  };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.Page1UIManager = Page1UIManager;
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Small delay to ensure other scripts are loaded
      setTimeout(() => Page1UIManager.initialize(), 100);
    });
  } else {
    // DOM is already ready
    setTimeout(() => Page1UIManager.initialize(), 100);
  }
  
  console.log('✅ Page 1 UI Manager loaded');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Page1UIManager;
}
