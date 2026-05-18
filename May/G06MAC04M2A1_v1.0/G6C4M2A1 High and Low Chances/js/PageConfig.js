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
  10: { prev: 9, next: null },
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

/** When landing on a sequence page, mark page incomplete so completion-gated UI resets. */
const setPageCompletedForSequence = (pageNumber) => {
  if (typeof window === "undefined" || pageNumber == null) return;
  if (
    window.PageCompletionManager &&
    typeof window.PageCompletionManager.setPageCompleted === "function"
  ) {
    window.PageCompletionManager.setPageCompleted(pageNumber, false);
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
        coordinates: [200, 15, 1400, 105], // Positioned below question text box
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
          textAlign: "center",
          allowHTML: true,
        },
      },
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [100, 300, 1500, 600], // Positioned below question text box
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
        coordinates: [650, 750, 700, 870],
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
        coordinates: [650, 750, 950, 850],
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
        coordinates: [10, 5, 450, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page2.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          textAlign: "center",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //machine background
      {
        id: "page2-kapsul-machine-black-background",
        name: "page2-kapsul-machine-black-background",
        type: "custom",
        coordinates: [455, 5, 1595, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: "",
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page2 kapsul machine 
      {
        id: "page2-kapsul-machine",
        name: "page2-kapsul-machine",
        type: "custom",
        coordinates: [455, 5, 1595, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          serveColorOrder: [3], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 1, // page 2 only allows a single Serve
          color1: "#e74c3c",
          color2: "#f1c40f",
          color3: "#3498db",
          color4: "#ff8ec7",
          onServe: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeTapHidden", {
                detail: { pageNumber: 2 },
              }),
            );
          },
          onSceneComplete: (scene) => {
            if (typeof window === "undefined" || !scene || scene.index !== 1) {
              return;
            }
            window.dispatchEvent(
              new CustomEvent("quizCompleted", {
                detail: { pageNumber: 2 },
              }),
            );
          },
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
        id: "page2-tap-animation-serve",
        name: "tap-animation-serve",
        type: "custom",
        coordinates: [1050, 400, 1110, 470],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          initialVisible: true,
          hideOnEvent: "capsuleServeTapHidden",
          hideOnEventFilter: { pageNumber: 2 },
          persistHiddenOnHideEvent: true,
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
          initialVisible: false, // Hidden until quiz is completed
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for specific page
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
        coordinates: [10, 5, 450, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page3.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      // page3  black background
      {
        id: "page3-image1-black-background",
        name: "page3-image1-black-background",
        type: "custom",
        coordinates: [455, 5, 1595, 800], // Positioned below question text box
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
      // page2 kapsul machine 
      {
        id: "page3-kapsul-machine",
        name: "page3-kapsul-machine",
        type: "custom",
        coordinates: [455, 5, 1595, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          interactionPageNumber: 3,
          serveColorOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#e74c3c",
          color2: "#e74c3c",
          color3: "#e74c3c",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 3 },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeLockChanged", {
                detail: { pageNumber: 3, locked: true },
              }),
            );
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: { pageNumber: 3, drawCount, colorNumber },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 3 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page3-capsule-serve-tracker",
        name: "page3-capsule-serve-tracker",
        type: "custom",
        coordinates: [470, 670, 1580, 780],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '69.5%',
          pageNumber: 3,
          totalSlots: 10,
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {
            1: "#D81629",
            4: "#6AA94C",
          },
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
          initialVisible: false, // Hidden until quiz is completed
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for specific page
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
                  getI18nText("messages.nextButtonpage3", ""),
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

      // maintext
      {
        id: "page4-main-text",
        name: "page4-main-text",
        type: "custom",
        coordinates: [20, 50, 900, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // machine background
      {
        id: "page4-machine-background",
        name: "page4-machine-background",
        type: "custom",
        coordinates: [880, 20, 1600, 750], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "#07274da4",
          border: "3gc solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page2 kapsul machine 
      {
        id: "page4-kapsul-machine",
        name: "page4-kapsul-machine",
        type: "custom",
        coordinates: [855, 5, 1595, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          disableServeAction: true,
          serveColorOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#e74c3c",
          color2: "#e74c3c",
          color3: "#e74c3c",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 4 },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: { pageNumber: 4, drawCount, colorNumber },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 4 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page4-capsule-serve-tracker",
        name: "page4-capsule-serve-tracker",
        type: "custom",
        coordinates: [900, 500, 1580, 580],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '42.5%',
          pageNumber: 4,
          totalSlots: 10,
          prefilledServeOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1],
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {
            1: "#D81629",
            4: "#6AA94C",
          },
        },
      },
      // maintext
      {
        id: "page4-seven-of-ten-text",
        name: "page4-seven-of-ten-text",
        type: "custom",
        coordinates: [900, 650, 1595, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.sevenOfTenText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page4-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 790, 700, 910],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 790, 950, 890],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.continue");
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
    5: [
      // page5 talk text box black background
      {
        id: "page5-talk-text-box-black-background",
        name: "page5-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 450, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      // page5  black background
      {
        id: "page5-image1-black-background",
        name: "page5-image1-black-background",
        type: "custom",
        coordinates: [455, 5, 1595, 800], // Positioned below question text box
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
      // page2 kapsul machine 
      {
        id: "page5-kapsul-machine",
        name: "page5-kapsul-machine",
        type: "custom",
        coordinates: [455, 5, 1595, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          disableServeAction: true,
          serveColorOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#e74c3c",
          color2: "#e74c3c",
          color3: "#e74c3c",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 5 },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: { pageNumber: 5, drawCount, colorNumber },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 5 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page5-capsule-serve-tracker",
        name: "page5-capsule-serve-tracker",
        type: "custom",
        coordinates: [470, 670, 1580, 780],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '69.5%',
          pageNumber: 5,
          totalSlots: 10,
          prefilledServeOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1],
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {
            1: "#D81629",
            4: "#6AA94C",
          },
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
                  getI18nText("messages.nextButtonpage5", ""),
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
      // page6 talk text box black background
      {
        id: "page6-talk-text-box-black-background",
        name: "page6-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 450, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      // page6  black background
      {
        id: "page6-image1-black-background",
        name: "page6-image1-black-background",
        type: "custom",
        coordinates: [455, 5, 1595, 800], // Positioned below question text box
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
      // page2 kapsul machine 
      {
        id: "page6-kapsul-machine",
        name: "page6-kapsul-machine",
        type: "custom",
        coordinates: [455, 5, 1595, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          interactionPageNumber: 6,
          serveColorOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#6AA94C",
          color2: "#6AA94C",
          color3: "#D81629",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 6 },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeLockChanged", {
                detail: { pageNumber: 6, locked: true },
              }),
            );
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: { pageNumber: 6, drawCount, colorNumber },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 6 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page6-capsule-serve-tracker",
        name: "page6-capsule-serve-tracker",
        type: "custom",
        coordinates: [470, 670, 1580, 780],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '69.5%',
          pageNumber: 6,
          totalSlots: 10,
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "2gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {
            1: "#6AA94C",
            3: "#D81629",
          },
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
          initialVisible: false, // Hidden until quiz is completed
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 6 }, // Only enable for specific page
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
                  getI18nText("messages.nextButtonpage6", ""),
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

      // maintext
      {
        id: "page7-main-text",
        name: "page7-main-text",
        type: "custom",
        coordinates: [20, 50, 890, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // machine background
      {
        id: "page7-machine-background",
        name: "page7-machine-background",
        type: "custom",
        coordinates: [885, 20, 1600, 750], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "#07274da4",
          border: "3gc solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // maintext
      {
        id: "page7-seven-of-ten-text",
        name: "page7-seven-of-ten-text",
        type: "custom",
        coordinates: [900, 650, 1595, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.sevenOfTenText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page2 kapsul machine 
      {
        id: "page7-kapsul-machine",
        name: "page7-kapsul-machine",
        type: "custom",
        coordinates: [855, 5, 1595, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          disableServeAction: true,
          serveColorOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#6AA94C",
          color2: "#6AA94C",
          color3: "#D81629",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 7 },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: { pageNumber: 7, drawCount, colorNumber },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 7 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page7-capsule-serve-tracker",
        name: "page7-capsule-serve-tracker",
        type: "custom",
        coordinates: [900, 500, 1580, 580],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '42.5%',
          pageNumber: 7,
          totalSlots: 10,
          prefilledServeOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1],
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {

            1: "#6AA94C",
            3: "#D81629",
          },
        },
      },
      // Tap Animation GIF
      {
        id: "page7-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 790, 700, 910],
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
        coordinates: [650, 790, 950, 890],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.continue");
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
    8: [
      // page8 talk text box black background
      {
        id: "page8-talk-text-box-black-background",
        name: "page8-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 450, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page8.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "2px solid #70ACC7",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      // page8  black background
      {
        id: "page8-image1-black-background",
        name: "page8-image1-black-background",
        type: "custom",
        coordinates: [455, 5, 1595, 800], // Positioned below question text box
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
      {
        id: "page8-kapsul-machine",
        name: "page8-kapsul-machine",
        type: "custom",
        coordinates: [455, 5, 1595, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          disableServeAction: true,
          serveColorOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#6AA94C",
          color2: "#6AA94C",
          color3: "#e74c3c",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 8 },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: { pageNumber: 8, drawCount, colorNumber },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 8 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page8-capsule-serve-tracker",
        name: "page8-capsule-serve-tracker",
        type: "custom",
        coordinates: [470, 670, 1580, 780],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '69.5%',
          pageNumber: 8,
          totalSlots: 10,
          prefilledServeOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1],
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {
            1: "#6AA94C",
            3: "#D81629",
          },
        },
      },
      // page8-instruction-text
      {
        id: "page8-instruction-text",
        name: "page8-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page8.instructionText", ""),
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
        id: "page8-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
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
                  getI18nText("messages.nextButtonpage8", ""),
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

      // Previous button - Three Layer Structure
      {
        id: "page8-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    
    9: [

      
      
      {
        id: "page9-chance-Depends-Text",
        name: "page9-chance-Depends-Text",
        type: "custom",
        coordinates: [550, 100, 1050, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.chanceDependsText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "48gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //page9-more-Text
      {
        id: "page9-more-Text",
        name: "page9-more-Text",
        type: "custom",
        coordinates: [100, 620, 300, 720], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.moreText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "44gc",
          textAlign:'right',
          padding: "15gc",
          allowHtml: true,
        },
      },
      //page9-equal-Sign-Text
      {
        id: "page9-equal-Sign-Text",
        name: "page9-equal-Sign-Text",
        type: "custom",
        coordinates: [310, 620, 350, 720], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.equalSign", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "44gc",
          textAlign:'right',
          padding: "15gc",
          allowHtml: true,
        },
      },
      //gettingRed1 text
      {
        id: "page9-getting-Red1-Text",
        name: "page9-getting-Red1-Text",
        type: "custom",
        coordinates: [370, 620, 840, 720], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.gettingRed1", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "44gc",
          textAlign:'left',
          padding: "15gc",
          allowHtml: true,
        },
      },
      {
        id: "page9-kapsul-machine-1",
        name: "page9-kapsul-machine-1",
        type: "custom",
        coordinates: [5, 5, 740, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          disableServeAction: true,
          serveColorOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#e74c3c",
          color2: "#e74c3c",
          color3: "#e74c3c",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 9, serveChannel: "page9-left" },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: {
                  pageNumber: 9,
                  serveChannel: "page9-left",
                  drawCount,
                  colorNumber,
                },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 9 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page9-capsule-serve-tracker-1",
        name: "page9-capsule-serve-tracker-1",
        type: "custom",
        coordinates: [20, 500, 900, 580],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '42.5%',
          pageNumber: 9,
          serveChannel: "page9-left",
          totalSlots: 10,
          prefilledServeOrder: [1, 1, 1, 4, 4, 1, 4, 1, 1, 1],
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {
            1: "#D81629",
            4: "#6AA94C",
          },
        },
      },
      // page2 kapsul machine 
      {
        id: "page9-kapsul-machine",
        name: "page9-kapsul-machine",
        type: "custom",
        coordinates: [855, 5, 1595, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "CapsuleMachineLottiePagePanel",
          get animationData() {
            return typeof window !== "undefined"
              ? window.capsuleMachineAnimationData
              : null;
          },
          assetBasePath: "assets/",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
          showControls: false,
          showActions: false,
          showScenes: false,
          autoplay: false,
          loop: false,
          useSvgActionClicks: true,
          svgClickDataNames: {
            fill: ["refill", "FILL"],
            serve: ["serve", "SERVE"],
          },
          pillPathMarkers: ["85,-12.518", "12.518999"],
          invertPillFillServeOrder: false,
          lottieScale: 1.296,
          disableFillAction: true,
          disableServeAction: true,
          serveColorOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1], // optional: any length, 1–4 = color1–4, repeats; Fill uses [0] for drop new
          prefillMachine: true, // optional: start as after Fill (serves=1, hold last frame of fill scene)
          maxDraws: 10,
          color1: "#6AA94C",
          color2: "#6AA94C",
          color3: "#D81629",
          color4: "#6AA94C",
          onFill: () => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeReset", {
                detail: { pageNumber: 9, serveChannel: "page9-right" },
              }),
            );
          },
          onServe: ({ drawCount, colorNumber }) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
              new CustomEvent("capsuleServeProgress", {
                detail: {
                  pageNumber: 9,
                  serveChannel: "page9-right",
                  drawCount,
                  colorNumber,
                },
              }),
            );
            if (drawCount === 10) {
              window.dispatchEvent(
                new CustomEvent("quizCompleted", {
                  detail: { pageNumber: 9 },
                }),
              );
            }
          },
        },
      },
      {
        id: "page9-capsule-serve-tracker",
        name: "page9-capsule-serve-tracker",
        type: "custom",
        coordinates: [900, 500, 1580, 580],
        zIndex: 56,
        props: {
          componentType: "CapsuleServeTrackerComponent",
          width: '42.5%',
          pageNumber: 9,
          serveChannel: "page9-right",
          totalSlots: 10,
          prefilledServeOrder: [1, 1, 1, 1, 1, 3, 1, 3, 1, 1],
          fillDelayMs: 1800,
          pillSize: "50gc",
          boxBorderWidth: "1gc",
          boxBorderRadius: "5gc",
          boxFontSize: "30gc",
          boxGap: "3gc",
          boxPadding: "",
          boxBorderStyleEmpty: "dashed",
          boxBorderStyleFilled: "solid",
          hideNumberWhenFilled: true,
          colorMap: {

            1: "#6AA94C",
            3: "#D81629",
          },
        },
      },
      //page9-fewer-Text
      {
        id: "page9-fewer-Text",
        name: "page9-fewer-Text",
        type: "custom",
        coordinates: [920, 620, 1120, 720], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.fewerText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "44gc",
          textAlign:'right',
          padding: "15gc",
          allowHtml: true,
        },
      },
      //page9-equal-Sign-Text
      {
        id: "page9-equal-Sign-Text",
        name: "page9-equal-Sign-Text",
        type: "custom",
        coordinates: [1120, 620, 1130, 720], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.equalSign", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "44gc",
          textAlign:'right',
          padding: "15gc",
          allowHtml: true,
        },
      },
      //gettingRed1 text
      {
        id: "page9-getting-Red2-Text",
        name: "page9-getting-Red2-Text",
        type: "custom",
        coordinates: [1179, 620, 1600, 720], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.gettingRed2", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "44gc",
          textAlign:'left',
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page9-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 790, 700, 910],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 790, 950, 890],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver");
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
                  getI18nText("messages.nextButtonPage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              window.location.reload();
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
    // Page 5: lift bag then lift eraser; when both done, enable Next and TapGif
    window.pageSequenceConfig[5] = {
      steps: ["liftBag", "liftEraser"],
      enableOnComplete: ["page5-next-button", "page5-tap-animation"],
      stepToButtonId: {
        liftBag: "page5-lift-bag-button",
        liftEraser: "page5-lift-eraser-button",
      },
    };
    // Page 8: lift feather then lift watermelon; when both done, enable Next and TapGif
    window.pageSequenceConfig[8] = {
      steps: ["liftFeather", "liftWatermelon"],
      enableOnComplete: ["page8-next-button", "page8-tap-animation"],
      stepToButtonId: {
        liftFeather: "page8-lift-eraser-button",
        liftWatermelon: "page8-lift-watermelon-button",
      },
    };
    // Page 11: lift feather then lift watermelon; when both done, enable Next and TapGif
    window.pageSequenceConfig[11] = {
      steps: ["liftStone", "liftPencil"],
      enableOnComplete: ["page11-next-button", "page11-tap-animation"],
      stepToButtonId: {
        liftStone: "page11-lift-stone-button",
        liftPencil: "page11-lift-pencil-button",
      },
    };
    // When entering a page with a sequence, reset state and hide Next/TapGif until complete
    const handlePageChanged = (event) => {
      const page = event.detail?.page ?? event.detail?.pageNumber;
      if (page == null) return;
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
