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
        type: "custom",
        coordinates: [0, 0, 1600, questionBottomY], // Top section for intro
        zIndex: 50,
        props: {
          componentType: "QuestionComponent",
          text: getI18nText(
            "common.questionText",
            "Dad asked Dona to make coffee for his friends. Usually, to make 1 small cup measuring 250 ml, Mom uses 1 tsp of coffee and 2 tsp of sugar. Dona wants to make coffee in a teapot that holds 1 liter of water using 4 tsp of coffee and 10 tsp of sugar. When compared to the coffee made by Mom, estimate the taste of the coffee made by Dona. Is it too bitter, too sweet, or just right?"
          ),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page1.highlights", []),
        },
      },

      {
        id: "page1-introduction-text",
        name: "page1-introduction-text",
        type: "textbox",
        coordinates: [400, 400, 1200, 600], // Position below roller coaster image
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

      // "Mom" Text Box
      {
        id: "page2-mom-text",
        name: "mom-text",
        type: "textbox",
        coordinates: [300, 200, 500, 280],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Cup Image
      {
        id: "page2-cup-image",
        name: "page2-cup-image",
        type: "container",
        coordinates: [325, 380, 525, 530],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/cup.png",
          imageAlt: "Cup",
        },
      },

      // Container with white border solid
      {
        id: "page2-container",
        name: "container",
        type: "container",
        coordinates: [250, 510, 550, 520],
        zIndex: 55,
        props: {
          backgroundColor: "#ffffff",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "0gc",
          padding: "0gc",
        },
      },

      // "250 ml" Text Box
      {
        id: "page2-250ml-text",
        name: "250ml-text",
        type: "textbox",
        coordinates: [265, 525, 550, 550],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.quantity250ml", "250 ml"),
          fontSize: "32gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Coffee Spoon Image
      {
        id: "page2-spoon-coffee-image",
        name: "page2-spoon-coffee-image",
        type: "container",
        coordinates: [200, 600, 400, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonCoffee.png",
          imageAlt: "Coffee Spoon",
        },
      },

      // Sugar Spoon Image
      {
        id: "page2-spoon-sugar-image",
        name: "page2-spoon-sugar-image",
        type: "container",
        coordinates: [400, 600, 600, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonSugar.png",
          imageAlt: "Sugar Spoon",
        },
      },

      // Circular Container 1 with text "1"
      {
        id: "page2-circle-1",
        name: "page2-circle-1",
        type: "container",
        coordinates: [300, 650, 375, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "#793F1F",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number1", "1"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // Circular Container 2 with text "2"
      {
        id: "page2-circle-2",
        name: "page2-circle-2",
        type: "container",
        coordinates: [500, 650, 575, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number2", "2"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
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
          valueArray: getI18nText("pages.page2.informationAnalysis.values", []),
          toFindArray: getI18nText(
            "pages.page2.informationAnalysis.toFind",
            []
          ),
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

      // "Mom" Text Box
      {
        id: "page3-mom-text",
        name: "mom-text",
        type: "textbox",
        coordinates: [300, 200, 500, 280],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Cup Image
      {
        id: "page3-cup-image",
        name: "page3-cup-image",
        type: "container",
        coordinates: [325, 380, 525, 530],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/cup.png",
          imageAlt: "Cup",
        },
      },

      // Container with white border solid
      {
        id: "page3-mom-container",
        name: "container",
        type: "container",
        coordinates: [250, 510, 1000, 520],
        zIndex: 55,
        props: {
          backgroundColor: "#ffffff",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "0gc",
          padding: "0gc",
        },
      },

      // "250 ml" Text Box
      {
        id: "page3-mom-250ml-text",
        name: "250ml-text",
        type: "textbox",
        coordinates: [265, 525, 550, 550],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.quantity250ml", "250 ml"),
          fontSize: "32gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Coffee Spoon Image
      {
        id: "page3-mom-spoon-coffee-image",
        name: "page3-mom-spoon-coffee-image",
        type: "container",
        coordinates: [200, 600, 400, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonCoffee.png",
          imageAlt: "Coffee Spoon",
        },
      },

      // Sugar Spoon Image
      {
        id: "page3-mom-spoon-sugar-image",
        name: "page3-mom-spoon-sugar-image",
        type: "container",
        coordinates: [400, 600, 600, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonSugar.png",
          imageAlt: "Sugar Spoon",
        },
      },

      // Circular Container 1 with text "1"
      {
        id: "page3-mom-circle-1",
        name: "page3-mom-circle-1",
        type: "container",
        coordinates: [300, 650, 375, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "#793F1F",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number1", "1"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // Circular Container 2 with text "2"
      {
        id: "page3-mom-circle-2",
        name: "page3-mom-circle-2",
        type: "container",
        coordinates: [500, 650, 575, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number2", "2"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // "Dona" Text Box
      {
        id: "page3-dona-text",
        name: "dona-text",
        type: "textbox",
        coordinates: [750, 200, 975, 280],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.dona", "Dona"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Cup Image
      {
        id: "page3-dona-teaPot-image",
        name: "page3-dona-teaPot-image",
        type: "container",
        coordinates: [675, 250, 1025, 550],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/teaPot.png",
          imageAlt: "Cup",
        },
      },

      // "250 ml" Text Box
      {
        id: "page3-dona-1l-text",
        name: "1L-text",
        type: "textbox",
        coordinates: [715, 525, 1000, 550],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.quantity1liter", "1 liter"),
          fontSize: "32gc",
          color: "#25CEFC",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Coffee Spoon Image
      {
        id: "page3-dona-spoon-coffee-image",
        name: "page3-dona-spoon-coffee-image",
        type: "container",
        coordinates: [650, 600, 850, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonCoffee.png",
          imageAlt: "Coffee Spoon",
        },
      },

      // Sugar Spoon Image
      {
        id: "page3-dona-spoon-sugar-image",
        name: "page3-dona-spoon-sugar-image",
        type: "container",
        coordinates: [850, 600, 1050, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonSugar.png",
          imageAlt: "Sugar Spoon",
        },
      },

      // Circular Container 1 with text "1"
      {
        id: "page3-dona-circle-1",
        name: "page3-dona-circle-1",
        type: "container",
        coordinates: [750, 650, 825, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "#793F1F",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number4", "4"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // Circular Container 2 with text "2"
      {
        id: "page3-dona-circle-2",
        name: "page3-dona-circle-2",
        type: "container",
        coordinates: [950, 650, 1025, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number10", "10"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
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
          valueArray: getI18nText("pages.page3.informationAnalysis.values", []),
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

      // "Mom" Text Box
      {
        id: "page4-mom-text",
        name: "mom-text",
        type: "textbox",
        coordinates: [300, 200, 500, 280],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Cup Image
      {
        id: "page4-cup-image",
        name: "page4-cup-image",
        type: "container",
        coordinates: [325, 380, 525, 530],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/cup.png",
          imageAlt: "Cup",
        },
      },

      // Container with white border solid
      {
        id: "page4-mom-container",
        name: "container",
        type: "container",
        coordinates: [250, 510, 1000, 520],
        zIndex: 55,
        props: {
          backgroundColor: "#ffffff",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "0gc",
          padding: "0gc",
        },
      },

      // "250 ml" Text Box
      {
        id: "page4-mom-250ml-text",
        name: "250ml-text",
        type: "textbox",
        coordinates: [265, 525, 550, 550],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.quantity250ml", "250 ml"),
          fontSize: "32gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Coffee Spoon Image
      {
        id: "page4-mom-spoon-coffee-image",
        name: "page4-mom-spoon-coffee-image",
        type: "container",
        coordinates: [200, 600, 400, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonCoffee.png",
          imageAlt: "Coffee Spoon",
        },
      },

      // Sugar Spoon Image
      {
        id: "page4-mom-spoon-sugar-image",
        name: "page4-mom-spoon-sugar-image",
        type: "container",
        coordinates: [400, 600, 600, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonSugar.png",
          imageAlt: "Sugar Spoon",
        },
      },

      // Circular Container 1 with text "1"
      {
        id: "page4-mom-circle-1",
        name: "page4-mom-circle-1",
        type: "container",
        coordinates: [300, 650, 375, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "#793F1F",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number1", "1"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // Circular Container 2 with text "2"
      {
        id: "page4-mom-circle-2",
        name: "page4-mom-circle-2",
        type: "container",
        coordinates: [500, 650, 575, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number2", "2"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // "Dona" Text Box
      {
        id: "page4-dona-text",
        name: "dona-text",
        type: "textbox",
        coordinates: [750, 200, 975, 280],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.dona", "Dona"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Cup Image
      {
        id: "page4-dona-teaPot-image",
        name: "page4-dona-teaPot-image",
        type: "container",
        coordinates: [675, 250, 1025, 550],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/teaPot.png",
          imageAlt: "Cup",
        },
      },

      // "250 ml" Text Box
      {
        id: "page4-dona-1l-text",
        name: "1L-text",
        type: "textbox",
        coordinates: [715, 525, 1000, 550],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.quantity1liter", "1 liter"),
          fontSize: "32gc",
          color: "#25CEFC",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
        },
      },

      // Coffee Spoon Image
      {
        id: "page4-dona-spoon-coffee-image",
        name: "page4-dona-spoon-coffee-image",
        type: "container",
        coordinates: [650, 600, 850, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonCoffee.png",
          imageAlt: "Coffee Spoon",
        },
      },

      // Sugar Spoon Image
      {
        id: "page4-dona-spoon-sugar-image",
        name: "page4-dona-spoon-sugar-image",
        type: "container",
        coordinates: [850, 600, 1050, 700],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/spoonSugar.png",
          imageAlt: "Sugar Spoon",
        },
      },

      // Circular Container 1 with text "1"
      {
        id: "page4-dona-circle-1",
        name: "page4-dona-circle-1",
        type: "container",
        coordinates: [750, 650, 825, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "#793F1F",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number4", "4"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
        },
      },

      // Circular Container 2 with text "2"
      {
        id: "page4-dona-circle-2",
        name: "page4-dona-circle-2",
        type: "container",
        coordinates: [950, 650, 1025, 725], // Perfect circle: 100x100
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "50%", // Perfect circle
          padding: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          text: getI18nText("common.labels.number10", "10"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1",
          verticalAlign: "middle",
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
          valueArray: getI18nText("pages.page4.informationAnalysis.values", []),
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

      // Question Table Component 1 (Mom)
      {
        id: "page5-question-table-1",
        name: "page5-question-table-1",
        type: "custom",
        coordinates: [200, 200, 750, 425], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page5.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // Question Table Component 2 (Dona)
      {
        id: "page5-question-table-2",
        name: "page5-question-table-2",
        type: "custom",
        coordinates: [200, 425, 750, 650], // Right side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page5.questionTable2", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // "Mom" Text Box
      {
        id: "page5-mom-text",
        name: "page5-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // "Dona" Text Box
      {
        id: "page5-dona-text",
        name: "page5-dona-text",
        type: "textbox",
        coordinates: [100, 475, 150, 600],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.dona", "Dona"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          givenArray: getI18nText("pages.page5.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page5.conceptSummary.toFind", []),
          factsArray: getI18nText("pages.page5.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page5.conceptSummary.impFormulae", []),
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

      // Fill Blanks Component
      {
        id: "page5-fill-blanks",
        name: "page5-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            { id: "blank1", coordinate: [225, 325, 380, 400], image: "" },
            { id: "blank2", coordinate: [400, 325, 555, 400], image: "" },
            { id: "blank3", coordinate: [570, 325, 725, 400], image: "" },
            { id: "blank4", coordinate: [225, 550, 380, 625], image: "" },
            { id: "blank5", coordinate: [400, 550, 555, 625], image: "" },
            { id: "blank6", coordinate: [570, 550, 725, 625], image: "" },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 25,
          optionContainerInstructionText: getI18nText(
            "pages.page5.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 6,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "DND", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page5.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page5.fillBlanks.impFormulae", []),
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

      // Question Table Component 1 (Mom)
      {
        id: "page6-question-table-1",
        name: "page6-question-table-1",
        type: "custom",
        coordinates: [200, 200, 750, 425], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // Question Table Component 2 (Dona)
      {
        id: "page6-question-table-2",
        name: "page6-question-table-2",
        type: "custom",
        coordinates: [200, 425, 750, 650], // Right side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.questionTable2", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // "Mom" Text Box
      {
        id: "page6-mom-text",
        name: "page6-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // "Dona" Text Box
      {
        id: "page6-dona-text",
        name: "page6-dona-text",
        type: "textbox",
        coordinates: [100, 475, 150, 600],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.dona", "Dona"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          givenArray: getI18nText("pages.page6.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page6.conceptSummary.toFind", []),
          factsArray: getI18nText("pages.page6.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page6.conceptSummary.impFormulae", []),
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

      // Fill Blanks Component
      {
        id: "page6-fill-blanks",
        name: "page6-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [225, 325, 380, 400],
              text: getI18nText("common.labels.quantity250ml", "250 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank2",
              coordinate: [400, 325, 555, 400],
              text: getI18nText("common.labels.number1", "1"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank3",
              coordinate: [570, 325, 725, 400],
              text: getI18nText("common.labels.number2", "2"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank4",
              coordinate: [225, 550, 380, 625],
              text: getI18nText("common.labels.quantity1liter", "1 liter"),
              image: "",
              bgColor: "#ffff00",
              fontColor: "#000000",
              borderColor: "#ffffff",
              bgBlink: true,
            },
            {
              id: "blank5",
              coordinate: [400, 550, 555, 625],
              text: getI18nText("common.labels.number4", "4"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank6",
              coordinate: [570, 550, 725, 625],
              text: getI18nText("common.labels.number10", "10"),
              image: "",
              isDroppable: false,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 35,
          optionContainerInstructionText: getI18nText(
            "pages.page6.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 4,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "DND", // 'DND' (drag and drop) or 'MCQ' (multiple choice question)
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

      // Question Table Component 1 (Mom)
      {
        id: "page7-question-table-1",
        name: "page7-question-table-1",
        type: "custom",
        coordinates: [200, 200, 750, 550], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page7.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [
                ["", "", ""],
                ["", "", ""],
              ],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // "Mom" Text Box
      {
        id: "page7-mom-text",
        name: "page7-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Right Arrow Image
      {
        id: "page7-right-arrow",
        name: "page7-right-arrow",
        type: "container",
        coordinates: [115, 350, 215, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightArrow.png",
          imageAlt: "Right Arrow",
        },
      },

      // "×4" Text Box (custom component that updates on quiz completion)
      {
        id: "page7-times4-text",
        name: "page7-times4-text",
        type: "custom",
        coordinates: [25, 350, 115, 485],
        zIndex: 54,
        props: {
          componentType: "Times4TextboxComponent",
          fontSize: "60gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          givenArray: getI18nText("pages.page7.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page7.conceptSummary.toFind", []),
          factsArray: getI18nText("pages.page7.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page7.conceptSummary.impFormulae", []),
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

      // Fill Blanks Component
      {
        id: "page7-fill-blanks",
        name: "page7-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [225, 325, 380, 412],
              text: getI18nText("common.labels.quantity250ml", "250 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank2",
              coordinate: [400, 325, 555, 412],
              text: getI18nText("common.labels.number1", "1"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank3",
              coordinate: [570, 325, 725, 412],
              text: getI18nText("common.labels.number2", "2"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank4",
              coordinate: [225, 435, 380, 522],
              text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank5",
              coordinate: [400, 435, 555, 522],
              text: "",
              image: "",
              bgColor: "#ffff00",
              fontColor: "#000000",
              borderColor: "#ffffff",
              bgBlink: true,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 35,
          optionContainerInstructionText: getI18nText(
            "pages.page7.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 4,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'DND' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page7.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page7.fillBlanks.impFormulae", []),
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

      // Question Table Component 1 (Mom)
      {
        id: "page8-question-table-1",
        name: "page8-question-table-1",
        type: "custom",
        coordinates: [200, 200, 750, 550], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page8.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // "Mom" Text Box
      {
        id: "page8-mom-text",
        name: "page8-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Right Arrow Image
      {
        id: "page8-right-arrow",
        name: "page8-right-arrow",
        type: "container",
        coordinates: [115, 350, 215, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightArrow.png",
          imageAlt: "Right Arrow",
        },
      },

      // "×4" Text Box (custom component that updates on quiz completion)
      {
        id: "page8-times4-text",
        name: "page8-times4-text",
        type: "custom",
        coordinates: [25, 350, 115, 485],
        zIndex: 54,
        props: {
          componentType: "Times4TextboxComponent",
          fontSize: "60gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          givenArray: getI18nText("pages.page8.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page8.conceptSummary.toFind", []),
          factsArray: getI18nText("pages.page8.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page8.conceptSummary.impFormulae", []),
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

      // Fill Blanks Component
      {
        id: "page8-fill-blanks",
        name: "page8-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [225, 325, 380, 412],
              text: getI18nText("common.labels.quantity250ml", "250 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank2",
              coordinate: [400, 325, 555, 412],
              text: getI18nText("common.labels.number1", "1"),
              image: "",
            },
            {
              id: "blank3",
              coordinate: [570, 325, 725, 412],
              text: getI18nText("common.labels.number2", "2"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank4",
              coordinate: [225, 435, 380, 522],
              text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
              image: "",
              isDroppable: false,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 35,
          optionContainerInstructionText: getI18nText(
            "pages.page8.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 4,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'DND' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page8.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page8.fillBlanks.impFormulae", []),
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
          // text: getI18nText('common.questionText', ''),
          iconLetter: getI18nText("common.questionIcon", "Q"),
          highlights: getI18nText("pages.page9.highlights", []),
        },
      },

      // Quiz Panel Component
      {
        id: "page9-quiz-panel",
        name: "quiz-panel",
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
          givenArray: getI18nText("pages.page9.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page9.conceptSummary.toFind", []),
          factsArray: getI18nText("pages.page9.conceptSummary.keyConcepts", []),
          valueArray: getI18nText("pages.page9.conceptSummary.impFormulae", []),
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

      // Question Table Component 1 (Mom)
      {
        id: "page10-question-table-1",
        name: "page10-question-table-1",
        type: "custom",
        coordinates: [200, 200, 750, 550], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page10.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // "Mom" Text Box
      {
        id: "page10-mom-text",
        name: "page10-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Right Arrow Image
      {
        id: "page10-right-arrow",
        name: "page10-right-arrow",
        type: "container",
        coordinates: [115, 350, 215, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightArrow.png",
          imageAlt: "Right Arrow",
        },
      },

      // "×4" Text Box (custom component that updates on quiz completion)
      {
        id: "page10-times4-text",
        name: "page10-times4-text",
        type: "custom",
        coordinates: [25, 350, 115, 485],
        zIndex: 54,
        props: {
          componentType: "Times4TextboxComponent",
          fontSize: "60gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          givenArray: getI18nText("pages.page10.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page10.conceptSummary.toFind", []),
          factsArray: getI18nText(
            "pages.page10.conceptSummary.keyConcepts",
            []
          ),
          valueArray: getI18nText(
            "pages.page10.conceptSummary.impFormulae",
            []
          ),
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

      // Fill Blanks Component
      {
        id: "page10-fill-blanks",
        name: "page10-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [225, 325, 380, 412],
              text: getI18nText("common.labels.quantity250ml", "250 ml"),
              image: "",
            },
            {
              id: "blank2",
              coordinate: [400, 325, 555, 412],
              text: getI18nText("common.labels.number1", "1"),
              image: "",
            },
            {
              id: "blank3",
              coordinate: [570, 325, 725, 412],
              text: getI18nText("common.labels.number2", "2"),
              image: "",
            },
            {
              id: "blank4",
              coordinate: [225, 435, 380, 522],
              text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
              image: "",
            },
            {
              id: "blank5",
              coordinate: [400, 435, 555, 522],
              text: getI18nText("common.labels.variableA", "a"),
              image: "",
              bgColor: "#FFD700 ",
              fontColor: "#000000",
              borderColor: "#ffffff",
              bgBlink: true,
            },
            {
              id: "blank6",
              coordinate: [570, 435, 725, 522],
              text: getI18nText("common.labels.variableB", "b"),
              image: "",
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 35,
          optionContainerInstructionText: getI18nText(
            "pages.page10.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 4,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "DND", // 'DND' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page10.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page10.fillBlanks.impFormulae", []),
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

      // Question Table Component 1 (Mom)
      {
        id: "page11-question-table-1",
        name: "page11-question-table-1",
        type: "custom",
        coordinates: [200, 200, 750, 550], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page11.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
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

      // "Mom" Text Box
      {
        id: "page11-mom-text",
        name: "page11-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Right Arrow Image
      {
        id: "page11-right-arrow",
        name: "page11-right-arrow",
        type: "container",
        coordinates: [115, 350, 215, 500],
        zIndex: 56,
        props: {
          backgroundColor: "transparent",
          borderWidth: "0gc",
          borderStyle: "none",
          borderColor: "transparent",
          imageSrc: "assets/rightArrow.png",
          imageAlt: "Right Arrow",
        },
      },

      // "×4" Text Box (custom component that updates on quiz completion)
      {
        id: "page11-times4-text",
        name: "page11-times4-text",
        type: "custom",
        coordinates: [25, 350, 115, 485],
        zIndex: 54,
        props: {
          componentType: "Times4TextboxComponent",
          fontSize: "60gc",
          color: "var(--color-gold)",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          givenArray: getI18nText("pages.page11.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page11.conceptSummary.toFind", []),
          factsArray: getI18nText(
            "pages.page11.conceptSummary.keyConcepts",
            []
          ),
          valueArray: getI18nText(
            "pages.page11.conceptSummary.impFormulae",
            []
          ),
        },
      },

      // Feedback Textbox Component
      {
        id: "page11-feedback-textbox",
        name: "page11-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 775, 815], // Position above fill blanks component
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

      // Fill Blanks Component
      {
        id: "page11-fill-blanks",
        name: "page11-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [225, 325, 380, 412],
              text: getI18nText("common.labels.quantity250ml", "250 ml"),
              image: "",
            },
            {
              id: "blank2",
              coordinate: [400, 325, 555, 412],
              text: getI18nText("common.labels.number1", "1"),
              image: "",
            },
            {
              id: "blank3",
              coordinate: [570, 325, 725, 412],
              text: getI18nText("common.labels.number2", "2"),
              image: "",
            },
            {
              id: "blank4",
              coordinate: [225, 435, 380, 522],
              text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
              image: "",
            },
            {
              id: "blank5",
              coordinate: [400, 435, 555, 522],
              text: getI18nText("common.labels.number4", "4"),
              image: "",
            },
            {
              id: "blank6",
              coordinate: [570, 435, 725, 522],
              text: getI18nText("common.labels.variableB", "b"),
              image: "",
              bgColor: "#FFD700 ",
              fontColor: "#000000",
              borderColor: "#ffffff",
              bgBlink: true,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 815],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 35,
          optionContainerInstructionText: getI18nText(
            "pages.page11.fillBlanks.instructionText",
            "Select the correct options to fill in the blanks."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 4,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "DND", // 'DND' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page11.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page11.fillBlanks.impFormulae", []),
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

      // Question Table Component 1 (Mom)
      {
        id: "page12-question-table-1",
        name: "page12-question-table-1",
        type: "custom",
        coordinates: [200, 150, 750, 425], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page12.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [
                ["", "", ""],
                ["", "", ""],
              ],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {
            1: {
              // Row 2 (0-indexed)
              backgroundColor: "#5EBAE7",
            },
          },
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      // Question Table Component 2 (Dona)
      {
        id: "page12-question-table-2",
        name: "page12-question-table-2",
        type: "custom",
        coordinates: [200, 425, 750, 625], // Right side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page12.questionTable2", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {
            0: {
              // Row 2 (0-indexed)
              backgroundColor: "#5EBAE7",
            },
          },
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      // "Mom" Text Box
      {
        id: "page12-mom-text",
        name: "page12-mom-text",
        type: "textbox",
        coordinates: [100, 225, 150, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // "Dona" Text Box
      {
        id: "page12-dona-text",
        name: "page12-dona-text",
        type: "textbox",
        coordinates: [100, 475, 150, 600],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.dona", "Dona"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Concept Summary Panel
      {
        id: "page12-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page12.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page12.conceptSummary.toFind", []),
          factsArray: getI18nText(
            "pages.page12.conceptSummary.keyConcepts",
            []
          ),
          valueArray: getI18nText(
            "pages.page12.conceptSummary.impFormulae",
            []
          ),
        },
      },

      // Conclusion Text Box Component
      {
        id: "page12-conclusion-text",
        name: "page12-conclusion-text",
        type: "textbox",
        coordinates: [50, 635, 732, 800], // Position below tables
        zIndex: 54,
        props: {
          text: `<span style="display: inline;">${getI18nText(
            "pages.page12.conclusion.text",
            "The amount of sugar is different in Mom's and Dona's coffee.<br>So, Dona's coffee tastes <span style=\"color: transparent;\">sweeter than</span> mom's coffee."
          )}</span>`,
          fontSize: "28gc",
          color: "#ffffff",
          textAlign: "left",
          backgroundColor: "transparent",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20gc",
          allowHTML: true,
        },
      },

      // Feedback Textbox Component
      {
        id: "page12-feedback-textbox",
        name: "page12-feedback-textbox-unique",
        type: "custom",
        coordinates: [800, 605, 1075, 815], // Position above fill blanks component
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

      // Fill Blanks Component
      {
        id: "page12-fill-blanks",
        name: "page12-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          get blanks() {
            return [
              {
                id: "blank1",
                coordinate: [225, 275, 380, 325],
                text: getI18nText("common.labels.quantity250ml", "250 ml"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank2",
                coordinate: [400, 275, 555, 325],
                text: getI18nText("common.labels.number1", "1"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank3",
                coordinate: [570, 275, 725, 325],
                text: getI18nText("common.labels.number2", "2"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank4",
                coordinate: [225, 350, 380, 400],
                text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank5",
                coordinate: [400, 350, 555, 400],
                text: getI18nText("common.labels.number4", "4"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank6",
                coordinate: [570, 350, 725, 400],
                text: getI18nText("common.labels.number8", "8"),
                image: "",
                bgColor: "#FFD700 ",
                fontColor: "#000000",
                bgBlink: true,
                isDroppable: false,
              },
              {
                id: "blank7",
                coordinate: [225, 550, 380, 600],
                text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank8",
                coordinate: [400, 550, 555, 600],
                text: getI18nText("common.labels.number4", "4"),
                image: "",
                isDroppable: false,
              },
              {
                id: "blank9",
                coordinate: [570, 550, 725, 600],
                text: getI18nText("common.labels.number10", "10"),
                image: "",
                bgColor: "#FFD700 ",
                fontColor: "#000000",
                bgBlink: true,
                isDroppable: false,
              },
              {
                id: "blank10",
                coordinate: getI18nText(
                  "pages.page12.fillBlanks.blank10Coordinate",
                  [390, 705, 600, 765]
                ),
                text: "",
                image: "",
                bgColor: "aqua",
                fontColor: "#000000",
                bgBlink: true,
              },
            ];
          },
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 600],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText(
            "pages.page12.fillBlanks.instructionText",
            "Drag and drop the correct options to fill in the highlighted blank in blue box."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 3,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "DND", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page12.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page12.fillBlanks.impFormulae", []),
        },
      },

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

      // Question Table Component 1 (Mom)
      {
        id: "page13-question-table-1",
        name: "page13-question-table-1",
        type: "custom",
        coordinates: [350, 150, 900, 425], // Left side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page13.questionTable1", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [
                ["", "", ""],
                ["", "", ""],
              ],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {
            1: {
              // Row 2 (0-indexed)
              backgroundColor: "#5EBAE7",
            },
          },
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      // Question Table Component 2 (Dona)
      {
        id: "page13-question-table-2",
        name: "page13-question-table-2",
        type: "custom",
        coordinates: [350, 425, 900, 625], // Right side table
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page13.questionTable2", {
              headers: ["Quantity", "Coffee (in tsp)", "Sugar (in tsp)"],
              rows: [["", "", ""]],
            });
            return {
              ...baseData,
              headers: [
                getI18nText("common.tableHeaders.quantity", "Quantity"),
                getI18nText("common.tableHeaders.coffee", "Coffee (in tsp)"),
                getI18nText("common.tableHeaders.sugar", "Sugar (in tsp)"),
              ],
            };
          })(),
          borderColor: "#ffffff",
          headerBackgroundColor: "#2a3f5f",
          cellBackgroundColor: "transparent",
          rowOverrides: {
            0: {
              // Row 2 (0-indexed)
              backgroundColor: "#5EBAE7",
            },
          },
          textColor: "#ffffff",
          fontSize: "24gc",
          headerFontSize: "24gc",
          padding: "15gc",
          equalColumnWidths: true,
        },
      },

      // "Mom" Text Box
      {
        id: "page13-mom-text",
        name: "page13-mom-text",
        type: "textbox",
        coordinates: [250, 225, 300, 400],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.mom", "Mom"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // "Dona" Text Box
      {
        id: "page13-dona-text",
        name: "page13-dona-text",
        type: "textbox",
        coordinates: [250, 475, 300, 600],
        zIndex: 54,
        props: {
          text: getI18nText("common.labels.dona", "Dona"),
          fontSize: "40gc",
          color: "#ffffff",
          textAlign: "center",
          backgroundColor: "transparent",
          borderWidth: "0gc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Concept Summary Panel
      {
        id: "page13-concept-summary-panel",
        name: "concept-summary-panel",
        type: "custom",
        coordinates: [1100, 150, 1600, 815], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "ConceptSummaryComponent",
          givenArray: getI18nText("pages.page13.conceptSummary.given", []),
          toFindArray: getI18nText("pages.page13.conceptSummary.toFind", []),
          factsArray: getI18nText(
            "pages.page13.conceptSummary.keyConcepts",
            []
          ),
          valueArray: getI18nText(
            "pages.page13.conceptSummary.impFormulae",
            []
          ),
        },
      },

      // Conclusion Text Box Component
      // {
      //   id: 'page13-conclusion-text',
      //   name: 'page13-conclusion-text',
      //   type: 'textbox',
      //   coordinates: [50, 635, 732, 800], // Position below tables
      //   zIndex: 54,
      //   props: {
      //     text: "<span style=\"display: inline;\">The amount of sugar is different in Mom's and Dona's coffee. So, Dona's coffee tastes <span style=\"color: transparent;\">sweeter than</span> \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0mom's coffee.</span>",
      //     fontSize: '28gc',
      //     color: '#ffffff',
      //     textAlign: 'left',
      //     backgroundColor: 'transparent',
      //     borderWidth: '4gc',
      //     borderStyle: 'dashed',
      //     borderColor: '#ffffff',
      //     display: 'flex',
      //     alignItems: 'center',
      //     justifyContent: 'flex-start',
      //     padding: '20gc',
      //     allowHTML: true,
      //   }
      // },

      // Feedback Textbox Component
      {
        id: "page13-feedback-textbox",
        name: "page13-feedback-textbox-unique",
        type: "custom",
        coordinates: [50, 650, 1075, 815], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page13-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page13.feedbackTextbox.text", ""),
          mode: "summary", // Summary mode on load
          allowHTML: true, // Allow HTML rendering for styled text
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

      // Fill Blanks Component
      {
        id: "page13-fill-blanks",
        name: "page13-fill-blanks-component",
        type: "custom",
        coordinates: [50, 700, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            {
              id: "blank1",
              coordinate: [375, 275, 530, 325],
              text: getI18nText("common.labels.quantity250ml", "250 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank2",
              coordinate: [550, 275, 705, 325],
              text: getI18nText("common.labels.number1", "1"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank3",
              coordinate: [720, 275, 875, 325],
              text: getI18nText("common.labels.number2", "2"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank4",
              coordinate: [375, 350, 530, 400],
              text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank5",
              coordinate: [550, 350, 705, 400],
              text: getI18nText("common.labels.number4", "4"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank6",
              coordinate: [720, 350, 875, 400],
              text: getI18nText("common.labels.number8", "8"),
              image: "",
              bgColor: "#FFD700 ",
              fontColor: "#000000",
              bgBlink: true,
              isDroppable: false,
            },
            {
              id: "blank7",
              coordinate: [375, 550, 530, 600],
              text: getI18nText("common.labels.quantity1000ml", "1000 ml"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank8",
              coordinate: [550, 550, 705, 600],
              text: getI18nText("common.labels.number4", "4"),
              image: "",
              isDroppable: false,
            },
            {
              id: "blank9",
              coordinate: [720, 550, 875, 600],
              text: getI18nText("common.labels.number10", "10"),
              image: "",
              bgColor: "#FFD700 ",
              fontColor: "#000000",
              bgBlink: true,
              isDroppable: false,
            },
          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "white",
          blankBorderType: "solid",
          blankBackgroundColor: "transparent",
          blankFontSize: "32gc",
          blankFontColor: "#ffffff",
          optionsContainerCoordinates: [800, questionBottomY, 1075, 600],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: false,
          showOptionsContainerBorder: true,
          showOptionsRowBorders: true,
          optionContainerInstructionHeight: 40,
          optionContainerInstructionText: getI18nText(
            "pages.page13.fillBlanks.instructionText",
            "Drag and drop the correct options to fill in the highlighted blank in blue box."
          ),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 3,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "DND", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page13.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page13.fillBlanks.impFormulae", []),
        },
      },

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
