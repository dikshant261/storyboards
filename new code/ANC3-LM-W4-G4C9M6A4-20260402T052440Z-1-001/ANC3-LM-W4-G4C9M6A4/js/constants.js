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
    type: "equilateral_triangle", // Shape type
    quadType: "EQUILATERAL_TRIANGLE", // Quad type in uppercase format
    // Equilateral triangle: top vertex at center, two bottom vertices forming equal sides
    // For a 10x10 grid, centered triangle with vertices forming 60° angles
    // Base from col 2 to col 8 (length 6), height = 6 * sqrt(3)/2 ≈ 5.196
    // Top vertex at (2, 5), bottom-left at (7, 2), bottom-right at (7, 8)
    vertices: [
      { row: 2, col: 5 },    // Top vertex (apex)
      { row: 7, col: 2 },    // Bottom-left vertex (normalized from 1.80)
      { row: 7, col: 8 }     // Bottom-right vertex (normalized from 8.25)
    ],
    gridRows: 10,
    gridCols: 10,
    isTriangle: true // Flag to indicate this is a triangle (3 unique vertices)
  },
  {
    type: "acute_triangle", // Shape type
    quadType: "ACUTE_TRIANGLE", // Quad type in uppercase format
    // Acute triangle with angles: ∠ABC = 60° (at B), ∠ACB = 70° (at C), ∠BAC = 50° (at A)
    // Side lengths: AB = 10, BC = 8.15, CA = 9.22
    // Scaled to fit 10x10 grid approximately
    // A at top, B at bottom-left, C at bottom-right
    vertices: [
      { row: 0.09, col: 4.98 },    // A - Top vertex (apex), ∠BAC = 50°
      { row: 7, col: 1 },   // B - Bottom-left vertex, ∠ABC = 60°
      { row: 7, col: 7.5 }   // C - Bottom-right vertex, ∠ACB = 70°
    ],
    gridRows: 10,
    gridCols: 10,
    isTriangle: true // Flag to indicate this is a triangle (3 unique vertices)
  },
  {
    type: "right_angle_triangle", // Shape type
    quadType: "RIGHT_ANGLE_TRIANGLE", // Quad type in uppercase format
    // Right-angle triangle with angles: ∠D = 60°, ∠E = 90°, ∠F = 30°
    // Vertices: D (top-left), E (bottom-left, right angle), F (bottom-right)
    // EF is horizontal
    vertices: [
      { row: 2.000000, col: 2.000000 },    // D - Top-left vertex, ∠D = 60°
      { row: 6.000000, col: 2.000000 },    // E - Bottom-left vertex (right angle), ∠E = 90°
      { row: 6.000000, col: 8.928203 }     // F - Bottom-right vertex, ∠F = 30°
    ],
    gridRows: 10,
    gridCols: 10,
    isTriangle: true // Flag to indicate this is a triangle (3 unique vertices)
  },
  {
    type: "obtuse_angle_triangle", // Shape type
    quadType: "OBTUSE_ANGLE_TRIANGLE", // Quad type in uppercase format
    // Obtuse-angle triangle with angles: ∠EDF = 110° (at D, obtuse), ∠DEF = 50° (at E), ∠DFE = 20° (at F)
    // Vertices: D (top), E (bottom-left), F (bottom-right)
    // EF is horizontal (same row)
    vertices: [
      { row: 4.068297, col: 3.620892 }, // D - Top vertex, ∠EDF = 110° (obtuse angle at D)
      { row: 6.000000, col: 2.000000 }, // E - Bottom-left vertex, ∠DEF = 50°
      { row: 6.000000, col: 8.928203 }  // F - Bottom-right vertex, ∠DFE = 20°
    ],
    gridRows: 10,
    gridCols: 10,
    isTriangle: true // Flag to indicate this is a triangle (3 unique vertices)
  },
  {
    type: "non_special_quadrilateral", // Shape type
    quadType: "NON_SPECIAL_QUADRILATERAL", // Quad type in uppercase format
    // General quadrilateral with no special properties - irregular shape
    vertices: [
      { row: 2, col: 5 },    // Top-left
      { row: 2, col: 10 },    // Top-right
      { row: 7, col: 6 },    // Bottom-right (shifted right)
      { row: 5, col: 2 }     // Bottom-left (shifted left)
    ],
    gridRows: 10,
    gridCols: 10
  },
  {
    type: "kite", // Shape type
    quadType: "KITE", // Quad type in uppercase format
    // Kite: two pairs of adjacent sides equal, typically diamond-shaped
    vertices: [
      { row: 2, col: 5 },    // Top vertex
      { row: 4, col: 2 },    // Left vertex
      { row: 7, col: 5 },    // Bottom vertex
      { row: 4, col: 8 }     // Right vertex
    ],
    gridRows: 10,
    gridCols: 10
  },
  {
    type: "rectangle", // Shape type
    quadType: "RECTANGLE", // Quad type in uppercase format
    // Rectangle: 4 right angles, opposite sides equal
    vertices: [
      { row: 2, col: 2 },    // Top-left
      { row: 2, col: 7 },    // Top-right
      { row: 7, col: 7 },    // Bottom-right
      { row: 7, col: 2 }     // Bottom-left
    ],
    gridRows: 10,
    gridCols: 10
  },
  {
    type: "rhombus", // Shape type
    quadType: "RHOMBUS", // Quad type in uppercase format
    // Rhombus: all 4 sides equal, angles not necessarily 90 degrees (diamond shape)
    vertices: [
      { row: 2, col: 5 },    // Top vertex
      { row: 5, col: 2 },    // Left vertex
      { row: 8, col: 5 },    // Bottom vertex
      { row: 5, col: 8 }     // Right vertex
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
    buttonHeightPercent: 90, // 90% of row height for 3 options
    buttonWidthPercent: 80, // 80% of column width
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
    // Special case: page 2 has quiz detection (protractor angle measurement flow)
    if (pageNumber === 2) {
      return true;
    }

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
}
