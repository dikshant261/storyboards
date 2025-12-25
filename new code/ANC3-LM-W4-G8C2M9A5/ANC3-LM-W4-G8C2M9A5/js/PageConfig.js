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
  3: { prev: 2, next: 6 },
  4: { prev: 3, next: 6 },
  5: { prev: 4, next: 6 },
  6: { prev: 3, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: null },
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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          textSize: questionTextSize,
          highlights: getI18nText('pages.page1.highlights', [])
        }
      },

      // Triangle Image
      {
        id: 'page1-triangle-image',
        name: 'triangle-image',
        type: 'container',
        coordinates: [200, 250, 800, 700], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/triangle-qs.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Ratio Problem Description Text Box
      {
        id: 'page1-ratio-problem-introduction',
        name: 'introduction-textbox',
        type: 'custom',
        coordinates: [100, 700, 1500, 800], // Positioned below question text box, moved down by 150
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.problemDescription', 'Let\'s find the value of x using the Pythagorean theorem.'),
          backgroundColor: 'transparent',
          border: '4gc dashed white',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc'
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
                    return getI18nText('buttons.next', '»');
                },
                onClick: () => {
            // Play sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
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
                onClick: () => {
                    if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('previous');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
                totalPages: 7
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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page2.highlights', [])
         }
       },

      // Triangle Image
      {
        id: 'page2-triangle-image',
        name: 'triangle-image',
        type: 'container',
        coordinates: [200, 300, 800, 750], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/triangle.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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

      // Optimized Next button - Three Layer Structure
        {
            id: 'page2-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.next', '»');
                },
                onClick: () => {
            // Play sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    
                    // Navigate to page 3
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                        window.changePageAndNotify(3);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(3);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 3 } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 3'));
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
                onClick: () => {
                    if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('previous');
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
                totalPages: 7
            }
        }
    ],

    3: [

      // Question Text Box Component
      {
        id: 'page3-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [0, 0, 1600, questionBottom_Y], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: 'QuestionComponent',
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page3.highlights', [])
          }
        },

      // Triangle Image
      {
        id: 'page3-triangle-image',
        name: 'triangle-image',
        type: 'container',
        coordinates: [200, 300, 800, 750], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/triangle.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Information Analysis Panel
      {
        id: 'page3-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned below question with better visibility
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

      // Optimized Next button - Three Layer Structure
        {
            id: 'page3-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.next', '»');
                },
                onClick: () => {
            // Play sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    
                    // Navigate to page 6
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                        window.changePageAndNotify(6);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(6);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 6 } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 6'));
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
                onClick: () => {
                    if (typeof window !== 'undefined' && window.playCarClickSound) {
                        window.playCarClickSound('previous');
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
                totalPages: 7
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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page4.highlights', [])
        }
      },

      // Triangle Image
      {
        id: 'page4-triangle-image',
        name: 'triangle-image',
        type: 'container',
        coordinates: [200, 300, 800, 750], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/triangle-2.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Information Analysis Panel
      {
        id: 'page4-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned below question with better visibility
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

      // Optimized Next button - Three Layer Structure
        {
            id: 'page4-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.next', '»');
                },
                onClick: () => {
            // Play sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    
                    // Navigate to page 6
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                        window.changePageAndNotify(6);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(6);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 6 } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage4', 'Dispatched page change event to page 6'));
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
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('previous');
            }
                    
                    // Navigate to page 3
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(3);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(3);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 3 } }));
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
                totalPages: 7
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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page5.highlights', [])
        }
      },

      // Triangle Image
      {
        id: 'page5-triangle-image',
        name: 'triangle-image',
        type: 'container',
        coordinates: [100, 300, 700, 750], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          get backgroundImage() {
            const lang = typeof i18n !== 'undefined' && i18n.getCurrentLanguage ? i18n.getCurrentLanguage() : (typeof AppData !== 'undefined' ? AppData.currentLanguage : 'en');
            const imageName = lang === 'id' ? 'triangle-3-id.png' : 'triangle-3-en.png';
            return `url(assets/${imageName})`;
          },
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Information Analysis Panel
      {
        id: 'page5-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText('pages.page5.informationAnalysis.facts', []),
          valueArray: getI18nText('pages.page5.informationAnalysis.values', []),
          toFindArray: getI18nText('pages.page5.informationAnalysis.toFind', []),
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Fill Blanks Component
      {
        id: 'page5-fill-blanks',
        name: 'page5-fill-blanks-component',
        type: 'custom',
        coordinates: [200, 300, 1090, 815],
        zIndex: 59,
        props: {
          componentType: 'FillBlanksComponent',
          get blanks() {
            return [
              { id: 'blank1', coordinate: [650, 390, 725, 465], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
              { id: 'blank2', coordinate: [575, 590, 650, 665], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
              { id: 'blank3', coordinate: [275, 415, 350, 490], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
            ];
          },
          blankBorderWidth: '3gc',
          blankBorderColor: '#FFA500',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'transparent',
          blankFontSize: '30gc',
          blankFontColor: '#000000',
          optionsContainerCoordinates: [800, questionBottom_Y, 1090, 815],
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#FFA500',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText('pages.page5.fillBlanks.instructionText', 'Drag the numbers to fill in the blanks on the triangle. Match each value to its correct position.'),
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#FFA500',
          optionButtonFontSize: '30gc',
          optionButtonFontColor: '#000000',
          optionButtonLayoutMode: 'auto',
          optionsRows: 3,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND',
          get options() {
            const optionsData = getI18nText('pages.page5.fillBlanks.options', []);
            return [
              { 
                id: optionsData[0]?.id || 'opt1', 
                text: optionsData[0]?.text || '', 
                image: '', 
                blankID: optionsData[0]?.blankID || 'blank1', 
                feedbackText: optionsData[0]?.feedbackText || '', 
              },
              { 
                id: optionsData[1]?.id || 'opt2', 
                text: optionsData[1]?.text || '', 
                image: '', 
                blankID: optionsData[1]?.blankID || 'blank2', 
                feedbackText: optionsData[1]?.feedbackText || '', 
              },
              { 
                id: optionsData[2]?.id || 'opt3', 
                text: optionsData[2]?.text || '', 
                image: '', 
                blankID: optionsData[2]?.blankID || 'blank3', 
                feedbackText: optionsData[2]?.feedbackText || '', 
              },
              { 
                id: optionsData[3]?.id || 'opt4', 
                text: optionsData[3]?.text || '', 
                image: '', 
                blankID: optionsData[3]?.blankID || null, 
                feedbackText: optionsData[3]?.feedbackText || '', 
              },
              { 
                id: optionsData[4]?.id || 'opt5', 
                text: optionsData[4]?.text || '', 
                image: '', 
                blankID: optionsData[4]?.blankID || null, 
                feedbackText: optionsData[4]?.feedbackText || '', 
              },
              { 
                id: optionsData[5]?.id || 'opt6', 
                text: optionsData[5]?.text || '', 
                image: '', 
                blankID: optionsData[5]?.blankID || null, 
                feedbackText: optionsData[5]?.feedbackText || '', 
              }
            ];
          }
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
                    return getI18nText('buttons.next', '»');
                },
                onClick: () => {
            // Play sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    
                    // Navigate to page 6
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                        window.changePageAndNotify(6);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(6);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 6 } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 6'));
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
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('previous');
            }
                    
                    // Navigate to page 4
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(4);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(4);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 4 } }));
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
                totalPages: 7
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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page6.highlights', [])
        }
      },

      // Triangle Image
      // {
      //   id: 'page6-triangle-image',
      //   name: 'triangle-image',
      //   type: 'container',
      //   coordinates: [50, 300, 650, 750], // Positioned on the left side
      //   zIndex: 58,
      //   props: {
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     padding: '0gc',
      //     backgroundImage: 'url(assets/triangle-4.png)',
      //     backgroundSize: 'contain',
      //     backgroundPosition: 'center',
      //     backgroundRepeat: 'no-repeat',
      //   }
      // },

      // Concept Summary Panel
      {
        id: 'page6-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page6.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page6.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page6.conceptSummary.facts', []),
          valueArray: (() => {
            const impFormulae = getI18nText('pages.page6.conceptSummary.impFormulae', []);
            // Convert string array to object array format expected by ConceptSummaryComponent
            return Array.isArray(impFormulae) ? impFormulae.map(formula => 
              typeof formula === 'string' 
                ? { text: formula, color: '#70ACC7' }
                : formula
            ) : [];
          })(),
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

      // Quiz Panel Component - QTI4R (4 options in vertical layout with image)
      {
        id: 'page6-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTI4R', // For MCQ: QTI4R (4 options in vertical layout with image)
          headerText: '',
          questionText: getI18nText('pages.page6.quizPanel.questionText', 'Choose the correct relationship.'),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 90,
          optionButtonHeight: 85,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '26gc', // Font size for option button text (in gc units)
          image: 'assets/triangle.png',
          imageText: '',
          // Options data for QTI4R (4 options in vertical layout)
          options: [
            { 
              text: getI18nText('pages.page6.quizPanel.options.0.text', 'a² = b² + c²'), 
              iscorrect: false, 
              feedback: getI18nText('pages.page6.quizPanel.options.0.feedback', "Incorrect: That's not right! Try again."),
            },
            { 
              text: getI18nText('pages.page6.quizPanel.options.1.text', 'c² = a² + b²'), 
              iscorrect: true, 
              feedback: getI18nText('pages.page6.quizPanel.options.1.feedback', 'Correct! That is the right answer.'),
            },
            { 
              text: getI18nText('pages.page6.quizPanel.options.2.text', 'b² = a² + c²'), 
              iscorrect: false, 
              feedback: getI18nText('pages.page6.quizPanel.options.2.feedback', "Incorrect: That's not right! Try again."),
            },
            { 
              text: getI18nText('pages.page6.quizPanel.options.3.text', 'a² = b² - c²'), 
              iscorrect: false, 
              feedback: getI18nText('pages.page6.quizPanel.options.3.feedback', "Incorrect: That's not right! Try again."),
            }
          ],
          keyConcepts: [],
          impFormulae: getI18nText('pages.page6.quizPanel.impFormulae', ['c² = a² + b²'])
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
                    return getI18nText('buttons.next', '»');
                },
                onClick: () => {
            // Play sound
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    
                    // Navigate to page 7
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                        window.changePageAndNotify(7);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(7);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 7 } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 7'));
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
                    return getI18nText('buttons.previous', '«');
                },
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('previous');
            }
                    
                    // Navigate to page 3
                    if (typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(3);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(3);
                        } else {
                            // Fallback: dispatch page change event
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 3 } }));
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 3'));
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
                totalPages: 7
            }
        }
    ],

    

    // 7: [

    //   // Question Text Box Component
    //   {
    //     id: 'page6-concept-summary-panel',
    //     name: 'concept-summary-panel',
    //     type: 'custom',
    //     coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
    //     zIndex: 60, // Higher z-index to ensure visibility
    //     props: {
    //       componentType: 'ConceptSummaryComponent',
    //       givenArray: getI18nText('pages.page6.conceptSummary.given', []),
    //       toFindArray: getI18nText('pages.page6.conceptSummary.toFind', []),
    //       factsArray: getI18nText('pages.page6.conceptSummary.facts', []),
    //       valueArray: (() => {
    //         const impFormulae = getI18nText('pages.page6.conceptSummary.impFormulae', []);
    //         // Convert string array to object array format expected by ConceptSummaryComponent
    //         return Array.isArray(impFormulae) ? impFormulae.map(formula => 
    //           typeof formula === 'string' 
    //             ? { text: formula, color: '#70ACC7' }
    //             : formula
    //         ) : [];
    //       })(),
    //       headerText: getI18nText('components.conceptSummary.headerText', 'CONCEPT SUMMARY'),
    //       givenTitle: getI18nText('components.conceptSummary.givenTitle', 'Given'),
    //       toFindTitle: getI18nText('components.conceptSummary.toFindTitle', 'To Find'),
    //       keyConceptsTitle: getI18nText('components.conceptSummary.keyConceptsTitle', 'Key Concepts'),
    //       importantFormulaeTitle: getI18nText('components.conceptSummary.importantFormulaeTitle', 'Calculations'),
    //       componentHeader: '24gc',
    //       sectionHeader: '24gc',
    //       bodyTextSize: '20gc',
    //       bulletSize: '8gc'
    //     }
    //   },

    //   // Expression text - "Total price to pay = (No. of chickens) × (Bowls consumed by chicken)"
    //   {
    //     id: 'page6-expression-text',
    //     name: 'expression-text',
    //     type: 'custom',
    //     coordinates: [20, questionBottom_Y + 20, 1075, questionBottom_Y + 120],
    //     zIndex: 60,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page6.expressionText', "Total price to pay = (No. of chickens) × (Bowls consumed by chicken)"),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '32gc',
    //       padding: '10gc',
    //       textAlign: 'center',
    //       lineHeight: '1.3'
    //     }
    //   },

    //   // Expression with blanks text - "Total price to pay ="
    //   {
    //     id: 'page6-expression-blanks-text',
    //     name: 'expression-blanks-text',
    //     type: 'custom',
    //     coordinates: [20, questionBottom_Y + 140, 380, questionBottom_Y + 240],
    //     zIndex: 60,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page6.expressionBlanksText', "Total price to pay ="),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '32gc',
    //       padding: '10gc',
    //       textAlign: 'left',
    //       lineHeight: '1.3'
    //     }
    //   },

    //   // Multiplication symbol "×" between blanks
    //   {
    //     id: 'page6-multiply-symbol',
    //     name: 'multiply-symbol',
    //     type: 'custom',
    //     coordinates: [510, questionBottom_Y + 150, 690, questionBottom_Y + 230],
    //     zIndex: 60,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page6.multiplySymbol', '×'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '40gc',
    //       padding: '0gc',
    //       textAlign: 'center',
    //       lineHeight: '1.0'
    //     }
    //   },

    //   // Fill Blanks Component for page 6 - 2 blanks for the expression
    //   {
    //     id: 'page6-fill-blanks',
    //     name: 'page6-fill-blanks-component',
    //     type: 'custom',
    //     coordinates: [20, questionBottom_Y + 140, 1075, 800],
    //     zIndex: 550,
    //     props: {
    //       componentType: 'FillBlanksComponent',
    //       get blanks() {
    //         const blankY1 = questionBottom_Y + 150;
    //         const blankY2 = questionBottom_Y + 230;
    //         return [
    //           // blank1: 12 (number of chickens) - positioned after "="
    //           { id: 'blank1', coordinate: [400, blankY1, 500, blankY2], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //           // blank2: 3 (bowls consumed) - positioned after "×"
    //           { id: 'blank2', coordinate: [700, blankY1, 800, blankY2], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //         ];
    //       },
    //       blankBorderWidth: '3gc',
    //       blankBorderColor: '#FFA500', // Orange border
    //       blankBorderType: 'dashed',
    //       blankBackgroundColor: 'transparent',
    //       blankFontSize: '24gc',
    //       blankFontColor: '#000000',
    //       optionsContainerCoordinates: [25, 500, 1100, 700],
    //       optionsBorderWidth: '0gc',
    //       optionsBorderColor: 'transparent',
    //       optionsBorderType: 'solid',
    //       optionsBackgroundColor: 'transparent',
    //       showOptionsContainer: true,
    //       showOptionsContainerBorder: false,
    //       showOptionsRowBorders: false,
    //       optionContainerInstructionHeight: 0,
    //       optionContainerInstructionText: getI18nText('pages.page6.fillBlanks.instructionText', 'Drag and drop the options to complete the mathematical sentence.'),
    //       optionContainerInstructionTextColor: '#ffffff',
    //       optionButtonColor: '#FFA500',
    //       optionButtonFontSize: '24gc',
    //       optionButtonFontColor: '#000000',
    //       optionButtonLayoutMode: 'auto',
    //       optionsRows: 1,
    //       optionsColumns: 4,
    //       wiggleDuration: 1000,
    //       highlightUnfilledBlanksOnWrong: true,
    //       unfilledBlankWiggleDuration: 1000,
    //       showFeedback: true,
    //       mode: 'MCQ',
    //       get options() {
    //         const optionsData = getI18nText('pages.page6.fillBlanks.options', []);
    //         return [
    //           { 
    //             id: optionsData[0]?.id || 'opt1', 
    //             text: optionsData[0]?.text || '12', 
    //             image: '', 
    //             blankID: optionsData[0]?.blankID || 'blank1', 
    //             feedbackText: optionsData[0]?.feedbackText || "Correct! Asep has 12 chickens.", 
    //             coordinate: [1120, 300, 1240, 380] 
    //           },
    //           { 
    //             id: optionsData[1]?.id || 'opt2', 
    //             text: optionsData[1]?.text || '3', 
    //             image: '', 
    //             blankID: optionsData[1]?.blankID || 'blank2', 
    //             feedbackText: optionsData[1]?.feedbackText || "Correct! Each chicken consumes 3 bowls of food a day.", 
    //             coordinate: [1250, 300, 1370, 380] 
    //           },
    //           { 
    //             id: optionsData[2]?.id || 'opt3', 
    //             text: optionsData[2]?.text || '15', 
    //             image: '', 
    //             blankID: optionsData[2]?.blankID || null, 
    //             feedbackText: optionsData[2]?.feedbackText || "Incorrect. Asep has 12 chickens, not 15.", 
    //             coordinate: [1120, 400, 1240, 480] 
    //           },
    //           { 
    //             id: optionsData[3]?.id || 'opt4', 
    //             text: optionsData[3]?.text || '4', 
    //             image: '', 
    //             blankID: optionsData[3]?.blankID || null, 
    //             feedbackText: optionsData[3]?.feedbackText || "Incorrect. Each chicken consumes 3 bowls, not 4.", 
    //             coordinate: [1250, 400, 1370, 480] 
    //           }
    //         ];
    //       },
    //       keyConcepts: [],
    //       impFormulae: getI18nText('pages.page6.fillBlanks.impFormulae', [])
    //     }
    //   },

    //   // Tap Animation GIF
    //   {
    //     id: 'page6-tap-animation',
    //     name: 'tap-animation',
    //     type: 'custom',
    //     coordinates: [1450, 840, 1500, 890],
    //     zIndex: '999',
    //     props: {
    //       componentType: 'TapGifComponent',
    //       imageSrc: 'assets/tap.gif',
    //       imageAlt: getI18nText('components.tapGif.imageAlt', 'Tap')
    //     }
    //   },

    //   // Optimized Next button - Three Layer Structure
    //     {
    //         id: 'page6-next-button',
    //         name: 'next-button',
    //         type: 'button',
    //         coordinates: [1450, 820, 1595, 895],
    //         zIndex: 'var(--z-button)',
    //     props: {
    //             get text() {
    //                 const pageNumber = extractPageNumberFromId('page6-next-button');
    //                 return getNextButtonText(pageNumber);
    //             },
    //             onClick: () => {
    //         if (typeof window !== 'undefined' && window.playCarClickSound) {
    //           window.playCarClickSound('next');
    //                 }
    //                 const pageNumber = extractPageNumberFromId('page6-next-button');
    //                 const nav = getPageNavigation(pageNumber);
    //                 if (nav && nav.next !== null && typeof window !== 'undefined') {
    //                     if (window.changePageAndNotify) {
    //                         window.changePageAndNotify(nav.next);
    //                     } else if (window.navigateToPage) {
    //                         window.navigateToPage(nav.next);
    //                     } else {
    //                         window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
    //                         console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 7'));
    //                     }
    //                 } else if (nav && nav.next === null) {
    //                     // On last page, "Start Over" functionality
    //                     console.log('🔄 [Next Button] Last page - Starting over');
    //                     if (window.advanceToNextQuestion) {
    //                         window.advanceToNextQuestion();
    //                     } else if (window.changePageAndNotify) {
    //                         window.changePageAndNotify(1);
    //                     }
    //                 }
    //             }
    //         }
    //     },

    //   // Previous button - Three Layer Structure
    //     {
    //         id: 'page6-previous-button',
    //         name: 'previous-button',
    //         type: 'button',
    //         coordinates: [5, 820, 150, 895],
    //         zIndex: 'var(--z-button)',
    //     props: {
    //             get text() {
    //                 return getI18nText('buttons.previous', '«');
    //             },
    //             get disabled() {
    //                 const pageNumber = extractPageNumberFromId('page6-previous-button');
    //                 return isPrevButtonDisabled(pageNumber);
    //             },
    //             onClick: () => {
    //                 const pageNumber = extractPageNumberFromId('page6-previous-button');
    //                 const nav = getPageNavigation(pageNumber);
    //                 if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
    //                     if (window.playCarClickSound) {
    //                     window.playCarClickSound('previous');
    //                 }
    //                     if (window.changePageAndNotify) {
    //                         window.changePageAndNotify(nav.prev);
    //                     } else if (window.navigateToPage) {
    //                         window.navigateToPage(nav.prev);
    //                     } else {
    //                         window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
    //                         console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 5'));
    //                     }
    //                 }
    //             }
    //         }
    //     },
        
    //     {
    //         id: 'page6-progressDots',
    //         name: 'progressDots',
    //         type: 'progress',
    //         coordinates: [155, 820, 1445, 895],
    //         zIndex: 'var(--z-elevated)',
    //     props: {
    //             totalPages: 8
    //         }
    //     }
    // ],

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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page7.highlights', [])
        }
      },
      // Calculation Steps Component
      {
        id: 'page7-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [20, questionBottom_Y, 1100, 815], // Positioned on the left side
        zIndex: 55, // Above other content
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text+image',
          textCoordinates: [50, 50, 550, 600], // Text area on the left
          imageCoordinates: [550, 50, 1050, 400], // Image area on the right
          buttonCoordinates: [550, 450, 1050, 525], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '15gc',
          defaultButtonText: getI18nText('buttons.next', 'Next'),
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
          headerText: getI18nText('pages.page7.calculationSteps.headerText', 'Calculation Steps'),
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
              text: getI18nText('pages.page7.calculationSteps.steps.0.text', 'c² = a² + b²'),
              images: [
                {
                  src: 'assets/triangle.png',
                  opacity: 1.0
                }
              ],
              buttonText: getI18nText('pages.page7.calculationSteps.steps.0.buttonText', 'Substitute Values')
            },
            {
              type: 'calculation', // Calculation type: default styling
              explainer: getI18nText('pages.page7.calculationSteps.steps.1.explainer', 'Substituting, c=34 and a=16'), // Optional: Text shown before this step
              text: getI18nText('pages.page7.calculationSteps.steps.1.text', '34² = 16² + b²'),
              images: [
                {
                  src: 'assets/triangle.png',
                  opacity: 1.0
                }
              ],
              buttonText: getI18nText('pages.page7.calculationSteps.steps.1.buttonText', 'Calculate Squares'),
              blankChanges: [
              ]
            },
            {
              type: 'calculation', // Calculation type: default styling
              text: getI18nText('pages.page7.calculationSteps.steps.2.text', '1156 = 256 + b²'),
              images: [
                {
                  src: 'assets/triangle.png',
                  opacity: 1.0
                }
              ],
              buttonText: getI18nText('pages.page7.calculationSteps.steps.2.buttonText', 'Rearrange'),
              blankChanges: [
              ]
            },
            {
              type: 'calculation', // Calculation type: default styling
              text: getI18nText('pages.page7.calculationSteps.steps.3.text', 'b² = 1156 - 256 = 900'),
              images: [
                {
                  src: 'assets/triangle.png',
                  opacity: 1.0
                }
              ],
              buttonText: getI18nText('pages.page7.calculationSteps.steps.3.buttonText', 'Take Square Root'),
              blankChanges: [
              ]
            },
            {
              type: 'calculation', // Calculation type: default styling
              text: getI18nText('pages.page7.calculationSteps.steps.4.text', '21x² = 42'),
              images: [
                {
                  src: 'assets/triangle.png',
                  opacity: 1.0
                }
              ],
              buttonText: getI18nText('pages.page7.calculationSteps.steps.4.buttonText', 'Divide Both Sides by 21'),
              blankChanges: [
              ]
            },
            {
              type: 'calculation', // Calculation type: default styling
              text: getI18nText('pages.page7.calculationSteps.steps.5.text', 'x² = 2, hence x = √2'),
              images: [
                {
                  src: 'assets/triangle-1.png',
                  opacity: 1.0
                }
              ],
              buttonText: "",
              blankChanges: [
              ]
            }
          ],
          blanks: [],
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
        id: 'page7-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Expanded to full width
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
            componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page7.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page7.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page7.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page7.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', 'CONCEPT SUMMARY')
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
          imageAlt: getI18nText('components.tapGif.imageAlt', 'Tap')
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 8'));
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
            id: 'page7-previous-button',
            name: 'previous-button',
            type: 'button',
            coordinates: [5, 820, 150, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 6'));
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
                totalPages: 7
            }
        }
    ],

    // 8: [
    //   // Question Text Box Component
    //   {
    //     id: 'page8-question-text-box',
    //     type: 'custom',
    //     coordinates: [55, 225, 238, 275], // Positioned above house 1
    //     zIndex: 56,
    //       props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.houseNames.yohana', "Yohana's house"),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FFD700', // highlightColor1 (yellow)
    //       fontSize: '26gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Komang's house text box
    //   {
    //     id: 'page7-komang-house-text',
    //     name: 'komang-house-text',
    //     type: 'custom',
    //     coordinates: [458, 225, 641, 275], // Positioned above house 2
    //     zIndex: 56,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.houseNames.komang', "Komang's house"),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#F28283', // highlightColor3 (pink)
    //       fontSize: '26gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Lukas's house text box
    //   {
    //     id: 'page7-lukas-house-text',
    //     name: 'lukas-house-text',
    //     type: 'custom',
    //     coordinates: [862, 225, 1045, 275], // Positioned above house 3
    //     zIndex: 56,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.houseNames.lukas', "Lukas's house"),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#70ACC7', // Aqua color (highlightColor2)
    //       fontSize: '26gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // House 1 Image (Yohana's house)
    //   {
    //     id: 'page7-house1-image',
    //     name: 'house1-image',
    //     type: 'custom',
    //     coordinates: [55, 275, 238, 475], // Moved down by 25 rows (250px), 5% left margin, 50% total width for 3 images
    //     zIndex: 55,
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-house1-image',
    //       elementName: 'page7-house1-image',
    //       currentPage: 7,
    //       coordinates: [55, questionBottom_Y + 200, 238, questionBottom_Y + 500],
    //       zIndex: 55,
    //       images: [
    //         {
    //           src: 'assets/house1.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // House 2 Image (Komang's house)
    //   {
    //     id: 'page7-house2-image',
    //     name: 'house2-image',
    //     type: 'custom',
    //     coordinates: [458, 275, 641, 475], // Moved down by 25 rows (250px), 50% total width for 3 images with gaps
    //     zIndex: 55,
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-house2-image',
    //       elementName: 'page7-house2-image',
    //       currentPage: 7,
    //       coordinates: [458, questionBottom_Y + 200, 641, questionBottom_Y + 500],
    //       zIndex: 55,
    //       images: [
    //         {
    //           src: 'assets/house2.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // Vertical dashed line on right edge of house 1
    //   {
    //     id: 'page7-vertical-line-house1-right',
    //     name: 'vertical-line-house1-right',
    //     type: 'line',
    //     coordinates: [238, 325, 238, 525], // Vertical line at right edge of house 1 - top at 3/4 height from bottom, extends 25% below (house: 375-575, height: 200, top: 575-150=425, bottom: 575+50=625)
    //     zIndex: 56, // Above houses
    //     props: {
    //       componentType: 'LineComponent',
    //       lineType: 'vertical',
    //       lineSubtype: 'line',
    //       borderWidth: '4gc',
    //       borderColor: '#ffffff', // White
    //       borderStyle: 'dashed',
    //       backgroundColor: 'transparent'
    //     }
    //   },

    //   // Vertical dashed line on left edge of house 2
    //   {
    //     id: 'page7-vertical-line-house2-left',
    //     name: 'vertical-line-house2-left',
    //     type: 'line',
    //     coordinates: [458, 325, 458, 525], // Vertical line at left edge of house 2 - top at 3/4 height from bottom, extends 25% below
    //     zIndex: 56, // Above houses
    //     props: {
    //       componentType: 'LineComponent',
    //       lineType: 'vertical',
    //       lineSubtype: 'line',
    //       borderWidth: '4gc',
    //       borderColor: '#ffffff', // White
    //       borderStyle: 'dashed',
    //       backgroundColor: 'transparent'
    //     }
    //   },

    //   // House 3 Image (Lukas's house)
    //   {
    //     id: 'page7-house3-image',
    //     name: 'house3-image',
    //     type: 'custom',
    //     coordinates: [862, 275, 1045, 475], // Moved down by 25 rows (250px), 50% total width for 3 images, 5% right margin
    //     zIndex: 55,
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-house3-image',
    //       elementName: 'page7-house3-image',
    //       currentPage: 7,
    //       coordinates: [862, questionBottom_Y + 200, 1045, questionBottom_Y + 500],
    //       zIndex: 55,
    //       images: [
    //         {
    //           src: 'assets/house3.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // Vertical dashed line on right edge of house 2
    //   {
    //     id: 'page7-vertical-line-house2-right',
    //     name: 'vertical-line-house2-right',
    //     type: 'line',
    //     coordinates: [641, 325, 641, 525], // Vertical line at right edge of house 2 - top at 3/4 height from bottom, extends 25% below
    //     zIndex: 56, // Above houses
    //     props: {
    //       componentType: 'LineComponent',
    //       lineType: 'vertical',
    //       lineSubtype: 'line',
    //       borderWidth: '4gc',
    //       borderColor: '#ffffff', // White
    //       borderStyle: 'dashed',
    //       backgroundColor: 'transparent'
    //     }
    //   },

    //   // Vertical dashed line on left edge of house 3
    //   {
    //     id: 'page7-vertical-line-house3-left',
    //     name: 'vertical-line-house3-left',
    //     type: 'line',
    //     coordinates: [862, 325, 862, 525], // Vertical line at left edge of house 3 - top at 3/4 height from bottom, extends 25% below
    //     zIndex: 56, // Above houses
    //     props: {
    //       componentType: 'LineComponent',
    //       lineType: 'vertical',
    //       lineSubtype: 'line',
    //       borderWidth: '4gc',
    //       borderColor: '#ffffff', // White
    //       borderStyle: 'dashed',
    //       backgroundColor: 'transparent'
    //     }
    //   },

    //   // Distance text box for 1 (1/2) km - on top of yellow arrow
    //   {
    //     id: 'page7-distance-1-text',
    //     name: 'distance-1-text',
    //     type: 'custom',
    //     coordinates: [250, 300, 450, 330], // Positioned on top of yellow arrow (between house 1 and house 2)
    //     zIndex: 60, // Above arrows
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.distances.distance1', '$1 \\frac{1}{2}$ km'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FFD700', // highlightColor1 (yellow)
    //       fontSize: '30gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Distance text box for 2 (1/4) km - on top of blue arrow
    //   {
    //     id: 'page7-distance-2-text',
    //     name: 'distance-2-text',
    //     type: 'custom',
    //     coordinates: [650, 300, 850, 330], // Positioned on top of blue arrow (between house 2 and house 3)
    //     zIndex: 60, // Above arrows
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.distances.distance2', '$2 \\frac{1}{4}$ km'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#70ACC7', // highlightColor2 (Aqua color)
    //       fontSize: '30gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Blue Double Arrow Image
    //   {
    //     id: 'page7-blue-double-arrow',
    //     name: 'blue-double-arrow',
    //     type: 'custom',
    //     coordinates: [625, 375, 875, 400], // Positioned between house 2 and house 3
    //     zIndex: 59, // Above other arrows
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-blue-double-arrow',
    //       elementName: 'page7-blue-double-arrow',
    //       currentPage: 7,
    //       coordinates: [625, 375, 900, 450],
    //       zIndex: 59,
    //       images: [
    //         {
    //           src: 'assets/blueDoubleArrow.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // Purple Double Arrow Image
    //   {
    //     id: 'page7-purple-double-arrow',
    //     name: 'purple-double-arrow',
    //     type: 'custom',
    //     coordinates: [458, 460, 641, 480], // Positioned below house 2 (Komang's house)
    //     zIndex: 59, // Above other arrows
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-purple-double-arrow',
    //       elementName: 'page7-purple-double-arrow',
    //       currentPage: 7,
    //       coordinates: [458, 460, 641, 480],
    //       zIndex: 59,
    //       images: [
    //         {
    //           src: 'assets/purpleDoubleArrow.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // Text box for 1/200 km in highlight5 color
    //   {
    //     id: 'page7-width-text',
    //     name: 'width-text',
    //     type: 'custom',
    //     coordinates: [458, 500, 641, 530], // Positioned above purple arrow (below house 2)
    //     zIndex: 60, // Above arrows
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.distances.width', '$\\frac{1}{200}$ km'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#D86ECC', // highlightColor5 (purple)
    //       fontSize: '30gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Question Double Arrow Image (spanning from house 1 right edge to house 3 left edge)
    //   {
    //     id: 'page7-question-double-arrow',
    //     name: 'question-double-arrow',
    //     type: 'custom',
    //     coordinates: [210, 500, 890, 650], // Below house 2, from house 1 right edge (238) to house 3 left edge (862), same vertical position as purple arrow
    //     zIndex: 59, // Same as other arrows
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-question-double-arrow',
    //       elementName: 'page7-question-double-arrow',
    //       currentPage: 7,
    //       coordinates: [238, 460, 862, 480],
    //       zIndex: 59,
    //       images: [
    //         {
    //           src: 'assets/questionDoubleArrow.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // Text box with "?" for question arrow
    //   {
    //     id: 'page7-teal-question-text',
    //     name: 'teal-question-text',
    //     type: 'custom',
    //     coordinates: [500, 585, 600, 635], // Centered below house 2, below question arrow
    //     zIndex: 61,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.distances.questionMark', '?'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#8A2BE2', // Teal color (matching page 6)
    //       fontSize: '44gc',
    //       fontWeight: 'bold',
    //       padding: '0gc',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Yellow Double Arrow Image
    //   {
    //     id: 'page7-yellow-double-arrow',
    //     name: 'yellow-double-arrow',
    //     type: 'custom',
    //     coordinates: [225, 375, 475, 400], // Positioned between house 1 and house 2, touching white dashed lines
    //     zIndex: 59, // Above other arrows
    //     props: {
    //       componentType: 'ImageStackComponent',
    //       id: 'page7-yellow-double-arrow',
    //       elementName: 'page7-yellow-double-arrow',
    //       currentPage: 7,
    //       coordinates: [238, 350, 458, 370],
    //       zIndex: 59,
    //       images: [
    //         {
    //           src: 'assets/yellowDoubleArrow.png',
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1.0
    //         }
    //       ]
    //     }
    //   },

    //   // Distance equation text - "Distance from Yohana's house to Lukas's house"
    //   {
    //     id: 'page7-distance-equation-text',
    //     name: 'distance-equation-text',
    //     type: 'custom',
    //     coordinates: [25, 690, 320, 815], // Positioned below house images
    //     zIndex: 60,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.distances.distanceEquation', "Distance from Yohana's house to Lukas's house"),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '24gc',
    //       padding: '10gc',
    //       textAlign: 'left',
    //       lineHeight: '1.3'
    //     }
    //   },

    //   // Equals sign between distance equation and blank1
    //   {
    //     id: 'page7-equals-sign',
    //     name: 'equals-sign',
    //     type: 'custom',
    //     coordinates: [330, 690, 380, 815], // Positioned between distance equation (ends at x=320) and blank1 (starts at x=385)
    //     zIndex: 60,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page7.distances.equalsSign', '='),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '40gc',
    //       padding: '0gc',
    //       textAlign: 'center',
    //       lineHeight: '1.0'
    //     }
    //   },

    //   // Transparent container with orange border around equation and blanks
    //   {
    //     id: 'page7-container',
    //     name: 'page7-container',
    //     type: 'custom',
    //     coordinates: [20, questionBottom_Y+5, 1075, 650], // Encloses distance equation, equals sign, and all blanks
    //     zIndex: 55, // Below text but above background
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty text, just a container
    //       backgroundColor: 'transparent',
    //       border: '3gc solid white', // Orange border
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '24gc',
    //       padding: '0gc',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Fill Blanks Component for page 7 - 5 tiles and draggable buttons
    //   {
    //     id: 'page7-fill-blanks',
    //     name: 'page7-fill-blanks-component',
    //     type: 'custom',
    //     coordinates: [50, 705, 1100, 925],
    //     zIndex: 550,
    //     props: {
    //       componentType: 'FillBlanksComponent',
    //       get blanks() {
    //         return [
    //           // 5 tiles in a row below house images - sizes match their corresponding options
    //           // All blanks vertically centered on same baseline (y-center = 752.5, moved up by 25)
    //           // Moved 25 columns to the right
    //           // fontColor removed from individual blanks to use global blankFontColor (black)
    //           // blank1 -> opt1: width=225, height=125, vertically centered
    //           { id: 'blank1', coordinate: [385, 690, 610, 815], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //           // blank2 -> opt4: width=75, height=75, vertically centered (y-center = 752.5, so y1=715, y2=790)
    //           { id: 'blank2', coordinate: [635, 715, 710, 790], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //           // blank3 -> opt2: width=225, height=125, vertically centered
    //           { id: 'blank3', coordinate: [730, 690, 955, 815], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //           // blank4 -> opt5: width=75, height=75, vertically centered
    //           { id: 'blank4', coordinate: [975, 715, 1050, 790], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //           // blank5 -> opt3: width=225, height=125, vertically centered
    //           { id: 'blank5', coordinate: [1070, 690, 1295, 815], text: "", image: "", bgColor: 'transparent', borderColor: '#FFA500', bgBlink: false },
    //         ];
    //       },
    //       blankBorderWidth: '3gc',
    //       blankBorderColor: '#FFA500', // Orange border
    //       blankBorderType: 'dashed',
    //       blankBackgroundColor: 'transparent',
    //       blankFontSize: '24gc', // Same size as option button
    //       blankFontColor: '#000000', // Black text to match option button
    //       optionsContainerCoordinates: [1100, 260, 1580, 700], // Positioned where information panel was (right side)
    //       optionsBorderWidth: '0gc',
    //       optionsBorderColor: 'transparent',
    //       optionsBorderType: 'solid',
    //       optionsBackgroundColor: 'transparent',
    //       showOptionsContainer: true,
    //       showOptionsContainerBorder: false,
    //       showOptionsRowBorders: false,
    //       optionContainerInstructionHeight: 0,
    //       optionContainerInstructionText: getI18nText('pages.page7.fillBlanksInstructionText', 'Drag and drop the options to complete the mathematical sentence'),
    //       optionContainerInstructionTextColor: '#ffffff', // White text for instruction
    //       optionButtonColor: '#FFA500', // Orange background for buttons
    //       optionButtonFontSize: '24gc',
    //       optionButtonFontColor: '#000000', // Black text
    //       optionButtonLayoutMode: 'manual', // Use manual layout with coordinates
    //       optionsRows: 3, // Not used in manual mode, but kept for reference
    //       optionsColumns: 4, // Not used in manual mode, but kept for reference
    //       wiggleDuration: 1000,
    //       highlightUnfilledBlanksOnWrong: true,
    //       unfilledBlankWiggleDuration: 1000,
    //       showFeedback: false, // Disable feedback text display on page 7
    //       mode: 'DND',
    //       get options() {
    //         const optionsData = getI18nText('pages.page7.fillBlanksOptions', []);
    //         return [
    //           // Row 1: Distance labels (side by side) - height increased by 10%
    //           { id: 'opt1', text: optionsData[0]?.text || "Komang's house<br>to<br>Lukas' house", image: '', blankID: optionsData[0]?.blankID || 'blank1', feedbackText: optionsData[0]?.feedbackText || 'Correct! This is the distance from Komang to Lukas house.', coordinate: [1120, 300, 1345, 425] },
    //           { id: 'opt2', text: optionsData[1]?.text || "Width of<br>Komang's house", image: '', blankID: optionsData[1]?.blankID || 'blank3', feedbackText: optionsData[1]?.feedbackText || 'Correct! This is the width of Komang house.', coordinate: [1355, 300, 1580, 425] },
    //           // Row 2: Third button centered (same size as top 2) - height increased by 10%
    //           { id: 'opt3', text: optionsData[2]?.text || "Komang's house<br>to<br>Yohana's house", image: '', blankID: optionsData[2]?.blankID || 'blank5', feedbackText: optionsData[2]?.feedbackText || 'Correct! This is the distance from Komang to Yohana house.', coordinate: [1235, 435, 1460, 560] },
    //           // Row 3: Operators (square buttons - width = height = 75, evenly spaced from 1120 to 1580)
    //           // Total width: 1580 - 1120 = 460, 4 buttons @ 75 each = 300, remaining = 160, gaps = 160/3 ≈ 53.33
    //           { id: 'opt4', text: optionsData[3]?.text || '+', image: '', blankID: optionsData[3]?.blankID || 'blank2', feedbackText: optionsData[3]?.feedbackText || 'Correct!', coordinate: [1120, 570, 1195, 645] },
    //           { id: 'opt5', text: optionsData[4]?.text || '+', image: '', blankID: optionsData[4]?.blankID || 'blank4', feedbackText: optionsData[4]?.feedbackText || 'Correct!', coordinate: [1248, 570, 1323, 645] },
    //           { id: 'opt6', text: optionsData[5]?.text || '-', image: '', blankID: optionsData[5]?.blankID || null, feedbackText: optionsData[5]?.feedbackText || 'This operator is not needed here.', coordinate: [1376, 570, 1451, 645] },
    //           { id: 'opt7', text: optionsData[6]?.text || '-', image: '', blankID: optionsData[6]?.blankID || null, feedbackText: optionsData[6]?.feedbackText || 'This operator is not needed here.', coordinate: [1505, 570, 1580, 645] },
    //         ];
    //       },
    //       impFormulae: []
    //     }
    //   },

    //   // Optimized Next button - Three Layer Structure
    //     {
    //         id: 'page7-next-button',
    //     name: 'next-button',
    //     type: 'button',
    //     coordinates: [1450, 820, 1595, 895],
    //     zIndex: 'var(--z-button)',
    //     props: {
    //       get text() {
    //                 const pageNumber = extractPageNumberFromId('page7-next-button');
    //                 return getNextButtonText(pageNumber);
    //       },
    //       onClick: () => {
    //         if (typeof window !== 'undefined' && window.playCarClickSound) {
    //           window.playCarClickSound('next');
    //         }
    //                 const pageNumber = extractPageNumberFromId('page7-next-button');
    //                 const nav = getPageNavigation(pageNumber);
    //                 if (nav && nav.next !== null && typeof window !== 'undefined') {
    //           if (window.changePageAndNotify) {
    //                         window.changePageAndNotify(nav.next);
    //           } else if (window.navigateToPage) {
    //                         window.navigateToPage(nav.next);
    //           } else {
    //                         window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
    //                         console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 8'));
    //           }
    //                 } else if (nav && nav.next === null) {
    //                     // On last page, "Start Over" functionality
    //                     console.log('🔄 [Next Button] Last page - Starting over');
    //                     if (window.advanceToNextQuestion) {
    //                         window.advanceToNextQuestion();
    //                     } else if (window.changePageAndNotify) {
    //                         window.changePageAndNotify(1);
    //                     }
    //                 }
    //       }
    //     }
    //   },

    //   // Previous button - Three Layer Structure
    //   {
    //         id: 'page7-previous-button',
    //     name: 'previous-button',
    //     type: 'button',
    //     coordinates: [5, 820, 150, 895],
    //     zIndex: 'var(--z-button)',
    //     props: {
    //       get text() {
    //         return getI18nText('buttons.previous', '«');
    //       },
    //             get disabled() {
    //                 const pageNumber = extractPageNumberFromId('page7-previous-button');
    //                 return isPrevButtonDisabled(pageNumber);
    //       },
    //             onClick: () => {
    //                 const pageNumber = extractPageNumberFromId('page7-previous-button');
    //                 const nav = getPageNavigation(pageNumber);
    //                 if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
    //                     if (window.playCarClickSound) {
    //                     window.playCarClickSound('previous');
    //                 }
    //                     if (window.changePageAndNotify) {
    //                         window.changePageAndNotify(nav.prev);
    //                     } else if (window.navigateToPage) {
    //                         window.navigateToPage(nav.prev);
    //                     } else {
    //                         window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
    //                         console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 6'));
    //                     }
    //                 }
    //             }
    //     }
    //   },
        
    //     {
    //         id: 'page7-progressDots',
    //         name: 'progressDots',
    //         type: 'progress',
    //         coordinates: [155, 820, 1445, 895],
    //         zIndex: 'var(--z-elevated)',
    //         props: {
    //             totalPages: 15
    //         }
    //     }
    // ],

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
          text: getI18nText('common.questionText', 'The lengths of the right-angled sides of a right-angled triangle are 7 cm and 6 cm. The length of the hypotenuse is...<br>&emsp;a. 8,2&emsp;&emsp;&emsp;c. 7,2<br>&emsp;b. 9,2&emsp;&emsp;&emsp;d. 6,2'),
          textSize: questionTextSize,
          iconLetter: getI18nText('common.questionIcon', 'Q'),
          highlights: getI18nText('pages.page8.highlights', [])
        }
      },

      // Setup Image
      {
        id: 'page8-setup-image',
        name: 'setup-image',
        type: 'container',
        coordinates: [20, questionBottom_Y, 1050, 650], // Positioned on the left side
        zIndex: 58,
        props: {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          padding: '0gc',
          backgroundImage: 'url(assets/triangle-1.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      },

      // Concept Summary Panel
      {
        id: 'page8-concept-summary-panel',
        name: 'concept-summary-panel',
        type: 'custom',
        coordinates: [1100, questionBottom_Y, 1600, 815], // Positioned on the right side
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
            componentType: 'ConceptSummaryComponent',
          givenArray: getI18nText('pages.page8.conceptSummary.given', []),
          toFindArray: getI18nText('pages.page8.conceptSummary.toFind', []),
          factsArray: getI18nText('pages.page8.conceptSummary.facts', []),
          valueArray: getI18nText('pages.page8.conceptSummary.values', []),
          headerText: getI18nText('components.conceptSummary.headerText', 'CONCEPT SUMMARY')
        }
      },

      // Feedback Text Box Component
      {
        id: 'page8-feedback-textbox',
        name: 'feedback-textbox',
        type: 'custom', // Use 'custom' type for FeedbackTextboxComponent
        coordinates: [75, 660, 1050, 740], // Positioned below the setup image (setup image ends at y=650)
        zIndex: 65,
            props: {
          componentType: 'FeedbackTextboxComponent',
          text: getI18nText('pages.page8.feedbackText', 'The value of x is √2, which is approximately 1.41'),
          mode: 'summary',
          fontSize: '32gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          borderRadius: '10gc',
          boxSizing: 'border-box'
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
          imageAlt: getI18nText('components.tapGif.imageAlt', 'Tap')
          }
      },

      // Optimized Next button - Three Layer Structure
        {
            id: 'page8-next-button',
        name: 'next-button',
        type: 'button',
            coordinates: [1350, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
                    const pageNumber = extractPageNumberFromId('page8-next-button');
                    return getNextButtonText(pageNumber);
          },
                fontSize: '30gc',
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 9'));
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
            id: 'page8-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
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
                totalPages: 7
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
