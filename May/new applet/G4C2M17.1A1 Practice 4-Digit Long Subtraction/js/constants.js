// Essential Constants for the Math Learning Applet
// Contains only currentQuestionIndex and which shape type this activity uses.

// Question management
let currentQuestionIndex = 0;

// =====================================================
// Page 1: Long Addition — all tunables live in THIS file (not PageConfig).
// Loaded before PageConfig.js, so PageConfig reads these globals.
//
// WHERE TO CHANGE LAYOUT FOR incorrect / fill-missing MODES:
//
// 1) CHECK BUTTON (orange "Check" on the page background)
//    → const PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS below (also on
//    window.PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS after this file loads).
//    Format: [left, top, right, bottom] in the same grid pixels as next/previous.
//
// 2) PURPLE PROGRESS BAR ("0 / 4 errors found")
//    → PAGE1_LONG_ADDITION_INCORRECT_PROGRESS_GRID_COORDS below
//    Same page grid [x1,y1,x2,y2] as other PageConfig elements (e.g. page1-long-addition).
//    The bar is portaled into `.main-container` so it lines up with the grid.
//    Optional extra CSS (zIndex, etc.): PAGE1_LONG_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE.
//    If you remove `incorrectProgressPanelCoordinates` from PageConfig props, the bar
//    falls back to the old in-widget strip (bottom: -50px under the addition block).
//
// 3) FILL-MISSING teal bar
//    → PAGE1_LONG_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS + _OVERLAY_PANEL_STYLE
// =====================================================

// Numbers used for the long-addition activity on page 1.
// Update this array to switch between 2- or 3-number addition.
const PAGE1_LONG_ADDITION_NUMBERS = [5459, 3965];

// Mode/type used by the LongAdditionComponent for page 1.
// Valid values include: 'guided', 'guided_flow_short', 'incorrect', 'fill-missing', 'auto'
const PAGE1_LONG_ADDITION_MODE = "guided_flow_short";

// For `incorrect` / `fill-missing` modes only. How many tiles to mark as
// incorrect (or blank in fill-missing). Ignored if PAGE1_LONG_ADDITION_IMPACT_TILES
// has entries.
const PAGE1_LONG_ADDITION_IMPACTED_TILES_COUNT = 4;

// For `incorrect` / `fill-missing` modes only. Explicit list of impacted tiles.
// Each entry: { panel: 'simple'|'expanded', row: 'sum'|'operand-0'|..., column: 'TTh'|'Th'|'H'|'T'|'O' }.
// When this array is empty, `PAGE1_LONG_ADDITION_IMPACTED_TILES_COUNT` random tiles
// are picked from the eligible pool (headers and left-block numbers are excluded;
// the answer row and expanded operand rows are eligible).
const PAGE1_LONG_ADDITION_IMPACT_TILES = [];

// --- Check button: page grid rectangle [left, top, right, bottom] in px ---
const PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS = [831, 670, 1119, 753];

// --- Incorrect-mode progress + completion bar: page grid [x1, y1, x2, y2] ---
// Default: full width under long-addition ([400,100,1550,790]) in a short band.
const PAGE1_LONG_ADDITION_INCORRECT_PROGRESS_GRID_COORDS = [400, 795, 1550, 815];

// Optional extras merged on top (e.g. { zIndex: 1200 }).
const PAGE1_LONG_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE = {};

// --- Fill-missing bar: same grid convention ---
const PAGE1_LONG_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS = [400, 795, 1550, 815];
const PAGE1_LONG_ADDITION_FILL_MISSING_OVERLAY_PANEL_STYLE = {};

// =====================================================
// Page 2: Long Subtraction — mirrors page 1 layout, but subtracts.
// Loaded before PageConfig.js, so PageConfig reads these globals.
// =====================================================
//
// Numbers used for the long-subtraction activity on page 2.
// Update this array to switch between 2- or 3-number subtraction.
// First number is the minuend; remaining numbers are subtracted in order.
const PAGE2_LONG_SUBTRACTION_NUMBERS = [5459, 3965];
//
// Mode/type used by the LongSubtractionComponent for page 2.
// Valid values include: 'guided', 'guided_flow_short', 'incorrect', 'fill-missing', 'auto'
const PAGE2_LONG_SUBTRACTION_MODE = "fill-missing";
//
// For `incorrect` / `fill-missing` modes only. How many tiles to mark as
// incorrect (or blank in fill-missing). Ignored if PAGE2_LONG_SUBTRACTION_IMPACT_TILES
// has entries.
const PAGE2_LONG_SUBTRACTION_IMPACTED_TILES_COUNT = 4;
//
// For `incorrect` / `fill-missing` modes only. Explicit list of impacted tiles.
// Each entry: { panel: 'simple'|'expanded', row: 'sum'|'operand-0'|..., column: 'TTh'|'Th'|'H'|'T'|'O' }.
const PAGE2_LONG_SUBTRACTION_IMPACT_TILES = [];
//
// --- Check button: page grid rectangle [left, top, right, bottom] in px ---
const PAGE2_LONG_SUBTRACTION_CHECK_BUTTON_COORDS = [831, 670, 1119, 753];
//
// --- Incorrect-mode progress + completion bar: page grid [x1, y1, x2, y2] ---
const PAGE2_LONG_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS = [400, 795, 1550, 815];
const PAGE2_LONG_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE = {};
//
// --- Fill-missing bar: same grid convention ---
const PAGE2_LONG_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS = [400, 795, 1550, 815];
const PAGE2_LONG_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE = {};
//
// === Page 3 stack-subtraction (StackSubtractionComponent) ===
// Same numbers/options conventions as PAGE2. The "stack" component is a
// LongSubtractionComponent forced to variant: 'simple' (no place-value
// decomposition panel).
const PAGE3_STACK_SUBTRACTION_NUMBERS = [5459, 3965];
const PAGE3_STACK_SUBTRACTION_MODE = "fill-missing";
const PAGE3_STACK_SUBTRACTION_IMPACTED_TILES_COUNT = 4;
const PAGE3_STACK_SUBTRACTION_IMPACT_TILES = [];
const PAGE3_STACK_SUBTRACTION_CHECK_BUTTON_COORDS = [831, 670, 1119, 753];
const PAGE3_STACK_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS = [400, 795, 1550, 815];
const PAGE3_STACK_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE = {};
const PAGE3_STACK_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS = [400, 795, 1550, 815];
const PAGE3_STACK_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE = {};

// Which shape this activity uses. Vertices are taken from js/quadrilateral-config.js
// (single source of truth for each type’s default vertices and properties).
const shape = {
  type: "square", // Shape type (will be converted to uppercase for quadType)
  quadType: "SQUARE", // Quad type - must match a key in QuadrilateralConfig.types
  gridRows: 10,
  gridCols: 10
};

// Quiz Panel Detection Configuration
// Defines component types and IDs that should be treated as quiz panels
// Components listed here will disable the next button until a quizCompleted event is dispatched
const QUIZ_PANEL_DETECTION = {
  // Component types that are quiz panels
  componentTypes: ["QuizPanelComponent", "FillBlanksComponent"],
  // Element IDs that contain these strings are treated as quiz panels (page5-instruction = page 5 protractor flow; page6-quiz = page 6 quiz panel)
  idPatterns: ["quiz", "quiz-panel", "page5-instruction", "page6-quiz"],
  // CSS classes that indicate quiz panels
  cssClasses: ["quiz-panel"],
};

// Quiz Panel Row Height Configuration
// Defines default height percentages for each quiz type and subtype
const QUIZ_ROW_HEIGHTS = {
  MCQ: {
    QTI2: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 2 options
    QTI2R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 2 options in rows
    QTI4: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 4 options
    QTI4R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 4 options in rows
    QT2: { header: 10, question: 25, options: 45, feedback: 20 }, // MCQ text only, 2 options
    QT4: { header: 10, question: 25, options: 45, feedback: 20 }, // MCQ text only, 4 options
    QT4R: { header: 10, question: 25, options: 45, feedback: 20 }, // MCQ text only, 4 options in rows
  },
  FIB: { header: 10, question: 10, options: 65, feedback: 15 }, // Fill in the Blanks
  MAT: { header: 10, question: 10, options: 65, feedback: 15 }, // Match Blocks
  SEQ: { header: 10, question: 10, options: 65, feedback: 15 }, // Arrange in Sequence
  DEFAULT: { header: 10, question: 10, options: 65, feedback: 15 }, // Fallback
};

// Quiz Panel Options Row Configuration
// Defines layout configuration for MCQ options row
const QUIZ_OPTIONS_CONFIG = {
  QT2: {
    numberOfOptions: 2,
    hasImage: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 95, // 85% of row height
    buttonWidthPercent: 80, // 75% of column width
  },
  QT4: {
    numberOfOptions: 4,
    hasImage: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QTI2: {
    numberOfOptions: 2,
    hasImage: true,
    imageColumnWidth: 40, // 40% for image column
    optionsColumnWidth: 60, // 60% for options column
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QTI4: {
    numberOfOptions: 4,
    hasImage: true,
    imageColumnWidth: 50,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 90,
  },
  QTI2R: {
    numberOfOptions: 2,
    hasImage: true,
    imageColumnWidth: 60, // 40% for image column
    optionsColumnWidth: 40, // 60% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QTI4R: {
    numberOfOptions: 4,
    hasImage: true,
    imageColumnWidth: 60, // 40% for image column
    optionsColumnWidth: 40, // 60% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QT4R: {
    numberOfOptions: 4,
    hasImage: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
};

/**
 * Page Completion State Manager
 * Manages completion state for each page (pageXCompleted)
 */
const PageCompletionManager = {
  // Initialize page completion state store
  init() {
    if (typeof window !== "undefined" && !window.pageCompletionState) {
      window.pageCompletionState = {};
    }
  },

  // Check if a page has a quiz using the quiz detection logic
  checkPageHasQuiz(pageNumber) {
    const config = QUIZ_PANEL_DETECTION;
    let hasQuiz = false;

    // Check for component types (data attributes)
    config.componentTypes.forEach((componentType) => {
      const elements = document.querySelectorAll(
        `[data-component-type="${componentType}"], [data-component="${componentType}"]`
      );
      if (elements.length > 0) {
        hasQuiz = true;
      }
    });

    // Check for ID patterns
    if (!hasQuiz) {
      config.idPatterns.forEach((pattern) => {
        const elements = document.querySelectorAll(`[id*="${pattern}"]`);
        if (elements.length > 0) {
          hasQuiz = true;
        }
      });
    }

    // Check for CSS classes
    if (!hasQuiz) {
      config.cssClasses.forEach((cssClass) => {
        const elements = document.querySelectorAll(`.${cssClass}`);
        if (elements.length > 0) {
          hasQuiz = true;
        }
      });
    }

    return hasQuiz;
  },

  // Initialize completion state for a page
  initializePage(pageNumber) {
    this.init();
    const key = `page${pageNumber}Completed`;

    // Check if state already exists (don't overwrite if already set)
    if (window.pageCompletionState[key] !== undefined) {
      return window.pageCompletionState[key];
    }

    // Page 6 has a quiz panel by config; treat as not completed initially so instruction shows "Tap the correct option"
    // (checkPageHasQuiz can run before the quiz is in the DOM and wrongly set completed = true)
    if (pageNumber === 6) {
      window.pageCompletionState[key] = false;
      console.log(`📄 [PageCompletion] Initialized ${key} = false (page 6 has quiz)`);
      return false;
    }

    // Check if page has quiz
    const hasQuiz = this.checkPageHasQuiz(pageNumber);

    // Set initial state: false if has quiz, true if no quiz
    window.pageCompletionState[key] = !hasQuiz;

    console.log(
      `📄 [PageCompletion] Initialized ${key} = ${window.pageCompletionState[key]} (hasQuiz: ${hasQuiz})`
    );

    return window.pageCompletionState[key];
  },

  // Get completion state for a page
  getPageCompleted(pageNumber) {
    this.init();
    const key = `page${pageNumber}Completed`;

    // If state doesn't exist, initialize it
    if (window.pageCompletionState[key] === undefined) {
      return this.initializePage(pageNumber);
    }

    return window.pageCompletionState[key];
  },

  // Set completion state for a page
  setPageCompleted(pageNumber, completed) {
    this.init();
    const key = `page${pageNumber}Completed`;
    window.pageCompletionState[key] = completed;
    console.log(`📄 [PageCompletion] Set ${key} = ${completed}`);

    // Dispatch event for components to react to
    window.dispatchEvent(
      new CustomEvent("pageCompletionChanged", {
        detail: { pageNumber, completed },
      })
    );
  },

  // Mark page as completed (called when quizCompleted event is dispatched)
  markPageCompleted(pageNumber) {
    this.setPageCompleted(pageNumber, true);
  },
};

// Initialize window.Questions for DragDropGame component
// This is required by the drag-drop-component.js
// Using existing assets - replace with actual drag-drop images as needed
if (typeof window !== "undefined" && !window.Questions) {
  window.Questions = [
    {
      // Question 0 - using existing assets as temporary data for page 5
      // TODO: Replace with actual drag-drop images (equal/unequal parts images)
      image1: { imagePath: "cup.png", category: "equal" },
      image2: { imagePath: "teaPot.png", category: "equal" },
      image3: { imagePath: "spoonCoffee.png", category: "unequal" },
      image4: { imagePath: "spoonSugar.png", category: "unequal" },
    },
  ];
  console.log(
    "✅ [Constants] Initialized window.Questions with existing assets (temporary)"
  );
}

// Initialize page 13 feedback state with summary mode and text
// This ensures the feedback textbox displays correctly on page load
if (typeof window !== "undefined") {
  // Helper function to get i18n text (fallback if i18n not available)
  const getI18nText = (key, fallback) => {
    if (typeof i18n !== "undefined" && i18n.t) {
      try {
        return i18n.t(key);
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  // Initialize page 13 feedback state immediately with fallback text
  if (!window.page13FeedbackState) {
    window.page13FeedbackState = {
      text: getI18nText(
        "pages.page13.feedbackTextbox.text",
        "We concluded that Dona's coffee doesn't taste the same as her mom's. It is sweeter as it has <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">more sugar</span>."
      ),
      mode: "summary",
    };
    console.log(
      "✅ [Constants] Initialized window.page13FeedbackState with summary mode"
    );
  }

  // Update with i18n text after i18n is available (runs on DOMContentLoaded or later)
  const updatePage13FeedbackState = () => {
    if (
      typeof i18n !== "undefined" &&
      i18n.t &&
      window.page13FeedbackState &&
      window.page13FeedbackState.mode === "summary"
    ) {
      try {
        const i18nText = i18n.t("pages.page13.feedbackTextbox.text");
        if (i18nText && i18nText !== "pages.page13.feedbackTextbox.text") {
          window.page13FeedbackState.text = i18nText;
          // Dispatch update event to notify feedback textbox component
          window.dispatchEvent(
            new CustomEvent("page13FeedbackUpdate", {
              detail: {
                text: window.page13FeedbackState.text,
                mode: window.page13FeedbackState.mode,
              },
            })
          );
          console.log(
            "✅ [Constants] Updated window.page13FeedbackState with i18n text"
          );
        }
      } catch (e) {
        // i18n not ready yet, keep fallback text
      }
    }
  };

  // Try to update immediately if i18n is already available
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updatePage13FeedbackState);
  } else {
    // DOM already loaded, try immediately
    setTimeout(updatePage13FeedbackState, 0);
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    currentQuestionIndex,
    shape,
    QUIZ_PANEL_DETECTION,
    QUIZ_ROW_HEIGHTS,
    QUIZ_OPTIONS_CONFIG,
    PageCompletionManager,
  };
} else {
  if (typeof window.currentQuestionIndex === "undefined") {
    window.currentQuestionIndex = currentQuestionIndex;
  }
  window.shape = shape;
  window.QUIZ_PANEL_DETECTION = QUIZ_PANEL_DETECTION;
  window.QUIZ_ROW_HEIGHTS = QUIZ_ROW_HEIGHTS;
  window.QUIZ_OPTIONS_CONFIG = QUIZ_OPTIONS_CONFIG;
  window.PageCompletionManager = PageCompletionManager;

  // Page 1 long addition — exposed on window so PageConfig.js (and devtools) can
  // resolve them reliably; values are defined by the `const` bindings above.
  window.PAGE1_LONG_ADDITION_NUMBERS = PAGE1_LONG_ADDITION_NUMBERS;
  window.PAGE1_LONG_ADDITION_MODE = PAGE1_LONG_ADDITION_MODE;
  window.PAGE1_LONG_ADDITION_IMPACTED_TILES_COUNT =
    PAGE1_LONG_ADDITION_IMPACTED_TILES_COUNT;
  window.PAGE1_LONG_ADDITION_IMPACT_TILES = PAGE1_LONG_ADDITION_IMPACT_TILES;
  window.PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS =
    PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS;
  window.PAGE1_LONG_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE =
    PAGE1_LONG_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE;
  window.PAGE1_LONG_ADDITION_FILL_MISSING_OVERLAY_PANEL_STYLE =
    PAGE1_LONG_ADDITION_FILL_MISSING_OVERLAY_PANEL_STYLE;
  window.PAGE1_LONG_ADDITION_INCORRECT_PROGRESS_GRID_COORDS =
    PAGE1_LONG_ADDITION_INCORRECT_PROGRESS_GRID_COORDS;
  window.PAGE1_LONG_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS =
    PAGE1_LONG_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS;

  // Page 2 long subtraction — exposed on window so PageConfig.js can read them.
  window.PAGE2_LONG_SUBTRACTION_NUMBERS = PAGE2_LONG_SUBTRACTION_NUMBERS;
  window.PAGE2_LONG_SUBTRACTION_MODE = PAGE2_LONG_SUBTRACTION_MODE;
  window.PAGE2_LONG_SUBTRACTION_IMPACTED_TILES_COUNT =
    PAGE2_LONG_SUBTRACTION_IMPACTED_TILES_COUNT;
  window.PAGE2_LONG_SUBTRACTION_IMPACT_TILES = PAGE2_LONG_SUBTRACTION_IMPACT_TILES;
  window.PAGE2_LONG_SUBTRACTION_CHECK_BUTTON_COORDS =
    PAGE2_LONG_SUBTRACTION_CHECK_BUTTON_COORDS;
  window.PAGE2_LONG_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE =
    PAGE2_LONG_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE;
  window.PAGE2_LONG_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE =
    PAGE2_LONG_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE;
  window.PAGE2_LONG_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS =
    PAGE2_LONG_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS;
  window.PAGE2_LONG_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS =
    PAGE2_LONG_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS;

  // Page 3 stack subtraction
  window.PAGE3_STACK_SUBTRACTION_NUMBERS = PAGE3_STACK_SUBTRACTION_NUMBERS;
  window.PAGE3_STACK_SUBTRACTION_MODE = PAGE3_STACK_SUBTRACTION_MODE;
  window.PAGE3_STACK_SUBTRACTION_IMPACTED_TILES_COUNT =
    PAGE3_STACK_SUBTRACTION_IMPACTED_TILES_COUNT;
  window.PAGE3_STACK_SUBTRACTION_IMPACT_TILES = PAGE3_STACK_SUBTRACTION_IMPACT_TILES;
  window.PAGE3_STACK_SUBTRACTION_CHECK_BUTTON_COORDS =
    PAGE3_STACK_SUBTRACTION_CHECK_BUTTON_COORDS;
  window.PAGE3_STACK_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE =
    PAGE3_STACK_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE;
  window.PAGE3_STACK_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE =
    PAGE3_STACK_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE;
  window.PAGE3_STACK_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS =
    PAGE3_STACK_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS;
  window.PAGE3_STACK_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS =
    PAGE3_STACK_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS;
}
