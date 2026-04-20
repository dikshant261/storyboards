/**
 * Page Configuration 
 * 
 * - Grid positioning and element generation
 * - Page-specific UI element configurations
 * - Question-dependent element updates
 */

// ===== PAGE CONFIGURATION =====
// Page configuration with grid positioning and element generation

// ===== GRID POSITION PAGES =====


const createOptimizedGridPositionPages = () => {
  // Helper function to get current question data (optimized)
  const getCurrentQuestionData = () => {
        const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
          ? window.currentQuestionIndex : 0;
    const currentQuestion = { minuend: 5, subtrahend: 3, missing: 'subtrahend' };
    return { currentIndex, currentQuestion };
  };

  // Helper function for i18n text (optimized)
  const getI18nText = (key, fallback, params = {}) => {
    if (typeof i18n !== 'undefined') {
      const result = i18n.t(key, params);
      console.log(`🌐 getI18nText: key="${key}", result="${result}", fallback="${fallback}"`);
      return result;
    }
    console.log(`🌐 getI18nText: i18n not available, using fallback="${fallback}"`);
    return fallback;
  };

  // Helper function to render KaTeX fractions
  const renderKatexFraction = (numerator, denominator) => {
    if (typeof katex !== 'undefined') {
      try {
        return katex.renderToString(`\\dfrac{${numerator}}{${denominator}}`, {
          throwOnError: false,
          displayMode: false
        });
      } catch (e) {
        console.warn('KaTeX rendering error:', e);
        return `${numerator}/${denominator}`;
      }
    }
    // Fallback if KaTeX not loaded yet
    return `${numerator}/${denominator}`;
  };

  
  // Return optimized GridPositionPages
  const pages = {
    1: [
      // Jump00 image
      {
        name: 'jump00-image',
        type: 'container',
        coordinates: [25, 415, 300, 750],
        zIndex: 'var(--z-content)',
        props: {
          id: 'jump-character',
          backgroundImage: 'url(assets/Jump/Jump00.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
      },

      // Book image
      {
        name: 'book-image',
        type: 'container',
        coordinates: [1425, 300, 1525, 400],
        zIndex: 'var(--z-content)',
            props: {
          backgroundImage: 'url(assets/book1.png)', // Default, will be updated dynamically
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }
      },

      // LeftHover image
      {
        name: 'left-hover-image',
        type: 'container',
        coordinates: [0, 0, 1600, 900],
        zIndex: 'var(--z-content)',
        props: {
          backgroundImage: 'url(assets/LeftHover.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none'
        }
      },

      // Draggable Steps Container (replaces static step components)
      {
        name: 'draggable-steps-game',
        type: 'custom',
        coordinates: [0, 0, 1600, 900],
        zIndex: 'var(--z-content) + 1',
        props: {
          renderKatexFraction: renderKatexFraction,
          textSize: '60gc'
        },
        createOptimized: (props) => {
          return React.createElement(window.DraggableComponents.DroppableStepsContainer, {
            ...props,
            renderKatexFraction: renderKatexFraction,
            textSize: props.textSize || '60gc'
          });
        }
      },

      // RightHover image
      {
        name: 'right-hover-image',
        type: 'container',
        coordinates: [0, 0, 1600, 900],
        zIndex: 'var(--z-content)',
        props: {
          backgroundImage: 'url(assets/RightHover.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          animation: 'floatingHover 3s ease-in-out infinite'
        }
      },

      // Screen-wide overlay container (positioned after game elements to render on top)
      {
        name: 'screen-overlay',
        type: 'container',
        coordinates: [25, 25, 1575, 875],
        zIndex: 500,
        props: {
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 20, 40, 0.8) 50%, rgba(0, 0, 0, 0.85) 100%)',
          backgroundSize: '200% 200%',
          animation: 'overlayGradientShift 10s ease infinite',
          pointerEvents: 'none',
          display: 'none',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5), inset 0 0 50px rgba(50, 50, 100, 0.3)',
          border: '2px solid rgba(100, 100, 150, 0.2)',
          className: 'jazzy-overlay'
        }
      },

      // "Start Over" button (hidden initially)
      {
        name: 'start-over-button',
        type: 'button',
        coordinates: [600, 450, 900, 550],
        zIndex: 600,
        props: {
          text: getI18nText('buttons.startOver', 'Start Over'),
          onClick: () => {
            console.log('🔄 Restarting game...');
            // Reload the page to reset the app
            window.location.reload();
          },
          display: 'none', // Hidden initially
          cursor: 'pointer',
          pulsate: true, // Enable pulsate animation
          frameGap: '8gc', // Three-layer frame gap
          // Three-layer button classes (required for applet button structure)
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          // Match Next button styling
          backgroundColor: '#FF9900',
          color: 'white',
          fontSize: '30gc',
          fontWeight: 'bold',
          borderRadius: '10gc',
          border: '3px solid #000000',
          textAlign: 'center'
        }
      },

      // Tap animation
      {
        name: 'tap-animation',
        type: 'container',
        coordinates: [600, 500, 675, 575],
        zIndex: 700,
            props: {
          backgroundImage: 'url(assets/tap.gif)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          display: 'none'
            }
        },

      // Success message overlay (hidden initially)
      {
        name: 'success-message',
        type: 'textbox',
        coordinates: [300, 25, 1200, 275],
        zIndex: 650,
        props: {
          text: getI18nText('messages.success.bookCollected', '🎉 You have now collected the Book of Eden!'),
          display: 'none', // Hidden initially, shown by JavaScript
          pointerEvents: 'none',
          // Styling for the message with dazzling background
          fontSize: '40gc',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
          backgroundSize: '400% 400%',
          animation: 'dazzlingGradient 3s ease infinite, sparkleGlow 2s ease-in-out infinite',
          padding: '40gc',
          borderRadius: '20gc',
          border: '3px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(102, 126, 234, 0.4), 0 10px 50px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.4)',
          letterSpacing: '1px',
          className: 'success-message-dazzling'
            }
        },

      // Next Question button (Left)
      {
        name: 'next-question-button',
        type: 'button',
        coordinates: [1275, 725, 1575, 825],
        zIndex: 'var(--z-content) + 2',
        props: {
          text: getI18nText('buttons.nextQuestion', 'Next Question'),
          onClick: () => {
            console.log('➡️ Next Question button clicked');
            
            // Increment the question counter
            window.questionCounter = (window.questionCounter || 0) + 1;
            
            // Get total number of questions dynamically
            const totalQuestions = window.StepOrderingGame && typeof window.StepOrderingGame.getTotalQuestions === 'function' 
              ? window.StepOrderingGame.getTotalQuestions() 
              : 15; // Default fallback (we have 15 questions in data.js)
            
            console.log(`📚 Moving to question ${window.questionCounter + 1} of ${totalQuestions}`);
            
            // Check if we have more questions
            if (window.questionCounter < totalQuestions) {
              // Reset the game state for new question
              if (window.StepOrderingGame && typeof window.StepOrderingGame.resetGame === 'function') {
                window.StepOrderingGame.resetGame();
              }
              
              // Update book image for new question
              if (window.StepOrderingGame && typeof window.StepOrderingGame.updateBookImage === 'function') {
                window.StepOrderingGame.updateBookImage();
              }
              
              // Update the step content for new question without reloading
              if (window.StepOrderingGame && typeof window.StepOrderingGame.updateStepContent === 'function') {
                window.StepOrderingGame.updateStepContent();
              }
              
              // Hide the Next Question button and show Check button for new question
              const nextQuestionButton = document.querySelector('[data-element-name="next-question-button"]');
              const checkButton = document.querySelector('[data-element-name="check-button"]');
              const tapAnimation2 = document.querySelector('[data-element-name="tap-animation-2"]');
              
              if (nextQuestionButton) {
                nextQuestionButton.style.display = 'none';
              }
              if (checkButton) {
                checkButton.style.display = 'block';
              }
              if (tapAnimation2) {
                tapAnimation2.style.display = 'block';
              }
              
              // Hide success message and overlay
              const successMessage = document.querySelector('[data-element-name="success-message"]');
              const overlay = document.querySelector('[data-element-name="overlay-container"]');
              
              if (successMessage) {
                successMessage.style.display = 'none';
              }
              if (overlay) {
                overlay.style.display = 'none';
              }
              
            } else {
              console.log('🎉 All questions completed!');
              // Reset question counter
              window.questionCounter = 0;
              // Show final success screen
              if (window.StepOrderingGame && typeof window.StepOrderingGame.showFinalSuccessScreen === 'function') {
                window.StepOrderingGame.showFinalSuccessScreen();
              }
            }
          },
          display: 'none',
          cursor: 'pointer',
          pulsate: true,
          frameGap: '10gc',
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          backgroundColor: '#2196F3',
          color: 'white',
          fontSize: '28gc',
          fontWeight: 'bold',
          borderRadius: '10gc',
          border: 'none',
          textAlign: 'center'
        }
      },

      // Feedback textbox (Center)
      {
        name: 'feedback-textbox',
        type: 'textbox',
        coordinates: [300, 25, 1200, 175],
        zIndex: 'var(--z-content) + 2',
            props: {
          text: getI18nText('messages.feedback.defaultInstruction', 'Arrange the given fractions from smallest to largest.'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          fontSize: '36gc',
          fontWeight: 'normal',
          color: '#000000',
          textAlign: 'center',
          backgroundColor: 'rgba(245, 245, 245, 0.6)',
          padding: '20gc',
          borderRadius: '10gc',
          border: '2px solid #cccccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }
      },

      // Check button (Right)
      {
        name: 'check-button',
        type: 'button',
        coordinates: [1275, 725, 1575, 825],
        zIndex: 'var(--z-content) + 2',
        props: {
          text: getI18nText('buttons.check', 'Check'),
          onClick: () => {
            console.log('✅ Check button clicked');
            // Check if the sequence is correct
            if (window.StepOrderingGame && typeof window.StepOrderingGame.checkSequence === 'function') {
              const isCorrect = window.StepOrderingGame.checkSequence();
              const feedbackElement = document.querySelector('[data-element-name="feedback-textbox"]');
              const checkButton = document.querySelector('[data-element-name="check-button"]') || 
                                 document.querySelector('.check-button-container') ||
                                 document.querySelector('.check-button-element');
              const nextQuestionButton = document.querySelector('[data-element-name="next-question-button"]') || 
                                        document.querySelector('.next-question-button-container') ||
                                        document.querySelector('.next-question-button-element');
              
              console.log('🔍 Debug button elements:', {
                feedbackElement: !!feedbackElement,
                checkButton: !!checkButton,
                nextQuestionButton: !!nextQuestionButton,
                isCorrect: isCorrect
              });
              
              // Debug: Show all available elements with data-element-name
              const allElements = document.querySelectorAll('[data-element-name]');
              console.log('📋 All elements with data-element-name:', 
                Array.from(allElements).map(el => el.getAttribute('data-element-name'))
              );
              
              if (feedbackElement) {
                const currentQuestion = window.StepOrderingGame?.getCurrentQuestion ? 
                  window.StepOrderingGame.getCurrentQuestion() : 
                  window.Question?.(window.questionCounter || 0) || window.Question(0);
                
                if (isCorrect) {
                  if (window.StepOrderingGame?.clearCheckPlacementHints) {
                    window.StepOrderingGame.clearCheckPlacementHints();
                  }
                  feedbackElement.textContent = currentQuestion.correctFeedback;
                  feedbackElement.style.backgroundColor = '#d4edda';
                  feedbackElement.style.color = '#155724';
                  feedbackElement.style.border = '2px solid #c3e6cb';
                  
                  // Hide Check button and tap animation (Next Question button will be shown after animation)
                  if (checkButton) {
                    console.log('🔘 Hiding check button');
                    checkButton.style.display = 'none';
                  } else {
                    console.warn('⚠️ Check button not found');
                  }
                  
                  // Hide tap animation when Check button is hidden
                  const tapAnimation = document.querySelector('[data-element-name="tap-animation-2"]');
                  if (tapAnimation) {
                    console.log('🎬 Hiding tap animation (from Check button onClick)');
                    tapAnimation.style.display = 'none';
                  }

                  if (window.stepOrderingGame?.currentOrder && window.StepOrderingGame?.updateGameOrder) {
                    window.StepOrderingGame.updateGameOrder([...window.stepOrderingGame.currentOrder]);
                  }
              } else {
                  feedbackElement.textContent = currentQuestion.incorrectFeedback;
                  feedbackElement.style.backgroundColor = '#f8d7da';
                  feedbackElement.style.color = '#721c24';
                  feedbackElement.style.border = '2px solid #f5c6cb';
                  if (window.StepOrderingGame?.setCheckPlacementHintsAfterIncorrectCheck) {
                    window.StepOrderingGame.setCheckPlacementHintsAfterIncorrectCheck();
                  }
                  if (typeof window.forceAppUpdate === 'function') {
                    window.forceAppUpdate();
                  }
                }
              }
            } else {
              console.warn('⚠️ StepOrderingGame not available');
            }
          },
          display: 'block',
          cursor: 'pointer',
          pulsate: true,
          frameGap: '10gc',
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          backgroundColor: '#4CAF50',
          color: 'white',
          fontSize: '28gc',
          fontWeight: 'bold',
          borderRadius: '10gc',
          border: 'none',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      },

      // Tap animation
      {
        name: 'tap-animation-2',
        type: 'container',
        coordinates: [1300, 750, 1400, 825],
        zIndex: 700,
        props: {
          backgroundImage: 'url(assets/tap.gif)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          display: 'block'
            }
        },
    ],

  };
  
  return pages;
};

// ===== INITIALIZATION AND EXPORT =====





/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log('🚀 Initializing PageConfig');
  
  // Create GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();
  
  // Make available globally
  if (typeof window !== 'undefined') {
    // Store the page configuration globally
    window.GridPositionPages = optimizedPages;
    window.gridPositions = window.GridPositionPages;
    
    // Initialize essential window functions
    console.log('🔄 [PageConfig] Initializing window functions...');
    
    try {
      
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log('🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)');
          console.log('🔄 [Navigation] Treating as APP RELOAD with next question');
          
          // Simplified navigation - always reset to 0
          const { currentIndex } = getCurrentQuestionData();
          const newIndex = 0;
          console.log('🔄 [Navigation] Resetting to question 1');
          
          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log('✅ [Navigation] Updated window.currentQuestionIndex to:', newIndex);
          
          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;
          
          console.log('✅ [Navigation] Complete app reset completed - ready for new question');
          resolve(newIndex);
        });
      };
      
      const updateQuestionDependentElements = () => {
        console.log('🔄 [UI] Updating question-dependent elements');
        
        // Trigger React re-render by forcing app update
        if (typeof window.forceAppUpdate === 'function') {
          window.forceAppUpdate();
          console.log('✅ [UI] Triggered React re-render via forceAppUpdate');
        } else {
          console.warn('⚠️ [UI] forceAppUpdate not available, React may not re-render');
        }
        
        if (typeof window.updateAnswerContainerPage2 === 'function') {
          window.updateAnswerContainerPage2();
        }
        
        console.log('✅ [UI] updateQuestionDependentElements completed');
      };
      
      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText('buttons.startOver', 'Start Over');
      };
      
      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;
      
      console.log('✅ [PageConfig] Direct function assignment completed');
      console.log('🔍 [PageConfig] window.advanceToNextQuestion type:', typeof window.advanceToNextQuestion);
      console.log('🔍 [PageConfig] window.updateQuestionDependentElements type:', typeof window.updateQuestionDependentElements);
      
    } catch (error) {
      console.error('❌ [PageConfig] Error in direct function assignment:', error);
    }
    
    // Initialize step ordering game
    if (window.StepOrderingGame && typeof window.StepOrderingGame.initializeGame === 'function') {
      console.log('🎮 [PageConfig] Initializing step ordering game...');
      window.StepOrderingGame.initializeGame();
    }
    
    // Add global function to manually clear page states (for testing)
    window.clearAllPageStates = () => {
      console.log('🧹 [PageConfig] Manually clearing page states');
      try {
        // Reset global variables
        window.page1complete = false;
        window.objectsremoved = 0;
        window.currentQuestionIndex = 0;
        
        console.log('✅ [PageConfig] Page states cleared successfully');
        
        // Reload the page to start fresh
        if (confirm('Page states have been cleared. Reload the page to start fresh?')) {
          window.location.reload();
        }
      } catch (error) {
        console.error('❌ [PageConfig] Error clearing page states:', error);
      }
    };
    
    console.log('✅ PageConfig initialized - pages and functions available globally');
    console.log('💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states');
  }
  
  return optimizedPages;
};

// Initialize immediately
console.log('🔄 [PageConfig] About to call initializePageConfig...');
const OptimizedGridPositionPages = initializePageConfig();
console.log('🔄 [PageConfig] initializePageConfig completed, result:', typeof OptimizedGridPositionPages);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    OptimizedGridPositionPages
  };
} else {
  // Browser global export
  window.PageConfigOptimized = {
    OptimizedGridPositionPages
  };
}

console.log('🎉 PageConfig optimization complete!');
