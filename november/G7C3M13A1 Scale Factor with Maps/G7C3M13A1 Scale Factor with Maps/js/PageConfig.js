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
          fontSize: "40gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      {
        id: "page1-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page1-map-table",
        name: "page1-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      {
        id: "page1-map-container",
        name: "page1-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        coordinates: [660, 175, 1130, 500],
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
          fontSize: "40gc",
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
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page2-map-tableContainer",
        name: "page2-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page2-map-table",
        name: "page2-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page2.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      {
        id: "page2-map-container",
        name: "page2-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page2-indomap",
        name: "page2-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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

      {
        id: "page2-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page2-hotspot-1",
      //   name: "page2-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page2-line-1",
      //   name: "page2-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page2-line-1-arrow",
      //   name: "page2-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page2-line-2",
      //   name: "page2-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page2-line-3",
      //   name: "page2-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page2-number-pad",
        name: "page2-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page2-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "page2-map-table-R1C1", // ID of element to update with number pad input
              correctValue: 1, // Correct value to compare against
              correctFeedback: getI18nText("pages.page2.feedBacks.correct", ""), // Feedback text for correct answer
              incorrectFeedback: getI18nText("pages.page2.feedBacks.inCorrect"), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page2.defaultText"), // Default text to display in feedback area
          },
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
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page3-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
      {
        id: "page3-map-tableContainer",
        name: "page3-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page3-map-table",
        name: "page3-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page3.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      {
        id: "page3-map-container",
        name: "page3-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page3-indomap",
        name: "page3-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page4-map-tableContainer",
        name: "page4-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page4-map-table",
        name: "page4-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page4.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      // {
      //   id: "page4-tile",
      //   name: "page4-tile",
      //   type: "custom",
      //   coordinates: [1150, 230, 600, 680],
      //   zIndex: 54,
      //   props: {
      //     componentType: "TileComponent",
      //     mode: "focus",
      //     backgroundColor: "transparent",
      //     borderColor: "#ffffff",
      //     borderWidth: "4gc",
      //     borderRadius: "8gc",
      //     color: "#ffffff",
      //     fontSize: "40gc",
      //     padding: "15gc",
      //     children: " ",
      //   },
      // },
      {
        id: "page4-map-container",
        name: "page4-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page4-indomap",
        name: "page4-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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

      {
        id: "page4-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page4-hotspot-1",
      //   name: "page4-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page4-line-1",
      //   name: "page4-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page4-line-1-arrow",
      //   name: "page4-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page4-line-2",
      //   name: "page4-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page4-line-3",
      //   name: "page4-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page4-number-pad",
        name: "page4-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page4-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "", // ID of element to update with number pad input
              correctValue: 1, // Correct value to compare against
              correctFeedback: getI18nText("pages.page4.feedBacks.correct", ""), // Feedback text for correct answer
              incorrectFeedback: getI18nText("pages.page4.feedBacks.inCorrect"), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page4.defaultText"), // Default text to display in feedback area
          },
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
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page5-map-tableContainer",
        name: "page5-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page5-map-table",
        name: "page5-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page5.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      // {
      //   id: "page5-tile",
      //   name: "page5-tile",
      //   type: "custom",
      //   coordinates: [1150, 230, 600, 680],
      //   zIndex: 54,
      //   props: {
      //     componentType: "TileComponent",
      //     mode: "focus",
      //     backgroundColor: "transparent",
      //     borderColor: "#ffffff",
      //     borderWidth: "4gc",
      //     borderRadius: "8gc",
      //     color: "#ffffff",
      //     fontSize: "40gc",
      //     padding: "15gc",
      //     children: " ",
      //   },
      // },
      {
        id: "page5-map-container",
        name: "page5-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page5-indomap",
        name: "page5-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
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

      {
        id: "page5-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page5-hotspot-1",
      //   name: "page5-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page5-line-1",
      //   name: "page5-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page5-line-1-arrow",
      //   name: "page5-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page5-line-2",
      //   name: "page5-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page5-line-3",
      //   name: "page5-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page5-number-pad",
        name: "page5-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page5-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "page5-map-table-R2C2", // ID of element to update with number pad input
              correctValue: 3710, // Correct value to compare against
              correctFeedback: getI18nText("pages.page5.feedBacks.correct", ""), // Feedback text for correct answer
              incorrectFeedback: getI18nText("pages.page5.feedBacks.inCorrect"), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page5.defaultText"), // Default text to display in feedback area
          },
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
        id: "page5-instruction-text",
        name: "page5-instruction-text",
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
    6: [
      // Question Introduction Text Box Component
      {
        id: "page6-question-intro",
        name: "page6-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page6-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page6.sideHeading"),
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
        id: "page6-map-tableContainer",
        name: "page6-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page6-table-heading",
        name: "page6-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page6-map-table",
        name: "page6-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      {
        id: "page6-map-container",
        name: "page6-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page6-indomap",
        name: "page6-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page6-feedback-textbox",
        name: "page6-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
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
        id: "page6-instruction-text",
        name: "page6-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.instructionText.dragFrom"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    7: [
      // Question Introduction Text Box Component
      {
        id: "page7-question-intro",
        name: "page7-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page7-map-tableContainer",
        name: "page7-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page7-table-heading",
        name: "page7-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page7-map-table",
        name: "page7-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page7.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      // {
      //   id: "page7-tile",
      //   name: "page7-tile",
      //   type: "custom",
      //   coordinates: [1150, 230, 600, 680],
      //   zIndex: 54,
      //   props: {
      //     componentType: "TileComponent",
      //     mode: "focus",
      //     backgroundColor: "transparent",
      //     borderColor: "#ffffff",
      //     borderWidth: "4gc",
      //     borderRadius: "8gc",
      //     color: "#ffffff",
      //     fontSize: "40gc",
      //     padding: "15gc",
      //     children: " ",
      //   },
      // },
      {
        id: "page7-map-container",
        name: "page7-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page7-indomap",
        name: "page7-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
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

      {
        id: "page7-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page7-hotspot-1",
      //   name: "page7-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page7-line-1",
      //   name: "page7-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page7-line-1-arrow",
      //   name: "page7-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page7-line-2",
      //   name: "page7-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page7-line-3",
      //   name: "page7-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page7-number-pad",
        name: "page7-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page7-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "", // ID of element to update with number pad input
              correctValue: 1, // Correct value to compare against
              correctFeedback: getI18nText("pages.page7.feedBacks.correct", ""), // Feedback text for correct answer
              incorrectFeedback: getI18nText("pages.page7.feedBacks.inCorrect"), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page7.defaultText"), // Default text to display in feedback area
          },
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
        id: "page7-instruction-text",
        name: "page7-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.instructionText.enterScale"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    8: [
      // Question Introduction Text Box Component
      {
        id: "page8-question-intro",
        name: "page8-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page8-map-tableContainer",
        name: "page8-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page8-table-heading",
        name: "page8-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page8-map-table",
        name: "page8-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page8.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      // {
      //   id: "page8-tile",
      //   name: "page8-tile",
      //   type: "custom",
      //   coordinates: [1150, 230, 600, 680],
      //   zIndex: 54,
      //   props: {
      //     componentType: "TileComponent",
      //     mode: "focus",
      //     backgroundColor: "transparent",
      //     borderColor: "#ffffff",
      //     borderWidth: "4gc",
      //     borderRadius: "8gc",
      //     color: "#ffffff",
      //     fontSize: "40gc",
      //     padding: "15gc",
      //     children: " ",
      //   },
      // },
      {
        id: "page8-map-container",
        name: "page8-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page8-indomap",
        name: "page8-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page8-feedback-textbox",
        name: "page8-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
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

      {
        id: "page8-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page8-hotspot-1",
      //   name: "page8-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page8-line-1",
      //   name: "page8-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page8-line-1-arrow",
      //   name: "page8-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page8-line-2",
      //   name: "page8-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page8-line-3",
      //   name: "page8-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page8-number-pad",
        name: "page8-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page8-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "page8-map-table-R3C2", // ID of element to update with number pad input
              correctValue: 1400, // Correct value to compare against
              correctFeedback: getI18nText("pages.page8.feedBacks.correct", ""), // Feedback text for correct answer
              incorrectFeedback: getI18nText("pages.page8.feedBacks.inCorrect"), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page8.defaultText"), // Default text to display in feedback area
          },
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
        id: "page8-instruction-text",
        name: "page8-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.instructionText.enterTheActual"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    9: [
      // Question Introduction Text Box Component
      {
        id: "page9-question-intro",
        name: "page9-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page9-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page9.sideHeading"),
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
        id: "page9-map-tableContainer",
        name: "page9-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page9-table-heading",
        name: "page9-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page9-map-table",
        name: "page9-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page9.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      {
        id: "page9-map-container",
        name: "page9-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page9-indomap",
        name: "page9-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
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
        id: "page9-instruction-text",
        name: "page9-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.instructionText.dragFrom"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    10: [
      // Question Introduction Text Box Component
      {
        id: "page10-question-intro",
        name: "page10-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page10-map-tableContainer",
        name: "page10-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page10-table-heading",
        name: "page10-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page10-map-table",
        name: "page10-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page10.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      // {
      //   id: "page10-tile",
      //   name: "page10-tile",
      //   type: "custom",
      //   coordinates: [1150, 230, 600, 680],
      //   zIndex: 54,
      //   props: {
      //     componentType: "TileComponent",
      //     mode: "focus",
      //     backgroundColor: "transparent",
      //     borderColor: "#ffffff",
      //     borderWidth: "4gc",
      //     borderRadius: "8gc",
      //     color: "#ffffff",
      //     fontSize: "40gc",
      //     padding: "15gc",
      //     children: " ",
      //   },
      // },
      {
        id: "page10-map-container",
        name: "page10-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page10-indomap",
        name: "page10-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
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

      {
        id: "page10-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page10-hotspot-1",
      //   name: "page10-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page10-line-1",
      //   name: "page10-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page10-line-1-arrow",
      //   name: "page10-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page10-line-2",
      //   name: "page10-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page10-line-3",
      //   name: "page10-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page10-number-pad",
        name: "page10-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page10-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "", // ID of element to update with number pad input
              correctValue: 1, // Correct value to compare against
              correctFeedback: getI18nText(
                "pages.page10.feedBacks.correct",
                ""
              ), // Feedback text for correct answer
              incorrectFeedback: getI18nText(
                "pages.page10.feedBacks.inCorrect"
              ), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page10.defaultText"), // Default text to display in feedback area
          },
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
        id: "page10-instruction-text",
        name: "page10-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.instructionText.enterScale"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    11: [
      // Question Introduction Text Box Component
      {
        id: "page11-question-intro",
        name: "page11-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page11-map-tableContainer",
        name: "page11-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page11-table-heading",
        name: "page11-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page11-map-table",
        name: "page11-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page11.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      // {
      //   id: "page11-tile",
      //   name: "page11-tile",
      //   type: "custom",
      //   coordinates: [1150, 230, 600, 680],
      //   zIndex: 54,
      //   props: {
      //     componentType: "TileComponent",
      //     mode: "focus",
      //     backgroundColor: "transparent",
      //     borderColor: "#ffffff",
      //     borderWidth: "4gc",
      //     borderRadius: "8gc",
      //     color: "#ffffff",
      //     fontSize: "40gc",
      //     padding: "15gc",
      //     children: " ",
      //   },
      // },
      {
        id: "page11-map-container",
        name: "page11-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page11-indomap",
        name: "page11-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page11-feedback-textbox",
        name: "page11-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page11-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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

      {
        id: "page11-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
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
        },
      },
      // Hotspot Component
      // {
      //   id: "page11-hotspot-1",
      //   name: "page11-hotspot-1",
      //   type: "custom",
      //   coordinates: [700, 400, 800, 500], // Position on the map
      //   zIndex: 70,
      //   props: {
      //     componentType: "HotspotComponent",
      //     size: "25gc",
      //     backgroundColor: "rgba(255, 153, 0, 0.6)",
      //     borderColor: "#FF9900",
      //     borderWidth: "3gc",
      //     animated: true,
      //     onClick: (e) => {
      //       console.log("Page 2 hotspot clicked!");
      //       // Add your custom logic here
      //     }
      //   },
      // },
      // {
      //   id: "page11-line-1",
      //   name: "page11-line-1",
      //   type: "custom",
      //   coordinates: [200, 300, 600, 300], // Horizontal line: x1=200, y1=300, x2=600, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "line",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page11-line-1-arrow",
      //   name: "page11-line-1-arrow",
      //   type: "custom",
      //   coordinates: [600, 300, 700, 300], // Horizontal arrow: x1=600, y1=300, x2=1000, y2=300
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "horizontal",
      //     lineSubtype: "arrow",
      //     borderWidth: "3gc",
      //     borderColor: "#000000",
      //     borderStyle: "dashed",
      //     arrowheadSize: "12gc",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page11-line-2",
      //   name: "page11-line-2",
      //   type: "custom",
      //   coordinates: [400, 200, 400, 500], // Vertical line: x1=400, y1=200, x2=400, y2=500
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "vertical",
      //     borderWidth: "3gc",
      //     borderColor: "#FF0000",
      //     borderStyle: "dotted",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // {
      //   id: "page11-line-3",
      //   name: "page11-line-3",
      //   type: "custom",
      //   coordinates: [100, 100, 600, 400], // Slanted line: from (100, 100) to (500, 400)
      //   zIndex: 50,
      //   props: {
      //     componentType: "LineComponent",
      //     lineType: "slanted",
      //     borderWidth: "3gc",
      //     borderColor: "#0000FF",
      //     borderStyle: "dashed",
      //     backgroundColor: "transparent",
      //     cursor: "default"
      //   },
      // },
      // Number Pad Component
      {
        id: "page11-number-pad",
        name: "page11-number-pad",
        type: "custom",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position on the right side
        zIndex: 60,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "0px solid #FFAB40",
          padding: "15gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 4, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          setFocusOnLoad: true, // If true, set destination cell to 'focus' mode on component load
          feedbackMode: "instruction", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: "page11-feedback-textbox", // ID of external feedback component to update when check is pressed
          destinations: [
            // Array of destination objects for sequential validation
            {
              destinationId: "page11-map-table-R4C2", // ID of element to update with number pad input
              correctValue: 1400, // Correct value to compare against
              correctFeedback: getI18nText(
                "pages.page11.feedBacks.correct",
                ""
              ), // Feedback text for correct answer
              incorrectFeedback: getI18nText(
                "pages.page11.feedBacks.inCorrect"
              ), // Feedback text for incorrect answer
            },
          ],
          destinationIndex: 0, // Current index in destinations array (starts at 0 on app load)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button
          numberButtons: {
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "30gc",
            fontWeight: "bold",
            borderRadius: "6gc",
            border: "2px solid #FF9900",
            margin: "3gc",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
            rowGap: "3gc",
            columnGap: "3gc",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "25gc",
            fontWeight: "bold",
            borderRadius: "8gc",
            border: "3px solid #FF6347",
            height: "60gc",
            marginTop: "10gc",
          },
          feedbackTextArea: {
            backgroundColor: "transparent",
            color: "#FF9900",
            fontSize: "36gc",
            fontWeight: "bold",
            textAlign: "center",
            defaultText: getI18nText("pages.page11.defaultText"), // Default text to display in feedback area
          },
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
        id: "page11-instruction-text",
        name: "page11-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page11.instructionText.enterTheActual"),
          fontSize: "50gc",
          color: "white",
          textAlign: "center",
        },
      },
    ],
    12: [
      // Question Introduction Text Box Component
      {
        id: "page12-question-intro",
        name: "page12-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.questionText"),
          fontSize: "40gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      {
        id: "page12-introduction-text",
        name: "introduction-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page12.sideHeading"),
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
        id: "page12-map-tableContainer",
        name: "page12-map-tableContainer",
        type: "textbox",
        coordinates: [5, questionBottomY + 5, 640, 815], // Position below roller coaster image
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
        id: "page12-table-heading",
        name: "page12-table-heading",
        type: "textbox",
        coordinates: [5, questionBottomY + 30, 640, questionBottomY + 50], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.tableHeading"),
          fontSize: "30gc",
          fontWeight: "bold",
          color: "var(--color-white)",
          textAlign: "center",
        },
      },
      // Question Table Component 1 (Mom)
      {
        id: "page12-map-table",
        name: "page12-map-table",
        type: "custom",
        coordinates: [5, 225, 550, 780], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page12.mapTable", {
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
          borderColor: "transparent",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {},
          textColor: "#ffffff",
          fontSize: "26gc",
          headerFontSize: "28gc",
          padding: "5gc",
          equalColumnWidths: true,
          equalRowHeights: true,
          rowGap: "4gc",
          columnGap: "4gc",
          cellBorderRadius: "15gc",
          dataColumnBackgroundColors: {
            0: "#403530",
            1: "#363A38",
            2: "#384557",
          },
        },
      },
      {
        id: "page12-map-container",
        name: "page12-map-container",
        type: "textbox",
        coordinates: [650, questionBottomY + 5, 1140, 815], // Position below roller coaster image
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
        id: "page12-indomap",
        name: "page12-indomap",
        type: "container",
        coordinates: [660, 175, 1130, 500],
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
        id: "page12-feedback-textbox",
        name: "page12-feedback-textbox-unique",
        type: "custom",
        coordinates: [675, 500, 1115, 775], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page12-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1300, 820, 1595, 895],
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
            window.location.reload();
          },
        },
      },

      // Tap GIF Image
      {
        id: "page12-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1150, 840, 1500, 890], // Position in top-right area
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
            const nav = pageNavigation[9];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
          disabled: true,
        },
      },
      {
        id: "page12-instruction-text",
        name: "page12-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page12.instructionText.dragFrom"),
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
            const sourceText =
              sourceElement.textContent?.trim() ||
              sourceElement.innerText?.trim() ||
              "";
            console.log(
              `🎯 [PageConfig] Reading text from source ${sourceId}:`,
              sourceText
            );

            // Try to update number pad target first (if destination is a number pad)
            if (
              window.numberPadCallbacks &&
              window.numberPadCallbacks[destinationId]
            ) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(
                `✅ [PageConfig] Updated number pad ${destinationId} target to:`,
                sourceText
              );
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(
                `✅ [PageConfig] Updated element ${destinationId} text to:`,
                sourceText
              );
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(
                  `🔄 [PageConfig] Destination element ${destinationId} not found, retrying... (${
                    retryCount + 1
                  }/${maxRetries})`
                );
                setTimeout(() => {
                  window.updateTargetIDText(
                    sourceId,
                    destinationId,
                    retryCount + 1
                  );
                }, retryDelay);
              } else {
                console.warn(
                  `⚠️ [PageConfig] Destination element not found: ${destinationId} after ${maxRetries} retries`
                );
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(
                `🔄 [PageConfig] Source element ${sourceId} not found, retrying... (${
                  retryCount + 1
                }/${maxRetries})`
              );
              setTimeout(() => {
                window.updateTargetIDText(
                  sourceId,
                  destinationId,
                  retryCount + 1
                );
              }, retryDelay);
            } else {
              console.warn(
                `⚠️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries`
              );
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
        console.error("❌ [PageConfig] Error updating target text:", error);
      }
    };

    // Listen for page changes to update number pad target on page 2
    if (typeof window !== "undefined") {
      window.addEventListener("pageChanged", (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          window.updateTargetIDText("page2-map-table-R1C1", "page2-number-pad");
        }
      });
    }

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
