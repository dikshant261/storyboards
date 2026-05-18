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
  11: { prev: 10, next: null },
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

/** When entering a sequence page, mark it as not completed so Next/TapGif stay disabled until sequence is done. */
const setPageCompletedForSequence = (pageNumber) => {
  if (
    typeof window !== "undefined" &&
    window.PageCompletionManager &&
    typeof window.PageCompletionManager.setPageCompleted === "function"
  ) {
    window.PageCompletionManager.setPageCompleted(pageNumber, false);
  }
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
          ],
        },
      },
      // page2  black background
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
      // Clock component - centered, large (styled per config)
      {
        id: "page2-clock",
        name: "page2-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          targetHour: 11,
          quizPageNumber: 2,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
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
      // Replay — resets page 2 clock activity (below clock face)
      {
        id: "page2-replay-button",
        name: "page2-replay-button",
        type: "button",
        coordinates: [820, 688, 1180, 748],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          disableOnEvent: "page2CorrectAnimationStarted",
          disableOnEventFilter: { pageNumber: 2 },
          enableOnEvent: "page2AnimationsComplete",
          enableOnEventFilter: { pageNumber: 2 },
          get text() {
            return getI18nText("buttons.replay", "Replay");
          },
          fontSize: "34gc",
          backgroundColor: "#FF9900",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (typeof window !== "undefined" && window.dispatchEvent) {
              window.dispatchEvent(
                new CustomEvent("page2Replay", { detail: { pageNumber: 2 } }),
              );
            }
            if (
              typeof window !== "undefined" &&
              window.PageCompletionManager &&
              typeof window.PageCompletionManager.setPageCompleted === "function"
            ) {
              window.PageCompletionManager.setPageCompleted(2, false);
            }
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
        id: "page2-tap-animation-1",
        name: "tap-animation-1",
        type: "custom",
        // Positioned over the clickable label (end - 1 hour) for page2 (pagi → 10)
        coordinates: [860, 170, 904, 210],
        // coordinates: [855, 250, 900, 300],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          // opacity: 0.75,
        },
      },
      // Tap Animation GIF (hidden until page 2 quiz completed)
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
          initialVisible: false,
          showOnEvent: "quizCompleted",
          showOnEventFilter: { pageNumber: 2 },
        },
      },

      // Optimized Next button - Three Layer Structure (quiz detection: enabled after hour "3" is clicked)
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 2 },
          disableOnEvent: "page2Replay",
          disableOnEventFilter: { pageNumber: 2 },
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
      // Same layout as page 2 (no replay button)
      {
        id: "page3-talk-text-box-black-background",
        name: "page3-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420],
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
      {
        id: "page3-dee-tee-image",
        name: "page3-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800],
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
              opacity: 1,
            },
          ],
        },
      },
      {
        id: "page3-image1-black-background",
        name: "page3-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800],
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
        id: "page3-clock",
        name: "page3-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 11, minute: 0, second: 0 },
          dialArcStartTime: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          clickToSetHour: true,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
        },
      },
      {
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895],
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
      // Page 3 feedback box (activity description) under the clock
      {
        id: "page3-feedback-box",
        name: "page3-feedback-box",
        type: "custom",
        // Under the clock (ends at y=605) and above instruction line (starts at y=820)
        coordinates: [520, 620, 1480, 790],
        zIndex: 56,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          initialVisible: false,
          showOnEvent: "page3ClockTimeChanged",
          showOnEventFilter: { pageNumber: 3 },
          backgroundColor: "rgba(0,0,0,0.3)",
          border: "3gc dashed white",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "34gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
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
          initialVisible: false,
          showOnEvent: "quizCompleted",
          showOnEventFilter: { pageNumber: 3 },
        },
      },
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 3 },
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
            if (nav && nav.prev !== null && typeof window !== "undefined") {
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
      // page4 talk text box black background
      {
        id: "page4-talk-text-box-black-background",
        name: "page4-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
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
          ],
        },
      },
      // page4  black background
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
      // Clock component - centered, large (styled per config)
      {
        id: "page4-clock",
        name: "page4-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          targetHour: 11,
          quizPageNumber: 4,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
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
      // Replay — resets page 2 clock activity (below clock face)
      {
        id: "page4-replay-button",
        name: "page4-replay-button",
        type: "button",
        coordinates: [820, 688, 1180, 748],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          disableOnEvent: "page4CorrectAnimationStarted",
          disableOnEventFilter: { pageNumber: 4 },
          enableOnEvent: "page4AnimationsComplete",
          enableOnEventFilter: { pageNumber: 4 },
          get text() {
            return getI18nText("buttons.replay", "Replay");
          },
          fontSize: "34gc",
          backgroundColor: "#FF9900",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (typeof window !== "undefined" && window.dispatchEvent) {
              window.dispatchEvent(
                new CustomEvent("page4Replay", { detail: { pageNumber: 4 } }),
              );
            }
            if (
              typeof window !== "undefined" &&
              window.PageCompletionManager &&
              typeof window.PageCompletionManager.setPageCompleted === "function"
            ) {
              window.PageCompletionManager.setPageCompleted(4, false);
            }
          },
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
        id: "page4-tap-animation-1",
        name: "tap-animation-1",
        type: "custom",
        // Positioned over the clickable label (end - 1 hour) for page4 (siang → 1)
        coordinates: [1098, 92, 1142, 142],
        // coordinates: [950, 75, 1000, 125],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          // opacity: 0.75,
        },
      },
      // Tap Animation GIF (hidden until page 2 quiz completed)
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
          showOnEvent: "quizCompleted",
          showOnEventFilter: { pageNumber: 4 },
        },
      },

      // Optimized Next button - Three Layer Structure (quiz detection: enabled after hour "3" is clicked)
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 4 },
          disableOnEvent: "page4Replay",
          disableOnEventFilter: { pageNumber: 4 },
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
                  getI18nText("messages.nextButtonpage4", ""),
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
      // Same layout as page 2 (no replay button)
      {
        id: "page5-talk-text-box-black-background",
        name: "page5-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420],
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
      {
        id: "page5-dee-tee-image",
        name: "page5-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800],
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
              opacity: 1,
            },
          ],
        },
      },
      {
        id: "page5-image1-black-background",
        name: "page5-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800],
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
        id: "page5-clock",
        name: "page5-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 10, minute: 0, second: 0 },
          dialArcStartTime: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          clickToSetHour: true,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
        },
      },
      {
        id: "page5-instruction-text",
        name: "page5-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895],
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
      // Page 3 feedback box (activity description) under the clock
      {
        id: "page5-feedback-box",
        name: "page5-feedback-box",
        type: "custom",
        // Under the clock (ends at y=605) and above instruction line (starts at y=820)
        coordinates: [520, 620, 1480, 790],
        zIndex: 56,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          initialVisible: false,
          showOnEvent: "page5ClockTimeChanged",
          showOnEventFilter: { pageNumber: 5 },
          backgroundColor: "rgba(0,0,0,0.3)",
          border: "3gc dashed white",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "34gc",
          padding: "15gc",
          allowHtml: true,
        },
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
          initialVisible: false,
          showOnEvent: "quizCompleted",
          showOnEventFilter: { pageNumber: 5 },
        },
      },
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 5 },
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
            if (nav && nav.prev !== null && typeof window !== "undefined") {
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
        coordinates: [10, 5, 400, 420], // Positioned below question text box
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
          ],
        },
      },
      // page6  black background
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
      // Clock component - centered, large (styled per config)
      {
        id: "page6-clock",
        name: "page6-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          targetHour: 3,
          quizPageNumber: 6,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
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
      // Replay — resets page 2 clock activity (below clock face)
      {
        id: "page6-replay-button",
        name: "page6-replay-button",
        type: "button",
        coordinates: [820, 688, 1180, 748],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          disableOnEvent: "page6CorrectAnimationStarted",
          disableOnEventFilter: { pageNumber: 6 },
          enableOnEvent: "page6AnimationsComplete",
          enableOnEventFilter: { pageNumber: 6 },
          get text() {
            return getI18nText("buttons.replay", "Replay");
          },
          fontSize: "34gc",
          backgroundColor: "#FF9900",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (typeof window !== "undefined" && window.dispatchEvent) {
              window.dispatchEvent(
                new CustomEvent("page6Replay", { detail: { pageNumber: 6 } }),
              );
            }
            if (
              typeof window !== "undefined" &&
              window.PageCompletionManager &&
              typeof window.PageCompletionManager.setPageCompleted === "function"
            ) {
              window.PageCompletionManager.setPageCompleted(6, false);
            }
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
        id: "page6-tap-animation-1",
        name: "tap-animation-1",
        type: "custom",
        // Positioned over the clickable label (end - 1 hour) for page6 (sore → 6)
        coordinates: [980, 540, 1024, 590],
        // coordinates: [950, 75, 1000, 125],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          // opacity: 0.75,
        },
      },
      // Tap Animation GIF (hidden until page 2 quiz completed)
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
          initialVisible: false,
          showOnEvent: "quizCompleted",
          showOnEventFilter: { pageNumber: 6 },
        },
      },

      // Optimized Next button - Three Layer Structure (quiz detection: enabled after hour "3" is clicked)
      {
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 6 },
          disableOnEvent: "page6Replay",
          disableOnEventFilter: { pageNumber: 6 },
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
      // Same layout as page 2 (no replay button)
      {
        id: "page7-talk-text-box-black-background",
        name: "page7-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      {
        id: "page7-dee-tee-image",
        name: "page7-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800],
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
              opacity: 1,
            },
          ],
        },
      },
      {
        id: "page7-image1-black-background",
        name: "page7-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800],
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
        id: "page7-clock",
        name: "page7-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 7, minute: 0, second: 0 },
          dialArcStartTime: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          clickToSetHour: true,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
        },
      },
      {
        id: "page7-instruction-text",
        name: "page7-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895],
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page7.instructionText", ""),
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
      // Page 3 feedback box (activity description) under the clock
      {
        id: "page7-feedback-box",
        name: "page7-feedback-box",
        type: "custom",
        // Under the clock (ends at y=605) and above instruction line (starts at y=820)
        coordinates: [520, 620, 1480, 790],
        zIndex: 56,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          initialVisible: false,
          showOnEvent: "page7ClockTimeChanged",
          showOnEventFilter: { pageNumber: 7 },
          backgroundColor: "rgba(0,0,0,0.3)",
          border: "3gc dashed white",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "34gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
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
          showOnEvent: "page7AnimationsComplete",
          showOnEventFilter: { pageNumber: 7 },
        },
      },
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "page7AnimationsComplete",
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
            if (nav && nav.prev !== null && typeof window !== "undefined") {
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
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page8.talkBoxText", ""),
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
          ],
        },
      },
      // page8  black background
      {
        id: "page8-image1-black-background",
        name: "page8-image1-black-background",
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
      // Clock component - centered, large (styled per config)
      {
        id: "page8-clock",
        name: "page8-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          targetHour: 7,
          quizPageNumber: 8,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
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
      // Replay — resets page 2 clock activity (below clock face)
      {
        id: "page8-replay-button",
        name: "page8-replay-button",
        type: "button",
        coordinates: [820, 688, 1180, 748],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          disableOnEvent: "page8CorrectAnimationStarted",
          disableOnEventFilter: { pageNumber: 8 },
          enableOnEvent: "page8AnimationsComplete",
          enableOnEventFilter: { pageNumber: 8 },
          get text() {
            return getI18nText("buttons.replay", "Replay");
          },
          fontSize: "34gc",
          backgroundColor: "#FF9900",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (typeof window !== "undefined" && window.dispatchEvent) {
              window.dispatchEvent(
                new CustomEvent("page8Replay", { detail: { pageNumber: 8 } }),
              );
            }
            if (
              typeof window !== "undefined" &&
              window.PageCompletionManager &&
              typeof window.PageCompletionManager.setPageCompleted === "function"
            ) {
              window.PageCompletionManager.setPageCompleted(8, false);
            }
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
        id: "page8-tap-animation-1",
        name: "tap-animation-1",
        type: "custom",
        // Positioned over the clickable label (end - 1 hour) for page8 (malam → 4)
        coordinates: [1186, 420, 1230, 470],
        // coordinates: [950, 75, 1000, 125],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          // opacity: 0.75,
        },
      },
      // Tap Animation GIF (hidden until page 2 quiz completed)
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
          showOnEvent: "quizCompleted",
          showOnEventFilter: { pageNumber: 8 },
        },
      },

      // Optimized Next button - Three Layer Structure (quiz detection: enabled after hour "3" is clicked)
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
          disableOnEvent: "page8Replay",
          disableOnEventFilter: { pageNumber: 8 },
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
      // Same layout as page 2 (no replay button)
      {
        id: "page9-talk-text-box-black-background",
        name: "page9-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.talkBoxText", ""),
          backgroundColor: "rgb(0,0,0,0.7)",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      {
        id: "page9-dee-tee-image",
        name: "page9-dee-tee-image",
        type: "custom",
        coordinates: [50, 440, 400, 800],
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page9-dee-tee-image",
          elementName: "page9-dee-tee-image",
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/deeTee.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
          ],
        },
      },
      {
        id: "page9-image1-black-background",
        name: "page9-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1595, 800],
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
        id: "page9-clock",
        name: "page9-analog-clock",
        type: "custom",
        coordinates: [700, 45, 1300, 605],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 3, minute: 0, second: 0 },
          dialArcStartTime: { hour: 5, minute: 0, second: 0 },
          realTime: false,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          hourHandColor: "#FFD700",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#00FFFF",
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
          numberColor: "#000000",
          numberColors: null,
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          numbersClickable: true,
          clickToSetHour: true,
          handsClickable: true,
          minuteHandSpeed: 5,
          arcColor: "#FF9900",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc",
        },
      },
      {
        id: "page9-instruction-text",
        name: "page9-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895],
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page9.instructionText", ""),
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
      // Page 3 feedback box (activity description) under the clock
      {
        id: "page9-feedback-box",
        name: "page9-feedback-box",
        type: "custom",
        // Under the clock (ends at y=605) and above instruction line (starts at y=820)
        coordinates: [520, 620, 1480, 790],
        zIndex: 56,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          initialVisible: false,
          showOnEvent: "page9ClockTimeChanged",
          showOnEventFilter: { pageNumber: 9 },
          backgroundColor: "rgba(0,0,0,0.3)",
          border: "3gc dashed white",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "34gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
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
          initialVisible: true,
          showOnEvent: "page9AnimationsComplete",
          showOnEventFilter: { pageNumber: 9 },
        },
      },
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true,
          enableOnEvent: "page9AnimationsComplete",
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
                  getI18nText("messages.nextButtonpage9", ""),
                );
              }
            } else if (nav && nav.next === null) {
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
            if (nav && nav.prev !== null && typeof window !== "undefined") {
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
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
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
      // maintext
      {
        id: "page10-main-text",
        name: "page10-main-text",
        type: "custom",
        coordinates: [200, 180, 1400, 200], // Positioned below question text box
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
      // page table
      {
        id: "page10-table",
        name: "page10-table",
        type: 'custom',
        coordinates: [200, 270, 1400, 470],
        zIndex: 56,
        props: {
          componentType: 'TableGridComponent',
          tableData: getI18nText("pages.page10.tableData"),
          borderColor: '#ffffff',
          headerBackgroundColor: '#2a3f5f',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: [], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: {}, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          fontSize: '38gc',
          headerFontSize: '40gc',
          padding: '15gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {} // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
        },


      },
      // Tap Animation GIF
      {
        id: "page10-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 790, 700, 890],
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
        coordinates: [650, 750, 950, 850],
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
        if (
          confirm(
            getI18nText("messages.pageStatesCleared", ""),
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
