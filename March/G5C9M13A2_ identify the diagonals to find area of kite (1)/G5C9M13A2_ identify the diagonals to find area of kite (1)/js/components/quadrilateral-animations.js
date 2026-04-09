/**
 * Quadrilateral Animation Utilities
 * 
 * General-purpose animation utilities for quadrilateral components.
 * These functions can be used by any page, not specific to page 3 or page 4.
 * 
 * Functions:
 * - updateQuadSides: Update side colors and blinking state
 * - triggerParallelAnimation: Trigger parallel lines animation
 * - addParallelArrows: Add chevron symbols to indicate parallel sides
 * - showAllAngleMarkers: Show all angle markers with specified color, fill, and blink
 */

/**
 * Update quadrilateral side colors and blink by directly manipulating SVG elements
 * @param {string} quadComponentId - ID of the quadrilateral component
 * @param {string} side1Color - Color for first side
 * @param {string} side2Color - Color for second side
 * @param {boolean} side1Blink - Whether first side should blink
 * @param {boolean} side2Blink - Whether second side should blink
 * @param {number} side1Index - Index of first side (0=AB, 1=BC, 2=CD, 3=DA)
 * @param {number} side2Index - Index of second side (0=AB, 1=BC, 2=CD, 3=DA)
 */
const updateQuadSides = (quadComponentId, side1Color, side2Color, side1Blink, side2Blink, side1Index = 0, side2Index = 2) => {
  if (typeof document === 'undefined') {
    console.warn('Document not available');
    return;
  }

  const quadElement = document.getElementById(quadComponentId);
  if (!quadElement) {
    console.warn(`Quadrilateral element ${quadComponentId} not found`);
    return;
  }

  // Find the SVG element containing the sides
  const svgElement = quadElement.querySelector('svg');
  if (!svgElement) {
    console.warn('SVG element not found in quadrilateral');
    return;
  }

  // Find the specified sides
  // Side indices: 0=AB, 1=BC, 2=CD, 3=DA
  // React doesn't set key as attribute, so we find by index in the line elements
  const allLines = Array.from(svgElement.querySelectorAll('line'));
  // Filter out fill polygon if present (it comes first sometimes)
  const sideLines = allLines.filter(line => line.getAttribute('stroke') !== 'none' && line.getAttribute('fill') === null);
  const side1 = sideLines[side1Index];
  const side2 = sideLines[side2Index];

  if (side1) {
    side1.setAttribute('stroke', side1Color || '#00FF00');
    if (side1Blink) {
      side1.classList.add('quad-edge-blink');
    } else {
      side1.classList.remove('quad-edge-blink');
    }
  }

  if (side2) {
    side2.setAttribute('stroke', side2Color || '#00FF00');
    if (side2Blink) {
      side2.classList.add('quad-edge-blink');
    } else {
      side2.classList.remove('quad-edge-blink');
    }
  }
};

/**
 * Trigger parallel lines animation with callback
 * @param {string} quadComponentId - ID of the quadrilateral component
 * @param {number} pairIndex - Pair index (0 = AB and CD, 1 = BC and DA)
 * @param {Function} onComplete - Callback function when animation completes
 */
const triggerParallelAnimation = (quadComponentId, pairIndex, onComplete) => {
  if (typeof document === 'undefined') {
    console.warn('Document not available');
    return;
  }

  const quadElement = document.getElementById(quadComponentId);
  if (!quadElement) {
    console.warn(`Quadrilateral element ${quadComponentId} not found`);
    return;
  }

  // For a parallelogram:
  // pairIndex 0 = AB (side 0) and CD (side 2)
  // pairIndex 1 = BC (side 1) and DA (side 3)
  // Pass onComplete callback to be called when animation finishes
  if (quadElement.animateParallelLines) {
    quadElement.animateParallelLines(pairIndex, onComplete);
  } else if (window.quadrilateralAnimations && window.quadrilateralAnimations[quadComponentId]) {
    window.quadrilateralAnimations[quadComponentId].animateParallelLines(pairIndex, onComplete);
  } else {
    console.log('Attempting to trigger parallel lines animation via fallback method');
  }
};

/**
 * Add arrow symbols to indicate parallel sides
 * @param {string} quadComponentId - ID of the quadrilateral component
 * @param {number} side1Index - Index of first side (0=AB, 1=BC, 2=CD, 3=DA)
 * @param {number} side2Index - Index of second side (0=AB, 1=BC, 2=CD, 3=DA)
 * @param {string} pairName - Name for the pair (used for data attribute)
 * @param {string} arrowColor - Color for the chevrons (default: '#FF6600')
 * @param {boolean} doubleChevron - If true, draw double chevron
 */
const addParallelArrows = (quadComponentId, side1Index = 0, side2Index = 2, pairName = 'AB-CD', arrowColor = '#FF6600', doubleChevron = false) => {
  if (typeof document === 'undefined') {
    console.warn('Document not available');
    return;
  }

  console.log(`🎯 addParallelArrows called for pair ${pairName} (sides ${side1Index} and ${side2Index})`);
  
  // Find the quad element by ID or data attribute
  let quadElement = document.getElementById(quadComponentId);
  if (!quadElement) {
    // Try to find by data-component-id
    quadElement = document.querySelector(`[data-component-id="${quadComponentId}"]`);
  }
  if (!quadElement) {
    // Try to find by data-element-name
    quadElement = document.querySelector(`[data-element-name="${quadComponentId}"]`);
  }
  if (!quadElement) {
    console.warn(`❌ Quadrilateral element ${quadComponentId} not found`);
    return;
  }
  
  console.log('✅ Found quad element:', quadElement);

  // Find all SVG elements and look for the one with sides (lines)
  const allSvgs = quadElement.querySelectorAll('svg');
  console.log(`Found ${allSvgs.length} SVG elements`);
  
  let sidesSvg = null;
  let sideLines = [];
  
  for (const svg of allSvgs) {
    const lines = Array.from(svg.querySelectorAll('line'));
    const validLines = lines.filter(line => {
      const stroke = line.getAttribute('stroke');
      return stroke && stroke !== 'none';
    });
    if (validLines.length >= 4) {
      sidesSvg = svg;
      sideLines = validLines;
      break;
    }
  }
  
  if (!sidesSvg || sideLines.length < 4) {
    console.warn('❌ Could not find sides SVG with 4 lines');
    return;
  }
  
  console.log(`✅ Found sides SVG with ${sideLines.length} lines`);

  // Check if arrows for this pair already exist in the sides SVG
  const existingSymbolsGroup = sidesSvg.querySelector(`[data-symbols="parallel-arrows-${pairName}"]`);
  if (existingSymbolsGroup) {
    console.log(`Arrows for ${pairName} already exist, skipping`);
    return;
  }

  const side1 = sideLines[side1Index];
  const side2 = sideLines[side2Index];

  // Helper to get line midpoint and direction
  const getLineInfo = (line) => {
    const x1 = parseFloat(line.getAttribute('x1'));
    const y1 = parseFloat(line.getAttribute('y1'));
    const x2 = parseFloat(line.getAttribute('x2'));
    const y2 = parseFloat(line.getAttribute('y2'));
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    console.log(`Line: (${x1},${y1}) to (${x2},${y2}), midpoint: (${x1 + dx * 0.5}, ${y1 + dy * 0.5})`);
    return {
      midX: x1 + dx * 0.5,
      midY: y1 + dy * 0.5,
      unitX: dx / length,
      unitY: dy / length
    };
  };

  const side1Info = getLineInfo(side1);
  const side2Info = getLineInfo(side2);

  // Create arrow symbols (chevrons) - standard geometry notation for parallel lines
  const arrowSize = 3; // ViewBox units
  const strokeWidth = 0.5;

  // Create chevron path (> shape pointing along the line direction)
  const createChevronPath = (x, y, unitX, unitY, offset = 0) => {
    const perpX = -unitY;
    const perpY = unitX;
    // Chevron points: left wing -> tip -> right wing (open V shape)
    // offset allows for double chevron (second chevron slightly offset)
    const tipX = x + unitX * arrowSize * 0.4 + unitX * offset;
    const tipY = y + unitY * arrowSize * 0.4 + unitY * offset;
    const leftX = x - unitX * arrowSize * 0.2 + perpX * arrowSize * 0.3 + unitX * offset;
    const leftY = y - unitY * arrowSize * 0.2 + perpY * arrowSize * 0.3 + unitY * offset;
    const rightX = x - unitX * arrowSize * 0.2 - perpX * arrowSize * 0.3 + unitX * offset;
    const rightY = y - unitY * arrowSize * 0.2 - perpY * arrowSize * 0.3 + unitY * offset;
    return `M ${leftX} ${leftY} L ${tipX} ${tipY} L ${rightX} ${rightY}`;
  };

  // Add arrows directly to the sides SVG so they move with the quadrilateral
  const svgNS = 'http://www.w3.org/2000/svg';
  
  // Create a group for these arrows
  const arrowsGroup = document.createElementNS(svgNS, 'g');
  arrowsGroup.setAttribute('data-symbols', `parallel-arrows-${pairName}`);
  arrowsGroup.setAttribute('data-pair', pairName);

  // Arrow symbol for first side
  if (doubleChevron) {
    // Double chevron: two chevrons side by side with clear spacing
    const spacing = arrowSize * 0.6; // Increased spacing between chevrons
    const offset1 = -spacing * 0.5; // First chevron to the left
    const offset2 = spacing * 0.5; // Second chevron to the right
    
    const arrow1a = document.createElementNS(svgNS, 'path');
    arrow1a.setAttribute('d', createChevronPath(side1Info.midX, side1Info.midY, side1Info.unitX, side1Info.unitY, offset1));
    arrow1a.setAttribute('fill', 'none');
    arrow1a.setAttribute('stroke', arrowColor);
    arrow1a.setAttribute('stroke-width', strokeWidth);
    arrow1a.setAttribute('stroke-linecap', 'round');
    arrow1a.setAttribute('stroke-linejoin', 'round');
    arrowsGroup.appendChild(arrow1a);
    
    const arrow1b = document.createElementNS(svgNS, 'path');
    arrow1b.setAttribute('d', createChevronPath(side1Info.midX, side1Info.midY, side1Info.unitX, side1Info.unitY, offset2));
    arrow1b.setAttribute('fill', 'none');
    arrow1b.setAttribute('stroke', arrowColor);
    arrow1b.setAttribute('stroke-width', strokeWidth);
    arrow1b.setAttribute('stroke-linecap', 'round');
    arrow1b.setAttribute('stroke-linejoin', 'round');
    arrowsGroup.appendChild(arrow1b);
  } else {
    // Single chevron
    const arrow1 = document.createElementNS(svgNS, 'path');
    arrow1.setAttribute('d', createChevronPath(side1Info.midX, side1Info.midY, side1Info.unitX, side1Info.unitY));
    arrow1.setAttribute('fill', 'none');
    arrow1.setAttribute('stroke', arrowColor);
    arrow1.setAttribute('stroke-width', strokeWidth);
    arrow1.setAttribute('stroke-linecap', 'round');
    arrow1.setAttribute('stroke-linejoin', 'round');
    arrowsGroup.appendChild(arrow1);
  }

  // Arrow symbol for second side
  if (doubleChevron) {
    // Double chevron: two chevrons side by side with clear spacing
    const spacing = arrowSize * 0.6; // Increased spacing between chevrons
    const offset1 = -spacing * 0.5; // First chevron to the left
    const offset2 = spacing * 0.5; // Second chevron to the right
    
    const arrow2a = document.createElementNS(svgNS, 'path');
    arrow2a.setAttribute('d', createChevronPath(side2Info.midX, side2Info.midY, side2Info.unitX, side2Info.unitY, offset1));
    arrow2a.setAttribute('fill', 'none');
    arrow2a.setAttribute('stroke', arrowColor);
    arrow2a.setAttribute('stroke-width', strokeWidth);
    arrow2a.setAttribute('stroke-linecap', 'round');
    arrow2a.setAttribute('stroke-linejoin', 'round');
    arrowsGroup.appendChild(arrow2a);
    
    const arrow2b = document.createElementNS(svgNS, 'path');
    arrow2b.setAttribute('d', createChevronPath(side2Info.midX, side2Info.midY, side2Info.unitX, side2Info.unitY, offset2));
    arrow2b.setAttribute('fill', 'none');
    arrow2b.setAttribute('stroke', arrowColor);
    arrow2b.setAttribute('stroke-width', strokeWidth);
    arrow2b.setAttribute('stroke-linecap', 'round');
    arrow2b.setAttribute('stroke-linejoin', 'round');
    arrowsGroup.appendChild(arrow2b);
  } else {
    // Single chevron
    const arrow2 = document.createElementNS(svgNS, 'path');
    arrow2.setAttribute('d', createChevronPath(side2Info.midX, side2Info.midY, side2Info.unitX, side2Info.unitY));
    arrow2.setAttribute('fill', 'none');
    arrow2.setAttribute('stroke', arrowColor);
    arrow2.setAttribute('stroke-width', strokeWidth);
    arrow2.setAttribute('stroke-linecap', 'round');
    arrow2.setAttribute('stroke-linejoin', 'round');
    arrowsGroup.appendChild(arrow2);
  }

  // Append arrows group to the sides SVG (not as a separate absolute positioned element)
  // This ensures arrows move with the quadrilateral during animations
  sidesSvg.appendChild(arrowsGroup);
  
  console.log(`✅ Added parallel arrow symbols (${doubleChevron ? 'double ' : ''}chevrons) for pair ${pairName} with color ${arrowColor}`);
};

/**
 * Show all angle markers with specified color, fill, and blink
 * @param {string} quadComponentId - ID of the quadrilateral component
 * @param {string} color - Color for angle markers (default: '#FF6600' orange)
 * @param {boolean} fill - Whether to fill the arcs (default: true)
 * @param {boolean} blink - Whether to make the fills blink (default: true)
 */
const showAllAngleMarkers = (quadComponentId, color = '#FF6600', fill = true, blink = true) => {
  if (typeof document === 'undefined') {
    console.warn('Document not available');
    return;
  }

  // Ensure CSS animation is defined for angle-arc-blink
  if (!document.getElementById('angle-arc-blink-keyframes')) {
    const style = document.createElement('style');
    style.id = 'angle-arc-blink-keyframes';
    style.textContent = `
      @keyframes angleEqualityBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .angle-arc-blink {
        animation: angleEqualityBlink 1s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }

  const quadElement = document.getElementById(quadComponentId);
  if (!quadElement) {
    console.warn(`Quadrilateral element ${quadComponentId} not found`);
    return;
  }

  // Find all angle marker components (they have class 'angle-marker-component')
  // Try multiple strategies to find them with retry logic
  let angleMarkers = quadElement.querySelectorAll('.angle-marker-component');
  
  // If not found, try searching within the component's rendered content
  if (angleMarkers.length === 0) {
    // Look for angle markers in any child elements
    const allChildren = quadElement.querySelectorAll('*');
    angleMarkers = Array.from(allChildren).filter(el => 
      el.classList.contains('angle-marker-component') || 
      el.getAttribute('data-angle') !== null
    );
  }
  
  // If still not found, wait a bit and retry (React might still be rendering)
  if (angleMarkers.length === 0) {
    console.log(`Angle markers not found immediately, retrying after 200ms...`);
    setTimeout(() => {
      angleMarkers = quadElement.querySelectorAll('.angle-marker-component');
      if (angleMarkers.length === 0) {
        console.warn(`No angle markers found in quadrilateral ${quadComponentId} after retry. Make sure angleConfig.show is set to 'all' or 'arc' and angle markers are enabled.`);
        return;
      }
      // Recursively call with found markers
      updateAngleMarkersInternal(Array.from(angleMarkers), color, fill, blink);
    }, 200);
    return;
  }

  console.log(`Found ${angleMarkers.length} angle markers in quadrilateral ${quadComponentId}`);
  
  // Update angle markers
  updateAngleMarkersInternal(Array.from(angleMarkers), color, fill, blink);
};

// Internal helper function to update angle markers (extracted for retry logic)
const updateAngleMarkersInternal = (angleMarkers, color, fill, blink) => {
  // For each angle marker, find the fill paths and update them
  angleMarkers.forEach((marker, index) => {
    // Find all fill paths in this marker (paths with fill attribute that is not 'none')
    const allPaths = marker.querySelectorAll('path');
    const fillPaths = Array.from(allPaths).filter(path => {
      const fillAttr = path.getAttribute('fill');
      return fillAttr && fillAttr !== 'none';
    });
    
    // If no fill paths exist, we need to create them or update the stroke paths
    // First, try to find existing fill paths
    if (fillPaths.length === 0) {
      // Look for stroke paths that we can convert to fills
      const strokePaths = marker.querySelectorAll('path[stroke]');
      strokePaths.forEach((strokePath) => {
        // Get the path data to create a fill path
        const pathData = strokePath.getAttribute('d');
        if (pathData) {
          // Try to create a closed fill path from the arc path
          // For arcs, we need to close the path to create a fill
          // The path data should be an arc, we'll close it by adding 'Z' and prepending 'M 0 0 L'
          const closedPathData = `M 0 0 L ${pathData} Z`;
          
          // Check if a fill path already exists with this data
          const existingFill = Array.from(marker.querySelectorAll('path')).find(p => 
            p.getAttribute('d') === closedPathData
          );
          
          if (!existingFill && fill) {
            // Create a new fill path
            const svg = strokePath.closest('svg');
            if (svg) {
              const fillPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              fillPath.setAttribute('d', closedPathData);
              fillPath.setAttribute('fill', color);
              fillPath.setAttribute('fill-opacity', '0.3');
              fillPath.setAttribute('stroke', 'none');
              if (blink) {
                fillPath.classList.add('angle-arc-blink');
              }
              // Insert before the stroke path
              svg.insertBefore(fillPath, strokePath);
              fillPaths.push(fillPath);
            }
          }
        }
      });
    }
    
    // Update existing fill paths
    fillPaths.forEach((path) => {
      // Update fill color
      if (fill) {
        path.setAttribute('fill', color);
        // Set fill opacity if not already set
        if (!path.getAttribute('fill-opacity')) {
          path.setAttribute('fill-opacity', '0.3');
        }
      } else {
        path.setAttribute('fill', 'none');
      }
      
      // Add/remove blink class
      if (blink && fill) {
        path.classList.add('angle-arc-blink');
      } else {
        path.classList.remove('angle-arc-blink');
      }
    });

    // Also update stroke color for arc paths
    const arcPaths = marker.querySelectorAll('path[stroke]');
    arcPaths.forEach((path) => {
      path.setAttribute('stroke', color);
    });
  });

  console.log(`✅ Updated ${angleMarkers.length} angle markers with color ${color}, fill: ${fill}, blink: ${blink}`);
};

// Export functions to window for global access
if (typeof window !== 'undefined') {
  window.QuadrilateralAnimations = {
    updateQuadSides,
    triggerParallelAnimation,
    addParallelArrows,
    showAllAngleMarkers
  };
  console.log('✅ QuadrilateralAnimations utilities loaded and exported to window.QuadrilateralAnimations');
}

