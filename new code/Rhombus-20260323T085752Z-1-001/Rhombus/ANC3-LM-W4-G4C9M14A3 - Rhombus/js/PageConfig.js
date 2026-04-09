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
        coordinates: [200, 550, 1400, 650],
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
          fontSize: "32gc",
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
    ],
    
    2: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page2-left-column",
        name: "page2-left-column",
        coordinates: [5, 5, 875, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      
      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page2-right-column",
        name: "page2-right-column",
        coordinates: [880, 5, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
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
      
      // Header - Orange text
      // {
      //   id: "page2-header",
      //   name: "page2-header",
      //   coordinates: [25, 20, 1575, 80],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Move the vertices of the quadrilateral to match the green shape.",
      //     fontSize: "40gc",
      //     color: "#FF9900", // Orange color
      //     textAlign: "center",
      //     fontWeight: "bold",
      //     allowHTML: true, // Allow HTML for styling shape name in white
      //   },
      // },
      
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
      
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page2-shape-display",
          name: "shape-display",
        type: "custom",
          coordinates: [5, 5, 875, 800],
        zIndex: 40,
        props: {
          componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // Read from constants.js
            vertices: shapeConfig.vertices, // Read from constants.js
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
          showGrid: false,
          showDiagonals: false,
          showPropertyPanel: false,
          containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
          vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation
            labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
          },
          angleConfig: {
            show: "all",
            markerColor: "#FF6600",
            markerSize: "1gc",
            showText: false,
            textColor: "#FF6600",
            textSize: "12gc"
            }
          }
        };
      })(),
      
      // Property Showcase Component in right container
      {
        id: "page2-property-showcase",
        name: "property-showcase",
        type: "custom",
        coordinates: [890, 20, 1585, 790], // Positioned inside right container
        zIndex: 100, // Higher z-index to ensure visibility
        props: {
          componentType: "PropertyShowcaseComponent",
          headerText: getI18nText("common.propertyShowcase.headerText"),
          headerDescription: getI18nText("common.propertyShowcase.headerDescription"),
          headerFontSize: "32gc", // Header font size
          headerFontColor: "#FFFFFF", // White color for header
          headerFontWeight: "bold", // Header font weight
          headerDescriptionFontSize: "28gc", // Header description font size
          headerDescriptionFontColor: "#FFFFFF", // White color for description
          headerDescriptionFontWeight: "normal", // Header description font weight
          properties: [
            {
              name: getI18nText("common.propertyShowcase.propertyNames.sides"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.angles"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.diagonals"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.symmetry"),
              descriptions: []
            }
          ],
          currentProperty: 0,
          currentDescription: null,
          propertyNameColor: "#4DD0E1", // Bright blue for property names
          propertyNameFontSize: "28gc", // Font size for property names (match other pages)
          propertyDescriptionFontSize: "28gc", // Font size for property descriptions (match other pages)
          propertyDescriptionFontColor: "#FFFFFF",
          propertyDescriptionFontWeight: "normal",
          propertyFontSize: "20gc",
          propertyFontColor: "#FFFFFF",
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
          containerBackgroundOpacity: 0.8, // More visible
          containerPadding: "20gc",
          propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
          accentBorderColor: "#FF9900", // Orange accent border
          accentBorderWidth: "3gc",
          gap: "12gc",
          propertyPadding: "16gc",
          descriptionsCollapsible: false, // Don't allow collapsing
          descriptionsDefaultExpanded: true // Show descriptions expanded
        }
      },
      
      // Message Box (static textbox with same style as animation message box)
      {
        id: "page2-messagebox",
        name: "page2-messagebox",
        type: "textbox",
        coordinates: [15, 675, 865, 790], // Centered position
        zIndex: 1000,
        props: {
          text: getI18nText("pages.page2.messageBox"),
          backgroundColor: "#006666", // Dark teal
          color: "#FFFFFF", // White text
          padding: "20gc 30gc",
          borderRadius: "12gc",
          borderWidth: "1gc",
          borderStyle: "solid",
          borderColor: "#D4AF37", // Light gold/brown border
          fontSize: "32gc",
          lineHeight: "1.6",
          textAlign: "center", // Center aligned text
          boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center" // Center align content
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
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page3-left-column",
        name: "page3-left-column",
        coordinates: [5, 5, 875, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      
      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page3-right-column",
        name: "page3-right-column",
        coordinates: [880, 5, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
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
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page3-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [5, 5, 875, 800],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // Read from constants.js
            vertices: shapeConfig.vertices, // Read from constants.js
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FF9900", // Border color (orange, matching page 2 column borders)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "all",
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            },
            // Side symbols: one tick per side; shown only after all-sides-equal animation (showSideSymbolsAfterAnimation)
            showSideSymbolsAfterAnimation: true,
            sideSymbols: [
              { side: "AB", type: "tick", count: 1, color: "#ffffff", size: "12gc", thickness: "5gc", position: 0.35 },
              { side: "BC", type: "tick", count: 1, color: "#ffffff", size: "12gc", thickness: "5gc", position: 0.35 },
              { side: "CD", type: "tick", count: 1, color: "#ffffff", size: "12gc", thickness: "5gc", position: 0.35 },
              { side: "DA", type: "tick", count: 1, color: "#ffffff", size: "12gc", thickness: "5gc", position: 0.35 },
            ],
            // Parallel lines animation config (for step 3)
            parallelLinesAnimationConfig: {
              duration: 1500,
              waitTime: 500,
              cycles: 2, // Show 2 cycles
              message: "", // Empty message - messagebox will show the message instead
              extensionColor: "#00FF00", // Green to match highlighted sides
              trackLength: 0.5, // Length of parallel tracks as ratio of side length (2 = tracks extend 2x the side length on each side)
              trackStrokeWidth: "3gc", // Stroke width for parallel tracks
              trackDashStyle: "dashed", // Dash style for parallel tracks
              trackDashSize: 0.5, // Size of dashes as multiplier of line thickness (smaller = smaller dashes)
              trackDashGap: 0.3, // Size of gaps as multiplier of line thickness (smaller = smaller gaps)
              animationSpeed: 1, // Speed of parallel animation (1 = normal, 0.5 = half speed, 2 = double speed)
              // Message position using absolute coordinates [x, y] - overrides messagePosition if provided
              // messageCoordinates removed - message will be shown in messagebox instead
              // Alternative: use messagePosition with percentages
              // messagePosition: {
              //   left: 50, // Percentage from left
              //   top: 10,  // Percentage from top
              //   offsetX: 0,
              //   offsetY: -8
              // }
            },
            // All four sides equal animation config (rhombus) - rotate once to next side then move on
            sideEqualityAnimationConfig: {
              duration: 2000,
              waitTime: 500,
              cycles: 2,
              stopAfterRotateToSide2: true,
              message: getI18nText("common.allSidesEqualMessage"),
              messages: getI18nText("pages.page3.animationSequence.allSidesEqualBlinkMessages", ["AB = BC = CD = DA", "AB = BC", "AB = BC = CD", "AB = BC = CD = DA"]),
              messageFontSize: "22gc",
              messageAtCenter: true,
              lineStyle: "solid",
              color: "#00FF00"
            },
            // Opposite side equality (used when useAllSidesEqualAnimation is false)
            oppositeSideAnimationConfig: {
              duration: 2000,
              waitTime: 500,
              cycles: 2,
              message: getI18nText("common.oppositeSidesEqualMessage"),
              lineStyle: "solid",
              color1: "#00FF00",
              color2: "#FF6600"
            }
          }
        };
      })(),
      
      // Animation Sequence Component (controls the step-by-step animation)
      // 
      // CHRONOLOGICAL TIMELINE (relative to t=0):
      // 
      // t=0ms:     Step 0 - Initialization (wait 500ms for components to mount)
      // t=500ms:   Step 1 - Display message: "Opposite sides are parallel..." (1000ms)
      // t=1500ms:  Step 2 - Highlight sides AB & CD in green, make them blink (1000ms)
      // t=2500ms:  Step 3 - Parallel lines animation for AB & CD (~4000ms, 2 cycles)
      // t=6500ms:  Step 4 - Show confirmation "AB and CD are parallel!" (immediate)
      // t=7000ms:  Step 5 - Add dark green chevron arrow symbols to AB & CD (500ms after Step 4, arrows move with quad, stop blinking)
      // t=7000ms:  Step 6 - Wait before second pair (wait period: 1000ms, from t=7000ms to t=8000ms)
      // t=8000ms:  Step 7 - Highlight sides BC & DA in orange, make them blink (1000ms)
      // t=9000ms:  Step 8 - Parallel lines animation for BC & DA (~4000ms, 2 cycles)
      // t=13000ms: Step 9 - Show confirmation "BC and DA are parallel!" (immediate, stop blinking)
      // t=13500ms: Step 10 - Add dark orange double chevron arrow symbols to BC & DA (500ms after Step 9, arrows move with quad, stop blinking)
      //
      // Total sequence time: ~13500ms (13.5 seconds)
      {
        id: "page3-animation-sequence",
        name: "animation-sequence",
        type: "custom",
        coordinates: [0, 0, 1600, 900], // Full page overlay
        zIndex: 2000, // Above everything
        props: {
          componentType: "QuadAnimationSequenceComponent",
          sequenceConfig: {
            quadComponentId: "page3-shape-display", // ID of the quadrilateral component to animate
            messageBoxId: "page3-messagebox", // ID of the messagebox to update with messages
            initialDelay: 500, // Initial delay before starting (ms)
            completionEventName: "page3AnimationComplete", // Event name to dispatch on completion
            nextButtonId: "page3-next-button", // ID of next button to enable when animation completes
            nextButtonName: "next-button", // Element name of next button (for searching by data-element-name)
            tapAnimationId: "page3-tap-next", // ID of tap animation to enable when animation completes
            tapAnimationName: "tap-gif", // Element name of tap animation (for searching by data-element-name)
            propertyDescriptionFontSize: "28gc", // For dynamically added descriptions (same as property showcase; converted to px at 90%)
            
            // First pair configuration (AB & CD)
            firstPair: {
              side1Index: 0, // AB
              side2Index: 2, // CD
              pairIndex: 0, // Animation pair index (0=AB/CD)
              pairName: "AB-CD",
              highlightColor: "#00FF00", // Green
              chevronColor: "white", // White chevrons
              doubleChevron: false, // Single chevron
              initialMessage: getI18nText("pages.page3.animationSequence.initialMessage"),
              provenMessage: getI18nText("pages.page3.animationSequence.firstPairProvenMessage")
            },
            
            // Second pair configuration (BC & DA)
            secondPair: {
              side1Index: 1, // BC
              side2Index: 3, // DA
              pairIndex: 1, // Animation pair index (1=BC/DA)
              pairName: "BC-DA",
              highlightColor: "#FF6600", // Orange
              chevronColor: "white", // White chevrons
              doubleChevron: true, // Double chevron
              initialMessage: getI18nText("pages.page3.animationSequence.initialMessage"),
              provenMessage: getI18nText("pages.page3.animationSequence.secondPairProvenMessage")
            },
            
            // Timing configuration
            timing: {
              messageDuration: 1000, // Duration for initial message (ms)
              sideHighlightDuration: 1000, // Duration for side highlighting (ms)
              parallelAnimationCycles: 2, // Number of animation cycles
              symbolDelay: 500, // Delay before adding symbols (ms)
              waitBetweenPairs: 1000, // Wait between first and second pair (ms)
              conclusionDelay: 1000 // Delay before conclusion message (ms)
            },
            
            // All four sides equal animation (rhombus) - when true, uses side equality at each vertex instead of opposite pairs
            useAllSidesEqualAnimation: true,
            sideEqualityAnimationDuration: 2000,
            sideEqualityAnimationWaitTime: 500,
            sideEqualityAnimationCycles: 2,
            sidesEqualAtVertex0Message: getI18nText("pages.page3.animationSequence.sidesEqualAtVertex0Message"),
            sidesEqualAtVertex1Message: getI18nText("pages.page3.animationSequence.sidesEqualAtVertex1Message"),
            sidesEqualAtVertex2Message: getI18nText("pages.page3.animationSequence.sidesEqualAtVertex2Message"),
            sidesEqualAtVertex3Message: getI18nText("pages.page3.animationSequence.sidesEqualAtVertex3Message"),
            allSidesEqualConclusionMessage: getI18nText("pages.page3.animationSequence.allSidesEqualConclusionMessage"),
            allSidesEqualDescriptionText: getI18nText("pages.page3.animationSequence.allSidesEqualDescriptionText"),
            // Opposite side equality timing (when useAllSidesEqualAnimation is false)
            oppositeSideAnimationDuration: 2000,
            oppositeSideAnimationWaitTime: 500,
            oppositeSideAnimationCycles: 2,
            
            // Property showcase configuration (for Step 11)
            propertyShowcaseId: "page3-property-showcase", // ID of property showcase component
            propertyName: getI18nText("common.propertyShowcase.propertyNames.sides"),
            propertyDescriptionText: getI18nText("pages.page3.animationSequence.propertyDescriptionText"),
            
            // Conclusion message (resolved at display time so language switch is respected)
            conclusionMessageKey: "pages.page3.animationSequence.conclusionMessage",
            conclusionMessage: getI18nText("pages.page3.animationSequence.conclusionMessage"),
            
            // Second description text to add after final step (Step 16)
            secondDescriptionText: getI18nText("pages.page3.animationSequence.secondDescriptionText"),
            
            // Message box messages for opposite side equality steps
            sidesABEqualMessage: getI18nText("pages.page3.animationSequence.sidesABEqualMessage"),
            sidesBCEqualMessage: getI18nText("pages.page3.animationSequence.sidesBCEqualMessage"),
            sidesEqualConclusionMessage: getI18nText("pages.page3.animationSequence.sidesEqualConclusionMessage"),
            
            // Instruction text to update after final step (Step 16)
            instructionId: "page3-instruction", // ID of instruction text element
            instructionText: getI18nText("pages.page3.animationSequence.instructionText")
          }
        }
      },
      
      // Message Box (static textbox with same style as animation message box)
      // Text will be updated by the animation sequence component
      {
        id: "page3-messagebox",
        name: "page3-messagebox",
        type: "textbox",
        coordinates: [15, 675, 865, 790], // Centered position
        zIndex: 1000,
        props: {
          text: "", // Initially empty - will be updated by animation sequence
          backgroundColor: "#006666", // Dark teal
          color: "#FFFFFF", // White text
          padding: "20gc 30gc",
          borderRadius: "12gc",
          borderWidth: "1gc",
          borderStyle: "solid",
          borderColor: "#D4AF37", // Light gold/brown border
          fontSize: "32gc",
          lineHeight: "1.6",
          textAlign: "center", // Center aligned text
          // maxWidth removed to allow message box to expand based on coordinates
          boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center" // Center align content
        }
      },
      
      // Property Showcase Component in right container
      {
        id: "page3-property-showcase",
        name: "property-showcase",
        type: "custom",
        coordinates: [890, 20, 1585, 790], // Positioned inside right container
        zIndex: 100, // Higher z-index to ensure visibility
        props: {
          componentType: "PropertyShowcaseComponent",
          headerText: getI18nText("common.propertyShowcase.headerText"),
          headerDescription: getI18nText("common.propertyShowcase.headerDescription"),
          headerFontSize: "32gc", // Header font size
          headerFontColor: "#FFFFFF", // White color for header
          headerFontWeight: "bold", // Header font weight
          headerDescriptionFontSize: "28gc", // Header description font size (match other pages)
          headerDescriptionFontColor: "#FFFFFF", // White color for description
          headerDescriptionFontWeight: "normal", // Header description font weight
          properties: [
            {
              name: getI18nText("common.propertyShowcase.propertyNames.sides"),
              descriptions: []              
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.angles"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.diagonals"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.symmetry"),
              descriptions: []
            }
          ],
          currentProperty: 1, // Set to 1 to make Sides (first property) active
          currentDescription: 1, // Set to 1 to make first description active
          propertyNameColor: "#4DD0E1", // Bright blue for property names
          propertyNameFontSize: "28gc", // Font size for property names
          propertyNameFontWeight: "bold", // Font weight for property names
          propertyDescriptionFontSize: "28gc", // Font size for property descriptions
          propertyDescriptionFontColor: "#FFFFFF", // Color for property descriptions
          propertyDescriptionFontWeight: "normal", // Font weight for property descriptions
          propertyFontSize: "20gc", // Legacy prop (used as fallback)
          propertyFontColor: "#FFFFFF", // Legacy prop (used as fallback)
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
          containerBackgroundOpacity: 0.8, // More visible
          containerPadding: "20gc",
          propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
          accentBorderColor: "#FF9900", // Orange accent border
          accentBorderWidth: "3gc",
          gap: "12gc",
          propertyPadding: "16gc",
          descriptionsCollapsible: false, // Don't allow collapsing
          descriptionsDefaultExpanded: true // Show descriptions expanded
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
          get text() {
            return getI18nText("buttons.next");
          },
          enabled: false, // Disabled by default, will be enabled when animation completes
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
          enabled: false, // Hidden until page3AnimationComplete fires (same as next button)
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
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page4-left-column",
        name: "page4-left-column",
        coordinates: [5, 5, 875, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      
      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page4-right-column",
        name: "page4-right-column",
        coordinates: [880, 5, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
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
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
        id: "page4-shape-display",
        name: "shape-display",
        type: "custom",
        coordinates: [5, 5, 875, 800],
        zIndex: 40,
        props: {
          componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // Read from constants.js
            vertices: shapeConfig.vertices, // Read from constants.js
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
          showGrid: false,
          showDiagonals: false,
          showPropertyPanel: false,
          containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon, matching page 2)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "all",
              markerColor: "#FF6600",
              markerSize: "1gc",
              arcSizeGc: "80gc", // Angle arc (and animated sum arc) size in gc for visibility
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc",
              // Enable fills for all interior angles so they can be updated dynamically
              angleA: {
                interiorAngle: {
                  show: true,
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.3
                }
              },
              angleB: {
                interiorAngle: {
                  show: true,
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.3
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.3
                }
              },
              angleD: {
                interiorAngle: {
                  show: true,
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.3
                }
              }
            },
            // Side symbols for equality (ticks) and parallel (arrows)
            // Note: Arrow symbols for AB || CD will be added dynamically after animation
            sideSymbols: [
              // Tick marks for equal opposite sides (AB = CD)
              // { side: "AB", type: "tick", count: 1, color: "#000000", size: "12gc" },
              // { side: "CD", type: "tick", count: 1, color: "#000000", size: "12gc" },
              // Double ticks for other equal pair (BC = DA)
              // { side: "BC", type: "tick", count: 2, color: "#000000", size: "12gc" },
              // { side: "DA", type: "tick", count: 2, color: "#000000", size: "12gc" },
              // Arrow marks for parallel sides (AB || CD) - added dynamically after animation
              // { side: "AB", type: "arrow", count: 1, color: "#FF6600", size: "10gc", position: 0.5 },
              // { side: "CD", type: "arrow", count: 1, color: "#FF6600", size: "10gc", position: 0.5 },
            ],
            // Parallel lines animation config (for step 3)
            parallelLinesAnimationConfig: {
              duration: 1500,
              waitTime: 500,
              cycles: 2, // Show 2 cycles
              message: "", // Empty message - messagebox will show the message instead
              extensionColor: "#00FF00", // Green to match highlighted sides
              trackLength: 0.5, // Length of parallel tracks as ratio of side length (2 = tracks extend 2x the side length on each side)
              trackStrokeWidth: "3gc", // Stroke width for parallel tracks
              trackDashStyle: "dashed", // Dash style for parallel tracks
              trackDashSize: 0.5, // Size of dashes as multiplier of line thickness (smaller = smaller dashes)
              trackDashGap: 0.3, // Size of gaps as multiplier of line thickness (smaller = smaller gaps)
              animationSpeed: 1, // Speed of parallel animation (1 = normal, 0.5 = half speed, 2 = double speed)
              // Message position using absolute coordinates [x, y] - overrides messagePosition if provided
              // messageCoordinates removed - message will be shown in messagebox instead
              // Alternative: use messagePosition with percentages
              // messagePosition: {
              //   left: 50, // Percentage from left
              //   top: 10,  // Percentage from top
              //   offsetX: 0,
              //   offsetY: -8
              // }
            },
            // Opposite side equality animation config (for step 12)
            oppositeSideAnimationConfig: {
              duration: 2000, // Animation duration in milliseconds
              waitTime: 500, // Wait time at each position
              cycles: 2, // Number of cycles (2 cycles as requested)
              message: getI18nText("common.oppositeSidesEqualMessage"),
              lineStyle: "solid", // Line style for the animation - solid to retain side exactly as is
              color1: "#00FF00", // Color for pair 0 (AB/CD) - green to match highlighted sides
              color2: "#FF6600" // Color for pair 1 (BC/DA) - orange
            }
          }
        };
      })(),
      
      // Animation Sequence Component (controls the step-by-step animation)
      // 
      // CHRONOLOGICAL TIMELINE (relative to t=0):
      // 
      // t=0ms:     Step 0 - Initialization (wait 500ms for components to mount)
      // t=500ms:   Step 1 - Display message: "Opposite sides are parallel..." (1000ms)
      // t=1500ms:  Step 2 - Highlight sides AB & CD in green, make them blink (1000ms)
      // t=2500ms:  Step 3 - Parallel lines animation for AB & CD (~4000ms, 2 cycles)
      // t=6500ms:  Step 4 - Show confirmation "AB and CD are parallel!" (immediate)
      // t=7000ms:  Step 5 - Add dark green chevron arrow symbols to AB & CD (500ms after Step 4, arrows move with quad, stop blinking)
      // t=7000ms:  Step 6 - Wait before second pair (wait period: 1000ms, from t=7000ms to t=8000ms)
      // t=8000ms:  Step 7 - Highlight sides BC & DA in orange, make them blink (1000ms)
      // t=9000ms:  Step 8 - Parallel lines animation for BC & DA (~4000ms, 2 cycles)
      // t=13000ms: Step 9 - Show confirmation "BC and DA are parallel!" (immediate, stop blinking)
      // t=13500ms: Step 10 - Add dark orange double chevron arrow symbols to BC & DA (500ms after Step 9, arrows move with quad, stop blinking)
      //
      // Total sequence time: ~13500ms (13.5 seconds)
      {
        id: "page4-animation-sequence",
        name: "animation-sequence",
        type: "custom",
        coordinates: [0, 0, 1600, 900], // Full page overlay
        zIndex: 2000, // Above everything
        props: {
          componentType: "QuadAnimationSequenceComponent",
          sequenceConfig: {
            quadComponentId: "page4-shape-display", // ID of the quadrilateral component to animate
            messageBoxId: "page4-messagebox", // ID of the messagebox to update with messages
            initialDelay: 500, // Initial delay before starting (ms)
            completionEventName: "page4AnimationComplete", // Event name to dispatch on completion
            nextButtonId: "page4-next-button", // ID of next button to enable when animation completes
            nextButtonName: "next-button", // Element name of next button (for searching by data-element-name)
            tapAnimationId: "page4-tap-next", // ID of tap animation to enable when animation completes
            tapAnimationName: "tap-gif", // Element name of tap animation (for searching by data-element-name)
            propertyDescriptionFontSize: "28gc", // For dynamically added descriptions (same as property showcase; converted to px at 90%)
            
            // Step 1: Show all angle markers
            showAngleMarkers: true, // Enable angle markers in Step 1
            angleMarkerColor: "#FF6600", // Orange color for angle markers
            angleMarkerFill: true, // Fill the arcs
            angleMarkerBlink: true, // Make the fills blink
            
            // Step 2: Add description to property showcase
            step2PropertyName: getI18nText("common.propertyShowcase.propertyNames.angles"),
            step2DescriptionText: getI18nText("pages.page4.animationSequence.step2DescriptionText"),
            
            // Step 3: Message and update angles description
            step3Message: getI18nText("pages.page4.animationSequence.step3Message"),
            step3AnglesDescriptionText: getI18nText("pages.page4.animationSequence.step3AnglesDescriptionText"),
            
            // Adjacent angles supplementary configuration (Steps 7-10)
            showAdjacentAnglesSupplementary: false, // Adjacent angles animation removed per request
            adjacentAnglesMessage1: getI18nText("pages.page4.animationSequence.adjacentAnglesMessage1"),
            adjacentAnglesMessage2: getI18nText("pages.page4.animationSequence.adjacentAnglesMessage2"),
            adjacentAnglesMessage3: getI18nText("pages.page4.animationSequence.adjacentAnglesMessage3"),
            adjacentAnglesMessage4: getI18nText("pages.page4.animationSequence.adjacentAnglesMessage4"),
            adjacentAnglesMessage5: getI18nText("pages.page4.animationSequence.adjacentAnglesMessage5"),
            adjacentAnglesFinalMessage: getI18nText("pages.page4.animationSequence.adjacentAnglesFinalMessage"),
            adjacentAnglesDescriptionText: getI18nText("pages.page4.animationSequence.adjacentAnglesDescriptionText"),
            
            // Opposite angle equality messages (A=C and B=D)
            angleEqualityMessageAC: getI18nText("pages.page4.animationSequence.angleEqualityMessageAC"),
            angleEqualityMessageBD: getI18nText("pages.page4.animationSequence.angleEqualityMessageBD"),
            oppositeAnglesEqualMessage: getI18nText("pages.page4.animationSequence.oppositeAnglesEqualMessage"),
            
            // First pair configuration (AB & CD) - NOT USED (steps 4-16 removed)
            firstPair: {
              side1Index: 0, // AB
              side2Index: 2, // CD
              pairIndex: 0, // Animation pair index (0=AB/CD)
              pairName: "AB-CD",
              highlightColor: "#00FF00", // Green
              chevronColor: "white", // White chevrons
              doubleChevron: false, // Single chevron
              initialMessage: getI18nText("pages.page3.animationSequence.initialMessage"),
              provenMessage: getI18nText("pages.page3.animationSequence.firstPairProvenMessage")
            },
            
            // Second pair configuration (BC & DA)
            secondPair: {
              side1Index: 1, // BC
              side2Index: 3, // DA
              pairIndex: 1, // Animation pair index (1=BC/DA)
              pairName: "BC-DA",
              highlightColor: "#FF6600", // Orange
              chevronColor: "white", // White chevrons
              doubleChevron: true, // Double chevron
              initialMessage: getI18nText("pages.page3.animationSequence.initialMessage"),
              provenMessage: getI18nText("pages.page3.animationSequence.secondPairProvenMessage")
            },
            
            // Timing configuration
            timing: {
              messageDuration: 1000, // Duration for initial message (ms)
              sideHighlightDuration: 1000, // Duration for side highlighting (ms)
              parallelAnimationCycles: 2, // Number of animation cycles
              symbolDelay: 500, // Delay before adding symbols (ms)
              waitBetweenPairs: 1000, // Wait between first and second pair (ms)
              conclusionDelay: 1000 // Delay before conclusion message (ms)
            },
            
            // Opposite side equality animation timing (for steps 12-16)
            oppositeSideAnimationDuration: 2000, // Animation duration in milliseconds
            oppositeSideAnimationWaitTime: 500, // Wait time at each position
            oppositeSideAnimationCycles: 2, // Number of cycles
            
            // Property showcase configuration (for Step 2 and Step 11)
            propertyShowcaseId: "page4-property-showcase", // ID of property showcase component
            // Note: Page 4 is about Angles, not Sides, so these Sides-related props are not needed
            // They are left here for reference but should not be used
            
            // Instruction text to update after final step (Step 6)
            instructionId: "page4-instruction", // ID of instruction text element
            instructionText: getI18nText("pages.page4.animationSequence.instructionText"),
            
            // Angle measurement label configuration
            // Can be a single number (applied to all vertices) or an array [A, B, C, D] for per-vertex ratios
            // Array format: [ratioForA, ratioForB, ratioForC, ratioForD] where index 0=A, 1=B, 2=C, 3=D
            angleLabelPositionRatio: [0.25, 0.33, 0.25, 0.33] // Position ratios for each vertex [A, B, C, D]
          }
        }
      },
      
      // Message Box (static textbox with same style as animation message box)
      // Text will be updated by the animation sequence component
      {
        id: "page4-messagebox",
        name: "page4-messagebox",
        type: "textbox",
        coordinates: [15, 675, 865, 790], // Centered position
        zIndex: 1000,
        props: {
          text: "", // Initially empty - will be updated by animation sequence
          backgroundColor: "#006666", // Dark teal
          color: "#FFFFFF", // White text
          padding: "20gc 30gc",
          borderRadius: "12gc",
          borderWidth: "1gc",
          borderStyle: "solid",
          borderColor: "#D4AF37", // Light gold/brown border
          fontSize: "32gc",
          lineHeight: "1.6",
          textAlign: "center", // Center aligned text
          // maxWidth removed to allow message box to expand based on coordinates
          boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center" // Center align content
        }
      },
      
      // Property Showcase Component in right container
      {
        id: "page4-property-showcase",
        name: "property-showcase",
        type: "custom",
        coordinates: [890, 20, 1585, 790], // Positioned inside right container
        zIndex: 100, // Higher z-index to ensure visibility
        props: {
          componentType: "PropertyShowcaseComponent",
          headerText: getI18nText("common.propertyShowcase.headerText"),
          headerDescription: getI18nText("common.propertyShowcase.headerDescription"),
          headerFontSize: "32gc", // Header font size
          headerFontColor: "#FFFFFF", // White color for header
          headerFontWeight: "bold", // Header font weight
          headerDescriptionFontSize: "28gc", // Header description font size
          headerDescriptionFontColor: "#FFFFFF", // White color for description
          headerDescriptionFontWeight: "normal", // Header description font weight
          properties: [
            {
              name: getI18nText("common.propertyShowcase.propertyNames.sides"),
              descriptions: []              
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.angles"),
              descriptions: [{text: getI18nText("pages.page4.animationSequence.step3AnglesDescriptionText")}]
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.diagonals"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.symmetry"),
              descriptions: []
            }
          ],
          currentProperty: 2, // Set to 1 to make Sides (first property) active
          currentDescription: 1, // Set to 1 to make first description active
          propertyNameColor: "#4DD0E1", // Bright blue for property names
          propertyNameFontSize: "28gc", // Font size for property names
          propertyNameFontWeight: "bold", // Font weight for property names
          propertyDescriptionFontSize: "28gc", // Font size for property descriptions
          propertyDescriptionFontColor: "#FFFFFF", // Color for property descriptions
          propertyDescriptionFontWeight: "normal", // Font weight for property descriptions
          propertyFontSize: "20gc", // Legacy prop (used as fallback)
          propertyFontColor: "#FFFFFF", // Legacy prop (used as fallback)
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
          containerBackgroundOpacity: 0.8, // More visible
          containerPadding: "20gc",
          propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
          accentBorderColor: "#FF9900", // Orange accent border
          accentBorderWidth: "3gc",
          gap: "12gc",
          propertyPadding: "16gc",
          descriptionsCollapsible: false, // Don't allow collapsing
          descriptionsDefaultExpanded: true // Show descriptions expanded
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
          get text() {
            return getI18nText("buttons.next");
          },
          enabled: false, // Disabled by default, will be enabled when animation completes
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
          enabled: false, // Hidden until page4AnimationComplete fires (same as next button)
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
    ],
    
    5: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page5-left-column",
        name: "page5-left-column",
        coordinates: [5, 5, 875, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      
      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page5-right-column",
        name: "page5-right-column",
        coordinates: [880, 5, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
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
        id: "page5-instruction",
        name: "page5-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page5-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [5, 5, 875, 800],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // Read from constants.js
            vertices: shapeConfig.vertices, // Read from constants.js
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // Will be shown in Step 1 of animation
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon, matching page 2)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            diagonalColor: "#FF6600", // Default color (overridden by individual diagonal colors)
            diagonal1: {
              color: "#00FF00", // Green
              thickness: "4gc",
              style: "solid"
            },
            diagonal2: {
              color: "#FF6600", // Orange
              thickness: "4gc",
              style: "solid"
            },
            diagonalEqualityAnimationConfig: {
              duration: 1500, // Duration of translation animation (ms)
              waitTime: 1000, // Wait time at target position (ms)
              cycles: 2, // Number of cycles to run
              message: "", // Empty message (no blinking message during animation)
              lineStyle: "dashed", // Dashed line for animation
              color: "#FF6600" // Orange color
            },
            diagonalBisectionAnimationConfig: {
              duration: 1500,
              waitTime: 1000,
              cycles: 2 // Each bisect animation (AC, BD) runs 2 cycles
            },
            diagonalAngleBisectionArcSize: "15gc", // Option B: top-level prop for half-angle arc size (overrides config.arcSize)
            diagonalAngleBisectionAnimationConfig: {
              backAndForthCount: 1, // Number of CBD↔ABD back-and-forth cycles before final overlay
              halfCycleDuration: 2000, // CBD→ABD and ABD→CBD each (ms); total rotating = (2*backAndForthCount+1) * halfCycleDuration
              waitTime: 2000, // Time to hold at overlaid position
              cycles: 1, // Number of cycles per diagonal
              arcColor: "#FF6600", // Original half-angle arc (stays in place)
              fillOpacity: 0.5, // Opacity of the arc fill
              movingColor: "#FFD700", // Replica arc while moving (yellow)
              overlapEqualColor: "#00FF00", // When overlapped and equal (green)
              overlapNotEqualColor: "#FF0000", // When overlapped and not equal (red)
              overlapEqual: true // Diagonal bisects angle so halves are equal
            },
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none", // Disable angle markers for page 5 (diagonals only)
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            },
            // Side symbols for equality (ticks) and parallel (arrows)
            // Note: Arrow symbols for AB || CD will be added dynamically after animation
            sideSymbols: [
              // Tick marks for equal opposite sides (AB = CD)
              // { side: "AB", type: "tick", count: 1, color: "#000000", size: "12gc" },
              // { side: "CD", type: "tick", count: 1, color: "#000000", size: "12gc" },
              // Double ticks for other equal pair (BC = DA)
              // { side: "BC", type: "tick", count: 2, color: "#000000", size: "12gc" },
              // { side: "DA", type: "tick", count: 2, color: "#000000", size: "12gc" },
              // Arrow marks for parallel sides (AB || CD) - added dynamically after animation
              // { side: "AB", type: "arrow", count: 1, color: "#FF6600", size: "10gc", position: 0.5 },
              // { side: "CD", type: "arrow", count: 1, color: "#FF6600", size: "10gc", position: 0.5 },
            ],
            // Parallel lines animation config (for step 3)
            parallelLinesAnimationConfig: {
              duration: 1500,
              waitTime: 500,
              cycles: 2, // Show 2 cycles
              message: "", // Empty message - messagebox will show the message instead
              extensionColor: "#00FF00", // Green to match highlighted sides
              trackLength: 0.5, // Length of parallel tracks as ratio of side length (2 = tracks extend 2x the side length on each side)
              trackStrokeWidth: "3gc", // Stroke width for parallel tracks
              trackDashStyle: "dashed", // Dash style for parallel tracks
              trackDashSize: 0.5, // Size of dashes as multiplier of line thickness (smaller = smaller dashes)
              trackDashGap: 0.3, // Size of gaps as multiplier of line thickness (smaller = smaller gaps)
              animationSpeed: 1, // Speed of parallel animation (1 = normal, 0.5 = half speed, 2 = double speed)
              // Message position using absolute coordinates [x, y] - overrides messagePosition if provided
              // messageCoordinates removed - message will be shown in messagebox instead
              // Alternative: use messagePosition with percentages
              // messagePosition: {
              //   left: 50, // Percentage from left
              //   top: 10,  // Percentage from top
              //   offsetX: 0,
              //   offsetY: -8
              // }
            },
            // Opposite side equality animation config (for step 12)
            oppositeSideAnimationConfig: {
              duration: 2000, // Animation duration in milliseconds
              waitTime: 500, // Wait time at each position
              cycles: 2, // Number of cycles (2 cycles as requested)
              message: getI18nText("common.oppositeSidesEqualMessage"),
              lineStyle: "solid", // Line style for the animation - solid to retain side exactly as is
              color1: "#00FF00", // Color for pair 0 (AB/CD) - green to match highlighted sides
              color2: "#FF6600" // Color for pair 1 (BC/DA) - orange
            }
          }
        };
      })(),
      
      // Animation Sequence Component (controls the step-by-step animation)
      // 
      // CHRONOLOGICAL TIMELINE (relative to t=0):
      // 
      // t=0ms:     Step 0 - Initialization (wait 500ms for components to mount)
      // t=500ms:   Step 1 - Display message: "Opposite sides are parallel..." (1000ms)
      // t=1500ms:  Step 2 - Highlight sides AB & CD in green, make them blink (1000ms)
      // t=2500ms:  Step 3 - Parallel lines animation for AB & CD (~4000ms, 2 cycles)
      // t=6500ms:  Step 4 - Show confirmation "AB and CD are parallel!" (immediate)
      // t=7000ms:  Step 5 - Add dark green chevron arrow symbols to AB & CD (500ms after Step 4, arrows move with quad, stop blinking)
      // t=7000ms:  Step 6 - Wait before second pair (wait period: 1000ms, from t=7000ms to t=8000ms)
      // t=8000ms:  Step 7 - Highlight sides BC & DA in orange, make them blink (1000ms)
      // t=9000ms:  Step 8 - Parallel lines animation for BC & DA (~4000ms, 2 cycles)
      // t=13000ms: Step 9 - Show confirmation "BC and DA are parallel!" (immediate, stop blinking)
      // t=13500ms: Step 10 - Add dark orange double chevron arrow symbols to BC & DA (500ms after Step 9, arrows move with quad, stop blinking)
      //
      // Total sequence time: ~13500ms (13.5 seconds)
      {
        id: "page5-animation-sequence",
        name: "animation-sequence",
        type: "custom",
        coordinates: [0, 0, 1600, 900], // Full page overlay
        zIndex: 2000, // Above everything
        props: {
          componentType: "QuadAnimationSequenceComponent",
          sequenceConfig: {
            quadComponentId: "page5-shape-display", // ID of the quadrilateral component to animate
            messageBoxId: "page5-messagebox", // ID of the messagebox to update with messages
            initialDelay: 500, // Initial delay before starting (ms)
            completionEventName: "page5AnimationComplete", // Event name to dispatch on completion
            nextButtonId: "page5-next-button", // ID of next button to enable when animation completes
            nextButtonName: "next-button", // Element name of next button (for searching by data-element-name)
            tapAnimationId: "page5-tap-next", // ID of tap animation to enable when animation completes
            tapAnimationName: "tap-gif", // Element name of tap animation (for searching by data-element-name)
            propertyDescriptionFontSize: "28gc", // For dynamically added descriptions (same as property showcase; converted to px at 90%)
            
            // Step 1: Show diagonals
            showDiagonals: true, // Enable showing diagonals in Step 1
            
            // Step 2: Message
            step2Message: getI18nText("pages.page5.animationSequence.step2Message"),
            
            // Step 3: Update property showcase (Diagonals property, index 2)
            step3PropertyIndex: 2, // Diagonals property index
            step3DescriptionText: getI18nText("pages.page5.animationSequence.step3DescriptionText"),
            
            // Step 6: After diagonal equality animation
            step6Message: getI18nText("pages.page5.animationSequence.step6Message"),
            step6DescriptionText: getI18nText("pages.page5.animationSequence.step6DescriptionText"),
            
            // Measure diagonal angle configuration (disabled per request)
            measureDiagonalAngle: false, // Angle measurement removed
            step7Message: getI18nText("pages.page5.animationSequence.step7Message"),
            step7DescriptionText: getI18nText("pages.page5.animationSequence.step7DescriptionText"),
            diagonalAngleMessage: getI18nText("pages.page5.animationSequence.diagonalAngleMessage"),
            step8Message: getI18nText("pages.page5.animationSequence.step8Message"),
            step8ACMessage: getI18nText("pages.page5.animationSequence.step8ACMessage"),
            step8BDMessage: getI18nText("pages.page5.animationSequence.step8BDMessage"),
            step8ProvenMessage: getI18nText("pages.page5.animationSequence.step8ProvenMessage"),
            step8DescriptionText: getI18nText("pages.page5.animationSequence.step8DescriptionText"),
            
            // Step 9: Diagonal angle bisection (rhombus-specific) - disabled per request
            showDiagonalAngleBisection: false, // Diagonals bisect interior angle animation removed
            step9Message: getI18nText("pages.page5.animationSequence.step9Message"),
            step9ACMessage: getI18nText("pages.page5.animationSequence.step9ACMessage"),
            step9BDMessage: getI18nText("pages.page5.animationSequence.step9BDMessage"),
            step9ProvenMessage: getI18nText("pages.page5.animationSequence.step9ProvenMessage"),
            step9DescriptionText: getI18nText("pages.page5.animationSequence.step9DescriptionText"),
            
            // Instruction text configuration
            instructionId: "page5-instruction",
            instructionText: getI18nText("pages.page5.animationSequence.instructionText"),
            
            // Property showcase configuration
            propertyShowcaseId: "page5-property-showcase" // ID of property showcase component
          }
        }
      },
      
      // Message Box (static textbox with same style as animation message box)
      // Text will be updated by the animation sequence component
      {
        id: "page5-messagebox",
        name: "page5-messagebox",
        type: "textbox",
        coordinates: [15, 675, 865, 790], // Centered position
        zIndex: 1000,
        props: {
          text: "", // Initially empty - will be updated by animation sequence
          backgroundColor: "#006666", // Dark teal
          color: "#FFFFFF", // White text
          padding: "20gc 30gc",
          borderRadius: "12gc",
          borderWidth: "1gc",
          borderStyle: "solid",
          borderColor: "#D4AF37", // Light gold/brown border
          fontSize: "32gc",
          lineHeight: "1.6",
          textAlign: "center", // Center aligned text
          // maxWidth removed to allow message box to expand based on coordinates
          boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center" // Center align content
        }
      },
      
      // Property Showcase Component in right container
      {
        id: "page5-property-showcase",
        name: "property-showcase",
        type: "custom",
        coordinates: [890, 20, 1585, 790], // Positioned inside right container
        zIndex: 100, // Higher z-index to ensure visibility
        props: {
          componentType: "PropertyShowcaseComponent",
          headerText: getI18nText("common.propertyShowcase.headerText"),
          headerDescription: getI18nText("common.propertyShowcase.headerDescription"),
          headerFontSize: "32gc", // Header font size
          headerFontColor: "#FFFFFF", // White color for header
          headerFontWeight: "bold", // Header font weight
          headerDescriptionFontSize: "28gc", // Header description font size
          headerDescriptionFontColor: "#FFFFFF", // White color for description
          headerDescriptionFontWeight: "normal", // Header description font weight
          properties: [
            {
              name: getI18nText("common.propertyShowcase.propertyNames.sides"),
              descriptions: []              
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.angles"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.diagonals"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.symmetry"),
              descriptions: []
            }
          ],
          currentProperty: 3, // Set to 1 to make Sides (first property) active
          currentDescription: 1, // Set to 1 to make first description active
          propertyNameColor: "#4DD0E1", // Bright blue for property names
          propertyNameFontSize: "28gc", // Font size for property names
          propertyNameFontWeight: "bold", // Font weight for property names
          propertyDescriptionFontSize: "28gc", // Font size for property descriptions
          propertyDescriptionFontColor: "#FFFFFF", // Color for property descriptions
          propertyDescriptionFontWeight: "normal", // Font weight for property descriptions
          propertyFontSize: "20gc", // Legacy prop (used as fallback)
          propertyFontColor: "#FFFFFF", // Legacy prop (used as fallback)
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
          containerBackgroundOpacity: 0.8, // More visible
          containerPadding: "20gc",
          propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
          accentBorderColor: "#FF9900", // Orange accent border
          accentBorderWidth: "3gc",
          gap: "12gc",
          propertyPadding: "16gc",
          descriptionsCollapsible: false, // Don't allow collapsing
          descriptionsDefaultExpanded: true // Show descriptions expanded
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
          get text() {
            return getI18nText("buttons.next");
          },
          enabled: false, // Disabled by default, will be enabled when animation completes
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
          enabled: false, // Hidden until page5AnimationComplete fires (same as next button)
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
    ],
    
    6: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page6-left-column",
        name: "page6-left-column",
        coordinates: [5, 5, 875, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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
      
      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page6-right-column",
        name: "page6-right-column",
        coordinates: [880, 5, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
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
          text: "",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page6-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [5, 5, 875, 800],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // Read from constants.js
            vertices: shapeConfig.vertices, // Read from constants.js
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // Will be shown in Step 1 of animation
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon, matching page 2)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            diagonalColor: "#FF6600", // Default color (overridden by individual diagonal colors)
            diagonal1: {
              color: "#00FF00", // Green
              thickness: "4gc",
              style: "solid"
            },
            diagonal2: {
              color: "#FF6600", // Orange
              thickness: "4gc",
              style: "solid"
            },
            diagonalEqualityAnimationConfig: {
              duration: 1500, // Duration of translation animation (ms)
              waitTime: 1000, // Wait time at target position (ms)
              cycles: 2, // Number of cycles to run
              message: "", // Empty message (no blinking message during animation)
              lineStyle: "dashed", // Dashed line for animation
              color: "#FF6600" // Orange color
            },
            vertexConfig: {
              color: "transparent", // Hide vertices by making them transparent
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation
              labels: ["A", "B", "C", "D"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc"
            },
            angleConfig: {
              show: "none", // Disable angle markers for page 6 (diagonals only)
              markerColor: "#FF6600",
              markerSize: "1gc",
              showText: false,
              textColor: "#FF6600",
              textSize: "12gc"
            },
            // Symmetry animation configuration
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              rotationalSymmetryAnimationConfig: {
                duration: 10000, // ms for full 360° rotation (increase to slow down)
                pauseDuration: 3000,
                overlayColor: '#FFFF00',
                matchColor: '#00FF00',
                centroidSize: '25gc',
                centroidColor: '#FF9900',
                angleFontSize: '30gc',
                angleColor: '#FFFFFF',
                lineStyle: 'dashed',
                angleLabel: getI18nText("common.rotationAngleLabel")
              }
            },
            // Side symbols for equality (ticks) and parallel (arrows)
            // Note: Arrow symbols for AB || CD will be added dynamically after animation
            sideSymbols: [
              // Tick marks for equal opposite sides (AB = CD)
              // { side: "AB", type: "tick", count: 1, color: "#000000", size: "12gc" },
              // { side: "CD", type: "tick", count: 1, color: "#000000", size: "12gc" },
              // Double ticks for other equal pair (BC = DA)
              // { side: "BC", type: "tick", count: 2, color: "#000000", size: "12gc" },
              // { side: "DA", type: "tick", count: 2, color: "#000000", size: "12gc" },
              // Arrow marks for parallel sides (AB || CD) - added dynamically after animation
              // { side: "AB", type: "arrow", count: 1, color: "#FF6600", size: "10gc", position: 0.5 },
              // { side: "CD", type: "arrow", count: 1, color: "#FF6600", size: "10gc", position: 0.5 },
            ],
            // Parallel lines animation config (for step 3)
            parallelLinesAnimationConfig: {
              duration: 1500,
              waitTime: 500,
              cycles: 2, // Show 2 cycles
              message: "", // Empty message - messagebox will show the message instead
              extensionColor: "#00FF00", // Green to match highlighted sides
              trackLength: 0.5, // Length of parallel tracks as ratio of side length (2 = tracks extend 2x the side length on each side)
              trackStrokeWidth: "3gc", // Stroke width for parallel tracks
              trackDashStyle: "dashed", // Dash style for parallel tracks
              trackDashSize: 0.5, // Size of dashes as multiplier of line thickness (smaller = smaller dashes)
              trackDashGap: 0.3, // Size of gaps as multiplier of line thickness (smaller = smaller gaps)
              animationSpeed: 1, // Speed of parallel animation (1 = normal, 0.5 = half speed, 2 = double speed)
              // Message position using absolute coordinates [x, y] - overrides messagePosition if provided
              // messageCoordinates removed - message will be shown in messagebox instead
              // Alternative: use messagePosition with percentages
              // messagePosition: {
              //   left: 50, // Percentage from left
              //   top: 10,  // Percentage from top
              //   offsetX: 0,
              //   offsetY: -8
              // }
            },
            // Opposite side equality animation config (for step 12)
            oppositeSideAnimationConfig: {
              duration: 1000, // Animation duration in milliseconds
              waitTime: 500, // Wait time at each position
              cycles: 2, // Number of cycles (2 cycles as requested)
              message: getI18nText("common.oppositeSidesEqualMessage"),
              lineStyle: "solid", // Line style for the animation - solid to retain side exactly as is
              color1: "#00FF00", // Color for pair 0 (AB/CD) - green to match highlighted sides
              color2: "#FF6600" // Color for pair 1 (BC/DA) - orange
            }
          }
        };
      })(),
      
      // Animation Sequence Component (controls the step-by-step animation)
      // 
      // CHRONOLOGICAL TIMELINE (relative to t=0):
      // 
      // t=0ms:     Step 0 - Initialization (wait 500ms for components to mount)
      // t=500ms:   Step 1 - Display message: "Opposite sides are parallel..." (1000ms)
      // t=1500ms:  Step 2 - Highlight sides AB & CD in green, make them blink (1000ms)
      // t=2500ms:  Step 3 - Parallel lines animation for AB & CD (~4000ms, 2 cycles)
      // t=6500ms:  Step 4 - Show confirmation "AB and CD are parallel!" (immediate)
      // t=7000ms:  Step 5 - Add dark green chevron arrow symbols to AB & CD (500ms after Step 4, arrows move with quad, stop blinking)
      // t=7000ms:  Step 6 - Wait before second pair (wait period: 1000ms, from t=7000ms to t=8000ms)
      // t=8000ms:  Step 7 - Highlight sides BC & DA in orange, make them blink (1000ms)
      // t=9000ms:  Step 8 - Parallel lines animation for BC & DA (~4000ms, 2 cycles)
      // t=13000ms: Step 9 - Show confirmation "BC and DA are parallel!" (immediate, stop blinking)
      // t=13500ms: Step 10 - Add dark orange double chevron arrow symbols to BC & DA (500ms after Step 9, arrows move with quad, stop blinking)
      //
      // Total sequence time: ~13500ms (13.5 seconds)
      {
        id: "page6-animation-sequence",
        name: "animation-sequence",
        type: "custom",
        coordinates: [0, 0, 1600, 900], // Full page overlay
        zIndex: 2000, // Above everything
        props: {
          componentType: "QuadAnimationSequenceComponent",
          sequenceConfig: {
            quadComponentId: "page6-shape-display", // ID of the quadrilateral component to animate
            messageBoxId: "page6-messagebox", // ID of the messagebox to update with messages
            initialDelay: 500, // Initial delay before starting (ms)
            completionEventName: "page6AnimationComplete", // Event name to dispatch on completion
            nextButtonId: "page6-next-button", // ID of next button to enable when animation completes
            nextButtonName: "next-button", // Element name of next button (for searching by data-element-name)
            tapAnimationId: "page6-tap-next", // ID of tap animation to enable when animation completes
            tapAnimationName: "tap-gif", // Element name of tap animation (for searching by data-element-name)
            propertyDescriptionFontSize: "28gc", // For dynamically added descriptions (same as property showcase; converted to px at 90%)
            
            // Step 1: Quad symmetry animation along the horizontal
            showSymmetryAnimation: true, // Enable symmetry animation in Step 1
            symmetryAxis: "horizontal", // 'horizontal' | 'vertical' - axis for first symmetry fold
            symmetryDuration: 2000, // Duration of symmetry animation (ms)
            symmetryHoldTime: 1500, // Time to hold at folded position (ms)
            
            // Step 1: Message before horizontal symmetry check
            step1SymmetryMessage: getI18nText("pages.page6.animationSequence.step1SymmetryMessage"),
            
            // Step 2: Message after horizontal symmetry animation
            step2SymmetryMessage: getI18nText("pages.page6.animationSequence.step2SymmetryMessage"),
            
            // Step 3: Message before vertical symmetry check; second symmetry animation (vertical)
            step3SymmetryMessage: getI18nText("pages.page6.animationSequence.step3SymmetryMessage"),
            
            // Step 3: Second symmetry animation (vertical)
            step3SymmetryAxis: "vertical", // Axis for second symmetry animation
            step3SymmetryCycles: 2, // Number of cycles for vertical symmetry animation
            
            // Step 4: Message after vertical symmetry animation
            step4SymmetryMessage: getI18nText("pages.page6.animationSequence.step4SymmetryMessage"),
            
            // Step 5: Update property showcase (Symmetry property, index 3)
            step5PropertyIndex: 3, // Symmetry property index
            step5DescriptionText: getI18nText("pages.page6.animationSequence.step5DescriptionText"),
            
            // Step 6: Rotational symmetry animation (removed per request)
            showRotationalSymmetry: false,
            step6RotationalMessage: getI18nText("pages.page6.animationSequence.step6RotationalMessage"),
            step6RotationalMatchMessage: getI18nText("pages.page6.animationSequence.step6RotationalMatchMessage"),
            step6RotationalProvenMessage: getI18nText("pages.page6.animationSequence.step6RotationalProvenMessage"),
            step6RotationalDescriptionText: getI18nText("pages.page6.animationSequence.step6RotationalDescriptionText"),
            
            // Instruction text configuration
            instructionId: "page6-instruction",
            instructionText: getI18nText("pages.page6.animationSequence.instructionText"),
            
            // Property showcase configuration
            propertyShowcaseId: "page6-property-showcase" // ID of property showcase component
          }
        }
      },
      
      // Message Box (static textbox with same style as animation message box)
      // Text will be updated by the animation sequence component
      {
        id: "page6-messagebox",
        name: "page6-messagebox",
        type: "textbox",
        coordinates: [15, 675, 865, 790], // Centered position
        zIndex: 1000,
        props: {
          text: "", // Initially empty - will be updated by animation sequence
          backgroundColor: "#006666", // Dark teal
          color: "#FFFFFF", // White text
          padding: "20gc 30gc",
          borderRadius: "12gc",
          borderWidth: "1gc",
          borderStyle: "solid",
          borderColor: "#D4AF37", // Light gold/brown border
          fontSize: "32gc",
          lineHeight: "1.6",
          textAlign: "center", // Center aligned text
          // maxWidth removed to allow message box to expand based on coordinates
          boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center" // Center align content
        }
      },
      
      // Property Showcase Component in right container
      {
        id: "page6-property-showcase",
        name: "property-showcase",
        type: "custom",
        coordinates: [890, 20, 1585, 790], // Positioned inside right container
        zIndex: 100, // Higher z-index to ensure visibility
        props: {
          componentType: "PropertyShowcaseComponent",
          headerText: getI18nText("common.propertyShowcase.headerText"),
          headerDescription: getI18nText("common.propertyShowcase.headerDescription"),
          headerFontSize: "32gc", // Header font size
          headerFontColor: "#FFFFFF", // White color for header
          headerFontWeight: "bold", // Header font weight
          headerDescriptionFontSize: "28gc", // Header description font size
          headerDescriptionFontColor: "#FFFFFF", // White color for description
          headerDescriptionFontWeight: "normal", // Header description font weight
          properties: [
            {
              name: getI18nText("common.propertyShowcase.propertyNames.sides"),
              descriptions: []              
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.angles"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.diagonals"),
              descriptions: []
            },
            {
              name: getI18nText("common.propertyShowcase.propertyNames.symmetry"),
              descriptions: []
            }
          ],
          currentProperty: 4, // Set to 1 to make Sides (first property) active
          currentDescription: 1, // Set to 1 to make first description active
          propertyNameColor: "#4DD0E1", // Bright blue for property names
          propertyNameFontSize: "28gc", // Font size for property names
          propertyNameFontWeight: "bold", // Font weight for property names
          propertyDescriptionFontSize: "28gc", // Font size for property descriptions
          propertyDescriptionFontColor: "#FFFFFF", // Color for property descriptions
          propertyDescriptionFontWeight: "normal", // Font weight for property descriptions
          propertyFontSize: "20gc", // Legacy prop (used as fallback)
          propertyFontColor: "#FFFFFF", // Legacy prop (used as fallback)
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
          containerBackgroundOpacity: 0.8, // More visible
          containerPadding: "20gc",
          propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
          accentBorderColor: "#FF9900", // Orange accent border
          accentBorderWidth: "3gc",
          gap: "12gc",
          propertyPadding: "16gc",
          descriptionsCollapsible: false, // Don't allow collapsing
          descriptionsDefaultExpanded: true // Show descriptions expanded
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
          enabled: false, // Disabled by default, will be enabled when animation completes
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
          enabled: false, // Hidden until page6AnimationComplete fires (same as next button)
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
    ],
    
    // ===== PAGE 7: ACTIVITY COMPLETION SUMMARY =====
    // Summary page showing all properties explored
    7: [
      // "Activity Completed!" title - Orange, centered
      {
        id: "page7-title",
        name: "page7-title",
        coordinates: [200, 50, 1400, 150],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.title"),
          fontSize: "48gc",
          color: "#FF9900", // Orange
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      
      // Combined body: subtitle + all properties + instruction - White, single text box
      {
        id: "page7-body",
        name: "page7-body",
        coordinates: [500, 150, 1500, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.bodyText"),
          fontSize: "30gc",
          color: "#FFFFFF", // White
          textAlign: "left",
          fontWeight: "normal",
          whiteSpace: "pre-line",
        },
      },
      
      // "Start Over" button - Orange with gradient, centered at bottom
      {
        id: "page7-start-over-button",
        name: "start-over-button",
        type: "button",
        coordinates: [600, 700, 1000, 800],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.startOver"),
          fontSize: "32gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "2px solid #FFAA00", // Lighter orange border
          textAlign: "center",
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            // Navigate to page 1 to restart
            navigateToPage(1, "restart");
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
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

