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
  15: { prev: 14, next: 16 }, // Division Input mode test
  16: { prev: 15, next: 17 }, // Division Practice mode test
  17: { prev: 16, next: 18 }, // Division Guided mode test
  18: { prev: 17, next: null },
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

      // Information Analysis Panel
      {
        id: "page2-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page2.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page2.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page3.informationAnalysis.toFind",
            []
          ),
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

      // Information Analysis Panel
      {
        id: "page3-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page3.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page3.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page3.informationAnalysis.toFind",
            []
          ),
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
      // Question Text Box Component
      {
        id: "page6-question-text-box",
        name: "page6-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page6.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page6-question-table",
        name: "page6-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 375], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.questionTable", {
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      //quiz  panel
      {
        id: "page6-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 470, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page6-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page6.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page6.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page6.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page6.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page6.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page6.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page6.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page6.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 15, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '28gc'
        },
      },

      //concept summary
      {
        id: "page6-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page6.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page6.conceptSummary.keyConcepts", []),
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page7-question-text-box",
        name: "page7-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page7.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page7-question-table",
        name: "page7-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 375], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page7.questionTable", {
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      //quiz  panel
      {
        id: "page7-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
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
          keyConcepts: getI18nText("pages.page7.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page7.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 15, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
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
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page8-question-text-box",
        name: "page8-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150],
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page8.highlights", []),
          whiteSpace: "pre-line",
        },
      },

      // Arrange Steps Component
      {
        id: "page8-arrange-steps-panel",
        name: "page8-arrange-steps-panel",
        type: 'custom',
        coordinates: [20, 150, 1090, 815],
        zIndex: 55,
        props: {
          componentType: "ArrangeStepsComponent",
          id: "page8-arrange-steps",
          steps: [
            'Step 1: Write ratios as fractions.',
            'Step 2: Find cross-products.',
            'Step 3: Compare the cross-products.',
            'Step 4: Ratio with greater cross-product is greater.'
          ],
          orientation: 'vertical',
          initialButtonColor: '#FFA500',
          buttonFontColor: '#000000',
          buttonFontSize: '24gc',
          buttonBorderRadius: '8gc',
          buttonPadding: '12gc',
          gap: '10gc',
          correctColor: '#10b981',
          incorrectColor: '#ef4444',
          showFeedback: true,
          feedbackText: {
            correct: 'Correct! Steps are in the right order.',
            incorrect: 'Not quite. Try rearranging the steps.'
          },
          playDropSound: true,
          instructionText: 'Drag to arrange in correct order',
          instructionFontSize: '20gc',
          instructionFontColor: '#ffffff',
          containerBackgroundColor: 'transparent',
          containerBorderWidth: '0gc'
        }
      },

      // Concept Summary Panel
      {
        id: "page8-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815],
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page8.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page8.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },

      // Next Button
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
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
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous Button
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
            const nav = pageNavigation[8];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // Progress Dots
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
      // Question Text Box Component
      {
        id: "page9-question-text-box",
        name: "page9-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page9.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page9-question-table",
        name: "page9-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 300], // Left side table
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

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
              coordinate: [700, 280, 800, 330],
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
          optionsContainerCoordinates: [50, 420, 1075, 700],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 35,
          optionContainerInstructionText: getI18nText(
            "pages.page9.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "32gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page9.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page9.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page9.fillBlanks.keyConcepts", []),
        },
      },
      // Feedback Textbox Component
      {
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 710, 1075, 815], // Position above fill blanks component
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
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page10-question-text-box",
        name: "page10-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page10.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page10-question-table",
        name: "page10-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 300], // Left side table
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      // Feedback Textbox Component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 450, 1075, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page10.updationText"),
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
          factsArray: getI18nText(
            "pages.page10.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page11-question-text-box",
        name: "page11-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page11.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page11-question-table",
        name: "page11-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 300], // Left side table
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
          ataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },


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
              coordinate: [560, 430, 680, 495],
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
          optionsColumns: 4,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page11.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page11.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page11.fillBlanks.keyConcepts", []),
        },
      },
      // Feedback Textbox Component
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
          factsArray: getI18nText(
            "pages.page11.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page12-question-text-box",
        name: "page12-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page12.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page12-question-table",
        name: "page12-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 300], // Left side table
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },


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
              coordinate: [688, 430, 808, 495],
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
          optionButtonFontSize: "32gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 4,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page12.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page12.fillBlanks.impFormulae", []),
          keyConcepts: getI18nText("pages.page12.fillBlanks.keyConcepts", []),
        },
      },
      // Feedback Textbox Component
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
          factsArray: getI18nText(
            "pages.page12.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page13-question-text-box",
        name: "page13-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page13.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page13-question-table",
        name: "page13-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 300], // Left side table
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },

      // Feedback Textbox Component
      {
        id: "page13-feedback-textbox",
        name: "page13-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 530, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page13.updationText"),
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "34gc",
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
        id: "page13-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page13.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText(
            "pages.page13.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page14-question-text-box",
        name: "page14-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page14.highlights", []),
          whiteSpace: "pre-line",
        },
      },


      //quiz  panel
      {
        id: "page14-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
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
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 15, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '28gc'
        },
      },
      //table
      {
        id: "page14-question-table",
        name: "page14-question-table",
        type: "custom",
        coordinates: [15, 250, 310, 450], // Left side table
        zIndex: 55,
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
          fontSize: "30gc",
          headerFontSize: "20gc",
          padding: "10gc",
          equalColumnWidths: true,
        },
      },
      //fraction image 
      {
        id: "page14-fraction-image",
        name: "page14-fraction-image",
        type: "container",
        coordinates: [0, 350, 700, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/fractionPicture.png",
          imageAlt: "Right Arrow",
        },
      },
      //let's compare text
      {
        id: "page14-lets-compare-text",
        name: "page14-lets-compare-text",
        type: "textbox",
        coordinates: [310, 260, 600, 320],
        zIndex: 71,
        props: {
          text: getI18nText("common.letsCompare", "Let's Compare!"),
          fontSize: "26gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix A
      {
        id: "page14-mix-a-text",
        name: "page14-mix-a-text",
        type: "textbox",
        coordinates: [320, 320, 540, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixA", "Mix A"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix B
      {
        id: "page14-mix-b-text",
        name: "page14-mix-b-text",
        type: "textbox",
        coordinates: [520, 320, 620, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixB", "Mix B"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //cross product
      {
        id: "page14-cross-product-text",
        name: "page14-cross-product-text",
        type: "textbox",
        coordinates: [180, 550, 470, 550],
        zIndex: 71,
        props: {
          text: getI18nText("common.crossProduct", "Cross Product"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //left box
      {
        id: "page14-left-box",
        name: "page14-left-box",
        type: "container",
        coordinates: [350, 555, 450, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //right box
      {
        id: "page14-right-box",
        name: "page14-right-box",
        type: "container",
        coordinates: [530, 555, 630, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //A text
      {
        id: "page14-a-text",
        name: "page14-a-text",
        type: "textbox",
        coordinates: [350, 560, 450, 625],
        zIndex: 71,
        props: {
          text: getI18nText("common.aText", "a"),
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //B text
      {
        id: "page14-b-text",
        name: "page14-b-text",
        type: "textbox",
        coordinates: [530, 560, 630, 625],
        zIndex: 71,
        props: {
          text: getI18nText("common.bText", "b"),
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
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
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page15-question-text-box",
        name: "page15-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page15.highlights", []),
          whiteSpace: "pre-line",
        },
      },


      //quiz  panel
      {
        id: "page15-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page15-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page15.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page15.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page15.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page15.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page15.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page15.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page15.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page15.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 14, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '32gc',
          questionTextFontSize: '32gc'
        },
      },
      //table
      {
        id: "page15-question-table",
        name: "page15-question-table",
        type: "custom",
        coordinates: [15, 250, 310, 450], // Left side table
        zIndex: 55,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page15.questionTable", {
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
          fontSize: "30gc",
          headerFontSize: "20gc",
          padding: "10gc",
          equalColumnWidths: true,
        },
      },
      //fraction image 
      {
        id: "page15-fraction-image",
        name: "page15-fraction-image",
        type: "container",
        coordinates: [0, 350, 700, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/fractionPicture.png",
          imageAlt: "Right Arrow",
        },
      },
      //let's compare text
      {
        id: "page15-lets-compare-text",
        name: "page15-lets-compare-text",
        type: "textbox",
        coordinates: [310, 260, 600, 320],
        zIndex: 71,
        props: {
          text: getI18nText("common.letsCompare", "Let's Compare!"),
          fontSize: "26gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix A
      {
        id: "page15-mix-a-text",
        name: "page15-mix-a-text",
        type: "textbox",
        coordinates: [320, 320, 540, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixA", "Mix A"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix B
      {
        id: "page15-mix-b-text",
        name: "page15-mix-b-text",
        type: "textbox",
        coordinates: [520, 320, 620, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixB", "Mix B"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //cross product
      {
        id: "page15-cross-product-text",
        name: "page15-cross-product-text",
        type: "textbox",
        coordinates: [180, 550, 470, 550],
        zIndex: 71,
        props: {
          text: getI18nText("common.crossProduct", "Cross Product"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //left box
      {
        id: "page15-left-box",
        name: "page15-left-box",
        type: "container",
        coordinates: [350, 555, 450, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //right box
      {
        id: "page15-right-box",
        name: "page15-right-box",
        type: "container",
        coordinates: [530, 555, 630, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //A text
      {
        id: "page15-a-text",
        name: "page15-a-text",
        type: "textbox",
        coordinates: [350, 555, 450, 625],
        zIndex: 71,
        props: {
          text: "9",
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "#25CEFC",
          padding: "0gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      //B text
      {
        id: "page15-b-text",
        name: "page15-b-text",
        type: "textbox",
        coordinates: [530, 555, 630, 625],
        zIndex: 71,
        props: {
          text: "4",
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "#25CEFC",
          padding: "0gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      //> sign text
      {
        id: "page15-greater-sign",
        name: "page15-greater-sign",
        type: "textbox",
        coordinates: [440, 560, 540, 625],
        zIndex: 71,
        props: {
          text: getI18nText("common.greaterSign", ">"),
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
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
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page15-next-button",
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
            const nav = pageNavigation[15];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page15-tap-next",
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
    ],
    16: [
      // Question Text Box Component
      {
        id: "page16-question-text-box",
        name: "page16-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page16.highlights", []),
          whiteSpace: "pre-line",
        },
      },


      //quiz  panel
      {
        id: "page16-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page16-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page16.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page16.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page16.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page16.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page16.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page16.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page16.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page16.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 15, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '28gc'
        },
      },
      //table
      {
        id: "page16-question-table",
        name: "page16-question-table",
        type: "custom",
        coordinates: [15, 250, 310, 450], // Left side table
        zIndex: 55,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page16.questionTable", {
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
          fontSize: "30gc",
          headerFontSize: "20gc",
          padding: "10gc",
          equalColumnWidths: true,
        },
      },
      //fraction image 
      {
        id: "page16-fraction-image",
        name: "page16-fraction-image",
        type: "container",
        coordinates: [0, 350, 700, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/fractionPictureTwo.png",
          imageAlt: "Right Arrow",
        },
      },
      //let's compare text
      {
        id: "page16-lets-compare-text",
        name: "page16-lets-compare-text",
        type: "textbox",
        coordinates: [310, 260, 600, 320],
        zIndex: 71,
        props: {
          text: getI18nText("common.letsCompare", "Let's Compare!"),
          fontSize: "26gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix A
      {
        id: "page16-mix-a-text",
        name: "page16-mix-a-text",
        type: "textbox",
        coordinates: [320, 320, 540, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixA", "Mix A"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix B
      {
        id: "page16-mix-b-text",
        name: "page16-mix-b-text",
        type: "textbox",
        coordinates: [520, 320, 620, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixB", "Mix B"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //cross product
      {
        id: "page16-cross-product-text",
        name: "page16-cross-product-text",
        type: "textbox",
        coordinates: [180, 550, 470, 550],
        zIndex: 71,
        props: {
          text: getI18nText("common.crossProduct", "Cross Product"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //left box
      {
        id: "page16-left-box",
        name: "page16-left-box",
        type: "container",
        coordinates: [350, 555, 450, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //right box
      {
        id: "page16-right-box",
        name: "page16-right-box",
        type: "container",
        coordinates: [530, 555, 630, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //A text
      {
        id: "page16-a-text",
        name: "page16-a-text",
        type: "textbox",
        coordinates: [350, 560, 450, 625],
        zIndex: 71,
        props: {
          text: getI18nText("common.aText", "a"),
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //B text
      {
        id: "page16-b-text",
        name: "page16-b-text",
        type: "textbox",
        coordinates: [530, 560, 630, 625],
        zIndex: 71,
        props: {
          text: getI18nText("common.bText", "b"),
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //concept summary
      {
        id: "page16-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page16.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page16.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page16-next-button",
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
            const nav = pageNavigation[16];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page16-tap-next",
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
        id: "page16-previous-button",
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
            const nav = pageNavigation[16];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page16-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    17: [
      // Question Text Box Component
      {
        id: "page17-question-text-box",
        name: "page17-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page17.highlights", []),
          whiteSpace: "pre-line",
        },
      },


      //quiz  panel
      {
        id: "page17-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 50, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page17-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page17.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page17.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page17.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page17.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page17.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page17.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page17.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page17.quizPanel.impFormulae", []),
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 70, // 70% for options
          feedbackRowHeight: 14, // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of
          contentFontSize: '32gc',
          questionTextFontSize: '32gc'
        },
      },
      //table
      {
        id: "page17-question-table",
        name: "page17-question-table",
        type: "custom",
        coordinates: [15, 250, 310, 450], // Left side table
        zIndex: 55,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page17.questionTable", {
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
          fontSize: "30gc",
          headerFontSize: "20gc",
          padding: "10gc",
          equalColumnWidths: true,
        },
      },
      //fraction image 
      {
        id: "page17-fraction-image",
        name: "page17-fraction-image",
        type: "container",
        coordinates: [0, 350, 700, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/fractionPictureTwo.png",
          imageAlt: "Right Arrow",
        },
      },
      //let's compare text
      {
        id: "page17-lets-compare-text",
        name: "page17-lets-compare-text",
        type: "textbox",
        coordinates: [310, 260, 600, 320],
        zIndex: 71,
        props: {
          text: getI18nText("common.letsCompare", "Let's Compare!"),
          fontSize: "26gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix A
      {
        id: "page17-mix-a-text",
        name: "page17-mix-a-text",
        type: "textbox",
        coordinates: [320, 320, 540, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixB", "Mix B"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //mix B
      {
        id: "page17-mix-b-text",
        name: "page17-mix-b-text",
        type: "textbox",
        coordinates: [520, 320, 620, 350],
        zIndex: 71,
        props: {
          text: getI18nText("common.mixC", "Mix C"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
        },
      },
      //cross product
      {
        id: "page17-cross-product-text",
        name: "page17-cross-product-text",
        type: "textbox",
        coordinates: [180, 550, 470, 550],
        zIndex: 71,
        props: {
          text: getI18nText("common.crossProduct", "Cross Product"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          // textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //left box
      {
        id: "page17-left-box",
        name: "page17-left-box",
        type: "container",
        coordinates: [350, 555, 450, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //right box
      {
        id: "page17-right-box",
        name: "page17-right-box",
        type: "container",
        coordinates: [530, 555, 630, 625],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "var(--color-white)",
          borderRadius: "8gc",
        },
      },
      //A text
      {
        id: "page17-a-text",
        name: "page17-a-text",
        type: "textbox",
        coordinates: [350, 555, 450, 625],
        zIndex: 71,
        props: {
          text: "2",
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "#25CEFC",
          padding: "0gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      //B text
      {
        id: "page17-b-text",
        name: "page17-b-text",
        type: "textbox",
        coordinates: [530, 555, 630, 625],
        zIndex: 71,
        props: {
          text: "6",
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "#25CEFC",
          padding: "0gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      //> sign text
      {
        id: "page17-greater-sign",
        name: "page17-greater-sign",
        type: "textbox",
        coordinates: [440, 560, 540, 625],
        zIndex: 71,
        props: {
          text: getI18nText("common.lessSign", ">"),
          fontSize: "36gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "transparent",
          padding: "5gc",
          borderRadius: "8gc",
          whiteSpace: "pre-line",
        },
      },
      //concept summary
      {
        id: "page17-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page17.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText("pages.page17.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page17-next-button",
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
            const nav = pageNavigation[17];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page17-tap-next",
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
        id: "page17-previous-button",
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
            const nav = pageNavigation[17];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page17-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    18: [
      // Question Text Box Component
      {
        id: "page18-question-text-box",
        name: "page18-question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page18.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      //table
      {
        id: "page18-question-table",
        name: "page18-question-table",
        type: "custom",
        coordinates: [280, 150, 830, 300], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page18.questionTable", {
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
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },

      // summary text Component
      {
        id: "page18-summary-text",
        name: "page18-summary-text",
        type: "custom",
        coordinates: [50, 530, 1075, 715], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page18.updationText"),
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //activity completed text
      {
        id: "page18-activity-completed",
        name: "page18-activity-completed",
        type: "custom",
        coordinates: [50, 720, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page18.activityCompleted"),
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
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
        id: "page18-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page18.conceptSummary.given", []),
          toFindArray: "",
          factsArray: getI18nText(
            "pages.page18.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page18-next-button",
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

            window.location.reload();
          },
        },
      },

      // Tap GIF Image
      {
        id: "page18-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1150, 840, 1400, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
      {
        id: "page18-previous-button",
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
            const nav = pageNavigation[18];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page18-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
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
