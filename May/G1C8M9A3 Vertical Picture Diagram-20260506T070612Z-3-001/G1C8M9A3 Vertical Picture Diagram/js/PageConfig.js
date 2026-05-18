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
  4: { prev: 3, next: null },
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
    return getI18nText("buttons.startOver", "");
  }
  return getI18nText("buttons.next", "");
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
      // title text
      {
        id: "page1-title-text",
        name: "page1-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // maintext
      {
        id: "page1-main-text",
        name: "page1-main-text",
        type: "custom",
        coordinates: [200, 160, 1400, 600], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page1.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page1-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [650, 650, 700, 800],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page1-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 650, 950, 750],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.start");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page1-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonPage2", ""),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver", ""),
              );
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
        },
      },
    ],

    2: [
      //put each part text
      {
        id: 'page2-put-each-text',
        name: 'page2-put-each-text',
        type: 'custom',
        coordinates: [10, 10, 900, 150], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.eachPartText", ""),
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: 'orange',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      //  background container for question text
      {
        id: 'page2-question-background',
        name: 'page2-question-background',
        type: 'custom',
        coordinates: [5, 150, 900, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#0A283E', // 40% opacity black
          border: '3px solid #0762a4b9',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      //drop background
      {
        id: 'page2-drop-background',
        name: 'page2-drop-background',
        type: 'custom',
        coordinates: [905, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#0A283E', // 40% opacity black
          border: '3px solid #0762a4b9',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      // Fill Blanks Component for Improper Fraction Notation
      {
        id: 'page2-fill-blanks',
        name: 'fill-blanks-component',
        type: 'custom',
        coordinates: [5, 585, 1075, 875],
        zIndex: 60,
        props: {
          componentType: 'FillBlanksComponent',
          get blanks() {
            return [
              // Opening parenthesis before first blank
              // Blank 1: denominator (first in numerator) - reduced by 25gc (275x75)
              { id: 'blank1', coordinate: [920, 20, 1580, 120], text: getI18nText("common.fillBlanks.placeholderTitle", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              // Blank 2: × (multiplication sign) - same size as opt5 (60x60), now a droppable blank
              { id: 'blank2', coordinate: [920, 130, 1075, 550], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank3', coordinate: [1085, 130, 1245, 550], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank4', coordinate: [1255, 130, 1415, 550], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank5', coordinate: [1425, 130, 1580, 550], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank6', coordinate: [920, 560, 1075, 700], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank7', coordinate: [1085, 560, 1245, 700], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank8', coordinate: [1255, 560, 1415, 700], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },
              { id: 'blank9', coordinate: [1425, 560, 1580, 700], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: "", bgColor: '#0B4459', borderColor: 'transparent', bgBlink: false },


            ];
          },
          blankBorderWidth: '3gc',
          blankBorderColor: '#FF8C00', // Orange dashed border
          blankBorderType: 'dashed',
          blankBorderRadius: '12gc',
          blankBackgroundColor: '#4a4846c6', // Slightly darker brown for blanks
          blankFontSize: '34gc',
          blankFontColor: '#fffffff', // White text
          optionsContainerCoordinates: [1100, 150, 1595, 815], // Right side for options
          optionsBorderWidth: '0gc',
          optionsBorderColor: 'transparent',
          optionsBorderType: 'solid',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 0,
          optionContainerInstructionText: '',
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: 'transparent', // Default color (will be overridden per option)
          optionButtonFontSize: '32gc',
          optionButtonFontColor: '#ffffff', // White text
          optionButtonLayoutMode: 'manual',
          optionsRows: 3,
          optionsColumns: 2,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND',
          retainOptionButtonStyle: true, // Retain option button colors when dropped into blanks
          keepOptionStyleWhenPlaced: true, // Keep option button style when correctly placed (disable drag but keep style)
          allowMultiBlankPlacement: true, // Allow options to be placed in multiple blanks (opt3 can go into blank1 and blank4)
          options: getI18nText("pages.page2.fillBlanks.options"),
          columnPairs: getI18nText("pages.page2.fillBlanks.columnPairs"),
          impFormulae: []
        }
      },
      //vertical picture diagram text
      {
        id: 'page2-vertical-picture-diagram-text',
        name: 'page2-vertical-picture-diagram-text',
        type: 'custom',
        coordinates: [920, 720, 1580, 800], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.verticalTextDiagram", ""),
          backgroundColor: '', // 40% opacity black
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          allowHTML: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page2-feedback-textbox",
        name: "page2-feedback-textbox-unique",
        type: "custom",
        coordinates: [15, 640, 890, 800], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page2-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "34gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
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
          id: 'page2-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page2.footerInstruction", ""),
          backgroundColor: '#6663636f',
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
          imageAlt: getI18nText("common.tapAlt", ""),
          initialVisible: false
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
            if (nav && nav.next !== null && typeof window !== 'undefined') {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                console.log('📄 [Next Button]', getI18nText('messages.navigationToPage3', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', ''));
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
            return getI18nText('buttons.previous', '');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

    ],
    3: [

      //drop background
      {
        id: 'page3-drop-background',
        name: 'page3-drop-background',
        type: 'custom',
        coordinates: [440, 10, 1595, 810], // Same coordinates as question text box
        zIndex: 49, // Behind the text box
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty text, just for background
          backgroundColor: '#193a51b9', // 40% opacity black
          border: '3px solid #0762a4b9',
          borderRadius: '15gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },
      // Completed diagram - reads state from page 2; layout centered in page3-drop-background [440,10,1595,810]
      // X: page2 diagram (920-1580) shifted -232 to center 660px width in 1155px panel. Y: +10 to vertically center 780px stack in 800px panel.
      {
        id: 'page3-completed-diagram',
        name: 'page3-completed-diagram',
        type: 'custom',
        coordinates: [440, 10, 1595, 810],
        zIndex: 51,
        props: {
          componentType: 'FillBlanksComponent',
          readFromPageState: 'page2-fill-blanks', // Read filled state from page 2
          readOnly: true, // Disable all interaction
          get blanks() {
            return [
              { id: 'blank1', coordinate: [688, 30, 1348, 130], text: getI18nText("common.fillBlanks.placeholderTitle", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank2', coordinate: [688, 140, 843, 560], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank3', coordinate: [853, 140, 1013, 560], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank4', coordinate: [1023, 140, 1183, 560], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank5', coordinate: [1193, 140, 1348, 560], text: getI18nText("common.fillBlanks.placeholderPictures", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank6', coordinate: [688, 570, 843, 710], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank7', coordinate: [853, 570, 1013, 710], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank8', coordinate: [1023, 570, 1183, 710], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
              { id: 'blank9', coordinate: [1193, 570, 1348, 710], text: getI18nText("common.fillBlanks.placeholderLabel", ""), image: '', bgColor: '#0B4459', borderColor: 'transparen', bgBlink: false },
            ];
          },
          blankBorderWidth: '3gc',
          blankBorderColor: '#FF8C00',
          blankBorderType: 'dashed',
          blankBorderRadius: '12gc',
          blankBackgroundColor: '#4a4846c6',
          blankFontSize: '34gc',
          blankFontColor: '#ffff',
          showOptionsContainer: false, // Hide options - all placed
          showFeedback: false,
          mode: 'DND',
          options: getI18nText("pages.page2.fillBlanks.options"), // Use same options for rendering
          columnPairs: getI18nText("pages.page2.fillBlanks.columnPairs"),
        }
      },
      // Vertical picture diagram text label (centered with diagram block in drop-background)
      {
        id: 'page3-vertical-picture-diagram-text',
        name: 'page3-vertical-picture-diagram-text',
        type: 'custom',
        coordinates: [688, 730, 1348, 810],
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText("pages.page2.verticalTextDiagram", ""),
          backgroundColor: '',
          border: 'none',
          borderRadius: '15gc',
          textColor: '#ffff',
          fontSize: '43gc',
          padding: '0gc',
          textAlign: 'center',
          allowHTML: true
        }
      },
      // Feedback Textbox Component
      {
        id: "page3-feedback-textbox",
        name: "page3-feedback-textbox-unique",
        type: "custom",
        coordinates: [15, 240, 430, 600], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page3-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: getI18nText("pages.page3.summaryText", ""),
          mode: "summary", // Normal mode by default - will be updated by FillBlanksComponent

          fontSize: "44gc",
          borderRadius: "12gc",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "15gc",
          boxSizing: "border-box",
          textColor: '#ffff',
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
          id: 'page3-instruction-text',
          componentType: 'SectionHeaderComponent',
          text: getI18nText("pages.page3.footerInstruction", ""),
          backgroundColor: '#6663636f',
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
          imageAlt: getI18nText("common.tapAlt", ""),

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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage3', ''));
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              console.log('🔄 [Next Button]', getI18nText('messages.lastPageStartingOver', ''));
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
            return getI18nText('buttons.previous', '');
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', ''));
              }
            }
          }
        }
      },

    ],

    4: [
      // title text
      {
        id: "page4-title-text",
        name: "page4-title-text",
        type: "custom",
        coordinates: [200, 25, 1400, 125], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.title", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "var(--color-gold)",
          fontSize: "50gc",
          padding: "15gc",
          allowHTML: true,
        },
      },
      // Live diagram from page 2 order (same as page3-completed-diagram, scaled into left column)
      {
        id: 'page4-completed-diagram',
        name: 'page4-completed-diagram',
        type: 'custom',
        coordinates: [100, 70, 1000, 780],
        zIndex: 51,
        props: {
          componentType: 'FillBlanksComponent',
          readFromPageState: 'page2-fill-blanks',
          readOnly: true,
          get blanks() {
            // Map page3 diagram coords [440,10,1595,810] -> this box [100,60,800,810] (scale + translate)
            const sx = 800 / 1055;
            const sy = 700 / 750;
            const map = (x1, y1, x2, y2) => [
              Math.round(100 + (x1 - 440) * sx),
              Math.round(60 + (y1 - 10) * sy),
              Math.round(100 + (x2 - 440) * sx),
              Math.round(60 + (y2 - 10) * sy),
            ];
            const page4BlankMinX = 100;
            const page4BlankMaxX = 800;
            const page4GridCols =
              typeof gridPositions !== 'undefined' &&
              gridPositions.gridDimensions &&
              gridPositions.gridDimensions.columns
                ? gridPositions.gridDimensions.columns
                : 1600;
            /** Shift left: 25gc + 5gc + 50gc (page grid units via GridCellFontUtils) */
            const page4DxLeftGc = (() => {
              const winW =
                typeof window !== 'undefined' && window.innerWidth ? window.innerWidth : 1600;
              const winH =
                typeof window !== 'undefined' && window.innerHeight ? window.innerHeight : 1080;
              const toPx = (gcStr) => {
                if (
                  typeof window !== 'undefined' &&
                  window.GridCellFontUtils &&
                  typeof window.GridCellFontUtils.convertGcToPixels === 'function'
                ) {
                  const pxStr = window.GridCellFontUtils.convertGcToPixels(gcStr, 'marginLeft');
                  const n = parseFloat(String(pxStr).replace(/px/gi, '').trim(), 10);
                  if (Number.isFinite(n) && n > 0) return n;
                }
                const units = parseInt(String(gcStr).replace(/gc/gi, ''), 10) || 0;
                return (winH / 900) * units;
              };
              const px = toPx('25gc') + toPx('5gc') + toPx('50gc');
              return (px / winW) * page4GridCols;
            })();
            const shiftBlankLeft = (x1, y1, x2, y2) => {
              let nx1 = Math.round(x1 - page4DxLeftGc);
              let nx2 = Math.round(x2 - page4DxLeftGc);
              if (nx1 < page4BlankMinX) {
                const pad = page4BlankMinX - nx1;
                nx1 += pad;
                nx2 += pad;
              }
              if (nx2 > page4BlankMaxX) {
                const pad = nx2 - page4BlankMaxX;
                nx1 -= pad;
                nx2 -= pad;
              }
              return [nx1, y1, nx2, y2];
            };
            /** No horizontal widening — preserve column gaps */
            const widenBlankX = (x1, y1, x2, y2) => [x1, y1, x2, y2];
            const b = (...args) => {
              const [x1, y1, x2, y2] = shiftBlankLeft(...widenBlankX(...map(...args)));
              return { coordinate: [x1, y1, x2, y2], text: '', image: '', bgColor: '#474542b3', borderColor: '#2c251c', bgBlink: false };
            };
            return [
              { id: 'blank1', ...b(588, 80, 1349, 180), text: getI18nText("common.fillBlanks.placeholderTitle", ""), bgColor: '#0B4459' },
              { id: 'blank2', ...b(588, 200, 765, 600), text: getI18nText("common.fillBlanks.placeholderPictures", ""), bgColor: '#0B4459' },
              { id: 'blank3', ...b(783, 200, 960, 600), text: getI18nText("common.fillBlanks.placeholderPictures", ""), bgColor: '#0B4459' },
              { id: 'blank4', ...b(978, 200, 1155, 600), text: getI18nText("common.fillBlanks.placeholderPictures", ""), bgColor: '#0B4459' },
              { id: 'blank5', ...b(1173, 200, 1349, 600), text: getI18nText("common.fillBlanks.placeholderPictures", ""), bgColor: '#0B4459' },
              { id: 'blank6', ...b(588, 620, 765, 740), text: getI18nText("common.fillBlanks.placeholderLabel", ""), bgColor: '#0B4459' },
              { id: 'blank7', ...b(783, 620, 960, 740), text: getI18nText("common.fillBlanks.placeholderLabel", ""), bgColor: '#0B4459' },
              { id: 'blank8', ...b(978, 620, 1155, 740), text: getI18nText("common.fillBlanks.placeholderLabel", ""), bgColor: '#0B4459' },
              { id: 'blank9', ...b(1173, 620, 1349, 740), text: getI18nText("common.fillBlanks.placeholderLabel", ""), bgColor: '#0B4459' },
            ];
          },
          blankBorderWidth: '0gc',
          blankBorderColor: '#0B4459',
          blankBorderType: 'dashed',
          blankBorderRadius: '12gc',
          blankBackgroundColor: '#0B4459',
          blankFontSize: '34gc',
          blankFontColor: '#ffff',
          showOptionsContainer: false,
          showFeedback: false,
          mode: 'DND',
          options: getI18nText('pages.page2.fillBlanks.options'),
          columnPairs: getI18nText('pages.page2.fillBlanks.columnPairs'),
        }
      },
      // maintext
      {
        id: "page4-main-text",
        name: "page4-main-text",
        type: "custom",
        coordinates: [850, 120, 1550, 420], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.mainText", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // maintext 2
      {
        id: "page4-main-text-2",
        name: "page4-main-text-2",
        type: "custom",
        coordinates: [850, 350, 1550, 750], // Positioned below question text box
        zIndex: 55,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page4.mainText2", ""),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "15gc",
          textColor: "#ffff",
          fontSize: "50gc",
          padding: "15gc",
          allowHtml: true,
        },
      },
      // Tap Animation GIF
      {
        id: "page4-tap-animation",
        name: "tap-animation",
        type: "custom",
        coordinates: [775, 800, 825, 850],
        zIndex: "999",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", ""),
          opacity: 0.65,
        },
      },

      // Optimized Next button - Three Layer Structure
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [650, 750, 950, 850],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const pageNumber = extractPageNumberFromId("page4-next-button");
            const nav = getPageNavigation(pageNumber);
            if (nav && nav.next !== null && typeof window !== "undefined") {
              if (window.changePageAndNotify) {
                window.changePageAndNotify(nav.next);
              } else if (window.navigateToPage) {
                window.navigateToPage(nav.next);
              } else {
                window.dispatchEvent(
                  new CustomEvent("pageChanged", {
                    detail: { page: nav.next },
                  }),
                );
                console.log(
                  "📄 [Next Button]",
                  getI18nText("messages.nextButtonPage4", ""),
                );
              }
            } else if (nav && nav.next === null) {
              // On last page, "Start Over" functionality
              window.location.reload();
              console.log(
                "🔄 [Next Button]",
                getI18nText("messages.lastPageStartingOver", ""),
              );
              if (window.advanceToNextQuestion) {
                window.advanceToNextQuestion();
              } else if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              }
            }
          },
        },
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
            getI18nText("messages.navigationReset", "")
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
            getI18nText("messages.navigationComplete", "")
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
        return getI18nText("buttons.startOver", "");
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
            getI18nText("messages.pageStatesCleared", "")
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
