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
      // Title - "Build a Square" in orange, centered at top
      {
        id: "page1-title",
        name: "page1-title",
        coordinates: [25, 100, 1575, 200],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page1.title", "Build a Rhombus");
          },
          fontSize: "50gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      
      // First line of text - "A 4-sided polygon is called a quadrilateral."
      {
        id: "page1-text-1",
        name: "page1-text-1",
        coordinates: [200, 300, 1400, 380],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page1.text1", "A 4-sided polygon is called a quadrilateral.");
          },
          fontSize: "36gc",
          color: "#FFFFFF", // White text
          textAlign: "center",
        },
      },
      
      // Second line of text - "Square is a special quadrilateral."
      {
        id: "page1-text-2",
        name: "page1-text-2",
        coordinates: [200, 420, 1400, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page1.text2", "Rhombus is a special quadrilateral.");
          },
          fontSize: "36gc",
          color: "#FFFFFF", // White text
          textAlign: "center",
        },
      },
      
      // Third line of text - "Let's explore what makes a quadrilateral a square."
      {
        id: "page1-text-3",
        name: "page1-text-3",
        coordinates: [200, 540, 1400, 620],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page1.text3", "Let's explore what makes a quadrilateral a rhombus.");
          },
          fontSize: "36gc",
          color: "#FFFFFF", // White text
          textAlign: "center",
        },
      },
      
      // Start button at the bottom center
      {
        id: "page1-start-button",
        name: "page1-start-button",
        type: "button",
        coordinates: [700, 750, 900, 830], // Bottom center
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("pages.page1.startButton", "Start");
          },
          backgroundColor: "#FF9900", // Orange background
          color: "#FFFFFF", // White text
          fontSize: "28gc",
          fontWeight: "bold",
          borderRadius: "8gc",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            
            // Navigate to next page
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },
    ],
    
    2: [
      // Header - Orange text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page2.header", "Move the vertices of the quadrilateral to match the green shape.");
          },
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      
      // Instruction text
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page2.instruction", "Drag the vertices to make the required shape.");
          },
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      
      // Build Mode Example - Shape Type Matching
      {
        id: "page2-build-rectangle",
        name: "build-rectangle",
        type: "custom",
        coordinates: [400, 100, 1200, 600],
        zIndex: 40,
        props: {
          componentType: "QuadrilateralComponent",
          mode: "build", // Enable build mode
          quadType: "IRREGULAR", // Start with an irregular shape
          vertices: [
            { row: 3, col: 2 },
            { row: 2, col: 7 },
            { row: 7, col: 8 },
            { row: 8, col: 2 }
          ],
          gridRows: 10,
          gridCols: 10,
          showGrid: true,
          showDiagonals: false,
          showPropertyPanel: false,
          containerBorder: false,
          containerBorderWidth: "2gc",
          containerBorderColor: "#ffffff",
          containerBorderStyle: "dashed",
          draggable: true,
          edgeColor: "#0066CC",
          edgeThickness: "4gc",
          vertexConfig: {
            color: "#FF9900",
            showLabels: true,
            labels: ["A", "B", "C", "D"],
            labelColor: "#FFFFFF", // White font
            labelSize: "36gc", // 36gc font size
            labelOffset: "40gc" // Increased offset to prevent overlap with larger font
          },
          angleConfig: {
            show: "none",
            showText: false,
          },
          buildConfig: {
            targetType: "shape", // Match shape type
            targetShape: "RHOMBUS", // Target: Make a rhombus
            showTargetWireframe: true,
            wireframeColor: "#00AA00",
            wireframeThickness: "3gc",
            blinkWireframe: true,
            blinkDuration: 1000,
            highlightTargetVertices: true,
            targetVertexColor: "#00AA00",
            targetVertexSize: "10gc",
            tolerance: 0,
            showSuccessMessage: false,
            get successMessage() {
              return getI18nText("pages.page2.successMessage", "Perfect! You created a rhombus!");
            },
            successAnimation: true,
            onTargetAchieved: (data) => {
              console.log("🎯 Target shape achieved!", data);
              
              // Helper function to convert shape name to readable format
              const getReadableShapeName = (shapeName) => {
                if (!shapeName) return getI18nText("shapes.shape", "Shape");
                // Convert "RECTANGLE" -> "Rectangle", "SQUARE" -> "Square", etc.
                const readableName = shapeName.charAt(0) + shapeName.slice(1).toLowerCase();
                // Try to get translated shape name
                const shapeKey = readableName.toLowerCase();
                return getI18nText(`shapes.${shapeKey}`, readableName);
              };
              
              const shapeName = getReadableShapeName(data.targetShape || 'Rhombus');
              
              // Function to update textbox elements with retry mechanism
              const updateTextboxElement = (elementId, newText, retryCount = 0, maxRetries = 30) => {
                // Try multiple ways to find the element
                let element = document.getElementById(elementId);
                
                // Also try finding by data-element-name attribute
                if (!element) {
                  element = document.querySelector(`[data-element-name="${elementId}"]`);
                }
                
                // Also try finding by class name
                if (!element) {
                  element = document.querySelector(`.textbox-element-${elementId}`);
                }
                
                // Try finding by textbox-element class with data-element-name
                if (!element) {
                  element = document.querySelector(`.textbox-element[data-element-name="${elementId}"]`);
                }
                
                // Try finding textbox-container
                if (!element) {
                  element = document.querySelector(`.textbox-container#${elementId}`);
                }
                
                if (element) {
                  // Try to find the actual text content element (textbox components might have nested structure)
                  let textElement = element.querySelector('.textbox-content') || 
                                   element.querySelector('[class*="textbox"]') ||
                                   element;
                  
                  // Check if newText contains HTML tags
                  const containsHTML = typeof newText === 'string' && /<[^>]+>/.test(newText);
                  
                  // If element uses dangerouslySetInnerHTML or newText contains HTML, update innerHTML
                  if (containsHTML || (element.innerHTML && element.innerHTML.includes('<'))) {
                    // Update the innerHTML directly (don't double-wrap if it already contains HTML)
                    if (containsHTML) {
                      element.innerHTML = newText;
                    } else {
                      element.innerHTML = `<span style="display: inline;">${newText}</span>`;
                    }
                    console.log(`✅ [PageConfig] Updated ${elementId} text (HTML) to: ${newText}`);
                    return true;
                  }
                  
                  if (textElement) {
                    // If newText contains HTML, use innerHTML, otherwise use textContent
                    if (containsHTML) {
                      textElement.innerHTML = newText;
                    } else {
                      textElement.textContent = newText;
                      textElement.innerText = newText;
                    }
                    console.log(`✅ [PageConfig] Updated ${elementId} text to: ${newText}`);
                    return true;
                  }
                }
                
                // Retry if element not found
                if (retryCount < maxRetries) {
                  setTimeout(() => {
                    updateTextboxElement(elementId, newText, retryCount + 1, maxRetries);
                  }, 100);
                } else {
                  console.warn(`⚠️ [PageConfig] Element '${elementId}' not found after ${maxRetries} retries. Trying alternative selectors...`);
                  // Last attempt: try querySelector with various patterns
                  const altSelectors = [
                    `[id*="${elementId}"]`,
                    `[data-element-name*="${elementId}"]`,
                    `.textbox-element[data-element-name*="${elementId}"]`,
                    `.textbox-container[id*="${elementId}"]`
                  ];
                  for (const selector of altSelectors) {
                    const altElement = document.querySelector(selector);
                    if (altElement) {
                      altElement.textContent = newText;
                      altElement.innerText = newText;
                      if (altElement.innerHTML !== undefined) {
                        altElement.innerHTML = newText;
                      }
                      console.log(`✅ [PageConfig] Updated ${elementId} using alternative selector: ${selector}`);
                      return true;
                    }
                  }
                }
                return false;
              };
              
              // Update header text with retry (shape name in white)
              const successHeaderTemplate = getI18nText("pages.page2.successHeader", "Good Job! This shape is a {shapeName}!", { shapeName });
              const newHeaderText = successHeaderTemplate.replace(
                shapeName,
                `<span style="color: #FFFFFF;">${shapeName}</span>`
              );
              updateTextboxElement('page2-header', newHeaderText);
              
              // Update instruction text with retry
              const newInstructionText = getI18nText("pages.page2.successInstruction", "Tap » to see what makes this shape a {shapeName}.", { shapeName });
              updateTextboxElement('page2-instruction', newInstructionText);
              
              // Update quadrilateral sides to green with 6gc thickness
              const updateQuadSides = () => {
                const quadId = "page2-build-rectangle";
                
                // Wait for React to finish rendering - use requestAnimationFrame for multiple frames
                const waitForRender = (frameCount = 0, maxFrames = 5) => {
                  requestAnimationFrame(() => {
                    const quadElement = document.getElementById(quadId) || 
                                      document.querySelector(`[data-element-name="build-rectangle"]`);
                    
                    if (!quadElement) {
                      if (frameCount < maxFrames) {
                        waitForRender(frameCount + 1, maxFrames);
                      } else {
                        console.warn(`⚠️ [PageConfig] Quadrilateral element not found after ${maxFrames} frames`);
                      }
                      return;
                    }
                    
                    // Find the sides SVG element (has viewBox="0 0 100 100" and preserveAspectRatio="none")
                    const allSvgs = quadElement.querySelectorAll('svg');
                    let sidesSvg = null;
                    for (const svg of allSvgs) {
                      if (svg.getAttribute('viewBox') === '0 0 100 100' && 
                          svg.getAttribute('preserveAspectRatio') === 'none') {
                        sidesSvg = svg;
                        break;
                      }
                    }
                    // Fallback to first SVG if not found
                    if (!sidesSvg && allSvgs.length > 0) {
                      sidesSvg = allSvgs[0];
                    }
                    
                    if (sidesSvg) {
                      // Find all line elements (the sides)
                      const lines = sidesSvg.querySelectorAll('line');
                      
                      if (lines.length > 0) {
                        // Convert 6gc to pixels
                        let strokeWidthPx = '6gc';
                        if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
                          strokeWidthPx = window.GridCellFontUtils.processGcProperty('6gc', 'strokeWidth');
                        } else if (typeof window !== 'undefined' && window.innerHeight) {
                          // Fallback: approximate conversion (1gc ≈ 1/900 of viewport height)
                          const gcValue = 6;
                          const viewportHeight = window.innerHeight;
                          const pixels = (gcValue / 900) * viewportHeight;
                          strokeWidthPx = `${pixels}px`;
                        }
                        
                        // Update all sides to green with new thickness
                        lines.forEach((line) => {
                          line.setAttribute('stroke', '#00AA00'); // Green color
                          line.setAttribute('stroke-width', strokeWidthPx);
                        });
                        
                        return;
                      } else if (frameCount < maxFrames) {
                        waitForRender(frameCount + 1, maxFrames);
                      }
                    } else if (frameCount < maxFrames) {
                      waitForRender(frameCount + 1, maxFrames);
                    }
                  });
                };
                
                // Start waiting for render
                waitForRender();
              };
              
              // Start updating the sides (wait a bit for React to process the state change first)
              setTimeout(() => {
                updateQuadSides();
              }, 50);
              
              // Dispatch quizCompleted event for quiz detection
              const quadId = "page2-build-rectangle";
              const pageNumber = typeof window !== "undefined" && window.getCurrentPage ? window.getCurrentPage() : 2;
              window.dispatchEvent(new CustomEvent('quizCompleted', {
                detail: {
                  componentId: quadId,
                  componentType: 'QuadrilateralComponent',
                  pageNumber: pageNumber
                }
              }));
              console.log('✅ Dispatched quizCompleted event for page 2 QuadrilateralComponent', { quadId, pageNumber });
            }
          }
        }
      },
      
      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page2-build-coordinates",
      //   name: "build-coordinates",
      //   type: "custom",
      //   coordinates: [750, 50, 1400, 600],
      //   zIndex: 40,
      //   props: {
      //     componentType: "QuadrilateralComponent",
      //     mode: "build", // Enable build mode
      //     quadType: "SQUARE",
      //     vertices: [
      //       { row: 3, col: 3 },
      //       { row: 3, col: 6 },
      //       { row: 6, col: 6 },
      //       { row: 6, col: 3 }
      //     ],
      //     gridRows: 10,
      //     gridCols: 10,
      //     showGrid: true,
      //     showDiagonals: false,
      //     draggable: true,
      //     edgeColor: "#CC6600",
      //     edgeThickness: "4gc",
      //     vertexConfig: {
      //       color: "#FF9900",
      //       showLabels: true,
      //       labels: ["A", "B", "C", "D"],
      //       labelColor: "#000000",
      //       labelSize: "16gc",
      //       labelOffset: "15gc"
      //     },
      //     angleConfig: {
      //       show: "all",
      //       markerColor: "#FF6600",
      //       markerSize: "1gc",
      //       showText: true,
      //       textColor: "#FF6600",
      //       textSize: "12gc"
      //     },
      //     buildConfig: {
      //       targetType: "coordinates", // Match exact coordinates
      //       targetVertices: [
      //         { row: 2, col: 1 },
      //         { row: 2, col: 9 },
      //         { row: 8, col: 9 },
      //         { row: 8, col: 1 }
      //       ],
      //       showTargetWireframe: true,
      //       wireframeColor: "#8800FF",
      //       wireframeThickness: "2gc",
      //       blinkWireframe: false,
      //       highlightTargetVertices: true,
      //       targetVertexColor: "#8800FF",
      //       targetVertexSize: "12gc",
      //       tolerance: 1, // Allow 1 grid cell tolerance
      //       showSuccessMessage: true,
      //       successMessage: "Excellent! You matched the target shape!",
      //       successAnimation: true,
      //       onTargetAchieved: (data) => {
      //         console.log("🎯 Coordinates matched!", data);
      //       }
      //     }
      //   }
      // },
      
      // Instructions Text Box (commented out)
      // {
      //   id: "page2-instruction-1",
      //   name: "page2-instruction-1",
      //   coordinates: [50, 620, 700, 700],
      //   zIndex: 100,
      //   type: "textbox",
      //   props: {
      //     text: "Shape Challenge: Drag the vertices to make a RECTANGLE",
      //     fontSize: "16gc",
      //     color: "#000000",
      //     textAlign: "center",
      //     backgroundColor: "rgba(0, 170, 0, 0.1)",
      //     padding: "10gc"
      //   }
      // },
      
      // Instruction Text Box for second quadrilateral (commented out - second quad is disabled)
      // {
      //   id: "page2-instruction-2",
      //   name: "page2-instruction-2",
      //   coordinates: [750, 620, 1400, 700],
      //   zIndex: 100,
      //   type: "textbox",
      //   props: {
      //     text: "Position Challenge: Match the purple wireframe exactly (±1 grid cell)",
      //     fontSize: "16gc",
      //     color: "#000000",
      //     textAlign: "center",
      //     backgroundColor: "rgba(136, 0, 255, 0.1)",
      //     padding: "10gc"
      //   }
      // },
      
      // Display Controls for second quadrilateral
      // {
      //   id: "page2-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page2-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },
      
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
          imageAlt: "Tap",
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
      
      // {
      //   id: "page2-page-title",
      //   name: "page2-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
    ],
    
    3: [
      // Header - Orange text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page3.header", "Notice the <span style=\"color: white;\">length of each side</span> of the shape");
          },
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      
      // Quadrilateral Component - Same config as page 2 but not in build mode
      {
        id: "page3-quadrilateral-demo",
        name: "quadrilateral-demo",
        type: "custom",
        coordinates: [400, 100, 1200, 600],
        zIndex: 40,
        props: {
          componentType: "QuadrilateralComponent",
          quadType: "RHOMBUS", // Show the target shape (not in build mode)
          vertices: [
            { row: 1, col: 5 },  // Top
            { row: 5, col: 9 },  // Right
            { row: 9, col: 5 },  // Bottom
            { row: 5, col: 1 }   // Left (rhombus/diamond)
          ],
          gridRows: 10,
          gridCols: 10,
          showGrid: true,
          showDiagonals: false,
          showPropertyPanel: false,
          containerBorder: false,
          containerBorderWidth: "2gc",
          containerBorderColor: "#ffffff",
          containerBorderStyle: "dashed",
          draggable: false,  // Hotspots not draggable on page 3
          showVertices: false,  // Hide vertex hotspots on page 3
          edgeColor: "#0066CC",
          edgeThickness: "4gc",
          vertexConfig: {
            color: "#FF9900",
            showLabels: true,
            labels: ["A", "B", "C", "D"],
            labelColor: "#FFFFFF", // White font
            labelSize: "36gc", // 36gc font size
            labelOffset: "40gc" // Increased offset to prevent overlap with larger font
          },
          angleConfig: {
            show: "none",
            showText: false,
          },
          
          // ============ ALL 4 SIDE EQUALITY ANIMATION CONFIG ============
          allSideEqualityAnimationConfig: {
            messageConfig: {
              // Position configuration (null = auto-center on quadrilateral)
              position: {
                left: null,        // null = auto-center horizontally
                top: null,         // null = auto-center vertically
                offsetX: 0,        // Horizontal offset from center (%)
                offsetY: -5       // Vertical offset from center (%)
              },
              
              // Border configuration
              border: {
                width: "3px",
                style: "solid",
                color: "rgba(255, 255, 255, 0.6)",
                radius: "10px"
              },
              
              // Font configuration
              font: {
                size: "18gc",
                weight: "bold",
                family: "Arial, sans-serif",
                color: "#FFFFFF"
              },
              
              // Background configuration (defaults to green for equality, red for inequality)
              background: {
                color: null,      // null = use default based on equality state
                opacity: null     // null = use color's alpha channel
              },
              
              // Additional styling
              padding: "10px 20px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)"
            },
            
            // Stroke indicators configuration
            strokeConfig: {
              show: true,          // Show stroke indicators on equal sides
              blink: true,         // Blink animation for strokes
              color: "#FF6600"     // Color of stroke indicators (default: orange)
            },
            
            // Message visibility configuration
            showMessage: false      // Do NOT show equality message like "AB = BC = CD = DA" on page 3
          },
          
           // ============ CONFIRM RIGHT ANGLE ANIMATION ============
           // Animation that uses a protractor to measure and confirm 90-degree angles
           confirmRightAngleAnimationConfig: {
             protractorId: "page3-protractor",  // ID of the protractor element to use
             hideProtractorAfter: false,  // Whether to hide protractor after animation completes
             autoStart: false,  // Auto-start confirmAllAnglesRight animation on page load
             autoStartDelay: 2000,  // Delay in milliseconds before starting (default: 1000)
             autoStartMode: "auto",  // Animation mode: 'auto' or 'manual' (default: 'auto')
             autoStartDelayBetween: 500,  // Delay between each vertex animation in milliseconds (default: 500)
             messageConfig: {
               // Message position and styling
               position: {
                 offsetX: 0,      // Horizontal offset in percentage (0 = centered)
                 offsetY: -10,    // Vertical offset in percentage (-10 = 10% above)
               },
               // Disable message overlay by setting message to false
               message: false,  // Set to false to hide the "∠D = 90°" message overlay
             },
            rightAngleMarkerConfig: {
              // Configuration for the right angle marker (square symbol)
              color: "#00AA00",  // Color of the right angle marker
              size: "2gc",       // Size of the marker
              strokeWidth: "0.5gc"  // Stroke width of the marker
            }
          },
          
          // ============ ANIMATION SEQUENCE ============
          // Automatically demonstrate square properties in sequence
          animationSequence: {
            enabled: true,  // Enable animation sequence
            delayFromLoad: 2000,  // Wait 2 seconds after page load
            textTargetId: null,  // Do not auto-update instruction text; quiz completion will handle it
            headerTargetId: "page3-header",  // Update header text
            triggerManually: false,  // Auto-start after delay
            onSequenceComplete: () => {
              console.log("✅ All square properties demonstrated!");
            },
            onStepComplete: (stepIndex, step) => {
              console.log(`📌 Step ${stepIndex + 1} complete: ${step.propertyTitle}`);
            },
            steps: [
              {
                propertyTitle: getI18nText("pages.page3.propertyAllSidesEqual", "all sides equal"),
                propertyText: getI18nText(
                  "pages.page3.properties.lengthEachSide",
                  "length of each side"
                ),
                animationCall: "animateAllSideEquality",
                animationArgs: [1],  // Animation decides its own duration; sequence waits for completion
                stopMethod: "stopAllSideEqualityAnimation",  // Explicit stop method name
                delayAfter: 1500     // 1.5 second pause before next
              }
            ]
          }
        }
      },
      
      // Protractor for confirmRightAngle animation on page 3
      // This protractor is used by the confirmRightAngle animation to measure angles
      {
        id: "page3-protractor",
        name: "protractor",
        type: "custom",
        coordinates: [200, 200, 200, 200], // Initial position (will be moved by animation)
        zIndex: 5000,
        props: {
          componentType: "ProtractorComponent",
          centerPoint: { row: 5, col: 5 }, // Initial center position
          protractorType: "semicircular",
          radius: "100gc",
          color: "#2C3E50",
          backgroundColor: "rgba(200, 220, 255, 0.3)",
          showDegreeMarks: true,
          showDegreeLabels: true,
          degreeInterval: 10,
          labelInterval: 30,
          mode: "static", // Static mode - animation will control movement
          showArm: true,
          armAngle: 0,
          armColor: "#C0392B",
          snapToDegrees: 1,
          style: {
            display: "none" // Hidden by default, will be shown by animation
          }
        }
      },
      
      // Optimized Next button - Three Layer Structure
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
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      // Tap GIF Image
      {
        id: "page3-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890], // Position in top-right area
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: "Tap",
        },
      },

      // Previous button - Three Layer Structure
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

            // Navigate to previous page using navigation config
            const nav = pageNavigation[3];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
      // Replay Visualisation button - above instruction text
      {
        id: "page3-replay-button",
        name: "page3-replay-button",
        coordinates: [575, 650, 975, 725], // Above instruction text
        zIndex: "var(--z-button)",
        type: "button",
        props: {
          get text() {
            return getI18nText("pages.page3.replayButton", "Replay Visualisation");
          },
          fontSize: "30gc", // Match Next button visual scale
          color: "white",
          backgroundColor: "#FF9900",
          borderRadius: "15gc",
          fontWeight: "bold",
          onClick: () => {
            console.log("🔁 [ReplayButton] Clicked replay visualisation");
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("click");
            }
            
            // Prefer using the QuadrilateralComponent's own replay hook if available
            if (typeof window !== "undefined") {
              const quadId = "page3-quadrilateral-demo";
              const quadRegistry = window.quadrilateralAnimations && window.quadrilateralAnimations[quadId];
              
              if (quadRegistry && typeof quadRegistry.startAnimationSequence === "function") {
                console.log("🔁 [ReplayButton] Using quadRegistry.startAnimationSequence() for", quadId);
                quadRegistry.startAnimationSequence();
                return;
              }
              
              console.log("🔁 [ReplayButton] startAnimationSequence not available, falling back to page reload logic", {
                hasQuadRegistry: !!quadRegistry,
                hasStartAnimationSequence: !!(quadRegistry && quadRegistry.startAnimationSequence)
              });
              
              // Reset the page and replay everything from a clean state by
              // re-navigating to the current page via the app's navigation system.
              console.log("🔁 [ReplayButton] Window object available:", {
                hasGetCurrentPage: typeof window.getCurrentPage === "function",
                hasChangePageAndNotify: typeof window.changePageAndNotify === "function",
                hasNavigateToPage: typeof window.navigateToPage === "function"
              });
              
              const getCurrentPage = window.getCurrentPage;
              const currentPage = typeof getCurrentPage === "function" ? getCurrentPage() : 3;
              console.log("🔁 [ReplayButton] Current page detected:", currentPage);
              
              if (window.changePageAndNotify) {
                console.log("🔁 [ReplayButton] Using changePageAndNotify to reload current page");
                window.changePageAndNotify(currentPage);
              } else if (window.navigateToPage) {
                console.log("🔁 [ReplayButton] Using navigateToPage to reload current page");
                window.navigateToPage(currentPage, "next");
              } else if (window.location && window.location.reload) {
                console.log("🔁 [ReplayButton] Using window.location.reload() as fallback");
                // Fallback: full reload if navigation helper is not available
                window.location.reload();
              } else {
                console.warn("⚠️ [ReplayButton] No navigation helper available; replay cannot proceed");
              }
            }
          },
        },
      },
      
      {
        id: "page3-instruction-text",
        name: "page3-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      
      // Text Box 1 - White border, black bg 30% opacity, white font, 30gc font size
      {
        id: "page3-textbox-1",
        name: "page3-textbox-1",
        coordinates: [1200, 100, 1550, 800],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          color: "white",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          border: "2px solid white",
          borderRadius: "8px",
          padding: "20px",
          display: "none", // Hidden
          alignItems: "center",
          justifyContent: "center",
        },
      },
      
      // Text Box 2 - White border, black bg 30% opacity, white font, 30gc font size
      {
        id: "page3-textbox-2",
        name: "page3-textbox-2",
        coordinates: [575, 550, 975, 675],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: "",
          fontSize: "30gc",
          color: "white",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          border: "2px solid white",
          borderRadius: "8px",
          padding: "20px",
          display: "none", // Hidden
        },
      },
    ],
    
    4: [
      // Header - "Rhombus" in orange
      {
        id: "page4-header",
        name: "page4-header",
        coordinates: [25, 20, 1575, 100],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page4.header", "Rhombus");
          },
          fontSize: "60gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      
      // Rhombus diagram on the left
      {
        id: "page4-quadrilateral",
        name: "page4-quadrilateral",
        type: "custom",
        coordinates: [100, 150, 750, 700], // Left side
        zIndex: 40,
        props: {
          componentType: "QuadrilateralComponent",
          quadType: "RHOMBUS",
          vertices: [
            { row: 1, col: 5 },  // Top
            { row: 5, col: 9 },  // Right
            { row: 9, col: 5 },  // Bottom
            { row: 5, col: 1 }   // Left (rhombus/diamond)
          ],
          gridRows: 10,
          gridCols: 10,
          showGrid: false,
          showDiagonals: false,
          showPropertyPanel: false,
          containerBorder: false,
          draggable: false,
          showVertices: false,  // Hide vertex hotspots
          edgeColor: "#FFFFFF",  // White outline
          edgeThickness: "4gc",
          vertexConfig: {
            color: "#FF9900",
            showLabels: false,  // Hide vertex labels
          },
          angleConfig: {
            show: "none",   // No angle markers or labels on page 4
            showText: false,
          },
          // Show permanent equal side strokes
          allSideEqualityAnimationConfig: {
            strokeConfig: {
              show: true,
              blink: false,
              color: "#FFFFFF",  // White stroke markers
              initFromVerticesOnMount: true // For static page 4, show strokes immediately
            },
            showMessage: false  // Hide equality message
          },
          // Page 4: show a single right-angle marker + "90°" label at one corner (vertex B, index 1)
          initialAngleDisplay: {
            showArcs: true,
            showText: true,
            // Show 90° labels at all four corners (vertices A, B, C, D)
            vertexIndices: [0, 1, 2, 3]
          }
        },
      },
      
      // Definition Text on the right
      {
        id: "page4-definition-text",
        name: "page4-definition-text",
        coordinates: [700, 300, 1400, 550], // Right side, vertically centered
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          get text() {
            return getI18nText("pages.page4.definition", "A Rhombus is a special quadrilateral with all 4 sides of equal length!");
          },
          fontSize: "40gc",
          color: "#FFFFFF", // White text
          textAlign: "left",
          lineHeight: "1.5",
        },
      },
      
      // Start Over button at the bottom center
      {
        id: "page4-start-over-button",
        name: "page4-start-over-button",
        type: "button",
        coordinates: [700, 700, 900, 800], // Bottom center
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.startOver", "Start Over");
          },
          backgroundColor: "#FF9900", // Orange background
          color: "#FFFFFF", // White text
          fontSize: "32gc",
          borderRadius: "8gc",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("click");
            }
            
            // Navigate to page 1
            navigateToPage(1, "startOver");
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
