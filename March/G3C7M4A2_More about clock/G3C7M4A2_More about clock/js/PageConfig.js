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
        coordinates: [505, 600, 1095, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page2-time-of-day-text",
          text: getI18nText("pages.page2.clockReads"),
          backgroundColor: "#6a5132ca",
          border: "3px dashed orange",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page2-clock",
        name: "page2-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
        coordinates: [705, 600, 895, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page3-time-of-day-text",
          text: getI18nText("pages.page3.clockReads"),
          backgroundColor: "#6a5132ca",
          border: "3px dashed orange",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page3-clock",
        name: "page3-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
      // //time of day text
      // {
      //   id: "page4-time-of-day-text",
      //   name: "page4-time-of-day-text",
      //   type: "custom",
      //   coordinates: [705, 600, 895, 700], // Positioned below question text box
      //   zIndex: 55,
      //   props: {
      //     componentType: "SectionHeaderComponent",
      //     id: "page4-time-of-day-text",
      //     text: getI18nText("pages.page4.clockReads"),
      //     backgroundColor: "#6a5132ca",
      //     border: "3px dashed orange",
      //     borderRadius: "15gc",
      //     textColor: "#ffff",
      //     fontSize: "50gc",
      //     padding: "15gc",
      //     textAlign: 'center',
      //     allowHtml: true,
      //   },
      // },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page4-clock",
        name: "page4-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page4-feedback-textbox')
          destinations: [
            {
              destinationId: "page4-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "3",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page4.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page4.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page4.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
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
            text: "show 💡",
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
            text: "CHECK",
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
                  getI18nText("messages.nextButtonpage4", ""),
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
          text: getI18nText("pages.page5.talkBoxText", ""),
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
      // //time of day text
      // {
      //   id: "page5-time-of-day-text",
      //   name: "page5-time-of-day-text",
      //   type: "custom",
      //   coordinates: [705, 600, 895, 700], // Positioned below question text box
      //   zIndex: 55,
      //   props: {
      //     componentType: "SectionHeaderComponent",
      //     id: "page5-time-of-day-text",
      //     text: getI18nText("pages.page5.clockReads"),
      //     backgroundColor: "#6a5132ca",
      //     border: "3px dashed orange",
      //     borderRadius: "15gc",
      //     textColor: "#ffff",
      //     fontSize: "50gc",
      //     padding: "15gc",
      //     textAlign: 'center',
      //     allowHtml: true,
      //   },
      // },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page5-clock",
        name: "page5-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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

      // page5  right background
      {
        id: "page5-right background",
        name: "page5-right background",
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
        id: "page5-number-pad",
        name: "page5-number-pad",
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
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page5-feedback-textbox')
          destinations: [
            {
              destinationId: "page5-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "3",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page5.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page5.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page5.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
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
            text: "show 💡",
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
            text: "CHECK",
          },
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
          text: getI18nText("pages.page6.talkBoxText", ""),
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
      // //time of day text
      // {
      //   id: "page6-time-of-day-text",
      //   name: "page6-time-of-day-text",
      //   type: "custom",
      //   coordinates: [705, 600, 895, 700], // Positioned below question text box
      //   zIndex: 55,
      //   props: {
      //     componentType: "SectionHeaderComponent",
      //     id: "page6-time-of-day-text",
      //     text: getI18nText("pages.page6.clockReads"),
      //     backgroundColor: "#6a5132ca",
      //     border: "3px dashed orange",
      //     borderRadius: "15gc",
      //     textColor: "#ffff",
      //     fontSize: "50gc",
      //     padding: "15gc",
      //     textAlign: 'center',
      //     allowHtml: true,
      //   },
      // },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page6-clock",
        name: "page6-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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

      // page6  right background
      {
        id: "page6-right background",
        name: "page6-right background",
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
        id: "page6-number-pad",
        name: "page6-number-pad",
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
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page6-feedback-textbox')
          destinations: [
            {
              destinationId: "page6-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "3",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page6.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page6.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page6.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
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
            text: "show 💡",
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
            text: "CHECK",
          },
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
          text: getI18nText("pages.page7.talkBoxText", ""),
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
      // //time of day text
      // {
      //   id: "page7-time-of-day-text",
      //   name: "page7-time-of-day-text",
      //   type: "custom",
      //   coordinates: [705, 600, 895, 700], // Positioned below question text box
      //   zIndex: 55,
      //   props: {
      //     componentType: "SectionHeaderComponent",
      //     id: "page7-time-of-day-text",
      //     text: getI18nText("pages.page7.clockReads"),
      //     backgroundColor: "#6a5132ca",
      //     border: "3px dashed orange",
      //     borderRadius: "15gc",
      //     textColor: "#ffff",
      //     fontSize: "50gc",
      //     padding: "15gc",
      //     textAlign: 'center',
      //     allowHtml: true,
      //   },
      // },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page7-clock",
        name: "page7-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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

      // page7  right background
      {
        id: "page7-right background",
        name: "page7-right background",
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
        id: "page7-number-pad",
        name: "page7-number-pad",
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
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page7-feedback-textbox')
          destinations: [
            {
              destinationId: "page7-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "3",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page7.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page7.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page7.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
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
            text: "show 💡",
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
            text: "CHECK",
          },
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
      // page1 talk text box black background
      {
        id: "page8-talk-text-box-black-background",
        name: "page8-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page8-talk-text-box-black-background",
          text: getI18nText("pages.page8.talkBoxText", ""),
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

      // page8  black background
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
      // //time of day text
      // {
      //   id: "page8-time-of-day-text",
      //   name: "page8-time-of-day-text",
      //   type: "custom",
      //   coordinates: [705, 600, 895, 700], // Positioned below question text box
      //   zIndex: 55,
      //   props: {
      //     componentType: "SectionHeaderComponent",
      //     id: "page8-time-of-day-text",
      //     text: getI18nText("pages.page8.clockReads"),
      //     backgroundColor: "#6a5132ca",
      //     border: "3px dashed orange",
      //     borderRadius: "15gc",
      //     textColor: "#ffff",
      //     fontSize: "50gc",
      //     padding: "15gc",
      //     textAlign: 'center',
      //     allowHtml: true,
      //   },
      // },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page8-clock",
        name: "page8-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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

      // page8  right background
      {
        id: "page8-right background",
        name: "page8-right background",
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
        id: "page8-number-pad",
        name: "page8-number-pad",
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
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page8-feedback-textbox')
          destinations: [
            {
              destinationId: "page8-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "3",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page8.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page8.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page8.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
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
            text: "show 💡",
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
            text: "CHECK",
          },
        },
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
      // Clock component - centered, large (styled like reference image)
      {
        id: "page9-clock",
        name: "page9-analog-clock",
        type: "custom",
        coordinates: [20, 110, 890, 800],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
      // Clock component - centered, large (styled like reference image)
      {
        id: "page10-clock",
        name: "page10-analog-clock",
        type: "custom",
        coordinates: [20, 110, 590, 800],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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


      // Clock component - centered, large (styled like reference image)
      {
        id: "page11-clock",
        name: "page11-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 30, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 40, // Feedback row: 15%
          optionButtonWidth: 95,
          optionButtonHeight: 75,
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
        coordinates: [605, 600, 895, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page3-time-of-day-text",
          text: getI18nText("pages.page12.clockReads"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "80gc",
          padding: "15gc",
          textAlign: 'center',
          allowHtml: true,
        },
      },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page12-clock",
        name: "page12-analog-clock",
        type: "custom",
        coordinates: [550, 50, 1050, 580],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 6, minute: 30, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
              correctFeedback: getI18nText(
                "pages.page12.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page12.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page12.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
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
            text: "show 💡",
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
            text: "CHECK",
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
      // Clock component - centered, large (styled like reference image)
      {
        id: "page13-clock",
        name: "page13-analog-clock",
        type: "custom",
        coordinates: [20, 110, 890, 800],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 7, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "90gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "100gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
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
          fontSize: "50gc",
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
