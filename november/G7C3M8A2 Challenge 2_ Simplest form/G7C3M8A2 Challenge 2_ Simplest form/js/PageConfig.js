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
  25: { prev: 24, next: 26 },
  26: { prev: 25, next: 27 },
  27: { prev: 26, next: 28 },
  28: { prev: 27, next: 29 },
  29: { prev: 28, next: 30 },
  29: { prev: 29, next: null },
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

  // Helper function for i18n text (optimized)
  const getI18nText = (key, fallback, params = {}) => {
    return typeof i18n !== "undefined" ? i18n.t(key, params) : fallback;
  };

  const questionBottomY = 150;

  // Return optimized GridPositionPages
  return {
    1: [
      // Question Introduction Text Box Component
      {
        id: "page1-question-intro",
        name: "question-intro-text",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page1.highlights", []),
          whiteSpace: "pre-line"
        },
      },

      {
        id: "page1-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [400, 400, 1200, 600], // Position below roller coaster image
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
      // Question Text Box Component
      {
        id: "page2-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page2.highlights", []),
          whiteSpace: 'pre-line'
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
            "pages.page2.informationAnalysis.toFind",
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
      // Question Text Box Component
      {
        id: "page3-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page3.highlights", []),
          whiteSpace: 'pre-line'
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
      // Question Text Box Component
      {
        id: "page4-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: 'pre-line'
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
      // Question Text Box Component
      {
        id: "page5-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page5.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page5-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 70,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page5-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page5.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page5.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page5.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page5.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page5.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page5.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page5.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page5.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page5-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page5.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page5.conceptSummary.toFind", []),
          factsArray: getI18nText("pages.page5.conceptSummary.keyConcepts", []),
          valueArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page6.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page6-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
        },
      },
      {
        id: "page6-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page6.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page6.conceptSummary.toFind", []),
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page7.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page7-solution-textbox",
        name: "page7-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page7.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page7-fraction-text",
        name: "page7-fraction-text",
        type: "custom",
        coordinates: [700, 150, 840, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page7.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: "page7-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
        },
      },
      {
        id: "page7-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page8.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page8-solution-textbox",
        name: "page8-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page8.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page8-fraction-text",
        name: "page8-fraction-text",
        type: "custom",
        coordinates: [700, 150, 840, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page8.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page8-fraction-text=gcf",
        name: "page8-fraction-text-gcf",
        type: "custom",
        coordinates: [700, 250, 940, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page8.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: "page8-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
          keyConcepts: getI18nText("pages.page8.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page8.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page8-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page8.conceptSummary.keyConcepts", []),
          valueArray: "",
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
      // Question Text Box Component
      {
        id: "page9-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page9.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page9-solution-textbox",
        name: "page9-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page9.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page9-fraction-text",
        name: "page9-fraction-text",
        type: "custom",
        coordinates: [700, 150, 840, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page9.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page9-fraction-text=gcf",
        name: "page9-fraction-text-gcf",
        type: "custom",
        coordinates: [710, 250, 940, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page9.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      {
        id: "page9-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page9-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page9.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page9.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page9.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page9.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page9.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page9.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page9.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page9.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page9-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionA", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page10.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page10-solution-textbox",
        name: "page10-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page10.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page10-fraction-text",
        name: "page10-fraction-text",
        type: "custom",
        coordinates: [700, 150, 840, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page10.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page10-fraction-text-gcf",
        name: "page10-fraction-text-gcf",
        type: "custom",
        coordinates: [710, 250, 940, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page10.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text simplest form
      {
        id: "page10-fraction-text-simplestForm",
        name: "page10-fraction-text-simplestForm",
        type: "custom",
        coordinates: [710, 330, 840, 450], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page10.solutionText.simplestFormFraction"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      {
        id: "page10-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 430, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page10-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page10.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page10.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page10.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page10.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page10.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page10.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page10.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page10.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page10-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page10.conceptSummary.keyConcepts", []),
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page11.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      // Information Analysis Panel
      {
        id: "page11-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page11.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page11.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page11.informationAnalysis.toFind",
            []
          ),
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page12.highlights", []),
          whiteSpace: 'pre-line'
        },
      },

      // Information Analysis Panel
      {
        id: "page12-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page12.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page12.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page12.informationAnalysis.toFind",
            []
          ),
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page13.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      // Information Analysis Panel
      {
        id: "page13-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page13.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page13.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page13.informationAnalysis.toFind",
            []
          ),
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page14.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page14-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
        },
      },
      {
        id: "page14-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page14.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page14.conceptSummary.toFind", []),
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page15.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page15-solution-textbox",
        name: "page15-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page15.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page15-fraction-text",
        name: "page15-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page15.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: "page15-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
        },
      },
      {
        id: "page15-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page16.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page16-solution-textbox",
        name: "page16-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page16.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page16-fraction-text",
        name: "page16-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page16.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page16-fraction-text=gcf",
        name: "page16-fraction-text-gcf",
        type: "custom",
        coordinates: [715, 250, 940, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page16.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: "page16-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
        },
      },
      {
        id: "page16-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page17.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page17-solution-textbox",
        name: "page17-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page17.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page17-fraction-text",
        name: "page17-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page17.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page17-fraction-text=gcf",
        name: "page17-fraction-text-gcf",
        type: "custom",
        coordinates: [720, 250, 950, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page17.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      {
        id: "page17-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
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
        },
      },
      {
        id: "page17-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionB", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page18.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page18-solution-textbox",
        name: "page18-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page18.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page18-fraction-text",
        name: "page18-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page18.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page18-fraction-text-gcf",
        name: "page18-fraction-text-gcf",
        type: "custom",
        coordinates: [710, 250, 940, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page18.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text simplest form
      {
        id: "page18-fraction-text-simplestForm",
        name: "page18-fraction-text-simplestForm",
        type: "custom",
        coordinates: [710, 330, 840, 450], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page18.solutionText.simplestFormFraction"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      {
        id: "page18-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 430, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page18-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page18.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page18.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page18.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page18.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page18.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page18.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page18.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page18.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page18-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page18.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page18-next-button",
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
            const nav = pageNavigation[18];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page18-tap-next",
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
    19: [
      // Question Text Box Component
      {
        id: "page19-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page19.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      // Information Analysis Panel
      {
        id: "page19-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page19.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page19.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page19.informationAnalysis.toFind",
            []
          ),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page19-next-button",
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
            const nav = pageNavigation[19];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page19-tap-next",
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
        id: "page19-previous-button",
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
            const nav = pageNavigation[19];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page19-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    20: [
      // Question Text Box Component
      {
        id: "page20-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page20.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      // Information Analysis Panel
      {
        id: "page20-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page20.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page20.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page20.informationAnalysis.toFind",
            []
          ),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page20-next-button",
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
            const nav = pageNavigation[20];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page20-tap-next",
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
        id: "page20-previous-button",
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
            const nav = pageNavigation[20];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page20-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    21: [
      // Question Text Box Component
      {
        id: "page21-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page21.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      // Information Analysis Panel
      {
        id: "page21-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page21.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page21.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page21.informationAnalysis.toFind",
            []
          ),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page21-next-button",
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
            const nav = pageNavigation[21];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page21-tap-next",
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
        id: "page21-previous-button",
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
            const nav = pageNavigation[21];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page21-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    22: [
      // Question Text Box Component
      {
        id: "page22-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page22.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      // Information Analysis Panel
      {
        id: "page22-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned below question with better visibility
        zIndex: 60, // Higher z-index to ensure visibility
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page22.informationAnalysis.facts", []),
          valueArray: getI18nText("pages.page22.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page22.informationAnalysis.toFind",
            []
          ),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page22-next-button",
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
            const nav = pageNavigation[22];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page22-tap-next",
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
        id: "page22-previous-button",
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
            const nav = pageNavigation[22];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page22-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    23: [
      // Question Text Box Component
      {
        id: "page23-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page23.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page23-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 30,   // 70% for options
          feedbackRowHeight: 35,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page23-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page23.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page23.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page23.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page23.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page23.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page23.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page23.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page23.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page23-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page23.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page23-next-button",
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
            const nav = pageNavigation[23];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page23-tap-next",
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
        id: "page23-previous-button",
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
            const nav = pageNavigation[23];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page23-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    24: [
      // Question Text Box Component
      {
        id: "page24-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page24.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page24-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 30,   // 70% for options
          feedbackRowHeight: 35,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page24-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page24.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page24.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page24.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page24.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page24.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page24.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page24.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page24.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page24-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page24.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page24-next-button",
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
            const nav = pageNavigation[24];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page24-tap-next",
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
        id: "page24-previous-button",
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
            const nav = pageNavigation[24];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page24-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    25: [
      // Question Text Box Component
      {
        id: "page25-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page25.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page25-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 30,   // 70% for options
          feedbackRowHeight: 35,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page25-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page25.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page25.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page25.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page25.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page25.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page25.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page25.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page25.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page25-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page25.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page25-next-button",
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
            const nav = pageNavigation[25];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page25-tap-next",
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
        id: "page25-previous-button",
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
            const nav = pageNavigation[25];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page25-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    26: [
      // Question Text Box Component
      {
        id: "page26-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page26.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page26-solution-textbox",
        name: "page26-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page26.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page26-fraction-text",
        name: "page26-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page26.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: "page26-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page26-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page26.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page26.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page26.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page26.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page26.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page26.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page26.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page26.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page26-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page26.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page26-next-button",
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
            const nav = pageNavigation[26];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page26-tap-next",
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
        id: "page26-previous-button",
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
            const nav = pageNavigation[26];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page26-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    27: [
      // Question Text Box Component
      {
        id: "page27-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page27.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page27-solution-textbox",
        name: "page27-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page27.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page27-fraction-text",
        name: "page27-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page27.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page27-fraction-text=gcf",
        name: "page27-fraction-text-gcf",
        type: "custom",
        coordinates: [725, 250, 950, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page27.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: "page27-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page27-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page27.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page27.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page27.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page27.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page27.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page27.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page27.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page27.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page27-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page27.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page27-next-button",
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
            const nav = pageNavigation[27];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page27-tap-next",
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
        id: "page27-previous-button",
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
            const nav = pageNavigation[27];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page27-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    28: [
      // Question Text Box Component
      {
        id: "page28-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page28.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page28-solution-textbox",
        name: "page28-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page28.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page28-fraction-text",
        name: "page28-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page28.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page28-fraction-text=gcf",
        name: "page28-fraction-text-gcf",
        type: "custom",
        coordinates: [725, 250, 950, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page28.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",

          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      {
        id: "page28-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 400, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page28-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page28.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page28.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page28.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page28.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page28.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page28.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page28.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page28.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page28-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page28.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page28-next-button",
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
            const nav = pageNavigation[28];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page28-tap-next",
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
        id: "page28-previous-button",
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
            const nav = pageNavigation[28];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page28-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    29: [
      // Question Text Box Component
      {
        id: "page29-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionC", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page29.highlights", []),
          whiteSpace: 'pre-line'
        },
      },
      {
        id: "page29-solution-textbox",
        name: "page29-solution-textbox",
        type: "custom",
        coordinates: [100, 150, 750, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page29.solutionText.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "30gc",
          borderRadius: "12gc",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text
      {
        id: "page29-fraction-text",
        name: "page29-fraction-text",
        type: "custom",
        coordinates: [700, 150, 880, 250], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page29.solutionText.fractionValue"), // Empty text by default - will be updated by FillBlanksComponent
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
      //fraction text gcf
      {
        id: "page29-fraction-text=gcf",
        name: "page29-fraction-text-gcf",
        type: "custom",
        coordinates: [725, 250, 950, 350], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page29.solutionText.gcfFractionValue"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",

          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      //fraction text simplest form
      {
        id: "page29-fraction-text-simplestForm",
        name: "page29-fraction-text-simplestForm",
        type: "custom",
        coordinates: [725, 330, 860, 450], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page29.solutionText.simplestFormFraction"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",

        },
      },
      {
        id: "page29-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 420, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          headerRowHeight: 0,    // Hide header row
          questionRowHeight: 15,  // 15% for question
          optionsRowHeight: 50,   // 70% for options
          feedbackRowHeight: 15,  // 15% for feedback
          optionsContainerWidth: 80, // Options container uses 80% of 
          componentType: "QuizPanelComponent",
          headerRowHeight: 0, // Hide header row
          quizId: "page29-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page29.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page29.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: "", // Header row hidden
          questionText: getI18nText(
            "pages.page29.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page29.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page29.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page29.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page29.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page29.quizPanel.impFormulae", []),
        },
      },
      {
        id: "page29-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page29.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page29-next-button",
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
            const nav = pageNavigation[29];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page29-tap-next",
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
        id: "page29-previous-button",
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
            const nav = pageNavigation[29];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page29-progressDots",
        name: "progressDots",
        type: "progress",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        props: {
          totalPages: getTotalPages(),
        },
      },
    ],
    30: [
      // Question Introduction Text Box Component
      {
        id: "page30-question-intro",
        name: "question-intro-text",
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page30.highlights", []),
          whiteSpace: "pre-line"
        },
      },

      {
        id: "page30-feedback-textbox-conclusion",
        name: "page30-feedback-textbox-conclusion",
        type: "custom",
        coordinates: [150, 200, 1000, 650], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page30.conclusion"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "left",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          allowHtml: true,
          whiteSpace: "pre-line",
          flexDirection:"column"
        },
      },
      {
        id: "page30-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page30.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },
      // Optimized Next button - Three Layer Structure
      {
        id: "page30-next-button",
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
            const nav = pageNavigation[30];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page30-tap-next",
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
        id: "page30-previous-button",
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
            const nav = pageNavigation[30];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page30-progressDots",
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

    console.log(
      "✅ PageConfig initialized - pages and functions available globally"
    );
    console.log(
      "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states"
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
