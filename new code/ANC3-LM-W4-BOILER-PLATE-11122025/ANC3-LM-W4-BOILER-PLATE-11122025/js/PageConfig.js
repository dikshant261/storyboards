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
  5: { prev: 4, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: 9 },
  // Test pages for new multiplication grid modes
  9: { prev: 8, next: 10 },   // Practice mode test
  10: { prev: 9, next: 11 },  // Guided mode test
  11: { prev: 10, next: 12 }, // Animation mode test
  12: { prev: 11, next: 13 }, // DragDrop mode test
  // Test pages for long division grid modes
  13: { prev: 12, next: 14 }, // Division Default mode test
  14: { prev: 13, next: 15 }, // Division SpotIncorrect mode test
  15: { prev: 14, next: 16 }, // Division Input mode test
  16: { prev: 15, next: 17 }, // Division Practice mode test
  17: { prev: 16, next: 18 }, // Division Guided mode test
  18: { prev: 17, next: 19 }, // Division Animation mode test
  19: { prev: 18, next: null }, // Division DragDrop mode test
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
    return getI18nText("buttons.startOver", "Start Over");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next", "»");
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

  const questionBottom_Y = 200;
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
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page1.highlights', [])
          }
      },

      // Instruction Text Box
      {
        id: 'page1-instruction-textbox',
        name: 'instruction-textbox',
        type: 'custom',
        coordinates: [200, questionBottom_Y + 100, 1400, questionBottom_Y + 400], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.instructionText', "Let's find the length of the wire, without actually measuring it."),
          backgroundColor: 'transparent',
          border: '4gc dashed white',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc'
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
          imageAlt: 'Tap'
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
                        }
                    } else if (nav && nav.next === null) {
                        // On last page, "Start Over" functionality
                        console.log('🔄 [Next Button] Last page - Starting over');
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
                    return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
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
                totalPages: 19
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
          text: getI18nText('common.questionText', 'A right triangle has a hypotenuse length of 34 cm and one of the right sides is 16 cm.The length of the other right side is…<br>&emsp;a. 30 cm&emsp;&emsp;&emsp;b. 29 cm<br>&emsp;c. 31 cm&emsp;&emsp;&emsp;d. 21 cm'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
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
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Chicken images - 12 images in 4x3 grid (4 columns, 3 rows)
      // Row 1 (225 to 400)
      {
        id: 'page2-chicken-1',
        name: 'chicken-1',
        type: 'custom',
        coordinates: [20, 225, 290, 400],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-1',
          elementName: 'page2-chicken-1',
          currentPage: 2,
          coordinates: [20, 225, 290, 400],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-2',
        name: 'chicken-2',
        type: 'custom',
        coordinates: [290, 225, 560, 400],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-2',
          elementName: 'page2-chicken-2',
          currentPage: 2,
          coordinates: [290, 225, 560, 400],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-3',
        name: 'chicken-3',
        type: 'custom',
        coordinates: [560, 225, 830, 400],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-3',
          elementName: 'page2-chicken-3',
          currentPage: 2,
          coordinates: [560, 225, 830, 400],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-4',
        name: 'chicken-4',
        type: 'custom',
        coordinates: [830, 225, 1100, 400],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-4',
          elementName: 'page2-chicken-4',
          currentPage: 2,
          coordinates: [830, 225, 1100, 400],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Row 2 (400 to 575)
      {
        id: 'page2-chicken-5',
        name: 'chicken-5',
        type: 'custom',
        coordinates: [20, 400, 290, 575],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-5',
          elementName: 'page2-chicken-5',
          currentPage: 2,
          coordinates: [20, 400, 290, 575],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-6',
        name: 'chicken-6',
        type: 'custom',
        coordinates: [290, 400, 560, 575],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-6',
          elementName: 'page2-chicken-6',
          currentPage: 2,
          coordinates: [290, 400, 560, 575],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-7',
        name: 'chicken-7',
        type: 'custom',
        coordinates: [560, 400, 830, 575],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-7',
          elementName: 'page2-chicken-7',
          currentPage: 2,
          coordinates: [560, 400, 830, 575],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-8',
        name: 'chicken-8',
        type: 'custom',
        coordinates: [830, 400, 1100, 575],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-8',
          elementName: 'page2-chicken-8',
          currentPage: 2,
          coordinates: [830, 400, 1100, 575],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Row 3 (575 to 750)
      {
        id: 'page2-chicken-9',
        name: 'chicken-9',
        type: 'custom',
        coordinates: [20, 575, 290, 750],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-9',
          elementName: 'page2-chicken-9',
          currentPage: 2,
          coordinates: [20, 575, 290, 750],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-10',
        name: 'chicken-10',
        type: 'custom',
        coordinates: [290, 575, 560, 750],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-10',
          elementName: 'page2-chicken-10',
          currentPage: 2,
          coordinates: [290, 575, 560, 750],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-11',
        name: 'chicken-11',
        type: 'custom',
        coordinates: [560, 575, 830, 750],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-11',
          elementName: 'page2-chicken-11',
          currentPage: 2,
          coordinates: [560, 575, 830, 750],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page2-chicken-12',
        name: 'chicken-12',
        type: 'custom',
        coordinates: [830, 575, 1100, 750],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-chicken-12',
          elementName: 'page2-chicken-12',
          currentPage: 2,
          coordinates: [830, 575, 1100, 750],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 3'));
                        }
                    } else if (nav && nav.next === null) {
                        // On last page, "Start Over" functionality
                        console.log('🔄 [Next Button] Last page - Starting over');
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
                    return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
                totalPages: 19
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
          text: getI18nText('common.questionText', 'A right triangle has a hypotenuse length of 34 cm and one of the right sides is 16 cm.The length of the other right side is…<br>&emsp;a. 30 cm&emsp;&emsp;&emsp;b. 29 cm<br>&emsp;c. 31 cm&emsp;&emsp;&emsp;d. 21 cm'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page3.highlights', [])
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
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Chicken image (center)
      {
        id: 'page3-chicken',
        name: 'chicken',
        type: 'custom',
        coordinates: [500, 400, 700, 600],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-chicken',
          elementName: 'page3-chicken',
          currentPage: 3,
          coordinates: [500, 400, 700, 600],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },

      // Chicken food images (3 to the right of chicken in triangle format)
      // Top-right (triangle top)
      {
        id: 'page3-chickenfood-1',
        name: 'chickenfood-1',
        type: 'custom',
        coordinates: [750, 350, 850, 450],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-chickenfood-1',
          elementName: 'page3-chickenfood-1',
          currentPage: 3,
          coordinates: [750, 350, 850, 450],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Middle-right (triangle middle)
      {
        id: 'page3-chickenfood-2',
        name: 'chickenfood-2',
        type: 'custom',
        coordinates: [800, 450, 900, 550],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-chickenfood-2',
          elementName: 'page3-chickenfood-2',
          currentPage: 3,
          coordinates: [800, 450, 900, 550],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Bottom-right (triangle bottom)
      {
        id: 'page3-chickenfood-3',
        name: 'chickenfood-3',
        type: 'custom',
        coordinates: [750, 550, 850, 650],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-chickenfood-3',
          elementName: 'page3-chickenfood-3',
          currentPage: 3,
          coordinates: [750, 550, 850, 650],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 4'));
                        }
                    } else if (nav && nav.next === null) {
                        // On last page, "Start Over" functionality
                        console.log('🔄 [Next Button] Last page - Starting over');
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
                    return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
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
                totalPages: 19
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
          text: getI18nText('common.questionText', 'A right triangle has a hypotenuse length of 34 cm and one of the right sides is 16 cm.The length of the other right side is…<br>&emsp;a. 30 cm&emsp;&emsp;&emsp;b. 29 cm<br>&emsp;c. 31 cm&emsp;&emsp;&emsp;d. 21 cm'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page4.highlights', [])
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
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // 12 Chicken images with food bowls - showing the question "12 chickens, how many food bowls?"
      // Scaled down with gaps to prevent overlap, centered between x=0-1050 and y=200-750
      // Row 1 (y=255-380)
      // Column 1 (x=100-300)
      // Chicken 1 and its 3 bowls
      {
        id: 'page4-chicken-1',
        name: 'chicken-1',
        type: 'custom',
        coordinates: [105, 255, 215, 355],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-1',
          elementName: 'page4-chicken-1',
          currentPage: 4,
          coordinates: [105, 255, 215, 355],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-1-1',
        name: 'chickenfood-1-1',
        type: 'custom',
        coordinates: [225, 240, 255, 270],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-1-1',
          elementName: 'page4-chickenfood-1-1',
          currentPage: 4,
          coordinates: [225, 240, 255, 270],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-1-2',
        name: 'chickenfood-1-2',
        type: 'custom',
        coordinates: [255, 295, 285, 325],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-1-2',
          elementName: 'page4-chickenfood-1-2',
          currentPage: 4,
          coordinates: [255, 295, 285, 325],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-1-3',
        name: 'chickenfood-1-3',
        type: 'custom',
        coordinates: [225, 340, 255, 370],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-1-3',
          elementName: 'page4-chickenfood-1-3',
          currentPage: 4,
          coordinates: [225, 340, 255, 370],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 2 (x=240-440)
      // Chicken 2 and its 3 bowls
      {
        id: 'page4-chicken-2',
        name: 'chicken-2',
        type: 'custom',
        coordinates: [325, 255, 435, 355],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-2',
          elementName: 'page4-chicken-2',
          currentPage: 4,
          coordinates: [325, 255, 435, 355],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-2-1',
        name: 'chickenfood-2-1',
        type: 'custom',
        coordinates: [445, 240, 475, 270],
        zIndex: 55,
            props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-2-1',
          elementName: 'page4-chickenfood-2-1',
          currentPage: 4,
          coordinates: [445, 240, 475, 270],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-2-2',
        name: 'chickenfood-2-2',
        type: 'custom',
        coordinates: [475, 295, 505, 325],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-2-2',
          elementName: 'page4-chickenfood-2-2',
          currentPage: 4,
          coordinates: [475, 295, 505, 325],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-2-3',
        name: 'chickenfood-2-3',
        type: 'custom',
        coordinates: [445, 340, 475, 370],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-2-3',
          elementName: 'page4-chickenfood-2-3',
          currentPage: 4,
          coordinates: [445, 340, 475, 370],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 3 (x=460-660)
      // Chicken 3 and its 3 bowls
      {
        id: 'page4-chicken-3',
        name: 'chicken-3',
        type: 'custom',
        coordinates: [545, 255, 655, 355],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-3',
          elementName: 'page4-chicken-3',
          currentPage: 4,
          coordinates: [545, 255, 655, 355],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-3-1',
        name: 'chickenfood-3-1',
        type: 'custom',
        coordinates: [665, 240, 695, 270],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-3-1',
          elementName: 'page4-chickenfood-3-1',
          currentPage: 4,
          coordinates: [665, 240, 695, 270],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-3-2',
        name: 'chickenfood-3-2',
        type: 'custom',
        coordinates: [695, 295, 725, 325],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-3-2',
          elementName: 'page4-chickenfood-3-2',
          currentPage: 4,
          coordinates: [695, 295, 725, 325],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-3-3',
        name: 'chickenfood-3-3',
        type: 'custom',
        coordinates: [665, 340, 695, 370],
        zIndex: 55,
            props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-3-3',
          elementName: 'page4-chickenfood-3-3',
          currentPage: 4,
          coordinates: [665, 340, 695, 370],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 4 (x=680-880)
      // Chicken 4 and its 3 bowls
      {
        id: 'page4-chicken-4',
        name: 'chicken-4',
        type: 'custom',
        coordinates: [765, 255, 875, 355],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-4',
          elementName: 'page4-chicken-4',
          currentPage: 4,
          coordinates: [765, 255, 875, 355],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-4-1',
        name: 'chickenfood-4-1',
        type: 'custom',
        coordinates: [885, 240, 915, 270],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-4-1',
          elementName: 'page4-chickenfood-4-1',
          currentPage: 4,
          coordinates: [885, 240, 915, 270],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-4-2',
        name: 'chickenfood-4-2',
        type: 'custom',
        coordinates: [915, 295, 945, 325],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-4-2',
          elementName: 'page4-chickenfood-4-2',
          currentPage: 4,
          coordinates: [915, 295, 945, 325],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-4-3',
        name: 'chickenfood-4-3',
        type: 'custom',
        coordinates: [885, 340, 915, 370],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-4-3',
          elementName: 'page4-chickenfood-4-3',
          currentPage: 4,
          coordinates: [885, 340, 915, 370],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Row 2 (y=430-555)
      // Column 1 (x=100-300)
      // Chicken 5 and its 3 bowls
      {
        id: 'page4-chicken-5',
        name: 'chicken-5',
        type: 'custom',
        coordinates: [105, 430, 215, 530],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-5',
          elementName: 'page4-chicken-5',
          currentPage: 4,
          coordinates: [105, 430, 215, 530],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-5-1',
        name: 'chickenfood-5-1',
        type: 'custom',
        coordinates: [225, 415, 255, 445],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-5-1',
          elementName: 'page4-chickenfood-5-1',
          currentPage: 4,
          coordinates: [225, 415, 255, 445],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-5-2',
        name: 'chickenfood-5-2',
        type: 'custom',
        coordinates: [255, 470, 285, 500],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-5-2',
          elementName: 'page4-chickenfood-5-2',
          currentPage: 4,
          coordinates: [255, 470, 285, 500],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-5-3',
        name: 'chickenfood-5-3',
        type: 'custom',
        coordinates: [225, 515, 255, 545],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-5-3',
          elementName: 'page4-chickenfood-5-3',
          currentPage: 4,
          coordinates: [225, 515, 255, 545],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 2 (x=240-440)
      // Chicken 6 and its 3 bowls
      {
        id: 'page4-chicken-6',
        name: 'chicken-6',
        type: 'custom',
        coordinates: [325, 430, 435, 530],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-6',
          elementName: 'page4-chicken-6',
          currentPage: 4,
          coordinates: [325, 430, 435, 530],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-6-1',
        name: 'chickenfood-6-1',
        type: 'custom',
        coordinates: [445, 415, 475, 445],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-6-1',
          elementName: 'page4-chickenfood-6-1',
          currentPage: 4,
          coordinates: [445, 415, 475, 445],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-6-2',
        name: 'chickenfood-6-2',
        type: 'custom',
        coordinates: [475, 470, 505, 500],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-6-2',
          elementName: 'page4-chickenfood-6-2',
          currentPage: 4,
          coordinates: [475, 470, 505, 500],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-6-3',
        name: 'chickenfood-6-3',
        type: 'custom',
        coordinates: [445, 515, 475, 545],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-6-3',
          elementName: 'page4-chickenfood-6-3',
          currentPage: 4,
          coordinates: [445, 515, 475, 545],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 3 (x=460-660)
      // Chicken 7 and its 3 bowls
      {
        id: 'page4-chicken-7',
        name: 'chicken-7',
        type: 'custom',
        coordinates: [545, 430, 655, 530],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-7',
          elementName: 'page4-chicken-7',
          currentPage: 4,
          coordinates: [545, 430, 655, 530],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-7-1',
        name: 'chickenfood-7-1',
        type: 'custom',
        coordinates: [665, 415, 695, 445],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-7-1',
          elementName: 'page4-chickenfood-7-1',
          currentPage: 4,
          coordinates: [665, 415, 695, 445],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-7-2',
        name: 'chickenfood-7-2',
        type: 'custom',
        coordinates: [695, 470, 725, 500],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-7-2',
          elementName: 'page4-chickenfood-7-2',
          currentPage: 4,
          coordinates: [695, 470, 725, 500],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-7-3',
        name: 'chickenfood-7-3',
        type: 'custom',
        coordinates: [665, 515, 695, 545],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-7-3',
          elementName: 'page4-chickenfood-7-3',
          currentPage: 4,
          coordinates: [665, 515, 695, 545],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 4 (x=680-880)
      // Chicken 8 and its 3 bowls
      {
        id: 'page4-chicken-8',
        name: 'chicken-8',
        type: 'custom',
        coordinates: [765, 430, 875, 530],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-8',
          elementName: 'page4-chicken-8',
          currentPage: 4,
          coordinates: [765, 430, 875, 530],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-8-1',
        name: 'chickenfood-8-1',
        type: 'custom',
        coordinates: [885, 415, 915, 445],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-8-1',
          elementName: 'page4-chickenfood-8-1',
          currentPage: 4,
          coordinates: [885, 415, 915, 445],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-8-2',
        name: 'chickenfood-8-2',
        type: 'custom',
        coordinates: [915, 470, 945, 500],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-8-2',
          elementName: 'page4-chickenfood-8-2',
          currentPage: 4,
          coordinates: [915, 470, 945, 500],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-8-3',
        name: 'chickenfood-8-3',
        type: 'custom',
        coordinates: [885, 515, 915, 545],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-8-3',
          elementName: 'page4-chickenfood-8-3',
          currentPage: 4,
          coordinates: [885, 515, 915, 545],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Row 3 (y=605-730)
      // Column 1 (x=100-300)
      // Chicken 9 and its 3 bowls
      {
        id: 'page4-chicken-9',
        name: 'chicken-9',
        type: 'custom',
        coordinates: [105, 605, 215, 705],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-9',
          elementName: 'page4-chicken-9',
          currentPage: 4,
          coordinates: [105, 605, 215, 705],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-9-1',
        name: 'chickenfood-9-1',
        type: 'custom',
        coordinates: [225, 590, 255, 620],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-9-1',
          elementName: 'page4-chickenfood-9-1',
          currentPage: 4,
          coordinates: [225, 590, 255, 620],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-9-2',
        name: 'chickenfood-9-2',
        type: 'custom',
        coordinates: [255, 645, 285, 675],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-9-2',
          elementName: 'page4-chickenfood-9-2',
          currentPage: 4,
          coordinates: [255, 645, 285, 675],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-9-3',
        name: 'chickenfood-9-3',
        type: 'custom',
        coordinates: [225, 690, 255, 720],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-9-3',
          elementName: 'page4-chickenfood-9-3',
          currentPage: 4,
          coordinates: [225, 690, 255, 720],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 2 (x=240-440)
      // Chicken 10 and its 3 bowls
      {
        id: 'page4-chicken-10',
        name: 'chicken-10',
        type: 'custom',
        coordinates: [325, 605, 435, 705],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-10',
          elementName: 'page4-chicken-10',
          currentPage: 4,
          coordinates: [325, 605, 435, 705],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-10-1',
        name: 'chickenfood-10-1',
        type: 'custom',
        coordinates: [445, 590, 475, 620],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-10-1',
          elementName: 'page4-chickenfood-10-1',
          currentPage: 4,
          coordinates: [445, 590, 475, 620],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-10-2',
        name: 'chickenfood-10-2',
        type: 'custom',
        coordinates: [475, 645, 505, 675],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-10-2',
          elementName: 'page4-chickenfood-10-2',
          currentPage: 4,
          coordinates: [475, 645, 505, 675],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-10-3',
        name: 'chickenfood-10-3',
        type: 'custom',
        coordinates: [445, 690, 475, 720],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-10-3',
          elementName: 'page4-chickenfood-10-3',
          currentPage: 4,
          coordinates: [445, 690, 475, 720],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 3 (x=460-660)
      // Chicken 11 and its 3 bowls
      {
        id: 'page4-chicken-11',
        name: 'chicken-11',
        type: 'custom',
        coordinates: [545, 605, 655, 705],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-11',
          elementName: 'page4-chicken-11',
          currentPage: 4,
          coordinates: [545, 605, 655, 705],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-11-1',
        name: 'chickenfood-11-1',
        type: 'custom',
        coordinates: [665, 590, 695, 620],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-11-1',
          elementName: 'page4-chickenfood-11-1',
          currentPage: 4,
          coordinates: [665, 590, 695, 620],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-11-2',
        name: 'chickenfood-11-2',
        type: 'custom',
        coordinates: [695, 645, 725, 675],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-11-2',
          elementName: 'page4-chickenfood-11-2',
          currentPage: 4,
          coordinates: [695, 645, 725, 675],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-11-3',
        name: 'chickenfood-11-3',
        type: 'custom',
        coordinates: [665, 690, 695, 720],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-11-3',
          elementName: 'page4-chickenfood-11-3',
          currentPage: 4,
          coordinates: [665, 690, 695, 720],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      // Column 4 (x=680-880)
      // Chicken 12 and its 3 bowls
      {
        id: 'page4-chicken-12',
        name: 'chicken-12',
        type: 'custom',
        coordinates: [765, 605, 875, 705],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chicken-12',
          elementName: 'page4-chicken-12',
          currentPage: 4,
          coordinates: [765, 605, 875, 705],
          zIndex: 55,
          images: [{ src: 'assets/chicken.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-12-1',
        name: 'chickenfood-12-1',
        type: 'custom',
        coordinates: [885, 590, 915, 620],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-12-1',
          elementName: 'page4-chickenfood-12-1',
          currentPage: 4,
          coordinates: [885, 590, 915, 620],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-12-2',
        name: 'chickenfood-12-2',
        type: 'custom',
        coordinates: [915, 645, 945, 675],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-12-2',
          elementName: 'page4-chickenfood-12-2',
          currentPage: 4,
          coordinates: [915, 645, 945, 675],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
        }
      },
      {
        id: 'page4-chickenfood-12-3',
        name: 'chickenfood-12-3',
        type: 'custom',
        coordinates: [885, 690, 915, 720],
        zIndex: 55,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-chickenfood-12-3',
          elementName: 'page4-chickenfood-12-3',
          currentPage: 4,
          coordinates: [885, 690, 915, 720],
          zIndex: 55,
          images: [{ src: 'assets/chickenfood.png', blink: false, glow: false, hidden: false, opacity: 1.0 }]
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 5'));
                        }
                    } else if (nav && nav.next === null) {
                        // On last page, "Start Over" functionality
                        console.log('🔄 [Next Button] Last page - Starting over');
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
                    return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 3'));
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
                totalPages: 19
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
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page5.highlights', [])
        }
      },

      // Concept Summary Panel
      {
        id: 'page5-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page5.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page5.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page5.conceptSummary.facts', []),
          valueArray: [],
          headerText: getI18nText('components.conceptSummary.headerText', 'CONCEPT SUMMARY'),
          givenTitle: getI18nText('components.conceptSummary.givenTitle', 'Given'),
          toFindTitle: getI18nText('components.conceptSummary.toFindTitle', 'To Find'),
          keyConceptsTitle: getI18nText('components.conceptSummary.keyConceptsTitle', 'Key Concepts'),
          importantFormulaeTitle: getI18nText('components.conceptSummary.importantFormulaeTitle', 'Calculations'),
          componentHeader: '24gc',
          sectionHeader: '24gc',
          bodyTextSize: '20gc',
          bulletSize: '8gc'
        }
      },

      // Quiz Panel Component - QT4R (4 options in vertical layout)
      {
        id: 'page5-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1075, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText('pages.page5.quizPanel.questionText', "Total price to pay ="),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 75,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '26gc', // Font size for option button text (in gc units)
          // Options data for QT4R (4 options in vertical layout)
          options: [
            { 
              text: getI18nText('pages.page5.quizPanel.options.0.text', "(No. of chickens) × (Bowls consumed by chicken)"), 
              iscorrect: true, 
              feedback: getI18nText('pages.page5.quizPanel.options.0.feedback', "Correct! To find the total bowls needed, multiply the number of chickens by the bowls each chicken consumes."),
            },
            { 
              text: getI18nText('pages.page5.quizPanel.options.1.text', "(No. of chickens) + (Bowls consumed by chicken)"), 
              iscorrect: false, 
              feedback: getI18nText('pages.page5.quizPanel.options.1.feedback', "Incorrect. We need to multiply, not add, to find the total bowls needed."),
            },
            { 
              text: getI18nText('pages.page5.quizPanel.options.2.text', "(No. of chickens) - (Bowls consumed by chicken)"), 
              iscorrect: false, 
              feedback: getI18nText('pages.page5.quizPanel.options.2.feedback', "Incorrect. We need to multiply, not subtract, to find the total bowls needed."),
            },
            { 
              text: getI18nText('pages.page5.quizPanel.options.3.text', "None of the above"), 
              iscorrect: false, 
              feedback: getI18nText('pages.page5.quizPanel.options.3.feedback', "Incorrect. The correct answer is to multiply the number of chickens by the bowls consumed by each chicken."),
            }
          ],
          keyConcepts: [],
          impFormulae: getI18nText('pages.page5.quizPanel.impFormulae', [])
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
          imageAlt: 'Tap'
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 6'));
              }
                    } else if (nav && nav.next === null) {
                        // On last page, "Start Over" functionality
                        console.log('🔄 [Next Button] Last page - Starting over');
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
                    return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 4'));
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
                totalPages: 19
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
          const { currentIndex } = getCurrentQuestionData();
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset", "Resetting to question 1")
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

          console.log(
            "✅ [Navigation]",
            getI18nText(
              "messages.navigationComplete",
              "Complete app reset completed - ready for new question"
            )
          );
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
        return getI18nText("buttons.startOver", "Start Over");
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
