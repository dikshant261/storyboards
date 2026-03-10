/**
 * Page Configuration
 *
 * - Grid positioning and element generation
 * - Page-specific UI element configurations
 * - Question-dependent element updates
 */

// ===== PAGE CONFIGURATION =====
// Page configuration with grid positioning and element generation

// ===== PAGE NAVIGATION CONFIGURATION =====
/**
 * Page Navigation Configuration
 * Maps each page number to its previous and next page numbers
 * - prev: previous page number (null for first page)
 * - next: next page number (null for last page)
 */
const pageNavigation = {
  1: { prev: null, next: 2 },
  2: { prev: 1, next: 3 },
  3: { prev: 2, next: 4 },
  4: { prev: 3, next: 5 },
  5: { prev: 4, next: 10 },
  6: { prev: 5, next: 9 },
  9: { prev: 6, next: 10 },
  10: { prev: 5, next: 13 },
  13: { prev: 10, next: 12 },
  12: { prev: 13, next: 11 },
  11: { prev: 12, next: null },
};

/**
 * Get all page numbers in navigation order
 * @returns {number[]} Array of page numbers in order
 */
const getPageNumbers = () => {
  const pages = [];
  let currentPage = 1;

  // Find the first page (where prev is null)
  while (currentPage && pageNavigation[currentPage]) {
    pages.push(currentPage);
    currentPage = pageNavigation[currentPage].next;
  }

  return pages;
};

/**
 * Calculate total number of pages from pageNavigation
 * @returns {number} Total number of pages
 */
const getTotalPages = () => {
  return getPageNumbers().length;
};

/**
 * Get page number from dot position (1-based)
 * @param {number} dotPosition - Dot position (1 to totalPages)
 * @returns {number} Actual page number
 */
const getPageFromDotPosition = (dotPosition) => {
  const pages = getPageNumbers();
  return pages[dotPosition - 1] || pages[0];
};

/**
 * Get dot position from page number (1-based)
 * @param {number} pageNumber - Actual page number
 * @returns {number} Dot position (1 to totalPages)
 */
const getDotPositionFromPage = (pageNumber) => {
  const pages = getPageNumbers();
  const index = pages.indexOf(pageNumber);
  return index >= 0 ? index + 1 : 1;
};

/**
 * Extract page number from element ID
 * @param {string} id - Element ID (e.g., 'page1-next-button', 'page2-previous-button')
 * @returns {number} Extracted page number (defaults to 1 if not found)
 */
const extractPageNumberFromId = (id) => {
  if (!id) return 1;
  const match = id.match(/page(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

/**
 * Helper function to navigate to a page
 * @param {number} targetPage - The page number to navigate to
 * @param {string} direction - 'next' or 'previous' (for logging)
 */
const navigateToPage = (targetPage, direction = "unknown") => {
  if (typeof window !== "undefined") {
    if (window.changePageAndNotify) {
      window.changePageAndNotify(targetPage);
    } else if (window.navigateToPage) {
      window.navigateToPage(targetPage);
    } else {
      // Fallback: dispatch page change event
      window.dispatchEvent(
        new CustomEvent("pageChanged", { detail: { page: targetPage } })
      );
      console.log(
        `📄 [Navigation] ${direction} - Dispatched page change event to page ${targetPage}`
      );
    }
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Helper function for i18n text (accessible globally within this module)
 * @param {string} key - Translation key
 * @param {string} fallback - Fallback text if translation not found
 * @param {Object} params - Parameters for interpolation
 * @returns {string} Translated or fallback text
 */
const getI18nText = (key, fallback, params = {}) => {
  return typeof i18n !== "undefined" ? i18n.t(key, params) : fallback;
};

/**
 * Get page navigation info (previous and next pages)
 * @param {number} pageNumber - Current page number
 * @returns {Object|null} Navigation object with prevPage and nextPage, or null if not found
 */
const getPageNavigation = (pageNumber) => {
  return pageNavigation[pageNumber] || null;
};

/**
 * Check if previous button should be disabled
 * @param {number} pageNumber - Current page number
 * @returns {boolean} True if previous button should be disabled
 */
const isPrevButtonDisabled = (pageNumber) => {
  const nav = getPageNavigation(pageNumber);
  return !nav || nav.prev === null;
};

/**
 * Get next button text based on page number
 * @param {number} pageNumber - Current page number
 * @returns {string} Text to display on next button
 */
const getNextButtonText = (pageNumber) => {
  const nav = getPageNavigation(pageNumber);
  // If there's no next page, show "Start Over" or similar
  if (!nav || nav.next === null) {
    return getI18nText("buttons.startOver", "");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next", "");
};

// ===== GRID POSITION PAGES =====

const createOptimizedGridPositionPages = () => {
  // Helper function to get current question data (optimized)
  const getCurrentQuestionData = () => {
    const currentIndex =
      typeof window !== "undefined" && window.currentQuestionIndex !== undefined
        ? window.currentQuestionIndex
        : 0;
    const currentQuestion = {
      minuend: 5,
      subtrahend: 3,
      missing: "subtrahend",
    };
    return { currentIndex, currentQuestion };
  };
  const handleQuizCompleted = (event, pageNumber) => {
    const eventPageNumber = event.detail?.pageNumber;
    console.log(`🔍 [DynamicImage] Quiz completed event received for page ${eventPageNumber}, current page: ${pageNumber}`);
    if (eventPageNumber === eventPageNumber) {
      return true
    }
    else {
      return false
    }
  };
  const questionBottom_Y = 150;
  const questionTextSize = '28gc';

  // Return optimized GridPositionPages
  return {
    1: [

      // Question Text Box Component
      {
        id: 'page1-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page1.highlights', [])
        }
      },

      // Instruction Text Box
      {
        id: 'page1-instruction-textbox',
        name: 'instruction-textbox',
        type: 'custom',
        coordinates: [200, 680, 1400, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.instructionText', ''),
          backgroundColor: 'transparent',
          border: '4gc dashed white',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc'
        }
      },

      // Question Image
      {
        id: 'page1-question-image',
        name: 'question-image',
        type: 'container',
        coordinates: [200, questionBottom_Y + 50, 1400, questionBottom_Y + 500], // Positioned below instruction textbox
        zIndex: 56,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/questionImage.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }
      },

      // Tap Animation GIF
      {
        id: 'page1-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page1-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page1-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page1-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page1-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page1-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page1-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page1-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    2: [

      // Question Text Box Component
      {
        id: 'page2-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page2.highlights', [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page2-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page2.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page2.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page2.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Stage Component Demo - 3 stages with images, buttons, and descriptions
      {
        id: 'page2-stage-visualisation',
        name: 'stage-visualisation',
        type: 'custom',
        coordinates: [0, 0, 1600, 900], // Full page overlay
        zIndex: 65, // Above other elements
        props: {
          componentType: 'StageComponent',
          headerText: getI18nText('pages.page2.stageComponent.headerText', ''),
          stageArray: (() => {
            // Get stages from data.js
            const stages = getI18nText('pages.page2.stageComponent.stages', []);
            return stages.map((stage, index) => {
              const stageConfig = {
                id: stage.id || `page2-stage-${index}`, // Add stage ID
                image: stage.image || null,
                buttonText: stage.buttonText || '',
                descriptionText: stage.descriptionText || '',
                highlights: stage.highlights || [],
                showPreviousImages: stage.showPreviousImages || [],
                appendToInfoAnalysis: stage.appendToInfoAnalysis || {
                  facts: [],
                  values: [],
                  toFind: []
                }
              };
              // Add imageAlt if it exists (for stage 0)
              if (stage.imageAlt) {
                stageConfig.imageAlt = stage.imageAlt;
              }
              return stageConfig;
            });
          })(),
          header: {
            coordinates: [30, questionBottom_Y + 5, 800, questionBottom_Y + 50], // [x1, y1, x2, y2] for header text
            fontSize: '36gc',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'left',
            display: 'flex',
          },
          line: {
            coordinates: [30, questionBottom_Y + 55, 1080, questionBottom_Y + 60], // [x1, y1, x2, y2] horizontal line
            color: '#00FF7F',
            thickness: 3,
            strokeWidth: '3px'
          },
          image: {
            coordinates: [25, questionBottom_Y + 75, 750, 700], // [x1, y1, x2, y2] format
            // borderRadius: '10gc',
            // border: ' 2px solid #000000',
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          },
          button: {
            coordinates: [300, 725, 800, 800], // [x1, y1, x2, y2] format
            backgroundColor: '#FFD700',
            color: '#000000',
            fontSize: '30gc'
          },
          text: {
            coordinates: [800, 300, 1075, 700], // [x1, y1, x2, y2] format
            fontSize: '30gc',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'left'
          },
          tapGif: {
            coordinates: [315, 750, 365, 800], // [x1, y1, x2, y2] positioned near button
            imageSrc: 'assets/tap.gif'
          },
          showTapGif: true, // Show the tap.gif
          keepPreviousImages: false, // Don't keep previous images (default behavior)
          imageStackOffset: '0gc', // No offset needed since images overlap
          animateTransitions: true,
          onStageComplete: (stageIndex, stageData) => {
            console.log(`✅ Completed stage ${stageIndex + 1}:`, stageData);
            if (typeof window !== 'undefined' && window.SimpleSoundManager) {
              window.SimpleSoundManager.playSound('correct');
            }
          },
          onAllStagesComplete: () => {
            console.log('🎉', getI18nText('messages.allStagesCompleted', 'All stages completed!'));
            if (typeof window !== 'undefined' && window.SimpleSoundManager) {
              window.SimpleSoundManager.playSound('confetti');
            }
            // Mark page as complete
            if (typeof window !== 'undefined' && window.PageCompletionManager) {
              window.PageCompletionManager.setPageCompleted(2, true);
            }
          }
        }
      },

      // Tap Animation GIF
      {
        id: 'page2-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page2-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page2-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page2-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page2-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page2-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    3: [

      // Quiz State Component (non-renderable)
      // {
      //   id: 'page3-quiz-state',
      //   name: 'quiz-state',
      //   type: 'data',
      //   coordinates: [0, 0, 0, 0], // Not rendered, so coordinates don't matter
      //   zIndex: 0, // Not rendered
      //   props: {
      //     isQuizPresent: true,
      //     isQuizCompleted: false,
      //     updatePanelID: 'page3-quiz-panel'
      //   }
      // },

      // Question Text Box Component
      {
        id: 'page3-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page3.highlights', [])
        }
      },

      // Quiz Panel Component - QTIS4R
      {
        id: 'page3-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTIS4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page3.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          // Options data for QT4R (4 options in rows, text-only)
          options: [
            {
              text: getI18nText('pages.page3.quizPanel.options.0.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page3.quizPanel.options.0.feedback', ''),
            },
            {
              text: getI18nText('pages.page3.quizPanel.options.1.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page3.quizPanel.options.1.feedback', ''),
            },
            {
              text: getI18nText('pages.page3.quizPanel.options.2.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page3.quizPanel.options.2.feedback', ''),
              facts: getI18nText('pages.page3.quizPanel.options.2.facts', [])
            },
            {
              text: getI18nText('pages.page3.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page3.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Information Analysis Panel
      {
        id: 'page3-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page3.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page3.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page3.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Right Angle Triangle Component (from page 5)
      {
        id: 'page3-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [200, 200, 800, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [20, 15, 25], // Pythagorean triple
          multiplier: 28, // Scale up by 4x to make it bigger (60, 80, 100 gc units)
          rightAnglePosition: 'bottom-left',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side [sideA, sideB, sideC] - Orange color
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: ['A', 'B', 'C'],
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [20, 20, 20], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['20 m', '?', '25 m'],
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side label [sideA, sideB, sideC]
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 40, 30], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [-90, -5, 62], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Tap Animation GIF
      {
        id: 'page3-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page3-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page3-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page3-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page3-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page3-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    4: [

      // Question Text Box Component
      {
        id: 'page4-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page4.highlights', [])
        }
      },

      // Quiz Panel Component - QTIS4R
      {
        id: 'page4-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page4-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTIS4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page4.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          // Options data for QT4R (4 options in rows, text-only)
          options: [
            {
              text: getI18nText('pages.page4.quizPanel.options.0.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page4.quizPanel.options.0.feedback', ''),
            },
            {
              text: getI18nText('pages.page4.quizPanel.options.1.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page4.quizPanel.options.1.feedback', ''),
              facts: getI18nText('pages.page4.quizPanel.options.1.facts', []),
              toFindArray: getI18nText('pages.page4.quizPanel.options.1.toFind', [])
            },
            {
              text: getI18nText('pages.page4.quizPanel.options.2.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page4.quizPanel.options.2.feedback', ''),
            },
            {
              text: getI18nText('pages.page4.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page4.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Information Analysis Panel
      {
        id: 'page4-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page4.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page4.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page4.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Right Angle Triangle Component (from page 5)
      {
        id: 'page4-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [200, 200, 800, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [20, 15, 25], // Pythagorean triple
          multiplier: 28, // Scale up by 4x to make it bigger (60, 80, 100 gc units)
          rightAnglePosition: 'bottom-left',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side [sideA, sideB, sideC] - Orange color
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: ['A', 'B', 'C'],
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [20, 20, 20], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['20 m', '?', '25 m'],
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side label [sideA, sideB, sideC]
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 40, 30], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [-90, -5, 62], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Tap Animation GIF
      {
        id: 'page4-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page4-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page4-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page4-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page4-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page4-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    5: [

      // Question Text Box Component
      {
        id: 'page5-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page5.highlights', [])
        }
      },

      // Quiz Panel Component - QTIS4R
      {
        id: 'page5-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTIS4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page5.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          // Options data for QT4R (4 options in rows, text-only)
          options: [
            {
              text: getI18nText('pages.page5.quizPanel.options.0.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page5.quizPanel.options.0.feedback', ''),
              facts: getI18nText('pages.page5.quizPanel.options.0.facts', []),
              toFind: getI18nText('pages.page5.quizPanel.options.0.toFind', [])
            },
            {
              text: getI18nText('pages.page5.quizPanel.options.1.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page5.quizPanel.options.1.feedback', ''),
            },
            {
              text: getI18nText('pages.page5.quizPanel.options.2.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page5.quizPanel.options.2.feedback', ''),
            },
            {
              text: getI18nText('pages.page5.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page5.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Information Analysis Panel
      {
        id: 'page5-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page5.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page5.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page5.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Right Angle Triangle Component (from page 10)
      {
        id: 'page5-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [200, 200, 800, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [20, 15, 25], // Pythagorean triple
          multiplier: 28, // Scale up by 4x to make it bigger (60, 80, 100 gc units)
          rightAnglePosition: 'bottom-left',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side [sideA, sideB, sideC] - Orange color
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: ['A', 'B', 'C'],
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [20, 20, 20], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['20 m', '?', '25 m'],
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side label [sideA, sideB, sideC]
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 40, 30], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [-90, -5, 62], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Tap Animation GIF
      {
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page5-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page5-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page5-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page5-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page5-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],


    6: [

      // Question Text Box Component
      {
        id: 'page6-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page6.highlights', [])
        }
      },

      // Quiz Panel Component - QTIS4R
      {
        id: 'page6-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTIS4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page6.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          // Image stack for QTIS4R - language-aware images
          imageStack: (() => {
            const langSuffix = (typeof AppData !== 'undefined' && AppData.currentLanguage === 'id') ? '-id' : '-en';
            return [
              {
                src: `assets/river7${langSuffix}.png`,
                opacity: 1.0,
                borderRadius: '5gc'
              }
            ];
          })(),
          imageStackLayerReplacements: [], // Will be updated on click
          // Image stack coordinates in grid system (100x precision: 1600x900)
          // Quiz panel: [20, 200, 1100, 815]
          // For QTIS4R, image column is 60% of quiz panel width
          // Quiz panel width: 1100 - 20 = 1080, so image column width: 1080 * 0.6 = 648
          // Image column: x from 20 to 668, y from 200 to 815
          imageStackCoordinates: [20, questionBottom_Y + 25, 950, 700], // Grid coordinates for image stack area
          // Options data for QTIS4R (4 options in rows)
          options: [
            {
              text: getI18nText('pages.page6.quizPanel.options.0.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page6.quizPanel.options.0.feedback', ''),
            },
            {
              text: getI18nText('pages.page6.quizPanel.options.1.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page6.quizPanel.options.1.feedback', ''),
              imageStackLayerReplacement: (() => {
                const langSuffix = (typeof AppData !== 'undefined' && AppData.currentLanguage === 'id') ? '-id' : '-en';
                return {
                  layerId: 0, // Replace layer 0 with blinking version
                  src: `assets/river7A${langSuffix}.png`,
                  blink: true,
                  blinkDuration: '1s'
                };
              })(),
              facts: getI18nText('pages.page6.quizPanel.options.1.facts', [])
            },
            {
              text: getI18nText('pages.page6.quizPanel.options.2.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page6.quizPanel.options.2.feedback', ''),
            },
            {
              text: getI18nText('pages.page6.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page6.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Information Analysis Panel
      {
        id: 'page6-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page6.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page6.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page6.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Tap Animation GIF
      {
        id: 'page6-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page6-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page6-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page6-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page6-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page6-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    7: [

      // Question Text Box Component
      {
        id: 'page7-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page7.highlights', [])
        }
      },

      // Setup Image
      {
        id: 'page7-setup-image',
        name: 'setup-image',
        type: 'container',
        coordinates: [20, questionBottom_Y, 1050, 815], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/setup6.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Information Analysis Panel
      {
        id: 'page7-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page7.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page7.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page7.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Tap Animation GIF
      {
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page7-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page7-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page7-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page7-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page7-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page7-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page7-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    8: [

      // Question Text Box Component
      {
        id: 'page8-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page8.highlights', [])
        }
      },

      // Setup Image
      {
        id: 'page8-setup-image',
        name: 'setup-image',
        type: 'container',
        coordinates: [20, questionBottom_Y, 1050, 815], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/setup7.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Information Analysis Panel
      {
        id: 'page8-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page8.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page8.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page8.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', ''),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', ''),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', ''),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', '')
        }
      },

      // Tap Animation GIF
      {
        id: 'page8-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page8-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page8-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page8-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page8-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page8-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page8-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page8-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    9: [

      // Question Text Box Component
      {
        id: 'page9-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page9.highlights', [])
        }
      },

      // Quiz Panel Component - QTI4R
      {
        id: 'page9-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page9-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTIS4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page9.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          // Image stack for QTI4R - language-aware images
          imageStack: (() => {
            const langSuffix = (typeof AppData !== 'undefined' && AppData.currentLanguage === 'id') ? '-id' : '-en';
            return [
              {
                src: `assets/triangle9${langSuffix}.png`,
                blink: false,
                opacity: 1.0,
                scale: 0.75, // Scale factor for the image (1.0 = 100%, 0.5 = 50%, 2.0 = 200%, etc.)
              }
            ];
          })(),
          imageStackLayerReplacements: [], // Will be updated on click
          imageStackCoordinates: [20, 100, 950, 815], // Grid coordinates for image stack area
          // Options data for QTI4R (4 options in rows)
          options: [
            {
              text: getI18nText('pages.page9.quizPanel.options.0.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page9.quizPanel.options.0.feedback', ''),
            },
            {
              text: getI18nText('pages.page9.quizPanel.options.1.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page9.quizPanel.options.1.feedback', ''),
            },
            {
              text: getI18nText('pages.page9.quizPanel.options.2.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page9.quizPanel.options.2.feedback', ''),
            },
            {
              text: getI18nText('pages.page9.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page9.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Concept Summary Panel
      {
        id: 'page9-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page9.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page9.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page9.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page9.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', '')
        }
      },

      // Tap Animation GIF
      {
        id: 'page9-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page9-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page9-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page9-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page9-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page9-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page9-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page9-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    10: [

      // Question Text Box Component
      {
        id: 'page10-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page10.highlights', [])
        }
      },

      // Calculation Steps Component
      {
        id: 'page10-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned on the left side
        zIndex: 55, // Above other content
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text+image' to 'text' - images removed
          textCoordinates: [50, 50, 550, 600], // Text area on the left
          buttonCoordinates: [550, 450, 1050, 525], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          buttonStyle: {
            color: '#000000' // Black font color for buttons
          },
          stepGap: '15gc',
          defaultButtonText: getI18nText('buttons.next', ''),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [550, 450, 625, 525], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '32gc',
            color: '#ffffff',
            fontWeight: 'normal',
            textAlign: 'left'
          },
          showCards: true, // Enable card styling for each step
          cardBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          cardBorder: '2gc solid rgba(255, 255, 255, 0.4)',
          cardBorderRadius: '12gc',
          // Separate padding control (if not set, falls back to cardPadding)
          // cardPadding: '20gc', // Default padding for all sides
          cardPaddingTop: '10gc', // Optional: Top padding (e.g., '15gc', '20px')
          cardPaddingBottom: '10gc', // Optional: Bottom padding (e.g., '15gc', '20px')
          cardPaddingLeft: '50gc', // Optional: Left padding (e.g., '15gc', '20px')
          cardPaddingRight: '20gc', // Optional: Right padding (e.g., '15gc', '20px')
          cardBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          // Card size control
          cardWidth: '75%', // Card width (can be '100%', 'auto', or specific size like '400gc', '500px')
          cardMaxWidth: null, // Optional: Maximum width (e.g., '600gc', '800px')
          cardMinWidth: null, // Optional: Minimum width (e.g., '200gc', '300px')
          // Step number circle
          showStepNumber: true, // Show step number in a circle on the left edge
          stepNumberSize: '40gc', // Size of the step number circle (diameter)
          stepNumberColor: '#ffffff', // Font color of the step number text
          stepNumberBackgroundColor: 'var(--color-orange)', // Background color of the circle
          stepNumberBorder: '2gc solid #ffffff', // Border of the circle (full border string, e.g., '2gc solid #ffffff')
          stepNumberBorderColor: null, // Optional: Border color (if provided, overrides color in stepNumberBorder)
          stepNumberBorderWidth: null, // Optional: Border width (if provided, overrides width in stepNumberBorder)
          stepNumberBorderStyle: null, // Optional: Border style (if provided, overrides style in stepNumberBorder)
          stepNumberFontSize: '24gc', // Font size of the step number
          stepNumberFontWeight: 'bold', // Font weight of the step number
          // Step explainer props
          explainerFontSize: '24gc', // Font size for step explainers
          explainerColor: 'var(--color-orange)', // Text color for step explainers
          explainerFontWeight: 'normal', // Font weight for step explainers
          explainerFontStyle: 'italic', // Font style for step explainers (italic, normal, etc.)
          explainerMarginBottom: '24gc', // Margin bottom for step explainers
          // Header configuration
          headerText: getI18nText('pages.page10.calculationSteps.headerText', ''),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: [
            {
              type: 'formula', // Formula type: dashed border, highlightColor1 font
              text: getI18nText('pages.page10.calculationSteps.steps.0.text', ''),
              buttonText: getI18nText('pages.page10.calculationSteps.steps.0.buttonText', '')
            },
            {
              type: 'calculation', // Calculation type: default styling
              explainer: getI18nText('pages.page10.calculationSteps.steps.1.explainer', ''), // Optional: Text shown before this step
              text: getI18nText('pages.page10.calculationSteps.steps.1.text', ''),
              buttonText: getI18nText('pages.page10.calculationSteps.steps.1.buttonText', ''),
              blankChanges: [
              ]
            },
            {
              type: 'calculation', // Calculation type: default styling
              explainer: getI18nText('pages.page10.calculationSteps.steps.2.explainer', ''),
              text: getI18nText('pages.page10.calculationSteps.steps.2.text', ''),
              buttonText: getI18nText('pages.page10.calculationSteps.steps.2.buttonText', ''),
              blankChanges: [
              ]
            },
            {
              type: 'answer', // Answer type: highlightColor4 border (blinking), highlightColor4 font
              text: getI18nText('pages.page10.calculationSteps.steps.3.text', ''),
              buttonText: getI18nText('pages.page10.calculationSteps.steps.3.buttonText', ''),
              blankChanges: [
              ]
            }
          ],
          blanks: [
            // {
            //   id: 'blank-8',
            //   coordinate: [250, 250, 300, 300], // Position for first number (8/64) - aligned with step 2
            //   text: '',
            //   bgColor: 'transparent',
            //   fontColor: '#ffffff',
            //   borderColor: '#ffffff',
            //   hidden: true
            // },
          ],
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'transparent',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff'
        }
      },

      // Concept Summary Panel
      {
        id: 'page10-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Expanded to full width
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page10.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page10.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page10.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page10.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', '')
        }
      },

      // Right Angle Triangle Component (from page 12)
      {
        id: 'page10-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [500, 150, 1250, 700], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [20, 15, 25], // Pythagorean triple
          multiplier: 25, // Scale up by 4x to make it bigger (60, 80, 100 gc units)
          rightAnglePosition: 'bottom-left',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side [sideA, sideB, sideC] - Orange color
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: ['A', 'B', 'C'],
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [20, 20, 20], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['20 m', '?', '25 m'],
            color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side label [sideA, sideB, sideC]
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 40, 30], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [-90, 0, 60], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Tap Animation GIF
      {
        id: 'page10-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page10-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page10-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page10-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page10-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page10-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page10-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page10-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    11: [

      // Question Text Box Component
      {
        id: 'page11-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page11.highlights', [])
        }
      },

      // Setup Image (removed river8.png as it doesn't exist)
      // {
      //   id: 'page11-setup-image',
      //   name: 'setup-image',
      //   type: 'container',
      //   coordinates: [20, questionBottom_Y, 1050, 650], // Positioned on the left side
      //   zIndex: 58,
      //   props: {
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     padding: '0gc',
      //     backgroundImage: 'url(assets/river8.png)',
      //     backgroundSize: 'contain',
      //     backgroundPosition: 'center',
      //     backgroundRepeat: 'no-repeat',
      //     transform: 'scale(0.75)',
      //     transformOrigin: 'center center',
      //   }
      // },

      // Diver Image
      {
        id: 'page11-diver-image',
        name: 'diver-image',
        type: 'container',
        coordinates: [20, questionBottom_Y, 1050, 650], // Same coordinates as setup image
        zIndex: 59, // Above setup image
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/diver10.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(0.75)',
          transformOrigin: 'center center',
        }
      },

      // Information Analysis Panel
      {
        id: 'page11-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page11.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page11.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page11.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page11.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', '')
        }
      },

      // Feedback Text Box Component
      {
        id: 'page11-feedback-textbox',
        name: 'feedback-textbox',
        type: 'custom', // Use 'custom' type for FeedbackTextboxComponent
        coordinates: [75, 630, 1050, 800], // Positioned below the setup image (setup image ends at y=650)
        zIndex: 65,
        props: {
          componentType: 'FeedbackTextboxComponent',
          text: getI18nText('pages.page11.feedbackText', ''),
          mode: 'summary',
          fontSize: '32gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          borderRadius: '10gc',
          boxSizing: 'border-box',
          allowHTML: true // Allow HTML for highlighting
        }
      },

      // Tap Animation GIF
      {
        id: 'page11-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page11-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895], // Same width as previous button (145 pixels)
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page11-next-button');
            return getNextButtonText(pageNumber);
          },
          fontSize: '28gc',
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page11-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page11-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page11-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page11-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page11-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],

    12: [

      // Question Text Box Component
      {
        id: 'page12-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page12.highlights', [])
        }
      },

      // Quiz Panel Component - QTI4R
      {
        id: 'page12-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page12-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTI4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page12.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          instructionFontSize: '34gc', // Font size for instruction/question text
          optionButtonFontSize: '26gc', // Font size for option button text
          optionButtonFontWeight: 200, // Font weight for option button text (default: 500)
          imageColumnWidth: 60, // Percentage width for image column (default for QTIS4R is 60%)
          // Image stack for QTI4R - removed

          imageStack: [],
          imageStackLayerReplacements: [], // Will be updated on click
          imageStackCoordinates: [20, 100, 950, 815], // Grid coordinates for image stack area
          // Options data for QTI4R (4 options in rows)
          options: [
            {
              text: getI18nText('pages.page12.quizPanel.options.0.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page12.quizPanel.options.0.feedback', ''),
            },
            {
              text: getI18nText('pages.page12.quizPanel.options.1.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page12.quizPanel.options.1.feedback', ''),
            },
            {
              text: getI18nText('pages.page12.quizPanel.options.2.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page12.quizPanel.options.2.feedback', ''),
            },
            {
              text: getI18nText('pages.page12.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page12.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },
      // measurement image
      {
        id: 'page12-measurement-image',
        name: 'page12-measurement-image',
        type: 'container',
        coordinates: [120, 210, 570, 620],
        zIndex: '999',
        props: {
          imageSrc: 'assets/measurementImage.jpeg',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },
     //image text
      {
        id: 'page12-image-text',
        name: 'page12-image-text',
        type: 'custom',
        coordinates: [100, 570, 590, 600], // Covers all equation components with padding, moved up 25gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          id: 'page12-image-text',
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Concept Summary Panel
      {
        id: 'page12-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page12.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page12.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page12.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page12.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', '')
        }
      },

      // Right Angle Triangle Component
      // {
      //   id: 'page12-right-triangle',
      //   name: 'right-triangle',
      //   type: 'custom',
      //   coordinates: [100, 175, 1000, 750], // Larger area for bigger triangle
      //   zIndex: 9999, // Highest z-index
      //   props: {
      //     componentType: 'RightAngleTriangleComponent',

      //     // Triangle configuration
      //     sides: [20, 15, 25], // Pythagorean triple
      //     multiplier: 25, // Scale up by 4x to make it bigger (60, 80, 100 gc units)
      //     rightAnglePosition: 'bottom-left',

      //     // Side styling
      //     side: {
      //       color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side [sideA, sideB, sideC] - Orange color
      //       width: '6gc', // Slightly thicker lines
      //       style: 'solid',
      //       lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
      //       showVertices: true, // Show vertex markers (circles) at line intersections
      //       vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
      //       vertexSize: '8gc', // Size of vertex markers
      //       blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
      //       blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
      //     },

      //     // Vertex label configuration
      //     vertexLabel: {
      //       show: true,
      //       labels: ['A', 'B', 'C'],
      //       color: '#ffffff',
      //       fontSize: '30gc', // Larger labels
      //       fontStyle: 'normal',
      //       fontWeight: 'bold',
      //       fontFamily: 'inherit',
      //       textDecoration: 'none',
      //       offset: [20, 20, 20], // Individual offsets for each vertex [A, B, C] in grid units
      //       rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
      //     },

      //     // Side label configuration
      //     sideLabel: {
      //       show: true,
      //       labels: ['20 m', '15 m', '25 m'],
      //       color: ['var(--color-orange)', 'var(--color-orange)', 'var(--color-orange)'], // Individual colors for each side label [sideA, sideB, sideC]
      //       fontSize: '30gc', // Larger side labels
      //       fontStyle: 'italic',
      //       fontWeight: 'normal',
      //       fontFamily: 'inherit',
      //       textDecoration: 'none',
      //       offset: [50, 40, 30], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
      //       rotation: [-90, 0, 60], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
      //       // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
      //       backgroundColor: 'transparent', // Background color
      //       borderColor: 'transparent', // Border color
      //       borderWidth: '0', // Border width
      //       borderRadius: '3px', // Border radius
      //       padding: '2px 6px', // Padding
      //       blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
      //       blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
      //     },

      //     // Right angle marker configuration
      //     rightAngleMarker: {
      //       show: true,
      //       size: '20gc', // Larger marker
      //       color: '#FF6600' // Orange marker to match sides
      //     }
      //   }
      // },

      // Tap Animation GIF
      {
        id: 'page12-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page12-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page12-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page12-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page12-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page12-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page12-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page12-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],
    13: [

      // Question Text Box Component
      {
        id: 'page13-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', ''),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', ''),
          highlights: getI18nText('pages.page13.highlights', [])
        }
      },

      // Quiz Panel Component - QTI4R
      {
        id: 'page13-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page13-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTI4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page13.quizPanel.questionText', ''),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 20%
          optionsRowHeight: 60, // Options row: 60%
          feedbackRowHeight: 20, // Feedback row: 20%
          instructionFontSize: '34gc', // Font size for instruction/question text
          optionButtonFontSize: '26gc', // Font size for option button text
          optionButtonFontWeight: 200, // Font weight for option button text (default: 500)
          imageColumnWidth: 60, // Percentage width for image column (default for QTIS4R is 60%)
          imageText: "",
          imageStack: [],
          image: '',
          imageStackLayerReplacements: [], // Will be updated on click
          imageStackCoordinates: [20, 100, 950, 815], // Grid coordinates for image stack area
          // Options data for QTI4R (4 options in rows)
          options: [
            {
              text: getI18nText('pages.page13.quizPanel.options.0.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page13.quizPanel.options.0.feedback', ''),
            },
            {
              text: getI18nText('pages.page13.quizPanel.options.1.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page13.quizPanel.options.1.feedback', ''),
            },
            {
              text: getI18nText('pages.page13.quizPanel.options.2.text', ''),
              iscorrect: true,
              feedback: getI18nText('pages.page13.quizPanel.options.2.feedback', ''),
            },
            {
              text: getI18nText('pages.page13.quizPanel.options.3.text', ''),
              iscorrect: false,
              feedback: getI18nText('pages.page13.quizPanel.options.3.feedback', ''),
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },
      
      //page3-trinagle-and-measuremnt-image
      {
        id: 'page3-trinagle-and-measuremnt-image',
        name: 'page3-trinagle-and-measuremnt-image',
        type: 'custom',
        coordinates: [200, 260, 500, 660], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-trinagle-and-measuremnt-image',
          elementName: 'page3-trinagle-and-measuremnt-image',
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: 'assets/diver11.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },
            {
              src: 'assets/measurementImage.jpeg',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [120, 210, 570, 620]  // Image 3 
            },
          ],
          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        }
      },
      //image text
      {
        id: 'page13-image-text',
        name: 'page13-image-text',
        type: 'custom',
        coordinates: [50, 580, 670, 610], // Covers all equation components with padding, moved up 25gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          id: 'page13-image-text',
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Concept Summary Panel
      {
        id: 'page13-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page13.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page13.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page13.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page13.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', '')
        }
      },

      // // // // Right Angle Triangle Component
      // {
      //   id: 'page13-right-triangle',
      //   name: 'right-triangle',
      //   type: 'custom',
      //   coordinates: [100, 175, 1000, 750], // Larger area for bigger triangle
      //   zIndex: 9999, // Highest z-index
      //   props: {
      //     componentType: 'RightAngleTriangleComponent',

      //     // Triangle configuration
      //     sides: [20, 15, 25], // Pythagorean triple
      //     multiplier: 25, // Scale up by 4x to make it bigger (60, 80, 100 gc units)
      //     rightAnglePosition: 'bottom-left',

      //     // Side styling
      //     side: {
      //       color: ['#FF6600', '#FF6600', '#FF6600'], // Individual colors for each side [sideA, sideB, sideC] - Orange color
      //       width: '6gc', // Slightly thicker lines
      //       style: 'solid',
      //       lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
      //       showVertices: false, // Show vertex markers (circles) at line intersections
      //       vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
      //       vertexSize: '8gc', // Size of vertex markers
      //       blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
      //       blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
      //     },

      //     // Vertex label configuration
      //     vertexLabel: {
      //       show: true,
      //       labels: ['A', 'B', 'C'],
      //       color: '#ffffff',
      //       fontSize: '30gc', // Larger labels
      //       fontStyle: 'normal',
      //       fontWeight: 'bold',
      //       fontFamily: 'inherit',
      //       textDecoration: 'none',
      //       offset: [20, 20, 20], // Individual offsets for each vertex [A, B, C] in grid units
      //       rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
      //     },

      //     // Side label configuration
      //     sideLabel: {
      //       show: true,
      //       labels: ['20 m', '15 m', '25 m'],
      //       color: ['var(--color-orange)', 'var(--color-orange)', 'var(--color-orange)'], // Individual colors for each side label [sideA, sideB, sideC]
      //       fontSize: '30gc', // Larger side labels
      //       fontStyle: 'italic',
      //       fontWeight: 'normal',
      //       fontFamily: 'inherit',
      //       textDecoration: 'none',
      //       offset: [50, 40, 30], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
      //       rotation: [-90, 0, 60], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
      //       // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
      //       backgroundColor: 'transparent', // Background color
      //       borderColor: 'transparent', // Border color
      //       borderWidth: '0', // Border width
      //       borderRadius: '3px', // Border radius
      //       padding: '2px 6px', // Padding
      //       blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
      //       blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
      //     },

      //     // Right angle marker configuration
      //     rightAngleMarker: {
      //       show: true,
      //       size: '20gc', // Larger marker
      //       color: '#FF6600' // Orange marker to match sides
      //     }
      //   }
      // },

      // Tap Animation GIF
      {
        id: 'page13-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAlt', '')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page13-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page13-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page13-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', 'Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page13-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page13-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page13-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

      {
        id: 'page13-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 12
        }
      }
    ],
  };
};

// ===== INITIALIZATION AND EXPORT =====

/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log("🚀 Initializing PageConfig");

  // Create GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();

  // Make available globally
  if (typeof window !== "undefined") {
    // Store the page configuration globally
    window.GridPositionPages = optimizedPages;
    window.gridPositions = window.GridPositionPages;

    // Expose page navigation configuration globally
    window.pageNavigation = pageNavigation;

    // Expose page mapping functions globally
    window.getPageNumbers = getPageNumbers;
    window.getPageFromDotPosition = getPageFromDotPosition;
    window.getDotPositionFromPage = getDotPositionFromPage;

    // Initialize essential window functions
    console.log("🔄 [PageConfig] Initializing window functions...");

    try {
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log(
            "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)"
          );
          console.log(
            "🔄 [Navigation] Treating as APP RELOAD with next question"
          );

          // Simplified navigation - always reset to 0
          const currentIndex =
            typeof window !== "undefined" && window.currentQuestionIndex !== undefined
              ? window.currentQuestionIndex
              : 0;
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset", "")
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log(
            "✅ [Navigation] Updated window.currentQuestionIndex to:",
            newIndex
          );

          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;

          // Clear all component state stores
          if (typeof window !== "undefined") {
            // Clear quiz panel states
            if (window.quizPanelStateStore) {
              window.quizPanelStateStore = {};
              console.log("✅ [Navigation] Cleared quizPanelStateStore");
            }

            // Clear fill blanks states
            if (window.fillBlanksStateStore) {
              window.fillBlanksStateStore = {};
              console.log("✅ [Navigation] Cleared fillBlanksStateStore");
            }

            // Clear calculation steps states
            if (window.calculationStepsStateStore) {
              window.calculationStepsStateStore = {};
              console.log("✅ [Navigation] Cleared calculationStepsStateStore");
            }

            // Clear any other state stores that might exist
            if (window.stageComponentStateStore) {
              window.stageComponentStateStore = {};
              console.log("✅ [Navigation] Cleared stageComponentStateStore");
            }
          }

          console.log(
            "✅ [Navigation]",
            getI18nText("messages.navigationComplete", "")
          );

          // Navigate to page 1
          if (typeof window !== "undefined") {
            if (window.changePageAndNotify) {
              window.changePageAndNotify(1);
              console.log("✅ [Navigation] Navigated to page 1 via changePageAndNotify");
            } else if (window.navigateToPage) {
              window.navigateToPage(1);
              console.log("✅ [Navigation] Navigated to page 1 via navigateToPage");
            } else {
              // Fallback: dispatch page change event
              window.dispatchEvent(
                new CustomEvent("pageChanged", { detail: { page: 1 } })
              );
              console.log("✅ [Navigation] Dispatched page change event to page 1");
            }
          }

          resolve(newIndex);
        });
      };

      const updateQuestionDependentElements = () => {
        console.log("🔄 [UI] Updating question-dependent elements");

        // Trigger React re-render by forcing app update
        if (typeof window.forceAppUpdate === "function") {
          window.forceAppUpdate();
          console.log("✅ [UI] Triggered React re-render via forceAppUpdate");
        } else {
          console.warn(
            "⚠️ [UI] forceAppUpdate not available, React may not re-render"
          );
        }

        // Page 2 removed - no longer needed

        console.log("✅ [UI] updateQuestionDependentElements completed");
      };

      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText("buttons.startOver", "");
      };

      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;

      console.log("✅ [PageConfig] Direct function assignment completed");
      console.log(
        "🔍 [PageConfig] window.advanceToNextQuestion type:",
        typeof window.advanceToNextQuestion
      );
      console.log(
        "🔍 [PageConfig] window.updateQuestionDependentElements type:",
        typeof window.updateQuestionDependentElements
      );
    } catch (error) {
      console.error(
        "❌ [PageConfig] Error in direct function assignment:",
        error
      );
    }

    // Add global function to manually clear page states (for testing)
    window.clearAllPageStates = () => {
      console.log("🧹 [PageConfig] Manually clearing page states");
      try {
        // Reset global variables
        window.page1complete = false;
        window.objectsremoved = 0;
        window.currentQuestionIndex = 0;

        console.log("✅ [PageConfig] Page states cleared successfully");

        // Reload the page to start fresh
        if (
          confirm(
            getI18nText(
              "messages.pageStatesCleared",
              "Page states have been cleared. Reload the page to start fresh?"
            )
          )
        ) {
          window.location.reload();
        }
      } catch (error) {
        console.error("❌ [PageConfig] Error clearing page states:", error);
      }
    };

    // Function to copy text from source element to destination element by ID
    // sourceId: ID of the element to read text from (e.g., 'page2-map-table-R1C1' - a table cell)
    // destinationId: ID of the element to update (e.g., 'page2-number-pad' - number pad target, or any other element ID)
    window.updateTargetIDText = (sourceId, destinationId, retryCount = 0) => {
      try {
        const maxRetries = 5;
        const retryDelay = 200;

        const attemptUpdate = () => {
          const sourceElement = document.getElementById(sourceId);

          if (sourceElement) {
            const sourceText = sourceElement.textContent?.trim() || sourceElement.innerText?.trim() || '';
            console.log(`🎯 [PageConfig] Reading text from source ${sourceId}:`, sourceText);

            // Try to update number pad target first (if destination is a number pad)
            if (window.numberPadCallbacks && window.numberPadCallbacks[destinationId]) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(`✅ [PageConfig] Updated number pad ${destinationId} target to:`, sourceText);
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(`✅ [PageConfig] Updated element ${destinationId} text to:`, sourceText);
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(`🔄 [PageConfig] Destination element ${destinationId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
                setTimeout(() => {
                  window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
                }, retryDelay);
              } else {
                console.warn(`⚠️ [PageConfig] Destination element not found: ${destinationId} after ${maxRetries} retries`);
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(`🔄 [PageConfig] Source element ${sourceId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
              setTimeout(() => {
                window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
              }, retryDelay);
            } else {
              console.warn(`⚠️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries`);
            }
          }
        };

        // Initial delay to ensure DOM is ready
        if (retryCount === 0) {
          setTimeout(attemptUpdate, retryDelay);
        } else {
          attemptUpdate();
        }
      } catch (error) {
        console.error('❌ [PageConfig] Error updating target text:', error);
      }
    };

    // Listen for page changes to update number pad target on page 2
    // DISABLED: Elements don't exist in this applet
    /*
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          window.updateTargetIDText('page2-map-table-R1C1', 'page2-number-pad');
        }
      });
    }
    */

    console.log(
      "✅ PageConfig initialized - pages and functions available globally"
    );
    console.log(
      "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states"
    );
    console.log(
      "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element"
    );
  }

  return optimizedPages;
};

// Initialize immediately
console.log("🔄 [PageConfig] About to call initializePageConfig...");
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  "🔄 [PageConfig] initializePageConfig completed, result:",
  typeof OptimizedGridPositionPages
);

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    OptimizedGridPositionPages,
  };
} else {
  // Browser global export
  window.PageConfigOptimized = {
    OptimizedGridPositionPages,
  };
}

console.log("🎉 PageConfig optimization complete!");
