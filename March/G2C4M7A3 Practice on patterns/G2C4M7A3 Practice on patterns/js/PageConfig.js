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
 * Get shape configuration from constants.js
 * Returns the shape object with quadType, vertices, gridRows, and gridCols
 * Falls back to default parallelogram if window.shape is not available
 * @returns {Object} Shape configuration object
 */
const getShapeConfig = () => {
  if (typeof window !== "undefined" && window.shape) {
    return {
      quadType: window.shape.quadType || "PARALLELOGRAM",
      vertices: window.shape.vertices || [
        { row: 2, col: 2 },
        { row: 2, col: 8 },
        { row: 7, col: 9 },
        { row: 7, col: 3 },
      ],
      gridRows: window.shape.gridRows || 10,
      gridCols: window.shape.gridCols || 10,
    };
  }
  // Fallback to default parallelogram
  return {
    quadType: "PARALLELOGRAM",
    vertices: [
      { row: 2, col: 2 },
      { row: 2, col: 8 },
      { row: 7, col: 9 },
      { row: 7, col: 3 },
    ],
    gridRows: 10,
    gridCols: 10,
  };
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
    // Get current page before navigation
    const currentPage =
      typeof window.getCurrentPage === "function"
        ? window.getCurrentPage()
        : null;

    // Reset states for both current page (if exists) and target page
    if (currentPage && currentPage !== targetPage) {
      resetPageStates(currentPage);

    }

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

    // Reset target page after a small delay to ensure components are mounted
    setTimeout(() => {
      resetPageStates(targetPage);
    }, 100);
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
  function showTapGifOnQuizComplete() {
    window.addEventListener("quizCompleted", (event) => {
      const page = event.detail?.pageNumber;
      const el = document.getElementById(`page${page}-tap-gif`);

      if (el) {
        el.style.opacity = "1";
      }
    });
  }

  showTapGifOnQuizComplete();
  // Return optimized GridPositionPages
  return {
    1: [
      // Title: "Properties of a Parallelogram" in bright orange, centered at top
      {
        id: "page1-title",
        name: "page1-title",
        coordinates: [25, 50, 1575, 150],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page1.title",
            "Properties of a Parallelogram"
          ),
          fontSize: "60gc",
          color: "#FF9900", // Bright orange
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },

      // Main explanatory text: "Let's explore the side, angle, and diagonal properties of a parallelogram."
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [200, 300, 1400, 450],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page1.mainText",
            "Let's explore the side, angle, and diagonal properties of a parallelogram."
          ),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
          whiteSpace: "pre-line",
          allowHTML: true,
        },
      },

      // Instruction text: "Tap "Start" to start the activity."
      {
        id: "page1-instruction-text",
        name: "page1-instruction-text",
        coordinates: [200, 550, 1400, 650],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page1.instructionText",
            'Tap "Start" to start the activity.'
          ),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Start button - Orange with gradient, centered at bottom (same style as page 7 Start Over button)
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 700, 950, 800],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start", "Start"),
          fontSize: "40gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "2px solid #FFAA00", // Lighter orange border
          textAlign: "center",
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
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
      //tap gif
      {
        id: "page1-tap-next",
        name: "page1-tap-next",
        type: "custom",
        coordinates: [650, 750, 720, 850],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },
    ],
    2: [
      // Header - Orange text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page2.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (15% smaller)
      {
        id: "page2-left-column",
        name: "page2-left-column",
        coordinates: [5, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Dashed orange container (3gc) – hint area; hidden by default, visible when Show Hint clicked
      {
        id: "page2-dashed-container",
        name: "page2-dashed-container",
        coordinates: [1270, 200, 1580, 668],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("pages.page2.hintText", "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.")
              : "";
          },
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "flex" : "none";
          },
          fontSize: "36gc",
          color: "#ffffff",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: "20gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "dashed",
          borderColor: "#FF9900",
          borderRadius: "12gc",
        },
      },
      // Dashed yellow container (5gc) – hidden by default, visible when Show Hint clicked
      {
        id: "page2-dashed-yellow-container",
        name: "page2-dashed-yellow-container",
        coordinates: [10, 235, 425, 470],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "block" : "none";
          },
          backgroundColor: "transparent",
          borderWidth: "5gc",
          borderStyle: "dashed",
          borderColor: "#FFD700",
          borderRadius: "12gc",
          boxSizing: "border-box",
          className: "container-border-blink",
        },
      },


      // question text
      {
        id: "page2-question-text",
        name: "page2-question-text",
        coordinates: [5, 95, 1595, 140],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.questionText", ""),
          fontSize: "43gc",
          color: "#FFFF", // white color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },



      // Fill Blanks Component (15% smaller)
      {
        id: 'page2-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page2-fill-blanks', // Explicit ID for quiz detection
          blanks: [

          ],
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '50gc', // 15% smaller (24 * 0.85)
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [10, 200, 1250, 450], // moved up 50, center-aligned with image+blanks row (x 100–1190)
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: 'transparent',
          optionButtonFontSize: '17gc', // 15% smaller (20 * 0.85)
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 9,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'MCQ', // Drag and drop mode
          options: getI18nText('pages.page2.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page2.fillBlanks.impFormulae', [])
        }
      },
      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 580, 1200, 780], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          get text() {
            return window.patternProps.instructionChange ? getI18nText("pages.page2.instructionAfter") : getI18nText(
              'pages.page2.instruction',
              'Tap the shape to fill it in the box.'
            );
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },

      // Navigation buttons (15% smaller again = ~28% total)
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for specific page
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.next", "»");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            window.patternProps.showHint = false
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[2];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: "page2-tap-gif",
        name: "page2-tap-gif",
        coordinates: [1450, 840, 1500, 900], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "100",
        type: "container",
        props: {
          imageSrc: 'assets/tap.gif',
          opacity: '0'
        },
      },

      {
        id: "page2-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            window.patternProps.showHint = false
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page2-show-hint-button",
        name: "show-hint-button",
        type: "button",
        coordinates: [1300, 700, 1500, 775],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("buttons.hideHint", "Hide Hint")
              : getI18nText("buttons.showHint", "Show Hint");
          },
          fontSize: "29gc", // same as next button
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (window.patternProps) window.patternProps.showHint = !window.patternProps.showHint;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          },
        },
      },

      // {
      //   id: "page2-page-title",
      //   name: "page2-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    3: [
      // Header - Orange text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page3.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (15% smaller)
      {
        id: "page3-left-column",
        name: "page3-left-column",
        coordinates: [5, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Dashed orange container (3gc) – hint area; hidden by default, visible when Show Hint clicked
      {
        id: "page3-dashed-container",
        name: "page3-dashed-container",
        coordinates: [1270, 200, 1580, 668],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("pages.page3.hintText", "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.")
              : "";
          },
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "flex" : "none";
          },
          fontSize: "36gc",
          color: "#ffffff",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: "20gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "dashed",
          borderColor: "#FF9900",
          borderRadius: "12gc",
        },
      },
      // Dashed yellow container (5gc) – hidden by default, visible when Show Hint clicked
      {
        id: "page3-dashed-yellow-container",
        name: "page3-dashed-yellow-container",
        coordinates: [10, 235, 290, 470],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "block" : "none";
          },
          backgroundColor: "transparent",
          borderWidth: "5gc",
          borderStyle: "dashed",
          borderColor: "#FFD700",
          borderRadius: "12gc",
          boxSizing: "border-box",
          className: "container-border-blink",
        },
      },


      // question text
      {
        id: "page3-question-text",
        name: "page3-question-text",
        coordinates: [5, 95, 1595, 140],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.questionText", ""),
          fontSize: "43gc",
          color: "#FFFF", // white color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },



      // Fill Blanks Component (15% smaller)
      {
        id: 'page3-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page3-fill-blanks', // Explicit ID for quiz detection
          blanks: [

          ],
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '50gc', // 15% smaller (24 * 0.85)
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [10, 200, 1250, 450], // moved up 50, center-aligned with image+blanks row (x 100–1190)
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: 'transparent',
          optionButtonFontSize: '17gc', // 15% smaller (20 * 0.85)
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 9,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'MCQ', // Drag and drop mode
          options: getI18nText('pages.page3.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page3.fillBlanks.impFormulae', [])
        }
      },
      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 580, 1200, 780], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          get text() {
            return window.patternProps.instructionChange ? getI18nText("pages.page3.instructionAfter") : getI18nText(
              'pages.page3.instruction',
              'Tap the shape to fill it in the box.'
            );
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 3, // Pass page number for event filtering
        }
      },

      // Navigation buttons (15% smaller again = ~28% total)
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for specific page
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.next", "»");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            window.patternProps.showHint = false
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: "page3-tap-gif",
        name: "page3-tap-gif",
        coordinates: [1450, 840, 1500, 900], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "100",
        type: "container",
        props: {
          imageSrc: 'assets/tap.gif',
          opacity: '0'
        },
      },

      {
        id: "page3-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            window.patternProps.showHint = false
            const nav = pageNavigation[3];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page3-show-hint-button",
        name: "show-hint-button",
        type: "button",
        coordinates: [1300, 700, 1500, 775],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("buttons.hideHint", "Hide Hint")
              : getI18nText("buttons.showHint", "Show Hint");
          },
          fontSize: "29gc", // same as next button
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (window.patternProps) window.patternProps.showHint = !window.patternProps.showHint;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          },
        },
      },

      // {
      //   id: "page3-page-title",
      //   name: "page3-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    4: [
      // Header - Orange text
      {
        id: "page4-header",
        name: "page4-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page4.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (15% smaller)
      {
        id: "page4-left-column",
        name: "page4-left-column",
        coordinates: [5, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Dashed orange container (3gc) – hint area; hidden by default, visible when Show Hint clicked
      {
        id: "page4-dashed-container",
        name: "page4-dashed-container",
        coordinates: [1270, 200, 1580, 668],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("pages.page4.hintText", "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.")
              : "";
          },
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "flex" : "none";
          },
          fontSize: "36gc",
          color: "#ffffff",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: "20gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "dashed",
          borderColor: "#FF9900",
          borderRadius: "12gc",
        },
      },
      // Dashed yellow container (5gc) – hidden by default, visible when Show Hint clicked
      {
        id: "page4-dashed-yellow-container",
        name: "page4-dashed-yellow-container",
        coordinates: [10, 235, 425, 470],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "block" : "none";
          },
          backgroundColor: "transparent",
          borderWidth: "5gc",
          borderStyle: "dashed",
          borderColor: "#FFD700",
          borderRadius: "12gc",
          boxSizing: "border-box",
          className: "container-border-blink",
        },
      },


      // question text
      {
        id: "page4-question-text",
        name: "page4-question-text",
        coordinates: [5, 95, 1595, 140],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.questionText", ""),
          fontSize: "43gc",
          color: "#FFFF", // white color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },



      // Fill Blanks Component (15% smaller)
      {
        id: 'page4-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page4-fill-blanks', // Explicit ID for quiz detection
          blanks: [

          ],
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '50gc', // 15% smaller (24 * 0.85)
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [10, 200, 1250, 450], // moved up 50, center-aligned with image+blanks row (x 100–1190)
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: 'transparent',
          optionButtonFontSize: '17gc', // 15% smaller (20 * 0.85)
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 9,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'MCQ', // Drag and drop mode
          options: getI18nText('pages.page4.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page4.fillBlanks.impFormulae', [])
        }
      },
      // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 580, 1200, 780], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          get text() {
            return window.patternProps.instructionChange ? getI18nText("pages.page4.instructionAfter") : getI18nText(
              'pages.page4.instruction',
              'Tap the shape to fill it in the box.'
            );
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 4, // Pass page number for event filtering
        }
      },

      // Navigation buttons (15% smaller again = ~28% total)
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.next", "»");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            window.patternProps.showHint = false
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[4];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: "page4-tap-gif",
        name: "page4-tap-gif",
        coordinates: [1450, 840, 1500, 900], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "100",
        type: "container",
        props: {
          imageSrc: 'assets/tap.gif',
          opacity: '0'
        },
      },

      {
        id: "page4-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            window.patternProps.showHint = false
            const nav = pageNavigation[4];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page4-show-hint-button",
        name: "show-hint-button",
        type: "button",
        coordinates: [1300, 700, 1500, 775],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("buttons.hideHint", "Hide Hint")
              : getI18nText("buttons.showHint", "Show Hint");
          },
          fontSize: "29gc", // same as next button
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (window.patternProps) window.patternProps.showHint = !window.patternProps.showHint;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          },
        },
      },

      // {
      //   id: "page4-page-title",
      //   name: "page4-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    5: [
      // Header - Orange text
      {
        id: "page5-header",
        name: "page5-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page5.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (15% smaller)
      {
        id: "page5-left-column",
        name: "page5-left-column",
        coordinates: [5, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Dashed orange container (3gc) – hint area; hidden by default, visible when Show Hint clicked
      {
        id: "page5-dashed-container",
        name: "page5-dashed-container",
        coordinates: [1270, 200, 1580, 668],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("pages.page5.hintText", "This part highlighted in the pattern is repeating again and again. This is the core of the pattern.")
              : "";
          },
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "flex" : "none";
          },
          fontSize: "36gc",
          color: "#ffffff",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: "20gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "dashed",
          borderColor: "#FF9900",
          borderRadius: "12gc",
        },
      },
      // Dashed yellow container (5gc) – hidden by default, visible when Show Hint clicked
      {
        id: "page5-dashed-yellow-container",
        name: "page5-dashed-yellow-container",
        coordinates: [10, 235, 425, 470],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          get display() {
            return (window.patternProps && window.patternProps.showHint) ? "block" : "none";
          },
          backgroundColor: "transparent",
          borderWidth: "5gc",
          borderStyle: "dashed",
          borderColor: "#FFD700",
          borderRadius: "12gc",
          boxSizing: "border-box",
          className: "container-border-blink",
        },
      },


      // question text
      {
        id: "page5-question-text",
        name: "page5-question-text",
        coordinates: [5, 95, 1595, 140],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.questionText", ""),
          fontSize: "43gc",
          color: "#FFFF", // white color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },



      // Fill Blanks Component (15% smaller)
      {
        id: 'page5-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page5-fill-blanks', // Explicit ID for quiz detection
          blanks: [

          ],
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '50gc', // 15% smaller (24 * 0.85)
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [10, 200, 1250, 450], // moved up 50, center-aligned with image+blanks row (x 100–1190)
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: "",
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: 'transparent',
          optionButtonFontSize: '17gc', // 15% smaller (20 * 0.85)
          optionButtonFontColor: '#ffffff',
          optionsRows: 1,
          optionsColumns: 9,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'MCQ', // Drag and drop mode
          options: getI18nText('pages.page5.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page5.fillBlanks.impFormulae', [])
        }
      },
      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 580, 1200, 780], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page5-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
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
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          get text() {
            return window.patternProps.instructionChange ? getI18nText("pages.page5.instructionAfter") : getI18nText(
              'pages.page5.instruction',
              'Tap the shape to fill it in the box.'
            );
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 5, // Pass page number for event filtering
        }
      },

      // Navigation buttons (15% smaller again = ~28% total)
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1400, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page
          fontSize: "34gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.startOver", "»");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            window.patternProps.showHint = false
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              window.location.reload();
            }
          },
        },
      },

      //tap gif
      {
        id: "page5-tap-gif",
        name: "page5-tap-gif",
        coordinates: [1400, 840, 1450, 900], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "100",
        type: "container",
        props: {
          imageSrc: 'assets/tap.gif',
          opacity: '0'
        },
      },

      {
        id: "page5-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          fontSize: "50gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            window.patternProps.showHint = false
            const nav = pageNavigation[5];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      {
        id: "page5-show-hint-button",
        name: "show-hint-button",
        type: "button",
        coordinates: [1300, 700, 1500, 775],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return (window.patternProps && window.patternProps.showHint)
              ? getI18nText("buttons.hideHint", "Hide Hint")
              : getI18nText("buttons.showHint", "Show Hint");
          },
          fontSize: "29gc", // same as next button
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (window.patternProps) window.patternProps.showHint = !window.patternProps.showHint;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          },
        },
      },

      // {
      //   id: "page5-page-title",
      //   name: "page5-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all states for a page when it loads
 * This ensures clean state on every page navigation
 */
const resetPageStates = (pageNumber) => {
  if (typeof window === "undefined") return;

  console.log(`🔄 Resetting all states for page ${pageNumber}`);

  try {
    const tapGif = document.getElementById(`page${pageNumber}-tap-gif`);
    if (tapGif) {
      tapGif.style.opacity = "0";
    }
    // // 0. Reset page-2 hint visibility when entering page 2
    if (pageNumber === 2 && window.patternProps) window.patternProps.showHint = false;
    if (pageNumber === 3 && window.patternProps) window.patternProps.showHintPage3 = false;
    if (pageNumber === 4 && window.patternProps) window.patternProps.showHintPage4 = false;
    if (pageNumber === 5 && window.patternProps) window.patternProps.showHintPage5 = false;
    // // 1. Reset quadrilateral animation states
    // if (window.quadrilateralAnimations) {
    //   Object.keys(window.quadrilateralAnimations).forEach((quadId) => {
    //     const animObj = window.quadrilateralAnimations[quadId];
    //     // Stop all animations - call methods directly on the element if available
    //     const quadElement = document.getElementById(quadId);
    //     if (quadElement) {
    //       if (quadElement.stopParallelLinesAnimation)
    //         quadElement.stopParallelLinesAnimation();
    //       if (quadElement.stopOppositeSideAnimation)
    //         quadElement.stopOppositeSideAnimation();
    //       if (quadElement.stopAngleEqualityAnimation)
    //         quadElement.stopAngleEqualityAnimation();
    //       if (quadElement.stopDiagonalEqualityAnimation)
    //         quadElement.stopDiagonalEqualityAnimation();
    //       if (quadElement.stopSymmetryFoldAnimation)
    //         quadElement.stopSymmetryFoldAnimation();
    //     }
    //     // Also try via registry methods
    //     if (animObj.stopParallelLinesAnimation)
    //       animObj.stopParallelLinesAnimation();
    //     if (animObj.stopOppositeSideAnimation)
    //       animObj.stopOppositeSideAnimation();
    //     if (animObj.stopAngleEqualityAnimation)
    //       animObj.stopAngleEqualityAnimation();
    //     if (animObj.stopDiagonalEqualityAnimation)
    //       animObj.stopDiagonalEqualityAnimation();
    //     if (animObj.stopSymmetryFoldAnimation)
    //       animObj.stopSymmetryFoldAnimation();
    //     // Reset side colors and blinking
    //     if (animObj.updateSideColors) {
    //       // Reset all sides to default (no blink, original colors)
    //       for (let i = 0; i < 4; i++) {
    //         animObj.updateSideColors(i, null, false);
    //       }
    //     }
    //   });
    // }

    // // 2. Reset quadrilateral display states via events (no global state needed)
    // // Components will reset themselves when they receive the pageStateReset event
    // // No need to dispatch individual property reset events - components handle their own reset

    // // 3. Reset quadrilateral component states (vertices, transforms, colors, etc.)
    // if (typeof document !== "undefined") {
    //   // Find all quadrilateral components
    //   const quadElements = document.querySelectorAll(
    //     '[id*="-shape-display"], [id*="-quadrilateral"], [data-quad-type]'
    //   );
    //   quadElements.forEach((element) => {
    //     // Reset CSS transforms (parallel lines animation, etc.)
    //     const quadWrapper = element.querySelector(".quadrilateral-wrapper");
    //     if (quadWrapper) {
    //       quadWrapper.style.transform = "";
    //       quadWrapper.style.transition = "";
    //       quadWrapper.style.willChange = "";
    //       quadWrapper.style.isolation = "";
    //       quadWrapper.style.transformStyle = "";
    //     }

    //     // Reset parallel lines animation rails
    //     const parallelRails = element.querySelectorAll(".parallel-lines-rails");
    //     parallelRails.forEach((rail) => rail.remove());

    //     // Reset any animated arc containers
    //     const animatedArcs = element.querySelectorAll(
    //       ".animated-angle-arc-container, .animated-angle-sum-arc-container"
    //     );
    //     animatedArcs.forEach((arc) => {
    //       arc.style.opacity = "";
    //       arc.style.transform = "";
    //     });

    //     // Reset symmetry fold animation
    //     const symmetryFold = element.querySelectorAll(
    //       ".symmetry-folding-half-wrapper, .symmetry-fold-line"
    //     );
    //     symmetryFold.forEach((fold) => fold.remove());

    //     // Reset diagonal equality animation
    //     const diagonalEquality = element.querySelectorAll(
    //       ".animated-diagonal-equality-line"
    //     );
    //     diagonalEquality.forEach((line) => line.remove());

    //     // Reset side colors by finding all SVG lines and resetting their stroke
    //     const svg = element.querySelector("svg");
    //     if (svg) {
    //       // Reset all side line colors to default (remove any custom colors/blinking)
    //       const sideLines = svg.querySelectorAll("line[data-side-index], line");
    //       sideLines.forEach((line) => {
    //         line.style.stroke = "";
    //         line.classList.remove("side-blink");
    //         // Remove any data attributes that might affect color
    //         line.removeAttribute("data-custom-color");
    //       });

    //       // Remove dynamically added symbols (arrows, ticks, etc.)
    //       const dynamicElements = svg.querySelectorAll(
    //         '[data-dynamic="true"], .parallel-arrow, .equality-tick, .angle-equality-tick, .parallel-arrows-container, g[data-symbols]'
    //       );
    //       dynamicElements.forEach((el) => el.remove());
    //     }

    //     // Reset angle markers (remove any equality ticks, reset colors)
    //     const angleMarkers = element.querySelectorAll(
    //       ".angle-marker-component"
    //     );
    //     angleMarkers.forEach((marker) => {
    //       // Remove equality tick marks
    //       const equalityTicks = marker.querySelectorAll(
    //         ".equality-tick-mark, .angle-equality-tick, line.equality-tick"
    //       );
    //       equalityTicks.forEach((tick) => tick.remove());

    //       // Reset angle marker colors and blinking
    //       const arcs = marker.querySelectorAll("path, svg");
    //       arcs.forEach((arc) => {
    //         arc.style.fill = "";
    //         arc.style.stroke = "";
    //         arc.classList.remove("angle-arc-blink");
    //         // Reset fill opacity
    //         if (arc.hasAttribute("fill-opacity")) {
    //           arc.setAttribute("fill-opacity", "");
    //         }
    //       });
    //     });

    //     // Clear angle measurement labels
    //     const angleLabels = element.querySelectorAll(
    //       '.angle-measurement-label, [data-angle-label="true"]'
    //     );
    //     angleLabels.forEach((label) => label.remove());
    //   });
    // }

    // // 4. Reset message boxes (only clear those that are meant to be dynamically updated)
    // // Message boxes with initial static text (like page2-messagebox) should be preserved
    // if (typeof document !== "undefined") {
    //   const messageBoxes = document.querySelectorAll('[id*="-messagebox"]');
    //   messageBoxes.forEach((box) => {
    //     const boxId = box.id;
    //     // Only clear message boxes that are meant to be dynamically updated
    //     // These are message boxes that start with empty text in PageConfig (e.g., page3-messagebox, page4-messagebox, etc.)
    //     // Preserve message boxes with initial static text (e.g., page2-messagebox)
    //     if (
    //       boxId &&
    //       (boxId.includes("page3-") ||
    //         boxId.includes("page4-") ||
    //         boxId.includes("page5-") ||
    //         boxId.includes("page6-"))
    //     ) {
    //       // These message boxes are meant to be dynamically updated, so clear them
    //       if (box.textContent) {
    //         box.textContent = "";
    //       }
    //       if (box.innerHTML) {
    //         box.innerHTML = "";
    //       }
    //     }
    //     // For other message boxes (like page2-messagebox), preserve their content
    //     // The component will restore the initial text from props on re-render
    //   });
    // }

    // // 5. Reset button states (enable/disable)
    // if (typeof document !== "undefined") {
    //   const nextButtons = document.querySelectorAll('[id*="-next-button"]');
    //   nextButtons.forEach((button) => {
    //     const container = button.closest(".next-button") || button;
    //     if (container) {
    //       container.classList.remove("disabled");
    //       container.style.opacity = "";
    //       container.style.pointerEvents = "";
    //     }
    //   });

    //   const tapAnimations = document.querySelectorAll('[id*="-tap-next"]');
    //   tapAnimations.forEach((tap) => {
    //     if (tap.style) {
    //       tap.style.display = "";
    //       tap.style.visibility = "";
    //     }
    //   });
    // }

    // // 6. Clear any animation sequence states
    // if (window.QuadAnimationSequenceStates) {
    //   Object.keys(window.QuadAnimationSequenceStates).forEach((seqId) => {
    //     const state = window.QuadAnimationSequenceStates[seqId];
    //     if (state) {
    //       state.currentStep = 0;
    //       state.isComplete = false;
    //       state.isRunning = false;
    //       // Clear any timeouts
    //       if (state.timeouts) {
    //         state.timeouts.forEach((timeout) => clearTimeout(timeout));
    //         state.timeouts = [];
    //       }
    //     }
    //   });
    // }

    // // 7. Reset shape selector state if exists
    // if (window.shapeSelectorState) {
    //   Object.keys(window.shapeSelectorState).forEach((key) => {
    //     const state = window.shapeSelectorState[key];
    //     if (state) {
    //       state.selected = false;
    //       state.highlighted = false;
    //     }
    //   });
    // }

    // // // 8. Reset all components with IDs matching the page pattern (e.g., page3-*)
    // if (typeof document !== "undefined") {
    //   // Find all elements with IDs matching the page pattern
    //   const pageElements = document.querySelectorAll(
    //     `[id^="page${pageNumber}-"]`
    //   );
    //   pageElements.forEach((element) => {
    //     // Remove any dynamically added content
    //     const dynamicElements = element.querySelectorAll(
    //       '[data-dynamic="true"], [data-description-index]'
    //     );
    //     dynamicElements.forEach((el) => el.remove());

    //     // Reset any inline styles that might have been modified
    //     if (element.style) {
    //       // Reset transform, opacity, etc. but keep positioning
    //       element.style.transform = "";
    //       element.style.opacity = "";
    //       element.style.transition = "";
    //     }
    //   });
    // }
    // Reset FillBlanksComponent stored states
    if (window.fillBlanksStateStore) {
      Object.keys(window.fillBlanksStateStore).forEach((key) => {
        if (key.startsWith(`page${pageNumber}`)) {
          delete window.fillBlanksStateStore[key];
        }
      });
    }
    // // 9. Dispatch reset event for components to listen
    window.dispatchEvent(
      new CustomEvent("pageStateReset", {
        detail: { page: pageNumber },
      })
    );

    // Also dispatch a global reset event that all components can listen to
    window.dispatchEvent(
      new CustomEvent("globalPageReset", {
        detail: { page: pageNumber },
      })
    );

    console.log(`✅ All states reset for page ${pageNumber}`);
  } catch (error) {
    console.error(`❌ Error resetting page states:`, error);
  }
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

    // Expose page state reset function globally
    window.resetPageStates = resetPageStates;

    // Listen for page change events and reset states
    window.addEventListener("pageChanged", (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        // Reset states after a delay to ensure components are mounted
        // This ensures clean state when navigating to a new page
        setTimeout(() => {
          resetPageStates(pageNumber);
        }, 150);
      }
    });
    console.log("✅ Page state reset handler registered");

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
                  `🔄 [PageConfig] Destination element ${destinationId} not found, retrying... (${retryCount + 1
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
                `🔄 [PageConfig] Source element ${sourceId} not found, retrying... (${retryCount + 1
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
              // Log as info instead of warning - element might not exist by design
              console.log(
                `ℹ️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries (this may be expected if element is optional)`
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
          // Only attempt update if source element exists (optional feature)
          const sourceElement = document.getElementById("page2-map-table-R1C1");
          if (sourceElement) {
            window.updateTargetIDText(
              "page2-map-table-R1C1",
              "page2-number-pad"
            );
          } else {
            // Silently skip if table doesn't exist (this is optional functionality)
            console.log(
              "ℹ️ [PageConfig] Table cell page2-map-table-R1C1 not found, skipping number pad update"
            );
          }
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
