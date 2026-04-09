// Essential Constants for the Math Learning Applet
// Contains only currentQuestionIndex for navigation

// Question management
let currentQuestionIndex = 0;

// Page 2 question items (heavy/light objects). Each element is { item1, item2 }.
// Each item may have item_name, spriteDuration (ms for sprite animation; default 1500 if omitted).
const questionArray = [
  {
    item1: {
      item_name: "Balloon",
      image: "assets/Balloon/Balloon.png",
      type: "light",
      correct: false,
      spriteDuration: 1500,
      spriteImages: [
        "assets/Balloon/Balloon_00.png",
        "assets/Balloon/Balloon_01.png",
        "assets/Balloon/Balloon_02.png",
        "assets/Balloon/Balloon_03.png",
        "assets/Balloon/Balloon_04.png",
        "assets/Balloon/Balloon_05.png",
        "assets/Balloon/Balloon_06.png",
        "assets/Balloon/Balloon_07.png",
        "assets/Balloon/Balloon_08.png",
      ],
    },
    item2: {
      item_name: "Box",
      image: "assets/Wood Box/Box.png",
      type: "heavy",
      correct: true,
      spriteDuration: 1200,
      spriteImages: [
        "assets/Wood Box/Wood Box_00.png",
        "assets/Wood Box/Wood Box_01.png",
        "assets/Wood Box/Wood Box_02.png",
        "assets/Wood Box/Wood Box_03.png",
        "assets/Wood Box/Wood Box_04.png",
        "assets/Wood Box/Wood Box_05.png",
        "assets/Wood Box/Wood Box_06.png",
        "assets/Wood Box/Wood Box_07.png",
        "assets/Wood Box/Wood Box_08.png",
      ],
    },
  },
];

// Page 3 question pairs (same structure as questionArray, independent data)
const questionArray2 = [
  {
    item1: {
      item_name: "Paper",
      image: "assets/Paper/Paper.png",
      type: "light",
      correct: true,
      spriteDuration: 1500,
      spriteImages: [
        "assets/Paper/Paper_00.png",
        "assets/Paper/Paper_01.png",
        "assets/Paper/Paper_02.png",
        "assets/Paper/Paper_03.png",
        "assets/Paper/Paper_04.png",
        "assets/Paper/Paper_05.png",
        "assets/Paper/Paper_06.png",
        "assets/Paper/Paper_07.png",
        "assets/Paper/Paper_08.png",
      ],
    },
    item2: {
      item_name: "Chair",
      image: "assets/Chair/Chair.png",
      type: "heavy",
      correct: false,
      spriteDuration: 1200,
      spriteImages: [
        "assets/Chair/Chair_00.png",
        "assets/Chair/Chair_01.png",
        "assets/Chair/Chair_02.png",
        "assets/Chair/Chair_03.png",
        "assets/Chair/Chair_04.png",
        "assets/Chair/Chair_05.png",
        "assets/Chair/Chair_06.png",
        "assets/Chair/Chair_07.png",
        "assets/Chair/Chair_08.png",
      ],
    },
  },
];
// Page 4 question pairs (same structure as questionArray, independent data)
const questionArray3 = [
  {
    item1: {
      item_name: "Water Bottle",
      image: "assets/Water Bottle/Water Bottle.png",
      type: "heavy",
      correct: true,
      spriteDuration: 1500,
      spriteImages: [
        "assets/Water Bottle/Water Bottle_00.png",
        "assets/Water Bottle/Water Bottle_01.png",
        "assets/Water Bottle/Water Bottle_02.png",
        "assets/Water Bottle/Water Bottle_03.png",
        "assets/Water Bottle/Water Bottle_04.png",
        "assets/Water Bottle/Water Bottle_05.png",
        "assets/Water Bottle/Water Bottle_06.png",
        "assets/Water Bottle/Water Bottle_07.png",
        "assets/Water Bottle/Water Bottle_08.png",
      ],
    },
    item2: {
      item_name: "Leaf",
      image: "assets/Leaf/Leaf.png",
      type: "light",
      correct: false,
      spriteDuration: 1200,
      spriteImages: [
        "assets/Leaf/Leaf_00.png",
        "assets/Leaf/Leaf_01.png",
        "assets/Leaf/Leaf_02.png",
        "assets/Leaf/Leaf_03.png",
        "assets/Leaf/Leaf_04.png",
        "assets/Leaf/Leaf_05.png",
        "assets/Leaf/Leaf_06.png",
        "assets/Leaf/Leaf_07.png",
        "assets/Leaf/Leaf_08.png",
      ],
    },
  },
];
const questionArray4 = [
  {
    item1: {
      item_name: "Car",
      image: "assets/Car/Car.png",
      type: "light",
      correct: true,
      spriteDuration: 1500,
      spriteImages: [
        "assets/Car/Car_00.png",
        "assets/Car/Car_01.png",
        "assets/Car/Car_02.png",
        "assets/Car/Car_03.png",
        "assets/Car/Car_04.png",
        "assets/Car/Car_05.png",
        "assets/Car/Car_06.png",
        "assets/Car/Car_07.png",
        "assets/Car/Car_08.png",
      ],
    },
    item2: {
      item_name: "Laptop",
      image: "assets/Laptop/Laptop.png",
      type: "heavy",
      correct: false,
      spriteDuration: 1200,
      spriteImages: [
        "assets/Laptop/Laptop_00.png",
        "assets/Laptop/Laptop_01.png",
        "assets/Laptop/Laptop_02.png",
        "assets/Laptop/Laptop_03.png",
        "assets/Laptop/Laptop_04.png",
        "assets/Laptop/Laptop_05.png",
        "assets/Laptop/Laptop_06.png",
        "assets/Laptop/Laptop_07.png",
        "assets/Laptop/Laptop_08.png",
      ],
    },
  },
];
const questionArray5 = [
  {
    item1: {
      item_name: "Pumpkin",
      image: "assets/Pumpkin/Pumpkin.png",
      type: "heavy",
      correct: true,
      spriteDuration: 1500,
      spriteImages: [
        "assets/Pumpkin/Pumpkin_00.png",
        "assets/Pumpkin/Pumpkin_01.png",
        "assets/Pumpkin/Pumpkin_02.png",
        "assets/Pumpkin/Pumpkin_03.png",
        "assets/Pumpkin/Pumpkin_04.png",
        "assets/Pumpkin/Pumpkin_05.png",
        "assets/Pumpkin/Pumpkin_06.png",
        "assets/Pumpkin/Pumpkin_07.png",
        "assets/Pumpkin/Pumpkin_08.png",
      ],
    },
    item2: {
      item_name: "Grape",
      image: "assets/Grape/Grape.png",
      type: "light",
      correct: false,
      spriteDuration: 1200,
      spriteImages: [
        "assets/Grape/Grape_00.png",
        "assets/Grape/Grape_01.png",
        "assets/Grape/Grape_02.png",
        "assets/Grape/Grape_03.png",
        "assets/Grape/Grape_04.png",
        "assets/Grape/Grape_05.png",
        "assets/Grape/Grape_06.png",
        "assets/Grape/Grape_07.png",
        "assets/Grape/Grape_08.png",
      ],
    },
  },
];
// Page 2 current question index (0-based, 0 on load, increment up to questionArray.length - 1)
let page2CurrentIndex = 0;

// Page 3 current question index (uses questionArray2)
let page3CurrentIndex = 0;

// Page 4 current question index (uses questionArray3)
let page4CurrentIndex = 0;

// Page 5 current question index (uses questionArray4)
let page5CurrentIndex = 0;

// Page 6 current question index (uses questionArray5)
let page6CurrentIndex = 0;

// Quiz Panel Detection Configuration
// Defines component types and IDs that should be treated as quiz panels
// Components listed here will disable the next button until a quizCompleted event is dispatched
const QUIZ_PANEL_DETECTION = {
  // Component types that are quiz panels
  componentTypes: ["QuizPanelComponent", "FillBlanksComponent", "StageComponent", "CalculationStepsComponent", "ArrangeStepsComponent", "FractionConversionController", "FlipTileComponent"],
  // Element IDs that contain these strings are treated as quiz panels
  // NOTE: 'working-box' was removed to avoid treating generic working boxes (like on page 17) as quizzes
  idPatterns: ["quiz", "quiz-panel", "calculation-steps", "arrange-steps", "fraction-conversion", "number-pad", "flip-tile"],
  // CSS classes that indicate quiz panels
  cssClasses: ["quiz-panel", "flip-tile-container"],
};

// Quiz Panel Row Height Configuration
// Defines default height percentages for each quiz type and subtype
const QUIZ_ROW_HEIGHTS = {
  MCQ: {
    QTI2: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 2 options
    QTI2R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 2 options in rows
    QTI3: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 3 options
    QTI3R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 3 options in rows
    QTI4: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 4 options
    QTI4R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image, 4 options in rows
    QTIS2: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image stack, 2 options
    QTIS2R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image stack, 2 options in rows
    QTIS3: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image stack, 3 options
    QTIS3R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image stack, 3 options in rows
    QTIS4: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image stack, 4 options
    QTIS4R: { header: 10, question: 20, options: 55, feedback: 15 }, // MCQ with image stack, 4 options in rows
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
    hasImageStack: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 95, // 85% of row height
    buttonWidthPercent: 80, // 75% of column width
  },
  QT3: {
    numberOfOptions: 3,
    hasImage: false,
    hasImageStack: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QT4: {
    numberOfOptions: 4,
    hasImage: false,
    hasImageStack: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QTI2: {
    numberOfOptions: 2,
    hasImage: true,
    hasImageStack: false,
    imageColumnWidth: 40, // 40% for image column
    optionsColumnWidth: 60, // 60% for options column
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QTI3: {
    numberOfOptions: 3,
    hasImage: true,
    hasImageStack: false,
    imageColumnWidth: 50,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 90,
  },
  QTI4: {
    numberOfOptions: 4,
    hasImage: true,
    hasImageStack: false,
    imageColumnWidth: 50,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 90,
  },
  QTI2R: {
    numberOfOptions: 2,
    hasImage: true,
    hasImageStack: false,
    imageColumnWidth: 60, // 40% for image column
    optionsColumnWidth: 40, // 60% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QTI3R: {
    numberOfOptions: 3,
    hasImage: true,
    hasImageStack: false,
    imageColumnWidth: 60, // 60% for image column
    optionsColumnWidth: 40, // 40% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QTI4R: {
    numberOfOptions: 4,
    hasImage: true,
    hasImageStack: false,
    imageColumnWidth: 60, // 40% for image column
    optionsColumnWidth: 40, // 60% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QT3R: {
    numberOfOptions: 3,
    hasImage: false,
    hasImageStack: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QT4R: {
    numberOfOptions: 4,
    hasImage: false,
    hasImageStack: false,
    imageColumnWidth: 0,
    optionsColumnWidth: 100,
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QTIS2: {
    numberOfOptions: 2,
    hasImage: false,
    hasImageStack: true,
    imageColumnWidth: 40, // 40% for image stack column
    optionsColumnWidth: 60, // 60% for options column
    buttonHeightPercent: 85,
    buttonWidthPercent: 75,
  },
  QTIS3: {
    numberOfOptions: 3,
    hasImage: false,
    hasImageStack: true,
    imageColumnWidth: 50,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 90,
  },
  QTIS4: {
    numberOfOptions: 4,
    hasImage: false,
    hasImageStack: true,
    imageColumnWidth: 50,
    optionsColumnWidth: 100,
    buttonHeightPercent: 85,
    buttonWidthPercent: 90,
  },
  QTIS2R: {
    numberOfOptions: 2,
    hasImage: false,
    hasImageStack: true,
    imageColumnWidth: 60, // 60% for image stack column
    optionsColumnWidth: 40, // 40% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QTIS3R: {
    numberOfOptions: 3,
    hasImage: false,
    hasImageStack: true,
    imageColumnWidth: 60, // 60% for image stack column
    optionsColumnWidth: 40, // 40% for options column
    buttonHeightPercent: 95, // 95% height for row layout
    buttonWidthPercent: 90, // 90% width for row layout
    layoutType: "rows", // Row-based layout
  },
  QTIS4R: {
    numberOfOptions: 4,
    hasImage: false,
    hasImageStack: true,
    imageColumnWidth: 60, // 60% for image stack column
    optionsColumnWidth: 40, // 40% for options column
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
    // Page 2: heavy/light image interaction — gates Next until quizCompleted (no QuizPanel DOM)
    if (pageNumber === 2) {
      console.log(
        `✅ [QuizDetection] Page ${pageNumber} uses interactive heavy/light flow (quiz gating)`
      );
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
        console.log(`✅ [QuizDetection] Found quiz component: ${componentType} (${elements.length} elements)`);
      }
    });

    // Check for ID patterns
    if (!hasQuiz) {
      config.idPatterns.forEach((pattern) => {
        const elements = document.querySelectorAll(`[id*="${pattern}"]`);
        if (elements.length > 0) {
          hasQuiz = true;
          console.log(`✅ [QuizDetection] Found quiz by ID pattern: "${pattern}" (${elements.length} elements)`);
        }
      });
    }

    // Check for CSS classes
    if (!hasQuiz) {
      config.cssClasses.forEach((cssClass) => {
        const elements = document.querySelectorAll(`.${cssClass}`);
        if (elements.length > 0) {
          hasQuiz = true;
          console.log(`✅ [QuizDetection] Found quiz by CSS class: "${cssClass}" (${elements.length} elements)`);
        }
      });
    }

    if (!hasQuiz) {
      console.log(`⚠️ [QuizDetection] No quiz detected for page ${pageNumber}`);
    }

    return hasQuiz;
  },

  // Initialize completion state for a page
  // NOTE: This is now simplified - components manage their own state via initialEnabled/initialVisible props
  // This manager is kept for backward compatibility and for quiz components to dispatch completion events
  initializePage(pageNumber) {
    this.init();
    const key = `page${pageNumber}Completed`;

    // Page 2: interactive flow gates Next via PageCompletionManager (see quizCompleted in PageConfig)
    if (pageNumber === 2 && this.checkPageHasQuiz(pageNumber)) {
      window.pageCompletionState[key] = false;
      console.log(
        `📄 [PageCompletion] Initialized ${key} = false (page 2 quiz / interaction)`
      );
      window.dispatchEvent(
        new CustomEvent("pageCompletionChanged", {
          detail: { pageNumber, completed: false },
        })
      );
      return false;
    }

    // Check if state already exists (don't overwrite if already set)
    if (window.pageCompletionState[key] !== undefined) {
      return window.pageCompletionState[key];
    }

    // Default: pages start as completed (buttons enabled)
    window.pageCompletionState[key] = true;

    console.log(
      `📄 [PageCompletion] Initialized ${key} = ${window.pageCompletionState[key]}`
    );

    return window.pageCompletionState[key];
  },

  // Get completion state for a page
  // NOTE: This is now simplified - components manage their own state via initialEnabled/initialVisible props
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
    questionArray,
    questionArray2,
    questionArray3,
    questionArray4,
    questionArray5,
    page2CurrentIndex,
    page3CurrentIndex,
    page4CurrentIndex,
    page5CurrentIndex,
    page6CurrentIndex,
    QUIZ_PANEL_DETECTION,
    QUIZ_ROW_HEIGHTS,
    QUIZ_OPTIONS_CONFIG,
    PageCompletionManager,
  };
} else {
  if (typeof window.currentQuestionIndex === "undefined") {
    window.currentQuestionIndex = currentQuestionIndex;
  }
  window.QUIZ_PANEL_DETECTION = QUIZ_PANEL_DETECTION;
  window.QUIZ_ROW_HEIGHTS = QUIZ_ROW_HEIGHTS;
  window.QUIZ_OPTIONS_CONFIG = QUIZ_OPTIONS_CONFIG;
  window.PageCompletionManager = PageCompletionManager;
  window.questionArray = questionArray;
  window.questionArray2 = questionArray2;
  window.questionArray3 = questionArray3;
  window.questionArray4 = questionArray4;
  window.questionArray5 = questionArray5;
  if (typeof window.page2CurrentIndex === "undefined") {
    window.page2CurrentIndex = page2CurrentIndex;
  }
  if (typeof window.page3CurrentIndex === "undefined") {
    window.page3CurrentIndex = page3CurrentIndex;
  }
  if (typeof window.page4CurrentIndex === "undefined") {
    window.page4CurrentIndex = page4CurrentIndex;
  }
  if (typeof window.page5CurrentIndex === "undefined") {
    window.page5CurrentIndex = page5CurrentIndex;
  }
  if (typeof window.page6CurrentIndex === "undefined") {
    window.page6CurrentIndex = page6CurrentIndex;
  }
}
