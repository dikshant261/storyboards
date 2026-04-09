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

  // Pages 2–4 heavy/light image stacks: crossfade (2s) then 100ms pause before stepped sprite
  const IMAGE_STACK_FADE_TRIGGER_DELAY_MS = 50;
  const IMAGE_STACK_CROSSFADE_DURATION_MS = 2000;
  const IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE = 100;
  const IMAGE_STACK_TIME_TO_CROSSFADE_END_MS =
    IMAGE_STACK_FADE_TRIGGER_DELAY_MS + IMAGE_STACK_CROSSFADE_DURATION_MS;

  // Page 2 dynamic images from questionArray[page2CurrentIndex]
  const getPage2Image1Images = () => {
    const qa = typeof window !== "undefined" ? window.questionArray : [];
    const idx = Math.min(
      Math.max(0, (window.page2CurrentIndex ?? 0)),
      (qa && qa.length) ? qa.length - 1 : 0
    );
    const q = qa && qa[idx];
    const staticSrc = (q && q.item1 && q.item1.image) || "assets/G2C6M1A1/Bag.png";
    const spriteImages = (q && q.item1 && q.item1.spriteImages) || [];
    const sprite00 = spriteImages[0] || staticSrc;
    const transitionState = typeof window !== "undefined" ? (window.page2Image1TransitionState || "idle") : "idle";
    const fadeTrigger = typeof window !== "undefined" && window.page2Image1FadeTrigger;

    if (transitionState === "spriteAnimating" || transitionState === "spriteComplete") {
      const frame = Math.min(
        Math.max(0, (window.page2Image1SpriteFrame ?? 0)),
        spriteImages.length ? spriteImages.length - 1 : 0
      );
      const frameSrc = spriteImages[frame] || sprite00;
      return [{ src: frameSrc, blink: false, glow: false, hidden: false, opacity: 1 }];
    }
    if (transitionState === "complete") {
      return [{ src: sprite00, blink: false, glow: false, hidden: false, opacity: 1, transitionDuration: "0s" }];
    }
    // Crossfade: static fades out and sprite fades in over 2s at the same time
    if (transitionState === "fading") {
      return [
        { src: staticSrc, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 0 : 1, transitionDuration: "2s" },
        { src: sprite00, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 1 : 0, transitionDuration: "2s" },
      ];
    }
    return [
      {
        src: staticSrc,
        blink: false,
        glow: false,
        hidden: false,
        opacity: 1,
        onClick: () => {
          if (typeof window !== "undefined") {
            window.page2Tap2Hidden = true;
            window.page2Image1Clicked = true;
            window.page2Image1TransitionState = "fading";
            window.page2Image1FadeTrigger = false;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            setTimeout(() => {
              window.page2Image1FadeTrigger = true;
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            }, IMAGE_STACK_FADE_TRIGGER_DELAY_MS);
            setTimeout(() => {
              window.page2Image1TransitionState = "complete";
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
              // After crossfade ends: IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE, then 8-frame sprite
              setTimeout(() => {
                  const qa2 = window.questionArray || [];
                  const idx2 = Math.min(Math.max(0, (window.page2CurrentIndex ?? 0)), (qa2 && qa2.length) ? qa2.length - 1 : 0);
                  const q2 = qa2 && qa2[idx2];
                  const item = q2 && q2.item1;
                  const sprites = (item && item.spriteImages) || [];
                  if (sprites.length === 0) return;
                  const totalFrames = 8;
                  const durationMs = (item && typeof item.spriteDuration === "number") ? item.spriteDuration : 1500;
                  const frameMs = durationMs / totalFrames;
                  const lastArrayIndex = sprites.length - 1;
                  if (window.page2Image1SpriteIntervalId) clearInterval(window.page2Image1SpriteIntervalId);
                  window.page2Image1TransitionState = "spriteAnimating";
                  window.page2Image1SpriteFrame = 0;
                  if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                  let step = 0;
                  window.page2Image1SpriteIntervalId = setInterval(() => {
                    step += 1;
                    const nextFrame = step < totalFrames ? Math.min(step, lastArrayIndex) : lastArrayIndex;
                    window.page2Image1SpriteFrame = nextFrame;
                    if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                    if (step >= totalFrames) {
                      clearInterval(window.page2Image1SpriteIntervalId);
                      window.page2Image1SpriteIntervalId = null;
                      window.page2Image1TransitionState = "spriteComplete";
                      if (typeof window !== "undefined") {
                        if (!window.page2TextboxVisibility) window.page2TextboxVisibility = {};
                        window.page2TextboxVisibility.textbox1 = true;
                        if (item) window.page2TalkBoxItem = { type: item.type, item_name: item.item_name };
                        if (window.page2Image2Clicked) window.page2SecondAnimationComplete = true;
                      }
                      if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                    }
                  }, frameMs);
                }, IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE);
            }, IMAGE_STACK_TIME_TO_CROSSFADE_END_MS);
          }
        },
      },
    ];
  };
  const getPage2Image2Images = () => {
    const qa = typeof window !== "undefined" ? window.questionArray : [];
    const idx = Math.min(
      Math.max(0, (window.page2CurrentIndex ?? 0)),
      (qa && qa.length) ? qa.length - 1 : 0
    );
    const q = qa && qa[idx];
    const staticSrc = (q && q.item2 && q.item2.image) || "assets/G2C6M1A1/Eraser.png";
    const spriteImages = (q && q.item2 && q.item2.spriteImages) || [];
    const sprite00 = spriteImages[0] || staticSrc;
    const transitionState = typeof window !== "undefined" ? (window.page2Image2TransitionState || "idle") : "idle";
    const fadeTrigger = typeof window !== "undefined" && window.page2Image2FadeTrigger;

    if (transitionState === "spriteAnimating" || transitionState === "spriteComplete") {
      const frame = Math.min(
        Math.max(0, (window.page2Image2SpriteFrame ?? 0)),
        spriteImages.length ? spriteImages.length - 1 : 0
      );
      const frameSrc = spriteImages[frame] || sprite00;
      return [{ src: frameSrc, blink: false, glow: false, hidden: false, opacity: 1 }];
    }
    if (transitionState === "complete") {
      return [{ src: sprite00, blink: false, glow: false, hidden: false, opacity: 1, transitionDuration: "0s" }];
    }
    if (transitionState === "fading") {
      return [
        { src: staticSrc, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 0 : 1, transitionDuration: "2s" },
        { src: sprite00, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 1 : 0, transitionDuration: "2s" },
      ];
    }
    return [
      {
        src: staticSrc,
        blink: false,
        glow: false,
        hidden: false,
        opacity: 1,
        onClick: () => {
          if (typeof window !== "undefined") {
            window.page2Tap3Hidden = true;
            window.page2Image2Clicked = true;
            window.page2Image2TransitionState = "fading";
            window.page2Image2FadeTrigger = false;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            setTimeout(() => {
              window.page2Image2FadeTrigger = true;
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            }, IMAGE_STACK_FADE_TRIGGER_DELAY_MS);
            setTimeout(() => {
              window.page2Image2TransitionState = "complete";
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
              setTimeout(() => {
                  const qa2 = window.questionArray || [];
                  const idx2 = Math.min(Math.max(0, (window.page2CurrentIndex ?? 0)), (qa2 && qa2.length) ? qa2.length - 1 : 0);
                  const q2 = qa2 && qa2[idx2];
                  const item = q2 && q2.item2;
                  const sprites = (item && item.spriteImages) || [];
                  if (sprites.length === 0) return;
                  const totalFrames = 8;
                  const durationMs = (item && typeof item.spriteDuration === "number") ? item.spriteDuration : 1500;
                  const frameMs = durationMs / totalFrames;
                  const lastArrayIndex = sprites.length - 1;
                  if (window.page2Image2SpriteIntervalId) clearInterval(window.page2Image2SpriteIntervalId);
                  window.page2Image2TransitionState = "spriteAnimating";
                  window.page2Image2SpriteFrame = 0;
                  if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                  let step = 0;
                  window.page2Image2SpriteIntervalId = setInterval(() => {
                    step += 1;
                    const nextFrame = step < totalFrames ? Math.min(step, lastArrayIndex) : lastArrayIndex;
                    window.page2Image2SpriteFrame = nextFrame;
                    if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                    if (step >= totalFrames) {
                      clearInterval(window.page2Image2SpriteIntervalId);
                      window.page2Image2SpriteIntervalId = null;
                      window.page2Image2TransitionState = "spriteComplete";
                      if (typeof window !== "undefined") {
                        if (!window.page2TextboxVisibility) window.page2TextboxVisibility = {};
                        window.page2TextboxVisibility.textbox2 = true;
                        if (item) window.page2TalkBoxItem = { type: item.type, item_name: item.item_name };
                        if (window.page2Image1Clicked) window.page2SecondAnimationComplete = true;
                      }
                      if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                    }
                  }, frameMs);
                }, IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE);
            }, IMAGE_STACK_TIME_TO_CROSSFADE_END_MS);
          }
        },
      },
    ];
  };
  const page2Image1Props = {
    componentType: "ImageStackComponent",
    id: "page2-school-bag-image",
    elementName: "page2-school-bag-image",
    currentPage: 13,
    coordinates: [200, 260, 500, 660],
    zIndex: 56,
  };
  Object.defineProperty(page2Image1Props, "images", {
    get: getPage2Image1Images,
    enumerable: true,
    configurable: true,
  });
  const page2Image2Props = {
    componentType: "ImageStackComponent",
    id: "page2-eraser-image",
    elementName: "page2-eraser-image",
    currentPage: 13,
    coordinates: [200, 260, 500, 660],
    zIndex: 56,
  };
  Object.defineProperty(page2Image2Props, "images", {
    get: getPage2Image2Images,
    enumerable: true,
    configurable: true,
  });

  // Page 3 image getters (use questionArray2 and page3* state)
  const getPage3Image1Images = () => {
    const qa = typeof window !== "undefined" ? window.questionArray2 : [];
    const idx = Math.min(Math.max(0, (window.page3CurrentIndex ?? 0)), (qa && qa.length) ? qa.length - 1 : 0);
    const q = qa && qa[idx];
    const staticSrc = (q && q.item1 && q.item1.image) || "assets/G2C6M1A1/Bag.png";
    const spriteImages = (q && q.item1 && q.item1.spriteImages) || [];
    const sprite00 = spriteImages[0] || staticSrc;
    const transitionState = typeof window !== "undefined" ? (window.page3Image1TransitionState || "idle") : "idle";
    const fadeTrigger = typeof window !== "undefined" && window.page3Image1FadeTrigger;
    if (transitionState === "spriteAnimating" || transitionState === "spriteComplete") {
      const frame = Math.min(Math.max(0, (window.page3Image1SpriteFrame ?? 0)), spriteImages.length ? spriteImages.length - 1 : 0);
      return [{ src: spriteImages[frame] || sprite00, blink: false, glow: false, hidden: false, opacity: 1 }];
    }
    if (transitionState === "complete") {
      return [{ src: sprite00, blink: false, glow: false, hidden: false, opacity: 1, transitionDuration: "0s" }];
    }
    if (transitionState === "fading") {
      return [
        { src: staticSrc, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 0 : 1, transitionDuration: "2s" },
        { src: sprite00, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 1 : 0, transitionDuration: "2s" },
      ];
    }
    return [{
      src: staticSrc,
      blink: false,
      glow: false,
      hidden: false,
      opacity: 1,
      onClick: () => {
        if (typeof window !== "undefined") {
          window.page3Tap2Hidden = true;
          window.page3Image1Clicked = true;
          window.page3Image1TransitionState = "fading";
          window.page3Image1FadeTrigger = false;
          if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          setTimeout(() => {
            window.page3Image1FadeTrigger = true;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          }, IMAGE_STACK_FADE_TRIGGER_DELAY_MS);
          setTimeout(() => {
            window.page3Image1TransitionState = "complete";
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            setTimeout(() => {
              const qa2 = window.questionArray2 || [];
              const idx2 = Math.min(Math.max(0, (window.page3CurrentIndex ?? 0)), (qa2 && qa2.length) ? qa2.length - 1 : 0);
              const q2 = qa2 && qa2[idx2];
              const item = q2 && q2.item1;
              const sprites = (item && item.spriteImages) || [];
              if (sprites.length === 0) return;
              const totalFrames = 8;
              const durationMs = (item && typeof item.spriteDuration === "number") ? item.spriteDuration : 1500;
              const frameMs = durationMs / totalFrames;
              const lastArrayIndex = sprites.length - 1;
              if (window.page3Image1SpriteIntervalId) clearInterval(window.page3Image1SpriteIntervalId);
              window.page3Image1TransitionState = "spriteAnimating";
              window.page3Image1SpriteFrame = 0;
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
              let step = 0;
              window.page3Image1SpriteIntervalId = setInterval(() => {
                step += 1;
                const nextFrame = step < totalFrames ? Math.min(step, lastArrayIndex) : lastArrayIndex;
                window.page3Image1SpriteFrame = nextFrame;
                if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                if (step >= totalFrames) {
                  clearInterval(window.page3Image1SpriteIntervalId);
                  window.page3Image1SpriteIntervalId = null;
                  window.page3Image1TransitionState = "spriteComplete";
                  if (typeof window !== "undefined") {
                    if (!window.page3TextboxVisibility) window.page3TextboxVisibility = {};
                    window.page3TextboxVisibility.textbox1 = true;
                    if (item) window.page3TalkBoxItem = { type: item.type, item_name: item.item_name };
                    if (window.page3Image2Clicked) window.page3SecondAnimationComplete = true;
                    if (item && item.type === "light") {
                      window.page3TextboxVisibility.textbox2 = true;
                      window.page3Tap2Hidden = false;
                      window.page3Tap3Hidden = false;
                      window.page3SecondAnimationComplete = true;
                    }
                  }
                  if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                }
              }, frameMs);
            }, IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE);
          }, IMAGE_STACK_TIME_TO_CROSSFADE_END_MS);
        }
      },
    }];
  };
  const getPage3Image2Images = () => {
    const qa = typeof window !== "undefined" ? window.questionArray2 : [];
    const idx = Math.min(Math.max(0, (window.page3CurrentIndex ?? 0)), (qa && qa.length) ? qa.length - 1 : 0);
    const q = qa && qa[idx];
    const staticSrc = (q && q.item2 && q.item2.image) || "assets/G2C6M1A1/Eraser.png";
    const spriteImages = (q && q.item2 && q.item2.spriteImages) || [];
    const sprite00 = spriteImages[0] || staticSrc;
    const transitionState = typeof window !== "undefined" ? (window.page3Image2TransitionState || "idle") : "idle";
    const fadeTrigger = typeof window !== "undefined" && window.page3Image2FadeTrigger;
    if (transitionState === "spriteAnimating" || transitionState === "spriteComplete") {
      const frame = Math.min(Math.max(0, (window.page3Image2SpriteFrame ?? 0)), spriteImages.length ? spriteImages.length - 1 : 0);
      return [{ src: spriteImages[frame] || sprite00, blink: false, glow: false, hidden: false, opacity: 1 }];
    }
    if (transitionState === "complete") {
      return [{ src: sprite00, blink: false, glow: false, hidden: false, opacity: 1, transitionDuration: "0s" }];
    }
    if (transitionState === "fading") {
      return [
        { src: staticSrc, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 0 : 1, transitionDuration: "2s" },
        { src: sprite00, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 1 : 0, transitionDuration: "2s" },
      ];
    }
    return [{
      src: staticSrc,
      blink: false,
      glow: false,
      hidden: false,
      opacity: 1,
      onClick: () => {
        if (typeof window !== "undefined") {
          window.page3Tap3Hidden = true;
          window.page3Image2Clicked = true;
          window.page3Image2TransitionState = "fading";
          window.page3Image2FadeTrigger = false;
          if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          setTimeout(() => {
            window.page3Image2FadeTrigger = true;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          }, IMAGE_STACK_FADE_TRIGGER_DELAY_MS);
          setTimeout(() => {
            window.page3Image2TransitionState = "complete";
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            setTimeout(() => {
              const qa2 = window.questionArray2 || [];
              const idx2 = Math.min(Math.max(0, (window.page3CurrentIndex ?? 0)), (qa2 && qa2.length) ? qa2.length - 1 : 0);
              const q2 = qa2 && qa2[idx2];
              const item = q2 && q2.item2;
              const sprites = (item && item.spriteImages) || [];
              if (sprites.length === 0) return;
              const totalFrames = 8;
              const durationMs = (item && typeof item.spriteDuration === "number") ? item.spriteDuration : 1500;
              const frameMs = durationMs / totalFrames;
              const lastArrayIndex = sprites.length - 1;
              if (window.page3Image2SpriteIntervalId) clearInterval(window.page3Image2SpriteIntervalId);
              window.page3Image2TransitionState = "spriteAnimating";
              window.page3Image2SpriteFrame = 0;
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
              let step = 0;
              window.page3Image2SpriteIntervalId = setInterval(() => {
                step += 1;
                const nextFrame = step < totalFrames ? Math.min(step, lastArrayIndex) : lastArrayIndex;
                window.page3Image2SpriteFrame = nextFrame;
                if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                if (step >= totalFrames) {
                  clearInterval(window.page3Image2SpriteIntervalId);
                  window.page3Image2SpriteIntervalId = null;
                  window.page3Image2TransitionState = "spriteComplete";
                  if (typeof window !== "undefined") {
                    if (!window.page3TextboxVisibility) window.page3TextboxVisibility = {};
                    window.page3TextboxVisibility.textbox2 = true;
                    if (item) window.page3TalkBoxItem = { type: item.type, item_name: item.item_name };
                    if (window.page3Image1Clicked) window.page3SecondAnimationComplete = true;
                    if (item && item.type === "light") {
                      window.page3TextboxVisibility.textbox1 = true;
                      window.page3Tap2Hidden = false;
                      window.page3Tap3Hidden = false;
                      window.page3SecondAnimationComplete = true;
                    }
                  }
                  if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                }
              }, frameMs);
            }, IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE);
          }, IMAGE_STACK_TIME_TO_CROSSFADE_END_MS);
        }
      },
    }];
  };
  const page3Image1Props = {
    componentType: "ImageStackComponent",
    id: "page3-image-1",
    elementName: "page3-image-1",
    currentPage: 13,
    coordinates: [200, 260, 500, 660],
    zIndex: 56,
  };
  Object.defineProperty(page3Image1Props, "images", {
    get: getPage3Image1Images,
    enumerable: true,
    configurable: true,
  });
  const page3Image2Props = {
    componentType: "ImageStackComponent",
    id: "page3-image-2",
    elementName: "page3-image-2",
    currentPage: 13,
    coordinates: [200, 260, 500, 660],
    zIndex: 56,
  };
  Object.defineProperty(page3Image2Props, "images", {
    get: getPage3Image2Images,
    enumerable: true,
    configurable: true,
  });

  // Page 4 image getters and props (replica of page 3 - uses questionArray2 and page4* state)
  const getPage4Image1Images = () => {
    const qa = typeof window !== "undefined" ? window.questionArray2 : [];
    const idx = Math.min(Math.max(0, (window.page4CurrentIndex ?? 0)), (qa && qa.length) ? qa.length - 1 : 0);
    const q = qa && qa[idx];
    const staticSrc = (q && q.item1 && q.item1.image) || "assets/G2C6M1A1/Bag.png";
    const spriteImages = (q && q.item1 && q.item1.spriteImages) || [];
    const sprite00 = spriteImages[0] || staticSrc;
    const transitionState = typeof window !== "undefined" ? (window.page4Image1TransitionState || "idle") : "idle";
    const fadeTrigger = typeof window !== "undefined" && window.page4Image1FadeTrigger;
    if (transitionState === "spriteAnimating" || transitionState === "spriteComplete") {
      const frame = Math.min(Math.max(0, (window.page4Image1SpriteFrame ?? 0)), spriteImages.length ? spriteImages.length - 1 : 0);
      return [{ src: spriteImages[frame] || sprite00, blink: false, glow: false, hidden: false, opacity: 1 }];
    }
    if (transitionState === "complete") {
      return [{ src: sprite00, blink: false, glow: false, hidden: false, opacity: 1, transitionDuration: "0s" }];
    }
    if (transitionState === "fading") {
      return [
        { src: staticSrc, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 0 : 1, transitionDuration: "2s" },
        { src: sprite00, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 1 : 0, transitionDuration: "2s" },
      ];
    }
    return [{
      src: staticSrc,
      blink: false,
      glow: false,
      hidden: false,
      opacity: 1,
      onClick: () => {
        if (typeof window !== "undefined") {
          window.page4Tap2Hidden = true;
          window.page4Image1Clicked = true;
          window.page4Image1TransitionState = "fading";
          window.page4Image1FadeTrigger = false;
          if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          setTimeout(() => {
            window.page4Image1FadeTrigger = true;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          }, IMAGE_STACK_FADE_TRIGGER_DELAY_MS);
          setTimeout(() => {
            window.page4Image1TransitionState = "complete";
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            setTimeout(() => {
              const qa2 = window.questionArray2 || [];
              const idx2 = Math.min(Math.max(0, (window.page4CurrentIndex ?? 0)), (qa2 && qa2.length) ? qa2.length - 1 : 0);
              const q2 = qa2 && qa2[idx2];
              const item = q2 && q2.item1;
              const sprites = (item && item.spriteImages) || [];
              if (sprites.length === 0) return;
              const totalFrames = 8;
              const durationMs = (item && typeof item.spriteDuration === "number") ? item.spriteDuration : 1500;
              const frameMs = durationMs / totalFrames;
              const lastArrayIndex = sprites.length - 1;
              if (window.page4Image1SpriteIntervalId) clearInterval(window.page4Image1SpriteIntervalId);
              window.page4Image1TransitionState = "spriteAnimating";
              window.page4Image1SpriteFrame = 0;
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
              let step = 0;
              window.page4Image1SpriteIntervalId = setInterval(() => {
                step += 1;
                const nextFrame = step < totalFrames ? Math.min(step, lastArrayIndex) : lastArrayIndex;
                window.page4Image1SpriteFrame = nextFrame;
                if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                if (step >= totalFrames) {
                  clearInterval(window.page4Image1SpriteIntervalId);
                  window.page4Image1SpriteIntervalId = null;
                  window.page4Image1TransitionState = "spriteComplete";
                  if (typeof window !== "undefined") {
                    if (!window.page4TextboxVisibility) window.page4TextboxVisibility = {};
                    window.page4TextboxVisibility.textbox1 = true;
                    if (item) window.page4TalkBoxItem = { type: item.type, item_name: item.item_name };
                    if (window.page4Image2Clicked) window.page4SecondAnimationComplete = true;
                    if (item && item.type === "light") {
                      window.page4TextboxVisibility.textbox2 = true;
                      window.page4Tap2Hidden = false;
                      window.page4Tap3Hidden = false;
                      window.page4SecondAnimationComplete = true;
                    }
                  }
                  if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                }
              }, frameMs);
            }, IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE);
          }, IMAGE_STACK_TIME_TO_CROSSFADE_END_MS);
        }
      },
    }];
  };
  const getPage4Image2Images = () => {
    const qa = typeof window !== "undefined" ? window.questionArray2 : [];
    const idx = Math.min(Math.max(0, (window.page4CurrentIndex ?? 0)), (qa && qa.length) ? qa.length - 1 : 0);
    const q = qa && qa[idx];
    const staticSrc = (q && q.item2 && q.item2.image) || "assets/G2C6M1A1/Eraser.png";
    const spriteImages = (q && q.item2 && q.item2.spriteImages) || [];
    const sprite00 = spriteImages[0] || staticSrc;
    const transitionState = typeof window !== "undefined" ? (window.page4Image2TransitionState || "idle") : "idle";
    const fadeTrigger = typeof window !== "undefined" && window.page4Image2FadeTrigger;
    if (transitionState === "spriteAnimating" || transitionState === "spriteComplete") {
      const frame = Math.min(Math.max(0, (window.page4Image2SpriteFrame ?? 0)), spriteImages.length ? spriteImages.length - 1 : 0);
      return [{ src: spriteImages[frame] || sprite00, blink: false, glow: false, hidden: false, opacity: 1 }];
    }
    if (transitionState === "complete") {
      return [{ src: sprite00, blink: false, glow: false, hidden: false, opacity: 1, transitionDuration: "0s" }];
    }
    if (transitionState === "fading") {
      return [
        { src: staticSrc, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 0 : 1, transitionDuration: "2s" },
        { src: sprite00, blink: false, glow: false, hidden: false, opacity: fadeTrigger ? 1 : 0, transitionDuration: "2s" },
      ];
    }
    return [{
      src: staticSrc,
      blink: false,
      glow: false,
      hidden: false,
      opacity: 1,
      onClick: () => {
        if (typeof window !== "undefined") {
          window.page4Tap3Hidden = true;
          window.page4Image2Clicked = true;
          window.page4Image2TransitionState = "fading";
          window.page4Image2FadeTrigger = false;
          if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          setTimeout(() => {
            window.page4Image2FadeTrigger = true;
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          }, IMAGE_STACK_FADE_TRIGGER_DELAY_MS);
          setTimeout(() => {
            window.page4Image2TransitionState = "complete";
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
            setTimeout(() => {
              const qa2 = window.questionArray2 || [];
              const idx2 = Math.min(Math.max(0, (window.page4CurrentIndex ?? 0)), (qa2 && qa2.length) ? qa2.length - 1 : 0);
              const q2 = qa2 && qa2[idx2];
              const item = q2 && q2.item2;
              const sprites = (item && item.spriteImages) || [];
              if (sprites.length === 0) return;
              const totalFrames = 8;
              const durationMs = (item && typeof item.spriteDuration === "number") ? item.spriteDuration : 1500;
              const frameMs = durationMs / totalFrames;
              const lastArrayIndex = sprites.length - 1;
              if (window.page4Image2SpriteIntervalId) clearInterval(window.page4Image2SpriteIntervalId);
              window.page4Image2TransitionState = "spriteAnimating";
              window.page4Image2SpriteFrame = 0;
              if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
              let step = 0;
              window.page4Image2SpriteIntervalId = setInterval(() => {
                step += 1;
                const nextFrame = step < totalFrames ? Math.min(step, lastArrayIndex) : lastArrayIndex;
                window.page4Image2SpriteFrame = nextFrame;
                if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                if (step >= totalFrames) {
                  clearInterval(window.page4Image2SpriteIntervalId);
                  window.page4Image2SpriteIntervalId = null;
                  window.page4Image2TransitionState = "spriteComplete";
                  if (typeof window !== "undefined") {
                    if (!window.page4TextboxVisibility) window.page4TextboxVisibility = {};
                    window.page4TextboxVisibility.textbox2 = true;
                    if (item) window.page4TalkBoxItem = { type: item.type, item_name: item.item_name };
                    if (window.page4Image1Clicked) window.page4SecondAnimationComplete = true;
                    if (item && item.type === "light") {
                      window.page4TextboxVisibility.textbox1 = true;
                      window.page4Tap2Hidden = false;
                      window.page4Tap3Hidden = false;
                      window.page4SecondAnimationComplete = true;
                    }
                  }
                  if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
                }
              }, frameMs);
            }, IMAGE_STACK_MS_AFTER_FADE_BEFORE_SPRITE);
          }, IMAGE_STACK_TIME_TO_CROSSFADE_END_MS);
        }
      },
    }];
  };
  const page4Image1Props = {
    componentType: "ImageStackComponent",
    id: "page4-image-1",
    elementName: "page4-image-1",
    currentPage: 13,
    coordinates: [200, 260, 500, 660],
    zIndex: 56,
  };
  Object.defineProperty(page4Image1Props, "images", {
    get: getPage4Image1Images,
    enumerable: true,
    configurable: true,
  });
  const page4Image2Props = {
    componentType: "ImageStackComponent",
    id: "page4-image-2",
    elementName: "page4-image-2",
    currentPage: 13,
    coordinates: [200, 260, 500, 660],
    zIndex: 56,
  };
  Object.defineProperty(page4Image2Props, "images", {
    get: getPage4Image2Images,
    enumerable: true,
    configurable: true,
  });

  /** When both heavy/light labels are chosen, enable Next (PageCompletionManager + quizCompleted). */
  const dispatchPage2QuizCompletedIfLabelsDone = () => {
    if (typeof window === "undefined") return;
    const v = window.page2TextboxVisibility;
    if (v && v.textbox3 && v.textbox4) {
      window.dispatchEvent(
        new CustomEvent("quizCompleted", { detail: { pageNumber: 2 } }),
      );
    }
  };

  const dispatchPage3QuizCompletedIfLabelsDone = () => {
    if (typeof window === "undefined") return;
    const v = window.page3TextboxVisibility;
    if (v && v.textbox3 && v.textbox4) {
      window.dispatchEvent(
        new CustomEvent("quizCompleted", { detail: { pageNumber: 3 } }),
      );
    }
  };

  // Page 2 textboxes: hidden by default, show when corresponding image is clicked (via page2TextboxVisibility)
  // textbox1/3 use item1 type, textbox2/4 use item2 type
  const page2Textbox1Props = {
    componentType: "HeavyLightTextboxComponent",
    variant: "lift",
    fontSize: "32gc",
  };
  Object.defineProperty(page2Textbox1Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray && window.questionArray[window.page2CurrentIndex ?? 0];
      const t = q && q.item1 && q.item1.type;
      return t === "light" || t === "heavy" ? t : "heavy";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page2Textbox1Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page2TextboxVisibility && window.page2TextboxVisibility.textbox1),
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page2Textbox1Props, "onClick", {
    get: () => {
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      return bothClicked
        ? () => {
            if (typeof window !== "undefined") {
              if (!window.page2TextboxVisibility) window.page2TextboxVisibility = {};
              window.page2TextboxVisibility.textbox3 = true;
              window.page2Tap2HiddenAfterLabelClick = true;
              const q = window.questionArray && window.questionArray[window.page2CurrentIndex ?? 0];
              const t = q && q.item1 && q.item1.type;
              window.page2TalkBoxLabelState = (t === "light" || t === "heavy") ? t : "heavy";
            }
            dispatchPage2QuizCompletedIfLabelsDone();
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          }
        : undefined;
    },
    enumerable: true,
    configurable: true,
  });
  const page2Textbox3Props = {
    componentType: "HeavyLightTextboxComponent",
    variant: "object",
    fontSize: "32gc",
  };
  Object.defineProperty(page2Textbox3Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray && window.questionArray[window.page2CurrentIndex ?? 0];
      const t = q && q.item1 && q.item1.type;
      return t === "light" || t === "heavy" ? t : "heavy";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page2Textbox3Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page2TextboxVisibility && window.page2TextboxVisibility.textbox3),
    enumerable: true,
    configurable: true,
  });
  const page2Textbox2Props = {
    componentType: "HeavyLightTextboxComponent",
    variant: "lift",
    fontSize: "32gc",
  };
  Object.defineProperty(page2Textbox2Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray && window.questionArray[window.page2CurrentIndex ?? 0];
      const t = q && q.item2 && q.item2.type;
      return t === "light" || t === "heavy" ? t : "light";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page2Textbox2Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page2TextboxVisibility && window.page2TextboxVisibility.textbox2),
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page2Textbox2Props, "onClick", {
    get: () => {
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      return bothClicked
        ? () => {
            if (typeof window !== "undefined") {
              if (!window.page2TextboxVisibility) window.page2TextboxVisibility = {};
              window.page2TextboxVisibility.textbox4 = true;
              window.page2Tap3HiddenAfterLabelClick = true;
              const q = window.questionArray && window.questionArray[window.page2CurrentIndex ?? 0];
              const t = q && q.item2 && q.item2.type;
              window.page2TalkBoxLabelState = (t === "light" || t === "heavy") ? t : "light";
            }
            dispatchPage2QuizCompletedIfLabelsDone();
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          }
        : undefined;
    },
    enumerable: true,
    configurable: true,
  });
  const page2Textbox4Props = {
    componentType: "HeavyLightTextboxComponent",
    variant: "object",
    fontSize: "32gc",
  };
  Object.defineProperty(page2Textbox4Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray && window.questionArray[window.page2CurrentIndex ?? 0];
      const t = q && q.item2 && q.item2.type;
      return t === "light" || t === "heavy" ? t : "light";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page2Textbox4Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page2TextboxVisibility && window.page2TextboxVisibility.textbox4),
    enumerable: true,
    configurable: true,
  });

  // Page 2 instruction text: when both images clicked / last question, use i18n keys
  const page2InstructionProps = {
    componentType: "SectionHeaderComponent",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "15gc",
    textColor: "#ffff",
    fontSize: "42gc",
    padding: "15gc",
    textAlign: "center",
    underlineFirstWord: false,
    allowHtml: true,
  };
  Object.defineProperty(page2InstructionProps, "text", {
    get: () => {
      const vis = typeof window !== "undefined" && window.page2TextboxVisibility;
      const bothLabelsClicked = vis && vis.textbox3 && vis.textbox4;
      if (bothLabelsClicked) {
        const qa = typeof window !== "undefined" ? window.questionArray : [];
        const len = qa && qa.length ? qa.length : 0;
        const idx = Math.min(Math.max(0, (window.page2CurrentIndex ?? 0)), len ? len - 1 : 0);
        const isLastQuestion = len > 0 && idx >= len - 1;
        return isLastQuestion ? getI18nText("pages.page2.instructionTextContinue", "") : getI18nText("pages.page2.instructionTextTryMore", "");
      }
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      return bothClicked ? getI18nText("pages.page2.instructionTextWhenBothClicked", "") : getI18nText("pages.page2.instructionText", "");
    },
    enumerable: true,
    configurable: true,
  });

  // Page 2 talk box: default text until an image is clicked; then "The <item_name> is hard/easy to lift." (hard=gold, easy=aqua)
  const page2TalkBoxProps = {
    componentType: "TeacherNoteComponent",
    backgroundColor: "rgb(0,0,0,0.7)",
    border: "none",
    borderRadius: "15gc",
    textColor: "#ffff",
    fontSize: "36gc",
    padding: "15gc",
    allowHtml: true,
  };
  Object.defineProperty(page2TalkBoxProps, "text", {
    get: () => {
      const labelState = typeof window !== "undefined" && window.page2TalkBoxLabelState;
      if (labelState === "heavy") return getI18nText("pages.page2.talkBoxHeavyLabel", "");
      if (labelState === "light") return getI18nText("pages.page2.talkBoxLightLabel", "");
      const item = typeof window !== "undefined" && window.page2TalkBoxItem;
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page2SecondAnimationComplete;
      const suffix = getI18nText("pages.page2.talkBoxSuffix", "");
      if (item && item.item_name != null && item.type) {
        const name = String(item.item_name);
        if (item.type === "heavy") {
          const line1 = getI18nText("pages.page2.talkBoxItemHeavy", "", { name });
          return bothClicked && secondAnimationComplete ? line1 + suffix : line1;
        }
        if (item.type === "light") {
          const line1 = getI18nText("pages.page2.talkBoxItemLight", "", { name });
          return bothClicked && secondAnimationComplete ? line1 + suffix : line1;
        }
      }
      return getI18nText("pages.page2.talkBoxText", "");
    },
    enumerable: true,
    configurable: true,
  });

  // Page 2 tap animations 2 & 3: forceHide when corresponding image is clicked
  const page2Tap2Props = {
    componentType: "TapGifComponent",
    imageSrc: "assets/tap.gif",
    imageAlt: getI18nText("common.tapAlt", ""),
    opacity: 0.95,
    // Page 2 gates Next on quiz completion; image hints must not depend on pageCompleted
    alwaysVisible: true,
  };
  Object.defineProperty(page2Tap2Props, "forceHide", {
    get: () => {
      if (typeof window !== "undefined" && window.page2Tap2HiddenAfterLabelClick) return true;
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page2SecondAnimationComplete;
      if (bothClicked && secondAnimationComplete) return false;
      return !!(typeof window !== "undefined" && window.page2Tap2Hidden);
    },
    enumerable: true,
    configurable: true,
  });
  const page2Tap3Props = {
    componentType: "TapGifComponent",
    imageSrc: "assets/tap.gif",
    imageAlt: getI18nText("common.tapAlt", ""),
    opacity: 0.95,
    alwaysVisible: true,
  };
  Object.defineProperty(page2Tap3Props, "forceHide", {
    get: () => {
      if (typeof window !== "undefined" && window.page2Tap3HiddenAfterLabelClick) return true;
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page2SecondAnimationComplete;
      if (bothClicked && secondAnimationComplete) return false;
      return !!(typeof window !== "undefined" && window.page2Tap3Hidden);
    },
    enumerable: true,
    configurable: true,
  });

  // Page 2 tap-animation-2: coordinates move to [538, 150, 588, 200] when both images clicked
  const page2TapAnimation2Element = {
    id: "page2-tap-animation-2",
    name: "tap-animation-2",
    type: "custom",
    zIndex: "999",
    props: page2Tap2Props,
  };
  Object.defineProperty(page2TapAnimation2Element, "coordinates", {
    get: () => {
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page2SecondAnimationComplete;
      return bothClicked && secondAnimationComplete ? [538, 150, 588, 200] : [678, 453, 728, 503];
    },
    enumerable: true,
    configurable: true,
  });

  // Page 2 tap-animation-3: coordinates move to [1175, 170, 1225, 220] when both images clicked
  const page2TapAnimation3Element = {
    id: "page2-tap-animation-3",
    name: "tap-animation-3",
    type: "custom",
    zIndex: "999",
    props: page2Tap3Props,
  };
  Object.defineProperty(page2TapAnimation3Element, "coordinates", {
    get: () => {
      const bothClicked = typeof window !== "undefined" && window.page2Image1Clicked && window.page2Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page2SecondAnimationComplete;
      return bothClicked && secondAnimationComplete ? [1175, 170, 1225, 220] : [1175, 513, 1225, 563];
    },
    enumerable: true,
    configurable: true,
  });

  // Page 3 talk box (uses questionArray2 and page3* state)
  const page3TalkBoxProps = {
    componentType: "TeacherNoteComponent",
    backgroundColor: "rgb(0,0,0,0.7)",
    border: "none",
    borderRadius: "15gc",
    textColor: "#ffff",
    fontSize: "36gc",
    padding: "15gc",
    allowHtml: true,
  };
  Object.defineProperty(page3TalkBoxProps, "text", {
    get: () => {
      const labelState = typeof window !== "undefined" && window.page3TalkBoxLabelState;
      const labelItem = typeof window !== "undefined" && window.page3TalkBoxLabelClickItem;
      const name = (labelItem && labelItem.item_name != null) ? String(labelItem.item_name) : "";
      const defaultHeavy = getI18nText("common.defaultObjectHeavy", "");
      const defaultLight = getI18nText("common.defaultObjectLight", "");
      if (labelState === "heavy") return getI18nText("pages.page3.talkBoxCorrectHeavy", "", { name: name || defaultHeavy });
      if (labelState === "light") return getI18nText("pages.page3.talkBoxOopsLight", "", { name: name || defaultLight });
      const item = typeof window !== "undefined" && window.page3TalkBoxItem;
      if (item && item.item_name != null && item.type) {
        const n = String(item.item_name);
        if (item.type === "heavy") return getI18nText("pages.page3.talkBoxOopsHeavy", "", { name: n });
        if (item.type === "light") return getI18nText("pages.page3.talkBoxGoodJobLight", "", { name: n });
      }
      return getI18nText("pages.page3.talkBoxText", "");
    },
    enumerable: true,
    configurable: true,
  });

  // Page 3 textboxes (questionArray2, page3* state)
  const page3Textbox1Props = { componentType: "HeavyLightTextboxComponent", variant: "lift", fontSize: "32gc" };
  Object.defineProperty(page3Textbox1Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page3CurrentIndex ?? 0];
      const t = q && q.item1 && q.item1.type;
      return t === "light" || t === "heavy" ? t : "heavy";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page3Textbox1Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page3TextboxVisibility && window.page3TextboxVisibility.textbox1),
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page3Textbox1Props, "onClick", {
    get: () => {
      const secondAnimationComplete = typeof window !== "undefined" && window.page3SecondAnimationComplete;
      return secondAnimationComplete ? () => {
        if (typeof window !== "undefined") {
          if (!window.page3TextboxVisibility) window.page3TextboxVisibility = {};
          window.page3TextboxVisibility.textbox3 = true;
          window.page3Tap2HiddenAfterLabelClick = true;
          const q = window.questionArray2 && window.questionArray2[window.page3CurrentIndex ?? 0];
          const item = q && q.item1;
          const t = item && item.type;
          window.page3TalkBoxLabelState = (t === "light" || t === "heavy") ? t : "heavy";
          window.page3TalkBoxLabelClickItem = item ? { item_name: item.item_name, type: item.type } : null;
        }
        dispatchPage3QuizCompletedIfLabelsDone();
        if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
      } : undefined;
    },
    enumerable: true,
    configurable: true,
  });
  const page3Textbox3Props = { componentType: "HeavyLightTextboxComponent", variant: "object", fontSize: "32gc" };
  Object.defineProperty(page3Textbox3Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page3CurrentIndex ?? 0];
      const t = q && q.item1 && q.item1.type;
      return t === "light" || t === "heavy" ? t : "heavy";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page3Textbox3Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page3TextboxVisibility && window.page3TextboxVisibility.textbox3),
    enumerable: true,
    configurable: true,
  });
  const page3Textbox2Props = { componentType: "HeavyLightTextboxComponent", variant: "lift", fontSize: "32gc" };
  Object.defineProperty(page3Textbox2Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page3CurrentIndex ?? 0];
      const t = q && q.item2 && q.item2.type;
      return t === "light" || t === "heavy" ? t : "light";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page3Textbox2Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page3TextboxVisibility && window.page3TextboxVisibility.textbox2),
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page3Textbox2Props, "onClick", {
    get: () => {
      const secondAnimationComplete = typeof window !== "undefined" && window.page3SecondAnimationComplete;
      return secondAnimationComplete ? () => {
        if (typeof window !== "undefined") {
          if (!window.page3TextboxVisibility) window.page3TextboxVisibility = {};
          window.page3TextboxVisibility.textbox4 = true;
          window.page3Tap3HiddenAfterLabelClick = true;
          const q = window.questionArray2 && window.questionArray2[window.page3CurrentIndex ?? 0];
          const item = q && q.item2;
          const t = item && item.type;
          window.page3TalkBoxLabelState = (t === "light" || t === "heavy") ? t : "light";
          window.page3TalkBoxLabelClickItem = item ? { item_name: item.item_name, type: item.type } : null;
        }
        dispatchPage3QuizCompletedIfLabelsDone();
        if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
      } : undefined;
    },
    enumerable: true,
    configurable: true,
  });
  const page3Textbox4Props = { componentType: "HeavyLightTextboxComponent", variant: "object", fontSize: "32gc" };
  Object.defineProperty(page3Textbox4Props, "type", {
    get: () => {
      const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page3CurrentIndex ?? 0];
      const t = q && q.item2 && q.item2.type;
      return t === "light" || t === "heavy" ? t : "light";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(page3Textbox4Props, "hidden", {
    get: () => !(typeof window !== "undefined" && window.page3TextboxVisibility && window.page3TextboxVisibility.textbox4),
    enumerable: true,
    configurable: true,
  });

  // Page 3 instruction (questionArray2, page3CurrentIndex)
  const page3InstructionProps = {
    componentType: "SectionHeaderComponent",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "15gc",
    textColor: "#ffff",
    fontSize: "42gc",
    padding: "15gc",
    textAlign: "center",
    underlineFirstWord: false,
    allowHtml: true,
  };
  Object.defineProperty(page3InstructionProps, "text", {
    get: () => {
      const vis = typeof window !== "undefined" && window.page3TextboxVisibility;
      const bothLabelsClicked = vis && vis.textbox3 && vis.textbox4;
      if (bothLabelsClicked) {
        const qa = typeof window !== "undefined" ? window.questionArray2 : [];
        const len = qa && qa.length ? qa.length : 0;
        const idx = Math.min(Math.max(0, (window.page3CurrentIndex ?? 0)), len ? len - 1 : 0);
        const isLastQuestion = len > 0 && idx >= len - 1;
        return isLastQuestion ? getI18nText("pages.page3.instructionTextContinue", "") : getI18nText("pages.page3.instructionTextTryMore", "");
      }
      const secondAnimationComplete = typeof window !== "undefined" && window.page3SecondAnimationComplete;
      const bothClicked = typeof window !== "undefined" && window.page3Image1Clicked && window.page3Image2Clicked;
      if (secondAnimationComplete || bothClicked) return getI18nText("pages.page3.instructionTextWhenBothClicked", "");
      return getI18nText("pages.page3.instructionText", "");
    },
    enumerable: true,
    configurable: true,
  });

  // Page 4 talk box (replica of page 3)
  const page4TalkBoxProps = {
    componentType: "TeacherNoteComponent",
    backgroundColor: "rgb(0,0,0,0.7)",
    border: "none",
    borderRadius: "15gc",
    textColor: "#ffff",
    fontSize: "36gc",
    padding: "15gc",
    allowHtml: true,
  };
  Object.defineProperty(page4TalkBoxProps, "text", {
    get: () => {
      const labelState = typeof window !== "undefined" && window.page4TalkBoxLabelState;
      const labelItem = typeof window !== "undefined" && window.page4TalkBoxLabelClickItem;
      const name = (labelItem && labelItem.item_name != null) ? String(labelItem.item_name) : "";
      const defaultHeavy = getI18nText("common.defaultObjectHeavy", "");
      const defaultLight = getI18nText("common.defaultObjectLight", "");
      if (labelState === "heavy") return getI18nText("pages.page4.talkBoxCorrectHeavy", "", { name: name || defaultHeavy });
      if (labelState === "light") return getI18nText("pages.page4.talkBoxOopsLight", "", { name: name || defaultLight });
      const item = typeof window !== "undefined" && window.page4TalkBoxItem;
      if (item && item.item_name != null && item.type) {
        const n = String(item.item_name);
        if (item.type === "heavy") return getI18nText("pages.page4.talkBoxOopsHeavy", "", { name: n });
        if (item.type === "light") return getI18nText("pages.page4.talkBoxGoodJobLight", "", { name: n });
      }
      return getI18nText("pages.page4.talkBoxText", "");
    },
    enumerable: true,
    configurable: true,
  });
  const page4Textbox1Props = { componentType: "HeavyLightTextboxComponent", variant: "lift", fontSize: "32gc", transparentBgWithColoredWords: true };
  Object.defineProperty(page4Textbox1Props, "type", { get: () => { const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page4CurrentIndex ?? 0]; const t = q && q.item1 && q.item1.type; return t === "light" || t === "heavy" ? t : "heavy"; }, enumerable: true, configurable: true });
  Object.defineProperty(page4Textbox1Props, "hidden", { get: () => !(typeof window !== "undefined" && (!window.page4TextboxVisibility || window.page4TextboxVisibility.textbox1 !== false)), enumerable: true, configurable: true });
  Object.defineProperty(page4Textbox1Props, "onClick", {
    get: () => {
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      return secondAnimationComplete ? () => {
        if (typeof window !== "undefined") {
          if (!window.page4TextboxVisibility) window.page4TextboxVisibility = {};
          window.page4TextboxVisibility.textbox3 = true;
          window.page4Tap2HiddenAfterLabelClick = true;
          const q = window.questionArray2 && window.questionArray2[window.page4CurrentIndex ?? 0];
          const item = q && q.item1;
          const t = item && item.type;
          window.page4TalkBoxLabelState = (t === "light" || t === "heavy") ? t : "heavy";
          window.page4TalkBoxLabelClickItem = item ? { item_name: item.item_name, type: item.type } : null;
        }
        if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
      } : undefined;
    },
    enumerable: true,
    configurable: true,
  });
  const page4Textbox3Props = { componentType: "HeavyLightTextboxComponent", variant: "object", fontSize: "32gc" };
  Object.defineProperty(page4Textbox3Props, "type", { get: () => { const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page4CurrentIndex ?? 0]; const t = q && q.item1 && q.item1.type; return t === "light" || t === "heavy" ? t : "heavy"; }, enumerable: true, configurable: true });
  Object.defineProperty(page4Textbox3Props, "hidden", { get: () => !(typeof window !== "undefined" && (!window.page4TextboxVisibility || window.page4TextboxVisibility.textbox3 !== false)), enumerable: true, configurable: true });
  const page4Textbox2Props = { componentType: "HeavyLightTextboxComponent", variant: "lift", fontSize: "32gc", transparentBgWithColoredWords: true };
  Object.defineProperty(page4Textbox2Props, "type", { get: () => { const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page4CurrentIndex ?? 0]; const t = q && q.item2 && q.item2.type; return t === "light" || t === "heavy" ? t : "light"; }, enumerable: true, configurable: true });
  Object.defineProperty(page4Textbox2Props, "hidden", { get: () => !(typeof window !== "undefined" && (!window.page4TextboxVisibility || window.page4TextboxVisibility.textbox2 !== false)), enumerable: true, configurable: true });
  Object.defineProperty(page4Textbox2Props, "onClick", {
    get: () => {
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      return secondAnimationComplete ? () => {
        if (typeof window !== "undefined") {
          if (!window.page4TextboxVisibility) window.page4TextboxVisibility = {};
          window.page4TextboxVisibility.textbox4 = true;
          window.page4Tap3HiddenAfterLabelClick = true;
          const q = window.questionArray2 && window.questionArray2[window.page4CurrentIndex ?? 0];
          const item = q && q.item2;
          const t = item && item.type;
          window.page4TalkBoxLabelState = (t === "light" || t === "heavy") ? t : "light";
          window.page4TalkBoxLabelClickItem = item ? { item_name: item.item_name, type: item.type } : null;
        }
        if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
      } : undefined;
    },
    enumerable: true,
    configurable: true,
  });
  const page4Textbox4Props = { componentType: "HeavyLightTextboxComponent", variant: "object", fontSize: "32gc" };
  Object.defineProperty(page4Textbox4Props, "type", { get: () => { const q = typeof window !== "undefined" && window.questionArray2 && window.questionArray2[window.page4CurrentIndex ?? 0]; const t = q && q.item2 && q.item2.type; return t === "light" || t === "heavy" ? t : "light"; }, enumerable: true, configurable: true });
  Object.defineProperty(page4Textbox4Props, "hidden", { get: () => !(typeof window !== "undefined" && (!window.page4TextboxVisibility || window.page4TextboxVisibility.textbox4 !== false)), enumerable: true, configurable: true });
  const page4InstructionProps = {
    componentType: "SectionHeaderComponent",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "15gc",
    textColor: "#ffff",
    fontSize: "42gc",
    padding: "15gc",
    textAlign: "center",
    underlineFirstWord: false,
    allowHtml: true,
  };
  Object.defineProperty(page4InstructionProps, "text", {
    get: () => {
      const vis = typeof window !== "undefined" && window.page4TextboxVisibility;
      const bothLabelsClicked = vis && vis.textbox3 && vis.textbox4;
      if (bothLabelsClicked) {
        const qa = typeof window !== "undefined" ? window.questionArray2 : [];
        const len = qa && qa.length ? qa.length : 0;
        const idx = Math.min(Math.max(0, (window.page4CurrentIndex ?? 0)), len ? len - 1 : 0);
        const isLastQuestion = len > 0 && idx >= len - 1;
        return isLastQuestion ? getI18nText("pages.page4.instructionTextContinue", "") : getI18nText("pages.page4.instructionTextTryMore", "");
      }
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      const bothClicked = typeof window !== "undefined" && window.page4Image1Clicked && window.page4Image2Clicked;
      if (secondAnimationComplete || bothClicked) return getI18nText("pages.page4.instructionTextWhenBothClicked", "");
      return getI18nText("pages.page4.instructionText", "");
    },
    enumerable: true,
    configurable: true,
  });
  const page4Tap2Props = { componentType: "TapGifComponent", imageSrc: "assets/tap.gif", imageAlt: getI18nText("common.tapAlt", ""), opacity: 0.55 };
  Object.defineProperty(page4Tap2Props, "forceHide", {
    get: () => {
      if (typeof window !== "undefined" && window.page4Tap2HiddenAfterLabelClick) return true;
      const bothClicked = typeof window !== "undefined" && window.page4Image1Clicked && window.page4Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      if (bothClicked && secondAnimationComplete) return false;
      return !!(typeof window !== "undefined" && window.page4Tap2Hidden);
    },
    enumerable: true,
    configurable: true,
  });
  const page4Tap3Props = { componentType: "TapGifComponent", imageSrc: "assets/tap.gif", imageAlt: getI18nText("common.tapAlt", ""), opacity: 0.55 };
  Object.defineProperty(page4Tap3Props, "forceHide", {
    get: () => {
      if (typeof window !== "undefined" && window.page4Tap3HiddenAfterLabelClick) return true;
      const bothClicked = typeof window !== "undefined" && window.page4Image1Clicked && window.page4Image2Clicked;
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      if (bothClicked && secondAnimationComplete) return false;
      return !!(typeof window !== "undefined" && window.page4Tap3Hidden);
    },
    enumerable: true,
    configurable: true,
  });
  const page4TapAnimation2Element = { id: "page4-tap-animation-2", name: "tap-animation-2", type: "custom", zIndex: "999", props: page4Tap2Props };
  Object.defineProperty(page4TapAnimation2Element, "coordinates", {
    get: () => {
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      return secondAnimationComplete ? [678, 150, 728, 200] : [678, 453, 728, 503];
    },
    enumerable: true,
    configurable: true,
  });
  const page4TapAnimation3Element = { id: "page4-tap-animation-3", name: "tap-animation-3", type: "custom", zIndex: "999", props: page4Tap3Props };
  Object.defineProperty(page4TapAnimation3Element, "coordinates", {
    get: () => {
      const secondAnimationComplete = typeof window !== "undefined" && window.page4SecondAnimationComplete;
      return secondAnimationComplete ? [1275, 150, 1325, 200] : [1275, 453, 1325, 503];
    },
    enumerable: true,
    configurable: true,
  });

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
          textColor: "#fff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
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
            return getI18nText("buttons.start", "");
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
      // page2 talk text box black background - text updates when an image is clicked (The <item_name> is hard/easy to lift.)
      {
        id: "page2-talk-text-box-black-background",
        name: "page2-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350], // Positioned below question text box
        zIndex: 55,
        props: page2TalkBoxProps,
      },
      //dee tee image
      {
        id: "page2-dee-tee-image",
        name: "page2-dee-tee-image",
        type: "custom",
        coordinates: [50, 370, 400, 800], // Bottom of question background, left position (equal spacing)
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
      // page1 image1 black background
      {
        id: "page2-image1-black-background",
        name: "page2-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1000, 800], // Dark background panel behind left image (no text)
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
      // page2 textbox1 (lift label) - hidden by default, shown when image-1 is clicked
      {
        id: "page2-textbox1",
        name: "page2-textbox1",
        type: "custom",
        coordinates: [479, 145, 926, 200],
        zIndex: 56,
        props: page2Textbox1Props,
      },
      // page2 textbox3 (object label) - hidden by default, shown when image-1 is clicked
      {
        id: "page2-textbox3",
        name: "page2-textbox3",
        type: "custom",
        coordinates: [479, 85, 926, 140],
        zIndex: 57,
        props: page2Textbox3Props,
      },
      //school bag image (src from questionArray[page2CurrentIndex].item1.image)
      {
        id: "page2-image-1",
        name: "page2-image-1",
        type: "custom",
        coordinates: [450, 225, 1000, 725],
        zIndex: 999,
        props: page2Image1Props,
      },
      // page2 image2 black background
      {
        id: "page2-image2-black-background",
        name: "page2-image2-black-background",
        type: "custom",
        coordinates: [1005, 5, 1595, 800], // Positioned below question text box
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
      // page2 textbox2 (lift label) - hidden by default, shown when image-2 is clicked
      {
        id: "page2-textbox2",
        name: "page2-textbox2",
        type: "custom",
        coordinates: [1079, 145, 1521, 200],
        zIndex: 56,
        props: page2Textbox2Props,
      },
      // page2 textbox4 (object label) - hidden by default, shown when image-2 is clicked
      {
        id: "page2-textbox4",
        name: "page2-textbox4",
        type: "custom",
        coordinates: [1079, 85, 1521, 140],
        zIndex: 57,
        props: page2Textbox4Props,
      },
      //eraser image (src from questionArray[page2CurrentIndex].item2.image)
      {
        id: "page2-image-2",
        name: "page2-image-2",
        type: "custom",
        coordinates: [1045, 225, 1590, 725],
        zIndex: 999,
        props: page2Image2Props,
      },
      // page2-instruction-text (i18n: instructionTextWhenBothClicked when both images clicked)
      {
        id: "page2-instruction-text",
        name: "page2-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895], // Positioned below question text box
        zIndex: 55,
        props: page2InstructionProps,
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
      // Tap Animation GIF 2 (55% opacity) - hidden when image-1 is clicked; coordinates move when both images clicked
      page2TapAnimation2Element,
      // Tap Animation GIF 3 (55% opacity) - hidden when image-2 is clicked; coordinates move when both images clicked
      page2TapAnimation3Element,

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
            if (typeof window === "undefined") return;
            const qa = window.questionArray || [];
            const len = qa.length ? qa.length : 0;
            const idx = Math.min(Math.max(0, (window.page2CurrentIndex ?? 0)), len ? len - 1 : 0);
            const isLastQuestion = len > 0 && idx >= len - 1;
            if (isLastQuestion) {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(3);
              } else if (window.navigateToPage) {
                window.navigateToPage(3);
              }
              return;
            }
            window.page2CurrentIndex = idx + 1;
            window.page2TextboxVisibility = { left: false, right: false, textbox1: false, textbox2: false, textbox3: false, textbox4: false };
            window.page2TalkBoxItem = null;
            window.page2TalkBoxLabelState = null;
            window.page2SecondAnimationComplete = false;
            window.page2Tap2HiddenAfterLabelClick = false;
            window.page2Tap3HiddenAfterLabelClick = false;
            window.page2Tap2Hidden = false;
            window.page2Tap3Hidden = false;
            window.page2Image1Clicked = false;
            window.page2Image2Clicked = false;
            window.page2Image1TransitionState = "idle";
            window.page2Image1FadeTrigger = false;
            window.page2Image1BlinkDone = true;
            if (window.page2Image1SpriteIntervalId) { clearInterval(window.page2Image1SpriteIntervalId); window.page2Image1SpriteIntervalId = null; }
            window.page2Image2TransitionState = "idle";
            window.page2Image2FadeTrigger = false;
            window.page2Image2BlinkDone = true;
            if (window.page2Image2SpriteIntervalId) { clearInterval(window.page2Image2SpriteIntervalId); window.page2Image2SpriteIntervalId = null; }
            if (window.PageCompletionManager) {
              window.PageCompletionManager.setPageCompleted(2, false);
            }
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
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
      // page3 talk text box (uses questionArray2 and page3* state)
      {
        id: "page3-talk-text-box-black-background",
        name: "page3-talk-text-box-black-background",
        type: "custom",
        coordinates: [10, 5, 400, 350],
        zIndex: 55,
        props: page3TalkBoxProps,
      },
      // page3 dee tee image (replica of page2)
      {
        id: "page3-dee-tee-image",
        name: "page3-dee-tee-image",
        type: "custom",
        coordinates: [50, 370, 400, 800],
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-dee-tee-image",
          elementName: "page3-dee-tee-image",
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            { src: "assets/deeTee.png", blink: false, glow: false, hidden: false, opacity: 1 },
          ],
        },
      },
      // page3 image1 black background
      {
        id: "page3-image1-black-background",
        name: "page3-image1-black-background",
        type: "custom",
        coordinates: [405, 5, 1000, 800],
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
      // page3 textbox1 (uses questionArray2 and page3* state)
      {
        id: "page3-textbox1",
        name: "page3-textbox1",
        type: "custom",
        coordinates: [479, 145, 926, 200],
        zIndex: 56,
        props: page3Textbox1Props,
      },
      // page3 textbox3
      {
        id: "page3-textbox3",
        name: "page3-textbox3",
        type: "custom",
        coordinates: [479, 85, 926, 140],
        zIndex: 57,
        props: page3Textbox3Props,
      },
      // page3 image-1 (questionArray2)
      {
        id: "page3-image-1",
        name: "page3-image-1",
        type: "custom",
        coordinates: [450, 225, 1000, 725],
        zIndex: 999,
        props: page3Image1Props,
      },
      // page3 image2 black background
      {
        id: "page3-image2-black-background",
        name: "page3-image2-black-background",
        type: "custom",
        coordinates: [1005, 5, 1595, 800],
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
      // page3 textbox2
      {
        id: "page3-textbox2",
        name: "page3-textbox2",
        type: "custom",
        coordinates: [1079, 145, 1521, 200],
        zIndex: 56,
        props: page3Textbox2Props,
      },
      // page3 textbox4
      {
        id: "page3-textbox4",
        name: "page3-textbox4",
        type: "custom",
        coordinates: [1079, 85, 1521, 140],
        zIndex: 57,
        props: page3Textbox4Props,
      },
      // page3 image-2 (questionArray2)
      {
        id: "page3-image-2",
        name: "page3-image-2",
        type: "custom",
        coordinates: [1045, 225, 1590, 725],
        zIndex: 999,
        props: page3Image2Props,
      },
      // page3 instruction (questionArray2)
      {
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        type: "custom",
        coordinates: [150, 820, 1450, 895],
        zIndex: 55,
        props: page3InstructionProps,
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

      // Next button - standard navigation for page 3
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
            if (typeof window === "undefined") return;
            const qa = window.questionArray2 || [];
            const len = qa.length ? qa.length : 0;
            const idx = Math.min(Math.max(0, (window.page3CurrentIndex ?? 0)), len ? len - 1 : 0);
            const isLastQuestion = len > 0 && idx >= len - 1;
            if (isLastQuestion) {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(4);
              } else if (window.navigateToPage) {
                window.navigateToPage(4);
              }
              return;
            }
            window.page3CurrentIndex = idx + 1;
            window.page3TextboxVisibility = { left: false, right: false, textbox1: false, textbox2: false, textbox3: false, textbox4: false };
            window.page3TalkBoxItem = null;
            window.page3TalkBoxLabelState = null;
            window.page3SecondAnimationComplete = false;
            window.page3Tap2HiddenAfterLabelClick = false;
            window.page3Tap3HiddenAfterLabelClick = false;
            window.page3Tap2Hidden = false;
            window.page3Tap3Hidden = false;
            window.page3Image1Clicked = false;
            window.page3Image2Clicked = false;
            window.page3Image1TransitionState = "idle";
            window.page3Image1FadeTrigger = false;
            window.page3Image1BlinkDone = true;
            if (window.page3Image1SpriteIntervalId) { clearInterval(window.page3Image1SpriteIntervalId); window.page3Image1SpriteIntervalId = null; }
            window.page3Image2TransitionState = "idle";
            window.page3Image2FadeTrigger = false;
            window.page3Image2BlinkDone = true;
            if (window.page3Image2SpriteIntervalId) { clearInterval(window.page3Image2SpriteIntervalId); window.page3Image2SpriteIntervalId = null; }
            if (window.PageCompletionManager) {
              window.PageCompletionManager.setPageCompleted(3, false);
            }
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          },
        },
      },

      // Previous button
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
      { id: "page4-talk-text-box-black-background", name: "page4-talk-text-box-black-background", type: "custom", coordinates: [10, 5, 400, 350], zIndex: 55, props: page4TalkBoxProps },
      { id: "page4-dee-tee-image", name: "page4-dee-tee-image", type: "custom", coordinates: [50, 370, 400, 800], zIndex: 999, props: { componentType: "ImageStackComponent", id: "page4-dee-tee-image", elementName: "page4-dee-tee-image", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/deeTee.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-image1-black-background", name: "page4-image1-black-background", type: "custom", coordinates: [405, 5, 1000, 800], zIndex: 55, props: { componentType: "TeacherNoteComponent", text: "", backgroundColor: "rgb(0,0,0,0.7)", border: "2px solid #70ACC7", borderRadius: "15gc", textColor: "#ffff", fontSize: "36gc", padding: "15gc", allowHtml: true } },
      // Images inside page4-image1-black-background (below textboxes, no overlap) — 25% larger, moved down 75gc
      { id: "page4-image1-bag", name: "page4-image1-bag", type: "custom", coordinates: [447, 177, 705, 623], zIndex: 55, props: { componentType: "ImageStackComponent", id: "page4-image1-bag", elementName: "page4-image1-bag", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/G2C6M1A1/Bag.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-image1-rock", name: "page4-image1-rock", type: "custom", coordinates: [526, 462, 714, 788], zIndex: 55, props: { componentType: "ImageStackComponent", id: "page4-image1-rock", elementName: "page4-image1-rock", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/G2C6M1A1/Rock.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-image1-watermelon", name: "page4-image1-watermelon", type: "custom", coordinates: [688, 281, 1000, 519], zIndex: 55, props: { componentType: "ImageStackComponent", id: "page4-image1-watermelon", elementName: "page4-image1-watermelon", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/G2C6M1A1/WaterMelon.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-textbox1", name: "page4-textbox1", type: "custom", coordinates: [479, 145, 926, 200], zIndex: 56, props: page4Textbox1Props },
      { id: "page4-textbox3", name: "page4-textbox3", type: "custom", coordinates: [479, 85, 926, 140], zIndex: 57, props: page4Textbox3Props },
      { id: "page4-image2-black-background", name: "page4-image2-black-background", type: "custom", coordinates: [1005, 5, 1595, 800], zIndex: 55, props: { componentType: "TeacherNoteComponent", text: "", backgroundColor: "rgb(0,0,0,0.7)", border: "2px solid #70ACC7", borderRadius: "15gc", textColor: "#ffff", fontSize: "36gc", padding: "15gc", allowHtml: true } },
      // Images inside page4-image2-black-background (below textboxes, no overlap)
      { id: "page4-image2-eraser", name: "page4-image2-eraser", type: "custom", coordinates: [1059, 168, 1312, 633], zIndex: 55, props: { componentType: "ImageStackComponent", id: "page4-image2-eraser", elementName: "page4-image2-eraser", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/G2C6M1A1/Eraser.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-image2-feather", name: "page4-image2-feather", type: "custom", coordinates: [1094, 316, 1387, 800], zIndex: 55, props: { componentType: "ImageStackComponent", id: "page4-image2-feather", elementName: "page4-image2-feather", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/G2C6M1A1/Feather.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-image2-pencil", name: "page4-image2-pencil", type: "custom", coordinates: [1330, 281, 1580, 519], zIndex: 55, props: { componentType: "ImageStackComponent", id: "page4-image2-pencil", elementName: "page4-image2-pencil", currentPage: 13, coordinates: [200, 260, 500, 660], zIndex: 56, images: [{ src: "assets/G2C6M1A1/Pencil.png", blink: false, glow: false, hidden: false, opacity: 1 }] } },
      { id: "page4-textbox2", name: "page4-textbox2", type: "custom", coordinates: [1079, 145, 1521, 200], zIndex: 56, props: page4Textbox2Props },
      { id: "page4-textbox4", name: "page4-textbox4", type: "custom", coordinates: [1079, 85, 1521, 140], zIndex: 57, props: page4Textbox4Props },
      { id: "page4-instruction-text", name: "page4-instruction-text", type: "custom", coordinates: [150, 820, 1450, 895], zIndex: 55, props: page4InstructionProps },
      { id: "page4-tap-animation", name: "tap-animation", type: "custom", coordinates: [1450, 840, 1500, 890], zIndex: "999", props: { componentType: "TapGifComponent", imageSrc: "assets/tap.gif", imageAlt: getI18nText("common.tapAlt", "") } },
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getNextButtonText(4); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            if (typeof window === "undefined") return;
            const qa = window.questionArray2 || [];
            const len = qa.length ? qa.length : 0;
            const idx = Math.min(Math.max(0, (window.page4CurrentIndex ?? 0)), len ? len - 1 : 0);
            const isLastQuestion = len > 0 && idx >= len - 1;
            if (isLastQuestion) {
              if (window.changePageAndNotify) window.changePageAndNotify(5);
              else if (window.navigateToPage) window.navigateToPage(5);
              return;
            }
            window.page4CurrentIndex = idx + 1;
            window.page4TextboxVisibility = { left: false, right: false, textbox1: false, textbox2: false, textbox3: false, textbox4: false };
            window.page4TalkBoxItem = null;
            window.page4TalkBoxLabelState = null;
            window.page4TalkBoxLabelClickItem = null;
            window.page4SecondAnimationComplete = false;
            window.page4Tap2HiddenAfterLabelClick = false;
            window.page4Tap3HiddenAfterLabelClick = false;
            window.page4Tap2Hidden = false;
            window.page4Tap3Hidden = false;
            window.page4Image1Clicked = false;
            window.page4Image2Clicked = false;
            window.page4Image1TransitionState = "idle";
            window.page4Image1FadeTrigger = false;
            window.page4Image1BlinkDone = true;
            if (window.page4Image1SpriteIntervalId) { clearInterval(window.page4Image1SpriteIntervalId); window.page4Image1SpriteIntervalId = null; }
            window.page4Image2TransitionState = "idle";
            window.page4Image2FadeTrigger = false;
            window.page4Image2BlinkDone = true;
            if (window.page4Image2SpriteIntervalId) { clearInterval(window.page4Image2SpriteIntervalId); window.page4Image2SpriteIntervalId = null; }
            if (typeof window.forceAppUpdate === "function") window.forceAppUpdate();
          },
        },
      },
      {
        id: "page4-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous", ""); },
          get disabled() { return isPrevButtonDisabled(4); },
          onClick: () => {
            const nav = getPageNavigation(4);
            if (nav && nav.prev !== null && typeof window !== "undefined") {
              if (window.playCarClickSound) window.playCarClickSound("previous");
              if (window.changePageAndNotify) window.changePageAndNotify(nav.prev);
              else if (window.navigateToPage) window.navigateToPage(nav.prev);
              else window.dispatchEvent(new CustomEvent("pageChanged", { detail: { page: nav.prev } }));
            }
          },
        },
      },
    ],
    5: [
      // Page 5: exact replica of page 14 (title, main text, tap, next)
      {
        id: "page5-title-text",
        name: "page5-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      {
        id: "page5-main-text",
        name: "page5-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600],
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF (same position as page 1; always visible on this content-only page)
      {
        id: "page5-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 650, 700, 800],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          alwaysVisible: true,
        },
      },
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 650, 950, 750],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver", "");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            // Start Over: go to page 1 and reset all variables and states
            if (typeof window !== "undefined") {
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              } else if (window.navigateToPage) {
                window.navigateToPage(1);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", { detail: { page: 1 } }),
                );
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
    // Page 5 is content-only (replica of page 14) - no sequence; tap always visible via alwaysVisible prop
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
    const setPageCompletedForSequence = (pageNumber) => {
      if (typeof window === "undefined") return;
      if (typeof window.forceAppUpdate === "function")
        window.forceAppUpdate();
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
