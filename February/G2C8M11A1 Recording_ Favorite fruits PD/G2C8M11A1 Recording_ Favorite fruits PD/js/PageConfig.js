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
  const { correctAnswer, checkCellId, feedbackComponentId, tableId, pageNumber } = config;
  return () => {
    if (typeof window !== 'undefined' && window.playCarClickSound) {
      window.playCarClickSound('next');
    }
    const queries = window.tableGridDropQueries && window.tableGridDropQueries[tableId];
    const feedbackCallback = createFeedbackCallback(feedbackComponentId);
    if (!queries) {
      feedbackCallback(getI18nText('feedback.tryAgain', 'Try again'), 'incorrect');
      return;
    }
    const items = queries.getItemsInCell(checkCellId) || [];

    const count = items.length;
    console.log("👩 count is :-", count)
    if (count === correctAnswer) {
      window.playCarClickSound('correct');
      feedbackCallback(getI18nText('feedback.thatIsCorrect', 'All correct!'), 'correct');
      if (typeof pageNumber === 'number' && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quizCompleted', {
          detail: { componentType: 'TableGridComponent', pageNumber }
        }));
      }
    }
    else if (count > correctAnswer) {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText('feedback.manyStars', 'Try again'), 'incorrect');
    }
    else {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText('feedback.notEnough', 'Try again'), 'incorrect');
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
    return getI18nText("buttons.startOver", "Start Over");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next", "»");
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
      //fruit cloud image
      {
        id: "page1-fruit-cloud-image",
        name: "page1-fruit-cloud-image",
        type: "container",
        coordinates: [150, 200, 800, 650], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',
          backgroundColor: '#052642',
          padding: '15gc',
          border: '3px solid orange',
          borderRadius: '23gc'
        },
      },
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [700, 210, 1550, 600], // Positioned below question text box
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
        coordinates: [650, 700, 730, 820],
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
      //fruit cloud image
      {
        id: "page2-fruit-cloud-image",
        name: "page2-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      //show-Each-Fruit-text
      {
        id: 'page-2-show-Each-Fruit-text',
        name: 'page-2-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
     // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page2-draggable-star',
        name: 'page2-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page2-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: 1,
          isDisabled:true
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page2-favorite-fruits-table',
        name: 'page2-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page2-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page2-table-R1C2', maxItems: 7, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page2-star'), onDrop: createOnDropTableCell(9), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page2-table-R2C2', maxItems: 1, acceptValidator: getAcceptValidatorForBase('page2-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page2-table-R3C2', maxItems: 1, acceptValidator: getAcceptValidatorForBase('page2-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page2-table-R4C2', maxItems: 1, acceptValidator: getAcceptValidatorForBase('page2-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            expectedPlacementCount: 1,
            onAddSuccess: {
              componentId: 'page2-feedback-textbox',
              callback: createFeedbackCallback('page2-feedback-textbox'),
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              getText: (droppableId) => {
                if (droppableId !== 'page2-table-R1C2') return getI18nText('feedback.correct', 'Great job!');
                const tableId = 'page2-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page2-star'] || 0;
                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
              },

            },
            onAddAllSuccess: {
              componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct',

              callback: () => {
                const enableNextEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    componentType: 'TableGridComponent',
                    pageNumber: window.getCurrentPage?.() || null
                  }
                });
                window.dispatchEvent(enableNextEvent);
              }
            },
            onRemove: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.tryAgain', 'Try again'), mode: 'incorrect' },
            onIncorrectDropOutside: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect' },
          },
          placedContentByDraggableId: { 'page2-star': { imageSrc: 'assets/star.png' } },
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
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page2-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page2.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
          imageAlt: 'Tap',
          initialVisible: true
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 3'));
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
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
      //fruit cloud image
      {
        id: "page3-fruit-cloud-image",
        name: "page3-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page3-draggable-star',
        name: 'page3-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: 1
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page3-favorite-fruits-table',
        name: 'page3-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page3-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page3-table-R1C2', maxItems: 7, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page3-star'), onDrop: createOnDropTableCell(9), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page3-table-R2C2', maxItems: 1, acceptValidator: getAcceptValidatorForBase('page3-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page3-table-R3C2', maxItems: 1, acceptValidator: getAcceptValidatorForBase('page3-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page3-table-R4C2', maxItems: 1, acceptValidator: getAcceptValidatorForBase('page3-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            expectedPlacementCount: 1,
            onAddSuccess: {
              componentId: 'page3-feedback-textbox',
              callback: createFeedbackCallback('page3-feedback-textbox'),
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              getText: (droppableId) => {
                if (droppableId !== 'page3-table-R1C2') return getI18nText('feedback.correct', 'Great job!');
                const tableId = 'page3-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page3-star'] || 0;
                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
              },

            },
            onAddAllSuccess: {
              componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct',

              callback: () => {
                const enableNextEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    componentType: 'TableGridComponent',
                    pageNumber: window.getCurrentPage?.() || null
                  }
                });
                window.dispatchEvent(enableNextEvent);
              }
            },
            onRemove: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.tryAgain', 'Try again'), mode: 'incorrect' },
            onIncorrectDropOutside: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect' },
          },
          placedContentByDraggableId: { 'page3-star': { imageSrc: 'assets/star.png' } },
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
      //show-Each-Fruit-text
      {
        id: 'page-2-show-Each-Fruit-text',
        name: 'page-2-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },

      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page3-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page3.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
          imageAlt: 'Tap',
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3', 'Dispatched page change event to page 3'));
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
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
      //fruit cloud image
      {
        id: "page4-fruit-cloud-image",
        name: "page4-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page4-draggable-star',
        name: 'page4-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: 1
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page4-favorite-fruits-table',
        name: 'page4-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page4-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left', 1: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page4-table-R1C2', name: getI18nText("common.fruits.grapes", "Grapes"), maxItems: 7, initialPlacementIds: ['page4-star-initial'], placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page4-star'), onDrop: createOnDropTableCell(9), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page4-table-R2C2', name: getI18nText("common.fruits.apples", "Apples"), maxItems: 1, acceptValidator: getAcceptValidatorForBase('page4-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page4-table-R3C2', name: getI18nText("common.fruits.rambutans", "Rambutans"), maxItems: 1, acceptValidator: getAcceptValidatorForBase('page4-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page4-table-R4C2', name: getI18nText("common.fruits.pineapples", "Pineapples"), maxItems: 1, acceptValidator: getAcceptValidatorForBase('page4-star'), onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            expectedPlacementCount: 1,
            onAddSuccess: {
              componentId: 'page4-feedback-textbox',
              callback: createFeedbackCallback('page4-feedback-textbox'),
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              getText: (droppableId) => {
                if (droppableId !== 'page4-table-R1C2') return getI18nText('feedback.correct', 'Great job!');
                const tableId = 'page4-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = (counts['page4-star'] || 0) + (counts['page4-star-initial'] || 0);
                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
              },

            },
            onAddAllSuccess: {
              componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct',

              callback: () => {
                const enableNextEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    componentType: 'TableGridComponent',
                    pageNumber: window.getCurrentPage?.() || null
                  }
                });
                window.dispatchEvent(enableNextEvent);
              }
            },
            onRemove: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.tryAgain', 'Try again'), mode: 'incorrect' },
            onIncorrectDropOutside: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect' },
          },
          placedContentByDraggableId: { 'page4-star': { imageSrc: 'assets/star.png' }, 'page4-star-initial': { imageSrc: 'assets/star.png' } },
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
      //show-Each-Fruit-text
      {
        id: 'page-2-show-Each-Fruit-text',
        name: 'page-2-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },

      // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
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
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page4-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page4.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
          imageAlt: 'Tap',
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage4', 'Dispatched page change event to page 3'));
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
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
      //fruit cloud image
      {
        id: "page5-fruit-cloud-image",
        name: "page5-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page5-draggable-star',
        name: 'page5-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page5-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          isDisabled: true,
          spawnCount: 1
        }
      },
      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page5-favorite-fruits-table',
        name: 'page5-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page5-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left', 1: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page5-table-R1C2', name: getI18nText("common.fruits.grapes", "Grapes"), maxItems: 7, initialPlacementIds: ['page5-star-initial-1', 'page5-star-initial-2'], placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page5-star'), onDrop: createOnDropTableCell(9), enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page5-table-R2C2', name: getI18nText("common.fruits.apples", "Apples"), maxItems: 1, acceptValidator: getAcceptValidatorForBase('page5-star'), onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page5-table-R3C2', name: getI18nText("common.fruits.rambutans", "Rambutans"), maxItems: 1, acceptValidator: getAcceptValidatorForBase('page5-star'), onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page5-table-R4C2', name: getI18nText("common.fruits.pineapples", "Pineapples"), maxItems: 1, acceptValidator: getAcceptValidatorForBase('page5-star'), onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            expectedPlacementCount: 1,
            onAddSuccess: {
              componentId: 'page5-feedback-textbox',
              callback: createFeedbackCallback('page5-feedback-textbox'),
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              getText: (droppableId) => {
                if (droppableId !== 'page5-table-R1C2') return getI18nText('feedback.correct', 'Great job!');
                const tableId = 'page5-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = (counts['page5-star'] || 0) + (counts['page5-star-initial-1'] || 0) + (counts['page5-star-initial-2'] || 0);
                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
              },

            },
            onAddAllSuccess: {
              componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct',

              callback: () => {
                const enableNextEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    componentType: 'TableGridComponent',
                    pageNumber: window.getCurrentPage?.() || null
                  }
                });
                window.dispatchEvent(enableNextEvent);
              }
            },
            onRemove: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.tryAgain', 'Try again'), mode: 'incorrect' },
            onIncorrectDropOutside: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect' },
            afterRemoveFromCell: {
              'page5-table-R1C2': () => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('quizCompleted', {
                    detail: { componentType: 'TableGridComponent', pageNumber: window.getCurrentPage?.() ?? 5 }
                  }));
                }
              }
            }
          },
          placedContentByDraggableId: { 'page5-star': { imageSrc: 'assets/star.png' }, 'page5-star-initial-1': { imageSrc: 'assets/star.png' }, 'page5-star-initial-2': { imageSrc: 'assets/star.png' } },
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
      //show-Each-Fruit-text
      {
        id: 'page-2-show-Each-Fruit-text',
        name: 'page-2-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },

      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
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
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page5-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page5.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
          imageAlt: 'Tap',
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage5', 'Dispatched page change event to page 3'));
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
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    6: [

      // maintext
      {
        id: "page6-main-text",
        name: "page6-main-text",
        type: "custom",
        coordinates: [100, 210, 1500, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.mainText", ""),
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
        id: "page6-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 700, 730, 820],
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
        coordinates: [650, 700, 950, 800],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.begin");
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
    7: [
      //header text
      {
        id: 'page7-headertext',
        name: 'page7-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page7.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //fruit cloud image
      {
        id: "page7-fruit-cloud-image",
        name: "page7-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page7-draggable-star',
        name: 'page7-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page7-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: -1
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page7-favorite-fruits-table',
        name: 'page7-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page7-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page7-table-R1C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page7-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page7-table-R2C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page7-table-R3C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page7-table-R4C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page7-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page7-feedback-textbox')(text, mode);
              },
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',

              getText: (droppableId) => {
                if (droppableId !== 'page7-table-R1C2') return getI18nText('feedback.correct', 'Great job!');
                const tableId = 'page7-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page7-star'] || 0;
                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
              },
            },
            onAddAllSuccess: { componentId: 'page7-feedback-textbox', callback: createFeedbackCallback('page7-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct' },
            onRemove: { componentId: 'page7-feedback-textbox', callback: createFeedbackCallback('page7-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page7-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page7-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.placeStarsInGrapesRow', 'Oops! Place the stars in the grapes row.'), mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page7-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page7-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page7-star': { imageSrc: 'assets/star.png' } },
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
      //show-Each-Fruit-text
      {
        id: 'page7-show-Each-Fruit-text',
        name: 'page7-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page7-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [80, 650, 280, 720],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page7CheckConfig = {
            correctAnswer: 6,
            checkCellId: 'page7-table-R1C2',
            feedbackComponentId: 'page7-feedback-textbox',
            tableId: 'page7-favorite-fruits-table',
            pageNumber: 7
          };
          return {
            text: getI18nText('buttons.check', 'Check'),
            ...page7CheckConfig,
            onClick: createTableCheckHandler(page7CheckConfig)
          };
        })()
      },

      // Feedback Textbox Component
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
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
        id: 'page7-instruction-text',
        name: 'page7-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page7-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page7.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page7-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 7 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page7-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page7-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3', 'Dispatched page change event to page 6'));
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
        id: 'page7-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page7-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page7-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    8: [
      //header text
      {
        id: 'page8-headertext',
        name: 'page8-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page8.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //fruit cloud image
      {
        id: "page8-fruit-cloud-image",
        name: "page8-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page8-draggable-star',
        name: 'page8-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page8-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: -1
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page8-favorite-fruits-table',
        name: 'page8-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page8-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page8-table-R1C2', maxItems: 8, initialPlacementIds: ['page8-star-initial-1', 'page8-star-initial-2', 'page8-star-initial-3', 'page8-star-initial-4', 'page8-star-initial-5', 'page8-star-initial-6'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 1, colIndex: 1, droppableId: 'page8-table-R2C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page8-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page8-table-R3C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page8-table-R4C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page8-feedback-textbox',
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page8-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => {
                if (droppableId !== 'page8-table-R2C2')
                  return getI18nText('feedback.correct', 'Great job!');

                const tableId = 'page8-favorite-fruits-table';
                const queries =
                  typeof window !== 'undefined' &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];

                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page8-star'] || 0;

                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord
                });
              }
            },
            onAddAllSuccess: { componentId: 'page8-feedback-textbox', callback: createFeedbackCallback('page8-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct' },
            onRemove: { componentId: 'page8-feedback-textbox', callback: createFeedbackCallback('page8-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page8-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page8-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.placeStarsInAppleRow', 'Oops! Place the stars in the grapes row.'), mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page8-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page8-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page8-star': { imageSrc: 'assets/star.png' }, 'page8-star-initial-1': { imageSrc: 'assets/star.png' }, 'page8-star-initial-2': { imageSrc: 'assets/star.png' }, 'page8-star-initial-3': { imageSrc: 'assets/star.png' }, 'page8-star-initial-4': { imageSrc: 'assets/star.png' }, 'page8-star-initial-5': { imageSrc: 'assets/star.png' }, 'page8-star-initial-6': { imageSrc: 'assets/star.png' } },

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
      //show-Each-Fruit-text
      {
        id: 'page8-show-Each-Fruit-text',
        name: 'page8-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page8-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [80, 650, 280, 720],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page8CheckConfig = {
            correctAnswer: 5,
            checkCellId: 'page8-table-R2C2',
            feedbackComponentId: 'page8-feedback-textbox',
            tableId: 'page8-favorite-fruits-table',
            pageNumber: 8
          };
          return {
            text: getI18nText('buttons.check', 'Check'),
            ...page8CheckConfig,
            onClick: createTableCheckHandler(page8CheckConfig)
          };
        })()
      },

      // Feedback Textbox Component
      {
        id: "page8-feedback-textbox",
        name: "page8-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page8-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
        id: 'page8-instruction-text',
        name: 'page8-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page8-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page8.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
        id: 'page8-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page8-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 8 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page8-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page8-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3', 'Dispatched page change event to page 6'));
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
        id: 'page8-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page8-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page8-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    9: [
      //header text
      {
        id: 'page9-headertext',
        name: 'page9-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page9.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //fruit cloud image
      {
        id: "page9-fruit-cloud-image",
        name: "page9-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page9-draggable-star',
        name: 'page9-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page9-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: -1
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page9-favorite-fruits-table',
        name: 'page9-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page9-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page9-table-R1C2', maxItems: 8, initialPlacementIds: ['page9-star-initial-1', 'page9-star-initial-2', 'page9-star-initial-3', 'page9-star-initial-4', 'page9-star-initial-5', 'page9-star-initial-6'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 1, colIndex: 1, droppableId: 'page9-table-R2C2', maxItems: 8, initialPlacementIds: ['page9-star-initial-1', 'page9-star-initial-2', 'page9-star-initial-3', 'page9-star-initial-4', 'page9-star-initial-5'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: false },
            { rowIndex: 2, colIndex: 1, droppableId: 'page9-table-R3C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page9-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 3, colIndex: 1, droppableId: 'page9-table-R4C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page9-feedback-textbox',
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page9-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => {
                if (droppableId !== 'page9-table-R3C2')
                  return getI18nText('feedback.correct', 'Great job!');

                const tableId = 'page9-favorite-fruits-table';
                const queries =
                  typeof window !== 'undefined' &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];

                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page9-star'] || 0;

                const grapeWord = grapeCount === 1 ? 'Rambutan' : 'Rambutans';
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord
                });
              }
            },
            onAddAllSuccess: { componentId: 'page9-feedback-textbox', callback: createFeedbackCallback('page9-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct' },
            onRemove: { componentId: 'page9-feedback-textbox', callback: createFeedbackCallback('page9-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page9-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page9-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.placeStarsInRambutansRow', 'Oops! Place the stars in the grapes row.'), mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page9-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page9-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page9-star': { imageSrc: 'assets/star.png' }, 'page9-star-initial-1': { imageSrc: 'assets/star.png' }, 'page9-star-initial-2': { imageSrc: 'assets/star.png' }, 'page9-star-initial-3': { imageSrc: 'assets/star.png' }, 'page9-star-initial-4': { imageSrc: 'assets/star.png' }, 'page9-star-initial-5': { imageSrc: 'assets/star.png' }, 'page9-star-initial-6': { imageSrc: 'assets/star.png' } },

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
      //show-Each-Fruit-text
      {
        id: 'page9-show-Each-Fruit-text',
        name: 'page9-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page9-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [80, 650, 280, 720],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page9CheckConfig = {
            correctAnswer: 3,
            checkCellId: 'page9-table-R3C2',
            feedbackComponentId: 'page9-feedback-textbox',
            tableId: 'page9-favorite-fruits-table',
            pageNumber: 9
          };
          return {
            text: getI18nText('buttons.check', 'Check'),
            ...page9CheckConfig,
            onClick: createTableCheckHandler(page9CheckConfig)
          };
        })()
      },

      // Feedback Textbox Component
      {
        id: "page9-feedback-textbox",
        name: "page9-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page9-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
        id: 'page9-instruction-text',
        name: 'page9-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page9-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page9.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
        id: 'page9-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page9-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 9 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page9-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page9-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3', 'Dispatched page change event to page 6'));
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
        id: 'page9-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page9-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page9-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    10: [
      //header text
      {
        id: 'page10-headertext',
        name: 'page10-headertext',
        type: 'custom',
        coordinates: [10, 10, 1595, 100], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page10.headerText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //fruit cloud image
      {
        id: "page10-fruit-cloud-image",
        name: "page10-fruit-cloud-image",
        type: "container",
        coordinates: [10, 120, 700, 550], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/fruitCloud.png',

        },
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page10-draggable-star',
        name: 'page10-draggable-star',
        type: 'custom',
        coordinates: [450, 565, 650, 635],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page10-star',
          imageSrc: 'assets/star.png',
          imageAlt: 'Star',
          spawnCount: -1
        }
      },

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page10-favorite-fruits-table',
        name: 'page10-favorite-fruits-table',
        type: 'custom',
        coordinates: [711, 256, 1500, 775],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page10-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.favoriteFruit", "Favorite Fruits Picture Diagram"), colSpan: 2 }],
            rows: [
              [getI18nText("common.fruits.grapes", "Grapes"), ''],
              [getI18nText("common.fruits.apples", "Apples"), ''],
              [getI18nText("common.fruits.rambutans", "Rambutans"), ''],
              [getI18nText("common.fruits.pineapples", "Pineapples"), ''],
              [{ text: getI18nText("common.eachStart1Fruit", "*Each star = 1 fruit"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
          rowOverrides: { 4: { fontSize: '28gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page10-table-R1C2', maxItems: 8, initialPlacementIds: ['page10-star-initial-1', 'page10-star-initial-2', 'page10-star-initial-3', 'page10-star-initial-4', 'page10-star-initial-5', 'page10-star-initial-6'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 1, colIndex: 1, droppableId: 'page10-table-R2C2', maxItems: 8, initialPlacementIds: ['page10-star-initial-1', 'page10-star-initial-2', 'page10-star-initial-3', 'page10-star-initial-4', 'page10-star-initial-5'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 2, colIndex: 1, droppableId: 'page10-table-R3C2', maxItems: 8, initialPlacementIds: ['page10-star-initial-1', 'page10-star-initial-2', 'page10-star-initial-3'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: false },
            { rowIndex: 3, colIndex: 1, droppableId: 'page10-table-R4C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page10-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true }
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page10-feedback-textbox',
              text: getI18nText('feedback.correct', 'Great job!'),
              mode: 'correct',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page10-feedback-textbox')(text, mode);
              },
              getText: (droppableId) => {
                if (droppableId !== 'page10-table-R4C2')
                  return getI18nText('feedback.correct', 'Great job!');

                const tableId = 'page10-favorite-fruits-table';
                const queries =
                  typeof window !== 'undefined' &&
                  window.tableGridDropQueries &&
                  window.tableGridDropQueries[tableId];

                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page10-star'] || 0;

                const grapeWord = grapeCount === 1 ? 'Pineapple' : 'Pineapples';
                return getI18nText("feedback.placedStar", null, {
                  num: grapeCount,
                  fruit: grapeWord
                });
              }
            },
            onAddAllSuccess: { componentId: 'page10-feedback-textbox', callback: createFeedbackCallback('page10-feedback-textbox'), text: getI18nText('feedback.allCorrect', 'All correct!'), mode: 'correct' },
            onRemove: { componentId: 'page10-feedback-textbox', callback: createFeedbackCallback('page10-feedback-textbox'), text: getI18nText('feedback.itemRemoved', 'Item removed'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page10-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('wrong');
                createFeedbackCallback('page10-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.placeStarsInPineapplesRow', 'Oops! Place the stars in the grapes row.'), mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page10-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page10-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell', 'Drop inside the cell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page10-star': { imageSrc: 'assets/star.png' }, 'page10-star-initial-1': { imageSrc: 'assets/star.png' }, 'page10-star-initial-2': { imageSrc: 'assets/star.png' }, 'page10-star-initial-3': { imageSrc: 'assets/star.png' }, 'page10-star-initial-4': { imageSrc: 'assets/star.png' }, 'page10-star-initial-5': { imageSrc: 'assets/star.png' }, 'page10-star-initial-6': { imageSrc: 'assets/star.png' } },

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
      //show-Each-Fruit-text
      {
        id: 'page10-show-Each-Fruit-text',
        name: 'page10-show-Each-Fruit-text',
        type: 'custom',
        coordinates: [80, 580, 550, 630], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.showEachFruit"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page10-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [80, 650, 280, 720],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page10CheckConfig = {
            correctAnswer: 2,
            checkCellId: 'page10-table-R4C2',
            feedbackComponentId: 'page10-feedback-textbox',
            tableId: 'page10-favorite-fruits-table',
            pageNumber: 10
          };
          return {
            text: getI18nText('buttons.check', 'Check'),
            ...page10CheckConfig,
            onClick: createTableCheckHandler(page10CheckConfig)
          };
        })()
      },

      // Feedback Textbox Component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
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
        id: 'page10-instruction-text',
        name: 'page10-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page10-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page10.footerInstruction',
            "Tap » to identify 'given' information"
          ),
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
        id: 'page10-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          initialVisible: false
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page10-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 10 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page10-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page10-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3', 'Dispatched page change event to page 6'));
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
        id: 'page10-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page10-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page10-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
        }
      },

    ],
    11: [
      //fruit cloud image
      {
        id: "page11-fruit-cloud-image",
        name: "page11-fruit-cloud-image",
        type: "container",
        coordinates: [150, 200, 800, 650], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: getI18nText("pages.page11.summaryImage"),
        },
      },
      // maintext
      {
        id: "page11-main-text",
        name: "page11-main-text",
        type: "custom",
        coordinates: [700, 210, 1550, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page11.mainText", ""),
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
        id: "page11-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 750, 730, 840],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page11-next-button",
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
                  getI18nText("messages.nextButtonPage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              window.location.reload();
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
            getI18nText("messages.navigationReset", "Resetting to question 1")
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
            getI18nText(
              "messages.navigationComplete",
              "Complete app reset completed - ready for new question"
            )
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
        return getI18nText("buttons.startOver", "Start Over");
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
        if (
          confirm(
            getI18nText(
              "messages.pageStatesCleared",
              "Page states have been cleared. Reload the page to start fresh?"
            )
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
