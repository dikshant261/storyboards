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
  12: { prev: 11, next: null },
  13: { prev: 12, next: 14 },
  14: { prev: 13, next: 15 },
  15: { prev: 14, next: 16 },
  16: { prev: 15, next: 17 },
  17: { prev: 16, next: 18 },
  18: { prev: 17, next: 19 },
  19: { prev: 18, next: 20 },
  20: { prev: 19, next: null },
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
 * Extract page number from element ID
 * @param {string} id - Element ID (e.g., 'page1-next-button', 'page2-previous-button')
 * @returns {number} Extracted page number (defaults to 1 if not found)
 */
const extractPageNumberFromId = (id) => {
  if (!id) return 1;
  const match = id.match(/page(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
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
        new CustomEvent("pageChanged", { detail: { page: targetPage } }),
      );
      console.log(
        `📄 [Navigation] ${direction} - Dispatched page change event to page ${targetPage}`,
      );
    }
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Helper function for i18n text (accessible globally within this module)
 * @param {string} key - Translation key
 * @param {string} fallback - Fallback text if translation not found
 * @param {Object} params - Parameters for interpolation
 * @returns {string} Translated or fallback text
 */
const getI18nText = (key, fallback, params = {}) => {
  return typeof i18n !== "undefined" ? i18n.t(key, params) : fallback;
};

/**
 * Get page navigation info (previous and next pages)
 * @param {number} pageNumber - Current page number
 * @returns {Object|null} Navigation object with prevPage and nextPage, or null if not found
 */
const getPageNavigation = (pageNumber) => {
  return pageNavigation[pageNumber] || null;
};

/**
 * Check if previous button should be disabled
 * @param {number} pageNumber - Current page number
 * @returns {boolean} True if previous button should be disabled
 */
const isPrevButtonDisabled = (pageNumber) => {
  const nav = getPageNavigation(pageNumber);
  return !nav || nav.prev === null;
};

/**
 * Get next button text based on page number
 * @param {number} pageNumber - Current page number
 * @returns {string} Text to display on next button
 */
const getNextButtonText = (pageNumber) => {
  const nav = getPageNavigation(pageNumber);
  // If there's no next page, show "Start Over" or similar
  if (!nav || nav.next === null) {
    return getI18nText("buttons.startOver");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next");
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

  const questionBottom_Y = 200;
  const questionTextSize = "44gc";

  // Helper function to get CSS variable value
  const getCSSVariable = (variableName, fallback = "") => {
    if (typeof window !== "undefined" && window.getComputedStyle) {
      try {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(variableName)
          .trim();
        return value || fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  // Return optimized GridPositionPages
  return {
    1: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page1-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page1-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [300, 100, 1300, 775], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: "page1-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [310, 110, 1290, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: "HighlightedTextComponent",
          text: getI18nText("common.questionText"),
          fontSize: "48gc",
          fontWeight: "normal",
          fontColor: "#ffffff",
          padding: "10gc",
          justifyContent: "center",
          textAlign: "center",
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: [],
        },
      },

      // Instruction Text
      {
        id: "page1-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page1.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page1-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
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
            const pageNumber = extractPageNumberFromId("page1-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page1-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonPage2"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page1-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page1-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    2: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page2-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page2.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page2-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: "page2-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: "HighlightedTextComponent",
          text: getI18nText("common.questionText"),
          fontSize: questionTextSize,
          fontWeight: "normal",
          fontColor: "#ffffff",
          justifyContent: "center",
          textAlign: "center",
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page2.highlights"),
        },
      },

      // Information Analysis Panel
      {
        id: "page2-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page2.informationAnalysis.facts"),
          valueArray: getI18nText("pages.page2.informationAnalysis.values"),
          toFindArray: getI18nText("pages.page2.informationAnalysis.toFind"),
          findingsArray: getI18nText(
            "pages.page2.informationAnalysis.findingsArray",
          ),

          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },

      //1/5 pizza image
      {
        id: "page2-pizza-image-one",
        name: "page2-pizza-image-one",
        type: "custom",
        coordinates: [50, 450, 1040, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-pizza-image-one",
          elementName: "page2-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // Instruction Text
      {
        id: "page2-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page2.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page2-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
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
            const pageNumber = extractPageNumberFromId("page2-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page2-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonPage2"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page2-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page2-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    3: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page3-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page3-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: "page3-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: "HighlightedTextComponent",
          text: getI18nText("common.questionText"),
          fontSize: questionTextSize,
          fontWeight: "normal",
          fontColor: "#ffffff",
          justifyContent: "center",
          textAlign: "center",
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page3.highlights"),
        },
      },

      // Information Analysis Panel
      {
        id: "page3-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page3.informationAnalysis.facts"),
          valueArray: getI18nText("pages.page3.informationAnalysis.values"),
          toFindArray: getI18nText("pages.page3.informationAnalysis.toFind"),
          findingsArray: getI18nText(
            "pages.page3.informationAnalysis.findingsArray",
          ),
          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },
      // Black background container for question text
      {
        id: "page3-area-text",
        name: "page3-area-text",
        type: "custom",
        coordinates: [50, 450, 1040, 750], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page3-pizza-image-one",
        name: "page3-pizza-image-one",
        type: "custom",
        coordinates: [50, 450, 1040, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-pizza-image-one",
          elementName: "page3-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // Instruction Text
      {
        id: "page3-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page3.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page3-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
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
            const pageNumber = extractPageNumberFromId("page3-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page3-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage3"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page3-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page3-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    4: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page4-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page4-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: "page4-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: "HighlightedTextComponent",
          text: getI18nText("common.questionText"),
          fontSize: questionTextSize,
          fontWeight: "normal",
          fontColor: "#ffffff",
          justifyContent: "center",
          textAlign: "center",
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page4.highlights"),
        },
      },

      // Information Analysis Panel
      {
        id: "page4-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page4.informationAnalysis.facts"),
          valueArray: [],
          findingsArray: [],
          toFindArray: getI18nText("pages.page4.informationAnalysis.toFind"),
          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },
      // Black background container for question text
      {
        id: "page4-area-text",
        name: "page4-area-text",
        type: "custom",
        coordinates: [50, 450, 1040, 730], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page4-20-cm-text",
        name: "page4-20-cm-text",
        type: "custom",
        coordinates: [50, 400, 1040, 430], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page4-40-cm-text",
        name: "page4-40-cm-text",
        type: "custom",
        coordinates: [50, 750, 1040, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page4-pizza-image-one",
        name: "page4-pizza-image-one",
        type: "custom",
        coordinates: [50, 450, 1040, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-pizza-image-one",
          elementName: "page4-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      // Instruction Text
      {
        id: "page4-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page4.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page4-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
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
            const pageNumber = extractPageNumberFromId("page4-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page4-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage4"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page4-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page4-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    5: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page5-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page5-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: "page5-question-text-box",
        name: "question-text-box",
        type: "custom",
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: "HighlightedTextComponent",
          text: getI18nText("common.questionText"),
          fontSize: questionTextSize,
          fontWeight: "normal",
          fontColor: "#ffffff",
          justifyContent: "center",
          textAlign: "center",
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page5.highlights"),
        },
      },

      // Information Analysis Panel
      {
        id: "page5-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page5.informationAnalysis.facts"),
          valueArray: [],
          findingsArray: [],
          toFindArray: getI18nText("pages.page5.informationAnalysis.toFind"),
          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },
      // Black background container for question text
      {
        id: "page5-area-text",
        name: "page5-area-text",
        type: "custom",
        coordinates: [50, 450, 1040, 730], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page5-20-cm-text",
        name: "page5-20-cm-text",
        type: "custom",
        coordinates: [50, 400, 1040, 430], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page5-40-cm-text",
        name: "page5-40-cm-text",
        type: "custom",
        coordinates: [50, 750, 1040, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page5-h-text",
        name: "page5-h-text",
        type: "custom",
        coordinates: [600, 480, 750, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page5-pizza-image-one",
        name: "page5-pizza-image-one",
        type: "custom",
        coordinates: [50, 450, 1040, 730], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-pizza-image-one",
          elementName: "page5-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      // Instruction Text
      {
        id: "page5-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page5.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page5-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
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
            const pageNumber = extractPageNumberFromId("page5-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page5-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage5"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page5-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page5-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    6: [
      // Black container with 70% opacity
      {
        id: "page6-black-container",
        name: "black-container",
        type: "custom",
        coordinates: [350, 120, 1250, 600], // Adjust coordinates as needed50
        zIndex: 40,
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 70% opacity black
          border: "none",
          borderRadius: "12gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },
      // Black background container for question text
      {
        id: "page6-area-text",
        name: "page6-area-text",
        type: "custom",
        coordinates: [350, 190, 1250, 520], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page6-20-cm-text",
        name: "page6-20-cm-text",
        type: "custom",
        coordinates: [350, 140, 1250, 170], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page6-40-cm-text",
        name: "page6-40-cm-text",
        type: "custom",
        coordinates: [350, 540, 1250, 570], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page6-h-text",
        name: "page6-h-text",
        type: "custom",
        coordinates: [900, 220, 1050, 250], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page6-pizza-image-one",
        name: "page6-pizza-image-one",
        type: "custom",
        coordinates: [350, 190, 1250, 520], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page6-pizza-image-one",
          elementName: "page6-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // Instruction Text - "Tap >> to identify all the required steps for the addition"
      {
        id: "page6-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page6.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Information gathered text with checkmark
      {
        id: "page6-information-gathered-text",
        name: "information-gathered-text",
        type: "custom",
        coordinates: [5, 650, 1595, 700], // Centered horizontally
        zIndex: 60,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.informationGathered"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "0gc",
          textColor: "#20B2AA", // Teal color
          fontSize: "36gc",
          padding: "5gc",
          textAlign: "center",
          fontWeight: "normal",
        },
      },

      // Next steps text
      {
        id: "page6-next-steps-text",
        name: "next-steps-text",
        type: "custom",
        coordinates: [350, 730, 1250, 770], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.nextStep"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Orange color
          fontSize: "36gc",
          padding: "5gc",
          textAlign: "center",
          fontWeight: "bold",
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
            const pageNumber = extractPageNumberFromId("page6-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page6-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonPage2"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
        },
      },

      // Tap Animation GIF
      {
        id: "page6-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page6-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page6-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    7: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page7-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page7-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1050, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Black background container for question text
      {
        id: "page7-area-text",
        name: "page7-area-text",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page7-20-cm-text",
        name: "page7-20-cm-text",
        type: "custom",
        coordinates: [50, 120, 940, 150], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page7-40-cm-text",
        name: "page7-40-cm-text",
        type: "custom",
        coordinates: [50, 490, 940, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page7-h-text",
        name: "page7-h-text",
        type: "custom",
        coordinates: [550, 210, 700, 230], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page7-pizza-image-one",
        name: "page7-pizza-image-one",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page7-pizza-image-one",
          elementName: "page7-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      //quiz panel
      {
        id: "page7-quiz-panel",
        name: "page7-quiz-panel",
        type: "custom",
        coordinates: [1055, 100, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page7-quiz", // Unique identifier for this quiz
          quizType: "MCQ", // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: "QT4R", // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: "",
          questionText: getI18nText("pages.page7.quizPanel.questionText"),
          feedbackText: "",
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 95,
          questionTextFontSize: "36gc", // Font size for question text (in gc units)
          optionButtonTextSize: "26gc", // Font size for option button text (in gc units)
          optionButtonTextColor: "#000000", // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page7.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
        },
      },
      // Instruction Text
      {
        id: "page7-instruction-text",
        name: "instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page7.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page7-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: "quizCompleted", // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 7 },
          get text() {
            const pageNumber = extractPageNumberFromId("page7-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page7-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage7"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page7-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page7-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    8: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page8-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page8.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page8-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1150, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Black background container for question text
      {
        id: "page8-area-text",
        name: "page8-area-text",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page8-20-cm-text",
        name: "page8-20-cm-text",
        type: "custom",
        coordinates: [50, 120, 940, 150], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page8-40-cm-text",
        name: "page8-40-cm-text",
        type: "custom",
        coordinates: [50, 490, 940, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page8-h-text",
        name: "page8-h-text",
        type: "custom",
        coordinates: [550, 210, 700, 230], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page8-pizza-image-one",
        name: "page8-pizza-image-one",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page8-pizza-image-one",
          elementName: "page8-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: "page8-working-box-1",
        name: "working-box-1",
        type: "custom",
        coordinates: [10, 580, 350, 680], // X coordinates match page8-number-box-1, Width: 150, Height: 100, moved down 25gc (+50gc)
        zIndex: 60,
        props: {
          componentType: "FlipTileComponent",
          frontText: getI18nText("common.formula.areaOfTrapezoid"),
          frontBackgroundColor: "rgba(255, 215, 0, 0.45)", // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: "#ffffff",
          frontBorderWidth: "2px",
          frontBorderStyle: "solid",
          frontBorderRadius: "12gc",
          frontColor: "#000000",
          frontFontSize: "30gc",
          frontFontWeight: "bold",
          blinkText: false,
          backHtml: "300",
          flipMode: "correct",
          backBackgroundColor: "rgba(74, 85, 104, 0.45)", // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: "#ffffff",
          backBorderWidth: "0px",
          backBorderStyle: "none",
          backBorderRadius: "12gc",
          backColor: "#ffffff",
          backFontSize: "36gc",
          backFontWeight: "normal",
          onFlipChangeTargetId: "page8-number-box-1",
          onFlipHideTargetId: "page8-tap-animation-working-box-1",
          onClick: (e, isNowFlipped) => {
            if (!isNowFlipped) return;
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("enableFlipTile", {
                  detail: { targetId: "page8-working-box-2" },
                }),
              );
              window.dispatchEvent(
                new CustomEvent("enableTap", {
                  detail: { targetId: "page8-tap-animation-working-box-2" },
                }),
              );
            }
          },
        },
      },

      // Tap Animation on working-box-1
      {
        id: "page8-tap-animation-working-box-1",
        name: "page8-tap-animation-working-box-1",
        type: "custom",
        coordinates: [15, 610, 75, 710], // Centered on top of working-box-1, moved down 25gc and left 20gc (+50gc)
        zIndex: 70,
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: true,
          opacity: 0.55, // 30% opacity
        },
      },
      //eqaul to
      {
        id: "page8-equal-to-text",
        name: "page8-equal-to-text",
        type: "custom",
        coordinates: [370, 580, 390, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/2 tile
      {
        id: "page8-half-text",
        name: "page8-half-text",
        type: "custom",
        coordinates: [410, 580, 550, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "$\\frac{1}{2}$", // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "40gc",
          padding: "5gc",
        },
      },
      //× text
      {
        id: "page8-×-text",
        name: "page8-×-text",
        type: "custom",
        coordinates: [570, 580, 590, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "×", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: "page8-working-box-2",
        name: "working-box-2",
        type: "custom",
        coordinates: [610, 580, 960, 680], // X coordinates match page8-number-box-1, Width: 150, Height: 100, moved down 25gc (+50gc)
        zIndex: 60,
        props: {
          componentType: "FlipTileComponent",
          frontText: getI18nText("common.formula.sumOfParellelSide"),
          frontBackgroundColor: "rgba(255, 215, 0, 0.45)", // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: "#ffffff",
          frontBorderWidth: "2px",
          frontBorderStyle: "solid",
          frontBorderRadius: "12gc",
          frontColor: "#000000",
          frontFontSize: "30gc",
          frontFontWeight: "bold",
          blinkText: false,
          backHtml: "(20 + 40)",
          flipMode: "correct",
          backBackgroundColor: "rgba(74, 85, 104, 0.45)", // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: "#ffffff",
          backBorderWidth: "0px",
          backBorderStyle: "none",
          backBorderRadius: "12gc",
          backColor: "#ffffff",
          backFontSize: "36gc",
          backFontWeight: "normal",
          onFlipChangeTargetId: "page8-number-box-2",
          onFlipHideTargetId: "page8-tap-animation-working-box-2",
          initialEnabled: false,
          enableOnEvent: "enableFlipTile",
          enableOnEventFilter: { targetId: "page8-working-box-2" },
        },
      },

      // Tap Animation on working-box-1
      {
        id: "page8-tap-animation-working-box-2",
        name: "page8-tap-animation-working-box-2",
        type: "custom",
        coordinates: [610, 610, 680, 710], // Centered on top of working-box-1, moved down 25gc and left 20gc (+50gc)
        zIndex: 70,
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: false,
          showOnEvent: "enableTap",
          showOnEventFilter: { targetId: "page8-tap-animation-working-box-2" },
          opacity: 0.55, // 30% opacity
        },
      },
      //× text
      {
        id: "page8-×-text-2",
        name: "page8-×-text-2",
        type: "custom",
        coordinates: [980, 580, 1000, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "×", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //height tile
      {
        id: "page8-height-text",
        name: "page8-height-text",
        type: "custom",
        coordinates: [1020, 580, 1145, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.formula.height"), // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "34gc",
          padding: "5gc",
        },
      },
      // Information Analysis Panel
      {
        id: "page8-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1155, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page8.informationAnalysis.facts"),

          valueArray: [],
          toFindArray: getI18nText("pages.page8.informationAnalysis.toFind"),
          findingsArray: getI18nText(
            "pages.page8.informationAnalysis.findingsArray",
          ),

          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },
      // Instruction Text
      {
        id: "page8-instruction-text",
        name: "page8-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page8-instruction-text",
          text: getI18nText("pages.page8.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page8-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: "quizCompleted", // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 8 },
          get text() {
            const pageNumber = extractPageNumberFromId("page8-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page8-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage8"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page8-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page8-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    9: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page9-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page9-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1150, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Black background container for question text
      {
        id: "page9-area-text",
        name: "page9-area-text",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page9-20-cm-text",
        name: "page9-20-cm-text",
        type: "custom",
        coordinates: [50, 120, 940, 150], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page9-40-cm-text",
        name: "page9-40-cm-text",
        type: "custom",
        coordinates: [50, 490, 940, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page9-h-text",
        name: "page9-h-text",
        type: "custom",
        coordinates: [550, 210, 700, 230], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page9-pizza-image-one",
        name: "page9-pizza-image-one",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page9-pizza-image-one",
          elementName: "page9-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      //300 tile
      {
        id: "page9-300-text-tile",
        name: "page9-300-text-tile",
        type: "custom",
        coordinates: [50, 580, 200, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: 300, // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      // {
      //   id: 'page9-working-box-1',
      //   name: 'working-box-1',
      //   type: 'custom',
      //   coordinates: [10, 580, 350, 680], // X coordinates match page9-number-box-1, Width: 150, Height: 100, moved down 25gc (+50gc)
      //   zIndex: 60,
      //   props: {
      //     componentType: 'FlipTileComponent',
      //     frontText: getI18nText("common.formula.areaOfTrapezoid"),
      //     frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
      //     frontBorderColor: '#ffffff',
      //     frontBorderWidth: '2px',
      //     frontBorderStyle: 'solid',
      //     frontBorderRadius: '12gc',
      //     frontColor: '#000000',
      //     frontFontSize: '30gc',
      //     frontFontWeight: 'bold',
      //     blinkText: true,
      //     backHtml: '300',
      //     flipMode: 'correct',
      //     backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
      //     backBorderColor: '#ffffff',
      //     backBorderWidth: '0px',
      //     backBorderStyle: 'none',
      //     backBorderRadius: '12gc',
      //     backColor: '#ffffff',
      //     backFontSize: '36gc',
      //     backFontWeight: 'normal',
      //     onFlipChangeTargetId: 'page9-number-box-1',
      //     onFlipHideTargetId: 'page9-tap-animation-working-box-1'
      //   }
      // },

      // // Tap Animation on working-box-1
      // {
      //   id: 'page9-tap-animation-working-box-1',
      //   name: 'page9-tap-animation-working-box-1',
      //   type: 'custom',
      //   coordinates: [15, 610, 75, 710], // Centered on top of working-box-1, moved down 25gc and left 20gc (+50gc)
      //   zIndex: 70,
      //   props: {
      //     componentType: 'TapGifComponent',
      //     imageSrc: 'assets/tap.gif',
      //     imageAlt: 'Tap',
      //     alwaysShow: true,
      //     opacity: 0.55 // 30% opacity
      //   }
      // },
      //eqaul to
      {
        id: "page9-equal-to-text",
        name: "page9-equal-to-text",
        type: "custom",
        coordinates: [220, 580, 240, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/2 tile
      {
        id: "page9-half-text",
        name: "page9-half-text",
        type: "custom",
        coordinates: [260, 580, 410, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "$\\frac{1}{2}$", // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "40gc",
          padding: "5gc",
        },
      },
      //× text
      {
        id: "page9-×-text",
        name: "page9-×-text",
        type: "custom",
        coordinates: [430, 580, 450, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "×", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: "page9-working-box-2",
        name: "working-box-2",
        type: "custom",
        coordinates: [470, 580, 620, 680], // X coordinates match page9-number-box-1, Width: 150, Height: 100, moved down 25gc (+50gc)
        zIndex: 60,
        props: {
          componentType: "FlipTileComponent",
          frontText: "(20 + 40)",
          frontBackgroundColor: "rgba(255, 215, 0, 0.45)", // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: "#ffffff",
          frontBorderWidth: "2px",
          frontBorderStyle: "solid",
          frontBorderRadius: "12gc",
          frontColor: "#000000",
          frontFontSize: "30gc",
          frontFontWeight: "bold",
          blinkText: false,
          backHtml: "60",
          flipMode: "correct",
          backBackgroundColor: "rgba(74, 85, 104, 0.45)", // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: "#ffffff",
          backBorderWidth: "0px",
          backBorderStyle: "none",
          backBorderRadius: "12gc",
          backColor: "#ffffff",
          backFontSize: "36gc",
          backFontWeight: "normal",
          onFlipChangeTargetId: "page9-number-box-2",
          onFlipHideTargetId: "page9-tap-animation-working-box-2",
        },
      },

      // Tap Animation on working-box-1
      {
        id: "page9-tap-animation-working-box-2",
        name: "page9-tap-animation-working-box-2",
        type: "custom",
        coordinates: [470, 610, 530, 710], // Centered on top of working-box-1, moved down 25gc and left 20gc (+50gc)
        zIndex: 70,
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          alwaysShow: true,
          opacity: 0.55, // 30% opacity
        },
      },
      //× text
      {
        id: "page9-×-text-2",
        name: "page9-×-text-2",
        type: "custom",
        coordinates: [640, 580, 660, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "×", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //height tile
      {
        id: "page9-height-text",
        name: "page9-height-text",
        type: "custom",
        coordinates: [680, 580, 830, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.formula.height"), // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "34gc",
          padding: "5gc",
        },
      },
      // Information Analysis Panel
      {
        id: "page9-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1155, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page9.informationAnalysis.facts"),

          valueArray: [],
          toFindArray: getI18nText("pages.page9.informationAnalysis.toFind"),
          findingsArray: getI18nText(
            "pages.page9.informationAnalysis.findingsArray",
          ),

          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },
      // Instruction Text
      {
        id: "page9-instruction-text",
        name: "page9-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page9.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page9-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: "quizCompleted", // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 9 },
          get text() {
            const pageNumber = extractPageNumberFromId("page9-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page9-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage9"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page9-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page9-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    10: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page10-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page10-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1150, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Black background container for question text
      {
        id: "page10-area-text",
        name: "page10-area-text",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page10-20-cm-text",
        name: "page10-20-cm-text",
        type: "custom",
        coordinates: [50, 120, 940, 150], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page10-40-cm-text",
        name: "page10-40-cm-text",
        type: "custom",
        coordinates: [50, 490, 940, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page10-h-text",
        name: "page10-h-text",
        type: "custom",
        coordinates: [550, 210, 700, 230], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page10-pizza-image-one",
        name: "page10-pizza-image-one",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page10-pizza-image-one",
          elementName: "page10-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      //300 tile
      {
        id: "page10-300-text-tile",
        name: "page10-300-text-tile",
        type: "custom",
        coordinates: [50, 580, 200, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: 300, // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: "page10-working-box-1",
        name: "working-box-1",
        type: "custom",
        coordinates: [260, 580, 410, 680], // X coordinates match page10-number-box-1, Width: 150, Height: 100, moved down 25gc (+50gc)
        zIndex: 60,
        props: {
          componentType: "FlipTileComponent",
          frontText: "$\\frac{1}{2}\\times 60$",
          frontBackgroundColor: "rgba(255, 215, 0, 0.45)", // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: "#ffffff",
          frontBorderWidth: "2px",
          frontBorderStyle: "solid",
          frontBorderRadius: "12gc",
          frontColor: "#000000",
          frontFontSize: "36gc",
          frontFontWeight: "bold",
          blinkText: false,
          backHtml: "30",
          flipMode: "correct",
          backBackgroundColor: "rgba(74, 85, 104, 0.45)", // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: "#ffffff",
          backBorderWidth: "0px",
          backBorderStyle: "none",
          backBorderRadius: "12gc",
          backColor: "#ffffff",
          backFontSize: "44gc",
          backFontWeight: "normal",
          onFlipChangeTargetId: "page10-number-box-1",
          onFlipHideTargetId: "page10-tap-animation-working-box-1",
        },
      },

      // Tap Animation on working-box-1
      {
        id: "page10-tap-animation-working-box-1",
        name: "page10-tap-animation-working-box-1",
        type: "custom",
        coordinates: [260, 610, 300, 710], // Centered on top of working-box-1, moved down 25gc and left 20gc (+50gc)
        zIndex: 70,
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          alwaysShow: true,
          opacity: 0.55, // 30% opacity
        },
      },
      //eqaul to
      {
        id: "page10-equal-to-text",
        name: "page10-equal-to-text",
        type: "custom",
        coordinates: [220, 580, 240, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      //× text
      {
        id: "page10-×-text-2",
        name: "page10-×-text-2",
        type: "custom",
        coordinates: [430, 580, 450, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "×", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      //height tile
      {
        id: "page10-height-text",
        name: "page10-height-text",
        type: "custom",
        coordinates: [470, 580, 610, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.formula.height"), // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "34gc",
          padding: "5gc",
        },
      },
      // Information Analysis Panel
      {
        id: "page10-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1155, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page10.informationAnalysis.facts"),

          valueArray: [],
          toFindArray: getI18nText("pages.page10.informationAnalysis.toFind"),
          findingsArray: getI18nText(
            "pages.page10.informationAnalysis.findingsArray",
          ),

          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },
      // Instruction Text
      {
        id: "page10-instruction-text",
        name: "page10-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page10.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page10-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: "quizCompleted", // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 10 },
          get text() {
            const pageNumber = extractPageNumberFromId("page10-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page10-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage10"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId(
              "page10-previous-button",
            );
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId(
              "page10-previous-button",
            );
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    11: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page11-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page11.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page11-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1150, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Black background container for question text
      {
        id: "page11-area-text",
        name: "page11-area-text",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page11-20-cm-text",
        name: "page11-20-cm-text",
        type: "custom",
        coordinates: [50, 120, 940, 150], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page11-40-cm-text",
        name: "page11-40-cm-text",
        type: "custom",
        coordinates: [50, 490, 940, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page11-h-text",
        name: "page11-h-text",
        type: "custom",
        coordinates: [550, 210, 700, 230], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.h"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page11-pizza-image-one",
        name: "page11-pizza-image-one",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page11-pizza-image-one",
          elementName: "page11-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      //height tile
      {
        id: "page11-height-text",
        name: "page11-height-text",
        type: "custom",
        coordinates: [50, 580, 200, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.formula.height"), // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "34gc",
          padding: "5gc",
        },
      },
      //eqaul to
      {
        id: "page11-equal-to-text",
        name: "page11-equal-to-text",
        type: "custom",
        coordinates: [220, 580, 240, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //300 tile
      {
        id: "page11-300-text-tile",
        name: "page11-300-text-tile",
        type: "custom",
        coordinates: [260, 580, 410, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: 300, // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      //× text
      {
        id: "page11-divide-text",
        name: "page11-divide-text",
        type: "custom",
        coordinates: [430, 580, 450, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "÷", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      // 30 tile — (½)(20+40) = 30, so 300 = 30 × h
      {
        id: "page11-30-text",
        name: "page11-30-text",
        type: "custom",
        coordinates: [470, 580, 610, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "30", // (½) × (sum of parallel sides) = 30
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "5gc",
        },
      },
      //eqaul to
      {
        id: "page11-equal-to-text-2",
        name: "page11-equal-to-text-2",
        type: "custom",
        coordinates: [630, 580, 650, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // tile
      //tile 1
      {
        id: "page11-tile-1",
        name: "page11-tile-1",
        type: "tile",
        coordinates: [670, 580, 820, 680],
        zIndex: 1000,
        props: {
          componentType: "TileComponent",
          mode: "focus", // Start in out-of-focus mode
          text: "",
          backgroundColor: "#746B18",
          borderColor: "#ffffff", // White border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#ffffff", // Black text
          fontSize: "60gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      //cm
      {
        id: "page11-cm-text-2",
        name: "page11-cm-text-2",
        type: "custom",
        coordinates: [850, 580, 880, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.cm"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //number pad
      {
        id: "page11-number-pad",
        name: "page11-number-pad",
        type: "number-pad-panel",
        coordinates: [1155, 100, 1595, 800],
        zIndex: "var(--z-elevated)",
        props: {
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "4px solid #D2691E",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page11-feedback-textbox')
          destinations: [
            {
              destinationId: "page11-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "10",
              // correctValue: question[currentQuizIndex]?.box1Numpad.correctValue,
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page11.numpad.tile1.correct"),
              incorrectFeedback: getI18nText(
                "pages.page11.numpad.tile1.inCorrect",
              ),
              emptyFeedback: getI18nText("pages.page11.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "35%", // Height percentage for feedback text area
          buttonGridHeight: "51%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: getI18nText("buttons.showHint", "show 💡"),
          },

          numberButtons: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "45gc",
            fontWeight: "bold",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: getI18nText("buttons.check", "CHECK"),
          },
        },
      },

      // Instruction Text
      {
        id: "page11-instruction-text",
        name: "page11-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page11.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page11-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: "quizCompleted", // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 11 },
          get text() {
            const pageNumber = extractPageNumberFromId("page11-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page11-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage11"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId(
              "page11-previous-button",
            );
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId(
              "page11-previous-button",
            );
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
        },
      },
    ],
    12: [
      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: "page12-header-text",
        name: "header-text",
        type: "custom",
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page12.headerText"),
          backgroundColor: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
          border: "none",
          borderRadius: "0gc",
          textColor: "#F59E0B", // Golden/yellow color like in the image
          fontSize: "40gc",
          padding: "15gc",
          fontWeight: "normal",
        },
      },

      // Black background container for question text
      {
        id: "page12-question-background",
        name: "question-background",
        type: "custom",
        coordinates: [10, 100, 1150, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "1gc",
          padding: "0gc",
        },
      },

      // Black background container for question text
      {
        id: "page12-area-text",
        name: "page12-area-text",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.areaText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "black",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // a = 20 cm
      {
        id: "page12-20-cm-text",
        name: "page12-20-cm-text",
        type: "custom",
        coordinates: [50, 120, 940, 150], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.a"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // b = 40 cm
      {
        id: "page12-40-cm-text",
        name: "page12-40-cm-text",
        type: "custom",
        coordinates: [50, 490, 940, 510], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.b"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // h = ?
      {
        id: "page12-h-text",
        name: "page12-h-text",
        type: "custom",
        coordinates: [430, 210, 730, 230], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.findH"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#0000E1",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //1/5 pizza image
      {
        id: "page12-pizza-image-one",
        name: "page12-pizza-image-one",
        type: "custom",
        coordinates: [50, 180, 940, 460], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: "ImageStackComponent",
          id: "page12-pizza-image-one",
          elementName: "page12-pizza-image-one",
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: "assets/trapezoid2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },
      //height tile
      {
        id: "page12-height-text",
        name: "page12-height-text",
        type: "custom",
        coordinates: [50, 580, 200, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.formula.height"), // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "34gc",
          padding: "5gc",
        },
      },
      //eqaul to
      {
        id: "page12-equal-to-text",
        name: "page12-equal-to-text",
        type: "custom",
        coordinates: [220, 580, 240, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //300 tile
      {
        id: "page12-300-text-tile",
        name: "page12-300-text-tile",
        type: "custom",
        coordinates: [260, 580, 410, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: 300, // Empty text, just for background
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      //× text
      {
        id: "page12-×-text",
        name: "page12-×-text",
        type: "custom",
        coordinates: [430, 580, 450, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "÷ ", // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },

      // 30 tile — same as page 11
      {
        id: "page12-30-text",
        name: "page12-30-text",
        type: "custom",
        coordinates: [470, 580, 610, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "30", // (½) × (sum of parallel sides) = 30
          backgroundColor: "#524e4e", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "5gc",
        },
      },
      //eqaul to
      {
        id: "page12-equal-to-text-2",
        name: "page12-equal-to-text-2",
        type: "custom",
        coordinates: [630, 580, 650, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.equalTo"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      // tile
      //tile 1
      {
        id: "page12-tile-1",
        name: "page12-tile-1",
        type: "tile",
        coordinates: [670, 580, 820, 680],
        zIndex: 1000,
        props: {
          componentType: "TileComponent",
          mode: "focus", // Start in out-of-focus mode
          text: "10",
          backgroundColor: "#524e4e",
          borderColor: "none", // White border
          borderWidth: "0gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#ffffff", // Black text
          fontSize: "48gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      //cm
      {
        id: "page12-cm-text-2",
        name: "page12-cm-text-2",
        type: "custom",
        coordinates: [850, 580, 880, 680], // Same coordinates as question text box (+50gc)
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.side.cm"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "48gc",
          padding: "0gc",
        },
      },
      //'page12-summary-text',

      {
        id: "page12-summary-text",
        name: "page12-summary-text",
        type: "custom",
        coordinates: [25, 710, 900, 760], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page12.summary"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFFFFF",
          fontSize: "40gc",
          padding: "0gc",
        },
      },
      // Information Analysis Panel
      {
        id: "page12-information-analysis-panel",
        name: "information-analysis-panel",
        type: "custom",
        coordinates: [1155, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: "InformationAnalysisComponent",
          factsArray: getI18nText("pages.page12.informationAnalysis.facts"),

          valueArray: [],
          toFindArray: getI18nText("pages.page12.informationAnalysis.toFind"),
          findingsArray: getI18nText(
            "pages.page12.informationAnalysis.findingsArray",
          ),

          headerText: getI18nText("components.informationAnalysis.headerText"),
          factsTitle: getI18nText("components.informationAnalysis.factsTitle"),
          valueTitle: getI18nText("components.informationAnalysis.valueTitle"),
          toFindTitle: getI18nText(
            "components.informationAnalysis.toFindTitle",
          ),
        },
      },

      // Instruction Text
      {
        id: "page12-instruction-text",
        name: "page12-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page12.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "36gc",
          padding: "15gc",
          fontWeight: "normal",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },

      // Tap Animation GIF
      {
        id: "page12-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1370, 840, 1420, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
          initialVisible: true,
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1370, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: "quizCompleted", // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 11 },
          fontSize: "32gc",
          get text() {
            const pageNumber = extractPageNumberFromId("page12-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page12-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonpage12"),
                );
              }
            } else if (nav && nav.next === null) {
              window.location.reload();
              // On last page, "Start Over" functionality
              console.log("🔄 [Next Button] Last page - Starting over");
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
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
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId(
              "page12-previous-button",
            );
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId(
              "page12-previous-button",
            );
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) {
                window.playCarClickSound("previous");
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.prev },
                  }),
                );
                console.log(
                  "📄 [Previous Button]",
                  getI18nText("messages.previousButtonPage1"),
                );
              }
            }
          },
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
            "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)",
          );
          console.log(
            "🔄 [Navigation] Treating as APP RELOAD with next question",
          );

          // Simplified navigation - always reset to 0
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset"),
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log(
            "✅ [Navigation] Updated window.currentQuestionIndex to:",
            newIndex,
          );

          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;

          console.log(
            "✅ [Navigation]",
            getI18nText("messages.navigationComplete"),
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
            "⚠️ [UI] forceAppUpdate not available, React may not re-render",
          );
        }

        // Page 2 removed - no longer needed

        console.log("✅ [UI] updateQuestionDependentElements completed");
      };

      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText("buttons.startOver");
      };

      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;

      console.log("✅ [PageConfig] Direct function assignment completed");
      console.log(
        "🔍 [PageConfig] window.advanceToNextQuestion type:",
        typeof window.advanceToNextQuestion,
      );
      console.log(
        "🔍 [PageConfig] window.updateQuestionDependentElements type:",
        typeof window.updateQuestionDependentElements,
      );
    } catch (error) {
      console.error(
        "❌ [PageConfig] Error in direct function assignment:",
        error,
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
        if (confirm(getI18nText("messages.pageStatesCleared"))) {
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
              sourceText,
            );

            // Try to update number pad target first (if destination is a number pad)
            if (
              window.numberPadCallbacks &&
              window.numberPadCallbacks[destinationId]
            ) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(
                `✅ [PageConfig] Updated number pad ${destinationId} target to:`,
                sourceText,
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
                sourceText,
              );
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(
                  `🔄 [PageConfig] Destination element ${destinationId} not found, retrying... (${retryCount + 1}/${maxRetries})`,
                );
                setTimeout(() => {
                  window.updateTargetIDText(
                    sourceId,
                    destinationId,
                    retryCount + 1,
                  );
                }, retryDelay);
              } else {
                console.warn(
                  `⚠️ [PageConfig] Destination element not found: ${destinationId} after ${maxRetries} retries`,
                );
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(
                `🔄 [PageConfig] Source element ${sourceId} not found, retrying... (${retryCount + 1}/${maxRetries})`,
              );
              setTimeout(() => {
                window.updateTargetIDText(
                  sourceId,
                  destinationId,
                  retryCount + 1,
                );
              }, retryDelay);
            } else {
              console.warn(
                `⚠️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries`,
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
    // DISABLED: Elements don't exist in this applet
    /*
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          window.updateTargetIDText('page2-map-table-R1C1', 'page2-number-pad');
        }
      });
    }
    */

    console.log(
      "✅ PageConfig initialized - pages and functions available globally",
    );
    console.log(
      "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states",
    );
    console.log(
      "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element",
    );
  }

  return optimizedPages;
};

// Initialize immediately
console.log("🔄 [PageConfig] About to call initializePageConfig...");
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  "🔄 [PageConfig] initializePageConfig completed, result:",
  typeof OptimizedGridPositionPages,
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
