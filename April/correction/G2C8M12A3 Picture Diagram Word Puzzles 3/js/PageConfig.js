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
  8: { prev: 7, next: null },
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
  20: { prev: 19, next: null }

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
        new CustomEvent("pageChanged", { detail: { page: targetPage } })
      );
      console.log(
        `📄 [Navigation] ${direction} - Dispatched page change event to page ${targetPage}`
      );
    }
  }
};

/**
 * Spawn state for draggables that can spawn more after drop.
 * window.draggableSpawnState[baseId] = { spawnCount: -1|0|n, ids: ['baseId', 'baseId-1', ...] }
 * spawnCount: -1 = infinite spawns, 0 = no spawns after first, n = n additional spawns after first.
 */
if (typeof window !== 'undefined' && !window.draggableSpawnState) {
  window.draggableSpawnState = {};
}
/** Get base id for a draggable (for spawned ids, returns the base; otherwise the id itself). */
window.getDraggableBaseId = function (draggableId) {
  if (!window.draggableSpawnState) return draggableId;
  for (const baseId of Object.keys(window.draggableSpawnState)) {
    if (window.draggableSpawnState[baseId].ids.includes(draggableId)) return baseId;
  }
  return draggableId;
};
/** Returns an acceptValidator that accepts any spawned id for the given base. */
function getAcceptValidatorForBase(baseId) {
  return function (id) {
    if (!id) return false;
    if (id === baseId) return true;
    if (typeof id === 'string' && id.startsWith(baseId + '-')) return true;
    return !!(window.draggableSpawnState && window.draggableSpawnState[baseId] && window.draggableSpawnState[baseId].ids.includes(id));
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
  const nextId = baseId + '-' + ids.length;
  ids.push(nextId);
  window.dispatchEvent(new CustomEvent('draggableSpawnUpdate', { detail: { baseId, newId: nextId } }));
};

/**
 * Creates a callback that updates a feedback component (e.g. FeedbackTextboxComponent) with text and mode.
 * Use with TableGridComponent dropCallbacks. The target component should listen for pageNFeedbackUpdate.
 * @param {string} componentId - Target component id (e.g. 'page3-feedback-textbox'); pageId is extracted for event name.
 * @returns {function(text: string, mode: string)} Callback to pass to dropCallbacks
 */
function createFeedbackCallback(componentId) {
  const pageMatch = (componentId || '').match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : null;
  return (text, mode) => {
    if (typeof window === 'undefined' || !pageId) return;
    window[`${pageId}FeedbackState`] = window[`${pageId}FeedbackState`] || {};
    window[`${pageId}FeedbackState`].text = text ?? '';
    window[`${pageId}FeedbackState`].mode = mode ?? 'normal';
    window.dispatchEvent(new CustomEvent(`${pageId}FeedbackUpdate`, { detail: { text: text ?? '', mode: mode ?? 'normal' } }));
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
  const { correctAnswer, checkCellId, feedbackComponentId, tableId, pageNumber, fruit } = config;
  return () => {
    if (typeof window !== 'undefined' && window.playCarClickSound) {
      window.playCarClickSound('next');
    }
    const queries = window.tableGridDropQueries && window.tableGridDropQueries[tableId];
    const feedbackCallback = createFeedbackCallback(feedbackComponentId);
    if (!queries) {
      feedbackCallback(getI18nText("feedback.tryAgain"), "incorrect");
      return;
    }
    const items = queries.getItemsInCell(checkCellId) || [];

    const count = items.length;
    console.log("👩 count is :-", count)
    const fruitLabel =
      fruit != null && fruit !== ""
        ? fruit
        : getI18nText("common.fruits.students");
    if (count === correctAnswer) {
      window.playCarClickSound('correct');
      feedbackCallback(getI18nText("feedback.thatIsCorrect"), "correct");
      if (typeof pageNumber === 'number' && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quizCompleted', {
          detail: { componentType: 'TableGridComponent', pageNumber }
        }));
      }
    }
    else if (count > correctAnswer) {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText("feedback.manyStars", { fruit: fruitLabel }), "incorrect");
    }
    else {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText("feedback.notEnough", { fruit: fruitLabel }), "incorrect");
    }
  };
}

/**
 * Shared onDrop handler for table droppable cells.
 * When maxItems > 1, appends to array; otherwise replaces.
 * @param {number} [maxItems=1] - Max items for this cell; when > 1, supports multiple items.
 */
const createOnDropTableCell = (maxItems = 1) => (draggableId, droppableId) => {
  if (typeof window !== 'undefined') {
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
    window.dispatchEvent(new CustomEvent('dragDropPlacement', { detail: { droppableId, draggableId } }));
    window.trySpawnDraggableAfterDrop(draggableId);
  }
};

/** Legacy single-item handler (maxItems=1) */
const onDropTableCell = createOnDropTableCell(1);

// ===== HELPER FUNCTIONS =====

/**
 * Resolved UI copy from data.js (no hardcoded fallbacks).
 * @param {string} key - Dot path under the active language (e.g. pages.page2.footerInstruction)
 * @param {Object} [params={}] - Interpolation values for {placeholders}
 */
const getI18nText = (key, params = {}) => {
  const p =
    params && typeof params === "object" && !Array.isArray(params) ? params : {};
  if (typeof i18n !== "undefined") {
    return i18n.t(key, p);
  }
  return `[Missing i18n: ${key}]`;
};

function getWrongRowDropFeedback(droppableId) {
  const m = String(droppableId || "").match(/table-R(\d)C2$/);
  const n = m ? Math.min(4, Math.max(1, parseInt(m[1], 10))) : 1;
  return getI18nText(`feedback.wrongDropLap${n}Row`);
}

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
  const questionTextSize = '28gc';

  // Helper function to get CSS variable value
  const getCSSVariable = (variableName, fallback = '') => {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      try {
        const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
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
        coordinates: [10, 150, 1590, 550], // Positioned below question text box
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
        coordinates: [650, 650, 730, 750],
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
        coordinates: [650, 600, 950, 700],
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
                  getI18nText("messages.pageChangeEventDispatched", {
                    page: nav.next,
                  }),
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
        id: 'page2-headertext',
        name: 'page2-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page2-favorite-fruits-table',
        name: 'page2-favorite-fruits-table',
        type: 'custom',
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page2-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit"), colSpan: 2 }],
            rows: [
              [getI18nText("common.laps.lap1"), ''],
              [getI18nText("common.laps.lap2"), ''],
              [getI18nText("common.laps.lap3"), ''],
              [getI18nText("common.laps.lap4"), ''],
              [{ text: getI18nText("common.each"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '38gc', fontStyle: 'italic', textAlign: 'left' } },
          dataColumnTextAlign: { 0: 'center' },
          columnWidths: ['30%', '70%'],
          opacityRow: {},
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0, colIndex: 1, droppableId: 'page2-table-R1C2', maxItems: 6, initialPlacementIds: [
                'page2-red-star-initial-1',
                'page2-red-star-initial-2',
                'page2-red-star-initial-3',
                'page2-red-star-initial-4',
                'page2-red-star-initial-5',

              ], placementDirection: 'horizontal', acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 1, colIndex: 1, droppableId: 'page2-table-R2C2', maxItems: 6, initialPlacementIds: [
                'page2-yellow-star-initial-1',
                'page2-yellow-star-initial-2',
                'page2-yellow-star-initial-3'
              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 2, colIndex: 1, droppableId: 'page2-table-R3C2', maxItems: 6, initialPlacementIds: [
                'page2-blue-star-initial-1',
                'page2-blue-star-initial-2',
                'page2-blue-star-initial-3',
                'page2-blue-star-initial-4',

              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 3, colIndex: 1, droppableId: 'page2-table-R4C2', maxItems: 6, initialPlacementIds: [
                'page2-black-star-initial-1',
                'page2-black-star-initial-2'
              ], acceptValidator: () => false, onDrop: onDropTableCell, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page2-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page2-feedback-textbox')(text, mode);
              },
              text: getI18nText('feedback.correct'),
              mode: 'correct',

              getText: (droppableId) => {
                if (droppableId !== 'page2-table-R4C2') return getI18nText('feedback.correct');
                const tableId = 'page2-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const iconCount = counts['page2-star'] || 0;
                const unitWord = iconCount === 1 ? getI18nText('common.fruits.student') : getI18nText('common.fruits.students');
                return getI18nText('feedback.placedStar', { num: iconCount, fruit: unitWord });
              },
            },
            onAddAllSuccess: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page2-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page2-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => getWrongRowDropFeedback(droppableId),
              text: '',
              mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page2-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page2-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            "page2-red-star-initial-1": { imageSrc: "assets/run.png" },
            "page2-red-star-initial-2": { imageSrc: "assets/run.png" },
            "page2-red-star-initial-3": { imageSrc: "assets/run.png" },
            "page2-red-star-initial-4": { imageSrc: "assets/run.png" },
            "page2-red-star-initial-5": { imageSrc: "assets/run.png" },
            "page2-red-star-initial-6": { imageSrc: "assets/run.png" },
            "page2-red-star-initial-7": { imageSrc: "assets/run.png" },
            'page2-yellow-star-initial-1': { imageSrc: "assets/run.png" },
            'page2-yellow-star-initial-2': { imageSrc: "assets/run.png" },
            'page2-yellow-star-initial-3': { imageSrc: "assets/run.png" },
            'page2-blue-star-initial-1': { imageSrc: "assets/run.png" },
            'page2-blue-star-initial-2': { imageSrc: "assets/run.png" },
            'page2-blue-star-initial-3': { imageSrc: "assets/run.png" },
            'page2-blue-star-initial-4': { imageSrc: "assets/run.png" },
            'page2-blue-star-initial-5': { imageSrc: "assets/run.png" },
            'page2-black-star-initial-1': { imageSrc: "assets/run.png" },
            'page2-black-star-initial-2': { imageSrc: "assets/run.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: 'transparent',
          borderWidth: '2gc',
          borderRadius: '8gc',
          cellBorderRadius: '12gc',
          rowGap: '4gc',
          columnGap: '4gc',
          tableBorder: false,
          tableBorderColor: '#0762a4b9',
          tableBorderWidth: '2gc',
          tableBorderRadius: '8gc',
          tableBackground: '#0a1f2e',
          padding: '12gc'
        }

      },



      //quiz question text
      {
        id: 'page2-quiz-question-text',
        name: 'page2-quiz-question-text',
        type: 'custom',
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: 'page2-quiz-question-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page2.quizQuestionText"), // Empty text, just for background
          backgroundColor: '#052642be', // 40% opacity black
          border: '3px solid #094274',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '45gc',
          padding: '0gc',
          textAlign: 'center',
          underlineFirstWord: false,
          allowHTML: true
        }
      },

      //quiz panel
      {
        id: 'page2-quiz-panel',
        name: 'page2-quiz-panel',
        type: 'custom',
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page2-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page2.quizPanel.questionText"),
          feedbackText: '',
          pageNumber: 2,
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page2.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
          onOptionClick: ({ quizId, optionIndex, isCorrect }) => {
            console.log("Clicked:", quizId, optionIndex);


            // Example: Update Table opacity
            window.tableGridRowOpacityCallbacks["page2-favorite-fruits-table"]({
              1: 0.2,
              2: 0.2,
              3: 0.2
            });


          }
        }
      },
      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page2-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page2.footerInstruction"),
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
        id: 'page2-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page2-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 2 },

          get text() {
            const pageNumber = extractPageNumberFromId('page2-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page2-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.next }));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page2-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.prev }));
              }
            }
          }
        }
      },

    ],
    3: [
      //header text
      {
        id: 'page3-headertext',
        name: 'page3-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page3-favorite-fruits-table',
        name: 'page3-favorite-fruits-table',
        type: 'custom',
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page3-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit"), colSpan: 2 }],
            rows: [
              [getI18nText("common.laps.lap1"), ''],
              [getI18nText("common.laps.lap2"), ''],
              [getI18nText("common.laps.lap3"), ''],
              [getI18nText("common.laps.lap4"), ''],
              [{ text: getI18nText("common.each"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '38gc', fontStyle: 'italic', textAlign: 'left' } },
          dataColumnTextAlign: { 0: 'center' },
          columnWidths: ['30%', '70%'],
          opacityRow: {},
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0, colIndex: 1, droppableId: 'page3-table-R1C2', maxItems: 6, initialPlacementIds: [
                'page3-red-star-initial-1',
                'page3-red-star-initial-2',
                'page3-red-star-initial-3',
                'page3-red-star-initial-4',
                'page3-red-star-initial-5',

              ], placementDirection: 'horizontal', acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 1, colIndex: 1, droppableId: 'page3-table-R2C2', maxItems: 6, initialPlacementIds: [
                'page3-yellow-star-initial-1',
                'page3-yellow-star-initial-2',
                'page3-yellow-star-initial-3'
              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 2, colIndex: 1, droppableId: 'page3-table-R3C2', maxItems: 6, initialPlacementIds: [
                'page3-blue-star-initial-1',
                'page3-blue-star-initial-2',
                'page3-blue-star-initial-3',
                'page3-blue-star-initial-4',

              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 3, colIndex: 1, droppableId: 'page3-table-R4C2', maxItems: 6, initialPlacementIds: [
                'page3-black-star-initial-1',
                'page3-black-star-initial-2'
              ], acceptValidator: () => false, onDrop: onDropTableCell, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page3-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page3-feedback-textbox')(text, mode);
              },
              text: getI18nText('feedback.correct'),
              mode: 'correct',

              getText: (droppableId) => {
                if (droppableId !== 'page3-table-R4C2') return getI18nText('feedback.correct');
                const tableId = 'page3-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const iconCount = counts['page3-star'] || 0;
                const unitWord = iconCount === 1 ? getI18nText('common.fruits.student') : getI18nText('common.fruits.students');
                return getI18nText('feedback.placedStar', { num: iconCount, fruit: unitWord });
              },
            },
            onAddAllSuccess: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page3-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page3-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => getWrongRowDropFeedback(droppableId),
              text: '',
              mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page3-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page3-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            "page3-red-star-initial-1": { imageSrc: "assets/run.png" },
            "page3-red-star-initial-2": { imageSrc: "assets/run.png" },
            "page3-red-star-initial-3": { imageSrc: "assets/run.png" },
            "page3-red-star-initial-4": { imageSrc: "assets/run.png" },
            "page3-red-star-initial-5": { imageSrc: "assets/run.png" },
            "page3-red-star-initial-6": { imageSrc: "assets/run.png" },
            "page3-red-star-initial-7": { imageSrc: "assets/run.png" },
            'page3-yellow-star-initial-1': { imageSrc: "assets/run.png" },
            'page3-yellow-star-initial-2': { imageSrc: "assets/run.png" },
            'page3-yellow-star-initial-3': { imageSrc: "assets/run.png" },
            'page3-blue-star-initial-1': { imageSrc: "assets/run.png" },
            'page3-blue-star-initial-2': { imageSrc: "assets/run.png" },
            'page3-blue-star-initial-3': { imageSrc: "assets/run.png" },
            'page3-blue-star-initial-4': { imageSrc: "assets/run.png" },
            'page3-blue-star-initial-5': { imageSrc: "assets/run.png" },
            'page3-black-star-initial-1': { imageSrc: "assets/run.png" },
            'page3-black-star-initial-2': { imageSrc: "assets/run.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: 'transparent',
          borderWidth: '2gc',
          borderRadius: '8gc',
          cellBorderRadius: '12gc',
          rowGap: '4gc',
          columnGap: '4gc',
          tableBorder: false,
          tableBorderColor: '#0762a4b9',
          tableBorderWidth: '2gc',
          tableBorderRadius: '8gc',
          tableBackground: '#0a1f2e',
          padding: '12gc'
        }

      },



      //quiz question text
      {
        id: 'page3-quiz-question-text',
        name: 'page3-quiz-question-text',
        type: 'custom',
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: 'page3-quiz-question-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page3.quizQuestionText"), // Empty text, just for background
          backgroundColor: '#052642be', // 40% opacity black
          border: '3px solid #094274',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '45gc',
          padding: '0gc',
          textAlign: 'center',
          underlineFirstWord: false,
          allowHTML: true
        }
      },

      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page3.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page3.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
          onOptionClick: ({ quizId, optionIndex, isCorrect }) => {
            console.log("Clicked:", quizId, optionIndex);


            // Example: Update Table opacity
            window.tableGridRowOpacityCallbacks["page3-favorite-fruits-table"]({
              0: 0.2,
              1: 0.2,
              2: 0.2
            });


          }
        }
      },
      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page3-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page3.footerInstruction"),
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
        id: 'page3-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page3-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 3 },

          get text() {
            const pageNumber = extractPageNumberFromId('page3-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page3-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.next }));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page3-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.prev }));
              }
            }
          }
        }
      },

    ],
    4: [
      //header text
      {
        id: 'page4-headertext',
        name: 'page4-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page4-favorite-fruits-table',
        name: 'page4-favorite-fruits-table',
        type: 'custom',
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page4-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit"), colSpan: 2 }],
            rows: [
              [getI18nText("common.laps.lap1"), ''],
              [getI18nText("common.laps.lap2"), ''],
              [getI18nText("common.laps.lap3"), ''],
              [getI18nText("common.laps.lap4"), ''],
              [{ text: getI18nText("common.each"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '38gc', fontStyle: 'italic', textAlign: 'left' } },
          dataColumnTextAlign: { 0: 'center' },
          columnWidths: ['30%', '70%'],
          opacityRow: {},
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0, colIndex: 1, droppableId: 'page4-table-R1C2', maxItems: 6, initialPlacementIds: [
                'page4-red-star-initial-1',
                'page4-red-star-initial-2',
                'page4-red-star-initial-3',
                'page4-red-star-initial-4',
                'page4-red-star-initial-5',

              ], placementDirection: 'horizontal', acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 1, colIndex: 1, droppableId: 'page4-table-R2C2', maxItems: 6, initialPlacementIds: [
                'page4-yellow-star-initial-1',
                'page4-yellow-star-initial-2',
                'page4-yellow-star-initial-3'
              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 2, colIndex: 1, droppableId: 'page4-table-R3C2', maxItems: 6, initialPlacementIds: [
                'page4-blue-star-initial-1',
                'page4-blue-star-initial-2',
                'page4-blue-star-initial-3',
                'page4-blue-star-initial-4',

              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 3, colIndex: 1, droppableId: 'page4-table-R4C2', maxItems: 6, initialPlacementIds: [
                'page4-black-star-initial-1',
                'page4-black-star-initial-2'
              ], acceptValidator: () => false, onDrop: onDropTableCell, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page4-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page4-feedback-textbox')(text, mode);
              },
              text: getI18nText('feedback.correct'),
              mode: 'correct',

              getText: (droppableId) => {
                if (droppableId !== 'page4-table-R4C2') return getI18nText('feedback.correct');
                const tableId = 'page4-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const iconCount = counts['page4-star'] || 0;
                const unitWord = iconCount === 1 ? getI18nText('common.fruits.student') : getI18nText('common.fruits.students');
                return getI18nText('feedback.placedStar', { num: iconCount, fruit: unitWord });
              },
            },
            onAddAllSuccess: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page4-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page4-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => getWrongRowDropFeedback(droppableId),
              text: '',
              mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page4-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page4-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            "page4-red-star-initial-1": { imageSrc: "assets/run.png" },
            "page4-red-star-initial-2": { imageSrc: "assets/run.png" },
            "page4-red-star-initial-3": { imageSrc: "assets/run.png" },
            "page4-red-star-initial-4": { imageSrc: "assets/run.png" },
            "page4-red-star-initial-5": { imageSrc: "assets/run.png" },
            "page4-red-star-initial-6": { imageSrc: "assets/run.png" },
            "page4-red-star-initial-7": { imageSrc: "assets/run.png" },
            'page4-yellow-star-initial-1': { imageSrc: "assets/run.png" },
            'page4-yellow-star-initial-2': { imageSrc: "assets/run.png" },
            'page4-yellow-star-initial-3': { imageSrc: "assets/run.png" },
            'page4-blue-star-initial-1': { imageSrc: "assets/run.png" },
            'page4-blue-star-initial-2': { imageSrc: "assets/run.png" },
            'page4-blue-star-initial-3': { imageSrc: "assets/run.png" },
            'page4-blue-star-initial-4': { imageSrc: "assets/run.png" },
            'page4-blue-star-initial-5': { imageSrc: "assets/run.png" },
            'page4-black-star-initial-1': { imageSrc: "assets/run.png" },
            'page4-black-star-initial-2': { imageSrc: "assets/run.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: 'transparent',
          borderWidth: '2gc',
          borderRadius: '8gc',
          cellBorderRadius: '12gc',
          rowGap: '4gc',
          columnGap: '4gc',
          tableBorder: false,
          tableBorderColor: '#0762a4b9',
          tableBorderWidth: '2gc',
          tableBorderRadius: '8gc',
          tableBackground: '#0a1f2e',
          padding: '12gc'
        }

      },



      //quiz question text
      {
        id: 'page4-quiz-question-text',
        name: 'page4-quiz-question-text',
        type: 'custom',
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: 'page4-quiz-question-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page4.quizQuestionText"), // Empty text, just for background
          backgroundColor: '#052642be', // 40% opacity black
          border: '3px solid #094274',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '45gc',
          padding: '0gc',
          textAlign: 'center',
          underlineFirstWord: false,
          allowHTML: true
        }
      },

      //quiz panel
      {
        id: 'page4-quiz-panel',
        name: 'page4-quiz-panel',
        type: 'custom',
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page4-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page4.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page4.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
          onOptionClick: ({ quizId, optionIndex, isCorrect }) => {
            console.log("Clicked:", quizId, optionIndex);


            // Example: Update Table opacity
            window.tableGridRowOpacityCallbacks["page4-favorite-fruits-table"]({
              1: 0.2,
              2: 0.2,
              3: 0.2
            });


          }
        }
      },
      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page4-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page4.footerInstruction"),
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
        id: 'page4-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page4-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 4 },

          get text() {
            const pageNumber = extractPageNumberFromId('page4-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page4-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.next }));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page4-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.prev }));
              }
            }
          }
        }
      },

    ],
    5: [
      //header text
      {
        id: 'page5-headertext',
        name: 'page5-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page5-favorite-fruits-table',
        name: 'page5-favorite-fruits-table',
        type: 'custom',
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page5-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit"), colSpan: 2 }],
            rows: [
              [getI18nText("common.laps.lap1"), ''],
              [getI18nText("common.laps.lap2"), ''],
              [getI18nText("common.laps.lap3"), ''],
              [getI18nText("common.laps.lap4"), ''],
              [{ text: getI18nText("common.each"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '38gc', fontStyle: 'italic', textAlign: 'left' } },
          dataColumnTextAlign: { 0: 'center' },
          columnWidths: ['30%', '70%'],
          opacityRow: {},
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0, colIndex: 1, droppableId: 'page5-table-R1C2', maxItems: 6, initialPlacementIds: [
                'page5-red-star-initial-1',
                'page5-red-star-initial-2',
                'page5-red-star-initial-3',
                'page5-red-star-initial-4',
                'page5-red-star-initial-5',

              ], placementDirection: 'horizontal', acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 1, colIndex: 1, droppableId: 'page5-table-R2C2', maxItems: 6, initialPlacementIds: [
                'page5-yellow-star-initial-1',
                'page5-yellow-star-initial-2',
                'page5-yellow-star-initial-3'
              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 2, colIndex: 1, droppableId: 'page5-table-R3C2', maxItems: 6, initialPlacementIds: [
                'page5-blue-star-initial-1',
                'page5-blue-star-initial-2',
                'page5-blue-star-initial-3',
                'page5-blue-star-initial-4',

              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 3, colIndex: 1, droppableId: 'page5-table-R4C2', maxItems: 6, initialPlacementIds: [
                'page5-black-star-initial-1',
                'page5-black-star-initial-2'
              ], acceptValidator: () => false, onDrop: onDropTableCell, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page5-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page5-feedback-textbox')(text, mode);
              },
              text: getI18nText('feedback.correct'),
              mode: 'correct',

              getText: (droppableId) => {
                if (droppableId !== 'page5-table-R4C2') return getI18nText('feedback.correct');
                const tableId = 'page5-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const iconCount = counts['page5-star'] || 0;
                const unitWord = iconCount === 1 ? getI18nText('common.fruits.student') : getI18nText('common.fruits.students');
                return getI18nText('feedback.placedStar', { num: iconCount, fruit: unitWord });
              },
            },
            onAddAllSuccess: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page5-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page5-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => getWrongRowDropFeedback(droppableId),
              text: '',
              mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page5-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page5-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            "page5-red-star-initial-1": { imageSrc: "assets/run.png" },
            "page5-red-star-initial-2": { imageSrc: "assets/run.png" },
            "page5-red-star-initial-3": { imageSrc: "assets/run.png" },
            "page5-red-star-initial-4": { imageSrc: "assets/run.png" },
            "page5-red-star-initial-5": { imageSrc: "assets/run.png" },
            "page5-red-star-initial-6": { imageSrc: "assets/run.png" },
            "page5-red-star-initial-7": { imageSrc: "assets/run.png" },
            'page5-yellow-star-initial-1': { imageSrc: "assets/run.png" },
            'page5-yellow-star-initial-2': { imageSrc: "assets/run.png" },
            'page5-yellow-star-initial-3': { imageSrc: "assets/run.png" },
            'page5-blue-star-initial-1': { imageSrc: "assets/run.png" },
            'page5-blue-star-initial-2': { imageSrc: "assets/run.png" },
            'page5-blue-star-initial-3': { imageSrc: "assets/run.png" },
            'page5-blue-star-initial-4': { imageSrc: "assets/run.png" },
            'page5-blue-star-initial-5': { imageSrc: "assets/run.png" },
            'page5-black-star-initial-1': { imageSrc: "assets/run.png" },
            'page5-black-star-initial-2': { imageSrc: "assets/run.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: 'transparent',
          borderWidth: '2gc',
          borderRadius: '8gc',
          cellBorderRadius: '12gc',
          rowGap: '4gc',
          columnGap: '4gc',
          tableBorder: false,
          tableBorderColor: '#0762a4b9',
          tableBorderWidth: '2gc',
          tableBorderRadius: '8gc',
          tableBackground: '#0a1f2e',
          padding: '12gc'
        }

      },



      //quiz question text
      {
        id: 'page5-quiz-question-text',
        name: 'page5-quiz-question-text',
        type: 'custom',
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: 'page5-quiz-question-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page5.quizQuestionText"), // Empty text, just for background
          backgroundColor: '#052642be', // 40% opacity black
          border: '3px solid #094274',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '45gc',
          padding: '0gc',
          textAlign: 'center',
          underlineFirstWord: false,
          allowHTML: true
        }
      },

      //quiz panel
      {
        id: 'page5-quiz-panel',
        name: 'page5-quiz-panel',
        type: 'custom',
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page5.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '42gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page5.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
          onOptionClick: ({ quizId, optionIndex, isCorrect }) => {
            console.log("Clicked:", quizId, optionIndex);


            // Example: Update Table opacity
            window.tableGridRowOpacityCallbacks["page5-favorite-fruits-table"]({
              0: 0.2,
              1: 0.2,
            });


          }
        }
      },
      // Instruction Text
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page5-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page5.footerInstruction"),
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
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page5-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 5 },

          get text() {
            const pageNumber = extractPageNumberFromId('page5-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page5-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.next }));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page5-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.prev }));
              }
            }
          }
        }
      },

    ],
    6: [
      //header text
      {
        id: 'page6-headertext',
        name: 'page6-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page6.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page6-favorite-fruits-table',
        name: 'page6-favorite-fruits-table',
        type: 'custom',
        coordinates: [10, 90, 950, 800],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page6-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit"), colSpan: 2 }],
            rows: [
              [getI18nText("common.laps.lap1"), ''],
              [getI18nText("common.laps.lap2"), ''],
              [getI18nText("common.laps.lap3"), ''],
              [getI18nText("common.laps.lap4"), ''],
              [{ text: getI18nText("common.each"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '38gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '38gc', fontStyle: 'italic', textAlign: 'left' } },
          dataColumnTextAlign: { 0: 'center' },
          columnWidths: ['30%', '70%'],
          opacityRow: {},
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            {
              rowIndex: 0, colIndex: 1, droppableId: 'page6-table-R1C2', maxItems: 6, initialPlacementIds: [
                'page6-red-star-initial-1',
                'page6-red-star-initial-2',
                'page6-red-star-initial-3',
                'page6-red-star-initial-4',
                'page6-red-star-initial-5',

              ], placementDirection: 'horizontal', acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 1, colIndex: 1, droppableId: 'page6-table-R2C2', maxItems: 6, initialPlacementIds: [
                'page6-yellow-star-initial-1',
                'page6-yellow-star-initial-2',
                'page6-yellow-star-initial-3'
              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 2, colIndex: 1, droppableId: 'page6-table-R3C2', maxItems: 6, initialPlacementIds: [
                'page6-blue-star-initial-1',
                'page6-blue-star-initial-2',
                'page6-blue-star-initial-3',
                'page6-blue-star-initial-4',

              ], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true
            },
            {
              rowIndex: 3, colIndex: 1, droppableId: 'page6-table-R4C2', maxItems: 6, initialPlacementIds: [
                'page6-black-star-initial-1',
                'page6-black-star-initial-2'
              ], acceptValidator: () => false, onDrop: onDropTableCell, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true
            }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page6-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page6-feedback-textbox')(text, mode);
              },
              text: getI18nText('feedback.correct'),
              mode: 'correct',

              getText: (droppableId) => {
                if (droppableId !== 'page6-table-R4C2') return getI18nText('feedback.correct');
                const tableId = 'page6-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const iconCount = counts['page6-star'] || 0;
                const unitWord = iconCount === 1 ? getI18nText('common.fruits.student') : getI18nText('common.fruits.students');
                return getI18nText('feedback.placedStar', { num: iconCount, fruit: unitWord });
              },
            },
            onAddAllSuccess: { componentId: 'page6-feedback-textbox', callback: createFeedbackCallback('page6-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page6-feedback-textbox', callback: createFeedbackCallback('page6-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page6-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page6-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => getWrongRowDropFeedback(droppableId),
              text: '',
              mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page6-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page6-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            "page6-red-star-initial-1": { imageSrc: "assets/run.png" },
            "page6-red-star-initial-2": { imageSrc: "assets/run.png" },
            "page6-red-star-initial-3": { imageSrc: "assets/run.png" },
            "page6-red-star-initial-4": { imageSrc: "assets/run.png" },
            "page6-red-star-initial-5": { imageSrc: "assets/run.png" },
            "page6-red-star-initial-6": { imageSrc: "assets/run.png" },
            "page6-red-star-initial-7": { imageSrc: "assets/run.png" },
            'page6-yellow-star-initial-1': { imageSrc: "assets/run.png" },
            'page6-yellow-star-initial-2': { imageSrc: "assets/run.png" },
            'page6-yellow-star-initial-3': { imageSrc: "assets/run.png" },
            'page6-blue-star-initial-1': { imageSrc: "assets/run.png" },
            'page6-blue-star-initial-2': { imageSrc: "assets/run.png" },
            'page6-blue-star-initial-3': { imageSrc: "assets/run.png" },
            'page6-blue-star-initial-4': { imageSrc: "assets/run.png" },
            'page6-blue-star-initial-5': { imageSrc: "assets/run.png" },
            'page6-black-star-initial-1': { imageSrc: "assets/run.png" },
            'page6-black-star-initial-2': { imageSrc: "assets/run.png" },
          },
          placedItemDraggable: true,
          equalRowHeights: true,
          borderColor: 'transparent',
          borderWidth: '2gc',
          borderRadius: '8gc',
          cellBorderRadius: '12gc',
          rowGap: '4gc',
          columnGap: '4gc',
          tableBorder: false,
          tableBorderColor: '#0762a4b9',
          tableBorderWidth: '2gc',
          tableBorderRadius: '8gc',
          tableBackground: '#0a1f2e',
          padding: '12gc'
        }

      },



      //quiz question text
      {
        id: 'page6-quiz-question-text',
        name: 'page6-quiz-question-text',
        type: 'custom',
        coordinates: [975, 300, 1570, 550], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          id: 'page6-quiz-question-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page6.quizQuestionText"), // Empty text, just for background
          backgroundColor: '#052642be', // 40% opacity black
          border: '3px solid #094274',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '45gc',
          padding: '0gc',
          textAlign: 'center',
          underlineFirstWord: false,
          allowHTML: true
        }
      },

      //quiz panel
      {
        id: 'page6-quiz-panel',
        name: 'page6-quiz-panel',
        type: 'custom',
        coordinates: [955, 100, 1590, 810], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4G', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page6.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 40, // Question row: 15%
          optionsRowHeight: 35, // Options row: 70%
          feedbackRowHeight: 25, // Feedback row: 15%
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: getI18nText("pages.page6.buttonTextSize"), // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          allowHtml: true,
          options: getI18nText("pages.page6.quizPanel.options"),
          keyConcepts: [],
          impFormulae: [],
          optionButtonWidth: 70, // Override button width percentage (e.g., 80, 90). If null, uses config default
          optionButtonHeight: 60, // Override button height percentage (e.g., 85, 95). If null, uses config default
          onOptionClick: ({ optionIndex, isCorrect }) => {
            const rowItems = [5, 3, 4, 2];
            const getGradient = (color, itemsCount) => {
              const perc = `calc(100% * ${itemsCount} / 6)`;
              return `linear-gradient(to right, ${color} 0%, ${color} ${perc}, transparent ${perc}, transparent 100%)`;
            };

            const colors = {
              correctRow: "#4CAF50",
              wrongRow: "#FA8072",
              greyBg: "rgba(169, 169, 169, 0.4)", // light grey
              salmonBg: "#FA8072" // light salmon
            };

            const applyGradients = (progressMultiplier) => {
              let callbacks = {};
              for (let i = 0; i < 4; i++) {
                let rowColor;
                if (isCorrect) {
                  rowColor = (i === optionIndex) ? colors.correctRow : colors.salmonBg;
                } else {
                  rowColor = (i === optionIndex) ? colors.wrongRow : colors.greyBg;
                }
                const currentItems = rowItems[i] * progressMultiplier;
                callbacks[`${i}-1`] = { backgroundImage: getGradient(rowColor, currentItems) };
              }
              window.tableGridMultipleCallbacks["page6-favorite-fruits-table"](callbacks);
            };

            if (typeof window !== 'undefined' && window.anime) {
              const proxy = { progress: 0 };
              window.anime({
                targets: proxy,
                progress: 100,
                duration: 1000,
                easing: 'easeInOutQuad',
                update: function () {
                  applyGradients(proxy.progress / 100);
                }
              });
            } else {
              applyGradients(1);
            }
          }
        }
      },
      // Instruction Text
      {
        id: 'page6-instruction-text',
        name: 'page6-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page6-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page6.footerInstruction"),
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
        id: 'page6-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page6-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 6 },

          get text() {
            const pageNumber = extractPageNumberFromId('page6-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page6-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.next }));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page6-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.pageChangeEventDispatched', { page: nav.prev }));
              }
            }
          }
        }
      },

    ],
    7: [
      // maintext
      {
        id: "page7-title-text",
        name: "page7-title-text",
        type: "custom",
        coordinates: [10, 10, 1590, 100], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.title"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "orange",
          fontSize: "60gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // maintext
      {
        id: "page7-main-text",
        name: "page7-main-text",
        type: "custom",
        coordinates: [10, 150, 1590, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page7.mainText"),
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
        id: "page7-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 650, 730, 750],
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
        coordinates: [650, 600, 950, 700],
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
                  getI18nText("messages.pageChangeEventDispatched", {
                    page: nav.next,
                  }),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
              );
              window.location.reload();
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
            "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)"
          );
          console.log(
            "🔄 [Navigation] Treating as APP RELOAD with next question"
          );

          // Simplified navigation - always reset to 0
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset")
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log(
            "✅ [Navigation] Updated window.currentQuestionIndex to:",
            newIndex
          );

          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;

          console.log(
            "✅ [Navigation]",
            getI18nText("messages.navigationComplete")
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
            "⚠️ [UI] forceAppUpdate not available, React may not re-render"
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
        typeof window.advanceToNextQuestion
      );
      console.log(
        "🔍 [PageConfig] window.updateQuestionDependentElements type:",
        typeof window.updateQuestionDependentElements
      );
    } catch (error) {
      console.error(
        "❌ [PageConfig] Error in direct function assignment:",
        error
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
            const sourceText = sourceElement.textContent?.trim() || sourceElement.innerText?.trim() || '';
            console.log(`🎯 [PageConfig] Reading text from source ${sourceId}:`, sourceText);

            // Try to update number pad target first (if destination is a number pad)
            if (window.numberPadCallbacks && window.numberPadCallbacks[destinationId]) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(`✅ [PageConfig] Updated number pad ${destinationId} target to:`, sourceText);
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(`✅ [PageConfig] Updated element ${destinationId} text to:`, sourceText);
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(`🔄 [PageConfig] Destination element ${destinationId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
                setTimeout(() => {
                  window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
                }, retryDelay);
              } else {
                console.warn(`⚠️ [PageConfig] Destination element not found: ${destinationId} after ${maxRetries} retries`);
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(`🔄 [PageConfig] Source element ${sourceId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
              setTimeout(() => {
                window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
              }, retryDelay);
            } else {
              console.warn(`⚠️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries`);
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
        console.error('❌ [PageConfig] Error updating target text:', error);
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
      "✅ PageConfig initialized - pages and functions available globally"
    );
    console.log(
      "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states"
    );
    console.log(
      "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element"
    );
  }

  return optimizedPages;
};

// Initialize immediately
console.log("🔄 [PageConfig] About to call initializePageConfig...");
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  "🔄 [PageConfig] initializePageConfig completed, result:",
  typeof OptimizedGridPositionPages
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
