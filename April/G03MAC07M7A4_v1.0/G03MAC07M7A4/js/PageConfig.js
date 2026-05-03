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
  6: { prev: 5, next: null },
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
 * @param {string} key - Translation key (dot path under current language in data.js)
 * @param {Object} [params] - Parameters for {placeholder} interpolation in i18n.t
 * @returns {string} Translated string, or empty string if i18n is unavailable
 */
const getI18nText = (key, params = {}) => {
  return typeof i18n !== "undefined" ? i18n.t(key, params) : "";
};

const getSharedQuestionBank = () => {
  const appData = typeof window !== "undefined" ? window.AppData : undefined;
  const currentLanguage =
    typeof i18n !== "undefined" && typeof i18n.getCurrentLanguage === "function"
      ? i18n.getCurrentLanguage()
      : appData?.currentLanguage;

  const currentLanguageQuestions = appData?.translations?.[currentLanguage]?.question;
  if (Array.isArray(currentLanguageQuestions) && currentLanguageQuestions.length > 0) {
    return currentLanguageQuestions;
  }

  const englishQuestions = appData?.translations?.en?.question;
  if (Array.isArray(englishQuestions) && englishQuestions.length > 0) {
    return englishQuestions;
  }

  const i18nQuestions =
    typeof i18n !== "undefined" && typeof i18n.t === "function"
      ? i18n.t("question")
      : [];

  return Array.isArray(i18nQuestions) ? i18nQuestions : [];
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

/** Keep PageCompletionManager in sync with lift-bag / multi-step sequence state. */
const setPageCompletedForSequence = (pageNumber) => {
  if (typeof window === "undefined") return;
  const config = getPageSequenceConfig(pageNumber);
  if (!config || !config.steps || !config.steps.length) return;
  const mgr = window.PageCompletionManager;
  if (mgr && typeof mgr.setPageCompleted === "function") {
    mgr.setPageCompleted(pageNumber, isPageSequenceComplete(pageNumber));
  }
};

// ===== GRID POSITION PAGES =====

const createOptimizedGridPositionPages = () => {
  // Helper function to get current question data (optimized)
  const getQuestionBank = () => getSharedQuestionBank();

  const formatTwoDigits = (value) => String(value).padStart(2, "0");

  const parseQuestionTime = (timeText) => {
    const rawValue = String(timeText || "").trim();
    const normalized = rawValue.toLowerCase().replace(/\./g, "");
    const match = normalized.match(/^(\d{1,2})(?::(\d{1,2}))?\s*([ap]m)$/);

    if (!match) {
      return {
        raw: rawValue,
        hour12: 0,
        minute: 0,
        meridiem: "am",
        hour24: 0,
      };
    }

    const hour12 = parseInt(match[1], 10);
    const minute = parseInt(match[2] || "0", 10);
    const meridiem = match[3];
    let hour24 = hour12 % 12;

    if (meridiem === "pm") {
      hour24 += 12;
    }

    return {
      raw: rawValue,
      hour12,
      minute,
      meridiem,
      hour24,
    };
  };

  const toAbsoluteMinutes = (parsedTime) =>
    parsedTime.hour24 * 60 + parsedTime.minute;

  const getDurationParts = (startParsed, endParsed) => {
    let totalMinutes = toAbsoluteMinutes(endParsed) - toAbsoluteMinutes(startParsed);

    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      totalMinutes,
      hours,
      minutes,
      hourTens: Math.floor(hours / 10),
      hourOnes: hours % 10,
      minuteTens: Math.floor(minutes / 10),
      minuteOnes: minutes % 10,
    };
  };

  const formatTimeForQuestionText = (parsedTime) =>
    `${parsedTime.hour12}:${formatTwoDigits(parsedTime.minute)} ${parsedTime.meridiem}`;

  const formatTimeForDisplay = (parsedTime) =>
    `${parsedTime.hour12}: ${formatTwoDigits(parsedTime.minute)} ${parsedTime.meridiem}`;

  const formatTimeShort = (parsedTime) =>
    `${parsedTime.hour12}:${formatTwoDigits(parsedTime.minute)}`;

  const getClockTimeValue = (parsedTime) => ({
    hour: parsedTime.hour12,
    minute: parsedTime.minute,
    second: 0,
  });

  const getQuestionStepClockTime = (startParsed, stepOffsetHours) => {
    const totalMinutes = toAbsoluteMinutes(startParsed) + stepOffsetHours * 60;
    const normalizedMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
    const hour24 = Math.floor(normalizedMinutes / 60);
    const minute = normalizedMinutes % 60;
    let hour12 = hour24 % 12;

    if (hour12 === 0) {
      hour12 = 12;
    }

    return {
      hour: hour12,
      minute,
      second: 0,
    };
  };

  const getCurrentQuestionData = () => {
    const questions = getQuestionBank();
    const currentIndex =
      typeof window !== "undefined" && window.currentQuestionIndex !== undefined
        ? window.currentQuestionIndex
        : 0;
    const boundedIndex = questions.length
      ? Math.min(Math.max(currentIndex, 0), questions.length - 1)
      : 0;
    const currentQuestion = questions[boundedIndex] || {
      questionText: "",
      startTime: "",
      endTime: "",
      duration: "",
    };
    const startParsed = parseQuestionTime(currentQuestion.startTime);
    const endParsed = parseQuestionTime(currentQuestion.endTime);
    const durationParts = getDurationParts(startParsed, endParsed);
    const usesDoubleDigitHours = startParsed.hour12 >= 10 || endParsed.hour12 >= 10;
    const startHourDigits = usesDoubleDigitHours
      ? formatTwoDigits(startParsed.hour12)
      : String(startParsed.hour12);
    const endHourDigits = usesDoubleDigitHours
      ? formatTwoDigits(endParsed.hour12)
      : String(endParsed.hour12);

    return {
      currentIndex: boundedIndex,
      totalQuestions: questions.length,
      currentQuestion,
      startParsed,
      endParsed,
      durationParts,
      usesDoubleDigitHours,
      startHourDigits,
      endHourDigits,
      startMinuteDigits: formatTwoDigits(startParsed.minute),
      endMinuteDigits: formatTwoDigits(endParsed.minute),
    };
  };

  const getPage4InstructionText = () => {
    const { startParsed, endParsed } = getCurrentQuestionData();
    return `Let's subtract ${startParsed.hour12} hours ${startParsed.minute} minutes from ${endParsed.hour12} hours ${endParsed.minute} minutes to calculate the duration.`;
  };

  const getPage4CorrectFeedbackText = () => {
    const { currentQuestion, startParsed, endParsed, durationParts } = getCurrentQuestionData();
    const hourLabel = durationParts.hours === 1 ? "hour" : "hours";
    const minutePart = durationParts.minutes ? ` ${durationParts.minutes} minutes` : "";
    const fallbackDuration = `${durationParts.hours} ${hourLabel}${minutePart}`.trim();

    return `That's correct! The duration from ${formatTimeForQuestionText(startParsed)} to ${formatTimeForQuestionText(endParsed)} is ${currentQuestion.duration || fallbackDuration}.`;
  };

  const getCurrentLanguageCode = () =>
    typeof i18n !== "undefined" && typeof i18n.getCurrentLanguage === "function"
      ? i18n.getCurrentLanguage()
      : "en";

  const getPage5LoopMaxStep = () => {
    const { durationParts } = getCurrentQuestionData();
    return Math.max(durationParts.hours, 0) + (durationParts.minutes > 0 ? 1 : 0);
  };

  const getPage5LoopStep = () => {
    const rawStep =
      typeof window !== "undefined" && Number.isFinite(window.page5LoopStep)
        ? window.page5LoopStep
        : 0;
    const maxStep = getPage5LoopMaxStep();
    return Math.min(Math.max(rawStep, 0), maxStep);
  };

  const isPage5FinalStep = () => {
    const maxStep = getPage5LoopMaxStep();
    return maxStep > 0 && getPage5LoopStep() >= maxStep;
  };

  const setPage5LoopStep = (nextStep) => {
    if (typeof window === "undefined") return;
    const maxStep = getPage5LoopMaxStep();
    window.page5LoopStep = Math.min(Math.max(nextStep, 0), maxStep);
    if (typeof window.forceAppUpdate === "function") {
      window.forceAppUpdate();
    }
  };

  const getPage5ElapsedMinutes = () => {
    const { durationParts } = getCurrentQuestionData();
    const currentStep = getPage5LoopStep();

    if (currentStep <= 0) {
      return 0;
    }

    if (currentStep <= durationParts.hours) {
      return currentStep * 60;
    }

    return durationParts.totalMinutes;
  };

  const getPage5ElapsedText = (elapsedMinutes) => {
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;

    if (getCurrentLanguageCode() === "id") {
      if (hours > 0 && minutes > 0) {
        return `${hours} jam ${minutes} menit`;
      }
      if (hours > 0) {
        return `${hours} jam`;
      }
      return `${minutes} menit`;
    }

    if (hours > 0 && minutes > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} minutes`;
    }
    if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }
    return `${minutes} minutes`;
  };

  const getPage5InstructionText = () => {
    if (!isPage5FinalStep()) {
      return getI18nText("pages.page5.instructionText");
    }

    const { currentIndex, totalQuestions } = getCurrentQuestionData();
    const hasNextQuestion = currentIndex < totalQuestions - 1;

    if (getCurrentLanguageCode() === "id") {
      return hasNextQuestion ? "Ketuk » untuk pertanyaan berikutnya." : "Ketuk » untuk rangkuman.";
    }

    return hasNextQuestion ? "Tap » to next question." : "Tap » to summarize.";
  };

  const getPage5RightBoxText = () => {
    const { startParsed } = getCurrentQuestionData();
    const elapsedMinutes = getPage5ElapsedMinutes();

    if (elapsedMinutes === 0) {
      return getCurrentLanguageCode() === "id"
        ? `Waktu mulai = ${formatTimeShort(startParsed)}`
        : `Start time = ${formatTimeShort(startParsed)}`;
    }

    return getPage5ElapsedText(elapsedMinutes);
  };

  const getPage5SummaryText = () => {
    if (!isPage5FinalStep()) {
      return "";
    }

    const { currentQuestion, startParsed, endParsed, durationParts } = getCurrentQuestionData();
    const hourLabel = durationParts.hours === 1 ? "hour" : "hours";
    const minutePart = durationParts.minutes ? ` ${durationParts.minutes} minutes` : "";
    const fallbackDuration = `${durationParts.hours} ${hourLabel}${minutePart}`.trim();
    const durationText = currentQuestion.duration || fallbackDuration;

    if (getCurrentLanguageCode() === "id") {
      return `Waktu selesai = ${formatTimeShort(endParsed)} Durasi dari ${formatTimeShort(startParsed)} hingga ${formatTimeShort(endParsed)} adalah ${durationText}.`;
    }

    return `End time = ${formatTimeShort(endParsed)} Duration from ${formatTimeShort(startParsed)} to ${formatTimeShort(endParsed)} is ${durationText}.`;
  };

  const getPage5ClockTime = () => {
    const { startParsed, endParsed } = getCurrentQuestionData();
    const elapsedMinutes = getPage5ElapsedMinutes();

    if (isPage5FinalStep()) {
      return getClockTimeValue(endParsed);
    }

    return getQuestionStepClockTime(startParsed, elapsedMinutes / 60);
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
          text: getI18nText("pages.page1.title"),
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
          text: getI18nText("pages.page1.mainText"),
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
          imageAlt: getI18nText("common.tapAlt"),
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
                  getI18nText("messages.nextButtonPage2"),
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
      {
        id: "page2-talk-text-box-black-background",
        name: "page2-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "SectionHeaderComponent",
          id: "page2-talk-text-box-black-background",
          text: getI18nText("pages.page2.talkBoxText"),
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
          ],
          hideImageOnQuizComplete: false,
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
      // page2  header txt 
      {
        id: "page2-header-text",
        name: "page2-header-text",
        type: "custom",
        coordinates: [405, 5, 1595, 95], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getCurrentQuestionData().currentQuestion.questionText;
          },
          backgroundColor: "none",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page2  header txt 
      {
        id: "page2-question-text",
        name: "page2-question-text",
        type: "custom",
        coordinates: [405, 120, 1200, 200], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText('pages.page2.questionText'),
          backgroundColor: "none",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          textAlign: 'left',
          allowHtml: true,
        },
      },
      // Panel: dashed border; separate mini-quiz (1:00 pm correct); pills hide after correct
      {
        id: "page2-choose-option-panel",
        name: "page2-choose-option-panel",
        type: "custom",
        coordinates: [430, 285, 1125, 363],
        zIndex: "var(--z-notification)",
        props: {
          componentType: "ChooseOptionPanelWithQuizPillsComponent",
          id: "page2-choose-option-panel",
          labelText: getI18nText("pages.page2.chooseCorrectOptionLabel"),
          groupId: "page2-choose-panel-mcq",
          pageNumber: 2,
          pillDispatchQuizCompleted: false,
          revealOnCorrectEvent: "page2ChoosePanelOnePmCorrect",
          get pills() {
            const { startParsed, endParsed } = getCurrentQuestionData();
            return [
              {
                text: formatTimeForDisplay(startParsed),
                optionKey: "panel-start-time",
                iscorrect: true,
              },
              {
                text: formatTimeForDisplay(endParsed),
                optionKey: "panel-end-time",
                iscorrect: false,
              },
            ];
          },
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          border: "3gc dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "27gc",
          padding: "8gc",
          pillBorderRadius: "11gc",
          pillFontSize: "22gc",
          optionButtonTextColor: "#000000",
          defaultBackgroundColor: "#FFAB40",
          initialVisible: false,
          showOnEvent: "imageChange",
          // Same detail as QuizStandaloneOptionButtonComponent (interaction-components runStandaloneQuizOptionClick)
          showOnEventFilter: { pageNumber: 2, optionKey: "duration" },
        },
      },
      // page2 horizontal-line
      {
        id: "page2-horizontal-line",
        name: "page2-horizontal-line",
        type: "container",
        coordinates: [407, 380, 1593, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/horizontalLine.png'
        },
      },
      //vertical white line left
      {
        id: "page2-vertical-line-1",
        name: "page2-vertical-line-1",
        type: "container",
        coordinates: [657, 345, 707, 445], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/verticalWhiteLine.png'
        },
      },
      //vertical white line right
      {
        id: "page2-vertical-line-2",
        name: "page2-vertical-line-2",
        type: "container",
        coordinates: [1293, 345, 1343, 445], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/verticalWhiteLine.png'
        },
      },
      //left white arrow
      {
        id: "page2-left-White-Head-Arrow",
        name: "page2-left-White-Head-Arrow",
        type: "container",
        coordinates: [680, 425, 885, 475], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/leftWhiteHeadArrow.png'
        },
      },
      //right white arrow
      {
        id: "page2-right-White-Head-Arrow",
        name: "page2-right-White-Head-Arrow",
        type: "container",
        coordinates: [1095, 425, 1320, 475], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/rightWhiteHeadArrow.png'
        },
      },
      // duration — correct answer (QuizPanel-style option button)
      {
        id: "page2-duration-button",
        name: "page2-duration-button",
        type: "custom",
        coordinates: [890, 420, 1090, 480],
        zIndex: "var(--z-button)",
        props: {
          componentType: "QuizStandaloneOptionButtonComponent",
          groupId: "page2-mcq",
          optionKey: "duration",
          pageNumber: 2,
          iscorrect: true,
          text: getI18nText("buttons.duration"),
          defaultBackgroundColor: "#FFAB40",
          optionButtonTextColor: "#000000",
          borderRadius: "13gc",
          fontSize: "32gc",
          dispatchQuizCompleted: false,
        },
      },
      // "??" below duration — hidden until correct (duration) option is chosen
      {
        id: "page2-duration-below-text",
        name: "page2-duration-below-text",
        type: "custom",
        coordinates: [890, 488, 1090, 548],
        zIndex: 55,
        props: {
          componentType: "RevealOnEventTextComponent",
          initialVisible: false,
          showOnEvent: "imageChange",
          showOnEventFilter: {
            pageNumber: 2,
            optionKey: "duration",
            isCorrect: true,
          },
          text: getI18nText("common.placeholderQuestionMarks"),
          color: "red",
          fontSize: "36gc",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "transparent",
        },
      },
      // start time — incorrect option
      {
        id: "page2-start-time-button",
        name: "page2-start-time-button",
        type: "custom",
        coordinates: [570, 280, 790, 340],
        zIndex: "var(--z-button)",
        props: {
          componentType: "QuizStandaloneOptionButtonComponent",
          groupId: "page2-mcq",
          optionKey: "start-time",
          pageNumber: 2,
          iscorrect: false,
          text: getI18nText("buttons.startTime"),
          defaultBackgroundColor: "#FFAB40",
          optionButtonTextColor: "#000000",
          borderRadius: "13gc",
          fontSize: "28gc",
          shiftUpOnQuizCompletedGc: 75,
          shiftUpOnCustomEvent: "imageChange",
          shiftUpOnCustomEventFilter: {
            pageNumber: 2,
            optionKey: "duration",
            isCorrect: true,
          },
        },
      },
      // Time label overlay — shown after correct 1:00 pm on choose-option panel (panel hides)
      {
        id: "page2-start-time-display-text",
        name: "page2-start-time-display-text",
        type: "custom",
        coordinates: [580, 280, 780, 340],
        zIndex: 81,
        props: {
          componentType: "RevealOnEventTextComponent",
          get text() {
            return formatTimeForDisplay(getCurrentQuestionData().startParsed);
          },
          color: "#ffffff",
          fontSize: "32gc",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "transparent",
          initialVisible: false,
          showOnEvent: "page2ChoosePanelOnePmCorrect",
          showOnEventFilter: { pageNumber: 2 },
        },
      },
      // Panel: dashed border; separate mini-quiz (4:00 pm correct); panel hides + end-time text reveals after correct
      {
        id: "page2-end-time-choose-option-panel",
        name: "page2-end-time-choose-option-panel",
        type: "custom",
        coordinates: [875, 285, 1570, 363],
        zIndex: "var(--z-notification)",
        props: {
          componentType: "ChooseOptionPanelWithQuizPillsComponent",
          id: "page2-end-time-choose-option-panel",
          labelText: getI18nText("pages.page2.chooseCorrectOptionLabel"),
          groupId: "page2-choose-end-panel-mcq",
          pageNumber: 2,
          pillDispatchQuizCompleted: false,
          dispatchQuizCompletedAfterCorrectHide: true,
          revealOnCorrectEvent: "page2ChoosePanelFourPmCorrect",
          get pills() {
            const { startParsed, endParsed } = getCurrentQuestionData();
            return [
              {
                text: formatTimeForDisplay(startParsed),
                optionKey: "end-panel-start-time",
                iscorrect: false,
              },
              {
                text: formatTimeForDisplay(endParsed),
                optionKey: "end-panel-end-time",
                iscorrect: true,
              },
            ];
          },
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          border: "3gc dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffffff",
          fontSize: "27gc",
          padding: "8gc",
          pillBorderRadius: "11gc",
          pillFontSize: "22gc",
          optionButtonTextColor: "#000000",
          defaultBackgroundColor: "#FFAB40",
          initialVisible: false,
          showOnEvent: "page2ChoosePanelOnePmCorrect",
          showOnEventFilter: { pageNumber: 2 },
        },
      },
      // end time — incorrect option
      {
        id: "page2-end-time-button",
        name: "page2-end-time-button",
        type: "custom",
        coordinates: [1210, 280, 1430, 340],
        zIndex: "var(--z-button)",
        props: {
          componentType: "QuizStandaloneOptionButtonComponent",
          groupId: "page2-mcq",
          optionKey: "end-time",
          pageNumber: 2,
          iscorrect: false,
          text: getI18nText("buttons.endTime"),
          defaultBackgroundColor: "#FFAB40",
          optionButtonTextColor: "#000000",
          borderRadius: "13gc",
          fontSize: "28gc",
          shiftUpOnQuizCompletedGc: 75,
          shiftUpOnCustomEvent: "page2ChoosePanelOnePmCorrect",
          shiftUpOnCustomEventFilter: { pageNumber: 2 },
        },
      },
      // End time label overlay — shown after correct 4:00 pm on end-time choose-option panel
      {
        id: "page2-end-time-display-text",
        name: "page2-end-time-display-text",
        type: "custom",
        coordinates: [1220, 280, 1420, 340],
        zIndex: 81,
        props: {
          componentType: "RevealOnEventTextComponent",
          get text() {
            return formatTimeForDisplay(getCurrentQuestionData().endParsed);
          },
          color: "#ffffff",
          fontSize: "32gc",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "transparent",
          initialVisible: false,
          showOnEvent: "page2ChoosePanelFourPmCorrect",
          showOnEventFilter: { pageNumber: 2 },
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
          text: getI18nText("pages.page2.instructionText"),
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
          enableOnEventFilter: { pageNumber: 2, quizId: 'page2-standalone-mcq' },
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
                  getI18nText("messages.nextButtonpage2"),
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
          ],
          hideImageOnQuizComplete: false,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },
      // page3  black background
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
      // page3  header txt 
      {
        id: "page3-header-text",
        name: "page3-header-text",
        type: "custom",
        coordinates: [405, 5, 1595, 95], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            const { startParsed, endParsed } = getCurrentQuestionData();
            return `How many hours are there from ${formatTimeForQuestionText(startParsed)} to ${formatTimeForQuestionText(endParsed)}?`;
          },
          backgroundColor: "none",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      // page3 horizontal-line
      {
        id: "page3-horizontal-line",
        name: "page3-horizontal-line",
        type: "container",
        coordinates: [407, 380, 1593, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/horizontalLine.png'
        },
      },
      //vertical white line left
      {
        id: "page3-vertical-line-1",
        name: "page3-vertical-line-1",
        type: "container",
        coordinates: [657, 345, 707, 445], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/verticalWhiteLine.png'
        },
      },
      //vertical white line right
      {
        id: "page3-vertical-line-2",
        name: "page3-vertical-line-2",
        type: "container",
        coordinates: [1293, 345, 1343, 445], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/verticalWhiteLine.png'
        },
      },
      //left white arrow
      {
        id: "page3-left-White-Head-Arrow",
        name: "page3-left-White-Head-Arrow",
        type: "container",
        coordinates: [695, 420, 885, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/leftWhiteHeadArrow.png'
        },
      },
      //right white arrow
      {
        id: "page3-right-White-Head-Arrow",
        name: "page3-right-White-Head-Arrow",
        type: "container",
        coordinates: [1095, 420, 1305, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/rightWhiteHeadArrow.png'
        },
      },
      //duration button
      {
        id: "page3-duration-button",
        name: "page3-duration-button",
        type: "button",
        coordinates: [890, 420, 1090, 480],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.duration"),
          get disabled() { return true },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
          },
          backgroundColor: '#FFFFFF',
          color: 'black',
          cursor: 'pointer',
          borderRadius: '13gc',
          border: 'none',
          fontSize: '32gc',
        },
      },
      // ?? text 
      {
        id: "page3-question-mark-text",
        name: "page3-question-mark-text",
        type: "custom",
        coordinates: [890, 490, 1090, 530], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.placeholderQuestionMarks"),
          backgroundColor: "none",
          border: "none",
          borderRadius: "0gc",
          textColor: "red",
          fontSize: "40gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      //start time button
      {
        id: "page3-start-time-button",
        name: "page3-start-time-button",
        type: "button",
        coordinates: [570, 220, 790, 280],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.startTime"),
          get disabled() { return true },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
          },
          backgroundColor: '#FFFFFF',
          color: 'black',
          cursor: 'pointer',
          borderRadius: '13gc',
          border: 'none',
          fontSize: '28gc'
        },
      },
      // start time 
      {
        id: "page3-start-time",
        name: "page3-start-time",
        type: "custom",
        coordinates: [580, 290, 780, 340], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return formatTimeShort(getCurrentQuestionData().startParsed);
          },
          backgroundColor: "none",
          border: "none",
          borderRadius: "0gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      //end time button
      {
        id: "page3-end-time-button",
        name: "page3-end-time-button",
        type: "button",
        coordinates: [1210, 220, 1430, 280],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.endTime"),
          get disabled() { return true },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
          },
          backgroundColor: '#FFFFFF',
          color: 'black',
          cursor: 'pointer',
          borderRadius: '13gc',
          border: 'none',
          fontSize: '28gc'
        },
      },
      // end time 
      {
        id: "page3-end-time",
        name: "page3-end-time",
        type: "custom",
        coordinates: [1220, 290, 1420, 340], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return formatTimeShort(getCurrentQuestionData().endParsed);
          },
          backgroundColor: "none",
          border: "none",
          borderRadius: "0gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [405, 520, 1595, 800], // Positioned in the main content area
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
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 0, // Feedback row: 15%
          optionButtonWidth: 85,
          optionButtonHeight: 90,
          border: "none",
          feedBackShow: false,
          questionTextFontSize: '38gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
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
          text: getI18nText("pages.page3.instructionText"),
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
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for page 8
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
            return getPage4InstructionText();
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
      // page3  header txt 
      {
        id: "page4-header-text",
        name: "page4-header-text",
        type: "custom",
        coordinates: [405, 5, 1195, 120], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getCurrentQuestionData().currentQuestion.questionText;
          },
          backgroundColor: "none",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  hour txt 
      {
        id: "page4-hour-text",
        name: "page4-hour-text",
        type: "custom",
        get coordinates() {
          return getCurrentQuestionData().usesDoubleDigitHours
            ? [630, 180, 730, 230]
            : [720, 180, 750, 230];
        },
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText('common.hours'),
          backgroundColor: "none",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      {
        id: "page4-hour-text-box-1.0",
        name: "page4-hour-text-box-1.0",
        type: "custom",
        coordinates: [570, 250, 670, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            const { usesDoubleDigitHours, endHourDigits } = getCurrentQuestionData();
            return usesDoubleDigitHours ? endHourDigits[0] : "";
          },
          backgroundColor: "transparent",
          border: "2px dashed #FFFFFF",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
          get initialVisible() {
            return getCurrentQuestionData().usesDoubleDigitHours;
          },
        },
      },
      // page3  hour txt -box
      {
        id: "page4-hour-text-box-1",
        name: "page4-hour-text-box-1",
        type: "custom",
        coordinates: [680, 250, 780, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            const { endHourDigits } = getCurrentQuestionData();
            return endHourDigits[endHourDigits.length - 1] || "";
          },
          backgroundColor: "transparent",
          border: "2px dashed #FFFFFF",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      //page4 hour text box 2.0
      {
        id: "page4-hour-text-box-2.0",
        name: "page4-hour-text-box-2.0",
        type: "custom",
        coordinates: [570, 370, 670, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            const { usesDoubleDigitHours, startHourDigits } = getCurrentQuestionData();
            return usesDoubleDigitHours ? startHourDigits[0] : "";
          },
          backgroundColor: "transparent",
          border: "2px dashed #FFFFFF",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
          get initialVisible() {
            return getCurrentQuestionData().usesDoubleDigitHours;
          },
        },
      },
      // page4  hour txt box
      {
        id: "page4-hour-text-box-2",
        name: "page4-hour-text-box-2",
        type: "custom",
        coordinates: [680, 370, 780, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            const { startHourDigits } = getCurrentQuestionData();
            return startHourDigits[startHourDigits.length - 1] || "";
          },
          backgroundColor: "transparent",
          border: "2px dashed #FFFFFF",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  minus sign
      {
        id: "page4-minus-sign",
        name: "page4-minus-sign",
        type: "custom",
        get coordinates() {
          return getCurrentQuestionData().usesDoubleDigitHours
            ? [500, 370, 570, 470]
            : [600, 370, 670, 470];
        },
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.minusSign"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "90gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt 
      {
        id: "page4-minutes-text",
        name: "page4-minutes-text",
        type: "custom",
        coordinates: [880, 180, 980, 230], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText('common.minutes'),
          backgroundColor: "none",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt box
      {
        id: "page4-minutes-text-box-1",
        name: "page4-minutes-text-box-1",
        type: "custom",
        coordinates: [820, 250, 1040, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "2px dashed #FFFFFF",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt box 
      {
        id: "page4-minutes-text-box-1-first-text",
        name: "page4-minutes-text-box-1-first-text",
        type: "custom",
        coordinates: [840, 250, 920, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getCurrentQuestionData().endMinuteDigits[0];
          },
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt box 
      {
        id: "page4-minutes-text-box-1-second-text",
        name: "page4-minutes-text-box-1-second-text",
        type: "custom",
        coordinates: [920, 250, 1020, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getCurrentQuestionData().endMinuteDigits[1];
          },
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt box
      {
        id: "page4-minutes-text-box-2",
        name: "page4-minutes-text-box-2",
        type: "custom",
        coordinates: [820, 370, 1040, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: "",
          backgroundColor: "transparent",
          border: "2px dashed #FFFFFF",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt box 
      {
        id: "page4-minutes-text-box-2-first-text",
        name: "page4-minutes-text-box-2-first-text",
        type: "custom",
        coordinates: [840, 370, 920, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getCurrentQuestionData().startMinuteDigits[0];
          },
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      // page3  minutes txt box 
      {
        id: "page4-minutes-text-box-2-second-text",
        name: "page4-minutes-text-box-2-second-text",
        type: "custom",
        coordinates: [920, 370, 1020, 470], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getCurrentQuestionData().startMinuteDigits[1];
          },
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "0gc",
          allowHtml: true,
        },
      },
      // page4 horizontal-line
      {
        id: "page4-horizontal-line",
        name: "page4-horizontal-line",
        type: "container",
        get coordinates() {
          return getCurrentQuestionData().usesDoubleDigitHours
            ? [560, 490, 1060, 510]
            : [660, 490, 1060, 510];
        },
        zIndex: 55,
        props: {
          imageSrc: 'assets/horizontalLine.png'
        },
      },
      {
        id: 'page4-tile-0',
        name: 'page4-tile-0',
        type: 'tile',
        coordinates: [565, 520, 670, 620],
        zIndex: 1000,
        props: {
          componentType: 'TileComponent',
          mode: 'normal', // Start in out-of-focus mode
          text: '',
          get display() {
            return getCurrentQuestionData().usesDoubleDigitHours ? 'flex' : 'none';
          },
          backgroundColor: '',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '60gc',
          fontWeight: 'bold',
          padding: '5gc',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile 1
      {
        id: 'page4-tile-1',
        name: 'page4-tile-1',
        type: 'tile',
        coordinates: [680, 520, 785, 620],
        zIndex: 1000,
        props: {
          componentType: 'TileComponent',
          mode: 'normal', // Start in out-of-focus mode
          text: '',
          backgroundColor: '',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '60gc',
          fontWeight: 'bold',
          padding: '5gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile 2
      {
        id: 'page4-tile-2',
        name: 'page4-tile-2',
        type: 'tile',
        coordinates: [830, 520, 935, 620],
        zIndex: 1000,
        props: {
          componentType: 'TileComponent',
          mode: 'normal', // Start in out-of-focus mode

          backgroundColor: '',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '60gc',
          fontWeight: 'bold',
          padding: '5gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //tile -3 (selection highlight comes from number pad focus, not static gold)
      {
        id: 'page4-tile-3',
        name: 'page4-tile-3',
        type: 'tile',
        coordinates: [945, 520, 1055, 620],
        zIndex: 1000,
        props: {
          componentType: 'TileComponent',
          mode: 'normal',
          backgroundColor: '',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '60gc',
          fontWeight: 'bold',
          padding: '5gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //number pad
      {
        id: 'page4-number-pad',
        name: 'page4-number-pad',
        type: 'number-pad-panel',
        coordinates: [1200, 5, 1595, 800],
        zIndex: 'var(--z-elevated)',
        props: {
          backgroundColor: '#8B4513',
          borderRadius: '15gc',
          border: '4px solid #D2691E',
          padding: '20gc',
          layout: 'vertical',            // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2,               // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true,        // Enable click sound for number pad buttons (default: true)
          inputMode: 'append',           // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 9,               // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          maxInputLength: 1,          // Each tile accepts a single digit
          autoAdvanceOnMaxInput: true, // Move focus to the next tile after one digit is entered
          feedbackMode: 'feedback',       // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null,     // ID of external feedback component to update when check is pressed (e.g., 'page4-feedback-textbox')
          checkRequiresAllTileDestinationsFilled: true, // CHECK enabled only when all tiles have values; tap a tile to edit; one CHECK grades all
          setFocusOnLoad: true, // Yellow focus on first destination tile until user picks another
          get destinations() {
            const { durationParts, usesDoubleDigitHours } = getCurrentQuestionData();
            const page4CorrectFeedback =
              typeof window !== 'undefined' && typeof window.getPage4TalkBoxTextCorrect === 'function'
                ? window.getPage4TalkBoxTextCorrect()
                : getPage4CorrectFeedbackText();
            const destinations = [
              {
                destinationId: "page4-tile-3",
                destinationType: "tile",
                correctValue: String(durationParts.minuteOnes),
                correctFeedback: page4CorrectFeedback,
                incorrectFeedback: getI18nText("pages.page4.numpad.tile3.inCorrect"),
                emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
                correctMode: "correct",
                incorrectMode: "incorrect",
              },
              {
                destinationId: "page4-tile-2",
                destinationType: "tile",
                correctValue: String(durationParts.minuteTens),
                correctFeedback: page4CorrectFeedback,
                incorrectFeedback: getI18nText("pages.page4.numpad.tile2.inCorrect"),
                emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
                correctMode: "correct",
                incorrectMode: "incorrect",
              },
              {
                destinationId: "page4-tile-1",
                destinationType: "tile",
                correctValue: String(durationParts.hourOnes),
                correctFeedback: page4CorrectFeedback,
                incorrectFeedback: getI18nText("pages.page4.numpad.tile1.inCorrect"),
                emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
                correctMode: "correct",
                incorrectMode: "incorrect",
              },
            ];

            if (usesDoubleDigitHours) {
              destinations.push({
                destinationId: "page4-tile-0",
                destinationType: "tile",
                correctValue: String(durationParts.hourTens),
                correctFeedback: page4CorrectFeedback,
                incorrectFeedback: getI18nText("pages.page4.numpad.tile1.inCorrect"),
                emptyFeedback: getI18nText("pages.page4.feedback.emptyFeedback"),
                correctMode: "correct",
                incorrectMode: "incorrect",
              });
            }

            return destinations;
          },              // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0,           // Current index in destinations array (starts at 0)
          feedbackRowHeight: '35%',      // Height percentage for feedback text area
          buttonGridHeight: '51%',       // Height percentage for number pad grid
          checkButtonHeight: '10%',      // Height percentage for check button

          showButton: {
            backgroundColor: '#FFD700',
            color: '#000000',
            fontSize: '35gc',
            fontWeight: 'bold',
            text: getI18nText("pages.page4.numberPad.showHint"),
          },

          numberButtons: {
            backgroundColor: '#FFD700',
            color: '#000000',
            fontSize: '45gc',
            fontWeight: 'bold',
            buttonWidthPercent: '90%',  // Width percentage of grid cell
            buttonHeightPercent: '90%'  // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: '#FF8C00',
            color: '#000000',
            fontSize: '35gc',
            fontWeight: 'bold',
            text: getI18nText("pages.page4.numberPad.check"),
          }
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
          text: getI18nText("pages.page4.instructionText"),
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
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for page 8
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

      {
        id: "page5-end-summary-text",
        name: "page5-end-summary-text",
        type: "custom",
        coordinates: [30, 130, 400, 350],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getPage5SummaryText();
          },
          get backgroundColor() {
            return isPage5FinalStep() ? "#073763" : "transparent";
          },
          get border() {
            return isPage5FinalStep() ? "3px dashed #ffffff" : "none";
          },
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },

      // page3  header txt 
      {
        id: "page5-header-text",
        name: "page5-header-text",
        type: "custom",
        coordinates: [1140, 130, 1480, 250], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return getPage5RightBoxText();
          },
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Clock component - same styling as page 3 analog clock
      {
        id: "page5-clock",
        name: "page5-analog-clock",
        type: "custom",
        coordinates: [500, 120, 1100, 680],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return getPage5ClockTime();
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
          // Clock face - metallic texture (faceTexture + dark border)
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
            "#FF5722", // 11 - Deep orange
          ],
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          // Ghost hour hands at 1:00 and 4:00 (main time 1:00); aqua wedges to main hour
          showGhostHands: true,
          ghostHourOnly: true,
          get targetTime() {
            return getClockTimeValue(getCurrentQuestionData().startParsed);
          },
          get secondTargetTime() {
            return getClockTimeValue(getCurrentQuestionData().endParsed);
          },
          ghostColor: "rgba(231, 76, 60, 0.25)",
          showGhostHourArc: true,
          ghostHourArcFill: "rgba(0, 255, 255, 0.4)",
          showCircularArrow: true,
          circularArrowColor: "#ffffff",
          circularArrowWidth: "4gc",
          circularArrowOffset: "12gc",
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
            return getPage5InstructionText();
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
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for page 8
          get text() {
            const pageNumber = extractPageNumberFromId("page5-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const currentStep = getPage5LoopStep();
            const maxStep = getPage5LoopMaxStep();

            if (currentStep < maxStep) {
              setPage5LoopStep(currentStep + 1);
              return;
            }

            const { currentIndex, totalQuestions } = getCurrentQuestionData();
            const hasNextQuestion = currentIndex < totalQuestions - 1;
            if (hasNextQuestion) {
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              }
              return;
            }

            if (typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(6);
              } else if (window.navigateToPage) {
                window.navigateToPage(6);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: 6 },
                  }),
                );
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
            return getPage5LoopStep() === 0 ? isPrevButtonDisabled(pageNumber) : false;
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }

            const currentStep = getPage5LoopStep();
            if (currentStep > 0) {
              setPage5LoopStep(currentStep - 1);
              return;
            }

            const pageNumber = extractPageNumberFromId("page5-previous-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== "undefined") {
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

      // page3  header txt 
      {
        id: "page6-header-text",
        name: "page6-header-text",
        type: "custom",
        coordinates: [1140, 130, 1480, 250], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return `Start time = ${formatTimeShort(getCurrentQuestionData().startParsed)}`;
          },
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Clock component - same styling as page 5 / page 3 analog clock
      {
        id: "page6-clock",
        name: "page6-analog-clock",
        type: "custom",
        coordinates: [500, 120, 1100, 680],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return getQuestionStepClockTime(getCurrentQuestionData().startParsed, 1);
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
            "#FF5722",
          ],
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          // Ghost hours at 1:00 and 4:00 — main time 2:00; 25% opacity; aqua arcs to main hour
          showGhostHands: true,
          ghostHourOnly: true,
          get targetTime() {
            return getClockTimeValue(getCurrentQuestionData().startParsed);
          },
          get secondTargetTime() {
            return getClockTimeValue(getCurrentQuestionData().endParsed);
          },
          ghostColor: "rgba(231, 76, 60, 0.25)",
          showGhostHourArc: true,
          ghostHourArcFill: "rgba(0, 255, 255, 0.4)",
          showCircularArrow: true,
          circularArrowColor: "#ffffff",
          circularArrowWidth: "4gc",
          circularArrowOffset: "12gc",
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
          text: getI18nText("pages.page6.instructionText"),
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
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for page 8
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
                  getI18nText("messages.nextButtonpage6"),
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

      // page3  header txt 
      {
        id: "page7-header-text",
        name: "page7-header-text",
        type: "custom",
        coordinates: [1140, 130, 1480, 250], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return `Start time = ${formatTimeShort(getCurrentQuestionData().startParsed)}`;
          },
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Clock component - same styling as page 5 / page 3 analog clock
      {
        id: "page7-clock",
        name: "page7-analog-clock",
        type: "custom",
        coordinates: [500, 120, 1100, 680],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return getQuestionStepClockTime(getCurrentQuestionData().startParsed, 2);
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
            "#FF5722",
          ],
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          // Ghost hours at 1:00 and 4:00 — main time 3:00; aqua arcs to main hour
          showGhostHands: true,
          ghostHourOnly: true,
          get targetTime() {
            return getClockTimeValue(getCurrentQuestionData().startParsed);
          },
          get secondTargetTime() {
            return getClockTimeValue(getCurrentQuestionData().endParsed);
          },
          ghostColor: "rgba(231, 76, 60, 0.25)",
          showGhostHourArc: true,
          ghostHourArcFill: "rgba(0, 255, 255, 0.4)",
          showCircularArrow: true,
          circularArrowColor: "#ffffff",
          circularArrowWidth: "4gc",
          circularArrowOffset: "12gc",
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
          text: getI18nText("pages.page7.instructionText"),
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
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for page 8
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
      // page3  header txt 
      {
        id: "page8-end-text",
        name: "page8-end-text",
        type: "custom",
        coordinates: [30, 130, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return `End time = ${formatTimeShort(getCurrentQuestionData().endParsed)}`;
          },
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // page3  header txt 
      {
        id: "page8-header-text",
        name: "page8-header-text",
        type: "custom",
        coordinates: [1140, 130, 1480, 250], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          get text() {
            return `Start time = ${formatTimeShort(getCurrentQuestionData().startParsed)}`;
          },
          backgroundColor: "#073763",
          border: "3px dashed #ffffff",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Clock component - same styling as page 5 / page 3 analog clock
      {
        id: "page8-clock",
        name: "page8-analog-clock",
        type: "custom",
        coordinates: [500, 120, 1100, 680],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          get time() {
            return getClockTimeValue(getCurrentQuestionData().endParsed);
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
            "#FF5722",
          ],
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          // Ghost hours at 1:00 and 4:00 — main time 4:00; aqua arcs to main hour
          showGhostHands: true,
          ghostHourOnly: true,
          get targetTime() {
            return getClockTimeValue(getCurrentQuestionData().startParsed);
          },
          get secondTargetTime() {
            return getClockTimeValue(getCurrentQuestionData().endParsed);
          },
          ghostColor: "rgba(231, 76, 60, 0.25)",
          showGhostHourArc: true,
          ghostHourArcFill: "rgba(0, 255, 255, 0.4)",
          showCircularArrow: true,
          circularArrowColor: "#ffffff",
          circularArrowWidth: "4gc",
          circularArrowOffset: "12gc",
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
          text: getI18nText("pages.page8.instructionText"),
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
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for page 8
          get text() {
            const pageNumber = extractPageNumberFromId("page8-next-button");
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            if (typeof window !== "undefined") {
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(9);
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
      // title text
      {
        id: "page9-title-text",
        name: "page9-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.title"),
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
        id: "page9-main-text",
        name: "page9-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.mainText"),
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
        id: "page9-tap-animation",
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
        id: "page9-next-button",
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
            if (typeof window !== "undefined") {
              window.location.reload();
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
              );
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
    delete window.pageSequenceConfig[5];
    delete window.pageSequenceConfig[8];
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
      const previousLoopPage = window.lastDurationLoopPage;
      if (page === 5 && previousLoopPage !== 5) {
        window.page5LoopStep = 0;
      }
      window.lastDurationLoopPage = page;
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

  if (optimizedPages[9]) {
    optimizedPages[6] = optimizedPages[9];
  }
  delete optimizedPages[7];
  delete optimizedPages[8];
  delete optimizedPages[9];

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
      const getRuntimeQuestionBank = () => {
        return getSharedQuestionBank();
      };

      const formatRuntimeTwoDigits = (value) => String(value).padStart(2, "0");

      const parseRuntimeQuestionTime = (timeText) => {
        const rawValue = String(timeText || "").trim();
        const normalized = rawValue.toLowerCase().replace(/\./g, "");
        const match = normalized.match(/^(\d{1,2})(?::(\d{1,2}))?\s*([ap]m)$/);

        if (!match) {
          return {
            hour12: 0,
            minute: 0,
            meridiem: "am",
          };
        }

        return {
          hour12: parseInt(match[1], 10),
          minute: parseInt(match[2] || "0", 10),
          meridiem: match[3],
        };
      };

      const formatRuntimeQuestionTime = (parsedTime) =>
        `${parsedTime.hour12}:${formatRuntimeTwoDigits(parsedTime.minute)} ${parsedTime.meridiem}`;

      const getRuntimeCurrentQuestionData = () => {
        const questions = getRuntimeQuestionBank();
        const currentIndex =
          typeof window !== "undefined" && window.currentQuestionIndex !== undefined
            ? window.currentQuestionIndex
            : 0;
        const boundedIndex = questions.length
          ? Math.min(Math.max(currentIndex, 0), questions.length - 1)
          : 0;
        const currentQuestion = questions[boundedIndex] || {
          startTime: "",
          endTime: "",
          duration: "",
        };

        return {
          currentQuestion,
          startParsed: parseRuntimeQuestionTime(currentQuestion.startTime),
          endParsed: parseRuntimeQuestionTime(currentQuestion.endTime),
        };
      };

      const getRuntimePage4CorrectFeedbackText = () => {
        const { currentQuestion, startParsed, endParsed } = getRuntimeCurrentQuestionData();
        return `That's correct! The duration from ${formatRuntimeQuestionTime(startParsed)} to ${formatRuntimeQuestionTime(endParsed)} is ${currentQuestion.duration || ""}.`;
      };

      const getRuntimePage4InstructionText = () => {
        const { startParsed, endParsed } = getRuntimeCurrentQuestionData();
        return `Let's subtract ${startParsed.hour12} hours ${startParsed.minute} minutes from ${endParsed.hour12} hours ${endParsed.minute} minutes to calculate the duration.`;
      };

      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log(
            "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)",
          );
          console.log(
            "🔄 [Navigation] Treating as APP RELOAD with next question",
          );

          const questions = getRuntimeQuestionBank();
          const currentIndex =
            typeof window !== "undefined" &&
              window.currentQuestionIndex !== undefined
              ? window.currentQuestionIndex
              : 0;
          const hasNextQuestion = currentIndex < questions.length - 1;
          const newIndex = hasNextQuestion ? currentIndex + 1 : currentIndex;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset"),
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          window.page5LoopStep = 0;
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

          if (typeof window !== "undefined" && typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
          }

          const targetPage = hasNextQuestion ? 2 : 6;

          // Navigate to the next question cycle or summary page
          if (typeof window !== "undefined") {
            if (window.changePageAndNotify) {
              window.changePageAndNotify(targetPage);
              console.log(
                `✅ [Navigation] Navigated to page ${targetPage} via changePageAndNotify`,
              );
            } else if (window.navigateToPage) {
              window.navigateToPage(targetPage);
              console.log(
                `✅ [Navigation] Navigated to page ${targetPage} via navigateToPage`,
              );
            } else {
              // Fallback: dispatch page change event
              window.dispatchEvent(
                new CustomEvent("pageChanged", { detail: { page: targetPage } }),
              );
              console.log(
                `✅ [Navigation] Dispatched page change event to page ${targetPage}`,
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
      window.getPage4TalkBoxTextCorrect = getRuntimePage4CorrectFeedbackText;
      window.getPage4TalkBoxText = getRuntimePage4InstructionText;

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
          confirm(getI18nText("messages.pageStatesCleared"))
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
