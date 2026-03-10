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
  16: { prev: 14, next: null },
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
        coordinates: [25, 10, 1575, 100],
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
      //page1 image
      {
        id: "page1-image",
        name: "page1-image",
        coordinates: [50, 150, 800, 600],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/page1Image.png'
        },
      },
      // Main explanatory text: "Let's explore the side, angle, and diagonal properties of a parallelogram."
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [800, 230, 1500, 600],
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
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page2-scale-image-2',
        name: 'page2-scale-image-2',
        type: 'custom',
        coordinates: [25, 200, 1080, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-scale-image-2',
          elementName: 'page2-scale-image-2',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale2Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page2-right-container",
        name: "page2-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page2-student-instruct-text',
        name: 'page2-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page2.instruction"),
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
        id: 'page2-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
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
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page3-scale-image-3',
        name: 'page3-scale-image-3',
        type: 'custom',
        coordinates: [325, 400, 1100, 805], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-scale-image-3',
          elementName: 'page3-scale-image-3',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale3Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page3-right-container",
        name: "page3-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page3-student-instruct-text',
        name: 'page3-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page3.instruction"),
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
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
        id: 'page3-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
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
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page4-scale-image-4',
        name: 'page4-scale-image-4',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page4-scale-image-4',
          elementName: 'page4-scale-image-4',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale4Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page4-right-container",
        name: "page4-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page4-student-instruct-text',
        name: 'page4-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page4.instruction"),
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
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
        id: 'page4-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
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
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page5-scale-image-4',
        name: 'page5-scale-image-4',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page5-scale-image-4',
          elementName: 'page5-scale-image-4',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale4Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page5-right-container",
        name: "page5-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page5-student-instruct-text',
        name: 'page5-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page5.instruction"),
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
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
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
          text: getI18nText(
            "pages.page6.headerText",
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
        id: "page6-left-column",
        name: "page6-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page6-scale-image-5',
        name: 'page6-scale-image-5',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page6-scale-image-5',
          elementName: 'page6-scale-image-5',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale5Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page6-right-container",
        name: "page6-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#297873", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page6-student-instruct-text',
        name: 'page6-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page6.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page6-instruction-text',
        name: 'page6-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page6.instruction"),
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
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[6];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page6-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
      },

      {
        id: "page6-previous-button",
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
          text: getI18nText(
            "pages.page7.headerText",
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
        id: "page7-left-column",
        name: "page7-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page7-scale-image-6',
        name: 'page7-scale-image-6',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page7-scale-image-6',
          elementName: 'page7-scale-image-6',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale6Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page7-right-container",
        name: "page7-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#297873", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page7-student-instruct-text',
        name: 'page7-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page7.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page7-instruction-text',
        name: 'page7-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page7.instruction"),
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
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[7];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
      },

      {
        id: "page7-previous-button",
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
            const nav = pageNavigation[7];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    8: [
      // Header - Orange text
      {
        id: "page8-header",
        name: "page8-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page8.headerText",
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
        id: "page8-left-column",
        name: "page8-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page8-scale-image-7',
        name: 'page8-scale-image-7',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page8-scale-image-7',
          elementName: 'page8-scale-image-7',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale7Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page8-right-container",
        name: "page8-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#33678E", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page8-student-instruct-text',
        name: 'page8-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page8.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page8-instruction-text',
        name: 'page8-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page8.instruction"),
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
        id: "page8-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[8];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page8-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
      },

      {
        id: "page8-previous-button",
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
            const nav = pageNavigation[8];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    9: [
      // Header - Orange text
      {
        id: "page9-header",
        name: "page9-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page9.headerText",
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
        id: "page9-left-column",
        name: "page9-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page9-scale-image-8',
        name: 'page9-scale-image-8',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page9-scale-image-8',
          elementName: 'page9-scale-image-8',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale8Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page9-right-container",
        name: "page9-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#33678E", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page9-student-instruct-text',
        name: 'page9-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page9.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page9-instruction-text',
        name: 'page9-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page9.instruction"),
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
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[9];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page9-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
      },

      {
        id: "page9-previous-button",
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
            const nav = pageNavigation[8];
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
          text: getI18nText(
            "pages.page10.headerText",
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
        id: "page10-left-column",
        name: "page10-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page10-scale-image-9',
        name: 'page10-scale-image-9',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page10-scale-image-9',
          elementName: 'page10-scale-image-9',
          currentPage: 10,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale9Image.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },
            {
              src: 'assets/scale7Image.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [155, 130, 1100, 800]  // Image 3 
            },

          ],
          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        }
      },
      // //right container
      // {
      //   id: "page10-right-container",
      //   name: "page10-right-container",
      //   coordinates: [1105, 300, 1595,500], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
      //   zIndex: "var(--z-base)",
      //   type: "textbox",
      //   props: {
      //     text: "", // Empty container
      //     backgroundColor: "#33678E", // Transparent orange background
      //     borderWidth: "6gc", // Orange solid border, 4gc
      //     borderStyle: "dashed",
      //     borderColor: "#FFFFFF", // Orange color
      //     borderRadius: "32gc", // 12gc border radius
      //     boxSizing: "border-box",
      //   },
      // },

      // //student instruct text right container
      // {
      //   id: 'page10-student-instruct-text',
      //   name: 'page10-student-instruct-text',
      //   type: 'custom',
      //   coordinates: [1115, 300, 1585, 500], // Footer bar at bottom (same as page 7)
      //   zIndex: 55,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: getI18nText("pages.page10.studentInstructText"),
      //     // backgroundColor: 'rgba(66, 73, 88, 0.9)',
      //     borderRadius: '0gc',
      //     textColor: '#ffffff',
      //     fontSize: '44gc',
      //     padding: '15gc',
      //     fontWeight: 'normal',
      //     allowHTML: true,
      //     textAlign: 'center',
      //     pageNumber: 2, // Pass page number for event filtering
      //   }
      // },
      //quiz panel
      {
        id: 'page10-quiz-panel',
        name: 'page10-quiz-panel',
        type: 'custom',
        coordinates: [1105, 85, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page10-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT3R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "#0A0A1A",
          questionText: getI18nText("pages.page10.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 20, // Question row: 15%
          optionsRowHeight: 50, // Options row: 70%
          feedbackRowHeight: 30, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page10.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
        }
      },
      {
        id: 'page10-instruction-text',
        name: 'page10-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page10.instruction"),
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
        id: "page10-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 10 },

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
            const nav = pageNavigation[10];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page10-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false,
        }
      },

      {
        id: "page10-previous-button",
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
          text: getI18nText(
            "pages.page11.headerText",
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
        id: "page11-left-column",
        name: "page11-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page11-scale-image-9',
        name: 'page11-scale-image-9',
        type: 'custom',
        coordinates: [100, 600, 1000, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page11-scale-image-9',
          elementName: 'page11-scale-image-9',
          currentPage: 10,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },


          ],
          hideImageOnQuizComplete: false,    // Hide first image
          showImageOnQuizComplete: []
        }
      },
      //find length text
      {
        id: 'page11-find-length-text',
        name: 'page11-find-length-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 150], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page11.findLengthext"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '47gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      //button 1
      {
        id: "page11-button-1",
        name: "page11-button-1",
        type: "button",
        coordinates: [1115, 180, 1580, 380],
        zIndex: "var(--z-button)",
        props: {


          fontSize: "38gc", // 15% smaller (34 * 0.85)
          backgroundColor: '#ED9B29',
          borderRadius: '23gc',
          border: "none",
          cursor: 'pointer',
          padding: '8gc',
          get text() {
            return getI18nText("pages.page11.button1", "");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

          },
        },
      },
      //button 2
      {
        id: "page11-button-2",
        name: "page11-button-2",
        type: "button",
        coordinates: [1115, 420, 1580, 620],
        zIndex: "var(--z-button)",
        props: {


          fontSize: "38gc", // 15% smaller (34 * 0.85)
          backgroundColor: '#ED9B29',
          borderRadius: '23gc',
          border: "none",
          cursor: 'pointer',
          padding: '8gc',
          disabled: true,
          get text() {
            return getI18nText("pages.page11.button2", "");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

          },
        },
      },
      {
        id: 'page11-instruction-text',
        name: 'page11-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page11.instruction"),
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
        id: "page11-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 10 },

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
            const nav = pageNavigation[11];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page11-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false,
        }
      },

      {
        id: "page11-previous-button",
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
          text: getI18nText(
            "pages.page12.headerText",
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
        id: "page12-left-column",
        name: "page12-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page12-scale-image-8',
        name: 'page12-scale-image-8',
        type: 'custom',
        coordinates: [105, 100, 1000, 750], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page12-scale-image-8',
          elementName: 'page12-scale-image-8',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/graph.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page12-right-container",
        name: "page12-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page12-student-instruct-text',
        name: 'page12-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page12.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page12-instruction-text',
        name: 'page12-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page12.instruction"),
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
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 12 },
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
            const nav = pageNavigation[12];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page12-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false,
        }
      },

      {
        id: "page12-previous-button",
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
          text: getI18nText(
            "pages.page13.headerText",
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
        id: "page13-left-column",
        name: "page13-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page13-scale-image-9',
        name: 'page13-scale-image-9',
        type: 'custom',
        coordinates: [100, 600, 1000, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page13-scale-image-9',
          elementName: 'page13-scale-image-9',
          currentPage: 10,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },


          ],
          hideImageOnQuizComplete: false,    // Hide first image
          showImageOnQuizComplete: []
        }
      },
      
      //button 1
      {
        id: "page13-button-1",
        name: "page13-button-1",
        type: "button",
        coordinates: [1115, 100, 1580, 300],
        zIndex: "var(--z-button)",
        props: {


          fontSize: "38gc", // 15% smaller (34 * 0.85)
          backgroundColor: '#ED9B29',
          borderRadius: '23gc',
          border: "none",
          cursor: 'pointer',
          padding: '8gc',
          get text() {
            return getI18nText("pages.page13.button1", "");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

          },
        },
      },
      //button 2
      {
        id: "page13-button-2",
        name: "page13-button-2",
        type: "button",
        coordinates: [1115, 320, 1580, 520],
        zIndex: "var(--z-button)",
        props: {


          fontSize: "38gc", // 15% smaller (34 * 0.85)
          backgroundColor: '#ED9B29',
          borderRadius: '23gc',
          border: "none",
          cursor: 'pointer',
          padding: '8gc',
          disabled: true,
          get text() {
            return getI18nText("pages.page13.button2", "");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

          },
        },
      },
      //button 3
      {
        id: "page13-button-3",
        name: "page13-button-3",
        type: "button",
        coordinates: [1115,540 , 1580, 740],
        zIndex: "var(--z-button)",
        props: {


          fontSize: "38gc", // 15% smaller (34 * 0.85)
          backgroundColor: '#ED9B29',
          borderRadius: '23gc',
          border: "none",
          cursor: 'pointer',
          padding: '8gc',
          disabled: true,
          get text() {
            return getI18nText("pages.page13.button3", "");
          },

          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

          },
        },
      },
      {
        
        id: 'page13-instruction-text',
        name: 'page13-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page13.instruction"),
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
        id: "page13-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 10 },

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
            const nav = pageNavigation[13];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page13-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false,
        }
      },

      {
        id: "page13-previous-button",
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
          text: getI18nText(
            "pages.page14.headerText",
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
        id: "page14-left-column",
        name: "page14-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page14-scale-image-8',
        name: 'page14-scale-image-8',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page14-scale-image-8',
          elementName: 'page14-scale-image-8',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page14-right-container",
        name: "page14-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page14-student-instruct-text',
        name: 'page14-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page14.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page14-instruction-text',
        name: 'page14-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page14.instruction"),
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
        id: "page14-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[14];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page14-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
      },

      {
        id: "page14-previous-button",
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
            const nav = pageNavigation[14];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    15: [
      // Header - Orange text
      {
        id: "page15-header",
        name: "page15-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page15.headerText",
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
        id: "page15-left-column",
        name: "page15-left-column",
        coordinates: [5, 85, 1100, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(255, 153, 0, 0.1)", // Transparent orange background
          borderWidth: "0gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //scale image
      {
        id: 'page15-scale-image-8',
        name: 'page15-scale-image-8',
        type: 'custom',
        coordinates: [155, 130, 1100, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page15-scale-image-8',
          elementName: 'page15-scale-image-8',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/scale.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            },

          ]
        }
      },
      //right container
      {
        id: "page15-right-container",
        name: "page15-right-container",
        coordinates: [1105, 85, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "#3a4e61aa", // Transparent orange background
          borderWidth: "6gc", // Orange solid border, 4gc
          borderStyle: "dashed",
          borderColor: "#FFFFFF", // Orange color
          borderRadius: "32gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      //student instruct text right container
      {
        id: 'page15-student-instruct-text',
        name: 'page15-student-instruct-text',
        type: 'custom',
        coordinates: [1115, 100, 1585, 780], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page15.studentInstructText"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          allowHTML: true,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },
      {
        id: 'page15-instruction-text',
        name: 'page15-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page15.instruction"),
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
        id: "page15-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
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
            const nav = pageNavigation[15];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      //tap gif
      {
        id: 'page15-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
      },

      {
        id: "page15-previous-button",
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
            const nav = pageNavigation[15];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    16: [
      // Title: "Properties of a Parallelogram" in bright orange, centered at top
      {
        id: "page16-title",
        name: "page16-title",
        coordinates: [25, 10, 1575, 100],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page16.title",
            "Properties of a Parallelogram"
          ),
          fontSize: "60gc",
          color: "#FF9900", // Bright orange
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      //page16 image
      {
        id: "page16-image",
        name: "page16-image",
        coordinates: [20, 140, 800, 700],
        zIndex: "var(--z-elevated)",
        type: "container",
        props: {
          imageSrc: 'assets/page1Image.png'
        },
      },
      // Main explanatory text: "Let's explore the side, angle, and diagonal properties of a parallelogram."
      {
        id: "page16-main-text",
        name: "page16-main-text",
        coordinates: [800, 160, 1590, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText(
            "pages.page16.mainText",
            "Let's explore the side, angle, and diagonal properties of a parallelogram."
          ),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1",
          whiteSpace: "pre-line",
          allowHTML: true,
        },
      },

      // Instruction text: "Tap "Start" to start the activity."


      {
        id: 'page16-instruction-text',
        name: 'page16-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom (same as page 7)
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page16.activityCompleted"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '44gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center',
          pageNumber: 2, // Pass page number for event filtering
        }
      },

      // Navigation buttons (15% smaller again = ~28% total)
      {
        id: "page16-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1300, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          fontSize: "50gc", // 15% smaller (34 * 0.85)
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
           window.location.reload()
          },
        },
      },

      //tap gif
      {
        id: 'page16-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1300, 840, 1350, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: true,
        }
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
