/**
 * Ruler Component
 * 
 * A flexible, interactive ruler for measuring distances and creating lines.
 * Supports metric (cm/mm), imperial (inches), and grid unit configurations.
 * Can be dragged, rotated, and integrated with other components.
 */

/* global React, GridCellFontUtils, GridPrecisionConfig */

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
   * @param {Object} rulerBounds - Ruler bounds (DOMRect)
   * @param {number} rulerRotation - Ruler rotation in degrees
   * @returns {number} Position along ruler (0 to 1, where 1 is full length)
   */
  calculateMarkerPosition(clickPoint, rulerBounds, rulerRotation) {
    // Get ruler center
    const centerX = rulerBounds.left + rulerBounds.width / 2;
    const centerY = rulerBounds.top + rulerBounds.height / 2;
    
    // Get click position relative to center
    const dx = clickPoint.x - centerX;
    const dy = clickPoint.y - centerY;
    
    // Rotate point back by ruler rotation to get local coordinates
    const rotationRad = -rulerRotation * (Math.PI / 180);
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;
    
    // Position along ruler length (x-axis in local space)
    // Ruler length is the width, centered at 0
    const halfLength = rulerBounds.width / 2;
    const position = (localX + halfLength) / rulerBounds.width;
    
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
    tickWidth = 1.5
  } = props;

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
    showTickMarks && ticks.map((tick, idx) => {
      const x = measurementStartX + (tick.position * lengthInPixels); // Offset by margin
      const tickLength = tick.isMajor ? majorTickLength : minorTickLength;
      const y1 = viewBoxHeight - tickLength;
      const y2 = viewBoxHeight;
      
      return React.createElement('line', {
        key: `tick-${idx}`,
        x1: x,
        y1: y1,
        x2: x,
        y2: y2,
        stroke: color,
        strokeWidth: tickWidth,
        strokeLinecap: 'round'
      });
    }),

    // Labels
    showLabels && ticks
      .filter(tick => tick.isMajor && tick.label && tick.value % labelInterval === 0)
      .map((tick, idx) => {
        const x = measurementStartX + (tick.position * lengthInPixels); // Offset by margin
        const y = viewBoxHeight - majorTickLength - 3;
        
        // Format label based on ruler type
        let displayLabel = tick.label;
        if (rulerType === 'metric' && rulerDimensions.displayUnit === 'cm') {
          displayLabel = String(tick.value / 10); // Convert mm to cm for display
        }
        
        return React.createElement('text', {
          key: `label-${idx}`,
          x: x,
          y: y,
          fill: color,
          fontSize: 8,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          textAnchor: 'middle',
          dominantBaseline: 'baseline',
          pointerEvents: 'none'
        }, displayLabel);
      })
  ].flat().filter(Boolean));
});

/**
 * MeasurementMarkers Component
 * Renders draggable markers for measurement
 */
const MeasurementMarkers = React.memo((props) => {
  const {
    markers = [],
    rulerLengthPixels = 300,
    rulerWidthPixels = 30,
    rulerRotation = 0,
    markerColor = '#FF0000',
    showDistance = true,
    distanceUnit = 'cm',
    distancePrecision = 1,
    markerSize = 8, // Height of marker triangle
    distanceFontSize = 10, // Font size for distance text
    onMarkerDragStart,
    onMarkerDrag,
    onMarkerDragEnd,
    onMarkerClick
  } = props;

  // Add extra glass margin (5% on each side)
  const glassMargin = rulerLengthPixels * 0.05;
  const totalWidth = rulerLengthPixels + (glassMargin * 2);
  const measurementStartX = glassMargin;

  // Calculate distance between two markers
  const distance = React.useMemo(() => {
    if (markers.length === 2) {
      const fixedMarker = markers.find(m => m.fixed || m.id === 'fixed-marker-0');
      const movableMarker = markers.find(m => !m.fixed && m.id !== 'fixed-marker-0');
      
      if (fixedMarker && movableMarker) {
        const diff = Math.abs(movableMarker.position - fixedMarker.position);
        
        // Convert position (0-1) to actual measurement
        // Assuming ruler represents its full length in the specified unit
        const rulerDimensions = RulerUtils.getRulerDimensions('metric', '30cm');
        const distanceInUnits = diff * rulerDimensions.lengthInUnits;
        
        // Convert to display unit
        return RulerUtils.convertUnits(distanceInUnits, rulerDimensions.unit, distanceUnit);
      }
    }
    return null;
  }, [markers, distanceUnit]);

  return React.createElement('svg', {
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: 'none',
      zIndex: 10
    },
    viewBox: `0 0 ${totalWidth} ${rulerWidthPixels}`
  }, [
    // Connection line between markers
    markers.length === 2 && (() => {
      const fixedMarker = markers.find(m => m.fixed || m.id === 'fixed-marker-0');
      const movableMarker = markers.find(m => !m.fixed && m.id !== 'fixed-marker-0');
      
      if (fixedMarker && movableMarker) {
        return React.createElement('line', {
          key: 'connection-line',
          x1: measurementStartX + (fixedMarker.position * rulerLengthPixels),
          y1: rulerWidthPixels / 2,
          x2: measurementStartX + (movableMarker.position * rulerLengthPixels),
          y2: rulerWidthPixels / 2,
          stroke: markerColor,
          strokeWidth: 2,
          strokeDasharray: '4, 2',
          opacity: 0.6
        });
      }
      return null;
    })(),

    // Markers
    ...markers.map((marker, idx) => {
      const x = measurementStartX + (marker.position * rulerLengthPixels);
      const y = rulerWidthPixels / 2;
      const isFixed = marker.fixed || marker.id === 'fixed-marker-0';
      const markerHalfWidth = markerSize / 2; // Half width of marker triangle
      
      return React.createElement('g', {
        key: `marker-${marker.id || idx}`
      }, [
        // Marker pin (triangle pointing up)
        React.createElement('path', {
          key: 'pin',
          d: `M ${x} ${y - markerSize} L ${x - markerHalfWidth} ${y} L ${x + markerHalfWidth} ${y} Z`,
          fill: markerColor,
          stroke: '#FFF',
          strokeWidth: 1,
          style: {
            cursor: isFixed ? 'default' : 'grab',
            pointerEvents: isFixed ? 'none' : 'auto',
            opacity: isFixed ? 0.8 : 1
          },
          onMouseDown: (e) => {
            if (!isFixed && onMarkerDragStart) {
              onMarkerDragStart(marker.id, e);
            }
          },
          onTouchStart: (e) => {
            if (!isFixed && onMarkerDragStart) {
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
          key: 'line',
          x1: x,
          y1: 0,
          x2: x,
          y2: rulerWidthPixels,
          stroke: markerColor,
          strokeWidth: isFixed ? 2 : 1,
          opacity: isFixed ? 0.7 : 0.5,
          style: {
            pointerEvents: 'none'
          }
        })
      ]);
    }),

    // Distance display
    distance !== null && showDistance && React.createElement('text', {
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
    }, RulerUtils.formatMeasurement(distance, distanceUnit, distancePrecision))
  ].flat().filter(Boolean));
});

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
    
    // Interaction Configuration
    mode = 'interactive',
    isDraggable = true,
    isRotatable = true,
    rotation = 0,
    
    // Measurement Features
    measurementMarkers = {
      enabled: true,
      maxMarkers: 2,
      allowClick: true,
      allowDrag: true,
      snapToTicks: true,
      color: '#FF0000',
      showDistance: true,
      markerSize: 8, // Height of marker triangle in pixels
      distanceFontSize: 10 // Font size for distance text in pixels
    },
    
    // Line Drawing Features
    lineDrawing = {
      enabled: false,
      mode: 'click',
      integration: true
    },
    
    // Callbacks
    onMeasure,
    onMarkerAdd,
    onMarkerRemove,
    onRotate,
    onPositionChange,
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
    // Initialize with a fixed marker at position 0
    if (measurementMarkers.enabled) {
      return [{
        id: FIXED_MARKER_ID,
        position: 0,
        fixed: true
      }];
    }
    return [];
  });
  const [draggingMarkerId, setDraggingMarkerId] = React.useState(null);
  const [currentPosition, setCurrentPosition] = React.useState(null); // Track dragged position
  const containerRef = React.useRef(null);
  const positionRef = React.useRef(null); // Ref to track position for immediate access

  // Process GC units
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
    
    // Fallback: manual GC conversion
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));
      if (isNaN(gcValue)) return 100;
      
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const pixels = (gcValue / gridSystemCols) * viewportWidth;
      return !isNaN(pixels) ? pixels : 100;
    }
    
    // Parse string values like '30cm'
    if (typeof value === 'string') {
      if (value.endsWith('cm')) {
        return parseFloat(value) * 10; // Convert cm to pixels (rough estimate)
      } else if (value.endsWith('mm')) {
        return parseFloat(value); // mm to pixels (rough estimate)
      } else if (value.endsWith('in')) {
        return parseFloat(value) * 25.4; // inches to pixels
      }
    }
    
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : 100;
  }, []);

  // Calculate ruler dimensions in pixels
  const lengthPixels = React.useMemo(() => {
    const processed = processGcProperty(length, 'width');
    return !isNaN(processed) && processed > 0 ? processed : 300;
  }, [length, processGcProperty]);

  const widthPixels = React.useMemo(() => {
    const processed = processGcProperty(width, 'width');
    return !isNaN(processed) && processed > 0 ? processed : 30;
  }, [width, processGcProperty]);

  // Calculate initial position from coordinates or centerPoint
  const initialPosition = React.useMemo(() => {
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
      const [x1, y1] = coordinates;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const xPercent = ((x1 - 1) / gridCols) * 100;
      const yPercent = ((y1 - 1) / gridRows) * 100;
      
      return {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
    }
    return null;
  }, [coordinates, centerPoint]);

  // Use current position if set, otherwise use initial position
  const position = currentPosition || initialPosition;

  // Handle position change from drag
  const handlePositionChange = React.useCallback((id, pos) => {
    if (pos && typeof pos === 'object' && 'x' in pos && 'y' in pos) {
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      
      // Convert pixel position to percentage
      // Since centerOnMouse is true, the position is the center of the element
      const xPercent = (pos.x / viewportWidth) * 100;
      const yPercent = (pos.y / viewportHeight) * 100;
      
      const newPosition = {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
      
      // Update both state and ref for immediate access
      positionRef.current = newPosition;
      setCurrentPosition(newPosition);
      
      // Call the original callback if provided
      if (onPositionChange) {
        onPositionChange(pos);
      }
    }
  }, [onPositionChange]);

  // Handle ruler rotation (Ctrl/Cmd + drag)
  const handleRotationStart = React.useCallback((e) => {
    if (!isRotatable || mode === 'static') return;
    
    // Only rotate if Ctrl (Windows/Linux) or Cmd (Mac) is pressed
    if (e.ctrlKey || e.metaKey) {
      e.stopPropagation();
      setIsRotating(true);
    }
  }, [isRotatable, mode]);

  const handleRotationMove = React.useCallback((e) => {
    if (!isRotating || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) return;

    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setCurrentRotation(angle);
    
    if (onRotate) {
      onRotate(angle);
    }
  }, [isRotating, onRotate]);

  const handleRotationEnd = React.useCallback(() => {
    setIsRotating(false);
  }, []);

  // Set up rotation event listeners
  React.useEffect(() => {
    if (isRotating) {
      window.addEventListener('mousemove', handleRotationMove);
      window.addEventListener('mouseup', handleRotationEnd);
      window.addEventListener('touchmove', handleRotationMove);
      window.addEventListener('touchend', handleRotationEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleRotationMove);
        window.removeEventListener('mouseup', handleRotationEnd);
        window.removeEventListener('touchmove', handleRotationMove);
        window.removeEventListener('touchend', handleRotationEnd);
      };
    }
  }, [isRotating, handleRotationMove, handleRotationEnd]);

  // Handle marker interactions
  const handleRulerClick = React.useCallback((e) => {
    if (!measurementMarkers.enabled || !measurementMarkers.allowClick) return;
    
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
      currentRotation
    );
    
    // Snap to ticks if enabled
    if (measurementMarkers.snapToTicks) {
      const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
      position = RulerUtils.snapMarkerToTicks(
        position,
        dimensions.lengthInUnits,
        minorTickInterval
      );
    }
    
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
      const distance = Math.abs(movableMarker.position - fixedMarker.position) * dimensions.lengthInUnits;
      onMeasure(distance, dimensions.unit, newMarkers);
    }
  }, [measurementMarkers, markers, currentRotation, rulerType, length, minorTickInterval, onMarkerAdd, onMeasure, FIXED_MARKER_ID]);

  const handleMarkerDragStart = React.useCallback((markerId, e) => {
    if (!measurementMarkers.enabled || !measurementMarkers.allowDrag) return;
    
    // Prevent dragging the fixed marker
    if (markerId === FIXED_MARKER_ID) return;
    
    e.stopPropagation();
    setDraggingMarkerId(markerId);
  }, [measurementMarkers, FIXED_MARKER_ID]);

  const handleMarkerDrag = React.useCallback((e) => {
    if (!draggingMarkerId || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) return;
    
    let position = RulerUtils.calculateMarkerPosition(
      { x: clientX, y: clientY },
      rect,
      currentRotation
    );
    
    // Snap to ticks if enabled
    if (measurementMarkers.snapToTicks) {
      const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
      position = RulerUtils.snapMarkerToTicks(
        position,
        dimensions.lengthInUnits,
        minorTickInterval
      );
    }
    
    setMarkers(prev => prev.map(m => {
      // Never update the fixed marker
      if (m.id === FIXED_MARKER_ID) return m;
      // Only update the marker being dragged
      return m.id === draggingMarkerId ? { ...m, position } : m;
    }));
  }, [draggingMarkerId, currentRotation, measurementMarkers, rulerType, length, minorTickInterval]);

  const handleMarkerDragEnd = React.useCallback(() => {
    if (draggingMarkerId) {
      // Trigger measurement callback if we have 2 markers (fixed + movable)
      if (markers.length === 2 && onMeasure) {
        const dimensions = RulerUtils.getRulerDimensions(rulerType, length);
        const fixedMarker = markers.find(m => m.id === FIXED_MARKER_ID);
        const movableMarker = markers.find(m => m.id !== FIXED_MARKER_ID);
        if (fixedMarker && movableMarker) {
          const distance = Math.abs(movableMarker.position - fixedMarker.position) * dimensions.lengthInUnits;
          onMeasure(distance, dimensions.unit, markers);
        }
      }
      setDraggingMarkerId(null);
    }
  }, [draggingMarkerId, markers, onMeasure, rulerType, length, FIXED_MARKER_ID]);

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

  // Set up marker drag listeners
  React.useEffect(() => {
    if (draggingMarkerId) {
      window.addEventListener('mousemove', handleMarkerDrag);
      window.addEventListener('mouseup', handleMarkerDragEnd);
      window.addEventListener('touchmove', handleMarkerDrag);
      window.addEventListener('touchend', handleMarkerDragEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMarkerDrag);
        window.removeEventListener('mouseup', handleMarkerDragEnd);
        window.removeEventListener('touchmove', handleMarkerDrag);
        window.removeEventListener('touchend', handleMarkerDragEnd);
      };
    }
  }, [draggingMarkerId, handleMarkerDrag, handleMarkerDragEnd]);

  // Determine if component should be draggable
  const shouldBeDraggable = React.useMemo(() => {
    return mode === 'draggable' || mode === 'interactive';
  }, [mode]);

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
      transformOrigin: 'center center',
      transition: isRotating ? 'none' : 'transform 0.2s ease'
    };

    // Apply style props (display, visibility, etc.)
    if (display !== undefined) {
      baseStyle.display = display;
    }
    if (visibility !== undefined) {
      baseStyle.visibility = visibility;
    }

    if (position) {
      baseStyle.left = position.left;
      baseStyle.top = position.top;
    }

    return baseStyle;
  }, [lengthPixels, widthPixels, zIndex, cursor, position, mode, shouldBeDraggable, opacity, currentRotation, isRotating, display, visibility]);

  // Handle click
  const handleClick = React.useCallback((e) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  // Get dimensions for passing to RulerFace (needed for grid type)
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
    labelInterval
  });

  // Render measurement markers
  const markersElement = measurementMarkers.enabled && React.createElement(MeasurementMarkers, {
    markers,
    rulerLengthPixels: lengthPixels,
    rulerWidthPixels: widthPixels,
    rulerRotation: currentRotation,
    markerColor: measurementMarkers.color,
    showDistance: measurementMarkers.showDistance,
    distanceUnit: RulerUtils.getRulerDimensions(rulerType, length).unit,
    markerSize: measurementMarkers.markerSize,
    distanceFontSize: measurementMarkers.distanceFontSize,
    onMarkerDragStart: handleMarkerDragStart,
    onMarkerClick: handleMarkerClick
  });

  // Wrap in draggable if needed
  if (shouldBeDraggable && window.DraggableComponent?.Draggable) {
    const Draggable = window.DraggableComponent.Draggable;
    
    return React.createElement(Draggable, {
      key: 'draggable-ruler',
      draggableId: id || `ruler-${elementName}-${currentPage}`,
      isDisabled: !isDraggable || mode === 'static',
      style: containerStyle,
      className: 'ruler-component',
      centerOnMouse: true,
      'data-element-name': elementName,
      'data-page': currentPage,
      'data-ruler-type': rulerType,
      'data-mode': mode,
      onDragStart: () => {
        // Store the current position when drag starts
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          
          // Get current center position
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const xPercent = (centerX / viewportWidth) * 100;
          const yPercent = (centerY / viewportHeight) * 100;
          
          const newPosition = {
            left: `${xPercent}%`,
            top: `${yPercent}%`
          };
          
          // Update both state and ref
          positionRef.current = newPosition;
          setCurrentPosition(newPosition);
        }
      },
      onDragMove: (id, pos) => {
        // Update position continuously during drag
        if (pos && typeof pos === 'object' && 'x' in pos && 'y' in pos) {
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          
          const xPercent = (pos.x / viewportWidth) * 100;
          const yPercent = (pos.y / viewportHeight) * 100;
          
          const newPosition = {
            left: `${xPercent}%`,
            top: `${yPercent}%`
          };
          
          // Update both state and ref
          positionRef.current = newPosition;
          setCurrentPosition(newPosition);
        }
      },
      onDragEnd: (id, pos) => {
        // Final position update when drag ends
        handlePositionChange(id, pos);
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
          cursor: isRotatable ? 'grab' : cursor
        }
      }, [
        React.createElement('div', {
          key: 'ruler-face-wrapper',
          onClick: handleRulerClick,
          style: {
            width: '100%',
            height: '100%',
            position: 'relative'
          }
        }, rulerFace),
        markersElement
      ].filter(Boolean))
    );
  }

  // Static render (no draggable)
  return React.createElement('div', {
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
        position: 'relative'
      }
    }, rulerFace),
    markersElement
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
        markerSize: 8, // Height of marker triangle in pixels
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

console.log('✅ Ruler component loaded successfully');

