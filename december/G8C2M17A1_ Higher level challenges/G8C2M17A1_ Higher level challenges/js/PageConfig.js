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
  // Test pages for new multiplication grid modes
  9: { prev: 8, next: 10 },   // Practice mode test
  10: { prev: 9, next: 11 },  // Guided mode test
  11: { prev: 10, next: 12 }, // Animation mode test
  12: { prev: 11, next: 13 }, // DragDrop mode test
  // Test pages for long division grid modes
  13: { prev: 12, next: 14 }, // Division Default mode test
  14: { prev: 13, next: 15 }, // Division SpotIncorrect mode test
  15: { prev: 14, next: null }
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
  const questionBottomY = 150;
  // Return optimized GridPositionPages
  return {
    1: [
      // Question Introduction Text Box Component
      {
        id: "page1-question-intro",
        name: "page1-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page1.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },

      {
        id: "page1-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [200, 300, 1400, 700], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page1.introduction"),
          fontSize: "44gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre-line"
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
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
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page1-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[1];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page1-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],

    2: [
      // Question Introduction Text Box Component
      {
        id: "page2-question-intro",
        name: "page2-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page2.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page2-rectangle-image",
        name: "page2-rectangle-image",
        type: "container",
        coordinates: [420, 200, 1120, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangle.png",
          imageAlt: "rectangle image",

        },
      },
      {
        id: "page2-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [420, 700, 1120, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page2.introduction"),
          fontSize: "44gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre-line"
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[2];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page2-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",

        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page2-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page2-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],

    3: [
      // Question Introduction Text Box Component
      {
        id: "page3-question-intro",
        name: "page3-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page3.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },

      {
        id: "page3-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page3-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page3.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page3.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page3.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page3.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: "assets/rectangle.png",
          imageText: getI18nText("pages.page3.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page3.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page3.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page3.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 15, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '32gc',
          questionTextFontSize: "36gc"
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page3-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page3-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[3];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page3-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],

    4: [
      // Question Introduction Text Box Component
      {
        id: "page4-question-intro",
        name: "page4-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page4-rectangle-image",
        name: "page4-rectangle-image",
        type: "container",
        coordinates: [220, 200, 920, 600],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleTwo.png",
          imageAlt: "rectangle image",

        },
      },
      //60° text
      {
        id: "page4-60-degree-text",
        name: "page4-60-degree-text",
        type: "textbox",
        coordinates: [320, 470, 360, 500], // Position below roller coaster image
        zIndex: 56,
        props: {
          text: getI18nText("common.sixtyDegree"),
          fontSize: "44gc",
          color: "#23aff1ff",
          fontWeight: 700,
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre-line",
          pulsate: true
        },
      },
      //60° text-2
      {
        id: "page4-60-degree-text-two",
        name: "page4-60-degree-text-two",
        type: "textbox",
        coordinates: [780, 320, 820, 360], // Position below roller coaster image
        zIndex: 56,
        props: {
          text: getI18nText("common.sixtyDegree"),
          fontSize: "44gc",
          color: "#23aff1ff",
          fontWeight: 700,
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre-line",

        },
      },
      // Information Analysis Panel
      {
        id: "page4-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page4.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page4.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page4.informationAnalysis.toFind",
            []
          ),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[4];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page4-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page4-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[4];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page4-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],

    5: [
      // Question Introduction Text Box Component
      {
        id: "page5-question-intro",
        name: "page5-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page5.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page5-rectangle-image",
        name: "page5-rectangle-image",
        type: "container",
        coordinates: [220, 200, 920, 600],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleThree.png",
          imageAlt: "rectangle image",

        },
      },

      // Information Analysis Panel
      {
        id: "page5-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page5.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page5.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page5.informationAnalysis.toFind",
            []
          ),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page5-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page5-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[5];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page5-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    6: [
      // Question Introduction Text Box Component
      {
        id: "page6-question-intro",
        name: "page6-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page6.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page6-rectangle-image",
        name: "page6-rectangle-image",
        type: "container",
        coordinates: [220, 200, 920, 600],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleThree.png",
          imageAlt: "rectangle image",

        },
      },

      // Information Analysis Panel
      {
        id: "page6-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page6.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page6.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page6.informationAnalysis.toFind",
            []
          ),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[6];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page6-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page6-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[6];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page6-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    7: [
      // Question Introduction Text Box Component
      {
        id: "page7-question-intro",
        name: "page7-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page7.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page7-rectangle-image",
        name: "page7-rectangle-image",
        type: "container",
        coordinates: [220, 150, 920, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleFour.png",
          imageAlt: "rectangle image",

        },
      },
      {
        id: "page7-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 500, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page7-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page7.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page7.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page7.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page7.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page7.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page7.quizPanel.options", []),
          keyConcepts: "",
          impFormulae: getI18nText("pages.page7.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 50, // 70% for options
          feedbackRowHeight: 25, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '32gc',
          questionTextFontSize: "32gc",
        },
      },
      //concept summary
      {
        id: "page7-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page7.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page7.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page7.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[7];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page7-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page7-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[7];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page7-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    8: [
      // Question Introduction Text Box Component
      {
        id: "page8-question-intro",
        name: "page8-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page8.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page8-rectangle-image",
        name: "page8-rectangle-image",
        type: "container",
        coordinates: [220, 150, 920, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleFive.png",
          imageAlt: "rectangle image",

        },
      },
      {
        id: "page8-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 500, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page8-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page8.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page8.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page8.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page8.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page8.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page8.quizPanel.options", []),
          keyConcepts: "",
          impFormulae: getI18nText("pages.page8.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 50, // 70% for options
          feedbackRowHeight: 25, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '32gc',
          questionTextFontSize: "32gc",
        },
      },
      //concept summary
      {
        id: "page8-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page8.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page8.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page8.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page8-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[8];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page8-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page8-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[8];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page8-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    9: [
      // Question Introduction Text Box Component
      {
        id: "page9-question-intro",
        name: "page9-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page9.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page9-rectangle-image",
        name: "page9-rectangle-image",
        type: "container",
        coordinates: [10, 100, 550, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/halfRectangle.png",
          imageAlt: "rectangle image",

        },
      },
      //table
      {
        id: "page9-question-table",
        name: "page9-question-table",
        type: "custom",
        coordinates: [600, 170, 950, 340], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page9.questionTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "32gc",
          headerFontSize: "32gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      //fill blanks mcq type
      {
        id: "page9-fill-blanks",
        name: "page9-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [625, 265, 715, 317],
              image: "",
              bgColor: "yellow",
              bgBlink: true,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [50, 520, 1075, 740],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText(
            "pages.page9.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "36gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 3,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page9.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page9.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page9.fillBlanks.keyConcepts", []),
          optionPadding: '16gc',
          optionGap: "10gc"
        },
      },
      //feed component
      {
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 745, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page9-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "",
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //concept summary
      {
        id: "page9-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page9.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page9.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page9.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[9];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page9-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page9-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[9];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page9-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    10: [
      // Question Introduction Text Box Component
      {
        id: "page10-question-intro",
        name: "page10-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page10.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page10-rectangle-image",
        name: "page10-rectangle-image",
        type: "container",
        coordinates: [10, 100, 550, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/halfRectangle.png",
          imageAlt: "rectangle image",

        },
      },
      //table
      {
        id: "page10-question-table",
        name: "page10-question-table",
        type: "custom",
        coordinates: [600, 170, 950, 300], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page10.questionTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "32gc",
          headerFontSize: "32gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      //fill blanks mcq type
      {
        id: "page10-fill-blanks",
        name: "page10-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [730, 265, 820, 332],
              image: "",
              bgColor: "yellow",
              bgBlink: true,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [50, 520, 1075, 740],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText(
            "pages.page10.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "36gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 3,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page10.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page10.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page10.fillBlanks.keyConcepts", []),
          optionPadding: '16gc',
          optionGap: "10gc"
        },
      },
      //feed component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 745, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "",
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //concept summary
      {
        id: "page10-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page10.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page10.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page10.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page10-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[10];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page10-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page10-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[10];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page10-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    11: [
      // Question Introduction Text Box Component
      {
        id: "page11-question-intro",
        name: "page11-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page11.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page11-rectangle-image",
        name: "page11-rectangle-image",
        type: "container",
        coordinates: [10, 100, 550, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/halfRectangle.png",
          imageAlt: "rectangle image",

        },
      },
      //table
      {
        id: "page11-question-table",
        name: "page11-question-table",
        type: "custom",
        coordinates: [600, 170, 950, 300], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page11.questionTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "32gc",
          headerFontSize: "32gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      //fill blanks mcq type
      {
        id: "page11-fill-blanks",
        name: "page11-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [835, 265, 925, 332],
              image: "",
              bgColor: "yellow",
              bgBlink: true,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [50, 520, 1075, 740],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText(
            "pages.page11.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "36gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 3,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page11.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page11.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page11.fillBlanks.keyConcepts", []),
          optionPadding: '16gc',
          optionGap: "10gc"
        },
      },
      //feed component
      {
        id: "page11-feedback-textbox",
        name: "page11-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 745, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page11-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "",
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //concept summary
      {
        id: "page11-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page11.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page11.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page11.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page11-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[11];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page11-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page11-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[11];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page11-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    12: [
      // Question Introduction Text Box Component
      {
        id: "page12-question-intro",
        name: "page12-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page12.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page12-rectangle-image",
        name: "page12-rectangle-image",
        type: "container",
        coordinates: [10, 100, 550, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleSix.png",
          imageAlt: "rectangle image",

        },
      },
      //table
      {
        id: "page12-question-table",
        name: "page12-question-table",
        type: "custom",
        coordinates: [600, 170, 950, 300], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page12.questionTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "32gc",
          headerFontSize: "32gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      //arrow image
      {
        id: "page12-arrow-image",
        name: "page12-arrow-image",
        type: "container",
        coordinates: [930, 280, 1030, 380],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/leftArrow.png",
          imageAlt: "arrow image",

        },
      },
      //fill blanks mcq type
      {
        id: "page12-fill-blanks",
        name: "page12-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [960, 285, 1050, 352],
              image: "",
              bgColor: "yellow",
              bgBlink: true,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [50, 520, 1075, 740],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText(
            "pages.page12.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "36gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 3,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page12.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page12.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page12.fillBlanks.keyConcepts", []),
          optionPadding: '16gc',
          optionGap: "10gc"
        },
      },
      //feed component
      {
        id: "page12-feedback-textbox",
        name: "page12-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 745, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page12-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "",
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //concept summary
      {
        id: "page12-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page12.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page12.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page12.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[12];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page12-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page12-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[12];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page12-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    13: [
      // Question Introduction Text Box Component
      {
        id: "page13-question-intro",
        name: "page13-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page13.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page13-rectangle-image",
        name: "page13-rectangle-image",
        type: "container",
        coordinates: [10, 100, 550, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleSeven.png",
          imageAlt: "rectangle image",

        },
      },
      //table
      {
        id: "page13-question-table",
        name: "page13-question-table",
        type: "custom",
        coordinates: [600, 170, 950, 300], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page13.questionTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "32gc",
          headerFontSize: "32gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      //arrow image
      {
        id: "page13-arrow-image",
        name: "page13-arrow-image",
        type: "container",
        coordinates: [930, 280, 1030, 380],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/leftArrow.png",
          imageAlt: "arrow image",

        },
      },
      //tile
      {
        id: "page13-tile-container",
        name: "page13-tile-container",
        type: "textbox",
        coordinates: [960, 285, 1050, 352],
        zIndex: 71,
        props: {
          text: "6",
          fontSize: "26gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.8)",
          padding: "5gc",
          borderRadius: "8gc",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
      //quiz  panel
      {
        id: "page13-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 450, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page13-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page13.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page13.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page13.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page13.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page13.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page13.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page13.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page13.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 50, // 70% for options
          feedbackRowHeight: 35, // 15% for feedback
          optionsContainerWidth: 100, // Options container uses 80% of
          contentFontSize: '28gc',
          questionTextFontSize: '28gc'
        },
      },
      //concept summary
      {
        id: "page13-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page13.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page13.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page13.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page13-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[13];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page13-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page13-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[13];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page13-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    14: [
      // Question Introduction Text Box Component
      {
        id: "page14-question-intro",
        name: "page14-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page14.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },
      //rectangleImage
      {
        id: "page14-rectangle-image",
        name: "page14-rectangle-image",
        type: "container",
        coordinates: [10, 100, 550, 470],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleSeven.png",
          imageAlt: "rectangle image",

        },
      },
      //table
      {
        id: "page14-question-table",
        name: "page14-question-table",
        type: "custom",
        coordinates: [600, 170, 950, 300], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page14.questionTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "32gc",
          headerFontSize: "32gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      //arrow image
      {
        id: "page14-arrow-image",
        name: "page14-arrow-image",
        type: "container",
        coordinates: [930, 280, 1030, 380],
        zIndex: 54,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/leftArrow.png",
          imageAlt: "arrow image",

        },
      },
      //tile
      {
        id: "page14-tile-container",
        name: "page14-tile-container",
        type: "textbox",
        coordinates: [960, 285, 1050, 352],
        zIndex: 71,
        props: {
          text: "6",
          fontSize: "26gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.8)",
          padding: "5gc",
          borderRadius: "8gc",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
      //quiz  panel
      {
        id: "page14-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 450, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page14-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page14.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page14.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page14.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page14.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page14.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page14.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page14.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page14.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 50, // 70% for options
          feedbackRowHeight: 35, // 15% for feedback
          optionsContainerWidth: 100, // Options container uses 80% of
          contentFontSize: '28gc',
          questionTextFontSize: '28gc'
        },
      },
      //concept summary
      {
        id: "page14-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page14.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page14.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page14.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page14-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[14];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page14-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page14-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[14];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page14-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    15: [
      // Question Introduction Text Box Component
      {
        id: "page15-question-intro",
        name: "page15-question-intro",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page15.highlights", []),
          whiteSpace: "pre-line",
          textSize: questionTextSize
        },
      },

      //rectangleImage
      {
        id: "page15-rectangle-image",
        name: "page15-rectangle-image",
        type: "container",
        coordinates: [220, 200, 920, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          imageSrc: "assets/rectangleSeven.png",
          imageAlt: "rectangle image",

        },
      },
      //summary text
      {
        id: "page15-summary-text",
        name: "page15-summary-text",
        type: "custom",
        coordinates: [50, 620, 1075, 750], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page15.summaryText", ""),
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //Activity Completed 
      {
        id: "page15-summary-text",
        name: "page15-summary-text",
        type: "custom",
        coordinates: [50, 770, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page15.activityCompleted", ""),
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //concept summary
      {
        id: "page15-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page15.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page15.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page15.conceptSummary.impFormulae", []),
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page15-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1250, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver", "»");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            window.location.reload();
          },
        },
      },

      // Tap GIF Image
      {
        id: "page15-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1250, 840, 1300, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page15-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            // Navigate to previous page using navigation config
            const nav = pageNavigation[15];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page15-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ]
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
