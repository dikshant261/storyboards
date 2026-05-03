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
  13: { prev: 12, next: 14 },
  14: { prev: 13, next: 15 },
  15: { prev: 14, next: 16 },
  16: { prev: 15, next: 17 },
  17: { prev: 16, next: 18 },
  18: { prev: 17, next: 19 },
  19: { prev: 18, next: 20 },
  20: { prev: 19, next: null }

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
        getI18nText("messages.navigationDispatched", {
          direction,
          targetPage,
        })
      );
    }
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * @param {string} key - Dot-path translation key in AppData.translations
 * @param {Object} [params] - Placeholders for {name} in the string
 */
const getI18nText = (key, params = {}) => {
  return typeof i18n !== "undefined" ? i18n.t(key, params) : "";
};

/**
 * Get page navigation info (previous and next pages)
 * @param {number} pageNumber - Current page number
 * @returns {Object|null} Navigation object with prevPage and nextPage, or null if not found
 */
const getPageNavigation = (pageNumber) => {
  return pageNavigation[pageNumber] || null;
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
    return getI18nText("buttons.startOver");
  }
  // Otherwise show the standard next button text
  return getI18nText("buttons.next");
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
      // Feedback Textbox Component
      {
        id: "page1-title-text",
        name: "page1-title-text",
        type: "custom",
        coordinates: [5, 10, 1595, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page1.title"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "50gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'orange',
          border: 'none',
          lineHeight: "2"
        },
      },
      // Feedback Textbox Component
      {
        id: "page1-feedback-textbox",
        name: "page1-feedback-textbox-unique",
        type: "custom",
        coordinates: [100, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page1.introText"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "50gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'white',
          border: 'none',
          lineHeight: "2"
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 620, 950, 720],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.start");
          },
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
        },
      },

      // Tap GIF Image
      {
        id: "page1-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 650, 750, 750], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
        },
      },

      // // Previous button - Three Layer Structure
      // {
      //   id: "page1-previous-button",
      //   name: "previous-button",
      //   type: "button",
      //   coordinates: [5, 820, 150, 895],
      //   zIndex: "var(--z-button)",
      //   props: {
      //     get text() {
      //       return getI18nText("buttons.previous");
      //     },
      //     onClick: () => {
      //       if (typeof window !== "undefined" && window.playCarClickSound) {
      //         window.playCarClickSound("previous");
      //       }

      //       // Navigate to previous page using navigation config
      //       const nav = pageNavigation[1];
      //       if (nav && nav.prev) {
      //         navigateToPage(nav.prev, "previous");
      //       }
      //     },
      //   },
      // },
      // {
      //   id: "page1-instruction-text",
      //   name: "page1-instruction-text",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page1.instructionText.tapAfterReading"),
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    2: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page2-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 15, 1575, 100], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.headerText'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '46gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox-unique",
        type: "custom",
        coordinates: [150, 100, 1450, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Black background container for question text
      {
        id: 'page2-question-background',
        name: 'page2-question-background',
        type: 'custom',
        coordinates: [10, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#031c2dba', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //table background
      {
        id: 'page2-table-1-background',
        name: 'page2-table-1-background',
        type: 'custom',
        coordinates: [50, 250, 780, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.correctDisabled ? "5gc solid #219150" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          rowSpans: { 4: 1 },
          get opacity() {
            return window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.correctDisabled ? "none" : "auto"
          },

        },
        onClick: () => {
          if (typeof window !== 'undefined' && window.playCarClickSound) {
            window.playCarClickSound('correct');
          }
          window.patternProps.correctDisabled = true;
          window.page2FeedbackState = {
            text: getI18nText("pages.page2.feedback.correct"),
            mode: "correct",
          };

          window.dispatchEvent(
            new CustomEvent("page2FeedbackUpdate", {
              detail: window.page2FeedbackState,
            })
          );
          // 🔥 FORCE UI UPDATE
          if (typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
          }
          const enableNextEvent = new CustomEvent('quizCompleted', {
            detail: {
              pageNumber: 2
            }
          });

          window.dispatchEvent(enableNextEvent);

          requestAnimationFrame(() => {
            window.dispatchEvent(
              new CustomEvent('tableGridStarRowHighlightClear', {
                detail: { tableElementName: 'page2-table-2' }
              })
            );
            window.dispatchEvent(
              new CustomEvent('tableGridStarRowBounce', {
                detail: {
                  tableElementName: 'page2-table-1',
                  dataRowIndex: 1,
                  bounceDurationMs: 2000,
                  glow: 'green'
                }
              })
            );
          });
        }
      },

      //table
      {
        id: "page2-table-1",
        name: "page2-table-1",
        type: "custom",
        coordinates: [90, 305, 740, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page2.questionTable1");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } }, // Merge last row (Key) across both columns
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },



      //table background -2
      {
        id: 'page2-table-2-background',
        name: 'page2-table-2-background',
        type: 'custom',
        coordinates: [820, 250, 1550, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "5gc solid #FF6B61" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "none" : "auto"
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            window.patternProps.wrongDisabled = true;
            window.page2FeedbackState = {
              text: getI18nText("pages.page2.feedback.incorrect"),
              mode: "incorrect",
            };

            window.dispatchEvent(
              new CustomEvent("page2FeedbackUpdate", {
                detail: window.page2FeedbackState,
              })
            );
            // 🔥 FORCE UI UPDATE
            if (typeof window.forceAppUpdate === "function") {
              window.forceAppUpdate();
            }

            // Right diagram: bounce 2000ms then keep red glow + counts until other option is chosen
            requestAnimationFrame(() => {
              window.dispatchEvent(
                new CustomEvent('tableGridStarRowHighlightClear', {
                  detail: { tableElementName: 'page2-table-1' }
                })
              );
              window.dispatchEvent(
                new CustomEvent("tableGridStarRowBounce", {
                  detail: {
                    tableElementName: "page2-table-2",
                    dataRowIndex: 1,
                    bounceDurationMs: 2000,
                    glow: 'red'
                  }
                })
              );
            });
          }
        }
      },

      //table
      {
        id: "page2-table-2",
        name: "page2-table-2",
        type: "custom",
        coordinates: [860, 305, 1510, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page2.questionTable2");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page2-map-table-R1C1': 'incorrect', 'page2-map-table-R1C2': 'correct', ...}
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } }, // Merge last row (Key) across both columns
          mergedHeaders: { 0: { colSpan: 2 } }
        },
      },

      // Instruction Text
      {
        id: 'page2-instruction-text',
        name: 'page2-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page2-instruction-text',
          text: getI18nText('pages.page2.footerInstruction'),
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
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 2 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page2-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            const pageNumber = extractPageNumberFromId('page2-next-button');
            const nav = getPageNavigation(pageNumber);
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            window.patternProps.page3RowsDulled = false;
            window.patternProps.page3CorrectDiagramCountRowIndex = null;
            window.patternProps.page4RowsDulled = false;
            window.patternProps.page4CorrectDiagramCountRowIndex = null;
            window.patternProps.page5Rows34Dulled = false;
            window.patternProps.page5RightPanelSalmonRows12 = false;
            window.patternProps.page5LeftPanelGreenRows12 = false;
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log(
                  getI18nText("messages.nextPageEventDispatched", { page: nav.next })
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText("messages.nextButtonLastPage"));
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
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page2-previous-button');
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
                console.log(
                  getI18nText("messages.previousPageEventDispatched", { page: nav.prev })
                );
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
        coordinates: [5, 15, 1575, 100], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.headerText'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '46gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox-unique",
        type: "custom",
        coordinates: [150, 100, 1450, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Black background container for question text
      {
        id: 'page3-question-background',
        name: 'page3-question-background',
        type: 'custom',
        coordinates: [10, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#031c2dba', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //table background
      {
        id: 'page3-table-1-background',
        name: 'page3-table-1-background',
        type: 'custom',
        coordinates: [50, 250, 780, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "5gc solid #FF6B61" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "none" : "auto"
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            window.patternProps.wrongDisabled = true;
            window.patternProps.page3RowsDulled = true;
            window.page3FeedbackState = {
              text: getI18nText("pages.page3.feedback.incorrect"),
              mode: "incorrect",
            };

            window.dispatchEvent(
              new CustomEvent("page3FeedbackUpdate", {
                detail: window.page3FeedbackState,
              })
            );
            // 🔥 FORCE UI UPDATE
            if (typeof window.forceAppUpdate === "function") {
              window.forceAppUpdate();
            }

          }
        }
      },
      //table
      {
        id: "page3-table-1",
        name: "page3-table-1",
        type: "custom",
        coordinates: [90, 305, 740, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page3.questionTable1");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page3-map-table-R1C1': 'incorrect', 'page3-map-table-R1C2': 'correct', ...}
          get dullDataRowIndices() {
            return window.patternProps.page3RowsDulled ? [1, 2, 3] : null;
          },
          get countOverlayDataRowIndex() {
            const v = window.patternProps.page3CorrectDiagramCountRowIndex;
            return typeof v === 'number' ? v : null;
          },
          get countOverlayGreenGlow() {
            return false;
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } }, // Merge last row (Key) across both columns
          mergedHeaders: { 0: { colSpan: 2 } }
        },
      },
      //table background -2
      {
        id: 'page3-table-2-background',
        name: 'page3-table-2-background',
        type: 'custom',
        coordinates: [820, 250, 1550, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.correctDisabled ? "5gc solid #219150" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.correctDisabled ? "none" : "auto"
          },

        },
        onClick: () => {
          if (typeof window !== 'undefined' && window.playCarClickSound) {
            window.playCarClickSound('correct');
          }
          window.patternProps.correctDisabled = true;
          window.patternProps.page3RowsDulled = true;
          window.patternProps.page3CorrectDiagramCountRowIndex = 0;
          window.page3FeedbackState = {
            text: getI18nText("pages.page3.feedback.correct"),
            mode: "correct",
          };

          window.dispatchEvent(
            new CustomEvent("page3FeedbackUpdate", {
              detail: window.page3FeedbackState,
            })
          );
          // 🔥 FORCE UI UPDATE
          if (typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
          }
          const enableNextEvent = new CustomEvent('quizCompleted', {
            detail: {
              pageNumber: 3
            }
          });

          window.dispatchEvent(enableNextEvent);

        }
      },
      //table
      {
        id: "page3-table-2",
        name: "page3-table-2",
        type: "custom",
        coordinates: [860, 305, 1510, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page3.questionTable2");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page3-map-table-R1C1': 'incorrect', 'page3-map-table-R1C2': 'correct', ...}
          get dullDataRowIndices() {
            return window.patternProps.page3RowsDulled ? [1, 2, 3] : null;
          },
          get countOverlayDataRowIndex() {
            const v = window.patternProps.page3CorrectDiagramCountRowIndex;
            return typeof v === 'number' ? v : null;
          },
          get countOverlayGreenGlow() {
            return typeof window.patternProps.page3CorrectDiagramCountRowIndex === 'number';
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      // Instruction Text
      {
        id: 'page3-instruction-text',
        name: 'page3-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page3-instruction-text',
          text: getI18nText('pages.page3.footerInstruction'),
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
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 3 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page3-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            window.patternProps.page3RowsDulled = false;
            window.patternProps.page3CorrectDiagramCountRowIndex = null;
            const pageNumber = extractPageNumberFromId('page3-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (nav.next === 4) {
                window.patternProps.page4RowsDulled = false;
                window.patternProps.page4CorrectDiagramCountRowIndex = null;
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log(
                  getI18nText("messages.nextPageEventDispatched", { page: nav.next })
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText("messages.nextButtonLastPage"));
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
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page3-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              window.patternProps.page3RowsDulled = false;
              window.patternProps.page3CorrectDiagramCountRowIndex = null;
              window.patternProps.page4RowsDulled = false;
              window.patternProps.page4CorrectDiagramCountRowIndex = null;
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log(
                  getI18nText("messages.previousPageEventDispatched", { page: nav.prev })
                );
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
        coordinates: [5, 15, 1575, 100], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page4.headerText'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '46gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Feedback Textbox Component
      {
        id: "page4-feedback-textbox",
        name: "page4-feedback-textbox-unique",
        type: "custom",
        coordinates: [150, 100, 1450, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page4-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Black background container for question text
      {
        id: 'page4-question-background',
        name: 'page4-question-background',
        type: 'custom',
        coordinates: [10, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#031c2dba', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //table background
      {
        id: 'page4-table-1-background',
        name: 'page4-table-1-background',
        type: 'custom',
        coordinates: [50, 250, 780, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "5gc solid #FF6B61" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "none" : "auto"
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            window.patternProps.wrongDisabled = true;
            window.patternProps.page4RowsDulled = true;
            window.page4FeedbackState = {
              text: getI18nText("pages.page4.feedback.incorrect"),
              mode: "incorrect",
            };

            window.dispatchEvent(
              new CustomEvent("page4FeedbackUpdate", {
                detail: window.page4FeedbackState,
              })
            );
            // 🔥 FORCE UI UPDATE
            if (typeof window.forceAppUpdate === "function") {
              window.forceAppUpdate();
            }

          }
        }
      },
      //table
      {
        id: "page4-table-1",
        name: "page4-table-1",
        type: "custom",
        coordinates: [90, 305, 740, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page4.questionTable1");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page4-map-table-R1C1': 'incorrect', 'page4-map-table-R1C2': 'correct', ...}
          get dullDataRowIndices() {
            return window.patternProps.page4RowsDulled ? [0, 1, 2] : null;
          },
          get countOverlayDataRowIndex() {
            const v = window.patternProps.page4CorrectDiagramCountRowIndex;
            return typeof v === 'number' ? v : null;
          },
          get countOverlayGreenGlow() {
            return false;
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      //table background -2
      {
        id: 'page4-table-2-background',
        name: 'page4-table-2-background',
        type: 'custom',
        coordinates: [820, 250, 1550, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.correctDisabled ? "5gc solid #219150" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.correctDisabled ? "none" : "auto"
          },

        },
        onClick: () => {
          if (typeof window !== 'undefined' && window.playCarClickSound) {
            window.playCarClickSound('correct');
          }
          window.patternProps.correctDisabled = true;
          window.patternProps.page4RowsDulled = true;
          window.patternProps.page4CorrectDiagramCountRowIndex = 3;
          window.page4FeedbackState = {
            text: getI18nText("pages.page4.feedback.correct"),
            mode: "correct",
          };

          window.dispatchEvent(
            new CustomEvent("page4FeedbackUpdate", {
              detail: window.page4FeedbackState,
            })
          );
          // 🔥 FORCE UI UPDATE
          if (typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
          }
          const enableNextEvent = new CustomEvent('quizCompleted', {
            detail: {
              pageNumber: 4
            }
          });

          window.dispatchEvent(enableNextEvent);

        }
      },
      //table
      {
        id: "page4-table-2",
        name: "page4-table-2",
        type: "custom",
        coordinates: [860, 305, 1510, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page4.questionTable2");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page4-map-table-R1C1': 'incorrect', 'page4-map-table-R1C2': 'correct', ...}
          get dullDataRowIndices() {
            return window.patternProps.page4RowsDulled ? [0, 1, 2] : null;
          },
          get countOverlayDataRowIndex() {
            const v = window.patternProps.page4CorrectDiagramCountRowIndex;
            return typeof v === 'number' ? v : null;
          },
          get countOverlayGreenGlow() {
            return typeof window.patternProps.page4CorrectDiagramCountRowIndex === 'number';
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      // Instruction Text
      {
        id: 'page4-instruction-text',
        name: 'page4-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page4-instruction-text',
          text: getI18nText('pages.page4.footerInstruction'),
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
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 4 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page4-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            window.patternProps.page4RowsDulled = false;
            window.patternProps.page4CorrectDiagramCountRowIndex = null;
            const pageNumber = extractPageNumberFromId('page4-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (nav.next === 5) {
                window.patternProps.page5Rows34Dulled = false;
                window.patternProps.page5RightPanelSalmonRows12 = false;
                window.patternProps.page5LeftPanelGreenRows12 = false;
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log(
                  getI18nText("messages.nextPageEventDispatched", { page: nav.next })
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText("messages.nextButtonLastPage"));
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
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page4-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              window.patternProps.page4RowsDulled = false;
              window.patternProps.page4CorrectDiagramCountRowIndex = null;
              if (nav.prev === 3) {
                window.patternProps.page3RowsDulled = false;
                window.patternProps.page3CorrectDiagramCountRowIndex = null;
              }
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log(
                  getI18nText("messages.previousPageEventDispatched", { page: nav.prev })
                );
              }
            }
          }
        }
      },

    ],
    5: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page5-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 15, 1575, 100], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page5.headerText'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '40gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Feedback Textbox Component
      {
        id: "page5-feedback-textbox",
        name: "page5-feedback-textbox-unique",
        type: "custom",
        coordinates: [150, 100, 1450, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page5-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Black background container for question text
      {
        id: 'page5-question-background',
        name: 'page5-question-background',
        type: 'custom',
        coordinates: [10, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#031c2dba', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //table background
      {
        id: 'page5-table-1-background',
        name: 'page5-table-1-background',
        type: 'custom',
        coordinates: [50, 250, 780, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.correctDisabled ? "5gc solid #219150" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.correctDisabled ? "none" : "auto"
          },

        },
        onClick: () => {
          if (typeof window !== 'undefined' && window.playCarClickSound) {
            window.playCarClickSound('correct');
          }
          window.patternProps.correctDisabled = true;
          window.patternProps.page5Rows34Dulled = true;
          window.patternProps.page5RightPanelSalmonRows12 = false;
          window.patternProps.page5LeftPanelGreenRows12 = true;
          window.page5FeedbackState = {
            text: getI18nText("pages.page5.feedback.correct"),
            mode: "correct",
          };

          window.dispatchEvent(
            new CustomEvent("page5FeedbackUpdate", {
              detail: window.page5FeedbackState,
            })
          );
          // 🔥 FORCE UI UPDATE
          if (typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
          }
          const enableNextEvent = new CustomEvent('quizCompleted', {
            detail: {
              pageNumber: 5
            }
          });

          window.dispatchEvent(enableNextEvent);

        }
      },
      //table
      {
        id: "page5-table-1",
        name: "page5-table-1",
        type: "custom",
        coordinates: [90, 305, 740, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page5.questionTable1");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [],
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page5-map-table-R1C1': 'incorrect', 'page5-map-table-R1C2': 'correct', ...}
          get starCellHighlight() {
            if (!window.patternProps.page5LeftPanelGreenRows12) return null;
            return { color: '#219150', dataRowIndices: [0, 1] };
          },
          get dullDataRowIndices() {
            return window.patternProps.page5Rows34Dulled ? [2, 3] : null;
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      //table background -2
      {
        id: 'page5-table-2-background',
        name: 'page5-table-2-background',
        type: 'custom',
        coordinates: [820, 250, 1550, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            if (window.patternProps.wrongDisabled) {
              return "5gc solid salmon";
            }
            return "2gc solid #41a5f7";
          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "none" : "auto"
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            window.patternProps.wrongDisabled = true;
            window.patternProps.page5Rows34Dulled = true;
            window.patternProps.page5LeftPanelGreenRows12 = false;
            window.patternProps.page5RightPanelSalmonRows12 = true;
            window.page5FeedbackState = {
              text: getI18nText("pages.page5.feedback.incorrect"),
              mode: "incorrect",
            };

            window.dispatchEvent(
              new CustomEvent("page5FeedbackUpdate", {
                detail: window.page5FeedbackState,
              })
            );
            // 🔥 FORCE UI UPDATE
            if (typeof window.forceAppUpdate === "function") {
              window.forceAppUpdate();
            }

          }
        }

      },
      //table
      {
        id: "page5-table-2",
        name: "page5-table-2",
        type: "custom",
        coordinates: [860, 305, 1510, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page5.questionTable2");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [],
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page5-map-table-R1C1': 'incorrect', 'page5-map-table-R1C2': 'correct', ...}
          get starCellHighlight() {
            if (!window.patternProps.page5RightPanelSalmonRows12) return null;
            return { color: 'salmon', dataRowIndices: [0, 1] };
          },
          get dullDataRowIndices() {
            return window.patternProps.page5Rows34Dulled ? [2, 3] : null;
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      // Instruction Text
      {
        id: 'page5-instruction-text',
        name: 'page5-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page5-instruction-text',
          text: getI18nText('pages.page5.footerInstruction'),
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
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 5 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page5-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            window.patternProps.page5Rows34Dulled = false;
            window.patternProps.page5RightPanelSalmonRows12 = false;
            window.patternProps.page5LeftPanelGreenRows12 = false;
            window.patternProps.page6SequentialStarCountPanel = null;
            const pageNumber = extractPageNumberFromId('page5-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log(
                  getI18nText("messages.nextPageEventDispatched", { page: nav.next })
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText("messages.nextButtonLastPage"));
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
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page5-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              window.patternProps.page5Rows34Dulled = false;
              window.patternProps.page5RightPanelSalmonRows12 = false;
              window.patternProps.page5LeftPanelGreenRows12 = false;
              if (nav.prev === 4) {
                window.patternProps.page4RowsDulled = false;
                window.patternProps.page4CorrectDiagramCountRowIndex = null;
              }
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log(
                  getI18nText("messages.previousPageEventDispatched", { page: nav.prev })
                );
              }
            }
          }
        }
      },

    ],
    6: [

      // Header Text - "Read the question and identify 'given' and 'to find'"
      {
        id: 'page6-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 15, 1575, 100], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page6.headerText'),
          backgroundColor: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffff', // Golden/yellow color like in the image
          fontSize: '46gc',
          padding: '15gc',
          fontWeight: 'normal'
        }
      },
      // Feedback Textbox Component
      {
        id: "page6-feedback-textbox",
        name: "page6-feedback-textbox-unique",
        type: "custom",
        coordinates: [150, 100, 1450, 220], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page6-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "36gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
        },
      },
      // Black background container for question text
      {
        id: 'page6-question-background',
        name: 'page6-question-background',
        type: 'custom',
        coordinates: [10, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#031c2dba', // 40% opacity black
          border: 'solid',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //table background
      {
        id: 'page6-table-1-background',
        name: 'page6-table-1-background',
        type: 'custom',
        coordinates: [50, 250, 780, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.correctDisabled ? "5gc solid #219150" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.correctDisabled ? "none" : "auto"
          },

        },
        onClick: () => {
          if (typeof window !== 'undefined' && window.playCarClickSound) {
            window.playCarClickSound('correct');
          }
          window.patternProps.correctDisabled = true;
          window.patternProps.page6SequentialStarCountPanel = 'page6-table-1';
          window.page6FeedbackState = {
            text: getI18nText("pages.page6.feedback.correct"),
            mode: "correct",
          };

          window.dispatchEvent(
            new CustomEvent("page6FeedbackUpdate", {
              detail: window.page6FeedbackState,
            })
          );
          // 🔥 FORCE UI UPDATE
          if (typeof window.forceAppUpdate === "function") {
            window.forceAppUpdate();
          }
          const enableNextEvent = new CustomEvent('quizCompleted', {
            detail: {
              pageNumber: 6
            }
          });

          window.dispatchEvent(enableNextEvent);

        }
      },
      //table
      {
        id: "page6-table-1",
        name: "page6-table-1",
        type: "custom",
        coordinates: [90, 305, 740, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.questionTable1");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page6-map-table-R1C1': 'incorrect', 'page6-map-table-R1C2': 'correct', ...}
          get countOverlaySequentialInRows() {
            return window.patternProps.page6SequentialStarCountPanel === 'page6-table-1'
              ? [0, 1, 2, 3]
              : null;
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      //table background -2
      {
        id: 'page6-table-2-background',
        name: 'page6-table-2-background',
        type: 'custom',
        coordinates: [820, 250, 1550, 800], // Same coordinates as question text box
        zIndex: 50, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: 'transparent', // 40% opacity black

          get border() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "5gc solid #FF6B61" : "2gc solid #41a5f7"

          },
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          get opacity() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "0.6" : "1"

          },
          get cursor() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "not-allowed" : "pointer"
          },
          get pointerEvents() {
            return window.patternProps.wrongDisabled || window.patternProps.correctDisabled ? "none" : "auto"
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('wrong');
            }
            window.patternProps.wrongDisabled = true;
            window.patternProps.page6SequentialStarCountPanel = 'page6-table-2';
            window.page6FeedbackState = {
              text: getI18nText("pages.page6.feedback.incorrect"),
              mode: "incorrect",
            };

            window.dispatchEvent(
              new CustomEvent("page6FeedbackUpdate", {
                detail: window.page6FeedbackState,
              })
            );
            // 🔥 FORCE UI UPDATE
            if (typeof window.forceAppUpdate === "function") {
              window.forceAppUpdate();
            }
            // window.dispatchEvent(
            //   new CustomEvent('quizCompleted', {
            //     detail: { pageNumber: 6 }
            //   })
            // );
          }
        }

      },
      //table
      {
        id: "page6-table-2",
        name: "page6-table-2",
        type: "custom",
        coordinates: [860, 305, 1510, 760], // Left side table
        zIndex: 49,
        props: {
          componentType: "TableGridComponent",
          tableData: (() => {
            const baseData = getI18nText("pages.page6.questionTable2");
            return {
              ...baseData,

            };
          })(),
          borderColor: 'black',
          headerBackgroundColor: 'transparent',
          cellBackgroundColor: 'transparent',
          rowBackgroundColors: [], // Array: ['#ff0000', '#00ff00'] or Object: {0: '#ff0000', 2: '#00ff00'}
          columnBackgroundColors: [], // Array: ['#0000ff', '#ffff00'] or Object: {0: '#0000ff', 1: '#ffff00'}
          dataRowBackgroundColors: [], // Array of colors for each data row only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          dataColumnBackgroundColors: ['#4A4E2E', '#605516'], // Array of colors for each data column only (excluding header) [color1, color2, ...] or object {0: color1, 2: color2}
          rowTextColors: [], // Array: ['#000000', '#ffffff'] or Object: {0: '#000000', 2: '#ffffff'}
          rowOverrides: { 4: { color: "#D5A6BD", fontWeight: "bold", backgroundColor: 'transparent' } }, // Object: {1: {backgroundColor: '#FFD700', color: '#000000', fontSize: '28gc', fontWeight: 'bold'}}
          textColor: '#ffffff',
          dataColumnWidths: { 0: '200gc', 1: '520gc' },
          fontSize: '32gc',
          headerFontSize: '44gc',
          padding: '5gc',
          borderRadius: '0gc',
          borderWidth: '3gc',
          rowGap: '0gc', // Gap between rows (in gc units)
          columnGap: '0gc', // Gap between columns (in gc units)
          cellBorderRadius: '0gc', // Border radius for individual cells (in gc units)
          onCellUpdate: null, // Callback function: (cellKey, updates) => void - cellKey format: 'row-col' or 'header-col'
          blinkBgCells: [], // Array of cell keys to blink background: ['0-0', '1-2'] or ['header-0']
          blinkBgRows: [], // Array of row indices to blink background: [0, 1] (data rows only)
          blinkBgColumns: [], // Array of column indices to blink background: [0, 1]
          blinkBorderCells: [], // Array of cell keys to blink border: ['0-0', '1-2'] or ['header-0']
          blinkBorderRows: [], // Array of row indices to blink border: [0, 1] (data rows only)
          blinkBorderColumns: [], // Array of column indices to blink border: [0, 1]
          cellModes: {}, // Object mapping cell IDs to modes: {'page6-map-table-R1C1': 'incorrect', 'page6-map-table-R1C2': 'correct', ...}
          get countOverlaySequentialInRows() {
            return window.patternProps.page6SequentialStarCountPanel === 'page6-table-2'
              ? [0, 1, 2, 3]
              : null;
          },
          sequentialStarCountLayoutRows: [0, 1, 2, 3],
          mergedRows: { 4: { colSpan: 2 } },
          mergedHeaders: { 0: { colSpan: 2 } }

        },
      },
      // Instruction Text
      {
        id: 'page6-instruction-text',
        name: 'page6-instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          id: 'page6-instruction-text',
          text: getI18nText('pages.page6.footerInstruction'),
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
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
          initialVisible: false,
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
          initialEnabled: false, // Disabled until quiz is completed
          enableOnEvent: 'quizCompleted', // Listen for quiz completion
          enableOnEventFilter: { pageNumber: 6 }, // Only enable for specific page

          get text() {
            const pageNumber = extractPageNumberFromId('page6-next-button');
            return getNextButtonText(pageNumber);
          },
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }
            window.patternProps.correctDisabled = false; // Reset for next page
            window.patternProps.wrongDisabled = false; // Reset for next page
            window.patternProps.page6SequentialStarCountPanel = null;
            const pageNumber = extractPageNumberFromId('page6-next-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log(
                  getI18nText("messages.nextPageEventDispatched", { page: nav.next })
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(getI18nText("messages.nextButtonLastPage"));
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
            return getI18nText('buttons.previous');
          },
          get disabled() {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            return isPrevButtonDisabled(pageNumber);
          },
          onClick: () => {
            const pageNumber = extractPageNumberFromId('page6-previous-button');
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.prev !== null && typeof window !== 'undefined') {
              if (nav.prev === 5) {
                window.patternProps.page5Rows34Dulled = false;
                window.patternProps.page5RightPanelSalmonRows12 = false;
                window.patternProps.page5LeftPanelGreenRows12 = false;
              }
              window.patternProps.page6SequentialStarCountPanel = null;
              if (window.playCarClickSound) {
                window.playCarClickSound('previous');
              }
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.prev);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.prev);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.prev } }));
                console.log(
                  getI18nText("messages.previousPageEventDispatched", { page: nav.prev })
                );
              }
            }
          }
        }
      },

    ],
    7: [
      // Feedback Textbox Component
      {
        id: "page7-title-text",
        name: "page7-title-text",
        type: "custom",
        coordinates: [5, 10, 1595, 100], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page7.title"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "50gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'orange',
          border: 'none',
          lineHeight: "2"
        },
      },
      // Feedback Textbox Component
      {
        id: "page7-feedback-textbox",
        name: "page7-feedback-textbox-unique",
        type: "custom",
        coordinates: [100, 100, 1500, 600], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page7.introText"), // Empty text by default - will be updated by FillBlanksComponent
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "50gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: 'white',
          border: 'none',
          lineHeight: "2"
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 620, 950, 720],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver");
          },
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[7];
            window.location.reload();
          },
        },
      },

      // Tap GIF Image
      {
        id: "page7-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [650, 650, 750, 750], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          get imageAlt() {
            return getI18nText("accessibility.tapGifAlt");
          },
        },
      },

      // // Previous button - Three Layer Structure
      // {
      //   id: "page7-previous-button",
      //   name: "previous-button",
      //   type: "button",
      //   coordinates: [5, 820, 150, 895],
      //   zIndex: "var(--z-button)",
      //   props: {
      //     get text() {
      //       return getI18nText("buttons.previous");
      //     },
      //     onClick: () => {
      //       if (typeof window !== "undefined" && window.playCarClickSound) {
      //         window.playCarClickSound("previous");
      //       }

      //       // Navigate to previous page using navigation config
      //       const nav = pageNavigation[1];
      //       if (nav && nav.prev) {
      //         navigateToPage(nav.prev, "previous");
      //       }
      //     },
      //   },
      // },
      // {
      //   id: "page7-instruction-text",
      //   name: "page7-instruction-text",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: getI18nText("pages.page7.instructionText.tapAfterReading"),
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
  };
};

// ===== INITIALIZATION AND EXPORT =====

/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log(getI18nText("messages.pageConfig.initializing"));

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

    // Initialize essential window functions
    console.log(getI18nText("messages.pageConfig.initWindowFunctions"));

    try {
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log(getI18nText("messages.pageConfig.advanceToNextCalled"));
          console.log(getI18nText("messages.pageConfig.treatingAsReload"));

          // Simplified navigation - always reset to 0
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset")
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log(
            getI18nText("messages.pageConfig.updatedQuestionIndex", {
              index: newIndex,
            })
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
        console.log(getI18nText("messages.pageConfig.updatingQuestionElements"));

        // Trigger React re-render by forcing app update
        if (typeof window.forceAppUpdate === "function") {
          window.forceAppUpdate();
          console.log(getI18nText("messages.pageConfig.forceAppUpdateTriggered"));
        } else {
          console.warn(getI18nText("messages.pageConfig.forceAppUpdateUnavailable"));
        }

        // Page 2 removed - no longer needed

        console.log(getI18nText("messages.pageConfig.updateQuestionElementsDone"));
      };

      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText("buttons.startOver");
      };

      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;

      console.log(getI18nText("messages.pageConfig.directAssignmentDone"));
      console.log(
        getI18nText("messages.pageConfig.advanceToNextType", {
          type: typeof window.advanceToNextQuestion,
        })
      );
      console.log(
        getI18nText("messages.pageConfig.updateQuestionDepType", {
          type: typeof window.updateQuestionDependentElements,
        })
      );
    } catch (error) {
      console.error(getI18nText("messages.pageConfig.errorDirectAssignment"), error);
    }

    // Add global function to manually clear page states (for testing)
    window.clearAllPageStates = () => {
      console.log(getI18nText("messages.pageConfig.clearingPageStates"));
      try {
        // Reset global variables
        window.page1complete = false;
        window.objectsremoved = 0;
        window.currentQuestionIndex = 0;

        console.log(getI18nText("messages.pageConfig.pageStatesClearedOk"));

        // Reload the page to start fresh
        if (
          confirm(
            getI18nText("messages.pageStatesCleared")
          )
        ) {
          window.location.reload();
        }
      } catch (error) {
        console.error(getI18nText("messages.pageConfig.errorClearingStates"), error);
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
            console.log(
              getI18nText("messages.pageConfig.readingFromSource", { sourceId }),
              sourceText
            );

            // Try to update number pad target first (if destination is a number pad)
            if (window.numberPadCallbacks && window.numberPadCallbacks[destinationId]) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(
                getI18nText("messages.pageConfig.updatedNumberPad", { destinationId }),
                sourceText
              );
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(
                getI18nText("messages.pageConfig.updatedElement", { destinationId }),
                sourceText
              );
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(
                  getI18nText("messages.pageConfig.destinationRetry", {
                    destinationId,
                    attempt: retryCount + 1,
                    maxRetries,
                  })
                );
                setTimeout(() => {
                  window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
                }, retryDelay);
              } else {
                console.warn(
                  getI18nText("messages.pageConfig.destinationNotFound", {
                    destinationId,
                    maxRetries,
                  })
                );
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(
                getI18nText("messages.pageConfig.sourceRetry", {
                  sourceId,
                  attempt: retryCount + 1,
                  maxRetries,
                })
              );
              setTimeout(() => {
                window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
              }, retryDelay);
            } else {
              console.warn(
                getI18nText("messages.pageConfig.sourceNotFound", {
                  sourceId,
                  maxRetries,
                })
              );
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
        console.error(getI18nText("messages.pageConfig.errorUpdateTarget"), error);
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

    console.log(getI18nText("messages.pageConfig.initComplete"));
    console.log(getI18nText("messages.pageConfig.hintClearStates"));
    console.log(getI18nText("messages.pageConfig.hintUpdateTarget"));
  }

  return optimizedPages;
};

// Initialize immediately
console.log(getI18nText("messages.pageConfig.aboutToInit"));
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  getI18nText("messages.pageConfig.initFinished", {
    resultType: typeof OptimizedGridPositionPages,
  })
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

console.log(getI18nText("messages.pageConfig.optimizationComplete"));