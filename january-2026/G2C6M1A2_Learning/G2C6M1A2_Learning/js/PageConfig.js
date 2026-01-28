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
  7: { prev: 6, next: null },
  8: { prev: 7, next: 9 },
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: 14 },
  14: { prev: 13, next: null },
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
    return getI18nText("buttons.startOver", "");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next", "");
};

// ===== PAGE SEQUENCE STATE (for lift-bag / lift-eraser style flows) =====
// Reusable for any page that has step-by-step actions before enabling Next/TapGif.
// Config: { [pageNumber]: { steps: ['step1','step2'], enableOnComplete: ['next-button-id','tap-id'], stepToButtonId: { step1: 'btn-id', step2: 'btn-id' } } }
// Store: { [pageNumber]: { step1: boolean, step2: boolean } }

const getPageSequenceConfig = (pageNumber) => {
  if (typeof window === "undefined" || !window.pageSequenceConfig) return null;
  return window.pageSequenceConfig[pageNumber] || null;
};

const getPageSequenceStepDone = (pageNumber, stepKey) => {
  if (typeof window === "undefined" || !window.pageSequenceStateStore)
    return false;
  const state = window.pageSequenceStateStore[pageNumber];
  return state && state[stepKey] === true;
};

const setPageSequenceStepDone = (pageNumber, stepKey, value = true) => {
  if (typeof window === "undefined") return;
  if (!window.pageSequenceStateStore) window.pageSequenceStateStore = {};
  if (!window.pageSequenceStateStore[pageNumber])
    window.pageSequenceStateStore[pageNumber] = {};
  window.pageSequenceStateStore[pageNumber][stepKey] = value;
};

const initPageSequenceState = (pageNumber) => {
  const config = getPageSequenceConfig(pageNumber);
  if (!config || !config.steps) return;
  if (typeof window === "undefined") return;
  if (!window.pageSequenceStateStore) window.pageSequenceStateStore = {};
  window.pageSequenceStateStore[pageNumber] = {};
  config.steps.forEach((step) => {
    window.pageSequenceStateStore[pageNumber][step] = false;
  });
  console.log(
    "📄 [PageSequence] Initialized state for page",
    pageNumber,
    window.pageSequenceStateStore[pageNumber],
  );
};

const isPageSequenceComplete = (pageNumber) => {
  const config = getPageSequenceConfig(pageNumber);
  if (!config || !config.steps || !config.steps.length) return true;
  return config.steps.every((step) =>
    getPageSequenceStepDone(pageNumber, step),
  );
};

/** Lift-bag button: disabled after step is done. */
const isPageSequenceStepButtonDisabled = (pageNumber, stepKey) => {
  return getPageSequenceStepDone(pageNumber, stepKey);
};

/** Lift-eraser button: disabled until previous step is done; disabled after own step is done. */
const isPageSequenceStepButtonDisabledByOrder = (pageNumber, stepKey) => {
  const config = getPageSequenceConfig(pageNumber);
  if (!config || !config.steps) return false;
  const idx = config.steps.indexOf(stepKey);
  if (idx < 0) return false;
  if (idx === 0) return getPageSequenceStepDone(pageNumber, stepKey);
  const prevStep = config.steps[idx - 1];
  if (!getPageSequenceStepDone(pageNumber, prevStep)) return true;
  return getPageSequenceStepDone(pageNumber, stepKey);
};

/** Next button / tap gif: disabled until sequence is complete. */
const isNextDisabledByPageSequence = (pageNumber) => {
  const config = getPageSequenceConfig(pageNumber);
  if (!config) return false;
  return !isPageSequenceComplete(pageNumber);
};

/**
 * Notify that sequence state changed for a page. When the full sequence is complete,
 * marks the page completed in PageCompletionManager so TapGif/NextButton etc. can enable.
 */
const setPageCompletedForSequence = (pageNumber) => {
  if (typeof window === "undefined") return;
  if (isPageSequenceComplete(pageNumber) && window.PageCompletionManager) {
    window.PageCompletionManager.markPageCompleted(pageNumber);
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
  const handleQuizCompleted = (event, pageNumber) => {
    const eventPageNumber = event.detail?.pageNumber;
    console.log(
      `🔍 [DynamicImage] Quiz completed event received for page ${eventPageNumber}, current page: ${pageNumber}`,
    );
    if (eventPageNumber === eventPageNumber) {
      return true;
    } else {
      return false;
    }
  };
  const questionBottom_Y = 150;
  const questionTextSize = "28gc";

  // Return optimized GridPositionPages
  return {
    1: [
      // title text
      {
        id: "page1-title-text",
        name: "page1-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page1-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 650, 700, 800],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 650, 950, 750],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.start");
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
                  getI18nText("messages.nextButtonPage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
        },
      },
    ],

    2: [
      // page1 talk text box black background
      {
        id: "page2-talk-text-box-black-background",
        name: "page2-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page2.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page2-dee-tee-instruction-image",
        name: "page2-dee-tee-instruction-image",
        type: "custom",
        coordinates: [50, 370, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-dee-tee-instruction-image",
          elementName: "page2-dee-tee-instruction-image",
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/deeTee.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // page2 image1 black background
      {
        id: "page2-image1-black-background",
        name: "page2-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page2-correct-feedback-text",
        name: "page2-correct-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 56,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isHeavy
              ? getI18nText("pages.page2.correctText")
              : "";
          },
          get mode() {
            return window.weightState?.isHeavy ? "correct" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page2-wrong-feedback-text",
        name: "page2-wrong-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isLight
              ? getI18nText("pages.page2.wrongText")
              : "";
          },
          get mode() {
            return window.weightState?.isLight ? "incorrect" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      // page2 image1 gold border
      {
        id: "page2-image1-border",
        name: "page2-image1-border",
        type: "custom",
        coordinates: [520, 170, 920, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page2-lift-bag-text
      {
        id: "page2-lift-ballon-text",
        name: "page2-lift-ballon-text",
        type: "custom",
        coordinates: [550, 180, 910, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //school bag image
      {
        id: "page2-ballon-image",
        name: "page2-ballon-image",
        type: "custom",
        coordinates: [450, 200, 1000, 650], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-ballon-image",
          elementName: "page2-ballon-image",
          currentPage: 2,
          coordinates: [200, 260, 500, 660],
          zIndex: 58,
          images: [
            {
              src: "assets/ballon.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftBallon.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [550, 200, 800, 600], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift bag button (enabled on render; disabled after click)
      {
        id: "page2-lift-ballon-button",
        name: "page2-lift-ballon-button",
        type: "button",
        coordinates: [570, 650, 870, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page2.liftBallon");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabled(2, "liftBallon");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("wrong");
            }
            setPageSequenceStepDone(2, "liftBallon", true);
            if (window.weightState) window.weightState.isLight = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 2, action: "liftBallon" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(2);
          },
          get backgroundColor() {
            return window.weightState?.isLight ? "salmon" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page2 image2 gold border
      {
        id: "page2-image2-border",
        name: "page2-image2-border",
        type: "custom",
        coordinates: [1110, 170, 1510, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page2-eraser-text
      {
        id: "page2-wooden-box-text",
        name: "page2-wooden-box-text",
        type: "custom",
        coordinates: [1120, 180, 1490, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //eraser image
      {
        id: "page2-wooden-box-image",
        name: "page2-wooden-box-image",
        type: "custom",
        coordinates: [1090, 270, 1545, 630], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-wooden-box-image",
          elementName: "page2-wooden-box-image",
          currentPage: 2,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/woodenBox.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftWoodenBox.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [1125, 220, 1425, 620], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift eraser button (enabled after lift bag; disabled after click)
      {
        id: "page2-lift-wooden-button",
        name: "page2-lift-wooden-button",
        type: "button",
        coordinates: [1165, 650, 1470, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page2.liftWoodenBox");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabledByOrder(2, "liftWoodenBox");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("correct");
            }
            setPageSequenceStepDone(2, "liftWoodenBox", true);
            if (window.weightState) window.weightState.isHeavy = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 2, action: "liftWoodenBox" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(2);
          },
          get backgroundColor() {
            return window.weightState?.isHeavy ? "green" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page2-instruction-text
      {
        id: "page2-instruction-text",
        name: "page2-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page2.instructionText", ""),
          // When lift-bag + lift-eraser are both done, update instruction text
          sequenceCompleteTextKey: getI18nText(
            "pages.page2.instructionText2",
            "",
          ),
          sequenceCompletePageNumber: 2,
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHtml: true,
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
          imageAlt: getI18nText("common.tapAlt", ""),
          tapPageNumber: 2,
        },
      },

      // Optimized Next button (disabled until lift-bag + lift-eraser sequence complete)
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
          get disabled() {
            return isNextDisabledByPageSequence(2);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page2-next-button");
            const nav = getPageNavigation(pageNumber);
            if (window.weightState) {
              window.weightState.isHeavy = false;
              window.weightState.isLight = false;
            }
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
                  getI18nText("messages.nextButtonpage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    3: [
      // page1 talk text box black background
      {
        id: "page3-talk-text-box-black-background",
        name: "page3-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page3-dee-tee-instruction-image",
        name: "page3-dee-tee-instruction-image",
        type: "custom",
        coordinates: [50, 370, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-dee-tee-instruction-image",
          elementName: "page3-dee-tee-instruction-image",
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/deeTee.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // page3 image1 black background
      {
        id: "page3-image1-black-background",
        name: "page3-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page3-correct-feedback-text",
        name: "page3-correct-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isLight
              ? getI18nText("pages.page3.correctText")
              : "";
          },
          get mode() {
            return window.weightState?.isLight ? "correct" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page3-wrong-feedback-text",
        name: "page3-wrong-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 56,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isHeavy
              ? getI18nText("pages.page3.wrongText")
              : "";
          },
          get mode() {
            return window.weightState?.isHeavy ? "incorrect" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      // page3 image1 gold border
      {
        id: "page3-image1-border",
        name: "page3-image1-border",
        type: "custom",
        coordinates: [520, 170, 920, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3-lift-bag-text
      {
        id: "page3-lift-paper-text",
        name: "page3-lift-paper-text",
        type: "custom",
        coordinates: [550, 180, 910, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //school bag image
      {
        id: "page3-paper-image",
        name: "page3-paper-image",
        type: "custom",
        coordinates: [450, 260, 1000, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-paper-image",
          elementName: "page3-paper-image",
          currentPage: 2,
          coordinates: [200, 290, 500, 600],
          zIndex: 58,
          images: [
            {
              src: "assets/paper.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftPaper.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [550, 230, 800, 600], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift bag button (enabled on render; disabled after click)
      {
        id: "page3-lift-paper-button",
        name: "page3-lift-paper-button",
        type: "button",
        coordinates: [570, 650, 870, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page3.liftPaper");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabled(3, "liftPaper");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("correct");
            }
            setPageSequenceStepDone(3, "liftPaper", true);
            if (window.weightState) window.weightState.isLight = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 3, action: "liftPaper" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(3);
          },
          get backgroundColor() {
            return window.weightState?.isLight ? "green" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page3 image2 gold border
      {
        id: "page3-image2-border",
        name: "page3-image2-border",
        type: "custom",
        coordinates: [1110, 170, 1510, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3-eraser-text
      {
        id: "page3-chair-text",
        name: "page3-chair-text",
        type: "custom",
        coordinates: [1120, 180, 1490, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //eraser image
      {
        id: "page3-chair-image",
        name: "page3-chair-image",
        type: "custom",
        coordinates: [1090, 270, 1545, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-chair-image",
          elementName: "page3-chair-image",
          currentPage: 2,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/chair.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftChair.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [1125, 240, 1425, 640], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift eraser button (enabled after lift bag; disabled after click)
      {
        id: "page3-lift-wooden-button",
        name: "page3-lift-wooden-button",
        type: "button",
        coordinates: [1165, 650, 1470, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page3.liftChair");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabledByOrder(3, "liftChair");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("wrong");
            }
            setPageSequenceStepDone(3, "liftChair", true);
            if (window.weightState) window.weightState.isHeavy = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 3, action: "liftChair" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(3);
          },
          get backgroundColor() {
            return window.weightState?.isHeavy ? "salmon" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page3-instruction-text
      {
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page3.instructionText", ""),
          // When lift-bag + lift-eraser are both done, update instruction text
          sequenceCompleteTextKey: getI18nText(
            "pages.page3.instructionText2",
            "",
          ),
          sequenceCompletePageNumber: 3,
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHtml: true,
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
          imageAlt: getI18nText("common.tapAlt", ""),
          tapPageNumber: 3,
        },
      },

      // Optimized Next button (disabled until lift-bag + lift-eraser sequence complete)
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
          get disabled() {
            return isNextDisabledByPageSequence(3);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page3-next-button");
            const nav = getPageNavigation(pageNumber);
            if (window.weightState) {
              window.weightState.isHeavy = false;
              window.weightState.isLight = false;
            }
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
                  getI18nText("messages.nextButtonpage3", ""),
                );
              }
            } else if (nav && nav.next === null) {
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    4: [
      // page1 talk text box black background
      {
        id: "page4-talk-text-box-black-background",
        name: "page4-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page4-dee-tee-instruction-image",
        name: "page4-dee-tee-instruction-image",
        type: "custom",
        coordinates: [50, 370, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-dee-tee-instruction-image",
          elementName: "page4-dee-tee-instruction-image",
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/deeTee.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // page4 image1 black background
      {
        id: "page4-image1-black-background",
        name: "page4-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page4-correct-feedback-text",
        name: "page4-correct-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 56,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isHeavy
              ? getI18nText("pages.page4.correctText")
              : "";
          },
          get mode() {
            return window.weightState?.isHeavy ? "correct" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      //wrong feedback text
      {
        id: "page4-wrong-feedback-text",
        name: "page4-wrong-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isLight
              ? getI18nText("pages.page4.wrongText")
              : "";
          },
          get mode() {
            return window.weightState?.isLight ? "incorrect" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      // page4 image1 gold border
      {
        id: "page4-image1-border",
        name: "page4-image1-border",
        type: "custom",
        coordinates: [520, 170, 920, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page4-lift-bag-text
      {
        id: "page4-lift-leaf-text",
        name: "page4-lift-leaf-text",
        type: "custom",
        coordinates: [550, 180, 910, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //school bag image
      {
        id: "page4-leaf-image",
        name: "page4-leaf-image",
        type: "custom",
        coordinates: [450, 260, 1000, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-leaf-image",
          elementName: "page4-leaf-image",
          currentPage: 4,
          coordinates: [200, 290, 500, 600],
          zIndex: 58,
          images: [
            {
              src: "assets/leaf.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftLeaf.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [550, 230, 800, 600], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift bag button (enabled on render; disabled after click)
      {
        id: "page4-lift-leaf-button",
        name: "page4-lift-leaf-button",
        type: "button",
        coordinates: [570, 650, 870, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page4.liftLeaf");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabled(3, "liftLeaf");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("wrong");
            }
            setPageSequenceStepDone(4, "liftLeaf", true);
            if (window.weightState) window.weightState.isLight = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 4, action: "liftLeaf" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(4);
          },
          get backgroundColor() {
            return window.weightState?.isLight ? "salmon" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page4 image2 gold border
      {
        id: "page4-image2-border",
        name: "page4-image2-border",
        type: "custom",
        coordinates: [1110, 170, 1510, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page4-eraser-text
      {
        id: "page4-book-text",
        name: "page4-book-text",
        type: "custom",
        coordinates: [1120, 180, 1490, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //eraser image
      {
        id: "page4-book-image",
        name: "page4-book-image",
        type: "custom",
        coordinates: [1090, 270, 1545, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-book-image",
          elementName: "page4-book-image",
          currentPage: 4,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/book.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftBook.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [1125, 240, 1425, 640], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift eraser button (enabled after lift bag; disabled after click)
      {
        id: "page4-lift-book-button",
        name: "page4-lift-book-button",
        type: "button",
        coordinates: [1165, 650, 1470, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page4.liftBook");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabledByOrder(4, "liftBook");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("correct");
            }
            setPageSequenceStepDone(4, "liftBook", true);
            if (window.weightState) window.weightState.isHeavy = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 4, action: "liftBook" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(4);
          },
          get backgroundColor() {
            return window.weightState?.isHeavy ? "green" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page4-instruction-text
      {
        id: "page4-instruction-text",
        name: "page4-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page4.instructionText", ""),
          // When lift-bag + lift-eraser are both done, update instruction text
          sequenceCompleteTextKey: getI18nText(
            "pages.page4.instructionText2",
            "",
          ),
          sequenceCompletePageNumber: 4,
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHtml: true,
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
          imageAlt: getI18nText("common.tapAlt", ""),
          tapPageNumber: 4,
        },
      },

      // Optimized Next button (disabled until lift-bag + lift-eraser sequence complete)
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
          get disabled() {
            return isNextDisabledByPageSequence(4);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page4-next-button");
            const nav = getPageNavigation(pageNumber);
            if (window.weightState) {
              window.weightState.isHeavy = false;
              window.weightState.isLight = false;
            }
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
                  getI18nText("messages.nextButtonpage4", ""),
                );
              }
            } else if (nav && nav.next === null) {
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    5: [
      // page1 talk text box black background
      {
        id: "page5-talk-text-box-black-background",
        name: "page5-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page5-dee-tee-instruction-image",
        name: "page5-dee-tee-instruction-image",
        type: "custom",
        coordinates: [50, 370, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-dee-tee-instruction-image",
          elementName: "page5-dee-tee-instruction-image",
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/deeTee.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // page5 image1 black background
      {
        id: "page5-image1-black-background",
        name: "page5-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page5-correct-feedback-text",
        name: "page5-correct-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 56,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isLight
              ? getI18nText("pages.page5.correctText")
              : "";
          },
          get mode() {
            return window.weightState?.isLight ? "correct" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      //wrong feedback text
      {
        id: "page5-wrong-feedback-text",
        name: "page5-wrong-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isHeavy
              ? getI18nText("pages.page5.wrongText")
              : "";
          },
          get mode() {
            return window.weightState?.isHeavy ? "incorrect" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      // page5 image1 gold border
      {
        id: "page5-image1-border",
        name: "page5-image1-border",
        type: "custom",
        coordinates: [520, 170, 920, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page5-lift-bag-text
      {
        id: "page5-lift-laptop-text",
        name: "page5-lift-laptop-text",
        type: "custom",
        coordinates: [550, 180, 910, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //school bag image
      {
        id: "page5-laptop-image",
        name: "page5-laptop-image",
        type: "custom",
        coordinates: [450, 260, 1000, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-laptop-image",
          elementName: "page5-laptop-image",
          currentPage: 4,
          coordinates: [200, 290, 500, 600],
          zIndex: 58,
          images: [
            {
              src: "assets/laptop.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftLaptop.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [550, 230, 800, 600], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift bag button (enabled on render; disabled after click)
      {
        id: "page5-lift-laptop-button",
        name: "page5-lift-laptop-button",
        type: "button",
        coordinates: [570, 650, 870, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page5.liftLaptop");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabled(5, "liftLaptop");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("wrong");
            }
            setPageSequenceStepDone(5, "liftLaptop", true);
            if (window.weightState) window.weightState.isHeavy = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 5, action: "liftLaptop" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(5);
          },
          get backgroundColor() {
            return window.weightState?.isHeavy ? "salmon" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page5 image2 gold border
      {
        id: "page5-image2-border",
        name: "page5-image2-border",
        type: "custom",
        coordinates: [1110, 170, 1510, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page5-eraser-text
      {
        id: "page5-toy-car-text",
        name: "page5-toy-car-text",
        type: "custom",
        coordinates: [1120, 180, 1490, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //eraser image
      {
        id: "page5-toy-car-image",
        name: "page5-toy-car-image",
        type: "custom",
        coordinates: [1090, 270, 1545, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-toy-car-image",
          elementName: "page5-toy-car-image",
          currentPage: 4,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/toycar.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftToyCar.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [1125, 240, 1425, 640], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift eraser button (enabled after lift bag; disabled after click)
      {
        id: "page5-lift-toy-car-button",
        name: "page5-lift-toy-car-button",
        type: "button",
        coordinates: [1165, 650, 1470, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page5.liftToyCar");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabledByOrder(5, "liftToyCar");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("correct");
            }
            setPageSequenceStepDone(5, "liftToyCar", true);
            if (window.weightState) window.weightState.isLight = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 5, action: "liftToyCar" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(5);
          },
          get backgroundColor() {
            return window.weightState?.isLight ? "green" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page5-instruction-text
      {
        id: "page5-instruction-text",
        name: "page5-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page5.instructionText", ""),
          // When lift-bag + lift-eraser are both done, update instruction text
          sequenceCompleteTextKey: getI18nText(
            "pages.page5.instructionText2",
            "",
          ),
          sequenceCompletePageNumber: 5,
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHtml: true,
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
          imageAlt: getI18nText("common.tapAlt", ""),
          tapPageNumber: 5,
        },
      },

      // Optimized Next button (disabled until lift-bag + lift-eraser sequence complete)
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
          get disabled() {
            return isNextDisabledByPageSequence(5);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page5-next-button");
            const nav = getPageNavigation(pageNumber);
            if (window.weightState) {
              window.weightState.isHeavy = false;
              window.weightState.isLight = false;
            }
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
                  getI18nText("messages.nextButtonpage5", ""),
                );
              }
            } else if (nav && nav.next === null) {
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    6: [
      // page1 talk text box black background
      {
        id: "page6-talk-text-box-black-background",
        name: "page6-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page6-dee-tee-instruction-image",
        name: "page6-dee-tee-instruction-image",
        type: "custom",
        coordinates: [50, 370, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page6-dee-tee-instruction-image",
          elementName: "page6-dee-tee-instruction-image",
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/deeTee.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
          ],
        },
      },

      // page6 image1 black background
      {
        id: "page6-image1-black-background",
        name: "page6-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //correct feedback text
      {
        id: "page6-correct-feedback-text",
        name: "page6-correct-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isHeavy
              ? getI18nText("pages.page6.correctText")
              : "";
          },
          get mode() {
            return window.weightState?.isHeavy ? "correct" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      //wrong feedback text
      {
        id: "page6-wrong-feedback-text",
        name: "page6-wrong-feedback-text",
        type: "custom",
        coordinates: [570, 50, 1470, 150], // Positioned below question text box
        zIndex: 56,
        props: {
          componentType: "FeedbackTextboxComponent",
          get text() {
            return window.weightState?.isLight
              ? getI18nText("pages.page6.wrongText")
              : "";
          },
          get mode() {
            return window.weightState?.isLight ? "incorrect" : "normal";
          },
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },
      // page6 image1 gold border
      {
        id: "page6-image1-border",
        name: "page6-image1-border",
        type: "custom",
        coordinates: [520, 170, 920, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page6-lift-bag-text
      {
        id: "page6-lift-pumpkin-text",
        name: "page6-lift-pumpkin-text",
        type: "custom",
        coordinates: [550, 180, 910, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //school bag image
      {
        id: "page6-pumpkin-image",
        name: "page6-pumpkin-image",
        type: "custom",
        coordinates: [450, 260, 1000, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page6-pumpkin-image",
          elementName: "page6-pumpkin-image",
          currentPage: 4,
          coordinates: [200, 290, 500, 600],
          zIndex: 58,
          images: [
            {
              src: "assets/pumpkin.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftPumpkin.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [550, 230, 800, 600], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift bag button (enabled on render; disabled after click)
      {
        id: "page6-lift-pumpkin-button",
        name: "page6-lift-pumpkin-button",
        type: "button",
        coordinates: [570, 650, 870, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page6.liftPumpkin");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabled(6, "liftPumpkin");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("wrong");
            }
            setPageSequenceStepDone(6, "liftPumpkin", true);
            if (window.weightState) window.weightState.isHeavy = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 6, action: "liftPumpkin" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(6);
          },
          get backgroundColor() {
            return window.weightState?.isHeavy ? "green" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page6 image2 gold border
      {
        id: "page6-image2-border",
        name: "page6-image2-border",
        type: "custom",
        coordinates: [1110, 170, 1510, 610], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid gold",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page6-eraser-text
      {
        id: "page6-grape-text",
        name: "page6-grape-text",
        type: "custom",
        coordinates: [1120, 180, 1490, 220], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "32gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //eraser image
      {
        id: "page6-grape-image",
        name: "page6-grape-image",
        type: "custom",
        coordinates: [1090, 270, 1545, 600], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page6-grape-image",
          elementName: "page6-grape-image",
          currentPage: 4,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/grape.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/liftGrape.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [1125, 240, 1425, 640], // Image 3
            },
          ],
          // hideImageOnQuizComplete: true,    // Hide first image
          // showImageOnQuizComplete: [1]
        },
      },
      // lift eraser button (enabled after lift bag; disabled after click)
      {
        id: "page6-lift-grape-button",
        name: "page6-lift-grape-button",
        type: "button",
        coordinates: [1165, 650, 1470, 730],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page6.liftGrape");
          },
          get disabled() {
            return isPageSequenceStepButtonDisabledByOrder(6, "liftGrape");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("correct");
            }
            setPageSequenceStepDone(6, "liftGrape", true);
            if (window.weightState) window.weightState.isLight = true;
            window.dispatchEvent(
              new CustomEvent("pageActionCompleted", {
                detail: { pageNumber: 6, action: "liftGrape" },
              }),
            );
            if (typeof window.forceAppUpdate === "function")
              window.forceAppUpdate();
            setPageCompletedForSequence(6);
          },
          get backgroundColor() {
            return window.weightState?.isLight ? "salmon" : "#FAAC48";
          },
          borderRadius: "13gc",
          fontSize: "40gc",
          border: "none",
          color: "#ffff",
          cursor: "pointer",
        },
      },

      // page6-instruction-text
      {
        id: "page6-instruction-text",
        name: "page6-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page6.instructionText", ""),
          // When lift-bag + lift-eraser are both done, update instruction text
          sequenceCompleteTextKey: getI18nText(
            "pages.page6.instructionText2",
            "",
          ),
          sequenceCompletePageNumber: 6,
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHtml: true,
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
          imageAlt: getI18nText("common.tapAlt", ""),
          tapPageNumber: 6,
        },
      },

      // Optimized Next button (disabled until lift-bag + lift-eraser sequence complete)
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
          get disabled() {
            return isNextDisabledByPageSequence(6);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page6-next-button");
            const nav = getPageNavigation(pageNumber);
            if (window.weightState) {
              window.weightState.isHeavy = false;
              window.weightState.isLight = false;
            }
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
                  getI18nText("messages.nextButtonpage6", ""),
                );
              }
            } else if (nav && nav.next === null) {
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
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
        id: "page6-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],

    7: [
      // title text
      {
        id: "page7-title-text",
        name: "page7-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // maintext
      {
        id: "page7-main-text",
        name: "page7-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page7-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 650, 700, 800],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 650, 950, 750],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver");
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
                  getI18nText("messages.nextButtonPage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText(
                  "messages.lastPageStartingOver",
                  "Last page - Starting over",
                ),
              );
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
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

  // ----- Page sequence state (lift-bag / lift-eraser style flows) -----
  // For any page with step-by-step actions: set pageSequenceConfig[pageNumber] = { steps: ['step1','step2'], ... }.
  // Use get disabled() => isPageSequenceStepButtonDisabled(page, 'step1') or isPageSequenceStepButtonDisabledByOrder(page, 'step2'),
  // and for Next use get disabled() => isNextDisabledByPageSequence(page). On last step onClick, call setPageCompleted(page, true).
  if (typeof window !== "undefined") {
    window.pageSequenceStateStore = window.pageSequenceStateStore || {};
    window.pageSequenceConfig = window.pageSequenceConfig || {};

    // Page 2: lift balloon then lift wooden box; when both done, enable Next and TapGif
    window.pageSequenceConfig[2] = {
      steps: ["liftBallon", "liftWoodenBox"],
      enableOnComplete: ["page2-next-button", "page2-tap-animation"],
      stepToButtonId: {
        liftBallon: "page2-lift-ballon-button",
        liftWoodenBox: "page2-lift-wooden-button",
      },
    };
    window.pageSequenceConfig[3] = {
      steps: ["liftPaper", "liftChair"],
      enableOnComplete: ["page3-next-button", "page3-tap-animation"],
      stepToButtonId: {
        liftBallon: "page3-lift-paper-button",
        liftWoodenBox: "page3-lift-chair-button",
      },
    };
    // Page 5: lift bag then lift eraser; when both done, enable Next and TapGif
    window.pageSequenceConfig[4] = {
      steps: ["liftLeaf", "liftBook"],
      enableOnComplete: ["page3-next-button", "page3-tap-animation"],
      stepToButtonId: {
        liftBag: "page3-lift-leaf-button",
        liftEraser: "page5-lift-book-button",
      },
    };
    // Page 8: lift feather then lift watermelon; when both done, enable Next and TapGif
    window.pageSequenceConfig[5] = {
      steps: ["liftLaptop", "liftToyCar"],
      enableOnComplete: ["page5-next-button", "page5-tap-animation"],
      stepToButtonId: {
        liftLaptop: "page5-lift-laptop-button",
        liftToyCar: "page5-lift-toy-car-button",
      },
    };
    // Page 11: lift feather then lift watermelon; when both done, enable Next and TapGif
    window.pageSequenceConfig[6] = {
      steps: ["liftPumpkin", "liftGrape"],
      enableOnComplete: ["page6-next-button", "page6-tap-animation"],
      stepToButtonId: {
        liftPumpkin: "page6-lift-pumpkin-button",
        liftGrape: "page6-lift-grape-button",
      },
    };
    // When entering a page with a sequence, reset state and hide Next/TapGif until complete
    const handlePageChanged = (event) => {
      const page = event.detail?.page ?? event.detail?.pageNumber;
      if (page == null) return;
      if (page === 2 && window.weightState) {
        window.weightState.isHeavy = false;
        window.weightState.isLight = false;
      }
      const config = getPageSequenceConfig(page);
      if (config && config.steps && config.steps.length) {
        initPageSequenceState(page);
        setPageCompletedForSequence(page);
        if (typeof window.forceAppUpdate === "function")
          window.forceAppUpdate();
      }
    };
    window.addEventListener("pageChanged", handlePageChanged);
    // If we load directly on a sequence page, init on next tick
    setTimeout(() => {
      const p = window.getCurrentPage?.();
      if (p != null && getPageSequenceConfig(p)) {
        if (p === 2 && window.weightState) {
          window.weightState.isHeavy = false;
          window.weightState.isLight = false;
        }
        initPageSequenceState(p);
        setPageCompletedForSequence(p);
        if (typeof window.forceAppUpdate === "function")
          window.forceAppUpdate();
      }
    }, 0);
  }

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

    // Expose page sequence helpers for pages with step-by-step flows (e.g. lift-bag → lift-eraser)
    window.getPageSequenceConfig = getPageSequenceConfig;
    window.getPageSequenceStepDone = getPageSequenceStepDone;
    window.setPageSequenceStepDone = setPageSequenceStepDone;
    window.initPageSequenceState = initPageSequenceState;
    window.isPageSequenceComplete = isPageSequenceComplete;
    window.isPageSequenceStepButtonDisabled = isPageSequenceStepButtonDisabled;
    window.isPageSequenceStepButtonDisabledByOrder =
      isPageSequenceStepButtonDisabledByOrder;
    window.isNextDisabledByPageSequence = isNextDisabledByPageSequence;

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
          const currentIndex =
            typeof window !== "undefined" &&
            window.currentQuestionIndex !== undefined
              ? window.currentQuestionIndex
              : 0;
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset", ""),
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

          // Clear all component state stores
          if (typeof window !== "undefined") {
            // Clear quiz panel states
            if (window.quizPanelStateStore) {
              window.quizPanelStateStore = {};
              console.log("✅ [Navigation] Cleared quizPanelStateStore");
            }

            // Clear fill blanks states
            if (window.fillBlanksStateStore) {
              window.fillBlanksStateStore = {};
              console.log("✅ [Navigation] Cleared fillBlanksStateStore");
            }

            // Clear calculation steps states
            if (window.calculationStepsStateStore) {
              window.calculationStepsStateStore = {};
              console.log("✅ [Navigation] Cleared calculationStepsStateStore");
            }

            // Clear any other state stores that might exist
            if (window.stageComponentStateStore) {
              window.stageComponentStateStore = {};
              console.log("✅ [Navigation] Cleared stageComponentStateStore");
            }
          }

          console.log(
            "✅ [Navigation]",
            getI18nText("messages.navigationComplete", ""),
          );

          // Navigate to page 1
          if (typeof window !== "undefined") {
            if (window.changePageAndNotify) {
              window.changePageAndNotify(1);
              console.log(
                "✅ [Navigation] Navigated to page 1 via changePageAndNotify",
              );
            } else if (window.navigateToPage) {
              window.navigateToPage(1);
              console.log(
                "✅ [Navigation] Navigated to page 1 via navigateToPage",
              );
            } else {
              // Fallback: dispatch page change event
              window.dispatchEvent(
                new CustomEvent("pageChanged", { detail: { page: 1 } }),
              );
              console.log(
                "✅ [Navigation] Dispatched page change event to page 1",
              );
            }
          }

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
        return getI18nText("buttons.startOver", "");
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
        if (
          confirm(
            getI18nText(
              "messages.pageStatesCleared",
              "Page states have been cleared. Reload the page to start fresh?",
            ),
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
