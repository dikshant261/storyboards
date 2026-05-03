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
  13: { prev: 8, next: 14 },
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
const getI18nText = (key, fallback = "", params = {}) => {
  if (typeof i18n === "undefined") return fallback;
  const v = i18n.t(key, params);
  if (typeof v === "string" && v.startsWith("[Missing")) return fallback;
  return v;
};

/** Minute-hand lesson: `window.minuteHand` hour list (default [6..11]), indexed by `window.currentQuestionIndex`. */
const getMinuteHandArray = () => {
  if (
    typeof window !== "undefined" &&
    Array.isArray(window.minuteHand) &&
    window.minuteHand.length > 0
  ) {
    return window.minuteHand;
  }
  return [6, 7, 8, 9, 10, 11];
};

const getMinuteHandQuestionIndex = () => {
  const arr = getMinuteHandArray();
  let idx = 0;
  if (
    typeof window !== "undefined" &&
    typeof window.currentQuestionIndex === "number"
  ) {
    idx = window.currentQuestionIndex;
  }
  if (!Number.isFinite(idx) || idx < 0) idx = 0;
  if (idx >= arr.length) idx = arr.length - 1;
  return idx;
};

const getMinuteHandClockHour = () => {
  const arr = getMinuteHandArray();
  const idx = getMinuteHandQuestionIndex();
  const h = Number(arr[idx]);
  if (Number.isFinite(h) && h >= 1 && h <= 12) return Math.floor(h);
  return 6;
};

const getMinuteHandSolvedValueStore = () => {
  if (typeof window === "undefined") return {};
  if (!window.minuteHandSolvedValueStore || typeof window.minuteHandSolvedValueStore !== "object") {
    window.minuteHandSolvedValueStore = {};
  }
  return window.minuteHandSolvedValueStore;
};

const getMinuteHandSolvedValue = (questionIndex = getMinuteHandQuestionIndex()) => {
  const store = getMinuteHandSolvedValueStore();
  return Object.prototype.hasOwnProperty.call(store, questionIndex)
    ? store[questionIndex]
    : null;
};

const setMinuteHandSolvedValue = (value, questionIndex = getMinuteHandQuestionIndex()) => {
  if (typeof value !== "string" || value.trim() === "") return;
  const store = getMinuteHandSolvedValueStore();
  store[questionIndex] = value;
};

const clearMinuteHandSolvedValues = () => {
  if (typeof window === "undefined") return;
  window.minuteHandSolvedValueStore = {};
};

/** After page 8, advance to next rim question (wraps to 0). */
const advanceMinuteHandQuestionIndex = () => {
  if (typeof window === "undefined") return;
  const arr = getMinuteHandArray();
  let idx =
    typeof window.currentQuestionIndex === "number"
      ? window.currentQuestionIndex
      : 0;
  if (!Number.isFinite(idx) || idx < 0) idx = 0;
  window.currentQuestionIndex =
    idx >= arr.length - 1 ? 0 : idx + 1;
};

/** Clear global stores so page 7 quiz + page 8 numpad start fresh (does not change currentQuestionIndex). */
const resetMinuteHandLoopStores = () => {
  if (typeof window === "undefined") return;
  try {
    delete window.page9InstructionAfterPage8Check;
  } catch (e) {
    /* ignore */
  }
  window.page1complete = false;
  window.objectsremoved = 0;
  if (window.quizPanelStateStore) {
    window.quizPanelStateStore = {};
  }
  if (window.fillBlanksStateStore) {
    window.fillBlanksStateStore = {};
  }
  if (window.calculationStepsStateStore) {
    window.calculationStepsStateStore = {};
  }
  if (window.stageComponentStateStore) {
    window.stageComponentStateStore = {};
  }
  clearMinuteHandSolvedValues();
  if (typeof window.clearTileStyle === "function") {
    window.clearTileStyle("page8-answer-tile");
  }
  const page8AnswerTile =
    document.getElementById("page8-answer-tile") ||
    document.querySelector('[data-element-name="page8-answer-tile"]');
  if (page8AnswerTile) {
    page8AnswerTile.textContent = "";
    page8AnswerTile.innerText = "";
  }
  const npRefs = window.numberPadInstanceRefs;
  if (npRefs && typeof npRefs === "object") {
    Object.keys(npRefs).forEach((k) => {
      if (k.includes("page8-number-pad")) {
        delete npRefs[k];
      }
    });
  }
  if (window.PageCompletionManager) {
    window.PageCompletionManager.setPageCompleted(7, false);
    window.PageCompletionManager.setPageCompleted(8, false);
  }
};

const getPage4LessonState = () => {
  if (typeof window === "undefined") {
    return { pendingNextHour: null, completedHour: 1, lessonComplete: false };
  }
  if (!window.page4LessonState || typeof window.page4LessonState !== "object") {
    window.page4LessonState = {
      pendingNextHour: null,
      completedHour: 1,
      lessonComplete: false,
    };
  }
  return window.page4LessonState;
};

const resetPage4LessonState = () => {
  if (typeof window === "undefined") return;
  window.page4LessonState = {
    pendingNextHour: null,
    completedHour: 1,
    lessonComplete: false,
  };
};

const setPage4LessonPendingNextHour = ({ nextHour = null, completedHour = 1 } = {}) => {
  if (typeof window === "undefined") return;
  const lessonState = getPage4LessonState();
  const resolvedCompletedHour = Number(completedHour);
  if (Number.isFinite(resolvedCompletedHour) && resolvedCompletedHour >= 1) {
    lessonState.completedHour = resolvedCompletedHour;
  }
  const resolvedNextHour = Number(nextHour);
  lessonState.pendingNextHour =
    Number.isFinite(resolvedNextHour) && resolvedNextHour >= 1 && resolvedNextHour <= 5
      ? resolvedNextHour
      : null;
  lessonState.lessonComplete =
    lessonState.pendingNextHour == null && lessonState.completedHour >= 5;
};

const consumePage4LessonNextHour = () => {
  if (typeof window === "undefined") return null;
  const lessonState = getPage4LessonState();
  const targetHour = Number(lessonState.pendingNextHour);
  if (!Number.isFinite(targetHour) || targetHour < 1 || targetHour > 5) {
    return null;
  }
  lessonState.pendingNextHour = null;
  lessonState.completedHour = targetHour;
  return targetHour;
};

if (typeof window !== "undefined") {
  window.setPage4LessonPendingNextHour = setPage4LessonPendingNextHour;
  window.consumePage4LessonNextHour = consumePage4LessonNextHour;
  window.resetPage4LessonState = resetPage4LessonState;
  if (!window.__page4LessonStateListenerAttached) {
    window.__page4LessonStateListenerAttached = true;
    resetPage4LessonState();
    window.addEventListener("pageChanged", (event) => {
      if (Number(event?.detail?.page) === 4) {
        resetPage4LessonState();
      }
    });
  }
}

/**
 * Page 9 footer: "last" vs "next question" from current minuteHand index (same rules as page 8 CHECK).
 * Used when page9InstructionAfterPage8Check was cleared after Next, and by the number pad on CHECK.
 */
const getPage9InstructionFromMinuteHandIndex = () => {
  const arr = getMinuteHandArray();
  const len = arr.length;
  if (len === 0) {
    return getI18nText("pages.page9.instructionText");
  }
  let idx = 0;
  if (
    typeof window !== "undefined" &&
    typeof window.currentQuestionIndex === "number" &&
    Number.isFinite(window.currentQuestionIndex)
  ) {
    idx = window.currentQuestionIndex;
  }
  if (idx < 0) idx = 0;
  if (idx >= len) idx = len - 1;
  const isLastQuestion = idx >= len - 1;
  if (isLastQuestion) {
    return getI18nText("pages.page9.instructionAfterPage8Last");
  }
  return getI18nText("pages.page9.instructionAfterPage8Next");
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
window.question =
  typeof i18n !== "undefined" &&
  Array.isArray(i18n.t("quiz.legacyQuestionBank"))
    ? i18n.t("quiz.legacyQuestionBank")
    : [];
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
      // page1 talk text box black background
      {
        id: "page2-talk-text-box-black-background",
        name: "page2-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page2-talk-text-box-black-background",
          text: getI18nText("pages.page2.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page2-dee-tee-image",
        name: "page2-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-dee-tee-image",
          elementName: "page2-dee-tee-image",
          currentPage: 13,
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
            {
              src: "assets/deeTee2.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
            {
              src: "assets/deeTee3.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page2  black background
      {
        id: "page2-image1-black-background",
        name: "page2-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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
      //time of day text
      {
        id: "page2-time-of-day-text",
        name: "page2-time-of-day-text",
        type: "custom",
        coordinates: [505, 675, 1095, 775], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page2-time-of-day-text",
          text: getI18nText("pages.page2.clockReads"),
          backgroundColor: "#6a5132ca",
          border: "3gc dashed orange",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },

      // Clock component - metallic face, colorful numbers, red/blue hands with tails
      {
        id: "page2-clock",
        name: "page2-analog-clock",
        type: "custom",
        coordinates: [500, 90, 1100, 650], // +50gc vertical (align with page4 clock)
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - hour red, minute blue, with tails
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          // Clock face - metallic texture matching clock-showcase.html (faceTexture + dark border)
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          disableMinuteSectorArc: true,
          minuteSectorArcFrom12: null,
          showMinuteSectorAngleMarker: false,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: false,
          circumferenceLessonStaticTargetHour: 11,
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          circumferenceStepLabelOffset: "15gc",
          circumferenceStepStaticLabelOverrides: {
            12: "0",
            1: "5",
            2: "10",
            3: "15",
            4: "20",
            5: "25",
            6: "30",
            7: "35",
            8: "40",
            9: "45",
            10: "50",
            11: "55",
          },
          showCircumferenceStepCurvedArrow: false,
        }
      },

      // page2  right background
      {
        id: "page2-right background",
        name: "page2-right background",
        type: "custom",
        coordinates: [1200, 5, 1595, 800], // Positioned below question text box
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
          imageAlt: getI18nText("common.tapAlt", ""),

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
                  getI18nText("messages.nextButtonpage2", ""),
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
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page3-talk-text-box-black-background",
          text: getI18nText("pages.page3.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page3-dee-tee-image",
        name: "page3-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-dee-tee-image",
          elementName: "page3-dee-tee-image",
          currentPage: 13,
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
            // {
            //   src: 'assets/deeTee2.png',
            //   blink: false,
            //   glow: false,
            //   hidden: true,
            //   opacity: 1, // Grayed out,
            //   layerCoordinates: [50, 440, 400, 800]  // Image 3 
            // },
            // {
            //   src: 'assets/deeTee3.png',
            //   blink: false,
            //   glow: false,
            //   hidden: true,
            //   opacity: 1, // Grayed out,
            //   layerCoordinates: [50, 440, 400, 800]  // Image 3 
            // },

          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page3  black background
      {
        id: "page3-image1-black-background",
        name: "page3-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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
      //time of day text
      {
        id: "page3-time-of-day-text",
        name: "page3-time-of-day-text",
        type: "custom",
        coordinates: [505, 675, 1095, 775], // Match page2-time-of-day-text placement
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page3-time-of-day-text",
          text: getI18nText("pages.page3.clockReads"),
          backgroundColor: "#6a5132ca",
          border: "3gc dashed orange",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },

      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page3-clock",
        name: "page3-analog-clock",
        type: "custom",
        coordinates: [500, 90, 1100, 650], // +50gc vertical (align with page4 clock)
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          // — circle (radius / fill / border)
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          // — typography
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          // — layout (outward from outer end of hour ticks)
          circumferenceStepLabelOffset: "15gc",
          // — which circles to show: clock hours 1–12 (12 = top); omit or null = all
          circumferenceStepVisibleClockHours: [12],
        }
      },

      // page3  right background
      {
        id: "page3-right background",
        name: "page3-right background",
        type: "custom",
        coordinates: [1200, 5, 1595, 800], // Positioned below question text box
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
          imageAlt: getI18nText("common.tapAlt", ""),

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
                  getI18nText("messages.nextButtonpage3", ""),
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
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page4-talk-text-box-black-background",
          text: getI18nText("pages.page4.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page4-dee-tee-image",
        name: "page4-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-dee-tee-image",
          elementName: "page4-dee-tee-image",
          currentPage: 13,
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
            {
              src: 'assets/deeTee2.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/deeTee3.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },

          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page4  black background
      {
        id: "page4-image1-black-background",
        name: "page4-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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
      // Time readout (matches page2 placement; text from pages.page4.clockReads)
      {
        id: "page4-time-of-day-text",
        name: "page4-time-of-day-text",
        type: "custom",
        coordinates: [505, 675, 1095, 775],
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page4-time-of-day-text",
          hiddenByDefault: true,
          text: getI18nText("pages.page4.clockReads"),
          backgroundColor: "#6a5132ca",
          border: "3gc dashed orange",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          textAlign: "center",
          allowHtml: true,
        },
      },

      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page4-clock",
        name: "page4-analog-clock",
        type: "custom",
        coordinates: [500, 90, 1100, 650], // +50gc vertical vs prior [500, 70, 1100, 630]
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          id: "page4-clock",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 5, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          // Sector + dashed spokes + arc from 12 to this minute value (align with time.minute)
          minuteSectorArcFrom12: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          showMinuteSectorAngleMarker: false,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          // — circle (radius / fill / border)
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          // — typography
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          // — layout (outward from outer end of hour ticks)
          circumferenceStepLabelOffset: "15gc",
          // — which circles to show: clock hours 1–12 (12 = top); omit or null = all
          circumferenceStepVisibleClockHours: [12, 1],
          // — clock hour 1: empty digit, yellow circle
          circumferenceStepBlankLabelClockHours: [1],
          circumferenceStepBlankLabelCircleFill: "yellow",
          // — curved arrow (12 → 1): visibility, path, stroke, label at bow
          showCircumferenceStepCurvedArrow: true,
          circumferenceStepCurvedArrowBetween: [12, 1],
          circumferenceStepCurvedArrowCurvature: 1.5,
          circumferenceStepCurvedArrowColor: "#E65100",
          circumferenceStepCurvedArrowThickness: "2gc",
          circumferenceStepCurvedArrowOffset: "5gc",
          circumferenceStepCurvedArrowStrokeStyle: "solid",
          circumferenceStepCurvedArrowLabelText: getI18nText("clockLesson.arcLabelPlusFive"),
          circumferenceStepCurvedArrowLabelColor: "white",
          circumferenceStepCurvedArrowLabelFontSize: "18gc",
          circumferenceStepCurvedArrowLabelOffset: "7gc",
        }
      },

      // page4  right background
      {
        id: "page4-right background",
        name: "page4-right background",
        type: "custom",
        coordinates: [1200, 5, 1595, 800], // Positioned below question text box
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
      //dnd numpad
      {
        id: "page4-number-pad",
        name: "page4-number-pad",
        type: "number-pad-panel",
        coordinates: [1200, 5, 1595, 800],
        zIndex: 57,
        props: {
          id: "page4-number-pad",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "none",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // digits append into the circumference circle (max 2 via circumferenceStepMaxInputDigits)
          circumferenceStepMaxInputDigits: 2,
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page4-feedback-textbox')
          destinations: [
            {
              destinationId: "page4-clock",
              destinationType: "circumference-step",
              circumferenceClockHour: 1,
              // Minutes when long hand is on that tick: (hour % 12) * 5 (e.g. 1 → 5, 12 → 0)
              correctValueFromCircumferenceTick: true,
              correctValue: "5",
              correctFeedback: getI18nText("pages.page4.feedback.correct"),
              incorrectFeedback: getI18nText("pages.page4.feedback.incorrect"),
              emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page4-clock",
              destinationType: "circumference-step",
              circumferenceClockHour: 2,
              correctValueFromCircumferenceTick: true,
              correctValue: "10",
              correctFeedback: getI18nText("pages.page4.feedback.step2Correct"),
              incorrectFeedback: getI18nText("pages.page4.feedback.step2Incorrect"),
              emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page4-clock",
              destinationType: "circumference-step",
              circumferenceClockHour: 3,
              correctValueFromCircumferenceTick: true,
              correctValue: "15",
              correctFeedback: getI18nText("pages.page4.feedback.step3Correct"),
              incorrectFeedback: getI18nText("pages.page4.feedback.step3Incorrect"),
              emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page4-clock",
              destinationType: "circumference-step",
              circumferenceClockHour: 4,
              correctValueFromCircumferenceTick: true,
              correctValue: "20",
              correctFeedback: getI18nText("pages.page4.feedback.step4Correct"),
              incorrectFeedback: getI18nText("pages.page4.feedback.step4Incorrect"),
              emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
            {
              destinationId: "page4-clock",
              destinationType: "circumference-step",
              circumferenceClockHour: 5,
              correctValueFromCircumferenceTick: true,
              correctValue: "25",
              correctFeedback: getI18nText("pages.page4.feedback.step5Correct"),
              incorrectFeedback: getI18nText("pages.page4.feedback.step5Incorrect"),
              emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
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
            text: getI18nText("numberPad.showHintButton"),
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
            text: getI18nText("numberPad.checkButton"),
          },
        },
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
          imageAlt: getI18nText("common.tapAlt", ""),
          initialVisible: false,
          showOnEvent: "page4LessonNextEnabled",
          showOnEventFilter: { pageNumber: 4 },
          hideOnEvent: "page4LessonNextDisabled",
          hideOnEventFilter: { pageNumber: 4 },
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
          id: "page4-next-button",
          initialEnabled: false,
          enableOnEvent: "page4LessonNextEnabled",
          enableOnEventFilter: { pageNumber: 4 },
          disableOnEvent: "page4LessonNextDisabled",
          disableOnEventFilter: { pageNumber: 4 },

          get text() {
            const pageNumber = extractPageNumberFromId("page4-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            if (typeof window !== "undefined") {
              const targetHour =
                typeof window.consumePage4LessonNextHour === "function"
                  ? window.consumePage4LessonNextHour()
                  : null;
              if (Number.isFinite(targetHour)) {
                window.dispatchEvent(
                  new CustomEvent("page4LessonNextDisabled", {
                    detail: { pageNumber: 4 },
                  }),
                );
                window.dispatchEvent(
                  new CustomEvent("page4LessonAdvanceRequested", {
                    detail: { pageNumber: 4, targetHour },
                  }),
                );
                return;
              }
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
                  getI18nText("messages.nextButtonpage4", ""),
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
      {
        id: "page5-clock",
        name: "page5-analog-clock",
        type: "custom",
        coordinates: [75, 170, 675, 730],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          id: "page5-clock",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 25, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          minuteSectorArcFrom12: 25,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          showMinuteSectorAngleMarker: false,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          /** Rim through hour 5: all step circles numbered, white fills, +5 arrows (see clock-component). */
          circumferenceLessonStaticTargetHour: 5,
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          circumferenceStepLabelOffset: "15gc",
          showCircumferenceStepCurvedArrow: true,
          circumferenceStepCurvedArrowBetween: [12, 1],
          circumferenceStepCurvedArrowCurvature: 1.5,
          circumferenceStepCurvedArrowColor: "#E65100",
          circumferenceStepCurvedArrowThickness: "2gc",
          circumferenceStepCurvedArrowOffset: "5gc",
          circumferenceStepCurvedArrowStrokeStyle: "solid",
          circumferenceStepCurvedArrowLabelText: getI18nText("clockLesson.arcLabelPlusFive"),
          circumferenceStepCurvedArrowLabelColor: "white",
          circumferenceStepCurvedArrowLabelFontSize: "18gc",
          circumferenceStepCurvedArrowLabelOffset: "7gc",
        }
      },
      {
        id: "page5-reading-minutes-header",
        name: "page5-reading-minutes-header",
        type: "custom",
        coordinates: [1, 40, 1601, 118],
        zIndex: 56,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page5-reading-minutes-header",
          get text() {
            return getI18nText("pages.page5.readingMinutesHeader");
          },
          backgroundColor: "transparent",
          borderRadius: "0gc",
          textColor: "#FF6600",
          fontSize: "40gc",
          padding: "8gc 0gc 0gc 0gc",
          fontWeight: "bold",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },
      {
        id: "page5-main-text",
        name: "page5-main-text",
        type: "custom",
        coordinates: [850, 120, 1580, 730],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "40gc",
          padding: "22gc",
          allowHtml: true,
        },
      },
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895],
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page5-instruction-text',
          get text() {
            return getI18nText("pages.page5.instructionText");
          },
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
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
      {
        id: "page6-clock",
        name: "page6-analog-clock",
        type: "custom",
        coordinates: [75, 170, 675, 730],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          id: "page6-clock",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 25, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          minuteSectorArcFrom12: 25,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          showMinuteSectorAngleMarker: false,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          circumferenceLessonStaticTargetHour: 5,
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          circumferenceStepLabelOffset: "15gc",
          showCircumferenceStepCurvedArrow: true,
          circumferenceStepCurvedArrowBetween: [12, 1],
          circumferenceStepCurvedArrowCurvature: 1.5,
          circumferenceStepCurvedArrowColor: "transparent",
          circumferenceStepCurvedArrowThickness: "2gc",
          circumferenceStepCurvedArrowOffset: "5gc",
          circumferenceStepCurvedArrowStrokeStyle: "solid",
          get circumferenceStepCurvedArrowLabelTexts() {
            const v =
              typeof i18n !== "undefined"
                ? i18n.t("clockLesson.minuteEquationLabels")
                : null;
            return Array.isArray(v) ? v : [];
          },
          /** Radial nudge per segment (same order as label texts); gc or px number. Omit shorter array → remaining use labelOffset below. */
          circumferenceStepCurvedArrowLabelOffsets: [
            "7gc",
            "7gc",
            "7gc",
            "7gc",
            "7gc",
          ],
          /** SVG dx/dy per label (after radial nudge). Same order as label texts. {x,y} or [x,y]; gc or px. +x right, +y down. */
          circumferenceStepCurvedArrowLabelXYOffsets: [
            { x: "90gc", y: "42gc" },
            { x: "70gc", y: "42gc" },
            { x: "45gc", y: "38gc" },
            { x: "30gc", y: "20gc" },
            { x: "35gc", y: "-5gc" },
          ],
          circumferenceStepCurvedArrowLabelColor: "white",
          circumferenceStepCurvedArrowLabelFontSize: "12gc",
          circumferenceStepCurvedArrowLabelOffset: "7gc",
        }
      },
      {
        id: "page6-reading-minutes-header",
        name: "page6-reading-minutes-header",
        type: "custom",
        coordinates: [1, 40, 1601, 118],
        zIndex: 56,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page6-reading-minutes-header",
          get text() {
            return getI18nText("pages.page5.readingMinutesHeader");
          },
          backgroundColor: "transparent",
          borderRadius: "0gc",
          textColor: "#FF6600",
          fontSize: "40gc",
          padding: "8gc 0gc 0gc 0gc",
          fontWeight: "bold",
          underlineFirstWord: false,
          textAlign: "center",
        },
      },
      {
        id: "page6-main-text",
        name: "page6-main-text",
        type: "custom",
        coordinates: [850, 120, 1595, 730],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "40gc",
          padding: "22gc",
          allowHtml: true,
        },
      },
      {
        id: 'page6-instruction-text',
        name: 'page6-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895],
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page6-instruction-text',
          get text() {
            return getI18nText("pages.page6.instructionText");
          },
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          underlineFirstWord: false,
          textAlign: 'center'
        }
      },
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
        },
      },
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
                  getI18nText("messages.nextButtonpage6", ""),
                );
              }
            } else if (nav && nav.next === null) {
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
      // page1 talk text box black background
      {
        id: "page7-talk-text-box-black-background",
        name: "page7-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page7-talk-text-box-black-background",
          get text() {
            const H = getMinuteHandClockHour();
            return getI18nText("pages.page7.talkBoxText", "", { hour: H });
          },
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page7-dee-tee-image",
        name: "page7-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page7-dee-tee-image",
          elementName: "page7-dee-tee-image",
          currentPage: 13,
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
            {
              src: "assets/deeTee2.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
            {
              src: "assets/deeTee3.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page7  black background
      {
        id: "page7-image1-black-background",
        name: "page7-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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

      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page7-clock",
        name: "page7-analog-clock",
        type: "custom",
        coordinates: [500, 90, 1100, 650], // +50gc vertical vs prior [500, 70, 1100, 630]
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          id: "page7-clock",
          clockShape: "circle",
          size: "200gc",
          get time() {
            const H = getMinuteHandClockHour();
            const m = H * 5;
            return { hour: H, minute: m, second: 0 };
          },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          /** Non-null enables sector; sweep follows minute hand. */
          get minuteSectorArcFrom12() {
            return getMinuteHandClockHour() * 5;
          },
          minuteSectorArcFollowMinuteHand: true,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          showMinuteSectorAngleMarker: false,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          /** Rim through H−1 until the matching page8 answer is solved, then keep H visible. */
          get circumferenceLessonStaticTargetHour() {
            const H = getMinuteHandClockHour();
            return getMinuteHandSolvedValue() != null ? H : Math.max(1, H - 1);
          },
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          circumferenceStepLabelOffset: "15gc",
          get circumferenceStepStaticLabelOverrides() {
            const H = getMinuteHandClockHour();
            const solvedValue = getMinuteHandSolvedValue();
            const labels = {
              12: "0",
              1: "5",
              2: "10",
              3: "15",
              4: "20",
              5: "25",
              6: "30",
              7: "35",
              8: "40",
              9: "45",
              10: "50",
              11: "55",
            };
            if (solvedValue != null) {
              labels[H] = solvedValue;
            }
            return labels;
          },
          disableCircumferenceQuizReveal: true,
          showCircumferenceStepCurvedArrow: false,
          circumferenceStepCurvedArrowBetween: [12, 1],
          circumferenceStepCurvedArrowCurvature: 1.5,
          circumferenceStepCurvedArrowColor: "#E65100",
          circumferenceStepCurvedArrowThickness: "2gc",
          circumferenceStepCurvedArrowOffset: "5gc",
          circumferenceStepCurvedArrowStrokeStyle: "solid",
          circumferenceStepCurvedArrowLabelText: getI18nText("clockLesson.arcLabelPlusFive"),
          circumferenceStepCurvedArrowLabelColor: "white",
          circumferenceStepCurvedArrowLabelFontSize: "18gc",
          circumferenceStepCurvedArrowLabelOffset: "7gc",
        }
      },

      // Quiz panel (right column)
      {
        id: "page7-quiz-panel",
        name: "page7-quiz-panel",
        type: "custom",
        coordinates: [1200, 5, 1595, 800],
        zIndex: 55,
        props: {
          componentType: "QuizPanelComponent",
          get quizId() {
            return `page7-quiz-i${getMinuteHandQuestionIndex()}`;
          },
          shuffleOptionsOnMount: true,
          feedbackOverflow: "hidden",
          quizType: "MCQ",
          quizSubtype: "QT3R",
          headerText: "",
          questionText: getI18nText("pages.page7.quizPanel.questionText"),
          feedbackText: "",
          contentFontSize: "34gc",
          headerRowHeight: 0,
          questionRowHeight: 25,
          optionsRowHeight: 45,
          feedbackRowHeight: 30,
          optionButtonWidth: 100,
          optionButtonHeight: 75,
          optionButtonBackgroundColor: "orange",
          border: "2px solid #70ACC7",
          questionTextFontSize: "28gc",
          optionButtonTextSize: "32gc",
          feedbackTextFontSize: "26gc",
          optionButtonTextColor: "#141212",
          get options() {
            const H = getMinuteHandClockHour();
            return [
              {
                text: getI18nText(
                  "pages.page7.quizPanel.optionMultiplyBy5.text",
                  "",
                  { hour: H },
                ),
                iscorrect: true,
                feedback: getI18nText(
                  "pages.page7.quizPanel.optionMultiplyBy5.feedback",
                  "",
                  { hour: H },
                ),
              },
              {
                text: getI18nText(
                  "pages.page7.quizPanel.optionMultiplyBy1.text",
                  "",
                  { hour: H },
                ),
                iscorrect: false,
                feedback: getI18nText(
                  "pages.page7.quizPanel.optionMultiplyBy1.feedback",
                  "",
                  { hour: H },
                ),
              },
              {
                text: getI18nText(
                  "pages.page7.quizPanel.optionAddHTo5.text",
                  "",
                  { hour: H },
                ),
                iscorrect: false,
                feedback: getI18nText(
                  "pages.page7.quizPanel.optionAddHTo5.feedback",
                  "",
                  { hour: H },
                ),
              },
            ];
          },
          keyConcepts: [],
          impFormulae: [],
        },
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page7-instruction-text',
        name: 'page7-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
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
          imageAlt: getI18nText("common.tapAlt", ""),
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
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
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
                  getI18nText("messages.nextButtonpage7", ""),
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
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
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page8-talk-text-box-black-background",
          get text() {
            const H = getMinuteHandClockHour();
            return getI18nText("pages.page8.talkBoxText", "", { hour: H });
          },
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page8-dee-tee-image",
        name: "page8-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page8-dee-tee-image",
          elementName: "page8-dee-tee-image",
          currentPage: 13,
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
            {
              src: "assets/deeTee2.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
            {
              src: "assets/deeTee3.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page8 black background
      {
        id: "page8-image1-black-background",
        name: "page8-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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

      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page8-clock",
        name: "page8-analog-clock",
        type: "custom",
        coordinates: [500, 90, 1100, 650],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          id: "page8-clock",
          clockShape: "circle",
          size: "200gc",
          get time() {
            const H = getMinuteHandClockHour();
            const m = H * 5;
            return { hour: H, minute: m, second: 0 };
          },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          showMinuteSectorAngleMarker: false,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          /** Rim through current hour H; answer in page8-answer-tile. */
          get circumferenceLessonStaticTargetHour() {
            return getMinuteHandClockHour();
          },
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          circumferenceStepLabelOffset: "15gc",
          get circumferenceStepStaticLabelOverrides() {
            const H = getMinuteHandClockHour();
            const solvedValue = getMinuteHandSolvedValue();
            return {
              12: "0",
              1: "5",
              2: "10",
              3: "15",
              4: "20",
              5: "25",
              6: "30",
              7: "35",
              8: "40",
              9: "45",
              10: "50",
              11: "55",
              [H]: solvedValue != null ? solvedValue : "??",
            };
          },
          showCircumferenceStepCurvedArrow: false,
          circumferenceStepCurvedArrowBetween: [12, 1],
          circumferenceStepCurvedArrowCurvature: 1.5,
          circumferenceStepCurvedArrowColor: "#E65100",
          circumferenceStepCurvedArrowThickness: "2gc",
          circumferenceStepCurvedArrowOffset: "5gc",
          circumferenceStepCurvedArrowStrokeStyle: "solid",
          circumferenceStepCurvedArrowLabelText: getI18nText("clockLesson.arcLabelPlusFive"),
          circumferenceStepCurvedArrowLabelColor: "white",
          circumferenceStepCurvedArrowLabelFontSize: "18gc",
          circumferenceStepCurvedArrowLabelOffset: "7gc",
        }
      },

      // Equation label + answer tile (below clock)
      {
        id: "page8-equation-label",
        name: "page8-equation-label",
        type: "custom",
        coordinates: [460, 697, 840, 787],
        zIndex: 101,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page8-equation-label",
          get text() {
            const H = getMinuteHandClockHour();
            return getI18nText("pages.page8.equationLabel", "", { hour: H });
          },
          borderRadius: "0gc",
          textColor: "#ffffff",
          fontSize: "50gc",
          padding: "12gc",
          fontWeight: "bold",
          underlineFirstWord: false,
          textAlign: "right",
        },
      },
      {
        id: "page8-answer-tile",
        name: "page8-answer-tile",
        type: "tile",
        coordinates: [850, 697, 1000, 787],
        zIndex: 102,
        props: {
          mode: "focus",
          text: "",
          backgroundColor: "#FFEB3B",
          borderColor: "#FFFFFF",
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000",
          fontSize: "52gc",
          fontWeight: "bold",
          padding: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // page8 right background (matches page 4 numpad column)
      {
        id: "page8-right-background",
        name: "page8-right-background",
        type: "custom",
        coordinates: [1200, 5, 1595, 800],
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
        id: "page8-number-pad",
        name: "page8-number-pad",
        type: "number-pad-panel",
        coordinates: [1200, 5, 1595, 800],
        zIndex: 57,
        props: {
          id: "page8-number-pad",
          backgroundColor: "transparent",
          borderRadius: "15gc",
          border: "none",
          padding: "20gc",
          layout: "vertical",
          buttonConfig: 2,
          enableClickSound: true,
          inputMode: "append",
          maxNumber: null,
          feedbackMode: "feedback",
          feedbackComponentId: null,
          get destinations() {
            return [
              {
                destinationId: "page8-answer-tile",
                destinationType: "tile",
                mirrorCorrectValueToCircumferenceStep: {
                  clockId: "page8-clock",
                  get clockHour() {
                    return getMinuteHandClockHour();
                  },
                  onCorrect(value) {
                    setMinuteHandSolvedValue(String(value));
                  },
                },
                get correctValue() {
                  return String(getMinuteHandClockHour() * 5);
                },
                get correctFeedback() {
                  const h = getMinuteHandClockHour();
                  const m = h * 5;
                  return getI18nText("pages.page8.feedback.correct", "", {
                    hour: h,
                    minutes: m,
                  });
                },
                incorrectFeedback: getI18nText(
                  "pages.page8.feedback.incorrect",
                ),
                emptyFeedback: getI18nText(
                  "pages.page8.feedback.emptyFeedback",
                ),
                correctMode: "correct",
                incorrectMode: "incorrect",
              },
            ];
          },
          destinationIndex: 0,
          feedbackRowHeight: "35%",
          buttonGridHeight: "51%",
          checkButtonHeight: "10%",
          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: getI18nText("numberPad.showHintButton"),
          },
          numberButtons: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "45gc",
            fontWeight: "bold",
            buttonWidthPercent: "90%",
            buttonHeightPercent: "90%",
          },
          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: getI18nText("numberPad.checkButton"),
          },
        },
      },
      // Instruction (footer); updates after numpad lesson completes
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
          imageAlt: getI18nText("common.tapAlt", ""),
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
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 8 },
          get text() {
            const pageNumber = extractPageNumberFromId("page8-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            if (typeof window === "undefined") return;

            const arr = getMinuteHandArray();
            let idx =
              typeof window.currentQuestionIndex === "number"
                ? window.currentQuestionIndex
                : 0;
            if (!Number.isFinite(idx) || idx < 0) idx = 0;
            if (idx >= arr.length) idx = arr.length - 1;
            const isLastQuestion = arr.length > 0 && idx >= arr.length - 1;

            const go = (targetPage) => {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(targetPage);
              } else if (window.navigateToPage) {
                window.navigateToPage(targetPage);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: targetPage },
                  }),
                );
              }
            };

            if (isLastQuestion) {
              window.currentQuestionIndex = 0;
              try {
                delete window.page9InstructionAfterPage8Check;
              } catch (e) {
                /* ignore */
              }
              resetMinuteHandLoopStores();
              go(13);
            } else {
              advanceMinuteHandQuestionIndex();
              resetMinuteHandLoopStores();
              go(7);
            }

            if (typeof window.forceAppUpdate === "function") {
              window.forceAppUpdate();
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
      // title text
      {
        id: "page9-title-text",
        name: "page9-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 100], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page9-clock",
        name: "page9-analog-clock",
        type: "custom",
        coordinates: [500, 70, 1100, 630],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },
      // maintext
      {
        id: "page9-main-text",
        name: "page9-main-text",
        type: "custom",
        coordinates: [850, 110, 1590, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
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
            if (
              typeof window !== "undefined" &&
              window.page9InstructionAfterPage8Check
            ) {
              return window.page9InstructionAfterPage8Check;
            }
            return getPage9InstructionFromMinuteHandIndex();
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
          imageAlt: getI18nText("common.tapAlt", ""),

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
                  getI18nText("messages.nextButtonpage9", ""),
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    10: [
      // title text
      {
        id: "page10-title-text",
        name: "page10-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 100], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      //minutes text
      {
        id: "page10-five-minutes-text",
        name: "page10-five-minutes-text",
        type: "custom",
        coordinates: [490, 280, 1000, 320], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.fiveMinutes", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      //10 minutes text
      {
        id: "page10-ten-minutes-text",
        name: "page10-ten-minutes-text",
        type: "custom",
        coordinates: [490, 340, 1000, 380], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.tenMinutes", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      //15 minutes text
      {
        id: "page10-fifteen-minutes-text",
        name: "page10-fifteen-minutes-text",
        type: "custom",
        coordinates: [490, 400, 1000, 440], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.fifteenMinutes", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      //20 minutes text
      {
        id: "page10-twenty-minutes-text",
        name: "page10-twenty-minutes-text",
        type: "custom",
        coordinates: [490, 460, 1000, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.twentyMinutes", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      //25 minutes text
      {
        id: "page10-twentyFive-minutes-text",
        name: "page10-twentyFive-minutes-text",
        type: "custom",
        coordinates: [490, 520, 1000, 560], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.twentyFiveMinutes", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "42gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page10-clock",
        name: "page10-analog-clock",
        type: "custom",
        coordinates: [500, 70, 1100, 630],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },
      // maintext
      {
        id: "page10-main-text",
        name: "page10-main-text",
        type: "custom",
        coordinates: [1000, 110, 1590, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
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
          imageAlt: getI18nText("common.tapAlt", ""),

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
                  getI18nText("messages.nextButtonpage10", ""),
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    11: [
      // page1 talk text box black background
      {
        id: "page11-talk-text-box-black-background",
        name: "page11-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page11-talk-text-box-black-background",
          text: getI18nText("pages.page11.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page11-dee-tee-image",
        name: "page11-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page11-dee-tee-image",
          elementName: "page11-dee-tee-image",
          currentPage: 13,
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
            {
              src: 'assets/deeTee2.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/deeTee3.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },

          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page11  black background
      {
        id: "page11-image1-black-background",
        name: "page11-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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


      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page11-clock",
        name: "page11-analog-clock",
        type: "custom",
        coordinates: [500, 70, 1100, 630],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },

      // page11  right background
      {
        id: "page11-right background",
        name: "page11-right background",
        type: "custom",
        coordinates: [1200, 5, 1595, 800], // Positioned below question text box
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
        id: 'page11-quiz-panel',
        name: 'page11-quiz-panel',
        type: 'custom',
        coordinates: [1200, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page11-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page11.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page11.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 55, // Options row: 70%
          feedbackRowHeight: 30, // Feedback row: 15%
          optionButtonWidth: 95,
          optionButtonHeight: 25,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page11.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text - "Select the correct option" (changes to "Tap » to continue" after quiz completion)
      {
        id: 'page11-instruction-text',
        name: 'page11-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
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
          imageAlt: getI18nText("common.tapAlt", ""),
          initialVisible: false
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
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
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
                  getI18nText("messages.nextButtonpage11", ""),
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    12: [
      // page1 talk text box black background
      {
        id: "page12-talk-text-box-black-background",
        name: "page12-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page12-talk-text-box-black-background",
          text: getI18nText("pages.page12.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },
      //dee tee image
      {
        id: "page12-dee-tee-image",
        name: "page12-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page12-dee-tee-image",
          elementName: "page12-dee-tee-image",
          currentPage: 13,
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
            {
              src: 'assets/deeTee2.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/deeTee3.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },

          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },

      // page12  black background
      {
        id: "page12-image1-black-background",
        name: "page12-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1195, 800], // Positioned below question text box
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
      //time of day text
      {
        id: "page12-time-of-day-text",
        name: "page12-time-of-day-text",
        type: "custom",
        coordinates: [505, 675, 1095, 775], // Match page2-time-of-day-text placement
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page12-time-of-day-text",
          text: getI18nText("pages.page12.clockReads"),
          backgroundColor: "#6a5132ca",
          border: "3gc dashed orange",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },

      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page12-clock",
        name: "page12-analog-clock",
        type: "custom",
        coordinates: [500, 70, 1100, 630],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },

      // page12  right background
      {
        id: "page12-right background",
        name: "page12-right background",
        type: "custom",
        coordinates: [1200, 5, 1595, 800], // Positioned below question text box
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
      //tile component
      {
        id: "page12-tile-1",
        name: "page12-tile-1",
        type: "tile",
        coordinates: [900, 590, 1030, 710], // Centered horizontally in left panel (gap reduced to 10gc)
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
      //dnd numpad
      {
        id: "page12-number-pad",
        name: "page12-number-pad",
        type: "number-pad-panel",
        coordinates: [1200, 5, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "#8B4513",
          borderRadius: "15gc",
          border: "4px solid #D2691E",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page12-feedback-textbox')
          destinations: [
            {
              destinationId: "page12-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "30",
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page12.feedback.correct"),
              incorrectFeedback: getI18nText("pages.page12.feedback.incorrect"),
              emptyFeedback: getI18nText("pages.page12.feedback.emptyFeedback"),
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
            text: getI18nText("numberPad.showHintButton"),
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
            text: getI18nText("numberPad.checkButton"),
          },
        },
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
          imageAlt: getI18nText("common.tapAlt", ""),
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
          enableOnEventFilter: { pageNumber: 12 },
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
                  getI18nText("messages.nextButtonpage12", ""),
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    13: [
      // title text
      {
        id: "page13-title-text",
        name: "page13-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 100], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page13.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // Clock component - match page2 (metallic face, colorful numbers, red/blue hands)
      {
        id: "page13-clock",
        name: "page13-analog-clock",
        type: "custom",
        coordinates: [150, 150, 750, 730],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          id: "page13-clock",
          clockShape: "circle",
          size: "200gc",
          get time() {
            const H = getMinuteHandClockHour();
            const m = H * 5;
            return { hour: 7, minute: 0, second: 0 };
          },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          faceTexture: "metallic",
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
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
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          disableMinuteSectorArc: true,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          showMinuteSectorAngleMarker: false,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
          showCircumferenceStepLabels: true,
          circumferenceLessonStaticTargetHour: 11,
          circumferenceStepCircleRadius: "15gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          circumferenceStepLabelOffset: "15gc",
          circumferenceStepStaticLabelOverrides: {
            12: "0",
            1: "5",
            2: "10",
            3: "15",
            4: "20",
            5: "25",
            6: "30",
            7: "35",
            8: "40",
            9: "45",
            10: "50",
            11: "55",
          },
          showCircumferenceStepCurvedArrow: false,
          circumferenceStepCurvedArrowBetween: [12, 1],
          circumferenceStepCurvedArrowCurvature: 1.5,
          circumferenceStepCurvedArrowColor: "#E65100",
          circumferenceStepCurvedArrowThickness: "2gc",
          circumferenceStepCurvedArrowOffset: "5gc",
          circumferenceStepCurvedArrowStrokeStyle: "solid",
          circumferenceStepCurvedArrowLabelText: getI18nText("clockLesson.arcLabelPlusFive"),
          circumferenceStepCurvedArrowLabelColor: "white",
          circumferenceStepCurvedArrowLabelFontSize: "18gc",
          circumferenceStepCurvedArrowLabelOffset: "7gc",
        }
      },
      // maintext
      {
        id: "page13-main-text",
        name: "page13-main-text",
        type: "custom",
        coordinates: [850, 110, 1590, 800], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page13.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "40gc",
          textAlign: 'left',
          padding: "15gc",
          allowHtml: true,
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
          imageAlt: getI18nText("common.tapAlt", ""),

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
                  getI18nText("messages.nextButtonpage13", ""),
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
            return getI18nText("buttons.previous", "");
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
                  getI18nText("messages.previousButtonPage1", ""),
                );
              }
            }
          },
        },
      },
    ],
    14: [
      // title text
      {
        id: "page14-title-text",
        name: "page14-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page14.title", ""),
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
        id: "page14-main-text",
        name: "page14-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page14.mainText", ""),
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
        id: "page14-tap-animation",
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
        id: "page14-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 650, 950, 750],
        zIndex: "var(--z-button)",
        props: {
          fontSize: '45gc',
          get text() {
            return getI18nText("buttons.startOver");
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
                  getI18nText("messages.nextButtonPage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              window.location.reload();
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

    // Minute-hand lesson helpers (pages 7–8 + clock-component)
    window.getMinuteHandArray = getMinuteHandArray;
    window.getMinuteHandQuestionIndex = getMinuteHandQuestionIndex;
    window.getMinuteHandClockHour = getMinuteHandClockHour;
    window.advanceMinuteHandQuestionIndex = advanceMinuteHandQuestionIndex;
    window.resetMinuteHandLoopStores = resetMinuteHandLoopStores;
    window.getPage9InstructionFromMinuteHandIndex =
      getPage9InstructionFromMinuteHandIndex;

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
