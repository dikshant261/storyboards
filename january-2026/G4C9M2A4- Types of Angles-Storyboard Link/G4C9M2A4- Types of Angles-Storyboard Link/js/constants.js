// Essential Constants for the Math Learning Applet
// Contains only currentQuestionIndex for navigation

// Question management
let currentQuestionIndex = 0;

// Shape constant - Array of shape configurations
// This is the central configuration for quadrilateral shapes used throughout the app
const shape = [
  {
    type: "parallelogram", // Shape type (will be converted to uppercase for quadType)
    quadType: "PARALLELOGRAM", // Quad type in uppercase format (for QuadrilateralComponent)
    vertices: [
      { row: 3, col: 3 },    // Top-left
      { row: 3, col: 7 },    // Top-right
      { row: 6, col: 8 },    // Bottom-right (shifted right to create slant)
      { row: 6, col: 4 }     // Bottom-left (shifted right to create slant)
    ],
    gridRows: 10,
    gridCols: 10
  },
  {
    type: "square", // Shape type
    quadType: "SQUARE", // Quad type in uppercase format (for QuadrilateralComponent)
    vertices: [
      { row: 2, col: 2 },    // Top-left
      { row: 2, col: 6 },    // Top-right
      { row: 6, col: 6 },    // Bottom-right
      { row: 6, col: 2 }     // Bottom-left
    ],
    gridRows: 10,
    gridCols: 10
  },
  {
    type: "rectangle", // Shape type
    quadType: "RECTANGLE", // Quad type in uppercase format (for QuadrilateralComponent)
    vertices: [
      { row: 2, col: 2 },    // Top-left
      { row: 2, col: 7 },    // Top-right (5 columns wide)
      { row: 6, col: 7 },    // Bottom-right
      { row: 6, col: 2 }     // Bottom-left (4 rows tall)
    ],
    gridRows: 10,
    gridCols: 10
  }
];

// Quiz Panel Detection Configuration
// Defines component types and IDs that should be treated as quiz panels
// Components listed here will disable the next button until a quizCompleted event is dispatched
const QUIZ_PANEL_DETECTION = {
  // Component types that are quiz panels
  componentTypes: ["QuizPanelComponent", "FillBlanksComponent"],
  // Element IDs that contain these strings are treated as quiz panels
  idPatterns: ["quiz", "quiz-panel"],
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
    QT3: { header: 10, question: 25, options: 45, feedback: 20 }, // MCQ text only, 3 options
    QT3R: { header: 10, question: 25, options: 45, feedback: 20 }, // MCQ text only, 3 options in rows
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
  QT3: {
    numberOfOptions: 3,
    hasImage: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QT3R: {
    numberOfOptions: 3,
    hasImage: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
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

    // First, check for page-specific quiz panel ID (most reliable)
    const pageQuizId = `page${pageNumber}-quiz-panel`;
    const pageQuizElement = document.getElementById(pageQuizId);
    if (pageQuizElement) {
      console.log(`✅ [PageCompletion] Found quiz panel by ID: ${pageQuizId}`);
      return true;
    }

    // Check for page-specific quiz ID pattern (including quizId attribute)
    const pageQuizPattern = `page${pageNumber}-quiz`;
    const pageQuizElements = document.querySelectorAll(`[id*="${pageQuizPattern}"]`);
    if (pageQuizElements.length > 0) {
      console.log(`✅ [PageCompletion] Found quiz panel by pattern: ${pageQuizPattern}`);
      return true;
    }
    
    // Also check for quizId attribute matching the page pattern
    const quizIdElements = document.querySelectorAll(`[data-quiz-id*="${pageQuizPattern}"], [quiz-id*="${pageQuizPattern}"]`);
    if (quizIdElements.length > 0) {
      console.log(`✅ [PageCompletion] Found quiz panel by quizId attribute: ${pageQuizPattern}`);
      return true;
    }
    
    // Check for QuizPanelComponent with matching quizId in the component tree
    // This handles cases where the component is rendered but ID might not be set yet
    const allQuizPanels = document.querySelectorAll('[data-component-type="QuizPanelComponent"], [data-component="QuizPanelComponent"]');
    for (const panel of allQuizPanels) {
      // Check if this panel's quizId matches the page
      const quizIdAttr = panel.getAttribute('data-quiz-id') || panel.getAttribute('quiz-id') || panel.id;
      if (quizIdAttr && quizIdAttr.includes(pageQuizPattern)) {
        console.log(`✅ [PageCompletion] Found quiz panel by component type with matching quizId: ${quizIdAttr}`);
        return true;
      }
    }

    // Check for component types (data attributes) - but only if they match the page
    config.componentTypes.forEach((componentType) => {
      const elements = document.querySelectorAll(
        `[data-component-type="${componentType}"], [data-component="${componentType}"]`
      );
      // Check if any of these elements are for this specific page
      for (const element of elements) {
        const elementId = element.id || '';
        const quizId = element.getAttribute('data-quiz-id') || element.getAttribute('quiz-id') || '';
        // Check if element ID or quizId matches this page
        if (elementId.includes(`page${pageNumber}`) || quizId.includes(`page${pageNumber}-quiz`)) {
          console.log(`✅ [PageCompletion] Found quiz panel by component type for page ${pageNumber}: ${elementId || quizId}`);
          hasQuiz = true;
          break;
        }
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

    console.log(`🔍 [PageCompletion] checkPageHasQuiz(${pageNumber}): ${hasQuiz}`);
    return hasQuiz;
  },

  // Initialize completion state for a page
  initializePage(pageNumber) {
    this.init();
    const key = `page${pageNumber}Completed`;
    
    console.log(`🔍 [PageCompletion] initializePage(${pageNumber}) called`);
    console.log(`🔍 [PageCompletion] Current state before check: ${window.pageCompletionState[key]}`);

    // Check if page has quiz
    const hasQuiz = this.checkPageHasQuiz(pageNumber);
    console.log(`🔍 [PageCompletion] checkPageHasQuiz(${pageNumber}) returned: ${hasQuiz}`);

    // If page has quiz, ALWAYS set to false (not completed) even if state exists
    // This ensures quiz pages start as incomplete on every load
    if (hasQuiz) {
      const previousState = window.pageCompletionState[key];
      window.pageCompletionState[key] = false;
      console.log(
        `📄 [PageCompletion] Initialized ${key} = false (hasQuiz: ${hasQuiz}) - Quiz page must be completed`
      );
      if (previousState !== undefined && previousState !== false) {
        console.log(`⚠️ [PageCompletion] Overrode previous state: ${previousState} -> false`);
      }
      return false;
    }

    // Pages 3 and 5 have animations that must complete before the page is considered complete
    // These pages should start as incomplete even though they have no quiz
    const pagesWithRequiredAnimation = [3, 5];
    if (pagesWithRequiredAnimation.includes(pageNumber)) {
      // For pages with required animations, always start as incomplete
      // The animation completion will dispatch events to mark the page as complete
      const previousState = window.pageCompletionState[key];
      window.pageCompletionState[key] = false;
      console.log(
        `📄 [PageCompletion] Initialized ${key} = false (hasRequiredAnimation: true) - Animation must complete`
      );
      if (previousState !== undefined && previousState !== false) {
        console.log(`⚠️ [PageCompletion] Overrode previous state: ${previousState} -> false`);
      }
      return false;
    }

    // For non-quiz pages, check if state already exists (don't overwrite if already set)
    if (window.pageCompletionState[key] !== undefined) {
      return window.pageCompletionState[key];
    }

    // Set initial state: true if no quiz (non-quiz pages are auto-completed)
    window.pageCompletionState[key] = true;

    console.log(
      `📄 [PageCompletion] Initialized ${key} = ${window.pageCompletionState[key]} (hasQuiz: ${hasQuiz})`
    );

    return window.pageCompletionState[key];
  },

  // Get completion state for a page
  getPageCompleted(pageNumber) {
    this.init();
    const key = `page${pageNumber}Completed`;

    // Always check if page has quiz - if it does, state should be false
    // This prevents saved state from overriding quiz detection
    const hasQuiz = this.checkPageHasQuiz(pageNumber);
    if (hasQuiz) {
      // Quiz pages should always start as incomplete
      // Override any existing state
      if (window.pageCompletionState[key] !== false) {
        console.log(`⚠️ [PageCompletion] getPageCompleted: Overriding existing state for quiz page ${pageNumber}`);
        window.pageCompletionState[key] = false;
      }
      return false;
    }

    // Pages 3 and 5 have animations that must complete before the page is considered complete
    // These pages should start as incomplete even though they have no quiz
    const pagesWithRequiredAnimation = [3, 5];
    if (pagesWithRequiredAnimation.includes(pageNumber)) {
      // For pages with required animations, check if state exists
      // If not, initialize it (which will set it to false)
      if (window.pageCompletionState[key] === undefined) {
        return this.initializePage(pageNumber);
      }
      // Return the current state (should be false until animation completes)
      return window.pageCompletionState[key];
    }

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
    
    // Check if this is a quiz page - if so, don't allow setting to true unless quiz is completed
    const hasQuiz = this.checkPageHasQuiz(pageNumber);
    if (hasQuiz && completed && window.pageCompletionState[key] === false) {
      console.log(`✅ [PageCompletion] Allowing quiz page ${pageNumber} to be marked as completed`);
    } else if (hasQuiz && completed) {
      console.log(`⚠️ [PageCompletion] Attempting to set quiz page ${pageNumber} to completed (current state: ${window.pageCompletionState[key]})`);
    }
    
    window.pageCompletionState[key] = completed;
    console.log(`📄 [PageCompletion] Set ${key} = ${completed} (hasQuiz: ${hasQuiz})`);

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
}
