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
  17: { prev: 16, next: null },
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
        },
      },

      {
        id: "page1-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [200, 300, 1400, 600], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText(
            "pages.page1.introduction",
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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page2.highlights", []),
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
          valueArray: "",
          toFindArray: "",
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
          valueArray: "",
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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page4.highlights", []),
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
          valueArray: "",
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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page5.highlights", []),
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
          valueArray: "",
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
        name: "question-text-box",
        type: "custom",
        coordinates: [0, 0, 1600, 150], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          componentType: "QuestionComponent",
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page6.highlights", []),
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
          valueArray: "",
          toFindArray: getI18nText(
            "pages.page6.informationAnalysis.toFind",
            []
          ),
        },
      },
      //table instruction
      {
        id: "page6-table-instruction",
        name: "page6-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page6.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //table instruction
      {
        id: "page6-table-instruction",
        name: "page6-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page6.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page6-table-give-text",
        name: "page6-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page6-quesA-text",
        name: "page6-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page6-quesB-text",
        name: "page6-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page6-quesC-text",
        name: "page6-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page6-question-table-1",
        name: "page6-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page6-feedback-textbox",
      //   name: "page6-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page6-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

      // Fill Blanks Component
      {
        id: "page6-fill-blanks",
        name: "page6-fill-blanks-component",
        type: "custom",
        coordinates: [0, 800, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [440, 290, 650, 360],
              image: "",
              text: "abcd",
              bgColor:"pink",
              bgBlink:true
            },
            { id: "blank2", coordinate: [700, 290, 910, 360], image: "" },
            { id: "blank3", coordinate: [700, 370, 910, 440], image: "" },
            { id: "blank4", coordinate: [440, 450, 650, 520], image: "" },
            { id: "blank5", coordinate: [700, 530, 910, 605], image: "" },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [100, 600, 1120, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: "Abcfjvnj",
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 1,
          optionsColumns: 6,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page6.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page6.fillBlanks.impFormulae", []),
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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page7.highlights", []),
        },
      },
      //cocept summary
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
      //table instruction
      {
        id: "page7-table-instruction",
        name: "page7-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page7.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page7-table-give-text",
        name: "page7-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page7-quesA-text",
        name: "page7-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page7-quesB-text",
        name: "page7-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page7-quesC-text",
        name: "page7-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page7-question-table-1",
        name: "page7-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page7.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page7-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page7-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page7.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page7.quizPanel.quiz.qti4Subtype",
            "QT"
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
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page7-feedback-textbox",
      //   name: "page7-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page7-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page8.highlights", []),
        },
      },
      //cocept summary
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
      //table instruction
      {
        id: "page8-table-instruction",
        name: "page8-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page8.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page8-table-give-text",
        name: "page8-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page8-quesA-text",
        name: "page8-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page8-quesB-text",
        name: "page8-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page8-quesC-text",
        name: "page8-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page8-question-table-1",
        name: "page8-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page8.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page8-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page8-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page8.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page8.quizPanel.quiz.qti4Subtype",
            "QT"
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
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page8-feedback-textbox",
      //   name: "page8-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page8-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page9.highlights", []),
        },
      },
      //cocept summary
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
      //table instruction
      {
        id: "page9-table-instruction",
        name: "page9-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page9.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page9-table-give-text",
        name: "page9-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page9-quesA-text",
        name: "page9-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page9-quesB-text",
        name: "page9-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page9-quesC-text",
        name: "page9-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page9-question-table-1",
        name: "page9-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page9.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page9-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page9-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page9.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page9.quizPanel.quiz.qti4Subtype",
            "QT"
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
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page9-feedback-textbox",
      //   name: "page9-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page9-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page10.highlights", []),
        },
      },
      //cocept summary
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
      //table instruction
      {
        id: "page10-table-instruction",
        name: "page10-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page10.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page10-table-give-text",
        name: "page10-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page10-quesA-text",
        name: "page10-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page10-quesB-text",
        name: "page10-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page10-quesC-text",
        name: "page10-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page10-question-table-1",
        name: "page10-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page10.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page10-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page10-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page10.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page10.quizPanel.quiz.qti4Subtype",
            "QT"
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
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page10-feedback-textbox",
      //   name: "page10-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page11.highlights", []),
        },
      },
      //cocept summary
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
      //table instruction
      {
        id: "page11-table-instruction",
        name: "page11-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page11.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page11-table-give-text",
        name: "page11-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page11-quesA-text",
        name: "page11-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page11-quesB-text",
        name: "page11-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page11-quesC-text",
        name: "page11-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page11-question-table-1",
        name: "page11-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page11.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page11-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page11-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page11.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page11.quizPanel.quiz.qti4Subtype",
            "QT"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page11.quizPanel.headerText",
            "Connect with Concepts"
          ),
          questionText: getI18nText(
            "pages.page11.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page11.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page11.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page11.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page11.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page11.quizPanel.impFormulae", []),
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page11-feedback-textbox",
      //   name: "page11-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page11-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page12.highlights", []),
        },
      },
      //cocept summary
      {
        id: "page12-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText(
            "pages.page12.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      //table instruction
      {
        id: "page12-table-instruction",
        name: "page12-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page12.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page12-table-give-text",
        name: "page12-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page12-quesA-text",
        name: "page12-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page12-quesB-text",
        name: "page12-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page12-quesC-text",
        name: "page12-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page12-question-table-1",
        name: "page12-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page12.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page12-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page12-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page12.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page12.quizPanel.quiz.qti4Subtype",
            "QT"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page12.quizPanel.headerText",
            "Connect with Concepts"
          ),
          questionText: getI18nText(
            "pages.page12.quizPanel.questionText",
            "Let's assume there are 'a' tsp of coffee and 'b' tsp of sugar in 1000 ml of coffee. <br><br>State whether true or false –<br>To keep the same taste, a : b should be equivalent to 1 : 2."
          ),
          feedbackText: getI18nText(
            "pages.page12.quizPanel.quiz.emptyFeedback",
            "In simplest form, both terms of ratio do not have any common factor other than 1."
          ),
          // Main question image for QT4R (text-only, no image needed)
          image: null,
          imageText: getI18nText("pages.page12.quizPanel.imageText", ""),
          // Options data for QT4R (4 text options in rows)
          options: getI18nText("pages.page12.quizPanel.options", []),
          keyConcepts: getI18nText("pages.page12.quizPanel.keyConcepts", []),
          impFormulae: getI18nText("pages.page12.quizPanel.impFormulae", []),
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page12-feedback-textbox",
      //   name: "page12-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page12-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page13.highlights", []),
        },
      },
      //cocept summary
      {
        id: "page13-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText(
            "pages.page13.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      //table instruction
      {
        id: "page13-table-instruction",
        name: "page13-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page13.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page13-table-give-text",
        name: "page13-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page13-quesA-text",
        name: "page13-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page13-quesB-text",
        name: "page13-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page13-quesC-text",
        name: "page13-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page13-question-table-1",
        name: "page13-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page13.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page13-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page13-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page13.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page13.quizPanel.quiz.qti4Subtype",
            "QT"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page13.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
        },
      },
      // Feedback Textbox Component
      // {
      //   id: "page13-feedback-textbox",
      //   name: "page13-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page13-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page14.highlights", []),
        },
      },
      //cocept summary
      {
        id: "page14-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: "",
          toFindArray: "",
          factsArray: getI18nText(
            "pages.page14.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      //table instruction
      {
        id: "page14-table-instruction",
        name: "page14-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page14.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page14-table-give-text",
        name: "page14-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page14-quesA-text",
        name: "page14-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page14-quesB-text",
        name: "page14-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page14-quesC-text",
        name: "page14-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page14-question-table-1",
        name: "page14-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page14.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page14-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page14-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page14.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page14.quizPanel.quiz.qti4Subtype",
            "QT"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page14.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
      // Feedback Textbox Component
      // {
      //   id: "page14-feedback-textbox",
      //   name: "page14-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page14-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page15.highlights", []),
        },
      },
      //cocept summary
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
          factsArray: getI18nText(
            "pages.page15.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      //table instruction
      {
        id: "page15-table-instruction",
        name: "page15-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page15.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page15-table-give-text",
        name: "page15-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page15-quesA-text",
        name: "page15-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page15-quesB-text",
        name: "page15-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page15-quesC-text",
        name: "page15-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page15-question-table-1",
        name: "page15-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page15.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page15-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page15-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page15.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page15.quizPanel.quiz.qti4Subtype",
            "QT"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page15.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
      // Feedback Textbox Component
      // {
      //   id: "page15-feedback-textbox",
      //   name: "page15-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page15-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page16.highlights", []),
        },
      },
      //cocept summary
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
          factsArray: getI18nText(
            "pages.page16.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      //table instruction
      {
        id: "page16-table-instruction",
        name: "page16-table-instruction",
        type: "textbox",
        coordinates: [340, 170, 950, 240], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("pages.page16.tableInstruction"),
          color: "var(--color-white)",
          fontSize: "25gc",
          textAlign: "center",
        },
      },
      //given text
      {
        id: "page16-table-give-text",
        name: "page16-table-give-text",
        type: "textbox",
        coordinates: [240, 300, 440, 350], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.given"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question a. text
      {
        id: "page16-quesA-text",
        name: "page16-quesA-text",
        type: "textbox",
        coordinates: [150, 380, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionA"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question b. text
      {
        id: "page16-quesB-text",
        name: "page16-quesB-text",
        type: "textbox",
        coordinates: [150, 460, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionB"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      //from question c. text
      {
        id: "page16-quesC-text",
        name: "page16-quesC-text",
        type: "textbox",
        coordinates: [150, 540, 440, 450], // More centered and visible position
        zIndex: 50, // Higher z-index to ensure visibility
        props: {
          text: getI18nText("common.labels.fromQuestionC"),
          color: "var(--color-white)",
          fontSize: "30gc",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page16-question-table-1",
        name: "page16-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page16.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },
      {
        id: "page16-quiz-panel",
        name: "quiz-panel",
        type: "custom",
        coordinates: [20, 630, 1090, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page16-quiz", // Unique identifier for this quiz
          quizType: getI18nText("pages.page16.quizPanel.quiz.mcqType", "MCQ"), // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText(
            "pages.page16.quizPanel.quiz.qti4Subtype",
            "QT"
          ), // For MCQ: QT4, QTI4, QT2, QTI2, QT4R; null for others
          headerText: getI18nText(
            "pages.page16.quizPanel.headerText",
            "Connect with Concepts"
          ),
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
      // Feedback Textbox Component
      // {
      //   id: "page16-feedback-textbox",
      //   name: "page16-feedback-textbox-unique",
      //   type: "custom",
      //   coordinates: [25, 715, 775, 815], // Position above fill blanks component
      //   zIndex: 65,
      //   props: {
      //     componentType: "FeedbackTextboxComponent",
      //     id: "page16-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
      //     text: "", // Empty text by default - will be updated by FillBlanksComponent
      //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
      //     fontSize: "24gc",
      //     borderRadius: "12gc",
      //     textAlign: "center",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "15gc",
      //     boxSizing: "border-box",
      //   },
      // },

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
          text: getI18nText("common.questionText", ""),

          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page17.highlights", []),
        },
      },
      //conclusion-box
      {
        id: "page1-conclusion-box-text",
        name: "conclusion-box-text",
        type: "textbox",
        coordinates: [200, 630, 950, 600], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page17.introduction"),
          fontSize: "35gc",
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
      //cocept summary
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
          factsArray: getI18nText(
            "pages.page17.conceptSummary.keyConcepts",
            []
          ),
          valueArray: "",
        },
      },
      // //table instruction
      // {
      //   id: "page17-table-instruction",
      //   name: "page17-table-instruction",
      //   type: "textbox",
      //   coordinates: [340, 170, 950, 240], // More centered and visible position
      //   zIndex: 50, // Higher z-index to ensure visibility
      //   props: {
      //     text: getI18nText("pages.page17.tableInstruction"),
      //     color: "var(--color-white)",
      //     fontSize: "25gc",
      //     textAlign: "center",
      //   },
      // },
      // //given text
      // {
      //   id: "page17-table-give-text",
      //   name: "page17-table-give-text",
      //   type: "textbox",
      //   coordinates: [240, 300, 440, 350], // More centered and visible position
      //   zIndex: 50, // Higher z-index to ensure visibility
      //   props: {
      //     text: getI18nText("common.labels.given"),
      //     color: "var(--color-white)",
      //     fontSize: "30gc",
      //     textAlign: "center",
      //   },
      // },
      // //from question a. text
      // {
      //   id: "page17-quesA-text",
      //   name: "page17-quesA-text",
      //   type: "textbox",
      //   coordinates: [150, 380, 440, 450], // More centered and visible position
      //   zIndex: 50, // Higher z-index to ensure visibility
      //   props: {
      //     text: getI18nText("common.labels.fromQuestionA"),
      //     color: "var(--color-white)",
      //     fontSize: "30gc",
      //     textAlign: "center",
      //   },
      // },
      // //from question b. text
      // {
      //   id: "page17-quesB-text",
      //   name: "page17-quesB-text",
      //   type: "textbox",
      //   coordinates: [150, 460, 440, 450], // More centered and visible position
      //   zIndex: 50, // Higher z-index to ensure visibility
      //   props: {
      //     text: getI18nText("common.labels.fromQuestionB"),
      //     color: "var(--color-white)",
      //     fontSize: "30gc",
      //     textAlign: "center",
      //   },
      // },
      // //from question c. text
      // {
      //   id: "page17-quesC-text",
      //   name: "page17-quesC-text",
      //   type: "textbox",
      //   coordinates: [150, 540, 440, 450], // More centered and visible position
      //   zIndex: 50, // Higher z-index to ensure visibility
      //   props: {
      //     text: getI18nText("common.labels.fromQuestionC"),
      //     color: "var(--color-white)",
      //     fontSize: "30gc",
      //     textAlign: "center",
      //   },
      // },
      // Question Table Component 1 (Mom)
      {
        id: "page17-question-table-1",
        name: "page17-question-table-1",
        type: "custom",
        coordinates: [400, 200, 950, 625], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page17.questionTable1", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.distance", ""),
                getI18nText("common.tableHeaders.time", ""),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page17-next-button",
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

            // start question from start
            window.location.reload();
          },
        },
      },

      // Tap GIF Image
      {
        id: "page17-tap-next",
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
          disabled: true,
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
