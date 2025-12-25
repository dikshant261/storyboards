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
  9: { prev: 8, next: null },
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
      // start heading text
      {
        id: "page1-heading-text",
        name: "page1-heading-text",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page1.titleText"),
          fontSize: "52gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
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
          fontSize: "44gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'white',
          border: 'none'
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
            return getI18nText("buttons.start", "»");
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
          imageAlt: "Tap",
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
      //       return getI18nText("buttons.previous", "«");
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
      //heading text
      {
        id: "page2-heading-text",
        name: "page2-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page2.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page2-pie-chart-table-container",
        name: "page2-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },

      //pie-chart image
      {
        id: "page4-pie-chart-image",
        name: "page4-pie-chart-image",
        type: "container",
        coordinates: [250, 120, 800, 490],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pieChart32pink.png",
          imageAlt: "pieChart",
        },
      },
      //left-line-image
      {
        id: "page4-left-line-image",
        name: "page4-left-line-image",
        type: "container",
        coordinates: [250, 50, 450, 320],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/leftLine.png",
          imageAlt: "rightLine",
        },
      },
      //right-line-image
      {
        id: "page4-right-line-image",
        name: "page4-right-line-image",
        type: "container",
        coordinates: [600, 50, 800, 320],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightLine.png",
          imageAlt: "rightLine",
        },
      },
      //pass text 
      {
        id: "page2-pass-text",
        name: "page2-pass-text",
        type: "textbox",
        coordinates: [800, 120, 1010, 160],
        zIndex: 56,
        props: {
          text: getI18nText("common.passText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#B3FF66",
        },
      },
      //fail text
      {
        id: "page2-fail-text",
        name: "page2-fail-text",
        type: "textbox",
        coordinates: [40, 120, 250, 160],
        zIndex: 56,
        props: {
          text: getI18nText("common.failText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#FF79C6",
          whiteSpace: "pre-line",
          textAlign: "right",
        },
      },
      //pie-chart table
      {
        id: "page2-pie-chart-table",
        name: "page2-pie-chart-table",
        type: "custom",
        coordinates: [20, 490, 1030, 680], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page2.pieTable", {
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
      // option feedback continer
      {
        id: "page2-option-feedback-container",
        name: "page2-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //option 

      // Fill Blanks Component
      {
        id: "page2-fill-blanks",
        name: "page2-fill-blanks-component",
        type: "custom",
        coordinates: [0, 800, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            { id: "blank1", coordinate: [785, 590, 1000, 660], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [1070, 430, 1590, 800],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText("pages.page2.fillBlanks.instructionText"),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "32gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 2,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          optionsContainerPadding: '30gc',
          optionsContainerGap: '30gc',
          optionButtonColor: 'var(--color-orange)', // Background color for option buttons
          optionButtonFontSize: '32gc', // Font size for option buttons (in gc)
          optionButtonFontColor: 'var(--color-white)', // Font color for option buttons (in gc)
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page2.fillBlanks.options", []),
        },
      },

      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox",
        type: "custom",
        coordinates: [1070, 120, 1590, 400], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page2-instruction-text",
        name: "page2-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page2.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    3: [
      //heading text
      {
        id: "page3-heading-text",
        name: "page3-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page3.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page3-pie-chart-table-container",
        name: "page3-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //pie-chart slider component
      {
        id: "page3-pie-chart-slider",
        name: "page3-pie-chart-slider",
        type: "custom",
        coordinates: [200, 190, 900, 790], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "PieSliderComponent",

          pinkColor: "#ff79c6",
          greenColor: "#b2ff66",
          initialPinkPercent: 32,
          correctPinkPercent: 30,

          sliceLabelFontSize: "36gc",
          sliceLabelFontColor: "#000000",

          pointerColor: "#ffa500",
          pointerBorderColor: "#ffffff",
          pointerBorderWidth: "4gc",
          pointerSize: "28gc",

          pieBorderColor: "#000000",
          pieBorderWidth: "5gc",

          chartSize: 1000,
          checkButtonText: getI18nText("buttons.check", "Check"),
          checkButtonFontSize: "43gc",
          checkButtonFontColor: "#ffffff",
          checkButtonColor: "var(--color-orange)",

          correctFeedback: getI18nText("pages.page3.feedback.correctFeedback", "Well done! You set the fail percentage to 8%. The pass percentage is 100% - 8% = 92%."),
          incorrectFeedback: getI18nText("pages.page3.feedback.wrongFeedback", "That's not correct. Please adjust the slider to set the fail percentage to 8%."),
        },
      },
      //green rectangle image
      {
        id: "page3-green-rectangle-image",
        name: "page3-green-rectangle-image",
        type: "container",
        coordinates: [20, 110, 80, 170],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/greenRectangle.png",
          imageAlt: "greenRectangle",
        },
      },
      // //pass text 
      {
        id: "page3-pass-text",
        name: "page3-pass-text",
        type: "textbox",
        coordinates: [95, 120, 400, 150],
        zIndex: 56,
        props: {
          text: getI18nText("common.pass"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#b2ff66",
        },
      },
      //pink rectangle image
      {
        id: "page3-pink-rectangle-image",
        name: "page3-pink-rectangle-image",
        type: "container",
        coordinates: [20, 180, 80, 240],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pinkRectangle.png",
          imageAlt: "pinkRectangle",
        },
      },
      // //fail text
      {
        id: "page3-fail-text",
        name: "page3-fail-text",
        type: "textbox",
        coordinates: [95, 190, 400, 220],
        zIndex: 56,
        props: {
          text: getI18nText("common.fail"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#ff79c6",
        },
      },

      // option feedback container
      {
        id: "page3-option-feedback-container",
        name: "page3-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //side instruction text
      {
        id: "page3-sideInstruction-text",
        name: "page3-sideInstruction-text",
        type: "textbox",
        coordinates: [1080, 390, 1580, 430],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page3.instruction.setTheFail"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "32gc",
          color: "var(--color-white)",
        },
      },
      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox",
        type: "custom",
        coordinates: [1070, 150, 1590, 430], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page3.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    4: [
      //heading text
      {
        id: "page4-heading-text",
        name: "page4-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page4.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page4-pie-chart-table-container",
        name: "page4-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },

      //pie-chart image
      {
        id: "page4-pie-chart-image",
        name: "page4-pie-chart-image",
        type: "container",
        coordinates: [250, 120, 800, 490],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pinkpieChart30.png",
          imageAlt: "pieChart",
        },
      },
      //left-line-image
      {
        id: "page4-left-line-image",
        name: "page4-left-line-image",
        type: "container",
        coordinates: [250, 50, 450, 320],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/leftLine.png",
          imageAlt: "rightLine",
        },
      },
      //right-line-image
      {
        id: "page4-right-line-image",
        name: "page4-right-line-image",
        type: "container",
        coordinates: [600, 50, 800, 320],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightLine.png",
          imageAlt: "rightLine",
        },
      },
      //pass text 
      {
        id: "page4-pass-text",
        name: "page4-pass-text",
        type: "textbox",
        coordinates: [800, 120, 1010, 160],
        zIndex: 56,
        props: {
          text: getI18nText("common.passText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#B3FF66",
        },
      },
      //fail text
      {
        id: "page4-fail-text",
        name: "page4-fail-text",
        type: "textbox",
        coordinates: [40, 120, 250, 160],
        zIndex: 56,
        props: {
          text: getI18nText("common.failText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#FF79C6",
          whiteSpace: "pre-line",
          textAlign: "right",
        },
      },
      //pie-chart table
      {
        id: "page4-pie-chart-table",
        name: "page4-pie-chart-table",
        type: "custom",
        coordinates: [20, 490, 1030, 680], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page4.pieTable", {
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
      // option feedback continer
      {
        id: "page4-option-feedback-container",
        name: "page4-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //option 

      // Fill Blanks Component
      {
        id: "page4-fill-blanks",
        name: "page4-fill-blanks-component",
        type: "custom",
        coordinates: [0, 800, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            { id: "blank1", coordinate: [785, 590, 1000, 660], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [1070, 430, 1590, 800],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText("pages.page4.fillBlanks.instructionText"),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "32gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 2,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          optionsContainerPadding: '30gc',
          optionsContainerGap: '30gc',
          optionButtonColor: 'var(--color-orange)', // Background color for option buttons
          optionButtonFontSize: '32gc', // Font size for option buttons (in gc)
          optionButtonFontColor: 'var(--color-white)', // Font color for option buttons (in gc)
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page4.fillBlanks.options", []),
        },
      },

      // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox",
        type: "custom",
        coordinates: [1070, 120, 1590, 400], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page4-instruction-text",
        name: "page4-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page4.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    5: [
      //heading text
      {
        id: "page5-heading-text",
        name: "page5-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page5.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page5-pie-chart-table-container",
        name: "page5-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //pie-chart slider component
      {
        id: "page5-pie-chart-slider",
        name: "page5-pie-chart-slider",
        type: "custom",
        coordinates: [200, 190, 900, 790], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "PieSliderComponent",

          pinkColor: "#ff79c6",
          greenColor: "#b2ff66",
          initialPinkPercent: 30,
          initialGreenPercent: 70,
          correctType: 'green', // 'pink' or 'green'
          correctPinkPercent: null,
          correctGreenPercent: 87, // If null, calculated as 100 - correctPinkPercent

          sliceLabelFontSize: "36gc",
          sliceLabelFontColor: "#000000",

          pointerColor: "#ffa500",
          pointerBorderColor: "#ffffff",
          pointerBorderWidth: "4gc",
          pointerSize: "28gc",

          pieBorderColor: "#000000",
          pieBorderWidth: "5gc",

          chartSize: 1000,
          checkButtonText: getI18nText("buttons.check", "Check"),
          checkButtonFontSize: "43gc",
          checkButtonFontColor: "#ffffff",
          checkButtonColor: "var(--color-orange)",

          correctFeedback: getI18nText("pages.page5.feedback.correctFeedback", "Well done! You set the fail percentage to 8%. The pass percentage is 100% - 8% = 92%."),
          incorrectFeedback: getI18nText("pages.page5.feedback.wrongFeedback", "That's not correct. Please adjust the slider to set the fail percentage to 8%."),
        },
      },
      //green rectangle image
      {
        id: "page5-green-rectangle-image",
        name: "page5-green-rectangle-image",
        type: "container",
        coordinates: [20, 110, 80, 170],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/greenRectangle.png",
          imageAlt: "greenRectangle",
        },
      },
      // //pass text 
      {
        id: "page5-pass-text",
        name: "page5-pass-text",
        type: "textbox",
        coordinates: [95, 120, 400, 150],
        zIndex: 56,
        props: {
          text: getI18nText("common.pass"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#b2ff66",
        },
      },
      //pink rectangle image
      {
        id: "page5-pink-rectangle-image",
        name: "page5-pink-rectangle-image",
        type: "container",
        coordinates: [20, 180, 80, 240],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pinkRectangle.png",
          imageAlt: "pinkRectangle",
        },
      },
      // //fail text
      {
        id: "page5-fail-text",
        name: "page5-fail-text",
        type: "textbox",
        coordinates: [95, 190, 400, 220],
        zIndex: 56,
        props: {
          text: getI18nText("common.fail"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#ff79c6",
        },
      },

      // option feedback container
      {
        id: "page5-option-feedback-container",
        name: "page5-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //side instruction text
      {
        id: "page5-sideInstruction-text",
        name: "page5-sideInstruction-text",
        type: "textbox",
        coordinates: [1080, 390, 1580, 430],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page5.instruction.setTheFail"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "32gc",
          color: "var(--color-white)",
        },
      },
      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox",
        type: "custom",
        coordinates: [1070, 150, 1590, 430], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page5-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page5-instruction-text",
        name: "page5-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page5.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    6: [
      //heading text
      {
        id: "page6-heading-text",
        name: "page6-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page6.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page6-pie-chart-table-container",
        name: "page6-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //pie-chart image
      {
        id: "page6-pie-chart-image",
        name: "page6-pie-chart-image",
        type: "container",
        coordinates: [250, 120, 800, 490],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pieChartgreen87.png",
          imageAlt: "pieChart",
        },
      },
      //left-line-image
      {
        id: "page6-left-line-image",
        name: "page6-left-line-image",
        type: "container",
        coordinates: [250, 30, 450, 310],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/leftLine.png",
          imageAlt: "rightLine",
        },
      },
      //right-line-image
      {
        id: "page6-right-line-image",
        name: "page6-right-line-image",
        type: "container",
        coordinates: [600, 50, 800, 320],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightLine.png",
          imageAlt: "rightLine",
        },
      },
      //pass text 
      {
        id: "page6-pass-text",
        name: "page6-pass-text",
        type: "textbox",
        coordinates: [800, 120, 1010, 160],
        zIndex: 56,
        props: {
          text: getI18nText("common.passText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#B3FF66",
        },
      },
      //fail text
      {
        id: "page6-fail-text",
        name: "page6-fail-text",
        type: "textbox",
        coordinates: [40, 120, 250, 160],
        zIndex: 56,
        props: {
          text: getI18nText("common.failText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#FF79C6",
          whiteSpace: "pre-line",
          textAlign: "right",
        },
      },
      //pie-chart table
      {
        id: "page6-pie-chart-table",
        name: "page6-pie-chart-table",
        type: "custom",
        coordinates: [20, 490, 1030, 680], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.pieTable", {
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
      // option feedback continer
      {
        id: "page6-option-feedback-container",
        name: "page6-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //option 

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
            { id: "blank1", coordinate: [785, 590, 1000, 660], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [1070, 430, 1590, 800],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText("pages.page6.fillBlanks.instructionText"),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "32gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 2,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          optionsContainerPadding: '30gc',
          optionsContainerGap: '30gc',
          optionButtonColor: 'var(--color-orange)', // Background color for option buttons
          optionButtonFontSize: '32gc', // Font size for option buttons (in gc)
          optionButtonFontColor: 'var(--color-white)', // Font color for option buttons (in gc)
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page6.fillBlanks.options", []),
        },
      },

      // Feedback Textbox Component
      {
        id: "page6-feedback-textbox",
        name: "page6-feedback-textbox",
        type: "custom",
        coordinates: [1070, 120, 1590, 400], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page6-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page6-instruction-text",
        name: "page6-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page6.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    7: [
      //heading text
      {
        id: "page7-heading-text",
        name: "page7-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page7.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page7-pie-chart-table-container",
        name: "page7-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //pie-chart slider component
      {
        id: "page7-pie-chart-slider",
        name: "page7-pie-chart-slider",
        type: "custom",
        coordinates: [200, 190, 900, 790], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "PieSliderComponent",

          pinkColor: "#ff79c6",
          greenColor: "#b2ff66",
          initialPinkPercent: 13,
          initialGreenPercent: 87,
          correctType: 'pink', // 'pink' or 'green'
          correctPinkPercent: 8,
          correctGreenPercent: null, // If null, calculated as 100 - correctPinkPercent

          sliceLabelFontSize: "36gc",
          sliceLabelFontColor: "#000000",

          pointerColor: "#ffa500",
          pointerBorderColor: "#ffffff",
          pointerBorderWidth: "4gc",
          pointerSize: "28gc",

          pieBorderColor: "#000000",
          pieBorderWidth: "5gc",

          chartSize: 1000,
          checkButtonText: getI18nText("buttons.check", "Check"),
          checkButtonFontSize: "43gc",
          checkButtonFontColor: "#ffffff",
          checkButtonColor: "var(--color-orange)",

          correctFeedback: getI18nText("pages.page7.feedback.correctFeedback", "Well done! You set the fail percentage to 8%. The pass percentage is 100% - 8% = 92%."),
          incorrectFeedback: getI18nText("pages.page7.feedback.wrongFeedback", "That's not correct. Please adjust the slider to set the fail percentage to 8%."),
        },
      },
      //green rectangle image
      {
        id: "page7-green-rectangle-image",
        name: "page7-green-rectangle-image",
        type: "container",
        coordinates: [20, 110, 80, 170],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/greenRectangle.png",
          imageAlt: "greenRectangle",
        },
      },
      // //pass text 
      {
        id: "page7-pass-text",
        name: "page7-pass-text",
        type: "textbox",
        coordinates: [95, 120, 400, 150],
        zIndex: 56,
        props: {
          text: getI18nText("common.pass"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#b2ff66",
        },
      },
      //pink rectangle image
      {
        id: "page7-pink-rectangle-image",
        name: "page7-pink-rectangle-image",
        type: "container",
        coordinates: [20, 180, 80, 240],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/pinkRectangle.png",
          imageAlt: "pinkRectangle",
        },
      },
      // //fail text
      {
        id: "page7-fail-text",
        name: "page7-fail-text",
        type: "textbox",
        coordinates: [95, 190, 400, 220],
        zIndex: 56,
        props: {
          text: getI18nText("common.fail"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#ff79c6",
        },
      },
      // option feedback container
      {
        id: "page7-option-feedback-container",
        name: "page7-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //side instruction text
      {
        id: "page7-sideInstruction-text",
        name: "page7-sideInstruction-text",
        type: "textbox",
        coordinates: [1080, 390, 1580, 430],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page7.instruction.setTheFail"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "32gc",
          color: "var(--color-white)",
        },
      },
      // Feedback Textbox Component
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox",
        type: "custom",
        coordinates: [1070, 150, 1590, 430], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page7-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page7-instruction-text",
        name: "page7-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page7.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    8: [
      //heading text
      {
        id: "page8-heading-text",
        name: "page8-heading-text",
        type: "custom",
        coordinates: [5, 0, 1500, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page8.titleText", ""), // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      //pie-chart and table container
      {
        id: "page8-pie-chart-table-container",
        name: "page8-pie-chart-table-container",
        type: "container",
        coordinates: [5, 100, 1050, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //pie-chart image
      {
        id: "page8-pie-chart-image",
        name: "page8-pie-chart-image",
        type: "container",
        coordinates: [250, 120, 800, 490],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/greenpieChart8.png",
          imageAlt: "pieChart",
        },
      },
      //left-line-image
      {
        id: "page8-left-line-image",
        name: "page8-left-line-image",
        type: "container",
        coordinates: [250, 20, 490, 290],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/leftLine.png",
          imageAlt: "rightLine",
        },
      },
      //right-line-image
      {
        id: "page8-right-line-image",
        name: "page8-right-line-image",
        type: "container",
        coordinates: [550, 50, 800, 250],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightLine.png",
          imageAlt: "rightLine",
        },
      },
      //pass text 
      {
        id: "page8-pass-text",
        name: "page8-pass-text",
        type: "textbox",
        coordinates: [800, 100, 1010, 140],
        zIndex: 56,
        props: {
          text: getI18nText("common.passText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#B3FF66",
        },
      },
      //fail text
      {
        id: "page8-fail-text",
        name: "page8-fail-text",
        type: "textbox",
        coordinates: [40, 100, 250, 140],
        zIndex: 56,
        props: {
          text: getI18nText("common.failText"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "36gc",
          color: "#FF79C6",
          whiteSpace: "pre-line",
          textAlign: "right",
        },
      },
      //pie-chart table
      {
        id: "page8-pie-chart-table",
        name: "page8-pie-chart-table",
        type: "custom",
        coordinates: [20, 490, 1030, 680], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page8.pieTable", {
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
      // option feedback continer
      {
        id: "page8-option-feedback-container",
        name: "page8-option-feedback-container",
        type: "container",
        coordinates: [1060, 100, 1595, 815], // Top section for intro
        zIndex: 50,
        props: {
          text: "",
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'var(--color-blueprint)',
          boxShadow: '0gc 4gc 8gc rgba(0, 0, 0, 0.2)',
          borderRadius: '16gc',
          borderWidth: '2gc',
          borderStyle: 'solid',
          borderColor: 'var(--color-whiteoff)',
        },
      },
      //option 

      // Fill Blanks Component
      {
        id: "page8-fill-blanks",
        name: "page8-fill-blanks-component",
        type: "custom",
        coordinates: [0, 800, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            { id: "blank1", coordinate: [785, 590, 1000, 660], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [1070, 430, 1590, 800],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText("pages.page8.fillBlanks.instructionText"),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "32gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 2,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          optionsContainerPadding: '30gc',
          optionsContainerGap: '30gc',
          optionButtonColor: 'var(--color-orange)', // Background color for option buttons
          optionButtonFontSize: '32gc', // Font size for option buttons (in gc)
          optionButtonFontColor: 'var(--color-white)', // Font color for option buttons (in gc)
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page8.fillBlanks.options", []),
        },
      },

      // Feedback Textbox Component
      {
        id: "page8-feedback-textbox",
        name: "page8-feedback-textbox",
        type: "custom",
        coordinates: [1070, 120, 1590, 400], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page8-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      //instruction text
      {
        id: "page8-instruction-text",
        name: "page8-instruction-text",
        type: "textbox",
        coordinates: [155, 820, 1445, 895],
        zIndex: 56,
        props: {
          text: getI18nText("pages.page8.instruction.tapOption"),
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          fontSize: "42gc",
          color: "var(--color-white)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

    ],
    9: [
      // start heading text
      {
        id: "page9-heading-text",
        name: "page9-heading-text",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page9.activityCompleted"),
          fontSize: "52gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      // Feedback Textbox Component
      {
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [100, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page9.summaryText"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "44gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'white',
          border: 'none'
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 620, 950, 720],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.start", "»");
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
        id: "page9-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 650, 750, 750], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // // Previous button - Three Layer Structure
      // {
      //   id: "page9-previous-button",
      //   name: "previous-button",
      //   type: "button",
      //   coordinates: [5, 820, 150, 895],
      //   zIndex: "var(--z-button)",
      //   props: {
      //     get text() {
      //       return getI18nText("buttons.previous", "«");
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
      //   id: "page9-instruction-text",
      //   name: "page9-instruction-text",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page9.instructionText.tapAfterReading"),
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
