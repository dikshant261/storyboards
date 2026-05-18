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
          borderWidth: "0gc",
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
            angleDisplay: { show: false, size: "24gc" },
          },
        },
      },
      // Right column: main text (white, one text box, center-aligned)
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
        },
      },
      // Orange arrow line (horizontal; intersection at 345,570)
      {
        id: "page1-arrow-line",
        name: "page1-arrow-line",
        type: "custom",
        coordinates: [345, 570, 700, 570],
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
      // White arrow line (50Ã‚Â° inclined; same start as orange)
      {
        id: "page1-arrow-line-white",
        name: "page1-arrow-line-white",
        type: "custom",
        coordinates: [345, 570, 602, 264],
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
      // Start button - Orange/gold, 3D style, centered below content
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 700, 950, 810],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start"),
          fontSize: "36gc",
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
      // Title: "Understand PROTRACTOR" (gold-orange, centered; PROTRACTOR bolder)
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      // Intro text (left-aligned, HTML with <br> for line break)
      {
        id: "page2-intro",
        name: "page2-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.introText"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Protractor container: white bg 30% opacity, white dashed border (exact replica of page 1)
      {
        id: "page2-protractor-container",
        name: "page2-protractor-container",
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
      
      // Orange arrow line (horizontal; same style as page 1)
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
        },
      },
      // White arrow line (slanted; same style as page 1)
      {
        id: "page2-arrow-line-white",
        name: "page2-arrow-line-white",
        type: "custom",
        coordinates: [1095, 670, 1350, 364],
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
      // Left panel: 4 part labels (flat container, not clickable - Vertex, Base, Clockwise Reading, Anti-Clockwise Reading)
      {
        id: "page2-button-bring-protractor",
        name: "page2-button-bring-protractor",
        type: "textbox",
        coordinates: [50, 300, 600, 383],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonVertex"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#9ca3af",
          fontWeight: "normal",
          textAlign: "center",
          backgroundColor: "rgba(60, 75, 95, 0.6)",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          pointerEvents: "none",
        },
      },
      {
        id: "page2-button-align-vertex",
        name: "page2-button-align-vertex",
        type: "textbox",
        coordinates: [50, 425, 600, 508],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonBase"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#9ca3af",
          fontWeight: "normal",
          textAlign: "center",
          backgroundColor: "rgba(60, 75, 95, 0.6)",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          pointerEvents: "none",
        },
      },
      {
        id: "page2-button-align-base",
        name: "page2-button-align-base",
        type: "textbox",
        coordinates: [50, 550, 600, 633],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#9ca3af",
          fontWeight: "normal",
          textAlign: "center",
          backgroundColor: "rgba(60, 75, 95, 0.6)",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          pointerEvents: "none",
        },
      },
      {
        id: "page2-button-align-second-arm",
        name: "page2-button-align-second-arm",
        type: "textbox",
        coordinates: [50, 675, 600, 758],
        zIndex: "var(--z-elevated)",
        props: {
          text: getI18nText("pages.page2.buttonAntiClockwise"),
          allowHTML: true,
          fontSize: "24gc",
          color: "#9ca3af",
          fontWeight: "normal",
          textAlign: "center",
          backgroundColor: "rgba(60, 75, 95, 0.6)",
          borderRadius: "12gc",
          padding: "16gc",
          boxSizing: "border-box",
          verticalAlign: "center",
          pointerEvents: "none",
        },
      },
      
      // Footer instruction (center)
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.footerInstruction"),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          verticalAlign: "center",
        },
      },
      
      // Navigation buttons
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
        coordinates: [1450, 815, 1525, 900],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          opacity: 0.65,
          scale: 0.9,
        },
      },
      
      {
        id: "page2-previous-button",
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
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    
    3: [
      // Title: "Understand PROTRACTOR" (gold-orange, centered; PROTRACTOR bolder)
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.title"),
          fontSize: "44gc",
          color: "#FFB347",
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true,
        },
      },
      // Intro text (left-aligned, HTML with <br> for line break)
      {
        id: "page3-intro",
        name: "page3-intro",
        coordinates: [25, 125, 1575, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.introText"),
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
          borderWidth: "0gc",
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
          defaultRotation: 330,  // Initial rotation in degrees (protractor appears rotated by this angle)
          get opacity() { return (typeof window !== "undefined" && window.page3PartState === "protractor") ? 0 : 1; },
          get syncRotationFromConfig() { return (typeof window !== "undefined" && window.page3PartState === "protractor"); }, // Only sync rotation from config in initial state; keep user-animated rotation after align steps
          persistRotationKey: "page3ProtractorRotation", // Persist rotation so it survives remounts when state changes to alignMeasurementArm
          onAnimateToReady: (animateTo) => { if (typeof window !== "undefined") window.page3ProtractorAnimateTo = animateTo; },
          onAnimateToComplete: () => { if (typeof window !== "undefined" && typeof window.page3OnAnimateToComplete === "function") window.page3OnAnimateToComplete(); },
          onAnimateRotationReady: (animateRotation) => { if (typeof window !== "undefined") window.page3ProtractorAnimateRotation = animateRotation; },
          onAnimateRotationComplete: () => { if (typeof window !== "undefined" && typeof window.page3OnRotationComplete === "function") window.page3OnRotationComplete(); },
          onAnimateArmReady: (animateArmTo) => { if (typeof window !== "undefined") window.page3ProtractorAnimateArmTo = animateArmTo; },
          onAnimateArmComplete: () => { if (typeof window !== "undefined" && typeof window.page3OnAnimateArmComplete === "function") window.page3OnAnimateArmComplete(); },
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
            isDraggable: false,
            showRotationRing: false,
          },
          measurementArm: {
            get show() { return (typeof window !== "undefined" && (window.page3PartState === "alignMeasurementArm" || window.page3PartState === "complete")); }, // Show arm after button 3 rotation; persist in complete
            length: "125gc",   // Arm length (e.g. 'auto', '180gc', or number in viewBox units)
            thickness: "4gc",  // Arm line thickness (e.g. '5gc', '6gc')
            get color() { return (typeof window !== "undefined" && window.page3PartState === "complete") ? "#22c55e" : "red"; }, // Green when snapped at right angle
            angle: 0,
            style: "solid",
            extendable: false,
            angleDisplay: {
              show: true,
              size: "30gc",
              paddingX: "40gc",   // X padding around angle label
              paddingY: "30gc",  // Y padding around angle label
              get background() { return (typeof window !== "undefined" && window.page3PartState === "complete") ? "rgba(34, 197, 94, 0.65)" : "rgba(255, 165, 0, 0.65)"; }, // Green when snapped
              color: "black",
              gap: "25gc",      // Gap between circle and angle label (null = 5% of arm length)
            },
          },
        },
      },
      // Orange arrow line (horizontal; same style as page 2)
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
        },
      },
      // White arrow line (slanted; same style as page 1) - config exactly same as page 2
      {
        id: "page3-arrow-line-white",
        name: "page3-arrow-line-white",
        type: "custom",
        coordinates: [1095, 670, 1350, 364],
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
      // Left panel: 4 part buttons – when state = protractor: only button 1 enabled + pulsating; others disabled + dulled
      {
        id: "page3-button-bring-protractor",
        name: "page3-button-bring-protractor",
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "protractor" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-bring-protractor"); return s !== "protractor" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "protractor" ? 1 : 0.5; },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "protractor"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "protractor") {
              window.page3LastClickedButtonId = "page3-button-bring-protractor";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Unhide protractor (opacity is 1 when state !== "protractor") and move to alignVertex
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "alignVertex" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-align-vertex"); return s !== "alignVertex" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "protractor" ? 0 : (s === "alignVertex" ? 1 : 0.5); },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "alignVertex"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "alignVertex") {
              window.page3LastClickedButtonId = "page3-button-align-vertex";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Change state only after movement animation completes
              window.page3OnAnimateToComplete = () => {
                window.page3PartState = "alignBase";
                window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "alignBase" } }));
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "alignBase" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-align-base"); return s !== "alignBase" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "protractor" ? 0 : (s === "alignBase" ? 1 : 0.5); },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "alignBase"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "alignBase") {
              window.page3LastClickedButtonId = "page3-button-align-base";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Persist target angle before anything else so remounts show 0°
              window.page3ProtractorRotation = 0;
              // Change state only after rotation animation completes to avoid re-render resetting rotation
              window.page3OnRotationComplete = () => {
                window.page3PartState = "alignMeasurementArm";
                window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "alignMeasurementArm" } }));
                // Re-render so button states (disabled/pulsate) update; protractor keeps same instance and stays at 0°
                window.forceAppUpdate?.();
                window.page3OnRotationComplete = null;
              };
              if (typeof window.page3ProtractorAnimateRotation === "function") {
                window.page3ProtractorAnimateRotation(0, 2000); // Rotate protractor base to 0° (horizontal)
              } else {
                if (window.page3OnRotationComplete) window.page3OnRotationComplete();
              }
            }
          },
        },
      },
      {
        id: "page3-button-align-second-arm",
        name: "page3-button-align-second-arm",
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
          get cursor() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "alignMeasurementArm" ? "pointer" : "not-allowed"; },
          get disabled() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; const justClicked = (typeof window !== "undefined" && window.page3LastClickedButtonId === "page3-button-align-second-arm"); return s !== "alignMeasurementArm" || justClicked; },
          get opacity() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "protractor" ? 0 : (s === "alignMeasurementArm" ? 1 : 0.5); },
          get pulsate() { const s = (typeof window !== "undefined" && window.page3PartState) || "protractor"; return s === "alignMeasurementArm"; },
          onClick: () => {
            if (typeof window !== "undefined" && window.page3PartState === "alignMeasurementArm") {
              window.page3LastClickedButtonId = "page3-button-align-second-arm";
              window.forceAppUpdate?.();
              if (window.playCarClickSound) window.playCarClickSound("click");
              // Change state to complete only after measurement arm animation finishes
              window.page3OnAnimateArmComplete = () => {
                window.page3PartState = "complete";
                window.dispatchEvent(new CustomEvent("page3PartStateChanged", { detail: { state: "complete" } }));
                window.dispatchEvent(new CustomEvent("quizCompleted", { detail: { pageNumber: 3 } }));
                window.forceAppUpdate?.();
                window.page3OnAnimateArmComplete = null;
              };
              if (typeof window.page3ProtractorAnimateArmTo === "function") {
                window.page3ProtractorAnimateArmTo(50, 3000);
              } else {
                if (window.page3OnAnimateArmComplete) window.page3OnAnimateArmComplete();
              }
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
          get text() { return (typeof window !== "undefined" && window.page3PartState === "complete") ? getI18nText("pages.page3.instructionTapToSummarize") : getI18nText("pages.page3.instruction"); },
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
          get enabled() {
            return (typeof window !== "undefined" && window.page3PartState === "complete");
          },
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
        coordinates: [1410, 815, 1518, 911],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
          get enabled() {
            return (typeof window !== "undefined" && window.page3PartState === "complete");
          },
          opacity: 0.65,
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
          persistRotationKey: "page3ProtractorRotation", // Reuse page 3 rotation so protractor matches when navigating from page 3
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
          enabled: true,
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
          get enabled() {
            return (typeof window !== "undefined" && window.page5PartState === "complete");
          },
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
          get enabled() {
            return (typeof window !== "undefined" && window.page5PartState === "complete");
          },
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
          get enabled() {
            return !!(typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(6));
          },
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
          get enabled() {
            return (typeof window !== "undefined" && window.page7PartState === "complete");
          },
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
          get enabled() {
            return (typeof window !== "undefined" && window.page7PartState === "complete");
          },
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
          get enabled() {
            return !!(typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(8));
          },
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
          get enabled() {
            return !!(typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(8));
          },
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
          text: getI18nText("pages.page11.title"),
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
          get disabled() { return true; },
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
          get enabled() {
            return (typeof window !== "undefined" && window.page11PartState === "complete");
          },
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
          get enabled() {
            return (typeof window !== "undefined" && window.page11PartState === "complete");
          },
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
          text: getI18nText("pages.page12.title"),
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
          get enabled() {
            return !!(typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(12));
          },
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
          get enabled() {
            return !!(typeof window !== "undefined" && window.PageCompletionManager && window.PageCompletionManager.getPageCompleted(12));
          },
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
 * Restores page 3, 5, 7, 11 part states to "protractor" and clears protractor rotation / last-clicked state.
 */
const resetAllStatesForStartOver = () => {
  if (typeof window === 'undefined') return;
  window.page3PartState = "protractor";
  delete window.page3ProtractorRotation;
  delete window.page3LastClickedButtonId;
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
  if (typeof window.quizPanelStateStore === 'object' && window.quizPanelStateStore !== null) {
    // Clear persisted quiz selection/feedback state for all pages.
    window.quizPanelStateStore = {};
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
    
    // 5. Clear any animation sequence states
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
    
    // 6. Reset shape selector state if exists
    if (window.shapeSelectorState) {
      Object.keys(window.shapeSelectorState).forEach(key => {
        const state = window.shapeSelectorState[key];
        if (state) {
          state.selected = false;
          state.highlighted = false;
        }
      });
    }
    
    // 6b. Reset page 3 part state (protractor, alignVertex, alignBase, alignMeasurementArm, complete)
    if (pageNumber === 3 && typeof window !== 'undefined') {
      window.page3PartState = 'protractor';
      delete window.page3ProtractorRotation; // so protractor uses defaultRotation (330) on next mount
      delete window.page3LastClickedButtonId;
      window.page3ScaleAnimationStarted = false;
      window.page3ClockwiseButtonClicked = false;
      window.page3ClockwiseAnimationStarted = false;
      window.page3AnticlockwiseButtonClicked = false;
      window.page3AnticlockwiseAnimationStarted = false;
    }

    // 6c. Reset page 5 part state (own copy of page 3 flow)
    if (pageNumber === 5 && typeof window !== 'undefined') {
      window.page5PartState = 'protractor';
      delete window.page5ProtractorRotation;
      delete window.page5LastClickedButtonId;
    }

    // 6d. Reset page 7 part state (replica of page 5 with own state)
    if (pageNumber === 7 && typeof window !== 'undefined') {
      window.page7PartState = 'protractor';
      delete window.page7ProtractorRotation;
      delete window.page7LastClickedButtonId;
    }

    // 6e. Reset page 11 part state (replica of page 7 with own state)
    if (pageNumber === 11 && typeof window !== 'undefined') {
      window.page11PartState = 'protractor';
      delete window.page11ProtractorRotation;
      delete window.page11LastClickedButtonId;
    }

    // 7. Reset all components with IDs matching the page pattern (e.g., page3-*)
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
    
    // 8. Dispatch reset event for components to listen (skip when landing on target page so animation sequence can start)
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
    // Page 3 part state: default is 'protractor' (button 1 active)
    const currentState = window.page3PartState;
    const preserveState = currentState && currentState !== 'protractor';
    console.log('[PageConfig] initializePageConfig - page3 state check:', { currentState, preserveState, page3ProtractorRotation: window.page3ProtractorRotation });
    if (!preserveState) {
      window.page3PartState = "protractor";
      delete window.page3ProtractorRotation;
      delete window.page3LastClickedButtonId;
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

