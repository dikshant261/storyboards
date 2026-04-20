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
  if (
    typeof window !== "undefined" &&
    window.i18n &&
    typeof window.i18n.t === "function"
  ) {
    const resolved = window.i18n.t(key, params);
    if (typeof resolved === "string" && resolved.startsWith("[Missing:")) {
      return fallback;
    }
    return resolved;
  }
  return fallback;
};

/** Page 18: tap-hint GIF positions beside textButton1–3 (locale-specific; see `data.js`). */
const PAGE18_TAP_GIF_TEXT_BUTTON_COORDS_FALLBACK = [
  [355, 268, 408, 322],
  [355, 423, 408, 477],
  [355, 628, 408, 682],
];
const getPage18TapGifTextButtonCoordinates = (buttonIndex) => {
  const resolved = getI18nText(
    "pages.page18.tapGifTextButtonCoordinates",
    PAGE18_TAP_GIF_TEXT_BUTTON_COORDS_FALLBACK
  );
  if (Array.isArray(resolved) && resolved[buttonIndex]) {
    return resolved[buttonIndex];
  }
  return PAGE18_TAP_GIF_TEXT_BUTTON_COORDS_FALLBACK[buttonIndex] || PAGE18_TAP_GIF_TEXT_BUTTON_COORDS_FALLBACK[0];
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
          fontSize: '44gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',
          questionLineHeight: '1.7',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
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
          imageAlt: getI18nText('common.imageAltTap')
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
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page2.highlights", [])
        }
      },
      // milk image
      {
        id: 'page2-milk-image',
        name: 'page2-milk-image',
        type: 'container',
        coordinates: [150, 480, 350, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/milk.png',
        }
      },
      // 6 milk boxes text
      {
        id: 'page2-milk-image-text',
        name: 'page2-milk-image-text',
        type: 'textbox',
        coordinates: [140, 680, 370, 730], // Footer bar at bottom
        zIndex: 55,
        props: {
          text: getI18nText("common.milkImageText", "6 milk boxes"),
          color: '#ffffff',
          fontSize: '32gc',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#3A739A',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5gc',
          borderRadius: '10gc'
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
          imageAlt: getI18nText('common.imageAltTap')
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
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page3.highlights", [])
        }
      },
      // milk image
      {
        id: 'page3-milk-image',
        name: 'page3-milk-image',
        type: 'container',
        coordinates: [150, 480, 350, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/milk.png',
        }
      },
      // 6 milk boxes text
      {
        id: 'page3-milk-image-text',
        name: 'page3-milk-image-text',
        type: 'textbox',
        coordinates: [140, 680, 370, 730], // Footer bar at bottom
        zIndex: 55,
        props: {
          text: getI18nText("common.milkImageText", "6 milk boxes"),
          color: '#ffffff',
          fontSize: '32gc',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#3A739A',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5gc',
          borderRadius: '10gc'
        }
      },
      // lollipop image
      {
        id: 'page3-lollipop-image',
        name: 'page3-lollipop-image',
        type: 'container',
        coordinates: [450, 480, 650, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/lollipop.png',
        }
      },
      // 6 lollipop text
      {
        id: 'page3-lollipop-text',
        name: 'page3-lollipop-text',
        type: 'textbox',
        coordinates: [450, 680, 650, 730], // Footer bar at bottom
        zIndex: 55,
        props: {
          text: getI18nText("common.lolliopsImageText", "12 lollipops"),
          color: '#ffffff',
          fontSize: '32gc',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#93565E',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5gc',
          borderRadius: '10gc'

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
          imageAlt: getI18nText('common.imageAltTap')
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
          fontSize: '40gc',
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
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page4.highlights", [])
        }
      },
      // milk image
      {
        id: 'page4-milk-image',
        name: 'page4-milk-image',
        type: 'container',
        coordinates: [150, 480, 350, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/milk.png',
        }
      },
      // 6 milk boxes text
      {
        id: 'page4-milk-image-text',
        name: 'page4-milk-image-text',
        type: 'textbox',
        coordinates: [140, 680, 370, 730], // Footer bar at bottom
        zIndex: 55,
        props: {
          text: getI18nText("common.milkImageText", "6 milk boxes"),
          color: '#ffffff',
          fontSize: '32gc',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#3A739A',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5gc',
          borderRadius: '10gc'
        }
      },
      // lollipop image
      {
        id: 'page4-lollipop-image',
        name: 'page4-lollipop-image',
        type: 'container',
        coordinates: [450, 480, 650, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/lollipop.png',
        }
      },
      // 6 lollipop text
      {
        id: 'page4-lollipop-text',
        name: 'page4-lollipop-text',
        type: 'textbox',
        coordinates: [450, 680, 650, 730], // Footer bar at bottom
        zIndex: 55,
        props: {
          text: getI18nText("common.lolliopsImageText", "12 lollipops"),
          color: '#ffffff',
          fontSize: '32gc',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#93565E',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5gc',
          borderRadius: '10gc'

        }
      },
      // biscuit image
      {
        id: 'page4-biscuit-image',
        name: 'page4-biscuit-image',
        type: 'container',
        coordinates: [750, 480, 950, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          imageSrc: 'assets/biscuit.png',
        }
      },
      // 6 milk boxes text
      {
        id: 'page4-biscuit-text',
        name: 'page4-biscuit-text',
        type: 'textbox',
        coordinates: [750, 680, 950, 730], // Footer bar at bottom
        zIndex: 55,
        props: {
          text: getI18nText("common.biscuitImageText", "24 packets of biscuits"),
          color: '#ffffff',
          fontSize: '32gc',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#837746',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5gc',
          borderRadius: '10gc'
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

      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page4.footerInstruction"),
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
          imageAlt: getI18nText('common.imageAltTap')
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
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page5-question-background',
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
        id: 'page5-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page5.highlights", [])
        }
      },

      // Vertical blue line
      {
        id: 'page5-vertical-blue-line',
        name: 'vertical-blue-line',
        type: 'custom',
        coordinates: [275, 425, 279, 700], // x1, y1, x2, y2 (4gc width); +25gc x from prior
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6', // Blue color
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Horizontal gold line
      {
        id: 'page5-horizontal-gold-line',
        name: 'horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 700, 1090, 704], // x1, y1, x2, y2 (4gc height); two parcels on page 5
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B', // Gold color
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Vertical gold line (3gc): same y-span as blue axis; shown in state-1-def (TeacherNote overrides display)
      {
        id: 'page5-one-button-vertical-gold-line',
        name: 'one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 425, 387, 700], // y matches page5-vertical-blue-line; x mid (357+413)/2 ≈ 385
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },

      // "1" control (container1): gold, clickable in default; vertical line + ticks appear in later states
      {
        id: 'page5-horizontal-line-one-button',
        name: 'horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 674, 413, 730],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page5InteractionState;
              window.page5InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page5InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },

      // Tap hint on the "1" button (footer also has page5-tap-animation by next control)
      {
        id: 'page5-tap-gif-one-button',
        name: 'page5-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 703, 438, 763],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage5InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets'
          ]
        }
      },

      // Parcels: box + inner grid + optional label (ParcelDisplayComponent)
      {
        id: 'page5-parcel-display-1',
        name: 'page5-parcel-display-1',
        type: 'custom',
        coordinates: [551, 404, 849, 724],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-2-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page5-parcel1-left-over-label',
            margins: { left: 9, top: -10, right: 24, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page5-parcel-display-2',
        name: 'page5-parcel-display-2',
        type: 'custom',
        coordinates: [809, 404, 1107, 724],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: ['state-2-def', 'state-2-milk', 'state-2-lollipop'],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page5-parcel2-left-over-label',
            margins: { left: 9, top: -10, right: 24, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },

      // Icons to the right of quantity tiles — clickability from window.page5InteractionState
      {
        id: 'page5-quantity-icon-milk',
        name: 'page5-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 454, 334, 506], // ~10% larger than [292,457,332,504], same center
        zIndex: 56,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage5InteractionStates: ['state-2-packets']
        }
      },
      {
        id: 'page5-quantity-icon-lollipop',
        name: 'page5-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 536, 334, 588],
        zIndex: 56,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage5InteractionStates: ['state-2-packets']
        }
      },
      {
        id: 'page5-quantity-icon-biscuit',
        name: 'page5-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 618, 334, 670],
        zIndex: 56,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage5InteractionStates: ['state-2-packets']
        }
      },
      {
        id: 'page5-tap-gif-quantity-icon-milk',
        name: 'page5-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 455, 89, 505],
        zIndex: 57,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page5InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def'] },
          hideInPage5InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets'
          ]
        }
      },
      {
        id: 'page5-tap-gif-quantity-icon-lollipop',
        name: 'page5-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 537, 89, 587],
        zIndex: 57,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page5InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk'] },
          hideInPage5InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets'
          ]
        }
      },
      {
        id: 'page5-tap-gif-quantity-icon-biscuit',
        name: 'page5-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 619, 89, 669],
        zIndex: 57,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page5InteractionStateChange',
          showOnEventFilter: { state: ['state-1-lollipop', 'state-2-lollipop'] },
          hideInPage5InteractionStates: ['state-1-packets', 'state-2-packets']
        }
      },

      // Quantity labels (stacked beside vertical line; even spacing y=425–700)
      {
        id: 'page5-quantity-tile-milk',
        name: 'quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 457, 289, 504], // ~15% smaller; shifted −25gc x
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)', // aqua / cyan
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page5InteractiveInStates: ['state-1-def', 'state-2-def'],
          page5NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk'
          }
        }
      },
      {
        id: 'page5-quantity-label-lolipop',
        name: 'quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 539, 289, 586],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)', // rose
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page5InteractiveInStates: ['state-1-milk', 'state-2-milk'],
          page5NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop'
          }
        }
      },
      {
        id: 'page5-quantity-label-packet',
        name: 'quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 621, 289, 668],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)', // gold
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page5InteractiveInStates: ['state-1-lollipop', 'state-2-lollipop'],
          page5NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets'
          }
        }
      },

      // Green check circles on gold "1" vertical — hidden in default
      {
        id: 'page5-axis-check-milk',
        name: 'axis-check-milk',
        type: 'custom',
        coordinates: [363, 458, 407, 503],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page5-axis-check-lollipop',
        name: 'axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 540, 407, 585],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page5-axis-check-packets',
        name: 'axis-check-packets',
        type: 'custom',
        coordinates: [363, 622, 407, 667],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Second axis (container2): hidden in default
      {
        id: 'page5-two-button-vertical-gold-line',
        name: 'two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 425, 500, 700], // 3gc wide; +25gc x from prior
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page5-horizontal-line-two-button',
        name: 'horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 674, 526, 730],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page5InteractionState;
            window.page5InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page5InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page5-tap-gif-two-button',
        name: 'page5-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 703, 551, 763],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page5InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage5InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets'
          ]
        }
      },
      {
        id: 'page5-axis2-check-milk',
        name: 'axis2-check-milk',
        type: 'custom',
        coordinates: [476, 458, 520, 503],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page5-axis2-check-lollipop',
        name: 'axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 540, 520, 585],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page5-axis2-check-packets',
        name: 'axis2-check-packets',
        type: 'custom',
        coordinates: [476, 622, 520, 667],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Information Analysis Panel
      {
        id: 'page5-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page5.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: getI18nText("pages.page5.informationAnalysis.toFind", []),
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Instruction Text
      {
        id: 'page5-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page5.footerInstruction"),
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

      // Tap Animation GIF - hidden until page 5 interaction "quiz" completes (state-2-packets)
      {
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          showOnEvent: 'page5InteractionStateChange',
          showOnEventFilter: { state: 'state-2-packets' }
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
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 5 },
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
        id: 'page6-question-background',
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
        id: 'page6-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page6.highlights", [])
        }
      },

      // Vertical blue line (same layout as page 5)
      {
        id: 'page6-vertical-blue-line',
        name: 'page6-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 425, 279, 700],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Horizontal gold line (same layout as page 5)
      {
        id: 'page6-horizontal-gold-line',
        name: 'page6-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 700, 1000, 704],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Six gold dots between "2" and "?" (same layout as page 5)
      {
        id: 'page6-horizontal-gold-dot-1',
        name: 'page6-horizontal-gold-dot-1',
        type: 'custom',
        coordinates: [563, 696, 575, 708],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-gold-dot-2',
        name: 'page6-horizontal-gold-dot-2',
        type: 'custom',
        coordinates: [630, 696, 642, 708],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-gold-dot-3',
        name: 'page6-horizontal-gold-dot-3',
        type: 'custom',
        coordinates: [696, 696, 708, 708],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-gold-dot-4',
        name: 'page6-horizontal-gold-dot-4',
        type: 'custom',
        coordinates: [762, 696, 774, 708],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-gold-dot-5',
        name: 'page6-horizontal-gold-dot-5',
        type: 'custom',
        coordinates: [829, 696, 841, 708],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-gold-dot-6',
        name: 'page6-horizontal-gold-dot-6',
        type: 'custom',
        coordinates: [895, 696, 907, 708],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },

      // "?" at far right of horizontal gold line (same highlight as question text — highlightColor3)
      {
        id: 'page6-horizontal-line-unknown-pill',
        name: 'page6-horizontal-line-unknown-pill',
        type: 'custom',
        coordinates: [944, 674, 1000, 730],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#EF6AA9',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },

      // Container 1 / 2 axis UI (page 6: static recap — fully visible, non-interactive; TeacherNote handles visibility)
      {
        id: 'page6-one-button-vertical-gold-line',
        name: 'page6-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 425, 387, 700],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-line-one-button',
        name: 'page6-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 674, 413, 730],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },

      // Quantity icons + labels (page 6: static only — no page 5 interaction state)
      {
        id: 'page6-quantity-icon-milk',
        name: 'page6-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 454, 334, 506],
        zIndex: 56,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page6-quantity-icon-lollipop',
        name: 'page6-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 536, 334, 588],
        zIndex: 56,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page6-quantity-icon-biscuit',
        name: 'page6-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 618, 334, 670],
        zIndex: 56,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page6-quantity-tile-milk',
        name: 'page6-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 457, 289, 504],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page6-quantity-label-lolipop',
        name: 'page6-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 539, 289, 586],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page6-quantity-label-packet',
        name: 'page6-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 621, 289, 668],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },

      {
        id: 'page6-axis-check-milk',
        name: 'page6-axis-check-milk',
        type: 'custom',
        coordinates: [363, 458, 407, 503],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page6-axis-check-lollipop',
        name: 'page6-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 540, 407, 585],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page6-axis-check-packets',
        name: 'page6-axis-check-packets',
        type: 'custom',
        coordinates: [363, 622, 407, 667],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page6-two-button-vertical-gold-line',
        name: 'page6-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 425, 500, 700],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page6-horizontal-line-two-button',
        name: 'page6-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 674, 526, 730],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page6-axis2-check-milk',
        name: 'page6-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 458, 520, 503],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page6-axis2-check-lollipop',
        name: 'page6-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 540, 520, 585],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page6-axis2-check-packets',
        name: 'page6-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 622, 520, 667],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },

      // Information Analysis Panel
      {
        id: 'page6-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page6.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: getI18nText("pages.page6.informationAnalysis.toFind", []),
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Instruction Text
      {
        id: 'page6-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page6.footerInstruction"),
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
        id: 'page6-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap')
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    7: [
      // Black container with 70% opacity
      {
        id: 'page7-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [275, 20, 1300, 540], // Adjust coordinates as needed50
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
      // Information gathered text with checkmark
      {
        id: 'page7-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [5, 630, 1595, 680], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page7.informationGathered", '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.'),
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
        id: 'page7-next-steps-text',
        name: 'next-steps-text',
        type: 'custom',
        coordinates: [300, 700, 1300, 750], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page7.nextStep", 'Next - Steps required to find answer'),
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

      // Packing diagram (same layout as page 6; offset +250gc x, −300gc y from base)
      {
        id: 'page7-vertical-blue-line',
        name: 'page7-vertical-blue-line',
        type: 'custom',
        coordinates: [525, 125, 529, 400],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page7-horizontal-gold-line',
        name: 'page7-horizontal-gold-line',
        type: 'custom',
        coordinates: [525, 400, 1250, 404],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page7-horizontal-gold-dot-1',
        name: 'page7-horizontal-gold-dot-1',
        type: 'custom',
        coordinates: [813, 396, 825, 408],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-gold-dot-2',
        name: 'page7-horizontal-gold-dot-2',
        type: 'custom',
        coordinates: [880, 396, 892, 408],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-gold-dot-3',
        name: 'page7-horizontal-gold-dot-3',
        type: 'custom',
        coordinates: [946, 396, 958, 408],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-gold-dot-4',
        name: 'page7-horizontal-gold-dot-4',
        type: 'custom',
        coordinates: [1012, 396, 1024, 408],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-gold-dot-5',
        name: 'page7-horizontal-gold-dot-5',
        type: 'custom',
        coordinates: [1079, 396, 1091, 408],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-gold-dot-6',
        name: 'page7-horizontal-gold-dot-6',
        type: 'custom',
        coordinates: [1145, 396, 1157, 408],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-line-unknown-pill',
        name: 'page7-horizontal-line-unknown-pill',
        type: 'custom',
        coordinates: [1194, 374, 1250, 430],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#EF6AA9',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-one-button-vertical-gold-line',
        name: 'page7-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [634, 125, 637, 400],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-line-one-button',
        name: 'page7-horizontal-line-one-button',
        type: 'custom',
        coordinates: [607, 374, 663, 430],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-quantity-icon-milk',
        name: 'page7-quantity-icon-milk',
        type: 'container',
        coordinates: [540, 154, 584, 206],
        zIndex: 56,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page7-quantity-icon-lollipop',
        name: 'page7-quantity-icon-lollipop',
        type: 'container',
        coordinates: [540, 236, 584, 288],
        zIndex: 56,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page7-quantity-icon-biscuit',
        name: 'page7-quantity-icon-biscuit',
        type: 'container',
        coordinates: [540, 318, 584, 370],
        zIndex: 56,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page7-quantity-tile-milk',
        name: 'page7-quantity-tile-milk',
        type: 'custom',
        coordinates: [292, 157, 539, 204],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page7-quantity-label-lolipop',
        name: 'page7-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [292, 239, 539, 286],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page7-quantity-label-packet',
        name: 'page7-quantity-tile-packets',
        type: 'custom',
        coordinates: [292, 321, 539, 368],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page7-axis-check-milk',
        name: 'page7-axis-check-milk',
        type: 'custom',
        coordinates: [613, 158, 657, 203],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-axis-check-lollipop',
        name: 'page7-axis-check-lollipop',
        type: 'custom',
        coordinates: [613, 240, 657, 285],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-axis-check-packets',
        name: 'page7-axis-check-packets',
        type: 'custom',
        coordinates: [613, 322, 657, 367],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-two-button-vertical-gold-line',
        name: 'page7-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [747, 125, 750, 400],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page7-horizontal-line-two-button',
        name: 'page7-horizontal-line-two-button',
        type: 'custom',
        coordinates: [720, 374, 776, 430],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-axis2-check-milk',
        name: 'page7-axis2-check-milk',
        type: 'custom',
        coordinates: [726, 158, 770, 203],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-axis2-check-lollipop',
        name: 'page7-axis2-check-lollipop',
        type: 'custom',
        coordinates: [726, 240, 770, 285],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page7-axis2-check-packets',
        name: 'page7-axis2-check-packets',
        type: 'custom',
        coordinates: [726, 322, 770, 367],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'flex'
        }
      },

      // Instruction Text - "Tap >> to identify all the required steps for the addition"
      {
        id: 'page7-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page7.footerInstruction',
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 23'));
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
          imageAlt: getI18nText('common.imageAltTap')
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 21'));
              }
            }
          }
        }
      },

    ],
    8: [
      // Black container background for equation (40% opacity)
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
      //header text
      {
        id: 'page8-header-text',
        name: 'page8-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page8-header-text',
          text: getI18nText("pages.page8.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page8-red-light-background',
        name: 'page8-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1595, 675], // Covers all equation components with padding, moved up 25gc
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

      // --- Page 8: packing (same model as page 5); block shifted −100gc y from first placement ---
      {
        id: 'page8-vertical-blue-line',
        name: 'page8-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page8-horizontal-gold-line',
        name: 'page8-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1500, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page8-one-button-vertical-gold-line',
        name: 'page8-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page8-horizontal-line-one-button',
        name: 'page8-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page8InteractionState;
              window.page8InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page8InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page8-tap-gif-one-button',
        name: 'page8-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage8InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ]
        }
      },
      {
        id: 'page8-parcel-display-1',
        name: 'page8-parcel-display-1',
        type: 'custom',
        coordinates: [676, 304, 974, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page8-parcel1-left-over-label',
            margins: { left: 9, top: -10, right: 24, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page8-parcel-display-2',
        name: 'page8-parcel-display-2',
        type: 'custom',
        coordinates: [934, 304, 1232, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page8-parcel2-left-over-label',
            margins: { left: 9, top: -10, right: 24, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page8-parcel-display-3',
        name: 'page8-parcel-display-3',
        type: 'custom',
        coordinates: [1192, 304, 1490, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page8-parcel3-left-over-label',
            margins: { left: 9, top: -10, right: 24, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page8-quantity-icon-milk',
        name: 'page8-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage8InteractionStates: ['state-3-packets']
        }
      },
      {
        id: 'page8-quantity-icon-lollipop',
        name: 'page8-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage8InteractionStates: ['state-3-packets']
        }
      },
      {
        id: 'page8-quantity-icon-biscuit',
        name: 'page8-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage8InteractionStates: ['state-3-packets']
        }
      },
      {
        id: 'page8-tap-gif-quantity-icon-milk',
        name: 'page8-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page8InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal'] },
          hideInPage8InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ]
        }
      },
      {
        id: 'page8-tap-gif-quantity-icon-lollipop',
        name: 'page8-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page8InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk'] },
          hideInPage8InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets'
          ]
        }
      },
      {
        id: 'page8-tap-gif-quantity-icon-biscuit',
        name: 'page8-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page8InteractionStateChange',
          showOnEventFilter: { state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop'] },
          hideInPage8InteractionStates: ['state-1-packets', 'state-2-packets', 'state-3-packets']
        }
      },
      {
        id: 'page8-quantity-tile-milk',
        name: 'page8-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page8InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal'],
          page8NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk'
          }
        }
      },
      {
        id: 'page8-quantity-label-lolipop',
        name: 'page8-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page8InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk'],
          page8NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop'
          }
        }
      },
      {
        id: 'page8-quantity-label-packet',
        name: 'page8-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page8InteractiveInStates: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop'],
          page8NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets'
          }
        }
      },
      {
        id: 'page8-axis-check-milk',
        name: 'page8-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-axis-check-lollipop',
        name: 'page8-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-axis-check-packets',
        name: 'page8-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-two-button-vertical-gold-line',
        name: 'page8-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page8-horizontal-line-two-button',
        name: 'page8-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page8InteractionState;
            window.page8InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page8InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page8-tap-gif-two-button',
        name: 'page8-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page8InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage8InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ]
        }
      },
      {
        id: 'page8-axis2-check-milk',
        name: 'page8-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-axis2-check-lollipop',
        name: 'page8-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-axis2-check-packets',
        name: 'page8-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page8-three-button-vertical-gold-line',
        name: 'page8-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page8InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page8InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page8InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page8InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page8InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page8-horizontal-line-three-button',
        name: 'page8-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page8InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page8InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page8InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page8InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page8InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page8-tap-gif-three-button',
        name: 'page8-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page8InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage8InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ]
        }
      },
      {
        id: 'page8-axis3-check-milk',
        name: 'page8-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-axis3-check-lollipop',
        name: 'page8-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page8-axis3-check-packets',
        name: 'page8-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Correct-mode feedback: visible only after biscuit/packet tap (state-3-packets)
      {
        id: 'page8-packets-equal-feedback',
        name: 'page8-packets-equal-feedback',
        type: 'custom',
        coordinates: [5, 685, 1595, 810],
        zIndex: 63,
        props: {
          componentType: 'TeacherNoteComponent',
          id: 'page8-packets-equal-feedback',
          textI18nKey: 'pages.page8.packetsEqualDistributionFeedback',
          textI18nFallback: getI18nText('pages.page8.packetsEqualDistributionFeedback'),
          text: getI18nText('pages.page8.packetsEqualDistributionFeedback'),
          fontSize: '32gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 197, 94, 0.42)',
          border: '2gc solid #22C55E',
          borderRadius: '12gc',
          padding: '14gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Instruction Text — footer copy from interaction state; after quiz uses pages.page8.instructionAfterQuiz
      {
        id: 'page8-instruction-text',
        name: 'page8-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page8-instruction-text',
          text: getI18nText('pages.page8.footerInstruction'),
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

      // Tap Animation GIF - hidden until page 8 interaction "quiz" completes (state-3-packets)
      {
        id: 'page8-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          showOnEvent: 'page8InteractionStateChange',
          showOnEventFilter: { state: 'state-3-packets' }
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
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 8 },
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


    ],
    9: [
      // Black container background for equation (40% opacity)
      {
        id: 'page9-equation-background',
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
      //header text
      {
        id: 'page9-header-text',
        name: 'page9-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page9-header-text',
          text: getI18nText("pages.page8.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page9-red-light-background',
        name: 'page9-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1595, 675], // Covers all equation components with padding, moved up 25gc
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

      // --- Page 8: packing (same model as page 5); block shifted −100gc y from first placement ---
      {
        id: 'page9-vertical-blue-line',
        name: 'page9-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page9-horizontal-gold-line',
        name: 'page9-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page9-one-button-vertical-gold-line',
        name: 'page9-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page9-horizontal-line-one-button',
        name: 'page9-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page9InteractionState;
              window.page9InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page9-tap-gif-one-button',
        name: 'page9-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage9InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
            ,
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-parcel-display-1',
        name: 'page9-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page9-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page9-parcel-display-2',
        name: 'page9-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page9-parcel-display-3',
        name: 'page9-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page9-parcel-display-4',
        name: 'page9-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page9-quantity-icon-milk',
        name: 'page9-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets', 'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets']
        }
      },
      {
        id: 'page9-quantity-icon-lollipop',
        name: 'page9-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page9-quantity-icon-biscuit',
        name: 'page9-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page9-tap-gif-quantity-icon-milk',
        name: 'page9-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal', 'state-6-reveal']
          },
          hideInPage9InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-tap-gif-quantity-icon-lollipop',
        name: 'page9-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk', 'state-6-milk']
          },
          hideInPage9InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-tap-gif-quantity-icon-biscuit',
        name: 'page9-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: [
              'state-1-lollipop',
              'state-2-lollipop',
              'state-3-lollipop',
              'state-4-lollipop',
              'state-6-lollipop'
            ]
          },
          hideInPage9InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-quantity-tile-milk',
        name: 'page9-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal', 'state-6-reveal'],
          page9NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk',
            'state-6-reveal': 'state-6-milk'
          }
        }
      },
      {
        id: 'page9-quantity-label-lolipop',
        name: 'page9-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk', 'state-6-milk'],
          page9NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop',
            'state-6-milk': 'state-6-lollipop'
          }
        }
      },
      {
        id: 'page9-quantity-label-packet',
        name: 'page9-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop',
            'state-6-lollipop'
          ],
          page9NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets',
            'state-6-lollipop': 'state-6-packets'
          }
        }
      },
      {
        id: 'page9-axis-check-milk',
        name: 'page9-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis-check-lollipop',
        name: 'page9-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis-check-packets',
        name: 'page9-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-two-button-vertical-gold-line',
        name: 'page9-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page9-horizontal-line-two-button',
        name: 'page9-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page9InteractionState;
            window.page9InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page9InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page9-tap-gif-two-button',
        name: 'page9-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage9InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
            ,
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-axis2-check-milk',
        name: 'page9-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis2-check-lollipop',
        name: 'page9-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis2-check-packets',
        name: 'page9-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page9-three-button-vertical-gold-line',
        name: 'page9-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page9-horizontal-line-three-button',
        name: 'page9-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page9-tap-gif-three-button',
        name: 'page9-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage9InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
            ,
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-axis3-check-milk',
        name: 'page9-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis3-check-lollipop',
        name: 'page9-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis3-check-packets',
        name: 'page9-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page9-four-button-vertical-gold-line',
        name: 'page9-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page9-horizontal-line-four-button',
        name: 'page9-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page9-tap-gif-four-button',
        name: 'page9-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage9InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
            ,
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page9-axis4-check-milk',
        name: 'page9-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis4-check-lollipop',
        name: 'page9-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page9-axis4-check-packets',
        name: 'page9-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Incorrect-style feedback (salmon): visible in state-4-packets after packet step
      {
        id: 'page9-packets-equal-feedback',
        name: 'page9-packets-equal-feedback',
        type: 'custom',
        coordinates: [5, 685, 1595, 810],
        zIndex: 63,
        props: {
          componentType: 'TeacherNoteComponent',
          id: 'page9-packets-equal-feedback',
          textI18nKey: 'pages.page9.feedbackFourParcelsMilkLeftover',
          textI18nFallback: getI18nText('pages.page9.feedbackFourParcelsMilkLeftover'),
          text: getI18nText('pages.page9.feedbackFourParcelsMilkLeftover'),
          fontSize: '32gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: '4gc dashed var(--color-salmon-dark, #E9967A)',
          borderRadius: '12gc',
          padding: '14gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Instruction Text — footer copy from interaction state; after quiz uses pages.page8.instructionAfterQuiz
      {
        id: 'page9-instruction-text',
        name: 'page9-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page9-instruction-text',
          text: getI18nText('pages.page9.footerInstruction'),
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

      // Tap Animation GIF - hidden until page 9 interaction "quiz" completes (state-4-packets)
      {
        id: 'page9-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-4-packets' }
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
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 9 },
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
        id: 'page9-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 9 },
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    10: [
      // Black container background for equation (40% opacity)
      {
        id: 'page10-equation-background',
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
      //header text
      {
        id: 'page10-header-text',
        name: 'page10-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page10-header-text',
          text: getI18nText("pages.page10.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page10-red-light-background',
        name: 'page10-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1195, 815], // Covers all equation components with padding, moved up 25gc
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
      // Axes chrome (same placement as page 9)
      {
        id: 'page10-vertical-blue-line',
        name: 'page10-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page10-horizontal-gold-line',
        name: 'page10-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page10-one-button-vertical-gold-line',
        name: 'page10-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page10-horizontal-line-one-button',
        name: 'page10-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page9InteractionState;
              window.page9InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page10-tap-gif-one-button',
        name: 'page10-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage9InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-parcel-display-1',
        name: 'page10-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page10-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page10-parcel-display-2',
        name: 'page10-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page10-parcel-display-3',
        name: 'page10-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page10-parcel-display-4',
        name: 'page10-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page10-quantity-icon-milk',
        name: 'page10-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page10-quantity-icon-lollipop',
        name: 'page10-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page10-quantity-icon-biscuit',
        name: 'page10-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page10-tap-gif-quantity-icon-milk',
        name: 'page10-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage9InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-tap-gif-quantity-icon-lollipop',
        name: 'page10-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage9InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-tap-gif-quantity-icon-biscuit',
        name: 'page10-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage9InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-quantity-tile-milk',
        name: 'page10-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page9NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page10-quantity-label-lolipop',
        name: 'page10-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page9NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page10-quantity-label-packet',
        name: 'page10-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page9NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page10-axis-check-milk',
        name: 'page10-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis-check-lollipop',
        name: 'page10-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis-check-packets',
        name: 'page10-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-two-button-vertical-gold-line',
        name: 'page10-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page10-horizontal-line-two-button',
        name: 'page10-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page9InteractionState;
            window.page9InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page9InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page10-tap-gif-two-button',
        name: 'page10-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage9InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-axis2-check-milk',
        name: 'page10-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis2-check-lollipop',
        name: 'page10-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis2-check-packets',
        name: 'page10-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page10-three-button-vertical-gold-line',
        name: 'page10-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page10-horizontal-line-three-button',
        name: 'page10-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page10-tap-gif-three-button',
        name: 'page10-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage9InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-axis3-check-milk',
        name: 'page10-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis3-check-lollipop',
        name: 'page10-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis3-check-packets',
        name: 'page10-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page10-four-button-vertical-gold-line',
        name: 'page10-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page10-horizontal-line-four-button',
        name: 'page10-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page10-tap-gif-four-button',
        name: 'page10-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage9InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page10-axis4-check-milk',
        name: 'page10-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis4-check-lollipop',
        name: 'page10-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page10-axis4-check-packets',
        name: 'page10-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      //quiz panel
      {
        id: 'page10-quiz-panel',
        name: 'page10-quiz-panel',
        type: 'custom',
        coordinates: [1200, 150, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page10-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page10.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page10.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '30gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // No question row (empty question)
          optionsRowHeight: 65, // With header/question 0%, options + feedback must sum to 100%
          feedbackRowHeight: 35,
          optionButtonWidth: 85,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '34gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page10.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page10-instruction-text',
        name: 'page10-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page10-instruction-text',
          text: getI18nText('common.quizInstructionSelectOption'),
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
        id: 'page10-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false // Hidden on quiz pages initially, shown when quiz is completed
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
          enableOnEventFilter: { pageNumber: 10 }, // Only enable for page 8
          ignorePageCompletion: false, // Check page completion - button disabled until quiz is complete
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],

    11: [
      // Black container background for equation (40% opacity)
      {
        id: 'page11-equation-background',
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
      //header text
      {
        id: 'page11-header-text',
        name: 'page11-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page11-header-text',
          text: getI18nText("pages.page11.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page11-red-light-background',
        name: 'page11-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1195, 815], // Covers all equation components with padding, moved up 25gc
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
      // Axes chrome (same placement as page 9)
      {
        id: 'page11-vertical-blue-line',
        name: 'page11-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page11-horizontal-gold-line',
        name: 'page11-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page11-one-button-vertical-gold-line',
        name: 'page11-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page11-horizontal-line-one-button',
        name: 'page11-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          blink: true,
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page11InteractionState;
              window.page11InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page11-tap-gif-one-button',
        name: 'page11-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage11InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-parcel-display-1',
        name: 'page11-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page11-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page11-parcel-display-2',
        name: 'page11-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page11-parcel-display-3',
        name: 'page11-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page11-parcel-display-4',
        name: 'page11-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page11-quantity-icon-milk',
        name: 'page11-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage11InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page11-quantity-icon-lollipop',
        name: 'page11-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage11InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page11-quantity-icon-biscuit',
        name: 'page11-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage11InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page11-tap-gif-quantity-icon-milk',
        name: 'page11-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page11InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage11InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-tap-gif-quantity-icon-lollipop',
        name: 'page11-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page11InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage11InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-tap-gif-quantity-icon-biscuit',
        name: 'page11-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page11InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage11InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-quantity-tile-milk',
        name: 'page11-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page11InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page11NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page11-quantity-label-lolipop',
        name: 'page11-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page11InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page11NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page11-quantity-label-packet',
        name: 'page11-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page11InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page11NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page11-axis-check-milk',
        name: 'page11-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis-check-lollipop',
        name: 'page11-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis-check-packets',
        name: 'page11-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-two-button-vertical-gold-line',
        name: 'page11-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page11-horizontal-line-two-button',
        name: 'page11-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          blink: true,
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page11InteractionState;
            window.page11InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page11InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page11-tap-gif-two-button',
        name: 'page11-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page11InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage11InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-axis2-check-milk',
        name: 'page11-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis2-check-lollipop',
        name: 'page11-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis2-check-packets',
        name: 'page11-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page11-three-button-vertical-gold-line',
        name: 'page11-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page11InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page11InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page11InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page11-horizontal-line-three-button',
        name: 'page11-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          blink: true,
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page11InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page11InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page11InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page11-tap-gif-three-button',
        name: 'page11-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page11InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage11InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-axis3-check-milk',
        name: 'page11-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis3-check-lollipop',
        name: 'page11-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis3-check-packets',
        name: 'page11-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page11-four-button-vertical-gold-line',
        name: 'page11-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page11InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page11InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page11InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page11-horizontal-line-four-button',
        name: 'page11-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page11InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page11InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page11InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page11-tap-gif-four-button',
        name: 'page11-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page11InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage11InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page11-axis4-check-milk',
        name: 'page11-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis4-check-lollipop',
        name: 'page11-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page11-axis4-check-packets',
        name: 'page11-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Instruction footer (state-driven in layout-components; no quiz on this page)
      {
        id: 'page11-instruction-text',
        name: 'page11-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page11-instruction-text',
          text: getI18nText('pages.page11.footerInstruction'),
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
        id: 'page11-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false // Shown when packing reaches state-4-packets (no quiz on this page)
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
          initialEnabled: false,
          enableOnEvent: 'page11InteractionStateChange',
          enableOnEventFilter: { state: 'state-4-packets' },
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    12: [
      // Black container background for equation (40% opacity)
      {
        id: 'page12-equation-background',
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
      //header text
      {
        id: 'page12-header-text',
        name: 'page12-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page12-header-text',
          text: getI18nText("pages.page12.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page12-red-light-background',
        name: 'page12-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1195, 815], // Covers all equation components with padding, moved up 25gc
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
      // Axes chrome (same placement as page 9)
      {
        id: 'page12-vertical-blue-line',
        name: 'page12-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page12-horizontal-gold-line',
        name: 'page12-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page12-one-button-vertical-gold-line',
        name: 'page12-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page12-horizontal-line-one-button',
        name: 'page12-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page12InteractionState;
              window.page12InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page12-tap-gif-one-button',
        name: 'page12-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage12InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-parcel-display-1',
        name: 'page12-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page12-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page12-parcel-display-2',
        name: 'page12-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page12-parcel-display-3',
        name: 'page12-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page12-parcel-display-4',
        name: 'page12-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page12-quantity-icon-milk',
        name: 'page12-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage12InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page12-quantity-icon-lollipop',
        name: 'page12-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage12InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page12-quantity-icon-biscuit',
        name: 'page12-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage12InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page12-tap-gif-quantity-icon-milk',
        name: 'page12-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page12InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage12InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-tap-gif-quantity-icon-lollipop',
        name: 'page12-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page12InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage12InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-tap-gif-quantity-icon-biscuit',
        name: 'page12-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page12InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage12InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-quantity-tile-milk',
        name: 'page12-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page12InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page12NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page12-quantity-label-lolipop',
        name: 'page12-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page12InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page12NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page12-quantity-label-packet',
        name: 'page12-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page12InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page12NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page12-axis-check-milk',
        name: 'page12-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis-check-lollipop',
        name: 'page12-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis-check-packets',
        name: 'page12-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-two-button-vertical-gold-line',
        name: 'page12-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page12-horizontal-line-two-button',
        name: 'page12-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page12InteractionState;
            window.page12InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page12InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page12-tap-gif-two-button',
        name: 'page12-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page12InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage12InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-axis2-check-milk',
        name: 'page12-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis2-check-lollipop',
        name: 'page12-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis2-check-packets',
        name: 'page12-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page12-three-button-vertical-gold-line',
        name: 'page12-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page12InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page12InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page12InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page12-horizontal-line-three-button',
        name: 'page12-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page12InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page12InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page12InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page12-tap-gif-three-button',
        name: 'page12-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page12InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage12InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-axis3-check-milk',
        name: 'page12-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis3-check-lollipop',
        name: 'page12-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis3-check-packets',
        name: 'page12-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page12-four-button-vertical-gold-line',
        name: 'page12-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page12InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page12InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page12InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page12-horizontal-line-four-button',
        name: 'page12-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          blink: true,
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page12InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page12InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page12InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page12-tap-gif-four-button',
        name: 'page12-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page12InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage12InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page12-axis4-check-milk',
        name: 'page12-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          blink: true,
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis4-check-lollipop',
        name: 'page12-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          blink: true,
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page12-axis4-check-packets',
        name: 'page12-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          blink: true,
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Instruction footer (state-driven in layout-components; no quiz on this page)
      {
        id: 'page12-instruction-text',
        name: 'page12-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page12-instruction-text',
          text: getI18nText('pages.page12.footerInstruction'),
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
        id: 'page12-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false // Shown when packing reaches state-4-packets (no quiz on this page)
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
          initialEnabled: false,
          enableOnEvent: 'page12InteractionStateChange',
          enableOnEventFilter: { state: 'state-4-packets' },
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    13: [
      // Black container background for equation (40% opacity)
      {
        id: 'page13-equation-background',
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
      //header text
      {
        id: 'page13-header-text',
        name: 'page13-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page13-header-text',
          text: getI18nText("pages.page13.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page13-red-light-background',
        name: 'page13-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1195, 815], // Covers all equation components with padding, moved up 25gc
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
      // Common factors summary (right strip; same typography as page 13 header)
      {
        id: 'page13-common-factors-summary',
        name: 'page13-common-factors-summary',
        type: 'custom',
        coordinates: [1205, 295, 1585, 575],
        zIndex: 60,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page13-common-factors-summary',
          text: getI18nText(
            'pages.page13.factorsSummaryHtml',
            "<div style='text-align:center;line-height:1.35;width:100%;'><span style='color:#FFFFFF'>1, 2, and 3 are</span><br/><span style='color:#50E382'>common factors.</span><br/><span style='color:#FFFFFF'>4 is</span><span style='color:#FF7D7D'> not a common</span><br/><span style='color:#FF7D7D'>factor.</span></div>"
          ),
          backgroundColor: 'transparent',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      // Axes chrome (same placement as page 9)
      {
        id: 'page13-vertical-blue-line',
        name: 'page13-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page13-horizontal-gold-line',
        name: 'page13-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page13-one-button-vertical-gold-line',
        name: 'page13-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page13-horizontal-line-one-button',
        name: 'page13-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page13InteractionState;
              window.page13InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      // {
      //   id: 'page13-tap-gif-one-button',
      //   name: 'page13-tap-gif-one-button',
      //   type: 'custom',
      //   coordinates: [378, 603, 438, 663],
      //   zIndex: '999',
      //   props: {
      //     componentType: 'TapGifComponent',
      //     imageSrc: 'assets/tap.gif',
      //     imageAlt: getI18nText('common.imageAltTap'),
      //     opacity: 0.75,
      //     hideInPage12InteractionStates: [
      //       'state-1-def',
      //       'state-1-milk',
      //       'state-1-lollipop',
      //       'state-1-packets',
      //       'state-2-def',
      //       'state-2-milk',
      //       'state-2-lollipop',
      //       'state-2-packets',
      //       'state-3-def',
      //       'state-3-reveal',
      //       'state-3-milk',
      //       'state-3-lollipop',
      //       'state-3-packets',
      //       'state-4-def',
      //       'state-4-reveal',
      //       'state-4-milk',
      //       'state-4-lollipop',
      //       'state-4-packets'
      //     ]
      //   }
      // },
      {
        id: 'page13-parcel-display-1',
        name: 'page13-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page13-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page13-parcel-display-2',
        name: 'page13-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page13-parcel-display-3',
        name: 'page13-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page13-parcel-display-4',
        name: 'page13-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 16, right: 49, bottom: 54 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page13-quantity-icon-milk',
        name: 'page13-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage12InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page13-quantity-icon-lollipop',
        name: 'page13-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage12InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page13-quantity-icon-biscuit',
        name: 'page13-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage12InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page13-tap-gif-quantity-icon-milk',
        name: 'page13-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page13InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage12InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page13-tap-gif-quantity-icon-lollipop',
        name: 'page13-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page13InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage12InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page13-tap-gif-quantity-icon-biscuit',
        name: 'page13-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page13InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage12InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page13-quantity-tile-milk',
        name: 'page13-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page13InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page13NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page13-quantity-label-lolipop',
        name: 'page13-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page13InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page13NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page13-quantity-label-packet',
        name: 'page13-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page13InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page13NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page13-axis-check-milk',
        name: 'page13-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis-check-lollipop',
        name: 'page13-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis-check-packets',
        name: 'page13-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-two-button-vertical-gold-line',
        name: 'page13-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page13-horizontal-line-two-button',
        name: 'page13-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page13InteractionState;
            window.page13InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page13InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page13-tap-gif-two-button',
        name: 'page13-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page13InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage12InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page13-axis2-check-milk',
        name: 'page13-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis2-check-lollipop',
        name: 'page13-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis2-check-packets',
        name: 'page13-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page13-three-button-vertical-gold-line',
        name: 'page13-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page13InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page13InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page13InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page13-horizontal-line-three-button',
        name: 'page13-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page13InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page13InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page13InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page13-tap-gif-three-button',
        name: 'page13-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page13InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage12InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page13-axis3-check-milk',
        name: 'page13-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis3-check-lollipop',
        name: 'page13-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis3-check-packets',
        name: 'page13-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page13-four-button-vertical-gold-line',
        name: 'page13-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page13InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page13InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page13InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page13-horizontal-line-four-button',
        name: 'page13-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page13InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page13InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page13InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page13-tap-gif-four-button',
        name: 'page13-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page13InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage12InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page13-axis4-check-milk',
        name: 'page13-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis4-check-lollipop',
        name: 'page13-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page13-axis4-check-packets',
        name: 'page13-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Instruction footer (state-driven in layout-components; no quiz on this page)
      {
        id: 'page13-instruction-text',
        name: 'page13-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page13-instruction-text',
          text: getI18nText('pages.page13.footerInstruction'),
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
        id: 'page13-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false // Shown when packing reaches state-4-packets (no quiz on this page)
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
          initialEnabled: false,
          enableOnEvent: 'page13InteractionStateChange',
          enableOnEventFilter: { state: 'state-4-packets' },
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    14: [
      // Black container background for equation (40% opacity)
      {
        id: 'page14-equation-background',
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
      //header text
      {
        id: 'page14-header-text',
        name: 'page14-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page14-header-text',
          text: getI18nText(
            'pages.page14.headerText',
            'Which of the following helps to get maximum number of parcels?'
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page14-red-light-background',
        name: 'page14-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1195, 815], // Covers all equation components with padding, moved up 25gc
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
      // Axes chrome (same placement as page 9)
      {
        id: 'page14-vertical-blue-line',
        name: 'page14-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page14-horizontal-gold-line',
        name: 'page14-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      // Eight gold dots on horizontal axis: equal spacing from right of "4" (x=752) to left of "?" (x=1044); y on axis at 600
      {
        id: 'page14-horizontal-gold-dot-1',
        name: 'page14-horizontal-gold-dot-1',
        type: 'custom',
        coordinates: [774, 596, 786, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-2',
        name: 'page14-horizontal-gold-dot-2',
        type: 'custom',
        coordinates: [808, 596, 820, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-3',
        name: 'page14-horizontal-gold-dot-3',
        type: 'custom',
        coordinates: [841, 596, 853, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-4',
        name: 'page14-horizontal-gold-dot-4',
        type: 'custom',
        coordinates: [875, 596, 887, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-5',
        name: 'page14-horizontal-gold-dot-5',
        type: 'custom',
        coordinates: [909, 596, 921, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-6',
        name: 'page14-horizontal-gold-dot-6',
        type: 'custom',
        coordinates: [943, 596, 955, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-7',
        name: 'page14-horizontal-gold-dot-7',
        type: 'custom',
        coordinates: [976, 596, 988, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-gold-dot-8',
        name: 'page14-horizontal-gold-dot-8',
        type: 'custom',
        coordinates: [1010, 596, 1022, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page14-horizontal-line-unknown-pill',
        name: 'page14-horizontal-line-unknown-pill',
        type: 'custom',
        coordinates: [1044, 574, 1100, 630],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page14-one-button-vertical-gold-line',
        name: 'page14-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page14-horizontal-line-one-button',
        name: 'page14-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page9InteractionState;
              window.page9InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page14-tap-gif-one-button',
        name: 'page14-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage9InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-parcel-display-1',
        name: 'page14-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page14-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page14-parcel-display-2',
        name: 'page14-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page14-parcel-display-3',
        name: 'page14-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page14-parcel-display-4',
        name: 'page14-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page14-quantity-icon-milk',
        name: 'page14-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page14-quantity-icon-lollipop',
        name: 'page14-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page14-quantity-icon-biscuit',
        name: 'page14-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page14-tap-gif-quantity-icon-milk',
        name: 'page14-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage9InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-tap-gif-quantity-icon-lollipop',
        name: 'page14-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage9InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-tap-gif-quantity-icon-biscuit',
        name: 'page14-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage9InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-quantity-tile-milk',
        name: 'page14-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page9NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page14-quantity-label-lolipop',
        name: 'page14-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page9NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page14-quantity-label-packet',
        name: 'page14-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page9NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page14-axis-check-milk',
        name: 'page14-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis-check-lollipop',
        name: 'page14-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis-check-packets',
        name: 'page14-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-two-button-vertical-gold-line',
        name: 'page14-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page14-horizontal-line-two-button',
        name: 'page14-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page9InteractionState;
            window.page9InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page9InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page14-tap-gif-two-button',
        name: 'page14-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage9InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-axis2-check-milk',
        name: 'page14-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis2-check-lollipop',
        name: 'page14-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis2-check-packets',
        name: 'page14-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page14-three-button-vertical-gold-line',
        name: 'page14-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page14-horizontal-line-three-button',
        name: 'page14-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page14-tap-gif-three-button',
        name: 'page14-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage9InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-axis3-check-milk',
        name: 'page14-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis3-check-lollipop',
        name: 'page14-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis3-check-packets',
        name: 'page14-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page14-four-button-vertical-gold-line',
        name: 'page14-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page14-horizontal-line-four-button',
        name: 'page14-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page14-tap-gif-four-button',
        name: 'page14-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage9InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page14-axis4-check-milk',
        name: 'page14-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis4-check-lollipop',
        name: 'page14-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page14-axis4-check-packets',
        name: 'page14-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      //quiz panel
      {
        id: 'page14-quiz-panel',
        name: 'page14-quiz-panel',
        type: 'custom',
        coordinates: [1200, 150, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page14-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page14.quizPanel.quizSubType"),
          headerText: '',
          questionText: getI18nText("pages.page14.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '30gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // No question row (empty question)
          optionsRowHeight: 65, // With header/question 0%, options + feedback must sum to 100%
          feedbackRowHeight: 35,
          optionButtonWidth: 85,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '34gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page14.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page14-instruction-text',
        name: 'page14-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page14-instruction-text',
          text: getI18nText('pages.page14.footerInstruction'),
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
        id: 'page14-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false // Hidden on quiz pages initially, shown when quiz is completed
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
          enableOnEventFilter: { pageNumber: 14 }, // Only enable for page 8
          ignorePageCompletion: false, // Check page completion - button disabled until quiz is complete
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    15: [




      // Packing diagram (cloned from page 14)
      {
        id: 'page15-red-light-background',
        name: 'page15-red-light-background',
        type: 'custom',
        coordinates: [180, 25, 1400, 575], // Covers all equation components with padding, moved up 25gc
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
      // Axes chrome (same placement as page 9)
      {
        id: 'page15-vertical-blue-line',
        name: 'page15-vertical-blue-line',
        type: 'custom',
        coordinates: [450, 150, 454, 425],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page15-horizontal-gold-line',
        name: 'page15-horizontal-gold-line',
        type: 'custom',
        coordinates: [450, 425, 1368, 429],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      // Eight gold dots on horizontal axis: equal spacing from right of "4" (x=752) to left of "?" (x=1044); y on axis at 600
      {
        id: 'page15-horizontal-gold-dot-1',
        name: 'page15-horizontal-gold-dot-1',
        type: 'custom',
        coordinates: [949, 421, 961, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-2',
        name: 'page15-horizontal-gold-dot-2',
        type: 'custom',
        coordinates: [983, 421, 995, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-3',
        name: 'page15-horizontal-gold-dot-3',
        type: 'custom',
        coordinates: [1016, 421, 1028, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-4',
        name: 'page15-horizontal-gold-dot-4',
        type: 'custom',
        coordinates: [1050, 421, 1062, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-5',
        name: 'page15-horizontal-gold-dot-5',
        type: 'custom',
        coordinates: [1084, 421, 1096, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-6',
        name: 'page15-horizontal-gold-dot-6',
        type: 'custom',
        coordinates: [1118, 421, 1130, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-7',
        name: 'page15-horizontal-gold-dot-7',
        type: 'custom',
        coordinates: [1151, 421, 1163, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-gold-dot-8',
        name: 'page15-horizontal-gold-dot-8',
        type: 'custom',
        coordinates: [1185, 421, 1197, 433],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page15-horizontal-line-unknown-pill',
        name: 'page15-horizontal-line-unknown-pill',
        type: 'custom',
        coordinates: [1219, 399, 1275, 455],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page15-one-button-vertical-gold-line',
        name: 'page15-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [559, 150, 562, 425],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page15-horizontal-line-one-button',
        name: 'page15-horizontal-line-one-button',
        type: 'custom',
        coordinates: [532, 399, 588, 455],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page9InteractionState;
              window.page9InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      // {
      //   id: 'page15-tap-gif-one-button',
      //   name: 'page15-tap-gif-one-button',
      //   type: 'custom',
      //   coordinates: [553, 428, 613, 488],
      //   zIndex: '999',
      //   props: {
      //     componentType: 'TapGifComponent',
      //     imageSrc: 'assets/tap.gif',
      //     imageAlt: getI18nText('common.imageAltTap'),
      //     opacity: 0.75,
      //     hideInPage9InteractionStates: [
      //       'state-1-def',
      //       'state-1-milk',
      //       'state-1-lollipop',
      //       'state-1-packets',
      //       'state-2-def',
      //       'state-2-milk',
      //       'state-2-lollipop',
      //       'state-2-packets',
      //       'state-3-def',
      //       'state-3-reveal',
      //       'state-3-milk',
      //       'state-3-lollipop',
      //       'state-3-packets',
      //       'state-4-def',
      //       'state-4-reveal',
      //       'state-4-milk',
      //       'state-4-lollipop',
      //       'state-4-packets'
      //     ]
      //   }
      // },
      {
        id: 'page15-parcel-display-1',
        name: 'page15-parcel-display-1',
        type: 'custom',
        coordinates: [973, 50, 1188, 235],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page15-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page15-parcel-display-2',
        name: 'page15-parcel-display-2',
        type: 'custom',
        coordinates: [1178, 50, 1393, 235],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page15-parcel-display-3',
        name: 'page15-parcel-display-3',
        type: 'custom',
        coordinates: [973, 243, 1188, 425],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page15-parcel-display-4',
        name: 'page15-parcel-display-4',
        type: 'custom',
        coordinates: [1178, 243, 1393, 425],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page15-quantity-icon-milk',
        name: 'page15-quantity-icon-milk',
        type: 'container',
        coordinates: [465, 179, 509, 231],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page15-quantity-icon-lollipop',
        name: 'page15-quantity-icon-lollipop',
        type: 'container',
        coordinates: [465, 261, 509, 313],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page15-quantity-icon-biscuit',
        name: 'page15-quantity-icon-biscuit',
        type: 'container',
        coordinates: [465, 343, 509, 395],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page15-tap-gif-quantity-icon-milk',
        name: 'page15-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [217, 180, 264, 230],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage9InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page15-tap-gif-quantity-icon-lollipop',
        name: 'page15-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [217, 262, 264, 312],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage9InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page15-tap-gif-quantity-icon-biscuit',
        name: 'page15-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [217, 344, 264, 394],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage9InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page15-quantity-tile-milk',
        name: 'page15-quantity-tile-milk',
        type: 'custom',
        coordinates: [217, 182, 464, 229],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page9NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page15-quantity-label-lolipop',
        name: 'page15-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [217, 264, 464, 311],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page9NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page15-quantity-label-packet',
        name: 'page15-quantity-tile-packets',
        type: 'custom',
        coordinates: [217, 346, 464, 393],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page9NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page15-axis-check-milk',
        name: 'page15-axis-check-milk',
        type: 'custom',
        coordinates: [538, 183, 582, 228],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis-check-lollipop',
        name: 'page15-axis-check-lollipop',
        type: 'custom',
        coordinates: [538, 265, 582, 310],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis-check-packets',
        name: 'page15-axis-check-packets',
        type: 'custom',
        coordinates: [538, 347, 582, 392],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-two-button-vertical-gold-line',
        name: 'page15-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [672, 150, 675, 425],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page15-horizontal-line-two-button',
        name: 'page15-horizontal-line-two-button',
        type: 'custom',
        coordinates: [645, 399, 701, 455],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page9InteractionState;
            window.page9InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page9InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page15-tap-gif-two-button',
        name: 'page15-tap-gif-two-button',
        type: 'custom',
        coordinates: [666, 428, 726, 488],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage9InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page15-axis2-check-milk',
        name: 'page15-axis2-check-milk',
        type: 'custom',
        coordinates: [651, 183, 695, 228],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis2-check-lollipop',
        name: 'page15-axis2-check-lollipop',
        type: 'custom',
        coordinates: [651, 265, 695, 310],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis2-check-packets',
        name: 'page15-axis2-check-packets',
        type: 'custom',
        coordinates: [651, 347, 695, 392],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page15-three-button-vertical-gold-line',
        name: 'page15-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [785, 150, 788, 425],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page15-horizontal-line-three-button',
        name: 'page15-horizontal-line-three-button',
        type: 'custom',
        coordinates: [758, 399, 814, 455],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page15-tap-gif-three-button',
        name: 'page15-tap-gif-three-button',
        type: 'custom',
        coordinates: [779, 428, 839, 488],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage9InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page15-axis3-check-milk',
        name: 'page15-axis3-check-milk',
        type: 'custom',
        coordinates: [764, 183, 808, 228],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis3-check-lollipop',
        name: 'page15-axis3-check-lollipop',
        type: 'custom',
        coordinates: [764, 265, 808, 310],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis3-check-packets',
        name: 'page15-axis3-check-packets',
        type: 'custom',
        coordinates: [764, 347, 808, 392],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page15-four-button-vertical-gold-line',
        name: 'page15-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [898, 150, 901, 425],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page15-horizontal-line-four-button',
        name: 'page15-horizontal-line-four-button',
        type: 'custom',
        coordinates: [871, 399, 927, 455],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page15-tap-gif-four-button',
        name: 'page15-tap-gif-four-button',
        type: 'custom',
        coordinates: [892, 428, 952, 488],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage9InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page15-axis4-check-milk',
        name: 'page15-axis4-check-milk',
        type: 'custom',
        coordinates: [877, 183, 921, 228],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis4-check-lollipop',
        name: 'page15-axis4-check-lollipop',
        type: 'custom',
        coordinates: [877, 265, 921, 310],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page15-axis4-check-packets',
        name: 'page15-axis4-check-packets',
        type: 'custom',
        coordinates: [877, 347, 921, 392],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      // Black container with 70% opacity
      // {
      //   id: 'page15-black-container',
      //   name: 'black-container',
      //   type: 'custom',
      //   coordinates: [300, 20, 1300, 540], // Adjust coordinates as needed50
      //   zIndex: 40,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '', // Empty text, just for background
      //     backgroundColor: 'rgba(0, 0, 0, 0.4)', // 70% opacity black
      //     border: 'none',
      //     borderRadius: '12gc',
      //     textColor: '#ffffff',
      //     fontSize: '1gc',
      //     padding: '0gc'
      //   }
      // },
      // Information gathered text with checkmark 
      {
        id: 'page15-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [5, 620, 1595, 670], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page15.informationGathered", '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.'),
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
      // Information gathered text with checkmark 2
      {
        id: 'page15-information-gathered-text-2',
        name: 'page15-information-gathered-text-2',
        type: 'custom',
        coordinates: [5, 690, 1595, 740], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page15.informationGatheredTwo", '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.'),
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
        id: 'page15-next-steps-text',
        name: 'next-steps-text',
        type: 'custom',
        coordinates: [300, 760, 1300, 790], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page15.nextStep", 'Next - Steps required to find answer'),
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
      // Instruction Text - "Tap >> to identify all the required steps for the addition"
      {
        id: 'page15-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page15.footerInstruction',
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
      // Optimized Next button - Three Layer Structure
      {
        id: 'page15-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 23'));
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
          imageAlt: getI18nText('common.imageAltTap')
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 21'));
              }
            }
          }
        }
      },

    ],
    16: [
      // Black container background for equation (40% opacity)
      {
        id: 'page16-equation-background',
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
      //header text
      {
        id: 'page16-header-text',
        name: 'page16-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page16-header-text',
          text: getI18nText("pages.page16.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page16-red-light-background',
        name: 'page16-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1195, 815], // Covers all equation components with padding, moved up 25gc
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
      // Packing diagram (same chrome as page 14; six dots to match recap layout)
      // Axes chrome (same placement as page 9)
      {
        id: 'page16-vertical-blue-line',
        name: 'page16-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page16-horizontal-gold-line',
        name: 'page16-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1193, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      // Six gold dots: equal spacing from right of "4" (x=752) to left of "?" (x=1044)
      {
        id: 'page16-horizontal-gold-dot-1',
        name: 'page16-horizontal-gold-dot-1',
        type: 'custom',
        coordinates: [783, 596, 795, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page16-horizontal-gold-dot-2',
        name: 'page16-horizontal-gold-dot-2',
        type: 'custom',
        coordinates: [827, 596, 839, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page16-horizontal-gold-dot-3',
        name: 'page16-horizontal-gold-dot-3',
        type: 'custom',
        coordinates: [870, 596, 882, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page16-horizontal-gold-dot-4',
        name: 'page16-horizontal-gold-dot-4',
        type: 'custom',
        coordinates: [914, 596, 926, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page16-horizontal-gold-dot-5',
        name: 'page16-horizontal-gold-dot-5',
        type: 'custom',
        coordinates: [957, 596, 969, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page16-horizontal-gold-dot-6',
        name: 'page16-horizontal-gold-dot-6',
        type: 'custom',
        coordinates: [1001, 596, 1013, 608],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          display: 'flex'
        }
      },
      {
        id: 'page16-horizontal-line-unknown-pill',
        name: 'page16-horizontal-line-unknown-pill',
        type: 'custom',
        coordinates: [1044, 574, 1100, 630],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'flex'
        }
      },
      {
        id: 'page16-one-button-vertical-gold-line',
        name: 'page16-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page16-horizontal-line-one-button',
        name: 'page16-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page9InteractionState;
              window.page9InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      // {
      //   id: 'page16-tap-gif-one-button',
      //   name: 'page16-tap-gif-one-button',
      //   type: 'custom',
      //   coordinates: [378, 603, 438, 663],
      //   zIndex: '999',
      //   props: {
      //     componentType: 'TapGifComponent',
      //     imageSrc: 'assets/tap.gif',
      //     imageAlt: getI18nText('common.imageAltTap'),
      //     opacity: 0.75,
      //     hideInPage9InteractionStates: [
      //       'state-1-def',
      //       'state-1-milk',
      //       'state-1-lollipop',
      //       'state-1-packets',
      //       'state-2-def',
      //       'state-2-milk',
      //       'state-2-lollipop',
      //       'state-2-packets',
      //       'state-3-def',
      //       'state-3-reveal',
      //       'state-3-milk',
      //       'state-3-lollipop',
      //       'state-3-packets',
      //       'state-4-def',
      //       'state-4-reveal',
      //       'state-4-milk',
      //       'state-4-lollipop',
      //       'state-4-packets'
      //     ]
      //   }
      // },
      {
        id: 'page16-parcel-display-1',
        name: 'page16-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page16-parcel1-left-over-label',
            margins: { left: 9, top: -24, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '6gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page16-parcel-display-2',
        name: 'page16-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page16-parcel-display-3',
        name: 'page16-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page16-parcel-display-4',
        name: 'page16-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page16-quantity-icon-milk',
        name: 'page16-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page16-quantity-icon-lollipop',
        name: 'page16-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page16-quantity-icon-biscuit',
        name: 'page16-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page16-tap-gif-quantity-icon-milk',
        name: 'page16-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'] },
          hideInPage9InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page16-tap-gif-quantity-icon-lollipop',
        name: 'page16-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'] },
          hideInPage9InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page16-tap-gif-quantity-icon-biscuit',
        name: 'page16-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-lollipop', 'state-2-lollipop', 'state-3-lollipop', 'state-4-lollipop']
          },
          hideInPage9InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page16-quantity-tile-milk',
        name: 'page16-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal'],
          page9NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk'
          }
        }
      },
      {
        id: 'page16-quantity-label-lolipop',
        name: 'page16-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk'],
          page9NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop'
          }
        }
      },
      {
        id: 'page16-quantity-label-packet',
        name: 'page16-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop'
          ],
          page9NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets'
          }
        }
      },
      {
        id: 'page16-axis-check-milk',
        name: 'page16-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis-check-lollipop',
        name: 'page16-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis-check-packets',
        name: 'page16-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-two-button-vertical-gold-line',
        name: 'page16-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page16-horizontal-line-two-button',
        name: 'page16-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page9InteractionState;
            window.page9InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page9InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page16-tap-gif-two-button',
        name: 'page16-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage9InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page16-axis2-check-milk',
        name: 'page16-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis2-check-lollipop',
        name: 'page16-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis2-check-packets',
        name: 'page16-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page16-three-button-vertical-gold-line',
        name: 'page16-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page16-horizontal-line-three-button',
        name: 'page16-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page16-tap-gif-three-button',
        name: 'page16-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage9InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page16-axis3-check-milk',
        name: 'page16-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis3-check-lollipop',
        name: 'page16-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis3-check-packets',
        name: 'page16-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page16-four-button-vertical-gold-line',
        name: 'page16-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page16-horizontal-line-four-button',
        name: 'page16-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page16-tap-gif-four-button',
        name: 'page16-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage9InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets'
          ]
        }
      },
      {
        id: 'page16-axis4-check-milk',
        name: 'page16-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis4-check-lollipop',
        name: 'page16-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page16-axis4-check-packets',
        name: 'page16-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      //quiz panel
      {
        id: 'page16-quiz-panel',
        name: 'page16-quiz-panel',
        type: 'custom',
        coordinates: [1200, 150, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page16-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page16.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page16.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '30gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 30, // Feedback row: 15%
          optionButtonWidth: 65,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '38gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page16.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page16-instruction-text',
        name: 'page16-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page16-instruction-text',
          text: getI18nText('common.quizInstructionSelectOption'),
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
        id: 'page16-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false // Hidden on quiz pages initially, shown when quiz is completed
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
          enableOnEventFilter: { pageNumber: 16 }, // Only enable for page 8
          ignorePageCompletion: false, // Check page completion - button disabled until quiz is complete
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
     17: [
      // Black container background for equation (40% opacity)
      {
        id: 'page17-equation-background',
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
      //header text
      {
        id: 'page17-header-text',
        name: 'page17-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page17-header-text',
          text: getI18nText("pages.page17.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page17-red-light-background',
        name: 'page17-red-light-background',
        type: 'custom',
        coordinates: [5, 150, 1595, 675], // Covers all equation components with padding, moved up 25gc
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

      // --- Page 8: packing (same model as page 5); block shifted −100gc y from first placement ---
      {
        id: 'page17-vertical-blue-line',
        name: 'page17-vertical-blue-line',
        type: 'custom',
        coordinates: [275, 325, 279, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page17-horizontal-gold-line',
        name: 'page17-horizontal-gold-line',
        type: 'custom',
        coordinates: [275, 600, 1525, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page17-one-button-vertical-gold-line',
        name: 'page17-one-button-vertical-gold-line',
        type: 'custom',
        coordinates: [384, 325, 387, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page17-horizontal-line-one-button',
        name: 'page17-horizontal-line-one-button',
        type: 'custom',
        coordinates: [357, 574, 413, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '1',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const from = window.page9InteractionState;
              window.page9InteractionState = 'state-1-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-1-def', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page17-tap-gif-one-button',
        name: 'page17-tap-gif-one-button',
        type: 'custom',
        coordinates: [378, 603, 438, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          hideInPage9InteractionStates: [
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-parcel-display-1',
        name: 'page17-parcel-display-1',
        type: 'custom',
        coordinates: [798, 225, 1013, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverValue: 0,
          leftOverLabel: {
            id: 'page17-parcel1-left-over-label',
            margins: { left: 6, top: 1, right: 6, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '0gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page17-parcel-display-2',
        name: 'page17-parcel-display-2',
        type: 'custom',
        coordinates: [1003, 225, 1218, 410],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-parcel-display-3',
        name: 'page17-parcel-display-3',
        type: 'custom',
        coordinates: [798, 418, 1013, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-parcel-display-4',
        name: 'page17-parcel-display-4',
        type: 'custom',
        coordinates: [1003, 418, 1218, 600],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-quantity-icon-milk',
        name: 'page17-quantity-icon-milk',
        type: 'container',
        coordinates: [290, 354, 334, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page17-quantity-icon-lollipop',
        name: 'page17-quantity-icon-lollipop',
        type: 'container',
        coordinates: [290, 436, 334, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page17-quantity-icon-biscuit',
        name: 'page17-quantity-icon-biscuit',
        type: 'container',
        coordinates: [290, 518, 334, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default',
          hideInPage9InteractionStates: ['state-3-packets', 'state-4-packets']
        }
      },
      {
        id: 'page17-tap-gif-quantity-icon-milk',
        name: 'page17-tap-gif-quantity-icon-milk',
        type: 'custom',
        coordinates: [42, 355, 89, 405],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal', 'state-6-reveal']
          },
          hideInPage9InteractionStates: [
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-tap-gif-quantity-icon-lollipop',
        name: 'page17-tap-gif-quantity-icon-lollipop',
        type: 'custom',
        coordinates: [42, 437, 89, 487],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk', 'state-6-milk']
          },
          hideInPage9InteractionStates: [
            'state-1-lollipop',
            'state-1-packets',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-tap-gif-quantity-icon-biscuit',
        name: 'page17-tap-gif-quantity-icon-biscuit',
        type: 'custom',
        coordinates: [42, 519, 89, 569],
        zIndex: 55,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: {
            state: [
              'state-1-lollipop',
              'state-2-lollipop',
              'state-3-lollipop',
              'state-4-lollipop',
              'state-6-lollipop'
            ]
          },
          hideInPage9InteractionStates: [
            'state-1-packets',
            'state-2-packets',
            'state-3-packets',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-quantity-tile-milk',
        name: 'page17-quantity-tile-milk',
        type: 'custom',
        coordinates: [42, 357, 289, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-def', 'state-2-def', 'state-3-reveal', 'state-4-reveal', 'state-6-reveal'],
          page9NavigateToStateByInteractionState: {
            'state-1-def': 'state-1-milk',
            'state-2-def': 'state-2-milk',
            'state-3-reveal': 'state-3-milk',
            'state-4-reveal': 'state-4-milk',
            'state-6-reveal': 'state-6-milk'
          }
        }
      },
      {
        id: 'page17-quantity-label-lolipop',
        name: 'page17-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [42, 439, 289, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: ['state-1-milk', 'state-2-milk', 'state-3-milk', 'state-4-milk', 'state-6-milk'],
          page9NavigateToStateByInteractionState: {
            'state-1-milk': 'state-1-lollipop',
            'state-2-milk': 'state-2-lollipop',
            'state-3-milk': 'state-3-lollipop',
            'state-4-milk': 'state-4-lollipop',
            'state-6-milk': 'state-6-lollipop'
          }
        }
      },
      {
        id: 'page17-quantity-label-packet',
        name: 'page17-quantity-tile-packets',
        type: 'custom',
        coordinates: [42, 521, 289, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center',
          page9InteractiveInStates: [
            'state-1-lollipop',
            'state-2-lollipop',
            'state-3-lollipop',
            'state-4-lollipop',
            'state-6-lollipop'
          ],
          page9NavigateToStateByInteractionState: {
            'state-1-lollipop': 'state-1-packets',
            'state-2-lollipop': 'state-2-packets',
            'state-3-lollipop': 'state-3-packets',
            'state-4-lollipop': 'state-4-packets',
            'state-6-lollipop': 'state-6-packets'
          }
        }
      },
      {
        id: 'page17-axis-check-milk',
        name: 'page17-axis-check-milk',
        type: 'custom',
        coordinates: [363, 358, 407, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis-check-lollipop',
        name: 'page17-axis-check-lollipop',
        type: 'custom',
        coordinates: [363, 440, 407, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis-check-packets',
        name: 'page17-axis-check-packets',
        type: 'custom',
        coordinates: [363, 522, 407, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-two-button-vertical-gold-line',
        name: 'page17-two-button-vertical-gold-line',
        type: 'custom',
        coordinates: [497, 325, 500, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none'
        }
      },
      {
        id: 'page17-horizontal-line-two-button',
        name: 'page17-horizontal-line-two-button',
        type: 'custom',
        coordinates: [470, 574, 526, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '2',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const from = window.page9InteractionState;
            window.page9InteractionState = 'state-2-def';
            window.dispatchEvent(
              new CustomEvent('page9InteractionStateChange', {
                detail: { state: 'state-2-def', from }
              })
            );
          }
        }
      },
      {
        id: 'page17-tap-gif-two-button',
        name: 'page17-tap-gif-two-button',
        type: 'custom',
        coordinates: [491, 603, 551, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-1-packets' },
          hideInPage9InteractionStates: [
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-axis2-check-milk',
        name: 'page17-axis2-check-milk',
        type: 'custom',
        coordinates: [476, 358, 520, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis2-check-lollipop',
        name: 'page17-axis2-check-lollipop',
        type: 'custom',
        coordinates: [476, 440, 520, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis2-check-packets',
        name: 'page17-axis2-check-packets',
        type: 'custom',
        coordinates: [476, 522, 520, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page17-three-button-vertical-gold-line',
        name: 'page17-three-button-vertical-gold-line',
        type: 'custom',
        coordinates: [610, 325, 613, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-def', from } })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-3-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page17-horizontal-line-three-button',
        name: 'page17-horizontal-line-three-button',
        type: 'custom',
        coordinates: [583, 574, 639, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-2-packets') {
              window.page9InteractionState = 'state-3-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-def', from }
                })
              );
            } else if (cur === 'state-3-def') {
              window.page9InteractionState = 'state-3-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-3-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page17-tap-gif-three-button',
        name: 'page17-tap-gif-three-button',
        type: 'custom',
        coordinates: [604, 603, 664, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-2-packets', 'state-3-def'] },
          hideInPage9InteractionStates: [
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-axis3-check-milk',
        name: 'page17-axis3-check-milk',
        type: 'custom',
        coordinates: [589, 358, 633, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis3-check-lollipop',
        name: 'page17-axis3-check-lollipop',
        type: 'custom',
        coordinates: [589, 440, 633, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis3-check-packets',
        name: 'page17-axis3-check-packets',
        type: 'custom',
        coordinates: [589, 522, 633, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      {
        id: 'page17-four-button-vertical-gold-line',
        name: 'page17-four-button-vertical-gold-line',
        type: 'custom',
        coordinates: [723, 325, 726, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def', from } })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page17-horizontal-line-four-button',
        name: 'page17-horizontal-line-four-button',
        type: 'custom',
        coordinates: [696, 574, 752, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '4',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-3-packets') {
              window.page9InteractionState = 'state-4-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-def', from }
                })
              );
            } else if (cur === 'state-4-def') {
              window.page9InteractionState = 'state-4-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-4-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page17-tap-gif-four-button',
        name: 'page17-tap-gif-four-button',
        type: 'custom',
        coordinates: [717, 603, 777, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-3-packets', 'state-4-def'] },
          hideInPage9InteractionStates: [
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-axis4-check-milk',
        name: 'page17-axis4-check-milk',
        type: 'custom',
        coordinates: [702, 358, 746, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2715',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis4-check-lollipop',
        name: 'page17-axis4-check-lollipop',
        type: 'custom',
        coordinates: [702, 440, 746, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis4-check-packets',
        name: 'page17-axis4-check-packets',
        type: 'custom',
        coordinates: [702, 522, 746, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      // --- Container 6: vertical gold line, "6" button, tap gif, axis-6 checks, 6 parcel displays (page 17 only) ---
      {
        id: 'page17-six-button-vertical-gold-line',
        name: 'page17-six-button-vertical-gold-line',
        type: 'custom',
        coordinates: [836, 325, 839, 600],
        zIndex: 57,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-4-packets') {
              window.page9InteractionState = 'state-6-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-def', from } })
              );
            } else if (cur === 'state-6-def') {
              window.page9InteractionState = 'state-6-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-reveal', from } })
              );
            }
          }
        }
      },
      {
        id: 'page17-horizontal-line-six-button',
        name: 'page17-horizontal-line-six-button',
        type: 'custom',
        coordinates: [809, 574, 865, 630],
        zIndex: 58,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '6',
          fontSize: '28gc',
          textColor: '#000000',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '8gc',
          padding: '4gc',
          textAlign: 'center',
          display: 'none',
          cursor: 'pointer',
          onClick: () => {
            if (typeof window === 'undefined') return;
            const cur = window.page9InteractionState;
            const from = cur;
            if (cur === 'state-4-packets') {
              window.page9InteractionState = 'state-6-def';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-6-def', from }
                })
              );
            } else if (cur === 'state-6-def') {
              window.page9InteractionState = 'state-6-reveal';
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: 'state-6-reveal', from }
                })
              );
            }
          }
        }
      },
      {
        id: 'page17-tap-gif-six-button',
        name: 'page17-tap-gif-six-button',
        type: 'custom',
        coordinates: [830, 603, 890, 663],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          opacity: 0.75,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: ['state-4-packets', 'state-6-def'] },
          hideInPage9InteractionStates: [
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop',
            'state-6-packets'
          ]
        }
      },
      {
        id: 'page17-axis6-check-milk',
        name: 'page17-axis6-check-milk',
        type: 'custom',
        coordinates: [815, 358, 859, 403],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis6-check-lollipop',
        name: 'page17-axis6-check-lollipop',
        type: 'custom',
        coordinates: [815, 440, 859, 485],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      {
        id: 'page17-axis6-check-packets',
        name: 'page17-axis6-check-packets',
        type: 'custom',
        coordinates: [815, 522, 859, 567],
        zIndex: 59,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '\u2713',
          fontSize: '28gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: 'none',
          borderRadius: '50%',
          padding: '0gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      // 6 parcel displays: 3 columns x 2 rows (larger cells: ~1.28× prior span, whole grid scaled from centre)
      {
        id: 'page17-parcel-display-6a',
        name: 'page17-parcel-display-6a',
        type: 'custom',
        coordinates: [938, 174, 1137, 432],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          hideLeftOverInPage5States: [
            'default',
            'state-1-def',
            'state-1-milk',
            'state-1-lollipop',
            'state-1-packets',
            'state-2-def',
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            'state-4-def',
            'state-4-reveal',
            'state-4-milk',
            'state-4-lollipop',
            'state-4-packets',
            'state-6-def',
            'state-6-reveal',
            'state-6-milk',
            'state-6-lollipop'
          ],
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ],
          leftOverLabel: {
            id: 'page17-parcel-display-6a-left-over-label',
            staticTextOnly: true,
            text: getI18nText('pages.page17.leftOverLine'),
            textI18nKey: 'pages.page17.leftOverLine',
            textI18nFallback: getI18nText('pages.page17.leftOverLine'),
            margins: { left: 9, top: 1, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '0gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page17-parcel-display-6b',
        name: 'page17-parcel-display-6b',
        type: 'custom',
        coordinates: [1137, 174, 1336, 432],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-parcel-display-6c',
        name: 'page17-parcel-display-6c',
        type: 'custom',
        coordinates: [1336, 174, 1535, 432],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-parcel-display-6d',
        name: 'page17-parcel-display-6d',
        type: 'custom',
        coordinates: [938, 367, 1137, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-parcel-display-6e',
        name: 'page17-parcel-display-6e',
        type: 'custom',
        coordinates: [1137, 367, 1336, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },
      {
        id: 'page17-parcel-display-6f',
        name: 'page17-parcel-display-6f',
        type: 'custom',
        coordinates: [1336, 367, 1535, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: false,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'lollipop', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true },
            { imageName: 'biscuit', number: 6, isVisible: true }
          ]
        }
      },

      // Incorrect-style feedback (salmon): visible in state-4-packets after packet step
      {
        id: 'page17-packets-equal-feedback',
        name: 'page17-packets-equal-feedback',
        type: 'custom',
        coordinates: [5, 685, 1595, 810],
        zIndex: 63,
        props: {
          componentType: 'TeacherNoteComponent',
          id: 'page17-packets-equal-feedback',
          textI18nKey: 'pages.page9.feedbackFourParcelsMilkLeftover',
          textI18nFallback: getI18nText('pages.page9.feedbackFourParcelsMilkLeftover'),
          text: getI18nText('pages.page9.feedbackFourParcelsMilkLeftover'),
          fontSize: '32gc',
          textColor: '#ffffff',
          backgroundColor: 'var(--color-salmon, #FA8072)',
          border: '4gc dashed var(--color-salmon-dark, #E9967A)',
          borderRadius: '12gc',
          padding: '14gc',
          textAlign: 'center',
          display: 'none'
        }
      },
      // Success feedback for 6 parcels (page 17 only)
      {
        id: 'page17-six-parcels-feedback',
        name: 'page17-six-parcels-feedback',
        type: 'custom',
        coordinates: [5, 685, 1595, 810],
        zIndex: 63,
        props: {
          componentType: 'TeacherNoteComponent',
          id: 'page17-six-parcels-feedback',
          textI18nKey: 'pages.page17.feedbackSixParcelsSuccess',
          textI18nFallback: getI18nText('pages.page17.feedbackSixParcelsSuccess'),
          text: getI18nText('pages.page17.feedbackSixParcelsSuccess'),
          fontSize: '32gc',
          textColor: '#ffffff',
          backgroundColor: '#22C55E',
          border: '4gc solid #16A34A',
          borderRadius: '12gc',
          padding: '14gc',
          textAlign: 'center',
          display: 'none'
        }
      },

      // Instruction Text — footer copy from interaction state; after quiz uses pages.page17.instructionAfterQuiz
      {
        id: 'page17-instruction-text',
        name: 'page17-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page17-instruction-text',
          text: getI18nText('pages.page17.footerInstruction'),
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

      // Tap Animation GIF - hidden until page 17 interaction "quiz" completes (state-6-packets)
      {
        id: 'page17-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          initialVisible: false,
          showOnEvent: 'page9InteractionStateChange',
          showOnEventFilter: { state: 'state-6-packets' }
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page17-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 17 },
          get text() {
            const pageNumber = extractPageNumberFromId('page17-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page17-next-button');
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
        id: 'page17-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 17 },
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 7'));
              }
            }
          }
        }
      },


    ],
    18: [
      {
        id: 'page18-equation-background',
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
      //header text
      {
        id: 'page18-header-text',
        name: 'page18-header-text',
        type: 'custom',
        coordinates: [5, 10, 1595, 140], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page18-header-text',
          text: getI18nText("pages.page18.headerText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          allowHtml: true
        }
      },
      //red light black background
      {
        id: 'page18-red-light-background',
        name: 'page18-red-light-background',
        type: 'custom',
        coordinates: [505, 150, 1595, 815], // Covers all equation components with padding, moved up 25gc
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

      //textButton1
      {
        id: 'page18-text-button-1-text',
        name: 'page18-text-button-1-text',
        type: 'custom',
        coordinates: [30, 280, 500, 310], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page18-text-button-1-text',
          text: getI18nText("pages.page18.textButton1"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'left',
          lineHeight: '1.5',
          allowHtml: true
        }
      },
      //textButton2
      {
        id: 'page18-text-button-2-text',
        name: 'page18-text-button-2-text',
        type: 'custom',
        coordinates: [30, 420, 500, 480], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page18-text-button-2-text',
          text: getI18nText("pages.page18.textButton2"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'left',
          lineHeight: '1.5',
          allowHtml: true
        }
      },
      //textButton3
      {
        id: 'page18-text-button-3-text',
        name: 'page18-text-button-3-text',
        type: 'custom',
        coordinates: [30, 630, 500, 680], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page18-text-button-3-text',
          text: getI18nText("pages.page18.textButton3"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'left',
          lineHeight: '1.5',
          allowHtml: true
        }
      },

      // Tap hints beside textButton1–3 (equal groups / left over / maximum number)
      {
        id: 'page18-tap-gif-text-button-1',
        name: 'page18-tap-gif-text-button-1',
        type: 'custom',
        coordinates: getPage18TapGifTextButtonCoordinates(0),
        zIndex: 58,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: true
        }
      },
      {
        id: 'page18-tap-gif-text-button-2',
        name: 'page18-tap-gif-text-button-2',
        type: 'custom',
        coordinates: getPage18TapGifTextButtonCoordinates(1),
        zIndex: 58,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false
        }
      },
      {
        id: 'page18-tap-gif-text-button-3',
        name: 'page18-tap-gif-text-button-3',
        type: 'custom',
        coordinates: getPage18TapGifTextButtonCoordinates(2),
        zIndex: 58,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.imageAltTap'),
          opacity: 0.75,
          pointerEvents: 'none',
          initialVisible: false
        }
      },

      // --- Packing diagram: blue vertical, gold horizontal, quantity icons/labels (static, no interaction) ---
      {
        id: 'page18-vertical-blue-line',
        name: 'page18-vertical-blue-line',
        type: 'custom',
        coordinates: [815, 325, 819, 600],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#3B82F6',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      {
        id: 'page18-horizontal-gold-line',
        name: 'page18-horizontal-gold-line',
        type: 'custom',
        coordinates: [815, 600, 1733, 604],
        zIndex: 56,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#F59E0B',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Quantity icons
      {
        id: 'page18-quantity-icon-milk',
        name: 'page18-quantity-icon-milk',
        type: 'container',
        coordinates: [830, 354, 874, 406],
        zIndex: 57,
        props: {
          imageSrc: 'assets/milk.png',
          imageAlt: 'Milk bottle',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page18-quantity-icon-lollipop',
        name: 'page18-quantity-icon-lollipop',
        type: 'container',
        coordinates: [830, 436, 874, 488],
        zIndex: 57,
        props: {
          imageSrc: 'assets/lollipop.png',
          imageAlt: 'Lollipop',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },
      {
        id: 'page18-quantity-icon-biscuit',
        name: 'page18-quantity-icon-biscuit',
        type: 'container',
        coordinates: [830, 518, 874, 570],
        zIndex: 57,
        props: {
          imageSrc: 'assets/biscuit.png',
          imageAlt: 'Biscuit packet',
          pointerEvents: 'none',
          cursor: 'default'
        }
      },

      // Quantity labels (static, no interaction)
      {
        id: 'page18-quantity-tile-milk',
        name: 'page18-quantity-tile-milk',
        type: 'custom',
        coordinates: [582, 357, 829, 404],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelMilk',
          textI18nFallback: getI18nText('pages.page5.quantityLabelMilk'),
          text: getI18nText('pages.page5.quantityLabelMilk'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(34, 211, 238, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page18-quantity-tile-lollipops',
        name: 'page18-quantity-tile-lollipops',
        type: 'custom',
        coordinates: [582, 439, 829, 486],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelLollipops',
          textI18nFallback: getI18nText('pages.page5.quantityLabelLollipops'),
          text: getI18nText('pages.page5.quantityLabelLollipops'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(244, 114, 182, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },
      {
        id: 'page18-quantity-tile-packets',
        name: 'page18-quantity-tile-packets',
        type: 'custom',
        coordinates: [582, 521, 829, 568],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          textI18nKey: 'pages.page5.quantityLabelPackets',
          textI18nFallback: getI18nText('pages.page5.quantityLabelPackets'),
          text: getI18nText('pages.page5.quantityLabelPackets'),
          fontSize: '24gc',
          textColor: '#ffffff',
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          border: 'none',
          borderRadius: '10gc',
          padding: '8gc',
          textAlign: 'center'
        }
      },

      // 6 parcel displays (3 columns x 2 rows) - always fully visible with all items
      {
        id: 'page18-parcel-display-6a',
        name: 'page18-parcel-display-6a',
        type: 'custom',
        coordinates: [938, 174, 1137, 432],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: true,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          hideLeftOverInPage5States: ['state-18-def', 'state-18-equal'],
          parcelRows: [
            { imageName: 'milk', number: 1, isVisible: true },
            { imageName: 'lollipop', number: 2, isVisible: true },
            { imageName: 'biscuit', number: 4, isVisible: true }
          ],
          leftOverLabel: {
            id: 'page18-parcel-display-6a-left-over-label',
            staticTextOnly: true,
            text: getI18nText('pages.page17.leftOverLine'),
            textI18nKey: 'pages.page17.leftOverLine',
            textI18nFallback: getI18nText('pages.page17.leftOverLine'),
            margins: { left: 9, top: 1, right: 9, height: 44 },
            fontSize: '24gc',
            textColor: '#ffffff',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8gc',
            padding: '0gc',
            textAlign: 'center'
          }
        }
      },
      {
        id: 'page18-parcel-display-6b',
        name: 'page18-parcel-display-6b',
        type: 'custom',
        coordinates: [1137, 174, 1336, 432],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: true,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 1, isVisible: true },
            { imageName: 'lollipop', number: 2, isVisible: true },
            { imageName: 'biscuit', number: 4, isVisible: true }
          ]
        }
      },
      {
        id: 'page18-parcel-display-6c',
        name: 'page18-parcel-display-6c',
        type: 'custom',
        coordinates: [1336, 174, 1535, 432],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: true,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 1, isVisible: true },
            { imageName: 'lollipop', number: 2, isVisible: true },
            { imageName: 'biscuit', number: 4, isVisible: true }
          ]
        }
      },
      {
        id: 'page18-parcel-display-6d',
        name: 'page18-parcel-display-6d',
        type: 'custom',
        coordinates: [938, 367, 1137, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: true,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 1, isVisible: true },
            { imageName: 'lollipop', number: 2, isVisible: true },
            { imageName: 'biscuit', number: 4, isVisible: true }
          ]
        }
      },
      {
        id: 'page18-parcel-display-6e',
        name: 'page18-parcel-display-6e',
        type: 'custom',
        coordinates: [1137, 367, 1336, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: true,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 1, isVisible: true },
            { imageName: 'lollipop', number: 2, isVisible: true },
            { imageName: 'biscuit', number: 4, isVisible: true }
          ]
        }
      },
      {
        id: 'page18-parcel-display-6f',
        name: 'page18-parcel-display-6f',
        type: 'custom',
        coordinates: [1336, 367, 1535, 624],
        zIndex: 61,
        props: {
          componentType: 'ParcelDisplayComponent',
          visible: true,
          boxImageSrc: 'assets/box.png',
          boxImageAlt: getI18nText('common.parcelBoxAlt'),
          innerMargins: { left: 34, top: 46, right: 49, bottom: 74 },
          parcelRows: [
            { imageName: 'milk', number: 1, isVisible: true },
            { imageName: 'lollipop', number: 2, isVisible: true },
            { imageName: 'biscuit', number: 4, isVisible: true }
          ]
        }
      },

      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page18-instruction-text',
        name: 'page18-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page18-instruction-text',
          text: getI18nText('pages.page18.footerInstruction'),
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

      // // Tap hint beside Start Over (shown when state-18-max; see TapGifComponent page18-tap-animation listener)
      // {
      //   id: 'page18-tap-animation',
      //   name: 'tap-animation',
      //   type: 'custom',
      //   coordinates: [1450, 840, 1500, 890],
      //   zIndex: '999',
      //   props: {
      //     componentType: 'TapGifComponent',
      //     imageSrc: 'assets/tap.gif',
      //     imageAlt: getI18nText('common.imageAltTap'),
      //     initialVisible: false,
      //     opacity: 0.75,
      //     pointerEvents: 'none'
      //   }
      // },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page18-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Enabled after all three GCF text rows (state-18-max)
          enableOnEvent: 'page18InteractionStateChange',
          enableOnEventFilter: { state: 'state-18-max' },

          ignorePageCompletion: true, // GCF taps are not quiz completion
          fontSize: '28gc',
          get text() {
            return getI18nText('buttons.startOver', 'Start Over');
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            if (typeof window === 'undefined') return;
            const goPage1 = () => {
              console.log('🔄 [Next Button] Page 18 Start Over → page 1 + full reset');
              if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              } else if (window.navigateToPage) {
                window.navigateToPage(1);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
              }
            };
            if (typeof window.advanceToNextQuestion === 'function') {
              const p = window.advanceToNextQuestion();
              if (p && typeof p.then === 'function') {
                p.then(goPage1).catch(goPage1);
              } else {
                goPage1();
              }
            } else {
              goPage1();
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page18-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page18-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page18-previous-button');
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

    // Page 5 interaction (default on load; reset when navigating to page 5)
    window.page5InteractionState = 'default';
    window.page8InteractionState = 'state-3-def';
    window.dispatchEvent(
      new CustomEvent('page8InteractionStateChange', { detail: { state: 'state-3-def' } })
    );
    const startPageRaw =
      typeof window.APP_CONFIG !== 'undefined' && window.APP_CONFIG != null
        ? window.APP_CONFIG.START_PAGE
        : null;
    const startPageNum =
      startPageRaw != null && startPageRaw !== '' ? parseInt(String(startPageRaw), 10) : NaN;
    if (startPageNum === 17 && !Number.isNaN(startPageNum)) {
      window.page9InteractionState = 'state-6-def';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-6-def' } })
      );
    } else {
      window.page9InteractionState = 'state-4-def';
      window.dispatchEvent(
        new CustomEvent('page9InteractionStateChange', { detail: { state: 'state-4-def' } })
      );
    }
    window.page11InteractionState = 'state-4-def';
    window.dispatchEvent(
      new CustomEvent('page11InteractionStateChange', { detail: { state: 'state-4-def' } })
    );
    window.page12InteractionState = 'state-4-def';
    window.dispatchEvent(
      new CustomEvent('page12InteractionStateChange', { detail: { state: 'state-4-def' } })
    );
    window.page13InteractionState = 'state-4-def';
    window.dispatchEvent(
      new CustomEvent('page13InteractionStateChange', { detail: { state: 'state-4-def' } })
    );

    window.page18InteractionState = 'state-18-def';
    window.dispatchEvent(
      new CustomEvent('page18InteractionStateChange', { detail: { state: 'state-18-def' } })
    );

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
