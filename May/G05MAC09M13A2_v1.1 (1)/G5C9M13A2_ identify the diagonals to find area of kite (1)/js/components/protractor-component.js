/**
 * Protractor Component
 * 
 * A flexible, interactive protractor for measuring angles.
 * Supports semicircular (0-180°) and circular (0-360°) configurations.
 * Can be dragged, rotated, and integrated with other components.
 */

/* global React, GridCellFontUtils, GridPrecisionConfig */

/**
 * Protractor Utilities
 */
const ProtractorUtils = {
  /**
   * Calculate angle between two points relative to center
   * @param {Object} center - Center point {x, y}
   * @param {Object} point1 - First point {x, y}
   * @param {Object} point2 - Second point {x, y}
   * @returns {number} Angle in degrees (0-360)
   */
  calculateAngleFromPoints(center, point1, point2) {
    const angle1 = Math.atan2(point1.y - center.y, point1.x - center.x);
    const angle2 = Math.atan2(point2.y - center.y, point2.x - center.x);
    
    let diff = (angle2 - angle1) * (180 / Math.PI);
    
    // Normalize to 0-360
    while (diff < 0) diff += 360;
    while (diff >= 360) diff -= 360;
    
    return diff;
  },

  /**
   * Calculate angle from center to point
   * @param {Object} center - Center point {x, y}
   * @param {Object} point - Target point {x, y}
   * @returns {number} Angle in degrees (0-360, 0 is right/east, increases counterclockwise)
   */
  calculateAngleToPoint(center, point) {
    // Negate Y to make angles increase counterclockwise (screen Y is inverted)
    const angle = Math.atan2(-(point.y - center.y), point.x - center.x) * (180 / Math.PI);
    // Normalize to 0-360
    let normalized = angle;
    while (normalized < 0) normalized += 360;
    while (normalized >= 360) normalized -= 360;
    return normalized;
  },

  /**
   * Snap angle to nearest interval
   * @param {number} angle - Angle in degrees
   * @param {number} interval - Snap interval in degrees
   * @returns {number} Snapped angle
   */
  snapAngleToDegrees(angle, interval) {
    if (!interval || interval <= 0) return angle;
    return Math.round(angle / interval) * interval;
  },

  /**
   * Format angle for display
   * @param {number} angle - Angle in degrees
   * @param {number} precision - Decimal places
   * @returns {string} Formatted angle string
   */
  formatAngleDisplay(angle, precision = 1) {
    return `${angle.toFixed(precision)}°`;
  },

  /**
   * Normalize angle to 0-360 range
   * @param {number} angle - Angle in degrees
   * @returns {number} Normalized angle
   */
  normalizeAngle(angle) {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  },

  /**
   * Convert grid position to percentage coordinates
   * @param {Object} gridPos - Grid position {row, col}
   * @param {number} gridRows - Total grid rows
   * @param {number} gridCols - Total grid columns
   * @returns {Object} Percentage position {left, top}
   */
  convertGridToPercent(gridPos, gridRows, gridCols) {
    const xPercent = (gridPos.col / gridCols) * 100;
    const yPercent = (gridPos.row / gridRows) * 100;
    return { left: `${xPercent}%`, top: `${yPercent}%` };
  }
};

/**
 * ProtractorFace Component
 * Renders the protractor SVG with degree marks and labels
 */
const ProtractorFace = React.memo((props) => {
  const {
    protractorType = 'semicircular',
    radius = 100,
    color = '#333',
    backgroundColor = 'rgba(255, 255, 255, 0.9)',
    showDegreeMarks = true,
    showDegreeLabels = true,
    degreeInterval = 10,
    labelInterval = 30,
    rotation = 0,
    labelColor = '#333',  // Font color for degree labels
    labelFontSize = '12gc',  // NEW: Font size in GC units
    majorTickLength = '15gc',  // NEW: Length of major ticks
    minorTickLength = '8gc',   // NEW: Length of minor ticks
    majorTickWidth = '2gc',    // NEW: Width of major ticks
    minorTickWidth = '1gc'     // NEW: Width of minor ticks
  } = props;

  const viewBoxSize = radius * 2.5;
  const viewBoxCenter = viewBoxSize / 2;
  const isCircular = protractorType === 'circular';
  const maxDegree = isCircular ? 360 : 180;

  // Process GC units to pixels
  const processGcToPixels = React.useCallback((value, defaultValue = 1) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));
      if (isNaN(gcValue)) return defaultValue;
      
      // Convert GC to pixels based on viewport and grid
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const pixels = (gcValue / gridSystemCols) * viewportWidth;
      return !isNaN(pixels) ? pixels : defaultValue;
    }
    return parseFloat(value) || defaultValue;
  }, []);

  // Process all GC values
  const majorTickLengthPx = React.useMemo(() => processGcToPixels(majorTickLength, 15), [majorTickLength, processGcToPixels]);
  const minorTickLengthPx = React.useMemo(() => processGcToPixels(minorTickLength, 8), [minorTickLength, processGcToPixels]);
  const majorTickWidthPx = React.useMemo(() => processGcToPixels(majorTickWidth, 2), [majorTickWidth, processGcToPixels]);
  const minorTickWidthPx = React.useMemo(() => processGcToPixels(minorTickWidth, 1), [minorTickWidth, processGcToPixels]);
  const labelFontSizePx = React.useMemo(() => processGcToPixels(labelFontSize, 12), [labelFontSize, processGcToPixels]);

  // Generate degree marks
  const degreeMarks = React.useMemo(() => {
    const marks = [];
    const startDegree = isCircular ? 0 : 0;
    const endDegree = isCircular ? 360 : 181; // Changed to 181 to include 180°
    
    for (let degree = startDegree; degree < endDegree; degree += degreeInterval) {
      // For semicircular: 0° at left, 90° at top, 180° at right (like real protractor)
      // For circular: 0° at top, going clockwise
      let angle, x1, y1, x2, y2;
      
      const isMajorMark = degree % labelInterval === 0;
      const markLength = isMajorMark ? majorTickLengthPx : minorTickLengthPx;
      const markWidth = isMajorMark ? majorTickWidthPx : minorTickWidthPx;
      
      if (isCircular) {
        angle = (degree - 90) * (Math.PI / 180);  // Circular: start from top
        x1 = radius * Math.cos(angle);
        y1 = radius * Math.sin(angle);
        x2 = (radius - markLength) * Math.cos(angle);
        y2 = (radius - markLength) * Math.sin(angle);
      } else {
        // Semicircular: 0° left, 90° top, 180° right, arc on TOP
        angle = (degree) * (Math.PI / 180); // 0° = 0 rad (right), 180° = π rad (left)
        // Use standard trig but flip y to make arc appear on top
        x1 = radius * Math.cos(angle);
        y1 = -radius * Math.sin(angle); // Negative to flip upward
        x2 = (radius - markLength) * Math.cos(angle);
        y2 = -(radius - markLength) * Math.sin(angle); // Negative to flip upward
      }

      marks.push({
        degree,
        x1,
        y1,
        x2,
        y2,
        isMajor: isMajorMark,
        strokeWidth: markWidth
      });
    }
    return marks;
  }, [radius, degreeInterval, labelInterval, isCircular, majorTickLengthPx, minorTickLengthPx, majorTickWidthPx, minorTickWidthPx]);

  // Generate degree labels
  const degreeLabels = React.useMemo(() => {
    if (!showDegreeLabels) return [];
    
    const labels = [];
    const startDegree = isCircular ? 0 : 0;
    const endDegree = isCircular ? 360 : 181; // Changed to 181 to include 180°
    
    // Position labels inside the protractor, accounting for tick length and padding
    const labelPadding = 5; // Extra padding between ticks and labels
    const labelRadius = radius - majorTickLengthPx - labelPadding;
    
    for (let degree = startDegree; degree < endDegree; degree += labelInterval) {
      let angle, x, y;
      
      if (isCircular) {
        angle = (degree - 90) * (Math.PI / 180);  // Circular: start from top
        x = labelRadius * Math.cos(angle);
        y = labelRadius * Math.sin(angle);
      } else {
        // Semicircular: 0° left, 90° top, 180° right, arc on TOP
        angle = (degree) * (Math.PI / 180);
        x = labelRadius * Math.cos(angle);
        y = -labelRadius * Math.sin(angle); // Negative to flip upward
      }

      labels.push({
        degree,
        x,
        y
      });
    }
    return labels;
  }, [radius, labelInterval, isCircular, showDegreeLabels, majorTickLengthPx]);

  return React.createElement('svg', {
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: 'none',
      transform: `rotate(${rotation}deg)`,
      transformOrigin: 'center center',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
    },
    viewBox: `${-viewBoxCenter} ${-viewBoxCenter} ${viewBoxSize} ${viewBoxSize}`
  }, [
    // Define gradients for glass effect
    React.createElement('defs', { key: 'defs' }, [
      // Linear gradient for glass shine
      React.createElement('linearGradient', {
        key: 'glass-gradient',
        id: 'glass-gradient',
        x1: '0%',
        y1: '0%',
        x2: '0%',
        y2: '100%'
      }, [
        React.createElement('stop', {
          key: 'stop1',
          offset: '0%',
          stopColor: '#ffffff',
          stopOpacity: '0.4'
        }),
        React.createElement('stop', {
          key: 'stop2',
          offset: '50%',
          stopColor: '#ffffff',
          stopOpacity: '0.1'
        }),
        React.createElement('stop', {
          key: 'stop3',
          offset: '100%',
          stopColor: '#ffffff',
          stopOpacity: '0.2'
        })
      ]),
      // Radial gradient for edge highlight
      React.createElement('radialGradient', {
        key: 'edge-gradient',
        id: 'edge-gradient',
        cx: '50%',
        cy: '30%',
        r: '70%'
      }, [
        React.createElement('stop', {
          key: 'stop1',
          offset: '0%',
          stopColor: '#ffffff',
          stopOpacity: '0.3'
        }),
        React.createElement('stop', {
          key: 'stop2',
          offset: '100%',
          stopColor: '#ffffff',
          stopOpacity: '0'
        })
      ])
    ]),

    // Background circle/semicircle with glass effect
    isCircular ? [
      // Base circle
      React.createElement('circle', {
        key: 'background',
        cx: 0,
        cy: 0,
        r: radius,
        fill: 'url(#glass-gradient)',
        stroke: color,
        strokeWidth: 2,
        opacity: 0.8
      }),
      // Glass shine overlay
      React.createElement('circle', {
        key: 'glass-shine',
        cx: 0,
        cy: 0,
        r: radius,
        fill: 'url(#edge-gradient)',
        stroke: 'none'
      })
    ] : [
      // Base semicircle
      React.createElement('path', {
        key: 'background',
        d: `M ${radius} 0 A ${radius} ${radius} 0 0 0 ${-radius} 0 L ${radius} 0 Z`,
        fill: 'url(#glass-gradient)',
        stroke: color,
        strokeWidth: 2,
        opacity: 0.8
      }),
      // Glass shine overlay for semicircle
      React.createElement('path', {
        key: 'glass-shine',
        d: `M ${radius} 0 A ${radius} ${radius} 0 0 0 ${-radius} 0 L ${radius} 0 Z`,
        fill: 'url(#edge-gradient)',
        stroke: 'none'
      }),
      // Subtle inner glow
      React.createElement('path', {
        key: 'inner-glow',
        d: `M ${radius * 0.95} 0 A ${radius * 0.95} ${radius * 0.95} 0 0 0 ${-radius * 0.95} 0 L ${radius * 0.95} 0 Z`,
        fill: 'none',
        stroke: '#ffffff',
        strokeWidth: 1,
        opacity: 0.3
      }),
      // FLAT RECTANGULAR BASE (like real protractor)
      React.createElement('rect', {
        key: 'flat-base',
        x: -radius,
        y: 0,
        width: radius * 2,
        height: radius * 0.15, // Small rectangular base
        fill: 'url(#glass-gradient)',
        stroke: color,
        strokeWidth: 2,
        opacity: 0.8
      }),
      // Base shine
      React.createElement('rect', {
        key: 'base-shine',
        x: -radius,
        y: 0,
        width: radius * 2,
        height: radius * 0.15,
        fill: 'url(#edge-gradient)',
        stroke: 'none',
        opacity: 0.5
      })
    ],

    // Degree marks
    showDegreeMarks && degreeMarks.map((mark, idx) => 
      React.createElement('line', {
        key: `mark-${idx}`,
        x1: mark.x1,
        y1: mark.y1,
        x2: mark.x2,
        y2: mark.y2,
        stroke: color,
        strokeWidth: mark.strokeWidth,  // Use calculated stroke width
        strokeLinecap: 'round'
      })
    ),

    // Degree labels
    degreeLabels.map((label, idx) =>
      React.createElement('text', {
        key: `label-${idx}`,
        x: label.x,
        y: label.y,
        fill: labelColor,  // Use labelColor prop
        fontSize: labelFontSizePx,  // Use processed font size
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        pointerEvents: 'none'
      }, label.degree)
    ),

    // Center point indicator
    React.createElement('circle', {
      key: 'center-point',
      cx: 0,
      cy: 0,
      r: 3,
      fill: color
    })
  ].flat().filter(Boolean));
});

/**
 * MeasurementArm Component
 * Renders a rotatable arm for angle measurement
 */
const MeasurementArm = React.memo((props) => {
  const {
    angle = 0,
    length = 80,
    color = '#FF0000',
    style = 'solid',          // 'solid' or 'dashed'
    extendable = false,       // Allow extending arm by dragging arrowhead
    zIndex = 10,              // Z-index for arm (higher than protractor body)
    showAngleDisplay = true,
    anglePrecision = 1,
    isRotating = false,
    onRotationStart,          // Callback when user starts rotating (via arm line)
    onArrowheadStart,         // Callback for arrowhead (can both rotate and extend)
    angleDisplaySize = 14,    // Font size for angle display (pixels)
    angleDisplayColor = null, // Color for angle display (null = use arm color)
    protractorRotation = 0,    // Rotation of the protractor body (so baseline rotates with it)
    // Baseline props
    showBaseline = false,
    baselineColor = '#999999',
    baselineStyle = 'dashed',
    baselineWidth = 1
  } = props;

  const angleRad = angle * (Math.PI / 180); // Convert degrees to radians (0° = right, increases counterclockwise)
  
  const x = length * Math.cos(angleRad);
  const y = -length * Math.sin(angleRad);  // Negate Y because screen coordinates are inverted

  // Debug: circle (arrowhead) position in arm viewBox coords (viewBox -150 -150 300 300, center 0,0)
  React.useEffect(() => {
    if (typeof angle === 'number' && length > 50) {
      console.log('[MeasurementArm] Circle position (viewBox coords):', {
        cx: x,
        cy: y,
        inputs: { angle, length, protractorRotation }
      });
    }
  }, [angle, length, protractorRotation, x, y]);

  return React.createElement('svg', {
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: 'none',  // SVG itself doesn't block
      zIndex: zIndex,  // Apply z-index to be above protractor body
      transform: `rotate(${protractorRotation}deg)`,  // Rotate with protractor body
      transformOrigin: 'center center'
    },
    viewBox: `-150 -150 300 300`
  }, [
    // Baseline (horizontal reference line at 0°)
    showBaseline && React.createElement('line', {
      key: 'baseline',
      x1: -length,  // Extend left
      y1: 0,
      x2: length,   // Extend right
      y2: 0,
      stroke: baselineColor,
      strokeWidth: baselineWidth,
      strokeLinecap: 'butt',
      strokeDasharray: baselineStyle === 'dashed' ? '8, 4' : 'none',
      opacity: 0.7,
      style: {
        pointerEvents: 'none'  // Don't block clicks
      }
    }),
    
    // Invisible clickable area along the arm (thicker for easier clicking)
    onRotationStart && React.createElement('line', {
      key: 'arm-clickable',
      x1: 0,
      y1: 0,
      x2: x,
      y2: y,
      stroke: 'transparent',
      strokeWidth: 20,  // Wide invisible area for easier clicking
      strokeLinecap: 'round',
      style: {
        cursor: 'crosshair',
        pointerEvents: 'auto'  // This line captures clicks
      },
      onMouseDown: onRotationStart,
      onTouchStart: onRotationStart
    }),
    
    // Arm line (visual)
    React.createElement('line', {
      key: 'arm',
      x1: 0,
      y1: 0,
      x2: x,
      y2: y,
      stroke: color,
      strokeWidth: 3,
      strokeLinecap: 'round',
      strokeDasharray: style === 'dashed' ? '8, 4' : 'none',  // Dashed if style is 'dashed'
      opacity: isRotating ? 0.7 : 1,
      style: {
        pointerEvents: 'none'  // Visual line doesn't block clicks
      }
    }),

    // Arrowhead at end (clickable for both rotation AND extension)
    React.createElement('circle', {
      key: 'arrowhead',
      cx: x,
      cy: y,
      r: extendable ? 8 : 5,  // Larger if extendable
      fill: color,
      opacity: isRotating ? 0.7 : 1,
      style: {
        cursor: extendable ? 'move' : (onRotationStart ? 'crosshair' : 'default'),
        pointerEvents: (onArrowheadStart || onRotationStart) ? 'auto' : 'none',
        stroke: extendable ? 'white' : 'none',
        strokeWidth: extendable ? 2 : 0
      },
      onMouseDown: onArrowheadStart || onRotationStart,  // Use combined handler if available
      onTouchStart: onArrowheadStart || onRotationStart,
      title: extendable ? 'Drag to rotate & extend/retract arm' : 'Drag to rotate arm'
    }),

    // Angle display - positioned outside the arrowhead
    showAngleDisplay && React.createElement('text', {
      key: 'angle-text',
      x: x * 1.15,  // Position outside arrowhead (15% beyond)
      y: y * 1.15,  // Position outside arrowhead (15% beyond)
      fill: angleDisplayColor || color,
      fontSize: angleDisplaySize,
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      style: {
        pointerEvents: 'none',  // Don't block clicks
        userSelect: 'none'
      }
    }, ProtractorUtils.formatAngleDisplay(angle, anglePrecision))
  ].filter(Boolean));
});

/**
 * Main Protractor Component
 */
const ProtractorComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    centerPoint,
    zIndex = 5000,
    
    // Visual Configuration
    protractorType = 'semicircular',
    radius = '100gc',
    color = '#333',
    backgroundColor = 'rgba(255, 255, 255, 0.9)',
    showDegreeMarks = true,
    showDegreeLabels = true,
    degreeInterval = 10,
    labelInterval = 30,
    protractorRotation = 0,
    labelColor = '#333',  // Font color for degree labels
    showRotationRing = true,  // Toggle rotation ring visibility
    labelFontSize = '12gc',  // NEW: Font size in GC units
    majorTickLength = '15gc',  // NEW: Length of major ticks in GC
    minorTickLength = '8gc',   // NEW: Length of minor ticks in GC
    majorTickWidth = '2gc',    // NEW: Width of major ticks in GC
    minorTickWidth = '1gc',    // NEW: Width of minor ticks in GC
    
    // Interactive Configuration
    mode = 'interactive',
    isDraggable = true,
    isRotatable = true,
    isProtractorRotatable = false,  // NEW: Can rotate the entire protractor body
    showProtractorRotationHandle = false,  // NEW: Show a rotation handle for touch/TV interfaces
    
    // Measurement Arm Configuration (nested object)
    measurementArm = {
      show: true,
      length: 'auto',
      color: '#FF0000',
      angle: 0,
      startDeg: 0,           // Starting degree (initial angle) - NEW
      style: 'solid',        // 'solid' or 'dashed'
      extendable: false,     // Can extend beyond protractor edge
      zIndex: 10,            // Higher than protractor body (protractor body is at 5)
      // Angle display configuration
      angleDisplay: {
        show: true,
        size: '14gc',        // Font size in GC units
        color: null          // Color (null = use arm color)
      }
    },
    
    // Baseline Configuration (separate from measurement arm)
    baseline = {},
    
    // Legacy props for backward compatibility (will be overridden by measurementArm if provided)
    showArm,
    armLength,
    armColor,
    armAngle,
    
    // Snap & Precision
    snapToGrid = false,
    snapToDegrees = 0,
    anglePrecision = 1,
    
    // NEW: Snap Points Configuration
    snapPoints = [],  // Array of snap points: [{x, y, label}, ...] where x,y are grid coordinates
    snapMode = 'free',  // 'free', 'fixed', 'hybrid'
    snapThreshold = 50,  // Distance in pixels to trigger snap
    showSnapIndicators = true,  // Show visual indicators for snap points
    highlightNearestSnap = true,  // Highlight (turn green) the nearest snap point when nearby
    
    // Integration
    attachToElement,
    measureMode = 'single',
    
    // Callback functions
    onAngleChange,        // Called when measurement arm angle changes: (angle) => {}
    onArmExtend,          // Called when arm length changes: (length) => {}
    onProtractorRotate,   // Called when protractor body rotates: (rotation) => {}
    onPositionChange,     // Called when protractor is dragged: (position) => {}
    onSnapToPoint,        // Called when protractor snaps to a point: (snapPoint) => {}
    
    // Additional props
    onClick,
    cursor = 'move',
    opacity = 1
  } = props;

  // Calculate initial angle from props
  const initialAngle = React.useMemo(() => {
    return measurementArm.startDeg !== undefined ? measurementArm.startDeg : 
           (measurementArm.angle !== undefined ? measurementArm.angle : 
           (armAngle !== undefined ? armAngle : 0));
  }, [measurementArm.startDeg, measurementArm.angle, armAngle]);

  // State
  const [currentArmAngle, setCurrentArmAngle] = React.useState(initialAngle);
  const [currentProtractorRotation, setCurrentProtractorRotation] = React.useState(protractorRotation);
  const [currentArmLength, setCurrentArmLength] = React.useState(null); // Track custom arm length (null means use default 1.5x)
  const [isRotatingArm, setIsRotatingArm] = React.useState(false);
  const [isRotatingProtractor, setIsRotatingProtractor] = React.useState(false);
  const [isExtendingArm, setIsExtendingArm] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [nearestSnapPoint, setNearestSnapPoint] = React.useState(null);
  const [currentPosition, setCurrentPosition] = React.useState(null); // Track position after drag/snap
  const [isInitializedToSnapPoint, setIsInitializedToSnapPoint] = React.useState(false); // Track if we initialized to a snap point
  const containerRef = React.useRef(null);

  // Merge legacy props with new nested measurementArm object
  const armConfig = React.useMemo(() => {
    const startAngle = measurementArm.startDeg !== undefined ? measurementArm.startDeg : 
                      (measurementArm.angle !== undefined ? measurementArm.angle : 
                      (armAngle !== undefined ? armAngle : 0));
    
    const angleDisplayConfig = measurementArm.angleDisplay || {};
    
    return {
      show: measurementArm.show !== undefined ? measurementArm.show : (showArm !== undefined ? showArm : true),
      length: measurementArm.length || armLength || 'auto',
      color: measurementArm.color || armColor || '#FF0000',
      startDeg: startAngle,
      style: measurementArm.style || 'solid',
      extendable: measurementArm.extendable !== undefined ? measurementArm.extendable : false,
      zIndex: measurementArm.zIndex !== undefined ? measurementArm.zIndex : 10,
      angleDisplay: {
        show: angleDisplayConfig.show !== undefined ? angleDisplayConfig.show : true,
        size: angleDisplayConfig.size || '14gc',
        color: angleDisplayConfig.color || measurementArm.color || armColor || '#FF0000'
      }
    };
  }, [measurementArm, showArm, armLength, armColor, armAngle]);

  // Baseline configuration (separate from arm)
  const baselineConfig = React.useMemo(() => {
    return {
      show: baseline.show !== undefined ? baseline.show : false,
      color: baseline.color || '#999999',
      style: baseline.style || 'dashed',
      width: baseline.width !== undefined ? baseline.width : 1
    };
  }, [baseline]);

  // Sync rotation and arm angle from props when updated programmatically (e.g. for diagonal angle animation)
  React.useEffect(() => {
    setCurrentProtractorRotation(protractorRotation);
    if (baselineConfig.show && typeof protractorRotation === 'number') {
      console.log('[Protractor] Baseline rotation applied:', { protractorRotation, id: id || elementName });
    }
  }, [protractorRotation, baselineConfig.show, id, elementName]);
  React.useEffect(() => {
    const next = armAngle !== undefined ? armAngle : (measurementArm.startDeg !== undefined ? measurementArm.startDeg : (measurementArm.angle !== undefined ? measurementArm.angle : 0));
    setCurrentArmAngle(next);
  }, [armAngle, measurementArm.startDeg, measurementArm.angle]);

  // Calculate if position is near a snap point
  const findNearestSnapPoint = React.useCallback((currentPos) => {
    if (!snapPoints || snapPoints.length === 0 || snapMode === 'free') {
      return null;
    }

    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

    // Log snap points on first call
    if (!findNearestSnapPoint._logged) {
      console.log('📍 [Protractor] Processing snap points:', {
        count: snapPoints.length,
        snapPoints: snapPoints,
        gridRows: gridRows,
        gridCols: gridCols,
        snapMode: snapMode,
        snapThreshold: snapThreshold
      });
      findNearestSnapPoint._logged = true;
    }

    // Convert current position to pixels
    const currentPixelX = (currentPos.x / gridCols) * viewportWidth;
    const currentPixelY = (currentPos.y / gridRows) * viewportHeight;

    let nearest = null;
    let minDistance = Infinity;

    snapPoints.forEach((point, idx) => {
      const snapPixelX = (point.x / gridCols) * viewportWidth;
      const snapPixelY = (point.y / gridRows) * viewportHeight;

      const distance = Math.sqrt(
        Math.pow(currentPixelX - snapPixelX, 2) + 
        Math.pow(currentPixelY - snapPixelY, 2)
      );

      if (distance < minDistance && distance <= snapThreshold) {
        minDistance = distance;
        nearest = { ...point, distance };
      }
    });

    return nearest;
  }, [snapPoints, snapMode, snapThreshold]);

  // Process GC units for radius
  const processGcProperty = React.useCallback((value, propertyName = 'width') => {
    // Handle if value is already a number
    if (typeof value === 'number') {
      return value;
    }
    
    // Try GridCellFontUtils if available
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      const result = GridCellFontUtils.processGcProperty(value, propertyName);
      // GridCellFontUtils might return a string like "56.25px", we need just the number
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
      if (isNaN(gcValue)) return 100; // Default fallback
      
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const pixels = (gcValue / gridSystemCols) * viewportWidth;
      return !isNaN(pixels) ? pixels : 100;
    }
    
    // Try to parse as number
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : 100; // Default to 100 if all else fails
  }, []);

  const radiusPixels = React.useMemo(() => {
    const processed = processGcProperty(radius, 'width');
    const finalRadius = !isNaN(processed) && processed > 0 ? processed : 100;
    console.log('🔍 Radius calculation:', { radius, processed, finalRadius });
    return finalRadius;
  }, [radius, processGcProperty]);

  const armLengthPixels = React.useMemo(() => {
    // Use custom length if set (user has extended/retracted)
    if (currentArmLength !== null) {
      return currentArmLength;
    }
    
    // Use configured length
    const configLength = armConfig.length;
    let baseLength;
    
    if (configLength === 'auto') {
      baseLength = radiusPixels * 0.8;
      if (isNaN(baseLength)) baseLength = 80;
    } else {
      const processed = processGcProperty(configLength, 'width');
      baseLength = !isNaN(processed) && processed > 0 ? processed : 80;
    }
    
    // If extendable, default to 1.5x length
    if (armConfig.extendable) {
      return baseLength * 1.5;
    }
    
    return baseLength;
  }, [currentArmLength, armConfig.length, armConfig.extendable, radiusPixels, processGcProperty]);

  // Calculate position from coordinates or centerPoint
  const position = React.useMemo(() => {
    // Use currentPosition if set (after drag/snap), otherwise calculate from props
    if (currentPosition) {
      return currentPosition;
    }
    
    let calcPosition = null;
    
    if (centerPoint) {
      // Use centerPoint if provided
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      // Check if centerPoint matches a snap point (within 0.1 precision grid units)
      let matchingSnapPoint = null;
      if (snapPoints && snapPoints.length > 0) {
        matchingSnapPoint = snapPoints.find(point => {
          const xDiff = Math.abs(point.x - centerPoint.col);
          const yDiff = Math.abs(point.y - centerPoint.row);
          return xDiff < 0.1 && yDiff < 0.1;
        });
      }
      
      if (matchingSnapPoint) {
        console.log('✅ [Protractor] centerPoint matches snap point:', matchingSnapPoint.label);
        // Use the snap point coordinates exactly to avoid drift
        const xPercent = (matchingSnapPoint.x / gridCols) * 100;
        const yPercent = (matchingSnapPoint.y / gridRows) * 100;
        calcPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`
        };
      } else {
        console.log('📍 [Protractor] Calculating position from centerPoint:', {
          centerPoint: centerPoint,
          gridRows: gridRows,
          gridCols: gridCols,
          xPercent: (centerPoint.col / gridCols) * 100,
          yPercent: (centerPoint.row / gridRows) * 100
        });
        
        const xPercent = (centerPoint.col / gridCols) * 100;
        const yPercent = (centerPoint.row / gridRows) * 100;
        
        calcPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`
        };
      }
    } else if (coordinates && Array.isArray(coordinates) && coordinates.length >= 2) {
      // Use coordinates if provided
      const [x1, y1] = coordinates;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      const xPercent = ((x1 - 1) / gridCols) * 100;
      const yPercent = ((y1 - 1) / gridRows) * 100;
      
      calcPosition = {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
    }
    
    return calcPosition;
  }, [coordinates, centerPoint, currentPosition, snapPoints]);

  // Initialize position to match snap point if centerPoint matches one
  React.useEffect(() => {
    if (!centerPoint || !snapPoints || snapPoints.length === 0 || currentPosition) {
      return; // Already positioned or no snap points
    }
    
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    // Check if centerPoint matches a snap point (within 0.1 precision grid units)
    const matchingSnapPoint = snapPoints.find(point => {
      const xDiff = Math.abs(point.x - centerPoint.col);
      const yDiff = Math.abs(point.y - centerPoint.row);
      return xDiff < 0.1 && yDiff < 0.1;
    });
    
    if (matchingSnapPoint) {
      console.log('✅ [Protractor] Initializing position to match snap point:', matchingSnapPoint.label);
      const xPercent = (matchingSnapPoint.x / gridCols) * 100;
      const yPercent = (matchingSnapPoint.y / gridRows) * 100;
      setCurrentPosition({
        left: `${xPercent}%`,
        top: `${yPercent}%`
      });
      setIsInitializedToSnapPoint(true); // Mark that we've initialized to a snap point
    }
  }, [centerPoint, snapPoints]); // Only run once on mount or when these change

  // Handle arm rotation
  const handleArmRotationStart = React.useCallback((e) => {
    if (!isRotatable || mode === 'static') return;
    
    e.stopPropagation();
    setIsRotatingArm(true);
  }, [isRotatable, mode]);

  const handleArmRotationMove = React.useCallback((e) => {
    if (!isRotatingArm || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Calculate center more precisely, accounting for any sub-pixel positioning
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) return;

    // Get mouse position relative to center
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    // Transform mouse coordinates to protractor's local coordinate system
    // Rotate the point back by the protractor rotation to get coordinates in protractor's space
    const rotationRad = -currentProtractorRotation * (Math.PI / 180); // Negative to rotate back
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    
    // Rotate point around origin (center) by negative protractor rotation
    // This transforms screen coordinates to the protractor's local coordinate system
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;
    
    // Calculate angle in protractor's local coordinate system
    // 0° is right (positive X), increases counterclockwise
    // Negate Y because screen Y is inverted (increases downward)
    const angleRad = Math.atan2(-localY, localX);
    let finalAngle = angleRad * (180 / Math.PI);
    
    // Normalize to 0-360
    while (finalAngle < 0) finalAngle += 360;
    while (finalAngle >= 360) finalAngle -= 360;
    
    // Apply snapping
    if (snapToDegrees > 0) {
      finalAngle = ProtractorUtils.snapAngleToDegrees(finalAngle, snapToDegrees);
    }
    
    setCurrentArmAngle(finalAngle);
    
    // Call callback if provided
    if (onAngleChange) {
      onAngleChange(finalAngle);
    }
  }, [isRotatingArm, snapToDegrees, onAngleChange, currentProtractorRotation]);

  const handleArmRotationEnd = React.useCallback(() => {
    setIsRotatingArm(false);
  }, []);

  // Set up arm rotation event listeners
  React.useEffect(() => {
    if (isRotatingArm) {
      window.addEventListener('mousemove', handleArmRotationMove);
      window.addEventListener('mouseup', handleArmRotationEnd);
      window.addEventListener('touchmove', handleArmRotationMove);
      window.addEventListener('touchend', handleArmRotationEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleArmRotationMove);
        window.removeEventListener('mouseup', handleArmRotationEnd);
        window.removeEventListener('touchmove', handleArmRotationMove);
        window.removeEventListener('touchend', handleArmRotationEnd);
      };
    }
  }, [isRotatingArm, handleArmRotationMove, handleArmRotationEnd]);

  // Handle arrowhead interaction (can both rotate and extend)
  const handleArrowheadStart = React.useCallback((e) => {
    if (mode === 'static') return;
    
    e.stopPropagation();  // Don't trigger protractor dragging
    
    // Start tracking for both rotation and extension
    if (isRotatable) {
      setIsRotatingArm(true);
    }
    if (armConfig.extendable) {
      setIsExtendingArm(true);
    }
  }, [mode, isRotatable, armConfig.extendable]);

  // Handle arm extension (dragging arrowhead to change length)
  const handleArmExtensionStart = React.useCallback((e) => {
    if (!armConfig.extendable || mode === 'static') return;
    
    e.stopPropagation();  // Don't trigger protractor dragging
    setIsExtendingArm(true);
  }, [armConfig.extendable, mode]);

  const handleArmExtensionMove = React.useCallback((e) => {
    if (!isExtendingArm || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;

    if (clientX === undefined || clientY === undefined) return;

    // Calculate distance from center to mouse
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const newLength = Math.sqrt(dx * dx + dy * dy);

    // Calculate base length (1x)
    const baseLength = radiusPixels * 0.8;
    
    // Set minimum length to 1x (base length) and maximum to 3x
    const minLength = baseLength;
    const maxLength = baseLength * 3;
    const clampedLength = Math.max(minLength, Math.min(maxLength, newLength));

    setCurrentArmLength(clampedLength);
    
    // Call callback if provided
    if (onArmExtend) {
      onArmExtend(clampedLength);
    }
  }, [isExtendingArm, radiusPixels, onArmExtend]);

  const handleArmExtensionEnd = React.useCallback(() => {
    setIsExtendingArm(false);
  }, []);

  // Attach global listeners for arm extension
  React.useEffect(() => {
    if (isExtendingArm) {
      window.addEventListener('mousemove', handleArmExtensionMove);
      window.addEventListener('mouseup', handleArmExtensionEnd);
      window.addEventListener('touchmove', handleArmExtensionMove);
      window.addEventListener('touchend', handleArmExtensionEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleArmExtensionMove);
        window.removeEventListener('mouseup', handleArmExtensionEnd);
        window.removeEventListener('touchmove', handleArmExtensionMove);
        window.removeEventListener('touchend', handleArmExtensionEnd);
      };
    }
  }, [isExtendingArm, handleArmExtensionMove, handleArmExtensionEnd]);

  // Handle protractor body rotation (Ctrl/Cmd + drag on protractor face, or two-finger touch)
  const handleProtractorRotationStart = React.useCallback((e) => {
    if (!isProtractorRotatable || mode === 'static') return;
    
    // For touch: require two fingers
    if (e.touches && e.touches.length === 2) {
      e.stopPropagation();  // Don't trigger dragging
      setIsRotatingProtractor(true);
      return;
    }
    
    // For mouse: only rotate if Ctrl (Windows/Linux) or Cmd (Mac) is pressed
    if (!e.touches && (e.ctrlKey || e.metaKey)) {
      e.stopPropagation();  // Don't trigger dragging
      setIsRotatingProtractor(true);
      return;
    }
  }, [isProtractorRotatable, mode]);

  const handleProtractorRotationMove = React.useCallback((e) => {
    if (!isRotatingProtractor || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let clientX, clientY;
    
    // For two-finger touch: use midpoint between two fingers
    if (e.touches && e.touches.length === 2) {
      clientX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      clientY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    } else {
      clientX = e.clientX || e.touches?.[0]?.clientX;
      clientY = e.clientY || e.touches?.[0]?.clientY;
    }
    
    if (!clientX || !clientY) return;

    const angle = ProtractorUtils.calculateAngleToPoint(
      { x: centerX, y: centerY },
      { x: clientX, y: clientY }
    );

    setCurrentProtractorRotation(angle);
    
    // Call callback if provided
    if (onProtractorRotate) {
      onProtractorRotate(angle);
    }
  }, [isRotatingProtractor, onProtractorRotate]);

  const handleProtractorRotationEnd = React.useCallback(() => {
    setIsRotatingProtractor(false);
  }, []);

  // Attach global listeners for protractor rotation
  React.useEffect(() => {
    if (isRotatingProtractor) {
      window.addEventListener('mousemove', handleProtractorRotationMove);
      window.addEventListener('mouseup', handleProtractorRotationEnd);
      window.addEventListener('touchmove', handleProtractorRotationMove, { passive: false });
      window.addEventListener('touchend', handleProtractorRotationEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleProtractorRotationMove);
        window.removeEventListener('mouseup', handleProtractorRotationEnd);
        window.removeEventListener('touchmove', handleProtractorRotationMove);
        window.removeEventListener('touchend', handleProtractorRotationEnd);
      };
    }
  }, [isRotatingProtractor, handleProtractorRotationMove, handleProtractorRotationEnd]);

  // Determine if component should be draggable based on mode
  const shouldBeDraggable = React.useMemo(() => {
    return mode === 'draggable' || mode === 'interactive';
  }, [mode]);

  // Container style
  const containerStyle = React.useMemo(() => {
    const baseStyle = {
      position: 'absolute',
      width: `${radiusPixels * 2.5}px`,
      height: `${radiusPixels * 2.5}px`,
      zIndex: zIndex,
      cursor: shouldBeDraggable ? cursor : (isRotatable ? 'crosshair' : 'default'),
      pointerEvents: mode === 'static' ? 'none' : 'auto',
      opacity: opacity,
      transform: 'translate(-50%, -50%)'
    };

    if (position) {
      baseStyle.left = position.left;
      baseStyle.top = position.top;
    }

    return baseStyle;
  }, [radiusPixels, zIndex, cursor, position, mode, shouldBeDraggable, isRotatable, opacity]);

  // Handle click
  const handleClick = React.useCallback((e) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  // Render protractor face with draggable cursor hint.
  // Pass rotation: 0 so only the wrapper div applies currentProtractorRotation; otherwise the face
  // would be rotated twice (wrapper + face SVG) and the baseline would not match the measurement arm baseline.
  const protractorFace = React.createElement(ProtractorFace, {
    protractorType,
    radius: radiusPixels,
    color,
    backgroundColor,
    showDegreeMarks,
    showDegreeLabels,
    degreeInterval,
    labelInterval,
    rotation: 0,
    labelColor,  // Pass labelColor prop
    labelFontSize,  // Pass font size
    majorTickLength,  // Pass major tick length
    minorTickLength,  // Pass minor tick length
    majorTickWidth,   // Pass major tick width
    minorTickWidth    // Pass minor tick width
  });
  
  // Wrap protractor face in a div that has pointer-events to allow dragging
  const draggableProtractorFace = React.createElement('div', {
    key: 'protractor-face-wrapper',
    onMouseDown: isProtractorRotatable ? handleProtractorRotationStart : undefined,
    onTouchStart: isProtractorRotatable ? handleProtractorRotationStart : undefined,
    style: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      cursor: shouldBeDraggable ? 'move' : 'default',
      pointerEvents: 'auto',
      zIndex: 5,
      transform: `rotate(${currentProtractorRotation}deg)`,
      transition: isRotatingProtractor ? 'none' : 'transform 0.2s ease'
    }
  }, protractorFace);
  
  // Create a visible rotation ring that users can click/drag to rotate the arm
  // This is a ring (donut shape) so clicks inside pass through to the protractor face
  const rotationRing = isRotatable && armConfig.show && showRotationRing && React.createElement('div', {
    key: 'rotation-ring',
    onMouseDown: (e) => {
      // Only handle clicks on the ring itself, not the center
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      const distance = Math.sqrt(
        Math.pow(clickX - centerX, 2) + 
        Math.pow(clickY - centerY, 2)
      );
      
      const outerRadius = rect.width / 2;
      const innerRadius = outerRadius * 0.85; // Ring thickness: 15% of radius
      
      // Only handle if click is on the ring (between inner and outer radius)
      if (distance >= innerRadius && distance <= outerRadius) {
        handleArmRotationStart(e);
      }
    },
    onTouchStart: (e) => {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      
      const distance = Math.sqrt(
        Math.pow(touchX - centerX, 2) + 
        Math.pow(touchY - centerY, 2)
      );
      
      const outerRadius = rect.width / 2;
      const innerRadius = outerRadius * 0.85;
      
      if (distance >= innerRadius && distance <= outerRadius) {
        handleArmRotationStart(e);
      }
    },
    style: {
      position: 'absolute',
      width: `${radiusPixels * 2.2}px`,
      height: `${radiusPixels * 2.2}px`,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      border: '3px dashed rgba(255, 100, 100, 0.5)',
      borderRadius: '50%',
      cursor: 'crosshair',
      pointerEvents: 'auto',
      zIndex: 15,  // Higher than protractor face (5) and measurement arm (10)
      boxSizing: 'border-box',
      // Make the center transparent to clicks by using a background that's a ring
      background: 'transparent'
    },
    title: 'Click and drag on the ring to rotate the measurement arm'
  });

  // Render snap point indicators (shown globally, not inside protractor)
  const snapIndicators = React.useMemo(() => {
    if (!snapPoints || snapPoints.length === 0 || snapMode === 'free') {
      return null;
    }

    // If showSnapIndicators is false AND highlightNearestSnap is false, show nothing
    if (!showSnapIndicators && !highlightNearestSnap) {
      return null;
    }

    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;

    return snapPoints.map((point, idx) => {
      const xPercent = (point.x / gridCols) * 100;
      const yPercent = (point.y / gridRows) * 100;
      const isNearest = nearestSnapPoint && nearestSnapPoint.x === point.x && nearestSnapPoint.y === point.y;

      // If showSnapIndicators is false, only show the nearest point (when highlightNearestSnap is true)
      if (!showSnapIndicators && !isNearest) {
        return null; // Skip non-nearest points when indicators are hidden
      }

      // Determine if we should highlight (turn green)
      const shouldHighlight = highlightNearestSnap && isNearest;

      return React.createElement('div', {
        key: `snap-${idx}`,
        style: {
          position: 'fixed',
          left: `${xPercent}%`,
          top: `${yPercent}%`,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `3px solid ${shouldHighlight ? '#00FF00' : '#FF6600'}`,
          backgroundColor: shouldHighlight ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 102, 0, 0.2)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'all 0.2s ease',
          boxShadow: shouldHighlight ? '0 0 15px rgba(0, 255, 0, 0.6)' : '0 0 10px rgba(255, 102, 0, 0.4)'
        },
        title: point.label || `Snap point (${point.x}, ${point.y})`
      }, point.label && React.createElement('div', {
        style: {
          position: 'absolute',
          top: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '12px',
          fontWeight: 'bold',
          color: shouldHighlight ? '#00FF00' : '#FF6600',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '2px 6px',
          borderRadius: '3px',
          whiteSpace: 'nowrap'
        }
      }, point.label));
    }).filter(Boolean); // Remove null entries
  }, [snapPoints, showSnapIndicators, snapMode, nearestSnapPoint, highlightNearestSnap]);

  // Process angle display size from GC units
  const angleDisplaySizePixels = React.useMemo(() => {
    const size = armConfig.angleDisplay.size;
    if (typeof size === 'string' && size.endsWith('gc')) {
      const processed = processGcProperty(size, 'fontSize');
      return !isNaN(processed) ? processed : 14;
    }
    return typeof size === 'number' ? size : 14;
  }, [armConfig.angleDisplay.size, processGcProperty]);

  // Render measurement arm
  // Rotation handle for touch/TV interfaces - appears at top of protractor
  const rotationHandle = showProtractorRotationHandle && isProtractorRotatable && React.createElement('div', {
    key: 'rotation-handle',
    onMouseDown: (e) => {
      e.stopPropagation();
      setIsRotatingProtractor(true);
    },
    onTouchStart: (e) => {
      e.stopPropagation();
      setIsRotatingProtractor(true);
    },
    style: {
      position: 'absolute',
      top: '-20px',  // Position above protractor
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(59, 130, 246, 0.9)',  // Blue
      border: '2px solid white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      cursor: 'grab',
      zIndex: 20,  // Above everything
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
      transition: isRotatingProtractor ? 'none' : 'transform 0.2s ease'
    }
  },
    // Rotation icon (circular arrows)
    React.createElement('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'white',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
      // Circular arrow
      React.createElement('path', {
        d: 'M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2'
      })
    )
  );

  const measurementArmElement = armConfig.show && React.createElement(MeasurementArm, {
    angle: currentArmAngle,
    length: armLengthPixels,
    color: armConfig.color,
    style: armConfig.style,        // 'solid' or 'dashed'
    extendable: armConfig.extendable,
    zIndex: armConfig.zIndex,      // Higher than protractor body
    showAngleDisplay: armConfig.angleDisplay.show,
    angleDisplaySize: angleDisplaySizePixels,  // Processed pixel size
    angleDisplayColor: armConfig.angleDisplay.color,
    anglePrecision,
    isRotating: isRotatingArm || isExtendingArm,  // Show feedback for both actions
    onRotationStart: isRotatable ? handleArmRotationStart : null,  // Rotation via arm line
    onArrowheadStart: (isRotatable || armConfig.extendable) ? handleArrowheadStart : null,  // Combined handler for arrowhead
    protractorRotation: currentProtractorRotation,  // Pass protractor rotation so baseline rotates with it
    // Baseline props (separate configuration)
    showBaseline: baselineConfig.show,
    baselineColor: baselineConfig.color,
    baselineStyle: baselineConfig.style,
    baselineWidth: baselineConfig.width
  });

  // Interactive overlay for arm rotation - only covers the outer ring, not the center
  const rotationOverlay = null; // Removed - using rotation ring instead

  // Custom drag handlers for snap modes
  const handleDragStart = React.useCallback((id, pos) => {
    setIsDragging(true);
    // Reset initialization flag on first drag so snapping works normally
    if (isInitializedToSnapPoint) {
      setIsInitializedToSnapPoint(false);
    }
  }, [isInitializedToSnapPoint]);

  const handleDragMove = React.useCallback((id, pos) => {
    if (!isDragging) return;

    // Convert pixel position to grid position
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

    const gridX = (pos.x / viewportWidth) * gridCols;
    const gridY = (pos.y / viewportHeight) * gridRows;

    const currentGridPos = { x: gridX, y: gridY };
    const nearest = findNearestSnapPoint(currentGridPos);
    setNearestSnapPoint(nearest);
  }, [isDragging, findNearestSnapPoint]);

  const handleDragEnd = React.useCallback((id, pos) => {
    setIsDragging(false);

    // If we've already initialized to a snap point and haven't actually dragged,
    // skip the snap logic to prevent unwanted snapping on initial load
    if (isInitializedToSnapPoint && currentPosition) {
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      
      // Check if the current position matches our initialized position (within 1% tolerance)
      const currentLeftPercent = (pos.x / viewportWidth) * 100;
      const currentTopPercent = (pos.y / viewportHeight) * 100;
      const initializedLeftPercent = parseFloat(currentPosition.left);
      const initializedTopPercent = parseFloat(currentPosition.top);
      
      if (Math.abs(currentLeftPercent - initializedLeftPercent) < 1 && 
          Math.abs(currentTopPercent - initializedTopPercent) < 1) {
        console.log('✅ [Protractor] Skipping snap - already at initialized snap point');
        setIsInitializedToSnapPoint(false); // Reset flag after first interaction
        return pos; // Return current position without snapping
      }
    }

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

    if (snapMode === 'free') {
      setNearestSnapPoint(null);
      // Update position to where it was dropped
      const xPercent = (pos.x / viewportWidth) * 100;
      const yPercent = (pos.y / viewportHeight) * 100;
      const newPosition = {
        left: `${xPercent}%`,
        top: `${yPercent}%`
      };
      setCurrentPosition(newPosition);
      
      // Call callback if provided
      if (onPositionChange) {
        onPositionChange(pos, null); // position, snapPoint
      }
      
      return pos; // Return unmodified position
    }

    // Convert pixel position to grid position
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;

    const gridX = (pos.x / viewportWidth) * gridCols;
    const gridY = (pos.y / viewportHeight) * gridRows;

    const currentGridPos = { x: gridX, y: gridY };
    const nearest = findNearestSnapPoint(currentGridPos);

    if (snapMode === 'fixed') {
      // Fixed mode: MUST snap to a point
      // But first, check if we're already at a snap point (to avoid unwanted snapping on initialization)
      if (currentPosition && isInitializedToSnapPoint) {
        // Check if current position matches any snap point
        const currentLeftPercent = parseFloat(currentPosition.left);
        const currentTopPercent = parseFloat(currentPosition.top);
        const currentGridX = (currentLeftPercent / 100) * gridCols;
        const currentGridY = (currentTopPercent / 100) * gridRows;
        
        const alreadyAtSnapPoint = snapPoints.find(point => {
          const xDiff = Math.abs(point.x - currentGridX);
          const yDiff = Math.abs(point.y - currentGridY);
          return xDiff < 1 && yDiff < 1; // Within 1 precision grid unit
        });
        
        if (alreadyAtSnapPoint) {
          // Check if the drop position is close to the current position
          const dropLeftPercent = (pos.x / viewportWidth) * 100;
          const dropTopPercent = (pos.y / viewportHeight) * 100;
          const positionDiff = Math.abs(dropLeftPercent - currentLeftPercent) + Math.abs(dropTopPercent - currentTopPercent);
          
          if (positionDiff < 2) { // Within 2% total difference
            console.log(`✅ [Protractor] Already at snap point ${alreadyAtSnapPoint.label}, staying put`);
            setIsInitializedToSnapPoint(false); // Reset flag
            if (onPositionChange) {
              const currentPos = {
                x: (currentGridX / gridCols) * viewportWidth,
                y: (currentGridY / gridRows) * viewportHeight
              };
              onPositionChange(currentPos, alreadyAtSnapPoint);
            }
            return {
              x: (currentGridX / gridCols) * viewportWidth,
              y: (currentGridY / gridRows) * viewportHeight
            };
          }
        }
      }
      
      if (nearest) {
        console.log(`📍 Snapped to: ${nearest.label || `(${nearest.x}, ${nearest.y})`}`);
        setNearestSnapPoint(null);
        setIsInitializedToSnapPoint(false); // Reset flag after snapping
        
        // Update position to snapped point
        const xPercent = (nearest.x / gridCols) * 100;
        const yPercent = (nearest.y / gridRows) * 100;
        const newPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`
        };
        setCurrentPosition(newPosition);
        
        // Call callbacks if provided
        const snappedPos = {
          x: (nearest.x / gridCols) * viewportWidth,
          y: (nearest.y / gridRows) * viewportHeight
        };
        
        if (onSnapToPoint) {
          onSnapToPoint(nearest);
        }
        if (onPositionChange) {
          onPositionChange(snappedPos, nearest);
        }
        
        // Return snapped position
        return snappedPos;
      } else if (snapPoints && snapPoints.length > 0) {
        // If not near any point in fixed mode, snap to the absolute nearest one
        console.log('⚠️ Fixed mode: Snapping to nearest point');
        let absoluteNearest = snapPoints[0];
        let minDist = Infinity;
        
        snapPoints.forEach((point) => {
          const snapPixelX = (point.x / gridCols) * viewportWidth;
          const snapPixelY = (point.y / gridRows) * viewportHeight;
          const dist = Math.sqrt(
            Math.pow(pos.x - snapPixelX, 2) + 
            Math.pow(pos.y - snapPixelY, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            absoluteNearest = point;
          }
        });
        
        setNearestSnapPoint(null);
        
        // Update position to snapped point
        const xPercent = (absoluteNearest.x / gridCols) * 100;
        const yPercent = (absoluteNearest.y / gridRows) * 100;
        const newPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`
        };
        setCurrentPosition(newPosition);
        
        // Call callbacks if provided
        const snappedPos = {
          x: (absoluteNearest.x / gridCols) * viewportWidth,
          y: (absoluteNearest.y / gridRows) * viewportHeight
        };
        
        if (onSnapToPoint) {
          onSnapToPoint(absoluteNearest);
        }
        if (onPositionChange) {
          onPositionChange(snappedPos, absoluteNearest);
        }
        
        return snappedPos;
      }
    } else if (snapMode === 'hybrid') {
      // Hybrid mode: Snap if near, otherwise allow free placement
      if (nearest) {
        console.log(`📍 Snapped to: ${nearest.label || `(${nearest.x}, ${nearest.y})`}`);
        setNearestSnapPoint(null);
        
        // Update position to snapped point
        const xPercent = (nearest.x / gridCols) * 100;
        const yPercent = (nearest.y / gridRows) * 100;
        const newPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`
        };
        setCurrentPosition(newPosition);
        
        // Call callbacks if provided
        const snappedPos = {
          x: (nearest.x / gridCols) * viewportWidth,
          y: (nearest.y / gridRows) * viewportHeight
        };
        
        if (onSnapToPoint) {
          onSnapToPoint(nearest);
        }
        if (onPositionChange) {
          onPositionChange(snappedPos, nearest);
        }
        
        // Return snapped position
        return snappedPos;
      } else {
        // No snap - update to dropped position
        const xPercent = (pos.x / viewportWidth) * 100;
        const yPercent = (pos.y / viewportHeight) * 100;
        const newPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`
        };
        setCurrentPosition(newPosition);
        
        // Call callback if provided
        if (onPositionChange) {
          onPositionChange(pos, null); // position, no snap point
        }
      }
    }

    setNearestSnapPoint(null);
    
    // Call callback for final position if provided
    if (onPositionChange) {
      onPositionChange(pos, null);
    }
    
    return pos; // Return unmodified position
  }, [snapMode, snapPoints, findNearestSnapPoint, onPositionChange, onSnapToPoint, isInitializedToSnapPoint, currentPosition]);

  // Wrap in draggable if needed
  if (shouldBeDraggable && window.DraggableComponent?.Draggable) {
    const Draggable = window.DraggableComponent.Draggable;
    
    return React.createElement(React.Fragment, null, [
      // Snap indicators (rendered globally)
      snapIndicators,
      
      // Draggable protractor
      React.createElement(Draggable, {
        key: 'draggable-protractor',
        draggableId: id || `protractor-${elementName}-${currentPage}`,
        isDisabled: !isDraggable || mode === 'static',
        style: containerStyle,
        className: 'protractor-component',
        centerOnMouse: true, // NEW: Always center protractor on mouse pointer
        'data-element-name': elementName,
        'data-page': currentPage,
        'data-protractor-type': protractorType,
        'data-mode': mode,
        onDragStart: handleDragStart,
        onDragMove: handleDragMove,
        onDragEnd: handleDragEnd
      }, [
        React.createElement('div', {
          key: 'protractor-content',
          ref: containerRef,
          onClick: handleClick,
        style: {
          width: '100%',
          height: '100%',
          position: 'relative'
        }
      }, [
        React.createElement(React.Fragment, { key: 'rotation-ring' }, rotationRing),
        React.createElement(React.Fragment, { key: 'protractor-face' }, draggableProtractorFace),
        React.createElement(React.Fragment, { key: 'rotation-handle' }, rotationHandle),
        React.createElement(React.Fragment, { key: 'measurement-arm' }, measurementArmElement)
      ].filter(Boolean))
    ])
    ]);
  }

  // Static render (no draggable)
  return React.createElement(React.Fragment, null, [
    // Snap indicators (rendered globally)
    snapIndicators,
    
    // Static protractor
    React.createElement('div', {
      key: 'static-protractor',
      id: id || `protractor-${elementName}-${currentPage}`,
      ref: containerRef,
      className: 'protractor-component',
      style: containerStyle,
      onClick: handleClick,
      'data-element-name': elementName,
      'data-page': currentPage,
      'data-protractor-type': protractorType,
      'data-mode': mode
    }, [
      React.createElement(React.Fragment, { key: 'rotation-ring' }, rotationRing),
      React.createElement(React.Fragment, { key: 'protractor-face' }, draggableProtractorFace),
      React.createElement(React.Fragment, { key: 'rotation-handle' }, rotationHandle),
      React.createElement(React.Fragment, { key: 'measurement-arm' }, measurementArmElement)
    ].filter(Boolean))
  ].filter(Boolean));
});

/**
 * Protractor Element Configuration
 */
const ProtractorElement = {
  protractor: {
    type: 'protractor',
    coordinates: [800, 450, 800, 450], // Default center position
    zIndex: 5000,
    props: {
      componentType: 'ProtractorComponent',
      protractorType: 'semicircular',
      radius: '100gc',
      color: '#333',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      showDegreeMarks: true,
      showDegreeLabels: true,
      degreeInterval: 10,
      labelInterval: 30,
      protractorRotation: 0,
      mode: 'interactive',
      isDraggable: true,
      isRotatable: true,
      showArm: true,
      armLength: 'auto',
      armColor: '#FF0000',
      armAngle: 0,
      snapToGrid: false,
      snapToDegrees: 0,
      anglePrecision: 1,
      measureMode: 'single',
      cursor: 'move',
      opacity: 1
    },
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('protractor', (props, elementId) => {
      return React.createElement(ProtractorComponent, props);
    })
  }
};

// Export for use in elements-registry.js
if (typeof window !== 'undefined') {
  window.ProtractorComponent = {
    ProtractorComponent: ProtractorComponent,
    ProtractorFace: ProtractorFace,
    MeasurementArm: MeasurementArm,
    ProtractorUtils: ProtractorUtils,
    ProtractorElement: ProtractorElement
  };
  // Also export directly for backward compatibility
  window.ProtractorElement = ProtractorElement;
}

console.log('✅ Protractor component loaded successfully');

