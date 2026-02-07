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
  1: { prev: null, next: 8 },
  8: { prev: 1, next: 12 },
  12: { prev: 8, next: 13 },
  13: { prev: 12, next: 4 },
  4: { prev: 13, next: 11 },
  11: { prev: 4, next: null },
  2: { prev: 1, next: 9 },
  3: { prev: 9, next: 11 },
  5: { prev: 2, next: 7 },
  6: { prev: 5, next: 7 },
  7: { prev: 5, next: null },
  9: { prev: 8, next: 3 },
  10: { prev: 9, next: 11 },
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
          textAlign: 'center',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: [
          ]
        }
      },

      // Question Image
      {
        id: 'page1-question-image',
        name: 'question-image',
        type: 'custom',
        coordinates: [900, 110, 1570, 775], // Positioned to the right of question text
        zIndex: 51,
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
            "Find the correct visual representation for the question"
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
          quizSubtype: 'QT3', // For MCQ: QT3R (3 options in rows)
          headerText: '',
          questionText: getI18nText('pages.page2.quizPanel.questionText', 'Given an isosceles right triangle △ABC with ∠C = 90° and AB = 15√2 cm. Choose the correct figure which represents this triangle.'),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 65,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // White text color for option buttons
          optionButtonBackgroundColor: 'transparent', // Transparent background for option buttons
          optionImageSizeMultiplier: 1.1, // Increase image size by 10%
          // Options data for QT3R (3 options in vertical layout)
          get options() {
            const quizPanelData = getI18nText('pages.page2.quizPanel', {});
            if (quizPanelData && quizPanelData.options && Array.isArray(quizPanelData.options) && quizPanelData.options.length > 0) {
              return quizPanelData.options;
            }
            // Fallback - should not be needed if data.js is properly configured
            return [
              { 
                image: "assets/option1.png",
                text: "",
                feedback: getI18nText('pages.page2.quizPanel.options.0.feedback', "Not correct. Try again!"),
                iscorrect: false
              },
              {
                image: "assets/option2.png",
                text: "",
                feedback: getI18nText('pages.page2.quizPanel.options.1.feedback', "Not correct. Try again!"),
                iscorrect: false
              },
              {
                image: "assets/option3.png",
                text: "",
                feedback: getI18nText('pages.page2.quizPanel.options.2.feedback', "Awesome"),
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
            "Select the correct answer"
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
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

      // Header Text - "Let us find the relationship between p and q"
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
            "Let us find the relationship between p and q"
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
        coordinates: [50, 150, 950, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          sides: [15, 15, 15 * Math.sqrt(2)], // Isosceles right triangle: AC = 15, BC = 15, AB = 15√2
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',
          rotation: 315, // Rotation angle in degrees (0 = no rotation, positive = clockwise)
          
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          vertexLabels: getI18nText('pages.page3.triangleLabels.vertexLabels', ['B', 'D', 'C']),
          
          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page3.triangleLabels.vertexLabels', ['B', 'D', 'C']), // Fallback if vertexLabels not provided
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
          // For isosceles right triangle: AC = a, BC = a, AB = a√2
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page3.triangleLabels.sideLabels', ['c = x + y', 'a = x', 'b']), // Side labels: AB = a√2 (hypotenuse), BC = a = 60 cm, AC = a
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 50, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [308, 90, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page3.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle (empty string skips that vertex)
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
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
          buttonCoordinates: [725, 350, 1125, 425], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 375, 800, 425], // [x1, y1, x2, y2] coordinates for tap.gif
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
                  type: 'formula',
                  text: getI18nText('pages.page3.calculationSteps.steps.0.text', 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse'),
                  buttonText: getI18nText('pages.page3.calculationSteps.steps.0.buttonText', 'Apply to our case')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page3.calculationSteps.steps.1.explainer', 'For a Pythagorean triple: (p + q)² = p² + (p - q)²'),
                  text: getI18nText('pages.page3.calculationSteps.steps.1.text', 'Since, (p+q) > p > (p-q)<br>(p+q) would be considered as the hypotenuse'),
                  buttonText: getI18nText('pages.page3.calculationSteps.steps.1.buttonText', 'Expand squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page3.calculationSteps.steps.2.explainer', 'Expand (p + q)² and (p - q)² and Simplify'),
                  text: getI18nText('pages.page3.calculationSteps.steps.2.text', 'p² + 2pq + q² = p² + p² - 2pq + q²<br>p² + 2pq + q² = 2p² - 2pq + q²<br>2pq = p² - 2pq<br>4pq = p²'),
                  buttonText: getI18nText('pages.page3.calculationSteps.steps.2.buttonText', 'Solve for p')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page3.calculationSteps.steps.4.explainer', 'Relationship between p and q'),
                  text: getI18nText('pages.page3.calculationSteps.steps.4.text', 'p = 4q'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: step.type || (index === stepsData.length - 1 ? 'answer' : 'calculation'),
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

      // Question Table - Compare c² and a² + b²
      // {
      //   id: 'page3-question-table',
      //   name: 'question-table',
      //   type: 'custom',
      //   coordinates: [1150, 100, 1600, 600], // Positioned below solution steps
      //   zIndex: 61,
      //   props: {
      //     componentType: 'TableGridComponent',
      //     tableData: {
      //       headers: ['c²', 'a² + b²'],
      //       rows: [
      //         ['', ''], // Row 1
      //         ['', ''], // Row 2
      //         ['', ''], // Row 3
      //         ['']      // Row 4 - single cell spanning both columns
      //       ]
      //     },
      //     borderColor: '#ffffff',
      //     headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
      //     headerTextColor: '#F59E0B', // Orange color for header text
      //     cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
      //     textColor: '#ffffff',
      //     fontSize: '24gc',
      //     headerFontSize: '28gc',
      //     padding: '10gc',
      //     borderRadius: '8gc',
      //     borderWidth: '2px',
      //     equalColumnWidths: false, // We want custom widths: 40% and 60%
      //     columnWidths: ['40%', '60%'], // Column 1: 40%, Column 2: 60%
      //     cellHeight: '60gc', // Fixed cell height to prevent resizing when content changes
      //     rowGap: '0gc',
      //     columnGap: '0gc'
      //   }
      // },

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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
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
            "Let us create a new Pythagorean triplet using p = 12"
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
        coordinates: [50, 50, 700, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          // Right triangle: sides 15, 20, 25 (3-4-5 triangle)
          // Right angle at B (top-right), A=30°, B=90°, C=60°
          // Sides array: [side opposite A, side opposite B, side opposite C]
          // Hypotenuse is opposite the right angle (B), so it should be at index 1
          // Reordering to ensure hypotenuse (25) is correctly labeled
          sides: [20, 25, 15], // Side opposite A = 20, side opposite B (hypotenuse) = 25, side opposite C = 15
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right', // Right angle at vertex D (top-right)
          rotation: 90, // No rotation needed
          
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          // This allows overriding vertex naming directly via prop
          vertexLabels: getI18nText('pages.page4.triangleLabels.vertexLabels', ['', '', '']),
          
          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page4.triangleLabels.vertexLabels', ['', '', '']), // Fallback if vertexLabels not provided
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },
          
          // Side label configuration
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page4.triangleLabels.sideLabels', ['(p + q)', '(p - q)', 'p']),
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [125, 55, 90], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page4.angleLabels', ['', '90°', '']),
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
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

    // Equation Background
    {
      id: 'page4-equation-background',
      name: 'equation-background',
      type: 'custom',
      coordinates: [450, 110, 1585, 225], // Covers all equation components with padding, shifted further left by 100gc
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

    // Pythagorean Triplet label
    {
      id: 'page4-distance-equation-text',
      name: 'distance-equation-text',
      type: 'custom',
      coordinates: [450, 110, 1585, 225], // Extended width to accommodate one-line equation
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.tripletLabel', 'Pythagorean Triplet : '),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#ffffff',
        fontSize: '36gc',
        padding: '10gc',
        textAlign: 'center',
        lineHeight: '1.0',
        whiteSpace: 'nowrap'
      }
    },

    // First number box: p + q
    // {
    //   id: 'page4-number-box-1',
    //   name: 'number-box-1',
    //   type: 'custom',
    //   coordinates: [900, 120, 1050, 215], // Adjusted position
    //   zIndex: 60,
    //   props: {
    //     componentType: 'TeacherNoteComponent',
    //     text: getI18nText('pages.page4.equationTexts.pPlusQ', '<i>p</i> + q'),
    //     backgroundColor: 'rgba(74, 85, 104, 0.45)', // Highlight color 1 (Gold) with 45% opacity
    //     border: 'none',
    //     borderRadius: '12gc', // Rounded corners
    //     textColor: '#ffffff',
    //     fontSize: '36gc',
    //     padding: '15gc',
    //     textAlign: 'center',
    //     lineHeight: '1.5'
    //   }
    // },

    // Comma 1
    // {
    //   id: 'page4-comma-sign-1',
    //   name: 'comma-sign-1',
    //   type: 'custom',
    //   coordinates: [1055, 120, 1075, 215], // Comma after first box
    //   zIndex: 60,
    //   props: {
    //     componentType: 'TeacherNoteComponent',
    //     text: getI18nText('pages.page4.equationTexts.comma', ','),
    //     backgroundColor: 'transparent',
    //     border: 'none',
    //     borderRadius: '0gc',
    //     textColor: '#ffffff',
    //     fontSize: '36gc',
    //     padding: '0gc',
    //     textAlign: 'center',
    //     lineHeight: '1.0'
    //   }
    // },

    // Second number box: p
    // {
    //   id: 'page4-number-box-2',
    //   name: 'number-box-2',
    //   type: 'custom',
    //   coordinates: [1080, 120, 1180, 215], // Adjusted position for p
    //   zIndex: 60,
    //   props: {
    //     componentType: 'TeacherNoteComponent',
    //     text: getI18nText('pages.page4.equationTexts.p', '<i>p</i>'),
    //     backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark grey
    //     border: 'none',
    //     borderRadius: '12gc', // Rounded corners
    //     textColor: '#ffffff',
    //     fontSize: '36gc',
    //     padding: '15gc',
    //     textAlign: 'center',
    //     lineHeight: '1.5'
    //   }
    // },

    // Comma 2
    // {
    //   id: 'page4-comma-sign-2',
    //   name: 'comma-sign-2',
    //   type: 'custom',
    //   coordinates: [1185, 120, 1205, 215], // Comma after second box
    //   zIndex: 60,
    //   props: {
    //     componentType: 'TeacherNoteComponent',
    //     text: getI18nText('pages.page4.equationTexts.comma', ','),
    //     backgroundColor: 'transparent',
    //     border: 'none',
    //     borderRadius: '0gc',
    //     textColor: '#ffffff',
    //     fontSize: '36gc',
    //     padding: '0gc',
    //     textAlign: 'center',
    //     lineHeight: '1.0'
    //   }
    // },

    // Third number box: p - q
    // {
    //   id: 'page4-number-box-3-triplet',
    //   name: 'number-box-3-triplet',
    //   type: 'custom',
    //   coordinates: [1210, 120, 1360, 215], // Adjusted position for p - q
    //   zIndex: 60,
    //   props: {
    //     componentType: 'TeacherNoteComponent',
    //     text: getI18nText('pages.page4.equationTexts.pMinusQ', '<i>p</i> - q'),
    //     backgroundColor: 'rgba(74, 85, 104, 0.45)', // Dark grey
    //     border: 'none',
    //     borderRadius: '12gc', // Rounded corners
    //     textColor: '#ffffff',
    //     fontSize: '36gc',
    //     padding: '15gc',
    //     textAlign: 'center',
    //     lineHeight: '1.5'
    //   }
    // },

    // Text below equation 1: Calculation steps
    {
      id: 'page4-calculation-text',
      name: 'calculation-text',
      type: 'custom',
      coordinates: [500, 315, 1400, 360], // Below equation 1
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.calculationText', 'As given :<br>Distance of fishing boat from shore = 15 KM<br>Average Speed of both boats = 30 KMph<br><br>As calculated<br>Distance of fishing boat from shore = 25 KM'),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#F59E0B', // Orange color
        fontSize: '26gc',
        padding: '10gc',
        textAlign: 'left',
        lineHeight: '1.5',
        fontStyle: 'italic'
      }
    },

    // Equation Background
    {
      id: 'page4-equation2-background',
      name: 'equation2-background',
      type: 'custom',
      coordinates: [450, 460, 1585, 575], // Covers all equation components with padding, shifted further left by 100gc
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

    // Pythagorean Triplet label for equation 2
    {
      id: 'page4-equation2-triplet-text',
      name: 'equation2-triplet-text',
      type: 'custom',
      coordinates: [500, 485, 900, 550], // Adjusted to be on same line as flip card, centered vertically
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.colon', 'Time taken by Fishing boat ='),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#ffffff',
        fontSize: '30gc',
        padding: '10gc',
        textAlign: 'right',
        lineHeight: '1.0',
        whiteSpace: 'nowrap'
      }
    },

    // Working Area Equation Display (below main equation)
    // Three flip cards matching the size of equation 1 number boxes
    // First flip card: 12 + 3 (same size as first box in eq1: 900-1050, height 95)
    {
      id: 'page4-flip-card-1',
      name: 'flip-card-1',
      type: 'custom',
      coordinates: [920, 470, 1175, 565], // Doubled width: from 150 to 300 (1070-920=150, 1220-920=300)
      zIndex: 60,
      props: {
        componentType: 'FlipTileComponent',
        frontText: '?',
        frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
        frontBorderColor: '#ffffff',
        frontBorderWidth: '2px',
        frontBorderStyle: 'solid',
        frontBorderRadius: '12gc',
        frontColor: '#000000',
        frontFontSize: '36gc', // Reduced from 48gc
        frontFontWeight: 'bold',
        blinkText: false,
        backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">Distance from Shore</span><span style="display: block; padding: 0 2px;">Average Speed</span></span>',
        flipMode: 'custom',
        isFlipped: true, // Start in flipped state
        flipBack: false, // Disable flipping (already flipped, can't flip back)
        backBackgroundColor: 'rgba(128, 128, 128, 0.45)', // Gray with 45% opacity
        backBorderColor: '#ffffff',
        backBorderWidth: '2px',
        backBorderStyle: 'solid',
        backBorderRadius: '12gc',
        backColor: '#ffffff',
        backFontSize: '24gc', // Reduced from 36gc
        backFontWeight: 'normal'
      }
    },

    // Equals sign after flip card 1
    {
      id: 'page4-eq2-equals-sign',
      name: 'eq2-equals-sign',
      type: 'custom',
      coordinates: [1180, 470, 1200, 565], // After flip card 1
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.equalsSign', '='),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#ffffff',
        fontSize: '36gc',
        padding: '0gc',
        textAlign: 'center',
        lineHeight: '1.0'
      }
    },

    // Second flip card: 15/30 in fraction notation
    {
      id: 'page4-flip-card-2-eq2',
      name: 'flip-card-2-eq2',
      type: 'custom',
      coordinates: [1210, 470, 1360, 565], // After equals sign
      zIndex: 60,
      props: {
        componentType: 'FlipTileComponent',
        frontText: '?',
        frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
        frontBorderColor: '#ffffff',
        frontBorderWidth: '2px',
        frontBorderStyle: 'solid',
        frontBorderRadius: '12gc',
        frontColor: '#000000',
        frontFontSize: '36gc',
        frontFontWeight: 'bold',
        blinkText: false,
        backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">15</span><span style="display: block; padding: 0 2px;">30</span></span>',
        flipMode: 'custom', // Can be flipped
        backBackgroundColor: 'rgba(76, 175, 80, 0.45)', // Green with 45% opacity
        backBorderColor: '#ffffff',
        backBorderWidth: '2px',
        backBorderStyle: 'solid',
        backBorderRadius: '12gc',
        backColor: '#ffffff',
        backFontSize: '36gc',
        backFontWeight: 'normal'
      }
    },


    // Equation 3 Background - Exact copy of eq2
    {
      id: 'page4-equation3-background',
      name: 'equation3-background',
      type: 'custom',
      coordinates: [450, 600, 1585, 715], // Below equation 2 (y offset: +140)
      zIndex: 55,
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

    // Pythagorean Triplet label for equation 3 - Exact copy of eq2
    {
      id: 'page4-equation3-triplet-text',
      name: 'equation3-triplet-text',
      type: 'custom',
      coordinates: [500, 625, 900, 690], // Adjusted to be on same line as flip card, centered vertically (y offset: +140)
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.touristBoatText', 'Time taken by Tourist boat ='),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#ffffff',
        fontSize: '30gc',
        padding: '10gc',
        textAlign: 'right',
        lineHeight: '1.0',
        whiteSpace: 'nowrap'
      }
    },

    // Equation 3 - First flip card - Exact copy of eq2 flip-card-1
    {
      id: 'page4-eq3-flip-card-1',
      name: 'eq3-flip-card-1',
      type: 'custom',
      coordinates: [920, 610, 1175, 705], // Doubled width (y offset: +140)
      zIndex: 60,
      props: {
        componentType: 'FlipTileComponent',
        frontText: '?',
        frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
        frontBorderColor: '#ffffff',
        frontBorderWidth: '2px',
        frontBorderStyle: 'solid',
        frontBorderRadius: '12gc',
        frontColor: '#000000',
        frontFontSize: '36gc', // Reduced from 48gc
        frontFontWeight: 'bold',
        blinkText: false,
        backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">Distance from Shore</span><span style="display: block; padding: 0 2px;">Average Speed</span></span>',
        flipMode: 'custom',
        isFlipped: true, // Start in flipped state
        flipBack: false, // Disable flipping (already flipped, can't flip back)
        backBackgroundColor: 'rgba(128, 128, 128, 0.45)', // Gray with 45% opacity
        backBorderColor: '#ffffff',
        backBorderWidth: '2px',
        backBorderStyle: 'solid',
        backBorderRadius: '12gc',
        backColor: '#ffffff',
        backFontSize: '24gc', // Reduced from 36gc
        backFontWeight: 'normal'
      }
    },

    // Equals sign after flip card 1 - Exact copy of eq2
    {
      id: 'page4-eq3-equals-sign',
      name: 'eq3-equals-sign',
      type: 'custom',
      coordinates: [1180, 610, 1200, 705], // After flip card 1 (y offset: +140)
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.equalsSign', '='),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#ffffff',
        fontSize: '36gc',
        padding: '0gc',
        textAlign: 'center',
        lineHeight: '1.0'
      }
    },

    // Equation 3 - Second flip card: 25/30 in fraction notation - Exact copy of eq2
    {
      id: 'page4-eq3-flip-card-2',
      name: 'eq3-flip-card-2',
      type: 'custom',
      coordinates: [1210, 610, 1360, 705], // After equals sign (y offset: +140)
      zIndex: 60,
      props: {
        componentType: 'FlipTileComponent',
        frontText: '?',
        frontBackgroundColor: 'rgba(255, 215, 0, 0.45)', // Highlight color 1 (Gold) with 45% opacity
        frontBorderColor: '#ffffff',
        frontBorderWidth: '2px',
        frontBorderStyle: 'solid',
        frontBorderRadius: '12gc',
        frontColor: '#000000',
        frontFontSize: '36gc',
        frontFontWeight: 'bold',
        blinkText: false,
        backHtml: '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;"><span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">25</span><span style="display: block; padding: 0 2px;">30</span></span>',
        flipMode: 'custom', // Can be flipped
        backBackgroundColor: 'rgba(76, 175, 80, 0.45)', // Green with 45% opacity
        backBorderColor: '#ffffff',
        backBorderWidth: '2px',
        backBorderStyle: 'solid',
        backBorderRadius: '12gc',
        backColor: '#ffffff',
        backFontSize: '36gc',
        backFontWeight: 'normal'
      }
    },


    // Text below equation 3 - appears when quiz is completed
    {
      id: 'page4-eq3-summary-text',
      name: 'eq3-summary-text',
      type: 'custom',
      coordinates: [450, 730, 1585, 780], // Below equation 3
      zIndex: 60,
      props: {
        componentType: 'TeacherNoteComponent',
        text: getI18nText('pages.page4.equationTexts.summaryText', 'The Pythagorean triplet formed with p = 12 : 9, 12, 15'),
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '0gc',
        textColor: '#F59E0B', // Orange color
        fontSize: '32gc',
        padding: '10gc',
        textAlign: 'left',
        lineHeight: '1.5',
        display: 'none' // Initially hidden, will be shown when quizCompleted event is dispatched
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
            "Let us verify that 4 m, 5 m, 6 m is a Pythagorean triplet"
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
          sides: [4, 5, 6], // Triplet: 4 m, 5 m, 6 m
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
            labels: getI18nText('pages.page5.triangleLabels.sideLabels', ['4 m', '5 m', '6 m']), // Side measurements with m
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [55, 125, 125], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
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
        coordinates: [425, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 720, 500], // Text area within the component
          buttonCoordinates: [750, 575, 1150, 650], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 600, 800, 650], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '25gc',
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
          cardPaddingLeft: '30gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '10gc', // Optional: Right padding
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
                  text: getI18nText('pages.page5.calculationSteps.steps.0.text', 'p = 4 m, q = 5 m, r = 6 m (since 4 < 5 < 6)'),
                  buttonText: getI18nText('pages.page5.calculationSteps.steps.0.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page5.calculationSteps.steps.1.explainer', 'Calculate p², q², and r²'),
                  text: getI18nText('pages.page5.calculationSteps.steps.1.text', 'p² = 4² = 16, q² = 5² = 25, r² = 6² = 36<br>p² + q² = 16 + 25 = 41'),
                  buttonText: getI18nText('pages.page5.calculationSteps.steps.1.buttonText', 'Compare values')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page5.calculationSteps.steps.2.explainer', 'Compare r² = 36 and p² + q² = 41'),
                  text: getI18nText('pages.page5.calculationSteps.steps.2.text', 'Since 36 ≠ 41, we have r² ≠ p² + q²'),
                  buttonText: getI18nText('pages.page5.calculationSteps.steps.2.buttonText', 'See conclusion')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page5.calculationSteps.steps.3.explainer', 'Conclusion'),
                  text: getI18nText('pages.page5.calculationSteps.steps.3.text', '4 m, 5 m, 6 m is NOT a Pythagorean triple'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: step.type || (index === stepsData.length - 1 ? 'answer' : 'calculation'),
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
            headers: getI18nText('pages.page5.tableHeaders', ['r²', 'p² + q²']),
            rows: [
              ['', ''], // Row 1 - will be filled at step 1 (index 1)
              ['', ''], // Row 2 - will be filled at step 2 (index 2)
              ['', ''], // Row 3 - will be filled at step 2 (index 2)
              ['']      // Row 4 - will be filled at step 3 (index 3) - single cell spanning both columns
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
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
            labels: getI18nText('pages.page6.triangleLabels.sideLabels', ['17 cm', '8 cm', '15 cm']), // Side measurements with "cm"
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
              type: step.type || (index === stepsData.length - 1 ? 'answer' : 'calculation'),
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
            headers: getI18nText('pages.page6.tableHeaders', ['r²', 'p² + q²']),
            rows: [
              [getI18nText('pages.page6.tableUpdates.step1.col1', 'r=17'), getI18nText('pages.page6.tableUpdates.step1.col2', 'p=8 and q = 15')], // Row 1
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
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
          fontSize: '36gc',
          fontWeight: 'normal',
          fontColor: '#ffffff',
          padding: '10gc',
          justifyContent: 'center',
          textAlign: 'center',
          katexFontSize: 0.75, // Reduce KaTeX/LaTeX font size to 75% to maintain line width
          highlights: (() => {
            const highlightsData = getI18nText('pages.page7.highlights', []);
            if (!Array.isArray(highlightsData) || highlightsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              const fallbackHighlightText = getI18nText('pages.page7.highlights.0.text', "Therefore, the garden is NOT a right triangle because the sides 4 m, 5 m, and 6 m do not form a Pythagorean triple.");
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap')
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

    8: [

      // Header Text - "Let us visualise the question"
      {
        id: 'page8-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page2.stageComponent.headerText',
            "Let us visualise the question"
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

      // Stage Component for Visualisation
      {
        id: 'page8-stage-visualisation',
        name: 'stage-visualisation',
        type: 'custom',
        coordinates: [0, 0, 1600, 900], // Full page overlay
        zIndex: 65, // Above other elements
        props: {
          componentType: 'StageComponent',
          headerText: '', // Hide header
          stageArray: (() => {
            // Get stages from data.js
            const stages = getI18nText('pages.page8.stageComponent.stages', []);
            // If no stages found, return empty array to prevent errors
            if (!Array.isArray(stages) || stages.length === 0) {
              console.warn('⚠️ [Page8] No stages found for page8.stageComponent, using empty array');
              return [];
            }
            return stages.map((stage, index) => {
              const stageConfig = {
                image: stage.image || null,
                buttonText: stage.buttonText || '',
                descriptionText: stage.descriptionText || '',
                highlights: stage.highlights || [],
                showPreviousImages: stage.showPreviousImages || [],
                appendToInfoAnalysis: stage.appendToInfoAnalysis || {
                  facts: [],
                  values: [],
                  toFind: []
                }
              };
              // Add imageAlt if it exists (for stage 0)
              if (stage.imageAlt) {
                stageConfig.imageAlt = stage.imageAlt;
              }
              return stageConfig;
            });
          })(),
          header: {
            coordinates: [], // Hide header by using empty coordinates
            fontSize: '36gc',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'left',
            display: 'flex',
          },
          line: {
            coordinates: [], // Hide line by using empty coordinates
            color: '#00FF7F',
            thickness: 3,
            strokeWidth: '3px'
          },
          image: {
            coordinates: [100, 200, 900, 650], // [x1, y1, x2, y2] format
            // borderRadius: '10gc',
            // border: ' 2px solid #000000',
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          },
          button: {
            coordinates: [900, 550, 1350, 625], // [x1, y1, x2, y2] format
            backgroundColor: 'var(--color-orange)',
            fontSize: '30gc',
            color:'black'
          },
          text: {
            coordinates: [900, 200, 1350, 500], // [x1, y1, x2, y2] format
            fontSize: '30gc',
            fontWeight: 'bold',
            color: '#F59E0B', // Orange color
            textAlign: 'left'
          },
          tapGif: {
            coordinates: [900, 575, 950, 625], // [x1, y1, x2, y2] positioned near button
            imageSrc: 'assets/tap.gif'
          },
          showTapGif: true, // Show the tap.gif
          keepPreviousImages: false, // Don't keep previous images (default behavior)
          imageStackOffset: '0gc', // No offset needed since images overlap
          animateTransitions: true,
          onStageComplete: (stageIndex, stageData) => {
            console.log(`✅ Completed stage ${stageIndex + 1}:`, stageData);
            if (typeof window !== 'undefined' && window.SimpleSoundManager) {
              window.SimpleSoundManager.playSound('correct');
            }
          },
          onAllStagesComplete: () => {
            console.log('🎉 All stages completed!');
            if (typeof window !== 'undefined' && window.SimpleSoundManager) {
              window.SimpleSoundManager.playSound('confetti');
            }
            // Mark page as complete
            if (typeof window !== 'undefined' && window.PageCompletionManager) {
              window.PageCompletionManager.setPageCompleted(8, true);
            }
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
            'pages.page8.footerInstruction',
            "Click on the highlighted button to see the solution steps"
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
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 8 }
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
                },
                // Start disabled, enable on quiz completion
                initialEnabled: false,
                enableOnEvent: 'quizCompleted',
                enableOnEventFilter: { pageNumber: 8 }
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

    9: [

      // Header Text - "Determine the sides of an isoceles △"
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
            "Determine the sides of an isoceles △"
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

      // Right Angle Triangle Component
      {
        id: 'page9-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [200, 150, 1000, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          sides: [15, 15, 15 * Math.sqrt(2)], // Isosceles right triangle: AC = 15, BC = 15, AB = 15√2
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',
          rotation: 315, // Rotation angle in degrees (0 = no rotation, positive = clockwise)
          
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          // This allows overriding vertex naming directly via prop
          vertexLabels: getI18nText('pages.page9.triangleLabels.vertexLabels', ['A', 'B', 'C']),
          
          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page9.triangleLabels.vertexLabels', ['A', 'B', 'C']), // Fallback if vertexLabels not provided
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
          // For isosceles right triangle: AC = a, BC = a, AB = a√2
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page9.triangleLabels.sideLabels', ['c', 'a', 'b']), // Side labels: AB = a√2 (hypotenuse), BC = a, AC = a
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 55, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page9.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle (empty string skips that vertex)
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Quiz Panel Component
      {
        id: 'page9-quiz-panel',
        name: 'quiz-panel',
        type: 'custom',
        coordinates: [50, 100, 1545, 810], // Full width quiz panel
        zIndex: 60,
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page9-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QTI4R', // For MCQ: QT4 (4 options)
          headerText: '',
          questionText: getI18nText('pages.page9.quizPanel.questionText', '∆ABC is an isosceles right triangle. If a and b are sides at right angle and c is the hypotenuse, which of the following is / are correct?'),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 15, // Question row: 15%
          optionsRowHeight: 70, // Options row: 70%
          feedbackRowHeight: 15, // Feedback row: 15%
          optionButtonWidth: 100,
          optionButtonHeight: 90,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '32gc', // Font size for option button text (in gc units)
          optionButtonTextColor: '#000000', // White text color for option buttons
          optionButtonBackgroundColor: '#FF6600', // Orange background for option buttons
          optionImageSizeMultiplier: 1.1, // Increase image size by 10%
          optionImageWidth: null, // Direct control over image width (null = use multiplier)
          optionImageHeight: null, // Direct control over image height (null = use multiplier)
          // Options data for QT4 (4 options)
          get options() {
            const quizPanelData = getI18nText('pages.page9.quizPanel', {});
            if (quizPanelData && quizPanelData.options && Array.isArray(quizPanelData.options) && quizPanelData.options.length > 0) {
              return quizPanelData.options;
            }
            // Fallback - should not be needed if data.js is properly configured
            return [
              { 
                text: getI18nText('pages.page9.quizPanel.options.0.text', "a = 1 cm, b = 1 cm, c = √2 cm"),
                feedback: getI18nText('pages.page9.quizPanel.options.0.feedback', "Great job! This is correct. In an isosceles right triangle, when a = b = 1, then c = √2."),
                iscorrect: true
              },
              {
                text: getI18nText('pages.page9.quizPanel.options.1.text', "a = 4√2, b = 4 cm, c = 4 cm"),
                feedback: getI18nText('pages.page9.quizPanel.options.1.feedback', "Not quite. Remember, in an isosceles right triangle, the two legs (a and b) must be equal. Here a ≠ b, so this cannot be correct."),
                iscorrect: false
              },
              {
                text: getI18nText('pages.page9.quizPanel.options.2.text', "a = 6 cm, b = 6 cm, c = 6√2 cm"),
                feedback: getI18nText('pages.page9.quizPanel.options.2.feedback', "Excellent! This is correct. When a = b = 6, then c = 6√2."),
                iscorrect: true
              },
              {
                text: getI18nText('pages.page9.quizPanel.options.3.text', "a = 10 cm, b = 10 cm, c = 6√2 cm"),
                feedback: getI18nText('pages.page9.quizPanel.options.3.feedback', "Not quite. Let's check: if a = 10 and b = 10, then c should be 10√2, not 6√2. Try again!"),
                iscorrect: false
              }
            ];
          }
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
            "Choose the correct answer"
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
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 9 }
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
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 10'));
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
                enableOnEventFilter: { pageNumber: 9 }
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 8'));
                        }
                    }
                }
            }
        },
        
    ],

    10: [

      // Header Text - "Let us find the relationship between p and q"
      {
        id: 'page10-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page3.headerText',
            "Let us find the relationship between the sides of a isoceles right △"
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
        id: 'page10-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [50, 150, 950, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          sides: [15, 15, 15 * Math.sqrt(2)], // Isosceles right triangle: AC = 15, BC = 15, AB = 15√2
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right',
          rotation: 315, // Rotation angle in degrees (0 = no rotation, positive = clockwise)
          
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
            show: true, // Show vertex labels
            labels: getI18nText('pages.page10.triangleLabels.vertexLabels', ['B', 'D', 'C']),
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
          // For isosceles right triangle: AC = a, BC = a, AB = a√2
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page10.triangleLabels.sideLabels', ['c = x + y', 'a = x', 'b']), // Side labels: AB = a√2 (hypotenuse), BC = a = 60 cm, AC = a
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 50, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [308, 90, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page10.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle (empty string skips that vertex)
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Table Component - Side values
      {
        id: 'page10-side-table',
        name: 'side-table',
        type: 'custom',
        coordinates: [600, 200, 1100, 600], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: getI18nText('pages.page10.tableHeaders', [
              '<span style="color: #FF6600;">a</span>', // Orange for 'a'
              '<span style="color: #00FF7F;">b</span>', // Green for 'b'
              '<span style="color: #4A90E2;">c</span>'  // Blue for 'c'
            ]),
            rows: getI18nText('pages.page10.tableRows', [
              ['<span style="color: #FF6600;">1</span>', '<span style="color: #00FF7F;">√3</span>', '<span style="color: #4A90E2;">2</span>'], // Row 1
              ['<span style="color: #FF6600;">60</span>', '', '']  // Row 2
            ])
          },
          borderColor: '#ffffff',
          headerBackgroundColor: 'rgba(74, 85, 104, 0.8)',
          headerTextColor: '#ffffff',
          cellBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          textColor: '#ffffff',
          fontSize: '36gc',
          headerFontSize: '40gc',
          padding: '15gc',
          borderRadius: '8gc',
          borderWidth: '2px',
          equalColumnWidths: true,
          cellHeight: '80gc',
          rowGap: '0gc',
          columnGap: '0gc'
        }
      },

      // Left Arrow Image
      {
        id: "page10-left-arrow",
        name: "page10-left-arrow",
        type: "container",
        coordinates: [1085, 200, 1225, 700], // Position near the blank
        zIndex: 60,
        props: {
          imageSrc: "assets/leftArrow.png",
          imageAlt: getI18nText("common.imageAlt.leftArrow", "Left Arrow"),
          backgroundColor: "transparent",
        },
      },

      // Text "x" before blank1
      {
        id: "page10-x-text",
        name: "x-text",
        type: "custom",
        coordinates: [1100, 400, 1140, 475], // Positioned before blank1 (blank1 is at [1150, 400, 1250, 475])
        zIndex: 65,
        props: {
          componentType: "TeacherNoteComponent",
          text: getI18nText("pages.page10.xText", "x"),
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "0gc",
          textColor: "#FF6600", // Orange color
          fontSize: "40gc",
          padding: "0gc",
          textAlign: "center",
          fontWeight: "normal"
        }
      },

      // Fill Blanks Component
      {
        id: "page10-fill-blanks",
        name: "page10-fill-blanks-component",
        type: "custom",
        coordinates: [0, 800, 1550, 815], // Positioned at bottom of page
        zIndex: 550,
        props: {
          componentType: "FillBlanksComponent",
          blanks: [
            { id: "blank1", coordinate: [1150, 400, 1250, 475], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
            { id: "blank2", coordinate: [780, 475, 920, 550], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },
            { id: "blank3", coordinate: [935, 475, 1075, 550], image: "", bgColor: "#ffff00", fontColor: "#000000", bgBlink: true },

          ],
          blankBorderWidth: "2gc",
          blankBorderColor: "blue",
          blankBorderType: "solid",
          blankBackgroundColor: "white",
          blankFontSize: "32gc",
          blankFontColor: "#000000",
          optionsContainerCoordinates: [1275, 100, 1575, 800],
          optionsBorderWidth: "2gc",
          optionsBorderColor: "#ffffff",
          optionsBorderType: "dashed",
          optionsBackgroundColor: "transparent",
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText("pages.page10.fillBlanks.instructionText", "Choose the correct answer"),
          optionButtonColor: "#2a3f5f",
          optionButtonFontSize: "24gc",
          optionButtonFontColor: "#ffffff",
          optionsRows: 5,
          optionsColumns: 1,
          wiggleDuration: 1000,
          highlightUnfilledBlanksOnWrong: true,
          unfilledBlankWiggleDuration: 1000,
          mode: "MCQ", // 'MCQ' (drag and drop) or 'MCQ' (multiple choice question)
          options: getI18nText("pages.page10.fillBlanks.options", []),
          impFormulae: getI18nText("pages.page10.fillBlanks.impFormulae", []),
        },
      },

      // Feedback Textbox Component
      {
        id: "page10-feedback-textbox",
        name: "page10-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 715, 1250, 800], // Position above fill blanks component
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page10-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponentw
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "32gc",
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
        id: 'page10-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page10.footerInstruction',
            "Choose the correct answer to find the length of the sides"
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
        id: 'page10-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 10 }
        }
      },

      // Optimized Next button - Three Layer Structure
        {
            id: 'page10-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    const pageNumber = extractPageNumberFromId('page10-next-button');
                    return getNextButtonText(pageNumber);
                },
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    const pageNumber = extractPageNumberFromId('page10-next-button');
                    const nav = getPageNavigation(pageNumber);
                    if (nav && nav.next !== null && typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(nav.next);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(nav.next);
                        } else {
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 11'));
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
                enableOnEventFilter: { pageNumber: 10 }
            }
        },

      // Previous button - Three Layer Structure
        {
            id: 'page10-previous-button',
            name: 'previous-button',
            type: 'button',
            coordinates: [5, 820, 150, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.previous', '«');
                },
                get disabled() {
                    const pageNumber = extractPageNumberFromId('page10-previous-button');
                    return isPrevButtonDisabled(pageNumber);
                },
                onClick: () => {
                    const pageNumber = extractPageNumberFromId('page10-previous-button');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 9'));
                        }
                    }
                }
            }
        },
        
    ],

    11: [

      // Header Text - "Let us summarise"
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
            "Let us summarise"
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
        id: 'page11-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [50, 50, 700, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          // Right triangle: sides 15, 20, 25 (3-4-5 triangle)
          // Right angle at B (top-right), A=30°, B=90°, C=60°
          // Sides array: [side opposite A, side opposite B, side opposite C]
          // Hypotenuse is opposite the right angle (B), so it should be at index 1
          // Reordering to ensure hypotenuse (25) is correctly labeled
          sides: [20, 25, 15], // Side opposite A = 20, side opposite B (hypotenuse) = 25, side opposite C = 15
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right', // Right angle at vertex D (top-right)
          rotation: 90, // No rotation needed
          
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          // This allows overriding vertex naming directly via prop
          vertexLabels: getI18nText('pages.page11.triangleLabels.vertexLabels', ['A', 'B', 'C']),
          
          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page11.triangleLabels.vertexLabels', ['A', 'B', 'C']), // Fallback if vertexLabels not provided
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },
          
          // Side label configuration
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page11.triangleLabels.sideLabels', ['20 KM', '15 KM', '25 KM']),
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [125, 55, 90], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page11.angleLabels', ['', '90°', '']),
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Feedback Textbox Component - Summary Mode
      {
        id: "page11-feedback-textbox",
        name: "page11-feedback-textbox",
        type: "custom",
        coordinates: [600, 300, 1400, 600], // Centered position
        zIndex: 65,
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page11-feedback-textbox",
          text: getI18nText("pages.page11.feedbackTextbox.text", "The length of <span style=\"background-color: #FFD700; color: #000000; padding: 2px 4px;\">AC = 15</span>"),
          mode: "summary",
          allowHTML: true,
          fontSize: "32gc",
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
        id: 'page11-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page11.footerInstruction',
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
        id: 'page11-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          initialVisible: true,
          opacity: 0.35
        }
      },

      // Optimized Next button - Three Layer Structure
        {
            id: 'page11-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                text: getI18nText('buttons.startOver', 'Start Over'),
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
            id: 'page11-previous-button',
            name: 'previous-button',
            type: 'button',
            coordinates: [5, 820, 150, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.previous', '«');
                },
                get disabled() {
                    const pageNumber = extractPageNumberFromId('page11-previous-button');
                    return isPrevButtonDisabled(pageNumber);
                },
                onClick: () => {
                    const pageNumber = extractPageNumberFromId('page11-previous-button');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 10'));
                        }
                    }
                }
            }
        },
        
    ],

    12: [

      // Header Text - "Determine the sides of an isoceles △"
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
            "Determine the sides of an isoceles △"
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

      // Right Angle Triangle Component
      {
        id: 'page12-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [50, 50, 700, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          // Right triangle: sides 15, 20, 25 (3-4-5 triangle)
          // Right angle at B (top-right), A=30°, B=90°, C=60°
          // Sides array: [side opposite A, side opposite B, side opposite C]
          // Hypotenuse is opposite the right angle (B), so it should be at index 1
          // Reordering to ensure hypotenuse (25) is correctly labeled
          sides: [20, 25, 15], // Side opposite A = 20, side opposite B (hypotenuse) = 25, side opposite C = 15
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right', // Right angle at vertex D (top-right)
          rotation: 90, // No rotation needed
          
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          // This allows overriding vertex naming directly via prop
          vertexLabels: getI18nText('pages.page12.triangleLabels.vertexLabels', ['A', 'B', 'C']),
          
          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page12.triangleLabels.vertexLabels', ['A', 'B', 'C']), // Fallback if vertexLabels not provided
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },
          
          // Side label configuration
          // Right triangle: DC = a = 15, BC = b = 25 (hypotenuse), BD = c = 20
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page12.triangleLabels.sideLabels', ['a', 'b', 'c']), // Side labels: DC = a, BC = b, BD = c
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [125, 55, 60], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page12.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle: B = 30°, C = 60°, D = 90°
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Table Component
      {
        id: 'page12-table',
        name: 'table',
        type: 'custom',
        coordinates: [425, 125, 1200, 475], // Positioned to the right of the triangle
        zIndex: 60,
        props: {
          componentType: 'TableGridComponent',
          tableData: {
            headers: getI18nText('pages.page12.tableHeaders', ['', 'Side']),
            rows: getI18nText('pages.page12.tableRows', [
              ['side of the triangle represents the distance from the observer on land to the tourist boat', ''],
              ['side of the triangle represents the Distance between the two boats?', ''],
              ['side of the triangle represents the distance from the observer on land to the fishing boat', '']
            ])
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
          equalColumnWidths: false, // We want custom widths
          columnWidths: ['70%', '30%'], // First column wider for descriptions
          equalRowHeights: false, // Use cellHeight instead for more precise control
          cellHeight: '150gc', // Fixed height for all data cells to ensure equal row heights (increased to accommodate longer text)
          cellOverrides: {
            'header-0': { height: '40gc' }, // Half height for first header cell
            'header-1': { height: '40gc' }  // Half height for second header cell
          }
        }
      },

      // Fill Blanks Component
      {
        id: 'page12-fill-blanks',
        name: 'fill-blanks',
        type: 'custom',
        coordinates: [425, 150, 1200, 600], // Covers table area and options container
        zIndex: 65, // Above table
        props: {
          componentType: 'FillBlanksComponent',
          id: 'page12-fill-blanks', // Explicit ID for quiz detection
          blanks: [
            { 
              id: 'blank1', 
              coordinate: [972, 225, 1180, 325], // Column 2, Row 1 (with padding)
              text: '', 
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            { 
              id: 'blank2', 
              coordinate: [972, 375, 1180, 475], // Column 2, Row 2 (with padding)
              text: '', 
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            },
            { 
              id: 'blank3', 
              coordinate: [972, 525, 1180, 625], // Column 2, Row 3 (with padding)
              text: '', 
              image: '',
              bgColor: 'rgba(0, 0, 0, 0.4)',
              fontColor: '#ffffff',
              borderColor: '#ffffff',
              borderBlink: false,
              bgBlink: false,
              isDroppable: true
            }
          ],
          blankBorderWidth: '2gc',
          blankBorderColor: '#ffffff',
          blankBorderType: 'solid',
          blankBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          blankFontSize: '24gc',
          blankFontColor: '#ffffff',
          optionsContainerCoordinates: [1225, 150, 1575, 650], // Below the table
          optionsBorderWidth: '2gc',
          optionsBorderColor: '#ffffff',
          optionsBorderType: 'dashed',
          optionsBackgroundColor: 'transparent',
          showOptionsContainer: true,
          showOptionsContainerBorder: false,
          showOptionsRowBorders: false,
          optionContainerInstructionHeight: 30,
          optionContainerInstructionText: getI18nText('pages.page12.fillBlanks.instructionText', 'Drag the correct side to the matching statement in the table'),
          optionContainerInstructionTextColor: '#ffffff',
          optionButtonColor: '#2a3f5f',
          optionButtonFontSize: '24gc',
          optionButtonFontColor: '#ffffff',
          optionsRows: 3,
          optionsColumns: 1,
          optionButtonLayoutMode: 'auto',
          wiggleDuration: 1250,
          highlightUnfilledBlanksOnWrong: false,
          unfilledBlankWiggleDuration: 1000,
          showFeedback: true,
          mode: 'DND', // Drag and drop mode
          options: getI18nText('pages.page12.fillBlanks.options', []),
          retainOptionButtonStyle: false,
          keepOptionStyleWhenPlaced: false,
          allowMultiBlankPlacement: false,
          maxDropsPerOption: 1,
          impFormulae: getI18nText('pages.page12.fillBlanks.impFormulae', [])
        }
      },

      // Feedback Textbox Component
      {
        id: "page12-feedback-textbox",
        name: "page12-feedback-textbox-unique",
        type: "custom",
        coordinates: [25, 700, 1575, 780], // Position below the table and options container
        zIndex: 66, // Above fill blanks component
        props: {
          componentType: "FeedbackTextboxComponent",
          id: "page12-feedback-textbox", // Use pattern pageN-feedback-textbox to connect with FillBlanksComponent
          text: "", // Empty text by default - will be updated by FillBlanksComponent
          mode: "normal", // Normal mode by default - will be updated by FillBlanksComponent
          fontSize: "28gc",
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
        id: 'page12-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page12.footerInstruction',
            "Choose the correct answer"
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
        id: 'page12-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Hide by default, show when quiz is completed
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 12 }
        }
      },

      // Optimized Next button - Three Layer Structure
        {
            id: 'page12-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    const pageNumber = extractPageNumberFromId('page12-next-button');
                    return getNextButtonText(pageNumber);
                },
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    const pageNumber = extractPageNumberFromId('page12-next-button');
                    const nav = getPageNavigation(pageNumber);
                    if (nav && nav.next !== null && typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(nav.next);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(nav.next);
                        } else {
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 13'));
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
                enableOnEventFilter: { pageNumber: 12 }
            }
        },

      // Previous button - Three Layer Structure
        {
            id: 'page12-previous-button',
            name: 'previous-button',
            type: 'button',
            coordinates: [5, 820, 150, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.previous', '«');
                },
                get disabled() {
                    const pageNumber = extractPageNumberFromId('page12-previous-button');
                    return isPrevButtonDisabled(pageNumber);
                },
                onClick: () => {
                    const pageNumber = extractPageNumberFromId('page12-previous-button');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 11'));
                        }
                    }
                }
            }
        },
        
    ],

    13: [

      // Header Text - "Let us explore the triplet 6, 2 1/2, 6 1/2"
      {
        id: 'page13-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 75], // Header bar at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText(
            'pages.page13.headerText',
            "Let us verify that 4 m, 5 m, 6 m is a Pythagorean triplet"
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
        id: 'page13-question-background',
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
        id: 'page13-right-triangle',
        name: 'right-triangle',
        type: 'custom',
        coordinates: [50, 50, 700, 750], // Larger area for bigger triangle
        zIndex: 9999, // Highest z-index
        props: {
          componentType: 'RightAngleTriangleComponent',
          
          // Triangle configuration
          // Right triangle: sides 15, 20, 25 (3-4-5 triangle)
          // Right angle at B (top-right), A=30°, B=90°, C=60°
          // Sides array: [side opposite A, side opposite B, side opposite C]
          // Hypotenuse is opposite the right angle (B), so it should be at index 1
          // Reordering to ensure hypotenuse (25) is correctly labeled
          sides: [20, 25, 15], // Side opposite A = 20, side opposite B (hypotenuse) = 25, side opposite C = 15
          autoFit: true, // Automatically scale triangle to fit container while maintaining proportions
          rightAnglePosition: 'bottom-right', // Right angle at vertex D (top-right)
          rotation: 90, // No rotation needed
          
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
          // Direct vertexLabels prop (takes precedence over vertexLabel.labels)
          // This allows overriding vertex naming directly via prop
          vertexLabels: getI18nText('pages.page13.triangleLabels.vertexLabels', ['A', 'B', 'C']),
          
          vertexLabel: {
            show: true, // Show vertex labels
            labels: getI18nText('pages.page13.triangleLabels.vertexLabels', ['A', 'B', 'C']), // Fallback if vertexLabels not provided
            color: '#ffffff',
            fontSize: '30gc', // Larger labels
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [50, 75, 75], // Individual offsets for each vertex [A, B, C] in grid units
            rotation: [0, 0, 0] // Individual rotations for each vertex label [A, B, C] in degrees
          },
          
          // Side label configuration
          // Right triangle: DC = a = 15, BC = b = 25 (hypotenuse), BD = c = 20
          sideLabel: {
            show: true,
            labels: getI18nText('pages.page13.triangleLabels.sideLabels', ['a', 'b', 'c']), // Side labels: DC = a, BC = b, BD = c
            color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // White text for all side labels
            fontSize: '30gc', // Larger side labels
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'inherit',
            textDecoration: 'none',
            offset: [125, 55, 90], // Individual offsets for each side label [sideA, sideB, sideC] in grid units
            rotation: [0, 0, 0], // Individual rotations for each side label [sideA, sideB, sideC] in degrees
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
          },
          
          // Angle labels (for non-right angles)
          showAngleLabels: true,
          angleLabels: getI18nText('pages.page13.angleLabels', ['30°', '60°', '90°']), // Labels for each vertex angle: B = 30°, C = 60°, D = 90°
          angleLabelColor: '#FFFFFF',
          angleLabelFontSize: '24gc',
          angleLabelFontWeight: 'normal',
          angleLabelFontFamily: 'inherit',
          angleLabelOffset: 110,
          
          // Angle arc markers (for non-right angles)
          showAngleArcs: false,
          angleArcRadius: ['60gc', '50gc', '50gc'], // Radius for each angle arc (increased size)
          angleArcColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Color for each angle arc
          angleArcWidth: ['6', '3', '3'] // Stroke width for each angle arc (slightly thicker)
        }
      },

      // Solution Steps Component - Prove/Disprove Pythagorean Triple
      {
        id: 'page13-calculation-steps',
        name: 'calculation-steps',
        type: 'custom',
        coordinates: [425, 100, 1590, 750], // Positioned on the right side
        zIndex: 60,
        props: {
          componentType: 'CalculationStepsComponent',
          mode: 'text', // Changed from 'text-only' to 'text' to match example
          textCoordinates: [50, 80, 720, 500], // Text area within the component
          buttonCoordinates: [750, 350, 1150, 425], // Button below text
          buttonTextSize: '28gc', // Font size for button text
          stepGap: '10gc',
          defaultButtonText: getI18nText('buttons.next', '»'),
          // Tap GIF props
          showTapGif: true, // Show tap.gif animation
          tapGifCoordinates: [750, 375, 800, 425], // [x1, y1, x2, y2] coordinates for tap.gif
          tapGifOpacity: 0.75, // Opacity for tap.gif (0.0 to 1.0)
          tapGifSrc: 'assets/tap.gif', // Source path for tap.gif
          textStyle: {
            fontSize: '25gc',
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
          cardPaddingLeft: '30gc', // Optional: Left padding (space for step number)
          cardPaddingRight: '10gc', // Optional: Right padding
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
          headerText: getI18nText('pages.page13.calculationSteps.headerText', 'Solution Steps'),
          headerColor: '#ffffff',
          headerCoordinates: [50, 20, 500, 60],
          headerFontSize: '32gc',
          // Line configuration
          lineCoordinates: [50, 60, 375, 60], // Horizontal line below header
          lineColor: '#00FF7F',
          lineThickness: '3gc',
          lineStyle: 'solid',
          steps: (() => {
            const stepsData = getI18nText('pages.page13.calculationSteps.steps', []);
            if (!Array.isArray(stepsData) || stepsData.length === 0) {
              // Fallback if data not found - using getI18nText for internationalization
              return [
                {
                  type: 'formula',
                  text: getI18nText('pages.page13.calculationSteps.steps.0.text', 'Pythagoras\'s theorem: For a right triangle,<br>c² = a² + b², where c is the hypotenuse'),
                  buttonText: getI18nText('pages.page13.calculationSteps.steps.0.buttonText', 'Apply to our case')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page13.calculationSteps.steps.1.explainer', 'Given the vertical and horizontal sides'),
                  text: getI18nText('pages.page13.calculationSteps.steps.1.text', 'Vertical side (AB) = 20 km<br>Horizontal side (BC) = 15 km<br>We need to find the hypotenuse (AC)'),
                  buttonText: getI18nText('pages.page13.calculationSteps.steps.1.buttonText', 'Calculate squares')
                },
                {
                  type: 'calculation',
                  explainer: getI18nText('pages.page13.calculationSteps.steps.2.explainer', 'Calculate the squares'),
                  text: getI18nText('pages.page13.calculationSteps.steps.2.text', 'AC² = AB² + BC²<br>AC² = 20² + 15²<br>AC² = 400 + 225 = 625'),
                  buttonText: getI18nText('pages.page13.calculationSteps.steps.2.buttonText', 'Find the hypotenuse')
                },
                {
                  type: 'answer',
                  explainer: getI18nText('pages.page13.calculationSteps.steps.3.explainer', 'Find the square root'),
                  text: getI18nText('pages.page13.calculationSteps.steps.3.text', 'AC = √625<br>AC = 25 km'),
                  buttonText: null
                }
              ];
            }
            return stepsData.map((step, index) => ({
              type: step.type || (index === 0 ? 'formula' : index === stepsData.length - 1 ? 'answer' : 'calculation'),
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

      // Instruction Text
      {
        id: 'page13-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [155, 820, 1445, 895], // Footer bar at bottom
        zIndex: 55,
        props: {
          componentType: 'SectionHeaderComponent',
          text: getI18nText(
            'pages.page13.footerInstruction',
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
        id: 'page13-tap-animation',
        name: 'tap-animation',
        type: 'custom',
        coordinates: [1450, 840, 1500, 890],
        zIndex: '999',
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          // Start hidden, show on quiz completion
          initialVisible: false,
          showOnEvent: 'quizCompleted',
          showOnEventFilter: { pageNumber: 13 }
        }
      },

      // Optimized Next button - Three Layer Structure
        {
            id: 'page13-next-button',
            name: 'next-button',
            type: 'button',
            coordinates: [1450, 820, 1595, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    const pageNumber = extractPageNumberFromId('page13-next-button');
                    return getNextButtonText(pageNumber);
                },
                onClick: () => {
            if (typeof window !== 'undefined' && window.playCarClickSound) {
              window.playCarClickSound('next');
                    }
                    const pageNumber = extractPageNumberFromId('page13-next-button');
                    const nav = getPageNavigation(pageNumber);
                    if (nav && nav.next !== null && typeof window !== 'undefined') {
                        if (window.changePageAndNotify) {
                            window.changePageAndNotify(nav.next);
                        } else if (window.navigateToPage) {
                            window.navigateToPage(nav.next);
                        } else {
                            window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: nav.next } }));
                            console.log('📄 [Next Button]', getI18nText('messages.nextButtonPage2', 'Dispatched page change event to page 14'));
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
                enableOnEventFilter: { pageNumber: 13 }
            }
        },

      // Previous button - Three Layer Structure
        {
            id: 'page13-previous-button',
            name: 'previous-button',
            type: 'button',
            coordinates: [5, 820, 150, 895],
            zIndex: 'var(--z-button)',
            props: {
                get text() {
                    return getI18nText('buttons.previous', '«');
                },
                get disabled() {
                    const pageNumber = extractPageNumberFromId('page13-previous-button');
                    return isPrevButtonDisabled(pageNumber);
                },
                onClick: () => {
                    const pageNumber = extractPageNumberFromId('page13-previous-button');
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
                            console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 12'));
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
