/**
 * Ruler Component
 * 
 * A flexible, interactive ruler for measuring distances and creating lines.
 * Supports metric (cm/mm), imperial (inches), and grid unit configurations.
 * Can be dragged, rotated, and integrated with other components.
 */

/* global React, ReactDOM, GridCellFontUtils, GridPrecisionConfig */

// Glass margin as fraction of ruler length (each side). Marker position 0 = start edge, 1 = end; zero mark at this fraction.
const GLASS_MARGIN_RATIO = 0.05;

/**
 * Ruler Utilities
 */
const RulerUtils = {
  /**
   * Convert between different measurement units
   * @param {number} value - Value to convert
   * @param {string} fromUnit - Source unit ('mm', 'cm', 'inches', 'gc')
   * @param {string} toUnit - Target unit ('mm', 'cm', 'inches', 'gc')
   * @returns {number} Converted value
   */
  convertUnits(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    
    // Convert to mm as base unit
    let valueInMm = value;
    switch(fromUnit) {
      case 'mm':
        valueInMm = value;
        break;
      case 'cm':
        valueInMm = value * 10;
        break;
      case 'inches':
        valueInMm = value * 25.4;
        break;
      case 'gc':
        // Grid cells don't have a fixed mm conversion - treat as pixels
        valueInMm = value;
        break;
      default:
        valueInMm = value;
    }
    
    // Convert from mm to target unit
    switch(toUnit) {
      case 'mm':
        return valueInMm;
      case 'cm':
        return valueInMm / 10;
      case 'inches':
        return valueInMm / 25.4;
      case 'gc':
        return valueInMm; // Grid cells treated as pixels
      default:
        return valueInMm;
    }
  },

  /**
   * Calculate marker position on ruler from click point
   * @param {Object} clickPoint - Click position {x, y} in pixels
   * @param {Object} rulerBounds - Ruler bounds (DOMRect, axis-aligned)
   * @param {number} rulerRotation - Ruler rotation in degrees
   * @param {number} [rulerLengthPixels] - Actual ruler length in pixels (along ruler); if omitted uses rulerBounds.width (correct only when rotation is 0)
   * @returns {number} Position along ruler (0 to 1, where 1 is full length)
   */
  calculateMarkerPosition(clickPoint, rulerBounds, rulerRotation, rulerLengthPixels) {
    // Get ruler center (same as AABB center for a rotated rect)
    const centerX = rulerBounds.left + rulerBounds.width / 2;
    const centerY = rulerBounds.top + rulerBounds.height / 2;
    
    // Get click position relative to center
    const dx = clickPoint.x - centerX;
    const dy = clickPoint.y - centerY;
    
    // Rotate point back by ruler rotation to get local coordinates (ruler's x-axis = along ruler)
    const rotationRad = -rulerRotation * (Math.PI / 180);
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;
    
    // Position along ruler length: use actual ruler length so marker follows mouse when ruler is rotated
    const lengthPx = rulerLengthPixels != null ? rulerLengthPixels : rulerBounds.width;
    const halfLength = lengthPx / 2;
    const position = (localX + halfLength) / lengthPx;
    
    // Clamp to 0-1
    return Math.max(0, Math.min(1, position));
  },

  /**
   * Snap marker position to nearest tick mark
   * @param {number} position - Position along ruler (0 to 1)
   * @param {number} rulerLengthInUnits - Total ruler length in display units
   * @param {number} tickInterval - Interval between ticks in display units
   * @returns {number} Snapped position (0 to 1)
   */
  snapMarkerToTicks(position, rulerLengthInUnits, tickInterval) {
    if (!tickInterval || tickInterval <= 0) return position;
    
    const positionInUnits = position * rulerLengthInUnits;
    const snappedUnits = Math.round(positionInUnits / tickInterval) * tickInterval;
    return snappedUnits / rulerLengthInUnits;
  },

  /**
   * Format measurement for display
   * @param {number} value - Measurement value
   * @param {string} unit - Unit type ('mm', 'cm', 'inches', 'gc')
   * @param {number} precision - Decimal places
   * @returns {string} Formatted measurement string
   */
  formatMeasurement(value, unit, precision = 1) {
    const formatted = value.toFixed(precision);
    const unitLabel = {
      'mm': 'mm',
      'cm': 'cm',
      'inches': '"',
      'gc': 'gc'
    }[unit] || unit;
    
    return `${formatted}${unitLabel}`;
  },

  /**
   * Get tick positions for ruler
   * @param {number} lengthInPixels - Ruler length in pixels
   * @param {string} rulerType - 'metric' | 'imperial' | 'grid'
   * @param {number} majorInterval - Major tick interval
   * @param {number} minorInterval - Minor tick interval
   * @param {Object} dimensions - Optional: ruler dimensions {lengthInUnits, unit} for grid type
   * @returns {Array} Array of tick objects {position, isMajor, label}
   */
  getTickPositions(lengthInPixels, rulerType, majorInterval, minorInterval, dimensions = null) {
    const ticks = [];
    
    // Determine total units based on ruler type
    let totalUnits, unit;
    if (rulerType === 'metric') {
      totalUnits = 300; // 300mm = 30cm
      unit = 'mm';
    } else if (rulerType === 'imperial') {
      totalUnits = 12; // 12 inches
      unit = 'inches';
    } else {
      // Grid type: use dimensions if provided, otherwise calculate from length prop
      if (dimensions && dimensions.lengthInUnits) {
        totalUnits = dimensions.lengthInUnits; // Use actual grid units count
      } else {
        // Fallback: calculate grid units from pixels (1 gc = 1 column width)
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        const columnWidth = viewportWidth / gridSystemCols;
        totalUnits = Math.round(lengthInPixels / columnWidth); // Convert pixels to grid units
      }
      unit = 'gc';
    }
    
    // Generate ticks
    for (let i = 0; i <= totalUnits; i += minorInterval) {
      const isMajor = i % majorInterval === 0;
      const position = i / totalUnits; // 0 to 1
      const label = isMajor ? String(Math.round(i)) : null;
      
      ticks.push({
        position,
        isMajor,
        label,
        value: i,
        unit
      });
    }
    
    return ticks;
  },

  /**
   * Get ruler dimensions based on type and length
   * @param {string} rulerType - 'metric' | 'imperial' | 'grid'
   * @param {string|number} lengthProp - Length specification
   * @returns {Object} {lengthInUnits, unit, displayUnit}
   */
  getRulerDimensions(rulerType, lengthProp) {
    if (rulerType === 'metric') {
      // Default 30cm = 300mm
      if (typeof lengthProp === 'string' && lengthProp.endsWith('cm')) {
        const cm = parseFloat(lengthProp);
        return {
          lengthInUnits: cm * 10,
          unit: 'mm',
          displayUnit: 'cm'
        };
      } else if (typeof lengthProp === 'string' && lengthProp.endsWith('mm')) {
        const mm = parseFloat(lengthProp);
        return {
          lengthInUnits: mm,
          unit: 'mm',
          displayUnit: 'mm'
        };
      }
      return {
        lengthInUnits: 300,
        unit: 'mm',
        displayUnit: 'cm'
      };
    } else if (rulerType === 'imperial') {
      // Default 12 inches
      if (typeof lengthProp === 'string' && lengthProp.endsWith('in')) {
        const inches = parseFloat(lengthProp);
        return {
          lengthInUnits: inches,
          unit: 'inches',
          displayUnit: 'inches'
        };
      }
      return {
        lengthInUnits: 12,
        unit: 'inches',
        displayUnit: 'inches'
      };
    } else {
      // Grid units - parse from lengthProp (e.g., "300gc")
      let gridUnits = 300; // Default
      if (typeof lengthProp === 'string' && lengthProp.endsWith('gc')) {
        gridUnits = parseFloat(lengthProp.replace('gc', ''));
        if (isNaN(gridUnits)) gridUnits = 300;
      } else if (typeof lengthProp === 'number') {
        gridUnits = lengthProp;
      }
      
      return {
        lengthInUnits: gridUnits,
        unit: 'gc',
        displayUnit: 'gc'
      };
    }
  },

  /**
   * Calculate the zero mark position of the ruler in screen coordinates
   * @param {DOMRect} rulerBounds - Ruler bounding rect
   * @param {number} rotation - Ruler rotation in degrees
   * @param {number} lengthPixels - Ruler length in pixels
   * @returns {Object} {x, y} - Zero mark position in screen pixels
   */
  getZeroMarkPosition(rulerBounds, rotation, lengthPixels) {
    const centerX = rulerBounds.left + rulerBounds.width / 2;
    const centerY = rulerBounds.top + rulerBounds.height / 2;
    
    // Calculate offset from center to zero mark based on rotation
    const rotationRad = (rotation * Math.PI) / 180;
    const halfLength = lengthPixels / 2;
    
    // Zero mark is at the start of the ruler (negative half length direction)
    // For rotation 0 (horizontal), zero is at left center
    // For rotation 90 (vertical), zero is at top center
    const offsetX = -halfLength * Math.cos(rotationRad);
    const offsetY = -halfLength * Math.sin(rotationRad);
    
    return {
      x: centerX + offsetX,
      y: centerY + offsetY
    };
  },

  /**
   * Find nearest snap point to the ruler's zero mark
   * @param {Object} zeroMarkPos - Zero mark position {x, y} in screen pixels
   * @param {Array} snapPoints - Array of snap points [{x, y, label}, ...] in grid coordinates
   * @param {number} threshold - Snap threshold in pixels
   * @param {number} gridRows - Grid rows
   * @param {number} gridCols - Grid cols
   * @returns {Object|null} Nearest snap point with distance, or null if none within threshold
   */
  findNearestSnapPoint(zeroMarkPos, snapPoints, threshold, gridRows, gridCols) {
    if (!snapPoints || snapPoints.length === 0) {
      // console.log('⚠️ [RulerUtils] findNearestSnapPoint: No snap points provided');
      return null;
    }
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    
    let nearest = null;
    let minDistance = Infinity;
    
    // console.log('🔍 [RulerUtils] findNearestSnapPoint called:', {
    //   zeroMarkPos,
    //   snapPointsCount: snapPoints.length,
    //   snapPoints,
    //   threshold,
    //   gridRows,
    //   gridCols,
    //   viewportWidth,
    //   viewportHeight
    // });
    
    snapPoints.forEach((point, idx) => {
      // Convert grid coordinates to screen pixels
      const snapPixelX = (point.x / gridCols) * viewportWidth;
      const snapPixelY = (point.y / gridRows) * viewportHeight;
      
      const dx = zeroMarkPos.x - snapPixelX;
      const dy = zeroMarkPos.y - snapPixelY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // console.log(`🔍 [RulerUtils] Snap point ${idx} (${point.label || 'unnamed'}):`, {
      //   gridCoords: { x: point.x, y: point.y },
      //   screenCoords: { x: snapPixelX, y: snapPixelY },
      //   zeroMarkPos,
      //   dx,
      //   dy,
      //   distance,
      //   threshold,
      //   withinThreshold: distance <= threshold
      // });
      
      if (distance < minDistance && distance <= threshold) {
        minDistance = distance;
        nearest = {
          ...point,
          index: idx,
          distance,
          screenX: snapPixelX,
          screenY: snapPixelY
        };
        // console.log(`✅ [RulerUtils] Found new nearest snap point:`, nearest);
      }
    });
    
    // console.log('🔍 [RulerUtils] findNearestSnapPoint result:', {
    //   nearest,
    //   minDistance,
    //   threshold,
    //   found: nearest !== null
    // });
    
    return nearest;
  },

  /**
   * Find nearest snap line to the ruler
   * @param {Object} zeroMarkPos - Zero mark position {x, y} in screen pixels
   * @param {number} rulerRotation - Current ruler rotation in degrees
   * @param {number} rulerLengthPixels - Ruler length in pixels
   * @param {Array} snapLines - Array of snap lines [{x1, y1, x2, y2, label}, ...] in grid coordinates
   * @param {number} threshold - Snap threshold in pixels
   * @param {number} gridRows - Grid rows
   * @param {number} gridCols - Grid cols
   * @returns {Object|null} Nearest snap line with distance and suggested rotation, or null if none within threshold
   */
  findNearestSnapLine(zeroMarkPos, rulerRotation, rulerLengthPixels, snapLines, threshold, gridRows, gridCols) {
    if (!snapLines || snapLines.length === 0) return null;
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    
    let nearest = null;
    let minDistance = Infinity;
    
    snapLines.forEach((line, idx) => {
      // Convert grid coordinates to screen pixels
      const x1 = (line.x1 / gridCols) * viewportWidth;
      const y1 = (line.y1 / gridRows) * viewportHeight;
      const x2 = (line.x2 / gridCols) * viewportWidth;
      const y2 = (line.y2 / gridRows) * viewportHeight;
      
      // Calculate distance from zero mark to line segment
      const distance = this.pointToLineDistance(zeroMarkPos.x, zeroMarkPos.y, x1, y1, x2, y2);
      
      if (distance < minDistance && distance <= threshold) {
        // Calculate line angle for ruler alignment
        const lineAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
        
        // Calculate the line length
        const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        
        minDistance = distance;
        nearest = {
          ...line,
          index: idx,
          distance,
          suggestedRotation: lineAngle,
          lineLength,
          screenCoords: { x1, y1, x2, y2 }
        };
      }
    });
    
    return nearest;
  },

  /**
   * Calculate distance from a point to a line segment
   * @param {number} px - Point x
   * @param {number} py - Point y
   * @param {number} x1 - Line start x
   * @param {number} y1 - Line start y
   * @param {number} x2 - Line end x
   * @param {number} y2 - Line end y
   * @returns {number} Distance in pixels
   */
  pointToLineDistance(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
      param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  },

  /**
   * Calculate the position to snap the ruler's zero mark to a point
   * @param {Object} snapPoint - Snap point {screenX, screenY}
   * @param {number} rotation - Current ruler rotation in degrees
   * @param {number} lengthPixels - Ruler length in pixels
   * @returns {Object} New center position {x, y} in screen pixels
   */
  calculateSnapToPointPosition(snapPoint, rotation, lengthPixels) {
    const rotationRad = (rotation * Math.PI) / 180;
    const halfLength = lengthPixels / 2;
    
    // Zero mark offset from center
    const offsetX = -halfLength * Math.cos(rotationRad);
    const offsetY = -halfLength * Math.sin(rotationRad);
    
    // New center position so zero mark is at snap point
    return {
      x: snapPoint.screenX - offsetX,
      y: snapPoint.screenY - offsetY
    };
  },

  /**
   * Calculate position and rotation to snap ruler against a line
   * @param {Object} snapLine - Snap line with screenCoords {x1, y1, x2, y2}
   * @param {Object} currentPos - Current ruler center position {x, y}
   * @param {number} currentRotation - Current ruler rotation
   * @param {number} lengthPixels - Ruler length in pixels
   * @returns {Object} {position: {x, y}, rotation: number}
   */
  calculateSnapToLinePosition(snapLine, currentPos, currentRotation, lengthPixels) {
    const { x1, y1, x2, y2 } = snapLine.screenCoords;
    
    // Calculate line angle
    const lineAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    
    // Determine which direction to align (could be lineAngle or lineAngle + 180)
    const angleDiff1 = Math.abs(((currentRotation - lineAngle + 180) % 360) - 180);
    const angleDiff2 = Math.abs(((currentRotation - (lineAngle + 180) + 180) % 360) - 180);
    
    const targetRotation = angleDiff1 <= angleDiff2 ? lineAngle : lineAngle + 180;
    
    // Project the current zero mark position onto the line
    const rotationRad = (currentRotation * Math.PI) / 180;
    const halfLength = lengthPixels / 2;
    const zeroOffsetX = -halfLength * Math.cos(rotationRad);
    const zeroOffsetY = -halfLength * Math.sin(rotationRad);
    const zeroX = currentPos.x + zeroOffsetX;
    const zeroY = currentPos.y + zeroOffsetY;
    
    // Project zero mark onto the line
    const lineVecX = x2 - x1;
    const lineVecY = y2 - y1;
    const lineLen = Math.sqrt(lineVecX * lineVecX + lineVecY * lineVecY);
    const lineUnitX = lineVecX / lineLen;
    const lineUnitY = lineVecY / lineLen;
    
    const toZeroX = zeroX - x1;
    const toZeroY = zeroY - y1;
    const projLength = toZeroX * lineUnitX + toZeroY * lineUnitY;
    
    // Clamp projection to line segment
    const clampedProj = Math.max(0, Math.min(lineLen, projLength));
    const projectedX = x1 + clampedProj * lineUnitX;
    const projectedY = y1 + clampedProj * lineUnitY;
    
    // Calculate new center position with target rotation
    const targetRotationRad = (targetRotation * Math.PI) / 180;
    const newZeroOffsetX = -halfLength * Math.cos(targetRotationRad);
    const newZeroOffsetY = -halfLength * Math.sin(targetRotationRad);
    
    return {
      position: {
        x: projectedX - newZeroOffsetX,
        y: projectedY - newZeroOffsetY
      },
      rotation: targetRotation
    };
  }
};

/**
 * RulerFace Component
 * Renders the ruler SVG with tick marks and labels
 */
const RulerFace = React.memo((props) => {
  const {
    rulerType = 'metric',
    lengthInPixels = 300,
    widthInPixels = 30,
    lengthProp = null, // Original length prop (e.g., "300gc")
    dimensions = null, // Pre-calculated dimensions from parent
    color = '#333',
    backgroundColor = 'rgba(255, 255, 255, 0.75)',
    showTickMarks = true,
    showLabels = true,
    majorTickInterval = 10,
    minorTickInterval = 1,
    labelInterval = 10,
    majorTickLength = 8,
    minorTickLength = 4,
    tickWidth = 1.5,
    labelFontSize = 8, // Font size for tick mark labels (can be number, "8px", or "16gc")
    zeroMarkHighlight = false // Highlight the 0 mark with a different color
  } = props;

  // Process labelFontSize to convert gc units to pixels if needed
  const processedLabelFontSize = React.useMemo(() => {
    if (typeof labelFontSize === 'number') {
      return labelFontSize;
    }
    if (typeof labelFontSize === 'string') {
      // Check if it's in gc units
      if (labelFontSize.endsWith('gc')) {
        const gcValue = parseFloat(labelFontSize);
        if (!isNaN(gcValue)) {
          // Convert gc to pixels using GridCellFontUtils if available
          if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
            const result = GridCellFontUtils.processGcProperty(labelFontSize, 'fontSize');
            if (typeof result === 'number') {
              return result;
            }
            if (typeof result === 'string' && result.endsWith('px')) {
              return parseFloat(result);
            }
          }
          // Fallback: manual conversion
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          return (gcValue / gridSystemCols) * viewportWidth;
        }
      }
      // If it's already in px or other units, parse it
      if (labelFontSize.endsWith('px')) {
        return parseFloat(labelFontSize);
      }
    }
    return 8; // Default fallback
  }, [labelFontSize]);

  // Add extra glass margin on both sides (5% of length on each side)
  const glassMargin = lengthInPixels * 0.05;
  const viewBoxWidth = lengthInPixels + (glassMargin * 2);
  const viewBoxHeight = widthInPixels;
  const measurementStartX = glassMargin; // Measurements start after left margin

  // Get ruler dimensions - use passed dimensions if available, otherwise calculate
  const rulerDimensions = React.useMemo(() => {
    if (dimensions) {
      return dimensions; // Use pre-calculated dimensions from parent
    }
    // Fallback: calculate dimensions
    if (rulerType === 'grid' && lengthProp) {
      return RulerUtils.getRulerDimensions(rulerType, lengthProp);
    }
    return RulerUtils.getRulerDimensions(rulerType, `${lengthInPixels}px`);
  }, [dimensions, rulerType, lengthProp, lengthInPixels]);

  // Generate tick marks
  const ticks = React.useMemo(() => 
    RulerUtils.getTickPositions(
      lengthInPixels,
      rulerType,
      majorTickInterval,
      minorTickInterval,
      rulerDimensions // Pass dimensions for grid type
    ),
    [lengthInPixels, rulerType, majorTickInterval, minorTickInterval, rulerDimensions]
  );

  return React.createElement('svg', {
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: 'none'
    },
    viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`
  }, [
    // Define gradients for glass effect
    React.createElement('defs', { key: 'defs' }, [
      // Linear gradient for glass shine (clearer than protractor)
      React.createElement('linearGradient', {
        key: 'glass-gradient',
        id: 'ruler-glass-gradient',
        x1: '0%',
        y1: '0%',
        x2: '0%',
        y2: '100%'
      }, [
        React.createElement('stop', {
          key: 'stop1',
          offset: '0%',
          stopColor: '#ffffff',
          stopOpacity: '0.5'
        }),
        React.createElement('stop', {
          key: 'stop2',
          offset: '50%',
          stopColor: '#ffffff',
          stopOpacity: '0.15'
        }),
        React.createElement('stop', {
          key: 'stop3',
          offset: '100%',
          stopColor: '#ffffff',
          stopOpacity: '0.3'
        })
      ]),
      // Radial gradient for edge highlight
      React.createElement('radialGradient', {
        key: 'edge-gradient',
        id: 'ruler-edge-gradient',
        cx: '50%',
        cy: '20%',
        r: '80%'
      }, [
        React.createElement('stop', {
          key: 'stop1',
          offset: '0%',
          stopColor: '#ffffff',
          stopOpacity: '0.4'
        }),
        React.createElement('stop', {
          key: 'stop2',
          offset: '100%',
          stopColor: '#ffffff',
          stopOpacity: '0'
        })
      ])
    ]),

    // Background rectangle with glass effect
    React.createElement('rect', {
      key: 'background',
      x: 0,
      y: 0,
      width: viewBoxWidth,
      height: viewBoxHeight,
      fill: 'url(#ruler-glass-gradient)',
      stroke: color,
      strokeWidth: 2,
      opacity: 0.85,
      rx: 2,
      ry: 2
    }),

    // Glass shine overlay
    React.createElement('rect', {
      key: 'glass-shine',
      x: 0,
      y: 0,
      width: viewBoxWidth,
      height: viewBoxHeight,
      fill: 'url(#ruler-edge-gradient)',
      stroke: 'none',
      rx: 2,
      ry: 2
    }),

    // Inner glow
    React.createElement('rect', {
      key: 'inner-glow',
      x: 1,
      y: 1,
      width: viewBoxWidth - 2,
      height: viewBoxHeight - 2,
      fill: 'none',
      stroke: '#ffffff',
      strokeWidth: 0.5,
      opacity: 0.4,
      rx: 2,
      ry: 2
    }),

    // Tick marks
    showTickMarks ? ticks.map((tick, idx) => {
      const x = measurementStartX + (tick.position * lengthInPixels); // Offset by margin
      const tickLength = tick.isMajor ? majorTickLength : minorTickLength;
      const y1 = viewBoxHeight - tickLength;
      const y2 = viewBoxHeight;
      
      // Highlight the 0 mark if zeroMarkHighlight is true
      const isZeroMark = tick.value === 0;
      // Debug: log first tick to verify values
      if (idx === 0 && zeroMarkHighlight) {
        // console.log('🎯 [RulerFace] Zero mark highlight check:', {
        //   zeroMarkHighlight,
        //   tickValue: tick.value,
        //   isZeroMark,
        //   tickPosition: tick.position,
        //   color: (zeroMarkHighlight && isZeroMark) ? '#FF9900' : color
        // });
      }
      const tickColor = (zeroMarkHighlight && isZeroMark) ? '#FF9900' : color; // Orange for 0 mark
      const tickStrokeWidth = (zeroMarkHighlight && isZeroMark) ? tickWidth * 2 : tickWidth; // Thicker for 0 mark
      
      return React.createElement('line', {
        key: `tick-${idx}`,
        x1: x,
        y1: y1,
        x2: x,
        y2: y2,
        stroke: tickColor,
        strokeWidth: tickStrokeWidth,
        strokeLinecap: 'round'
      });
    }) : null,

    // Labels
    showLabels ? ticks
      .filter(tick => tick.isMajor && tick.label && tick.value % labelInterval === 0)
      .map((tick, idx) => {
        const x = measurementStartX + (tick.position * lengthInPixels); // Offset by margin
        const y = viewBoxHeight - majorTickLength - 3;
        
        // Format label based on ruler type
        let displayLabel = tick.label;
        if (rulerType === 'metric' && rulerDimensions.displayUnit === 'cm') {
          displayLabel = String(tick.value / 10); // Convert mm to cm for display
        }
        
        // Highlight the 0 mark label if zeroMarkHighlight is true
        const isZeroMark = tick.value === 0;
        const labelColor = (zeroMarkHighlight && isZeroMark) ? '#FF9900' : color; // Orange for 0 mark
        
        return React.createElement('text', {
          key: `label-${idx}`,
          x: x,
          y: y,
          fill: labelColor,
          fontSize: processedLabelFontSize,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          textAnchor: 'middle',
          dominantBaseline: 'baseline',
          pointerEvents: 'none'
        }, displayLabel);
      }) : null
  ].filter(Boolean));
});

/**
 * MeasurementMarkers Component
 * Renders draggable markers for measurement.
 * Exposes updateMarkerPosition(markerId, position) via ref for live drag updates without re-render.
 */
const MeasurementMarkers = React.memo(React.forwardRef((props, ref) => {
  const {
    markers = [],
    rulerLengthPixels = 300,
    rulerWidthPixels = 30,
    rulerRotation = 0,
    markerColor = '#FF0000',
    fixedMarkerColor = null, // If set, fixed (start) marker uses this; movable (end) uses markerColor
    isEndMarkerSnapped = false,
    movableMarkerColorWhenSnapped = '#22c55e',
    showDistance = true,
    distanceUnit = 'cm',
    distancePrecision = 1,
    distanceLeastCount = null, // When set (e.g. 0.2), round displayed value to nearest multiple before formatting
    markerSize = 16, // Height of marker triangle (2x for visibility)
    distanceFontSize = 10, // Font size for distance text
    lengthInUnits = 300, // Ruler length in units (e.g. 300 mm for 30 cm) for correct conversion
    measurementDisplayMode = 'distance', // 'distance' = (movable - fixed) * lengthInUnits; 'readingFromStart' = scale so 0 at zero mark, lengthAC at snap
    endMarkerSnapPosition = null, // When set with readingFromStart: marker snaps here; reading scaled so 0 at zero, endMarkerReadingInUnits at snap
    endMarkerReadingInUnits = null, // Reading to show when marker is at endMarkerSnapPosition (e.g. length AC); if null, use endMarkerSnapPosition * lengthInUnits
    endMarkerSnapAtDistance = null, // When set { value: number, unit: string } (e.g. { value: 16.8, unit: 'cm' }), overrides vertex/point snap and snaps at this distance from zero mark
    movableMarkerBlink = false, // When true (e.g. step 3), movable marker background blinks
    onMarkerDragStart,
    onMarkerDrag,
    onMarkerDragEnd,
    onMarkerClick
  } = props;

  const svgRef = React.useRef(null);
  const hitLayerRef = React.useRef(null);

  // Touch on hit targets: use non-passive listener so preventDefault() works (avoids "Unable to preventDefault inside passive event listener")
  React.useEffect(() => {
    const el = hitLayerRef.current;
    if (!el) return;
    const handleTouchStart = (e) => {
      const target = e.target.closest && e.target.closest('[data-marker-id]');
      if (!target) return;
      const markerId = target.getAttribute('data-marker-id');
      if (!markerId || !onMarkerDragStart) return;
      e.preventDefault();
      e.stopPropagation();
      onMarkerDragStart(markerId, e);
    };
    el.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
    return () => el.removeEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
  }, [onMarkerDragStart]);

  // Glass margin (start edge to zero mark). Position 0 = start edge, 1 = end (lengthPixels); zero mark at position GLASS_MARGIN_RATIO.
  const glassMargin = rulerLengthPixels * GLASS_MARGIN_RATIO;
  const totalWidth = rulerLengthPixels + (glassMargin * 2);
  // Marker x = position * rulerLengthPixels (position from start edge so snap (glassMargin+lengthAC_px)/lengthPixels aligns with point C)
  const markerX = (pos) => pos * rulerLengthPixels;

  // Imperative: update one marker's position in the DOM (for smooth drag without re-render)
  const updateCallCountRef = React.useRef(0);
  React.useImperativeHandle(ref, () => ({
    updateMarkerPosition(markerId, position) {
      const svg = svgRef.current;
      if (!svg) {
        console.log('[MarkerDrag DEBUG] updateMarkerPosition: no svg ref');
        return;
      }
      const g = svg.querySelector(`[data-marker-id="${markerId}"]`);
      if (!g) {
        console.log('[MarkerDrag DEBUG] updateMarkerPosition: no g for markerId', markerId, 'svg children:', svg.children.length, 'data-marker-ids:', [...svg.querySelectorAll('[data-marker-id]')].map(el => el.getAttribute('data-marker-id')));
        return;
      }
      updateCallCountRef.current++;
      if (updateCallCountRef.current <= 2 || updateCallCountRef.current % 20 === 0) {
        console.log('[MarkerDrag DEBUG] updateMarkerPosition called', { markerId, position, x: markerX(position), callCount: updateCallCountRef.current });
      }
      const x = markerX(position);
      const y = rulerWidthPixels / 2;
      const markerHalfWidth = markerSize / 2;
      const path = g.querySelector('path');
      const line = g.querySelector('line');
      if (path) path.setAttribute('d', `M ${x} ${y - markerSize} L ${x - markerHalfWidth} ${y} L ${x + markerHalfWidth} ${y} Z`);
      if (line) {
        line.setAttribute('x1', String(x));
        line.setAttribute('x2', String(x));
      }
      // Update connection line between markers if present (movable marker is second)
      const connLine = svg.querySelector('[data-connection-line="true"]');
      if (connLine) {
        connLine.setAttribute('x2', String(x));
        connLine.setAttribute('y2', String(y));
      }
    }
  }), [rulerLengthPixels, rulerWidthPixels, markerSize]);

  // Calculate displayed measurement: 0 at zero mark, length AC at snap position when readingFromStart + endMarkerSnapPosition
  const distance = React.useMemo(() => {
    if (markers.length === 2) {
      const fixedMarker = markers.find(m => m.fixed || m.id === 'fixed-marker-0');
      const movableMarker = markers.find(m => !m.fixed && m.id !== 'fixed-marker-0');
      
      if (fixedMarker && movableMarker) {
        const rulerDimensions = RulerUtils.getRulerDimensions('metric', '30cm');
        const units = lengthInUnits ?? rulerDimensions.lengthInUnits;
        const unit = rulerDimensions.unit;
        let distanceInUnits;
        if (measurementDisplayMode === 'readingFromStart' && endMarkerSnapPosition != null && endMarkerSnapPosition > GLASS_MARGIN_RATIO) {
          // Scale so 0 at zero mark (position 0.05), lengthAC at snap: reading = (pos - zero) * (lengthAC / (snapPos - zero))
          const fromZero = movableMarker.position - GLASS_MARGIN_RATIO;
          const snapSpan = endMarkerSnapPosition - GLASS_MARGIN_RATIO;
          const lengthACInUnits = endMarkerReadingInUnits != null ? endMarkerReadingInUnits : (endMarkerSnapPosition * units);
          distanceInUnits = fromZero * (lengthACInUnits / snapSpan);
        } else if (measurementDisplayMode === 'readingFromStart') {
          distanceInUnits = movableMarker.position * units;
        } else {
          distanceInUnits = Math.abs(movableMarker.position - fixedMarker.position) * units;
        }
        
        return RulerUtils.convertUnits(distanceInUnits, unit, distanceUnit);
      }
    }
    return null;
  }, [markers, distanceUnit, lengthInUnits, measurementDisplayMode, endMarkerSnapPosition, endMarkerReadingInUnits]);

  // Build children array with proper keys
  const children = [];
  
    // Connection line between markers
  if (markers.length === 2) {
      const fixedMarker = markers.find(m => m.fixed || m.id === 'fixed-marker-0');
      const movableMarker = markers.find(m => !m.fixed && m.id !== 'fixed-marker-0');
      
      if (fixedMarker && movableMarker) {
      children.push(React.createElement('line', {
          key: 'connection-line',
          'data-connection-line': 'true',
          x1: markerX(fixedMarker.position),
          y1: rulerWidthPixels / 2,
          x2: markerX(movableMarker.position),
          y2: rulerWidthPixels / 2,
          stroke: isEndMarkerSnapped ? movableMarkerColorWhenSnapped : markerColor,
          strokeWidth: 2,
          strokeDasharray: '4, 2',
          opacity: 0.6
      }));
    }
  }

  // Markers - add to children array with proper keys
  markers.forEach((marker, idx) => {
    if (!marker) return; // Skip null/undefined markers
    
      const x = markerX(marker.position);
      const y = rulerWidthPixels / 2;
      const isFixed = marker.fixed || marker.id === 'fixed-marker-0';
      const markerHalfWidth = markerSize / 2; // Half width of marker triangle
      const fillColor = isFixed && fixedMarkerColor ? fixedMarkerColor : (isEndMarkerSnapped ? movableMarkerColorWhenSnapped : markerColor);
      const isMovableBlinking = movableMarkerBlink && !isFixed;
      
    // Generate unique key for marker - ensure it's always unique
    const markerKey = marker.id ? `marker-${String(marker.id)}` : `marker-${String(idx)}`;
    
    children.push(React.createElement('g', {
      key: markerKey,
      'data-marker-id': marker.id || undefined,
      style: { pointerEvents: isFixed ? 'none' : 'auto' }
      }, [
        // Marker pin (triangle pointing up)
        React.createElement('path', {
        key: `${markerKey}-pin`,
          d: `M ${x} ${y - markerSize} L ${x - markerHalfWidth} ${y} L ${x + markerHalfWidth} ${y} Z`,
          fill: fillColor,
          stroke: '#FFF',
          strokeWidth: 1,
          style: {
            cursor: isFixed ? 'default' : 'grab',
            pointerEvents: isFixed ? 'none' : 'auto',
            opacity: isFixed ? 0.8 : 1,
            animation: isMovableBlinking ? 'rulerMovableMarkerBlink 1.2s ease-in-out infinite' : undefined
          },
          onMouseDown: (e) => {
            if (!isFixed && onMarkerDragStart) {
              e.preventDefault();
              e.stopPropagation();
              onMarkerDragStart(marker.id, e);
            }
          },
          onTouchStart: (e) => {
            if (!isFixed && onMarkerDragStart) {
              e.preventDefault();
              e.stopPropagation();
              onMarkerDragStart(marker.id, e);
            }
          },
          onClick: (e) => {
            e.stopPropagation();
            if (!isFixed && onMarkerClick) {
              onMarkerClick(marker.id);
            }
          }
        }),
        // Marker line
        React.createElement('line', {
        key: `${markerKey}-line`,
          x1: x,
          y1: 0,
          x2: x,
          y2: rulerWidthPixels,
          stroke: fillColor,
          strokeWidth: isFixed ? 2 : 1,
          opacity: isFixed ? 0.7 : 0.5,
          style: {
            pointerEvents: 'none'
          }
        })
    ]));
  });

    // Distance display
  if (distance !== null && showDistance) {
    children.push(React.createElement('text', {
      key: 'distance',
      x: totalWidth / 2, // Center of total ruler width
      y: -5,
      fill: markerColor,
      fontSize: distanceFontSize,
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      textAnchor: 'middle',
      style: {
        pointerEvents: 'none',
        userSelect: 'none'
      }
    }, (() => {
      if (distance == null) return '';
      const value = distanceLeastCount != null ? Math.round(distance / distanceLeastCount) * distanceLeastCount : distance;
      return RulerUtils.formatMeasurement(value, distanceUnit, distancePrecision);
    })()));
  }

  // Filter and ensure all children have keys
  const validChildren = children.filter(Boolean);
  
  // Invisible hit targets for movable markers (SVG has pointer-events: none so clicks go through;
  // these divs receive pointer events so the marker can be dragged)
  const hitTargets = markers
    .filter(m => m && !m.fixed && m.id !== 'fixed-marker-0')
    .map(m => {
      const x = markerX(m.position);
      const y = rulerWidthPixels / 2;
      const leftPct = (x / totalWidth) * 100;
      const topPct = (y / rulerWidthPixels) * 100;
      const sizePctX = (markerSize * 2 / totalWidth) * 100;
      const sizePctY = (markerSize * 2 / rulerWidthPixels) * 100;
      return React.createElement('div', {
        key: `hit-${m.id}`,
        'data-marker-id': m.id,
        'data-marker-hit': 'true',
        role: 'button',
        tabIndex: -1,
    style: {
      position: 'absolute',
          left: `${leftPct}%`,
          top: `${topPct}%`,
          width: `${sizePctX}%`,
          height: `${sizePctY}%`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
          touchAction: 'none',
          cursor: 'grab',
          zIndex: 21
        },
        onPointerDown: (e) => {
          if (e.pointerType === 'touch' && e.target && typeof e.target.setPointerCapture === 'function') {
            e.target.setPointerCapture(e.pointerId);
          }
          e.preventDefault();
          e.stopPropagation();
          if (onMarkerDragStart) onMarkerDragStart(m.id, e);
        },
        onMouseDown: (e) => {
          console.log('[MarkerDrag DEBUG] hit target onMouseDown', { markerId: m.id });
          e.preventDefault();
          e.stopPropagation();
          if (onMarkerDragStart) onMarkerDragStart(m.id, e);
        }
        // Touch: also handled via onPointerDown + setPointerCapture so moves past hit area still deliver pointermove
      });
    });

  // Two layers: SVG (pointer-events: none) and hit targets on top (pointer-events: auto).
  // Hit targets must be in their own layer so they receive clicks; a single wrapper with
  // pointer-events: none would skip the whole subtree in some browsers.
  return React.createElement(React.Fragment, { key: 'measurement-markers' }, [
    React.createElement('div', {
      key: 'markers-svg-layer',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
        zIndex: 20
      }
    }, [
      React.createElement('svg', {
        key: 'markers-svg',
        ref: svgRef,
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none'
        },
        viewBox: `0 0 ${totalWidth} ${rulerWidthPixels}`,
        'data-marker-debug': 'measurement-markers-svg'
      }, validChildren.length > 0 ? validChildren : null)
    ]),
    React.createElement('div', {
      key: 'markers-hit-layer',
      ref: hitLayerRef,
      'data-marker-hit-layer': 'true',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Only hit target children receive events (pointer-events: auto), so ruler drag/rotation don't see marker clicks
        touchAction: 'none',
        zIndex: 21
      }
    }, hitTargets)
  ]);
}));

/**
 * Main Ruler Component
 */
const RulerComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    centerPoint,
    zIndex = 5000,
    
    // Visual Configuration
    rulerType = 'metric',
    length = '30cm',
    width = '30gc',
    color = '#333',
    backgroundColor = 'rgba(255, 255, 255, 0.75)',
    showTickMarks = true,
    showLabels = true,
    majorTickInterval = 10,
    minorTickInterval = 1,
    labelInterval = 10,
    labelFontSize = 8, // Font size for tick mark labels
    
    // Interaction Configuration
    mode = 'interactive',
    isDraggable = true,
    isRotatable = true,
    rotation = 0,
    showRotationHandle = false, // Show rotation handle that pivots around 0 mark
    showRotationCircle = false, // Show circular path indicator when snapped (rotation around 0 mark)
    snapPointPosition = null, // Snap point position {x, y} in grid coordinates for circle positioning
    
    // Measurement Features
    measurementMarkers = {
      enabled: true,
      maxMarkers: 2,
      allowClick: true,
      allowDrag: true,
      snapToTicks: true,
      color: '#FF0000',
      showDistance: true,
      markerSize: 16, // Height of marker triangle in pixels (2x for visibility)
      distanceFontSize: 10 // Font size for distance text in pixels
    },
    
    // Line Drawing Features
    lineDrawing = {
      enabled: false,
      mode: 'click',
      integration: true
    },
    
    // Snap Configuration
    // snapPoints: Array of points the zero mark can snap to [{x, y, label}, ...]
    // where x, y are grid coordinates (gc)
    snapPoints = [],
    // snapLines: Array of lines the ruler can snap against [{x1, y1, x2, y2, label}, ...]
    // where coordinates are in grid units (gc)
    snapLines = [],
    snapMode = 'free', // 'free', 'point', 'line', 'both'
    snapThreshold = 30, // Distance in pixels to trigger snap
    snapLineRotationTolerance = 15, // Degrees: snap rotation when within this of line angle (+/- 5 = 5)
    showSnapIndicators = true, // Show visual indicators for snap points/lines
    highlightNearestSnap = true, // Highlight nearest snap target when nearby
    zeroMarkHighlight = false, // Highlight the 0 mark on the scale with a different color
    
    // Circle Snap Configuration
    // Snap to a circular area around a coordinate
    circleSnapTarget = null, // { x, y, radius } where x, y are in gc and radius is in gc
    showCircleSnapIndicator = false, // Show visual indicator (dashed circle) for the snap area
    onCircleSnap, // Called when zero mark enters the circle: ({ x, y, radius, distance, screenX, screenY }) => {}
    onCircleUnsnap, // Called when zero mark leaves the circle: () => {}
    
    // Callbacks
    onMeasure,
    onMarkerAdd,
    onMarkerRemove,
    onRotate,
    onPositionChange,
    onSnapToPoint, // Called when zero mark snaps to a point: (snapPoint) => {}
    onSnapToLine, // Called when ruler snaps to a line: (snapLine, rotation) => {}
    onClick,
    
    cursor = 'move',
    opacity = 1,
    
    // Style props (for visibility control, etc.)
    display,
    visibility
  } = props;

  // Constant for fixed marker ID
  const FIXED_MARKER_ID = 'fixed-marker-0'; // ID for the fixed marker at position 0
  
  // State
  const [currentRotation, setCurrentRotation] = React.useState(rotation);
  const [isRotating, setIsRotating] = React.useState(false);
  const [markers, setMarkers] = React.useState(() => {
    // Initialize with a fixed marker at zero mark (position = glass margin ratio from start edge)
    if (measurementMarkers.enabled) {
      return [{
        id: FIXED_MARKER_ID,
        position: GLASS_MARGIN_RATIO,
        fixed: true
      }];
    }
    return [];
  });
  const [draggingMarkerId, setDraggingMarkerId] = React.useState(null);
  const [currentPosition, setCurrentPosition] = React.useState(null); // Track dragged position
  const [nearestSnapPoint, setNearestSnapPoint] = React.useState(null); // Nearest snap point for zero mark
  const [nearestSnapLine, setNearestSnapLine] = React.useState(null); // Nearest snap line for ruler alignment
  const [isSnappedToPoint, setIsSnappedToPoint] = React.useState(false); // Track if snapped to a point
  const [isSnappedToLine, setIsSnappedToLine] = React.useState(false); // Track if snapped to a line
  const [isSnappedToCircle, setIsSnappedToCircle] = React.useState(false); // Track if snapped to circle area
  const [dragRenderTick, setDragRenderTick] = React.useState(0); // Bump to re-render during drag so marker follows mouse
  const [rulerLayoutVersion, setRulerLayoutVersion] = React.useState(0); // Bump when container mounted so snap useMemo can use DOM
  const containerRef = React.useRef(null);
  const positionRef = React.useRef(null); // Ref to track position for immediate access
  const draggingMarkerPositionRef = React.useRef(null); // { markerId, position } during drag - updated every move
  const markerDragListenersRef = React.useRef(null); // { onMove, onEnd } for synchronous add/remove
  const markerDragCtxRef = React.useRef(null); // Context for sync drag handler (rotation, length, etc.)
  const measurementMarkersRef = React.useRef(null); // Ref to MeasurementMarkers for imperative updateMarkerPosition during drag
  const markerDragRafIdRef = React.useRef(null); // rAF id for batching marker position updates during drag
  const markerDragPendingRef = React.useRef(null); // { markerId, position } pending apply in next frame
  const markerDragInProgressRef = React.useRef(false); // avoid double-start when pointerdown and touchstart both fire
  const markerDragRectRef = React.useRef(null); // Stable ruler rect for entire drag (set in rAF so first-drag sensitivity matches second)
  const snapLayoutBumpedRef = React.useRef(false); // So we only bump rulerLayoutVersion once when container is mounted

  // Page 2 step/state tracking so ruler re-renders when step changes (rotation handle visibility)
  // Page 2: actual viewport position of vertex C from DOM (so snap and marker align with triangle)
  const [page2VertexCFromDOM, setPage2VertexCFromDOM] = React.useState(null);
  const [page2StepState, setPage2StepState] = React.useState(() => {
    if (typeof window !== 'undefined' && currentPage === 2) {
      return { step: window.page2Step !== undefined ? window.page2Step : 1, state: window.page2State || 'C' };
    }
    return { step: 1, state: 'A' };
  });
  React.useEffect(() => {
    if (currentPage !== 2 && !(id && String(id) === 'page2-ruler')) return;
    const syncStep = () => {
      const step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
      const state = typeof window !== 'undefined' ? (window.page2State || 'C') : 'C';
      setPage2StepState(prev => (prev.step === step && prev.state === state ? prev : { step, state }));
    };
    syncStep();
    window.addEventListener('page2StepChanged', syncStep);
    window.addEventListener('pageStateChanged', syncStep);
    const interval = setInterval(syncStep, 150);
    return () => {
      window.removeEventListener('page2StepChanged', syncStep);
      window.removeEventListener('pageStateChanged', syncStep);
      clearInterval(interval);
    };
  }, [currentPage, id]);

  // Page 4: same as page 2 (exact replica)
  const [page4VertexCFromDOM, setPage4VertexCFromDOM] = React.useState(null);
  const [page4StepState, setPage4StepState] = React.useState(() => {
    if (typeof window !== 'undefined' && currentPage === 4) {
      return { step: window.page4Step !== undefined ? window.page4Step : 1, state: window.page4State || 'C' };
    }
    return { step: 1, state: 'C' };
  });
  React.useEffect(() => {
    if (currentPage !== 4 && !(id && String(id) === 'page4-ruler')) return;
    const syncStep = () => {
      const step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
      const state = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
      setPage4StepState(prev => (prev.step === step && prev.state === state ? prev : { step, state }));
    };
    syncStep();
    window.addEventListener('page4StepChanged', syncStep);
    window.addEventListener('page4StateChanged', syncStep);
    const interval = setInterval(syncStep, 150);
    return () => {
      window.removeEventListener('page4StepChanged', syncStep);
      window.removeEventListener('page4StateChanged', syncStep);
      clearInterval(interval);
    };
  }, [currentPage, id]);

  // Page 6: same as page 2/4 (exact replica - ruler flow)
  const [page6StepState, setPage6StepState] = React.useState(() => {
    if (typeof window !== 'undefined' && currentPage === 6) {
      return { step: window.page6Step !== undefined ? window.page6Step : 1, state: window.page6State || 'C' };
    }
    return { step: 1, state: 'C' };
  });
  React.useEffect(() => {
    if (currentPage !== 6 && !(id && String(id) === 'page6-ruler')) return;
    const syncStep = () => {
      const step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
      const state = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
      setPage6StepState(prev => (prev.step === step && prev.state === state ? prev : { step, state }));
    };
    syncStep();
    window.addEventListener('page6StepChanged', syncStep);
    window.addEventListener('page6StateChanged', syncStep);
    const interval = setInterval(syncStep, 150);
    return () => {
      window.removeEventListener('page6StepChanged', syncStep);
      window.removeEventListener('page6StateChanged', syncStep);
      clearInterval(interval);
    };
  }, [currentPage, id]);

  // Page 2: read vertex C viewport position from DOM so snap target and marker match the triangle
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page2-ruler')) {
      setPage2VertexCFromDOM(null);
      return;
    }
    const read = () => {
      const el = document.getElementById('page2-shape-display-vertex-2');
      if (!el) {
        setPage2VertexCFromDOM(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setPage2VertexCFromDOM({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };
    const t = requestAnimationFrame(read);
    const interval = setInterval(read, 400);
    return () => {
      cancelAnimationFrame(t);
      clearInterval(interval);
      setPage2VertexCFromDOM(null);
    };
  }, [id]);

  // Page 4: read vertex C from DOM (same as page 2)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page4-ruler')) {
      setPage4VertexCFromDOM(null);
      return;
    }
    const read = () => {
      const el = document.getElementById('page4-shape-display-vertex-2');
      if (!el) {
        setPage4VertexCFromDOM(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setPage4VertexCFromDOM({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };
    const t = requestAnimationFrame(read);
    const interval = setInterval(read, 400);
    return () => {
      cancelAnimationFrame(t);
      clearInterval(interval);
      setPage4VertexCFromDOM(null);
    };
  }, [id]);

  const [page6VertexCFromDOM, setPage6VertexCFromDOM] = React.useState(null);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page6-ruler')) {
      setPage6VertexCFromDOM(null);
      return;
    }
    const read = () => {
      const el = document.getElementById('page6-shape-display-vertex-2');
      if (!el) {
        setPage6VertexCFromDOM(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setPage6VertexCFromDOM({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };
    const t = requestAnimationFrame(read);
    const interval = setInterval(read, 400);
    return () => {
      cancelAnimationFrame(t);
      clearInterval(interval);
      setPage6VertexCFromDOM(null);
    };
  }, [id]);

  // Inject blink keyframes for rotation handle (step 2) and movable marker (step 3)
  React.useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById('ruler-rotation-handle-blink-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'ruler-rotation-handle-blink-keyframes';
    style.textContent = `
      @keyframes rulerRotationHandleBlink {
        0%, 100% { opacity: 1; background-color: rgba(59, 130, 246, 0.9); }
        50% { opacity: 0.6; background-color: rgba(147, 197, 253, 0.95); }
      }
      @keyframes rulerMovableMarkerBlink {
        0%, 100% { opacity: 1; fill: rgba(249, 115, 22, 1); }
        50% { opacity: 0.7; fill: rgba(251, 146, 60, 0.95); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('ruler-rotation-handle-blink-keyframes');
      if (el) el.remove();
    };
  }, []);

  // Effective rotatability: for page2-ruler and page4-ruler in step 2, always allow rotation (read window every render)
  const isPage2Ruler = (id && String(id) === 'page2-ruler') || currentPage === 2;
  const isPage4Ruler = (id && String(id) === 'page4-ruler') || currentPage === 4;
  const isPage6Ruler = (id && String(id) === 'page6-ruler') || currentPage === 6;
  const page2Step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
  const page2State = typeof window !== 'undefined' ? (window.page2State || 'C') : 'C';
  const page4Step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
  const page4State = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
  const page6Step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
  const page6State = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
  const effectiveIsRotatable = (isPage2Ruler && ((page2State === 'A' && page2Step === 2) || (page2State === 'C' && page2Step === 2) || (page2State === 'B' && page2Step === 2)))
    || (isPage4Ruler && ((page4State === 'A' && page4Step === 2) || (page4State === 'C' && page4Step === 2) || (page4State === 'B' && page4Step === 2)))
    || (isPage6Ruler && ((page6State === 'A' && page6Step === 2) || (page6State === 'C' && page6Step === 2) || (page6State === 'B' && page6Step === 2)))
    ? true
    : (currentPage === 2 && typeof window !== 'undefined' && window.page2ProtractorFlowConfig?.helpers
        ? (window.page2ProtractorFlowConfig.helpers.getStepConfig(page2State, page2Step)?.rulerRotatable ?? isRotatable)
        : (currentPage === 4 && typeof window !== 'undefined' && window.page2ProtractorFlowConfig?.helpers
            ? (window.page2ProtractorFlowConfig.helpers.getStepConfig(page4State, page4Step)?.rulerRotatable ?? isRotatable)
            : isRotatable));
  const effectiveShowRotationHandle = (isPage2Ruler && ((page2State === 'A' && page2Step === 2) || (page2State === 'C' && page2Step === 2) || (page2State === 'B' && page2Step === 2)))
    || (isPage4Ruler && ((page4State === 'A' && page4Step === 2) || (page4State === 'C' && page4Step === 2) || (page4State === 'B' && page4Step === 2)))
    || (isPage6Ruler && ((page6State === 'A' && page6Step === 2) || (page6State === 'C' && page6Step === 2) || (page6State === 'B' && page6Step === 2)))
    ? true
    : (currentPage === 2 && typeof window !== 'undefined' && window.page2ProtractorFlowConfig?.helpers
        ? (window.page2ProtractorFlowConfig.helpers.getStepConfig(page2State, page2Step)?.rulerRotatable ?? showRotationHandle)
        : (currentPage === 4 && typeof window !== 'undefined' && window.page2ProtractorFlowConfig?.helpers
            ? (window.page2ProtractorFlowConfig.helpers.getStepConfig(page4State, page4Step)?.rulerRotatable ?? showRotationHandle)
            : showRotationHandle));

  // Process GC units and ruler dimensions in pixels (defined early so no hook reads lengthPixels before init)
  const processGcProperty = React.useCallback((value, propertyName = 'width') => {
    if (typeof value === 'number') return value;
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      const result = GridCellFontUtils.processGcProperty(value, propertyName);
      if (typeof result === 'string') {
        const numValue = parseFloat(result.replace('px', ''));
        if (!isNaN(numValue)) return numValue;
      }
      if (typeof result === 'number' && !isNaN(result)) {
        return result;
      }
    }
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));
      if (isNaN(gcValue)) return 100;
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      const pixels = (gcValue / gridSystemCols) * viewportWidth;
      return !isNaN(pixels) ? pixels : 100;
    }
    if (typeof value === 'string') {
      if (value.endsWith('cm')) return parseFloat(value) * 10;
      if (value.endsWith('mm')) return parseFloat(value);
      if (value.endsWith('in')) return parseFloat(value) * 25.4;
    }
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : 100;
  }, []);

  const lengthPixels = React.useMemo(() => {
    const processed = processGcProperty(length, 'width');
    return !isNaN(processed) && processed > 0 ? processed : 300;
  }, [length, processGcProperty]);

  const widthPixels = React.useMemo(() => {
    const processed = processGcProperty(width, 'width');
    return !isNaN(processed) && processed > 0 ? processed : 30;
  }, [width, processGcProperty]);

  // Page 2 step 3+: show measurement markers and distance display (config is built once at init, so override here)
  // Prefer page2StepState/page4StepState/page6StepState (updated by step events) so we recalc as soon as ruler re-renders
  const stepForMarkers = (id && String(id) === 'page6-ruler')
    ? (page6StepState?.step ?? (typeof window !== 'undefined' ? window.page6Step : 1) ?? 1)
    : (id && String(id) === 'page4-ruler')
    ? (page4StepState?.step ?? (typeof window !== 'undefined' ? window.page4Step : 1) ?? 1)
    : (page2StepState?.step ?? (typeof window !== 'undefined' ? window.page2Step : 1) ?? 1);
  const isPage2Step3OrMore = stepForMarkers >= 3 && (currentPage === 2 || (id && String(id) === 'page2-ruler'));
  const isPage4Step3OrMore = stepForMarkers >= 3 && (currentPage === 4 || (id && String(id) === 'page4-ruler'));
  const isPage6Step3OrMore = stepForMarkers >= 3 && (currentPage === 6 || (id && String(id) === 'page6-ruler'));
  const effectiveMeasurementMarkers = React.useMemo(() => {
    const isPage2Or4Or6Step3 = isPage2Step3OrMore || isPage4Step3OrMore || isPage6Step3OrMore;
    if (isPage2Or4Or6Step3) {
      const isP4 = isPage4Step3OrMore;
      const isP6 = isPage6Step3OrMore;
      const snapTolerance = measurementMarkers.endMarkerSnapTolerance ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapTolerance : isP4 ? window.page4EndMarkerSnapTolerance : window.page2EndMarkerSnapTolerance) : null) ?? 0.25;
      const snapAtPoint = measurementMarkers.endMarkerSnapAtPoint ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapAtPoint : isP4 ? window.page4EndMarkerSnapAtPoint : window.page2EndMarkerSnapAtPoint) : null);
      const lengthAC_px = measurementMarkers.endMarkerSnapLengthAC_px ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapLengthAC_px : isP4 ? window.page4EndMarkerSnapLengthAC_px : window.page2EndMarkerSnapLengthAC_px) : null);
      const snapPosition = measurementMarkers.endMarkerSnapPosition ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapPosition : isP4 ? window.page4EndMarkerSnapPosition : window.page2EndMarkerSnapPosition) : null);
      const snapAtDistance = measurementMarkers.endMarkerSnapAtDistance ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapAtDistance : isP4 ? window.page4EndMarkerSnapAtDistance : window.page2EndMarkerSnapAtDistance) : null);
      return {
        ...measurementMarkers,
        enabled: true,
        showDistance: true,
        allowClick: true,
        allowDrag: true,
        measurementDisplayMode: 'readingFromStart',
        fixedMarkerColor: measurementMarkers.fixedMarkerColor ?? '#3b82f6',
        color: '#f97316',
        endMarkerSnapPosition: snapPosition,
        endMarkerSnapLengthAC_px: lengthAC_px,
        endMarkerSnapTolerance: snapTolerance,
        endMarkerSnapAtPoint: snapAtPoint,
        endMarkerSnapAtDistance: snapAtDistance,
        distanceUnit: 'cm',
        distancePrecision: 1,
        distanceLeastCount: 0.2
      };
    }
    return measurementMarkers;
  }, [measurementMarkers, isPage2Step3OrMore, isPage4Step3OrMore, isPage6Step3OrMore]);

  // When measurement markers become enabled (e.g. page2 step 3), ensure fixed + one movable marker exist so user can drag
  // Movable marker starts on top of the fixed marker (at zero mark) and cannot move left of it
  React.useEffect(() => {
    if (effectiveMeasurementMarkers.enabled && markers.length === 0) {
      setMarkers([
        { id: FIXED_MARKER_ID, position: GLASS_MARGIN_RATIO, fixed: true },
        { id: 'movable-marker-1', position: GLASS_MARGIN_RATIO, fixed: false }
      ]);
    }
  }, [effectiveMeasurementMarkers.enabled, markers.length]);

  // When entering step 3 (any state A/B/C), reset movable marker to start so user must drag to snap (avoids auto-complete)
  const prevPage2StepRef = React.useRef(typeof window !== 'undefined' ? window.page2Step : 1);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page2-ruler')) return;
    const step = window.page2Step !== undefined ? window.page2Step : 1;
    const prevStep = prevPage2StepRef.current;
    prevPage2StepRef.current = step;
    if (step === 3 && prevStep !== 3 && markers.length >= 2) {
      setMarkers(prev => prev.map(m => (m.fixed || m.id === FIXED_MARKER_ID) ? m : { ...m, position: GLASS_MARGIN_RATIO }));
    }
  }, [id, markers.length, page2StepState?.step]);

  const prevPage4StepRef = React.useRef(typeof window !== 'undefined' ? window.page4Step : 1);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page4-ruler')) return;
    const step = window.page4Step !== undefined ? window.page4Step : 1;
    const prevStep = prevPage4StepRef.current;
    prevPage4StepRef.current = step;
    if (step === 3 && prevStep !== 3 && markers.length >= 2) {
      setMarkers(prev => prev.map(m => (m.fixed || m.id === FIXED_MARKER_ID) ? m : { ...m, position: GLASS_MARGIN_RATIO }));
    }
  }, [id, markers.length, page4StepState?.step]);

  const prevPage6StepRef = React.useRef(typeof window !== 'undefined' ? window.page6Step : 1);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page6-ruler')) return;
    const step = window.page6Step !== undefined ? window.page6Step : 1;
    const prevStep = prevPage6StepRef.current;
    prevPage6StepRef.current = step;
    if (step === 3 && prevStep !== 3 && markers.length >= 2) {
      setMarkers(prev => prev.map(m => (m.fixed || m.id === FIXED_MARKER_ID) ? m : { ...m, position: GLASS_MARGIN_RATIO }));
    }
  }, [id, markers.length, page6StepState?.step]);

  // When returning to step 1 (any state), reset scale to original position and orientation
  const prevPage2StepForResetRef = React.useRef(typeof window !== 'undefined' ? window.page2Step : 1);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page2-ruler')) return;
    const step = window.page2Step !== undefined ? window.page2Step : 1;
    const prevStep = prevPage2StepForResetRef.current;
    prevPage2StepForResetRef.current = step;
    if (step === 1 && prevStep !== 1) {
      setCurrentPosition(null);
      setCurrentRotation(rotation);
      setIsSnappedToPoint(false);
      setIsSnappedToLine(false);
      setIsSnappedToCircle(false);
      currentRotationRef.current = rotation;
      positionRef.current = null;
      if (markers.length >= 2) {
        setMarkers(prev => prev.map(m => (m.fixed || m.id === FIXED_MARKER_ID) ? m : { ...m, position: GLASS_MARGIN_RATIO }));
      }
      if (containerRef.current) {
        containerRef.current.style.setProperty('transform', `translate(-50%, -50%) rotate(${rotation}deg)`, 'important');
      }
    }
  }, [id, page2StepState?.step, rotation, markers.length]);

  const prevPage4StepForResetRef = React.useRef(typeof window !== 'undefined' ? window.page4Step : 1);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page4-ruler')) return;
    const step = window.page4Step !== undefined ? window.page4Step : 1;
    const prevStep = prevPage4StepForResetRef.current;
    prevPage4StepForResetRef.current = step;
    if (step === 1 && prevStep !== 1) {
      setCurrentPosition(null);
      setCurrentRotation(rotation);
      setIsSnappedToPoint(false);
      setIsSnappedToLine(false);
      setIsSnappedToCircle(false);
      currentRotationRef.current = rotation;
      positionRef.current = null;
      if (markers.length >= 2) {
        setMarkers(prev => prev.map(m => (m.fixed || m.id === FIXED_MARKER_ID) ? m : { ...m, position: GLASS_MARGIN_RATIO }));
      }
      if (containerRef.current) {
        containerRef.current.style.setProperty('transform', `translate(-50%, -50%) rotate(${rotation}deg)`, 'important');
      }
    }
  }, [id, page4StepState?.step, rotation, markers.length]);

  const prevPage6StepForResetRef = React.useRef(typeof window !== 'undefined' ? window.page6Step : 1);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page6-ruler')) return;
    const step = window.page6Step !== undefined ? window.page6Step : 1;
    const prevStep = prevPage6StepForResetRef.current;
    prevPage6StepForResetRef.current = step;
    if (step === 1 && prevStep !== 1) {
      setCurrentPosition(null);
      setCurrentRotation(rotation);
      setIsSnappedToPoint(false);
      setIsSnappedToLine(false);
      setIsSnappedToCircle(false);
      currentRotationRef.current = rotation;
      positionRef.current = null;
      if (markers.length >= 2) {
        setMarkers(prev => prev.map(m => (m.fixed || m.id === FIXED_MARKER_ID) ? m : { ...m, position: GLASS_MARGIN_RATIO }));
      }
      if (containerRef.current) {
        containerRef.current.style.setProperty('transform', `translate(-50%, -50%) rotate(${rotation}deg)`, 'important');
      }
    }
  }, [id, page6StepState?.step, rotation, markers.length]);

  // Calculate initial position from coordinates or centerPoint (must be before resolvedEndMarkerSnapPosition which uses position)
  // Grid is 0-based: (x/gridCols)*100 = left%, (y/gridRows)*100 = top%. For [x1,y1,x2,y2] use center point.
  const rulerInitialPosition = React.useMemo(() => {
    if (centerPoint) {
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const xPercent = (centerPoint.col / gridCols) * 100;
      const yPercent = (centerPoint.row / gridRows) * 100;
      
      return {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
    } else if (coordinates && Array.isArray(coordinates) && coordinates.length >= 2) {
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      const x = coordinates.length >= 4
        ? (coordinates[0] + coordinates[2]) / 2
        : coordinates[0];
      const y = coordinates.length >= 4
        ? (coordinates[1] + coordinates[3]) / 2
        : coordinates[1];
      const xPercent = (x / gridCols) * 100;
      const yPercent = (y / gridRows) * 100;
      
      return {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
    }
    return null;
  }, [coordinates, centerPoint]);

  // Use current position if set, otherwise use initial position
  const position = currentPosition || rulerInitialPosition;

  // Calculate zero mark position offset based on rotation (must be before resolvedEndMarkerSnapPosition)
  const getZeroMarkOffset = React.useCallback((rot) => {
    const rotationRad = (rot * Math.PI) / 180;
    const halfLength = lengthPixels / 2;
    const offset = {
      x: -halfLength * Math.cos(rotationRad),
      y: -halfLength * Math.sin(rotationRad)
    };
    return offset;
  }, [lengthPixels]);

  // Resolved snap position (0-1): endMarkerSnapAtDistance overrides vertex/point; else startEdgeToVertexC_px / lengthPixels, etc.
  const resolvedEndMarkerSnapPosition = React.useMemo(() => {
    const isP4 = id && String(id) === 'page4-ruler';
    const isP6 = id && String(id) === 'page6-ruler';
    const windowSnapAtDistance = typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapAtDistance : isP4 ? window.page4EndMarkerSnapAtDistance : window.page2EndMarkerSnapAtDistance) : null;
    const snapAtDistance = (isP6 && windowSnapAtDistance) ? windowSnapAtDistance : (isP4 && windowSnapAtDistance) ? windowSnapAtDistance : ((id && String(id) === 'page2-ruler' && windowSnapAtDistance) ? windowSnapAtDistance : (effectiveMeasurementMarkers.endMarkerSnapAtDistance ?? windowSnapAtDistance));
    if (snapAtDistance && typeof snapAtDistance.value === 'number' && snapAtDistance.unit) {
      const dims = RulerUtils.getRulerDimensions(rulerType, length);
      const valueInRulerUnits = RulerUtils.convertUnits(snapAtDistance.value, snapAtDistance.unit, dims.unit);
      const distanceFromZero = valueInRulerUnits; // distance from zero mark in ruler units
      const position = GLASS_MARGIN_RATIO + (distanceFromZero / dims.lengthInUnits);
      return Math.max(0, Math.min(1, position));
    }
    if (lengthPixels <= 0) return effectiveMeasurementMarkers.endMarkerSnapPosition ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapPosition : isP4 ? window.page4EndMarkerSnapPosition : window.page2EndMarkerSnapPosition) : null);
    const vertexC = isP6 ? (page6VertexCFromDOM ?? (typeof window !== 'undefined' ? window.page6VertexCPosPx : null)) : isP4 ? (page4VertexCFromDOM ?? (typeof window !== 'undefined' ? window.page4VertexCPosPx : null)) : (page2VertexCFromDOM ?? (typeof window !== 'undefined' ? window.page2VertexCPosPx : null));
    if (position && vertexC && typeof vertexC.x === 'number' && typeof vertexC.y === 'number') {
      const vw = typeof window !== 'undefined' ? window.innerWidth || 1600 : 1600;
      const vh = typeof window !== 'undefined' ? window.innerHeight || 900 : 900;
      const centerX = (parseFloat(String(position.left)) / 100) * vw;
      const centerY = (parseFloat(String(position.top)) / 100) * vh;
      let rot = currentRotation;
      if (containerRef.current && typeof window !== 'undefined') {
        const style = window.getComputedStyle(containerRef.current);
        const transform = style.transform;
        if (transform && transform !== 'none') {
          const m = transform.match(/matrix\(([^)]+)\)/);
          if (m) {
            const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
            if (parts.length >= 4) rot = Math.atan2(parts[1], parts[0]) * (180 / Math.PI);
          }
        }
      }
      const rotationRad = (rot * Math.PI) / 180;
      const directionX = Math.cos(rotationRad);
      const directionY = Math.sin(rotationRad);
      const zeroOffset = getZeroMarkOffset(rot);
      const halfWidth = widthPixels / 2;
      // Same start as panel: rulerEdgesScreenPx.start = zeroMark - glassMargin = center + zeroOffset + halfWidth*(-directionY, directionX)
      const startX = centerX + zeroOffset.x + halfWidth * (-directionY);
      const startY = centerY + zeroOffset.y + halfWidth * directionX;
      const dx = vertexC.x - startX;
      const dy = vertexC.y - startY;
      const startEdgeToVertexC_px = Math.sqrt(dx * dx + dy * dy);
      // Place marker 15/300 (glass margin) further so it aligns with scale: position = distance/lengthPixels + 0.05
      const basePosition = startEdgeToVertexC_px / lengthPixels;
      return Math.max(0, Math.min(1, basePosition + GLASS_MARGIN_RATIO));
    }
    const lengthAC_px = effectiveMeasurementMarkers.endMarkerSnapLengthAC_px ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapLengthAC_px : isP4 ? window.page4EndMarkerSnapLengthAC_px : window.page2EndMarkerSnapLengthAC_px) : null);
    if (typeof lengthAC_px === 'number' && lengthAC_px > 0) {
      const glassMargin = lengthPixels * GLASS_MARGIN_RATIO;
      const distanceFromStartEdgeToC = glassMargin + lengthAC_px;
      return Math.max(0, Math.min(1, distanceFromStartEdgeToC / lengthPixels));
    }
    return effectiveMeasurementMarkers.endMarkerSnapPosition ?? (typeof window !== 'undefined' ? (isP6 ? window.page6EndMarkerSnapPosition : isP4 ? window.page4EndMarkerSnapPosition : window.page2EndMarkerSnapPosition) : null);
  }, [id, effectiveMeasurementMarkers.endMarkerSnapAtDistance, effectiveMeasurementMarkers.endMarkerSnapLengthAC_px, effectiveMeasurementMarkers.endMarkerSnapPosition, lengthPixels, length, rulerType, position, currentRotation, widthPixels, getZeroMarkOffset, rulerLayoutVersion, page2VertexCFromDOM, page4VertexCFromDOM, page6VertexCFromDOM, page2StepState?.step, page4StepState?.step, page6StepState?.step]);

  // Get grid dimensions for snap calculations
  const gridRows = React.useMemo(() => {
    return typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
  }, []);
  
  const gridCols = React.useMemo(() => {
    return typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
  }, []);

  // Store initial drag offset to prevent position jumps
  const dragOffsetRef = React.useRef({ x: 0, y: 0 });
  const isDraggingRef = React.useRef(false);
  const hasMovedDuringDragRef = React.useRef(false); // Track if mouse actually moved during drag
  const wrapperDimensionsRef = React.useRef({ width: 0, height: 0 }); // Cache wrapper dimensions during drag
  const currentRotationRef = React.useRef(currentRotation); // Cache rotation for interval access
  
  // Sync rotation ref with state
  React.useEffect(() => {
    currentRotationRef.current = currentRotation;
  }, [currentRotation]);

  // Emit initial zero mark position on mount and when position/rotation changes (useLayoutEffect so animated dot can read it before paint)
  React.useLayoutEffect(() => {
      const zeroOffset = getZeroMarkOffset(currentRotation);
      const glassMargin = lengthPixels * 0.05;
    const halfWidth = widthPixels / 2;
      const rotationRad = (currentRotation * Math.PI) / 180;
      const directionX = Math.cos(rotationRad);
      const directionY = Math.sin(rotationRad);

    const emitZeroMarkPosition = (zeroMarkPos) => {
      if (typeof window === 'undefined') return;
        window.rulerZeroMarkPosition = zeroMarkPos;
      const viewportWidth = window.innerWidth || 1600;
      const viewportHeight = window.innerHeight || 900;
        const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      window.rulerZeroMarkPositionGrid = {
          x: (zeroMarkPos.x / viewportWidth) * gridCols,
          y: (zeroMarkPos.y / viewportHeight) * gridRows
      };
      window.dispatchEvent(new CustomEvent('rulerPositionChanged', {
        detail: { centerPos: { x: zeroMarkPos.x - zeroOffset.x, y: zeroMarkPos.y - zeroOffset.y }, zeroMarkPos, rotation: currentRotation }
      }));
    };

    // Emit immediately from position % (same math as containerStyle) so animated dot is correct on first paint.
    // Compute first, then set (never clear-then-set so animated dot never sees undefined on load).
    let centerXPercent = null;
    let centerYPercent = null;
    if (position && typeof position.left !== 'undefined' && typeof position.top !== 'undefined') {
      centerXPercent = parseFloat(String(position.left));
      centerYPercent = parseFloat(String(position.top));
    } else if (position?.css && position.css.left != null && position.css.top != null) {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      centerXPercent = parseFloat(String(position.css.left)) + (lengthPixels / 2 / vw) * 100;
      centerYPercent = parseFloat(String(position.css.top)) + (widthPixels / 2 / vh) * 100;
    }
    if (centerXPercent != null && centerYPercent != null && !Number.isNaN(centerXPercent) && !Number.isNaN(centerYPercent)) {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const centerX = (centerXPercent / 100) * vw;
      const centerY = (centerYPercent / 100) * vh;
      const zeroMarkPosFromPercent = {
        x: centerX + zeroOffset.x + glassMargin * directionX + halfWidth * (-directionY),
        y: centerY + zeroOffset.y + glassMargin * directionY + halfWidth * directionX
      };
      emitZeroMarkPosition(zeroMarkPosFromPercent);
    } else if (typeof window !== 'undefined' && id && String(id) === 'page2-ruler') {
      window.rulerZeroMarkPosition = undefined;
    }

    // Refine with DOM position after layout is stable; only overwrite if result is valid (avoids wrong rect on first frames).
    const calculateAndEmitPosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const zeroMarkPos = {
        x: centerX + zeroOffset.x + glassMargin * directionX + halfWidth * (-directionY),
        y: centerY + zeroOffset.y + glassMargin * directionY + halfWidth * directionX
      };
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const isValid = zeroMarkPos.y >= 0 && zeroMarkPos.y <= vh && zeroMarkPos.x >= 0 && zeroMarkPos.x <= vw;
      if (typeof window !== 'undefined' && isValid) {
        emitZeroMarkPosition(zeroMarkPos);
        const viewportWidth = window.innerWidth || 1600;
        const viewportHeight = window.innerHeight || 900;
        const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        console.log('📍 [Ruler] Zero mark position (pixels and grid):', {
          pixels: zeroMarkPos,
          grid: window.rulerZeroMarkPositionGrid,
          viewport: { width: viewportWidth, height: viewportHeight },
          gridDimensions: { cols: gridCols, rows: gridRows }
        });
        // Calculate and publish major tick mark positions along the edge of the ruler
        const calculateMajorTickPositions = () => {
          if (!containerRef.current) return;
          
          const rect = containerRef.current.getBoundingClientRect();
          const rulerCenterX = rect.left + rect.width / 2;
          const rulerCenterY = rect.top + rect.height / 2;
          
          // Get tick positions
          const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
          const ticks = RulerUtils.getTickPositions(
            lengthPixels,
            rulerType,
            majorTickInterval,
            minorTickInterval,
            dimensions
          );
          
          // Filter to only major ticks
          const majorTicks = ticks.filter(tick => tick.isMajor);
          
          // Calculate screen coordinates for each major tick
          const majorTickScreenPositions = majorTicks.map(tick => {
            // Tick position along ruler: 0 (at zero mark) to 1 (at end)
            // Distance from zero mark along ruler length
            const distanceFromZeroMark = tick.position * lengthPixels;
            
            // Calculate tick position relative to ruler center
            // Zero mark is at: center - zeroOffset
            // Tick is at: zeroMark + distance along ruler direction
            // IMPORTANT: Account for glass margin (5% on each side)
            const glassMargin = lengthPixels * 0.05;
            const zeroOffset = getZeroMarkOffset(currentRotation);
            const rotationRad = (currentRotation * Math.PI) / 180;
            
            // Direction vector along the ruler (from zero mark to end)
            const directionX = Math.cos(rotationRad);
            const directionY = Math.sin(rotationRad);
            
            // Add glass margin offset: zero mark is offset by glassMargin from the ruler's visual edge
            const glassMarginOffsetX = glassMargin * directionX;
            const glassMarginOffsetY = glassMargin * directionY;
            
            // Tick position relative to ruler center
            const tickOffsetFromCenter = {
              x: zeroOffset.x + glassMarginOffsetX + distanceFromZeroMark * directionX,
              y: zeroOffset.y + glassMarginOffsetY + distanceFromZeroMark * directionY
            };
            
            // Tick position on the edge: offset by half width perpendicular to ruler direction
            const perpendicularX = -directionY; // Perpendicular to direction
            const perpendicularY = directionX;
            const majorTickLength = 8; // Major tick length in pixels
            
            // Offset the tick base from the edge by majorTickLength (8px)
            // So the tick base is inset from the physical edge
            const edgeOffset = {
              x: perpendicularX * (widthPixels / 2) - perpendicularX * majorTickLength,
              y: perpendicularY * (widthPixels / 2) - perpendicularY * majorTickLength
            };
            
            // Tick marks extend inward from the base by majorTickLength (8px)
            const tickTopOffset = {
              x: -perpendicularX * majorTickLength, // Inward from base
              y: -perpendicularY * majorTickLength
            };
            
            // Final tick position in screen coordinates (at base, which is now inset from edge)
            const tickBasePos = {
              x: rulerCenterX + tickOffsetFromCenter.x + edgeOffset.x,
              y: rulerCenterY + tickOffsetFromCenter.y + edgeOffset.y
            };
            
            // Top of tick mark (where it ends, further inward)
            const tickTopPos = {
              x: tickBasePos.x + tickTopOffset.x,
              y: tickBasePos.y + tickTopOffset.y
            };
            
            const tickScreenPos = {
              x: tickBasePos.x, // Base position (inset from edge by majorTickLength)
              y: tickBasePos.y,
              topX: tickTopPos.x, // Top position (inset from edge by 2*majorTickLength)
              topY: tickTopPos.y,
              value: tick.value,
              label: tick.label,
              unit: tick.unit,
              tickLength: majorTickLength,
              tickInset: majorTickLength // Distance from edge to base
            };
            
            return tickScreenPos;
          });
          
          // Store and log major tick positions
          window.rulerMajorTickPositions = majorTickScreenPositions;
          
          // Calculate the 4 corners of the ruler rectangle
          const rotationRad = (currentRotation * Math.PI) / 180;
          const cos = Math.cos(rotationRad);
          const sin = Math.sin(rotationRad);
          
          // Half dimensions
          const halfLength = lengthPixels / 2;
          const halfWidth = widthPixels / 2;
          
          // Corner positions relative to center (before rotation)
          const cornersRelative = [
            { x: -halfLength, y: -halfWidth }, // Top-left (from ruler perspective)
            { x: -halfLength, y: +halfWidth }, // Bottom-left
            { x: +halfLength, y: -halfWidth }, // Top-right
            { x: +halfLength, y: +halfWidth }  // Bottom-right
          ];
          
          // Rotate corners and add center position
          const corners = cornersRelative.map(corner => {
            const rotatedX = corner.x * cos - corner.y * sin;
            const rotatedY = corner.x * sin + corner.y * cos;
            return {
              x: rulerCenterX + rotatedX,
              y: rulerCenterY + rotatedY
            };
          });
          
          // Define edges (lines connecting corners)
          // Edge order: top, right, bottom, left (from ruler's perspective)
          const edges = [
            {
              name: 'top',
              start: corners[0], // Top-left
              end: corners[2]    // Top-right
            },
            {
              name: 'right',
              start: corners[2], // Top-right
              end: corners[3]    // Bottom-right
            },
            {
              name: 'bottom',
              start: corners[3], // Bottom-right
              end: corners[1]   // Bottom-left
            },
            {
              name: 'left',
              start: corners[1], // Bottom-left
              end: corners[0]   // Top-left
            }
          ];
          
          // Also convert to grid coordinates
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          
          const edgesGrid = edges.map(edge => ({
            name: edge.name,
            start: {
              x: (edge.start.x / viewportWidth) * gridCols,
              y: (edge.start.y / viewportHeight) * gridRows
            },
            end: {
              x: (edge.end.x / viewportWidth) * gridCols,
              y: (edge.end.y / viewportHeight) * gridRows
            }
          }));
          
          console.log('📏 [Ruler] Major tick mark positions along edge:', {
            count: majorTickScreenPositions.length,
            ticks: majorTickScreenPositions,
            rulerCenter: { x: rulerCenterX, y: rulerCenterY },
            zeroMarkPos: zeroMarkPos,
            rotation: currentRotation,
            lengthPixels,
            widthPixels,
            majorTickInterval,
            corners: {
              pixels: corners,
              grid: corners.map(corner => ({
                x: (corner.x / viewportWidth) * gridCols,
                y: (corner.y / viewportHeight) * gridRows
              }))
            },
            edges: {
              pixels: edges,
              grid: edgesGrid
            }
          });
        };
        
        // Calculate tick positions after position is set
        calculateMajorTickPositions();
        
        // Event already dispatched by emitZeroMarkPosition(zeroMarkPos) above
        
        // console.log('📍 [Ruler] Emitted initial zero mark position (from DOM):', {
        //   zeroMarkPos,
        //   centerX,
        //   centerY,
        //   rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
        //   zeroOffset,
        //   cssPosition: { left: position.left, top: position.top }
        // });
      }
    };
    
    // Refine with DOM when layout is stable. Emit at 120ms and again at 350ms so animated dot gets correct "from" on load.
    requestAnimationFrame(() => {
      requestAnimationFrame(calculateAndEmitPosition);
    });
    const timeout120 = setTimeout(calculateAndEmitPosition, 120);
    const timeout350 = setTimeout(calculateAndEmitPosition, 350);
    // So snap useMemo can use DOM center/rotation: bump once when container is mounted (page2/page4/page6-ruler)
    if (containerRef.current && (id && (String(id) === 'page2-ruler' || String(id) === 'page4-ruler' || String(id) === 'page6-ruler')) && !snapLayoutBumpedRef.current) {
      snapLayoutBumpedRef.current = true;
      setRulerLayoutVersion((v) => v + 1);
    }
    return () => {
      clearTimeout(timeout120);
      clearTimeout(timeout350);
      if (typeof window !== 'undefined' && id && (String(id) === 'page2-ruler' || String(id) === 'page4-ruler' || String(id) === 'page6-ruler')) {
        window.rulerZeroMarkPosition = undefined;
      }
    };
  }, [position, currentRotation, getZeroMarkOffset, lengthPixels, widthPixels, rulerType, majorTickInterval, minorTickInterval, length, id]);

  // Handle position change from drag with snap detection
  const handlePositionChange = React.useCallback((id, pos, skipDragOffset = false) => {
    // console.log('🔵 [Ruler] handlePositionChange called:', {
    //   id,
    //   pos,
    //   skipDragOffset,
    //   dragOffset: dragOffsetRef.current,
    //   currentRotation,
    //   isDragging: isDraggingRef.current,
    //   currentPosition: positionRef.current,
    //   lengthPixels,
    //   widthPixels
    // });
    
    if (pos && typeof pos === 'object' && 'x' in pos && 'y' in pos) {
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      
      // console.log('📐 [Ruler] Viewport dimensions:', { viewportWidth, viewportHeight });
      
      // Apply drag offset to maintain relative position (unless already applied)
      const adjustedPos = skipDragOffset ? pos : {
        x: pos.x - dragOffsetRef.current.x,
        y: pos.y - dragOffsetRef.current.y
      };
      
      // console.log('🔄 [Ruler] Position calculations:', {
      //   incomingPos: pos,
      //   skipDragOffset,
      //   dragOffset: dragOffsetRef.current,
      //   adjustedPos
      // });
      
      // Zero mark = outer side of zero tick (on the ruler edge, not centerline)
      const zeroOffset = getZeroMarkOffset(currentRotation);
      const glassMargin = lengthPixels * 0.05;
      const halfWidth = widthPixels / 2;
      const rotationRad = (currentRotation * Math.PI) / 180;
      const directionX = Math.cos(rotationRad);
      const directionY = Math.sin(rotationRad);
      const zeroMarkPos = {
        x: adjustedPos.x + zeroOffset.x + glassMargin * directionX + halfWidth * (-directionY),
        y: adjustedPos.y + zeroOffset.y + glassMargin * directionY + halfWidth * directionX
      };
      
      // console.log('📍 [Ruler] Zero mark calculations:', {
      //   zeroOffset,
      //   adjustedPos,
      //   zeroMarkPos
      // });
      
      // IMPORTANT: When centerOnMouse is false, Draggable positions based on top-left corner
      // But we use transform: translate(-50%, -50%) which makes left/top represent the center
      // So we need to convert: if Draggable gives us top-left, we need to add half dimensions to get center
      // But actually, since we're already receiving centerPos from onDragMove, pos should already be center
      // The issue is that finalPos is used for the CSS left/top, which with translate(-50%, -50%) represents center
      // So finalPos should be the center position in pixels
      let finalPos = adjustedPos; // Use adjustedPos (which is the center position)
      let snappedToPoint = false;
      let snappedToLine = false;
      let snappedToCircle = false;
      
      // Page 2 / Page 4 step 1: use window circle snap target so State A (vertex A) snap works without re-render
      if (id && String(id) === 'page2-ruler' && typeof window !== 'undefined' && typeof window.updatePage2RulerSnapWindowVars === 'function') {
        window.updatePage2RulerSnapWindowVars();
      }
      if (id && String(id) === 'page4-ruler' && typeof window !== 'undefined' && typeof window.updatePage4RulerSnapWindowVars === 'function') {
        window.updatePage4RulerSnapWindowVars();
      }
      if (id && String(id) === 'page6-ruler' && typeof window !== 'undefined' && typeof window.updatePage6RulerSnapWindowVars === 'function') {
        window.updatePage6RulerSnapWindowVars();
      }
      const effectiveCircleSnapTarget = (id && String(id) === 'page6-ruler' && typeof window !== 'undefined' && window.page6CircleSnapTarget)
        ? window.page6CircleSnapTarget
        : (id && String(id) === 'page4-ruler' && typeof window !== 'undefined' && window.page4CircleSnapTarget)
        ? window.page4CircleSnapTarget
        : (id && String(id) === 'page2-ruler' && typeof window !== 'undefined' && window.page2CircleSnapTarget)
          ? window.page2CircleSnapTarget
          : circleSnapTarget;
      
      const page2State = typeof window !== 'undefined' ? (window.page2State || 'C') : 'C';
      const page2Step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
      const page4State = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
      const page4Step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
      let circleScreenX, circleScreenY;
      let debugPath = 'none';
      if (id && String(id) === 'page2-ruler' && (page2Step === 1 || page2Step === 2)) {
        const vertexElA = typeof document !== 'undefined' ? document.getElementById('page2-shape-display-vertex-0') : null;
        const vertexElB = typeof document !== 'undefined' ? document.getElementById('page2-shape-display-vertex-1') : null;
        if (page2State === 'A' && vertexElA) {
          const r = vertexElA.getBoundingClientRect();
          circleScreenX = r.left + r.width / 2;
          circleScreenY = r.top + r.height / 2;
        } else if ((page2State === 'B' || page2State === 'C') && vertexElB) {
          const r = vertexElB.getBoundingClientRect();
          circleScreenX = r.left + r.width / 2;
          circleScreenY = r.top + r.height / 2;
        }
      }
      if (id && String(id) === 'page4-ruler' && (page4Step === 1 || page4Step === 2)) {
        const vertexElA = typeof document !== 'undefined' ? document.getElementById('page4-shape-display-vertex-0') : null;
        const vertexElB = typeof document !== 'undefined' ? document.getElementById('page4-shape-display-vertex-1') : null;
        if (page4State === 'A' && vertexElA) {
          const r = vertexElA.getBoundingClientRect();
          circleScreenX = r.left + r.width / 2;
          circleScreenY = r.top + r.height / 2;
        } else if ((page4State === 'B' || page4State === 'C') && vertexElB) {
          const r = vertexElB.getBoundingClientRect();
          circleScreenX = r.left + r.width / 2;
          circleScreenY = r.top + r.height / 2;
        }
      }
      const page6State = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
      const page6Step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
      if (id && String(id) === 'page6-ruler' && (page6Step === 1 || page6Step === 2)) {
        const vertexElA = typeof document !== 'undefined' ? document.getElementById('page6-shape-display-vertex-0') : null;
        const vertexElB = typeof document !== 'undefined' ? document.getElementById('page6-shape-display-vertex-1') : null;
        if (page6State === 'A' && vertexElA) {
          const r = vertexElA.getBoundingClientRect();
          circleScreenX = r.left + r.width / 2;
          circleScreenY = r.top + r.height / 2;
        } else if ((page6State === 'B' || page6State === 'C') && vertexElB) {
          const r = vertexElB.getBoundingClientRect();
          circleScreenX = r.left + r.width / 2;
          circleScreenY = r.top + r.height / 2;
        }
      }
      
      // Check for circle snap FIRST (zero mark snaps to circle center when inside) - takes priority
      if (effectiveCircleSnapTarget && effectiveCircleSnapTarget.x !== undefined && effectiveCircleSnapTarget.y !== undefined && effectiveCircleSnapTarget.radius !== undefined) {
        // When DOM vertex not available: use same formula as animated dot (gcToPx)
        if (circleScreenX === undefined || circleScreenY === undefined) {
          const gcToPxX = viewportWidth / gridCols;
          const gcToPxY = viewportHeight / gridRows;
          circleScreenX = effectiveCircleSnapTarget.x * gcToPxX;
          circleScreenY = effectiveCircleSnapTarget.y * gcToPxY;
        }
        const gcToPxX = viewportWidth / gridCols;
        const gcToPxY = viewportHeight / gridRows;
        const gcToPx = (gcToPxX + gcToPxY) / 2;
        const radiusPixels = effectiveCircleSnapTarget.radius * gcToPx;
        const dx = zeroMarkPos.x - circleScreenX;
        const dy = zeroMarkPos.y - circleScreenY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radiusPixels) {
          snappedToCircle = true;
          // Snap zero mark to circle center (vertex A or B)
          const edgeOffsetX = halfWidth * (-directionY);
          const edgeOffsetY = halfWidth * directionX;
          finalPos = {
            x: circleScreenX - zeroOffset.x - glassMargin * directionX - edgeOffsetX,
            y: circleScreenY - zeroOffset.y - glassMargin * directionY - edgeOffsetY
          };
          if (onCircleSnap && !isSnappedToCircle) {
            onCircleSnap({
              x: effectiveCircleSnapTarget.x,
              y: effectiveCircleSnapTarget.y,
              radius: effectiveCircleSnapTarget.radius,
            distance,
              screenX: circleScreenX,
              screenY: circleScreenY
          });
          }
        } else if (isSnappedToCircle) {
          if (onCircleUnsnap) onCircleUnsnap();
        }
      }
      
      // Check for snap-to-point (zero mark snaps to points) - only if not already snapped to circle
      if (!snappedToCircle && (snapMode === 'point' || snapMode === 'both') && snapPoints && snapPoints.length > 0) {
        // console.log('🔍 [Ruler] Checking snap-to-point:', {
        //   snapMode,
        //   snapPointsCount: snapPoints.length,
        //   snapPoints,
        //   snapThreshold,
        //   zeroMarkPos,
        //   gridRows,
        //   gridCols
        // });
        
        const nearestPoint = RulerUtils.findNearestSnapPoint(
          zeroMarkPos,
          snapPoints,
          snapThreshold,
          gridRows,
          gridCols
        );
        
        // console.log('🔍 [Ruler] Nearest snap point result:', {
        //   nearestPoint,
        //   distance: nearestPoint?.distance,
        //   threshold: snapThreshold,
        //   willSnap: nearestPoint && nearestPoint.distance <= snapThreshold
        // });
        
        setNearestSnapPoint(nearestPoint);
        
        if (nearestPoint && nearestPoint.distance <= snapThreshold) {
          // Snap: position the ruler so the zero mark (outer side of zero tick on ruler edge) is at the snap point
          const snapScreenX = nearestPoint.screenX;
          const snapScreenY = nearestPoint.screenY;
          const edgeOffsetX = halfWidth * (-directionY);
          const edgeOffsetY = halfWidth * directionX;
          finalPos = {
            x: snapScreenX - zeroOffset.x - glassMargin * directionX - edgeOffsetX + dragOffsetRef.current.x,
            y: snapScreenY - zeroOffset.y - glassMargin * directionY - edgeOffsetY + dragOffsetRef.current.y
          };
          snappedToPoint = true;
          
          if (onSnapToPoint && !isSnappedToPoint) {
            onSnapToPoint(nearestPoint);
          }
        }
      } else {
        setNearestSnapPoint(null);
      }
      
      // Check for snap-to-line (ruler aligns with lines) - only if not already snapped to circle or point
      const isPage2Step2Line = typeof window !== 'undefined' && (id && String(id) === 'page2-ruler') && window.page2Step === 2;
      const isPage4Step2Line = typeof window !== 'undefined' && (id && String(id) === 'page4-ruler') && window.page4Step === 2;
      const isPage6Step2Line = typeof window !== 'undefined' && (id && String(id) === 'page6-ruler') && window.page6Step === 2;
      if (isPage2Step2Line && typeof window.updatePage2RulerSnapWindowVars === 'function') {
        window.updatePage2RulerSnapWindowVars();
      }
      if (isPage4Step2Line && typeof window.updatePage4RulerSnapWindowVars === 'function') {
        window.updatePage4RulerSnapWindowVars();
      }
      if (isPage6Step2Line && typeof window.updatePage6RulerSnapWindowVars === 'function') {
        window.updatePage6RulerSnapWindowVars();
      }
      const isPage2Or4Or6Step2Line = isPage2Step2Line || isPage4Step2Line || isPage6Step2Line;
      const effectiveSnapModeForLine = isPage2Or4Or6Step2Line && (isPage6Step2Line ? window.page6RulerSnapMode : isPage4Step2Line ? window.page4RulerSnapMode : window.page2RulerSnapMode) ? (isPage6Step2Line ? window.page6RulerSnapMode : isPage4Step2Line ? window.page4RulerSnapMode : window.page2RulerSnapMode) : snapMode;
      const effectiveSnapLinesForLine = isPage2Or4Or6Step2Line && (isPage6Step2Line ? window.page6RulerSnapLines : isPage4Step2Line ? window.page4RulerSnapLines : window.page2RulerSnapLines)?.length > 0 ? (isPage6Step2Line ? window.page6RulerSnapLines : isPage4Step2Line ? window.page4RulerSnapLines : window.page2RulerSnapLines) : snapLines;
      const effectiveToleranceForLine = isPage2Or4Or6Step2Line && (isPage6Step2Line ? window.page6RulerSnapLineTolerance : isPage4Step2Line ? window.page4RulerSnapLineTolerance : window.page2RulerSnapLineTolerance) != null ? (isPage6Step2Line ? window.page6RulerSnapLineTolerance : isPage4Step2Line ? window.page4RulerSnapLineTolerance : window.page2RulerSnapLineTolerance) : snapLineRotationTolerance;
      if (!snappedToCircle && !snappedToPoint && (effectiveSnapModeForLine === 'line' || effectiveSnapModeForLine === 'both') && effectiveSnapLinesForLine && effectiveSnapLinesForLine.length > 0) {
        const nearestLine = RulerUtils.findNearestSnapLine(
          zeroMarkPos,
          currentRotation,
          lengthPixels,
          effectiveSnapLinesForLine,
          snapThreshold,
          gridRows,
          gridCols
        );
        
        setNearestSnapLine(nearestLine);
        
        if (nearestLine && nearestLine.distance <= snapThreshold) {
          // Snap position and rotation to align with the line
          const snapResult = RulerUtils.calculateSnapToLinePosition(
            nearestLine,
            adjustedPos,
            currentRotation,
            lengthPixels
          );
          
          finalPos = {
            x: snapResult.position.x + dragOffsetRef.current.x,
            y: snapResult.position.y + dragOffsetRef.current.y
          };
          
          // Check if rotation is close enough to snap (within tolerance degrees)
          const rotationDiff = Math.abs(((currentRotation - snapResult.rotation + 180) % 360) - 180);
          if (rotationDiff <= effectiveToleranceForLine || rotationDiff >= (180 - effectiveToleranceForLine)) {
            setCurrentRotation(snapResult.rotation);
            snappedToLine = true;
            
            if (onSnapToLine && !isSnappedToLine) {
              onSnapToLine(nearestLine, snapResult.rotation);
            }
          }
        }
      } else if (!snappedToPoint) {
        setNearestSnapLine(null);
      }
      
      setIsSnappedToPoint(snappedToPoint);
      setIsSnappedToLine(snappedToLine);
      setIsSnappedToCircle(snappedToCircle);
      
      // Convert final pixel position to percentage
      const xPercent = (finalPos.x / viewportWidth) * 100;
      const yPercent = (finalPos.y / viewportHeight) * 100;
      
      // console.log('💾 [Ruler] Final position conversion:', {
      //   finalPos,
      //   viewportWidth,
      //   viewportHeight,
      //   xPercent,
      //   yPercent,
      //   snappedToPoint,
      //   snappedToLine
      // });
      
      const newPosition = {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
      
      // console.log('✅ [Ruler] Setting new position:', {
      //   newPosition,
      //   previousPosition: positionRef.current,
      //   isDragging: isDraggingRef.current
      // });
      
      // Update both state and ref for immediate access
      positionRef.current = newPosition;
      setCurrentPosition(newPosition);
      
      // During drag (or immediately after drag ends), directly update the Draggable wrapper's position
      // The Draggable sets position: fixed and left/top in pixels, so we need to convert our percentage to pixels
      // and update the Draggable wrapper (parent element), not our container
      // Note: We also update when not dragging to ensure final position is correct after drag ends
      if (containerRef.current) {
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
        
        // Convert percentage to pixels for the center position
        const centerXPixels = (parseFloat(newPosition.left) / 100) * vw;
        const centerYPixels = (parseFloat(newPosition.top) / 100) * vh;
        
        // The Draggable wrapper is the parent of our container
        // With position: fixed and translate(-50%, -50%), left/top should be the center position
        const draggableWrapper = containerRef.current.parentElement;
        
        if (draggableWrapper && draggableWrapper.classList.contains('draggable-component')) {
          const beforeStyle = {
            left: draggableWrapper.style.left,
            top: draggableWrapper.style.top,
            position: draggableWrapper.style.position,
            transform: draggableWrapper.style.transform
          };
          const beforeComputed = window.getComputedStyle(draggableWrapper);
          const beforeRect = draggableWrapper.getBoundingClientRect();
          const containerBeforeRect = containerRef.current.getBoundingClientRect();
          const containerBeforeComputed = window.getComputedStyle(containerRef.current);
          
          // console.log('🔍 [Ruler] Before position update - coordinate analysis:', {
          //   input: {
          //     newPosition,
          //     centerPixels: { x: centerXPixels, y: centerYPixels },
          //     viewport: { width: vw, height: vh }
          //   },
          //   wrapperBefore: {
          //     style: beforeStyle,
          //     computed: {
          //       left: beforeComputed.left,
          //       top: beforeComputed.top,
          //       position: beforeComputed.position,
          //       transform: beforeComputed.transform,
          //       width: beforeComputed.width,
          //       height: beforeComputed.height
          //     },
          //     rect: {
          //       left: beforeRect.left,
          //       top: beforeRect.top,
          //       width: beforeRect.width,
          //       height: beforeRect.height,
          //       centerX: beforeRect.left + beforeRect.width / 2,
          //       centerY: beforeRect.top + beforeRect.height / 2
          //     }
          //   },
          //   containerBefore: {
          //     style: {
          //       left: containerRef.current.style.left,
          //       top: containerRef.current.style.top,
          //       transform: containerRef.current.style.transform,
          //       position: containerRef.current.style.position
          //     },
          //     computed: {
          //       left: containerBeforeComputed.left,
          //       top: containerBeforeComputed.top,
          //       position: containerBeforeComputed.position,
          //       transform: containerBeforeComputed.transform,
          //       width: containerBeforeComputed.width,
          //       height: containerBeforeComputed.height
          //     },
          //     rect: {
          //       left: containerBeforeRect.left,
          //       top: containerBeforeRect.top,
          //       width: containerBeforeRect.width,
          //       height: containerBeforeRect.height,
          //       centerX: containerBeforeRect.left + containerBeforeRect.width / 2,
          //       centerY: containerBeforeRect.top + containerBeforeRect.height / 2
          //     }
          //   },
          //   expectedCenter: { x: centerXPixels, y: centerYPixels },
          //   actualCenter: {
          //     wrapper: { x: beforeRect.left + beforeRect.width / 2, y: beforeRect.top + beforeRect.height / 2 },
          //     container: { x: containerBeforeRect.left + containerBeforeRect.width / 2, y: containerBeforeRect.top + containerBeforeRect.height / 2 }
          //   }
          // });
          
          // Set position in pixels (what Draggable expects when dragging)
          // CRITICAL: The wrapper should NOT have transform - only position: fixed with left/top
          // The container inside has transform: translate(-50%, -50%) which centers it
          // 
          // IMPORTANT: The wrapper might have fixed dimensions from Draggable's originalSize
          // If so, we need to offset left/top by half the wrapper dimensions to center it
          // Use cached dimensions to avoid flicker from recalculating
          const wrapperWidth = wrapperDimensionsRef.current.width || 0;
          const wrapperHeight = wrapperDimensionsRef.current.height || 0;
          
          // Calculate the top-left position so the wrapper's center is at centerXPixels, centerYPixels
          // If wrapper has dimensions, offset by half; otherwise use center directly
          const wrapperLeft = wrapperWidth > 0 ? centerXPixels - wrapperWidth / 2 : centerXPixels;
          const wrapperTop = wrapperHeight > 0 ? centerYPixels - wrapperHeight / 2 : centerYPixels;
          
          // console.log('🔧 [Ruler] Setting wrapper position:', {
          //   centerPixels: { x: centerXPixels, y: centerYPixels },
          //   wrapperDimensions: { width: wrapperWidth, height: wrapperHeight },
          //   wrapperTopLeft: { left: wrapperLeft, top: wrapperTop },
          //   calculation: wrapperWidth > 0 
          //     ? `Center ${centerXPixels.toFixed(1)} - half width ${(wrapperWidth/2).toFixed(1)} = ${wrapperLeft.toFixed(1)}`
          //     : 'No wrapper dimensions, using center directly',
          //   note: 'Setting left/top so wrapper center is at mouse position'
          // });
          
          draggableWrapper.style.setProperty('left', `${wrapperLeft}px`, 'important');
          draggableWrapper.style.setProperty('top', `${wrapperTop}px`, 'important');
          // Ensure position is fixed (Draggable sets this)
          draggableWrapper.style.setProperty('position', 'fixed', 'important');
          // Remove any transform from the wrapper - the container inside handles transforms
          draggableWrapper.style.setProperty('transform', 'none', 'important');
          // Ensure wrapper has relative positioning context for container's absolute positioning
          // Note: position: fixed already creates a positioning context, but we ensure it's explicit
          
          // Also set on the container itself - during drag, center it at 50% 50% of wrapper
          // so that translate(-50%, -50%) centers it correctly
          // When not dragging, use the percentage-based position
          if (isDraggingRef.current) {
            containerRef.current.style.setProperty('left', '50%', 'important');
            containerRef.current.style.setProperty('top', '50%', 'important');
            containerRef.current.style.setProperty('position', 'absolute', 'important');
            // Ensure transform is applied - it should be from containerStyle, but make sure
            const expectedTransform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
            containerRef.current.style.setProperty('transform', expectedTransform, 'important');
          } else {
            containerRef.current.style.setProperty('left', newPosition.left, 'important');
            containerRef.current.style.setProperty('top', newPosition.top, 'important');
          }
          
          // Use a continuous override approach - set up an interval to keep overriding Draggable's position
          // This is necessary because React re-renders Draggable and resets the position
          if (!window._rulerDragOverrideInterval) {
            window._rulerDragOverrideInterval = setInterval(() => {
              if (isDraggingRef.current && containerRef.current && draggableWrapper) {
                const currentVw = typeof window !== 'undefined' ? window.innerWidth : 1600;
                const currentVh = typeof window !== 'undefined' ? window.innerHeight : 900;
                const currentPos = positionRef.current;
                if (currentPos) {
                  const currentCenterX = (parseFloat(currentPos.left) / 100) * currentVw;
                  const currentCenterY = (parseFloat(currentPos.top) / 100) * currentVh;
                  
                  // Account for wrapper dimensions to center it properly
                  // Use cached dimensions to avoid flicker
                  const wrapperWidth = wrapperDimensionsRef.current.width || 0;
                  const wrapperHeight = wrapperDimensionsRef.current.height || 0;
                  const wrapperLeft = wrapperWidth > 0 ? currentCenterX - wrapperWidth / 2 : currentCenterX;
                  const wrapperTop = wrapperHeight > 0 ? currentCenterY - wrapperHeight / 2 : currentCenterY;
                  
                  draggableWrapper.style.setProperty('left', `${wrapperLeft}px`, 'important');
                  draggableWrapper.style.setProperty('top', `${wrapperTop}px`, 'important');
                  draggableWrapper.style.setProperty('position', 'fixed', 'important');
                  draggableWrapper.style.setProperty('transform', 'none', 'important');
                  
                  // Also ensure container is centered at 50% 50% during drag
                  containerRef.current.style.setProperty('left', '50%', 'important');
                  containerRef.current.style.setProperty('top', '50%', 'important');
                  containerRef.current.style.setProperty('position', 'absolute', 'important');
                  // Ensure transform is applied
                  const expectedTransform = `translate(-50%, -50%) rotate(${currentRotationRef.current}deg)`;
                  containerRef.current.style.setProperty('transform', expectedTransform, 'important');
                }
              } else {
                // Clean up interval when not dragging
                if (window._rulerDragOverrideInterval) {
                  clearInterval(window._rulerDragOverrideInterval);
                  window._rulerDragOverrideInterval = null;
                }
              }
            }, 16); // ~60fps
          }
          
          // Use requestAnimationFrame to check if position was actually applied
          requestAnimationFrame(() => {
            const afterStyle = {
              left: draggableWrapper.style.left,
              top: draggableWrapper.style.top,
              position: draggableWrapper.style.position,
              transform: draggableWrapper.style.transform
            };
            const afterComputed = window.getComputedStyle(draggableWrapper);
            const afterRect = draggableWrapper.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const containerAfterComputed = window.getComputedStyle(containerRef.current);
            
            // Calculate expected vs actual positions
            const expectedWrapperCenter = { x: centerXPixels, y: centerYPixels };
            const actualWrapperCenter = {
              x: afterRect.left + afterRect.width / 2,
              y: afterRect.top + afterRect.height / 2
            };
            const actualContainerCenter = {
              x: containerRect.left + containerRect.width / 2,
              y: containerRect.top + containerRect.height / 2
            };
            
            // console.log('🔍 [Ruler] After position update - detailed coordinate analysis:', {
            //   input: {
            //     newPosition,
            //     centerPixels: { x: centerXPixels, y: centerYPixels },
            //     viewport: { width: vw, height: vh },
            //     finalPos
            //   },
            //   wrapperAfter: {
            //     style: afterStyle,
            //     computed: {
            //       left: afterComputed.left,
            //       top: afterComputed.top,
            //       position: afterComputed.position,
            //       transform: afterComputed.transform,
            //       width: afterComputed.width,
            //       height: afterComputed.height,
            //       transformOrigin: afterComputed.transformOrigin
            //     },
            //     rect: {
            //       left: afterRect.left,
            //       top: afterRect.top,
            //       width: afterRect.width,
            //       height: afterRect.height,
            //       centerX: actualWrapperCenter.x,
            //       centerY: actualWrapperCenter.y
            //     }
            //   },
            //   containerAfter: {
            //     style: {
            //       left: containerRef.current.style.left,
            //       top: containerRef.current.style.top,
            //       transform: containerRef.current.style.transform,
            //       position: containerRef.current.style.position
            //     },
            //     computed: {
            //       left: containerAfterComputed.left,
            //       top: containerAfterComputed.top,
            //       position: containerAfterComputed.position,
            //       transform: containerAfterComputed.transform,
            //       width: containerAfterComputed.width,
            //       height: containerAfterComputed.height,
            //       transformOrigin: containerAfterComputed.transformOrigin
            //     },
            //     rect: {
            //       left: containerRect.left,
            //       top: containerRect.top,
            //       width: containerRect.width,
            //       height: containerRect.height,
            //       centerX: actualContainerCenter.x,
            //       centerY: actualContainerCenter.y
            //     }
            //   },
            //   comparison: {
            //     expectedWrapperCenter,
            //     actualWrapperCenter,
            //     actualContainerCenter,
            //     wrapperDifference: {
            //       x: expectedWrapperCenter.x - actualWrapperCenter.x,
            //       y: expectedWrapperCenter.y - actualWrapperCenter.y
            //     },
            //     containerDifference: {
            //       x: expectedWrapperCenter.x - actualContainerCenter.x,
            //       y: expectedWrapperCenter.y - actualContainerCenter.y
            //     },
            //     // CRITICAL: Show the key issue
            //     issue: {
            //       wrapperMatches: Math.abs(expectedWrapperCenter.x - actualWrapperCenter.x) < 1 && Math.abs(expectedWrapperCenter.y - actualWrapperCenter.y) < 1,
            //       containerMatches: Math.abs(expectedWrapperCenter.x - actualContainerCenter.x) < 1 && Math.abs(expectedWrapperCenter.y - actualContainerCenter.y) < 1,
            //       problem: Math.abs(expectedWrapperCenter.x - actualContainerCenter.x) > 1 || Math.abs(expectedWrapperCenter.y - actualContainerCenter.y) > 1 
            //         ? 'Container center does not match expected - likely transform or positioning issue'
            //         : 'OK'
            //     }
            //   },
            //   transformAnalysis: {
            //     wrapperTransform: afterComputed.transform,
            //     containerTransform: containerAfterComputed.transform,
            //     wrapperTransformOrigin: afterComputed.transformOrigin,
            //     containerTransformOrigin: containerAfterComputed.transformOrigin,
            //     // Parse transform to understand the offset
            //     wrapperTransformParsed: afterComputed.transform !== 'none' ? {
            //       matrix: afterComputed.transform.includes('matrix') ? afterComputed.transform : null,
            //       translate: afterComputed.transform.includes('translate') ? afterComputed.transform.match(/translate\([^)]+\)/)?.[0] : null,
            //       rotate: afterComputed.transform.includes('rotate') ? afterComputed.transform.match(/rotate\([^)]+\)/)?.[0] : null
            //     } : null,
            //     containerTransformParsed: containerAfterComputed.transform !== 'none' ? {
            //       matrix: containerAfterComputed.transform.includes('matrix') ? containerAfterComputed.transform : null,
            //       translate: containerAfterComputed.transform.includes('translate') ? containerAfterComputed.transform.match(/translate\([^)]+\)/)?.[0] : null,
            //       rotate: containerAfterComputed.transform.includes('rotate') ? containerAfterComputed.transform.match(/rotate\([^)]+\)/)?.[0] : null
            //     } : null,
            //     note: 'Check if transforms are causing coordinate mismatch - wrapper should have transform, container should be relative to wrapper'
            //   },
            //   // SUMMARY: Key values for quick debugging
            //   summary: {
            //     'Expected center (mouse)': `${expectedWrapperCenter.x.toFixed(2)}, ${expectedWrapperCenter.y.toFixed(2)}`,
            //     'Wrapper center (actual)': `${actualWrapperCenter.x.toFixed(2)}, ${actualWrapperCenter.y.toFixed(2)}`,
            //     'Container center (actual)': `${actualContainerCenter.x.toFixed(2)}, ${actualContainerCenter.y.toFixed(2)}`,
            //     'Wrapper offset': `${(expectedWrapperCenter.x - actualWrapperCenter.x).toFixed(2)}, ${(expectedWrapperCenter.y - actualWrapperCenter.y).toFixed(2)}`,
            //     'Container offset': `${(expectedWrapperCenter.x - actualContainerCenter.x).toFixed(2)}, ${(expectedWrapperCenter.y - actualContainerCenter.y).toFixed(2)}`,
            //     'Wrapper left/top set': `${centerXPixels.toFixed(2)}, ${centerYPixels.toFixed(2)}`,
            //     'Wrapper computed left/top': `${afterComputed.left}, ${afterComputed.top}`,
            //     'Container computed left/top': `${containerAfterComputed.left}, ${containerAfterComputed.top}`,
            //     'Wrapper transform': afterComputed.transform,
            //     'Container transform': containerAfterComputed.transform,
            //     'Problem': Math.abs(expectedWrapperCenter.x - actualContainerCenter.x) > 10 
            //       ? `Container is ${(expectedWrapperCenter.x - actualContainerCenter.x).toFixed(0)}px off in X - check transforms!`
            //       : 'Position looks correct'
            //   }
            // });
            
            // Also log summary separately for easy viewing
            // const summaryText = {
            //   expected: `${expectedWrapperCenter.x.toFixed(1)}, ${expectedWrapperCenter.y.toFixed(1)}`,
            //   wrapperActual: `${actualWrapperCenter.x.toFixed(1)}, ${actualWrapperCenter.y.toFixed(1)}`,
            //   containerActual: `${actualContainerCenter.x.toFixed(1)}, ${actualContainerCenter.y.toFixed(1)}`,
            //   wrapperOffset: `${(expectedWrapperCenter.x - actualWrapperCenter.x).toFixed(1)}px, ${(expectedWrapperCenter.y - actualWrapperCenter.y).toFixed(1)}px`,
            //   containerOffset: `${(expectedWrapperCenter.x - actualContainerCenter.x).toFixed(1)}px, ${(expectedWrapperCenter.y - actualContainerCenter.y).toFixed(1)}px`,
            //   wrapperSet: `${centerXPixels.toFixed(1)}, ${centerYPixels.toFixed(1)}`,
            //   wrapperComputed: `${afterComputed.left}, ${afterComputed.top}`,
            //   wrapperTransform: afterComputed.transform,
            //   containerTransform: containerAfterComputed.transform
            // };
            
            // console.log('📊 [Ruler] POSITION SUMMARY:', summaryText);
            
            // if (Math.abs(expectedWrapperCenter.x - actualContainerCenter.x) > 10) {
            //   console.error('❌ [Ruler] POSITION MISMATCH DETECTED:', {
            //     issue: `Container center is ${(expectedWrapperCenter.x - actualContainerCenter.x).toFixed(0)}px off in X direction`,
            //     expected: `${expectedWrapperCenter.x.toFixed(1)}, ${expectedWrapperCenter.y.toFixed(1)}`,
            //     actual: `${actualContainerCenter.x.toFixed(1)}, ${actualContainerCenter.y.toFixed(1)}`,
            //     likelyCause: 'Transform or coordinate system mismatch between wrapper and container'
            //   });
            // }
          });
        } else {
          // console.warn('⚠️ [Ruler] Draggable wrapper not found or incorrect element:', {
          //   parent: containerRef.current.parentElement,
          //   hasClass: containerRef.current.parentElement?.classList.contains('draggable-component')
          // });
        }
      }
      
      // Call the original callback if provided (skip in step 3+ so marker drag doesn't trigger "ruler snapped" block in PageConfig)
      if (onPositionChange && (typeof window === 'undefined' || (String(id) === 'page2-ruler' ? (window.page2Step !== undefined && window.page2Step < 3) : String(id) === 'page4-ruler' ? (window.page4Step !== undefined && window.page4Step < 3) : String(id) === 'page6-ruler' ? (window.page6Step !== undefined && window.page6Step < 3) : true))) {
        onPositionChange(finalPos);
      }
      
      // Emit ruler position change event with zero mark position for animated dot
      if (typeof window !== 'undefined') {
        // When snapped to circle, zero mark is at circle center; otherwise use computed zeroMarkPos
        const emittedZeroMarkPos = (snappedToCircle && circleScreenX != null && circleScreenY != null)
          ? { x: circleScreenX, y: circleScreenY }
          : zeroMarkPos;
        window.rulerZeroMarkPosition = emittedZeroMarkPos;
        const vw = window.innerWidth || 1600;
        const vh = window.innerHeight || 900;
        const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        window.rulerZeroMarkPositionGrid = {
          x: (emittedZeroMarkPos.x / vw) * gc,
          y: (emittedZeroMarkPos.y / vh) * gr
        };
        window.dispatchEvent(new CustomEvent('rulerPositionChanged', {
          detail: { centerPos: { x: finalPos.x, y: finalPos.y }, zeroMarkPos: emittedZeroMarkPos, rotation: currentRotation }
        }));
        
        // Calculate and publish major tick mark positions along the edge of the ruler
        const calculateMajorTickPositions = () => {
          if (!containerRef.current) return;
          
          const rect = containerRef.current.getBoundingClientRect();
          const rulerCenterX = rect.left + rect.width / 2;
          const rulerCenterY = rect.top + rect.height / 2;
          
          // Get tick positions
          const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
          const ticks = RulerUtils.getTickPositions(
            lengthPixels,
            rulerType,
            majorTickInterval,
            minorTickInterval,
            dimensions
          );
          
          // Filter to only major ticks
          const majorTicks = ticks.filter(tick => tick.isMajor);
          
          // Calculate screen coordinates for each major tick
          const majorTickScreenPositions = majorTicks.map(tick => {
            // Tick position along ruler: 0 (at zero mark) to 1 (at end)
            // Distance from zero mark along ruler length
            const distanceFromZeroMark = tick.position * lengthPixels;
            
            // Calculate tick position relative to ruler center
            // Zero mark is at: center - zeroOffset
            // Tick is at: zeroMark + distance along ruler direction
            // IMPORTANT: Account for glass margin (5% on each side)
            const glassMargin = lengthPixels * 0.05;
            const zeroOffset = getZeroMarkOffset(currentRotation);
            const rotationRad = (currentRotation * Math.PI) / 180;
            
            // Direction vector along the ruler (from zero mark to end)
            const directionX = Math.cos(rotationRad);
            const directionY = Math.sin(rotationRad);
            
            // Add glass margin offset: zero mark is offset by glassMargin from the ruler's visual edge
            const glassMarginOffsetX = glassMargin * directionX;
            const glassMarginOffsetY = glassMargin * directionY;
            
            // Tick position relative to ruler center
            const tickOffsetFromCenter = {
              x: zeroOffset.x + glassMarginOffsetX + distanceFromZeroMark * directionX,
              y: zeroOffset.y + glassMarginOffsetY + distanceFromZeroMark * directionY
            };
            
            // Tick position on the edge: offset by half width perpendicular to ruler direction
            const perpendicularX = -directionY; // Perpendicular to direction
            const perpendicularY = directionX;
            const majorTickLength = 8; // Major tick length in pixels
            
            // Offset the tick base from the edge by majorTickLength (8px)
            // So the tick base is inset from the physical edge
            const edgeOffset = {
              x: perpendicularX * (widthPixels / 2) - perpendicularX * majorTickLength,
              y: perpendicularY * (widthPixels / 2) - perpendicularY * majorTickLength
            };
            
            // Tick marks extend inward from the base by majorTickLength (8px)
            const tickTopOffset = {
              x: -perpendicularX * majorTickLength, // Inward from base
              y: -perpendicularY * majorTickLength
            };
            
            // Final tick position in screen coordinates (at base, which is now inset from edge)
            const tickBasePos = {
              x: rulerCenterX + tickOffsetFromCenter.x + edgeOffset.x,
              y: rulerCenterY + tickOffsetFromCenter.y + edgeOffset.y
            };
            
            // Top of tick mark (where it ends, further inward)
            const tickTopPos = {
              x: tickBasePos.x + tickTopOffset.x,
              y: tickBasePos.y + tickTopOffset.y
            };
            
            const tickScreenPos = {
              x: tickBasePos.x, // Base position (inset from edge by majorTickLength)
              y: tickBasePos.y,
              topX: tickTopPos.x, // Top position (inset from edge by 2*majorTickLength)
              topY: tickTopPos.y,
              value: tick.value,
              label: tick.label,
              unit: tick.unit,
              tickLength: majorTickLength,
              tickInset: majorTickLength // Distance from edge to base
            };
            
            return tickScreenPos;
          });
          
          // Store and log major tick positions
          window.rulerMajorTickPositions = majorTickScreenPositions;
          
          // Calculate the 4 corners of the ruler rectangle
          const rotationRad = (currentRotation * Math.PI) / 180;
          const cos = Math.cos(rotationRad);
          const sin = Math.sin(rotationRad);
          
          // Half dimensions
          const halfLength = lengthPixels / 2;
          const halfWidth = widthPixels / 2;
          
          // Corner positions relative to center (before rotation)
          const cornersRelative = [
            { x: -halfLength, y: -halfWidth }, // Top-left (from ruler perspective)
            { x: -halfLength, y: +halfWidth }, // Bottom-left
            { x: +halfLength, y: -halfWidth }, // Top-right
            { x: +halfLength, y: +halfWidth }  // Bottom-right
          ];
          
          // Rotate corners and add center position
          const corners = cornersRelative.map(corner => {
            const rotatedX = corner.x * cos - corner.y * sin;
            const rotatedY = corner.x * sin + corner.y * cos;
            return {
              x: rulerCenterX + rotatedX,
              y: rulerCenterY + rotatedY
            };
          });
          
          // Define edges (lines connecting corners)
          // Edge order: top, right, bottom, left (from ruler's perspective)
          const edges = [
            {
              name: 'top',
              start: corners[0], // Top-left
              end: corners[2]    // Top-right
            },
            {
              name: 'right',
              start: corners[2], // Top-right
              end: corners[3]    // Bottom-right
            },
            {
              name: 'bottom',
              start: corners[3], // Bottom-right
              end: corners[1]   // Bottom-left
            },
            {
              name: 'left',
              start: corners[1], // Bottom-left
              end: corners[0]   // Top-left
            }
          ];
          
          // Also convert to grid coordinates
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          
          const edgesGrid = edges.map(edge => ({
            name: edge.name,
            start: {
              x: (edge.start.x / viewportWidth) * gridCols,
              y: (edge.start.y / viewportHeight) * gridRows
            },
            end: {
              x: (edge.end.x / viewportWidth) * gridCols,
              y: (edge.end.y / viewportHeight) * gridRows
            }
          }));
          
          console.log('📏 [Ruler] Major tick mark positions along edge:', {
            count: majorTickScreenPositions.length,
            ticks: majorTickScreenPositions,
            rulerCenter: { x: rulerCenterX, y: rulerCenterY },
            zeroMarkPos: zeroMarkPos,
            rotation: currentRotation,
            lengthPixels,
            widthPixels,
            majorTickInterval,
            corners: {
              pixels: corners,
              grid: corners.map(corner => ({
                x: (corner.x / viewportWidth) * gridCols,
                y: (corner.y / viewportHeight) * gridRows
              }))
            },
            edges: {
              pixels: edges,
              grid: edgesGrid
            }
          });
        };
        
        // Calculate tick positions after position is set
        requestAnimationFrame(() => {
          requestAnimationFrame(calculateMajorTickPositions);
        });
        
        // Dispatch custom event
        const rulerPositionEvent = new CustomEvent('rulerPositionChanged', {
          detail: {
            centerPos: finalPos,
            zeroMarkPos: zeroMarkPos,
            rotation: currentRotation
          }
        });
        window.dispatchEvent(rulerPositionEvent);
      }
    }
  }, [id, onPositionChange, currentRotation, snapMode, snapPoints, snapLines, snapThreshold, snapLineRotationTolerance, gridRows, gridCols, getZeroMarkOffset, lengthPixels, widthPixels, rulerType, majorTickInterval, minorTickInterval, length, onSnapToPoint, onSnapToLine, isSnappedToPoint, isSnappedToLine, circleSnapTarget, onCircleSnap, onCircleUnsnap, isSnappedToCircle, containerRef]);

  // Store initial rotation angle and fixed pivot (zero mark) when rotation starts
  const rotationStartAngle = React.useRef(0);
  const rotationStartMouseAngle = React.useRef(0);
  const rotationPivotRef = React.useRef({ x: 0, y: 0 }); // Zero mark in screen coords - fixed for entire gesture
  const snappedToLineDuringRotationRef = React.useRef(false); // Fire onSnapToLine once per rotation gesture when we snap
  const lockedRotationRef = React.useRef(null); // When snapped to line, lock rotation to this value for the rest of the gesture

  // Handle ruler rotation (Ctrl/Cmd + drag or rotation handle)
  const handleRotationStart = React.useCallback((e) => {
    const t = e.target;
    console.log('[MarkerDrag DEBUG] handleRotationStart called', { targetTag: t?.tagName, targetClass: t?.className, targetId: t?.id, hasDataMarkerId: !!(t?.closest && t.closest('[data-marker-id]')) });
    const onMarker = t && t.closest && t.closest('[data-marker-id]');
    if (onMarker) {
      console.log('[MarkerDrag DEBUG] handleRotationStart: mousedown on marker, ignoring rotation', { markerId: onMarker?.getAttribute?.('data-marker-id') });
      return; // Don't start rotation when clicking on a measurement marker
    }
    if (!effectiveIsRotatable || mode === 'static') return;
    
    // Only rotate if Ctrl (Windows/Linux) or Cmd (Mac) is pressed, or if rotation handle is clicked
    const isRotationHandle = e.target?.closest?.('.ruler-rotation-handle');
    if (e.ctrlKey || e.metaKey || isRotationHandle) {
      e.stopPropagation();
      
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
      
      if (clientX === undefined || clientY === undefined) return;
      
      // Pivot = zero mark (outer side of zero tick on ruler edge) - same formula as snap
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotationRad = (currentRotation * Math.PI) / 180;
      const halfLength = lengthPixels / 2;
      const halfWidthR = widthPixels / 2;
      const zeroOffset = { x: -halfLength * Math.cos(rotationRad), y: -halfLength * Math.sin(rotationRad) };
      const glassMargin = lengthPixels * 0.05;
      const directionX = Math.cos(rotationRad);
      const directionY = Math.sin(rotationRad);
      // Perpendicular to edge: halfWidth * (-directionY, directionX)
      const pivotX = centerX + zeroOffset.x + glassMargin * directionX + halfWidthR * (-directionY);
      const pivotY = centerY + zeroOffset.y + glassMargin * directionY + halfWidthR * directionX;
      
      // Store pivot so we use the SAME fixed point for the entire rotation (don't recalc from rect on move)
      rotationPivotRef.current = { x: pivotX, y: pivotY };
      
      // Calculate initial angle from pivot to mouse
      const dx = clientX - pivotX;
      const dy = clientY - pivotY;
      const initialAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      rotationStartAngle.current = currentRotation;
      rotationStartMouseAngle.current = initialAngle;
      lockedRotationRef.current = null; // Allow rotation until we snap (if we do)
      
      // Cache wrapper dimensions for direct DOM updates during rotation (in case user hasn't dragged)
      if (!wrapperDimensionsRef.current.width || !wrapperDimensionsRef.current.height) {
        wrapperDimensionsRef.current = { width: lengthPixels, height: widthPixels };
      }
      
      setIsRotating(true);
    }
  }, [effectiveIsRotatable, mode, currentRotation, lengthPixels, widthPixels]);

  const handleRotationMove = React.useCallback((e) => {
    if (!isRotating || !containerRef.current) return;
    if (e.touches && e.touches.length > 0) e.preventDefault();

    const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) return;

    // If we already snapped to a line this gesture, keep rotation fixed at the snapped value
    let newRotation;
    if (lockedRotationRef.current != null) {
      newRotation = lockedRotationRef.current;
    } else {
      // Use the FIXED pivot (zero mark) stored at rotation start - do NOT recalc from rect
      const pivotX = rotationPivotRef.current.x;
      const pivotY = rotationPivotRef.current.y;
    
    // Calculate current angle from pivot to mouse
    const dx = clientX - pivotX;
    const dy = clientY - pivotY;
    const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Calculate rotation delta
    const angleDelta = currentAngle - rotationStartMouseAngle.current;
    
    // Apply rotation delta to initial rotation
      newRotation = rotationStartAngle.current + angleDelta;
      
      // Line snap during rotation: if ruler edge is within tolerance of a snap line angle, snap to that angle
      const isPage2Step2 = typeof window !== 'undefined' && (id && String(id) === 'page2-ruler') && window.page2Step === 2;
      const isPage4Step2 = typeof window !== 'undefined' && (id && String(id) === 'page4-ruler') && window.page4Step === 2;
      const isPage6Step2 = typeof window !== 'undefined' && (id && String(id) === 'page6-ruler') && window.page6Step === 2;
      if (isPage2Step2 && typeof window.updatePage2RulerSnapWindowVars === 'function') {
        window.updatePage2RulerSnapWindowVars();
      }
      if (isPage4Step2 && typeof window.updatePage4RulerSnapWindowVars === 'function') {
        window.updatePage4RulerSnapWindowVars();
      }
      if (isPage6Step2 && typeof window.updatePage6RulerSnapWindowVars === 'function') {
        window.updatePage6RulerSnapWindowVars();
      }
      const effectiveSnapMode = (isPage6Step2 && window.page6RulerSnapMode) ? window.page6RulerSnapMode : (isPage4Step2 && window.page4RulerSnapMode) ? window.page4RulerSnapMode : (isPage2Step2 && window.page2RulerSnapMode) ? window.page2RulerSnapMode : snapMode;
      const effectiveSnapLines = (isPage6Step2 && window.page6RulerSnapLines?.length > 0) ? window.page6RulerSnapLines : (isPage4Step2 && window.page4RulerSnapLines?.length > 0) ? window.page4RulerSnapLines : (isPage2Step2 && window.page2RulerSnapLines?.length > 0) ? window.page2RulerSnapLines : snapLines;
      const effectiveTolerance = (isPage6Step2 && window.page6RulerSnapLineTolerance != null) ? window.page6RulerSnapLineTolerance : (isPage4Step2 && window.page4RulerSnapLineTolerance != null) ? window.page4RulerSnapLineTolerance : (isPage2Step2 && window.page2RulerSnapLineTolerance != null) ? window.page2RulerSnapLineTolerance : snapLineRotationTolerance;
      const page2State = typeof window !== 'undefined' ? (window.page2State || 'C') : 'C';
      const page4State = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
      const page6StateRot = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
      const snapAnglesFromPx = [];
      if (isPage2Step2 && page2State === 'B') {
        const elA = typeof document !== 'undefined' ? document.getElementById('page2-shape-display-vertex-0') : null;
        const elB = typeof document !== 'undefined' ? document.getElementById('page2-shape-display-vertex-1') : null;
        if (elA && elB) {
          const rA = elA.getBoundingClientRect();
          const rB = elB.getBoundingClientRect();
          const ax = rA.left + rA.width / 2;
          const ay = rA.top + rA.height / 2;
          const bx = rB.left + rB.width / 2;
          const by = rB.top + rB.height / 2;
          const abAngle = Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
          snapAnglesFromPx.push({ angle: abAngle, label: 'AB' });
        } else if (window.page2VertexAPosPx && window.page2VertexBPosPx) {
          const ax = window.page2VertexAPosPx.x;
          const ay = window.page2VertexAPosPx.y;
          const bx = window.page2VertexBPosPx.x;
          const by = window.page2VertexBPosPx.y;
          const abAngle = Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
          snapAnglesFromPx.push({ angle: abAngle, label: 'AB' });
        }
      }
      if (isPage4Step2 && page4State === 'B') {
        const elA = typeof document !== 'undefined' ? document.getElementById('page4-shape-display-vertex-0') : null;
        const elB = typeof document !== 'undefined' ? document.getElementById('page4-shape-display-vertex-1') : null;
        if (elA && elB) {
          const rA = elA.getBoundingClientRect();
          const rB = elB.getBoundingClientRect();
          const ax = rA.left + rA.width / 2;
          const ay = rA.top + rA.height / 2;
          const bx = rB.left + rB.width / 2;
          const by = rB.top + rB.height / 2;
          const abAngle = Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
          snapAnglesFromPx.push({ angle: abAngle, label: 'AB' });
        } else if (window.page4VertexAPosPx && window.page4VertexBPosPx) {
          const ax = window.page4VertexAPosPx.x;
          const ay = window.page4VertexAPosPx.y;
          const bx = window.page4VertexBPosPx.x;
          const by = window.page4VertexBPosPx.y;
          const abAngle = Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
          snapAnglesFromPx.push({ angle: abAngle, label: 'AB' });
        }
      }
      if (isPage6Step2 && page6StateRot === 'B') {
        const elA = typeof document !== 'undefined' ? document.getElementById('page6-shape-display-vertex-0') : null;
        const elB = typeof document !== 'undefined' ? document.getElementById('page6-shape-display-vertex-1') : null;
        if (elA && elB) {
          const rA = elA.getBoundingClientRect();
          const rB = elB.getBoundingClientRect();
          const ax = rA.left + rA.width / 2;
          const ay = rA.top + rA.height / 2;
          const bx = rB.left + rB.width / 2;
          const by = rB.top + rB.height / 2;
          const abAngle = Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
          snapAnglesFromPx.push({ angle: abAngle, label: 'AB' });
        } else if (window.page6VertexAPosPx && window.page6VertexBPosPx) {
          const ax = window.page6VertexAPosPx.x;
          const ay = window.page6VertexAPosPx.y;
          const bx = window.page6VertexBPosPx.x;
          const by = window.page6VertexBPosPx.y;
          const abAngle = Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
          snapAnglesFromPx.push({ angle: abAngle, label: 'AB' });
        }
      }
      if ((effectiveSnapMode === 'line' || effectiveSnapMode === 'both') && (effectiveSnapLines.length > 0 || snapAnglesFromPx.length > 0)) {
        const gridRowsVal = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        const gridColsVal = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
        let bestLine = null;
        let bestDiff = Infinity;
        let bestSnapRotation = null;
        // Smallest angle between two directions (0..180); handles any angle values
        const angleDiffDeg = (a, b) => {
          const norm = (x) => { x = x % 360; return x < 0 ? x + 360 : x; };
          let d = Math.abs(norm(a) - norm(b));
          return d > 180 ? 360 - d : d;
        };
        for (let idx = 0; idx < effectiveSnapLines.length; idx++) {
          const line = effectiveSnapLines[idx];
          const x1 = (line.x1 / gridColsVal) * vw;
          const y1 = (line.y1 / gridRowsVal) * vh;
          const x2 = (line.x2 / gridColsVal) * vw;
          const y2 = (line.y2 / gridRowsVal) * vh;
          const lineAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
          const diff1 = angleDiffDeg(newRotation, lineAngle);
          const diff2 = angleDiffDeg(newRotation, lineAngle + 180);
          const diff = Math.min(diff1, diff2);
          if (diff <= effectiveTolerance && diff < bestDiff) {
            bestDiff = diff;
            bestSnapRotation = diff1 <= diff2 ? lineAngle : lineAngle + 180;
            bestLine = { ...line, index: idx, suggestedRotation: lineAngle, screenCoords: { x1, y1, x2, y2 } };
          }
        }
        for (let i = 0; i < snapAnglesFromPx.length; i++) {
          const { angle: lineAngle, label } = snapAnglesFromPx[i];
          const diff1 = angleDiffDeg(newRotation, lineAngle);
          const diff2 = angleDiffDeg(newRotation, lineAngle + 180);
          const diff = Math.min(diff1, diff2);
          if (diff <= effectiveTolerance && diff < bestDiff) {
            bestDiff = diff;
            bestSnapRotation = diff1 <= diff2 ? lineAngle : lineAngle + 180;
            bestLine = { label, index: effectiveSnapLines.length + i, suggestedRotation: lineAngle, screenCoords: {} };
          }
        }
        if (bestLine && bestSnapRotation != null) {
          newRotation = bestSnapRotation;
          lockedRotationRef.current = newRotation; // Lock rotation for rest of gesture so it stays at snap angle
          if (onSnapToLine && !snappedToLineDuringRotationRef.current) {
            snappedToLineDuringRotationRef.current = true;
            onSnapToLine(bestLine, newRotation);
          }
        }
      }
    }

    // Pivot for position calc (needed whether locked or not)
    const pivotX = rotationPivotRef.current.x;
    const pivotY = rotationPivotRef.current.y;
    
    // Calculate new center so the zero mark (outer side of zero tick on ruler edge) stays at the fixed pivot
    // zeroMark = center + zeroOffset + glassMargin*direction + halfWidth*(-directionY, directionX)
    // So: newCenter = pivot - (zeroOffset + glassMargin*direction + halfWidth*(-directionY, directionX))
    const halfLength = lengthPixels / 2;
    const glassMargin = lengthPixels * 0.05;
    const halfWidthR = widthPixels / 2;
    const newRotationRad = (newRotation * Math.PI) / 180;
    const newOffsetX = -halfLength * Math.cos(newRotationRad);
    const newOffsetY = -halfLength * Math.sin(newRotationRad);
    const newDirectionX = Math.cos(newRotationRad);
    const newDirectionY = Math.sin(newRotationRad);
    const newEdgeOffsetX = halfWidthR * (-newDirectionY);
    const newEdgeOffsetY = halfWidthR * newDirectionX;
    
    const newCenterX = pivotX - (newOffsetX + glassMargin * newDirectionX + newEdgeOffsetX);
    const newCenterY = pivotY - (newOffsetY + glassMargin * newDirectionY + newEdgeOffsetY);
    
    // Convert screen coordinates to percentage (same format as handlePositionChange: left/top as "N%")
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    const xPercent = (newCenterX / viewportWidth) * 100;
    const yPercent = (newCenterY / viewportHeight) * 100;
    const newPosition = {
      left: `${xPercent}%`,
      top: `${yPercent}%`
    };
    
    // During rotation: update refs only, NOT state - avoids re-renders so direct DOM updates aren't overwritten (stops flicker)
    positionRef.current = newPosition;
    currentRotationRef.current = newRotation;
    
    // Apply position and rotation directly to the DOM (no React re-render during rotation)
    if (containerRef.current) {
      const draggableWrapper = containerRef.current.parentElement;
      if (draggableWrapper && draggableWrapper.classList.contains('draggable-component')) {
        const W = wrapperDimensionsRef.current.width || lengthPixels;
        const H = wrapperDimensionsRef.current.height || widthPixels;
        const wrapperLeft = newCenterX - W / 2;
        const wrapperTop = newCenterY - H / 2;
        draggableWrapper.style.setProperty('left', `${wrapperLeft}px`, 'important');
        draggableWrapper.style.setProperty('top', `${wrapperTop}px`, 'important');
        draggableWrapper.style.setProperty('position', 'fixed', 'important');
        draggableWrapper.style.setProperty('transform', 'none', 'important');
        containerRef.current.style.setProperty('left', '50%', 'important');
        containerRef.current.style.setProperty('top', '50%', 'important');
        containerRef.current.style.setProperty('transform', `translate(-50%, -50%) rotate(${newRotation}deg)`, 'important');
      }
    }
    
    if (onRotate) {
      onRotate(newRotation);
    }
    
    // Skip onPositionChange in step 3+ so marker-only step doesn't trigger PageConfig block
    if (onPositionChange && (typeof window === 'undefined' || (String(id) === 'page2-ruler' ? (window.page2Step !== undefined && window.page2Step < 3) : String(id) === 'page4-ruler' ? (window.page4Step !== undefined && window.page4Step < 3) : String(id) === 'page6-ruler' ? (window.page6Step !== undefined && window.page6Step < 3) : true))) {
      onPositionChange(newPosition);
    }
  }, [id, isRotating, onRotate, onPositionChange, onSnapToLine, lengthPixels, snapMode, snapLines, snapThreshold, snapLineRotationTolerance]);

  const handleRotationEnd = React.useCallback(() => {
    snappedToLineDuringRotationRef.current = false; // Reset so next rotation can fire onSnapToLine again
    lockedRotationRef.current = null; // Unlock for next gesture
    // Sync state from refs (we only updated refs during rotation to avoid flicker)
    if (positionRef.current) {
      setCurrentPosition(positionRef.current);
    }
    setCurrentRotation(currentRotationRef.current);
    setIsRotating(false);
    // Apply wrapper position in pixels immediately so it doesn't jump on re-render
    if (containerRef.current && positionRef.current) {
      const wrapper = containerRef.current.parentElement;
      if (wrapper && wrapper.classList.contains('draggable-component')) {
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
        const centerX = (parseFloat(positionRef.current.left) / 100) * vw;
        const centerY = (parseFloat(positionRef.current.top) / 100) * vh;
        const W = wrapperDimensionsRef.current.width || lengthPixels;
        const H = wrapperDimensionsRef.current.height || widthPixels;
        wrapper.style.setProperty('left', `${centerX - W / 2}px`, 'important');
        wrapper.style.setProperty('top', `${centerY - H / 2}px`, 'important');
        wrapper.style.setProperty('position', 'fixed', 'important');
        wrapper.style.setProperty('transform', 'none', 'important');
        containerRef.current.style.setProperty('left', '50%', 'important');
        containerRef.current.style.setProperty('top', '50%', 'important');
        containerRef.current.style.setProperty('transform', `translate(-50%, -50%) rotate(${currentRotationRef.current}deg)`, 'important');
      }
    }
  }, [lengthPixels, widthPixels]);

  // Set up rotation event listeners (touch passive: false so preventDefault can cancel scroll)
  React.useEffect(() => {
    if (isRotating) {
      window.addEventListener('mousemove', handleRotationMove);
      window.addEventListener('mouseup', handleRotationEnd);
      window.addEventListener('touchmove', handleRotationMove, { passive: false });
      window.addEventListener('touchend', handleRotationEnd, { passive: false });
      window.addEventListener('touchcancel', handleRotationEnd, { passive: false });
      
      return () => {
        window.removeEventListener('mousemove', handleRotationMove);
        window.removeEventListener('mouseup', handleRotationEnd);
        window.removeEventListener('touchmove', handleRotationMove, { passive: false });
        window.removeEventListener('touchend', handleRotationEnd, { passive: false });
        window.removeEventListener('touchcancel', handleRotationEnd, { passive: false });
      };
    }
  }, [isRotating, handleRotationMove, handleRotationEnd]);

  // Keep wrapper position in pixels when not dragging/rotating so re-renders don't move the ruler
  React.useEffect(() => {
    if (isRotating || isDraggingRef.current || !containerRef.current || !position) return;
    const wrapper = containerRef.current.parentElement;
    if (!wrapper || !wrapper.classList.contains('draggable-component')) return;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    const centerX = (parseFloat(position.left) / 100) * vw;
    const centerY = (parseFloat(position.top) / 100) * vh;
    const W = wrapperDimensionsRef.current.width || lengthPixels;
    const H = wrapperDimensionsRef.current.height || widthPixels;
    wrapper.style.setProperty('left', `${centerX - W / 2}px`, 'important');
    wrapper.style.setProperty('top', `${centerY - H / 2}px`, 'important');
    wrapper.style.setProperty('position', 'fixed', 'important');
    wrapper.style.setProperty('transform', 'none', 'important');
    containerRef.current.style.setProperty('left', '50%', 'important');
    containerRef.current.style.setProperty('top', '50%', 'important');
    containerRef.current.style.setProperty('transform', `translate(-50%, -50%) rotate(${currentRotation}deg)`, 'important');
  }, [position, currentRotation, lengthPixels, widthPixels, isRotating]);

  // Handle marker interactions
  const handleRulerClick = React.useCallback((e) => {
    const t = e.target;
    const isMarker = t && (t.closest && t.closest('[data-marker-id]'));
    if (isMarker) {
      console.log('[MarkerDrag DEBUG] handleRulerClick: click was on a marker (target)', t?.tagName, t?.getAttribute?.('data-marker-id'));
      return; // Don't add a new marker when clicking on existing marker
    }
    if (!effectiveMeasurementMarkers.enabled || !effectiveMeasurementMarkers.allowClick) return;
    
    // Check if we already have a movable marker (fixed marker + one movable = 2 total)
    const hasMovableMarker = markers.some(m => m.id !== FIXED_MARKER_ID);
    if (hasMovableMarker) return; // Already have a movable marker
    
    e.stopPropagation();
    
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clickY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
    
    let position = RulerUtils.calculateMarkerPosition(
      { x: clickX, y: clickY },
      rect,
      currentRotation,
      lengthPixels
    );
    
    // Snap to ticks if enabled
    if (effectiveMeasurementMarkers.snapToTicks) {
      const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
      position = RulerUtils.snapMarkerToTicks(
        position,
        dimensions.lengthInUnits,
        minorTickInterval
      );
    }
    // Movable marker cannot be left of the fixed marker (zero mark)
    position = Math.max(GLASS_MARGIN_RATIO, Math.min(1, position));
    
    const newMarker = {
      id: `marker-${Date.now()}`,
      position: position,
      fixed: false
    };
    
    const newMarkers = [...markers, newMarker];
    setMarkers(newMarkers);
    
    if (onMarkerAdd) {
      onMarkerAdd(newMarker);
    }
    
    // Trigger measurement callback if we have 2 markers (fixed + movable)
    if (newMarkers.length === 2 && onMeasure) {
      const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
      const fixedMarker = newMarkers.find(m => m.id === FIXED_MARKER_ID);
      const movableMarker = newMarkers.find(m => m.id !== FIXED_MARKER_ID);
      const useReadingFromStart = effectiveMeasurementMarkers.measurementDisplayMode === 'readingFromStart';
      const snapPos = resolvedEndMarkerSnapPosition;
      let distance;
      if (useReadingFromStart && typeof snapPos === 'number' && snapPos > GLASS_MARGIN_RATIO) {
        // Scale reading: 0 at zero mark, length AC at snap (snap is base + 0.05, so reading at snap = base * lengthInUnits)
        const fromZero = movableMarker.position - GLASS_MARGIN_RATIO;
        distance = fromZero * dimensions.lengthInUnits;
      } else if (useReadingFromStart) {
        distance = movableMarker.position * dimensions.lengthInUnits;
      } else {
        distance = Math.abs(movableMarker.position - fixedMarker.position) * dimensions.lengthInUnits;
      }
      onMeasure(distance, dimensions.unit, newMarkers);
    }
  }, [effectiveMeasurementMarkers, markers, currentRotation, rulerType, length, lengthPixels, minorTickInterval, onMarkerAdd, onMeasure, FIXED_MARKER_ID, resolvedEndMarkerSnapPosition]);

  // Keep drag handler context in ref so synchronous listeners always have latest values
  const vertexCPosPx = (id && String(id) === 'page6-ruler') ? (page6VertexCFromDOM ?? (typeof window !== 'undefined' ? window.page6VertexCPosPx : null)) : (id && String(id) === 'page4-ruler') ? (page4VertexCFromDOM ?? (typeof window !== 'undefined' ? window.page4VertexCPosPx : null)) : (page2VertexCFromDOM ?? (typeof window !== 'undefined' ? window.page2VertexCPosPx : null));
  markerDragCtxRef.current = {
    currentRotation,
    lengthPixels,
    widthPixels,
    length,
    rulerType,
    minorTickInterval,
    snapToTicks: effectiveMeasurementMarkers.snapToTicks,
    endMarkerSnapAtPoint: effectiveMeasurementMarkers.endMarkerSnapAtPoint ?? null,
    endMarkerSnapPosition: effectiveMeasurementMarkers.endMarkerSnapPosition ?? null,
    endMarkerSnapLengthAC_px: effectiveMeasurementMarkers.endMarkerSnapLengthAC_px ?? null,
    endMarkerSnapTolerance: effectiveMeasurementMarkers.endMarkerSnapTolerance ?? 0.25,
    vertexCPosPx,
    position: currentPosition || rulerInitialPosition,
    setMarkers,
    onMeasure,
    FIXED_MARKER_ID,
    resolvedEndMarkerSnapPosition
  };

  const handleMarkerDragStart = React.useCallback((markerId, e) => {
    if (!effectiveMeasurementMarkers.enabled || !effectiveMeasurementMarkers.allowDrag) return;
    if (markerId === FIXED_MARKER_ID) return;
    if (markerDragInProgressRef.current) return;
    markerDragInProgressRef.current = true;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[MarkerDrag DEBUG] handleMarkerDragStart', { markerId, hasRef: !!measurementMarkersRef.current, hasUpdate: !!(measurementMarkersRef.current && measurementMarkersRef.current.updateMarkerPosition) });
    
    const ctx = markerDragCtxRef.current;
    if (!ctx || !containerRef.current) {
      markerDragInProgressRef.current = false;
      return;
    }
    
    const isPointerEvent = e.pointerId != null;
    const captureTarget = isPointerEvent && e.pointerType === 'touch' && e.target && typeof e.target.setPointerCapture === 'function' ? e.target : null;
    if (captureTarget) {
      try {
        captureTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        // ignore if capture not supported
      }
    }
    
    // Capture ruler rect in next frame so first-drag uses same layout as second-drag (avoids disproportionate sensitivity)
    markerDragRectRef.current = null;
    requestAnimationFrame(() => {
      if (containerRef.current) {
        markerDragRectRef.current = containerRef.current.getBoundingClientRect();
      }
    });
    
    const dragTouchId = e.touches && e.touches[0] ? e.touches[0].identifier : null;
    const startMarkerPosition = markers.find(m => m.id === markerId)?.position ?? 0;
    const startClientX = e.clientX != null ? e.clientX : e.touches?.[0]?.clientX;
    const startClientY = e.clientY != null ? e.clientY : e.touches?.[0]?.clientY;
    const MOVE_THRESHOLD_PX = 3;
    let moveCount = 0;
    let hasExceededThreshold = false;
    const onMove = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();
      if (!containerRef.current) return;
      const rect = markerDragRectRef.current || containerRef.current.getBoundingClientRect();
      let clientX, clientY;
      if (moveEvent.clientX !== undefined && moveEvent.clientY !== undefined) {
        clientX = moveEvent.clientX;
        clientY = moveEvent.clientY;
      } else if (moveEvent.touches && moveEvent.touches.length > 0) {
        const touch = dragTouchId != null
          ? Array.from(moveEvent.touches).find(t => t.identifier === dragTouchId)
          : moveEvent.touches[0];
        if (touch) {
          clientX = touch.clientX;
          clientY = touch.clientY;
        }
      }
      if (clientX === undefined || clientY === undefined) return;
      
      const c = markerDragCtxRef.current;
      if (!c) return;
      const dx = startClientX != null && startClientY != null ? clientX - startClientX : 0;
      const dy = startClientX != null && startClientY != null ? clientY - startClientY : 0;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq >= MOVE_THRESHOLD_PX * MOVE_THRESHOLD_PX) {
        hasExceededThreshold = true;
      }
      // Delta-based position: (startClientX, startClientY) <-> startMarkerPosition is the only anchor; no rect origin needed
      // so first drag matches second drag and there is no jump to ~0.5 from wrong getBoundingClientRect()
      const rotationRad = -c.currentRotation * (Math.PI / 180);
      const localDeltaPx = dx * Math.cos(rotationRad) - dy * Math.sin(rotationRad);
      const positionDelta = localDeltaPx / c.lengthPixels;
      let position = hasExceededThreshold ? startMarkerPosition + positionDelta : startMarkerPosition;
      // Use same snap target as resolvedEndMarkerSnapPosition so marker snaps to correct value (e.g. 16.8 for BC)
      const tolerance = typeof c.endMarkerSnapTolerance === 'number' ? c.endMarkerSnapTolerance : 0.25;
      let snapTargetPosition = null;
      if (typeof c.resolvedEndMarkerSnapPosition === 'number' && c.resolvedEndMarkerSnapPosition >= 0 && c.resolvedEndMarkerSnapPosition <= 1) {
        snapTargetPosition = c.resolvedEndMarkerSnapPosition;
      } else if (c.endMarkerSnapAtPoint && typeof c.endMarkerSnapAtPoint.x === 'number' && typeof c.endMarkerSnapAtPoint.y === 'number') {
        snapTargetPosition = RulerUtils.calculateMarkerPosition(c.endMarkerSnapAtPoint, rect, c.currentRotation, c.lengthPixels);
        snapTargetPosition = Math.max(0, Math.min(1, snapTargetPosition));
      } else if (typeof c.endMarkerSnapLengthAC_px === 'number' && c.endMarkerSnapLengthAC_px > 0 && c.lengthPixels > 0) {
        const glassMargin = c.lengthPixels * GLASS_MARGIN_RATIO;
        snapTargetPosition = Math.max(0, Math.min(1, (glassMargin + c.endMarkerSnapLengthAC_px) / c.lengthPixels));
      } else if (typeof c.endMarkerSnapPosition === 'number' && c.endMarkerSnapPosition >= 0 && c.endMarkerSnapPosition <= 1) {
        snapTargetPosition = c.endMarkerSnapPosition;
      }
      if (snapTargetPosition != null && Math.abs(position - snapTargetPosition) <= tolerance) {
        position = snapTargetPosition;
      } else if (c.snapToTicks) {
        const dimensions = RulerUtils.getRulerDimensions(c.rulerType, c.length);
        position = RulerUtils.snapMarkerToTicks(position, dimensions.lengthInUnits, c.minorTickInterval);
      }
      // Movable marker cannot move left of the fixed marker (zero mark at GLASS_MARGIN_RATIO)
      position = Math.max(GLASS_MARGIN_RATIO, Math.min(1, position));
      draggingMarkerPositionRef.current = { markerId, position };
      moveCount++;
      const hasRef = !!measurementMarkersRef.current;
      const hasUpdate = hasRef && typeof measurementMarkersRef.current.updateMarkerPosition === 'function';
      if (moveCount <= 3 || moveCount % 20 === 0) {
        console.log('[MarkerDrag DEBUG] onMove', { moveCount, position, hasRef, hasUpdate, markerId });
      }
      // Update marker position every move so it follows the drag smoothly (mouse and touch).
      if (hasUpdate) {
        measurementMarkersRef.current.updateMarkerPosition(markerId, position);
      }
    };
    
    const onEnd = (endEvent) => {
      if (endEvent) {
        endEvent.preventDefault();
        endEvent.stopPropagation();
      }
      console.log('[MarkerDrag DEBUG] onEnd (drag stopped)');
      markerDragInProgressRef.current = false;
      markerDragRectRef.current = null;
      const listeners = markerDragListenersRef.current;
      if (listeners && listeners.captureTarget && endEvent && endEvent.pointerId != null) {
        try {
          listeners.captureTarget.releasePointerCapture(endEvent.pointerId);
        } catch (err) {}
      }
      if (markerDragRafIdRef.current != null) {
        cancelAnimationFrame(markerDragRafIdRef.current);
        markerDragRafIdRef.current = null;
      }
      const pending = markerDragPendingRef.current;
      if (pending && measurementMarkersRef.current && typeof measurementMarkersRef.current.updateMarkerPosition === 'function') {
        measurementMarkersRef.current.updateMarkerPosition(pending.markerId, pending.position);
      }
      markerDragPendingRef.current = null;
      if (listeners) {
        if (listeners.captureTarget) {
          listeners.captureTarget.removeEventListener('pointermove', listeners.onMove, true);
          listeners.captureTarget.removeEventListener('pointerup', listeners.onEnd, true);
          listeners.captureTarget.removeEventListener('pointercancel', listeners.onEnd, true);
        } else {
          window.removeEventListener('mousemove', listeners.onMove, true);
          window.removeEventListener('mouseup', listeners.onEnd, true);
          window.removeEventListener('touchmove', listeners.onMove, { capture: true, passive: false });
          window.removeEventListener('touchend', listeners.onEnd, { capture: true, passive: false });
          window.removeEventListener('touchcancel', listeners.onEnd, { capture: true, passive: false });
        }
        markerDragListenersRef.current = null;
      }
      const finalPos = draggingMarkerPositionRef.current?.position;
      draggingMarkerPositionRef.current = null;
      if (finalPos != null) {
        setMarkers(prev => {
          const next = prev.map(m => {
            if (m.id === FIXED_MARKER_ID) return m;
            return m.id === markerId ? { ...m, position: finalPos } : m;
          });
          if (next.length === 2 && onMeasure) {
        const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
            const fixedMarker = next.find(m => m.id === FIXED_MARKER_ID);
            const movableMarker = next.find(m => m.id !== FIXED_MARKER_ID);
        if (fixedMarker && movableMarker) {
              const useReadingFromStart = effectiveMeasurementMarkers.measurementDisplayMode === 'readingFromStart';
              const snapPos = resolvedEndMarkerSnapPosition;
              let distance;
              if (useReadingFromStart && typeof snapPos === 'number' && snapPos > GLASS_MARGIN_RATIO) {
                const fromZero = movableMarker.position - GLASS_MARGIN_RATIO;
                distance = fromZero * dimensions.lengthInUnits;
              } else if (useReadingFromStart) {
                distance = movableMarker.position * dimensions.lengthInUnits;
              } else {
                distance = Math.abs(movableMarker.position - fixedMarker.position) * dimensions.lengthInUnits;
              }
              onMeasure(distance, dimensions.unit, next);
            }
          }
          return next;
        });
      }
      setDraggingMarkerId(null);
    };
    
    markerDragListenersRef.current = { onMove, onEnd, captureTarget: captureTarget || null };
    if (captureTarget) {
      captureTarget.addEventListener('pointermove', onMove, true);
      captureTarget.addEventListener('pointerup', onEnd, true);
      captureTarget.addEventListener('pointercancel', onEnd, true);
      console.log('[MarkerDrag DEBUG] listeners attached to capture target (pointermove, pointerup, pointercancel)');
    } else {
      window.addEventListener('mousemove', onMove, true);
      window.addEventListener('mouseup', onEnd, true);
      window.addEventListener('touchmove', onMove, { capture: true, passive: false });
      window.addEventListener('touchend', onEnd, { capture: true, passive: false });
      window.addEventListener('touchcancel', onEnd, { capture: true, passive: false });
      console.log('[MarkerDrag DEBUG] listeners attached to window (mousemove, mouseup, touchmove, touchend)');
    }
    
    setDraggingMarkerId(markerId);
    draggingMarkerPositionRef.current = { markerId, position: markers.find(m => m.id === markerId)?.position ?? 0 };
  }, [effectiveMeasurementMarkers.enabled, effectiveMeasurementMarkers.allowDrag, effectiveMeasurementMarkers.measurementDisplayMode, markers, onMeasure, rulerType, length, FIXED_MARKER_ID, resolvedEndMarkerSnapPosition]);

  const handleMarkerClick = React.useCallback((markerId) => {
    // Don't allow removing the fixed marker
    if (markerId === FIXED_MARKER_ID) return;
    
    // Remove marker on click (if you want double-click, change this)
    const updatedMarkers = markers.filter(m => m.id !== markerId);
    setMarkers(updatedMarkers);
    
    if (onMarkerRemove) {
      const removedMarker = markers.find(m => m.id === markerId);
      onMarkerRemove(removedMarker);
    }
  }, [markers, onMarkerRemove, FIXED_MARKER_ID]);

  // During drag, show marker at live position from ref so it follows mouse (ref updated every move, re-render via dragRenderTick)
  const displayMarkers = React.useMemo(() => {
    const live = draggingMarkerPositionRef.current;
    if (!draggingMarkerId || !live || live.markerId !== draggingMarkerId) return markers;
    return markers.map(m => m.id === draggingMarkerId ? { ...m, position: live.position } : m);
  }, [markers, draggingMarkerId, dragRenderTick]);

  // End marker is snapped to point C when within tolerance of snap target
  const isEndMarkerSnapped = React.useMemo(() => {
    const snapPos = resolvedEndMarkerSnapPosition;
    const tolerance = effectiveMeasurementMarkers.endMarkerSnapTolerance ?? 0.25;
    if (snapPos == null || typeof snapPos !== 'number') return false;
    const movable = displayMarkers.find(m => !m.fixed && m.id !== FIXED_MARKER_ID);
    if (!movable) return false;
    return Math.abs(movable.position - snapPos) <= tolerance;
  }, [displayMarkers, resolvedEndMarkerSnapPosition, effectiveMeasurementMarkers.endMarkerSnapTolerance, FIXED_MARKER_ID]);

  // When end marker is snapped (page 2 ruler), publish vertex C and snap point; state A step 3: set measurementText and trigger complete
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page2-ruler') || !isEndMarkerSnapped) {
      if (typeof window !== 'undefined') window.page2SnapResult = null;
      return;
    }
    // Don't complete step 3 if movable marker is still at start (user hasn't dragged yet) — avoids auto-complete when entering step 3
    const movable = displayMarkers.find(m => !m.fixed && m.id !== FIXED_MARKER_ID);
    if (movable && Math.abs(movable.position - GLASS_MARGIN_RATIO) < 0.02) {
      return;
    }
    const state = window.page2State || 'C';
    const step = window.page2Step !== undefined ? window.page2Step : 1;
    const vertexC = page2VertexCFromDOM ?? window.page2VertexCPosPx;
    const snapPos = resolvedEndMarkerSnapPosition;
    if (!vertexC || typeof vertexC.x !== 'number' || typeof vertexC.y !== 'number' || snapPos == null || typeof snapPos !== 'number') return;
    const round10 = (v) => Math.round(v * 10) / 10;
    // When we have vertex C from DOM, snap point should match it. Otherwise compute from ruler geometry.
    const snapPoint = page2VertexCFromDOM
      ? { x: round10(page2VertexCFromDOM.x), y: round10(page2VertexCFromDOM.y) }
      : (() => {
          if (!containerRef.current) return { x: round10(vertexC.x), y: round10(vertexC.y) };
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          let rot = currentRotation;
          const style = window.getComputedStyle(containerRef.current);
          const transform = style.transform;
          if (transform && transform !== 'none') {
            const m = transform.match(/matrix\(([^)]+)\)/);
            if (m) {
              const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
              if (parts.length >= 4) rot = Math.atan2(parts[1], parts[0]) * (180 / Math.PI);
            }
          }
          const rulerLengthPx = lengthPixels;
          const rotationRad = (rot * Math.PI) / 180;
          const directionX = Math.cos(rotationRad);
          const directionY = Math.sin(rotationRad);
          const halfLength = rulerLengthPx / 2;
          const offsetFromCenterPx = snapPos * rulerLengthPx - halfLength;
          return { x: round10(centerX + offsetFromCenterPx * directionX), y: round10(centerY + offsetFromCenterPx * directionY) };
        })();
    window.page2SnapResult = {
      vertexC: { x: round10(vertexC.x), y: round10(vertexC.y) },
      snapPoint
    };
    // State A step 3: on measurement snap go to step 4 (same as State C/B); tap-anywhere then goes to complete
    // State C step 3: on measurement snap set measurementText and transition to step 4
    // State B step 3: on measurement snap set measurementText and transition to step 4
    const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
    const lengthInUnits = dimensions.lengthInUnits || 300;
    const rawCm = (snapPos - GLASS_MARGIN_RATIO) * lengthInUnits / 10;
    const valueCm = Math.round(rawCm / 0.2) * 0.2;
    if (state === 'A' && step === 3) {
      const snapPosNum = resolvedEndMarkerSnapPosition;
      if (snapPosNum == null || typeof snapPosNum !== 'number' || snapPosNum < 0.2) return; // 24.7 cm is ~0.87
      if (!movable || Math.abs(movable.position - snapPosNum) > 0.12) return; // must be within ~3.6 cm of target
      const bcVal = typeof window !== 'undefined' ? (window.page2MeasurementBC_cm || '') : '';
      const abVal = typeof window !== 'undefined' ? (window.page2MeasurementAB_cm || '') : '';
      const acStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page2MeasurementAC_cm = acStr;
      window.page2MeasurementText = [bcVal && `BC = ${bcVal} cm`, abVal && `AB = ${abVal} cm`, `AC = ${acStr} cm`].filter(Boolean).join('\n');
      window.page2State = 'A';
      window.page2Step = 4; // Stay in A, show "Tap anywhere to continue"; movable marker stays green (snapped)
      if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page2StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('pageStateChanged', { detail: { state: 'A', step: 4 } }));
      if (typeof window.updatePage2MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage2MeasurementText(); });
        setTimeout(() => { window.updatePage2MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page2-measurement-text');
        if (el) el.textContent = window.page2MeasurementText;
      }
    }
    if (state === 'C' && step === 3) {
      const bcStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page2MeasurementBC_cm = bcStr;
      window.page2MeasurementText = `BC = ${bcStr} cm`;
      window.page2State = 'C';
      window.page2Step = 4; // Stay in C, show "Tap anywhere to continue"; movable marker stays green (snapped)
      if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page2StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('pageStateChanged', { detail: { state: 'C', step: 4 } }));
      if (typeof window.updatePage2MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage2MeasurementText(); });
        setTimeout(() => { window.updatePage2MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page2-measurement-text');
        if (el) el.textContent = window.page2MeasurementText;
      }
    }
    // State B step 3: on measurement snap go to step 4 (same as State C step 3 → 4); tap-anywhere then goes to state A step 1
    if (state === 'B' && step === 3) {
      const snapPosNum = resolvedEndMarkerSnapPosition;
      if (snapPosNum == null || typeof snapPosNum !== 'number' || snapPosNum < 0.2) return; // 26.6 cm is ~0.94
      if (!movable || Math.abs(movable.position - snapPosNum) > 0.12) return; // must be within ~3.6 cm of target
      const abStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page2MeasurementAB_cm = abStr;
      const bcVal = typeof window !== 'undefined' ? (window.page2MeasurementBC_cm || '') : '';
      window.page2MeasurementText = [bcVal && `BC = ${bcVal} cm`, `AB = ${abStr} cm`].filter(Boolean).join('\n');
      window.page2State = 'B';
      window.page2Step = 4; // Stay in B, show "Tap anywhere to continue"; movable marker stays green (snapped)
      if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page2StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('pageStateChanged', { detail: { state: 'B', step: 4 } }));
      if (typeof window.updatePage2MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage2MeasurementText(); });
        setTimeout(() => { window.updatePage2MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page2-measurement-text');
        if (el) el.textContent = window.page2MeasurementText;
      }
    }
    return () => { if (typeof window !== 'undefined') window.page2SnapResult = null; };
  }, [id, isEndMarkerSnapped, resolvedEndMarkerSnapPosition, currentRotation, lengthPixels, page2VertexCFromDOM, rulerType, length, displayMarkers]);

  // When end marker is snapped (page 4 ruler), same logic as page 2: set measurement text and advance to step 4
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page4-ruler') || !isEndMarkerSnapped) return;
    const movable = displayMarkers.find(m => !m.fixed && m.id !== FIXED_MARKER_ID);
    if (movable && Math.abs(movable.position - GLASS_MARGIN_RATIO) < 0.02) return;
    const state = window.page4State || 'C';
    const step = window.page4Step !== undefined ? window.page4Step : 1;
    const snapPos = resolvedEndMarkerSnapPosition;
    if (snapPos == null || typeof snapPos !== 'number') return;
    const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
    const lengthInUnits = dimensions.lengthInUnits || 300;
    const rawCm = (snapPos - GLASS_MARGIN_RATIO) * lengthInUnits / 10;
    const valueCm = Math.round(rawCm / 0.2) * 0.2;
    if (state === 'A' && step === 3) {
      const snapPosNum = resolvedEndMarkerSnapPosition;
      if (snapPosNum == null || typeof snapPosNum !== 'number' || snapPosNum < 0.2) return;
      if (!movable || Math.abs(movable.position - snapPosNum) > 0.12) return;
      const bcVal = typeof window !== 'undefined' ? (window.page4MeasurementBC_cm || '') : '';
      const abVal = typeof window !== 'undefined' ? (window.page4MeasurementAB_cm || '') : '';
      const acStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page4MeasurementAC_cm = acStr;
      window.page4MeasurementText = [bcVal && `BC = ${bcVal} cm`, abVal && `AB = ${abVal} cm`, `AC = ${acStr} cm`].filter(Boolean).join('\n');
      window.page4State = 'A';
      window.page4Step = 4;
      if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: 'A', step: 4 } }));
      if (typeof window.updatePage4MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage4MeasurementText(); });
        setTimeout(() => { window.updatePage4MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page4-measurement-text');
        if (el) el.textContent = window.page4MeasurementText;
      }
    }
    if (state === 'C' && step === 3) {
      const bcStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page4MeasurementBC_cm = bcStr;
      window.page4MeasurementText = `BC = ${bcStr} cm`;
      window.page4State = 'C';
      window.page4Step = 4;
      if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: 'C', step: 4 } }));
      if (typeof window.updatePage4MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage4MeasurementText(); });
        setTimeout(() => { window.updatePage4MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page4-measurement-text');
        if (el) el.textContent = window.page4MeasurementText;
      }
    }
    if (state === 'B' && step === 3) {
      const snapPosNum = resolvedEndMarkerSnapPosition;
      if (snapPosNum == null || typeof snapPosNum !== 'number' || snapPosNum < 0.2) return;
      if (!movable || Math.abs(movable.position - snapPosNum) > 0.12) return;
      const abStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page4MeasurementAB_cm = abStr;
      const bcVal = typeof window !== 'undefined' ? (window.page4MeasurementBC_cm || '') : '';
      window.page4MeasurementText = [bcVal && `BC = ${bcVal} cm`, `AB = ${abStr} cm`].filter(Boolean).join('\n');
      window.page4State = 'B';
      window.page4Step = 4;
      if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: 'B', step: 4 } }));
      if (typeof window.updatePage4MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage4MeasurementText(); });
        setTimeout(() => { window.updatePage4MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page4-measurement-text');
        if (el) el.textContent = window.page4MeasurementText;
      }
    }
  }, [id, isEndMarkerSnapped, resolvedEndMarkerSnapPosition, rulerType, length, displayMarkers]);

  // When end marker is snapped (page 6 ruler), same logic as page 4: set measurement text and advance to step 4
  React.useEffect(() => {
    if (typeof window === 'undefined' || !(id && String(id) === 'page6-ruler') || !isEndMarkerSnapped) return;
    const movable = displayMarkers.find(m => !m.fixed && m.id !== FIXED_MARKER_ID);
    if (movable && Math.abs(movable.position - GLASS_MARGIN_RATIO) < 0.02) return;
    const state = window.page6State || 'C';
    const step = window.page6Step !== undefined ? window.page6Step : 1;
    const snapPos = resolvedEndMarkerSnapPosition;
    if (snapPos == null || typeof snapPos !== 'number') return;
    const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
    const lengthInUnits = dimensions.lengthInUnits || 300;
    const rawCm = (snapPos - GLASS_MARGIN_RATIO) * lengthInUnits / 10;
    const valueCm = Math.round(rawCm / 0.2) * 0.2;
    if (state === 'A' && step === 3) {
      const snapPosNum = resolvedEndMarkerSnapPosition;
      if (snapPosNum == null || typeof snapPosNum !== 'number' || snapPosNum < 0.2) return;
      if (!movable || Math.abs(movable.position - snapPosNum) > 0.12) return;
      const bcVal = typeof window !== 'undefined' ? (window.page6MeasurementBC_cm || '') : '';
      const abVal = typeof window !== 'undefined' ? (window.page6MeasurementAB_cm || '') : '';
      const acStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page6MeasurementAC_cm = acStr;
      window.page6MeasurementText = [bcVal && `BC = ${bcVal} cm`, abVal && `AB = ${abVal} cm`, `AC = ${acStr} cm`].filter(Boolean).join('\n');
      window.page6State = 'A';
      window.page6Step = 4;
      if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: 'A', step: 4 } }));
      if (typeof window.updatePage6MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage6MeasurementText(); });
        setTimeout(() => { window.updatePage6MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page6-measurement-text');
        if (el) el.textContent = window.page6MeasurementText;
      }
    }
    if (state === 'C' && step === 3) {
      const bcStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page6MeasurementBC_cm = bcStr;
      window.page6MeasurementText = `BC = ${bcStr} cm`;
      window.page6State = 'C';
      window.page6Step = 4;
      if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: 'C', step: 4 } }));
      if (typeof window.updatePage6MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage6MeasurementText(); });
        setTimeout(() => { window.updatePage6MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page6-measurement-text');
        if (el) el.textContent = window.page6MeasurementText;
      }
    }
    if (state === 'B' && step === 3) {
      const snapPosNum = resolvedEndMarkerSnapPosition;
      if (snapPosNum == null || typeof snapPosNum !== 'number' || snapPosNum < 0.2) return;
      if (!movable || Math.abs(movable.position - snapPosNum) > 0.12) return;
      const abStr = valueCm.toFixed(1);
      if (typeof window !== 'undefined') window.page6MeasurementAB_cm = abStr;
      const bcVal = typeof window !== 'undefined' ? (window.page6MeasurementBC_cm || '') : '';
      window.page6MeasurementText = [bcVal && `BC = ${bcVal} cm`, `AB = ${abStr} cm`].filter(Boolean).join('\n');
      window.page6State = 'B';
      window.page6Step = 4;
      if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 4, previousStep: 3 } }));
      window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: 'B', step: 4 } }));
      if (typeof window.updatePage6MeasurementText === 'function') {
        requestAnimationFrame(() => { window.updatePage6MeasurementText(); });
        setTimeout(() => { window.updatePage6MeasurementText(); }, 100);
      } else {
        const el = document.getElementById('page6-measurement-text');
        if (el) el.textContent = window.page6MeasurementText;
      }
    }
  }, [id, isEndMarkerSnapped, resolvedEndMarkerSnapPosition, rulerType, length, displayMarkers]);

  // Console panel: length AC (calc), marker positions/measurements, snap comparison (step 3 when snap target is set)
  React.useEffect(() => {
    if (!effectiveMeasurementMarkers.enabled || displayMarkers.length < 2) return;
    const snapPos = resolvedEndMarkerSnapPosition;
    const tolerance = effectiveMeasurementMarkers.endMarkerSnapTolerance ?? 0.25;
    const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
    const lengthInUnits = dimensions.lengthInUnits || 300;
    const unit = dimensions.unit || 'mm';
    const displayUnit = dimensions.displayUnit || 'cm';

    const fixedMarker = displayMarkers.find(m => m.fixed || m.id === FIXED_MARKER_ID);
    const movableMarker = displayMarkers.find(m => !m.fixed && m.id !== FIXED_MARKER_ID);
    if (!fixedMarker || !movableMarker) return;

    const fixedPos = fixedMarker.position;
    const movablePos = movableMarker.position;
    // position 0 = start edge, 1 = end; mm from start edge = position * lengthInUnits (so panel matches rulerCoordsFor220mm/snap: 458.7/550 * 300 = 250.36)
    const fixedMmFromStart = fixedPos * lengthInUnits;
    const movableMmFromStart = movablePos * lengthInUnits;
    const fixedMm = (fixedPos - GLASS_MARGIN_RATIO) * lengthInUnits;
    const movableMm = (movablePos - GLASS_MARGIN_RATIO) * lengthInUnits;
    const distanceMm = Math.abs(movablePos - fixedPos) * lengthInUnits;
    const distanceCm = distanceMm / 10;
    // Measurement as "reading from start edge" (consistent with snap/lengthAC): movablePos * lengthInUnits
    const measurementMmFromStart = movablePos * lengthInUnits;
    const measurementCmFromStart = measurementMmFromStart / 10;

    const lengthAC_px = (typeof snapPos === 'number' && snapPos >= 0 && snapPos <= 1) ? snapPos * lengthPixels : null;
    const lengthAC_mm = lengthAC_px != null ? snapPos * lengthInUnits : null;
    const lengthAC_cm = lengthAC_mm != null ? lengthAC_mm / 10 : null;

    const canSnap = typeof snapPos === 'number' && Math.abs(movablePos - snapPos) <= tolerance;
    // Target as "from start edge" (snapPos * lengthInUnits) to match rulerCoordsFor220mm and measurement
    const snapTargetMm = typeof snapPos === 'number' ? snapPos * lengthInUnits : null;
    const snapTargetCm = snapTargetMm != null ? snapTargetMm / 10 : null;
    const diffFromSnap = typeof snapPos === 'number' ? movablePos - snapPos : null;
    const lengthAC_px_forSnap = effectiveMeasurementMarkers.endMarkerSnapLengthAC_px ?? (typeof window !== 'undefined' ? ((id && String(id) === 'page6-ruler') ? window.page6EndMarkerSnapLengthAC_px : (id && String(id) === 'page4-ruler') ? window.page4EndMarkerSnapLengthAC_px : window.page2EndMarkerSnapLengthAC_px) : null);

    // Ruler coordinates: position (0–1), x in ruler local pixels. position 0 = start edge, GLASS_MARGIN_RATIO = zero mark.
    const glassMargin = lengthPixels * GLASS_MARGIN_RATIO;
    const mmToRulerCoords = (mm) => {
      const pos = GLASS_MARGIN_RATIO + (mm / lengthInUnits);
      const xFromLeftEdge = pos * lengthPixels;
      return { position: pos, xPxFromLeft: xFromLeftEdge };
    };
    // Only used when there is no snap target (reference point for debug panel)
    const coords220 = mmToRulerCoords(220.2);

    // Actual pixel coordinates in viewport: ruler edges, markers, and snap/reference point
    // Use the ACTUAL rotation from the DOM (getComputedStyle transform) so we match what's rendered; state currentRotation can be stale (e.g. 90 from props) when the DOM was updated directly during snap.
    let screenPx220 = null;
    let rulerEdgesScreenPx = null;
    let fixedScreenPx = null;
    let movableScreenPx = null;
    let debugRotation = null;
    if (position && typeof window !== 'undefined') {
      const vw = window.innerWidth || 1600;
      const vh = window.innerHeight || 900;
      const centerX = (parseFloat(String(position.left)) / 100) * vw;
      const centerY = (parseFloat(String(position.top)) / 100) * vh;
      // Prefer rotation from DOM transform so panel matches visual (state can be 90 when DOM is slanted after snap)
      let rotationDeg = currentRotation;
      if (containerRef.current) {
        const style = window.getComputedStyle(containerRef.current);
        const transform = style.transform;
        if (transform && transform !== 'none') {
          const m = transform.match(/matrix\(([^)]+)\)/);
          if (m) {
            const parts = m[1].split(',').map((s) => parseFloat(s.trim()));
            if (parts.length >= 4) {
              const a = parts[0];
              const b = parts[1];
              rotationDeg = Math.atan2(b, a) * (180 / Math.PI);
            }
          }
        }
      }
      const zeroOffset = getZeroMarkOffset(rotationDeg);
      const halfWidth = widthPixels / 2;
      const rotationRad = (rotationDeg * Math.PI) / 180;
      const directionX = Math.cos(rotationRad);
      const directionY = Math.sin(rotationRad);
      const zeroMarkX = centerX + zeroOffset.x + glassMargin * directionX + halfWidth * (-directionY);
      const zeroMarkY = centerY + zeroOffset.y + glassMargin * directionY + halfWidth * directionX;
      const round10 = (v) => Math.round(v * 10) / 10;
      debugRotation = { degrees: round10(rotationDeg), fromDOM: rotationDeg !== currentRotation, directionX: round10(directionX), directionY: round10(directionY) };
      rulerEdgesScreenPx = {
        start: { x: round10(zeroMarkX - glassMargin * directionX), y: round10(zeroMarkY - glassMargin * directionY) },
        zero: { x: round10(zeroMarkX), y: round10(zeroMarkY) },
        end: { x: round10(zeroMarkX + lengthPixels * directionX), y: round10(zeroMarkY + lengthPixels * directionY) }
      };
      fixedScreenPx = { x: round10(zeroMarkX), y: round10(zeroMarkY) };
      const movableDistanceFromZeroPx = movablePos * lengthPixels - glassMargin;
      movableScreenPx = {
        x: round10(zeroMarkX + movableDistanceFromZeroPx * directionX),
        y: round10(zeroMarkY + movableDistanceFromZeroPx * directionY)
      };
      const distancePx = (220.2 / lengthInUnits) * lengthPixels;
      screenPx220 = {
        x: round10(zeroMarkX + distancePx * directionX),
        y: round10(zeroMarkY + distancePx * directionY)
      };
    }

    const verticesScreenPx = (id && String(id) === 'page6-ruler') && typeof window !== 'undefined' && window.page6VertexAPosPx && window.page6VertexBPosPx && window.page6VertexCPosPx
      ? { A: window.page6VertexAPosPx, B: window.page6VertexBPosPx, C: window.page6VertexCPosPx }
      : (id && String(id) === 'page4-ruler') && typeof window !== 'undefined' && window.page4VertexAPosPx && window.page4VertexBPosPx && window.page4VertexCPosPx
      ? { A: window.page4VertexAPosPx, B: window.page4VertexBPosPx, C: window.page4VertexCPosPx }
      : (typeof window !== 'undefined' && window.page2VertexAPosPx && window.page2VertexBPosPx && window.page2VertexCPosPx)
        ? { A: window.page2VertexAPosPx, B: window.page2VertexBPosPx, C: window.page2VertexCPosPx }
        : null;

    // Pixel distance calculations with formula breakdown
    const round10 = (v) => Math.round(v * 10) / 10;
    let calculations = null;
    if (fixedScreenPx && movableScreenPx) {
      const dxFM = movableScreenPx.x - fixedScreenPx.x;
      const dyFM = movableScreenPx.y - fixedScreenPx.y;
      const distanceFixedToMovablePx = Math.sqrt(dxFM * dxFM + dyFM * dyFM);
      calculations = {
        fixedToMovablePx: {
          formula: '√((movable.x - fixed.x)² + (movable.y - fixed.y)²)',
          fixed: fixedScreenPx,
          movable: movableScreenPx,
          dx: round10(dxFM),
          dy: round10(dyFM),
          distancePx: round10(distanceFixedToMovablePx)
        }
      };
    }
    if (verticesScreenPx && verticesScreenPx.A && verticesScreenPx.C) {
      const dxAC = verticesScreenPx.C.x - verticesScreenPx.A.x;
      const dyAC = verticesScreenPx.C.y - verticesScreenPx.A.y;
      const lengthAC_fromVerticesPx = Math.sqrt(dxAC * dxAC + dyAC * dyAC);
      calculations = calculations || {};
      calculations.lengthAC_fromVerticesPx = {
        formula: '√((C.x - A.x)² + (C.y - A.y)²)',
        note: 'Euclidean (straight-line) length A→C in viewport px; not the ruler reading',
        A: verticesScreenPx.A,
        C: verticesScreenPx.C,
        dx: round10(dxAC),
        dy: round10(dyAC),
        distancePx: round10(lengthAC_fromVerticesPx)
      };
    }
    let distanceFromStartEdgeToC_forPanel = null;
    if (rulerEdgesScreenPx && rulerEdgesScreenPx.start && verticesScreenPx && verticesScreenPx.C) {
      const start = rulerEdgesScreenPx.start;
      const C = verticesScreenPx.C;
      const dx = C.x - start.x;
      const dy = C.y - start.y;
      const startEdgeToVertexC_px = Math.sqrt(dx * dx + dy * dy);
      distanceFromStartEdgeToC_forPanel = round10(startEdgeToVertexC_px);
      calculations = calculations || {};
      calculations.startEdgeToVertexC_px = {
        formula: '√((C.x - start.x)² + (C.y - start.y)²)',
        note: 'Euclidean distance start→C; marker position = this / lengthPixels',
        start,
        C,
        distanceAlongRulerPx: distanceFromStartEdgeToC_forPanel
      };
    }
    // When we have vertex C, snap position = distanceFromStartEdgeToC / lengthPixels (e.g. 420.6/550), not (glassMargin + lengthAC_px)/lengthPixels
    const positionCalcDistanceFromStart = distanceFromStartEdgeToC_forPanel != null
      ? distanceFromStartEdgeToC_forPanel
      : (lengthAC_px_forSnap != null ? (glassMargin + lengthAC_px_forSnap) : null);

    // Snap-target coords: prefer vertex C (DOM), else use snapPos (e.g. from length AC), else show reference 220mm
    let screenPxSnapTarget = null;
    if (rulerEdgesScreenPx?.start && debugRotation && typeof snapPos === 'number') {
      const dirX = debugRotation.directionX;
      const dirY = debugRotation.directionY;
      const distPx = snapPos * lengthPixels;
      screenPxSnapTarget = {
        x: Math.round((rulerEdgesScreenPx.start.x + distPx * dirX) * 10) / 10,
        y: Math.round((rulerEdgesScreenPx.start.y + distPx * dirY) * 10) / 10
      };
    }
    const rulerCoordsFor220mm = (snapPos != null && typeof snapPos === 'number' && verticesScreenPx?.C)
      ? {
          position: snapPos,
          positionFormula: `${Math.round(snapPos * lengthPixels)}/${lengthPixels}`,
          xPxFromLeftEdge: Math.round(snapPos * lengthPixels * 10) / 10,
          screenPx: verticesScreenPx.C,
          note: 'snap target (vertex C), same as snap.targetPosition (from DOM)'
        }
      : (snapPos != null && typeof snapPos === 'number')
        ? {
            position: snapPos,
            positionFormula: `${Math.round(snapPos * lengthPixels)}/${lengthPixels}`,
            xPxFromLeftEdge: Math.round(snapPos * lengthPixels * 10) / 10,
            screenPx: screenPxSnapTarget || screenPx220,
            note: snapTargetMm != null ? `snap target (${Math.round(snapTargetMm * 10) / 10} mm, from length AC)` : 'snap target (from length AC)'
          }
        : {
            position: coords220.position,
            xPxFromLeftEdge: Math.round(coords220.xPxFromLeft * 10) / 10,
            screenPx: screenPx220,
            note: '220mm on scale (reference when no snap)'
          };

    // Prefer along-ruler distance to C (single source of truth with startEdgeToVertexC_px) for displayed length AC
    const lengthAC_displayPx = distanceFromStartEdgeToC_forPanel != null ? distanceFromStartEdgeToC_forPanel : lengthAC_px;
    const lengthAC_displayMm = lengthAC_displayPx != null ? (lengthAC_displayPx / lengthPixels) * lengthInUnits : lengthAC_mm;
    const lengthAC_displayCm = lengthAC_displayMm != null ? lengthAC_displayMm / 10 : lengthAC_cm;
    const panel = {
      lengthAC: lengthAC_displayPx != null ? { px: Math.round(lengthAC_displayPx), mm: Math.round(lengthAC_displayMm * 10) / 10, cm: Math.round(lengthAC_displayCm * 100) / 100, note: distanceFromStartEdgeToC_forPanel != null ? 'along ruler (start→C); matches startEdgeToVertexC_px' : 'from snap position' } : null,
      ruler: { lengthPixels: lengthPixels, lengthInUnits, unit, displayUnit, glassMarginPx: glassMargin, edgesScreenPx: rulerEdgesScreenPx, rotation: debugRotation },
      verticesScreenPx,
      calculations,
      rulerCoordsFor220mm,
      markers: {
        fixed: { position: fixedPos, mm: Math.round(fixedMmFromStart * 10) / 10, cm: Math.round((fixedMmFromStart / 10) * 100) / 100, screenPx: fixedScreenPx },
        movable: { position: movablePos, mm: Math.round(movableMmFromStart * 10) / 10, cm: Math.round((movableMmFromStart / 10) * 100) / 100, screenPx: movableScreenPx }
      },
      measurement: { mm: Math.round(measurementMmFromStart * 10) / 10, cm: Math.round(measurementCmFromStart * 100) / 100, note: 'from start edge (position × lengthInUnits)' },
      snap: snapPos != null ? {
        targetPosition: snapPos,
        targetMm: snapTargetMm != null ? Math.round(snapTargetMm * 10) / 10 : null,
        targetCm: snapTargetCm != null ? Math.round(snapTargetCm * 100) / 100 : null,
        tolerance,
        diffFromSnap: diffFromSnap != null ? Math.round(diffFromSnap * 1000) / 1000 : null,
        canSnap,
        isSnapped: isEndMarkerSnapped,
        positionCalculation: {
          formula: window.page2VertexCPosPx ? 'snapPosition = (distance from start edge to vertex C) / lengthPixels' : '(glassMargin + lengthAC_px) / lengthPixels  (fallback)',
          glassMargin,
          lengthAC_px: lengthAC_px_forSnap != null ? Math.round(lengthAC_px_forSnap * 10) / 10 : null,
          distanceFromStartEdgeToC: positionCalcDistanceFromStart != null ? (typeof positionCalcDistanceFromStart === 'number' ? Math.round(positionCalcDistanceFromStart * 10) / 10 : positionCalcDistanceFromStart) : null,
          lengthPixels,
          result: snapPos,
          formulaCheck: positionCalcDistanceFromStart != null && lengthPixels ? `${positionCalcDistanceFromStart} / ${lengthPixels} = ${Math.round((positionCalcDistanceFromStart / lengthPixels) * 1000) / 1000}` : null
        }
      } : null
    };
    console.log('[Ruler Console Panel]', panel);
  }, [displayMarkers, lengthPixels, widthPixels, length, rulerType, currentRotation, position, getZeroMarkOffset, effectiveMeasurementMarkers.enabled, resolvedEndMarkerSnapPosition, effectiveMeasurementMarkers.endMarkerSnapTolerance, isEndMarkerSnapped]);

  // Determine if component should be draggable
  const shouldBeDraggable = React.useMemo(() => {
    return mode === 'draggable' || mode === 'interactive';
  }, [mode]);

  // Calculate transform origin based on current rotation
  // For vertical ruler (rotation: 90), 0 mark is at top center
  // For horizontal ruler (rotation: 0), 0 mark is at left center
  // We pivot around the 0 mark position
  const transformOrigin = React.useMemo(() => {
    // The ruler dimensions: lengthPixels is along the ruler, widthPixels is across
    // When vertical (rotation 90): length is height, width is width
    // When horizontal (rotation 0): length is width, width is height
    
    // Calculate the 0 mark position relative to the ruler's bounding box
    // 0 mark is at -halfLength along the ruler's length direction from center
    const rotationRad = (currentRotation * Math.PI) / 180;
    const halfLength = lengthPixels / 2;
    
    // Calculate offset from center to 0 mark in the ruler's local coordinate system
    // For rotation 0 (horizontal): 0 mark is at left, offset is (-halfLength, 0)
    // For rotation 90 (vertical): 0 mark is at top, offset is (0, -halfLength)
    const zeroOffsetX = -halfLength * Math.cos(rotationRad);
    const zeroOffsetY = -halfLength * Math.sin(rotationRad);
    
    // Convert to percentage relative to ruler's bounding box
    // The ruler's bounding box is lengthPixels x widthPixels
    // Center is at (lengthPixels/2, widthPixels/2)
    // 0 mark is at (lengthPixels/2 + zeroOffsetX, widthPixels/2 + zeroOffsetY)
    const zeroXPercent = ((lengthPixels / 2 + zeroOffsetX) / lengthPixels) * 100;
    const zeroYPercent = ((widthPixels / 2 + zeroOffsetY) / widthPixels) * 100;
    
    return `${zeroXPercent}% ${zeroYPercent}%`;
  }, [currentRotation, lengthPixels, widthPixels]);

  // Container style
  const containerStyle = React.useMemo(() => {
    const baseStyle = {
      position: 'absolute',
      width: `${lengthPixels}px`,
      height: `${widthPixels}px`,
      zIndex: zIndex,
      cursor: shouldBeDraggable ? cursor : 'default',
      pointerEvents: mode === 'static' ? 'none' : 'auto',
      opacity: opacity,
      transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
      transformOrigin: transformOrigin,
      transition: isRotating ? 'none' : 'transform 0.2s ease',
      overflow: 'visible' // Ensure rotation handle is visible
    };

    // Apply style props (display, visibility, etc.)
    // When page2 state is complete, hide ruler (in case parent didn't re-render with display: 'none')
    const isPage2Complete = (id && String(id) === 'page2-ruler') && (typeof window !== 'undefined' && window.page2State === 'complete');
    const isPage4Complete = (id && String(id) === 'page4-ruler') && (typeof window !== 'undefined' && window.page4State === 'complete');
    if (isPage2Complete || isPage4Complete || display !== undefined) {
      baseStyle.display = (isPage2Complete || isPage4Complete) ? 'none' : display;
    }
    if (visibility !== undefined) {
      baseStyle.visibility = visibility;
    }

    if (position) {
      // During drag, override with 50% 50% to center in wrapper
      // Otherwise: position.left/top are stored as CENTER percentage (0-100)
      // CSS left/top are EDGE position, so convert so wrapper center ends up at position
      if (isDraggingRef.current) {
        baseStyle.left = '50%';
        baseStyle.top = '50%';
      } else {
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
        const centerXPercent = parseFloat(position.left);
        const centerYPercent = parseFloat(position.top);
        // left edge % = center % - (half width in px / vw * 100)
        const leftEdgePercent = centerXPercent - (lengthPixels / 2 / vw) * 100;
        const topEdgePercent = centerYPercent - (widthPixels / 2 / vh) * 100;
        baseStyle.left = `${leftEdgePercent}%`;
        baseStyle.top = `${topEdgePercent}%`;
      }
      
      // console.log('🎨 [Ruler] Container style updated:', {
      //   position,
      //   baseStyle: {
      //     left: baseStyle.left,
      //     top: baseStyle.top,
      //     transform: baseStyle.transform,
      //     transformOrigin: baseStyle.transformOrigin,
      //     width: baseStyle.width,
      //     height: baseStyle.height
      //   },
      //   isDragging: isDraggingRef.current,
      //   lengthPixels,
      //   widthPixels,
      //   currentRotation
      // });
    }

    return baseStyle;
  }, [lengthPixels, widthPixels, zIndex, cursor, position, mode, shouldBeDraggable, opacity, currentRotation, isRotating, display, visibility, transformOrigin, id, page2StepState?.state, page4StepState?.state]);

  // Handle click
  const handleClick = React.useCallback((e) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  // Get dimensions for tick marks and measurements
  const rulerDimensions = React.useMemo(() => 
    RulerUtils.getRulerDimensions(rulerType, length),
    [rulerType, length]
  );

  // Render ruler face
  const rulerFace = React.createElement(RulerFace, {
    rulerType,
    lengthInPixels: lengthPixels,
    widthInPixels: widthPixels,
    lengthProp: length, // Pass original length prop for grid type calculation
    dimensions: rulerDimensions, // Pass dimensions for accurate grid unit calculation
    color,
    backgroundColor,
    showTickMarks,
    showLabels,
    majorTickInterval,
    minorTickInterval,
    labelInterval,
    labelFontSize,
    zeroMarkHighlight: zeroMarkHighlight // Pass zero mark highlight flag
  });

  // Render measurement markers (key includes enabled so React mounts fresh when step 3 enables them)
  const rulerDims = RulerUtils.getRulerDimensions(rulerType, length);
  const markersElement = effectiveMeasurementMarkers.enabled ? React.createElement(MeasurementMarkers, {
    key: `measurement-markers-${effectiveMeasurementMarkers.enabled ? 'on' : 'off'}`,
    ref: measurementMarkersRef,
    markers: displayMarkers,
    rulerLengthPixels: lengthPixels,
    rulerWidthPixels: widthPixels,
    rulerRotation: currentRotation,
    markerColor: effectiveMeasurementMarkers.color,
    fixedMarkerColor: effectiveMeasurementMarkers.fixedMarkerColor,
    isEndMarkerSnapped,
    movableMarkerColorWhenSnapped: effectiveMeasurementMarkers.movableMarkerColorWhenSnapped ?? '#22c55e',
    showDistance: effectiveMeasurementMarkers.showDistance,
    distanceUnit: effectiveMeasurementMarkers.distanceUnit ?? rulerDims.displayUnit ?? rulerDims.unit,
    distancePrecision: effectiveMeasurementMarkers.distancePrecision ?? 1,
    distanceLeastCount: effectiveMeasurementMarkers.distanceLeastCount ?? null,
    lengthInUnits: rulerDims.lengthInUnits,
    measurementDisplayMode: effectiveMeasurementMarkers.measurementDisplayMode ?? 'distance',
    endMarkerSnapPosition: resolvedEndMarkerSnapPosition ?? null,
    endMarkerReadingInUnits: (resolvedEndMarkerSnapPosition != null && resolvedEndMarkerSnapPosition > GLASS_MARGIN_RATIO) ? (resolvedEndMarkerSnapPosition - GLASS_MARGIN_RATIO) * rulerDims.lengthInUnits : null,
    markerSize: effectiveMeasurementMarkers.markerSize,
    distanceFontSize: effectiveMeasurementMarkers.distanceFontSize,
    movableMarkerBlink: (isPage2Ruler && ((page2State === 'A' && page2Step === 3) || (page2State === 'C' && page2Step === 3))) || (isPage4Ruler && ((page4State === 'A' && page4Step === 3) || (page4State === 'C' && page4Step === 3))) || (isPage6Ruler && ((page6State === 'A' && page6Step === 3) || (page6State === 'C' && page6Step === 3))),
    onMarkerDragStart: handleMarkerDragStart,
    onMarkerClick: handleMarkerClick
  }) : null;

  // Step 2: rotation handle 2x bigger, blinking bg, rotation icon; positioned at 25% along ruler length (not 50%).
  const isStep2RotationHandle = (isPage2Ruler && ((page2State === 'A' && page2Step === 2) || (page2State === 'C' && page2Step === 2) || (page2State === 'B' && page2Step === 2))) || (isPage4Ruler && ((page4State === 'A' && page4Step === 2) || (page4State === 'C' && page4Step === 2) || (page4State === 'B' && page4Step === 2))) || (isPage6Ruler && ((page6State === 'A' && page6Step === 2) || (page6State === 'C' && page6Step === 2) || (page6State === 'B' && page6Step === 2)));
  const handleSize = isStep2RotationHandle ? 48 : 24;
  const rotationIconSvg = React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: isStep2RotationHandle ? 24 : 12,
    height: isStep2RotationHandle ? 24 : 12,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'white',
    strokeWidth: '2.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { flexShrink: 0 }
  }, [
    React.createElement('path', { key: '1', d: 'M21 2v6h-6' }),
    React.createElement('path', { key: '2', d: 'M3 12a9 9 0 0 1 15-6.7L21 8' }),
    React.createElement('path', { key: '3', d: 'M3 22v-6h6' }),
    React.createElement('path', { key: '4', d: 'M21 12a9 9 0 0 1-15 6.7L3 16' })
  ]);
  // Render rotation handle (at 25% along ruler length in step 2, 50% otherwise)
  const rotationHandleLeftPercent = isStep2RotationHandle ? '25%' : '50%';
  const rotationHandle = (effectiveShowRotationHandle && effectiveIsRotatable) ? React.createElement('div', {
    key: 'rotation-handle',
    className: isStep2RotationHandle ? 'ruler-rotation-handle ruler-rotation-handle-step2' : 'ruler-rotation-handle',
    onMouseDown: handleRotationStart,
    onTouchStart: handleRotationStart,
    style: {
      position: 'absolute',
      top: isStep2RotationHandle ? '-28px' : '-15px',
      left: rotationHandleLeftPercent,
      transform: 'translate(-50%, 0)',
      width: `${handleSize}px`,
      height: `${handleSize}px`,
      borderRadius: '50%',
      backgroundColor: isRotating ? 'rgba(34, 197, 94, 0.95)' : 'rgba(59, 130, 246, 0.9)',
      border: isStep2RotationHandle ? '3px solid white' : '3px solid white',
      boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
      cursor: isRotating ? 'grabbing' : 'grab',
      zIndex: 100,
      pointerEvents: 'auto',
      touchAction: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: isStep2RotationHandle && !isRotating ? 'rulerRotationHandleBlink 1.2s ease-in-out infinite' : undefined
    }
  }, isStep2RotationHandle ? rotationIconSvg : null) : null;

  // Render rotation circle indicator (circular path around 0 mark when snapped)
  // This should be positioned at the actual snap point (vertex A) in screen coordinates
  const rotationCircle = React.useMemo(() => {
    if (!showRotationCircle || !effectiveIsRotatable) return null;
    
    // Calculate the radius for the rotation circle
    // Use a reasonable radius to show the rotation path (e.g., 100-150px)
    const circleRadius = Math.min(lengthPixels * 0.4, 150);
    
    // Get snap point position in screen coordinates
    let circleCenterX, circleCenterY;
    
    if (snapPointPosition) {
      // Use the provided snap point position (vertex A)
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          
      // Convert grid coordinates to screen pixels
      circleCenterX = (snapPointPosition.x / gridCols) * viewportWidth;
      circleCenterY = (snapPointPosition.y / gridRows) * viewportHeight;
    } else if (containerRef.current) {
      // Fallback: calculate from ruler position
      const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
      // Calculate 0 mark position in screen coordinates
      const rotationRad = (currentRotation * Math.PI) / 180;
      const halfLength = lengthPixels / 2;
      const zeroOffsetX = -halfLength * Math.cos(rotationRad);
      const zeroOffsetY = -halfLength * Math.sin(rotationRad);
      
      circleCenterX = centerX + zeroOffsetX;
      circleCenterY = centerY + zeroOffsetY;
    } else {
      return null;
    }
    
    // Position circle at snap point in screen coordinates (fixed position)
    return React.createElement('div', {
      key: 'rotation-circle',
      style: {
        position: 'fixed',
        left: `${circleCenterX - circleRadius}px`,
        top: `${circleCenterY - circleRadius}px`,
        width: `${circleRadius * 2}px`,
        height: `${circleRadius * 2}px`,
        borderRadius: '50%',
        border: '2px dashed rgba(59, 130, 246, 0.6)',
        pointerEvents: 'none',
        zIndex: (zIndex || 5000) + 1, // Above the ruler
        boxSizing: 'border-box'
      }
    });
  }, [showRotationCircle, effectiveIsRotatable, lengthPixels, snapPointPosition, currentRotation, zIndex]);

  // Render rotation path indicator (shown during active rotation)
  // This displays a dashed circular path around the zero mark to visualize the rotation
  const rotationPathIndicator = React.useMemo(() => {
    if (!isRotating || !effectiveIsRotatable || !containerRef.current) return null;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate 0 mark position (pivot point) in screen coordinates
    const rotationRad = (currentRotation * Math.PI) / 180;
    const halfLength = lengthPixels / 2;
    const zeroOffsetX = -halfLength * Math.cos(rotationRad);
    const zeroOffsetY = -halfLength * Math.sin(rotationRad);
    
    const pivotX = centerX + zeroOffsetX;
    const pivotY = centerY + zeroOffsetY;
    
    // Calculate radius from zero mark to ruler center (this is the rotation radius)
    const rotationRadius = Math.sqrt(zeroOffsetX * zeroOffsetX + zeroOffsetY * zeroOffsetY);
    
    // Render a dashed circle showing the rotation path
    return React.createElement('div', {
      key: 'rotation-path-indicator',
      style: {
        position: 'fixed',
        left: `${pivotX - rotationRadius}px`,
        top: `${pivotY - rotationRadius}px`,
        width: `${rotationRadius * 2}px`,
        height: `${rotationRadius * 2}px`,
        borderRadius: '50%',
        border: '3px dashed rgba(251, 191, 36, 0.8)', // Amber/yellow color for visibility
        pointerEvents: 'none',
        zIndex: (zIndex || 5000) + 2, // Above everything including rotation circle
        boxSizing: 'border-box',
        boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)' // Glow effect for better visibility
      }
    });
  }, [isRotating, effectiveIsRotatable, currentRotation, lengthPixels, zIndex]);

  // Render snap point indicators
  const snapPointIndicators = React.useMemo(() => {
    if (!showSnapIndicators || snapMode === 'free' || !snapPoints || snapPoints.length === 0) {
      return null;
    }
    
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          
    return snapPoints.map((point, idx) => {
      const screenX = (point.x / gridCols) * viewportWidth;
      const screenY = (point.y / gridRows) * viewportHeight;
      const isNearest = nearestSnapPoint && nearestSnapPoint.index === idx;
      const isSnapped = isSnappedToPoint && isNearest;
      
      return React.createElement('div', {
        key: `snap-point-${idx}`,
        style: {
          position: 'fixed',
          left: `${screenX}px`,
          top: `${screenY}px`,
          transform: 'translate(-50%, -50%)',
          width: isSnapped ? '16px' : '12px',
          height: isSnapped ? '16px' : '12px',
          borderRadius: '50%',
          backgroundColor: isSnapped ? 'rgba(34, 197, 94, 0.9)' : 
                          isNearest ? 'rgba(251, 191, 36, 0.9)' : 
                          'rgba(59, 130, 246, 0.5)',
          border: `2px solid ${isSnapped ? '#22c55e' : isNearest ? '#f59e0b' : '#3b82f6'}`,
          boxShadow: isSnapped ? '0 0 10px rgba(34, 197, 94, 0.5)' : 
                     isNearest ? '0 0 8px rgba(251, 191, 36, 0.5)' : 'none',
          pointerEvents: 'none',
          zIndex: 4999,
          transition: 'all 0.15s ease'
        }
      });
    });
  }, [showSnapIndicators, snapMode, snapPoints, gridRows, gridCols, nearestSnapPoint, isSnappedToPoint]);

  // Render snap line indicators
  const snapLineIndicators = React.useMemo(() => {
    if (!showSnapIndicators || snapMode === 'free' || !snapLines || snapLines.length === 0) {
      return null;
    }
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    
    return snapLines.map((line, idx) => {
      const x1 = (line.x1 / gridCols) * viewportWidth;
      const y1 = (line.y1 / gridRows) * viewportHeight;
      const x2 = (line.x2 / gridCols) * viewportWidth;
      const y2 = (line.y2 / gridRows) * viewportHeight;
      const isNearest = nearestSnapLine && nearestSnapLine.index === idx;
      const isSnapped = isSnappedToLine && isNearest;
      
      // Calculate line length and angle for the SVG
      const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
      
      return React.createElement('div', {
        key: `snap-line-${idx}`,
        style: {
          position: 'fixed',
          left: `${x1}px`,
          top: `${y1}px`,
          width: `${lineLength}px`,
          height: '4px',
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%',
          backgroundColor: isSnapped ? 'rgba(34, 197, 94, 0.7)' : 
                          isNearest ? 'rgba(251, 191, 36, 0.7)' : 
                          'rgba(59, 130, 246, 0.3)',
          boxShadow: isSnapped ? '0 0 8px rgba(34, 197, 94, 0.5)' : 
                     isNearest ? '0 0 6px rgba(251, 191, 36, 0.5)' : 'none',
          pointerEvents: 'none',
          zIndex: 4998,
          transition: 'all 0.15s ease'
        }
      });
    });
  }, [showSnapIndicators, snapMode, snapLines, gridRows, gridCols, nearestSnapLine, isSnappedToLine]);

  // Render circle snap indicator
  const circleSnapIndicator = React.useMemo(() => {
    if (!showCircleSnapIndicator || !circleSnapTarget || circleSnapTarget.x === undefined || circleSnapTarget.y === undefined || circleSnapTarget.radius === undefined) {
      return null;
    }
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    
    // Convert circle center from grid coordinates to screen pixels
    const circleScreenX = (circleSnapTarget.x / gridCols) * viewportWidth;
    const circleScreenY = (circleSnapTarget.y / gridRows) * viewportHeight;
    
    // Convert radius from grid coordinates to pixels
    const gcToPxX = viewportWidth / gridCols;
    const gcToPxY = viewportHeight / gridRows;
    const gcToPx = (gcToPxX + gcToPxY) / 2;
    const radiusPixels = circleSnapTarget.radius * gcToPx;
    
    return React.createElement('div', {
      key: 'circle-snap-indicator',
      style: {
        position: 'fixed',
        left: `${circleScreenX}px`,
        top: `${circleScreenY}px`,
        transform: 'translate(-50%, -50%)',
        width: `${radiusPixels * 2}px`,
        height: `${radiusPixels * 2}px`,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: `2px dashed ${isSnappedToCircle ? '#22c55e' : '#3b82f6'}`,
        boxShadow: isSnappedToCircle ? '0 0 10px rgba(34, 197, 94, 0.5)' : 'none',
        pointerEvents: 'none',
        zIndex: 4998,
        transition: 'all 0.15s ease',
        opacity: isSnappedToCircle ? 0.8 : 0.4
      }
    });
  }, [showCircleSnapIndicator, circleSnapTarget, gridRows, gridCols, isSnappedToCircle]);

  // Wrap in draggable if needed
  if (shouldBeDraggable && window.DraggableComponent?.Draggable) {
    const Draggable = window.DraggableComponent.Draggable;
    
    const draggableRuler = React.createElement(Draggable, {
      key: 'draggable-ruler',
      draggableId: id || `ruler-${elementName}-${currentPage}`,
      isDisabled: !isDraggable || mode === 'static' || (typeof window !== 'undefined' && ((id && String(id) === 'page2-ruler' && window.page2RulerSnapped === true) || (id && String(id) === 'page4-ruler' && window.page4RulerSnapped === true) || (id && String(id) === 'page6-ruler' && window.page6RulerSnapped === true))),
      style: containerStyle,
      className: 'ruler-component',
      centerOnMouse: true, // Enable to position by center (works with translate(-50%, -50%))
      disableInternalPositioning: true, // NEW: Tell Draggable to not update position during drag
      'data-element-name': elementName,
      'data-page': currentPage,
      'data-ruler-type': rulerType,
      'data-mode': mode,
      onDragStart: (id, mousePos) => {
        // Draggable passes { x: e.clientX, y: e.clientY } as the second parameter
        // console.log('🟢 [Ruler] onDragStart called:', {
        //   id,
        //   mousePos,
        //   isSnapped: typeof window !== 'undefined' ? window.page2RulerSnapped : false,
        //   containerRef: !!containerRef.current
        // });
        
        // Check if ruler is snapped and prevent dragging
        if (typeof window !== 'undefined' && ((id && String(id) === 'page2-ruler' && window.page2RulerSnapped === true) || (id && String(id) === 'page4-ruler' && window.page4RulerSnapped === true) || (id && String(id) === 'page6-ruler' && window.page6RulerSnapped === true))) {
          return; // Prevent drag by returning early
        }
        
        // Center the ruler on the mouse pointer when dragging
        // Set drag offset to 0 so the center always follows the mouse
        if (containerRef.current && mousePos && mousePos.x !== undefined && mousePos.y !== undefined) {
          isDraggingRef.current = true;
          hasMovedDuringDragRef.current = false; // Reset movement flag
          const rect = containerRef.current.getBoundingClientRect();
          const mouseX = mousePos.x;
          const mouseY = mousePos.y;
          
          // Get current ruler center position in pixels
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Set offset to 0 so the center of the ruler always follows the mouse pointer
          // This means regardless of where the user clicks, the center will be at the mouse
          dragOffsetRef.current = {
            x: 0,
            y: 0
          };
          
          // Cache wrapper dimensions at drag start to avoid flicker from recalculating
          // Use the known ruler dimensions instead of measuring, as the wrapper should match
          // the container size. The wrapper dimensions are the same as the ruler's bounding box.
          wrapperDimensionsRef.current = {
            width: lengthPixels,  // Ruler length (along the ruler)
            height: widthPixels   // Ruler width (across the ruler)
          };
          
          // console.log('📏 [Ruler] Cached wrapper dimensions at drag start:', {
          //   cached: wrapperDimensionsRef.current,
          //   rulerDimensions: { lengthPixels, widthPixels },
          //   note: 'Using known ruler dimensions instead of measuring wrapper'
          // });
          
          // console.log('🖱️ [Ruler] Mouse and container info:', {
          //   mousePos: { x: mouseX, y: mouseY },
          //   rect: {
          //     left: rect.left,
          //     top: rect.top,
          //     width: rect.width,
          //     height: rect.height,
          //     centerX,
          //     centerY
          //   },
          //   currentPosition: positionRef.current,
          //   currentStyle: {
          //     left: containerRef.current.style.left,
          //     top: containerRef.current.style.top,
          //     transform: containerRef.current.style.transform
          //   },
          //   computedStyle: window.getComputedStyle(containerRef.current),
          //   dragOffset: dragOffsetRef.current,
          //   lengthPixels,
          //   widthPixels,
          //   currentRotation,
          //   // Calculate what the position should be
          //   expectedCenterX: mouseX - dragOffsetRef.current.x,
          //   expectedCenterY: mouseY - dragOffsetRef.current.y
          // });
          
          // DO NOT update position here - wait for first onDragMove
          // This prevents the jump because we don't change position until mouse actually moves
          // The position will be updated in onDragMove when the user actually starts dragging
        } else {
          // console.warn('⚠️ [Ruler] Missing mouse position or containerRef in onDragStart');
          dragOffsetRef.current = { x: 0, y: 0 };
        }
      },
      onDragMove: (id, mousePos) => {
        // Mark that mouse has moved during drag
        hasMovedDuringDragRef.current = true;
        
        // Center the ruler on the mouse pointer (dragOffset is 0)
        // console.log('🟡 [Ruler] onDragMove called:', {
        //   id,
        //   mousePos,
        //   dragOffset: dragOffsetRef.current,
        //   isDragging: isDraggingRef.current,
        //   containerBounds: containerRef.current ? containerRef.current.getBoundingClientRect() : null
        // });
        
        if (mousePos && mousePos.x !== undefined && mousePos.y !== undefined) {
          // Center the ruler on the mouse pointer (dragOffset is 0)
          // The center position is exactly the mouse position
          const centerPos = {
            x: mousePos.x,
            y: mousePos.y
          };
          
          // Get current position before update for comparison
          const rect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
          const currentCenterX = rect ? rect.left + rect.width / 2 : 0;
          const currentCenterY = rect ? rect.top + rect.height / 2 : 0;
          
          // console.log('🔄 [Ruler] Updating position to center on mouse:', {
          //   mousePos: { x: mousePos.x, y: mousePos.y },
          //   centerPos: { x: centerPos.x, y: centerPos.y },
          //   currentCenter: { x: currentCenterX, y: currentCenterY },
          //   difference: { x: mousePos.x - currentCenterX, y: mousePos.y - currentCenterY }
          // });
          
          // Update position continuously during drag with snap detection
          handlePositionChange(id, centerPos, true); // true = skip drag offset application
        }
      },
      onDragEnd: (id, mousePos) => {
        // console.log('🔴 [Ruler] onDragEnd called:', {
        //   id,
        //   mousePos,
        //   dragOffset: dragOffsetRef.current,
        //   finalPosition: positionRef.current,
        //   hasMoved: hasMovedDuringDragRef.current
        // });
        
        // Only update position if mouse actually moved during drag
        // This prevents position change on simple click (no drag)
        if (hasMovedDuringDragRef.current && mousePos && mousePos.x !== undefined && mousePos.y !== undefined) {
          const centerPos = {
            x: mousePos.x,
            y: mousePos.y
          };
          
          // Get current position before update for comparison
          const rect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
          const currentCenterX = rect ? rect.left + rect.width / 2 : 0;
          const currentCenterY = rect ? rect.top + rect.height / 2 : 0;
          
          // console.log('📍 [Ruler] Final position update (mouse moved during drag):', {
          //   mousePos: { x: mousePos.x, y: mousePos.y },
          //   centerPos,
          //   currentCenter: { x: currentCenterX, y: currentCenterY },
          //   difference: { x: mousePos.x - currentCenterX, y: mousePos.y - currentCenterY },
          //   note: 'Updating to match exact mouse position'
          // });
          
          handlePositionChange(id, centerPos, true); // true = skip drag offset application
          
          // After handlePositionChange, verify the position matches
          // requestAnimationFrame(() => {
          //   if (containerRef.current) {
          //     const afterRect = containerRef.current.getBoundingClientRect();
          //     const afterCenterX = afterRect.left + afterRect.width / 2;
          //     const afterCenterY = afterRect.top + afterRect.height / 2;
          //     
          //     console.log('✅ [Ruler] Position after drag end:', {
          //       expected: { x: mousePos.x, y: mousePos.y },
          //       actual: { x: afterCenterX, y: afterCenterY },
          //       difference: { x: mousePos.x - afterCenterX, y: mousePos.y - afterCenterY },
          //       match: Math.abs(mousePos.x - afterCenterX) < 1 && Math.abs(mousePos.y - afterCenterY) < 1
          //     });
          //   }
          // });
        } else {
          // console.log('⏭️ [Ruler] Skipping position update (no movement during drag - just a click)');
        }
        
        // Clean up the continuous override interval
        if (window._rulerDragOverrideInterval) {
          clearInterval(window._rulerDragOverrideInterval);
          window._rulerDragOverrideInterval = null;
        }
        
        // IMPORTANT: Delay resetting isDraggingRef to prevent container position jump
        // The container is at 50% 50% during drag, and we need to keep it there
        // until the wrapper position is updated and Draggable switches back to normal mode
        // Use double requestAnimationFrame to delay the reset until after React re-renders
        // and the position has been properly updated
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Now it's safe to reset - the wrapper should be back to normal positioning
            isDraggingRef.current = false;
            hasMovedDuringDragRef.current = false;
            dragOffsetRef.current = { x: 0, y: 0 };
            wrapperDimensionsRef.current = { width: 0, height: 0 };
            // console.log('🔄 [Ruler] Drag ended, offset reset (delayed)');
          });
        });
      }
    }, 
      React.createElement('div', {
        key: 'ruler-content',
        ref: containerRef,
        onClick: handleClick,
        onMouseDown: handleRotationStart,
        onTouchStart: handleRotationStart,
        style: {
          width: '100%',
          height: '100%',
          position: 'relative',
          cursor: effectiveIsRotatable ? 'grab' : cursor
        }
      }, [
        React.createElement('div', {
          key: 'ruler-face-wrapper',
          onClick: handleRulerClick,
          style: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'visible',
            pointerEvents: 'none' // Let clicks pass to markers layer or ruler-content
          }
        }, rulerFace),
        markersElement,
        rotationHandle,
        rotationCircle
      ].filter(Boolean))
    );
    
    // Return ruler with snap indicators and rotation path indicator
    return React.createElement(React.Fragment, { key: 'ruler-with-snap' }, [
      draggableRuler,
      ...(snapPointIndicators || []),
      ...(snapLineIndicators || []),
      circleSnapIndicator,
      rotationPathIndicator
    ].filter(Boolean));
  }

  // Static render (no draggable)
  const staticRuler = React.createElement('div', {
    key: 'static-ruler',
    id: id || `ruler-${elementName}-${currentPage}`,
    ref: containerRef,
    className: 'ruler-component',
    style: containerStyle,
    onClick: handleClick,
    onMouseDown: handleRotationStart,
    onTouchStart: handleRotationStart,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-ruler-type': rulerType,
    'data-mode': mode
  }, [
    React.createElement('div', {
      key: 'ruler-face-wrapper',
      onClick: handleRulerClick,
      style: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        pointerEvents: 'none' // Let clicks pass to markers layer or ruler-content
      }
    }, rulerFace),
    markersElement,
    rotationHandle,
    rotationCircle
  ].filter(Boolean));
  
  // Return ruler with snap indicators and rotation path indicator
  return React.createElement(React.Fragment, { key: 'static-ruler-with-snap' }, [
    staticRuler,
    ...(snapPointIndicators || []),
    ...(snapLineIndicators || []),
    circleSnapIndicator,
    rotationPathIndicator
  ].filter(Boolean));
});

/**
 * Ruler Element Configuration
 */
const RulerElement = {
  ruler: {
    type: 'ruler',
    coordinates: [800, 450, 800, 450], // Default center position
    zIndex: 5000,
    props: {
      componentType: 'RulerComponent',
      rulerType: 'metric',
      length: '30cm',
      width: '30gc',
      color: '#333',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      showTickMarks: true,
      showLabels: true,
      majorTickInterval: 10,
      minorTickInterval: 1,
      labelInterval: 10,
      mode: 'interactive',
      isDraggable: true,
      isRotatable: true,
      rotation: 0,
      measurementMarkers: {
        enabled: true,
        maxMarkers: 2,
        allowClick: true,
        allowDrag: true,
        snapToTicks: true,
        color: '#FF0000',
        showDistance: true,
        markerSize: 16, // Height of marker triangle in pixels (2x for visibility)
        distanceFontSize: 10 // Font size for distance text in pixels
      },
      lineDrawing: {
        enabled: false,
        mode: 'click',
        integration: true
      },
      cursor: 'move',
      opacity: 1
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('ruler', (props, elementId) => {
      return React.createElement(RulerComponent, props);
    })
  }
};

// Export for use in elements-registry.js
if (typeof window !== 'undefined') {
  window.RulerComponent = {
    RulerComponent: RulerComponent,
    RulerFace: RulerFace,
    MeasurementMarkers: MeasurementMarkers,
    RulerUtils: RulerUtils,
    RulerElement: RulerElement
  };
  // Also export directly for backward compatibility
  window.RulerElement = RulerElement;
}

// console.log('✅ Ruler component loaded successfully');

