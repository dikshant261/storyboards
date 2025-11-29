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
        coordinates: [40, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page1.title"),
          fontSize: "50gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      {
        id: "page1-image-container",
        name: "page1-image-container",
        type: "textbox",
        coordinates: [100, 150, 700, 750], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: "",
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "center",
          backgroundColor: "var(--color-white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5gc",
          borderRadius: "13gc",
          borderStyle: "solid",
          borderColor: '--color-orange',
          borderWidth: '8gc'
          // image: "assets/indonesianmap.png",
        },
      },
      //  Image of  squirrel
      {
        id: "page1-squirrel-image",
        name: "page1-sqeural-image",
        type: "container",
        coordinates: [240, 180, 650, 650],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow",
        },
      },
      //  Image of vertical  double head arrow
      {
        id: "page1-arrow-image",
        name: "page1-arrow-image",
        type: "container",
        coordinates: [120, 170, 300, 660],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/vertical_double_arrow.png",
          imageAlt: "Right Arrow",
        },
      },
      //  Image of horizontal double head arrow
      {
        id: "page1-arrow-image-horizontal",
        name: "page1-arrow-image-horizontal",
        type: "container",
        coordinates: [250, 650, 645, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/horizontal_double_arrow.png",
          imageAlt: "Right Arrow",
        },
      },
      // Feedback Textbox Component
      {
        id: "page1-feedback-textbox",
        name: "page1-feedback-textbox-unique",
        type: "custom",
        coordinates: [740, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page1.startText"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "40gc",
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
      //length text
      {
        id: "page1-length-text",
        name: "page1-length-text",
        type: "textbox",
        coordinates: [230, 650, 260, 680], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("common.labels.length"),
          fontSize: "30gc",
          color: "black",
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
        coordinates: [1000, 620, 1300, 720],
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
        coordinates: [1000, 650, 1100, 750], // Position in top-right area
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
      // Question Introduction Text Box Component
      {
        id: "page2-question-intro",
        name: "page2-question-intro",
        type: "textbox",
        coordinates: [40, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page2.title"),
          fontSize: "50gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      //image container Fram A
      {
        id: "page2-squirrel-Container-one",
        name: "page2-map-tableContainer",
        type: "textbox",
        coordinates: [5, 100, 380, 815], // Position below roller coaster image
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
      //frame Text text
      {
        id: "page2-frameA-text",
        name: "page2-frameA-text",
        type: "textbox",
        coordinates: [100, 100, 260, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameA"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page2-squirrel-image-one",
        name: "page2-sqeural-image-one",
        type: "container",
        coordinates: [80, 230, 280, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow",
        },
      },
      //image contaner frame B
      {
        id: "page2-squirrel-Container-two",
        name: "page2-squirrel-Container-two",
        type: "textbox",
        coordinates: [385, 100, 760, 815], // Position below roller coaster image
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
      //frame B Text text
      {
        id: "page2-frameB-text",
        name: "page2-frameB-text",
        type: "textbox",
        coordinates: [420, 100, 740, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameB"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page2-squirrel-image-two",
        name: "page2-sqeural-image-two",
        type: "container",
        coordinates: [320, 230, 820, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow"
        },
      },
      //image contaner frame C
      {
        id: "page2-squirrel-Container-three",
        name: "page2-squirrel-Container-three",
        type: "textbox",
        coordinates: [765, 100, 1140, 815], // Position below roller coaster image
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
      //frame B Text text
      {
        id: "page2-frameC-text",
        name: "page2-frameC-text",
        type: "textbox",
        coordinates: [800, 100, 1120, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameC"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page2-squirrel-image-three",
        name: "page2-sqeural-image-three",
        type: "container",
        coordinates: [800, 170, 1100, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow"
        },
      },
      //image contaner frame C
      {
        id: "page2-keypad-container",
        name: "page2-keypad-container",
        type: "textbox",
        coordinates: [1145, 100, 1595, 815], // Position below roller coaster image
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
      //side heading text
      {
        id: "page2-sideHeading-text",
        name: "page2-sideHeading-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page2.rightSideHeading"),
          fontSize: "40gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
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
          text: getI18nText("pages.page2.instructionText.tapStart"),
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
        coordinates: [40, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page3.title"),
          fontSize: "50gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      //image container Fram A
      {
        id: "page3-squirrel-Container-one",
        name: "page3-map-tableContainer",
        type: "textbox",
        coordinates: [5, 100, 380, 815], // Position below roller coaster image
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
      //frame Text text
      {
        id: "page3-frameA-text",
        name: "page3-frameA-text",
        type: "textbox",
        coordinates: [100, 100, 260, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameA"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page3-squirrel-image-one",
        name: "page3-sqeural-image",
        type: "container",
        coordinates: [80, 230, 280, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow",
        },
      },
      //image contaner frame B
      {
        id: "page3-squirrel-Container-two",
        name: "page3-squirrel-Container-two",
        type: "textbox",
        coordinates: [385, 100, 760, 815], // Position below roller coaster image
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
      //frame B Text text
      {
        id: "page3-frameB-text",
        name: "page3-frameB-text",
        type: "textbox",
        coordinates: [420, 100, 740, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameB"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page3-squirrel-image-two",
        name: "page3-sqeural-image",
        type: "container",
        coordinates: [320, 230, 820, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow"
        },
      },
      //image contaner frame C
      {
        id: "page3-squirrel-Container-three",
        name: "page3-squirrel-Container-three",
        type: "textbox",
        coordinates: [765, 100, 1140, 815], // Position below roller coaster image
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
      //frame B Text text
      {
        id: "page3-frameC-text",
        name: "page3-frameC-text",
        type: "textbox",
        coordinates: [800, 100, 1120, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameC"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page3-squirrel-image-three",
        name: "page3-sqeural-image",
        type: "container",
        coordinates: [800, 170, 1100, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow"
        },
      },
      //image contaner frame C
      {
        id: "page3-keypad-container",
        name: "page3-keypad-container",
        type: "textbox",
        coordinates: [1145, 100, 1595, 815], // Position below roller coaster image
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
      {
        id: "page3-number-pad",
        name: "page3-number-pad",
        type: "custom",
        coordinates: [1150, 120, 1590, 815],
        zIndex: 50,
        props: {
          componentType: "NumberPadPanelComponent",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "4px solid #FFAB40",
          padding: "15gc",
          layout: "vertical",
          buttonConfig: 1,
          inputMode: "append",
          feedbackMode: "feedback",
          destinations: [
            {
              destinationId: "answer-cell-1",
              correctValue: 10,
              correctFeedback: "Correct!",
              incorrectFeedback: "Try again."
            }
          ],
          destinationIndex: 0
        }
      },
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
          text: getI18nText("pages.page3.instructionText.enterEachRatio"),
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
        coordinates: [40, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page4.title"),
          fontSize: "50gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-orange)",
        },
      },
      //image container Fram A
      {
        id: "page4-squirrel-Container-one",
        name: "page4-map-tableContainer",
        type: "textbox",
        coordinates: [5, 100, 380, 815], // Position below roller coaster image
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
      //frame Text text
      {
        id: "page4-frameA-text",
        name: "page4-frameA-text",
        type: "textbox",
        coordinates: [100, 100, 260, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameA"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page4-squirrel-image-one",
        name: "page4-sqeural-image",
        type: "container",
        coordinates: [80, 230, 280, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow",
        },
      },
      //image contaner frame B
      {
        id: "page4-squirrel-Container-two",
        name: "page4-squirrel-Container-two",
        type: "textbox",
        coordinates: [385, 100, 760, 815], // Position below roller coaster image
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
      //frame B Text text
      {
        id: "page4-frameB-text",
        name: "page4-frameB-text",
        type: "textbox",
        coordinates: [420, 100, 740, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameB"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page4-squirrel-image-two",
        name: "page4-sqeural-image",
        type: "container",
        coordinates: [320, 230, 820, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow"
        },
      },
      //image contaner frame C
      {
        id: "page4-squirrel-Container-three",
        name: "page4-squirrel-Container-three",
        type: "textbox",
        coordinates: [765, 100, 1140, 815], // Position below roller coaster image
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
      //frame B Text text
      {
        id: "page4-frameC-text",
        name: "page4-frameC-text",
        type: "textbox",
        coordinates: [800, 100, 1120, 160], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.frameC"),
          fontSize: "36gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
      //  Image of  squirrel
      {
        id: "page4-squirrel-image-three",
        name: "page4-sqeural-image",
        type: "container",
        coordinates: [800, 170, 1100, 450],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/squeral.png",
          imageAlt: "Right Arrow"
        },
      },
      //image contaner frame C
      {
        id: "page4-keypad-container",
        name: "page4-keypad-container",
        type: "textbox",
        coordinates: [1145, 100, 1595, 815], // Position below roller coaster image
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
      //side heading text
      {
        id: "page4-sideHeading-text",
        name: "page4-sideHeading-text",
        type: "textbox",
        coordinates: [1150, questionBottomY + 5, 1595, 815], // Position below roller coaster image
        zIndex: 54,
        props: {
          text: getI18nText("pages.page4.rightSideHeading"),
          fontSize: "40gc",
          color: "var(--color-white)",
          textAlign: "center",
          backgroundColor: "rgb(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10gc",
          borderRadius: "13gc",
        },
      },
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
          text: getI18nText("pages.page4.instructionText.tapFrames"),
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
        coordinates: [80, 0, 1600, questionBottomY - 50], // Top section for intro
        zIndex: 50,
        props: {
          text: getI18nText("pages.page5.title"),
          fontSize: "55gc",
          color: "var(--color-orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: 'center'
        },
      },

      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page5.endContent"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "45gc",
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
        id: "page5-startOver-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 620, 1050, 720],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver", "»");
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
        coordinates: [950, 650, 1100, 750], // Position in top-right area
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
