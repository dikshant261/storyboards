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
  11: { prev: 10, next: null },
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
          fontSize: "40gc",
          whiteSpace: "pre-line",
        },
      },

      {
        id: "page1-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [300, 300, 1300, 600], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText(
            "pages.page1.introductionText",
            "Let's compare the coffee made by Dona and her mom using ratios!"
          ),
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
          whiteSpace: "pre-line",
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
          text: getI18nText("common.questionText"),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page2.highlights", []),
          whiteSpace: "pre-line",
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
          factsArray: getI18nText("pages.page2.givenList.given", []),
          valueArray: "",
          toFindArray: "",
        },
      },
      //pens image
      {
        id: "page2-pens-image",
        name: "page2-pens-image",
        type: "container",
        coordinates: [10, 200, 400, 680],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/15pen.png",
          imageAlt: "15 pens",
        },
      },
      //15 pens text
      {
        id: "page2-15pens-text",
        name: "page2-15pens-text",
        type: "textbox",
        coordinates: [10, 700, 400, 815], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.pens"),
          whiteSpace: "pre-line",
          fontSize: "36gc",
          textAlign: "center",
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
          text: getI18nText("common.questionText", ""),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page3.highlights", []),
          whiteSpace: "pre-line",
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
          factsArray: getI18nText("pages.page3.givenList.given", []),
          valueArray: "",
          toFindArray: getI18nText("pages.page3.givenList.toFind", []),
        },
      },
      //pens image
      {
        id: "page3-pens-image",
        name: "page3-pens-image",
        type: "container",
        coordinates: [10, 200, 400, 680],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/15pen.png",
          imageAlt: "15 pens",
        },
      },
      //15 pens text
      {
        id: "page3-15pens-text",
        name: "page3-15pens-text",
        type: "textbox",
        coordinates: [10, 700, 400, 815], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.pens"),
          whiteSpace: "pre-line",
          fontSize: "36gc",
          textAlign: "center",
        },
      },
      //pen image
      {
        id: "page4-pen-image",
        name: "page4-pen-image",
        type: "container",
        coordinates: [400, 200, 700, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pen.png",
          imageAlt: "15 pens",
        },
      },
      //pen text
      {
        id: "page4-pen-text",
        name: "page4-pen-text",
        type: "textbox",
        coordinates: [400, 700, 700, 815], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.onePen"),
          whiteSpace: "pre-line",
          fontSize: "36gc",
          textAlign: "center",
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
        coordinates: [1550, 840, 1500, 890], // Position in top-right area
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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
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
          factsArray: getI18nText("pages.page4.givenList.given", []),
          valueArray: "",
          toFindArray: getI18nText("pages.page4.givenList.toFind", []),
        },
      },
      //pens image
      {
        id: "page4-pens-image",
        name: "page4-pens-image",
        type: "container",
        coordinates: [10, 200, 400, 680],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/15pen.png",
          imageAlt: "15 pens",
        },
      },
      //15 pens text
      {
        id: "page4-15pens-text",
        name: "page4-15pens-text",
        type: "textbox",
        coordinates: [10, 700, 400, 815], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.pens"),
          whiteSpace: "pre-line",
          fontSize: "36gc",
          textAlign: "center",
        },
      },
      //pen image
      {
        id: "page4-pen-image",
        name: "page4-pen-image",
        type: "container",
        coordinates: [400, 200, 700, 600],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pen.png",
          imageAlt: "15 pens",
        },
      },
      //pen text
      {
        id: "page4-pen-text",
        name: "page4-pen-text",
        type: "textbox",
        coordinates: [400, 700, 700, 815], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.onePen"),
          whiteSpace: "pre-line",
          fontSize: "36gc",
          textAlign: "center",
        },
      },
      //5pens image
      {
        id: "page4-5pens-image",
        name: "page4-5pens-image",
        type: "container",
        coordinates: [760, 200, 1000, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/5pen.png",
          imageAlt: "15 pens",
        },
      },
      //5 pens text
      {
        id: "page4-5pens-text",
        name: "page4-5pens-text",
        type: "textbox",
        coordinates: [760, 700, 1000, 815], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fivePens"),
          whiteSpace: "pre-line",
          fontSize: "36gc",
          textAlign: "center",
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
      {
        id: "page5-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      {
        id: "page5-quiz-panel",
        name: "page5-quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page5-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page5.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page5.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page5.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 60, // 70% for options
          feedbackRowHeight: 20, // 15% for feedback
          optionsContainerWidth: 10, // Options container uses 80% of options row width
        },
      },
      // Concept Summary Panel
      {
        id: "page5-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: "",
          valueArray: "",
        },
      },

      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page5-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "24gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
      {
        id: "page6-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      {
        id: "page6-quiz-panel",
        name: "page6-quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page6-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page6.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page6.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page6.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
          optionsRowHeight: 60, // 70% for options
          feedbackRowHeight: 20, // 15% for feedback
          optionsContainerWidth: 10, // Options container uses 80% of options row width
        },
      },
      // Concept Summary Panel
      {
        id: "page6-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText("pages.page6.conceptSummary.keyConcepts", []),
          valueArray: "",
        },
      },

      // Feedback Textbox Component
      {
        id: "page6-feedback-textbox",
        name: "page6-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page6-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "24gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
      {
        id: "page7-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      {
        id: "page7-quiz-panel",
        name: "page7-quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page7-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page7.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page7.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page7.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
        },
      },
      // Concept Summary Panel
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

      // Feedback Textbox Component
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page7-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "24gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
      {
        id: "page8-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      {
        id: "page8-quiz-panel",
        name: "page8-quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page8-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page8.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page8.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page8.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 60, // 70% for options
          feedbackRowHeight: 20, // 15% for feedback
          optionsContainerWidth: 10, // Options container uses 80% of options row width
        },
      },
      // Concept Summary Panel
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
      // Feedback Textbox Component
      {
        id: "page8-feedback-textbox",
        name: "page8-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page8-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "24gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
      {
        id: "page9-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      {
        id: "page9-quiz-panel",
        name: "page9-quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page9-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page9.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page9.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page9.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 60, // 70% for options
          feedbackRowHeight: 20, // 15% for feedback
          optionsContainerWidth: 10, // Options container uses 80% of options row width
        },
      },
      // Concept Summary Panel
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
      // Feedback Textbox Component
      {
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page9-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "24gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
      {
        id: "page10-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      {
        id: "page10-quiz-panel",
        name: "page10-quiz-panel",
        type: "custom",
        coordinates: [20, 150, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page10-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page10.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page10.quizPanel.quiz.qti4Subtype",
            "QT2"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page10.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
          headerText: "", // Empty to hide header
          headerRowHeight: 0, // Hide header row
          questionRowHeight: 15, // 15% for question
          optionsRowHeight: 60, // 70% for options
          feedbackRowHeight: 20, // 15% for feedback
          optionsContainerWidth: 10, // Options container uses 80% of options row width
        },
      },
      // Concept Summary Panel
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
          factsArray: getI18nText(
            "pages.page10.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      // Feedback Textbox Component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "24gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
      {
        id: "page11-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
          whiteSpace: "pre-line",
        },
      },
      // Concept Summary Panel
      {
        id: "page11-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText(
            "pages.page11.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      // Feedback Textbox Component
      {
        id: "page11-feedback-textbox",
        name: "page11-feedback-textbox-unique",
        type: "custom",
        coordinates: [200, 300, 950, 615], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page11-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page11.feedbackTextbox.text"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          textAlign: "left",
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page11-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1250, 820, 1595, 895],
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

            window.location.reload();
          },
        },
      },

      // Tap GIF Image
      {
        id: "page11-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1050, 840, 1500, 890], // Position in top-right area
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
          // onClick: () => {
          //   if (typeof window !== "undefined" && window.playCarClickSound) {
          //     window.playCarClickSound("previous");
          //   }

          //   // Navigate to previous page using navigation config
          //   const nav = pageNavigation[11];
          //   if (nav && nav.prev) {
          //     navigateToPage(nav.prev, "previous");
          //   }
          // },
          disabled: true,
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
