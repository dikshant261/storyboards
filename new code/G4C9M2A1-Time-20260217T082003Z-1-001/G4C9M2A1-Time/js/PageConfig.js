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


// ===== PAGE 1 VISIBILITY MANAGEMENT =====

/**
 * Update visibility of page1 intro box and tap animation based on page1state
 * Shows them only when page1state === "summary", hides otherwise
 */
const updatePage1Visibility = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  const state = window.page1state || "summary";
  const shouldShow = state === "summary";
  
  // Update intro box visibility
  const updateIntroBox = () => {
    const introBox = document.getElementById("page1-intro-box");
    if (introBox) {
      introBox.style.display = shouldShow ? "flex" : "none";
    }
  };
  
  // Update tap animation visibility
  const updateTapAnimation = () => {
    let tapAnimation = document.getElementById("page1-tap-gif");
    if (!tapAnimation) {
      tapAnimation = document.querySelector('[data-element-name="tap-gif"]');
    }
    if (!tapAnimation) {
      tapAnimation = document.querySelector('[data-element-type="tap-gif"]');
    }
    if (!tapAnimation) {
      tapAnimation = document.querySelector('.tap-gif-container');
    }
    if (tapAnimation) {
      if (shouldShow) {
        tapAnimation.style.display = "flex";
        tapAnimation.style.visibility = "visible";
        tapAnimation.style.opacity = "0.4"; // Restore 40% opacity
        const img = tapAnimation.querySelector('img');
        if (img) {
          img.style.display = "block";
          img.style.visibility = "visible";
        }
      } else {
        tapAnimation.style.display = "none";
        tapAnimation.style.visibility = "hidden";
        tapAnimation.style.opacity = "0";
        const img = tapAnimation.querySelector('img');
        if (img) {
          img.style.display = "none";
          img.style.visibility = "hidden";
        }
      }
    }
  };
  
  // Try immediately
  updateIntroBox();
  updateTapAnimation();
  
  // Retry with delays in case React hasn't rendered yet
  setTimeout(() => {
    updateIntroBox();
    updateTapAnimation();
  }, 50);
  setTimeout(() => {
    updateIntroBox();
    updateTapAnimation();
  }, 150);
  setTimeout(() => {
    updateIntroBox();
    updateTapAnimation();
  }, 300);
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
      // Header Text
      {
        id: "page1-text-header",
        name: "page1-text-header",
        coordinates: [100, 150, 1500, 250],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.header", "In an analog clock, the hands form angles."),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
        },
      },
      // Subheader Text
      {
        id: "page1-text-subheader",
        name: "page1-text-subheader",
        coordinates: [100, 300, 1500, 400],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.subheader", "Let's learn how to find the angle made by the hands of a clock."),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
        },
      },
      // Instruction Text
      {
        id: "page1-text-instruction",
        name: "page1-text-instruction",
        coordinates: [100, 500, 1500, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instruction", "Tap start to “Start” the activity."),
          fontSize: "36gc",
          color: "#FFFFFF",
          textAlign: "center",
        },
      },
      // Start Button
      {
        id: "page1-start-button",
        name: "page1-start-button",
        type: "button",
        coordinates: [650, 650, 950, 750],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start", "Start"),
          fontSize: "36gc",
          textAlign: "center",
          onClick: () => {
            console.log("Start button clicked - navigating to page 2");
            if (typeof navigateToPage === "function") {
              navigateToPage(2, "next");
            } else if (typeof window !== "undefined" && window.navigateToPage) {
              window.navigateToPage(2);
            }
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
    ],

    2: [
      // Main container with orange border
      {
        id: "page2-main-container",
        name: "page2-main-container",
        coordinates: [50, 110, 1550, 800],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          borderRadius: "8gc",
          boxSizing: "border-box",
        },
      },

      // Header - Orange-yellow text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [100, 25, 1500, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "Let's find the angle made by the hands of the clock!"),
          fontSize: "42gc",
          color: "#FFB84D", // Orange-yellow color
          textAlign: "center",
          fontWeight: "bold",
        },
      },

      // Clock component - centered, large (styled like reference image)
      {
        id: "page2-clock",
        name: "page2-analog-clock",
        type: "custom",
        coordinates: [500, 120, 1100, 680],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "380gc",
          time: { hour: 12, minute: 0, second: 0 },
          realTime: false,
          // Hand visibility - no second hand
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - both black like reference image
          hourHandColor: "#222222",
          hourHandLength: "120gc",
          hourHandWidth: "14gc",
          minuteHandColor: "#222222",
          minuteHandLength: "170gc",
          minuteHandWidth: "8gc",
          // Clock face - cream/beige with 3D blue border
          faceColor: "#FFF8E7",
          borderColor: "#2E86DE", // Blue border
          borderWidth: "40gc",
          useFaceGradient: true,
          showFaceShimmer: true,
          use3DBorder: true,
          showTickMarks: true,
          tickMarkColor: "#E74C3C", // Red tick marks
          tickMarkLength: "12gc",
          tickMarkWidth: "3gc",
          // Colorful numbers (12,1,2,3,4,5,6,7,8,9,10,11)
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#27AE60", // 3 - Green
            "#F39C12", // 4 - Orange
            "#17A2B8", // 5 - Teal
            "#3498DB", // 6 - Blue
            "#9B59B6", // 7 - Purple
            "#3498DB", // 8 - Blue
            "#E91E63", // 9 - Pink/Magenta
            "#3498DB", // 10 - Blue
            "#F39C12"  // 11 - Orange
          ],
          numberFontSize: "38gc",
          numberOffset: "50gc",
          useRomanNumerals: false,
          // Center dot - yellow/gold
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          // Features
          showMinuteTicks: false,
          showShadows: true,
          interactive: false,
          // Animation speed
          minuteHandSpeed: 5,
          // Arc visualization props
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },

      // Instruction text at bottom
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [100, 820, 1500, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.instruction", "Look at the angle made by the hands of the clock."),
          fontSize: "36gc",
          color: "white", // Dark blue
          textAlign: "center",
        },
      },
    ],

    // Page 3 - exact replica of page 2
    3: [
      // Main container with orange border
      {
        id: "page3-main-container",
        name: "page3-main-container",
        coordinates: [50, 110, 1550, 800],
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "",
          backgroundColor: "transparent",
          borderWidth: "2gc",
          borderStyle: "solid",
          borderColor: "#FF9900",
          borderRadius: "8gc",
          boxSizing: "border-box",
        },
      },

      // Header - Orange-yellow text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [100, 25, 1500, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "Let's find the angle made by the hands of the clock!"),
          fontSize: "42gc",
          color: "#FFB84D", // Orange-yellow color
          textAlign: "center",
          fontWeight: "bold",
        },
      },

      // Clock component - centered, large (metallic like showcase: dark border, same face styling)
      {
        id: "page3-clock",
        name: "page3-analog-clock",
        type: "custom",
        coordinates: [500, 120, 1100, 680],
        zIndex: 100,
        props: {
          componentType: "ClockComponent",
          clockShape: "circle",
          size: "200gc",
          time: { hour: 12, minute: 0, second: 0 },
          realTime: true,
          showHourHand: true,
          showMinuteHand: true,
          showSecondHand: false,
          // Hand styles - hour red, minute blue, with tails
          hourHandColor: "#E74C3C",
          hourHandLength: "45gc",
          hourHandWidth: "4gc",
          minuteHandColor: "#3498DB",
          minuteHandLength: "85gc",
          minuteHandWidth: "4gc",
          showHandTails: true,
          handTailLength: "20gc",
          // Clock face - white background (clockBg overrides face when set)
          clockBg: "#FFFFFF",
          faceTexture: null,
          faceColor: "#FFFFFF",
          borderColor: "#444",
          borderWidth: "10gc",
          useFaceGradient: false,
          showFaceShimmer: false,
          use3DBorder: true,
          outerRingThickness: "8gc",
          innerRingThickness: "5gc",
          showTickMarks: true,
          tickMarkColor: "black",
          tickMarkLength: "10gc",
          tickMarkWidth: "3gc",
          showMinuteTicks: true,
          minuteTickColor: "#404040",
          // Colorful numbers - each number a different color
          showNumbers: true,
          numberColor: "#333333",
          numberColors: [
            "#E74C3C", // 12 - Red
            "#27AE60", // 1 - Green
            "#17A2B8", // 2 - Teal
            "#9B59B6", // 3 - Purple
            "#F39C12", // 4 - Orange
            "#1ABC9C", // 5 - Turquoise
            "#3498DB", // 6 - Blue
            "#E91E63", // 7 - Pink
            "#2ECC71", // 8 - Emerald
            "#8E44AD", // 9 - Violet
            "#00BCD4", // 10 - Cyan
            "#FF5722"  // 11 - Deep orange
          ],
          numberFontSize: "18gc",
          numberOffset: "25gc",
          useRomanNumerals: false,
          showCenterDot: true,
          centerDotColor: "#F1C40F",
          centerDotSize: "20gc",
          showShadows: true,
          interactive: false,
          minuteHandSpeed: 5,
          arcColor: "#2E86DE",
          arcFillOpacity: 0.35,
          angleMarkerSize: 0.3,
          angleMarkerColor: "#FF9900",
          angleMarkerFillColor: "#FF9900",
          angleMarkerFillOpacity: 0.4,
          labelOffsetX: 0,
          labelOffsetY: 0,
          labelColor: "#000000",
          labelFontSize: "30gc"
        }
      },

      // Instruction text at bottom
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [100, 820, 1500, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.instruction", "Look at the angle made by the hands of the clock."),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
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
    // Reset page1state to "summary" when page 1 is loaded
    if (pageNumber === 1) {
      window.page1state = "summary";
      console.log("📊 Reset page1state to 'summary'");
      // Update visibility when state is reset
      setTimeout(() => {
        if (typeof updatePage1Visibility === 'function') {
          updatePage1Visibility();
        }
      }, 100);
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
    // Initialize page1state - default to "summary"
    if (window.page1state === undefined) {
      window.page1state = "summary";
      console.log("✅ Initialized page1state to 'summary'");
    }
    
    // Expose updatePage1Visibility globally
    window.updatePage1Visibility = updatePage1Visibility;
    
    // Set up periodic check for page 1 visibility (in case state changes externally)
    if (typeof window !== 'undefined') {
      // Check visibility when page changes to page 1
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 1) {
          setTimeout(() => {
            updatePage1Visibility();
          }, 200);
        }
      });
      
      // Also set up an interval to check periodically (as fallback)
      setInterval(() => {
        const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;
        if (currentPage === 1) {
          updatePage1Visibility();
        }
      }, 500); // Check every 500ms
    }

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

    // Listen for page change events and reset states
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
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
    
    // Trigger equal side animation on page 10 when quiz completes
    if (pageNumber === 10) {
      const pagePrefix = 'page10';
      setTimeout(() => {
        const quadElement = document.getElementById(`${pagePrefix}-shape-display`);
        if (quadElement && quadElement.animateOppositeSideEquality) {
          console.log(`🎬 [PageConfig] Triggering opposite side equality animation for page ${pageNumber}`);
          
          // Calculate animation timing
          const duration = 2000; // ms
          const waitTime = 500; // ms
          const cycles = 2;
          const cycleTime = (duration + waitTime) * 2; // translate + wait + translate back + wait
          const totalAnimationTime = cycleTime * cycles;
          
          // Trigger animation for pair 0 (AB and CD)
          quadElement.animateOppositeSideEquality(0);
          
          // After first pair completes, trigger second pair
          setTimeout(() => {
            quadElement.animateOppositeSideEquality(1);
          }, totalAnimationTime + 1000); // Wait for first animation + 1 second
        } else {
          console.warn(`⚠️ [PageConfig] Quadrilateral element or animateOppositeSideEquality method not found for page ${pageNumber}`);
        }
      }, 500); // Small delay to ensure DOM is ready
    }
    
    if (pageNumber === 2 || pageNumber === 3 || pageNumber === 4 || pageNumber === 5 || pageNumber === 6 || pageNumber === 10) {
      const instructionId = `page${pageNumber}-instruction`;
      console.log(`🔍 [PageConfig] Processing instruction text update for page ${pageNumber}, instructionId: ${instructionId}`);
      
      // Determine the new text
      let continueText;
      // All pages (2, 3, 4, 5, and 10) get the generic continue message
        continueText = getI18nText("common.tapToContinue", "Tap » to continue");
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

