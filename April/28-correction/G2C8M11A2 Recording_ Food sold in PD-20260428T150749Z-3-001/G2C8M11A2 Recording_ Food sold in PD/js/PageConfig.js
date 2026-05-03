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

function isDroppableAtMaxItems(droppableId, maxItemsByDroppableId = {}) {
  if (!droppableId) return false;
  const maxItems = maxItemsByDroppableId[droppableId];
  if (typeof maxItems !== 'number' || maxItems <= 0) return false;
  const placementsMap = (typeof window !== 'undefined' && window.dragDropPlacements) ? window.dragDropPlacements : {};
  const placed = placementsMap[droppableId];
  const placedCount = Array.isArray(placed) ? placed.length : (placed ? 1 : 0);
  return placedCount >= maxItems;
}

/** Normalize placement value to array (handles both legacy single id and array) */
function toPlacementArray(val) {
  if (val == null) return [];
  return Array.isArray(val) ? val : [val];
}

function getTableCheckButtonState(buttonId) {
  if (typeof window === 'undefined' || !buttonId) {
    return { disabled: true, completed: false };
  }
  window.tableCheckButtonStates = window.tableCheckButtonStates || {};
  if (!window.tableCheckButtonStates[buttonId]) {
    window.tableCheckButtonStates[buttonId] = { disabled: true, completed: false };
  }
  return window.tableCheckButtonStates[buttonId];
}

function applyCheckButtonDisabledState(buttonId, disabled) {
  if (typeof document === 'undefined' || !buttonId) return;

  const pageMatch = String(buttonId).match(/page(\d+)/);
  const targetPage = pageMatch ? parseInt(pageMatch[1], 10) : null;
  const currentPage = typeof window !== 'undefined' && typeof window.getCurrentPage === 'function'
    ? window.getCurrentPage()
    : null;

  if (targetPage && currentPage && targetPage !== currentPage) return;

  const checkText = String(getI18nText('buttons.check', 'Check') || 'Check').trim().toLowerCase();
  const candidates = Array.from(document.querySelectorAll('.previous-button-container, .previous-button.math-app-button'));

  candidates.forEach((element) => {
    const label = (element.textContent || '').trim().toLowerCase();
    if (label !== checkText) return;

    element.style.opacity = disabled ? '0.5' : '1';
    element.style.cursor = disabled ? 'not-allowed' : 'pointer';
    element.style.pointerEvents = disabled ? 'none' : 'auto';
    element.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  });
}

function dispatchButtonDisabledState(buttonId, disabled, options = {}) {
  if (typeof window === 'undefined' || !buttonId) return;

  const state = getTableCheckButtonState(buttonId);
  if (typeof options.completed === 'boolean') {
    state.completed = options.completed;
  }
  state.disabled = !!disabled;

  applyCheckButtonDisabledState(buttonId, state.disabled);

  window.dispatchEvent(new CustomEvent('buttonDisabledStateChange', {
    detail: { buttonId, disabled: state.disabled, completed: state.completed }
  }));
}

function dispatchInstructionTextUpdate(pageNumber, textKey, fallback) {
  if (typeof window === 'undefined' || typeof pageNumber !== 'number') return;

  window.dispatchEvent(new CustomEvent('pageInstructionTextUpdate', {
    detail: {
      pageNumber,
      text: getI18nText(textKey, fallback)
    }
  }));
}

function registerTableCheckButtonState(config) {
  const { buttonId, tableId, checkCellId, pageNumber } = config || {};
  if (typeof window === 'undefined' || !buttonId || !tableId || !checkCellId) return;

  window.tableCheckButtonStateRegistrations = window.tableCheckButtonStateRegistrations || {};
  if (window.tableCheckButtonStateRegistrations[buttonId]) return;

  const buttonState = getTableCheckButtonState(buttonId);

  const updateButtonState = () => {
    const queries = window.tableGridDropQueries && window.tableGridDropQueries[tableId];
    const items = queries ? queries.getItemsInCell(checkCellId) || [] : [];
    const count = items.length;

    if (count === 0) {
      buttonState.completed = false;
    }

    dispatchButtonDisabledState(buttonId, buttonState.completed || count === 0, {
      completed: buttonState.completed
    });
  };

  const scheduleUpdate = () => {
    setTimeout(updateButtonState, 0);
    setTimeout(updateButtonState, 120);
  };

  const handleQuizCompleted = (event) => {
    if (typeof pageNumber === 'number' && event?.detail?.pageNumber !== pageNumber) return;
    dispatchButtonDisabledState(buttonId, true, { completed: true });
  };

  window.addEventListener('dragDropPlacement', scheduleUpdate);
  window.addEventListener('pageChanged', scheduleUpdate);
  if (typeof pageNumber === 'number') {
    window.addEventListener('quizCompleted', handleQuizCompleted);
  }

  window.tableCheckButtonStateRegistrations[buttonId] = true;
  scheduleUpdate();
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
  const { correctAnswer, checkCellId, feedbackComponentId, tableId, pageNumber, buttonId } = config;
  return () => {
    const buttonState = buttonId && typeof window !== 'undefined' && window.tableCheckButtonStates
      ? window.tableCheckButtonStates[buttonId]
      : null;

    if (buttonState?.disabled) {
      return;
    }

    if (typeof window !== 'undefined' && window.playCarClickSound) {
      window.playCarClickSound('next');
    }
    const queries = window.tableGridDropQueries && window.tableGridDropQueries[tableId];
    const feedbackCallback = createFeedbackCallback(feedbackComponentId);
    if (!queries) {
      feedbackCallback(getI18nText('feedback.tryAgain'), 'incorrect');
      return;
    }
    const items = queries.getItemsInCell(checkCellId) || [];

    const count = items.length;
    console.log("👩 count is :-", count)
    if (count === correctAnswer) {
      window.playCarClickSound('correct');
      feedbackCallback(getI18nText('feedback.thatIsCorrect'), 'correct');
      if (buttonId) {
        dispatchButtonDisabledState(buttonId, true, { completed: true });
      }
      if (typeof pageNumber === 'number' && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quizCompleted', {
          detail: { componentType: 'TableGridComponent', pageNumber }
        }));
      }
    }
    else if (count > correctAnswer) {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText('feedback.manyStars'), 'incorrect');
      if (pageNumber === 3 || pageNumber === 4 || pageNumber === 5) {
        dispatchInstructionTextUpdate(
          pageNumber,
          `pages.page${pageNumber}.footerInstructionMoreCircle`,
          'Drag the extra shapes out of the diagram to take them away.'
        );
      }
      if (buttonId) {
        dispatchButtonDisabledState(buttonId, false, { completed: false });
      }
    }
    else {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText('feedback.notEnough'), 'incorrect');
      if (pageNumber === 3 || pageNumber === 4 || pageNumber === 5) {
        dispatchInstructionTextUpdate(
          pageNumber,
          `pages.page${pageNumber}.footerInstruction`,
          "Drag the correct shape to the correct row. Then tap 'Check'."
        );
      }
      if (buttonId) {
        dispatchButtonDisabledState(buttonId, false, { completed: false });
      }
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
        id: 'page2-headertext',
        name: 'page2-headertext',
        type: 'custom',
        coordinates: [0, 0, 1600, 80], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.headerText"), // Empty text, just for background
          backgroundColor: '#2D414F', // 40% opacity black
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
        coordinates: [10, 10, 700, 450], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/snacksImages.png',

        },
      },
      //shape-background
      {
        id: 'page2-shape-background',
        name: 'page2-shape-background',
        type: 'custom',
        coordinates: [10, 340, 690, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#052642c9', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page3-draggable-white-circle',
        name: 'page3-draggable-white-circle',
        type: 'custom',
        coordinates: [480, 410, 580, 490],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-white-circle',
          imageSrc: 'assets/whiteCircle.png',
          imageAlt: getI18nText('common.imageAlt.whiteCircle'),
          spawnCount: -1,
          isDisabled: true,
          blinkOnEvent: { eventName: 'page3-blink-white-circle', durationMs: 1000, pulseScale: 1.2 },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 }
        }
      },
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page3-draggable-pink-circle',
        name: 'page3-draggable-pink-circle',
        type: 'custom',
        coordinates: [480, 500, 580, 580],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-pink-circle',
          imageSrc: 'assets/pinkCircle.png',
          imageAlt: getI18nText('common.imageAlt.pinkCircle'),
          spawnCount: -1,
          isDisabled: true,
          pulseOnEvent: { eventName: 'page3-pulse-pink-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 }
        }
      },
      {
        id: 'page3-draggable-yellow-circle',
        name: 'page3-draggable-yellow-circle',
        type: 'custom',
        coordinates: [480, 590, 580, 670],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-yellow-circle',
          imageSrc: 'assets/yellowCircle.png',
          imageAlt: getI18nText('common.imageAlt.yellowCircle'),
          spawnCount: -1,
          isDisabled: true,
          pulseOnEvent: { eventName: 'page3-pulse-yellow-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 }
        }
      },
      //use these shapes text
      {
        id: 'page3-use-these-shape-text',
        name: 'page3-use-these-shape-text',
        type: 'custom',
        coordinates: [80, 360, 550, 400], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      //options text
      {
        id: 'page3-option-text',
        name: 'page3-option-text',
        type: 'custom',
        coordinates: [220, 490, 550, 590], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '38gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
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
            headers: [{ text: getI18nText("common.foodSold"), colSpan: 2 }],
            rows: [
              [getI18nText("common.snacks.iceCream"), ''],
              [getI18nText("common.snacks.sandwiches"), ''],
              [getI18nText("common.snacks.pizzas"), ''],
              [{ text: getI18nText("common.eachShape"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', },
          rowOverrides: { 3: { fontSize: '36gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page2-table-R1C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page2-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page2-table-R2C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page2-table-R3C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: false, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
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
                if (droppableId !== 'page2-table-R1C2') return getI18nText('feedback.correct');
                const tableId = 'page2-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page2-star'] || 0;
                const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
                return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
              },
            },
            onAddAllSuccess: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page2-feedback-textbox', callback: createFeedbackCallback('page2-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page2-feedback-textbox', callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');
                const isFull = isDroppableAtMaxItems(context?.droppableId, {
                  'page2-table-R1C2': 8,
                  'page2-table-R2C2': 1,
                  'page2-table-R3C2': 1,
                });
                const nextText = isFull
                  ? getI18nText('feedback.dropExceedMaxItems', 'Oops! This row is full.')
                  : text;
                createFeedbackCallback('page2-feedback-textbox')(nextText, mode);
              }, text: getI18nText('feedback.placeStarsInGrapesRow'), mode: 'incorrect'
            },
            onIncorrectDropOutside: {
              componentId: 'page2-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page2-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
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
        coordinates: [705, 100, 1595, 240], // Position below the table and options container
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
          text: getI18nText('pages.page2.footerInstruction'),
          backgroundColor: '#2D414F',
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
          imageAlt: getI18nText('common.tapAlt'),

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
        coordinates: [0, 0, 1600, 80], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.headerText"), // Empty text, just for background
          backgroundColor: '#2D414F', // 40% opacity black
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
        coordinates: [10, 10, 700, 450], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/snacksImages.png',

        },
      },
      //shape-background
      {
        id: 'page4-shape-background',
        name: 'page4-shape-background',
        type: 'custom',
        coordinates: [10, 340, 690, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#052642c9', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page3-draggable-white-circle',
        name: 'page3-draggable-white-circle',
        type: 'custom',
        coordinates: [480, 410, 580, 490],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-white-circle',
          imageSrc: 'assets/whiteCircle.png',
          imageAlt: getI18nText('common.imageAlt.whiteCircle'),
          spawnCount: -1,
          isDisabled: false,
          blinkOnEvent: { eventName: 'page3-blink-white-circle', durationMs: 1000, pulseScale: 1.2 },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 }
        }
      },
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page3-draggable-pink-circle',
        name: 'page3-draggable-pink-circle',
        type: 'custom',
        coordinates: [480, 500, 580, 580],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-pink-circle',
          imageSrc: 'assets/pinkCircle.png',
          imageAlt: getI18nText('common.imageAlt.pinkCircle'),
          spawnCount: -1,
          isDisabled: false,
          pulseOnEvent: { eventName: 'page3-pulse-pink-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 }
        }
      },
      {
        id: 'page3-draggable-yellow-circle',
        name: 'page3-draggable-yellow-circle',
        type: 'custom',
        coordinates: [480, 590, 580, 670],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page3-yellow-circle',
          imageSrc: 'assets/yellowCircle.png',
          imageAlt: getI18nText('common.imageAlt.yellowCircle'),
          spawnCount: -1,
          isDisabled: false,
          pulseOnEvent: { eventName: 'page3-pulse-yellow-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 }
        }
      },
      //use these shapes text
      {
        id: 'page3-use-these-shape-text',
        name: 'page3-use-these-shape-text',
        type: 'custom',
        coordinates: [80, 360, 550, 400], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      //options text
      {
        id: 'page3-option-text',
        name: 'page3-option-text',
        type: 'custom',
        coordinates: [220, 490, 550, 590], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '38gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page3-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [260, 700, 460, 770],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page3CheckConfig = {
            buttonId: 'page3-check-button',
            correctAnswer: 7,
            checkCellId: 'page3-table-R1C2',
            feedbackComponentId: 'page3-feedback-textbox',
            tableId: 'page3-favorite-fruits-table',
            pageNumber: 3
          };
          registerTableCheckButtonState(page3CheckConfig);
          return {
            text: getI18nText('buttons.check'),
            ...page3CheckConfig,
            onClick: createTableCheckHandler(page3CheckConfig)
          };
        })()
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
            headers: [{ text: getI18nText("common.foodSold"), colSpan: 2 }],
            rows: [
              [getI18nText("common.snacks.iceCream"), ''],
              [getI18nText("common.snacks.sandwiches"), ''],
              [getI18nText("common.snacks.pizzas"), ''],
              [{ text: getI18nText("common.eachShape"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', },
          rowOverrides: { 3: { fontSize: '36gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page3-table-R1C2', maxItems: 8, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page3-white-circle'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page3-table-R2C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page3-table-R3C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
          ],
          placedItemDisableOnEvent: { eventName: 'quizCompleted', pageNumber: 3 },
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page3-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page3-feedback-textbox')(text, mode);
              },
              // text: getI18nText('feedback.correct'),
              // mode: 'correct',

              // getText: (droppableId) => {
              //   if (droppableId !== 'page3-table-R1C2') return getI18nText('feedback.correct');
              //   const tableId = 'page3-favorite-fruits-table';
              //   const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
              //   const counts = queries ? queries.getItemCountsByType(droppableId) : {};
              //   const grapeCount = counts['page3-white-circle'] || 0;
              //   const grapeWord = grapeCount === 1 ? getI18nText('common.iceCream') : getI18nText('common.snacks.iceCream');
              //   return getI18nText("feedback.placedShape", null, { num: grapeCount, fruit: grapeWord })
              // },
            },
            onAddAllSuccess: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page3-feedback-textbox', callback: createFeedbackCallback('page3-feedback-textbox'), text: "", mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page3-feedback-textbox',
              callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');
                const isFull = isDroppableAtMaxItems(context?.droppableId, {
                  'page3-table-R1C2': 8,
                  'page3-table-R2C2': 1,
                  'page3-table-R3C2': 1,
                });
                if (isFull) {
                  createFeedbackCallback('page3-feedback-textbox')(
                    getI18nText('feedback.dropExceedMaxItems', 'Oops! This row is full.'),
                    'incorrect'
                  );
                  return;
                }

                const draggableId = context?.draggableId;

                let feedbackText;

                if (draggableId?.startsWith('page3-white-circle')) {
                  feedbackText = getI18nText('feedback.placeIceCreamRow');
                } else {
                  feedbackText = getI18nText('feedback.chooseCorrectShape');
                }

                createFeedbackCallback('page3-feedback-textbox')(
                  feedbackText,
                  'incorrect'
                );
                // Only when pink or yellow was dropped: after circle is back, blink white and pulse the dropped circle
                const isPinkOrYellow = draggableId?.startsWith('page3-pink-circle') || draggableId?.startsWith('page3-yellow-circle');
                if (typeof window !== 'undefined' && isPinkOrYellow) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page3-blink-white-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page3-pink-circle')) {
                      window.dispatchEvent(new CustomEvent('page3-pulse-pink-circle'));
                    } else if (draggableId.startsWith('page3-yellow-circle')) {
                      window.dispatchEvent(new CustomEvent('page3-pulse-yellow-circle'));
                    }
                  }, 500);
                }
              }
            },
            onIncorrectDropOutside: {
              componentId: 'page3-feedback-textbox', callback: (text, mode, context) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page3-feedback-textbox')(text, mode);
                const draggableId = context?.draggableId;
                // Only when pink or yellow was dropped: after circle is back, blink white and pulse the dropped circle
                const isPinkOrYellow = draggableId?.startsWith('page3-pink-circle') || draggableId?.startsWith('page3-yellow-circle');
                if (typeof window !== 'undefined' && isPinkOrYellow) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page3-blink-white-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page3-pink-circle')) {
                      window.dispatchEvent(new CustomEvent('page3-pulse-pink-circle'));
                    } else if (draggableId.startsWith('page3-yellow-circle')) {
                      window.dispatchEvent(new CustomEvent('page3-pulse-yellow-circle'));
                    }
                  }, 500);
                }
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page3-white-circle': { imageSrc: 'assets/whiteCircle.png' } },
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
          text: getI18nText('pages.page3.footerInstruction'),
          backgroundColor: '#2D414F',
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
          imageAlt: getI18nText('common.tapAlt'),
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage3'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
        coordinates: [0, 0, 1600, 80], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.headerText"), // Empty text, just for background
          backgroundColor: '#2D414F', // 40% opacity black
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
        coordinates: [10, 10, 700, 450], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/snacksImages.png',

        },
      },
      //shape-background
      {
        id: 'page4-shape-background',
        name: 'page4-shape-background',
        type: 'custom',
        coordinates: [10, 340, 690, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#052642c9', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page4-draggable-white-circle',
        name: 'page4-draggable-white-circle',
        type: 'custom',
        coordinates: [480, 410, 580, 490],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-white-circle',
          imageSrc: 'assets/whiteCircle.png',
          imageAlt: getI18nText('common.imageAlt.whiteCircle'),
          spawnCount: -1,
          isDisabled: false,
          pulseOnEvent: { eventName: 'page4-pulse-white-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 4 }
        }
      },
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page4-draggable-pink-circle',
        name: 'page4-draggable-pink-circle',
        type: 'custom',
        coordinates: [480, 500, 580, 580],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-pink-circle',
          imageSrc: 'assets/pinkCircle.png',
          imageAlt: getI18nText('common.imageAlt.pinkCircle'),
          spawnCount: -1,
          isDisabled: false,
          blinkOnEvent: { eventName: 'page4-blink-pink-circle', durationMs: 1000, pulseScale: 1.2 },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 4 }
        }
      },
      {
        id: 'page4-draggable-yellow-circle',
        name: 'page4-draggable-yellow-circle',
        type: 'custom',
        coordinates: [480, 590, 580, 670],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-yellow-circle',
          imageSrc: 'assets/yellowCircle.png',
          imageAlt: getI18nText('common.imageAlt.yellowCircle'),
          spawnCount: -1,
          isDisabled: false,
          pulseOnEvent: { eventName: 'page4-pulse-yellow-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 4 }
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
            headers: [{ text: getI18nText("common.foodSold"), colSpan: 2 }],
            rows: [
              [getI18nText("common.snacks.iceCream"), ''],
              [getI18nText("common.snacks.sandwiches"), ''],
              [getI18nText("common.snacks.pizzas"), ''],
              [{ text: getI18nText("common.eachShape"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', },
          rowOverrides: { 3: { fontSize: '36gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page4-table-R1C2', maxItems: 8, placementDirection: 'horizontal', initialPlacementIds: ['page4-white-circle-1', 'page4-white-circle-2', 'page4-white-circle-3', 'page4-white-circle-4', 'page4-white-circle-5', 'page4-white-circle-6', 'page4-white-circle-7'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page4-table-R2C2', maxItems: 8, acceptValidator: getAcceptValidatorForBase('page4-pink-circle'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page4-table-R3C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: false },
          ],
          placedItemDisableOnEvent: { eventName: 'quizCompleted', pageNumber: 4 },
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page4-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page4-feedback-textbox')(text, mode);
              },
              // text: getI18nText('feedback.correct'),
              // mode: 'correct',

              // getText: (droppableId) => {
              //   if (droppableId !== 'page4-table-R2C2') return getI18nText('feedback.correct');
              //   const tableId = 'page4-favorite-fruits-table';
              //   const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
              //   const counts = queries ? queries.getItemCountsByType(droppableId) : {};
              //   const grapeCount = counts['page4-pink-circle'] || 0;
              //   const grapeWord = grapeCount === 1 ? getI18nText('common.sandwiche') : getI18nText('common.snacks.sandwiches');
              //   return getI18nText("feedback.placedShape", null, { num: grapeCount, fruit: grapeWord })
              // },
            },
            onAddAllSuccess: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: "", mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page4-feedback-textbox',
              callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');
                const isFull = isDroppableAtMaxItems(context?.droppableId, {
                  'page4-table-R1C2': 8,
                  'page4-table-R2C2': 8,
                  'page4-table-R3C2': 1,
                });
                if (isFull) {
                  createFeedbackCallback('page4-feedback-textbox')(
                    getI18nText('feedback.dropExceedMaxItems', 'Oops! This row is full.'),
                    'incorrect'
                  );
                  return;
                }

                const draggableId = context?.draggableId;

                let feedbackText;

                if (draggableId?.startsWith('page4-pink-circle')) {
                  feedbackText = getI18nText('feedback.placeSandwichesRow');
                } else {
                  feedbackText = getI18nText('feedback.chooseCorrectShapeSandwich');
                }

                createFeedbackCallback('page4-feedback-textbox')(
                  feedbackText,
                  'incorrect'
                );
                // Only when white or yellow was dropped: after circle is back, blink/pulse pink and pulse the dropped circle
                const isWhiteOrYellow = draggableId?.startsWith('page4-white-circle') || draggableId?.startsWith('page4-yellow-circle');
                if (typeof window !== 'undefined' && isWhiteOrYellow) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page4-blink-pink-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page4-white-circle')) {
                      window.dispatchEvent(new CustomEvent('page4-pulse-white-circle'));
                    } else if (draggableId.startsWith('page4-yellow-circle')) {
                      window.dispatchEvent(new CustomEvent('page4-pulse-yellow-circle'));
                    }
                  }, 500);
                }
              }
            },
            onIncorrectDropOutside: {
              componentId: 'page4-feedback-textbox', callback: (text, mode, context) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page4-feedback-textbox')(text, mode);
                const draggableId = context?.draggableId;
                // Only when white or yellow was dropped: after circle is back, blink/pulse pink and pulse the dropped circle
                const isWhiteOrYellow = draggableId?.startsWith('page4-white-circle') || draggableId?.startsWith('page4-yellow-circle');
                if (typeof window !== 'undefined' && isWhiteOrYellow) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page4-blink-pink-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page4-white-circle')) {
                      window.dispatchEvent(new CustomEvent('page4-pulse-white-circle'));
                    } else if (draggableId.startsWith('page4-yellow-circle')) {
                      window.dispatchEvent(new CustomEvent('page4-pulse-yellow-circle'));
                    }
                  }, 500);
                }
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page4-pink-circle': { imageSrc: 'assets/pinkCircle.png' }, 'page4-white-circle-1': { imageSrc: 'assets/whiteCircle.png' }, 'page4-white-circle-2': { imageSrc: 'assets/whiteCircle.png' }, 'page4-white-circle-3': { imageSrc: 'assets/whiteCircle.png' }, 'page4-white-circle-4': { imageSrc: 'assets/whiteCircle.png' }, 'page4-white-circle-5': { imageSrc: 'assets/whiteCircle.png' }, 'page4-white-circle-6': { imageSrc: 'assets/whiteCircle.png' }, 'page4-white-circle-7': { imageSrc: 'assets/whiteCircle.png' }, },
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
      //use these shapes text
      {
        id: 'page4-use-these-shape-text',
        name: 'page4-use-these-shape-text',
        type: 'custom',
        coordinates: [80, 360, 550, 400], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      //options text
      {
        id: 'page4-option-text',
        name: 'page4-option-text',
        type: 'custom',
        coordinates: [220, 490, 550, 590], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '38gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page4-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [260, 700, 460, 770],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page4CheckConfig = {
            buttonId: 'page4-check-button',
            correctAnswer: 4,
            checkCellId: 'page4-table-R2C2',
            feedbackComponentId: 'page4-feedback-textbox',
            tableId: 'page4-favorite-fruits-table',
            pageNumber: 4
          };
          registerTableCheckButtonState(page4CheckConfig);
          return {
            text: getI18nText('buttons.check'),
            ...page4CheckConfig,
            onClick: createTableCheckHandler(page4CheckConfig)
          };
        })()
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
          text: getI18nText('pages.page4.footerInstruction'),
          backgroundColor: '#2D414F',
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
          imageAlt: getI18nText('common.tapAlt'),
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage4'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
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
        coordinates: [0, 0, 1600, 80], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.headerText"), // Empty text, just for background
          backgroundColor: '#2D414F', // 40% opacity black
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
        coordinates: [10, 10, 700, 450], // Positioned below question text box
        zIndex: 55,
        props: {
          imageSrc: 'assets/snacksImages.png',

        },
      },
      //shape-background
      {
        id: 'page5-shape-background',
        name: 'page5-shape-background',
        type: 'custom',
        coordinates: [10, 340, 690, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#052642c9', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // Draggable star (zIndex above fruit cloud 55 and fill-blanks 60 so it's on top and draggable)
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page5-draggable-white-circle',
        name: 'page5-draggable-white-circle',
        type: 'custom',
        coordinates: [480, 410, 580, 490],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page5-white-circle',
          imageSrc: 'assets/whiteCircle.png',
          imageAlt: getI18nText('common.imageAlt.whiteCircle'),
          spawnCount: -1,
          isDisabled: false,
          pulseOnEvent: { eventName: 'page5-pulse-white-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 5 }
        }
      },
      // spawnCount: -1 = infinite spawns after each drop, 0 = no spawns, n = n extra spawns after first; each spawned item has a unique id
      {
        id: 'page5-draggable-pink-circle',
        name: 'page5-draggable-pink-circle',
        type: 'custom',
        coordinates: [480, 500, 580, 580],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page5-pink-circle',
          imageSrc: 'assets/pinkCircle.png',
          imageAlt: getI18nText('common.imageAlt.pinkCircle'),
          spawnCount: -1,
          isDisabled: false,
          pulseOnEvent: { eventName: 'page5-pulse-pink-circle' },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 5 }
        }
      },
      {
        id: 'page5-draggable-yellow-circle',
        name: 'page5-draggable-yellow-circle',
        type: 'custom',
        coordinates: [480, 590, 580, 670],
        zIndex: 70,
        props: {
          componentType: 'Draggable',
          draggableId: 'page5-yellow-circle',
          imageSrc: 'assets/yellowCircle.png',
          imageAlt: getI18nText('common.imageAlt.yellowCircle'),
          spawnCount: -1,
          isDisabled: false,
          blinkOnEvent: { eventName: 'page5-blink-yellow-circle', durationMs: 1000, pulseScale: 1.2 },
          disableOnEvent: { eventName: 'quizCompleted', pageNumber: 5 }
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
            headers: [{ text: getI18nText("common.foodSold"), colSpan: 2 }],
            rows: [
              [getI18nText("common.snacks.iceCream"), ''],
              [getI18nText("common.snacks.sandwiches"), ''],
              [getI18nText("common.snacks.pizzas"), ''],
              [{ text: getI18nText("common.eachShape"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', },
          rowOverrides: { 3: { fontSize: '36gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page5-table-R1C2', maxItems: 8, placementDirection: 'horizontal', initialPlacementIds: ['page5-white-circle-1', 'page5-white-circle-2', 'page5-white-circle-3', 'page5-white-circle-4', 'page5-white-circle-5', 'page5-white-circle-6', 'page5-white-circle-7'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page5-table-R2C2', maxItems: 8, placementDirection: 'horizontal', initialPlacementIds: ['page5-pink-circle-1', 'page5-pink-circle-2', 'page5-pink-circle-3', 'page5-pink-circle-4'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page5-table-R3C2', maxItems: 8, acceptValidator: getAcceptValidatorForBase('page5-yellow-circle'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
          ],
          placedItemDisableOnEvent: { eventName: 'quizCompleted', pageNumber: 5 },
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page5-feedback-textbox',
              callback: (text, mode) => {
                window.playCarClickSound?.('correct');
                createFeedbackCallback('page5-feedback-textbox')(text, mode);
              },

            },
            onAddAllSuccess: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: "", mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page5-feedback-textbox',
              callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');
                const isFull = isDroppableAtMaxItems(context?.droppableId, {
                  'page5-table-R1C2': 8,
                  'page5-table-R2C2': 8,
                  'page5-table-R3C2': 8,
                });
                if (isFull) {
                  createFeedbackCallback('page5-feedback-textbox')(
                    getI18nText('feedback.dropExceedMaxItems', 'Oops! This row is full.'),
                    'incorrect'
                  );
                  return;
                }

                const draggableId = context?.draggableId;

                let feedbackText;

                if (draggableId?.startsWith('page5-yellow-circle')) {
                  feedbackText = getI18nText('feedback.placePizzaRow');
                } else {
                  feedbackText = getI18nText('feedback.chooseCorrectShapePizza');
                }

                createFeedbackCallback('page5-feedback-textbox')(
                  feedbackText,
                  'incorrect'
                );
                // Only when white or pink was dropped: after circle is back, blink/pulse yellow and pulse the dropped circle
                const isWhiteOrPink = draggableId?.startsWith('page5-white-circle') || draggableId?.startsWith('page5-pink-circle');
                if (typeof window !== 'undefined' && isWhiteOrPink) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page5-blink-yellow-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page5-white-circle')) {
                      window.dispatchEvent(new CustomEvent('page5-pulse-white-circle'));
                    } else if (draggableId.startsWith('page5-pink-circle')) {
                      window.dispatchEvent(new CustomEvent('page5-pulse-pink-circle'));
                    }
                  }, 500);
                }
              }
            },
            onIncorrectDropOutside: {
              componentId: 'page5-feedback-textbox', callback: (text, mode, context) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page5-feedback-textbox')(text, mode);
                const draggableId = context?.draggableId;
                // Only when white or pink was dropped: after circle is back, blink/pulse yellow and pulse the dropped circle
                const isWhiteOrPink = draggableId?.startsWith('page5-white-circle') || draggableId?.startsWith('page5-pink-circle');
                if (typeof window !== 'undefined' && isWhiteOrPink) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page5-blink-yellow-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page5-white-circle')) {
                      window.dispatchEvent(new CustomEvent('page5-pulse-white-circle'));
                    } else if (draggableId.startsWith('page5-pink-circle')) {
                      window.dispatchEvent(new CustomEvent('page5-pulse-pink-circle'));
                    }
                  }, 500);
                }
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: { 'page5-yellow-circle': { imageSrc: 'assets/yellowCircle.png' }, 'page5-white-circle-1': { imageSrc: 'assets/whiteCircle.png' }, 'page5-white-circle-2': { imageSrc: 'assets/whiteCircle.png' }, 'page5-white-circle-3': { imageSrc: 'assets/whiteCircle.png' }, 'page5-white-circle-4': { imageSrc: 'assets/whiteCircle.png' }, 'page5-white-circle-5': { imageSrc: 'assets/whiteCircle.png' }, 'page5-white-circle-6': { imageSrc: 'assets/whiteCircle.png' }, 'page5-white-circle-7': { imageSrc: 'assets/whiteCircle.png' }, 'page5-pink-circle-1': { imageSrc: 'assets/pinkCircle.png' }, 'page5-pink-circle-2': { imageSrc: 'assets/pinkCircle.png' }, 'page5-pink-circle-3': { imageSrc: 'assets/pinkCircle.png' }, 'page5-pink-circle-4': { imageSrc: 'assets/pinkCircle.png' }, },
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
      //use these shapes text
      {
        id: 'page5-use-these-shape-text',
        name: 'page5-use-these-shape-text',
        type: 'custom',
        coordinates: [80, 360, 550, 400], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.useTheseShapes"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '40gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      //options text
      {
        id: 'page5-option-text',
        name: 'page5-option-text',
        type: 'custom',
        coordinates: [220, 490, 550, 590], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.options"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '13gc',
          textColor: '#ffff',
          fontSize: '38gc',
          padding: '0gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      // Check button - below Show each fruit text (uses same 3-layer styling as Next/Prev)
      {
        id: 'page5-check-button',
        name: 'check-button',
        type: 'button',
        coordinates: [260, 700, 460, 770],
        zIndex: 'var(--z-button)',
        props: (() => {
          const page5CheckConfig = {
            buttonId: 'page5-check-button',
            correctAnswer: 3,
            checkCellId: 'page5-table-R3C2',
            feedbackComponentId: 'page5-feedback-textbox',
            tableId: 'page5-favorite-fruits-table',
            pageNumber: 5
          };
          registerTableCheckButtonState(page5CheckConfig);
          return {
            text: getI18nText('buttons.check'),
            ...page5CheckConfig,
            onClick: createTableCheckHandler(page5CheckConfig)
          };
        })()
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
          text: getI18nText('pages.page5.footerInstruction'),
          backgroundColor: '#2D414F',
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
          imageAlt: getI18nText('common.tapAlt'),
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonpage5'));
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1'));
              }
            }
          }
        }
      },

    ],

    6: [

      // Favorite Fruits Picture Diagram table (5 rows + header, 2 columns, merged header and footer)
      {
        id: 'page6-favorite-fruits-table',
        name: 'page6-favorite-fruits-table',
        type: 'custom',
        coordinates: [100, 150, 850, 650],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page6-favorite-fruits-table',
          tableData: {
            headers: [{ text: getI18nText("common.foodSold"), colSpan: 2 }],
            rows: [
              [getI18nText("common.snacks.iceCream"), ''],
              [getI18nText("common.snacks.sandwiches"), ''],
              [getI18nText("common.snacks.pizzas"), ''],
              [{ text: getI18nText("common.eachShape"), colSpan: 2 }]
            ]
          },
          headerBackgroundColor: '#053745',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', },
          rowOverrides: { 3: { fontSize: '36gc', fontStyle: 'italic' } },
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['30%', '70%'],
          // droppableCells: per-cell toggles — enabled, maxItems, placementDirection ('horizontal'|'vertical'), placedItemDraggable, placedItemTransferable, clearPlacementOnDropOutside.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page6-table-R1C2', maxItems: 8, placementDirection: 'horizontal', initialPlacementIds: ['page6-white-circle-1', 'page6-white-circle-2', 'page6-white-circle-3', 'page6-white-circle-4', 'page6-white-circle-5', 'page6-white-circle-6', 'page6-white-circle-7'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: true, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page6-table-R2C2', maxItems: 8, placementDirection: 'horizontal', initialPlacementIds: ['page6-pink-circle-1', 'page6-pink-circle-2', 'page6-pink-circle-3', 'page6-pink-circle-4'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page6-table-R3C2', maxItems: 8, initialPlacementIds: ['page6-yellow-circle-1', 'page6-yellow-circle-2', 'page6-yellow-circle-3'], acceptValidator: () => false, onDrop: onDropTableCell, enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
          ],
          placedItemDisableOnEvent: { eventName: 'quizCompleted', pageNumber: 5 },
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
                if (droppableId !== 'page6-table-R3C2') return getI18nText('feedback.correct');
                const tableId = 'page6-favorite-fruits-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const counts = queries ? queries.getItemCountsByType(droppableId) : {};
                const grapeCount = counts['page6-yellow-circle'] || 0;
                const grapeWord = grapeCount === 1 ? getI18nText('common.pizza') : getI18nText('common.snacks.pizzas');
                return getI18nText("feedback.placedShape", null, { num: grapeCount, fruit: grapeWord })
              },
            },
            onAddAllSuccess: { componentId: 'page6-feedback-textbox', callback: createFeedbackCallback('page6-feedback-textbox'), text: getI18nText('feedback.allCorrect'), mode: 'correct' },
            onRemove: { componentId: 'page6-feedback-textbox', callback: createFeedbackCallback('page6-feedback-textbox'), text: "", mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page6-feedback-textbox',
              callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');
                const isFull = isDroppableAtMaxItems(context?.droppableId, {
                  'page6-table-R1C2': 8,
                  'page6-table-R2C2': 8,
                  'page6-table-R3C2': 8,
                });
                if (isFull) {
                  createFeedbackCallback('page6-feedback-textbox')(
                    getI18nText('feedback.dropExceedMaxItems', 'Oops! This row is full.'),
                    'incorrect'
                  );
                  return;
                }

                const draggableId = context?.draggableId;

                let feedbackText;

                if (draggableId?.startsWith('page6-yellow-circle')) {
                  feedbackText = getI18nText('feedback.placePizzaRow');
                } else {
                  feedbackText = getI18nText('feedback.chooseCorrectShapePizza');
                }

                createFeedbackCallback('page6-feedback-textbox')(
                  feedbackText,
                  'incorrect'
                );
                // Only when white or pink was dropped: after circle is back, blink/pulse yellow and pulse the dropped circle
                const isWhiteOrPink = draggableId?.startsWith('page6-white-circle') || draggableId?.startsWith('page6-pink-circle');
                if (typeof window !== 'undefined' && isWhiteOrPink) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page6-blink-yellow-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page6-white-circle')) {
                      window.dispatchEvent(new CustomEvent('page6-pulse-white-circle'));
                    } else if (draggableId.startsWith('page6-pink-circle')) {
                      window.dispatchEvent(new CustomEvent('page6-pulse-pink-circle'));
                    }
                  }, 500);
                }
              }
            },
            onIncorrectDropOutside: {
              componentId: 'page6-feedback-textbox', callback: (text, mode, context) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page6-feedback-textbox')(text, mode);
                const draggableId = context?.draggableId;
                // Only when white or pink was dropped: after circle is back, blink/pulse yellow and pulse the dropped circle
                const isWhiteOrPink = draggableId?.startsWith('page6-white-circle') || draggableId?.startsWith('page6-pink-circle');
                if (typeof window !== 'undefined' && isWhiteOrPink) {
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('page6-blink-yellow-circle', { detail: { durationMs: 1000 } }));
                    if (draggableId.startsWith('page6-white-circle')) {
                      window.dispatchEvent(new CustomEvent('page6-pulse-white-circle'));
                    } else if (draggableId.startsWith('page6-pink-circle')) {
                      window.dispatchEvent(new CustomEvent('page6-pulse-pink-circle'));
                    }
                  }, 500);
                }
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            'page6-yellow-circle': { imageSrc: 'assets/yellowCircle.png' }, 'page6-white-circle-1': { imageSrc: 'assets/whiteCircle.png' }, 'page6-white-circle-2': { imageSrc: 'assets/whiteCircle.png' }, 'page6-white-circle-3': { imageSrc: 'assets/whiteCircle.png' }, 'page6-white-circle-4': { imageSrc: 'assets/whiteCircle.png' }, 'page6-white-circle-5': { imageSrc: 'assets/whiteCircle.png' }, 'page6-white-circle-6': { imageSrc: 'assets/whiteCircle.png' }, 'page6-white-circle-7': { imageSrc: 'assets/whiteCircle.png' }, 'page6-pink-circle-1': { imageSrc: 'assets/pinkCircle.png' }, 'page6-pink-circle-2': { imageSrc: 'assets/pinkCircle.png' }, 'page6-pink-circle-3': { imageSrc: 'assets/pinkCircle.png' }, 'page6-pink-circle-4': { imageSrc: 'assets/pinkCircle.png' }, 'page6-yellow-circle-1': { imageSrc: 'assets/yellowCircle.png' },
            'page6-yellow-circle-2': { imageSrc: 'assets/yellowCircle.png' },
            'page6-yellow-circle-3': { imageSrc: 'assets/yellowCircle.png' },
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
      // maintext
      {
        id: "page6-main-text",
        name: "page6-main-text",
        type: "custom",
        coordinates: [825, 210, 1550, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page6.mainText"),
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
        id: "page6-next-button",
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
        if (
          confirm(
            getI18nText("messages.pageStatesCleared")
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
