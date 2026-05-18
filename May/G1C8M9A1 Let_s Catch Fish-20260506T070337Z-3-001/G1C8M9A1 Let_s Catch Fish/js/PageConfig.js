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
  5: { prev: 4, next: null },
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
 * Helper function for i18n text (accessible globally within this module)
 * @param {string} key - Translation key
 * @param {Object} [params] - Parameters for `{name}` interpolation in strings
 * @returns {string} Translated text
 */
function getI18nText(key, params = {}) {
  const resolved =
    params && typeof params === "object" && !Array.isArray(params)
      ? params
      : {};
  return typeof i18n !== "undefined" ? i18n.t(key, resolved) : "";
}

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
      const directionLabel =
        direction === "next"
          ? getI18nText("messages.navDirectionNext")
          : direction === "previous"
            ? getI18nText("messages.navDirectionPrevious")
            : getI18nText("messages.navDirectionUnknown");
      console.log(
        getI18nText("messages.navigationDispatchedEvent", {
          direction: directionLabel,
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
      feedbackCallback(getI18nText('feedback.tryAgain'), 'incorrect');
      return;
    }
    const items = queries.getItemsInCell(checkCellId) || [];

    const count = items.length;
    console.log("👩", count);
    if (count === correctAnswer) {
      window.playCarClickSound('correct');
      feedbackCallback(getI18nText('feedback.thatIsCorrect'), 'correct');
      if (typeof pageNumber === 'number' && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quizCompleted', {
          detail: { componentType: 'TableGridComponent', pageNumber }
        }));
      }
    }
    else if (count > correctAnswer) {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText('feedback.manyStars'), 'incorrect');
    }
    else {
      window.playCarClickSound('wrong');
      feedbackCallback(getI18nText('feedback.notEnough'), 'incorrect');
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

const handlePage2SeaCreatureClick = ({ isFish = false, isAllCaught = false } = {}) => {
  if (typeof window === 'undefined') return;

  const updateFeedback = createFeedbackCallback('page2-feedback-textbox');

  if (isAllCaught) {
    window.playCarClickSound?.('correct');
    window.dispatchEvent(new CustomEvent('imageChange', {
      detail: {
        elementName: 'page2-girl-image',
        targetImageIndex: 3
      }
    }));
    updateFeedback(
      getI18nText('feedback.page2.allCaught'),
      'correct'
    );
    return;
  }

  if (isFish) {
    const correctMessages = [
      getI18nText('feedback.page2.correct1'),
      getI18nText('feedback.page2.correct2'),
      getI18nText('feedback.page2.correct3')
    ];

    window.page2CorrectFeedbackIndex = window.page2CorrectFeedbackIndex || 0;
    const feedbackText = correctMessages[window.page2CorrectFeedbackIndex % correctMessages.length];
    window.page2CorrectFeedbackIndex += 1;

    window.playCarClickSound?.('correct');
    window.dispatchEvent(new CustomEvent('imageChange', {
      detail: {
        elementName: 'page2-girl-image',
        targetImageIndex: 1
      }
    }));
    updateFeedback(feedbackText, 'correct');
    return;
  }

  window.playCarClickSound?.('wrong');
  window.dispatchEvent(new CustomEvent('imageChange', {
    detail: {
      elementName: 'page2-girl-image',
      targetImageIndex: 2
    }
  }));
  updateFeedback(
    getI18nText('feedback.page2.wrongItem'),
    'incorrect'
  );
};

if (typeof window !== 'undefined' && !window.page2SeaFishInteractionListenerAdded) {
  window.page2SeaFishInteractionListenerAdded = true;
  window.addEventListener('spriteInteraction', (event) => {
    const detail = event.detail || {};
    if (detail.removalGroup === 'page2-sea-fish' && detail.removed) {
      handlePage2SeaCreatureClick({
        isFish: true,
        isAllCaught: !!detail.isAllRemoved
      });
    }
  });
}

/**
 * Get page navigation info (previous and next pages)
 * @param {number} pageNumber - Current page number
 * @returns {Object|null} Navigation object with `prev` and `next`, or null if not found
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
          imageAlt: getI18nText("accessibility.tap"),
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
                  getI18nText("messages.pageChangeEventDispatched", {
                    page: String(nav.next),
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
      //left-feedback-box
      {
        id: 'page2-feedback-textbox',
        name: 'page2-feedback-textbox',
        type: 'custom',
        coordinates: [10, 10, 450, 450], // Same coordinates as question text box
        zIndex: 49,
        props: {
          componentType: 'FeedbackTextboxComponent',
          text: getI18nText('pages.page2.feedbackTextboxDefault'),
          mode: 'normal',
          backgroundColor: '#FFFFFF',
          border: '4px solid #E9C07D',
          borderRadius: '15gc',
          color: 'black',
          fontSize: '43gc',
          padding: '16gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          allowHTML: true
        }
      },
      //▼ text
      {
        id: 'page2-left-feedback-box-arrow',
        name: 'page2-left-feedback-box-arrow',
        type: 'custom',
        coordinates: [80, 430, 140, 500], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.downArrow"),
          backgroundColor: '', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#E9C07D',
          fontSize: '60gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //girl image
      {
        id: "page2-girl-image",
        name: "page2-girl-image",
        type: "custom",
        coordinates: [50, 380, 450, 1050], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page2-girl-image",
          elementName: "page2-girl-image",
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/girl1.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: 'assets/girl3.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/girl5.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/girl6.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },

          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [3]
        },
      },
      // Sea image on the right (lowest z-index: 50)
      {
        id: 'page2-sea-image',
        name: 'page2-sea-image',
        type: 'container',
        coordinates: [455, 0, 1595, 780],
        zIndex: 50,
        props: {
          imageSrc: 'assets/seaImage.png',
        }
      },
      // Crab image-1 (z-index: 100 - above sea, below turtles)
      {
        id: 'page2-crab-image',
        name: 'page2-crab-image',
        type: 'custom',
        coordinates: [980, 550, 1280, 700],
        zIndex: 100,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/crabSprits/Crab_00.png',
            'assets/crabSprits/Crab_01.png',
            'assets/crabSprits/Crab_02.png',
            'assets/crabSprits/Crab_02.png',
            'assets/crabSprits/Crab_03.png',
            'assets/crabSprits/Crab_04.png',
            'assets/crabSprits/Crab_05.png',
            'assets/crabSprits/Crab_06.png',
            'assets/crabSprits/Crab_07.png',
            'assets/crabSprits/Crab_08.png',
            'assets/crabSprits/Crab_09.png',
            'assets/crabSprits/Crab_10.png',
            'assets/crabSprits/Crab_11.png',
            'assets/crabSprits/Crab_12.png',
            'assets/crabSprits/Crab_13.png',
            'assets/crabSprits/Crab_14.png',
          ],
          frameDuration: 350,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          onSpriteClick: () => handlePage2SeaCreatureClick({ isFish: false }),
          disableOnEvent: 'quizCompleted',
          disableOnEventFilter: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Crab image-2 (z-index: 100)
      {
        id: 'page2-crab-image-2',
        name: 'page2-crab-image-2',
        type: 'custom',
        coordinates: [680, 620, 980, 780],
        zIndex: 100,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/crabSprits/Crab_00.png',
            'assets/crabSprits/Crab_01.png',
            'assets/crabSprits/Crab_02.png',
            'assets/crabSprits/Crab_02.png',
            'assets/crabSprits/Crab_03.png',
            'assets/crabSprits/Crab_04.png',
            'assets/crabSprits/Crab_05.png',
            'assets/crabSprits/Crab_06.png',
            'assets/crabSprits/Crab_07.png',
            'assets/crabSprits/Crab_08.png',
            'assets/crabSprits/Crab_09.png',
            'assets/crabSprits/Crab_10.png',
            'assets/crabSprits/Crab_11.png',
            'assets/crabSprits/Crab_12.png',
            'assets/crabSprits/Crab_13.png',
            'assets/crabSprits/Crab_14.png',
          ],
          frameDuration: 350,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          onSpriteClick: () => handlePage2SeaCreatureClick({ isFish: false }),
          disableOnEvent: 'quizCompleted',
          disableOnEventFilter: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Turtle image-1 (z-index: 150 - above crabs, below fish) with bounce motion
      {
        id: 'page2-turtles-image',
        name: 'page2-turtles-image',
        type: 'custom',
        coordinates: [500, 100, 680, 350],
        zIndex: 150,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/Turtle/Turtle00.png',
            'assets/Turtle/Turtle01.png',
            'assets/Turtle/Turtle02.png',
            'assets/Turtle/Turtle03.png',
            'assets/Turtle/Turtle04.png',
            'assets/Turtle/Turtle05.png',
            'assets/Turtle/Turtle06.png',
          ],
          frameDuration: 350,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 780],
          bounceSpeed: 35,
          bounceSpeedVariation: 10,
          onSpriteClick: () => handlePage2SeaCreatureClick({ isFish: false }),
          disableOnEvent: 'quizCompleted',
          disableOnEventFilter: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Turtle image-2 (z-index: 150) with bounce motion
      {
        id: 'page2-turtles-image-2',
        name: 'page2-turtles-image-2',
        type: 'custom',
        coordinates: [1200, 200, 1380, 450],
        zIndex: 150,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/Turtle/Turtle00.png',
            'assets/Turtle/Turtle01.png',
            'assets/Turtle/Turtle02.png',
            'assets/Turtle/Turtle03.png',
            'assets/Turtle/Turtle04.png',
            'assets/Turtle/Turtle05.png',
            'assets/Turtle/Turtle06.png',
          ],
          frameDuration: 350,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 780],
          bounceSpeed: 30,
          bounceSpeedVariation: 8,
          onSpriteClick: () => handlePage2SeaCreatureClick({ isFish: false }),
          disableOnEvent: 'quizCompleted',
          disableOnEventFilter: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Red fish image 1 (z-index: 200 - highest, above all others) with bounce motion
      {
        id: 'page2-red-fish-image',
        name: 'page2-red-fish-image',
        type: 'custom',
        coordinates: [500, 50, 600, 120],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/RedFish/FishRed00.png',
            'assets/RedFish/FishRed01.png',
            'assets/RedFish/FishRed02.png',
            'assets/RedFish/FishRed03.png',
            'assets/RedFish/FishRed04.png',
            'assets/RedFish/FishRed05.png',
            'assets/RedFish/FishRed06.png',
            'assets/RedFish/FishRed07.png',
            'assets/RedFish/FishRed08.png',
            'assets/RedFish/FishRed09.png',
            'assets/RedFish/FishRed10.png',
          ],
          frameDuration: 350,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 60,
          bounceSpeedVariation: 20,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Red fish image 2 with bounce motion
      {
        id: 'page2-red-fish-image-2',
        name: 'page2-red-fish-image-2',
        type: 'custom',
        coordinates: [700, 100, 800, 170],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/RedFish/FishRed00.png',
            'assets/RedFish/FishRed01.png',
            'assets/RedFish/FishRed02.png',
            'assets/RedFish/FishRed03.png',
            'assets/RedFish/FishRed04.png',
            'assets/RedFish/FishRed05.png',
            'assets/RedFish/FishRed06.png',
            'assets/RedFish/FishRed07.png',
            'assets/RedFish/FishRed08.png',
            'assets/RedFish/FishRed09.png',
            'assets/RedFish/FishRed10.png',
          ],
          style: {
            transform: 'rotate(-4deg)'
          },
          frameDuration: 320,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 55,
          bounceSpeedVariation: 18,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Red fish image 3 with bounce motion
      {
        id: 'page2-red-fish-image-3',
        name: 'page2-red-fish-image-3',
        type: 'custom',
        coordinates: [900, 150, 1000, 220],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/RedFish/FishRed00.png',
            'assets/RedFish/FishRed01.png',
            'assets/RedFish/FishRed02.png',
            'assets/RedFish/FishRed03.png',
            'assets/RedFish/FishRed04.png',
            'assets/RedFish/FishRed05.png',
            'assets/RedFish/FishRed06.png',
            'assets/RedFish/FishRed07.png',
            'assets/RedFish/FishRed08.png',
            'assets/RedFish/FishRed09.png',
            'assets/RedFish/FishRed10.png',
          ],
          style: {
            transform: 'rotate(3deg)'
          },
          frameDuration: 340,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 65,
          bounceSpeedVariation: 15,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Red fish image 4 with bounce motion
      {
        id: 'page2-yellow-fish-image-4',
        name: 'page2-yellow-fish-image-4',
        type: 'custom',
        coordinates: [1100, 200, 1200, 270],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/YellowFish/YellowFish00.png',
            'assets/YellowFish/YellowFish01.png',
            'assets/YellowFish/YellowFish02.png',
            'assets/YellowFish/YellowFish03.png',
            'assets/YellowFish/YellowFish04.png',
            'assets/YellowFish/YellowFish05.png',
            'assets/YellowFish/YellowFish06.png',
            'assets/YellowFish/YellowFish07.png',
            'assets/YellowFish/YellowFish08.png',
            'assets/YellowFish/YellowFish09.png',
            'assets/YellowFish/YellowFish10.png',
          ],
          style: {
            transform: 'rotate(-2deg)'
          },
          frameDuration: 360,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 50,
          bounceSpeedVariation: 22,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Red fish image 5 with bounce motion
      {
        id: 'page2-yellow-fish-image-5',
        name: 'page2-yellow-fish-image-5',
        type: 'custom',
        coordinates: [1300, 250, 1400, 320],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/YellowFish/YellowFish00.png',
            'assets/YellowFish/YellowFish01.png',
            'assets/YellowFish/YellowFish02.png',
            'assets/YellowFish/YellowFish03.png',
            'assets/YellowFish/YellowFish04.png',
            'assets/YellowFish/YellowFish05.png',
            'assets/YellowFish/YellowFish06.png',
            'assets/YellowFish/YellowFish07.png',
            'assets/YellowFish/YellowFish08.png',
            'assets/YellowFish/YellowFish09.png',
            'assets/YellowFish/YellowFish10.png',
          ],
          style: {
            transform: 'rotate(5deg)'
          },
          frameDuration: 330,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 58,
          bounceSpeedVariation: 16,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Yellow fish image 6 with bounce motion
      {
        id: 'page2-yellow-fish-image-6',
        name: 'page2-yellow-fish-image-6',
        type: 'custom',
        coordinates: [550, 300, 650, 370],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/YellowFish/YellowFish00.png',
            'assets/YellowFish/YellowFish01.png',
            'assets/YellowFish/YellowFish02.png',
            'assets/YellowFish/YellowFish03.png',
            'assets/YellowFish/YellowFish04.png',
            'assets/YellowFish/YellowFish05.png',
            'assets/YellowFish/YellowFish06.png',
            'assets/YellowFish/YellowFish07.png',
            'assets/YellowFish/YellowFish08.png',
            'assets/YellowFish/YellowFish09.png',
            'assets/YellowFish/YellowFish10.png',
          ],
          style: {
            transform: 'rotate(-3deg)'
          },
          frameDuration: 350,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 52,
          bounceSpeedVariation: 19,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // Yellow fish image 7 with bounce motion
      {
        id: 'page2-yellow-fish-image-7',
        name: 'page2-yellow-fish-image-7',
        type: 'custom',
        coordinates: [800, 350, 900, 420],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/YellowFish/YellowFish00.png',
            'assets/YellowFish/YellowFish01.png',
            'assets/YellowFish/YellowFish02.png',
            'assets/YellowFish/YellowFish03.png',
            'assets/YellowFish/YellowFish04.png',
            'assets/YellowFish/YellowFish05.png',
            'assets/YellowFish/YellowFish06.png',
            'assets/YellowFish/YellowFish07.png',
            'assets/YellowFish/YellowFish08.png',
            'assets/YellowFish/YellowFish09.png',
            'assets/YellowFish/YellowFish10.png',
          ],
          style: {
            transform: 'rotate(4deg)'
          },
          frameDuration: 300,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 62,
          bounceSpeedVariation: 17,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // green fish image 8 with bounce motion
      {
        id: 'page2-green-fish-image-8',
        name: 'page2-green-fish-image-8',
        type: 'custom',
        coordinates: [1050, 400, 1150, 470],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/GreenFish/GreenFish00.png',
            'assets/GreenFish/GreenFish01.png',
            'assets/GreenFish/GreenFish02.png',
            'assets/GreenFish/GreenFish03.png',
            'assets/GreenFish/GreenFish04.png',
            'assets/GreenFish/GreenFish05.png',
            'assets/GreenFish/GreenFish06.png',
            'assets/GreenFish/GreenFish07.png',
            'assets/GreenFish/GreenFish08.png',
            'assets/GreenFish/GreenFish09.png',
            'assets/GreenFish/GreenFish10.png',
          ],
          style: {
            transform: 'rotate(-5deg)'
          },
          frameDuration: 345,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 56,
          bounceSpeedVariation: 21,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // green fish image 9 with bounce motion
      {
        id: 'page2-green-fish-image-9',
        name: 'page2-green-fish-image-9',
        type: 'custom',
        coordinates: [1280, 450, 1380, 520],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/GreenFish/GreenFish00.png',
            'assets/GreenFish/GreenFish01.png',
            'assets/GreenFish/GreenFish02.png',
            'assets/GreenFish/GreenFish03.png',
            'assets/GreenFish/GreenFish04.png',
            'assets/GreenFish/GreenFish05.png',
            'assets/GreenFish/GreenFish06.png',
            'assets/GreenFish/GreenFish07.png',
            'assets/GreenFish/GreenFish08.png',
            'assets/GreenFish/GreenFish09.png',
            'assets/GreenFish/GreenFish10.png',
          ],
          style: {
            transform: 'rotate(2deg)'
          },
          frameDuration: 325,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 48,
          bounceSpeedVariation: 14,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // green fish image 10 with bounce motion
      {
        id: 'page2-green-fish-image-10',
        name: 'page2-green-fish-image-10',
        type: 'custom',
        coordinates: [600, 500, 700, 570],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/GreenFish/GreenFish00.png',
            'assets/GreenFish/GreenFish01.png',
            'assets/GreenFish/GreenFish02.png',
            'assets/GreenFish/GreenFish03.png',
            'assets/GreenFish/GreenFish04.png',
            'assets/GreenFish/GreenFish05.png',
            'assets/GreenFish/GreenFish06.png',
            'assets/GreenFish/GreenFish07.png',
            'assets/GreenFish/GreenFish08.png',
            'assets/GreenFish/GreenFish09.png',
            'assets/GreenFish/GreenFish10.png',
          ],
          style: {
            transform: 'rotate(-4deg)'
          },
          frameDuration: 360,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 54,
          bounceSpeedVariation: 18,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // green fish image 11 with bounce motion
      {
        id: 'page2-green-fish-image-11',
        name: 'page2-green-fish-image-11',
        type: 'custom',
        coordinates: [950, 550, 1050, 620],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/GreenFish/GreenFish00.png',
            'assets/GreenFish/GreenFish01.png',
            'assets/GreenFish/GreenFish02.png',
            'assets/GreenFish/GreenFish03.png',
            'assets/GreenFish/GreenFish04.png',
            'assets/GreenFish/GreenFish05.png',
            'assets/GreenFish/GreenFish06.png',
            'assets/GreenFish/GreenFish07.png',
            'assets/GreenFish/GreenFish08.png',
            'assets/GreenFish/GreenFish09.png',
            'assets/GreenFish/GreenFish10.png',
          ],
          style: {
            transform: 'rotate(5deg)'
          },
          frameDuration: 315,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 58,
          bounceSpeedVariation: 20,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // blue fish image 12 with bounce motion
      {
        id: 'page2-blue-fish-image-12',
        name: 'page2-blue-fish-image-12',
        type: 'custom',
        coordinates: [1200, 600, 1300, 670],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/BlueFish/BlueFish00.png',
            'assets/BlueFish/BlueFish01.png',
            'assets/BlueFish/BlueFish02.png',
            'assets/BlueFish/BlueFish03.png',
            'assets/BlueFish/BlueFish04.png',
            'assets/BlueFish/BlueFish05.png',
            'assets/BlueFish/BlueFish06.png',
            'assets/BlueFish/BlueFish07.png',
            'assets/BlueFish/BlueFish08.png',
            'assets/BlueFish/BlueFish09.png',
            'assets/BlueFish/BlueFish10.png',
          ],
          style: {
            transform: 'rotate(-3deg)'
          },
          frameDuration: 335,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 64,
          bounceSpeedVariation: 16,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },
      // blue fish image 13 with bounce motion
      {
        id: 'page2-blue-fish-image-13',
        name: 'page2-blue-fish-image-13',
        type: 'custom',
        coordinates: [1450, 100, 1550, 170],
        zIndex: 200,
        props: {
          componentType: 'SpriteAnimationComponent',
          images: [
            'assets/BlueFish/BlueFish00.png',
            'assets/BlueFish/BlueFish01.png',
            'assets/BlueFish/BlueFish02.png',
            'assets/BlueFish/BlueFish03.png',
            'assets/BlueFish/BlueFish04.png',
            'assets/BlueFish/BlueFish05.png',
            'assets/BlueFish/BlueFish06.png',
            'assets/BlueFish/BlueFish07.png',
            'assets/BlueFish/BlueFish08.png',
            'assets/BlueFish/BlueFish09.png',
            'assets/BlueFish/BlueFish10.png',
          ],
          style: {
            transform: 'rotate(4deg)'
          },
          frameDuration: 335,
          autoplay: true,
          loop: true,
          alternate: true,
          objectFit: 'contain',
          bounceMotion: true,
          bounceBounds: [455, 0, 1595, 700],
          bounceSpeed: 52,
          bounceSpeedVariation: 15,
          removeOnClick: true,
          removalGroup: 'page2-sea-fish',
          dispatchOnAllRemoved: true,
          dispatchEventName: 'quizCompleted',
          dispatchEventDetail: { pageNumber: 2, quizId: 'page2-sea-fish-clear' }
        }
      },

      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [605, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page2-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page2.footerInstruction"),
          backgroundColor: '#ffffff1d',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'bold',
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
          imageAlt: getI18nText("accessibility.tap"),
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for specific page

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
                console.log(
                  '📄 [Next Button]',
                  getI18nText('messages.pageChangeEventDispatched', { page: String(nav.next) }),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver'));
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
        coordinates: [455, 820, 600, 895],
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
                console.log(
                  '📄 [Previous Button]',
                  getI18nText('messages.pageChangeEventDispatched', { page: String(nav.prev) }),
                );
              }
            }
          }
        }
      },

    ],

    3: [
      //left-feedback-box
      {
        id: 'page3-left-feedback-box',
        name: 'page3-left-feedback-box',
        type: 'custom',
        coordinates: [10, 10, 450, 450], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.leftTextBox"), // Empty text, just for background
          backgroundColor: '#FFFFFF', // 40% opacity black
          border: '4px solid #E9C07D',
          borderRadius: '15gc',
          textColor: 'black',
          fontSize: '43gc',
          padding: '10gc',
          textAlign: 'left',
          allowHTML: true
        }
      },
      //▼ text
      {
        id: 'page3-left-feedback-box-arrow',
        name: 'page3-left-feedback-box-arrow',
        type: 'custom',
        coordinates: [80, 430, 140, 500], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.downArrow"),
          backgroundColor: '', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#E9C07D',
          fontSize: '60gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //girl image
      {
        id: "page3-girl-image",
        name: "page3-girl-image",
        type: "custom",
        coordinates: [50, 380, 450, 1050], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page3-girl-image",
          elementName: "page3-girl-image",
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/girl4.png",
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
      //fish image container
      {
        id: 'page3-fish-image-container',
        name: 'page3-fish-image-container',
        type: 'custom',
        coordinates: [455, 10, 1595, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#0a283e9e', // 40% opacity black
          border: '3px solid #12538C',
          borderRadius: '15gc',
          textColor: '#E9C07D',
          fontSize: '60gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // fish image layout
      {
        id: 'page3-yellow-fish-image-1',
        name: 'page3-yellow-fish-image-1',
        type: 'container',
        coordinates: [620, 45, 760, 165],
        zIndex: 50,
        props: {
          imageSrc: 'assets/yellow-fish.png',
        }
      },
      {
        id: 'page3-blue-fish-image-1',
        name: 'page3-blue-fish-image-1',
        type: 'container',
        coordinates: [965, 35, 1120, 160],
        zIndex: 50,
        props: {
          imageSrc: 'assets/blue-fish.png',
        }
      },
      {
        id: 'page3-red-fish-image-1',
        name: 'page3-red-fish-image-1',
        type: 'container',
        coordinates: [485, 185, 645, 315],
        zIndex: 50,
        props: {
          imageSrc: 'assets/red-fish.png',
        }
      },
      {
        id: 'page3-red-fish-image-2',
        name: 'page3-red-fish-image-2',
        type: 'container',
        coordinates: [780, 270, 950, 405],
        zIndex: 50,
        props: {
          imageSrc: 'assets/red-fish.png',
        }
      },
      {
        id: 'page3-red-fish-image-3',
        name: 'page3-red-fish-image-3',
        type: 'container',
        coordinates: [1195, 185, 1355, 315],
        zIndex: 50,
        props: {
          imageSrc: 'assets/red-fish.png',
        }
      },
      {
        id: 'page3-yellow-fish-image-2',
        name: 'page3-yellow-fish-image-2',
        type: 'container',
        coordinates: [610, 360, 760, 485],
        zIndex: 50,
        props: {
          imageSrc: 'assets/yellow-fish.png',
        }
      },
      {
        id: 'page3-green-fish-image-1',
        name: 'page3-green-fish-image-1',
        type: 'container',
        coordinates: [990, 420, 1155, 545],
        zIndex: 50,
        props: {
          imageSrc: 'assets/green-fish.png',
        }
      },
      {
        id: 'page3-yellow-fish-image-3',
        name: 'page3-yellow-fish-image-3',
        type: 'container',
        coordinates: [1360, 355, 1515, 485],
        zIndex: 50,
        props: {
          imageSrc: 'assets/yellow-fish.png',
        }
      },
      {
        id: 'page3-blue-fish-image-2',
        name: 'page3-blue-fish-image-2',
        type: 'container',
        coordinates: [505, 555, 670, 685],
        zIndex: 50,
        props: {
          imageSrc: 'assets/blue-fish.png',
        }
      },
      {
        id: 'page3-yellow-fish-image-4',
        name: 'page3-yellow-fish-image-4',
        type: 'container',
        coordinates: [675, 560, 840, 690],
        zIndex: 50,
        props: {
          imageSrc: 'assets/yellow-fish.png',
        }
      },
      {
        id: 'page3-green-fish-image-2',
        name: 'page3-green-fish-image-2',
        type: 'container',
        coordinates: [880, 625, 1060, 760],
        zIndex: 50,
        props: {
          imageSrc: 'assets/green-fish.png',
        }
      },
      {
        id: 'page3-green-fish-image-3',
        name: 'page3-green-fish-image-3',
        type: 'container',
        coordinates: [1200, 565, 1380, 700],
        zIndex: 50,
        props: {
          imageSrc: 'assets/green-fish.png',
        }
      },
      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [600, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page3-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page3.footerInstruction"),
          backgroundColor: '#ffffff1d', // Semi-transparent white
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'bold',
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
          imageAlt: getI18nText("accessibility.tap"),
          initialVisible: true
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
          initialEnabled: true, // Disabled until quiz is completed
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
                console.log(
                  '📄 [Next Button]',
                  getI18nText('messages.pageChangeEventDispatched', { page: String(nav.next) }),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver'));
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
        coordinates: [455, 820, 600, 895],
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
                console.log(
                  '📄 [Previous Button]',
                  getI18nText('messages.pageChangeEventDispatched', { page: String(nav.prev) }),
                );
              }
            }
          }
        }
      },

    ],
    4: [
      //left-feedback-box
      {
        id: 'page4-feedback-textbox',
        name: 'page4-feedback-textbox',
        type: 'custom',
        coordinates: [10, 10, 450, 450], // Same coordinates as question text box
        zIndex: 49,
        props: {
          componentType: 'FeedbackTextboxComponent',
          text: getI18nText('pages.page4.feedbackTextboxDefault'),
          mode: 'normal',
          backgroundColor: '#FFFFFF',
          border: '4px solid #E9C07D',
          borderRadius: '15gc',
          color: 'black',
          fontSize: '43gc',
          padding: '16gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          allowHTML: true
        }
      },
      //▼ text
      {
        id: 'page4-left-feedback-box-arrow',
        name: 'page4-left-feedback-box-arrow',
        type: 'custom',
        coordinates: [80, 430, 140, 500], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.downArrow"),
          backgroundColor: '', // 40% opacity black
          border: '',
          borderRadius: '15gc',
          textColor: '#E9C07D',
          fontSize: '60gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //girl image
      {
        id: "page4-girl-image",
        name: "page4-girl-image",
        type: "custom",
        coordinates: [50, 380, 450, 1050], // Bottom of question background, left position (equal spacing)
        zIndex: 999,
        props: {
          componentType: "ImageStackComponent",
          id: "page4-girl-image",
          elementName: "page4-girl-image",
          currentPage: 13,
          coordinates: [200, 260, 500, 660],
          zIndex: 56,
          images: [
            {
              src: "assets/girl2.png",
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1, // Grayed out
            },
            {
              src: 'assets/girl3.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/girl5.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },
            {
              src: 'assets/girl6.png',
              blink: false,
              glow: false,
              hidden: true,
              opacity: 1, // Grayed out,
              // layerCoordinates: [50, 440, 400, 800]  // Image 3 
            },

          ],

          hideImageOnQuizComplete: true,    // Hide first image
          showImageOnQuizComplete: [1]
        },
      },
      //fish drag container
      {
        id: 'page4-fish-drag-container',
        name: 'page4-fish-drag-container',
        type: 'custom',
        coordinates: [455, 10, 790, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#0a283e9e', // 40% opacity black
          border: '3px solid #12538C',
          borderRadius: '15gc',
          textColor: '#E9C07D',
          fontSize: '60gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // fish draggables shown in the reference image with exact color counts
      {
        id: 'page4-red-fish-drag-image-1',
        name: 'page4-red-fish-drag-image-1',
        type: 'custom',
        coordinates: [470, 60, 620, 150],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-red-fish-drag-image-1',
          imageSrc: 'assets/red-fish.png',
          imageAlt: getI18nText('accessibility.redFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-blue-fish-drag-image-1',
        name: 'page4-blue-fish-drag-image-1',
        type: 'custom',
        coordinates: [605, 75, 775, 165],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-blue-fish-drag-image-1',
          imageSrc: 'assets/blue-fish.png',
          imageAlt: getI18nText('accessibility.blueFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-yellow-fish-drag-image-1',
        name: 'page4-yellow-fish-drag-image-1',
        type: 'custom',
        coordinates: [470, 165, 620, 255],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-yellow-fish-drag-image-1',
          imageSrc: 'assets/yellow-fish.png',
          imageAlt: getI18nText('accessibility.yellowFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-red-fish-drag-image-2',
        name: 'page4-red-fish-drag-image-2',
        type: 'custom',
        coordinates: [605, 180, 775, 270],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-red-fish-drag-image-2',
          imageSrc: 'assets/red-fish.png',
          imageAlt: getI18nText('accessibility.redFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-green-fish-drag-image-1',
        name: 'page4-green-fish-drag-image-1',
        type: 'custom',
        coordinates: [470, 270, 620, 360],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-green-fish-drag-image-1',
          imageSrc: 'assets/green-fish.png',
          imageAlt: getI18nText('accessibility.greenFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-yellow-fish-drag-image-2',
        name: 'page4-yellow-fish-drag-image-2',
        type: 'custom',
        coordinates: [605, 285, 775, 375],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-yellow-fish-drag-image-2',
          imageSrc: 'assets/yellow-fish.png',
          imageAlt: getI18nText('accessibility.yellowFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-green-fish-drag-image-2',
        name: 'page4-green-fish-drag-image-2',
        type: 'custom',
        coordinates: [470, 375, 620, 465],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-green-fish-drag-image-2',
          imageSrc: 'assets/green-fish.png',
          imageAlt: getI18nText('accessibility.greenFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-red-fish-drag-image-3',
        name: 'page4-red-fish-drag-image-3',
        type: 'custom',
        coordinates: [605, 390, 775, 480],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-red-fish-drag-image-3',
          imageSrc: 'assets/red-fish.png',
          imageAlt: getI18nText('accessibility.redFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-yellow-fish-drag-image-3',
        name: 'page4-yellow-fish-drag-image-3',
        type: 'custom',
        coordinates: [470, 480, 620, 570],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-yellow-fish-drag-image-3',
          imageSrc: 'assets/yellow-fish.png',
          imageAlt: getI18nText('accessibility.yellowFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-yellow-fish-drag-image-4',
        name: 'page4-yellow-fish-drag-image-4',
        type: 'custom',
        coordinates: [605, 495, 775, 585],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-yellow-fish-drag-image-4',
          imageSrc: 'assets/yellow-fish.png',
          imageAlt: getI18nText('accessibility.yellowFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-blue-fish-drag-image-2',
        name: 'page4-blue-fish-drag-image-2',
        type: 'custom',
        coordinates: [470, 585, 620, 675],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-blue-fish-drag-image-2',
          imageSrc: 'assets/blue-fish.png',
          imageAlt: getI18nText('accessibility.blueFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      {
        id: 'page4-green-fish-drag-image-3',
        name: 'page4-green-fish-drag-image-3',
        type: 'custom',
        coordinates: [605, 600, 775, 690],
        zIndex: 1000,
        props: {
          componentType: 'Draggable',
          draggableId: 'page4-green-fish-drag-image-3',
          imageSrc: 'assets/green-fish.png',
          imageAlt: getI18nText('accessibility.greenFish'),
          keepVisibleWhenPlaced: true,
          placedOpacity: 0.2,
          isDisabled: false
        }
      },
      
      //fish image container
      {
        id: 'page4-fish-image-container',
        name: 'page4-fish-image-container',
        type: 'custom',
        coordinates: [795, 10, 1595, 780], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: "", // Empty text, just for background
          backgroundColor: '#0a283e9e', // 40% opacity black
          border: '3px solid #12538C',
          borderRadius: '15gc',
          textColor: '#E9C07D',
          fontSize: '60gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // Fish picture diagram table
      {
        id: 'page4-fish-table',
        name: 'page4-fish-table',
        type: 'custom',
        coordinates: [811, 115, 1590, 675],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page4-fish-table',
          tableData: {
            headers: "",
            rows: [
              [getI18nText("fish.green"), ''],
              [getI18nText("fish.red"), ''],
              [getI18nText("fish.blue"), ''],
              [getI18nText("fish.yellow"), ''],
            ]
          },
          headerBackgroundColor: 'transparent',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745' },
          rowOverrides: {},
          dataColumnTextAlign: { 0: 'center' },
          columnWidths: ['20%', '80%'],
          // droppableCells: each color row accepts only its matching fish color and only up to the shown count.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page4-table-R1C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page4-green-fish-drag-image'), onDrop: createOnDropTableCell(4), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 1, colIndex: 1, droppableId: 'page4-table-R2C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page4-red-fish-drag-image'), onDrop: createOnDropTableCell(4), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 2, colIndex: 1, droppableId: 'page4-table-R3C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page4-blue-fish-drag-image'), onDrop: createOnDropTableCell(4), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true },
            { rowIndex: 3, colIndex: 1, droppableId: 'page4-table-R4C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page4-yellow-fish-drag-image'), onDrop: createOnDropTableCell(4), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page4-feedback-textbox',
              callback: () => {
                window.playCarClickSound?.('correct');

                const tableId = 'page4-fish-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const droppableIds = ['page4-table-R1C2', 'page4-table-R2C2', 'page4-table-R3C2', 'page4-table-R4C2'];
                const totalPlaced = queries
                  ? droppableIds.reduce((sum, id) => sum + ((queries.getItemsInCell(id) || []).length), 0)
                  : 0;

                const correctMessages = [
                  getI18nText('feedback.page4.correct1'),
                  getI18nText('feedback.page4.correct2'),
                  getI18nText('feedback.page4.correct3')
                ];

                if (typeof window !== 'undefined') {
                  window.page4CorrectFeedbackIndex = window.page4CorrectFeedbackIndex || 0;
                }

                const feedbackText = totalPlaced >= 12
                  ? getI18nText('feedback.page4.allSorted')
                  : correctMessages[(window.page4CorrectFeedbackIndex || 0) % correctMessages.length];

                if (totalPlaced < 12 && typeof window !== 'undefined') {
                  window.page4CorrectFeedbackIndex += 1;
                }

                if (totalPlaced >= 12 && typeof window !== 'undefined') {
                  const enableNextEvent = new CustomEvent('quizCompleted', {
                    detail: {
                      quizId: 'page4-fish-table',
                      pageNumber: 4
                    }
                  });
                  window.dispatchEvent(enableNextEvent);
                }

                window.dispatchEvent(new CustomEvent('imageChange', {
                  detail: {
                    elementName: 'page4-girl-image',
                    targetImageIndex: totalPlaced >= 12 ? 3 : 1
                  }
                }));

                createFeedbackCallback('page4-feedback-textbox')(feedbackText, 'correct');
              },
              text: getI18nText('feedback.page4.correct1'),
              mode: 'correct'
            },
            onAddAllSuccess: {
              componentId: 'page4-feedback-textbox',
              callback: () => {
                const enableNextEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    quizId: 'page4-fish-table',
                    pageNumber: 4
                  }
                });
                window.dispatchEvent(enableNextEvent);

                window.dispatchEvent(new CustomEvent('imageChange', {
                  detail: {
                    elementName: 'page4-girl-image',
                    targetImageIndex: 3
                  }
                }));
                createFeedbackCallback('page4-feedback-textbox')(
                  getI18nText('feedback.page4.allSorted'),
                  'correct'
                );
              },
              text: getI18nText('feedback.page4.allSorted'),
              mode: 'correct'
            },
            onRemove: { componentId: 'page4-feedback-textbox', callback: createFeedbackCallback('page4-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page4-feedback-textbox',
              callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');

                const draggableId = context?.draggableId;

                let feedbackText;

                if (
                  draggableId?.startsWith('page4-red-fish-drag-image') ||
                  draggableId?.startsWith('page4-blue-fish-drag-image') ||
                  draggableId?.startsWith('page4-green-fish-drag-image') ||
                  draggableId?.startsWith('page4-yellow-fish-drag-image')
                ) {
                  window.dispatchEvent(new CustomEvent('imageChange', {
                    detail: {
                      elementName: 'page4-girl-image',
                      targetImageIndex: 2
                    }
                  }));

                  feedbackText = getI18nText('feedback.page4.wrongGroup');
                } else {
                  feedbackText = getI18nText('feedback.chooseCorrectShape');
                }

                createFeedbackCallback('page4-feedback-textbox')(
                  feedbackText,
                  'incorrect'
                );
              }
            },
            onIncorrectDropOutside: {
              componentId: 'page4-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page4-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            'page4-red-fish-drag-image-1': { imageSrc: 'assets/red-fish.png' },
            'page4-red-fish-drag-image-2': { imageSrc: 'assets/red-fish.png' },
            'page4-red-fish-drag-image-3': { imageSrc: 'assets/red-fish.png' },
            'page4-blue-fish-drag-image-1': { imageSrc: 'assets/blue-fish.png' },
            'page4-blue-fish-drag-image-2': { imageSrc: 'assets/blue-fish.png' },
            'page4-green-fish-drag-image-1': { imageSrc: 'assets/green-fish.png' },
            'page4-green-fish-drag-image-2': { imageSrc: 'assets/green-fish.png' },
            'page4-green-fish-drag-image-3': { imageSrc: 'assets/green-fish.png' },
            'page4-green-fish-drag-image-4': { imageSrc: 'assets/green-fish.png' },
            'page4-yellow-fish-drag-image-1': { imageSrc: 'assets/yellow-fish.png' },
            'page4-yellow-fish-drag-image-2': { imageSrc: 'assets/yellow-fish.png' },
            'page4-yellow-fish-drag-image-3': { imageSrc: 'assets/yellow-fish.png' },
            'page4-yellow-fish-drag-image-4': { imageSrc: 'assets/yellow-fish.png' }
          },
          placedItemDraggable: false,
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
      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [600, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          id: 'page4-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page4.footerInstruction"),
          backgroundColor: '#ffffff1d', // Semi-transparent white
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'bold',
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
          imageAlt: getI18nText("accessibility.tap"),
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
                console.log(
                  '📄 [Next Button]',
                  getI18nText('messages.pageChangeEventDispatched', { page: String(nav.next) }),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver'));
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
        coordinates: [455, 820, 600, 895],
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
                console.log(
                  '📄 [Previous Button]',
                  getI18nText('messages.pageChangeEventDispatched', { page: String(nav.prev) }),
                );
              }
            }
          }
        }
      },

    ],
    5: [
      // title text
      {
        id: "page5-title-text",
        name: "page5-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.title"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },

      // Fish picture diagram table
      {
        id: 'page5-fish-table',
        name: 'page5-fish-table',
        type: 'custom',
        coordinates: [100, 160, 800, 710],
        zIndex: 50,
        props: {
          componentType: 'TableGridComponent',
          elementName: 'page5-fish-table',
          tableData: {
            headers: "",
            rows: [
              [getI18nText("fish.green"), ''],
              [getI18nText("fish.red"), ''],
              [getI18nText("fish.blue"), ''],
              [getI18nText("fish.yellow"), ''],
            ]
          },
          headerBackgroundColor: 'transparent',
          headerTextColor: '#00FFFF',
          headerFontSize: '40gc',
          textColor: '#ffffff',
          fontSize: '34gc',
          dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745' },
          rowOverrides: {},
          dataColumnTextAlign: { 0: 'left' },
          columnWidths: ['20%', '80%'],
          // droppableCells: page 5 shows the completed table permanently with all fish already in the correct row.
          droppableCells: [
            { rowIndex: 0, colIndex: 1, droppableId: 'page5-table-R1C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page5-green-fish-drag-image'), onDrop: createOnDropTableCell(4), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true, initialPlacementIds: ['page5-green-fish-drag-image-1', 'page5-green-fish-drag-image-2', 'page5-green-fish-drag-image-3', 'page5-green-fish-drag-image-4'] },
            { rowIndex: 1, colIndex: 1, droppableId: 'page5-table-R2C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page5-red-fish-drag-image'), onDrop: createOnDropTableCell(3), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true, initialPlacementIds: ['page5-red-fish-drag-image-1', 'page5-red-fish-drag-image-2', 'page5-red-fish-drag-image-3'] },
            { rowIndex: 2, colIndex: 1, droppableId: 'page5-table-R3C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page5-blue-fish-drag-image'), onDrop: createOnDropTableCell(2), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true, initialPlacementIds: ['page5-blue-fish-drag-image-1', 'page5-blue-fish-drag-image-2'] },
            { rowIndex: 3, colIndex: 1, droppableId: 'page5-table-R4C2', maxItems: 4, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page5-yellow-fish-drag-image'), onDrop: createOnDropTableCell(4), enabled: true, placedItemDraggable: false, placedItemTransferable: false, clearPlacementOnDropOutside: true, initialPlacementIds: ['page5-yellow-fish-drag-image-1', 'page5-yellow-fish-drag-image-2', 'page5-yellow-fish-drag-image-3', 'page5-yellow-fish-drag-image-4'] },
          ],
          dropCallbacks: {
            onAddSuccess: {
              componentId: 'page5-feedback-textbox',
              callback: () => {
                window.playCarClickSound?.('correct');

                const tableId = 'page5-fish-table';
                const queries = typeof window !== 'undefined' && window.tableGridDropQueries && window.tableGridDropQueries[tableId];
                const droppableIds = ['page5-table-R1C2', 'page5-table-R2C2', 'page5-table-R3C2', 'page5-table-R4C2'];
                const totalPlaced = queries
                  ? droppableIds.reduce((sum, id) => sum + ((queries.getItemsInCell(id) || []).length), 0)
                  : 0;

                const correctMessages = [
                  getI18nText('feedback.page5.correct1'),
                  getI18nText('feedback.page5.correct2'),
                  getI18nText('feedback.page5.correct3')
                ];

                if (typeof window !== 'undefined') {
                  window.page5CorrectFeedbackIndex = window.page5CorrectFeedbackIndex || 0;
                }

                const feedbackText = totalPlaced >= 13
                  ? getI18nText('feedback.page5.allSorted')
                  : correctMessages[(window.page5CorrectFeedbackIndex || 0) % correctMessages.length];

                if (totalPlaced < 13 && typeof window !== 'undefined') {
                  window.page5CorrectFeedbackIndex += 1;
                }

                if (totalPlaced >= 13 && typeof window !== 'undefined') {
                  const enableNextEvent = new CustomEvent('quizCompleted', {
                    detail: {
                      quizId: 'page5-fish-table',
                      pageNumber: 4
                    }
                  });
                  window.dispatchEvent(enableNextEvent);
                }

                window.dispatchEvent(new CustomEvent('imageChange', {
                  detail: {
                    elementName: 'page5-girl-image',
                    targetImageIndex: totalPlaced >= 13 ? 3 : 1
                  }
                }));

                createFeedbackCallback('page5-feedback-textbox')(feedbackText, 'correct');
              },
              text: getI18nText('feedback.page5.correct1'),
              mode: 'correct'
            },
            onAddAllSuccess: {
              componentId: 'page5-feedback-textbox',
              callback: () => {
                const enableNextEvent = new CustomEvent('quizCompleted', {
                  detail: {
                    quizId: 'page5-fish-table',
                    pageNumber: 4
                  }
                });
                window.dispatchEvent(enableNextEvent);

                window.dispatchEvent(new CustomEvent('imageChange', {
                  detail: {
                    elementName: 'page5-girl-image',
                    targetImageIndex: 3
                  }
                }));
                createFeedbackCallback('page5-feedback-textbox')(
                  getI18nText('feedback.page5.allSorted'),
                  'correct'
                );
              },
              text: getI18nText('feedback.page5.allSorted'),
              mode: 'correct'
            },
            onRemove: { componentId: 'page5-feedback-textbox', callback: createFeedbackCallback('page5-feedback-textbox'), text: getI18nText('feedback.itemRemoved'), mode: 'normal' },
            onIncorrectDropInCell: {
              componentId: 'page5-feedback-textbox',
              callback: (text, mode, context) => {
                window.playCarClickSound?.('wrong');

                const draggableId = context?.draggableId;

                let feedbackText;

                if (
                  draggableId?.startsWith('page5-red-fish-drag-image') ||
                  draggableId?.startsWith('page5-blue-fish-drag-image') ||
                  draggableId?.startsWith('page5-green-fish-drag-image') ||
                  draggableId?.startsWith('page5-yellow-fish-drag-image')
                ) {
                  window.dispatchEvent(new CustomEvent('imageChange', {
                    detail: {
                      elementName: 'page5-girl-image',
                      targetImageIndex: 2
                    }
                  }));

                  feedbackText = getI18nText('feedback.page5.wrongGroup');
                } else {
                  feedbackText = getI18nText('feedback.chooseCorrectShape');
                }

                createFeedbackCallback('page5-feedback-textbox')(
                  feedbackText,
                  'incorrect'
                );
              }
            },
            onIncorrectDropOutside: {
              componentId: 'page5-feedback-textbox', callback: (text, mode) => {
                window.playCarClickSound?.('swoosh');
                createFeedbackCallback('page5-feedback-textbox')(text, mode);
              }, text: getI18nText('feedback.dropInsideCell'), mode: 'incorrect'
            },
          },
          placedContentByDraggableId: {
            'page5-red-fish-drag-image-1': { imageSrc: 'assets/red-fish.png' },
            'page5-red-fish-drag-image-2': { imageSrc: 'assets/red-fish.png' },
            'page5-red-fish-drag-image-3': { imageSrc: 'assets/red-fish.png' },
            'page5-blue-fish-drag-image-1': { imageSrc: 'assets/blue-fish.png' },
            'page5-blue-fish-drag-image-2': { imageSrc: 'assets/blue-fish.png' },
            'page5-green-fish-drag-image-1': { imageSrc: 'assets/green-fish.png' },
            'page5-green-fish-drag-image-2': { imageSrc: 'assets/green-fish.png' },
            'page5-green-fish-drag-image-3': { imageSrc: 'assets/green-fish.png' },
            'page5-green-fish-drag-image-4': { imageSrc: 'assets/green-fish.png' },
            'page5-yellow-fish-drag-image-1': { imageSrc: 'assets/yellow-fish.png' },
            'page5-yellow-fish-drag-image-2': { imageSrc: 'assets/yellow-fish.png' },
            'page5-yellow-fish-drag-image-3': { imageSrc: 'assets/yellow-fish.png' },
            'page5-yellow-fish-drag-image-4': { imageSrc: 'assets/yellow-fish.png' }
          },
          placedItemDraggable: false,
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
        id: "page5-main-text",
        name: "page5-main-text",
        type: "custom",
        coordinates: [850, 120, 1550, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.mainText"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // maintext 2
      {
        id: "page5-main-text-2",
        name: "page5-main-text-2",
        type: "custom",
        coordinates: [850, 350, 1550, 750], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page5.mainText2"),
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
        id: "page5-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 780, 700, 850],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("accessibility.tap"),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page5-next-button",
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
                  getI18nText("messages.pageChangeEventDispatched", {
                    page: String(nav.next),
                  }),
                );
              }
            } else if (nav && nav.next === null) {
              window.location.reload();
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver"),
              );
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              } else {
                window.location.reload();
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

          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset")
          );

          window.currentQuestionIndex = newIndex;
          console.log(
            "✅ [Navigation] Updated window.currentQuestionIndex to:",
            newIndex
          );

          window.page1complete = false;
          window.objectsremoved = 0;

          // Drag-and-drop: clear all placements so tables and pool draggables reset
          window.dragDropPlacements = {};
          window.dispatchEvent(
            new CustomEvent("dragDropPlacement", { detail: { reset: true } }),
          );

          // Spawned draggable ids (e.g. multi-instance pool) — allow fresh init on next render
          if (
            window.draggableSpawnState &&
            typeof window.draggableSpawnState === "object"
          ) {
            Object.keys(window.draggableSpawnState).forEach((k) => {
              delete window.draggableSpawnState[k];
            });
          }

          // Page 2 click-to-remove fish groups — clear so sprites can show again on return
          if (
            window.spriteRemovalGroups &&
            typeof window.spriteRemovalGroups === "object"
          ) {
            Object.keys(window.spriteRemovalGroups).forEach((k) => {
              delete window.spriteRemovalGroups[k];
            });
          }

          window.page2CorrectFeedbackIndex = 0;
          window.page4CorrectFeedbackIndex = 0;
          window.page5CorrectFeedbackIndex = 0;

          console.log(
            "✅ [Navigation]",
            getI18nText("messages.navigationComplete"),
          );

          // Return to page 1 (this path used to run only advance without navigating)
          if (typeof window.changePageAndNotify === "function") {
            window.changePageAndNotify(1);
          } else if (typeof window.navigateToPage === "function") {
            window.navigateToPage(1);
          }

          if (typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
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
