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
  7: { prev: 6, next: null },
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

  // Helper function to get current question from questions array
  const getCurrentQuestion = () => {
    try {
      const questions = getI18nText('pages.page1.questions', []);
      if (Array.isArray(questions) && questions.length > 0) {
        // For page 2, use the first question (index 0)
        // In the future, this could be based on currentQuestionIndex
        const questionIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
          ? window.currentQuestionIndex 
          : 0;
        return questions[questionIndex] || questions[0];
      }
    } catch (error) {
      console.warn('⚠️ [PageConfig] Error getting current question:', error);
    }
    // Default fallback
    return { dividend: 2, divisor: 3 };
  };
  
  // Expose getCurrentQuestion globally for slider validation
  if (typeof window !== 'undefined') {
    window.getCurrentQuestion = getCurrentQuestion;
  }

  // Return optimized GridPositionPages
  return {
    1: [

      // Background with translucent numbers
      {
        id: 'page1-background',
        name: 'background',
        type: 'custom',
        coordinates: [0, 0, 1600, 900],
        zIndex: 1,
        props: {
          componentType: 'BackgroundWithNumbersComponent',
          backgroundColor: '#1a1f3a',
          numbers: ['77', '23', '910', '59', '22', '78', '6', '15', '4', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        }
      },

      // Title: "Division as Multiplication by the Reciprocal"
      {
        id: 'page1-title',
        name: 'title',
        type: 'custom',
        coordinates: [100, 100, 1500, 250],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.title', 'Division as Multiplication by the Reciprocal'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF9900',
          fontSize: '60gc',
          padding: '20gc',
          fontWeight: 'bold'
        }
      },

      // Instructional Text
      {
        id: 'page1-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [200, 350, 1400, 600],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.instructionText', "We learned that the reciprocal of a number is found by flipping it.<br>Now, let's learn how dividing by a number is the same as multiplying with its reciprocal.<br>Tap 'Start' to start the activity."),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '20gc',
          fontWeight: 'normal'
        }
      },

      // Tap Animation GIF (positioned over Start button)
      {
        id: 'page1-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [750, 680, 800, 730],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap'
        }
      },

      // Start button - Three Layer Structure (orange gradient) - Uses NextButtonComponent
        {
            id: 'page1-start-button',
            name: 'next-button',
            type: 'button',
            coordinates: [600, 650, 900, 750],
            zIndex: 'var(--z-button)',
            props: {
                text: getI18nText('buttons.start', 'Start'),
                color: '#ffffff',
                fontSize: '48gc',
                fontWeight: 'bold',
                borderRadius: '15gc',
                className: 'applet-button',
                frameClassName: 'applet-button-frame',
                contentClassName: 'applet-button-content',
                frameGap: '6.25gc',
                ignorePageCompletion: true,
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    const pageNumber = 1;
                    const nav = getPageNavigation(pageNumber);
                    if (nav && nav.next !== null && typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(nav.next);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(nav.next);
                        } else {
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                            console.log('📄 [Start Button]', getI18nText('messages.startButtonPage1', 'Dispatched page change event to page 2'));
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
                    if (nav && nav.prev !== null && typeof window !== 'undefined') {
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
                totalPages: 7
            }
        }
    ],

    2: [

      // Background with translucent numbers
      {
        id: 'page2-background',
        name: 'background',
        type: 'custom',
        coordinates: [0, 0, 1600, 900],
        zIndex: 1,
        props: {
          componentType: 'BackgroundWithNumbersComponent',
          backgroundColor: '#1a1f3a',
          numbers: ['77', '23', '910', '59', '22', '78', '6', '15', '4', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        }
      },

      // Header: "Consider a division problem."
      {
        id: 'page2-header',
        name: 'header',
        type: 'custom',
        coordinates: [100, 20, 1500, 120],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.headerText', 'Consider a division problem.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF9900',
          fontSize: '48gc',
          padding: '20gc',
          fontWeight: 'bold'
        }
      },

      // Orange separator line
      {
        id: 'page2-separator',
        name: 'separator',
        type: 'custom',
        coordinates: [100, 120, 1500, 130],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#FF9900',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF9900',
          fontSize: '2gc',
          padding: '0gc'
        }
      },

      // Orange frame with division problem
      {
        id: 'page2-division-frame',
        name: 'division-frame',
        type: 'custom',
        coordinates: [400, 250, 1200, 550],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `${question.dividend} ÷ ${question.divisor}`;
          },
          backgroundColor: 'transparent',
          border: '8gc solid #FF9900',
          borderRadius: '20gc',
          textColor: '#ffffff',
          fontSize: '120gc',
          padding: '40gc',
          fontWeight: 'bold'
        }
      },

      // Instructional text box at bottom: "Tap next to continue."
      {
        id: 'page2-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [200, 750, 1400, 800],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.instructionText', 'Tap next to continue.'),
          backgroundColor: 'transparent',
          // border: '4gc solid #FF9900',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Tap Animation GIF (positioned over Next button)
      {
        id: 'page2-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1500, 840, 1550, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap'
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
                    if (nav && nav.prev !== null && typeof window !== 'undefined') {
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
                totalPages: 7
            }
        }
    ],

    3: [

      // Yellow header text box (dynamic based on dividend and divisor)
      {
        id: 'page3-header',
        name: 'header',
        type: 'custom',
        coordinates: [100, 50, 1500, 150],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            const dividend = question.dividend || 2;
            const divisor = question.divisor || 3;
            const currentLang = typeof window !== 'undefined' && window.i18n ? window.i18n.getCurrentLanguage() : 'en';
            const wholeWord = currentLang === 'id' 
              ? 'keseluruhan' // Indonesian uses same word for singular/plural
              : (dividend === 1 ? 'whole' : 'wholes');
            return getI18nText('pages.page3.headerText', "Let's take {dividend} {wholeWord} to represent {dividend}. But we cannot divide {dividend} {wholeWord} into {divisor} equal groups without splitting them.", { dividend, wholeWord, divisor });
          },
          textColor: 'var(--color-orange)',
          fontSize: '32gc',
          padding: '20gc',
          fontWeight: 'bold'
        }
      },

      // Dark blue button on left showing "2 ÷ 3"
      {
        id: 'page3-division-button',
        name: 'division-button',
        type: 'custom',
        coordinates: [100, 275, 350, 575],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `${question.dividend} ÷ ${question.divisor}`;
          },
          backgroundColor: 'rgba(26, 31, 58, 0.6)',
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '64gc',
          padding: '30gc',
          fontWeight: 'bold'
        }
      },

      // Dynamic rectangles based on dividend (uses DynamicRectanglesComponent)
      {
        id: 'page3-dynamic-rectangles',
        name: 'dynamic-rectangles',
        type: 'custom',
        coordinates: [445, 250, 1075, 600], // Same as page 4/5 for consistency (630gc width)
        zIndex: 55,
        props: {
          componentType: 'DynamicRectanglesComponent',
          get count() {
            const question = getCurrentQuestion();
            return question.dividend || 2;
          },
          colors: ['#FF9900', '#1ABC9C', '#FF9900', '#1ABC9C'],
          showLabels: true,
          // Available width: 630gc (1075 - 445), gap between rectangles: 24gc (reduced by 20%)
          rectangleHeight: 250,
          gap: 24
        }
      },

      // Instructional text box at bottom: "Tap next to continue."
      {
        id: 'page3-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [200, 750, 1400, 800],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.instructionText', 'Tap next to continue.'),
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Tap Animation GIF (positioned over Next button)
      {
        id: 'page3-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1500, 840, 1550, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap'
        }
      },

      // Optimized Next button - Three Layer Structure
        {
            id: 'page3-next-button',
            name: 'next-button',
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
                    if (nav && nav.prev !== null && typeof window !== 'undefined') {
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
                totalPages: 7
            }
        }
    ],

    4: [

      // Yellow header text box
      {
        id: 'page4-header',
        name: 'header',
        type: 'custom',
        coordinates: [100, 50, 1500, 150],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            const dividend = question.dividend || 2;
            const currentLang = typeof window !== 'undefined' && window.i18n ? window.i18n.getCurrentLanguage() : 'en';
            const wholeWord = currentLang === 'id' 
              ? 'keseluruhan' // Indonesian uses same word for singular/plural
              : (dividend === 1 ? 'whole' : 'wholes');
            return getI18nText('pages.page4.headerText', "Now, let's split the {dividend} {wholeWord} into as many groups as the divisor.", { dividend, wholeWord });
          },
          textColor: 'var(--color-orange)',
          fontSize: '32gc',
          padding: '20gc',
          fontWeight: 'bold'
        }
      },

      // Dark blue button on left showing "2 ÷ 3"
      {
        id: 'page4-division-button',
        name: 'division-button',
        type: 'custom',
        coordinates: [50, 275, 300, 575],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `${question.dividend} ÷ ${question.divisor}`;
          },
          backgroundColor: 'rgba(26, 31, 58, 0.6)',
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '64gc',
          padding: '30gc',
          fontWeight: 'bold'
        }
      },

      // Dynamic divided rectangles based on dividend (uses DynamicDividedRectanglesComponent)
      // Positioned after label column (100gc) with gap: 445 to 1075 = 630gc for rectangles
      {
        id: 'page4-dynamic-rectangles',
        name: 'dynamic-rectangles',
        type: 'custom',
        coordinates: [445, 150, 1075, 560],
        zIndex: 55,
        props: {
          componentType: 'DynamicDividedRectanglesComponent',
          id: 'page4-dynamic-rectangles',
          elementName: 'page4-dynamic-rectangles',
          get count() {
            const question = getCurrentQuestion();
            return question.dividend || 2;
          },
          colors: ['#FF9900', '#1ABC9C', '#FF9900', '#1ABC9C'],
          showLabels: true,
          // Available width: 630gc (1075 - 445), gap between rectangles: 24gc (reduced by 20%)
          rectangleHeight: 250,
          gap: 24,
          sliderId: 'page4-divisor-slider'
        }
      },

      // Grouped Sections Overlay - shows group labels AND dashed borders around each row when correct answer is given
      {
        id: 'page4-group-labels',
        name: 'group-labels',
        type: 'custom',
        coordinates: [325, 150, 1075, 560], // Full width for dashed border spanning labels + rectangles
        zIndex: 52, // Below rectangles so border appears behind sections
        props: {
          componentType: 'GroupedSectionsOverlay',
          sliderId: 'page4-divisor-slider',
          sectionGapGc: '15gc',
          labelWidthGc: '100gc', // Increased from 70gc to 100gc
          labelOffsetGc: '85gc' // Adjusted to match actual rectangle section offset (50.59px ≈ 85gc)
        }
      },

      // Slider for setting divisor value - positioned below the rectangles
      {
        id: 'page4-divisor-slider',
        name: 'divisor-slider',
        type: 'custom',
        coordinates: [550, 600, 800, 650],
        zIndex: 60,
        props: {
          componentType: 'SliderComponent',
          id: 'page4-divisor-slider',
          elementName: 'page4-divisor-slider',
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 0,
          label: getI18nText('pages.page4.sliderLabel', 'Divisor'),
          labelColor: '#ffffff',
          labelFontSize: '24gc',
          trackColor: '#4a5568',
          trackActiveColor: '#FF9900',
          thumbColor: '#FF9900'
        }
      },

      // Check button to validate divisor - positioned to the right of the slider
      {
        id: 'page4-check-button',
        name: 'check-button',
        type: 'custom',
        coordinates: [825, 575, 1025, 625],
        zIndex: 60,
        props: {
          componentType: 'CheckButtonComponent',
          id: 'page4-check-button',
          elementName: 'page4-check-button',
          text: getI18nText('pages.page4.checkButtonText', 'Check'),
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '6.25gc',
          backgroundColor: '#FF9900',
          textColor: '#ffffff',
          fontSize: '28gc',
          fontWeight: 'bold',
          borderRadius: '15gc',
          validateSlider: true,
          sliderId: 'page4-divisor-slider',
          onClick: (result) => {
            console.log('🔍 [Page4 Check] Validation result:', result);
            
            // Update feedback state for page4-feedback-textbox
            if (typeof window !== 'undefined') {
              const feedbackStateKey = 'page4FeedbackState';
              const feedbackEventName = 'page4FeedbackUpdate';
              
              // Initialize feedback state if it doesn't exist
              if (!window[feedbackStateKey]) {
                window[feedbackStateKey] = {
                  text: '',
                  mode: 'normal'
                };
              }
              
              // Get current question for dynamic feedback
              const question = window.getCurrentQuestion ? window.getCurrentQuestion() : { dividend: 2, divisor: 3 };
              const sliderValue = result.sliderValue || 0;
              const divisor = question.divisor || 3;
              const dividend = question.dividend || 2;
              
              // Update feedback based on result
              if (result.isCorrect) {
                window[feedbackStateKey].text = getI18nText('pages.page4.feedback.correct', 'Good. You divided {dividend} wholes equally among {divisor} groups.', { dividend, divisor });
                window[feedbackStateKey].mode = 'correct';
                // Play success sound if available
                if (window.playCarClickSound) {
                  window.playCarClickSound('correct');
                }
              } else {
                // Determine if slider value is less or more than divisor
                if (sliderValue < divisor) {
                  window[feedbackStateKey].text = getI18nText('pages.page4.feedback.increaseSlider', 'Oops! Increase the slider to match the divisor in the problem.');
                } else if (sliderValue > divisor) {
                  window[feedbackStateKey].text = getI18nText('pages.page4.feedback.decreaseSlider', 'Oops! Decrease the slider to match the divisor in the problem.');
                } else {
                  window[feedbackStateKey].text = getI18nText('pages.page4.feedback.incorrect', 'Incorrect. Try again.');
                }
                window[feedbackStateKey].mode = 'incorrect';
                // Play error sound if available
                if (window.playCarClickSound) {
                  window.playCarClickSound('incorrect');
                }
              }
              
              // Dispatch event to update feedback textbox
              window.dispatchEvent(new CustomEvent(feedbackEventName, {
                detail: {
                  text: window[feedbackStateKey].text,
                  mode: window[feedbackStateKey].mode
                }
              }));
            }
          }
        }
      },

      // Feedback text box - shows validation result
      {
        id: 'page4-feedback-textbox',
        name: 'feedback-textbox',
        type: 'custom',
        coordinates: [5, 675, 1595, 745],
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page4-feedback-textbox',
          text: '',
          mode: 'normal',
          fontSize: '28gc',
          borderRadius: '10gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box'
        }
      },

      // Instructional text box at bottom: "Use slider to set the divisor and then tap Check."
      {
        id: 'page4-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [200, 750, 1400, 800],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.instructionText', 'Use slider to set the divisor and then tap Check.'),
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Tap Animation GIF (positioned over Next button)
      {
        id: 'page4-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1500, 840, 1550, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap'
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
                    if (nav && nav.prev !== null && typeof window !== 'undefined') {
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
                totalPages: 7
            }
        }
    ],

    5: [

      // Header text at top
      {
        id: 'page5-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [100, 50, 1500, 150],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.headerText', 'How much does each group get?'),
          textColor: 'var(--color-orange)',
          fontSize: '32gc',
          padding: '20gc',
          fontWeight: 'bold'
        }
      },

      // Dark blue button on left showing "2 ÷ 3"
      {
        id: 'page5-division-button',
        name: 'division-button',
        type: 'custom',
        coordinates: [50, 275, 300, 575],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `${question.dividend} ÷ ${question.divisor}`;
          },
          backgroundColor: 'rgba(26, 31, 58, 0.6)',
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '64gc',
          padding: '30gc',
          fontWeight: 'bold'
        }
      },

      // Dynamic static separated rectangles based on dividend (uses DynamicStaticSeparatedRectanglesComponent)
      // Positioned after label column (100gc) with gap: 445 to 1075 = 630gc for rectangles
      {
        id: 'page5-dynamic-rectangles',
        name: 'dynamic-rectangles',
        type: 'custom',
        coordinates: [445, 150, 1075, 560],
        zIndex: 55,
        props: {
          componentType: 'DynamicStaticSeparatedRectanglesComponent',
          id: 'page5-dynamic-rectangles',
          elementName: 'page5-dynamic-rectangles',
          get count() {
            const question = getCurrentQuestion();
            return question.dividend || 2;
          },
          colors: ['#FF9900', '#1ABC9C', '#FF9900', '#1ABC9C'],
          showLabels: true,
          // Available width: 630gc (1075 - 445), gap between rectangles: 24gc (reduced by 20%)
          rectangleHeight: 250,
          gap: 24,
          initialAnimationPhase: 3 // Start at final grouped state
        }
      },

      // Grouped Sections Overlay - ALWAYS VISIBLE on page 5
      {
        id: 'page5-group-labels',
        name: 'group-labels',
        type: 'custom',
        coordinates: [325, 150, 1075, 560], // Full width for dashed border spanning labels + rectangles
        zIndex: 52, // Below rectangles so border appears behind sections
        props: {
          componentType: 'StaticGroupedSectionsOverlay',
          get divisions() {
            const question = getCurrentQuestion();
            return question.divisor || 3;
          },
          sectionGapGc: '15gc',
          labelWidthGc: '100gc', // Increased from 70gc to 100gc
          labelOffsetGc: '85gc' // Adjusted to match actual rectangle section offset (50.59px ≈ 85gc)
        }
      },

      // Instructional text box at bottom
      {
        id: 'page5-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [200, 750, 1400, 800],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.instructionText', 'Choose the correct answer.'),
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          fontWeight: 'bold'
        }
      },

      // Quiz Panel with 3 options
      {
        id: 'page5-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [1100, 200, 1575, 800],
        zIndex: 60,
        props: {
          componentType: 'QuizPanelComponent',
          id: 'page5-quiz-panel',
          elementName: 'page5-quiz-panel',
          quizId: 'page5-quiz',
          quizType: 'MCQ',
          quizSubtype: 'QT3R', // 3 options with rounded buttons
          headerRowHeight: 0, // No header row
          questionRowHeight: 25, // 25% for question
          optionsRowHeight: 55, // 55% for options (rest)
          feedbackRowHeight: 20, // 20% for feedback
          get questionText() {
            const question = getCurrentQuestion();
            const dividend = question.dividend || 2;
            const divisor = question.divisor || 3;
            return getI18nText('pages.page5.quizPanel.questionText', 'What does each group get when {dividend} wholes are divided equally among {divisor} groups?', { dividend, divisor });
          },
          get options() {
            const question = getCurrentQuestion();
            const dividend = question.dividend || 2;
            const divisor = question.divisor || 3;
            const totalPartsPerWhole = divisor;
            const totalPartsInBothWholes = dividend * divisor;
            
            const option1Text = getI18nText('pages.page5.quizPanel.options.option1.text', 'Numerator times, i.e. $__DIVIDEND__ \\times \\frac{1}{__DIVISOR__}$');
            const option1Feedback = getI18nText('pages.page5.quizPanel.options.option1.feedback', 'Good! Each group gets $__DIVIDEND__ \\times \\frac{1}{__DIVISOR__}$');
            
            const option2Text = getI18nText('pages.page5.quizPanel.options.option2.text', 'Total parts in each whole times, i.e. $__TOTAL_PARTS_PER_WHOLE__ \\times \\frac{1}{__DIVISOR__}$');
            const option2Feedback = getI18nText('pages.page5.quizPanel.options.option2.feedback', 'Incorrect! Try again.');
            
            const option3Text = getI18nText('pages.page5.quizPanel.options.option3.text', 'Total parts in both wholes times, i.e. $__TOTAL_PARTS_IN_BOTH__ \\times \\frac{1}{__DIVISOR__}$');
            const option3Feedback = getI18nText('pages.page5.quizPanel.options.option3.feedback', 'Incorrect! Try again.');
            
            return [
              {
                text: option1Text.replace(/__DIVIDEND__/g, dividend).replace(/__DIVISOR__/g, divisor),
                iscorrect: true,
                feedback: option1Feedback.replace(/__DIVIDEND__/g, dividend).replace(/__DIVISOR__/g, divisor)
              },
              {
                text: option2Text.replace(/__TOTAL_PARTS_PER_WHOLE__/g, totalPartsPerWhole).replace(/__DIVISOR__/g, divisor),
                iscorrect: false,
                feedback: option2Feedback
              },
              {
                text: option3Text.replace(/__TOTAL_PARTS_IN_BOTH__/g, totalPartsInBothWholes).replace(/__DIVISOR__/g, divisor),
                iscorrect: false,
                feedback: option3Feedback
              }
            ];
          },
          feedbackText: '',
          feedbackState: 'default'
        }
      },

      // Tap Animation GIF (positioned over Next button)
      {
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1500, 840, 1550, 890],
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
          // Remove ignorePageCompletion so quiz completion is required
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
              }
            } else if (nav && nav.next === null) {
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
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              }
            }
          }
        }
      },

      // Progress dots
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

      // Header text (same coordinates as page 5)
      {
        id: 'page6-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [100, 50, 1500, 150],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            const dividend = question.dividend || 2;
            const divisor = question.divisor || 3;
            const currentLang = typeof window !== 'undefined' && window.i18n ? window.i18n.getCurrentLanguage() : 'en';
            
            let ordinal;
            if (currentLang === 'id') {
              // Indonesian ordinals: sepertiga, seperempat, seperlima, setengah
              ordinal = divisor === 3 ? 'sepertiga' : divisor === 4 ? 'seperempat' : divisor === 5 ? 'seperlima' : divisor === 2 ? 'setengah' : `1/${divisor}`;
            } else {
              // English ordinals: third, fourth, fifth, half
              ordinal = divisor === 3 ? 'third' : divisor === 4 ? 'fourth' : divisor === 5 ? 'fifth' : divisor === 2 ? 'half' : `1/${divisor}`;
            }
            
            return getI18nText('pages.page6.headerText', 'Notice that dividing {dividend} by {divisor} is the same as multiplying {dividend} by one-{ordinal}.', { dividend, divisor, ordinal });
          },
          backgroundColor: 'transparent',
          textColor: 'var(--color-orange)',
          fontSize: '32gc',
          padding: '20gc',
          fontWeight: 'bold'
        }
      },

      // Main Content Area Container (with light orange border) - adjusted for header
      {
        id: 'page6-main-content-container',
        name: 'main-content-container',
        type: 'custom',
        coordinates: [50, 130, 1550, 740],
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(26, 31, 58, 0.3)',
          border: '3gc solid rgba(255, 153, 0, 0.6)',
          borderRadius: '15gc',
          padding: '30gc'
        }
      },

      // Top Center: "2 ÷ 3" expression (positioned over the rectangles, centered)
      {
        id: 'page6-division-expression',
        name: 'division-expression',
        type: 'custom',
        coordinates: [300, 150, 500, 220],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            const dividend = question.dividend || 2;
            const divisor = question.divisor || 3;
            return `${dividend} ÷ ${divisor}`;
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '48gc',
          padding: '10gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Left Side: Orange Rectangle (dynamically divided based on current question)
      {
        id: 'page6-orange-rect',
        name: 'orange-rect',
        type: 'custom',
        coordinates: [300, 230, 480, 660],
        zIndex: 60,
        props: {
          componentType: 'DividedRectangleStaticComponent',
          backgroundColor: '#F4A460',
          borderColor: '#ffffff',
          borderWidth: '3gc'
        }
      },

      // Left Side: Teal Rectangle (dynamically divided based on current question)
      {
        id: 'page6-teal-rect',
        name: 'teal-rect',
        type: 'custom',
        coordinates: [520, 230, 700, 660],
        zIndex: 60,
        props: {
          componentType: 'DividedRectangleStaticComponent',
          backgroundColor: '#20B2AA',
          borderColor: '#ffffff',
          borderWidth: '3gc'
        }
      },

      // Right Side: Step-by-Step Explanation Box - centered
      {
        id: 'page6-explanation-box',
        name: 'explanation-box',
        type: 'custom',
        coordinates: [750, 180, 1300, 660],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(200, 200, 200, 0.3)',
          border: '3gc solid var(--color-orange)',
          borderRadius: '15gc',
          padding: '20gc'
        }
      },

      // "Result" label in explanation box (centered at top)
      {
        id: 'page6-result-label',
        name: 'result-label',
        type: 'custom',
        coordinates: [750, 195, 1300, 245],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.resultLabel', 'Result'),
          backgroundColor: 'transparent',
          textColor: '#1ABC9C',
          fontSize: '28gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Row 1: "2" (left column - aligned with "= 2" below)
      {
        id: 'page6-row1-dividend',
        name: 'row1-dividend',
        type: 'custom',
        coordinates: [800, 260, 900, 330],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `${question.dividend || 2}`;
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '48gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Row 1: "÷" (middle column - aligned with "×" below)
      {
        id: 'page6-row1-divide',
        name: 'row1-divide',
        type: 'custom',
        coordinates: [920, 260, 1020, 330],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '÷',
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '48gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Row 1: "3" (right column - aligned with "1/3" below)
      {
        id: 'page6-row1-divisor',
        name: 'row1-divisor',
        type: 'custom',
        coordinates: [1040, 260, 1250, 330],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `${question.divisor || 3}`;
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '48gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Row 2: Arrow under "÷" with "Change sign" label
      {
        id: 'page6-arrow-change-sign',
        name: 'arrow-change-sign',
        type: 'custom',
        coordinates: [920, 340, 1020, 390],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '↓',
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      {
        id: 'page6-change-sign-label',
        name: 'change-sign-label',
        type: 'custom',
        coordinates: [850, 390, 1090, 440],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.changeSignLabel', 'Change sign'),
          backgroundColor: 'transparent',
          textColor: '#4A90E2',
          fontSize: '20gc',
          padding: '5gc',
          fontWeight: 'normal',
          fontStyle: 'italic',
          textAlign: 'center'
        }
      },

      // Row 2: Arrow under "3" with "Reciprocal" label
      {
        id: 'page6-arrow-reciprocal',
        name: 'arrow-reciprocal',
        type: 'custom',
        coordinates: [1040, 340, 1250, 390],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '↓',
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },
      {
        id: 'page6-reciprocal-label',
        name: 'reciprocal-label',
        type: 'custom',
        coordinates: [1040, 390, 1250, 440],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.reciprocalLabel', 'Reciprocal'),
          backgroundColor: 'transparent',
          textColor: '#1ABC9C',
          fontSize: '20gc',
          padding: '5gc',
          fontWeight: 'normal',
          fontStyle: 'italic',
          textAlign: 'center'
        }
      },

      // Row 3: "= 2" (left column)
      {
        id: 'page6-row3-equals-dividend',
        name: 'row3-equals-dividend',
        type: 'custom',
        coordinates: [780, 460, 900, 600],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            return `= ${question.dividend || 2}`;
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '48gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Row 3: "×" (middle column - blue color)
      {
        id: 'page6-row3-multiply',
        name: 'row3-multiply',
        type: 'custom',
        coordinates: [920, 460, 1020, 600],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×',
          backgroundColor: 'transparent',
          textColor: '#4A90E2',
          fontSize: '48gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Row 3: "1/3" fraction (right column - green color)
      {
        id: 'page6-row3-fraction',
        name: 'row3-fraction',
        type: 'custom',
        coordinates: [1040, 460, 1250, 600],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const question = getCurrentQuestion();
            const divisor = question.divisor || 3;
            return `$\\frac{1}{${divisor}}$`;
          },
          backgroundColor: 'transparent',
          textColor: '#1ABC9C',
          fontSize: '64gc',
          padding: '5gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Bottom Center: Concluding Statement (centered)
      {
        id: 'page6-conclusion',
        name: 'conclusion',
        type: 'custom',
        coordinates: [100, 680, 1500, 740],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.conclusionText', 'We can rewrite division as multiplication by the reciprocal.'),
          backgroundColor: 'transparent',
          textColor: '#FFD700',
          fontSize: '32gc',
          padding: '15gc',
          fontWeight: 'bold',
          fontStyle: 'italic',
          textAlign: 'center'
        }
      },

      // Instruction text (same coordinates as page 5)
      {
        id: 'page6-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [200, 750, 1400, 800],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            // Get current question index
            const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
              ? window.currentQuestionIndex 
              : 0;
            
            // Get total number of questions
            let totalQuestions = 1;
            try {
              const questions = getI18nText('pages.page1.questions', []);
              if (Array.isArray(questions) && questions.length > 0) {
                totalQuestions = questions.length;
              }
            } catch (error) {
              console.warn('⚠️ [Page 6 Instruction] Error getting questions array:', error);
            }
            
            // Check if this is the last question
            const isLastQuestion = (currentIndex + 1) >= totalQuestions;
            
            return isLastQuestion 
              ? getI18nText('pages.page6.instructionText.lastQuestion', 'Tap >> to continue')
              : getI18nText('pages.page6.instructionText.notLastQuestion', 'Tap Next to try a new challenge.');
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          fontWeight: 'bold'
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
          get disabled() {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              }
            }
          }
        }
      },

      // Progress dots
      {
        id: 'page6-progressDots',
        name: 'progressDots',
        type: 'progress',
        coordinates: [155, 820, 1445, 895],
        zIndex: 'var(--z-elevated)',
        props: {
          totalPages: 7
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
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            
            // Get current question index
            const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined 
              ? window.currentQuestionIndex 
              : 0;
            
            // Get total number of questions
            let totalQuestions = 1;
            try {
              const questions = getI18nText('pages.page1.questions', []);
              if (Array.isArray(questions) && questions.length > 0) {
                totalQuestions = questions.length;
              }
            } catch (error) {
              console.warn('⚠️ [Page 6 Next Button] Error getting questions array:', error);
            }
            
            // Check if this is the last question
            const isLastQuestion = (currentIndex + 1) >= totalQuestions;
            
            if (isLastQuestion) {
              // Last question - navigate to page 7 (completion page)
              console.log('🔄 [Page 6 Next Button] Last question completed - navigating to page 7');
              
              setTimeout(() => {
                if (typeof window !== 'undefined' && window.navigateToPage) {
                  console.log('🔄 [Page 6 Next Button] Using navigateToPage(7)');
                  window.navigateToPage(7);
                } else if (typeof window !== 'undefined' && window.changePageAndNotify) {
                  console.log('🔄 [Page 6 Next Button] Using changePageAndNotify(7)');
                  window.changePageAndNotify(7);
                } else if (typeof window !== 'undefined') {
                  console.log('🔄 [Page 6 Next Button] Using pageChanged event');
                  window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 7 } }));
                }
                
                console.log('✅ [Page 6 Next Button] Navigation complete - now on page 7 (completion page)');
              }, 50);
            } else {
              // Not the last question - advance to next question and go to page 2
              console.log('🔄 [Page 6 Next Button] Advancing to next question and navigating to page 2');
              
              // Calculate next question index
              const nextIndex = currentIndex + 1;
              
              console.log(`🔄 [Page 6 Next Button] Current question index: ${currentIndex}, Next question index: ${nextIndex}`);
              
              // Update question index
              if (typeof window !== 'undefined') {
                window.currentQuestionIndex = nextIndex;
                console.log(`✅ [Page 6 Next Button] Updated question index to: ${nextIndex}`);
                // Dispatch event to notify components of question change
                window.dispatchEvent(new CustomEvent('questionChanged', {
                  detail: { questionIndex: nextIndex }
                }));
              }
              
              // Reset slider values
              if (window.sliderValues) {
                window.sliderValues = {};
                console.log("✅ [Navigation] Reset slider values");
              }

              // Reset quiz panel states
              if (window.quizPanelStateStore) {
                window.quizPanelStateStore = {};
                console.log("✅ [Navigation] Reset quiz panel states");
              }

              // Reset page-specific feedback states
              if (window.pageNFeedbackState) {
                window.pageNFeedbackState = {};
                console.log("✅ [Navigation] Reset page feedback states");
              }
              
              // Reset global window variables
              window.objectsremoved = 0;
              window.page1complete = false;
              
              // Navigate to page 2 with next question
              console.log('🔄 [Page 6 Next Button] Navigating to page 2...');
              
              // Use setTimeout to ensure state updates complete before navigation
              setTimeout(() => {
                // Try navigateToPage first (most direct method)
                if (typeof window !== 'undefined' && window.navigateToPage) {
                  console.log('🔄 [Page 6 Next Button] Using navigateToPage(2)');
                  window.navigateToPage(2);
                } else if (typeof window !== 'undefined' && window.changePageAndNotify) {
                  console.log('🔄 [Page 6 Next Button] Using changePageAndNotify(2)');
                  window.changePageAndNotify(2);
                } else if (typeof window !== 'undefined') {
                  console.log('🔄 [Page 6 Next Button] Using pageChanged event');
                  window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
                }
                
                // Force update to refresh question-dependent elements
                if (window.updateQuestionDependentElements) {
                  window.updateQuestionDependentElements();
                }
                
                console.log(`✅ [Page 6 Next Button] Navigation complete - now on page 2 with question index ${nextIndex}`);
              }, 50);
            }
          }
        }
      }
    ],

    7: [
      // Background with numbers 1-10
      {
        id: 'page7-background',
        name: 'background',
        type: 'custom',
        coordinates: [0, 0, 1600, 900],
        zIndex: -1,
        props: {
          componentType: 'BackgroundWithNumbersComponent'
        }
      },

      // Top Center: "Activity Completed!" in orange (centered)
      {
        id: 'page7-activity-completed',
        name: 'activity-completed',
        type: 'custom',
        coordinates: [100, 50, 1500, 150],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.headerText', 'Activity Completed!'),
          backgroundColor: 'transparent',
          textColor: 'var(--color-orange)',
          fontSize: '48gc',
          padding: '20gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Rule text in white
      {
        id: 'page7-rule-text',
        name: 'rule-text',
        type: 'custom',
        coordinates: [100, 180, 1500, 250],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.ruleText', 'Division by a number is the same as multiplying with reciprocal of that number.'),
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '20gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Centered explanation box with dark gray background and light yellow border
      {
        id: 'page7-explanation-box',
        name: 'explanation-box',
        type: 'custom',
        coordinates: [200, 300, 1400, 600],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(50, 50, 50, 0.8)',
          border: '3gc solid #FFD700',
          borderRadius: '15gc',
          padding: '40gc'
        }
      },

      // Line 1: "Number 1 ÷ Number 2" (yellow and blue)
      {
        id: 'page7-line1',
        name: 'line1',
        type: 'custom',
        coordinates: [250, 320, 1350, 400],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const baseText = getI18nText('pages.page7.line1', 'Number 1 ÷ Number 2');
            // Format with colors: Number 1 (yellow), ÷ (blue), Number 2 (yellow)
            return baseText.replace(/(Number 1|Number 2)/g, '<span style="color: #FFD700;">$1</span>').replace(/÷/g, '<span style="color: #4A90E2;">÷</span>');
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '10gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Line 2: "= Number 1 × Reciprocal of Number 2" (yellow and blue)
      {
        id: 'page7-line2',
        name: 'line2',
        type: 'custom',
        coordinates: [250, 420, 1350, 500],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const baseText = getI18nText('pages.page7.line2', '= Number 1 × Reciprocal of Number 2');
            // Format with colors: = (white), Number 1 (yellow), × (blue), Reciprocal of Number 2 (yellow)
            return baseText.replace(/=/g, '<span style="color: #ffffff;">=</span>')
              .replace(/(Number 1|Reciprocal of Number 2)/g, '<span style="color: #FFD700;">$1</span>')
              .replace(/×/g, '<span style="color: #4A90E2;">×</span>');
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '10gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Line 3: "= Number 1 × (1/Number 2)" (yellow and blue, fraction in blue)
      {
        id: 'page7-line3',
        name: 'line3',
        type: 'custom',
        coordinates: [250, 520, 1350, 580],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            const baseText = getI18nText('pages.page7.line3', '= Number 1 × (1/Number 2)');
            // Format with colors: = (white), Number 1 (yellow), × (blue), fraction (yellow)
            // Replace (1/Number 2) with KaTeX fraction
            return baseText.replace(/=/g, '<span style="color: #ffffff;">=</span>')
              .replace(/Number 1/g, '<span style="color: #FFD700;">Number 1</span>')
              .replace(/×/g, '<span style="color: #4A90E2;">×</span>')
              .replace(/\(1\/Number 2\)/g, '<span style="color: #FFD700;">$\\frac{1}{Number 2}$</span>');
          },
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '10gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Instruction text: "Tap 'Start Over' to restart the activity."
      {
        id: 'page7-instruction',
        name: 'instruction',
        type: 'custom',
        coordinates: [200, 650, 1400, 720],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.instructionText', "Tap 'Start Over' to restart the activity."),
          backgroundColor: 'transparent',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '20gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Start Over button (orange with gradient, bold black text)
      {
        id: 'page7-start-over-button',
        name: 'start-over-button',
        type: 'button',
        coordinates: [600, 750, 1000, 850],
        zIndex: 'var(--z-button)',
        props: {
          text: getI18nText('buttons.startOver', 'Start Over'),
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            
            console.log('🔄 [Page 7 Start Over Button] Restarting activity');
            
            // Reset all states
            if (window.advanceToNextQuestion) {
              window.advanceToNextQuestion();
            }
            
            // Reset slider values
            if (window.sliderValues) {
              window.sliderValues = {};
            }

            // Reset quiz panel states
            if (window.quizPanelStateStore) {
              window.quizPanelStateStore = {};
            }

            // Reset page-specific feedback states
            if (window.pageNFeedbackState) {
              window.pageNFeedbackState = {};
            }
            
            // Reset global window variables
            window.objectsremoved = 0;
            window.page1complete = false;
            
            // Navigate to page 1
            if (window.changePageAndNotify) {
              window.changePageAndNotify(1);
            } else if (window.navigateToPage) {
              window.navigateToPage(1);
            } else {
              window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
            }
            
            // Force update
            if (window.updateQuestionDependentElements) {
              window.updateQuestionDependentElements();
            }
            
            console.log('✅ [Page 7 Start Over Button] Activity restarted - now on page 1');
          },
          backgroundColor: 'var(--color-orange)',
          textColor: '#000000',
          fontSize: '40gc',
          fontWeight: 'bold',
          borderRadius: '15gc',
          padding: '20gc'
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
          // Dispatch event to notify components of question change
          window.dispatchEvent(new CustomEvent('questionChanged', {
            detail: { questionIndex: newIndex }
          }));

          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;

          // Reset slider values
          if (window.sliderValues) {
            window.sliderValues = {};
            console.log("✅ [Navigation] Reset slider values");
          }

          // Reset quiz panel states
          if (window.quizPanelStateStore) {
            window.quizPanelStateStore = {};
            console.log("✅ [Navigation] Reset quiz panel states");
          }

          // Reset page-specific feedback states
          if (window.pageNFeedbackState) {
            window.pageNFeedbackState = {};
            console.log("✅ [Navigation] Reset page feedback states");
          }

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
