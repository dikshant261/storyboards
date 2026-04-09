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
  // Log all props for debugging
  console.log(`🎯 [AngleMarker] ========== Component RENDERED ==========`);
  console.log(`🎯 [AngleMarker] Component rendered with props:`, {
    vertex: props.vertex,
    prevVertex: props.prevVertex,
    nextVertex: props.nextVertex,
    markerType: props.markerType,
    interiorAngleConfig: props.interiorAngleConfig,
    interiorAngleConfigShow: props.interiorAngleConfig?.show,
    interiorAngleConfigAngle: props.interiorAngleConfig?.angle,
    showText: props.showText,
    containerCoordinates: props.containerCoordinates,
    gridRows: props.gridRows,
    gridCols: props.gridCols,
    angle: props.angle
  });
  
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
    textOffset = '35gc',
    textMode = 'both', // 'name', 'measure', or 'both'
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
    console.log(`🔍 [AngleMarker] Calculating angle: angle prop=${angle}, vertex=`, vertex, 'prevVertex=', prevVertex, 'nextVertex=', nextVertex);
    
    if (angle !== undefined) {
      console.log(`✅ [AngleMarker] Using angle prop: ${angle}`);
      return angle;
    }
    
    if (!vertex || !prevVertex || !nextVertex) {
      console.log(`⚠️ [AngleMarker] Missing vertices, returning null`);
      return null;
    }
    
    // Vectors from vertex to adjacent vertices
    const vec1 = {
      x: prevVertex.col - vertex.col,
      y: prevVertex.row - vertex.row
    };
    
    const vec2 = {
      x: nextVertex.col - vertex.col,
      y: nextVertex.row - vertex.row
    };
    
    console.log(`🔍 [AngleMarker] Vectors: vec1=`, vec1, 'vec2=', vec2);
    
    // Calculate angle using dot product
    const dot = vec1.x * vec2.x + vec1.y * vec2.y;
    const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
    const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
    
    console.log(`🔍 [AngleMarker] Dot product calculation: dot=${dot}, mag1=${mag1}, mag2=${mag2}`);
    
    if (mag1 === 0 || mag2 === 0) {
      console.log(`⚠️ [AngleMarker] Zero magnitude vectors, returning null`);
      return null;
    }
    
    const cosAngle = dot / (mag1 * mag2);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    const result = angleRad * (180 / Math.PI);
    console.log(`✅ [AngleMarker] Calculated angle: ${result}°`);
    return result;
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

  // Check if it's a right angle - use configured angle if available, otherwise use calculated
  const angleToCheck = (interiorAngleConfig && interiorAngleConfig.angle !== undefined) 
    ? interiorAngleConfig.angle 
    : calculatedAngle;
  const isRightAngle = angleToCheck !== null && Math.abs(angleToCheck - 90) < 2;
  const showArc = markerType === 'arc' || markerType === 'all';
  const showMeasurementText = showText !== undefined ? showText : (markerType === 'measurement' || markerType === 'all');
  
  console.log(`🔍 [AngleMarker] Key values calculated:`, {
    calculatedAngle,
    configuredAngle: interiorAngleConfig?.angle,
    angleToCheck,
    isRightAngle,
    showArc,
    showMeasurementText,
    position,
    rotationAngle,
    interiorAngleConfig,
    interiorAngleConfigShow: interiorAngleConfig?.show,
    markerType
  });
  const showRightAngle = (markerType === 'rightAngle' || markerType === 'all') && isRightAngle;
  
  console.log(`🔍 [AngleMarker] Right angle detection:`, {
    showRightAngle,
    isRightAngle,
    markerType,
    angleToCheck,
    diffFrom90: angleToCheck !== null ? Math.abs(angleToCheck - 90) : null
  });
  
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
      const gridSystemCols = (typeof window !== 'undefined' && window.GridPrecisionConfig) ? 
        window.GridPrecisionConfig.precisionSettings[window.GridPrecisionConfig.currentPrecision].cols : 1600;
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
    console.log(`🔍 [AngleMarker] renderSingleArc called:`, {
      label,
      angleValue,
      showArc,
      config,
      configShow: config?.show,
      configIsNull: config === null
    });
    
    if (!showArc || angleValue <= 0) {
      console.log(`⚠️ [AngleMarker] renderSingleArc returning null: showArc=${showArc}, angleValue=${angleValue}`);
      return null;
    }
    
    // If config is null, this angle is disabled - don't render
    if (config === null) {
      console.log(`⚠️ [AngleMarker] renderSingleArc returning null: config is null`);
      return null;
    }
    
    // If config.show is explicitly false, don't render the arc (allows right angle square to show)
    if (config.show === false) {
      console.log(`⚠️ [AngleMarker] renderSingleArc returning null: config.show is false for ${label}`);
      return null;
    }
    console.log(`✅ [AngleMarker] renderSingleArc continuing - will render arc for ${label}`);
    
    // Use config values or fallback to component defaults
    const arcConfig = config || {};
    const arcSize = arcConfig.size !== undefined ? arcConfig.size : size;
    const arcColor = arcConfig.color || color;
    const arcShowText = arcConfig.showText !== undefined ? arcConfig.showText : showText;
    const arcTextMode = arcConfig.textMode || textMode; // 'name', 'measure', or 'both'
    const arcThickness = arcConfig.thickness !== undefined ? arcConfig.thickness : (arcConfig.strokeWidth !== undefined ? arcConfig.strokeWidth : '4gc'); // Default 4gc
    
    // Log config values for debugging
    console.log(`🔍 [AngleMarker] renderSingleArc config:`, {
      label,
      arcConfigReceived: arcConfig,
      arcSize,
      arcColor,
      arcThickness,
      arcFill: arcConfig.fill,
      arcFillColor: arcConfig.fillColor,
      arcFillOpacity: arcConfig.fillOpacity,
      arcTextSize: arcConfig.textSize,
      arcShowText,
      arcTextMode,
      componentDefaults: {
        size,
        color,
        showText,
        textMode
      },
      finalValues: {
        arcSize,
        arcColor,
        arcThickness,
        arcFill: arcConfig.fill,
        arcFillColor: arcConfig.fillColor,
        arcFillOpacity: arcConfig.fillOpacity
      }
    });
    
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
    const arcTextSize = arcConfig.textSize !== undefined ? arcConfig.textSize : textSize;
    const arcTextSizePx = processGcToPixels(arcTextSize, textSizePx);
    const arcBlinkFill = arcConfig.blinkFill !== undefined ? arcConfig.blinkFill : false;
    const arcAnimateDraw = arcConfig.animateDraw !== undefined ? arcConfig.animateDraw : false;
    const arcDrawLoops = arcConfig.drawLoops !== undefined ? arcConfig.drawLoops : 1;
    const arcDrawDuration = arcConfig.drawDuration !== undefined ? arcConfig.drawDuration : 2;
    
    // Process size for this specific arc - convert gc to pixels
    const processArcSize = () => {
      if (typeof arcSize === 'number') {
        return Math.max(arcSize, 15); // If already in pixels, use directly
      }
      // Convert gc to pixels using the same method as text and thickness
      return processGcToPixels(arcSize, 25); // Default 25 pixels if not specified
    };
    
    // Process thickness for this specific arc
    const processArcThickness = () => {
      if (typeof arcThickness === 'number') {
        return Math.max(arcThickness, 0.5);
      }
      // Use the same processGcToPixels function as text
      return processGcToPixels(arcThickness, 4);
    };
    
    const arcEffectiveSize = processArcSize();
    const arcEffectiveThickness = processArcThickness();
    
    // Use size directly as radius (already converted to pixels)
    const radius = Math.max(arcEffectiveSize, 15);
    
    console.log(`🔍 [AngleMarker] Arc size calculation:`, {
      arcSize,
      arcEffectiveSize,
      radius,
      arcThickness,
      arcEffectiveThickness,
      arcTextSize,
      arcTextSizePx,
      arcFill,
      arcFillColor,
      arcFillOpacity
    });
    
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
    
    // Calculate mid-angle for label positioning
    // Use radiusOffset to space labels apart (arcs remain same size)
    const midAngle = startAngle + (angleValue / 2) * (sweepFlag === 1 ? 1 : -1);
    const midRad = midAngle * (Math.PI / 180);
    const labelRadius = radius + textOffsetPx + radiusOffset;
    const labelX = labelRadius * Math.cos(midRad);
    const labelY = labelRadius * Math.sin(midRad);
    
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
          strokeWidth: arcEffectiveThickness,
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
        style: {
          position: 'absolute',
          left: `${labelX}px`,
          top: `${labelY}px`,
          transform: 'translate(-50%, -50%)',
          fontSize: `${Math.max(arcTextSizePx, 10)}px`,
          fontFamily: textFont,
          fontWeight: 'normal',
          color: finalTextColor,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
          textAlign: 'center'
        }
      }, (() => {
        // Render text based on mode
        if (arcTextMode === 'name') {
          return label;
        } else if (arcTextMode === 'measure') {
          return `${Math.round(angleValue)}°`;
        } else { // 'both' or default
          return `${label} (${Math.round(angleValue)}°)`;
        }
      })()) : null
    ].filter(Boolean));
  };

  // Arc marker using SVG - renders all 4 angles
  const renderArc = () => {
    console.log(`🔍 [AngleMarker] ========== renderArc called ==========`);
    console.log(`🔍 [AngleMarker] renderArc params:`, {
      showArc,
      markerType,
      calculatedAngle,
      isRightAngle,
      interiorAngleConfig,
      interiorAngleConfigShow: interiorAngleConfig?.show,
      interiorAngleConfigAngle: interiorAngleConfig?.angle,
      angleToCheck
    });
    
    if (!showArc) {
      console.log(`⚠️ [AngleMarker] renderArc returning null: showArc is false`);
      return null;
    }
    
    // Show arc unless:
    // 1. It's a right angle AND markerType is specifically 'rightAngle' (not 'all')
    // 2. It's a right angle AND interiorAngleConfig.show is false (to allow right angle square to show)
    if (isRightAngle && markerType === 'rightAngle') {
      console.log(`⚠️ [AngleMarker] renderArc returning null: right angle with markerType='rightAngle'`);
      return null;
    }
    // Check if it's a right angle and arc is disabled
    // Also check if the calculated angle is 90° even if config doesn't specify it
    const isRightAngleFromConfig = isRightAngle && interiorAngleConfig && interiorAngleConfig.show === false;
    const isRightAngleFromCalculation = calculatedAngle !== null && Math.abs(calculatedAngle - 90) < 2 && interiorAngleConfig && interiorAngleConfig.show === false;
    const isRightAngleWithDisabledArc = isRightAngleFromConfig || isRightAngleFromCalculation;
    
    console.log(`🔍 [AngleMarker] Checking right angle with disabled arc:`, {
      isRightAngle,
      calculatedAngle,
      angleToCheck,
      hasInteriorAngleConfig: !!interiorAngleConfig,
      showValue: interiorAngleConfig?.show,
      showIsFalse: interiorAngleConfig?.show === false,
      isRightAngleFromConfig,
      isRightAngleFromCalculation,
      isRightAngleWithDisabledArc
    });
    if (isRightAngleWithDisabledArc) {
      console.log(`⚠️ [AngleMarker] renderArc returning null: right angle (${angleToCheck}° or ${calculatedAngle}°) with show=false to allow square marker`, {
        isRightAngle,
        calculatedAngle,
        angleToCheck,
        interiorAngleConfig,
        showValue: interiorAngleConfig?.show
      });
      return null;
    }
    console.log(`✅ [AngleMarker] renderArc continuing - will render arc`);
    
    if (calculatedAngle === null && (!interiorAngleConfig || interiorAngleConfig.angle === undefined)) {
      console.log(`⚠️ [AngleMarker] renderArc returning null: calculatedAngle is null and no configured angle`);
      return null;
    }
    
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
    
    // Use configured angle if provided in interiorAngleConfig, otherwise use calculated angle
    const interiorAngleValue = (interiorAngleConfig && interiorAngleConfig.angle !== undefined) 
      ? interiorAngleConfig.angle 
      : (calculatedAngle !== null ? calculatedAngle : 60); // Fallback to 60 if both are unavailable
    
    // Log for debugging
    console.log(`📐 [AngleMarker] Angle values: configured=${interiorAngleConfig?.angle}, calculated=${calculatedAngle}, using=${interiorAngleValue}`);
    
    if (interiorAngleValue <= 0) {
      console.log(`⚠️ [AngleMarker] interiorAngleValue is ${interiorAngleValue}, returning null`);
      return null;
    }
    
    // Render interior angle (from prevVertex to nextVertex)
    // Skip rendering if it's a right angle and show is false
    let interiorArc = null;
    const shouldSkipInteriorArc = isRightAngle && interiorAngleConfig && interiorAngleConfig.show === false;
    console.log(`🔍 [AngleMarker] Checking if should skip interior arc:`, {
      isRightAngle,
      hasInteriorAngleConfig: !!interiorAngleConfig,
      showValue: interiorAngleConfig?.show,
      shouldSkipInteriorArc
    });
    if (!shouldSkipInteriorArc) {
      console.log(`✅ [AngleMarker] Calling renderSingleArc for interior angle`);
      interiorArc = renderSingleArc(
        interiorAngleValue,
        0, // Start from prevVertex direction (angleToPrev)
        'Interior Angle',
        interiorAngleConfig, // Use per-angle config
        0 // No radius offset
      );
      console.log(`🔍 [AngleMarker] renderSingleArc returned for interior:`, interiorArc);
    } else {
      console.log(`⚠️ [AngleMarker] Skipping interior arc render - right angle with show=false`);
    }
    
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
    
    const allArcs = [interiorArc, supp1Arc, supp2Arc, supp3Arc].filter(Boolean);
    // If it's a right angle and interior angle is disabled, return null to allow square to show
    if (isRightAngle && interiorAngleConfig && interiorAngleConfig.show === false && allArcs.length === 0) {
      return null;
    }
    return allArcs;
  };

  // Right angle square marker
  const renderRightAngle = () => {
    console.log(`🔍 [AngleMarker] ========== renderRightAngle called ==========`);
    console.log(`🔍 [AngleMarker] renderRightAngle params:`, {
      showRightAngle,
      isRightAngle,
      showArc,
      interiorAngleConfig,
      interiorAngleConfigShow: interiorAngleConfig?.show,
      markerType
    });
    
    // Don't show right-angle marker if arcs are being shown (arcs already show the angle)
    // Exception: if interiorAngleConfig.show is false, the arc won't render, so allow square to show
    if (!showRightAngle) {
      console.log(`⚠️ [AngleMarker] renderRightAngle returning null: showRightAngle is false`);
      return null;
    }
    
    // Check if arc is explicitly disabled for this right angle
    const arcDisabled = interiorAngleConfig && interiorAngleConfig.show === false;
    console.log(`🔍 [AngleMarker] Arc disabled check:`, {
      hasInteriorAngleConfig: !!interiorAngleConfig,
      showValue: interiorAngleConfig?.show,
      arcDisabled
    });
    
    // If arc is disabled for this right angle, show the square even if showArc is true
    if (arcDisabled) {
      console.log(`✅ [AngleMarker] Right angle square will show - arc is disabled (show=false)`);
    } else if (showArc) {
      console.log(`⚠️ [AngleMarker] Right angle square hidden - arc is enabled`);
      return null;
    }
    console.log(`✅ [AngleMarker] renderRightAngle continuing - will render square`);
    
    // Use size from config if available, otherwise use default
    const squareSizeGc = (interiorAngleConfig && interiorAngleConfig.size) ? interiorAngleConfig.size : '20gc';
    const squareSizePx = processGcToPixels(squareSizeGc, 20); // Default 20px if no size specified
    
    // For right angle square, we want it positioned at the vertex corner
    // The square should have its corner at the vertex, with two sides aligned with the triangle sides
    // rotationAngle is the angle from vertex to prevVertex (one side of the right angle)
    // The square's corner should be at (0, 0) which is the vertex position
    // We rotate it so one side aligns with the prevVertex direction
    
    // The square has borderRight and borderTop removed, so it forms an L-shape
    // The corner of the L should be at the vertex
    // We rotate around the top-left corner (0, 0) to align with the triangle sides
    const squareRotation = rotationAngle;
    
    console.log(`🔍 [AngleMarker] Right angle square rendering:`, {
      squareSizeGc,
      squareSizePx,
      rotationAngle,
      squareRotation,
      vertex,
      prevVertex,
      nextVertex
    });
    
    return React.createElement('div', {
      key: 'right-angle',
      style: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${squareSizePx}px`,
        height: `${squareSizePx}px`,
        border: `2px solid ${color}`,
        transform: `rotate(${squareRotation}deg)`,
        transformOrigin: '0 0' // Rotate around the top-left corner (vertex position)
      }
    });
  };

  // Angle measurement text (for interior angle only, if labels are not shown)
  const renderMeasurement = () => {
    // Check if arc is explicitly disabled for right angles (show: false)
    const arcDisabledForRightAngle = isRightAngle && interiorAngleConfig && interiorAngleConfig.show === false;
    
    // Show text if:
    // 1. showMeasurementText is true AND
    // 2. Either arc is not shown (showArc is false) OR arc is disabled for right angle
    if (!showMeasurementText || (showArc && !arcDisabledForRightAngle)) {
      return null; // Don't show if arcs with labels are shown (unless arc is disabled for right angle)
    }
    
    // Use configured offset, or fallback based on marker visibility
    // For right angles, use a larger offset to position text further from the square
    const offset = showRightAngle ? textOffsetPx * 2 : textOffsetPx * 0.7;
    const midAngle = rotationAngle + (calculatedAngle / 2);
    const midRad = midAngle * (Math.PI / 180);
    
    const textX = offset * Math.cos(midRad);
    const textY = offset * Math.sin(midRad);
    
    // Use configured angle if available, otherwise use calculated angle
    const angleToDisplay = (interiorAngleConfig && interiorAngleConfig.angle !== undefined) 
      ? interiorAngleConfig.angle 
      : calculatedAngle;
    
    return React.createElement('div', {
      key: 'measurement',
      style: {
        position: 'absolute',
        left: `${textX}px`,
        top: `${textY}px`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${textSizePx}px`,
        fontFamily: textFont,
        fontWeight: 'normal',
        color: finalTextColor,
        whiteSpace: 'nowrap'
      }
    }, `${Math.round(angleToDisplay)}°`);
  };

  console.log(`🔍 [AngleMarker] About to call renderArc, calculatedAngle=${calculatedAngle}, interiorAngleConfig=`, interiorAngleConfig);
  
  try {
    // Get arcs (may be array or single element)
    const arcs = renderArc();
    console.log(`🔍 [AngleMarker] renderArc returned:`, arcs);
    const arcArray = Array.isArray(arcs) ? arcs : (arcs ? [arcs] : []);
    
    // If it's a right angle and interiorAngleConfig.show is false, don't show arcs
    const shouldHideArcForRightAngle = isRightAngle && interiorAngleConfig && interiorAngleConfig.show === false;
    const finalArcArray = shouldHideArcForRightAngle ? [] : arcArray;
    
    console.log(`🎨 [AngleMarker] Rendering component:`, {
      arcs: arcs,
      arcArrayLength: arcArray.length,
      finalArcArrayLength: finalArcArray.length,
      shouldHideArcForRightAngle,
      showArc,
      markerType,
      calculatedAngle,
      interiorAngleConfig,
      containerStyle,
      position,
      hasArcs: !!arcs,
      arcsType: typeof arcs
    });

    const rightAngle = renderRightAngle();
    const measurement = renderMeasurement();
    
    console.log(`🎨 [AngleMarker] Final render elements:`, {
      arcArrayLength: finalArcArray.length,
      hasRightAngle: !!rightAngle,
      hasMeasurement: !!measurement
    });

    return React.createElement('div', {
      className: 'angle-marker-component',
      style: containerStyle,
      'data-angle': calculatedAngle
    }, [
      ...finalArcArray,
      rightAngle,
      measurement
    ].filter(Boolean));
  } catch (error) {
    console.error(`❌ [AngleMarker] Error rendering component:`, error);
    return null;
  }
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

