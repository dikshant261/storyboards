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
  10: { prev: 9, next: null },
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
 * @param {string} [shapeType] - Optional shape type to select (e.g., "PARALLELOGRAM", "SQUARE")
 * @returns {Object} Shape configuration object
 */
const getShapeConfig = (shapeType = null) => {
  if (typeof window !== 'undefined' && window.shape) {
    // Handle array format (new format)
    if (Array.isArray(window.shape)) {
      let selectedShape = null;
      
      // If shapeType is provided, find matching shape
      if (shapeType) {
        selectedShape = window.shape.find(
          s => s.quadType === shapeType || s.type === shapeType.toLowerCase()
        );
      }
      
      // If no match found or no shapeType provided, use first shape
      if (!selectedShape && window.shape.length > 0) {
        selectedShape = window.shape[0];
      }
      
      if (selectedShape) {
        return {
          quadType: selectedShape.quadType || "PARALLELOGRAM",
          vertices: selectedShape.vertices || [
            { row: 2, col: 2 },
            { row: 2, col: 8 },
            { row: 7, col: 9 },
            { row: 7, col: 3 }
          ],
          gridRows: selectedShape.gridRows || 10,
          gridCols: selectedShape.gridCols || 10
        };
      }
    }
    // Handle object format (backward compatibility)
    else if (typeof window.shape === 'object') {
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
      // Main instructional text - white text, centered
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [200, 200, 1400, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.mainText", "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin."),
          fontSize: "42gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.5",
          allowHTML: true,
        },
      },
      // Start button - Orange gradient with black text, positioned at bottom center
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [650, 675, 950, 775], // Bottom center position
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start", "Start"),
          fontSize: "44gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background (gradient will be applied via CSS)
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "none",
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

      

      // Progress dots - at the top
      {
        id: "page2-progress-dots",
        name: "page2-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "A rhombus and a kite share some common properties."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page2-right-column",
        name: "page2-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page2-text-box",
      //   name: "page2-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page2-feedback-textbox",
      //   name: "page2-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page2-quiz-panel",
        name: "page2-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page2.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page2.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 20,
          optionsRowHeight: 50,
          feedbackRowHeight: 30,
          // Option button height percentage
          optionButtonHeight: 75,
          options: getI18nText("pages.page2.quizPanel.options", [
            {
              text: "Yes always",
              iscorrect: true,
              feedback: "Correct! A rhombus can always be called a kite.",
            },
            {
              text: "Yes sometimes",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
            },
            {
              text: "No",
              iscorrect: false,
              feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
            },
          ]),
        },
      },

      // Header for first grid - Rhombus
      {
        id: "page2-grid-1-header",
        name: "page2-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page2-geometry-grid-1",
        name: "page2-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Kite
      {
        id: "page2-grid-2-header",
        name: "page2-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page2-geometry-grid-2",
        name: "page2-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      

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

      
    ],
    3: [

      

      // Progress dots - at the top
      {
        id: "page3-progress-dots",
        name: "page3-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.headerText", "A rhombus and a kite share some common properties."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page3-right-column",
        name: "page3-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page3-text-box",
      //   name: "page3-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page3-feedback-textbox",
      //   name: "page3-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page3-quiz-panel",
        name: "page3-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page3.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page3.quizPanel.questionText", "Why is a rhombus always a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 10,
          optionsRowHeight: 55,
          feedbackRowHeight: 35,
          // Option button height percentage
          optionButtonHeight: 85,
          options: getI18nText("pages.page3.quizPanel.options", [
            {
              text: "A rhombus has four right angles.",
              iscorrect: false,
              feedback: "Incorrect feedback 1: Oops! A rhombus can have right angles, but a kite doesn't. Visual— show the rhombus changing with right angles, making it a square.",
            },
            {
              text: "A rhombus has two pairs of equal adjacent sides.",
              iscorrect: true,
              feedback: "Correct feedback 2: Well done! In a rhombus and a kite, the adjacent sides are equal. Show visual in next slides.",
            },
            {
              text: "A rhombus has no parallel sides.",
              iscorrect: false,
              feedback: "Incorrect feedback 3: A rhombus has parallel sides, but a kite doesn't. Show parallel side markings >> or > for rhombus for opposite sides.",
            },
          ]),
        },
      },

      // Header for first grid - Rhombus
      {
        id: "page3-grid-1-header",
        name: "page3-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page3-geometry-grid-1",
        name: "page3-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Kite
      {
        id: "page3-grid-2-header",
        name: "page3-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page3-geometry-grid-2",
        name: "page3-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.instruction", "Tap the option with the correct reasoning."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
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

      
    ],
    4: [

      

      // Progress dots - at the top
      {
        id: "page4-progress-dots",
        name: "page4-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page4-header",
        name: "page4-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.headerText", "Answer the questions using the properties of quadrilaterals."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page4-right-column",
        name: "page4-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page4-text-box",
      //   name: "page4-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page4-feedback-textbox",
      //   name: "page4-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page4-quiz-panel",
        name: "page4-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page4.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page4.quizPanel.questionText", "Can a rhombus be called a kite?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 10,
          optionsRowHeight: 55,
          feedbackRowHeight: 35,
          // Option button height percentage
          optionButtonHeight: 85,
          options: getI18nText("pages.page4.quizPanel.options", [
            {
              text: "Yes - always",
              iscorrect: true,
              feedback: "Correct! A rhombus has all four sides equal, which means it also has two pairs of equal adjacent sides. Therefore, every rhombus is a kite.",
            },
            {
              text: "No - Never",
              iscorrect: false,
              feedback: "Oops! A kite has two pairs of equal adjacent sides, and a rhombus has all four equal. So every rhombus is a kite.",
            },
            {
              text: "Sometimes",
              iscorrect: false,
              feedback: "Oops! A kite has two pairs of equal adjacent sides, and a rhombus has all four equal. So every rhombus is a kite.",
            },
          ]),
        },
      },

      // Header for first grid - Rhombus
      {
        id: "page4-grid-1-header",
        name: "page4-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page4-geometry-grid-1",
        name: "page4-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Kite
      {
        id: "page4-grid-2-header",
        name: "page4-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page4-geometry-grid-2",
        name: "page4-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page4.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
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

      
    ],
    5: [

      

      // Progress dots - at the top
      {
        id: "page5-progress-dots",
        name: "page5-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page5-header",
        name: "page5-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.headerText", "Answer the questions using the properties of quadrilaterals."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page5-right-column",
        name: "page5-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page5-text-box",
      //   name: "page5-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page5-feedback-textbox",
      //   name: "page5-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page5-quiz-panel",
        name: "page5-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page5.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page5.quizPanel.questionText", "Can a kite be called a rhombus?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 10,
          optionsRowHeight: 55,
          feedbackRowHeight: 35,
          // Option button height percentage
          optionButtonHeight: 85,
          options: getI18nText("pages.page5.quizPanel.options", [
            {
              text: "Yes - always",
              iscorrect: false,
              feedback: "Oops! A kite is not always a rhombus. A kite has two pairs of equal adjacent sides, but a rhombus has all four sides equal. Only when a kite has all four sides equal can it be called a rhombus.",
            },
            {
              text: "No - Never",
              iscorrect: false,
              feedback: "Oops! A kite can sometimes be a rhombus. When a kite has all four sides equal, it is also a rhombus.",
            },
            {
              text: "Sometimes",
              iscorrect: true,
              feedback: "Correct! A kite can sometimes be a rhombus.",
            },
          ]),
        },
      },

      // Header for first grid - Rhombus
      {
        id: "page5-grid-1-header",
        name: "page5-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page5-geometry-grid-1",
        name: "page5-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Kite
      {
        id: "page5-grid-2-header",
        name: "page5-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page5-geometry-grid-2",
        name: "page5-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page5-instruction",
        name: "page5-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.instruction", "Tap the correct answer."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
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
            return getI18nText("buttons.next", "»");
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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

      

      // Progress dots - at the top
      {
        id: "page6-progress-dots",
        name: "page6-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page6-header",
        name: "page6-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.headerText", "A kite and a rhombus share some common properties."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page6-right-column",
        name: "page6-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page6-text-box",
      //   name: "page6-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page6-feedback-textbox",
      //   name: "page6-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page6-quiz-panel",
        name: "page6-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page6.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page6.quizPanel.questionText", "When does a kite become a rhombus?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 10,
          optionsRowHeight: 55,
          feedbackRowHeight: 35,
          // Option button height percentage
          optionButtonHeight: 85,
          options: getI18nText("pages.page6.quizPanel.options", [
            {
              text: "When one of the angle of the kite is 90°.",
              iscorrect: false,
              feedback: "Incorrect! Having a right angle does not make a kite a rhombus.",
            },
            {
              text: "When only the opposite sides of the kite are equal.",
              iscorrect: false,
              feedback: "Not quite. Equal opposite sides form a different type of quadrilateral, not a rhombus.",
            },
            {
              text: "When all the sides of the kite are equal.",
              iscorrect: true,
              feedback: "A kite becomes a rhombus only when all four sides are equal.",
            },
          ]),
        },
      },

      // Header for first grid - Kite
      {
        id: "page6-grid-1-header",
        name: "page6-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page6-geometry-grid-1",
        name: "page6-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Rhombus
      {
        id: "page6-grid-2-header",
        name: "page6-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page6-geometry-grid-2",
        name: "page6-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page6-instruction",
        name: "page6-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.instruction", "Tap the option with the correct reasoning."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
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
            return getI18nText("buttons.next", "»");
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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
    7: [

      

      // Progress dots - at the top
      {
        id: "page7-progress-dots",
        name: "page7-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page7-header",
        name: "page7-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.headerText", "A kite and a rhombus share some common properties."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page7-right-column",
        name: "page7-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page7-text-box",
      //   name: "page7-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page7-feedback-textbox",
      //   name: "page7-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page7-quiz-panel",
        name: "page7-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page7.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page7.quizPanel.questionText", "When does a kite become a rhombus?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 10,
          optionsRowHeight: 55,
          feedbackRowHeight: 35,
          // Option button height percentage
          optionButtonHeight: 85,
          options: getI18nText("pages.page7.quizPanel.options", [
            {
              text: "When one of the angle of the kite is 90°.",
              iscorrect: false,
              feedback: "Incorrect! Having a right angle does not make a kite a rhombus.",
            },
            {
              text: "When only the opposite sides of the kite are equal.",
              iscorrect: false,
              feedback: "Not quite. Equal opposite sides form a different type of quadrilateral, not a rhombus.",
            },
            {
              text: "When all the sides of the kite are equal.",
              iscorrect: true,
              feedback: "A kite becomes a rhombus only when all four sides are equal.",
            },
          ]),
        },
      },

      // Header for first grid - Kite
      {
        id: "page7-grid-1-header",
        name: "page7-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page7-geometry-grid-1",
        name: "page7-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - initially hidden, shown when option is clicked
          sideSymbols: [],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Rhombus
      {
        id: "page7-grid-2-header",
        name: "page7-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page7-geometry-grid-2",
        name: "page7-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - initially hidden, shown when option is clicked
          sideSymbols: [],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page7-instruction",
        name: "page7-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.instruction", "Tap the option with the correct reasoning."),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      

      // Navigation buttons
      {
        id: "page7-next-button",
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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

      
    ],
    8: [

      

      // Progress dots - at the top
      {
        id: "page8-progress-dots",
        name: "page8-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page8-header",
        name: "page8-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.headerText", "Answer the questions using the properties of quadrilaterals."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page8-right-column",
        name: "page8-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      {
        id: "page8-text-box",
        name: "page8-text-box",
        coordinates: [1020, 250, 1575, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "A kite can be a rhombus when all its sides are equal.<br>Let us see the Kite transform into a rhombus",
          fontSize: "32gc",
          color: "#FFFFFF",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8gc",
          padding: "20gc",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          allowHTML: true, // Allow HTML for line breaks
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Header for first grid - Kite
      {
        id: "page8-grid-1-header",
        name: "page8-grid-1-header",
        coordinates: [-1000, -1000, 0, 0], // Move off-screen to hide since shape 3 header is in the same position
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page8-geometry-grid-1",
        name: "page8-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - visible for shape 1 (Kite)
          sideSymbols: [
            { side: 'AB', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'DA', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'BC', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
            { side: 'CD', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
          ],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with reduced opacity for shape 1
            fillOpacity: 0.7, // Lower opacity than shape 3
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Rhombus
      {
        id: "page8-grid-2-header",
        name: "page8-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rhombus",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page8-geometry-grid-2",
        name: "page8-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - visible for shape 2 (Rhombus)
          sideSymbols: [
            { side: 'AB', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'DA', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'BC', type: 'tick', count: 1, color: '#FF9900', size: '12gc', position: 0.5 },
            { side: 'CD', type: 'tick', count: 1, color: '#FF9900', size: '12gc', position: 0.5 },
          ],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 5,
                col: 8,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 5,
                col: 2,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for third grid - Kite (same as shape 1)
      {
        id: "page8-grid-3-header",
        name: "page8-grid-3-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Kite",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Third grid (same as shape 1)
      {
        id: "page8-geometry-grid-3",
        name: "page8-geometry-grid-3",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Same coordinates as shape 1
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - same as shape 1
          sideSymbols: [
            { side: 'AB', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'DA', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'BC', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
            { side: 'CD', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
          ],
          
          // Point animation configuration for shape 3
          pointAnimationConfig: {
            enabled: true,
            pointId: 'C',
            targetRow: 6,
            startDelay: 2000, // Start animation 2000ms after page load
            durationForward: 2000, // Duration from old to new position (ms)
            holdAtNew: 5000, // Hold at new position for 5000ms
            durationBackward: 2000, // Duration from new to old position (ms)
            holdAtOld: 5000, // Hold at old position for 5000ms
            autoStart: true, // Animation will start after startDelay
            loop: true // If true, loops infinitely; if false, stops at new position
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with higher opacity than shape 1
            fillOpacity: 1, // Full opacity - higher than shape 1
            points: [
              {
                id: 'A',
                row: 2,
                col: 5,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 4,
                col: 8.5,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 8,
                col: 5,
                label: "C'",
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 4,
                col: 1.5,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFF00', // Yellow
                thickness: '4gc',
                style: 'dashed',
                clickable: false,
                clickBehavior: 'blink',
                alwaysBlink: true // Custom property to make it always blink
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFF00', // Yellow
                thickness: '4gc',
                style: 'dashed',
                clickable: false,
                clickBehavior: 'blink',
                alwaysBlink: true // Custom property to make it always blink
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'AC',
                from: 'A',
                to: 'C',
                color: '#FFFF00', // Yellow
                thickness: '4gc',
                style: 'dashed',
                clickable: false,
                clickBehavior: 'blink',
                alwaysBlink: true // Custom property to make it always blink
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page8-instruction",
        name: "page8-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      

      // Navigation buttons
      {
        id: "page8-next-button",
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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

      
    ],
    9: [

      

      // Progress dots - at the top
      {
        id: "page9-progress-dots",
        name: "page9-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page9-header",
        name: "page9-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.headerText", "A rectangle with all equal sides is a square."),
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
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page9-right-column",
        name: "page9-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      // {
      //   id: "page9-text-box",
      //   name: "page9-text-box",
      //   coordinates: [900, 150, 1575, 350],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page2.textBoxDefault", "Select two sides to see the angle between them"),
      //     fontSize: "28gc",
      //     color: "#FFFFFF",
      //     textAlign: "left",
      //     backgroundColor: "rgba(255, 255, 255, 0.1)",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     borderWidth: "2gc",
      //     borderStyle: "solid",
      //     borderColor: "#FF9900",
      //     allowHTML: true, // Allow HTML for line breaks
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   },
      // },

      // Feedback box in right column (below text box)
      // {
      //   id: "page9-feedback-textbox",
      //   name: "page9-feedback-textbox",
      //   coordinates: [1005, 375, 1575, 675],
      //   zIndex: "var(--z-elevated)",
      //   type: "feedback-textbox",
      //   props: {
      //     text: "", // Empty by default, updated dynamically
      //     fontSize: "28gc",
      //     mode: "normal", // Updated dynamically to "incorrect" when needed
      //     textAlign: "center",
      //     borderRadius: "8gc",
      //     padding: "15gc",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     minHeight: "50gc", // Ensure minimum height for visibility
      //   },
      // },

      // Quiz panel in right column
      {
        id: "page9-quiz-panel",
        name: "page9-quiz-panel",
        coordinates: [1000, 85, 1595, 725], // Right column position
        zIndex: "var(--z-modal)",
        type: "custom",
        props: {
          componentType: "QuizPanelComponent",
          quizType: "MCQ",
          quizSubtype: getI18nText("pages.page9.quizPanel.quizSubtype", "QT3R"),
          questionText: getI18nText("pages.page9.quizPanel.questionText", "Can a rectangle be called a square?"),
          questionTextFontSize: "30gc",
          optionButtonTextSize: "28gc",
          optionButtonTextColor: "#000000",
          feedbackFontSize: "28gc",
          // Height distribution (must sum to 100)
          headerRowHeight: 0,
          questionRowHeight: 10,
          optionsRowHeight: 55,
          feedbackRowHeight: 35,
          // Option button height percentage
          optionButtonHeight: 85,
          options: getI18nText("pages.page9.quizPanel.options", [
            {
              text: "Yes - always",
              iscorrect: false,
              feedback: "Incorrect. A rectangle is a square only when all its sides are equal.",
            },
            {
              text: "No - never",
              iscorrect: false,
              feedback: "Incorrect. A rectangle can be a square when all its sides are equal.",
            },
            {
              text: "Sometimes",
              iscorrect: true,
              feedback: "Correct! A rectangle is a square only when all four sides are equal. Otherwise, it remains just a rectangle.",
            },
          ]),
        },
      },

      // Header for first grid - Rectangle
      {
        id: "page9-grid-1-header",
        name: "page9-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rectangle",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page9-geometry-grid-1",
        name: "page9-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - initially hidden, shown when option is clicked
          sideSymbols: [],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 3,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 2,
                col: 9,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 6,
                col: 9,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 6,
                col: 3,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Square
      {
        id: "page9-grid-2-header",
        name: "page9-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Square",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page9-geometry-grid-2",
        name: "page9-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - initially hidden, shown when option is clicked
          sideSymbols: [],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 3,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 2,
                col: 7,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 6,
                col: 7,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 6,
                col: 3,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page9-instruction",
        name: "page9-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page9.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      

      // Navigation buttons
      {
        id: "page9-next-button",
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
          imageAlt: getI18nText("common.tapAlt", "Tap"),
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
            return getI18nText("buttons.previous", "«");
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

      

      // Progress dots - at the top
      {
        id: "page10-progress-dots",
        name: "page10-progress-dots",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-notification)",
        type: "progress",
        props: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20gc',
          padding: '5gc',
          dotSize: '15gc',
          activeDotColor: '#FF9900',
          inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
          activeDotBorder: '2px solid #ffffff',
          inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          fontSize: '12gc',
          fontWeight: 'bold',
          color: 'transparent',
        },
      },

      // Header - Orange text
      {
        id: "page10-header",
        name: "page10-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.headerText", "A rectangle with all equal sides is a square."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },

      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page10-left-column",
        name: "page10-left-column",
        coordinates: [5, 85, 995, 720], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
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

      // Left panel text - uses Page2StateConfig for text content
      

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page10-right-column",
        name: "page10-right-column",
        coordinates: [1000, 85, 1595, 720], // 45% of usable width (1550px) = 697.5px, starting at 877
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

      // Text box in right column
      {
        id: "page10-text-box",
        name: "page10-text-box",
        coordinates: [1020, 250, 1575, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.textBox", "A rectangle is a square only when all its sides are equal.<br>Let us see the rectangle transform into a square"),
          fontSize: "32gc",
          color: "#FFFFFF",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8gc",
          padding: "20gc",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          allowHTML: true, // Allow HTML for line breaks
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },

      // Header for first grid - Rectangle
      {
        id: "page10-grid-1-header",
        name: "page10-grid-1-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rectangle",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - First grid (left side)
      {
        id: "page10-geometry-grid-1",
        name: "page10-geometry-grid-1",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - visible by default (same as page 9)
          sideSymbols: [
            { side: 'AB', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'CD', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'BC', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
            { side: 'DA', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
          ],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 3,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 2,
                col: 9,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 6,
                col: 9,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 6,
                col: 3,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for second grid - Square
      {
        id: "page10-grid-2-header",
        name: "page10-grid-2-header",
        coordinates: [500, 135, 990, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Square",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Second grid (right side)
      {
        id: "page10-geometry-grid-2",
        name: "page10-geometry-grid-2",
        type: "custom",
        coordinates: [500, 175, 990, 720], // Right half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - visible by default (same as page 9)
          sideSymbols: [
            { side: 'AB', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'BC', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'CD', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'DA', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
          ],
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 3,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 2,
                col: 7,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 6,
                col: 7,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 6,
                col: 3,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Header for third grid - Rectangle (same as shape 1)
      {
        id: "page10-grid-3-header",
        name: "page10-grid-3-header",
        coordinates: [10, 135, 490, 170],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "Rectangle",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Geometry grid visualization - Third grid (same as shape 1)
      {
        id: "page10-geometry-grid-3",
        name: "page10-geometry-grid-3",
        type: "custom",
        coordinates: [10, 175, 490, 720], // Left half of left panel, below header
        zIndex: 45,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "custom",
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          draggable: false,
          angleConfig: {
            show: "none"
          },
          
          // Hide default quadrilateral vertices/hotspots and edges (we use custom mode points and connections instead)
          vertexConfig: {
            color: "transparent",
            showLabels: false
          },
          edgeColor: "transparent",
          edgeThickness: "0gc",
          
          // Disable protractor spawning on angle arc clicks
          protractorConfig: {
            enableClickToSpawn: false
          },
          
          // Side symbols (notches) - visible by default (same as page 9, same as shape 1)
          sideSymbols: [
            { side: 'AB', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'CD', type: 'tick', count: 1, color: '#1ABC9C', size: '12gc', position: 0.5 },
            { side: 'BC', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
            { side: 'DA', type: 'tick', count: 2, color: '#FF9900', size: '12gc', position: 0.5 },
          ],
          
          // Point animation configuration for shape 3 - animate B and C leftwards to make rectangle a square
          pointAnimationConfig: {
            enabled: true,
            pointId: 'B', // Animate point B
            targetCol: 7, // Move from col 9 to col 7 (leftwards)
            syncPoints: ['C'], // Point C moves in sync with B
            startDelay: 2000, // Start animation 2000ms after page load
            durationForward: 2000, // Duration from old to new position (ms)
            holdAtNew: 5000, // Hold at new position for 5000ms
            durationBackward: 2000, // Duration from new to old position (ms)
            holdAtOld: 5000, // Hold at old position for 5000ms
            autoStart: true, // Animation will start after startDelay
            loop: true // Loop infinitely
          },
          
          // Custom mode configuration with clickable sides
          customConfig: {
            fill: true,
            fillColor: "#F5BB89", // Solid color with no opacity
            fillOpacity: 1,
            points: [
              {
                id: 'A',
                row: 2,
                col: 3,
                label: 'A',
                labelOffset: { x: '-25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'B',
                row: 2,
                col: 9,
                label: 'B',
                labelOffset: { x: '25gc', y: '-25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'C',
                row: 6,
                col: 9,
                label: 'C',
                labelOffset: { x: '25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              },
              {
                id: 'D',
                row: 6,
                col: 3,
                label: 'D',
                labelOffset: { x: '-25gc', y: '25gc' },
                labelSize: '28gc',
                labelColor: '#FFFFFF',
                size: '0gc', // Remove vertices
                color: 'transparent',
                clickable: false
              }
            ],
            connections: [
              {
                id: 'AB',
                from: 'A',
                to: 'B',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'BC',
                from: 'B',
                to: 'C',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'CD',
                from: 'C',
                to: 'D',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              },
              {
                id: 'DA',
                from: 'D',
                to: 'A',
                color: '#FFFFFF', // White edges
                thickness: '4gc',
                style: 'solid',
                clickable: false
              }
            ],
            angleSettings: {
              autoDetect: false,
              showArcs: false,
              showRightAngleMarker: false,
              // Settings for selected angle marker (when 2 lines are selected)
              selectedAngleMarker: {
                arcSize: '100gc', // Size of the arc
                arcColor: '#FF6600', // Color of the arc border
                arcBorderWidth: '4gc', // Width of the border in gc
                arcFillColor: 'rgba(255, 102, 0, 0.2)', // Fill color for the arc (can be transparent)
                labelFontSize: '30gc', // Font size for the angle measurement label
                labelColor: '#FFFFFF', // Color of the label text
                labelOffset: { x: '0gc', y: '0gc' } // X and Y offset for the label position
              }
            }
          },
          
          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          }
        }
      },
      // Instruction text - static text
      {
        id: "page10-instruction",
        name: "page10-instruction",
        coordinates: [155, 725, 1445, 815],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page10.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      

      // Navigation buttons
      {
        id: "page10-next-button",
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
            const nav = pageNavigation[10];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page10-tap-next",
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
        id: "page10-previous-button",
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
            const nav = pageNavigation[10];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all global states (quiz panels, page completion, etc.)
 * Called when "Start Over" is clicked
 */
const resetAllStates = () => {
  if (typeof window === 'undefined') return;

  console.log(`🔄 Resetting all global states (Start Over)`);

  try {
    // 1. Clear quiz panel state store
    if (window.quizPanelStateStore) {
      console.log(`🔄 Clearing quiz panel state store`);
      window.quizPanelStateStore = {};
    }

    // 2. Clear page completion states
    if (window.pageCompletionState) {
      console.log(`🔄 Clearing page completion states`);
      window.pageCompletionState = {};
    }

    // 3. Reset all pages (1-10) to ensure clean state
    for (let pageNum = 1; pageNum <= 10; pageNum++) {
      resetPageStates(pageNum);
    }

    console.log(`✅ All global states reset`);
  } catch (error) {
    console.error(`❌ Error resetting all states:`, error);
  }
};

/**
 * Reset all states for a page when it loads
 * This ensures clean state on every page navigation
 */
const resetPageStates = (pageNumber) => {
  if (typeof window === 'undefined') return;

  console.log(`🔄 Resetting all states for page ${pageNumber}`);

  try {
    // 0. Reset page 2 base state if resetting page 2
    if (pageNumber === 2 && window.setPage2BaseState) {
      window.setPage2BaseState('default');
    }
    // 0.1. Reset page 2 sub base state if resetting page 2
    if (pageNumber === 2 && window.setPage2SubBaseState) {
      window.setPage2SubBaseState('default');
    }
    
    // 0.2. Reset page 8 animation state if resetting page 8
    if (pageNumber === 8 && window.setPage8AnimationState) {
      window.setPage8AnimationState('WIP');
    }

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
        if (boxId && (boxId.includes('page3-') || boxId.includes('page4-') || boxId.includes('page5-') || boxId.includes('page6-') || boxId.includes('page7-') || boxId.includes('page8-') || boxId.includes('page9-'))) {
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

    // Initialize page 2 base state variable
    window.page2BaseState = window.page2BaseState || 'default';
    
    // Getter function for page 2 base state
    window.getPage2BaseState = () => {
      return window.page2BaseState || 'default';
    };
    
    // Setter function for page 2 base state
    window.setPage2BaseState = (value) => {
      if (['default', 'parts', 'naming'].includes(value)) {
        window.page2BaseState = value;
        console.log(`📊 [Page2] Base state changed to: ${value}`);
        // Dispatch event for components to react to state changes
        window.dispatchEvent(new CustomEvent('page2BaseStateChanged', {
          detail: { state: value }
        }));
      } else {
        console.warn(`⚠️ [Page2] Invalid state value: ${value}. Must be 'default', 'parts', or 'naming'`);
      }
    };

    // Initialize page 2 sub base state variable
    window.page2SubBaseState = window.page2SubBaseState || 'default';
    
    // Getter function for page 2 sub base state
    window.getPage2SubBaseState = () => {
      return window.page2SubBaseState || 'default';
    };
    
    // Initialize page 8 animation state variable
    window.page8AnimationState = window.page8AnimationState || 'WIP';
    
    // Getter function for page 8 animation state
    window.getPage8AnimationState = () => {
      return window.page8AnimationState || 'WIP';
    };
    
    // Setter function for page 8 animation state
    window.setPage8AnimationState = (value) => {
      if (['WIP', 'Completed'].includes(value)) {
        window.page8AnimationState = value;
        console.log(`📊 [Page8] Animation state changed to: ${value}`);
        // Dispatch event for components to react to state changes
        window.dispatchEvent(new CustomEvent('page8AnimationStateUpdate', {
          detail: { state: value }
        }));
      } else {
        console.warn(`⚠️ [Page8] Invalid animation state value: ${value}. Must be 'WIP' or 'Completed'`);
      }
    };
    
    // Setter function for page 2 sub base state
    window.setPage2SubBaseState = (value) => {
      if (['default', 'vertex1', 'arms', 'measure', 'capital', 'vertex2', 'greek'].includes(value)) {
        window.page2SubBaseState = value;
        console.log(`📊 [Page2] Sub base state changed to: ${value}`);
        // Dispatch event for components to react to state changes
        window.dispatchEvent(new CustomEvent('page2SubBaseStateChanged', {
          detail: { state: value }
        }));
      } else {
        console.warn(`⚠️ [Page2] Invalid sub base state value: ${value}. Must be 'default', 'vertex1', 'arms', 'measure', 'capital', 'vertex2', or 'greek'`);
      }
    };

    // Expose page state reset function globally
    window.resetPageStates = resetPageStates;

    // Listen for page change events and reset states
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        // Reset page 2 base state when navigating away from page 2
        if (pageNumber !== 2) {
          window.page2BaseState = 'default';
          window.page2SubBaseState = 'default';
        }
        // Reset page 8 animation state when navigating away from page 8
        if (pageNumber !== 8 && window.setPage8AnimationState) {
          window.setPage8AnimationState('WIP');
        }
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

      // Function to handle incorrect answer feedback for pages 2, 3, 4
  window.handleIncorrectAnswerFeedback = (pageNumber) => {
    if (![2, 3, 4].includes(pageNumber)) {
      return;
    }

        console.log(`🎯 [Incorrect Feedback] Handling incorrect answer for page ${pageNumber}`);

        const grid1Id = `page${pageNumber}-geometry-grid-1`;
        const grid2Id = `page${pageNumber}-geometry-grid-2`;

        // Helper function to dispatch addDynamicNotches event
        const addNotchesAndBlink = (gridId, sides, notchCount, color, delay = 0) => {
          setTimeout(() => {
            console.log(`🎯 [Incorrect Feedback] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);
            
            // Dispatch event to add notches
            const addNotchEvent = new CustomEvent('addDynamicNotches', {
              detail: {
                gridId: gridId,
                notches: sides.map(side => ({
                  side: side,
                  type: 'tick',
                  count: notchCount,
                  color: color,
                  size: '12gc',
                  position: 0.5
                }))
              }
            });
            window.dispatchEvent(addNotchEvent);
          }, delay);
        };

        // Step 1: Add single notch in aqua color (#1ABC9C) on AB and DA for both shapes - make them blink
        addNotchesAndBlink(grid1Id, ['AB', 'DA'], 1, '#1ABC9C', 0);
        addNotchesAndBlink(grid2Id, ['AB', 'DA'], 1, '#1ABC9C', 0);

        // Step 2: Wait 250ms
        // Step 3: Add single notch in orange (#FF9900) on BC and CD to shape 1 (rhombus) - make them blink
        addNotchesAndBlink(grid1Id, ['BC', 'CD'], 1, '#FF9900', 250);

        // Step 4: Wait 100ms more (total 350ms from start)
        // Step 5: Add double notch in orange (#FF9900) on BC and CD to shape 2 (kite) - make them blink
        addNotchesAndBlink(grid2Id, ['BC', 'CD'], 2, '#FF9900', 350);
      };

  // Handler for page 7 to show notches when any option is clicked
  window.handlePage7OptionClick = () => {
    console.log(`🎯 [Page 7] Showing notches on option click`);
    
    const grid1Id = `page7-geometry-grid-1`; // Kite
    const grid2Id = `page7-geometry-grid-2`; // Rhombus

    // Helper function to dispatch addDynamicNotches event
    const addNotches = (gridId, sides, notchCount, color) => {
      console.log(`🎯 [Page 7] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);
      
      // Dispatch event to add notches
      const addNotchEvent = new CustomEvent('addDynamicNotches', {
        detail: {
          gridId: gridId,
          notches: sides.map(side => ({
            side: side,
            type: 'tick',
            count: notchCount,
            color: color,
            size: '12gc',
            position: 0.5
          }))
        }
      });
      window.dispatchEvent(addNotchEvent);
    };

    // Shape 1 (Kite): Single notch in aqua on AB and DA, double notch in orange on BC and CD
    addNotches(grid1Id, ['AB', 'DA'], 1, '#1ABC9C');
    addNotches(grid1Id, ['BC', 'CD'], 2, '#FF9900');

    // Shape 2 (Rhombus): Single notch in aqua on AB and DA, single notch in orange on BC and CD
    addNotches(grid2Id, ['AB', 'DA'], 1, '#1ABC9C');
    addNotches(grid2Id, ['BC', 'CD'], 1, '#FF9900');
  };

  // Handler for page 9 to show notches when any option is clicked
  window.handlePage9OptionClick = () => {
    console.log(`🎯 [Page 9] Showing notches on option click`);
    
    const grid1Id = `page9-geometry-grid-1`; // Rectangle
    const grid2Id = `page9-geometry-grid-2`; // Square

    // Helper function to dispatch addDynamicNotches event
    const addNotches = (gridId, sides, notchCount, color) => {
      console.log(`🎯 [Page 9] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);
      
      // Dispatch event to add notches
      const addNotchEvent = new CustomEvent('addDynamicNotches', {
        detail: {
          gridId: gridId,
          notches: sides.map(side => ({
            side: side,
            type: 'tick',
            count: notchCount,
            color: color,
            size: '12gc',
            position: 0.5
          }))
        }
      });
      window.dispatchEvent(addNotchEvent);
    };

    // Shape 1 (Rectangle): Single notch in aqua on AB and CD, double notch in orange on BC and DA
    addNotches(grid1Id, ['AB', 'CD'], 1, '#1ABC9C');
    addNotches(grid1Id, ['BC', 'DA'], 2, '#FF9900');

    // Shape 2 (Square): All sides single notch in aqua
    addNotches(grid2Id, ['AB', 'BC', 'CD', 'DA'], 1, '#1ABC9C');
  };

  // Handler for page 10 to show notches when any option is clicked
  window.handlePage10OptionClick = () => {
    console.log(`🎯 [Page 10] Showing notches on option click`);
    
    const grid1Id = `page10-geometry-grid-1`; // Rectangle
    const grid2Id = `page10-geometry-grid-2`; // Square

    // Helper function to dispatch addDynamicNotches event
    const addNotches = (gridId, sides, notchCount, color) => {
      console.log(`🎯 [Page 10] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);
      
      // Dispatch event to add notches
      const addNotchEvent = new CustomEvent('addDynamicNotches', {
        detail: {
          gridId: gridId,
          notches: sides.map(side => ({
            side: side,
            type: 'tick',
            count: notchCount,
            color: color,
            size: '12gc',
            position: 0.5
          }))
        }
      });
      window.dispatchEvent(addNotchEvent);
    };

    // Shape 1 (Rectangle): Single notch in aqua on AB and CD, double notch in orange on BC and DA
    addNotches(grid1Id, ['AB', 'CD'], 1, '#1ABC9C');
    addNotches(grid1Id, ['BC', 'DA'], 2, '#FF9900');

    // Shape 2 (Square): All sides single notch in aqua
    addNotches(grid2Id, ['AB', 'BC', 'CD', 'DA'], 1, '#1ABC9C');
  };

  // Handler for page 8 to show notches when any option is clicked
  window.handlePage8OptionClick = () => {
    console.log(`🎯 [Page 8] Showing notches on option click`);
    
    const grid1Id = `page8-geometry-grid-1`; // Kite
    const grid2Id = `page8-geometry-grid-2`; // Rhombus

    // Helper function to dispatch addDynamicNotches event
    const addNotches = (gridId, sides, notchCount, color) => {
      console.log(`🎯 [Page 8] Adding ${notchCount} notch(es) to ${sides.join(', ')} on ${gridId} with color ${color}`);
      
      // Dispatch event to add notches
      const addNotchEvent = new CustomEvent('addDynamicNotches', {
        detail: {
          gridId: gridId,
          notches: sides.map(side => ({
            side: side,
            type: 'tick',
            count: notchCount,
            color: color,
            size: '12gc',
            position: 0.5
          }))
        }
      });
      window.dispatchEvent(addNotchEvent);
    };

    // Shape 1 (Kite): Single notch in aqua on AB and DA, double notch in orange on BC and CD
    addNotches(grid1Id, ['AB', 'DA'], 1, '#1ABC9C');
    addNotches(grid1Id, ['BC', 'CD'], 2, '#FF9900');

    // Shape 2 (Rhombus): Single notch in aqua on AB and DA, single notch in orange on BC and CD
    addNotches(grid2Id, ['AB', 'DA'], 1, '#1ABC9C');
    addNotches(grid2Id, ['BC', 'CD'], 1, '#FF9900');
  };

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

// Add event listeners to update instruction text when quiz is completed on pages 2, 3, and 4
if (typeof window !== 'undefined') {
  // Helper function to get i18n text (available globally)
  const getI18nText = (key, fallback) => {
    if (typeof i18n !== 'undefined' && i18n.t) {
      try {
        return i18n.t(key) || fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };
  
  // Store instruction text updates in global state
  if (!window.instructionTextUpdates) {
    window.instructionTextUpdates = {};
  }
  
  window.addEventListener('quizCompleted', (event) => {
    let pageNumber = event.detail?.pageNumber;
    
    // Fallback: Try to extract page number from quizId if pageNumber is null
    if (!pageNumber && event.detail?.quizId) {
      const quizIdMatch = event.detail.quizId.match(/page(\d+)-quiz/);
      if (quizIdMatch) {
        pageNumber = parseInt(quizIdMatch[1], 10);
        console.log(`🔍 [PageConfig] Extracted page number ${pageNumber} from quizId: ${event.detail.quizId}`);
      }
    }
    
    // Final fallback: Try to get from window.getCurrentPage
    if (!pageNumber && typeof window.getCurrentPage === 'function') {
      pageNumber = window.getCurrentPage();
      console.log(`🔍 [PageConfig] Got page number ${pageNumber} from window.getCurrentPage()`);
    }
    
    console.log(`🔍 [PageConfig] quizCompleted event received for page ${pageNumber}`, event.detail);
    
    if (pageNumber === 2 || pageNumber === 3 || pageNumber === 4 || pageNumber === 5 || pageNumber === 6 || pageNumber === 7 || pageNumber === 8 || pageNumber === 9 || pageNumber === 10) {
      const instructionId = `page${pageNumber}-instruction`;
      console.log(`🔍 [PageConfig] Processing instruction text update for page ${pageNumber}, instructionId: ${instructionId}`);
      
      // Determine the new text
      let continueText;
      // Pages 2, 3, and 4 get specific message, other pages get generic continue message
      if (pageNumber === 2) {
        continueText = getI18nText("pages.page2.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 3) {
        continueText = getI18nText("pages.page3.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 4) {
        continueText = getI18nText("pages.page4.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 5) {
        continueText = getI18nText("pages.page5.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 6) {
        continueText = getI18nText("pages.page6.tapToSeeAnotherShape", "Tap » for the next question");
      } else if (pageNumber === 7) {
        continueText = getI18nText("pages.page7.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else if (pageNumber === 8) {
        continueText = getI18nText("pages.page8.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else if (pageNumber === 9) {
        continueText = getI18nText("pages.page9.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else if (pageNumber === 10) {
        continueText = getI18nText("pages.page10.tapToSeeAnotherShape", "Tap » to see the transformation.");
      } else {
        // All other pages get the generic continue message
        continueText = getI18nText("common.tapToContinue", "Tap » to continue");
      }
        console.log(`🔍 [PageConfig] Page ${pageNumber} will show: "${continueText}"`);
      
      // Store in global state
      window.instructionTextUpdates[instructionId] = continueText;
      console.log(`🔍 [PageConfig] Stored instruction text in global state for ${instructionId}`);
      
      // Dispatch custom event for React components to listen to
      const updateEvent = new CustomEvent('instructionTextUpdate', {
        detail: {
          instructionId: instructionId,
          text: continueText
        }
      });
      window.dispatchEvent(updateEvent);
      console.log(`🔍 [PageConfig] Dispatched instructionTextUpdate event for ${instructionId} with text: "${continueText}"`);
      
      // Also try direct DOM update with retry mechanism
      const updateInstruction = (retryCount = 0) => {
        const instructionElement = document.getElementById(instructionId);
        
        if (instructionElement) {
          console.log(`🔍 [PageConfig] Found instruction element ${instructionId}, updating text...`);
          
          // Try multiple methods to update the text
          instructionElement.textContent = continueText;
          instructionElement.innerText = continueText;
          
          // If it's a React component, try to find the actual DOM node
          const actualNode = instructionElement.querySelector('span') || instructionElement;
          if (actualNode) {
            actualNode.textContent = continueText;
            actualNode.innerText = continueText;
            console.log(`🔍 [PageConfig] Updated actual node text to: "${continueText}"`);
          }
          
          // Also try to update innerHTML if it contains a span
          if (instructionElement.innerHTML) {
            const spanMatch = instructionElement.innerHTML.match(/<span[^>]*>(.*?)<\/span>/);
            if (spanMatch) {
              instructionElement.innerHTML = instructionElement.innerHTML.replace(
                /<span[^>]*>.*?<\/span>/,
                `<span style="display: inline;">${continueText}</span>`
              );
              console.log(`🔍 [PageConfig] Updated innerHTML to: "${continueText}"`);
            }
          }
          
          // Force a re-render by triggering a style change
          const currentDisplay = instructionElement.style.display;
          instructionElement.style.display = 'none';
          setTimeout(() => {
            instructionElement.style.display = currentDisplay || '';
          }, 10);
          
          console.log(`✅ Updated instruction text for page ${pageNumber} to "${continueText}"`);
        } else {
          // Retry up to 10 times with 200ms delay (increased retries)
          if (retryCount < 10) {
            console.log(`🔄 [PageConfig] Instruction element ${instructionId} not found, retrying... (${retryCount + 1}/10)`);
            setTimeout(() => updateInstruction(retryCount + 1), 200);
          } else {
            console.warn(`⚠️ Instruction element ${instructionId} not found after 10 retries`);
          }
        }
      };
      
      // Start update with a small delay to ensure DOM is ready
      setTimeout(() => updateInstruction(0), 100);
    }
  });
  
  console.log("✅ Added quiz completion listeners for pages 2, 3, 4, and 10");
}

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

