/**
 * Page Configuration
 *
 * - Grid positioning and element generation
 * - Page-specific UI element configurations
 * - Question-dependent element updates
 */

// Ensure page 7 and page 11 default state is protractor as soon as this script runs
if (typeof window !== "undefined") {
  window.page7PartState = window.page7PartState || "protractor";
  window.page11PartState = window.page11PartState || "protractor";
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
      // Title: "Measuring Angles using Protractor" in orange/gold, centered at top
      {
        id: "page1-title",
        name: "page1-title",
        coordinates: [25, 80, 1575, 180],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.title"),
          fontSize: "56gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Protractor container: white bg 30% opacity, white dashed border
      {
        id: "page1-protractor-container",
        name: "page1-protractor-container",
        coordinates: [25, 200, 750, 650],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      // Protractor component (centered in the dashed container)
      {
        id: "page1-protractor",
        name: "page1-protractor",
        type: "custom",
        coordinates: [350, 575, 370, 625],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          appearance: {
            protractorType: "semicircular",
            radius: "275gc",
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
            labelFontSize: "18gc",
            tickLabelGap: "20gc",
            showSecondaryLabels: true,
            primarySecondaryLabelGap: "30gc",
            secondaryLabelColor: "#1919FF",
            showLabelToSemicircleLines: true, // toggle: true = lines from labels to center semicircle, false = hide
            labelToSemicircleLineGap: "15gc",  // gap between line end and label (line stops short of label)
            showSecondaryLabelToSemicircleLines: true, // lines at in-between angles (e.g. 5, 15, 25Ã‚Â° when labelInterval 10)
            secondaryLabelToSemicircleLineGap: "45gc",  // gap for outer end of secondary lines
            primarySemicircleToSemicircleLineGap: "5gc",   // gap between primary line inner end and center semicircle
            secondarySemicircleToSemicircleLineGap: "55gc", // gap between secondary line inner end and center semicircle
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
            protractorRotation: 0,
            mode: "interactive",
            isDraggable: false,
            showRotationRing: false,
          },
          measurementArm: {
            show: false,
            color: "#FFB347",
            angle: 50,
            style: "solid",
            extendable: true,
            rotatable: false,
            angleDisplay: { show: false, size: "24gc" },
          },
        },
      },
      // Right column: main text (white, one text box, center-aligned, vertically middle)
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [760, 220, 1520, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.mainText"),
          allowHTML: true,
          fontSize: "38gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          whiteSpace: "pre-line",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      // Start button - Orange/gold, 3D style, centered below content
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 700, 950, 810],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start"),
          fontSize: "32gc",
          color: "#ffffff",
          backgroundColor: "#FFA500",
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "none",
          boxShadow: "0 4px 0 0 rgba(200,120,0,0.6)",
          textAlign: "center",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
          className: "start-button-container page1-start-button",
          contentClassName: "applet-button-content",
        },
      },
      // Tap gif near Start button (100gc left of original, 65% opacity)
      {
        id: "page1-tap-gif",
        name: "page1-tap-gif",
        type: "custom",
        coordinates: [870, 715, 940, 785],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
        },
      },
    ],

    2: [
      // Title: same structure as page 3
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.title", "Drawing an ANGLE using PROTRACTOR"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page2-intro",
        name: "page2-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.introText", "Now, it's your turn to draw 60°"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page2-protractor-container",
        name: "page2-protractor-container",
        coordinates: [650, 275, 1550, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page2-protractor",
        name: "page2-protractor",
        type: "custom",
        coordinates: [905, 540, 925, 590],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor") ? 0 : 1; },
          get syncRotationFromConfig() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawBase" || s === "bringProtractor"; },
          persistRotationKey: "page2ProtractorRotation",
          snapPoint: [1100, 675],
          snapTolerance: 60,
          snapRotationAngle: 330,
          snapRotationTolerance: 10,
          onAnimateToReady: (animateTo) => { if (typeof window !== "undefined") window.page2ProtractorAnimateTo = animateTo; },
          onAnimateToComplete: () => { if (typeof window !== "undefined" && typeof window.page2OnAnimateToComplete === "function") window.page2OnAnimateToComplete(); },
          onAnimateRotationReady: (animateRotation) => { if (typeof window !== "undefined") window.page2ProtractorAnimateRotation = animateRotation; },
          onAnimateRotationComplete: () => { if (typeof window !== "undefined" && typeof window.page2OnRotationComplete === "function") window.page2OnRotationComplete(); },
          onAnimateArmReady: (animateArmTo) => { if (typeof window !== "undefined") window.page2ProtractorAnimateArmTo = animateArmTo; },
          onAnimateArmComplete: () => { if (typeof window !== "undefined" && typeof window.page2OnAnimateArmComplete === "function") window.page2OnAnimateArmComplete(); },
          get freezeArmCircleAtMarkedPosition() { return (typeof window !== "undefined" && (window.page2PartState === "drawArm" || window.page2PartState === "complete")); },
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
          },
          measurementArm: {
            get show() { return (typeof window !== "undefined" && (window.page2PartState === "markAngle" || window.page2PartState === "drawArm" || window.page2PartState === "complete")); },
            showArmLine: false,
            length: "110gc",
            thickness: "4gc",
            color: "blue",
            circleSize: "10gc",
            circleBorderColor: "white",
            circleBorderThickness: "4gc",
            angle: 0,
            style: "solid",
            extendable: false,
            rotatable: false,
            angleDisplay: { show: false, size: "30gc", paddingX: "40gc", paddingY: "30gc", background: "rgba(255, 165, 0, 0.65)", color: "black", gap: "25gc" },
          },
        },
      },
      {
        id: "page2-arrow-line",
        name: "page2-arrow-line",
        type: "custom",
        coordinates: [1095, 670, 1450, 670],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          revealFromLeft: true,
          get revealTrigger() { return (typeof window !== "undefined" && window.page2ArrowLineRevealStart) || false; },
          revealDuration: 2000,
          onRevealComplete: () => {
            if (typeof window !== "undefined") {
              window.page2PartState = "bringProtractor";
              window.dispatchEvent(new CustomEvent("page2PartStateChanged", { detail: { state: "bringProtractor" } }));
              window.forceAppUpdate?.();
            }
          },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawBase" ? 0 : 1; },
        },
      },
      {
        id: "page2-arrow-line-white",
        name: "page2-arrow-line-white",
        type: "custom",
        coordinates: [1095, 670, 1150, 364],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          revealFromLeft: true,
          get revealTrigger() { return (typeof window !== "undefined" && window.page2ArrowLineWhiteRevealStart) || false; },
          revealDuration: 2000,
          onRevealComplete: () => {
            if (typeof window !== "undefined") {
              window.page2PartState = "complete";
              window.dispatchEvent(new CustomEvent("page2PartStateChanged", { detail: { state: "complete" } }));
              window.dispatchEvent(new CustomEvent("quizCompleted", { detail: { pageNumber: 2 } }));
              window.forceAppUpdate?.();
            }
          },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; const reveal = (typeof window !== "undefined" && window.page2ArrowLineWhiteRevealStart) || false; return (s === "complete" || reveal) ? 1 : 0; },
        },
      },
      {
        id: "page2-button-draw-base",
        name: "page2-button-draw-base",
        type: "textbox",
        coordinates: [50, 300, 600, 375],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonDrawBase", "drawBase"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawBase" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page2LastClickedButtonId === "page2-button-draw-base"); return s !== "drawBase" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawBase" ? 1 : 0.5; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawBase"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page2PartState === "drawBase") {
              window.page2LastClickedButtonId = "page2-button-draw-base";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page2ArrowLineRevealStart = true;
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page2-button-bring-protractor",
        name: "page2-button-bring-protractor",
        type: "textbox",
        coordinates: [50, 394, 600, 469],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonBringProtractor", "bringProtractor"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "bringProtractor" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page2LastClickedButtonId === "page2-button-bring-protractor"); return s !== "bringProtractor" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "bringProtractor" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawBase" ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "bringProtractor"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page2PartState === "bringProtractor") {
              window.page2LastClickedButtonId = "page2-button-bring-protractor";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page2PartState = "alignVertex";
              window.dispatchEvent(new CustomEvent("page2PartStateChanged", { detail: { state: "alignVertex" } }));
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page2-button-align-vertex",
        name: "page2-button-align-vertex",
        type: "textbox",
        coordinates: [50, 488, 600, 563],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonAlignVertex", "alignVertex"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "alignVertex" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page2LastClickedButtonId === "page2-button-align-vertex"); return s !== "alignVertex" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "alignVertex" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor") ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "alignVertex"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page2PartState === "alignVertex") {
              window.page2LastClickedButtonId = "page2-button-align-vertex";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page2OnAnimateToComplete = () => {
                window.page2PartState = "markAngle";
                window.dispatchEvent(new CustomEvent("page2PartStateChanged", { detail: { state: "markAngle" } }));
                window.forceAppUpdate?.();
                window.page2OnAnimateToComplete = null;
              };
              if (typeof window.page2ProtractorAnimateTo === "function") {
                window.page2ProtractorAnimateTo([1100, 675], 2000);
              } else {
                if (window.page2OnAnimateToComplete) window.page2OnAnimateToComplete();
              }
            }
          },
        },
      },
      {
        id: "page2-button-align-base",
        name: "page2-button-align-base",
        type: "textbox",
        coordinates: [50, 581, 600, 656],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonMarkAngle", "markAngle"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "markAngle" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page2LastClickedButtonId === "page2-button-align-base"); return s !== "markAngle" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "markAngle" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor" || s === "alignVertex") ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "markAngle"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page2PartState === "markAngle") {
              window.page2LastClickedButtonId = "page2-button-align-base";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              window.page2OnAnimateArmComplete = () => {
                window.page2PartState = "drawArm";
                window.dispatchEvent(new CustomEvent("page2PartStateChanged", { detail: { state: "drawArm" } }));
                window.forceAppUpdate?.();
                window.page2OnAnimateArmComplete = null;
              };
              if (typeof window.page2ProtractorAnimateArmTo === "function") {
                window.page2ProtractorAnimateArmTo(80, 2000);
              } else {
                if (window.page2OnAnimateArmComplete) window.page2OnAnimateArmComplete();
              }
            }
          },
        },
      },
      {
        id: "page2-button-align-second-arm",
        name: "page2-button-align-second-arm",
        type: "textbox",
        coordinates: [50, 675, 600, 750],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonDrawArm", "drawArm"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawArm" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page2LastClickedButtonId === "page2-button-align-second-arm"); return s !== "drawArm" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawArm" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor" || s === "alignVertex" || s === "markAngle") ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "drawArm"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page2PartState === "drawArm") {
              window.page2LastClickedButtonId = "page2-button-align-second-arm";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              const postAnimationsDelayMs = 500;
              let drawArmMoveDone = false;
              let drawArmRotationDone = false;
              const maybeStartWhiteLineReveal = () => {
                if (!drawArmMoveDone || !drawArmRotationDone) return;
                setTimeout(() => {
                  window.page2ArrowLineWhiteRevealStart = true;
                  window.forceAppUpdate?.();
                }, postAnimationsDelayMs);
              };
              window.page2OnAnimateToComplete = () => {
                window.page2OnAnimateToComplete = null;
                drawArmMoveDone = true;
                maybeStartWhiteLineReveal();
              };
              window.page2OnRotationComplete = () => {
                window.page2OnRotationComplete = null;
                drawArmRotationDone = true;
                maybeStartWhiteLineReveal();
              };
              if (typeof window.page2ProtractorAnimateRotation === "function") {
                window.page2ProtractorAnimateRotation(280, 4000);
              } else {
                drawArmRotationDone = true;
                maybeStartWhiteLineReveal();
              }
              if (typeof window.page2ProtractorAnimateTo === "function") {
                window.page2ProtractorAnimateTo([1060, 675], 1000);
              } else {
                drawArmMoveDone = true;
                maybeStartWhiteLineReveal();
              }
            }
          },
        },
      },
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() { return (typeof window !== "undefined" && window.page2PartState === "complete") ? getI18nText("pages.page2.instructionTapToSummarize") : getI18nText("pages.page3.instruction"); },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          get cursor() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "complete" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s !== "complete"; },
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "complete" ? 1 : 0.5; },
          onClick: () => {
            const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase";
            if (s !== "complete") return;
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
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          get opacity() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "complete" ? 0.65 : 0; },
          get display() { const s = (typeof window !== "undefined" && window.page2PartState) || "drawBase"; return s === "complete" ? "" : "none"; },
          scale: 0.7,
        },
      },
      {
        id: "page2-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
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
    ],

    3: [
      // Title: "Drawing an ANGLE using PROTRACTOR" (gold-orange, centered)
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.title", "Drawing an ANGLE using PROTRACTOR"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      // Intro text (center-aligned)
      {
        id: "page3-intro",
        name: "page3-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.introText", "Now, it's your turn to draw 60°"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Protractor container: white bg 30% opacity, white dashed border (exact replica of page 2)
      {
        id: "page3-protractor-container",
        name: "page3-protractor-container",
        coordinates: [650, 275, 1550, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      // Protractor component: hidden when state = protractor, visible otherwise
      {
        id: "page3-protractor",
        name: "page3-protractor",
        type: "custom",
        coordinates: [905, 540, 925, 590],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,  // Initial rotation in degrees (protractor appears rotated by this angle)
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor") ? 0 : 1; },
          get syncRotationFromConfig() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawBase" || s === "bringProtractor"; }, // Only sync rotation from config in initial states; keep user-animated rotation after align steps
          persistRotationKey: "page3ProtractorRotation", // Persist rotation so it survives remounts when state changes to drawArm
          snapPoint: [1100, 675],
          snapTolerance: 60,
          snapRotationAngle: 330,
          snapRotationTolerance: 10,
          onSnapToPoint: () => {
            if (typeof window !== "undefined" && window.page3PartState === "alignVertex") {
              window.page3PartState = "markAngle";
              window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "markAngle" } }));
              window.forceAppUpdate?.();
            }
          },
          onAnimateToReady: (animateTo) => { if (typeof window !== "undefined") window.page3ProtractorAnimateTo = animateTo; },
          onAnimateToComplete: () => { if (typeof window !== "undefined" && typeof window.page3OnAnimateToComplete === "function") window.page3OnAnimateToComplete(); },
          onAnimateRotationReady: (animateRotation) => { if (typeof window !== "undefined") window.page3ProtractorAnimateRotation = animateRotation; },
          onAnimateRotationComplete: () => { if (typeof window !== "undefined" && typeof window.page3OnRotationComplete === "function") window.page3OnRotationComplete(); },
          onAnimateArmReady: (animateArmTo) => { if (typeof window !== "undefined") window.page3ProtractorAnimateArmTo = animateArmTo; },
          onAnimateArmComplete: () => { if (typeof window !== "undefined" && typeof window.page3OnAnimateArmComplete === "function") window.page3OnAnimateArmComplete(); },
          get freezeArmCircleAtMarkedPosition() { return (typeof window !== "undefined" && (window.page3PartState === "drawArm" || window.page3PartState === "complete")); },
          onArmSnapToAngle: () => {
            if (typeof window !== "undefined" && window.page3PartState === "markAngle") {
              window.page3PartState = "drawArm";
              window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "drawArm" } }));
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
            protractorRotation: 25,  // Matches defaultRotation so protractor appears rotated by 25°
            mode: "interactive",
            get isDraggable() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s !== "markAngle" && s !== "drawArm" && s !== "complete"; },
            showRotationRing: false,
          },
          measurementArm: {
            get show() { return (typeof window !== "undefined" && (window.page3PartState === "markAngle" || window.page3PartState === "drawArm" || window.page3PartState === "complete")); }, // Show arm from markAngle onward
            showArmLine: false,  // false = hide arm line only, circle remains visible
            length: "110gc",   // Arm length (e.g. 'auto', '180gc', or number in viewBox units)
            thickness: "4gc",  // Arm line thickness (e.g. '5gc', '6gc')
            color: "blue",
            circleSize: "10gc",           // Radius of circle at arm end in gc
            circleBorderColor: "white",   // Border color of the circle at arm end
            circleBorderThickness: "4gc",  // Border thickness in gc
            angle: 0,
            style: "solid",
            extendable: false,
            snapAngle: 60,              // Arm snaps to 60° when within tolerance
            snapTolerance: 5,           // degrees
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",   // X padding around angle label
              paddingY: "30gc",  // Y padding around angle label
              background: "rgba(255, 165, 0, 0.65)",  // Orange 50% opacity
              color: "black",
              gap: "25gc",      // Gap between circle and angle label (null = 5% of arm length)
            },
          },
        },
      },
      // Orange arrow line (horizontal; hidden when drawBase, reveals left-to-right when drawBase clicked)
      {
        id: "page3-arrow-line",
        name: "page3-arrow-line",
        type: "custom",
        coordinates: [1095, 670, 1450, 670],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          revealFromLeft: true,
          get revealTrigger() { return (typeof window !== "undefined" && window.page3ArrowLineRevealStart) || false; },
          revealDuration: 2000,
          onRevealComplete: () => {
            if (typeof window !== "undefined") {
              window.page3PartState = "bringProtractor";
              window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "bringProtractor" } }));
              window.forceAppUpdate?.();
            }
          },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawBase" ? 0 : 1; },
        },
      },
      // White arrow line (slanted) - reveals left-to-right when drawArm clicked, visible when state = complete
      {
        id: "page3-arrow-line-white",
        name: "page3-arrow-line-white",
        type: "custom",
        coordinates: [1095, 670, 1275, 364],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          revealFromLeft: true,
          get revealTrigger() { return (typeof window !== "undefined" && window.page3ArrowLineWhiteRevealStart) || false; },
          revealDuration: 2000,
          onRevealComplete: () => {
            if (typeof window !== "undefined") {
              window.page3PartState = "complete";
              window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "complete" } }));
              window.dispatchEvent(new CustomEvent("quizCompleted", { detail: { pageNumber: 3 } }));
              window.forceAppUpdate?.();
            }
          },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; const reveal = (typeof window !== "undefined" && window.page3ArrowLineWhiteRevealStart) || false; return (s === "complete" || reveal) ? 1 : 0; },
        },
      },
      // Left panel: 5 part buttons – drawBase → bringProtractor → alignVertex → markAngle → drawArm
      {
        id: "page3-button-draw-base",
        name: "page3-button-draw-base",
        type: "textbox",
        coordinates: [50, 300, 600, 375],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonDrawBase", "drawBase"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawBase" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-draw-base"); return s !== "drawBase" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawBase" ? 1 : 0.5; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawBase"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "drawBase") {
              window.page3LastClickedButtonId = "page3-button-draw-base";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Start arrow line reveal (left-to-right, 2000ms); state changes to bringProtractor on complete
              window.page3ArrowLineRevealStart = true;
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page3-button-bring-protractor",
        name: "page3-button-bring-protractor",
        type: "textbox",
        coordinates: [50, 394, 600, 469],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonBringProtractor", "bringProtractor"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "bringProtractor" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-bring-protractor"); return s !== "bringProtractor" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "bringProtractor" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawBase" ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "bringProtractor"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "bringProtractor") {
              window.page3LastClickedButtonId = "page3-button-bring-protractor";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Unhide protractor (opacity is 1 when state !== "bringProtractor") and move to alignVertex
              window.page3PartState = "alignVertex";
              window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "alignVertex" } }));
              window.forceAppUpdate?.();
            }
          },
        },
      },
      {
        id: "page3-button-align-vertex",
        name: "page3-button-align-vertex",
        type: "textbox",
        coordinates: [50, 488, 600, 563],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonAlignVertex", "alignVertex"),
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
          get cursor() { return "default"; },
          get disabled() { return true; },
          get pointerEvents() { return "none"; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "alignVertex" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor") ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "alignVertex"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "alignVertex") {
              window.page3LastClickedButtonId = "page3-button-align-vertex";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Change state only after movement animation completes
              window.page3OnAnimateToComplete = () => {
                window.page3PartState = "markAngle";
                window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "markAngle" } }));
                window.forceAppUpdate?.();
                window.page3OnAnimateToComplete = null;
              };
              if (typeof window.page3ProtractorAnimateTo === "function") {
                window.page3ProtractorAnimateTo([1100, 675], 2000); // Move protractor center to line intersection
              } else {
                if (window.page3OnAnimateToComplete) window.page3OnAnimateToComplete();
              }
            }
          },
        },
      },
      {
        id: "page3-button-align-base",
        name: "page3-button-align-base",
        type: "textbox",
        coordinates: [50, 581, 600, 656],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonMarkAngle", "markAngle"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "markAngle" ? "default" : "not-allowed"; },
          get disabled() { return true; },  // markAngle button is not clickable; user must drag arm to 60° to advance
          get pointerEvents() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "markAngle" ? "none" : "auto"; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "markAngle" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor" || s === "alignVertex") ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "markAngle"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "markAngle") {
              window.page3LastClickedButtonId = "page3-button-align-base";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Animate measurement arm to 80° over 2000ms; when done, change state to drawArm
              window.page3OnAnimateArmComplete = () => {
                window.page3PartState = "drawArm";
                window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "drawArm" } }));
                window.forceAppUpdate?.();
                window.page3OnAnimateArmComplete = null;
              };
              if (typeof window.page3ProtractorAnimateArmTo === "function") {
                window.page3ProtractorAnimateArmTo(80, 2000);
              } else {
                if (window.page3OnAnimateArmComplete) window.page3OnAnimateArmComplete();
              }
            }
          },
        },
      },
      {
        id: "page3-button-align-second-arm",
        name: "page3-button-align-second-arm",
        type: "textbox",
        coordinates: [50, 675, 600, 750],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page3.buttonDrawArm", "drawArm"),
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawArm" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-align-second-arm"); return s !== "drawArm" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawArm" ? 1 : 0.5; },
          get display() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return (s === "drawBase" || s === "bringProtractor" || s === "alignVertex" || s === "markAngle") ? "none" : ""; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "drawArm"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "drawArm") {
              // 1. Disable drawArm button
              window.page3LastClickedButtonId = "page3-button-align-second-arm";
              // 2. Force UI re-render
              window.forceAppUpdate?.();
              // 3. Play click sound
              if (window.playCarClickSound) window.playCarClickSound("click");
              // 4. Rotate protractor to 300° over 4000ms
              // 5. Move protractor to [1060, 675] in 1000ms
              // 6. White line reveal starts 500ms after BOTH move and rotation finish (whichever is last)
              const postAnimationsDelayMs = 500;
              let drawArmMoveDone = false;
              let drawArmRotationDone = false;
              const maybeStartWhiteLineReveal = () => {
                if (!drawArmMoveDone || !drawArmRotationDone) return;
                setTimeout(() => {
                  window.page3ArrowLineWhiteRevealStart = true;
                  window.forceAppUpdate?.();
                }, postAnimationsDelayMs);
              };
              window.page3OnAnimateToComplete = () => {
                window.page3OnAnimateToComplete = null;
                drawArmMoveDone = true;
                maybeStartWhiteLineReveal();
              };
              window.page3OnRotationComplete = () => {
                window.page3OnRotationComplete = null;
                drawArmRotationDone = true;
                maybeStartWhiteLineReveal();
              };
              if (typeof window.page3ProtractorAnimateRotation === "function") {
                window.page3ProtractorAnimateRotation(300, 4000);
              } else {
                drawArmRotationDone = true;
                maybeStartWhiteLineReveal();
              }
              if (typeof window.page3ProtractorAnimateTo === "function") {
                window.page3ProtractorAnimateTo([1060, 675], 1000);
              } else {
                drawArmMoveDone = true;
                maybeStartWhiteLineReveal();
              }
              // 6. White line reveal (2000ms) starts when page3ArrowLineWhiteRevealStart is set
              // 7. After reveal, onRevealComplete → state complete, events dispatched, UI updated
            }
          },
        },
      },

      // Footer instruction (center) - same as page 2; on quiz completion show "Tap '»' to summarize"
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase";
            if (s === "complete") return getI18nText("pages.page3.instructionTapToSummarize");
            if (s === "alignVertex") return getI18nText("pages.page3.instructionAlignVertexDrag", "Drag the protractor to align and then tap '»'");
            if (s === "markAngle") return getI18nText("pages.page3.instructionMarkAngle", "Drag the blue mark along the protractor to mark 60 deg");
            return getI18nText("pages.page3.instruction");
          },
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },

      // Navigation buttons
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "complete" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s !== "complete"; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "complete" ? 1 : 0.5; },
          onClick: () => {
            const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase";
            if (s !== "complete") return;
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
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "complete" ? 0.65 : 0; },
          get display() { const s = (typeof window !== "undefined" && window.page3PartState) || "drawBase"; return s === "complete" ? "" : "none"; },
          scale: 0.7,
        },
      },

      {
        id: "page3-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
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
      // Exact replica of page 3 (complete state) – no buttons, no state logic
      {
        id: "page4-header",
        name: "page4-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.title", "Drawing an ANGLE using PROTRACTOR"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      {
        id: "page4-intro",
        name: "page4-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.introText", "Hurarm!!! We have drawn an angle of 60°."),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      {
        id: "page4-protractor-container",
        name: "page4-protractor-container",
        coordinates: [350, 275, 1250, 775],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "4gc",
          borderStyle: "dashed",
          borderColor: "white",
          borderRadius: "12gc",
          boxSizing: "border-box",
        },
      },
      {
        id: "page4-arrow-line",
        name: "page4-arrow-line",
        type: "custom",
        coordinates: [665, 665, 1020, 665],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "horizontal",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "orange",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          opacity: 1,
        },
      },
      {
        id: "page4-angle-arc",
        name: "page4-angle-arc",
        type: "custom",
        coordinates: [665, 565, 765, 665],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "AngleArcComponent",
          angle: 60,
          label: "60°",
          color: "orange",
          labelColor: "white",
          arcRadius: "80gc",
          strokeWidth: "4gc",
          fillColor: "orange",
          fillOpacity: 0.4,
          fontSize: "36gc",
          labelOffsetX: 50,
          labelOffsetY: 0,
        },
      },
      {
        id: "page4-arrow-line-white",
        name: "page4-arrow-line-white",
        type: "custom",
        coordinates: [665, 665, 845, 359],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "LineComponent",
          lineType: "slanted",
          lineSubtype: "arrow",
          borderWidth: "10gc",
          borderColor: "white",
          borderStyle: "solid",
          arrowheadSize: "20gc",
          opacity: 1,
        },
      },
      {
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.instructionTapToSummarize", "Tap '»' to summarize"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      {
        id: "page4-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.previous"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("previous");
            const nav = pageNavigation[4];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.next"); },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            const nav = pageNavigation[4];
            if (nav && nav.next) navigateToPage(nav.next, "next");
          },
        },
      },
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
          scale: 0.7,
        },
      },
    ],

    5: [
      // Page 5: exact replica of page 13
      {
        id: "page5-title",
        name: "page5-title",
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
        id: "page5-protractor-container",
        name: "page5-protractor-container",
        coordinates: [25, 220, 750, 700],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "4gc",
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
        coordinates: [355, 590, 375, 640],
        zIndex: "var(--z-button)",
        props: {
          componentType: "ProtractorComponent",
          defaultRotation: 0,
          opacity: 1,
          syncRotationFromConfig: false,
          persistRotationKey: "page5ProtractorRotation",
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
          },
          measurementArm: {
            show: true,
            length: "125gc",
            thickness: "4gc",
            color: "red",
            angle: 60,
            style: "solid",
            extendable: false,
            rotatable: false,
            angleDisplay: {
              show: false,
              size: "30gc",
              paddingX: "40gc",
              paddingY: "30gc",
              background: "rgba(255, 165, 0, 0.65)",
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
        id: "page5-arrow-line-white",
        name: "page5-arrow-line-white",
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
          transform: "rotate(351deg)",
        },
      },
      {
        id: "page5-info-box",
        name: "page5-info-box",
        coordinates: [770, 120, 1550, 800],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.infoText"),
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
        id: "page5-instruction",
        name: "page5-instruction",
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
        id: "page5-previous-button",
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
            const nav = pageNavigation[5];
            if (nav && nav.prev) navigateToPage(nav.prev, "previous");
          },
        },
      },
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 903],
        zIndex: "var(--z-button)",
        props: {
          get text() { return getI18nText("buttons.startOver"); },
          fontSize: "28gc",
          allowHTML: true,
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) window.playCarClickSound("next");
            resetAllStatesForStartOver();
            navigateToPage(1, "startOver");
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
          scale: 0.75,
        },
      },
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all global part states and variables for "Start Over" (navigate to page 1 from page 13).
 * Restores page 3, 5, 7, 11 part states to "protractor" and clears protractor rotation / last-clicked state.
 */
const resetAllStatesForStartOver = () => {
  if (typeof window === 'undefined') return;
  window.page2PartState = "drawBase";
  delete window.page2ProtractorRotation;
  delete window.page2LastClickedButtonId;
  delete window.page2ArrowLineRevealStart;
  window.page2ArrowLineRevealStart = false;
  delete window.page2ArrowLineWhiteRevealStart;
  window.page2ArrowLineWhiteRevealStart = false;
  window.page3PartState = "drawBase";
  delete window.page3ProtractorRotation;
  delete window.page3LastClickedButtonId;
  delete window.page3ArrowLineRevealStart;
  window.page3ArrowLineRevealStart = false;
  delete window.page3ArrowLineWhiteRevealStart;
  window.page3ArrowLineWhiteRevealStart = false;
  window.page3ScaleAnimationStarted = false;
  window.page3ClockwiseButtonClicked = false;
  window.page3ClockwiseAnimationStarted = false;
  window.page3AnticlockwiseButtonClicked = false;
  window.page3AnticlockwiseAnimationStarted = false;
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

    // 7a. Reset page 2 part state (same flow as page 3, own state vars)
    if (pageNumber === 2 && typeof window !== 'undefined') {
      window.page2PartState = 'drawBase';
      delete window.page2ProtractorRotation;
      delete window.page2LastClickedButtonId;
      delete window.page2ArrowLineRevealStart;
      window.page2ArrowLineRevealStart = false;
      delete window.page2ArrowLineWhiteRevealStart;
      window.page2ArrowLineWhiteRevealStart = false;
    }

    // 7b. Reset page 3 part state (drawBase, bringProtractor, alignVertex, markAngle, drawArm, complete)
    if (pageNumber === 3 && typeof window !== 'undefined') {
      window.page3PartState = 'drawBase';
      delete window.page3ProtractorRotation; // so protractor uses defaultRotation (330) on next mount
      delete window.page3LastClickedButtonId;
      delete window.page3ArrowLineRevealStart;
      window.page3ArrowLineRevealStart = false;
      delete window.page3ArrowLineWhiteRevealStart;
      window.page3ArrowLineWhiteRevealStart = false;
      window.page3ScaleAnimationStarted = false;
      window.page3ClockwiseButtonClicked = false;
      window.page3ClockwiseAnimationStarted = false;
      window.page3AnticlockwiseButtonClicked = false;
      window.page3AnticlockwiseAnimationStarted = false;
    }

    // 7c. Reset page 5 part state (own copy of page 3 flow)
    if (pageNumber === 5 && typeof window !== 'undefined') {
      window.page5PartState = 'protractor';
      delete window.page5ProtractorRotation;
      delete window.page5LastClickedButtonId;
    }

    // 7d. Reset page 7 part state (replica of page 5 with own state)
    if (pageNumber === 7 && typeof window !== 'undefined') {
      window.page7PartState = 'protractor';
      delete window.page7ProtractorRotation;
      delete window.page7LastClickedButtonId;
    }

    // 7e. Reset page 11 part state (replica of page 7 with own state)
    if (pageNumber === 11 && typeof window !== 'undefined') {
      window.page11PartState = 'protractor';
      delete window.page11ProtractorRotation;
      delete window.page11LastClickedButtonId;
    }

    // 8. Reset all components with IDs matching the page pattern (e.g., page3-*)
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
    // Page 2 part state: same flow as page 3, own state vars
    const isStartingOnPage2 = window.APP_CONFIG && parseInt(window.APP_CONFIG.START_PAGE, 10) === 2;
    const page2CurrentState = window.page2PartState;
    const page2PreserveState = !isStartingOnPage2 && page2CurrentState && page2CurrentState !== 'drawBase';
    if (!page2PreserveState) {
      window.page2PartState = "drawBase";
      delete window.page2ProtractorRotation;
      delete window.page2LastClickedButtonId;
      delete window.page2ArrowLineRevealStart;
      window.page2ArrowLineRevealStart = false;
      delete window.page2ArrowLineWhiteRevealStart;
      window.page2ArrowLineWhiteRevealStart = false;
    }

    // Page 3 part state: default is 'drawBase' (button 1 active)
    // ALWAYS reset to drawBase if starting directly on page 3 via START_PAGE
    const isStartingOnPage3 = window.APP_CONFIG && parseInt(window.APP_CONFIG.START_PAGE, 10) === 3;
    const currentState = window.page3PartState;
    const preserveState = !isStartingOnPage3 && currentState && currentState !== 'drawBase';
    console.log('[PageConfig] initializePageConfig - page3 state check:', { currentState, preserveState, isStartingOnPage3, page3ProtractorRotation: window.page3ProtractorRotation });
    if (!preserveState) {
      window.page3PartState = "drawBase";
      delete window.page3ProtractorRotation;
      delete window.page3LastClickedButtonId;
      delete window.page3ArrowLineRevealStart;
      window.page3ArrowLineRevealStart = false;
      delete window.page3ArrowLineWhiteRevealStart;
      window.page3ArrowLineWhiteRevealStart = false;
      window.page3ScaleAnimationStarted = false;
      window.page3ClockwiseButtonClicked = false;
      window.page3ClockwiseAnimationStarted = false;
      window.page3AnticlockwiseButtonClicked = false;
      window.page3AnticlockwiseAnimationStarted = false;
    }

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
            console.log('Ã¢â€žÂ¹Ã¯Â¸Â [PageConfig] Table cell page2-map-table-R1C1 not found, skipping number pad update');
          }
        }
      });
    }

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

