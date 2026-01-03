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
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
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
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
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
      //bika ambon image one
      {
        id: 'page2-bika-ambon-image-one',
        name: 'page2-bika-ambon-image-one',
        type: 'custom',
        coordinates: [130, 350, 430, 750], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-bika-ambon-image-one',
          elementName: 'page2-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 8/5 kg text
      {
        id: 'page2-bika-ambon-image-one-text',
        name: 'page2-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [205, 730, 355, 760], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
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
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
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
      //bika ambon image one
      {
        id: 'page3-bika-ambon-image-one',
        name: 'page3-bika-ambon-image-one',
        type: 'custom',
        coordinates: [130, 350, 430, 750], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-bika-ambon-image-one',
          elementName: 'page3-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 8/5 kg text
      {
        id: 'page3-bika-ambon-image-one-text',
        name: 'page3-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [205, 730, 355, 760], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //bika-ambon-image-two
      {
        id: 'page3-bika-ambon-image-two',
        name: 'page3-bika-ambon-image-two',
        type: 'custom',
        coordinates: [700, 380, 1000, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-bika-ambon-image-two',
          elementName: 'page3-bika-ambon-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon38.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //3 5/8 kg text
      {
        id: 'page3-bika-ambon-image-two-text',
        name: 'page3-bika-ambon-image-two-text',
        type: 'custom',
        coordinates: [750, 735, 950, 765], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{5}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // amount beni give his grandmother
      {
        id: 'page3-amount-beni-give',
        name: 'page3-amount-beni-give',
        type: 'custom',
        coordinates: [420, 450, 720, 500], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountBeniGiveToGrandMother',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#70ACC7',
          fontSize: '26gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(-25deg)'
        }
      },
      //blue single head arrow
      {
        id: 'page3-blue-single-head-arrow',
        name: 'page3-blue-single-head-arrow',
        type: 'custom',
        coordinates: [480, 480, 710, 530], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-blue-single-head-arrow',
          elementName: 'page3-blue-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadBlueArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(-25deg)'
            }
          ],

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
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
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
      //bika ambon image one
      {
        id: 'page4-bika-ambon-image-one',
        name: 'page4-bika-ambon-image-one',
        type: 'custom',
        coordinates: [130, 350, 430, 750], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-bika-ambon-image-one',
          elementName: 'page4-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 8/5 kg text
      {
        id: 'page4-bika-ambon-image-one-text',
        name: 'page4-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [205, 730, 355, 760], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //bika-ambon-image-two
      {
        id: 'page4-bika-ambon-image-two',
        name: 'page4-bika-ambon-image-two',
        type: 'custom',
        coordinates: [700, 380, 1000, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-bika-ambon-image-two',
          elementName: 'page4-bika-ambon-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon38.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //3 5/8 kg text
      {
        id: 'page4-bika-ambon-image-two-text',
        name: 'page4-bika-ambon-image-two-text',
        type: 'custom',
        coordinates: [750, 735, 950, 765], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{5}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // amount beni give his grandmother
      {
        id: 'page4-amount-beni-give',
        name: 'page4-amount-beni-give',
        type: 'custom',
        coordinates: [420, 450, 720, 500], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountBeniGiveToGrandMother',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#70ACC7',
          fontSize: '26gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(-25deg)'
        }
      },
      //blue single head arrow
      {
        id: 'page4-blue-single-head-arrow',
        name: 'page4-blue-single-head-arrow',
        type: 'custom',
        coordinates: [480, 480, 710, 530], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-blue-single-head-arrow',
          elementName: 'page4-blue-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadBlueArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(-25deg)'
            }
          ],

        }
      },
      // amount of bika
      {
        id: 'page4-amount-of-bika',
        name: 'page4-amount-of-bika',
        type: 'custom',
        coordinates: [400, 620, 700, 670], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountOfBika',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '26gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(35deg)'
        }
      },
      //salmon single head arrow
      {
        id: 'page4-salmon-single-head-arrow',
        name: 'page4-salmon-single-head-arrow',
        type: 'custom',
        coordinates: [400, 650, 670, 700], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-salmon-single-head-arrow',
          elementName: 'page4-salmon-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadSalmonArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(35deg)'
            }
          ],

        }
      },
      //? mark text
      {
        id: 'page4-question-mark-text',
        name: 'page4-question-mark-text',
        type: 'custom',
        coordinates: [670, 730, 720, 760], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283', // Teal color to match the arrow
          fontSize: '70gc',
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
        coordinates: [5, 100, 1245, 440], // Adjust coordinates as needed
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

      // White container with 30% opacity
      {
        id: 'page5-white-container',
        name: 'white-container',
        type: 'custom',
        coordinates: [1250, 100, 1575, 800], // Adjust coordinates as needed
        zIndex: 40,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // 30% opacity white
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Instruction Text - "Drag the correct buttons to the correct spot in the sentence"
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
            'Drag the correct buttons to the correct spot in the sentence'
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

      //bika ambon image one
      {
        id: 'page5-bika-ambon-image-one',
        name: 'page5-bika-ambon-image-one',
        type: 'custom',
        coordinates: [200, 120, 510, 360], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-bika-ambon-image-one',
          elementName: 'page5-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 8/5 kg text
      {
        id: 'page5-bika-ambon-image-one-text',
        name: 'page5-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [280, 380, 430, 410], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //bika-ambon-image-two
      {
        id: 'page5-bika-ambon-image-two',
        name: 'page5-bika-ambon-image-two',
        type: 'custom',
        coordinates: [750, 120, 1050, 360], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-bika-ambon-image-two',
          elementName: 'page5-bika-ambon-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon38.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //3 5/8 kg text
      {
        id: 'page5-bika-ambon-image-two-text',
        name: 'page5-bika-ambon-image-two-text',
        type: 'custom',
        coordinates: [800, 380, 1000, 410], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{5}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // amount beni give his grandmother
      {
        id: 'page5-amount-beni-give',
        name: 'page5-amount-beni-give',
        type: 'custom',
        coordinates: [480, 160, 780, 210], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountBeniGiveToGrandMother',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#70ACC7',
          fontSize: '24gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(-25deg)'
        }
      },
      //blue single head arrow
      {
        id: 'page5-blue-single-head-arrow',
        name: 'page5-blue-single-head-arrow',
        type: 'custom',
        coordinates: [550, 195, 750, 225], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-blue-single-head-arrow',
          elementName: 'page5-blue-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadBlueArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(-25deg)'
            }
          ],

        }
      },
      // amount of bika
      {
        id: 'page5-amount-of-bika',
        name: 'page5-amount-of-bika',
        type: 'custom',
        coordinates: [450, 295, 750, 355], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountOfBika',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '24gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(35deg)'
        }
      },
      //salmon single head arrow
      {
        id: 'page5-salmon-single-head-arrow',
        name: 'page5-salmon-single-head-arrow',
        type: 'custom',
        coordinates: [475, 335, 710, 370], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-salmon-single-head-arrow',
          elementName: 'page5-salmon-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadSalmonArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(35deg)'
            }
          ],

        }
      },
      //? mark text
      {
        id: 'page5-question-mark-text',
        name: 'page5-question-mark-text',
        type: 'custom',
        coordinates: [700, 380, 750, 410], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283', // Teal color to match the arrow
          fontSize: '70gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Button "total weight" - Pinkish-purple with light pink border
      {
        id: 'page5-yohana-to-lucas-button',
        name: 'yohana-to-lucas-button',
        type: 'custom',
        coordinates: [175, 500, 350, 600], // Positioned below houses, moved down by 75gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", ""),
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
        coordinates: [400, 520, 460, 580], // Same height as box 4 (575-475=100gc), moved down by 75gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // Fill Blanks Component for page 7 - 5 boxes (blanks) and draggable buttons
      {
        id: 'page5-fill-blanks',
        name: 'page5-fill-blanks-component',
        type: 'custom',
        coordinates: [25, 400, 1250, 600], // Covering the area with the 5 boxes
        zIndex: 550,
        props: {
          componentType: 'FillBlanksComponent',
          get blanks() {
            return [
              // 5 boxes matching the style: dark grey background with light beige dashed border
              // Heights increased by 10%, centered vertically
              // blank1 -> box1: larger box, immediately right of equals (height: 100 -> 110)
              { id: 'blank1', coordinate: [500, 500, 700, 600], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
              // blank2 -> box2: smaller box, to the right of first with gap (height: 60 -> 66)
              { id: 'blank2', coordinate: [730, 520, 800, 580], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
              // blank3 -> box3: larger box, similar to first, to the right of second with gap (height: 100 -> 110)
              { id: 'blank3', coordinate: [830, 500, 1030, 600], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
            ];
          },
          blankBorderWidth: '3gc',
          blankBorderColor: '#F5E6D3', // Light beige border to match boxes
          blankBorderType: 'dashed',
          blankBorderRadius: '14gc', // Border radius set to 14gc
          blankBackgroundColor: '#4A5568', // Dark grey background to match boxes
          blankFontSize: '24gc', // Same size as option button
          blankFontColor: '#000000', // Black text to match option button
          optionsContainerCoordinates: [1100, 260, 1580, 700], // Positioned where information panel was (right side)
          optionsBorderWidth: '0gc',
          optionsBorderColor: 'transparent',
          optionsBorderType: 'solid',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: '', // Instruction text removed
          optionContainerInstructionTextColor: '#ffffff', // White text for instruction
          optionButtonColor: '#FFA500', // Orange background for buttons
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#000000', // Black text
          optionButtonLayoutMode: 'manual', // Use manual layout with coordinates
          optionsRows: 3, // Not used in manual mode, but kept for reference
          optionsColumns: 4, // Not used in manual mode, but kept for reference
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: false, // Disable feedback text display on page 7
          mode: 'DND',
          options: [
            // Row 1: Komang to Yohana (top) - can be dropped into blank1, blank3, or blank5
            {
              id: 'opt1',
              text: getI18nText(
                'pages.page5.optionTextFillBlanks.optionOpt1Text',
                "Komang's house<br>to<br>Yohana's house"
              ),
              image: '',
              blankID: ['blank1', 'blank3'],
              feedbackText: getI18nText(
                'pages.page5.optionOpt1Feedback',
                'Correct! This is the distance from Komang to Yohana house.'
              ),
              coordinate: [1295, 250, 1520, 385]
            }, // Moved up by 150gc
            // Row 2: Yohana to Lucas - can be dropped into blank1, blank3, or blank5
            {
              id: 'opt2',
              text: getI18nText(
                'pages.page5.optionTextFillBlanks.optionOpt2Text',
                "Yohana's house<br>to<br>Lukas' house"
              ),
              image: '',
              blankID: ['blank1', 'blank3'],
              feedbackText: getI18nText(
                'pages.page5.optionOpt2Feedback',
                'Correct! This is the distance from Yohana to Lukas house.'
              ),
              coordinate: [1295, 395, 1520, 520]
            }, // Moved up by 150gc
            // Row 3: Komang's house width - can be dropped into blank1, blank3, or blank5
            {
              id: 'opt3',
              text: '+',
              image: '',
              blankID: [],
              feedbackText: getI18nText(
                'pages.page5.optionPlusCorrectFeedback',
                'Correct!'
              ),
              coordinate: [1320, 540, 1395, 625]
            }, // 75x75 square, moved up by 150gc
            {
              id: 'opt4',
              text: '-',
              image: '',
              blankID: ['blank2'],
              feedbackText: getI18nText(
                'pages.page5.optionMinusNotNeededFeedback',
                'This operator is not needed here.'
              ),
              coordinate: [1420, 540, 1495, 625]
            },
          ],
          impFormulae: []
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page

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
          imageAlt: 'Tap',
          initialVisible: false
        }
      },

      // Second Tap Animation GIF - near first blank box
      {
        id: 'page5-tap-animation-2',
        name: 'tap-animation-2',
        type: 'custom',
        coordinates: [1250, 350, 1300, 400],
        zIndex: '1001',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          opacity: 0.5,
          imageAlt: 'Tap',
          alwaysShow: true // Show regardless of page completion status
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 6'));
              }
            }
          }
        }
      },

    ],
    6: [

      // Header Text - "Build a mathematical sentence for the given scene"
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
        id: 'page6-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [5, 100, 1245, 440], // Adjust coordinates as needed
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

      // White container with 30% opacity
      {
        id: 'page6-white-container',
        name: 'white-container',
        type: 'custom',
        coordinates: [1250, 100, 1575, 800], // Adjust coordinates as needed
        zIndex: 40,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page6.fractionAddition"), // Empty text, just for background
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // 30% opacity white
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc'
        }
      },

      // Instruction Text - "Drag the correct buttons to the correct spot in the sentence"
      {
        id: 'page6-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page6.footerInstruction',
            'Drag the correct buttons to the correct spot in the sentence'
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

      //bika ambon image one
      {
        id: 'page6-bika-ambon-image-one',
        name: 'page6-bika-ambon-image-one',
        type: 'custom',
        coordinates: [200, 120, 510, 360], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-bika-ambon-image-one',
          elementName: 'page6-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 8/5 kg text
      {
        id: 'page6-bika-ambon-image-one-text',
        name: 'page6-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [280, 380, 430, 410], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //bika-ambon-image-two
      {
        id: 'page6-bika-ambon-image-two',
        name: 'page6-bika-ambon-image-two',
        type: 'custom',
        coordinates: [750, 120, 1050, 360], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-bika-ambon-image-two',
          elementName: 'page6-bika-ambon-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon38.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //3 5/8 kg text
      {
        id: 'page6-bika-ambon-image-two-text',
        name: 'page6-bika-ambon-image-two-text',
        type: 'custom',
        coordinates: [800, 380, 1000, 410], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{5}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // amount beni give his grandmother
      {
        id: 'page6-amount-beni-give',
        name: 'page6-amount-beni-give',
        type: 'custom',
        coordinates: [480, 160, 780, 210], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountBeniGiveToGrandMother',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#70ACC7',
          fontSize: '24gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(-25deg)'
        }
      },
      //blue single head arrow
      {
        id: 'page6-blue-single-head-arrow',
        name: 'page6-blue-single-head-arrow',
        type: 'custom',
        coordinates: [550, 195, 750, 225], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-blue-single-head-arrow',
          elementName: 'page6-blue-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadBlueArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(-25deg)'
            }
          ],

        }
      },
      // amount of bika
      {
        id: 'page6-amount-of-bika',
        name: 'page6-amount-of-bika',
        type: 'custom',
        coordinates: [450, 295, 750, 355], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountOfBika',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '24gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(35deg)'
        }
      },
      //salmon single head arrow
      {
        id: 'page6-salmon-single-head-arrow',
        name: 'page6-salmon-single-head-arrow',
        type: 'custom',
        coordinates: [475, 335, 710, 370], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-salmon-single-head-arrow',
          elementName: 'page6-salmon-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadSalmonArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(35deg)'
            }
          ],

        }
      },
      //? mark text
      {
        id: 'page6-question-mark-text',
        name: 'page6-question-mark-text',
        type: 'custom',
        coordinates: [700, 380, 750, 410], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283', // Teal color to match the arrow
          fontSize: '70gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Button "total weight" - Pinkish-purple with light pink border
      {
        id: 'page6-yohana-to-lucas-button',
        name: 'yohana-to-lucas-button',
        type: 'custom',
        coordinates: [175, 500, 350, 600], // Positioned below houses, moved down by 75gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", ""),
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
        id: 'page6-equals-sign-square',
        name: 'equals-sign-square',
        type: 'custom',
        coordinates: [400, 520, 460, 580], // Same height as box 4 (575-475=100gc), moved down by 75gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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


      // Tile 1: "1 1/2" - larger box, immediately right of equals
      {
        id: 'page6-tile-1',
        name: 'tile-1',
        type: 'custom',
        coordinates: [500, 500, 700, 600],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
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
        id: 'page6-tile-2',
        name: 'tile-2',
        type: 'custom',
        coordinates: [730, 520, 800, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
          backgroundColor: '#4A5568',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '5gc',
          textAlign: 'center'
        }
      },

      // Tile 3: "1/200" - larger box, to the right of second
      {
        id: 'page6-tile-3',
        name: 'tile-3',
        type: 'custom',
        coordinates: [830, 500, 1030, 600],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3 $\\frac{5}{8}$',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'center'
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
          imageAlt: 'Tap'
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 6'));
              }
            }
          }
        }
      },

    ],
    7: [

      // Header Text - "Build a mathematical sentence for the given scene"
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
        id: 'page7-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [350, 95, 1250, 415], // Adjust coordinates as needed50
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


      // Black container with 70% opacity
      {
        id: 'page7-black-container-2',
        name: 'black-container-2',
        type: 'custom',
        coordinates: [350, 450, 1250, 625], // Adjust coordinates as needed50
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
      //bika ambon image one
      {
        id: 'page7-bika-ambon-image-one',
        name: 'page7-bika-ambon-image-one',
        type: 'custom',
        coordinates: [370, 100, 680, 340], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-bika-ambon-image-one',
          elementName: 'page7-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 1/8 kg text
      {
        id: 'page7-bika-ambon-image-one-text',
        name: 'page7-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [450, 360, 600, 390], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //bika-ambon-image-two
      {
        id: 'page7-bika-ambon-image-two',
        name: 'page7-bika-ambon-image-two',
        type: 'custom',
        coordinates: [960, 100, 1260, 340], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-bika-ambon-image-two',
          elementName: 'page7-bika-ambon-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon38.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //3 5/8 kg text
      {
        id: 'page7-bika-ambon-image-two-text',
        name: 'page7-bika-ambon-image-two-text',
        type: 'custom',
        coordinates: [1010, 360, 1210, 390], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{5}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // amount beni give his grandmother
      {
        id: 'page7-amount-beni-give',
        name: 'page7-amount-beni-give',
        type: 'custom',
        coordinates: [660, 140, 960, 190], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountBeniGiveToGrandMother',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#70ACC7',
          fontSize: '24gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(-25deg)'
        }
      },
      //blue single head arrow
      {
        id: 'page7-blue-single-head-arrow',
        name: 'page7-blue-single-head-arrow',
        type: 'custom',
        coordinates: [730, 175, 930, 205], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-blue-single-head-arrow',
          elementName: 'page7-blue-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadBlueArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(-25deg)'
            }
          ],

        }
      },
      // amount of bika
      {
        id: 'page7-amount-of-bika',
        name: 'page7-amount-of-bika',
        type: 'custom',
        coordinates: [630, 275, 930, 335], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountOfBika',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '24gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(35deg)'
        }
      },
      //salmon single head arrow
      {
        id: 'page7-salmon-single-head-arrow',
        name: 'page7-salmon-single-head-arrow',
        type: 'custom',
        coordinates: [655, 315, 890, 350], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-salmon-single-head-arrow',
          elementName: 'page7-salmon-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadSalmonArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(35deg)'
            }
          ],

        }
      },
      //? mark text
      {
        id: 'page7-question-mark-text',
        name: 'page7-question-mark-text',
        type: 'custom',
        coordinates: [880, 360, 930, 390], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '?',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283', // Teal color to match the arrow
          fontSize: '70gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },


      // Button "Komang to Lucas" - Pinkish-purple with light pink border (changed from "Yohana to Lucas")
      {
        id: 'page7-komang-to-lucas-button',
        name: 'komang-to-lucas-button',
        type: 'custom',
        coordinates: [503, 490, 678, 590], // Centered horizontally
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
        id: 'page7-equals-sign-square',
        name: 'equals-sign-square',
        type: 'custom',
        coordinates: [698, 510, 758, 570], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // Tile 1: "1 1/2" - larger box, immediately right of equals
      {
        id: 'page7-tile-1',
        name: 'tile-1',
        type: 'custom',
        coordinates: [778, 485, 898, 595],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
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
        id: 'page7-tile-2',
        name: 'tile-2',
        type: 'custom',
        coordinates: [918, 507, 960, 573],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
          backgroundColor: '#4A5568',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '5gc',
          textAlign: 'center'
        }
      },

      // Tile 3: "1/200" - larger box, to the right of second
      {
        id: 'page7-tile-3',
        name: 'tile-3',
        type: 'custom',
        coordinates: [978, 485, 1098, 595],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '3 $\\frac{5}{8}$',
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
      //   id: 'page7-km-text',
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
        id: 'page7-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [5, 650, 1595, 700], // Centered horizontally
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
        coordinates: [350, 730, 1250, 770], // Positioned below information gathered text
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
          imageAlt: 'Tap'
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

      // Header Text - "What is the correct order of steps for adding mixed numbers?"
      {
        id: 'page8-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 175, 1595, 200], // Header bar at top (same as page 7)
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page8.headerText',
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
        id: 'page8-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page8.footerInstruction',
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
        coordinates: [400, 25, 655, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page8-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [688, 25, 838, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
        coordinates: [853, 25, 903, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page8-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [918, 25, 1038, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',

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
      //   id: 'page8-unit-km',
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
        id: 'page8-tap-animation',
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
        id: 'page8-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 8 }, // Only enable for specific page

          ignorePageCompletion: false, // Check page completion - button disabled until quiz is complete
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

      // Arrange Steps Component for page 8
      // Step number boxes are now integrated into the component (left column 20%, right column 80% for bars)
      {
        id: 'page8-arrange-steps',
        name: 'arrange-steps',
        type: 'custom',
        coordinates: [275, 300, 1325, 700],
        zIndex: 60,
        props: {
          componentType: 'ArrangeStepsComponent',
          steps: getI18nText("pages.page8.steps", []),
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
    9: [

      // Header Text - "What is the correct order of steps for adding Improper Fractions?"
      {
        id: 'page9-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 200, 1075, 250], // Header bar at top (same as page 8)
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page9.headerText',
            'What is the correct formula for converting a mixed to improper fraction?'
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

      // Equation Background
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

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page9-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [400, 25, 655, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page9-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [688, 25, 838, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
        id: 'page9-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [853, 25, 903, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page9-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [918, 25, 1038, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',

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
      //   id: 'page9-unit-km',
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

      // Instruction Text - "Drag the correct terms to make the improper fraction"
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
            'Drag the correct terms to make the improper fraction'
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

      // Solution Steps Component
      {
        id: 'page9-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page9.solutionSteps.mixedNumberAddition", 'Mixed Number Addition'),
          currentStep: 1,
          currentSubStep: 1,
          collapsible: false,
          steps: getI18nText("pages.page9.solutionSteps.steps"),
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

      // Title: "Improper Fraction Notation"
      {
        id: 'page9-mixed-number-title',
        name: 'mixed-number-title',
        type: 'custom',
        coordinates: [5, 300, 1075, 350],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page9.mixedNumberNotation", 'Mixed Number Notation'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Light blue/cyan color
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          fontWeight: 'bold'
        }
      },

      // Brown container background for the fraction
      {
        id: 'page9-mixed-number-fraction-container',
        name: 'mixed-number-fraction-container',
        type: 'custom',
        coordinates: [5, 350, 1075, 550],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.45)', // Black with 45% opacity
          border: 'none',
          borderRadius: '20gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },



      // White fraction bar
      {
        id: 'page9-mixed-number-fraction-bar',
        name: 'mixed-number-fraction-bar',
        type: 'custom',
        coordinates: [390, 448, 710, 458],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#ffffff', // White fraction bar
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Title: "Improper Fraction Notation"
      {
        id: 'page9-improper-fraction-title',
        name: 'improper-fraction-title',
        type: 'custom',
        coordinates: [5, 550, 1075, 600],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page9.improperFractionNotation", 'Improper Fraction Notation'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Light blue/cyan color
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          fontWeight: 'bold'
        }
      },

      // Brown container background for the fraction
      {
        id: 'page9-improper-fraction-container',
        name: 'improper-fraction-container',
        type: 'custom',
        coordinates: [5, 600, 1075, 800],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.45)', // Black with 45% opacity
          border: 'none',
          borderRadius: '20gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Fill Blanks Component for Improper Fraction Notation
      {
        id: 'page9-fill-blanks',
        name: 'fill-blanks-component',
        type: 'custom',
        coordinates: [5, 585, 1075, 875],
        zIndex: 60,
        props: {
          componentType: 'FillBlanksComponent',
          get blanks() {
            return [
              // Opening parenthesis before first blank
              { id: 'blank-paren-open', coordinate: [50, 625, 80, 655], text: '(', image: "", bgColor: 'transparent', borderColor: 'transparent', bgBlink: false, isDroppable: false },
              // Blank 1: denominator (first in numerator) - reduced by 25gc (275x75)
              { id: 'blank1', coordinate: [90, 615, 365, 690], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Blank 2: × (multiplication sign) - same size as opt5 (60x60), now a droppable blank
              { id: 'blank-times', coordinate: [375, 625, 435, 685], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Blank 3: whole part - same size as opt1 (225x75)
              { id: 'blank2', coordinate: [445, 615, 670, 690], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Closing parenthesis after whole part
              { id: 'blank-paren-close', coordinate: [675, 625, 705, 655], text: ')', image: "", bgColor: 'transparent', borderColor: 'transparent', bgBlink: false, isDroppable: false },
              // Blank 4: + (addition sign) - same size as opt4 (60x60), now a droppable blank
              { id: 'blank-plus', coordinate: [715, 625, 775, 685], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Blank 5: numerator (last in numerator) - reduced by 25gc (275x75)
              { id: 'blank3', coordinate: [785, 615, 1060, 690], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Blank 6: denominator (below fraction bar) - reduced by 25gc (275x75)
              { id: 'blank4', coordinate: [400, 725, 675, 800], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
            ];
          },
          blankBorderWidth: '3gc',
          blankBorderColor: '#FF8C00', // Orange dashed border
          blankBorderType: 'dashed',
          blankBorderRadius: '12gc',
          blankBackgroundColor: '#6B5B4B', // Slightly darker brown for blanks
          blankFontSize: '28gc',
          blankFontColor: '#ffffff', // White text
          optionsContainerCoordinates: [1100, 150, 1595, 815], // Right side for options
          optionsBorderWidth: '0gc',
          optionsBorderColor: 'transparent',
          optionsBorderType: 'solid',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: '',
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#4A5568', // Default color (will be overridden per option)
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff', // White text
          optionButtonLayoutMode: 'manual',
          optionsRows: 3,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND',
          retainOptionButtonStyle: true, // Retain option button colors when dropped into blanks
          keepOptionStyleWhenPlaced: true, // Keep option button style when correctly placed (disable drag but keep style)
          allowMultiBlankPlacement: true, // Allow options to be placed in multiple blanks (opt3 can go into blank1 and blank4)
          options: getI18nText("pages.page9.fillBlanks.options"),
          impFormulae: []
        }
      },

      // Vertical separator line between fraction structure and operator buttons
      {
        id: 'page9-options-separator',
        name: 'options-separator',
        type: 'custom',
        coordinates: [800, 375, 805, 525],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#ffffff', // White separator line
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // White fraction bar
      {
        id: 'page9-fraction-bar',
        name: 'fraction-bar',
        type: 'custom',
        coordinates: [50, 695, 1025, 705],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#ffffff', // White fraction bar
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 10'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 8'));
              }
            }
          }
        }
      }
    ],

    10: [

      // Equation Background
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

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page10-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [400, 25, 655, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page10-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [688, 25, 838, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
        id: 'page10-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [853, 25, 903, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page10-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [918, 25, 1038, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',

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
      //   id: 'page10-unit-km',
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

      // Arrange Steps Component
      {
        id: 'page10-arrange-steps',
        name: 'arrange-steps',
        type: 'custom',
        coordinates: [5, 150, 1075, 815], // Between equation and solution steps, above next button
        zIndex: 60,
        props: {
          componentType: 'ArrangeStepsComponent',
          steps: getI18nText("pages.page10.arrangeSteps.steps", []),
          stepLabels: ['2.a', '2.b', '2.c'], // Custom step labels
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
          instructionText: getI18nText("pages.page10.arrangeSteps.instructionText", 'What is the correct formula for converting mixed to improper?'),
          showInstructionText: true, // Show instruction text
          instructionFontSize: '40gc',
          instructionFontColor: '#F59E0B', // Gold color
          instructionTextAlign: 'center', // Center align instruction text
          instructionRowHeight: 20, // Percentage of container height for instruction text (default: 20%)
          stepsContainerWidth: 80, // Percentage of container width for steps container (default: 80%)
          stepsContainerBackgroundColor: 'rgba(0, 0, 0, 0.3)', // Black opaque background like solution steps
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
      },

      // Solution Steps Component
      {
        id: 'page10-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page10.solutionSteps.headerText", "Mixed Number Addition"),
          currentStep: 2,
          currentSubStep: 0,
          collapsible: true,
          subStepsCollapsible: false, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: false, // Start with sub-steps collapsed (only current step expanded)
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



      // Instruction Text - "Rearrange the buttons to the correct sequence of steps"
      {
        id: 'page10-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page10.footerInstruction", "Rearrange the buttons to the correct sequence of steps"),
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 11'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 9'));
              }
            }
          }
        }
      }
    ],

    11: [

      // Header Text - "What is the correct order of steps for adding Improper Fractions?"
      {
        id: 'page11-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 200, 1075, 250], // Header bar at top (same as page 8)
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page11.headerText',
            'What is the correct formula for converting a improper fraction into an mixed number?'
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

      // Equation Background
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

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page11-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [400, 25, 655, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page11-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [688, 25, 838, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
        id: 'page11-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [853, 25, 903, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page11-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [918, 25, 1038, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',

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
      //   id: 'page11-unit-km',
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

      // Instruction Text - "Drag the correct terms to make the improper fraction"
      {
        id: 'page11-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page11.footerInstruction',
            'Drag the correct terms to make the mixed fraction'
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

      // Solution Steps Component
      {
        id: 'page11-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page11.solutionSteps.headerText", "Mixed Number Addition"),
          currentStep: 3,
          currentSubStep: 1,
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

      // Title: "Improper Fraction Notation"
      {
        id: 'page11-mixed-number-title',
        name: 'mixed-number-title',
        type: 'custom',

        coordinates: [5, 550, 1075, 600],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Mixed Number Notation',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Light blue/cyan color
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          fontWeight: 'bold'
        }
      },

      // Brown container background for the fraction
      {
        id: 'page11-mixed-number-fraction-container',
        name: 'mixed-number-fraction-container',
        type: 'custom',
        coordinates: [5, 350, 1075, 550],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.45)', // Black with 45% opacity
          border: 'none',
          borderRadius: '20gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Title: "Improper Fraction Notation"
      {
        id: 'page11-improper-fraction-title',
        name: 'improper-fraction-title',
        type: 'custom',
        coordinates: [5, 300, 1075, 350],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Improper Fraction Notation',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Light blue/cyan color
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          fontWeight: 'bold'
        }
      },

      // Brown container background for the fraction
      {
        id: 'page11-improper-fraction-container',
        name: 'improper-fraction-container',
        type: 'custom',
        coordinates: [5, 600, 1075, 800],
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.45)', // Black with 45% opacity
          border: 'none',
          borderRadius: '20gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Fill Blanks Component for Improper Fraction Notation
      {
        id: 'page11-fill-blanks',
        name: 'fill-blanks-component',
        type: 'custom',
        coordinates: [5, 600, 1075, 800],
        zIndex: 60,
        props: {
          componentType: 'FillBlanksComponent',
          get blanks() {
            return [
              // Blank 1: Left blank (centered vertically)
              { id: 'blank1', coordinate: [225, 650, 525, 750], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Blank 2: Right top blank (stacked on right)
              { id: 'blank2', coordinate: [550, 620, 850, 690], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
              // Blank 3: Right bottom blank (stacked on right)
              { id: 'blank3', coordinate: [550, 710, 850, 780], text: "", image: "", bgColor: '#6B5B4B', borderColor: '#FF8C00', bgBlink: false },
            ];
          },
          blankBorderWidth: '3gc',
          blankBorderColor: '#FF8C00', // Orange dashed border
          blankBorderType: 'dashed',
          blankBorderRadius: '12gc',
          blankBackgroundColor: '#6B5B4B', // Light grey for blanks
          blankFontSize: '28gc',
          blankFontColor: '#ffffff', // White text
          optionsContainerCoordinates: [600, 370, 1050, 530], // Inside mixed-fraction container [5, 350, 1075, 550]
          optionsBorderWidth: '0gc',
          optionsBorderColor: 'transparent',
          optionsBorderType: 'solid',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: '',
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#4A5568', // Default color (will be overridden per option)
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff', // White text
          optionButtonLayoutMode: 'manual',
          optionsRows: 2,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND',
          retainOptionButtonStyle: true, // Retain option button colors when dropped into blanks
          keepOptionStyleWhenPlaced: true, // Keep option button style when correctly placed (disable drag but keep style)
          allowMultiBlankPlacement: false, // Each option goes to one blank
          options: getI18nText("pages.page11.fillBlanks.options", []),
          impFormulae: []
        }
      },

      // White horizontal line between the two right blanks
      {
        id: 'page11-blanks-separator',
        name: 'blanks-separator',
        type: 'custom',
        coordinates: [550, 695, 850, 705],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#ffffff', // White separator line
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // White vertical separator line between left and right option groups (inside mixed-fraction container)
      {
        id: 'page11-options-separator',
        name: 'options-separator',
        type: 'custom',
        coordinates: [580, 360, 585, 540],
        zIndex: 62,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#ffffff', // White separator line
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // White fraction bar between numerator and denominator options (inside mixed-fraction container)
      {
        id: 'page11-options-fraction-bar',
        name: 'options-fraction-bar',
        type: 'custom',
        coordinates: [320, 450, 520, 455],
        zIndex: 61,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: '#ffffff', // White fraction bar
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 15'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 13'));
              }
            }
          }
        }
      }
    ],
    12: [

      // Equation Background
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

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page12-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [400, 25, 655, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText", "Total Weigth"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
        coordinates: [623, 25, 673, 125], // Centered with 15px gap after text, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page12-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [688, 25, 838, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
        id: 'page12-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [853, 25, 903, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page12-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [918, 25, 1038, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',

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
      //   id: 'page12-unit-km',
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

      // Solution Steps Component
      {
        id: 'page12-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page12.solutionSteps.headerText", "Mixed Number Addition"),
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded),
          showAllAsCurrent: true,
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

      // Information gathered text - "✓ Information gathered from question."
      {
        id: 'page12-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [0, 370, 1080, 420], // Vertically centered between 150-800, horizontally 0-1080
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page12.informationGathered"),
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
        id: 'page12-steps-required-text',
        name: 'steps-required-text',
        type: 'custom',
        coordinates: [0, 450, 1080, 500], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page12.stepsRequired"),
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
        id: 'page12-next-result-text',
        name: 'next-result-text',
        type: 'custom',
        coordinates: [0, 530, 1080, 580], // Positioned below steps required text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page12.nextFinding"),
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
        id: 'page12-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page12.footerInstruction',
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
        id: 'page12-tap-animation',
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 7'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 5'));
              }
            }
          }
        }
      },

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
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page13-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page13-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page13-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark grey
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
      //   id: 'page13-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page13-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page13-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: 'page13-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page13-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">65</span><span style="display: block; padding: 0 2px;">8</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page13-number-box-1',
          onFlipHideTargetId: 'page13-tap-animation-working-box-1'
        }
      },

      // Tap Animation on working-box-1
      {
        id: 'page13-tap-animation-working-box-1',
        name: 'tap-animation-working-box-1',
        type: 'custom',
        coordinates: [558, 325, 618, 375], // Centered on top of working-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.55 // 30% opacity
        }
      },

      // Plus sign 1
      {
        id: 'page13-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 717, 375], // X coordinates match page13-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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





      // Second placeholder box (flip tile with question mark that blinks, reveals fraction)
      {
        id: 'page13-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page13-number-box-3, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">29</span><span style="display: block; padding: 0 2px;">8</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page13-number-box-2',
          onFlipHideTargetId: 'page13-tap-animation-working-box-2'
        }
      },

      // Tap Animation on working-box-2
      {
        id: 'page13-tap-animation-working-box-2',
        name: 'tap-animation-working-box-2',
        type: 'custom',
        coordinates: [773, 325, 823, 375], // Centered on top of working-box-2, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.55 // 30% opacity
        }
      },

      // // Unit: kg
      // {
      //   id: 'page13-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page13-unit-km, Width: 70, Height: 100, moved down 25gc
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

      // Black container background for conversion display

      // // Black container background for conversion display
      // {
      //   id: 'page13-conversion-background',
      //   name: 'conversion-background',
      //   type: 'custom',
      //   coordinates: [910, 110, 1165, 300],
      //   zIndex: 55,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '',
      //     backgroundColor: 'rgba(0, 0, 0, 0.85)', // Black with 85% opacity
      //     border: 'none',
      //     borderRadius: '12gc',
      //     textColor: '#ffffff',
      //     fontSize: '36gc',
      //     padding: '0gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // Mixed to Improper Fraction Conversion Display
      // // "1 1/2" text
      // {
      //   id: 'page13-mixed-number-text',
      //   name: 'mixed-number-text',
      //   type: 'custom',
      //   coordinates: [905, 180, 1000, 230], // Centrally aligned vertically
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '40gc',
      //     padding: '10gc',
      //     textAlign: 'left',
      //     lineHeight: '1.5'
      //   }
      // },

      // // Equals sign for conversion
      // {
      //   id: 'page13-conversion-equals',
      //   name: 'conversion-equals',
      //   type: 'custom',
      //   coordinates: [1000, 180, 1025, 230], // Centrally aligned vertically
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '=',
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '36gc',
      //     padding: '0gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // Numerator box with "1" (white background, orange border)
      // {
      //   id: 'page13-numerator-box',
      //   name: 'numerator-box',
      //   type: 'custom',
      //   coordinates: [1040, 125, 1100, 193], // Centrally aligned vertically with fraction
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '1',
      //     backgroundColor: '#ffffff', // White background
      //     border: '2px solid #FF8C00', // Thin orange border
      //     borderRadius: '8gc', // Rounded corners
      //     textColor: '#000000',
      //     fontSize: '36gc',
      //     padding: '10gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // Fraction bar
      // {
      //   id: 'page13-fraction-bar',
      //   name: 'fraction-bar',
      //   type: 'custom',
      //   coordinates: [1040, 203, 1100, 206], // Height set to 3gc for the fraction line width, centrally aligned
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '',
      //     backgroundColor: '#ffffff', // White fraction bar
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '1gc',
      //     padding: '0gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // Denominator box (empty, dark gray, orange border) - for user input
      // {
      //   id: 'page13-denominator-box',
      //   name: 'denominator-box',
      //   type: 'custom',
      //   coordinates: [1040, 216, 1100, 284], // Adjusted to start after fraction bar, centrally aligned
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '', // Empty for user input
      //     backgroundColor: '#4A5568', // Dark gray background
      //     border: '2px solid #FF8C00', // Thin orange border
      //     borderRadius: '8gc', // Rounded corners
      //     textColor: '#ffffff',
      //     fontSize: '36gc',
      //     padding: '10gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // Fraction Conversion Controller - manages the interactive flow
      // {
      //   id: 'page13-fraction-conversion-controller',
      //   name: 'fraction-conversion-controller',
      //   type: 'custom',
      //   coordinates: [0, 0, 1, 1], // Hidden component, no visual presence
      //   zIndex: 1,
      //   props: {
      //     componentType: 'FractionConversionController',
      //     pageId: 'page13',
      //     // Fraction 1: 1 1/2 = 3/2
      //     fraction1: {
      //       mixedWhole: 1,
      //       mixedNumerator: 1,
      //       mixedDenominator: 2,
      //       improperNumerator: 3,
      //       improperDenominator: 2,
      //       numberBoxId: 'page13-number-box-1',
      //       workingBoxId: 'page13-working-box-1'
      //     },
      //     // Fraction 2: 2 1/4 = 9/4
      //     fraction2: {
      //       mixedWhole: 2,
      //       mixedNumerator: 1,
      //       mixedDenominator: 4,
      //       improperNumerator: 9,
      //       improperDenominator: 4,
      //       numberBoxId: 'page13-number-box-3',
      //       workingBoxId: 'page13-working-box-2'
      //     },
      //     mixedNumberTextId: 'page13-mixed-number-text',
      //     numeratorBoxId: 'page13-numerator-box',
      //     denominatorBoxId: 'page13-denominator-box',
      //     highlightColor: '#F59E0B',
      //     correctColor: '#22C55E',
      //     defaultBgColor: '#4A5568',
      //     activeBorderColor: '#FF8C00'
      //   }
      // },

      // Solution Steps Component
      {
        id: 'page13-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page13.solutionSteps.headerText", []),
          currentStep: 1,
          currentSubStep: 1,
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
          initialVisible: false
        }
      },



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page13-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page13.footerInstruction',
            "Tap '?' to reveal the answer for each conversion"
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
        id: 'page13-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 13 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 16'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 14'));
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
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page14-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page14-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page14-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
      //   id: 'page14-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page14-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page14-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box: 3/2
      {
        id: 'page14-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page14-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #FFA500;">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page14-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 713, 375], // X coordinates match page14-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Fraction box: 1/200
      {
        id: 'page14-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page14-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #FFA500;">8</span></span>',
          backgroundColor: '#4A5568', // Dark blue/grey background
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
      //   id: 'page14-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page14-unit-km, Width: 70, Height: 100, moved down 25gc
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

      // Black container background for conversion display

      // LCM Button
      {
        id: 'page14-lcm-button',
        name: 'lcm-button',
        type: 'button',
        coordinates: [450, 425, 850, 525], // Horizontal orange button
        zIndex: 70,
        props: {
          text: getI18nText("pages.page14.lcmButtonText", 'LCM of 5, and 5'),
          backgroundColor: '#FFA500', // Orange background
          color: '#ffffff', // White text
          fontSize: '32gc',
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
            console.log('LCM button clicked - navigating to page 17');
            if (typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(15);
              } else if (window.navigateToPage) {
                window.navigateToPage(15);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 15 } }));
                console.log('📄 [LCM Button] Dispatched page change event to page 17');
              }
            }
            // Play click sound if available
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
          }
        }
      },

      // Tap Animation on LCM Button
      {
        id: 'page14-tap-animation-lcm-button',
        name: 'tap-animation-lcm-button',
        type: 'custom',
        coordinates: [460, 475,520, 525], // Positioned on left side of button, pointing to "LCM"
        zIndex: 75,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3
        }
      },

      // LCM Question Text
      // {
      //   id: 'page14-lcm-question',
      //   name: 'lcm-question',
      //   type: 'custom',
      //   coordinates: [910, 125, 1165, 225],
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: 'LCM of 2, 4 and 200 =',
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '36gc',
      //     padding: '15gc',
      //     textAlign: 'left',
      //     lineHeight: '1.5',
      //     fontWeight: 'normal'
      //   }
      // },

      // // LCM Input Box
      // {
      //   id: 'page14-lcm-box',
      //   name: 'lcm-box',
      //   type: 'custom',
      //   coordinates: [910, 235, 1165, 335],
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '', // Empty for user input
      //     backgroundColor: '#ffffff', // White background
      //     border: '3px solid #FF8C00', // Thick orange border
      //     borderRadius: '12gc', // Rounded corners
      //     textColor: '#000000',
      //     fontSize: '40gc',
      //     padding: '15gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // LCM Input Controller - manages the LCM input flow for page 16
      // {
      //   id: 'page14-lcm-controller',
      //   name: 'lcm-controller',
      //   type: 'custom',
      //   coordinates: [0, 0, 1, 1], // Hidden component, no visual presence
      //   zIndex: 1,
      //   props: {
      //     componentType: 'LCMInputController',
      //     pageId: 'page14',
      //     lcmBoxId: 'page14-lcm-box',
      //     correctAnswer: 200,
      //     correctColor: '#22C55E',
      //     activeBorderColor: '#FF8C00'
      //   }
      // },

      // Solution Steps Component
      {
        id: 'page14-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page14.solutionSteps.headerText", []),
          currentStep: 2,
          currentSubStep: 1,
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



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page14-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
        
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page14.footerInstruction',
            'Enter LCM of denominators using numpad'
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 17'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 15'));
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
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page15-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page15-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page15-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
      //   id: 'page15-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page15-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page15-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box: 3/2
      {
        id: 'page15-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page15-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffffff">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page15-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 713, 375], // X coordinates match page15-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Fraction box: 1/200
      {
        id: 'page15-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page15-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark blue/grey background
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
      //   id: 'page15-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page15-unit-km, Width: 70, Height: 100, moved down 25gc
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
      // Third Equation Background
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

      // Third Equation Display
      // Equals sign
      {
        id: 'page15-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
        id: 'page15-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">?</span><span style="display: block; padding: 0 4px; color: #20B2AA;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page15-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [663, 425, 713, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page15-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [718, 425, 868, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">?</span><span style="display: block; padding: 0 4px; color: #20B2AA;">8</span></span>',
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
      // // Unit: kg
      // {
      //   id: 'page15-third-unit-km',
      //   name: 'third-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 425, 973, 525], // Width: 70, Height: 100
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
      // Solution Steps Component
      {
        id: 'page15-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page15.solutionSteps.headerText", ""),
          currentStep: 2,
          currentSubStep: 1,
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
          imageAlt: 'Tap'
        }
      },



      // Instruction Text - "Tap » for Step 2.b"
      {
        id: 'page15-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page15.footerInstruction',
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 18'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 16'));
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
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
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
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page16-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page16-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page16-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
      //   id: 'page16-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page16-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page16-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box: 3/2
      {
        id: 'page16-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page16-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffffff">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page16-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 713, 375], // X coordinates match page16-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Fraction box: 1/200
      {
        id: 'page16-working-box-2',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page16-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Dark blue/grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Unit: kg
      // {
      //   id: 'page16-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page16-unit-km, Width: 70, Height: 100, moved down 25gc
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

      // Third Equation Background
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

      // Third Equation Display
      // Equals sign
      {
        id: 'page16-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
        id: 'page16-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">65</span><span style="display: block; padding: 0 2px; color: #20B2AA;">8</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page16-working-box-1',
          onFlipHideTargetId: 'page16-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page16-tap-animation-third-box-1',
        name: 'tap-animation-third-box-1',
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

      // Plus sign 1
      {
        id: 'page16-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [663, 425, 713, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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





      // Third fraction box: ?/200 (flip tile)
      {
        id: 'page16-third-box-3',
        name: 'third-box-3',
        type: 'custom',
        coordinates: [718, 425, 868, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">29</span><span style="display: block; padding: 0 2px; color: #20B2AA;">8</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page16-working-box-2',
          onFlipHideTargetId: 'page16-tap-animation-third-box-3',
          flipBack: false
        }
      },

      // Tap Animation on third-box-3
      {
        id: 'page16-tap-animation-third-box-3',
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

      // Unit: km
      // {
      //   id: 'page16-third-unit-km',
      //   name: 'third-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 425, 973, 525], // Width: 70, Height: 100
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
          currentStep: 2,
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
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page16.instructionRevealConversions', "Tap '?' to reveal the answer for each conversion"),
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 23'));
              }
            }
          }
        }
      }
    ],
    17: [

      // Header Text
      {
        id: 'page17-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page17.headerText',
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
        id: 'page17-equation-background',
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
        id: 'page17-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },
      // Equals sign
      {
        id: 'page17-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page17-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page17-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page17-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
      //   id: 'page17-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page17-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page17-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box: 3/2
      {
        id: 'page17-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page17-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffffff">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page17-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 713, 375], // X coordinates match page17-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Fraction box: 1/200
      {
        id: 'page17-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page17-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark blue/grey background
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
      //   id: 'page17-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page17-unit-km, Width: 70, Height: 100, moved down 25gc
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
      // Third Equation Background
      {
        id: 'page17-equation3-background',
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

      // Third Equation Display
      // Equals sign
      {
        id: 'page17-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
        id: 'page17-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
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
      // Plus sign 1
      {
        id: 'page17-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [663, 425, 713, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page17-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [718, 425, 868, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #fffff;">8</span></span>',
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
      // // Unit: kg
      // {
      //   id: 'page17-third-unit-km',
      //   name: 'third-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 425, 973, 525], // Width: 70, Height: 100
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
      // Fourth Equation Background
      {
        id: 'page17-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all fourth equation components with padding
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

      // Fourth Equation Display
      // Equals sign
      {
        id: 'page17-fourth-equals',
        name: 'fourth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // Fraction box: ?/200 (flip tile)
      {
        id: 'page17-fourth-box',
        name: 'fourth-box',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">36</span><span style="display: block; padding: 0 2px; color: #20B2AA;">8</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipHideTargetId: 'page17-tap-animation-fourth-box',
          flipBack: false,
          onClick: (e, isFlipped) => {
            // When flipped, change all three third boxes to original dark gray background
            if (isFlipped) {
              const box1 = document.getElementById('page17-third-box-1');
              const box2 = document.getElementById('page17-third-box-2');
              const box3 = document.getElementById('page17-third-box-3');
              if (box1) box1.style.backgroundColor = 'rgba(74, 85, 104, 0.7)';
              if (box2) box2.style.backgroundColor = 'rgba(74, 85, 104, 0.7)';
              if (box3) box3.style.backgroundColor = 'rgba(74, 85, 104, 0.7)';
            }
          }
        }
      },

      // Tap Animation on fourth-box
      {
        id: 'page17-tap-animation-fourth-box',
        name: 'tap-animation-fourth-box',
        type: 'custom',
        coordinates: [558, 625, 588, 675], // Centered on top of fourth-box, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },

      // Unit: kg
      // {
      //   id: 'page17-fourth-unit-km',
      //   name: 'fourth-unit-km',
      //   type: 'custom',
      //   coordinates: [670, 575, 693, 675], // Width: 70, Height: 100
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

      // Solution Steps Component
      {
        id: 'page17-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page17.solutionSteps.headerText"),
          currentStep: 2,
          currentSubStep: 3,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap',
          initialVisible: false
        }
      },



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page17-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page17.footerInstruction', "Tap '?' to reveal the sum"),
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
        id: 'page17-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 17 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 18'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 16'));
              }
            }
          }
        }
      }
    ],
    18: [

      // Header Text
      {
        id: 'page18-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page18.headerText',
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
        id: 'page18-equation-background',
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
        id: 'page18-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },
      // Equals sign
      {
        id: 'page18-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page18-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page18-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page18-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
      //   id: 'page18-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page18-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page18-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box: 3/2
      {
        id: 'page18-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page18-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffffff">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page18-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 713, 375], // X coordinates match page18-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Fraction box: 1/200
      {
        id: 'page18-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page18-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark blue/grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Unit: kg
      // {
      //   id: 'page18-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page18-unit-km, Width: 70, Height: 100, moved down 25gc
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
      // Third Equation Background
      {
        id: 'page18-equation3-background',
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

      // Third Equation Display
      // Equals sign
      {
        id: 'page18-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
        id: 'page18-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Plus sign 1
      {
        id: 'page18-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [663, 425, 713, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page18-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [718, 425, 868, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #fffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Unit: kg
      // {
      //   id: 'page18-third-unit-km',
      //   name: 'third-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 425, 973, 525], // Width: 70, Height: 100
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

      // Fourth Equation Background
      {
        id: 'page18-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all fourth equation components with padding
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

      // Fourth Equation Display
      // Equals sign
      {
        id: 'page18-fourth-equals',
        name: 'fourth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // Fraction box: 751/200 (highlight color 1 background)
      {
        id: 'page18-fourth-fraction-box',
        name: 'fourth-fraction-box',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">36</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Unit: kg (after 751/200)
      // {
      //   id: 'page18-fourth-unit-km-1',
      //   name: 'fourth-unit-km-1',
      //   type: 'custom',
      //   coordinates: [659, 575, 693, 675], // Width: 70, Height: 100
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

      // Equals sign (second)
      {
        id: 'page18-fourth-equals-2',
        name: 'fourth-equals-2',
        type: 'custom',
        coordinates: [680, 575, 700, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // Question mark box: ? (flip tile)
      {
        id: 'page18-fourth-box',
        name: 'fourth-box',
        type: 'custom',
        coordinates: [720, 575, 870, 675], // Width: 132, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipHideTargetId: 'page18-tap-animation-fourth-box',
          flipBack: false,
          onClick: (e, isFlipped) => {
            // When flipped, change fourth-fraction-box to original dark gray background
            if (isFlipped) {
              const fractionBox = document.getElementById('page18-fourth-fraction-box');
              if (fractionBox) fractionBox.style.backgroundColor = '#4A5568';
            }
          }
        }
      },

      // Tap Animation on fourth-box
      {
        id: 'page18-tap-animation-fourth-box',
        name: 'tap-animation-fourth-box',
        type: 'custom',
        coordinates: [850, 625, 890, 675], // Centered on top of fourth-box, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },

      // Unit: kg (final)
      // {
      //   id: 'page18-fourth-unit-km',
      //   name: 'fourth-unit-km',
      //   type: 'custom',
      //   coordinates: [960, 575, 980, 675], // Width: 70, Height: 100
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

      // Solution Steps Component
      {
        id: 'page18-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page18.solutionSteps.headerText", ""),
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page18.solutionSteps.steps", ""),
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
        id: 'page18-tap-animation',
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



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page18-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page18.footerInstruction', "Tap '?' to reveal the conversion of result"),
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
        id: 'page18-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 18 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page18-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page18-next-button');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 16'));
              }
            }
          }
        }
      }
    ],
    19: [

      // Header Text
      {
        id: 'page19-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page19.headerText',
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
        id: 'page19-equation-background',
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
        id: 'page19-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [220, 125, 440, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.equationButtonText"),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.0',
          // whiteSpace: 'nowrap'
        }
      },
      // Equals sign
      {
        id: 'page19-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [453, 125, 503, 225], // Shifted further left by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First number box: 1 1/2
      {
        id: 'page19-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [508, 125, 658, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">8</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Plus sign 1
      {
        id: 'page19-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [663, 125, 713, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second number box: 1/200
      {
        id: 'page19-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [718, 125, 868, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">5</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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
      //   id: 'page19-unit-km',
      //   name: 'unit-km',
      //   type: 'custom',
      //   coordinates: [903, 125, 973, 225], // Reduced gap - moved 60gc left
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


      // Equation Background
      {
        id: 'page19-equation2-background',
        name: 'equation2-background',
        type: 'custom',
        coordinates: [5, 250, 1175, 395], // Covers all equation components with padding, shifted further left by 100gc
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

      // Working Area Equation Display (below main equation)
      // All elements aligned at Y=275 to Y=375 (height: 100), moved down by 25gc
      // Equals sign
      {
        id: 'page19-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [453, 275, 503, 375], // Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // First placeholder box: 3/2
      {
        id: 'page19-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [508, 275, 658, 375], // X coordinates match page19-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffffff">8</span></span>',
          backgroundColor: '#4A5568', // Dark grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Plus sign 1
      {
        id: 'page19-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [663, 275, 713, 375], // X coordinates match page19-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Fraction box: 1/200
      {
        id: 'page19-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [718, 275, 868, 375], // X coordinates match page19-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark blue/grey background
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Unit: kg
      // {
      //   id: 'page19-working-unit-km',
      //   name: 'working-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 275, 973, 375], // X coordinates match page19-unit-km, Width: 70, Height: 100, moved down 25gc
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
      // Third Equation Background
      {
        id: 'page19-equation3-background',
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

      // Third Equation Display
      // Equals sign
      {
        id: 'page19-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [453, 425, 503, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
        id: 'page19-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [508, 425, 658, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">65</span><span style="display: block; padding: 0 4px; color: #ffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Plus sign 1
      {
        id: 'page19-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [663, 425, 713, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '-',
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

      // Second fraction box: 1/200 (dark gray background)
      {
        id: 'page19-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [718, 425, 868, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">29</span><span style="display: block; padding: 0 4px; color: #fffff;">8</span></span>',
          backgroundColor: '#4A5568', // Dark gray background with 70% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Unit: kg
      // {
      //   id: 'page19-third-unit-km',
      //   name: 'third-unit-km',
      //   type: 'custom',
      //   coordinates: [903, 425, 973, 525], // Width: 70, Height: 100
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

      // Fourth Equation Background
      {
        id: 'page19-equation4-background',
        name: 'equation4-background',
        type: 'custom',
        coordinates: [5, 550, 1175, 695], // Covers all fourth equation components with padding
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

      // Fourth Equation Display
      // Equals sign
      {
        id: 'page19-fourth-equals',
        name: 'fourth-equals',
        type: 'custom',
        coordinates: [453, 575, 503, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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

      // Fraction box: 751/200 (highlight color 1 background)
      {
        id: 'page19-fourth-fraction-box',
        name: 'fourth-fraction-box',
        type: 'custom',
        coordinates: [508, 575, 658, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">36</span><span style="display: block; padding: 0 4px; color: #ffffff;">8</span></span>',
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

      // Unit: kg (after 751/200)
      // {
      //   id: 'page19-fourth-unit-km-1',
      //   name: 'fourth-unit-km-1',
      //   type: 'custom',
      //   coordinates: [659, 575, 693, 675], // Width: 70, Height: 100
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

      // Equals sign (second)
      {
        id: 'page19-fourth-equals-2',
        name: 'fourth-equals-2',
        type: 'custom',
        coordinates: [680, 575, 700, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
      {
        id: 'page19-fifth-fraction-box',
        name: 'page19-fifth-fraction-box',
        type: 'custom',
        coordinates: [720, 575, 870, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },
      // Equals sign (third)
      {
        id: 'page19-fourth-equals-3',
        name: 'fourth-equals-3',
        type: 'custom',
        coordinates: [890, 575, 910, 675], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
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
      // Question mark box: ? (flip tile)
      {
        id: 'page19-fourth-box',
        name: 'fourth-box',
        type: 'custom',
        coordinates: [930, 575, 1080, 675], // Width: 132, Height: 100
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '<span style="color: #ffffff;">4</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipHideTargetId: 'page19-tap-animation-fourth-box',
          flipBack: false,
          onClick: (e, isFlipped) => {
            // When flipped, change fourth-fraction-box to original dark gray background
            if (isFlipped) {
              const fractionBox = document.getElementById('page19-fifth-fraction-box');
              if (fractionBox) fractionBox.style.backgroundColor = '#4A5568';
            }
          }
        }
      },

      // Tap Animation on fourth-box
      {
        id: 'page19-tap-animation-fourth-box',
        name: 'tap-animation-fourth-box',
        type: 'custom',
        coordinates: [950, 625, 990, 675], // Centered on top of fourth-box, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },

      // Unit: kg (final)
      // {
      //   id: 'page19-fourth-unit-km',
      //   name: 'fourth-unit-km',
      //   type: 'custom',
      //   coordinates: [960, 575, 980, 675], // Width: 70, Height: 100
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

      // Solution Steps Component
      {
        id: 'page19-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: getI18nText("pages.page19.solutionSteps.headerText", ""),
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          steps: getI18nText("pages.page19.solutionSteps.steps", ""),
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
        id: 'page19-tap-animation',
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



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page19-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page19.footerInstruction', "Tap '?' to reveal the conversion of result"),
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
        id: 'page19-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 19 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page19-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page19-next-button');
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
        id: 'page19-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page19-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page19-previous-button');
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
    20: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page20-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page20.headerText',
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
        id: 'page20-question-background',
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
        id: 'page20-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [100, 25, 1075, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          highlights: getI18nText("pages.page20.highlights", [])
        }
      },

      //bika ambon image one
      {
        id: 'page20-bika-ambon-image-one',
        name: 'page20-bika-ambon-image-one',
        type: 'custom',
        coordinates: [130, 350, 430, 750], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-bika-ambon-image-one',
          elementName: 'page20-bika-ambon-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon18.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //8 8/5 kg text
      {
        id: 'page20-bika-ambon-image-one-text',
        name: 'page20-bika-ambon-image-one-text',
        type: 'custom',
        coordinates: [205, 730, 355, 760], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$8 \\frac{1}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFD700', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      //bika-ambon-image-two
      {
        id: 'page20-bika-ambon-image-two',
        name: 'page20-bika-ambon-image-two',
        type: 'custom',
        coordinates: [700, 380, 1000, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-bika-ambon-image-two',
          elementName: 'page20-bika-ambon-image-two',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/bikaAmbon38.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },
      //3 5/8 kg text
      {
        id: 'page20-bika-ambon-image-two-text',
        name: 'page20-bika-ambon-image-two-text',
        type: 'custom',
        coordinates: [750, 735, 950, 765], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{5}{8}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#70ACC7', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },
      // amount beni give his grandmother
      {
        id: 'page20-amount-beni-give',
        name: 'page20-amount-beni-give',
        type: 'custom',
        coordinates: [420, 450, 720, 500], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountBeniGiveToGrandMother',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#70ACC7',
          fontSize: '26gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(-25deg)'
        }
      },
      //blue single head arrow
      {
        id: 'page20-blue-single-head-arrow',
        name: 'page20-blue-single-head-arrow',
        type: 'custom',
        coordinates: [480, 480, 710, 530], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-blue-single-head-arrow',
          elementName: 'page20-blue-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadBlueArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(-25deg)'
            }
          ],

        }
      },
      // amount of bika
      {
        id: 'page20-amount-of-bika',
        name: 'page20-amount-of-bika',
        type: 'custom',
        coordinates: [400, 620, 700, 670], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'common.amountOfBika',
            "Tap » to identify 'given' information"
          ),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#F28283',
          fontSize: '26gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          whiteSpace: "pre-line",
          transform: 'rotate(35deg)'
        }
      },
      //salmon single head arrow
      {
        id: 'page20-salmon-single-head-arrow',
        name: 'page20-salmon-single-head-arrow',
        type: 'custom',
        coordinates: [400, 650, 670, 700], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-salmon-single-head-arrow',
          elementName: 'page20-salmon-single-head-arrow',
          currentPage: 2,
          coordinates: [400, 450, 700, 500],
          zIndex: 51,
          images: [
            {
              src: 'assets/singleHeadSalmonArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
              transform: 'rotate(35deg)'
            }
          ],

        }
      },
      //? mark text
      {
        id: 'page20-question-mark-text',
        name: 'page20-question-mark-text',
        type: 'custom',
        coordinates: [650, 730, 730, 760], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$4 \\frac{1}{2}$',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F28283', // Teal color to match the arrow
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Solution Steps Component
      {
        id: 'page20-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1095, 100, 1595, 815], // Same position as page 19
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
          showAllAsCurrent: true, // Show all steps and sub-steps as current
          steps: [
            {
              text: 'Convert mixed numbers into improper fractions',
              subSteps: []
            },
            {
              text: 'Add the resulting Improper Fractions',
              subSteps: [
                { text: 'Find LCM of denominators' },
                { text: 'Convert into Like Fractions' },
                { text: 'Add Like Fractions' }
              ]
            },
            {
              text: 'Convert the result back into a mixed number',
              subSteps: []
            }
          ],
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
        id: 'page20-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page20.footerInstruction',
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
        id: 'page20-tap-animation',
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
        id: 'page20-next-button',
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
        id: 'page20-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page20-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page20-previous-button');
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
