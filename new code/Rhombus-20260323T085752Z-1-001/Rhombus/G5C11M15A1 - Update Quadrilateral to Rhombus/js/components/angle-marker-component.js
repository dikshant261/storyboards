/**
 * Angle Marker Component
 * 
 * Renders angle markers at quadrilateral vertices.
 * Supports arcs, right-angle squares, and angle measurements.
 */

/**
 * AngleMarker Component
 * @param {Object} props - Component props
 * @param {Object} props.vertex - The vertex position {row, col}
 * @param {Object} props.prevVertex - Previous vertex {row, col}
 * @param {Object} props.nextVertex - Next vertex {row, col}
 * @param {number} props.angle - Angle in degrees (calculated)
 * @param {Array<number>} props.containerCoordinates - Container [x1, y1, x2, y2]
 * @param {number} props.gridRows - Number of grid rows
 * @param {number} props.gridCols - Number of grid columns
 * @param {string|number} props.gridPadding - Padding around the grid in gc units (default: 0)
 * @param {string} props.markerType - Type: 'none', 'arc', 'measurement', 'rightAngle', 'all'
 * @param {string} props.color - Marker color (default: '#FF6600')
 * @param {number|string} props.size - Size of the marker in grid units or gc (default: 1)
 * @param {number} props.zIndex - Z-index for layering
 * @param {boolean} props.showText - Show angle measurement text (default: true when markerType includes 'measurement' or 'all')
 * @param {string} props.textColor - Color for angle text (default: same as color)
 * @param {number|string} props.textSize - Font size for angle text in gc units (default: '12gc')
 * @param {string} props.textFont - Font family for angle text (default: 'Arial, sans-serif')
 * @param {number|string} props.textOffset - Offset of text from vertex in gc units (default: '35gc')
 * @param {string} [props.labelBackgroundColor] - Background color for angle labels (default: semi-transparent white)
 * @param {string} [props.labelBorderColor] - Border color for angle labels (default: same as marker color)
 * @param {string|number} [props.labelBorderWidth] - Border width for angle labels (default: '1px', set to 0 or '0' for none)
 * @param {string} [props.labelPadding] - Padding for angle labels (default: '2px 6px')
 */
const AngleMarkerComponent = React.memo((props) => {
  const {
    vertex,
    prevVertex,
    nextVertex,
    angle,
    containerCoordinates,
    gridRows = 10,
    gridCols = 10,
    gridPadding = 0,
    position: providedPosition, // Pre-calculated position (optional, matches vertex positioning)
    markerType = 'arc',
    color = '#FF6600',
    size = 1,
    zIndex = 100,
    showText,
    textColor,
    textSize = '12gc',
    textFont = 'Arial, sans-serif',
    textOffset = '35gc',
    textMode = 'both', // 'name', 'measure', or 'both'
    labelBackgroundColor,
    labelBorderColor,
    labelBorderWidth,
    labelPadding,
    // Per-angle configurations
    interiorAngleConfig,
    supplementaryAngle1Config,
    supplementaryAngle2Config,
    supplementaryAngle3Config,
    // Protractor spawn callback
    onArcClick
  } = props;

  // Calculate angle if not provided
  const calculatedAngle = React.useMemo(() => {
    if (angle !== undefined) return angle;
    
    if (!vertex || !prevVertex || !nextVertex) return null;
    
    // Vectors from vertex to adjacent vertices
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    // Calculate angle using dot product
    const dot = vec1.x * vec2.x + vec1.y * vec2.y;
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    if (mag1 === 0 || mag2 === 0) return null;
    
    const cosAngle = dot / (mag1 * mag2);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    return angleRad * (180 / Math.PI);
  }, [angle, vertex, prevVertex, nextVertex]);

  // Parse gridPadding value (supports gc units or raw numbers)
  const paddingGc = React.useMemo(() => {
    if (typeof gridPadding === 'string' && gridPadding.endsWith('gc')) {
      return parseFloat(gridPadding) || 0;
    }
    return typeof gridPadding === 'number' ? gridPadding : 0;
  }, [gridPadding]);

  // Calculate position in page coordinates
  // Use provided position if available (matches vertex positioning), otherwise calculate
  const position = React.useMemo(() => {
    // If position is provided, use it directly (matches vertex positioning)
    if (providedPosition) {
      // console.log(`   🔷 AngleMarkerComponent using provided position:`, providedPosition);
      return providedPosition;
    }
    
    // console.log(`   🔷 AngleMarkerComponent position calculation:`, { vertex, containerCoordinates, gridRows, gridCols, gridPadding });
    
    if (!vertex || !containerCoordinates) {
      // console.log(`   → Returning null (missing vertex or containerCoordinates)`);
      return null;
    }
    
    const [x1, y1, x2, y2] = containerCoordinates;
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    const gridSystemRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Calculate adjusted dimensions after padding
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size (square cells)
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    
    // Calculate grid dimensions
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate offsets for centering
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Convert grid position to position within centered grid area
    const xInGrid = offsetXGc + (vertex.col / gridCols) * gridWidthGc;
    const yInGrid = offsetYGc + (vertex.row / gridRows) * gridHeightGc;
    
    // Convert to percentage
    const containerLeft = ((x1 - 1) / gridSystemCols) * 100;
    const containerTop = ((y1 - 1) / gridSystemRows) * 100;
    const containerWidthPercent = ((containerWidthGc + 1) / gridSystemCols) * 100;
    const containerHeightPercent = ((containerHeightGc + 1) / gridSystemRows) * 100;
    
    // Calculate position within container as percentage
    const xPercent = (xInGrid / containerWidthGc) * 100;
    const yPercent = (yInGrid / containerHeightGc) * 100;
    
    // Absolute position
    const left = containerLeft + (xPercent / 100) * containerWidthPercent;
    const top = containerTop + (yPercent / 100) * containerHeightPercent;
    
    const result = { left: `${left}%`, top: `${top}%` };
    console.log(`   🔷 Position calculation result:`, {
      vertex: `col=${vertex.col}, row=${vertex.row}`,
      xInGrid,
      yInGrid,
      xPercent: xPercent.toFixed(2),
      yPercent: yPercent.toFixed(2),
      containerLeft: containerLeft.toFixed(2),
      containerTop: containerTop.toFixed(2),
      containerWidthPercent: containerWidthPercent.toFixed(2),
      containerHeightPercent: containerHeightPercent.toFixed(2),
      finalLeft: result.left,
      finalTop: result.top
    });
    
    return result;
  }, [providedPosition, vertex, containerCoordinates, gridRows, gridCols, paddingGc]);

  // Calculate rotation angle for arc placement
  const rotationAngle = React.useMemo(() => {
    if (!vertex || !prevVertex || !nextVertex) return 0;
    
    // Angle from vertex to prevVertex
    // Negate Y (row) because screen Y is inverted (increases downward)
    // This converts from screen coordinates to math coordinates for atan2
    // Same approach as ProtractorUtils.calculateAngleToPoint
    const vecRow = prevVertex.row - vertex.row;
    const vecCol = prevVertex.col - vertex.col;
    const angle1 = Math.atan2(-vecRow, vecCol) * (180 / Math.PI);
    
    // Normalize to 0-360
    let normalizedAngle = angle1;
    while (normalizedAngle < 0) normalizedAngle += 360;
    while (normalizedAngle >= 360) normalizedAngle -= 360;
    
    return normalizedAngle;
  }, [vertex, prevVertex, nextVertex]);

  const isRightAngle = calculatedAngle !== null && Math.abs(calculatedAngle - 90) < 2;
  // For 90° angles, show right-angle symbol instead of arc
  const showArc = (markerType === 'arc' || markerType === 'all') && !isRightAngle;
  const showMeasurementText = showText !== undefined ? showText : (markerType === 'measurement' || markerType === 'all');
  const showRightAngle = (markerType === 'rightAngle' || markerType === 'all') && isRightAngle;
  
  // console.log(`🔷 AngleMarkerComponent render:`, { markerType, showArc, showRightAngle, showMeasurementText, calculatedAngle, isRightAngle, position });
  
  // Calculate supplementary angles (3 angles that complete 360° around the vertex)
  const supplementaryAngleTotal = calculatedAngle !== null ? 360 - calculatedAngle : 0;
  const supplementaryAngle1 = supplementaryAngleTotal / 3;
  const supplementaryAngle2 = supplementaryAngleTotal / 3;
  const supplementaryAngle3 = supplementaryAngleTotal / 3;
  
  // Process size prop (handle both number and GC string)
  // For GC units, treat as a scale multiplier (1gc = scale 1, 2gc = scale 2, etc.)
  // This gives intuitive control: larger GC values = larger arcs
  const processSize = () => {
    if (typeof size === 'number') {
      return Math.max(size, 0.5); // Minimum 0.5 for visibility
    }
    if (typeof size === 'string' && size.includes('gc')) {
      const gcValue = parseFloat(size.replace('gc', '')) || 1;
      // Use GC value directly as scale multiplier
      // 1gc = scale 1, 1.5gc = scale 1.5, 2gc = scale 2, etc.
      return Math.max(gcValue, 0.5); // Minimum 0.5
    }
    return 1; // Default scale
  };
  
  const effectiveSize = processSize();
  
  // Process GC units for text size and offset
  const processGcToPixels = (value, defaultPixels) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', '')) || defaultPixels;
      // Convert gc to pixels (simplified - could use GridCellFontUtils)
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      return (gcValue / gridSystemCols) * viewportWidth;
    }
    return defaultPixels;
  };
  
  const textSizePx = processGcToPixels(textSize, 12);
  const textOffsetPx = processGcToPixels(textOffset, 35);
  const finalTextColor = textColor || color;

  if (markerType === 'none' || calculatedAngle === null || !position) {
    return null;
  }

  // Container style
  const containerStyle = {
    position: 'absolute',
    left: position.left,
    top: position.top,
    width: 0,
    height: 0,
    zIndex: zIndex,
    pointerEvents: 'auto'  // Changed to 'auto' to allow clicks on arcs
  };

  // Helper function to render a single arc with label
  const renderSingleArc = (angleValue, startAngleOffset, label, config, radiusOffset = 0) => {
    if (!showArc || angleValue <= 0) {
      return null;
    }
    
    // If config is null, this angle is disabled - don't render
    if (config === null) {
      return null;
    }
    
    // Use config values or fallback to component defaults
    const arcConfig = config || {};
    const arcSize = arcConfig.size !== undefined ? arcConfig.size : size;
    const arcColor = arcConfig.color || color;
    const arcShowText = arcConfig.showText !== undefined ? arcConfig.showText : showText;
    const arcTextMode = arcConfig.textMode || textMode; // 'name', 'measure', or 'both'
    
    // Handle arc click to spawn protractor
    const handleArcClickLocal = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      console.log('🖱️ Arc clicked! Label:', label, 'Vertex:', vertex);
      console.log('   onArcClick prop:', onArcClick);
      console.log('   onArcClick type:', typeof onArcClick);
      
      // Use the callback from quadrilateral if provided
      if (onArcClick) {
        console.log(`🎯 Invoking onArcClick for ${label} at vertex`, vertex);
        onArcClick(vertex);
      } else {
        console.warn('⚠️ No onArcClick callback provided!');
        // Fallback to global spawn function (legacy)
        console.log('🔍 Checking window.spawnProtractorAtVertex:', typeof window.spawnProtractorAtVertex);
        
        if (typeof window !== 'undefined' && window.spawnProtractorAtVertex) {
          console.log(`🎯 Angle arc clicked: ${label} at vertex`, vertex);
          
          // Spawn protractor at this vertex
          window.spawnProtractorAtVertex(vertex, {
            mode: 'rotatable',
            radius: '90gc',
            color: arcColor,
            armColor: arcColor,
            initialAngle: angleValue,
            label: label
          });
        } else {
          console.error('❌ No protractor spawn function available!');
          console.log('💡 Enable protractorConfig.enableClickToSpawn in your quadrilateral');
        }
      }
    };
    const arcFill = arcConfig.fill !== undefined ? arcConfig.fill : false;
    const arcFillColor = arcConfig.fillColor || arcColor;
    const arcFillOpacity = arcConfig.fillOpacity !== undefined ? arcConfig.fillOpacity : 0.3;
    const arcBlinkFill = arcConfig.blinkFill !== undefined ? arcConfig.blinkFill : false;
    const arcAnimateDraw = arcConfig.animateDraw !== undefined ? arcConfig.animateDraw : false;
    const arcDrawLoops = arcConfig.drawLoops !== undefined ? arcConfig.drawLoops : 1;
    const arcDrawDuration = arcConfig.drawDuration !== undefined ? arcConfig.drawDuration : 2;
    
    // Process size for this specific arc
    const processArcSize = () => {
      if (typeof arcSize === 'number') {
        return Math.max(arcSize, 0.5);
      }
      if (typeof arcSize === 'string' && arcSize.includes('gc')) {
        const gcValue = parseFloat(arcSize.replace('gc', '')) || 1;
        return Math.max(gcValue, 0.5);
      }
      return 1;
    };
    
    const arcEffectiveSize = processArcSize();
    
    // Calculate radius based on size only (same for all arcs)
    // All arcs use the same radius to ensure they appear the same size
    const baseRadius = 25;
    const radius = Math.max(baseRadius * arcEffectiveSize, 15);
    
    // Note: radiusOffset is now only used for label spacing, not arc size
    // All arcs are positioned at the same distance (radius) to keep them the same size
    
    // SIMPLIFIED APPROACH: Find two points on the edges at a fixed radius from the vertex
    // 1. Calculate direction vectors to adjacent vertices
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    // 2. Normalize the vectors (make them unit length)
    const len1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const len2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    const unit1 = { x: vec1.x / len1, y: vec1.y / len1 };
    const unit2 = { x: vec2.x / len2, y: vec2.y / len2 };
    
    // 3. Find two points on the edges at 'radius' distance from vertex
    // These are the start and end points of our arc
    const point1 = {
      x: unit1.x * radius,
      y: unit1.y * radius
    };
    const point2 = {
      x: unit2.x * radius,
      y: unit2.y * radius
    };
    
    console.log(`      🔷 [renderSingleArc] Simple arc calculation for ${label}:`, {
      vertex: `col=${vertex.col}, row=${vertex.row}`,
      prevVertex: `col=${prevVertex.col}, row=${prevVertex.row}`,
      nextVertex: `col=${nextVertex.col}, row=${nextVertex.row}`,
      vec1: `x=${vec1.x}, y=${vec1.y}`,
      vec2: `x=${vec2.x}, y=${vec2.y}`,
      unit1: `x=${unit1.x.toFixed(3)}, y=${unit1.y.toFixed(3)}`,
      unit2: `x=${unit2.x.toFixed(3)}, y=${unit2.y.toFixed(3)}`,
      point1: `x=${point1.x.toFixed(2)}, y=${point1.y.toFixed(2)}`,
      point2: `x=${point2.x.toFixed(2)}, y=${point2.y.toFixed(2)}`,
      radius,
      angleValue
    });
    
    // 4. Determine sweep direction using cross product
    // Positive cross product = counterclockwise in screen coords
    const crossProduct = vec1.x * vec2.y - vec1.y * vec2.x;
    // For interior angles, we want to sweep the smaller angle (inside the shape)
    // sweepFlag=0 means counterclockwise, sweepFlag=1 means clockwise
    // Flip the direction: positive cross = clockwise (1), negative = counterclockwise (0)
    const sweepFlag = crossProduct > 0 ? 1 : 0;
    
    // 5. Determine if we need large arc flag (for angles > 180°)
    const largeArcFlag = angleValue > 180 ? 1 : 0;
    
    // Use the calculated points directly as arc endpoints
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;
    
    console.log(`      🔷 [renderSingleArc] Arc parameters for ${label}:`, {
      startPoint: `(${x1.toFixed(2)}, ${y1.toFixed(2)})`,
      endPoint: `(${x2.toFixed(2)}, ${y2.toFixed(2)})`,
      radius,
      sweepFlag,
      largeArcFlag,
      crossProduct: crossProduct.toFixed(2)
    });
    
    // Always create separate paths: arc path (for stroke/animation) and fill path (for fill only)
    // Arc path - just the circular arc portion (for stroke and animation)
    const arcPathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
    
    // Fill path - closed sector (only used if fill is enabled, no animation)
    const fillPathData = arcFill ? `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z` : null;
    
    // Calculate mid-point for label positioning (bisector of the angle)
    const midVec = {
      x: unit1.x + unit2.x,
      y: unit1.y + unit2.y
    };
    const midLen = Math.sqrt(midVec.x * midVec.x + midVec.y * midVec.y);
    const midUnit = { x: midVec.x / midLen, y: midVec.y / midLen };
    
    const labelRadius = radius + textOffsetPx + radiusOffset;
    const labelX = midUnit.x * labelRadius;
    const labelY = midUnit.y * labelRadius;
    
    const viewBoxSize = radius * 3;
    const viewBoxCenter = viewBoxSize / 2;
    
    // Calculate path length for draw animation
    // For arc: length = radius * angle (in radians)
    const pathLength = radius * angleValue * (Math.PI / 180);
    
    return React.createElement('div', {
      key: `arc-${label}`,
      onClick: handleArcClickLocal,
      onMouseEnter: (e) => {
        e.currentTarget.style.opacity = '0.8';
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.opacity = '1';
      },
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${viewBoxSize}px`,  // Explicit size based on viewBox
        height: `${viewBoxSize}px`, // Explicit size based on viewBox
        pointerEvents: 'auto',  // Enable click events
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        zIndex: 1000  // Keep above other elements
      },
      title: `Click to measure ${label} with protractor`
    }, [
      React.createElement('svg', {
        key: 'arc-svg',
        onClick: handleArcClickLocal,
        onMouseEnter: (e) => {
          e.currentTarget.style.opacity = '0.8';
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.opacity = '1';
        },
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: `${viewBoxSize}px`,
          height: `${viewBoxSize}px`,
          transform: 'translate(-50%, -50%)',
          overflow: 'visible',
          pointerEvents: 'auto',
          cursor: 'pointer'
        },
        viewBox: `${-viewBoxCenter} ${-viewBoxCenter} ${viewBoxSize} ${viewBoxSize}`
      }, [
        // Fill path (static, no animation) - only rendered if fill is enabled
        arcFill && fillPathData ? React.createElement('path', {
          key: 'arc-fill',
          d: fillPathData,
          fill: arcFillColor,
          fillOpacity: arcFillOpacity,
          stroke: 'none',
          className: arcBlinkFill ? 'angle-arc-blink' : undefined
        }) : null,
        // Arc stroke path (with animation) - always rendered for the arc outline
        React.createElement('path', {
          key: 'arc-stroke',
          d: arcPathData,
          fill: 'none',
          stroke: arcColor,
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          style: (() => {
            const styles = {};
            
            // Draw animation using stroke-dasharray - only animates the arc portion
            if (arcAnimateDraw) {
              // Set dasharray to path length and initial dashoffset to path length (hides arc)
              styles.strokeDasharray = `${pathLength}px`;
              styles.strokeDashoffset = `${pathLength}px`;
              const loopValue = arcDrawLoops === 0 ? 'infinite' : arcDrawLoops;
              // Create unique animation name with path length to avoid conflicts
              const roundedLength = Math.round(pathLength);
              const animName = `angle-arc-draw-${roundedLength}`;
              // Include fill-mode in animation shorthand to avoid React warning
              styles.animation = `${animName} ${arcDrawDuration}s ease-in-out ${loopValue} forwards`;
              
              // Dynamically inject keyframe if not already present
              if (typeof document !== 'undefined') {
                const styleId = `keyframe-${animName}`;
                if (!document.getElementById(styleId)) {
                  const styleEl = document.createElement('style');
                  styleEl.id = styleId;
                  // Use actual pathLength value directly (not CSS variable for better browser support)
                  styleEl.textContent = `
                    @keyframes ${animName} {
                      from {
                        stroke-dashoffset: ${pathLength}px;
                      }
                      to {
                        stroke-dashoffset: 0px;
                      }
                    }
                  `;
                  document.head.appendChild(styleEl);
                }
              }
            }
            
            return Object.keys(styles).length > 0 ? styles : undefined;
          })()
        })
      ].filter(Boolean)),
      // Label text
      arcShowText ? React.createElement('div', {
        key: 'arc-label',
        style: (() => {
          const bgColor = labelBackgroundColor !== undefined ? labelBackgroundColor : 'rgba(255, 255, 255, 0.95)';
          const borderClr = labelBorderColor !== undefined ? labelBorderColor : arcColor;
          const hasNoBorder = labelBorderWidth === 0 || labelBorderWidth === '0';
          const borderWidthValue = hasNoBorder ? '0' : (labelBorderWidth !== undefined ? labelBorderWidth : '1px');
          const paddingValue = labelPadding !== undefined ? labelPadding : '2px 6px';
          return {
            position: 'absolute',
            left: `${labelX}px`,
            top: `${labelY}px`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${Math.max(textSizePx * 0.7, 10)}px`,
            fontFamily: textFont,
            fontWeight: 'normal',
            color: finalTextColor,
            backgroundColor: bgColor,
            padding: paddingValue,
            borderRadius: bgColor === 'transparent' || bgColor === 'none' ? 0 : 4,
            whiteSpace: 'nowrap',
            border: hasNoBorder ? 'none' : `${borderWidthValue} solid ${borderClr}`,
            pointerEvents: 'none',
            zIndex: 10,
            textAlign: 'center'
          };
        })()
      }, (() => {
        // Always show just the angle measurement
        return `${Math.round(angleValue)}°`;
      })()) : null
    ].filter(Boolean));
  };

  // Arc marker using SVG - renders all 4 angles
  const renderArc = () => {
    if (!showArc) {
      return null;
    }
    
    // Show arc unless:
    // 1. It's a right angle AND markerType is specifically 'rightAngle' (not 'all')
    if (isRightAngle && markerType === 'rightAngle') {
      return null;
    }
    
    if (calculatedAngle === null) {
      return null;
    }
    
    // Calculate vectors from vertex to adjacent vertices
    // Use negated Y to convert screen coords to math coords (consistent with renderSingleArc)
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: -(prevVertex.row - vertex.row)  // Negate Y to convert screen coords to math coords
    };
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: -(nextVertex.row - vertex.row)  // Negate Y to convert screen coords to math coords
    };
    
    // Calculate cross product to determine orientation
    // Note: We're using negated Y vectors (math coords). In math coords, positive cross product
    // means counterclockwise, which corresponds to clockwise in screen coords (SVG).
    // For interior angles, we want counterclockwise sweep (sweepFlag=0) to show the interior angle.
    const crossProduct = vec1.x * vec2.y - vec1.y * vec2.x;
    const sweepFlag = crossProduct > 0 ? 0 : 1;  // Inverted: positive cross product = counterclockwise (interior angle)
    
    // Calculate angle from vertex to prevVertex
    const angleToPrev = Math.atan2(vec1.y, vec1.x) * (180 / Math.PI);
    
    // Render interior angle (from prevVertex to nextVertex)
    console.log(`   🔷 Calling renderSingleArc for interior angle:`, {
      calculatedAngle,
      interiorAngleConfig,
      showArc
    });
    const interiorArc = renderSingleArc(
      calculatedAngle,
      0, // Start from prevVertex direction (angleToPrev)
      'Interior Angle',
      interiorAngleConfig, // Use per-angle config
      0 // No radius offset
    );
    console.log(`   🔷 interiorArc result:`, interiorArc);
    
    // Calculate cumulative offset for supplementary angles
    // They start from nextVertex direction and continue around
    const interiorEndOffset = sweepFlag === 1 ? calculatedAngle : -calculatedAngle;
    
    // Render supplementary angles
    // They continue from where interior angle ended (nextVertex direction)
    const supp1Arc = renderSingleArc(
      supplementaryAngle1,
      interiorEndOffset,
      'Supplementary Angle 1',
      supplementaryAngle1Config, // Use per-angle config
      25 // Slightly larger radius
    );
    
    const supp2StartOffset = sweepFlag === 1
      ? interiorEndOffset + supplementaryAngle1
      : interiorEndOffset - supplementaryAngle1;
    
    const supp2Arc = renderSingleArc(
      supplementaryAngle2,
      supp2StartOffset,
      'Supplementary Angle 2',
      supplementaryAngle2Config, // Use per-angle config
      50 // Even larger radius
    );
    
    const supp3StartOffset = sweepFlag === 1
      ? supp2StartOffset + supplementaryAngle2
      : supp2StartOffset - supplementaryAngle2;
    
    const supp3Arc = renderSingleArc(
      supplementaryAngle3,
      supp3StartOffset,
      'Supplementary Angle 3',
      supplementaryAngle3Config, // Use per-angle config
      75 // Largest radius
    );
    
    return [interiorArc, supp1Arc, supp2Arc, supp3Arc].filter(Boolean);
  };

  // Right angle square marker
  const renderRightAngle = () => {
    // Don't show right-angle marker if arcs are being shown (arcs already show the angle)
    if (!showRightAngle || showArc) return null;
    
    const squareSize = 15 * effectiveSize; // pixels - uses processed effectiveSize
    
    // SIMPLIFIED APPROACH: Create a proper right-angle square symbol
    // 1. Calculate direction vectors to adjacent vertices
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    // 2. Normalize the vectors
    const len1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const len2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    const unit1 = { x: vec1.x / len1, y: vec1.y / len1 };
    const unit2 = { x: vec2.x / len2, y: vec2.y / len2 };
    
    // 3. Create three points for the right-angle square symbol
    // We only draw the two inner sides (not on the quadrilateral edges)
    // Point on edge towards prevVertex
    const point1 = {
      x: unit1.x * squareSize,
      y: unit1.y * squareSize
    };
    // Corner point: the opposite corner of the square (combining both unit vectors)
    const point2 = {
      x: unit1.x * squareSize + unit2.x * squareSize,
      y: unit1.y * squareSize + unit2.y * squareSize
    };
    // Point on edge towards nextVertex
    const point3 = {
      x: unit2.x * squareSize,
      y: unit2.y * squareSize
    };
    
    // 4. Create SVG path for the right-angle symbol (only two inner sides)
    const pathData = `M ${point1.x} ${point1.y} L ${point2.x} ${point2.y} L ${point3.x} ${point3.y}`;
    
    const viewBoxSize = squareSize * 3;
    const viewBoxCenter = viewBoxSize / 2;
    
    return React.createElement('div', {
      key: 'right-angle',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${viewBoxSize}px`,
        height: `${viewBoxSize}px`,
        pointerEvents: 'none'
      }
    }, [
      React.createElement('svg', {
        key: 'right-angle-svg',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: `${viewBoxSize}px`,
          height: `${viewBoxSize}px`,
          transform: 'translate(-50%, -50%)',
          overflow: 'visible'
        },
        viewBox: `${-viewBoxCenter} ${-viewBoxCenter} ${viewBoxSize} ${viewBoxSize}`
      }, [
        React.createElement('path', {
          key: 'right-angle-path',
          d: pathData,
          fill: 'none',
          stroke: color,
          strokeWidth: 2,
          strokeLinecap: 'square',
          strokeLinejoin: 'miter'
        })
      ])
    ]);
  };

  // Angle measurement text (for interior angle only, if labels are not shown)
  const renderMeasurement = () => {
    if (!showMeasurementText || showArc) return null; // Don't show if arcs with labels are shown
    
    // Use configured offset, or fallback based on marker visibility
    const baseOffset = showRightAngle ? textOffsetPx : textOffsetPx * 0.7;
    // For interior angles, we want text inside the quadrilateral
    // The bisector points outward, so reverse it by 180° to point inward
    const midAngle = rotationAngle + (calculatedAngle / 2);
    const interiorAngle = midAngle + 180; // Reverse direction to point inside
    const interiorRad = interiorAngle * (Math.PI / 180);
    
    // Use positive offset in the interior direction
    const offset = baseOffset * 0.4; // Smaller offset to place nicely inside
    // Use the interior angle direction to determine sign, but keep offset*4 as magnitude
    const directionX = Math.sin(interiorRad);
    const directionY = Math.cos(interiorRad);
    const magnitude = offset * 6;
    
    // Calculate initial offsets
    let textX = magnitude * directionX;
    let textY = magnitude * directionY;
    
    // Apply vertex-specific sign corrections
    const vertexLabel = props.vertexLabel || (vertex ? `Vertex(${vertex.row},${vertex.col})` : 'Unknown');
    if (vertexLabel === 'A') {
      // Vertex A: x offset is correct, y offset needs to be negated
      textY = -textY;
    } else if (vertexLabel === 'B') {
      // Vertex B: y offset is correct, x offset needs to be negated
      textX = -textX;
    } else if (vertexLabel === 'C') {
      // Vertex C: x offset is correct, y offset needs to be negated
      textY = -textY;
    } else if (vertexLabel === 'D') {
      // Vertex D: y offset is correct, x offset needs to be negated
      textX = -textX;
    }
    
    // Log offset information for debugging
    console.log(`📐 [AngleMarker] ${vertexLabel} - Text offsets:`, {
      vertex: vertexLabel,
      baseOffset: baseOffset.toFixed(2),
      offset: offset.toFixed(2),
      magnitude: magnitude.toFixed(2),
      directionX: directionX.toFixed(3),
      directionY: directionY.toFixed(3),
      textX: textX.toFixed(2),
      textY: textY.toFixed(2),
      interiorAngle: interiorAngle.toFixed(1),
      calculatedAngle: calculatedAngle !== null ? calculatedAngle.toFixed(1) : 'null'
    });
    
    return React.createElement('div', {
      key: 'measurement',
      style: (() => {
        const bgColor = labelBackgroundColor !== undefined ? labelBackgroundColor : 'rgba(255, 255, 255, 0.9)';
        const borderClr = labelBorderColor !== undefined ? labelBorderColor : finalTextColor;
        const hasNoBorder = labelBorderWidth === 0 || labelBorderWidth === '0';
        const borderWidthValue = hasNoBorder ? '0' : (labelBorderWidth !== undefined ? labelBorderWidth : '1px');
        const paddingValue = labelPadding !== undefined ? labelPadding : '2px 5px';
        return {
          position: 'absolute',
          left: `${textX}px`,
          top: `${textY}px`,
          transform: 'translate(-50%, -50%)',
          fontSize: `${textSizePx}px`,
          fontFamily: textFont,
          fontWeight: 'bold',
          color: finalTextColor,
          backgroundColor: bgColor,
          padding: paddingValue,
          borderRadius: bgColor === 'transparent' || bgColor === 'none' ? 0 : 3,
          whiteSpace: 'nowrap',
          border: hasNoBorder ? 'none' : `${borderWidthValue} solid ${borderClr}`
        };
      })()
    }, `${Math.round(calculatedAngle)}°`);
  };

  // Get arcs (may be array or single element)
  const arcs = renderArc();
  const arcArray = Array.isArray(arcs) ? arcs : (arcs ? [arcs] : []);
  const rightAngle = renderRightAngle();
  const measurement = renderMeasurement();
  
  return React.createElement('div', {
    className: 'angle-marker-component',
    style: containerStyle,
    'data-angle': calculatedAngle
  }, [
    ...arcArray,
    rightAngle,
    measurement
  ].filter(Boolean));
});

/**
 * Utility functions for angle calculations
 */
const AngleMarkerUtils = {
  /**
   * Calculate angle at a vertex given three points
   * @param {Object} vertex - The vertex {row, col}
   * @param {Object} prevVertex - Previous vertex {row, col}
   * @param {Object} nextVertex - Next vertex {row, col}
   * @returns {number} Angle in degrees
   */
  calculateAngle(vertex, prevVertex, nextVertex) {
    if (!vertex || !prevVertex || !nextVertex) return null;
    
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    const dot = vec1.x * vec2.x + vec1.y * vec2.y;
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    if (mag1 === 0 || mag2 === 0) return null;
    
    const cosAngle = dot / (mag1 * mag2);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    return angleRad * (180 / Math.PI);
  },

  /**
   * Calculate all four angles of a quadrilateral
   * @param {Array} vertices - Array of 4 vertices [{row, col}, ...]
   * @returns {Array<number>} Array of 4 angles in degrees
   */
  calculateAllAngles(vertices) {
    if (!vertices || vertices.length !== 4) return [null, null, null, null];
    
    return [
      this.calculateAngle(vertices[0], vertices[3], vertices[1]),
      this.calculateAngle(vertices[1], vertices[0], vertices[2]),
      this.calculateAngle(vertices[2], vertices[1], vertices[3]),
      this.calculateAngle(vertices[3], vertices[2], vertices[0])
    ];
  },

  /**
   * Check if an angle is a right angle (within tolerance)
   * @param {number} angle - Angle in degrees
   * @param {number} tolerance - Tolerance in degrees (default: 2)
   * @returns {boolean} True if right angle
   */
  isRightAngle(angle, tolerance = 2) {
    if (angle === null || angle === undefined) return false;
    return Math.abs(angle - 90) < tolerance;
  },

  /**
   * Check if two angles are equal (within tolerance)
   * @param {number} angle1 - First angle in degrees
   * @param {number} angle2 - Second angle in degrees
   * @param {number} tolerance - Tolerance in degrees (default: 1)
   * @returns {boolean} True if angles are equal
   */
  anglesEqual(angle1, angle2, tolerance = 1) {
    if (angle1 === null || angle2 === null) return false;
    return Math.abs(angle1 - angle2) < tolerance;
  },

  /**
   * Check if two angles are supplementary (sum to 180°)
   * @param {number} angle1 - First angle in degrees
   * @param {number} angle2 - Second angle in degrees
   * @param {number} tolerance - Tolerance in degrees (default: 1)
   * @returns {boolean} True if angles are supplementary
   */
  anglesSupplementary(angle1, angle2, tolerance = 1) {
    if (angle1 === null || angle2 === null) return false;
    return Math.abs((angle1 + angle2) - 180) < tolerance;
  }
};

// Export component and utilities
if (typeof window !== 'undefined') {
  window.AngleMarkerComponent = {
    AngleMarkerComponent,
    AngleMarkerUtils
  };
}

console.log('✅ Angle marker component loaded successfully');

