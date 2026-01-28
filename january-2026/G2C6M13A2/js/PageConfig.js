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
    return typeof i18n !== 'undefined' ? i18n.t(key, params) : fallback;
  };


  // Return optimized GridPositionPages
  return {
    1: [
      // Header
      {
        id: 'header-page1-id',
        name: 'header-page1',
        type: 'textbox',
        coordinates: [50, 50, 1550, 150],
        zIndex: 'var(--z-elevated)',
        props: {
          get text() {
            return getI18nText('pages.page1.header', '');
          },
          fontSize: '48gc',
          textAlign: 'center',
          color: '#FF8C00',
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }
      },

      // Main textbox
      {
        id: 'main-textbox-page1-id',
        name: 'main-textbox-page1',
        type: 'textbox',
        coordinates: [5, 250, 1595, 500],
        zIndex: 'var(--z-content)',
        props: {
          get text() {
            return getI18nText('pages.page1.mainText', '');
          },
          allowHTML: true,
          fontSize: '48gc',
          textAlign: 'center',
          color: '#ffffff',
          backgroundColor: 'transparent',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          lineHeight: '1.4'
        }
      },

      

      // Start Button
      {
        id: 'start-button-page1-id',
        name: 'start-button-page1',
        type: 'button',
        coordinates: [610, 625, 1010, 725],
        zIndex: 'var(--z-button)',
        props: {
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '6.25gc',
          get text() {
            return getI18nText('pages.page1.startButton', '');
          },
          mode: 'enabled',
          fontSize: '60gc',
          fontWeight: 'bold',
          backgroundColor: '#FF8C00',
          color: '#ffffff',
          borderRadius: '15gc',
          border: '3px solid #be6901',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          onModeChange: (newMode) => {
            console.log('🔄 [Start Button] Mode changed to:', newMode);
          },
          onClick: () => {
            console.log('🔄 [Start Button] Clicked');

            // Play click sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }

            // Navigate to page 2
            if (typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(2);
              } else if (window.navigateToPage) {
                window.navigateToPage(2);
              } else {
                // Fallback: dispatch page change event
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
                console.log('📄 [Start Button] Dispatched page change event to page 2');
              }
            }
          }
        }
      },

      // Tap animation
      {
        id: 'tap-animation-page1-id',
        name: 'tap-animation-page1',
        type: 'container',
        coordinates: [950, 675, 1025, 750],
        zIndex: 'var(--z-overlay)',
        props: {
          backgroundImage: 'url(assets/tap.gif)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'block',
          pointerEvents: 'none',
          backgroundColor: 'transparent'
        }
      }
    ],

    2: [
      // Header
      {
        id: 'header-page2-id',
        name: 'header-page2',
        type: 'textbox',
        coordinates: [50, 0, 1550, 75],
        zIndex: 'var(--z-elevated)',
        props: {
          get text() {
            return getI18nText('pages.page2.header', '');
          },
          allowHTML: true,
          fontSize: '40gc',
          textAlign: 'center',
          color: '#FF8C00',
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }
      },

      // Drag and Drop Game (includes unsorted container and drop zones)
      {
        id: 'drag-drop-game-page2-id',
        name: 'drag-drop-game-page2',
        type: 'drag-drop-game',
        coordinates: [0, 0, 1600, 900], // Full container
        zIndex: 'var(--z-elevated)',
        props: {
          questionIndex: 0, // Slide 1 data (triangle/not-triangle shapes)
          // Layout: Left drop zone | Unsorted (middle) | Right drop zone
          unsortedCoordinates: [555, 75, 1045, 810], // Unsorted container (middle)
          dropZone1Coordinates: [5, 75, 550, 450], // Triangle (left)
          dropZone2Coordinates: [5, 455, 550, 810], // Not a Triangle (right)
          dropZone3Coordinates: [1050, 75, 1595, 450],
          dropZone4Coordinates: [1050, 455, 1595, 810],
          // Categories
          dropZone1Category: 'morning',
          dropZone2Category: 'afternoon',
          dropZone3Category: 'evening',
          dropZone4Category: 'night',
          // Labels
          get dropZone1Label() {
            return getI18nText('pages.page2.dropZone1Label', '');
          },
          get dropZone2Label() {
            return getI18nText('pages.page2.dropZone2Label', '');
          },
          get dropZone3Label() {
            return getI18nText('pages.page2.dropZone3Label', '');
          },
          get dropZone4Label() {
            return getI18nText('pages.page2.dropZone4Label', '');
          },
          // Label coordinates dropzone1 (matching dropzone widths)
          dropZone1LabelCoordinates: [5, 75, 550, 150],
          dropZone2LabelCoordinates: [5, 455, 550, 530],
          dropZone3LabelCoordinates: [1050, 75, 1595, 150],
          dropZone4LabelCoordinates: [1050, 455, 1595, 530],
          
          // Border styles for unsorted container
          unsortedBorderColor: 'rgba(255, 255, 255, 0.3)',
          unsortedBorderWidth: '4gc',
          unsortedBorderRadius: '20gc',
          unsortedBorderStyle: 'solid',
          unsortedBackgroundColor: 'transparent',

          // Layout for unsorted container (4x6 for 22 images)
          unsortedColumns: 1,
          unsortedRows: 1,
          unsortedGravitate: 'down', // down, up, no

          // Congratulatory message when unsorted zone is cleared
          get unsortedEmptyMessage() {
            return getI18nText('pages.page2.unsortedEmptyMessage', '');
          },

          // Empty message for drop zones
          get dropZoneEmptyMessage() {
            return getI18nText('dropZone.emptyMessage', '');
          },

          // Drop zone 1 styles (Triangle)
          dropZone1BorderColor: 'rgba(30, 144, 255, 0.6)',
          dropZone1BorderWidth: '4gc',
          dropZone1BorderRadius: '12gc',
          dropZone1BorderStyle: 'dashed',
          dropZone1Padding: '5%',
          dropZone1Columns: 2,
          dropZone1Rows: 2,
          dropZone1LabelBackground: '',
          dropZone1LabelColor : '#ffff',
          dropZone1LabelBorder : 'none',
          dropZone1LabelBoxShadow :'none',

          // Drop zone 2 styles (Not a Triangle)
          dropZone2BorderColor: 'rgba(239, 151, 36, 0.6)',
          dropZone2BorderWidth: '4gc',
          dropZone2BorderRadius: '12gc',
          dropZone2BorderStyle: 'dashed',
          dropZone2Padding: '5%',
          dropZone2Columns: 2,
          dropZone2Rows: 2,
          dropZone2LabelBackground: '',
          dropZone2LabelColor : '#ffff',
          dropZone2LabelBorder : 'none',
          dropZone2LabelBoxShadow :'none',
          // Drop zone 3 styles (Not a Triangle)
          dropZone3BorderColor: 'rgba(238, 255, 0, 0.6)',
          dropZone3BorderWidth: '4gc',
          dropZone3BorderRadius: '12gc',
          dropZone3BorderStyle: 'dashed',
          dropZone3Padding: '5%',
          dropZone3Columns: 2,
          dropZone3Rows: 2,
          dropZone3LabelBackground: '',
          dropZone3LabelColor : '#ffff',
          dropZone3LabelBorder : 'none',
          dropZone3LabelBoxShadow :'none',
          // Drop zone 3 styles (Not a Triangle)
          dropZone4BorderColor: 'rgba(255, 0, 183, 0.6)',
          dropZone4BorderWidth: '4gc',
          dropZone4BorderRadius: '12gc',
          dropZone4BorderStyle: 'dashed',
          dropZone4Padding: '5%',
          dropZone4Columns: 2,
          dropZone4Rows: 2,
          dropZone4LabelBackground: '',
          dropZone4LabelColor : '#ffff',
          dropZone4LabelBorder : 'none',
          dropZone4LabelBoxShadow :'none',
          //----------
          onComplete: () => {
            console.log('🎉 All images sorted correctly!');

            // Set game completed state
            if (typeof window !== 'undefined') {
              window.gameCompleted = true;
              console.log('✅ [Game] Game completed state set to true');

              // Force React re-render to update button state
              if (typeof window.forceAppUpdate === 'function') {
                window.forceAppUpdate();
                console.log('🔄 [Game] Triggered app re-render for button update');
              } else {
                console.warn('⚠️ [Game] forceAppUpdate not available, button may not update');
              }
            }

            // Show question complete feedback
            const completeText = getI18nText('feedback.questionCompleteFeedback', '');
            console.log('🎯 [Feedback] Calling updateDragDropFeedback with complete text:', completeText);
            window.updateDragDropFeedback(completeText, 'correct');

            // Play celebration sound
            if (typeof window !== 'undefined' && window.playCorrectSound) {
              window.playCorrectSound();
            }
          },
          onImageDropped: (correct, category) => {
            console.log(correct ? '✅ Correct drop!' : '❌ Incorrect drop!', 'Category:', category);

            // Update feedback textbox based on drop result and category
            if (correct) {
              const feedbackKey = category === 'triangle' ? 'pages.page2.correctTriangleFeedback' : 'pages.page2.correctNotTriangleFeedback';
              const correctText = getI18nText(feedbackKey, '');
              console.log('🎯 [Feedback] Calling updateDragDropFeedback with correct text:', correctText);
              window.updateDragDropFeedback(correctText, 'correct');
            } else {
              const feedbackKey = category === 'triangle' ? 'pages.page2.incorrectTriangleFeedback' : 'pages.page2.incorrectNotTriangleFeedback';
              const incorrectText = getI18nText(feedbackKey, '');
              console.log('🎯 [Feedback] Calling updateDragDropFeedback with incorrect text:', incorrectText);
              window.updateDragDropFeedback(incorrectText, 'incorrect');
            }
          }
        }
      },

      // Instruction header
      {
        id: 'instruction-header-id',
        name: 'instruction-header',
        type: 'textbox',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-notification)',
        props: {
          get text() {
            // Check if all items are sorted
            const isCompleted = (typeof window !== 'undefined' && window.gameCompleted === true);
            if (isCompleted) {
              return getI18nText('pages.page2.continueText', '');
            }
            return getI18nText('pages.page2.instructionText', '');
          },
          fontSize: '32gc',
          textAlign: 'center',
          color: '#ffffff',
          backgroundColor: 'rgba(11, 0, 30, 0.6)',
          fontWeight: 'bold',
          userSelect: 'text',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      },

      // // Feedback textbox
      // {
      //   id: 'feedback-textbox-page2-id',
      //   name: 'feedback-textbox-page2',
      //   type: 'feedback-textbox',
      //   coordinates: [5, 715, 1595, 815],
      //   zIndex: 'var(--z-notification)',
      //   props: {
      //     text: '',
      //     fontSize: '32gc',
      //     textAlign: 'center',
      //     mode: 'normal',
      //     borderRadius: '12gc',
      //     display: 'flex',
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     padding: '10gc',
      //     boxSizing: 'border-box',
      //     fontWeight: 'bold',
      //     overflow: 'hidden'
      //   }
      // },

      // Next button for Page 2
      {
        id: 'next-button-page2-id',
        name: 'next-button-page2',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '6.25gc',
          get text() {
            return getI18nText('buttons.next', '');
          },
          get mode() {
            const isCompleted = (typeof window !== 'undefined' && window.gameCompleted);
            const mode = isCompleted ? 'enabled' : 'disabled';
            console.log('🔍 [Next Button] Mode check:', { isCompleted, mode, gameCompleted: window.gameCompleted });
            return mode;
          },
          backgroundColor: 'var(--color-gold)',
          color: 'white',
          fontSize: '60gc',
          fontWeight: 'bold',
          borderRadius: '10gc',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          onModeChange: (newMode) => {
            console.log('🔄 [Page 2 Next Button] Mode changed to:', newMode);
            if (newMode === 'enabled' && typeof window !== 'undefined' && window.playCorrectSound) {
              window.playCorrectSound();
            }
          },
          onClick: () => {
            console.log('🔄 [Page 2] Next button clicked');

            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }

            // Go to page 8
            if (typeof window !== 'undefined') {
              window.gameCompleted = false;
              if (window.changePageAndNotify) {
                window.changePageAndNotify(3);
              }
            }
          }
        }
      },

      // Previous button for Page 2
      {
        id: 'previous-button-page2-id',
        name: 'previous-button-page2',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '6.25gc',
          get text() {
            return getI18nText('buttons.previous', '');
          },
          mode: 'enabled',
          backgroundColor: '#6699CC',
          color: 'white',
          fontSize: '60gc',
          fontWeight: 'bold',
          borderRadius: '10gc',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          onModeChange: (newMode) => {
            console.log('🔄 [Page 2 Previous Button] Mode changed to:', newMode);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('previous');
            }

            if (typeof window !== 'undefined' && window.changePageAndNotify) {
              window.changePageAndNotify(1);
            }
          }
        }
      },

      // Tap animation
      {
        id: 'tap-animation-page2-id',
        name: 'tap-animation-page2',
        type: 'container',
        coordinates: [1450, 840, 1500, 890],
        zIndex: 'var(--z-overlay)',
        props: {
          backgroundImage: 'url(assets/tap.gif)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          get display() {
            const isCompleted = (typeof window !== 'undefined' && window.gameCompleted);
            return isCompleted ? 'block' : 'none';
          },
          opacity: 0.5,
          pointerEvents: 'none',
          backgroundColor: 'transparent'
        }
      }
    ],
    // Page 3: Completion page (moved from page 3)
    3: [
      // Header for Page 8 - "Activity Completed" in bright orange
      {
        id: 'header-page3-id',
        name: 'header-page3',
        type: 'textbox',
        coordinates: [50, 25, 1550, 125],
        zIndex: 'var(--z-elevated)',
        props: {
          get text() {
            return getI18nText('pages.page3.header', '');
          },
          fontSize: '48gc',
          textAlign: 'center',
          color: '#FF8C00', // Bright orange
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }
      },

      // "Great!" text - white text
      {
        id: 'great-text-page3-id',
        name: 'great-text-page3',
        type: 'textbox',
        coordinates: [400, 200, 1200, 350],
        zIndex: 'var(--z-content)',
        props: {
          get text() {
            return getI18nText('pages.page3.greatText', '');
          },
          allowHTML: true,
          fontSize: '46gc',
          textAlign: 'center',
          color: '#ffffff',
          backgroundColor: 'transparent',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }
      },

      // Main textbox with educational message
      {
        id: 'main-textbox-page3-id',
        name: 'main-textbox-page3',
        type: 'textbox',
        coordinates: [400, 350, 1200, 450],
        zIndex: 'var(--z-content)',
        props: {
          get text() {
            return getI18nText('pages.page3.mainText', '');
          },
          allowHTML: true,
          fontSize: '44gc',
          textAlign: 'center',
          color: '#ffffff',
          backgroundColor: 'transparent',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          lineHeight: '1.6',
          padding: '30gc'
        }
      },

      // Start Over button - centered, orange gradient
      {
        id: 'startover-button-page3-id',
        name: 'startover-button-page3',
        type: 'button',
        coordinates: [600, 570, 1000, 670],
        zIndex: 'var(--z-button)',
        props: {
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '6.25gc',
          get text() {
            return getI18nText('pages.page3.startOverButton', '');
          },
          mode: 'enabled',
          fontSize: '50gc',
          fontWeight: 'bold',
          backgroundColor: '#FF8C00', // Orange
          background: 'linear-gradient(to bottom, #FFA500, #FF8C00)', // Orange gradient
          color: '#ffffff', // White text
          borderRadius: '15gc',
          border: '2px solid #FF7F00', // Darker orange border
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          onModeChange: (newMode) => {
            console.log('🔄 [Start Over Button] Mode changed to:', newMode);
          },
          onClick: () => {
            console.log('🔄 [Start Over Button] Clicked');

            // Play click sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }

            // Reset current question index to 0
            if (typeof window !== 'undefined' && window.currentQuestionIndex !== undefined) {
              window.currentQuestionIndex = 0;
              window.gameCompleted = false;
              console.log('🔄 [Start Over Button] Reset question index to 0');
            }

            // Navigate to page 1
            if (typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              } else if (window.navigateToPage) {
                window.navigateToPage(1);
              } else {
                // Fallback: dispatch page change event
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
                console.log('📄 [Start Over Button] Dispatched page change event to page 1');
              }
            }
          }
        }
      },

     // Tap animation
      {
        id: 'tap-animation-page3-id',
        name: 'tap-animation-page3',
        type: 'container',
        coordinates: [600, 600, 660, 700],
        zIndex: 'var(--z-overlay)',
        props: {
          backgroundImage: 'url(assets/tap.gif)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'block',
          pointerEvents: 'none',
          backgroundColor: 'transparent'
        }
      }
    ]
  };
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

    // Initialize game state
    window.gameCompleted = false;

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
        return getI18nText('buttons.startOver', '');
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
        const confirmMessage = getI18nText('debug.pageStatesCleared', 'Page states have been cleared. Reload the page to start fresh?');
        if (confirm(confirmMessage)) {
          window.location.reload();
        }
      } catch (error) {
        console.error('❌ [PageConfig] Error clearing page states:', error);
      }
    };

    console.log('✅ PageConfig initialized - pages and functions available globally');
    console.log('💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states');

    // Add debug function for button positioning
    window.debugButtonPositions = () => {
      console.log('🔍 [DEBUG] Button Position Debug Report');
      console.log('=====================================');

      // Check if pages are available
      console.log('🔍 [DEBUG] Page Configuration Check:');
      console.log('  - GridPositionPages available:', typeof window.GridPositionPages !== 'undefined');
      console.log('  - Page 1 elements count:', optimizedPages[1] ? optimizedPages[1].length : 'Page 1 not found');

      if (optimizedPages[1]) {
        console.log('  - Page 1 element names:', optimizedPages[1].map(el => el.name));
      }

      // Debug previous button
      const prevButton = optimizedPages[1]?.find(el => el.name === 'previous-button');
      console.log('  - Previous button found in config:', prevButton ? 'Yes' : 'No');
      if (prevButton && prevButton.debug) {
        prevButton.debug();
      }

      // Debug next button
      const nextButton = optimizedPages[1]?.find(el => el.name === 'next-button');
      console.log('  - Next button found in config:', nextButton ? 'Yes' : 'No');
      if (nextButton && nextButton.debug) {
        nextButton.debug();
      }

      // Check actual DOM elements
      setTimeout(() => {
        console.log('🔍 [DEBUG] Checking DOM elements...');

        const prevElement = document.querySelector('[data-grid-position="previous-button"]');
        const nextElement = document.querySelector('[data-grid-position="next-button"]');
        const containerElement = document.querySelector('.main-container');

        console.log('🔍 [DEBUG] DOM Elements Found:');
        console.log('  - Previous button element:', prevElement ? 'Found' : 'NOT FOUND');
        console.log('  - Next button element:', nextElement ? 'Found' : 'NOT FOUND');
        console.log('  - Container element:', containerElement ? 'Found' : 'NOT FOUND');

        if (prevElement) {
          const rect = prevElement.getBoundingClientRect();
          const containerRect = containerElement?.getBoundingClientRect();
          if (containerRect) {
            const actualLeft = ((rect.left - containerRect.left) / containerRect.width) * 100;
            const actualTop = ((rect.top - containerRect.top) / containerRect.height) * 100;
            console.log('🔍 [DEBUG] Previous Button Actual Position:');
            console.log('  - Actual left:', actualLeft.toFixed(2) + '%');
            console.log('  - Actual top:', actualTop.toFixed(2) + '%');
            console.log('  - Actual width:', rect.width + 'px');
            console.log('  - Actual height:', rect.height + 'px');
            console.log('  - Computed position:', window.getComputedStyle(prevElement).position);
            console.log('  - Computed left:', window.getComputedStyle(prevElement).left);
            console.log('  - Computed top:', window.getComputedStyle(prevElement).top);
          } else {
            console.log('❌ [DEBUG] Container not found for previous button');
          }
        } else {
          console.log('❌ [DEBUG] Previous button element not found in DOM');
        }

        if (nextElement) {
          const rect = nextElement.getBoundingClientRect();
          const containerRect = containerElement?.getBoundingClientRect();
          if (containerRect) {
            const actualLeft = ((rect.left - containerRect.left) / containerRect.width) * 100;
            const actualTop = ((rect.top - containerRect.top) / containerRect.height) * 100;
            console.log('🔍 [DEBUG] Next Button Actual Position:');
            console.log('  - Actual left:', actualLeft.toFixed(2) + '%');
            console.log('  - Actual top:', actualTop.toFixed(2) + '%');
            console.log('  - Actual width:', rect.width + 'px');
            console.log('  - Actual height:', rect.height + 'px');
            console.log('  - Computed position:', window.getComputedStyle(nextElement).position);
            console.log('  - Computed left:', window.getComputedStyle(nextElement).left);
            console.log('  - Computed top:', window.getComputedStyle(nextElement).top);
          } else {
            console.log('❌ [DEBUG] Container not found for next button');
          }
        } else {
          console.log('❌ [DEBUG] Next button element not found in DOM');
        }
      }, 1000);
    };

    console.log('💡 [PageConfig] Use window.debugButtonPositions() to debug button positioning');

    // Add function to check all rendered elements
    window.debugAllElements = () => {
      console.log('🔍 [DEBUG] All Rendered Elements:');
      console.log('================================');

      const allElements = document.querySelectorAll('[data-grid-position]');
      console.log('  - Total elements with data-grid-position:', allElements.length);

      allElements.forEach((element, index) => {
        const position = element.getAttribute('data-grid-position');
        const elementName = element.getAttribute('data-element-name');
        console.log(`  ${index + 1}. ${position} (name: ${elementName})`);
      });

      // Check for any button-like elements
      const buttonElements = document.querySelectorAll('button, [class*="button"], [class*="Button"]');
      console.log('  - Button-like elements found:', buttonElements.length);
      buttonElements.forEach((element, index) => {
        console.log(`  Button ${index + 1}:`, element.className, element.textContent?.trim());
      });
    };

    console.log('💡 [PageConfig] Use window.debugAllElements() to see all rendered elements');

    // Global feedback functions will be set by the React component
    // These are just placeholders until the component mounts
    window.updateDragDropFeedback = (text, mode = 'normal') => {
      console.log('🎯 [Feedback] updateDragDropFeedback called with:', { text, mode });
      console.log('⚠️ [Feedback] React component not mounted yet, storing as pending');
      window.pendingDragDropFeedback = { text, mode };
    };

    window.clearDragDropFeedback = () => {
      console.log('🎯 [Feedback] clearDragDropFeedback called');
      console.log('⚠️ [Feedback] React component not mounted yet, storing as pending');
      window.pendingDragDropFeedback = { text: '', mode: 'normal' };
    };

    // Add test function for feedback system
    window.testDragDropFeedback = () => {
      console.log('🧪 [Test] Testing drag-drop feedback system...');

      // Check if feedback element exists
      const feedbackElement = document.querySelector('[data-element-name="feedback-textbox-page2"]');
      console.log('🔍 [Test] Feedback element found:', feedbackElement ? 'Yes' : 'No');
      if (feedbackElement) {
        console.log('🔍 [Test] Feedback element details:', {
          textContent: feedbackElement.textContent,
          className: feedbackElement.className,
          style: feedbackElement.style.cssText
        });
      }

      if (typeof window.updateDragDropFeedback === 'function') {
        console.log('✅ [Test] updateDragDropFeedback function is available');
        window.updateDragDropFeedback('Test correct feedback!', 'correct');
        setTimeout(() => {
          window.updateDragDropFeedback('Test incorrect feedback!', 'incorrect');
        }, 2000);
      } else {
        console.log('❌ [Test] updateDragDropFeedback function not available');
        console.log('🔍 [Test] Available window functions:', Object.keys(window).filter(key => key.includes('DragDrop') || key.includes('Feedback')));
      }
    };

    console.log('💡 [PageConfig] Use window.testDragDropFeedback() to test the feedback system');
    console.log('✅ [PageConfig] Global feedback functions created');
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
