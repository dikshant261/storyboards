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
  return Object.keys(pageNavigation)
    .map(Number)
    .sort((a, b) => a - b);
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
            'pages.page1.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '52gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },



      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page1-main-text',
        name: 'page1-main-text',
        type: 'custom',
        coordinates: [60, 110, 1550, 600], // Main text area
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.mainText', ''),
          fontSize: '48gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',

        }
      },
      // Tap Animation GIF
      {
        id: 'page1-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [680, 650, 730, 730],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page1-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [680, 620, 880, 700],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText("buttons.start");
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

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page2-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page2.headerText',
            "Find the correct visual representation for the question"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle background
      {
        id: 'page2-triangle-background',
        name: 'page2-triangle-background',
        type: 'custom',
        coordinates: [5, 100, 975, 720], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "",
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle image

      {
        id: 'page2-triangle-image',
        name: 'page2-triangle-image',
        type: 'container',
        coordinates: [45, 180, 905, 650], // Header bar at top
        zIndex: 50,
        props: {

          imageSrc: "assets/triangle1.png"
        }
      },

      //quiz panel
      {
        id: 'page2-quiz-panel',
        name: 'page2-quiz-panel',
        type: 'custom',
        coordinates: [980, 100, 1595, 720], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page2-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page2.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page2.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 55,
          optionButtonHeight: 85,
          optionButtonBackgroundColor: 'orange',
          border: "3px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '46gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page2.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [5, 725, 1595, 815], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page2.footerInstruction',
            "Select the correct answer"
          ),
          backgroundColor: 'rgba(66, 73, 88, 0.9)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      //progress dot
      //progress dots
      {
        id: "page2-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5gc',
          padding: '0gc',

          // Dot styling
          dotSize: '25gc',
          activeDotColor: '#4CAF50',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #4CAF50',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',

          // Animation
          transition: 'all 0.3s ease',


        },
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 2 }
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 2 }
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

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page3-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page3.headerText',
            "Find the correct visual representation for the question"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle background
      {
        id: 'page3-triangle-background',
        name: 'page3-triangle-background',
        type: 'custom',
        coordinates: [5, 100, 975, 720], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "",
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle image

      {
        id: 'page3-triangle-image',
        name: 'page3-triangle-image',
        type: 'container',
        coordinates: [45, 180, 905, 650], // Header bar at top
        zIndex: 50,
        props: {

          imageSrc: "assets/triangle2.png"
        }
      },

      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [980, 100, 1595, 720], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page3.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page3.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 55,
          optionButtonHeight: 85,
          optionButtonBackgroundColor: 'orange',
          border: "3px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '46gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page3.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [5, 725, 1595, 815], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page3.footerInstruction',
            "Select the correct answer"
          ),
          backgroundColor: 'rgba(66, 73, 88, 0.9)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      //progress dot
      //progress dots
      {
        id: "page3-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5gc',
          padding: '0gc',

          // Dot styling
          dotSize: '25gc',
          activeDotColor: '#4CAF50',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #4CAF50',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',

          // Animation
          transition: 'all 0.3s ease',


        },
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 3 }
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 3 }
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

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page4-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page4.headerText',
            "Find the correct visual representation for the question"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle background
      {
        id: 'page4-triangle-background',
        name: 'page4-triangle-background',
        type: 'custom',
        coordinates: [5, 100, 975, 720], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "",
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle image

      {
        id: 'page4-triangle-image',
        name: 'page4-triangle-image',
        type: 'container',
        coordinates: [45, 180, 905, 650], // Header bar at top
        zIndex: 50,
        props: {

          imageSrc: "assets/triangle3.png"
        }
      },

      //quiz panel
      {
        id: 'page4-quiz-panel',
        name: 'page4-quiz-panel',
        type: 'custom',
        coordinates: [980, 100, 1595, 720], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page4-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page4.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page4.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 55,
          optionButtonHeight: 85,
          optionButtonBackgroundColor: 'orange',
          border: "3px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '46gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page4.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [5, 725, 1595, 815], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page4.footerInstruction',
            "Select the correct answer"
          ),
          backgroundColor: 'rgba(66, 73, 88, 0.9)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      //progress dot
      //progress dots
      {
        id: "page4-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5gc',
          padding: '0gc',

          // Dot styling
          dotSize: '25gc',
          activeDotColor: '#4CAF50',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #4CAF50',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',

          // Animation
          transition: 'all 0.3s ease',


        },
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 4 }
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 4 }
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
            "Find the correct visual representation for the question"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle background
      {
        id: 'page5-triangle-background',
        name: 'page5-triangle-background',
        type: 'custom',
        coordinates: [5, 100, 975, 720], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "",
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle image

      {
        id: 'page5-triangle-image',
        name: 'page5-triangle-image',
        type: 'container',
        coordinates: [45, 180, 905, 650], // Header bar at top
        zIndex: 50,
        props: {

          imageSrc: "assets/triangle4.png"
        }
      },

      //quiz panel
      {
        id: 'page5-quiz-panel',
        name: 'page5-quiz-panel',
        type: 'custom',
        coordinates: [980, 100, 1595, 720], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page5.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page5.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 55,
          optionButtonHeight: 85,
          optionButtonBackgroundColor: 'orange',
          border: "3px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '46gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page5.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [5, 725, 1595, 815], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page5.footerInstruction',
            "Select the correct answer"
          ),
          backgroundColor: 'rgba(66, 73, 88, 0.9)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      //progress dot
      //progress dots
      {
        id: "page5-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5gc',
          padding: '0gc',

          // Dot styling
          dotSize: '25gc',
          activeDotColor: '#4CAF50',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #4CAF50',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',

          // Animation
          transition: 'all 0.3s ease',


        },
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 5 }
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 5 }
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

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
            "Find the correct visual representation for the question"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle background
      {
        id: 'page6-triangle-background',
        name: 'page6-triangle-background',
        type: 'custom',
        coordinates: [5, 100, 975, 720], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "",
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      //triangle image

      {
        id: 'page6-triangle-image',
        name: 'page6-triangle-image',
        type: 'container',
        coordinates: [45, 180, 905, 650], // Header bar at top
        zIndex: 50,
        props: {

          imageSrc: "assets/triangle5.png"
        }
      },

      //quiz panel
      {
        id: 'page6-quiz-panel',
        name: 'page6-quiz-panel',
        type: 'custom',
        coordinates: [980, 100, 1595, 720], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page6.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page6.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 55,
          optionButtonHeight: 85,
          optionButtonBackgroundColor: 'orange',
          border: "3px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '46gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page6.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text
      {
        id: 'page6-instruction-text',
        name: 'page6-instruction-text',
        type: 'custom',
        coordinates: [5, 725, 1595, 815], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page6.footerInstruction',
            "Select the correct answer"
          ),
          backgroundColor: 'rgba(66, 73, 88, 0.9)',
          border: '3px solid #F59E0B',
          borderRadius: '23gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      //progress dot
      //progress dots
      {
        id: "page6-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5gc',
          padding: '0gc',

          // Dot styling
          dotSize: '25gc',
          activeDotColor: '#4CAF50',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #4CAF50',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',

          // Animation
          transition: 'all 0.3s ease',


        },
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 6 }
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 6 }
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
    7: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page7-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page7.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '52gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },



      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page7-main-text',
        name: 'page7-main-text',
        type: 'custom',
        coordinates: [60, 110, 1550, 600], // Main text area
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.mainText', ''),
          fontSize: '48gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',

        }
      },
      // Tap Animation GIF
      {
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [680, 650, 730, 730],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page7-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [620, 620, 930, 700],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText("buttons.startOver");
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              window.location.reload();
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

  // Debug: Log available pages
  console.log("📄 [PageConfig] Available pages:", Object.keys(optimizedPages));
  if (optimizedPages[8]) {
    console.log("✅ [PageConfig] Page 8 found with", optimizedPages[8].length, "elements");
  } else {
    console.warn("⚠️ [PageConfig] Page 8 NOT found in optimizedPages!");
  }

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

          // Clear all component state stores
          if (typeof window !== 'undefined') {
            // Clear FillBlanksComponent state
            if (window.fillBlanksStateStore) {
              window.fillBlanksStateStore = {};
              console.log('🔄 [Reset] Cleared fillBlanksStateStore');
            }

            // Clear ArrangeStepsComponent state
            if (window.arrangeStepsStateStore) {
              window.arrangeStepsStateStore = {};
              console.log('🔄 [Reset] Cleared arrangeStepsStateStore');
            }

            // Clear CalculationStepsComponent state
            if (window.calculationStepsStateStore) {
              window.calculationStepsStateStore = {};
              console.log('🔄 [Reset] Cleared calculationStepsStateStore');
            }

            // Clear QuizPanelComponent state
            if (window.quizPanelStateStore) {
              window.quizPanelStateStore = {};
              console.log('🔄 [Reset] Cleared quizPanelStateStore');
            }

            // Clear page completion states
            if (window.PageCompletionManager) {
              window.PageCompletionManager.init();
              // Clear all page completion states
              if (window.pageCompletionState) {
                Object.keys(window.pageCompletionState).forEach(key => {
                  delete window.pageCompletionState[key];
                });
                console.log('🔄 [Reset] Cleared all page completion states');
              }
            }

            // Clear any page-specific feedback states (e.g., page7FillBlanksState)
            Object.keys(window).forEach(key => {
              if (key.includes('FillBlanksState') || key.includes('FeedbackState')) {
                delete window[key];
              }
            });
            console.log('🔄 [Reset] Cleared page-specific feedback states');
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
