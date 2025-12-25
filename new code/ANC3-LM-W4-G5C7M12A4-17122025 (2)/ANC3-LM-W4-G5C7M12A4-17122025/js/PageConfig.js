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
  20: { prev: 19, next: 21 },
  21: { prev: 20, next: 22 },
  22: { prev: 21, next: 23 },
  23: { prev: 22, next: 24 },
  24: { prev: 23, next: 25 },
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
        coordinates: [50, 125, 1025, 550], // Main text area
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
          highlights: [
            {
              text: "Komang's house is between Yohana's house and Lukas's house.",
              type: 'font',
              color: getCSSVariable('--highlight-color-1', '#FFD700'),
              // underline: true
            }
          ]
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
          factsArray: [
            {
              text: "Komang's house is in the middle",
              size: '28gc',
              color: getCSSVariable('--highlight-color-1', '#FFD700')
            }
          ],
          valueArray: [],
          toFindArray: [],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Textbox "Y" above House 1 (Yohana's house) - Disabled/Grayed out
      {
        id: 'page2-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 645, 330, 675], // At top of house 1, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#666666', // Grayed out
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced - Disabled/Grayed out
      {
        id: 'page2-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 575, 327, 775], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-house1-image',
          elementName: 'page2-house1-image',
          currentPage: 2,
          coordinates: [144, 575, 327, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 0.3 // Grayed out
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page2-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 645, 630, 675], // At top of house 2, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page2-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 575, 629, 775], // Bottom of question background, center position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-house2-image',
          elementName: 'page2-house-image',
          currentPage: 2,
          coordinates: [446, 575, 629, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "L" above House 3 (Lukas's house) - Disabled/Grayed out
      {
        id: 'page2-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 645, 940, 675], // At top of house 3, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#666666', // Grayed out
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right - Disabled/Grayed out
      {
        id: 'page2-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 575, 931, 775], // Bottom of question background, right position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-house3-image',
          elementName: 'page2-house3-image',
          currentPage: 2,
          coordinates: [748, 575, 931, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 0.3 // Grayed out
            }
          ]
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
        coordinates: [50, 125, 1025, 550], // Main text area
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
          highlights: [
            {
              text: "distance from Komang's house to Yohana's house is $1 \\frac{1}{2}$ km",
              type: 'font',
              color: getCSSVariable('--highlight-color-1', '#FFD700'),
            }
          ]
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
          factsArray: [
            {
              text: "Komang's house is in the middle",
              size: '28gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Yohana = $1 \\frac{1}{2}$ km",
              size: '28gc',
              color: getCSSVariable('--highlight-color-1', '#FFD700')
            }
          ],
          valueArray: [],
          toFindArray: [],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page3-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 645, 330, 675], // At top of house 1, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page3-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 575, 327, 775], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-house1-image',
          elementName: 'page3-house1-image',
          currentPage: 3,
          coordinates: [144, 575, 327, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page3-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 660, 440, 690], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page3-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [300, 715, 475, 740], // Positioned between house 1 and house 2, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-teal-double-arrow',
          elementName: 'page3-teal-double-arrow',
          currentPage: 3,
          coordinates: [330, 715, 440, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/tealDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page3-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 645, 630, 675], // At top of house 2, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page3-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 575, 629, 775], // Bottom of question background, center position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-house2-image',
          elementName: 'page3-house-image',
          currentPage: 3,
          coordinates: [446, 575, 629, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "L" above House 3 (Lukas's house) - Disabled/Grayed out
      {
        id: 'page3-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 645, 940, 675], // At top of house 3, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#666666', // Grayed out
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right - Disabled/Grayed out
      {
        id: 'page3-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 575, 931, 775], // Bottom of question background, right position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-house3-image',
          elementName: 'page3-house3-image',
          currentPage: 3,
          coordinates: [748, 575, 931, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 0.3 // Grayed out
            }
          ]
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
        coordinates: [50, 125, 1025, 550], // Main text area
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
          highlights: [
            {
              text: "the distance between Komang's house and Lukas's house is $2 \\frac{1}{4}$ km",
              type: 'font',
              color: getCSSVariable('--highlight-color-1', '#FFD700'),
            }
          ]
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
          factsArray: [
            {
              text: "Komang's house is in the middle",
              size: '28gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Yohana = $1 \\frac{1}{2}$ km",
              size: '28gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Lukas = $2 \\frac{1}{4}$ km",
              size: '28gc',
              color: getCSSVariable('--highlight-color-1', '#FFD700')
            }
          ],
          valueArray: [],
          toFindArray: [],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page4-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 645, 330, 675], // At top of house 1, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page4-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 575, 327, 775], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-house1-image',
          elementName: 'page4-house1-image',
          currentPage: 4,
          coordinates: [144, 575, 327, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page4-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 660, 440, 690], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page4-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [280, 705, 500, 740], // Positioned between house 1 and house 2, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-teal-double-arrow',
          elementName: 'page4-teal-double-arrow',
          currentPage: 4,
          coordinates: [330, 715, 450, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page4-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 645, 630, 675], // At top of house 2, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page4-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 575, 629, 775], // Bottom of question background, center position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-house2-image',
          elementName: 'page4-house-image',
          currentPage: 4,
          coordinates: [446, 575, 629, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page4-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 645, 940, 675], // At top of house 3, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page4-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [640, 660, 740, 690], // Positioned on top of teal arrow (between house 2 and house 3), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page4-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [600, 715, 785, 740], // Positioned between house 2 and house 3, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-teal-double-arrow-2',
          elementName: 'page4-teal-double-arrow-2',
          currentPage: 4,
          coordinates: [640, 715, 740, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/tealDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page4-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 575, 931, 775], // Bottom of question background, right position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-house3-image',
          elementName: 'page4-house3-image',
          currentPage: 4,
          coordinates: [748, 575, 931, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
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
        coordinates: [50, 125, 1025, 550], // Main text area
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
          highlights: [
            {
              text: "width of Komang's house is $\\frac{1}{200}$ km",
              type: 'font',
              color: getCSSVariable('--highlight-color-1', '#FFD700'),
            }
          ]
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
          factsArray: [
            {
              text: "Komang's house is in the middle",
              size: '26gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Yohana = $1 \\frac{1}{2}$ km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Lukas = $2 \\frac{1}{4}$ km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-1', '#FFD700')
            },
            {
              text: "Komang's house width = $\\frac{1}{200}$ km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-1', '#FFD700')
            },
          ],
          valueArray: [],
          toFindArray: [],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page5-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 645, 330, 675], // At top of house 1, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page5-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 575, 327, 775], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-house1-image',
          elementName: 'page5-house1-image',
          currentPage: 5,
          coordinates: [144, 575, 327, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page5-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 660, 440, 690], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page5-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [280, 705, 500, 740], // Positioned between house 1 and house 2, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-teal-double-arrow',
          elementName: 'page5-teal-double-arrow',
          currentPage: 5,
          coordinates: [330, 715, 440, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page5-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 645, 630, 675], // At top of house 2, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page5-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 575, 629, 775], // Bottom of question background, center position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-house2-image',
          elementName: 'page5-house-image',
          currentPage: 5,
          coordinates: [446, 575, 629, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Teal Double Arrow Image below house 2 (representing width)
      {
        id: 'page5-teal-double-arrow-width',
        name: 'teal-double-arrow-width',
        type: 'custom',
        coordinates: [465, 730, 617, 760], // Positioned below house 2, spanning its width, moved up by 25 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-teal-double-arrow-width',
          elementName: 'page5-teal-double-arrow-width',
          currentPage: 5,
          coordinates: [446, 760, 629, 785],
          zIndex: 59,
          images: [
            {
              src: 'assets/tealDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Width text "1/200 km" below teal arrow (below house 2)
      {
        id: 'page5-width-text',
        name: 'width-text',
        type: 'custom',
        coordinates: [446, 740, 629, 815], // Positioned below teal arrow (below house 2), moved up by 25 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color to match the arrow
          fontSize: '28gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page5-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 645, 940, 675], // At top of house 3, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page5-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [640, 660, 740, 690], // Positioned on top of teal arrow (between house 2 and house 3), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page5-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [595, 715, 790, 750], // Positioned between house 2 and house 3, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-teal-double-arrow-2',
          elementName: 'page5-teal-double-arrow-2',
          currentPage: 5,
          coordinates: [640, 715, 740, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page5-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 575, 931, 775], // Bottom of question background, right position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-house3-image',
          elementName: 'page5-house3-image',
          currentPage: 5,
          coordinates: [748, 575, 931, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
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
          text: getI18nText(
            'pages.page5.footerInstruction',
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
        coordinates: [50, 125, 1025, 550], // Main text area
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
          highlights: [
            {
              text: "how far is Yohana's house to Lukas's house?",
              type: 'font',
              color: getCSSVariable('--highlight-color-3', '#FFD700'),
            }
          ]
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
          factsArray: [
            {
              text: "Komang's house is in the middle",
              size: '26gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Yohana = $1 \\frac{1}{2}$ km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang to Lukas = $2 \\frac{1}{4}$ km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
            {
              text: "Komang's house width = $\\frac{1}{200}$ km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-2', '#FFD700')
            },
          ],
          valueArray: [],
          toFindArray: [,
            {
              text: "Yohana to Lucas = ??? km",
              size: '26gc',
              color: getCSSVariable('--highlight-color-3', '#FFD700')
            },],
          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page6-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 645, 330, 675], // At top of house 1, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page6-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 575, 327, 775], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-house1-image',
          elementName: 'page6-house1-image',
          currentPage: 6,
          coordinates: [144, 575, 327, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page6-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 660, 440, 690], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page6-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [280, 705, 500, 740], // Positioned between house 1 and house 2, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-teal-double-arrow',
          elementName: 'page6-teal-double-arrow',
          currentPage: 6,
          coordinates: [330, 715, 440, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page6-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 645, 630, 675], // At top of house 2, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page6-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 575, 629, 775], // Bottom of question background, center position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-house2-image',
          elementName: 'page6-house-image',
          currentPage: 6,
          coordinates: [446, 575, 629, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Teal Double Arrow Image below house 2 (representing width)
      {
        id: 'page6-teal-double-arrow-width',
        name: 'teal-double-arrow-width',
        type: 'custom',
        coordinates: [465, 730, 617, 760], // Positioned below house 2, spanning its width, moved up by 25 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-teal-double-arrow-width',
          elementName: 'page6-teal-double-arrow-width',
          currentPage: 6,
          coordinates: [446, 760, 629, 785],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Width text "1/200 km" below teal arrow (below house 2)
      {
        id: 'page6-width-text',
        name: 'width-text',
        type: 'custom',
        coordinates: [446, 740, 629, 815], // Positioned below teal arrow (below house 2), moved up by 25 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '28gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page6-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 645, 940, 675], // At top of house 3, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page6-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [640, 660, 740, 690], // Positioned on top of teal arrow (between house 2 and house 3), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page6-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [595, 715, 790, 750], // Positioned between house 2 and house 3, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-teal-double-arrow-2',
          elementName: 'page6-teal-double-arrow-2',
          currentPage: 6,
          coordinates: [640, 715, 740, 740],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page6-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 575, 931, 775], // Bottom of question background, right position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-house3-image',
          elementName: 'page6-house3-image',
          currentPage: 6,
          coordinates: [748, 575, 931, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Text "???" above salmon arrow (between house 1 and house 3)
      {
        id: 'page6-question-mark-text',
        name: 'question-mark-text',
        type: 'custom',
        coordinates: [500, 560, 585, 580], // Positioned above salmon arrow (between house 1 and house 3), moved up by 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '???',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: getCSSVariable('--highlight-color-3', '#F28283'), // Highlight color 3 (pink)
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Salmon Double Arrow Image between house 1 and house 3
      {
        id: 'page6-salmon-double-arrow',
        name: 'salmon-double-arrow',
        type: 'custom',
        coordinates: [250, 590, 775, 595], // Positioned between house 1 (ends at x=327) and house 3 (starts at x=748)
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-salmon-double-arrow',
          elementName: 'page6-salmon-double-arrow',
          currentPage: 6,
          coordinates: [250, 590, 775, 595], // Match container coordinates
          zIndex: 59,
          // containerBorder: '3px solid #ffffff', // Add white border to container
          containerBorderRadius: '0', // No border radius
          images: [
            {
              src: 'assets/salmonDoubleArrowLong.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0,
              scale: 0.85,
              objectFit: 'cover', // Make image fill the container width
              layerCoordinates: [175, 580, 910, 610], // Extend beyond container vertically to prevent clipping
            }
          ]
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
          text: getI18nText(
            'pages.page6.footerInstruction',
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 5'));
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
        coordinates: [5, 100, 1245, 400], // Adjust coordinates as needed
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
        id: 'page7-white-container',
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
        id: 'page7-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page7.footerInstruction',
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

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page7-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 195, 330, 225], // At top of house 1, moved up by another 50gc
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page7-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 125, 327, 325], // Bottom of question background, left position (equal spacing), moved up by another 50gc
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-house1-image',
          elementName: 'page7-house1-image',
          currentPage: 7,
          coordinates: [144, 125, 327, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page7-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 210, 440, 240], // Positioned on top of teal arrow (between house 1 and house 2), moved up by another 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page7-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [280, 265, 500, 300], // Positioned between house 1 and house 2, moved up by another 50gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-teal-double-arrow',
          elementName: 'page7-teal-double-arrow',
          currentPage: 7,
          coordinates: [330, 265, 440, 290],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page7-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 195, 630, 225], // At top of house 2, moved up by another 50gc
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page7-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 125, 629, 325], // Bottom of question background, center position (equal spacing), moved up by another 50gc
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-house2-image',
          elementName: 'page7-house-image',
          currentPage: 7,
          coordinates: [446, 125, 629, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Teal Double Arrow Image below house 2 (representing width)
      {
        id: 'page7-teal-double-arrow-width',
        name: 'teal-double-arrow-width',
        type: 'custom',
        coordinates: [460, 290, 620, 320], // Positioned below house 2, spanning its width, moved up by another 50gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-teal-double-arrow-width',
          elementName: 'page7-teal-double-arrow-width',
          currentPage: 7,
          coordinates: [446, 310, 629, 335], // Matching page 6 pattern, moved up by another 50gc
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Width text "1/200 km" below teal arrow (below house 2)
      {
        id: 'page7-width-text',
        name: 'width-text',
        type: 'custom',
        coordinates: [446, 310, 629, 375], // Positioned below teal arrow (below house 2), moved up by another 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page7-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 195, 940, 225], // At top of house 3, moved up by another 50gc
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page7-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [640, 210, 740, 240], // Positioned on top of teal arrow (between house 2 and house 3), moved up by another 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page7-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [600, 265, 788, 300], // Positioned between house 2 and house 3, moved up by another 50gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-teal-double-arrow-2',
          elementName: 'page7-teal-double-arrow-2',
          currentPage: 7,
          coordinates: [640, 265, 740, 290],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page7-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 125, 931, 325], // Bottom of question background, right position (equal spacing), moved up by another 50gc
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-house3-image',
          elementName: 'page7-house3-image',
          currentPage: 7,
          coordinates: [748, 125, 931, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Text "???" above salmon arrow (between house 1 and house 3)
      {
        id: 'page7-question-mark-text',
        name: 'question-mark-text',
        type: 'custom',
        coordinates: [175, 100, 910, 145], // Positioned above salmon arrow (between house 1 and house 3)
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '???',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: getCSSVariable('--highlight-color-3', '#F28283'), // Highlight color 3 (pink)
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Salmon Double Arrow Image between house 1 and house 3
      {
        id: 'page7-salmon-double-arrow',
        name: 'salmon-double-arrow',
        type: 'custom',
        coordinates: [250, 140, 775, 145], // Positioned between house 1 (ends at x=327) and house 3 (starts at x=748)
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-salmon-double-arrow',
          elementName: 'page7-salmon-double-arrow',
          currentPage: 7,
          coordinates: [175, 140, 910, 145], // Match container coordinates
          zIndex: 59,
          // containerBorder: '3px solid #ffffff', // Add white border to container
          containerBorderRadius: '0', // No border radius
          images: [
            {
              src: 'assets/salmonDoubleArrowLong.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0,
              scale: 0.85,
              objectFit: 'cover', // Make image fill the container width
              layerCoordinates: [175, 130, 910, 160], // Extend beyond container [175, 140, 910, 145] vertically to prevent clipping
            }
          ]
        }
      },

      // Button "Yohana to Lucas" - Pinkish-purple with light pink border
      {
        id: 'page7-yohana-to-lucas-button',
        name: 'yohana-to-lucas-button',
        type: 'custom',
        coordinates: [25, 475, 200, 575], // Positioned below houses, moved down by 75gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Yohana to<br>Lucas',
          backgroundColor: '#D946EF', // Pinkish-purple
          border: '2gc solid #F0A9F0', // Light pink border
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '28gc',
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
        coordinates: [220, 495, 280, 555], // Same height as box 4 (575-475=100gc), moved down by 75gc
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
        id: 'page7-fill-blanks',
        name: 'page7-fill-blanks-component',
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
              { id: 'blank1', coordinate: [300, 470, 500, 580], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
              // blank2 -> box2: smaller box, to the right of first with gap (height: 60 -> 66)
              { id: 'blank2', coordinate: [530, 492, 600, 558], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
              // blank3 -> box3: larger box, similar to first, to the right of second with gap (height: 100 -> 110)
              { id: 'blank3', coordinate: [630, 470, 830, 580], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
              // blank4 -> box4: smaller box, to the right of third with gap (height: 60 -> 66)
              { id: 'blank4', coordinate: [860, 492, 930, 558], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
              // blank5 -> box5: largest box, extending further right (height: 100 -> 110)
              { id: 'blank5', coordinate: [960, 470, 1200, 580], text: "", image: "", bgColor: '#4A5568', borderColor: '#F5E6D3', bgBlink: false },
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
                'pages.page7.optionOpt1Text',
                "Komang's house<br>to<br>Yohana's house"
              ),
              image: '',
              blankID: ['blank1', 'blank3', 'blank5'],
              feedbackText: getI18nText(
                'pages.page7.optionOpt1Feedback',
                'Correct! This is the distance from Komang to Yohana house.'
              ),
              coordinate: [1295, 110, 1520, 235]
            }, // Moved up by 150gc
            // Row 2: Yohana to Lucas - can be dropped into blank1, blank3, or blank5
            {
              id: 'opt2',
              text: getI18nText(
                'pages.page7.optionOpt2Text',
                "Yohana's house<br>to<br>Lukas' house"
              ),
              image: '',
              blankID: ['blank1', 'blank3', 'blank5'],
              feedbackText: getI18nText(
                'pages.page7.optionOpt2Feedback',
                'Correct! This is the distance from Yohana to Lukas house.'
              ),
              coordinate: [1295, 245, 1520, 370]
            }, // Moved up by 150gc
            // Row 3: Komang's house width - can be dropped into blank1, blank3, or blank5
            {
              id: 'opt3',
              text: getI18nText(
                'pages.page7.optionOpt3Text',
                "Width of<br>Komang's house"
              ),
              image: '',
              blankID: ['blank1', 'blank3', 'blank5'],
              feedbackText: getI18nText(
                'pages.page7.optionOpt3Feedback',
                'Correct! This is the width of Komang house.'
              ),
              coordinate: [1295, 380, 1520, 505]
            }, // Moved up by 150gc
            // Row 4: one plus and one minus (aligned with opt1, opt2, opt3)
            {
              id: 'opt4',
              text: '+',
              image: '',
              blankID: ['blank2', 'blank4'],
              feedbackText: getI18nText(
                'pages.page7.optionPlusCorrectFeedback',
                'Correct!'
              ),
              coordinate: [1320, 515, 1395, 590]
            }, // 75x75 square, moved up by 150gc
            {
              id: 'opt5',
              text: '-',
              image: '',
              blankID: null,
              feedbackText: getI18nText(
                'pages.page7.optionMinusNotNeededFeedback',
                'This operator is not needed here.'
              ),
              coordinate: [1420, 515, 1495, 590]
            }, // 75x75 square, moved up by 150gc
            // Row 5: one plus and one minus (aligned with opt1, opt2, opt3)
            {
              id: 'opt6',
              text: '+',
              image: '',
              blankID: ['blank2', 'blank4'],
              feedbackText: getI18nText(
                'pages.page7.optionPlusCorrectFeedback',
                'Correct!'
              ),
              coordinate: [1320, 605, 1395, 680]
            }, // 75x75 square, moved up by 150gc
            {
              id: 'opt7',
              text: '-',
              image: '',
              blankID: null,
              feedbackText: getI18nText(
                'pages.page7.optionMinusNotNeededFeedback',
                'This operator is not needed here.'
              ),
              coordinate: [1420, 605, 1495, 680]
            }, // 75x75 square, moved up by 150gc
          ],
          impFormulae: []
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

      // Second Tap Animation GIF - near first blank box
      {
        id: 'page7-tap-animation-2',
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
        coordinates: [363, 25, 550, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page8-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page8-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page8-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page8-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
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
          steps: [
            'Convert mixed numbers into improper fractions.',
            'Add improper fractions.',
            'Convert the result back to a mixed number.'
          ],
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
        coordinates: [350, 17, 550, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page9-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page9-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page9-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page9-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

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
          headerText: 'Mixed Number Addition',
          currentStep: 1,
          currentSubStep: 1,
          collapsible: false,
          steps: [
            {
              text: 'Convert mixed numbers into improper fractions',
              subSteps: []
            },
            {
              text: 'Add the resulting Improper Fractions',
              subSteps: []
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

      // Title: "Improper Fraction Notation"
      {
        id: 'page9-mixed-number-title',
        name: 'mixed-number-title',
        type: 'custom',
        coordinates: [5, 300, 1075, 350],
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
          options: [
            // Option 1: "whole part" - #477F98, horizontal button on the left (can go to blank1 or blank2, maxDrops: 1)
            { id: 'opt1', text: 'whole part', image: '', blankID: ['blank1', 'blank2'], maxDrops: 1, feedbackText: 'Correct!', coordinate: [150, 400, 375, 475], buttonColor: '#477F98' },
            // Option 2: "numerator" - #905D7B, above fraction bar, reduced by 25gc (275x75)
            { id: 'opt2', text: 'numerator', image: '', blankID: ['blank3'], feedbackText: 'Correct!', coordinate: [400, 353, 675, 428], buttonColor: '#905D7B' },
            // Option 3: "denominator" - #838574, below fraction bar, reduced by 25gc (275x75) (can go to blank1, blank2, blank3, or blank4, maxDrops: 2)
            { id: 'opt3', text: 'denominator', image: '', blankID: ['blank1', 'blank2', 'blank3', 'blank4'], maxDrops: 2, feedbackText: 'Correct!', coordinate: [400, 450, 675, 525], buttonColor: '#838574' },
            // Option 4: "+" - #F9A52F, square button stacked vertically on the right (top)
            { id: 'opt4', text: '+', image: '', blankID: ['blank-plus'], feedbackText: 'Correct!', coordinate: [900, 360, 960, 420], buttonColor: '#F9A52F' },
            // Option 5: "×" - #F9A52F, square button stacked vertically on the right (bottom)
            { id: 'opt5', text: '×', image: '', blankID: ['blank-times'], feedbackText: 'Correct!', coordinate: [900, 450, 960, 510], buttonColor: '#F9A52F' },
          ],
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
          imageAlt: 'Tap'
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
        coordinates: [363, 25, 550, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page10-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page10-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page10-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page10-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Arrange Steps Component
      {
        id: 'page10-arrange-steps',
        name: 'arrange-steps',
        type: 'custom',
        coordinates: [5, 150, 1075, 815], // Between equation and solution steps, above next button
        zIndex: 60,
        props: {
          componentType: 'ArrangeStepsComponent',
          steps: [
            'Convert into Like Fractions',
            'Find LCM of denominators',
            'Add resultant Like Fractions'
          ],
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
          instructionText: 'What is the correct formula for converting mixed to improper?',
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
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 0,
          collapsible: true,
          subStepsCollapsible: false, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: false, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap'
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
          text: "Rearrange the buttons to the correct sequence of steps",
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
        coordinates: [363, 25, 588, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.0',
          whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page11-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page11-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page11-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page11-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page11-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Quiz Panel Component - QT4R (4 options in vertical layout)
      {
        id: 'page11-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [5, 150, 1075, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page11-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: "Tap the correct option to find the LCM of given numbers.",
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 75,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '26gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: [
            {
              text: "Subtraction of prime numbers that helps to divide given numbers to reach 1.",
              iscorrect: false,
              feedback: "Incorrect. Subtraction is not used in finding LCM. LCM is found by multiplying prime factors, not subtracting them.",
            },
            {
              text: "Addition of prime numbers that helps to divide given numbers to reach 1.",
              iscorrect: false,
              feedback: "Incorrect. Addition is not used in finding LCM. LCM requires multiplying the prime factors, not adding them.",
            },
            {
              text: "Product of prime numbers that helps to divide given numbers to reach 1.",
              iscorrect: true,
              feedback: "Correct! LCM is found by taking the product (multiplication) of all prime factors with their highest powers that appear in the given numbers.",
            },
            {
              text: "Division of prime numbers that helps to divide given numbers to reach 1.",
              iscorrect: false,
              feedback: "Incorrect. Division is used to find prime factors, but LCM itself is the product of those prime factors, not their division.",
            }
          ],
          keyConcepts: [],
          impFormulae: []
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
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap'
        }
      },



      // Instruction Text - "Rearrange the buttons to the correct sequence of steps"
      {
        id: 'page11-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: "Rearrange the buttons to the correct sequence of steps",
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 12'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 10'));
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
        coordinates: [363, 25, 588, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.0',
          whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page12-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page12-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page12-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page12-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page12-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Quiz Panel Component - QT4R (4 options in vertical layout)
      {
        id: 'page12-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [5, 150, 1075, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page12-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: "Tap the correct option to convert unlike fractions into like fractions.",
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 75,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '26gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: [
            {
              text: "Find equivalent fractions with LCM as the denominator.",
              iscorrect: true,
              feedback: "Correct! To convert unlike fractions into like fractions, we find equivalent fractions using the LCM (Least Common Multiple) of the denominators as the common denominator.",
            },
            {
              text: "Find equivalent fractions with HCF as the denominator.",
              iscorrect: false,
              feedback: "Incorrect. HCF (Highest Common Factor) is used to simplify fractions, not to convert unlike fractions into like fractions. We use LCM as the common denominator.",
            },
            {
              text: "Find equivalent fractions with LCM as the numerator.",
              iscorrect: false,
              feedback: "Incorrect. LCM is used as the denominator (not numerator) to convert unlike fractions into like fractions. The numerators are adjusted to make equivalent fractions.",
            },
            {
              text: "Find equivalent fractions with HCF as the numerator.",
              iscorrect: false,
              feedback: "Incorrect. HCF is not used to convert unlike fractions into like fractions. We use LCM as the common denominator, and the numerators are adjusted accordingly.",
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Solution Steps Component
      {
        id: 'page12-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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



      // Instruction Text - "Rearrange the buttons to the correct sequence of steps"
      {
        id: 'page12-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page12.footerInstruction',
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 13'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 11'));
              }
            }
          }
        }
      }
    ],

    13: [

      // Equation Background
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

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page13-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [363, 25, 588, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.0',
          whiteSpace: 'nowrap'
        }
      },

      // Equals sign
      {
        id: 'page13-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page13-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page13-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page13-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page13-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Quiz Panel Component - QT4R (4 options in vertical layout)
      {
        id: 'page13-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [5, 150, 1075, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page13-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: "Tap the correct option to add like fractions.",
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 75,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '26gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: [
            {
              text: "Add both numerators and denominators.",
              feedback: "Incorrect. When adding like fractions, we only add the numerators, not the denominators. The denominator stays the same.",
              iscorrect: false
            },
            {
              text: "Add numerators and keep the denominator the same.",
              feedback: "Correct! When adding like fractions, we add the numerators together and keep the denominator the same.",
              iscorrect: true
            },
            {
              text: "Add denominators and keep the numerator the same.",
              feedback: "Incorrect. When adding like fractions, we add the numerators (not denominators) and keep the denominator the same.",
              iscorrect: false
            },
            {
              text: "None of these.",
              feedback: "Incorrect. The correct method is to add the numerators and keep the denominator the same when adding like fractions.",
              iscorrect: false
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Solution Steps Component
      {
        id: 'page13-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap'
        }
      },



      // Instruction Text - "Rearrange the buttons to the correct sequence of steps"
      {
        id: 'page13-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: "Rearrange the buttons to the correct sequence of steps",
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 14'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 12'));
              }
            }
          }
        }
      }
    ],

    14: [

      // Header Text - "What is the correct order of steps for adding Improper Fractions?"
      {
        id: 'page14-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 200, 1075, 250], // Header bar at top (same as page 8)
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page14.headerText',
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

      // Distance equation: Komang to Lucas = 1 1/2 + 1/200 + 2 1/4 km
      // Centered between 0 and 1600
      {
        id: 'page14-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [350, 17, 550, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page14-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page14-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page14-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page14-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Instruction Text - "Drag the correct terms to make the improper fraction"
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
        id: 'page14-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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

      // Title: "Improper Fraction Notation"
      {
        id: 'page14-mixed-number-title',
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
        id: 'page14-mixed-number-fraction-container',
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
        id: 'page14-improper-fraction-title',
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
        id: 'page14-improper-fraction-container',
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
        id: 'page14-fill-blanks',
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
          options: [
            // Option 1: "numerator" - #477F98, left side top (inside mixed-fraction container) - not used in correct answer
            { id: 'opt1', text: 'numerator', image: '', blankID: [], feedbackText: 'Incorrect!', coordinate: [320, 350, 520, 430], buttonColor: '#477F98' },
            // Option 2: "denominator" - #838574, left side bottom (inside mixed-fraction container) - goes to blank3 (bottom right)
            { id: 'opt2', text: 'denominator', image: '', blankID: ['blank3'], feedbackText: 'Correct!', coordinate: [320, 450, 520, 530], buttonColor: '#838574' },
            // Option 3: "quotient" - #905D7B, right side top (inside mixed-fraction container) - goes to blank1 (left)
            { id: 'opt3', text: 'quotient', image: '', blankID: ['blank1'], feedbackText: 'Correct!', coordinate: [640, 350, 820, 430], buttonColor: '#905D7B' },
            // Option 4: "remainder" - #F9A52F, right side bottom (inside mixed-fraction container) - goes to blank2 (top right)
            { id: 'opt4', text: 'remainder', image: '', blankID: ['blank2'], feedbackText: 'Correct!', coordinate: [640, 450, 820, 530], buttonColor: '#F9A52F' },
          ],
          impFormulae: []
        }
      },

      // White horizontal line between the two right blanks
      {
        id: 'page14-blanks-separator',
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
        id: 'page14-options-separator',
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
        id: 'page14-options-fraction-bar',
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
        id: 'page14-tap-animation',
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
        id: 'page14-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 13'));
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
        coordinates: [200, 125, 275, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [303, 125, 353, 225], // Shifted further left by 50gc
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
        coordinates: [358, 125, 508, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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
        id: 'page15-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [513, 125, 563, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 125, 698, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page15-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [703, 125, 753, 225], // Reduced gap - moved 40gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page15-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [758, 125, 908, 225], // Reduced gap - moved 50gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page15-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [913, 125, 983, 225], // Reduced gap - moved 60gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },


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
        coordinates: [303, 275, 353, 375], // Width: 50, Height: 100, moved down 25gc
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
        id: 'page15-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [358, 275, 508, 375], // X coordinates match page15-number-box-1, Width: 150, Height: 100, moved down 25gc
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
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">3</span><span style="display: block; padding: 0 2px;">2</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page15-number-box-1',
          onFlipHideTargetId: 'page15-tap-animation-working-box-1'
        }
      },

      // Tap Animation on working-box-1
      {
        id: 'page15-tap-animation-working-box-1',
        name: 'tap-animation-working-box-1',
        type: 'custom',
        coordinates: [373, 325, 423, 375], // Centered on top of working-box-1, moved down 25gc and left 20gc
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
        id: 'page15-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [513, 275, 563, 375], // X coordinates match page15-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 275, 698, 375], // X coordinates match page15-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page15-working-plus-2',
        name: 'working-plus-2',
        type: 'custom',
        coordinates: [703, 275, 753, 375], // X coordinates match page15-plus-sign-2, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page15-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [758, 275, 908, 375], // X coordinates match page15-number-box-3, Width: 150, Height: 100, moved down 25gc
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
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">9</span><span style="display: block; padding: 0 2px;">4</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page15-number-box-3',
          onFlipHideTargetId: 'page15-tap-animation-working-box-2'
        }
      },

      // Tap Animation on working-box-2
      {
        id: 'page15-tap-animation-working-box-2',
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

      // Unit: km
      {
        id: 'page15-working-unit-km',
        name: 'working-unit-km',
        type: 'custom',
        coordinates: [913, 275, 983, 375], // X coordinates match page15-unit-km, Width: 70, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Black container background for conversion display

      // // Black container background for conversion display
      // {
      //   id: 'page15-conversion-background',
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
      //   id: 'page15-mixed-number-text',
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
      //   id: 'page15-conversion-equals',
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
      //   id: 'page15-numerator-box',
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
      //   id: 'page15-fraction-bar',
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
      //   id: 'page15-denominator-box',
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
      //   id: 'page15-fraction-conversion-controller',
      //   name: 'fraction-conversion-controller',
      //   type: 'custom',
      //   coordinates: [0, 0, 1, 1], // Hidden component, no visual presence
      //   zIndex: 1,
      //   props: {
      //     componentType: 'FractionConversionController',
      //     pageId: 'page15',
      //     // Fraction 1: 1 1/2 = 3/2
      //     fraction1: {
      //       mixedWhole: 1,
      //       mixedNumerator: 1,
      //       mixedDenominator: 2,
      //       improperNumerator: 3,
      //       improperDenominator: 2,
      //       numberBoxId: 'page15-number-box-1',
      //       workingBoxId: 'page15-working-box-1'
      //     },
      //     // Fraction 2: 2 1/4 = 9/4
      //     fraction2: {
      //       mixedWhole: 2,
      //       mixedNumerator: 1,
      //       mixedDenominator: 4,
      //       improperNumerator: 9,
      //       improperDenominator: 4,
      //       numberBoxId: 'page15-number-box-3',
      //       workingBoxId: 'page15-working-box-2'
      //     },
      //     mixedNumberTextId: 'page15-mixed-number-text',
      //     numeratorBoxId: 'page15-numerator-box',
      //     denominatorBoxId: 'page15-denominator-box',
      //     highlightColor: '#F59E0B',
      //     correctColor: '#22C55E',
      //     defaultBgColor: '#4A5568',
      //     activeBorderColor: '#FF8C00'
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
          headerText: 'Mixed Number Addition',
          currentStep: 1,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page15-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page15.instructionRevealConversions',
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 14'));
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
        coordinates: [200, 125, 275, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [303, 125, 353, 225], // Shifted further left by 50gc
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
        coordinates: [358, 125, 508, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page16-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [513, 125, 563, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 125, 698, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page16-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [703, 125, 753, 225], // Reduced gap - moved 40gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page16-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [758, 125, 908, 225], // Reduced gap - moved 50gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page16-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [913, 125, 983, 225], // Reduced gap - moved 60gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },


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
        coordinates: [303, 275, 353, 375], // Width: 50, Height: 100, moved down 25gc
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
        coordinates: [358, 275, 508, 375], // X coordinates match page16-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #FFA500;">2</span></span>',
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
        id: 'page16-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [513, 275, 563, 375], // X coordinates match page16-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page16-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [568, 275, 698, 375], // X coordinates match page16-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #FFA500;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page16-working-plus-2',
        name: 'working-plus-2',
        type: 'custom',
        coordinates: [703, 275, 753, 375], // X coordinates match page16-plus-sign-2, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second placeholder box: 9/4
      {
        id: 'page16-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [758, 275, 908, 375], // X coordinates match page16-number-box-3, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #FFA500;">4</span></span>',
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

      // Unit: km
      {
        id: 'page16-working-unit-km',
        name: 'working-unit-km',
        type: 'custom',
        coordinates: [913, 275, 983, 375], // X coordinates match page16-unit-km, Width: 70, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Black container background for conversion display

      // LCM Button
      {
        id: 'page16-lcm-button',
        name: 'lcm-button',
        type: 'button',
        coordinates: [450, 425, 850, 525], // Horizontal orange button
        zIndex: 70,
        props: {
          text: 'LCM of 2, 200 and 4',
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
                window.changePageAndNotify(17);
              } else if (window.navigateToPage) {
                window.navigateToPage(17);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 17 } }));
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
        id: 'page16-tap-animation-lcm-button',
        name: 'tap-animation-lcm-button',
        type: 'custom',
        coordinates: [920, 415, 970, 465], // Positioned on left side of button, pointing to "LCM"
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
      //   id: 'page16-lcm-question',
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
      //   id: 'page16-lcm-box',
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
      //   id: 'page16-lcm-controller',
      //   name: 'lcm-controller',
      //   type: 'custom',
      //   coordinates: [0, 0, 1, 1], // Hidden component, no visual presence
      //   zIndex: 1,
      //   props: {
      //     componentType: 'LCMInputController',
      //     pageId: 'page16',
      //     lcmBoxId: 'page16-lcm-box',
      //     correctAnswer: 200,
      //     correctColor: '#22C55E',
      //     activeBorderColor: '#FF8C00'
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
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap'
        }
      },



      // Instruction Text - "Enter the improper form of the first fraction using the numpad"
      {
        id: 'page16-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page16.footerInstruction',
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
        id: 'page16-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 15'));
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
        coordinates: [200, 125, 275, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [303, 125, 353, 225], // Shifted further left by 50gc
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
        coordinates: [358, 125, 508, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page17-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [513, 125, 563, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 125, 698, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page17-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [703, 125, 753, 225], // Reduced gap - moved 40gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page17-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [758, 125, 908, 225], // Reduced gap - moved 50gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page17-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [913, 125, 983, 225], // Reduced gap - moved 60gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },


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
        coordinates: [303, 275, 353, 375], // Width: 50, Height: 100, moved down 25gc
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

      // First working box: 3/2
      {
        id: 'page17-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [358, 275, 508, 375], // X coordinates match page17-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          backgroundColor: '#4A5568', // Dark grey/semi-transparent brown background
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
        coordinates: [513, 275, 563, 375], // X coordinates match page17-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 275, 698, 375], // X coordinates match page17-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page17-working-plus-2',
        name: 'working-plus-2',
        type: 'custom',
        coordinates: [703, 275, 753, 375], // X coordinates match page17-plus-sign-2, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second working box: 9/4
      {
        id: 'page17-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [758, 275, 908, 375], // X coordinates match page17-number-box-3, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page17-working-unit-km',
        name: 'working-unit-km',
        type: 'custom',
        coordinates: [913, 275, 983, 375], // X coordinates match page17-unit-km, Width: 70, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

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
        coordinates: [303, 425, 353, 525], // Width: 50, Height: 100
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
        coordinates: [358, 425, 508, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">?</span><span style="display: block; padding: 0 4px; color: #20B2AA;">200</span></span>',
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
        id: 'page17-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [513, 425, 563, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 425, 698, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #20B2AA;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page17-third-plus-2',
        name: 'third-plus-2',
        type: 'custom',
        coordinates: [703, 425, 753, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third fraction box: ?/200 (dark gray background)
      {
        id: 'page17-third-box-3',
        name: 'third-box-3',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">?</span><span style="display: block; padding: 0 4px; color: #20B2AA;">200</span></span>',
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

      // Unit: km
      {
        id: 'page17-third-unit-km',
        name: 'third-unit-km',
        type: 'custom',
        coordinates: [913, 425, 983, 525], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Black container background for conversion display

      // Black container background for conversion display
      // {
      //   id: 'page17-conversion-background',
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

      // // Improper Fraction Display (e.g., "3/2")
      // {
      //   id: 'page17-mixed-number-text',
      //   name: 'mixed-number-text',
      //   type: 'custom',
      //   coordinates: [905, 180, 1000, 230], // Centrally aligned vertically
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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
      //   id: 'page17-conversion-equals',
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

      // // Numerator box (empty, white background, orange border)
      // {
      //   id: 'page17-numerator-box',
      //   name: 'numerator-box',
      //   type: 'custom',
      //   coordinates: [1030, 125, 1110, 193], // Centrally aligned vertically with fraction
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '', // Empty for user input
      //     backgroundColor: '#ffffff', // White background
      //     border: '3px solid #FF8C00', // Thick orange border (3gc)
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
      //   id: 'page17-fraction-bar',
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

      // // Denominator box (shows "200", white text)
      // {
      //   id: 'page17-denominator-box',
      //   name: 'denominator-box',
      //   type: 'custom',
      //   coordinates: [1040, 216, 1100, 284], // Adjusted to start after fraction bar, centrally aligned
      //   zIndex: 60,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '200', // Shows LCM (200)
      //     backgroundColor: 'transparent', // Transparent background
      //     border: 'none', // No border
      //     borderRadius: '0gc',
      //     textColor: '#ffffff', // White text
      //     fontSize: '36gc',
      //     padding: '10gc',
      //     textAlign: 'center',
      //     lineHeight: '1.0'
      //   }
      // },

      // // Fraction Conversion Controller - manages the interactive flow
      // {
      //   id: 'page17-fraction-conversion-controller',
      //   name: 'fraction-conversion-controller',
      //   type: 'custom',
      //   coordinates: [0, 0, 1, 1], // Hidden component, no visual presence
      //   zIndex: 1,
      //   props: {
      //     componentType: 'FractionConversionController',
      //     pageId: 'page17',
      //     // Fraction 1: 1 1/2 = 3/2
      //     fraction1: {
      //       mixedWhole: 1,
      //       mixedNumerator: 1,
      //       mixedDenominator: 2,
      //       improperNumerator: 3,
      //       improperDenominator: 2,
      //       numberBoxId: 'page17-number-box-1',
      //       workingBoxId: 'page17-working-box-1'
      //     },
      //     // Fraction 2: 2 1/4 = 9/4
      //     fraction2: {
      //       mixedWhole: 2,
      //       mixedNumerator: 1,
      //       mixedDenominator: 4,
      //       improperNumerator: 9,
      //       improperDenominator: 4,
      //       numberBoxId: 'page17-number-box-3',
      //       workingBoxId: 'page17-working-box-2'
      //     },
      //     mixedNumberTextId: 'page17-mixed-number-text',
      //     numeratorBoxId: 'page17-numerator-box',
      //     denominatorBoxId: 'page17-denominator-box',
      //     highlightColor: '#F59E0B',
      //     correctColor: '#22C55E',
      //     defaultBgColor: '#4A5568',
      //     activeBorderColor: '#FF8C00'
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
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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



      // Instruction Text - "Tap » for Step 2.b"
      {
        id: 'page17-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page17.footerInstruction',
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
        id: 'page17-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
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
        coordinates: [200, 125, 275, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [303, 125, 353, 225], // Shifted further left by 50gc
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
        coordinates: [358, 125, 508, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page18-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [513, 125, 563, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 125, 698, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page18-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [703, 125, 753, 225], // Reduced gap - moved 40gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page18-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [758, 125, 908, 225], // Reduced gap - moved 50gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page18-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [913, 125, 983, 225], // Reduced gap - moved 60gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },


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
        coordinates: [303, 275, 353, 375], // Width: 50, Height: 100, moved down 25gc
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

      // First working box: 3/2
      {
        id: 'page18-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [358, 275, 508, 375], // X coordinates match page18-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          backgroundColor: '#4A5568', // Dark grey/semi-transparent brown background
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
        coordinates: [513, 275, 563, 375], // X coordinates match page18-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 275, 698, 375], // X coordinates match page18-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page18-working-plus-2',
        name: 'working-plus-2',
        type: 'custom',
        coordinates: [703, 275, 753, 375], // X coordinates match page18-plus-sign-2, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second working box: 9/4
      {
        id: 'page18-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [758, 275, 908, 375], // X coordinates match page18-number-box-3, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page18-working-unit-km',
        name: 'working-unit-km',
        type: 'custom',
        coordinates: [913, 275, 983, 375], // X coordinates match page18-unit-km, Width: 70, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

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
        coordinates: [303, 425, 353, 525], // Width: 50, Height: 100
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

      // First fraction box: 300/200 (brown, slightly translucent)
      {
        id: 'page18-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [358, 425, 508, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">300</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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
        id: 'page18-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [513, 425, 563, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second fraction box: 1/200 (dark blue, slightly translucent)
      {
        id: 'page18-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [568, 425, 698, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page18-third-plus-2',
        name: 'third-plus-2',
        type: 'custom',
        coordinates: [703, 425, 753, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third fraction box: 450/200 (dark blue, slightly translucent)
      {
        id: 'page18-third-box-3',
        name: 'third-box-3',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">450</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Unit: km
      {
        id: 'page18-third-unit-km',
        name: 'third-unit-km',
        type: 'custom',
        coordinates: [913, 425, 983, 525], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

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
        coordinates: [303, 575, 353, 675], // Width: 50, Height: 100
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
        id: 'page18-fourth-box',
        name: 'fourth-box',
        type: 'custom',
        coordinates: [358, 575, 508, 675], // Width: 150, Height: 100
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
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">751</span><span style="display: block; padding: 0 2px; color: #20B2AA;">200</span></span>',
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
            // When flipped, change all three third boxes to original dark gray background
            if (isFlipped) {
              const box1 = document.getElementById('page18-third-box-1');
              const box2 = document.getElementById('page18-third-box-2');
              const box3 = document.getElementById('page18-third-box-3');
              if (box1) box1.style.backgroundColor = 'rgba(74, 85, 104, 0.7)';
              if (box2) box2.style.backgroundColor = 'rgba(74, 85, 104, 0.7)';
              if (box3) box3.style.backgroundColor = 'rgba(74, 85, 104, 0.7)';
            }
          }
        }
      },

      // Tap Animation on fourth-box
      {
        id: 'page18-tap-animation-fourth-box',
        name: 'tap-animation-fourth-box',
        type: 'custom',
        coordinates: [373, 625, 423, 675], // Centered on top of fourth-box, moved down 25gc and left 20gc
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
      {
        id: 'page18-fourth-unit-km',
        name: 'fourth-unit-km',
        type: 'custom',
        coordinates: [513, 575, 583, 675], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Solution Steps Component
      {
        id: 'page18-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 3,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap'
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
          text: getI18nText('pages.page18.instructionRevealSum', "Tap '?' to reveal the sum"),
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
            'pages.page19.headerInitial',
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
        coordinates: [200, 125, 275, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        coordinates: [303, 125, 353, 225], // Shifted further left by 50gc
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
        coordinates: [358, 125, 508, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page19-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [513, 125, 563, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 125, 698, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page19-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [703, 125, 753, 225], // Reduced gap - moved 40gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page19-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [758, 125, 908, 225], // Reduced gap - moved 50gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page19-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [913, 125, 983, 225], // Reduced gap - moved 60gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },


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
        coordinates: [303, 275, 353, 375], // Width: 50, Height: 100, moved down 25gc
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

      // First working box: 3/2
      {
        id: 'page19-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [358, 275, 508, 375], // X coordinates match page19-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          backgroundColor: '#4A5568', // Dark grey/semi-transparent brown background
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
        coordinates: [513, 275, 563, 375], // X coordinates match page19-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        coordinates: [568, 275, 698, 375], // X coordinates match page19-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page19-working-plus-2',
        name: 'working-plus-2',
        type: 'custom',
        coordinates: [703, 275, 753, 375], // X coordinates match page19-plus-sign-2, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second working box: 9/4
      {
        id: 'page19-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [758, 275, 908, 375], // X coordinates match page19-number-box-3, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page19-working-unit-km',
        name: 'working-unit-km',
        type: 'custom',
        coordinates: [913, 275, 983, 375], // X coordinates match page19-unit-km, Width: 70, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

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
        coordinates: [303, 425, 353, 525], // Width: 50, Height: 100
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

      // First fraction box: 300/200 (brown, slightly translucent)
      {
        id: 'page19-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [358, 425, 508, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">300</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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
        id: 'page19-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [513, 425, 563, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second fraction box: 1/200 (dark blue, slightly translucent)
      {
        id: 'page19-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [568, 425, 698, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page19-third-plus-2',
        name: 'third-plus-2',
        type: 'custom',
        coordinates: [703, 425, 753, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third fraction box: 450/200 (dark blue, slightly translucent)
      {
        id: 'page19-third-box-3',
        name: 'third-box-3',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">450</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Unit: km
      {
        id: 'page19-third-unit-km',
        name: 'third-unit-km',
        type: 'custom',
        coordinates: [913, 425, 983, 525], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

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
        coordinates: [303, 575, 353, 675], // Width: 50, Height: 100
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
        coordinates: [358, 575, 508, 675], // Width: 150, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">751</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Unit: km (after 751/200)
      {
        id: 'page19-fourth-unit-km-1',
        name: 'fourth-unit-km-1',
        type: 'custom',
        coordinates: [513, 575, 583, 675], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Equals sign (second)
      {
        id: 'page19-fourth-equals-2',
        name: 'fourth-equals-2',
        type: 'custom',
        coordinates: [588, 575, 638, 675], // Width: 50, Height: 100
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
        coordinates: [643, 575, 775, 675], // Width: 132, Height: 100
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
          backHtml: '<span style="color: #ffffff;">3</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">151</span><span style="display: block; padding: 0 2px; color: #ffffff;">200</span></span>',
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
              const fractionBox = document.getElementById('page19-fourth-fraction-box');
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
        coordinates: [658, 625, 708, 675], // Centered on top of fourth-box, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.3 // 30% opacity
        }
      },

      // Unit: km (final)
      {
        id: 'page19-fourth-unit-km',
        name: 'fourth-unit-km',
        type: 'custom',
        coordinates: [780, 575, 850, 675], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Solution Steps Component
      {
        id: 'page19-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 3,
          currentSubStep: 1,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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
          imageAlt: 'Tap'
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
          text: getI18nText('pages.page19.instructionRevealConversion', "Tap '?' to reveal the conversion of result"),
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
        coordinates: [50, 125, 1025, 550], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          highlights: [
            {
              text: "how far is Yohana's house to Lukas's house?",
              type: 'font',
              color: getCSSVariable('--highlight-color-3', '#FFD700'),
            }
          ]
        }
      },

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page20-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 595, 330, 625], // At top of house 1, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page20-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 540, 327, 740], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-house1-image',
          elementName: 'page20-house1-image',
          currentPage: 20,
          coordinates: [144, 540, 327, 740],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page20-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 625, 440, 655], // Positioned on top of teal arrow (between house 1 and house 2), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page20-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [330, 680, 440, 705], // Positioned between house 1 and house 2, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-teal-double-arrow',
          elementName: 'page20-teal-double-arrow',
          currentPage: 20,
          coordinates: [330, 680, 440, 705],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page20-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 595, 630, 625], // At top of house 2, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page20-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 540, 629, 740], // Bottom of question background, center position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-house2-image',
          elementName: 'page20-house2-image',
          currentPage: 20,
          coordinates: [446, 540, 629, 740],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Teal Double Arrow Image below house 2 (representing width)
      {
        id: 'page20-teal-double-arrow-width',
        name: 'teal-double-arrow-width',
        type: 'custom',
        coordinates: [465, 705, 617, 735], // Positioned below house 2, spanning its width, moved up by 25 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-teal-double-arrow-width',
          elementName: 'page20-teal-double-arrow-width',
          currentPage: 20,
          coordinates: [446, 725, 629, 750],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Width text "1/200 km" below teal arrow (below house 2)
      {
        id: 'page20-width-text',
        name: 'width-text',
        type: 'custom',
        coordinates: [446, 725, 629, 790], // Positioned below teal arrow (below house 2), moved up by 25 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page20-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 595, 940, 625], // At top of house 3, moved down by 100
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page20-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [640, 625, 740, 655], // Positioned on top of teal arrow (between house 2 and house 3), moved down by 20 gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF', // Teal color to match the arrow
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page20-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [640, 680, 740, 705], // Positioned between house 2 and house 3, moved down by another 20 gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-teal-double-arrow-2',
          elementName: 'page20-teal-double-arrow-2',
          currentPage: 20,
          coordinates: [640, 680, 740, 705],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page20-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 540, 931, 740], // Bottom of question background, right position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-house3-image',
          elementName: 'page20-house3-image',
          currentPage: 20,
          coordinates: [748, 540, 931, 740],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Text showing the answer from page 19 above salmon arrow (between house 1 and house 3)
      {
        id: 'page20-question-mark-text',
        name: 'question-mark-text',
        type: 'custom',
        coordinates: [500, 510, 650, 530], // Positioned above salmon arrow (between house 1 and house 3), moved up by 50gc, wider to fit answer
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$3 \\frac{151}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: getCSSVariable('--highlight-color-3', '#F28283'), // Highlight color 3 (pink)
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Salmon Double Arrow Image between house 1 and house 3
      {
        id: 'page20-salmon-double-arrow',
        name: 'salmon-double-arrow',
        type: 'custom',
        coordinates: [250, 555, 775, 560], // Positioned between house 1 (ends at x=327) and house 3 (starts at x=748)
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page20-salmon-double-arrow',
          elementName: 'page20-salmon-double-arrow',
          currentPage: 20,
          coordinates: [250, 555, 775, 560], // Match container coordinates
          zIndex: 59,
          // containerBorder: '3px solid #ffffff', // Add white border to container
          containerBorderRadius: '0', // No border radius
          images: [
            {
              src: 'assets/salmonDoubleArrowLong.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0,
              scale: 0.85,
              objectFit: 'cover', // Make image fill the container width
              layerCoordinates: [175, 545, 910, 575], // Extend beyond container vertically to prevent clipping
            }
          ]
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

    21: [

      // Header Text - "Build a mathematical sentence for the given scene"
      {
        id: 'page21-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page21.headerText',
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
        id: 'page21-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [5, 100, 1245, 400], // Adjust coordinates as needed
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
        id: 'page21-white-container',
        name: 'white-container',
        type: 'custom',
        coordinates: [1250, 100, 1575, 800], // Adjust coordinates as needed
        zIndex: 40,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'This is a Mixed Fractions Addition challenge!',
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // 30% opacity white
          border: '3gc dashed #ffffff', // Dashed white border
          borderRadius: '12gc',
          textColor: '#ffffff', // White font
          fontSize: '36gc',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Instruction Text - "Drag the correct buttons to the correct spot in the sentence"
      {
        id: 'page21-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page21.footerInstruction',
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

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page21-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [152, 195, 330, 225], // At top of house 1, moved up by another 50gc
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page21-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [144, 125, 327, 325], // Bottom of question background, left position (equal spacing), moved up by another 50gc
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-house1-image',
          elementName: 'page21-house1-image',
          currentPage: 21,
          coordinates: [144, 125, 327, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page21-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [330, 210, 440, 240], // Positioned on top of teal arrow (between house 1 and house 2), moved up by another 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page21-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [280, 265, 500, 300], // Positioned between house 1 and house 2, moved up by another 50gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-teal-double-arrow',
          elementName: 'page21-teal-double-arrow',
          currentPage: 21,
          coordinates: [330, 265, 440, 290],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page21-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [455, 195, 630, 225], // At top of house 2, moved up by another 50gc
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page21-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [446, 125, 629, 325], // Bottom of question background, center position (equal spacing), moved up by another 50gc
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-house2-image',
          elementName: 'page21-house-image',
          currentPage: 21,
          coordinates: [446, 125, 629, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Teal Double Arrow Image below house 2 (representing width)
      {
        id: 'page21-teal-double-arrow-width',
        name: 'teal-double-arrow-width',
        type: 'custom',
        coordinates: [460, 290, 620, 320], // Positioned below house 2, spanning its width, moved up by another 50gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-teal-double-arrow-width',
          elementName: 'page21-teal-double-arrow-width',
          currentPage: 21,
          coordinates: [446, 310, 629, 335], // Matching page 6 pattern, moved up by another 50gc
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Width text "1/200 km" below teal arrow (below house 2)
      {
        id: 'page21-width-text',
        name: 'width-text',
        type: 'custom',
        coordinates: [446, 310, 629, 375], // Positioned below teal arrow (below house 2), moved up by another 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page21-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [755, 195, 940, 225], // At top of house 3, moved up by another 50gc
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page21-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [640, 210, 740, 240], // Positioned on top of teal arrow (between house 2 and house 3), moved up by another 50gc
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page21-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [600, 265, 788, 300], // Positioned between house 2 and house 3, moved up by another 50gc
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-teal-double-arrow-2',
          elementName: 'page21-teal-double-arrow-2',
          currentPage: 21,
          coordinates: [640, 265, 740, 290],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page21-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [748, 125, 931, 325], // Bottom of question background, right position (equal spacing), moved up by another 50gc
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-house3-image',
          elementName: 'page21-house3-image',
          currentPage: 21,
          coordinates: [748, 125, 931, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Text "???" above salmon arrow (between house 1 and house 3)
      {
        id: 'page21-question-mark-text',
        name: 'question-mark-text',
        type: 'custom',
        coordinates: [175, 100, 910, 145], // Positioned above salmon arrow (between house 1 and house 3)
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '???',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: getCSSVariable('--highlight-color-3', '#F28283'), // Highlight color 3 (pink)
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Salmon Double Arrow Image between house 1 and house 3
      {
        id: 'page21-salmon-double-arrow',
        name: 'salmon-double-arrow',
        type: 'custom',
        coordinates: [250, 140, 775, 145], // Positioned between house 1 (ends at x=327) and house 3 (starts at x=748)
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page21-salmon-double-arrow',
          elementName: 'page21-salmon-double-arrow',
          currentPage: 21,
          coordinates: [175, 140, 910, 145], // Match container coordinates
          zIndex: 59,
          // containerBorder: '3px solid #ffffff', // Add white border to container
          containerBorderRadius: '0', // No border radius
          images: [
            {
              src: 'assets/salmonDoubleArrowLong.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0,
              scale: 0.85,
              objectFit: 'cover', // Make image fill the container width
              layerCoordinates: [175, 130, 910, 160], // Extend beyond container [175, 140, 910, 145] vertically to prevent clipping
            }
          ]
        }
      },

      // Button "Yohana to Lucas" - Pinkish-purple with light pink border
      {
        id: 'page21-yohana-to-lucas-button',
        name: 'yohana-to-lucas-button',
        type: 'custom',
        coordinates: [25, 475, 200, 575], // Positioned below houses, moved down by 75gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Yohana to<br>Lucas',
          backgroundColor: '#D946EF', // Pinkish-purple
          border: '2gc solid #F0A9F0', // Light pink border
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.3'
        }
      },

      // Equals sign in dark grey rounded square
      {
        id: 'page21-equals-sign-square',
        name: 'equals-sign-square',
        type: 'custom',
        coordinates: [220, 495, 280, 555], // Same height as box 4 (575-475=100gc), moved down by 75gc
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

      // Tile 1: "1 1/2 km" - larger box, immediately right of equals
      {
        id: 'page21-tile-1',
        name: 'tile-1',
        type: 'custom',
        coordinates: [300, 470, 500, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '24gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },

      // Tile 2: "+" - smaller box, to the right of first
      {
        id: 'page21-tile-2',
        name: 'tile-2',
        type: 'custom',
        coordinates: [530, 492, 600, 558],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
          backgroundColor: '#4A5568',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '24gc',
          padding: '5gc',
          textAlign: 'center'
        }
      },

      // Tile 3: "1/200 km" - larger box, to the right of second
      {
        id: 'page21-tile-3',
        name: 'tile-3',
        type: 'custom',
        coordinates: [630, 470, 830, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '24gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },

      // Tile 4: "+" - smaller box, to the right of third
      {
        id: 'page21-tile-4',
        name: 'tile-4',
        type: 'custom',
        coordinates: [860, 492, 930, 558],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
          backgroundColor: '#4A5568',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '24gc',
          padding: '5gc',
          textAlign: 'center'
        }
      },

      // Tile 5: "2 1/4 km" - largest box, extending further right
      {
        id: 'page21-tile-5',
        name: 'tile-5',
        type: 'custom',
        coordinates: [960, 470, 1200, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '24gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page21-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page21-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page21-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 22'));
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
        id: 'page21-tap-animation',
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
        id: 'page21-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page21-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page21-previous-button');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 20'));
              }
            }
          }
        }
      },

    ],

    22: [

      // Header Text - "Build a mathematical sentence for the given scene"
      {
        id: 'page22-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page22.headerText',
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
        id: 'page22-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [350, 100, 1250, 400], // Adjust coordinates as needed50
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
        id: 'page22-black-container-2',
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
        id: 'page22-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page22.footerInstruction',
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

      // Textbox "Y" above House 1 (Yohana's house)
      {
        id: 'page22-house1-label',
        name: 'house1-label',
        type: 'custom',
        coordinates: [410, 195, 588, 225], // Centered horizontally
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Y',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 1 Image (Yohana's house) - at bottom of question background, equally spaced
      {
        id: 'page22-house1-image',
        name: 'house1-image',
        type: 'custom',
        coordinates: [402, 125, 585, 325], // Centered horizontally
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-house1-image',
          elementName: 'page22-house1-image',
          currentPage: 22,
          coordinates: [402, 125, 585, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Distance text "1 1/2 km" above teal arrow (between house 1 and house 2)
      {
        id: 'page22-distance-1-text',
        name: 'distance-1-text',
        type: 'custom',
        coordinates: [588, 210, 698, 240], // Centered horizontally
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 1 and house 2
      {
        id: 'page22-teal-double-arrow',
        name: 'teal-double-arrow',
        type: 'custom',
        coordinates: [538, 265, 758, 300], // Centered horizontally
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-teal-double-arrow',
          elementName: 'page22-teal-double-arrow',
          currentPage: 22,
          coordinates: [588, 265, 698, 290],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Textbox "K" above House 2 (Komang's house)
      {
        id: 'page22-house2-label',
        name: 'house2-label',
        type: 'custom',
        coordinates: [713, 195, 888, 225], // Centered horizontally
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'K',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // House 2 Image (Komang's house) - at bottom of question background, equally spaced, center
      {
        id: 'page22-house2-image',
        name: 'house2-image',
        type: 'custom',
        coordinates: [704, 125, 887, 325], // Centered horizontally
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-house2-image',
          elementName: 'page22-house-image',
          currentPage: 22,
          coordinates: [704, 125, 887, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Teal Double Arrow Image below house 2 (representing width)
      {
        id: 'page22-teal-double-arrow-width',
        name: 'teal-double-arrow-width',
        type: 'custom',
        coordinates: [718, 290, 878, 320], // Centered horizontally
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-teal-double-arrow-width',
          elementName: 'page22-teal-double-arrow-width',
          currentPage: 22,
          coordinates: [704, 310, 887, 335], // Centered horizontally
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Width text "1/200 km" below teal arrow (below house 2)
      {
        id: 'page22-width-text',
        name: 'width-text',
        type: 'custom',
        coordinates: [704, 310, 887, 375], // Centered horizontally
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Textbox "L" above House 3 (Lukas's house)
      {
        id: 'page22-house3-label',
        name: 'house3-label',
        type: 'custom',
        coordinates: [1013, 195, 1198, 225], // Centered horizontally
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'L',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Distance text "2 1/4 km" above teal arrow (between house 2 and house 3)
      {
        id: 'page22-distance-2-text',
        name: 'distance-2-text',
        type: 'custom',
        coordinates: [898, 210, 998, 240], // Centered horizontally
        zIndex: 60, // Above arrows
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$ km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // Default white, will be updated dynamically by component
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center'
        }
      },

      // Teal Double Arrow Image between house 2 and house 3
      {
        id: 'page22-teal-double-arrow-2',
        name: 'teal-double-arrow-2',
        type: 'custom',
        coordinates: [858, 265, 1046, 300], // Centered horizontally
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-teal-double-arrow-2',
          elementName: 'page22-teal-double-arrow-2',
          currentPage: 22,
          coordinates: [898, 265, 998, 290],
          zIndex: 59,
          images: [
            {
              src: 'assets/whiteDoubleArrow.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // House 3 Image (Lukas's house) - at bottom of question background, equally spaced, right
      {
        id: 'page22-house3-image',
        name: 'house3-image',
        type: 'custom',
        coordinates: [1006, 125, 1189, 325], // Centered horizontally
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-house3-image',
          elementName: 'page22-house3-image',
          currentPage: 22,
          coordinates: [1006, 125, 1189, 325],
          zIndex: 51,
          images: [
            {
              src: 'assets/house.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0
            }
          ]
        }
      },

      // Salmon Double Arrow Image between house 1 and house 3 (no "???" text on page 22)
      {
        id: 'page22-salmon-double-arrow',
        name: 'salmon-double-arrow',
        type: 'custom',
        coordinates: [508, 140, 1033, 145], // Centered horizontally
        zIndex: 59, // Above houses but below text
        props: {
          componentType: 'ImageStackComponent',
          id: 'page22-salmon-double-arrow',
          elementName: 'page22-salmon-double-arrow',
          currentPage: 22,
          coordinates: [433, 140, 1168, 145], // Centered horizontally
          zIndex: 59,
          // containerBorder: '3px solid #ffffff', // Add white border to container
          containerBorderRadius: '0', // No border radius
          images: [
            {
              src: 'assets/salmonDoubleArrowLong.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1.0,
              scale: 0.85,
              objectFit: 'cover', // Make image fill the container width
              layerCoordinates: [433, 130, 1168, 160], // Centered horizontally
            }
          ]
        }
      },

      // Button "Komang to Lucas" - Pinkish-purple with light pink border (changed from "Yohana to Lucas")
      {
        id: 'page22-komang-to-lucas-button',
        name: 'komang-to-lucas-button',
        type: 'custom',
        coordinates: [373, 475, 548, 575], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to<br>Lucas',
          backgroundColor: '#D946EF', // Pinkish-purple
          border: '2gc solid #F0A9F0', // Light pink border
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.3'
        }
      },

      // Equals sign in dark grey rounded square
      {
        id: 'page22-equals-sign-square',
        name: 'equals-sign-square',
        type: 'custom',
        coordinates: [568, 495, 628, 555], // Centered horizontally
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
        id: 'page22-tile-1',
        name: 'tile-1',
        type: 'custom',
        coordinates: [648, 470, 768, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$1 \\frac{1}{2}$',
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
        id: 'page22-tile-2',
        name: 'tile-2',
        type: 'custom',
        coordinates: [788, 492, 830, 558],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page22-tile-3',
        name: 'tile-3',
        type: 'custom',
        coordinates: [848, 470, 968, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$\\frac{1}{200}$',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },

      // Tile 4: "+" - smaller box, to the right of third
      {
        id: 'page22-tile-4',
        name: 'tile-4',
        type: 'custom',
        coordinates: [988, 492, 1030, 558],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
          backgroundColor: '#4A5568',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '5gc',
          textAlign: 'center'
        }
      },

      // Tile 5: "2 1/4" - same width as other larger tiles
      {
        id: 'page22-tile-5',
        name: 'tile-5',
        type: 'custom',
        coordinates: [1048, 470, 1168, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '$2 \\frac{1}{4}$',
          backgroundColor: '#928C85',
          border: 'none',
          borderRadius: '14gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'center'
        }
      },

      // "km" text at the end
      {
        id: 'page22-km-text',
        name: 'km-text',
        type: 'custom',
        coordinates: [1188, 470, 1228, 580],
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'left'
        }
      },

      // Information gathered text with checkmark
      {
        id: 'page22-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [5, 650, 1595, 700], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
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
        id: 'page22-next-steps-text',
        name: 'next-steps-text',
        type: 'custom',
        coordinates: [5, 705, 1595, 750], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Next - Steps required to find answer',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Orange color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'left',
          fontWeight: 'bold'
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page22-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page22-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page22-next-button');
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
        id: 'page22-tap-animation',
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
        id: 'page22-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page22-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page22-previous-button');
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

    23: [

      // Equation Background
      {
        id: 'page23-equation-background',
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
        id: 'page23-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [350, 17, 550, 125], // Centered: start at 363 (calculated from total width), moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        id: 'page23-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [603, 25, 653, 125], // Centered with 15px gap after text, moved up 25gc
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
        id: 'page23-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [668, 25, 818, 125], // Centered with 15px gap after equals, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page23-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [833, 25, 883, 125], // Centered with 15px gap after box 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page23-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [898, 25, 1028, 125], // Centered with 15px gap after plus 1, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page23-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1043, 25, 1093, 125], // Centered with 15px gap after box 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page23-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [1108, 25, 1258, 125], // Centered with 15px gap after plus 2, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page23-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [1273, 25, 1343, 125], // Centered with 15px gap after box 3, moved up 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Solution Steps Component
      {
        id: 'page23-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1080, 150, 1595, 815],
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

      // Information gathered text - "✓ Information gathered from question."
      {
        id: 'page23-information-gathered-text',
        name: 'information-gathered-text',
        type: 'custom',
        coordinates: [0, 370, 1080, 420], // Vertically centered between 150-800, horizontally 0-1080
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.',
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
        id: 'page23-steps-required-text',
        name: 'steps-required-text',
        type: 'custom',
        coordinates: [0, 450, 1080, 500], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #20B2AA;">&#10003;</span>\u00A0Steps required to find answer',
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
        id: 'page23-next-result-text',
        name: 'next-result-text',
        type: 'custom',
        coordinates: [0, 530, 1080, 580], // Positioned below steps required text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Next - Finding the required Result',
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
        id: 'page23-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page23.footerInstruction',
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
        id: 'page23-tap-animation',
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
        id: 'page23-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page23-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page23-next-button');
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
        id: 'page23-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page23-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page23-previous-button');
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
    24: [

      // Header Text
      {
        id: 'page24-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 5, 1595, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page24.headerText',
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
        id: 'page24-equation-background',
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
        id: 'page24-distance-equation-text',
        name: 'distance-equation-text',
        type: 'custom',
        coordinates: [200, 125, 275, 225], // Shifted further left by 100gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'Komang to Lucas',
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
        id: 'page24-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [303, 125, 353, 225], // Shifted further left by 50gc
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
        id: 'page24-number-box-1',
        name: 'number-box-1',
        type: 'custom',
        coordinates: [358, 125, 508, 225], // Reduced gap - moved 10gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">1</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
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

      // Plus sign 1
      {
        id: 'page24-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [513, 125, 563, 225], // Reduced gap - moved 20gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page24-number-box-2',
        name: 'number-box-2',
        type: 'custom',
        coordinates: [568, 125, 698, 225], // Reduced gap - moved 30gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page24-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [703, 125, 753, 225], // Reduced gap - moved 40gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Third number box: 2 1/4
      {
        id: 'page24-number-box-3',
        name: 'number-box-3',
        type: 'custom',
        coordinates: [758, 125, 908, 225], // Reduced gap - moved 50gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="color: #ffffff;">2</span> <span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
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

      // Unit: km
      {
        id: 'page24-unit-km',
        name: 'unit-km',
        type: 'custom',
        coordinates: [913, 125, 983, 225], // Reduced gap - moved 60gc left
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },


      // Equation Background
      {
        id: 'page24-equation2-background',
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
        id: 'page24-working-equals',
        name: 'working-equals',
        type: 'custom',
        coordinates: [303, 275, 353, 375], // Width: 50, Height: 100, moved down 25gc
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

      // First working box: 3/2
      {
        id: 'page24-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [358, 275, 508, 375], // X coordinates match page24-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">3</span><span style="display: block; padding: 0 4px; color: #ffffff;">2</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity - same as page 15
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
        id: 'page24-working-plus-1',
        name: 'working-plus-1',
        type: 'custom',
        coordinates: [513, 275, 563, 375], // X coordinates match page24-plus-sign-1, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page24-working-fraction',
        name: 'working-fraction',
        type: 'custom',
        coordinates: [568, 275, 698, 375], // X coordinates match page24-number-box-2, Width: 130, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #ffffff;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page24-working-plus-2',
        name: 'working-plus-2',
        type: 'custom',
        coordinates: [703, 275, 753, 375], // X coordinates match page24-plus-sign-2, Width: 50, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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

      // Second working box: 9/4
      {
        id: 'page24-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [758, 275, 908, 375], // X coordinates match page24-number-box-3, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">9</span><span style="display: block; padding: 0 4px; color: #ffffff;">4</span></span>',
          backgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity - same as page 15
          border: 'none',
          borderRadius: '12gc', // Rounded corners
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5'
        }
      },

      // Unit: km
      {
        id: 'page24-working-unit-km',
        name: 'working-unit-km',
        type: 'custom',
        coordinates: [913, 275, 983, 375], // X coordinates match page24-unit-km, Width: 70, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Third Equation Background
      {
        id: 'page24-equation3-background',
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
        id: 'page24-third-equals',
        name: 'third-equals',
        type: 'custom',
        coordinates: [303, 425, 353, 525], // Width: 50, Height: 100
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
        id: 'page24-third-box-1',
        name: 'third-box-1',
        type: 'custom',
        coordinates: [358, 425, 508, 525], // Width: 150, Height: 100
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
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">300</span><span style="display: block; padding: 0 2px; color: #20B2AA;">200</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page24-working-box-1',
          onFlipHideTargetId: 'page24-tap-animation-third-box-1',
          flipBack: false
        }
      },

      // Tap Animation on third-box-1
      {
        id: 'page24-tap-animation-third-box-1',
        name: 'tap-animation-third-box-1',
        type: 'custom',
        coordinates: [373, 475, 423, 525], // Centered on top of third-box-1, moved down 25gc and left 20gc
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
        id: 'page24-third-plus-1',
        name: 'third-plus-1',
        type: 'custom',
        coordinates: [513, 425, 563, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page24-third-box-2',
        name: 'third-box-2',
        type: 'custom',
        coordinates: [568, 425, 698, 525], // Width: 130, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid #ffffff; padding: 0 4px; color: #ffffff;">1</span><span style="display: block; padding: 0 4px; color: #20B2AA;">200</span></span>',
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

      // Plus sign 2
      {
        id: 'page24-third-plus-2',
        name: 'third-plus-2',
        type: 'custom',
        coordinates: [703, 425, 753, 525], // Width: 50, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '+',
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
        id: 'page24-third-box-3',
        name: 'third-box-3',
        type: 'custom',
        coordinates: [758, 425, 908, 525], // Width: 150, Height: 100
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
          backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px; color: #ffffff;">450</span><span style="display: block; padding: 0 2px; color: #20B2AA;">200</span></span>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '36gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page24-working-box-2',
          onFlipHideTargetId: 'page24-tap-animation-third-box-3',
          flipBack: false
        }
      },

      // Tap Animation on third-box-3
      {
        id: 'page24-tap-animation-third-box-3',
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
      {
        id: 'page24-third-unit-km',
        name: 'third-unit-km',
        type: 'custom',
        coordinates: [913, 425, 983, 525], // Width: 70, Height: 100
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: 'km',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5'
        }
      },

      // Solution Steps Component
      {
        id: 'page24-solution-steps',
        name: 'solution-steps',
        type: 'custom',
        coordinates: [1180, 100, 1595, 815], // Positioned below instruction text box
        zIndex: 60,
        props: {
          componentType: 'SolutionStepComponent',
          headerText: 'Mixed Number Addition',
          currentStep: 2,
          currentSubStep: 2,
          collapsible: true,
          subStepsCollapsible: true, // Allow sub-steps to be collapsed/expanded
          subStepsDefaultExpanded: true, // Start with sub-steps collapsed (only current step expanded)
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

      // Tap Animation GIF
      {
        id: 'page24-tap-animation',
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



      // Instruction Text - "Tap '?' to reveal the answer for each conversion"
      {
        id: 'page24-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page24.instructionRevealConversions', "Tap '?' to reveal the answer for each conversion"),
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
        id: 'page24-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page24-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page24-next-button');
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
        id: 'page24-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page24-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page24-previous-button');
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
