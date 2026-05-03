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
window.question = getI18nText("Question");
window.currentQuizIndex = 0;
/** Page 4 clock: which circumference step labels show (clock hours 1–12, 12 = top). Default only “0” at 12. */
window.page4CircumferenceVisibleClockHours = [12];
/** Page 4 clock: filled sector + arc from 12 o’clock to this many minutes (optionMinute); null = hidden. */
window.page4MinuteSectorArcEndMinute = null;

/**
 * Clock hours from 12 o’clock clockwise through the tick for this minute value (5,10,…,60).
 * Matches circumference step labels: 5→1, 10→2, …, 55→11, 60→all positions.
 */
window.getClockHoursUpToOptionMinute = function getClockHoursUpToOptionMinute(
  optionMinute,
) {
  const M = Number(optionMinute);
  if (!Number.isFinite(M) || M <= 0) return [12];
  if (M >= 60) {
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }
  const h = M / 5;
  if (!Number.isInteger(h) || h < 1 || h > 11) return [12];
  const order = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return order.slice(0, h + 1);
};

/**
 * Page 5 clock: circumference step labels through the major tick at
 * Math.floor(minute/5)*5 (same as “long hand on a number” for whole fives).
 */
window.getPage5CircumferenceHoursFromQuestionMinute = function (
  minuteVal,
) {
  const min = Number(minuteVal);
  if (!Number.isFinite(min) || min < 0) return [12];
  const m = Math.floor(min / 5) * 5;
  if (m <= 0) return [12];
  return window.getClockHoursUpToOptionMinute(m >= 60 ? 60 : m);
};

/** Page 5: arc from 12 to that floored-five minute (5…60); null if m is 0 */
window.getPage5MinuteSectorArcFromQuestionMinute = function (minuteVal) {
  const min = Number(minuteVal);
  if (!Number.isFinite(min) || min < 0) return null;
  const m = Math.floor(min / 5) * 5;
  if (m <= 0) return null;
  return m >= 60 ? 60 : m;
};

/** Page 6: arc from 12 to the actual question minute (each minute = 6°); null if minute ≤ 0 */
window.getPage6MinuteSectorArcFromQuestionMinute = function (minuteVal) {
  const min = Number(minuteVal);
  if (!Number.isFinite(min) || min <= 0) return null;
  if (min >= 60) return 60;
  return min;
};

window.resetPage4CircumferenceStepLabels = function resetPage4CircumferenceStepLabels() {
  window.page4CircumferenceVisibleClockHours = [12];
  window.page4MinuteSectorArcEndMinute = null;
};

if (typeof window !== "undefined") {
  window.addEventListener("pageChanged", (e) => {
    const p = e.detail?.page;
    if (p === 4 || p === 5 || p === 6) window.resetPage4CircumferenceStepLabels?.();
  });
}
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

  // Keep legacy index in sync (number pad / other helpers)
  window.currentQuestionIndex = window.currentQuizIndex;

  // Drop persisted MCQ + feedback state — same quizId is reused per page for every question
  window.quizPanelStateStore = {};

  // Lock next » until each page’s quiz completes again
  window.quizUIState = {
    page2: { unlocked: false },
    page4: { unlocked: false },
    page5: { unlocked: false },
    page6: { unlocked: false },
  };

  // Clear tile style overrides (green/red) from previous question
  const clockTileIds = [
    "page2-tile-1",
    "page2-tile-2",
    "page6-tile-1",
    "page6-tile-2",
  ];
  clockTileIds.forEach((id) => {
    try {
      window.clearTileStyle?.(id);
    } catch (e) {
      console.warn("[advanceToNextQuestionQuiz] clearTileStyle", id, e);
    }
  });

  const nextQuestion = window.question[window.currentQuizIndex];

  if (nextQuestion && typeof nextQuestion === "object") {
    window.dispatchEvent(
      new CustomEvent("questionChanged", {
        detail: nextQuestion,
      }),
    );
  }

  window.resetPage4CircumferenceStepLabels?.();

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

  /** Hour shown on fixed tiles — must be a getter when used in props, not a one-shot value. */
  const getCurrentQuestionHourTextForTile = () => {
    const idx =
      typeof window !== "undefined" &&
      typeof window.currentQuizIndex === "number"
        ? window.currentQuizIndex
        : 0;
    const q =
      typeof window !== "undefined" ? window.question?.[idx] : null;
    return q?.hour != null ? String(q.hour) : "";
  };

  const getCurrentQuestionMcqOptionsPage4 = () => {
    const idx =
      typeof window !== "undefined" &&
      typeof window.currentQuizIndex === "number"
        ? window.currentQuizIndex
        : 0;
    const q =
      typeof window !== "undefined" ? window.question?.[idx] : null;
    return Array.isArray(q?.options) ? q.options : [];
  };

  const getCurrentQuestionMcqOptionsPage5 = () => {
    const idx =
      typeof window !== "undefined" &&
      typeof window.currentQuizIndex === "number"
        ? window.currentQuizIndex
        : 0;
    const q =
      typeof window !== "undefined" ? window.question?.[idx] : null;
    return Array.isArray(q?.options2) ? q.options2 : [];
  };

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
                getI18nText("messages.lastPageStartingOver", ""),
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
          text: getI18nText("common.page2TalkBox.talkBoxText", ""),
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
      // Clock component - centered, large (styled like reference image)
      {
        id: "page2-clock",
        name: "page2-analog-clock",
        type: "custom",
        coordinates: [500, 35, 1100, 595],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return {
              hour: question[currentQuizIndex]?.hour,
              minute: question[currentQuizIndex]?.minute,
              second: 0
            };
          },
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
      //tile component
      {
        id: "page2-tile-1",
        name: "page2-tile-1",
        type: "tile",
        coordinates: [670, 630, 790, 730], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Keep base mode neutral; pulsate comes from explicit animation styles
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFD700", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          animation: "pulsateGlow 1.2s ease-in-out infinite",
          boxShadow: "0 0 16px rgba(255, 235, 59, 0.95)",
          padding: "20gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // : sign
      {
        id: "page2-colon-sign",
        name: "page2-colon-sign",
        type: "custom",
        coordinates: [800, 630, 830, 730], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: ":",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "80gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //tile component -2
      {
        id: "page2-tile-2",
        name: "page2-tile-2",
        type: "tile",
        coordinates: [840, 630, 960, 730], // Centered horizontally in left panel (gap reduced to 10gc)
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
      //numpad
      {
        id: "page2-number-pad",
        name: "page2-number-pad",
        type: "number-pad-panel",
        coordinates: [1200, 5, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "rgb(0,0,0,0.7)",
          borderRadius: "15gc",
          border: "2px solid #70ACC7",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          setFocusOnLoad: true, // Keep tile-1 highlighted when page renders
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page2-feedback-textbox')
          destinations: [
            {
              destinationId: "page2-tile-1", // Quotient tile
              destinationType: "tile",
              get correctValue() {
                return question[currentQuizIndex]?.hour;
              },
              // Dynamic feedback messages
              get correctFeedback() {
                const h = question[currentQuizIndex]?.hour;
                return getI18nText(
                  "common.box1Numpad.correctFeedbackTemplate",
                  "",
                  { hour: h != null ? String(h) : "" }
                );
              },
              get incorrectFeedback() {
                return getI18nText("common.box1Numpad.incorrectFeedback", "");
              },
              emptyFeedback: getI18nText(
                "pages.page2.feedback.emptyFeedback",
                "",
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },

          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            get text() {
              return getI18nText("numberPad.showHint", "");
            },
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
            get text() {
              return getI18nText("numberPad.check", "");
            },
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            borderColor: 'transparent',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: ""
          }
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
          initialVisible: false
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
            window.changePageAndNotify(3);
            // if (window?.isLastQuestion) {
            //   window.changePageAndNotify(3);

            // }
            // // if (nav && nav.next !== null && typeof window !== "undefined") {
            //   if (window.changePageAndNotify) {
            //     window.changePageAndNotify(nav.next);
            //   } else if (window.navigateToPage) {
            //     window.navigateToPage(nav.next);
            //   } else {
            //     window.dispatchEvent(
            //       new CustomEvent("pageChanged", {
            //         detail: { page: nav.next },
            //       }),
            //     );
            //     console.log(
            //       "📄 [Next Button]",
            //       getI18nText("messages.nextButtonpage2", ""),
            //     );
            //   }
            // } else if (nav && nav.next === null) {
            //   // On last page, "Start Over" functionality
            //   console.log(
            //     "🔄 [Next Button]",
            //     getI18nText(
            //       "messages.lastPageStartingOver",
            //       "Last page - Starting over",
            //     ),
            //   );
            //   if (window.advanceToNextQuestion) {
            //     window.advanceToNextQuestion();
            //   } else if (window.changePageAndNotify) {
            //     window.changePageAndNotify(1);
            //   }
            // }
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
          text: getI18nText("pages.page3.talkBoxText"),
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
      // page3  black background
      {
        id: "page3-numpad-black-background",
        name: "page3-numpad-black-background",
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
      // Clock component - match page2 (metallic face, hands, ticks, numbers)
      {
        id: "page3-clock",
        name: "page3-analog-clock",
        type: "custom",
        coordinates: [500, 35, 1100, 595],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return {
              hour: question[currentQuizIndex]?.hour,
              minute: question[currentQuizIndex]?.minute,
              second: 0
            };
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
          // Circumference step labels (0 at 12 o’clock, 1–11 at hour ticks)
          showCircumferenceStepLabels: true,
          // — circle (radius / fill / border)
          circumferenceStepCircleRadius: "10gc",
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
      //tile component
      {
        id: "page3-tile-1",
        name: "page3-tile-1",
        type: "tile",
        coordinates: [670, 630, 790, 730], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "focus", // Visual focus mode by default
          get text() {
            return getCurrentQuestionHourTextForTile();
          },
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFFFFF", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // : sign
      {
        id: "page3-colon-sign",
        name: "page3-colon-sign",
        type: "custom",
        coordinates: [800, 630, 830, 730], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: ":",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "80gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //tile component -2
      {
        id: "page3-tile-2",
        name: "page3-tile-2",
        type: "tile",
        coordinates: [840, 630, 960, 730], // Centered horizontally in left panel (gap reduced to 10gc)
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
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for specific page
          get text() {
            const pageNumber = extractPageNumberFromId("page3-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            window.changePageAndNotify(4);
            // if (window?.isLastQuestion) {
            //   window.changePageAndNotify(3);

            // }
            // // if (nav && nav.next !== null && typeof window !== "undefined") {
            //   if (window.changePageAndNotify) {
            //     window.changePageAndNotify(nav.next);
            //   } else if (window.navigateToPage) {
            //     window.navigateToPage(nav.next);
            //   } else {
            //     window.dispatchEvent(
            //       new CustomEvent("pageChanged", {
            //         detail: { page: nav.next },
            //       }),
            //     );
            //     console.log(
            //       "📄 [Next Button]",
            //       getI18nText("messages.nextButtonpage3", ""),
            //     );
            //   }
            // } else if (nav && nav.next === null) {
            //   // On last page, "Start Over" functionality
            //   console.log(
            //     "🔄 [Next Button]",
            //     getI18nText(
            //       "messages.lastPageStartingOver",
            //       "Last page - Starting over",
            //     ),
            //   );
            //   if (window.advanceToNextQuestion) {
            //     window.advanceToNextQuestion();
            //   } else if (window.changePageAndNotify) {
            //     window.changePageAndNotify(1);
            //   }
            // }
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
          get text() {
            const q = question[currentQuizIndex];
            const override = q?.page4TalkBox?.talkBoxText;
            if (override != null && override !== "") return override;
            const p =
              typeof window !== "undefined" &&
              typeof window.getPage4TalkBoxTemplateParamsFromMinute ===
                "function"
                ? window.getPage4TalkBoxTemplateParamsFromMinute(q?.minute)
                : { crossedClockNumber: "", minutesAtMark: "" };
            return getI18nText(
              "common.page4TalkBox.talkBoxTextTemplate",
              "",
              p,
            );
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
      // Clock component - match page2 (metallic face, hands, ticks, numbers)
      {
        id: "page4-clock",
        name: "page4-analog-clock",
        type: "custom",
        coordinates: [500, 35, 1100, 595],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return {
              hour: question[currentQuizIndex]?.hour,
              minute: question[currentQuizIndex]?.minute,
              second: 0
            };
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
          // Circumference step labels (0 at 12 o’clock, 1–11 at hour ticks)
          showCircumferenceStepLabels: true,
          // — circle (radius / fill / border)
          circumferenceStepCircleRadius: "10gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          // — typography
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          // — layout (outward from outer end of hour ticks)
          circumferenceStepLabelOffset: "15gc",
          // — which circles to show: clock hours 1–12 (12 = top); page 5 clock uses same globals
          get circumferenceStepVisibleClockHours() {
            if (
              typeof window !== "undefined" &&
              Array.isArray(window.page4CircumferenceVisibleClockHours) &&
              window.page4CircumferenceVisibleClockHours.length > 0
            ) {
              return window.page4CircumferenceVisibleClockHours;
            }
            return [12];
          },
          get minuteSectorArcFrom12() {
            if (typeof window === "undefined") return null;
            const m = window.page4MinuteSectorArcEndMinute;
            if (typeof m === "number" && Number.isFinite(m) && m > 0) return m;
            return null;
          },
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
          // Minute-sector overlay (12 → tapped option on page 4 MCQ)
          showMinuteSectorAngleMarker: false,
          minuteSectorDashColor: "#2E86DE",
          minuteSectorDashThickness: 2,
          minuteSectorFillColor: "#FF9900",
          minuteSectorFillOpacity: 0.35,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },
      //tile component
      {
        id: "page4-tile-1",
        name: "page4-tile-1",
        type: "tile",
        coordinates: [670, 630, 790, 730], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "", // Visual focus mode by default
          get text() {
            return getCurrentQuestionHourTextForTile();
          }, // Hours tile — current Question.hour
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFFFFF", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // : sign
      {
        id: "page4-colon-sign",
        name: "page4-colon-sign",
        type: "custom",
        coordinates: [800, 630, 830, 730], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: ":",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "80gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //tile component -2
      {
        id: "page4-tile-2",
        name: "page4-tile-2",
        type: "tile",
        coordinates: [840, 630, 960, 730], // Centered horizontally in left panel (gap reduced to 10gc)
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
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //quiz panel
      {
        id: 'page4-quiz-panel',
        name: 'page4-quiz-panel',
        type: 'custom',
        coordinates: [1200, 5, 1595, 800], // Positioned in the main content area
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
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 50, // Options row: 70%
          feedbackRowHeight: 50, // Feedback row: 15%
          optionButtonWidth: 85,
          optionButtonHeight: 70,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '48gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#FFFFFF', // Black text color for option buttons
          // Options from current Question (getter — not one-shot at config build)
          get options() {
            return getCurrentQuestionMcqOptionsPage4();
          },
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
          imageAlt: getI18nText("common.tapAlt", ""),
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
            window.changePageAndNotify(5);
            // const pageKey = "page4";

            // // lock again for next question
            // window.quizUIState[pageKey].unlocked = false;

            // window.advanceToNextQuestionQuiz?.();

            // window.forceAppUpdate?.();
            // if (window?.isLastQuestion) {
            //   window.changePageAndNotify(3);

            // }
            // if (nav && nav.next !== null && typeof window !== "undefined") {
            //   if (window.changePageAndNotify) {
            //     window.changePageAndNotify(nav.next);
            //   } else if (window.navigateToPage) {
            //     window.navigateToPage(nav.next);
            //   } else {
            //     window.dispatchEvent(
            //       new CustomEvent("pageChanged", {
            //         detail: { page: nav.next },
            //       }),
            //     );
            //     console.log(
            //       "📄 [Next Button]",
            //       getI18nText("messages.nextButtonpage4", ""),
            //     );
            //   }
            // } else if (nav && nav.next === null) {
            //   // On last page, "Start Over" functionality
            //   console.log(
            //     "🔄 [Next Button]",
            //     getI18nText(
            //       "messages.lastPageStartingOver",
            //       "Last page - Starting over",
            //     ),
            //   );
            //   if (window.advanceToNextQuestion) {
            //     window.advanceToNextQuestion();
            //   } else if (window.changePageAndNotify) {
            //     window.changePageAndNotify(1);
            //   }
            // }
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
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page5-talk-text-box-black-background",
          get text() {
            const q = question[currentQuizIndex];
            const override = q?.page5TalkBox?.talkBoxText;
            if (override != null && override !== "") return override;
            const p =
              typeof window !== "undefined" &&
              typeof window.getPage5TalkBoxTemplateParamsFromQuestion ===
                "function"
                ? window.getPage5TalkBoxTemplateParamsFromQuestion(q)
                : { crossedClockNumber: "", options2TickNumber: "" };
            return getI18nText(
              "common.page5TalkBox.talkBoxTextTemplate",
              "",
              p,
            );
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
        id: "page5-dee-tee-image",
        name: "page5-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-dee-tee-image",
          elementName: "page5-dee-tee-image",
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

      // page5  black background
      {
        id: "page5-image1-black-background",
        name: "page5-image1-black-background",
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
      // Clock component — same props as page4-clock (shared page4* overlay globals)
      {
        id: "page5-clock",
        name: "page5-analog-clock",
        type: "custom",
        coordinates: [500, 35, 1100, 595],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return {
              hour: question[currentQuizIndex]?.hour,
              minute: question[currentQuizIndex]?.minute,
              second: 0
            };
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
          // Circumference step labels (0 at 12 o’clock, 1–11 at hour ticks)
          showCircumferenceStepLabels: true,
          // — circle (radius / fill / border)
          circumferenceStepCircleRadius: "10gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          // — typography
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          // — layout (outward from outer end of hour ticks)
          circumferenceStepLabelOffset: "15gc",
          // — labels + arc from 12 up to floor(minute/5)*5 for current question (not page 4 globals)
          get circumferenceStepVisibleClockHours() {
            if (typeof window.getPage5CircumferenceHoursFromQuestionMinute === "function") {
              return window.getPage5CircumferenceHoursFromQuestionMinute(
                question[currentQuizIndex]?.minute,
              );
            }
            return [12];
          },
          get minuteSectorArcFrom12() {
            if (typeof window.getPage5MinuteSectorArcFromQuestionMinute === "function") {
              return window.getPage5MinuteSectorArcFromQuestionMinute(
                question[currentQuizIndex]?.minute,
              );
            }
            return null;
          },
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
          // Minute-sector overlay: driven by question minute on page 5
          showMinuteSectorAngleMarker: false,
          minuteSectorDashColor: "#2E86DE",
          minuteSectorDashThickness: 2,
          minuteSectorFillColor: "#FF9900",
          minuteSectorFillOpacity: 0.35,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },
      //tile component
      {
        id: "page5-tile-1",
        name: "page5-tile-1",
        type: "tile",
        coordinates: [670, 630, 790, 730], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "", // Visual focus mode by default
          get text() {
            return getCurrentQuestionHourTextForTile();
          }, // Hours tile — current Question.hour
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFFFFF", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // : sign
      {
        id: "page5-colon-sign",
        name: "page5-colon-sign",
        type: "custom",
        coordinates: [800, 630, 830, 730], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: ":",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "80gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //tile component -2
      {
        id: "page5-tile-2",
        name: "page5-tile-2",
        type: "tile",
        coordinates: [840, 630, 960, 730], // Centered horizontally in left panel (gap reduced to 10gc)
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
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //quiz panel
      {
        id: 'page5-quiz-panel',
        name: 'page5-quiz-panel',
        type: 'custom',
        coordinates: [1200, 5, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page5.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page5.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '34gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 50, // Options row: 70%
          feedbackRowHeight: 50, // Feedback row: 15%
          optionButtonWidth: 85,
          optionButtonHeight: 70,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #70ACC7",
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '48gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#FFFFFF', // Black text color for option buttons
          // options2 from current Question (getter — not one-shot at config build)
          get options() {
            return getCurrentQuestionMcqOptionsPage5();
          },
          // For dynamic options2 feedback (crossed clock number from question minute)
          quizFeedbackContext: {
            get questionMinute() {
              const idx =
                typeof window !== "undefined"
                  ? window.currentQuizIndex
                  : undefined;
              const q =
                typeof window !== "undefined" && window.question?.[idx];
              return q?.minute;
            },
          },
          keyConcepts: [],
          impFormulae: []
        }
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
          imageAlt: getI18nText("common.tapAlt", ""),
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
            window.changePageAndNotify(6);
            // const pageKey = "page5";

            // // lock again for next question
            // window.quizUIState[pageKey].unlocked = false;

            // window.advanceToNextQuestionQuiz?.();

            // window.forceAppUpdate?.();
            // if (window?.isLastQuestion) {
            //   window.changePageAndNotify(3);

            // }
            // if (nav && nav.next !== null && typeof window !== "undefined") {
            //   if (window.changePageAndNotify) {
            //     window.changePageAndNotify(nav.next);
            //   } else if (window.navigateToPage) {
            //     window.navigateToPage(nav.next);
            //   } else {
            //     window.dispatchEvent(
            //       new CustomEvent("pageChanged", {
            //         detail: { page: nav.next },
            //       }),
            //     );
            //     console.log(
            //       "📄 [Next Button]",
            //       getI18nText("messages.nextButtonpage5", ""),
            //     );
            //   }
            // } else if (nav && nav.next === null) {
            //   // On last page, "Start Over" functionality
            //   console.log(
            //     "🔄 [Next Button]",
            //     getI18nText(
            //       "messages.lastPageStartingOver",
            //       "Last page - Starting over",
            //     ),
            //   );
            //   if (window.advanceToNextQuestion) {
            //     window.advanceToNextQuestion();
            //   } else if (window.changePageAndNotify) {
            //     window.changePageAndNotify(1);
            //   }
            // }
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
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page6-talk-text-box-black-background",
          get text() {
            const q = question[currentQuizIndex];
            const override = q?.page6TalkBox?.talkBoxText;
            if (override != null && override !== "") return override;
            const p =
              typeof window !== "undefined" &&
              typeof window.getPage6TalkBoxTemplateParamsFromQuestion ===
                "function"
                ? window.getPage6TalkBoxTemplateParamsFromQuestion(q)
                : {
                    minutesAtMark: "",
                    marksPhrase: "",
                    hour: "",
                    minute: "",
                  };
            return getI18nText(
              "common.page6TalkBox.talkBoxTextTemplate",
              "",
              p,
            );
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
        id: "page6-dee-tee-image",
        name: "page6-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page6-dee-tee-image",
          elementName: "page6-dee-tee-image",
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

      // page6  black background
      {
        id: "page6-image1-black-background",
        name: "page6-image1-black-background",
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
      // Clock component — like page 5; arc sweeps to exact minute (page 6), labels still floored-five
      {
        id: "page6-clock",
        name: "page6-analog-clock",
        type: "custom",
        coordinates: [500, 35, 1100, 595],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return {
              hour: question[currentQuizIndex]?.hour,
              minute: question[currentQuizIndex]?.minute,
              second: 0
            };
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
          // Circumference step labels (0 at 12 o’clock, 1–11 at hour ticks)
          showCircumferenceStepLabels: true,
          // — circle (radius / fill / border)
          circumferenceStepCircleRadius: "10gc",
          circumferenceStepCircleFill: "#FFFFFF",
          circumferenceStepCircleStrokeWidth: "2gc",
          circumferenceStepCircleStroke: "aqua",
          // — typography
          circumferenceStepFontSize: "14gc",
          circumferenceStepTextColor: "#000000",
          // — layout (outward from outer end of hour ticks)
          circumferenceStepLabelOffset: "15gc",
          // — step labels through floor(minute/5)*5; arc from 12 to exact question minute
          get circumferenceStepVisibleClockHours() {
            if (typeof window.getPage5CircumferenceHoursFromQuestionMinute === "function") {
              return window.getPage5CircumferenceHoursFromQuestionMinute(
                question[currentQuizIndex]?.minute,
              );
            }
            return [12];
          },
          get minuteSectorArcFrom12() {
            if (typeof window.getPage6MinuteSectorArcFromQuestionMinute === "function") {
              return window.getPage6MinuteSectorArcFromQuestionMinute(
                question[currentQuizIndex]?.minute,
              );
            }
            return null;
          },
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
          // Minute-sector overlay: exact minute for arc; labels still floored-five
          showMinuteSectorAngleMarker: false,
          minuteSectorDashColor: "#2E86DE",
          minuteSectorDashThickness: 2,
          minuteSectorFillColor: "#FF9900",
          minuteSectorFillOpacity: 0.35,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },
      //tile component
      {
        id: "page6-tile-1",
        name: "page6-tile-1",
        type: "tile",
        coordinates: [670, 630, 790, 730], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "", // Visual focus mode by default
          get text() {
            return getCurrentQuestionHourTextForTile();
          }, // Hours tile — current Question.hour
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFFFFF", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      // : sign
      {
        id: "page6-colon-sign",
        name: "page6-colon-sign",
        type: "custom",
        coordinates: [800, 630, 830, 730], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: ":",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "80gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //tile component -2
      {
        id: "page6-tile-2",
        name: "page6-tile-2",
        type: "tile",
        coordinates: [840, 630, 960, 730], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "normal", // Keep base mode neutral; pulsate comes from explicit animation styles
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFD700", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "80gc",
          fontWeight: "bold",
          animation: "pulsateGlow 1.2s ease-in-out infinite",
          boxShadow: "0 0 16px rgba(255, 235, 59, 0.95)",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //numpad
      {
        id: "page6-number-pad",
        name: "page6-number-pad",
        type: "number-pad-panel",
        coordinates: [1200, 5, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "rgb(0,0,0,0.7)",
          borderRadius: "15gc",
          border: "2px solid #70ACC7",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          setFocusOnLoad: true, // Keep tile-2 highlighted when page renders
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: null, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page6-feedback-textbox')
          destinations: [
            {
              destinationId: "page6-tile-2", // Quotient tile
              destinationType: "tile",
              get correctValue() {
                return question[currentQuizIndex]?.minute;
              },
              get correctFeedback() {
                const h = question[currentQuizIndex]?.hour;
                const m = question[currentQuizIndex]?.minute;
                return getI18nText(
                  "common.box2Numpad.correctFeedbackTemplate",
                  "",
                  {
                    hour: h != null ? String(h) : "",
                    minute:
                      m != null ? String(m).padStart(2, "0") : "",
                  },
                );
              },
              get incorrectFeedback() {
                return getI18nText("common.box2Numpad.incorrectFeedback", "");
              },
              emptyFeedback: getI18nText(
                "pages.page6.feedback.emptyFeedback",
                "",
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },

          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            get text() {
              return getI18nText("numberPad.showHint", "");
            },
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
            get text() {
              return getI18nText("numberPad.check", "");
            },
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            borderColor: 'transparent',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: ""
          }
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
          imageAlt: getI18nText("common.tapAlt", ""),
          initialVisible: false
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
            const pageKey = "page6";

            // lock again for next question
            window.quizUIState[pageKey].unlocked = false;

            window.advanceToNextQuestionQuiz?.();

            window.forceAppUpdate?.();
            if (window?.isLastQuestion) {
              window.changePageAndNotify(7);

            }
            else {
              window.changePageAndNotify(2);
            }
            // if (window?.isLastQuestion) {
            //   window.changePageAndNotify(3);

            // }
            // // if (nav && nav.next !== null && typeof window !== "undefined") {
            //   if (window.changePageAndNotify) {
            //     window.changePageAndNotify(nav.next);
            //   } else if (window.navigateToPage) {
            //     window.navigateToPage(nav.next);
            //   } else {
            //     window.dispatchEvent(
            //       new CustomEvent("pageChanged", {
            //         detail: { page: nav.next },
            //       }),
            //     );
            //     console.log(
            //       "📄 [Next Button]",
            //       getI18nText("messages.nextButtonpage6", ""),
            //     );
            //   }
            // } else if (nav && nav.next === null) {
            //   // On last page, "Start Over" functionality
            //   console.log(
            //     "🔄 [Next Button]",
            //     getI18nText(
            //       "messages.lastPageStartingOver",
            //       "Last page - Starting over",
            //     ),
            //   );
            //   if (window.advanceToNextQuestion) {
            //     window.advanceToNextQuestion();
            //   } else if (window.changePageAndNotify) {
            //     window.changePageAndNotify(1);
            //   }
            // }
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
            window.location.reload();
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
        if (confirm(getI18nText("messages.pageStatesCleared", ""))) {
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
