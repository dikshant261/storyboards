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
 * Different navigation for English (en) and Indonesian (id) languages
 */

// Helper function to get current language
const getCurrentLanguage = () => {
  if (typeof window !== 'undefined' && window.AppData?.currentLanguage) {
    return window.AppData.currentLanguage;
  }
  if (typeof AppData !== 'undefined' && AppData.currentLanguage) {
    return AppData.currentLanguage;
  }
  return 'en'; // Default to English
};

// English navigation: 1 -> 2 -> 3 -> 4 -> 5 -> 12 -> 18 -> 13 -> 15 -> 19 -> 17
// Common page navigation for all languages: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 9 -> 10 -> 11 -> 12
const pageNavigation = {
  1: { prev: null, next: 2 },
  2: { prev: 1, next: 3 },
  3: { prev: 2, next: 4 },
  4: { prev: 3, next: 5 },
  5: { prev: 4, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 9 },
  9: { prev: 7, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: null },
};

// Alias for backward compatibility (both languages use the same navigation)
const pageNavigationEn = pageNavigation;
const pageNavigationId = pageNavigation;

// Get the page navigation (common for all languages)
const getPageNavigationConfig = () => {
  return pageNavigation;
};

/**
 * Get all page numbers in navigation order
 * @returns {number[]} Array of page numbers in order
 */
const getPageNumbers = () => {
  const pages = [];
  let currentPage = 1;
  const nav = getPageNavigationConfig();

  // Find the first page (where prev is null)
  while (currentPage && nav[currentPage]) {
    pages.push(currentPage);
    currentPage = nav[currentPage].next;
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
  const nav = getPageNavigationConfig();
  return nav[pageNumber] || null;
};

/**
 * Comprehensive state reset function for "Start Over"
 * Resets all component states, stores, and page-specific data
 */
const resetAllStates = () => {
  console.log('🔄 [Reset All States] Starting comprehensive state reset...');

  if (typeof window === 'undefined') return;

  try {
    // Clear all component state stores
    const stateStores = [
      'fillBlanksStateStore',
      'arrangeStepsStateStore',
      'calculationStepsStateStore',
      'quizPanelStateStore'
    ];

    stateStores.forEach(storeName => {
      if (window[storeName]) {
        window[storeName] = {};
        console.log(`🔄 [Reset All States] Cleared ${storeName}`);
      }
    });

    // Clear page completion states
    if (window.PageCompletionManager) {
      window.PageCompletionManager.init();
      if (window.pageCompletionState) {
        Object.keys(window.pageCompletionState).forEach(key => {
          delete window.pageCompletionState[key];
        });
        console.log('🔄 [Reset All States] Cleared all page completion states');
      }
    }

    // Clear any page-specific feedback states and component states
    Object.keys(window).forEach(key => {
      if (key.includes('FillBlanksState') ||
        key.includes('FeedbackState') ||
        key.includes('QuizState') ||
        key.includes('PageState') ||
        key.match(/^page\d+complete$/i) ||
        key.match(/^page\d+State$/i) ||
        key.match(/^page\d+FillBlanksState$/i) ||
        key.match(/^page\d+FeedbackState$/i) ||
        key.match(/^page\d+QuizState$/i)) {
        delete window[key];
        console.log(`🔄 [Reset All States] Cleared ${key}`);
      }
    });

    // Clear visual elements
    const clearFunctions = ['clearCheckOverlays', 'clearIncrementBorders', 'clearColumnNumbers'];
    clearFunctions.forEach(fn => {
      if (typeof window[fn] === 'function') {
        window[fn]();
        console.log(`🔄 [Reset All States] Called ${fn}`);
      }
    });

    // Reset global variables
    if (window.page1complete !== undefined) {
      window.page1complete = false;
    }
    if (window.objectsremoved !== undefined) {
      window.objectsremoved = 0;
    }
    if (window.currentQuestionIndex !== undefined) {
      window.currentQuestionIndex = 0;
    }

    // Clear localStorage and sessionStorage (optional - uncomment if needed)
    // try {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   console.log('🔄 [Reset All States] Cleared localStorage and sessionStorage');
    // } catch (e) {
    //   console.warn('🔄 [Reset All States] Could not clear storage:', e);
    // }

    // Note: We don't manually remove DOM elements here because React manages them.
    // The React key fix (page${currentPage}-${element.id}) ensures proper unmounting.
    // Manual DOM manipulation would conflict with React's lifecycle.

    // Reset any component-specific state
    // Force re-render of all components by dispatching a reset event
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('appStateReset', {
        detail: { timestamp: Date.now() }
      }));
      console.log('🔄 [Reset All States] Dispatched appStateReset event');
    }

    console.log('✅ [Reset All States] State reset completed');
  } catch (error) {
    console.error('❌ [Reset All States] Error during state reset:', error);
  }
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
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page1.highlights', [
            {
              text: "rectangle",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            }
          ])
        }
      },

      // Question Image
      // {
      //   id: 'page1-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },

      // Area Rectangle Container
      {
        id: 'page1-area-container',
        name: 'area-container',
        type: 'custom',
        coordinates: [1000, 250, 1500, 600], // Centered in the right area
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.areaLabel', 'Area = ?'),
          backgroundColor: 'transparent',
          border: '4gc solid white',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '48gc',
          padding: '30gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Rectangle Vertex Labels
      {
        id: 'page1-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [960, 210, 1000, 250], // Top-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page1-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [1500, 210, 1540, 250], // Top-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page1-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [1500, 600, 1540, 640], // Bottom-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page1-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [960, 600, 1000, 640], // Bottom-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
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
        id: 'page2-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page2.highlights', [
            {
              text: "diagonal of a rectangle",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            },
            {
              text: "its shortest side",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            }
          ])
        }
      },

      // Question Image
      // {
      //   id: 'page2-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },

      // Rectangle Container - Simple border approach like page 1
      {
        id: 'page2-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [1000, 250, 1500, 600], // Rectangle bounds matching vertex positions
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: '3gc solid white',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page2-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [1500, 250, 1000, 600],
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page2-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [960, 210, 1000, 250], // Top-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page2-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [1500, 210, 1540, 250], // Top-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page2-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [1500, 600, 1540, 640], // Bottom-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page2-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [960, 600, 1000, 640], // Bottom-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
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
        id: 'page2-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
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
        id: 'page3-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page3.highlights', [
            {
              text: "diagonal of a rectangle",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            },
            {
              text: "its shortest side",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            },
            {
              text: "60°",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            }
          ])
        }
      },

      // Question Image
      // {
      //   id: 'page3-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },

      // Rectangle Container - Simple border approach like page 1
      {
        id: 'page3-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [1000, 250, 1500, 600], // Rectangle bounds matching vertex positions
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: '3gc solid white',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page3-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [1500, 250, 1000, 600],
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page3-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [1000, 600, 1000, 600], // Vertex D position
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [1000, 600], // Vertex D
          point1Coords: [1000, 250], // Point A
          point2Coords: [1500, 250], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page3-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [1500, 250, 1500, 250], // Vertex B position
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [1500, 250], // Vertex B
          point1Coords: [1000, 600], // Point D
          point2Coords: [1500, 600], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },
      // // Angle ADB - Angle at D between A and B
      // {
      //   id: 'page3-angle-DAB',
      //   name: 'angle-DAB',
      //   type: 'custom',
      //   coordinates: [1000, 300, 1000, 600], // Vertex D position
      //   zIndex: 52,
      //   props: {
      //     componentType: 'AngleMarkerComponent',
      //     angle: '',
      //     angleType: 'right',
      //     vertexCoords: [1000, 300], // Vertex D
      //     point1Coords: [1000, 150], // Point A
      //     point2Coords: [1500, 300], // Point B
      //     showDegrees: true,
      //     showArc: true,
      //     arcColor: '#FFA500', // Orange color
      //     arcRadius: '40gc',
      //     arcThickness: '4gc', // Arc thickness
      //     labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
      //     labelColor: '#000000',
      //     fontSize: '30gc'
      //   }
      // },
      // Rectangle Vertex Labels
      {
        id: 'page3-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [960, 210, 1000, 250], // Top-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page3-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [1500, 210, 1540, 250], // Top-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page3-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [1500, 600, 1540, 640], // Bottom-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page3-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [960, 600, 1000, 640], // Bottom-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
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
        id: 'page3-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
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
        id: 'page4-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page4.highlights', [
            {
              text: "diagonal of a rectangle",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            },
            {
              text: "its shortest side",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            },
            {
              text: "60°",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            },
            {
              text: "length of the diagonal is 12 cm.",
              highlightColor: "#FFD700", // Yellow background
              fontColor: "#000000" // Black text
            }
          ])
        }
      },

      // Question Image
      // {
      //   id: 'page4-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },

      // Rectangle Container - Simple border approach like page 1
      {
        id: 'page4-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [1000, 250, 1500, 600], // Rectangle bounds matching vertex positions
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: '3gc solid white',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page4-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [1500, 250, 1000, 600],
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Diagonal Label - 12 cm (rotated to align with diagonal, offset from line)
      {
        id: 'page4-diagonal-label',
        name: 'diagonal-label',
        type: 'custom',
        coordinates: [1210, 370, 1310, 420], // Position along the diagonal with offset (moved up and right)
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.diagonalLabel', '12 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc', // Same as vertex labels
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          transform: 'rotate(-35deg)' // Rotate to align with diagonal BD (B to D: angle ≈ -35°)
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page4-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [1000, 600, 1000, 600], // Vertex D position
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [1000, 600], // Vertex D
          point1Coords: [1000, 250], // Point A
          point2Coords: [1500, 250], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page4-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [1500, 250, 1500, 250], // Vertex B position
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [1500, 250], // Vertex B
          point1Coords: [1000, 600], // Point D
          point2Coords: [1500, 600], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page4-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [960, 210, 1000, 250], // Top-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page4-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [1500, 210, 1540, 250], // Top-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page4-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [1500, 600, 1540, 640], // Bottom-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page4-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [960, 600, 1000, 640], // Bottom-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
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
          text: getI18nText('pages.page4.instructionText', "Tap » to identify what we need 'to find'"),
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
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
        id: 'page5-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page5.highlights', [
            {
              text: "Determine the area of the rectangle",
              highlightColor: "#F28283", // Highlight color 3 (pink/red)
              fontColor: "#000000" // Black text
            }
          ])
        }
      },

      // Question Image
      // {
      //   id: 'page5-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },

      // Rectangle Container - Simple border approach like page 1
      {
        id: 'page5-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [1000, 250, 1500, 600], // Rectangle bounds matching vertex positions
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: '3gc solid white',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page5-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [1500, 250, 1000, 600],
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Diagonal Label - 12 cm (rotated to align with diagonal, offset from line)
      {
        id: 'page5-diagonal-label',
        name: 'diagonal-label',
        type: 'custom',
        coordinates: [1210, 370, 1310, 420], // Position along the diagonal with offset (moved up and right)
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.diagonalLabel', '12 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc', // Same as vertex labels
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          transform: 'rotate(-35deg)' // Rotate to align with diagonal BD (B to D: angle ≈ -35°)
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page5-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [1000, 600, 1000, 600], // Vertex D position
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [1000, 600], // Vertex D
          point1Coords: [1000, 250], // Point A
          point2Coords: [1500, 250], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page5-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [1500, 250, 1500, 250], // Vertex B position
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [1500, 250], // Vertex B
          point1Coords: [1000, 600], // Point D
          point2Coords: [1500, 600], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page5-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [960, 210, 1000, 250], // Top-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page5-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [1500, 210, 1540, 250], // Top-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page5-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [1500, 600, 1540, 640], // Bottom-right corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page5-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [960, 600, 1000, 640], // Bottom-left corner - increased offset
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
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
          text: getI18nText('pages.page4.instructionText', "Tap » to identify what we need 'to find'"),
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

    6: [
      // Header Text - "Find the area of the rectangle"
      {
        id: 'page6-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.headerText', 'Find the area of the rectangle'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like page 5
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Quiz Panel Component - QTI4R (MCQ with image area, 4 options in rows)
      // Note: Image prop removed - rectangle components added separately below
      {
        id: 'page6-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [60, 110, 1540, 810], // Full quiz area
        zIndex: 50,
        props: {
          componentType: 'QuizPanelComponent',
          quizType: 'MCQ',
          quizSubtype: 'QTI4R', // MCQ with image area, 4 options in rows format
          quizId: 'page6-quiz',
          headerText: '', // No header text
          headerFontSize: '32gc',
          feedbackTextSize: "38gc",
          headerTextColor: '#ffffff',
          headerUnderlineColor: '#00A0A0',
          headerUnderlineThickness: '0gc', // No underline
          questionText: getI18nText('pages.page6.quizQuestion', 'What would be the area of the given rectangle (as in page 5)?'),
          questionTextFontSize: '40gc',
          questionTextColor: '#ffffff',
          showQuestionText: true,
          // Image removed - rectangle displayed as components instead
          image: '', // Empty - rectangle components added separately
          imageText: '',
          // Options array - 4 options (1 correct + 3 distractors)
          options: [
            {
              text: getI18nText('pages.page6.quizOptions.correct.text', 'area = length of longer side x length of shorter side'),
              image: '',
              iscorrect: true,
              feedback: getI18nText('pages.page6.quizOptions.correct.feedback', 'Correct! The area of a rectangle is calculated by multiplying the length of the longer side by the length of the shorter side.')
            },
            {
              text: getI18nText('pages.page6.quizOptions.distractor1.text', 'area = length of diagonal x length of shorter side'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page6.quizOptions.distractor1.feedback', 'Incorrect. The diagonal is not used directly in the area formula. The area is calculated using the two sides of the rectangle.')
            },
            {
              text: getI18nText('pages.page6.quizOptions.distractor2.text', 'area = length of longer side + length of shorter side'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page6.quizOptions.distractor2.feedback', 'Incorrect. Area is calculated by multiplication, not addition. The area of a rectangle is the product of its length and width.')
            },
            {
              text: getI18nText('pages.page6.quizOptions.distractor3.text', 'area = (length of diagonal)² / 2'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page6.quizOptions.distractor3.feedback', 'Incorrect. This formula is not used for calculating the area of a rectangle. The area is the product of the two sides.')
            }
          ],
          optionButtonTextSize: '36gc',
          optionButtonTextColor: '#000000', // Black font color
          optionButtonTextWeight: 'bold', // Bold font weight
          backgroundColor: '#0A0A1A',
          backgroundColorOpacity: 0.5,
          border: '3gc solid transparent',
          borderRadius: '15gc',
          padding: '15gc'
        }
      },

      // Rectangle Container - Centered in left 50% of quiz area, moved up 75gc
      {
        id: 'page6-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [218, 290, 643, 588], // Rectangle bounds: moved up 75gc
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: '3gc solid white', // All sides white initially
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page6-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [643, 290, 218, 588], // From B to D, moved up 75gc
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Diagonal Label - 12 cm (rotated to align with diagonal, offset from line)
      {
        id: 'page6-diagonal-label',
        name: 'diagonal-label',
        type: 'custom',
        coordinates: [378, 390, 428, 440], // Position along the diagonal with offset, moved up 75gc
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.diagonalLabel', '12 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc', // Same as vertex labels
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap', // Prevent text from wrapping to multiple lines
          transform: 'rotate(-35deg)' // Rotate to align with diagonal BD (B to D: angle ≈ -35°)
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page6-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [218, 588, 218, 588], // Vertex D position, moved up 75gc
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [218, 588], // Vertex D
          point1Coords: [218, 290], // Point A
          point2Coords: [643, 290], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page6-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [643, 290, 643, 290], // Vertex B position, moved up 75gc
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [643, 290], // Vertex B
          point1Coords: [218, 588], // Point D
          point2Coords: [643, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page6-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [178, 250, 218, 290], // Top-left corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page6-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [603, 250, 643, 290], // Top-right corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page6-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [643, 588, 683, 628], // Bottom-right corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page6-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [178, 588, 218, 628], // Bottom-left corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
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
          text: getI18nText('pages.page6.instructionText', 'Select the correct formula for calculating the area'),
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 6 } // Only show for page 6 quiz completion
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 6 }, // Only enable for page 6 quiz completion
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      }
    ],

    7: [
      // Header Text - "Find the area of the rectangle"
      {
        id: 'page7-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.headerText', 'Find the area of the rectangle'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like page 5
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Quiz Panel Component - QTI4R (MCQ with image area, 4 options in rows)
      // Note: Image prop removed - rectangle components added separately below
      {
        id: 'page7-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [60, 110, 1540, 810], // Full quiz area
        zIndex: 50,
        props: {
          componentType: 'QuizPanelComponent',
          quizType: 'MCQ',
          quizSubtype: 'QTI4R', // MCQ with image area, 4 options in rows format
          quizId: 'page7-quiz',
          headerText: '', // No header text
          headerFontSize: '32gc',
          headerTextColor: '#ffffff',
          headerUnderlineColor: '#00A0A0',
          headerUnderlineThickness: '0gc', // No underline
          questionText: getI18nText('pages.page7.quizQuestion', 'What is the measure of ∠BDC?'),
          questionTextFontSize: '36gc',
          feedbackTextSize: '34gc',
          questionTextColor: '#ffffff',
          showQuestionText: true,
          // Image removed - rectangle displayed as components instead
          image: '', // Empty - rectangle components added separately
          imageText: '',
          // Options array - 4 options (1 correct + 3 distractors)
          options: [
            {
              text: getI18nText('pages.page7.quizOptions.correct.text', '30°'),
              image: '',
              iscorrect: true,
              feedback: getI18nText('pages.page7.quizOptions.correct.feedback', 'Correct! ∠BDC is the angle at vertex D between points B and C. In the given rectangle with the diagonal BD, this angle measures 30°.')
            },
            {
              text: getI18nText('pages.page7.quizOptions.distractor1.text', '60°'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page7.quizOptions.distractor1.feedback', 'Incorrect. ∠BDC is not 60°. The angle at vertex D between points B and C measures 30°.')
            },
            {
              text: getI18nText('pages.page7.quizOptions.distractor2.text', '45°'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page7.quizOptions.distractor2.feedback', 'Incorrect. ∠BDC is not 45°. The angle at vertex D between points B and C measures 30°.')
            },
            {
              text: getI18nText('pages.page7.quizOptions.distractor3.text', '75°'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page7.quizOptions.distractor3.feedback', 'Incorrect. ∠BDC is not 75°. The angle at vertex D between points B and C measures 30°.')
            }
          ],
          optionButtonTextSize: '36gc',
          optionButtonTextColor: '#000000', // Black font color
          optionButtonTextWeight: 'bold', // Bold font weight
          backgroundColor: '#0A0A1A',
          backgroundColorOpacity: 0.5,
          border: '3gc solid transparent',
          borderRadius: '15gc',
          padding: '15gc',
          feedbackRowHeight: 30
        }
      },

      // Rectangle Container - Centered in left 50% of quiz area, moved up 75gc
      {
        id: 'page7-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [218, 290, 643, 588], // Rectangle bounds: moved up 75gc
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: '3gc solid white', // All sides white initially
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page7-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [643, 290, 218, 588], // From B to D, moved up 75gc
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Diagonal Label - 12 cm (rotated to align with diagonal, offset from line)
      {
        id: 'page7-diagonal-label',
        name: 'diagonal-label',
        type: 'custom',
        coordinates: [378, 390, 428, 440], // Position along the diagonal with offset, moved up 75gc
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.diagonalLabel', '12 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc', // Same as vertex labels
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap', // Prevent text from wrapping to multiple lines
          transform: 'rotate(-35deg)' // Rotate to align with diagonal BD (B to D: angle ≈ -35°)
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page7-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [218, 588, 218, 588], // Vertex D position, moved up 75gc
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [218, 588], // Vertex D
          point1Coords: [218, 290], // Point A
          point2Coords: [643, 290], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page7-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [643, 290, 643, 290], // Vertex B position, moved up 75gc
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [643, 290], // Vertex B
          point1Coords: [218, 588], // Point D
          point2Coords: [643, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle BDC - Angle at D between B and C (30°) - Hidden initially, shown on quiz completion
      {
        id: 'page7-angle-bdc',
        name: 'angle-bdc',
        type: 'custom',
        coordinates: [218, 588, 218, 588], // Vertex D position, moved up 75gc
        zIndex: 56, // Higher z-index to appear on top
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 30,
          angleType: 'acute',
          vertexCoords: [218, 588], // Vertex D
          point1Coords: [643, 290], // Point B
          point2Coords: [643, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '30gc', // Smaller radius to keep label inside
          arcThickness: '4gc', // Arc thickness
          labelDistance: -4, // Reduced offset to keep label inside rectangle
          labelColor: '#000000',
          fontSize: '30gc',
          style: { display: 'none' } // Hidden initially
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page7-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [178, 250, 218, 290], // Top-left corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page7-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [603, 250, 643, 290], // Top-right corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page7-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [643, 588, 683, 628], // Bottom-right corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page7-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [178, 588, 218, 628], // Bottom-left corner - moved up 75gc
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Instruction Text
      {
        id: 'page7-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page7.instructionText', 'Select the correct measure of ∠BDC'),
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
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 7 } // Only show for page 7 quiz completion
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 7 }, // Only enable for page 7 quiz completion
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      }
    ],

    8: [
      // Header Text - "Determine the relationship between sides for the triangle"
      {
        id: 'page8-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.headerText', 'Determine the <span style="color: #ffffff;">relationship between sides</span> for the triangle'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like page 6
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Quiz Panel Component - QT4 (MCQ text only, 4 options in grid)
      {
        id: 'page8-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [60, 110, 1540, 810], // Full quiz area
        zIndex: 50,
        props: {
          componentType: 'QuizPanelComponent',
          quizType: 'MCQ',
          quizSubtype: 'QT4', // MCQ text only, 4 options in grid format
          quizId: 'page8-quiz',
          headerText: '', // No header text
          headerFontSize: '32gc',
          headerTextColor: '#ffffff',
          headerUnderlineColor: '#00A0A0',
          headerUnderlineThickness: '0gc', // No underline
          questionText: getI18nText('pages.page7.quizQuestion', 'In a 30°-60°-90° right triangle the sides (shortest: longer: hypotenuse) always follow the ratio of?'),
          questionTextFontSize: '36gc',
          questionTextColor: '#ffffff',
          showQuestionText: true,
          image: '', // No image
          imageText: '',
          // Options array - 4 options (1 correct + 3 distractors)
          options: [
            {
              text: getI18nText('pages.page7.quizOptions.correct.text', '1 : √3 : 2'),
              image: '',
              iscorrect: true,
              feedback: getI18nText('pages.page7.quizOptions.correct.feedback', 'Correct! In a 30°-60°-90° right triangle, the sides are in the ratio 1 : √3 : 2, where the shortest side is opposite the 30° angle, the longer side is opposite the 60° angle, and the hypotenuse is opposite the 90° angle.')
            },
            {
              text: getI18nText('pages.page7.quizOptions.distractor1.text', '1 : √2 : 1'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page7.quizOptions.distractor1.feedback', 'Incorrect. This ratio is not correct for a 30°-60°-90° triangle. The correct ratio is 1 : √3 : 2.')
            },
            {
              text: getI18nText('pages.page7.quizOptions.distractor2.text', '2 : √3 : 1'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page7.quizOptions.distractor2.feedback', 'Incorrect. The order of the sides is incorrect. In a 30°-60°-90° triangle, the ratio is 1 : √3 : 2 (shortest: longer: hypotenuse).')
            },
            {
              text: getI18nText('pages.page7.quizOptions.distractor3.text', '1 : 1 : √2'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page7.quizOptions.distractor3.feedback', 'Incorrect. This ratio is for a 45°-45°-90° right triangle, not a 30°-60°-90° triangle. The correct ratio for a 30°-60°-90° triangle is 1 : √3 : 2.')
            }
          ],
          optionButtonTextSize: '36gc',
          optionButtonTextColor: '#000000', // Black font color
          optionButtonTextWeight: 'bold', // Bold font weight
          backgroundColor: '#0A0A1A',
          backgroundColorOpacity: 0.5,
          border: '3gc solid transparent',
          borderRadius: '15gc',
          padding: '15gc'
        }
      },

      // Instruction Text
      {
        id: 'page8-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page7.instructionText', 'Select the correct relationship defining the sides of the triangle'),
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 8 } // Only show for page 8 quiz completion
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 8 }, // Only enable for page 8 quiz completion
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      }
    ],

    9: [
      // Header Text - "Determine the sides of a △"
      {
        id: 'page9-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page9.headerText', 'Determine the sides of a △'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like page 5
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Quiz Panel Component - QTI4R (MCQ with image area, 4 options in rows)
      // Note: Image prop removed - rectangle components added separately below
      {
        id: 'page9-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [60, 110, 1540, 810], // Full quiz area
        zIndex: 50,
        props: {
          componentType: 'QuizPanelComponent',
          quizType: 'MCQ',
          quizSubtype: 'QTI4R', // MCQ with image area, 4 options in rows format
          quizId: 'page9-quiz',
          headerText: '', // No header text
          headerFontSize: '32gc',
          headerTextColor: '#ffffff',
          headerUnderlineColor: '#00A0A0',
          headerUnderlineThickness: '0gc', // No underline
          questionText: getI18nText('pages.page9.quizQuestion', '∆ABC is a 30°-60°-90° right triangle. If a is the side opposite 30°, b is the side opposite 60°, and c is the hypotenuse, which of the following is / are correct?'),
          questionTextFontSize: '36gc',
          questionTextColor: '#ffffff',
          showQuestionText: true,
          // Image removed - rectangle displayed as components instead
          image: '', // Empty - rectangle components added separately
          imageText: '',
          // Options array - 4 options (2 correct + 2 distractors for 30°-60°-90° triangle)
          options: [
            {
              text: getI18nText('pages.page9.quizOptions.correct.text', 'a = 1 cm, b = √3 cm, c = 2 cm'),
              image: '',
              iscorrect: true,
              feedback: getI18nText('pages.page9.quizOptions.correct.feedback', 'Correct! In a 30°-60°-90° right triangle, the sides follow the ratio 1 : √3 : 2, where a (opposite 30°) = 1, b (opposite 60°) = √3, and c (hypotenuse) = 2.')
            },
            {
              text: getI18nText('pages.page9.quizOptions.distractor1.text', 'a = 4√2 cm, b = 4 cm, c = 4 cm'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page9.quizOptions.distractor1.feedback', 'Incorrect. This ratio does not match a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the sides follow the ratio 1 : √3 : 2.')
            },
            {
              text: getI18nText('pages.page9.quizOptions.distractor2.text', 'a = 6 cm, b = 6√3 cm, c = 12 cm'),
              image: '',
              iscorrect: true,
              feedback: getI18nText('pages.page9.quizOptions.distractor2.feedback', 'Correct! In a 30°-60°-90° right triangle, the sides follow the ratio 1 : √3 : 2. Here, a = 6, b = 6√3, and c = 12, which maintains the correct ratio (6 : 6√3 : 12 = 1 : √3 : 2).')
            },
            {
              text: getI18nText('pages.page9.quizOptions.distractor3.text', 'a = 10 cm, b = 10 cm, c = 6√2 cm'),
              image: '',
              iscorrect: false,
              feedback: getI18nText('pages.page9.quizOptions.distractor3.feedback', 'Incorrect. This ratio (a = b) suggests an isosceles right triangle (45°-45°-90°), not a 30°-60°-90° triangle. In a 30°-60°-90° triangle, the sides follow the ratio 1 : √3 : 2.')
            }
          ],
          optionButtonTextSize: '32gc',
          optionButtonTextColor: '#000000', // Black font color
          optionButtonTextWeight: 'bold', // Bold font weight
          backgroundColor: '#0A0A1A',
          backgroundColorOpacity: 0.5,
          border: '3gc solid transparent',
          borderRadius: '15gc',
          padding: '15gc',
          // Custom height allocations (percentages that add up to 100)
          headerRowHeight: 0, // No header (0%)
          questionRowHeight: 25, // Question text (25%)
          optionsRowHeight: 55, // Options (60%)
          feedbackRowHeight: 20 // Feedback (15%)
        }
      },

      // Right Angle Triangle Component
      {
        id: 'page9-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [200, 250, 1000, 725], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [15, 15, 15 * Math.sqrt(2)], // Isosceles right triangle: AC = 15, BC = 15, AB = 15√2
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',
          rotation: 315, // Rotation angle in degrees (0 = no rotation, positive = clockwise)

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Orange lines for all sides
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          // This allows overriding vertex naming directly via prop
          vertexLabels: getI18nText('pages.page9.triangleLabels.vertexLabels', ['A', 'B', 'C']),

          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page9.triangleLabels.vertexLabels', ['A', 'B', 'C']), // Fallback if vertexLabels not provided
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [75, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          // For isosceles right triangle: AC = a, BC = a, AB = a√2
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page9.triangleLabels.sideLabels', ['c', 'a', 'b']), // Side labels: AB = a√2 (hypotenuse), BC = a, AC = a
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 55, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },

          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page9.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle (empty string skips that vertex)
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,

          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Instruction Text
      {
        id: 'page9-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page9.instructionText', 'Choose the correct answer'),
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
        id: 'page9-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 9 } // Only show for page 9 quiz completion
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 9 }, // Only enable for page 9 quiz completion
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      }
    ],

    16: [
      // Minimal page 16 configuration to prevent errors
      // This page is referenced in navigation but content is not yet implemented
      {
        id: 'page16-placeholder',
        name: 'placeholder',
        type: 'custom',
        coordinates: [5, 25, 1575, 895],
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page16.placeholderText', 'Page 16 - Content to be implemented'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '20gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Next button
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
              }
            }
          }
        }
      },
      // Previous button
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
              }
            }
          }
        }
      }
    ],

    10: [

      // Header Text - "Let us find the relationship between p and q"
      {
        id: 'page10-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page10.headerText',
            'Let us find the length of the <span style="color: #ffffff;">sides of the △</span>'
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
        id: 'page10-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1595, 810], // Same coordinates as question text box
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

      // Right Angle Triangle Component
      {
        id: 'page10-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [50, 150, 950, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [15, 15, 15 * Math.sqrt(2)], // Isosceles right triangle: AC = 15, BC = 15, AB = 15√2
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',
          rotation: 315, // Rotation angle in degrees (0 = no rotation, positive = clockwise)

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Orange lines for all sides
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
            show: true, // Show vertex labels
            labels: getI18nText('pages.page10.triangleLabels.vertexLabels', ['D', 'B', 'C']),
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [75, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          // For isosceles right triangle: AC = a, BC = a, AB = a√2
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page10.triangleLabels.sideLabels', ['c = 12 cm', 'a = x', 'b']), // Side labels: c = 12 cm (hypotenuse), a = x, b
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 50, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [308, 90, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },

          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page10.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle (empty string skips that vertex)
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,

          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Table Component - Side values
      {
        id: 'page10-side-table',
        name: 'side-table',
        type: 'custom',
        coordinates: [600, 200, 1100, 600], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: getI18nText('pages.page10.tableHeaders', [
              '<span style="color: #FF6600;">a</span>', // Orange for 'a'
              '<span style="color: #00FF7F;">b</span>', // Green for 'b'
              '<span style="color: #4A90E2;">c</span>'  // Blue for 'c'
            ]),
            rows: getI18nText('pages.page10.tableRows', [
              ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">√3</span>', '<span style="color: #4A90E2;">2</span>'], // Row 1
              ['<span style="color: #FF6600;">a</span>', '<span style="color: #00FF7F;">b</span>', '<span style="color: #4A90E2;">12</span>']  // Row 2: a, b, 12
            ])
          },
          borderColor: '#ffffff',
          headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
          headerTextColor: '#ffffff',
          cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          textColor: '#ffffff',
          fontSize: '36gc',
          headerFontSize: '40gc',
          padding: '15gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          equalColumnWidths: true,
          cellHeight: '80gc',
          rowGap: '0gc',
          columnGap: '0gc'
        }
      },

      // Left Arrow Image
      {
        id: "page10-left-arrow",
        name: "page10-left-arrow",
        type: "container",
        coordinates: [1085, 200, 1225, 700], // Position near the blank
        zIndex: 60,
        props: {
          imageSrc: "assets/leftArrow.png",
          imageAlt: getI18nText("common.imageAlt.leftArrow", "Left Arrow"),
          backgroundColor: "transparent",
        },
      },

      // Text "x" before blank1
      {
        id: "page10-x-text",
        name: "x-text",
        type: "custom",
        coordinates: [1100, 400, 1140, 475], // Positioned before blank1 (blank1 is at [1150, 400, 1250, 475])
        zIndex: 65,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.xText", "x"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "0gc",
          textColor: "#FF6600", // Orange color
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "center",
          fontWeight: "normal"
        }
      },

      // Fill Blanks Component
      {
        id: "page10-fill-blanks",
        name: "page10-fill-blanks-component",
        type: "custom",
        coordinates: [0, 800, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            { id: "blank1", coordinate: [1150, 400, 1250, 475], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
            { id: "blank2", coordinate: [625, 475, 765, 550], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
            { id: "blank3", coordinate: [780, 475, 920, 550], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },

          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [1275, 100, 1575, 800],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText("pages.page10.fillBlanks.instructionText", "Choose the correct multiplying factor to find the length of the sides"),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 5,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page10.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page10.fillBlanks.impFormulae", []),
        },
      },

      // Feedback Textbox Component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 1250, 800], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponentw
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "32gc",
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
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page10.footerInstruction',
            "Choose the correct answer to find the length of the sides"
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
        id: 'page10-tap-animation',
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
          showOnEventFilter: { pageNumber: 10 }
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 10 }
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
      },

    ],

    11: [
      // Header Text - "Find the area of the rectangle"
      {
        id: 'page11-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.headerText', 'Find the area of the rectangle'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like page 5
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Rectangle Container - Centered in left 50% of quiz area, moved up 75gc
      {
        id: 'page11-rectangle-container',
        name: 'page11-rectangle-container',
        type: 'custom',
        coordinates: [68, 290, 493, 588], // Rectangle bounds: moved left by 150gc total
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: 'none', // No border shorthand - set individually
          borderTop: '3gc solid white',
          borderLeft: '3gc solid white',
          borderRight: '3gc solid #FFA500', // Orange for side BC
          borderBottom: '3gc solid #FFA500', // Orange for side CD
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page11-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [493, 290, 68, 588], // From B to D, moved left by 150gc total
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Diagonal Label - 12 cm (rotated to align with diagonal, offset from line)
      {
        id: 'page11-diagonal-label',
        name: 'diagonal-label',
        type: 'custom',
        coordinates: [228, 390, 278, 440], // Position along the diagonal with offset, moved left by 150gc total
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.diagonalLabel', '12 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc', // Same as vertex labels
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap', // Prevent text from wrapping to multiple lines
          transform: 'rotate(-35deg)' // Rotate to align with diagonal BD (B to D: angle ≈ -35°)
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page11-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [68, 588, 68, 588], // Vertex D position, moved left by 150gc total
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [68, 588], // Vertex D
          point1Coords: [68, 290], // Point A
          point2Coords: [493, 290], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page11-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [493, 290, 493, 290], // Vertex B position, moved left by 150gc total
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [493, 290], // Vertex B
          point1Coords: [68, 588], // Point D
          point2Coords: [493, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle BDC - Angle at D between B and C (30°) - Visible by default
      {
        id: 'page11-angle-bdc',
        name: 'angle-bdc',
        type: 'custom',
        coordinates: [68, 588, 68, 588], // Vertex D position, moved left by 150gc total
        zIndex: 56, // Higher z-index to appear on top
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 30,
          angleType: 'acute',
          vertexCoords: [68, 588], // Vertex D
          point1Coords: [493, 290], // Point B
          point2Coords: [493, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '30gc', // Smaller radius to keep label inside
          arcThickness: '4gc', // Arc thickness
          labelDistance: -4, // Reduced offset to keep label inside rectangle
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page11-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [28, 250, 68, 290], // Top-left corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page11-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [453, 250, 493, 290], // Top-right corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page11-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [493, 588, 533, 628], // Bottom-right corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page11-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [28, 588, 68, 628], // Bottom-left corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Side BC Label - 6 cm (right side, vertical)
      {
        id: 'page11-side-bc-label',
        name: 'side-bc-label',
        type: 'custom',
        coordinates: [500, 400, 550, 450], // Position to the right of side BC
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.sideLabels.BC', '6 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFA500', // Orange color to match the side
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap',
          transform: 'rotate(90deg)' // Rotate 90 degrees to align with vertical side
        }
      },

      // Side CD Label - 6√3 cm (bottom side, horizontal)
      {
        id: 'page11-side-cd-label',
        name: 'side-cd-label',
        type: 'custom',
        coordinates: [250, 600, 350, 650], // Position below side CD
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.sideLabels.CD', '6√3 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFA500', // Orange color to match the side
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap'
        }
      },

      // Calculation Steps Component
      {
        id: 'page11-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [525, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 720, 500], // Text area within the component
          buttonCoordinates: [750, 350, 1050, 425], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 375, 800, 425], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '25gc',
            color: '#ffffff',
            fontWeight: 'normal',
            textAlign: 'left'
          },
          showCards: true, // Enable card styling for each step
          cardBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          cardBorder: '2gc solid rgba(255, 255, 255, 0.4)',
          cardBorderRadius: '12gc',
          cardPaddingTop: '10gc', // Optional: Top padding
          cardPaddingBottom: '10gc', // Optional: Bottom padding
          cardPaddingLeft: '30gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '10gc', // Optional: Right padding
          cardBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          // Card size control
          cardWidth: '100%', // Card width
          cardMaxWidth: null, // Optional: Maximum width
          cardMinWidth: null, // Optional: Minimum width
          // Step number circle
          showStepNumber: true, // Show step number in a circle on the left edge
          stepNumberSize: '40gc', // Size of the step number circle (diameter)
          stepNumberColor: '#ffffff', // Font color of the step number text
          stepNumberBackgroundColor: 'var(--color-orange)', // Background color of the circle
          stepNumberBorder: '2gc solid #ffffff', // Border of the circle
          stepNumberBorderColor: null, // Optional: Border color
          stepNumberBorderWidth: null, // Optional: Border width
          stepNumberBorderStyle: null, // Optional: Border style
          stepNumberFontSize: '24gc', // Font size of the step number
          stepNumberFontWeight: 'bold', // Font weight of the step number
          // Step explainer props
          explainerFontSize: '22gc', // Font size for step explainers
          explainerColor: 'var(--color-orange)', // Text color for step explainers
          explainerFontWeight: 'normal', // Font weight for step explainers
          explainerFontStyle: 'italic', // Font style for step explainers
          explainerMarginBottom: '24gc', // Margin bottom for step explainers
          // Header configuration
          headerText: getI18nText('pages.page11.calculationSteps.headerText', 'Solution Steps'),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: (() => {
            const stepsData = getI18nText('pages.page11.calculationSteps.steps', []);
            if (!Array.isArray(stepsData) || stepsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              return [
                {
                  type: 'formula',
                  text: getI18nText('pages.page11.calculationSteps.steps.0.text', 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse'),
                  buttonText: getI18nText('pages.page11.calculationSteps.steps.0.buttonText', 'Apply to our case')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page11.calculationSteps.steps.1.explainer', 'Given the sides'),
                  text: getI18nText('pages.page11.calculationSteps.steps.1.text', 'AB = 120 m and AC = 130 m<br>We need to find the distance (BC)'),
                  buttonText: getI18nText('pages.page11.calculationSteps.steps.1.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page11.calculationSteps.steps.2.explainer', 'Calculate the squares'),
                  text: getI18nText('pages.page11.calculationSteps.steps.2.text', 'AC² = AB² + BC²<br>130² = 120² + BC²<br>16900 = 14400 + BC²<br>BC² = 16900 - 14400 = 2500'),
                  buttonText: getI18nText('pages.page11.calculationSteps.steps.2.buttonText', 'Find the distance')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page11.calculationSteps.steps.3.explainer', 'Find the square root'),
                  text: getI18nText('pages.page11.calculationSteps.steps.3.text', 'BC = √2500<br>BC = 50 m'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: step.type || (index === 0 ? 'formula' : index === stepsData.length - 1 ? 'answer' : 'calculation'),
              ...(step.explainer ? { explainer: step.explainer } : {}),
              text: step.text,
              ...(step.buttonText !== undefined ? { buttonText: step.buttonText } : { buttonText: null })
            }));
          })(),
          blanks: [], // No blanks needed for this proof
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'transparent',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff'
        }
      },

      // Instruction Text
      {
        id: 'page11-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page11.instructionText', 'Click on the highlighted button to find the area of the rectangle'),
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until calculation steps are completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 11 } // Only show for page 11 completion
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
          initialEnabled: false, // Disabled until calculation steps are completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 11 }, // Only enable for page 11 completion
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      }
    ],

    12: [
      // Header Text - "Let us summarise"
      {
        id: 'page12-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.headerText', 'Let us summarise'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Rectangle Container - Centered in left 50% of quiz area, moved up 75gc
      {
        id: 'page12-rectangle-container',
        name: 'rectangle-container',
        type: 'custom',
        coordinates: [68, 290, 493, 588], // Rectangle bounds: moved left by 150gc total
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for border
          backgroundColor: 'transparent',
          border: 'none', // No border shorthand - set individually
          borderTop: '3gc solid white',
          borderLeft: '3gc solid white',
          borderRight: '3gc solid #FFA500', // Orange for side BC
          borderBottom: '3gc solid #FFA500', // Orange for side CD
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      // Diagonal BD (B to D) - only diagonal
      {
        id: 'page12-rectangle-diagonal-bd',
        name: 'rectangle-diagonal-bd',
        type: 'custom',
        coordinates: [493, 290, 68, 588], // From B to D, moved left by 150gc total
        zIndex: 50,
        props: {
          componentType: 'LineComponent',
          lineType: 'slanted',
          borderColor: '#ffffff',
          borderWidth: '2gc',
          borderStyle: 'solid'
        }
      },

      // Diagonal Label - 12 cm (rotated to align with diagonal, offset from line)
      {
        id: 'page12-diagonal-label',
        name: 'diagonal-label',
        type: 'custom',
        coordinates: [228, 390, 278, 440], // Position along the diagonal with offset, moved left by 150gc total
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.diagonalLabel', '12 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc', // Same as vertex labels
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap', // Prevent text from wrapping to multiple lines
          transform: 'rotate(-35deg)' // Rotate to align with diagonal BD (B to D: angle ≈ -35°)
        }
      },

      // Angle ADB - Angle at D between A and B
      {
        id: 'page12-angle-adb',
        name: 'angle-adb',
        type: 'custom',
        coordinates: [68, 588, 68, 588], // Vertex D position, moved left by 150gc total
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [68, 588], // Vertex D
          point1Coords: [68, 290], // Point A
          point2Coords: [493, 290], // Point B
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle DBC - Angle at B between D and C
      {
        id: 'page12-angle-dbc',
        name: 'angle-dbc',
        type: 'custom',
        coordinates: [493, 290, 493, 290], // Vertex B position, moved left by 150gc total
        zIndex: 52,
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 60,
          angleType: 'acute',
          vertexCoords: [493, 290], // Vertex B
          point1Coords: [68, 588], // Point D
          point2Coords: [493, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '40gc',
          arcThickness: '4gc', // Arc thickness
          labelDistance: 1.8, // Increased offset between arc and label (default 1.3)
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Angle BDC - Angle at D between B and C (30°) - Visible by default
      {
        id: 'page12-angle-bdc',
        name: 'angle-bdc',
        type: 'custom',
        coordinates: [68, 588, 68, 588], // Vertex D position, moved left by 150gc total
        zIndex: 56, // Higher z-index to appear on top
        props: {
          componentType: 'AngleMarkerComponent',
          angle: 30,
          angleType: 'acute',
          vertexCoords: [68, 588], // Vertex D
          point1Coords: [493, 290], // Point B
          point2Coords: [493, 588], // Point C
          showDegrees: true,
          showArc: true,
          arcColor: '#FFA500', // Orange color
          arcRadius: '30gc', // Smaller radius to keep label inside
          arcThickness: '4gc', // Arc thickness
          labelDistance: -4, // Reduced offset to keep label inside rectangle
          labelColor: '#000000',
          fontSize: '30gc'
        }
      },

      // Rectangle Vertex Labels
      {
        id: 'page12-vertex-a',
        name: 'vertex-a',
        type: 'custom',
        coordinates: [28, 250, 68, 290], // Top-left corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.vertexLabels.A', 'A'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page12-vertex-b',
        name: 'vertex-b',
        type: 'custom',
        coordinates: [453, 250, 493, 290], // Top-right corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.vertexLabels.B', 'B'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page12-vertex-c',
        name: 'vertex-c',
        type: 'custom',
        coordinates: [493, 588, 533, 628], // Bottom-right corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.vertexLabels.C', 'C'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },
      {
        id: 'page12-vertex-d',
        name: 'vertex-d',
        type: 'custom',
        coordinates: [28, 588, 68, 628], // Bottom-left corner - moved left by 150gc total
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.vertexLabels.D', 'D'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal'
        }
      },

      // Side BC Label - 6 cm (right side, vertical)
      {
        id: 'page12-side-bc-label',
        name: 'side-bc-label',
        type: 'custom',
        coordinates: [500, 400, 550, 450], // Position to the right of side BC
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.sideLabels.BC', '6 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFA500', // Orange color to match the side
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap',
          transform: 'rotate(90deg)' // Rotate 90 degrees to align with vertical side
        }
      },

      // Side CD Label - 6√3 cm (bottom side, horizontal)
      {
        id: 'page12-side-cd-label',
        name: 'side-cd-label',
        type: 'custom',
        coordinates: [250, 600, 350, 650], // Position below side CD
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page12.sideLabels.CD', '6√3 cm'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFA500', // Orange color to match the side
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap'
        }
      },

      // Feedback Textbox Component
      {
        id: 'page12-feedback-textbox',
        name: 'page12-feedback-textbox',
        type: 'custom',
        coordinates: [600, 150, 1550, 750], // Centered position
        zIndex: 65,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page12-feedback-textbox',
          text: getI18nText('pages.page12.feedbackTextbox.text', 'The problem gives a rectangle with a <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">12 cm</span> diagonal that makes a <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">60°</span> angle with the shorter side.<br><br>We split the rectangle into two right triangles and used right-triangle properties to determine the<br>rectangle\'s side lengths: <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">6 cm</span> and <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">6√3 cm</span>.<br><br>Multiplying these gives the area:<br>Area = 36√3 ≈ <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">62.3 cm²</span><br><br>👍 The area of the rectangle is approximately <span style="background-color: #FFD700; color: #000000; padding: 2px 4px;">62.3 cm²</span>.'),
          mode: 'summary',
          allowHTML: true,
          fontSize: '32gc',
          borderRadius: '12gc',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box',
        },
      },

      // Instruction Text
      {
        id: 'page12-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText('pages.page12.footerInstruction', 'Tap » to start over'),
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until calculation steps are completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 12 } // Only show for page 12 completion
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
          initialEnabled: true, // Enabled from start for "start over" functionality
          fontSize: '28gc', // Font size for the button text
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            // "Start Over" functionality - reset all states and navigate to page 1
            console.log('🔄 [Next Button] Page 12 - Starting over with full state reset');

            // Reset all component states and stores
            resetAllStates();

            // Navigate to page 1 (which will also trigger state reset in navigateToPage)
            if (typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
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
    // Set language-specific navigation
    window.pageNavigation = getPageNavigationConfig();
    // Also expose language-specific configs for debugging
    window.pageNavigationEn = pageNavigationEn;
    window.pageNavigationId = pageNavigationId;

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
