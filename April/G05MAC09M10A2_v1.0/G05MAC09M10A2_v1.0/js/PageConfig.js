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
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: null },
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
 * Get shape configuration from constants.js
 * Returns the shape object with quadType, vertices, gridRows, and gridCols
 * Falls back to default parallelogram if window.shape is not available
 * @returns {Object} Shape configuration object
 */
const getShapeConfig = () => {
  if (typeof window !== 'undefined' && window.shape) {
    return {
      quadType: window.shape.quadType || "PARALLELOGRAM",
      vertices: window.shape.vertices || [
        { row: 2, col: 2 },
        { row: 2, col: 8 },
        { row: 7, col: 9 },
        { row: 7, col: 3 }
      ],
      gridRows: window.shape.gridRows || 10,
      gridCols: window.shape.gridCols || 10
    };
  }
  // Fallback to default rhombus (80% size, fractional coordinates)
  return {
    quadType: "RHOMBUS",
    vertices: [
      { row: 2.6, col: 5 },   // A - top
      { row: 5, col: 7.4 },   // B - right
      { row: 7.4, col: 5 },   // C - bottom
      { row: 5, col: 2.6 }    // D - left
    ],
    gridRows: 10,
    gridCols: 10
  };
};

/**
 * Calculate total number of pages from pageNavigation
 * @returns {number} Total number of pages
 */
const getTotalPages = () => {
  return getPageNumbers().length;
};

// ===== PAGE 3 LINE SELECTION LOGIC =====
// Max 2 selections; correct answer is the bottom side (CD) + the height line.
(function initPage3LineSelection() {
  if (typeof window === "undefined" || window.page3Lines) return;

  const MAX_SELECTED = 2;
  const CORRECT_ANSWER = ["CD", "height"]; // bottom side + height
  const QUIZ_ID = "page3-line-selection";
  const PAGE_NUMBER = 3;

  const state = { selected: new Set(), locked: false };

  const HIGHLIGHT_COLOR = "#FFEB3B";
  const DEFAULT_COLOR = "#FFFFFF";
  const CORRECT_COLOR = "var(--color-green-dark)";
  const GLOW_FILTER =
    "drop-shadow(0 0 6px rgba(255,235,59,0.9)) drop-shadow(0 0 14px rgba(255,235,59,0.55))";

  const sideNameToIndex = { AB: 0, BC: 1, CD: 2, DA: 3 };
  const sideOriginal = new Map(); // key -> { stroke, strokeWidth, filter }
  let heightOriginal = null; // { borderLeftColor, borderLeftWidth, filter }

  const getQuadSidesSvg = () => {
    const quadRoot = document.getElementById("page3-shape-display");
    if (!quadRoot) return null;
    const svgs = Array.from(quadRoot.querySelectorAll("svg"));
    // Pick the SVG that contains the 4 edge <line> elements
    return (
      svgs.find((svg) => svg.querySelectorAll("line").length >= 4) || null
    );
  };

  const getHeightLineEl = () => {
    // LineComponent uses id = `${elementName}-${currentPage}` when id prop isn't passed.
    const byComputedId = document.getElementById("page3-height-line-3");
    if (byComputedId) return byComputedId;
    // Fallback: query by data attributes set by LineComponent
    return document.querySelector(
      '[data-element-name="page3-height-line"][data-page="3"]'
    );
  };

  const getQuadSideLineEl = (sideKey) => {
    const idx = sideNameToIndex[sideKey];
    if (idx === undefined) return;
    const svg = getQuadSidesSvg();
    if (!svg) return;
    const lines = svg.querySelectorAll("line");
    const line = lines[idx];
    if (!line) return;
    return line;
  };

  const setQuadSideSelected = (sideKey, isSelected) => {
    const line = getQuadSideLineEl(sideKey);
    if (!line) return;

    if (!sideOriginal.has(sideKey)) {
      sideOriginal.set(sideKey, {
        stroke: line.getAttribute("stroke"),
        strokeWidth: line.getAttribute("stroke-width"),
        filter: line.style.filter || "",
      });
    }

    const orig = sideOriginal.get(sideKey);

    if (!isSelected) {
      line.setAttribute("stroke", orig.stroke || DEFAULT_COLOR);
      if (orig.strokeWidth !== null && orig.strokeWidth !== undefined) {
        line.setAttribute("stroke-width", orig.strokeWidth);
      }
      line.style.filter = orig.filter || "";
      return;
    }

    line.setAttribute("stroke", HIGHLIGHT_COLOR);
    // Original edgeThickness is 5gc on this page; selected should be 6gc.
    // Scale current stroke width by 6/5 rather than guessing absolute SVG units.
    const currentWidth = parseFloat(line.getAttribute("stroke-width") || "0");
    if (Number.isFinite(currentWidth) && currentWidth > 0) {
      line.setAttribute("stroke-width", String(currentWidth * (6 / 5)));
    }
    line.style.filter = GLOW_FILTER;
  };

  const setQuadSideCorrect = (sideKey) => {
    const line = getQuadSideLineEl(sideKey);
    if (!line) return;

    if (!sideOriginal.has(sideKey)) {
      sideOriginal.set(sideKey, {
        stroke: line.getAttribute("stroke"),
        strokeWidth: line.getAttribute("stroke-width"),
        filter: line.style.filter || "",
      });
    }

    line.setAttribute("stroke", CORRECT_COLOR);
    line.style.filter =
      "drop-shadow(0 0 6px rgba(0,170,0,0.85)) drop-shadow(0 0 14px rgba(0,170,0,0.5))";
  };

  const setHeightLineSelected = (isSelected) => {
    const el = getHeightLineEl();
    if (!el) return;

    const computed = window.getComputedStyle(el);
    if (!heightOriginal) {
      heightOriginal = {
        borderLeftColor: computed.borderLeftColor,
        borderLeftWidth: computed.borderLeftWidth,
        filter: el.style.filter || "",
      };
    }

    if (!isSelected) {
      el.style.borderLeftColor = heightOriginal.borderLeftColor || DEFAULT_COLOR;
      el.style.borderLeftWidth = heightOriginal.borderLeftWidth;
      el.style.filter = heightOriginal.filter || "";
      return;
    }

    // LineComponent uses border-left for vertical line strokes
    el.style.borderLeftColor = HIGHLIGHT_COLOR;
    // Original height line is 4gc; selected should be 6gc => scale by 1.5
    const currentPx = parseFloat(computed.borderLeftWidth || "0");
    if (Number.isFinite(currentPx) && currentPx > 0) {
      el.style.borderLeftWidth = `${currentPx * (6 / 4)}px`;
    }
    el.style.filter = GLOW_FILTER;
  };

  const setHeightLineCorrect = () => {
    const el = getHeightLineEl();
    if (!el) return;

    const computed = window.getComputedStyle(el);
    if (!heightOriginal) {
      heightOriginal = {
        borderLeftColor: computed.borderLeftColor,
        borderLeftWidth: computed.borderLeftWidth,
        filter: el.style.filter || "",
      };
    }

    el.style.borderLeftColor = CORRECT_COLOR;
    el.style.filter =
      "drop-shadow(0 0 6px rgba(0,170,0,0.85)) drop-shadow(0 0 14px rgba(0,170,0,0.5))";
  };

  const applyHighlight = (key, isSelected) => {
    if (key === "height") {
      setHeightLineSelected(isSelected);
      return;
    }
    setQuadSideSelected(key, isSelected);
  };

  const setInteractivityEnabled = (enabled) => {
    const ids = ["AB", "BC", "CD", "DA", "height"].map(
      (k) => `page3-clickable-${k}`
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.pointerEvents = enabled ? "auto" : "none";
      el.style.cursor = enabled ? "pointer" : "default";
    });

    const heightLine = getHeightLineEl();
    if (heightLine) {
      heightLine.style.pointerEvents = enabled ? "auto" : "none";
      heightLine.style.cursor = enabled ? "pointer" : "default";
    }

    const checkBtn = document.querySelector(".page3-check-button");
    if (checkBtn) {
      if (enabled) {
        checkBtn.classList.remove("disabled");
        checkBtn.style.opacity = "";
        checkBtn.style.pointerEvents = "auto";
      } else {
        checkBtn.classList.add("disabled");
        checkBtn.style.opacity = "0.5";
        checkBtn.style.pointerEvents = "none";
      }
    }
  };

  const updateFeedback = (text, mode) => {
    window.page3FeedbackState = { text, mode };
    window.dispatchEvent(
      new CustomEvent("page3FeedbackUpdate", {
        detail: { text, mode },
      })
    );
  };

  const playAnswerFeedbackSound = (isCorrect) => {
    if (typeof window === "undefined") return;

    if (typeof window.playCarClickSound === "function") {
      window.playCarClickSound(isCorrect ? "correct" : "wrong");
      return;
    }

    if (typeof window.playAnswerSound === "function") {
      window.playAnswerSound(isCorrect);
    }
  };

  const dispatchQuizCompleted = () => {
    const enableNextEvent = new CustomEvent("quizCompleted", {
      detail: {
        quizId: QUIZ_ID,
        pageNumber:
          typeof window.getCurrentPage === "function"
            ? window.getCurrentPage() || PAGE_NUMBER
            : PAGE_NUMBER,
      },
    });

    window.dispatchEvent(enableNextEvent);
  };

  const toggle = (key) => {
    if (state.locked) return;
    if (state.selected.has(key)) {
      state.selected.delete(key);
      applyHighlight(key, false);
      updateFeedback("", "normal");
      return;
    }
    if (state.selected.size >= MAX_SELECTED) {
      updateFeedback(
        "Two lines are already selected. Deselect one to pick another.",
        "incorrect"
      );
      return;
    }
    state.selected.add(key);
    applyHighlight(key, true);
    updateFeedback("", "normal");
  };

  const check = () => {
    if (state.locked) return;
    const sel = Array.from(state.selected).sort();
    const correct = CORRECT_ANSWER.slice().sort();
    if (sel.length !== correct.length) {
      playAnswerFeedbackSound(false);
      updateFeedback(
        `Select ${MAX_SELECTED} lines before checking.`,
        "incorrect"
      );
      return;
    }
    const isCorrect = sel.every((k, i) => k === correct[i]);
    if (isCorrect) {
      // Lock interactions, turn the selected lines green, and dim/disable the check button
      state.locked = true;
      state.selected.forEach((k) => {
        if (k === "height") setHeightLineCorrect();
        else setQuadSideCorrect(k);
      });
      setInteractivityEnabled(false);
      playAnswerFeedbackSound(true);
      dispatchQuizCompleted();
      updateFeedback(
        "Correct! The height is perpendicular to the bottom side.",
        "correct"
      );
    } else {
      playAnswerFeedbackSound(false);
      updateFeedback(
        "Not quite. Try selecting the bottom side and the height.",
        "incorrect"
      );
    }
  };

  const reset = () => {
    state.selected.forEach((k) => applyHighlight(k, false));
    state.selected.clear();
    state.locked = false;
    setInteractivityEnabled(true);
    updateFeedback("", "normal");
  };

  window.addEventListener("pageStateReset", reset);
  window.addEventListener("globalPageReset", reset);

  window.page3Lines = { toggle, check, reset, CORRECT_ANSWER };
})();

// ===== PAGE 7 LINE SELECTION LOGIC =====
// Max 2 selections; correct answer is the bottom side (CD) + the height line.
(function initPage7LineSelection() {
  if (typeof window === "undefined" || window.page7Lines) return;

  const MAX_SELECTED = 2;
  const CORRECT_ANSWER = ["CD", "height"];
  const QUIZ_ID = "page7-line-selection";
  const PAGE_NUMBER = 7;

  const state = { selected: new Set(), locked: false };

  const HIGHLIGHT_COLOR = "#FFEB3B";
  const DEFAULT_COLOR = "#FFFFFF";
  const CORRECT_COLOR = "var(--color-green-dark)";
  const GLOW_FILTER =
    "drop-shadow(0 0 6px rgba(255,235,59,0.9)) drop-shadow(0 0 14px rgba(255,235,59,0.55))";

  const sideNameToIndex = { AB: 0, BC: 1, CD: 2, DA: 3 };
  const sideOriginal = new Map();
  let heightOriginal = null;

  const getQuadSidesSvg = () => {
    const quadRoot = document.getElementById("page7-shape-display");
    if (!quadRoot) return null;
    const svgs = Array.from(quadRoot.querySelectorAll("svg"));
    return (
      svgs.find((svg) => svg.querySelectorAll("line").length >= 4) || null
    );
  };

  const getHeightLineEl = () => {
    const byComputedId = document.getElementById("page7-height-line-7");
    if (byComputedId) return byComputedId;
    return document.querySelector(
      '[data-element-name="page7-height-line"][data-page="7"]'
    );
  };

  const getQuadSideLineEl = (sideKey) => {
    const idx = sideNameToIndex[sideKey];
    if (idx === undefined) return;
    const svg = getQuadSidesSvg();
    if (!svg) return;
    const lines = svg.querySelectorAll("line");
    const line = lines[idx];
    if (!line) return;
    return line;
  };

  const setQuadSideSelected = (sideKey, isSelected) => {
    const line = getQuadSideLineEl(sideKey);
    if (!line) return;

    if (!sideOriginal.has(sideKey)) {
      sideOriginal.set(sideKey, {
        stroke: line.getAttribute("stroke"),
        strokeWidth: line.getAttribute("stroke-width"),
        filter: line.style.filter || "",
      });
    }

    const orig = sideOriginal.get(sideKey);

    if (!isSelected) {
      line.setAttribute("stroke", orig.stroke || DEFAULT_COLOR);
      if (orig.strokeWidth !== null && orig.strokeWidth !== undefined) {
        line.setAttribute("stroke-width", orig.strokeWidth);
      }
      line.style.filter = orig.filter || "";
      return;
    }

    line.setAttribute("stroke", HIGHLIGHT_COLOR);
    const currentWidth = parseFloat(line.getAttribute("stroke-width") || "0");
    if (Number.isFinite(currentWidth) && currentWidth > 0) {
      line.setAttribute("stroke-width", String(currentWidth * (6 / 5)));
    }
    line.style.filter = GLOW_FILTER;
  };

  const setQuadSideCorrect = (sideKey) => {
    const line = getQuadSideLineEl(sideKey);
    if (!line) return;

    if (!sideOriginal.has(sideKey)) {
      sideOriginal.set(sideKey, {
        stroke: line.getAttribute("stroke"),
        strokeWidth: line.getAttribute("stroke-width"),
        filter: line.style.filter || "",
      });
    }

    line.setAttribute("stroke", CORRECT_COLOR);
    line.style.filter =
      "drop-shadow(0 0 6px rgba(0,170,0,0.85)) drop-shadow(0 0 14px rgba(0,170,0,0.5))";
  };

  const setHeightLineSelected = (isSelected) => {
    const el = getHeightLineEl();
    if (!el) return;

    const computed = window.getComputedStyle(el);
    if (!heightOriginal) {
      heightOriginal = {
        borderLeftColor: computed.borderLeftColor,
        borderLeftWidth: computed.borderLeftWidth,
        filter: el.style.filter || "",
      };
    }

    if (!isSelected) {
      el.style.borderLeftColor = heightOriginal.borderLeftColor || DEFAULT_COLOR;
      el.style.borderLeftWidth = heightOriginal.borderLeftWidth;
      el.style.filter = heightOriginal.filter || "";
      return;
    }

    el.style.borderLeftColor = HIGHLIGHT_COLOR;
    const currentPx = parseFloat(computed.borderLeftWidth || "0");
    if (Number.isFinite(currentPx) && currentPx > 0) {
      el.style.borderLeftWidth = `${currentPx * (6 / 4)}px`;
    }
    el.style.filter = GLOW_FILTER;
  };

  const setHeightLineCorrect = () => {
    const el = getHeightLineEl();
    if (!el) return;

    const computed = window.getComputedStyle(el);
    if (!heightOriginal) {
      heightOriginal = {
        borderLeftColor: computed.borderLeftColor,
        borderLeftWidth: computed.borderLeftWidth,
        filter: el.style.filter || "",
      };
    }

    el.style.borderLeftColor = CORRECT_COLOR;
    el.style.filter =
      "drop-shadow(0 0 6px rgba(0,170,0,0.85)) drop-shadow(0 0 14px rgba(0,170,0,0.5))";
  };

  const applyHighlight = (key, isSelected) => {
    if (key === "height") {
      setHeightLineSelected(isSelected);
      return;
    }
    setQuadSideSelected(key, isSelected);
  };

  const setInteractivityEnabled = (enabled) => {
    const ids = ["AB", "BC", "CD", "DA", "height"].map(
      (k) => `page7-clickable-${k}`
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.pointerEvents = enabled ? "auto" : "none";
      el.style.cursor = enabled ? "pointer" : "default";
    });

    const heightLine = getHeightLineEl();
    if (heightLine) {
      heightLine.style.pointerEvents = enabled ? "auto" : "none";
      heightLine.style.cursor = enabled ? "pointer" : "default";
    }

    const checkBtn = document.querySelector(".page7-check-button");
    if (checkBtn) {
      if (enabled) {
        checkBtn.classList.remove("disabled");
        checkBtn.style.opacity = "";
        checkBtn.style.pointerEvents = "auto";
      } else {
        checkBtn.classList.add("disabled");
        checkBtn.style.opacity = "0.5";
        checkBtn.style.pointerEvents = "none";
      }
    }
  };

  const updateFeedback = (text, mode) => {
    window.page7FeedbackState = { text, mode };
    window.dispatchEvent(
      new CustomEvent("page7FeedbackUpdate", {
        detail: { text, mode },
      })
    );
  };

  const playAnswerFeedbackSound = (isCorrect) => {
    if (typeof window === "undefined") return;

    if (typeof window.playCarClickSound === "function") {
      window.playCarClickSound(isCorrect ? "correct" : "wrong");
      return;
    }

    if (typeof window.playAnswerSound === "function") {
      window.playAnswerSound(isCorrect);
    }
  };

  const dispatchQuizCompleted = () => {
    const enableNextEvent = new CustomEvent("quizCompleted", {
      detail: {
        quizId: QUIZ_ID,
        pageNumber:
          typeof window.getCurrentPage === "function"
            ? window.getCurrentPage() || PAGE_NUMBER
            : PAGE_NUMBER,
      },
    });

    window.dispatchEvent(enableNextEvent);
  };

  const toggle = (key) => {
    if (state.locked) return;
    if (state.selected.has(key)) {
      state.selected.delete(key);
      applyHighlight(key, false);
      updateFeedback("", "normal");
      return;
    }
    if (state.selected.size >= MAX_SELECTED) {
      updateFeedback(
        "Two lines are already selected. Deselect one to pick another.",
        "incorrect"
      );
      return;
    }
    state.selected.add(key);
    applyHighlight(key, true);
    updateFeedback("", "normal");
  };

  const check = () => {
    if (state.locked) return;
    const sel = Array.from(state.selected).sort();
    const correct = CORRECT_ANSWER.slice().sort();
    if (sel.length !== correct.length) {
      playAnswerFeedbackSound(false);
      updateFeedback(
        `Select ${MAX_SELECTED} lines before checking.`,
        "incorrect"
      );
      return;
    }
    const isCorrect = sel.every((k, i) => k === correct[i]);
    if (isCorrect) {
      state.locked = true;
      state.selected.forEach((k) => {
        if (k === "height") setHeightLineCorrect();
        else setQuadSideCorrect(k);
      });
      setInteractivityEnabled(false);
      playAnswerFeedbackSound(true);
      dispatchQuizCompleted();
      updateFeedback(
        "Correct! The height is perpendicular to the bottom side.",
        "correct"
      );
    } else {
      playAnswerFeedbackSound(false);
      updateFeedback(
        "Not quite. Try selecting the bottom side and the height.",
        "incorrect"
      );
    }
  };

  const reset = () => {
    state.selected.forEach((k) => applyHighlight(k, false));
    state.selected.clear();
    state.locked = false;
    setInteractivityEnabled(true);
    updateFeedback("", "normal");
  };

  window.addEventListener("pageStateReset", reset);
  window.addEventListener("globalPageReset", reset);

  window.page7Lines = { toggle, check, reset, CORRECT_ANSWER };
})();

// ===== PAGE 4/5 PERMANENT LINE HIGHLIGHT =====
// Keep the bottom side (CD) and the height line green on these pages.
(function initAreaPagesPermanentLineHighlights() {
  if (typeof window === "undefined") return;

  window.areaPagesPermanentLineHighlightsInitialized =
    window.areaPagesPermanentLineHighlightsInitialized || {};

  const initPageHighlight = (pageNumber) => {
    if (window.areaPagesPermanentLineHighlightsInitialized[pageNumber]) return;
    window.areaPagesPermanentLineHighlightsInitialized[pageNumber] = true;

    const CORRECT_COLOR = "var(--color-green-dark)";
    const GLOW_FILTER =
      "drop-shadow(0 0 6px rgba(0,170,0,0.85)) drop-shadow(0 0 14px rgba(0,170,0,0.5))";
    const sideOriginal = new Map();
    let heightOriginal = null;

    const getQuadSidesSvg = () => {
      const quadRoot = document.getElementById(`page${pageNumber}-shape-display`);
      if (!quadRoot) return null;
      const svgs = Array.from(quadRoot.querySelectorAll("svg"));
      return (
        svgs.find((svg) => svg.querySelectorAll("line").length >= 4) || null
      );
    };

    const getQuadSideLineEl = (sideIndex) => {
      const svg = getQuadSidesSvg();
      if (!svg) return null;
      const lines = svg.querySelectorAll("line");
      return lines[sideIndex] || null;
    };

    const getHeightLineEl = () => {
      const byComputedId = document.getElementById(
        `page${pageNumber}-height-line-${pageNumber}`
      );
      if (byComputedId) return byComputedId;
      return document.querySelector(
        `[data-element-name="page${pageNumber}-height-line"][data-page="${pageNumber}"]`
      );
    };

    const setBottomBaseCorrect = () => {
      const line = getQuadSideLineEl(2);
      if (!line) return;

      if (!sideOriginal.has("CD")) {
        sideOriginal.set("CD", {
          stroke: line.getAttribute("stroke"),
          strokeWidth: line.getAttribute("stroke-width"),
          filter: line.style.filter || "",
        });
      }

      line.setAttribute("stroke", CORRECT_COLOR);
      line.style.filter = GLOW_FILTER;
    };

    const setHeightCorrect = () => {
      const el = getHeightLineEl();
      if (!el) return;

      const computed = window.getComputedStyle(el);
      if (!heightOriginal) {
        heightOriginal = {
          borderLeftColor: computed.borderLeftColor,
          borderLeftWidth: computed.borderLeftWidth,
          filter: el.style.filter || "",
        };
      }

      el.style.borderLeftColor = CORRECT_COLOR;
      el.style.filter = GLOW_FILTER;
    };

    const applyPermanentHighlights = () => {
      setBottomBaseCorrect();
      setHeightCorrect();
    };

    const scheduleApplyPermanentHighlights = () => {
      setTimeout(applyPermanentHighlights, 0);
      setTimeout(applyPermanentHighlights, 100);
    };

    scheduleApplyPermanentHighlights();

    window.addEventListener("quizCompleted", (event) => {
      if (event.detail?.pageNumber !== pageNumber) return;
      scheduleApplyPermanentHighlights();
    });

    window.addEventListener("pageChanged", (event) => {
      if (event.detail?.page !== pageNumber) return;
      scheduleApplyPermanentHighlights();
    });

    window.addEventListener("pageStateReset", (event) => {
      if (event.detail?.page && event.detail.page !== pageNumber) return;
      scheduleApplyPermanentHighlights();
    });

    window.addEventListener("globalPageReset", () => {
      scheduleApplyPermanentHighlights();
    });
  };

  initPageHighlight(4);
  initPageHighlight(5);
  initPageHighlight(8);
  initPageHighlight(9);
})();

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
        `📄 [Navigation] ${direction} - Dispatched page change event to page ${targetPage}`
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

  // Helper function for i18n text – no hardcoded strings; all text from data.js (en/id)
  const getI18nText = (key, fallback, params = {}) => {
    if (typeof fallback === "object" && fallback !== null && !Array.isArray(fallback)) {
      params = fallback;
      fallback = undefined;
    }
    const value = typeof i18n !== "undefined" ? i18n.t(key, params) : (fallback !== undefined ? fallback : key);
    return value;
  };

  const questionBottomY = 150;
  const questionTextSize = '44gc';

  // Return optimized GridPositionPages
  return {
    1: [
      // Title: "Properties of a Parallelogram" in bright orange, centered at top
      {
        id: "page1-title",
        name: "page1-title",
        coordinates: [25, 100, 1575, 200],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.title"),
          fontSize: "60gc",
          color: "#FF9900", // Bright orange
          textAlign: "center",
          fontWeight: "bold",
        },
      },

      // Main explanatory text: "Let's explore the side, angle, and diagonal properties of a parallelogram."
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [200, 300, 1400, 450],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.mainText"),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },

      // Instruction text: "Tap "Start" to start the activity."
      {
        id: "page1-instruction-text",
        name: "page1-instruction-text",
        coordinates: [200, 500, 1400, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instructionText"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Start button - Orange with gradient, centered at bottom (same style as page 7 Start Over button)
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 700, 950, 800],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start"),
          fontSize: "42gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "2px solid #FFAA00", // Lighter orange border
          textAlign: "center",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
      {
        id: "page1-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 740, 720, 840],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },
    ],

    2: [
      // Header - Orange text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page2-left-column",
        name: "page2-left-column",
        coordinates: [5, 105, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },





      // Instruction text
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.instruction"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      //9 units
      {
        id: "page2-diag-length-9-units",
        name: "diag-length-9-units",
        type: "textbox",
        coordinates: [690, 150, 940, 170],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page2-diag-length-7-units",
        name: "diag-length-7-units",
        type: "textbox",
        coordinates: [460, 310, 620, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //4 units
      {
        id: "page2-diag-length-4-units",
        name: "diag-length-4-units",
        type: "textbox",
        coordinates: [640, 310, 800, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.fourUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page2-diag-length-7-units-2",
        name: "diag-length-7-units-2",
        type: "textbox",
        coordinates: [1000, 310, 1160, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //9 units
      {
        id: "page2-diag-length-9-units-2",
        name: "diag-length-9-units-2",
        type: "textbox",
        coordinates: [650, 520, 900, 540],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page2-shape-display",
          name: "page2-shape-display",
          type: "custom",
          coordinates: [470, 5, 1245, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 0, col: 7.2 },//top
              { row: 0, col: 22.2 },//right
              { row: 12.4, col: 17.8 },//bottom
              { row: 12.4, col: 2.8 }//left
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),

      {
        id: "page2-height-line",
        name: "page2-height-line",
        type: "line",
        coordinates: [655, 198, 655, 520],
        zIndex: 950,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "dashed",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page2-right-angle-top",
        name: "page2-right-angle-top",
        type: "line",
        coordinates: [656, 480, 686, 480],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page2-right-angle-side",
        name: "page2-right-angle-side",
        type: "line",
        coordinates: [686, 480, 686, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },



      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page2-build-coordinates",
      //   name: "build-coordinates",
      //   type: "custom",
      //   coordinates: [750, 50, 1400, 600],
      //   zIndex: 40,
      //   props: {
      //     componentType: "QuadrilateralComponent",
      //     mode: "build", // Enable build mode
      //     quadType: "SQUARE",
      //     vertices: [
      //       { row: 3, col: 3 },
      //       { row: 3, col: 6 },
      //       { row: 6, col: 6 },
      //       { row: 6, col: 3 }
      //     ],
      //     gridRows: 10,
      //     gridCols: 10,
      //     showGrid: true,
      //     showDiagonals: false,
      //     draggable: true,
      //     edgeColor: "#CC6600",
      //     edgeThickness: "4gc",
      //     vertexConfig: {
      //       color: "#FF9900",
      //       showLabels: true,
      //       labels: ["A", "B", "C", "D"],
      //       labelColor: "#000000",
      //       labelSize: "16gc",
      //       labelOffset: "15gc"
      //     },
      //     angleConfig: {
      //       show: "all",
      //       markerColor: "#FF6600",
      //       markerSize: "1gc",
      //       showText: true,
      //       textColor: "#FF6600",
      //       textSize: "12gc"
      //     },
      //     buildConfig: {
      //       targetType: "coordinates", // Match exact coordinates
      //       targetVertices: [
      //         { row: 2, col: 1 },
      //         { row: 2, col: 9 },
      //         { row: 8, col: 9 },
      //         { row: 8, col: 1 }
      //       ],
      //       showTargetWireframe: true,
      //       wireframeColor: "#8800FF",
      //       wireframeThickness: "2gc",
      //       blinkWireframe: false,
      //       highlightTargetVertices: true,
      //       targetVertexColor: "#8800FF",
      //       targetVertexSize: "12gc",
      //       tolerance: 1, // Allow 1 grid cell tolerance
      //       showSuccessMessage: true,
      //       successMessage: "Excellent! You matched the target shape!",
      //       successAnimation: true,
      //       onTargetAchieved: (data) => {
      //         console.log("🎯 Coordinates matched!", data);
      //       }
      //     }
      //   }
      // },

      // Instructions Text Box (commented out)
      // {
      //   id: "page2-instruction-1",
      //   name: "page2-instruction-1",
      //   coordinates: [50, 620, 700, 700],
      //   zIndex: 100,
      //   type: "textbox",
      //   props: {
      //     text: "Shape Challenge: Drag the vertices to make a RECTANGLE",
      //     fontSize: "16gc",
      //     color: "#000000",
      //     textAlign: "center",
      //     backgroundColor: "rgba(0, 170, 0, 0.1)",
      //     padding: "10gc"
      //   }
      // },

      // Instruction Text Box for second quadrilateral (commented out - second quad is disabled)
      // {
      //   id: "page2-instruction-2",
      //   name: "page2-instruction-2",
      //   coordinates: [750, 620, 1400, 700],
      //   zIndex: 100,
      //   type: "textbox",
      //   props: {
      //     text: "Position Challenge: Match the purple wireframe exactly (±1 grid cell)",
      //     fontSize: "16gc",
      //     color: "#000000",
      //     textAlign: "center",
      //     backgroundColor: "rgba(136, 0, 255, 0.1)",
      //     padding: "10gc"
      //   }
      // },

      // Display Controls for second quadrilateral
      // {
      //   id: "page2-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page2-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

      // Navigation buttons
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
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

      {
        id: "page2-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

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

      // {
      //   id: "page2-page-title",
      //   name: "page2-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],

    3: [
      // Header - Orange text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page3-left-column",
        name: "page3-left-column",
        coordinates: [5, 105, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },






      //9 units
      {
        id: "page3-diag-length-9-units",
        name: "diag-length-9-units",
        type: "textbox",
        coordinates: [690, 150, 940, 170],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page3-diag-length-7-units",
        name: "diag-length-7-units",
        type: "textbox",
        coordinates: [460, 310, 620, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //4 units
      {
        id: "page3-diag-length-4-units",
        name: "diag-length-4-units",
        type: "textbox",
        coordinates: [640, 310, 800, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.fourUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page3-diag-length-7-units-2",
        name: "diag-length-7-units-2",
        type: "textbox",
        coordinates: [1000, 310, 1160, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //9 units
      {
        id: "page3-diag-length-9-units-2",
        name: "diag-length-9-units-2",
        type: "textbox",
        coordinates: [650, 520, 900, 540],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page3-shape-display",
          name: "page3-shape-display",
          type: "custom",
          coordinates: [470, 5, 1245, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 0, col: 7.2 },//top
              { row: 0, col: 22.2 },//right
              { row: 12.4, col: 17.8 },//bottom
              { row: 12.4, col: 2.8 }//left
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),

      // Check button (right of the shape) - same style as page 1 Start button
      {
        id: "page3-check-button",
        name: "start-button",
        type: "button",
        coordinates: [1260, 403, 1560, 503],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.check"),
          fontSize: "42gc",
          color: "#000000",
          backgroundColor: "#FF9900",
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "2px solid #FFAA00",
          textAlign: "center",
          className: "start-button-container page3-check-button",
          contentClassName: "applet-button-content",
          onClick: () => {
            if (typeof window === "undefined") return;

            if (window.page3Lines && typeof window.page3Lines.check === "function") {
              window.page3Lines.check();
            }
          },
        },
      },

      // Tap GIF alongside the Check button
      {
        id: "page3-check-tap",
        name: "page3-check-tap",
        type: "custom",
        coordinates: [1260, 443, 1330, 543],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      // Feedback box (below the shape)
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox",
        type: "custom",
        coordinates: [470, 660, 1245, 790],
        zIndex: 1000,
        props: {
          componentType: "FeedbackTextboxComponent",
          text: "",
          mode: "normal",
          fontSize: "32gc",
          padding: "14gc",
          textAlign: "center",
        },
      },

      {
        id: "page3-height-line",
        name: "page3-height-line",
        type: "line",
        coordinates: [655, 198, 655, 520],
        zIndex: 950,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "dashed",
          backgroundColor: "transparent",
          cursor: "pointer",
          onClick: () => {
            if (window.page3Lines) window.page3Lines.toggle("height");
          }
        }
      },

      // ===== Clickable hotspots for the 4 sides + height =====
      // Top side AB
      {
        id: "page3-clickable-AB",
        name: "page3-clickable-AB",
        type: "textbox",
        coordinates: [660, 195, 1040, 202],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          onClick: () => {
            if (window.page3Lines) window.page3Lines.toggle("AB");
          },
        },
      },
      // Bottom side CD
      {
        id: "page3-clickable-CD",
        name: "page3-clickable-CD",
        type: "textbox",
        coordinates: [545, 515, 930, 522],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          onClick: () => {
            if (window.page3Lines) window.page3Lines.toggle("CD");
          },
        },
      },
      // Left side DA (slanted – bounding box)
      {
        id: "page3-clickable-DA",
        name: "page3-clickable-DA",
        type: "textbox",
        coordinates: [595, 190, 602, 530],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(20deg)", // Rotate to match the slant of the DA side
          onClick: () => {
            if (window.page3Lines) window.page3Lines.toggle("DA");
          },
        },
      },
      // Right side BC (slanted – bounding box)
      {
        id: "page3-clickable-BC",
        name: "page3-clickable-BC",
        type: "textbox",
        coordinates: [984, 190, 991, 530],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(20deg)", // Rotate to match the slant of the DA side

          onClick: () => {
            if (window.page3Lines) window.page3Lines.toggle("BC");
          },
        },
      },
      // Height line (narrow, sits on top of DA hotspot so middle clicks target height)
      {
        id: "page3-clickable-height",
        name: "page3-clickable-height",
        type: "textbox",
        coordinates: [630, 190, 680, 535],
        zIndex: 1060,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "6gc",
          cursor: "pointer",
          onClick: () => {
            if (window.page3Lines) window.page3Lines.toggle("height");
          },
        },
      },

      {
        id: "page3-right-angle-top",
        name: "page3-right-angle-top",
        type: "line",
        coordinates: [656, 480, 686, 480],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page3-right-angle-side",
        name: "page3-right-angle-side",
        type: "line",
        coordinates: [686, 480, 686, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },



      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page3-instruction-text',
          text: getI18nText(
            'pages.page3.instruction',
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

      // Navigation buttons
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for specific page
          get text() {
            return getI18nText("buttons.next");
          },
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

      {
        id: "page3-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false, // Hidden until quiz is completed
        },
      },

      {
        id: "page3-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
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


    ],
    4: [
      // Header - Orange text
      {
        id: "page4-header",
        name: "page4-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page4-left-column",
        name: "page4-left-column",
        coordinates: [5, 105, 1120, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //9 units
      {
        id: "page4-diag-length-9-units",
        name: "diag-length-9-units",
        type: "textbox",
        coordinates: [390, 150, 640, 170],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page4-diag-length-7-units",
        name: "diag-length-7-units",
        type: "textbox",
        coordinates: [160, 310, 320, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //4 units
      {
        id: "page4-diag-length-4-units",
        name: "diag-length-4-units",
        type: "textbox",
        coordinates: [340, 310, 500, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.fourUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page4-diag-length-7-units-2",
        name: "diag-length-7-units-2",
        type: "textbox",
        coordinates: [700, 310, 860, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //9 units
      {
        id: "page4-diag-length-9-units-2",
        name: "diag-length-9-units-2",
        type: "textbox",
        coordinates: [350, 520, 600, 540],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page4-shape-display",
          name: "page4-shape-display",
          type: "custom",
          coordinates: [170, 5, 945, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 0, col: 7.2 },//top
              { row: 0, col: 22.2 },//right
              { row: 12.4, col: 17.8 },//bottom
              { row: 12.4, col: 2.8 }//left
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),
      {
        id: "page4-clickable-CD",
        name: "page4-clickable-CD",
        type: "textbox",
        coordinates: [620, 500, 920, 545],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "6gc",
        },
      },
      {
        id: "page4-height-line",
        name: "page4-height-line",
        type: "line",
        coordinates: [355, 198, 355, 520],
        zIndex: 950,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "dashed",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page4-right-angle-top",
        name: "page4-right-angle-top",
        type: "line",
        coordinates: [356, 480, 386, 480],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page4-right-angle-side",
        name: "page4-right-angle-side",
        type: "line",
        coordinates: [386, 480, 386, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },
      //area of parallelogram
      {
        id: "page4-area-text",
        name: "page4-area-text",
        type: "textbox",
        coordinates: [50, 630, 600, 680],
        zIndex: 1000,
        props: {
          text: getI18nText("pages.page4.messageBox"),
          fontSize: "40gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //numpad
      {
        id: "page4-number-pad",
        name: "page4-number-pad",
        type: "number-pad-panel",
        coordinates: [1130, 105, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "rgb(0,0,0,0.6)",
          borderRadius: "15gc",
          border: "2px solid orange",
          padding: "20gc",
          disableInputs: true, // Set true to disable number pad buttons and the check button
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page4-feedback-textbox')
          destinations: [

            {
              destinationId: "page4-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "840",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page4.numpad.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page4.numpad.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page4.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "show 💡",
          },

          numberButtons: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "45gc",
            fontWeight: "bold",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "CHECK",
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: ""          // Default text to display in feedback area
          }
        },
      },
      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page4-instruction-text',
          text: getI18nText(
            'pages.page4.instruction',
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

      // Navigation buttons
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page
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

      {
        id: "page4-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

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
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[4];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page4-page-title",
      //   name: "page4-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    5: [
      // Header - Orange text
      {
        id: "page5-header",
        name: "page5-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page5-left-column",
        name: "page5-left-column",
        coordinates: [5, 105, 1120, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //9 units
      {
        id: "page5-diag-length-9-units",
        name: "diag-length-9-units",
        type: "textbox",
        coordinates: [390, 150, 640, 170],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page5-diag-length-7-units",
        name: "diag-length-7-units",
        type: "textbox",
        coordinates: [160, 310, 320, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //4 units
      {
        id: "page5-diag-length-4-units",
        name: "diag-length-4-units",
        type: "textbox",
        coordinates: [340, 310, 500, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.fourUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //7 units
      {
        id: "page5-diag-length-7-units-2",
        name: "diag-length-7-units-2",
        type: "textbox",
        coordinates: [700, 310, 860, 330],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.sevenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //9 units
      {
        id: "page5-diag-length-9-units-2",
        name: "diag-length-9-units-2",
        type: "textbox",
        coordinates: [350, 520, 600, 540],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramOneUnits.nineUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page5-shape-display",
          name: "page5-shape-display",
          type: "custom",
          coordinates: [170, 5, 945, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 0, col: 7.2 },//top
              { row: 0, col: 22.2 },//right
              { row: 12.4, col: 17.8 },//bottom
              { row: 12.4, col: 2.8 }//left
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),

      {
        id: "page5-height-line",
        name: "page5-height-line",
        type: "line",
        coordinates: [355, 198, 355, 520],
        zIndex: 950,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "dashed",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page5-right-angle-top",
        name: "page5-right-angle-top",
        type: "line",
        coordinates: [356, 480, 386, 480],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page5-right-angle-side",
        name: "page5-right-angle-side",
        type: "line",
        coordinates: [386, 480, 386, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },
      //area of parallelogram
      {
        id: "page5-area-text",
        name: "page5-area-text",
        type: "textbox",
        coordinates: [50, 630, 650, 680],
        zIndex: 1000,
        props: {
          text: getI18nText("pages.page5.messageBox"),
          fontSize: "40gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //tile component -3
      {
        id: "page5-tile-1",
        name: "page5-tile-1",
        type: "tile",
        coordinates: [655, 620, 760, 690], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "focus", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFEB3B", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "40gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //sq units text
      {
        id: "page5-sq-units-text",
        name: "page5-sq-units-text",
        type: "textbox",
        coordinates: [780, 630, 950, 680],
        zIndex: 1000,
        props: {
          text: getI18nText("sqUnits"),
          fontSize: "40gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //numpad
      {
        id: "page5-number-pad",
        name: "page5-number-pad",
        type: "number-pad-panel",
        coordinates: [1130, 105, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "rgb(0,0,0,0.6)",
          borderRadius: "15gc",
          border: "2px solid orange",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page5-feedback-textbox')
          destinations: [

            {
              destinationId: "page5-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "36",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page5.numpad.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page5.numpad.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page5.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "show 💡",
          },

          numberButtons: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "45gc",
            fontWeight: "bold",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "CHECK",
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: ""          // Default text to display in feedback area
          }
        },
      },
      // Instruction Text
      {
        id: 'page5-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page5-instruction-text',
          text: getI18nText(
            'pages.page5.instruction',
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

      // Navigation buttons
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page5-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        },
      },

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
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[5];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page5-page-title",
      //   name: "page5-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    6: [
      // Header - Orange text
      {
        id: "page6-header",
        name: "page6-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page6-left-column",
        name: "page6-left-column",
        coordinates: [5, 105, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },





      // Instruction text
      {
        id: "page6-instruction",
        name: "page6-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.instruction"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      //12 units top
      {
        id: "page6-top-length-12-units",
        name: "top-length-12-units",
        type: "textbox",
        coordinates: [635, 160, 900, 180],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units left
      {
        id: "page6-left-length-10-units",
        name: "left-length-10-units",
        type: "textbox",
        coordinates: [400, 330, 600, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6 units center
      {
        id: "page6-height-length-6-units",
        name: "height-length-6-units",
        type: "textbox",
        coordinates: [765, 345, 965, 365],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.sixUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units right
      {
        id: "page6-right-length-10-units",
        name: "right-length-10-units",
        type: "textbox",
        coordinates: [990, 330, 1190, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 units bottom
      {
        id: "page6-bottom-length-12-units",
        name: "bottom-length-12-units",
        type: "textbox",
        coordinates: [700, 525, 970, 575],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page6-shape-display",
          name: "page6-shape-display",
          type: "custom",
          coordinates: [470, 5, 1245, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 1.0, col: 3.6 },
              { row: 1.0, col: 18.2 },
              { row: 12.4, col: 22.4 },
              { row: 12.4, col: 7.8 }
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),



      {
        id: "page6-height-line",
        name: "page6-height-line",
        type: "line",
        coordinates: [936, 223, 936, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#ffff",
          borderStyle: "dashed",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page6-right-angle-top",
        name: "page6-right-angle-top",
        type: "line",
        coordinates: [900, 470, 939, 470],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page6-right-angle-side",
        name: "page6-right-angle-side",
        type: "line",
        coordinates: [900, 470, 900, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },


      // Navigation buttons
      {
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[6];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page6-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

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
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[6];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page6-page-title",
      //   name: "page6-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    7: [
      // Header - Orange text
      {
        id: "page7-header",
        name: "page7-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page7-left-column",
        name: "page7-left-column",
        coordinates: [5, 105, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },






      //12 units top
      {
        id: "page7-top-length-12-units",
        name: "top-length-12-units",
        type: "textbox",
        coordinates: [635, 160, 900, 180],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units left
      {
        id: "page7-left-length-10-units",
        name: "left-length-10-units",
        type: "textbox",
        coordinates: [400, 330, 600, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6 units center
      {
        id: "page7-height-length-6-units",
        name: "height-length-6-units",
        type: "textbox",
        coordinates: [765, 345, 965, 365],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.sixUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units right
      {
        id: "page7-right-length-10-units",
        name: "right-length-10-units",
        type: "textbox",
        coordinates: [990, 330, 1190, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 units bottom
      {
        id: "page7-bottom-length-12-units",
        name: "bottom-length-12-units",
        type: "textbox",
        coordinates: [700, 525, 970, 575],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page7-shape-display",
          name: "page7-shape-display",
          type: "custom",
          coordinates: [470, 5, 1245, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 1.0, col: 3.6 },
              { row: 1.0, col: 18.2 },
              { row: 12.4, col: 22.4 },
              { row: 12.4, col: 7.8 }
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),

      // Check button (right of the shape) - same style as page 3
      {
        id: "page7-check-button",
        name: "start-button",
        type: "button",
        coordinates: [1260, 403, 1560, 503],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.check"),
          fontSize: "42gc",
          color: "#000000",
          backgroundColor: "#FF9900",
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "2px solid #FFAA00",
          textAlign: "center",
          className: "start-button-container page7-check-button",
          contentClassName: "applet-button-content",
          onClick: () => {
            if (typeof window === "undefined") return;

            if (window.page7Lines && typeof window.page7Lines.check === "function") {
              window.page7Lines.check();
            }
          },
        },
      },

      // Tap GIF alongside the Check button
      {
        id: "page7-check-tap",
        name: "page7-check-tap",
        type: "custom",
        coordinates: [1260, 443, 1330, 543],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      // Feedback box (below the shape)
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox",
        type: "custom",
        coordinates: [470, 660, 1245, 790],
        zIndex: 1000,
        props: {
          componentType: "FeedbackTextboxComponent",
          text: "",
          mode: "normal",
          fontSize: "32gc",
          padding: "14gc",
          textAlign: "center",
        },
      },



      {
        id: "page7-height-line",
        name: "page7-height-line",
        type: "line",
        coordinates: [936, 223, 936, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#ffff",
          borderStyle: "dashed",
          backgroundColor: "transparent",
          cursor: "pointer",
          onClick: () => {
            if (window.page7Lines) window.page7Lines.toggle("height");
          }
        }
      },

      // ===== Clickable hotspots for the 4 sides + height =====
      // Top side AB
      {
        id: "page7-clickable-AB",
        name: "page7-clickable-AB",
        type: "textbox",
        coordinates: [565, 220, 940, 227],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          onClick: () => {
            if (window.page7Lines) window.page7Lines.toggle("AB");
          },
        },
      },
      // Bottom side CD
      {
        id: "page7-clickable-CD",
        name: "page7-clickable-CD",
        type: "textbox",
        coordinates: [675, 515, 1045, 522],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          onClick: () => {
            if (window.page7Lines) window.page7Lines.toggle("CD");
          },
        },
      },
      // Left side DA (slanted – bounding box)
      {
        id: "page7-clickable-DA",
        name: "page7-clickable-DA",
        type: "textbox",
        coordinates: [613, 215, 620, 530],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(-20deg)", // Rotate to match the slant of the side
          onClick: () => {
            if (window.page7Lines) window.page7Lines.toggle("DA");
          },
        },
      },
      // Right side BC (slanted – bounding box)
      {
        id: "page7-clickable-BC",
        name: "page7-clickable-BC",
        type: "textbox",
        coordinates: [992, 215, 1000, 530],
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(-20deg)", // Rotate to match the slant of the side

          onClick: () => {
            if (window.page7Lines) window.page7Lines.toggle("BC");
          },
        },
      },
      // Height line (narrow hotspot centered on dashed height)
      {
        id: "page7-clickable-height",
        name: "page7-clickable-height",
        type: "textbox",
        coordinates: [910, 210, 960, 535],
        zIndex: 1060,
        props: {
          text: "",
          backgroundColor: "transparent",
          borderRadius: "6gc",
          cursor: "pointer",
          onClick: () => {
            if (window.page7Lines) window.page7Lines.toggle("height");
          },
        },
      },

      {
        id: "page7-right-angle-top",
        name: "page7-right-angle-top",
        type: "line",
        coordinates: [900, 470, 939, 470],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page7-right-angle-side",
        name: "page7-right-angle-side",
        type: "line",
        coordinates: [900, 470, 900, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },
      // Instruction Text
      {
        id: 'page7-instruction-text',
        name: 'page7-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page7-instruction-text',
          text: getI18nText(
            'pages.page7.instruction',
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


      // Navigation buttons
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 7 },
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[7];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page7-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false,
        },
      },

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
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[7];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page7-page-title",
      //   name: "page7-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    8: [
      // Header - Orange text
      {
        id: "page8-header",
        name: "page8-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page8-left-column",
        name: "page8-left-column",
        coordinates: [5, 105, 1120, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //12 units top
      {
        id: "page8-top-length-12-units",
        name: "top-length-12-units",
        type: "textbox",
        coordinates: [335, 160, 600, 180],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units left
      {
        id: "page8-left-length-10-units",
        name: "left-length-10-units",
        type: "textbox",
        coordinates: [100, 330, 300, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6 units center
      {
        id: "page8-height-length-6-units",
        name: "height-length-6-units",
        type: "textbox",
        coordinates: [465, 345, 665, 365],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.sixUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units right
      {
        id: "page8-right-length-10-units",
        name: "right-length-10-units",
        type: "textbox",
        coordinates: [690, 330, 890, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 units bottom
      {
        id: "page8-bottom-length-12-units",
        name: "bottom-length-12-units",
        type: "textbox",
        coordinates: [400, 525, 670, 575],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page8-shape-display",
          name: "page8-shape-display",
          type: "custom",
          coordinates: [170, 5, 945, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 1.0, col: 3.6 },
              { row: 1.0, col: 18.2 },
              { row: 12.4, col: 22.4 },
              { row: 12.4, col: 7.8 }
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),



      {
        id: "page8-height-line",
        name: "page8-height-line",
        type: "line",
        coordinates: [636, 223, 636, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#ffff",
          borderStyle: "dashed",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page8-right-angle-top",
        name: "page8-right-angle-top",
        type: "line",
        coordinates: [600, 470, 639, 470],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page8-right-angle-side",
        name: "page8-right-angle-side",
        type: "line",
        coordinates: [600, 470, 600, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },
      //area of parallelogram
      {
        id: "page8-area-text",
        name: "page8-area-text",
        type: "textbox",
        coordinates: [50, 630, 650, 680],
        zIndex: 1000,
        props: {
          text: getI18nText("pages.page8.messageBox"),
          fontSize: "40gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //numpad
      {
        id: "page8-number-pad",
        name: "page8-number-pad",
        type: "number-pad-panel",
        coordinates: [1130, 105, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "rgb(0,0,0,0.6)",
          borderRadius: "15gc",
          border: "2px solid orange",
          padding: "20gc",
          disableInputs: true, // Set true to disable number pad buttons and the check button
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page8-feedback-textbox')
          destinations: [

            {
              destinationId: "page8-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "840",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page8.numpad.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page8.numpad.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page8.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "show 💡",
          },

          numberButtons: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "45gc",
            fontWeight: "bold",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "CHECK",
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: ""          // Default text to display in feedback area
          }
        },
      },
      // Instruction Text
      {
        id: 'page8-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page8-instruction-text',
          text: getI18nText(
            'pages.page8.instruction',
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

      // Navigation buttons
      {
        id: "page8-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: true, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[8];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page8-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: true
        },
      },

      {
        id: "page8-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[8];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page8-page-title",
      //   name: "page8-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    9: [
      // Header - Orange text
      {
        id: "page9-header",
        name: "page9-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.headerText"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page9-left-column",
        name: "page9-left-column",
        coordinates: [5, 105, 1120, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },
      //12 units top
      {
        id: "page9-top-length-12-units",
        name: "top-length-12-units",
        type: "textbox",
        coordinates: [335, 160, 600, 180],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units left
      {
        id: "page9-left-length-10-units",
        name: "left-length-10-units",
        type: "textbox",
        coordinates: [100, 330, 300, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6 units center
      {
        id: "page9-height-length-6-units",
        name: "height-length-6-units",
        type: "textbox",
        coordinates: [465, 345, 665, 365],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.sixUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //10 units right
      {
        id: "page9-right-length-10-units",
        name: "right-length-10-units",
        type: "textbox",
        coordinates: [690, 330, 890, 380],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.tenUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 units bottom
      {
        id: "page9-bottom-length-12-units",
        name: "bottom-length-12-units",
        type: "textbox",
        coordinates: [400, 525, 670, 575],
        zIndex: 1000,
        props: {
          text: getI18nText("parallelogramTwoUnits.twelveUnits"),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page9-shape-display",
          name: "page9-shape-display",
          type: "custom",
          coordinates: [170, 5, 945, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "PARALLELOGRAM", // Match the slanted quadrilateral shown in the reference
            vertices: [
              { row: 1.0, col: 3.6 },
              { row: 1.0, col: 18.2 },
              { row: 12.4, col: 22.4 },
              { row: 12.4, col: 7.8 }
            ], // Parallelogram-style outline to match the pasted reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#8E7CC3", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: false, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            }
          }
        };
      })(),



      {
        id: "page9-height-line",
        name: "page9-height-line",
        type: "line",
        coordinates: [636, 223, 636, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#ffff",
          borderStyle: "dashed",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page9-right-angle-top",
        name: "page9-right-angle-top",
        type: "line",
        coordinates: [600, 470, 639, 470],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },

      {
        id: "page9-right-angle-side",
        name: "page9-right-angle-side",
        type: "line",
        coordinates: [600, 470, 600, 520],
        zIndex: 960,
        props: {
          componentType: "LineComponent",
          lineType: "vertical",
          lineSubtype: "line",
          borderWidth: "4gc",
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          backgroundColor: "transparent"
        }
      },
      //area of parallelogram
      {
        id: "page9-area-text",
        name: "page9-area-text",
        type: "textbox",
        coordinates: [50, 630, 680, 680],
        zIndex: 1000,
        props: {
          text: getI18nText("pages.page9.messageBox"),
          fontSize: "40gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //tile component -3
      {
        id: "page9-tile-1",
        name: "page9-tile-1",
        type: "tile",
        coordinates: [685, 620, 790, 690], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 60,
        props: {
          mode: "focus", // Visual focus mode by default
          text: "", // Empty blank tile - will be filled by number pad
          // Match TileComponent "focus" mode colors for consistency
          backgroundColor: "#FFEB3B", // yellow focus background
          borderColor: "#FFFFFF", // white border
          borderWidth: "3gc",
          borderStyle: "solid",
          borderRadius: "10gc",
          color: "#000000", // black text in focus
          fontSize: "40gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //sq units text
      {
        id: "page9-sq-units-text",
        name: "page9-sq-units-text",
        type: "textbox",
        coordinates: [810, 630, 980, 680],
        zIndex: 1000,
        props: {
          text: getI18nText("sqUnits"),
          fontSize: "40gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //numpad
      {
        id: "page9-number-pad",
        name: "page9-number-pad",
        type: "number-pad-panel",
        coordinates: [1130, 105, 1595, 800],
        zIndex: 57,
        props: {
          backgroundColor: "rgb(0,0,0,0.6)",
          borderRadius: "15gc",
          border: "2px solid orange",
          padding: "20gc",
          layout: "vertical", // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2, // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true, // Enable click sound for number pad buttons (default: true)
          inputMode: "append", // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999, // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: "feedback", // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page9-feedback-textbox')
          destinations: [

            {
              destinationId: "page9-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "72",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page9.numpad.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page9.numpad.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page9.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ], // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0, // Current index in destinations array (starts at 0)
          feedbackRowHeight: "40%", // Height percentage for feedback text area
          buttonGridHeight: "50%", // Height percentage for number pad grid
          checkButtonHeight: "10%", // Height percentage for check button

          showButton: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "show 💡",
          },

          numberButtons: {
            backgroundColor: "#FFD700",
            color: "#000000",
            fontSize: "45gc",
            fontWeight: "bold",
            buttonWidthPercent: "90%", // Width percentage of grid cell
            buttonHeightPercent: "90%", // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: "#FF8C00",
            color: "#000000",
            fontSize: "35gc",
            fontWeight: "bold",
            text: "CHECK",
          },
          feedbackTextArea: {
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: '32gc',         // Feedback text size (increased by 20% from 25gc)
            fontWeight: 'bold',
            borderRadius: '8gc',
            border: '2px dashed #ffffff',
            padding: '10gc',
            textAlign: 'center',
            display: 'flex',
            height: '60gc',
            defaultText: ""          // Default text to display in feedback area
          }
        },
      },
      // Instruction Text
      {
        id: 'page9-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page9-instruction-text',
          text: getI18nText(
            'pages.page9.instruction',
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

      // Navigation buttons
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 9 }, // Only enable for specific page
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[9];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page9-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false
        },
      },

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
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[9];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },


    ],
    10: [
      // Title: "Properties of a Parallelogram" in bright orange, centered at top
      {
        id: "page10-title",
        name: "page10-title",
        coordinates: [25, 100, 1575, 200],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.title"),
          fontSize: "60gc",
          color: "#FF9900", // Bright orange
          textAlign: "center",
          fontWeight: "bold",
        },
      },

      // Main explanatory text: "Let's explore the side, angle, and diagonal properties of a parallelogram."
      {
        id: "page10-main-text",
        name: "page10-main-text",
        coordinates: [200, 300, 1400, 450],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.mainText"),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },

      // Instruction text: "Tap "Start" to start the activity."
      {
        id: "page10-instruction-text",
        name: "page10-instruction-text",
        coordinates: [200, 500, 1400, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.instructionText"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Start button - Orange with gradient, centered at bottom (same style as page 7 Start Over button)
      {
        id: "page10-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 700, 950, 800],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.startOver"),
          fontSize: "42gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "2px solid #FFAA00", // Lighter orange border
          textAlign: "center",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[10];
            if (nav && nav.next) {
              window.location.reload();
            }
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
      {
        id: "page10-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 740, 720, 840],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all states for a page when it loads
 * This ensures clean state on every page navigation
 * @param {number} pageNumber - Page to reset
 * @param {Object} options - { skipDispatch: true } to skip pageStateReset/globalPageReset (use when landing on target page so sequence can start)
 */
const resetPageStates = (pageNumber, options = {}) => {
  if (typeof window === 'undefined') return;
  const skipDispatch = options.skipDispatch === true;

  console.log(`🔄 Resetting all states for page ${pageNumber}` + (skipDispatch ? ' (skipDispatch: sequence can start)' : ''));

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
    // Message boxes with initial static text (like page2-messagebox) should be preserved
    if (typeof document !== 'undefined') {
      const messageBoxes = document.querySelectorAll('[id*="-messagebox"]');
      messageBoxes.forEach(box => {
        const boxId = box.id;
        // Only clear message boxes that are meant to be dynamically updated
        // These are message boxes that start with empty text in PageConfig (e.g., page3-messagebox, page4-messagebox, etc.)
        // Preserve message boxes with initial static text (e.g., page2-messagebox)
        if (boxId && (boxId.includes('page3-') || boxId.includes('page4-') || boxId.includes('page5-') || boxId.includes('page6-'))) {
          // These message boxes are meant to be dynamically updated, so clear them
          if (box.textContent) {
            box.textContent = '';
          }
          if (box.innerHTML) {
            box.innerHTML = '';
          }
        }
        // For other message boxes (like page2-messagebox), preserve their content
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
        // Prevent external reset from overriding TapGifComponent internal initialVisible behavior
        if (tap.dataset?.elementType === 'tap-gif') {
          return;
        }
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

    // 8. Reset all components with IDs matching the page pattern (e.g., page3-*)
    if (typeof document !== 'undefined') {
      // Find all elements with IDs matching the page pattern
      const pageElements = document.querySelectorAll(`[id^="page${pageNumber}-"]`);
      pageElements.forEach(element => {
        // Remove any dynamically added content
        const dynamicElements = element.querySelectorAll('[data-dynamic="true"], [data-description-index]');
        dynamicElements.forEach(el => el.remove());

        // Reset any inline styles that might have been modified
        if (element.style) {
          // Reset transform, opacity, etc. but keep positioning
          element.style.transform = '';
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

    console.log(`✅ All states reset for page ${pageNumber}`);
  } catch (error) {
    console.error(`❌ Error resetting page states:`, error);
  }
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
    console.log("✅ Page state reset handler registered");

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
          const { currentIndex } = getCurrentQuestionData();
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
              // Log as info instead of warning - element might not exist by design
              console.log(`ℹ️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries (this may be expected if element is optional)`);
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
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          // Only attempt update if source element exists (optional feature)
          const sourceElement = document.getElementById('page2-map-table-R1C1');
          if (sourceElement) {
            window.updateTargetIDText('page2-map-table-R1C1', 'page2-number-pad');
          } else {
            // Silently skip if table doesn't exist (this is optional functionality)
            console.log('ℹ️ [PageConfig] Table cell page2-map-table-R1C1 not found, skipping number pad update');
          }
        }
      });
    }

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

