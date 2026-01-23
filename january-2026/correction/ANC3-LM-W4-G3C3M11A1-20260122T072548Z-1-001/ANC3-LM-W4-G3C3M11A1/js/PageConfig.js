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
        coordinates: [25, 100, 1105, 710], // Left 70% of main content area
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

      // Orange-bordered container with black background - Right (30% width)
      {
        id: 'page1-main-container-right',
        name: 'main-container-right',
        type: 'custom',
        coordinates: [1110, 100, 1575, 710], // Right 30% of main content area
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
        coordinates: [5, 725, 1575, 815], // Footer bar at bottom
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
                console.log('📄 [Previous Button]', getI18nText('messages.previousButtonPage1', 'Dispatched page change event to page 1'));
              }
            }
          }
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
        
    ],

    2: [

      // Top Instruction Text - "Write  as Mathematical Sentence for division."
      {
        id: 'page2-header-text',
        name: 'header-text',
        type: 'custom',
        coordinates: [5, 25, 1575, 100], // Header at top
        zIndex: 50,
        props: {
          componentType: 'TeacherNoteComponent',
          text: getI18nText('pages.page2.headerText', "Write  as Mathematical Sentence for division."),
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
        coordinates: [25, 100, 1105, 710], // Left 70% of main content area
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

      // Orange-bordered container with black background - Right (30% width)
      // {
      //   id: 'page2-main-container-right',
      //   name: 'main-container-right',
      //   type: 'custom',
      //   coordinates: [1105, 100, 1575, 710], // Right 30% of main content area
      //   zIndex: 51,
      //   props: {
      //     componentType: 'TeacherNoteComponent',
      //     text: '', // Empty, just for background and border
      //     backgroundColor: 'transparent', // Black background
      //     border: '3px solid var(--color-gold-dark)', // Orange border
      //     borderRadius: '10gc',
      //     textColor: '#ffffff',
      //     fontSize: '1gc',
      //     padding: '0gc'
      //   }
      // },

      // Number Pad in right container
      {
        id: 'page2-number-pad',
        name: 'number-pad',
        type: 'number-pad-panel',
        coordinates: [1130, 100, 1550, 715], // Positioned within right container with padding
        zIndex: 52,
        props: {
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
          destinations: [],
          destinationIndex: 0,
          feedbackRowHeight: '35%',
          buttonGridHeight: '55%',
          checkButtonHeight: '10%',
          showButton: {
            backgroundColor: '#FFD700',
            color: '#000000',
            fontSize: '35gc',
            fontWeight: 'bold',
            text: 'show 💡'
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
            text: 'CHECK'
          },
          feedbackTextArea: {
            fontSize: '30gc' // Feedback text font size
          }
        }
      },

      // Text at the top of left container
      {
        id: 'page2-left-container-text',
        name: 'left-container-text',
        type: 'custom',
        coordinates: [50, 150, 1080, 200], // Top of left container
        zIndex: 52,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            // Check if quiz is completed - show instruction text instead of statement
            if (typeof window !== 'undefined' && window.page2QuizCompleted) {
              const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
                ? window.currentQuestionIndex
                : 0;
              const divisionQuestions = getI18nText('common.divisionQuestions', []);
              const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
              const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;
              
              if (isLastQuestion) {
                return getI18nText('pages.page2.footerInstructionLast', "Tap » to start over again");
              } else {
                return getI18nText('pages.page2.footerInstruction', "Tap » for the next question");
              }
            }
            // Show statement when quiz is not completed
            const question = getCurrentDivisionQuestion();
            return question.statement || getI18nText('pages.page2.headerText', "Write  as Mathematical Sentence for division.");
          },
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff', // White text
          fontSize: '36gc',
          padding: '15gc',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      },

      // Division Equation: "16 ÷ 8 = 2" using tiles and text

      // Tile for "16" (Dividend)
      {
        id: 'page2-tile-dividend',
        name: 'tile-dividend',
        type: 'tile',
        coordinates: [220, 295, 370, 445], // Centered equation
        zIndex: 52,
        props: {
          mode: 'focus', // Start in out-of-focus mode
          text: '', // Empty to start
          backgroundColor: 'var(--color-gold)',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center',
          onClick: createTileClickHandler('dividend', 2)
        }
      },

      // Tile for "÷"
      {
        id: 'page2-tile-divide',
        name: 'tile-divide',
        type: 'tile',
        coordinates: [390, 314, 470, 426], // 75% height, centered vertically
        zIndex: 52,
        props: {
          mode: 'out-of-focus', // Start in out-of-focus mode
          text: '', // Empty to start
          backgroundColor: 'var(--color-gold)',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center',
          onClick: createTileClickHandler('divide', 2)
        }
      },


      // Tile for "8" (Divisor)
      {
        id: 'page2-tile-divisor',
        name: 'tile-divisor',
        type: 'tile',
        coordinates: [490, 295, 640, 445], // Centered equation
        zIndex: 52,
        props: {
          mode: 'out-of-focus', // Start in out-of-focus mode
          text: '', // Empty to start
          backgroundColor: 'var(--color-gold)',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center',
          onClick: createTileClickHandler('divisor', 2)
        }
      },

      // Tile for "="
      {
        id: 'page2-tile-equals',
        name: 'tile-equals',
        type: 'tile',
        coordinates: [660, 314, 740, 426], // 75% height, centered vertically
        zIndex: 52,
        props: {
          mode: 'out-of-focus', // Start in out-of-focus mode
          text: '', // Empty to start
          backgroundColor: 'var(--color-gold)',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center',
          onClick: createTileClickHandler('equals', 2)
        }
      },


      // Tile for "2" (Quotient) - Quiz detection element
      {
        id: 'page2-tile-quotient',
        name: 'tile-quotient',
        type: 'tile',
        coordinates: [760, 295, 910, 445], // Centered equation
        zIndex: 52,
        props: {
          mode: 'out-of-focus', // Start in out-of-focus mode
          text: '', // Empty to start
          backgroundColor: 'var(--color-gold)',
          borderColor: '#ffffff', // White border
          borderWidth: '3gc',
          borderStyle: 'solid',
          borderRadius: '10gc',
          color: '#000000', // Black text
          fontSize: '80gc',
          fontWeight: 'bold',
          padding: '20gc',
          textAlign: 'center',
          // Add data attributes for quiz detection
          'data-component-type': 'Page2Quiz',
          'data-component': 'Page2Quiz',
          onClick: createTileClickHandler('quotient', 2)
        }
      },


      // Bottom prompt bar - "Tap the number using numpad to fill in the highlighted box."
      {
        id: 'page2-instruction-text',
        name: 'instruction-text',
        type: 'custom',
        coordinates: [5, 725, 1575, 815], // Footer bar at bottom
        zIndex: 54,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            // Check if quiz is completed - show instruction text based on last question
            if (typeof window !== 'undefined' && window.page2QuizCompleted) {
              const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
                ? window.currentQuestionIndex
                : 0;
              const divisionQuestions = getI18nText('common.divisionQuestions', []);
              const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
              const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;
              
              if (isLastQuestion) {
                return getI18nText('pages.page2.instructionAfterCorrectLast', "Tap Start Over to restart this activity again.");
              } else {
                return getI18nText('pages.page2.instructionAfterCorrect', "Tap » to go to next question");
              }
            }
            // Default instruction text
            return getI18nText('pages.page2.instructionText', "Tap the number using numpad to fill in the highlighted box.");
          },
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

      // Progress Dots - Dynamic dots based on number of questions with current question highlighted
      {
        id: 'page2-progress-dots',
        name: 'progress-dots',
        type: 'custom',
        coordinates: [700, 820, 900, 895], // Center of navigation bar
        zIndex: 55,
        props: {
          componentType: 'TeacherNoteComponent',
          get text() {
            // Get current question index and total questions
            const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
              ? window.currentQuestionIndex
              : 0;
            const divisionQuestions = getI18nText('common.divisionQuestions', []);
            const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
            
            // If no questions, show default 4 dots with first one active
            if (totalQuestions === 0) {
              return '<div style="display: flex; align-items: center; justify-content: center; gap: 15px;"><div style="width: 12px; height: 12px; border-radius: 50%; background-color: #FF6600; border: 2px solid #ffffff;"></div><div style="width: 12px; height: 12px; border-radius: 50%; background-color: #555555; border: 2px solid #ffffff;"></div><div style="width: 12px; height: 12px; border-radius: 50%; background-color: #555555; border: 2px solid #ffffff;"></div><div style="width: 12px; height: 12px; border-radius: 50%; background-color: #555555; border: 2px solid #ffffff;"></div></div>';
            }
            
            // Generate dots dynamically - one per question
            const dots = [];
            for (let i = 0; i < totalQuestions; i++) {
              const isActive = i === currentIndex;
              const bgColor = isActive ? '#FF6600' : '#555555';
              dots.push(`<div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${bgColor}; border: 2px solid #ffffff;"></div>`);
            }
            
            return `<div style="display: flex; align-items: center; justify-content: center; gap: 15px;">${dots.join('')}</div>`;
          },
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0gc',
          textColor: '#ffffff',
          fontSize: '1gc',
          padding: '0gc',
          fontWeight: 'normal',
          textAlign: 'center'
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

      // Tap Animation on Next Button (hidden until quiz completion)
      {
        id: 'page2-next-tap-animation',
        name: 'next-tap-animation',
        type: 'custom',
        coordinates: [1450, 820, 1500, 895], // Centered on next button
        zIndex: 999, // Higher z-index to be on top of button
        props: {
          componentType: 'TapGifComponent',
          imageSrc: 'assets/tap.gif',
          imageAlt: getI18nText('common.tapAnimationAlt', 'Tap'),
          opacity: 0.75, // 30% opacity
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
            
            // Get current question index and check if it's the last question
            const currentIndex = typeof window !== 'undefined' && window.currentQuestionIndex !== undefined
              ? window.currentQuestionIndex
              : 0;
            const divisionQuestions = getI18nText('common.divisionQuestions', []);
            const totalQuestions = Array.isArray(divisionQuestions) ? divisionQuestions.length : 0;
            const isLastQuestion = totalQuestions > 0 && currentIndex === totalQuestions - 1;
            
            // Reset all page 2 states
            const resetPage2States = () => {
              if (typeof window !== 'undefined') {
                // Reset quiz completion flag
                window.page2QuizCompleted = false;
                
                // Reset focused tile
                window.focusedTileId = null;
                window.focusedTilePage = null;
                window.tileJustFocused = false;
                
                // Clear all tile borders and reset modes
                const allTileIds = ['page2-tile-dividend', 'page2-tile-divisor', 'page2-tile-quotient', 'page2-tile-divide', 'page2-tile-equals'];
                allTileIds.forEach((tileId) => {
                  const tileElement = document.getElementById(tileId);
                  if (tileElement) {
                    // Clear borders
                    tileElement.style.borderWidth = '';
                    tileElement.style.borderColor = '';
                    tileElement.style.borderStyle = '';
                    tileElement.style.animation = '';
                    tileElement.style.pointerEvents = '';
                    tileElement.style.cursor = '';
                    
                    // Reset tile text
                    tileElement.textContent = '';
                    tileElement.innerText = '';
                    
                    // Reset mode to out-of-focus
                    tileElement.setAttribute('data-tile-mode', 'out-of-focus');
                    tileElement.classList.remove('table-cell-focus-blink');
                    
                    // Dispatch reset events
                    const borderResetEvent = new CustomEvent('tileBorderReset', {
                      detail: { elementId: tileId },
                      bubbles: true
                    });
                    window.dispatchEvent(borderResetEvent);
                    tileElement.dispatchEvent(borderResetEvent);
                    
                    const modeUpdateEvent = new CustomEvent('tileModeUpdated', {
                      detail: { mode: 'out-of-focus', destinationId: tileId },
                      bubbles: true
                    });
                    window.dispatchEvent(modeUpdateEvent);
                    tileElement.dispatchEvent(modeUpdateEvent);
                  }
                });
                
                // Re-enable number pad
                const numberPadId = `numberpad-2`;
                const numberPadElement = document.getElementById(numberPadId) || 
                                        document.querySelector(`[data-element-name="${numberPadId}"]`) ||
                                        document.querySelector(`[id*="${numberPadId}"]`);
                if (numberPadElement) {
                  numberPadElement.style.pointerEvents = '';
                  numberPadElement.style.opacity = '';
                  
                  // Re-enable all buttons
                  const allButtons = document.querySelectorAll(`#${numberPadId} .number-pad-button, #${numberPadId} .applet-button-container`);
                  allButtons.forEach((button) => {
                    button.style.pointerEvents = '';
                    button.style.opacity = '';
                    button.style.cursor = '';
                  });
                }
                
                // Clear number pad feedback message using the window function
                if (typeof window !== 'undefined' && window.clearNumberPadFeedback) {
                  window.clearNumberPadFeedback();
                }
                
                // Reset instruction text to original by dispatching an event
                const instructionTextElement = document.getElementById('page2-instruction-text');
                if (instructionTextElement) {
                  // Dispatch a custom event to reset the instruction text
                  const resetInstructionEvent = new CustomEvent('page2InstructionReset', {
                    detail: { resetToOriginal: true },
                    bubbles: true
                  });
                  window.dispatchEvent(resetInstructionEvent);
                  instructionTextElement.dispatchEvent(resetInstructionEvent);
                  console.log('🔄 [Page2 Next] Dispatched instruction text reset event');
                }
                
                console.log('🔄 [Page2 Next] Reset all page 2 states');
              }
            };
            
            if (isLastQuestion) {
              // Last question: go to page 1 and reset to first question
              console.log('🔄 [Page2 Next] Last question - Going to page 1 and resetting to first question');
              
              // Reset question index to 0
              if (typeof window !== 'undefined') {
                window.currentQuestionIndex = 0;
              }
              
              // Reset all states
              resetPage2States();
              
              // Navigate to page 1
              if (typeof window !== 'undefined') {
                if (window.changePageAndNotify) {
                  window.changePageAndNotify(1);
                } else if (window.navigateToPage) {
                  window.navigateToPage(1);
                } else {
                  window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 1 } }));
                  console.log('📄 [Page2 Next] Navigated to page 1 with first question');
                }
              }
            } else {
              // Not last question: increment question index and reload page 2
              console.log('🔄 [Page2 Next] Not last question - Incrementing question index and reloading page 2');
              
              // Increment question index
              const nextIndex = currentIndex + 1;
              if (typeof window !== 'undefined') {
                window.currentQuestionIndex = nextIndex;
                console.log(`🔄 [Page2 Next] Advanced to question ${nextIndex + 1} of ${totalQuestions}`);
              }
              
              // Reset all states
              resetPage2States();
              
              // Reload page 2 (navigate to page 2 again)
              if (typeof window !== 'undefined') {
                if (window.changePageAndNotify) {
                  window.changePageAndNotify(2);
                } else if (window.navigateToPage) {
                  window.navigateToPage(2);
                } else {
                  window.dispatchEvent(new CustomEvent('pageChanged', { detail: { page: 2 } }));
                  console.log('📄 [Page2 Next] Reloaded page 2 with next question');
                }
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
