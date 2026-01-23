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
  // Fallback to default parallelogram
  return {
    quadType: "PARALLELOGRAM",
    vertices: [
      { row: 2, col: 2 },
      { row: 2, col: 8 },
      { row: 7, col: 9 },
      { row: 7, col: 3 }
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

    // Reset target page after a small delay to ensure components are mounted
    setTimeout(() => {
      resetPageStates(targetPage);
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

  // Helper function for i18n text (optimized)
  const getI18nText = (key, fallback, params = {}) => {
    return typeof i18n !== "undefined" ? i18n.t(key, params) : fallback;
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
          text: getI18nText("pages.page1.title", "Properties of a Parallelogram"),
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
          text: getI18nText("pages.page1.mainText", "Let's explore the side, angle, and diagonal properties of a parallelogram."),
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
          text: getI18nText("pages.page1.instructionText", 'Tap "Start" to start the activity.'),
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
          text: getI18nText("buttons.start", "Start"),
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

      //marking multiple text
      {
        id: "page2-marking-multple-text",
        name: "page2-marking-multple-text",
        coordinates: [5, 20, 875, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.markingMultipleText", ""),
          fontSize: "40gc",
          color: "#FFFF", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //the given polygon text
      {
        id: "page2-the-given-polygon-text",
        name: "page2-the-given-polygon-text",
        coordinates: [45, 140, 875, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.givenPolygonText", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //we mark text
      {
        id: "page2-we-mark-text",
        name: "page2-we-mark-text",
        coordinates: [45, 300, 875, 330],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.weMark", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //andTheSecond Set text
      {
        id: "page2-and-the-second-set",
        name: "page2-and-the-second-set",
        coordinates: [45, 470, 875, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.andTheSecondSet", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
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
          text: getI18nText("pages.page2.instruction", "Tap » to explore side properties."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // // Display Shape (no build mode) - Reads shape configuration from constants.js
      // (() => {
      //   const shapeConfig = getShapeConfig();
      //   return {
      //     id: "page2-shape-display",
      //     name: "shape-display",
      //   type: "custom",
      //     coordinates: [5, 5, 875, 800],
      //   zIndex: 40,
      //   props: {
      //     componentType: "QuadrilateralComponent",
      //       mode: "default", // Default mode (not build mode)
      //       quadType: shapeConfig.quadType, // Read from constants.js
      //       vertices: shapeConfig.vertices, // Read from constants.js
      //       gridRows: shapeConfig.gridRows, // Read from constants.js
      //       gridCols: shapeConfig.gridCols, // Read from constants.js
      //     showGrid: false,
      //     showDiagonals: false,
      //     showPropertyPanel: false,
      //     containerBorder: false,
      //       draggable: false, // Set to true if you want the shape to be draggable
      //       edgeColor: "#F08080", // Border color (light coral/salmon)
      //       edgeThickness: "6gc", // Increased border width
      //       fillColor: "#25CEFC", // Fill color (light blue/cyan)
      //     vertexConfig: {
      //         color: "transparent", // Hide vertices by making them transparent
      //         showLabels: true, // Show vertex labels
      //         animated: false, // Disable pulsating animation
      //       labels: ["A", "B", "C", "D"],
      //         labelColor: "#FFFFFF",
      //         labelSize: "36gc",
      //         labelOffset: "40gc"
      //     },
      //     angleConfig: {
      //       show: "all",
      //       markerColor: "#FF6600",
      //       markerSize: "1gc",
      //       showText: false,
      //       textColor: "#FF6600",
      //       textSize: "12gc"
      //       }
      //     }
      //   };
      // })(),

      // // Property Showcase Component in right container
      // {
      //   id: "page2-property-showcase",
      //   name: "property-showcase",
      //   type: "custom",
      //   coordinates: [890, 20, 1585, 790], // Positioned inside right container
      //   zIndex: 100, // Higher z-index to ensure visibility
      //   props: {
      //     componentType: "PropertyShowcaseComponent",
      //     headerText: getI18nText("common.propertyShowcase.headerText", "Properties of a Parallelogram"),
      //     headerDescription: getI18nText("common.propertyShowcase.headerDescription", "A parallelogram is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon"),
      //     headerFontSize: "32gc", // Header font size
      //     headerFontColor: "#FFFFFF", // White color for header
      //     headerFontWeight: "bold", // Header font weight
      //     headerDescriptionFontSize: "28gc", // Header description font size
      //     headerDescriptionFontColor: "#FFFFFF", // White color for description
      //     headerDescriptionFontWeight: "normal", // Header description font weight
      //     properties: [
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.sides", "Sides"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.angles", "Angles"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.diagonals", "Diagonals"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.symmetry", "Symmetry"),
      //         descriptions: []
      //       }
      //     ],
      //     currentProperty: 0,
      //     currentDescription: null,
      //     propertyNameColor: "#4DD0E1", // Bright blue for property names
      //     propertyNameFontSize: "28gc",
      //     propertyFontSize: "20gc",
      //     propertyFontColor: "#FFFFFF",
      //     containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
      //     containerBackgroundOpacity: 0.8, // More visible
      //     containerPadding: "20gc",
      //     propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
      //     accentBorderColor: "#FF9900", // Orange accent border
      //     accentBorderWidth: "3gc",
      //     gap: "12gc",
      //     propertyPadding: "16gc",
      //     descriptionsCollapsible: false, // Don't allow collapsing
      //     descriptionsDefaultExpanded: true // Show descriptions expanded
      //   }
      // },

      // // Message Box (static textbox with same style as animation message box)
      // {
      //   id: "page2-messagebox",
      //   name: "page2-messagebox",
      //   type: "textbox",
      //   coordinates: [15, 675, 865, 790], // Centered position
      //   zIndex: 1000,
      //   props: {
      //     text: getI18nText("pages.page2.messageBox", "The given quadrilateral has four sides"),
      //     backgroundColor: "#006666", // Dark teal
      //     color: "#FFFFFF", // White text
      //     padding: "20gc 30gc",
      //     borderRadius: "12gc",
      //     borderWidth: "1gc",
      //     borderStyle: "solid",
      //     borderColor: "#D4AF37", // Light gold/brown border
      //     fontSize: "32gc",
      //     lineHeight: "1.6",
      //     textAlign: "center", // Center aligned text
      //     boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center" // Center align content
      //   }
      // },

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
            return getI18nText("buttons.next", "»");
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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

      //marking multiple text
      {
        id: "page3-marking-multple-text",
        name: "page3-marking-multple-text",
        coordinates: [5, 20, 875, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.markingMultipleText", ""),
          fontSize: "40gc",
          color: "#FFFF", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //the given polygon text
      {
        id: "page3-the-given-polygon-text",
        name: "page3-the-given-polygon-text",
        coordinates: [45, 140, 875, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.givenPolygonText", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //we mark text
      {
        id: "page3-we-mark-text",
        name: "page3-we-mark-text",
        coordinates: [45, 300, 875, 330],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.weMark", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //andTheSecond Set text
      {
        id: "page3-and-the-second-set",
        name: "page3-and-the-second-set",
        coordinates: [45, 470, 875, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.andTheSecondSet", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
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
          text: getI18nText("pages.page3.instruction", "Tap » to explore side properties."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // // Display Shape (no build mode) - Reads shape configuration from constants.js
      // (() => {
      //   const shapeConfig = getShapeConfig();
      //   return {
      //     id: "page3-shape-display",
      //     name: "shape-display",
      //   type: "custom",
      //     coordinates: [5, 5, 875, 800],
      //   zIndex: 40,
      //   props: {
      //     componentType: "QuadrilateralComponent",
      //       mode: "default", // Default mode (not build mode)
      //       quadType: shapeConfig.quadType, // Read from constants.js
      //       vertices: shapeConfig.vertices, // Read from constants.js
      //       gridRows: shapeConfig.gridRows, // Read from constants.js
      //       gridCols: shapeConfig.gridCols, // Read from constants.js
      //     showGrid: false,
      //     showDiagonals: false,
      //     showPropertyPanel: false,
      //     containerBorder: false,
      //       draggable: false, // Set to true if you want the shape to be draggable
      //       edgeColor: "#F08080", // Border color (light coral/salmon)
      //       edgeThickness: "6gc", // Increased border width
      //       fillColor: "#25CEFC", // Fill color (light blue/cyan)
      //     vertexConfig: {
      //         color: "transparent", // Hide vertices by making them transparent
      //         showLabels: true, // Show vertex labels
      //         animated: false, // Disable pulsating animation
      //       labels: ["A", "B", "C", "D"],
      //         labelColor: "#FFFFFF",
      //         labelSize: "36gc",
      //         labelOffset: "40gc"
      //     },
      //     angleConfig: {
      //       show: "all",
      //       markerColor: "#FF6600",
      //       markerSize: "1gc",
      //       showText: false,
      //       textColor: "#FF6600",
      //       textSize: "12gc"
      //       }
      //     }
      //   };
      // })(),

      // // Property Showcase Component in right container
      // {
      //   id: "page3-property-showcase",
      //   name: "property-showcase",
      //   type: "custom",
      //   coordinates: [890, 20, 1585, 790], // Positioned inside right container
      //   zIndex: 100, // Higher z-index to ensure visibility
      //   props: {
      //     componentType: "PropertyShowcaseComponent",
      //     headerText: getI18nText("common.propertyShowcase.headerText", "Properties of a Parallelogram"),
      //     headerDescription: getI18nText("common.propertyShowcase.headerDescription", "A parallelogram is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon"),
      //     headerFontSize: "32gc", // Header font size
      //     headerFontColor: "#FFFFFF", // White color for header
      //     headerFontWeight: "bold", // Header font weight
      //     headerDescriptionFontSize: "28gc", // Header description font size
      //     headerDescriptionFontColor: "#FFFFFF", // White color for description
      //     headerDescriptionFontWeight: "normal", // Header description font weight
      //     properties: [
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.sides", "Sides"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.angles", "Angles"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.diagonals", "Diagonals"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.symmetry", "Symmetry"),
      //         descriptions: []
      //       }
      //     ],
      //     currentProperty: 0,
      //     currentDescription: null,
      //     propertyNameColor: "#4DD0E1", // Bright blue for property names
      //     propertyNameFontSize: "28gc",
      //     propertyFontSize: "20gc",
      //     propertyFontColor: "#FFFFFF",
      //     containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
      //     containerBackgroundOpacity: 0.8, // More visible
      //     containerPadding: "20gc",
      //     propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
      //     accentBorderColor: "#FF9900", // Orange accent border
      //     accentBorderWidth: "3gc",
      //     gap: "12gc",
      //     propertyPadding: "16gc",
      //     descriptionsCollapsible: false, // Don't allow collapsing
      //     descriptionsDefaultExpanded: true // Show descriptions expanded
      //   }
      // },

      // // Message Box (static textbox with same style as animation message box)
      // {
      //   id: "page3-messagebox",
      //   name: "page3-messagebox",
      //   type: "textbox",
      //   coordinates: [15, 675, 865, 790], // Centered position
      //   zIndex: 1000,
      //   props: {
      //     text: getI18nText("pages.page3.messageBox", "The given quadrilateral has four sides"),
      //     backgroundColor: "#006666", // Dark teal
      //     color: "#FFFFFF", // White text
      //     padding: "20gc 30gc",
      //     borderRadius: "12gc",
      //     borderWidth: "1gc",
      //     borderStyle: "solid",
      //     borderColor: "#D4AF37", // Light gold/brown border
      //     fontSize: "32gc",
      //     lineHeight: "1.6",
      //     textAlign: "center", // Center aligned text
      //     boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center" // Center align content
      //   }
      // },

      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page3-build-coordinates",
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
      //   id: "page3-instruction-1",
      //   name: "page3-instruction-1",
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
      //   id: "page3-instruction-2",
      //   name: "page3-instruction-2",
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
      //   id: "page3-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page3-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

      // Navigation buttons
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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

      // {
      //   id: "page3-page-title",
      //   name: "page3-page-title",
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

      //marking multiple text
      {
        id: "page4-marking-multple-text",
        name: "page4-marking-multple-text",
        coordinates: [5, 20, 875, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.markingMultipleText", ""),
          fontSize: "40gc",
          color: "#FFFF", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //the given polygon text
      {
        id: "page4-the-given-polygon-text",
        name: "page4-the-given-polygon-text",
        coordinates: [45, 140, 875, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.givenPolygonText", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //we mark text
      {
        id: "page4-we-mark-text",
        name: "page4-we-mark-text",
        coordinates: [45, 300, 875, 330],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.weMark", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      //andTheSecond Set text
      {
        id: "page4-and-the-second-set",
        name: "page4-and-the-second-set",
        coordinates: [45, 470, 875, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.andTheSecondSet", ""),
          fontSize: "36gc",
          color: "#FFFF", // Orange color
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
          allowHTML: true, // Allow HTML for styling shape name in white
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
          text: getI18nText("pages.page4.instruction", "Tap » to explore side properties."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // // Display Shape (no build mode) - Reads shape configuration from constants.js
      // (() => {
      //   const shapeConfig = getShapeConfig();
      //   return {
      //     id: "page4-shape-display",
      //     name: "shape-display",
      //   type: "custom",
      //     coordinates: [5, 5, 875, 800],
      //   zIndex: 40,
      //   props: {
      //     componentType: "QuadrilateralComponent",
      //       mode: "default", // Default mode (not build mode)
      //       quadType: shapeConfig.quadType, // Read from constants.js
      //       vertices: shapeConfig.vertices, // Read from constants.js
      //       gridRows: shapeConfig.gridRows, // Read from constants.js
      //       gridCols: shapeConfig.gridCols, // Read from constants.js
      //     showGrid: false,
      //     showDiagonals: false,
      //     showPropertyPanel: false,
      //     containerBorder: false,
      //       draggable: false, // Set to true if you want the shape to be draggable
      //       edgeColor: "#F08080", // Border color (light coral/salmon)
      //       edgeThickness: "6gc", // Increased border width
      //       fillColor: "#25CEFC", // Fill color (light blue/cyan)
      //     vertexConfig: {
      //         color: "transparent", // Hide vertices by making them transparent
      //         showLabels: true, // Show vertex labels
      //         animated: false, // Disable pulsating animation
      //       labels: ["A", "B", "C", "D"],
      //         labelColor: "#FFFFFF",
      //         labelSize: "36gc",
      //         labelOffset: "40gc"
      //     },
      //     angleConfig: {
      //       show: "all",
      //       markerColor: "#FF6600",
      //       markerSize: "1gc",
      //       showText: false,
      //       textColor: "#FF6600",
      //       textSize: "12gc"
      //       }
      //     }
      //   };
      // })(),

      // // Property Showcase Component in right container
      // {
      //   id: "page4-property-showcase",
      //   name: "property-showcase",
      //   type: "custom",
      //   coordinates: [890, 20, 1585, 790], // Positioned inside right container
      //   zIndex: 100, // Higher z-index to ensure visibility
      //   props: {
      //     componentType: "PropertyShowcaseComponent",
      //     headerText: getI18nText("common.propertyShowcase.headerText", "Properties of a Parallelogram"),
      //     headerDescription: getI18nText("common.propertyShowcase.headerDescription", "A parallelogram is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon"),
      //     headerFontSize: "32gc", // Header font size
      //     headerFontColor: "#FFFFFF", // White color for header
      //     headerFontWeight: "bold", // Header font weight
      //     headerDescriptionFontSize: "28gc", // Header description font size
      //     headerDescriptionFontColor: "#FFFFFF", // White color for description
      //     headerDescriptionFontWeight: "normal", // Header description font weight
      //     properties: [
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.sides", "Sides"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.angles", "Angles"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.diagonals", "Diagonals"),
      //         descriptions: []
      //       },
      //       {
      //         name: getI18nText("common.propertyShowcase.propertyNames.symmetry", "Symmetry"),
      //         descriptions: []
      //       }
      //     ],
      //     currentProperty: 0,
      //     currentDescription: null,
      //     propertyNameColor: "#4DD0E1", // Bright blue for property names
      //     propertyNameFontSize: "28gc",
      //     propertyFontSize: "20gc",
      //     propertyFontColor: "#FFFFFF",
      //     containerBackgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
      //     containerBackgroundOpacity: 0.8, // More visible
      //     containerPadding: "20gc",
      //     propertyContainerBackgroundColor: "rgba(0, 0, 0, 0.2)",
      //     accentBorderColor: "#FF9900", // Orange accent border
      //     accentBorderWidth: "3gc",
      //     gap: "12gc",
      //     propertyPadding: "16gc",
      //     descriptionsCollapsible: false, // Don't allow collapsing
      //     descriptionsDefaultExpanded: true // Show descriptions expanded
      //   }
      // },

      // // Message Box (static textbox with same style as animation message box)
      // {
      //   id: "page4-messagebox",
      //   name: "page4-messagebox",
      //   type: "textbox",
      //   coordinates: [15, 675, 865, 790], // Centered position
      //   zIndex: 1000,
      //   props: {
      //     text: getI18nText("pages.page4.messageBox", "The given quadrilateral has four sides"),
      //     backgroundColor: "#006666", // Dark teal
      //     color: "#FFFFFF", // White text
      //     padding: "20gc 30gc",
      //     borderRadius: "12gc",
      //     borderWidth: "1gc",
      //     borderStyle: "solid",
      //     borderColor: "#D4AF37", // Light gold/brown border
      //     fontSize: "32gc",
      //     lineHeight: "1.6",
      //     textAlign: "center", // Center aligned text
      //     boxShadow: "0 4gc 8gc rgba(0, 0, 0, 0.3)",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center" // Center align content
      //   }
      // },

      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page4-build-coordinates",
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
      //   id: "page4-instruction-1",
      //   name: "page4-instruction-1",
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
      //   id: "page4-instruction-2",
      //   name: "page4-instruction-2",
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
      //   id: "page4-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page4-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

      // Navigation buttons
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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
          text: getI18nText("pages.page7.title", "Activity Completed!"),
          fontSize: "48gc",
          color: "#FF9900", // Orange
          textAlign: "center",
          fontWeight: "bold",
        },
      },

      // "You've explored the key properties of a parallelogram!" subtitle - White, centered
      {
        id: "page7-subtitle",
        name: "page7-subtitle",
        coordinates: [200, 175, 1400, 300],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.subtitle", "You've explored the key properties of a parallelogram!"),
          fontSize: "36gc",
          color: "#FFFFFF", // White
          textAlign: "center",
          fontWeight: "normal",
        },
      },

      // Property list container - White text, numbered
      {
        id: "page7-property-1",
        name: "page7-property-1",
        coordinates: [400, 300, 1200, 350],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.property1", "1. Opposite sides are equal and parallel."),
          fontSize: "32gc",
          color: "#FFFFFF", // White
          textAlign: "left",
          fontWeight: "normal",
        },
      },

      {
        id: "page7-property-2",
        name: "page7-property-2",
        coordinates: [400, 350, 1200, 400],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.property2", "2. Opposite angles are equal."),
          fontSize: "32gc",
          color: "#FFFFFF", // White
          textAlign: "left",
          fontWeight: "normal",
        },
      },

      {
        id: "page7-property-3",
        name: "page7-property-3",
        coordinates: [400, 400, 1200, 450],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.property3", "3. Diagonals are unequal."),
          fontSize: "32gc",
          color: "#FFFFFF", // White
          textAlign: "left",
          fontWeight: "normal",
        },
      },

      {
        id: "page7-property-4",
        name: "page7-property-4",
        coordinates: [400, 450, 1200, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.property4", "4. It has no lines of symmetry."),
          fontSize: "32gc",
          color: "#FFFFFF", // White
          textAlign: "left",
          fontWeight: "normal",
        },
      },

      // Instruction text - White, centered
      {
        id: "page7-instruction",
        name: "page7-instruction",
        coordinates: [200, 550, 1400, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.instruction", 'Tap "Start Over" to restart the activity.'),
          fontSize: "36gc",
          color: "#FFFFFF", // White
          textAlign: "center",
          fontWeight: "normal",
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
          text: getI18nText("buttons.startOver", "Start Over"),
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
 */
const resetPageStates = (pageNumber) => {
  if (typeof window === 'undefined') return;

  console.log(`🔄 Resetting all states for page ${pageNumber}`);

  try {
    // 1. Reset quadrilateral animation states
    if (window.quadrilateralAnimations) {
      Object.keys(window.quadrilateralAnimations).forEach(quadId => {
        const animObj = window.quadrilateralAnimations[quadId];
        // Stop all animations - call methods directly on the element if available
        const quadElement = document.getElementById(quadId);
        if (quadElement) {
          if (quadElement.stopParallelLinesAnimation) quadElement.stopParallelLinesAnimation();
          if (quadElement.stopOppositeSideAnimation) quadElement.stopOppositeSideAnimation();
          if (quadElement.stopAngleEqualityAnimation) quadElement.stopAngleEqualityAnimation();
          if (quadElement.stopDiagonalEqualityAnimation) quadElement.stopDiagonalEqualityAnimation();
          if (quadElement.stopSymmetryFoldAnimation) quadElement.stopSymmetryFoldAnimation();
        }
        // Also try via registry methods
        if (animObj.stopParallelLinesAnimation) animObj.stopParallelLinesAnimation();
        if (animObj.stopOppositeSideAnimation) animObj.stopOppositeSideAnimation();
        if (animObj.stopAngleEqualityAnimation) animObj.stopAngleEqualityAnimation();
        if (animObj.stopDiagonalEqualityAnimation) animObj.stopDiagonalEqualityAnimation();
        if (animObj.stopSymmetryFoldAnimation) animObj.stopSymmetryFoldAnimation();
        // Reset side colors and blinking
        if (animObj.updateSideColors) {
          // Reset all sides to default (no blink, original colors)
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

    // 9. Dispatch reset event for components to listen
    window.dispatchEvent(new CustomEvent('pageStateReset', {
      detail: { page: pageNumber }
    }));

    // Also dispatch a global reset event that all components can listen to
    window.dispatchEvent(new CustomEvent('globalPageReset', {
      detail: { page: pageNumber }
    }));

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

    // Listen for page change events and reset states
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        // Reset states after a delay to ensure components are mounted
        // This ensures clean state when navigating to a new page
        setTimeout(() => {
          resetPageStates(pageNumber);
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
            getI18nText("messages.navigationReset", "Resetting to question 1")
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
            getI18nText(
              "messages.navigationComplete",
              "Complete app reset completed - ready for new question"
            )
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
        return getI18nText("buttons.startOver", "Start Over");
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
          confirm(
            getI18nText(
              "messages.pageStatesCleared",
              "Page states have been cleared. Reload the page to start fresh?"
            )
          )
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

