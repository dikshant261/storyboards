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
      //48cm
      {
        id: "page2-diag-length-48",
        name: "diag-length-48",
        type: "textbox",
        coordinates: [670, 330, 920, 370],
        zIndex: 1000,
        props: {
          text: "48 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14cm
      {
        id: "page2-diag-length-14",
        name: "diag-length-14",
        type: "textbox",
        coordinates: [635, 220, 790, 300],
        zIndex: 1000,
        props: {
          text: "14 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14 cm bottom
      {
        id: "page2-diag-length-14-bottom",
        name: "diag-length-14-bottom",
        type: "textbox",
        coordinates: [635, 410, 790, 460],
        zIndex: 1000,
        props: {
          text: "14 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 cm
      {
        id: "page2-side-length-12",
        name: "side-length-12",
        type: "textbox",
        coordinates: [445, 280, 690, 310],
        zIndex: 1000,
        props: {
          text: "12 cm",
          fontSize: "34gc",
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
          coordinates: [370, 5, 845, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 2
            vertices: [
              { row: 1, col: 6 },    // Top (higher)
              { row: 5, col: 15 },   // Right (far right for extended base)
              { row: 9, col: 6 },    // Bottom (slightly right for shape tilt)
              { row: 5, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#3498DB", // Fill color (light blue/cyan)
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

      // // Message Box (static textbox with same style as animation message box)
      {
        id: "page2-messagebox",
        name: "page2-messagebox",
        type: "custom",
        coordinates: [325, 580, 1175, 630], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.messageBox"),
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

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






      //48cm
      {
        id: "page3-diag-length-48",
        name: "diag-length-48",
        type: "textbox",
        coordinates: [670, 330, 920, 370],
        zIndex: 1000,
        props: {
          text: "48 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14cm
      {
        id: "page3-diag-length-14",
        name: "diag-length-14",
        type: "textbox",
        coordinates: [635, 220, 790, 300],
        zIndex: 1000,
        props: {
          text: "14 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14 cm bottom
      {
        id: "page3-diag-length-14-bottom",
        name: "diag-length-14-bottom",
        type: "textbox",
        coordinates: [635, 410, 790, 460],
        zIndex: 1000,
        props: {
          text: "14 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 cm
      {
        id: "page3-side-length-12",
        name: "side-length-12",
        type: "textbox",
        coordinates: [445, 280, 690, 310],
        zIndex: 1000,
        props: {
          text: "12 cm",
          fontSize: "34gc",
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
          coordinates: [370, 5, 845, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 2
            vertices: [
              { row: 1, col: 6 },    // Top (higher)
              { row: 5, col: 15 },   // Right (far right for extended base)
              { row: 9, col: 6 },    // Bottom (slightly right for shape tilt)
              { row: 5, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#00FFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFF00", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#3498DB", // Fill color (light blue/cyan)
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
      //blue-line line
      {
        id: "page3-blue-line",
        name: "page3-blue-line",
        coordinates: [410, 200, 660, 280], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/blueLine.png",
        },
      },
      // Kite 1d2 label
      {
        id: "page3-kite-2d2-label",
        name: "page3-kite-2d2-label",
        type: "textbox",
        coordinates: [100, 220, 400, 260],
        zIndex: 1000,
        props: {
          text: getI18nText("kite1D2"),
          fontSize: "38gc",
          color: "#00FFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //yellow line
      {
        id: "page3-yellow-line",
        name: "page3-yellow-line",
        coordinates: [350, 325, 650, 425], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/yelloLine.png",
        },
      },
      // Kite 1d1 label
      {
        id: "page3-kite-1d1-label",
        name: "page3-kite-1d1-label",
        type: "textbox",
        coordinates: [100, 390, 400, 425],
        zIndex: 1000,
        props: {
          text: getI18nText("kite1D1"),
          fontSize: "38gc",
          color: "#FFFF00",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // // Message Box (static textbox with same style as animation message box)
      {
        id: "page3-messagebox",
        name: "page3-messagebox",
        type: "custom",
        coordinates: [325, 580, 1175, 630], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page3.messageBox"),
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //quiz panel
      //quiz panel
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [1130, 105, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page3.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page3.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '32gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 40, // Feedback row: 15%
          optionButtonWidth: 98,
          optionButtonHeight: 80,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page3.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
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
          initialVisible: false
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
      //48cm
      {
        id: "page4-diag-length-48",
        name: "diag-length-48",
        type: "textbox",
        coordinates: [670, 330, 920, 370],
        zIndex: 1000,
        props: {
          text: "48 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14cm
      {
        id: "page4-diag-length-14",
        name: "diag-length-14",
        type: "textbox",
        coordinates: [635, 220, 790, 300],
        zIndex: 1000,
        props: {
          text: "14 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14 cm bottom
      {
        id: "page4-diag-length-14-bottom",
        name: "diag-length-14-bottom",
        type: "textbox",
        coordinates: [635, 410, 790, 460],
        zIndex: 1000,
        props: {
          text: "14 cm",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //12 cm
      {
        id: "page4-side-length-12",
        name: "side-length-12",
        type: "textbox",
        coordinates: [445, 280, 690, 310],
        zIndex: 1000,
        props: {
          text: "12 cm",
          fontSize: "34gc",
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
          coordinates: [370, 5, 845, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 2
            vertices: [
              { row: 1, col: 6 },    // Top (higher)
              { row: 5, col: 15 },   // Right (far right for extended base)
              { row: 9, col: 6 },    // Bottom (slightly right for shape tilt)
              { row: 5, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#00FFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFF00", thickness: "5gc", style: "dashed" },

            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#3498DB", // Fill color (light blue/cyan)
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
      //blue-line line
      {
        id: "page4-blue-line",
        name: "page4-blue-line",
        coordinates: [410, 200, 660, 280], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/blueLine.png",
        },
      },
      // Kite 1d2 label
      {
        id: "page4-kite-2d2-label",
        name: "page4-kite-2d2-label",
        type: "textbox",
        coordinates: [100, 220, 400, 260],
        zIndex: 1000,
        props: {
          text: getI18nText("kite1D2"),
          fontSize: "38gc",
          color: "#00FFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //yellow line
      {
        id: "page4-yellow-line",
        name: "page4-yellow-line",
        coordinates: [350, 325, 650, 425], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/yelloLine.png",
        },
      },
      // Kite 1d1 label
      {
        id: "page4-kite-1d1-label",
        name: "page4-kite-1d1-label",
        type: "textbox",
        coordinates: [100, 390, 400, 425],
        zIndex: 1000,
        props: {
          text: getI18nText("kite1D1"),
          fontSize: "38gc",
          color: "#FFFF00",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // // Message Box (static textbox with same style as animation message box)
      {
        id: "page4-messagebox",
        name: "page4-messagebox",
        type: "custom",
        coordinates: [325, 580, 1175, 630], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page4.messageBox"),
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //equal to sign '='
      {
        id: "page4-equal-sign",
        name: "page4-equal-sign",
        type: "custom",
        coordinates: [775, 650, 805, 750], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "=",
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //tile component -3
      {
        id: "page4-tile-1",
        name: "page4-tile-1",
        type: "tile",
        coordinates: [825, 650, 980, 750], // Centered horizontally in left panel (gap reduced to 10gc)
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
          fontSize: "60gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //cm^2 text
      {
        id: "page4-cm-text",
        name: "page4-cm-text",
        type: "custom",
        coordinates: [1010, 650, 1030, 750], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "\\text{cm}{^2}",
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

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
          initialEnabled: false, // Disabled until quiz is completed
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
          initialVisible: false
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
        id: "page5-instruction",
        name: "page5-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.instruction"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      //22m (diagonal AC)
      {
        id: "page5-diag-length-22",
        name: "diag-length-22",
        type: "textbox",
        coordinates: [660, 360, 900, 400],
        zIndex: 1000,
        props: {
          text: "22 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6m (upper segment of diagonal DB)
      {
        id: "page5-diag-length-6",
        name: "diag-length-6",
        type: "textbox",
        coordinates: [540, 230, 670, 280],
        zIndex: 1000,
        props: {
          text: "6 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14m (lower segment of diagonal DB)
      {
        id: "page5-diag-length-14-bottom",
        name: "diag-length-14-bottom",
        type: "textbox",
        coordinates: [700, 190, 840, 230],
        zIndex: 1000,
        props: {
          text: "12 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // optional side label
      {
        id: "page5-side-length-12",
        name: "side-length-12",
        type: "textbox",
        coordinates: [445, 330, 690, 370],
        zIndex: 1000,
        props: {
          text: "12 m",
          fontSize: "34gc",
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
          name: "shape-display",
          type: "custom",
          coordinates: [370, 5, 845, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 5
            vertices: [
              { row: 2, col: 4 },    // Top-left
              { row: 1.5, col: 12 }, // Top-right
              { row: 8.5, col: 13 },   // Bottom-right
              { row: 8.5, col: 2 }   // Bottom-left
            ], // Kite vertices matching provided diagram
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#FFFFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#3498DB", // Fill color (light blue/cyan)
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
      // Right angle top 1
      {
        id: "page5-right-angle-top-1",
        name: "page5-right-angle-top-1",
        type: "textbox",
        coordinates: [722, 277, 727, 299], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      //right angle right 1
      {
        id: "page5-right-angle-right-1",
        name: "page5-right-angle-right-1",
        type: "textbox",
        coordinates: [726, 285, 756, 290], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      // Right angle top 2
      {
        id: "page5-right-angle-top-2",
        name: "page5-right-angle-top-2",
        type: "textbox",
        coordinates: [762, 302, 767, 333], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      //right angle right 2
      {
        id: "page5-right-angle-right-2",
        name: "page5-right-angle-right-2",
        type: "textbox",
        coordinates: [749, 295, 776, 300], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(41deg)", // Rotate to match the slant of the side


        },
      },
      // // Message Box (static textbox with same style as animation message box)
      {
        id: "page5-messagebox",
        name: "page5-messagebox",
        type: "custom",
        coordinates: [325, 580, 1175, 630], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page5.messageBox"),
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },

      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page5-build-coordinates",
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
      //   id: "page5-instruction-1",
      //   name: "page5-instruction-1",
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
      //   id: "page5-instruction-2",
      //   name: "page5-instruction-2",
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
      //   id: "page5-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page5-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

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
      //22m (diagonal AC)
      {
        id: "page6-diag-length-22",
        name: "diag-length-22",
        type: "textbox",
        coordinates: [660, 360, 900, 400],
        zIndex: 1000,
        props: {
          text: "22 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6m (upper segment of diagonal DB)
      {
        id: "page6-diag-length-6",
        name: "diag-length-6",
        type: "textbox",
        coordinates: [540, 230, 670, 280],
        zIndex: 1000,
        props: {
          text: "6 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14m (lower segment of diagonal DB)
      {
        id: "page6-diag-length-14-bottom",
        name: "diag-length-14-bottom",
        type: "textbox",
        coordinates: [700, 190, 840, 230],
        zIndex: 1000,
        props: {
          text: "12 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // optional side label
      {
        id: "page6-side-length-12",
        name: "side-length-12",
        type: "textbox",
        coordinates: [445, 330, 690, 370],
        zIndex: 1000,
        props: {
          text: "12 m",
          fontSize: "34gc",
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
          coordinates: [370, 5, 845, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 5
            vertices: [
              { row: 2, col: 4 },    // Top-left
              { row: 1.5, col: 12 }, // Top-right
              { row: 8.5, col: 13 },   // Bottom-right
              { row: 8.5, col: 2 }   // Bottom-left
            ], // Kite vertices matching provided diagram
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFF00", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#00FFFF", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#3498DB", // Fill color (light blue/cyan)
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
      // Right angle top 1
      {
        id: "page6-right-angle-top-1",
        name: "page6-right-angle-top-1",
        type: "textbox",
        coordinates: [722, 277, 727, 299], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      //right angle right 1
      {
        id: "page6-right-angle-right-1",
        name: "page6-right-angle-right-1",
        type: "textbox",
        coordinates: [726, 285, 756, 290], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      // Right angle top 2
      {
        id: "page6-right-angle-top-2",
        name: "page6-right-angle-top-2",
        type: "textbox",
        coordinates: [762, 302, 767, 333], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      //right angle right 2
      {
        id: "page6-right-angle-right-2",
        name: "page6-right-angle-right-2",
        type: "textbox",
        coordinates: [749, 295, 776, 300], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(41deg)", // Rotate to match the slant of the side


        },
      },
      //blue-line line
      {
        id: "page6-blue-line",
        name: "page6-blue-line",
        coordinates: [400, 385, 603, 445],
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/blueLine2.png",
        },
      },
      // Kite 2d1 label
      {
        id: "page6-kite-2d2-label",
        name: "page6-kite-2d2-label",
        type: "textbox",
        coordinates: [110, 410, 410, 435],
        zIndex: 1000,
        props: {
          text: getI18nText("kite2D2"),
          fontSize: "38gc",
          color: "#00FFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //yellow line
      {
        id: "page6-yellow-line",
        name: "page6-yellow-line",
        coordinates: [380, 170, 590, 250],
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/yelloLine2.png",
        },
      },
      // Kite 2d2 label
      {
        id: "page6-kite-2d1-label",
        name: "page6-kite-2d2-label",
        type: "textbox",
        coordinates: [120, 230, 420, 270],
        zIndex: 1000,
        props: {
          text: getI18nText("kite2D1"),
          fontSize: "38gc",
          color: "#FFFF00",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },


      // // Message Box (static textbox with same style as animation message box)
      {
        id: "page6-messagebox",
        name: "page6-messagebox",
        type: "custom",
        coordinates: [325, 580, 1175, 630], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page6.messageBox"),
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //quiz panel
      //quiz panel
      {
        id: 'page6-quiz-panel',
        name: 'page6-quiz-panel',
        type: 'custom',
        coordinates: [1130, 105, 1595, 800], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page6-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: getI18nText("pages.page6.quizPanel.quizSubType"), // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page6.quizPanel.questionText"),
          feedbackText: '',
          contentFontSize: '32gc',
          headerRowHeight: 0, // No header row
          questionRowHeight: 0, // Question row: 15%
          optionsRowHeight: 60, // Options row: 70%
          feedbackRowHeight: 40, // Feedback row: 15%
          optionButtonWidth: 98,
          optionButtonHeight: 80,
          optionButtonBackgroundColor: 'orange',
          border: "2px solid #F59E0B",
          questionTextFontSize: '45gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#141212', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page6.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
      },
      // Instruction Text
      {
        id: 'page6-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page6-instruction-text',
          text: getI18nText(
            'pages.page6.instruction',
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
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 6 }, // Only enable for specific page
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
          initialVisible: false
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
      {
        id: "page7-diag-length-22",
        name: "diag-length-22",
        type: "textbox",
        coordinates: [660, 360, 900, 400],
        zIndex: 1000,
        props: {
          text: "22 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //6m (upper segment of diagonal DB)
      {
        id: "page7-diag-length-6",
        name: "diag-length-6",
        type: "textbox",
        coordinates: [540, 230, 670, 280],
        zIndex: 1000,
        props: {
          text: "6 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //14m (lower segment of diagonal DB)
      {
        id: "page7-diag-length-14-bottom",
        name: "diag-length-14-bottom",
        type: "textbox",
        coordinates: [700, 190, 840, 230],
        zIndex: 1000,
        props: {
          text: "12 m",
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // optional side label
      {
        id: "page7-side-length-12",
        name: "side-length-12",
        type: "textbox",
        coordinates: [445, 330, 690, 370],
        zIndex: 1000,
        props: {
          text: "12 m",
          fontSize: "34gc",
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
          coordinates: [370, 5, 845, 650],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 5
            vertices: [
              { row: 2, col: 4 },    // Top-left
              { row: 1.5, col: 12 }, // Top-right
              { row: 8.5, col: 13 },   // Bottom-right
              { row: 8.5, col: 2 }   // Bottom-left
            ], // Kite vertices matching provided diagram
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFF00", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#00FFFF", thickness: "5gc", style: "dashed" },

            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#3498DB", // Fill color (light blue/cyan)
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
      // Right angle top 1
      {
        id: "page7-right-angle-top-1",
        name: "page7-right-angle-top-1",
        type: "textbox",
        coordinates: [722, 277, 727, 299], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      //right angle right 1
      {
        id: "page7-right-angle-right-1",
        name: "page7-right-angle-right-1",
        type: "textbox",
        coordinates: [726, 285, 756, 290], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      // Right angle top 2
      {
        id: "page7-right-angle-top-2",
        name: "page7-right-angle-top-2",
        type: "textbox",
        coordinates: [762, 302, 767, 333], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(40deg)", // Rotate to match the slant of the side


        },
      },
      //right angle right 2
      {
        id: "page7-right-angle-right-2",
        name: "page7-right-angle-right-2",
        type: "textbox",
        coordinates: [749, 295, 776, 300], // Small bounding box in top-right corner of shape to align with slant of BC side
        zIndex: 1050,
        props: {
          text: "",
          backgroundColor: "#ffffff",
          borderRadius: "0gc",
          cursor: "pointer",
          transform: "rotate(41deg)", // Rotate to match the slant of the side


        },
      },
      //blue-line line
      {
        id: "page7-blue-line",
        name: "page7-blue-line",
        coordinates: [400, 385, 603, 445], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/blueLine2.png",
        },
      },
      // Kite 1d2 label
      {
        id: "page7-kite-2d1-label",
        name: "page7-kite-2d1-label",
        type: "textbox",
        coordinates: [120, 230, 420, 270],
        zIndex: 1000,
        props: {
          text: getI18nText("kite2D1"),
          fontSize: "38gc",
          color: "#FFFF00",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      //yellow line
      {
        id: "page7-yellow-line",
        name: "page7-yellow-line",
        coordinates: [380, 170, 590, 250], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: 1000,
        type: "container",
        props: {
          imageSrc: "assets/yelloLine2.png",
        },
      },
      // Kite 1d1 label
      {
        id: "page7-kite-1d1-label",
        name: "page7-kite-1d1-label",
        type: "textbox",
        coordinates: [110, 410, 410, 435],
        zIndex: 1000,
        props: {
          text: getI18nText("kite2D2"),
          fontSize: "38gc",
          color: "#00FFFF",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 0 8px rgba(0,0,0,0.8)"
        }
      },
      // // Message Box (static textbox with same style as animation message box)
      {
        id: "page7-messagebox",
        name: "page7-messagebox",
        type: "custom",
        coordinates: [325, 580, 1175, 630], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page7.messageBox"),
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //equal to sign '='
      {
        id: "page7-equal-sign",
        name: "page7-equal-sign",
        type: "custom",
        coordinates: [775, 650, 805, 750], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "=",
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //tile component -3
      {
        id: "page7-tile-1",
        name: "page7-tile-1",
        type: "tile",
        coordinates: [825, 650, 980, 750], // Centered horizontally in left panel (gap reduced to 10gc)
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
          fontSize: "60gc",
          fontWeight: "bold",
          padding: "5gc",
          textAlign: "center",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //cm^2 text
      {
        id: "page7-cm-text",
        name: "page7-cm-text",
        type: "custom",
        coordinates: [1010, 650, 1030, 750], // Centered position
        zIndex: 1000,
        props: {
          componentType: 'TeacherNoteComponent',
          text: "\\text{m}{^2}",
          useKatex: true,
          fontSize: '36gc',
          textColor: '#FFFFFF',

        }
      },
      //numpad
      {
        id: "page7-number-pad",
        name: "page7-number-pad",
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
          feedbackComponentId: null, // ID of external feedback component to update when check is pressed (e.g., 'page7-feedback-textbox')
          destinations: [

            {
              destinationId: "page7-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: "336",
              // Dynamic feedback messages
              correctFeedback: getI18nText(
                "pages.page7.numpad.feedback.correct",
                "Well Done! There are 3 vertices in this polygon"
              ),
              incorrectFeedback: getI18nText(
                "pages.page7.numpad.feedback.incorrect",
                "Incorrect! Try Again!"
              ),
              emptyFeedback: getI18nText(
                "pages.page7.feedback.emptyFeedback",
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
        id: 'page7-instruction-text',
        name: 'instruction-text',
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
      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page7-build-coordinates",
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
      //   id: "page7-instruction-1",
      //   name: "page7-instruction-1",
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
      //   id: "page7-instruction-2",
      //   name: "page7-instruction-2",
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
      //   id: "page7-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page7-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

      // Navigation buttons
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 7 }, // Only enable for specific page
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
          initialVisible: false
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
      // Title: "Properties of a Parallelogram" in bright orange, centered at top
      {
        id: "page8-title",
        name: "page8-title",
        coordinates: [25, 100, 1575, 200],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.title"),
          fontSize: "60gc",
          color: "#FF9900", // Bright orange
          textAlign: "center",
          fontWeight: "bold",
        },
      },

      // Main explanatory text: "Let's explore the side, angle, and diagonal properties of a parallelogram."
      {
        id: "page8-main-text",
        name: "page8-main-text",
        coordinates: [200, 300, 1400, 450],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.mainText"),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },

      // Instruction text: "Tap "Start" to start the activity."
      {
        id: "page8-instruction-text",
        name: "page8-instruction-text",
        coordinates: [200, 500, 1400, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.instructionText"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Start button - Orange with gradient, centered at bottom (same style as page 7 Start Over button)
      {
        id: "page8-start-button",
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
            const nav = pageNavigation[8];
            if (nav && nav.next) {
              window.location.reload()
            }
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
      {
        id: "page8-tap-next",
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
          const baseTransform = element.dataset?.baseTransform || '';
          // Reset transform, opacity, etc. but keep positioning
          element.style.transform = baseTransform;
          element.style.opacity = '';
          element.style.transition = '';
        }
      });

      if (pageNumber === 3 && typeof window.hidePage3QuizLegend === 'function') {
        window.hidePage3QuizLegend();
      }

      if (pageNumber === 6 && typeof window.hidePage6QuizLegend === 'function') {
        window.hidePage6QuizLegend();
      }
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
    const page3QuizLegendIds = [
      'page3-yellow-line',
      'page3-kite-1d1-label',
      'page3-blue-line',
      'page3-kite-2d2-label'
    ];
    const page3QuizLegendFirstGroup = ['page3-yellow-line', 'page3-kite-1d1-label'];
    const page3QuizLegendSecondGroup = ['page3-blue-line', 'page3-kite-2d2-label'];
    const page6QuizLegendIds = [
      'page6-yellow-line',
      'page6-kite-2d1-label',
      'page6-blue-line',
      'page6-kite-2d2-label'
    ];
    const page6QuizLegendFirstGroup = ['page6-yellow-line', 'page6-kite-2d1-label'];
    const page6QuizLegendSecondGroup = ['page6-blue-line', 'page6-kite-2d2-label'];

    const ensurePage3QuizLegendStyles = () => {
      if (typeof document === 'undefined') {
        return;
      }

      const existingStyle = document.getElementById('page3-quiz-legend-style');
      if (existingStyle) {
        return;
      }

      const styleElement = document.createElement('style');
      styleElement.id = 'page3-quiz-legend-style';
      styleElement.textContent = `
        #page3-yellow-line,
        #page3-kite-1d1-label,
        #page3-blue-line,
        #page3-kite-2d2-label {
          opacity: 0;
          visibility: hidden;
          transform: translateY(16px);
        }
      `;
      document.head.appendChild(styleElement);
    };

    const ensurePage6QuizLegendStyles = () => {
      if (typeof document === 'undefined') {
        return;
      }

      const existingStyle = document.getElementById('page6-quiz-legend-style');
      if (existingStyle) {
        return;
      }

      const styleElement = document.createElement('style');
      styleElement.id = 'page6-quiz-legend-style';
      styleElement.textContent = `
        #page6-yellow-line,
        #page6-kite-2d1-label,
        #page6-blue-line,
        #page6-kite-2d2-label {
          opacity: 0;
          visibility: hidden;
        }
      `;
      document.head.appendChild(styleElement);
    };

    const getPage3QuizLegendElements = (ids = page3QuizLegendIds) => {
      if (typeof document === 'undefined') {
        return [];
      }

      return ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    };

    const getPage6QuizLegendElements = (ids = page6QuizLegendIds) => {
      if (typeof document === 'undefined') {
        return [];
      }

      return ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    };

    const setPage3QuizLegendState = (ids, visible) => {
      const elements = getPage3QuizLegendElements(ids);
      elements.forEach((element) => {
        if (typeof anime !== 'undefined') {
          anime.remove(element);
        }

        element.style.transition = '';
        element.style.willChange = '';

        if (visible) {
          element.style.visibility = 'visible';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0px)';
        } else {
          element.style.visibility = 'hidden';
          element.style.opacity = '0';
          element.style.transform = 'translateY(16px)';
        }
      });
      return elements;
    };

    const setPage6QuizLegendState = (ids, visible) => {
      const elements = getPage6QuizLegendElements(ids);
      elements.forEach((element) => {
        if (typeof anime !== 'undefined') {
          anime.remove(element);
        }

        const baseTransform = element.dataset.page6LegendBaseTransform ?? element.style.transform ?? '';
        element.dataset.page6LegendBaseTransform = baseTransform;

        element.style.transition = '';
        element.style.willChange = '';

        if (visible) {
          element.style.visibility = 'visible';
          element.style.opacity = '1';
          element.style.transform = baseTransform;
        } else {
          element.style.visibility = 'hidden';
          element.style.opacity = '0';
          element.style.transform = baseTransform;
        }
      });
      return elements;
    };

    const animatePage3QuizLegendGroup = (ids) => {
      const elements = getPage3QuizLegendElements(ids);
      if (!elements.length) {
        return Promise.resolve();
      }

      elements.forEach((element) => {
        element.style.visibility = 'visible';
        element.style.willChange = 'opacity';
        const baseTransform = element.dataset.page6LegendBaseTransform ?? element.style.transform ?? '';
        element.dataset.page6LegendBaseTransform = baseTransform;
        element.style.transform = baseTransform;
      });

      if (typeof anime === 'undefined') {
        elements.forEach((element) => {
          element.style.opacity = '1';
          element.style.willChange = '';
        });
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        anime({
          targets: elements,
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutCubic',
          complete: () => {
            elements.forEach((element) => {
              element.style.opacity = '1';
              element.style.transform = element.dataset.page6LegendBaseTransform || '';
              element.style.willChange = '';
            });
            resolve();
          }
        });
      });
    };

    const animatePage6QuizLegendGroup = (ids) => {
      const elements = getPage6QuizLegendElements(ids);
      if (!elements.length) {
        return Promise.resolve();
      }

      elements.forEach((element) => {
        element.style.visibility = 'visible';
        element.style.willChange = 'opacity, transform';
      });

      if (typeof anime === 'undefined') {
        elements.forEach((element) => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0px)';
          element.style.willChange = '';
        });
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        anime({
          targets: elements,
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          easing: 'easeOutCubic',
          complete: () => {
            elements.forEach((element) => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0px)';
              element.style.willChange = '';
            });
            resolve();
          }
        });
      });
    };

    ensurePage3QuizLegendStyles();
    ensurePage6QuizLegendStyles();

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
    window.hidePage3QuizLegend = () => {
      window.page3QuizRevealPromise = null;
      setPage3QuizLegendState(page3QuizLegendIds, false);
    };
    window.showPage3QuizLegendImmediately = () => {
      window.page3QuizRevealPromise = null;
      setPage3QuizLegendState(page3QuizLegendIds, true);
    };
    window.runPage3QuizRevealSequence = () => {
      if (window.page3QuizRevealPromise) {
        return window.page3QuizRevealPromise;
      }

      setPage3QuizLegendState(page3QuizLegendIds, false);

      window.page3QuizRevealPromise = animatePage3QuizLegendGroup(page3QuizLegendFirstGroup)
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => animatePage3QuizLegendGroup(page3QuizLegendSecondGroup))
        .finally(() => {
          window.page3QuizRevealPromise = null;
        });

      return window.page3QuizRevealPromise;
    };
    window.hidePage6QuizLegend = () => {
      window.page6QuizRevealPromise = null;
      setPage6QuizLegendState(page6QuizLegendIds, false);
    };
    window.showPage6QuizLegendImmediately = () => {
      window.page6QuizRevealPromise = null;
      setPage6QuizLegendState(page6QuizLegendIds, true);
    };
    window.runPage6QuizRevealSequence = () => {
      if (window.page6QuizRevealPromise) {
        return window.page6QuizRevealPromise;
      }

      setPage6QuizLegendState(page6QuizLegendIds, false);

      window.page6QuizRevealPromise = animatePage6QuizLegendGroup(page6QuizLegendFirstGroup)
        .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
        .then(() => animatePage6QuizLegendGroup(page6QuizLegendSecondGroup))
        .finally(() => {
          window.page6QuizRevealPromise = null;
        });

      return window.page6QuizRevealPromise;
    };

    if (window.getCurrentPage?.() === 3) {
      setTimeout(() => {
        if (window.getCurrentPage?.() === 3 && typeof window.hidePage3QuizLegend === 'function') {
          window.hidePage3QuizLegend();
        }
      }, 0);
    }

    if (window.getCurrentPage?.() === 6) {
      setTimeout(() => {
        if (window.getCurrentPage?.() === 6 && typeof window.hidePage6QuizLegend === 'function') {
          window.hidePage6QuizLegend();
        }
      }, 0);
    }

    // Listen for page change events and reset states (skipDispatch so animation sequence on this page can start)
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        if (pageNumber === 3 && typeof window.hidePage3QuizLegend === 'function') {
          setTimeout(() => {
            if (window.getCurrentPage?.() === 3) {
              window.hidePage3QuizLegend();
            }
          }, 0);
        }
        if (pageNumber === 6 && typeof window.hidePage6QuizLegend === 'function') {
          setTimeout(() => {
            if (window.getCurrentPage?.() === 6) {
              window.hidePage6QuizLegend();
            }
          }, 0);
        }
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

