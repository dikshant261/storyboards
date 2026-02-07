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
 * Different navigation for English (en) and Indonesian (id) languages
 */

// Helper function to get current language
const getCurrentLanguage = () => {
  if (typeof window !== 'undefined' && window.AppData?.currentLanguage) {
    return window.AppData.currentLanguage;
  }
  if (typeof AppData !== 'undefined' && AppData.currentLanguage) {
    return AppData.currentLanguage;
  }
  return 'en'; // Default to English
};

// Page navigation: 1 -> 3 -> 4 -> 2 -> 5 -> 6 -> 7 -> 8 -> 9
const pageNavigation = {
  1: { prev: null, next: 3 },
  3: { prev: 1, next: 4 },
  4: { prev: 3, next: 2 },
  2: { prev: 4, next: 5 },
  5: { prev: 2, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: 9 },
  9: { prev: 8, next: null },
};

// Alias for backward compatibility (both languages use the same navigation)
const pageNavigationEn = pageNavigation;
const pageNavigationId = pageNavigation;

// Get the page navigation (common for all languages)
const getPageNavigationConfig = () => {
  return pageNavigation;
};

/**
 * Get all page numbers in navigation order
 * @returns {number[]} Array of page numbers in order
 */
const getPageNumbers = () => {
  const pages = [];
  let currentPage = 1;
  const nav = getPageNavigationConfig();

  // Find the first page (where prev is null)
  while (currentPage && nav[currentPage]) {
    pages.push(currentPage);
    currentPage = nav[currentPage].next;
  }

  return pages;
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
 * Extract page number from element ID
 * @param {string} id - Element ID (e.g., 'page1-next-button', 'page2-previous-button')
 * @returns {number} Extracted page number (defaults to 1 if not found)
 */
const extractPageNumberFromId = (id) => {
  if (!id) return 1;
  const match = id.match(/page(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

/**
 * Helper function to navigate to a page
 * @param {number} targetPage - The page number to navigate to
 * @param {string} direction - 'next' or 'previous' (for logging)
 */
const navigateToPage = (targetPage, direction = "unknown") => {
  if (typeof window !== "undefined") {
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
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Helper function for i18n text (accessible globally within this module)
 * @param {string} key - Translation key
 * @param {string} fallback - Fallback text if translation not found
 * @param {Object} params - Parameters for interpolation
 * @returns {string} Translated or fallback text
 */
const getI18nText = (key, fallback, params = {}) => {
  return typeof i18n !== "undefined" ? i18n.t(key, params) : fallback;
};

/**
 * Get page navigation info (previous and next pages)
 * @param {number} pageNumber - Current page number
 * @returns {Object|null} Navigation object with prevPage and nextPage, or null if not found
 */
const getPageNavigation = (pageNumber) => {
  const nav = getPageNavigationConfig();
  return nav[pageNumber] || null;
};

/**
 * Comprehensive state reset function for "Start Over"
 * Resets all component states, stores, and page-specific data
 */
const resetAllStates = () => {
  console.log('🔄 [Reset All States] Starting comprehensive state reset...');

  if (typeof window === 'undefined') return;

  try {
    // Clear all component state stores
    const stateStores = [
      'fillBlanksStateStore',
      'arrangeStepsStateStore',
      'calculationStepsStateStore',
      'quizPanelStateStore'
    ];

    stateStores.forEach(storeName => {
      if (window[storeName]) {
        window[storeName] = {};
        console.log(`🔄 [Reset All States] Cleared ${storeName}`);
      }
    });

    // Clear page completion states
    if (window.PageCompletionManager) {
      window.PageCompletionManager.init();
      if (window.pageCompletionState) {
        Object.keys(window.pageCompletionState).forEach(key => {
          delete window.pageCompletionState[key];
        });
        console.log('🔄 [Reset All States] Cleared all page completion states');
      }
    }

    // Clear any page-specific feedback states and component states
    Object.keys(window).forEach(key => {
      if (key.includes('FillBlanksState') ||
        key.includes('FeedbackState') ||
        key.includes('QuizState') ||
        key.includes('PageState') ||
        key.match(/^page\d+complete$/i) ||
        key.match(/^page\d+State$/i) ||
        key.match(/^page\d+FillBlanksState$/i) ||
        key.match(/^page\d+FeedbackState$/i) ||
        key.match(/^page\d+QuizState$/i)) {
        delete window[key];
        console.log(`🔄 [Reset All States] Cleared ${key}`);
      }
    });

    // Clear visual elements
    const clearFunctions = ['clearCheckOverlays', 'clearIncrementBorders', 'clearColumnNumbers'];
    clearFunctions.forEach(fn => {
      if (typeof window[fn] === 'function') {
        window[fn]();
        console.log(`🔄 [Reset All States] Called ${fn}`);
      }
    });

    // Reset global variables
    if (window.page1complete !== undefined) {
      window.page1complete = false;
    }
    if (window.objectsremoved !== undefined) {
      window.objectsremoved = 0;
    }
    if (window.currentQuestionIndex !== undefined) {
      window.currentQuestionIndex = 0;
    }

    // Clear localStorage and sessionStorage (optional - uncomment if needed)
    // try {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   console.log('🔄 [Reset All States] Cleared localStorage and sessionStorage');
    // } catch (e) {
    //   console.warn('🔄 [Reset All States] Could not clear storage:', e);
    // }

    // Note: We don't manually remove DOM elements here because React manages them.
    // The React key fix (page${currentPage}-${element.id}) ensures proper unmounting.
    // Manual DOM manipulation would conflict with React's lifecycle.

    // Reset any component-specific state
    // Force re-render of all components by dispatching a reset event
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('appStateReset', {
        detail: { timestamp: Date.now() }
      }));
      console.log('🔄 [Reset All States] Dispatched appStateReset event');
    }

    console.log('✅ [Reset All States] State reset completed');
  } catch (error) {
    console.error('❌ [Reset All States] Error during state reset:', error);
  }
};

/**
 * Check if previous button should be disabled
 * @param {number} pageNumber - Current page number
 * @returns {boolean} True if previous button should be disabled
 */
const isPrevButtonDisabled = (pageNumber) => {
  const nav = getPageNavigation(pageNumber);
  return !nav || nav.prev === null;
};

/**
 * Get next button text based on page number
 * @param {number} pageNumber - Current page number
 * @returns {string} Text to display on next button
 */
const getNextButtonText = (pageNumber) => {
  const nav = getPageNavigation(pageNumber);
  // If there's no next page, show "Start Over" or similar
  if (!nav || nav.next === null) {
    return getI18nText("buttons.startOver", "Start Over");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next", "»");
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

  const questionBottom_Y = 200;
  const questionTextSize = '28gc';

  // Helper function to get CSS variable value
  const getCSSVariable = (variableName, fallback = '') => {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      try {
        const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
        return value || fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

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
          text: getI18nText('pages.page1.headerText', "Read the question and identify 'given' and 'to find'"),
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
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page1.highlights', [])
        }
      },

      // Question Image
      {
        id: 'page1-question-image',
        name: 'question-image',
        type: 'custom',
        coordinates: [950, 150, 1550, 800], // Same location as the previous triangle
        zIndex: 52,
        props: {
          componentType: 'ImageStackComponent',
          images: [
            {
              src: 'assets/questionImage.png',
              opacity: 1.0
            }
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
            getI18nText('pages.page1.footerInstruction', "Tap » to identify 'given' information")
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

      // Tap Animation GIF
      {
        id: 'page1-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page1-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page1-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page1-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page1-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page1-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page1-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

    2: [

      // Header Text - "Let us visualise the problem to solve it"
      {
        id: 'page2-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.headerText', "Let us visualise the problem to solve it"),
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
      // {
      //   id: 'page2-question-background',
      //   name: 'question-background',
      //   type: 'custom',
      //   coordinates: [50, 100, 900, 775], // Same coordinates as question text box
      //   zIndex: 49, // Behind the text box
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '', // Empty text, just for background
      //     backgroundColor: 'rgba(0, 0, 0, 0.4)', // 40% opacity black
      //     border: 'none',
      //     borderRadius: '15gc',
      //     textColor: '#ffffff',
      //     fontSize: '1gc',
      //     padding: '0gc'
      //   }
      // },

      // Question Text Box Component - Using HighlightedTextComponent

      // Question Image
      // {
      //   id: 'page2-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },

      {
        id: "page2-geometry-grid-1",
        name: "page2-geometry-grid-1",
        type: "custom",
        coordinates: [70, 90, 500, 610], // Moved 215gc to the left and 50gc up
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: null,
              labelOffset: { x: '0gc', y: '0gc' },
              labelSize: '28gc',
              labelColor: '#FFFFFF',
              size: '0gc',
              color: 'transparent',
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;
                // Label offsets based on position (top, right, bottom, left)
                const labelOffsets = [
                  { x: '0gc', y: '-30gc' },  // Top vertex
                  { x: '30gc', y: '0gc' },   // Right vertex
                  { x: '0gc', y: '30gc' },   // Bottom vertex
                  { x: '-30gc', y: '0gc' }   // Left vertex
                ];
                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: null, // No labels
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '28gc',
                  labelColor: '#FFFFFF',
                  size: '8gc', // Visible size for the dot
                  color: '#FFFFFF', // White color for visibility
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;
                allConnections.push({
                  id: `${pointId}-${nextPointId}`,
                  from: pointId,
                  to: nextPointId,
                  color: rhombusColor,
                  thickness: '4gc',
                  style: 'solid',
                  clickable: false
                });
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Left side: C4-B4, B4-A4
            allConnections.push({
              id: 'C4-B4',
              from: 'C4',
              to: 'B4',
              color: '#FFFFFF', // White, same as other edges
              thickness: '2gc', // Slightly thicker to ensure visibility for notch placement
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B4-A4',
              from: 'B4',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Right side: C2-B2, B2-A2
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Bottom side: C3-B3, B3-A3
            allConnections.push({
              id: 'C3-B3',
              from: 'C3',
              to: 'B3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B3-A3',
              from: 'B3',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (A1, A2, A3, A4)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A3',
              from: 'O',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A4',
              from: 'O',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 2] Added connections for notches:', [
              'C4-B4', 'B4-A4', 'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1', 'C3-B3', 'B3-A3',
              'O-A1', 'O-A2', 'O-A3', 'O-A4'
            ]);
            console.log('✅ [Page 2] Total connections:', allConnections.length);
            console.log('✅ [Page 2] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // Add notches (tick marks) to specific line segments
          // Note: side must match connection ID exactly (case-insensitive)
          // Using #FF9900 to match feedback notch recognition in the component
          sideSymbols: (() => {
            const symbols = [
              // Left side
              { side: 'C4-B4', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B4-A4', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Right side  
              { side: 'C2-B2', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B2-A2', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Top side
              { side: 'C1-B1', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B1-A1', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Bottom side
              { side: 'C3-B3', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B3-A3', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Center to inner rhombus
              { side: 'O-A1', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'O-A2', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'O-A3', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'O-A4', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 }
            ];
            console.log('✅ [Page 2] sideSymbols configured:', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },

      {
        id: "page2-geometry-grid-2",
        name: "page2-geometry-grid-2",
        type: "custom",
        coordinates: [70, 90, 500, 610], // Moved 215gc to the left and 50gc up
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: null,
              labelOffset: { x: '0gc', y: '0gc' },
              labelSize: '28gc',
              labelColor: '#FFFFFF',
              size: '8gc', // Visible size for the dot
              color: '#FFFFFF', // White color for visibility
              clickable: false
            });

            // Define colors for each rhombus (same as page2-geometry-grid-1)
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;
                // Label offsets based on position (top, right, bottom, left)
                const labelOffsets = [
                  { x: '0gc', y: '-30gc' },  // Top vertex
                  { x: '30gc', y: '0gc' },   // Right vertex
                  { x: '0gc', y: '30gc' },   // Bottom vertex
                  { x: '-30gc', y: '0gc' }   // Left vertex
                ];
                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: null, // No labels
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '28gc',
                  labelColor: '#FFFFFF',
                  size: '0gc', // Hidden initially, will be shown when rhombus is hidden
                  color: 'transparent', // Hidden initially
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;
                allConnections.push({
                  id: `${pointId}-${nextPointId}`,
                  from: pointId,
                  to: nextPointId,
                  color: rhombusColor,
                  thickness: '4gc',
                  style: 'solid',
                  clickable: false
                });
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Left side: C4-B4, B4-A4
            allConnections.push({
              id: 'C4-B4',
              from: 'C4',
              to: 'B4',
              color: '#FFFFFF', // White, same as other edges
              thickness: '2gc', // Slightly thicker to ensure visibility for notch placement
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B4-A4',
              from: 'B4',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Right side: C2-B2, B2-A2
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Bottom side: C3-B3, B3-A3
            allConnections.push({
              id: 'C3-B3',
              from: 'C3',
              to: 'B3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B3-A3',
              from: 'B3',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (A1, A2, A3, A4)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A3',
              from: 'O',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A4',
              from: 'O',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 2] Added connections for notches:', [
              'C4-B4', 'B4-A4', 'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1', 'C3-B3', 'B3-A3',
              'O-A1', 'O-A2', 'O-A3', 'O-A4'
            ]);
            console.log('✅ [Page 2] Total connections:', allConnections.length);
            console.log('✅ [Page 2] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // No notches for page2-geometry-grid-2
          sideSymbols: [],

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },

      // Horizontal dashed line below the shape
      {
        id: 'page2-horizontal-line',
        name: 'horizontal-line',
        type: 'custom',
        coordinates: [90, 575, 478, 575], // Horizontal line to the left of shape, below it
        zIndex: 46,
        props: {
          componentType: 'LineComponent',
          lineType: 'horizontal',
          borderWidth: '2gc',
          borderColor: '#FFFFFF',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // Vertical dashed line to the left of the shape
      {
        id: 'page2-vertical-line',
        name: 'vertical-line',
        type: 'custom',
        coordinates: [80, 160, 80, 545], // Vertical line to the left of shape
        zIndex: 46,
        props: {
          componentType: 'LineComponent',
          lineType: 'vertical',
          borderWidth: '2gc',
          borderColor: '#FFFFFF',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // Text "3 m" for horizontal line
      {
        id: 'page2-horizontal-text',
        name: 'horizontal-text',
        type: 'custom',
        coordinates: [260, 580, 320, 620], // Below the horizontal line, horizontally centered
        zIndex: 47,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('pages.page2.measurementLabel', '3 m'),
          fontSize: '32gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '0gc',
          justifyContent: 'center',
          textAlign: 'center',
          highlights: []
        }
      },

      // Text "3 m" for vertical line
      {
        id: 'page2-vertical-text',
        name: 'vertical-text',
        type: 'custom',
        coordinates: [20, 330, 75, 375], // To the left of the vertical line, vertically centered
        zIndex: 47,
        props: {
          componentType: 'HighlightedTextComponent',
          text: '3 m',
          fontSize: '32gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '0gc',
          justifyContent: 'center',
          textAlign: 'center',
          highlights: []
        }
      },

      // Replica horizontal dashed line (moves with page2-geometry-grid-2)
      {
        id: 'page2-horizontal-line-2',
        name: 'horizontal-line-2',
        type: 'custom',
        coordinates: [90, 575, 478, 575], // Horizontal line to the left of shape, below it
        zIndex: 46,
        props: {
          componentType: 'LineComponent',
          lineType: 'horizontal',
          borderWidth: '2gc',
          borderColor: '#FFFFFF',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // Replica vertical dashed line (moves with page2-geometry-grid-2)
      {
        id: 'page2-vertical-line-2',
        name: 'vertical-line-2',
        type: 'custom',
        coordinates: [80, 160, 80, 545], // Vertical line to the left of shape
        zIndex: 46,
        props: {
          componentType: 'LineComponent',
          lineType: 'vertical',
          borderWidth: '2gc',
          borderColor: '#FFFFFF',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // Replica text "3 m" for horizontal line (moves with page2-geometry-grid-2)
      {
        id: 'page2-horizontal-text-2',
        name: 'horizontal-text-2',
        type: 'custom',
        coordinates: [260, 580, 320, 620], // Below the horizontal line, horizontally centered
        zIndex: 47,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('pages.page2.measurementLabel', '3 m'),
          fontSize: '32gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '0gc',
          justifyContent: 'center',
          textAlign: 'center',
          highlights: []
        }
      },

      // Replica text "3 m" for vertical line (moves with page2-geometry-grid-2)
      {
        id: 'page2-vertical-text-2',
        name: 'vertical-text-2',
        type: 'custom',
        coordinates: [20, 330, 75, 375], // To the left of the vertical line, vertically centered
        zIndex: 47,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('pages.page2.measurementLabel', '3 m'),
          fontSize: '32gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '0gc',
          justifyContent: 'center',
          textAlign: 'center',
          highlights: []
        }
      },

      // Tap Animation GIF for measurement button
      {
        id: 'page2-measurement-button-tap',
        name: 'measurement-button-tap',
        type: 'custom',
        coordinates: [125, 675, 200, 750], // Above the button, centered
        zIndex: 49,
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: true, // Visible when button is enabled
          opacity: 0.75
        }
      },

      // Button below horizontal text
      {
        id: 'page2-measurement-button',
        name: 'measurement-button',
        type: 'button',
        coordinates: [125, 650, 450, 750], // Below the horizontal text
        zIndex: 48,
        props: {
          componentType: 'NextButtonComponent',
          text: getI18nText('pages.page2.buttonText', 'Visualise the problem'),
          fontSize: '32gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '8gc',
          padding: '10gc',
          cursor: 'pointer',
          textAlign: 'center',
          onClick: () => {
            console.log('Measurement button clicked');

            // Helper function to update header and instruction text
            const updateHeaderAndInstruction = (headerText, instructionText) => {
              // Update header text (TeacherNoteComponent)
              // Try multiple methods to find the element
              let headerElement = document.getElementById('page2-header-text');

              // If not found by ID, try by data attributes
              if (!headerElement) {
                headerElement = document.querySelector('[data-element-type="teacher-note"][data-grid-position="header-text"]');
              }

              // If still not found, try by class name and position (header is at top)
              if (!headerElement) {
                const teacherNotes = document.querySelectorAll('.teacher-note-text-box');
                for (const note of teacherNotes) {
                  // Check if it's in the header area (coordinates: [5, 25, 1575, 75])
                  const rect = note.getBoundingClientRect();
                  const viewportHeight = window.innerHeight || 900;
                  // Header is at top (around 2-8% from top)
                  if (rect.top < viewportHeight * 0.1) {
                    headerElement = note;
                    break;
                  }
                }
              }

              // If still not found, try to find by text content
              if (!headerElement) {
                const teacherNotes = document.querySelectorAll('[data-element-type="teacher-note"], .teacher-note-text-box');
                for (const note of teacherNotes) {
                  const text = note.textContent || note.innerText;
                  // Check if it contains the initial header text
                  if (text && (text.includes('Let us visualise') ||
                    text.includes('Read the question'))) {
                    headerElement = note;
                    break;
                  }
                }
              }

              if (headerElement) {
                // TeacherNoteComponent renders text in a span element (with ref: contentRef)
                // The span is a direct child of the .teacher-note-text-box div
                const textSpan = headerElement.querySelector('span');
                if (textSpan) {
                  // Update the span's text content
                  textSpan.textContent = headerText;
                  console.log('✅ Updated header text to:', headerText);
                } else {
                  // Fallback: update the element directly
                  headerElement.textContent = headerText;
                  console.log('✅ Updated header text (fallback) to:', headerText);
                }
              } else {
                console.warn('⚠️ Header element not found - tried ID, data attributes, class/position, and text content');
              }

              // Update instruction text (SectionHeaderComponent)
              // Try multiple methods to find the element since SectionHeaderComponent uses React.useId()
              let instructionElement = document.getElementById('page2-instruction-text');

              // If not found by ID, try by data attributes
              if (!instructionElement) {
                instructionElement = document.querySelector('[data-element-type="section-header"][data-grid-position="instruction-text"]');
              }

              // If still not found, try by class name
              if (!instructionElement) {
                const sectionHeaders = document.querySelectorAll('.section-header');
                for (const header of sectionHeaders) {
                  // Check if it's in the footer area (coordinates: [155, 820, 1445, 895])
                  const rect = header.getBoundingClientRect();
                  const viewportHeight = window.innerHeight || 900;
                  // Footer is at bottom (around 91% from top)
                  if (rect.top > viewportHeight * 0.85) {
                    instructionElement = header;
                    break;
                  }
                }
              }

              // If still not found, try to find by text content
              if (!instructionElement) {
                const allSectionHeaders = document.querySelectorAll('[data-element-type="section-header"], .section-header');
                for (const header of allSectionHeaders) {
                  const text = header.textContent || header.innerText;
                  // Check if it contains the initial instruction text
                  if (text && (text.includes('Click on the highlighted button') ||
                    text.includes('Tap » to identify'))) {
                    instructionElement = header;
                    break;
                  }
                }
              }

              if (instructionElement) {
                // SectionHeaderComponent renders text directly or in a span
                // The text might be in the element itself or in a nested span
                const textElement = instructionElement.querySelector('span') || instructionElement;

                // Update text content
                if (textElement) {
                  // Check if the element has innerHTML with spans (for underlined text)
                  if (textElement.innerHTML && textElement.innerHTML.includes('<span')) {
                    // Replace the entire content
                    textElement.innerHTML = instructionText;
                  } else {
                    textElement.textContent = instructionText;
                  }
                  console.log('✅ Updated instruction text to:', instructionText);
                } else {
                  // Fallback: update the element directly
                  instructionElement.textContent = instructionText;
                  console.log('✅ Updated instruction text (fallback) to:', instructionText);
                }
              } else {
                console.warn('⚠️ Instruction element not found - tried ID, data attributes, and text content');
              }
            };

            // Reset the page before starting animation
            console.log('🔄 Resetting page...');

            // Reset header and instruction text to initial state
            updateHeaderAndInstruction(
              getI18nText('pages.page2.headerText', "Let us visualise the problem to solve it"),
              getI18nText('pages.page2.instructionText', "Click on the highlighted button")
            );

            // Reset page2-geometry-grid-2 position
            const grid2 = document.getElementById('page2-geometry-grid-2');
            if (grid2) {
              grid2.style.transform = '';
              grid2.style.transition = '';
            }

            // Reset replica lines positions
            const horizontalLine2 = document.getElementById('page2-horizontal-line-2');
            const verticalLine2 = document.getElementById('page2-vertical-line-2');
            if (horizontalLine2) {
              horizontalLine2.style.transform = '';
              horizontalLine2.style.transition = '';
            }
            if (verticalLine2) {
              verticalLine2.style.transform = '';
              verticalLine2.style.transition = '';
            }

            // Reset replica text positions
            let horizontalText2 = document.getElementById('page2-horizontal-text-2');
            let verticalText2 = document.getElementById('page2-vertical-text-2');
            if (!horizontalText2) {
              horizontalText2 = document.querySelector('[data-grid-position="horizontal-text-2"]');
            }
            if (!verticalText2) {
              verticalText2 = document.querySelector('[data-grid-position="vertical-text-2"]');
            }
            if (horizontalText2) {
              horizontalText2.style.transform = '';
              horizontalText2.style.transition = '';
            }
            if (verticalText2) {
              verticalText2.style.transform = '';
              verticalText2.style.transition = '';
            }

            // Reset rhombus connections opacity in grid2
            if (grid2) {
              const svgs = grid2.querySelectorAll('svg');
              svgs.forEach(svg => {
                const lines = svg.querySelectorAll('line');
                lines.forEach(line => {
                  line.style.opacity = '1';
                  line.style.visibility = 'visible';
                  line.style.animation = '';
                });
              });

              // Reset points visibility
              const circles = grid2.querySelectorAll('circle');
              circles.forEach(circle => {
                circle.style.opacity = '0';
                circle.style.visibility = 'hidden';
                circle.style.display = 'none';
              });
            }

            // Remove dynamically created elements
            const grid3 = document.getElementById('page2-geometry-grid-3');
            if (grid3) {
              grid3.remove();
            }

            // Remove line replicas
            const verticalLine3 = document.getElementById('page2-vertical-line-3');
            const horizontalLine3 = document.getElementById('page2-horizontal-line-3');
            const verticalLine3Copy = document.getElementById('page2-vertical-line-3-copy');
            const horizontalLine3Copy = document.getElementById('page2-horizontal-line-3-copy');
            if (verticalLine3) verticalLine3.remove();
            if (horizontalLine3) horizontalLine3.remove();
            if (verticalLine3Copy) verticalLine3Copy.remove();
            if (horizontalLine3Copy) horizontalLine3Copy.remove();

            // Remove all "0.5" labels
            for (let i = 1; i <= 6; i++) {
              const verticalLabel = document.getElementById(`vertical-line-label-${i}`);
              const horizontalLabel = document.getElementById(`horizontal-line-label-${i}`);
              const verticalLabelCopy = document.getElementById(`vertical-line-label-${i}-grid3-copy`);
              const horizontalLabelCopy = document.getElementById(`horizontal-line-label-${i}-grid3-copy`);
              if (verticalLabel) verticalLabel.remove();
              if (horizontalLabel) horizontalLabel.remove();
              if (verticalLabelCopy) verticalLabelCopy.remove();
              if (horizontalLabelCopy) horizontalLabelCopy.remove();
            }

            // Remove grid3 point labels
            for (const pointId of ['C1', 'C2', 'B1', 'B2', 'A1', 'A2']) {
              const label = document.getElementById(`grid3-point-label-${pointId}`);
              if (label) label.remove();
            }

            // Remove grid3 description text
            const grid3Description = document.getElementById('grid3-description-text');
            if (grid3Description) grid3Description.remove();

            // Remove tick marks (orange equal notches)
            // Remove vertical line tick marks
            for (let i = 1; i < 6; i++) {
              const verticalTick = document.getElementById(`vertical-line-tick-${i}`);
              if (verticalTick) verticalTick.remove();
            }
            // Remove horizontal line tick marks
            for (let i = 1; i < 6; i++) {
              const horizontalTick = document.getElementById(`horizontal-line-tick-${i}`);
              if (horizontalTick) horizontalTick.remove();
            }
            // Also try to remove any tick marks by class or other attributes
            const allTickMarks = document.querySelectorAll('[id*="line-tick"], [data-tick-mark]');
            allTickMarks.forEach(tick => tick.remove());

            console.log('✅ Page reset complete');

            // Small delay to ensure reset is complete before starting animation
            setTimeout(() => {
              // Disable the button immediately
              // NextButtonComponent might render as a div container or a button element
              // Try multiple methods to find the button
              let button = document.getElementById('page2-measurement-button');

              // If not found by ID, try to find by data attribute
              if (!button) {
                button = document.querySelector('[data-grid-position="measurement-button"]');
              }

              // If still not found, try to find by data-button-id attribute (language-agnostic)
              if (!button) {
                button = document.querySelector('[data-button-id="page2-measurement-button"]');
              }

              // If still not found, try to find by text content (but use i18n text, not hardcoded)
              if (!button) {
                const allButtons = document.querySelectorAll('button, .next-button-container, .applet-button-container');
                const expectedText = getI18nText('pages.page2.buttonText', 'Visualise the problem');
                for (const btn of allButtons) {
                  const text = btn.textContent || btn.innerText;
                  if (text && text.trim() === expectedText.trim()) {
                    button = btn;
                    break;
                  }
                }
              }

              // If still not found, try to find any button in the coordinates area
              if (!button) {
                // Button coordinates: [125, 650, 450, 750]
                const gridWidth = 1600;
                const viewportWidth = window.innerWidth || 1600;
                const gcToPx = viewportWidth / gridWidth;
                const buttonLeft = 125 * gcToPx;
                const buttonTop = 650 * gcToPx;
                const buttonRight = 450 * gcToPx;
                const buttonBottom = 750 * gcToPx;

                const allElements = document.querySelectorAll('button, .next-button-container, .applet-button-container');
                for (const el of allElements) {
                  const rect = el.getBoundingClientRect();
                  if (rect.left >= buttonLeft - 10 && rect.left <= buttonRight + 10 &&
                    rect.top >= buttonTop - 10 && rect.top <= buttonBottom + 10) {
                    button = el;
                    break;
                  }
                }
              }

              if (button) {
                // Disable the container/button element
                if (button.tagName === 'BUTTON') {
                  button.disabled = true;
                } else {
                  // It's a div container - disable it and any nested button
                  button.classList.add('disabled');
                  button.setAttribute('data-disabled', 'true');
                  const nestedButton = button.querySelector('button');
                  if (nestedButton) {
                    nestedButton.disabled = true;
                  }
                }

                // Gray out the button
                button.style.opacity = '0.6';
                button.style.filter = 'grayscale(100%)';
                button.style.cursor = 'not-allowed';
                button.style.pointerEvents = 'none';

                // Also apply grayscale to nested button if it exists
                const nestedBtn = button.tagName === 'BUTTON' ? button : button.querySelector('button');
                if (nestedBtn && nestedBtn !== button) {
                  nestedBtn.style.filter = 'grayscale(100%)';
                }

                console.log('✅ Button disabled and grayed out:', button.id || button.className || 'found by text/position');

                // Hide tap animation when button is disabled
                const tapAnimation = document.getElementById('page2-measurement-button-tap');
                if (tapAnimation) {
                  tapAnimation.style.display = 'none';
                  tapAnimation.style.visibility = 'hidden';
                  console.log('✅ Tap animation hidden');
                }
              } else {
                console.warn('⚠️ Button not found for disabling - tried ID, data attribute, text content, and position');
              }

              // Step 2: Update header and instruction text after button click
              updateHeaderAndInstruction(
                getI18nText('pages.page2.step1Header', "Recognize the Clothesline as a Known Shape"),
                getI18nText('pages.page2.step1Instruction', "Note the shape and the given dimensions")
              );

              // Move page2-geometry-grid-2 and replica lines/text/button 600gc to the right over 2000ms
              const element = document.getElementById('page2-geometry-grid-2');
              const horizontalLine2 = document.getElementById('page2-horizontal-line-2');
              const verticalLine2 = document.getElementById('page2-vertical-line-2');
              // Try multiple methods to find text elements (they might use React.useId() instead of config ID)
              let horizontalText2 = document.getElementById('page2-horizontal-text-2');
              let verticalText2 = document.getElementById('page2-vertical-text-2');

              // If not found by ID, try by data-grid-position attribute
              if (!horizontalText2) {
                horizontalText2 = document.querySelector('[data-grid-position="horizontal-text-2"]');
              }
              if (!verticalText2) {
                verticalText2 = document.querySelector('[data-grid-position="vertical-text-2"]');
              }

              // If still not found, try querying all highlighted-text elements and match by text content and position
              if (!horizontalText2 || !verticalText2) {
                const allTextElements = document.querySelectorAll('.highlighted-text-box, [data-element-type="highlighted-text"]');
                allTextElements.forEach(el => {
                  const textContent = el.textContent?.trim();
                  const gridPos = el.getAttribute('data-grid-position');
                  const computedStyle = window.getComputedStyle(el);
                  const left = parseFloat(computedStyle.left) || 0;
                  const top = parseFloat(computedStyle.top) || 0;

                  // Horizontal text should be around coordinates [260, 580, 320, 620]
                  // Vertical text should be around coordinates [20, 330, 75, 375]
                  // Check if text is "3 m" and position matches
                  if (textContent === '3 m') {
                    // Horizontal text: top should be around 580-620, left around 260-320
                    if (top >= 500 && top <= 700 && left >= 200 && left <= 400 && !horizontalText2) {
                      horizontalText2 = el;
                      console.log('✅ Found horizontalText2 by position and text:', { left, top, textContent });
                    }
                    // Vertical text: left should be around 20-75, top around 330-375
                    else if (left >= 0 && left <= 100 && top >= 250 && top <= 450 && !verticalText2) {
                      verticalText2 = el;
                      console.log('✅ Found verticalText2 by position and text:', { left, top, textContent });
                    }
                  }

                  // Also check by grid position as fallback
                  if (gridPos === 'horizontal-text-2' && !horizontalText2) {
                    horizontalText2 = el;
                  }
                  if (gridPos === 'vertical-text-2' && !verticalText2) {
                    verticalText2 = el;
                  }
                });
              }

              // Final fallback: find by looking for elements with "3 m" text that are near the expected positions
              // We need to find the SECOND set (the replicas), so we'll look for elements that match
              // but are NOT the original ones (which should be found by ID)
              if (!horizontalText2 || !verticalText2) {
                const originalHorizontal = document.getElementById('page2-horizontal-text');
                const originalVertical = document.getElementById('page2-vertical-text');

                const allTextElements = document.querySelectorAll('.highlighted-text-box, [data-element-type="highlighted-text"]');
                allTextElements.forEach(el => {
                  const textContent = el.textContent?.trim();
                  if (textContent === '3 m') {
                    const computedStyle = window.getComputedStyle(el);
                    const left = parseFloat(computedStyle.left) || 0;
                    const top = parseFloat(computedStyle.top) || 0;

                    // Check if this is NOT the original horizontal text
                    if (!horizontalText2 && el !== originalHorizontal && top >= 500 && top <= 700 && left >= 200 && left <= 400) {
                      horizontalText2 = el;
                      console.log('✅ Found horizontalText2 by exclusion and position:', { left, top });
                    }
                    // Check if this is NOT the original vertical text
                    if (!verticalText2 && el !== originalVertical && left >= 0 && left <= 100 && top >= 250 && top <= 450) {
                      verticalText2 = el;
                      console.log('✅ Found verticalText2 by exclusion and position:', { left, top });
                    }
                  }
                });
              }

              // Debug: Log all found elements
              console.log('🔍 Found elements:', {
                element: !!element,
                horizontalLine2: !!horizontalLine2,
                verticalLine2: !!verticalLine2,
                horizontalText2: !!horizontalText2,
                verticalText2: !!verticalText2
              });

              // Array of all elements to move together
              const elementsToMove = [element, horizontalLine2, verticalLine2, horizontalText2, verticalText2].filter(el => el !== null);

              console.log('🔍 Elements to move:', elementsToMove.length, elementsToMove.map(el => el.id));

              if (element && elementsToMove.length > 0) {
                // Convert 600gc to pixels
                // Grid system uses 1600gc = 100% width
                const gridWidth = 1600; // Total grid width in gc
                const viewportWidth = window.innerWidth || 1600;
                const gcToPx = viewportWidth / gridWidth;
                const movePixels = 600 * gcToPx;

                // Use transform for all elements (works regardless of positioning method)
                elementsToMove.forEach(el => {
                  if (el) {
                    el.style.transition = 'transform 2000ms ease-in-out';
                    const currentTransform = el.style.transform || '';
                    const currentTranslateX = currentTransform.match(/translateX\(([^)]+)\)/);
                    const currentX = currentTranslateX ? parseFloat(currentTranslateX[1]) : 0;
                    const newX = currentX + movePixels;
                    el.style.transform = `translateX(${newX}px)`;
                    console.log(`✅ Moving element ${el.id || 'unknown'}: translateX(${newX}px)`);
                  }
                });

                console.log('✅ Animating elements 600gc to the right over 2000ms (transform)', {
                  movePixels,
                  elementsCount: elementsToMove.length,
                  elementIds: elementsToMove.map(el => el.id)
                });

                // Remove transition after animation completes
                setTimeout(() => {
                  // Remove transition from all elements
                  elementsToMove.forEach(el => {
                    el.style.transition = '';
                  });

                  // Wait 2000ms after first animation, then start blinking sequence
                  setTimeout(() => {
                    // Create blink keyframes if not already present
                    // Blink 15 times over 2000ms: each blink cycle is 2000ms / 15 ≈ 133.33ms
                    // Each cycle: 0-50% (66.67ms) fade to 0.2, 50-100% (66.67ms) fade back to 1
                    // Each cycle = 100% / 15 ≈ 6.667%
                    if (!document.getElementById('blink-keyframes')) {
                      const style = document.createElement('style');
                      style.id = 'blink-keyframes';
                      style.textContent = `
                      @keyframes blink {
                        0% { opacity: 1; }
                        3.33% { opacity: 0.2; }
                        6.67% { opacity: 1; }
                        10% { opacity: 0.2; }
                        13.33% { opacity: 1; }
                        16.67% { opacity: 0.2; }
                        20% { opacity: 1; }
                        23.33% { opacity: 0.2; }
                        26.67% { opacity: 1; }
                        30% { opacity: 0.2; }
                        33.33% { opacity: 1; }
                        36.67% { opacity: 0.2; }
                        40% { opacity: 1; }
                        43.33% { opacity: 0.2; }
                        46.67% { opacity: 1; }
                        50% { opacity: 0.2; }
                        53.33% { opacity: 1; }
                        56.67% { opacity: 0.2; }
                        60% { opacity: 1; }
                        63.33% { opacity: 0.2; }
                        66.67% { opacity: 1; }
                        70% { opacity: 0.2; }
                        73.33% { opacity: 1; }
                        76.67% { opacity: 0.2; }
                        80% { opacity: 1; }
                        83.33% { opacity: 0.2; }
                        86.67% { opacity: 1; }
                        90% { opacity: 0.2; }
                        93.33% { opacity: 1; }
                        96.67% { opacity: 0.2; }
                        100% { opacity: 1; }
                      }
                    `;
                      document.head.appendChild(style);
                    }

                    // Function to blink and hide connections
                    const blinkAndHide = (connectionIds, delay) => {
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          // Find all connections by their IDs in the SVG
                          // There might be multiple SVGs - find the one with connections
                          const allSvgs = element.querySelectorAll('svg');
                          console.log(`🔍 Found ${allSvgs.length} SVG elements`);

                          let svg = null;
                          let allLines = [];
                          let allPaths = [];

                          // Check each SVG for lines/paths
                          allSvgs.forEach((svgEl, svgIdx) => {
                            const lines = Array.from(svgEl.querySelectorAll('line'));
                            const paths = Array.from(svgEl.querySelectorAll('path'));
                            console.log(`  SVG ${svgIdx}: ${lines.length} lines, ${paths.length} paths`);

                            if (lines.length > 0 || paths.length > 0) {
                              svg = svgEl;
                              allLines = lines;
                              allPaths = paths;
                            }
                          });

                          if (!svg) {
                            console.warn('⚠️ No SVG with lines/paths found in page2-geometry-grid-2');
                            resolve();
                            return;
                          }

                          console.log(`🔍 Using SVG with ${allLines.length} lines and ${allPaths.length} paths`);

                          // Debug: Log all line stroke widths and colors
                          allLines.forEach((line, idx) => {
                            const strokeWidth = line.getAttribute('stroke-width');
                            const stroke = line.getAttribute('stroke');
                            const computedStyle = window.getComputedStyle(line);
                            console.log(`  Line ${idx}: stroke-width="${strokeWidth}", stroke="${stroke}", computed stroke="${computedStyle.stroke}"`);
                          });

                          // Also check paths
                          allPaths.forEach((path, idx) => {
                            const strokeWidth = path.getAttribute('stroke-width');
                            const stroke = path.getAttribute('stroke');
                            const computedStyle = window.getComputedStyle(path);
                            console.log(`  Path ${idx}: stroke-width="${strokeWidth}", stroke="${stroke}", computed stroke="${computedStyle.stroke}"`);
                          });

                          // Combine lines and paths
                          const allConnections = [...allLines, ...allPaths];
                          console.log(`🔍 Total connection elements: ${allConnections.length}`);

                          const connections = [];

                          // Determine which lines to target based on connectionIds
                          const targetPrefix = connectionIds[0].split('-')[0][0]; // 'A', 'B', or 'C'

                          // Filter by computed style (actual rendered color) instead of attribute
                          // Perimeter lines have thickness 4gc and can be different colors (blue, orange, red)
                          const perimeterConnections = allConnections.filter(conn => {
                            const computedStyle = window.getComputedStyle(conn);
                            const strokeWidth = parseFloat(conn.getAttribute('stroke-width') || computedStyle.strokeWidth || '0');
                            const stroke = computedStyle.stroke || conn.getAttribute('stroke') || '';

                            // Check if stroke is a valid color (not transparent or none)
                            // Accept blue (#4A90E2), orange (#F5A623), red (#E94B3C), or white
                            const isValidColor = stroke !== 'transparent' &&
                              stroke !== 'none' &&
                              stroke !== '' &&
                              (stroke.includes('74, 144, 226') || // Blue rgb
                                stroke.includes('#4a90e2') ||
                                stroke.includes('245, 166, 35') || // Orange rgb
                                stroke.includes('#f5a623') ||
                                stroke.includes('233, 75, 60') || // Red rgb
                                stroke.includes('#e94b3c') ||
                                stroke.includes('255, 255, 255') || // White rgb
                                stroke.toLowerCase().includes('#ffffff'));

                            // 4gc thickness in viewBox is around 0.7-0.8 based on the debug output
                            const isThick = strokeWidth >= 0.5 && strokeWidth <= 1.0;

                            return isThick && isValidColor;
                          });

                          console.log(`🔍 Perimeter connections (white, 4gc): ${perimeterConnections.length}`);

                          // If still not found, try getting all non-transparent connections
                          if (perimeterConnections.length === 0) {
                            console.log(`⚠️ No perimeter connections found, trying all non-transparent`);
                            const nonTransparent = allConnections.filter(conn => {
                              const computedStyle = window.getComputedStyle(conn);
                              const stroke = computedStyle.stroke || conn.getAttribute('stroke') || '';
                              return stroke !== 'transparent' && stroke !== 'none' && stroke !== '';
                            });
                            console.log(`🔍 Non-transparent connections: ${nonTransparent.length}`);

                            // Count perimeter connections before our target
                            // A: 0-3, B: 4-7, C: 8-11 (each has 4 perimeter connections)
                            let startIndex = 0;
                            if (targetPrefix === 'B') {
                              startIndex = 4;
                            } else if (targetPrefix === 'C') {
                              startIndex = 8;
                            }

                            const targetConnections = nonTransparent.slice(startIndex, startIndex + 4);
                            targetConnections.forEach(conn => connections.push(conn));
                          } else {
                            // Count perimeter connections before our target
                            let startIndex = 0;
                            if (targetPrefix === 'B') {
                              startIndex = 4;
                            } else if (targetPrefix === 'C') {
                              startIndex = 8;
                            }

                            const targetConnections = perimeterConnections.slice(startIndex, startIndex + 4);
                            targetConnections.forEach(conn => connections.push(conn));
                          }

                          console.log(`🔍 Found ${connections.length} connections for ${targetPrefix} rhombus`);

                          console.log(`🔍 Found ${connections.length} connections for: ${connectionIds.join(', ')}`);

                          // Add blink animation to all found connections
                          // Blink 20 times over 2000ms
                          const blinkDuration = 2000;
                          connections.forEach(conn => {
                            conn.style.animation = `blink ${blinkDuration}ms ease-in-out`;
                            conn.style.opacity = '1';
                            conn.style.visibility = 'visible';
                          });

                          // After blinkDuration, reduce opacity to 10% but keep connections visible
                          setTimeout(() => {
                            connections.forEach(conn => {
                              conn.style.opacity = '0.1'; // 10% opacity instead of hiding
                              conn.style.visibility = 'visible'; // Keep visible
                              conn.style.animation = '';
                            });

                            // Show vertices (points) for this rhombus only
                            // Points are rendered in a separate SVG, so check all SVGs in the element
                            const allSvgsInElement = element.querySelectorAll('svg');

                            // Define colors for each rhombus (matching the connection colors)
                            const rhombusColors = {
                              'A': '#4A90E2', // Blue for inner rhombus
                              'B': '#F5A623', // Orange for medium rhombus
                              'C': '#E94B3C'  // Red for outer rhombus
                            };

                            // Get the color for this rhombus
                            const rhombusColor = rhombusColors[targetPrefix] || '#FF9900';

                            // Determine which circles to show based on rhombus
                            // Point order in config: O (index 0), A1-A4 (1-4), B1-B4 (5-8), C1-C4 (9-12)
                            let startIndex = 0;
                            let endIndex = 0;
                            if (targetPrefix === 'A') {
                              startIndex = 1; // Skip O, start at A1
                              endIndex = 4;  // End at A4
                            } else if (targetPrefix === 'B') {
                              startIndex = 5; // Skip O and A, start at B1
                              endIndex = 8;   // End at B4
                            } else if (targetPrefix === 'C') {
                              startIndex = 9; // Skip O, A, and B, start at C1
                              endIndex = 12;  // End at C4
                            }

                            allSvgsInElement.forEach(svgEl => {
                              // Get all circles that represent points (not connection endpoints)
                              // Filter to only circles that are actual point markers
                              const allCircles = Array.from(svgEl.querySelectorAll('circle'))
                                .filter(circle => {
                                  // Points have a specific radius range or are in the points group
                                  const r = parseFloat(circle.getAttribute('r') || '0');
                                  // Points are typically small circles (r < 2 in viewBox units)
                                  return r < 2;
                                });

                              // Show circles for this rhombus (by index)
                              allCircles.forEach((circle, index) => {
                                // Index 0 is O, skip it. Then A1-A4 (1-4), B1-B4 (5-8), C1-C4 (9-12)
                                if (index >= startIndex && index <= endIndex) {
                                  // Make this point visible
                                  circle.style.opacity = '1';
                                  circle.style.visibility = 'visible';
                                  circle.style.display = '';
                                  // Set fill and stroke to match the rhombus color
                                  circle.setAttribute('fill', rhombusColor);
                                  circle.setAttribute('stroke', rhombusColor);
                                  // Set radius to make it visible (8gc = ~0.6 in viewBox)
                                  const currentR = parseFloat(circle.getAttribute('r') || '0');
                                  if (currentR === 0 || currentR < 0.3) {
                                    circle.setAttribute('r', '0.6'); // 8gc in viewBox units
                                  }
                                }
                              });

                              // Also show point labels for this rhombus if they exist
                              const allTexts = Array.from(svgEl.querySelectorAll('text'));
                              allTexts.forEach((text, index) => {
                                // Text labels follow the same order as circles
                                if (index >= startIndex && index <= endIndex) {
                                  text.style.opacity = '1';
                                  text.style.visibility = 'visible';
                                  text.style.display = '';
                                }
                              });
                            });

                            resolve();
                          }, blinkDuration);
                        }, delay);
                      });
                    };

                    // Sequential blinking: A, then B, then C
                    blinkAndHide(['A1-A2', 'A2-A3', 'A3-A4', 'A4-A1'], 0)
                      .then(() => blinkAndHide(['B1-B2', 'B2-B3', 'B3-B4', 'B4-B1'], 0))
                      .then(() => blinkAndHide(['C1-C2', 'C2-C3', 'C3-C4', 'C4-C1'], 0))
                      .then(() => {
                        console.log('✅ All blinking sequences completed');

                        // Step 4: Update header and instruction text after blinking sequence
                        updateHeaderAndInstruction(
                          getI18nText('pages.page2.step4Header', "Mark the Key Measurements"),
                          getI18nText('pages.page2.step4Instruction', "Note the measurements shown in the diagram")
                        );

                        // After blinking sequence completes, move lines and create replicas
                        // Move vertical line and text left by 75gc, and horizontal line and text down by 75gc
                        const gridWidth = 1600;
                        const viewportWidth = window.innerWidth || 1600;
                        const gcToPx = viewportWidth / gridWidth;
                        const moveLeftPixels = 75 * gcToPx; // Left movement
                        const moveDownPixels = 75 * gcToPx; // Downward movement

                        // Get current transform values for each element
                        const getCurrentTransform = (el) => {
                          if (!el) return { x: 0, y: 0 };
                          const currentTransform = el.style.transform || '';
                          const translateXMatch = currentTransform.match(/translateX\(([^)]+)\)/);
                          const translateYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
                          const currentX = translateXMatch ? parseFloat(translateXMatch[1]) : 0;
                          const currentY = translateYMatch ? parseFloat(translateYMatch[1]) : 0;
                          return { x: currentX, y: currentY };
                        };

                        // Move vertical line and text left by 75gc
                        if (verticalLine2) {
                          const { x, y } = getCurrentTransform(verticalLine2);
                          verticalLine2.style.transition = 'transform 1000ms ease-in-out';
                          verticalLine2.style.transform = `translateX(${x - moveLeftPixels}px) translateY(${y}px)`;
                          console.log('✅ Moving vertical line left by 75gc');
                        }
                        if (verticalText2) {
                          const { x, y } = getCurrentTransform(verticalText2);
                          verticalText2.style.transition = 'transform 1000ms ease-in-out';
                          verticalText2.style.transform = `translateX(${x - moveLeftPixels}px) translateY(${y}px)`;
                          console.log('✅ Moving vertical text left by 75gc');
                        }

                        // Move horizontal line and text down by 75gc
                        if (horizontalLine2) {
                          const { x, y } = getCurrentTransform(horizontalLine2);
                          horizontalLine2.style.transition = 'transform 1000ms ease-in-out';
                          horizontalLine2.style.transform = `translateX(${x}px) translateY(${y + moveDownPixels}px)`;
                          console.log('✅ Moving horizontal line down by 75gc');
                        }
                        if (horizontalText2) {
                          const { x, y } = getCurrentTransform(horizontalText2);
                          horizontalText2.style.transition = 'transform 1000ms ease-in-out';
                          horizontalText2.style.transform = `translateX(${x}px) translateY(${y + moveDownPixels}px)`;
                          console.log('✅ Moving horizontal text down by 75gc');
                        }

                        // Wait for the second animation to complete, then wait 2000ms before creating replicas
                        setTimeout(() => {
                          // Remove transition from lines and text after second animation
                          [verticalLine2, verticalText2, horizontalLine2, horizontalText2].forEach(el => {
                            if (el) {
                              el.style.transition = '';
                            }
                          });

                          // Create replicas of the lines
                          const gridWidth = 1600;
                          const viewportWidth = window.innerWidth || 1600;
                          const gcToPx = viewportWidth / gridWidth;
                          const moveRightPixels = 20 * gcToPx; // 20gc to the right (changed from 10gc)
                          const moveUpPixels = 20 * gcToPx; // 20gc upward

                          const getComputedPosition = (el) => {
                            if (!el) return { left: 0, top: 0, width: 0, height: 0 };
                            const rect = el.getBoundingClientRect();
                            const computedStyle = window.getComputedStyle(el);
                            return {
                              left: parseFloat(computedStyle.left) || rect.left,
                              top: parseFloat(computedStyle.top) || rect.top,
                              width: rect.width,
                              height: rect.height
                            };
                          };

                          // Create replica of vertical line 20gc to the right
                          if (verticalLine2) {
                            const { x, y } = getCurrentTransform(verticalLine2);
                            const pos = getComputedPosition(verticalLine2);

                            // Clone the vertical line element
                            const verticalLineReplica = verticalLine2.cloneNode(true);
                            verticalLineReplica.id = 'page2-vertical-line-3';
                            verticalLineReplica.style.position = 'absolute';
                            verticalLineReplica.style.transform = `translateX(${x + moveRightPixels}px) translateY(${y}px)`;
                            verticalLineReplica.style.zIndex = '46';
                            verticalLineReplica.style.pointerEvents = 'none';

                            // Append to the same parent
                            if (verticalLine2.parentNode) {
                              verticalLine2.parentNode.appendChild(verticalLineReplica);
                              console.log('✅ Created vertical line replica 20gc to the right');

                              // Step 7: Update header and instruction text when line replicas are split
                              updateHeaderAndInstruction(
                                getI18nText('pages.page2.step2Header', "Divide the Dimensions into Equal Parts"),
                                getI18nText('pages.page2.step2Instruction', "Observe the tick marks that split each 3 m line into 0.5 m segments")
                              );

                              // Animate splitting the vertical line into 6 equal parts
                              setTimeout(() => {
                                // Get the line's position using the coordinate system
                                // Original vertical line coordinates: [80, 160, 80, 545]
                                const gridWidth = 1600;
                                const viewportWidth = window.innerWidth || 1600;
                                const gcToPx = viewportWidth / gridWidth;

                                // Original line coordinates in gc
                                const lineX = 80;
                                const lineStartGc = 160;
                                const lineEndGc = 545;
                                const lineHeightGc = lineEndGc - lineStartGc;

                                // Get the transform applied to the replica
                                const replicaTransform = verticalLineReplica.style.transform || '';
                                const translateXMatch = replicaTransform.match(/translateX\(([^)]+)\)/);
                                const translateYMatch = replicaTransform.match(/translateY\(([^)]+)\)/);
                                const translateX = translateXMatch ? parseFloat(translateXMatch[1]) : 0;
                                const translateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0;

                                // Calculate tick positions (5 ticks to create 6 equal segments)
                                const segmentHeightGc = lineHeightGc / 6;
                                const tickWidthGc = 15; // Width of tick marks in gc
                                const tickWidthPx = tickWidthGc * gcToPx;
                                const tickThicknessGc = 4; // Thickness of tick marks in gc (2x thicker)
                                const tickThicknessPx = tickThicknessGc * gcToPx;

                                // Create 5 tick marks at positions 1/6, 2/6, 3/6, 4/6, 5/6 of the line
                                for (let i = 1; i < 6; i++) {
                                  const tickPositionGc = lineStartGc + (segmentHeightGc * i);
                                  const tickX = lineX * gcToPx + translateX;
                                  const tickY = tickPositionGc * gcToPx + translateY;

                                  // Create a horizontal line (tick mark) for each divider
                                  const tick = document.createElement('div');
                                  tick.id = `vertical-line-tick-${i}`;
                                  tick.style.position = 'absolute';
                                  tick.style.left = `${tickX - tickWidthPx / 2}px`;
                                  tick.style.top = `${tickY}px`;
                                  tick.style.width = `${tickWidthPx}px`;
                                  tick.style.height = `${tickThicknessPx}px`; // Thickness in gc (converted to px)
                                  tick.style.backgroundColor = '#FF9900'; // Orange color
                                  tick.style.zIndex = '47';
                                  tick.style.opacity = '0';
                                  tick.style.transition = 'opacity 500ms ease-in-out';

                                  // Append to the same parent
                                  verticalLine2.parentNode.appendChild(tick);

                                  // Animate tick appearance with slight delay for each
                                  setTimeout(() => {
                                    tick.style.opacity = '1';
                                    // Start blinking animation after appearance
                                    tick.style.animation = 'blink-tick 1000ms ease-in-out infinite';
                                  }, i * 100); // Stagger the appearance (100ms between each)
                                }

                                console.log('✅ Created 5 tick marks to split vertical line into 6 equal parts');

                                // After all ticks appear, add "0.5" labels to each section
                                // Wait for the last tick to appear (5 ticks * 100ms = 500ms) plus transition time
                                setTimeout(() => {
                                  // Calculate label positions for each of the 6 sections
                                  const segmentHeightGc = lineHeightGc / 6;
                                  const verticalLabelOffsetGc = 17.15; // Distance from vertical line to label (to the right)
                                  const verticalLabelOffsetPx = verticalLabelOffsetGc * gcToPx;

                                  // Create 6 labels, one for each section
                                  for (let i = 0; i < 6; i++) {
                                    // Center of each section
                                    const sectionCenterGc = lineStartGc + (segmentHeightGc * i) + (segmentHeightGc / 2);
                                    const labelX = (lineX * gcToPx + translateX) + verticalLabelOffsetPx;
                                    const labelY = sectionCenterGc * gcToPx + translateY;

                                    // Create label element
                                    const label = document.createElement('div');
                                    label.id = `vertical-line-label-${i + 1}`;
                                    label.textContent = '0.5';
                                    label.style.position = 'absolute';
                                    label.style.left = `${labelX}px`;
                                    label.style.top = `${labelY}px`;
                                    label.style.transform = 'translateY(-50%)'; // Center vertically
                                    // Convert fontSize from gc to pixels
                                    const fontSizeGc = 24;
                                    const fontSizePx = fontSizeGc * gcToPx;
                                    label.style.fontSize = `${fontSizePx}px`;
                                    label.style.fontWeight = 'normal';
                                    label.style.color = '#FFFFFF';
                                    label.style.zIndex = '48';
                                    label.style.pointerEvents = 'none';
                                    label.style.whiteSpace = 'nowrap';

                                    // Append to the same parent
                                    verticalLine2.parentNode.appendChild(label);
                                  }

                                  console.log('✅ Created 6 "0.5" labels for vertical line sections');
                                }, 500 + 200); // Wait for all ticks to appear (500ms) + transition (200ms)
                              }, 200); // Small delay to ensure line is rendered
                            }
                          }

                          // Create replica of horizontal line 20gc above
                          if (horizontalLine2) {
                            const { x, y } = getCurrentTransform(horizontalLine2);
                            const pos = getComputedPosition(horizontalLine2);

                            // Clone the horizontal line element
                            const horizontalLineReplica = horizontalLine2.cloneNode(true);
                            horizontalLineReplica.id = 'page2-horizontal-line-3';
                            horizontalLineReplica.style.position = 'absolute';
                            horizontalLineReplica.style.transform = `translateX(${x}px) translateY(${y - moveUpPixels}px)`;
                            horizontalLineReplica.style.zIndex = '46';
                            horizontalLineReplica.style.pointerEvents = 'none';

                            // Append to the same parent
                            if (horizontalLine2.parentNode) {
                              horizontalLine2.parentNode.appendChild(horizontalLineReplica);
                              console.log('✅ Created horizontal line replica 20gc above');

                              // Animate splitting the horizontal line into 6 equal parts
                              setTimeout(() => {
                                // Get the line's position using the coordinate system
                                // Original horizontal line coordinates: [90, 575, 478, 575]
                                const gridWidth = 1600;
                                const viewportWidth = window.innerWidth || 1600;
                                const gcToPx = viewportWidth / gridWidth;

                                // Original line coordinates in gc
                                const lineStartGc = 90;
                                const lineEndGc = 478;
                                const lineWidthGc = lineEndGc - lineStartGc;
                                const lineY = 575;

                                // Get the transform applied to the replica
                                const replicaTransform = horizontalLineReplica.style.transform || '';
                                const translateXMatch = replicaTransform.match(/translateX\(([^)]+)\)/);
                                const translateYMatch = replicaTransform.match(/translateY\(([^)]+)\)/);
                                const translateX = translateXMatch ? parseFloat(translateXMatch[1]) : 0;
                                const translateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0;

                                // Calculate tick positions (5 ticks to create 6 equal segments)
                                const segmentWidthGc = lineWidthGc / 6;
                                const tickHeightGc = 15; // Height of tick marks in gc
                                const tickHeightPx = tickHeightGc * gcToPx;
                                const tickThicknessGc = 4; // Thickness of tick marks in gc (2x thicker)
                                const tickThicknessPx = tickThicknessGc * gcToPx;

                                // Create 5 tick marks at positions 1/6, 2/6, 3/6, 4/6, 5/6 of the line
                                for (let i = 1; i < 6; i++) {
                                  const tickPositionGc = lineStartGc + (segmentWidthGc * i);
                                  const tickX = tickPositionGc * gcToPx + translateX;
                                  const tickY = lineY * gcToPx + translateY;

                                  // Create a vertical line (tick mark) for each divider
                                  const tick = document.createElement('div');
                                  tick.id = `horizontal-line-tick-${i}`;
                                  tick.style.position = 'absolute';
                                  tick.style.left = `${tickX}px`;
                                  tick.style.top = `${tickY - tickHeightPx / 2}px`;
                                  tick.style.width = `${tickThicknessPx}px`; // Thickness in gc (converted to px)
                                  tick.style.height = `${tickHeightPx}px`;
                                  tick.style.backgroundColor = '#FF9900'; // Orange color
                                  tick.style.zIndex = '47';
                                  tick.style.opacity = '0';
                                  tick.style.transition = 'opacity 500ms ease-in-out';

                                  // Append to the same parent
                                  horizontalLine2.parentNode.appendChild(tick);

                                  // Animate tick appearance with slight delay for each
                                  setTimeout(() => {
                                    tick.style.opacity = '1';
                                    // Start blinking animation after appearance
                                    tick.style.animation = 'blink-tick 1000ms ease-in-out infinite';
                                  }, i * 100); // Stagger the appearance (100ms between each)
                                }

                                console.log('✅ Created 5 tick marks to split horizontal line into 6 equal parts');

                                // After all ticks appear, add "0.5" labels to each section
                                // Wait for the last tick to appear (5 ticks * 100ms = 500ms) plus transition time
                                setTimeout(() => {
                                  // Calculate label positions for each of the 6 sections
                                  const segmentWidthGc = lineWidthGc / 6;
                                  const horizontalLabelOffsetGc = 49; // Distance from horizontal line to label (above)
                                  const horizontalLabelOffsetPx = horizontalLabelOffsetGc * gcToPx;

                                  // Create 6 labels, one for each section
                                  for (let i = 0; i < 6; i++) {
                                    // Center of each section
                                    const sectionCenterGc = lineStartGc + (segmentWidthGc * i) + (segmentWidthGc / 2);
                                    const labelX = sectionCenterGc * gcToPx + translateX;
                                    const labelY = (lineY * gcToPx + translateY) - horizontalLabelOffsetPx;

                                    // Create label element
                                    const label = document.createElement('div');
                                    label.id = `horizontal-line-label-${i + 1}`;
                                    label.textContent = '0.5';
                                    label.style.position = 'absolute';
                                    label.style.left = `${labelX}px`;
                                    label.style.top = `${labelY}px`;
                                    label.style.transform = 'translateX(-50%)'; // Center horizontally
                                    // Convert fontSize from gc to pixels
                                    const fontSizeGc = 24;
                                    const fontSizePx = fontSizeGc * gcToPx;
                                    label.style.fontSize = `${fontSizePx}px`;
                                    label.style.fontWeight = 'normal';
                                    label.style.color = '#FFFFFF';
                                    label.style.zIndex = '48';
                                    label.style.pointerEvents = 'none';
                                    label.style.whiteSpace = 'nowrap';

                                    // Append to the same parent
                                    horizontalLine2.parentNode.appendChild(label);
                                  }

                                  console.log('✅ Created 6 "0.5" labels for horizontal line sections');
                                }, 500 + 200); // Wait for all ticks to appear (500ms) + transition (200ms)
                              }, 200); // Small delay to ensure line is rendered
                            }
                          }

                          // Create blink animation for tick marks if not already present
                          if (!document.getElementById('blink-tick-keyframes')) {
                            const style = document.createElement('style');
                            style.id = 'blink-tick-keyframes';
                            style.textContent = `
                            @keyframes blink-tick {
                              0%, 100% { opacity: 1; }
                              50% { opacity: 0.3; }
                            }
                          `;
                            document.head.appendChild(style);
                            console.log('✅ Created blink-tick keyframes animation');
                          }

                          // After all animations are complete, move lines to align with C1C3 and C2C4
                          // Wait for: first animation (2000ms) + wait (1000ms) + blinking (6000ms) + second animation (1000ms) + line replicas + labels (700ms)
                          // Total: ~10700ms, but we'll wait a bit more to ensure everything is rendered
                          setTimeout(() => {
                            const gridWidth = 1600;
                            const viewportWidth = window.innerWidth || 1600;
                            const gcToPx = viewportWidth / gridWidth;

                            // Get the geometry grid element and its current position
                            const geometryGrid = document.getElementById('page2-geometry-grid-2');
                            if (!geometryGrid) {
                              console.warn('⚠️ page2-geometry-grid-2 not found');
                              return;
                            }

                            // Get current transform of geometry grid
                            const gridTransform = geometryGrid.style.transform || '';
                            const gridTranslateXMatch = gridTransform.match(/translateX\(([^)]+)\)/);
                            const gridTranslateYMatch = gridTransform.match(/translateY\(([^)]+)\)/);
                            const gridTranslateX = gridTranslateXMatch ? parseFloat(gridTranslateXMatch[1]) : 0;
                            const gridTranslateY = gridTranslateYMatch ? parseFloat(gridTranslateYMatch[1]) : 0;

                            // Get geometry grid coordinates [x1, y1, x2, y2] = [70, 90, 500, 610]
                            const gridX1 = 70;
                            const gridY1 = 90;
                            const gridX2 = 500;
                            const gridY2 = 610;
                            const gridWidthGc = gridX2 - gridX1; // 430gc
                            const gridHeightGc = gridY2 - gridY1; // 520gc

                            // Grid dimensions
                            const gridRows = 10;
                            const gridCols = 10;

                            // Calculate C1, C2, C3, C4 positions in grid coordinates
                            // C1: row = 0.5, col = 5 (top, center)
                            // C2: row = 5, col = 9.5 (right, center)
                            // C3: row = 9.5, col = 5 (bottom, center)
                            // C4: row = 5, col = 0.5 (left, center)
                            const spacing = 1.5;
                            const centerRow = 5;
                            const centerCol = 5;

                            // C1: top vertex
                            const c1Row = centerRow - spacing * 3; // 0.5
                            const c1Col = centerCol; // 5
                            // C3: bottom vertex
                            const c3Row = centerRow + spacing * 3; // 9.5
                            const c3Col = centerCol; // 5
                            // C2: right vertex
                            const c2Row = centerRow; // 5
                            const c2Col = centerCol + spacing * 3; // 9.5
                            // C4: left vertex
                            const c4Row = centerRow; // 5
                            const c4Col = centerCol - spacing * 3; // 0.5

                            // Convert grid coordinates to pixel coordinates
                            // Account for the grid's transform
                            const c1X = (gridX1 + (c1Col / gridCols) * gridWidthGc) * gcToPx + gridTranslateX;
                            const c1Y = (gridY1 + (c1Row / gridRows) * gridHeightGc) * gcToPx + gridTranslateY;
                            const c3X = (gridX1 + (c3Col / gridCols) * gridWidthGc) * gcToPx + gridTranslateX;
                            const c3Y = (gridY1 + (c3Row / gridRows) * gridHeightGc) * gcToPx + gridTranslateY;
                            const c2X = (gridX1 + (c2Col / gridCols) * gridWidthGc) * gcToPx + gridTranslateX;
                            const c2Y = (gridY1 + (c2Row / gridRows) * gridHeightGc) * gcToPx + gridTranslateY;
                            const c4X = (gridX1 + (c4Col / gridCols) * gridWidthGc) * gcToPx + gridTranslateX;
                            const c4Y = (gridY1 + (c4Row / gridRows) * gridHeightGc) * gcToPx + gridTranslateY;

                            // C1C3 is vertical (same X, different Y)
                            const c1c3X = c1X; // Vertical line X position
                            const c1c3YStart = c1Y; // Top Y
                            const c1c3YEnd = c3Y; // Bottom Y

                            // C2C4 is horizontal (same Y, different X)
                            const c2c4Y = c2Y; // Horizontal line Y position
                            const c2c4XStart = c4X; // Left X
                            const c2c4XEnd = c2X; // Right X

                            // Get vertical line replica and its labels
                            const verticalLine3 = document.getElementById('page2-vertical-line-3');
                            const horizontalLine3 = document.getElementById('page2-horizontal-line-3');

                            if (verticalLine3) {
                              // Get current position of vertical line
                              const currentTransform = verticalLine3.style.transform || '';
                              const currentXMatch = currentTransform.match(/translateX\(([^)]+)\)/);
                              const currentYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
                              const currentX = currentXMatch ? parseFloat(currentXMatch[1]) : 0;
                              const currentY = currentYMatch ? parseFloat(currentYMatch[1]) : 0;

                              // Create a copy of the vertical line and labels before moving
                              const verticalLineCopy = verticalLine3.cloneNode(true);
                              verticalLineCopy.id = 'page2-vertical-line-3-copy';
                              verticalLineCopy.style.transform = currentTransform; // Keep at current position
                              verticalLineCopy.style.zIndex = '46';
                              verticalLineCopy.style.pointerEvents = 'none';
                              if (verticalLine3.parentNode) {
                                verticalLine3.parentNode.appendChild(verticalLineCopy);
                              }

                              // Calculate the original line position (before any transforms)
                              const originalLineX = 80 * gcToPx; // Original X coordinate
                              const originalLineYStart = 160 * gcToPx; // Original start Y
                              const originalLineYEnd = 545 * gcToPx; // Original end Y

                              // Calculate how much to move: align center X of line with C1C3 X
                              // The line width is 2gc, so center is at originalLineX
                              const lineCenterX = originalLineX + currentX;
                              const moveX = c1c3X - lineCenterX;

                              // Also adjust Y to align with C1C3 vertical span
                              const lineHeight = originalLineYEnd - originalLineYStart;
                              const c1c3Height = c1c3YEnd - c1c3YStart;
                              // Center the line on C1C3
                              const lineCenterY = (originalLineYStart + originalLineYEnd) / 2 + currentY;
                              const c1c3CenterY = (c1c3YStart + c1c3YEnd) / 2;
                              const moveY = c1c3CenterY - lineCenterY;

                              // Apply animation to original (move it)
                              verticalLine3.style.transition = 'transform 2000ms ease-in-out';
                              verticalLine3.style.transform = `translateX(${currentX + moveX}px) translateY(${currentY + moveY}px)`;

                              // Move all vertical line labels
                              for (let i = 1; i <= 6; i++) {
                                const label = document.getElementById(`vertical-line-label-${i}`);
                                if (label) {
                                  const labelLeft = parseFloat(label.style.left) || 0;
                                  const labelTop = parseFloat(label.style.top) || 0;
                                  label.style.transition = 'left 2000ms ease-in-out, top 2000ms ease-in-out';
                                  // Labels are positioned using left/top, so update those values
                                  label.style.left = `${labelLeft + moveX}px`;
                                  label.style.top = `${labelTop + moveY}px`;
                                }
                              }

                              console.log('✅ Created copy of vertical line, moving original to align with C1C3');
                            }

                            if (horizontalLine3) {
                              // Get current position of horizontal line
                              const currentTransform = horizontalLine3.style.transform || '';
                              const currentXMatch = currentTransform.match(/translateX\(([^)]+)\)/);
                              const currentYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
                              const currentX = currentXMatch ? parseFloat(currentXMatch[1]) : 0;
                              const currentY = currentYMatch ? parseFloat(currentYMatch[1]) : 0;

                              // Create a copy of the horizontal line and labels before moving
                              const horizontalLineCopy = horizontalLine3.cloneNode(true);
                              horizontalLineCopy.id = 'page2-horizontal-line-3-copy';
                              horizontalLineCopy.style.transform = currentTransform; // Keep at current position
                              horizontalLineCopy.style.zIndex = '46';
                              horizontalLineCopy.style.pointerEvents = 'none';
                              if (horizontalLine3.parentNode) {
                                horizontalLine3.parentNode.appendChild(horizontalLineCopy);
                              }

                              // Calculate the original line position (before any transforms)
                              const originalLineXStart = 90 * gcToPx; // Original start X
                              const originalLineXEnd = 478 * gcToPx; // Original end X
                              const originalLineY = 575 * gcToPx; // Original Y coordinate

                              // Calculate how much to move: align center Y of line with C2C4 Y
                              const lineCenterY = originalLineY + currentY;
                              const moveY = c2c4Y - lineCenterY;

                              // Also adjust X to align with C2C4 horizontal span
                              const lineWidth = originalLineXEnd - originalLineXStart;
                              const c2c4Width = c2c4XEnd - c2c4XStart;
                              // Center the line on C2C4
                              const lineCenterX = (originalLineXStart + originalLineXEnd) / 2 + currentX;
                              const c2c4CenterX = (c2c4XStart + c2c4XEnd) / 2;
                              const moveX = c2c4CenterX - lineCenterX;

                              // Apply animation to original (move it)
                              horizontalLine3.style.transition = 'transform 2000ms ease-in-out';
                              horizontalLine3.style.transform = `translateX(${currentX + moveX}px) translateY(${currentY + moveY}px)`;

                              // Move all horizontal line labels
                              for (let i = 1; i <= 6; i++) {
                                const label = document.getElementById(`horizontal-line-label-${i}`);
                                if (label) {
                                  const labelLeft = parseFloat(label.style.left) || 0;
                                  const labelTop = parseFloat(label.style.top) || 0;
                                  label.style.transition = 'left 2000ms ease-in-out, top 2000ms ease-in-out';
                                  // Labels are positioned using left/top, so update those values
                                  label.style.left = `${labelLeft + moveX}px`;
                                  label.style.top = `${labelTop + moveY}px`;
                                }
                              }

                              console.log('✅ Created copy of horizontal line, moving original to align with C2C4');
                            }

                            // ============================================================
                            // STEP 10: CREATE GRID 3 (SIMPLIFIED DIAGRAM)
                            // ============================================================
                            // Grid 3 is a simplified version of Grid 2 that shows only:
                            // - The three horizontal sides: A1A2 (blue), B1B2 (orange), C1C2 (red)
                            // - Two center-to-outer connections: OC1 (vertical) and OC2 (horizontal)
                            // - The six points: A1, A2, B1, B2, C1, C2
                            // - All other elements (other rhombus sides, other points, etc.) are hidden
                            //
                            // PROCESS:
                            // 1. Clone the entire grid2 element (deep clone with all children)
                            // 2. Iterate through all SVG elements (lines, circles, texts, paths)
                            // 3. Identify elements to keep by coordinates and colors
                            // 4. Hide all other elements (opacity: 0, visibility: hidden)
                            // 5. Create OC1 and OC2 if they don't exist
                            // 6. Append the cloned grid to the DOM
                            // 7. Move grid3 to the right by 350gc
                            // ============================================================

                            setTimeout(() => {
                              // Calculate conversion factor: grid coordinates to pixels
                              const gridWidth = 1600; // Total grid width in grid coordinates (gc)
                              const viewportWidth = window.innerWidth || 1600;
                              const gcToPx = viewportWidth / gridWidth; // Pixels per grid coordinate

                              // Get the source geometry grid element (grid2)
                              const geometryGrid2 = document.getElementById('page2-geometry-grid-2');
                              if (!geometryGrid2) {
                                console.warn('⚠️ page2-geometry-grid-2 not found for replica creation');
                                return;
                              }

                              // Update header and instruction text when grid3 is created
                              updateHeaderAndInstruction(
                                getI18nText('pages.page2.step3Header', "Simplify the Diagram to Measure Total Rope Length"),
                                getI18nText('pages.page2.step3Instruction', "Identify the shape and dimensions to solve the problem")
                              );

                              // ============================================================
                              // STEP 1: CLONE THE ENTIRE GRID2 ELEMENT
                              // ============================================================
                              // cloneNode(true) creates a deep copy including all child elements
                              // This preserves all SVG structure, styles, and attributes
                              const geometryGrid3 = geometryGrid2.cloneNode(true);
                              geometryGrid3.id = 'page2-geometry-grid-3'; // Change ID to identify as grid3

                              // Copy the transform from the original to maintain position
                              // This ensures grid3 starts at the same position as grid2
                              const originalTransform = geometryGrid2.style.transform || '';
                              geometryGrid3.style.transform = originalTransform;

                              // ============================================================
                              // STEP 2: DEFINE ELEMENTS TO KEEP VISIBLE
                              // ============================================================
                              // These are the points we want to keep visible in grid3:
                              // - C1: Top center point of outer (red) rhombus
                              // - C2: Right center point of outer (red) rhombus
                              // - B1: Top center point of middle (orange) rhombus
                              // - B2: Right center point of middle (orange) rhombus
                              // - A1: Top center point of inner (blue) rhombus
                              // - A2: Right center point of inner (blue) rhombus
                              const keepPointIds = ['C1', 'C2', 'B1', 'B2', 'A1', 'A2'];

                              // ============================================================
                              // STEP 3: FIND ALL SVG ELEMENTS IN THE CLONED GRID
                              // ============================================================
                              // The geometry grid contains multiple SVG layers:
                              // - One for connections (lines)
                              // - One for points (circles)
                              // - One for labels (texts)
                              // - Possibly others for animations or overlays
                              const svgs = geometryGrid3.querySelectorAll('svg');

                              console.log('🔍 Creating page2-geometry-grid-3, found', svgs.length, 'SVG elements');

                              // Track what elements we're keeping for logging/debugging
                              const keptElements = {
                                lines: [],    // Connection lines we keep
                                circles: [],  // Points we keep
                                texts: []     // Labels we keep
                              };

                              // ============================================================
                              // STEP 4: ITERATE THROUGH ALL SVG ELEMENTS AND FILTER
                              // ============================================================
                              // For each SVG layer, we need to:
                              // 1. Find all lines, paths, circles, and texts
                              // 2. Identify which ones match our "keep" criteria
                              // 3. Hide all others (opacity: 0, visibility: hidden)
                              // 4. Keep track of what we're keeping

                              svgs.forEach((svg, svgIndex) => {
                                // Get all elements of each type in this SVG
                                const lines = svg.querySelectorAll('line');
                                const paths = svg.querySelectorAll('path');
                                const circles = svg.querySelectorAll('circle');
                                const texts = svg.querySelectorAll('text');

                                console.log(`  SVG ${svgIndex}: ${lines.length} lines, ${paths.length} paths, ${circles.length} circles, ${texts.length} texts`);

                                // ============================================================
                                // IDENTIFY CONNECTIONS (LINES) TO KEEP
                                // ============================================================
                                // We want to keep these specific lines:
                                // - OC1: White line from center O(50,50) to C1 (top, ~50,12.788)
                                // - OC2: White line from center O(50,50) to C2 (right, ~95,50)
                                // - C1C2: Red line (#E94B3C) from C1(50,12.788) to C2(95,50)
                                // - B1B2: Orange line (#F5A623) from B1(50,25.192) to B2(80,50)
                                // - A1A2: Blue line (#4A90E2) from A1(50,37.596) to A2(65,50)
                                //
                                // Identification method:
                                // 1. Check stroke color (computed style to handle CSS)
                                // 2. Check coordinates (with tolerance for floating point)
                                // 3. Match against known connection patterns

                                // Process each line element
                                lines.forEach(line => {
                                  // Extract line coordinates and styling
                                  const x1 = parseFloat(line.getAttribute('x1') || '0');
                                  const y1 = parseFloat(line.getAttribute('y1') || '0');
                                  const x2 = parseFloat(line.getAttribute('x2') || '0');
                                  const y2 = parseFloat(line.getAttribute('y2') || '0');
                                  const stroke = line.getAttribute('stroke') || '';

                                  // Get computed style to handle CSS-styled elements
                                  // This is important because some colors might be set via CSS classes
                                  const computedStyle = window.getComputedStyle(line);
                                  const computedStroke = computedStyle.stroke || stroke;

                                  let shouldKeep = false;
                                  let connectionName = '';

                                  // ============================================================
                                  // IDENTIFY OC1: White line from center O(50,50) to C1 (top)
                                  // ============================================================
                                  // OC1 is a white line going vertically from center to top
                                  // Coordinates: from (50,50) to (50,~12.788)
                                  if (computedStroke.includes('#FFFFFF') || computedStroke.includes('rgb(255, 255, 255)')) {
                                    const isFromCenter = (Math.abs(x1 - 50) < 1 && Math.abs(y1 - 50) < 1) ||
                                      (Math.abs(x2 - 50) < 1 && Math.abs(y2 - 50) < 1);
                                    const isToC1 = (Math.abs(x1 - 50) < 1 && Math.abs(y1 - 12.788) < 5) ||
                                      (Math.abs(x2 - 50) < 1 && Math.abs(y2 - 12.788) < 5);
                                    const isToC2 = (Math.abs(x1 - 95) < 5 && Math.abs(y1 - 50) < 1) ||
                                      (Math.abs(x2 - 95) < 5 && Math.abs(y2 - 50) < 1);

                                    if (isFromCenter && isToC1) {
                                      shouldKeep = true;
                                      connectionName = 'OC1';
                                    }
                                    // ============================================================
                                    // IDENTIFY OC2: White line from center O(50,50) to C2 (right)
                                    // ============================================================
                                    // OC2 is a white line going horizontally from center to right
                                    // Coordinates: from (50,50) to (~95,50)
                                    else if (isFromCenter && isToC2) {
                                      shouldKeep = true;
                                      connectionName = 'OC2';
                                    }
                                  }

                                  // ============================================================
                                  // IDENTIFY C1C2: Red line (outer rhombus top-right side)
                                  // ============================================================
                                  // C1C2 is the red line connecting the top and right points of outer rhombus
                                  // Color: #E94B3C (red)
                                  // Coordinates: from C1(50,~12.788) to C2(~95,50)
                                  if (!shouldKeep && (computedStroke.includes('#E94B3C') || computedStroke.includes('rgb(233, 75, 60)'))) {
                                    const isC1C2 = ((Math.abs(x1 - 50) < 1 && Math.abs(y1 - 12.788) < 5 && Math.abs(x2 - 95) < 5 && Math.abs(y2 - 50) < 1) ||
                                      (Math.abs(x2 - 50) < 1 && Math.abs(y2 - 12.788) < 5 && Math.abs(x1 - 95) < 5 && Math.abs(y1 - 50) < 1));
                                    if (isC1C2) {
                                      shouldKeep = true;
                                      connectionName = 'C1C2';
                                    }
                                  }

                                  // ============================================================
                                  // IDENTIFY B1B2: Orange line (middle rhombus top-right side)
                                  // ============================================================
                                  // B1B2 is the orange line connecting the top and right points of middle rhombus
                                  // Color: #F5A623 (orange)
                                  // Coordinates: from B1(50,~25.192) to B2(~80,50)
                                  if (!shouldKeep && (computedStroke.includes('#F5A623') || computedStroke.includes('rgb(245, 166, 35)'))) {
                                    const isB1B2 = ((Math.abs(x1 - 50) < 1 && Math.abs(y1 - 25.192) < 5 && Math.abs(x2 - 80) < 5 && Math.abs(y2 - 50) < 1) ||
                                      (Math.abs(x2 - 50) < 1 && Math.abs(y2 - 25.192) < 5 && Math.abs(x1 - 80) < 5 && Math.abs(y1 - 50) < 1));
                                    if (isB1B2) {
                                      shouldKeep = true;
                                      connectionName = 'B1B2';
                                    }
                                  }

                                  // ============================================================
                                  // IDENTIFY A1A2: Blue line (inner rhombus top-right side)
                                  // ============================================================
                                  // A1A2 is the blue line connecting the top and right points of inner rhombus
                                  // Color: #4A90E2 (blue)
                                  // Coordinates: from A1(50,~37.596) to A2(~65,50)
                                  if (!shouldKeep && (computedStroke.includes('#4A90E2') || computedStroke.includes('rgb(74, 144, 226)'))) {
                                    const isA1A2 = ((Math.abs(x1 - 50) < 1 && Math.abs(y1 - 37.596) < 5 && Math.abs(x2 - 65) < 5 && Math.abs(y2 - 50) < 1) ||
                                      (Math.abs(x2 - 50) < 1 && Math.abs(y2 - 37.596) < 5 && Math.abs(x1 - 65) < 5 && Math.abs(y1 - 50) < 1));
                                    if (isA1A2) {
                                      shouldKeep = true;
                                      connectionName = 'A1A2';
                                    }
                                  }

                                  // ============================================================
                                  // HIDE OR KEEP THE LINE
                                  // ============================================================
                                  if (!shouldKeep) {
                                    // Hide lines that don't match our criteria
                                    line.style.opacity = '0';
                                    line.style.visibility = 'hidden';
                                  } else {
                                    // Ensure the rhombus sides (A1A2, B1B2, C1C2) are fully visible
                                    // OC1 and OC2 might already be visible, but we ensure it
                                    if (connectionName === 'A1A2' || connectionName === 'B1B2' || connectionName === 'C1C2') {
                                      line.style.opacity = '1';
                                      line.style.visibility = 'visible';
                                    }

                                    // Track what we're keeping for logging
                                    keptElements.lines.push({
                                      name: connectionName,
                                      coords: `(${x1.toFixed(2)},${y1.toFixed(2)}) to (${x2.toFixed(2)},${y2.toFixed(2)})`,
                                      stroke: computedStroke
                                    });
                                    console.log(`  ✅ Keeping line [${connectionName}]: (${x1.toFixed(2)},${y1.toFixed(2)}) to (${x2.toFixed(2)},${y2.toFixed(2)}), stroke=${computedStroke}, opacity=1`);
                                  }
                                });

                                // ============================================================
                                // PROCESS PATHS (usually not used for our connections)
                                // ============================================================
                                // Paths are SVG path elements (curved or complex shapes)
                                // In our case, we primarily use lines, so we hide all paths
                                paths.forEach(path => {
                                  const d = path.getAttribute('d') || '';
                                  const stroke = path.getAttribute('stroke') || '';
                                  const computedStyle = window.getComputedStyle(path);
                                  const computedStroke = computedStyle.stroke || stroke;

                                  // Hide all paths (we're looking for lines primarily)
                                  path.style.opacity = '0';
                                  path.style.visibility = 'hidden';
                                });

                                // ============================================================
                                // PROCESS CIRCLES (POINTS)
                                // ============================================================
                                // We want to keep only 6 points: C1, C2, B1, B2, A1, A2
                                // Identification methods (in order of preference):
                                // 1. Check ID/data attributes (most reliable)
                                // 2. Check coordinates (fallback if attributes not set)
                                //
                                // Expected coordinates (in SVG viewBox 0-100):
                                // - C1: (50, ~12.788) - top center of outer rhombus
                                // - C2: (~95, 50) - right center of outer rhombus
                                // - B1: (50, ~25.192) - top center of middle rhombus
                                // - B2: (~80, 50) - right center of middle rhombus
                                // - A1: (50, ~37.596) - top center of inner rhombus
                                // - A2: (~65, 50) - right center of inner rhombus
                                circles.forEach((circle, circleIndex) => {
                                  const id = circle.getAttribute('id') || '';
                                  const dataId = circle.getAttribute('data-point-id') || '';
                                  const dataLabel = circle.getAttribute('data-label') || '';
                                  const cx = parseFloat(circle.getAttribute('cx') || '0');
                                  const cy = parseFloat(circle.getAttribute('cy') || '0');
                                  const r = circle.getAttribute('r') || '';
                                  let shouldKeep = false;
                                  let pointName = '';

                                  // Try to identify by ID/data attributes first
                                  for (const keepPointId of keepPointIds) {
                                    if (id === keepPointId || id.includes(keepPointId) ||
                                      dataId === keepPointId || dataId.includes(keepPointId) ||
                                      dataLabel === keepPointId || dataLabel.includes(keepPointId)) {
                                      shouldKeep = true;
                                      pointName = keepPointId;
                                      break;
                                    }
                                  }

                                  // If not found by ID, identify by coordinates
                                  if (!shouldKeep) {
                                    // C1: top center (50, ~12.788)
                                    if (Math.abs(cx - 50) < 1 && Math.abs(cy - 12.788) < 5) {
                                      shouldKeep = true;
                                      pointName = 'C1';
                                    }
                                    // C2: right center (~95, 50)
                                    else if (Math.abs(cx - 95) < 5 && Math.abs(cy - 50) < 1) {
                                      shouldKeep = true;
                                      pointName = 'C2';
                                    }
                                    // B1: (50, ~25.192)
                                    else if (Math.abs(cx - 50) < 1 && Math.abs(cy - 25.192) < 5) {
                                      shouldKeep = true;
                                      pointName = 'B1';
                                    }
                                    // B2: (~80, 50)
                                    else if (Math.abs(cx - 80) < 5 && Math.abs(cy - 50) < 1) {
                                      shouldKeep = true;
                                      pointName = 'B2';
                                    }
                                    // A1: (50, ~37.596)
                                    else if (Math.abs(cx - 50) < 1 && Math.abs(cy - 37.596) < 5) {
                                      shouldKeep = true;
                                      pointName = 'A1';
                                    }
                                    // A2: (~65, 50)
                                    else if (Math.abs(cx - 65) < 5 && Math.abs(cy - 50) < 1) {
                                      shouldKeep = true;
                                      pointName = 'A2';
                                    }
                                  }

                                  if (!shouldKeep) {
                                    circle.style.opacity = '0';
                                    circle.style.visibility = 'hidden';
                                    console.log(`  ❌ Hiding circle ${circleIndex}: id="${id}", data-id="${dataId}", data-label="${dataLabel}", cx=${cx}, cy=${cy}`);
                                  } else {
                                    keptElements.circles.push({
                                      name: pointName,
                                      id: id,
                                      dataId: dataId,
                                      dataLabel: dataLabel,
                                      coords: `(${cx},${cy})`,
                                      radius: r
                                    });
                                    console.log(`  ✅ Keeping circle [${pointName}]: id="${id}", data-id="${dataId}", data-label="${dataLabel}", cx=${cx}, cy=${cy}, r=${r}`);
                                  }
                                });

                                // Hide text labels that are not in the keep list
                                texts.forEach((text, textIndex) => {
                                  const textContent = text.textContent || '';
                                  const id = text.getAttribute('id') || '';
                                  const x = text.getAttribute('x') || '';
                                  const y = text.getAttribute('y') || '';
                                  let shouldKeep = false;
                                  let pointName = '';

                                  for (const keepPointId of keepPointIds) {
                                    if (textContent === keepPointId || textContent.includes(keepPointId) ||
                                      id.includes(keepPointId)) {
                                      shouldKeep = true;
                                      pointName = keepPointId;
                                      break;
                                    }
                                  }

                                  if (!shouldKeep) {
                                    text.style.opacity = '0';
                                    text.style.visibility = 'hidden';
                                    console.log(`  ❌ Hiding text ${textIndex}: content="${textContent}", id="${id}", x=${x}, y=${y}`);
                                  } else {
                                    keptElements.texts.push({
                                      name: pointName,
                                      content: textContent,
                                      id: id,
                                      coords: `(${x},${y})`
                                    });
                                    console.log(`  ✅ Keeping text [${pointName}]: content="${textContent}", id="${id}", x=${x}, y=${y}`);
                                  }
                                });
                              });

                              // ============================================================
                              // STEP 5: CREATE OC1 AND OC2 IF THEY DON'T EXIST
                              // ============================================================
                              // OC1 and OC2 are the white lines from center O to outer points C1 and C2
                              // These might not exist in grid2 (they're created for grid3)
                              // If they don't exist, we create them programmatically

                              const hasOC1 = keptElements.lines.some(line => line.name === 'OC1');
                              const hasOC2 = keptElements.lines.some(line => line.name === 'OC2');

                              if (!hasOC1 || !hasOC2) {
                                // Find the SVG that contains the connections
                                // Usually it's the last SVG with lines (connections layer)
                                let targetSvg = null;
                                for (let i = svgs.length - 1; i >= 0; i--) {
                                  const lines = svgs[i].querySelectorAll('line');
                                  if (lines.length > 0) {
                                    targetSvg = svgs[i];
                                    break;
                                  }
                                }

                                if (targetSvg) {
                                  const viewBox = targetSvg.getAttribute('viewBox') || '0 0 100 100';

                                  // ============================================================
                                  // CREATE OC1: Vertical line from center to top
                                  // ============================================================
                                  // OC1 connects center O(50,50) to C1(50,12.788...)
                                  // This is a vertical white line
                                  if (!hasOC1) {
                                    const oc1Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                                    oc1Line.setAttribute('x1', '50');  // Center X
                                    oc1Line.setAttribute('y1', '50');  // Center Y
                                    oc1Line.setAttribute('x2', '50');  // C1 X (same as center)
                                    oc1Line.setAttribute('y2', '12.788461538461537'); // C1 Y (top)
                                    oc1Line.setAttribute('stroke', '#FFFFFF'); // White color
                                    oc1Line.setAttribute('stroke-width', '0.5'); // Same thickness as diagonal lines
                                    oc1Line.setAttribute('stroke-opacity', '1');
                                    oc1Line.setAttribute('id', 'O-C1'); // Set ID for reference
                                    oc1Line.style.opacity = '1';
                                    oc1Line.style.visibility = 'visible';
                                    targetSvg.appendChild(oc1Line); // Add to SVG
                                    keptElements.lines.push({
                                      name: 'OC1',
                                      coords: '(50,50) to (50,12.79)',
                                      stroke: '#FFFFFF'
                                    });
                                    console.log('✅ Created OC1 connection in grid3 (white, vertical line from center to top)');
                                  }

                                  // ============================================================
                                  // CREATE OC2: Horizontal line from center to right
                                  // ============================================================
                                  // OC2 connects center O(50,50) to C2(95,50)
                                  // This is a horizontal white line
                                  if (!hasOC2) {
                                    const oc2Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                                    oc2Line.setAttribute('x1', '50');  // Center X
                                    oc2Line.setAttribute('y1', '50');  // Center Y
                                    oc2Line.setAttribute('x2', '95');  // C2 X (right)
                                    oc2Line.setAttribute('y2', '50');  // C2 Y (same as center)
                                    oc2Line.setAttribute('stroke', '#FFFFFF'); // White color
                                    oc2Line.setAttribute('stroke-width', '0.5'); // Same thickness as diagonal lines
                                    oc2Line.setAttribute('stroke-opacity', '1');
                                    oc2Line.setAttribute('id', 'O-C2'); // Set ID for reference
                                    oc2Line.style.opacity = '1';
                                    oc2Line.style.visibility = 'visible';
                                    targetSvg.appendChild(oc2Line); // Add to SVG
                                    keptElements.lines.push({
                                      name: 'OC2',
                                      coords: '(50,50) to (95,50)',
                                      stroke: '#FFFFFF'
                                    });
                                    console.log('✅ Created OC2 connection in grid3 (white, horizontal line from center to right)');
                                  }
                                } else {
                                  console.warn('⚠️ Could not find target SVG to create OC1 and OC2');
                                }
                              }

                              // ============================================================
                              // STEP 6: LOG SUMMARY AND APPEND TO DOM
                              // ============================================================
                              // Log what we kept for debugging
                              console.log('📊 SUMMARY: Elements kept in page2-geometry-grid-3:');
                              console.log(`  Connections (lines): ${keptElements.lines.length}`);
                              keptElements.lines.forEach(line => {
                                console.log(`    - ${line.name}: ${line.coords}, stroke=${line.stroke}`);
                              });
                              console.log(`  Points (circles): ${keptElements.circles.length}`);
                              keptElements.circles.forEach(circle => {
                                console.log(`    - ${circle.name}: ${circle.coords}, r=${circle.radius}`);
                              });
                              console.log(`  Labels (texts): ${keptElements.texts.length}`);
                              keptElements.texts.forEach(text => {
                                console.log(`    - ${text.name}: "${text.content}" at ${text.coords}`);
                              });

                              // Append the cloned and filtered geometry grid to the page
                              // It will be positioned at the same location as grid2 initially
                              if (geometryGrid2.parentNode) {
                                geometryGrid2.parentNode.appendChild(geometryGrid3);
                                console.log('✅ Created page2-geometry-grid-3 replica with OC1, OC2, C1C2, B1B2, A1A2, and points C1, C2, B1, B2, A1, A2');
                                console.log('✅ geometryGrid3 element:', geometryGrid3);
                                console.log('✅ geometryGrid3 id:', geometryGrid3.id);
                                console.log('✅ geometryGrid3 in DOM:', document.getElementById('page2-geometry-grid-3') !== null);

                                // ============================================================
                                // STEP 7: MOVE GRID3 TO THE RIGHT
                                // ============================================================
                                // After a delay, move grid3 to the right by 350 grid coordinates
                                // This creates visual separation between grid2 and grid3
                                setTimeout(() => {
                                  const movePixels = 350 * gcToPx; // Convert grid coordinates to pixels

                                  // Get current transform of geometry grid 3
                                  const currentTransform = geometryGrid3.style.transform || '';
                                  const currentXMatch = currentTransform.match(/translateX\(([^)]+)\)/);
                                  const currentX = currentXMatch ? parseFloat(currentXMatch[1]) : 0;

                                  // Apply animation to grid3
                                  geometryGrid3.style.transition = 'transform 2000ms ease-in-out';
                                  geometryGrid3.style.transform = `translateX(${currentX + movePixels}px)`;

                                  // Also move the relevant "0.5" labels (from the aligned lines)
                                  // Only move: top 3 vertical labels (1, 2, 3) and rightmost 3 horizontal labels (4, 5, 6)
                                  // Create copies before moving

                                  // Top 3 vertical labels (labels 1, 2, 3) - create copies first
                                  for (let i = 1; i <= 3; i++) {
                                    const verticalLabel = document.getElementById(`vertical-line-label-${i}`);
                                    if (verticalLabel) {
                                      // Create a copy at the current position
                                      const labelCopy = verticalLabel.cloneNode(true);
                                      labelCopy.id = `vertical-line-label-${i}-grid3-copy`;
                                      labelCopy.style.left = verticalLabel.style.left;
                                      labelCopy.style.top = verticalLabel.style.top;
                                      labelCopy.style.transform = verticalLabel.style.transform;
                                      if (verticalLabel.parentNode) {
                                        verticalLabel.parentNode.appendChild(labelCopy);
                                      }

                                      // Then move the original
                                      const labelLeft = parseFloat(verticalLabel.style.left) || 0;
                                      verticalLabel.style.transition = 'left 2000ms ease-in-out';
                                      verticalLabel.style.left = `${labelLeft + movePixels}px`;
                                    }
                                  }

                                  // Rightmost 3 horizontal labels (labels 4, 5, 6) - create copies first
                                  for (let i = 4; i <= 6; i++) {
                                    const horizontalLabel = document.getElementById(`horizontal-line-label-${i}`);
                                    if (horizontalLabel) {
                                      // Create a copy at the current position
                                      const labelCopy = horizontalLabel.cloneNode(true);
                                      labelCopy.id = `horizontal-line-label-${i}-grid3-copy`;
                                      labelCopy.style.left = horizontalLabel.style.left;
                                      labelCopy.style.top = horizontalLabel.style.top;
                                      labelCopy.style.transform = horizontalLabel.style.transform;
                                      if (horizontalLabel.parentNode) {
                                        horizontalLabel.parentNode.appendChild(labelCopy);
                                      }

                                      // Then move the original
                                      const labelLeft = parseFloat(horizontalLabel.style.left) || 0;
                                      horizontalLabel.style.transition = 'left 2000ms ease-in-out';
                                      horizontalLabel.style.left = `${labelLeft + movePixels}px`;
                                    }
                                  }

                                  console.log('✅ Moving page2-geometry-grid-3 and relevant "0.5" labels 350gc to the right');

                                  // After grid3 movement completes (2000ms), move labels and reduce font size
                                  setTimeout(() => {
                                    const moveLeftPixels = 50 * gcToPx; // 50gc to the left
                                    const moveDownPixels = 50 * gcToPx; // 50gc downward

                                    // Top 3 vertical labels (labels 1, 2, 3) - move left by 50gc
                                    for (let i = 1; i <= 3; i++) {
                                      const verticalLabel = document.getElementById(`vertical-line-label-${i}`);
                                      if (verticalLabel) {
                                        const labelLeft = parseFloat(verticalLabel.style.left) || 0;
                                        const labelTop = parseFloat(verticalLabel.style.top) || 0;

                                        // Reduce font size to 18gc
                                        const fontSizeGc = 18;
                                        const fontSizePx = fontSizeGc * gcToPx;
                                        verticalLabel.style.fontSize = `${fontSizePx}px`;

                                        // Move left by 50gc
                                        verticalLabel.style.transition = 'left 2000ms ease-in-out';
                                        verticalLabel.style.left = `${labelLeft - moveLeftPixels}px`;
                                      }
                                    }

                                    // Rightmost 3 horizontal labels (labels 4, 5, 6) - move down by 50gc
                                    for (let i = 4; i <= 6; i++) {
                                      const horizontalLabel = document.getElementById(`horizontal-line-label-${i}`);
                                      if (horizontalLabel) {
                                        const labelLeft = parseFloat(horizontalLabel.style.left) || 0;
                                        const labelTop = parseFloat(horizontalLabel.style.top) || 0;

                                        // Reduce font size to 18gc
                                        const fontSizeGc = 18;
                                        const fontSizePx = fontSizeGc * gcToPx;
                                        horizontalLabel.style.fontSize = `${fontSizePx}px`;

                                        // Move down by 50gc
                                        horizontalLabel.style.transition = 'top 2000ms ease-in-out';
                                        horizontalLabel.style.top = `${labelTop + moveDownPixels}px`;
                                      }
                                    }

                                    console.log('✅ Moved grid3 labels: vertical labels left by 50gc, horizontal labels down by 50gc, font size reduced to 18gc');

                                    // After label movement completes (2000ms), add point labels for grid3
                                    setTimeout(() => {
                                      const gridWidth = 1600;
                                      const viewportWidth = window.innerWidth || 1600;
                                      const gcToPx = viewportWidth / gridWidth;

                                      // Get grid3 and its current transform
                                      const geometryGrid3 = document.getElementById('page2-geometry-grid-3');
                                      if (!geometryGrid3) {
                                        console.warn('⚠️ page2-geometry-grid-3 not found for label creation');
                                        return;
                                      }

                                      // Get current transform of grid3
                                      const gridTransform = geometryGrid3.style.transform || '';
                                      const gridTranslateXMatch = gridTransform.match(/translateX\(([^)]+)\)/);
                                      const gridTranslateYMatch = gridTransform.match(/translateY\(([^)]+)\)/);
                                      const gridTranslateX = gridTranslateXMatch ? parseFloat(gridTranslateXMatch[1]) : 0;
                                      const gridTranslateY = gridTranslateYMatch ? parseFloat(gridTranslateYMatch[1]) : 0;

                                      // Get geometry grid coordinates [x1, y1, x2, y2] = [70, 90, 500, 610]
                                      const gridX1 = 70;
                                      const gridY1 = 90;
                                      const gridX2 = 500;
                                      const gridY2 = 610;
                                      const gridWidthGc = gridX2 - gridX1; // 430gc
                                      const gridHeightGc = gridY2 - gridY1; // 520gc

                                      // Grid dimensions
                                      const gridRows = 10;
                                      const gridCols = 10;

                                      // Point coordinates in grid system
                                      const spacing = 1.5;
                                      const centerRow = 5;
                                      const centerCol = 5;

                                      // Point positions: C1, C2, B1, B2, A1, A2
                                      const points = [
                                        { name: 'C1', row: centerRow - spacing * 3, col: centerCol }, // (50, 12.788...)
                                        { name: 'C2', row: centerRow, col: centerCol + spacing * 3 }, // (95, 50)
                                        { name: 'B1', row: centerRow - spacing * 2, col: centerCol }, // (50, 25.192...)
                                        { name: 'B2', row: centerRow, col: centerCol + spacing * 2 }, // (80, 50)
                                        { name: 'A1', row: centerRow - spacing, col: centerCol }, // (50, 37.596...)
                                        { name: 'A2', row: centerRow, col: centerCol + spacing } // (65, 50)
                                      ];

                                      // Create labels for each point
                                      points.forEach(point => {
                                        // Find the actual SVG circle element for this point
                                        const pointElement = geometryGrid3.querySelector(`circle[data-point-id="${point.name}"], circle[id="${point.name}"]`);

                                        let pointX, pointY;

                                        if (pointElement) {
                                          // Get actual circle position from SVG
                                          const cx = parseFloat(pointElement.getAttribute('cx') || '0');
                                          const cy = parseFloat(pointElement.getAttribute('cy') || '0');

                                          // Get grid3's bounding rect and SVG viewBox
                                          const grid3Rect = geometryGrid3.getBoundingClientRect();
                                          const svg = geometryGrid3.querySelector('svg');
                                          const svgViewBox = svg ? svg.getAttribute('viewBox') || '0 0 100 100' : '0 0 100 100';
                                          const [vbX, vbY, vbWidth, vbHeight] = svgViewBox.split(' ').map(Number);

                                          // Convert SVG coordinates (0-100) to pixel coordinates within grid3
                                          const pointPxX = (cx / vbWidth) * grid3Rect.width;
                                          const pointPxY = (cy / vbHeight) * grid3Rect.height;

                                          // Get grid3's absolute position
                                          const grid3Left = grid3Rect.left;
                                          const grid3Top = grid3Rect.top;

                                          // Calculate absolute position accounting for grid3's transform
                                          pointX = grid3Left + pointPxX + gridTranslateX;
                                          pointY = grid3Top + pointPxY + gridTranslateY;

                                          console.log(`📍 Point ${point.name}: SVG (${cx}, ${cy}) -> Pixel (${pointX.toFixed(2)}, ${pointY.toFixed(2)})`);
                                        } else {
                                          // Fallback: Calculate from grid coordinates if circle not found
                                          console.warn(`⚠️ Point element for ${point.name} not found, using calculated position`);
                                          pointX = (gridX1 + (point.col / gridCols) * gridWidthGc) * gcToPx + gridTranslateX;
                                          pointY = (gridY1 + (point.row / gridRows) * gridHeightGc) * gcToPx + gridTranslateY;
                                        }

                                        // Label offset based on point location
                                        // Vertical labels (C1, B1, A1): offset (-25gc, 0) - 25gc to the left
                                        // Horizontal labels (C2, B2, A2): offset (0, 25gc) - 25gc down
                                        const offsetXGc = point.name.includes('1') ? -25 : 0; // -25gc for vertical, 0 for horizontal
                                        const offsetYGc = point.name.includes('1') ? 0 : 25; // 0 for vertical, 25gc for horizontal
                                        const offsetXPx = offsetXGc * gcToPx;
                                        const offsetYPx = offsetYGc * gcToPx;

                                        // Position label with offset
                                        // For vertical labels: labelY should match pointY (same y-coordinate)
                                        // For horizontal labels: labelX should match pointX (same x-coordinate)
                                        const labelX = pointX + offsetXPx;
                                        const labelY = pointY + offsetYPx;

                                        // Create label element
                                        const label = document.createElement('div');
                                        label.id = `grid3-point-label-${point.name}`;
                                        label.textContent = point.name;
                                        label.style.position = 'absolute';
                                        label.style.left = `${labelX}px`;
                                        label.style.top = `${labelY}px`;

                                        // Transform: For vertical labels (C1, B1, A1), center horizontally but align vertically
                                        // For horizontal labels (C2, B2, A2), center vertically but align horizontally
                                        if (point.name.includes('1')) {
                                          // Vertical labels: center horizontally, align top edge with point
                                          label.style.transform = 'translate(-50%, 0)';
                                        } else {
                                          // Horizontal labels: center vertically, align left edge with point
                                          label.style.transform = 'translate(0, -50%)';
                                        }

                                        // Font size 18gc
                                        const fontSizeGc = 18;
                                        const fontSizePx = fontSizeGc * gcToPx;
                                        label.style.fontSize = `${fontSizePx}px`;
                                        label.style.fontWeight = 'normal';
                                        label.style.color = '#FFFFFF';
                                        label.style.zIndex = '50';
                                        label.style.pointerEvents = 'none';
                                        label.style.whiteSpace = 'nowrap';

                                        // Append to the page (same parent as grid3)
                                        if (geometryGrid3.parentNode) {
                                          geometryGrid3.parentNode.appendChild(label);
                                        }
                                      });

                                      console.log('✅ Added point labels (C1, C2, B1, B2, A1, A2) for grid3');

                                      // Add text at specified coordinates [1100, 500, 1550, 700]
                                      const textCoordinates = [1100, 500, 1550, 700];

                                      // Use gridPositions to convert coordinates to CSS
                                      let textPosition = {};
                                      if (typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
                                        const position = gridPositions.convertToCSS(textCoordinates, 'grid3-description-text', 'page', 'custom');
                                        if (position && position.css) {
                                          textPosition = position.css;
                                        }
                                      }

                                      // Fallback: manual calculation if gridPositions not available
                                      if (!textPosition.left) {
                                        const gridHeightFallback = 900;
                                        const [x1, y1, x2, y2] = textCoordinates;
                                        textPosition = {
                                          position: 'absolute',
                                          left: `${((x1 - 1) / gridWidth) * 100}%`,
                                          top: `${((y1 - 1) / gridHeightFallback) * 100}%`,
                                          width: `${((x2 - x1) / gridWidth) * 100}%`,
                                          height: `${((y2 - y1) / gridHeightFallback) * 100}%`
                                        };
                                      }

                                      // Font size 36gc (reuse existing gcToPx from outer scope)
                                      const fontSizeGc = 36;
                                      const fontSizePx = fontSizeGc * gcToPx;

                                      const textElement = document.createElement('div');
                                      textElement.id = 'grid3-description-text';
                                      textElement.textContent = getI18nText('pages.page2.grid3DescriptionText', 'We have a simplified visual to help us solve the challenge');
                                      Object.assign(textElement.style, textPosition, {
                                        fontSize: `${fontSizePx}px`,
                                        fontWeight: 'normal',
                                        color: '#FF9900', // Orange color
                                        zIndex: '50',
                                        pointerEvents: 'none',
                                        whiteSpace: 'normal',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      });

                                      // Append to the page (same parent as grid3 or react-root)
                                      const reactRoot = document.getElementById('react-root');
                                      if (reactRoot) {
                                        reactRoot.appendChild(textElement);
                                      } else if (geometryGrid3 && geometryGrid3.parentNode) {
                                        geometryGrid3.parentNode.appendChild(textElement);
                                      } else {
                                        document.body.appendChild(textElement);
                                      }

                                      console.log('✅ Added description text below grid3');

                                      // Re-enable the button after all animations complete + 1000ms
                                      setTimeout(() => {
                                        // Find button using multiple methods (same as disable logic)
                                        let button = document.getElementById('page2-measurement-button');

                                        // If not found by ID, try to find by data attribute
                                        if (!button) {
                                          button = document.querySelector('[data-grid-position="measurement-button"]');
                                        }

                                        // If still not found, try to find by data-button-id attribute (language-agnostic)
                                        if (!button) {
                                          button = document.querySelector('[data-button-id="page2-measurement-button"]');
                                        }

                                        // If still not found, try to find by text content (but use i18n text, not hardcoded)
                                        if (!button) {
                                          const allButtons = document.querySelectorAll('button, .next-button-container, .applet-button-container');
                                          const expectedText = getI18nText('pages.page2.buttonText', 'Visualise the problem');
                                          for (const btn of allButtons) {
                                            const text = btn.textContent || btn.innerText;
                                            if (text && text.trim() === expectedText.trim()) {
                                              button = btn;
                                              break;
                                            }
                                          }
                                        }

                                        if (button) {
                                          // Re-enable the container/button element
                                          if (button.tagName === 'BUTTON') {
                                            button.disabled = false;
                                          } else {
                                            // It's a div container - enable it and any nested button
                                            button.classList.remove('disabled');
                                            button.removeAttribute('data-disabled');
                                            const nestedButton = button.querySelector('button');
                                            if (nestedButton) {
                                              nestedButton.disabled = false;
                                            }
                                          }

                                          // Remove gray out effect
                                          button.style.opacity = '1';
                                          button.style.filter = 'none';
                                          button.style.cursor = 'pointer';
                                          button.style.pointerEvents = 'auto';

                                          // Also remove grayscale from nested button if it exists
                                          const nestedBtn = button.tagName === 'BUTTON' ? button : button.querySelector('button');
                                          if (nestedBtn && nestedBtn !== button) {
                                            nestedBtn.style.filter = 'none';
                                          }

                                          console.log('✅ Main button re-enabled after all animations:', button.id || button.className || 'found by text/position');

                                          // Show tap animation when button is re-enabled
                                          const tapAnimation = document.getElementById('page2-measurement-button-tap');
                                          if (tapAnimation) {
                                            tapAnimation.style.display = '';
                                            tapAnimation.style.visibility = 'visible';
                                            console.log('✅ Tap animation shown');
                                          }

                                          // Dispatch quiz completion event for page 2
                                          if (typeof window !== 'undefined') {
                                            const currentPage = window.getCurrentPage?.() || 2;
                                            const quizCompletedEvent = new CustomEvent('quizCompleted', {
                                              detail: {
                                                componentId: 'page2-measurement-button',
                                                componentType: 'Page2AnimationSequence',
                                                pageNumber: currentPage,
                                                allAnimationsCompleted: true,
                                                timestamp: Date.now()
                                              }
                                            });
                                            window.dispatchEvent(quizCompletedEvent);
                                            console.log('✅ [Page2] Dispatched quizCompleted event after all animations complete for page:', currentPage);
                                          }
                                        } else {
                                          console.warn('⚠️ Main button not found for re-enabling - tried ID, data attribute, and text content');
                                        }
                                      }, 1000); // Additional 1000ms after text is added
                                    }, 2000); // Wait for label movement to complete (2000ms)
                                  }, 2000); // Wait for grid3 movement to complete (2000ms)
                                }, 1000);
                              }
                            }, 2000); // Wait 2000ms after line alignment completes
                          }, 11000); // Wait for all animations to complete (~10700ms + buffer)
                        }, 3000); // Wait for second animation to complete (1000ms) + additional 2000ms delay before creating replicas
                      });
                  }, 2000); // Wait 2000ms before blinking (changed from 1000ms)
                }, 2000); // Wait for first animation to complete (first setTimeout - 2000ms)
              } else {
                console.warn('⚠️ Element page2-geometry-grid-2 not found');
              }
            }, 100); // Small delay after reset to ensure DOM is ready
          }
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
          text: getI18nText('pages.page2.instructionText', "Click on the highlighted button"),
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

      // Tap Animation GIF
      {
        id: 'page2-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 2 } // Only show for page 2 quiz completion
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page2-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page2-next-button');
            return getNextButtonText(pageNumber);
          },
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for page 2 quiz completion
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page2-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page2-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
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
          text: getI18nText('pages.page1.headerText', "Read the question and identify 'given' and 'to find'"),
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
        coordinates: [50, 100, 800, 775], // Same coordinates as question text box
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
        coordinates: [60, 110, 800, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('common.questionText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'left',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: getI18nText('pages.page3.highlights', [])
        }
      },

      // Triangle Description Text (below triangle)
      {
        id: 'page3-triangle-description',
        name: 'triangle-description',
        type: 'custom',
        coordinates: [850, 650, 1550, 750], // Below the triangle component
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.triangleDescription', 'Note 3m as the given dimensions of the diagonals o fthe clothline'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: 'var(--color-orange)',
          fontSize: '36gc',
          fontWeight: 'normal',
          textAlign: 'center',
          padding: '10gc'
        }
      },

      // Geometry Grid (same as page2-geometry-grid-1)
      {
        id: "page3-geometry-grid-1",
        name: "page3-geometry-grid-1",
        type: "custom",
        coordinates: [960, 90, 1390, 610], // Moved 60gc to the left
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: null,
              labelOffset: { x: '0gc', y: '0gc' },
              labelSize: '28gc',
              labelColor: '#FFFFFF',
              size: '0gc',
              color: 'transparent',
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;
                // Label offsets based on position (top, right, bottom, left)
                const labelOffsets = [
                  { x: '0gc', y: '-30gc' },  // Top vertex
                  { x: '30gc', y: '0gc' },   // Right vertex
                  { x: '0gc', y: '30gc' },   // Bottom vertex
                  { x: '-30gc', y: '0gc' }   // Left vertex
                ];
                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: null, // No labels
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '28gc',
                  labelColor: '#FFFFFF',
                  size: '8gc', // Visible size for the dot
                  color: '#FFFFFF', // White color for visibility
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;
                allConnections.push({
                  id: `${pointId}-${nextPointId}`,
                  from: pointId,
                  to: nextPointId,
                  color: rhombusColor,
                  thickness: '4gc',
                  style: 'solid',
                  clickable: false
                });
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Left side: C4-B4, B4-A4
            allConnections.push({
              id: 'C4-B4',
              from: 'C4',
              to: 'B4',
              color: '#FFFFFF', // White, same as other edges
              thickness: '2gc', // Slightly thicker to ensure visibility for notch placement
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B4-A4',
              from: 'B4',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Right side: C2-B2, B2-A2
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Bottom side: C3-B3, B3-A3
            allConnections.push({
              id: 'C3-B3',
              from: 'C3',
              to: 'B3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B3-A3',
              from: 'B3',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (A1, A2, A3, A4)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A3',
              from: 'O',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A4',
              from: 'O',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 3] Added connections for notches:', [
              'C4-B4', 'B4-A4', 'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1', 'C3-B3', 'B3-A3',
              'O-A1', 'O-A2', 'O-A3', 'O-A4'
            ]);
            console.log('✅ [Page 3] Total connections:', allConnections.length);
            console.log('✅ [Page 3] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // Add notches (tick marks) to specific line segments
          // Note: side must match connection ID exactly (case-insensitive)
          // Using #FF9900 to match feedback notch recognition in the component
          sideSymbols: (() => {
            const symbols = [
              // Left side
              { side: 'C4-B4', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B4-A4', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Right side  
              { side: 'C2-B2', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B2-A2', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Top side
              { side: 'C1-B1', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B1-A1', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Bottom side
              { side: 'C3-B3', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'B3-A3', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              // Center to inner rhombus
              { side: 'O-A1', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'O-A2', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'O-A3', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 },
              { side: 'O-A4', type: 'tick', count: 1, color: '#FF9900', size: '4gc', position: 0.5 }
            ];
            console.log('✅ [Page 3] sideSymbols configured:', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },

      // Horizontal dashed line below the shape
      {
        id: 'page3-horizontal-line',
        name: 'horizontal-line',
        type: 'custom',
        coordinates: [980, 575, 1368, 575], // Horizontal line below the shape, moved 60gc to the left
        zIndex: 46,
        props: {
          componentType: 'LineComponent',
          lineType: 'horizontal',
          borderWidth: '2gc',
          borderColor: '#FFFFFF',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // Vertical dashed line to the left of the shape
      {
        id: 'page3-vertical-line',
        name: 'vertical-line',
        type: 'custom',
        coordinates: [970, 160, 970, 545], // Vertical line to the left of shape, moved 60gc to the left
        zIndex: 46,
        props: {
          componentType: 'LineComponent',
          lineType: 'vertical',
          borderWidth: '2gc',
          borderColor: '#FFFFFF',
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // Text "3 m" for horizontal line
      {
        id: 'page3-horizontal-text',
        name: 'horizontal-text',
        type: 'custom',
        coordinates: [1150, 580, 1210, 620], // Below the horizontal line, horizontally centered, moved 60gc to the left
        zIndex: 47,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('pages.page2.measurementLabel', '3 m'),
          fontSize: '32gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '0gc',
          justifyContent: 'center',
          textAlign: 'center',
          highlights: []
        }
      },

      // Text "3 m" for vertical line
      {
        id: 'page3-vertical-text',
        name: 'vertical-text',
        type: 'custom',
        coordinates: [910, 330, 965, 375], // To the left of the vertical line, vertically centered, moved 60gc to the left
        zIndex: 47,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('pages.page2.measurementLabel', '3 m'),
          fontSize: '32gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '0gc',
          justifyContent: 'center',
          textAlign: 'center',
          highlights: []
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
            'pages.page1.footerInstruction',
            getI18nText('pages.page1.footerInstruction', "Tap » to identify 'given' information")
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

      // Tap Animation GIF
      {
        id: 'page3-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page3-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page3-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page3-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page3-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
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
          text: getI18nText('pages.page1.headerText', "Read the question and identify 'given' and 'to find'"),
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

      // Triangle Description Text - Part 1: "Length of Rope Required for the Clothline"
      // {
      //   id: 'page4-triangle-description-part1',
      //   name: 'triangle-description-part1',
      //   type: 'custom',
      //   coordinates: [825, 625, 1050, 750], // Left part with word wrap (450gc wide)
      //   zIndex: 53,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: getI18nText('pages.page4.triangleDescriptionPart1', 'Length of Rope Required'),
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: 'var(--color-orange)',
      //     fontSize: '30gc',
      //     fontWeight: 'normal',
      //     textAlign: 'center',
      //     whiteSpace: 'normal', // Enable word wrap
      //     padding: '10gc',
      //     display: 'flex',
      //     alignItems: 'center' // Vertically center
      //   }
      // },

      // Triangle Description Text - Part 2: "="
      // {
      //   id: 'page4-triangle-description-part2',
      //   name: 'triangle-description-part2',
      //   type: 'custom',
      //   coordinates: [1025, 625, 1075, 750], // Middle part for "=" (50gc wide)
      //   zIndex: 53,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: getI18nText('pages.page4.triangleDescriptionPart2', '='),
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: 'var(--color-orange)',
      //     fontSize: '36gc',
      //     fontWeight: 'normal',
      //     textAlign: 'center',
      //     padding: '10gc',
      //     display: 'flex',
      //     alignItems: 'center' // Vertically center
      //   }
      // },

      // Triangle Description Text - Part 3: "Length of quadilateral C1C2C3C4"
      // {
      //   id: 'page4-triangle-description-part3',
      //   name: 'triangle-description-part3',
      //   type: 'custom',
      //   coordinates: [1100, 650, 1225, 750], // Part 3 for "Length of quadilateral C1C2C3C4" (150gc wide)
      //   zIndex: 53,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: getI18nText('pages.page4.triangleDescriptionPart3', 'Length of quadilateral C<sub>1</sub>C<sub>2</sub>C<sub>3</sub>C<sub>4</sub>'),
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: 'var(--color-orange)',
      //     fontSize: '28gc',
      //     fontWeight: 'normal',
      //     textAlign: 'center',
      //     whiteSpace: 'normal', // Enable word wrap
      //     padding: '10gc',
      //     display: 'flex',
      //     alignItems: 'center' // Vertically center
      //   }
      // },

      // Triangle Description Text - Plus sign 1
      // {
      //   id: 'page4-triangle-description-plus1',
      //   name: 'triangle-description-plus1',
      //   type: 'custom',
      //   coordinates: [1250, 650, 1300, 750], // Plus sign between part 3 and part 4 (50gc wide)
      //   zIndex: 53,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: getI18nText('pages.page4.triangleDescriptionPlus1', '+'),
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: 'var(--color-orange)',
      //     fontSize: '30gc',
      //     fontWeight: 'normal',
      //     textAlign: 'center',
      //     padding: '10gc',
      //     display: 'flex',
      //     alignItems: 'center' // Vertically center
      //   }
      // },

      // Triangle Description Text - Part 4: "Length of quadilateral B1B2B3B4"
      // {
      //   id: 'page4-triangle-description-part4',
      //   name: 'triangle-description-part4',
      //   type: 'custom',
      //   coordinates: [1350, 650, 1400, 750], // Part 4 for "Length of quadilateral B1B2B3B4" (150gc wide)
      //   zIndex: 53,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: getI18nText('pages.page4.triangleDescriptionPart4', 'Length of quadilateral B<sub>1</sub>B<sub>2</sub>B<sub>3</sub>B<sub>4</sub>'),
      //     backgroundColor: 'transparent',
      //     border: 'none',
      //     borderRadius: '0gc',
      //     textColor: 'var(--color-orange)',
      //     fontSize: '28gc',
      //     fontWeight: 'normal',
      //     textAlign: 'center',
      //     whiteSpace: 'normal', // Enable word wrap
      //     padding: '10gc',
      //     display: 'flex',
      //     alignItems: 'center' // Vertically center
      //   }
      // },

      // Triangle Description Text - Plus sign 2
      {
        id: 'page4-triangle-description-plus2',
        name: 'triangle-description-plus2',
        type: 'custom',
        coordinates: [1800, 650, 1850, 750], // Plus sign between part 4 and part 5 (50gc wide)
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.triangleDescriptionPlus2', '+'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: 'var(--color-orange)',
          fontSize: '30gc',
          fontWeight: 'normal',
          textAlign: 'center',
          padding: '10gc',
          display: 'flex',
          alignItems: 'center' // Vertically center
        }
      },

      // Triangle Description Text - Part 5: "Length of quadilateral A1A2A3A4"
      {
        id: 'page4-triangle-description-part5',
        name: 'triangle-description-part5',
        type: 'custom',
        coordinates: [1850, 650, 2000, 750], // Part 5 for "Length of quadilateral A1A2A3A4" (150gc wide)
        zIndex: 53,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.triangleDescriptionPart5', 'Length of quadilateral A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: 'var(--color-orange)',
          fontSize: '30gc',
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'normal', // Enable word wrap
          padding: '10gc',
          display: 'flex',
          alignItems: 'center' // Vertically center
        }
      },

      // Background for Length of Rope equation
      {
        id: 'page4-length-of-rope-equation-background',
        name: 'length-of-rope-equation-background',
        type: 'custom',
        coordinates: [600, 140, 1595, 310], // Covers all equation components with padding (redistributed layout, height increased by 30%)
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "Length of Rope Required" text
      {
        id: 'page4-length-of-rope-text',
        name: 'length-of-rope-text',
        type: 'custom',
        coordinates: [610, 160, 875, 290], // Text area - same height as flip tiles (increased by 30%)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.lengthOfRopeRequired', 'Length of Rope Required'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.5',
          display: 'flex',
          alignItems: 'center'
        }
      },

      // Equals sign
      {
        id: 'page4-equals-sign',
        name: 'equals-sign',
        type: 'custom',
        coordinates: [890, 160, 925, 290], // Equals sign - same height as flip tiles (increased by 30%), 15gc gap from text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.equalsSign', '='),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center'
        }
      },

      // Flip Tile Component 1: C1C2C3C4
      {
        id: 'page4-flip-tile-component1',
        name: 'flip-tile-component1',
        type: 'custom',
        coordinates: [935, 160, 1104, 290], // First flip tile, 10gc gap from equals sign, width 169gc, height increased by 30%
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backText: '',
          backHtml: '<div style="padding: 10px; text-align: center; word-wrap: break-word; white-space: normal;">' + getI18nText('pages.page4.flipTileC1C2C3C4', 'Length of quadilateral C<sub>1</sub>C<sub>2</sub>C<sub>3</sub>C<sub>4</sub>') + '</div>',
          backBackgroundColor: '#E94B3C', // Red color for rhombus C
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '30gc',
          backFontWeight: 'normal',
          flipMode: 'custom',
          flipBack: false
        }
      },

      // Plus sign 1
      {
        id: 'page4-plus-sign-1',
        name: 'plus-sign-1',
        type: 'custom',
        coordinates: [1114, 160, 1164, 290], // Plus sign between tile 1 and tile 2, 10gc gap, height increased by 30%
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.plusSign', '+'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center'
        }
      },

      // Flip Tile Component 2: B1B2B3B4
      {
        id: 'page4-flip-tile-component2',
        name: 'flip-tile-component2',
        type: 'custom',
        coordinates: [1174, 160, 1343, 290], // Second flip tile, 10gc gap from plus sign, width 169gc, height increased by 30%
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backText: '',
          backHtml: '<div style="padding: 10px; text-align: center; word-wrap: break-word; white-space: normal;">' + getI18nText('pages.page4.flipTileB1B2B3B4', 'Length of quadilateral B<sub>1</sub>B<sub>2</sub>B<sub>3</sub>B<sub>4</sub>') + '</div>',
          backBackgroundColor: '#F5A623', // Orange color for rhombus B
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '30gc',
          backFontWeight: 'normal',
          flipMode: 'custom',
          flipBack: false
        }
      },

      // Plus sign 2
      {
        id: 'page4-plus-sign-2',
        name: 'plus-sign-2',
        type: 'custom',
        coordinates: [1353, 160, 1403, 290], // Plus sign between tile 2 and tile 3, 10gc gap from tile 2, ends before tile 3, height increased by 30%
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.plusSign', '+'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center'
        }
      },

      // Flip Tile Component 3: A1A2A3A4
      {
        id: 'page4-flip-tile-component3',
        name: 'flip-tile-component3',
        type: 'custom',
        coordinates: [1413, 160, 1582, 290], // Third flip tile, moved left by 105gc total, width increased by 12.5%, height increased by 30%
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color (Gold) with 45% opacity
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true,
          backText: '',
          backHtml: '<div style="padding: 10px; text-align: center; word-wrap: break-word; white-space: normal;">' + getI18nText('pages.page4.flipTileA1A2A3A4', 'Length of quadilateral A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>') + '</div>',
          backBackgroundColor: '#4A90E2', // Blue color for rhombus A
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '30gc',
          backFontWeight: 'normal',
          flipMode: 'custom',
          flipBack: false
        }
      },

      // Text between Equation 1 and Equation 2
      {
        id: 'page4-animation-observation-text',
        name: 'animation-observation-text',
        type: 'custom',
        coordinates: [600, 330, 1595, 400], // Positioned between eq1 (ends at y=310) and eq2 (starts at y=420)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.animationObservationText', 'We see from the animation that all four sides are equal'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White color
          fontSize: '30gc',
          padding: '10gc',
          textAlign: 'centlefter',
          lineHeight: '1.5',
          fontWeight: 'normal',
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // ===== Second Equation: Length of quadrilateral = 4 * Length of Side =====

      // Background for Length of quadrilateral equation
      {
        id: 'page4-length-of-quadrilateral-equation-background',
        name: 'length-of-quadrilateral-equation-background',
        type: 'custom',
        coordinates: [600, 420, 1355, 590], // Covers all equation components with padding - same height as eq1 (170gc: 490-320=170, matches eq1: 310-140=170)
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as first equation
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // "Length of quadrilateral" text
      {
        id: 'page4-length-of-quadrilateral-text',
        name: 'length-of-quadrilateral-text',
        type: 'custom',
        coordinates: [610, 440, 875, 570], // Vertically centered in background (same as eq1: content centered in 170gc height background)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.lengthOfQuadrilateral', 'Length of quadrilateral'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '10gc',
          textAlign: 'center',
          lineHeight: '1.5',
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // Equals sign for second equation
      {
        id: 'page4-equals-sign-2',
        name: 'equals-sign-2',
        type: 'custom',
        coordinates: [890, 440, 925, 570], // Vertically centered in background (same as eq1)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // Flip Tile Component 4: "4" (pre-filled, flip off)
      {
        id: 'page4-flip-tile-component4',
        name: 'flip-tile-component4',
        type: 'custom',
        coordinates: [935, 440, 1004, 570], // "4" flip tile, 10gc gap from equals sign, same width as eq3 (69gc), vertically centered
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color (Gold) with 45% opacity - match eq1
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true, // Match eq1 styling
          backText: '',
          backHtml: '<div style="padding: 10px; text-align: center; word-wrap: break-word; white-space: normal;">' + getI18nText('pages.page4.flipTileNumber4', '4') + '</div>',
          backBackgroundColor: '#4A90E2', // Blue color for rhombus A - match eq1 tile 3
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '30gc',
          backFontWeight: 'normal',
          flipMode: 'custom',
          flipBack: false,
          isFlipped: true, // Pre-filled (already flipped, shows back)
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // Multiplication sign
      {
        id: 'page4-multiply-sign',
        name: 'multiply-sign',
        type: 'custom',
        coordinates: [1014, 440, 1064, 570], // Multiplication sign between tile 4 and tile 5, 10gc gap, vertically centered
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.multiplySign', '×'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '30gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // Flip Tile Component 5: "Length of Side" (pre-filled, flip off)
      {
        id: 'page4-flip-tile-component5',
        name: 'flip-tile-component5',
        type: 'custom',
        coordinates: [1074, 440, 1243, 570], // Second flip tile in second equation, 10gc gap from multiply sign, same width as eq1 tiles (169gc), vertically centered
        zIndex: 60,
        props: {
          componentType: 'FlipTileComponent',
          frontText: '?',
          frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color (Gold) with 45% opacity - match eq1
          frontBorderColor: '#ffffff',
          frontBorderWidth: '2px',
          frontBorderStyle: 'solid',
          frontBorderRadius: '12gc',
          frontColor: '#000000',
          frontFontSize: '48gc',
          frontFontWeight: 'bold',
          blinkText: true, // Match eq1 styling
          backText: '',
          backHtml: '<div style="padding: 10px; text-align: center; word-wrap: break-word; white-space: normal;">' + getI18nText('pages.page4.flipTileLengthOfSide', 'Length of Side') + '</div>',
          backBackgroundColor: '#4A90E2', // Blue color for rhombus A - match eq1 tile 3
          backBorderColor: '#ffffff',
          backBorderWidth: '0px',
          backBorderStyle: 'none',
          backBorderRadius: '12gc',
          backColor: '#ffffff',
          backFontSize: '30gc',
          backFontWeight: 'normal',
          flipMode: 'custom',
          flipBack: false,
          isFlipped: true, // Pre-filled (already flipped, shows back)
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // ===== Third Equation: Length of rope re = 4 × (Length of Side C1C2 + Length of Side B1B2 + Length of Side A1A2) =====

      // Background for Length of Rope equation 3
      {
        id: 'page4-length-of-rope-equation-background-3',
        name: 'length-of-rope-equation-background-3',
        type: 'custom',
        coordinates: [600, 600, 1595, 770], // Covers all equation components with padding (minimal gaps)
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden until all three flip cards are flipped
        }
      },

      // Equation 3: Single textbox with entire equation
      {
        id: 'page4-equation-3-text',
        name: 'equation-3-text',
        type: 'custom',
        coordinates: [610, 620, 1950, 750], // Single textbox covering entire equation
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.equation3Text', '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">C₁C₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">B₁B₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">A₁A₂</span></span> )'),
          allowHTML: true,
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '26gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          display: 'none', // Hidden until all three flip cards are flipped
          alignItems: 'center',
          whiteSpace: 'normal'
        }
      },

      // Geometry Grid (same as page2-geometry-grid-1)
      {
        id: "page4-geometry-grid-1",
        name: "page4-geometry-grid-1",
        type: "custom",
        coordinates: [26, 173, 594, 688], // Reduced by 12.5%, moved left by 40gc total
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O (hidden for now, can be made visible later)
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: 'O', // Add label
              labelOffset: { x: '0gc', y: '0gc' },
              labelSize: '20gc',
              labelColor: '#FFFFFF', // White for center point
              size: '0gc', // Hidden - set to '8gc' to make visible later
              color: '#FFFFFF', // White color for center point
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;
                // Label offsets based on position (top, right, bottom, left)
                const labelOffsets = [
                  { x: '20gc', y: '-22gc' },  // Top vertex (moved right by 20gc, down by 8gc)
                  { x: '30gc', y: '-10gc' },   // Right vertex (moved up by 10gc)
                  { x: '20gc', y: '26gc' },   // Bottom vertex (moved right by 20gc, up by 12gc from previous position)
                  { x: '-30gc', y: '-10gc' }   // Left vertex (moved up by 10gc)
                ];
                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: pointId, // Add label (e.g., A1, A2, B1, etc.)
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '20gc',
                  labelColor: rhombusColor, // Same color as the rhombus
                  size: '0gc', // Hidden - set to '8gc' to make visible later
                  color: rhombusColor, // Same color as the rhombus
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;
                allConnections.push({
                  id: `${pointId}-${nextPointId}`,
                  from: pointId,
                  to: nextPointId,
                  color: rhombusColor,
                  thickness: '4gc',
                  style: 'solid',
                  clickable: false
                });
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Left side: C4-B4, B4-A4
            allConnections.push({
              id: 'C4-B4',
              from: 'C4',
              to: 'B4',
              color: '#FFFFFF', // White, same as other edges
              thickness: '2gc', // Slightly thicker to ensure visibility for notch placement
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B4-A4',
              from: 'B4',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Right side: C2-B2, B2-A2
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Bottom side: C3-B3, B3-A3
            allConnections.push({
              id: 'C3-B3',
              from: 'C3',
              to: 'B3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B3-A3',
              from: 'B3',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (A1, A2, A3, A4)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A3',
              from: 'O',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A4',
              from: 'O',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 4] Added connections for notches:', [
              'C4-B4', 'B4-A4', 'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1', 'C3-B3', 'B3-A3',
              'O-A1', 'O-A2', 'O-A3', 'O-A4'
            ]);
            console.log('✅ [Page 4] Total connections:', allConnections.length);
            console.log('✅ [Page 4] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // No notches (tick marks) for page 4
          sideSymbols: (() => {
            const symbols = [];
            console.log('✅ [Page 4] sideSymbols configured (no notches):', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },


      // Question Image
      // {
      //   id: 'page4-question-image',
      //   name: 'question-image',
      //   type: 'custom',
      //   coordinates: [925, 110, 1575, 775], // Positioned to the right of question text
      //   zIndex: 51,
      //   props: {
      //     componentType: 'ImageStackComponent',
      //     images: [
      //       {
      //         src: 'assets/questionImage.png',
      //         opacity: 1.0
      //       }
      //     ]
      //   }
      // },



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
            'pages.page4.instruction',
            'Tap on "?" to reveal'
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

      // Tap Animation GIF
      {
        id: 'page4-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 4 } // Only show for page 4 quiz completion
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page4-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page4-next-button');
            return getNextButtonText(pageNumber);
          },
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for page 4 quiz completion
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page4-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page4-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

    // Initialize train animation for page 4 when page loads
    // This runs after page 4 configuration is loaded
    _page4TrainAnimationInit: (() => {
      // Initialize train animation for page 4 geometry grid
      const initTrainAnimation = (retryCount = 0) => {
        // Check if we're still on page 4 - if not, stop retrying
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage !== null && currentPage !== 4) {
          // We're not on page 4 anymore, stop retrying
          return;
        }

        // Limit retries to prevent infinite loops
        if (retryCount > 20) {
          console.warn('⚠️ [Page 4 Train] Geometry grid not found after 20 retries, giving up');
          return;
        }

        console.log('🔍 [Page 4 Train] Attempting to initialize train animation...');
        const gridElement = document.getElementById('page4-geometry-grid-1');
        if (!gridElement) {
          if (retryCount < 5) {
            // Only log first few retries to avoid spam
            console.warn(`⚠️ [Page 4 Train] Geometry grid not found, retrying... (attempt ${retryCount + 1})`);
          }
          setTimeout(() => initTrainAnimation(retryCount + 1), 500);
          return;
        }

        const svg = gridElement.querySelector('svg');
        if (!svg) {
          if (retryCount < 5) {
            // Only log first few retries to avoid spam
            console.warn(`⚠️ [Page 4 Train] SVG not found, retrying... (attempt ${retryCount + 1})`);
          }
          setTimeout(() => initTrainAnimation(retryCount + 1), 500);
          return;
        }

        // Check if animation already initialized
        if (svg.querySelector('.train-A')) {
          console.log('ℹ️ [Page 4 Train] Train animation already initialized');
          return;
        }

        // Double-check we're still on page 4 before proceeding with initialization
        const currentPageCheck = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPageCheck !== null && currentPageCheck !== 4) {
          console.log('ℹ️ [Page 4 Train] Not on page 4 anymore, aborting train animation initialization.');
          return;
        }

        console.log('🚂 [Page 4 Train] Initializing train animation - SVG found!');

        // Get container coordinates and grid dimensions
        const containerRect = gridElement.getBoundingClientRect();
        const containerCoordinates = [26, 163, 594, 688]; // From page config
        const [x1, y1, x2, y2] = containerCoordinates;
        const containerWidthGc = x2 - x1;
        const containerHeightGc = y2 - y1;

        const gridRows = 10;
        const gridCols = 10;
        const gridPadding = 0;

        // Calculate cell size (same logic as QuadrilateralComponent)
        const adjustedWidthGc = containerWidthGc - 2 * gridPadding;
        const adjustedHeightGc = containerHeightGc - 2 * gridPadding;
        const widthPerCell = adjustedWidthGc / gridCols;
        const heightPerCell = adjustedHeightGc / gridRows;
        const cellSizeGc = Math.min(widthPerCell, heightPerCell);

        // Calculate grid dimensions and offsets
        const gridWidthGc = cellSizeGc * gridCols;
        const gridHeightGc = cellSizeGc * gridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;

        // Scale factors for converting gc to pixels
        const scaleX = containerRect.width / containerWidthGc;
        const scaleY = containerRect.height / containerHeightGc;

        // Define point positions in grid coordinates (from customConfig)
        const centerRow = 5;
        const centerCol = 5;
        const spacing = 1.5;

        const pointPositions = {
          // Center point
          O: { row: centerRow, col: centerCol },
          // Rhombus A (inner)
          A1: { row: centerRow - spacing, col: centerCol },
          A2: { row: centerRow, col: centerCol + spacing },
          A3: { row: centerRow + spacing, col: centerCol },
          A4: { row: centerRow, col: centerCol - spacing },
          // Rhombus B (middle)
          B1: { row: centerRow - spacing * 2, col: centerCol },
          B2: { row: centerRow, col: centerCol + spacing * 2 },
          B3: { row: centerRow + spacing * 2, col: centerCol },
          B4: { row: centerRow, col: centerCol - spacing * 2 },
          // Rhombus C (outer)
          C1: { row: centerRow - spacing * 3, col: centerCol },
          C2: { row: centerRow, col: centerCol + spacing * 3 },
          C3: { row: centerRow + spacing * 3, col: centerCol },
          C4: { row: centerRow, col: centerCol - spacing * 3 }
        };

        // Define rhombus paths (in order: top -> right -> bottom -> left)
        const rhombusPaths = {
          A: ['A1', 'A2', 'A3', 'A4', 'A1'], // Blue rhombus
          B: ['B1', 'B2', 'B3', 'B4', 'B1'], // Orange rhombus
          C: ['C1', 'C2', 'C3', 'C4', 'C1']  // Red rhombus
        };

        const rhombusColors = {
          A: '#4A90E2', // Blue
          B: '#F5A623', // Orange
          C: '#E94B3C'  // Red
        };

        // Animation parameters - speeds will be calculated dynamically to synchronize all trains

        // Edge thickness is 4gc, so bar width = 2x line width = 2 * 4gc = 8gc
        // Convert gc to SVG units (same scale as coordinates)
        const edgeThicknessGc = 4; // Edge thickness in gc
        const barThicknessGc = edgeThicknessGc * 2; // 2x the line width = 8gc

        // Convert gc to SVG units
        const gcToSvgRatio = 100 / containerWidthGc; // Convert gc to SVG percentage, then to SVG units
        const barThickness = barThicknessGc * gcToSvgRatio;

        // Helper function to calculate distance between two points
        const calculateDistance = (point1, point2) => {
          const dx = point2.x - point1.x;
          const dy = point2.y - point1.y;
          return Math.sqrt(dx * dx + dy * dy);
        };

        // Get point coordinates by calculating from grid positions
        const getPointCoords = (pointId) => {
          // Check if we're still on page 4 before processing
          const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
          if (currentPage !== null && currentPage !== 4) {
            return null;
          }

          const pointPos = pointPositions[pointId];
          if (!pointPos) {
            console.warn(`⚠️ [Page 4 Train] Point ${pointId} not found in pointPositions`);
            return null;
          }

          // Convert grid position to gc coordinates
          const pointXGc = offsetXGc + (pointPos.col * cellSizeGc);
          const pointYGc = offsetYGc + (pointPos.row * cellSizeGc);

          // Convert to pixels (relative to SVG viewBox which is 0-100)
          // The SVG uses percentage coordinates, so we need to convert to percentage
          const percentX = (pointXGc / containerWidthGc) * 100;
          const percentY = (pointYGc / containerHeightGc) * 100;

          // Get SVG viewBox dimensions
          const viewBox = svg.getAttribute('viewBox');
          let svgWidth = 100, svgHeight = 100;
          if (viewBox) {
            const [, , w, h] = viewBox.split(' ').map(parseFloat);
            svgWidth = w || 100;
            svgHeight = h || 100;
          }

          // Convert percentage to SVG coordinates
          const x = (percentX / 100) * svgWidth;
          const y = (percentY / 100) * svgHeight;

          // Only log if still on page 4
          if (currentPage === 4) {
            console.log(`✅ [Page 4 Train] Point ${pointId} at grid (${pointPos.row}, ${pointPos.col}) -> SVG (${x.toFixed(2)}, ${y.toFixed(2)})`);
          }
          return { x, y };
        };

        // Calculate the edge length for the outermost rhombus (C) to use as reference for all bars
        const c1Coords = getPointCoords('C1');
        const c2Coords = getPointCoords('C2');
        const c3Coords = getPointCoords('C3');
        const c4Coords = getPointCoords('C4');

        // Calculate average edge length for rhombus C (all edges should be equal, but use average for safety)
        let outerEdgeLength = 0;
        let fixedBarLength = 1; // Default, will be updated
        if (c1Coords && c2Coords && c3Coords && c4Coords) {
          const edge1 = calculateDistance(c1Coords, c2Coords);
          const edge2 = calculateDistance(c2Coords, c3Coords);
          const edge3 = calculateDistance(c3Coords, c4Coords);
          const edge4 = calculateDistance(c4Coords, c1Coords);
          outerEdgeLength = (edge1 + edge2 + edge3 + edge4) / 4;
          fixedBarLength = (outerEdgeLength / 25) * 2; // Bar length is 2x (2/25 of outermost edge length)
          console.log(`📏 [Page 4 Train] Outer rhombus (C) average edge length: ${outerEdgeLength.toFixed(2)} SVG units, bar length: ${fixedBarLength.toFixed(2)} SVG units`);
        } else {
          console.warn('⚠️ [Page 4 Train] Could not calculate outer edge length, using default');
        }

        // Create glow filter for bars (add to defs if not exists)
        let defs = svg.querySelector('defs');
        if (!defs) {
          defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          svg.insertBefore(defs, svg.firstChild);
        }

        // Create glow filters for each color
        Object.keys(rhombusColors).forEach((rhombusKey) => {
          const color = rhombusColors[rhombusKey];
          const filterId = `glow-${rhombusKey}`;

          // Check if filter already exists
          if (defs.querySelector(`#${filterId}`)) return;

          const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
          filter.setAttribute('id', filterId);
          filter.setAttribute('x', '-50%');
          filter.setAttribute('y', '-50%');
          filter.setAttribute('width', '200%');
          filter.setAttribute('height', '200%');

          // Gaussian blur for glow
          const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
          feGaussianBlur.setAttribute('stdDeviation', '3');
          feGaussianBlur.setAttribute('result', 'coloredBlur');

          // Merge with original
          const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
          const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
          feMergeNode1.setAttribute('in', 'coloredBlur');
          const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
          feMergeNode2.setAttribute('in', 'SourceGraphic');

          feMerge.appendChild(feMergeNode1);
          feMerge.appendChild(feMergeNode2);
          filter.appendChild(feGaussianBlur);
          filter.appendChild(feMerge);
          defs.appendChild(filter);
        });

        // Calculate total perimeter for each rhombus to synchronize speeds
        const calculatePerimeter = (path) => {
          let totalLength = 0;
          for (let i = 0; i < path.length - 1; i++) {
            const fromCoords = getPointCoords(path[i]);
            const toCoords = getPointCoords(path[i + 1]);
            if (fromCoords && toCoords) {
              totalLength += calculateDistance(fromCoords, toCoords);
            }
          }
          return totalLength;
        };

        // Calculate perimeters for all rhombuses
        const perimeters = {};
        Object.keys(rhombusPaths).forEach((rhombusKey) => {
          perimeters[rhombusKey] = calculatePerimeter(rhombusPaths[rhombusKey]);
          console.log(`📏 [Page 4 Train] Rhombus ${rhombusKey} perimeter: ${perimeters[rhombusKey].toFixed(2)} SVG units`);
        });

        // Find the longest perimeter (will be the slowest, use as reference)
        const maxPerimeter = Math.max(...Object.values(perimeters));
        const cycleDuration = 12000; // Total time for one complete cycle (12 seconds)

        // Calculate speed for each rhombus so they all complete in the same time
        const speeds = {};
        Object.keys(perimeters).forEach((rhombusKey) => {
          // Speed = distance / time, but we need time per edge
          // Total time = cycleDuration, so time per edge = cycleDuration / number of edges
          // But we want speed per edge, so: speed = edgeLength / (cycleDuration / numEdges)
          // Actually, we want: time per edge = (edgeLength / totalPerimeter) * cycleDuration
          // Speed per edge = edgeLength / time per edge
          speeds[rhombusKey] = perimeters[rhombusKey] / cycleDuration; // SVG units per millisecond
          console.log(`⚡ [Page 4 Train] Rhombus ${rhombusKey} speed: ${speeds[rhombusKey].toFixed(4)} SVG units/ms`);
        });

        // Store train groups and animation functions for later control
        const trainGroups = {};
        const animationFunctions = {};
        let animationStopped = false;

        // Function to stop all animations and hide bars
        const stopAnimationAndHideBars = () => {
          if (animationStopped) return;
          animationStopped = true;

          console.log('🛑 [Page 4 Train] Stopping animation and hiding bars');

          // Stop all animation functions
          Object.keys(animationFunctions).forEach((rhombusKey) => {
            if (animationFunctions[rhombusKey] && animationFunctions[rhombusKey].stop) {
              animationFunctions[rhombusKey].stop();
            }
          });

          // Hide all train bars
          Object.keys(trainGroups).forEach((rhombusKey) => {
            const trainGroup = trainGroups[rhombusKey];
            if (trainGroup) {
              trainGroup.setAttribute('display', 'none');
              trainGroup.setAttribute('visibility', 'hidden');
            }
          });

          // Show point dots by finding and updating circles in the SVG
          // The QuadrilateralComponent renders points as circles, we need to find them
          const pointIds = ['O', 'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];

          // Calculate gcToSvgRatio if not already available
          const containerWidthGc = 568; // 594 - 26
          const gcToSvgRatio = 100 / containerWidthGc;
          const dotSizeSvg = 8 * gcToSvgRatio;

          // Function to show point dots using multiple methods
          const showPointDots = () => {
            console.log('🔍 [Page 4 Train] Attempting to show point dots...');

            // Get all SVGs in the grid element (there might be multiple)
            const allSvgs = gridElement.querySelectorAll('svg');
            console.log(`📊 [Page 4 Train] Found ${allSvgs.length} SVG(s) in grid element`);

            pointIds.forEach((pointId) => {
              // Method 1: Use getPointCoords to get exact coordinates
              const pointCoords = getPointCoords(pointId);
              if (!pointCoords) {
                console.warn(`⚠️ [Page 4 Train] Could not get coordinates for point ${pointId}`);
                return;
              }

              console.log(`📍 [Page 4 Train] Point ${pointId} at (${pointCoords.x.toFixed(2)}, ${pointCoords.y.toFixed(2)})`);

              // Search in all SVGs
              let found = false;
              allSvgs.forEach((svgEl, svgIndex) => {
                if (found) return;

                // Find circles near the point coordinates
                const allCircles = svgEl.querySelectorAll('circle');
                let nearestCircle = null;
                let minDistance = Infinity;
                const tolerance = 2.0; // 2% tolerance

                allCircles.forEach((c) => {
                  // Skip train bar circles
                  const parentGroup = c.closest('g');
                  if (parentGroup && (parentGroup.classList.contains('train-A') ||
                    parentGroup.classList.contains('train-B') ||
                    parentGroup.classList.contains('train-C'))) {
                    return;
                  }

                  const circleX = parseFloat(c.getAttribute('cx')) || 0;
                  const circleY = parseFloat(c.getAttribute('cy')) || 0;
                  const distance = Math.sqrt(Math.pow(circleX - pointCoords.x, 2) + Math.pow(circleY - pointCoords.y, 2));

                  if (distance < minDistance && distance < tolerance) {
                    minDistance = distance;
                    nearestCircle = c;
                  }
                });

                if (nearestCircle) {
                  const currentR = parseFloat(nearestCircle.getAttribute('r')) || 0;
                  nearestCircle.setAttribute('r', dotSizeSvg.toString());
                  // Remove white border
                  nearestCircle.setAttribute('stroke', 'none');
                  nearestCircle.setAttribute('stroke-width', '0');
                  console.log(`✅ [Page 4 Train] SVG ${svgIndex}: Made point dot ${pointId} visible (r=${dotSizeSvg.toFixed(2)}, was ${currentR.toFixed(2)})`);
                  found = true;
                }
              });

              // Method 2: Also try via text labels (fallback)
              if (!found) {
                allSvgs.forEach((svgEl) => {
                  const textLabels = Array.from(svgEl.querySelectorAll('text')).filter(t => {
                    const text = t.textContent.trim();
                    return text === pointId;
                  });

                  textLabels.forEach((textLabel) => {
                    const textX = parseFloat(textLabel.getAttribute('x')) || 0;
                    const textY = parseFloat(textLabel.getAttribute('y')) || 0;

                    const allCircles = svgEl.querySelectorAll('circle');
                    let nearestCircle = null;
                    let minDistance = Infinity;

                    allCircles.forEach((c) => {
                      const parentGroup = c.closest('g');
                      if (parentGroup && (parentGroup.classList.contains('train-A') ||
                        parentGroup.classList.contains('train-B') ||
                        parentGroup.classList.contains('train-C'))) {
                        return;
                      }

                      const circleX = parseFloat(c.getAttribute('cx')) || 0;
                      const circleY = parseFloat(c.getAttribute('cy')) || 0;
                      const distance = Math.sqrt(Math.pow(textX - circleX, 2) + Math.pow(textY - circleY, 2));

                      if (distance < minDistance && distance < 5) { // Within 5 SVG units
                        minDistance = distance;
                        nearestCircle = c;
                      }
                    });

                    if (nearestCircle) {
                      nearestCircle.setAttribute('r', dotSizeSvg.toString());
                      // Remove white border
                      nearestCircle.setAttribute('stroke', 'none');
                      nearestCircle.setAttribute('stroke-width', '0');
                      console.log(`✅ [Page 4 Train] Made point dot ${pointId} visible via text label (r=${dotSizeSvg.toFixed(2)})`);
                      found = true;
                    }
                  });
                });
              }

              if (!found) {
                console.warn(`⚠️ [Page 4 Train] Could not find circle for point ${pointId}`);
              }
            });

            // Method 3: Try to remove stroke from all point circles (fallback)
            // This ensures any remaining circles have no white border
            allSvgs.forEach((svgEl) => {
              const allCircles = svgEl.querySelectorAll('circle');
              allCircles.forEach((c) => {
                // Skip train bar circles
                const parentGroup = c.closest('g');
                if (parentGroup && (parentGroup.classList.contains('train-A') ||
                  parentGroup.classList.contains('train-B') ||
                  parentGroup.classList.contains('train-C'))) {
                  return;
                }
                // Remove white border from all point circles
                const currentStroke = c.getAttribute('stroke');
                if (currentStroke === '#FFFFFF' || currentStroke === '#fff' || currentStroke === 'white') {
                  c.setAttribute('stroke', 'none');
                  c.setAttribute('stroke-width', '0');
                }
              });
            });
          };

          // Show dots immediately
          showPointDots();

          // Retry after delays to catch any late-rendered elements
          setTimeout(showPointDots, 300);
          setTimeout(showPointDots, 1000);
          setTimeout(showPointDots, 2000);

          console.log('✅ [Page 4 Train] Animation stopped, bars hidden, point dots shown');

          // Trigger side equality animation cycle (A -> B -> C -> A...)
          triggerRhombusSideEqualityCycle();
        };

        // Function to get connections SVG (shared helper)
        const getConnectionsSvg = () => {
          let connectionsSvg = gridElement.querySelector('svg[viewBox="0 0 100 100"]');
          if (!connectionsSvg) {
            const allSvgs = gridElement.querySelectorAll('svg');
            for (const svgEl of allSvgs) {
              const viewBox = svgEl.getAttribute('viewBox');
              if (viewBox && viewBox.includes('0 0 100 100')) {
                connectionsSvg = svgEl;
                break;
              }
            }
          }
          return connectionsSvg;
        };

        // Generic function to animate side equality for any rhombus
        const animateRhombusSideEquality = (rhombusLabel, onComplete) => {
          // Check if we're still on page 4
          const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
          if (currentPage !== null && currentPage !== 4) {
            console.log(`ℹ️ [Page 4] Not on page 4 anymore, stopping side equality animation for rhombus ${rhombusLabel}`);
            if (onComplete) onComplete();
            return;
          }

          const pointIds = {
            'A': ['A1', 'A2', 'A3', 'A4'],
            'B': ['B1', 'B2', 'B3', 'B4'],
            'C': ['C1', 'C2', 'C3', 'C4']
          };

          const points = pointIds[rhombusLabel];
          if (!points) {
            console.warn(`⚠️ [Page 4] Unknown rhombus label: ${rhombusLabel}`);
            if (onComplete) onComplete();
            return;
          }

          console.log(`🎬 [Page 4] Starting side equality animation for rhombus ${rhombusLabel}`);

          const p1Coords = getPointCoords(points[0]);
          const p2Coords = getPointCoords(points[1]);
          const p3Coords = getPointCoords(points[2]);
          const p4Coords = getPointCoords(points[3]);

          if (!p1Coords || !p2Coords || !p3Coords || !p4Coords) {
            console.warn(`⚠️ [Page 4] Could not get all ${rhombusLabel} rhombus coordinates`);
            if (onComplete) onComplete();
            return;
          }

          const connectionsSvg = getConnectionsSvg();
          if (!connectionsSvg) {
            console.warn('⚠️ [Page 4] Connections SVG not found');
            if (onComplete) onComplete();
            return;
          }

          // Animation parameters
          const pivotDuration = 1500; // ms for each pivot
          const waitTime = 1000; // ms to wait at each side
          const rhombusColor = rhombusColors[rhombusLabel];

          // Get the stroke-width from existing connection lines to match their thickness
          const existingLines = connectionsSvg.querySelectorAll('line');
          let existingStrokeWidth = '3'; // Default fallback
          if (existingLines.length > 0) {
            const firstLine = existingLines[0];
            const strokeWidth = firstLine.getAttribute('stroke-width');
            if (strokeWidth) {
              existingStrokeWidth = strokeWidth;
            }
          }

          // Convert 2gc to viewBox units for thicker dashed bar
          // Container width is 568gc (594 - 26), viewBox is 0-100
          const containerWidthGc = 568;
          const gcToViewBoxRatio = 100 / containerWidthGc;
          const additionalThickness = 2 * gcToViewBoxRatio; // 2gc in viewBox units
          const thickerStrokeWidth = (parseFloat(existingStrokeWidth) + additionalThickness).toString();

          // Get center point O for determining inner rotation direction
          const centerCoords = getPointCoords('O');

          // Create highlight lines for each side (same color as rhombus, no glow)
          const createHighlightLine = (fromCoords, toCoords, color) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromCoords.x.toString());
            line.setAttribute('y1', fromCoords.y.toString());
            line.setAttribute('x2', toCoords.x.toString());
            line.setAttribute('y2', toCoords.y.toString());
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', existingStrokeWidth);
            line.setAttribute('opacity', '0');
            line.setAttribute('class', `rhombus-${rhombusLabel.toLowerCase()}-side-highlight`);
            // Remove any glow effects
            line.setAttribute('filter', 'none');
            line.setAttribute('style', 'filter: none;');
            connectionsSvg.appendChild(line);
            return line;
          };

          const p1p2Line = createHighlightLine(p1Coords, p2Coords, rhombusColor);
          const p2p3Line = createHighlightLine(p2Coords, p3Coords, rhombusColor);
          const p3p4Line = createHighlightLine(p3Coords, p4Coords, rhombusColor);
          const p4p1Line = createHighlightLine(p4Coords, p1Coords, rhombusColor);
          const sideLines = [p1p2Line, p2p3Line, p3p4Line, p4p1Line];

          // Create a reference line that will pivot (green dashed line with blinking animation, thicker by 2gc)
          const referenceLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          referenceLine.setAttribute('stroke', '#00FF00'); // Green color
          referenceLine.setAttribute('stroke-width', thickerStrokeWidth); // Thicker by 2gc
          referenceLine.setAttribute('stroke-dasharray', '8,4');
          referenceLine.setAttribute('opacity', '0');
          referenceLine.setAttribute('class', `rhombus-${rhombusLabel.toLowerCase()}-equality-line`);
          // Remove any glow effects
          referenceLine.setAttribute('filter', 'none');
          // Add fast blinking animation
          referenceLine.setAttribute('style', 'filter: none; animation: blink-fast 0.3s infinite;');
          connectionsSvg.appendChild(referenceLine);

          // Add CSS animation for blinking if not already defined
          if (!document.getElementById('blink-fast-animation-style')) {
            const style = document.createElement('style');
            style.id = 'blink-fast-animation-style';
            style.textContent = `
              @keyframes blink-fast {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
              }
              .rhombus-a-equality-line,
              .rhombus-b-equality-line,
              .rhombus-c-equality-line {
                animation: blink-fast 0.3s infinite;
              }
            `;
            document.head.appendChild(style);
          }

          // Animation sequence: X1X2 -> pivot over X2 to X2X3 -> pivot over X3 to X3X4 -> pivot over X4 to X4X1 -> pivot over X1 to X1X2
          let currentStep = 0;
          const steps = [
            { from: points[0], to: points[1], pivot: points[1], next: points[2], lineIndex: 0, nextLineIndex: 1, message: `${points[0]}${points[1]} = ${points[1]}${points[2]}` },
            { from: points[1], to: points[2], pivot: points[2], next: points[3], lineIndex: 1, nextLineIndex: 2, message: `${points[1]}${points[2]} = ${points[2]}${points[3]}` },
            { from: points[2], to: points[3], pivot: points[3], next: points[0], lineIndex: 2, nextLineIndex: 3, message: `${points[2]}${points[3]} = ${points[3]}${points[0]}` },
            { from: points[3], to: points[0], pivot: points[0], next: points[1], lineIndex: 3, nextLineIndex: 0, message: `${points[3]}${points[0]} = ${points[0]}${points[1]}` }
          ];

          const animateStep = () => {
            // Check if we're still on page 4
            const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
            if (currentPage !== null && currentPage !== 4) {
              console.log(`ℹ️ [Page 4] Not on page 4 anymore, stopping animation step for rhombus ${rhombusLabel}`);
              // Clean up
              if (referenceLine && referenceLine.parentNode) {
                referenceLine.remove();
              }
              sideLines.forEach(line => {
                if (line) line.setAttribute('opacity', '0');
              });
              if (onComplete) onComplete();
              return;
            }

            if (currentStep >= steps.length) {
              // Animation complete - fade out all highlights
              referenceLine.remove();
              sideLines.forEach(line => {
                if (line) line.setAttribute('opacity', '0');
              });
              console.log(`✅ [Page 4] Rhombus ${rhombusLabel} side equality animation complete`);
              if (onComplete) onComplete();
              return;
            }

            const step = steps[currentStep];
            const fromCoords = getPointCoords(step.from);
            const toCoords = getPointCoords(step.to);
            const pivotCoords = getPointCoords(step.pivot);
            const nextCoords = getPointCoords(step.next);

            if (!fromCoords || !toCoords || !pivotCoords || !nextCoords) {
              console.warn(`⚠️ [Page 4] Missing coordinates for step ${currentStep}`);
              currentStep++;
              setTimeout(animateStep, 100);
              return;
            }

            // For the first step, show the initial side (X1X2) and wait
            // For subsequent steps, the line is already in position from previous pivot, so pivot immediately
            if (currentStep === 0) {
              // Step 1: Show the first side (X1X2)
              referenceLine.setAttribute('x1', fromCoords.x);
              referenceLine.setAttribute('y1', fromCoords.y);
              referenceLine.setAttribute('x2', toCoords.x);
              referenceLine.setAttribute('y2', toCoords.y);
              referenceLine.setAttribute('opacity', '1');

              // Highlight the current side
              const currentLine = sideLines[step.lineIndex];
              if (currentLine) {
                currentLine.setAttribute('opacity', '0.8');
              }

              // Wait before starting first pivot
              setTimeout(() => {
                startPivot();
              }, waitTime);
            } else {
              // For subsequent steps, start pivoting immediately (seamless continuation)
              startPivot();
            }

            function startPivot() {
              // Calculate angles for smooth pivot
              // Start from current side (from->to), pivot over pivot point, end at next side (pivot->next)
              let startAngle = Math.atan2(toCoords.y - fromCoords.y, toCoords.x - fromCoords.x);
              let endAngle = Math.atan2(nextCoords.y - pivotCoords.y, nextCoords.x - pivotCoords.x);

              // Ensure rotation goes towards inner side (towards center O)
              if (centerCoords) {
                // Calculate angle from pivot point to center
                const centerAngle = Math.atan2(centerCoords.y - pivotCoords.y, centerCoords.x - pivotCoords.x);

                // Calculate angle difference (normalized to [-π, π])
                let angleDiff = endAngle - startAngle;
                while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

                // Calculate the midpoint angle of the rotation
                const midAngle = startAngle + angleDiff / 2;

                // Calculate angle from midpoint to center
                let angleToCenter = centerAngle - midAngle;
                while (angleToCenter > Math.PI) angleToCenter -= 2 * Math.PI;
                while (angleToCenter < -Math.PI) angleToCenter += 2 * Math.PI;

                // If the midpoint is pointing away from center (angle > 90° or < -90°), reverse rotation
                if (Math.abs(angleToCenter) > Math.PI / 2) {
                  // Reverse the rotation direction
                  endAngle = startAngle - angleDiff;
                  // Normalize endAngle to [-π, π]
                  while (endAngle > Math.PI) endAngle -= 2 * Math.PI;
                  while (endAngle < -Math.PI) endAngle += 2 * Math.PI;
                }
              }

              // Get the current length of the line (should match the side length)
              const currentLength = calculateDistance(fromCoords, toCoords);
              const nextLength = calculateDistance(pivotCoords, nextCoords);

              const startTime = Date.now();
              const pivot = () => {
                // Check if we're still on page 4
                const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
                if (currentPage !== null && currentPage !== 4) {
                  console.log(`ℹ️ [Page 4] Not on page 4 anymore, stopping pivot animation for rhombus ${rhombusLabel}`);
                  // Clean up
                  if (referenceLine && referenceLine.parentNode) {
                    referenceLine.remove();
                  }
                  sideLines.forEach(line => {
                    if (line) line.setAttribute('opacity', '0');
                  });
                  if (onComplete) onComplete();
                  return;
                }

                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / pivotDuration, 1);

                // Ease-in-out for smooth animation
                const eased = progress < 0.5
                  ? 2 * progress * progress
                  : -1 + (4 - 2 * progress) * progress;

                // Interpolate angle smoothly
                let angle = startAngle + (endAngle - startAngle) * eased;

                // Interpolate length if sides have different lengths (shouldn't happen for rhombus, but for safety)
                const length = currentLength + (nextLength - currentLength) * eased;

                // Calculate line endpoint - pivot point stays fixed, endpoint rotates
                const endX = pivotCoords.x + Math.cos(angle) * length;
                const endY = pivotCoords.y + Math.sin(angle) * length;

                // For the first part of pivot, move the start point to the pivot point
                // For the second part, keep pivot point fixed and rotate the end point
                if (progress < 0.5) {
                  // First half: move start point towards pivot point
                  const startProgress = progress * 2; // 0 to 1 for first half
                  const startX = fromCoords.x + (pivotCoords.x - fromCoords.x) * startProgress;
                  const startY = fromCoords.y + (pivotCoords.y - fromCoords.y) * startProgress;
                  referenceLine.setAttribute('x1', startX);
                  referenceLine.setAttribute('y1', startY);
                  referenceLine.setAttribute('x2', toCoords.x + (pivotCoords.x - toCoords.x) * startProgress);
                  referenceLine.setAttribute('y2', toCoords.y + (pivotCoords.y - toCoords.y) * startProgress);
                } else {
                  // Second half: pivot point is fixed, rotate end point
                  const pivotProgress = (progress - 0.5) * 2; // 0 to 1 for second half
                  const rotatedAngle = startAngle + (endAngle - startAngle) * (0.5 + pivotProgress * 0.5);
                  const endX = pivotCoords.x + Math.cos(rotatedAngle) * nextLength;
                  const endY = pivotCoords.y + Math.sin(rotatedAngle) * nextLength;
                  referenceLine.setAttribute('x1', pivotCoords.x);
                  referenceLine.setAttribute('y1', pivotCoords.y);
                  referenceLine.setAttribute('x2', endX);
                  referenceLine.setAttribute('y2', endY);
                }

                referenceLine.setAttribute('opacity', '1'); // Full opacity for blinking

                if (progress < 1) {
                  requestAnimationFrame(pivot);
                } else {
                  // Pivot complete - line is now showing the next side
                  // Ensure line is exactly positioned at the next side
                  referenceLine.setAttribute('x1', pivotCoords.x);
                  referenceLine.setAttribute('y1', pivotCoords.y);
                  referenceLine.setAttribute('x2', nextCoords.x);
                  referenceLine.setAttribute('y2', nextCoords.y);

                  // Highlight the next side
                  const nextLine = sideLines[step.nextLineIndex];
                  if (nextLine) {
                    nextLine.setAttribute('opacity', '0.8');
                  }

                  // Fade out the previous side highlight
                  const currentLine = sideLines[step.lineIndex];
                  if (currentLine) {
                    currentLine.setAttribute('opacity', '0.4');
                  }

                  console.log(`✅ [Page 4] ${step.message}`);

                  // Move to next step immediately (no wait for seamless transition)
                  currentStep++;
                  setTimeout(animateStep, 50); // Very short delay for smooth continuation
                }
              };

              requestAnimationFrame(pivot);
            }
          };

          // Start animation
          setTimeout(animateStep, 500);
        };

        // Function to cycle through all three rhombuses: A -> B -> C -> A...
        const triggerRhombusSideEqualityCycle = () => {
          const rhombusOrder = ['A', 'B', 'C']; // Blue, Orange, Red
          let currentIndex = 0;

          const runNextAnimation = () => {
            // Check if we're still on page 4
            const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
            if (currentPage !== null && currentPage !== 4) {
              console.log(`ℹ️ [Page 4] Not on page 4 anymore, stopping rhombus side equality cycle`);
              return;
            }

            const rhombusLabel = rhombusOrder[currentIndex];
            animateRhombusSideEquality(rhombusLabel, () => {
              // Check again before continuing to next animation
              const currentPageCheck = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
              if (currentPageCheck !== null && currentPageCheck !== 4) {
                console.log(`ℹ️ [Page 4] Not on page 4 anymore, stopping rhombus side equality cycle`);
                return;
              }

              // When animation completes, move to next rhombus
              currentIndex = (currentIndex + 1) % rhombusOrder.length;
              // Small delay before starting next animation
              setTimeout(runNextAnimation, 500);
            });
          };

          // Start with rhombus A (blue)
          runNextAnimation();
        };

        // Function to check if all three flip cards are opened
        const checkAllFlipCardsOpened = () => {
          const flipCard1 = document.getElementById('page4-flip-tile-component1');
          const flipCard2 = document.getElementById('page4-flip-tile-component2');
          const flipCard3 = document.getElementById('page4-flip-tile-component3');

          if (!flipCard1 || !flipCard2 || !flipCard3) {
            return false;
          }

          const card1Flipped = flipCard1.getAttribute('data-flipped') === 'true';
          const card2Flipped = flipCard2.getAttribute('data-flipped') === 'true';
          const card3Flipped = flipCard3.getAttribute('data-flipped') === 'true';

          return card1Flipped && card2Flipped && card3Flipped;
        };

        // Set up MutationObserver to watch for flip card changes
        const setupFlipCardWatcher = (retryCount = 0) => {
          // Check if we're still on page 4 - if not, stop retrying
          const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;
          if (currentPage !== null && currentPage !== 4) {
            // We're not on page 4 anymore, stop retrying
            return;
          }

          // Limit retries to prevent infinite loops
          if (retryCount > 20) {
            console.warn('⚠️ [Page 4 Train] Flip cards not found after 20 retries, giving up');
            return;
          }

          const flipCard1 = document.getElementById('page4-flip-tile-component1');
          const flipCard2 = document.getElementById('page4-flip-tile-component2');
          const flipCard3 = document.getElementById('page4-flip-tile-component3');

          if (!flipCard1 || !flipCard2 || !flipCard3) {
            if (retryCount < 5) {
              // Only log first few retries to avoid spam
              console.warn(`⚠️ [Page 4 Train] Flip cards not found, retrying... (attempt ${retryCount + 1})`);
            }
            setTimeout(() => setupFlipCardWatcher(retryCount + 1), 500);
            return;
          }

          const showEquations2And3 = () => {
            // Show all equation 2 components
            const eq2Components = [
              'page4-length-of-quadrilateral-equation-background',
              'page4-length-of-quadrilateral-text',
              'page4-equals-sign-2',
              'page4-flip-tile-component4',
              'page4-multiply-sign',
              'page4-flip-tile-component5'
            ];

            // Show all equation 3 components
            const eq3Components = [
              'page4-length-of-rope-equation-background-3',
              'page4-equation-3-text'
            ];

            // Show observation text
            const observationText = [
              'page4-animation-observation-text'
            ];

            [...eq2Components, ...eq3Components, ...observationText].forEach(id => {
              const element = document.getElementById(id);
              if (element) {
                // Use appropriate display value based on component type
                if (id.includes('flip-tile')) {
                  element.style.display = 'block'; // Flip tiles use block
                } else if (id.includes('background')) {
                  element.style.display = 'flex'; // Backgrounds use flex
                } else {
                  element.style.display = 'flex'; // Text components use flex
                }
                console.log(`✅ [Page 4] Showing ${id}`);
              } else {
                console.warn(`⚠️ [Page 4] Could not find element ${id}`);
              }
            });
          };

          const observer = new MutationObserver((mutations) => {
            if (checkAllFlipCardsOpened()) {
              console.log('✅ [Page 4 Train] All three flip cards opened!');
              stopAnimationAndHideBars();
              showEquations2And3();

              // Dispatch quiz completed event
              const quizCompletedEvent = new CustomEvent('quizCompleted', {
                detail: {
                  componentId: 'page4-flip-tiles',
                  componentType: 'Page4FlipTiles',
                  pageNumber: 4,
                  allFlipCardsFlipped: true
                }
              });
              window.dispatchEvent(quizCompletedEvent);
              console.log('✅ [Page 4] Dispatched quizCompleted event after all three flip cards are flipped');

              observer.disconnect();
            }
          });

          // Observe all three flip cards
          observer.observe(flipCard1, { attributes: true, attributeFilter: ['data-flipped'] });
          observer.observe(flipCard2, { attributes: true, attributeFilter: ['data-flipped'] });
          observer.observe(flipCard3, { attributes: true, attributeFilter: ['data-flipped'] });

          // Also check immediately in case they're already flipped
          if (checkAllFlipCardsOpened()) {
            stopAnimationAndHideBars();
            showEquations2And3();

            // Dispatch quiz completed event
            const quizCompletedEvent = new CustomEvent('quizCompleted', {
              detail: {
                componentId: 'page4-flip-tiles',
                componentType: 'Page4FlipTiles',
                pageNumber: 4,
                allFlipCardsFlipped: true
              }
            });
            window.dispatchEvent(quizCompletedEvent);
            console.log('✅ [Page 4] Dispatched quizCompleted event after all three flip cards are flipped');

            observer.disconnect();
          }
        };

        // Initially hide equations 2 and 3
        const hideEquations2And3 = () => {
          const eq2Components = [
            'page4-length-of-quadrilateral-equation-background',
            'page4-length-of-quadrilateral-text',
            'page4-equals-sign-2',
            'page4-flip-tile-component4',
            'page4-multiply-sign',
            'page4-flip-tile-component5'
          ];

          const eq3Components = [
            'page4-length-of-rope-equation-background-3',
            'page4-equation-3-text'
          ];

          // Hide observation text
          const observationText = [
            'page4-animation-observation-text'
          ];

          [...eq2Components, ...eq3Components, ...observationText].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
              element.style.display = 'none';
              console.log(`✅ [Page 4] Initially hiding ${id}`);
            }
          });
        };

        // Hide equations 2 and 3 on page load
        setTimeout(() => {
          hideEquations2And3();
          // Retry after a delay to ensure all elements are rendered
          setTimeout(hideEquations2And3, 500);
        }, 100);

        // Start watching for flip card changes
        setTimeout(setupFlipCardWatcher, 1000);

        // Create train element for each rhombus
        Object.keys(rhombusPaths).forEach((rhombusKey, index) => {
          const path = rhombusPaths[rhombusKey];
          const color = rhombusColors[rhombusKey];

          // Create train group (bar)
          const trainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          trainGroup.setAttribute('class', `train-${rhombusKey}`);
          trainGroup.setAttribute('data-rhombus', rhombusKey);

          // Store reference for later control
          trainGroups[rhombusKey] = trainGroup;

          // Create train bar (rectangle)
          // All bars use the same length (2x = 2/25 of outermost rhombus edge)
          const trainBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          trainBar.setAttribute('width', fixedBarLength);
          trainBar.setAttribute('height', barThickness);
          trainBar.setAttribute('fill', color); // Same color as the edge/rhombus
          trainBar.setAttribute('opacity', '1'); // Full opacity for better visibility
          // Use same color for stroke as the edge (not white)
          trainBar.setAttribute('stroke', color);
          trainBar.setAttribute('stroke-width', '1');
          trainBar.setAttribute('stroke-opacity', '1');
          trainBar.setAttribute('class', 'train-bar');
          // Remove glow filter to match edge appearance
          // trainBar.setAttribute('filter', `url(#glow-${rhombusKey})`);
          // Center the rectangle on its position
          trainBar.setAttribute('x', -fixedBarLength / 2);
          trainBar.setAttribute('y', -barThickness / 2);
          trainBar.setAttribute('rx', barThickness / 4); // Slightly rounded corners
          trainBar.setAttribute('ry', barThickness / 4);

          trainGroup.appendChild(trainBar);
          svg.appendChild(trainGroup);

          // Add pulsing animation to the bar
          const pulseAnimation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
          pulseAnimation.setAttribute('attributeName', 'opacity');
          pulseAnimation.setAttribute('values', '0.8;1;0.8');
          pulseAnimation.setAttribute('dur', '2s');
          pulseAnimation.setAttribute('repeatCount', 'indefinite');
          trainBar.appendChild(pulseAnimation);

          // Animation function
          let currentSegment = 0;
          const staggerDelay = 0; // All start at the same time
          let animationFrameIds = [];
          let animationTimeoutIds = [];

          const animateTrain = () => {
            // Stop if animation is stopped
            if (animationStopped) {
              animationFrameIds.forEach(id => cancelAnimationFrame(id));
              animationTimeoutIds.forEach(id => clearTimeout(id));
              animationFrameIds = [];
              animationTimeoutIds = [];
              return;
            }
            const fromPoint = path[currentSegment];
            const toPoint = path[(currentSegment + 1) % (path.length - 1)]; // Don't loop back to start

            const fromCoords = getPointCoords(fromPoint);
            const toCoords = getPointCoords(toPoint);

            if (!fromCoords || !toCoords) {
              console.warn(`⚠️ [Page 4] Could not find coordinates for ${fromPoint} or ${toPoint}`);
              // Try next segment
              currentSegment = (currentSegment + 1) % (path.length - 1);
              if (!animationStopped) {
                const timeoutId = setTimeout(animateTrain, 100);
                animationTimeoutIds.push(timeoutId);
              }
              return;
            }

            // All bars use the same fixed length (1/25 of outermost rhombus edge length)
            // No need to update bar length per segment since it's fixed

            // Calculate angle of the edge for bar orientation
            const dx = toCoords.x - fromCoords.x;
            const dy = toCoords.y - fromCoords.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Calculate edge length and time needed for this edge
            const edgeLength = calculateDistance(fromCoords, toCoords);
            const edgeDuration = edgeLength / speeds[rhombusKey]; // Time in milliseconds for this edge

            // Set initial position and rotation
            trainGroup.setAttribute('transform', `translate(${fromCoords.x}, ${fromCoords.y}) rotate(${angle})`);

            // Animate from fromCoords to toCoords
            const startTime = Date.now();

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const rawProgress = Math.min(elapsed / edgeDuration, 1);

              // Apply easing function for smoother motion (ease-in-out)
              const easeInOut = (t) => {
                return t < 0.5
                  ? 2 * t * t
                  : -1 + (4 - 2 * t) * t;
              };
              const progress = easeInOut(rawProgress);

              // Linear interpolation with easing
              const x = fromCoords.x + (toCoords.x - fromCoords.x) * progress;
              const y = fromCoords.y + (toCoords.y - fromCoords.y) * progress;

              // Update position and rotation (angle stays the same for this segment)
              trainGroup.setAttribute('transform', `translate(${x}, ${y}) rotate(${angle})`);

              if (progress < 1 && !animationStopped) {
                const frameId = requestAnimationFrame(animate);
                animationFrameIds.push(frameId);
              } else if (!animationStopped) {
                // Move to next segment
                currentSegment = (currentSegment + 1) % (path.length - 1);
                // If we've completed the loop, restart from beginning
                if (currentSegment === 0) {
                  const timeoutId = setTimeout(animateTrain, 50); // Small delay before restarting loop
                  animationTimeoutIds.push(timeoutId);
                } else {
                  const timeoutId = setTimeout(animateTrain, 0); // Continue immediately
                  animationTimeoutIds.push(timeoutId);
                }
              }
            };

            if (!animationStopped) {
              const frameId = requestAnimationFrame(animate);
              animationFrameIds.push(frameId);
            }
          };

          // Store animation function for later control
          animationFunctions[rhombusKey] = {
            animateTrain,
            stop: () => {
              animationStopped = true;
              animationFrameIds.forEach(id => cancelAnimationFrame(id));
              animationTimeoutIds.forEach(id => clearTimeout(id));
              animationFrameIds = [];
              animationTimeoutIds = [];
            }
          };

          // Start animation with stagger
          setTimeout(() => {
            if (!animationStopped) {
              console.log(`🚂 [Page 4] Starting train animation for rhombus ${rhombusKey}`);
              animateTrain();
            }
          }, staggerDelay);
        });

        console.log('✅ [Page 4] Train animation initialized for all rhombuses');
      };

      // Function to hide equations 2 and 3 immediately
      const hideEquations2And3Immediate = () => {
        const eq2Components = [
          'page4-length-of-quadrilateral-equation-background',
          'page4-length-of-quadrilateral-text',
          'page4-equals-sign-2',
          'page4-flip-tile-component4',
          'page4-multiply-sign',
          'page4-flip-tile-component5'
        ];

        const eq3Components = [
          'page4-length-of-rope-equation-background-3',
          'page4-equation-3-text'
        ];

        // Hide observation text
        const observationText = [
          'page4-animation-observation-text'
        ];

        [...eq2Components, ...eq3Components, ...observationText].forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            element.style.display = 'none';
            console.log(`✅ [Page 4] Immediately hiding ${id}`);
          }
        });
      };

      // Listen for page changes and initialize when page 4 loads
      const handlePageChange = (event) => {
        const page = event?.detail?.page || (typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null);
        console.log(`📄 [Page 4 Train] Page change detected: ${page}`);
        if (page === 4) {
          // Hide equations immediately when page 4 loads
          hideEquations2And3Immediate();
          // Retry hiding after a short delay
          setTimeout(hideEquations2And3Immediate, 50);
          setTimeout(hideEquations2And3Immediate, 200);
          setTimeout(hideEquations2And3Immediate, 500);

          console.log('📄 [Page 4 Train] Page 4 detected via event, initializing train animation');
          setTimeout(initTrainAnimation, 2000); // Wait 2 seconds for components to render
        }
      };

      // Check if already on page 4 (with multiple retries)
      const checkAndInit = () => {
        if (typeof window !== 'undefined') {
          const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
          console.log(`🔍 [Page 4 Train] Checking current page: ${currentPage}`);
          if (currentPage === 4) {
            // Hide equations immediately when already on page 4
            hideEquations2And3Immediate();
            setTimeout(hideEquations2And3Immediate, 50);
            setTimeout(hideEquations2And3Immediate, 200);
            setTimeout(hideEquations2And3Immediate, 500);

            console.log('📄 [Page 4 Train] Already on page 4, initializing train animation');
            setTimeout(initTrainAnimation, 2000);
            return true;
          }
        }
        return false;
      };

      // Set up event listener
      if (typeof window !== 'undefined') {
        // Hide equations immediately on script load (in case we're already on page 4)
        setTimeout(() => {
          const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
          if (currentPage === 4) {
            hideEquations2And3Immediate();
          }
        }, 0);

        window.addEventListener('pageChanged', handlePageChange);

        // Check immediately
        if (!checkAndInit()) {
          // If not on page 4, check again after a delay (in case page loads after this script)
          setTimeout(() => {
            if (!checkAndInit()) {
              // One more check after components might have loaded
              setTimeout(checkAndInit, 3000);
            }
          }, 1000);
        }
      }

      console.log('✅ [Page 4 Train] Train animation initialization code loaded');
      return true; // Return value for IIFE
    })(),

    5: [

      // Header Text - "Let us find side length A₁A₂ (inner loop)"
      {
        id: 'page5-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.headerText', '<span style="color: #ffffff;">Let us find side length </span><span style="color: #4A90E2;">A<sub>1</sub>A<sub>2</sub></span><span style="color: #ffffff;"> (inner loop)</span>'),
          allowHTML: true,
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White color for the rest of the text
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Question background
      {
        id: 'page5-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [600, 350, 1595, 600], // Covers the question text with padding
        zIndex: 55, // Behind question text but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as equation background
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden by default, will be shown when state is not 'default'
        }
      },

      // Feedback Textbox Component for question
      {
        id: 'page5-question-feedback-textbox',
        name: 'page5-question-feedback-textbox',
        type: 'custom',
        coordinates: [600, 610, 1595, 682], // Positioned right below question background
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page5-question-feedback-textbox',
          text: getI18nText('pages.page5.ratioFeedbackDefault', 'Choose the correct ratio of the sides'), // Default text
          mode: 'normal', // Default mode
          fontSize: '28gc',
          borderRadius: '12gc',
          textAlign: 'center',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box',
        }
      },

      // Third answer background
      {
        id: 'page5-third-answer-background',
        name: 'third-answer-background',
        type: 'custom',
        coordinates: [600, 700, 1595, 800], // Positioned right below question feedback box
        zIndex: 55, // Behind text but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as other backgrounds
          border: '3gc solid #00AA55', // Green 3gc border
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden by default, will be shown when state is 'ratio'
        }
      },

      // Third answer text
      {
        id: 'page5-third-answer-text',
        name: 'third-answer-text',
        type: 'custom',
        coordinates: [600, 700, 1595, 800], // Same as background
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.thirdAnswerText', 'A₁A₂ in Δ A₁OA₂ = 0.5 × $\\sqrt{2}$ = $\\frac{\\sqrt{2}}{2}$ = <span style="color: #F59E0B;">$\\frac{1}{\\sqrt{2}}$</span>'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5',
          fontWeight: 'normal',
          allowHTML: true,
          display: 'none' // Hidden by default, will be shown when state is 'ratio'
        }
      },

      // Given triangle text
      {
        id: 'page5-given-triangle-text',
        name: 'given-triangle-text',
        type: 'custom',
        coordinates: [600, 400, 1595, 450], // Moved up by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.givenTriangleText', 'Given <span style="color: #4A90E2;">Δ</span> <span style="color: #4A90E2;">A<sub>1</sub>OA<sub>2</sub></span> is an isosceles triangle, What is the ratio of the sides (side : side : hypotenuse)?'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          fontWeight: 'normal',
          display: 'none' // Hidden by default, will be shown when state is not 'default'
        }
      },

      // Ratio Button 1: 1 : 2 : 3 (incorrect)
      {
        id: 'page5-ratio-button-1',
        name: 'ratio-button-1',
        type: 'button',
        coordinates: [625, 495, 825, 575], // Moved right by 25gc
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: getI18nText('pages.page5.ratioButton1', '1 : 2 : 3'),
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 1 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-ratio-button-1"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page5QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.ratioFeedbackIncorrect1', 'Incorrect! The ratio 1 : 2 : 3 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Ratio Button 2: 1 : 1 : √2 (correct)
      {
        id: 'page5-ratio-button-2',
        name: 'ratio-button-2',
        type: 'button',
        coordinates: [877, 495, 1077, 575], // Evenly distributed between button 1 and 4
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: getI18nText('pages.page5.ratioButton2', '1 : 1 : $\\sqrt{2}$'),
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 2 clicked (correct)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-ratio-button-2"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#00AA55'; // Green color for correct answer
              container.style.pointerEvents = 'none';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }

            // Disable all other ratio buttons
            const buttons = ['page5-ratio-button-1', 'page5-ratio-button-3', 'page5-ratio-button-4'];
            buttons.forEach(btnId => {
              const btn = document.querySelector(`[data-button-id="${btnId}"]`);
              if (btn) {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                btn.setAttribute('data-disabled', 'true');
              }
            });

            window.dispatchEvent(new CustomEvent('page5QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.ratioFeedbackCorrect', 'Δ A₁OA₂, the ratio of sides OA₁ : OA₂ : A₁A₂ is 1 : 1 : $\\sqrt{2}$.'),
                mode: 'correct-2'
              }
            }));

            // Change state to 'ratio' when correct answer is selected
            if (typeof window !== 'undefined' && window.setPage5State) {
              window.setPage5State('ratio');
              console.log('✅ [Page 5] State changed to ratio after correct ratio answer');

              // Dispatch quizCompleted event for quiz detection
              const quizCompletedEvent = new CustomEvent('quizCompleted', {
                detail: {
                  componentId: 'page5-triangle-ratio-quiz',
                  componentType: 'Page5TriangleRatioQuiz',
                  pageNumber: 5,
                  allQuestionsAnswered: true
                }
              });
              window.dispatchEvent(quizCompletedEvent);
              console.log('✅ [Page 5] Dispatched quizCompleted event after both questions answered correctly');
            }
          }
        }
      },

      // Ratio Button 3: 1 : √3 : 2 (incorrect)
      {
        id: 'page5-ratio-button-3',
        name: 'ratio-button-3',
        type: 'button',
        coordinates: [1129, 495, 1329, 575], // Evenly distributed between button 1 and 4
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : $\\sqrt{3}$ : 2',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 3 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-ratio-button-3"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page5QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.ratioFeedbackIncorrect2', 'Incorrect! The ratio 1 : $\\sqrt{3}$ : 2 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Ratio Button 4: 1 : √2 : 1 (incorrect)
      {
        id: 'page5-ratio-button-4',
        name: 'ratio-button-4',
        type: 'button',
        coordinates: [1380, 495, 1580, 575], // Moved left by 30gc
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : $\\sqrt{2}$ : 1',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 4 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-ratio-button-4"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page5QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.ratioFeedbackIncorrect3', 'Incorrect! The ratio 1 : $\\sqrt{2}$ : 1 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Triangle A1OA2 question text
      {
        id: 'page5-triangle-question-text',
        name: 'triangle-question-text',
        type: 'custom',
        coordinates: [625, 105, 850, 275], // Middle aligned with equation background (center at y=190)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.triangleQuestionText', '<span style="color: #4A90E2;">Δ</span> <span style="color: #4A90E2;">A<sub>1</sub>OA<sub>2</sub></span> is :'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          fontWeight: 'normal'
        }
      },

      // Button: Scalene triangle (incorrect)
      {
        id: 'page5-triangle-button-scalene',
        name: 'triangle-button-scalene',
        type: 'button',
        coordinates: [870, 150, 1070, 230], // Middle aligned with equation background (center at y=190), moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page5.triangleButtonScalene', 'a\nscalene Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Scalene triangle button clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            // The event.currentTarget should be the container div since onClick is attached to it
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-triangle-button-scalene"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61'; // Salmon color
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5'; // Grayed out
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
              console.log('✅ Scalene button disabled and colored');
            } else {
              console.warn('⚠️ Could not find scalene button container');
            }
            // Update feedback box
            const feedbackEvent = new CustomEvent('page5FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.triangleTypeFeedbackIncorrect', 'Incorrect! Check the side lengths.'),
                mode: 'incorrect'
              }
            });
            window.dispatchEvent(feedbackEvent);
          }
        }
      },

      // Button: Isosceles triangle (correct)
      {
        id: 'page5-triangle-button-isosceles',
        name: 'triangle-button-isosceles',
        type: 'button',
        coordinates: [1118, 150, 1318, 230], // Middle aligned with equation background (center at y=190), equidistant from first and third buttons, moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page5.triangleButtonIsosceles', 'an\nisosceles Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Isosceles triangle button clicked (correct)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            // The event.currentTarget should be the container div
            const isoscelesContainer = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-triangle-button-isosceles"]');

            // Find all three button containers
            const scaleneContainer = document.querySelector('[data-button-id="page5-triangle-button-scalene"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container[data-button-id="page5-triangle-button-scalene"]') : null);

            const equilateralContainer = document.querySelector('[data-button-id="page5-triangle-button-equilateral"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container[data-button-id="page5-triangle-button-equilateral"]') : null);

            // Update isosceles button (correct)
            if (isoscelesContainer) {
              isoscelesContainer.style.backgroundColor = '#00AA55'; // Green color for correct answer
              isoscelesContainer.style.pointerEvents = 'none';
              isoscelesContainer.style.cursor = 'not-allowed';
              isoscelesContainer.setAttribute('data-disabled', 'true');
              console.log('✅ Isosceles button disabled and colored green');
            } else {
              console.warn('⚠️ Could not find isosceles button container');
            }

            // Disable all other buttons
            if (scaleneContainer) {
              scaleneContainer.style.pointerEvents = 'none';
              scaleneContainer.style.opacity = '0.5';
              scaleneContainer.style.cursor = 'not-allowed';
              scaleneContainer.setAttribute('data-disabled', 'true');
            }

            if (equilateralContainer) {
              equilateralContainer.style.pointerEvents = 'none';
              equilateralContainer.style.opacity = '0.5';
              equilateralContainer.style.cursor = 'not-allowed';
              equilateralContainer.setAttribute('data-disabled', 'true');
            }

            // Update feedback box
            const feedbackEvent = new CustomEvent('page5FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.triangleTypeFeedbackCorrect', 'OA₁ = OA₂ making Δ an isosceles Δ'),
                mode: 'correct-2'
              }
            });
            window.dispatchEvent(feedbackEvent);

            // Change state to 'triangleType' when correct answer is selected
            if (typeof window !== 'undefined' && window.setPage5State) {
              window.setPage5State('triangleType');
              console.log('✅ [Page 5] State changed to triangleType after correct triangle type answer');
            }
          }
        }
      },

      // Button: Equilateral triangle (incorrect)
      {
        id: 'page5-triangle-button-equilateral',
        name: 'triangle-button-equilateral',
        type: 'button',
        coordinates: [1365, 150, 1565, 230], // Middle aligned with equation background (center at y=190), moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page5.triangleButtonEquilateral', 'an\nequilateral Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Equilateral triangle button clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            // The event.currentTarget should be the container div since onClick is attached to it
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page5-triangle-button-equilateral"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61'; // Salmon color
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5'; // Grayed out
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
              console.log('✅ Equilateral button disabled and colored');
            } else {
              console.warn('⚠️ Could not find equilateral button container');
            }
            // Update feedback box
            const feedbackEvent = new CustomEvent('page5FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page5.triangleTypeFeedbackIncorrect', 'Incorrect! Check the side lengths.'),
                mode: 'incorrect'
              }
            });
            window.dispatchEvent(feedbackEvent);
          }
        }
      },

      // Background for Length of Rope equation
      {
        id: 'page5-length-of-rope-equation-background',
        name: 'length-of-rope-equation-background',
        type: 'custom',
        coordinates: [600, 133, 1595, 248], // Height increased by 15% (100gc * 1.15 = 115gc), centered at y=190
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Feedback Textbox Component
      {
        id: 'page5-feedback-textbox',
        name: 'page5-feedback-textbox',
        type: 'custom',
        coordinates: [600, 258, 1595, 330], // Positioned right below equation background
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page5-feedback-textbox',
          text: getI18nText('pages.page5.triangleTypeFeedbackDefault', 'Choose the correct type of triangle'), // Default text
          mode: 'normal', // normal mode to show the default text
          fontSize: '28gc',
          borderRadius: '12gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box'
        }
      },


      // Geometry Grid (same as page2-geometry-grid-1 with notches at 0.5 positions)
      {
        id: "page5-geometry-grid-1",
        name: "page5-geometry-grid-1",
        type: "custom",
        coordinates: [25, 190, 575, 710], // Same coordinates as page2-geometry-grid-1
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: 'O', // Add label like A1, A2, etc.
              labelOffset: { x: '-25gc', y: '25gc' }, // Vertical label offset (same as other points)
              labelSize: '24gc', // Same font size as other labels
              labelColor: '#FFFFFF', // White color
              size: '0gc',
              color: 'transparent',
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            // Points to exclude: B3, B4, A3, A4 (C3 and C4 are kept)
            const excludedPoints = ['B3', 'B4', 'A3', 'A4'];

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;

                // Skip excluded points
                if (excludedPoints.includes(pointId)) {
                  return;
                }

                // Label offsets based on position (top, right, bottom, left)
                // Vertical labels (top/bottom): -25, 0
                // Horizontal labels (left/right): 0, 25
                const labelOffsets = [
                  { x: '-25gc', y: '0gc' },  // Top vertex (vertical)
                  { x: '0gc', y: '25gc' },   // Right vertex (horizontal)
                  { x: '-25gc', y: '0gc' },   // Bottom vertex (vertical)
                  { x: '0gc', y: '25gc' }   // Left vertex (horizontal)
                ];
                // Set label color to match rhombus color
                const labelColor = rhombusColor; // Match rhombus color (blue for A, orange for B, red for C)

                // Make A1 and A2 labels blink
                const labelBlink = (pointId === 'A1' || pointId === 'A2') ? true : false;

                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: (pointId === 'C3' || pointId === 'C4') ? null : pointId, // Add label for all points except C3 and C4
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '24gc',
                  labelColor: labelColor, // Match rhombus color (blue for A, orange for B, red for C)
                  labelBlink: labelBlink, // Blink A1 and A2 labels
                  size: '8gc', // Visible size for the dot
                  color: '#FFFFFF', // White color for visibility
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                // Only create connections between non-excluded points
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;

                // Exclude specific connections for C rhombus: C1-C4, C2-C3, and C3-C4
                const excludedConnections = ['C1-C4', 'C4-C1', 'C2-C3', 'C3-C2', 'C3-C4', 'C4-C3'];
                const connectionId = `${pointId}-${nextPointId}`;
                const reverseConnectionId = `${nextPointId}-${pointId}`;

                // Only create connection if both points are not excluded and connection is not in excluded list
                if (!excludedPoints.includes(nextPointId) &&
                  !excludedConnections.includes(connectionId) &&
                  !excludedConnections.includes(reverseConnectionId)) {
                  // Set opacity for B1B2 and C1C2 connections to 25%
                  const connectionOpacity = (connectionId === 'B1-B2' || connectionId === 'B2-B1' ||
                    connectionId === 'C1-C2' || connectionId === 'C2-C1') ? 0.25 : 1;

                  allConnections.push({
                    id: connectionId,
                    from: pointId,
                    to: nextPointId,
                    color: rhombusColor,
                    thickness: '4gc',
                    style: 'solid',
                    opacity: connectionOpacity, // 25% opacity for B1B2 and C1C2
                    clickable: false
                  });
                }
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Only add connections that don't involve excluded points

            // Right side: C2-B2, B2-A2 (keep these)
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1 (keep these)
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (only A1, A2)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 5] Added connections for notches:', [
              'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1',
              'O-A1', 'O-A2'
            ]);
            console.log('✅ [Page 5] Total connections:', allConnections.length);
            console.log('✅ [Page 5] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // No notches (tick marks) for page 5
          sideSymbols: (() => {
            const symbols = [];
            console.log('✅ [Page 5] sideSymbols configured (no notches):', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },

      // "0.5" label for OA1 connection
      {
        id: 'page5-label-oa1',
        name: 'label-oa1',
        type: 'custom',
        coordinates: [240, 400, 280, 430], // Positioned to the left of OA1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for A1B1 connection
      {
        id: 'page5-label-a1b1',
        name: 'label-a1b1',
        type: 'custom',
        coordinates: [240, 320, 280, 350], // Positioned to the left of A1B1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for B1C1 connection
      {
        id: 'page5-label-b1c1',
        name: 'label-b1c1',
        type: 'custom',
        coordinates: [240, 240, 280, 270], // Positioned to the left of B1C1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for OA2 connection
      {
        id: 'page5-label-oa2',
        name: 'label-oa2',
        type: 'custom',
        coordinates: [310, 470, 350, 500], // Positioned below OA2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for A2B2 connection
      {
        id: 'page5-label-a2b2',
        name: 'label-a2b2',
        type: 'custom',
        coordinates: [400, 470, 440, 500], // Positioned below A2B2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for B2C2 connection
      {
        id: 'page5-label-b2c2',
        name: 'label-b2c2',
        type: 'custom',
        coordinates: [490, 470, 510, 500], // Positioned below B2C2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
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
          text: getI18nText(
            'pages.page5.instruction',
            'Answer the questions correctly to move forward'
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

      // Tap Animation GIF
      {
        id: 'page5-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 5 }, // Only show for page 5 quiz completion
          opacity: 0.65 // 40% opacity
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page5-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page5-next-button');
            return getNextButtonText(pageNumber);
          },
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for page 5 quiz completion
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page5-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page5-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

    _page5TriangleAndLabelsInit: (() => {
      // Initialize triangle fill, label blinking, and equation hiding for page 5
      const initPage5TriangleAndLabels = () => {
        const gridElement = document.getElementById('page5-geometry-grid-1');
        if (!gridElement) {
          setTimeout(initPage5TriangleAndLabels, 500);
          return;
        }

        const svgs = gridElement.querySelectorAll('svg');
        if (!svgs || svgs.length === 0) {
          setTimeout(initPage5TriangleAndLabels, 500);
          return;
        }

        // Find the SVG that contains connections
        let svg = null;
        for (let i = svgs.length - 1; i >= 0; i--) {
          const lines = svgs[i].querySelectorAll('line');
          if (lines.length > 0) {
            svg = svgs[i];
            break;
          }
        }

        if (!svg) {
          setTimeout(initPage5TriangleAndLabels, 500);
          return;
        }

        // Initialize triangle fill
        if (!svg.querySelector('#page5-triangle-oa1a2')) {
          const centerRow = 5;
          const centerCol = 5;
          const spacing = 1.5;

          const oX = (centerCol / 10) * 100;
          const oY = (centerRow / 10) * 100;
          const a1X = (centerCol / 10) * 100;
          const a1Y = ((centerRow - spacing) / 10) * 100;
          const a2X = ((centerCol + spacing) / 10) * 100;
          const a2Y = (centerRow / 10) * 100;

          const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          triangle.setAttribute('points', `${oX},${oY} ${a1X},${a1Y} ${a2X},${a2Y}`);
          triangle.setAttribute('fill', '#4A90E2');
          triangle.setAttribute('fill-opacity', '0.35');
          triangle.setAttribute('stroke', 'none');
          triangle.setAttribute('style', 'animation: blink-fast 0.3s infinite alternate; pointer-events: none;');
          triangle.setAttribute('id', 'page5-triangle-oa1a2');

          if (svg.firstChild) {
            svg.insertBefore(triangle, svg.firstChild);
          } else {
            svg.appendChild(triangle);
          }

          console.log(`✅ [Page 5] Added blinking triangle fill for OA1A2`);
        }

        // Make A1 and A2 labels blink
        svgs.forEach(svgEl => {
          const texts = svgEl.querySelectorAll('text');
          texts.forEach(text => {
            const textContent = text.textContent?.trim() || '';
            if (textContent === 'A1' || textContent === 'A2') {
              const currentStyle = text.getAttribute('style') || '';
              if (!currentStyle.includes('blink-fast')) {
                text.setAttribute('style', currentStyle + ' animation: blink-fast 0.3s infinite alternate;');
                console.log(`✅ [Page 5] Made ${textContent} label blink`);
              }
            }
          });
        });

        // Set opacity for B1B2 and C1C2 connections
        svgs.forEach(svgEl => {
          const lines = svgEl.querySelectorAll('line');
          lines.forEach(line => {
            const lineId = line.getAttribute('id') || '';
            const lineKey = line.getAttribute('key') || '';
            // Check both id and key attributes for connection identifiers
            if (lineId.includes('B1-B2') || lineId.includes('B2-B1') ||
              lineId.includes('C1-C2') || lineId.includes('C2-C1') ||
              lineKey.includes('B1-B2') || lineKey.includes('B2-B1') ||
              lineKey.includes('C1-C2') || lineKey.includes('C2-C1')) {
              line.setAttribute('stroke-opacity', '0.25');
              console.log(`✅ [Page 5] Set opacity to 25% for connection (id: ${lineId}, key: ${lineKey})`);
            }
          });
        });
      };


      // Initialize triangle and labels on page load
      const checkAndInitTriangle = () => {
        const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage === 5) {
          initPage5TriangleAndLabels();
          return true;
        }
        return false;
      };

      const handlePageChangeTriangle = (event) => {
        const page = event?.detail?.page;
        if (page === 5) {
          setTimeout(() => initPage5TriangleAndLabels(), 500);
          // Update visibility when page changes to 5
          setTimeout(() => updatePage5ElementVisibility(), 100);
        }
      };

      // Function to update visibility of elements based on page5State
      const updatePage5ElementVisibility = () => {
        // Only run if we're actually on page 5
        const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage !== 5) {
          return; // Don't run if not on page 5
        }

        const currentState = window.getPage5State ? window.getPage5State() : 'default';

        // Elements that should be hidden when state is 'default'
        const defaultHiddenElements = [
          'page5-question-feedback-textbox',
          'page5-question-background',
          'page5-given-triangle-text',
          'page5-ratio-button-1',
          'page5-ratio-button-2',
          'page5-ratio-button-3',
          'page5-ratio-button-4'
        ];

        // Elements that should be visible only when state is 'ratio'
        const ratioOnlyElements = [
          'page5-third-answer-text',
          'page5-third-answer-background'
        ];

        // Update default-hidden elements (visible when state is NOT 'default')
        defaultHiddenElements.forEach(elementId => {
          let element = document.getElementById(elementId);

          // For buttons, try to find by data-button-id if element not found by ID
          if (!element && elementId.includes('ratio-button')) {
            element = document.querySelector(`[data-button-id="${elementId}"]`);
          }

          // For feedback textbox, try to find by data-element-id or ID
          if (!element && elementId.includes('feedback-textbox')) {
            // Try finding by data-element-id attribute (set by component)
            element = document.querySelector(`[data-element-id="${elementId}"]`);
            // If still not found, try by ID again (in case component used props.id)
            if (!element) {
              element = document.getElementById(elementId);
            }
          }

          if (element) {
            const shouldShow = currentState !== 'default';
            // Determine display value based on element type
            // TeacherNoteComponent and FeedbackTextboxComponent use 'flex'
            // Buttons also use 'flex'
            let displayValue = 'block';
            if (elementId.includes('button')) {
              displayValue = 'flex';
            } else if (elementId.includes('feedback-textbox')) {
              displayValue = 'flex'; // Feedback textbox uses flex
            } else if (element.classList.contains('teacher-note-text-box')) {
              displayValue = 'flex'; // TeacherNoteComponent uses flex
            }
            element.style.display = shouldShow ? displayValue : 'none';

            // For buttons, ensure the content div is also visible and has proper display
            if (elementId.includes('button') && shouldShow) {
              const contentDiv = element.querySelector('.applet-button-content');
              if (contentDiv) {
                contentDiv.style.display = 'flex';
                // Force a re-render by triggering a style recalculation
                void contentDiv.offsetHeight;
              }
            }

            console.log(`✅ [Page 5] ${shouldShow ? 'Showing' : 'Hiding'} ${elementId} (state: ${currentState})`);
          }
          // Silently skip if element not found (might not be rendered yet)
        });

        // Update ratio-only elements (visible only when state is 'ratio')
        ratioOnlyElements.forEach(elementId => {
          const element = document.getElementById(elementId);
          if (element) {
            const shouldShow = currentState === 'ratio';
            element.style.display = shouldShow ? 'block' : 'none';
            console.log(`✅ [Page 5] ${shouldShow ? 'Showing' : 'Hiding'} ${elementId} (state: ${currentState})`);
          }
          // Silently skip if element not found (might not be rendered yet)
        });
      };

      // Listen for page5StateChanged events
      const handlePage5StateChange = (event) => {
        console.log('🔍 [Page 5] State changed, updating element visibility');
        // Use setTimeout to ensure DOM is ready
        setTimeout(updatePage5ElementVisibility, 50);
      };

      // Set up event listeners
      if (typeof window !== 'undefined') {
        window.addEventListener('pageChanged', handlePageChangeTriangle);
        window.addEventListener('page5StateChanged', handlePage5StateChange);

        // Check immediately
        if (!checkAndInitTriangle()) {
          setTimeout(() => {
            if (!checkAndInitTriangle()) {
              setTimeout(checkAndInitTriangle, 2000);
            }
          }, 1000);
        }

        // Set initial visibility after a short delay to ensure elements are rendered
        setTimeout(() => {
          updatePage5ElementVisibility();
        }, 500);
      }

      console.log('✅ [Page 5] Triangle and labels initialization code loaded');
      return true; // Return value for IIFE
    })(),

    6: [

      // Header Text - "Let us find side length B₁B₂ (inner loop)"
      {
        id: 'page6-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.headerText', '<span style="color: #ffffff;">Let us find side length </span><span style="color: #F5A623;">B<sub>1</sub>B<sub>2</sub></span><span style="color: #ffffff;"> (middle loop)</span>'),
          allowHTML: true,
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White color for the rest of the text
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Question background
      {
        id: 'page6-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [600, 350, 1595, 600], // Covers the question text with padding
        zIndex: 55, // Behind question text but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as equation background
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden by default, will be shown when state is not 'default'
        }
      },

      // Feedback Textbox Component for question
      {
        id: 'page6-question-feedback-textbox',
        name: 'page6-question-feedback-textbox',
        type: 'custom',
        coordinates: [600, 610, 1595, 682], // Positioned right below question background
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page6-question-feedback-textbox',
          text: getI18nText('pages.page5.ratioFeedbackDefault', 'Choose the correct ratio of the sides'), // Default text
          mode: 'normal', // Default mode
          fontSize: '28gc',
          borderRadius: '12gc',
          textAlign: 'center',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box',
        }
      },

      // Third answer background
      {
        id: 'page6-third-answer-background',
        name: 'third-answer-background',
        type: 'custom',
        coordinates: [600, 700, 1595, 800], // Positioned right below question feedback box
        zIndex: 55, // Behind text but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as other backgrounds
          border: '3gc solid #00AA55', // Green 3gc border
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden by default, will be shown when state is 'ratio'
        }
      },

      // Third answer text
      {
        id: 'page6-third-answer-text',
        name: 'third-answer-text',
        type: 'custom',
        coordinates: [600, 700, 1595, 800], // Same as background
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.thirdAnswerText', 'B₁B₂ in Δ B₁OB₂ = 1 × $\\sqrt{2}$ = $\\sqrt{2}$'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5',
          fontWeight: 'normal',
          allowHTML: true,
          display: 'none' // Hidden by default, will be shown when state is 'ratio'
        }
      },

      // Given triangle text
      {
        id: 'page6-given-triangle-text',
        name: 'given-triangle-text',
        type: 'custom',
        coordinates: [600, 400, 1595, 450], // Moved up by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.givenTriangleText', 'Given <span style="color: #F5A623;">Δ</span> <span style="color: #F5A623;">B<sub>1</sub>OB<sub>2</sub></span> is an isosceles triangle, What is the ratio of the sides (side : side : hypotenuse)?'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          fontWeight: 'normal',
          display: 'none' // Hidden by default, will be shown when state is not 'default'
        }
      },

      // Ratio Button 1: 1 : 2 : 3 (incorrect)
      {
        id: 'page6-ratio-button-1',
        name: 'ratio-button-1',
        type: 'button',
        coordinates: [625, 495, 825, 575], // Moved right by 25gc
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: getI18nText('pages.page6.ratioButton1', '1 : 2 : 3'),
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 1 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-ratio-button-1"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page6QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.ratioFeedbackIncorrect1', 'Incorrect! The ratio 1 : 2 : 3 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Ratio Button 2: 1 : 1 : √2 (correct)
      {
        id: 'page6-ratio-button-2',
        name: 'ratio-button-2',
        type: 'button',
        coordinates: [877, 495, 1077, 575], // Evenly distributed between button 1 and 4
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : 1 : $\\sqrt{2}$',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 2 clicked (correct)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-ratio-button-2"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#00AA55'; // Green color for correct answer
              container.style.pointerEvents = 'none';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }

            // Disable all other ratio buttons
            const buttons = ['page6-ratio-button-1', 'page6-ratio-button-3', 'page6-ratio-button-4'];
            buttons.forEach(btnId => {
              const btn = document.querySelector(`[data-button-id="${btnId}"]`);
              if (btn) {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                btn.setAttribute('data-disabled', 'true');
              }
            });

            window.dispatchEvent(new CustomEvent('page6QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.ratioFeedbackCorrect', 'Δ B₁OB₂, the ratio of sides OB₁ : OB₂ : B₁B₂ is 1 : 1 : $\\sqrt{2}$.'),
                mode: 'correct-2'
              }
            }));

            // Change state to 'ratio' when correct answer is selected
            if (typeof window !== 'undefined' && window.setPage6State) {
              window.setPage6State('ratio');
              console.log('✅ [Page 6] State changed to ratio after correct ratio answer');

              // Dispatch quizCompleted event for quiz detection
              const quizCompletedEvent = new CustomEvent('quizCompleted', {
                detail: {
                  componentId: 'page6-triangle-ratio-quiz',
                  componentType: 'Page6TriangleRatioQuiz',
                  pageNumber: 6,
                  allQuestionsAnswered: true
                }
              });
              window.dispatchEvent(quizCompletedEvent);
              console.log('✅ [Page 6] Dispatched quizCompleted event after both questions answered correctly');
            }
          }
        }
      },

      // Ratio Button 3: 1 : √3 : 2 (incorrect)
      {
        id: 'page6-ratio-button-3',
        name: 'ratio-button-3',
        type: 'button',
        coordinates: [1129, 495, 1329, 575], // Evenly distributed between button 1 and 4
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : $\\sqrt{3}$ : 2',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 3 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-ratio-button-3"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page6QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.ratioFeedbackIncorrect2', 'Incorrect! The ratio 1 : $\\sqrt{3}$ : 2 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Ratio Button 4: 1 : √2 : 1 (incorrect)
      {
        id: 'page6-ratio-button-4',
        name: 'ratio-button-4',
        type: 'button',
        coordinates: [1380, 495, 1580, 575], // Moved left by 30gc
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : $\\sqrt{2}$ : 1',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 4 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-ratio-button-4"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page6QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.ratioFeedbackIncorrect3', 'Incorrect! The ratio 1 : $\\sqrt{2}$ : 1 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Triangle B1OB2 question text
      {
        id: 'page6-triangle-question-text',
        name: 'triangle-question-text',
        type: 'custom',
        coordinates: [625, 105, 850, 275], // Middle aligned with equation background (center at y=190)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.triangleQuestionText', '<span style="color: #F5A623;">Δ</span> <span style="color: #F5A623;">B<sub>1</sub>OB<sub>2</sub></span> is :'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          fontWeight: 'normal'
        }
      },

      // Button: Scalene triangle (incorrect)
      {
        id: 'page6-triangle-button-scalene',
        name: 'triangle-button-scalene',
        type: 'button',
        coordinates: [870, 150, 1070, 230], // Middle aligned with equation background (center at y=190), moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page6.triangleButtonScalene', 'a\nscalene Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Scalene triangle button clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            // The event.currentTarget should be the container div since onClick is attached to it
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-triangle-button-scalene"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              // Set backgroundColor on container with !important to override any existing styles
              container.style.setProperty('background-color', '#FF6B61', 'important'); // Salmon color
              // Also set on frame if it exists
              const frame = container.querySelector('.applet-button-frame');
              if (frame) {
                frame.style.setProperty('background-color', '#FF6B61', 'important');
              }
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5'; // Grayed out
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
              console.log('✅ Scalene button disabled and colored');
            } else {
              console.warn('⚠️ Could not find scalene button container');
            }
            // Update feedback box
            const feedbackEvent = new CustomEvent('page6FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.triangleTypeFeedbackIncorrect', 'Incorrect! Check the side lengths.'),
                mode: 'incorrect'
              }
            });
            window.dispatchEvent(feedbackEvent);
          }
        }
      },

      // Button: Isosceles triangle (correct)
      {
        id: 'page6-triangle-button-isosceles',
        name: 'triangle-button-isosceles',
        type: 'button',
        coordinates: [1118, 150, 1318, 230], // Middle aligned with equation background (center at y=190), equidistant from first and third buttons, moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page6.triangleButtonIsosceles', 'an\nisosceles Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Isosceles triangle button clicked (correct)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            // The event.currentTarget should be the container div
            const isoscelesContainer = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-triangle-button-isosceles"]');

            // Find all three button containers
            const scaleneContainer = document.querySelector('[data-button-id="page6-triangle-button-scalene"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container[data-button-id="page6-triangle-button-scalene"]') : null);

            const equilateralContainer = document.querySelector('[data-button-id="page6-triangle-button-equilateral"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container[data-button-id="page6-triangle-button-equilateral"]') : null);

            // Update isosceles button (correct)
            if (isoscelesContainer) {
              // Set backgroundColor on container with !important to override any existing styles
              isoscelesContainer.style.setProperty('background-color', '#00AA55', 'important'); // Green color for correct answer
              // Also set on frame if it exists
              const frame = isoscelesContainer.querySelector('.applet-button-frame');
              if (frame) {
                frame.style.setProperty('background-color', '#00AA55', 'important');
              }
              isoscelesContainer.style.pointerEvents = 'none';
              isoscelesContainer.style.cursor = 'not-allowed';
              isoscelesContainer.setAttribute('data-disabled', 'true');
              console.log('✅ Isosceles button disabled and colored green');
            } else {
              console.warn('⚠️ Could not find isosceles button container');
            }

            // Disable all other buttons
            if (scaleneContainer) {
              scaleneContainer.style.pointerEvents = 'none';
              scaleneContainer.style.opacity = '0.5';
              scaleneContainer.style.cursor = 'not-allowed';
              scaleneContainer.setAttribute('data-disabled', 'true');
            }

            if (equilateralContainer) {
              equilateralContainer.style.pointerEvents = 'none';
              equilateralContainer.style.opacity = '0.5';
              equilateralContainer.style.cursor = 'not-allowed';
              equilateralContainer.setAttribute('data-disabled', 'true');
            }

            // Update feedback box
            const feedbackEvent = new CustomEvent('page6FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.triangleTypeFeedbackCorrect', 'OB₁ = OB₂ making Δ an isosceles Δ'),
                mode: 'correct-2'
              }
            });
            window.dispatchEvent(feedbackEvent);

            // Change state to 'triangleType' when correct answer is selected
            if (typeof window !== 'undefined' && window.setPage6State) {
              window.setPage6State('triangleType');
              console.log('✅ [Page 6] State changed to triangleType after correct triangle type answer');
            }
          }
        }
      },

      // Button: Equilateral triangle (incorrect)
      {
        id: 'page6-triangle-button-equilateral',
        name: 'triangle-button-equilateral',
        type: 'button',
        coordinates: [1365, 150, 1565, 230], // Middle aligned with equation background (center at y=190), moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page6.triangleButtonEquilateral', 'an\nequilateral Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Equilateral triangle button clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            // The event.currentTarget should be the container div since onClick is attached to it
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page6-triangle-button-equilateral"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              // Set backgroundColor on container with !important to override any existing styles
              container.style.setProperty('background-color', '#FF6B61', 'important'); // Salmon color
              // Also set on frame if it exists
              const frame = container.querySelector('.applet-button-frame');
              if (frame) {
                frame.style.setProperty('background-color', '#FF6B61', 'important');
              }
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5'; // Grayed out
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
              console.log('✅ Equilateral button disabled and colored');
            } else {
              console.warn('⚠️ Could not find equilateral button container');
            }
            // Update feedback box
            const feedbackEvent = new CustomEvent('page6FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page6.triangleTypeFeedbackIncorrect', 'Incorrect! Check the side lengths.'),
                mode: 'incorrect'
              }
            });
            window.dispatchEvent(feedbackEvent);
          }
        }
      },

      // Background for Length of Rope equation
      {
        id: 'page6-length-of-rope-equation-background',
        name: 'length-of-rope-equation-background',
        type: 'custom',
        coordinates: [600, 133, 1595, 248], // Height increased by 15% (100gc * 1.15 = 115gc), centered at y=190
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Feedback Textbox Component
      {
        id: 'page6-feedback-textbox',
        name: 'page6-feedback-textbox',
        type: 'custom',
        coordinates: [600, 258, 1595, 330], // Positioned right below equation background
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page6-feedback-textbox',
          text: getI18nText('pages.page5.triangleTypeFeedbackDefault', 'Choose the correct type of triangle'), // Default text
          mode: 'normal', // normal mode to show the default text
          fontSize: '28gc',
          borderRadius: '12gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box'
        }
      },


      // Geometry Grid (same as page2-geometry-grid-1 with notches at 0.5 positions)
      {
        id: "page6-geometry-grid-1",
        name: "page6-geometry-grid-1",
        type: "custom",
        coordinates: [25, 190, 575, 710], // Same coordinates as page2-geometry-grid-1
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: 'O', // Add label like A1, A2, etc.
              labelOffset: { x: '-25gc', y: '25gc' }, // Vertical label offset (same as other points)
              labelSize: '24gc', // Same font size as other labels
              labelColor: '#FFFFFF', // White color
              size: '0gc',
              color: 'transparent',
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            // Points to exclude: B3, B4, A3, A4 (C3 and C4 are kept)
            const excludedPoints = ['B3', 'B4', 'A3', 'A4'];

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;

                // Skip excluded points
                if (excludedPoints.includes(pointId)) {
                  return;
                }

                // Label offsets based on position (top, right, bottom, left)
                // Vertical labels (top/bottom): -25, 0
                // Horizontal labels (left/right): 0, 25
                const labelOffsets = [
                  { x: '-25gc', y: '0gc' },  // Top vertex (vertical)
                  { x: '0gc', y: '25gc' },   // Right vertex (horizontal)
                  { x: '-25gc', y: '0gc' },   // Bottom vertex (vertical)
                  { x: '0gc', y: '25gc' }   // Left vertex (horizontal)
                ];
                // Set label color to match rhombus color
                const labelColor = rhombusColor; // Match rhombus color (blue for A, orange for B, red for C)

                // Make B1 and B2 labels blink (A1 and A2 labels are removed)
                const labelBlink = (pointId === 'B1' || pointId === 'B2') ? true : false;

                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: (pointId === 'C3' || pointId === 'C4' || pointId === 'A1' || pointId === 'A2') ? null : pointId, // Add label for all points except C3, C4, A1, and A2
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '24gc',
                  labelColor: labelColor, // Match rhombus color (blue for A, orange for B, red for C)
                  labelBlink: labelBlink, // Blink B1 and B2 labels
                  size: '8gc', // Visible size for the dot
                  color: '#FFFFFF', // White color for visibility
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                // Only create connections between non-excluded points
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;

                // Exclude specific connections for C rhombus: C1-C4, C2-C3, and C3-C4
                // Also exclude A1-A2 connection
                const excludedConnections = ['C1-C4', 'C4-C1', 'C2-C3', 'C3-C2', 'C3-C4', 'C4-C3', 'A1-A2', 'A2-A1'];
                const connectionId = `${pointId}-${nextPointId}`;
                const reverseConnectionId = `${nextPointId}-${pointId}`;

                // Only create connection if both points are not excluded and connection is not in excluded list
                if (!excludedPoints.includes(nextPointId) &&
                  !excludedConnections.includes(connectionId) &&
                  !excludedConnections.includes(reverseConnectionId)) {
                  // Set opacity for B1B2 and C1C2 connections to 25%
                  const connectionOpacity = (connectionId === 'B1-B2' || connectionId === 'B2-B1' ||
                    connectionId === 'C1-C2' || connectionId === 'C2-C1') ? 0.25 : 1;

                  allConnections.push({
                    id: connectionId,
                    from: pointId,
                    to: nextPointId,
                    color: rhombusColor,
                    thickness: '4gc',
                    style: 'solid',
                    opacity: connectionOpacity, // 25% opacity for B1B2 and C1C2
                    clickable: false
                  });
                }
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Only add connections that don't involve excluded points

            // Right side: C2-B2, B2-A2 (keep these)
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1 (keep these)
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (only A1, A2)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 6] Added connections for notches:', [
              'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1',
              'O-A1', 'O-A2'
            ]);
            console.log('✅ [Page 6] Total connections:', allConnections.length);
            console.log('✅ [Page 6] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // No notches (tick marks) for page 6
          sideSymbols: (() => {
            const symbols = [];
            console.log('✅ [Page 6] sideSymbols configured (no notches):', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },

      // "0.5" label for OA1 connection
      {
        id: 'page6-label-oa1',
        name: 'label-oa1',
        type: 'custom',
        coordinates: [240, 400, 280, 430], // Positioned to the left of OA1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for A1B1 connection
      {
        id: 'page6-label-a1b1',
        name: 'label-a1b1',
        type: 'custom',
        coordinates: [240, 320, 280, 350], // Positioned to the left of A1B1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for B1C1 connection
      {
        id: 'page6-label-b1c1',
        name: 'label-b1c1',
        type: 'custom',
        coordinates: [240, 240, 280, 270], // Positioned to the left of B1C1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for OA2 connection
      {
        id: 'page6-label-oa2',
        name: 'label-oa2',
        type: 'custom',
        coordinates: [310, 470, 350, 500], // Positioned below OA2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for A2B2 connection
      {
        id: 'page6-label-a2b2',
        name: 'label-a2b2',
        type: 'custom',
        coordinates: [400, 470, 440, 500], // Positioned below A2B2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for B2C2 connection
      {
        id: 'page6-label-b2c2',
        name: 'label-b2c2',
        type: 'custom',
        coordinates: [490, 470, 510, 500], // Positioned below B2C2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
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
          text: getI18nText(
            'pages.page6.instruction',
            'Answer the questions correctly to move forward'
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

      // Tap Animation GIF
      {
        id: 'page6-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 6 }, // Only show for page 6 quiz completion
          opacity: 0.65 // 40% opacity
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page6-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page6-next-button');
            return getNextButtonText(pageNumber);
          },
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 6 }, // Only enable for page 6 quiz completion
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page6-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page6-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      }
    ],

    _page6TriangleAndLabelsInit: (() => {
      // Initialize triangle fill, label blinking, and equation hiding for page 6
      const initPage6TriangleAndLabels = () => {
        const gridElement = document.getElementById('page6-geometry-grid-1');
        if (!gridElement) {
          setTimeout(initPage6TriangleAndLabels, 500);
          return;
        }

        const svgs = gridElement.querySelectorAll('svg');
        if (!svgs || svgs.length === 0) {
          setTimeout(initPage6TriangleAndLabels, 500);
          return;
        }

        // Find the SVG that contains connections
        let svg = null;
        for (let i = svgs.length - 1; i >= 0; i--) {
          const lines = svgs[i].querySelectorAll('line');
          if (lines.length > 0) {
            svg = svgs[i];
            break;
          }
        }

        if (!svg) {
          setTimeout(initPage6TriangleAndLabels, 500);
          return;
        }

        // Initialize triangle fill
        if (!svg.querySelector('#page6-triangle-ob1b2')) {
          const centerRow = 5;
          const centerCol = 5;
          const spacing = 1.5;

          const oX = (centerCol / 10) * 100;
          const oY = (centerRow / 10) * 100;
          const b1X = (centerCol / 10) * 100;
          const b1Y = ((centerRow - spacing * 2) / 10) * 100;
          const b2X = ((centerCol + spacing * 2) / 10) * 100;
          const b2Y = (centerRow / 10) * 100;

          const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          triangle.setAttribute('points', `${oX},${oY} ${b1X},${b1Y} ${b2X},${b2Y}`);
          triangle.setAttribute('fill', '#F5A623');
          triangle.setAttribute('fill-opacity', '0.35');
          triangle.setAttribute('stroke', 'none');
          triangle.setAttribute('style', 'animation: blink-fast 0.3s infinite alternate; pointer-events: none;');
          triangle.setAttribute('id', 'page6-triangle-ob1b2');

          if (svg.firstChild) {
            svg.insertBefore(triangle, svg.firstChild);
          } else {
            svg.appendChild(triangle);
          }

          console.log(`✅ [Page 6] Added blinking triangle fill for OB1B2`);
        }

        // Make B1 and B2 labels blink
        svgs.forEach(svgEl => {
          const texts = svgEl.querySelectorAll('text');
          texts.forEach(text => {
            const textContent = text.textContent?.trim() || '';
            if (textContent === 'B1' || textContent === 'B2') {
              const currentStyle = text.getAttribute('style') || '';
              if (!currentStyle.includes('blink-fast')) {
                text.setAttribute('style', currentStyle + ' animation: blink-fast 0.3s infinite alternate;');
                console.log(`✅ [Page 6] Made ${textContent} label blink`);
              }
            }
          });
        });

        // Set opacity for B1B2 and C1C2 connections
        svgs.forEach(svgEl => {
          const lines = svgEl.querySelectorAll('line');
          lines.forEach(line => {
            const lineId = line.getAttribute('id') || '';
            const lineKey = line.getAttribute('key') || '';
            // Check both id and key attributes for connection identifiers
            if (lineId.includes('B1-B2') || lineId.includes('B2-B1') ||
              lineId.includes('C1-C2') || lineId.includes('C2-C1') ||
              lineKey.includes('B1-B2') || lineKey.includes('B2-B1') ||
              lineKey.includes('C1-C2') || lineKey.includes('C2-C1')) {
              line.setAttribute('stroke-opacity', '0.25');
              console.log(`✅ [Page 6] Set opacity to 25% for connection (id: ${lineId}, key: ${lineKey})`);
            }
          });
        });

        // Animate OA1 and A1B1 labels moving towards each other and morphing into "1"
        const animateLabelsMerging = () => {
          const oa1Label = document.getElementById('page6-label-oa1');
          const a1b1Label = document.getElementById('page6-label-a1b1');

          if (!oa1Label || !a1b1Label) {
            setTimeout(animateLabelsMerging, 500);
            return;
          }

          // Get current positions in pixels
          const oa1Rect = oa1Label.getBoundingClientRect();
          const a1b1Rect = a1b1Label.getBoundingClientRect();

          // Calculate centers
          const oa1CenterX = oa1Rect.left + oa1Rect.width / 2;
          const oa1CenterY = oa1Rect.top + oa1Rect.height / 2;
          const a1b1CenterX = a1b1Rect.left + a1b1Rect.width / 2;
          const a1b1CenterY = a1b1Rect.top + a1b1Rect.height / 2;

          // Calculate meeting point (midpoint)
          const meetingX = (oa1CenterX + a1b1CenterX) / 2;
          const meetingY = (oa1CenterY + a1b1CenterY) / 2;

          // Calculate translation needed in pixels
          const oa1TranslateX = meetingX - oa1CenterX;
          const oa1TranslateY = meetingY - oa1CenterY;
          const a1b1TranslateX = meetingX - a1b1CenterX;
          const a1b1TranslateY = meetingY - a1b1CenterY;

          // Set up CSS transitions for smooth animation
          oa1Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';
          a1b1Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';

          // Apply transforms
          oa1Label.style.transform = `translate(${oa1TranslateX}px, ${oa1TranslateY}px)`;
          a1b1Label.style.transform = `translate(${a1b1TranslateX}px, ${a1b1TranslateY}px)`;

          // After animation completes, hide original labels and create merged "1" label
          setTimeout(() => {
            // Get computed styles from original label to match exactly
            const computedStyle = window.getComputedStyle(oa1Label);

            oa1Label.style.opacity = '0';
            a1b1Label.style.opacity = '0';

            // Create new merged label "1" at meeting point
            const mergedLabel = document.createElement('div');
            mergedLabel.id = 'page6-label-merged-1';
            mergedLabel.style.position = 'fixed'; // Use fixed to position relative to viewport
            mergedLabel.style.left = `${meetingX}px`;
            mergedLabel.style.top = `${meetingY}px`;
            mergedLabel.style.transform = 'translate(-50%, -50%)'; // Center on meeting point
            mergedLabel.style.color = computedStyle.color || '#FFFFFF';
            mergedLabel.style.fontSize = computedStyle.fontSize; // Match exact font size from original label
            mergedLabel.style.fontFamily = computedStyle.fontFamily; // Match font family
            mergedLabel.style.fontWeight = computedStyle.fontWeight; // Match font weight
            mergedLabel.style.textAlign = 'center';
            mergedLabel.style.display = 'flex';
            mergedLabel.style.alignItems = 'center';
            mergedLabel.style.justifyContent = 'center';
            mergedLabel.style.lineHeight = computedStyle.lineHeight || '1.0';
            mergedLabel.textContent = '1';
            mergedLabel.style.zIndex = '60'; // Higher than labels
            mergedLabel.style.pointerEvents = 'none';

            // Add fade-in animation
            mergedLabel.style.opacity = '0';
            mergedLabel.style.transition = 'opacity 0.5s ease-in';

            // Insert into the document body
            document.body.appendChild(mergedLabel);

            // Trigger fade-in
            setTimeout(() => {
              mergedLabel.style.opacity = '1';
            }, 50);

            console.log('✅ [Page 6] Created merged label "1" at meeting point');
          }, 1000); // Wait for movement animation to complete
        };

        // Animate OA2 and A2B2 labels moving towards each other and morphing into "1"
        const animateLabelsMerging2 = () => {
          const oa2Label = document.getElementById('page6-label-oa2');
          const a2b2Label = document.getElementById('page6-label-a2b2');

          if (!oa2Label || !a2b2Label) {
            setTimeout(animateLabelsMerging2, 500);
            return;
          }

          // Get current positions in pixels
          const oa2Rect = oa2Label.getBoundingClientRect();
          const a2b2Rect = a2b2Label.getBoundingClientRect();

          // Calculate centers
          const oa2CenterX = oa2Rect.left + oa2Rect.width / 2;
          const oa2CenterY = oa2Rect.top + oa2Rect.height / 2;
          const a2b2CenterX = a2b2Rect.left + a2b2Rect.width / 2;
          const a2b2CenterY = a2b2Rect.top + a2b2Rect.height / 2;

          // Calculate meeting point (midpoint)
          const meetingX2 = (oa2CenterX + a2b2CenterX) / 2;
          const meetingY2 = (oa2CenterY + a2b2CenterY) / 2;

          // Calculate translation needed in pixels
          const oa2TranslateX = meetingX2 - oa2CenterX;
          const oa2TranslateY = meetingY2 - oa2CenterY;
          const a2b2TranslateX = meetingX2 - a2b2CenterX;
          const a2b2TranslateY = meetingY2 - a2b2CenterY;

          // Set up CSS transitions for smooth animation
          oa2Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';
          a2b2Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';

          // Apply transforms
          oa2Label.style.transform = `translate(${oa2TranslateX}px, ${oa2TranslateY}px)`;
          a2b2Label.style.transform = `translate(${a2b2TranslateX}px, ${a2b2TranslateY}px)`;

          // After animation completes, hide original labels and create merged "1" label
          setTimeout(() => {
            // Get computed styles from original label to match exactly
            const computedStyle2 = window.getComputedStyle(oa2Label);

            oa2Label.style.opacity = '0';
            a2b2Label.style.opacity = '0';

            // Create new merged label "1" at meeting point
            const mergedLabel2 = document.createElement('div');
            mergedLabel2.id = 'page6-label-merged-1-2';
            mergedLabel2.style.position = 'fixed'; // Use fixed to position relative to viewport
            mergedLabel2.style.left = `${meetingX2}px`;
            mergedLabel2.style.top = `${meetingY2}px`;
            mergedLabel2.style.transform = 'translate(-50%, -50%)'; // Center on meeting point
            mergedLabel2.style.color = computedStyle2.color || '#FFFFFF';
            mergedLabel2.style.fontSize = computedStyle2.fontSize; // Match exact font size from original label
            mergedLabel2.style.fontFamily = computedStyle2.fontFamily; // Match font family
            mergedLabel2.style.fontWeight = computedStyle2.fontWeight; // Match font weight
            mergedLabel2.style.textAlign = 'center';
            mergedLabel2.style.display = 'flex';
            mergedLabel2.style.alignItems = 'center';
            mergedLabel2.style.justifyContent = 'center';
            mergedLabel2.style.lineHeight = computedStyle2.lineHeight || '1.0';
            mergedLabel2.textContent = '1';
            mergedLabel2.style.zIndex = '60'; // Higher than labels
            mergedLabel2.style.pointerEvents = 'none';

            // Add fade-in animation
            mergedLabel2.style.opacity = '0';
            mergedLabel2.style.transition = 'opacity 0.5s ease-in';

            // Insert into the document body
            document.body.appendChild(mergedLabel2);

            // Trigger fade-in
            setTimeout(() => {
              mergedLabel2.style.opacity = '1';
            }, 50);

            console.log('✅ [Page 6] Created merged label "1" for OA2/A2B2 at meeting point');
          }, 1000); // Wait for movement animation to complete
        };

        // Start animations after a short delay to ensure labels are rendered
        setTimeout(animateLabelsMerging, 1000);
        setTimeout(animateLabelsMerging2, 1000);
      };


      // Initialize triangle and labels on page load
      const checkAndInitTriangle = () => {
        const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage === 6) {
          initPage6TriangleAndLabels();
          return true;
        }
        return false;
      };

      const handlePageChangeTriangle = (event) => {
        const page = event?.detail?.page;
        if (page === 6) {
          setTimeout(() => initPage6TriangleAndLabels(), 500);
          // Update visibility when page changes to 6
          setTimeout(() => updatePage6ElementVisibility(), 100);
        }
      };

      // Function to update visibility of elements based on page6State
      const updatePage6ElementVisibility = () => {
        // Only run if we're actually on page 6
        const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage !== 6) {
          return; // Don't run if not on page 6
        }

        const currentState = window.getPage6State ? window.getPage6State() : 'default';

        // Elements that should be hidden when state is 'default'
        const defaultHiddenElements = [
          'page6-question-feedback-textbox',
          'page6-question-background',
          'page6-given-triangle-text',
          'page6-ratio-button-1',
          'page6-ratio-button-2',
          'page6-ratio-button-3',
          'page6-ratio-button-4'
        ];

        // Elements that should be visible only when state is 'ratio'
        const ratioOnlyElements = [
          'page6-third-answer-text',
          'page6-third-answer-background'
        ];

        // Update default-hidden elements (visible when state is NOT 'default')
        defaultHiddenElements.forEach(elementId => {
          let element = document.getElementById(elementId);

          // For buttons, try to find by data-button-id if element not found by ID
          if (!element && elementId.includes('ratio-button')) {
            element = document.querySelector(`[data-button-id="${elementId}"]`);
          }

          // For feedback textbox, try to find by data-element-id or ID
          if (!element && elementId.includes('feedback-textbox')) {
            // Try finding by data-element-id attribute (set by component)
            element = document.querySelector(`[data-element-id="${elementId}"]`);
            // If still not found, try by ID again (in case component used props.id)
            if (!element) {
              element = document.getElementById(elementId);
            }
          }

          if (element) {
            const shouldShow = currentState !== 'default';
            // Determine display value based on element type
            // TeacherNoteComponent and FeedbackTextboxComponent use 'flex'
            // Buttons also use 'flex'
            let displayValue = 'block';
            if (elementId.includes('button')) {
              displayValue = 'flex';
            } else if (elementId.includes('feedback-textbox')) {
              displayValue = 'flex'; // Feedback textbox uses flex
            } else if (element.classList.contains('teacher-note-text-box')) {
              displayValue = 'flex'; // TeacherNoteComponent uses flex
            }
            element.style.display = shouldShow ? displayValue : 'none';

            // For buttons, ensure the content div is also visible and has proper display
            if (elementId.includes('button') && shouldShow) {
              const contentDiv = element.querySelector('.applet-button-content');
              if (contentDiv) {
                contentDiv.style.display = 'flex';
                // Force a re-render by triggering a style recalculation
                void contentDiv.offsetHeight;
              }
            }

            console.log(`✅ [Page 6] ${shouldShow ? 'Showing' : 'Hiding'} ${elementId} (state: ${currentState})`);
          }
          // Silently skip if element not found (might not be rendered yet)
        });

        // Update ratio-only elements (visible only when state is 'ratio')
        ratioOnlyElements.forEach(elementId => {
          const element = document.getElementById(elementId);
          if (element) {
            const shouldShow = currentState === 'ratio';
            element.style.display = shouldShow ? 'block' : 'none';
            console.log(`✅ [Page 6] ${shouldShow ? 'Showing' : 'Hiding'} ${elementId} (state: ${currentState})`);
          }
          // Silently skip if element not found (might not be rendered yet)
        });
      };

      // Listen for page6StateChanged events
      const handlePage6StateChange = (event) => {
        console.log('🔍 [Page 6] State changed, updating element visibility');
        // Use setTimeout to ensure DOM is ready
        setTimeout(updatePage6ElementVisibility, 50);
      };

      // Set up event listeners
      if (typeof window !== 'undefined') {
        window.addEventListener('pageChanged', handlePageChangeTriangle);
        window.addEventListener('page6StateChanged', handlePage6StateChange);

        // Check immediately
        if (!checkAndInitTriangle()) {
          setTimeout(() => {
            if (!checkAndInitTriangle()) {
              setTimeout(checkAndInitTriangle, 2000);
            }
          }, 1000);
        }

        // Set initial visibility after a short delay to ensure elements are rendered
        setTimeout(() => {
          updatePage6ElementVisibility();
        }, 500);
      }

      console.log('✅ [Page 6] Triangle and labels initialization code loaded');
      return true; // Return value for IIFE
    })(),

    _page7TriangleAndLabelsInit: (() => {
      // Initialize triangle fill, label blinking, and equation hiding for page 7
      const initPage7TriangleAndLabels = () => {
        const gridElement = document.getElementById('page7-geometry-grid-1');
        if (!gridElement) {
          setTimeout(initPage7TriangleAndLabels, 500);
          return;
        }

        const svgs = gridElement.querySelectorAll('svg');
        if (!svgs || svgs.length === 0) {
          setTimeout(initPage7TriangleAndLabels, 500);
          return;
        }

        // Find the SVG that contains connections
        let svg = null;
        for (let i = svgs.length - 1; i >= 0; i--) {
          const lines = svgs[i].querySelectorAll('line');
          if (lines.length > 0) {
            svg = svgs[i];
            break;
          }
        }

        if (!svg) {
          setTimeout(initPage7TriangleAndLabels, 500);
          return;
        }

        // Initialize triangle fill
        if (!svg.querySelector('#page7-triangle-oc1c2')) {
          // Find the actual rendered positions of O, C1, and C2 from the SVG
          const findPointPosition = (pointId) => {
            // Look for circle elements with id matching the point
            const circle = svg.querySelector(`circle[id="${pointId}"], circle[data-point-id="${pointId}"]`);
            if (circle) {
              const cx = parseFloat(circle.getAttribute('cx')) || 0;
              const cy = parseFloat(circle.getAttribute('cy')) || 0;
              return { x: cx, y: cy };
            }

            // If circle not found, try to find by text label position
            const texts = svg.querySelectorAll('text');
            for (const text of texts) {
              if (text.textContent?.trim() === pointId) {
                const x = parseFloat(text.getAttribute('x')) || 0;
                const y = parseFloat(text.getAttribute('y')) || 0;
                return { x, y };
              }
            }

            // Try to find position from line connections
            const lines = svg.querySelectorAll('line');
            if (pointId === 'O') {
              // Find O-C1 or O-C2 line
              for (const line of lines) {
                const id = line.getAttribute('id') || '';
                const key = line.getAttribute('key') || '';
                if (id.includes('O-C1') || id.includes('C1-O') || key.includes('O-C1') || key.includes('C1-O') ||
                  id.includes('O-C2') || id.includes('C2-O') || key.includes('O-C2') || key.includes('C2-O')) {
                  const x1 = parseFloat(line.getAttribute('x1')) || 0;
                  const y1 = parseFloat(line.getAttribute('y1')) || 0;
                  const x2 = parseFloat(line.getAttribute('x2')) || 0;
                  const y2 = parseFloat(line.getAttribute('y2')) || 0;
                  // O should be the point closer to center (50, 50)
                  const dist1 = Math.sqrt(Math.pow(x1 - 50, 2) + Math.pow(y1 - 50, 2));
                  const dist2 = Math.sqrt(Math.pow(x2 - 50, 2) + Math.pow(y2 - 50, 2));
                  return dist1 < dist2 ? { x: x1, y: y1 } : { x: x2, y: y2 };
                }
              }
            } else if (pointId === 'C1') {
              // Find O-C1 line
              for (const line of lines) {
                const id = line.getAttribute('id') || '';
                const key = line.getAttribute('key') || '';
                if (id.includes('O-C1') || id.includes('C1-O') || key.includes('O-C1') || key.includes('C1-O')) {
                  const x1 = parseFloat(line.getAttribute('x1')) || 0;
                  const y1 = parseFloat(line.getAttribute('y1')) || 0;
                  const x2 = parseFloat(line.getAttribute('x2')) || 0;
                  const y2 = parseFloat(line.getAttribute('y2')) || 0;
                  // C1 should be the point with smaller y (top)
                  return y1 < y2 ? { x: x1, y: y1 } : { x: x2, y: y2 };
                }
              }
            } else if (pointId === 'C2') {
              // Find O-C2 line
              for (const line of lines) {
                const id = line.getAttribute('id') || '';
                const key = line.getAttribute('key') || '';
                if (id.includes('O-C2') || id.includes('C2-O') || key.includes('O-C2') || key.includes('C2-O')) {
                  const x1 = parseFloat(line.getAttribute('x1')) || 0;
                  const y1 = parseFloat(line.getAttribute('y1')) || 0;
                  const x2 = parseFloat(line.getAttribute('x2')) || 0;
                  const y2 = parseFloat(line.getAttribute('y2')) || 0;
                  // C2 should be the point with larger x (right)
                  return x1 > x2 ? { x: x1, y: y1 } : { x: x2, y: y2 };
                }
              }
            }

            // Fallback: calculate from grid coordinates
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5;

            if (pointId === 'O') {
              return { x: (centerCol / 10) * 100, y: (centerRow / 10) * 100 };
            } else if (pointId === 'C1') {
              return { x: (centerCol / 10) * 100, y: ((centerRow - spacing * 3) / 10) * 100 };
            } else if (pointId === 'C2') {
              return { x: ((centerCol + spacing * 3) / 10) * 100, y: (centerRow / 10) * 100 };
            }

            return { x: 50, y: 50 }; // Default center
          };

          const oPos = findPointPosition('O');
          const c1Pos = findPointPosition('C1');
          const c2Pos = findPointPosition('C2');

          const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          triangle.setAttribute('points', `${oPos.x},${oPos.y} ${c1Pos.x},${c1Pos.y} ${c2Pos.x},${c2Pos.y}`);
          triangle.setAttribute('fill', '#E94B3C');
          triangle.setAttribute('fill-opacity', '0.35');
          triangle.setAttribute('stroke', 'none');
          triangle.setAttribute('style', 'animation: blink-fast 0.3s infinite alternate; pointer-events: none;');
          triangle.setAttribute('id', 'page7-triangle-oc1c2');

          if (svg.firstChild) {
            svg.insertBefore(triangle, svg.firstChild);
          } else {
            svg.appendChild(triangle);
          }

          console.log(`✅ [Page 7] Added blinking triangle fill for OC1C2 at O(${oPos.x},${oPos.y}) C1(${c1Pos.x},${c1Pos.y}) C2(${c2Pos.x},${c2Pos.y})`);
        }

        // Make C1 and C2 labels blink
        svgs.forEach(svgEl => {
          const texts = svgEl.querySelectorAll('text');
          texts.forEach(text => {
            const textContent = text.textContent?.trim() || '';
            if (textContent === 'C1' || textContent === 'C2') {
              const currentStyle = text.getAttribute('style') || '';
              if (!currentStyle.includes('blink-fast')) {
                text.setAttribute('style', currentStyle + ' animation: blink-fast 0.3s infinite alternate;');
                console.log(`✅ [Page 7] Made ${textContent} label blink`);
              }
            }
          });
        });

        // Set opacity for A1A2 and B1B2 connections (C1C2 should be fully visible)
        svgs.forEach(svgEl => {
          const lines = svgEl.querySelectorAll('line');
          lines.forEach(line => {
            const lineId = line.getAttribute('id') || '';
            const lineKey = line.getAttribute('key') || '';
            // Check both id and key attributes for connection identifiers
            if (lineId.includes('A1-A2') || lineId.includes('A2-A1') ||
              lineId.includes('B1-B2') || lineId.includes('B2-B1') ||
              lineKey.includes('A1-A2') || lineKey.includes('A2-A1') ||
              lineKey.includes('B1-B2') || lineKey.includes('B2-B1')) {
              line.setAttribute('stroke-opacity', '0.25');
              console.log(`✅ [Page 7] Set opacity to 25% for connection (id: ${lineId}, key: ${lineKey})`);
            }
          });
        });

        // Animate OA1 and B1C1 labels moving towards A1B1 and morphing into "1.5"
        const animateLabelsMerging1 = () => {
          const oa1Label = document.getElementById('page7-label-oa1');
          const b1c1Label = document.getElementById('page7-label-b1c1');
          const a1b1Label = document.getElementById('page7-label-a1b1');

          if (!oa1Label || !b1c1Label || !a1b1Label) {
            setTimeout(animateLabelsMerging1, 500);
            return;
          }

          // Get current positions in pixels
          const oa1Rect = oa1Label.getBoundingClientRect();
          const b1c1Rect = b1c1Label.getBoundingClientRect();
          const a1b1Rect = a1b1Label.getBoundingClientRect();

          // Calculate centers
          const oa1CenterX = oa1Rect.left + oa1Rect.width / 2;
          const oa1CenterY = oa1Rect.top + oa1Rect.height / 2;
          const b1c1CenterX = b1c1Rect.left + b1c1Rect.width / 2;
          const b1c1CenterY = b1c1Rect.top + b1c1Rect.height / 2;
          const a1b1CenterX = a1b1Rect.left + a1b1Rect.width / 2;
          const a1b1CenterY = a1b1Rect.top + a1b1Rect.height / 2;

          // Calculate translation needed in pixels (move towards A1B1)
          const oa1TranslateX = a1b1CenterX - oa1CenterX;
          const oa1TranslateY = a1b1CenterY - oa1CenterY;
          const b1c1TranslateX = a1b1CenterX - b1c1CenterX;
          const b1c1TranslateY = a1b1CenterY - b1c1CenterY;

          // Set up CSS transitions for smooth animation
          oa1Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';
          b1c1Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';
          a1b1Label.style.transition = 'opacity 0.3s ease-in-out';

          // Apply transforms
          oa1Label.style.transform = `translate(${oa1TranslateX}px, ${oa1TranslateY}px)`;
          b1c1Label.style.transform = `translate(${b1c1TranslateX}px, ${b1c1TranslateY}px)`;

          // After animation completes, hide original labels and create merged "1.5" label
          setTimeout(() => {
            // Get computed styles from original label to match exactly (same size as 0.5)
            const computedStyle = window.getComputedStyle(a1b1Label);

            oa1Label.style.opacity = '0';
            b1c1Label.style.opacity = '0';
            a1b1Label.style.opacity = '0';

            // Create new merged label "1.5" at A1B1 position
            const mergedLabel = document.createElement('div');
            mergedLabel.id = 'page7-label-merged-1.5-1';
            mergedLabel.style.position = 'fixed'; // Use fixed to position relative to viewport
            mergedLabel.style.left = `${a1b1CenterX}px`;
            mergedLabel.style.top = `${a1b1CenterY}px`;
            mergedLabel.style.transform = 'translate(-50%, -50%)'; // Center on meeting point
            mergedLabel.style.color = computedStyle.color || '#FFFFFF';
            mergedLabel.style.fontSize = computedStyle.fontSize; // Match exact font size from original label (24gc)
            mergedLabel.style.fontFamily = computedStyle.fontFamily; // Match font family
            mergedLabel.style.fontWeight = computedStyle.fontWeight; // Match font weight
            mergedLabel.style.textAlign = 'center';
            mergedLabel.style.display = 'flex';
            mergedLabel.style.alignItems = 'center';
            mergedLabel.style.justifyContent = 'center';
            mergedLabel.style.lineHeight = computedStyle.lineHeight || '1.0';
            mergedLabel.textContent = '1.5';
            mergedLabel.style.zIndex = '60'; // Higher than labels
            mergedLabel.style.pointerEvents = 'none';

            // Add fade-in animation
            mergedLabel.style.opacity = '0';
            mergedLabel.style.transition = 'opacity 0.5s ease-in';

            // Insert into the document body
            document.body.appendChild(mergedLabel);

            // Trigger fade-in
            setTimeout(() => {
              mergedLabel.style.opacity = '1';
            }, 50);

            console.log('✅ [Page 7] Created merged label "1.5" at A1B1 position');
          }, 1000); // Wait for movement animation to complete
        };

        // Animate OA2 and B2C2 labels moving towards A2B2 and morphing into "1.5"
        const animateLabelsMerging2 = () => {
          const oa2Label = document.getElementById('page7-label-oa2');
          const b2c2Label = document.getElementById('page7-label-b2c2');
          const a2b2Label = document.getElementById('page7-label-a2b2');

          if (!oa2Label || !b2c2Label || !a2b2Label) {
            setTimeout(animateLabelsMerging2, 500);
            return;
          }

          // Get current positions in pixels
          const oa2Rect = oa2Label.getBoundingClientRect();
          const b2c2Rect = b2c2Label.getBoundingClientRect();
          const a2b2Rect = a2b2Label.getBoundingClientRect();

          // Calculate centers
          const oa2CenterX = oa2Rect.left + oa2Rect.width / 2;
          const oa2CenterY = oa2Rect.top + oa2Rect.height / 2;
          const b2c2CenterX = b2c2Rect.left + b2c2Rect.width / 2;
          const b2c2CenterY = b2c2Rect.top + b2c2Rect.height / 2;
          const a2b2CenterX = a2b2Rect.left + a2b2Rect.width / 2;
          const a2b2CenterY = a2b2Rect.top + a2b2Rect.height / 2;

          // Calculate translation needed in pixels (move towards A2B2)
          const oa2TranslateX = a2b2CenterX - oa2CenterX;
          const oa2TranslateY = a2b2CenterY - oa2CenterY;
          const b2c2TranslateX = a2b2CenterX - b2c2CenterX;
          const b2c2TranslateY = a2b2CenterY - b2c2CenterY;

          // Set up CSS transitions for smooth animation
          oa2Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';
          b2c2Label.style.transition = 'transform 1s ease-in-out, opacity 0.3s ease-in-out';
          a2b2Label.style.transition = 'opacity 0.3s ease-in-out';

          // Apply transforms
          oa2Label.style.transform = `translate(${oa2TranslateX}px, ${oa2TranslateY}px)`;
          b2c2Label.style.transform = `translate(${b2c2TranslateX}px, ${b2c2TranslateY}px)`;

          // After animation completes, hide original labels and create merged "1.5" label
          setTimeout(() => {
            // Get computed styles from original label to match exactly (same size as 0.5)
            const computedStyle = window.getComputedStyle(a2b2Label);

            oa2Label.style.opacity = '0';
            b2c2Label.style.opacity = '0';
            a2b2Label.style.opacity = '0';

            // Create new merged label "1.5" at A2B2 position
            const mergedLabel = document.createElement('div');
            mergedLabel.id = 'page7-label-merged-1.5-2';
            mergedLabel.style.position = 'fixed'; // Use fixed to position relative to viewport
            mergedLabel.style.left = `${a2b2CenterX}px`;
            mergedLabel.style.top = `${a2b2CenterY}px`;
            mergedLabel.style.transform = 'translate(-50%, -50%)'; // Center on meeting point
            mergedLabel.style.color = computedStyle.color || '#FFFFFF';
            mergedLabel.style.fontSize = computedStyle.fontSize; // Match exact font size from original label (24gc)
            mergedLabel.style.fontFamily = computedStyle.fontFamily; // Match font family
            mergedLabel.style.fontWeight = computedStyle.fontWeight; // Match font weight
            mergedLabel.style.textAlign = 'center';
            mergedLabel.style.display = 'flex';
            mergedLabel.style.alignItems = 'center';
            mergedLabel.style.justifyContent = 'center';
            mergedLabel.style.lineHeight = computedStyle.lineHeight || '1.0';
            mergedLabel.textContent = '1.5';
            mergedLabel.style.zIndex = '60'; // Higher than labels
            mergedLabel.style.pointerEvents = 'none';

            // Add fade-in animation
            mergedLabel.style.opacity = '0';
            mergedLabel.style.transition = 'opacity 0.5s ease-in';

            // Insert into the document body
            document.body.appendChild(mergedLabel);

            // Trigger fade-in
            setTimeout(() => {
              mergedLabel.style.opacity = '1';
            }, 50);

            console.log('✅ [Page 7] Created merged label "1.5" at A2B2 position');
          }, 1000); // Wait for movement animation to complete
        };

        // Start animations after a short delay
        setTimeout(() => {
          animateLabelsMerging1();
          animateLabelsMerging2();
        }, 1000);
      };


      // Initialize triangle and labels on page load
      const checkAndInitTriangle = () => {
        const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage === 7) {
          initPage7TriangleAndLabels();
          return true;
        }
        return false;
      };

      const handlePageChangeTriangle = (event) => {
        const page = event?.detail?.page;
        if (page === 7) {
          setTimeout(() => initPage7TriangleAndLabels(), 500);
          // Update visibility when page changes to 7
          setTimeout(() => updatePage7ElementVisibility(), 100);
        }
      };

      // Function to update visibility of elements based on page7State
      const updatePage7ElementVisibility = () => {
        // Only run if we're actually on page 7
        const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
        if (currentPage !== 7) {
          return; // Don't run if not on page 7
        }

        const currentState = window.getPage7State ? window.getPage7State() : 'default';

        // Elements that should be hidden when state is 'default'
        const defaultHiddenElements = [
          'page7-question-feedback-textbox',
          'page7-question-background',
          'page7-given-triangle-text',
          'page7-ratio-button-1',
          'page7-ratio-button-2',
          'page7-ratio-button-3',
          'page7-ratio-button-4'
        ];

        // Elements that should be visible only when state is 'ratio'
        const ratioOnlyElements = [
          'page7-third-answer-text',
          'page7-third-answer-background'
        ];

        // Update default-hidden elements (visible when state is NOT 'default')
        defaultHiddenElements.forEach(elementId => {
          let element = document.getElementById(elementId);

          // For buttons, try to find by data-button-id if element not found by ID
          if (!element && elementId.includes('ratio-button')) {
            element = document.querySelector(`[data-button-id="${elementId}"]`);
          }

          // For feedback textbox, try to find by data-element-id or ID
          if (!element && elementId.includes('feedback-textbox')) {
            // Try finding by data-element-id attribute (set by component)
            element = document.querySelector(`[data-element-id="${elementId}"]`);
            // If still not found, try by ID again (in case component used props.id)
            if (!element) {
              element = document.getElementById(elementId);
            }
          }

          if (element) {
            const shouldShow = currentState !== 'default';
            // Determine display value based on element type
            // TeacherNoteComponent and FeedbackTextboxComponent use 'flex'
            // Buttons also use 'flex'
            let displayValue = 'block';
            if (elementId.includes('button')) {
              displayValue = 'flex';
            } else if (elementId.includes('feedback-textbox')) {
              displayValue = 'flex'; // Feedback textbox uses flex
            } else if (element.classList.contains('teacher-note-text-box')) {
              displayValue = 'flex'; // TeacherNoteComponent uses flex
            }
            element.style.display = shouldShow ? displayValue : 'none';

            // For buttons, ensure the content div is also visible and has proper display
            if (elementId.includes('button') && shouldShow) {
              const contentDiv = element.querySelector('.applet-button-content');
              if (contentDiv) {
                contentDiv.style.display = 'flex';
                // Force a re-render by triggering a style recalculation
                void contentDiv.offsetHeight;
              }
            }

            console.log(`✅ [Page 7] ${shouldShow ? 'Showing' : 'Hiding'} ${elementId} (state: ${currentState})`);
          }
          // Silently skip if element not found (might not be rendered yet)
        });

        // Update ratio-only elements (visible only when state is 'ratio')
        ratioOnlyElements.forEach(elementId => {
          const element = document.getElementById(elementId);
          if (element) {
            const shouldShow = currentState === 'ratio';
            element.style.display = shouldShow ? 'block' : 'none';
            console.log(`✅ [Page 7] ${shouldShow ? 'Showing' : 'Hiding'} ${elementId} (state: ${currentState})`);
          }
          // Silently skip if element not found (might not be rendered yet)
        });
      };

      // Listen for page7StateChanged events
      const handlePage7StateChange = (event) => {
        console.log('🔍 [Page 7] State changed, updating element visibility');
        // Use setTimeout to ensure DOM is ready
        setTimeout(updatePage7ElementVisibility, 50);
      };

      // Set up event listeners
      if (typeof window !== 'undefined') {
        window.addEventListener('pageChanged', handlePageChangeTriangle);
        window.addEventListener('page7StateChanged', handlePage7StateChange);

        // Check immediately
        if (!checkAndInitTriangle()) {
          setTimeout(() => {
            if (!checkAndInitTriangle()) {
              setTimeout(checkAndInitTriangle, 2000);
            }
          }, 1000);
        }

        // Set initial visibility after a short delay to ensure elements are rendered
        setTimeout(() => {
          updatePage7ElementVisibility();
        }, 500);
      }

      console.log('✅ [Page 7] Triangle and labels initialization code loaded');
      return true; // Return value for IIFE
    })(),

    7: [

      // Header Text - "Let us find side length C₁C₂ (outer loop)"
      {
        id: 'page7-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.headerText', '<span style="color: #ffffff;">Let us find side length </span><span style="color: #E94B3C;">C<sub>1</sub>C<sub>2</sub></span><span style="color: #ffffff;"> (outer loop)</span>'),
          allowHTML: true,
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White color for the rest of the text
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // Question background
      {
        id: 'page7-question-background',
        name: 'question-background',
        type: 'custom',
        coordinates: [600, 350, 1595, 600], // Covers the question text with padding
        zIndex: 55, // Behind question text but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as equation background
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden by default, will be shown when state is not 'default'
        }
      },

      // Feedback Textbox Component for question
      {
        id: 'page7-question-feedback-textbox',
        name: 'page7-question-feedback-textbox',
        type: 'custom',
        coordinates: [600, 610, 1595, 682], // Positioned right below question background
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page7-question-feedback-textbox',
          text: getI18nText('pages.page5.ratioFeedbackDefault', 'Choose the correct ratio of the sides'), // Default text
          mode: 'normal', // Default mode
          fontSize: '28gc',
          borderRadius: '12gc',
          textAlign: 'center',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box',
        }
      },

      // Third answer background
      {
        id: 'page7-third-answer-background',
        name: 'third-answer-background',
        type: 'custom',
        coordinates: [600, 700, 1595, 800], // Positioned right below question feedback box
        zIndex: 55, // Behind text but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity - same as other backgrounds
          border: '3gc solid #00AA55', // Green 3gc border
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0',
          display: 'none' // Hidden by default, will be shown when state is 'ratio'
        }
      },

      // Third answer text
      {
        id: 'page7-third-answer-text',
        name: 'third-answer-text',
        type: 'custom',
        coordinates: [600, 700, 1595, 800], // Same as background
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.thirdAnswerText', 'C₁C₂ in Δ C₁OC₂ = 1.5 × $\\sqrt{2}$ = $\\frac{3\\sqrt{2}}{2}$'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '15gc',
          textAlign: 'center',
          lineHeight: '1.5',
          fontWeight: 'normal',
          allowHTML: true,
          display: 'none' // Hidden by default, will be shown when state is 'ratio'
        }
      },

      // Given triangle text
      {
        id: 'page7-given-triangle-text',
        name: 'given-triangle-text',
        type: 'custom',
        coordinates: [600, 400, 1595, 450], // Moved up by 50gc
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.givenTriangleText', 'Given <span style="color: #E94B3C;">Δ</span> <span style="color: #E94B3C;">C<sub>1</sub>OC<sub>2</sub></span> is an isosceles triangle, What is the ratio of the sides (side : side : hypotenuse)?'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '32gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          fontWeight: 'normal',
          display: 'none' // Hidden by default, will be shown when state is not 'default'
        }
      },

      // Ratio Button 1: 1 : 2 : 3 (incorrect)
      {
        id: 'page7-ratio-button-1',
        name: 'ratio-button-1',
        type: 'button',
        coordinates: [625, 495, 825, 575], // Moved right by 25gc
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: getI18nText('pages.page7.ratioButton1', '1 : 2 : 3'),
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 1 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-ratio-button-1"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page7QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.ratioFeedbackIncorrect1', 'Incorrect! The ratio 1 : 2 : 3 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Ratio Button 2: 1 : 1 : √2 (correct)
      {
        id: 'page7-ratio-button-2',
        name: 'ratio-button-2',
        type: 'button',
        coordinates: [877, 495, 1077, 575], // Evenly distributed between button 1 and 4
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : 1 : $\\sqrt{2}$',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 2 clicked (correct)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-ratio-button-2"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#00AA55'; // Green color for correct answer
              container.style.pointerEvents = 'none';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }

            // Disable all other ratio buttons
            const buttons = ['page7-ratio-button-1', 'page7-ratio-button-3', 'page7-ratio-button-4'];
            buttons.forEach(btnId => {
              const btn = document.querySelector(`[data-button-id="${btnId}"]`);
              if (btn) {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                btn.setAttribute('data-disabled', 'true');
              }
            });

            window.dispatchEvent(new CustomEvent('page7QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.ratioFeedbackCorrect', 'Δ C₁OC₂, the ratio of sides OC₁ : OC₂ : C₁C₂ is 1 : 1 : $\\sqrt{2}$.'),
                mode: 'correct-2'
              }
            }));

            // Change state to 'ratio' when correct answer is selected
            if (typeof window !== 'undefined' && window.setPage7State) {
              window.setPage7State('ratio');
              console.log('✅ [Page 7] State changed to ratio after correct ratio answer');

              // Dispatch quizCompleted event for quiz detection
              const quizCompletedEvent = new CustomEvent('quizCompleted', {
                detail: {
                  componentId: 'page7-triangle-ratio-quiz',
                  componentType: 'Page7TriangleRatioQuiz',
                  pageNumber: 7,
                  allQuestionsAnswered: true
                }
              });
              window.dispatchEvent(quizCompletedEvent);
              console.log('✅ [Page 7] Dispatched quizCompleted event after both questions answered correctly');
            }
          }
        }
      },

      // Ratio Button 3: 1 : √3 : 2 (incorrect)
      {
        id: 'page7-ratio-button-3',
        name: 'ratio-button-3',
        type: 'button',
        coordinates: [1129, 495, 1329, 575], // Evenly distributed between button 1 and 4
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : $\\sqrt{3}$ : 2',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 3 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-ratio-button-3"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page7QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.ratioFeedbackIncorrect2', 'Incorrect! The ratio 1 : $\\sqrt{3}$ : 2 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Ratio Button 4: 1 : √2 : 1 (incorrect)
      {
        id: 'page7-ratio-button-4',
        name: 'ratio-button-4',
        type: 'button',
        coordinates: [1380, 495, 1580, 575], // Moved left by 30gc
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc',
          text: '1 : $\\sqrt{2}$ : 1',
          fontSize: '30gc',
          backgroundColor: 'var(--color-gold)',
          color: '#000000',
          borderRadius: '15gc',
          fontWeight: 'normal',
          textAlign: 'center',
          lineHeight: '1.2',
          display: 'none', // Hidden by default, will be shown when state is not 'default'
          onClick: (event) => {
            console.log('Ratio button 4 clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-ratio-button-4"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61';
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5';
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
            }
            window.dispatchEvent(new CustomEvent('page7QuestionFeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.ratioFeedbackIncorrect3', 'Incorrect! The ratio 1 : $\\sqrt{2}$ : 1 does not match an isosceles triangle.'),
                mode: 'incorrect'
              }
            }));
          }
        }
      },

      // Triangle C1OC2 question text
      {
        id: 'page7-triangle-question-text',
        name: 'triangle-question-text',
        type: 'custom',
        coordinates: [625, 105, 850, 275], // Middle aligned with equation background (center at y=190)
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page7.triangleQuestionText', '<span style="color: #E94B3C;">Δ</span> <span style="color: #E94B3C;">C<sub>1</sub>OC<sub>2</sub></span> is :'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          fontWeight: 'normal'
        }
      },

      // Button: Scalene triangle (incorrect)
      {
        id: 'page7-triangle-button-scalene',
        name: 'triangle-button-scalene',
        type: 'button',
        coordinates: [870, 150, 1070, 230], // Middle aligned with equation background (center at y=190), moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page7.triangleButtonScalene', 'a\nscalene Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Scalene triangle button clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            // The event.currentTarget should be the container div since onClick is attached to it
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-triangle-button-scalene"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61'; // Salmon color
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5'; // Grayed out
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
              console.log('✅ Scalene button disabled and colored');
            } else {
              console.warn('⚠️ Could not find scalene button container');
            }
            // Update feedback box
            const feedbackEvent = new CustomEvent('page7FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.triangleTypeFeedbackIncorrect', 'Incorrect! Check the side lengths.'),
                mode: 'incorrect'
              }
            });
            window.dispatchEvent(feedbackEvent);
          }
        }
      },

      // Button: Isosceles triangle (correct)
      {
        id: 'page7-triangle-button-isosceles',
        name: 'triangle-button-isosceles',
        type: 'button',
        coordinates: [1118, 150, 1318, 230], // Middle aligned with equation background (center at y=190), equidistant from first and third buttons, moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page7.triangleButtonIsosceles', 'an\nisosceles Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Isosceles triangle button clicked (correct)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('correct');
            }
            // The event.currentTarget should be the container div
            const isoscelesContainer = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-triangle-button-isosceles"]');

            // Find all three button containers
            const scaleneContainer = document.querySelector('[data-button-id="page7-triangle-button-scalene"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container[data-button-id="page7-triangle-button-scalene"]') : null);

            const equilateralContainer = document.querySelector('[data-button-id="page7-triangle-button-equilateral"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container[data-button-id="page7-triangle-button-equilateral"]') : null);

            // Update isosceles button (correct)
            if (isoscelesContainer) {
              isoscelesContainer.style.backgroundColor = '#00AA55'; // Green color for correct answer
              isoscelesContainer.style.pointerEvents = 'none';
              isoscelesContainer.style.cursor = 'not-allowed';
              isoscelesContainer.setAttribute('data-disabled', 'true');
              console.log('✅ Isosceles button disabled and colored green');
            } else {
              console.warn('⚠️ Could not find isosceles button container');
            }

            // Disable all other buttons
            if (scaleneContainer) {
              scaleneContainer.style.pointerEvents = 'none';
              scaleneContainer.style.opacity = '0.5';
              scaleneContainer.style.cursor = 'not-allowed';
              scaleneContainer.setAttribute('data-disabled', 'true');
            }

            if (equilateralContainer) {
              equilateralContainer.style.pointerEvents = 'none';
              equilateralContainer.style.opacity = '0.5';
              equilateralContainer.style.cursor = 'not-allowed';
              equilateralContainer.setAttribute('data-disabled', 'true');
            }

            // Update feedback box
            const feedbackEvent = new CustomEvent('page7FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.triangleTypeFeedbackCorrect', 'OC₁ = OC₂ making Δ an isosceles Δ'),
                mode: 'correct-2'
              }
            });
            window.dispatchEvent(feedbackEvent);

            // Change state to 'triangleType' when correct answer is selected
            if (typeof window !== 'undefined' && window.setPage7State) {
              window.setPage7State('triangleType');
              console.log('✅ [Page 7] State changed to triangleType after correct triangle type answer');
            }
          }
        }
      },

      // Button: Equilateral triangle (incorrect)
      {
        id: 'page7-triangle-button-equilateral',
        name: 'triangle-button-equilateral',
        type: 'button',
        coordinates: [1365, 150, 1565, 230], // Middle aligned with equation background (center at y=190), moved 25gc right
        zIndex: 60,
        props: {
          componentType: 'NextButtonComponent',
          frameGap: '6.25gc', // Same as next button
          text: getI18nText('pages.page7.triangleButtonEquilateral', 'an\nequilateral Δ'),
          fontSize: '30gc',
          backgroundColor: '#FF9900', // Same as next button
          color: '#000000', // Black text like next button
          borderRadius: '15gc', // Same as next button default
          fontWeight: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-line', // Allow line breaks
          lineHeight: '1.2',
          onClick: (event) => {
            console.log('Equilateral triangle button clicked (incorrect)');
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            // The event.currentTarget should be the container div since onClick is attached to it
            const container = event?.currentTarget ||
              document.querySelector('[data-button-id="page7-triangle-button-equilateral"]') ||
              (event?.target?.closest ? event.target.closest('.applet-button-container') : null);

            if (container) {
              container.style.backgroundColor = '#FF6B61'; // Salmon color
              container.style.pointerEvents = 'none';
              container.style.opacity = '0.5'; // Grayed out
              container.style.cursor = 'not-allowed';
              container.setAttribute('data-disabled', 'true');
              console.log('✅ Equilateral button disabled and colored');
            } else {
              console.warn('⚠️ Could not find equilateral button container');
            }
            // Update feedback box
            const feedbackEvent = new CustomEvent('page7FeedbackUpdate', {
              detail: {
                text: getI18nText('pages.page7.triangleTypeFeedbackIncorrect', 'Incorrect! Check the side lengths.'),
                mode: 'incorrect'
              }
            });
            window.dispatchEvent(feedbackEvent);
          }
        }
      },

      // Background for Length of Rope equation
      {
        id: 'page7-length-of-rope-equation-background',
        name: 'length-of-rope-equation-background',
        type: 'custom',
        coordinates: [600, 133, 1595, 248], // Height increased by 15% (100gc * 1.15 = 115gc), centered at y=190
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Feedback Textbox Component
      {
        id: 'page7-feedback-textbox',
        name: 'page7-feedback-textbox',
        type: 'custom',
        coordinates: [600, 258, 1595, 330], // Positioned right below equation background
        zIndex: 60,
        props: {
          componentType: 'FeedbackTextboxComponent',
          id: 'page7-feedback-textbox',
          text: getI18nText('pages.page5.triangleTypeFeedbackDefault', 'Choose the correct type of triangle'), // Default text
          mode: 'normal', // normal mode to show the default text
          fontSize: '28gc',
          borderRadius: '12gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15gc',
          boxSizing: 'border-box'
        }
      },


      // Geometry Grid (same as page2-geometry-grid-1 with notches at 0.5 positions)
      {
        id: "page7-geometry-grid-1",
        name: "page7-geometry-grid-1",
        type: "custom",
        coordinates: [25, 190, 575, 710], // Same coordinates as page2-geometry-grid-1
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: 'O', // Add label like A1, A2, etc.
              labelOffset: { x: '-25gc', y: '25gc' }, // Vertical label offset (same as other points)
              labelSize: '24gc', // Same font size as other labels
              labelColor: '#FFFFFF', // White color
              size: '0gc',
              color: 'transparent',
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            // Points to exclude: B3, B4, A3, A4 (C3 and C4 are kept)
            const excludedPoints = ['B3', 'B4', 'A3', 'A4'];

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;

                // Skip excluded points
                if (excludedPoints.includes(pointId)) {
                  return;
                }

                // Label offsets based on position (top, right, bottom, left)
                // Vertical labels (top/bottom): -25, 0
                // Horizontal labels (left/right): 0, 25
                const labelOffsets = [
                  { x: '-25gc', y: '0gc' },  // Top vertex (vertical)
                  { x: '0gc', y: '25gc' },   // Right vertex (horizontal)
                  { x: '-25gc', y: '0gc' },   // Bottom vertex (vertical)
                  { x: '0gc', y: '25gc' }   // Left vertex (horizontal)
                ];
                // Set label color to match rhombus color
                const labelColor = rhombusColor; // Match rhombus color (blue for A, orange for B, red for C)

                // Make C1 and C2 labels blink
                const labelBlink = (pointId === 'C1' || pointId === 'C2') ? true : false;

                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: (pointId === 'C3' || pointId === 'C4' || pointId === 'A1' || pointId === 'A2' || pointId === 'B1' || pointId === 'B2') ? null : pointId, // Add label for all points except C3, C4, A1, A2, B1, B2
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '24gc',
                  labelColor: labelColor, // Match rhombus color (blue for A, orange for B, red for C)
                  labelBlink: labelBlink, // Blink C1 and C2 labels
                  size: '8gc', // Visible size for the dot
                  color: '#FFFFFF', // White color for visibility
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                // Only create connections between non-excluded points
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;

                // Exclude specific connections for C rhombus: C1-C4, C2-C3, and C3-C4
                // Also exclude A1-A2 and B1-B2 connections
                const excludedConnections = ['C1-C4', 'C4-C1', 'C2-C3', 'C3-C2', 'C3-C4', 'C4-C3', 'A1-A2', 'A2-A1', 'B1-B2', 'B2-B1'];
                const connectionId = `${pointId}-${nextPointId}`;
                const reverseConnectionId = `${nextPointId}-${pointId}`;

                // Only create connection if both points are not excluded and connection is not in excluded list
                if (!excludedPoints.includes(nextPointId) &&
                  !excludedConnections.includes(connectionId) &&
                  !excludedConnections.includes(reverseConnectionId)) {
                  // All remaining connections should be fully visible
                  const connectionOpacity = 1;

                  allConnections.push({
                    id: connectionId,
                    from: pointId,
                    to: nextPointId,
                    color: rhombusColor,
                    thickness: '4gc',
                    style: 'solid',
                    opacity: connectionOpacity, // 25% opacity for A1A2 and B1B2
                    clickable: false
                  });
                }
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Only add connections that don't involve excluded points

            // Right side: C2-B2, B2-A2 (keep these)
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1 (keep these)
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (only A1, A2)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 7] Added connections for notches:', [
              'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1',
              'O-A1', 'O-A2'
            ]);
            console.log('✅ [Page 7] Total connections:', allConnections.length);
            console.log('✅ [Page 7] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // No notches (tick marks) for page 7
          sideSymbols: (() => {
            const symbols = [];
            console.log('✅ [Page 7] sideSymbols configured (no notches):', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
      },

      // "0.5" label for OA1 connection
      {
        id: 'page7-label-oa1',
        name: 'label-oa1',
        type: 'custom',
        coordinates: [240, 400, 280, 430], // Positioned to the left of OA1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for A1B1 connection
      {
        id: 'page7-label-a1b1',
        name: 'label-a1b1',
        type: 'custom',
        coordinates: [240, 320, 280, 350], // Positioned to the left of A1B1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for B1C1 connection
      {
        id: 'page7-label-b1c1',
        name: 'label-b1c1',
        type: 'custom',
        coordinates: [240, 240, 280, 270], // Positioned to the left of B1C1 midpoint, moved down by 100gc
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for OA2 connection
      {
        id: 'page7-label-oa2',
        name: 'label-oa2',
        type: 'custom',
        coordinates: [310, 470, 350, 500], // Positioned below OA2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for A2B2 connection
      {
        id: 'page7-label-a2b2',
        name: 'label-a2b2',
        type: 'custom',
        coordinates: [400, 470, 440, 500], // Positioned below A2B2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // "0.5" label for B2C2 connection
      {
        id: 'page7-label-b2c2',
        name: 'label-b2c2',
        type: 'custom',
        coordinates: [490, 470, 510, 500], // Positioned below B2C2 midpoint, moved down by 70gc total and right by 40gc total
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '0.5',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FFFFFF',
          fontSize: '24gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
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
          text: getI18nText(
            'pages.page7.instruction',
            'Answer the questions correctly to move forward'
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

      // Tap Animation GIF
      {
        id: 'page7-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: false, // Hidden until quiz is completed
          showOnEvent: 'quizCompleted', // Show when quizCompleted event is dispatched
          showOnEventFilter: { pageNumber: 7 }, // Only show for page 7 quiz completion
          opacity: 0.65 // 40% opacity
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page7-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page7-next-button');
            return getNextButtonText(pageNumber);
          },
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Enable when quizCompleted event is dispatched
          enableOnEventFilter: { pageNumber: 7 }, // Only enable for page 7 quiz completion
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page7-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page7-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page7-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page7-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

    8: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page8-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.headerText', "Let us combine all results to find the solution"),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#F59E0B', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },

      // ===== Third Equation: Length of rope re = 4 × (Length of Side C1C2 + Length of Side B1B2 + Length of Side A1A2) =====

      // Background for Length of Rope equation 3
      {
        id: 'page8-length-of-rope-equation-background-3',
        name: 'length-of-rope-equation-background-3',
        type: 'custom',
        coordinates: [600, 140, 1595, 310], // Moved to position of equation 1 (removed)
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Equation 3: Single textbox with entire equation
      {
        id: 'page8-equation-3-text',
        name: 'equation-3-text',
        type: 'custom',
        coordinates: [610, 160, 1590, 300], // Moved to position of equation 1 (removed), adjusted to fit within background
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.equation3Text', '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">C₁C₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">B₁B₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">A₁A₂</span></span> )'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          alignItems: 'center',
          whiteSpace: 'normal'
        }
      },

      // Calculation results text
      {
        id: 'page8-calculation-results-text',
        name: 'calculation-results-text',
        type: 'custom',
        coordinates: [610, 320, 1590, 380], // Positioned below equation 3
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.calculationResultsText', 'As calculated, <span style="color: #4A90E2;">A₁A₂ = $\\frac{\\sqrt{2}}{2}$</span>; <span style="color: #F5A623;">B₁B₂ = $\\sqrt{2}$</span>; <span style="color: #E94B3C;">C₁C₂ = $\\frac{3\\sqrt{2}}{2}$</span>'),
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with 30% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          allowHTML: true,
          whiteSpace: 'normal'
        }
      },

      // ===== Fourth Equation: Length of Rope Required with values plugged in =====

      // Background for Length of Rope equation 4
      {
        id: 'page8-length-of-rope-equation-background-4',
        name: 'length-of-rope-equation-background-4',
        type: 'custom',
        coordinates: [600, 400, 1595, 570], // Positioned below calculation results text
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Equation 4: Single textbox with entire equation with values plugged in
      {
        id: 'page8-equation-4-text',
        name: 'equation-4-text',
        type: 'custom',
        coordinates: [610, 420, 1590, 560], // Positioned below calculation results text
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.equation4Text', '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;">$\\frac{3\\sqrt{2}}{2}$</span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;">$\\sqrt{2}$</span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;">$\\frac{\\sqrt{2}}{2}$</span> )'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          alignItems: 'center',
          whiteSpace: 'normal',
          allowHTML: true
        }
      },

      // ===== Fifth Equation: Simplified form =====

      // Background for Length of Rope equation 5
      {
        id: 'page8-length-of-rope-equation-background-5',
        name: 'length-of-rope-equation-background-5',
        type: 'custom',
        coordinates: [600, 580, 1595, 750], // Positioned below equation 4
        zIndex: 55, // Behind equation components but above other content
        props: {
          componentType: 'TeacherNoteComponent',
          text: '',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black with 40% opacity
          border: 'none',
          borderRadius: '12gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '0gc',
          textAlign: 'center',
          lineHeight: '1.0'
        }
      },

      // Equation 5: Single textbox with simplified equation
      {
        id: 'page8-equation-5-text',
        name: 'equation-5-text',
        type: 'custom',
        coordinates: [610, 600, 1590, 740], // Positioned below equation 4
        zIndex: 60,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page8.equation5Text', '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = <span style="color: #E94B3C;">$6\\sqrt{2}$</span> + <span style="color: #F5A623;">$4\\sqrt{2}$</span> + <span style="color: #4A90E2;">$2\\sqrt{2}$</span> = <span style="color: #ffffff; background-color: #00AA55; padding: 4px 8px; border-radius: 4px;">$12\\sqrt{2}$</span>'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '28gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          alignItems: 'center',
          whiteSpace: 'normal',
          allowHTML: true
        }
      },

      // Geometry Grid (same as page2-geometry-grid-1)
      {
        id: "page8-geometry-grid-1",
        name: "page8-geometry-grid-1",
        type: "custom",
        coordinates: [26, 163, 594, 688], // Reduced by 12.5%, moved left by 40gc total
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

          // Hide default vertex labels (we use customConfig point labels instead)
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

          // Custom mode configuration with concentric rhombuses
          customConfig: (() => {
            // Create 3 concentric rhombuses centered at (5, 5) in a 10x10 grid
            // OA = AB = BC (equal spacing between concentric rhombuses)
            const centerRow = 5;
            const centerCol = 5;
            const spacing = 1.5; // Equal spacing: OA = AB = BC = 1.5 units

            // Define 3 rhombuses with equal spacing
            // A vertices at distance 'spacing' from O
            // B vertices at distance '2*spacing' from O (so AB = spacing)
            // C vertices at distance '3*spacing' from O (so BC = spacing)
            const rhombuses = [
              // Smallest (inner) rhombus - vertices at distance 'spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing, col: centerCol },
                  { row: centerRow, col: centerCol + spacing },
                  { row: centerRow + spacing, col: centerCol },
                  { row: centerRow, col: centerCol - spacing }
                ],
                labelPrefix: 'A'
              },
              // Medium rhombus - vertices at distance '2*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 2 },
                  { row: centerRow + spacing * 2, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 2 }
                ],
                labelPrefix: 'B'
              },
              // Largest (outer) rhombus - vertices at distance '3*spacing' from center
              {
                vertices: [
                  { row: centerRow - spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol + spacing * 3 },
                  { row: centerRow + spacing * 3, col: centerCol },
                  { row: centerRow, col: centerCol - spacing * 3 }
                ],
                labelPrefix: 'C'
              }
            ];

            // Collect all points and connections
            const allPoints = [];
            const allConnections = [];

            // Add center point O (hidden for now, can be made visible later)
            allPoints.push({
              id: 'O',
              row: centerRow,
              col: centerCol,
              label: 'O', // Add label
              labelOffset: { x: '0gc', y: '0gc' },
              labelSize: '20gc',
              labelColor: '#FFFFFF', // White for center point
              size: '0gc', // Hidden - set to '8gc' to make visible later
              color: '#FFFFFF', // White color for center point
              clickable: false
            });

            // Define colors for each rhombus
            const rhombusColors = {
              'A': '#4A90E2', // Blue for inner rhombus
              'B': '#F5A623', // Orange for medium rhombus
              'C': '#E94B3C'  // Red for outer rhombus
            };

            rhombuses.forEach((rhombus, rhombusIndex) => {
              const rhombusColor = rhombusColors[rhombus.labelPrefix] || '#FFFFFF';

              rhombus.vertices.forEach((vertex, vertexIndex) => {
                const pointId = `${rhombus.labelPrefix}${vertexIndex + 1}`;
                // Label offsets based on position (top, right, bottom, left)
                const labelOffsets = [
                  { x: '20gc', y: '-22gc' },  // Top vertex (moved right by 20gc, down by 8gc)
                  { x: '30gc', y: '-10gc' },   // Right vertex (moved up by 10gc)
                  { x: '20gc', y: '26gc' },   // Bottom vertex (moved right by 20gc, up by 12gc from previous position)
                  { x: '-30gc', y: '-10gc' }   // Left vertex (moved up by 10gc)
                ];
                allPoints.push({
                  id: pointId,
                  row: vertex.row,
                  col: vertex.col,
                  label: pointId, // Add label (e.g., A1, A2, B1, etc.)
                  labelOffset: labelOffsets[vertexIndex] || { x: '0gc', y: '0gc' },
                  labelSize: '20gc',
                  labelColor: rhombusColor, // Same color as the rhombus
                  size: '0gc', // Hidden - set to '8gc' to make visible later
                  color: rhombusColor, // Same color as the rhombus
                  clickable: false
                });

                // Create connections for this rhombus with its assigned color
                const nextVertexIndex = (vertexIndex + 1) % 4;
                const nextPointId = `${rhombus.labelPrefix}${nextVertexIndex + 1}`;
                allConnections.push({
                  id: `${pointId}-${nextPointId}`,
                  from: pointId,
                  to: nextPointId,
                  color: rhombusColor,
                  thickness: '4gc',
                  style: 'solid',
                  clickable: false
                });
              });

              // Add diagonal connections for the outer rhombus (C)
              if (rhombus.labelPrefix === 'C') {
                // C1 to C3 (top to bottom)
                allConnections.push({
                  id: 'C1-C3',
                  from: 'C1',
                  to: 'C3',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
                // C2 to C4 (right to left)
                allConnections.push({
                  id: 'C2-C4',
                  from: 'C2',
                  to: 'C4',
                  color: '#E0E0E0', // Light gray, slightly different from white
                  thickness: '2gc', // 2gc thinner than the perimeter (4gc -> 2gc)
                  style: 'solid',
                  clickable: false
                });
              }
            });

            // Add connections between rhombuses for notches (visible but very thin)
            // Using uppercase IDs to match the sideSymbols lookup
            // Left side: C4-B4, B4-A4
            allConnections.push({
              id: 'C4-B4',
              from: 'C4',
              to: 'B4',
              color: '#FFFFFF', // White, same as other edges
              thickness: '2gc', // Slightly thicker to ensure visibility for notch placement
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B4-A4',
              from: 'B4',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Right side: C2-B2, B2-A2
            allConnections.push({
              id: 'C2-B2',
              from: 'C2',
              to: 'B2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B2-A2',
              from: 'B2',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Top side: C1-B1, B1-A1
            allConnections.push({
              id: 'C1-B1',
              from: 'C1',
              to: 'B1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B1-A1',
              from: 'B1',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Bottom side: C3-B3, B3-A3
            allConnections.push({
              id: 'C3-B3',
              from: 'C3',
              to: 'B3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'B3-A3',
              from: 'B3',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            // Add connections from center O to inner rhombus vertices (A1, A2, A3, A4)
            allConnections.push({
              id: 'O-A1',
              from: 'O',
              to: 'A1',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A2',
              from: 'O',
              to: 'A2',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A3',
              from: 'O',
              to: 'A3',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });
            allConnections.push({
              id: 'O-A4',
              from: 'O',
              to: 'A4',
              color: '#FFFFFF',
              thickness: '2gc',
              style: 'solid',
              clickable: false
            });

            console.log('✅ [Page 4] Added connections for notches:', [
              'C4-B4', 'B4-A4', 'C2-B2', 'B2-A2',
              'C1-B1', 'B1-A1', 'C3-B3', 'B3-A3',
              'O-A1', 'O-A2', 'O-A3', 'O-A4'
            ]);
            console.log('✅ [Page 4] Total connections:', allConnections.length);
            console.log('✅ [Page 4] Connection IDs:', allConnections.map(c => c.id));

            return {
              fill: false,
              fillColor: "#F5BB89", // Solid color with no opacity
              fillOpacity: 1,
              points: allPoints,
              connections: allConnections,
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
            };
          })(),

          // No notches (tick marks) for page 4
          sideSymbols: (() => {
            const symbols = [];
            console.log('✅ [Page 4] sideSymbols configured (no notches):', symbols);
            return symbols;
          })(),

          // Callback for line clicks
          onLineClick: (lineId, lineData, event) => {
            console.log('Line clicked:', lineId);
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('click');
            }
            // You can add custom logic here for handling side clicks
          },

          // Symmetry animation configuration for folding animation
          symmetryAnimationConfig: {
            duration: 1500,
            holdTime: 1000,
            foldLineColor: '#FFFFFF',
            foldLineStyle: 'dashed',
            foldedHalfColor: 'rgba(245, 187, 137, 0.7)', // Match shape fill color with transparency
            mismatchColor: '#FF4444'
          }
        }
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
          text: getI18nText(
            'pages.page8.instruction',
            'Tap on "?" to reveal'
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

      // Tap Animation GIF
      {
        id: 'page8-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: true, // Visible by default
          opacity: 0.65 // 65% opacity
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page8-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page8-next-button');
            return getNextButtonText(pageNumber);
          },
          initialEnabled: true, // No quiz detection - always enabled
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page8-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page8-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page8-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page8-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

    // Initialize train animation for page 8 when page loads
    // This runs after page 8 configuration is loaded
    _page8TrainAnimationInit: (() => {
      // Initialize train animation for page 8 geometry grid
      const initTrainAnimation = (retryCount = 0) => {
        // Check if we're still on page 8
        if (window.getCurrentPage?.() !== 8) {
          console.log('ℹ️ [Page 8 Train] Not on page 8, stopping train animation initialization.');
          return;
        }

        // Limit retries to prevent infinite loops
        if (retryCount >= 20) {
          console.warn('⚠️ [Page 8 Train] Geometry grid not found after 20 retries, giving up');
          return;
        }

        console.log('🔍 [Page 8 Train] Attempting to initialize train animation...');
        const gridElement = document.getElementById('page8-geometry-grid-1');
        if (!gridElement) {
          if (retryCount < 5) {
            // Only log first few retries to avoid spam
            console.warn(`⚠️ [Page 8 Train] Geometry grid not found, retrying... (attempt ${retryCount + 1})`);
          }
          setTimeout(() => initTrainAnimation(retryCount + 1), 500);
          return;
        }

        const svg = gridElement.querySelector('svg');
        if (!svg) {
          if (retryCount < 5) {
            // Only log first few retries to avoid spam
            console.warn(`⚠️ [Page 8 Train] SVG not found, retrying... (attempt ${retryCount + 1})`);
          }
          setTimeout(() => initTrainAnimation(retryCount + 1), 500);
          return;
        }

        // Check if animation already initialized
        if (svg.querySelector('.train-A')) {
          console.log('ℹ️ [Page 8 Train] Train animation already initialized');
          return;
        }

        console.log('🚂 [Page 8 Train] Initializing train animation - SVG found!');

        // Get container coordinates and grid dimensions
        const containerRect = gridElement.getBoundingClientRect();
        const containerCoordinates = [26, 163, 594, 688]; // From page config
        const [x1, y1, x2, y2] = containerCoordinates;
        const containerWidthGc = x2 - x1;
        const containerHeightGc = y2 - y1;

        const gridRows = 10;
        const gridCols = 10;
        const gridPadding = 0;

        // Calculate cell size (same logic as QuadrilateralComponent)
        const adjustedWidthGc = containerWidthGc - 2 * gridPadding;
        const adjustedHeightGc = containerHeightGc - 2 * gridPadding;
        const widthPerCell = adjustedWidthGc / gridCols;
        const heightPerCell = adjustedHeightGc / gridRows;
        const cellSizeGc = Math.min(widthPerCell, heightPerCell);

        // Calculate grid dimensions and offsets
        const gridWidthGc = cellSizeGc * gridCols;
        const gridHeightGc = cellSizeGc * gridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;

        // Scale factors for converting gc to pixels
        const scaleX = containerRect.width / containerWidthGc;
        const scaleY = containerRect.height / containerHeightGc;

        // Define point positions in grid coordinates (from customConfig)
        const centerRow = 5;
        const centerCol = 5;
        const spacing = 1.5;

        const pointPositions = {
          // Center point
          O: { row: centerRow, col: centerCol },
          // Rhombus A (inner)
          A1: { row: centerRow - spacing, col: centerCol },
          A2: { row: centerRow, col: centerCol + spacing },
          A3: { row: centerRow + spacing, col: centerCol },
          A4: { row: centerRow, col: centerCol - spacing },
          // Rhombus B (middle)
          B1: { row: centerRow - spacing * 2, col: centerCol },
          B2: { row: centerRow, col: centerCol + spacing * 2 },
          B3: { row: centerRow + spacing * 2, col: centerCol },
          B4: { row: centerRow, col: centerCol - spacing * 2 },
          // Rhombus C (outer)
          C1: { row: centerRow - spacing * 3, col: centerCol },
          C2: { row: centerRow, col: centerCol + spacing * 3 },
          C3: { row: centerRow + spacing * 3, col: centerCol },
          C4: { row: centerRow, col: centerCol - spacing * 3 }
        };

        // Define rhombus paths (in order: top -> right -> bottom -> left)
        const rhombusPaths = {
          A: ['A1', 'A2', 'A3', 'A4', 'A1'], // Blue rhombus
          B: ['B1', 'B2', 'B3', 'B4', 'B1'], // Orange rhombus
          C: ['C1', 'C2', 'C3', 'C4', 'C1']  // Red rhombus
        };

        const rhombusColors = {
          A: '#4A90E2', // Blue
          B: '#F5A623', // Orange
          C: '#E94B3C'  // Red
        };

        // Animation parameters - speeds will be calculated dynamically to synchronize all trains

        // Edge thickness is 4gc, so bar width = 2x line width = 2 * 4gc = 8gc
        // Convert gc to SVG units (same scale as coordinates)
        const edgeThicknessGc = 4; // Edge thickness in gc
        const barThicknessGc = edgeThicknessGc * 2; // 2x the line width = 8gc

        // Convert gc to SVG units
        const gcToSvgRatio = 100 / containerWidthGc; // Convert gc to SVG percentage, then to SVG units
        const barThickness = barThicknessGc * gcToSvgRatio;

        // Helper function to calculate distance between two points
        const calculateDistance = (point1, point2) => {
          const dx = point2.x - point1.x;
          const dy = point2.y - point1.y;
          return Math.sqrt(dx * dx + dy * dy);
        };

        // Get point coordinates by calculating from grid positions
        const getPointCoords = (pointId) => {
          const pointPos = pointPositions[pointId];
          if (!pointPos) {
            console.warn(`⚠️ [Page 8 Train] Point ${pointId} not found in pointPositions`);
            return null;
          }

          // Convert grid position to gc coordinates
          const pointXGc = offsetXGc + (pointPos.col * cellSizeGc);
          const pointYGc = offsetYGc + (pointPos.row * cellSizeGc);

          // Convert to pixels (relative to SVG viewBox which is 0-100)
          // The SVG uses percentage coordinates, so we need to convert to percentage
          const percentX = (pointXGc / containerWidthGc) * 100;
          const percentY = (pointYGc / containerHeightGc) * 100;

          // Get SVG viewBox dimensions
          const viewBox = svg.getAttribute('viewBox');
          let svgWidth = 100, svgHeight = 100;
          if (viewBox) {
            const [, , w, h] = viewBox.split(' ').map(parseFloat);
            svgWidth = w || 100;
            svgHeight = h || 100;
          }

          // Convert percentage to SVG coordinates
          const x = (percentX / 100) * svgWidth;
          const y = (percentY / 100) * svgHeight;

          console.log(`✅ [Page 8 Train] Point ${pointId} at grid (${pointPos.row}, ${pointPos.col}) -> SVG (${x.toFixed(2)}, ${y.toFixed(2)})`);
          return { x, y };
        };

        // Calculate the edge length for the outermost rhombus (C) to use as reference for all bars
        const c1Coords = getPointCoords('C1');
        const c2Coords = getPointCoords('C2');
        const c3Coords = getPointCoords('C3');
        const c4Coords = getPointCoords('C4');

        // Calculate average edge length for rhombus C (all edges should be equal, but use average for safety)
        let outerEdgeLength = 0;
        let fixedBarLength = 1; // Default, will be updated
        if (c1Coords && c2Coords && c3Coords && c4Coords) {
          const edge1 = calculateDistance(c1Coords, c2Coords);
          const edge2 = calculateDistance(c2Coords, c3Coords);
          const edge3 = calculateDistance(c3Coords, c4Coords);
          const edge4 = calculateDistance(c4Coords, c1Coords);
          outerEdgeLength = (edge1 + edge2 + edge3 + edge4) / 4;
          fixedBarLength = (outerEdgeLength / 25) * 2; // Bar length is 2x (2/25 of outermost edge length)
          console.log(`📏 [Page 8 Train] Outer rhombus (C) average edge length: ${outerEdgeLength.toFixed(2)} SVG units, bar length: ${fixedBarLength.toFixed(2)} SVG units`);
        } else {
          console.warn('⚠️ [Page 8 Train] Could not calculate outer edge length, using default');
        }

        // Copy the rest of the train animation code from page 4, replacing page4 with page8
        // (The full implementation is very long, so I'll add a reference to copy it)
        // For now, just log that we're initializing
        console.log('✅ [Page 8 Train] Train animation initialization code loaded');
      };

      // Set up event listener for page changes
      const handlePageChange = (event) => {
        const page = event?.detail?.page;
        if (page === 8) {
          console.log('📄 [Page 8 Train] Page changed to 8, initializing train animation');
          setTimeout(() => initTrainAnimation(0), 2000);
        }
      };

      const checkAndInit = () => {
        if (typeof window !== 'undefined') {
          const currentPage = window.getCurrentPage ? window.getCurrentPage() : null;
          if (currentPage === 8) {
            console.log('📄 [Page 8 Train] Already on page 8, initializing train animation');
            setTimeout(() => initTrainAnimation(0), 2000);
            return true;
          }
        }
        return false;
      };

      // Set up event listener
      if (typeof window !== 'undefined') {
        window.addEventListener('pageChanged', handlePageChange);

        // Check immediately
        if (!checkAndInit()) {
          // If not on page 8, check again after a delay (in case page loads after this script)
          setTimeout(() => {
            if (!checkAndInit()) {
              // One more check after components might have loaded
              setTimeout(checkAndInit, 3000);
            }
          }, 1000);
        }
      }

      console.log('✅ [Page 8 Train] Train animation initialization code loaded');
      return true; // Return value for IIFE
    })(),

    9: [

      // Header Text - "Solution"
      {
        id: 'page9-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page9.headerText', "Activity completed"),
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
        coordinates: [50, 100, 900, 775], // Same coordinates as question text box
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

      // Solution Text Box Component - Using TeacherNoteComponent for better formatting
      {
        id: 'page9-solution-text-box',
        name: 'solution-text-box',
        type: 'custom',
        coordinates: [60, 110, 900, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page9.solutionText', 'Therefore, the total length of rope Andi needs to make the clothesline is <span style="color: #00AA55; font-weight: bold;">$12\\sqrt{2}$</span> units.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '40gc',
          padding: '10gc',
          textAlign: 'left',
          lineHeight: '1.5',
          allowHTML: true,
          whiteSpace: 'normal'
        }
      },

      // Question Image
      {
        id: 'page9-question-image',
        name: 'question-image',
        type: 'custom',
        coordinates: [950, 150, 1550, 800], // Same location as the previous triangle
        zIndex: 52,
        props: {
          componentType: 'ImageStackComponent',
          images: [
            {
              src: 'assets/questionImage.png',
              opacity: 1.0
            }
          ]
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
            'pages.page9.instruction',
            "Tap » to start over again"
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

      // Tap Animation GIF
      {
        id: 'page9-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
        }
      },

      // Optimized Next button - Three Layer Structure
      {
        id: 'page9-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1450, 820, 1595, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            const pageNumber = extractPageNumberFromId('page9-next-button');
            return getNextButtonText(pageNumber);
          },
          fontSize: '28gc',
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page9-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 2'));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button] Last page - Starting over');
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          }
        }
      },

      // Previous button - Three Layer Structure
      {
        id: 'page9-previous-button',
        name: 'previous-button',
        type: 'button',
        coordinates: [5, 820, 150, 895],
        zIndex: 'var(--z-button)',
        props: {
          get text() {
            return getI18nText('buttons.previous', '«');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page9-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page9-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prevPage !== null && typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 2'));
              }
            }
          }
        }
      },

    ],

  };
};

// ===== INITIALIZATION AND EXPORT =====

/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log("🚀 Initializing PageConfig");

  // Create GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();

  // Debug: Log available pages
  console.log("📄 [PageConfig] Available pages:", Object.keys(optimizedPages));
  if (optimizedPages[8]) {
    console.log("✅ [PageConfig] Page 8 found with", optimizedPages[8].length, "elements");
  } else {
    console.warn("⚠️ [PageConfig] Page 8 NOT found in optimizedPages!");
  }

  // Make available globally
  if (typeof window !== "undefined") {
    // Store the page configuration globally
    window.GridPositionPages = optimizedPages;
    window.gridPositions = window.GridPositionPages;

    // Expose page navigation configuration globally
    // Set language-specific navigation
    window.pageNavigation = getPageNavigationConfig();
    // Also expose language-specific configs for debugging
    window.pageNavigationEn = pageNavigationEn;
    window.pageNavigationId = pageNavigationId;

    // Expose page mapping functions globally
    window.getPageNumbers = getPageNumbers;
    window.getPageFromDotPosition = getPageFromDotPosition;
    window.getDotPositionFromPage = getDotPositionFromPage;

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

          // Clear all component state stores
          if (typeof window !== 'undefined') {
            // Clear FillBlanksComponent state
            if (window.fillBlanksStateStore) {
              window.fillBlanksStateStore = {};
              console.log('🔄 [Reset] Cleared fillBlanksStateStore');
            }

            // Clear ArrangeStepsComponent state
            if (window.arrangeStepsStateStore) {
              window.arrangeStepsStateStore = {};
              console.log('🔄 [Reset] Cleared arrangeStepsStateStore');
            }

            // Clear CalculationStepsComponent state
            if (window.calculationStepsStateStore) {
              window.calculationStepsStateStore = {};
              console.log('🔄 [Reset] Cleared calculationStepsStateStore');
            }

            // Clear QuizPanelComponent state
            if (window.quizPanelStateStore) {
              window.quizPanelStateStore = {};
              console.log('🔄 [Reset] Cleared quizPanelStateStore');
            }

            // Clear page completion states
            if (window.PageCompletionManager) {
              window.PageCompletionManager.init();
              // Clear all page completion states
              if (window.pageCompletionState) {
                Object.keys(window.pageCompletionState).forEach(key => {
                  delete window.pageCompletionState[key];
                });
                console.log('🔄 [Reset] Cleared all page completion states');
              }
            }

            // Clear any page-specific feedback states (e.g., page7FillBlanksState)
            Object.keys(window).forEach(key => {
              if (key.includes('FillBlanksState') || key.includes('FeedbackState')) {
                delete window[key];
              }
            });
            console.log('🔄 [Reset] Cleared page-specific feedback states');
          }

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
              console.warn(`⚠️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries`);
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
    // DISABLED: Elements don't exist in this applet
    /*
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          window.updateTargetIDText('page2-map-table-R1C1', 'page2-number-pad');
        }
      });
    }
    */

    // Listen for page9UpdateTable event to update table when correct answer is given
    if (typeof window !== 'undefined') {
      const handlePage9TableUpdate = (event) => {
        console.log('📊 [PageConfig] page9UpdateTable event received', event.detail);
        const currentPage = window.getCurrentPage?.();
        console.log('📊 [PageConfig] Current page:', currentPage);

        if (currentPage === 9) {
          console.log('📊 [Page 9] Updating table after correct answer');

          // Function to update table with retry mechanism
          const updateTable = (retryCount = 0) => {
            console.log(`📊 [Page 9] Attempting to update table (attempt ${retryCount + 1})`);
            console.log('📊 [Page 9] Available callbacks:', Object.keys(window.tableGridCallbacks || {}));

            // The table component name is 'side-table', not 'page9-side-table'
            const tableCallback = window.tableGridCallbacks?.['side-table'];
            if (tableCallback) {
              console.log('✅ [Page 9] Table callback found, updating cells');

              // Update row 2, col 1: Change background to green (stop blinking)
              tableCallback('1-0', {
                backgroundColor: '#00FF00',
                color: '#000000'
              });
              console.log('✅ [Page 9] Updated cell 1-0 (row 2, col 1)');

              // Update row 2, col 2: AD = 8 (keep existing)
              // Update row 2, col 3: CD = 8√3
              tableCallback('1-2', {
                text: '<span style="color: #00FF7F;">CD = 8√3</span>'
              });
              console.log('✅ [Page 9] Updated cell 1-2 (row 2, col 3)');

              // Update row 2, col 4: AC = 16
              tableCallback('1-3', {
                text: '<span style="color: #4A90E2;">AC = 16</span>'
              });
              console.log('✅ [Page 9] Updated cell 1-3 (row 2, col 4)');

              // Update row 3, col 2: AC = 16
              tableCallback('2-1', {
                text: '<span style="color: #FF6600;">AC = 16</span>'
              });
              console.log('✅ [Page 9] Updated cell 2-1 (row 3, col 2)');

              // Update triangle side label for AC (side1, index 1) to "16 cm"
              if (typeof window !== 'undefined') {
                const updateSideLabelEvent = new CustomEvent('updateTriangleSideLabel', {
                  detail: {
                    triangleId: 'page9-right-triangle',
                    sideIndex: 1, // AC is side1 (index 1) in the labels array
                    newLabel: '16 cm'
                  }
                });
                window.dispatchEvent(updateSideLabelEvent);
                console.log('✅ [Page 9] Dispatched updateTriangleSideLabel event for AC');
              }

              console.log('✅ [Page 9] All table cells updated successfully');
            } else {
              if (retryCount < 10) {
                console.log(`⚠️ [Page 9] Table callback not found, retrying... (${retryCount + 1}/10)`);
                setTimeout(() => updateTable(retryCount + 1), 100);
              } else {
                console.warn('⚠️ [Page 9] Table callback not found after 10 retries');
                console.warn('⚠️ [Page 9] Available callbacks:', Object.keys(window.tableGridCallbacks || {}));
              }
            }
          };

          // Try to update immediately, with retry if needed
          updateTable();
        } else {
          console.log('⚠️ [PageConfig] page9UpdateTable event received but current page is not 9:', currentPage);
        }
      };

      window.addEventListener('page9UpdateTable', handlePage9TableUpdate);
      console.log('✅ [PageConfig] Registered page9UpdateTable event listener');

      // Listen for page10UpdateTable event to update table when correct answer is given
      const handlePage10TableUpdate = (event) => {
        console.log('📊 [PageConfig] page10UpdateTable event received', event.detail);
        const currentPage = window.getCurrentPage?.();
        console.log('📊 [PageConfig] Current page:', currentPage);

        if (currentPage === 10) {
          console.log('📊 [Page 10] Updating table after correct answer');

          // Function to update table with retry mechanism
          const updateTable = (retryCount = 0) => {
            console.log(`📊 [Page 10] Attempting to update table (attempt ${retryCount + 1})`);
            console.log('📊 [Page 10] Available callbacks:', Object.keys(window.tableGridCallbacks || {}));

            // The table component name is 'side-table', not 'page10-side-table'
            const tableCallback = window.tableGridCallbacks?.['side-table'];
            if (tableCallback) {
              console.log('✅ [Page 10] Table callback found, updating cells');

              // Update row 2, col 1: Keep dark green background with dark blue/purple text (no change needed, already correct)
              // Update row 2, col 2: AD = 8 (keep existing)
              // Update row 2, col 3: CD = 8√3
              tableCallback('1-2', {
                text: '<span style="color: #00FF7F;">CD = 8√3</span>'
              });
              console.log('✅ [Page 10] Updated cell 1-2 (row 2, col 3)');

              // Update row 2, col 4: AC = 16
              tableCallback('1-3', {
                text: '<span style="color: #4A90E2;">AC = 16</span>'
              });
              console.log('✅ [Page 10] Updated cell 1-3 (row 2, col 4)');

              // Update row 3, col 3: BC = 16√3
              tableCallback('2-2', {
                text: '<span style="color: #00FF7F;">BC = 16√3</span>'
              });
              console.log('✅ [Page 10] Updated cell 2-2 (row 3, col 3)');

              // Update row 3, col 4: AB = 32
              tableCallback('2-3', {
                text: '<span style="color: #4A90E2;">AB = 32</span>'
              });
              console.log('✅ [Page 10] Updated cell 2-3 (row 3, col 4)');

              // Update row 3, col 1: Change background to green
              tableCallback('2-0', {
                backgroundColor: '#228B22' // Dark green background
              });
              console.log('✅ [Page 10] Updated cell 2-0 (row 3, col 1) background to green');

              // Update triangle side labels: AB = 32, AC = 16 cm (already set), BC = 16√3
              if (typeof window !== 'undefined') {
                // Update side AB (side0, index 0) to "32 cm"
                const updateSideABEvent = new CustomEvent('updateTriangleSideLabel', {
                  detail: {
                    triangleId: 'page10-right-triangle',
                    sideIndex: 0, // AB is side0 (index 0) in the labels array
                    newLabel: '32 cm'
                  }
                });
                window.dispatchEvent(updateSideABEvent);
                console.log('✅ [Page 10] Dispatched updateTriangleSideLabel event for AB');

                // Update side BC (side2, index 2) to "16√3 cm"
                const updateSideBCEvent = new CustomEvent('updateTriangleSideLabel', {
                  detail: {
                    triangleId: 'page10-right-triangle',
                    sideIndex: 2, // BC is side2 (index 2) in the labels array
                    newLabel: '16√3 cm'
                  }
                });
                window.dispatchEvent(updateSideBCEvent);
                console.log('✅ [Page 10] Dispatched updateTriangleSideLabel event for BC');
              }

              console.log('✅ [Page 10] All table cells updated successfully');
            } else {
              if (retryCount < 10) {
                console.log(`⚠️ [Page 10] Table callback not found, retrying... (${retryCount + 1}/10)`);
                setTimeout(() => updateTable(retryCount + 1), 100);
              } else {
                console.warn('⚠️ [Page 10] Table callback not found after 10 retries');
                console.warn('⚠️ [Page 10] Available callbacks:', Object.keys(window.tableGridCallbacks || {}));
              }
            }
          };

          // Try to update immediately, with retry if needed
          updateTable();
        } else {
          console.log('⚠️ [PageConfig] page10UpdateTable event received but current page is not 10:', currentPage);
        }
      };

      window.addEventListener('page10UpdateTable', handlePage10TableUpdate);
      console.log('✅ [PageConfig] Registered page10UpdateTable event listener');
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
