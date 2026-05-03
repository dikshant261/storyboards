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
 * @param {string} key - Translation key (dot path in AppData.translations)
 * @param {Object} [params] - Parameters for {placeholder} interpolation
 * @returns {string} Translated text from data.js for the active locale
 */
const getI18nText = (key, params = {}) => {
  if (typeof i18n !== "undefined" && typeof i18n.t === "function") {
    return i18n.t(key, params);
  }
  return "";
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
    return getI18nText("buttons.startOver");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next");
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

      // Feedback Textbox Component
      {
        id: "page1-feedback-textbox",
        name: "page1-feedback-textbox-unique",
        type: "custom",
        coordinates: [100, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page1.introText"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "50gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'white',
          border: 'none',
          lineHeight: "2"
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 620, 950, 720],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.start");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page1-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 650, 750, 750], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapGifAlt"),
        },
      },

      // // Previous button - Three Layer Structure
      // {
      //   id: "page1-previous-button",
      //   name: "previous-button",
      //   type: "button",
      //   coordinates: [5, 820, 150, 895],
      //   zIndex: "var(--z-button)",
      //   props: {
      //     get text() {
      //       return getI18nText("buttons.previous");
      //     },
      //     onClick: () => {
      //       if (typeof window !== "undefined" && window.playCarClickSound) {
      //         window.playCarClickSound("previous");
      //       }

      //       // Navigate to previous page using navigation config
      //       const nav = pageNavigation[1];
      //       if (nav && nav.prev) {
      //         navigateToPage(nav.prev, "previous");
      //       }
      //     },
      //   },
      // },
      // {
      //   id: "page1-instruction-text",
      //   name: "page1-instruction-text",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page1.instructionText.tapAfterReading"),
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
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
          text: getI18nText('pages.page2.headerText'),
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
        name: 'page2-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page2-favorite-game-picture-text',
        name: 'page2-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page2-hide-seek-text-tile',
        name: 'page2-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page2-hide-seek-triangle-images-background',
        name: 'page2-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangles image
      {
        id: 'page3-hide-and-seek-triangle-image',
        name: 'page3-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-hide-and-seek-triangle-image',
          elementName: 'page3-hide-and-seek-triangle-image',
          currentPage: 2,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          images: [
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page2-rope-jump-text-tile',
        name: 'page2-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page2-rope-jump-triangle-images-background',
        name: 'page2-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangles image
      {
        id: 'page3-rope-jump-triangle-image',
        name: 'page3-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-rope-jump-triangle-image',
          elementName: 'page3-rope-jump-triangle-image',
          currentPage: 2,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          glowOnQuizIncorrectQuizId: 'page2-quiz',
          showSlotCountsOnCorrectQuizId: 'page2-quiz',
          greenGlowOnCorrectQuizId: 'page2-quiz',
          images: [
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page2-marbles-text-tile',
        name: 'page2-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page2-marbles-triangle-images-background',
        name: 'page2-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangles image
      {
        id: 'page3-marbles-triangle-image',
        name: 'page3-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-marbles-triangle-image',
          elementName: 'page3-marbles-triangle-image',
          currentPage: 2,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          images: [
            {
              src: 'assets/yellowTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/yellowTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/yellowTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page2-bentengan-text-tile-1',
        name: 'page2-bentengan-text-tile-1',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page2-bentengan-triangle-images-background',
        name: 'page2-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page3-bentengan-triangle-image',
        name: 'page3-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-bentengan-triangle-image',
          elementName: 'page3-bentengan-triangle-image',
          currentPage: 2,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          images: [
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },
      //key text
      {
        id: 'page2-bentengan-text-tile',
        name: 'page2-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page2-option-background',
        name: 'page2-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page2-quiz-panel',
        name: 'page2-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page2-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page2.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page2.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          text: getI18nText('pages.page2.footerInstruction'),
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
          text: getI18nText('pages.page3.headerText'),
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
        name: 'page3-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page3-favorite-game-picture-text',
        name: 'page3-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page3-hide-seek-text-tile',
        name: 'page3-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page3-hide-seek-triangle-images-background',
        name: 'page3-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek: overlay spans first→last triangle only (4/10 slots; stack x1..885, rowSlotCount 10)
      {
        id: 'page3-hide-seek-row-salmon-highlight',
        name: 'page3-hide-seek-row-salmon-highlight',
        type: 'custom',
        coordinates: [265, 226, 513, 304],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page3-quiz',
          triangleRowId: 'hideSeek',
          currentPage: 3,
          borderRadius: '15gc',
          highlightIncorrectRowsOnCorrectAnswer: true
        }
      },
      //hide and seek triangles image
      {
        id: 'page3-hide-and-seek-triangle-image',
        name: 'page3-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-hide-and-seek-triangle-image',
          elementName: 'page3-hide-and-seek-triangle-image',
          currentPage: 3,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          wrongRowBorderQuizId: 'page3-quiz',
          triangleRowId: 'hideSeek',
          wrongAnswerMotionLayout: { topRowY1: 226, bottomRowY1: 601 },
          images: [
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/salmonTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page3-rope-jump-text-tile',
        name: 'page3-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page3-rope-jump-triangle-images-background',
        name: 'page3-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump: overlay through last triangle only (6/10 slots)
      {
        id: 'page3-rope-jump-row-green-highlight',
        name: 'page3-rope-jump-row-green-highlight',
        type: 'custom',
        coordinates: [265, 351, 637, 429],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page3-quiz',
          triangleRowId: 'ropeJump',
          currentPage: 3,
          borderRadius: '15gc',
          showSalmonOnWrongRowClick: false,
          highlightCorrectRowOnCorrectAnswer: true
        }
      },
      //rope jump triangles image
      {
        id: 'page3-rope-jump-triangle-image',
        name: 'page3-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-rope-jump-triangle-image',
          elementName: 'page3-rope-jump-triangle-image',
          currentPage: 3,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          glowOnQuizIncorrectQuizId: 'page3-quiz',
          images: [
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/blueTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page3-marbles-text-tile',
        name: 'page3-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page3-marbles-triangle-images-background',
        name: 'page3-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles: overlay through last triangle only (3/10 slots)
      {
        id: 'page3-marbles-row-salmon-highlight',
        name: 'page3-marbles-row-salmon-highlight',
        type: 'custom',
        coordinates: [265, 476, 451, 554],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page3-quiz',
          triangleRowId: 'marbles',
          currentPage: 3,
          borderRadius: '15gc',
          highlightIncorrectRowsOnCorrectAnswer: true
        }
      },
      //marbles triangles image
      {
        id: 'page3-marbles-triangle-image',
        name: 'page3-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-marbles-triangle-image',
          elementName: 'page3-marbles-triangle-image',
          currentPage: 3,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          wrongRowBorderQuizId: 'page3-quiz',
          triangleRowId: 'marbles',
          wrongAnswerMotionLayout: { topRowY1: 226, bottomRowY1: 601 },
          images: [
            {
              src: 'assets/yellowTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/yellowTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/yellowTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page3-bentengan-text-tile-1',
        name: 'page3-bentengan-text-tile-1',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page3-bentengan-triangle-images-background',
        name: 'page3-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan: overlay through last triangle only (5/10 slots — 5 triangles in row)
      {
        id: 'page3-bentengan-row-salmon-highlight',
        name: 'page3-bentengan-row-salmon-highlight',
        type: 'custom',
        coordinates: [265, 601, 575, 679],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page3-quiz',
          triangleRowId: 'bentengan',
          currentPage: 3,
          borderRadius: '15gc',
          highlightIncorrectRowsOnCorrectAnswer: true
        }
      },
      {
        id: 'page3-bentengan-triangle-image',
        name: 'page3-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-bentengan-triangle-image',
          elementName: 'page3-bentengan-triangle-image',
          currentPage: 3,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          wrongRowBorderQuizId: 'page3-quiz',
          triangleRowId: 'bentengan',
          wrongAnswerMotionLayout: { topRowY1: 226, bottomRowY1: 601 },
          images: [
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            },
            {
              src: 'assets/purpleTriangle.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1
            }
          ]
        }
      },
      //key text
      {
        id: 'page3-bentengan-text-tile',
        name: 'page3-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page3-option-background',
        name: 'page3-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
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
      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page3.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page3.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          text: getI18nText('pages.page3.footerInstruction'),
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
          text: getI18nText('pages.page4.headerText'),
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
        name: 'page4-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page4-favorite-game-picture-text',
        name: 'page4-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page4-hide-seek-text-tile',
        name: 'page4-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page4-hide-seek-triangle-images-background',
        name: 'page4-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek: triangle strip highlight (Marbles correct on page 4 → salmon on hide/rope/bentengan)
      {
        id: 'page4-hide-seek-row-salmon-highlight',
        name: 'page4-hide-seek-row-salmon-highlight',
        type: 'custom',
        coordinates: [265, 226, 513, 304],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page4-quiz',
          triangleRowId: 'hideSeek',
          currentPage: 4,
          borderRadius: '15gc',
          highlightIncorrectRowsOnCorrectAnswer: true,
          incorrectGameTriangleRowIds: ['hideSeek', 'ropeJump', 'bentengan']
        }
      },
      //hide and seek triangles image
      {
        id: 'page4-hide-and-seek-triangle-image',
        name: 'page4-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-hide-and-seek-triangle-image',
          elementName: 'page4-hide-and-seek-triangle-image',
          currentPage: 4,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          wrongRowBorderQuizId: 'page4-quiz',
          triangleRowId: 'hideSeek',
          wrongAnswerMotionLayout: { topRowY1: 226, bottomRowY1: 601 },
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page4-rope-jump-text-tile',
        name: 'page4-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page4-rope-jump-triangle-images-background',
        name: 'page4-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump: triangle strip highlight
      {
        id: 'page4-rope-jump-row-salmon-highlight',
        name: 'page4-rope-jump-row-salmon-highlight',
        type: 'custom',
        coordinates: [265, 351, 637, 429],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page4-quiz',
          triangleRowId: 'ropeJump',
          currentPage: 4,
          borderRadius: '15gc',
          highlightIncorrectRowsOnCorrectAnswer: true,
          incorrectGameTriangleRowIds: ['hideSeek', 'ropeJump', 'bentengan']
        }
      },
      //rope jump triangles image
      {
        id: 'page4-rope-jump-triangle-image',
        name: 'page4-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-rope-jump-triangle-image',
          elementName: 'page4-rope-jump-triangle-image',
          currentPage: 4,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          wrongRowBorderQuizId: 'page4-quiz',
          triangleRowId: 'ropeJump',
          wrongAnswerMotionLayout: { topRowY1: 226, bottomRowY1: 601 },
          glowOnQuizIncorrectQuizId: 'page4-quiz',
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page4-marbles-text-tile',
        name: 'page4-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page4-marbles-triangle-images-background',
        name: 'page4-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles: green highlight when correct (page 4 correct answer)
      {
        id: 'page4-marbles-row-green-highlight',
        name: 'page4-marbles-row-green-highlight',
        type: 'custom',
        coordinates: [265, 476, 451, 554],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page4-quiz',
          triangleRowId: 'marbles',
          currentPage: 4,
          borderRadius: '15gc',
          showSalmonOnWrongRowClick: false,
          highlightCorrectRowOnCorrectAnswer: true
        }
      },
      //marbles triangles image
      {
        id: 'page4-marbles-triangle-image',
        name: 'page4-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-marbles-triangle-image',
          elementName: 'page4-marbles-triangle-image',
          currentPage: 4,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          glowOnQuizIncorrectQuizId: 'page4-quiz',
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page4-bentengan-text-tile-1',
        name: 'page4-bentengan-text-tile-1',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page4-bentengan-triangle-images-background',
        name: 'page4-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan: triangle strip highlight
      {
        id: 'page4-bentengan-row-salmon-highlight',
        name: 'page4-bentengan-row-salmon-highlight',
        type: 'custom',
        coordinates: [265, 601, 575, 679],
        zIndex: 50,
        props: {
          componentType: 'SalmonQuizRowHighlightComponent',
          quizWrongHighlightQuizId: 'page4-quiz',
          triangleRowId: 'bentengan',
          currentPage: 4,
          borderRadius: '15gc',
          highlightIncorrectRowsOnCorrectAnswer: true,
          incorrectGameTriangleRowIds: ['hideSeek', 'ropeJump', 'bentengan']
        }
      },
      {
        id: 'page4-bentengan-triangle-image',
        name: 'page4-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-bentengan-triangle-image',
          elementName: 'page4-bentengan-triangle-image',
          currentPage: 4,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          wrongRowBorderQuizId: 'page4-quiz',
          triangleRowId: 'bentengan',
          wrongAnswerMotionLayout: { topRowY1: 226, bottomRowY1: 601 },
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page4-bentengan-text-tile',
        name: 'page4-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page4-option-background',
        name: 'page4-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
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
      //quiz panel
      {
        id: 'page4-quiz-panel',
        name: 'page4-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page4-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page4.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page4.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          text: getI18nText('pages.page4.footerInstruction'),
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage4'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
          text: getI18nText('pages.page5.headerText'),
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
        name: 'page5-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page5-favorite-game-picture-text',
        name: 'page5-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page5-hide-seek-text-tile',
        name: 'page5-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page5-hide-seek-triangle-images-background',
        name: 'page5-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangles image (same interaction pattern as page 2 rope row: counts + green glow on correct; wrong row = red glow + counts via wrongOptionRowRevealQuizId)
      {
        id: 'page5-hide-and-seek-triangle-image',
        name: 'page5-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-hide-and-seek-triangle-image',
          elementName: 'page5-hide-and-seek-triangle-image',
          currentPage: 5,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'hideSeek',
          wrongOptionRowRevealQuizId: 'page5-quiz',
          showSlotCountsOnCorrectQuizId: 'page5-quiz',
          greenGlowOnCorrectQuizId: 'page5-quiz',
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page5-rope-jump-text-tile',
        name: 'page5-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page5-rope-jump-triangle-images-background',
        name: 'page5-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangles image (row layout like page 2)
      {
        id: 'page5-rope-jump-triangle-image',
        name: 'page5-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-rope-jump-triangle-image',
          elementName: 'page5-rope-jump-triangle-image',
          currentPage: 5,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'ropeJump',
          wrongOptionRowRevealQuizId: 'page5-quiz',
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page5-marbles-text-tile',
        name: 'page5-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page5-marbles-triangle-images-background',
        name: 'page5-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangles image
      {
        id: 'page5-marbles-triangle-image',
        name: 'page5-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-marbles-triangle-image',
          elementName: 'page5-marbles-triangle-image',
          currentPage: 5,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'marbles',
          wrongOptionRowRevealQuizId: 'page5-quiz',
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page5-bentengan-text-tile-1',
        name: 'page5-bentengan-text-tile-1',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page5-bentengan-triangle-images-background',
        name: 'page5-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page5-bentengan-triangle-image',
        name: 'page5-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-bentengan-triangle-image',
          elementName: 'page5-bentengan-triangle-image',
          currentPage: 5,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'bentengan',
          wrongOptionRowRevealQuizId: 'page5-quiz',
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page5-bentengan-text-tile',
        name: 'page5-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page5-option-background',
        name: 'page5-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page5-quiz-panel',
        name: 'page5-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page5.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page5.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          text: getI18nText('pages.page5.footerInstruction'),
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage5'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
          text: getI18nText('pages.page6.headerText'),
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
        name: 'page6-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page6-favorite-game-picture-text',
        name: 'page6-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page6-hide-seek-text-tile',
        name: 'page6-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page6-hide-seek-triangle-images-background',
        name: 'page6-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangles image (same row layout + quiz feedback as page 5)
      {
        id: 'page6-hide-and-seek-triangle-image',
        name: 'page6-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-hide-and-seek-triangle-image',
          elementName: 'page6-hide-and-seek-triangle-image',
          currentPage: 6,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'hideSeek',
          wrongOptionRowRevealQuizId: 'page6-quiz',
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page6-rope-jump-text-tile',
        name: 'page6-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page6-rope-jump-triangle-images-background',
        name: 'page6-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangles image
      {
        id: 'page6-rope-jump-triangle-image',
        name: 'page6-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-rope-jump-triangle-image',
          elementName: 'page6-rope-jump-triangle-image',
          currentPage: 6,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'ropeJump',
          wrongOptionRowRevealQuizId: 'page6-quiz',
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page6-marbles-text-tile',
        name: 'page6-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page6-marbles-triangle-images-background',
        name: 'page6-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangles image (correct answer row: green glow + slot counts on correct)
      {
        id: 'page6-marbles-triangle-image',
        name: 'page6-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-marbles-triangle-image',
          elementName: 'page6-marbles-triangle-image',
          currentPage: 6,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'marbles',
          wrongOptionRowRevealQuizId: 'page6-quiz',
          showSlotCountsOnCorrectQuizId: 'page6-quiz',
          greenGlowOnCorrectQuizId: 'page6-quiz',
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page6-bentengan-text-tile-1',
        name: 'page6-bentengan-text-tile-1',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page6-bentengan-triangle-images-background',
        name: 'page6-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page6-bentengan-triangle-image',
        name: 'page6-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-bentengan-triangle-image',
          elementName: 'page6-bentengan-triangle-image',
          currentPage: 6,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'bentengan',
          wrongOptionRowRevealQuizId: 'page6-quiz',
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page6-bentengan-text-tile',
        name: 'page6-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page6-option-background',
        name: 'page6-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page6-quiz-panel',
        name: 'page6-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page6.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page6.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          text: getI18nText('pages.page6.footerInstruction'),
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage6'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
          text: getI18nText('pages.page7.headerText'),
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
        id: 'page7-question-background',
        name: 'page7-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page7-favorite-game-picture-text',
        name: 'page7-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page7-hide-seek-text-tile',
        name: 'page7-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page7-hide-seek-triangle-images-background',
        name: 'page7-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangles image (same row layout + quiz feedback as page 6)
      {
        id: 'page7-hide-and-seek-triangle-image',
        name: 'page7-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-hide-and-seek-triangle-image',
          elementName: 'page7-hide-and-seek-triangle-image',
          currentPage: 7,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'hideSeek',
          wrongOptionRowRevealQuizId: 'page7-quiz',
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page7-rope-jump-text-tile',
        name: 'page7-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page7-rope-jump-triangle-images-background',
        name: 'page7-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangles image (correct answer row: green glow + slot counts)
      {
        id: 'page7-rope-jump-triangle-image',
        name: 'page7-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-rope-jump-triangle-image',
          elementName: 'page7-rope-jump-triangle-image',
          currentPage: 7,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'ropeJump',
          wrongOptionRowRevealQuizId: 'page7-quiz',
          showSlotCountsOnCorrectQuizId: 'page7-quiz',
          greenGlowOnCorrectQuizId: 'page7-quiz',
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page7-marbles-text-tile',
        name: 'page7-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page7-marbles-triangle-images-background',
        name: 'page7-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangles image
      {
        id: 'page7-marbles-triangle-image',
        name: 'page7-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-marbles-triangle-image',
          elementName: 'page7-marbles-triangle-image',
          currentPage: 7,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'marbles',
          wrongOptionRowRevealQuizId: 'page7-quiz',
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page7-bentengan-text-tile',
        name: 'page7-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page7-bentengan-triangle-images-background',
        name: 'page7-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page7-bentengan-triangle-image',
        name: 'page7-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-bentengan-triangle-image',
          elementName: 'page7-bentengan-triangle-image',
          currentPage: 7,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          triangleRowId: 'bentengan',
          wrongOptionRowRevealQuizId: 'page7-quiz',
          showSlotCountsOnCorrectQuizId: 'page7-quiz',
          greenGlowOnCorrectQuizId: 'page7-quiz',
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page7-key-text-tile',
        name: 'page7-key-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page7-option-background',
        name: 'page7-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page7-quiz-panel',
        name: 'page7-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page7-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page7.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page7.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          text: getI18nText('pages.page7.footerInstruction'),
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
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage7'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
              }
            }
          }
        }
      },

    ],
    8: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page8-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.headerText'),
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
        id: 'page8-question-background',
        name: 'page8-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page8-favorite-game-picture-text',
        name: 'page8-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page8-hide-seek-text-tile',
        name: 'page8-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page8-hide-seek-triangle-images-background',
        name: 'page8-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangles image (layout like page 2); dull row 1 after any quiz tap (focus Bentengan vs Marbles)
      {
        id: 'page8-hide-and-seek-triangle-image',
        name: 'page8-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page8-hide-and-seek-triangle-image',
          elementName: 'page8-hide-and-seek-triangle-image',
          currentPage: 8,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page8-quiz',
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page8-rope-jump-text-tile',
        name: 'page8-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page8-rope-jump-triangle-images-background',
        name: 'page8-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangles image (no quiz hooks — like page 2 non-target rows); dull row 2 after any quiz tap
      {
        id: 'page8-rope-jump-triangle-image',
        name: 'page8-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page8-rope-jump-triangle-image',
          elementName: 'page8-rope-jump-triangle-image',
          currentPage: 8,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page8-quiz',
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page8-marbles-text-tile',
        name: 'page8-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page8-marbles-triangle-images-background',
        name: 'page8-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles row 3 — slot counts + strikes; no green glow on correct (glow only on Bentengan row 4)
      {
        id: 'page8-marbles-triangle-image',
        name: 'page8-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page8-marbles-triangle-image',
          elementName: 'page8-marbles-triangle-image',
          currentPage: 8,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page8-quiz',
          strikeLeadingSlotsAfterQuizClickQuizId: 'page8-quiz',
          strikeLeadingSlotsCount: 3,
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page8-bentengan-text-tile',
        name: 'page8-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page8-bentengan-triangle-images-background',
        name: 'page8-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page8-bentengan-triangle-image',
        name: 'page8-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page8-bentengan-triangle-image',
          elementName: 'page8-bentengan-triangle-image',
          currentPage: 8,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page8-quiz',
          greenGlowOnCorrectQuizId: 'page8-quiz',
          greenGlowOnCorrectStatic: true,
          strikeLeadingSlotsAfterQuizClickQuizId: 'page8-quiz',
          strikeLeadingSlotsCount: 3,
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page8-key-text-tile',
        name: 'page8-key-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page8-option-background',
        name: 'page8-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page8-quiz-panel',
        name: 'page8-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page8-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page8.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '30gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '30gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page8.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage8'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
              }
            }
          }
        }
      },

    ],
    9: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page9-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page9.headerText'),
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
        id: 'page9-question-background',
        name: 'page9-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page9-favorite-game-picture-text',
        name: 'page9-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page9-hide-seek-text-tile',
        name: 'page9-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page9-hide-seek-triangle-images-background',
        name: 'page9-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek row 1 — page-8-style row layout; strike first 4 on any quiz tap (compare vs rope row)
      {
        id: 'page9-hide-and-seek-triangle-image',
        name: 'page9-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page9-hide-and-seek-triangle-image',
          elementName: 'page9-hide-and-seek-triangle-image',
          currentPage: 9,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page9-quiz',
          strikeLeadingSlotsAfterQuizClickQuizId: 'page9-quiz',
          strikeLeadingSlotsCount: 4,
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page9-rope-jump-text-tile',
        name: 'page9-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page9-rope-jump-triangle-images-background',
        name: 'page9-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope row 2 — strike first 4; static green + counts on remaining two when correct
      {
        id: 'page9-rope-jump-triangle-image',
        name: 'page9-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page9-rope-jump-triangle-image',
          elementName: 'page9-rope-jump-triangle-image',
          currentPage: 9,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page9-quiz',
          greenGlowOnCorrectQuizId: 'page9-quiz',
          greenGlowOnCorrectStatic: true,
          strikeLeadingSlotsAfterQuizClickQuizId: 'page9-quiz',
          strikeLeadingSlotsCount: 4,
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page9-marbles-text-tile',
        name: 'page9-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page9-marbles-triangle-images-background',
        name: 'page9-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles row 3 — dim on any quiz tap (focus rows 1–2)
      {
        id: 'page9-marbles-triangle-image',
        name: 'page9-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page9-marbles-triangle-image',
          elementName: 'page9-marbles-triangle-image',
          currentPage: 9,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page9-quiz',
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page9-bentengan-text-tile',
        name: 'page9-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page9-bentengan-triangle-images-background',
        name: 'page9-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page9-bentengan-triangle-image',
        name: 'page9-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page9-bentengan-triangle-image',
          elementName: 'page9-bentengan-triangle-image',
          currentPage: 9,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page9-quiz',
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page9-key-text-tile',
        name: 'page9-key-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page9-option-background',
        name: 'page9-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page9-quiz-panel',
        name: 'page9-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page9-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page9.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page9.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage9'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
              }
            }
          }
        }
      },

    ],
    10: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page10-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page10.headerText'),
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
        name: 'page10-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page10-favorite-game-picture-text',
        name: 'page10-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page10-hide-seek-text-tile',
        name: 'page10-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page10-hide-seek-triangle-images-background',
        name: 'page10-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //row 1 — dim on quiz tap (same pattern as page 9 rows 3–4)
      {
        id: 'page10-hide-and-seek-triangle-image',
        name: 'page10-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page10-hide-and-seek-triangle-image',
          elementName: 'page10-hide-and-seek-triangle-image',
          currentPage: 10,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page10-quiz',
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page10-rope-jump-text-tile',
        name: 'page10-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page10-rope-jump-triangle-images-background',
        name: 'page10-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //row 2 — strike first 3; static green + counts on remaining (3 fewer than rope)
      {
        id: 'page10-rope-jump-triangle-image',
        name: 'page10-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page10-rope-jump-triangle-image',
          elementName: 'page10-rope-jump-triangle-image',
          currentPage: 10,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page10-quiz',
          greenGlowOnCorrectQuizId: 'page10-quiz',
          greenGlowOnCorrectStatic: true,
          strikeLeadingSlotsAfterQuizClickQuizId: 'page10-quiz',
          strikeLeadingSlotsCount: 3,
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page10-marbles-text-tile',
        name: 'page10-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page10-marbles-triangle-images-background',
        name: 'page10-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //row 3 — strike first 3 (all marbles struck); counts on correct only if any remain (none here)
      {
        id: 'page10-marbles-triangle-image',
        name: 'page10-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page10-marbles-triangle-image',
          elementName: 'page10-marbles-triangle-image',
          currentPage: 10,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page10-quiz',
          strikeLeadingSlotsAfterQuizClickQuizId: 'page10-quiz',
          strikeLeadingSlotsCount: 3,
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page10-bentengan-text-tile',
        name: 'page10-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page10-bentengan-triangle-images-background',
        name: 'page10-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page10-bentengan-triangle-image',
        name: 'page10-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page10-bentengan-triangle-image',
          elementName: 'page10-bentengan-triangle-image',
          currentPage: 10,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page10-quiz',
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page10-key-text-tile',
        name: 'page10-key-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page10-option-background',
        name: 'page10-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page10-quiz-panel',
        name: 'page10-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page10-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page10.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page10.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
        }
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
          text: getI18nText('pages.page10.footerInstruction'),
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage10'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
              }
            }
          }
        }
      },

    ],
    11: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page11-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page11.headerText'),
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
        id: 'page11-question-background',
        name: 'page11-question-background',
        type: 'custom',
        coordinates: [10, 100, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      //favorite games picture diagram text
      {
        id: 'page11-favorite-game-picture-text',
        name: 'page11-favorite-game-picture-text',
        type: 'custom',
        coordinates: [13, 103, 897, 200], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.favoriteGamerPicture"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek text tile
      {
        id: 'page11-hide-seek-text-tile',
        name: 'page11-hide-seek-text-tile',
        type: 'custom',
        coordinates: [13, 205, 247, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.hideAndSeek"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //hide and seek triangle images background
      {
        id: 'page11-hide-seek-triangle-images-background',
        name: 'page11-hide-seek-triangle-images-background',
        type: 'custom',
        coordinates: [252, 205, 897, 325], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //row 1 — strike first 4 (all hide); same structure as page 10 row 3
      {
        id: 'page11-hide-and-seek-triangle-image',
        name: 'page11-hide-and-seek-triangle-image',
        type: 'custom',
        coordinates: [265, 226, 885, 304],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page11-hide-and-seek-triangle-image',
          elementName: 'page11-hide-and-seek-triangle-image',
          currentPage: 11,
          coordinates: [265, 226, 885, 304],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page11-quiz',
          strikeLeadingSlotsAfterQuizClickQuizId: 'page11-quiz',
          strikeLeadingSlotsCount: 4,
          images: [
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/salmonTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //rope jump tile text
      {
        id: 'page11-rope-jump-text-tile',
        name: 'page11-rope-jump-text-tile',
        type: 'custom',
        coordinates: [13, 330, 247, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.ropeJump"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //rope jump triangle images background
      {
        id: 'page11-rope-jump-triangle-images-background',
        name: 'page11-rope-jump-triangle-images-background',
        type: 'custom',
        coordinates: [252, 330, 897, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //row 2 — dim on quiz tap (page 10-style)
      {
        id: 'page11-rope-jump-triangle-image',
        name: 'page11-rope-jump-triangle-image',
        type: 'custom',
        coordinates: [265, 351, 885, 429],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page11-rope-jump-triangle-image',
          elementName: 'page11-rope-jump-triangle-image',
          currentPage: 11,
          coordinates: [265, 351, 885, 429],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page11-quiz',
          images: [
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/blueTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },

      //marbles text tile
      {
        id: 'page11-marbles-text-tile',
        name: 'page11-marbles-text-tile',
        type: 'custom',
        coordinates: [13, 455, 247, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.marbles"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //marbles triangle images background
      {
        id: 'page11-marbles-triangle-images-background',
        name: 'page11-marbles-triangle-images-background',
        type: 'custom',
        coordinates: [252, 455, 897, 575], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //row 3 — dim on quiz tap
      {
        id: 'page11-marbles-triangle-image',
        name: 'page11-marbles-triangle-image',
        type: 'custom',
        coordinates: [265, 476, 885, 554],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page11-marbles-triangle-image',
          elementName: 'page11-marbles-triangle-image',
          currentPage: 11,
          coordinates: [265, 476, 885, 554],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          dimAfterAnyQuizOptionClickQuizId: 'page11-quiz',
          images: [
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/yellowTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //bentengan text tile
      {
        id: 'page11-bentengan-text-tile',
        name: 'page11-bentengan-text-tile',
        type: 'custom',
        coordinates: [13, 580, 247, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.bentengan"), // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //bentengan triangle images background
      {
        id: 'page11-bentengan-triangle-images-background',
        name: 'page11-bentengan-triangle-images-background',
        type: 'custom',
        coordinates: [252, 580, 897, 700], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#053b4ca1', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      {
        id: 'page11-bentengan-triangle-image',
        name: 'page11-bentengan-triangle-image',
        type: 'custom',
        coordinates: [265, 601, 885, 679],
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page11-bentengan-triangle-image',
          elementName: 'page11-bentengan-triangle-image',
          currentPage: 11,
          coordinates: [265, 601, 885, 679],
          zIndex: 51,
          rowLayout: true,
          rowSlotCount: 10,
          showSlotCountsOnCorrectQuizId: 'page11-quiz',
          greenGlowOnCorrectQuizId: 'page11-quiz',
          greenGlowOnCorrectStatic: true,
          strikeLeadingSlotsAfterQuizClickQuizId: 'page11-quiz',
          strikeLeadingSlotsCount: 4,
          images: [
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 },
            { src: 'assets/purpleTriangle.png', blink: false, glow: false, hidden: false, opacity: 1 }
          ]
        }
      },
      //key text
      {
        id: 'page11-key-text-tile',
        name: 'page11-key-text-tile',
        type: 'custom',
        coordinates: [13, 710, 897, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.gameLabel.key"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Black background container for option button
      {
        id: 'page11-option-background',
        name: 'page11-option-background',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //quiz panel
      {
        id: 'page11-quiz-panel',
        name: 'page11-quiz-panel',
        type: 'custom',
        coordinates: [910, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page11-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page11.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 10, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page11.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 70, // Override button height percentage (e.g., 85, 95). If null, uses config default
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
          imageAlt: getI18nText("common.tapGifAlt"),
          initialVisible: false,
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage11'));
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
            return getI18nText('buttons.previous');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
              }
            }
          }
        }
      },

    ],
    12: [

      // Feedback Textbox Component
      {
        id: "page12-feedback-textbox",
        name: "page12-feedback-textbox-unique",
        type: "custom",
        coordinates: [100, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page12.introText"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "50gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'white',
          border: 'none',
          lineHeight: "2"
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 620, 950, 720],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[1];
            window.location.reload(); // For simplicity, just reload the page to reset the state
          },
        },
      },

      // Tap GIF Image
      {
        id: "page12-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 650, 750, 750], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapGifAlt"),
        },
      },

      // // Previous button - Three Layer Structure
      // {
      //   id: "page12-previous-button",
      //   name: "previous-button",
      //   type: "button",
      //   coordinates: [5, 820, 150, 895],
      //   zIndex: "var(--z-button)",
      //   props: {
      //     get text() {
      //       return getI18nText("buttons.previous");
      //     },
      //     onClick: () => {
      //       if (typeof window !== "undefined" && window.playCarClickSound) {
      //         window.playCarClickSound("previous");
      //       }

      //       // Navigate to previous page using navigation config
      //       const nav = pageNavigation[1];
      //       if (nav && nav.prev) {
      //         navigateToPage(nav.prev, "previous");
      //       }
      //     },
      //   },
      // },
      // {
      //   id: "page12-instruction-text",
      //   name: "page12-instruction-text",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page12.instructionText.tapAfterReading"),
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
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
            getI18nText("messages.navigationReset")
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
            getI18nText("messages.navigationComplete")
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
        return getI18nText("buttons.startOver");
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
            getI18nText("messages.pageStatesCleared")
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
