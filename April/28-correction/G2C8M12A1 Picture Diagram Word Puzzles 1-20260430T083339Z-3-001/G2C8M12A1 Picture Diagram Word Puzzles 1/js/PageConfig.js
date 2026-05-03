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
  2: { prev: 1, next: 4 },
  3: { prev: 2, next: 4 },
  4: { prev: 2, next: 5 },
  5: { prev: 4, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: 9 },
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: null },
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
        "📄 [Navigation]",
        getI18nText("messages.navigationFallback", null, {
          direction,
          page: String(targetPage),
        }),
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
    fruit,
  } = config;
  return () => {
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
    if (count === correctAnswer) {
      window.playCarClickSound("correct");
      feedbackCallback(getI18nText("feedback.thatIsCorrect"), "correct");
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
        getI18nText("feedback.manyStars", null, { fruit: fruit }),
        "incorrect",
      );
    } else {
      window.playCarClickSound("wrong");
      feedbackCallback(
        getI18nText("feedback.notEnough", null, { fruit: fruit }),
        "incorrect",
      );
    }
  };
}

/**
 * Shared onDrop handler for table droppable cells.
 * When maxItems > 1, appends to array; otherwise replaces.
 * @param {number} [maxItems=1] - Max items for this cell; when > 1, supports multiple items.
 */
const createOnDropTableCell =
  (maxItems = 1) =>
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
      if (maxItems > 1 && existing.length < maxItems) {
        existing.push(draggableId);
        pm[droppableId] = existing;
      } else {
        pm[droppableId] = draggableId;
      }
      window.dispatchEvent(
        new CustomEvent("dragDropPlacement", {
          detail: { droppableId, draggableId },
        }),
      );
      window.trySpawnDraggableAfterDrop(draggableId);
    }
  };

/** Legacy single-item handler (maxItems=1) */
const onDropTableCell = createOnDropTableCell(1);

/**
 * Shake full target row cells when drop exceeds maxItems.
 * Uses table cell ids rendered by TableGridComponent: `${tableId}-R{row}C{col}`.
 */
const shakeTableRowForDroppable = (tableId, droppableId, columnCount = 2) => {
  if (typeof window === "undefined" || !tableId || !droppableId) return;
  const rowMatch = String(droppableId).match(/-R(\d+)C\d+$/);
  if (!rowMatch) return;
  const rowNumber = rowMatch[1];
  for (let col = 0; col < columnCount; col++) {
    const cell = document.getElementById(`${tableId}-R${rowNumber}C${col}`);
    if (!cell) continue;
    const originalInlineBg = cell.style.backgroundColor || "";
    cell.classList.remove("table-cell-wiggle");
    cell.style.backgroundColor = "#FA8072";
    // Force reflow so repeated drops retrigger the animation.
    void cell.offsetWidth;
    cell.classList.add("table-cell-wiggle");
    setTimeout(() => {
      cell.classList.remove("table-cell-wiggle");
      cell.style.backgroundColor = originalInlineBg;
    }, 450);
  }
};

/**
 * Dim specific element ids when a quiz option is clicked.
 */

// ===== HELPER FUNCTIONS =====

/**
 * Resolve i18n string from data.js (no hardcoded fallbacks — all copy lives under translations).
 * @param {string} key - Dot-notation key
 * @param {string|Object} [second] - Ignored if string (legacy). If object, used as interpolation params.
 * @param {Object} [third] - Interpolation params when using legacy (key, null, params) calls.
 */
const getI18nText = (key, second, third) => {
  let params = {};
  if (
    third !== undefined &&
    third !== null &&
    typeof third === "object" &&
    !Array.isArray(third)
  ) {
    params = third;
  } else if (
    second !== undefined &&
    second !== null &&
    typeof second === "object" &&
    !Array.isArray(second)
  ) {
    params = second;
  }
  return typeof i18n !== "undefined"
    ? i18n.t(key, params)
    : `[Missing: ${key}]`;
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
      //fruit cloud image
      {
        id: "page1-fruit-cloud-image",
        name: "page1-fruit-cloud-image",
        type: "container",
        coordinates: [100, 200, 750, 650], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: "assets/fruitPlate.png",
          backgroundColor: "#052642",
          padding: "15gc",
          border: "3px solid orange",
          borderRadius: "23gc",
        },
      },
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [750, 210, 1590, 600], // Positioned below question text box
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
                  getI18nText("messages.navNextDispatched"),
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
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page2.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page2-orange-image",
        name: "page2-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page2-apple-image",
        name: "page2-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page2-banana-image",
        name: "page2-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page2-mango-image",
        name: "page2-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page2-favorite-fruits-table",
        name: "page2-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page2-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          dimRowsOnQuizClick: [1, 2, 3],
          dimRowsOnQuizClickOpacity: 0.2,
          dimRowsOnQuizClickQuizId: "page9-quiz",
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page2-table-R1C2",
              maxItems: 7,
              placementDirection: "horizontal",
              acceptValidator: getAcceptValidatorForBase("page2-star"),
              onDrop: createOnDropTableCell(9),
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page2-table-R2C2",
              maxItems: 1,
              acceptValidator: getAcceptValidatorForBase("page2-star"),
              onDrop: onDropTableCell,
              enabled: false,
              placedItemDraggable: true,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page2-table-R3C2",
              maxItems: 1,
              acceptValidator: getAcceptValidatorForBase("page2-star"),
              onDrop: onDropTableCell,
              enabled: false,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page2-table-R4C2",
              maxItems: 1,
              acceptValidator: getAcceptValidatorForBase("page2-star"),
              onDrop: onDropTableCell,
              enabled: false,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
          ],
          dropCallbacks: {
            expectedPlacementCount: 1,
            onAddSuccess: {
              componentId: "page2-feedback-textbox",
              callback: createFeedbackCallback("page2-feedback-textbox"),
              text: getI18nText("feedback.correct"),
              mode: "correct",
              getText: (droppableId) => {
                if (droppableId !== "page2-table-R1C2")
                  return getI18nText("feedback.correct");
                const tableId = "page2-favorite-fruits-table";
                const queries =
                  typeof window !== "undefined" &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];
                const counts = queries
                  ? queries.getItemCountsByType(droppableId)
                  : {};
                const grapeCount = counts["page2-star"] || 0;
                const grapeWord =
                  grapeCount === 1
                    ? getI18nText("common.fruits.grape")
                    : getI18nText("common.fruits.grapes");
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord,
                });
              },
            },
            onAddAllSuccess: {
              componentId: "page2-feedback-textbox",
              callback: createFeedbackCallback("page2-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",

              callback: () => {
                const enableNextEvent = new CustomEvent("quizCompleted", {
                  detail: {
                    componentType: "TableGridComponent",
                    pageNumber: window.getCurrentPage?.() || null,
                  },
                });
                window.dispatchEvent(enableNextEvent);
              },
            },
            onRemove: {
              componentId: "page2-feedback-textbox",
              callback: createFeedbackCallback("page2-feedback-textbox"),
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page2-feedback-textbox",
              callback: createFeedbackCallback("page2-feedback-textbox"),
              text: getI18nText("feedback.tryAgain"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page2-feedback-textbox",
              callback: createFeedbackCallback("page2-feedback-textbox"),
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page2-star": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: false,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      // One sentence with a single draggable star between before/after text
      {
        id: "page2-star-legend-text",
        name: "page2-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page2.starLegendBefore"),
          afterText: getI18nText("pages.page2.starLegendAfter"),
          draggableId: "page2-star",
          spawnCount: 1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          isDisabled: false,
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },
      //fruit plate background
      {
        id: "page2-fruit-plate-background",
        name: "page2-fruit-plate-background",
        type: "custom",
        coordinates: [955, 90, 1590, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: "", // Empty text, just for background
          backgroundColor: "#052642a6", // 40% opacity black
          border: "3px solid #053865",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //let's record number text
      {
        id: "page-2-let-record-number-text",
        name: "page-2-let-record-number-text",
        type: "custom",
        coordinates: [955, 90, 1590, 350], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page2.letRecordNumberText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "13gc",
          textColor: "#ffff",
          fontSize: "36gc",
          padding: "0gc",
          textAlign: "center",
          allowHTML: true,
        },
      },
      //fruit plate image
      {
        id: "page2-fruit-plate-image",
        name: "page2-fruit-plate-image",
        type: "container",
        coordinates: [960, 350, 1585, 750], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: "assets/fruitPlate.png",
        },
      },

      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox-unique",
        type: "custom",
        coordinates: [15, 640, 890, 800], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

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
          text: getI18nText("pages.page2.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
          initialVisible: true,
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
                  getI18nText("messages.navNextDispatched"),
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    // 3: [
    //   //header text
    //   {
    //     id: "page3-headertext",
    //     name: "page3-headertext",
    //     type: "custom",
    //     coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
    //     zIndex: 49, // Behind the text box
    //     props: {
    //       componentType: "TeacherNoteComponent",
    //       text: getI18nText("pages.page3.headerText"), // Empty text, just for background
    //       backgroundColor: "", // 40% opacity black
    //       border: "none",
    //       borderRadius: "15gc",
    //       textColor: "orange",
    //       fontSize: "43gc",
    //       padding: "0gc",
    //       allowHTML: true,
    //     },
    //   },
    //   //table orange image
    //   {
    //     id: "page3-orange-image",
    //     name: "page3-orange-image",
    //     type: "container",
    //     coordinates: [115, 200, 215, 300],
    //     zIndex: 70,
    //     props: {
    //       imageSrc: "assets/orange.png",
    //       imageAlt: getI18nText("common.fruitImageAlts.orange"),
    //     },
    //   },
    //   //table apple image
    //   {
    //     id: "page3-apple-image",
    //     name: "page3-apple-image",
    //     type: "container",
    //     coordinates: [115, 320, 215, 420],
    //     zIndex: 70,
    //     props: {
    //       imageSrc: "assets/apple.png",
    //       imageAlt: getI18nText("common.fruitImageAlts.apple"),
    //     },
    //   },
    //   //table banana image
    //   {
    //     id: "page3-banana-image",
    //     name: "page3-banana-image",
    //     type: "container",
    //     coordinates: [115, 440, 215, 540],
    //     zIndex: 70,
    //     props: {
    //       imageSrc: "assets/banana.png",
    //       imageAlt: getI18nText("common.fruitImageAlts.banana"),
    //     },
    //   },
    //   //table mango image
    //   {
    //     id: "page3-mango-image",
    //     name: "page3-mango-image",
    //     type: "container",
    //     coordinates: [115, 560, 215, 660],
    //     zIndex: 70,
    //     props: {
    //       imageSrc: "assets/mango.png",
    //       imageAlt: getI18nText("common.fruitImageAlts.mango"),
    //     },
    //   },
    //   // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
    //   {
    //     id: "page3-favorite-fruits-table",
    //     name: "page3-favorite-fruits-table",
    //     type: "custom",
    //     coordinates: [10, 90, 950, 800],
    //     zIndex: 50,
    //     props: {
    //       componentType: "TableGridComponent",
    //       elementName: "page3-favorite-fruits-table",
    //       tableData: {
    //         headers: [
    //           { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
    //         ],
    //         rows: [
    //           ["", ""],
    //           ["", ""],
    //           ["", ""],
    //           ["", ""],
    //           [{ text: "", colSpan: 2 }],
    //         ],
    //       },
    //       headerBackgroundColor: "#053745",
    //       headerTextColor: "#00FFFF",
    //       headerFontSize: "40gc",
    //       textColor: "#ffffff",
    //       fontSize: "34gc",
    //       dataRowBackgroundColors: {
    //         0: "#053745",
    //         1: "#053745",
    //         2: "#053745",
    //         3: "#053745",
    //         4: "#202930b9",
    //       },
    //       rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
    //       dataColumnTextAlign: { 0: "left" },
    //       columnWidths: ["30%", "70%"],
    //       // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
    //       droppableCells: [
    //         {
    //           rowIndex: 0,
    //           colIndex: 1,
    //           droppableId: "page3-table-R1C2",
    //           maxItems: 7,
    //           placementDirection: "horizontal",
    //           acceptValidator: getAcceptValidatorForBase("page3-star"),
    //           onDrop: createOnDropTableCell(9),
    //           enabled: true,
    //           placedItemDraggable: true,
    //           placedItemTransferable: true,
    //           clearPlacementOnDropOutside: true,
    //         },
    //         {
    //           rowIndex: 1,
    //           colIndex: 1,
    //           droppableId: "page3-table-R2C2",
    //           maxItems: 1,
    //           acceptValidator: getAcceptValidatorForBase("page3-star"),
    //           onDrop: onDropTableCell,
    //           enabled: false,
    //           placedItemDraggable: true,
    //           placedItemTransferable: false,
    //           clearPlacementOnDropOutside: true,
    //         },
    //         {
    //           rowIndex: 2,
    //           colIndex: 1,
    //           droppableId: "page3-table-R3C2",
    //           maxItems: 1,
    //           acceptValidator: getAcceptValidatorForBase("page3-star"),
    //           onDrop: onDropTableCell,
    //           enabled: false,
    //           placedItemDraggable: true,
    //           placedItemTransferable: true,
    //           clearPlacementOnDropOutside: false,
    //         },
    //         {
    //           rowIndex: 3,
    //           colIndex: 1,
    //           droppableId: "page3-table-R4C2",
    //           maxItems: 1,
    //           acceptValidator: getAcceptValidatorForBase("page3-star"),
    //           onDrop: onDropTableCell,
    //           enabled: false,
    //           placedItemDraggable: true,
    //           placedItemTransferable: true,
    //           clearPlacementOnDropOutside: false,
    //         },
    //       ],
    //       dropCallbacks: {
    //         expectedPlacementCount: 1,
    //         onAddSuccess: {
    //           componentId: "page3-feedback-textbox",
    //           callback: (...args) => {
    //             if (typeof window !== "undefined" && window.playCarClickSound) {
    //               window.playCarClickSound("correct");
    //             }
    //             createFeedbackCallback("page3-feedback-textbox")(...args);
    //           },
    //           text: getI18nText("feedback.correct"),
    //           mode: "correct",
    //           getText: (droppableId) => {
    //             if (droppableId !== "page3-table-R1C2")
    //               return getI18nText("feedback.correct");
    //             const tableId = "page3-favorite-fruits-table";
    //             const queries =
    //               typeof window !== "undefined" &&
    //               window.tableGridDropQueries &&
    //               window.tableGridDropQueries[tableId];
    //             const counts = queries
    //               ? queries.getItemCountsByType(droppableId)
    //               : {};
    //             const grapeCount = counts["page3-star"] || 0;
    //             const grapeWord =
    //               grapeCount === 1
    //                 ? getI18nText("common.fruits.grape")
    //                 : getI18nText("common.fruits.grapes");
    //             return getI18nText("feedback.placedStar", null, {
    //               num: grapeCount,
    //               fruit: grapeWord,
    //             });
    //           },
    //         },
    //         onAddAllSuccess: {
    //           componentId: "page3-feedback-textbox",
    //           callback: createFeedbackCallback("page3-feedback-textbox"),
    //           text: getI18nText("feedback.allCorrect"),
    //           mode: "correct",

    //           callback: () => {
    //             const enableNextEvent = new CustomEvent("quizCompleted", {
    //               detail: {
    //                 componentType: "TableGridComponent",
    //                 pageNumber: window.getCurrentPage?.() || null,
    //               },
    //             });
    //             window.dispatchEvent(enableNextEvent);
    //           },
    //         },
    //         onRemove: {
    //           componentId: "page3-feedback-textbox",
    //           callback: createFeedbackCallback("page3-feedback-textbox"),
    //           text: getI18nText("feedback.itemRemoved"),
    //           mode: "normal",
    //         },
    //         onIncorrectDropInCell: {
    //           componentId: "page3-feedback-textbox",
    //           callback: createFeedbackCallback("page3-feedback-textbox"),
    //           text: getI18nText("feedback.tryAgain"),
    //           mode: "incorrect",
    //         },
    //         onIncorrectDropOutside: {
    //           componentId: "page3-feedback-textbox",
    //           callback: createFeedbackCallback("page3-feedback-textbox"),
    //           text: getI18nText("feedback.dropInsideCell"),
    //           mode: "incorrect",
    //         },
    //       },
    //       placedContentByDraggableId: {
    //         "page3-star": { imageSrc: "assets/star.png" },
    //       },
    //       placedItemDraggable: true,
    //       equalRowHeights: true,
    //       borderColor: "transparent",
    //       borderWidth: "2gc",
    //       borderRadius: "8gc",
    //       cellBorderRadius: "12gc",
    //       rowGap: "4gc",
    //       columnGap: "4gc",
    //       tableBorder: false,
    //       tableBorderColor: "#0762a4b9",
    //       tableBorderWidth: "2gc",
    //       tableBorderRadius: "8gc",
    //       tableBackground: "#0a1f2e",
    //       padding: "12gc",
    //     },
    //   },
    //   {
    //     id: "page3-star-legend-text",
    //     name: "page3-star-legend-text",
    //     type: "custom",
    //     coordinates: [40, 665, 950, 795],
    //     zIndex: 60,
    //     props: {
    //       componentType: "StarLegendDraggableComponent",
    //       beforeText: getI18nText("pages.page3.starLegendBefore"),
    //       afterText: getI18nText("pages.page3.starLegendAfter"),
    //       draggableId: "page3-star",
    //       spawnCount: 0,
    //       imageSrc: "assets/star.png",
    //       imageAlt: getI18nText("common.starAlt"),
    //       isDisabled: false,
    //       starSizeEm: 2.85,
    //       backgroundColor: "",
    //       border: "none",
    //       borderRadius: "15gc",
    //       textColor: "#ffff",
    //       fontSize: "35gc",
    //       padding: "0gc",
    //       textAlign: "left",
    //     },
    //   },
    //   //fruit plate background
    //   {
    //     id: "page3-fruit-plate-background",
    //     name: "page3-fruit-plate-background",
    //     type: "custom",
    //     coordinates: [955, 90, 1590, 800], // Same coordinates as question text box
    //     zIndex: 49, // Behind the text box
    //     props: {
    //       componentType: "TeacherNoteComponent",
    //       text: "", // Empty text, just for background
    //       backgroundColor: "#052642a6", // 40% opacity black
    //       border: "3px solid #053865",
    //       borderRadius: "15gc",
    //       textColor: "orange",
    //       fontSize: "43gc",
    //       padding: "0gc",
    //       allowHTML: true,
    //     },
    //   },
    //   //let's record number text
    //   {
    //     id: "page-2-let-record-number-text",
    //     name: "page-2-let-record-number-text",
    //     type: "custom",
    //     coordinates: [955, 90, 1590, 350], // Same coordinates as question text box
    //     zIndex: 49, // Behind the text box
    //     props: {
    //       componentType: "TeacherNoteComponent",
    //       text: getI18nText("pages.page3.letRecordNumberText"), // Empty text, just for background
    //       backgroundColor: "", // 40% opacity black
    //       border: "none",
    //       borderRadius: "13gc",
    //       textColor: "#ffff",
    //       fontSize: "36gc",
    //       padding: "0gc",
    //       textAlign: "center",
    //       allowHTML: true,
    //     },
    //   },
    //   //fruit plate image
    //   {
    //     id: "page3-fruit-plate-image",
    //     name: "page3-fruit-plate-image",
    //     type: "custom",
    //     coordinates: [960, 350, 1585, 750], // Bottom of question background, left position (equal spacing)
    //     zIndex: 999,
    //     props: {
    //       componentType: "ImageStackComponent",
    //       id: "page3-fruit-plate-image",
    //       elementName: "page3-fruit-plate-image",
    //       currentPage: 13,
    //       coordinates: [200, 260, 500, 660],
    //       zIndex: 56,
    //       images: [
    //         {
    //           src: "assets/fruitPlate.png",
    //           blink: false,
    //           glow: false,
    //           hidden: false,
    //           opacity: 1, // Grayed out
    //         },
    //         {
    //           src: "assets/fruitPlateOrange.png",
    //           blink: false,
    //           glow: false,
    //           hidden: true,
    //           opacity: 1, // Grayed out,
    //           // layerCoordinates: [50, 440, 400, 800]  // Image 3
    //         },
    //       ],

    //       hideImageOnQuizComplete: false, // Hide first image
    //       showImageOnQuizComplete: [0],
    //     },
    //   },
    //   // // Feedback Textbox Component
    //   // {
    //   //   id: "page3-feedback-textbox",
    //   //   name: "page3-feedback-textbox-unique",
    //   //   type: "custom",
    //   //   coordinates: [15, 640, 890, 800], // Position below the table and options container
    //   //   zIndex: 66, // Above fill blanks component
    //   //   props: {
    //   //     componentType: "FeedbackTextboxComponent",
    //   //     id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
    //   //     text: "", // Empty text by default - will be updated by FillBlanksComponent
    //   //     mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

    //   //     fontSize: "34gc",
    //   //     borderRadius: "12gc",
    //   //     textAlign: "center",
    //   //     display: "flex",
    //   //     alignItems: "center",
    //   //     justifyContent: "center",
    //   //     padding: "15gc",
    //   //     boxSizing: "border-box",
    //   //   },
    //   // },
    //   // Instruction Text
    //   {
    //     id: "page3-instruction-text",
    //     name: "page3-instruction-text",
    //     type: "custom",
    //     coordinates: [155, 820, 1445, 895], // Footer bar at bottom
    //     zIndex: 55,
    //     props: {
    //       id: "page3-instruction-text",
    //       componentType: "SectionHeaderComponent",
    //       text: getI18nText("pages.page3.footerInstruction"),
    //       // backgroundColor: 'rgba(66, 73, 88, 0.9)',
    //       borderRadius: "0gc",
    //       textColor: "#ffffff",
    //       fontSize: "36gc",
    //       padding: "15gc",
    //       fontWeight: "normal",
    //       underlineFirstWord: false,
    //       textAlign: "center",
    //     },
    //   },

    //   // Tap Animation GIF
    //   {
    //     id: "page3-tap-animation",
    //     name: "tap-animation",
    //     type: "custom",
    //     coordinates: [1450, 840, 1500, 890],
    //     zIndex: "999",
    //     props: {
    //       componentType: "TapGifComponent",
    //       imageSrc: "assets/tap.gif",
    //       imageAlt: getI18nText("common.tapAlt"),
    //       initialVisible: false,
    //     },
    //   },

    //   // Optimized Next button - Three Layer Structure
    //   {
    //     id: "page3-next-button",
    //     name: "next-button",
    //     type: "button",
    //     coordinates: [1450, 820, 1595, 895],
    //     zIndex: "var(--z-button)",
    //     props: {
    //       initialEnabled: false, // Start disabled until quiz is completed
    //       enableOnEvent:'quizCompleted', // Listen for quizCompleted event to enable
    //       enableOnEventFilter:{pageNumber: 3}, // Only enable if quizCompleted event is for this page
    //       get text() {
    //         const pageNumber = extractPageNumberFromId("page3-next-button");
    //         return getNextButtonText(pageNumber);
    //       },
    //       onClick: () => {
    //         if (typeof window !== "undefined" && window.playCarClickSound) {
    //           window.playCarClickSound("next");
    //         }
    //         const pageNumber = extractPageNumberFromId("page3-next-button");
    //         const nav = getPageNavigation(pageNumber);
    //         if (nav && nav.next !== null && typeof window !== "undefined") {
    //           if (window.changePageAndNotify) {
    //             window.changePageAndNotify(nav.next);
    //           } else if (window.navigateToPage) {
    //             window.navigateToPage(nav.next);
    //           } else {
    //             window.dispatchEvent(
    //               new CustomEvent("pageChanged", {
    //                 detail: { page: nav.next },
    //               }),
    //             );
    //             console.log(
    //               "📄 [Next Button]",
    //               getI18nText("messages.navNextDispatched"),
    //             );
    //           }
    //         } else if (nav && nav.next === null) {
    //           // On last page, "Start Over" functionality
    //           console.log(
    //             "🔄 [Next Button]",
    //             getI18nText("messages.lastPageStartingOver"),
    //           );
    //           if (window.advanceToNextQuestion) {
    //             window.advanceToNextQuestion();
    //           } else if (window.changePageAndNotify) {
    //             window.changePageAndNotify(1);
    //           }
    //         }
    //       },
    //     },
    //   },

    //   // Previous button - Three Layer Structure
    //   {
    //     id: "page3-previous-button",
    //     name: "previous-button",
    //     type: "button",
    //     coordinates: [5, 820, 150, 895],
    //     zIndex: "var(--z-button)",
    //     props: {
    //       get text() {
    //         return getI18nText("buttons.previous");
    //       },
    //       get disabled() {
    //         const pageNumber = extractPageNumberFromId("page3-previous-button");
    //         return isPrevButtonDisabled(pageNumber);
    //       },
    //       onClick: () => {
    //         const pageNumber = extractPageNumberFromId("page3-previous-button");
    //         const nav = getPageNavigation(pageNumber);
    //         if (nav && nav.prev !== null && typeof window !== "undefined") {
    //           if (window.playCarClickSound) {
    //             window.playCarClickSound("previous");
    //           }
    //           if (window.changePageAndNotify) {
    //             window.changePageAndNotify(nav.prev);
    //           } else if (window.navigateToPage) {
    //             window.navigateToPage(nav.prev);
    //           } else {
    //             window.dispatchEvent(
    //               new CustomEvent("pageChanged", {
    //                 detail: { page: nav.prev },
    //               }),
    //             );
    //             console.log(
    //               "📄 [Previous Button]",
    //               getI18nText("messages.navPreviousDispatched"),
    //             );
    //           }
    //         }
    //       },
    //     },
    //   },
    // ],
    4: [
      //header text
      {
        id: "page4-headertext",
        name: "page4-headertext",
        type: "custom",
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page4-orange-image",
        name: "page4-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page4-apple-image",
        name: "page4-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page4-banana-image",
        name: "page4-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page4-mango-image",
        name: "page4-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page4-favorite-fruits-table",
        name: "page4-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page4-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page4-table-R1C2",
              maxItems: 8,
              placementDirection: "horizontal",
              acceptValidator: getAcceptValidatorForBase("page4-star"),
              onDrop: createOnDropTableCell(10),
              onDropRejected: (_draggableId, targetDroppableId) => {
                window.page4LastRejectedDroppableId = targetDroppableId;
              },
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page4-table-R2C2",
              maxItems: 1,
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page4-table-R3C2",
              maxItems: 1,
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page4-table-R4C2",
              maxItems: 1,
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode) => {
                window.page4CheckDisabled = false; // Enable check button on first drop
                window.forceAppUpdate?.(); // Force re-render to update button state
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page4-feedback-textbox")(text, mode);
              },
            },
            onAddAllSuccess: {
              componentId: "page4-feedback-textbox",
              callback: createFeedbackCallback("page4-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode) => {
                const queries =
                  window.tableGridDropQueries?.["page4-favorite-fruits-table"];
                const items = queries?.getItemsInCell("page4-table-R1C2") || [];
                // If this was the last item, disable the check button
                if (items.length <= 1) {
                  window.page4CheckDisabled = true;
                  window.forceAppUpdate?.(); // Force re-render to update button state
                }
                createFeedbackCallback("page4-feedback-textbox")(text, mode);
              },
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode) => {
                const rejectedDroppableId = window.page4LastRejectedDroppableId;
                if (rejectedDroppableId === "page4-table-R1C2") {
                  const queries =
                    window.tableGridDropQueries?.[
                      "page4-favorite-fruits-table"
                    ];
                  const items =
                    queries?.getItemsInCell("page4-table-R1C2") || [];
                  if (items.length >= 8) {
                    shakeTableRowForDroppable(
                      "page4-favorite-fruits-table",
                      "page4-table-R1C2",
                    );
                    window.page4LastRejectedDroppableId = null;
                    return; // No feedback when exceeding maxItems
                  }
                }
                window.page4LastRejectedDroppableId = null;
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page4-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInOrangeRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page4-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page4-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page4-star": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page4-star-legend-text",
        name: "page4-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page4.starLegendBefore"),
          afterText: getI18nText("pages.page4.starLegendAfter"),
          draggableId: "page4-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          get isDisabled() {
            return window.page4LegendDisabled || false;
          },
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //fruit plate image
      {
        id: "page4-fruit-plate-image",
        name: "page4-fruit-plate-image",
        type: "custom",
        coordinates: [960, 300, 1585, 650], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-fruit-plate-image",
          elementName: "page4-fruit-plate-image",
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/fruitPlate.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: "assets/fruitPlateOrange.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3
            },
          ],

          hideImageOnQuizComplete: true, // Hide first image
          showImageOnQuizComplete: [1],
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page4-check-button",
        name: "check-button",
        type: "button",
        coordinates: [1180, 680, 1380, 780],
        zIndex: "var(--z-button)",
        props: (() => {
          const page4CheckConfig = {
            correctAnswer: 4,
            checkCellId: "page4-table-R1C2",
            feedbackComponentId: "page4-feedback-textbox",
            tableId: "page4-favorite-fruits-table",
            pageNumber: 4,
            fruit: getI18nText("common.fruits.oranges"),
          };
          return {
            text: getI18nText("buttons.check"),
            get disabled() {
              return window.page4CheckDisabled !== false;
            },
            ...page4CheckConfig,
            onClick: () => {
              // 0. Guard: Block interaction if disabled
              if (window.page4CheckDisabled === true) return;

              if (typeof window !== "undefined" && window.playCarClickSound) {
                window.playCarClickSound("next");
              }
              // 1. First click logic - reveal images
              if (window.page4FirstClick) {
                window.dispatchEvent(
                  new CustomEvent("imageChange", {
                    detail: { isCorrect: false }, // Force reveal of index 1
                  }),
                );
                window.page4FirstClick = false;
              }

              // 2. Perform validation logic
              const queries =
                window.tableGridDropQueries?.["page4-favorite-fruits-table"];
              const items = queries?.getItemsInCell("page4-table-R1C2") || [];
              const count = items.length;
              const feedbackCallback = createFeedbackCallback(
                "page4-feedback-textbox",
              );

              // Determine which instruction to show and dispatch event for SectionHeaderComponent
              let instructionType = "footerInstruction";
              if (count === page4CheckConfig.correctAnswer) {
                window.playCarClickSound?.("correct");
                feedbackCallback(
                  getI18nText("feedback.thatIsCorrect"),
                  "correct",
                );

                instructionType = "instructionAfterQuiz";

                // Disable button and legends permanently on success
                window.page4CheckDisabled = true;
                window.page4LegendDisabled = true;
                window.forceAppUpdate?.(); // Force re-render to lock UI

                // Mark quiz as completed
                window.dispatchEvent(
                  new CustomEvent("quizCompleted", {
                    detail: {
                      componentType: "TableGridComponent",
                      pageNumber: 4,
                    },
                  }),
                );
              } else {
                window.playCarClickSound?.("wrong");
                if (count > page4CheckConfig.correctAnswer) {
                  feedbackCallback(
                    getI18nText("feedback.manyStars", null, {
                      fruit: page4CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                  instructionType = "footerInstructionBeforeQuiz";
                } else {
                  feedbackCallback(
                    getI18nText("feedback.notEnough", null, {
                      fruit: page4CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                  instructionType = "footerInstruction";
                }
              }

              // Dispatch a custom event for SectionHeaderComponent to update instruction text
              window.dispatchEvent(
                new CustomEvent("page4InstructionChange", {
                  detail: { instructionType }
                })
              );
            },
          };
        })(),
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)

      // // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox-unique",
        type: "custom",
        coordinates: [960, 90, 1585, 280], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

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
          text: getI18nText("pages.page4.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 4 },

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
                  getI18nText("messages.navNextDispatched"),
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
                  getI18nText("messages.navPreviousDispatched"),
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
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page5-orange-image",
        name: "page5-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page5-apple-image",
        name: "page5-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page5-banana-image",
        name: "page5-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page5-mango-image",
        name: "page5-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page5-favorite-fruits-table",
        name: "page5-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page5-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page5-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page5-star-initial-1",
                "page5-star-initial-2",
                "page5-star-initial-3",
                "page5-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page5-table-R2C2",
              maxItems: 8,
              acceptValidator: getAcceptValidatorForBase("page5-star"),
              onDrop: createOnDropTableCell(10),
              onDropRejected: (_draggableId, targetDroppableId) => {
                window.page5LastRejectedDroppableId = targetDroppableId;
              },
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page5-table-R3C2",
              maxItems: 1,
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page5-table-R4C2",
              maxItems: 1,
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode) => {
                window.page5CheckDisabled = false; // Enable check button on first drop
                window.forceAppUpdate?.(); // Force re-render to update button state
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page5-feedback-textbox")(text, mode);
              },
            },
            onAddAllSuccess: {
              componentId: "page5-feedback-textbox",
              callback: createFeedbackCallback("page5-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode) => {
                const queries =
                  window.tableGridDropQueries?.["page5-favorite-fruits-table"];
                const items = queries?.getItemsInCell("page5-table-R2C2") || [];
                // Disable when target cell has no items left
                if (items.length <= 0) {
                  window.page5CheckDisabled = true;
                  window.forceAppUpdate?.(); // Force re-render to update button state
                }
                createFeedbackCallback("page5-feedback-textbox")(text, mode);
              },
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode) => {
                const rejectedDroppableId = window.page5LastRejectedDroppableId;
                if (rejectedDroppableId === "page5-table-R2C2") {
                  const queries =
                    window.tableGridDropQueries?.[
                      "page5-favorite-fruits-table"
                    ];
                  const items =
                    queries?.getItemsInCell("page5-table-R2C2") || [];
                  if (items.length >= 8) {
                    shakeTableRowForDroppable(
                      "page5-favorite-fruits-table",
                      "page5-table-R2C2",
                    );
                    window.page5LastRejectedDroppableId = null;
                    return; // No feedback when exceeding maxItems
                  }
                }
                window.page5LastRejectedDroppableId = null;
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page5-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInAppleRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page5-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page5-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page5-star": { imageSrc: "assets/star.png" },
            "page5-star-initial-1": { imageSrc: "assets/star.png" },
            "page5-star-initial-2": { imageSrc: "assets/star.png" },
            "page5-star-initial-3": { imageSrc: "assets/star.png" },
            "page5-star-initial-4": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page5-star-legend-text",
        name: "page5-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page5.starLegendBefore"),
          afterText: getI18nText("pages.page5.starLegendAfter"),
          draggableId: "page5-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          get isDisabled() {
            return window.page5LegendDisabled || false;
          },
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //fruit plate image
      {
        id: "page5-fruit-plate-image",
        name: "page5-fruit-plate-image",
        type: "custom",
        coordinates: [960, 300, 1585, 650], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page5-fruit-plate-image",
          elementName: "page5-fruit-plate-image",
          currentPage: 14,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/fruitPlate.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
            {
              src: "assets/fruitPlateApple.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
          ],
          hideImageOnQuizComplete: true,
          showImageOnQuizComplete: [1],
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page5-check-button",
        name: "check-button",
        type: "button",
        coordinates: [1180, 680, 1380, 780],
        zIndex: "var(--z-button)",
        props: (() => {
          const page5CheckConfig = {
            correctAnswer: 3,
            checkCellId: "page5-table-R2C2",
            feedbackComponentId: "page5-feedback-textbox",
            tableId: "page5-favorite-fruits-table",
            pageNumber: 5,
            fruit: getI18nText("common.fruits.apples"),
          };
          return {
            text: getI18nText("buttons.check"),
            get disabled() {
              return window.page5CheckDisabled !== false;
            },
            ...page5CheckConfig,
            onClick: () => {
              // 0. Guard: Block interaction if disabled
              if (window.page5CheckDisabled === true) return;

              if (typeof window !== "undefined" && window.playCarClickSound) {
                window.playCarClickSound("next");
              }
              // 1. First click logic - reveal images
              if (window.page5FirstClick) {
                window.dispatchEvent(
                  new CustomEvent("imageChange", {
                    detail: { isCorrect: false }, // Force reveal of index 1
                  }),
                );
                window.page5FirstClick = false;
              }

              // 2. Perform validation logic
              const queries =
                window.tableGridDropQueries?.["page5-favorite-fruits-table"];
              const items = queries?.getItemsInCell("page5-table-R2C2") || [];
              const count = items.length;
              const feedbackCallback = createFeedbackCallback(
                "page5-feedback-textbox",
              );

              // Dispatch custom event for instruction text update
              let instructionType = "default";
              if (count === page5CheckConfig.correctAnswer) {
                instructionType = "correct";
              } else if (count > page5CheckConfig.correctAnswer) {
                instructionType = "tooMany";
              } else if (count < page5CheckConfig.correctAnswer) {
                instructionType = "notEnough";
              }
              window.dispatchEvent(
                new CustomEvent("page5InstructionChange", {
                  detail: { instructionType },
                })
              );

              if (count === page5CheckConfig.correctAnswer) {
                window.playCarClickSound?.("correct");
                feedbackCallback(
                  getI18nText("feedback.thatIsCorrect"),
                  "correct",
                );

                // Disable button and legends permanently on success
                window.page5CheckDisabled = true;
                window.page5LegendDisabled = true;
                window.forceAppUpdate?.(); // Force re-render to lock UI

                // Mark quiz as completed
                window.dispatchEvent(
                  new CustomEvent("quizCompleted", {
                    detail: {
                      componentType: "TableGridComponent",
                      pageNumber: 5,
                    },
                  }),
                );
              } else {
                window.playCarClickSound?.("wrong");
                if (count > page5CheckConfig.correctAnswer) {
                  feedbackCallback(
                    getI18nText("feedback.manyStars", null, {
                      fruit: page5CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                } else {
                  feedbackCallback(
                    getI18nText("feedback.notEnough", null, {
                      fruit: page5CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                }
              }
            },
          };
        })(),
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)

      // // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [960, 90, 1585, 280], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page5-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

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
          text: getI18nText("pages.page5.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
                  getI18nText("messages.navNextDispatched"),
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
                  getI18nText("messages.navPreviousDispatched"),
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
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page6-orange-image",
        name: "page6-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page6-apple-image",
        name: "page6-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page6-banana-image",
        name: "page6-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page6-mango-image",
        name: "page6-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page6-favorite-fruits-table",
        name: "page6-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page6-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page6-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page6-star-initial-1",
                "page6-star-initial-2",
                "page6-star-initial-3",
                "page6-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page6-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page6-star-initial-1",
                "page6-star-initial-2",
                "page6-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page6-table-R3C2",
              maxItems: 8,
              acceptValidator: getAcceptValidatorForBase("page6-star"),
              onDrop: createOnDropTableCell(10),
              onDropRejected: (_draggableId, targetDroppableId) => {
                window.page6LastRejectedDroppableId = targetDroppableId;
              },
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page6-table-R4C2",
              maxItems: 1,
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: false,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode) => {
                window.page6CheckDisabled = false; // Enable check button on first drop
                window.forceAppUpdate?.(); // Force re-render to update button state
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page6-feedback-textbox")(text, mode);
              },
            },
            onAddAllSuccess: {
              componentId: "page6-feedback-textbox",
              callback: createFeedbackCallback("page6-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode) => {
                const queries =
                  window.tableGridDropQueries?.["page6-favorite-fruits-table"];
                const items = queries?.getItemsInCell("page6-table-R3C2") || [];
                // Disable when target cell has no items left
                if (items.length <= 0) {
                  window.page6CheckDisabled = true;
                  window.forceAppUpdate?.(); // Force re-render to update button state
                }
                createFeedbackCallback("page6-feedback-textbox")(text, mode);
              },
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode) => {
                const rejectedDroppableId = window.page6LastRejectedDroppableId;
                if (rejectedDroppableId === "page6-table-R3C2") {
                  const queries =
                    window.tableGridDropQueries?.[
                      "page6-favorite-fruits-table"
                    ];
                  const items =
                    queries?.getItemsInCell("page6-table-R3C2") || [];
                  if (items.length >= 8) {
                    shakeTableRowForDroppable(
                      "page6-favorite-fruits-table",
                      "page6-table-R3C2",
                    );
                    window.page6LastRejectedDroppableId = null;
                    return; // No feedback when exceeding maxItems
                  }
                }
                window.page6LastRejectedDroppableId = null;
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page6-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInBananaRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page6-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page6-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page6-star": { imageSrc: "assets/star.png" },
            "page6-star-initial-1": { imageSrc: "assets/star.png" },
            "page6-star-initial-2": { imageSrc: "assets/star.png" },
            "page6-star-initial-3": { imageSrc: "assets/star.png" },
            "page6-star-initial-4": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page6-star-legend-text",
        name: "page6-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page6.starLegendBefore"),
          afterText: getI18nText("pages.page6.starLegendAfter"),
          draggableId: "page6-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          get isDisabled() {
            return window.page6LegendDisabled || false;
          },
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //fruit plate image
      {
        id: "page6-fruit-plate-image",
        name: "page6-fruit-plate-image",
        type: "custom",
        coordinates: [960, 300, 1585, 650], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page6-fruit-plate-image",
          elementName: "page6-fruit-plate-image",
          currentPage: 15,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/fruitPlate.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
            {
              src: "assets/fruitPlateBanana.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
          ],
          hideImageOnQuizComplete: true,
          showImageOnQuizComplete: [1],
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page6-check-button",
        name: "check-button",
        type: "button",
        coordinates: [1180, 680, 1380, 780],
        zIndex: "var(--z-button)",
        props: (() => {
          const page6CheckConfig = {
            correctAnswer: 8,
            checkCellId: "page6-table-R3C2",
            feedbackComponentId: "page6-feedback-textbox",
            tableId: "page6-favorite-fruits-table",
            pageNumber: 6,
            fruit: getI18nText("common.fruits.bananas"),
          };
          return {
            text: getI18nText("buttons.check"),
            get disabled() {
              return window.page6CheckDisabled !== false;
            },
            ...page6CheckConfig,
            onClick: () => {
              // 0. Guard: Block interaction if disabled
              if (window.page6CheckDisabled === true) return;

              if (typeof window !== "undefined" && window.playCarClickSound) {
                window.playCarClickSound("next");
              }
              // 1. First click logic - reveal images
              if (window.page6FirstClick) {
                window.dispatchEvent(
                  new CustomEvent("imageChange", {
                    detail: { isCorrect: false }, // Force reveal of index 1
                  }),
                );
                window.page6FirstClick = false;
              }

              // 2. Perform validation logic
              const queries =
                window.tableGridDropQueries?.["page6-favorite-fruits-table"];
              const items = queries?.getItemsInCell("page6-table-R3C2") || [];
              const count = items.length;
              const feedbackCallback = createFeedbackCallback(
                "page6-feedback-textbox",
              );

              // Dispatch custom event for instruction text update
              let instructionType = "default";
              if (count === page6CheckConfig.correctAnswer) {
                instructionType = "correct";
              } else if (count > page6CheckConfig.correctAnswer) {
                instructionType = "tooMany";
              } else if (count < page6CheckConfig.correctAnswer) {
                instructionType = "notEnough";
              }
              window.dispatchEvent(
                new CustomEvent("page6InstructionChange", {
                  detail: { instructionType },
                })
              );

              if (count === page6CheckConfig.correctAnswer) {
                window.playCarClickSound?.("correct");
                feedbackCallback(
                  getI18nText("feedback.thatIsCorrect"),
                  "correct",
                );

                // Disable button and legends permanently on success
                window.page6CheckDisabled = true;
                window.page6LegendDisabled = true;
                window.forceAppUpdate?.(); // Force re-render to lock UI

                // Mark quiz as completed
                window.dispatchEvent(
                  new CustomEvent("quizCompleted", {
                    detail: {
                      componentType: "TableGridComponent",
                      pageNumber: 6,
                    },
                  }),
                );
              } else {
                window.playCarClickSound?.("wrong");
                if (count > page6CheckConfig.correctAnswer) {
                  feedbackCallback(
                    getI18nText("feedback.manyStars", null, {
                      fruit: page6CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                } else {
                  feedbackCallback(
                    getI18nText("feedback.notEnough", null, {
                      fruit: page6CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                }
              }
            },
          };
        })(),
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)

      // // Feedback Textbox Component
      {
        id: "page6-feedback-textbox",
        name: "page6-feedback-textbox-unique",
        type: "custom",
        coordinates: [960, 90, 1585, 280], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page6-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

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
          text: getI18nText("pages.page6.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 6 },

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
                  getI18nText("messages.navNextDispatched"),
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    7: [
      //header text
      {
        id: "page7-headertext",
        name: "page7-headertext",
        type: "custom",
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page7-orange-image",
        name: "page7-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page7-apple-image",
        name: "page7-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page7-banana-image",
        name: "page7-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page7-mango-image",
        name: "page7-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page7-favorite-fruits-table",
        name: "page7-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page7-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page7-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page7-star-initial-1",
                "page7-star-initial-2",
                "page7-star-initial-3",
                "page7-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page7-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page7-star-initial-1",
                "page7-star-initial-2",
                "page7-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page7-table-R3C2",
              maxItems: 8,
              initialPlacementIds: [
                "page7-star-initial-1",
                "page7-star-initial-2",
                "page7-star-initial-3",
                "page7-star-initial-4",
                "page7-star-initial-5",
                "page7-star-initial-6",
                "page7-star-initial-7",
                "page7-star-initial-8",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable:false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: false,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page7-table-R4C2",
              maxItems: 8,
              acceptValidator: getAcceptValidatorForBase("page7-star"),
              onDrop: createOnDropTableCell(10),
              onDropRejected: (_draggableId, targetDroppableId) => {
                window.page7LastRejectedDroppableId = targetDroppableId;
              },
              placedItemDraggable: true,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page7-feedback-textbox",
              callback: (text, mode) => {
                window.page7CheckDisabled = false; // Enable check button on first drop
                window.forceAppUpdate?.(); // Force re-render to update button state
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page7-feedback-textbox")(text, mode);
              },
            },
            onAddAllSuccess: {
              componentId: "page7-feedback-textbox",
              callback: createFeedbackCallback("page7-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page7-feedback-textbox",
              callback: (text, mode) => {
                const queries =
                  window.tableGridDropQueries?.["page7-favorite-fruits-table"];
                const items = queries?.getItemsInCell("page7-table-R4C2") || [];
                // Disable when target cell has no items left
                if (items.length <= 0) {
                  window.page7CheckDisabled = true;
                  window.forceAppUpdate?.(); // Force re-render to update button state
                }
                createFeedbackCallback("page7-feedback-textbox")(text, mode);
              },
              text: "",
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page7-feedback-textbox",
              callback: (text, mode) => {
                const rejectedDroppableId = window.page7LastRejectedDroppableId;
                if (rejectedDroppableId === "page7-table-R4C2") {
                  const queries =
                    window.tableGridDropQueries?.[
                      "page7-favorite-fruits-table"
                    ];
                  const items =
                    queries?.getItemsInCell("page7-table-R4C2") || [];
                  if (items.length >= 8) {
                    shakeTableRowForDroppable(
                      "page7-favorite-fruits-table",
                      "page7-table-R4C2",
                    );
                    window.page7LastRejectedDroppableId = null;
                    return; // No feedback when exceeding maxItems
                  }
                }
                window.page7LastRejectedDroppableId = null;
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page7-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInMangoRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page7-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page7-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page7-star": { imageSrc: "assets/star.png" },
            "page7-star-initial-1": { imageSrc: "assets/star.png" },
            "page7-star-initial-2": { imageSrc: "assets/star.png" },
            "page7-star-initial-3": { imageSrc: "assets/star.png" },
            "page7-star-initial-4": { imageSrc: "assets/star.png" },
            "page7-star-initial-5": { imageSrc: "assets/star.png" },
            "page7-star-initial-6": { imageSrc: "assets/star.png" },
            "page7-star-initial-7": { imageSrc: "assets/star.png" },
            "page7-star-initial-8": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page7-star-legend-text",
        name: "page7-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page7.starLegendBefore"),
          afterText: getI18nText("pages.page7.starLegendAfter"),
          draggableId: "page7-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          get isDisabled() {
            return window.page7LegendDisabled || false;
          },
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //fruit plate image
      {
        id: "page7-fruit-plate-image",
        name: "page7-fruit-plate-image",
        type: "custom",
        coordinates: [960, 300, 1585, 650], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page7-fruit-plate-image",
          elementName: "page7-fruit-plate-image",
          currentPage: 16,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/fruitPlate.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1,
            },
            {
              src: "assets/fruitPlateMango.png",
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1,
            },
          ],
          hideImageOnQuizComplete: true,
          showImageOnQuizComplete: [1],
        },
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: "page7-check-button",
        name: "check-button",
        type: "button",
        coordinates: [1180, 680, 1380, 780],
        zIndex: "var(--z-button)",
        props: (() => {
          const page7CheckConfig = {
            correctAnswer: 1,
            checkCellId: "page7-table-R4C2",
            feedbackComponentId: "page7-feedback-textbox",
            tableId: "page7-favorite-fruits-table",
            pageNumber: 7,
            fruit: getI18nText("common.fruits.mangoes"),
          };
          return {
            text: getI18nText("buttons.check"),
            get disabled() {
              return window.page7CheckDisabled !== false;
            },
            ...page7CheckConfig,
            onClick: () => {
              // 0. Guard: Block interaction if disabled
              if (window.page7CheckDisabled === true) return;

              if (typeof window !== "undefined" && window.playCarClickSound) {
                window.playCarClickSound("next");
              }
              // 1. First click logic - reveal images
              if (window.page7FirstClick) {
                window.dispatchEvent(
                  new CustomEvent("imageChange", {
                    detail: { isCorrect: false }, // Force reveal of index 1
                  }),
                );
                window.page7FirstClick = false;
              }

              // 2. Perform validation logic
              const queries =
                window.tableGridDropQueries?.["page7-favorite-fruits-table"];
              const items = queries?.getItemsInCell("page7-table-R4C2") || [];
              const count = items.length;
              const feedbackCallback = createFeedbackCallback(
                "page7-feedback-textbox",
              );

              // Dispatch custom event for instruction text update
              let instructionType = "default";
              if (count === page7CheckConfig.correctAnswer) {
                instructionType = "correct";
              } else if (count > page7CheckConfig.correctAnswer) {
                instructionType = "tooMany";
              } else if (count < page7CheckConfig.correctAnswer) {
                instructionType = "notEnough";
              }
              window.dispatchEvent(
                new CustomEvent("page7InstructionChange", {
                  detail: { instructionType },
                })
              );

              if (count === page7CheckConfig.correctAnswer) {
                window.playCarClickSound?.("correct");
                feedbackCallback(
                  getI18nText("feedback.thatIsCorrect"),
                  "correct",
                );

                // Disable button and legends permanently on success
                window.page7CheckDisabled = true;
                window.page7LegendDisabled = true;
                window.forceAppUpdate?.(); // Force re-render to lock UI

                // Mark quiz as completed
                window.dispatchEvent(
                  new CustomEvent("quizCompleted", {
                    detail: {
                      componentType: "TableGridComponent",
                      pageNumber: 7,
                    },
                  }),
                );
              } else {
                window.playCarClickSound?.("wrong");
                if (count > page7CheckConfig.correctAnswer) {
                  feedbackCallback(
                    getI18nText("feedback.manyStars", null, {
                      fruit: page7CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                } else {
                  feedbackCallback(
                    getI18nText("feedback.notEnough", null, {
                      fruit: page7CheckConfig.fruit,
                    }),
                    "incorrect",
                  );
                }
              }
            },
          };
        })(),
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)

      // // Feedback Textbox Component
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox-unique",
        type: "custom",
        coordinates: [960, 90, 1585, 280], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page7-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

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
        id: "page7-instruction-text",
        name: "page7-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page7-instruction-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page7.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
        id: "page7-tap-animation",
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
                  getI18nText("messages.navNextDispatched"),
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    8: [
      //fruit cloud image
      {
        id: "page8-header-text",
        name: "page8-header-text",
        type: "custom",
        coordinates: [10, 5, 1590, 100], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page8.headerText"),
          textColor: "orange",
          fontSize: "50gc",
        },
      },
      //table orange image
      {
        id: "page8-orange-image",
        name: "page8-orange-image",
        type: "container",
        coordinates: [125, 250, 225, 320],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page8-apple-image",
        name: "page8-apple-image",
        type: "container",
        coordinates: [125, 340, 225, 410],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page8-banana-image",
        name: "page8-banana-image",
        type: "container",
        coordinates: [125, 430, 225, 500],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page8-mango-image",
        name: "page8-mango-image",
        type: "container",
        coordinates: [125, 520, 225, 580],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page8-favorite-fruits-table",
        name: "page8-favorite-fruits-table",
        type: "custom",
        coordinates: [50, 150, 800, 700],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page8-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "32gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page8-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page8-star-initial-1",
                "page8-star-initial-2",
                "page8-star-initial-3",
                "page8-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page8-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page8-star-initial-1",
                "page8-star-initial-2",
                "page8-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page8-table-R3C2",
              maxItems: 8,
              initialPlacementIds: [
                "page8-star-initial-1",
                "page8-star-initial-2",
                "page8-star-initial-3",
                "page8-star-initial-4",
                "page8-star-initial-5",
                "page8-star-initial-6",
                "page8-star-initial-7",
                "page8-star-initial-8",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page8-table-R4C2",
              maxItems: 8,
              initialPlacementIds: ["page8-star-initial-1"],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page8-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page8-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.correct"),
              mode: "correct",

              getText: (droppableId) => {
                if (droppableId !== "page8-table-R4C2")
                  return getI18nText("feedback.correct");
                const tableId = "page8-favorite-fruits-table";
                const queries =
                  typeof window !== "undefined" &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];
                const counts = queries
                  ? queries.getItemCountsByType(droppableId)
                  : {};
                const grapeCount = counts["page8-star"] || 0;
                const grapeWord =
                  grapeCount === 1
                    ? getI18nText("common.fruits.mango")
                    : getI18nText("common.fruits.mangoes");
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord,
                });
              },
            },
            onAddAllSuccess: {
              componentId: "page8-feedback-textbox",
              callback: createFeedbackCallback("page8-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page8-feedback-textbox",
              callback: createFeedbackCallback("page8-feedback-textbox"),
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page8-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page8-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInMangoRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page8-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page8-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page8-star": { imageSrc: "assets/star.png" },
            "page8-star-initial-1": { imageSrc: "assets/star.png" },
            "page8-star-initial-2": { imageSrc: "assets/star.png" },
            "page8-star-initial-3": { imageSrc: "assets/star.png" },
            "page8-star-initial-4": { imageSrc: "assets/star.png" },
            "page8-star-initial-5": { imageSrc: "assets/star.png" },
            "page8-star-initial-6": { imageSrc: "assets/star.png" },
            "page8-star-initial-7": { imageSrc: "assets/star.png" },
            "page8-star-initial-8": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: false,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: true,
          tableBorderColor: "orange",
          tableBorderWidth: "5gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page8-star-legend-text",
        name: "page8-star-legend-text",
        type: "custom",
        coordinates: [80, 570, 990, 700],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page8.starLegendBefore"),
          afterText: getI18nText("pages.page8.starLegendAfter"),
          draggableId: "page8-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          isDisabled: true,
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },
      // maintext
      {
        id: "page8-main-text",
        name: "page8-main-text",
        type: "custom",
        coordinates: [800, 210, 1590, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page8.mainText"),
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
        id: "page8-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [750, 750, 800, 850],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page8-next-button",
        name: "next-button",
        type: "button",
        coordinates: [750, 750, 950, 850],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.begin");
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
                  getI18nText("messages.navNextDispatched"),
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
    9: [
      //header text
      {
        id: "page9-headertext",
        name: "page9-headertext",
        type: "custom",
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page9.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page9-orange-image",
        name: "page9-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page9-apple-image",
        name: "page9-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page9-banana-image",
        name: "page9-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page9-mango-image",
        name: "page9-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page9-favorite-fruits-table",
        name: "page9-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page9-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          dimRowsOnQuizClick: [0, 1, 2],
          dimElementIdsOnQuizClick: [
            "page9-orange-image",
            "page9-apple-image",
            "page9-banana-image",
          ],
          dimRowsOnQuizClickOpacity: 0.2,
          dimRowsOnQuizClickQuizId: "page9-quiz",
          numberStarsOnCorrectQuizRows: [3],
          numberStarsOnCorrectQuizId: "page9-quiz",
          starNumberFontSize: "30gc",
          starNumberColor: "#000000",
          starNumberFontWeight: "bold",
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page9-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page9-star-initial-1",
                "page9-star-initial-2",
                "page9-star-initial-3",
                "page9-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page9-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page9-star-initial-1",
                "page9-star-initial-2",
                "page9-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page9-table-R3C2",
              maxItems: 8,
              initialPlacementIds: [
                "page9-star-initial-1",
                "page9-star-initial-2",
                "page9-star-initial-3",
                "page9-star-initial-4",
                "page9-star-initial-5",
                "page9-star-initial-6",
                "page9-star-initial-7",
                "page9-star-initial-8",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page9-table-R4C2",
              maxItems: 8,
              initialPlacementIds: ["page9-star-initial-1"],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page9-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page9-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.correct"),
              mode: "correct",

              getText: (droppableId) => {
                if (droppableId !== "page9-table-R4C2")
                  return getI18nText("feedback.correct");
                const tableId = "page9-favorite-fruits-table";
                const queries =
                  typeof window !== "undefined" &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];
                const counts = queries
                  ? queries.getItemCountsByType(droppableId)
                  : {};
                const grapeCount = counts["page9-star"] || 0;
                const grapeWord =
                  grapeCount === 1
                    ? getI18nText("common.fruits.mango")
                    : getI18nText("common.fruits.mangoes");
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord,
                });
              },
            },
            onAddAllSuccess: {
              componentId: "page9-feedback-textbox",
              callback: createFeedbackCallback("page9-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page9-feedback-textbox",
              callback: createFeedbackCallback("page9-feedback-textbox"),
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page9-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page9-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInMangoRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page9-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page9-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page9-star": { imageSrc: "assets/star.png" },
            "page9-star-initial-1": { imageSrc: "assets/star.png" },
            "page9-star-initial-2": { imageSrc: "assets/star.png" },
            "page9-star-initial-3": { imageSrc: "assets/star.png" },
            "page9-star-initial-4": { imageSrc: "assets/star.png" },
            "page9-star-initial-5": { imageSrc: "assets/star.png" },
            "page9-star-initial-6": { imageSrc: "assets/star.png" },
            "page9-star-initial-7": { imageSrc: "assets/star.png" },
            "page9-star-initial-8": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page9-star-legend-text",
        name: "page9-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page9.starLegendBefore"),
          afterText: getI18nText("pages.page9.starLegendAfter"),
          draggableId: "page9-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          isDisabled: true,
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //quiz question text
      {
        id: "page9-quiz-question-text",
        name: "page9-quiz-question-text",
        type: "custom",
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: "page9-quiz-question-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page9.quizQuestionText"), // Empty text, just for background
          backgroundColor: "#052642be", // 40% opacity black
          border: "3px solid #094274",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "0gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHTML: true,
        },
      },

      //quiz panel
      {
        id: "page9-quiz-panel",
        name: "page9-quiz-panel",
        type: "custom",
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page9-quiz", // Unique identifier for this quiz
          quizType: "MCQ", // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: "QT4G", // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: "",
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page9.quizPanel.questionText"),
          feedbackText: "",
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: "36gc", // Font size for question text (in gc units)
          optionButtonTextSize: "42gc", // Font size for option button text (in gc units)
          feedbackFontSize: "32gc", // Font size for feedback text (in gc units)
          optionButtonTextColor: "#000000", // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page9.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
        },
      },
      // Instruction Text
      {
        id: "page9-instruction-text",
        name: "page9-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page9-instruction-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page9.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
        id: "page9-tap-animation",
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
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
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
                  getI18nText("messages.navNextDispatched"),
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    10: [
      //header text
      {
        id: "page10-headertext",
        name: "page10-headertext",
        type: "custom",
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page10-orange-image",
        name: "page10-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page10-apple-image",
        name: "page10-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page10-banana-image",
        name: "page10-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page10-mango-image",
        name: "page10-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page10-favorite-fruits-table",
        name: "page10-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page10-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          dimRowsOnQuizClick: [0, 1],
          dimElementIdsOnQuizClick: [
            "page10-orange-image",
            "page10-apple-image",
          ],
          dimRowsOnQuizClickOpacity: 0.2,
          dimRowsOnQuizClickQuizId: "page10-quiz",
          numberStarsOnCorrectQuizRows: [2, 3],
          numberStarsOnCorrectQuizId: "page10-quiz",
          starNumberFontSize: "30gc",
          starNumberColor: "#000000",
          starNumberFontWeight: "bold",
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page10-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page10-star-initial-1",
                "page10-star-initial-2",
                "page10-star-initial-3",
                "page10-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page10-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page10-star-initial-1",
                "page10-star-initial-2",
                "page10-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page10-table-R3C2",
              maxItems: 8,
              initialPlacementIds: [
                "page10-star-initial-1",
                "page10-star-initial-2",
                "page10-star-initial-3",
                "page10-star-initial-4",
                "page10-star-initial-5",
                "page10-star-initial-6",
                "page10-star-initial-7",
                "page10-star-initial-8",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page10-table-R4C2",
              maxItems: 8,
              initialPlacementIds: ["page10-star-initial-1"],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page10-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page10-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.correct"),
              mode: "correct",

              getText: (droppableId) => {
                if (droppableId !== "page10-table-R4C2")
                  return getI18nText("feedback.correct");
                const tableId = "page10-favorite-fruits-table";
                const queries =
                  typeof window !== "undefined" &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];
                const counts = queries
                  ? queries.getItemCountsByType(droppableId)
                  : {};
                const grapeCount = counts["page10-star"] || 0;
                const grapeWord =
                  grapeCount === 1
                    ? getI18nText("common.fruits.mango")
                    : getI18nText("common.fruits.mangoes");
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord,
                });
              },
            },
            onAddAllSuccess: {
              componentId: "page10-feedback-textbox",
              callback: createFeedbackCallback("page10-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page10-feedback-textbox",
              callback: createFeedbackCallback("page10-feedback-textbox"),
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page10-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page10-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInMangoRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page10-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page10-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page10-star": { imageSrc: "assets/star.png" },
            "page10-star-initial-1": { imageSrc: "assets/star.png" },
            "page10-star-initial-2": { imageSrc: "assets/star.png" },
            "page10-star-initial-3": { imageSrc: "assets/star.png" },
            "page10-star-initial-4": { imageSrc: "assets/star.png" },
            "page10-star-initial-5": { imageSrc: "assets/star.png" },
            "page10-star-initial-6": { imageSrc: "assets/star.png" },
            "page10-star-initial-7": { imageSrc: "assets/star.png" },
            "page10-star-initial-8": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page10-star-legend-text",
        name: "page10-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page10.starLegendBefore"),
          afterText: getI18nText("pages.page10.starLegendAfter"),
          draggableId: "page10-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          isDisabled: true,
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //quiz question text
      //pictureRepresent text
      {
        id: "page10-quiz-question-text",
        name: "page10-quiz-question-text",
        type: "custom",
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: "page10-quiz-question-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page10.quizQuestionText"), // Empty text, just for background
          backgroundColor: "#052642be", // 40% opacity black
          border: "3px solid #094274",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "0gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHTML: true,
        },
      },

      //quiz panel
      {
        id: "page10-quiz-panel",
        name: "page10-quiz-panel",
        type: "custom",
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page10-quiz", // Unique identifier for this quiz
          quizType: "MCQ", // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: "QT4G", // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: "",
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page10.quizPanel.questionText"),
          feedbackText: "",
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: "36gc", // Font size for question text (in gc units)
          optionButtonTextSize: "42gc", // Font size for option button text (in gc units)
          feedbackFontSize: "32gc", // Font size for feedback text (in gc units)
          optionButtonTextColor: "#000000", // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page10.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
        },
      },
      // Instruction Text
      {
        id: "page10-instruction-text",
        name: "page10-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page10-instruction-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page10.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
        id: "page10-tap-animation",
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
        id: "page10-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
          enableOnEventFilter: { pageNumber: 10 },

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
                  getI18nText("messages.navNextDispatched"),
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
            const pageNumber = extractPageNumberFromId(
              "page10-previous-button",
            );
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId(
              "page10-previous-button",
            );
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    11: [
      //header text
      {
        id: "page11-headertext",
        name: "page11-headertext",
        type: "custom",
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page11.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page11-orange-image",
        name: "page11-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page11-apple-image",
        name: "page11-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page11-banana-image",
        name: "page11-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page11-mango-image",
        name: "page11-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page11-favorite-fruits-table",
        name: "page11-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page11-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          dimRowsOnQuizClick: [2, 3],
          dimElementIdsOnQuizClick: [
            "page11-mango-image",
            "page11-banana-image",
          ],
          dimRowsOnQuizClickOpacity: 0.2,
          dimRowsOnQuizClickQuizId: "page11-quiz",
          numberStarsOnCorrectQuizRows: [0, 1],
          numberStarsOnCorrectQuizId: "page11-quiz",
          starNumberFontSize: "30gc",
          starNumberColor: "#000000",
          starNumberFontWeight: "bold",
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page11-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page11-star-initial-1",
                "page11-star-initial-2",
                "page11-star-initial-3",
                "page11-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page11-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page11-star-initial-1",
                "page11-star-initial-2",
                "page11-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page11-table-R3C2",
              maxItems: 8,
              initialPlacementIds: [
                "page11-star-initial-1",
                "page11-star-initial-2",
                "page11-star-initial-3",
                "page11-star-initial-4",
                "page11-star-initial-5",
                "page11-star-initial-6",
                "page11-star-initial-7",
                "page11-star-initial-8",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page11-table-R4C2",
              maxItems: 8,
              initialPlacementIds: ["page11-star-initial-1"],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page11-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page11-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.correct"),
              mode: "correct",

              getText: (droppableId) => {
                if (droppableId !== "page11-table-R4C2")
                  return getI18nText("feedback.correct");
                const tableId = "page11-favorite-fruits-table";
                const queries =
                  typeof window !== "undefined" &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];
                const counts = queries
                  ? queries.getItemCountsByType(droppableId)
                  : {};
                const grapeCount = counts["page11-star"] || 0;
                const grapeWord =
                  grapeCount === 1
                    ? getI18nText("common.fruits.mango")
                    : getI18nText("common.fruits.mangoes");
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord,
                });
              },
            },
            onAddAllSuccess: {
              componentId: "page11-feedback-textbox",
              callback: createFeedbackCallback("page11-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page11-feedback-textbox",
              callback: createFeedbackCallback("page11-feedback-textbox"),
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page11-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page11-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInMangoRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page11-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page11-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page11-star": { imageSrc: "assets/star.png" },
            "page11-star-initial-1": { imageSrc: "assets/star.png" },
            "page11-star-initial-2": { imageSrc: "assets/star.png" },
            "page11-star-initial-3": { imageSrc: "assets/star.png" },
            "page11-star-initial-4": { imageSrc: "assets/star.png" },
            "page11-star-initial-5": { imageSrc: "assets/star.png" },
            "page11-star-initial-6": { imageSrc: "assets/star.png" },
            "page11-star-initial-7": { imageSrc: "assets/star.png" },
            "page11-star-initial-8": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page11-star-legend-text",
        name: "page11-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page11.starLegendBefore"),
          afterText: getI18nText("pages.page11.starLegendAfter"),
          draggableId: "page11-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          isDisabled: true,
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //quiz question text
      //pictureRepresent text
      {
        id: "page11-quiz-question-text",
        name: "page11-quiz-question-text",
        type: "custom",
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: "page11-quiz-question-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page11.quizQuestionText"), // Empty text, just for background
          backgroundColor: "#052642be", // 40% opacity black
          border: "3px solid #094274",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "0gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHTML: true,
        },
      },

      //quiz panel
      {
        id: "page11-quiz-panel",
        name: "page11-quiz-panel",
        type: "custom",
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page11-quiz", // Unique identifier for this quiz
          quizType: "MCQ", // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: "QT4G", // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: "",
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page11.quizPanel.questionText"),
          feedbackText: "",
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: "36gc", // Font size for question text (in gc units)
          optionButtonTextSize: "42gc", // Font size for option button text (in gc units)
          feedbackFontSize: "32gc", // Font size for feedback text (in gc units)
          optionButtonTextColor: "#000000", // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page11.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
        },
      },
      // Instruction Text
      {
        id: "page11-instruction-text",
        name: "page11-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page11-instruction-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page11.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
        id: "page11-tap-animation",
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
        id: "page11-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
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
                  getI18nText("messages.navNextDispatched"),
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
            const pageNumber = extractPageNumberFromId(
              "page11-previous-button",
            );
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId(
              "page11-previous-button",
            );
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    12: [
      //header text
      {
        id: "page12-headertext",
        name: "page12-headertext",
        type: "custom",
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page12.headerText"), // Empty text, just for background
          backgroundColor: "", // 40% opacity black
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "43gc",
          padding: "0gc",
          allowHTML: true,
        },
      },
      //table orange image
      {
        id: "page12-orange-image",
        name: "page12-orange-image",
        type: "container",
        coordinates: [115, 200, 215, 300],
        zIndex: 70,
        props: {
          imageSrc: "assets/orange.png",
          imageAlt: getI18nText("common.fruitImageAlts.orange"),
        },
      },
      //table apple image
      {
        id: "page12-apple-image",
        name: "page12-apple-image",
        type: "container",
        coordinates: [115, 320, 215, 420],
        zIndex: 70,
        props: {
          imageSrc: "assets/apple.png",
          imageAlt: getI18nText("common.fruitImageAlts.apple"),
        },
      },
      //table banana image
      {
        id: "page12-banana-image",
        name: "page12-banana-image",
        type: "container",
        coordinates: [115, 440, 215, 540],
        zIndex: 70,
        props: {
          imageSrc: "assets/banana.png",
          imageAlt: getI18nText("common.fruitImageAlts.banana"),
        },
      },
      //table mango image
      {
        id: "page12-mango-image",
        name: "page12-mango-image",
        type: "container",
        coordinates: [115, 560, 215, 660],
        zIndex: 70,
        props: {
          imageSrc: "assets/mango.png",
          imageAlt: getI18nText("common.fruitImageAlts.mango"),
        },
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: "page12-favorite-fruits-table",
        name: "page12-favorite-fruits-table",
        type: "custom",
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: "TableGridComponent",
          elementName: "page12-favorite-fruits-table",
          tableData: {
            headers: [
              { text: getI18nText("common.favoriteFruit"), colSpan: 2 },
            ],
            rows: [
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
              [{ text: "", colSpan: 2 }],
            ],
          },
          headerBackgroundColor: "#053745",
          headerTextColor: "#00FFFF",
          headerFontSize: "40gc",
          textColor: "#ffffff",
          fontSize: "34gc",
          dataRowBackgroundColors: {
            0: "#053745",
            1: "#053745",
            2: "#053745",
            3: "#053745",
            4: "#202930b9",
          },
          rowOverrides: { 4: { fontSize: "28gc", fontStyle: "italic" } },
          dataColumnTextAlign: { 0: "left" },
          columnWidths: ["30%", "70%"],
          dimRowsOnQuizClick: [],
          dimElementIdsOnQuizClick: [],
          dimRowsOnQuizClickOpacity: 0.2,
          dimRowsOnQuizClickQuizId: "page12-quiz",
          numberStarsOnCorrectQuizRows: [0, 1, 2, 3],
          numberStarsOnCorrectQuizId: "page12-quiz",
          starNumberFontSize: "30gc",
          starNumberColor: "#000000",
          starNumberFontWeight: "bold",

          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0,
              colIndex: 1,
              droppableId: "page12-table-R1C2",
              maxItems: 8,
              initialPlacementIds: [
                "page12-star-initial-1",
                "page12-star-initial-2",
                "page12-star-initial-3",
                "page12-star-initial-4",
              ],
              placementDirection: "horizontal",
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 1,
              colIndex: 1,
              droppableId: "page12-table-R2C2",
              maxItems: 8,
              initialPlacementIds: [
                "page12-star-initial-1",
                "page12-star-initial-2",
                "page12-star-initial-3",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 2,
              colIndex: 1,
              droppableId: "page12-table-R3C2",
              maxItems: 8,
              initialPlacementIds: [
                "page12-star-initial-1",
                "page12-star-initial-2",
                "page12-star-initial-3",
                "page12-star-initial-4",
                "page12-star-initial-5",
                "page12-star-initial-6",
                "page12-star-initial-7",
                "page12-star-initial-8",
              ],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              enabled: true,
              placedItemDraggable: false,
              placedItemTransferable: false,
              clearPlacementOnDropOutside: true,
            },
            {
              rowIndex: 3,
              colIndex: 1,
              droppableId: "page12-table-R4C2",
              maxItems: 8,
              initialPlacementIds: ["page12-star-initial-1"],
              acceptValidator: () => false,
              onDrop: onDropTableCell,
              placedItemDraggable: false,
              placedItemTransferable: true,
              clearPlacementOnDropOutside: true,
            },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: "page12-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("correct");
                createFeedbackCallback("page12-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.correct"),
              mode: "correct",

              getText: (droppableId) => {
                if (droppableId !== "page12-table-R4C2")
                  return getI18nText("feedback.correct");
                const tableId = "page12-favorite-fruits-table";
                const queries =
                  typeof window !== "undefined" &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];
                const counts = queries
                  ? queries.getItemCountsByType(droppableId)
                  : {};
                const grapeCount = counts["page12-star"] || 0;
                const grapeWord =
                  grapeCount === 1
                    ? getI18nText("common.fruits.mango")
                    : getI18nText("common.fruits.mangoes");
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord,
                });
              },
            },
            onAddAllSuccess: {
              componentId: "page12-feedback-textbox",
              callback: createFeedbackCallback("page12-feedback-textbox"),
              text: getI18nText("feedback.allCorrect"),
              mode: "correct",
            },
            onRemove: {
              componentId: "page12-feedback-textbox",
              callback: createFeedbackCallback("page12-feedback-textbox"),
              text: getI18nText("feedback.itemRemoved"),
              mode: "normal",
            },
            onIncorrectDropInCell: {
              componentId: "page12-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("wrong");
                createFeedbackCallback("page12-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.placeStarsInMangoRow"),
              mode: "incorrect",
            },
            onIncorrectDropOutside: {
              componentId: "page12-feedback-textbox",
              callback: (text, mode) => {
                window.playCarClickSound?.("swoosh");
                createFeedbackCallback("page12-feedback-textbox")(text, mode);
              },
              text: getI18nText("feedback.dropInsideCell"),
              mode: "incorrect",
            },
          },
          placedContentByDraggableId: {
            "page12-star": { imageSrc: "assets/star.png" },
            "page12-star-initial-1": { imageSrc: "assets/star.png" },
            "page12-star-initial-2": { imageSrc: "assets/star.png" },
            "page12-star-initial-3": { imageSrc: "assets/star.png" },
            "page12-star-initial-4": { imageSrc: "assets/star.png" },
            "page12-star-initial-5": { imageSrc: "assets/star.png" },
            "page12-star-initial-6": { imageSrc: "assets/star.png" },
            "page12-star-initial-7": { imageSrc: "assets/star.png" },
            "page12-star-initial-8": { imageSrc: "assets/star.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: "transparent",
          borderWidth: "2gc",
          borderRadius: "8gc",
          cellBorderRadius: "12gc",
          rowGap: "4gc",
          columnGap: "4gc",
          tableBorder: false,
          tableBorderColor: "#0762a4b9",
          tableBorderWidth: "2gc",
          tableBorderRadius: "8gc",
          tableBackground: "#0a1f2e",
          padding: "12gc",
        },
      },
      {
        id: "page12-star-legend-text",
        name: "page12-star-legend-text",
        type: "custom",
        coordinates: [40, 665, 950, 795],
        zIndex: 60,
        props: {
          componentType: "StarLegendDraggableComponent",
          beforeText: getI18nText("pages.page12.starLegendBefore"),
          afterText: getI18nText("pages.page12.starLegendAfter"),
          draggableId: "page12-star",
          spawnCount: -1,
          imageSrc: "assets/star.png",
          imageAlt: getI18nText("common.starAlt"),
          isDisabled: true,
          starSizeEm: 2.85,
          backgroundColor: "",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "35gc",
          padding: "0gc",
          textAlign: "left",
        },
      },

      //quiz question text
      //pictureRepresent text
      {
        id: "page12-quiz-question-text",
        name: "page12-quiz-question-text",
        type: "custom",
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: "page12-quiz-question-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page12.quizQuestionText"), // Empty text, just for background
          backgroundColor: "#052642be", // 40% opacity black
          border: "3px solid #094274",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "45gc",
          padding: "0gc",
          textAlign: "center",
          underlineFirstWord: false,
          allowHTML: true,
        },
      },

      //quiz panel
      {
        id: "page12-quiz-panel",
        name: "page12-quiz-panel",
        type: "custom",
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: "QuizPanelComponent",
          quizId: "page12-quiz", // Unique identifier for this quiz
          quizType: "MCQ", // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: "QT4G", // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: "",
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page12.quizPanel.questionText"),
          feedbackText: "",
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: "36gc", // Font size for question text (in gc units)
          optionButtonTextSize: "42gc", // Font size for option button text (in gc units)
          feedbackFontSize: "32gc", // Font size for feedback text (in gc units)
          optionButtonTextColor: "#000000", // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page12.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
        },
      },
      // Instruction Text
      {
        id: "page12-instruction-text",
        name: "page12-instruction-text",
        type: "custom",
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: "page12-instruction-text",
          componentType: "SectionHeaderComponent",
          text: getI18nText("pages.page12.footerInstruction"),
          // backgroundColor: 'rgba(66, 73, 88, 0.9)',
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
        id: "page12-tap-animation",
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
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: "quizCompleted",
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
                  getI18nText("messages.navNextDispatched"),
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
            const pageNumber = extractPageNumberFromId(
              "page12-previous-button",
            );
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId(
              "page12-previous-button",
            );
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
                  getI18nText("messages.navPreviousDispatched"),
                );
              }
            }
          },
        },
      },
    ],
    13: [
      //fruit cloud image
      {
        id: "page13-header-text",
        name: "page13-header-text",
        type: "custom",
        coordinates: [10, 5, 1590, 100], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page13.title"),
          textColor: "orange",
          fontSize: "50gc",
        },
      },

      // maintext
      {
        id: "page13-main-text",
        name: "page13-main-text",
        type: "custom",
        coordinates: [10, 210, 1590, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page13.mainText"),
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
        id: "page13-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 680, 700, 790],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page13-next-button",
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
                  getI18nText("messages.navNextDispatched"),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
                window.location.reload(),
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

    // Page 4 Interaction State
    window.page4FirstClick = true;
    window.page4CheckDisabled = true;
    window.page4LegendDisabled = false;

    // Page 5 Interaction State
    window.page5FirstClick = true;
    window.page5CheckDisabled = true;
    window.page5LegendDisabled = false;

    // Page 6 Interaction State
    window.page6FirstClick = true;
    window.page6CheckDisabled = true;
    window.page6LegendDisabled = false;

    // Page 7 Interaction State
    window.page7FirstClick = true;
    window.page7CheckDisabled = true;
    window.page7LegendDisabled = false;

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
            getI18nText("messages.navigationComplete"),
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
