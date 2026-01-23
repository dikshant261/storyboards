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
  13: { prev: 12, next: 13 },
  14: { prev: 13, next: 14 },
  15: { prev: 14, next: null },
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
 * @param {string} [shapeType] - Optional shape type to select (e.g., "PARALLELOGRAM", "SQUARE")
 * @returns {Object} Shape configuration object
 */
const getShapeConfig = (shapeType = null) => {
  if (typeof window !== 'undefined' && window.shape) {
    // Handle array format (new format)
    if (Array.isArray(window.shape)) {
      let selectedShape = null;

      // If shapeType is provided, find matching shape
      if (shapeType) {
        selectedShape = window.shape.find(
          s => s.quadType === shapeType || s.type === shapeType.toLowerCase()
        );
      }

      // If no match found or no shapeType provided, use first shape
      if (!selectedShape && window.shape.length > 0) {
        selectedShape = window.shape[0];
      }

      if (selectedShape) {
        return {
          quadType: selectedShape.quadType || "PARALLELOGRAM",
          vertices: selectedShape.vertices || [
            { row: 2, col: 2 },
            { row: 2, col: 8 },
            { row: 7, col: 9 },
            { row: 7, col: 3 }
          ],
          gridRows: selectedShape.gridRows || 10,
          gridCols: selectedShape.gridCols || 10
        };
      }
    }
    // Handle object format (backward compatibility)
    else if (typeof window.shape === 'object') {
      return {
        quadType: window.shape.quadType || "PARALLELOGRAM",
        vertices: window.shape.vertices || [
          { row: 2, col: 2 },
          { row: 2, col: 8 },
          { row: 7, col: 9 },
          { row: 7, col: 3 }
        ],
        gridRows: window.shape.gridRows || 10,
        gridCols: window.shape.gridCols || 10
      };
    }
  }
  // Fallback to default parallelogram
  return {
    quadType: "PARALLELOGRAM",
    vertices: [
      { row: 2, col: 2 },
      { row: 2, col: 8 },
      { row: 7, col: 9 },
      { row: 7, col: 3 }
    ],
    gridRows: 10,
    gridCols: 10
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
    const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;

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

  // Return optimized GridPositionPages
  return {
    1: [
      // Main instructional text - white text, centered
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [5, 50, 1595, 100],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.title", "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin."),
          fontSize: "46gc",
          color: "#FF9900",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Main instructional text - white text, centered
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [200, 200, 1400, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.mainText", "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin."),
          fontSize: "42gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Start button - Orange gradient with black text, positioned at bottom center
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 675, 950, 775], // Bottom center position
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start", "Start"),
          fontSize: "44gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background (gradient will be applied via CSS)
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "none",
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
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 700, 750, 800],
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
          text: getI18nText("pages.page2.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //angle heading 
      {
        id: "page2-angle-heading",
        name: "page2-angle-heading",
        coordinates: [25, 100, 1575, 160],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.angleHeading", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //a 360 angle image one
      {
        id: "page2-360-image-one",
        name: "page2-360-image-one",
        coordinates: [180, 240, 780, 720],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-one.png',
          imageAlt: "360 angle image"
        },
      },
      //a 360 angle image two
      {
        id: "page2-360-image-two",
        name: "page2-360-image-two",
        coordinates: [880, 240, 1480, 720],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-two.png',
          imageAlt: "360 angle image"
        },
      },
      // Instruction text - static text
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[2];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page2-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


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
          text: getI18nText("pages.page3.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //angle heading 
      {
        id: "page3-angle-heading",
        name: "page3-angle-heading",
        coordinates: [25, 100, 1575, 160],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.angleHeading", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //a 360 angle image one
      {
        id: "page3-360-image-one",
        name: "page3-360-image-one",
        coordinates: [500, 240, 1100, 720],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-three.png',
          imageAlt: "360 angle image"
        },
      },

      // Instruction text - static text
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page3-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[3];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


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
          text: getI18nText("pages.page4.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //angle heading 
      {
        id: "page4-angle-heading",
        name: "page4-angle-heading",
        coordinates: [25, 100, 1575, 160],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.angleHeading", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //a 360 angle image one
      {
        id: "page4-360-image-one",
        name: "page4-360-image-one",
        coordinates: [500, 240, 1100, 720],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-four.png',
          imageAlt: "360 angle image"
        },
      },

      // Instruction text - static text
      {
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[4];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page4-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[4];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


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
          text: getI18nText("pages.page5.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //angle heading 
      {
        id: "page5-angle-heading",
        name: "page5-angle-heading",
        coordinates: [25, 100, 1575, 160],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.angleHeading", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //a 360 angle image one
      {
        id: "page5-360-image-one",
        name: "page5-360-image-one",
        coordinates: [500, 240, 1100, 720],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-five.png',
          imageAlt: "360 angle image"
        },
      },

      // Instruction text - static text
      {
        id: "page5-instruction",
        name: "page5-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page5-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[5];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    6: [
      // Header - Orange text
      {
        id: "page6-header",
        name: "page6-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //angle heading 
      {
        id: "page6-angle-heading",
        name: "page6-angle-heading",
        coordinates: [25, 100, 1575, 160],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.angleHeading", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      //a 360 angle image one
      {
        id: "page6-360-image-one",
        name: "page6-360-image-one",
        coordinates: [180, 200, 780, 580],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-six.png',
          imageAlt: "360 angle image"
        },
      },
      //acute angle heading 
      {
        id: "page6-acute-angle-text",
        name: "page6-acute-angle-text",
        coordinates: [180, 580, 780, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("common.angleNames.acute", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // right angle heading 
      {
        id: "page6-less-right-angle-text",
        name: "page6-less-right-angle-text",
        coordinates: [180, 660, 780, 690],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.rightAngleLessSign", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //a 360 angle image two
      {
        id: "page6-360-image-two",
        name: "page6-360-image-two",
        coordinates: [840, 200, 1440, 580],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-seven.png',
          imageAlt: "360 angle image"
        },
      },
      //obtuse angle heading 
      {
        id: "page6-obtuse-angle-text",
        name: "page6-obtuse-angle-text",
        coordinates: [1050, 580, 1440, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("common.angleNames.obtuse", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //greater right angle heading 
      {
        id: "page6-greater-right-angle-text",
        name: "page6-greater-right-angle-text",
        coordinates: [1050, 660, 1440, 690],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.rightAngleGreaterSign", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - static text
      {
        id: "page6-instruction",
        name: "page6-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[6];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page6-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[6];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],

    7: [
      // Header - Orange text
      {
        id: "page7-header",
        name: "page7-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //angle heading 
      {
        id: "page7-angle-heading",
        name: "page7-angle-heading",
        coordinates: [25, 100, 1575, 160],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.angleHeading", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      //a 360 angle image one
      {
        id: "page7-360-image-one",
        name: "page7-360-image-one",
        coordinates: [180, 200, 780, 580],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-six.png',
          imageAlt: "360 angle image"
        },
      },
      //acute angle heading 
      {
        id: "page7-acute-angle-text",
        name: "page7-acute-angle-text",
        coordinates: [180, 580, 780, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("common.angleNames.acute", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      //a 360 angle image two
      {
        id: "page7-360-image-two",
        name: "page7-360-image-two",
        coordinates: [840, 200, 1440, 580],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/angle360-seven.png',
          imageAlt: "360 angle image"
        },
      },
      //obtuse angle heading 
      {
        id: "page7-obtuse-angle-text",
        name: "page7-obtuse-angle-text",
        coordinates: [1050, 580, 1440, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("common.angleNames.obtuse", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //straight Angle
      {
        id: "page7-straight-Angle-text",
        name: "page7-straight-Angle-text",
        coordinates: [550, 660, 1100, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.straightAngle", "A rhombus and a kite share some common properties."),
          fontSize: "42gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - static text
      {
        id: "page7-instruction",
        name: "page7-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[7];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page7-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[7];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    8: [

      //angle heading 
      {
        id: "page8-angle-heading",
        name: "page8-angle-heading",
        coordinates: [25, 50, 1575, 110],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.rightAngle", "A rhombus and a kite share some common properties."),
          fontSize: "34gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      //a 360 angle image one
      {
        id: "page8-360-image-one",
        name: "page8-360-image-one",
        coordinates: [650, 150, 1050, 430],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/rightAngle.png',
          imageAlt: "360 angle image"
        },
      },
      //acute angle image two
      {
        id: "page8-acute-image-two",
        name: "page8-acute-image-two",
        coordinates: [200, 400, 600, 680],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/acuteAngle.png',
          imageAlt: "360 angle image"
        },
      },
      //acute angle heading 
      {
        id: "page8-acute-angle-text",
        name: "page8-acute-angle-text",
        coordinates: [100, 680, 700, 710],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.acuteAngle", "A rhombus and a kite share some common properties."),
          fontSize: "34gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //obtuse angle image two
      {
        id: "page8-obtuse-image-two",
        name: "page8-obtuse-image-two",
        coordinates: [1000, 450, 1500, 680],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/obtuseAngle.png',
          imageAlt: "360 angle image"
        },
      },
      //acute angle heading 
      {
        id: "page8-obtuse-angle-text",
        name: "page8-obtuse-angle-text",
        coordinates: [1000, 680, 1600, 710],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.obtuseAngle", "A rhombus and a kite share some common properties."),
          fontSize: "34gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },



      // Instruction text - static text
      {
        id: "page8-instruction",
        name: "page8-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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

      {
        id: "page8-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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


    ],
    9: [

      // Main instructional text - white text, centered
      {
        id: "page9-main-text",
        name: "page9-main-text",
        coordinates: [200, 200, 1400, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.mainText", "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin."),
          fontSize: "42gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },

      // Instruction text - static text
      {
        id: "page9-instruction",
        name: "page9-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[9];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page9-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[9];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

    ],
    10: [
      // Header - Orange text
      {
        id: "page10-header",
        name: "page10-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page10-left-column",
        name: "page10-left-column",
        coordinates: [5, 85, 995, 810], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Left panel text - uses page10StateConfig for text content


      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page10-right-column",
        name: "page10-right-column",
        coordinates: [1000, 85, 1595, 810], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //shape image
      {
        id: "page10-shape-image",
        name: "page10-shape-image",
        coordinates: [25, 200, 975, 670],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/shape1.png'
        },
      },
      // Quiz panel in right column
      {
        id: "page10-quiz-panel",
        name: "page10-quiz-panel",
        coordinates: [1000, 85, 1595, 810], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page10.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page10.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "36gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "32gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 0,
          optionsRowHeight: 60,
          feedbackRowHeight: 30,
          // Option button height percentage
          optionButtonHeight: 75,
          options: getI18nText("pages.page10.quizPanel.options", [
            {
              text: "Yes always",
              iscorrect: true,
              feedback: "Correct! A rhombus can always be called a kite.",
            },
            {
              text: "Yes sometimes",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
            },
            {
              text: "No",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
            },
          ]),
        },
      },



      // Instruction text - static text
      {
        id: "page10-instruction",
        name: "page10-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },



      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[10];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page10-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[10];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    11: [
      // Header - Orange text
      {
        id: "page11-header",
        name: "page11-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page11.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page11-left-column",
        name: "page11-left-column",
        coordinates: [5, 85, 995, 810], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Left panel text - uses page11StateConfig for text content


      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page11-right-column",
        name: "page11-right-column",
        coordinates: [1000, 85, 1595, 810], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //shape image
      {
        id: "page11-shape-image",
        name: "page11-shape-image",
        coordinates: [25, 200, 975, 670],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/wallWatch.png'
        },
      },
      // Quiz panel in right column
      {
        id: "page11-quiz-panel",
        name: "page11-quiz-panel",
        coordinates: [1000, 85, 1595, 810], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page11.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page11.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "36gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "32gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 0,
          optionsRowHeight: 60,
          feedbackRowHeight: 30,
          // Option button height percentage
          optionButtonHeight: 75,
          options: getI18nText("pages.page11.quizPanel.options", [
            {
              text: "Yes always",
              iscorrect: true,
              feedback: "Correct! A rhombus can always be called a kite.",
            },
            {
              text: "Yes sometimes",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
            },
            {
              text: "No",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
            },
          ]),
        },
      },



      // Instruction text - static text
      {
        id: "page11-instruction",
        name: "page11-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page11.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[11];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page11-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[11];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    12: [
      // Header - Orange text
      {
        id: "page12-header",
        name: "page12-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page12.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page12-left-column",
        name: "page12-left-column",
        coordinates: [5, 85, 995, 810], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Left panel text - uses page12StateConfig for text content


      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page12-right-column",
        name: "page12-right-column",
        coordinates: [1000, 85, 1595, 810], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //shape image
      {
        id: "page12-shape-image",
        name: "page12-shape-image",
        coordinates: [25, 200, 975, 670],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/scessor.png'
        },
      },
      // Quiz panel in right column
      {
        id: "page12-quiz-panel",
        name: "page12-quiz-panel",
        coordinates: [1000, 85, 1595, 810], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page12.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page12.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "36gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "32gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 0,
          optionsRowHeight: 60,
          feedbackRowHeight: 30,
          // Option button height percentage
          optionButtonHeight: 75,
          options: getI18nText("pages.page12.quizPanel.options", [
            {
              text: "Yes always",
              iscorrect: true,
              feedback: "Correct! A rhombus can always be called a kite.",
            },
            {
              text: "Yes sometimes",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
            },
            {
              text: "No",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
            },
          ]),
        },
      },



      // Instruction text - static text
      {
        id: "page12-instruction",
        name: "page12-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page12.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[12];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page12-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[12];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    13: [
      // Header - Orange text
      {
        id: "page13-header",
        name: "page13-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page13.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page13-left-column",
        name: "page13-left-column",
        coordinates: [5, 85, 995, 810], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Left panel text - uses page13StateConfig for text content


      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page13-right-column",
        name: "page13-right-column",
        coordinates: [1000, 85, 1595, 810], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //shape image
      {
        id: "page13-shape-image",
        name: "page13-shape-image",
        coordinates: [25, 200, 975, 670],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/stairs.png'
        },
      },
      // Quiz panel in right column
      {
        id: "page13-quiz-panel",
        name: "page13-quiz-panel",
        coordinates: [1000, 85, 1595, 810], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page13.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page13.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "36gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "32gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 0,
          optionsRowHeight: 60,
          feedbackRowHeight: 30,
          // Option button height percentage
          optionButtonHeight: 75,
          options: getI18nText("pages.page13.quizPanel.options", [
            {
              text: "Yes always",
              iscorrect: true,
              feedback: "Correct! A rhombus can always be called a kite.",
            },
            {
              text: "Yes sometimes",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
            },
            {
              text: "No",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
            },
          ]),
        },
      },



      // Instruction text - static text
      {
        id: "page13-instruction",
        name: "page13-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page13.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[13];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page13-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[13];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    14: [
      // Header - Orange text
      {
        id: "page14-header",
        name: "page14-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page14.headerText", "A rhombus and a kite share some common properties."),
          fontSize: "40gc",
          color: "#ffff", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page14-left-column",
        name: "page14-left-column",
        coordinates: [5, 85, 995, 810], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Left panel text - uses page14StateConfig for text content


      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page14-right-column",
        name: "page14-right-column",
        coordinates: [1000, 85, 1595, 810], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //shape image
      {
        id: "page14-shape-image",
        name: "page14-shape-image",
        coordinates: [25, 200, 975, 670],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/stairs.png'
        },
      },
      // Quiz panel in right column
      {
        id: "page14-quiz-panel",
        name: "page14-quiz-panel",
        coordinates: [1000, 85, 1595, 810], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page14.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page14.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "36gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "32gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 0,
          optionsRowHeight: 60,
          feedbackRowHeight: 30,
          // Option button height percentage
          optionButtonHeight: 75,
          options: getI18nText("pages.page14.quizPanel.options", [
            {
              text: "Yes always",
              iscorrect: true,
              feedback: "Correct! A rhombus can always be called a kite.",
            },
            {
              text: "Yes sometimes",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
            },
            {
              text: "No",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
            },
          ]),
        },
      },



      // Instruction text - static text
      {
        id: "page14-instruction",
        name: "page14-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page14.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
      },
      // Navigation buttons
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
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[14];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page14-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

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
            const nav = pageNavigation[14];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    15: [
      // Main instructional text - white text, centered
      {
        id: "page15-main-text",
        name: "page15-main-text",
        coordinates: [5, 50, 1595, 100],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page15.title", "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin."),
          fontSize: "46gc",
          color: "#FF9900",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Main instructional text - white text, centered
      {
        id: "page15-main-text",
        name: "page15-main-text",
        coordinates: [200, 200, 1400, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page15.mainText", "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin."),
          fontSize: "42gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Start button - Orange gradient with black text, positioned at bottom center
      {
        id: "page15-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 675, 950, 775], // Bottom center position
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.startOver", "Start"),
          fontSize: "44gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background (gradient will be applied via CSS)
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "none",
          textAlign: "center",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            window.location.reload();
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
      //tap gif
      {
        id: "page15-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 700, 750, 800],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all global states (quiz panels, page completion, etc.)
 * Called when "Start Over" is clicked
 */
const resetAllStates = () => {
  if (typeof window === 'undefined') return;

  console.log(`🔄 Resetting all global states (Start Over)`);

  try {
    // 1. Clear quiz panel state store
    if (window.quizPanelStateStore) {
      console.log(`🔄 Clearing quiz panel state store`);
      window.quizPanelStateStore = {};
    }

    // 2. Clear page completion states
    if (window.pageCompletionState) {
      console.log(`🔄 Clearing page completion states`);
      window.pageCompletionState = {};
    }

    // 3. Reset all pages (1-10) to ensure clean state
    for (let pageNum = 1; pageNum <= 10; pageNum++) {
      resetPageStates(pageNum);
    }

    console.log(`✅ All global states reset`);
  } catch (error) {
    console.error(`❌ Error resetting all states:`, error);
  }
};

/**
 * Reset all states for a page when it loads
 * This ensures clean state on every page navigation
 */
const resetPageStates = (pageNumber) => {
  if (typeof window === 'undefined') return;

  console.log(`🔄 Resetting all states for page ${pageNumber}`);

  try {
    // 0. Reset page 2 base state if resetting page 2
    if (pageNumber === 2 && window.setPage2BaseState) {
      window.setPage2BaseState('default');
    }
    // 0.1. Reset page 2 sub base state if resetting page 2
    if (pageNumber === 2 && window.setPage2SubBaseState) {
      window.setPage2SubBaseState('default');
    }

    // 0.2. Reset page 8 animation state if resetting page 8
    if (pageNumber === 8 && window.setPage8AnimationState) {
      window.setPage8AnimationState('WIP');
    }

    // 1. Reset quadrilateral animation states
    if (window.quadrilateralAnimations) {
      Object.keys(window.quadrilateralAnimations).forEach(quadId => {
        const animObj = window.quadrilateralAnimations[quadId];
        // Stop all animations - call methods directly on the element if available
        const quadElement = document.getElementById(quadId);
        if (quadElement) {
          if (quadElement.stopParallelLinesAnimation) quadElement.stopParallelLinesAnimation();
          if (quadElement.stopOppositeSideAnimation) quadElement.stopOppositeSideAnimation();
          if (quadElement.stopAngleEqualityAnimation) quadElement.stopAngleEqualityAnimation();
          if (quadElement.stopDiagonalEqualityAnimation) quadElement.stopDiagonalEqualityAnimation();
          if (quadElement.stopSymmetryFoldAnimation) quadElement.stopSymmetryFoldAnimation();
        }
        // Also try via registry methods
        if (animObj.stopParallelLinesAnimation) animObj.stopParallelLinesAnimation();
        if (animObj.stopOppositeSideAnimation) animObj.stopOppositeSideAnimation();
        if (animObj.stopAngleEqualityAnimation) animObj.stopAngleEqualityAnimation();
        if (animObj.stopDiagonalEqualityAnimation) animObj.stopDiagonalEqualityAnimation();
        if (animObj.stopSymmetryFoldAnimation) animObj.stopSymmetryFoldAnimation();
        // Reset side colors and blinking
        if (animObj.updateSideColors) {
          // Reset all sides to default (no blink, original colors)
          for (let i = 0; i < 4; i++) {
            animObj.updateSideColors(i, null, false);
          }
        }
      });
    }

    // 2. Reset quadrilateral display states via events (no global state needed)
    // Components will reset themselves when they receive the pageStateReset event
    // No need to dispatch individual property reset events - components handle their own reset

    // 3. Reset quadrilateral component states (vertices, transforms, colors, etc.)
    if (typeof document !== 'undefined') {
      // Find all quadrilateral components
      const quadElements = document.querySelectorAll('[id*="-shape-display"], [id*="-quadrilateral"], [data-quad-type]');
      quadElements.forEach(element => {
        // Reset CSS transforms (parallel lines animation, etc.)
        const quadWrapper = element.querySelector('.quadrilateral-wrapper');
        if (quadWrapper) {
          quadWrapper.style.transform = '';
          quadWrapper.style.transition = '';
          quadWrapper.style.willChange = '';
          quadWrapper.style.isolation = '';
          quadWrapper.style.transformStyle = '';
        }

        // Reset parallel lines animation rails
        const parallelRails = element.querySelectorAll('.parallel-lines-rails');
        parallelRails.forEach(rail => rail.remove());

        // Reset any animated arc containers
        const animatedArcs = element.querySelectorAll('.animated-angle-arc-container, .animated-angle-sum-arc-container');
        animatedArcs.forEach(arc => {
          arc.style.opacity = '';
          arc.style.transform = '';
        });

        // Reset symmetry fold animation
        const symmetryFold = element.querySelectorAll('.symmetry-folding-half-wrapper, .symmetry-fold-line');
        symmetryFold.forEach(fold => fold.remove());

        // Reset diagonal equality animation
        const diagonalEquality = element.querySelectorAll('.animated-diagonal-equality-line');
        diagonalEquality.forEach(line => line.remove());

        // Reset side colors by finding all SVG lines and resetting their stroke
        const svg = element.querySelector('svg');
        if (svg) {
          // Reset all side line colors to default (remove any custom colors/blinking)
          const sideLines = svg.querySelectorAll('line[data-side-index], line');
          sideLines.forEach(line => {
            line.style.stroke = '';
            line.classList.remove('side-blink');
            // Remove any data attributes that might affect color
            line.removeAttribute('data-custom-color');
          });

          // Remove dynamically added symbols (arrows, ticks, etc.)
          const dynamicElements = svg.querySelectorAll('[data-dynamic="true"], .parallel-arrow, .equality-tick, .angle-equality-tick, .parallel-arrows-container, g[data-symbols]');
          dynamicElements.forEach(el => el.remove());
        }

        // Reset angle markers (remove any equality ticks, reset colors)
        const angleMarkers = element.querySelectorAll('.angle-marker-component');
        angleMarkers.forEach(marker => {
          // Remove equality tick marks
          const equalityTicks = marker.querySelectorAll('.equality-tick-mark, .angle-equality-tick, line.equality-tick');
          equalityTicks.forEach(tick => tick.remove());

          // Reset angle marker colors and blinking
          const arcs = marker.querySelectorAll('path, svg');
          arcs.forEach(arc => {
            arc.style.fill = '';
            arc.style.stroke = '';
            arc.classList.remove('angle-arc-blink');
            // Reset fill opacity
            if (arc.hasAttribute('fill-opacity')) {
              arc.setAttribute('fill-opacity', '');
            }
          });
        });

        // Clear angle measurement labels
        const angleLabels = element.querySelectorAll('.angle-measurement-label, [data-angle-label="true"]');
        angleLabels.forEach(label => label.remove());
      });
    }

    // 4. Reset message boxes (only clear those that are meant to be dynamically updated)
    // Message boxes with initial static text (like page2-messagebox) should be preserved
    if (typeof document !== 'undefined') {
      const messageBoxes = document.querySelectorAll('[id*="-messagebox"]');
      messageBoxes.forEach(box => {
        const boxId = box.id;
        // Only clear message boxes that are meant to be dynamically updated
        // These are message boxes that start with empty text in PageConfig (e.g., page3-messagebox, page4-messagebox, etc.)
        // Preserve message boxes with initial static text (e.g., page2-messagebox)
        if (boxId && (boxId.includes('page3-') || boxId.includes('page4-') || boxId.includes('page5-') || boxId.includes('page6-') || boxId.includes('page7-') || boxId.includes('page8-') || boxId.includes('page9-'))) {
          // These message boxes are meant to be dynamically updated, so clear them
          if (box.textContent) {
            box.textContent = '';
          }
          if (box.innerHTML) {
            box.innerHTML = '';
          }
        }
        // For other message boxes (like page2-messagebox), preserve their content
        // The component will restore the initial text from props on re-render
      });
    }

    // 5. Reset button states (enable/disable)
    if (typeof document !== 'undefined') {
      const nextButtons = document.querySelectorAll('[id*="-next-button"]');
      nextButtons.forEach(button => {
        const container = button.closest('.next-button') || button;
        if (container) {
          container.classList.remove('disabled');
          container.style.opacity = '';
          container.style.pointerEvents = '';
        }
      });

      const tapAnimations = document.querySelectorAll('[id*="-tap-next"]');
      tapAnimations.forEach(tap => {
        if (tap.style) {
          tap.style.display = '';
          tap.style.visibility = '';
        }
      });
    }

    // 6. Clear any animation sequence states
    if (window.QuadAnimationSequenceStates) {
      Object.keys(window.QuadAnimationSequenceStates).forEach(seqId => {
        const state = window.QuadAnimationSequenceStates[seqId];
        if (state) {
          state.currentStep = 0;
          state.isComplete = false;
          state.isRunning = false;
          // Clear any timeouts
          if (state.timeouts) {
            state.timeouts.forEach(timeout => clearTimeout(timeout));
            state.timeouts = [];
          }
        }
      });
    }

    // 7. Reset shape selector state if exists
    if (window.shapeSelectorState) {
      Object.keys(window.shapeSelectorState).forEach(key => {
        const state = window.shapeSelectorState[key];
        if (state) {
          state.selected = false;
          state.highlighted = false;
        }
      });
    }

    // 8. Reset all components with IDs matching the page pattern (e.g., page3-*)
    if (typeof document !== 'undefined') {
      // Find all elements with IDs matching the page pattern
      const pageElements = document.querySelectorAll(`[id^="page${pageNumber}-"]`);
      pageElements.forEach(element => {
        // Remove any dynamically added content
        const dynamicElements = element.querySelectorAll('[data-dynamic="true"], [data-description-index]');
        dynamicElements.forEach(el => el.remove());

        // Reset any inline styles that might have been modified
        if (element.style) {
          // Reset transform, opacity, etc. but keep positioning
          element.style.transform = '';
          element.style.opacity = '';
          element.style.transition = '';
        }
      });
    }

    // 9. Dispatch reset event for components to listen
    window.dispatchEvent(new CustomEvent('pageStateReset', {
      detail: { page: pageNumber }
    }));

    // Also dispatch a global reset event that all components can listen to
    window.dispatchEvent(new CustomEvent('globalPageReset', {
      detail: { page: pageNumber }
    }));

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

    // Initialize page 2 base state variable
    window.page2BaseState = window.page2BaseState || 'default';

    // Getter function for page 2 base state
    window.getPage2BaseState = () => {
      return window.page2BaseState || 'default';
    };

    // Setter function for page 2 base state
    window.setPage2BaseState = (value) => {
      if (['default', 'parts', 'naming'].includes(value)) {
        window.page2BaseState = value;
        console.log(`📊 [Page2] Base state changed to: ${value}`);
        // Dispatch event for components to react to state changes
        window.dispatchEvent(new CustomEvent('page2BaseStateChanged', {
          detail: { state: value }
        }));
      } else {
        console.warn(`⚠️ [Page2] Invalid state value: ${value}. Must be 'default', 'parts', or 'naming'`);
      }
    };

    // Initialize page 2 sub base state variable
    window.page2SubBaseState = window.page2SubBaseState || 'default';

    // Getter function for page 2 sub base state
    window.getPage2SubBaseState = () => {
      return window.page2SubBaseState || 'default';
    };

    // Initialize page 8 animation state variable
    window.page8AnimationState = window.page8AnimationState || 'WIP';

    // Getter function for page 8 animation state
    window.getPage8AnimationState = () => {
      return window.page8AnimationState || 'WIP';
    };

    // Setter function for page 8 animation state
    window.setPage8AnimationState = (value) => {
      if (['WIP', 'Completed'].includes(value)) {
        window.page8AnimationState = value;
        console.log(`📊 [Page8] Animation state changed to: ${value}`);
        // Dispatch event for components to react to state changes
        window.dispatchEvent(new CustomEvent('page8AnimationStateUpdate', {
          detail: { state: value }
        }));
      } else {
        console.warn(`⚠️ [Page8] Invalid animation state value: ${value}. Must be 'WIP' or 'Completed'`);
      }
    };

    // Setter function for page 2 sub base state
    window.setPage2SubBaseState = (value) => {
      if (['default', 'vertex1', 'arms', 'measure', 'capital', 'vertex2', 'greek'].includes(value)) {
        window.page2SubBaseState = value;
        console.log(`📊 [Page2] Sub base state changed to: ${value}`);
        // Dispatch event for components to react to state changes
        window.dispatchEvent(new CustomEvent('page2SubBaseStateChanged', {
          detail: { state: value }
        }));
      } else {
        console.warn(`⚠️ [Page2] Invalid sub base state value: ${value}. Must be 'default', 'vertex1', 'arms', 'measure', 'capital', 'vertex2', or 'greek'`);
      }
    };

    // Expose page state reset function globally
    window.resetPageStates = resetPageStates;

    // Listen for page change events and reset states
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        // Reset page 2 base state when navigating away from page 2
        if (pageNumber !== 2) {
          window.page2BaseState = 'default';
          window.page2SubBaseState = 'default';
        }
        // Reset page 8 animation state when navigating away from page 8
        if (pageNumber !== 8 && window.setPage8AnimationState) {
          window.setPage8AnimationState('WIP');
        }
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

      // Function to handle incorrect answer feedback for pages 2, 3, 4
      window.handleIncorrectAnswerFeedback = (pageNumber) => {
        if (![2, 3, 4].includes(pageNumber)) {
          return;
        }

        console.log(`🎯 [Incorrect Feedback] Handling incorrect answer for page ${pageNumber}`);

        const grid1Id = `page${pageNumber}-geometry-grid-1`;
        const grid2Id = `page${pageNumber}-geometry-grid-2`;

        // Helper function to dispatch addDynamicNotches event
        const addNotchesAndBlink = (gridId, sides, notchCount, color, delay = 0) => {
          setTimeout(() => {
            console.log(`🎯 [Incorrect Feedback] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);

            // Dispatch event to add notches
            const addNotchEvent = new CustomEvent('addDynamicNotches', {
              detail: {
                gridId: gridId,
                notches: sides.map(side => ({
                  side: side,
                  type: 'tick',
                  count: notchCount,
                  color: color,
                  size: '12gc',
                  position: 0.5
                }))
              }
            });
            window.dispatchEvent(addNotchEvent);
          }, delay);
        };

        // Step 1: Add single notch in aqua color (#1ABC9C) on AB and DA for both shapes - make them blink
        addNotchesAndBlink(grid1Id, ['AB', 'DA'], 1, '#1ABC9C', 0);
        addNotchesAndBlink(grid2Id, ['AB', 'DA'], 1, '#1ABC9C', 0);

        // Step 2: Wait 250ms
        // Step 3: Add single notch in orange (#FF9900) on BC and CD to shape 1 (rhombus) - make them blink
        addNotchesAndBlink(grid1Id, ['BC', 'CD'], 1, '#FF9900', 250);

        // Step 4: Wait 100ms more (total 350ms from start)
        // Step 5: Add double notch in orange (#FF9900) on BC and CD to shape 2 (kite) - make them blink
        addNotchesAndBlink(grid2Id, ['BC', 'CD'], 2, '#FF9900', 350);
      };

      // Handler for page 7 to show notches when any option is clicked
      window.handlePage7OptionClick = () => {
        console.log(`🎯 [Page 7] Showing notches on option click`);

        const grid1Id = `page7-geometry-grid-1`; // Kite
        const grid2Id = `page7-geometry-grid-2`; // Rhombus

        // Helper function to dispatch addDynamicNotches event
        const addNotches = (gridId, sides, notchCount, color) => {
          console.log(`🎯 [Page 7] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);

          // Dispatch event to add notches
          const addNotchEvent = new CustomEvent('addDynamicNotches', {
            detail: {
              gridId: gridId,
              notches: sides.map(side => ({
                side: side,
                type: 'tick',
                count: notchCount,
                color: color,
                size: '12gc',
                position: 0.5
              }))
            }
          });
          window.dispatchEvent(addNotchEvent);
        };

        // Shape 1 (Kite): Single notch in aqua on AB and DA, double notch in orange on BC and CD
        addNotches(grid1Id, ['AB', 'DA'], 1, '#1ABC9C');
        addNotches(grid1Id, ['BC', 'CD'], 2, '#FF9900');

        // Shape 2 (Rhombus): Single notch in aqua on AB and DA, single notch in orange on BC and CD
        addNotches(grid2Id, ['AB', 'DA'], 1, '#1ABC9C');
        addNotches(grid2Id, ['BC', 'CD'], 1, '#FF9900');
      };

      // Handler for page 9 to show notches when any option is clicked
      window.handlePage9OptionClick = () => {
        console.log(`🎯 [Page 9] Showing notches on option click`);

        const grid1Id = `page9-geometry-grid-1`; // Rectangle
        const grid2Id = `page9-geometry-grid-2`; // Square

        // Helper function to dispatch addDynamicNotches event
        const addNotches = (gridId, sides, notchCount, color) => {
          console.log(`🎯 [Page 9] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);

          // Dispatch event to add notches
          const addNotchEvent = new CustomEvent('addDynamicNotches', {
            detail: {
              gridId: gridId,
              notches: sides.map(side => ({
                side: side,
                type: 'tick',
                count: notchCount,
                color: color,
                size: '12gc',
                position: 0.5
              }))
            }
          });
          window.dispatchEvent(addNotchEvent);
        };

        // Shape 1 (Rectangle): Single notch in aqua on AB and CD, double notch in orange on BC and DA
        addNotches(grid1Id, ['AB', 'CD'], 1, '#1ABC9C');
        addNotches(grid1Id, ['BC', 'DA'], 2, '#FF9900');

        // Shape 2 (Square): All sides single notch in aqua
        addNotches(grid2Id, ['AB', 'BC', 'CD', 'DA'], 1, '#1ABC9C');
      };

      // Handler for page 10 to show notches when any option is clicked
      window.handlePage10OptionClick = () => {
        console.log(`🎯 [Page 10] Showing notches on option click`);

        const grid1Id = `page10-geometry-grid-1`; // Rectangle
        const grid2Id = `page10-geometry-grid-2`; // Square

        // Helper function to dispatch addDynamicNotches event
        const addNotches = (gridId, sides, notchCount, color) => {
          console.log(`🎯 [Page 10] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);

          // Dispatch event to add notches
          const addNotchEvent = new CustomEvent('addDynamicNotches', {
            detail: {
              gridId: gridId,
              notches: sides.map(side => ({
                side: side,
                type: 'tick',
                count: notchCount,
                color: color,
                size: '12gc',
                position: 0.5
              }))
            }
          });
          window.dispatchEvent(addNotchEvent);
        };

        // Shape 1 (Rectangle): Single notch in aqua on AB and CD, double notch in orange on BC and DA
        addNotches(grid1Id, ['AB', 'CD'], 1, '#1ABC9C');
        addNotches(grid1Id, ['BC', 'DA'], 2, '#FF9900');

        // Shape 2 (Square): All sides single notch in aqua
        addNotches(grid2Id, ['AB', 'BC', 'CD', 'DA'], 1, '#1ABC9C');
      };

      // Handler for page 8 to show notches when any option is clicked
      window.handlePage8OptionClick = () => {
        console.log(`🎯 [Page 8] Showing notches on option click`);

        const grid1Id = `page8-geometry-grid-1`; // Kite
        const grid2Id = `page8-geometry-grid-2`; // Rhombus

        // Helper function to dispatch addDynamicNotches event
        const addNotches = (gridId, sides, notchCount, color) => {
          console.log(`🎯 [Page 8] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);

          // Dispatch event to add notches
          const addNotchEvent = new CustomEvent('addDynamicNotches', {
            detail: {
              gridId: gridId,
              notches: sides.map(side => ({
                side: side,
                type: 'tick',
                count: notchCount,
                color: color,
                size: '12gc',
                position: 0.5
              }))
            }
          });
          window.dispatchEvent(addNotchEvent);
        };

        // Shape 1 (Kite): Single notch in aqua on AB and DA, double notch in orange on BC and CD
        addNotches(grid1Id, ['AB', 'DA'], 1, '#1ABC9C');
        addNotches(grid1Id, ['BC', 'CD'], 2, '#FF9900');

        // Shape 2 (Rhombus): Single notch in aqua on AB and DA, single notch in orange on BC and CD
        addNotches(grid2Id, ['AB', 'DA'], 1, '#1ABC9C');
        addNotches(grid2Id, ['BC', 'CD'], 1, '#FF9900');
      };

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
              // Log as info instead of warning - element might not exist by design
              console.log(`ℹ️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries (this may be expected if element is optional)`);
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
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          // Only attempt update if source element exists (optional feature)
          const sourceElement = document.getElementById('page2-map-table-R1C1');
          if (sourceElement) {
            window.updateTargetIDText('page2-map-table-R1C1', 'page2-number-pad');
          } else {
            // Silently skip if table doesn't exist (this is optional functionality)
            console.log('ℹ️ [PageConfig] Table cell page2-map-table-R1C1 not found, skipping number pad update');
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

// Add event listeners to update instruction text when quiz is completed on pages 2, 3, and 4
if (typeof window !== 'undefined') {
  // Helper function to get i18n text (available globally)
  const getI18nText = (key, fallback) => {
    if (typeof i18n !== 'undefined' && i18n.t) {
      try {
        return i18n.t(key) || fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  // Store instruction text updates in global state
  if (!window.instructionTextUpdates) {
    window.instructionTextUpdates = {};
  }

  window.addEventListener('quizCompleted', (event) => {
    let pageNumber = event.detail?.pageNumber;

    // Fallback: Try to extract page number from quizId if pageNumber is null
    if (!pageNumber && event.detail?.quizId) {
      const quizIdMatch = event.detail.quizId.match(/page(\d+)-quiz/);
      if (quizIdMatch) {
        pageNumber = parseInt(quizIdMatch[1], 10);
        console.log(`🔍 [PageConfig] Extracted page number ${pageNumber} from quizId: ${event.detail.quizId}`);
      }
    }

    // Final fallback: Try to get from window.getCurrentPage
    if (!pageNumber && typeof window.getCurrentPage === 'function') {
      pageNumber = window.getCurrentPage();
      console.log(`🔍 [PageConfig] Got page number ${pageNumber} from window.getCurrentPage()`);
    }

    console.log(`🔍 [PageConfig] quizCompleted event received for page ${pageNumber}`, event.detail);

    if (pageNumber === 2 || pageNumber === 3 || pageNumber === 4 || pageNumber === 5 || pageNumber === 6 || pageNumber === 7 || pageNumber === 8 || pageNumber === 9 || pageNumber === 10) {
      const instructionId = `page${pageNumber}-instruction`;
      console.log(`🔍 [PageConfig] Processing instruction text update for page ${pageNumber}, instructionId: ${instructionId}`);

      // Determine the new text
      let continueText;
      // Pages 2, 3, and 4 get specific message, other pages get generic continue message
      if (pageNumber === 2) {
        continueText = getI18nText("pages.page2.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 3) {
        continueText = getI18nText("pages.page3.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 4) {
        continueText = getI18nText("pages.page4.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 5) {
        continueText = getI18nText("pages.page5.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 6) {
        continueText = getI18nText("pages.page6.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 7) {
        continueText = getI18nText("pages.page7.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else if (pageNumber === 8) {
        continueText = getI18nText("pages.page8.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else if (pageNumber === 9) {
        continueText = getI18nText("pages.page9.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else if (pageNumber === 10) {
        continueText = getI18nText("pages.page10.instructionAfterQuiz", "Tap » to see the transformation.");
      }
      else if (pageNumber === 11) {
        continueText = getI18nText("pages.page11.instructionAfterQuiz", "Tap » to see the transformation.");
      }
      else if (pageNumber === 12) {
        continueText = getI18nText("pages.page12.instructionAfterQuiz", "Tap » to see the transformation.");
      }
      else if (pageNumber === 13) {
        continueText = getI18nText("pages.page13.instructionAfterQuiz", "Tap » to see the transformation.");
      }
      else if (pageNumber === 14) {
        continueText = getI18nText("pages.page14.instructionAfterQuiz", "Tap » to see the transformation.");
      }
      else {
        // All other pages get the generic continue message
        continueText = getI18nText("common.tapToContinue", "Tap » to continue");
      }
      console.log(`🔍 [PageConfig] Page ${pageNumber} will show: "${continueText}"`);

      // Store in global state
      window.instructionTextUpdates[instructionId] = continueText;
      console.log(`🔍 [PageConfig] Stored instruction text in global state for ${instructionId}`);

      // Dispatch custom event for React components to listen to
      const updateEvent = new CustomEvent('instructionTextUpdate', {
        detail: {
          instructionId: instructionId,
          text: continueText
        }
      });
      window.dispatchEvent(updateEvent);
      console.log(`🔍 [PageConfig] Dispatched instructionTextUpdate event for ${instructionId} with text: "${continueText}"`);

      // Also try direct DOM update with retry mechanism
      const updateInstruction = (retryCount = 0) => {
        const instructionElement = document.getElementById(instructionId);

        if (instructionElement) {
          console.log(`🔍 [PageConfig] Found instruction element ${instructionId}, updating text...`);

          // Try multiple methods to update the text
          instructionElement.textContent = continueText;
          instructionElement.innerText = continueText;

          // If it's a React component, try to find the actual DOM node
          const actualNode = instructionElement.querySelector('span') || instructionElement;
          if (actualNode) {
            actualNode.textContent = continueText;
            actualNode.innerText = continueText;
            console.log(`🔍 [PageConfig] Updated actual node text to: "${continueText}"`);
          }

          // Also try to update innerHTML if it contains a span
          if (instructionElement.innerHTML) {
            const spanMatch = instructionElement.innerHTML.match(/<span[^>]*>(.*?)<\/span>/);
            if (spanMatch) {
              instructionElement.innerHTML = instructionElement.innerHTML.replace(
                /<span[^>]*>.*?<\/span>/,
                `<span style="display: inline;">${continueText}</span>`
              );
              console.log(`🔍 [PageConfig] Updated innerHTML to: "${continueText}"`);
            }
          }

          // Force a re-render by triggering a style change
          const currentDisplay = instructionElement.style.display;
          instructionElement.style.display = 'none';
          setTimeout(() => {
            instructionElement.style.display = currentDisplay || '';
          }, 10);

          console.log(`✅ Updated instruction text for page ${pageNumber} to "${continueText}"`);
        } else {
          // Retry up to 10 times with 200ms delay (increased retries)
          if (retryCount < 10) {
            console.log(`🔄 [PageConfig] Instruction element ${instructionId} not found, retrying... (${retryCount + 1}/10)`);
            setTimeout(() => updateInstruction(retryCount + 1), 200);
          } else {
            console.warn(`⚠️ Instruction element ${instructionId} not found after 10 retries`);
          }
        }
      };

      // Start update with a small delay to ensure DOM is ready
      setTimeout(() => updateInstruction(0), 100);
    }
  });

  console.log("✅ Added quiz completion listeners for pages 2, 3, 4, and 10");
}

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

