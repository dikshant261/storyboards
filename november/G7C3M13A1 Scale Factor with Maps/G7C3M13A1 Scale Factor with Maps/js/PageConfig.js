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
  13: { prev: 12, next: null },
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
        name: "page1-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "46gc",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page1-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, 200, 400, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page1.sideHeading"),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
        },
      },
      {
        id: "page1-map-tableContainer",
        name: "page1-map-tableContainer",
        type: "textbox",
        coordinates: [5, 200, 640, 800], // Position below roller coaster image
        zIndex: 50,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      //Table heading
      {
        id: "page1-table-heading",
        name: "page1-table-heading",
        type: "textbox",
        coordinates: [20, 215, 600, 100], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          color: "var(--color-white)",
          textAlign: "left",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page1-map-table",
        name: "page1-map-table",
        type: "custom",
        coordinates: [5, 250, 575, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page1.mapTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.cityToCity", ""),
                getI18nText("common.tableHeaders.lengthOnMap", ""),
                getI18nText("common.tableHeaders.actualDistance", ""),
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
          equalRowHeights: true,
        },
      },
      {
        id: "page1-map-container",
        name: "page1-map-container",
        type: "textbox",
        coordinates: [650, 200, 1140, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      // Right Arrow Image
      {
        id: "page1-indomap",
        name: "page1-indomap",
        type: "container",
        coordinates: [675, 225, 1115, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/indonesiamap.png",
          imageAlt: "Right Arrow",
        },
      },
      // Feedback Textbox Component
      {
        id: "page1-feedback-textbox",
        name: "page1-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page1-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
        id: "page1-instruction-text",
        name: "page1-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instructionText.tapAfterReading"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],

    2: [
      // Question Introduction Text Box Component
      {
        id: "page2-question-intro",
        name: "page2-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "46gc",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page2-map-tableContainer",
        name: "page2-map-tableContainer",
        type: "textbox",
        coordinates: [5, 200, 640, 800], // Position below roller coaster image
        zIndex: 50,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      //Table heading
      {
        id: "page2-table-heading",
        name: "page2-table-heading",
        type: "textbox",
        coordinates: [20, 215, 600, 100], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          color: "var(--color-white)",
          textAlign: "left",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page2-map-table",
        name: "page2-map-table",
        type: "custom",
        coordinates: [5, 250, 575, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page1.mapTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.cityToCity", ""),
                getI18nText("common.tableHeaders.lengthOnMap", ""),
                getI18nText("common.tableHeaders.actualDistance", ""),
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
          equalRowHeights: true,
        },
      },
      {
        id: "page2-map-container",
        name: "page2-map-container",
        type: "textbox",
        coordinates: [650, 200, 1140, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      // indonesiman map image
      {
        id: "page2-indomap",
        name: "page2-indomap",
        type: "container",
        coordinates: [675, 225, 1115, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/indonesiamap.png",
          imageAlt: "Right Arrow",
        },
      },
      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
      //keypad
      {
        id: "page2-keypad",
        name: "page2-keypad",
        type: "textbox",
        coordinates: [1150, 200, 400, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "Keypad",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
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
        id: "page2-instruction-text",
        name: "page2-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.instructionText.tapTheZoom"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    3: [
      // Question Introduction Text Box Component
      {
        id: "page3-question-intro",
        name: "page3-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "46gc",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page3-map-tableContainer",
        name: "page3-map-tableContainer",
        type: "textbox",
        coordinates: [5, 200, 640, 800], // Position below roller coaster image
        zIndex: 50,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      //Table heading
      {
        id: "page3-table-heading",
        name: "page3-table-heading",
        type: "textbox",
        coordinates: [20, 215, 600, 100], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          color: "var(--color-white)",
          textAlign: "left",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page3-map-table",
        name: "page3-map-table",
        type: "custom",
        coordinates: [5, 250, 575, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page1.mapTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.cityToCity", ""),
                getI18nText("common.tableHeaders.lengthOnMap", ""),
                getI18nText("common.tableHeaders.actualDistance", ""),
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
          equalRowHeights: true,
        },
      },
      {
        id: "page3-map-container",
        name: "page3-map-container",
        type: "textbox",
        coordinates: [650, 200, 1140, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      // indonesiman map image
      {
        id: "page3-indomap",
        name: "page3-indomap",
        type: "container",
        coordinates: [675, 225, 1115, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/indonesiamap.png",
          imageAlt: "indo map",
        },
      },
      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
      //keypad
      {
        id: "page3-keypad",
        name: "page3-keypad",
        type: "textbox",
        coordinates: [1150, 200, 400, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page3.sideHeading"),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
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
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.instructionText.dragFrom"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    4: [
      // Question Introduction Text Box Component
      {
        id: "page4-question-intro",
        name: "page4-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "46gc",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page4-map-tableContainer",
        name: "page4-map-tableContainer",
        type: "textbox",
        coordinates: [5, 200, 640, 800], // Position below roller coaster image
        zIndex: 50,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      //Table heading
      {
        id: "page4-table-heading",
        name: "page4-table-heading",
        type: "textbox",
        coordinates: [20, 215, 600, 100], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          color: "var(--color-white)",
          textAlign: "left",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page4-map-table",
        name: "page4-map-table",
        type: "custom",
        coordinates: [5, 250, 575, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page1.mapTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.cityToCity", ""),
                getI18nText("common.tableHeaders.lengthOnMap", ""),
                getI18nText("common.tableHeaders.actualDistance", ""),
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
          equalRowHeights: true,
        },
      },
      {
        id: "page4-map-container",
        name: "page4-map-container",
        type: "textbox",
        coordinates: [650, 200, 1140, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      // indonesiman map image
      {
        id: "page4-indomap",
        name: "page4-indomap",
        type: "container",
        coordinates: [675, 225, 1115, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/indonesiamap.png",
          imageAlt: "indo map",
        },
      },
      // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
      //keypad
      {
        id: "page4-keypad",
        name: "page4-keypad",
        type: "textbox",
        coordinates: [1150, 200, 400, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "keypad",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
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
            const nav = pageNavigation[4];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      {
        id: "page4-instruction-text",
        name: "page4-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.instructionText.enterScale"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    5: [
      // Question Introduction Text Box Component
      {
        id: "page5-question-intro",
        name: "page5-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "46gc",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page5-map-tableContainer",
        name: "page5-map-tableContainer",
        type: "textbox",
        coordinates: [5, 200, 640, 800], // Position below roller coaster image
        zIndex: 50,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      //Table heading
      {
        id: "page5-table-heading",
        name: "page5-table-heading",
        type: "textbox",
        coordinates: [20, 215, 600, 100], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          color: "var(--color-white)",
          textAlign: "left",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page5-map-table",
        name: "page5-map-table",
        type: "custom",
        coordinates: [5, 250, 575, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page1.mapTable", {
              headers: ["", "", ""],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.cityToCity", ""),
                getI18nText("common.tableHeaders.lengthOnMap", ""),
                getI18nText("common.tableHeaders.actualDistance", ""),
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
          equalRowHeights: true,
        },
      },
      {
        id: "page5-map-container",
        name: "page5-map-container",
        type: "textbox",
        coordinates: [650, 200, 1140, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          // image: "assets/indonesianmap.png",
        },
      },
      // indonesiman map image
      {
        id: "page5-indomap",
        name: "page5-indomap",
        type: "container",
        coordinates: [675, 225, 1115, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/indonesiamap.png",
          imageAlt: "indo map",
        },
      },
      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
      //keypad
      {
        id: "page5-keypad",
        name: "page5-keypad",
        type: "textbox",
        coordinates: [1150, 200, 400, 800], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "keypad",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
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
        id: "page4-instruction-text",
        name: "page4-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.instructionText.enterTheActual"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
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
