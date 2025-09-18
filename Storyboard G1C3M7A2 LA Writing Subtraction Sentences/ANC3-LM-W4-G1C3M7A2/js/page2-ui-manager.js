/**
 * Page 2 UI Manager
 * 
 * Manages DOM updates for Page 2 based on page2Store state changes.
 * Handles step visibility, button states, animations, and number pad state.
 */

const Page2UIManager = (() => {
  let isInitialized = false;
  let unsubscribe = null;

  // DOM element selectors
  const SELECTORS = {
    step1: '[data-element-name="step1-completed"]',
    step2: '[data-element-name="step2-instruction"]',
    step3: '[data-element-name="step3-page2"]',
    step4: '[data-element-name="step4-page2"]',
    step5: '[data-element-name="step5-page2"]',
    instructionHeader: '[data-element-name="instruction-box-page2"]',
    nextButton: '[data-element-name="next-button-page2"]',
    numberPadPanel: '[data-element-name="number-pad-panel-page2"]',
    answerContainer: '[data-element-name="answer-container-page2"]',
    tapAnimation1: '[data-element-name="tap-animation-page2-1"]',
    tapAnimation2: '[data-element-name="tap-animation-page2-2"]',
    hintText: '[data-element-name="hint-text-page2"]'
  };

  // CSS classes and styles
  const STYLES = {
    visible: {
      display: 'block',
      opacity: '1'
    },
    hidden: {
      display: 'none',
      opacity: '0'
    },
    enabled: {
      opacity: '1',
      cursor: 'pointer',
      pointerEvents: 'auto'
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none'
    },
    pulsating: {
      animation: 'nextButtonPulse 1.5s ease-in-out infinite',
      boxShadow: '0 0 20px rgba(255, 171, 64, 0.8), 0 0 40px rgba(255, 171, 64, 0.6)',
      filter: 'brightness(1.2)'
    }
  };

  // Helper function to apply styles to an element
  const applyStyles = (element, styles) => {
    if (!element || !styles) return;
    Object.assign(element.style, styles);
  };

  // Helper function to remove styles from an element
  const removeStyles = (element, styleKeys) => {
    if (!element || !styleKeys) return;
    styleKeys.forEach(key => {
      element.style.removeProperty(key);
    });
  };

  // Update step visibility based on state
  const updateStepVisibility = (state) => {
    const elements = {
      step1: document.querySelector(SELECTORS.step1),
      step2: document.querySelector(SELECTORS.step2),
      step3: document.querySelector(SELECTORS.step3),
      step4: document.querySelector(SELECTORS.step4),
      step5: document.querySelector(SELECTORS.step5),
      hint: document.querySelector(SELECTORS.hintText)
    };

    console.log('🔄 [Page2UI] Updating step visibility:', {
      step1: state.step1Visible,
      step2: state.step2Visible,
      step3: state.step3Visible,
      step4: state.step4Visible,
      step5: state.step5Visible
    });

    // Update step 1
    if (elements.step1) {
      applyStyles(elements.step1, state.step1Visible ? STYLES.visible : STYLES.hidden);
    }

    // Update step 2
    if (elements.step2) {
      applyStyles(elements.step2, state.step2Visible ? STYLES.visible : STYLES.hidden);
    }

    // Update step 3
    if (elements.step3) {
      applyStyles(elements.step3, state.step3Visible ? STYLES.visible : STYLES.hidden);
    }

    // Update step 4 (single element with multiline content)
    if (elements.step4) {
      applyStyles(elements.step4, state.step4Visible ? STYLES.visible : STYLES.hidden);
    }

    // Update step 5 (single element with multiline content)
    if (elements.step5) {
      applyStyles(elements.step5, state.step5Visible ? STYLES.visible : STYLES.hidden);
    }

    // Update hint text (hide when page is completed)
    if (elements.hint) {
      applyStyles(elements.hint, state.page2Complete ? STYLES.hidden : STYLES.visible);
    }
  };

  // Update instruction header text
  const updateInstructionHeader = (state) => {
    const instructionElement = document.querySelector(SELECTORS.instructionHeader);
    if (!instructionElement) return;

    console.log('🔄 [Page2UI] Updating instruction header:', state.instructionHeaderText);
    instructionElement.innerHTML = state.instructionHeaderText;
  };

  // Update next button state
  const updateNextButton = (state) => {
    const nextButton = document.querySelector(SELECTORS.nextButton);
    if (!nextButton) return;

    // Verify we're targeting the correct button
    const buttonName = nextButton.getAttribute('data-element-name');
    console.log('🔍 [Page2UI] Found button with name:', buttonName);
    
    if (buttonName !== 'next-button-page2') {
      console.error('❌ [Page2UI] Wrong button found! Expected "next-button-page2", got:', buttonName);
      return;
    }

    console.log('🔄 [Page2UI] Updating next button:', {
      enabled: state.nextButtonEnabled,
      pulsating: state.nextButtonPulsating
    });

    if (state.nextButtonEnabled) {
      // Enable button
      nextButton.disabled = false;
      applyStyles(nextButton, STYLES.enabled);
      
      // Override the click handler to ensure navigation works
      nextButton.onclick = () => {
        console.log('🔄 [Page2UI] Next button click handler called from UI Manager');
        
        // CRITICAL: Only handle clicks if we're actually on Page 2
        const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;
        console.log('🔍 [Page2UI] Current page:', currentPage);
        
        if (currentPage !== 2) {
          console.log('🚫 [Page2UI] Not on Page 2, ignoring click (current page:', currentPage, ')');
          return;
        }
        
        // Double-check completion status
        const currentState = window.page2Store ? window.page2Store.getState() : null;
        const isCompleted = currentState ? currentState.page2Complete : (window.page2complete || false);
        
        if (!isCompleted) {
          console.log('🚫 [Page2UI] Navigation blocked - page not completed');
          return;
        }
        
        console.log('✅ [Page2UI] Page completed, advancing to next question');
        
        // Play sound
        if (typeof window.playCarClickSound === 'function') {
          window.playCarClickSound('next');
        }
        
        // Advance to next question and navigate to page 1
        if (typeof window.advanceToNextQuestion === 'function') {
          window.advanceToNextQuestion().then((newQuestionIndex) => {
            console.log('➡️ [Page2UI] Advanced to question index:', newQuestionIndex);
            
            // Navigate back to page 1 with new question
            setTimeout(() => {
              if (typeof window.changePageAndNotify === 'function') {
                console.log('🔄 [Page2UI] Using changePageAndNotify');
                window.changePageAndNotify(1);
              } else if (typeof window.navigateToPage === 'function') {
                console.log('🔄 [Page2UI] Using navigateToPage');
                window.navigateToPage(1);
              } else {
                console.log('🔄 [Page2UI] Using event dispatch fallback');
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
              }
              
              // CRITICAL: Trigger complete UI refresh after app reset
              setTimeout(() => {
                console.log('🔄 [Page2UI] Triggering complete UI refresh after app reset');
                
                // Force UI managers to update with new question context
                if (window.Page1UIManager && typeof window.Page1UIManager.forceUpdate === 'function') {
                  console.log('🔄 [Page2UI] Force updating Page 1 UI Manager');
                  window.Page1UIManager.forceUpdate();
                }
                
                // Update question-dependent elements (cars, text, etc.)
                if (typeof window.updateQuestionDependentElements === 'function') {
                  console.log('🔄 [Page2UI] Calling updateQuestionDependentElements after app reset');
                  window.updateQuestionDependentElements();
                } else {
                  console.error('❌ [Page2UI] updateQuestionDependentElements not available after navigation');
                }
                
                // Force update all UI elements that depend on question context
                setTimeout(() => {
                  if (typeof window.updateAnswerContainerPage2 === 'function') {
                    window.updateAnswerContainerPage2();
                  }
                  
                  // Trigger React re-render if possible
                  if (typeof window.updatePageState === 'function') {
                    window.updatePageState({ appUpdateTrigger: Date.now() });
                  }
                  
                  console.log('✅ [Page2UI] Complete UI refresh completed');
                }, 100);
              }, 200);
            }, 300);
          }).catch((error) => {
            console.error('❌ [Page2UI] Error advancing to next question:', error);
          });
        } else {
          console.error('❌ [Page2UI] advanceToNextQuestion function not available');
          
          // Fallback: Try to wait and retry, or use direct navigation
          console.log('🔄 [Page2UI] Attempting fallback navigation...');
          
          // Try to wait for the function to become available
          let retryCount = 0;
          const maxRetries = 10;
          const retryInterval = 100;
          
          const retryAdvance = () => {
            retryCount++;
            if (typeof window.advanceToNextQuestion === 'function') {
              console.log(`✅ [Page2UI] advanceToNextQuestion now available (retry ${retryCount})`);
              window.advanceToNextQuestion().then((newQuestionIndex) => {
                console.log('➡️ [Page2UI] Advanced to question index:', newQuestionIndex);
                setTimeout(() => {
                  if (typeof window.changePageAndNotify === 'function') {
                    window.changePageAndNotify(1);
                  } else if (typeof window.navigateToPage === 'function') {
                    window.navigateToPage(1);
                  }
                }, 300);
              });
            } else if (retryCount < maxRetries) {
              console.log(`⏳ [Page2UI] Retry ${retryCount}/${maxRetries} - waiting for advanceToNextQuestion...`);
              setTimeout(retryAdvance, retryInterval);
            } else {
              console.error('❌ [Page2UI] Max retries reached - using basic navigation fallback');
              
              // Try to manually advance the question as a last resort
              console.log('🔄 [Page2UI] Attempting manual question advancement...');
              
              if (typeof window !== 'undefined' && window.QUESTIONS && typeof window.currentQuestionIndex !== 'undefined') {
                const totalQuestions = window.QUESTIONS.length;
                const currentIndex = window.currentQuestionIndex || 0;
                
                console.log('📊 [Page2UI] Current question:', currentIndex + 1, 'of', totalQuestions);
                
                let newIndex;
                if (currentIndex < totalQuestions - 1) {
                  newIndex = currentIndex + 1;
                  console.log('➡️ [Page2UI] Manually advanced to question', newIndex + 1);
                } else {
                  newIndex = 0;
                  console.log('🔄 [Page2UI] Manually starting over from question 1');
                }
                
                // Update the question index
                window.currentQuestionIndex = newIndex;
                
                // Reset page states if functions are available
                if (typeof window.page1Store !== 'undefined') {
                  window.page1Store.resetForNewQuestion();
                  const newQuestion = window.QUESTIONS[newIndex];
                  if (newQuestion) {
                    window.page1Store.updateQuestionContext(newIndex, newQuestion.subtrahend);
                  }
                  console.log('✅ [Page2UI] Page 1 store reset for new question');
                }
                
                if (typeof window.page2Store !== 'undefined') {
                  window.page2Store.resetForNewQuestion();
                  const newQuestion = window.QUESTIONS[newIndex];
                  if (newQuestion) {
                    const expectedAnswer = newQuestion.minuend - newQuestion.subtrahend;
                    window.page2Store.updateQuestionContext(newIndex, expectedAnswer);
                  }
                  console.log('✅ [Page2UI] Page 2 store reset for new question');
                }
                
                // Update React state if available
                if (typeof window.updatePageState === 'function') {
                  window.updatePageState({ currentQuestionIndex: newIndex });
                  console.log('✅ [Page2UI] React state updated with new question index');
                }
                
                // Update question-dependent UI elements
                console.log('🔍 [Page2UI] Checking updateQuestionDependentElements:', typeof window.updateQuestionDependentElements);
                if (typeof window.updateQuestionDependentElements === 'function') {
                  console.log('🔄 [Page2UI] Calling updateQuestionDependentElements...');
                  setTimeout(() => {
                    window.updateQuestionDependentElements();
                    console.log('✅ [Page2UI] Question-dependent UI elements updated');
                  }, 150);
                } else if (typeof window.updateAnswerContainerPage2 === 'function') {
                  console.log('🔄 [Page2UI] Using fallback - updateAnswerContainerPage2');
                  // Fallback: at least update the answer container
                  setTimeout(() => {
                    window.updateAnswerContainerPage2();
                    console.log('✅ [Page2UI] Answer container updated as fallback');
                  }, 150);
                } else {
                  console.error('❌ [Page2UI] Neither updateQuestionDependentElements nor updateAnswerContainerPage2 available');
                }
                
                console.log('✅ [Page2UI] Manual question advancement completed');
              } else {
                console.error('❌ [Page2UI] Cannot manually advance - QUESTIONS or currentQuestionIndex not available');
              }
              
              // Navigate to page 1
              if (typeof window.changePageAndNotify === 'function') {
                window.changePageAndNotify(1);
              } else if (typeof window.navigateToPage === 'function') {
                window.navigateToPage(1);
              }
              
              // CRITICAL: Trigger complete UI refresh after fallback app reset
              setTimeout(() => {
                console.log('🔄 [Page2UI] Triggering complete UI refresh after fallback app reset');
                
                // Force UI managers to update with new question context
                if (window.Page1UIManager && typeof window.Page1UIManager.forceUpdate === 'function') {
                  console.log('🔄 [Page2UI] Force updating Page 1 UI Manager (fallback)');
                  window.Page1UIManager.forceUpdate();
                }
                
                // Update question-dependent elements (cars, text, etc.)
                if (typeof window.updateQuestionDependentElements === 'function') {
                  console.log('🔄 [Page2UI] Calling updateQuestionDependentElements after fallback app reset');
                  window.updateQuestionDependentElements();
                } else {
                  console.error('❌ [Page2UI] updateQuestionDependentElements not available after fallback navigation');
                }
                
                // Force update all UI elements that depend on question context
                setTimeout(() => {
                  if (typeof window.updateAnswerContainerPage2 === 'function') {
                    window.updateAnswerContainerPage2();
                  }
                  
                  // Trigger React re-render if possible
                  if (typeof window.updatePageState === 'function') {
                    window.updatePageState({ appUpdateTrigger: Date.now() });
                  }
                  
                  console.log('✅ [Page2UI] Complete UI refresh completed (fallback)');
                }, 100);
              }, 400);
            }
          };
          
          setTimeout(retryAdvance, retryInterval);
        }
      };
      
      if (state.nextButtonPulsating) {
        // Add pulsating animation
        nextButton.classList.add('pulsating');
        nextButton.classList.add('math-app-pulse-animation');
        applyStyles(nextButton, STYLES.pulsating);
        
        // Update button text
        if (typeof window !== 'undefined' && window.getNextButtonText) {
          nextButton.textContent = window.getNextButtonText();
        }
        
        console.log('✨ [Page2UI] Next button enabled and pulsating');
      } else {
        // Remove pulsating animation
        nextButton.classList.remove('pulsating');
        nextButton.classList.remove('math-app-pulse-animation');
        removeStyles(nextButton, ['animation', 'boxShadow', 'filter']);
      }
    } else {
      // Disable button
      nextButton.disabled = true;
      applyStyles(nextButton, STYLES.disabled);
      nextButton.classList.remove('pulsating');
      nextButton.classList.remove('math-app-pulse-animation');
      removeStyles(nextButton, ['animation', 'boxShadow', 'filter']);
    }
  };

  // Update number pad state
  const updateNumberPad = (state) => {
    const numberPadPanel = document.querySelector(SELECTORS.numberPadPanel);
    if (!numberPadPanel) return;

    console.log('🔄 [Page2UI] Updating number pad:', {
      enabled: state.numberPadEnabled
    });

    // Get all buttons and inputs in the number pad
    const allButtons = numberPadPanel.querySelectorAll('button');
    const allInputs = numberPadPanel.querySelectorAll('input, textarea');

    if (state.numberPadEnabled) {
      // Enable number pad
      allButtons.forEach(button => {
        button.disabled = false;
        applyStyles(button, STYLES.enabled);
      });
      
      allInputs.forEach(input => {
        input.disabled = false;
        applyStyles(input, STYLES.enabled);
      });
      
      console.log('✅ [Page2UI] Number pad enabled');
    } else {
      // Disable number pad
      allButtons.forEach(button => {
        button.disabled = true;
        applyStyles(button, STYLES.disabled);
      });
      
      allInputs.forEach(input => {
        input.disabled = true;
        applyStyles(input, STYLES.disabled);
      });
      
      console.log('🚫 [Page2UI] Number pad disabled');
    }
  };

  // Update tap animations
  const updateTapAnimations = (state) => {
    const tapAnimation1 = document.querySelector(SELECTORS.tapAnimation1);
    const tapAnimation2 = document.querySelector(SELECTORS.tapAnimation2);

    console.log('🔄 [Page2UI] Updating tap animations:', {
      animation1: state.tapAnimationPage21Visible,
      animation2: state.tapAnimationPage22Visible
    });

    if (tapAnimation1) {
      applyStyles(tapAnimation1, state.tapAnimationPage21Visible ? STYLES.visible : STYLES.hidden);
    }

    if (tapAnimation2) {
      applyStyles(tapAnimation2, state.tapAnimationPage22Visible ? STYLES.visible : STYLES.hidden);
    }
  };

  // Update answer tile color
  const updateAnswerTileColor = (state) => {
    const answerContainer = document.querySelector(SELECTORS.answerContainer);
    if (!answerContainer) return;

    const tileSpan = answerContainer.querySelector('span');
    if (!tileSpan) return;

    console.log('🔄 [Page2UI] Updating answer tile color:', state.answerTileColor);

    switch (state.answerTileColor) {
      case 'green':
        tileSpan.style.backgroundColor = '#4CAF50';
        tileSpan.style.color = '#ffffff';
        tileSpan.style.border = '3px solid #2E7D32';
        console.log('✅ [Page2UI] Answer tile colored green (correct)');
        break;
      case 'red':
        tileSpan.style.backgroundColor = '#F44336';
        tileSpan.style.color = '#ffffff';
        tileSpan.style.border = '3px solid #C62828';
        console.log('❌ [Page2UI] Answer tile colored red (incorrect)');
        break;
      case 'default':
      default:
        tileSpan.style.backgroundColor = '#FFFFFF';
        tileSpan.style.color = '#000000';
        tileSpan.style.border = '3px solid #2196F3';
        console.log('🔄 [Page2UI] Answer tile reset to default (blue border)');
        break;
    }
  };

  // Update number pad text area
  const updateNumberPadTextArea = (state) => {
    const numberPadPanel = document.querySelector(SELECTORS.numberPadPanel);
    if (!numberPadPanel) return;

    // Find the text area within the number pad
    const textArea = numberPadPanel.querySelector('.numberpad-text-area');
    if (!textArea) return;

    console.log('🔄 [Page2UI] Updating number pad text area:', {
      text: state.numberPadTextAreaText,
      type: state.numberPadTextAreaType
    });

    // Update text content
    textArea.textContent = state.numberPadTextAreaText;

    // Update text color based on type
    switch (state.numberPadTextAreaType) {
      case 'correct':
        textArea.style.color = '#4CAF50'; // Green
        console.log('✅ [Page2UI] Number pad text area - correct (green)');
        break;
      case 'incorrect':
        textArea.style.color = '#F44336'; // Red
        console.log('❌ [Page2UI] Number pad text area - incorrect (red)');
        break;
      case 'hint':
        textArea.style.color = '#ffffff'; // White
        console.log('💡 [Page2UI] Number pad text area - hint (white)');
        break;
      case 'default':
      default:
        textArea.style.color = '#ffffff'; // White
        console.log('🔄 [Page2UI] Number pad text area - default (white)');
        break;
    }
  };

  // Update input tile colors based on state
  const updateInputTileColors = (state) => {
    console.log('🔄 [Page2UI] Updating input tile colors:', {
      minuendTileColor: state.minuendTileColor,
      subtrahendTileColor: state.subtrahendTileColor,
      answerTilePageColor: state.answerTilePageColor
    });

    // Helper function to apply tile color
    const applyTileColor = (tile, color) => {
      if (!tile) return;
      
      switch (color) {
        case 'green':
          tile.style.backgroundColor = '#4CAF50';
          tile.style.color = '#ffffff';
          tile.style.border = '3px solid #2E7D32';
          break;
        case 'red':
          tile.style.backgroundColor = '#F44336';
          tile.style.color = '#ffffff';
          tile.style.border = '3px solid #C62828';
          break;
        case 'default':
        default:
          tile.style.backgroundColor = '#FFFFFF';
          tile.style.color = '#000000';
          tile.style.border = '3px solid #2196F3';
          break;
      }
    };

    // Helper function to apply pulsating effect
    const applyPulsatingEffect = (tile, shouldPulsate) => {
      if (!tile) return;
      
      if (shouldPulsate) {
        tile.style.animation = 'pulse 1.5s ease-in-out infinite';
        tile.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.8), 0 0 40px rgba(33, 150, 243, 0.6)';
        tile.style.filter = 'brightness(1.1)';
        tile.classList.add('pulsating');
        console.log('✨ [Page2UI] Applied pulsating effect to tile');
      } else {
        tile.style.animation = '';
        tile.style.boxShadow = '';
        tile.style.filter = '';
        tile.classList.remove('pulsating');
        console.log('🛑 [Page2UI] Removed pulsating effect from tile');
      }
    };

    console.log(`🔄 [Page2UI] Updating input tile colors with state:`, {
      minuendColor: state.minuendTileColor,
      minuendPulsating: state.minuendTilePulsating,
      subtrahendColor: state.subtrahendTileColor,
      subtrahendPulsating: state.subtrahendTilePulsating,
      answerColor: state.answerTilePageColor,
      answerPulsating: state.answerTilePulsating
    });

    // Update minuend tile
    const minuendTile = document.querySelector('[data-element-name="minuend-tile-page2"]');
    if (minuendTile) {
      applyTileColor(minuendTile, state.minuendTileColor);
      applyPulsatingEffect(minuendTile, state.minuendTilePulsating);
      console.log(`🎨 [Page2UI] Minuend tile found and updated - colored: ${state.minuendTileColor}, pulsating: ${state.minuendTilePulsating}`);
    } else {
      console.warn('⚠️ [Page2UI] Minuend tile not found in DOM');
    }

    // Update subtrahend tile
    const subtrahendTile = document.querySelector('[data-element-name="subtrahend-tile-page2"]');
    if (subtrahendTile) {
      applyTileColor(subtrahendTile, state.subtrahendTileColor);
      applyPulsatingEffect(subtrahendTile, state.subtrahendTilePulsating);
      console.log(`🎨 [Page2UI] Subtrahend tile found and updated - colored: ${state.subtrahendTileColor}, pulsating: ${state.subtrahendTilePulsating}`);
    } else {
      console.warn('⚠️ [Page2UI] Subtrahend tile not found in DOM');
    }

    // Update answer tile
    const answerTile = document.querySelector('[data-element-name="answer-tile-page2"]');
    if (answerTile) {
      applyTileColor(answerTile, state.answerTilePageColor);
      applyPulsatingEffect(answerTile, state.answerTilePulsating);
      console.log(`🎨 [Page2UI] Answer tile found and updated - colored: ${state.answerTilePageColor}, pulsating: ${state.answerTilePulsating}`);
    } else {
      console.warn('⚠️ [Page2UI] Answer tile not found in DOM');
    }
  };

  // Update all UI elements based on current state
  const updateUI = (state) => {
    console.log('🔄 [Page2UI] Updating all UI elements with state:', state);
    
    // CRITICAL: Only update UI if we're on Page 2 or if page detection is unavailable
    const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;
    
    if (currentPage !== null && currentPage !== 2) {
      console.log('🚫 [Page2UI] Not on Page 2, skipping UI update (current page:', currentPage, ')');
      return;
    }
    
    updateStepVisibility(state);
    updateInstructionHeader(state);
    updateNextButton(state);
    updateNumberPad(state);
    updateTapAnimations(state);
    updateAnswerTileColor(state);
    updateNumberPadTextArea(state);
    updateInputTileColors(state);
  };

  // Initialize the UI manager
  const initialize = () => {
    if (isInitialized) {
      console.warn('⚠️ [Page2UI] Already initialized');
      return true;
    }

    if (typeof window.page2Store === 'undefined') {
      console.error('❌ [Page2UI] page2Store not available');
      return false;
    }

    console.log('🚀 [Page2UI] Initializing Page 2 UI Manager');

    try {
      // Subscribe to store changes
      unsubscribe = window.page2Store.subscribe((state) => {
        console.log('🔄 [Page2UI] Store state changed, updating UI');
        updateUI(state);
      });

      // Initial UI update
      updateUI(window.page2Store.getState());

      isInitialized = true;
      console.log('✅ [Page2UI] Page 2 UI Manager initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ [Page2UI] Error during initialization:', error);
      return false;
    }
  };

  // Force initialization (useful for manual setup)
  const forceInitialize = () => {
    console.log('🔧 [Page2UI] Force initializing...');
    isInitialized = false;
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    return initialize();
  };

  // Cleanup function
  const cleanup = () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    isInitialized = false;
    console.log('🧹 [Page2UI] UI Manager cleaned up');
  };

  // Force UI update (useful for debugging or manual refresh)
  const forceUpdate = () => {
    if (typeof window.page2Store !== 'undefined') {
      updateUI(window.page2Store.getState());
      console.log('🔄 [Page2UI] Forced UI update');
    }
  };

  // Public API
  return {
    initialize,
    forceInitialize,
    cleanup,
    forceUpdate,
    updateUI
  };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.Page2UIManager = Page2UIManager;
  
  // Auto-initialize when DOM is ready with retry logic
  const tryInitialize = (attempt = 1, maxAttempts = 10) => {
    if (typeof window.page2Store !== 'undefined') {
      console.log(`✅ [Page2UI] page2Store available, initializing (attempt ${attempt})`);
      Page2UIManager.initialize();
    } else if (attempt < maxAttempts) {
      console.log(`⏳ [Page2UI] page2Store not ready, retrying in ${attempt * 100}ms (attempt ${attempt}/${maxAttempts})`);
      setTimeout(() => tryInitialize(attempt + 1, maxAttempts), attempt * 100);
    } else {
      console.error('❌ [Page2UI] Failed to initialize after maximum attempts - page2Store not available');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Delay initialization to ensure page2Store is loaded
      setTimeout(() => tryInitialize(), 200);
    });
  } else {
    // DOM is already ready
    setTimeout(() => tryInitialize(), 200);
  }
  
  console.log('✅ Page 2 UI Manager available globally');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Page2UIManager;
}
