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
  13: { prev: 12, next: 14 },
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
        `${getI18nText("messages.navigationDirection", "📄 [Navigation]")} ${direction} - ${getI18nText("messages.dispatchedPageChangeEvent", "Dispatched page change event to page")} ${targetPage}`
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
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page1-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [300, 100, 1300, 775], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page1-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [310, 110, 1290, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.85, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: [
          ]
        }
      },

      // Instruction Text
      {
        id: 'page1-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page1.footerInstruction',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
                console.log(getI18nText('messages.nextButton', '📄 [Next Button]'), getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
            "Read the question and identify 'given' and 'to find'"
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

      // Black background container for question text
      {
        id: 'page2-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page2-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 100, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '34gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.85, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page2.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page2-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page2.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      //1/20  image one
      {
        id: 'page2-image-one',
        name: 'page2-image-one',
        type: 'custom',
        coordinates: [70, 450, 380, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-image-one',
          elementName: 'page2-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageOne.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/20  text
      {
        id: 'page2-image-one-text',
        name: 'page2-image-one-text',
        type: 'custom',
        coordinates: [210, 750, 230, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
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
          textAlign: 'center'
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
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log(getI18nText('messages.previousButton', '📄 [Previous Button]'), getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
            "Read the question and identify 'given' and 'to find'"
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

      // Black background container for question text
      {
        id: 'page3-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page3-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 100, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '34gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.85, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page3.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page3-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page3.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      //1/20  image one
      {
        id: 'page3-image-one',
        name: 'page3-image-one',
        type: 'custom',
        coordinates: [70, 450, 380, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-image-one',
          elementName: 'page3-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageOne.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/20  text
      {
        id: 'page3-image-one-text',
        name: 'page3-image-one-text',
        type: 'custom',
        coordinates: [210, 750, 230, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },


      //1/6  image one
      {
        id: 'page3-image-two',
        name: 'page3-image-tw',
        type: 'custom',
        coordinates: [550, 450, 850, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-image-two',
          elementName: 'page3-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageTwo.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/6  text
      {
        id: 'page3-pizza-image-one-text',
        name: 'page3-pizza-image-one-text',
        type: 'custom',
        coordinates: [685, 750, 715, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{3}{10}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
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
          textAlign: 'center'
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
          imageAlt: 'Tap'
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
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log(getI18nText('messages.previousButton', '📄 [Previous Button]'), getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '34gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page4-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page4-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 100, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '34gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.85, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page4.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page4-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page4.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: getI18nText("pages.page4.informationAnalysis.toFind", []),
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      //1/20  image one
      {
        id: 'page4-image-one',
        name: 'page4-image-one',
        type: 'custom',
        coordinates: [70, 450, 380, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-image-one',
          elementName: 'page4-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageOne.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/20  text
      {
        id: 'page4-image-one-text',
        name: 'page4-image-one-text',
        type: 'custom',
        coordinates: [210, 750, 230, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      //'+' sign text
      {
        id: 'page4-plus-sign-text',
        name: 'page4-plus-sign-text',
        type: 'custom',
        coordinates: [440, 560, 485, 585], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.Difference', 'Difference'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //1/6  image one
      {
        id: 'page4-image-two',
        name: 'page4-image-tw',
        type: 'custom',
        coordinates: [550, 450, 850, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-image-two',
          elementName: 'page4-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageTwo.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/6  text
      {
        id: 'page4-pizza-image-one-text',
        name: 'page4-pizza-image-one-text',
        type: 'custom',
        coordinates: [685, 750, 715, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{3}{10}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //'=' sign text
      {
        id: 'page4-equal-sign-text',
        name: 'page4-equal-sign-text',
        type: 'custom',
        coordinates: [870, 560, 910, 585], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff',
          fontSize: '70gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      //'?' sign text
      {
        id: 'page4-questionMark-sign-text',
        name: 'page4-questionMark-sign-text',
        type: 'custom',
        coordinates: [960, 560, 980, 585], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '90gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
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
          textAlign: 'center'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage4', 'Dispatched page change event to page 3'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log(getI18nText('messages.previousButton', '📄 [Previous Button]'), getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    5: [

      // Header Text - "Build a mathematical sentence for the given scene"
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
            'Build a mathematical sentence for the given scene'
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

      // Black container with 70% opacity
      {
        id: 'page5-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [340, 90, 1260, 420], // Adjust coordinates as needed50
        zIndex: 40,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 70% opacity black
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },




      // Instruction Text - "Tap >> to identify all the required steps for the addition"
      {
        id: 'page5-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page5.footerInstruction',
            'Tap » to identify all the required steps for the addition'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      //1/20  image one
      {
        id: 'page5-image-one',
        name: 'page5-image-one',
        type: 'custom',
        coordinates: [358, 100, 658, 330], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-image-one',
          elementName: 'page5-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageOne.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/20  text
      {
        id: 'page5-image-one-text',
        name: 'page5-image-one-text',
        type: 'custom',
        coordinates: [490, 355, 510, 390], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      //'+' sign text
      {
        id: 'page5-plus-sign-text',
        name: 'page5-plus-sign-text',
        type: 'custom',
        coordinates: [710, 220, 730, 250], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.Difference', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //1/6  image one
      {
        id: 'page5-image-two',
        name: 'page5-image-tw0',
        type: 'custom',
        coordinates: [760, 100, 1110, 330], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-image-two',
          elementName: 'page5-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageTwo.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/6  text
      {
        id: 'page5-pizza-image-one-text',
        name: 'page5-pizza-image-one-text',
        type: 'custom',
        coordinates: [860, 355, 1020, 395], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{3}{10}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //'=' sign text
      {
        id: 'page5-equal-sign-text',
        name: 'page5-equal-sign-text',
        type: 'custom',
        coordinates: [1090, 220, 1110, 250], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff',
          fontSize: '70gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      //'?' sign text
      {
        id: 'page5-questionMark-sign-text',
        name: 'page5-questionMark-sign-text',
        type: 'custom',
        coordinates: [1170, 230, 1190, 260], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '90gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Black container with 70% opacity
      {
        id: 'page5-black-container-2',
        name: 'black-container-2',
        type: 'custom',
        coordinates: [340, 450, 1260, 625], // Adjust coordinates as needed50
        zIndex: 40,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 70% opacity black
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      // Button "Komang to Lucas" - Pinkish-purple with light pink border (changed from "Yohana to Lucas")
      {
        id: 'page5-komang-to-lucas-button',
        name: 'komang-to-lucas-button',
        type: 'custom',
        coordinates: [355, 475, 593, 595], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: '#D946EF', // Pinkish-purple
          border: '2gc solid #F0A9F0', // Light pink border
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '24gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.3'
        }
      },

      // Equals sign in dark grey rounded square
      {
        id: 'page5-equals-sign-square',
        name: 'equals-sign-square',
        type: 'custom',
        coordinates: [620, 510, 668, 560], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text
      {
        id: 'page5-difference-of-square',
        name: 'page5-difference-of-square',
        type: 'custom',
        coordinates: [690, 510, 862, 560], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', '='),
          backgroundColor: 'transparent', // Dark grey
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Tile 1: "1 1/2" - larger box, immediately right of equals
      {
        id: 'page5-tile-1',
        name: 'tile-1',
        type: 'custom',
        coordinates: [882, 475, 1008, 595],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{8}$',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },

      // Tile 2: "+" - smaller box, to the right of first
      {
        id: 'page5-tile-2',
        name: 'tile-2',
        type: 'custom',
        coordinates: [1028, 507, 1100, 563],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '5gc',
          textAlign: 'center'
        }
      },

      // Tile 3: "1/200" - larger box, to the right of second
      {
        id: 'page5-tile-3',
        name: 'tile-3',
        type: 'custom',
        coordinates: [1120, 475, 1240, 595],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{3}{10}$',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },



      // // "km" text at the end
      // {
      //   id: 'page5-km-text',
      //   name: 'km-text',
      //   type: 'custom',
      //   coordinates: [1100, 470, 1168, 580],
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: 'kg',
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '32gc',
      //     padding: '0gc',
      //     textAlign: 'left'
      //   }
      // },

      // Information gathered text with checkmark
      {
        id: 'page5-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [5, 650, 1595, 700], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.informationGathered", '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Next steps text
      {
        id: 'page5-next-steps-text',
        name: 'next-steps-text',
        type: 'custom',
        coordinates: [350, 730, 1250, 770], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.nextStep", 'Next - Steps required to find answer'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Orange color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'bold'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 23'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
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
          imageAlt: 'Tap'
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 21'));
              }
            }
          }
        }
      },

    ],
    6: [



      // Instruction Text - "Rearrange the buttons to the correct sequence of steps"
      {
        id: 'page6-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page6.footerInstruction',
            'Rearrange the buttons to the correct sequence of steps'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },

      // Information Analysis Panel

      // Black container background for equation (40% opacity)
      {
        id: 'page6-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 5, 1595, 145], // Covers all equation components with padding, moved up 25gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page6-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [260, 25, 635, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },
      // Equals sign
      {
        id: 'page6-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page6-difference-of-text',
        name: 'page6-difference-of-text',
        type: 'custom',
        coordinates: [680, 25, 880, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First number box: 1 1/2
      {
        id: 'page6-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [900, 25, 1050, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // minus sign 1
      {
        id: 'page6-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [1070, 25, 1150, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Second number box: 1/200
      {
        id: 'page6-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [1170, 25, 1320, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">10</span></span>',

          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // // Unit: kg
      // {
      //   id: 'page6-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [1070, 25, 1100, 125], // Centered with 15px gap after box 3, moved up 25gc
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: 'kg',
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '36gc',
      //     padding: '10gc',
      //     textAlign: 'left',
      //     lineHeight: '1.5'
      //   }
      // },
      //quiz panel
      {
        id: 'page6-quiz-panel',
        name: 'page6-quiz-panel',
        type: 'custom',
        coordinates: [5, 150, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page6.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 85,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '32gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page6.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
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
          imageAlt: 'Tap',
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 6 }, // Only enable for specific page

          ignorePageCompletion: false, // Check page completion - button disabled until quiz is complete
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 9'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    7: [

      // Header Text - "What is the correct order of steps for adding mixed numbers?"
      {
        id: 'page7-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 200, 1595, 225], // Header bar at top (same as page 7)
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page7.headerText',
            'What is the correct order of steps for adding mixed numbers?'
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

      // Instruction Text - "Rearrange the buttons to the correct sequence of steps"
      {
        id: 'page7-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page7.footerInstruction',
            'Rearrange the buttons to the correct sequence of steps'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },

      // Information Analysis Panel

      // Black container background for equation (40% opacity)
      {
        id: 'page7-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 5, 1595, 145], // Covers all equation components with padding, moved up 25gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page7-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [260, 25, 635, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },
      // Equals sign
      {
        id: 'page7-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page7-difference-of-text',
        name: 'page7-difference-of-text',
        type: 'custom',
        coordinates: [680, 25, 880, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First number box: 1 1/2
      {
        id: 'page7-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [900, 25, 1050, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // minus sign 1
      {
        id: 'page7-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [1070, 25, 1150, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Second number box: 1/200
      {
        id: 'page7-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [1170, 25, 1320, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">10</span></span>',

          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // // Unit: kg
      // {
      //   id: 'page7-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [1070, 25, 1100, 125], // Centered with 15px gap after box 3, moved up 25gc
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: 'kg',
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '36gc',
      //     padding: '10gc',
      //     textAlign: 'left',
      //     lineHeight: '1.5'
      //   }
      // },

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

          ignorePageCompletion: false, // Check page completion - button disabled until quiz is complete
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 9'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },

      // Arrange Steps Component for page 8
      // Step number boxes are now integrated into the component (left column 20%, right column 80% for bars)
      {
        id: 'page7-arrange-steps',
        name: 'arrange-steps',
        type: 'custom',
        coordinates: [275, 300, 1325, 700],
        zIndex: 60,
        props: {
          componentType: 'ArrangeStepsComponent',
          steps: getI18nText("pages.page7.steps", []),
          orientation: 'vertical',
          initialButtonColor: 'var(--color-gold)', // Green color for buttons
          buttonFontColor: '#000000',
          buttonFontSize: '32gc',
          buttonBorderRadius: '12gc',
          buttonPadding: '15gc',
          gap: '15gc',
          correctColor: '#10b981',
          showFeedback: true,
          showFeedbackText: false, // Hide feedback text
          feedbackText: { correct: 'Correct! The steps are in the right order.', incorrect: 'Not quite. Try rearranging the steps.' },
          instructionText: 'Tap and drag the options to arrange the steps in the correct order to add mixed numbers.',
          showInstructionText: false, // Hide instruction text
          instructionFontSize: '28gc',
          instructionFontColor: '#ffffff',
          // Step number box styling (left column - 20%)
          stepNumberBackgroundColor: '#704954', // Dark purple/maroon (deprecated, use stepBarColor)
          stepNumberBorderColor: '#6B5344',
          stepNumberTextColor: '#ffffff',
          stepNumberFontSize: '32gc',
          stepNumberBorderRadius: '12gc',
          stepNumberPadding: '10gc',
          stepNumberBorderWidth: '2gc',
          stepBarColor: 'var(--color-rose-dark)', // Color for step number boxes (default: --color-rose-light)
          rowColumnMargin: '5gc', // Margin on all sides for rows and columns (default: 5gc)
          showRowColumnBorders: false, // Toggle visibility of borders for rows and columns (default: false)
          // Tap animation settings
          showTapAnimation: true,
          tapAnimationOpacity: 0.4, // 40% opacity
          tapAnimationCycleDuration: 2500, // 2500ms duration for full cycle through all bars
          tapAnimationSrc: 'assets/tap.gif'
        }
      }
    ],
    8: [

      // Equation Background
      {
        id: 'page8-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 5, 1595, 145], // Covers all equation components with padding, moved up 25gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page8-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [260, 25, 635, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },
      // Equals sign
      {
        id: 'page8-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page8-difference-of-text',
        name: 'page8-difference-of-text',
        type: 'custom',
        coordinates: [680, 25, 880, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page8-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [900, 25, 1050, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // minus sign 1
      {
        id: 'page8-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [1070, 25, 1150, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Second number box: 1/200
      {
        id: 'page8-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [1170, 25, 1320, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">10</span></span>',

          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Solution Steps Component
      {
        id: 'page8-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page8.solutionSteps.headerText", "Mixed Number Addition"),
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded),
          showAllAsCurrent: true,
          steps: getI18nText("pages.page8.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
        }
      },

      // Information gathered text - "✓ Information gathered from question."
      {
        id: 'page8-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [0, 370, 1080, 420], // Vertically centered between 150-800, horizontally 0-1080
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page8.informationGathered"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Steps required text - "✓ Steps required to find answer"
      {
        id: 'page8-steps-required-text',
        name: 'steps-required-text',
        type: 'custom',
        coordinates: [0, 450, 1080, 500], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page8.stepsRequired"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Next step text - "Next - Finding the required Result"
      {
        id: 'page8-next-result-text',
        name: 'next-result-text',
        type: 'custom',
        coordinates: [0, 530, 1080, 580], // Positioned below steps required text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page8.nextFinding"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Orange color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Instruction Text - "Tap » to add the mixed numbers using these steps"
      {
        id: 'page8-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page8.footerInstruction',
            'Tap » to add the mixed numbers using these steps'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
          imageAlt: 'Tap'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 7'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 5'));
              }
            }
          }
        }
      },

    ],
    9: [

      // Header Text
      {
        id: 'page9-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page9.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },

      // Equation Background
      {
        id: 'page9-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page9-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page9-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page9-difference-of-text',
        name: 'page9-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page9-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page9-plus-sign-1',
        name: 'page9-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page9-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page9-equation2-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page9-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page9-woring-box-3',
        name: 'page9-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.7)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // First fraction box: ?/200 (flip tile)
      {
        id: 'page9-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [683, 275, 733, 375], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page9-working-box-1',
          onFlipHideTargetId: 'page9-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page9-tap-animation-third-box-1',
        name: 'page9-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [683, 325, 720, 375], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },
      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page9-woring-box-4',
        name: 'page9-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.7)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Solution Steps Component
      {
        id: 'page9-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page9.solutionSteps.headerText", ""),
          currentStep: 1,
          currentSubStep: null,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page9.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
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
          initialVisible: false
        }
      },



      // Instruction Text - "Tap » for Step 2.b"
      {
        id: 'page9-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page9.footerInstruction',
            'Tap » for Step 2.b'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 18'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 16'));
              }
            }
          }
        }
      }
    ],
    10: [

      // Header Text
      {
        id: 'page10-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page10.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },

      // Equation Background
      {
        id: 'page10-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page10-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page10-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page10-difference-of-text',
        name: 'page10-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page10-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page10-plus-sign-1',
        name: 'page10-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page10-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page10-equation2-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page10-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page10-woring-box-3',
        name: 'page10-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.7)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page10-less-then-sign',
        name: 'page10-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 375], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: '', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page10-woring-box-4',
        name: 'page10-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.7)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // LCM Button
      {
        id: 'page10-lcm-button',
        name: 'lcm-button',
        type: 'button',
        coordinates: [400, 430, 900, 530], // Horizontal orange button
        zIndex: 70,
        props: {
          text: getI18nText("pages.page10.lcmButtonText", 'LCM of 5, and 5'),
          backgroundColor: '#FFA500', // Orange background
          color: '#ffffff', // White text
          fontSize: '34gc',
          fontWeight: 'normal',
          borderRadius: '12gc', // Rounded corners
          padding: '15gc',
          textAlign: 'center',
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '0gc', // No frame gap for flat button
          cursor: 'pointer',
          onClick: () => {
            console.log('LCM button clicked - navigating to page 11');
            if (typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(11);
              } else if (window.navigateToPage) {
                window.navigateToPage(11);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 11 } }));
                console.log('📄 [LCM Button] Dispatched page change event to page 11');
              }
            }
            // Play click sound if available
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
          }
        }
      },
      // Tap Animation on third-box-1
      {
        id: 'page10-tap-animation-third-box-1',
        name: 'page10-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [400, 460, 450, 560], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.8 // 30% opacity
        }
      },
      // Solution Steps Component
      {
        id: 'page10-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page10.solutionSteps.headerText", ""),
          currentStep: 1,
          currentSubStep: null,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page10.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
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
          initialVisible: false
        }
      },



      // Instruction Text - "Tap » for Step 2.b"
      {
        id: 'page10-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page10.footerInstruction',
            'Tap » for Step 2.b'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 18'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 16'));
              }
            }
          }
        }
      }
    ],

    11: [

      // Header Text
      {
        id: 'page11-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page11.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },
      // Equation Background
      {
        id: 'page11-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page11-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page11-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page11-difference-of-text',
        name: 'page11-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page11-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page11-plus-sign-1',
        name: 'page11-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page11-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page11-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page11-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page11-woring-box-3',
        name: 'page11-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // less then sign 
      {
        id: 'page11-less-then-sign',
        name: 'page11-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page11-woring-box-4',
        name: 'page11-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },






      // third Equation Background
      {
        id: 'page11-equation3-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 400, 1175, 545], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page11-fourth-equals',
        name: 'page11-fourth-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First fraction box: ?/200 (flip tile)
      {
        id: 'page11-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">3</span><span style="display: block; padding: 0 2px; color: #fffff;">10</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page11-woring-box-4',
          onFlipHideTargetId: 'page11-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page11-tap-animation-third-box-1',
        name: 'page11-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [558, 475, 598, 525], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },
      // sign tile flip
      {
        id: 'page11-sign-tile-flip',
        name: 'page11-sign-tile-flip',
        type: 'custom',
        coordinates: [683, 425, 733, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          flipMode: 'correct',
          backHtml: getI18nText("common.symbols.minus"),
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page11-less-then-sign',
          onFlipHideTargetId: 'page11-tap-animation-sign-box-2',
          flipBack: false
        }
      },
      // Tap Animation on sign-box-2
      {
        id: 'page11-tap-animation-sign-box-2',
        name: 'page11-tap-animation-sign-box-2',
        type: 'custom',
        coordinates: [683, 475, 733, 525], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },
      // Third fraction box: ?/200 (flip tile)
      {
        id: 'page11-third-box-3',
        name: 'third-box-3',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">1</span><span style="display: block; padding: 0 2px; color: #ffff;">8</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page11-woring-box-3',
          onFlipHideTargetId: 'page11-tap-animation-third-box-3',
          flipBack: false
        }
      },

      // Tap Animation on third-box-3
      {
        id: 'page11-tap-animation-third-box-3',
        name: 'tap-animation-third-box-3',
        type: 'custom',
        coordinates: [773, 475, 823, 525], // Centered on top of third-box-3, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },




      // Solution Steps Component
      {
        id: 'page11-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page11.solutionSteps.headerText"),
          currentStep: 1,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page11.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
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
          initialVisible: false
        }
      },



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page11-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page11.footerInstruction', "Tap '?' to reveal the answer for each conversion"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 25'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    12: [

      // Header Text
      {
        id: 'page12-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page12.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },
      // Equation Background
      {
        id: 'page12-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page12-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page12-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page12-difference-of-text',
        name: 'page12-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page12-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page12-plus-sign-1',
        name: 'page12-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page12-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page12-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page12-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page12-woring-box-3',
        name: 'page12-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // less then sign 
      {
        id: 'page12-less-then-sign',
        name: 'page12-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: 'transparent', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page12-woring-box-4',
        name: 'page12-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },






      // third Equation Background
      {
        id: 'page12-equation3-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 400, 1175, 545], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page12-fourth-equals',
        name: 'page12-fourth-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 5
      {
        id: 'page12-woring-box-5',
        name: 'page12-woring-box-5',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #FFA500;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign
      {
        id: 'page12-minus-sign',
        name: 'page12-minus-sign',
        type: 'custom',
        coordinates: [683, 425, 733, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 6
      {
        id: 'page12-woring-box-6',
        name: 'page12-woring-box-6',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFA500;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // LCM Button
      {
        id: 'page12-lcm-button',
        name: 'lcm-button',
        type: 'button',
        coordinates: [450, 560, 850, 660], // Horizontal orange button
        zIndex: 70,
        props: {
          text: getI18nText("pages.page12.lcmButtonText", 'LCM of 5, and 5'),
          backgroundColor: '#FFA500', // Orange background
          color: '#ffffff', // White text
          fontSize: '34gc',
          fontWeight: 'normal',
          borderRadius: '12gc', // Rounded corners
          padding: '15gc',
          textAlign: 'center',
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '0gc', // No frame gap for flat button
          cursor: 'pointer',
          onClick: () => {
            console.log('LCM button clicked - navigating to page 11');
            if (typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(13);
              } else if (window.navigateToPage) {
                window.navigateToPage(13);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 11 } }));
                console.log('📄 [LCM Button] Dispatched page change event to page 11');
              }
            }
            // Play click sound if available
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
          }
        }
      },
      // Tap Animation on third-box-1
      {
        id: 'page12-tap-animation-third-box-1',
        name: 'page12-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [450, 560, 500, 660], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.8 // 30% opacity
        }
      },
      // Solution Steps Component
      {
        id: 'page12-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page12.solutionSteps.headerText"),
          currentStep: 2,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page12.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
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
          initialVisible: false
        }
      },



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page12-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page12.footerInstruction', "Tap '?' to reveal the answer for each conversion"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 25'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    13: [

      // Header Text
      {
        id: 'page13-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page13.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },
      // Equation Background
      {
        id: 'page13-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page13-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page13-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page13-difference-of-text',
        name: 'page13-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page13-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page13-plus-sign-1',
        name: 'page13-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page13-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page13-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page13-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page13-woring-box-3',
        name: 'page13-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // less then sign 
      {
        id: 'page13-less-then-sign',
        name: 'page13-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: 'transparent', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page13-woring-box-4',
        name: 'page13-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },






      // third Equation Background
      {
        id: 'page13-equation3-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 400, 1175, 545], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page13-fourth-equals',
        name: 'page13-fourth-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 5
      {
        id: 'page13-woring-box-5',
        name: 'page13-woring-box-5',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign
      {
        id: 'page13-minus-sign',
        name: 'page13-minus-sign',
        type: 'custom',
        coordinates: [683, 425, 733, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 6
      {
        id: 'page13-woring-box-6',
        name: 'page13-woring-box-6',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // third Equation Background
      {
        id: 'page13-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page13-fifth-equals',
        name: 'page13-fifth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 5
      {
        id: 'page13-woring-box-7',
        name: 'page13-woring-box-7',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">?</span><span style="display: block; padding: 0 4px; color: #40a794;">40</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign
      {
        id: 'page13-minus-sign-2',
        name: 'page13-minus-sign-2',
        type: 'custom',
        coordinates: [683, 575, 733, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 8
      {
        id: 'page13-woring-box-8',
        name: 'page13-woring-box-8',
        type: 'custom',
        coordinates: [758, 575, 908, 675], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">?</span><span style="display: block; padding: 0 4px; color: #40a794;">40</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Solution Steps Component
      {
        id: 'page13-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page13.solutionSteps.headerText"),
          currentStep: 2,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page13.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
        }
      },

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
          imageAlt: 'Tap',
          initialVisible: true
        }
      },



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page13-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page13.footerInstruction', "Tap '?' to reveal the answer for each conversion"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
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
          // # initialEnabled: false, // Disabled until quiz is completed
          // # enableOnEvent: 'quizCompleted', // Listen for quiz completion
          // # enableOnEventFilter: { pageNumber: 12 }, // Only enable for specific page
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 25'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
            return getI18nText('buttons.previous', '«');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    14: [

      // Header Text
      {
        id: 'page14-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page14.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },
      // Equation Background
      {
        id: 'page14-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page14-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page14-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page14-difference-of-text',
        name: 'page14-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page14-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page14-plus-sign-1',
        name: 'page14-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page14-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page14-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page14-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page14-woring-box-3',
        name: 'page14-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // less then sign 
      {
        id: 'page14-less-then-sign',
        name: 'page14-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: 'transparent', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page14-woring-box-4',
        name: 'page14-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },






      // third Equation Background
      {
        id: 'page14-equation3-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 400, 1175, 545], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page14-fourth-equals',
        name: 'page14-fourth-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 5
      {
        id: 'page14-woring-box-5',
        name: 'page14-woring-box-5',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign
      {
        id: 'page14-minus-sign',
        name: 'page14-minus-sign',
        type: 'custom',
        coordinates: [683, 425, 733, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 6
      {
        id: 'page14-woring-box-6',
        name: 'page14-woring-box-6',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // fourth Equation Background
      {
        id: 'page14-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page14-fifth-equals',
        name: 'page14-fifth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First fraction box: ?/200 (flip tile)
      {
        id: 'page14-flip-box-1',
        name: 'page14-flip-box-1',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">12</span><span style="display: block; padding: 0 2px; color: #fffff;">40</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page14-woring-box-5',
          onFlipHideTargetId: 'page14-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page14-tap-animation-third-box-1',
        name: 'page14-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [508, 625, 588, 675], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },

      // Equals sign
      {
        id: 'page14-minus-sign-2',
        name: 'page14-minus-sign-2',
        type: 'custom',
        coordinates: [683, 575, 733, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First fraction box: ?/200 (flip tile)
      {
        id: 'page14-flip-box-2',
        name: 'page14-flip-box-2',
        type: 'custom',
        coordinates: [758, 575, 908, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">5</span><span style="display: block; padding: 0 2px; color: #fffff;">40</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page14-woring-box-6',
          onFlipHideTargetId: 'page14-tap-animation-third-box-2',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page14-tap-animation-third-box-2',
        name: 'page14-tap-animation-third-box-2',
        type: 'custom',
        coordinates: [758, 625, 608, 675], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },

      // Solution Steps Component
      {
        id: 'page14-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page14.solutionSteps.headerText"),
          currentStep: 3,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page14.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
        }
      },

      // Tap Animation GIF
      {
        id: 'page14-tap-animation',
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



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page14-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page14.footerInstruction', "Tap '?' to reveal the answer for each conversion"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page14-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 14 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId('page14-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page14-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 25'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
        id: 'page14-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page14-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page14-previous-button');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    15: [

      // Header Text
      {
        id: 'page15-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page15.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },
      // Equation Background
      {
        id: 'page15-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page15-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page15-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page15-difference-of-text',
        name: 'page15-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page15-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page15-plus-sign-1',
        name: 'page15-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page15-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page15-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page15-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page15-woring-box-3',
        name: 'page15-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // less then sign 
      {
        id: 'page15-less-then-sign',
        name: 'page15-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: 'transparent', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page15-woring-box-4',
        name: 'page15-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },






      // third Equation Background
      {
        id: 'page15-equation3-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 400, 1175, 545], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page15-fourth-equals',
        name: 'page15-fourth-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 5
      {
        id: 'page15-woring-box-5',
        name: 'page15-woring-box-5',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign
      {
        id: 'page15-minus-sign',
        name: 'page15-minus-sign',
        type: 'custom',
        coordinates: [683, 425, 733, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 6
      {
        id: 'page15-woring-box-6',
        name: 'page15-woring-box-6',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // fourth Equation Background
      {
        id: 'page15-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page15-fifth-equals',
        name: 'page15-fifth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 7
      {
        id: 'page15-woring-box-7',
        name: 'page15-woring-box-7',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">12</span><span style="display: block; padding: 0 4px; color: #ffff;">40</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // minus sign
      {
        id: 'page15-minus-sign-2',
        name: 'page15-minus-sign-2',
        type: 'custom',
        coordinates: [683, 575, 733, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 8
      {
        id: 'page15-woring-box-8',
        name: 'page15-woring-box-8',
        type: 'custom',
        coordinates: [758, 575, 908, 675], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffff;">40</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // fifth Equation Background
      {
        id: 'page15-equation5-background',
        name: 'equation5-background',
        type: 'custom',
        coordinates: [5, 700, 1175, 815], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page15-sixth-equals',
        name: 'page15-sixth-equals',
        type: 'custom',
        coordinates: [453, 705, 503, 805], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First fraction box: ?/200 (flip tile)
      {
        id: 'page15-flip-box-1',
        name: 'page15-flip-box-1',
        type: 'custom',
        coordinates: [508, 705, 658, 805], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">12 - 5</span><span style="display: block; padding: 0 2px; color: #fffff;">40</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onClick: (e, isFlipped) => {
            if (isFlipped) {
              const box1 = document.getElementById("page15-woring-box-7");
              const box2 = document.getElementById("page15-woring-box-8");
              if (box1) {
                box1.style.backgroundColor = "rgba(74, 85, 104, 0.45)"
              }
              if (box2) {
                box2.style.backgroundColor = "rgba(74, 85, 104, 0.45)"
              }
            }
          },
          onFlipHideTargetId: 'page15-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page15-tap-animation-third-box-1',
        name: 'page15-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [508, 755, 588, 805], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },
      // Solution Steps Component
      {
        id: 'page15-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page15.solutionSteps.headerText"),
          currentStep: 4,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page15.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
        }
      },

      // Tap Animation GIF
      {
        id: 'page15-tap-animation',
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



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page15-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page15.footerInstruction', "Tap '?' to reveal the answer for each conversion"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page15-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 15 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId('page15-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page15-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 25'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
        id: 'page15-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page15-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page15-previous-button');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    16: [

      // Header Text
      {
        id: 'page16-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page16.headerText',
            'Solve the step in your notebook and shout-out the answer.'
          ),
          backgroundColor: 'transparent', // Transparent background as per image
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Gold/orange color
          fontSize: '40gc',
          padding: '15gc',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '1.0'
        }
      },
      // Equation Background
      {
        id: 'page16-equation-background',
        name: 'equation-background',
        type: 'custom',
        coordinates: [5, 100, 1175, 245], // Covers all equation components with padding, shifted further left by 100gc
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page16-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [80, 125, 470, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page16-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // difference of text sign
      {
        id: 'page16-difference-of-text',
        name: 'page16-difference-of-text',
        type: 'custom',
        coordinates: [523, 125, 723, 225], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.differenceOf', 'differenceOf'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First number box: 1 1/2
      {
        id: 'page16-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [743, 125, 888, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFFF;">8</span></span>',
          backgroundColor: '#4A5568', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      //and text
      {
        id: 'page16-plus-sign-1',
        name: 'page16-plus-sign-1',
        type: 'custom',
        coordinates: [908, 125, 978, 225], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.and', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Second number box: 1/200
      {
        id: 'page16-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [998, 125, 1143, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;"></span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: '#4A5568', // Dark grey
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // second Equation Background
      {
        id: 'page16-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Third Equation Display
      // Equals sign
      {
        id: 'page16-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // First fraction box: ?/200 (dark gray background)
      {
        id: 'page16-woring-box-3',
        name: 'page16-woring-box-3',
        type: 'custom',
        coordinates: [508, 275, 658, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // less then sign 
      {
        id: 'page16-less-then-sign',
        name: 'page16-less-then-sign',
        type: 'custom',
        coordinates: [683, 275, 733, 370], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "<",
          backgroundColor: 'transparent', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page16-woring-box-4',
        name: 'page16-woring-box-4',
        type: 'custom',
        coordinates: [758, 275, 908, 370], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // third Equation Background
      {
        id: 'page16-equation3-background',
        name: 'equation3-background',
        type: 'custom',
        coordinates: [5, 400, 1175, 545], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page16-fourth-equals',
        name: 'page16-fourth-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 5
      {
        id: 'page16-woring-box-5',
        name: 'page16-woring-box-5',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffff;">10</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign
      {
        id: 'page16-minus-sign',
        name: 'page16-minus-sign',
        type: 'custom',
        coordinates: [683, 425, 733, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 6
      {
        id: 'page16-woring-box-6',
        name: 'page16-woring-box-6',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // fourth Equation Background
      {
        id: 'page16-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page16-fifth-equals',
        name: 'page16-fifth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 7
      {
        id: 'page16-woring-box-7',
        name: 'page16-woring-box-7',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">12</span><span style="display: block; padding: 0 4px; color: #ffff;">40</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },


      // minus sign
      {
        id: 'page16-minus-sign-2',
        name: 'page16-minus-sign-2',
        type: 'custom',
        coordinates: [683, 575, 733, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.minus', '-'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 8
      {
        id: 'page16-woring-box-8',
        name: 'page16-woring-box-8',
        type: 'custom',
        coordinates: [758, 575, 908, 675], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffff;">40</span></span>',
          backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // fifth Equation Background
      {
        id: 'page16-equation5-background',
        name: 'equation5-background',
        type: 'custom',
        coordinates: [5, 700, 1175, 815], // Covers all third equation components with padding
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // Equals sign
      {
        id: 'page16-sixth-equals',
        name: 'page16-sixth-equals',
        type: 'custom',
        coordinates: [453, 705, 503, 805], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      //working box 9
      {
        id: 'page16-woring-box-9',
        name: 'page16-woring-box-9',
        type: 'custom',
        coordinates: [508, 705, 658, 805], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">12 - 5</span><span style="display: block; padding: 0 4px; color: #ffff;">40</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark gray background with 70% opacity
          border: '',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // equal sign
      {
        id: 'page16-equal-sign-7',
        name: 'page16-equal-sign-7',
        type: 'custom',
        coordinates: [683, 705, 733, 805], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },
      // First fraction box: ?/200 (flip tile)
      {
        id: 'page16-flip-box-1',
        name: 'page16-flip-box-1',
        type: 'custom',
        coordinates: [758, 705, 908, 805], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText('common.symbols.questionMark', '?'),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">7</span><span style="display: block; padding: 0 2px; color: #fffff;">40</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onClick: (e, isFlipped) => {
            if (isFlipped) {
              const box1 = document.getElementById("page16-woring-box-9");
              if (box1) {
                box1.style.backgroundColor = "rgba(74, 85, 104, 0.45)"
              }
            }
          },
          onFlipHideTargetId: 'page16-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page16-tap-animation-third-box-1',
        name: 'page16-tap-animation-third-box-1',
        type: 'custom',
        coordinates: [758, 755, 808, 805], // Centered on top of third-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },
      // Solution Steps Component
      {
        id: 'page16-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page16.solutionSteps.headerText"),
          currentStep: 4,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page16.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
        }
      },

      // Tap Animation GIF
      {
        id: 'page16-tap-animation',
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



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page16-instruction-text',
        name: 'page16-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page16.footerInstruction', "Tap '?' to reveal the answer for each conversion"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page16-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 16 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId('page16-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page16-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 25'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText('messages.lastPageStartingOver', '🔄 [Next Button] Last page - Starting over'));
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
        id: 'page16-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page16-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page16-previous-button');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    17: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page17-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page17.headerText',
            'Identify scene – Build Equation – Solve for unknown'
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

      // Black background container for question text
      {
        id: 'page17-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page17-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [70, 100, 1045, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          katexFontSize: 0.85,
          highlights: getI18nText("pages.page17.highlights", [])
        }
      },

      //1/20  image one
      {
        id: 'page17-image-one',
        name: 'page17-image-one',
        type: 'custom',
        coordinates: [70, 450, 380, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page17-image-one',
          elementName: 'page17-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageOne.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/20  text
      {
        id: 'page17-image-one-text',
        name: 'page17-image-one-text',
        type: 'custom',
        coordinates: [210, 750, 230, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      //'+' sign text
      {
        id: 'page17-plus-sign-text',
        name: 'page17-plus-sign-text',
        type: 'custom',
        coordinates: [440, 560, 485, 585], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.Difference', 'Difference'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //1/6  image one
      {
        id: 'page17-image-two',
        name: 'page17-image-tw',
        type: 'custom',
        coordinates: [550, 450, 850, 710], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page17-image-two',
          elementName: 'page17-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/imageTwo.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //1/6  text
      {
        id: 'page17-pizza-image-one-text',
        name: 'page17-pizza-image-one-text',
        type: 'custom',
        coordinates: [685, 750, 715, 780], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{3}{10}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //'=' sign text
      {
        id: 'page17-equal-sign-text',
        name: 'page17-equal-sign-text',
        type: 'custom',
        coordinates: [870, 560, 910, 585], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('common.symbols.equals', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff',
          fontSize: '70gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      //'?' sign text
      {
        id: 'page17-questionMark-sign-text',
        name: 'page17-questionMark-sign-text',
        type: 'custom',
        coordinates: [960, 560, 980, 585], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 62, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{7}{40}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Solution Steps Component
      {
        id: 'page17-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1095, 100, 1595, 815], // Same position as page 19
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page17.solutionSteps.headerText", []),
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          showAllAsCurrent: true, // Show all steps and sub-steps as current
          steps: getI18nText("pages.page17.solutionSteps.steps", []),
          headerFontSize: '28gc',
          headerFontColor: '#ffffff',
          stepFontSize: '24gc',
          stepFontColor: '#ffffff', // White text for dark containers
          stepNumberColor: '#ffffff', // White step numbers
          stepNumberFontSize: '32gc',
          showStepNumberCircle: false, // Use new text style (no circles)
          accentBorderColor: '#4DD0E1', // Cyan left accent
          accentBorderWidth: '4gc',
          stepContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark container background
          gap: '12gc',
          stepPadding: '16gc',
          stepBorderRadius: '12gc'
        }
      },

      // Instruction Text - "Tap 'Start Over' to re-do activity"
      {
        id: 'page17-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page17.footerInstruction',
            "Tap 'Start Over' to re-do activity"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },

      // Tap Animation GIF
      {
        id: 'page17-tap-animation',
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

      // Optimized Next button - Three Layer Structure (Page 20 - Start Over)
      {
        id: 'page17-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          // Explicit \"Start Over\" text and smaller font size for page 20
          text: getI18nText('buttons.startOver', 'Start Over'),
          fontSize: '28gc',
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }

            // Reset all question-related state using advanceToNextQuestion (direct implementation)
            if (typeof window !== 'undefined') {
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion().then(() => {
                  // After reset, navigate to page 1
                  if (window.changePageAndNotify) {
                    window.changePageAndNotify(1);
                  } else if (window.navigateToPage) {
                    window.navigateToPage(1);
                  } else {
                    window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
                    console.log('📄 [Next Button] Dispatched page change event to page 1');
                  }
                });
              } else if (window.changePageAndNotify) {
                // Fallback: just go to page 1
                window.changePageAndNotify(1);
              } else if (window.navigateToPage) {
                window.navigateToPage(1);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
                console.log('📄 [Next Button] Dispatched page change event to page 1');
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page17-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page17-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page17-previous-button');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 5'));
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
  console.log(getI18nText("messages.initializingPageConfig", "🚀 Initializing PageConfig"));

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
    console.log(getI18nText("messages.initializingWindowFunctions", "🔄 [PageConfig] Initializing window functions..."));

    try {
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log(
            getI18nText("messages.advanceToNextQuestionCalled", "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)")
          );
          console.log(
            getI18nText("messages.treatingAsAppReload", "🔄 [Navigation] Treating as APP RELOAD with next question")
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
            getI18nText("messages.updatedQuestionIndex", "✅ [Navigation] Updated window.currentQuestionIndex to:"),
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
        console.log(getI18nText("messages.updatingQuestionDependentElements", "🔄 [UI] Updating question-dependent elements"));

        // Trigger React re-render by forcing app update
        if (typeof window.forceAppUpdate === "function") {
          window.forceAppUpdate();
          console.log(getI18nText("messages.triggeredReactRerender", "✅ [UI] Triggered React re-render via forceAppUpdate"));
        } else {
          console.warn(
            getI18nText("messages.forceAppUpdateNotAvailable", "⚠️ [UI] forceAppUpdate not available, React may not re-render")
          );
        }

        // Page 2 removed - no longer needed

        console.log(getI18nText("messages.updateQuestionDependentElementsCompleted", "✅ [UI] updateQuestionDependentElements completed"));
      };

      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText("buttons.startOver", "Start Over");
      };

      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;

      console.log(getI18nText("messages.directFunctionAssignmentCompleted", "✅ [PageConfig] Direct function assignment completed"));
      console.log(
        getI18nText("messages.windowAdvanceToNextQuestionType", "🔍 [PageConfig] window.advanceToNextQuestion type:"),
        typeof window.advanceToNextQuestion
      );
      console.log(
        getI18nText("messages.windowUpdateQuestionDependentElementsType", "🔍 [PageConfig] window.updateQuestionDependentElements type:"),
        typeof window.updateQuestionDependentElements
      );
    } catch (error) {
      console.error(
        getI18nText("messages.errorInDirectFunctionAssignment", "❌ [PageConfig] Error in direct function assignment:"),
        error
      );
    }

    // Add global function to manually clear page states (for testing)
    window.clearAllPageStates = () => {
      console.log(getI18nText("messages.manuallyClearingPageStates", "🧹 [PageConfig] Manually clearing page states"));
      try {
        // Reset global variables
        window.page1complete = false;
        window.objectsremoved = 0;
        window.currentQuestionIndex = 0;

        console.log(getI18nText("messages.pageStatesClearedSuccessfully", "✅ [PageConfig] Page states cleared successfully"));

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
        console.error(getI18nText("messages.errorClearingPageStates", "❌ [PageConfig] Error clearing page states:"), error);
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
            console.log(getI18nText("messages.readingTextFromSource", "🎯 [PageConfig] Reading text from source"), `${sourceId}:`, sourceText);

            // Try to update number pad target first (if destination is a number pad)
            if (window.numberPadCallbacks && window.numberPadCallbacks[destinationId]) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(getI18nText("messages.updatedNumberPadTarget", "✅ [PageConfig] Updated number pad"), `${destinationId}`, getI18nText("messages.targetTo", "target to:"), sourceText);
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(getI18nText("messages.updatedElementText", "✅ [PageConfig] Updated element"), `${destinationId}`, getI18nText("messages.textTo", "text to:"), sourceText);
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(getI18nText("messages.destinationElementNotFound", "🔄 [PageConfig] Destination element"), `${destinationId}`, getI18nText("messages.notFoundRetrying", "not found, retrying..."), `(${retryCount + 1}/${maxRetries})`);
                setTimeout(() => {
                  window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
                }, retryDelay);
              } else {
                console.warn(getI18nText("messages.destinationElementNotFoundAfterRetries", "⚠️ [PageConfig] Destination element not found:"), `${destinationId}`, getI18nText("messages.afterRetries", "after"), `${maxRetries}`, getI18nText("messages.retries", "retries"));
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(getI18nText("messages.sourceElementNotFound", "🔄 [PageConfig] Source element"), `${sourceId}`, getI18nText("messages.notFoundRetrying", "not found, retrying..."), `(${retryCount + 1}/${maxRetries})`);
              setTimeout(() => {
                window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
              }, retryDelay);
            } else {
              console.warn(getI18nText("messages.sourceElementNotFoundAfterRetries", "⚠️ [PageConfig] Source element not found:"), `${sourceId}`, getI18nText("messages.afterRetries", "after"), `${maxRetries}`, getI18nText("messages.retries", "retries"));
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
        console.error(getI18nText("messages.errorUpdatingTargetText", "❌ [PageConfig] Error updating target text:"), error);
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
      getI18nText("messages.pageConfigInitialized", "✅ PageConfig initialized - pages and functions available globally")
    );
    console.log(
      getI18nText("messages.useClearAllPageStates", "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states")
    );
    console.log(
      getI18nText("messages.useUpdateTargetIDText", "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element")
    );
  }

  return optimizedPages;
};

// Initialize immediately
console.log(getI18nText("messages.aboutToCallInitializePageConfig", "🔄 [PageConfig] About to call initializePageConfig..."));
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  getI18nText("messages.initializePageConfigCompleted", "🔄 [PageConfig] initializePageConfig completed, result:"),
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

console.log(getI18nText("messages.pageConfigOptimizationComplete", "🎉 PageConfig optimization complete!"));
