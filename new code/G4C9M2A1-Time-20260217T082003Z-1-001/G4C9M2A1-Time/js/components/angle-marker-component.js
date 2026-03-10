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
    markerType = 'arc',
    color = '#FF6600',
    size = 1,
    zIndex = 100,
    showText,
    textColor,
    textSize = '12gc',
    textFont = 'Arial, sans-serif',
    textOffset = '35gc', // Can be a single value or {x: '10gc', y: '10gc'}
    textMode = 'both', // 'name', 'measure', or 'both'
    arcThickness = '3gc', // Arc stroke thickness in gc units
    fill = false, // Fill the arc
    fillColor, // Fill color (defaults to arc color)
    fillOpacity = 0.3, // Fill opacity (0-1)
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

  // Calculate position - use SAME coordinate system as sides (percentages within container)
  const position = React.useMemo(() => {
    if (!vertex || !containerCoordinates) return null;
    
    const [x1, y1, x2, y2] = containerCoordinates;
    const containerWidthGc = x2 - x1;
    const containerHeightGc = y2 - y1;
    
    // Calculate adjusted dimensions after padding
    const adjustedWidthGc = containerWidthGc - 2 * paddingGc;
    const adjustedHeightGc = containerHeightGc - 2 * paddingGc;
    
    // Calculate cell size (square cells) - SAME as quadrilateral component
    const widthPerCell = adjustedWidthGc / gridCols;
    const heightPerCell = adjustedHeightGc / gridRows;
    const cellSizeGc = Math.min(widthPerCell, heightPerCell);
    
    // Calculate grid dimensions
    const gridWidthGc = cellSizeGc * gridCols;
    const gridHeightGc = cellSizeGc * gridRows;
    
    // Calculate offsets for centering
    const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
    const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
    
    // Convert to percentages (SAME as quadrilateral component's gridDimensions)
    // Use same variable names as gridDimensions: width, height, offsetX, offsetY
    const width = containerWidthGc > 0 ? (gridWidthGc / containerWidthGc) * 100 : 100;
    const height = containerHeightGc > 0 ? (gridHeightGc / containerHeightGc) * 100 : 100;
    const offsetX = containerWidthGc > 0 ? (offsetXGc / containerWidthGc) * 100 : 0;
    const offsetY = containerHeightGc > 0 ? (offsetYGc / containerHeightGc) * 100 : 0;
    
    // Calculate position as percentage within container (SAME formula as sides and vertices)
    // Use EXACT same formula: offsetX + (col / gridCols) * width
    const xPercent = offsetX + (vertex.col / gridCols) * width;
    const yPercent = offsetY + (vertex.row / gridRows) * height;
    
    // Position relative to container (not absolute page position)
    // The angle marker should be positioned within the quadrilateral container
    return { left: `${xPercent}%`, top: `${yPercent}%` };
  }, [vertex, containerCoordinates, gridRows, gridCols, paddingGc]);

  // Calculate rotation angle for arc placement
  const rotationAngle = React.useMemo(() => {
    if (!vertex || !prevVertex || !nextVertex) return 0;
    
    // Angle from vertex to prevVertex
    const angle1 = Math.atan2(
      prevVertex.row - vertex.row,
      prevVertex.col - vertex.col
    ) * (180 / Math.PI);
    
    return angle1;
  }, [vertex, prevVertex, nextVertex]);

  const isRightAngle = calculatedAngle !== null && Math.abs(calculatedAngle - 90) < 2;
  const showArc = markerType === 'arc' || markerType === 'all';
  const showMeasurementText = showText !== undefined ? showText : (markerType === 'measurement' || markerType === 'all');
  const showRightAngle = (markerType === 'rightAngle' || markerType === 'all') && isRightAngle;
  
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
    if (!showArc || angleValue <= 0) return null;
    
    // If config is null, this angle is disabled - don't render
    if (config === null) return null;
    
    // Use config values or fallback to component defaults
    const arcConfig = config || {};
    const arcSize = arcConfig.size !== undefined ? arcConfig.size : size;
    const arcColor = arcConfig.color || color;
    const arcShowText = arcConfig.showText !== undefined ? arcConfig.showText : showText;
    const arcTextMode = arcConfig.textMode || textMode; // 'name', 'measure', or 'both'
    const arcThicknessValue = arcConfig.arcThickness !== undefined ? arcConfig.arcThickness : arcThickness;
    const arcTextSize = arcConfig.textSize !== undefined ? arcConfig.textSize : textSize;
    const arcTextColor = arcConfig.textColor !== undefined ? arcConfig.textColor : (textColor || color);
    const arcTextOffset = arcConfig.textOffset !== undefined ? arcConfig.textOffset : textOffset;
    const arcFill = arcConfig.fill !== undefined ? arcConfig.fill : fill;
    const arcFillColor = arcConfig.fillColor || fillColor || arcColor;
    const arcFillOpacity = arcConfig.fillOpacity !== undefined ? arcConfig.fillOpacity : fillOpacity;
    const arcBlink = arcConfig.blink !== undefined ? arcConfig.blink : false;
    
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
    // Fill is now handled above in the config extraction
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
    
    // Process arc thickness
    const processArcThickness = () => {
      if (typeof arcThicknessValue === 'number') {
        return Math.max(arcThicknessValue, 1);
      }
      if (typeof arcThicknessValue === 'string' && arcThicknessValue.includes('gc')) {
        const gcValue = parseFloat(arcThicknessValue.replace('gc', '')) || 3;
        // Convert gc to pixels
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        return Math.max((gcValue / gridSystemCols) * viewportWidth, 1);
      }
      return 3; // Default 3 pixels
    };
    
    const arcThicknessPx = processArcThickness();
    
    // Process text size for this arc
    const arcTextSizePx = processGcToPixels(arcTextSize, 12);
    
    // Calculate radius based on size only (same for all arcs)
    // All arcs use the same radius to ensure they appear the same size
    const baseRadius = 25;
    const radius = Math.max(baseRadius * arcEffectiveSize, 15);
    
    // Note: radiusOffset is now only used for label spacing, not arc size
    // All arcs are positioned at the same distance (radius) to keep them the same size
    
    // Calculate vectors from vertex to adjacent vertices
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    // Calculate cross product to determine orientation
    const crossProduct = vec1.x * vec2.y - vec1.y * vec2.x;
    const sweepFlag = crossProduct > 0 ? 1 : 0;
    
    // Calculate angle from vertex to prevVertex
    const angleToPrev = Math.atan2(vec1.y, vec1.x) * (180 / Math.PI);
    
    // For interior angle, start from prevVertex direction
    // For supplementary angles, continue from where interior angle ended
    const startAngle = angleToPrev + startAngleOffset;
    const endAngle = sweepFlag === 1 
      ? startAngle + angleValue 
      : startAngle - angleValue;
    
    // Convert to radians
    const startRad = startAngle * (Math.PI / 180);
    const endRad = endAngle * (Math.PI / 180);
    
    // Use constant radius for all arcs (same size and position)
    const x1 = radius * Math.cos(startRad);
    const y1 = radius * Math.sin(startRad);
    const x2 = radius * Math.cos(endRad);
    const y2 = radius * Math.sin(endRad);
    
    const largeArcFlag = angleValue > 180 ? 1 : 0;
    
    // Always create separate paths: arc path (for stroke/animation) and fill path (for fill only)
    // Arc path - just the circular arc portion (for stroke and animation)
    const arcPathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
    
    // Fill path - closed sector (only used if fill is enabled, no animation)
    const fillPathData = arcFill ? `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z` : null;
    
    // Calculate label position
    // If using x,y offset, use it directly. Otherwise, calculate from angle bisector
    let labelX, labelY;
    
    if (typeof arcTextOffset === 'object' && arcTextOffset !== null) {
      // x,y offset - position relative to intersection point (0,0 in viewBox)
      const offsetXPx = processGcToPixels(arcTextOffset.x || '0gc', 0);
      const offsetYPx = processGcToPixels(arcTextOffset.y || '0gc', 0);
      labelX = offsetXPx;
      labelY = offsetYPx;
    } else {
      // Single value - position along angle bisector (backward compatibility)
      const midAngle = startAngle + (angleValue / 2) * (sweepFlag === 1 ? 1 : -1);
      const midRad = midAngle * (Math.PI / 180);
      const offsetPx = processGcToPixels(arcTextOffset, 35);
      const labelRadius = offsetPx === 0 ? 0 : (radius + offsetPx + radiusOffset);
      labelX = labelRadius * Math.cos(midRad);
      labelY = labelRadius * Math.sin(midRad);
    }
    
    const viewBoxSize = radius * 3;
    const viewBoxCenter = viewBoxSize / 2;
    
    // Convert viewBoxSize to responsive gc units
    // Use GridCellFontUtils if available, otherwise use a responsive calculation
    let responsiveSize = `${viewBoxSize}px`; // Fallback to pixels
    if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      // Convert pixel value to gc units for responsiveness
      // Estimate: 1gc ≈ 1px at 1600px viewport, scale proportionally
      const gcValue = viewBoxSize; // Use same numeric value as gc
      responsiveSize = window.GridCellFontUtils.processGcProperty(`${gcValue}gc`);
    }
    
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
        width: responsiveSize,  // Responsive size using gc units
        height: responsiveSize, // Responsive size using gc units
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
          width: responsiveSize,  // Responsive size using gc units
          height: responsiveSize, // Responsive size using gc units
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
          strokeWidth: arcThicknessPx,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          className: arcBlink ? 'angle-arc-blink' : undefined,
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
        className: arcBlink ? 'angle-arc-blink' : undefined,
        style: {
          position: 'absolute',
          left: `${labelX}px`,
          top: `${labelY}px`,
          transform: 'translate(-50%, -50%)',
          fontSize: `${Math.max(arcTextSizePx, 10)}px`,
          fontFamily: textFont,
          fontWeight: 'normal',
          color: arcTextColor,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
          textAlign: 'center'
        }
      }, `${Math.round(angleValue)}°`) : null
    ].filter(Boolean));
  };

  // Arc marker using SVG - renders all 4 angles
  const renderArc = () => {
    if (!showArc) return null;
    
    // Show arc unless:
    // 1. It's a right angle AND markerType is specifically 'rightAngle' (not 'all')
    if (isRightAngle && markerType === 'rightAngle') {
      return null;
    }
    
    if (calculatedAngle === null) return null;
    
    // Calculate vectors from vertex to adjacent vertices
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    // Calculate cross product to determine orientation
    const crossProduct = vec1.x * vec2.y - vec1.y * vec2.x;
    const sweepFlag = crossProduct > 0 ? 1 : 0;
    
    // Calculate angle from vertex to prevVertex
    const angleToPrev = Math.atan2(vec1.y, vec1.x) * (180 / Math.PI);
    
    // If it's a right angle (90°), render perpendicular lines instead of arc
    if (isRightAngle && interiorAngleConfig) {
      const arcConfig = interiorAngleConfig || {};
      const arcColor = arcConfig.color || color;
      const arcSize = arcConfig.size !== undefined ? arcConfig.size : size;
          const arcFill = arcConfig.fill !== undefined ? arcConfig.fill : fill;
          const arcFillColor = arcConfig.fillColor || fillColor || arcColor;
          const arcFillOpacity = arcConfig.fillOpacity !== undefined ? arcConfig.fillOpacity : fillOpacity;
          const arcThicknessValue = arcConfig.arcThickness !== undefined ? arcConfig.arcThickness : arcThickness;
          const arcBlink = arcConfig.blink !== undefined ? arcConfig.blink : false;
      
      // Process size and thickness
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
      const baseRadius = 25;
      const radius = Math.max(baseRadius * arcEffectiveSize, 15);
      
      // Process arc thickness
      const processArcThickness = () => {
        if (typeof arcThicknessValue === 'number') {
          return Math.max(arcThicknessValue, 1);
        }
        if (typeof arcThicknessValue === 'string' && arcThicknessValue.includes('gc')) {
          const gcValue = parseFloat(arcThicknessValue.replace('gc', '')) || 3;
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          return Math.max((gcValue / gridSystemCols) * viewportWidth, 1);
        }
        return 3;
      };
      
      const arcThicknessPx = processArcThickness();
      
      // Process text size and offset for label
      const arcTextSizePx = processGcToPixels(arcConfig.textSize || textSize, 12);
      const arcTextColor = arcConfig.textColor || (textColor || color);
      
      // Calculate label position
      let labelX, labelY;
      const arcTextOffset = arcConfig.textOffset !== undefined ? arcConfig.textOffset : textOffset;
      
      if (typeof arcTextOffset === 'object' && arcTextOffset !== null) {
        // x,y offset format
        const offsetXPx = processGcToPixels(arcTextOffset.x || '0gc', 0);
        const offsetYPx = processGcToPixels(arcTextOffset.y || '0gc', 0);
        labelX = offsetXPx;
        labelY = offsetYPx;
      } else {
        // Single value - position along angle bisector (45° from each line)
        const bisectorAngle = angleToPrev + 45;
        const bisectorRad = bisectorAngle * (Math.PI / 180);
        const offsetPx = processGcToPixels(arcTextOffset, 35);
        const labelRadius = offsetPx === 0 ? 0 : (radius + offsetPx);
        labelX = labelRadius * Math.cos(bisectorRad);
        labelY = labelRadius * Math.sin(bisectorRad);
      }
      
      // Calculate square size (same as radius)
      const squareSize = radius;
      
      // Get quadrant from config (if provided) to position square correctly
      const quadrant = arcConfig.quadrant;
      
      // Calculate directions for the square based on quadrant
      // Quadrant 1: upper-right (right and up) - angle 0° and -90°
      // Quadrant 2: upper-left (left and up) - angle 180° and -90°
      // Quadrant 3: lower-left (left and down) - angle 180° and 90°
      // Quadrant 4: lower-right (right and down) - angle 0° and 90°
      let angle1Rad, angle2Rad;
      
      if (quadrant !== undefined) {
        // Use quadrant to determine square orientation
        if (quadrant === 1) {
          // Upper-right: right (0°) and up (-90°)
          angle1Rad = 0;
          angle2Rad = -Math.PI / 2;
        } else if (quadrant === 2) {
          // Upper-left: left (180°) and up (-90°)
          angle1Rad = Math.PI;
          angle2Rad = -Math.PI / 2;
        } else if (quadrant === 3) {
          // Lower-left: left (180°) and down (90°)
          angle1Rad = Math.PI;
          angle2Rad = Math.PI / 2;
        } else if (quadrant === 4) {
          // Lower-right: right (0°) and down (90°)
          angle1Rad = 0;
          angle2Rad = Math.PI / 2;
        } else {
          // Fallback to using angleToPrev
          angle1Rad = angleToPrev * (Math.PI / 180);
          angle2Rad = angle1Rad + (Math.PI / 2);
        }
      } else {
        // No quadrant specified - use angleToPrev as fallback
        angle1Rad = angleToPrev * (Math.PI / 180);
        angle2Rad = angle1Rad + (Math.PI / 2);
      }
      
      // Calculate square corner points (L-shape: two adjacent sides)
      // First side: along prevVertex direction
      const side1EndX = squareSize * Math.cos(angle1Rad);
      const side1EndY = squareSize * Math.sin(angle1Rad);
      // Second side: perpendicular, along nextVertex direction
      const side2EndX = squareSize * Math.cos(angle2Rad);
      const side2EndY = squareSize * Math.sin(angle2Rad);
      // Outer corner where both sides meet
      const outerCornerX = side1EndX + side2EndX;
      const outerCornerY = side1EndY + side2EndY;
      
      const viewBoxSize = radius * 3;
      const viewBoxCenter = viewBoxSize / 2;
      
      // Convert viewBoxSize to responsive gc units
      let responsiveSize = `${viewBoxSize}px`;
      if (typeof window !== 'undefined' && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const gcValue = viewBoxSize;
        responsiveSize = window.GridCellFontUtils.processGcProperty(`${gcValue}gc`);
      }
      
      return React.createElement('div', {
        key: 'right-angle-square',
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: responsiveSize,
          height: responsiveSize,
          pointerEvents: 'auto',
          cursor: 'pointer',
          zIndex: 1000
        }
      }, [
        React.createElement('svg', {
          key: 'right-angle-svg',
          style: {
            position: 'absolute',
            left: '0',
            top: '0',
            width: responsiveSize,
            height: responsiveSize,
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',
            pointerEvents: 'auto',
            cursor: 'pointer'
          },
          viewBox: `${-viewBoxCenter} ${-viewBoxCenter} ${viewBoxSize} ${viewBoxSize}`
        }, [
          // Square fill (if enabled) - right triangle
          arcFill ? React.createElement('path', {
            key: 'right-angle-square-fill',
            d: `M 0 0 L ${side1EndX} ${side1EndY} L ${outerCornerX} ${outerCornerY} L ${side2EndX} ${side2EndY} Z`,
            fill: arcFillColor,
            fillOpacity: arcFillOpacity,
            stroke: 'none'
          }) : null,
          // Square outline - L-shape with two perpendicular sides
          React.createElement('path', {
            key: 'right-angle-square-outline',
            d: `M 0 0 L ${side1EndX} ${side1EndY} L ${outerCornerX} ${outerCornerY} L ${side2EndX} ${side2EndY} Z`,
            fill: 'none',
            stroke: arcColor,
            strokeWidth: arcThicknessPx,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className: arcBlink ? 'angle-arc-blink' : undefined
          })
        ].filter(Boolean)),
        // Label text
        arcConfig.showText !== false ? React.createElement('div', {
          key: 'right-angle-label',
          className: arcBlink ? 'angle-arc-blink' : undefined,
          style: {
            position: 'absolute',
            left: `${labelX}px`,
            top: `${labelY}px`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${Math.max(arcTextSizePx, 10)}px`,
            fontFamily: textFont,
            fontWeight: 'normal',
            color: arcTextColor,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
            textAlign: 'center'
          }
        }, '90°') : null
      ].filter(Boolean));
    }
    
    // Render interior angle (from prevVertex to nextVertex) - normal arc for non-90° angles
    const interiorArc = renderSingleArc(
      calculatedAngle,
      0, // Start from prevVertex direction (angleToPrev)
      'Interior Angle',
      interiorAngleConfig, // Use per-angle config
      0 // No radius offset
    );
    
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
    
    return React.createElement('div', {
      key: 'right-angle',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        border: `2px solid ${color}`,
        borderRight: 'none',
        borderTop: 'none',
        transform: `translate(-${squareSize/2}px, -${squareSize/2}px) rotate(${rotationAngle + 45}deg)`,
        transformOrigin: `${squareSize/2}px ${squareSize/2}px`
      }
    });
  };

  // Angle measurement text (for interior angle only, if labels are not shown)
  const renderMeasurement = () => {
    if (!showMeasurementText || showArc) return null; // Don't show if arcs with labels are shown
    
    // Use configured offset, or fallback based on marker visibility
    const offset = showRightAngle ? textOffsetPx : textOffsetPx * 0.7;
    const midAngle = rotationAngle + (calculatedAngle / 2);
    const midRad = midAngle * (Math.PI / 180);
    
    const textX = offset * Math.cos(midRad);
    const textY = offset * Math.sin(midRad);
    
    return React.createElement('div', {
      key: 'measurement',
      style: {
        position: 'absolute',
        left: `${textX}px`,
        top: `${textY}px`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${textSizePx}px`,
        fontFamily: textFont,
        fontWeight: 'bold',
        color: finalTextColor,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 5px',
        borderRadius: '3px',
        whiteSpace: 'nowrap',
        border: `1px solid ${finalTextColor}`
      }
    }, `${Math.round(calculatedAngle)}°`);
  };

  // Get arcs (may be array or single element)
  const arcs = renderArc();
  const arcArray = Array.isArray(arcs) ? arcs : (arcs ? [arcs] : []);

  return React.createElement('div', {
    className: 'angle-marker-component',
    style: containerStyle,
    'data-angle': calculatedAngle
  }, [
    ...arcArray,
    renderRightAngle(),
    renderMeasurement()
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

