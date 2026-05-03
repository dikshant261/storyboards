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
  11: { prev: 10, next: null },
  12: { prev: 11, next: 13 },
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

/**
 * Spawn state for draggables that can spawn more after drop.
 * window.draggableSpawnState[baseId] = { spawnCount: -1|0|n, ids: ['baseId', 'baseId-1', ...] }
 * spawnCount: -1 = infinite spawns, 0 = no spawns after first, n = n additional spawns after first.
 */
if (typeof window !== "undefined" && !window.draggableSpawnState) {
  window.draggableSpawnState = {};
}
/** Get base id for a draggable (for spawned ids, returns the base; otherwise the id itself). */
window.getDraggableBaseId = function (draggableId) {
  if (!window.draggableSpawnState) return draggableId;
  for (const baseId of Object.keys(window.draggableSpawnState)) {
    if (window.draggableSpawnState[baseId].ids.includes(draggableId))
      return baseId;
  }
  return draggableId;
};
/** Returns an acceptValidator that accepts any spawned id for the given base. */
function getAcceptValidatorForBase(baseId) {
  return function (id) {
    if (!id) return false;
    if (id === baseId) return true;
    if (typeof id === "string" && id.startsWith(baseId + "-")) return true;
    return !!(
      window.draggableSpawnState &&
      window.draggableSpawnState[baseId] &&
      window.draggableSpawnState[baseId].ids.includes(id)
    );
  };
}

/** Page 3: ensure pulsate+blink styles exist and run animation on circle draggable (in draggable panel only). */
function ensurePage3CirclePulsateBlinkStyles() {
  const styleId = "page3-draggable-circle-pulsate-blink-styles";
  if (typeof document !== "undefined" && !document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      "@keyframes page3-circle-pulsate-blink {",
      "  0%, 100% { transform: scale(1); opacity: 1; }",
      "  50% { transform: scale(1.2); opacity: 0.4; }",
      "}",
      ".page3-draggable-circle-pulsate-blink {",
      "  animation: page3-circle-pulsate-blink 500ms ease-in-out 4;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }
}

/** Page 3: pulsate (1.2x) and blink the circle shape in the draggable panel for 2000ms. Call only when triangle/rectangle/square was incorrectly dropped. */
function triggerPage3CircleDraggablePulsateBlink() {
  ensurePage3CirclePulsateBlinkStyles();
  var circleEl =
    typeof document !== "undefined"
      ? document.getElementById("page3-draggable-yellow-circle")
      : null;
  if (!circleEl) return;
  circleEl.classList.remove("page3-draggable-circle-pulsate-blink");
  circleEl.offsetHeight;
  circleEl.classList.add("page3-draggable-circle-pulsate-blink");
  setTimeout(function () {
    if (circleEl && circleEl.parentNode)
      circleEl.classList.remove("page3-draggable-circle-pulsate-blink");
  }, 2000);
}

/** Page 4: ensure pulsate+blink styles exist and run animation on triangle draggable (in draggable panel only). */
function ensurePage4TrianglePulsateBlinkStyles() {
  const styleId = "page4-draggable-triangle-pulsate-blink-styles";
  if (typeof document !== "undefined" && !document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      "@keyframes page4-triangle-pulsate-blink {",
      "  0%, 100% { transform: scale(1); opacity: 1; }",
      "  50% { transform: scale(1.2); opacity: 0.4; }",
      "}",
      ".page4-draggable-triangle-pulsate-blink {",
      "  animation: page4-triangle-pulsate-blink 500ms ease-in-out 4;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }
}

/** Page 4: pulsate (1.2x) and blink the triangle shape in the draggable panel for 2000ms. Call only when circle/rectangle/square was incorrectly dropped. */
function triggerPage4TriangleDraggablePulsateBlink() {
  ensurePage4TrianglePulsateBlinkStyles();
  var triangleEl =
    typeof document !== "undefined"
      ? document.getElementById("page4-draggable-yellow-triangle")
      : null;
  if (!triangleEl) return;
  triangleEl.classList.remove("page4-draggable-triangle-pulsate-blink");
  triangleEl.offsetHeight;
  triangleEl.classList.add("page4-draggable-triangle-pulsate-blink");
  setTimeout(function () {
    if (triangleEl && triangleEl.parentNode)
      triangleEl.classList.remove("page4-draggable-triangle-pulsate-blink");
  }, 2000);
}

/** Page 5: ensure pulsate+blink styles exist and run animation on rectangle draggable (in draggable panel only). */
function ensurePage5RectanglePulsateBlinkStyles() {
  const styleId = "page5-draggable-rectangle-pulsate-blink-styles";
  if (typeof document !== "undefined" && !document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      "@keyframes page5-rectangle-pulsate-blink {",
      "  0%, 100% { transform: scale(1); opacity: 1; }",
      "  50% { transform: scale(1.2); opacity: 0.4; }",
      "}",
      ".page5-draggable-rectangle-pulsate-blink {",
      "  animation: page5-rectangle-pulsate-blink 500ms ease-in-out 4;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }
}

/** Page 5: pulsate (1.2x) and blink the rectangle shape in the draggable panel for 2000ms. Call only when circle/triangle/square was incorrectly dropped. */
function triggerPage5RectangleDraggablePulsateBlink() {
  ensurePage5RectanglePulsateBlinkStyles();
  var rectangleEl =
    typeof document !== "undefined"
      ? document.getElementById("page5-draggable-yellow-rectangle")
      : null;
  if (!rectangleEl) return;
  rectangleEl.classList.remove("page5-draggable-rectangle-pulsate-blink");
  rectangleEl.offsetHeight;
  rectangleEl.classList.add("page5-draggable-rectangle-pulsate-blink");
  setTimeout(function () {
    if (rectangleEl && rectangleEl.parentNode)
      rectangleEl.classList.remove("page5-draggable-rectangle-pulsate-blink");
  }, 2000);
}

/** Page 6: ensure pulsate+blink styles exist and run animation on square draggable (in draggable panel only). */
function ensurePage6SquarePulsateBlinkStyles() {
  const styleId = "page6-draggable-square-pulsate-blink-styles";
  if (typeof document !== "undefined" && !document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      "@keyframes page6-square-pulsate-blink {",
      "  0%, 100% { transform: scale(1); opacity: 1; }",
      "  50% { transform: scale(1.2); opacity: 0.4; }",
      "}",
      ".page6-draggable-square-pulsate-blink {",
      "  animation: page6-square-pulsate-blink 500ms ease-in-out 4;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }
}

/** Page 6: pulsate (1.2x) and blink the square shape in the draggable panel for 2000ms. Call only when circle/triangle/rectangle was incorrectly dropped. */
function triggerPage6SquareDraggablePulsateBlink() {
  ensurePage6SquarePulsateBlinkStyles();
  var squareEl =
    typeof document !== "undefined"
      ? document.getElementById("page6-draggable-yellow-square")
      : null;
  if (!squareEl) return;
  squareEl.classList.remove("page6-draggable-square-pulsate-blink");
  squareEl.offsetHeight;
  squareEl.classList.add("page6-draggable-square-pulsate-blink");
  setTimeout(function () {
    if (squareEl && squareEl.parentNode)
      squareEl.classList.remove("page6-draggable-square-pulsate-blink");
  }, 2000);
}

/** Called after a drop; spawns a new draggable at origin if spawnCount allows. */
window.trySpawnDraggableAfterDrop = function (draggableId) {
  if (!window.draggableSpawnState) return;
  let state = null;
  let baseId = null;
  for (const bid of Object.keys(window.draggableSpawnState)) {
    if (window.draggableSpawnState[bid].ids.includes(draggableId)) {
      state = window.draggableSpawnState[bid];
      baseId = bid;
      break;
    }
  }
  if (!state || baseId == null) return;
  const { spawnCount, ids } = state;
  const alreadySpawned = ids.length - 1;
  if (spawnCount === 0) return;
  if (spawnCount !== -1 && alreadySpawned >= spawnCount) return;
  const nextId = baseId + "-" + ids.length;
  ids.push(nextId);
  window.dispatchEvent(
    new CustomEvent("draggableSpawnUpdate", {
      detail: { baseId, newId: nextId },
    }),
  );
};

/**
 * Creates a callback that updates a feedback component (e.g. FeedbackTextboxComponent) with text and mode.
 * Use with TableGridComponent dropCallbacks. The target component should listen for pageNFeedbackUpdate.
 * @param {string} componentId - Target component id (e.g. 'page3-feedback-textbox'); pageId is extracted for event name.
 * @returns {function(text: string, mode: string)} Callback to pass to dropCallbacks
 */
function createFeedbackCallback(componentId) {
  const pageMatch = (componentId || "").match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : null;
  return (text, mode) => {
    if (typeof window === "undefined" || !pageId) return;
    window[`${pageId}FeedbackState`] = window[`${pageId}FeedbackState`] || {};
    window[`${pageId}FeedbackState`].text = text ?? "";
    window[`${pageId}FeedbackState`].mode = mode ?? "normal";
    window.dispatchEvent(
      new CustomEvent(`${pageId}FeedbackUpdate`, {
        detail: { text: text ?? "", mode: mode ?? "normal" },
      }),
    );
  };
}

/** Normalize placement value to array (handles both legacy single id and array) */
function toPlacementArray(val) {
  if (val == null) return [];
  return Array.isArray(val) ? val : [val];
}

/**
 * Creates an onClick handler for a table Check button.
 * Compares item count in the specified cell (via tableGridDropQueries) against correctAnswer.
 * Uses feedbackComponentId with createFeedbackCallback for success/incorrect feedback.
 * @param {Object} config
 * @param {number} config.correctAnswer - Expected count of items in the cell
 * @param {string} config.checkCellId - Droppable cell ID to check (e.g. 'page6-table-R1C2')
 * @param {string} config.feedbackComponentId - ID of feedback component to update
 * @param {string} config.tableId - Table element name for window.tableGridDropQueries
 * @param {number} [config.pageNumber] - Page number for quizCompleted event
 */
function createTableCheckHandler(config) {
  const {
    correctAnswer,
    checkCellId,
    feedbackComponentId,
    tableId,
    pageNumber,
    type,
    shape,
    instructionTextId,
    instructionModeOnGreater,
    instructionModeOnLess,
    instructionModeOnEqual,
    disableCheckOnEqual = false,
    completionStateKey,
  } = config;
  return () => {
    if (completionStateKey && typeof window !== "undefined" && window[completionStateKey]) {
      return;
    }
    if (typeof window !== "undefined" && window.playCarClickSound) {
      window.playCarClickSound("next");
    }
    const queries =
      window.tableGridDropQueries && window.tableGridDropQueries[tableId];
    const feedbackCallback = createFeedbackCallback(feedbackComponentId);
    if (!queries) {
      feedbackCallback(getI18nText("feedback.tryAgain"), "incorrect");
      return;
    }
    const items = queries.getItemsInCell(checkCellId) || [];

    const count = items.length;
    console.log("👩 count is :-", count);
    if (count === correctAnswer) {
      window.playCarClickSound("correct");
      feedbackCallback(
        getI18nText("feedback.thatIsCorrect", null, { type: type }),
        "correct",
      );
      if (instructionTextId && instructionModeOnEqual) {
        window[`${instructionTextId}Mode`] = instructionModeOnEqual;
      }
      if (disableCheckOnEqual && completionStateKey) {
        window[completionStateKey] = true;
      }
      if (typeof pageNumber === "number" && typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("quizCompleted", {
            detail: { componentType: "TableGridComponent", pageNumber },
          }),
        );
      }
    } else if (count > correctAnswer) {
      window.playCarClickSound("wrong");
      feedbackCallback(
        getI18nText("feedback.manyStars", null, { shape: shape }),
        "incorrect",
      );
      if (instructionTextId && instructionModeOnGreater) {
        window[`${instructionTextId}Mode`] = instructionModeOnGreater;
      }
    } else {
      window.playCarClickSound("wrong");
      feedbackCallback(
        getI18nText("feedback.notEnough", null, { shape: shape }),
        "incorrect",
      );
      if (instructionTextId && instructionModeOnLess) {
        window[`${instructionTextId}Mode`] = instructionModeOnLess;
      }
    }
    if (typeof window !== "undefined" && typeof window.forceAppUpdate === "function") {
      window.forceAppUpdate();
    }
  };
}

/**
 * Shared onDrop handler for table droppable cells.
 * When maxItems > 1, appends to array; otherwise replaces.
 * @param {number} [maxItems=1] - Max items for this cell; when > 1, supports multiple items.
 */
function ensureTableColumnShakeStyles() {
  const styleId = "table-column-max-items-shake-styles";
  if (typeof document !== "undefined" && !document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      "@keyframes table-column-max-items-shake {",
      "  0%, 100% { transform: translateX(0); }",
      "  20% { transform: translateX(-5px); }",
      "  40% { transform: translateX(5px); }",
      "  60% { transform: translateX(-4px); }",
      "  80% { transform: translateX(4px); }",
      "}",
      ".table-column-max-items-shake {",
      "  animation: table-column-max-items-shake 350ms ease-in-out 1;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }
}

function triggerTableColumnShake(droppableId) {
  if (typeof document === "undefined" || !droppableId) return;
  ensureTableColumnShakeStyles();
  const registeredDroppable =
    typeof window !== "undefined" &&
    window.DragDropContext &&
    window.DragDropContext.droppables &&
    window.DragDropContext.droppables.get(droppableId);

  const target =
    registeredDroppable?.element?.closest?.("td") ||
    registeredDroppable?.element ||
    document.querySelector(`[data-droppable-id="${droppableId}"]`)?.closest?.("td") ||
    document.querySelector(`[data-droppable-id="${droppableId}"]`) ||
    document.getElementById(droppableId);
  if (!target) return;
  const previousBackgroundColor = target.style.backgroundColor;
  target.style.backgroundColor = "salmon";
  target.classList.remove("table-column-max-items-shake");
  target.offsetHeight;
  target.classList.add("table-column-max-items-shake");
  setTimeout(function () {
    if (target && target.parentNode) {
      target.classList.remove("table-column-max-items-shake");
      target.style.backgroundColor = previousBackgroundColor;
    }
  }, 400);
}

function markOverflowFeedbackSuppression(droppableId) {
  if (typeof window === "undefined" || !droppableId) return;
  window.__tableOverflowFeedbackSuppressUntil =
    window.__tableOverflowFeedbackSuppressUntil || {};
  window.__tableOverflowFeedbackSuppressUntil[droppableId] = Date.now() + 700;
}

function shouldSuppressOverflowFeedback(context) {
  if (typeof window === "undefined") return false;
  const droppableId = context?.droppableId;
  if (!droppableId || !window.__tableOverflowFeedbackSuppressUntil) return false;
  const until = window.__tableOverflowFeedbackSuppressUntil[droppableId];
  if (!until) return false;
  if (Date.now() <= until) return true;
  delete window.__tableOverflowFeedbackSuppressUntil[droppableId];
  return false;
}

const createOnDropTableCell =
  (maxItems = 1, options = {}) =>
  (draggableId, droppableId) => {
    if (typeof window !== "undefined") {
      window.dragDropPlacements = window.dragDropPlacements || {};
      const pm = window.dragDropPlacements;
      Object.keys(pm).forEach((id) => {
        const arr = toPlacementArray(pm[id]).slice();
        const idx = arr.indexOf(draggableId);
        if (idx >= 0) {
          arr.splice(idx, 1);
          if (arr.length === 0) delete pm[id];
          else pm[id] = arr.length === 1 ? arr[0] : arr;
        }
      });
      const existing = toPlacementArray(pm[droppableId]);
      if (maxItems > 1 && existing.length >= maxItems) {
        markOverflowFeedbackSuppression(droppableId);
        if (options.shakeOnOverflow) {
          triggerTableColumnShake(droppableId);
        }
        return;
      }
      if (maxItems > 1 && existing.length < maxItems) {
        existing.push(draggableId);
        pm[droppableId] = existing;
      } else {
        pm[droppableId] = draggableId;
      }
      if (options.instructionTextId && options.defaultInstructionMode) {
        window[`${options.instructionTextId}Mode`] = options.defaultInstructionMode;
      }
      if (options.completionStateKey) {
        window[options.completionStateKey] = false;
      }
      window.dispatchEvent(
        new CustomEvent("dragDropPlacement", {
          detail: { droppableId, draggableId },
        }),
      );
      window.trySpawnDraggableAfterDrop(draggableId);
      if (typeof window.forceAppUpdate === "function") {
        window.forceAppUpdate();
      }
    }
  };

/** Legacy single-item handler (maxItems=1) */
const onDropTableCell = createOnDropTableCell(1);

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
  const questionTextSize = "28gc";

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
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [100, 100, 1500, 500], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.mainText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "55gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page1-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 700, 730, 820],
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
        coordinates: [650, 700, 950, 800],
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
      //header text
      {
        id: "page2-headertext",
        name: "page2-headertext",
        type: "custom",
        coordinates: [0, 0, 1600, 90], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page2.headerText"), // Empty text, just for background
          backgroundColor: "#2D414F", // 40% opacity black
          border: "none",
          borderRadius: "0gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //heart cloud background
      {
        id: "page2-heart-cloud-bg",
        name: "page2-heart-cloud-bg",
        type: "custom",
        coordinates: [5, 100, 645, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgb(10, 31, 46)", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //use these shapes text
      {
        id: "page2-use-these-shape-text",
        name: "page2-use-these-shape-text",
        type: "custom",
        coordinates: [40, 200, 500, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      //options text
      {
        id: "page2-option-text",
        name: "page-2-option-text",
        type: "custom",
        coordinates: [180, 420, 610, 520], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "38gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: "page2-draggable-yellow-circle",
        name: "page2-draggable-yellow-circle",
        type: "custom",
        coordinates: [420, 310, 520, 370],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "yellow-circle",
          imageSrc: "assets/yellowCircle.png",
          imageAlt: getI18nText("common.circle"),
          spawnCount: -1,
          isDisabled: true,
        },
      },

      {
        id: "page2-draggable-yellow-triangle",
        name: "page2-draggable-yellow-triangle",
        type: "custom",
        coordinates: [420, 400, 520, 450],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "yellow-triangle",
          imageSrc: "assets/yellowTriangle.png",
          imageAlt: getI18nText("common.triangle"),
          spawnCount: -1,
          isDisabled: true,
        },
      },

      {
        id: "page2-draggable-yellow-rectangle",
        name: "page2-draggable-yellow-rectangle",
        type: "custom",
        coordinates: [425, 490, 515, 540],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "yellow-rectangle",
          imageSrc: "assets/yellowRectangle.png",
          imageAlt: getI18nText("common.rectangle"),
          spawnCount: -1,
          isDisabled: true,
        },
      },

      {
        id: "page2-draggable-yellow-square",
        name: "page2-draggable-yellow-square",
        type: "custom",
        coordinates: [425, 580, 515, 640],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "yellow-square",
          imageSrc: "assets/yellowSquare.png",
          imageAlt: getI18nText("common.square"),
          spawnCount: -1,
          isDisabled: true,
        },
      },
      //table dragable
      {
        id: "animals-picture-diagram-table",
        name: "animals-picture-diagram-table",
        type: "custom",
        coordinates: [650, 230, 1580, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "animals-picture-diagram-table",

          /* =========================
             TABLE STRUCTURE
          ========================== */
          tableData: {
            headers: [
              {
                text: getI18nText("common.animal.tableHeader"),
                colSpan: 4,
              },
            ],
            rows: [
              // Row 0 – Droppable Cells
              ["", "", "", ""],

              // Row 1 – Labels
              [
                getI18nText("common.animalTable.cats"),
                getI18nText("common.animalTable.butterflies"),
                getI18nText("common.animalTable.birds"),
                getI18nText("common.animalTable.squirrels"),
              ],

              // Row 2 – Footer
              [
                {
                  text: getI18nText("common.animal.eachShape"),
                  colSpan: 4,
                },
              ],
            ],
          },

          /* =========================
             COLUMN WIDTHS
          ========================== */
          columnWidths: ["25%", "25%", "25%", "25%"],
          rowHeights: {
            0: "70%", // first data row (droppable row)
            1: "15%",
            2: "10%", // footer row
          },
          /* =========================
             STYLING (MATCH IMAGE)
          ========================== */
          headerBackgroundColor: "#0a2f3f",
          headerTextColor: "#00FFFF",
          headerFontSize: "42gc",

          textColor: "#ffffff",
          fontSize: "36gc",

          dataRowBackgroundColors: {
            0: "#083344", // droppable row
            1: "#0a3a4a", // labels row
          },
          dataRowTextAlign: { 2: "left" },
          rowOverrides: {
            1: { fontWeight: "bold" },
            2: { fontSize: "36gc", fontStyle: "italic", textAlign: "left" },
          },

          borderColor: "none",
          borderWidth: "0gc",
          borderRadius: "20gc",
          cellBorderRadius: "20gc",

          rowGap: "5gc",
          columnGap: "8gc",

          tableBorder: false,
          tableBackground: "#071e26",
          padding: "0gc",

          /* =========================
             DROPPABLE CELLS (4 BOXES)
          ========================== */
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 0,
              droppableId: "animals-cats",
              maxItems: 8,
              placementDirection: "horizontal",
              onDrop: createOnDropTableCell(8, {
                shakeOnOverflow: true,
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "animals-butterflies",
              maxItems: 8,
              placementDirection: "horizontal",
              onDrop: createOnDropTableCell(8, {
                shakeOnOverflow: true,
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 2,
              droppableId: "animals-birds",
              maxItems: 8,
              placementDirection: "horizontal",
              onDrop: createOnDropTableCell(8, {
                shakeOnOverflow: true,
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 3,
              droppableId: "animals-squirrels",
              maxItems: 8,
              placementDirection: "horizontal",
              onDrop: createOnDropTableCell(8, {
                shakeOnOverflow: true,
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],

          /* =========================
             DROP FEEDBACK CALLBACKS
          ========================== */
          dropCallbacks: {
            onAddSuccess: {
              componentId: "feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("feedback-textbox")(text, mode);
                }
              },
              text: getI18nText("feedback.correct"),
              mode: "correct",
            },

            onRemove: {
              componentId: "feedback-textbox",
              callback: (text, mode) => {
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("feedback-textbox")(text, mode);
                }
              },
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },

            onIncorrectDropOutside: {
              componentId: "feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("swoosh");
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("feedback-textbox")(text, mode);
                }
              },
              text: getI18nText("feedback.dropInsideBox"),
              mode: "incorrect",
            },
          },

          /* =========================
             IMAGE FOR PLACED ITEMS
          ========================== */
          placedContentByDraggableId: {
            "animal-icon": {
              imageSrc: "assets/star.png",
            },
          },

          placedItemDraggable: true,
          equalRowHeights: true,
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      // {
      //   id: 'page2-favorite-fruits-table',
      //   name: 'page2-favorite-fruits-table',
      //   type: 'custom',
      //   coordinates: [650, 260, 1580, 780],
      //   zIndex: 50,
      //   props: {
      //     componentType: 'TableGridComponent',
      //     elementName: 'page2-favorite-fruits-table',
      //     tableData: {
      //       headers: [{ text: getI18nText("common.foodSold", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
      //       rows: [
      //         ["", ''],
      //         [getI18nText("common.school.bicycle", "Bicycle"), getI18nText("common.school.walking", "Walking")],
      //         [{ text: getI18nText("common.eachShape", "*Each shape = 1 student"), colSpan: 2 }]
      //       ]
      //     },
      //     headerBackgroundColor: '#053745',
      //     headerTextColor: '#00FFFF',
      //     headerFontSize: '40gc',
      //     textColor: '#ffffff',
      //     fontSize: '34gc',
      //     dataRowBackgroundColors: { 0: '#053745', 1: '#053745', },
      //     rowOverrides: { 2: { fontSize: '28gc', fontStyle: 'italic' } },
      //     dataColumnTextAlign: { 0: 'left' },
      //     columnWidths: ['30%', '70%'],
      //     // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
      //     droppableCells: [
      //       { rowIndex: 0, colIndex: 1, droppableId: 'page2-table-R1C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page2-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
      //       { rowIndex: 1, colIndex: 1, droppableId: 'page2-table-R2C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
      //       { rowIndex: 2, colIndex: 1, droppableId: 'page2-table-R3C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
      //     ],
      //     dropCallbacks: {
      //       onAddSuccess: {
      //         componentId: 'page2-feedback-textbox',
      //         callback: (text, mode) => {
      //           window.playCarClickSound?.('correct');
      //           createFeedbackCallback('page2-feedback-textbox')(text, mode);
      //         },
      //         text: getI18nText('feedback.correct'),
      //         mode: 'correct',

      //         getText: (droppableId) => {
      //           if (droppableId !== 'page2-table-R1C2') return getI18nText('feedback.correct');
      //           const tableId = 'page2-favorite-fruits-table';
      //           const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
      //           const counts = queries ? queries.getItemCountsByType(droppableId) : {};
      //           const grapeCount = counts['page2-star'] || 0;
      //           const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
      //           return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
      //         },
      //       },
      //       onAddAllSuccess: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct' },
      //       onRemove: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
      //       onIncorrectDropInCell: {
      //         componentId: 'page2-feedback-textbox', callback: (text, mode) => {
      //           window.playCarClickSound?.('wrong');
      //           createFeedbackCallback('page2-feedback-textbox')(text, mode);
      //         }, text: getI18nText('feedback.placeStarsInGrapesRow', 'Oops! Place the stars in the grapes row.'), mode: 'incorrect'
      //       },
      //       onIncorrectDropOutside: {
      //         componentId: 'page2-feedback-textbox', callback: (text, mode) => {
      //           window.playCarClickSound?.('swoosh');
      //           createFeedbackCallback('page2-feedback-textbox')(text, mode);
      //         }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
      //       },
      //     },
      //     placedContentByDraggableId: { 'page2-star': { imageSrc: 'assets/star.png' } },
      //     placedItemDraggable: true,
      //     equalRowHeights: true,
      //     borderColor: 'transparent',
      //     borderWidth: '2gc',
      //     borderRadius: '8gc',
      //     cellBorderRadius: '12gc',
      //     rowGap: '4gc',
      //     columnGap: '4gc',
      //     tableBorder: false,
      //     tableBorderColor: '#0762a4b9',
      //     tableBorderWidth: '2gc',
      //     tableBorderRadius: '8gc',
      //     tableBackground: '#0a1f2e',
      //     padding: '12gc'
      //   }
      // },
      
      // // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      // {
      //   id: 'page2-check-button',
      //   name: 'check-button',
      //   type: 'button',
      //   coordinates: [80, 700, 280, 770],
      //   zIndex: 'var(--z-button)',
      //   props: (() => {
      //     const page2CheckConfig = {
      //       correctAnswer: 6,
      //       checkCellId: 'page2-table-R1C2',
      //       feedbackComponentId: 'page2-feedback-textbox',
      //       tableId: 'page2-favorite-fruits-table',
      //       pageNumber: 7
      //     };
      //     return {
      //       text: getI18nText('buttons.check'),
      //       ...page2CheckConfig,
      //       onClick: createTableCheckHandler(page2CheckConfig)
      //     };
      //   })()
      // },

      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox-unique",
        type: "custom",
        coordinates: [650, 100, 1580, 240], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: "page2-instruction-text",
        name: "page2-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page2-instruction-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText(
            "pages.page2.footerInstruction",
            getI18nText("common.sectionHeaderTapGiven"),
          ),
          backgroundColor: "#2D414F",
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
      //header text
      {
        id: "page3-headertext",
        name: "page3-headertext",
        type: "custom",
        coordinates: [0, 0, 1600, 90], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page3.headerText"), // Empty text, just for background
          backgroundColor: "#2D414F", // 40% opacity black
          border: "none",
          borderRadius: "0gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //heart cloud background
      {
        id: "page3-heart-cloud-bg",
        name: "page3-heart-cloud-bg",
        type: "custom",
        coordinates: [5, 100, 645, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgb(10, 31, 46)", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },

      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: "page3-draggable-yellow-circle",
        name: "page3-draggable-yellow-circle",
        type: "custom",
        coordinates: [420, 310, 520, 370],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page3-yellow-circle",
          imageSrc: "assets/yellowCircle.png",
          imageAlt: getI18nText("common.circle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page3-draggable-yellow-triangle",
        name: "page3-draggable-yellow-triangle",
        type: "custom",
        coordinates: [420, 400, 520, 450],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page3-yellow-triangle",
          imageSrc: "assets/yellowTriangle.png",
          imageAlt: getI18nText("common.triangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page3-draggable-yellow-rectangle",
        name: "page3-draggable-yellow-rectangle",
        type: "custom",
        coordinates: [425, 490, 515, 540],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page3-yellow-rectangle",
          imageSrc: "assets/yellowRectangle.png",
          imageAlt: getI18nText("common.rectangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page3-draggable-yellow-square",
        name: "page3-draggable-yellow-square",
        type: "custom",
        coordinates: [425, 580, 515, 640],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page3-yellow-square",
          imageSrc: "assets/yellowSquare.png",
          imageAlt: getI18nText("common.square"),
          spawnCount: -1,
          isDisabled: false,
        },
      },
      //table dragable
      {
        id: "page3-animals-picture-diagram-table",
        name: "page3-animals-picture-diagram-table",
        type: "custom",
        coordinates: [650, 230, 1580, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "animals-picture-diagram-table",

          /* =========================
             TABLE STRUCTURE
          ========================== */
          tableData: {
            headers: [
              {
                text: getI18nText("common.animal.tableHeader"),
                colSpan: 4,
              },
            ],
            rows: [
              // Row 0 – Droppable Cells
              ["", "", "", ""],

              // Row 1 – Labels
              [
                getI18nText("common.animalTable.cats"),
                getI18nText("common.animalTable.butterflies"),
                getI18nText("common.animalTable.birds"),
                getI18nText("common.animalTable.squirrels"),
              ],

              // Row 2 – Footer
              [
                {
                  text: getI18nText("common.animal.eachShape"),
                  colSpan: 4,
                },
              ],
            ],
          },

          /* =========================
             COLUMN WIDTHS
          ========================== */
          columnWidths: ["25%", "25%", "25%", "25%"],
          rowHeights: {
            0: "70%", // first data row (droppable row)
            1: "15%",
            2: "10%", // footer row
          },
          /* =========================
             STYLING (MATCH IMAGE)
          ========================== */
          headerBackgroundColor: "#0a2f3f",
          headerTextColor: "#00FFFF",
          headerFontSize: "42gc",

          textColor: "#ffffff",
          fontSize: "36gc",

          dataRowBackgroundColors: {
            0: "#083344", // droppable row
            1: "#0a3a4a", // labels row
          },
          dataRowTextAlign: { 2: "left" },
          rowOverrides: {
            1: { fontWeight: "bold" },
            2: { fontSize: "36gc", fontStyle: "italic", textAlign: "left" },
          },

          borderColor: "none",
          borderWidth: "0gc",
          borderRadius: "20gc",
          cellBorderRadius: "20gc",

          rowGap: "5gc",
          columnGap: "8gc",

          tableBorder: false,
          tableBackground: "#071e26",
          padding: "0gc",

          /* =========================
             DROPPABLE CELLS (4 BOXES)
          ========================== */
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 0,
              droppableId: "page3-table-R0C0",
              maxItems: 5,
              placementDirection: "vertical",
              acceptValidator: getAcceptValidatorForBase("page3-yellow-circle"),
              onDrop: createOnDropTableCell(5, {
                shakeOnOverflow: true,
                instructionTextId: "page3-instruction-text",
                defaultInstructionMode: "footerInstruction",
                completionStateKey: "page3CheckCompleted",
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page3-table-R0C1",
              maxItems: 8,
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 2,
              droppableId: "page3-table-R0C2",
              maxItems: 8,
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 3,
              droppableId: "page3-table-R0C3",
              maxItems: 8,
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],

          /* =========================
             DROP FEEDBACK CALLBACKS
          ========================== */
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page3-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("page3-feedback-textbox")(
                    text,
                    mode,
                  );
                }
              },
              // text: getI18nText("feedback.correct"),
              // mode: "correct",

              // getText: (droppableId) => {
              //   if (droppableId !== "page3-table-R0C0")
              //     return getI18nText("feedback.correct");
              //   const tableId = "page3-animals-picture-diagram-table";
              //   const queries =
              //     typeof window !== "undefined" &&
              //     window.tableGridDropQueries &&
              //     window.tableGridDropQueries[tableId];
              //   const counts = queries
              //     ? queries.getItemCountsByType(droppableId)
              //     : {};
              //   const grapeCount = counts["page3-yellow-circle"] || 0;
              //   const animal =
              //     grapeCount === 1
              //       ? getI18nText("common.cat")
              //       : getI18nText("common.animal.cats");
              //   const shape = getI18nText("common.circle");
              //   return getI18nText("feedback.placedShape", null, {
              //     num: grapeCount,
              //     animal: animal,
              //     shape: shape,
              //   });
              // },
            },

            onRemove: {
              componentId: "page3-feedback-textbox",
              callback: createFeedbackCallback("page3-feedback-textbox"),
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page3-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("wrong");

                const draggableId = context?.draggableId;
                const baseId =
                  typeof window !== "undefined" && window.getDraggableBaseId
                    ? window.getDraggableBaseId(draggableId)
                    : draggableId;
                const isCircle =
                  baseId && baseId.startsWith("page3-yellow-circle");

                let feedbackText;

                if (isCircle) {
                  feedbackText = getI18nText("feedback.placeIceCreamRow");
                } else {
                  feedbackText = getI18nText("feedback.chooseCorrectShape");
                }

                createFeedbackCallback("page3-feedback-textbox")(
                  feedbackText,
                  "incorrect",
                );

                // When triangle/rectangle/square is incorrectly dragged (not circle), after snap-back pulsate and blink the circle in the draggable panel for 2000ms
                if (
                  !isCircle &&
                  (baseId === "page3-yellow-triangle" ||
                    baseId === "page3-yellow-rectangle" ||
                    baseId === "page3-yellow-square")
                ) {
                  setTimeout(function () {
                    if (
                      typeof triggerPage3CircleDraggablePulsateBlink ===
                      "function"
                    ) {
                      triggerPage3CircleDraggablePulsateBlink();
                    }
                  }, 200);
                }
              },
            },
            onIncorrectDropOutside: {
              componentId: "page3-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page3-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },

          /* =========================
             IMAGE FOR PLACED ITEMS
          ========================== */
          placedContentByDraggableId: {
            "page3-yellow-circle": {
              imageSrc: "assets/yellowCircle.png",
            },
          },

          placedItemDraggable: true,
          equalRowHeights: true,
        },
      },

      //use these shapes text
      {
        id: "page3-use-these-shape-text",
        name: "page3-use-these-shape-text",
        type: "custom",
        coordinates: [40, 200, 500, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      //options text
      {
        id: "page3-option-text",
        name: "page-2-option-text",
        type: "custom",
        coordinates: [180, 420, 610, 520], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "38gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page3-check-button",
        name: "check-button",
        type: "button",
        coordinates: [220, 700, 420, 760],
        zIndex: "var(--z-button)",
        props: (() => {
          const page3CheckConfig = {
            correctAnswer: 2,
            checkCellId: "page3-table-R0C0",
            feedbackComponentId: "page3-feedback-textbox",
            tableId: "page3-animals-picture-diagram-table",
            pageNumber: 3,
            type: getI18nText("common.animal.cats"),
            shape: getI18nText("common.circle"),
            instructionTextId: "page3-instruction-text",
            instructionModeOnGreater: "instructionBeforeQuiz",
            instructionModeOnLess: "footerInstruction",
            instructionModeOnEqual: "instructionAfterQuiz",
            disableCheckOnEqual: true,
            completionStateKey: "page3CheckCompleted",
          };
          return {
            text: getI18nText("buttons.check"),
            ...page3CheckConfig,
            get disabled() {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page3CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page3CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page3CheckCompleted;
              return items.length === 0 || isCompleted;
            },
            onClick: () => {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page3CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page3CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page3CheckCompleted;
              if (items.length === 0 || isCompleted) return;
              createTableCheckHandler(page3CheckConfig)();
            },
          };
        })(),
      },

      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox-unique",
        type: "custom",
        coordinates: [660, 100, 1580, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page3-instruction-text",
          componentType: "SectionHeaderComponent",
          get text() {
            const mode =
              typeof window !== "undefined" &&
              window["page3-instruction-textMode"]
                ? window["page3-instruction-textMode"]
                : "footerInstruction";
            return getI18nText(
              `pages.page3.${mode}`,
              getI18nText("pages.page3.footerInstruction"),
            );
          },
          backgroundColor: "#2D414F",
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false,
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
          enableOnEvent: "quizCompleted", // Listen for quiz completion
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
      //header text
      {
        id: "page4-headertext",
        name: "page4-headertext",
        type: "custom",
        coordinates: [0, 0, 1600, 90], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.headerText"), // Empty text, just for background
          backgroundColor: "#2D414F", // 40% opacity black
          border: "none",
          borderRadius: "0gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //heart cloud background
      {
        id: "page4-heart-cloud-bg",
        name: "page4-heart-cloud-bg",
        type: "custom",
        coordinates: [5, 100, 645, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgb(10, 31, 46)", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },

      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: "page4-draggable-yellow-circle",
        name: "page4-draggable-yellow-circle",
        type: "custom",
        coordinates: [420, 310, 520, 370],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page4-yellow-circle",
          imageSrc: "assets/yellowCircle.png",
          imageAlt: getI18nText("common.circle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page4-draggable-yellow-triangle",
        name: "page4-draggable-yellow-triangle",
        type: "custom",
        coordinates: [420, 400, 520, 450],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page4-yellow-triangle",
          imageSrc: "assets/yellowTriangle.png",
          imageAlt: getI18nText("common.triangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page4-draggable-yellow-rectangle",
        name: "page4-draggable-yellow-rectangle",
        type: "custom",
        coordinates: [425, 490, 515, 540],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page4-yellow-rectangle",
          imageSrc: "assets/yellowRectangle.png",
          imageAlt: getI18nText("common.rectangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page4-draggable-yellow-square",
        name: "page4-draggable-yellow-square",
        type: "custom",
        coordinates: [425, 580, 515, 640],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page4-yellow-square",
          imageSrc: "assets/yellowSquare.png",
          imageAlt: getI18nText("common.square"),
          spawnCount: -1,
          isDisabled: false,
        },
      },
      //table dragable
      {
        id: "page4-animals-picture-diagram-table",
        name: "page4-animals-picture-diagram-table",
        type: "custom",
        coordinates: [650, 230, 1580, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "animals-picture-diagram-table",

          /* =========================
             TABLE STRUCTURE
          ========================== */
          tableData: {
            headers: [
              {
                text: getI18nText("common.animal.tableHeader"),
                colSpan: 4,
              },
            ],
            rows: [
              // Row 0 – Droppable Cells
              ["", "", "", ""],

              // Row 1 – Labels
              [
                getI18nText("common.animalTable.cats"),
                getI18nText("common.animalTable.butterflies"),
                getI18nText("common.animalTable.birds"),
                getI18nText("common.animalTable.squirrels"),
              ],

              // Row 2 – Footer
              [
                {
                  text: getI18nText("common.animal.eachShape"),
                  colSpan: 4,
                },
              ],
            ],
          },

          /* =========================
             COLUMN WIDTHS
          ========================== */
          columnWidths: ["25%", "25%", "25%", "25%"],
          rowHeights: {
            0: "70%", // first data row (droppable row)
            1: "15%",
            2: "10%", // footer row
          },
          /* =========================
             STYLING (MATCH IMAGE)
          ========================== */
          headerBackgroundColor: "#0a2f3f",
          headerTextColor: "#00FFFF",
          headerFontSize: "42gc",

          textColor: "#ffffff",
          fontSize: "36gc",

          dataRowBackgroundColors: {
            0: "#083344", // droppable row
            1: "#0a3a4a", // labels row
          },
          dataRowTextAlign: { 2: "left" },
          rowOverrides: {
            1: { fontWeight: "bold" },
            2: { fontSize: "36gc", fontStyle: "italic", textAlign: "left" },
          },

          borderColor: "none",
          borderWidth: "0gc",
          borderRadius: "20gc",
          cellBorderRadius: "20gc",

          rowGap: "5gc",
          columnGap: "8gc",

          tableBorder: false,
          tableBackground: "#071e26",
          padding: "0gc",

          /* =========================
             DROPPABLE CELLS (4 BOXES)
          ========================== */
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 0,
              droppableId: "page4-table-R0C0",
              maxItems: 5,
              placementDirection: "vertical",
              initialPlacementIds: [
                "page4-yellow-circle-1",
                "page4-yellow-circle-2",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page4-table-R0C1",
              maxItems: 5,
              placementDirection: "vertical",
              acceptValidator: getAcceptValidatorForBase(
                "page4-yellow-triangle",
              ),
              onDrop: createOnDropTableCell(5, {
                shakeOnOverflow: true,
                instructionTextId: "page4-instruction-text",
                defaultInstructionMode: "footerInstruction",
                completionStateKey: "page4CheckCompleted",
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 2,
              droppableId: "page4-table-R0C2",
              maxItems: 8,
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 3,
              droppableId: "page4-table-R0C3",
              maxItems: 8,
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],

          /* =========================
             DROP FEEDBACK CALLBACKS
          ========================== */
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("page4-feedback-textbox")(
                    text,
                    mode,
                  );
                }
              },
            },

            onRemove: {
              componentId: "page4-feedback-textbox",
              callback: createFeedbackCallback("page4-feedback-textbox"),
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("wrong");

                const draggableId = context?.draggableId;
                const baseId =
                  typeof window !== "undefined" && window.getDraggableBaseId
                    ? window.getDraggableBaseId(draggableId)
                    : draggableId;
                const isTriangle =
                  baseId && baseId.startsWith("page4-yellow-triangle");

                let feedbackText;

                if (isTriangle) {
                  feedbackText = getI18nText("feedback.placeSandwichRow");
                } else {
                  feedbackText = getI18nText(
                    "feedback.chooseCorrectShapeSandwich",
                  );
                }

                createFeedbackCallback("page4-feedback-textbox")(
                  feedbackText,
                  "incorrect",
                );

                // When circle/rectangle/square is incorrectly dragged (not triangle), after snap-back pulsate and blink the triangle in the draggable panel for 2000ms
                if (
                  !isTriangle &&
                  (baseId === "page4-yellow-circle" ||
                    baseId === "page4-yellow-rectangle" ||
                    baseId === "page4-yellow-square")
                ) {
                  setTimeout(function () {
                    if (
                      typeof triggerPage4TriangleDraggablePulsateBlink ===
                      "function"
                    ) {
                      triggerPage4TriangleDraggablePulsateBlink();
                    }
                  }, 200);
                }
              },
            },
            onIncorrectDropOutside: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page4-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },

          /* =========================
             IMAGE FOR PLACED ITEMS
          ========================== */
          placedContentByDraggableId: {
            "page4-yellow-triangle": {
              imageSrc: "assets/yellowTriangle.png",
            },

            "page4-yellow-circle-1": { imageSrc: "assets/yellowCircle.png" },
            "page4-yellow-circle-2": {
              imageSrc: "assets/yellowCircle.png",
            },
          },

          placedItemDraggable: true,
          equalRowHeights: true,
        },
      },

      //use these shapes text
      {
        id: "page4-use-these-shape-text",
        name: "page4-use-these-shape-text",
        type: "custom",
        coordinates: [40, 200, 500, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      //options text
      {
        id: "page4-option-text",
        name: "page-2-option-text",
        type: "custom",
        coordinates: [180, 420, 610, 520], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "38gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page4-check-button",
        name: "check-button",
        type: "button",
        coordinates: [220, 700, 420, 760],
        zIndex: "var(--z-button)",
        props: (() => {
          const page4CheckConfig = {
            correctAnswer: 4,
            checkCellId: "page4-table-R0C1",
            feedbackComponentId: "page4-feedback-textbox",
            tableId: "page4-animals-picture-diagram-table",
            pageNumber: 4,
            type: getI18nText("common.animal.butterflies"),
            shape: getI18nText("common.triangle"),
            instructionTextId: "page4-instruction-text",
            instructionModeOnGreater: "instructionBeforeQuiz",
            instructionModeOnLess: "footerInstruction",
            instructionModeOnEqual: "instructionAfterQuiz",
            disableCheckOnEqual: true,
            completionStateKey: "page4CheckCompleted",
          };
          return {
            text: getI18nText("buttons.check"),
            ...page4CheckConfig,
            get disabled() {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page4CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page4CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page4CheckCompleted;
              return items.length === 0 || isCompleted;
            },
            onClick: () => {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page4CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page4CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page4CheckCompleted;
              if (items.length === 0 || isCompleted) return;
              createTableCheckHandler(page4CheckConfig)();
            },
          };
        })(),
      },

      // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox-unique",
        type: "custom",
        coordinates: [660, 100, 1580, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: "page4-instruction-text",
        name: "page4-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page4-instruction-text",
          componentType: "SectionHeaderComponent",
          get text() {
            const mode =
              typeof window !== "undefined" &&
              window["page4-instruction-textMode"]
                ? window["page4-instruction-textMode"]
                : "footerInstruction";
            return getI18nText(
              `pages.page4.${mode}`,
              getI18nText("pages.page4.footerInstruction"),
            );
          },
          backgroundColor: "#2D414F",
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false,
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
          enableOnEvent: "quizCompleted", // Listen for quiz completion
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
      //header text
      {
        id: "page5-headertext",
        name: "page5-headertext",
        type: "custom",
        coordinates: [0, 0, 1600, 90], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.headerText"), // Empty text, just for background
          backgroundColor: "#2D414F", // 40% opacity black
          border: "none",
          borderRadius: "0gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //heart cloud background
      {
        id: "page5-heart-cloud-bg",
        name: "page5-heart-cloud-bg",
        type: "custom",
        coordinates: [5, 100, 645, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgb(10, 31, 46)", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },

      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: "page5-draggable-yellow-circle",
        name: "page5-draggable-yellow-circle",
        type: "custom",
        coordinates: [420, 310, 520, 370],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page5-yellow-circle",
          imageSrc: "assets/yellowCircle.png",
          imageAlt: getI18nText("common.circle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page5-draggable-yellow-triangle",
        name: "page5-draggable-yellow-triangle",
        type: "custom",
        coordinates: [420, 400, 520, 450],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page5-yellow-triangle",
          imageSrc: "assets/yellowTriangle.png",
          imageAlt: getI18nText("common.triangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page5-draggable-yellow-rectangle",
        name: "page5-draggable-yellow-rectangle",
        type: "custom",
        coordinates: [425, 490, 515, 540],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page5-yellow-rectangle",
          imageSrc: "assets/yellowRectangle.png",
          imageAlt: getI18nText("common.rectangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page5-draggable-yellow-square",
        name: "page5-draggable-yellow-square",
        type: "custom",
        coordinates: [425, 580, 515, 640],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page5-yellow-square",
          imageSrc: "assets/yellowSquare.png",
          imageAlt: getI18nText("common.square"),
          spawnCount: -1,
          isDisabled: false,
        },
      },
      //table dragable
      {
        id: "page5-animals-picture-diagram-table",
        name: "page5-animals-picture-diagram-table",
        type: "custom",
        coordinates: [650, 230, 1580, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "animals-picture-diagram-table",

          /* =========================
             TABLE STRUCTURE
          ========================== */
          tableData: {
            headers: [
              {
                text: getI18nText("common.animal.tableHeader"),
                colSpan: 4,
              },
            ],
            rows: [
              // Row 0 – Droppable Cells
              ["", "", "", ""],

              // Row 1 – Labels
              [
                getI18nText("common.animalTable.cats"),
                getI18nText("common.animalTable.butterflies"),
                getI18nText("common.animalTable.birds"),
                getI18nText("common.animalTable.squirrels"),
              ],

              // Row 2 – Footer
              [
                {
                  text: getI18nText("common.animal.eachShape"),
                  colSpan: 4,
                },
              ],
            ],
          },

          /* =========================
             COLUMN WIDTHS
          ========================== */
          columnWidths: ["25%", "25%", "25%", "25%"],
          rowHeights: {
            0: "70%", // first data row (droppable row)
            1: "15%",
            2: "10%", // footer row
          },
          /* =========================
             STYLING (MATCH IMAGE)
          ========================== */
          headerBackgroundColor: "#0a2f3f",
          headerTextColor: "#00FFFF",
          headerFontSize: "42gc",

          textColor: "#ffffff",
          fontSize: "36gc",

          dataRowBackgroundColors: {
            0: "#083344", // droppable row
            1: "#0a3a4a", // labels row
          },
          dataRowTextAlign: { 2: "left" },
          rowOverrides: {
            1: { fontWeight: "bold" },
            2: { fontSize: "36gc", fontStyle: "italic", textAlign: "left" },
          },

          borderColor: "none",
          borderWidth: "0gc",
          borderRadius: "20gc",
          cellBorderRadius: "20gc",

          rowGap: "5gc",
          columnGap: "8gc",

          tableBorder: false,
          tableBackground: "#071e26",
          padding: "0gc",

          /* =========================
             DROPPABLE CELLS (4 BOXES)
          ========================== */
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 0,
              droppableId: "page5-table-R0C0",
              maxItems: 5,
              placementDirection: "vertical",
              initialPlacementIds: [
                "page5-yellow-circle-1",
                "page5-yellow-circle-2",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page5-table-R0C1",
              maxItems: 5,
              placementDirection: "vertical",
              initialPlacementIds: [
                "page5-yellow-triangle-1",
                "page5-yellow-triangle-2",
                "page5-yellow-triangle-3",
                "page5-yellow-triangle-4",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 2,
              droppableId: "page5-table-R0C2",
              maxItems: 5,
              placementDirection: "vertical",
              acceptValidator: getAcceptValidatorForBase(
                "page5-yellow-rectangle",
              ),
              onDrop: createOnDropTableCell(5, {
                shakeOnOverflow: true,
                instructionTextId: "page5-instruction-text",
                defaultInstructionMode: "footerInstruction",
                completionStateKey: "page5CheckCompleted",
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 3,
              droppableId: "page5-table-R0C3",
              maxItems: 5,
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],

          /* =========================
             DROP FEEDBACK CALLBACKS
          ========================== */
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("page5-feedback-textbox")(
                    text,
                    mode,
                  );
                }
              },
            },

            onRemove: {
              componentId: "page5-feedback-textbox",
              callback: createFeedbackCallback("page5-feedback-textbox"),
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("wrong");

                const draggableId = context?.draggableId;
                const baseId =
                  typeof window !== "undefined" && window.getDraggableBaseId
                    ? window.getDraggableBaseId(draggableId)
                    : draggableId;
                const isRectangle =
                  baseId && baseId.startsWith("page5-yellow-rectangle");

                let feedbackText;

                if (isRectangle) {
                  feedbackText = getI18nText("feedback.placeBirdRow");
                } else {
                  feedbackText = getI18nText("feedback.chooseCorrectShapeBird");
                }

                createFeedbackCallback("page5-feedback-textbox")(
                  feedbackText,
                  "incorrect",
                );

                // When circle/triangle/square is incorrectly dragged (not rectangle), after snap-back pulsate and blink the rectangle in the draggable panel for 2000ms
                if (
                  !isRectangle &&
                  (baseId === "page5-yellow-circle" ||
                    baseId === "page5-yellow-triangle" ||
                    baseId === "page5-yellow-square")
                ) {
                  setTimeout(function () {
                    if (
                      typeof triggerPage5RectangleDraggablePulsateBlink ===
                      "function"
                    ) {
                      triggerPage5RectangleDraggablePulsateBlink();
                    }
                  }, 200);
                }
              },
            },
            onIncorrectDropOutside: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page5-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },

          /* =========================
             IMAGE FOR PLACED ITEMS
          ========================== */
          placedContentByDraggableId: {
            "page5-yellow-rectangle": {
              imageSrc: "assets/yellowRectangle.png",
            },

            "page5-yellow-circle-1": { imageSrc: "assets/yellowCircle.png" },
            "page5-yellow-circle-2": {
              imageSrc: "assets/yellowCircle.png",
            },
            "page5-yellow-triangle-1": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page5-yellow-triangle-2": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page5-yellow-triangle-3": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page5-yellow-triangle-4": {
              imageSrc: "assets/yellowTriangle.png",
            },
          },

          placedItemDraggable: true,
          equalRowHeights: true,
        },
      },

      //use these shapes text
      {
        id: "page5-use-these-shape-text",
        name: "page5-use-these-shape-text",
        type: "custom",
        coordinates: [40, 200, 500, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      //options text
      {
        id: "page5-option-text",
        name: "page-2-option-text",
        type: "custom",
        coordinates: [180, 420, 610, 520], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "38gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page5-check-button",
        name: "check-button",
        type: "button",
        coordinates: [220, 700, 420, 760],
        zIndex: "var(--z-button)",
        props: (() => {
          const page5CheckConfig = {
            correctAnswer: 3,
            checkCellId: "page5-table-R0C2",
            feedbackComponentId: "page5-feedback-textbox",
            tableId: "page5-animals-picture-diagram-table",
            pageNumber: 5,
            type: getI18nText("common.animal.birds"),
            shape: getI18nText("common.rectangle"),
            instructionTextId: "page5-instruction-text",
            instructionModeOnGreater: "instructionBeforeQuiz",
            instructionModeOnLess: "footerInstruction",
            instructionModeOnEqual: "instructionAfterQuiz",
            disableCheckOnEqual: true,
            completionStateKey: "page5CheckCompleted",
          };
          return {
            text: getI18nText("buttons.check"),
            ...page5CheckConfig,
            get disabled() {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page5CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page5CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page5CheckCompleted;
              return items.length === 0 || isCompleted;
            },
            onClick: () => {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page5CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page5CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page5CheckCompleted;
              if (items.length === 0 || isCompleted) return;
              createTableCheckHandler(page5CheckConfig)();
            },
          };
        })(),
      },

      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [660, 100, 1580, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page5-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: "page5-instruction-text",
        name: "page5-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page5-instruction-text",
          componentType: "SectionHeaderComponent",
          get text() {
            const mode =
              typeof window !== "undefined" &&
              window["page5-instruction-textMode"]
                ? window["page5-instruction-textMode"]
                : "footerInstruction";
            return getI18nText(
              `pages.page5.${mode}`,
              getI18nText("pages.page5.footerInstruction"),
            );
          },
          backgroundColor: "#2D414F",
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false,
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
          enableOnEvent: "quizCompleted", // Listen for quiz completion
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
      //header text
      {
        id: "page6-headertext",
        name: "page6-headertext",
        type: "custom",
        coordinates: [0, 0, 1600, 90], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.headerText"), // Empty text, just for background
          backgroundColor: "#2D414F", // 40% opacity black
          border: "none",
          borderRadius: "0gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //heart cloud background
      {
        id: "page6-heart-cloud-bg",
        name: "page6-heart-cloud-bg",
        type: "custom",
        coordinates: [5, 100, 645, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "rgb(10, 31, 46)", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },

      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: "page6-draggable-yellow-circle",
        name: "page6-draggable-yellow-circle",
        type: "custom",
        coordinates: [420, 310, 520, 370],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page6-yellow-circle",
          imageSrc: "assets/yellowCircle.png",
          imageAlt: getI18nText("common.circle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page6-draggable-yellow-triangle",
        name: "page6-draggable-yellow-triangle",
        type: "custom",
        coordinates: [420, 400, 520, 450],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page6-yellow-triangle",
          imageSrc: "assets/yellowTriangle.png",
          imageAlt: getI18nText("common.triangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page6-draggable-yellow-rectangle",
        name: "page6-draggable-yellow-rectangle",
        type: "custom",
        coordinates: [425, 490, 515, 540],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page6-yellow-rectangle",
          imageSrc: "assets/yellowRectangle.png",
          imageAlt: getI18nText("common.rectangle"),
          spawnCount: -1,
          isDisabled: false,
        },
      },

      {
        id: "page6-draggable-yellow-square",
        name: "page6-draggable-yellow-square",
        type: "custom",
        coordinates: [425, 580, 515, 640],
        zIndex: 70,
        props: {
          componentType: "Draggable",
          draggableId: "page6-yellow-square",
          imageSrc: "assets/yellowSquare.png",
          imageAlt: getI18nText("common.square"),
          spawnCount: -1,
          isDisabled: false,
        },
      },
      //table dragable
      {
        id: "page6-animals-picture-diagram-table",
        name: "page6-animals-picture-diagram-table",
        type: "custom",
        coordinates: [650, 230, 1580, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "animals-picture-diagram-table",

          /* =========================
             TABLE STRUCTURE
          ========================== */
          tableData: {
            headers: [
              {
                text: getI18nText("common.animal.tableHeader"),
                colSpan: 4,
              },
            ],
            rows: [
              // Row 0 – Droppable Cells
              ["", "", "", ""],

              // Row 1 – Labels
              [
                getI18nText("common.animalTable.cats"),
                getI18nText("common.animalTable.butterflies"),
                getI18nText("common.animalTable.birds"),
                getI18nText("common.animalTable.squirrels"),
              ],

              // Row 2 – Footer
              [
                {
                  text: getI18nText("common.animal.eachShape"),
                  colSpan: 4,
                },
              ],
            ],
          },

          /* =========================
             COLUMN WIDTHS
          ========================== */
          columnWidths: ["25%", "25%", "25%", "25%"],
          rowHeights: {
            0: "70%", // first data row (droppable row)
            1: "15%",
            2: "10%", // footer row
          },
          /* =========================
             STYLING (MATCH IMAGE)
          ========================== */
          headerBackgroundColor: "#0a2f3f",
          headerTextColor: "#00FFFF",
          headerFontSize: "42gc",

          textColor: "#ffffff",
          fontSize: "36gc",

          dataRowBackgroundColors: {
            0: "#083344", // droppable row
            1: "#0a3a4a", // labels row
          },
          dataRowTextAlign: { 2: "left" },
          rowOverrides: {
            1: { fontWeight: "bold" },
            2: { fontSize: "36gc", fontStyle: "italic", textAlign: "left" },
          },

          borderColor: "none",
          borderWidth: "0gc",
          borderRadius: "20gc",
          cellBorderRadius: "20gc",

          rowGap: "5gc",
          columnGap: "8gc",

          tableBorder: false,
          tableBackground: "#071e26",
          padding: "0gc",

          /* =========================
             DROPPABLE CELLS (4 BOXES)
          ========================== */
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 0,
              droppableId: "page6-table-R0C0",
              maxItems: 5,
              placementDirection: "vertical",
              initialPlacementIds: [
                "page6-yellow-circle-1",
                "page6-yellow-circle-2",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page6-table-R0C1",
              maxItems: 5,
              placementDirection: "vertical",
              initialPlacementIds: [
                "page6-yellow-triangle-1",
                "page6-yellow-triangle-2",
                "page6-yellow-triangle-3",
                "page6-yellow-triangle-4",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 2,
              droppableId: "page6-table-R0C2",
              maxItems: 5,
              placementDirection: "vertical",
              initialPlacementIds: [
                "page6-yellow-rectangle-1",
                "page6-yellow-rectangle-2",
                "page6-yellow-rectangle-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 0,
              colIndex: 3,
              droppableId: "page6-table-R0C3",
              maxItems: 5,
              placementDirection: "vertical",
              acceptValidator: getAcceptValidatorForBase("page6-yellow-square"),
              onDrop: createOnDropTableCell(5, {
                shakeOnOverflow: true,
                instructionTextId: "page6-instruction-text",
                defaultInstructionMode: "footerInstruction",
                completionStateKey: "page6CheckCompleted",
              }),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],

          /* =========================
             DROP FEEDBACK CALLBACKS
          ========================== */
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                if (window.createFeedbackCallback) {
                  window.createFeedbackCallback("page6-feedback-textbox")(
                    text,
                    mode,
                  );
                }
              },
            },

            onRemove: {
              componentId: "page6-feedback-textbox",
              callback: createFeedbackCallback("page6-feedback-textbox"),
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("wrong");

                const draggableId = context?.draggableId;
                const baseId =
                  typeof window !== "undefined" && window.getDraggableBaseId
                    ? window.getDraggableBaseId(draggableId)
                    : draggableId;
                const isSquare =
                  baseId && baseId.startsWith("page6-yellow-square");

                let feedbackText;

                if (isSquare) {
                  feedbackText = getI18nText("feedback.placeSquirrelRow");
                } else {
                  feedbackText = getI18nText(
                    "feedback.chooseCorrectShapeSquirrel",
                  );
                }

                createFeedbackCallback("page6-feedback-textbox")(
                  feedbackText,
                  "incorrect",
                );

                // When circle/triangle/rectangle is incorrectly dragged (not square), after snap-back pulsate and blink the square in the draggable panel for 2000ms
                if (
                  !isSquare &&
                  (baseId === "page6-yellow-circle" ||
                    baseId === "page6-yellow-triangle" ||
                    baseId === "page6-yellow-rectangle")
                ) {
                  setTimeout(function () {
                    if (
                      typeof triggerPage6SquareDraggablePulsateBlink ===
                      "function"
                    ) {
                      triggerPage6SquareDraggablePulsateBlink();
                    }
                  }, 200);
                }
              },
            },
            onIncorrectDropOutside: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode, context) => {
                if (shouldSuppressOverflowFeedback(context)) return;
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page6-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },

          /* =========================
             IMAGE FOR PLACED ITEMS
          ========================== */
          placedContentByDraggableId: {
            "page6-yellow-square": {
              imageSrc: "assets/yellowSquare.png",
            },

            "page6-yellow-circle-1": { imageSrc: "assets/yellowCircle.png" },
            "page6-yellow-circle-2": {
              imageSrc: "assets/yellowCircle.png",
            },
            "page6-yellow-triangle-1": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page6-yellow-triangle-2": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page6-yellow-triangle-3": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page6-yellow-triangle-4": {
              imageSrc: "assets/yellowTriangle.png",
            },
            "page6-yellow-rectangle-1": {
              imageSrc: "assets/yellowRectangle.png",
            },
            "page6-yellow-rectangle-2": {
              imageSrc: "assets/yellowRectangle.png",
            },
            "page6-yellow-rectangle-3": {
              imageSrc: "assets/yellowRectangle.png",
            },
          },

          placedItemDraggable: true,
          equalRowHeights: true,
        },
      },

      //use these shapes text
      {
        id: "page6-use-these-shape-text",
        name: "page6-use-these-shape-text",
        type: "custom",
        coordinates: [40, 200, 500, 300], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      //options text
      {
        id: "page6-option-text",
        name: "page-2-option-text",
        type: "custom",
        coordinates: [180, 420, 610, 520], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "38gc",
          padding: "0gc",
          textAlign: "left",
          allowHTML: true,
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page6-check-button",
        name: "check-button",
        type: "button",
        coordinates: [220, 700, 420, 760],
        zIndex: "var(--z-button)",
        props: (() => {
          const page6CheckConfig = {
            correctAnswer: 1,
            checkCellId: "page6-table-R0C3",
            feedbackComponentId: "page6-feedback-textbox",
            tableId: "page6-animals-picture-diagram-table",
            pageNumber: 6,
            type: getI18nText("common.animal.squirrels"),
            shape: getI18nText("common.square"),
            instructionTextId: "page6-instruction-text",
            instructionModeOnGreater: "instructionBeforeQuiz",
            instructionModeOnLess: "footerInstruction",
            instructionModeOnEqual: "instructionAfterQuiz",
            disableCheckOnEqual: true,
            completionStateKey: "page6CheckCompleted",
          };
          return {
            text: getI18nText("buttons.check"),
            ...page6CheckConfig,
            get disabled() {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page6CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page6CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page6CheckCompleted;
              return items.length === 0 || isCompleted;
            },
            onClick: () => {
              const queries =
                typeof window !== "undefined" &&
                window.tableGridDropQueries &&
                window.tableGridDropQueries[page6CheckConfig.tableId];
              const items = queries
                ? queries.getItemsInCell(page6CheckConfig.checkCellId) || []
                : [];
              const isCompleted =
                typeof window !== "undefined" && !!window.page6CheckCompleted;
              if (items.length === 0 || isCompleted) return;
              createTableCheckHandler(page6CheckConfig)();
            },
          };
        })(),
      },

      // Feedback Textbox Component
      {
        id: "page6-feedback-textbox",
        name: "page6-feedback-textbox-unique",
        type: "custom",
        coordinates: [660, 100, 1580, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page6-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Instruction Text
      {
        id: "page6-instruction-text",
        name: "page6-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page6-instruction-text",
          componentType: "SectionHeaderComponent",
          get text() {
            const mode =
              typeof window !== "undefined" &&
              window["page6-instruction-textMode"]
                ? window["page6-instruction-textMode"]
                : "footerInstruction";
            return getI18nText(
              `pages.page6.${mode}`,
              getI18nText("pages.page6.footerInstruction"),
            );
          },
          backgroundColor: "#2D414F",
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
        id: "page6-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false,
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
          enableOnEvent: "quizCompleted", // Listen for quiz completion
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
                  getI18nText("messages.nextButtonpage6"),
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
      //fruit cloud image
      {
        id: "page7-fruit-cloud-image",
        name: "page7-fruit-cloud-image",
        type: "container",
        coordinates: [100, 100, 800, 700], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: getI18nText("pages.page7.summaryImage"),
        },
      },
      // maintext
      {
        id: "page7-main-text",
        name: "page7-main-text",
        type: "custom",
        coordinates: [740, 210, 1550, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.mainText"),
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
        coordinates: [650, 750, 730, 840],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 700, 950, 800],
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
                  getI18nText("messages.nextButtonPage2"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              window.location.reload();
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
            getI18nText("messages.completeAppReset"),
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
