/**
 * Page Configuration
 *
 * - Grid positioning and element generation
 * - Page-specific UI element configurations
 * - Question-dependent element updates
 */

// Ensure page 5, page 7, and page 11 default state is protractor as soon as this script runs
if (typeof window !== "undefined") {
  window.page5PartState = window.page5PartState || "protractor";
  window.page7PartState = window.page7PartState || "protractor";
  window.page11PartState = window.page11PartState || "protractor";
}

// Debug marker: confirms the browser loaded this exact PageConfig.js file.
if (typeof window !== "undefined" && typeof console !== "undefined") {
  console.log("[PageConfig] loaded", {
    build: "2026-05-08T14:33",
    href: window.location && window.location.href,
  });
}

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
  3: { prev: 2, next: 14 },
  14: { prev: 3, next: 4 },
  4: { prev: 14, next: 5 },
  5: { prev: 4, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: 9 },
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: null },
  14: { prev: null, next: 15 },
  15: { prev: 14, next: 16 },
};

const getStackAdditionQuestions = () => {
  if (typeof i18n === "undefined" || typeof i18n.t !== "function") {
    return [];
  }

  const questions = i18n.t("question");
  return Array.isArray(questions) ? questions : [];
};

const getStackAdditionQuestionIndex = () => {
  const questions = getStackAdditionQuestions();
  if (!questions.length) return 0;

  const currentIndex =
    typeof window !== "undefined" && Number.isInteger(window.currentQuestionIndex)
      ? window.currentQuestionIndex
      : 0;

  return Math.max(0, Math.min(currentIndex, questions.length - 1));
};

const getStackAdditionQuestion = () => {
  const questions = getStackAdditionQuestions();
  if (!questions.length) return null;

  return questions[getStackAdditionQuestionIndex()] || questions[0] || null;
};

const isLastStackAdditionQuestion = () => {
  const questions = getStackAdditionQuestions();
  if (!questions.length) return true;

  return getStackAdditionQuestionIndex() >= questions.length - 1;
};

const advanceStackAdditionQuestion = () => {
  const questions = getStackAdditionQuestions();
  const currentIndex = getStackAdditionQuestionIndex();
  const nextIndex = questions.length > 0
    ? Math.min(currentIndex + 1, questions.length - 1)
    : 0;

  if (typeof window !== "undefined") {
    window.currentQuestionIndex = nextIndex;
  }

  return {
    currentIndex,
    nextIndex,
    totalQuestions: questions.length,
    isLast: questions.length === 0 || nextIndex >= questions.length - 1,
  };
};

const STACK_ADDITION_QUESTION_IMPACT_TILES = [
  [
    { panel: "simple", row: "sum", column: "O" },
    { panel: "simple", row: "sum", column: "T" },
    { panel: "simple", row: "carry", column: "Th" },
  ],
  [
    { panel: "simple", row: "sum", column: "H" },
    { panel: "simple", row: "sum", column: "O" },
    { panel: "simple", row: "carry", column: "H" },
  ],
  [
    { panel: "simple", row: "sum", column: "Th" },
    { panel: "simple", row: "sum", column: "H" },
    { panel: "simple", row: "carry", column: "T" },
  ],
  [
    { panel: "simple", row: "sum", column: "T" },
    { panel: "simple", row: "sum", column: "O" },
    { panel: "simple", row: "carry", column: "Th" },
  ],
  [
    { panel: "simple", row: "sum", column: "H" },
    { panel: "simple", row: "sum", column: "T" },
    { panel: "simple", row: "carry", column: "H" },
  ],
];

const getStackAdditionImpactTiles = () => {
  const questionIndex = getStackAdditionQuestionIndex();
  return STACK_ADDITION_QUESTION_IMPACT_TILES[
    questionIndex % STACK_ADDITION_QUESTION_IMPACT_TILES.length
  ];
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
 * Get shape configuration from constants.js (quadType) and quadrilateral-config.js (vertices).
 * Single source of truth: quadType in constants.js, default vertices in QuadrilateralConfig.
 * @returns {Object} Shape configuration object { quadType, vertices, gridRows, gridCols }
 */
const getShapeConfig = () => {
  const gridRows = 10;
  const gridCols = 10;
  const quadType = (typeof window !== 'undefined' && window.shape && window.shape.quadType)
    ? window.shape.quadType
    : "SQUARE";
  const rows = (typeof window !== 'undefined' && window.shape && window.shape.gridRows) ? window.shape.gridRows : gridRows;
  const cols = (typeof window !== 'undefined' && window.shape && window.shape.gridCols) ? window.shape.gridCols : gridCols;
  // Vertices from QuadrilateralConfig (single source of truth for geometry per type)
  const vertices = (typeof window !== 'undefined' && window.QuadrilateralConfig)
    ? window.QuadrilateralConfig.getDefaultVertices(quadType, rows, cols)
    : [
      { row: 2, col: 2 },
      { row: 2, col: 8 },
      { row: 8, col: 8 },
      { row: 8, col: 2 }
    ];
  return {
    quadType,
    vertices,
    gridRows: rows,
    gridCols: cols
  };
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
 * Helper function to navigate to a page
 * @param {number} targetPage - The page number to navigate to
 * @param {string} direction - 'next' or 'previous' (for logging)
 */
const navigateToPage = (targetPage, direction = "unknown") => {
  if (typeof window !== "undefined") {
    // Get current page before navigation
    const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;

    // Reset states for both current page (if exists) and target page
    if (currentPage && currentPage !== targetPage) {
      resetPageStates(currentPage);
    }

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
        `Ã°Å¸â€œâ€ž [Navigation] ${direction} - Dispatched page change event to page ${targetPage}`
      );
    }

    // Reset target page after a small delay (DOM cleanup only; skip dispatch so this page's animation sequence can start)
    setTimeout(() => {
      resetPageStates(targetPage, { skipDispatch: true });
    }, 100);
  }
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

  // Helper function for i18n text Ã¢â‚¬â€œ no hardcoded strings; all text from data.js (en/id)
  const getI18nText = (key, fallback, params = {}) => {
    if (typeof fallback === "object" && fallback !== null && !Array.isArray(fallback)) {
      params = fallback;
      fallback = undefined;
    }
    const value = typeof i18n !== "undefined" ? i18n.t(key, params) : (fallback !== undefined ? fallback : key);
    return value;
  };

  const questionBottomY = 150;

  // Return optimized GridPositionPages
  return {
    1: [
      // Left column: two rows (45% / 55% of height to y=810), then dialog + character
      {
        id: "page1-left-row-top",
        name: "left-panel-top",
        coordinates: [0, 0, 400, 400],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page1-left-row-bottom",
        name: "left-panel-bottom",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page1-left-dialog",
        name: "left-dialog",
        coordinates: [12, 12, 388, 375],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.dialogText"),
          showTail: true,
          tailDirection: "south",
          tailPlacement: "left",
          tailColor: "aqua",
          tailScale: 1.25,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          color: "#ffffff",
          fontSize: "30gc",
          lineHeight: "1.35",
          textAlign: "center",
          borderRadius: "16gc",
          padding: "14gc",
          borderWidth: "5gc",
          borderStyle: "solid",
          borderColor: "aqua",
          boxSizing: "border-box",
        },
      },
      {
        id: "page1-aisha",
        name: "aisha-character",
        type: "container",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-elevated)",
        props: {
          text: "",
          imageSrc: "assets/Aisha/Aisha Happy Wide.png",
          imageAlt: getI18nText("pages.page1.aishaAlt"),
        },
      },
      {
        id: "page1-middle-panel",
        name: "middle-panel",
        coordinates: [400, 0, 1200, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      // Long addition (page 1): decomposition uses converge + digit / place-value ghost labels;
      // grid width (4 vs 5 columns) follows LongAdditionComponent: max(sum, operands) digit length.
      (() => {
        // Page 1 long addition: window.PAGE1_LONG_ADDITION_* from `js/constants.js`.

        const LA_PLACE_KEYS = ["TTh", "Th", "H", "T", "O"];
        const LA_PLACE_VALUES = [10000, 1000, 100, 10, 1];

        const laTotalCols = (numbers) => {
          const nums = Array.isArray(numbers) ? numbers : [];
          const sum = nums.reduce((a, b) => a + b, 0);
          const max = Math.max(sum, ...nums, 0);
          const len = String(Math.max(1, max)).length;
          return len >= 5 ? 5 : 4;
        };

        const laPlaceKeyForColumn = (colIndex, totalCols) => {
          const offset = LA_PLACE_KEYS.length - totalCols;
          return LA_PLACE_KEYS[colIndex + offset];
        };

        const laPlaceValueForColumn = (colIndex, totalCols) => {
          const offset = LA_PLACE_VALUES.length - totalCols;
          return LA_PLACE_VALUES[colIndex + offset];
        };

        const laDigitsOf = (n, width) =>
          String(n).padStart(width, " ").slice(-width).split("");

        const laPlaceHumanName = (placeKey) => {
          const m = {
            O: "ones",
            T: "tens",
            H: "hundreds",
            Th: "thousands",
            TTh: "ten thousands",
          };
          return m[placeKey] || placeKey;
        };

        /** Sum of base digits in one column (ones column uses colIndex = totalCols - 1). */
        const laSumDigitsInColumn = (numbers, totalCols, colIndex) => {
          let s = 0;
          const nums = Array.isArray(numbers) ? numbers : [];
          for (const n of nums) {
            const digits = laDigitsOf(n, totalCols);
            const ch = digits[colIndex];
            const di = parseInt(ch, 10);
            if (Number.isFinite(di)) s += di;
          }
          return s;
        };

        /**
         * Max typed value for expanded column total in guided short flow, by place:
         * ones → 99, tens → 999, hundreds → 9999, thousands → 99999, …
         * `colIndex` is the same as in `laSumDigitsInColumn` / loop `c` (0 = MSB, totalCols-1 = ones).
         */
        const laMaxNumericForGuidedColumnTotal = (colIndex, totalCols) => {
          const tc = Math.max(1, totalCols);
          const c = Math.max(0, Math.min(colIndex, tc - 1));
          return 10 ** (tc - c + 1) - 1;
        };

        /** Intro + select-cell + one converge per non-blank digit per operand (ones → MSB). */
        const buildPage1LongAdditionDecompositionSteps = (numbers) => {
          const totalCols = laTotalCols(numbers);
          const order = [];
          for (let c = totalCols - 1; c >= 0; c--) order.push(c);

          const steps = [];

          steps.push({
            instruction:
              "We need to add the given numbers. Tap the blinking yellow box to begin.",
            reveal: {
              panels: ["simple"],
              rows: ["operand-0", "operand-1", "divider"],
              elements: ["operator-plus"],
            },
            emphasizeContainer: {
              panel: "simple",
              rows: ["operand-0", "operand-1"],
              paddingPx: 14,
            },
            advance: { type: "tap-revealed" },
          });

          steps.push({
            instruction:
              "Each digit lives in a place value column: thousands, hundreds, tens, ones.",
            reveal: { panels: ["simple"], rows: ["header"] },
            emphasizeContainer: {
              panel: "simple",
              rows: ["header"],
              paddingPx: 12,
            },
            advance: { type: "tap-revealed" },
          });

          const onesKey = laPlaceKeyForColumn(totalCols - 1, totalCols);
          steps.push({
            instruction:
              "Let us start decomposing the number as per place value. Click on the highlighted digit.",
            highlight: { panel: "simple", row: "operand-0", column: onesKey },
            highlightAppearance: "yellow-blink",
            action: {
              type: "select-cell",
              panel: "simple",
              row: "operand-0",
              column: onesKey,
            },
          });

          const nOps = Math.min(numbers.length, 3);
          const opWord = (idx) => (idx === 0 ? "first" : idx === 1 ? "second" : "third");
          for (let opIdx = 0; opIdx < nOps; opIdx++) {
            const rowLabel = `operand-${opIdx}`;
            const digits = laDigitsOf(numbers[opIdx], totalCols);

            for (let i = 0; i < order.length; i++) {
              const col = order[i];
              const placeKey = laPlaceKeyForColumn(col, totalCols);
              const pv = laPlaceValueForColumn(col, totalCols);
              const dChar = digits[col];
              if (dChar == null || dChar === "" || dChar === " ") continue;
              const d = parseInt(dChar, 10);
              if (!Number.isFinite(d)) continue;

              const isOnes = placeKey === "O";
              const isFirstOp0Converge = opIdx === 0 && isOnes && i === 0;

              let instruction;
              if (isFirstOp0Converge) {
                instruction =
                  "Every number is the sum of its place values. Click the blinking tile to place the ones value.";
              } else if (opIdx === 0) {
                instruction = `Now the ${laPlaceHumanName(placeKey)} place. Click the blinking tile to place the ${laPlaceHumanName(placeKey)} value.`;
              } else if (isOnes) {
                instruction = `Now decompose the ${opWord(opIdx)} number — ${laPlaceHumanName(placeKey)} place first. Click the blinking tile to place the ${laPlaceHumanName(placeKey)} value.`;
              } else {
                instruction = `${opWord(opIdx)[0].toUpperCase() + opWord(opIdx).slice(1)} number: ${laPlaceHumanName(placeKey)} place. Click the blinking tile to place the ${laPlaceHumanName(placeKey)} value.`;
              }

              steps.push({
                instruction,
                instructionOnAnimate: `${d} at ${laPlaceHumanName(placeKey)} place has a value of ${d} x ${pv} = ${d * pv}`,
                reveal: {
                  panels: ["simple", "expanded"],
                  rows: ["header"],
                  cells: [{ panel: "expanded", row: rowLabel, column: placeKey }],
                },
                highlight: { panel: "simple", row: rowLabel, column: placeKey },
                source: {
                  panel: "simple",
                  row: rowLabel,
                  column: placeKey,
                  ghostLabel: String(d),
                },
                secondSource: {
                  panel: "expanded",
                  row: "header",
                  column: placeKey,
                  ghostLabel: String(pv),
                },
                target: { panel: "expanded", row: rowLabel, column: placeKey },
                action: { type: "enter-value", expected: String(d * pv) },
                animation: "converge-to-target",
              });
            }
          }

          return steps;
        };

        const getPage1LongAdditionAdditionSteps = () => [
          {
            instruction:
              "Both numbers are decomposed. Let’s get ready to add.",
            // Show the separator line in the right (expanded) block, but do NOT
            // reveal the carry row yet.
            reveal: { panels: ["expanded"], rows: ["divider"] },
            advance: { type: "next" },
          },
          {
            instruction:
              "Now let’s add column by column, starting with ones.",
            reveal: { panels: ["expanded"], rows: ["place"] },
            advance: { type: "next" },
          },
          {
            instruction: "9 + 5 = 14. We write 4 in the ones column…",
            reveal: { cells: [{ panel: "expanded", row: "sum", column: "O" }] },
            highlight: { panel: "expanded", row: "sum", column: "O" },
            advance: { type: "next" },
          },
          {
            instruction: "…and carry the 1 to the tens column.",
            reveal: {
              panels: ["simple"],
              rows: ["carry"],
              cells: [{ panel: "simple", row: "carry", column: "T" }],
            },
            highlight: { panel: "simple", row: "carry", column: "T" },
            target: { panel: "simple", row: "carry", column: "T" },
            action: { type: "enter-value", expected: "1" },
            animation: "open-carry-row",
          },
          {
            instruction:
              "Tens: 50 + 60 = 110, plus the 10 we carried = 120. Write 20…",
            reveal: { cells: [{ panel: "expanded", row: "sum", column: "T" }] },
            highlight: { panel: "expanded", row: "sum", column: "T" },
            advance: { type: "next" },
          },
          {
            instruction: "…and carry 1 hundred over to the hundreds column.",
            reveal: { cells: [{ panel: "simple", row: "carry", column: "H" }] },
            highlight: { panel: "simple", row: "carry", column: "H" },
            target: { panel: "simple", row: "carry", column: "H" },
            action: { type: "enter-value", expected: "1" },
          },
          {
            instruction:
              "Hundreds: 400 + 900 = 1300, plus the 100 we carried = 1400. Write 400…",
            reveal: { cells: [{ panel: "expanded", row: "sum", column: "H" }] },
            highlight: { panel: "expanded", row: "sum", column: "H" },
            advance: { type: "next" },
          },
          {
            instruction: "…and carry 1 thousand to the thousands column.",
            reveal: { cells: [{ panel: "simple", row: "carry", column: "Th" }] },
            highlight: { panel: "simple", row: "carry", column: "Th" },
            target: { panel: "simple", row: "carry", column: "Th" },
            action: { type: "enter-value", expected: "1" },
          },
          {
            instruction:
              "Thousands: 5000 + 3000 = 8000, plus the 1000 we carried = 9000.",
            reveal: { cells: [{ panel: "expanded", row: "sum", column: "Th" }] },
            highlight: { panel: "expanded", row: "sum", column: "Th" },
            advance: { type: "next" },
          },
          {
            instruction:
              "The expanded sum is 9000 + 400 + 20 + 4 = 9424. Bring it back to the left block.",
            reveal: { panels: ["simple"], rows: ["sum"] },
            advance: { type: "next" },
          },
          {
            instruction: "5459 + 3965 = 9424. Great work!",
            advance: { type: "next" },
          },
        ];

        const page1LongAdditionScript = [
          ...buildPage1LongAdditionDecompositionSteps(
            window.PAGE1_LONG_ADDITION_NUMBERS
          ),
          ...getPage1LongAdditionAdditionSteps(),
        ].map((s, i) => ({ ...s, stepId: i }));

        /**
         * Build the column-input loop for the short flow:
         *   - One enter-value step per column (ones → MSB), expected = digitSum + carryIn.
         *   - When colSum >= 10 (and not the MSB): brief regroup explanation (auto), then
         *     interactive steps — enter the digit that stays in the column, then enter the
         *     carry as a place-value amount (10, 100, 1000, …), not the lone digit 1.
         *   - Final two steps reveal the simple-panel sum row and a celebration line.
         */
        const buildPage1ShortColumnSteps = (numbers) => {
          const totalCols = laTotalCols(numbers);
          const steps = [];
          let carryIn = 0;
          for (let c = totalCols - 1; c >= 0; c--) {
            const placeKey = laPlaceKeyForColumn(c, totalCols);
            const placeName = laPlaceHumanName(placeKey);
            const digitSum = laSumDigitsInColumn(numbers, totalCols, c);
            const colSum = digitSum + carryIn;
            const maxEntry = laMaxNumericForGuidedColumnTotal(c, totalCols);
            const placeUnit = laPlaceValueForColumn(c, totalCols);
            const colTotalAmount = colSum * placeUnit;

            steps.push({
              instruction: getI18nText(
                "common.longAddition.guidedFlowShort.columnInput",
                { place: placeName, carry: carryIn }
              ),
              reveal: {
                cells: [{ panel: "expanded", row: "sum", column: placeKey }],
              },
              emphasizeContainer: {
                panel: "expanded",
                columns: [placeKey],
                paddingPx: 12,
                transparentBackground: true,
              },
              target: { panel: "expanded", row: "sum", column: placeKey },
              action: {
                type: "enter-value",
                expected: String(colTotalAmount),
                maxNumericValue: maxEntry,
                wrongHint: {
                  kind: "columnTotal",
                  place: placeName,
                },
              },
              inputMode: "type",
            });

            if (colSum >= 10 && c > 0) {
              const carryPlaceKey = laPlaceKeyForColumn(c - 1, totalCols);
              const nextPlaceName = laPlaceHumanName(carryPlaceKey);
              const carryDigitVal = Math.floor(colSum / 10);
              const remainderAmount = String((colSum % 10) * placeUnit);
              const nextPlaceUnit = laPlaceValueForColumn(c - 1, totalCols);
              const carryAmount = String(carryDigitVal * nextPlaceUnit);

              // Brief explanation: why we need to regroup
              steps.push({
                instruction: getI18nText(
                  "common.longAddition.guidedFlowShort.regroupWhy",
                  {
                    total: colSum,
                    place: placeName,
                    nextPlace: nextPlaceName,
                  }
                ),
                advance: { type: "auto", delayMs: 2800 },
              });

              // Click the tile to animate the split: 14 → 4 stays, 10 flies to carry
              steps.push({
                instruction: getI18nText(
                  "common.longAddition.guidedFlowShort.clickToSplit",
                  {
                    total: colTotalAmount,
                    remainder: remainderAmount,
                    carryAmount,
                    place: placeName,
                    nextPlace: nextPlaceName,
                  }
                ),
                reveal: {
                  panels: ["expanded"],
                  rows: ["carry"],
                  cells: [{ panel: "expanded", row: "carry", column: carryPlaceKey }],
                },
                highlight: { panel: "expanded", row: "sum", column: placeKey },
                highlightAppearance: "yellow-blink",
                source: { panel: "expanded", row: "sum", column: placeKey },
                target: { panel: "expanded", row: "carry", column: carryPlaceKey },
                split: { sumDigit: remainderAmount, carryDigit: carryAmount },
                animation: "split-carry",
              });

              carryIn = carryDigitVal;
            } else {
              carryIn = 0;
            }
          }

          // Bring back: highlight the left block answer row (empty), then animate each
          // digit from the expanded sum to the simple sum (highest place → lowest).
          const sum = numbers.reduce((x, y) => x + y, 0);
          const sumDigits = laDigitsOf(sum, totalCols);

          // Build list of all simple:sum cells to reveal with "?" placeholders
          const simpleSumCells = [];
          for (let c = 0; c < totalCols; c++) {
            const pk = laPlaceKeyForColumn(c, totalCols);
            const d = sumDigits[c];
            if (d !== " " && d !== "") {
              simpleSumCells.push({ panel: "simple", row: "sum", column: pk });
            }
          }

          // Step: reveal the left block answer row with "?" placeholders, highlight it
          steps.push({
            instruction: getI18nText(
              "common.longAddition.guidedFlowShort.bringBack"
            ),
            reveal: {
              cells: simpleSumCells,
            },
            revealWithPlaceholder: true,
            emphasizeContainer: {
              panel: "simple",
              rows: ["sum"],
              paddingPx: 10,
              transparentBackground: true,
            },
            highlightAppearance: "yellow-blink",
            advance: { type: "tap-revealed" },
          });

          // For each column from MSB (0) to LSB (totalCols-1), animate the digit
          // flying from expanded:sum to simple:sum
          for (let c = 0; c < totalCols; c++) {
            const placeKey = laPlaceKeyForColumn(c, totalCols);
            const digit = sumDigits[c];
            if (digit === " " || digit === "") continue;
            const placeUnit = laPlaceValueForColumn(c, totalCols);
            const digitVal = parseInt(digit, 10);
            if (!Number.isFinite(digitVal)) continue;
            const expandedVal = String(digitVal * placeUnit);

            steps.push({
              instruction: getI18nText(
                "common.longAddition.guidedFlowShort.bringBackDigit",
                { digit: expandedVal, place: laPlaceHumanName(placeKey) }
              ),
              highlight: { panel: "expanded", row: "sum", column: placeKey },
              highlightAppearance: "yellow-blink",
              source: { panel: "expanded", row: "sum", column: placeKey, ghostLabel: digit },
              target: { panel: "simple", row: "sum", column: placeKey },
              action: {
                type: "enter-value",
                expected: digit,
              },
              inputMode: "reveal",
              animation: "transfer-source-to-target",
            });
          }

          // Once all digits have transferred, highlight the completed left answer row.
          steps.push({
            instruction: getI18nText(
              "common.longAddition.guidedFlowShort.final",
              {
                a: numbers[0],
                b: numbers[1],
                total: sum,
              }
            ),
            emphasizeContainer: {
              panel: "simple",
              rows: ["sum"],
              paddingPx: 10,
              transparentBackground: true,
              borderColor: "#22C55E",
            },
            advance: { type: "tap-revealed" },
          });
          return steps;
        };

        // `guided_flow_short` (page 1): same Step 0 + Step 1, then a dashed-container
        // focus on the first number. Clicking it reveals the expanded place header + the
        // first operand decomposition row.
        const buildGuidedFlowShortDecompositionSteps = (numbers) => {
          const nOps = Math.min(Array.isArray(numbers) ? numbers.length : 0, 3);
          const operandRows = [];
          for (let i = 0; i < nOps; i++) operandRows.push(`operand-${i}`);

          const steps = [];

          // Step 0: intro
          steps.push({
            instruction: getI18nText("common.longAddition.guidedFlowShort.step0"),
            reveal: {
              panels: ["simple"],
              rows: [...operandRows, "divider"],
              elements: ["operator-plus"],
            },
            emphasizeContainer: {
              panel: "simple",
              rows: operandRows,
              paddingPx: 14,
            },
            advance: { type: "tap-revealed" },
          });

          // Step 1: header
          steps.push({
            instruction: getI18nText("common.longAddition.guidedFlowShort.step1"),
            reveal: { panels: ["simple"], rows: ["header"] },
            emphasizeContainer: { panel: "simple", rows: ["header"], paddingPx: 12 },
            advance: { type: "tap-revealed" },
          });

          // Decompose each operand row (2 or 3)
          for (let opIdx = 0; opIdx < nOps; opIdx++) {
            const row = `operand-${opIdx}`;
            steps.push({
              instruction: getI18nText("common.longAddition.guidedFlowShort.decomposeFocus", {
                index: opIdx + 1,
                total: nOps,
              }),
              emphasizeContainer: { panel: "simple", rows: [row], paddingPx: 14 },
              advance: { type: "tap-revealed" },
            });

            steps.push({
              instruction: getI18nText("common.longAddition.guidedFlowShort.decomposeDone", {
                index: opIdx + 1,
                total: nOps,
              }),
              reveal: {
                panels: ["expanded"],
                rows: opIdx === nOps - 1 ? ["header", row, "divider"] : ["header", row],
              },
              advance: { type: "auto", delayMs: opIdx === nOps - 1 ? 1100 : 900 },
            });
          }

          // Bridge
          steps.push({
            instruction: getI18nText("common.longAddition.guidedFlowShort.step6Bridge", {
              total: nOps,
            }),
            advance: { type: "auto", delayMs: 3200 },
          });

          return steps;
        };

        const page1LongAdditionGuidedFlowShortScript = [
          ...buildGuidedFlowShortDecompositionSteps(
            window.PAGE1_LONG_ADDITION_NUMBERS
          ),
          ...buildPage1ShortColumnSteps(window.PAGE1_LONG_ADDITION_NUMBERS),
        ].map((s, i) => ({ ...s, stepId: i }));

        return {
          id: "page1-long-addition",
          name: "page1-long-addition",
          type: "custom",
          coordinates: [400, 100, 1550, 790],
          zIndex: "var(--z-elevated)",
          props: (() => {
            const isGuidedMode =
              window.PAGE1_LONG_ADDITION_MODE === "guided" ||
              window.PAGE1_LONG_ADDITION_MODE === "guided_flow_short";
            const baseProps = {
              componentType: "LongAdditionComponent",
              type: window.PAGE1_LONG_ADDITION_MODE,
              mode: "controlled",
              debugPanelLayout: false,
              showPanelBorders: false,
              showPanelGridLines: false,
              numbers: window.PAGE1_LONG_ADDITION_NUMBERS,
              variant: "both",
              placeValueRow: "skip-ones",
              operatorPosition: "auto",
              placeLabelsI18nKey: "common.longAddition.placeLabels",
              placeColorsI18nKey: "common.longAddition.placeColors",
              digitFontSize: "34gc",
              placeFontSize: "34gc",
              headerFontSize: "34gc",
              digitFontStyle: { fontWeight: "bold" },
              placeFontStyle: { fontWeight: "bold" },
              headerFontStyle: { fontWeight: "bold" },
              cardRadius: "4gc",
              textWidthBuffer: "60gc",
              rowGap: "30gc",
              columnGap: "5gc",
              expandedColumnGap: "50gc",
              leftBlock: "50gc",
              rightBlock: "200gc",
              middleBlock: "50gc",
              lockedCells: [],
            };
            if (isGuidedMode) {
              return {
                ...baseProps,
                // Component-level defaults (each step can override).
                guidedInputMode: "reveal",
                guidedValidation: "per-entry",
                instructionTargetId: "page1-left-dialog",
                convergeFlightDurationMs: 4000,
                script: page1LongAdditionGuidedFlowShortScript,
              };
            }
            // For `incorrect` / `fill-missing` modes the component auto-builds the
            // impacted cells from these convenience props (defined in constants.js).
            // Progress strip: grid coords + optional overlay style in constants.js
            // (PAGE1_LONG_ADDITION_*_PROGRESS_GRID_COORDS, *_OVERLAY_PANEL_STYLE).
            // Empty `impactTiles` means: pick `impactedTilesCount` random cells from
            // the eligible pool (excludes headers, the place row, and left-block
            // operand numbers; answer rows + expanded operand rows are eligible).
            const impactProps = {
              ...baseProps,
              // Drive the same external dialog used by guided mode so that the
              // running progress / check feedback shows in the dialog box.
              instructionTargetId: "page1-left-dialog",
              impactedTilesCount: window.PAGE1_LONG_ADDITION_IMPACTED_TILES_COUNT,
              impactTiles: window.PAGE1_LONG_ADDITION_IMPACT_TILES,
            };
            if (window.PAGE1_LONG_ADDITION_MODE === "incorrect") {
              return {
                ...impactProps,
                incorrectProgressPanelCoordinates:
                  window.PAGE1_LONG_ADDITION_INCORRECT_PROGRESS_GRID_COORDS,
                incorrectOverlayPanelStyle:
                  window.PAGE1_LONG_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE,
              };
            }
            if (window.PAGE1_LONG_ADDITION_MODE === "fill-missing") {
              return {
                ...impactProps,
                fillMissingProgressPanelCoordinates:
                  window.PAGE1_LONG_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS,
                fillMissingOverlayPanelStyle:
                  window.PAGE1_LONG_ADDITION_FILL_MISSING_OVERLAY_PANEL_STYLE,
              };
            }
            return impactProps;
          })(),
        };
      })(),
      {
        id: "page1-right-panel",
        name: "right-panel",
        coordinates: [1200, 0, 1600, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page1-instruction",
        name: "page1-instruction",
        coordinates: [550, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instruction"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page1-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [400, 820, 545, 900],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[1];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },
      // Check button — only for `incorrect` / `fill-missing` on page 1.
      // Position: edit PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS in js/constants.js
      // (also window.PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS). Dispatches
      // `longAdditionCheck` for LongAdditionComponent (instruction dialog feedback).
      ...(
        window.PAGE1_LONG_ADDITION_MODE === "incorrect" ||
          window.PAGE1_LONG_ADDITION_MODE === "fill-missing"
          ? [
            {
              id: "page1-check-button",
              name: "check-button",
              type: "button",
              coordinates: window.PAGE1_LONG_ADDITION_CHECK_BUTTON_COORDS,
              zIndex: "var(--z-button)",
              props: {
                get text() {
                  return getI18nText("buttons.check");
                },
                get disabled() {
                  return (
                    typeof window !== "undefined" &&
                    window.PAGE1_LONG_ADDITION_MODE === "incorrect" &&
                    window.PAGE1_LA_INCORRECT_ALL_FOUND === true
                  );
                },
                backgroundColor: "#F9A825",
                color: "#000000",
                fontSize: "32gc",
                fontWeight: "bold",
                borderRadius: "12gc",
                onClick: () => {
                  if (
                    typeof window !== "undefined" &&
                    window.playCarClickSound
                  ) {
                    window.playCarClickSound("next");
                  }
                  if (
                    typeof window !== "undefined" &&
                    typeof window.dispatchEvent === "function"
                  ) {
                    window.dispatchEvent(
                      new CustomEvent("longAdditionCheck", {
                        detail: { id: "page1-long-addition" },
                      })
                    );
                  }
                },
              },
            },
          ]
          : []
      ),
      {
        id: "page1-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
    ],

    // Page 2: Long Subtraction — mirrors page 1 layout, but uses LongSubtractionComponent.
    2: [
      {
        id: "page2-left-row-top",
        name: "left-panel-top",
        coordinates: [0, 0, 400, 400],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page2-left-row-bottom",
        name: "left-panel-bottom",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page2-left-dialog",
        name: "left-dialog",
        coordinates: [12, 12, 388, 375],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          // Reuse page 1 dialog copy for now (no new i18n keys required).
          text: getI18nText("pages.page1.dialogText"),
          showTail: true,
          tailDirection: "south",
          tailPlacement: "left",
          tailColor: "aqua",
          tailScale: 1.25,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          color: "#ffffff",
          fontSize: "30gc",
          lineHeight: "1.35",
          textAlign: "center",
          borderRadius: "16gc",
          padding: "14gc",
          borderWidth: "5gc",
          borderStyle: "solid",
          borderColor: "aqua",
          boxSizing: "border-box",
        },
      },
      {
        id: "page2-aisha",
        name: "aisha-character",
        type: "container",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-elevated)",
        props: {
          text: "",
          imageSrc: "assets/Aisha/Aisha Happy Wide.png",
          imageAlt: getI18nText("pages.page1.aishaAlt"),
        },
      },
      {
        id: "page2-middle-panel",
        name: "middle-panel",
        coordinates: [400, 0, 1200, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page2-long-subtraction",
        name: "page2-long-subtraction",
        type: "custom",
        coordinates: [400, 100, 1550, 790],
        zIndex: "var(--z-elevated)",
        props: (() => {
          const debug = (() => {
            if (typeof window === "undefined") return false;
            if (window.DEBUG_PAGE2_LONG_SUBTRACTION === true) return true;
            if (window.DEBUG_ALL === true) return true;
            try {
              return localStorage.getItem("DEBUG_PAGE2_LONG_SUBTRACTION") === "1";
            } catch {
              return false;
            }
          })();

          if (debug && typeof console !== "undefined") {
            console.log("[page2-long-subtraction] props() eval", {
              mode: window.PAGE2_LONG_SUBTRACTION_MODE,
              numbers: window.PAGE2_LONG_SUBTRACTION_NUMBERS,
            });
          }

          const isGuidedMode =
            window.PAGE2_LONG_SUBTRACTION_MODE === "guided" ||
            window.PAGE2_LONG_SUBTRACTION_MODE === "guided_flow_short";

          const buildPage2LongSubtractionGuidedFlowShortScript = (numbers) => {
            const a = Array.isArray(numbers) && numbers.length > 0 ? numbers[0] : 0;
            const b = Array.isArray(numbers) && numbers.length > 1 ? numbers[1] : 0;
            const diff = a - b;

            // The long-subtraction widgets (and place-label keys used throughout this
            // repo) top out at 5 columns: TTh, Th, H, T, O.
            const rawCols = Math.max(
              String(Math.abs(a)).length,
              String(Math.abs(b)).length,
              String(Math.abs(diff)).length
            );
            const totalCols = Math.max(1, Math.min(5, rawCols));

            // Self-contained helpers (don't rely on page-1-only helpers in this file).
            // Column keys are left-to-right (MSB → LSB).
            const placeKeysForTotalCols = (n) => {
              const cols = Math.max(1, Math.min(5, Number(n) || 1));
              if (cols === 1) return ["O"];
              if (cols === 2) return ["T", "O"];
              if (cols === 3) return ["H", "T", "O"];
              if (cols === 4) return ["Th", "H", "T", "O"];
              return ["TTh", "Th", "H", "T", "O"];
            };

            const placeHumanName = (placeKey) => {
              switch (placeKey) {
                case "O":
                  return "ones";
                case "T":
                  return "tens";
                case "H":
                  return "hundreds";
                case "Th":
                  return "thousands";
                case "TTh":
                  return "ten-thousands";
                default:
                  return "place";
              }
            };

            const placeKeys = placeKeysForTotalCols(totalCols);

            const clampToCols = (n) => {
              const abs = Math.abs(Number(n) || 0);
              const mod = totalCols >= 5 ? 100000 : Math.pow(10, totalCols);
              return abs % mod;
            };

            const aClamped = clampToCols(a);
            const bClamped = clampToCols(b);

            const aStr = String(aClamped).padStart(totalCols, "0");
            const bStr = String(bClamped).padStart(totalCols, "0");

            // Build a correct per-column plan using classic subtraction with borrow.
            // We compute expected digit answers and whether each column needed a borrow.
            const resultDigits = new Array(totalCols).fill("0");
            const borrowNeeded = new Array(totalCols).fill(false);
            let borrowFromLeft = 0;
            for (let i = totalCols - 1; i >= 0; i--) {
              const topRaw = parseInt(aStr[i], 10) - borrowFromLeft;
              const bottom = parseInt(bStr[i], 10);
              borrowFromLeft = 0;
              let top = topRaw;
              if (top < bottom) {
                top += 10;
                borrowFromLeft = 1;
                borrowNeeded[i] = true;
              }
              const out = top - bottom;
              resultDigits[i] = String(out);
            }

            const resultStr = resultDigits.join("");

            const steps = [];
            steps.push({
              instruction:
                "We need to subtract the given numbers. Tap the highlighted area to begin.",
              reveal: {
                panels: ["simple"],
                rows: ["operand-0", "operand-1", "divider"],
                elements: ["operator-minus"],
              },
              emphasizeContainer: {
                panel: "simple",
                rows: ["operand-0", "operand-1"],
                paddingPx: 14,
              },
              advance: { type: "tap-revealed" },
            });

            steps.push({
              instruction:
                "Each digit sits in a place value column (thousands, hundreds, tens, ones).",
              reveal: { panels: ["simple"], rows: ["header"] },
              emphasizeContainer: { panel: "simple", rows: ["header"], paddingPx: 12 },
              advance: { type: "tap-revealed" },
            });

            // Decomposition: focus + done for each operand (mirrors the long-addition
            // guided_flow_short flow). Reveals each operand on the expanded panel before
            // the per-column subtraction work begins.
            const nOps = 2;
            const operandRows = ["operand-0", "operand-1"];
            for (let opIdx = 0; opIdx < nOps; opIdx++) {
              const row = operandRows[opIdx];
              steps.push({
                instruction: `Let's decompose number ${opIdx + 1} of ${nOps}. Tap the highlighted number.`,
                emphasizeContainer: { panel: "simple", rows: [row], paddingPx: 14 },
                advance: { type: "tap-revealed" },
              });
              steps.push({
                instruction: `Decomposition complete — number ${opIdx + 1} is written as the sum of its place values.`,
                reveal: {
                  panels: ["expanded"],
                  rows: opIdx === nOps - 1 ? ["header", row, "divider"] : ["header", row],
                },
                advance: { type: "auto", delayMs: opIdx === nOps - 1 ? 1100 : 900 },
              });
            }

            // Track running top-digit values: each split-borrow decrements
            // the donor column. Used to compute source values for chain
            // borrows where one or more intermediate columns are zero.
            const topDigitState = aStr.split("").map((c) => parseInt(c, 10));
            // Once a chain runs through a column (intermediate or receiver),
            // that column's borrow is already represented and we skip emitting
            // its own borrow steps. Donors are NOT marked — they may still
            // need their own chain to satisfy their column subtraction.
            const chainAlreadyDone = new Array(totalCols).fill(false);

            // Per-column subtraction (right-to-left). Mirrors addition's
            // `columnInput` shape: each column's place-value difference is
            // typed into the EXPANDED (right) panel sum row. Borrow columns
            // first get a regroupWhy + animated split-borrow (mirroring
            // addition's regroupWhy + clickToSplit for carry); when an
            // intermediate column is zero, the chain extends across it.
            for (let idx = totalCols - 1; idx >= 0; idx--) {
              const placeKey = placeKeys[idx];
              const digit = resultStr[idx];
              const placeName = placeHumanName(placeKey);
              const placeUnit = Math.pow(10, totalCols - 1 - idx);
              const colExpandedAmount = parseInt(digit, 10) * placeUnit;
              const maxEntry = Math.pow(10, totalCols - idx + 1) - 1;
              const nextPlaceKey = idx > 0 ? placeKeys[idx - 1] : null;
              const nextPlaceName = nextPlaceKey ? placeHumanName(nextPlaceKey) : null;
              const borrowFlag = borrowNeeded[idx] ? 1 : 0;
              const borrowParenthetical = nextPlaceName
                ? ` (Borrow from ${nextPlaceName} place (if ${placeName} digit of first number less than second number): ${borrowFlag}.)`
                : "";

              // Helper for a columnInput step. `borrowLabel` (or null) sets
              // the pad's "Borrow from {label} place" button. `opts` controls
              // validation:
              //   borrowAction: 'advance' (button advances the script — used
              //     on borrow columns and chain escalation steps) or 'wrong'
              //     (button plays wrong sound + flashes the target — used on
              //     no-borrow columns and post-chain follow-ups).
              //   digitsAlwaysWrong: true on borrow columns where typing any
              //     value is flagged wrong (the only correct action is the
              //     borrow button).
              const makeColumnInputStep = (borrowLabel, instructionText, opts) => {
                const o = opts || {};
                const step = {
                  instruction: instructionText,
                  reveal: {
                    cells: [{ panel: "expanded", row: "sum", column: placeKey }],
                  },
                  revealWithPlaceholder: true,
                  emphasizeContainer: {
                    panel: "expanded",
                    columns: [placeKey],
                    paddingPx: 12,
                    transparentBackground: true,
                  },
                  highlight: { panel: "expanded", row: "sum", column: placeKey },
                  highlightAppearance: "yellow-blink",
                  target: { panel: "expanded", row: "sum", column: placeKey },
                  action: {
                    type: "enter-value",
                    expected: String(colExpandedAmount),
                    maxNumericValue: maxEntry,
                  },
                  inputMode: "type",
                };
                if (borrowLabel) {
                  step.borrowOption = borrowLabel;
                  step.borrowAction = o.borrowAction || "advance";
                }
                if (o.digitsAlwaysWrong) step.digitsAlwaysWrong = true;
                return step;
              };

              const willEmitChain =
                borrowNeeded[idx] && !chainAlreadyDone[idx] && nextPlaceKey;

              if (willEmitChain) {
                // Build the chain of donor columns. Scan leftward through
                // zero columns until we reach a column with a positive top
                // digit. chainCols[0] is the donor, chainCols[last] is idx.
                const chainCols = [idx];
                let scan = idx - 1;
                while (scan >= 0 && topDigitState[scan] === 0) {
                  chainCols.unshift(scan);
                  scan--;
                }
                if (scan >= 0) {
                  chainCols.unshift(scan);

                  // FIRST: columnInput-with-borrow on the receiver's answer
                  // cell. The learner sees `?` blink, taps it, the pad opens
                  // with digits + "Borrow from {nextPlace} place". Typing is
                  // wrong on a borrow column; only the borrow button advances.
                  steps.push(
                    makeColumnInputStep(
                      nextPlaceName,
                      `Subtract the ${placeName} column. Tap the answer tile and choose "Borrow from ${nextPlaceName} place" — typing a digit here will be marked wrong.${borrowParenthetical}`,
                      { borrowAction: "advance", digitsAlwaysWrong: true }
                    )
                  );

                  // Helper: human name of the column one step higher in the
                  // natural place hierarchy. Returns null if leftmost.
                  const placeAboveName = (colIdx) =>
                    colIdx <= 0 ? null : placeHumanName(placeKeys[colIdx - 1]);

                  // PHASE A — pure-escalation cellPanel steps for empty
                  // intermediates (everything between receiver and donor,
                  // exclusive of both). The correct button is "Borrow from
                  // {above} Place", just advances. "Borrow from this" is
                  // wrong here because the column is empty.
                  for (let i = 0; i < chainCols.length - 2; i++) {
                    const targetColIdx = chainCols[chainCols.length - 2 - i];
                    const targetPlaceKey = placeKeys[targetColIdx];
                    const targetPlaceName = placeHumanName(targetPlaceKey);
                    const aboveName = placeAboveName(targetColIdx);
                    const opts = [
                      {
                        label: `Borrow from this (${targetPlaceName} Place)`,
                        action: "wrong",
                      },
                    ];
                    if (aboveName) {
                      opts.push({
                        label: `Borrow from ${aboveName} Place`,
                        action: "advance",
                      });
                    }
                    steps.push({
                      instruction: `Click the ${targetPlaceName} digit of the top number. It's empty (0) — choose the correct button.`,
                      reveal: {
                        cells: [{ panel: "expanded", row: "operand-0", column: targetPlaceKey }],
                      },
                      highlight: { panel: "expanded", row: "operand-0", column: targetPlaceKey },
                      highlightAppearance: "yellow-blink",
                      cellPanelTarget: { panel: "expanded", row: "operand-0", column: targetPlaceKey },
                      cellPanelOptions: opts,
                    });
                  }

                  // PHASE B — animation cellPanel steps, one per chain link.
                  // Each step is a cellPanel anchored on operand-0 for the
                  // FIRST link (donor's digit is still its original value),
                  // and on the BORROW ROW for subsequent links (operand has
                  // been struck through by the previous animation; the
                  // relevant value now lives in the column's borrow row).
                  // "Borrow from this" has action 'split-borrow' and triggers
                  // the animation directly. "Borrow from {above}" is wrong.
                  for (let linkIdx = 0; linkIdx < chainCols.length - 1; linkIdx++) {
                    const fromCol = chainCols[linkIdx];
                    const toCol = chainCols[linkIdx + 1];
                    const fromPlaceUnit = Math.pow(10, totalCols - 1 - fromCol);
                    const fromPlaceName = placeHumanName(placeKeys[fromCol]);
                    const toPlaceName = placeHumanName(placeKeys[toCol]);
                    const isFirstLink = linkIdx === 0;
                    // Click anchor + animation source row both follow the
                    // "use borrow if populated, else operand" rule.
                    const anchorRow = isFirstLink ? "operand-0" : "borrow";
                    const sourceRow = anchorRow;
                    const fromBeforeValue = isFirstLink
                      ? topDigitState[fromCol] * fromPlaceUnit
                      : Math.pow(10, totalCols - 1 - chainCols[linkIdx - 1]);
                    const carryAmount = fromPlaceUnit;
                    const fromAfterValue = fromBeforeValue - carryAmount;
                    const aboveName = placeAboveName(fromCol);

                    const opts = [
                      {
                        label: `Borrow from this (${fromPlaceName} Place)`,
                        action: "split-borrow",
                      },
                    ];
                    if (aboveName) {
                      opts.push({
                        label: `Borrow from ${aboveName} Place`,
                        action: "wrong",
                      });
                    }

                    steps.push({
                      instruction: isFirstLink
                        ? `Click the ${fromPlaceName} digit of the top number — it has ${fromBeforeValue}. Choose "Borrow from this (${fromPlaceName} Place)" to split it.`
                        : `The ${fromPlaceName} place now has ${fromBeforeValue} in its borrow row. Click that cell and choose "Borrow from this (${fromPlaceName} Place)" to continue.`,
                      reveal: {
                        panels: ["expanded"],
                        rows: ["borrow"],
                        cells: [
                          { panel: "expanded", row: "borrow", column: placeKeys[fromCol] },
                          { panel: "expanded", row: "borrow", column: placeKeys[toCol] },
                          { panel: "expanded", row: "operand-0", column: placeKeys[fromCol] },
                        ],
                      },
                      highlight: { panel: "expanded", row: anchorRow, column: placeKeys[fromCol] },
                      highlightAppearance: "yellow-blink",
                      cellPanelTarget: { panel: "expanded", row: anchorRow, column: placeKeys[fromCol] },
                      cellPanelOptions: opts,
                      // Animation fields used when "Borrow from this" is tapped.
                      source: { panel: "expanded", row: sourceRow, column: placeKeys[fromCol] },
                      target: { panel: "expanded", row: "borrow", column: placeKeys[toCol] },
                      split: {
                        sumDigit: String(fromAfterValue),
                        carryDigit: String(carryAmount),
                      },
                      animation: "split-borrow",
                      strikeThroughOnDonor: isFirstLink,
                    });
                  }

                  topDigitState[chainCols[0]] -= 1;
                  for (let i = 1; i < chainCols.length; i++) {
                    chainAlreadyDone[chainCols[i]] = true;
                  }
                }

                // Follow-up columnInput — borrow button is still rendered
                // (subtraction always shows it) but tapping it is wrong now
                // because the chain already played.
                steps.push(
                  makeColumnInputStep(
                    nextPlaceName,
                    `Now type the ${placeName} digit in the yellow tile.`,
                    { borrowAction: "wrong" }
                  )
                );
              } else {
                // Non-borrow column. Borrow button rendered (when there is a
                // next-higher place) but tapping it is wrong — the user must
                // type the correct digit.
                steps.push(
                  makeColumnInputStep(
                    nextPlaceName,
                    `Subtract the ${placeName} column. Type the subtracted value in the yellow tile, then tap Check.${borrowParenthetical}`,
                    nextPlaceName ? { borrowAction: "wrong" } : undefined
                  )
                );
              }
            }

            // Bring back: reveal simple sum row with placeholders, then
            // animate each expanded difference digit into its simple cell
            // (highest place → ones). Mirrors addition's bring-back phase.
            const simpleSumCells = placeKeys.map((k) => ({
              panel: "simple",
              row: "sum",
              column: k,
            }));
            steps.push({
              instruction:
                "Now bring the difference back to the left block. Tap the highlighted answer row.",
              reveal: { cells: simpleSumCells },
              revealWithPlaceholder: true,
              emphasizeContainer: {
                panel: "simple",
                rows: ["sum"],
                paddingPx: 10,
                transparentBackground: true,
              },
              highlightAppearance: "yellow-blink",
              advance: { type: "tap-revealed" },
            });

            for (let idx = 0; idx < totalCols; idx++) {
              const placeKey = placeKeys[idx];
              const digit = resultStr[idx];
              const placeName = placeHumanName(placeKey);
              const placeUnit = Math.pow(10, totalCols - 1 - idx);
              const expandedVal = String(parseInt(digit, 10) * placeUnit);
              steps.push({
                instruction: `Tap ${expandedVal} to move it to the ${placeName} answer tile.`,
                highlight: { panel: "expanded", row: "sum", column: placeKey },
                highlightAppearance: "yellow-blink",
                source: {
                  panel: "expanded",
                  row: "sum",
                  column: placeKey,
                  ghostLabel: digit,
                },
                target: { panel: "simple", row: "sum", column: placeKey },
                action: {
                  type: "enter-value",
                  expected: digit,
                },
                inputMode: "reveal",
                animation: "transfer-source-to-target",
              });
            }

            steps.push({
              instruction: `${aClamped} − ${bClamped} = ${parseInt(resultStr, 10)}. Great work!`,
              emphasizeContainer: {
                panel: "simple",
                rows: ["sum"],
                paddingPx: 10,
                transparentBackground: true,
                borderColor: "#22C55E",
              },
              advance: { type: "tap-revealed" },
            });

            const normalized = steps.map((s, i) => ({ ...s, stepId: i }));
            if (debug && typeof console !== "undefined") {
              console.log("[page2-long-subtraction] building guided_flow_short script", {
                numbers,
                a,
                b,
                aClamped,
                bClamped,
                rawCols,
                totalCols,
                scriptLength: normalized.length,
                step0: normalized[0],
              });
            }
            return normalized;
          };

          const baseProps = {
            componentType: "LongSubtractionComponent",
            type: window.PAGE2_LONG_SUBTRACTION_MODE,
            mode: "controlled",
            debugPanelLayout: false,
            showPanelBorders: false,
            showPanelGridLines: false,
            numbers: window.PAGE2_LONG_SUBTRACTION_NUMBERS,
            variant: "both",
            placeValueRow: "skip-ones",
            operatorPosition: "auto",
            placeLabelsI18nKey: "common.longAddition.placeLabels",
            placeColorsI18nKey: "common.longAddition.placeColors",
            digitFontSize: "34gc",
            placeFontSize: "34gc",
            headerFontSize: "34gc",
            digitFontStyle: { fontWeight: "bold" },
            placeFontStyle: { fontWeight: "bold" },
            headerFontStyle: { fontWeight: "bold" },
            cardRadius: "4gc",
            textWidthBuffer: "60gc",
            rowGap: "30gc",
            columnGap: "5gc",
            expandedColumnGap: "50gc",
            leftBlock: "50gc",
            rightBlock: "200gc",
            middleBlock: "50gc",
            lockedCells: [],
            instructionTargetId: "page2-left-dialog",
            impactedTilesCount: window.PAGE2_LONG_SUBTRACTION_IMPACTED_TILES_COUNT,
            impactTiles: window.PAGE2_LONG_SUBTRACTION_IMPACT_TILES,
          };
          if (isGuidedMode) {
            const script = buildPage2LongSubtractionGuidedFlowShortScript(
              window.PAGE2_LONG_SUBTRACTION_NUMBERS
            );
            // Always log a tiny summary in guided modes so we can confirm the script
            // is being built and passed (helps debug "no visible change" reports).
            if (typeof console !== "undefined") {
              console.log("[page2-long-subtraction] guided script summary", {
                mode: window.PAGE2_LONG_SUBTRACTION_MODE,
                scriptLength: Array.isArray(script) ? script.length : null,
                step0: Array.isArray(script) && script[0] ? script[0] : null,
              });
            }
            return {
              ...baseProps,
              guidedInputMode: "reveal",
              guidedValidation: "per-entry",
              script,
            };
          }
          if (window.PAGE2_LONG_SUBTRACTION_MODE === "incorrect") {
            return {
              ...baseProps,
              incorrectProgressPanelCoordinates:
                window.PAGE2_LONG_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS,
              incorrectOverlayPanelStyle:
                window.PAGE2_LONG_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE,
            };
          }
          if (window.PAGE2_LONG_SUBTRACTION_MODE === "fill-missing") {
            return {
              ...baseProps,
              fillMissingProgressPanelCoordinates:
                window.PAGE2_LONG_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS,
              fillMissingOverlayPanelStyle:
                window.PAGE2_LONG_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE,
            };
          }
          return baseProps;
        })(),
      },
      {
        id: "page2-right-panel",
        name: "right-panel",
        coordinates: [1200, 0, 1600, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [550, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instruction"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page2-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [400, 820, 545, 900],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[2];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },
      // Check button — only for `incorrect` / `fill-missing` on page 2.
      ...(
        window.PAGE2_LONG_SUBTRACTION_MODE === "incorrect" ||
          window.PAGE2_LONG_SUBTRACTION_MODE === "fill-missing"
          ? [
            {
              id: "page2-check-button",
              name: "check-button",
              type: "button",
              coordinates: window.PAGE2_LONG_SUBTRACTION_CHECK_BUTTON_COORDS,
              zIndex: "var(--z-button)",
              props: {
                get text() {
                  return getI18nText("buttons.check");
                },
                get disabled() {
                  return (
                    typeof window !== "undefined" &&
                    window.PAGE2_LONG_SUBTRACTION_MODE === "incorrect" &&
                    window.PAGE2_LS_INCORRECT_ALL_FOUND === true
                  );
                },
                backgroundColor: "#F9A825",
                color: "#000000",
                fontSize: "32gc",
                fontWeight: "bold",
                borderRadius: "12gc",
                onClick: () => {
                  if (
                    typeof window !== "undefined" &&
                    window.playCarClickSound
                  ) {
                    window.playCarClickSound("next");
                  }
                  if (
                    typeof window !== "undefined" &&
                    typeof window.dispatchEvent === "function"
                  ) {
                    window.dispatchEvent(
                      new CustomEvent("longSubtractionCheck", {
                        detail: { id: "page2-long-subtraction" },
                      })
                    );
                  }
                },
              },
            },
          ]
          : []
      ),
      {
        id: "page2-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
    ],

    // Page 3: Stack Subtraction — uses the new StackSubtractionComponent
    // (LongSubtractionComponent forced to variant: 'simple' — no expanded
    // place-value decomposition panel). Mirrors the page 2 chrome.
    3: [
      {
        id: "page3-left-row-top",
        name: "left-panel-top",
        coordinates: [0, 0, 400, 400],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page3-left-row-bottom",
        name: "left-panel-bottom",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page3-left-dialog",
        name: "left-dialog",
        coordinates: [12, 12, 388, 375],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.dialogText"),
          showTail: true,
          tailDirection: "south",
          tailPlacement: "left",
          tailColor: "aqua",
          tailScale: 1.25,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          color: "#ffffff",
          fontSize: "30gc",
          lineHeight: "1.35",
          textAlign: "center",
          borderRadius: "16gc",
          padding: "14gc",
          borderWidth: "5gc",
          borderStyle: "solid",
          borderColor: "aqua",
          boxSizing: "border-box",
        },
      },
      {
        id: "page3-aisha",
        name: "aisha-character",
        type: "container",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-elevated)",
        props: {
          text: "",
          imageSrc: "assets/Aisha/Aisha Happy Wide.png",
          imageAlt: getI18nText("pages.page1.aishaAlt"),
        },
      },
      {
        id: "page3-middle-panel",
        name: "middle-panel",
        coordinates: [400, 0, 1200, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page3-stack-subtraction",
        name: "page3-stack-subtraction",
        type: "custom",
        coordinates: [400, 100, 1550, 790],
        zIndex: "var(--z-elevated)",
        props: (() => {
          const debug = (() => {
            if (typeof window === "undefined") return false;
            if (window.DEBUG_PAGE3_STACK_SUBTRACTION === true) return true;
            if (window.DEBUG_ALL === true) return true;
            try {
              return localStorage.getItem("DEBUG_PAGE3_STACK_SUBTRACTION") === "1";
            } catch {
              return false;
            }
          })();

          if (debug && typeof console !== "undefined") {
            console.log("[page3-stack-subtraction] props() eval", {
              mode: window.PAGE3_STACK_SUBTRACTION_MODE,
              numbers: window.PAGE3_STACK_SUBTRACTION_NUMBERS,
            });
          }

          const isGuidedMode =
            window.PAGE3_STACK_SUBTRACTION_MODE === "guided" ||
            window.PAGE3_STACK_SUBTRACTION_MODE === "guided_flow_short";

          // Minimal stack-only guided_flow_short script: no decomposition
          // (stack component has no expanded panel). Walks the user through
          // typing each column's difference digit into the simple sum row,
          // right-to-left, with an inline borrow announcement when needed.
          const buildPage3StackSubtractionScript = (numbers) => {
            const a = Array.isArray(numbers) && numbers.length > 0 ? numbers[0] : 0;
            const b = Array.isArray(numbers) && numbers.length > 1 ? numbers[1] : 0;
            const diff = a - b;
            const rawCols = Math.max(
              String(Math.abs(a)).length,
              String(Math.abs(b)).length,
              String(Math.abs(diff)).length
            );
            const totalCols = Math.max(1, Math.min(5, rawCols));
            const placeKeysForTotalCols = (n) => {
              const cols = Math.max(1, Math.min(5, Number(n) || 1));
              if (cols === 1) return ["O"];
              if (cols === 2) return ["T", "O"];
              if (cols === 3) return ["H", "T", "O"];
              if (cols === 4) return ["Th", "H", "T", "O"];
              return ["TTh", "Th", "H", "T", "O"];
            };
            const placeHumanName = (placeKey) => {
              switch (placeKey) {
                case "O": return "ones";
                case "T": return "tens";
                case "H": return "hundreds";
                case "Th": return "thousands";
                case "TTh": return "ten-thousands";
                default: return "place";
              }
            };
            const placeKeys = placeKeysForTotalCols(totalCols);
            const clampToCols = (n) => {
              const abs = Math.abs(Number(n) || 0);
              const mod = totalCols >= 5 ? 100000 : Math.pow(10, totalCols);
              return abs % mod;
            };
            const aClamped = clampToCols(a);
            const bClamped = clampToCols(b);
            const aStr = String(aClamped).padStart(totalCols, "0");
            const bStr = String(bClamped).padStart(totalCols, "0");

            const resultDigits = new Array(totalCols).fill("0");
            const borrowNeeded = new Array(totalCols).fill(false);
            let borrowFromLeft = 0;
            for (let i = totalCols - 1; i >= 0; i--) {
              const topRaw = parseInt(aStr[i], 10) - borrowFromLeft;
              const bottom = parseInt(bStr[i], 10);
              borrowFromLeft = 0;
              let top = topRaw;
              if (top < bottom) {
                top += 10;
                borrowFromLeft = 1;
                borrowNeeded[i] = true;
              }
              resultDigits[i] = String(top - bottom);
            }
            const resultStr = resultDigits.join("");

            const steps = [];
            steps.push({
              instruction:
                "We need to subtract the given numbers. Tap the highlighted area to begin.",
              reveal: {
                panels: ["simple"],
                rows: ["operand-0", "operand-1", "divider"],
                elements: ["operator-minus"],
              },
              emphasizeContainer: {
                panel: "simple",
                rows: ["operand-0", "operand-1"],
                paddingPx: 14,
              },
              advance: { type: "tap-revealed" },
            });
            steps.push({
              instruction:
                "Each digit sits in a place value column (thousands, hundreds, tens, ones).",
              reveal: { panels: ["simple"], rows: ["header"] },
              emphasizeContainer: { panel: "simple", rows: ["header"], paddingPx: 12 },
              advance: { type: "tap-revealed" },
            });
            // Running top-digit state (decrements when a column donates).
            // Used to compute correct source values across multiple chains.
            const topDigitState = aStr.split("").map((c) => parseInt(c, 10));
            const chainAlreadyDone = new Array(totalCols).fill(false);
            const placeAboveName = (colIdx) =>
              colIdx <= 0 ? null : placeHumanName(placeKeys[colIdx - 1]);

            const makeSumColumnInputStep = (opts) => ({
              instruction: opts.instructionText,
              reveal: {
                cells: [{ panel: "simple", row: "sum", column: opts.placeKey }],
              },
              revealWithPlaceholder: true,
              highlight: { panel: "simple", row: "sum", column: opts.placeKey },
              highlightAppearance: "yellow-blink",
              emphasizeContainer: {
                panel: "simple",
                columns: [opts.placeKey],
                paddingPx: 12,
                transparentBackground: true,
              },
              target: { panel: "simple", row: "sum", column: opts.placeKey },
              action: {
                type: "enter-value",
                expected: opts.digit,
                maxNumericValue: 9,
              },
              inputMode: "type",
              ...(opts.borrowOption
                ? {
                  borrowOption: opts.borrowOption,
                  borrowAction: opts.borrowAction,
                }
                : {}),
              ...(opts.digitsAlwaysWrong ? { digitsAlwaysWrong: true } : {}),
            });

            for (let idx = totalCols - 1; idx >= 0; idx--) {
              const placeKey = placeKeys[idx];
              const digit = resultDigits[idx];
              const placeName = placeHumanName(placeKey);
              const nextPlaceKey = idx > 0 ? placeKeys[idx - 1] : null;
              const nextPlaceName = nextPlaceKey
                ? placeHumanName(nextPlaceKey)
                : null;
              const willEmitChain =
                borrowNeeded[idx] && !chainAlreadyDone[idx] && nextPlaceKey;

              if (willEmitChain) {
                // Build chain (donor + intermediates + receiver) by scanning
                // leftward through zero columns until a non-zero donor.
                const chainCols = [idx];
                let scan = idx - 1;
                while (scan >= 0 && topDigitState[scan] === 0) {
                  chainCols.unshift(scan);
                  scan--;
                }
                if (scan >= 0) {
                  chainCols.unshift(scan);
                }

                if (scan >= 0) {
                  // FIRST: columnInput-with-borrow on the receiver's `?`.
                  // Typing is locked; only the pad's borrow button advances.
                  steps.push(
                    makeSumColumnInputStep({
                      placeKey,
                      digit,
                      instructionText: `Subtract the ${placeName} column. Tap the answer tile and choose "Borrow from ${nextPlaceName} place" — typing here will be marked wrong.`,
                      borrowOption: nextPlaceName,
                      borrowAction: "advance",
                      digitsAlwaysWrong: true,
                    })
                  );

                  // PHASE A — escalation cellPanel steps for empty
                  // intermediates between receiver and donor.
                  for (let i = 0; i < chainCols.length - 2; i++) {
                    const targetColIdx = chainCols[chainCols.length - 2 - i];
                    const targetPlaceKey = placeKeys[targetColIdx];
                    const targetPlaceName = placeHumanName(targetPlaceKey);
                    const aboveName = placeAboveName(targetColIdx);
                    const opts = [
                      {
                        label: `Borrow from this (${targetPlaceName} Place)`,
                        action: "wrong",
                      },
                    ];
                    if (aboveName) {
                      opts.push({
                        label: `Borrow from ${aboveName} Place`,
                        action: "advance",
                      });
                    }
                    steps.push({
                      instruction: `Click the ${targetPlaceName} digit of the top number. It's empty (0) — choose the correct button.`,
                      reveal: {
                        cells: [
                          {
                            panel: "simple",
                            row: "operand-0",
                            column: targetPlaceKey,
                          },
                        ],
                      },
                      highlight: {
                        panel: "simple",
                        row: "operand-0",
                        column: targetPlaceKey,
                      },
                      highlightAppearance: "yellow-blink",
                      cellPanelTarget: {
                        panel: "simple",
                        row: "operand-0",
                        column: targetPlaceKey,
                      },
                      cellPanelOptions: opts,
                    });
                  }

                  // PHASE B — animation cellPanel steps, one per chain link.
                  for (let linkIdx = 0; linkIdx < chainCols.length - 1; linkIdx++) {
                    const fromCol = chainCols[linkIdx];
                    const toCol = chainCols[linkIdx + 1];
                    const fromPlaceName = placeHumanName(placeKeys[fromCol]);
                    const toPlaceName = placeHumanName(placeKeys[toCol]);
                    const isFirstLink = linkIdx === 0;
                    // Click anchor + animation source row follow the
                    // "use borrow if populated, else operand" rule.
                    const anchorRow = isFirstLink ? "operand-0" : "borrow";
                    const sourceRow = anchorRow;
                    // For non-first links the source is the intermediate
                    // column's borrow row, which the previous link committed
                    // as (operand_digit + 10) for that column. We need the
                    // same value here so the morph reads "remainder + 1 =
                    // before" correctly.
                    const fromBeforeValue = isFirstLink
                      ? topDigitState[fromCol]
                      : (parseInt(aStr[fromCol], 10) || 0) + 10;
                    const carryAmount = 1;
                    const fromAfterValue = fromBeforeValue - carryAmount;
                    const aboveName = placeAboveName(fromCol);
                    const opts = [
                      {
                        label: `Borrow from this (${fromPlaceName} Place)`,
                        action: "split-borrow",
                      },
                    ];
                    if (aboveName) {
                      opts.push({
                        label: `Borrow from ${aboveName} Place`,
                        action: "wrong",
                      });
                    }
                    steps.push({
                      instruction: isFirstLink
                        ? `Click the ${fromPlaceName} digit of the top number — it has ${fromBeforeValue}. Choose "Borrow from this (${fromPlaceName} Place)" to split it.`
                        : `The ${fromPlaceName} place now has ${fromBeforeValue} in its borrow row. Click that cell and choose "Borrow from this (${fromPlaceName} Place)" to continue.`,
                      reveal: {
                        panels: ["simple"],
                        rows: ["borrow"],
                        cells: [
                          { panel: "simple", row: "borrow", column: placeKeys[fromCol] },
                          { panel: "simple", row: "borrow", column: placeKeys[toCol] },
                          { panel: "simple", row: "operand-0", column: placeKeys[fromCol] },
                        ],
                      },
                      highlight: {
                        panel: "simple",
                        row: anchorRow,
                        column: placeKeys[fromCol],
                      },
                      highlightAppearance: "yellow-blink",
                      cellPanelTarget: {
                        panel: "simple",
                        row: anchorRow,
                        column: placeKeys[fromCol],
                      },
                      cellPanelOptions: opts,
                      source: {
                        panel: "simple",
                        row: sourceRow,
                        column: placeKeys[fromCol],
                      },
                      target: {
                        panel: "simple",
                        row: "borrow",
                        column: placeKeys[toCol],
                      },
                      split: {
                        sumDigit: String(fromAfterValue),
                        carryDigit: String(carryAmount),
                      },
                      animation: "split-borrow",
                      strikeThroughOnDonor: isFirstLink,
                    });
                  }

                  topDigitState[chainCols[0]] -= 1;
                  for (let i = 1; i < chainCols.length; i++) {
                    chainAlreadyDone[chainCols[i]] = true;
                  }
                }

                // Follow-up columnInput — borrow button is still rendered
                // (subtraction pad always shows it) but tapping it is wrong.
                steps.push(
                  makeSumColumnInputStep({
                    placeKey,
                    digit,
                    instructionText: `Now type the ${placeName} digit in the yellow tile.`,
                    borrowOption: nextPlaceName,
                    borrowAction: "wrong",
                  })
                );
              } else {
                // No new chain to emit (no borrow needed OR chain already
                // ran through this column). Single columnInput.
                steps.push(
                  makeSumColumnInputStep({
                    placeKey,
                    digit,
                    instructionText: borrowNeeded[idx]
                      ? `Now type the ${placeName} digit in the yellow tile.`
                      : `Type the ${placeName} digit.`,
                    borrowOption: nextPlaceName,
                    borrowAction: nextPlaceName ? "wrong" : undefined,
                  })
                );
              }
            }
            steps.push({
              instruction: `${aClamped} − ${bClamped} = ${parseInt(resultStr, 10)}. Great work!`,
              emphasizeContainer: {
                panel: "simple",
                rows: ["sum"],
                paddingPx: 10,
                transparentBackground: true,
                borderColor: "#22C55E",
              },
              advance: { type: "tap-revealed" },
            });

            return steps.map((s, i) => ({ ...s, stepId: i }));
          };

          const baseProps = {
            componentType: "StackSubtractionComponent",
            type: window.PAGE3_STACK_SUBTRACTION_MODE,
            mode: "controlled",
            debugPanelLayout: false,
            showPanelBorders: false,
            showPanelGridLines: false,
            numbers: window.PAGE3_STACK_SUBTRACTION_NUMBERS,
            placeLabelsI18nKey: "common.longAddition.placeLabels",
            placeColorsI18nKey: "common.longAddition.placeColors",
            digitFontSize: "34gc",
            placeFontSize: "34gc",
            headerFontSize: "34gc",
            digitFontStyle: { fontWeight: "bold" },
            placeFontStyle: { fontWeight: "bold" },
            headerFontStyle: { fontWeight: "bold" },
            cardRadius: "4gc",
            textWidthBuffer: "60gc",
            rowGap: "30gc",
            columnGap: "5gc",
            leftBlock: "50gc",
            lockedCells: [],
            instructionTargetId: "page3-left-dialog",
            impactedTilesCount: window.PAGE3_STACK_SUBTRACTION_IMPACTED_TILES_COUNT,
            impactTiles: window.PAGE3_STACK_SUBTRACTION_IMPACT_TILES,
          };
          if (isGuidedMode) {
            const script = buildPage3StackSubtractionScript(
              window.PAGE3_STACK_SUBTRACTION_NUMBERS
            );
            if (typeof console !== "undefined") {
              console.log("[page3-stack-subtraction] guided script summary", {
                mode: window.PAGE3_STACK_SUBTRACTION_MODE,
                scriptLength: Array.isArray(script) ? script.length : null,
              });
            }
            return {
              ...baseProps,
              guidedInputMode: "reveal",
              guidedValidation: "per-entry",
              script,
            };
          }
          if (window.PAGE3_STACK_SUBTRACTION_MODE === "incorrect") {
            return {
              ...baseProps,
              incorrectProgressPanelCoordinates:
                window.PAGE3_STACK_SUBTRACTION_INCORRECT_PROGRESS_GRID_COORDS,
              incorrectOverlayPanelStyle:
                window.PAGE3_STACK_SUBTRACTION_INCORRECT_OVERLAY_PANEL_STYLE,
            };
          }
          if (window.PAGE3_STACK_SUBTRACTION_MODE === "fill-missing") {
            return {
              ...baseProps,
              fillMissingProgressPanelCoordinates:
                window.PAGE3_STACK_SUBTRACTION_FILL_MISSING_PROGRESS_GRID_COORDS,
              fillMissingOverlayPanelStyle:
                window.PAGE3_STACK_SUBTRACTION_FILL_MISSING_OVERLAY_PANEL_STYLE,
            };
          }
          return baseProps;
        })(),
      },
      {
        id: "page3-right-panel",
        name: "right-panel",
        coordinates: [1200, 0, 1600, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [550, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instruction"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page3-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [400, 820, 545, 900],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[3];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },
      // Check button — only for `incorrect` / `fill-missing` on page 3.
      ...(
        window.PAGE3_STACK_SUBTRACTION_MODE === "incorrect" ||
          window.PAGE3_STACK_SUBTRACTION_MODE === "fill-missing"
          ? [
            {
              id: "page3-check-button",
              name: "check-button",
              type: "button",
              coordinates: window.PAGE3_STACK_SUBTRACTION_CHECK_BUTTON_COORDS,
              zIndex: "var(--z-button)",
              props: {
                get text() {
                  return getI18nText("buttons.check");
                },
                backgroundColor: "#F9A825",
                color: "#000000",
                fontSize: "32gc",
                fontWeight: "bold",
                borderRadius: "12gc",
                onClick: () => {
                  if (
                    typeof window !== "undefined" &&
                    window.playCarClickSound
                  ) {
                    window.playCarClickSound("next");
                  }
                  if (
                    typeof window !== "undefined" &&
                    typeof window.dispatchEvent === "function"
                  ) {
                    window.dispatchEvent(
                      new CustomEvent("longSubtractionCheck", {
                        detail: { id: "page3-stack-subtraction" },
                      })
                    );
                  }
                },
              },
            },
          ]
          : []
      ),
      {
        id: "page3-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
    ],

    // Page 14: Stack Subtraction — uses the new StackSubtractionComponent
    // (LongAdditionComponent forced to variant: 'simple' — no expanded
    // place-value decomposition panel). Slotted between pages 3 and 4 in
    // pageNavigation so it appears as the next page after stack-subtraction.
    14: [
      {
        id: "page14-left-row-top",
        name: "left-panel-top",
        coordinates: [0, 0, 400, 400],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page14-left-row-bottom",
        name: "left-panel-bottom",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page14-left-dialog",
        name: "left-dialog",
        coordinates: [12, 12, 388, 375],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.dialogText"),
          showTail: true,
          tailDirection: "south",
          tailPlacement: "left",
          tailColor: "aqua",
          tailScale: 1.25,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          color: "#ffffff",
          fontSize: "30gc",
          lineHeight: "1.35",
          textAlign: "center",
          borderRadius: "16gc",
          padding: "14gc",
          borderWidth: "5gc",
          borderStyle: "solid",
          borderColor: "aqua",
          boxSizing: "border-box",
        },
      },
      {
        id: "page14-aisha",
        name: "aisha-character",
        type: "container",
        coordinates: [0, 400, 400, 1000],
        zIndex: "var(--z-elevated)",
        props: {
          text: "",
          get imageSrc() {
            const isComplete = (typeof window !== "undefined" && window.page14IsComplete) || false;
            return isComplete ? "assets/Aisha/Aisha Claping Mid.png" : "assets/Aisha/Aisha Happy Mid.png";
          },
          imageAlt: getI18nText("pages.page1.aishaAlt"),
        },
      },
      {
        id: "page14-middle-panel",
        name: "middle-panel",
        coordinates: [405, 0, 1200, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page14-stack-addition",
        name: "page14-stack-addition",
        type: "custom",
        coordinates: [400, 100, 1550, 790],
        zIndex: "var(--z-elevated)",
        get props() {
          return (() => {
          const isGuidedMode =
            window.PAGE14_STACK_ADDITION_MODE === "guided" ||
            window.PAGE14_STACK_ADDITION_MODE === "guided_flow_short";
          const currentQuestion = getStackAdditionQuestion();
          const currentNumbers = Array.isArray(currentQuestion) ? currentQuestion : window.PAGE14_STACK_ADDITION_NUMBERS;
          const currentImpactTiles = getStackAdditionImpactTiles();

          // Stack-only guided_flow_short script for addition. Walks the user
          // through typing each column's sum digit (right to left) into the
          // simple sum row, with a split-carry animation whenever a column
          // overflows past 9. Supports N operands (2+).
          const buildPage14StackAdditionScript = (numbers) => {
            const ops = Array.isArray(numbers) && numbers.length >= 2
              ? numbers.slice(0, Math.max(2, numbers.length))
              : [0, 0];
            const sum = ops.reduce((acc, n) => acc + (Number(n) || 0), 0);
            const rawCols = Math.max(
              ...ops.map((n) => String(Math.abs(Number(n) || 0)).length),
              String(Math.abs(sum)).length
            );
            const totalCols = Math.max(1, Math.min(5, rawCols));
            const placeKeysForTotalCols = (n) => {
              const cols = Math.max(1, Math.min(5, Number(n) || 1));
              if (cols === 1) return ["O"];
              if (cols === 2) return ["T", "O"];
              if (cols === 3) return ["H", "T", "O"];
              if (cols === 4) return ["Th", "H", "T", "O"];
              return ["TTh", "Th", "H", "T", "O"];
            };
            const placeHumanName = (placeKey) => {
              switch (placeKey) {
                case "O": return "ones";
                case "T": return "tens";
                case "H": return "hundreds";
                case "Th": return "thousands";
                case "TTh": return "ten-thousands";
                default: return "place";
              }
            };
            const placeKeys = placeKeysForTotalCols(totalCols);
            const clampToCols = (n) => {
              const abs = Math.abs(Number(n) || 0);
              const mod = totalCols >= 5 ? 100000 : Math.pow(10, totalCols);
              return abs % mod;
            };
            const opsClamped = ops.map(clampToCols);
            const opsStr = opsClamped.map((n) =>
              String(n).padStart(totalCols, "0")
            );

            // Compute per-column result digit + carry-out (supports N operands).
            const resultDigits = new Array(totalCols).fill("0");
            const carryOut = new Array(totalCols).fill(0);
            let carryIn = 0;
            for (let i = totalCols - 1; i >= 0; i--) {
              let colSum = carryIn;
              for (let k = 0; k < opsStr.length; k++) {
                colSum += parseInt(opsStr[k][i], 10);
              }
              resultDigits[i] = String(colSum % 10);
              carryOut[i] = Math.floor(colSum / 10);
              carryIn = carryOut[i];
            }
            const resultSum = opsClamped.reduce((a, b) => a + b, 0);

            const operandRowKeys = ops.map((_, i) => `operand-${i}`);
            const steps = [];
            steps.push({
              instruction:
                "We need to add the given numbers. Tap the highlighted area to begin.",
              reveal: {
                panels: ["simple"],
                rows: [...operandRowKeys, "divider"],
                elements: ["operator-plus"],
              },
              emphasizeContainer: {
                panel: "simple",
                rows: operandRowKeys,
                paddingPx: 14,
              },
              advance: { type: "tap-revealed" },
            });
            steps.push({
              instruction:
                "Each digit sits in a place value column (thousands, hundreds, tens, ones).",
              reveal: { panels: ["simple"], rows: ["header"] },
              emphasizeContainer: { panel: "simple", rows: ["header"], paddingPx: 12 },
              advance: { type: "tap-revealed" },
            });

            const operandCount = Array.isArray(numbers) ? numbers.length : 2;
            const sumInputMax = 9 * operandCount;
            const makeSumColumnInputStep = (opts) => ({
              instruction: opts.instructionText,
              reveal: {
                cells: [{ panel: "simple", row: "sum", column: opts.placeKey }],
              },
              revealWithPlaceholder: true,
              highlight: { panel: "simple", row: "sum", column: opts.placeKey },
              highlightAppearance: "yellow-blink",
              emphasizeContainer: {
                panel: "simple",
                columns: [opts.placeKey],
                paddingPx: 12,
                transparentBackground: true,
              },
              target: { panel: "simple", row: "sum", column: opts.placeKey },
              action: {
                type: "enter-value",
                expected: opts.digit,
                maxNumericValue: sumInputMax,
              },
              inputMode: "type",
            });

            for (let idx = totalCols - 1; idx >= 0; idx--) {
              const placeKey = placeKeys[idx];
              const placeName = placeHumanName(placeKey);
              const carryInForCol = idx === totalCols - 1 ? 0 : carryOut[idx + 1];
              let colDigitSum = 0;
              for (let k = 0; k < opsStr.length; k++) {
                colDigitSum += parseInt(opsStr[k][idx], 10);
              }
              const colTotal = colDigitSum + carryInForCol;
              const remainderDigit = colTotal % 10;
              const carryDigitOut = Math.floor(colTotal / 10);
              const willCarry = carryDigitOut > 0 && idx > 0;
              const nextPlaceKey = idx > 0 ? placeKeys[idx - 1] : null;
              const nextPlaceName = nextPlaceKey
                ? placeHumanName(nextPlaceKey)
                : null;

              const carryInPhrase =
                carryInForCol > 0
                  ? ` (plus the ${carryInForCol} carried in)`
                  : "";
              // Step A — type the FULL column total (e.g. "16" for 7+9), not
              // just the digit that ultimately stays. Mirrors the long-addition
              // guided_flow_short behavior on the expanded panel.
              const instructionText = willCarry
                ? `Add the ${placeName} column${carryInPhrase}. Type the total (${colTotal}) in the yellow tile.`
                : carryInForCol > 0
                  ? `Add the ${placeName} column${carryInPhrase}. Type the total (${colTotal}) in the yellow tile.`
                  : `Add the ${placeName} column. Type the total (${colTotal}) in the yellow tile.`;

              steps.push(
                makeSumColumnInputStep({
                  placeKey,
                  digit: String(colTotal),
                  instructionText,
                })
              );

              if (willCarry) {
                // Step B — brief regroup explanation.
                steps.push({
                  instruction: `${colTotal} is more than 9, so we regroup: ${remainderDigit} stays in the ${placeName} column and ${carryDigitOut} carries to the ${nextPlaceName} column.`,
                  advance: { type: "auto", delayMs: 2800 },
                });

                // Step C — click the sum tile to animate the split: the
                // remainder stays, the carry digit flies to the next column's
                // carry row.
                steps.push({
                  instruction: `Tap the highlighted ${colTotal} tile to split it — ${remainderDigit} stays here and ${carryDigitOut} carries to ${nextPlaceName}.`,
                  reveal: {
                    panels: ["simple"],
                    rows: ["carry"],
                    cells: [
                      { panel: "simple", row: "carry", column: nextPlaceKey },
                    ],
                  },
                  highlight: {
                    panel: "simple",
                    row: "sum",
                    column: placeKey,
                  },
                  highlightAppearance: "yellow-blink",
                  source: {
                    panel: "simple",
                    row: "sum",
                    column: placeKey,
                  },
                  target: {
                    panel: "simple",
                    row: "carry",
                    column: nextPlaceKey,
                  },
                  split: {
                    sumDigit: String(remainderDigit),
                    carryDigit: String(carryDigitOut),
                  },
                  animation: "split-carry",
                });
              }
            }

            steps.push({
              instruction: `${opsClamped.join(" + ")} = ${resultSum}. Great work! Tap the highlighted box to continue.`,
              emphasizeContainer: {
                panel: "simple",
                rows: ["sum"],
                paddingPx: 10,
                transparentBackground: true,
                borderColor: "#22C55E",
              },
              advance: { type: "tap-revealed" },
            });

            return steps.map((s, i) => ({ ...s, stepId: i }));
          };

          const baseProps = {
            componentType: "StackSubtractionComponent",
            type: window.PAGE14_STACK_ADDITION_MODE,
            mode: "controlled",
            debugPanelLayout: false,
            showPanelBorders: false,
            showPanelGridLines: false,
            numbers: currentNumbers,
            placeLabelsI18nKey: "common.longAddition.placeLabels",
            placeColorsI18nKey: "common.longAddition.placeColors",
            digitFontSize: "36gc",
            placeFontSize: "36gc",
            headerFontSize: "36gc",
            digitFontStyle: { fontWeight: "bold" },
            placeFontStyle: { fontWeight: "bold" },
            headerFontStyle: { fontWeight: "bold" },
            cardRadius: "4gc",
            textWidthBuffer: "70gc",
            rowGap: "30gc",
            columnGap: "5gc",
            leftBlock: "60gc",
            lockedCells: [],
            instructionTargetId: "page14-left-dialog",
            impactedTilesCount: currentImpactTiles.length || window.PAGE14_STACK_ADDITION_IMPACTED_TILES_COUNT,
            impactTiles: currentImpactTiles,
          };
          if (isGuidedMode) {
            const questionIndex = getStackAdditionQuestionIndex();
            const numbersSignature = Array.isArray(currentNumbers)
              ? currentNumbers.join(",")
              : "";
            const scriptCacheKey = `${window.PAGE14_STACK_ADDITION_MODE}|${questionIndex}|${numbersSignature}`;
            if (typeof window !== "undefined" && !window.page14GuidedFlowScriptCache) {
              window.page14GuidedFlowScriptCache = {};
            }
            let script =
              typeof window !== "undefined" &&
              window.page14GuidedFlowScriptCache &&
              window.page14GuidedFlowScriptCache[scriptCacheKey];
            if (!Array.isArray(script)) {
              script = buildPage14StackAdditionScript(currentNumbers);
              if (typeof window !== "undefined" && window.page14GuidedFlowScriptCache) {
                window.page14GuidedFlowScriptCache[scriptCacheKey] = script;
              }
            }
            if (typeof console !== "undefined") {
              console.log("[page14-stack-addition] guided script summary", {
                mode: window.PAGE14_STACK_ADDITION_MODE,
                scriptLength: Array.isArray(script) ? script.length : null,
              });
            }
            return {
              ...baseProps,
              guidedInputMode: "reveal",
              guidedValidation: "per-entry",
              script,
              onScriptComplete: () => {
                if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
                  window.dispatchEvent(
                    new CustomEvent("quizCompleted", {
                      detail: { pageNumber: 14 },
                    })
                  );
                }
              },
            };
          }
          if (window.PAGE14_STACK_ADDITION_MODE === "incorrect") {
            return {
              ...baseProps,
              incorrectProgressPanelCoordinates:
                window.PAGE14_STACK_ADDITION_INCORRECT_PROGRESS_GRID_COORDS,
              incorrectOverlayPanelStyle:
                window.PAGE14_STACK_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE,
            };
          }
          if (window.PAGE14_STACK_ADDITION_MODE === "fill-missing") {
            return {
              ...baseProps,
              fillMissingProgressPanelCoordinates:
                window.PAGE14_STACK_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS,
              fillMissingOverlayPanelStyle:
                window.PAGE14_STACK_ADDITION_FILL_MISSING_OVERLAY_PANEL_STYLE,
            };
          }
          return baseProps;
          })();
        },
      },
      {
        id: "page14-right-panel",
        name: "right-panel",
        coordinates: [1200, 0, 1600, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page14-instruction",
        name: "page14-instruction",
        coordinates: [550, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            const isComplete = (typeof window !== "undefined" && window.page14IsComplete) || false;
            if (!isComplete) {
              return getI18nText("pages.page14.instruction");
            }
            const isLastQuestion = isLastStackAdditionQuestion();
            return isLastQuestion
              ? getI18nText("pages.page14.instructionFinish")
              : getI18nText("pages.page14.instructionAfter");
          },
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page14-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [405, 820, 550, 900],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[14];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      {
        id: "page14-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          get disabled() {
            return !(typeof window !== "undefined" && window.page14IsComplete);
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const isLastQuestion = isLastStackAdditionQuestion();
            if (typeof window !== "undefined") {
              window.page14IsComplete = false;
            }
            if (isLastQuestion) {
              if (typeof window !== "undefined") {
                window.currentQuestionIndex = 0;
              }
            } else {
              advanceStackAdditionQuestion();
            }
            if (
              typeof window !== "undefined" &&
              typeof window.forceAppUpdate === "function"
            ) {
              window.forceAppUpdate();
            }
          },
        },
      },
      // Check button — only for `incorrect` / `fill-missing` on page 14.
      ...(
        window.PAGE14_STACK_ADDITION_MODE === "incorrect" ||
          window.PAGE14_STACK_ADDITION_MODE === "fill-missing"
          ? [
            {
              id: "page14-check-button",
              name: "check-button",
              type: "button",
              coordinates: window.PAGE14_STACK_ADDITION_CHECK_BUTTON_COORDS,
              zIndex: "var(--z-button)",
              props: {
                get text() {
                  return getI18nText("buttons.check");
                },
                backgroundColor: "#F9A825",
                color: "#000000",
                fontSize: "32gc",
                fontWeight: "bold",
                borderRadius: "12gc",
                onClick: () => {
                  if (
                    typeof window !== "undefined" &&
                    window.playCarClickSound
                  ) {
                    window.playCarClickSound("next");
                  }
                  if (
                    typeof window !== "undefined" &&
                    typeof window.dispatchEvent === "function"
                  ) {
                    window.dispatchEvent(
                      new CustomEvent("longSubtractionCheck", {
                        detail: { id: "page14-stack-addition" },
                      })
                    );
                  }
                },
              },
            },
          ]
          : []
      ),
      {
        id: "page14-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          get opacity() {
            const isComplete = (typeof window !== "undefined" && window.page14IsComplete) || false;
            return isComplete ? 0.65 : 0;
          },
          scale: 0.7,
        },
      },
    ],
    15: [
      {
        id: "page15-left-row-top",
        name: "left-panel-top",
        coordinates: [0, 0, 400, 400],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page15-left-row-bottom",
        name: "left-panel-bottom",
        coordinates: [0, 400, 400, 900],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page15-left-dialog",
        name: "left-dialog",
        coordinates: [12, 12, 388, 375],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.dialogText"),
          showTail: true,
          tailDirection: "south",
          tailPlacement: "left",
          tailColor: "aqua",
          tailScale: 1.25,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          color: "#ffffff",
          fontSize: "30gc",
          lineHeight: "1.35",
          textAlign: "center",
          borderRadius: "16gc",
          padding: "14gc",
          borderWidth: "5gc",
          borderStyle: "solid",
          borderColor: "aqua",
          boxSizing: "border-box",
        },
      },
      {
        id: "page15-aisha",
        name: "aisha-character",
        type: "container",
        coordinates: [0, 400, 400, 1000],
        zIndex: "var(--z-elevated)",
        props: {
          text: "",
          get imageSrc() {
            const isComplete = (typeof window !== "undefined" && window.page15IsComplete) || false;
            return isComplete ? "assets/Aisha/Aisha Celebration Mid.png" : "assets/Aisha/Aisha Pointing Left Mid.png";
          },
          imageAlt: getI18nText("pages.page1.aishaAlt"),
        },
      },
      {
        id: "page15-middle-panel",
        name: "middle-panel",
        coordinates: [405, 0, 1200, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page15-stack-addition",
        name: "page15-stack-addition",
        type: "custom",
        coordinates: [400, 100, 1550, 790],
        zIndex: "var(--z-elevated)",
        get props() {
          return (() => {
          const isGuidedMode =
            window.PAGE15_STACK_ADDITION_MODE === "guided" ||
            window.PAGE15_STACK_ADDITION_MODE === "guided_flow_short";
          const currentQuestion = getStackAdditionQuestion();
          const currentNumbers = Array.isArray(currentQuestion) ? currentQuestion : window.PAGE15_STACK_ADDITION_NUMBERS;
          const currentImpactTiles = getStackAdditionImpactTiles();

          // Stack-only guided_flow_short script for addition. Walks the user
          // through typing each column's sum digit (right to left) into the
          // simple sum row, with a split-carry animation whenever a column
          // overflows past 9. Supports N operands (2+).
          const buildpage15StackAdditionScript = (numbers) => {
            const ops = Array.isArray(numbers) && numbers.length >= 2
              ? numbers.slice(0, Math.max(2, numbers.length))
              : [0, 0];
            const sum = ops.reduce((acc, n) => acc + (Number(n) || 0), 0);
            const rawCols = Math.max(
              ...ops.map((n) => String(Math.abs(Number(n) || 0)).length),
              String(Math.abs(sum)).length
            );
            const totalCols = Math.max(1, Math.min(5, rawCols));
            const placeKeysForTotalCols = (n) => {
              const cols = Math.max(1, Math.min(5, Number(n) || 1));
              if (cols === 1) return ["O"];
              if (cols === 2) return ["T", "O"];
              if (cols === 3) return ["H", "T", "O"];
              if (cols === 4) return ["Th", "H", "T", "O"];
              return ["TTh", "Th", "H", "T", "O"];
            };
            const placeHumanName = (placeKey) => {
              switch (placeKey) {
                case "O": return "ones";
                case "T": return "tens";
                case "H": return "hundreds";
                case "Th": return "thousands";
                case "TTh": return "ten-thousands";
                default: return "place";
              }
            };
            const placeKeys = placeKeysForTotalCols(totalCols);
            const clampToCols = (n) => {
              const abs = Math.abs(Number(n) || 0);
              const mod = totalCols >= 5 ? 100000 : Math.pow(10, totalCols);
              return abs % mod;
            };
            const opsClamped = ops.map(clampToCols);
            const opsStr = opsClamped.map((n) =>
              String(n).padStart(totalCols, "0")
            );

            // Compute per-column result digit + carry-out (supports N operands).
            const resultDigits = new Array(totalCols).fill("0");
            const carryOut = new Array(totalCols).fill(0);
            let carryIn = 0;
            for (let i = totalCols - 1; i >= 0; i--) {
              let colSum = carryIn;
              for (let k = 0; k < opsStr.length; k++) {
                colSum += parseInt(opsStr[k][i], 10);
              }
              resultDigits[i] = String(colSum % 10);
              carryOut[i] = Math.floor(colSum / 10);
              carryIn = carryOut[i];
            }
            const resultSum = opsClamped.reduce((a, b) => a + b, 0);

            const operandRowKeys = ops.map((_, i) => `operand-${i}`);
            const steps = [];
            steps.push({
              instruction:
                "We need to add the given numbers. Tap the highlighted area to begin.",
              reveal: {
                panels: ["simple"],
                rows: [...operandRowKeys, "divider"],
                elements: ["operator-plus"],
              },
              emphasizeContainer: {
                panel: "simple",
                rows: operandRowKeys,
                paddingPx: 14,
              },
              advance: { type: "tap-revealed" },
            });
            steps.push({
              instruction:
                "Each digit sits in a place value column (thousands, hundreds, tens, ones).",
              reveal: { panels: ["simple"], rows: ["header"] },
              emphasizeContainer: { panel: "simple", rows: ["header"], paddingPx: 12 },
              advance: { type: "tap-revealed" },
            });

            const operandCount = Array.isArray(numbers) ? numbers.length : 2;
            const sumInputMax = 9 * operandCount;
            const makeSumColumnInputStep = (opts) => ({
              instruction: opts.instructionText,
              reveal: {
                cells: [{ panel: "simple", row: "sum", column: opts.placeKey }],
              },
              revealWithPlaceholder: true,
              highlight: { panel: "simple", row: "sum", column: opts.placeKey },
              highlightAppearance: "yellow-blink",
              emphasizeContainer: {
                panel: "simple",
                columns: [opts.placeKey],
                paddingPx: 12,
                transparentBackground: true,
              },
              target: { panel: "simple", row: "sum", column: opts.placeKey },
              action: {
                type: "enter-value",
                expected: opts.digit,
                maxNumericValue: sumInputMax,
              },
              inputMode: "type",
            });

            for (let idx = totalCols - 1; idx >= 0; idx--) {
              const placeKey = placeKeys[idx];
              const placeName = placeHumanName(placeKey);
              const carryInForCol = idx === totalCols - 1 ? 0 : carryOut[idx + 1];
              let colDigitSum = 0;
              for (let k = 0; k < opsStr.length; k++) {
                colDigitSum += parseInt(opsStr[k][idx], 10);
              }
              const colTotal = colDigitSum + carryInForCol;
              const remainderDigit = colTotal % 10;
              const carryDigitOut = Math.floor(colTotal / 10);
              const willCarry = carryDigitOut > 0 && idx > 0;
              const nextPlaceKey = idx > 0 ? placeKeys[idx - 1] : null;
              const nextPlaceName = nextPlaceKey
                ? placeHumanName(nextPlaceKey)
                : null;

              const carryInPhrase =
                carryInForCol > 0
                  ? ` (plus the ${carryInForCol} carried in)`
                  : "";
              // Step A — type the FULL column total (e.g. "16" for 7+9), not
              // just the digit that ultimately stays. Mirrors the long-addition
              // guided_flow_short behavior on the expanded panel.
              const instructionText = willCarry
                ? `Add the ${placeName} column${carryInPhrase}. Type the total (${colTotal}) in the yellow tile.`
                : carryInForCol > 0
                  ? `Add the ${placeName} column${carryInPhrase}. Type the total (${colTotal}) in the yellow tile.`
                  : `Add the ${placeName} column. Type the total (${colTotal}) in the yellow tile.`;

              steps.push(
                makeSumColumnInputStep({
                  placeKey,
                  digit: String(colTotal),
                  instructionText,
                })
              );

              if (willCarry) {
                // Step B — brief regroup explanation.
                steps.push({
                  instruction: `${colTotal} is more than 9, so we regroup: ${remainderDigit} stays in the ${placeName} column and ${carryDigitOut} carries to the ${nextPlaceName} column.`,
                  advance: { type: "auto", delayMs: 2800 },
                });

                // Step C — click the sum tile to animate the split: the
                // remainder stays, the carry digit flies to the next column's
                // carry row.
                steps.push({
                  instruction: `Tap the highlighted ${colTotal} tile to split it — ${remainderDigit} stays here and ${carryDigitOut} carries to ${nextPlaceName}.`,
                  reveal: {
                    panels: ["simple"],
                    rows: ["carry"],
                    cells: [
                      { panel: "simple", row: "carry", column: nextPlaceKey },
                    ],
                  },
                  highlight: {
                    panel: "simple",
                    row: "sum",
                    column: placeKey,
                  },
                  highlightAppearance: "yellow-blink",
                  source: {
                    panel: "simple",
                    row: "sum",
                    column: placeKey,
                  },
                  target: {
                    panel: "simple",
                    row: "carry",
                    column: nextPlaceKey,
                  },
                  split: {
                    sumDigit: String(remainderDigit),
                    carryDigit: String(carryDigitOut),
                  },
                  animation: "split-carry",
                });
              }
            }

            steps.push({
              instruction: `${opsClamped.join(" + ")} = ${resultSum}. Great work!`,
              emphasizeContainer: {
                panel: "simple",
                rows: ["sum"],
                paddingPx: 10,
                transparentBackground: true,
                borderColor: "#22C55E",
              },
              advance: { type: "tap-revealed" },
            });

            return steps.map((s, i) => ({ ...s, stepId: i }));
          };

          const baseProps = {
            componentType: "StackAdditionComponent",
            type: window.PAGE15_STACK_ADDITION_MODE,
            mode: "controlled",
            debugPanelLayout: false,
            showPanelBorders: false,
            showPanelGridLines: false,
            numbers: currentNumbers,
            placeLabelsI18nKey: "common.longAddition.placeLabels",
            placeColorsI18nKey: "common.longAddition.placeColors",
            digitFontSize: "36gc",
            placeFontSize: "36gc",
            headerFontSize: "36gc",
            digitFontStyle: { fontWeight: "bold" },
            placeFontStyle: { fontWeight: "bold" },
            headerFontStyle: { fontWeight: "bold" },
            cardRadius: "4gc",
            textWidthBuffer: "70gc",
            rowGap: "30gc",
            columnGap: "5gc",
            leftBlock: "60gc",
            lockedCells: [],
            instructionTargetId: "page15-left-dialog",
            impactedTilesCount: currentImpactTiles.length || window.PAGE15_STACK_ADDITION_IMPACTED_TILES_COUNT,
            impactTiles: currentImpactTiles,
          };
          if (isGuidedMode) {
            const script = buildpage15StackAdditionScript(
              currentNumbers
            );
            if (typeof console !== "undefined") {
              console.log("[page15-stack-addition] guided script summary", {
                mode: window.PAGE15_STACK_ADDITION_MODE,
                scriptLength: Array.isArray(script) ? script.length : null,
              });
            }
            return {
              ...baseProps,
              guidedInputMode: "reveal",
              guidedValidation: "per-entry",
              script,
            };
          }
          if (window.PAGE15_STACK_ADDITION_MODE === "incorrect") {
            return {
              ...baseProps,
              incorrectProgressPanelCoordinates:
                window.PAGE15_STACK_ADDITION_INCORRECT_PROGRESS_GRID_COORDS,
              incorrectOverlayPanelStyle:
                window.PAGE15_STACK_ADDITION_INCORRECT_OVERLAY_PANEL_STYLE,
            };
          }
          if (window.PAGE15_STACK_ADDITION_MODE === "fill-missing") {
            return {
              ...baseProps,
              fillMissingProgressPanelCoordinates:
                window.PAGE15_STACK_ADDITION_FILL_MISSING_PROGRESS_GRID_COORDS,
              fillMissingOverlayPanelStyle:
                window.PAGE15_STACK_ADDITION_FILL_MISSING_OVERLAY_PANEL_STYLE,
            };
          }
          return baseProps;
          })();
        },
      },
      {
        id: "page15-right-panel",
        name: "right-panel",
        coordinates: [1200, 0, 1600, 810],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: "0",
          boxSizing: "border-box",
        },
      },
      {
        id: "page15-instruction",
        name: "page15-instruction",
        coordinates: [550, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            const isComplete = (typeof window !== "undefined" && window.page15IsComplete) || false;
            return isComplete && isLastStackAdditionQuestion()
              ? getI18nText("pages.page15.instructionFinish")
              : isComplete
                ? getI18nText("pages.page15.instructionAfter")
                : getI18nText("pages.page15.instruction");
          },
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page15-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [405, 820, 550, 900],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[15];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      {
        id: "page15-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          get disabled() {
            return !(typeof window !== "undefined" && window.page15IsComplete);
          },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const isLastQuestion = isLastStackAdditionQuestion();
            if (typeof window !== "undefined") {
              window.page14IsComplete = false;
              window.page15IsComplete = false;
            }
            if (isLastQuestion) {
              if (typeof window !== "undefined") {
                window.currentQuestionIndex = 0;
              }
              navigateToPage(14, "next");
            } else {
              advanceStackAdditionQuestion();
              navigateToPage(14, "next");
            }
          },
        },
      },
      // Check button — only for `incorrect` / `fill-missing` on page 15.
      ...(
        window.PAGE15_STACK_ADDITION_MODE === "incorrect" ||
          window.PAGE15_STACK_ADDITION_MODE === "fill-missing"
          ? [
            {
              id: "page15-check-button",
              name: "check-button",
              type: "button",
              coordinates: window.PAGE15_STACK_ADDITION_CHECK_BUTTON_COORDS,
              zIndex: "var(--z-button)",
              props: {
                get text() {
                  return getI18nText("buttons.check");
                },
                backgroundColor: "#F9A825",
                color: "#000000",
                fontSize: "32gc",
                fontWeight: "bold",
                borderRadius: "12gc",
                onClick: () => {
                  if (
                    typeof window !== "undefined" &&
                    window.playCarClickSound
                  ) {
                    window.playCarClickSound("next");
                  }
                  if (
                    typeof window !== "undefined" &&
                    typeof window.dispatchEvent === "function"
                  ) {
                    window.dispatchEvent(
                      new CustomEvent("longAdditionCheck", {
                        detail: { id: "page15-stack-addition" },
                      })
                    );
                  }
                },
              },
            },
          ]
          : []
      ),
      {
        id: "page15-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          get opacity() {
            const isComplete = (typeof window !== "undefined" && window.page15IsComplete) || false;
            return isComplete ? 0.65 : 0;
          },
          scale: 0.7,
        },
      },
    ],
    4: [
      // Page background (dark blue-grey to match image)
      // {
      //   id: "page4-background",
      //   name: "page4-background",
      //   coordinates: [0, 0, 1600, 900],
      //   zIndex: "var(--z-base)",
      //   type: "textbox",
      //   props: {
      //     text: "",
      //     backgroundColor: "#2C3E50",
      //     borderWidth: "0",
      //     boxSizing: "border-box",
      //   },
      // },
      // Header: "Protractor" - white, centered
      {
        id: "page4-title",
        name: "page4-title",
        coordinates: [25, 25, 1575, 110],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.title"),
          fontSize: "48gc",
          color: "#FFA500",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Protractor container: same config as page 3
      {
        id: "page4-protractor-container",
        name: "page4-protractor-container",
        coordinates: [25, 220, 750, 700],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      // Protractor: same config as page 3 (static display on page 4 – always visible, arm shown)
      {
        id: "page4-protractor",
        name: "page4-protractor",
        type: "custom",
        coordinates: [355, 590, 375, 640], // -75gc up
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,
          opacity: 1,
          syncRotationFromConfig: false,
          persistRotationKey: "page3ProtractorRotation", // Shared storage key for static display protractor angle
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            isDraggable: false,
            showRotationRing: false,
            isProtractorRotatable: false,
          },
          measurementArm: {
            show: true,
            length: "125gc",
            thickness: "4gc",
            color: "#22c55e",   // Green (same as pages 3, 5, 7, 11 when snapped)
            angle: 50,
            style: "solid",
            extendable: false,
            angleDisplay: {
              show: true,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              background: "rgba(34, 197, 94, 0.65)",  // Green to match arm/circle
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      // Orange arrow line: same config as page 3
      {
        id: "page4-arrow-line",
        name: "page4-arrow-line",
        type: "custom",
        coordinates: [345, 595, 700, 595], // -75gc up
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      // White arrow line (slanted): same config as page 3
      {
        id: "page4-arrow-line-white",
        name: "page4-arrow-line-white",
        type: "custom",
        coordinates: [345, 595, 600, 289], // -75gc up
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      // Right panel: info text (dark grey box with white text and orange highlights)
      {
        id: "page4-info-box",
        name: "page4-info-box",
        coordinates: [770, 120, 1550, 800],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.infoText"),
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          color: "#FFFFFF",
          fontSize: "40gc",
          lineHeight: "1.6",
          textAlign: "center",
          padding: "24gc",
          borderRadius: "12gc",
          boxSizing: "border-box",
          allowHTML: true,
          verticalAlign: "center",
        },
      },
      // Footer instruction (center)
      {
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.footerInstruction"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      // Previous button (Â«)
      {
        id: "page4-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[4];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
      // Next button (same as page 2)
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[4];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },
      // Tap gif (same config as page 2) – after Next button
      {
        id: "page4-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.75,
        },
      },
    ],

    5: [
      // Page 5: exact replica of page 3 with its own state (page5PartState, etc.)
      {
        id: "page5-header",
        name: "page5-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page5-intro",
        name: "page5-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page5-protractor-container",
        name: "page5-protractor-container",
        coordinates: [650, 275, 1550, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page5-protractor",
        name: "page5-protractor",
        type: "custom",
        coordinates: [905, 540, 925, 590],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 330,
          get opacity() { const s = (typeof window !== "undefined" && (window.page5PartState || "protractor")) || "protractor"; return s === "protractor" ? 0 : 1; },
          get syncRotationFromConfig() { const s = (typeof window !== "undefined" && (window.page5PartState || "protractor")) || "protractor"; return s === "protractor"; },
          persistRotationKey: "page5ProtractorRotation",
          snapPoint: [1100, 675],
          snapTolerance: 60,
          snapRotationAngle: 330,
          snapRotationTolerance: 10,
          onSnapToPoint: () => {
            if (typeof window !== "undefined" && window.page5PartState === "alignVertex") {
              window.page5PartState = "alignBase";
              window.dispatchEvent(new CustomEvent("page5PartStateChanged", { detail: { state: "alignBase" } }));
              window.forceAppUpdate?.();
            }
          },
          onSnapToRotation: () => {
            if (typeof window !== "undefined" && window.page5PartState === "alignBase") {
              window.page5PartState = "alignMeasurementArm";
              window.dispatchEvent(new CustomEvent("page5PartStateChanged", { detail: { state: "alignMeasurementArm" } }));
              window.forceAppUpdate?.();
            }
          },
          onAnimateToReady: (animateTo) => { if (typeof window !== "undefined") window.page5ProtractorAnimateTo = animateTo; },
          onAnimateToComplete: () => { if (typeof window !== "undefined" && typeof window.page5OnAnimateToComplete === "function") window.page5OnAnimateToComplete(); },
          onAnimateRotationReady: (animateRotation) => { if (typeof window !== "undefined") window.page5ProtractorAnimateRotation = animateRotation; },
          onAnimateRotationComplete: () => { if (typeof window !== "undefined" && typeof window.page5OnRotationComplete === "function") window.page5OnRotationComplete(); },
          onAnimateArmReady: (animateArmTo) => { if (typeof window !== "undefined") window.page5ProtractorAnimateArmTo = animateArmTo; },
          onAnimateArmComplete: () => { if (typeof window !== "undefined" && typeof window.page5OnAnimateArmComplete === "function") window.page5OnAnimateArmComplete(); },
          onArmSnapToAngle: () => {
            if (typeof window !== "undefined" && window.page5PartState === "alignMeasurementArm") {
              window.page5PartState = "complete";
              window.dispatchEvent(new CustomEvent("page5PartStateChanged", { detail: { state: "complete" } }));
              window.dispatchEvent(new CustomEvent("quizCompleted", { detail: { pageNumber: 5 } }));
              window.forceAppUpdate?.();
            }
          },
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            get isDraggable() { return (typeof window !== "undefined" && window.page5PartState === "alignVertex"); }, // only draggable before snap; once snapped, non-draggable
            get showRotationRing() { return (typeof window !== "undefined" && window.page5PartState === "alignBase"); },
            get isProtractorRotatable() { return (typeof window !== "undefined" && window.page5PartState === "alignBase"); }, // ring rotates the protractor only in alignBase
            snapRotationAngle: 0,      // snap to 0° when rotation ends near baseline
            snapRotationTolerance: 8, // degrees
            rotationRingRadiusFactor: 1.15, // ring radius = protractor radius * this
            // Rotation ring handle styling
            rotationRingHandleSize: 50,
            rotationRingHandleBorderColor: "white",
            rotationRingHandleBorderThickness: 4,
            rotationRingHandleBackground: "rgba(255, 140, 0, 0.95)",
            rotationRingHandleBlink: true,
          },
          measurementArm: {
            get show() { return (typeof window !== "undefined" && (window.page5PartState === "alignMeasurementArm" || window.page5PartState === "complete")); },
            length: "125gc",
            thickness: "4gc",
            get color() { return (typeof window !== "undefined" && window.page5PartState === "complete") ? "#22c55e" : "red"; }, // Green when snapped at right angle
            angle: 0,
            style: "solid",
            extendable: false,
            get rotatable() { return (typeof window !== "undefined" && window.page5PartState === "complete") ? false : true; },
            circleSize: "20gc",           // radius of circle at arm end (gc)
            get circleBlink() { return (typeof window !== "undefined" && window.page5PartState === "complete") ? false : true; },
            circleBorderColor: "white",
            circleBorderThickness: "2gc",
            snapAngle: 110,                // arm snaps to this angle when within tolerance
            snapTolerance: 5,            // degrees
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              get background() { return (typeof window !== "undefined" && window.page5PartState === "complete") ? "rgba(34, 197, 94, 0.65)" : "rgba(255, 165, 0, 0.65)"; }, // Green when snapped
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page5-arrow-line",
        name: "page5-arrow-line",
        type: "custom",
        coordinates: [1095, 670, 1450, 670],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page5-arrow-line-white",
        name: "page5-arrow-line-white",
        type: "custom",
        coordinates: [1095, 680, 980, 364],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page5-button-bring-protractor",
        name: "page5-button-bring-protractor",
        type: "textbox",
        coordinates: [50, 300, 600, 383],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonVertex"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get cursor() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "protractor" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page5LastClickedButtonId === "page5-button-bring-protractor"); return s !== "protractor" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "protractor" ? 1 : 0.5; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "protractor"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page5PartState === "protractor") {
              window.page5LastClickedButtonId = "page5-button-bring-protractor";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page5PartState = "alignVertex";
              window.dispatchEvent(new CustomEvent("page5PartStateChanged", { detail: { state: "alignVertex" } }));
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page5-button-align-vertex",
        name: "page5-button-align-vertex",
        type: "textbox",
        coordinates: [50, 425, 600, 508],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonBase"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "protractor" ? "none" : ""; },
          get cursor() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "alignVertex" ? "not-allowed" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s !== "alignVertex"; }, // alignBase: disabled and dull; alignVertex: full color, click no-op
          get opacity() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "protractor" ? 0 : (s === "alignVertex" ? 1 : 0.5); },
          get pulsate() { return false; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page5PartState === "alignVertex") return; // alignVertex: drag only, no click
            window.page5LastClickedButtonId = "page5-button-align-vertex";
            window.forceAppUpdate?.();
            if (window.playCarClickSound) window.playCarClickSound("click");
            window.page5OnAnimateToComplete = () => {
              window.page5PartState = "alignBase";
              window.dispatchEvent(new CustomEvent("page5PartStateChanged", { detail: { state: "alignBase" } }));
              window.forceAppUpdate?.();
              window.page5OnAnimateToComplete = null;
            };
            if (typeof window.page5ProtractorAnimateTo === "function") {
              window.page5ProtractorAnimateTo([1100, 675], 2000);
            } else {
              if (window.page5OnAnimateToComplete) window.page5OnAnimateToComplete();
            }
          },
        },
      },
      {
        id: "page5-button-align-base",
        name: "page5-button-align-base",
        type: "textbox",
        coordinates: [50, 550, 600, 633],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return (s === "protractor" || s === "alignVertex") ? "none" : ""; }, // hidden until alignBase
          get cursor() { return "default"; }, // alignBase: rotate with ring, button not clickable
          get disabled() { return false; }, // full color when alignBase; click is no-op
          get opacity() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return (s === "protractor" || s === "alignVertex") ? 0 : (s === "alignBase" ? 1 : 0.5); },
          get pulsate() { return false; }, // alignBase: no pulsate, user rotates with circular handle
          onClick: () => {
            if (typeof window !== "undefined" && window.page5PartState === "alignBase") return; // no-op: user must rotate protractor with ring
          },
        },
      },
      {
        id: "page5-button-align-second-arm",
        name: "page5-button-align-second-arm",
        type: "textbox",
        coordinates: [50, 675, 600, 758],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonAntiClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return (s === "protractor" || s === "alignVertex" || s === "alignBase") ? "none" : ""; }, // hidden until alignMeasurementArm
          get cursor() { return "not-allowed"; }, // button 4 is not clickable
          get disabled() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s !== "alignMeasurementArm"; }, // false in alignMeasurementArm so no .disabled class (full opacity); true otherwise
          get className() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "alignMeasurementArm" ? "no-pointer-events" : ""; },
          get opacity() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return (s === "alignMeasurementArm" || s === "complete") ? 1 : 0; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page5PartState) || "protractor"; return s === "alignMeasurementArm"; }, // pulsate when alignMeasurementArm, still not clickable
          onClick: () => { /* no-op: button 4 is not clickable */ },
        },
      },
      {
        id: "page5-instruction",
        name: "page5-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            if (typeof window === "undefined") return getI18nText("pages.page3.instruction");
            const s = window.page5PartState;
            if (s === "complete") return getI18nText("pages.page3.instructionShoutAnswer");
            if (s === "alignVertex") return getI18nText("pages.page3.instructionAlignVertex");
            if (s === "alignBase") return getI18nText("pages.page3.instructionAlignBase");
            if (s === "alignMeasurementArm") return getI18nText("pages.page3.instructionAlignMeasurementArm");
            return getI18nText("pages.page3.instruction");
          },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[5];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page5-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page5-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[5];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    6: [
      // Page 6: static replica of page 5 layout (no state logic)
      {
        id: "page6-header",
        name: "page6-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page6-intro",
        name: "page6-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page6-protractor-container",
        name: "page6-protractor-container",
        coordinates: [50, 225, 950, 725], // left 600gc, up 50gc
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page6-protractor",
        name: "page6-protractor",
        type: "custom",
        coordinates: [500, 625, 520, 675], // center at (510, 650), left 600gc up 50gc
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,
          opacity: 1,
          syncRotationFromConfig: false,
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            isDraggable: false,
            showRotationRing: false,
            isProtractorRotatable: false,
          },
          measurementArm: {
            show: true,
            length: "125gc",
            thickness: "4gc",
            color: "#22c55e",   // Green (same as pages 3, 4, 5, 7, 11 when correct)
            angle: 110,
            style: "solid",
            extendable: false,
            rotatable: false,
            circleSize: "20gc",
            circleBlink: false,
            circleBorderColor: "white",
            circleBorderThickness: "2gc",
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              background: "rgba(34, 197, 94, 0.65)",  // Green to match arm/circle
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page6-arrow-line",
        name: "page6-arrow-line",
        type: "custom",
        coordinates: [495, 620, 850, 620], // left 600gc, up 50gc
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page6-arrow-line-white",
        name: "page6-arrow-line-white",
        type: "custom",
        coordinates: [495, 630, 380, 314], // left 600gc, up 50gc
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },

      {
        id: "page6-instruction",
        name: "page6-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() { return (typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(6)) ? getI18nText("pages.page6.instructionComplete") : getI18nText("pages.page6.instruction"); },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page6-quiz-panel",
        name: "page6-quiz-panel",
        type: "custom",
        coordinates: [980, 225, 1550, 725],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: "QT2",
          quizId: "page6-quiz-qt2",
          questionText: getI18nText("pages.quiz.angleQuestion"),
          options: [
            { text: getI18nText("pages.quiz.option110"), iscorrect: true, feedback: getI18nText("pages.quiz.correct110") },
            { text: getI18nText("pages.quiz.option70"), iscorrect: false, feedback: getI18nText("pages.quiz.incorrect110") },
          ],
          // Button size as % of options row (height and width wrt row)
          buttonHeightPercent: 75,
          buttonWidthPercent: 80,
        },
      },
      {
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[6];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page6-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page6-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[6];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    7: [
      // Page 7: exact replica of page 5 with its own state (page7PartState, etc.)
      {
        id: "page7-header",
        name: "page7-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page7-intro",
        name: "page7-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page7-protractor-container",
        name: "page7-protractor-container",
        coordinates: [650, 275, 1550, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page7-protractor",
        name: "page7-protractor",
        type: "custom",
        coordinates: [905, 540, 925, 590],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 330,
          get opacity() { const s = (typeof window !== "undefined" && (window.page7PartState || "protractor")) || "protractor"; return s === "protractor" ? 0 : 1; },
          get syncRotationFromConfig() { const s = (typeof window !== "undefined" && (window.page7PartState || "protractor")) || "protractor"; return s === "protractor"; },
          persistRotationKey: "page7ProtractorRotation",
          snapPoint: [1200, 675],
          snapTolerance: 60,
          snapRotationAngle: 330,
          snapRotationTolerance: 10,
          onSnapToPoint: () => {
            if (typeof window !== "undefined" && window.page7PartState === "alignVertex") {
              window.page7PartState = "alignBase";
              window.dispatchEvent(new CustomEvent("page7PartStateChanged", { detail: { state: "alignBase" } }));
              window.forceAppUpdate?.();
            }
          },
          onSnapToRotation: () => {
            if (typeof window !== "undefined" && window.page7PartState === "alignBase") {
              window.page7PartState = "alignMeasurementArm";
              window.dispatchEvent(new CustomEvent("page7PartStateChanged", { detail: { state: "alignMeasurementArm" } }));
              window.forceAppUpdate?.();
            }
          },
          onAnimateToReady: (animateTo) => { if (typeof window !== "undefined") window.page7ProtractorAnimateTo = animateTo; },
          onAnimateToComplete: () => { if (typeof window !== "undefined" && typeof window.page7OnAnimateToComplete === "function") window.page7OnAnimateToComplete(); },
          onAnimateRotationReady: (animateRotation) => { if (typeof window !== "undefined") window.page7ProtractorAnimateRotation = animateRotation; },
          onAnimateRotationComplete: () => { if (typeof window !== "undefined" && typeof window.page7OnRotationComplete === "function") window.page7OnRotationComplete(); },
          onAnimateArmReady: (animateArmTo) => { if (typeof window !== "undefined") window.page7ProtractorAnimateArmTo = animateArmTo; },
          onAnimateArmComplete: () => { if (typeof window !== "undefined" && typeof window.page7OnAnimateArmComplete === "function") window.page7OnAnimateArmComplete(); },
          onArmSnapToAngle: () => {
            if (typeof window !== "undefined" && window.page7PartState === "alignMeasurementArm") {
              window.page7PartState = "complete";
              window.dispatchEvent(new CustomEvent("page7PartStateChanged", { detail: { state: "complete" } }));
              window.dispatchEvent(new CustomEvent("quizCompleted", { detail: { pageNumber: 7 } }));
              window.forceAppUpdate?.();
            }
          },
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            get isDraggable() { return (typeof window !== "undefined" && window.page7PartState === "alignVertex"); },
            get showRotationRing() { return (typeof window !== "undefined" && window.page7PartState === "alignBase"); },
            get isProtractorRotatable() { return (typeof window !== "undefined" && window.page7PartState === "alignBase"); },
            snapRotationAngle: 0,
            snapRotationTolerance: 8,
            rotationRingRadiusFactor: 1.15,
            rotationRingHandleSize: 50,
            rotationRingHandleBorderColor: "white",
            rotationRingHandleBorderThickness: 4,
            rotationRingHandleBackground: "rgba(255, 140, 0, 0.95)",
            rotationRingHandleBlink: true,
          },
          measurementArm: {
            get show() { return (typeof window !== "undefined" && (window.page7PartState === "alignMeasurementArm" || window.page7PartState === "complete")); },
            length: "125gc",
            thickness: "4gc",
            get color() { return (typeof window !== "undefined" && window.page7PartState === "complete") ? "#22c55e" : "red"; }, // Green when snapped at right angle
            angle: 180,
            style: "solid",
            extendable: false,
            get rotatable() { return (typeof window !== "undefined" && window.page7PartState === "complete") ? false : true; },
            circleSize: "20gc",
            get circleBlink() { return (typeof window !== "undefined" && window.page7PartState === "complete") ? false : true; },
            circleBorderColor: "white",
            circleBorderThickness: "2gc",
            snapAngle: 130,
            snapTolerance: 5,
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              get background() { return (typeof window !== "undefined" && window.page7PartState === "complete") ? "rgba(34, 197, 94, 0.65)" : "rgba(255, 165, 0, 0.65)"; }, // Green when snapped
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page7-arrow-line",
        name: "page7-arrow-line",
        type: "custom",
        // coordinates: [1095, 670, 1450, 670],
        coordinates: [850, 670, 1201, 670], // +100gc right from [750, 670, 1101, 670]
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "start", // arrow at (x1,y1) for anti-clockwise direction
        },
      },
      {
        id: "page7-arrow-line-white",
        name: "page7-arrow-line-white",
        type: "custom",
        coordinates: [1195, 680, 930, 364], // +100gc right from [1095, 680, 980, 364]
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "end", // arrow at (x1,y1) for anti-clockwise direction
        },
      },
      {
        id: "page7-button-bring-protractor",
        name: "page7-button-bring-protractor",
        type: "textbox",
        coordinates: [50, 300, 600, 383],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonVertex"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get cursor() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "protractor" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page7LastClickedButtonId === "page7-button-bring-protractor"); return s !== "protractor" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "protractor" ? 1 : 0.5; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "protractor"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page7PartState === "protractor") {
              window.page7LastClickedButtonId = "page7-button-bring-protractor";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page7PartState = "alignVertex";
              window.dispatchEvent(new CustomEvent("page7PartStateChanged", { detail: { state: "alignVertex" } }));
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page7-button-align-vertex",
        name: "page7-button-align-vertex",
        type: "textbox",
        coordinates: [50, 425, 600, 508],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonBase"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "protractor" ? "none" : ""; },
          get cursor() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "alignVertex" ? "not-allowed" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s !== "alignVertex"; },
          get opacity() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "protractor" ? 0 : (s === "alignVertex" ? 1 : 0.5); },
          get pulsate() { return false; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page7PartState === "alignVertex") return;
            window.page7LastClickedButtonId = "page7-button-align-vertex";
            window.forceAppUpdate?.();
            if (window.playCarClickSound) window.playCarClickSound("click");
            window.page7OnAnimateToComplete = () => {
              window.page7PartState = "alignBase";
              window.dispatchEvent(new CustomEvent("page7PartStateChanged", { detail: { state: "alignBase" } }));
              window.forceAppUpdate?.();
              window.page7OnAnimateToComplete = null;
            };
            if (typeof window.page7ProtractorAnimateTo === "function") {
              window.page7ProtractorAnimateTo([1100, 675], 2000);
            } else {
              if (window.page7OnAnimateToComplete) window.page7OnAnimateToComplete();
            }
          },
        },
      },
      {
        id: "page7-button-align-base",
        name: "page7-button-align-base",
        type: "textbox",
        coordinates: [50, 550, 600, 633],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return (s === "protractor" || s === "alignVertex") ? "none" : ""; },
          get cursor() { return "default"; },
          get disabled() { return false; },
          get opacity() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return (s === "protractor" || s === "alignVertex") ? 0 : (s === "alignBase" ? 1 : 0.5); },
          get pulsate() { return false; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page7PartState === "alignBase") return;
          },
        },
      },
      {
        id: "page7-button-align-second-arm",
        name: "page7-button-align-second-arm",
        type: "textbox",
        coordinates: [50, 675, 600, 758],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonAntiClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return (s === "protractor" || s === "alignVertex" || s === "alignBase") ? "none" : ""; },
          get cursor() { return "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s !== "alignMeasurementArm"; },
          get className() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "alignMeasurementArm" ? "no-pointer-events" : ""; },
          get opacity() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return (s === "alignMeasurementArm" || s === "complete") ? 1 : 0; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page7PartState) || "protractor"; return s === "alignMeasurementArm"; },
          onClick: () => { /* no-op: button 4 is not clickable */ },
        },
      },
      {
        id: "page7-instruction",
        name: "page7-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            if (typeof window === "undefined") return getI18nText("pages.page3.instruction");
            const s = window.page7PartState;
            if (s === "complete") return getI18nText("pages.page3.instructionShoutAnswer");
            if (s === "alignVertex") return getI18nText("pages.page3.instructionAlignVertex");
            if (s === "alignBase") return getI18nText("pages.page3.instructionAlignBase");
            if (s === "alignMeasurementArm") return getI18nText("pages.page3.instructionAlignMeasurementArm");
            return getI18nText("pages.page3.instruction");
          },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[7];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page7-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page7-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[7];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    8: [
      // Page 8: exact replica of page 6 (static layout, quiz panel)
      {
        id: "page8-header",
        name: "page8-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page8-intro",
        name: "page8-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page8-protractor-container",
        name: "page8-protractor-container",
        coordinates: [50, 225, 950, 725],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page8-protractor",
        name: "page8-protractor",
        type: "custom",
        coordinates: [500, 625, 520, 675],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,
          opacity: 1,
          syncRotationFromConfig: false,
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            isDraggable: false,
            showRotationRing: false,
            isProtractorRotatable: false,
          },
          measurementArm: {
            show: true,
            length: "125gc",
            thickness: "4gc",
            color: "#22c55e",   // Green (same as pages 3, 4, 5, 6, 7, 11, 12, 13 when correct)
            angle: 130,
            style: "solid",
            extendable: false,
            rotatable: false,
            circleSize: "20gc",
            circleBlink: false,
            circleBorderColor: "white",
            circleBorderThickness: "2gc",
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              background: "rgba(34, 197, 94, 0.65)",  // Green to match arm/circle
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page8-arrow-line",
        name: "page8-arrow-line",
        type: "custom",
        coordinates: [144, 620, 495, 620],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "start", // arrow at (x1,y1) for anti-clockwise direction
        },
      },
      {
        id: "page8-arrow-line-white",
        name: "page8-arrow-line-white",
        type: "custom",
        coordinates: [495, 630, 236, 314],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page8-instruction",
        name: "page8-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() { return (typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(8)) ? getI18nText("pages.page6.instructionComplete") : getI18nText("pages.page6.instruction"); },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page8-quiz-panel",
        name: "page8-quiz-panel",
        type: "custom",
        coordinates: [980, 225, 1550, 725],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: "QT2",
          quizId: "page8-quiz-qt2",
          questionText: getI18nText("pages.quiz.angleQuestion"),
          options: [
            { text: getI18nText("pages.quiz.option50"), iscorrect: true, feedback: getI18nText("pages.quiz.correct50") },
            { text: getI18nText("pages.quiz.option130"), iscorrect: false, feedback: getI18nText("pages.quiz.incorrect50") },
          ],
          buttonHeightPercent: 75,
          buttonWidthPercent: 80,
        },
      },
      {
        id: "page8-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[8];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page8-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page8-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[8];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    9: [
      {
        id: "page9-header",
        name: "page9-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page9-intro",
        name: "page9-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page9-arrow-line",
        name: "page9-arrow-line",
        type: "custom",
        coordinates: [574, 422, 832, 730], // +25gc right, +10gc down
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "start", // arrow at (x1,y1) for anti-clockwise direction
        },
      },
      {
        id: "page9-arrow-line-white",
        name: "page9-arrow-line-white",
        type: "custom",
        coordinates: [820, 730, 1077, 424], // +25gc right, +10gc down
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },

      {
        id: "page9-protractor-container",
        name: "page9-protractor-container",
        coordinates: [400, 250, 1250, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page9-instruction",
        name: "page9-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.instruction"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[9];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page9-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page9-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[9];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    10: [
      // Page 10: exact replica of page 9
      {
        id: "page10-header",
        name: "page10-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page10-intro",
        name: "page10-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page10-info-text",
        name: "page10-info-text",
        coordinates: [425, 275, 1225, 400],
        zIndex: 10000,
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.methodText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "16gc",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page10-arrow-line",
        name: "page10-arrow-line",
        type: "custom",
        coordinates: [574, 422, 832, 730],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "start",
        },
      },
      {
        id: "page10-arrow-line-white",
        name: "page10-arrow-line-white",
        type: "custom",
        coordinates: [820, 730, 1077, 424],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page10-protractor-container",
        name: "page10-protractor-container",
        coordinates: [400, 250, 1250, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page10-instruction",
        name: "page10-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() { return (typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(10)) ? getI18nText("pages.page6.instructionComplete") : getI18nText("pages.page6.instruction"); },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page10-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[10];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page10-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page10-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[10];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    11: [
      // Page 11: exact replica of page 7 with its own state (page11PartState, etc.)
      {
        id: "page11-header",
        name: "page11-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page11-intro",
        name: "page11-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page11-protractor-container",
        name: "page11-protractor-container",
        coordinates: [650, 275, 1550, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page11-protractor",
        name: "page11-protractor",
        type: "custom",
        coordinates: [905, 540, 925, 590],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 330,
          get opacity() { const s = (typeof window !== "undefined" && (window.page11PartState || "protractor")) || "protractor"; return s === "protractor" ? 0 : 1; },
          get syncRotationFromConfig() { const s = (typeof window !== "undefined" && (window.page11PartState || "protractor")) || "protractor"; return s === "protractor"; },
          persistRotationKey: "page11ProtractorRotation",
          snapPoint: [1098, 722],
          snapTolerance: 60,
          snapRotationAngle: 330,
          snapRotationTolerance: 10,
          onSnapToPoint: () => {
            if (typeof window !== "undefined" && window.page11PartState === "alignVertex") {
              window.page11PartState = "alignBase";
              window.dispatchEvent(new CustomEvent("page11PartStateChanged", { detail: { state: "alignBase" } }));
              window.forceAppUpdate?.();
            }
          },
          onSnapToRotation: () => {
            if (typeof window !== "undefined" && window.page11PartState === "alignBase") {
              window.page11PartState = "alignMeasurementArm";
              window.dispatchEvent(new CustomEvent("page11PartStateChanged", { detail: { state: "alignMeasurementArm" } }));
              window.forceAppUpdate?.();
            }
          },
          onAnimateToReady: (animateTo) => { if (typeof window !== "undefined") window.page11ProtractorAnimateTo = animateTo; },
          onAnimateToComplete: () => { if (typeof window !== "undefined" && typeof window.page11OnAnimateToComplete === "function") window.page11OnAnimateToComplete(); },
          onAnimateRotationReady: (animateRotation) => { if (typeof window !== "undefined") window.page11ProtractorAnimateRotation = animateRotation; },
          onAnimateRotationComplete: () => { if (typeof window !== "undefined" && typeof window.page11OnRotationComplete === "function") window.page11OnRotationComplete(); },
          onAnimateArmReady: (animateArmTo) => { if (typeof window !== "undefined") window.page11ProtractorAnimateArmTo = animateArmTo; },
          onAnimateArmComplete: () => { if (typeof window !== "undefined" && typeof window.page11OnAnimateArmComplete === "function") window.page11OnAnimateArmComplete(); },
          onArmSnapToAngle: () => {
            if (typeof window !== "undefined" && window.page11PartState === "alignMeasurementArm") {
              window.page11PartState = "complete";
              window.dispatchEvent(new CustomEvent("page11PartStateChanged", { detail: { state: "complete" } }));
              window.dispatchEvent(new CustomEvent("quizCompleted", { detail: { pageNumber: 11 } }));
              window.forceAppUpdate?.();
            }
          },
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            get isDraggable() { return (typeof window !== "undefined" && window.page11PartState === "alignVertex"); },
            get showRotationRing() { return (typeof window !== "undefined" && window.page11PartState === "alignBase"); },
            get isProtractorRotatable() { return (typeof window !== "undefined" && window.page11PartState === "alignBase"); },
            snapRotationAngle: 312,
            snapRotationTolerance: 5,
            rotationRingRadiusFactor: 1.15,
            rotationRingHandleSize: 50,
            rotationRingHandleBorderColor: "white",
            rotationRingHandleBorderThickness: 4,
            rotationRingHandleBackground: "rgba(255, 140, 0, 0.95)",
            rotationRingHandleBlink: true,
          },
          measurementArm: {
            get show() { return (typeof window !== "undefined" && (window.page11PartState === "alignMeasurementArm" || window.page11PartState === "complete")); },
            length: "125gc",
            thickness: "4gc",
            get color() { return (typeof window !== "undefined" && window.page11PartState === "complete") ? "#22c55e" : "red"; }, // Green when snapped at right angle
            angle: 0,
            style: "solid",
            extendable: false,
            get rotatable() { return (typeof window !== "undefined" && window.page11PartState === "complete") ? false : true; },
            circleSize: "20gc",
            get circleBlink() { return (typeof window !== "undefined" && window.page11PartState === "complete") ? false : true; },
            circleBorderColor: "white",
            circleBorderThickness: "2gc",
            snapAngle: 70,
            snapTolerance: 5,
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              get background() { return (typeof window !== "undefined" && window.page11PartState === "complete") ? "rgba(34, 197, 94, 0.65)" : "rgba(255, 165, 0, 0.65)"; }, // Green when snapped
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page11-arrow-line",
        name: "page11-arrow-line",
        type: "custom",
        coordinates: [1091, 720, 1362, 414], // -100gc left
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "end",
        },
      },
      {
        id: "page11-arrow-line-white",
        name: "page11-arrow-line-white",
        type: "custom",
        coordinates: [1095, 727, 930, 412], // -100gc left
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "end",
        },
      },
      {
        id: "page11-button-bring-protractor",
        name: "page11-button-bring-protractor",
        type: "textbox",
        coordinates: [50, 300, 600, 383],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonVertex"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get cursor() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "protractor" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page11LastClickedButtonId === "page11-button-bring-protractor"); return s !== "protractor" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "protractor" ? 1 : 0.5; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "protractor"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page11PartState === "protractor") {
              window.page11LastClickedButtonId = "page11-button-bring-protractor";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page11PartState = "alignVertex";
              window.dispatchEvent(new CustomEvent("page11PartStateChanged", { detail: { state: "alignVertex" } }));
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page11-button-align-vertex",
        name: "page11-button-align-vertex",
        type: "textbox",
        coordinates: [50, 425, 600, 508],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonBase"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "protractor" ? "none" : ""; },
          get cursor() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "alignVertex" ? "not-allowed" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s !== "alignVertex"; },
          get opacity() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "protractor" ? 0 : (s === "alignVertex" ? 1 : 0.5); },
          get pulsate() { return false; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page11PartState === "alignVertex") return;
            window.page11LastClickedButtonId = "page11-button-align-vertex";
            window.forceAppUpdate?.();
            if (window.playCarClickSound) window.playCarClickSound("click");
            window.page11OnAnimateToComplete = () => {
              window.page11PartState = "alignBase";
              window.dispatchEvent(new CustomEvent("page11PartStateChanged", { detail: { state: "alignBase" } }));
              window.forceAppUpdate?.();
              window.page11OnAnimateToComplete = null;
            };
            if (typeof window.page11ProtractorAnimateTo === "function") {
              window.page11ProtractorAnimateTo([1100, 675], 2000);
            } else {
              if (window.page11OnAnimateToComplete) window.page11OnAnimateToComplete();
            }
          },
        },
      },
      {
        id: "page11-button-align-base",
        name: "page11-button-align-base",
        type: "textbox",
        coordinates: [50, 550, 600, 633],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return (s === "protractor" || s === "alignVertex") ? "none" : ""; },
          get cursor() { return "default"; },
          get disabled() { return false; },
          get opacity() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return (s === "protractor" || s === "alignVertex") ? 0 : (s === "alignBase" ? 1 : 0.5); },
          get pulsate() { return false; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page11PartState === "alignBase") {
              window.page11PartState = "alignMeasurementArm";
              window.dispatchEvent(new CustomEvent("page11PartStateChanged", { detail: { state: "alignMeasurementArm" } }));
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page11-button-align-second-arm",
        name: "page11-button-align-second-arm",
        type: "textbox",
        coordinates: [50, 675, 600, 758],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonAntiClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#ffffff",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FFA500",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          get display() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return (s === "protractor" || s === "alignVertex" || s === "alignBase") ? "none" : ""; },
          get cursor() { return "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s !== "alignMeasurementArm"; },
          get className() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "alignMeasurementArm" ? "no-pointer-events" : ""; },
          get opacity() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return (s === "alignMeasurementArm" || s === "complete") ? 1 : 0; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page11PartState) || "protractor"; return s === "alignMeasurementArm"; },
          onClick: () => { /* no-op: button 4 is not clickable */ },
        },
      },
      {
        id: "page11-instruction",
        name: "page11-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            if (typeof window === "undefined") return getI18nText("pages.page3.instruction");
            const s = window.page11PartState;
            if (s === "complete") return getI18nText("pages.page3.instructionShoutAnswer");
            if (s === "alignVertex") return getI18nText("pages.page3.instructionAlignVertex");
            if (s === "alignBase") return getI18nText("pages.page3.instructionAlignBase");
            if (s === "alignMeasurementArm") return getI18nText("pages.page3.instructionAlignMeasurementArm");
            return getI18nText("pages.page3.instruction");
          },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page11-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[11];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page11-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page11-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[11];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    12: [
      // Page 12: exact replica of page 8 (static layout, quiz panel)
      {
        id: "page12-header",
        name: "page12-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page12-intro",
        name: "page12-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page12-protractor-container",
        name: "page12-protractor-container",
        coordinates: [50, 225, 950, 725],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page12-protractor",
        name: "page12-protractor",
        type: "custom",
        coordinates: [500, 625, 520, 675],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 312,
          opacity: 1,
          syncRotationFromConfig: false,
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            isDraggable: false,
            showRotationRing: false,
            isProtractorRotatable: false,
          },
          measurementArm: {
            show: true,
            length: "125gc",
            thickness: "4gc",
            color: "#22c55e",   // Green (same as pages 3, 4, 5, 6, 7, 8, 11, 13 when correct)
            angle: 70,
            style: "solid",
            extendable: false,
            rotatable: false,
            circleSize: "20gc",
            circleBlink: false,
            circleBorderColor: "white",
            circleBorderThickness: "2gc",
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              background: "rgba(34, 197, 94, 0.65)",  // Green to match arm/circle
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page12-arrow-line",
        name: "page12-arrow-line",
        type: "custom",
        coordinates: [492, 620, 763, 314], // +2gc left
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "end",
        },
      },
      {
        id: "page12-arrow-line-white",
        name: "page12-arrow-line-white",
        type: "custom",
        coordinates: [496, 627, 331, 312], // +2gc left
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          arrowAt: "end",
        },
      },
      {
        id: "page12-instruction",
        name: "page12-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() { return (typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(12)) ? getI18nText("pages.page6.instructionComplete") : getI18nText("pages.page6.instruction"); },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page12-quiz-panel",
        name: "page12-quiz-panel",
        type: "custom",
        coordinates: [980, 225, 1550, 725],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: "QT2",
          quizId: "page12-quiz-qt2",
          questionText: getI18nText("pages.quiz.angleQuestion"),
          options: [
            { text: getI18nText("pages.quiz.option70"), iscorrect: true, feedback: getI18nText("pages.quiz.correct70") },
            { text: getI18nText("pages.quiz.option110"), iscorrect: false, feedback: getI18nText("pages.quiz.incorrect70") },
          ],
          buttonHeightPercent: 75,
          buttonWidthPercent: 80,
        },
      },
      {
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[12];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
      {
        id: "page12-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.7,
        },
      },
      {
        id: "page12-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[12];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
    ],

    13: [
      // Page 13: exact replica of page 4
      {
        id: "page13-title",
        name: "page13-title",
        coordinates: [25, 25, 1575, 110],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page13.title"),
          fontSize: "48gc",
          color: "#FFA500",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      {
        id: "page13-protractor-container",
        name: "page13-protractor-container",
        coordinates: [25, 220, 750, 700],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "0gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page13-protractor",
        name: "page13-protractor",
        type: "custom",
        coordinates: [355, 590, 375, 640],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,
          opacity: 1,
          syncRotationFromConfig: false,
          persistRotationKey: "page13ProtractorRotation",
          appearance: {
            protractorType: "semicircular",
            radius: "225gc",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            showCenterSemicircle: true,
            centerSemicircleRadius: "20gc",
            centerSemicircleThickness: "3gc",
            showCenterCrosshair: true,
            centerCrosshairThickness: "2gc",
            centerCrosshairLength: "25gc",
            showCenterHotspot: false,
            centerHotspotSize: "40gc",
            centerHotspotBorderThickness: "8gc",
            centerHotspotBorderColor: "orange",
            centerHotspotBackground: "white",
            showBaseline: false,
            baselineColor: "#333",
            baselineThickness: "10gc",
            baselineLabelGap: "20gc",
          },
          labels: {
            showDegreeLabels: true,
            labelInterval: 10,
            labelFontSize: "15gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true,
            labelToSemicircleLineGap: "15gc",
            showSecondaryLabelToSemicircleLines: true,
            secondaryLabelToSemicircleLineGap: "45gc",
            primarySemicircleToSemicircleLineGap: "5gc",
            secondarySemicircleToSemicircleLineGap: "55gc",
          },
          ticks: {
            showDegreeMarks: true,
            degreeInterval: 10,
            showMinorTicks: true,
            minorTickInterval: 2,
            showLabelToArcLines: true,
            labelToArcLineThickness: "1gc",
          },
          interaction: {
            protractorRotation: 25,
            mode: "interactive",
            isDraggable: true,
            showRotationRing: false,
          },
          measurementArm: {
            show: true,
            length: "125gc",
            thickness: "4gc",
            color: "#22c55e",   // Green (same as pages 3, 4, 5, 6, 7, 8, 11, 12 when correct)
            angle: 50,
            style: "solid",
            extendable: false,
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              background: "rgba(34, 197, 94, 0.65)",  // Green to match arm/circle
              color: "black",
              gap: "25gc",
            },
          },
        },
      },
      {
        id: "page13-arrow-line",
        name: "page13-arrow-line",
        type: "custom",
        coordinates: [345, 595, 700, 595],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page13-arrow-line-white",
        name: "page13-arrow-line-white",
        type: "custom",
        coordinates: [345, 595, 600, 289],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
        },
      },
      {
        id: "page13-info-box",
        name: "page13-info-box",
        coordinates: [770, 120, 1550, 800],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page13.infoText"),
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          color: "#FFFFFF",
          fontSize: "34gc",
          lineHeight: "1.6",
          textAlign: "left",
          padding: "24gc",
          borderRadius: "12gc",
          boxSizing: "border-box",
          allowHTML: true,
          verticalAlign: "center",
        },
      },
      {
        id: "page13-instruction",
        name: "page13-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page13.footerInstruction"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page13-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          backgroundColor: "#F9A825",
          color: "#FFFFFF",
          fontWeight: "bold",
          borderRadius: "12gc",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[13];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
      {
        id: "page13-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver");
          },
          fontSize: "24gc",
          allowHTML: true,
          enabled: true,
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            resetAllStatesForStartOver();
            navigateToPage(1, "startOver");
          },
        },
      },
      {
        id: "page13-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.75,
        },
      },
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all global part states and variables for "Start Over" (navigate to page 1 from page 13).
 * Restores page 5, 7, 11 part states to "protractor" and clears protractor rotation / last-clicked state.
 */
const resetAllStatesForStartOver = () => {
  if (typeof window === 'undefined') return;
  window.page5PartState = "protractor";
  delete window.page5ProtractorRotation;
  delete window.page5LastClickedButtonId;
  window.page7PartState = "protractor";
  delete window.page7ProtractorRotation;
  delete window.page7LastClickedButtonId;
  window.page11PartState = "protractor";
  delete window.page11ProtractorRotation;
  delete window.page11LastClickedButtonId;
  delete window.page13ProtractorRotation;
  window.page1complete = false;
  window.objectsremoved = 0;
  if (window.currentQuestionIndex !== undefined) window.currentQuestionIndex = 0;
  if (typeof window.pageCompletionState === 'object' && window.pageCompletionState !== null) {
    window.pageCompletionState = {};
  }
};

/**
 * Reset all states for a page when it loads
 * This ensures clean state on every page navigation
 * @param {number} pageNumber - Page to reset
 * @param {Object} options - { skipDispatch: true } to skip pageStateReset/globalPageReset (use when landing on target page so sequence can start)
 */
const resetPageStates = (pageNumber, options = {}) => {
  if (typeof window === 'undefined') return;
  const skipDispatch = options.skipDispatch === true;

  if (pageNumber === 14) {
    window.page14IsComplete = false;
  }
  if (pageNumber === 15) {
    window.page15IsComplete = false;
  }

  console.log(`Ã°Å¸â€â€ž Resetting all states for page ${pageNumber}` + (skipDispatch ? ' (skipDispatch: sequence can start)' : ''));

  try {
    // 1. Stop all quadrilateral animations (when Next/Prev is pressed)
    if (window.quadrilateralAnimations) {
      Object.keys(window.quadrilateralAnimations).forEach(quadId => {
        const animObj = window.quadrilateralAnimations[quadId];
        const quadElement = document.getElementById(quadId);
        const stopAll = (obj) => {
          if (!obj) return;
          if (obj.stopAngleEqualityAnimation) obj.stopAngleEqualityAnimation();
          if (obj.stopAngleSumAnimation) obj.stopAngleSumAnimation();
          if (obj.stopSideEqualityAnimation) obj.stopSideEqualityAnimation();
          if (obj.stopOppositeSideAnimation) obj.stopOppositeSideAnimation();
          if (obj.stopDiagonalEqualityAnimation) obj.stopDiagonalEqualityAnimation();
          if (obj.stopDiagonalBisectionAnimation) obj.stopDiagonalBisectionAnimation();
          if (obj.stopDiagonalPerpendicularAnimation) obj.stopDiagonalPerpendicularAnimation();
          if (obj.stopDiagonalAngleBisectionAnimation) obj.stopDiagonalAngleBisectionAnimation();
          if (obj.stopParallelLinesAnimation) obj.stopParallelLinesAnimation();
          if (obj.stopSymmetryFoldAnimation) obj.stopSymmetryFoldAnimation();
          if (obj.stopRotationalSymmetryAnimation) obj.stopRotationalSymmetryAnimation();
        };
        stopAll(quadElement);
        stopAll(animObj);
        if (animObj.updateSideColors) {
          for (let i = 0; i < 4; i++) {
            animObj.updateSideColors(i, null, false);
          }
        }
      });
    }

    // 2. Reset quadrilateral display states via events (no global state needed)
    // Components will reset themselves when they receive the pageStateReset event
    // No need to dispatch individual property reset events - components handle their own reset

    // 3. Reset quadrilateral component states (vertices, transforms, colors, etc.)
    if (typeof document !== 'undefined') {
      // Find all quadrilateral components
      const quadElements = document.querySelectorAll('[id*="-shape-display"], [id*="-quadrilateral"], [data-quad-type]');
      quadElements.forEach(element => {
        // Reset CSS transforms (parallel lines animation, etc.)
        const quadWrapper = element.querySelector('.quadrilateral-wrapper');
        if (quadWrapper) {
          quadWrapper.style.transform = '';
          quadWrapper.style.transition = '';
          quadWrapper.style.willChange = '';
          quadWrapper.style.isolation = '';
          quadWrapper.style.transformStyle = '';
        }

        // Reset parallel lines animation rails
        const parallelRails = element.querySelectorAll('.parallel-lines-rails');
        parallelRails.forEach(rail => rail.remove());

        // Reset any animated arc containers
        const animatedArcs = element.querySelectorAll('.animated-angle-arc-container, .animated-angle-sum-arc-container');
        animatedArcs.forEach(arc => {
          arc.style.opacity = '';
          arc.style.transform = '';
        });

        // Reset symmetry fold animation
        const symmetryFold = element.querySelectorAll('.symmetry-folding-half-wrapper, .symmetry-fold-line');
        symmetryFold.forEach(fold => fold.remove());

        // Reset diagonal equality animation
        const diagonalEquality = element.querySelectorAll('.animated-diagonal-equality-line');
        diagonalEquality.forEach(line => line.remove());

        // Reset side colors by finding all SVG lines and resetting their stroke
        const svg = element.querySelector('svg');
        if (svg) {
          // Reset all side line colors to default (remove any custom colors/blinking)
          const sideLines = svg.querySelectorAll('line[data-side-index], line');
          sideLines.forEach(line => {
            line.style.stroke = '';
            line.classList.remove('side-blink');
            // Remove any data attributes that might affect color
            line.removeAttribute('data-custom-color');
          });

          // Remove dynamically added symbols (arrows, ticks, etc.)
          const dynamicElements = svg.querySelectorAll('[data-dynamic="true"], .parallel-arrow, .equality-tick, .angle-equality-tick, .parallel-arrows-container, g[data-symbols]');
          dynamicElements.forEach(el => el.remove());
        }

        // Reset angle markers (remove any equality ticks, reset colors)
        const angleMarkers = element.querySelectorAll('.angle-marker-component');
        angleMarkers.forEach(marker => {
          // Remove equality tick marks
          const equalityTicks = marker.querySelectorAll('.equality-tick-mark, .angle-equality-tick, line.equality-tick');
          equalityTicks.forEach(tick => tick.remove());

          // Reset angle marker colors and blinking
          const arcs = marker.querySelectorAll('path, svg');
          arcs.forEach(arc => {
            arc.style.fill = '';
            arc.style.stroke = '';
            arc.classList.remove('angle-arc-blink');
            // Reset fill opacity
            if (arc.hasAttribute('fill-opacity')) {
              arc.setAttribute('fill-opacity', '');
            }
          });
        });

        // Clear angle measurement labels
        const angleLabels = element.querySelectorAll('.angle-measurement-label, [data-angle-label="true"]');
        angleLabels.forEach(label => label.remove());
      });
    }

    // 4. Reset message boxes (only clear those that are meant to be dynamically updated)
    // Message boxes with initial static text should be preserved
    if (typeof document !== 'undefined') {
      const messageBoxes = document.querySelectorAll('[id*="-messagebox"]');
      messageBoxes.forEach(box => {
        const boxId = box.id;
        // Only clear message boxes that are meant to be dynamically updated
        // These are message boxes that start with empty text in PageConfig (e.g., page4-messagebox, etc.)
        if (boxId && (boxId.includes('page4-') || boxId.includes('page5-') || boxId.includes('page6-'))) {
          // These message boxes are meant to be dynamically updated, so clear them
          if (box.textContent) {
            box.textContent = '';
          }
          if (box.innerHTML) {
            box.innerHTML = '';
          }
        }
        // For other message boxes, preserve their content
        // The component will restore the initial text from props on re-render
      });
    }

    // 5. Reset button states (enable/disable)
    if (typeof document !== 'undefined') {
      const nextButtons = document.querySelectorAll('[id*="-next-button"]');
      nextButtons.forEach(button => {
        const container = button.closest('.next-button') || button;
        if (container) {
          container.classList.remove('disabled');
          container.style.opacity = '';
          container.style.pointerEvents = '';
        }
      });

      const tapAnimations = document.querySelectorAll('[id*="-tap-next"]');
      tapAnimations.forEach(tap => {
        if (tap.style) {
          tap.style.display = '';
          tap.style.visibility = '';
        }
      });
    }

    // 6. Clear any animation sequence states
    if (window.QuadAnimationSequenceStates) {
      Object.keys(window.QuadAnimationSequenceStates).forEach(seqId => {
        const state = window.QuadAnimationSequenceStates[seqId];
        if (state) {
          state.currentStep = 0;
          state.isComplete = false;
          state.isRunning = false;
          // Clear any timeouts
          if (state.timeouts) {
            state.timeouts.forEach(timeout => clearTimeout(timeout));
            state.timeouts = [];
          }
        }
      });
    }

    // 7. Reset shape selector state if exists
    if (window.shapeSelectorState) {
      Object.keys(window.shapeSelectorState).forEach(key => {
        const state = window.shapeSelectorState[key];
        if (state) {
          state.selected = false;
          state.highlighted = false;
        }
      });
    }

    // 7b. Reset page 5 part state (own copy of former page 3 flow)
    if (pageNumber === 5 && typeof window !== 'undefined') {
      window.page5PartState = 'protractor';
      delete window.page5ProtractorRotation;
      delete window.page5LastClickedButtonId;
    }

    // 7c. Reset page 7 part state (replica of page 5 with own state)
    if (pageNumber === 7 && typeof window !== 'undefined') {
      window.page7PartState = 'protractor';
      delete window.page7ProtractorRotation;
      delete window.page7LastClickedButtonId;
    }

    // 7d. Reset page 11 part state (replica of page 7 with own state)
    if (pageNumber === 11 && typeof window !== 'undefined') {
      window.page11PartState = 'protractor';
      delete window.page11ProtractorRotation;
      delete window.page11LastClickedButtonId;
    }

    // 8. Reset all components with IDs matching the page pattern (e.g., page5-*)
    if (typeof document !== 'undefined') {
      // Find all elements with IDs matching the page pattern
      const pageElements = document.querySelectorAll(`[id^="page${pageNumber}-"]`);
      pageElements.forEach(element => {
        // Remove any dynamically added content
        const dynamicElements = element.querySelectorAll('[data-dynamic="true"], [data-description-index]');
        dynamicElements.forEach(el => el.remove());

        // Reset any inline styles that might have been modified (e.g. by animations)
        // Do NOT reset transform on line elements: slanted arrows use transform for rotation; clearing it makes them appear horizontal
        const isLineElement = element.closest?.('[data-component-type="LineComponent"]') != null || element.id?.includes('arrow-line') === true;
        if (element.style) {
          if (!isLineElement) element.style.transform = '';
          element.style.opacity = '';
          element.style.transition = '';
        }
      });
    }

    // 9. Dispatch reset event for components to listen (skip when landing on target page so animation sequence can start)
    if (!skipDispatch) {
      window.dispatchEvent(new CustomEvent('pageStateReset', {
        detail: { page: pageNumber }
      }));
      window.dispatchEvent(new CustomEvent('globalPageReset', {
        detail: { page: pageNumber }
      }));
    }

    console.log(`Ã¢Å“â€¦ All states reset for page ${pageNumber}`);
  } catch (error) {
    console.error(`Ã¢ÂÅ’ Error resetting page states:`, error);
  }
};

// ===== INITIALIZATION AND EXPORT =====

/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log("Ã°Å¸Å¡â‚¬ Initializing PageConfig");

  // Create GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();

  // Make available globally
  if (typeof window !== "undefined") {
    // Page 5 part state: always default to 'protractor' when config initializes
    window.page5PartState = "protractor";
    delete window.page5ProtractorRotation;
    delete window.page5LastClickedButtonId;

    // Page 7 part state: replica of page 5 with own state
    window.page7PartState = "protractor";
    delete window.page7ProtractorRotation;
    delete window.page7LastClickedButtonId;

    // Page 11 part state: replica of page 7 with own state
    window.page11PartState = "protractor";
    delete window.page11ProtractorRotation;
    delete window.page11LastClickedButtonId;

    // Store the page configuration globally
    window.GridPositionPages = optimizedPages;
    window.gridPositions = window.GridPositionPages;

    // After a dev reload of PageConfig, React must re-read elements or props (e.g. expandedColumnGap) stay stale.
    if (typeof queueMicrotask === "function") {
      queueMicrotask(() => {
        if (typeof window.forceAppUpdate === "function") {
          window.forceAppUpdate();
        }
      });
    }

    // Expose page navigation configuration globally
    window.pageNavigation = pageNavigation;

    // Expose page mapping functions globally
    window.getPageNumbers = getPageNumbers;
    window.getPageFromDotPosition = getPageFromDotPosition;
    window.getDotPositionFromPage = getDotPositionFromPage;

    // Expose page state reset function globally
    window.resetPageStates = resetPageStates;

    // Listen for page change events and reset states (skipDispatch so animation sequence on this page can start)
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        setTimeout(() => {
          resetPageStates(pageNumber, { skipDispatch: true });
        }, 150);
      }
    });
    console.log("Ã¢Å“â€¦ Page state reset handler registered");

    // Initialize essential window functions
    console.log("Ã°Å¸â€â€ž [PageConfig] Initializing window functions...");

    try {
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log(
            "Ã°Å¸â€â€ž [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)"
          );
          console.log(
            "Ã°Å¸â€â€ž [Navigation] Treating as APP RELOAD with next question"
          );

          // Simplified navigation - always reset to 0
          const { currentIndex } = getCurrentQuestionData();
          const newIndex = 0;
          console.log(
            "Ã°Å¸â€â€ž [Navigation]",
            getI18nText("messages.navigationReset")
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log(
            "Ã¢Å“â€¦ [Navigation] Updated window.currentQuestionIndex to:",
            newIndex
          );

          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;

          console.log(
            "Ã¢Å“â€¦ [Navigation]",
            getI18nText("messages.navigationComplete")
          );
          resolve(newIndex);
        });
      };

      const updateQuestionDependentElements = () => {
        console.log("Ã°Å¸â€â€ž [UI] Updating question-dependent elements");

        // Trigger React re-render by forcing app update
        if (typeof window.forceAppUpdate === "function") {
          window.forceAppUpdate();
          console.log("Ã¢Å“â€¦ [UI] Triggered React re-render via forceAppUpdate");
        } else {
          console.warn(
            "Ã¢Å¡Â Ã¯Â¸Â [UI] forceAppUpdate not available, React may not re-render"
          );
        }

        // Page 2 removed - no longer needed

        console.log("Ã¢Å“â€¦ [UI] updateQuestionDependentElements completed");
      };

      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText("buttons.startOver");
      };

      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;

      console.log("Ã¢Å“â€¦ [PageConfig] Direct function assignment completed");
      console.log(
        "Ã°Å¸â€Â [PageConfig] window.advanceToNextQuestion type:",
        typeof window.advanceToNextQuestion
      );
      console.log(
        "Ã°Å¸â€Â [PageConfig] window.updateQuestionDependentElements type:",
        typeof window.updateQuestionDependentElements
      );
    } catch (error) {
      console.error(
        "Ã¢ÂÅ’ [PageConfig] Error in direct function assignment:",
        error
      );
    }

    // Add global function to manually clear page states (for testing)
    window.clearAllPageStates = () => {
      console.log("Ã°Å¸Â§Â¹ [PageConfig] Manually clearing page states");
      try {
        // Reset global variables
        window.page1complete = false;
        window.objectsremoved = 0;
        window.currentQuestionIndex = 0;

        console.log("Ã¢Å“â€¦ [PageConfig] Page states cleared successfully");

        // Reload the page to start fresh
        if (confirm(getI18nText("messages.pageStatesCleared"))) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Ã¢ÂÅ’ [PageConfig] Error clearing page states:", error);
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
            console.log(`Ã°Å¸Å½Â¯ [PageConfig] Reading text from source ${sourceId}:`, sourceText);

            // Try to update number pad target first (if destination is a number pad)
            if (window.numberPadCallbacks && window.numberPadCallbacks[destinationId]) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(`Ã¢Å“â€¦ [PageConfig] Updated number pad ${destinationId} target to:`, sourceText);
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(`Ã¢Å“â€¦ [PageConfig] Updated element ${destinationId} text to:`, sourceText);
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(`Ã°Å¸â€â€ž [PageConfig] Destination element ${destinationId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
                setTimeout(() => {
                  window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
                }, retryDelay);
              } else {
                console.warn(`Ã¢Å¡Â Ã¯Â¸Â [PageConfig] Destination element not found: ${destinationId} after ${maxRetries} retries`);
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(`Ã°Å¸â€â€ž [PageConfig] Source element ${sourceId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
              setTimeout(() => {
                window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
              }, retryDelay);
            } else {
              // Log as info instead of warning - element might not exist by design
              console.log(`Ã¢â€žÂ¹Ã¯Â¸Â [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries (this may be expected if element is optional)`);
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
        console.error('Ã¢ÂÅ’ [PageConfig] Error updating target text:', error);
      }
    };

    console.log(
      "Ã¢Å“â€¦ PageConfig initialized - pages and functions available globally"
    );
    console.log(
      "Ã°Å¸â€™Â¡ [PageConfig] Use window.clearAllPageStates() to manually clear page states"
    );
    console.log(
      "Ã°Å¸â€™Â¡ [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element"
    );
  }

  return optimizedPages;
};

// Initialize immediately
console.log("Ã°Å¸â€â€ž [PageConfig] About to call initializePageConfig...");
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  "Ã°Å¸â€â€ž [PageConfig] initializePageConfig completed, result:",
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

console.log("Ã°Å¸Å½â€° PageConfig optimization complete!");

