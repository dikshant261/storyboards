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

// English navigation: 1 -> 2 -> 3 -> 4 -> 5 -> 12 -> 18 -> 13 -> 15 -> 19 -> 17
// Common page navigation for all languages: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12
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
  // Helper function to get current division question data
  const getCurrentDivisionQuestion = () => {
    const currentIndex =
      typeof window !== "undefined" && window.currentQuestionIndex !== undefined
        ? window.currentQuestionIndex
        : 0;

    // Get division questions array
    const divisionQuestions = getI18nText('common.divisionQuestions', []);

    // Default to first question if array is empty or index is out of bounds
    if (!Array.isArray(divisionQuestions) || divisionQuestions.length === 0) {
      return { dividend: 16, divisor: 8, quotient: 2, sequence: ['quotient', 'dividend', 'divisor'] };
    }

    // Wrap around if index exceeds array length
    const safeIndex = currentIndex % divisionQuestions.length;
    const question = divisionQuestions[safeIndex];

    return question || { dividend: 16, divisor: 8, quotient: 2, sequence: ['quotient', 'dividend', 'divisor'] };
  };

  // Expose getCurrentDivisionQuestion on window for use by other components
  if (typeof window !== 'undefined') {
    window.getCurrentDivisionQuestion = getCurrentDivisionQuestion;
  }

  // Helper function to get correct tile for a page based on sequence
  const getCorrectTileForPage = (pageNumber) => {
    const question = getCurrentDivisionQuestion();
    const sequence = question.sequence || ['quotient', 'dividend', 'divisor'];

    // Page 2 = sequence[0], Page 3 = sequence[1], Page 4 = sequence[2]
    const sequenceIndex = pageNumber - 2;
    if (sequenceIndex >= 0 && sequenceIndex < sequence.length) {
      return sequence[sequenceIndex];
    }
    return null;
  };

  // Helper function to check if tile should be clickable
  const isTileClickableForPage = (tileType, pageNumber) => {
    const question = getCurrentDivisionQuestion();
    const sequence = question.sequence || ['quotient', 'dividend', 'divisor'];

    // Find the index of this tile type in the sequence
    const tileIndexInSequence = sequence.indexOf(tileType);

    // If tile not found in sequence, default behavior
    if (tileIndexInSequence === -1) {
      return pageNumber !== 4; // All clickable except on page 4
    }

    // On page 4, no tiles are clickable
    if (pageNumber === 4) {
      return false;
    }

    // On page 2, all tiles are clickable (no previous answers)
    if (pageNumber === 2) {
      return true;
    }

    // For page 3: sequence[pageNumber-3] = sequence[0] should be disabled
    // (it was answered on page 2)
    // All other tiles should be clickable (correct answer shows green, wrong answers show red/wiggle)
    if (pageNumber === 3) {
      const previousSequenceIndex = pageNumber - 3; // For page 3, this is 0
      if (tileIndexInSequence === previousSequenceIndex) {
        return false; // This tile was answered on previous page, disable it
      }
      // All other tiles are clickable (correct answer will be handled by createTileClickHandler)
      return true;
    }

    return false;
  };

  // Helper function to check if badge should be visible
  const isBadgeVisibleForPage = (tileType, pageNumber) => {
    const question = getCurrentDivisionQuestion();
    const sequence = question.sequence || ['quotient', 'dividend', 'divisor'];

    // Find the index of this tile type in the sequence
    const tileIndexInSequence = sequence.indexOf(tileType);

    // If tile not found in sequence, default behavior
    if (tileIndexInSequence === -1) {
      return pageNumber === 4; // Only visible on page 4 if not in sequence
    }

    // On page 4, all badges are visible
    if (pageNumber === 4) {
      return true;
    }

    // For page 3: sequence[pageNumber-3] = sequence[0] badge should be visible
    // (it was answered on page 2)
    if (pageNumber === 3) {
      const previousSequenceIndex = pageNumber - 3; // For page 3, this is 0
      if (tileIndexInSequence === previousSequenceIndex) {
        return true; // This tile was answered on previous page, show its badge
      }
    }

    // Badge is visible if it appears before the current sequence index
    // (i.e., it was already answered on a previous page)
    const currentSequenceIndex = pageNumber - 2;
    if (tileIndexInSequence < currentSequenceIndex) {
      return true;
    }

    return false;
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Helper function to create tile click handler
  const createTileClickHandler = (tileType, pageNumber) => {
    return (e) => {
      e.stopPropagation();

      // Check if tiles are disabled (all correct on page 2)
      if (pageNumber === 2 && typeof window !== 'undefined' && window.page2QuizCompleted) {
        console.log(`🔒 [Tile] Tiles are disabled - quiz completed`);
        return;
      }

      const tileId = `page${pageNumber}-tile-${tileType}`;
      let tileElement = document.getElementById(tileId);

      // Fallback: try to find by data attribute
      if (!tileElement) {
        tileElement = document.querySelector(`[data-element-name="tile-${tileType}"]`);
      }

      console.log(`🎯 ${capitalizeFirstLetter(tileType)} tile clicked on page ${pageNumber}, element:`, tileElement);

      if (!tileElement) {
        console.error(`❌ Could not find ${tileType} tile element`);
        return;
      }

      // Set all tiles on this page to out-of-focus or filled mode, then set clicked tile to focus
      const allTileTypes = ['dividend', 'divisor', 'quotient', 'divide', 'equals'];
      allTileTypes.forEach((type) => {
        const otherTileId = `page${pageNumber}-tile-${type}`;
        const otherTileElement = document.getElementById(otherTileId);
        if (otherTileElement && type !== tileType) {
          // Check if tile has a value - if yes, set to 'filled', otherwise 'out-of-focus'
          const tileText = otherTileElement.textContent || otherTileElement.innerText || '';
          const hasValue = tileText.trim().length > 0;
          const newMode = hasValue ? 'filled' : 'out-of-focus';

          const updateEvent = new CustomEvent('tileModeUpdated', {
            detail: { mode: newMode, destinationId: otherTileId },
            bubbles: true
          });
          window.dispatchEvent(updateEvent);
          otherTileElement.setAttribute('data-tile-mode', newMode);
          console.log(`🔘 [Tile] Set ${otherTileId} to ${newMode} mode (hasValue: ${hasValue})`);
        }
      });

      // Set clicked tile to focus mode
      const focusEvent = new CustomEvent('tileModeUpdated', {
        detail: { mode: 'focus', destinationId: tileId },
        bubbles: true
      });
      window.dispatchEvent(focusEvent);
      tileElement.setAttribute('data-tile-mode', 'focus');

      // Store the focused tile ID globally for number pad
      if (typeof window !== 'undefined') {
        window.focusedTileId = tileId;
        window.focusedTilePage = pageNumber;
        // Set flag to indicate this tile was just focused - next input should reset it
        window.tileJustFocused = true;
        console.log(`✅ [Tile] Set ${tileId} to focus mode and stored as focused tile (will reset on first input)`);
      }

      // Note: Removed answer checking and wiggle animation - tiles now only handle focus mode
    };
  };

  // Helper function to get current question data (optimized) - kept for backward compatibility
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

      // Top Instruction Text - "Write  as Mathematical Sentence for division."
      {
        id: 'page1-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 100], // Header at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.headerText', "Write  as Mathematical Sentence for division."),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange text
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Left (70% width)
      {
        id: 'page1-main-container-left',
        name: 'main-container-left',
        type: 'custom',
        coordinates: [25, 100, 1105, 800], // Left 70% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // "Division Sentence" Title in left panel
      {
        id: 'page1-division-sentence-title',
        name: 'division-sentence-title',
        type: 'custom',
        coordinates: [50, 205, 1080, 275], // Top of left container (moved down by 35gc more)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('labels.divisionSentence', 'Division Sentence'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange/warm color
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // First blank tile (left)
      {
        id: 'page1-tile-1',
        name: 'tile-1',
        type: 'tile',
        coordinates: [200, 300, 350, 450], // Centered horizontally in left panel
        zIndex: 52,
        props: {
          mode: 'normal',
          text: '', // Empty blank tile
          backgroundColor: '#C8C8C8', // Light grey background
          borderColor: '#969696', // Darker grey border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#808080',
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Division symbol (÷)
      {
        id: 'page1-divide-symbol',
        name: 'divide-symbol',
        type: 'custom',
        coordinates: [370, 320, 450, 430], // Between first and second tile
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '÷',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Second blank tile (middle)
      {
        id: 'page1-tile-2',
        name: 'tile-2',
        type: 'tile',
        coordinates: [470, 300, 620, 450], // Centered horizontally in left panel
        zIndex: 52,
        props: {
          mode: 'normal',
          text: '', // Empty blank tile
          backgroundColor: '#C8C8C8', // Light grey background
          borderColor: '#969696', // Darker grey border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#808080',
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Equals symbol (=)
      {
        id: 'page1-equals-symbol',
        name: 'equals-symbol',
        type: 'custom',
        coordinates: [640, 320, 720, 430], // Between second and third tile
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Third blank tile (right)
      {
        id: 'page1-tile-3',
        name: 'tile-3',
        type: 'tile',
        coordinates: [740, 300, 890, 450], // Centered horizontally in left panel
        zIndex: 52,
        props: {
          mode: 'normal',
          text: '', // Empty blank tile
          backgroundColor: '#C8C8C8', // Light grey background
          borderColor: '#969696', // Darker grey border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#808080',
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Right (30% width)
      {
        id: 'page1-main-container-right',
        name: 'main-container-right',
        type: 'custom',
        coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },


      // START Button - Three Layer Structure
      {
        id: 'page1-start-button',
        name: 'start-button',
        type: 'button',
        coordinates: [1193, 355, 1493, 455], // Centered in right panel
        zIndex: 53,
        props: {
          className: 'applet-button',
          frameClassName: 'applet-button-frame',
          contentClassName: 'applet-button-content',
          frameGap: '6.25gc',
          text: getI18nText('pages.page1.startButtonText', 'START'),
          backgroundColor: 'var(--color-gold)',
          color: '#000000', // Black text
          fontSize: '48gc',
          fontWeight: 'bold',
          borderRadius: '15gc',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          onClick: () => {
            // Handle START button click - navigate to page 2 with visual feedback
            const buttonElement = document.getElementById('page1-start-button');

            // Visual feedback: scale animation
            if (buttonElement) {
              buttonElement.style.transform = 'scale(0.95)';
              buttonElement.style.transition = 'transform 0.1s ease';
              setTimeout(() => {
                buttonElement.style.transform = 'scale(1)';
                setTimeout(() => {
                  buttonElement.style.transition = '';
                }, 100);
              }, 100);
            }

            // Play click sound
            if (typeof window !== 'undefined') {
              if (window.playCarClickSound) {
                window.playCarClickSound('next');
              } else if (window.SoundManager && window.SoundManager.play) {
                window.SoundManager.play('click');
              }
            }

            // Navigate to page 2
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                if (window.changePageAndNotify) {
                  window.changePageAndNotify(2);
                } else if (window.navigateToPage) {
                  window.navigateToPage(2);
                } else {
                  window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
                }
              }
            }, 150);
          }
        }
      },

      // Tap Animation on START Button
      {
        id: 'page1-start-tap-animation',
        name: 'start-tap-animation',
        type: 'custom',
        coordinates: [1195, 375, 900, 450], // Centered on START button
        zIndex: 60, // Higher z-index to be on top
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          opacity: 0.7, // 30% opacity
          style: {
            pointerEvents: 'none' // Allow clicks to pass through to the button below
          }
        }
      },

      // Bottom prompt bar - "Tap Start."
      {
        id: 'page1-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [5, 800, 1575, 900], // Footer bar at bottom
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page1.footerInstruction', "Tap Start."),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

    ],

    2: [

      // Top Instruction Text - "Choose the multiplication TABLE that matches."
      {
        id: 'page2-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 100], // Header at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.headerText', "Choose the multiplication TABLE that matches."),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange text
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Left (70% width)
      {
        id: 'page2-main-container-left',
        name: 'main-container-left',
        type: 'custom',
        coordinates: [25, 100, 1105, 800], // Left 70% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // "Division Sentence" Title in left panel
      {
        id: 'page2-division-sentence-title',
        name: 'division-sentence-title',
        type: 'custom',
        coordinates: [50, 205, 1080, 275], // Top of left container (moved down by 35gc more)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('labels.divisionSentence', 'Division Sentence'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange/warm color
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // First tile (left) - filled with dividend
      {
        id: 'page2-tile-1',
        name: 'dividend',
        type: 'tile',
        coordinates: [200, 300, 350, 450], // Centered horizontally in left panel
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividendValue = question && question.dividend ? String(question.dividend) : '';
          console.log('🔍 [Page2 Tile 1] Computing props, dividend value:', dividendValue, 'Question:', question);
          return {
            mode: 'normal',
            text: dividendValue,
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Division symbol (÷)
      {
        id: 'page2-divide-symbol',
        name: 'divide-symbol',
        type: 'custom',
        coordinates: [370, 320, 450, 430], // Between first and second tile
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '÷',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Second tile (middle) - filled with divisor
      {
        id: 'page2-tile-2',
        name: 'divisor',
        type: 'tile',
        coordinates: [470, 300, 620, 450], // Centered horizontally in left panel
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const divisorValue = question && question.divisor ? String(question.divisor) : '';
          console.log('🔍 [Page2 Tile 2] Computing props, divisor value:', divisorValue, 'Question:', question);
          return {
            mode: 'normal',
            text: divisorValue,
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Equals symbol (=)
      {
        id: 'page2-equals-symbol',
        name: 'equals-symbol',
        type: 'custom',
        coordinates: [640, 320, 720, 430], // Between second and third tile
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Third blank tile (right)
      {
        id: 'page2-tile-3',
        name: 'quotient',
        type: 'tile',
        coordinates: [740, 300, 890, 450], // Centered horizontally in left panel
        zIndex: 52,
        props: {
          mode: 'normal',
          text: '', // Empty blank tile
          backgroundColor: '#C8C8C8', // Light grey background
          borderColor: '#969696', // Darker grey border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#808080',
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Text below division tiles: "Which multiplication table do we need to use for <dividend>÷ <divisor>"
      {
        id: 'page2-multiplication-question-text',
        name: 'multiplication-question-text',
        type: 'custom',
        coordinates: [200, 530, 1000, 600], // Below the tiles, centered (moved down by 25gc more)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividend = question && question.dividend ? question.dividend : '';
          const divisor = question && question.divisor ? question.divisor : '';
          const text = getI18nText('pages.page2.multiplicationQuestionText', 'Which multiplication table do we need to use for {dividend} ÷ {divisor}?', { dividend, divisor });
          return {
            componentType: 'TeacherNoteComponent',
            text: text,
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0gc',
            textColor: '#ffffff', // White text
            fontSize: '40gc',
            fontWeight: 'normal',
            padding: '10gc',
            textAlign: 'center'
          };
        }
      },

      // Button 1: "Table of <Dividend>"
      {
        id: 'page2-table-of-dividend-button',
        name: 'table-of-dividend-button',
        type: 'button',
        coordinates: [200, 645, 500, 717], // Left side below text (height increased by 20%)
        zIndex: 52,
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page2ButtonState) {
            window.page2ButtonState = {
              dividendClicked: false,
              divisorClicked: false
            };
          }

          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividend = question && question.dividend ? question.dividend : '';

          const buttonState = typeof window !== 'undefined' && window.page2ButtonState
            ? window.page2ButtonState
            : { dividendClicked: false, divisorClicked: false };

          // Dividend button is only disabled when it itself is clicked
          const isDisabled = buttonState.dividendClicked;
          const backgroundColor = buttonState.dividendClicked
            ? 'var(--color-salmon)' // Salmon color when clicked
            : '#FFD700'; // Gold background

          return {
            text: getI18nText('pages.page2.tableOfDividend', 'Table of {dividend}', { dividend }),
            backgroundColor: backgroundColor,
            color: '#000000', // Black text
            fontSize: '32gc',
            fontWeight: 'bold',
            borderRadius: '10gc',
            border: 'none',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            padding: '15gc',
            disabled: isDisabled,
            onClick: () => {
              if (isDisabled) return;

              console.log(`🔘 [Page2] Table of ${dividend} button clicked`);

              // Play wrong sound for dividend button
              if (typeof window !== 'undefined') {
                if (window.playAnswerSound) {
                  window.playAnswerSound(false); // false = wrong sound
                } else if (window.playCarClickSound) {
                  window.playCarClickSound('wrong');
                } else if (window.SoundManager && window.SoundManager.play) {
                  window.SoundManager.play('wrong');
                }
              }

              // Update state
              if (typeof window !== 'undefined') {
                if (!window.page2ButtonState) {
                  window.page2ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false
                  };
                }
                window.page2ButtonState.dividendClicked = true;

                // Trigger re-render
                if (typeof window.forceAppUpdate === 'function') {
                  window.forceAppUpdate();
                }
              }
            }
          };
        }
      },

      // Button 2: "Table of <Divisor>"
      {
        id: 'page2-table-of-divisor-button',
        name: 'table-of-divisor-button',
        type: 'button',
        coordinates: [600, 645, 900, 717], // Right side below text (height increased by 20%)
        zIndex: 52,
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page2ButtonState) {
            window.page2ButtonState = {
              dividendClicked: false,
              divisorClicked: false
            };
          }

          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const divisor = question && question.divisor ? question.divisor : '';

          const buttonState = typeof window !== 'undefined' && window.page2ButtonState
            ? window.page2ButtonState
            : { dividendClicked: false, divisorClicked: false };

          const isDisabled = buttonState.divisorClicked;
          const backgroundColor = buttonState.divisorClicked
            ? '#008000' // Green background
            : '#FFD700'; // Gold background

          return {
            text: getI18nText('pages.page2.tableOfDivisor', 'Table of {divisor}', { divisor }),
            backgroundColor: backgroundColor,
            color: '#000000', // Black text
            fontSize: '32gc',
            fontWeight: 'bold',
            borderRadius: '10gc',
            border: 'none',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            padding: '15gc',
            disabled: isDisabled,
            onClick: () => {
              if (isDisabled) return;

              console.log(`🔘 [Page2] Table of ${divisor} button clicked`);

              // Play correct sound for divisor button
              if (typeof window !== 'undefined') {
                if (window.playAnswerSound) {
                  window.playAnswerSound(true); // true = correct sound
                } else if (window.playCarClickSound) {
                  window.playCarClickSound('correct');
                } else if (window.SoundManager && window.SoundManager.play) {
                  window.SoundManager.play('correct');
                }
              }

              // Update state - only update divisor button state
              if (typeof window !== 'undefined') {
                if (!window.page2ButtonState) {
                  window.page2ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false
                  };
                }
                window.page2ButtonState.divisorClicked = true;

                // Trigger re-render
                if (typeof window.forceAppUpdate === 'function') {
                  window.forceAppUpdate();
                }
              }
            }
          };
        }
      },

      // Orange-bordered container with black background - Right (30% width)
      {
        id: 'page2-main-container-right',
        name: 'main-container-right',
        type: 'custom',
        coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },


      // Next Button - Three Layer Structure
      {
        id: 'page2-start-button',
        name: 'start-button',
        type: 'button',
        coordinates: [1193, 355, 1493, 455], // Centered in right panel
        zIndex: 53,
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page2ButtonState) {
            window.page2ButtonState = {
              dividendClicked: false,
              divisorClicked: false
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page2ButtonState
            ? window.page2ButtonState
            : { dividendClicked: false, divisorClicked: false };

          // Next button is disabled until divisor button is clicked
          const isDisabled = !buttonState.divisorClicked;

          return {
            className: 'applet-button',
            frameClassName: 'applet-button-frame',
            contentClassName: 'applet-button-content',
            frameGap: '6.25gc',
            text: getI18nText('pages.page2.nextButton', 'Next'),
            backgroundColor: isDisabled ? '#CCCCCC' : 'var(--color-gold)', // Grey when disabled, gold when enabled
            color: '#000000', // Black text
            fontSize: '48gc',
            fontWeight: 'bold',
            borderRadius: '15gc',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            disabled: isDisabled,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            onClick: () => {
              // Don't allow click if disabled
              if (isDisabled) {
                console.log('🔘 [Page2] Next button clicked but disabled - divisor button not clicked yet');
                return;
              }

              // Handle Next button click - navigate to page 3 with visual feedback
              const buttonElement = document.getElementById('page2-start-button');

              // Visual feedback: scale animation
              if (buttonElement) {
                buttonElement.style.transform = 'scale(0.95)';
                buttonElement.style.transition = 'transform 0.1s ease';
                setTimeout(() => {
                  buttonElement.style.transform = 'scale(1)';
                  setTimeout(() => {
                    buttonElement.style.transition = '';
                  }, 100);
                }, 100);
              }

              // Play click sound
              if (typeof window !== 'undefined') {
                if (window.playCarClickSound) {
                  window.playCarClickSound('next');
                } else if (window.SoundManager && window.SoundManager.play) {
                  window.SoundManager.play('click');
                }
              }

              // Navigate to page 3
              setTimeout(() => {
                if (typeof window !== 'undefined') {
                  if (window.changePageAndNotify) {
                    window.changePageAndNotify(3);
                  } else if (window.navigateToPage) {
                    window.navigateToPage(3);
                  } else {
                    window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 3 } }));
                  }
                }
              }, 150);
            }
          };
        }
      },

      // Tap Animation on START Button
      {
        id: 'page2-start-tap-animation',
        name: 'start-tap-animation',
        type: 'custom',
        coordinates: [1195, 375, 900, 450], // Centered on START button
        zIndex: 60, // Higher z-index to be on top
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page2ButtonState) {
            window.page2ButtonState = {
              dividendClicked: false,
              divisorClicked: false
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page2ButtonState
            ? window.page2ButtonState
            : { dividendClicked: false, divisorClicked: false };

          // Tap animation is hidden when Next button is disabled (divisor not clicked)
          const isNextDisabled = !buttonState.divisorClicked;

          return {
            componentType: 'TapGifComponent',
            imageSrc: 'assets/tap.gif',
            imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
            opacity: 0.7, // 30% opacity
            initialVisible: !isNextDisabled, // Hidden when Next is disabled, visible when enabled
            style: {
              pointerEvents: 'none', // Allow clicks to pass through to the button below
              display: isNextDisabled ? 'none' : 'block' // Hide when Next is disabled
            }
          };
        }
      },

      // Bottom prompt bar - "Tap the multiplication sentences that matches with given division sentences."
      {
        id: 'page2-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [5, 800, 1575, 900], // Footer bar at bottom
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.instructionText', "Tap the multiplication sentences that matches with given division sentences."),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

    ],

    3: [

      // Top Instruction Text - "Choose the multiplication TABLE that matches."
      {
        id: 'page3-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 100], // Header at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.headerText', 'Choose the multiplication Fact that matches.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange text
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Left (70% width)
      {
        id: 'page3-main-container-left',
        name: 'main-container-left',
        type: 'custom',
        coordinates: [25, 100, 1105, 800], // Left 70% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // "Multiplication Sentence" Title in left panel
      {
        id: 'page3-multiplication-sentence-title',
        name: 'multiplication-sentence-title',
        type: 'custom',
        coordinates: [-75, 125, 955, 195], // Above division sentence (moved up by 25gc, moved left by 125gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('labels.multiplicationSentence', 'Multiplication Sentence'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange/warm color
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Multiplication tile 1 (left) - Multiplicand (empty)
      {
        id: 'page3-multiplicand-tile',
        name: 'multiplicand',
        type: 'tile',
        coordinates: [75, 220, 225, 370], // Above division tiles (moved up by 25gc, moved left by 125gc)
        zIndex: 52,
        props: () => {
          return {
            mode: 'normal',
            text: '', // Empty tile
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Multiplication symbol (×)
      {
        id: 'page3-multiply-symbol',
        name: 'multiply-symbol',
        type: 'custom',
        coordinates: [235, 240, 315, 350], // Between multiplicand and multiplier (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Multiplication tile 2 (middle) - Multiplier (empty)
      {
        id: 'page3-multiplier-tile',
        name: 'multiplier',
        type: 'tile',
        coordinates: [325, 220, 475, 370], // Above division tiles (gap reduced to 10gc)
        zIndex: 52,
        props: () => {
          return {
            mode: 'normal',
            text: '', // Empty tile
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Equals symbol (=) for multiplication
      {
        id: 'page3-multiply-equals-symbol',
        name: 'multiply-equals-symbol',
        type: 'custom',
        coordinates: [485, 240, 565, 350], // Between multiplier and answer (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Multiplication tile 3 (right) - Answer (empty)
      {
        id: 'page3-answer-tile',
        name: 'answer',
        type: 'tile',
        coordinates: [575, 220, 725, 370], // Above division tiles (gap reduced to 10gc)
        zIndex: 52,
        props: () => {
          return {
            mode: 'normal',
            text: '', // Empty tile
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Horizontal separator line between multiplication and division sets
      {
        id: 'page3-separator-line',
        name: 'separator-line',
        type: 'line',
        coordinates: [75, 390, 725, 390], // Horizontal line between multiplication and division (aligned with tile layout)
        zIndex: 52,
        props: {
          componentType: 'LineComponent',
          lineType: 'horizontal',
          lineSubtype: 'line',
          borderWidth: '4gc',
          borderColor: '#ffffff', // White color
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // "Division Sentence" Title in left panel
      {
        id: 'page3-division-sentence-title',
        name: 'division-sentence-title',
        type: 'custom',
        coordinates: [-75, 405, 955, 475], // Top of left container (moved down by 25gc more, moved left by 125gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('labels.divisionSentence', 'Division Sentence'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange/warm color
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // First tile (left) - filled with dividend
      {
        id: 'page3-tile-1',
        name: 'dividend',
        type: 'tile',
        coordinates: [75, 500, 225, 650], // Centered horizontally in left panel (moved down by 25gc more, moved left by 125gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividendValue = question && question.dividend ? String(question.dividend) : '';
          console.log('🔍 [Page3 Tile 1] Computing props, dividend value:', dividendValue, 'Question:', question);
          return {
            mode: 'normal',
            text: dividendValue,
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Division symbol (÷)
      {
        id: 'page3-divide-symbol',
        name: 'divide-symbol',
        type: 'custom',
        coordinates: [235, 520, 315, 630], // Between first and second tile (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '÷',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Second tile (middle) - filled with divisor
      {
        id: 'page3-tile-2',
        name: 'divisor',
        type: 'tile',
        coordinates: [325, 500, 475, 650], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const divisorValue = question && question.divisor ? String(question.divisor) : '';
          console.log('🔍 [Page3 Tile 2] Computing props, divisor value:', divisorValue, 'Question:', question);
          return {
            mode: 'normal',
            text: divisorValue,
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Equals symbol (=)
      {
        id: 'page3-equals-symbol',
        name: 'equals-symbol',
        type: 'custom',
        coordinates: [485, 520, 565, 630], // Between second and third tile (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Third blank tile (right)
      {
        id: 'page3-tile-3',
        name: 'quotient',
        type: 'tile',
        coordinates: [575, 500, 725, 650], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 52,
        props: {
          mode: 'normal',
          text: '', // Empty blank tile
          backgroundColor: '#C8C8C8', // Light grey background
          borderColor: '#969696', // Darker grey border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#808080',
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Right (30% width)
      {
        id: 'page3-main-container-right',
        name: 'main-container-right',
        type: 'custom',
        coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Multiplication Table in right panel
      // Empty container behind multiplication table
      {
        id: 'page3-multiplication-table-container',
        name: 'multiplication-table-container',
        type: 'custom',
        coordinates: [750, 120, 1075, 790], // Same coordinates as multiplication table
        zIndex: 51, // Lower than multiplication table (z-index 52)
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty container
          backgroundColor: 'transparent', // Transparent background
          border: '4gc solid #ffffff', // White solid border 4gc
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Uses TimesTableComponent to generate multiplication table (1-10) based on quotient
      // Automatically calculates cell heights to fit within coordinates
      {
        id: 'page3-multiplication-table',
        name: 'multiplication-table',
        type: 'custom',
        coordinates: [760, 120, 1065, 700], // Inside right panel (moved left by 375gc total)
        zIndex: 52,
        props: () => {
          // Get current division question to extract the divisor (multiplier)
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const multiplier = question?.divisor || 4; // Use divisor as multiplier, fallback to 4
          const dividend = question?.dividend || 24; // Get dividend for checking correct answer
          const divisor = question?.divisor || 6; // Get divisor for filling tiles

          // Button click handler for multiplication table
          const handleButtonClick = (multiplierValue, value, result) => {
            console.log('🔘 [Page3] Button clicked:', { multiplierValue, value, result, dividend });

            // Reset all buttons to initial state first (in case of re-clicks)
            const numRows = 10; // rangeEnd - rangeStart + 1 = 10
            const defaultBgColor = '#E0E0E0'; // Default button background
            const defaultTextColor = '#000000'; // Default button text color

            for (let i = 1; i <= numRows; i++) {
              const buttonId = `times-table-btn-${multiplierValue}-${i}`;
              const button = document.getElementById(buttonId);
              if (button && !button.disabled) {
                // Only reset if button is not already disabled
                button.style.backgroundColor = defaultBgColor;
                button.style.color = defaultTextColor;
                button.style.filter = 'none';
                button.style.opacity = '1';
              }
            }

            // Check if this is the correct answer (result equals dividend)
            const isCorrect = result === dividend;

            if (isCorrect) {
              // Correct answer - fill tiles, play sound, update button states
              console.log('✅ [Page3] Correct answer! Filling tiles and updating buttons');

              // Play correct sound
              if (typeof window !== 'undefined' && window.playAnswerSound) {
                window.playAnswerSound(true);
              } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
                window.SimpleSoundManager.playAnswerSound(true);
              }

              // Fill multiplication tiles in the same order as the button
              // Button format: "multiplierValue × value = result"
              // So: Multiplicand = multiplierValue, Multiplier = value, Answer = result
              const multiplicandEvent = new CustomEvent('updateTileText', {
                detail: { elementId: 'page3-multiplicand-tile', text: String(multiplierValue) }
              });
              window.dispatchEvent(multiplicandEvent);

              const multiplierEvent = new CustomEvent('updateTileText', {
                detail: { elementId: 'page3-multiplier-tile', text: String(value) }
              });
              window.dispatchEvent(multiplierEvent);

              const answerEvent = new CustomEvent('updateTileText', {
                detail: { elementId: 'page3-answer-tile', text: String(result) }
              });
              window.dispatchEvent(answerEvent);

              // Update tile background colors using custom event
              // Multiplicand tile and divisor tile: #76A5AF
              // Multiplier tile: #C27BA0
              setTimeout(() => {
                // Update multiplicand tile background
                const multiplicandBgEvent = new CustomEvent('updateTileBackground', {
                  detail: { elementId: 'page3-multiplicand-tile', backgroundColor: '#76A5AF' }
                });
                window.dispatchEvent(multiplicandBgEvent);

                // Update multiplier tile background
                const multiplierBgEvent = new CustomEvent('updateTileBackground', {
                  detail: { elementId: 'page3-multiplier-tile', backgroundColor: '#C27BA0' }
                });
                window.dispatchEvent(multiplierBgEvent);

                // Update divisor tile background
                const divisorBgEvent = new CustomEvent('updateTileBackground', {
                  detail: { elementId: 'page3-tile-2', backgroundColor: '#76A5AF' }
                });
                window.dispatchEvent(divisorBgEvent);
              }, 100); // Small delay to ensure tiles are updated first

              // Update all buttons: correct one turns green, others turn gray and blur, all disabled
              const numRows = 10; // rangeEnd - rangeStart + 1 = 10
              for (let i = 1; i <= numRows; i++) {
                const buttonId = `times-table-btn-${multiplierValue}-${i}`;
                const button = document.getElementById(buttonId);
                if (button) {
                  if (i === value) {
                    // Correct button - green background
                    button.style.backgroundColor = '#4CAF50'; // Green
                    button.style.color = '#ffffff';
                    button.disabled = true;
                    button.style.cursor = 'not-allowed';
                  } else {
                    // Other buttons - gray and blur
                    button.style.backgroundColor = '#C0C0C0'; // Gray
                    button.style.color = '#808080';
                    button.style.filter = 'blur(2px)';
                    button.style.opacity = '0.6';
                    button.disabled = true;
                    button.style.cursor = 'not-allowed';
                  }
                }
              }

              // Mark correct answer as clicked and show Next button, hide hint button and textbox
              if (typeof window !== 'undefined') {
                if (!window.page3ButtonState) {
                  window.page3ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: false
                  };
                }
                window.page3ButtonState.correctAnswerClicked = true;

                // Show Next button and tap animation
                const nextButton = document.getElementById('page3-next-button');
                if (nextButton) {
                  nextButton.style.display = 'flex';
                }
                const nextTapAnimation = document.getElementById('page3-next-tap-animation');
                if (nextTapAnimation) {
                  nextTapAnimation.style.display = 'block';
                }

                // Hide hint button and textbox
                const hintButton = document.getElementById('page3-start-button');
                if (hintButton) {
                  hintButton.style.display = 'none';
                }
                const hintTextbox = document.getElementById('page3-hint-textbox');
                if (hintTextbox) {
                  hintTextbox.style.display = 'none';
                }

                // Trigger re-render to update visibility
                if (typeof window.forceAppUpdate === 'function') {
                  window.forceAppUpdate();
                }
              }
            } else {
              // Wrong answer - turn button salmon and disable
              console.log('❌ [Page3] Wrong answer');

              // Play wrong sound
              if (typeof window !== 'undefined' && window.playAnswerSound) {
                window.playAnswerSound(false);
              } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
                window.SimpleSoundManager.playAnswerSound(false);
              }

              // Turn clicked button salmon and disable
              const buttonId = `times-table-btn-${multiplierValue}-${value}`;
              const button = document.getElementById(buttonId);
              if (button) {
                button.style.backgroundColor = '#FA8072'; // Salmon
                button.style.color = '#ffffff';

                // Add wiggle animation for 750ms
                button.style.animation = 'none'; // Reset animation first
                // Force reflow to ensure animation reset
                void button.offsetWidth;

                // Apply wiggle animation
                button.style.animation = 'tableCellWiggle 0.75s ease-in-out';

                // Disable button after animation completes
                setTimeout(() => {
                  if (button) {
                    button.disabled = true;
                    button.style.cursor = 'not-allowed';
                    button.style.animation = 'none'; // Remove animation after it completes
                  }
                }, 750);
              }
            }
          };

          // Table coordinates - must match the element's coordinates for auto-sizing
          const tableCoordinates = [1125, 120, 1565, 775];

          return {
            componentType: 'TimesTableComponent',
            // Core configuration
            multiplier: multiplier,
            rangeStart: 1,
            rangeEnd: 10,
            coordinates: tableCoordinates, // Container boundaries for calculating actual table size
            showHeader: true, // Show header row at the top
            headerText: getI18nText('pages.page3.multiplicationTableHeader', 'Multiplication-table'), // Header text
            headerTextColor: '#ffffff', // White header text color
            headerFontSize: '32gc', // Header font size

            // Usable dimensions as percentage of container
            usableHeight: 100, // Use 100% of container height
            usableWidth: 70,  // Use 70% of container width (centered horizontally)

            // Styling
            fontSize: '32gc',
            textColor: '#000000',
            cellBackgroundColor: '#E0E0E0',
            cellBorderRadius: '8gc',
            padding: '8gc',
            rowGap: '8gc',
            borderWidth: '0px',

            // Layout (using defaults, but explicit for clarity)
            textAlign: 'center',
            fontWeight: 'normal',
            equalColumnWidths: true,
            equalRowHeights: true,
            backgroundColor: 'transparent',
            columnGap: '0gc',

            // Button dimensions
            buttonWidthPercent: 70, // Button width as 70% of row width
            buttonHeightPercent: 95, // Button height as 90% of row height
            buttonBorderRadius: '12gc', // Border radius for buttons

            // Row borders
            rowBorderWidth: '2px', // Border width for table rows
            rowBorderColor: 'transparent', // White border color for table rows

            // Container borders
            containerBorderWidth: '4gc', // Border width for container (white 4gc solid)
            containerBorderColor: '#ffffff', // White border color for container
            containerBorderRadius: '10gc', // Border radius for container
            containerBorderStyle: 'solid', // Border style for container

            // Button click handler
            onButtonClick: handleButtonClick
          };
        }
      },


      // Next Button - Three Layer Structure (Show Hint button inside container)
      {
        id: 'page3-start-button',
        name: 'start-button',
        type: 'button',
        coordinates: [1193, 355, 1493, 455], // Same coordinates as Next button on page 2
        zIndex: 53,
        props: () => {
          // Show Hint button is always enabled
          const buttonState = typeof window !== 'undefined' && window.page3ButtonState
            ? window.page3ButtonState
            : { hintShown: false };

          const buttonText = buttonState.hintShown
            ? getI18nText('pages.page3.hideHint', 'Hide\nHint')
            : getI18nText('pages.page3.showHint', 'Show\nHint');

          return {
            className: 'applet-button',
            frameClassName: 'applet-button-frame',
            contentClassName: 'applet-button-content',
            frameGap: '6.25gc',
            text: buttonText, // Toggle between "Show\nHint" and "Hide\nHint"
            backgroundColor: 'var(--color-gold)', // Gold background
            color: '#000000', // Black text
            fontSize: '28gc',
            whiteSpace: 'pre-line', // Allow line breaks
            fontWeight: 'bold',
            borderRadius: '15gc',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            disabled: false,
            cursor: 'pointer',
            onClick: () => {
              // Initialize state if it doesn't exist
              if (typeof window !== 'undefined') {
                if (!window.page3ButtonState) {
                  window.page3ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: false
                  };
                }

                // Toggle hint state
                window.page3ButtonState.hintShown = !window.page3ButtonState.hintShown;

                // Get question data (needed for both showing and hiding hint)
                const getQuestion = window.getCurrentDivisionQuestion ? window.getCurrentDivisionQuestion() : null;
                const multiplier = getQuestion?.divisor || 4; // multiplier is now the divisor
                const dividend = getQuestion?.dividend;
                const divisor = getQuestion?.divisor;
                const quotient = getQuestion?.quotient || (dividend / divisor);

                // If showing hint, highlight the correct answer in the multiplication table
                if (window.page3ButtonState.hintShown) {
                  // Find the correct button (multiplier × value = dividend)
                  // The correct answer is: divisor × quotient = dividend
                  // So the button id is: times-table-btn-{multiplier}-{quotient}
                  // where multiplier = divisor
                  const correctButtonId = `times-table-btn-${multiplier}-${quotient}`;
                  const correctButton = document.getElementById(correctButtonId);

                  if (correctButton) {
                    // Parse the button text to get multiplicand and answer
                    // Button format: "multiplier × divisor = dividend"
                    // We need to highlight: multiplicand (multiplier) and answer (dividend)

                    // Create a custom style for the button text
                    // We'll use a data attribute to mark it as hinted
                    correctButton.setAttribute('data-hint', 'true');

                    // Apply background colors to the numbers in the button
                    // Button HTML structure: it's just text, so we need to wrap it
                    const buttonText = correctButton.textContent || correctButton.innerText;

                    // Create HTML with colored spans
                    const parts = buttonText.split('×');
                    if (parts.length === 2) {
                      const multiplicandPart = parts[0].trim();
                      const restParts = parts[1].split('=');
                      if (restParts.length === 2) {
                        const multiplierPart = restParts[0].trim();
                        const answerPart = restParts[1].trim();

                        // Create new HTML with background colors
                        const newHTML = `<span style="background-color: #76A5AF; padding: 2px 8px; border-radius: 4px; display: inline-block;">${multiplicandPart}</span> × ${multiplierPart} = <span style="background-color: #C27BA0; padding: 2px 8px; border-radius: 4px; display: inline-block;">${answerPart}</span>`;
                        correctButton.innerHTML = newHTML;
                      }
                    }
                  }
                } else {
                  // Hide hint - remove highlighting
                  const correctButtonId = `times-table-btn-${multiplier}-${quotient}`;
                  const correctButton = document.getElementById(correctButtonId);

                  if (correctButton && correctButton.getAttribute('data-hint') === 'true') {
                    correctButton.removeAttribute('data-hint');
                    // Restore original text
                    const buttonText = `${multiplier} × ${quotient} = ${dividend}`;
                    correctButton.textContent = buttonText;
                  }
                }

                // Trigger page re-render to update button text, instruction, and textbox
                if (typeof window.forceAppUpdate === 'function') {
                  window.forceAppUpdate();
                } else {
                  // Fallback: dispatch pageChanged event
                  window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 3 } }));
                }
              }

              // Handle button click - visual feedback
              const buttonElement = document.getElementById('page3-start-button');

              // Visual feedback: scale animation
              if (buttonElement) {
                buttonElement.style.transform = 'scale(0.95)';
                buttonElement.style.transition = 'transform 0.1s ease';
                setTimeout(() => {
                  buttonElement.style.transform = 'scale(1)';
                  setTimeout(() => {
                    buttonElement.style.transition = '';
                  }, 100);
                }, 100);
              }

              // Play click sound
              if (typeof window !== 'undefined') {
                if (window.playCarClickSound) {
                  window.playCarClickSound('next');
                } else if (window.SoundManager && window.SoundManager.play) {
                  window.SoundManager.play('click');
                }
              }
            }
          };
        }
      },

      // Hint textbox - shows hint text when Show Hint is clicked
      {
        id: 'page3-hint-textbox',
        name: 'hint-textbox',
        type: 'custom',
        coordinates: [1150, 475, 1550, 750], // Below Show Hint button (button ends at y=455, textbox starts at y=470 with 15gc gap)
        zIndex: 53,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividend = question?.dividend || 24;
          const divisor = question?.divisor || 6;

          const buttonState = typeof window !== 'undefined' && window.page3ButtonState
            ? window.page3ButtonState
            : { hintShown: false };

          // Format text with bold dividend and divisor, normal weight for rest
          // Get the raw text with placeholders first, then replace with bold versions
          const textboxText = buttonState.hintShown
            ? (() => {
              // Get raw text with placeholders (don't pass params to getI18nText)
              const rawText = getI18nText('pages.page3.hintText', 'To divide {dividend} by {divisor}. Tap the multiplication sentence that has both {dividend} and {divisor} in the multiplication table.');
              // Replace placeholders with bold versions
              return rawText
                .replace(/\{dividend\}/g, `<strong>${dividend}</strong>`)
                .replace(/\{divisor\}/g, `<strong>${divisor}</strong>`);
            })()
            : ''; // Empty when hint is hidden

          // Dynamic styling based on hint state
          const backgroundColor = buttonState.hintShown ? '#FF6600' : 'transparent'; // Orange when hint shown, transparent by default
          const borderColor = buttonState.hintShown ? '#FF6600' : 'transparent'; // Orange border when hint shown, no border by default
          const borderWidth = buttonState.hintShown ? '0gc' : '0gc'; // No border
          const borderStyle = buttonState.hintShown ? 'none' : 'none'; // No border

          return {
            componentType: 'TeacherNoteComponent',
            text: textboxText,
            backgroundColor: backgroundColor,
            border: borderWidth !== '0gc' ? `${borderWidth} ${borderStyle} ${borderColor}` : 'none',
            borderRadius: '10gc',
            textColor: '#000000', // Black text
            fontSize: '28gc',
            padding: '15gc',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            // TeacherNoteComponent automatically detects and renders HTML tags
          };
        }
      },

      // Next Button - Same as page 2
      {
        id: 'page3-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1193, 355, 1493, 455], // Same coordinates as page 2 Next button
        zIndex: 53,
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page3ButtonState) {
            window.page3ButtonState = {
              dividendClicked: false,
              divisorClicked: false,
              hintShown: false,
              correctAnswerClicked: false
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page3ButtonState
            ? window.page3ButtonState
            : { dividendClicked: false, divisorClicked: false, hintShown: false, correctAnswerClicked: false };

          // Next button is hidden until correct answer is clicked
          const isCorrectAnswerClicked = buttonState.correctAnswerClicked || false;

          return {
            className: 'applet-button',
            frameClassName: 'applet-button-frame',
            contentClassName: 'applet-button-content',
            frameGap: '6.25gc',
            text: getI18nText('pages.page2.nextButton', 'Next'),
            backgroundColor: 'var(--color-gold)', // Gold background
            color: '#000000', // Black text
            fontSize: '48gc',
            fontWeight: 'bold',
            borderRadius: '15gc',
            textAlign: 'center',
            display: isCorrectAnswerClicked ? 'flex' : 'none', // Hidden until correct answer clicked
            alignItems: 'center',
            justifyContent: 'center',
            disabled: false,
            cursor: 'pointer',
            onClick: () => {
              // Handle Next button click - navigate to page 4 with visual feedback
              const buttonElement = document.getElementById('page3-next-button');

              // Visual feedback: scale animation
              if (buttonElement) {
                buttonElement.style.transform = 'scale(0.95)';
                buttonElement.style.transition = 'transform 0.1s ease';
                setTimeout(() => {
                  buttonElement.style.transform = 'scale(1)';
                  setTimeout(() => {
                    buttonElement.style.transition = '';
                  }, 100);
                }, 100);
              }

              // Play click sound
              if (typeof window !== 'undefined') {
                if (window.playCarClickSound) {
                  window.playCarClickSound('next');
                } else if (window.SoundManager && window.SoundManager.play) {
                  window.SoundManager.play('click');
                }
              }

              // Navigate to page 4
              setTimeout(() => {
                if (typeof window !== 'undefined') {
                  if (window.changePageAndNotify) {
                    window.changePageAndNotify(4);
                  } else if (window.navigateToPage) {
                    window.navigateToPage(4);
                  } else {
                    window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 4 } }));
                  }
                }
              }, 150);
            }
          };
        }
      },

      // Tap Animation on Next Button
      {
        id: 'page3-next-tap-animation',
        name: 'next-tap-animation',
        type: 'custom',
        coordinates: [1340, 375, 1440, 450], // Centered on Next button
        zIndex: 60, // Higher z-index to be on top
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page3ButtonState) {
            window.page3ButtonState = {
              dividendClicked: false,
              divisorClicked: false,
              hintShown: false,
              correctAnswerClicked: false
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page3ButtonState
            ? window.page3ButtonState
            : { correctAnswerClicked: false };

          const isCorrectAnswerClicked = buttonState.correctAnswerClicked || false;

          return {
            componentType: 'TapGifComponent',
            imageSrc: 'assets/tap.gif',
            imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
            opacity: 0.7, // 30% opacity
            initialVisible: isCorrectAnswerClicked, // Visible only when correct answer is clicked
            style: {
              pointerEvents: 'none', // Allow clicks to pass through to the button below
              display: isCorrectAnswerClicked ? 'block' : 'none' // Hidden until correct answer clicked
            }
          };
        }
      },

      // Tap Animation on START Button
      {
        id: 'page3-start-tap-animation',
        name: 'start-tap-animation',
        type: 'custom',
        coordinates: [1195, 375, 900, 450], // Centered on START button
        zIndex: 60, // Higher z-index to be on top
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page3ButtonState) {
            window.page3ButtonState = {
              dividendClicked: false,
              divisorClicked: false
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page3ButtonState
            ? window.page3ButtonState
            : { dividendClicked: false, divisorClicked: false };

          // Tap animation is hidden when Next button is disabled (divisor not clicked)
          const isNextDisabled = !buttonState.divisorClicked;

          return {
            componentType: 'TapGifComponent',
            imageSrc: 'assets/tap.gif',
            imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
            opacity: 0.7, // 30% opacity
            initialVisible: !isNextDisabled, // Hidden when Next is disabled, visible when enabled
            style: {
              pointerEvents: 'none', // Allow clicks to pass through to the button below
              display: isNextDisabled ? 'none' : 'block' // Hide when Next is disabled
            }
          };
        }
      },

      // Bottom prompt bar - Static instruction text
      {
        id: 'page3-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [5, 800, 1575, 900], // Footer bar at bottom
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.instructionText', 'Tap the multiplication fact that matches with the division sentence.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

    ],

    4: [
      // Top Instruction Text - "Choose the multiplication TABLE that matches."
      {
        id: 'page4-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 100], // Header at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page3.headerText', 'Choose the multiplication Fact that matches.'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange text
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Left (70% width)
      {
        id: 'page4-main-container-left',
        name: 'main-container-left',
        type: 'custom',
        coordinates: [25, 100, 1105, 800], // Left 70% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // "Multiplication Sentence" Title in left panel
      {
        id: 'page4-multiplication-sentence-title',
        name: 'multiplication-sentence-title',
        type: 'custom',
        coordinates: [-75, 125, 955, 195], // Above division sentence (moved up by 25gc, moved left by 125gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('labels.multiplicationSentence', 'Multiplication Sentence'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange/warm color
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Multiplication tile 1 (left) - Multiplicand (pre-filled)
      {
        id: 'page4-multiplicand-tile',
        name: 'multiplicand',
        type: 'tile',
        coordinates: [75, 220, 225, 370], // Above division tiles (moved up by 25gc, moved left by 125gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const multiplier = question?.divisor || 4; // Use quotient as multiplicand
          return {
            mode: 'normal',
            text: String(multiplier), // Pre-filled with quotient
            backgroundColor: '#76A5AF', // Pre-filled color
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Multiplication symbol (×)
      {
        id: 'page4-multiply-symbol',
        name: 'multiply-symbol',
        type: 'custom',
        coordinates: [235, 240, 315, 350], // Between multiplicand and multiplier (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '×',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Multiplication tile 2 (middle) - Multiplier (pre-filled)
      {
        id: 'page4-multiplier-tile',
        name: 'multiplier',
        type: 'tile',
        coordinates: [325, 220, 475, 370], // Above division tiles (gap reduced to 10gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const divisor = question?.quotient || 6; // Use divisor as multiplier
          return {
            mode: 'normal',
            text: String(divisor), // Pre-filled with divisor
            backgroundColor: '#C27BA0', // Pre-filled color
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Equals symbol (=) for multiplication
      {
        id: 'page4-multiply-equals-symbol',
        name: 'multiply-equals-symbol',
        type: 'custom',
        coordinates: [485, 240, 565, 350], // Between multiplier and answer (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Multiplication tile 3 (right) - Answer (pre-filled)
      {
        id: 'page4-answer-tile',
        name: 'answer',
        type: 'tile',
        coordinates: [575, 220, 725, 370], // Above division tiles (gap reduced to 10gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividend = question?.dividend || 24; // Use dividend as answer
          return {
            mode: 'normal',
            text: String(dividend), // Pre-filled with dividend
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Horizontal separator line between multiplication and division sets
      {
        id: 'page4-separator-line',
        name: 'separator-line',
        type: 'line',
        coordinates: [75, 390, 725, 390], // Horizontal line between multiplication and division (aligned with tile layout)
        zIndex: 52,
        props: {
          componentType: 'LineComponent',
          lineType: 'horizontal',
          lineSubtype: 'line',
          borderWidth: '4gc',
          borderColor: '#ffffff', // White color
          borderStyle: 'dashed',
          backgroundColor: 'transparent'
        }
      },

      // "Division Sentence" Title in left panel
      {
        id: 'page4-division-sentence-title',
        name: 'division-sentence-title',
        type: 'custom',
        coordinates: [-75, 405, 955, 475], // Top of left container (moved down by 25gc more, moved left by 125gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('labels.divisionSentence', 'Division Sentence'),
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#FF6600', // Orange/warm color
          fontSize: '42gc',
          padding: '15gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // First tile (left) - filled with dividend
      {
        id: 'page4-tile-1',
        name: 'dividend',
        type: 'tile',
        coordinates: [75, 500, 225, 650], // Centered horizontally in left panel (moved down by 25gc more, moved left by 125gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const dividendValue = question && question.dividend ? String(question.dividend) : '';
          return {
            mode: 'normal',
            text: dividendValue,
            backgroundColor: '#C8C8C8', // Light grey background
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Division symbol (÷)
      {
        id: 'page4-divide-symbol',
        name: 'divide-symbol',
        type: 'custom',
        coordinates: [235, 520, 315, 630], // Between first and second tile (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '÷',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Second tile (middle) - filled with divisor
      {
        id: 'page4-tile-2',
        name: 'divisor',
        type: 'tile',
        coordinates: [325, 500, 475, 650], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 52,
        props: () => {
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const divisorValue = question && question.divisor ? String(question.divisor) : '';
          return {
            mode: 'normal',
            text: divisorValue,
            backgroundColor: '#76A5AF', // Pre-filled color (same as multiplicand)
            borderColor: '#969696', // Darker grey border
            borderWidth: '3gc',
            borderStyle: 'solid',
            borderRadius: '10gc',
            color: '#000000', // Black text for visibility
            fontSize: '80gc',
            fontWeight: 'bold',
            padding: '20gc',
            textAlign: 'center'
          };
        }
      },

      // Equals symbol (=)
      {
        id: 'page4-equals-symbol',
        name: 'equals-symbol',
        type: 'custom',
        coordinates: [485, 520, 565, 630], // Between second and third tile (gap reduced to 10gc)
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '=',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '80gc',
          padding: '0gc',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      },

      // Third blank tile (right) - Quotient tile (fillable with number pad)
      {
        id: 'page4-tile-3',
        name: 'quotient',
        type: 'tile',
        coordinates: [575, 500, 725, 650], // Centered horizontally in left panel (gap reduced to 10gc)
        zIndex: 52,
        props: {
          mode: 'out-of-focus', // Start as out-of-focus, will change to focus when clicked
          text: '', // Empty blank tile - will be filled by number pad
          backgroundColor: '#C8C8C8', // Light grey background (will be white when in focus mode)
          borderColor: '#969696', // Darker grey border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#808080', // Gray text when out of focus (will be black when in focus)
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center'
        }
      },

      // Orange-bordered container with black background - Right (30% width)
      {
        id: 'page4-main-container-right',
        name: 'main-container-right',
        type: 'custom',
        coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
        zIndex: 51,
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty, just for background and border
          backgroundColor: 'transparent', // Black background
          border: '3px solid var(--color-gold-dark)', // Orange border
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Multiplication Table in right panel
      // Empty container behind multiplication table
      {
        id: 'page4-multiplication-table-container',
        name: 'multiplication-table-container',
        type: 'custom',
        coordinates: [750, 120, 1075, 790], // Same coordinates as multiplication table
        zIndex: 51, // Lower than multiplication table (z-index 52)
        props: {
          componentType: 'TeacherNoteComponent',
          text: '', // Empty container
          backgroundColor: 'transparent', // Transparent background
          border: '4gc solid #ffffff', // White solid border 4gc
          borderRadius: '10gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc'
        }
      },

      // Uses TimesTableComponent to generate multiplication table (1-10) based on quotient
      // Automatically calculates cell heights to fit within coordinates
      {
        id: 'page4-multiplication-table',
        name: 'multiplication-table',
        type: 'custom',
        coordinates: [760, 120, 1065, 700], // Inside right panel (moved left by 375gc total)
        zIndex: 52,
        props: () => {
          // Get current division question to extract the divisor (multiplier)
          const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
            ? window.getCurrentDivisionQuestion
            : getCurrentDivisionQuestion;
          const question = getQuestion();
          const multiplier = question?.divisor || 4; // Use divisor as multiplier, fallback to 4
          const dividend = question?.dividend || 24; // Get dividend for checking correct answer
          const divisor = question?.divisor || 6; // Get divisor for filling tiles

          // Button click handler for multiplication table
          const handleButtonClick = (multiplierValue, value, result, skipSound = false) => {
            console.log('🔘 [Page4] Button clicked:', { multiplierValue, value, result, dividend, skipSound });

            // Reset all buttons to initial state first (in case of re-clicks)
            const numRows = 10; // rangeEnd - rangeStart + 1 = 10
            const defaultBgColor = '#E0E0E0'; // Default button background
            const defaultTextColor = '#000000'; // Default button text color

            for (let i = 1; i <= numRows; i++) {
              const buttonId = `times-table-btn-${multiplierValue}-${i}`;
              const button = document.getElementById(buttonId);
              if (button && !button.disabled) {
                // Only reset if button is not already disabled
                button.style.backgroundColor = defaultBgColor;
                button.style.color = defaultTextColor;
                button.style.filter = 'none';
                button.style.opacity = '1';
              }
            }

            // Check if this is the correct answer (result equals dividend)
            const isCorrect = result === dividend;

            if (isCorrect) {
              // Correct answer - fill tiles, play sound, update button states
              console.log('✅ [Page4] Correct answer! Filling tiles and updating buttons');

              // Play correct sound (skip if this is an automatic simulation without user interaction)
              if (!skipSound) {
                try {
                  if (typeof window !== 'undefined' && window.playAnswerSound) {
                    window.playAnswerSound(true);
                  } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
                    window.SimpleSoundManager.playAnswerSound(true);
                  }
                } catch (error) {
                  // Silently ignore sound errors (e.g., NotAllowedError when no user interaction)
                  console.log('🔇 [Page4] Sound playback skipped or failed (expected for automatic simulation):', error.message);
                }
              } else {
                console.log('🔇 [Page4] Sound playback skipped (automatic simulation)');
              }

              // Fill multiplication tiles in the same order as the button
              // Button format: "multiplierValue × value = result"
              // So: Multiplicand = multiplierValue, Multiplier = value, Answer = result
              const multiplicandEvent = new CustomEvent('updateTileText', {
                detail: { elementId: 'page4-multiplicand-tile', text: String(multiplierValue) }
              });
              window.dispatchEvent(multiplicandEvent);

              const multiplierEvent = new CustomEvent('updateTileText', {
                detail: { elementId: 'page4-multiplier-tile', text: String(value) }
              });
              window.dispatchEvent(multiplierEvent);

              const answerEvent = new CustomEvent('updateTileText', {
                detail: { elementId: 'page4-answer-tile', text: String(result) }
              });
              window.dispatchEvent(answerEvent);

              // Update tile background colors using custom event
              // Multiplicand tile and divisor tile: #76A5AF
              // Multiplier tile: #C27BA0
              setTimeout(() => {
                // Update multiplicand tile background
                const multiplicandBgEvent = new CustomEvent('updateTileBackground', {
                  detail: { elementId: 'page4-multiplicand-tile', backgroundColor: '#76A5AF' }
                });
                window.dispatchEvent(multiplicandBgEvent);

                // Update multiplier tile background
                const multiplierBgEvent = new CustomEvent('updateTileBackground', {
                  detail: { elementId: 'page4-multiplier-tile', backgroundColor: '#C27BA0' }
                });
                window.dispatchEvent(multiplierBgEvent);

                // Update divisor tile background
                const divisorBgEvent = new CustomEvent('updateTileBackground', {
                  detail: { elementId: 'page4-tile-2', backgroundColor: '#76A5AF' }
                });
                window.dispatchEvent(divisorBgEvent);
              }, 100); // Small delay to ensure tiles are updated first

              // Update all buttons: correct one turns green, others turn gray and blur, all disabled
              const numRows = 10; // rangeEnd - rangeStart + 1 = 10
              for (let i = 1; i <= numRows; i++) {
                const buttonId = `times-table-btn-${multiplierValue}-${i}`;
                const button = document.getElementById(buttonId);
                if (button) {
                  if (i === value) {
                    // Correct button - green background
                    button.style.backgroundColor = '#4CAF50'; // Green
                    button.style.color = '#ffffff';
                    button.disabled = true;
                    button.style.cursor = 'not-allowed';
                  } else {
                    // Other buttons - gray and blur
                    button.style.backgroundColor = '#C0C0C0'; // Gray
                    button.style.color = '#808080';
                    button.style.filter = 'blur(2px)';
                    button.style.opacity = '0.6';
                    button.disabled = true;
                    button.style.cursor = 'not-allowed';
                  }
                }
              }

              // Mark correct answer as clicked and show Next button
              if (typeof window !== 'undefined') {
                if (!window.page4ButtonState) {
                  window.page4ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: true
                  };
                } else {
                  window.page4ButtonState.correctAnswerClicked = true;
                }

                // NOTE: Do NOT show Next button and tap animation here
                // They should only be shown when the number pad check button is clicked and answer is correct
                // The multiplication table button click is just for pre-filling tiles, not for validation
              }
            } else {
              // Wrong answer - turn button salmon and disable
              console.log('❌ [Page4] Wrong answer');

              // Play wrong sound (skip if this is an automatic simulation without user interaction)
              if (!skipSound) {
                try {
                  if (typeof window !== 'undefined' && window.playAnswerSound) {
                    window.playAnswerSound(false);
                  } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
                    window.SimpleSoundManager.playAnswerSound(false);
                  }
                } catch (error) {
                  // Silently ignore sound errors (e.g., NotAllowedError when no user interaction)
                  console.log('🔇 [Page4] Sound playback skipped or failed:', error.message);
                }
              }

              // Turn clicked button salmon and disable
              const buttonId = `times-table-btn-${multiplierValue}-${value}`;
              const button = document.getElementById(buttonId);
              if (button) {
                button.style.backgroundColor = '#FA8072'; // Salmon
                button.style.color = '#ffffff';

                // Add wiggle animation for 750ms
                button.style.animation = 'none'; // Reset animation first
                // Force reflow to ensure animation reset
                void button.offsetWidth;

                // Apply wiggle animation
                button.style.animation = 'tableCellWiggle 0.75s ease-in-out';

                // Disable button after animation completes
                setTimeout(() => {
                  if (button) {
                    button.disabled = true;
                    button.style.cursor = 'not-allowed';
                    button.style.animation = 'none'; // Remove animation after it completes
                  }
                }, 750);
              }
            }
          };

          // Table coordinates - must match the element's coordinates for auto-sizing
          const tableCoordinates = [1125, 120, 1565, 775];

          return {
            componentType: 'TimesTableComponent',
            // Core configuration
            multiplier: multiplier,
            rangeStart: 1,
            rangeEnd: 10,
            coordinates: tableCoordinates, // Container boundaries for calculating actual table size
            showHeader: true, // Show header row at the top
            headerText: getI18nText('pages.page3.multiplicationTableHeader', 'Multiplication-table'), // Header text
            headerTextColor: '#ffffff', // White header text color
            headerFontSize: '32gc', // Header font size

            // Usable dimensions as percentage of container
            usableHeight: 100, // Use 100% of container height
            usableWidth: 70,  // Use 70% of container width (centered horizontally)

            // Styling
            fontSize: '32gc',
            textColor: '#000000',
            cellBackgroundColor: '#E0E0E0',
            cellBorderRadius: '8gc',
            padding: '8gc',
            rowGap: '8gc',
            borderWidth: '0px',

            // Layout (using defaults, but explicit for clarity)
            textAlign: 'center',
            fontWeight: 'normal',
            equalColumnWidths: true,
            equalRowHeights: true,
            backgroundColor: 'transparent',
            columnGap: '0gc',

            // Button dimensions
            buttonWidthPercent: 70, // Button width as 70% of row width
            buttonHeightPercent: 95, // Button height as 90% of row height
            buttonBorderRadius: '12gc', // Border radius for buttons

            // Row borders
            rowBorderWidth: '2px', // Border width for table rows
            rowBorderColor: 'transparent', // White border color for table rows

            // Container borders
            containerBorderWidth: '4gc', // Border width for container (white 4gc solid)
            containerBorderColor: '#ffffff', // White border color for container
            containerBorderRadius: '10gc', // Border radius for container
            containerBorderStyle: 'solid', // Border style for container

            // Button click handler
            onButtonClick: handleButtonClick
          };

          // Function to apply tile background colors (same as page 3)
          const applyPage4TileColors = () => {
            // Apply tile background colors using custom events (same as page 3)
            // Multiplicand tile and divisor tile: #76A5AF
            // Multiplier tile: #C27BA0
            // Use same delay as page 3 (100ms) to ensure tiles are updated first
            setTimeout(() => {
              // Update multiplicand tile background
              const multiplicandBgEvent = new CustomEvent('updateTileBackground', {
                detail: { elementId: 'page4-multiplicand-tile', backgroundColor: '#76A5AF' }
              });
              window.dispatchEvent(multiplicandBgEvent);

              // Update multiplier tile background
              const multiplierBgEvent = new CustomEvent('updateTileBackground', {
                detail: { elementId: 'page4-multiplier-tile', backgroundColor: '#C27BA0' }
              });
              window.dispatchEvent(multiplierBgEvent);

              // Update divisor tile background
              const divisorBgEvent = new CustomEvent('updateTileBackground', {
                detail: { elementId: 'page4-tile-2', backgroundColor: '#76A5AF' }
              });
              window.dispatchEvent(divisorBgEvent);
            }, 100); // Same delay as page 3 to ensure tiles are updated first
          };

          // Store handleButtonClick and question data globally for pageChanged event
          if (typeof window !== 'undefined') {
            window.page4HandleButtonClick = handleButtonClick;
            window.page4QuestionData = { multiplier, divisor, dividend };
          }

          // Function to simulate correct button click - call handleButtonClick directly
          const simulateCorrectButtonClick = () => {
            const correctResult = multiplier * divisor; // This should equal dividend
            console.log('🎯 [Page4] Simulating correct button click:', {
              multiplier,
              divisor,
              result: correctResult,
              dividend
            });

            // Initialize state
            if (typeof window !== 'undefined' && !window.page4ButtonState) {
              window.page4ButtonState = {
                dividendClicked: false,
                divisorClicked: false,
                hintShown: false,
                correctAnswerClicked: false // Will be set to true by handleButtonClick
              };
            }

            // Call the button click handler directly - it will handle button updates
            // Pass skipSound=true to avoid sound errors on automatic simulation (no user interaction)
            handleButtonClick(multiplier, divisor, correctResult, true);
          };

          // Set up pageChanged listener (only once, outside props function scope)
          if (typeof window !== 'undefined' && !window.page4ButtonClickSimulated) {
            const handlePage4Load = (event) => {
              const pageNumber = event.detail?.page || event.detail?.pageNumber;
              if (pageNumber === 4 && !window.page4ButtonClickSimulated) {
                console.log('📄 [Page4] Page changed to 4, will simulate button click');
                window.page4ButtonClickSimulated = true; // Prevent multiple calls

                // Wait for components to render, then simulate click
                setTimeout(() => {
                  if (window.page4HandleButtonClick && window.page4QuestionData) {
                    const { multiplier: m, divisor: d } = window.page4QuestionData;
                    const result = m * d;
                    console.log('🎯 [Page4] Calling handleButtonClick from pageChanged event:', { m, d, result });
                    // Pass skipSound=true to avoid sound errors on automatic simulation (no user interaction)
                    window.page4HandleButtonClick(m, d, result, true);
                  }
                }, 1000); // Longer delay to ensure everything is rendered
              }
            };

            window.addEventListener('pageChanged', handlePage4Load);
          }

          // Also try immediately if we're already on page 4 (for initial load)
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.getCurrentPage) {
              const currentPage = window.getCurrentPage();
              if (currentPage === 4 && !window.page4ButtonClickSimulated) {
                console.log('📄 [Page4] Already on page 4 on load, simulating button click');
                window.page4ButtonClickSimulated = true;
                simulateCorrectButtonClick();
              }
            } else {
              // Fallback: try after delay even if getCurrentPage is not available
              setTimeout(() => {
                if (!window.page4ButtonClickSimulated) {
                  console.log('📄 [Page4] Fallback: simulating button click');
                  window.page4ButtonClickSimulated = true;
                  simulateCorrectButtonClick();
                }
              }, 1200);
            }
          }, 1000);
        }
      },

      // Number Pad Panel
      {
        id: 'page4-number-pad',
        name: 'number-pad',
        type: 'number-pad-panel',
        coordinates: [1130, 125, 1550, 775], // Positioned within right container with padding
        zIndex: 52,
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page4ButtonState) {
            window.page4ButtonState = {
              dividendClicked: false,
              divisorClicked: false,
              hintShown: false,
              correctAnswerClicked: false,
              checkCorrect: false
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page4ButtonState
            ? window.page4ButtonState
            : { checkCorrect: false };

          // Hide number pad when check is correct
          const isCheckCorrect = buttonState.checkCorrect || false;

          return {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '15gc',
            border: '4px solid #D2691E',
            padding: '20gc',
            layout: 'vertical',
            buttonConfig: 5, // Numbers + + - × ÷ = . + C + ⌫ (custom config with all operators)
            enableClickSound: true,
            inputMode: 'append',
            maxNumber: null,
            feedbackMode: 'feedback',
            feedbackComponentId: null,
            destinations: [
              {
                destinationId: 'page4-tile-3', // Quotient tile
                destinationType: 'tile',
                correctValue: () => {
                  // Get the quotient from the current division question
                  const question = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
                    ? window.getCurrentDivisionQuestion()
                    : null;
                  return question?.quotient || null;
                },
                // Dynamic feedback messages
                correctFeedback: () => {
                  // Get the division question to create dynamic feedback
                  const question = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
                    ? window.getCurrentDivisionQuestion()
                    : null;
                  if (question) {
                    return `That's right…<br>${question.dividend} ÷ ${question.divisor} = ${question.quotient}`;
                  }
                  return "That's right!";
                },
                incorrectFeedback: getI18nText('numberPad.feedback.incorrectFromMultiplication', 'Ohh that is not right! Use the number from the multiplication sentence.'),
                emptyFeedback: getI18nText('numberPad.feedback.fillHighlightedBox', 'Fill the highlighted box before checking'),
                // Optional: mode to set on correct/incorrect
                correctMode: 'correct',
                incorrectMode: 'incorrect'
              }
            ],
            destinationIndex: 0,
            feedbackRowHeight: '35%',
            buttonGridHeight: '55%',
            checkButtonHeight: '10%',
            showButton: {
              backgroundColor: '#FFD700',
              color: '#000000',
              fontSize: '35gc',
              fontWeight: 'bold',
              text: getI18nText('numberPad.showButton', 'show 💡')
            },
            numberButtons: {
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontSize: '32gc',
              fontWeight: 'bold',
              buttonWidthPercent: '75%',
              buttonHeightPercent: '90%'
            },
            checkButton: {
              backgroundColor: 'var(--color-gold)', // Gold color like next button
              frameGap: '6.25gc', // Frame gap for 3-layer structure
              color: '#000000',
              fontSize: '35gc',
              fontWeight: 'bold',
              text: getI18nText('numberPad.checkButton', 'CHECK')
            },
            feedbackTextArea: {
              fontSize: '30gc' // Feedback text font size
            },
            // Hide number pad when check is correct
            style: {
              display: isCheckCorrect ? 'none' : 'block'
            }
          };
        }
      },

      // Next Button - Same as page 2
      {
        id: 'page4-next-button',
        name: 'next-button',
        type: 'button',
        coordinates: [1193, 355, 1493, 455], // Same coordinates as page 2 Next button
        zIndex: 53,
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page4ButtonState) {
            window.page4ButtonState = {
              dividendClicked: false,
              divisorClicked: false,
              hintShown: false,
              correctAnswerClicked: false, // Hidden until check is correct
              checkCorrect: false // Track if check button was clicked and answer was correct
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page4ButtonState
            ? window.page4ButtonState
            : { dividendClicked: false, divisorClicked: false, hintShown: false, correctAnswerClicked: false, checkCorrect: false };

          // Next button is visible only when check is correct
          const isCheckCorrect = buttonState.checkCorrect || false;

          // Get total questions to check if we're on the last one
          const divisionQuestions = getI18nText('common.divisionQuestions', []);
          const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
            ? window.currentQuestionIndex
            : 0;
          const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
          const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;

          return {
            className: 'applet-button',
            frameClassName: 'applet-button-frame',
            contentClassName: 'applet-button-content',
            frameGap: '6.25gc',
            text: isLastQuestion
              ? getI18nText('pages.page4.startOverButton', 'Start Over')
              : getI18nText('pages.page4.nextButton', 'Next'),
            backgroundColor: 'var(--color-gold)', // Gold background
            color: '#000000', // Black text
            fontSize: '48gc',
            fontWeight: 'bold',
            borderRadius: '15gc',
            textAlign: 'center',
            display: isCheckCorrect ? 'flex' : 'none', // Hidden until check is correct
            alignItems: 'center',
            justifyContent: 'center',
            disabled: false,
            cursor: 'pointer',
            onClick: () => {
              // Handle button click - either cycle to next question or restart
              const buttonElement = document.getElementById('page4-next-button');

              // Play click sound
              window.playCarClickSound('next');

              // Get updated question info
              const divisionQuestions = getI18nText('common.divisionQuestions', []);
              const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
                ? window.currentQuestionIndex
                : 0;
              const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
              const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;

              if (isLastQuestion) {
                // Last question - reset activity and go back to page 1
                console.log('🔄 [Page4] Last question completed. Restarting activity from page 1.');

                // Reset question index to 0
                if (typeof window !== 'undefined') {
                  window.currentQuestionIndex = 0;
                }

                // Reset page 2 button state
                if (typeof window !== 'undefined' && window.page2ButtonState) {
                  window.page2ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false
                  };
                }

                // Reset page 3 button state
                if (typeof window !== 'undefined' && window.page3ButtonState) {
                  window.page3ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: false
                  };
                }

                // Reset page 4 button state
                if (typeof window !== 'undefined' && window.page4ButtonState) {
                  window.page4ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: false,
                    checkCorrect: false
                  };
                }

                // Reset page 4 button click simulation flag
                if (typeof window !== 'undefined' && window.page4ButtonClickSimulated !== undefined) {
                  window.page4ButtonClickSimulated = false;
                }

                // Navigate to page 1
                setTimeout(() => {
                  window.changePageAndNotify(1);
                }, 100);
              } else {
                // Not the last question - increment index and go to page 2
                console.log('➡️ [Page4] Moving to next question. Current index:', currentIndex, 'Next index:', currentIndex + 1);

                // Increment question index
                if (typeof window !== 'undefined') {
                  window.currentQuestionIndex = currentIndex + 1;
                }

                // Reset page 2 button state
                if (typeof window !== 'undefined' && window.page2ButtonState) {
                  window.page2ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false
                  };
                }

                // Reset page 3 button state
                if (typeof window !== 'undefined' && window.page3ButtonState) {
                  window.page3ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: false
                  };
                }

                // Reset page 4 button state
                if (typeof window !== 'undefined' && window.page4ButtonState) {
                  window.page4ButtonState = {
                    dividendClicked: false,
                    divisorClicked: false,
                    hintShown: false,
                    correctAnswerClicked: false,
                    checkCorrect: false
                  };
                }

                // Reset page 4 button click simulation flag
                if (typeof window !== 'undefined' && window.page4ButtonClickSimulated !== undefined) {
                  window.page4ButtonClickSimulated = false;
                }

                // Navigate to page 2
                setTimeout(() => {
                  window.changePageAndNotify(2);
                }, 100);
              }
            }
          };
        }
      },

      // Tap Animation on Next Button
      {
        id: 'page4-next-tap-animation',
        name: 'next-tap-animation',
        type: 'custom',
        coordinates: [1340, 375, 1440, 450], // Centered on Next button
        zIndex: 60, // Higher z-index to be on top
        props: () => {
          // Initialize button state if not exists
          if (typeof window !== 'undefined' && !window.page4ButtonState) {
            window.page4ButtonState = {
              dividendClicked: false,
              divisorClicked: false,
              hintShown: false,
              correctAnswerClicked: false,
              checkCorrect: false // Track if check button was clicked and answer was correct
            };
          }

          const buttonState = typeof window !== 'undefined' && window.page4ButtonState
            ? window.page4ButtonState
            : { dividendClicked: false, divisorClicked: false, hintShown: false, correctAnswerClicked: false, checkCorrect: false };

          // Tap animation is visible only when check is correct
          // Always start hidden, will be shown when check is correct via showOnEvent

          return {
            componentType: 'TapGifComponent',
            imageSrc: 'assets/tap.gif',
            imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
            opacity: 0.7, // 30% opacity
            initialVisible: false, // Always start hidden on page load
            showOnEvent: 'page4CheckCorrect', // Show when check is correct event is dispatched
            style: {
              pointerEvents: 'none' // Allow clicks to pass through to the button below
            }
          };
        }
      },


      // Bottom prompt bar - Dynamic instruction text
      {
        id: 'page4-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [5, 800, 1575, 900], // Footer bar at bottom
        zIndex: 54,
        props: () => {
          // Check if check is correct to determine which text to show
          const buttonState = typeof window !== 'undefined' && window.page4ButtonState
            ? window.page4ButtonState
            : { checkCorrect: false };

          const isCheckCorrect = buttonState.checkCorrect || false;

          // Get total questions to check if we're on the last one
          const divisionQuestions = getI18nText('common.divisionQuestions', []);
          const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
            ? window.currentQuestionIndex
            : 0;
          const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
          const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;

          // Debug log
          console.log('📝 [Page4 Instruction] Debug:', {
            isCheckCorrect,
            currentIndex,
            totalQuestions,
            isLastQuestion,
            divisionQuestionsLength: Array.isArray(divisionQuestions) ? divisionQuestions.length : 'N/A'
          });

          // Determine which instruction text to show
          let instructionKey, instructionDefault;
          if (isCheckCorrect) {
            // After check is correct
            if (isLastQuestion) {
              instructionKey = 'pages.page4.footerInstructionLast';
              instructionDefault = 'Tap » to start over again';
              console.log('📝 [Page4 Instruction] Showing LAST question footer');
            } else {
              instructionKey = 'pages.page4.footerInstruction';
              instructionDefault = 'Tap » for the next question';
              console.log('📝 [Page4 Instruction] Showing regular footer');
            }
          } else {
            // Before check is done
            instructionKey = 'pages.page4.instructionText';
            instructionDefault = 'Tap the number using numpad to fill in the highlighted box.';
          }

          const finalText = getI18nText(instructionKey, instructionDefault);
          console.log('📝 [Page4 Instruction] Final text:', finalText, 'Key:', instructionKey);

          return {
            componentType: 'TeacherNoteComponent',
            text: finalText,
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0gc',
            textColor: '#ffffff',
            fontSize: '36gc',
            padding: '15gc',
            fontWeight: 'normal',
            textAlign: 'center'
          };
        }
      },

    ],
    // 5: [

    //   // Top Instruction Text - "Choose the multiplication TABLE that matches."
    //   {
    //     id: 'page5-header-text',
    //     name: 'header-text',
    //     type: 'custom',
    //     coordinates: [5, 25, 1575, 100], // Header at top
    //     zIndex: 50,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page5.headerText', "Choose the multiplication TABLE that matches."),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange text
    //       fontSize: '36gc',
    //       padding: '15gc',
    //       fontWeight: 'normal',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Orange-bordered container with black background - Left (70% width)
    //   {
    //     id: 'page5-main-container-left',
    //     name: 'main-container-left',
    //     type: 'custom',
    //     coordinates: [25, 100, 1105, 800], // Left 70% of main content area
    //     zIndex: 51,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty, just for background and border
    //       backgroundColor: 'transparent', // Black background
    //       border: '3px solid var(--color-gold-dark)', // Orange border
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // "Division Sentence" Title in left panel
    //   {
    //     id: 'page5-division-sentence-title',
    //     name: 'division-sentence-title',
    //     type: 'custom',
    //     coordinates: [50, 205, 1080, 275], // Top of left container (moved down by 35gc more)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('labels.divisionSentence', 'Division Sentence'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange/warm color
    //       fontSize: '42gc',
    //       padding: '15gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // First tile (left) - filled with dividend
    //   {
    //     id: 'page5-tile-1',
    //     name: 'dividend',
    //     type: 'tile',
    //     coordinates: [200, 300, 350, 450], // Centered horizontally in left panel
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividendValue = question && question.dividend ? String(question.dividend) : '';
    //       console.log('🔍 [page5 Tile 1] Computing props, dividend value:', dividendValue, 'Question:', question);
    //       return {
    //         mode: 'normal',
    //         text: 64,
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Division symbol (÷)
    //   {
    //     id: 'page5-divide-symbol',
    //     name: 'divide-symbol',
    //     type: 'custom',
    //     coordinates: [370, 320, 450, 430], // Between first and second tile
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '÷',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Second tile (middle) - filled with divisor
    //   {
    //     id: 'page5-tile-2',
    //     name: 'divisor',
    //     type: 'tile',
    //     coordinates: [470, 300, 620, 450], // Centered horizontally in left panel
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const divisorValue = question && question.divisor ? String(question.divisor) : '';
    //       console.log('🔍 [page5 Tile 2] Computing props, divisor value:', divisorValue, 'Question:', question);
    //       return {
    //         mode: 'normal',
    //         text: 8,
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Equals symbol (=)
    //   {
    //     id: 'page5-equals-symbol',
    //     name: 'equals-symbol',
    //     type: 'custom',
    //     coordinates: [640, 320, 720, 430], // Between second and third tile
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '=',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Third blank tile (right)
    //   {
    //     id: 'page5-tile-3',
    //     name: 'quotient',
    //     type: 'tile',
    //     coordinates: [740, 300, 890, 450], // Centered horizontally in left panel
    //     zIndex: 52,
    //     props: {
    //       mode: 'normal',
    //       text: '', // Empty blank tile
    //       backgroundColor: '#C8C8C8', // Light grey background
    //       borderColor: '#969696', // Darker grey border
    //       borderWidth: '3gc',
    //       borderStyle: 'solid',
    //       borderRadius: '10gc',
    //       color: '#808080',
    //       fontSize: '80gc',
    //       fontWeight: 'bold',
    //       padding: '20gc',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Text below division tiles: "Which multiplication table do we need to use for <dividend>÷ <divisor>"
    //   {
    //     id: 'page5-multiplication-question-text',
    //     name: 'multiplication-question-text',
    //     type: 'custom',
    //     coordinates: [200, 530, 1000, 600], // Below the tiles, centered (moved down by 25gc more)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividend = question && question.dividend ? question.dividend : '';
    //       const divisor = question && question.divisor ? question.divisor : '';
    //       const text = getI18nText('pages.page5.multiplicationQuestionText', 'Which multiplication table do we need to use for {dividend} ÷ {divisor}?', { dividend, divisor });
    //       return {
    //         componentType: 'TeacherNoteComponent',
    //         text: getI18nText('pages.page5.multiplicationQuestionText', 'Which multiplication table do we need to use for {dividend} ÷ {divisor}?'),
    //         backgroundColor: 'transparent',
    //         border: 'none',
    //         borderRadius: '0gc',
    //         textColor: '#ffffff', // White text
    //         fontSize: '40gc',
    //         fontWeight: 'normal',
    //         padding: '10gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Button 1: "Table of <Dividend>"
    //   {
    //     id: 'page5-table-of-dividend-button',
    //     name: 'table-of-dividend-button',
    //     type: 'button',
    //     coordinates: [200, 645, 500, 717], // Left side below text (height increased by 20%)
    //     zIndex: 52,
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page5ButtonState) {
    //         window.page5ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false
    //         };
    //       }

    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividend = question && question.dividend ? question.dividend : '';

    //       const buttonState = typeof window !== 'undefined' && window.page5ButtonState
    //         ? window.page5ButtonState
    //         : { dividendClicked: false, divisorClicked: false };

    //       // Dividend button is only disabled when it itself is clicked
    //       const isDisabled = buttonState.dividendClicked;
    //       const backgroundColor = buttonState.dividendClicked
    //         ? 'var(--color-salmon)' // Salmon color when clicked
    //         : '#FFD700'; // Gold background

    //       return {
    //         text: getI18nText('pages.page5.tableOfDividend', 'Table of {dividend}', { dividend }),
    //         backgroundColor: backgroundColor,
    //         color: '#000000', // Black text
    //         fontSize: '32gc',
    //         fontWeight: 'bold',
    //         borderRadius: '10gc',
    //         border: 'none',
    //         cursor: isDisabled ? 'not-allowed' : 'pointer',
    //         textAlign: 'center',
    //         padding: '15gc',
    //         disabled: isDisabled,
    //         onClick: () => {
    //           if (isDisabled) return;

    //           console.log(`🔘 [page5] Table of ${dividend} button clicked`);

    //           // Play wrong sound for dividend button
    //           if (typeof window !== 'undefined') {
    //             if (window.playAnswerSound) {
    //               window.playAnswerSound(false); // false = wrong sound
    //             } else if (window.playCarClickSound) {
    //               window.playCarClickSound('wrong');
    //             } else if (window.SoundManager && window.SoundManager.play) {
    //               window.SoundManager.play('wrong');
    //             }
    //           }

    //           // Update state
    //           if (typeof window !== 'undefined') {
    //             if (!window.page5ButtonState) {
    //               window.page5ButtonState = {
    //                 dividendClicked: false,
    //                 divisorClicked: false
    //               };
    //             }
    //             window.page5ButtonState.dividendClicked = true;

    //             // Trigger re-render
    //             if (typeof window.forceAppUpdate === 'function') {
    //               window.forceAppUpdate();
    //             }
    //           }
    //         }
    //       };
    //     }
    //   },

    //   // Button 2: "Table of <Divisor>"
    //   {
    //     id: 'page5-table-of-divisor-button',
    //     name: 'table-of-divisor-button',
    //     type: 'button',
    //     coordinates: [600, 645, 900, 717], // Right side below text (height increased by 20%)
    //     zIndex: 52,
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page5ButtonState) {
    //         window.page5ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false
    //         };
    //       }

    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const divisor = question && question.divisor ? question.divisor : '';

    //       const buttonState = typeof window !== 'undefined' && window.page5ButtonState
    //         ? window.page5ButtonState
    //         : { dividendClicked: false, divisorClicked: false };

    //       const isDisabled = buttonState.divisorClicked;
    //       const backgroundColor = buttonState.divisorClicked
    //         ? '#008000' // Green background
    //         : '#FFD700'; // Gold background

    //       return {
    //         text: getI18nText('pages.page5.tableOfDivisor', 'Table of {divisor}', { divisor }),
    //         backgroundColor: backgroundColor,
    //         color: '#000000', // Black text
    //         fontSize: '32gc',
    //         fontWeight: 'bold',
    //         borderRadius: '10gc',
    //         border: 'none',
    //         cursor: isDisabled ? 'not-allowed' : 'pointer',
    //         textAlign: 'center',
    //         padding: '15gc',
    //         disabled: isDisabled,
    //         onClick: () => {
    //           if (isDisabled) return;

    //           console.log(`🔘 [page5] Table of ${divisor} button clicked`);

    //           // Play correct sound for divisor button
    //           if (typeof window !== 'undefined') {
    //             if (window.playAnswerSound) {
    //               window.playAnswerSound(true); // true = correct sound
    //             } else if (window.playCarClickSound) {
    //               window.playCarClickSound('correct');
    //             } else if (window.SoundManager && window.SoundManager.play) {
    //               window.SoundManager.play('correct');
    //             }
    //           }

    //           // Update state - only update divisor button state
    //           if (typeof window !== 'undefined') {
    //             if (!window.page5ButtonState) {
    //               window.page5ButtonState = {
    //                 dividendClicked: false,
    //                 divisorClicked: false
    //               };
    //             }
    //             window.page5ButtonState.divisorClicked = true;

    //             // Trigger re-render
    //             if (typeof window.forceAppUpdate === 'function') {
    //               window.forceAppUpdate();
    //             }
    //           }
    //         }
    //       };
    //     }
    //   },

    //   // Orange-bordered container with black background - Right (30% width)
    //   {
    //     id: 'page5-main-container-right',
    //     name: 'main-container-right',
    //     type: 'custom',
    //     coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
    //     zIndex: 51,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty, just for background and border
    //       backgroundColor: 'transparent', // Black background
    //       border: '3px solid var(--color-gold-dark)', // Orange border
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },


    //   // Next Button - Three Layer Structure
    //   {
    //     id: 'page5-start-button',
    //     name: 'start-button',
    //     type: 'button',
    //     coordinates: [1193, 355, 1493, 455], // Centered in right panel
    //     zIndex: 53,
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page5ButtonState) {
    //         window.page5ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page5ButtonState
    //         ? window.page5ButtonState
    //         : { dividendClicked: false, divisorClicked: false };

    //       // Next button is disabled until divisor button is clicked
    //       const isDisabled = !buttonState.divisorClicked;

    //       return {
    //         className: 'applet-button',
    //         frameClassName: 'applet-button-frame',
    //         contentClassName: 'applet-button-content',
    //         frameGap: '6.25gc',
    //         text: getI18nText('pages.page5.nextButton', 'Next'),
    //         backgroundColor: isDisabled ? '#CCCCCC' : 'var(--color-gold)', // Grey when disabled, gold when enabled
    //         color: '#000000', // Black text
    //         fontSize: '48gc',
    //         fontWeight: 'bold',
    //         borderRadius: '15gc',
    //         textAlign: 'center',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         disabled: isDisabled,
    //         cursor: isDisabled ? 'not-allowed' : 'pointer',
    //         onClick: () => {
    //           // Don't allow click if disabled
    //           if (isDisabled) {
    //             console.log('🔘 [page5] Next button clicked but disabled - divisor button not clicked yet');
    //             return;
    //           }

    //           // Handle Next button click - navigate to page 3 with visual feedback
    //           const buttonElement = document.getElementById('page5-start-button');

    //           // Visual feedback: scale animation
    //           if (buttonElement) {
    //             buttonElement.style.transform = 'scale(0.95)';
    //             buttonElement.style.transition = 'transform 0.1s ease';
    //             setTimeout(() => {
    //               buttonElement.style.transform = 'scale(1)';
    //               setTimeout(() => {
    //                 buttonElement.style.transition = '';
    //               }, 100);
    //             }, 100);
    //           }

    //           // Play click sound
    //           if (typeof window !== 'undefined') {
    //             if (window.playCarClickSound) {
    //               window.playCarClickSound('next');
    //             } else if (window.SoundManager && window.SoundManager.play) {
    //               window.SoundManager.play('click');
    //             }
    //           }

    //           // Navigate to page 3
    //           setTimeout(() => {
    //             if (typeof window !== 'undefined') {
    //               if (window.changePageAndNotify) {
    //                 window.changePageAndNotify(6);
    //               } else if (window.navigateToPage) {
    //                 window.navigateToPage(6);
    //               } else {
    //                 window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 3 } }));
    //               }
    //             }
    //           }, 150);
    //         }
    //       };
    //     }
    //   },

    //   // Tap Animation on START Button
    //   {
    //     id: 'page5-start-tap-animation',
    //     name: 'start-tap-animation',
    //     type: 'custom',
    //     coordinates: [1195, 375, 900, 450], // Centered on START button
    //     zIndex: 60, // Higher z-index to be on top
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page5ButtonState) {
    //         window.page5ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page5ButtonState
    //         ? window.page5ButtonState
    //         : { dividendClicked: false, divisorClicked: false };

    //       // Tap animation is hidden when Next button is disabled (divisor not clicked)
    //       const isNextDisabled = !buttonState.divisorClicked;

    //       return {
    //         componentType: 'TapGifComponent',
    //         imageSrc: 'assets/tap.gif',
    //         imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
    //         opacity: 0.7, // 30% opacity
    //         initialVisible: !isNextDisabled, // Hidden when Next is disabled, visible when enabled
    //         style: {
    //           pointerEvents: 'none', // Allow clicks to pass through to the button below
    //           display: isNextDisabled ? 'none' : 'block' // Hide when Next is disabled
    //         }
    //       };
    //     }
    //   },

    //   // Bottom prompt bar - "Tap the multiplication sentences that matches with given division sentences."
    //   {
    //     id: 'page5-instruction-text',
    //     name: 'instruction-text',
    //     type: 'custom',
    //     coordinates: [5, 800, 1575, 900], // Footer bar at bottom
    //     zIndex: 54,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page5.instructionText', "Tap the multiplication sentences that matches with given division sentences."),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '36gc',
    //       padding: '15gc',
    //       fontWeight: 'normal',
    //       textAlign: 'center'
    //     }
    //   },

    // ],
    // 6: [

    //   // Top Instruction Text - "Choose the multiplication TABLE that matches."
    //   {
    //     id: 'page6-header-text',
    //     name: 'header-text',
    //     type: 'custom',
    //     coordinates: [5, 25, 1575, 100], // Header at top
    //     zIndex: 50,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page6.headerText', 'Choose the multiplication Fact that matches.'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange text
    //       fontSize: '36gc',
    //       padding: '15gc',
    //       fontWeight: 'normal',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Orange-bordered container with black background - Left (70% width)
    //   {
    //     id: 'page6-main-container-left',
    //     name: 'main-container-left',
    //     type: 'custom',
    //     coordinates: [25, 100, 1105, 800], // Left 70% of main content area
    //     zIndex: 51,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty, just for background and border
    //       backgroundColor: 'transparent', // Black background
    //       border: '3px solid var(--color-gold-dark)', // Orange border
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // "Multiplication Sentence" Title in left panel
    //   {
    //     id: 'page6-multiplication-sentence-title',
    //     name: 'multiplication-sentence-title',
    //     type: 'custom',
    //     coordinates: [-75, 125, 955, 195], // Above division sentence (moved up by 25gc, moved left by 125gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('labels.multiplicationSentence', 'Multiplication Sentence'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange/warm color
    //       fontSize: '42gc',
    //       padding: '15gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Multiplication tile 1 (left) - Multiplicand (empty)
    //   {
    //     id: 'page6-multiplicand-tile',
    //     name: 'multiplicand',
    //     type: 'tile',
    //     coordinates: [75, 220, 225, 370], // Above division tiles (moved up by 25gc, moved left by 125gc)
    //     zIndex: 52,
    //     props: () => {
    //       return {
    //         mode: 'normal',
    //         text: '', // Empty tile
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Multiplication symbol (×)
    //   {
    //     id: 'page6-multiply-symbol',
    //     name: 'multiply-symbol',
    //     type: 'custom',
    //     coordinates: [235, 240, 315, 350], // Between multiplicand and multiplier (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '×',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Multiplication tile 2 (middle) - Multiplier (empty)
    //   {
    //     id: 'page6-multiplier-tile',
    //     name: 'multiplier',
    //     type: 'tile',
    //     coordinates: [325, 220, 475, 370], // Above division tiles (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: () => {
    //       return {
    //         mode: 'normal',
    //         text: '', // Empty tile
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Equals symbol (=) for multiplication
    //   {
    //     id: 'page6-multiply-equals-symbol',
    //     name: 'multiply-equals-symbol',
    //     type: 'custom',
    //     coordinates: [485, 240, 565, 350], // Between multiplier and answer (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '=',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Multiplication tile 3 (right) - Answer (empty)
    //   {
    //     id: 'page6-answer-tile',
    //     name: 'answer',
    //     type: 'tile',
    //     coordinates: [575, 220, 725, 370], // Above division tiles (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: () => {
    //       return {
    //         mode: 'normal',
    //         text: '', // Empty tile
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Horizontal separator line between multiplication and division sets
    //   {
    //     id: 'page6-separator-line',
    //     name: 'separator-line',
    //     type: 'line',
    //     coordinates: [75, 390, 725, 390], // Horizontal line between multiplication and division (aligned with tile layout)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'LineComponent',
    //       lineType: 'horizontal',
    //       lineSubtype: 'line',
    //       borderWidth: '4gc',
    //       borderColor: '#ffffff', // White color
    //       borderStyle: 'dashed',
    //       backgroundColor: 'transparent'
    //     }
    //   },

    //   // "Division Sentence" Title in left panel
    //   {
    //     id: 'page6-division-sentence-title',
    //     name: 'division-sentence-title',
    //     type: 'custom',
    //     coordinates: [-75, 405, 955, 475], // Top of left container (moved down by 25gc more, moved left by 125gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('labels.divisionSentence', 'Division Sentence'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange/warm color
    //       fontSize: '42gc',
    //       padding: '15gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // First tile (left) - filled with dividend
    //   {
    //     id: 'page6-tile-1',
    //     name: 'dividend',
    //     type: 'tile',
    //     coordinates: [75, 500, 225, 650], // Centered horizontally in left panel (moved down by 25gc more, moved left by 125gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividendValue = question && question.dividend ? String(question.dividend) : '';
    //       console.log('🔍 [page6 Tile 1] Computing props, dividend value:', dividendValue, 'Question:', question);
    //       return {
    //         mode: 'normal',
    //         text:64,
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Division symbol (÷)
    //   {
    //     id: 'page6-divide-symbol',
    //     name: 'divide-symbol',
    //     type: 'custom',
    //     coordinates: [235, 520, 315, 630], // Between first and second tile (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '÷',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Second tile (middle) - filled with divisor
    //   {
    //     id: 'page6-tile-2',
    //     name: 'divisor',
    //     type: 'tile',
    //     coordinates: [325, 500, 475, 650], // Centered horizontally in left panel (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const divisorValue = question && question.divisor ? String(question.divisor) : '';
    //       console.log('🔍 [page6 Tile 2] Computing props, divisor value:', divisorValue, 'Question:', question);
    //       return {
    //         mode: 'normal',
    //         text:8,
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Equals symbol (=)
    //   {
    //     id: 'page6-equals-symbol',
    //     name: 'equals-symbol',
    //     type: 'custom',
    //     coordinates: [485, 520, 565, 630], // Between second and third tile (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '=',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Third blank tile (right)
    //   {
    //     id: 'page6-tile-3',
    //     name: 'quotient',
    //     type: 'tile',
    //     coordinates: [575, 500, 725, 650], // Centered horizontally in left panel (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       mode: 'normal',
    //       text: '', // Empty blank tile
    //       backgroundColor: '#C8C8C8', // Light grey background
    //       borderColor: '#969696', // Darker grey border
    //       borderWidth: '3gc',
    //       borderStyle: 'solid',
    //       borderRadius: '10gc',
    //       color: '#808080',
    //       fontSize: '80gc',
    //       fontWeight: 'bold',
    //       padding: '20gc',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Orange-bordered container with black background - Right (30% width)
    //   {
    //     id: 'page6-main-container-right',
    //     name: 'main-container-right',
    //     type: 'custom',
    //     coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
    //     zIndex: 51,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty, just for background and border
    //       backgroundColor: 'transparent', // Black background
    //       border: '3px solid var(--color-gold-dark)', // Orange border
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Multiplication Table in right panel
    //   // Empty container behind multiplication table
    //   {
    //     id: 'page6-multiplication-table-container',
    //     name: 'multiplication-table-container',
    //     type: 'custom',
    //     coordinates: [750, 120, 1075, 790], // Same coordinates as multiplication table
    //     zIndex: 51, // Lower than multiplication table (z-index 52)
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty container
    //       backgroundColor: 'transparent', // Transparent background
    //       border: '4gc solid #ffffff', // White solid border 4gc
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Uses TimesTableComponent to generate multiplication table (1-10) based on quotient
    //   // Automatically calculates cell heights to fit within coordinates
    //   {
    //     id: 'page6-multiplication-table',
    //     name: 'multiplication-table',
    //     type: 'custom',
    //     coordinates: [760, 120, 1065, 700], // Inside right panel (moved left by 375gc total)
    //     zIndex: 52,
    //     props: () => {
    //       // Get current division question to extract the divisor (multiplier)
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const multiplier =  8; // Use divisor as multiplier, fallback to 4
    //       const dividend =  64; // Get dividend for checking correct answer
    //       const divisor =  8; // Get divisor for filling tiles

    //       // Button click handler for multiplication table
    //       const handleButtonClick = (multiplierValue, value, result) => {
    //         console.log('🔘 [page6] Button clicked:', { multiplierValue, value, result, dividend });

    //         // Reset all buttons to initial state first (in case of re-clicks)
    //         const numRows = 10; // rangeEnd - rangeStart + 1 = 10
    //         const defaultBgColor = '#E0E0E0'; // Default button background
    //         const defaultTextColor = '#000000'; // Default button text color

    //         for (let i = 1; i <= numRows; i++) {
    //           const buttonId = `times-table-btn-${multiplierValue}-${i}`;
    //           const button = document.getElementById(buttonId);
    //           if (button && !button.disabled) {
    //             // Only reset if button is not already disabled
    //             button.style.backgroundColor = defaultBgColor;
    //             button.style.color = defaultTextColor;
    //             button.style.filter = 'none';
    //             button.style.opacity = '1';
    //           }
    //         }

    //         // Check if this is the correct answer (result equals dividend)
    //         const isCorrect = result === dividend;

    //         if (isCorrect) {
    //           // Correct answer - fill tiles, play sound, update button states
    //           console.log('✅ [page6] Correct answer! Filling tiles and updating buttons');

    //           // Play correct sound
    //           if (typeof window !== 'undefined' && window.playAnswerSound) {
    //             window.playAnswerSound(true);
    //           } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
    //             window.SimpleSoundManager.playAnswerSound(true);
    //           }

    //           // Fill multiplication tiles in the same order as the button
    //           // Button format: "multiplierValue × value = result"
    //           // So: Multiplicand = multiplierValue, Multiplier = value, Answer = result
    //           const multiplicandEvent = new CustomEvent('updateTileText', {
    //             detail: { elementId: 'page6-multiplicand-tile', text: String(multiplierValue) }
    //           });
    //           window.dispatchEvent(multiplicandEvent);

    //           const multiplierEvent = new CustomEvent('updateTileText', {
    //             detail: { elementId: 'page6-multiplier-tile', text: String(value) }
    //           });
    //           window.dispatchEvent(multiplierEvent);

    //           const answerEvent = new CustomEvent('updateTileText', {
    //             detail: { elementId: 'page6-answer-tile', text: String(result) }
    //           });
    //           window.dispatchEvent(answerEvent);

    //           // Update tile background colors using custom event
    //           // Multiplicand tile and divisor tile: #76A5AF
    //           // Multiplier tile: #C27BA0
    //           setTimeout(() => {
    //             // Update multiplicand tile background
    //             const multiplicandBgEvent = new CustomEvent('updateTileBackground', {
    //               detail: { elementId: 'page6-multiplicand-tile', backgroundColor: '#76A5AF' }
    //             });
    //             window.dispatchEvent(multiplicandBgEvent);

    //             // Update multiplier tile background
    //             const multiplierBgEvent = new CustomEvent('updateTileBackground', {
    //               detail: { elementId: 'page6-multiplier-tile', backgroundColor: '#C27BA0' }
    //             });
    //             window.dispatchEvent(multiplierBgEvent);

    //             // Update divisor tile background
    //             const divisorBgEvent = new CustomEvent('updateTileBackground', {
    //               detail: { elementId: 'page6-tile-2', backgroundColor: '#76A5AF' }
    //             });
    //             window.dispatchEvent(divisorBgEvent);
    //           }, 100); // Small delay to ensure tiles are updated first

    //           // Update all buttons: correct one turns green, others turn gray and blur, all disabled
    //           const numRows = 10; // rangeEnd - rangeStart + 1 = 10
    //           for (let i = 1; i <= numRows; i++) {
    //             const buttonId = `times-table-btn-${multiplierValue}-${i}`;
    //             const button = document.getElementById(buttonId);
    //             if (button) {
    //               if (i === value) {
    //                 // Correct button - green background
    //                 button.style.backgroundColor = '#4CAF50'; // Green
    //                 button.style.color = '#ffffff';
    //                 button.disabled = true;
    //                 button.style.cursor = 'not-allowed';
    //               } else {
    //                 // Other buttons - gray and blur
    //                 button.style.backgroundColor = '#C0C0C0'; // Gray
    //                 button.style.color = '#808080';
    //                 button.style.filter = 'blur(2px)';
    //                 button.style.opacity = '0.6';
    //                 button.disabled = true;
    //                 button.style.cursor = 'not-allowed';
    //               }
    //             }
    //           }

    //           // Mark correct answer as clicked and show Next button, hide hint button and textbox
    //           if (typeof window !== 'undefined') {
    //             if (!window.page6ButtonState) {
    //               window.page6ButtonState = {
    //                 dividendClicked: false,
    //                 divisorClicked: false,
    //                 hintShown: false,
    //                 correctAnswerClicked: false
    //               };
    //             }
    //             window.page6ButtonState.correctAnswerClicked = true;

    //             // Show Next button and tap animation
    //             const nextButton = document.getElementById('page6-next-button');
    //             if (nextButton) {
    //               nextButton.style.display = 'flex';
    //             }
    //             const nextTapAnimation = document.getElementById('page6-next-tap-animation');
    //             if (nextTapAnimation) {
    //               nextTapAnimation.style.display = 'block';
    //             }

    //             // Hide hint button and textbox
    //             const hintButton = document.getElementById('page6-start-button');
    //             if (hintButton) {
    //               hintButton.style.display = 'none';
    //             }
    //             const hintTextbox = document.getElementById('page6-hint-textbox');
    //             if (hintTextbox) {
    //               hintTextbox.style.display = 'none';
    //             }

    //             // Trigger re-render to update visibility
    //             if (typeof window.forceAppUpdate === 'function') {
    //               window.forceAppUpdate();
    //             }
    //           }
    //         } else {
    //           // Wrong answer - turn button salmon and disable
    //           console.log('❌ [page6] Wrong answer');

    //           // Play wrong sound
    //           if (typeof window !== 'undefined' && window.playAnswerSound) {
    //             window.playAnswerSound(false);
    //           } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
    //             window.SimpleSoundManager.playAnswerSound(false);
    //           }

    //           // Turn clicked button salmon and disable
    //           const buttonId = `times-table-btn-${multiplierValue}-${value}`;
    //           const button = document.getElementById(buttonId);
    //           if (button) {
    //             button.style.backgroundColor = '#FA8072'; // Salmon
    //             button.style.color = '#ffffff';

    //             // Add wiggle animation for 750ms
    //             button.style.animation = 'none'; // Reset animation first
    //             // Force reflow to ensure animation reset
    //             void button.offsetWidth;

    //             // Apply wiggle animation
    //             button.style.animation = 'tableCellWiggle 0.75s ease-in-out';

    //             // Disable button after animation completes
    //             setTimeout(() => {
    //               if (button) {
    //                 button.disabled = true;
    //                 button.style.cursor = 'not-allowed';
    //                 button.style.animation = 'none'; // Remove animation after it completes
    //               }
    //             }, 750);
    //           }
    //         }
    //       };

    //       // Table coordinates - must match the element's coordinates for auto-sizing
    //       const tableCoordinates = [1125, 120, 1565, 775];

    //       return {
    //         componentType: 'TimesTableComponent',
    //         // Core configuration
    //         multiplier: multiplier,
    //         rangeStart: 1,
    //         rangeEnd: 10,
    //         coordinates: tableCoordinates, // Container boundaries for calculating actual table size
    //         showHeader: true, // Show header row at the top
    //         headerText: getI18nText('pages.page6.multiplicationTableHeader', 'Multiplication-table'), // Header text
    //         headerTextColor: '#ffffff', // White header text color
    //         headerFontSize: '32gc', // Header font size

    //         // Usable dimensions as percentage of container
    //         usableHeight: 100, // Use 100% of container height
    //         usableWidth: 70,  // Use 70% of container width (centered horizontally)

    //         // Styling
    //         fontSize: '32gc',
    //         textColor: '#000000',
    //         cellBackgroundColor: '#E0E0E0',
    //         cellBorderRadius: '8gc',
    //         padding: '8gc',
    //         rowGap: '8gc',
    //         borderWidth: '0px',

    //         // Layout (using defaults, but explicit for clarity)
    //         textAlign: 'center',
    //         fontWeight: 'normal',
    //         equalColumnWidths: true,
    //         equalRowHeights: true,
    //         backgroundColor: 'transparent',
    //         columnGap: '0gc',

    //         // Button dimensions
    //         buttonWidthPercent: 70, // Button width as 70% of row width
    //         buttonHeightPercent: 95, // Button height as 90% of row height
    //         buttonBorderRadius: '12gc', // Border radius for buttons

    //         // Row borders
    //         rowBorderWidth: '2px', // Border width for table rows
    //         rowBorderColor: 'transparent', // White border color for table rows

    //         // Container borders
    //         containerBorderWidth: '4gc', // Border width for container (white 4gc solid)
    //         containerBorderColor: '#ffffff', // White border color for container
    //         containerBorderRadius: '10gc', // Border radius for container
    //         containerBorderStyle: 'solid', // Border style for container

    //         // Button click handler
    //         onButtonClick: handleButtonClick
    //       };
    //     }
    //   },


    //   // Next Button - Three Layer Structure (Show Hint button inside container)
    //   {
    //     id: 'page6-start-button',
    //     name: 'start-button',
    //     type: 'button',
    //     coordinates: [1193, 355, 1493, 455], // Same coordinates as Next button on page 2
    //     zIndex: 53,
    //     props: () => {
    //       // Show Hint button is always enabled
    //       const buttonState = typeof window !== 'undefined' && window.page6ButtonState
    //         ? window.page6ButtonState
    //         : { hintShown: false };

    //       const buttonText = buttonState.hintShown
    //         ? getI18nText('pages.page6.hideHint', 'Hide\nHint')
    //         : getI18nText('pages.page6.showHint', 'Show\nHint');

    //       return {
    //         className: 'applet-button',
    //         frameClassName: 'applet-button-frame',
    //         contentClassName: 'applet-button-content',
    //         frameGap: '6.25gc',
    //         text: buttonText, // Toggle between "Show\nHint" and "Hide\nHint"
    //         backgroundColor: 'var(--color-gold)', // Gold background
    //         color: '#000000', // Black text
    //         fontSize: '28gc',
    //         whiteSpace: 'pre-line', // Allow line breaks
    //         fontWeight: 'bold',
    //         borderRadius: '15gc',
    //         textAlign: 'center',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         disabled: false,
    //         cursor: 'pointer',
    //         onClick: () => {
    //           // Initialize state if it doesn't exist
    //           if (typeof window !== 'undefined') {
    //             if (!window.page6ButtonState) {
    //               window.page6ButtonState = {
    //                 dividendClicked: false,
    //                 divisorClicked: false,
    //                 hintShown: false,
    //                 correctAnswerClicked: false
    //               };
    //             }

    //             // Toggle hint state
    //             window.page6ButtonState.hintShown = !window.page6ButtonState.hintShown;

    //             // Get question data (needed for both showing and hiding hint)
    //             const getQuestion = window.getCurrentDivisionQuestion ? window.getCurrentDivisionQuestion() : null;
    //             const multiplier = 8; // multiplier is now the divisor
    //             const dividend = 64;
    //             const divisor = 8;
    //             const quotient = 8;

    //             // If showing hint, highlight the correct answer in the multiplication table
    //             if (window.page6ButtonState.hintShown) {
    //               // Find the correct button (multiplier × value = dividend)
    //               // The correct answer is: divisor × quotient = dividend
    //               // So the button id is: times-table-btn-{multiplier}-{quotient}
    //               // where multiplier = divisor
    //               const correctButtonId = `times-table-btn-${multiplier}-${quotient}`;
    //               const correctButton = document.getElementById(correctButtonId);

    //               if (correctButton) {
    //                 // Parse the button text to get multiplicand and answer
    //                 // Button format: "multiplier × divisor = dividend"
    //                 // We need to highlight: multiplicand (multiplier) and answer (dividend)

    //                 // Create a custom style for the button text
    //                 // We'll use a data attribute to mark it as hinted
    //                 correctButton.setAttribute('data-hint', 'true');

    //                 // Apply background colors to the numbers in the button
    //                 // Button HTML structure: it's just text, so we need to wrap it
    //                 const buttonText = correctButton.textContent || correctButton.innerText;

    //                 // Create HTML with colored spans
    //                 const parts = buttonText.split('×');
    //                 if (parts.length === 2) {
    //                   const multiplicandPart = parts[0].trim();
    //                   const restParts = parts[1].split('=');
    //                   if (restParts.length === 2) {
    //                     const multiplierPart = restParts[0].trim();
    //                     const answerPart = restParts[1].trim();

    //                     // Create new HTML with background colors
    //                     const newHTML = `<span style="background-color: #76A5AF; padding: 2px 8px; border-radius: 4px; display: inline-block;">${multiplicandPart}</span> × ${multiplierPart} = <span style="background-color: #C27BA0; padding: 2px 8px; border-radius: 4px; display: inline-block;">${answerPart}</span>`;
    //                     correctButton.innerHTML = newHTML;
    //                   }
    //                 }
    //               }
    //             } else {
    //               // Hide hint - remove highlighting
    //               const correctButtonId = `times-table-btn-${multiplier}-${quotient}`;
    //               const correctButton = document.getElementById(correctButtonId);

    //               if (correctButton && correctButton.getAttribute('data-hint') === 'true') {
    //                 correctButton.removeAttribute('data-hint');
    //                 // Restore original text
    //                 const buttonText = `${multiplier} × ${quotient} = ${dividend}`;
    //                 correctButton.textContent = buttonText;
    //               }
    //             }

    //             // Trigger page re-render to update button text, instruction, and textbox
    //             if (typeof window.forceAppUpdate === 'function') {
    //               window.forceAppUpdate();
    //             } else {
    //               // Fallback: dispatch pageChanged event
    //               window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 6 } }));
    //             }
    //           }

    //           // Handle button click - visual feedback
    //           const buttonElement = document.getElementById('page6-start-button');

    //           // Visual feedback: scale animation
    //           if (buttonElement) {
    //             buttonElement.style.transform = 'scale(0.95)';
    //             buttonElement.style.transition = 'transform 0.1s ease';
    //             setTimeout(() => {
    //               buttonElement.style.transform = 'scale(1)';
    //               setTimeout(() => {
    //                 buttonElement.style.transition = '';
    //               }, 100);
    //             }, 100);
    //           }

    //           // Play click sound
    //           if (typeof window !== 'undefined') {
    //             if (window.playCarClickSound) {
    //               window.playCarClickSound('next');
    //             } else if (window.SoundManager && window.SoundManager.play) {
    //               window.SoundManager.play('click');
    //             }
    //           }
    //         }
    //       };
    //     }
    //   },

    //   // Hint textbox - shows hint text when Show Hint is clicked
    //   {
    //     id: 'page6-hint-textbox',
    //     name: 'hint-textbox',
    //     type: 'custom',
    //     coordinates: [1150, 475, 1550, 750], // Below Show Hint button (button ends at y=455, textbox starts at y=470 with 15gc gap)
    //     zIndex: 53,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividend = 64;
    //       const divisor = 8;

    //       const buttonState = typeof window !== 'undefined' && window.page6ButtonState
    //         ? window.page6ButtonState
    //         : { hintShown: false };

    //       // Format text with bold dividend and divisor, normal weight for rest
    //       // Get the raw text with placeholders first, then replace with bold versions
    //       const textboxText = buttonState.hintShown
    //         ? (() => {
    //           // Get raw text with placeholders (don't pass params to getI18nText)
    //           const rawText = getI18nText('pages.page6.hintText', 'To divide {dividend} by {divisor}. Tap the multiplication sentence that has both {dividend} and {divisor} in the multiplication table.');
    //           // Replace placeholders with bold versions
    //           return rawText
    //             .replace(/\{dividend\}/g, `<strong>${dividend}</strong>`)
    //             .replace(/\{divisor\}/g, `<strong>${divisor}</strong>`);
    //         })()
    //         : ''; // Empty when hint is hidden

    //       // Dynamic styling based on hint state
    //       const backgroundColor = buttonState.hintShown ? '#FF6600' : 'transparent'; // Orange when hint shown, transparent by default
    //       const borderColor = buttonState.hintShown ? '#FF6600' : 'transparent'; // Orange border when hint shown, no border by default
    //       const borderWidth = buttonState.hintShown ? '0gc' : '0gc'; // No border
    //       const borderStyle = buttonState.hintShown ? 'none' : 'none'; // No border

    //       return {
    //         componentType: 'TeacherNoteComponent',
    //         text: textboxText,
    //         backgroundColor: backgroundColor,
    //         border: borderWidth !== '0gc' ? `${borderWidth} ${borderStyle} ${borderColor}` : 'none',
    //         borderRadius: '10gc',
    //         textColor: '#000000', // Black text
    //         fontSize: '28gc',
    //         padding: '15gc',
    //         textAlign: 'center',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center'
    //         // TeacherNoteComponent automatically detects and renders HTML tags
    //       };
    //     }
    //   },

    //   // Next Button - Same as page 2
    //   {
    //     id: 'page6-next-button',
    //     name: 'next-button',
    //     type: 'button',
    //     coordinates: [1193, 355, 1493, 455], // Same coordinates as page 2 Next button
    //     zIndex: 53,
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page6ButtonState) {
    //         window.page6ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false,
    //           hintShown: false,
    //           correctAnswerClicked: false
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page6ButtonState
    //         ? window.page6ButtonState
    //         : { dividendClicked: false, divisorClicked: false, hintShown: false, correctAnswerClicked: false };

    //       // Next button is hidden until correct answer is clicked
    //       const isCorrectAnswerClicked = buttonState.correctAnswerClicked || false;

    //       return {
    //         className: 'applet-button',
    //         frameClassName: 'applet-button-frame',
    //         contentClassName: 'applet-button-content',
    //         frameGap: '6.25gc',
    //         text: getI18nText('pages.page2.nextButton', 'Next'),
    //         backgroundColor: 'var(--color-gold)', // Gold background
    //         color: '#000000', // Black text
    //         fontSize: '48gc',
    //         fontWeight: 'bold',
    //         borderRadius: '15gc',
    //         textAlign: 'center',
    //         display: isCorrectAnswerClicked ? 'flex' : 'none', // Hidden until correct answer clicked
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         disabled: false,
    //         cursor: 'pointer',
    //         onClick: () => {
    //           // Handle Next button click - navigate to page 4 with visual feedback
    //           const buttonElement = document.getElementById('page6-next-button');

    //           // Visual feedback: scale animation
    //           if (buttonElement) {
    //             buttonElement.style.transform = 'scale(0.95)';
    //             buttonElement.style.transition = 'transform 0.1s ease';
    //             setTimeout(() => {
    //               buttonElement.style.transform = 'scale(1)';
    //               setTimeout(() => {
    //                 buttonElement.style.transition = '';
    //               }, 100);
    //             }, 100);
    //           }

    //           // Play click sound
    //           if (typeof window !== 'undefined') {
    //             if (window.playCarClickSound) {
    //               window.playCarClickSound('next');
    //             } else if (window.SoundManager && window.SoundManager.play) {
    //               window.SoundManager.play('click');
    //             }
    //           }

    //           // Navigate to page 4
    //           setTimeout(() => {
    //             if (typeof window !== 'undefined') {
    //               if (window.changePageAndNotify) {
    //                 window.changePageAndNotify(7);
    //               } else if (window.navigateToPage) {
    //                 window.navigateToPage(7);
    //               } else {
    //                 window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 4 } }));
    //               }
    //             }
    //           }, 150);
    //         }
    //       };
    //     }
    //   },

    //   // Tap Animation on Next Button
    //   {
    //     id: 'page6-next-tap-animation',
    //     name: 'next-tap-animation',
    //     type: 'custom',
    //     coordinates: [1340, 375, 1440, 450], // Centered on Next button
    //     zIndex: 60, // Higher z-index to be on top
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page6ButtonState) {
    //         window.page6ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false,
    //           hintShown: false,
    //           correctAnswerClicked: false
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page6ButtonState
    //         ? window.page6ButtonState
    //         : { correctAnswerClicked: false };

    //       const isCorrectAnswerClicked = buttonState.correctAnswerClicked || false;

    //       return {
    //         componentType: 'TapGifComponent',
    //         imageSrc: 'assets/tap.gif',
    //         imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
    //         opacity: 0.7, // 30% opacity
    //         initialVisible: isCorrectAnswerClicked, // Visible only when correct answer is clicked
    //         style: {
    //           pointerEvents: 'none', // Allow clicks to pass through to the button below
    //           display: isCorrectAnswerClicked ? 'block' : 'none' // Hidden until correct answer clicked
    //         }
    //       };
    //     }
    //   },

    //   // Tap Animation on START Button
    //   {
    //     id: 'page6-start-tap-animation',
    //     name: 'start-tap-animation',
    //     type: 'custom',
    //     coordinates: [1195, 375, 900, 450], // Centered on START button
    //     zIndex: 60, // Higher z-index to be on top
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page6ButtonState) {
    //         window.page6ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page6ButtonState
    //         ? window.page6ButtonState
    //         : { dividendClicked: false, divisorClicked: false };

    //       // Tap animation is hidden when Next button is disabled (divisor not clicked)
    //       const isNextDisabled = !buttonState.divisorClicked;

    //       return {
    //         componentType: 'TapGifComponent',
    //         imageSrc: 'assets/tap.gif',
    //         imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
    //         opacity: 0.7, // 30% opacity
    //         initialVisible: !isNextDisabled, // Hidden when Next is disabled, visible when enabled
    //         style: {
    //           pointerEvents: 'none', // Allow clicks to pass through to the button below
    //           display: isNextDisabled ? 'none' : 'block' // Hide when Next is disabled
    //         }
    //       };
    //     }
    //   },

    //   // Bottom prompt bar - Static instruction text
    //   {
    //     id: 'page6-instruction-text',
    //     name: 'instruction-text',
    //     type: 'custom',
    //     coordinates: [5, 800, 1575, 900], // Footer bar at bottom
    //     zIndex: 54,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page6.instructionText', 'Tap the multiplication fact that matches with the division sentence.'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff',
    //       fontSize: '36gc',
    //       padding: '15gc',
    //       fontWeight: 'normal',
    //       textAlign: 'center'
    //     }
    //   },

    // ],
    // 7: [
    //   // Top Instruction Text - "Choose the multiplication TABLE that matches."
    //   {
    //     id: 'page7-header-text',
    //     name: 'header-text',
    //     type: 'custom',
    //     coordinates: [5, 25, 1575, 100], // Header at top
    //     zIndex: 50,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('pages.page3.headerText', 'Choose the multiplication Fact that matches.'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange text
    //       fontSize: '36gc',
    //       padding: '15gc',
    //       fontWeight: 'normal',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Orange-bordered container with black background - Left (70% width)
    //   {
    //     id: 'page7-main-container-left',
    //     name: 'main-container-left',
    //     type: 'custom',
    //     coordinates: [25, 100, 1105, 800], // Left 70% of main content area
    //     zIndex: 51,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty, just for background and border
    //       backgroundColor: 'transparent', // Black background
    //       border: '3px solid var(--color-gold-dark)', // Orange border
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // "Multiplication Sentence" Title in left panel
    //   {
    //     id: 'page7-multiplication-sentence-title',
    //     name: 'multiplication-sentence-title',
    //     type: 'custom',
    //     coordinates: [-75, 125, 955, 195], // Above division sentence (moved up by 25gc, moved left by 125gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('labels.multiplicationSentence', 'Multiplication Sentence'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange/warm color
    //       fontSize: '42gc',
    //       padding: '15gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Multiplication tile 1 (left) - Multiplicand (pre-filled)
    //   {
    //     id: 'page7-multiplicand-tile',
    //     name: 'multiplicand',
    //     type: 'tile',
    //     coordinates: [75, 220, 225, 370], // Above division tiles (moved up by 25gc, moved left by 125gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const multiplier = 4; // Use quotient as multiplicand
    //       return {
    //         mode: 'normal',
    //         text: 8, // Pre-filled with quotient
    //         backgroundColor: '#76A5AF', // Pre-filled color
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Multiplication symbol (×)
    //   {
    //     id: 'page7-multiply-symbol',
    //     name: 'multiply-symbol',
    //     type: 'custom',
    //     coordinates: [235, 240, 315, 350], // Between multiplicand and multiplier (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '×',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Multiplication tile 2 (middle) - Multiplier (pre-filled)
    //   {
    //     id: 'page7-multiplier-tile',
    //     name: 'multiplier',
    //     type: 'tile',
    //     coordinates: [325, 220, 475, 370], // Above division tiles (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const divisor = 6; // Use divisor as multiplier
    //       return {
    //         mode: 'normal',
    //         text: 8, // Pre-filled with divisor
    //         backgroundColor: '#C27BA0', // Pre-filled color
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Equals symbol (=) for multiplication
    //   {
    //     id: 'page7-multiply-equals-symbol',
    //     name: 'multiply-equals-symbol',
    //     type: 'custom',
    //     coordinates: [485, 240, 565, 350], // Between multiplier and answer (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '=',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Multiplication tile 3 (right) - Answer (pre-filled)
    //   {
    //     id: 'page7-answer-tile',
    //     name: 'answer',
    //     type: 'tile',
    //     coordinates: [575, 220, 725, 370], // Above division tiles (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividend = question?.dividend || 24; // Use dividend as answer
    //       return {
    //         mode: 'normal',
    //         text:64, // Pre-filled with dividend
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Horizontal separator line between multiplication and division sets
    //   {
    //     id: 'page7-separator-line',
    //     name: 'separator-line',
    //     type: 'line',
    //     coordinates: [75, 390, 725, 390], // Horizontal line between multiplication and division (aligned with tile layout)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'LineComponent',
    //       lineType: 'horizontal',
    //       lineSubtype: 'line',
    //       borderWidth: '4gc',
    //       borderColor: '#ffffff', // White color
    //       borderStyle: 'dashed',
    //       backgroundColor: 'transparent'
    //     }
    //   },

    //   // "Division Sentence" Title in left panel
    //   {
    //     id: 'page7-division-sentence-title',
    //     name: 'division-sentence-title',
    //     type: 'custom',
    //     coordinates: [-75, 405, 955, 475], // Top of left container (moved down by 25gc more, moved left by 125gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: getI18nText('labels.divisionSentence', 'Division Sentence'),
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#FF6600', // Orange/warm color
    //       fontSize: '42gc',
    //       padding: '15gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // First tile (left) - filled with dividend
    //   {
    //     id: 'page7-tile-1',
    //     name: 'dividend',
    //     type: 'tile',
    //     coordinates: [75, 500, 225, 650], // Centered horizontally in left panel (moved down by 25gc more, moved left by 125gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const dividendValue = question && question.dividend ? String(question.dividend) : '';
    //       return {
    //         mode: 'normal',
    //         text:64,
    //         backgroundColor: '#C8C8C8', // Light grey background
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Division symbol (÷)
    //   {
    //     id: 'page7-divide-symbol',
    //     name: 'divide-symbol',
    //     type: 'custom',
    //     coordinates: [235, 520, 315, 630], // Between first and second tile (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '÷',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Second tile (middle) - filled with divisor
    //   {
    //     id: 'page7-tile-2',
    //     name: 'divisor',
    //     type: 'tile',
    //     coordinates: [325, 500, 475, 650], // Centered horizontally in left panel (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: () => {
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const divisorValue = question && question.divisor ? String(question.divisor) : '';
    //       return {
    //         mode: 'normal',
    //         text: 8,
    //         backgroundColor: '#76A5AF', // Pre-filled color (same as multiplicand)
    //         borderColor: '#969696', // Darker grey border
    //         borderWidth: '3gc',
    //         borderStyle: 'solid',
    //         borderRadius: '10gc',
    //         color: '#000000', // Black text for visibility
    //         fontSize: '80gc',
    //         fontWeight: 'bold',
    //         padding: '20gc',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    //   // Equals symbol (=)
    //   {
    //     id: 'page7-equals-symbol',
    //     name: 'equals-symbol',
    //     type: 'custom',
    //     coordinates: [485, 520, 565, 630], // Between second and third tile (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '=',
    //       backgroundColor: 'transparent',
    //       border: 'none',
    //       borderRadius: '0gc',
    //       textColor: '#ffffff', // White text
    //       fontSize: '80gc',
    //       padding: '0gc',
    //       fontWeight: 'bold',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Third blank tile (right) - Quotient tile (fillable with number pad)
    //   {
    //     id: 'page7-tile-3',
    //     name: 'quotient',
    //     type: 'tile',
    //     coordinates: [575, 500, 725, 650], // Centered horizontally in left panel (gap reduced to 10gc)
    //     zIndex: 52,
    //     props: {
    //       mode: 'out-of-focus', // Start as out-of-focus, will change to focus when clicked
    //       text: '', // Empty blank tile - will be filled by number pad
    //       backgroundColor: '#C8C8C8', // Light grey background (will be white when in focus mode)
    //       borderColor: '#969696', // Darker grey border
    //       borderWidth: '3gc',
    //       borderStyle: 'solid',
    //       borderRadius: '10gc',
    //       color: '#808080', // Gray text when out of focus (will be black when in focus)
    //       fontSize: '80gc',
    //       fontWeight: 'bold',
    //       padding: '20gc',
    //       textAlign: 'center'
    //     }
    //   },

    //   // Orange-bordered container with black background - Right (30% width)
    //   {
    //     id: 'page7-main-container-right',
    //     name: 'main-container-right',
    //     type: 'custom',
    //     coordinates: [1110, 100, 1575, 800], // Right 30% of main content area
    //     zIndex: 51,
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty, just for background and border
    //       backgroundColor: 'transparent', // Black background
    //       border: '3px solid var(--color-gold-dark)', // Orange border
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Multiplication Table in right panel
    //   // Empty container behind multiplication table
    //   {
    //     id: 'page7-multiplication-table-container',
    //     name: 'multiplication-table-container',
    //     type: 'custom',
    //     coordinates: [750, 120, 1075, 790], // Same coordinates as multiplication table
    //     zIndex: 51, // Lower than multiplication table (z-index 52)
    //     props: {
    //       componentType: 'TeacherNoteComponent',
    //       text: '', // Empty container
    //       backgroundColor: 'transparent', // Transparent background
    //       border: '4gc solid #ffffff', // White solid border 4gc
    //       borderRadius: '10gc',
    //       textColor: '#ffffff',
    //       fontSize: '1gc',
    //       padding: '0gc'
    //     }
    //   },

    //   // Uses TimesTableComponent to generate multiplication table (1-10) based on quotient
    //   // Automatically calculates cell heights to fit within coordinates
    //   {
    //     id: 'page7-multiplication-table',
    //     name: 'multiplication-table',
    //     type: 'custom',
    //     coordinates: [760, 120, 1065, 700], // Inside right panel (moved left by 375gc total)
    //     zIndex: 52,
    //     props: () => {
    //       // Get current division question to extract the divisor (multiplier)
    //       const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //         ? window.getCurrentDivisionQuestion
    //         : getCurrentDivisionQuestion;
    //       const question = getQuestion();
    //       const multiplier = 8; // Use divisor as multiplier, fallback to 4
    //       const dividend = 64; // Get dividend for checking correct answer
    //       const divisor = 8; // Get divisor for filling tiles

    //       // Button click handler for multiplication table
    //       const handleButtonClick = (multiplierValue, value, result, skipSound = false) => {
    //         console.log('🔘 [page7] Button clicked:', { multiplierValue, value, result, dividend, skipSound });

    //         // Reset all buttons to initial state first (in case of re-clicks)
    //         const numRows = 10; // rangeEnd - rangeStart + 1 = 10
    //         const defaultBgColor = '#E0E0E0'; // Default button background
    //         const defaultTextColor = '#000000'; // Default button text color

    //         for (let i = 1; i <= numRows; i++) {
    //           const buttonId = `times-table-btn-${multiplierValue}-${i}`;
    //           const button = document.getElementById(buttonId);
    //           if (button && !button.disabled) {
    //             // Only reset if button is not already disabled
    //             button.style.backgroundColor = defaultBgColor;
    //             button.style.color = defaultTextColor;
    //             button.style.filter = 'none';
    //             button.style.opacity = '1';
    //           }
    //         }

    //         // Check if this is the correct answer (result equals dividend)
    //         const isCorrect = result === dividend;

    //         if (isCorrect) {
    //           // Correct answer - fill tiles, play sound, update button states
    //           console.log('✅ [page7] Correct answer! Filling tiles and updating buttons');

    //           // Play correct sound (skip if this is an automatic simulation without user interaction)
    //           if (!skipSound) {
    //             try {
    //               if (typeof window !== 'undefined' && window.playAnswerSound) {
    //                 window.playAnswerSound(true);
    //               } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
    //                 window.SimpleSoundManager.playAnswerSound(true);
    //               }
    //             } catch (error) {
    //               // Silently ignore sound errors (e.g., NotAllowedError when no user interaction)
    //               console.log('🔇 [page7] Sound playback skipped or failed (expected for automatic simulation):', error.message);
    //             }
    //           } else {
    //             console.log('🔇 [page7] Sound playback skipped (automatic simulation)');
    //           }

    //           // Fill multiplication tiles in the same order as the button
    //           // Button format: "multiplierValue × value = result"
    //           // So: Multiplicand = multiplierValue, Multiplier = value, Answer = result
    //           const multiplicandEvent = new CustomEvent('updateTileText', {
    //             detail: { elementId: 'page7-multiplicand-tile', text: String(multiplierValue) }
    //           });
    //           window.dispatchEvent(multiplicandEvent);

    //           const multiplierEvent = new CustomEvent('updateTileText', {
    //             detail: { elementId: 'page7-multiplier-tile', text: String(value) }
    //           });
    //           window.dispatchEvent(multiplierEvent);

    //           const answerEvent = new CustomEvent('updateTileText', {
    //             detail: { elementId: 'page7-answer-tile', text: String(result) }
    //           });
    //           window.dispatchEvent(answerEvent);

    //           // Update tile background colors using custom event
    //           // Multiplicand tile and divisor tile: #76A5AF
    //           // Multiplier tile: #C27BA0
    //           setTimeout(() => {
    //             // Update multiplicand tile background
    //             const multiplicandBgEvent = new CustomEvent('updateTileBackground', {
    //               detail: { elementId: 'page7-multiplicand-tile', backgroundColor: '#76A5AF' }
    //             });
    //             window.dispatchEvent(multiplicandBgEvent);

    //             // Update multiplier tile background
    //             const multiplierBgEvent = new CustomEvent('updateTileBackground', {
    //               detail: { elementId: 'page7-multiplier-tile', backgroundColor: '#C27BA0' }
    //             });
    //             window.dispatchEvent(multiplierBgEvent);

    //             // Update divisor tile background
    //             const divisorBgEvent = new CustomEvent('updateTileBackground', {
    //               detail: { elementId: 'page7-tile-2', backgroundColor: '#76A5AF' }
    //             });
    //             window.dispatchEvent(divisorBgEvent);
    //           }, 100); // Small delay to ensure tiles are updated first

    //           // Update all buttons: correct one turns green, others turn gray and blur, all disabled
    //           const numRows = 10; // rangeEnd - rangeStart + 1 = 10
    //           for (let i = 1; i <= numRows; i++) {
    //             const buttonId = `times-table-btn-${multiplierValue}-${i}`;
    //             const button = document.getElementById(buttonId);
    //             if (button) {
    //               if (i === value) {
    //                 // Correct button - green background
    //                 button.style.backgroundColor = '#4CAF50'; // Green
    //                 button.style.color = '#ffffff';
    //                 button.disabled = true;
    //                 button.style.cursor = 'not-allowed';
    //               } else {
    //                 // Other buttons - gray and blur
    //                 button.style.backgroundColor = '#C0C0C0'; // Gray
    //                 button.style.color = '#808080';
    //                 button.style.filter = 'blur(2px)';
    //                 button.style.opacity = '0.6';
    //                 button.disabled = true;
    //                 button.style.cursor = 'not-allowed';
    //               }
    //             }
    //           }

    //           // Mark correct answer as clicked and show Next button
    //           if (typeof window !== 'undefined') {
    //             if (!window.page7ButtonState) {
    //               window.page7ButtonState = {
    //                 dividendClicked: false,
    //                 divisorClicked: false,
    //                 hintShown: false,
    //                 correctAnswerClicked: true
    //               };
    //             } else {
    //               window.page7ButtonState.correctAnswerClicked = true;
    //             }

    //             // NOTE: Do NOT show Next button and tap animation here
    //             // They should only be shown when the number pad check button is clicked and answer is correct
    //             // The multiplication table button click is just for pre-filling tiles, not for validation
    //           }
    //         } else {
    //           // Wrong answer - turn button salmon and disable
    //           console.log('❌ [page7] Wrong answer');

    //           // Play wrong sound (skip if this is an automatic simulation without user interaction)
    //           if (!skipSound) {
    //             try {
    //               if (typeof window !== 'undefined' && window.playAnswerSound) {
    //                 window.playAnswerSound(false);
    //               } else if (typeof window !== 'undefined' && window.SimpleSoundManager) {
    //                 window.SimpleSoundManager.playAnswerSound(false);
    //               }
    //             } catch (error) {
    //               // Silently ignore sound errors (e.g., NotAllowedError when no user interaction)
    //               console.log('🔇 [page7] Sound playback skipped or failed:', error.message);
    //             }
    //           }

    //           // Turn clicked button salmon and disable
    //           const buttonId = `times-table-btn-${multiplierValue}-${value}`;
    //           const button = document.getElementById(buttonId);
    //           if (button) {
    //             button.style.backgroundColor = '#FA8072'; // Salmon
    //             button.style.color = '#ffffff';

    //             // Add wiggle animation for 750ms
    //             button.style.animation = 'none'; // Reset animation first
    //             // Force reflow to ensure animation reset
    //             void button.offsetWidth;

    //             // Apply wiggle animation
    //             button.style.animation = 'tableCellWiggle 0.75s ease-in-out';

    //             // Disable button after animation completes
    //             setTimeout(() => {
    //               if (button) {
    //                 button.disabled = true;
    //                 button.style.cursor = 'not-allowed';
    //                 button.style.animation = 'none'; // Remove animation after it completes
    //               }
    //             }, 750);
    //           }
    //         }
    //       };

    //       // Table coordinates - must match the element's coordinates for auto-sizing
    //       const tableCoordinates = [1125, 120, 1565, 775];

    //       return {
    //         componentType: 'TimesTableComponent',
    //         // Core configuration
    //         multiplier: multiplier,
    //         rangeStart: 1,
    //         rangeEnd: 10,
    //         coordinates: tableCoordinates, // Container boundaries for calculating actual table size
    //         showHeader: true, // Show header row at the top
    //         headerText: getI18nText('pages.page3.multiplicationTableHeader', 'Multiplication-table'), // Header text
    //         headerTextColor: '#ffffff', // White header text color
    //         headerFontSize: '32gc', // Header font size

    //         // Usable dimensions as percentage of container
    //         usableHeight: 100, // Use 100% of container height
    //         usableWidth: 70,  // Use 70% of container width (centered horizontally)

    //         // Styling
    //         fontSize: '32gc',
    //         textColor: '#000000',
    //         cellBackgroundColor: '#E0E0E0',
    //         cellBorderRadius: '8gc',
    //         padding: '8gc',
    //         rowGap: '8gc',
    //         borderWidth: '0px',

    //         // Layout (using defaults, but explicit for clarity)
    //         textAlign: 'center',
    //         fontWeight: 'normal',
    //         equalColumnWidths: true,
    //         equalRowHeights: true,
    //         backgroundColor: 'transparent',
    //         columnGap: '0gc',

    //         // Button dimensions
    //         buttonWidthPercent: 70, // Button width as 70% of row width
    //         buttonHeightPercent: 95, // Button height as 90% of row height
    //         buttonBorderRadius: '12gc', // Border radius for buttons

    //         // Row borders
    //         rowBorderWidth: '2px', // Border width for table rows
    //         rowBorderColor: 'transparent', // White border color for table rows

    //         // Container borders
    //         containerBorderWidth: '4gc', // Border width for container (white 4gc solid)
    //         containerBorderColor: '#ffffff', // White border color for container
    //         containerBorderRadius: '10gc', // Border radius for container
    //         containerBorderStyle: 'solid', // Border style for container

    //         // Button click handler
    //         onButtonClick: handleButtonClick
    //       };

    //       // Function to apply tile background colors (same as page 3)
    //       const applypage7TileColors = () => {
    //         // Apply tile background colors using custom events (same as page 3)
    //         // Multiplicand tile and divisor tile: #76A5AF
    //         // Multiplier tile: #C27BA0
    //         // Use same delay as page 3 (100ms) to ensure tiles are updated first
    //         setTimeout(() => {
    //           // Update multiplicand tile background
    //           const multiplicandBgEvent = new CustomEvent('updateTileBackground', {
    //             detail: { elementId: 'page7-multiplicand-tile', backgroundColor: '#76A5AF' }
    //           });
    //           window.dispatchEvent(multiplicandBgEvent);

    //           // Update multiplier tile background
    //           const multiplierBgEvent = new CustomEvent('updateTileBackground', {
    //             detail: { elementId: 'page7-multiplier-tile', backgroundColor: '#C27BA0' }
    //           });
    //           window.dispatchEvent(multiplierBgEvent);

    //           // Update divisor tile background
    //           const divisorBgEvent = new CustomEvent('updateTileBackground', {
    //             detail: { elementId: 'page7-tile-2', backgroundColor: '#76A5AF' }
    //           });
    //           window.dispatchEvent(divisorBgEvent);
    //         }, 100); // Same delay as page 3 to ensure tiles are updated first
    //       };

    //       // Store handleButtonClick and question data globally for pageChanged event
    //       if (typeof window !== 'undefined') {
    //         window.page7HandleButtonClick = handleButtonClick;
    //         window.page7QuestionData = { multiplier, divisor, dividend };
    //       }

    //       // Function to simulate correct button click - call handleButtonClick directly
    //       const simulateCorrectButtonClick = () => {
    //         const correctResult = multiplier * divisor; // This should equal dividend
    //         console.log('🎯 [page7] Simulating correct button click:', {
    //           multiplier,
    //           divisor,
    //           result: correctResult,
    //           dividend
    //         });

    //         // Initialize state
    //         if (typeof window !== 'undefined' && !window.page7ButtonState) {
    //           window.page7ButtonState = {
    //             dividendClicked: false,
    //             divisorClicked: false,
    //             hintShown: false,
    //             correctAnswerClicked: false // Will be set to true by handleButtonClick
    //           };
    //         }

    //         // Call the button click handler directly - it will handle button updates
    //         // Pass skipSound=true to avoid sound errors on automatic simulation (no user interaction)
    //         handleButtonClick(multiplier, divisor, correctResult, true);
    //       };

    //       // Set up pageChanged listener (only once, outside props function scope)
    //       if (typeof window !== 'undefined' && !window.page7ButtonClickSimulated) {
    //         const handlepage7Load = (event) => {
    //           const pageNumber = event.detail?.page || event.detail?.pageNumber;
    //           if (pageNumber === 7 && !window.page7ButtonClickSimulated) {
    //             console.log('📄 [page7] Page changed to 4, will simulate button click');
    //             window.page7ButtonClickSimulated = true; // Prevent multiple calls

    //             // Wait for components to render, then simulate click
    //             setTimeout(() => {
    //               if (window.page7HandleButtonClick && window.page7QuestionData) {
    //                 const { multiplier: m, divisor: d } = window.page7QuestionData;
    //                 const result = m * d;
    //                 console.log('🎯 [page7] Calling handleButtonClick from pageChanged event:', { m, d, result });
    //                 // Pass skipSound=true to avoid sound errors on automatic simulation (no user interaction)
    //                 window.page7HandleButtonClick(m, d, result, true);
    //               }
    //             }, 1000); // Longer delay to ensure everything is rendered
    //           }
    //         };

    //         window.addEventListener('pageChanged', handlepage7Load);
    //       }

    //       // Also try immediately if we're already on page 4 (for initial load)
    //       setTimeout(() => {
    //         if (typeof window !== 'undefined' && window.getCurrentPage) {
    //           const currentPage = window.getCurrentPage();
    //           if (currentPage === 4 && !window.page7ButtonClickSimulated) {
    //             console.log('📄 [page7] Already on page 4 on load, simulating button click');
    //             window.page7ButtonClickSimulated = true;
    //             simulateCorrectButtonClick();
    //           }
    //         } else {
    //           // Fallback: try after delay even if getCurrentPage is not available
    //           setTimeout(() => {
    //             if (!window.page7ButtonClickSimulated) {
    //               console.log('📄 [page7] Fallback: simulating button click');
    //               window.page7ButtonClickSimulated = true;
    //               simulateCorrectButtonClick();
    //             }
    //           }, 1200);
    //         }
    //       }, 1000);
    //     }
    //   },

    //   // Number Pad Panel
    //   {
    //     id: 'page7-number-pad',
    //     name: 'number-pad',
    //     type: 'number-pad-panel',
    //     coordinates: [1130, 125, 1550, 775], // Positioned within right container with padding
    //     zIndex: 52,
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page7ButtonState) {
    //         window.page7ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false,
    //           hintShown: false,
    //           correctAnswerClicked: false,
    //           checkCorrect: false
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page7ButtonState
    //         ? window.page7ButtonState
    //         : { checkCorrect: false };

    //       // Hide number pad when check is correct
    //       const isCheckCorrect = buttonState.checkCorrect || false;

    //       return {
    //         backgroundColor: 'rgba(0, 0, 0, 0.4)',
    //         borderRadius: '15gc',
    //         border: '4px solid #D2691E',
    //         padding: '20gc',
    //         layout: 'vertical',
    //         buttonConfig: 5, // Numbers + + - × ÷ = . + C + ⌫ (custom config with all operators)
    //         enableClickSound: true,
    //         inputMode: 'append',
    //         maxNumber: null,
    //         feedbackMode: 'feedback',
    //         feedbackComponentId: null,
    //         destinations: [
    //           {
    //             destinationId: 'page7-tile-3', // Quotient tile
    //             destinationType: 'tile',
    //             correctValue: () => {

    //               return 8;
    //             },
    //             // Dynamic feedback messages
    //             correctFeedback: () => {
    //               // Get the division question to create dynamic feedback
    //               const question = typeof window !== 'undefined' && window.getCurrentDivisionQuestion
    //                 ? window.getCurrentDivisionQuestion()
    //                 : null;
    //               if (question) {
    //                 return `That's right…<br>${64} ÷ ${8} = ${8}`;
    //               }
    //               return "That's right!";
    //             },
    //             incorrectFeedback: getI18nText('numberPad.feedback.incorrectFromMultiplication', 'Ohh that is not right! Use the number from the multiplication sentence.'),
    //             emptyFeedback: getI18nText('numberPad.feedback.fillHighlightedBox', 'Fill the highlighted box before checking'),
    //             // Optional: mode to set on correct/incorrect
    //             correctMode: 'correct',
    //             incorrectMode: 'incorrect'
    //           }
    //         ],
    //         destinationIndex: 0,
    //         feedbackRowHeight: '35%',
    //         buttonGridHeight: '55%',
    //         checkButtonHeight: '10%',
    //         showButton: {
    //           backgroundColor: '#FFD700',
    //           color: '#000000',
    //           fontSize: '35gc',
    //           fontWeight: 'bold',
    //           text: getI18nText('numberPad.showButton', 'show 💡')
    //         },
    //         numberButtons: {
    //           backgroundColor: 'transparent',
    //           color: '#ffffff',
    //           fontSize: '32gc',
    //           fontWeight: 'bold',
    //           buttonWidthPercent: '75%',
    //           buttonHeightPercent: '90%'
    //         },
    //         checkButton: {
    //           backgroundColor: 'var(--color-gold)', // Gold color like next button
    //           frameGap: '6.25gc', // Frame gap for 3-layer structure
    //           color: '#000000',
    //           fontSize: '35gc',
    //           fontWeight: 'bold',
    //           text: getI18nText('numberPad.checkButton', 'CHECK')
    //         },
    //         feedbackTextArea: {
    //           fontSize: '30gc' // Feedback text font size
    //         },
    //         // Hide number pad when check is correct
    //         style: {
    //           display: isCheckCorrect ? 'none' : 'block'
    //         }
    //       };
    //     }
    //   },

    //   // Next Button - Same as page 2
    //   {
    //     id: 'page7-next-button',
    //     name: 'next-button',
    //     type: 'button',
    //     coordinates: [1193, 355, 1493, 455], // Same coordinates as page 2 Next button
    //     zIndex: 53,
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page7ButtonState) {
    //         window.page7ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false,
    //           hintShown: false,
    //           correctAnswerClicked: false, // Hidden until check is correct
    //           checkCorrect: false // Track if check button was clicked and answer was correct
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page7ButtonState
    //         ? window.page7ButtonState
    //         : { dividendClicked: false, divisorClicked: false, hintShown: false, correctAnswerClicked: false, checkCorrect: false };

    //       // Next button is visible only when check is correct
    //       const isCheckCorrect = buttonState.checkCorrect || false;

    //       return {
    //         className: 'applet-button',
    //         frameClassName: 'applet-button-frame',
    //         contentClassName: 'applet-button-content',
    //         frameGap: '6.25gc',
    //         text: getI18nText('pages.page7.nextButton', 'Start Over'),
    //         backgroundColor: 'var(--color-gold)', // Gold background
    //         color: '#000000', // Black text
    //         fontSize: '48gc',
    //         fontWeight: 'bold',
    //         borderRadius: '15gc',
    //         textAlign: 'center',
    //         display: isCheckCorrect ? 'flex' : 'none', // Hidden until check is correct
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         disabled: false,
    //         cursor: 'pointer',
    //         onClick: () => {
    //           // Handle Start Over button click - reset all states and navigate to page 1
    //           const buttonElement = document.getElementById('page7-next-button');

    //           // Visual feedback: scale animation
    //           // if (buttonElement) {
    //           //   buttonElement.style.transform = 'scale(0.95)';
    //           //   buttonElement.style.transition = 'transform 0.1s ease';
    //           //   setTimeout(() => {
    //           //     buttonElement.style.transform = 'scale(1)';
    //           //     setTimeout(() => {
    //           //       buttonElement.style.transition = '';
    //           //     }, 100);
    //           //   }, 100);
    //           // }

    //           // Play click sound
    //           // if (typeof window !== 'undefined') {
    //           //   if (window.playCarClickSound) {
    //           //     window.playCarClickSound('next');
    //           //   } else if (window.SoundManager && window.SoundManager.play) {
    //           //     window.SoundManager.play('click');
    //           //   }
    //           // }
    //           window.playCarClickSound('next');
    //           window.changePageAndNotify(5);
    //           // Reset all states before navigating
    //           // if (typeof window !== 'undefined') {
    //           //   // Call the resetAllStates function (defined in this file)
    //           //   try {
    //           //     resetAllStates();
    //           //   } catch (error) {
    //           //     console.warn('⚠️ [page7] Could not call resetAllStates:', error);
    //           //   }

    //           //   // Reset page-specific button states
    //           //   // Reset page 2 button state
    //           //   if (window.page2ButtonState) {
    //           //     window.page2ButtonState = {
    //           //       dividendClicked: false,
    //           //       divisorClicked: false
    //           //     };
    //           //   }

    //           //   // Reset page 3 button state
    //           //   if (window.page3ButtonState) {
    //           //     window.page3ButtonState = {
    //           //       dividendClicked: false,
    //           //       divisorClicked: false,
    //           //       hintShown: false,
    //           //       correctAnswerClicked: false
    //           //     };
    //           //   }

    //           //   // Reset page 4 button state
    //           //   if (window.page7ButtonState) {
    //           //     window.page7ButtonState = {
    //           //       dividendClicked: false,
    //           //       divisorClicked: false,
    //           //       hintShown: false,
    //           //       correctAnswerClicked: false,
    //           //       checkCorrect: false
    //           //     };
    //           //   }

    //           //   // Reset page 4 button click simulation flag
    //           //   if (window.page7ButtonClickSimulated !== undefined) {
    //           //     window.page7ButtonClickSimulated = false;
    //           //   }

    //           //   // Reset question index if it exists
    //           //   if (window.currentQuestionIndex !== undefined) {
    //           //   window.currentQuestionIndex = 0;
    //           // }

    //           //   console.log('🔄 [page7] All states reset, navigating to page 1');
    //           // }

    //           // // Navigate to page 1
    //           // setTimeout(() => {
    //           // if (typeof window !== 'undefined') {
    //           //   if (window.changePageAndNotify) {
    //           //     window.changePageAndNotify(1);
    //           //   } else if (window.navigateToPage) {
    //           //     window.navigateToPage(1);
    //           //   } else {
    //           //     window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
    //           //     }
    //           //   }
    //           // }, 150);
    //         }
    //       };
    //     }
    //   },

    //   // Tap Animation on Next Button
    //   {
    //     id: 'page7-next-tap-animation',
    //     name: 'next-tap-animation',
    //     type: 'custom',
    //     coordinates: [1340, 375, 1440, 450], // Centered on Next button
    //     zIndex: 60, // Higher z-index to be on top
    //     props: () => {
    //       // Initialize button state if not exists
    //       if (typeof window !== 'undefined' && !window.page7ButtonState) {
    //         window.page7ButtonState = {
    //           dividendClicked: false,
    //           divisorClicked: false,
    //           hintShown: false,
    //           correctAnswerClicked: false,
    //           checkCorrect: false // Track if check button was clicked and answer was correct
    //         };
    //       }

    //       const buttonState = typeof window !== 'undefined' && window.page7ButtonState
    //         ? window.page7ButtonState
    //         : { dividendClicked: false, divisorClicked: false, hintShown: false, correctAnswerClicked: false, checkCorrect: false };

    //       // Tap animation is visible only when check is correct
    //       // Always start hidden, will be shown when check is correct via showOnEvent

    //       return {
    //         componentType: 'TapGifComponent',
    //         imageSrc: 'assets/tap.gif',
    //         imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
    //         opacity: 0.7, // 30% opacity
    //         initialVisible: false, // Always start hidden on page load
    //         showOnEvent: 'page7CheckCorrect', // Show when check is correct event is dispatched
    //         style: {
    //           pointerEvents: 'none' // Allow clicks to pass through to the button below
    //         }
    //       };
    //     }
    //   },


    //   // Bottom prompt bar - Dynamic instruction text
    //   {
    //     id: 'page7-instruction-text',
    //     name: 'instruction-text',
    //     type: 'custom',
    //     coordinates: [5, 800, 1575, 900], // Footer bar at bottom
    //     zIndex: 54,
    //     props: () => {
    //       // Check if check is correct to determine which text to show
    //       const buttonState = typeof window !== 'undefined' && window.page7ButtonState
    //         ? window.page7ButtonState
    //         : { checkCorrect: false };

    //       const isCheckCorrect = buttonState.checkCorrect || false;

    //       return {
    //         componentType: 'TeacherNoteComponent',
    //         text: isCheckCorrect
    //           ? getI18nText('pages.page7.instructionAfterCheck', 'Tap START OVER to restart this activity again.')
    //           : getI18nText('pages.page7.instructionText', 'Tap the number using numpad to fill in the highlighted box.'),
    //         backgroundColor: 'transparent',
    //         border: 'none',
    //         borderRadius: '0gc',
    //         textColor: '#ffffff',
    //         fontSize: '36gc',
    //         padding: '15gc',
    //         fontWeight: 'normal',
    //         textAlign: 'center'
    //       };
    //     }
    //   },

    // ],
  };
};

// ===== INITIALIZATION AND EXPORT =====

/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log("🚀 Initializing PageConfig");

  // Initialize page 2 and page 3 button states
  if (typeof window !== 'undefined') {
    if (!window.page2ButtonState) {
      window.page2ButtonState = {
        dividendClicked: false,
        divisorClicked: false
      };
    }
    if (!window.page3ButtonState) {
      window.page3ButtonState = {
        dividendClicked: false,
        divisorClicked: false,
        hintShown: false,
        correctAnswerClicked: false
      };
    }
    if (!window.page4ButtonState) {
      window.page4ButtonState = {
        dividendClicked: false,
        divisorClicked: false,
        hintShown: false,
        correctAnswerClicked: false,
        checkCorrect: false // Track if check button was clicked and answer was correct
      };
    }

    // Add event listener for page 4 check correct event
    window.addEventListener('page4CheckCorrect', (event) => {
      console.log('✅ [PageConfig] Page 4 check correct event received, showing Next button and hiding number pad');
      if (window.page4ButtonState) {
        window.page4ButtonState.checkCorrect = true;

        // Trigger re-render immediately to update number pad visibility and Next button
        if (typeof window.forceAppUpdate === 'function') {
          window.forceAppUpdate();
          console.log('✅ [PageConfig] Triggered forceAppUpdate to refresh components');
        }

        // Use a small delay to ensure elements are rendered for manual DOM updates
        setTimeout(() => {
          // Show Next button (backup - props should handle this, but ensure it's visible)
          const nextButton = document.getElementById('page4-next-button');
          if (nextButton) {
            nextButton.style.display = 'flex';
            console.log('✅ [PageConfig] Next button shown');
          } else {
            console.warn('⚠️ [PageConfig] Next button not found');
          }

          // Number pad visibility is now controlled by props (style.display)
          // It will be hidden via React re-render when checkCorrect is true
          console.log('✅ [PageConfig] Number pad visibility will be updated via props');

          // Update instruction text when check is correct
          const instructionText = document.getElementById('page4-instruction-text');
          if (instructionText) {
            // Determine which text to show based on whether it's the last question
            const divisionQuestions = getI18nText('common.divisionQuestions', []);
            const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
              ? window.currentQuestionIndex
              : 0;
            const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
            const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;

            let instructionText_content;
            if (isLastQuestion) {
              instructionText_content = getI18nText('pages.page4.footerInstructionLast', 'Tap » to start over again');
              console.log('📝 [PageConfig] Last question - showing footer instruction last');
            } else {
              instructionText_content = getI18nText('pages.page4.footerInstruction', 'Tap » for the next question');
              console.log('📝 [PageConfig] Not last question - showing footer instruction');
            }

            // Update the text content directly
            instructionText.textContent = instructionText_content;
            // Also try to update via innerHTML if it's a component that uses it
            if (instructionText.innerHTML !== undefined) {
              instructionText.innerHTML = instructionText_content;
            }
            console.log('✅ [PageConfig] Instruction text updated:', instructionText_content);
          } else {
            console.warn('⚠️ [PageConfig] Instruction text element not found');
          }
        }, 100); // Small delay to ensure elements are rendered
      }
    });
  }

  // Create GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();

  // Debug: Log available pages
  console.log("📄 [PageConfig] Available pages:", Object.keys(optimizedPages));

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
