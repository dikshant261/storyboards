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
  const questionTextSize = '44gc';

  // Return optimized GridPositionPages
  return {
    1: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page1-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page1.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page1-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [300, 100, 1300, 775], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page1-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [310, 110, 1290, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '48gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: [
          ]
        }
      },

      // Instruction Text
      {
        id: 'page1-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page1.footerInstruction',
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

      {
        id: "page1-next-button",
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
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page1-tap-next",
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
        id: "page1-previous-button",
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
            const nav = pageNavigation[1];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

    ],

    2: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page2-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page2.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page2-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page2-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: questionTextSize,
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page2.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page2-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page2.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          findingsArray: [],

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },

      //1/5 pizza image
      {
        id: 'page2-pizza-image-one',
        name: 'page2-pizza-image-one',
        type: 'custom',
        coordinates: [50, 350, 1040, 790], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page2-pizza-image-one',
          elementName: 'page2-pizza-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/garden.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
        }
      },

      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page2.footerInstruction',
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

    ],

    3: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page3-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page3.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page3-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page3-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: questionTextSize,
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page3.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page3-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page3.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          findingsArray: [],

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page3-shape-display",
          name: "page3-shape-display",
          type: "custom",
          coordinates: [100, 350, 800, 790],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFF00", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#1dac90", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d94", // Fill color (light blue/cyan)
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
      //1/5 pizza image
      {
        id: 'page3-pizza-image-one',
        name: 'page3-pizza-image-one',
        type: 'custom',
        coordinates: [50, 350, 1040, 790], // Bottom of question background, left position (equal spacing)
        zIndex: 51,
        props: {
          componentType: 'ImageStackComponent',
          id: 'page3-pizza-image-one',
          elementName: 'page3-pizza-image-one',
          currentPage: 2,
          coordinates: [144, 500, 450, 775],
          zIndex: 51,
          images: [
            {
              src: 'assets/garden.png',
              blink: false,
              glow: false,
              hidden: false,
              opacity: 1 // Grayed out
            }
          ]
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
          text: getI18nText(
            'pages.page3.footerInstruction',
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

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page4-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page4.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page4-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page4-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: questionTextSize,
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page4.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page4-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page4.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          findingsArray: [],

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page4-shape-display",
          name: "page4-shape-display",
          type: "custom",
          coordinates: [100, 350, 800, 790],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#FFFF00", thickness: "5gc", style: "dashed" },
            diagonal2: { color: "#1dac90", thickness: "5gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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


      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page4.footerInstruction',
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

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page5-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page5.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page5-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page5-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: questionTextSize,
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page5.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page5-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page5.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          findingsArray: [],

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      //d1 = 12m text
      {
        id: 'page3-d1-text',
        name: 'page3-d1-text',
        type: 'textbox',
        coordinates: [550, 450, 700, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page5-shape-display",
          name: "page5-shape-display",
          type: "custom",
          coordinates: [100, 350, 800, 790],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: {},
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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


      // Instruction Text
      {
        id: 'page5-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page5.footerInstruction',
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

    ],
    6: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page6-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page6.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page6-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page6-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: questionTextSize,
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page6.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page6-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page6.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: [],
          findingsArray: [],

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      //d1 = 12m text
      {
        id: 'page3-d1-text',
        name: 'page3-d1-text',
        type: 'textbox',
        coordinates: [550, 450, 700, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page3-area-text',
        name: 'page3-area-text',
        type: 'textbox',
        coordinates: [30, 450, 400, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page6-shape-display",
          name: "page6-shape-display",
          type: "custom",
          coordinates: [100, 350, 800, 790],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: false,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: {},
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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


      // Instruction Text
      {
        id: 'page6-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page6.footerInstruction',
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

    ],
    7: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page7-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page7.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page7-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1090, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Question Text Box Component - Using HighlightedTextComponent
      {
        id: 'page7-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [50, 25, 1025, 450], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: questionTextSize,
          fontWeight: 'normal',
          fontColor: '#ffffff',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.95, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText("pages.page7.highlights", [])
        }
      },

      // Information Analysis Panel
      {
        id: 'page7-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1100, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page7.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: getI18nText("pages.page7.informationAnalysis.toFind", []),
          findingsArray: [],

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      //d1 = 12m text
      {
        id: 'page3-d1-text',
        name: 'page3-d1-text',
        type: 'textbox',
        coordinates: [550, 450, 700, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page3-area-text',
        name: 'page3-area-text',
        type: 'textbox',
        coordinates: [30, 450, 400, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //d2 = ? text
      {
        id: 'page3-d2-text',
        name: 'page3-d2-text',
        type: 'textbox',
        coordinates: [550, 540, 700, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#0000FF',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page7-shape-display",
          name: "page7-shape-display",
          type: "custom",
          coordinates: [100, 350, 800, 790],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: { color: "#0000FF", thickness: "6gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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


      // Instruction Text
      {
        id: 'page7-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page7.footerInstruction',
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

      {
        id: "page7-next-button",
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

    ],
    8: [



      // Black container with 70% opacity
      {
        id: 'page8-black-container',
        name: 'black-container',
        type: 'custom',
        coordinates: [350, 120, 1250, 600], // Adjust coordinates as needed50
        zIndex: 40,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 70% opacity black
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //d1 = 12m text
      {
        id: 'page3-d1-text',
        name: 'page3-d1-text',
        type: 'textbox',
        coordinates: [785, 260, 1000, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page3-area-text',
        name: 'page3-area-text',
        type: 'textbox',
        coordinates: [370, 180, 900, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //d2 = ? text
      {
        id: 'page3-d2-text',
        name: 'page3-d2-text',
        type: 'textbox',
        coordinates: [800, 340, 900, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#0000FF',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page8-shape-display",
          name: "page8-shape-display",
          type: "custom",
          coordinates: [120, 150, 1250, 600],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: { color: "#0000FF", thickness: "6gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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



      // Instruction Text - "Tap >> to identify all the required steps for the addition"
      {
        id: 'page8-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page8.footerInstruction',
            'Tap » to identify all the required steps for the addition'
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

      // Information gathered text with checkmark
      {
        id: 'page8-information-gathered-text',
        name: 'information-gathered-text',
        type: 'textbox',
        coordinates: [5, 650, 1595, 700], // Centered horizontally
        zIndex: 60,
        props: {
          text: getI18nText("pages.page8.informationGathered", '<span style="color: #20B2AA;">&#10003;</span>\u00A0Information gathered from question.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#20B2AA', // Teal color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'normal',
          allowHTML: true
        }
      },

      // Next steps text
      {
        id: 'page8-next-steps-text',
        name: 'next-steps-text',
        type: 'custom',
        coordinates: [350, 730, 1250, 770], // Positioned below information gathered text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page8.nextStep", 'Next - Steps required to find answer'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Orange color
          fontSize: '36gc',
          padding: '5gc',
          textAlign: 'center',
          fontWeight: 'bold'
        }
      },

      {
        id: "page8-next-button",
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
    ],
    9: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page9-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page9.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page9-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1050, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },




      //d1 = 12m text
      {
        id: 'page9-d1-text',
        name: 'page9-d1-text',
        type: 'textbox',
        coordinates: [550, 220, 800, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page9-area-text',
        name: 'page9-area-text',
        type: 'textbox',
        coordinates: [100, 180, 600, 750], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //d2 = ? text
      {
        id: 'page9-d2-text',
        name: 'page9-d2-text',
        type: 'textbox',
        coordinates: [550, 300, 650, 740], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#0000FF',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page9-shape-display",
          name: "page9-shape-display",
          type: "custom",
          coordinates: [50, 120, 850, 550],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: { color: "#0000FF", thickness: "6gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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
      //quiz panel
      {
        id: 'page9-quiz-panel',
        name: 'page9-quiz-panel',
        type: 'custom',
        coordinates: [1055, 100, 1595, 815], // Positioned in the main content area
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page9-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4, QTI4, QT2, QTI2, QTIS2, QTIS4, QTIS2R, QTIS4R
          headerText: '',
          questionText: getI18nText("pages.page9.quizPanel.questionText"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 95,
          questionTextFontSize: '36gc', // Font size for question text (in gc units)
          optionButtonTextSize: '24gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          options: getI18nText("pages.page9.quizPanel.options"),
          keyConcepts: [],
          impFormulae: []
        }
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
          text: getI18nText(
            'pages.page9.footerInstruction',
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
      {
        id: "page9-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 9 },
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
          initialVisible: false, // Hidden until quiz is completed
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

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page10-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page10.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page10-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1050, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },




      //d1 = 12m text
      {
        id: 'page10-d1-text',
        name: 'page10-d1-text',
        type: 'textbox',
        coordinates: [550, 220, 800, 250], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page10-area-text',
        name: 'page10-area-text',
        type: 'textbox',
        coordinates: [100, 180, 600, 250], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //d2 = ? text
      {
        id: 'page10-d2-text',
        name: 'page10-d2-text',
        type: 'textbox',
        coordinates: [550, 300, 650, 350], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#0000FF',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page10-shape-display",
          name: "page10-shape-display",
          type: "custom",
          coordinates: [50, 120, 850, 550],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: { color: "#0000FF", thickness: "6gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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
      // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: 'page10-working-box-1',
        name: 'working-box-1',
        type: 'custom',
        coordinates: [10, 560, 350, 660], // X coordinates match page10-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText("common.formula.areaOfRhombus"),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '40gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '96 m<sup>2</sup>',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '40gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page10-number-box-1',
          onFlipHideTargetId: 'page10-tap-animation-working-box-1'
        }
      },

      // Tap Animation on working-box-1
      {
        id: 'page10-tap-animation-working-box-1',
        name: 'page10-tap-animation-working-box-1',
        type: 'custom',
        coordinates: [15, 590, 75, 690], // Centered on top of working-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.55 // 30% opacity
        }
      },
      //eqaul to
      {
        id: 'page10-equal-to-text',
        name: 'page10-equal-to-text',
        type: 'custom',
        coordinates: [370, 560, 390, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //1/2 tile
      {
        id: 'page10-half-text',
        name: 'page10-half-text',
        type: 'custom',
        coordinates: [410, 560, 550, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.half"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '46gc',
          padding: '5gc',
          allowKatex: true
        }
      },
      //× text
      {
        id: 'page10-×-text',
        name: 'page10-×-text',
        type: 'custom',
        coordinates: [570, 560, 590, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      // First placeholder box (flip tile with question mark that blinks, reveals 3/2 fraction)
      {
        id: 'page10-working-box-2',
        name: 'working-box-2',
        type: 'custom',
        coordinates: [610, 560, 750, 660], // X coordinates match page10-number-box-1, Width: 150, Height: 100, moved down 25gc
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: getI18nText("common.formula.diagonal1"),
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '40gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backHtml: '12 m',
          flipMode: 'correct',
          backBackgroundColor: 'rgba(74, 85, 104, 0.45)', // Not used when flipMode is 'correct', but kept for reference
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '40gc',
          backFontWeight: 'normal',
          onFlipChangeTargetId: 'page10-number-box-2',
          onFlipHideTargetId: 'page10-tap-animation-working-box-2'
        }
      },

      // Tap Animation on working-box-1
      {
        id: 'page10-tap-animation-working-box-2',
        name: 'page10-tap-animation-working-box-2',
        type: 'custom',
        coordinates: [610, 590, 680, 690], // Centered on top of working-box-1, moved down 25gc and left 20gc
        zIndex: 70,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: 'Tap',
          alwaysShow: true,
          opacity: 0.55 // 30% opacity
        }
      },
      //× text
      {
        id: 'page10-×-text-2',
        name: 'page10-×-text-2',
        type: 'custom',
        coordinates: [770, 560, 790, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //d2 tile text
      {
        id: 'page10-d2-tile-text',
        name: 'page10-d2-tile-text',
        type: 'custom',
        coordinates: [810, 560, 950, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.diagonal2"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },

      // Information Analysis Panel
      {
        id: 'page10-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1055, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page10.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: getI18nText("pages.page10.informationAnalysis.toFind", []),
          findingsArray: getI18nText("pages.page10.informationAnalysis.findingsArray", []),

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      // Instruction Text
      {
        id: 'page10-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page10.footerInstruction',
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
      {
        id: "page10-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 10 },
          get text() {
            return getI18nText("buttons.next");
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
          imageAlt: getI18nText("common.tapAlt"),
          initialVisible: false, // Hidden until quiz is completed
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
            return getI18nText("buttons.previous");
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
    11: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page11-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page11.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page11-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1050, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },




      //d1 = 12m text
      {
        id: 'page11-d1-text',
        name: 'page11-d1-text',
        type: 'textbox',
        coordinates: [550, 220, 800, 250], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page11-area-text',
        name: 'page11-area-text',
        type: 'textbox',
        coordinates: [100, 180, 600, 250], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //d2 = ? text
      {
        id: 'page11-d2-text',
        name: 'page11-d2-text',
        type: 'textbox',
        coordinates: [550, 300, 650, 350], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#0000FF',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page11-shape-display",
          name: "page11-shape-display",
          type: "custom",
          coordinates: [50, 120, 850, 550],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: { color: "#0000FF", thickness: "6gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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
      //96 m^2 tile text
      {
        id: 'page11-area-96-m2-text',
        name: 'page11-area-96-m2-text',
        type: 'custom',
        coordinates: [20, 560, 170, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.area"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },



      //eqaul to
      {
        id: 'page11-equal-to-text',
        name: 'page11-equal-to-text',
        type: 'custom',
        coordinates: [190, 560, 210, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //1/2 tile
      {
        id: 'page11-half-text',
        name: 'page11-half-text',
        type: 'custom',
        coordinates: [230, 560, 370, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.half"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '46gc',
          padding: '5gc',
          allowKatex: true
        }
      },
      //× text
      {
        id: 'page11-×-text',
        name: 'page11-×-text',
        type: 'custom',
        coordinates: [390, 560, 410, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      // d1 tile text
      {
        id: 'page11-d1-tile-text',
        name: 'page11-d1-tile-text',
        type: 'custom',
        coordinates: [430, 560, 570, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '12 m', // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },

      //× text
      {
        id: 'page11-×-text-2',
        name: 'page11-×-text-2',
        type: 'custom',
        coordinates: [590, 560, 610, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //d2 tile text
      {
        id: 'page11-d2-tile-text',
        name: 'page11-d2-tile-text',
        type: 'custom',
        coordinates: [630, 560, 770, 660], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.diagonal2"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //d2 tile text -2
      {
        id: 'page11-d2-tile-text-2',
        name: 'page11-d2-tile-text-2',
        type: 'custom',
        coordinates: [20, 680, 170, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.diagonal2"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //eqaul to
      {
        id: 'page11-equal-to-text-2',
        name: 'page11-equal-to-text-2',
        type: 'custom',
        coordinates: [190, 680, 210, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //all equation text
      {
        id: 'page11-all-equation-text',
        name: 'page11-all-equation-text',
        type: 'custom',
        coordinates: [230, 680, 470, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.allEquation"), // Empty text, just for background
          backgroundColor: '#524e4e', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '50gc',
          padding: '0gc'
        }
      },
      //eqaul to
      {
        id: 'page11-equal-to-text-3',
        name: 'page11-equal-to-text-3',
        type: 'custom',
        coordinates: [490, 680, 510, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //tile 1
      {
        id: 'page11-tile-1',
        name: 'page11-tile-1',
        type: 'tile',
        coordinates: [530, 680, 670, 780],
        zIndex: 1000,
        props: {
          componentType: 'TileComponent',
          mode: 'focus', // Start in out-of-focus mode
          text: '',
          backgroundColor: '#746B18',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#ffffff', // Black text
          fontSize: '60gc',
          fontWeight: 'bold',
          padding: '5gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      //m text
      {
        id: 'page11-m-text-2',
        name: 'page11-m-text-2',
        type: 'custom',
        coordinates: [690, 680, 710, 780], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.m"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //number pad
      {
        id: 'page11-number-pad',
        name: 'page11-number-pad',
        type: 'number-pad-panel',
        coordinates: [1055, 100, 1595, 800],
        zIndex: 'var(--z-elevated)',
        props: {
          backgroundColor: '#8B4513',
          borderRadius: '15gc',
          border: '4px solid #D2691E',
          padding: '20gc',
          layout: 'vertical',            // Layout type: 'vertical' (4 rows, 3 cols) or 'horizontal' (3 rows, 4 cols)
          buttonConfig: 2,               // Button configuration: 1 (numbers only), 2 (numbers + C + ⌫), 3 (numbers + + - . + C + ⌫), 4 (numbers + × ÷ . + C + ⌫)
          enableClickSound: true,        // Enable click sound for number pad buttons (default: true)
          inputMode: 'append',           // Input mode: 'replace' (each click replaces text) or 'append' (each click appends to text)
          maxNumber: 999,               // Maximum number allowed in append mode (if exceeded, plays wrong sound and prevents input)
          feedbackMode: 'feedback',       // Feedback mode: 'instruction' (text doesn't change on check) or 'feedback' (text changes on check)
          feedbackComponentId: null,     // ID of external feedback component to update when check is pressed (e.g., 'page11-feedback-textbox')
          destinations: [

            {
              destinationId: "page11-tile-1", // Quotient tile
              destinationType: "tile",
              correctValue: '16',
              // correctValue: question[currentQuizIndex]?.box1Numpad.correctValue,
              // Dynamic feedback messages
              correctFeedback: getI18nText("pages.page11.numpad.tile1.correct"),
              incorrectFeedback: getI18nText("pages.page11.numpad.tile1.inCorrect"),
              emptyFeedback: getI18nText(
                "pages.page11.feedback.emptyFeedback",
                "Fill the highlighted box before checking"
              ),
              // Optional: mode to set on correct/incorrect
              correctMode: "correct",
              incorrectMode: "incorrect",
            },
          ],              // Array of destination objects: [{destinationId, correctValue, correctFeedback, incorrectFeedback}, ...]
          destinationIndex: 0,           // Current index in destinations array (starts at 0)
          feedbackRowHeight: '35%',      // Height percentage for feedback text area
          buttonGridHeight: '51%',       // Height percentage for number pad grid
          checkButtonHeight: '10%',      // Height percentage for check button

          showButton: {
            backgroundColor: '#FFD700',
            color: '#000000',
            fontSize: '35gc',
            fontWeight: 'bold',
            text: 'show 💡'
          },

          numberButtons: {
            backgroundColor: '#FFD700',
            color: '#000000',
            fontSize: '45gc',
            fontWeight: 'bold',
            buttonWidthPercent: '90%',  // Width percentage of grid cell
            buttonHeightPercent: '90%'  // Height percentage of grid cell
          },

          checkButton: {
            backgroundColor: '#FF8C00',
            color: '#000000',
            fontSize: '35gc',
            fontWeight: 'bold',
            text: 'CHECK'
          }
        },
      },
      // Instruction Text
      {
        id: 'page11-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page11.footerInstruction',
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
      {
        id: "page11-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 11 },
          get text() {
            return getI18nText("buttons.next");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[11];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page11-tap-next",
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
        id: "page11-previous-button",
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
            const nav = pageNavigation[11];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

    ],
    12: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page12-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page12.headerText',
            "Read the question and identify 'given' and 'to find'"
          ),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Black background container for question text
      {
        id: 'page12-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [10, 100, 1050, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },




      //d1 = 12m text
      {
        id: 'page12-d1-text',
        name: 'page12-d1-text',
        type: 'textbox',
        coordinates: [550, 220, 800, 250], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d1"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#387637',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //area of garden = 60m^2 text
      {
        id: 'page12-area-text',
        name: 'page12-area-text',
        type: 'textbox',
        coordinates: [100, 180, 600, 250], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.areaOfGarden"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#FFD957',
          fontSize: '48gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      //d2 = ? text
      {
        id: 'page12-d2-text',
        name: 'page12-d2-text',
        type: 'textbox',
        coordinates: [550, 300, 710, 350], // Same coordinates as question text box
        zIndex: 1000, // Behind the text box
        props: {
          text: getI18nText("common.rhombus.d2Result"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          color: '#0000FF',
          fontSize: '32gc',
          padding: '0gc',
          allowHTML: true,
          fontWeight: 'bold',
        }
      },
      // Display Shape (no build mode) - Reads shape configuration from constants.js
      (() => {
        const shapeConfig = getShapeConfig();
        return {
          id: "page12-shape-display",
          name: "page12-shape-display",
          type: "custom",
          coordinates: [50, 120, 850, 550],
          zIndex: 40,
          props: {
            componentType: "QuadrilateralComponent",
            mode: "default", // Default mode (not build mode)
            quadType: "KITE", // Override to kite for page 3
            vertices: [
              { row: 0.2, col: 7 },    // Top (higher)
              { row: 4, col: 12.3 },   // Right (far right for extended base)
              { row: 9.5, col: 7 },    // Bottom (slightly right for shape tilt)
              { row: 4, col: 2 }     // Left (far left for longer left-right span)
            ], // Kite vertices (adjusted to match image)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: true,
            showDiagonal1: true,
            showDiagonal2: true,
            diagonalColor: "#FFFFFF",
            diagonal1: { color: "#387637", thickness: "6gc", style: "dashed" },
            diagonal2: { color: "#0000FF", thickness: "6gc", style: "dashed" },
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#FFFFFF", // Border color (light coral/salmon)
            edgeThickness: "5gc", // Increased border width
            fillColor: "#f1ea2d", // Fill color (light blue/cyan)
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
      //96 m^2 tile text
      {
        id: 'page12-area-96-m2-text',
        name: 'page12-area-96-m2-text',
        type: 'custom',
        coordinates: [20, 540, 170, 640], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.area"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },



      //eqaul to
      {
        id: 'page12-equal-to-text',
        name: 'page12-equal-to-text',
        type: 'custom',
        coordinates: [170, 540, 190, 640], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //1/2 tile
      {
        id: 'page12-half-text',
        name: 'page12-half-text',
        type: 'custom',
        coordinates: [210, 540, 250, 640], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.half"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '46gc',
          padding: '5gc',
          allowKatex: true
        }
      },
      //× text
      {
        id: 'page12-×-text',
        name: 'page12-×-text',
        type: 'custom',
        coordinates: [270, 540, 290, 640], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      // d1 tile text
      {
        id: 'page12-d1-tile-text',
        name: 'page12-d1-tile-text',
        type: 'custom',
        coordinates: [310, 540, 400, 640], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '12 m', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },

      //× text
      {
        id: 'page12-×-text-2',
        name: 'page12-×-text-2',
        type: 'custom',
        coordinates: [420, 540, 440, 640  ], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×', // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //d2 tile text
      {
        id: 'page12-d2-tile-text',
        name: 'page12-d2-tile-text',
        type: 'custom',
        coordinates: [460, 540, 500, 640], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.diagonal2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //d2 tile text -2
      {
        id: 'page12-d2-tile-text-2',
        name: 'page12-d2-tile-text-2',
        type: 'custom',
        coordinates: [30, 640, 100, 740], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.diagonal2"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      //eqaul to
      {
        id: 'page12-equal-to-text-2',
        name: 'page12-equal-to-text-2',
        type: 'custom',
        coordinates: [170, 640, 190, 740], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //all equation text
      {
        id: 'page12-all-equation-text',
        name: 'page12-all-equation-text',
        type: 'custom',
        coordinates: [210, 640, 390, 740], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.allEquation"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '50gc',
          padding: '0gc'
        }
      },
      //eqaul to
      {
        id: 'page12-equal-to-text-3',
        name: 'page12-equal-to-text-3',
        type: 'custom',
        coordinates: [410, 640, 440, 740], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("common.formula.equalTo"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '48gc',
          padding: '0gc'
        }
      },
      //tile 1
      {
        id: 'page12-tile-1',
        name: 'page12-tile-1',
        type: 'tile',
        coordinates: [460, 640, 570, 740],
        zIndex: 1000,
        props: {
          componentType: 'TileComponent',
          mode: 'focus', // Start in out-of-focus mode
          text: '16 m',
          backgroundColor:'',
          borderColor: '#ffffff', // White border
          borderWidth: '0gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#ffffff', // Black text
          fontSize: '40gc',
          fontWeight: 'bold',
          padding: '5gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
     //summary text
      {
        id: 'page12-summary-text',
        name: 'page12-summary-text',
        type: 'custom',
        coordinates: [20, 750, 820, 790], // Same coordinates as question text box
        zIndex: 55, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page12.summaryText"), // Empty text, just for background
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#FFFFFF',
          fontSize: '40gc',
          padding: '0gc'
        }
      },
      // Information Analysis Panel
      {
        id: 'page12-information-analysis-panel',
        name: 'information-analysis-panel',
        type: 'custom',
        coordinates: [1055, 100, 1590, 810], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'InformationAnalysisComponent',
          factsArray: getI18nText("pages.page12.informationAnalysis.facts", []),
          valueArray: [],
          toFindArray: getI18nText("pages.page12.informationAnalysis.toFind", []),
          findingsArray: getI18nText("pages.page12.informationAnalysis.findingsArray", []),

          headerText: getI18nText('components.informationAnalysis.headerText', 'INFORMATION ANALYSIS'),
          factsTitle: getI18nText('components.informationAnalysis.factsTitle', 'Facts'),
          valueTitle: getI18nText('components.informationAnalysis.valueTitle', 'Value'),
          toFindTitle: getI18nText('components.informationAnalysis.toFindTitle', 'To Find')
        }
      },
      // Instruction Text
      {
        id: 'page12-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page12.footerInstruction',
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
      {
        id: "page12-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1400, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          fontSize: '32gc',
          get text() {
            return getI18nText("buttons.startOver");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[11];
            window.location.reload(); // Reload the page to reset the state
          },
        },
      },

      {
        id: "page12-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1400, 840, 1450, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt"),
        },
      },

      {
        id: "page12-previous-button",
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
            const nav = pageNavigation[12];
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

