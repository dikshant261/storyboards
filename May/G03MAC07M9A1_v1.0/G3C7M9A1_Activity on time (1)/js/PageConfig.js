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
  16: { prev: 15, next: 17 },
  17: { prev: 16, next: 18 },
  18: { prev: 17, next: 19 },
  19: { prev: 18, next: 20 },
  20: { prev: 19, next: 21 },
  21: { prev: 20, next: 22 },
  22: { prev: 21, next: null },
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

/** When landing on a sequence page, mark page “not completed” for PageCompletionManager (Next/UI gates). */
const setPageCompletedForSequence = (pageNumber) => {
  if (typeof window === "undefined" || pageNumber == null) return;
  const mgr = window.PageCompletionManager;
  if (mgr && typeof mgr.setPageCompleted === "function") {
    mgr.setPageCompleted(pageNumber, false);
  }
};

//button state
window.quizUIState = {
  page2: {
    unlocked: false
  }
};
window.addEventListener("quizCompleted", (e) => {

  const { pageNumber } = e.detail;

  if (!window.quizUIState[`page${pageNumber}`]) {
    window.quizUIState[`page${pageNumber}`] = {};
  }

  window.quizUIState[`page${pageNumber}`].unlocked = true;

  console.log("✅ UI Unlocked");

  window.forceAppUpdate?.();
});
// ===== GRID POSITION PAGES =====
window.question = (() => {
  if (typeof i18n === "undefined") return [];
  const q = i18n.t("quiz.questions");
  return Array.isArray(q) ? q : [];
})();
window.currentQuizIndex = 0;
window.isLastQuestion = false,
  window.lastInstruction = false
window.advanceToNextQuestionQuiz = function () {

  console.log("✅ Function Called");

  if (!window.question?.length) {
    console.log("❌ question missing");
    return;
  }

  window.currentQuizIndex++;

  console.log("➡ Next Index:", window.currentQuizIndex);

  if (window.currentQuizIndex >= window.question.length) {
    window.lastInstruction = true;
  }

  if (window.currentQuizIndex >= window.question.length) {
    window.isLastQuestion = true;
  }

  const nextQuestion = window.question[window.currentQuizIndex];

  window.dispatchEvent(
    new CustomEvent("questionChanged", {
      detail: nextQuestion
    })
  );

  // ⭐ IMPORTANT
  window.forceAppUpdate?.();
};
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
        coordinates: [120, 35, 1480, 220],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.title"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#FFE135",
          fontSize: "40gc",
          padding: "20gc",
          allowHtml: true,
        },
      },
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [100, 200, 1500, 640],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.mainText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "38gc",
          padding: "24gc",
          allowHtml: true,
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [520, 680, 1080, 780],
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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


      // page2  black background
      {
        id: "page2-image1-black-background",
        name: "page2-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page2-routine-text
      {
        id: "page2-routine-text",
        name: "page2-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page2.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page2-andi-image",
        name: "page2-andi-image",
        type: "container",
        coordinates: [5, 180, 1100, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/andi.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // // Clock component - centered, large (styled like reference image)
      // {
      //   id: "page2-clock",
      //   name: "page2-analog-clock",
      //   type: "custom",
      //   coordinates: [550, 50, 1050, 580],
      //   zIndex: 100,
      //   props: {
      //     componentType: "ClockComponent",
      //     clockShape: "circle",
      //     size: "380gc",
      //     time: { hour: 6, minute: 0, second: 0 },
      //     realTime: false,
      //     // Hand visibility - no second hand
      //     showHourHand: true,
      //     showMinuteHand: true,
      //     showSecondHand: false,
      //     // Hand styles - both black like reference image
      //     hourHandColor: "#222222",
      //     hourHandLength: "90gc",
      //     hourHandWidth: "14gc",
      //     minuteHandColor: "#222222",
      //     minuteHandLength: "100gc",
      //     minuteHandWidth: "8gc",
      //     // Clock face - cream/beige with 3D blue border
      //     faceColor: "#FFF8E7",
      //     borderColor: "#2E86DE", // Blue border
      //     borderWidth: "40gc",
      //     useFaceGradient: true,
      //     showFaceShimmer: true,
      //     use3DBorder: true,
      //     showTickMarks: true,
      //     tickMarkColor: "#E74C3C", // Red tick marks
      //     tickMarkLength: "12gc",
      //     tickMarkWidth: "3gc",
      //     // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
      //     showNumbers: true,
      //     numberColor: "#333333",
      //     numberColors: [
      //       "#E74C3C", // 12 - Red
      //       "#27AE60", // 1 - Green
      //       "#17A2B8", // 2 - Teal
      //       "#27AE60", // 3 - Green
      //       "#F39C12", // 4 - Orange
      //       "#17A2B8", // 5 - Teal
      //       "#3498DB", // 6 - Blue
      //       "#9B59B6", // 7 - Purple
      //       "#3498DB", // 8 - Blue
      //       "#E91E63", // 9 - Pink/Magenta
      //       "#3498DB", // 10 - Blue
      //       "#F39C12"  // 11 - Orange
      //     ],
      //     numberFontSize: "38gc",
      //     numberOffset: "50gc",
      //     useRomanNumerals: false,
      //     // Center dot - yellow/gold
      //     showCenterDot: true,
      //     centerDotColor: "#F1C40F",
      //     centerDotSize: "20gc",
      //     // Features
      //     showMinuteTicks: false,
      //     showShadows: true,
      //     interactive: false,
      //     // Animation speed
      //     minuteHandSpeed: 5,
      //     // Arc visualization props
      //     arcColor: "#2E86DE",
      //     arcFillOpacity: 0.35,
      //     angleMarkerSize: 0.3,
      //     angleMarkerColor: "#FF9900",
      //     angleMarkerFillColor: "#FF9900",
      //     angleMarkerFillOpacity: 0.4,
      //     labelOffsetX: 0,
      //     labelOffsetY: 0,
      //     labelColor: "#000000",
      //     labelFontSize: "30gc"
      //   }
      // },

      // page2  right background
      {
        id: "page2-right background",
        name: "page2-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page2-instruction-text',
          get text() {


            return getI18nText("pages.page2.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),

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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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


      // page3  black background
      {
        id: "page3-image1-black-background",
        name: "page3-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page3-routine-text
      {
        id: "page3-routine-text",
        name: "page3-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page3-andi-image",
        name: "page3-andi-image",
        type: "container",
        coordinates: [5, 180, 900, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/wakeUp.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page3-clock",
        name: "page3-analog-clock",
        type: "custom",
        // 70% base box; last nudge: +50gc right, +50gc up
        coordinates: [715, 154, 1135, 546],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 6, minute: 5, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - hour red, minute blue, with tails (×0.7 vs prior)
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          // Clock face - metallic texture matching clock-showcase.html (faceTexture + dark border)
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          // Colorful numbers - each number a different color
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#9B59B6", // 3 - Purple
            "#F39C12", // 4 - Orange
            "#1ABC9C", // 5 - Turquoise
            "#3498DB", // 6 - Blue
            "#E91E63", // 7 - Pink
            "#2ECC71", // 8 - Emerald
            "#8E44AD", // 9 - Violet
            "#00BCD4", // 10 - Cyan
            "#FF5722"  // 11 - Deep orange
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc"
        }
      },

      // page3  right background
      {
        id: "page3-right background",
        name: "page3-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [1160, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page3.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page3.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 40, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 95,
          optionButtonHeight: 75,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page3.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page3-instruction-text',
          get text() {


            return getI18nText("pages.page3.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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


      // page4  black background
      {
        id: "page4-image1-black-background",
        name: "page4-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page4-routine-text
      {
        id: "page4-routine-text",
        name: "page4-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page4-andi-image",
        name: "page4-andi-image",
        type: "container",
        coordinates: [5, 180, 900, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/pressCloth.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // Clock component - match page3 (70% scale, metallic, same placement nudge)
      {
        id: "page4-clock",
        name: "page4-analog-clock",
        type: "custom",
        // Same as page3-clock
        coordinates: [715, 154, 1135, 546],
        zIndex: 100,
        props: {
          id: "page4-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 6, minute: 5, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - hour red, minute blue, with tails (×0.7 vs prior)
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          // Clock face - metallic texture matching clock-showcase.html (faceTexture + dark border)
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          // Colorful numbers - each number a different color
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#9B59B6", // 3 - Purple
            "#F39C12", // 4 - Orange
            "#1ABC9C", // 5 - Turquoise
            "#3498DB", // 6 - Blue
            "#E91E63", // 7 - Pink
            "#2ECC71", // 8 - Emerald
            "#8E44AD", // 9 - Violet
            "#00BCD4", // 10 - Cyan
            "#FF5722"  // 11 - Deep orange
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          // Sector from hour 1 → 10 (clockwise, 270° = 45 min); orange 50% + blink
          showHourMarkSector: true,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: true,
          showArcAfterMinuteAnimation: false,
        }
      },

      // page4  right background
      {
        id: "page4-right background",
        name: "page4-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      //quiz panel
      {
        id: 'page4-quiz-panel',
        name: 'page4-quiz-panel',
        type: 'custom',
        coordinates: [1160, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page4-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page4.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page4.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 40, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 95,
          optionButtonHeight: 95,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page4.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page4-instruction-text',
          get text() {


            return getI18nText("pages.page4.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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


      // page5  black background
      {
        id: "page5-image1-black-background",
        name: "page5-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page5-routine-text
      {
        id: "page5-routine-text",
        name: "page5-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page5-andi-image",
        name: "page5-andi-image",
        type: "container",
        coordinates: [5, 180, 700, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/pressCloth.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },
      //page5-hour-text
      {
        id: "page5-hour-text",
        name: "page5-hour-text",
        type: "custom",
        coordinates: [750, 200, 800, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.hours"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box one
      {
        id: "page5-hour-box-1",
        name: "page5-hour-box-1",
        type: "custom",
        coordinates: [720, 270, 830, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '6',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box two
      {
        id: "page5-hour-box-2",
        name: "page5-hour-box-2",
        type: "custom",
        coordinates: [720, 390, 830, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '0',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //plus sign
      {
        id: "page5-plus-sign",
        name: "page5-plus-sign",
        type: "custom",
        coordinates: [650, 390, 700, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '+',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "90gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes text
      {
        id: "page5-minutes-text",
        name: "page5-minutes-text",
        type: "custom",
        coordinates: [940, 200, 1000, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.minutes"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one
      {
        id: "page5-minutes-box-1",
        name: "page5-minutes-box-1",
        type: "custom",
        coordinates: [900, 270, 1080, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page5-minutes-box-1-balue-0",
        name: "page5-minutes-box-1-balue-0",
        type: "custom",
        coordinates: [920, 270, 980, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '0',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page5-minutes-box-1-balue-5",
        name: "page5-minutes-box-1-balue-5",
        type: "custom",
        coordinates: [1000, 270, 1070, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '5',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two
      {
        id: "page5-minutes-box-2",
        name: "page5-minutes-box-2",
        type: "custom",
        coordinates: [900, 390, 1080, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page5-minutes-box-2-balue-0",
        name: "page5-minutes-box-2-balue-0",
        type: "custom",
        coordinates: [920, 390, 980, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '4',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page5-minutes-box-2-balue-5",
        name: "page5-minutes-box-2-balue-5",
        type: "custom",
        coordinates: [1000, 390, 1070, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '5',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //line
      {
        id: "page5-line-border",
        name: "page5-line-border",
        type: "textbox",
        coordinates: [660, 500, 1090, 530], // Positioned below question text box
        zIndex: 55,
        props: {

          text: '',
          backgroundColor: "transparent",
          borderTop: "3px solid orange",

        },
      },
      //tile component
      {
        id: "page5-tile-1",
        name: "page5-tile-1",
        type: "tile",
        coordinates: [720, 530, 830, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -2
      {
        id: "page5-tile-2",
        name: "page5-tile-2",
        type: "tile",
        coordinates: [900, 530, 990, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -3
      {
        id: "page5-tile-3",
        name: "page5-tile-3",
        type: "tile",
        coordinates: [1000, 530, 1090, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Number pad applies focus on load (setFocusOnLoad)
          text: "", // Empty blank tile - will be filled by number pad
          backgroundColor: "", // transparent until pad sets focus/filled
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // page5  right background
      {
        id: "page5-right background",
        name: "page5-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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

      //numpad
      {
        id: "page5-number-pad",
        name: "page5-number-pad",
        type: "number-pad-panel",
        coordinates: [1160, 10, 1595, 780],
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "none",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          setFocusOnLoad: true, // First destination (tile-3) gets focus styling on load
          checkRequiresAllTileDestinationsFilled: true, // CHECK enabled only when every tile has a value; grades all at once
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page5-feedback-textbox')
          destinations: [
            {
              destinationId: "page5-tile-3", // Quotient tile
              destinationType: "tile",
              correctValue: "0",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page5.feedback.tile3.correct"),
              incorrectFeedback: getI18nText("pages.page5.feedback.tile3.incorrect"),
              emptyFeedback: getI18nText("pages.page5.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page5-tile-2", // Quotient tile
              destinationType: "tile",
              correctValue: "5",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page5.feedback.tile2.correct"),
              incorrectFeedback: getI18nText("pages.page5.feedback.tile2.incorrect"),
              emptyFeedback: getI18nText("pages.page5.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page5-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "6",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page5.feedback.tile1.correct"),
              incorrectFeedback: getI18nText("pages.page5.feedback.tile1.incorrect"),
              emptyFeedback: getI18nText("pages.page5.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

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
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: getI18nText('pages.page5.numpadInstruction')           // Default text to display in feedback area
          }
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page5-instruction-text',
          get text() {


            return getI18nText("pages.page5.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
      // Clock component — same styling as page4-clock (coordinates unchanged for page 6 layout)
      {
        id: "page6-clock",
        name: "page6-analog-clock",
        type: "custom",
        coordinates: [350, 80, 1100, 800],
        zIndex: 100,
        props: {
          id: "page6-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 6, minute: 5, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,
        }
      },


      //page6-andi-start-text
      {
        id: "page6-andi-start-text",
        name: "page6-andi-start-text",
        type: "custom",
        coordinates: [1050, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },


      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page6-instruction-text',
        name: 'page6-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page6-instruction-text',
          get text() {


            return getI18nText("pages.page6.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
      // Clock component — same styling as page6-clock (coordinates unchanged for page 7 layout)
      {
        id: "page7-clock",
        name: "page7-analog-clock",
        type: "custom",
        coordinates: [450, 80, 1300, 800],
        zIndex: 100,
        props: {
          id: "page7-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 6, minute: 50, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,

          // Peripheral arc: dial minutes 5 → 50; labels show elapsed 0 → 45. Ring layout aligned with pages 11/15/16/21.
          showPeripheralHourArc: true,
          peripheralHourArcExpandViewBox: false,
          peripheralHourArcFromMinute: 5,
          peripheralHourArcToMinute: 50,
          peripheralHourArcClockwise: true,
          peripheralHourArcRadiusOffset: "8gc",
          peripheralHourArcColor: "#ffffff",
          peripheralHourArcWidth: "3gc",
          peripheralHourArcLinecap: "round",
          peripheralHourArcDashArray: null,
          peripheralHourArcOpacity: 1,
          peripheralHourArcShowLabels: true,
          peripheralHourArcLabelColor: "#000000",
          peripheralHourArcLabelFontSize: "28gc",
          peripheralHourArcLabelRadialOffset: "10gc",
          peripheralHourArcLabelCircleFill: "#ffffff",
          peripheralHourArcEndLabelCircleFill: "#FF9800",
          peripheralHourArcLabelCircleStroke: "#2E86DE",
          peripheralHourArcLabelCircleStrokeWidth: "2gc",
          peripheralHourArcLabelCircleRadius: "25gc",
          peripheralHourArcStartLabel: getI18nText(
            "pages.page7.peripheralArcMinuteLabels.startLabel",
          ),
          peripheralHourArcEndLabel: getI18nText(
            "pages.page7.peripheralArcMinuteLabels.endLabel",
          ),
          peripheralHourArcLabelGapFromArc: "1gc",
          peripheralHourArcShowHourLabelsBetween: false,
          peripheralHourArcSegmentLabels: getI18nText(
            "pages.page7.peripheralArcMinuteLabels.segmentLabels",
          ),
        }
      },


      //page7-andi-start-text
      {
        id: "page7-andi-start-text",
        name: "page7-andi-start-text",
        type: "custom",
        coordinates: [20, 130, 450, 400], // Positioned below question text box
        zIndex: 120, // Above page7-clock (100) so peripheral arc/labels do not cover Andi box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },


      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page7-instruction-text',
        name: 'page7-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1000, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page7-instruction-text',
          get text() {


            return getI18nText("pages.page7.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 7 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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


      // page8  black background
      {
        id: "page8-image1-black-background",
        name: "page8-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page8-routine-text
      {
        id: "page8-routine-text",
        name: "page8-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page8.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page8-andi-image",
        name: "page8-andi-image",
        type: "container",
        coordinates: [5, 180, 900, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/sittingInBus.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // Clock component — same styling as page4-clock (coordinates unchanged for page 8 layout)
      {
        id: "page8-clock",
        name: "page8-analog-clock",
        type: "custom",
        coordinates: [770, 80, 1120, 610],
        zIndex: 100,
        props: {
          id: "page8-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 8, minute: 15, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: true,
          hourMarkSectorFromHour: 3,
          hourMarkSectorToHour: 7,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: true,
          showArcAfterMinuteAnimation: false,
        }
      },

      // page8  right background
      {
        id: "page8-right background",
        name: "page8-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      //quiz panel
      {
        id: 'page8-quiz-panel',
        name: 'page8-quiz-panel',
        type: 'custom',
        coordinates: [1160, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page8-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page8.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page8.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 40, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 95,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page8.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page8-instruction-text',
        name: 'page8-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page8-instruction-text',
          get text() {


            return getI18nText("pages.page8.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 8 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
      // page9  black background
      {
        id: "page9-image1-black-background",
        name: "page9-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page9-routine-text
      {
        id: "page9-routine-text",
        name: "page9-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page9-andi-image",
        name: "page9-andi-image",
        type: "container",
        coordinates: [5, 180, 700, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/sittingInBus.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },
      //page9-hour-text
      {
        id: "page9-hour-text",
        name: "page9-hour-text",
        type: "custom",
        coordinates: [750, 200, 800, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.hours"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box one
      {
        id: "page9-hour-box-1",
        name: "page9-hour-box-1",
        type: "custom",
        coordinates: [720, 270, 830, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '8',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box two
      {
        id: "page9-hour-box-2",
        name: "page9-hour-box-2",
        type: "custom",
        coordinates: [720, 390, 830, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '0',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //plus sign
      {
        id: "page9-plus-sign",
        name: "page9-plus-sign",
        type: "custom",
        coordinates: [650, 390, 700, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '+',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "90gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes text
      {
        id: "page9-minutes-text",
        name: "page9-minutes-text",
        type: "custom",
        coordinates: [940, 200, 1000, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.minutes"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one
      {
        id: "page9-minutes-box-1",
        name: "page9-minutes-box-1",
        type: "custom",
        coordinates: [900, 270, 1080, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page9-minutes-box-1-balue-0",
        name: "page9-minutes-box-1-balue-0",
        type: "custom",
        coordinates: [920, 270, 980, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '1',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page9-minutes-box-1-balue-5",
        name: "page9-minutes-box-1-balue-5",
        type: "custom",
        coordinates: [1000, 270, 1070, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '5',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two
      {
        id: "page9-minutes-box-2",
        name: "page9-minutes-box-2",
        type: "custom",
        coordinates: [900, 390, 1080, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page9-minutes-box-2-balue-0",
        name: "page9-minutes-box-2-balue-0",
        type: "custom",
        coordinates: [920, 390, 980, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '2',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page9-minutes-box-2-balue-5",
        name: "page9-minutes-box-2-balue-5",
        type: "custom",
        coordinates: [1000, 390, 1070, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '0',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //line
      {
        id: "page9-line-border",
        name: "page9-line-border",
        type: "textbox",
        coordinates: [660, 500, 1090, 530], // Positioned below question text box
        zIndex: 55,
        props: {

          text: '',
          backgroundColor: "transparent",
          borderTop: "3px solid orange",

        },
      },
      //tile component
      {
        id: "page9-tile-1",
        name: "page9-tile-1",
        type: "tile",
        coordinates: [720, 530, 830, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -2
      {
        id: "page9-tile-2",
        name: "page9-tile-2",
        type: "tile",
        coordinates: [900, 530, 990, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -3
      {
        id: "page9-tile-3",
        name: "page9-tile-3",
        type: "tile",
        coordinates: [1000, 530, 1090, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "focus", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFEB3B", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // page9  right background
      {
        id: "page9-right background",
        name: "page9-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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


      //numpad
      {
        id: "page9-number-pad",
        name: "page9-number-pad",
        type: "number-pad-panel",
        coordinates: [1160, 10, 1595, 780],
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "none",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          setFocusOnLoad: true, // First destination (tile-3) gets focus styling on load
          checkRequiresAllTileDestinationsFilled: true, // CHECK enabled only when every tile has a value; grades all at once
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page9-feedback-textbox')
          destinations: [
            {
              destinationId: "page9-tile-3", // Quotient tile
              destinationType: "tile",
              correctValue: "5",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page9.feedback.tile3.correct"),
              incorrectFeedback: getI18nText("pages.page9.feedback.tile3.incorrect"),
              emptyFeedback: getI18nText("pages.page9.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page9-tile-2", // Quotient tile
              destinationType: "tile",
              correctValue: "3",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page9.feedback.tile2.correct"),
              incorrectFeedback: getI18nText("pages.page9.feedback.tile2.incorrect"),
              emptyFeedback: getI18nText("pages.page9.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page9-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "8",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page9.feedback.tile1.correct"),
              incorrectFeedback: getI18nText("pages.page9.feedback.tile1.incorrect"),
              emptyFeedback: getI18nText("pages.page9.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

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
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: getI18nText('pages.page9.numpadInstruction')           // Default text to display in feedback area
          }
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page9-instruction-text',
        name: 'page9-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page9-instruction-text',
          get text() {


            return getI18nText("pages.page9.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 9 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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

      {
        id: "page10-clock",
        name: "page10-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page10-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 8, minute: 15, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,
        }
      },

      //page10-andi-start-text
      {
        id: "page10-andi-start-text",
        name: "page10-andi-start-text",
        type: "custom",
        coordinates: [1050, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },


      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page10-instruction-text',
        name: 'page10-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page10-instruction-text',
          get text() {


            return getI18nText("pages.page10.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 10 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
            const pageNumber = extractPageNumberFromId("page10-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page10-previous-button");
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
      {
        id: "page11-clock",
        name: "page11-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page11-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 8, minute: 35, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,

          // Peripheral arc — labels from i18n; ring layout aligned with pages 15/16/21
          showPeripheralHourArc: true,
          peripheralHourArcExpandViewBox: false,
          peripheralHourArcFromHour: 3,
          peripheralHourArcToHour: 7,
          peripheralHourArcClockwise: true,
          peripheralHourArcRadiusOffset: "8gc",
          peripheralHourArcColor: "#ffffff",
          peripheralHourArcWidth: "3gc",
          peripheralHourArcLinecap: "round",
          peripheralHourArcDashArray: null,
          peripheralHourArcOpacity: 1,
          peripheralHourArcShowLabels: true,
          peripheralHourArcLabelColor: "#000000",
          peripheralHourArcLabelFontSize: "28gc",
          peripheralHourArcLabelRadialOffset: "10gc",
          peripheralHourArcLabelCircleFill: "#ffffff",
          peripheralHourArcEndLabelCircleFill: "#FF9800",
          peripheralHourArcLabelCircleStroke: "#2E86DE",
          peripheralHourArcLabelCircleStrokeWidth: "2gc",
          peripheralHourArcLabelCircleRadius: "25gc",
          peripheralHourArcStartLabel: getI18nText(
            "common.clockPeripheralArc3to7Labels.startLabel",
          ),
          peripheralHourArcEndLabel: getI18nText(
            "common.clockPeripheralArc3to7Labels.endLabel",
          ),
          peripheralHourArcLabelGapFromArc: "1gc",
          peripheralHourArcShowHourLabelsBetween: false,
          peripheralHourArcSegmentLabels: getI18nText(
            "common.clockPeripheralArc3to7Labels.segmentLabels",
          ),
        }
      },

      //page11-andi-start-text
      {
        id: "page11-andi-start-text",
        name: "page11-andi-start-text",
        type: "custom",
        coordinates: [20, 130, 500, 330], // Positioned below question text box
        zIndex: 120, // Above page11-clock (100) so peripheral arc/labels do not cover Andi box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page11.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },


      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page11-instruction-text',
        name: 'page11-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 950, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page11-instruction-text',
          get text() {


            return getI18nText("pages.page11.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 11 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
            const pageNumber = extractPageNumberFromId("page11-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page11-previous-button");
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


      // page12  black background
      {
        id: "page12-image1-black-background",
        name: "page12-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page12-routine-text
      {
        id: "page12-routine-text",
        name: "page12-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page12.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page12-andi-image",
        name: "page12-andi-image",
        type: "container",
        coordinates: [5, 180, 900, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/workInOffice.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // Clock component — same styling as page4-clock (coordinates unchanged for page 8 layout)
      {
        id: "page12-clock",
        name: "page12-analog-clock",
        type: "custom",
        coordinates: [770, 80, 1120, 610],
        zIndex: 100,
        props: {
          id: "page12-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 10, minute: 13, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 2.6,
          hourMarkSectorToHour: 7.9,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: true,
          showArcAfterMinuteAnimation: false,
        }
      },

      // page12  right background
      {
        id: "page12-right background",
        name: "page12-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      //quiz panel
      {
        id: 'page12-quiz-panel',
        name: 'page12-quiz-panel',
        type: 'custom',
        coordinates: [1160, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page12-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page12.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page12.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 40, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 95,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page12.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page12-instruction-text',
        name: 'page12-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page12-instruction-text',
          get text() {


            return getI18nText("pages.page12.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page12-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 12 }, // Only enable for specific page
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
            const pageNumber = extractPageNumberFromId("page12-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page12-previous-button");
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
    13: [
      // page13  black background
      {
        id: "page13-image1-black-background",
        name: "page13-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page13-routine-text
      {
        id: "page13-routine-text",
        name: "page13-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page13.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page13-andi-image",
        name: "page13-andi-image",
        type: "container",
        coordinates: [5, 180, 500, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/workInOffice.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },
      //page13-hour-text
      {
        id: "page13-hour-text",
        name: "page13-hour-text",
        type: "custom",
        coordinates: [750, 200, 800, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.hours"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box one
      {
        id: "page13-hour-box-1",
        name: "page13-hour-box-1",
        type: "custom",
        coordinates: [650, 270, 830, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour-box-1 value-1
      {
        id: "page13-hour-box-1-value-1",
        name: "page13-hour-box-1-value-1",
        type: "custom",
        coordinates: [690, 270, 720, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '1',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour-box-1 value-2
      {
        id: "page13-hour-box-1-value-2",
        name: "page13-hour-box-1-value-2",
        type: "custom",
        coordinates: [750, 270, 800, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '1',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box two
      {
        id: "page13-hour-box-2",
        name: "page13-hour-box-2",
        type: "custom",
        coordinates: [650, 390, 830, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box two value-1
      {
        id: "page13-hour-box-2-value-1",
        name: "page13-hour-box-2-value-1",
        type: "custom",
        coordinates: [690, 390, 720, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '1',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box two value-2
      {
        id: "page13-hour-box-2-value-2",
        name: "page13-hour-box-2-value-2",
        type: "custom",
        coordinates: [750, 390, 800, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '0',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minus sign
      {
        id: "page13-minus-sign",
        name: "page13-minus-sign",
        type: "custom",
        coordinates: [580, 390, 640, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '−',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "90gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes text
      {
        id: "page13-minutes-text",
        name: "page13-minutes-text",
        type: "custom",
        coordinates: [940, 200, 1000, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.minutes"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one
      {
        id: "page13-minutes-box-1",
        name: "page13-minutes-box-1",
        type: "custom",
        coordinates: [900, 270, 1080, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page13-minutes-box-1-balue-0",
        name: "page13-minutes-box-1-balue-0",
        type: "custom",
        coordinates: [920, 270, 980, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '3',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page13-minutes-box-1-balue-5",
        name: "page13-minutes-box-1-balue-5",
        type: "custom",
        coordinates: [1000, 270, 1070, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '9',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two
      {
        id: "page13-minutes-box-2",
        name: "page13-minutes-box-2",
        type: "custom",
        coordinates: [900, 390, 1080, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page13-minutes-box-2-balue-0",
        name: "page13-minutes-box-2-balue-0",
        type: "custom",
        coordinates: [920, 390, 980, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '1',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page13-minutes-box-2-balue-5",
        name: "page13-minutes-box-2-balue-5",
        type: "custom",
        coordinates: [1000, 390, 1070, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '3',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //line
      {
        id: "page13-line-border",
        name: "page13-line-border",
        type: "textbox",
        coordinates: [620, 500, 1090, 530], // Positioned below question text box
        zIndex: 55,
        props: {

          text: '',
          backgroundColor: "transparent",
          borderTop: "3px solid orange",

        },
      },
      //tile-0
      {
        id: "page13-tile-0",
        name: "page13-tile-0",
        type: "tile",
        coordinates: [640, 530, 730, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component
      {
        id: "page13-tile-1",
        name: "page13-tile-1",
        type: "tile",
        coordinates: [740, 530, 830, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -2
      {
        id: "page13-tile-2",
        name: "page13-tile-2",
        type: "tile",
        coordinates: [900, 530, 990, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -3
      {
        id: "page13-tile-3",
        name: "page13-tile-3",
        type: "tile",
        coordinates: [1000, 530, 1090, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "focus", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFEB3B", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // page13  right background
      {
        id: "page13-right background",
        name: "page13-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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

      //numpad
      {
        id: "page13-number-pad",
        name: "page13-number-pad",
        type: "number-pad-panel",
        coordinates: [1160, 10, 1595, 780],
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "none",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          setFocusOnLoad: true, // First destination (tile-3) gets focus styling on load
          checkRequiresAllTileDestinationsFilled: true, // CHECK enabled only when every tile has a value; grades all at once

          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page13-feedback-textbox')
          destinations: [
            {
              destinationId: "page13-tile-3", // Quotient tile
              destinationType: "tile",
              correctValue: "6",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page13.feedback.tile3.correct"),
              incorrectFeedback: getI18nText("pages.page13.feedback.tile3.incorrect"),
              emptyFeedback: getI18nText("pages.page13.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page13-tile-2", // Quotient tile
              destinationType: "tile",
              correctValue: "2",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page13.feedback.tile2.correct"),
              incorrectFeedback: getI18nText("pages.page13.feedback.tile2.incorrect"),
              emptyFeedback: getI18nText("pages.page13.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page13-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "1",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page13.feedback.tile4.correct"),
              incorrectFeedback: getI18nText("pages.page13.feedback.tile4.incorrect"),
              emptyFeedback: getI18nText("pages.page13.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page13-tile-0", // Quotient tile
              destinationType: "tile",
              correctValue: "0",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page13.feedback.tile1.correct"),
              incorrectFeedback: getI18nText("pages.page13.feedback.tile1.incorrect"),
              emptyFeedback: getI18nText("pages.page13.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

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
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: getI18nText('pages.page13.numpadInstruction')           // Default text to display in feedback area
          }
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page13-instruction-text',
        name: 'page13-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page13-instruction-text',
          get text() {


            return getI18nText("pages.page13.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page13-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 13 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page13-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page13-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page13-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page13-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page13-previous-button");
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
    14: [
      {
        id: "page14-clock",
        name: "page14-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page14-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 10, minute: 13, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,
        }
      },


      //page14-andi-start-text
      {
        id: "page14-andi-start-text",
        name: "page14-andi-start-text",
        type: "custom",
        coordinates: [1050, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page14.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },


      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page14-instruction-text',
        name: 'page14-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page14-instruction-text',
          get text() {


            return getI18nText("pages.page14.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page14-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page14-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 14 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page14-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page14-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page14-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page14-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page14-previous-button");
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
    15: [
      {
        id: "page15-clock",
        name: "page15-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page15-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 11, minute: 13, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,

          // Gap ring; same peripheral layout as page 21 (no face shrink, closer ring, 3gc stroke)
          showPeripheralHourArc: true,
          /** Match page 20/21 face size: do not shrink clock to fit ring inside viewBox */
          peripheralHourArcExpandViewBox: false,
          peripheralHourArcCircleGapDegrees: 21,
          peripheralHourArcGapCenterAngle: 67.5,
          peripheralHourArcClockwise: true,
          peripheralHourArcEndpointTrimDegrees: 0,
          peripheralHourArcArrowMode: "end",
          peripheralHourArcShowLabels: false,
          peripheralHourArcRadiusOffset: "8gc",
          peripheralHourArcColor: "#ffffff",
          peripheralHourArcWidth: "3gc",
          peripheralHourArcLinecap: "round",
          peripheralHourArcDashArray: null,
          peripheralHourArcOpacity: 1,
        }
      },


      //page15-andi-start-text
      {
        id: "page15-andi-start-text",
        name: "page15-andi-start-text",
        type: "custom",
        coordinates: [20, 110, 425, 400], // Positioned below question text box
        zIndex: 120, // Above page15-clock (100) so peripheral ring does not cover Andi box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page15.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      //page15-hour-text
      {
        id: "page15-hour-text",
        name: "page15-hour-text",
        type: "custom",
        coordinates: [1300, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page15.hour"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page15-instruction-text',
        name: 'page15-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page15-instruction-text',
          get text() {


            return getI18nText("pages.page15.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page15-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page15-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 15 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page15-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page15-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page15-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page15-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page15-previous-button");
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
    16: [
      {
        id: "page16-clock",
        name: "page16-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page16-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 11, minute: 39, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,

          // Arc to minute 39; end badge text 26 only (no start badge). Ring layout aligned with pages 15/21.
          showPeripheralHourArc: true,
          peripheralHourArcExpandViewBox: false,
          peripheralHourArcFromMinute: 13,
          peripheralHourArcToMinute: 39,
          peripheralHourArcClockwise: true,
          peripheralHourArcRadiusOffset: "8gc",
          peripheralHourArcColor: "#ffffff",
          peripheralHourArcWidth: "3gc",
          peripheralHourArcLinecap: "round",
          peripheralHourArcDashArray: null,
          peripheralHourArcOpacity: 1,
          peripheralHourArcShowLabels: true,
          peripheralHourArcShowStartLabel: false,
          peripheralHourArcLabelColor: "#000000",
          peripheralHourArcLabelFontSize: "28gc",
          peripheralHourArcLabelRadialOffset: "10gc",
          peripheralHourArcLabelCircleFill: "#ffffff",
          peripheralHourArcEndLabelCircleFill: "#FF9800",
          peripheralHourArcLabelCircleStroke: "#2E86DE",
          peripheralHourArcLabelCircleStrokeWidth: "2gc",
          peripheralHourArcLabelCircleRadius: "25gc",
          peripheralHourArcEndLabel: getI18nText(
            "pages.page16.peripheralArcEndLabel",
          ),
          peripheralHourArcLabelGapFromArc: "1gc",
          peripheralHourArcShowHourLabelsBetween: false,
        }
      },


      //page16-andi-start-text
      {
        id: "page16-andi-start-text",
        name: "page16-andi-start-text",
        type: "custom",
        coordinates: [20, 110, 425, 400], // Positioned below question text box
        zIndex: 120, // Above page16-clock (100) so peripheral arc/labels do not cover Andi box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page16.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      //page14-hour-text
      {
        id: "page16-hour-text",
        name: "page16-hour-text",
        type: "custom",
        coordinates: [1300, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page16.hour"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //and tetx
      {
        id: "page16-and-text",
        name: "page16-and-text",
        type: "custom",
        coordinates: [1300, 280, 1590, 300], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page16.and"),
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes text
      {
        id: "page16-minutes-text",
        name: "page16-minutes-text",
        type: "custom",
        coordinates: [1300, 350, 1590, 540], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page16.minutes"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page16-instruction-text',
        name: 'page16-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page16-instruction-text',
          get text() {


            return getI18nText("pages.page16.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page16-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page16-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 16 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page16-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page16-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page16-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page16-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page16-previous-button");
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
    17: [


      // page17  black background
      {
        id: "page17-image1-black-background",
        name: "page17-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page17-routine-text
      {
        id: "page17-routine-text",
        name: "page17-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page17.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page17-andi-image",
        name: "page17-andi-image",
        type: "container",
        coordinates: [5, 180, 1200, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/doLunch.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // // Clock component - centered, large (styled like reference image)
      // {
      //   id: "page17-clock",
      //   name: "page17-analog-clock",
      //   type: "custom",
      //   coordinates: [770, 80, 1120, 610],
      //   zIndex: 100,
      //   props: {
      //     componentType: "ClockComponent",
      //     clockShape: "circle",
      //     size: "380gc",
      //     time: { hour: 10, minute: 13, second: 0 },
      //     realTime: false,
      //     // Hand visibility - no second hand
      //     showHourHand: true,
      //     showMinuteHand: true,
      //     showSecondHand: false,
      //     // Hand styles - both black like reference image
      //     hourHandColor: "#222222",
      //     hourHandLength: "90gc",
      //     hourHandWidth: "14gc",
      //     minuteHandColor: "#222222",
      //     minuteHandLength: "100gc",
      //     minuteHandWidth: "8gc",
      //     // Clock face - cream/beige with 3D blue border
      //     faceColor: "#FFF8E7",
      //     borderColor: "#2E86DE", // Blue border
      //     borderWidth: "40gc",
      //     useFaceGradient: true,
      //     showFaceShimmer: true,
      //     use3DBorder: true,
      //     showTickMarks: true,
      //     tickMarkColor: "#E74C3C", // Red tick marks
      //     tickMarkLength: "12gc",
      //     tickMarkWidth: "3gc",
      //     // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
      //     showNumbers: true,
      //     numberColor: "#333333",
      //     numberColors: [
      //       "#E74C3C", // 12 - Red
      //       "#27AE60", // 1 - Green
      //       "#17A2B8", // 2 - Teal
      //       "#27AE60", // 3 - Green
      //       "#F39C12", // 4 - Orange
      //       "#17A2B8", // 5 - Teal
      //       "#3498DB", // 6 - Blue
      //       "#9B59B6", // 7 - Purple
      //       "#3498DB", // 8 - Blue
      //       "#E91E63", // 9 - Pink/Magenta
      //       "#3498DB", // 10 - Blue
      //       "#F39C12"  // 11 - Orange
      //     ],
      //     numberFontSize: "38gc",
      //     numberOffset: "50gc",
      //     useRomanNumerals: false,
      //     // Center dot - yellow/gold
      //     showCenterDot: true,
      //     centerDotColor: "#F1C40F",
      //     centerDotSize: "20gc",
      //     // Features
      //     showMinuteTicks: false,
      //     showShadows: true,
      //     interactive: false,
      //     // Animation speed
      //     minuteHandSpeed: 5,
      //     // Arc visualization props
      //     arcColor: "#2E86DE",
      //     arcFillOpacity: 0.35,
      //     angleMarkerSize: 0.3,
      //     angleMarkerColor: "#FF9900",
      //     angleMarkerFillColor: "#FF9900",
      //     angleMarkerFillOpacity: 0.4,
      //     labelOffsetX: 0,
      //     labelOffsetY: 0,
      //     labelColor: "#000000",
      //     labelFontSize: "30gc"
      //   }
      // },

      // page17  right background
      {
        id: "page17-right background",
        name: "page17-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      //quiz panel
      {
        id: 'page17-quiz-panel',
        name: 'page17-quiz-panel',
        type: 'custom',
        coordinates: [1160, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page17-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page17.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page17.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 40, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 95,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page17.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page17-instruction-text',
        name: 'page17-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page17-instruction-text',
          get text() {


            return getI18nText("pages.page17.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page17-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page17-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 17 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page17-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page17-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page17-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page17-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page17-previous-button");
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
    18: [


      // page18  black background
      {
        id: "page18-image1-black-background",
        name: "page18-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page18-routine-text
      {
        id: "page18-routine-text",
        name: "page18-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page18.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page18-andi-image",
        name: "page18-andi-image",
        type: "container",
        coordinates: [5, 180, 900, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/readingBook.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page18-clock",
        name: "page18-analog-clock",
        type: "custom",
        coordinates: [770, 80, 1120, 610],
        zIndex: 100,
        props: {
          id: "page18-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 8, minute: 45, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 8, // Convert 8 hours and 45 minutes to hour fraction
          hourMarkSectorToHour: 9, // Convert 9 hours and 45 minutes to hour fraction
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: true,
          showArcAfterMinuteAnimation: true,
        }
      },
      // page18  right background
      {
        id: "page18-right background",
        name: "page18-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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
      //quiz panel
      {
        id: 'page18-quiz-panel',
        name: 'page18-quiz-panel',
        type: 'custom',
        coordinates: [1160, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page18-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page18.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page18.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 40, // Options row: 70%
          feedbackRowHeight: 20, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 95,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page18.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page18-instruction-text',
        name: 'page18-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page18-instruction-text',
          get text() {


            return getI18nText("pages.page18.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page18-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page18-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 18 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page18-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page18-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page18-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page18-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page18-previous-button");
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
    19: [
      // page19  black background
      {
        id: "page19-image1-black-background",
        name: "page19-image1-black-background",
        type: "custom",
        coordinates: [5, 5, 1155, 800], // Positioned below question text box
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
      // page19-routine-text
      {
        id: "page19-routine-text",
        name: "page19-routine-text",
        type: "custom",
        coordinates: [5, 60, 1155, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page19.routineText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // andi image

      {
        id: "page19-andi-image",
        name: "page19-andi-image",
        type: "container",
        coordinates: [5, 180, 700, 780], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/readingBook.png',
          imageAlt: getI18nText("common.andiCharacterAlt")
        },
      },
      //page19-hour-text
      {
        id: "page19-hour-text",
        name: "page19-hour-text",
        type: "custom",
        coordinates: [750, 200, 800, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.hours"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box one
      {
        id: "page19-hour-box-1",
        name: "page19-hour-box-1",
        type: "custom",
        coordinates: [720, 270, 830, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '9',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //hour box two
      {
        id: "page19-hour-box-2",
        name: "page19-hour-box-2",
        type: "custom",
        coordinates: [720, 390, 830, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '8',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //mminus sign
      {
        id: "page19-minus-sign",
        name: "page19-minus-sign",
        type: "custom",
        coordinates: [650, 390, 700, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '−',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "90gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes text
      {
        id: "page19-minutes-text",
        name: "page19-minutes-text",
        type: "custom",
        coordinates: [940, 200, 1000, 240], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.minutes"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one
      {
        id: "page19-minutes-box-1",
        name: "page19-minutes-box-1",
        type: "custom",
        coordinates: [900, 270, 1080, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page19-minutes-box-1-balue-0",
        name: "page19-minutes-box-1-balue-0",
        type: "custom",
        coordinates: [920, 270, 980, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '4',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box one value 0
      {
        id: "page19-minutes-box-1-balue-5",
        name: "page19-minutes-box-1-balue-5",
        type: "custom",
        coordinates: [1000, 270, 1070, 360], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '5',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two
      {
        id: "page19-minutes-box-2",
        name: "page19-minutes-box-2",
        type: "custom",
        coordinates: [900, 390, 1080, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '',
          backgroundColor: "transparent",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page19-minutes-box-2-balue-0",
        name: "page19-minutes-box-2-balue-0",
        type: "custom",
        coordinates: [920, 390, 980, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '4',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //minutes box two value 0
      {
        id: "page19-minutes-box-2-balue-5",
        name: "page19-minutes-box-2-balue-5",
        type: "custom",
        coordinates: [1000, 390, 1070, 480], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: '5',
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "25gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "25gc",
          allowHtml: true,
        },
      },
      //line
      {
        id: "page19-line-border",
        name: "page19-line-border",
        type: "textbox",
        coordinates: [660, 500, 1090, 530], // Positioned below question text box
        zIndex: 55,
        props: {

          text: '',
          backgroundColor: "transparent",
          borderTop: "3px solid orange",

        },
      },
      //tile component
      {
        id: "page19-tile-1",
        name: "page19-tile-1",
        type: "tile",
        coordinates: [720, 530, 830, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -2
      {
        id: "page19-tile-2",
        name: "page19-tile-2",
        type: "tile",
        coordinates: [900, 530, 990, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile component -3
      {
        id: "page19-tile-3",
        name: "page19-tile-3",
        type: "tile",
        coordinates: [1000, 530, 1090, 630], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "focus", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFEB3B", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // page19  right background
      {
        id: "page19-right background",
        name: "page19-right background",
        type: "custom",
        coordinates: [1160, 5, 1595, 800], // Positioned below question text box
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

      //numpad
      {
        id: "page19-number-pad",
        name: "page19-number-pad",
        type: "number-pad-panel",
        coordinates: [1160, 10, 1595, 780],
        zIndex: 57,
        props: {
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "none",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          setFocusOnLoad: true, // First destination (tile-3) gets focus styling on load
          checkRequiresAllTileDestinationsFilled: true, // CHECK enabled only when every tile has a value; grades all at once

          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page19-feedback-textbox')
          destinations: [
            {
              destinationId: "page19-tile-3", // Quotient tile
              destinationType: "tile",
              correctValue: "0",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page19.feedback.tile3.correct"),
              incorrectFeedback: getI18nText("pages.page19.feedback.tile3.incorrect"),
              emptyFeedback: getI18nText("pages.page19.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page19-tile-2", // Quotient tile
              destinationType: "tile",
              correctValue: "0",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page19.feedback.tile2.correct"),
              incorrectFeedback: getI18nText("pages.page19.feedback.tile2.incorrect"),
              emptyFeedback: getI18nText("pages.page19.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page19-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "1",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page19.feedback.tile1.correct"),
              incorrectFeedback: getI18nText("pages.page19.feedback.tile1.incorrect"),
              emptyFeedback: getI18nText("pages.page19.feedback.emptyFeedback"),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

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
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: getI18nText('pages.page19.numpadInstruction')           // Default text to display in feedback area
          }
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page19-instruction-text',
        name: 'page19-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page19-instruction-text',
          get text() {


            return getI18nText("pages.page19.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page19-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page19-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 19 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page19-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page19-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page19-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page19-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page19-previous-button");
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
    20: [
      // Clock component - centered, large (styled like reference image)
      {
        id: "page20-clock",
        name: "page20-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page20-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 8, minute: 45, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,
        }
      },


      //page20-andi-start-text
      {
        id: "page20-andi-start-text",
        name: "page20-andi-start-text",
        type: "custom",
        coordinates: [1050, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page20.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },


      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page20-instruction-text',
        name: 'page20-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page20-instruction-text',
          get text() {


            return getI18nText("pages.page20.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page20-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page20-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 20 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page20-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page20-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page20-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page20-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page20-previous-button");
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
    21: [
      // Clock component - centered, large (styled like reference image)
      {
        id: "page21-clock",
        name: "page21-analog-clock",
        type: "custom",
        coordinates: [430, 80, 1180, 800],
        zIndex: 100,
        props: {
          id: "page21-clock",
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "140gc",
          time: { hour: 9, minute: 45, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "31.5gc",
          hourHandWidth: "2.8gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "59.5gc",
          minuteHandWidth: "2.8gc",
          showHandTails: true,
          handTailLength: "14gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "7gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "5.6gc",
          innerRingThickness: "3.5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "7gc",
          tickMarkWidth: "2.1gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C",
            "#27AE60",
            "#17A2B8",
            "#9B59B6",
            "#F39C12",
            "#1ABC9C",
            "#3498DB",
            "#E91E63",
            "#2ECC71",
            "#8E44AD",
            "#00BCD4",
            "#FF5722"
          ],
          numberFontSize: "12.6gc",
          numberOffset: "17.5gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "14gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.21,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "21gc",
          showHourMarkSector: false,
          hourMarkSectorFromHour: 1,
          hourMarkSectorToHour: 10,
          hourMarkSectorClockwise: true,
          hourMarkSectorFill: "#FF9800",
          hourMarkSectorFillOpacity: 0.5,
          hourMarkSectorBlink: false,
          showArcAfterMinuteAnimation: false,

          // Gap ring like page 15; closer to face + thinner stroke (page 21 only)
          showPeripheralHourArc: true,
          /** Match page 20 face size: do not shrink clock to fit ring inside viewBox */
          peripheralHourArcExpandViewBox: false,
          peripheralHourArcCircleGapDegrees: 21,
          peripheralHourArcGapCenterAngle: 67.5,
          peripheralHourArcClockwise: true,
          peripheralHourArcEndpointTrimDegrees: 0,
          peripheralHourArcArrowMode: "end",
          peripheralHourArcShowLabels: false,
          peripheralHourArcRadiusOffset: "8gc",
          peripheralHourArcColor: "#ffffff",
          peripheralHourArcWidth: "3gc",
          peripheralHourArcLinecap: "round",
          peripheralHourArcDashArray: null,
          peripheralHourArcOpacity: 1,
        }
      },


      //page21-andi-start-text
      {
        id: "page21-andi-start-text",
        name: "page21-andi-start-text",
        type: "custom",
        coordinates: [20, 130, 425, 400], // Positioned below question text box
        zIndex: 120, // Above page21-clock (100) so peripheral ring does not cover Andi box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page21.andiStarts"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      //page14-hour-text
      {
        id: "page21-hour-text",
        name: "page21-hour-text",
        type: "custom",
        coordinates: [1300, 130, 1590, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page21.hour"),
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page21-instruction-text',
        name: 'page21-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page21-instruction-text',
          get text() {


            return getI18nText("pages.page21.instructionText");
          },
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
      // Tap Animation GIF
      {
        id: "page21-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page21-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 21 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page21-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            const pageNumber = extractPageNumberFromId("page21-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
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
        id: "page21-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId("page21-previous-button");
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId("page21-previous-button");
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
    22: [
      // title text
      {
        id: "page22-title-text",
        name: "page22-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page22.title"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "40gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // maintext
      {
        id: "page22-main-text",
        name: "page22-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page22.mainText"),
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
        id: "page22-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 650, 700, 800],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page22-next-button",
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
            const pageNumber = extractPageNumberFromId("page22-next-button");
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
                  getI18nText("messages.pageNavNext"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
                window.location.reload()
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
  // and for Next use get disabled() => isNextDisabledByPageSequence(page). On page enter, initPageSequenceState + setPageCompletedForSequence; on last step, enable Next (e.g. PageCompletionManager.setPageCompleted(page, true)).
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
    window.setPageCompletedForSequence = setPageCompletedForSequence;

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
            getI18nText("messages.navigationComplete"),
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
        if (
          confirm(
            getI18nText("messages.pageStatesCleared"),
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
