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
  7: { prev: 6, next: 21 },
  8: { prev: 22, next: 9 },
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 14 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: 14 },
  14: { prev: 10, next: 23 },
  15: { prev: 23, next: 16 },
  16: { prev: 15, next: 17 },
  17: { prev: 16, next: 24 },
  18: { prev: 24, next: 19 },
  19: { prev: 18, next: 20 },
  20: { prev: 19, next: 8 },
  21: { prev: 7, next: 22 },
  22: { prev: 21, next: 8 },
  23: { prev: 14, next: 15 },
  24: { prev: 17, next: 18 },
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
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
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
          imageAlt: 'Tap'
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

      // Quiz Panel Component
      {
        id: 'page2-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [50, 100, 1545, 810], // Full width quiz panel
        zIndex: 60,
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page2-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT4R', // For MCQ: QT4R (4 options in rows)
          headerText: '',
          questionText: getI18nText('pages.page2.quizPanel.questionText', 'Given that p, q, and r are Pythagorean triples<br>with p < q < r, choose the correct option.'),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 65,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '50gc',
          optionButtonTextColor: '#000000', // White text color for option buttons
          // Options data for QT4R (4 options in vertical layout)
          get options() {
            const quizPanelData = getI18nText('pages.page2.quizPanel', {});
            if (quizPanelData && quizPanelData.options && Array.isArray(quizPanelData.options) && quizPanelData.options.length > 0) {
              return quizPanelData.options;
            }
            // Fallback - should not be needed if data.js is properly configured
            return [
              {
                text: getI18nText('pages.page2.quizPanel.options.0.text', "p<sup>2</sup> = q<sup>2</sup> + r<sup>2</sup>"),
                feedback: getI18nText('pages.page2.quizPanel.options.0.feedback', "That's not right! Try again."),
                iscorrect: false
              },
              {
                text: getI18nText('pages.page2.quizPanel.options.1.text', "q<sup>2</sup> = p<sup>2</sup> - r<sup>2</sup>"),
                feedback: getI18nText('pages.page2.quizPanel.options.1.feedback', "That's not right! Try again."),
                iscorrect: false
              },
              {
                text: getI18nText('pages.page2.quizPanel.options.2.text', "r<sup>2</sup> = p<sup>2</sup> - q<sup>2</sup>"),
                feedback: getI18nText('pages.page2.quizPanel.options.2.feedback', "That's not right! Try again."),
                iscorrect: false
              },
              {
                text: getI18nText('pages.page2.quizPanel.options.3.text', "r<sup>2</sup> = p<sup>2</sup> + q<sup>2</sup>"),
                feedback: getI18nText('pages.page2.quizPanel.options.3.feedback', "Good!"),
                iscorrect: true
              }
            ];
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
          imageAlt: 'Tap',
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 2 }
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 3'));
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 2 }
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
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
          text: getI18nText(
            'pages.page3.headerText',
            "Let us explore the triplet 24, 17, 25"
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
        coordinates: [10, 100, 1595, 810], // Same coordinates as question text box
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

      // Right Angle Triangle Component
      {
        id: 'page3-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [25, 100, 800, 700], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [3, 5, 6], // Triplet: 3, 5, 6
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Orange lines for all sides
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: getI18nText('pages.page3.triangleLabels.vertexLabels', ['A', 'B', 'C']),
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [75, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          // Calculate rotation angles to be parallel to sides
          // For triangle with sides [3, 5, 6] at bottom-right:
          sideLabel: {
            show: true,
            labels: ['6 cm', '3 cm', '5 cm'], // Side measurements with "cm"
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 55, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 295, 30], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Solution Steps Component - Prove/Disprove Pythagorean Triple
      {
        id: 'page3-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [450, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 700, 500], // Text area within the component
          buttonCoordinates: [725, 575, 1125, 650], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 600, 800, 650], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '28gc',
            color: '#ffffff',
            fontWeight: 'normal',
            textAlign: 'left'
          },
          showCards: true, // Enable card styling for each step
          cardBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          cardBorder: '2gc solid rgba(255, 255, 255, 0.4)',
          cardBorderRadius: '12gc',
          cardPaddingTop: '10gc', // Optional: Top padding
          cardPaddingBottom: '10gc', // Optional: Bottom padding
          cardPaddingLeft: '50gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '20gc', // Optional: Right padding
          cardBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          // Card size control
          cardWidth: '100%', // Card width
          cardMaxWidth: null, // Optional: Maximum width
          cardMinWidth: null, // Optional: Minimum width
          // Step number circle
          showStepNumber: true, // Show step number in a circle on the left edge
          stepNumberSize: '40gc', // Size of the step number circle (diameter)
          stepNumberColor: '#ffffff', // Font color of the step number text
          stepNumberBackgroundColor: 'var(--color-orange)', // Background color of the circle
          stepNumberBorder: '2gc solid #ffffff', // Border of the circle
          stepNumberBorderColor: null, // Optional: Border color
          stepNumberBorderWidth: null, // Optional: Border width
          stepNumberBorderStyle: null, // Optional: Border style
          stepNumberFontSize: '24gc', // Font size of the step number
          stepNumberFontWeight: 'bold', // Font weight of the step number
          // Step explainer props
          explainerFontSize: '24gc', // Font size for step explainers
          explainerColor: 'var(--color-orange)', // Text color for step explainers
          explainerFontWeight: 'normal', // Font weight for step explainers
          explainerFontStyle: 'italic', // Font style for step explainers
          explainerMarginBottom: '24gc', // Margin bottom for step explainers
          // Header configuration
          headerText: getI18nText('pages.page3.calculationSteps.headerText', 'Solution Steps'),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: (() => {
            const stepsData = getI18nText('pages.page3.calculationSteps.steps', []);
            if (!Array.isArray(stepsData) || stepsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              return [
                {
                  type: 'calculation',
                  text: getI18nText('pages.page3.calculationSteps.steps.0.text', 'p = 3, q = 5, r = 6 (since 3 < 5 < 6)'),
                  buttonText: getI18nText('pages.page3.calculationSteps.steps.0.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page3.calculationSteps.steps.1.explainer', 'Calculate p², q², and r²'),
                  text: getI18nText('pages.page3.calculationSteps.steps.1.text', 'p² = 3² = 9, q² = 5² = 25, r² = 6² = 36<br>p² + q² = 9 + 25 = 34'),
                  buttonText: getI18nText('pages.page3.calculationSteps.steps.1.buttonText', 'Compare values')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page3.calculationSteps.steps.2.explainer', 'Compare r² = 36 and p² + q² = 34'),
                  text: getI18nText('pages.page3.calculationSteps.steps.2.text', 'Since 36 ≠ 34, we have r² ≠ p² + q²'),
                  buttonText: getI18nText('pages.page3.calculationSteps.steps.2.buttonText', 'See conclusion')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page3.calculationSteps.steps.3.explainer', 'Conclusion'),
                  text: getI18nText('pages.page3.calculationSteps.steps.3.text', '3, 5, 6 is NOT a Pythagorean triple'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: index === stepsData.length - 1 ? 'answer' : 'calculation',
              ...(step.explainer ? { explainer: step.explainer } : {}),
              text: step.text,
              ...(step.buttonText !== undefined ? { buttonText: step.buttonText } : { buttonText: null })
            }));
          })(),
          blanks: [], // No blanks needed for this proof
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'transparent',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff'
        }
      },

      // Question Table - Compare r² and p² + q²
      {
        id: 'page3-question-table',
        name: 'question-table',
        type: 'custom',
        coordinates: [1150, 100, 1600, 600], // Positioned below solution steps
        zIndex: 61,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: ['r²', 'p² + q²'],
            rows: [
              ['r = 6', 'p = 3 and q = 5'], // Row 1
              ['', ''], // Row 2
              ['', ''], // Row 3
              ['']      // Row 4 - single cell spanning both columns
            ]
          },
          borderColor: '#ffffff',
          headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
          headerTextColor: '#F59E0B', // Orange color for header text
          cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          textColor: '#ffffff',
          fontSize: '28gc',
          headerFontSize: '32gc',
          padding: '10gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          equalColumnWidths: false, // We want custom widths: 35% and 65%
          columnWidths: ['35%', '65%'], // Column 1: 35%, Column 2: 65%
          cellHeight: '60gc', // Fixed cell height to prevent resizing when content changes
          rowGap: '0gc',
          columnGap: '0gc'
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
            "Click on the highlighted button see the solution steps"
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
          imageAlt: 'Tap',
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 3 }
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 4'));
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 3 }
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

      // Header Text - "Let us explore the triplet 7, 13, 11"
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
            "Let us explore the triplet 7 cm, 8 cm, 12 cm"
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
        coordinates: [10, 100, 1595, 810], // Same coordinates as question text box
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

      // Right Angle Triangle Component
      {
        id: 'page4-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [25, 100, 800, 700], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [7, 8, 12], // Triplet: 7, 8, 12
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Orange lines for all sides
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: getI18nText('pages.page4.triangleLabels.vertexLabels', ['A', 'B', 'C']),
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 50, 50], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['12 cm', '7 cm', '8 cm'], // Side measurements with "cm"
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 70, 65], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0],
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Solution Steps Component - Prove/Disprove Pythagorean Triple
      {
        id: 'page4-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [450, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 700, 500], // Text area within the component
          buttonCoordinates: [725, 575, 1125, 650], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 600, 800, 650], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '28gc',
            color: '#ffffff',
            fontWeight: 'normal',
            textAlign: 'left'
          },
          showCards: true, // Enable card styling for each step
          cardBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          cardBorder: '2gc solid rgba(255, 255, 255, 0.4)',
          cardBorderRadius: '12gc',
          cardPaddingTop: '10gc', // Optional: Top padding
          cardPaddingBottom: '10gc', // Optional: Bottom padding
          cardPaddingLeft: '50gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '20gc', // Optional: Right padding
          cardBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          // Card size control
          cardWidth: '100%', // Card width
          cardMaxWidth: null, // Optional: Maximum width
          cardMinWidth: null, // Optional: Minimum width
          // Step number circle
          showStepNumber: true, // Show step number in a circle on the left edge
          stepNumberSize: '40gc', // Size of the step number circle (diameter)
          stepNumberColor: '#ffffff', // Font color of the step number text
          stepNumberBackgroundColor: 'var(--color-orange)', // Background color of the circle
          stepNumberBorder: '2gc solid #ffffff', // Border of the circle
          stepNumberBorderColor: null, // Optional: Border color
          stepNumberBorderWidth: null, // Optional: Border width
          stepNumberBorderStyle: null, // Optional: Border style
          stepNumberFontSize: '24gc', // Font size of the step number
          stepNumberFontWeight: 'bold', // Font weight of the step number
          // Step explainer props
          explainerFontSize: '24gc', // Font size for step explainers
          explainerColor: 'var(--color-orange)', // Text color for step explainers
          explainerFontWeight: 'normal', // Font weight for step explainers
          explainerFontStyle: 'italic', // Font style for step explainers
          explainerMarginBottom: '24gc', // Margin bottom for step explainers
          // Header configuration
          headerText: getI18nText('pages.page4.calculationSteps.headerText', 'Solution Steps'),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: (() => {
            const stepsData = getI18nText('pages.page4.calculationSteps.steps', []);
            if (!Array.isArray(stepsData) || stepsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              return [
                {
                  type: 'calculation',
                  text: getI18nText('pages.page4.calculationSteps.steps.0.text', 'p = 7, q = 8, r = 12 (since 7 < 8 < 12)'),
                  buttonText: getI18nText('pages.page4.calculationSteps.steps.0.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page4.calculationSteps.steps.1.explainer', 'Calculate p², q², and r²'),
                  text: getI18nText('pages.page4.calculationSteps.steps.1.text', 'p² = 7² = 49, q² = 8² = 64, r² = 12² = 144<br>p² + q² = 49 + 64 = 113'),
                  buttonText: getI18nText('pages.page4.calculationSteps.steps.1.buttonText', 'Compare values')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page4.calculationSteps.steps.2.explainer', 'Compare r² = 144 and p² + q² = 113'),
                  text: getI18nText('pages.page4.calculationSteps.steps.2.text', 'Since 144 ≠ 113, we have r² ≠ p² + q²'),
                  buttonText: getI18nText('pages.page4.calculationSteps.steps.2.buttonText', 'See conclusion')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page4.calculationSteps.steps.3.explainer', 'Conclusion'),
                  text: getI18nText('pages.page4.calculationSteps.steps.3.text', '7, 8, 12 is NOT a Pythagorean triple'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: index === stepsData.length - 1 ? 'answer' : 'calculation',
              ...(step.explainer ? { explainer: step.explainer } : {}),
              text: step.text,
              ...(step.buttonText !== undefined ? { buttonText: step.buttonText } : { buttonText: null })
            }));
          })(),
          blanks: [], // No blanks needed for this proof
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'transparent',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff'
        }
      },

      // Question Table - Compare r² and p² + q²
      {
        id: 'page4-question-table',
        name: 'question-table',
        type: 'custom',
        coordinates: [1150, 100, 1600, 600], // Positioned below solution steps
        zIndex: 61,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: ['r²', 'p² + q²'],
            rows: [
              ['r = 12', 'p = 7 and q = 8'], // Row 1
              ['', ''], // Row 2
              ['', ''], // Row 3
              ['']      // Row 4 - single cell spanning both columns
            ]
          },
          borderColor: '#ffffff',
          headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
          headerTextColor: '#F59E0B', // Orange color for header text
          cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          textColor: '#ffffff',
          fontSize: '28gc',
          headerFontSize: '32gc',
          padding: '10gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          equalColumnWidths: false, // We want custom widths: 35% and 65%
          columnWidths: ['35%', '65%'], // Column 1: 35%, Column 2: 65%
          cellHeight: '60gc', // Fixed cell height to prevent resizing when content changes
          rowGap: '0gc',
          columnGap: '0gc'
        }
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
          text: getI18nText(
            'pages.page4.footerInstruction',
            "Click on the highlighted button see the solution steps"
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
          imageAlt: 'Tap',
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 4 }
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 5'));
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 4 }
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 3'));
              }
            }
          }
        }
      },

    ],

    5: [

      // Header Text - "Let us explore the triplet 6, 2 1/2, 6 1/2"
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
            "Let us explore the triplet 5 cm, 12 cm, 15 cm"
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
        coordinates: [10, 100, 1595, 810], // Same coordinates as question text box
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

      // Right Angle Triangle Component
      {
        id: 'page5-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [25, 100, 800, 700], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [5, 12, 15], // Triplet: 5, 12, 15
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Orange lines for all sides
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: getI18nText('pages.page5.triangleLabels.vertexLabels', ['A', 'B', 'C']),
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [75, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['15 cm', '5 cm', '12 cm'], // Side measurements with "cm"
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [55, 75, 70], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0],
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: false,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Solution Steps Component - Prove/Disprove Pythagorean Triple
      {
        id: 'page5-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [450, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 700, 500], // Text area within the component
          buttonCoordinates: [725, 575, 1125, 650], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 600, 800, 650], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '27gc',
            color: '#ffffff',
            fontWeight: 'normal',
            textAlign: 'left'
          },
          showCards: true, // Enable card styling for each step
          cardBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          cardBorder: '2gc solid rgba(255, 255, 255, 0.4)',
          cardBorderRadius: '12gc',
          cardPaddingTop: '10gc', // Optional: Top padding
          cardPaddingBottom: '10gc', // Optional: Bottom padding
          cardPaddingLeft: '50gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '20gc', // Optional: Right padding
          cardBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          // Card size control
          cardWidth: '100%', // Card width
          cardMaxWidth: null, // Optional: Maximum width
          cardMinWidth: null, // Optional: Minimum width
          // Step number circle
          showStepNumber: true, // Show step number in a circle on the left edge
          stepNumberSize: '40gc', // Size of the step number circle (diameter)
          stepNumberColor: '#ffffff', // Font color of the step number text
          stepNumberBackgroundColor: 'var(--color-orange)', // Background color of the circle
          stepNumberBorder: '2gc solid #ffffff', // Border of the circle
          stepNumberBorderColor: null, // Optional: Border color
          stepNumberBorderWidth: null, // Optional: Border width
          stepNumberBorderStyle: null, // Optional: Border style
          stepNumberFontSize: '24gc', // Font size of the step number
          stepNumberFontWeight: 'bold', // Font weight of the step number
          // Step explainer props
          explainerFontSize: '22gc', // Font size for step explainers
          explainerColor: 'var(--color-orange)', // Text color for step explainers
          explainerFontWeight: 'normal', // Font weight for step explainers
          explainerFontStyle: 'italic', // Font style for step explainers
          explainerMarginBottom: '24gc', // Margin bottom for step explainers
          // Header configuration
          headerText: getI18nText('pages.page5.calculationSteps.headerText', 'Solution Steps'),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: (() => {
            const stepsData = getI18nText('pages.page5.calculationSteps.steps', []);
            if (!Array.isArray(stepsData) || stepsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              return [
                {
                  type: 'calculation',
                  text: getI18nText('pages.page5.calculationSteps.steps.0.text', 'p = 5, q = 12, r = 15 (since 5 < 12 < 15)'),
                  buttonText: getI18nText('pages.page5.calculationSteps.steps.0.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page5.calculationSteps.steps.1.explainer', 'Calculate p², q², and r²'),
                  text: getI18nText('pages.page5.calculationSteps.steps.1.text', 'p² = 5² = 25, q² = 12² = 144, r² = 15² = 225<br>p² + q² = 25 + 144 = 169'),
                  buttonText: getI18nText('pages.page5.calculationSteps.steps.1.buttonText', 'Compare values')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page5.calculationSteps.steps.2.explainer', 'Compare r² = 225 and p² + q² = 169'),
                  text: getI18nText('pages.page5.calculationSteps.steps.2.text', 'Since 225 ≠ 169, we have r² ≠ p² + q²'),
                  buttonText: getI18nText('pages.page5.calculationSteps.steps.2.buttonText', 'See conclusion')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page5.calculationSteps.steps.3.explainer', 'Conclusion'),
                  text: getI18nText('pages.page5.calculationSteps.steps.3.text', '5, 12, 15 is NOT a Pythagorean triple'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: index === stepsData.length - 1 ? 'answer' : 'calculation',
              ...(step.explainer ? { explainer: step.explainer } : {}),
              text: step.text,
              ...(step.buttonText !== undefined ? { buttonText: step.buttonText } : { buttonText: null })
            }));
          })(),
          blanks: [], // No blanks needed for this proof
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'transparent',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff'
        }
      },

      // Question Table - Compare r² and p² + q²
      {
        id: 'page5-question-table',
        name: 'question-table',
        type: 'custom',
        coordinates: [1150, 100, 1600, 600], // Positioned below solution steps
        zIndex: 61,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: ['r²', 'p² + q²'],
            rows: [
              ['r = 15', 'p = 5 and q = 12'], // Row 1
              ['', ''], // Row 2
              ['', ''], // Row 3
              ['']      // Row 4 - single cell spanning both columns
            ]
          },
          borderColor: '#ffffff',
          headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
          headerTextColor: '#F59E0B', // Orange color for header text
          cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          textColor: '#ffffff',
          fontSize: '28gc',
          headerFontSize: '32gc',
          padding: '10gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          equalColumnWidths: false, // We want custom widths: 35% and 65%
          columnWidths: ['35%', '65%'], // Column 1: 35%, Column 2: 65%
          cellHeight: '60gc', // Fixed cell height to prevent resizing when content changes
          rowGap: '0gc',
          columnGap: '0gc'
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
            'pages.page5.footerInstruction',
            "Click on the highlighted button see the solution steps"
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
          imageAlt: 'Tap',
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 5 }
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 6'));
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 5 }
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 4'));
              }
            }
          }
        }
      },

    ],

    6: [

      // Header Text
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
            "Let us explore the triplet 8 cm, 15 cm, 17 cm"
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
        coordinates: [10, 100, 1595, 810], // Same coordinates as question text box
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

      // Right Angle Triangle Component
      {
        id: 'page6-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [25, 100, 800, 700], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',

          // Triangle configuration
          sides: [8, 15, 17], // Triplet: 8, 15, 17
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',

          // Side styling
          side: {
            color: ['#FF6600', '#FF6600', '#FF6600'], // Orange lines for all sides
            width: '6gc', // Slightly thicker lines
            style: 'solid',
            lineJoin: 'round', // Line join style: 'miter', 'round', 'bevel' - round makes vertices smoother
            showVertices: true, // Show vertex markers (circles) at line intersections
            vertexColor: '#FF6600', // Color of vertex markers (defaults to side color if not specified)
            vertexSize: '8gc', // Size of vertex markers
            blink: [false, false, false], // Individual blink for each side [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side [sideA, sideB, sideC] in seconds
          },

          // Vertex label configuration
          vertexLabel: {
            show: true,
            labels: getI18nText('pages.page6.triangleLabels.vertexLabels', ['A', 'B', 'C']),
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [75, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },

          // Side label configuration
          sideLabel: {
            show: true,
            labels: ['17 cm', '8 cm', '15 cm'], // Side measurements with "cm"
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [55, 75, 70], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0],
            backgroundColor: 'transparent', // Background color
            borderColor: 'transparent', // Border color
            borderWidth: '0', // Border width
            borderRadius: '3px', // Border radius
            padding: '2px 6px', // Padding
            blink: [false, false, false], // Individual blink for each side label [sideA, sideB, sideC]
            blinkDuration: [1, 1, 1] // Individual blink duration for each side label [sideA, sideB, sideC] in seconds
          },

          // Right angle marker configuration
          rightAngleMarker: {
            show: true,
            size: '20gc', // Larger marker
            color: '#FF6600' // Orange marker to match sides
          }
        }
      },

      // Solution Steps Component - Prove/Disprove Pythagorean Triple
      {
        id: 'page6-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [450, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 700, 500], // Text area within the component
          buttonCoordinates: [725, 575, 1125, 650], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 600, 800, 650], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '27gc',
            color: '#ffffff',
            fontWeight: 'normal',
            textAlign: 'left'
          },
          showCards: true, // Enable card styling for each step
          cardBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          cardBorder: '2gc solid rgba(255, 255, 255, 0.4)',
          cardBorderRadius: '12gc',
          cardPaddingTop: '10gc', // Optional: Top padding
          cardPaddingBottom: '10gc', // Optional: Bottom padding
          cardPaddingLeft: '50gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '20gc', // Optional: Right padding
          cardBoxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          // Card size control
          cardWidth: '100%', // Card width
          cardMaxWidth: null, // Optional: Maximum width
          cardMinWidth: null, // Optional: Minimum width
          // Step number circle
          showStepNumber: true, // Show step number in a circle on the left edge
          stepNumberSize: '40gc', // Size of the step number circle (diameter)
          stepNumberColor: '#ffffff', // Font color of the step number text
          stepNumberBackgroundColor: 'var(--color-orange)', // Background color of the circle
          stepNumberBorder: '2gc solid #ffffff', // Border of the circle
          stepNumberBorderColor: null, // Optional: Border color
          stepNumberBorderWidth: null, // Optional: Border width
          stepNumberBorderStyle: null, // Optional: Border style
          stepNumberFontSize: '24gc', // Font size of the step number
          stepNumberFontWeight: 'bold', // Font weight of the step number
          // Step explainer props
          explainerFontSize: '22gc', // Font size for step explainers
          explainerColor: 'var(--color-orange)', // Text color for step explainers
          explainerFontWeight: 'normal', // Font weight for step explainers
          explainerFontStyle: 'italic', // Font style for step explainers
          explainerMarginBottom: '24gc', // Margin bottom for step explainers
          // Header configuration
          headerText: getI18nText('pages.page6.calculationSteps.headerText', 'Solution Steps'),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: (() => {
            const stepsData = getI18nText('pages.page6.calculationSteps.steps', []);
            if (!Array.isArray(stepsData) || stepsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              return [
                {
                  type: 'calculation',
                  text: getI18nText('pages.page6.calculationSteps.steps.0.text', 'p = 8, q = 15, r = 17 (since 8 < 15 < 17)'),
                  buttonText: getI18nText('pages.page6.calculationSteps.steps.0.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page6.calculationSteps.steps.1.explainer', 'Calculate p², q², and r²'),
                  text: getI18nText('pages.page6.calculationSteps.steps.1.text', 'p² = 8² = 64, q² = 15² = 225, r² = 17² = 289<br>p² + q² = 64 + 225 = 289'),
                  buttonText: getI18nText('pages.page6.calculationSteps.steps.1.buttonText', 'Compare values')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page6.calculationSteps.steps.2.explainer', 'Compare r² = 289 and p² + q² = 289'),
                  text: getI18nText('pages.page6.calculationSteps.steps.2.text', 'Since 289 = 289, we have r² = p² + q²'),
                  buttonText: getI18nText('pages.page6.calculationSteps.steps.2.buttonText', 'See conclusion')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page6.calculationSteps.steps.3.explainer', 'Conclusion'),
                  text: getI18nText('pages.page6.calculationSteps.steps.3.text', '8, 15, 17 IS a Pythagorean triple'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: index === stepsData.length - 1 ? 'answer' : 'calculation',
              ...(step.explainer ? { explainer: step.explainer } : {}),
              text: step.text,
              ...(step.buttonText !== undefined ? { buttonText: step.buttonText } : { buttonText: null })
            }));
          })(),
          blanks: [], // No blanks needed for this proof
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'transparent',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff'
        }
      },

      // Question Table - Compare r² and p² + q²
      {
        id: 'page6-question-table',
        name: 'question-table',
        type: 'custom',
        coordinates: [1150, 100, 1600, 600], // Positioned below solution steps
        zIndex: 61,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: ['r²', 'p² + q²'],
            rows: [
              ['r=17', 'p=8 and q = 15'], // Row 1
              ['', ''], // Row 2
              ['', ''], // Row 3
              ['']      // Row 4 - single cell spanning both columns
            ]
          },
          borderColor: '#ffffff',
          headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
          headerTextColor: '#F59E0B', // Orange color for header text
          cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          textColor: '#ffffff',
          fontSize: '28gc',
          headerFontSize: '32gc',
          padding: '10gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          equalColumnWidths: false, // We want custom widths: 35% and 65%
          columnWidths: ['35%', '65%'], // Column 1: 35%, Column 2: 65%
          cellHeight: '60gc', // Fixed cell height to prevent resizing when content changes
          rowGap: '0gc',
          columnGap: '0gc'
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
            'pages.page6.footerInstruction',
            "Click on the highlighted button see the solution steps"
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
          imageAlt: 'Tap',
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 6 }
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
                console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 7'));
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
          },
          // Start disabled, enable on quiz completion
          initialEnabled: false,
          enableOnEvent: 'quizCompleted',
          enableOnEventFilter: { pageNumber: 6 }
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 5'));
              }
            }
          }
        }
      },

    ],

    7: [

      // Header Text - "Summary"
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
            "Summary"
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
        id: 'page7-question-text-box',
        name: 'question-text-box',
        type: 'custom',
        coordinates: [310, 110, 1290, 775], // Main text area
        zIndex: 50,
        props: {
          componentType: 'HighlightedTextComponent',
          text: getI18nText('pages.page7.summaryText', ''),
          fontSize: '40gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          display: 'flex',
          alignItems: "center",
          textAlign: 'center',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: (() => {
            const highlightsData = getI18nText('pages.page7.highlights', []);
            if (!Array.isArray(highlightsData) || highlightsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              const fallbackHighlightText = getI18nText('pages.page7.highlights.0.text', "d. 8 cm, 15 cm, dan 17 cm IS a Pythagorean triple");
              return [
                {
                  text: fallbackHighlightText,
                  highlightColor: highlightColor1,
                  fontColor: '#000000',
                  fontSize: questionTextSize,
                  bold: true,
                  underline: false
                }
              ];
            }
            return highlightsData.map(highlight => ({
              ...highlight,
              highlightColor: highlight.highlightColor || highlightColor1,
              fontColor: highlight.fontColor || '#000000',
              fontSize: highlight.fontSize || questionTextSize,
              bold: highlight.bold !== undefined ? highlight.bold : true,
              underline: highlight.underline !== undefined ? highlight.underline : false
            }));
          })()
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
            'pages.page7.footerInstruction',
            "Tap » to start over"
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
          imageAlt: 'Tap'
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
            return getI18nText('buttons.startOver', 'Start Over');
          },
          fontSize: '28gc',
          onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
            }

            console.log('🔄 [Start Over] Resetting all state and navigating to page 1');

            // Clear all component state stores
            if (typeof window !== 'undefined') {
              // Clear FillBlanksComponent state
              if (window.fillBlanksStateStore) {
                window.fillBlanksStateStore = {};
                console.log('🔄 [Start Over] Cleared fillBlanksStateStore');
              }

              // Clear ArrangeStepsComponent state
              if (window.arrangeStepsStateStore) {
                window.arrangeStepsStateStore = {};
                console.log('🔄 [Start Over] Cleared arrangeStepsStateStore');
              }

              // Clear CalculationStepsComponent state
              if (window.calculationStepsStateStore) {
                window.calculationStepsStateStore = {};
                console.log('🔄 [Start Over] Cleared calculationStepsStateStore');
              }

              // Clear QuizPanelComponent state
              if (window.quizPanelStateStore) {
                window.quizPanelStateStore = {};
                console.log('🔄 [Start Over] Cleared quizPanelStateStore');
              }

              // Clear page completion states
              if (window.PageCompletionManager) {
                window.PageCompletionManager.init();
                if (window.pageCompletionState) {
                  Object.keys(window.pageCompletionState).forEach(key => {
                    delete window.pageCompletionState[key];
                  });
                  console.log('🔄 [Start Over] Cleared all page completion states');
                }
              }

              // Clear any page-specific feedback states
              Object.keys(window).forEach(key => {
                if (key.includes('FillBlanksState') || key.includes('FeedbackState')) {
                  delete window[key];
                }
              });
              console.log('🔄 [Start Over] Cleared page-specific feedback states');

              // Clear visual elements
              const clearFunctions = ['clearCheckOverlays', 'clearIncrementBorders', 'clearColumnNumbers'];
              clearFunctions.forEach(fn => window[fn]?.());
              console.log('🔄 [Start Over] Cleared visual elements');

              // Reset current question index if it exists
              if (window.currentQuestionIndex !== undefined) {
                window.currentQuestionIndex = 0;
                console.log('🔄 [Start Over] Reset currentQuestionIndex to 0');
              }

              // Navigate to page 1
              if (window.changePageAndNotify) {
                window.changePageAndNotify(1);
              } else if (window.navigateToPage) {
                window.navigateToPage(1);
              } else {
                window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
                console.log('🔄 [Start Over] Dispatched page change event to page 1');
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
