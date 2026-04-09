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

  // Return optimized GridPositionPages
  return {

    1: [
      // Header - Orange text
      {
        id: "page1-header",
        name: "page1-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page1.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "48gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (15% smaller)
      {
        id: "page1-left-column",
        name: "page1-left-column",
        coordinates: [50, 100, 800, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //left container in text tile
      {
        id: "page1-in-text-tile",
        name: "page1-in-text-tile",
        coordinates: [300, 150, 580, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page1.tile1"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #F79867',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#F79867',
          padding: '10gc',
          textAlign: 'center'
        },
      },
      //left container image
      {
        id: "page1-left-container-image",
        name: "page1-left-container-image",
        type: "custom",
        coordinates: [70, 290, 710, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page1-left-container-image",
          elementName: "page1-left-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/teddyIn.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      {
        id: "page1-versus-text-tile",
        name: "page1-versus-text-tile",
        coordinates: [730, 400, 880, 470], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "1000",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page1.versus"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #A64D79',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "42gc",
          textColor: '#FFFFFF'
        },
      },
      //right container
      {
        id: "page1-right-container",
        name: "page1-right-container",
        coordinates: [810, 100, 1550, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //right container in text tile
      {
        id: "page1-in-text-tile-right",
        name: "page1-in-text-tile-right",
        coordinates: [1040, 150, 1320, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page1.tile2"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #40A494',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#40A494',
          padding: '10gc',
          textAlign: 'center'
        },
      },
      //right container image
      {
        id: "page1-right-container-image",
        name: "page1-right-container-image",
        type: "custom",
        coordinates: [900, 290, 1530, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page1-right-container-image",
          elementName: "page1-right-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/teddyOut.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },


      {
        id: 'page1-instruction-text',
        name: 'page1-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          get text() {
            return window.patternProps.instructionChange ? getI18nText("pages.page1.instructionAfter") : getI18nText(
              'pages.page1.instruction',
              'Tap the shape to fill it in the box.'
            );
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },

      // Navigation buttons (15% smaller again = ~28% total)
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
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
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page1-tap-next",
        name: "page1-tap-next",
        type: "custom",
        coordinates: [1450, 850, 1500, 895], // 15% smaller
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
          initialVisible: true,
        },
      },

      {
        id: "page1-previous-button",
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
            const nav = pageNavigation[1];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
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
          fontSize: "48gc",
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
        coordinates: [50, 100, 800, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //left container in text tile
      {
        id: "page2-in-text-tile",
        name: "page2-in-text-tile",
        coordinates: [300, 150, 580, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.tile1"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #F79867',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#F79867',
          padding: '10gc',
          textAlign: 'center'
        },
      },
      //left container image
      {
        id: "page2-left-container-image",
        name: "page2-left-container-image",
        type: "custom",
        coordinates: [70, 290, 710, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-left-container-image",
          elementName: "page2-left-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/onTable.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      {
        id: "page2-versus-text-tile",
        name: "page2-versus-text-tile",
        coordinates: [730, 400, 880, 470], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "1000",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.versus"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #A64D79',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "42gc",
          textColor: '#FFFFFF'
        },
      },
      //right container
      {
        id: "page2-right-container",
        name: "page2-right-container",
        coordinates: [810, 100, 1550, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //right container in text tile
      {
        id: "page2-in-text-tile-right",
        name: "page2-in-text-tile-right",
        coordinates: [1040, 150, 1320, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.tile2"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #40A494',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#40A494',
          padding: '10gc',
          textAlign: 'center'
        },
      },
      //right container image
      {
        id: "page2-right-container-image",
        name: "page2-right-container-image",
        type: "custom",
        coordinates: [900, 290, 1530, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-right-container-image",
          elementName: "page2-right-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/notOnTable.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
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
          fontSize: '42gc',
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
          initialEnabled: true, // Disabled until quiz is completed
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
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[2];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page2-tap-next",
        name: "page2-tap-next",
        type: "custom",
        coordinates: [1450, 850, 1500, 895], // 15% smaller
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
          initialVisible: true,
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
          text: getI18nText(
            "pages.page3.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "48gc",
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
        coordinates: [50, 100, 800, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //left container in text tile
      {
        id: "page3-in-text-tile",
        name: "page3-in-text-tile",
        coordinates: [300, 150, 580, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.tile1"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #F79867',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#F79867',
          padding: '10gc',
          textAlign: 'center'
        },
      },
      //left container image
      {
        id: "page3-left-container-image",
        name: "page3-left-container-image",
        type: "custom",
        coordinates: [70, 290, 710, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-left-container-image",
          elementName: "page3-left-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/abovePlane.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      {
        id: "page3-versus-text-tile",
        name: "page3-versus-text-tile",
        coordinates: [730, 400, 880, 470], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "1000",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.versus"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #A64D79',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "42gc",
          textColor: '#FFFFFF'
        },
      },
      //right container
      {
        id: "page3-right-container",
        name: "page3-right-container",
        coordinates: [810, 100, 1550, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //right container in text tile
      {
        id: "page3-in-text-tile-right",
        name: "page3-in-text-tile-right",
        coordinates: [1080, 150, 1280, 250], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.tile2"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #40A494',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#40A494'
        },
      },
      //right container image
      {
        id: "page3-right-container-image",
        name: "page3-right-container-image",
        type: "custom",
        coordinates: [900, 290, 1530, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-right-container-image",
          elementName: "page3-right-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/belowSubmrine.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
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
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
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
          initialEnabled: true, // Disabled until quiz is completed
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
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page3-tap-next",
        name: "page3-tap-next",
        type: "custom",
        coordinates: [1450, 850, 1500, 895], // 15% smaller
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
          initialVisible: true,
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
          text: getI18nText(
            "pages.page4.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "48gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (equal 3-way width)
      {
        id: "page4-left-column",
        name: "page4-left-column",
        coordinates: [50, 100, 550, 800],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 153, 0, 0.1)",
          borderWidth: "4gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      //left container in text tile
      {
        id: "page4-in-text-tile",
        name: "page4-in-text-tile",
        coordinates: [200, 150, 400, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.tile1"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #F79867',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#F79867',
          padding: '12gc',
          textAlign: 'center'
        },
      },
      //left container image
      {
        id: "page4-left-container-image",
        name: "page4-left-container-image",
        type: "custom",
        coordinates: [90, 290, 490, 780],
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-left-container-image",
          elementName: "page4-left-container-image",
          currentPage: 2,
          coordinates: [168, 533, 860, 744],
          zIndex: 51,
          images: [
            {
              src: "assets/booksStack.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
          ],
        },
      },
      {
        id: "page4-versus-text-tile",
        name: "page4-versus-text-tile",
        coordinates: [500, 400, 600, 470], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "1000",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.versus"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #A64D79',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "26gc",
          textColor: '#FFFFFF'
        },
      },
      // middle container (new for page4)
      {
        id: "page4-middle-column",
        name: "page4-middle-column",
        coordinates: [560, 100, 1060, 800],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 153, 0, 0.1)",
          borderWidth: "4gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      // middle container text tile (new)
      {
        id: "page4-in-text-tile-middle",
        name: "page4-in-text-tile-middle",
        coordinates: [710, 150, 910, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.tile3"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #007ACC',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#007ACC',
          padding: '12gc',
          textAlign: 'center'
        },
      },
      // middle container image (new)
      {
        id: "page4-middle-container-image",
        name: "page4-middle-container-image",
        type: "custom",
        coordinates: [610, 290, 1010, 780],
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-middle-container-image",
          elementName: "page4-middle-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744],
          zIndex: 51,
          images: [
            {
              src: "assets/booksStack.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
          ],
        },
      },
      // right container
      {
        id: "page4-right-container",
        name: "page4-right-container",
        coordinates: [1070, 100, 1570, 800],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 153, 0, 0.1)",
          borderWidth: "4gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      // right container text tile
      {
        id: "page4-in-text-tile-right",
        name: "page4-in-text-tile-right",
        coordinates: [1215, 150, 1415, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.tile2"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #40A494',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#40A494',
          padding: '12gc',
          textAlign: 'center'
        },
      },
      // right container image
      {
        id: "page4-right-container-image",
        name: "page4-right-container-image",
        type: "custom",
        coordinates: [1130, 290, 1530, 780],
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-right-container-image",
          elementName: "page4-right-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744],
          zIndex: 51,
          images: [
            {
              src: "assets/booksStack.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
          ],
        },
      },
      // left + middle + right versus tile (between 3 containers)
      {
        id: "page4-versus-text-tile-2",
        name: "page4-versus-text-tile-2",
        coordinates: [1020, 400, 1120, 470],
        zIndex: "1000",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.versus"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #A64D79',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "26gc",
          textColor: '#FFFFFF'
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
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
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
          initialEnabled: true, // Disabled until quiz is completed
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
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[4];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page4-tap-next",
        name: "page4-tap-next",
        type: "custom",
        coordinates: [1450, 850, 1500, 895], // 15% smaller
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
          initialVisible: true,
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
          text: getI18nText(
            "pages.page5.headerText",
            "Find the number of vertices in the POLYGON"
          ),
          fontSize: "48gc",
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
        coordinates: [50, 100, 800, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //left container in text tile
      {
        id: "page5-in-text-tile",
        name: "page5-in-text-tile",
        coordinates: [300, 150, 580, 250],
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.tile1"),
          backgroundColor: "rgba(112, 110, 107, 0.1)",
          border: '3px solid #F79867',
          borderRadius: "12gc",
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#F79867',
          padding: '10gc',
          textAlign: 'center'
        },
      },
      //left container image
      {
        id: "page5-left-container-image",
        name: "page5-left-container-image",
        type: "custom",
        coordinates: [70, 290, 710, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-left-container-image",
          elementName: "page5-left-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/airplaneAbove.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      {
        id: "page5-versus-text-tile",
        name: "page5-versus-text-tile",
        coordinates: [730, 400, 880, 470], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "1000",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.versus"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #A64D79',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "42gc",
          textColor: '#FFFFFF'
        },
      },
      //right container
      {
        id: "page5-right-container",
        name: "page5-right-container",
        coordinates: [810, 100, 1550, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      //right container in text tile
      {
        id: "page5-in-text-tile-right",
        name: "page5-in-text-tile-right",
        coordinates: [1080, 150, 1280, 250], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "custom",
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.tile2"), // Empty container
          backgroundColor: "rgba(112, 110, 107, 0.1)", // Transparent orange background
          border: '3px solid #40A494',
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
          fontSize: "50gc",
          textColor: '#40A494'
        },
      },
      //right container image
      {
        id: "page5-right-container-image",
        name: "page5-right-container-image",
        type: "custom",
        coordinates: [900, 290, 1530, 780], // 15% smaller: was [50, 100, 720, 560]
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-right-container-image",
          elementName: "page5-right-container-image",
          currentPage: 2,
          coordinates: [168, 533, 950, 744], // 15% smaller: was [144, 500, 450, 775]
          zIndex: 51,
          images: [
            {
              src: "assets/airplaneGround.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
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
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page
          fontSize: "32gc", // 15% smaller (34 * 0.85)
          get text() {
            return getI18nText("buttons.startOver", "»");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              window.location.reload();
            }
          },
        },
      },

      {
        id: "page5-tap-next",
        name: "page5-tap-next",
        type: "custom",
        coordinates: [1400, 850, 1450, 895], // 15% smaller
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
          initialVisible: true,
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
            const nav = pageNavigation[5];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


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
    // 0. Reset page-2 hint visibility when entering page 2
    if (pageNumber === 2 && window.patternProps) window.patternProps.showHint = false;
    if (pageNumber === 3 && window.patternProps) window.patternProps.showHintPage3 = false;
    if (pageNumber === 4 && window.patternProps) window.patternProps.showHintPage4 = false;
    if (pageNumber === 5 && window.patternProps) window.patternProps.showHintPage5 = false;
    // 1. Reset quadrilateral animation states
    if (window.quadrilateralAnimations) {
      Object.keys(window.quadrilateralAnimations).forEach((quadId) => {
        const animObj = window.quadrilateralAnimations[quadId];
        // Stop all animations - call methods directly on the element if available
        const quadElement = document.getElementById(quadId);
        if (quadElement) {
          if (quadElement.stopParallelLinesAnimation)
            quadElement.stopParallelLinesAnimation();
          if (quadElement.stopOppositeSideAnimation)
            quadElement.stopOppositeSideAnimation();
          if (quadElement.stopAngleEqualityAnimation)
            quadElement.stopAngleEqualityAnimation();
          if (quadElement.stopDiagonalEqualityAnimation)
            quadElement.stopDiagonalEqualityAnimation();
          if (quadElement.stopSymmetryFoldAnimation)
            quadElement.stopSymmetryFoldAnimation();
        }
        // Also try via registry methods
        if (animObj.stopParallelLinesAnimation)
          animObj.stopParallelLinesAnimation();
        if (animObj.stopOppositeSideAnimation)
          animObj.stopOppositeSideAnimation();
        if (animObj.stopAngleEqualityAnimation)
          animObj.stopAngleEqualityAnimation();
        if (animObj.stopDiagonalEqualityAnimation)
          animObj.stopDiagonalEqualityAnimation();
        if (animObj.stopSymmetryFoldAnimation)
          animObj.stopSymmetryFoldAnimation();
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
    if (typeof document !== "undefined") {
      // Find all quadrilateral components
      const quadElements = document.querySelectorAll(
        '[id*="-shape-display"], [id*="-quadrilateral"], [data-quad-type]'
      );
      quadElements.forEach((element) => {
        // Reset CSS transforms (parallel lines animation, etc.)
        const quadWrapper = element.querySelector(".quadrilateral-wrapper");
        if (quadWrapper) {
          quadWrapper.style.transform = "";
          quadWrapper.style.transition = "";
          quadWrapper.style.willChange = "";
          quadWrapper.style.isolation = "";
          quadWrapper.style.transformStyle = "";
        }

        // Reset parallel lines animation rails
        const parallelRails = element.querySelectorAll(".parallel-lines-rails");
        parallelRails.forEach((rail) => rail.remove());

        // Reset any animated arc containers
        const animatedArcs = element.querySelectorAll(
          ".animated-angle-arc-container, .animated-angle-sum-arc-container"
        );
        animatedArcs.forEach((arc) => {
          arc.style.opacity = "";
          arc.style.transform = "";
        });

        // Reset symmetry fold animation
        const symmetryFold = element.querySelectorAll(
          ".symmetry-folding-half-wrapper, .symmetry-fold-line"
        );
        symmetryFold.forEach((fold) => fold.remove());

        // Reset diagonal equality animation
        const diagonalEquality = element.querySelectorAll(
          ".animated-diagonal-equality-line"
        );
        diagonalEquality.forEach((line) => line.remove());

        // Reset side colors by finding all SVG lines and resetting their stroke
        const svg = element.querySelector("svg");
        if (svg) {
          // Reset all side line colors to default (remove any custom colors/blinking)
          const sideLines = svg.querySelectorAll("line[data-side-index], line");
          sideLines.forEach((line) => {
            line.style.stroke = "";
            line.classList.remove("side-blink");
            // Remove any data attributes that might affect color
            line.removeAttribute("data-custom-color");
          });

          // Remove dynamically added symbols (arrows, ticks, etc.)
          const dynamicElements = svg.querySelectorAll(
            '[data-dynamic="true"], .parallel-arrow, .equality-tick, .angle-equality-tick, .parallel-arrows-container, g[data-symbols]'
          );
          dynamicElements.forEach((el) => el.remove());
        }

        // Reset angle markers (remove any equality ticks, reset colors)
        const angleMarkers = element.querySelectorAll(
          ".angle-marker-component"
        );
        angleMarkers.forEach((marker) => {
          // Remove equality tick marks
          const equalityTicks = marker.querySelectorAll(
            ".equality-tick-mark, .angle-equality-tick, line.equality-tick"
          );
          equalityTicks.forEach((tick) => tick.remove());

          // Reset angle marker colors and blinking
          const arcs = marker.querySelectorAll("path, svg");
          arcs.forEach((arc) => {
            arc.style.fill = "";
            arc.style.stroke = "";
            arc.classList.remove("angle-arc-blink");
            // Reset fill opacity
            if (arc.hasAttribute("fill-opacity")) {
              arc.setAttribute("fill-opacity", "");
            }
          });
        });

        // Clear angle measurement labels
        const angleLabels = element.querySelectorAll(
          '.angle-measurement-label, [data-angle-label="true"]'
        );
        angleLabels.forEach((label) => label.remove());
      });
    }

    // 4. Reset message boxes (only clear those that are meant to be dynamically updated)
    // Message boxes with initial static text (like page2-messagebox) should be preserved
    if (typeof document !== "undefined") {
      const messageBoxes = document.querySelectorAll('[id*="-messagebox"]');
      messageBoxes.forEach((box) => {
        const boxId = box.id;
        // Only clear message boxes that are meant to be dynamically updated
        // These are message boxes that start with empty text in PageConfig (e.g., page3-messagebox, page4-messagebox, etc.)
        // Preserve message boxes with initial static text (e.g., page2-messagebox)
        if (
          boxId &&
          (boxId.includes("page3-") ||
            boxId.includes("page4-") ||
            boxId.includes("page5-") ||
            boxId.includes("page6-"))
        ) {
          // These message boxes are meant to be dynamically updated, so clear them
          if (box.textContent) {
            box.textContent = "";
          }
          if (box.innerHTML) {
            box.innerHTML = "";
          }
        }
        // For other message boxes (like page2-messagebox), preserve their content
        // The component will restore the initial text from props on re-render
      });
    }

    // 5. Reset button states (enable/disable)
    if (typeof document !== "undefined") {
      const nextButtons = document.querySelectorAll('[id*="-next-button"]');
      nextButtons.forEach((button) => {
        const container = button.closest(".next-button") || button;
        if (container) {
          container.classList.remove("disabled");
          container.style.opacity = "";
          container.style.pointerEvents = "";
        }
      });

      const tapAnimations = document.querySelectorAll('[id*="-tap-next"]');
      tapAnimations.forEach((tap) => {
        if (tap.style) {
          tap.style.display = "";
          tap.style.visibility = "";
        }
      });
    }

    // 6. Clear any animation sequence states
    if (window.QuadAnimationSequenceStates) {
      Object.keys(window.QuadAnimationSequenceStates).forEach((seqId) => {
        const state = window.QuadAnimationSequenceStates[seqId];
        if (state) {
          state.currentStep = 0;
          state.isComplete = false;
          state.isRunning = false;
          // Clear any timeouts
          if (state.timeouts) {
            state.timeouts.forEach((timeout) => clearTimeout(timeout));
            state.timeouts = [];
          }
        }
      });
    }

    // 7. Reset shape selector state if exists
    if (window.shapeSelectorState) {
      Object.keys(window.shapeSelectorState).forEach((key) => {
        const state = window.shapeSelectorState[key];
        if (state) {
          state.selected = false;
          state.highlighted = false;
        }
      });
    }

    // 8. Reset all components with IDs matching the page pattern (e.g., page3-*)
    if (typeof document !== "undefined") {
      // Find all elements with IDs matching the page pattern
      const pageElements = document.querySelectorAll(
        `[id^="page${pageNumber}-"]`
      );
      pageElements.forEach((element) => {
        // Remove any dynamically added content
        const dynamicElements = element.querySelectorAll(
          '[data-dynamic="true"], [data-description-index]'
        );
        dynamicElements.forEach((el) => el.remove());

        // Reset any inline styles that might have been modified
        if (element.style) {
          // Reset transform, opacity, etc. but keep positioning
          element.style.transform = "";
          element.style.opacity = "";
          element.style.transition = "";
        }
      });
    }

    // 9. Dispatch reset event for components to listen
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
