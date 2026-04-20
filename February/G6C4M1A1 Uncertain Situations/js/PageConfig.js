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
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: null },
  14: { prev: 13, next: 15 },
  15: { prev: 14, next: 16 },
  16: { prev: 15, next: 17 },
  17: { prev: 16, next: 18 },
  18: { prev: 17, next: 19 },
  19: { prev: 18, next: 20 },
  20: { prev: 19, next: null }

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

  // Helper function to get CSS variable value
  const getCSSVariable = (variableName, fallback = '') => {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      try {
        const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
        return value || fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  // Return optimized GridPositionPages
  return {
    1: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page1-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page1.title',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page1-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [300, 100, 1300, 675], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.mainText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '42gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Tap Animation GIF
      {
        id: 'page1-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [650, 730, 720, 830],
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
        coordinates: [650, 700, 950, 800],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.start', 'Start');
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



    ],
    2: [

      {
        id: 'page2-image-background-text',
        name: 'page2-image-background-text',
        type: 'custom',
        coordinates: [5, 10, 895, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.questionText', ''), // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      //quiz panel
      {
        id: 'page2-quiz-panel',
        name: 'page2-quiz-panel',
        type: 'custom',
        coordinates: [5, 300, 895, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page2-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page2.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page2.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '38gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 50, // Options row: 70%
          feedbackRowHeight: 45, // Feedback row: 15%
          optionButtonWidth: 80,
          optionButtonHeight: 70,
          questionTextFontSize: '40gc', // Font size for question text (in gc units)
          optionButtonTextSize: '60gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page2.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          allowHtml: true
        }
      },
      // Black background container for question text
      {
        id: 'page2-image-background',
        name: 'page2-image-background',
        type: 'custom',
        coordinates: [900, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },


      // sun image
      {
        id: 'page2-sun-image',
        name: 'page2-sun-image',
        type: 'container',
        coordinates: [920, 80, 1575, 800], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/sun.png',
        }
      },


      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page2-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page2.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for specific page

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

    ],
    3: [

      {
        id: 'page3-image-background-text',
        name: 'page3-image-background-text',
        type: 'custom',
        coordinates: [5, 10, 895, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.questionText', ''), // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [5, 300, 895, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page3.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page3.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '38gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 50, // Options row: 70%
          feedbackRowHeight: 45, // Feedback row: 15%
          optionButtonWidth: 80,
          optionButtonHeight: 70,
          questionTextFontSize: '40gc', // Font size for question text (in gc units)
          optionButtonTextSize: '60gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page3.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          allowHtml: true
        }
      },
      // Black background container for question text
      {
        id: 'page3-image-background',
        name: 'page3-image-background',
        type: 'custom',
        coordinates: [900, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },


      // classroom image
      {
        id: 'page3-classroom-image',
        name: 'page3-classroom-image',
        type: 'container',
        coordinates: [920, 50, 1575, 750], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/classroom.png',
        }
      },


      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page3-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page3.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3', 'Dispatched page change event to page 3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    4: [

      {
        id: 'page4-image-background-text',
        name: 'page4-image-background-text',
        type: 'custom',
        coordinates: [5, 10, 895, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.questionText', ''), // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      //quiz panel
      {
        id: 'page4-quiz-panel',
        name: 'page4-quiz-panel',
        type: 'custom',
        coordinates: [5, 300, 895, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page4-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page4.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page4.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '38gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 50, // Options row: 70%
          feedbackRowHeight: 45, // Feedback row: 15%
          optionButtonWidth: 80,
          optionButtonHeight: 70,
          questionTextFontSize: '40gc', // Font size for question text (in gc units)
          optionButtonTextSize: '60gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page4.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          allowHtml: true
        }
      },
      // Black background container for question text
      {
        id: 'page4-image-background',
        name: 'page4-image-background',
        type: 'custom',
        coordinates: [900, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },


      //komodo image
      {
        id: 'page4-komodo-image',
        name: 'page4-komodo-image',
        type: 'container',
        coordinates: [920, 50, 1575, 750], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/komodo.png',
        }
      },


      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page4-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page4.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage4', 'Dispatched page change event to page 3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    5: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page5-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page5.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 1
      {
        id: 'page5-image-background-1',
        name: 'page5-image-background-1',
        type: 'custom',
        coordinates: [50, 100, 550, 600], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // //sun image
      {
        id: 'page5-sun-image',
        name: 'page5-sun-image',
        type: 'container',
        coordinates: [60, 110, 540, 400], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/sun.png',
        }
      },
      //sunrise tommorow text
      {
        id: 'page5-sunrise-tomorrow-text-1',
        name: 'page5-sunrise-tomorrow-text-1',
        type: 'custom',
        coordinates: [60, 400, 540, 450], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.sunriseText',
            "Sunrise tomorrow"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //yes chip
      {
        id: 'page5-yes-chip',
        name: 'page5-yes-chip',
        type: 'custom',
        coordinates: [220, 480, 380, 570], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.yes',
            "Sunrise tomorrow"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //right mark
      {
        id: 'page5-right-mark',
        name: 'page5-right-mark',
        type: 'custom',
        coordinates: [255, 550, 345, 630], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //willAlwaysHappen
      {
        id: 'page5-sunrise-tomorrow-text',
        name: 'page5-sunrise-tomorrow-text',
        type: 'custom',
        coordinates: [60, 635, 540, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.willAlwaysHappen',
            "Will always happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page5-image-background-2',
        name: 'page5-image-background-2',
        type: 'custom',
        coordinates: [555, 100, 1055, 600], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // classroom image
      {
        id: 'page5-classroom-image',
        name: 'page5-classroom-image',
        type: 'container',
        coordinates: [565, 110, 1045, 340], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/classroom.png',
        }
      },
      //fullAttandanceText
      {
        id: 'page5-full-attendance-text',
        name: 'page5-full-attendance-text',
        type: 'custom',
        coordinates: [555, 400, 1035, 450], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.fullAttandanceText',
            "Full attendance tomorrow"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //maybe chip
      {
        id: 'page5-maybe-chip',
        name: 'page5-maybe-chip',
        type: 'custom',
        coordinates: [725, 480, 885, 570], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.maybe',
            "Maybe tomorrow"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //question mark
      {
        id: 'page5-question-mark',
        name: 'page5-question-mark',
        type: 'custom',
        coordinates: [760, 550, 850, 630], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //mayOrMayNotHappen
      {
        id: 'page5-may-Or-May-Not-Happen-text',
        name: 'page5-may-Or-May-Not-Happen-text',
        type: 'custom',
        coordinates: [555, 635, 1055, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.mayOrMayNotHappen',
            "May or may not happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page5-image-background-3',
        name: 'page5-image-background-3',
        type: 'custom',
        coordinates: [1060, 100, 1560, 600], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // komodo image
      {
        id: 'page5-komodo-image',
        name: 'page5-komodo-image',
        type: 'container',
        coordinates: [1070, 110, 1550, 340], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/komodo.png',
        }
      },
      //classWithKomodoText
      {
        id: 'page5-class-with-komodo-text',
        name: 'page5-class-with-komodo-text',
        type: 'custom',
        coordinates: [1060, 400, 1560, 450], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.classWithKomodoText',
            "Full attendance tomorrow"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //no chip
      {
        id: 'page5-no-chip',
        name: 'page5-no-chip',
        type: 'custom',
        coordinates: [1230, 480, 1380, 570], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.no',
            "No"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //cross mark
      {
        id: 'page5-cross-mark',
        name: 'page5-cross-mark',
        type: 'custom',
        coordinates: [1265, 550, 1355, 630], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //canNeverHappen
      {
        id: 'page5-can-Never-Happen-text',
        name: 'page5-can-Never-Happen-text',
        type: 'custom',
        coordinates: [1060, 635, 1560, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.canNeverHappen',
            "Can never happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Tap Animation GIF
      {
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [680, 790, 730, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',

        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page5-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [680, 790, 980, 890],
        zIndex: 'var(--z-button)',
        props: {


          text: getI18nText('buttons.continue', '»'),
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage5', 'Dispatched page change event to page 3'));
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
      }
    ],
    6: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page6-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page6.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 1
      {
        id: 'page6-image-background-1',
        name: 'page6-image-background-1',
        type: 'custom',
        coordinates: [50, 100, 550, 600], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // //sun image
      {
        id: 'page6-sun-image',
        name: 'page6-sun-image',
        type: 'container',
        coordinates: [60, 110, 540, 400], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/sun.png',
        }
      },
      //sunrise tommorow text
      {
        id: 'page6-sunrise-tomorrow-text-1',
        name: 'page6-sunrise-tomorrow-text-1',
        type: 'custom',
        coordinates: [60, 400, 540, 450], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.sunriseText',
            "Sunrise tomorrow"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //yes chip
      {
        id: 'page6-yes-chip',
        name: 'page6-yes-chip',
        type: 'custom',
        coordinates: [220, 480, 380, 570], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.yes',
            "Sunrise tomorrow"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //right mark
      {
        id: 'page6-right-mark',
        name: 'page6-right-mark',
        type: 'custom',
        coordinates: [255, 550, 345, 630], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //willAlwaysHappen
      {
        id: 'page6-sunrise-tomorrow-text',
        name: 'page6-sunrise-tomorrow-text',
        type: 'custom',
        coordinates: [60, 635, 540, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.willAlwaysHappen',
            "Will always happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //certainEvents
      {
        id: 'page6-certain-events-text',
        name: 'page6-certain-events-text',
        type: 'custom',
        coordinates: [80, 680, 520, 750], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page6-image-background-2',
        name: 'page6-image-background-2',
        type: 'custom',
        coordinates: [555, 100, 1055, 600], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // classroom image
      {
        id: 'page6-classroom-image',
        name: 'page6-classroom-image',
        type: 'container',
        coordinates: [565, 110, 1045, 340], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/classroom.png',
        }
      },
      //fullAttandanceText
      {
        id: 'page6-full-attendance-text',
        name: 'page6-full-attendance-text',
        type: 'custom',
        coordinates: [555, 400, 1035, 450], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.fullAttandanceText',
            "Full attendance tomorrow"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //maybe chip
      {
        id: 'page6-maybe-chip',
        name: 'page6-maybe-chip',
        type: 'custom',
        coordinates: [725, 480, 885, 570], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.maybe',
            "Maybe tomorrow"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //question mark
      {
        id: 'page6-question-mark',
        name: 'page6-question-mark',
        type: 'custom',
        coordinates: [760, 550, 850, 630], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //mayOrMayNotHappen
      {
        id: 'page6-may-Or-May-Not-Happen-text',
        name: 'page6-may-Or-May-Not-Happen-text',
        type: 'custom',
        coordinates: [555, 635, 1055, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.mayOrMayNotHappen',
            "May or may not happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //uncertainEvents
      {
        id: 'page6-uncertain-events-text',
        name: 'page6-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 680, 1035, 750], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page6-image-background-3',
        name: 'page6-image-background-3',
        type: 'custom',
        coordinates: [1060, 100, 1560, 600], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // komodo image
      {
        id: 'page6-komodo-image',
        name: 'page6-komodo-image',
        type: 'container',
        coordinates: [1070, 110, 1550, 340], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/komodo.png',
        }
      },
      //classWithKomodoText
      {
        id: 'page6-class-with-komodo-text',
        name: 'page6-class-with-komodo-text',
        type: 'custom',
        coordinates: [1060, 400, 1560, 450], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.classWithKomodoText',
            "Full attendance tomorrow"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //no chip
      {
        id: 'page6-no-chip',
        name: 'page6-no-chip',
        type: 'custom',
        coordinates: [1230, 480, 1380, 570], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.no',
            "No"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //cross mark
      {
        id: 'page6-cross-mark',
        name: 'page6-cross-mark',
        type: 'custom',
        coordinates: [1265, 550, 1355, 630], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //canNeverHappen
      {
        id: 'page6-can-Never-Happen-text',
        name: 'page6-can-Never-Happen-text',
        type: 'custom',
        coordinates: [1060, 635, 1560, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.canNeverHappen',
            "Can never happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //impossibleEvents
      {
        id: 'page6-impossible-events-text',
        name: 'page6-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 680, 1540, 750], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Tap Animation GIF
      {
        id: 'page6-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [680, 790, 730, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',

        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page6-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [680, 790, 980, 890],
        zIndex: 'var(--z-button)',
        props: {


          text: getI18nText('buttons.continue', '»'),
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage6', 'Dispatched page change event to page 3'));
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
      }
    ],
    7: [

      //background 1
      {
        id: 'page7-image-background-1',
        name: 'page7-image-background-1',
        type: 'custom',
        coordinates: [50, 80, 550, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },


      //right mark
      {
        id: 'page7-right-mark',
        name: 'page7-right-mark',
        type: 'custom',
        coordinates: [255, 160, 345, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //certainEvents
      {
        id: 'page7-certain-events-text',
        name: 'page7-certain-events-text',
        type: 'custom',
        coordinates: [80, 30, 520, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page7-image-background-2',
        name: 'page7-image-background-2',
        type: 'custom',
        coordinates: [555, 80, 1055, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //question mark
      {
        id: 'page7-question-mark',
        name: 'page7-question-mark',
        type: 'custom',
        coordinates: [760, 160, 850, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //uncertainEvents
      {
        id: 'page7-uncertain-events-text',
        name: 'page7-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 30, 1035, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page7-image-background-3',
        name: 'page7-image-background-3',
        type: 'custom',
        coordinates: [1060, 80, 1560, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //cross mark
      {
        id: 'page7-cross-mark',
        name: 'page7-cross-mark',
        type: 'custom',
        coordinates: [1265, 160, 1355, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //impossibleEvents
      {
        id: 'page7-impossible-events-text',
        name: 'page7-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 30, 1540, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Fill Blanks Component
      {
        id: 'page7-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page7-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            {
              id: 'blank1',
              coordinate: [60, 280, 290, 540], // Column 2, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank2',
              coordinate: [310, 280, 540, 540], // Column 2, Row 2 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank3',
              coordinate: [565, 280, 795, 540], // Column 3, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank4',
              coordinate: [815, 280, 1045, 540], // Column 4, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank5',
              coordinate: [1070, 280, 1300, 540], // Column 5, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank6',
              coordinate: [1320, 280, 1550, 540], // Column 6, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '4gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [50, 550, 350, 800], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page7.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page7.fillBlanks.impFormulae', [])
        }
      },
      {
        id: 'page7-image-drag-text',
        name: 'page7-image-drag-text',
        type: 'custom',
        coordinates: [370, 550, 1070, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.questionText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox-unique",
        type: "custom",
        coordinates: [1090, 560, 1560, 810], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page7-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: 'page7-instruction-text',
        name: 'page7-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page7-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page7.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 7 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage7', 'Dispatched page change event to page 3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },


    ],
    8: [

      //background 1
      {
        id: 'page8-image-background-1',
        name: 'page8-image-background-1',
        type: 'custom',
        coordinates: [50, 80, 550, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },


      //right mark
      {
        id: 'page8-right-mark',
        name: 'page8-right-mark',
        type: 'custom',
        coordinates: [255, 160, 345, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //certainEvents
      {
        id: 'page8-certain-events-text',
        name: 'page8-certain-events-text',
        type: 'custom',
        coordinates: [80, 30, 520, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page8-image-background-2',
        name: 'page8-image-background-2',
        type: 'custom',
        coordinates: [555, 80, 1055, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //question mark
      {
        id: 'page8-question-mark',
        name: 'page8-question-mark',
        type: 'custom',
        coordinates: [760, 160, 850, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //uncertainEvents
      {
        id: 'page8-uncertain-events-text',
        name: 'page8-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 30, 1035, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page8-image-background-3',
        name: 'page8-image-background-3',
        type: 'custom',
        coordinates: [1060, 80, 1560, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //cross mark
      {
        id: 'page8-cross-mark',
        name: 'page8-cross-mark',
        type: 'custom',
        coordinates: [1265, 160, 1355, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //impossibleEvents
      {
        id: 'page8-impossible-events-text',
        name: 'page8-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 30, 1540, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Fill Blanks Component
      {
        id: 'page8-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page8-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            {
              id: 'blank1',
              coordinate: [60, 280, 290, 540], // Column 2, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank2',
              coordinate: [310, 280, 540, 540], // Column 2, Row 2 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank3',
              coordinate: [565, 280, 795, 540], // Column 3, Row 1 (with padding)
              text: '',
              image: 'assets/rainyDay.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank4',
              coordinate: [815, 280, 1045, 540], // Column 4, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank5',
              coordinate: [1070, 280, 1300, 540], // Column 5, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank6',
              coordinate: [1320, 280, 1550, 540], // Column 6, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '4gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [50, 550, 350, 800], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page8.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page8.fillBlanks.impFormulae', [])
        }
      },
      {
        id: 'page8-image-drag-text',
        name: 'page8-image-drag-text',
        type: 'custom',
        coordinates: [370, 550, 1070, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.questionText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page8-feedback-textbox",
        name: "page8-feedback-textbox-unique",
        type: "custom",
        coordinates: [1090, 560, 1560, 810], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page8-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: 'page8-instruction-text',
        name: 'page8-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page8-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page8.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false,
          showOnEventFilter: { pageNumber: 8 } // Only show for specific page
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 8 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage8', 'Dispatched page change event to page 3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },


    ],
    9: [

      //background 1
      {
        id: 'page9-image-background-1',
        name: 'page9-image-background-1',
        type: 'custom',
        coordinates: [50, 80, 550, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },


      //right mark
      {
        id: 'page9-right-mark',
        name: 'page9-right-mark',
        type: 'custom',
        coordinates: [255, 160, 345, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //certainEvents
      {
        id: 'page9-certain-events-text',
        name: 'page9-certain-events-text',
        type: 'custom',
        coordinates: [80, 30, 520, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page9-image-background-2',
        name: 'page9-image-background-2',
        type: 'custom',
        coordinates: [555, 80, 1055, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //question mark
      {
        id: 'page9-question-mark',
        name: 'page9-question-mark',
        type: 'custom',
        coordinates: [760, 160, 850, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //uncertainEvents
      {
        id: 'page9-uncertain-events-text',
        name: 'page9-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 30, 1035, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page9-image-background-3',
        name: 'page9-image-background-3',
        type: 'custom',
        coordinates: [1060, 80, 1560, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //cross mark
      {
        id: 'page9-cross-mark',
        name: 'page9-cross-mark',
        type: 'custom',
        coordinates: [1265, 160, 1355, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //impossibleEvents
      {
        id: 'page9-impossible-events-text',
        name: 'page9-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 30, 1540, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Fill Blanks Component
      {
        id: 'page9-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page9-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            {
              id: 'blank1',
              coordinate: [60, 280, 290, 540], // Column 2, Row 1 (with padding)
              text: '',
              image: 'assets/footballBouncing.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank2',
              coordinate: [310, 280, 540, 540], // Column 2, Row 2 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank3',
              coordinate: [565, 280, 795, 540], // Column 3, Row 1 (with padding)
              text: '',
              image: 'assets/rainyDay.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank4',
              coordinate: [815, 280, 1045, 540], // Column 4, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank5',
              coordinate: [1070, 280, 1300, 540], // Column 5, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank6',
              coordinate: [1320, 280, 1550, 540], // Column 6, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '4gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [50, 550, 350, 800], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page9.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page9.fillBlanks.impFormulae', [])
        }
      },
      {
        id: 'page9-image-drag-text',
        name: 'page9-image-drag-text',
        type: 'custom',
        coordinates: [370, 550, 1070, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page9.questionText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [1090, 560, 1560, 810], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page9-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: 'page9-instruction-text',
        name: 'page9-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page9-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page9.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false,
          showOnEventFilter: { pageNumber: 9 } // Only show for specific page
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 9 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage9', 'Dispatched page change event to page 3'));
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
        id: 'page9-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },


    ],
    10: [

      //background 1
      {
        id: 'page10-image-background-1',
        name: 'page10-image-background-1',
        type: 'custom',
        coordinates: [50, 80, 550, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },


      //right mark
      {
        id: 'page10-right-mark',
        name: 'page10-right-mark',
        type: 'custom',
        coordinates: [255, 160, 345, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //certainEvents
      {
        id: 'page10-certain-events-text',
        name: 'page10-certain-events-text',
        type: 'custom',
        coordinates: [80, 30, 520, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page10-image-background-2',
        name: 'page10-image-background-2',
        type: 'custom',
        coordinates: [555, 80, 1055, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //question mark
      {
        id: 'page10-question-mark',
        name: 'page10-question-mark',
        type: 'custom',
        coordinates: [760, 160, 850, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //uncertainEvents
      {
        id: 'page10-uncertain-events-text',
        name: 'page10-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 30, 1035, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page10-image-background-3',
        name: 'page10-image-background-3',
        type: 'custom',
        coordinates: [1060, 80, 1560, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //cross mark
      {
        id: 'page10-cross-mark',
        name: 'page10-cross-mark',
        type: 'custom',
        coordinates: [1265, 160, 1355, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //impossibleEvents
      {
        id: 'page10-impossible-events-text',
        name: 'page10-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 30, 1540, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Fill Blanks Component
      {
        id: 'page10-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page10-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            {
              id: 'blank1',
              coordinate: [60, 280, 290, 540], // Column 2, Row 1 (with padding)
              text: '',
              image: 'assets/footballBouncing.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank2',
              coordinate: [310, 280, 540, 540], // Column 2, Row 2 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank3',
              coordinate: [565, 280, 795, 540], // Column 3, Row 1 (with padding)
              text: '',
              image: 'assets/rainyDay.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank4',
              coordinate: [815, 280, 1045, 540], // Column 4, Row 1 (with padding)
              text: '',
              image: 'assets/dice.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank5',
              coordinate: [1070, 280, 1300, 540], // Column 5, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank6',
              coordinate: [1320, 280, 1550, 540], // Column 6, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '4gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [50, 550, 350, 800], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page10.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page10.fillBlanks.impFormulae', [])
        }
      },
      {
        id: 'page10-image-drag-text',
        name: 'page10-image-drag-text',
        type: 'custom',
        coordinates: [370, 550, 1070, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page10.questionText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [1090, 560, 1560, 810], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: 'page10-instruction-text',
        name: 'page10-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page10-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page10.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false,
          showOnEventFilter: { pageNumber: 10 } // Only show for specific page
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 10 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage10', 'Dispatched page change event to page 3'));
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
        id: 'page10-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },


    ],
    11: [

      //background 1
      {
        id: 'page11-image-background-1',
        name: 'page11-image-background-1',
        type: 'custom',
        coordinates: [50, 80, 550, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },


      //right mark
      {
        id: 'page11-right-mark',
        name: 'page11-right-mark',
        type: 'custom',
        coordinates: [255, 160, 345, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //certainEvents
      {
        id: 'page11-certain-events-text',
        name: 'page11-certain-events-text',
        type: 'custom',
        coordinates: [80, 30, 520, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page11-image-background-2',
        name: 'page11-image-background-2',
        type: 'custom',
        coordinates: [555, 80, 1055, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //question mark
      {
        id: 'page11-question-mark',
        name: 'page11-question-mark',
        type: 'custom',
        coordinates: [760, 160, 850, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //uncertainEvents
      {
        id: 'page11-uncertain-events-text',
        name: 'page11-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 30, 1035, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page11-image-background-3',
        name: 'page11-image-background-3',
        type: 'custom',
        coordinates: [1060, 80, 1560, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //cross mark
      {
        id: 'page11-cross-mark',
        name: 'page11-cross-mark',
        type: 'custom',
        coordinates: [1265, 160, 1355, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //impossibleEvents
      {
        id: 'page11-impossible-events-text',
        name: 'page11-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 30, 1540, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Fill Blanks Component
      {
        id: 'page11-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page11-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            {
              id: 'blank1',
              coordinate: [60, 280, 290, 540], // Column 2, Row 1 (with padding)
              text: '',
              image: 'assets/footballBouncing.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank2',
              coordinate: [310, 280, 540, 540], // Column 2, Row 2 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank3',
              coordinate: [565, 280, 795, 540], // Column 3, Row 1 (with padding)
              text: '',
              image: 'assets/rainyDay.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank4',
              coordinate: [815, 280, 1045, 540], // Column 4, Row 1 (with padding)
              text: '',
              image: 'assets/dice.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank5',
              coordinate: [1070, 280, 1300, 540], // Column 5, Row 1 (with padding)
              text: '',
              image: 'assets/noQuestions.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank6',
              coordinate: [1320, 280, 1550, 540], // Column 6, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '4gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [50, 550, 350, 800], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page11.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page11.fillBlanks.impFormulae', [])
        }
      },
      {
        id: 'page11-image-drag-text',
        name: 'page11-image-drag-text',
        type: 'custom',
        coordinates: [370, 550, 1070, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.questionText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page11-feedback-textbox",
        name: "page11-feedback-textbox-unique",
        type: "custom",
        coordinates: [1090, 560, 1560, 810], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page11-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: 'page11-instruction-text',
        name: 'page11-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page11-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page11.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
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
          imageAlt: 'Tap',
          initialVisible: false,
          showOnEventFilter: { pageNumber: 11 } // Only show for specific page
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page11-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 11 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page11-next-button');
            return getNextButtonText(pageNumber);
          },
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage11', 'Dispatched page change event to page 3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },


    ],
    12: [

      //background 1
      {
        id: 'page12-image-background-1',
        name: 'page12-image-background-1',
        type: 'custom',
        coordinates: [50, 80, 550, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },


      //right mark
      {
        id: 'page12-right-mark',
        name: 'page12-right-mark',
        type: 'custom',
        coordinates: [255, 160, 345, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //certainEvents
      {
        id: 'page12-certain-events-text',
        name: 'page12-certain-events-text',
        type: 'custom',
        coordinates: [80, 30, 520, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 2
      {
        id: 'page12-image-background-2',
        name: 'page12-image-background-2',
        type: 'custom',
        coordinates: [555, 80, 1055, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //question mark
      {
        id: 'page12-question-mark',
        name: 'page12-question-mark',
        type: 'custom',
        coordinates: [760, 160, 850, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //uncertainEvents
      {
        id: 'page12-uncertain-events-text',
        name: 'page12-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 30, 1035, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //background 3
      {
        id: 'page12-image-background-3',
        name: 'page12-image-background-3',
        type: 'custom',
        coordinates: [1060, 80, 1560, 550], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },

      //cross mark
      {
        id: 'page12-cross-mark',
        name: 'page12-cross-mark',
        type: 'custom',
        coordinates: [1265, 160, 1355, 240], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },

      //impossibleEvents
      {
        id: 'page12-impossible-events-text',
        name: 'page12-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 30, 1540, 130], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Fill Blanks Component
      {
        id: 'page12-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page12-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            {
              id: 'blank1',
              coordinate: [60, 280, 290, 540], // Column 2, Row 1 (with padding)
              text: '',
              image: 'assets/footballBouncing.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank2',
              coordinate: [310, 280, 540, 540], // Column 2, Row 2 (with padding)
              text: '',
              image: 'assets/iceMelting.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank3',
              coordinate: [565, 280, 795, 540], // Column 3, Row 1 (with padding)
              text: '',
              image: 'assets/rainyDay.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank4',
              coordinate: [815, 280, 1045, 540], // Column 4, Row 1 (with padding)
              text: '',
              image: 'assets/dice.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank5',
              coordinate: [1070, 280, 1300, 540], // Column 5, Row 1 (with padding)
              text: '',
              image: 'assets/noQuestions.png',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            {
              id: 'blank6',
              coordinate: [1320, 280, 1550, 540], // Column 6, Row 1 (with padding)
              text: '',
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '4gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'dashed',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [50, 550, 350, 800], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page12.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page12.fillBlanks.impFormulae', [])
        }
      },
      {
        id: 'page12-image-drag-text',
        name: 'page12-image-drag-text',
        type: 'custom',
        coordinates: [370, 550, 1070, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.questionText', ''), // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '60gc',
          padding: '0gc',
          allowHtml: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page12-feedback-textbox",
        name: "page12-feedback-textbox-unique",
        type: "custom",
        coordinates: [1090, 560, 1560, 810], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page12-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: 'page12-instruction-text',
        name: 'page12-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page12-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page12.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: 'pre-line'
        }
      },

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
          imageAlt: 'Tap',
          initialVisible: false,
          showOnEventFilter: { pageNumber: 12 } // Only show for specific page
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 12 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage12', 'Dispatched page change event to page 3'));
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
        id: 'page12-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },


    ],
    13: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page13-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page13.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      
      // //sun image
      {
        id: 'page13-sun-image',
        name: 'page13-sun-image',
        type: 'container',
        coordinates: [60, 160, 290, 420], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/footballBouncing.png',
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          padding: '0gc',
        }
      },
      // ice melting image
      {
        id: 'page13-ice-melting-image',
        name: 'page13-ice-melting-image',
        type: 'container',
        coordinates: [310, 160, 540, 420], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/iceMelting.png',
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          padding: '0gc',
        }
      },
      //certainEvents
      {
        id: 'page13-certain-events-text',
        name: 'page13-certain-events-text',
        type: 'custom',
        coordinates: [80, 430, 520, 500], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.certainEvents',
            "Certain Events"
          ),
          backgroundColor: '#6AA84F',
          border: '3px solid #2a7b07',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //right mark
      {
        id: 'page13-right-mark',
        name: 'page13-right-mark',
        type: 'custom',
        coordinates: [255, 520, 345, 610], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '✔',
          backgroundColor: '#6AA84F',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '50gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //willAlwaysHappen
      {
        id: 'page13-sunrise-tomorrow-text',
        name: 'page13-sunrise-tomorrow-text',
        type: 'custom',
        coordinates: [60, 635, 540, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.willAlwaysHappen',
            "Will always happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      
     
      // rainy day image
      {
        id: 'page13-rainy-day-image',
        name: 'page13-rainy-day-image',
        type: 'container',
        coordinates: [565, 160, 795, 420], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/rainyDay.png',
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          padding: '0gc',
        }
      },
      // dice image
      {
        id: 'page13-dice-image',
        name: 'page13-dice-image',
        type: 'container',
        coordinates: [815, 160, 1045, 420], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/dice.png',
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          padding: '0gc',
        }
      },
      
      //question mark
      {
        id: 'page13-question-mark',
        name: 'page13-question-mark',
        type: 'custom',
        coordinates: [760, 520, 850, 610], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: '#E69138',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //mayOrMayNotHappen
      {
        id: 'page13-may-Or-May-Not-Happen-text',
        name: 'page13-may-Or-May-Not-Happen-text',
        type: 'custom',
        coordinates: [555, 635, 1055, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.mayOrMayNotHappen',
            "May or may not happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //uncertainEvents
      {
        id: 'page13-uncertain-events-text',
        name: 'page13-uncertain-events-text',
        type: 'custom',
        coordinates: [575, 430, 1035, 500], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.uncertainEvents',
            "Uncertain Events"
          ),
          backgroundColor: '#E69138',
          border: '3px solid #a95903',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      
      // noquestion  image
      {
        id: 'page13-no-questions-image',
        name: 'page13-no-questions-image',
        type: 'container',
        coordinates: [1070, 160, 1300, 420], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/noQuestions.png',
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          padding: '0gc',
        }
      },
      // pencilLonger  image
      {
        id: 'page13-pencil-longer-image',
        name: 'page13-pencil-longer-image',
        type: 'container',
        coordinates: [1320, 160, 1550, 420], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/pencilLonger.png',
          border: '3px solid #ffffff',
          borderRadius: '15gc',
          padding: '0gc',
        }
      },
      //cross mark
      {
        id: 'page13-cross-mark',
        name: 'page13-cross-mark',
        type: 'custom',
        coordinates: [1265, 520, 1355, 610], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'X',
          backgroundColor: '#E06666',
          border: 'none',
          borderRadius: '50%',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '60gc',
          padding: '15gc',
          fontWeight: 'normal',
          boxShadow: '0 0 5px rgba(0,0,0, 0.7)' // Add a subtle glow effect
        }
      },
      //canNeverHappen
      {
        id: 'page13-can-Never-Happen-text',
        name: 'page13-can-Never-Happen-text',
        type: 'custom',
        coordinates: [1060, 635, 1560, 670], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.canNeverHappen',
            "Can never happen"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //impossibleEvents
      {
        id: 'page13-impossible-events-text',
        name: 'page13-impossible-events-text',
        type: 'custom',
        coordinates: [1080, 430, 1540, 500], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'common.impossibleEvents',
            "Impossible Events"
          ),
          backgroundColor: '#E06666',
          border: '3px solid #e61616',
          borderRadius: '14gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Tap Animation GIF
      {
        id: 'page13-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [680, 750, 730, 850],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',

        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page13-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [680, 740, 980, 840],
        zIndex: 'var(--z-button)',
        props: {


          text: getI18nText('buttons.startOver', '»'),
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            window.location.reload(); // Simply reload the page to start over
          }
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
