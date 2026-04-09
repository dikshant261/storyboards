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
  formatAngleDisplay(angle, precision = 1, protractorType = 'semicircular') {
    // For semicircular protractors, show dual readings (e.g., "120°/60°")
    if (protractorType === 'semicircular') {
      // Normalize angle to 0-180 range
      let normalizedAngle = angle % 360;
      if (normalizedAngle < 0) normalizedAngle += 360;
      
      // Convert to 0-180 range for semicircular protractor
      let reading1, reading2;
      if (normalizedAngle <= 180) {
        reading1 = normalizedAngle;
        reading2 = 180 - normalizedAngle;
      } else {
        // Angle is > 180, convert to 0-180 range
        reading1 = 360 - normalizedAngle;
        reading2 = 180 - reading1;
      }
      
      // Format both readings
      return `${reading1.toFixed(precision)}° / ${reading2.toFixed(precision)}°`;
    }
    // For circular protractors, show single reading
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

  // Generate degree labels with dual readings (0-180 and 180-0) for semicircular protractor
  const degreeLabels = React.useMemo(() => {
    if (!showDegreeLabels) return [];
    
    const labels = [];
    const startDegree = isCircular ? 0 : 0;
    const endDegree = isCircular ? 360 : 181; // Changed to 181 to include 180°
    
    // Position labels inside the protractor, accounting for tick length and padding
    const labelPadding = 5; // Extra padding between ticks and labels
    const outerLabelRadius = radius - majorTickLengthPx - labelPadding;
    const innerLabelRadius = radius - majorTickLengthPx - labelPadding - labelFontSizePx - 10; // Inner labels closer to center
    
    for (let degree = startDegree; degree < endDegree; degree += labelInterval) {
      let angle, x, y;
      
      if (isCircular) {
        angle = (degree - 90) * (Math.PI / 180);  // Circular: start from top
        x = outerLabelRadius * Math.cos(angle);
        y = outerLabelRadius * Math.sin(angle);
        
        labels.push({
          degree,
          x,
          y,
          side: 'outer'
        });
      } else {
        // Semicircular: 0° left, 90° top, 180° right, arc on TOP
        angle = (degree) * (Math.PI / 180);
        
        // Outer labels (0-180 reading)
        const outerX = outerLabelRadius * Math.cos(angle);
        const outerY = -outerLabelRadius * Math.sin(angle); // Negative to flip upward

      labels.push({
        degree,
          x: outerX,
          y: outerY,
          side: 'outer'
        });
        
        // Inner labels (180-0 reading) - only for semicircular
        const innerDegree = 180 - degree; // Reverse the reading
        const innerX = innerLabelRadius * Math.cos(angle);
        const innerY = -innerLabelRadius * Math.sin(angle);
        
        labels.push({
          degree: innerDegree,
          x: innerX,
          y: innerY,
          side: 'inner'
        });
      }
    }
    return labels;
  }, [radius, labelInterval, isCircular, showDegreeLabels, majorTickLengthPx, labelFontSizePx]);

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
    protractorType = 'semicircular',  // Protractor type for dual reading display
    isSnapped = false,  // Whether the arm is snapped to a target (for green color)
    isRotating = false,
    onRotationStart,          // Callback when user starts rotating (via arm line)
    onArrowheadStart,         // Callback for arrowhead (can both rotate and extend)
    angleDisplaySize = 14,    // Font size for angle display (pixels)
    angleDisplayColor = null, // Color for angle display (null = use arm color)
    protractorRotation = 0,    // Rotation of the protractor body (so baseline rotates with it)
    rotationRingRadius = 125,  // Rotation ring radius (same as protractor rotation ring)
    // Blinking props
    isBlinking = false,       // Whether the arm should blink
    arrowheadColor = null,    // Color for arrowhead (null = use arm color)
    arrowheadBlinking = false, // Whether the arrowhead should blink
    // Baseline props
    showBaseline = false,
    baselineColor = '#999999',
    baselineStyle = 'dashed',
    baselineWidth = 1,
    // Clickable angle readings props
    angleReadingsClickable = false,  // Whether the two angle readings should be clickable separately
    onAngleReadingClick = null,      // Callback when a reading is clicked: (readingIndex: 0 or 1, angle: number) => void
    readingColors = null             // Object with reading0Color and reading1Color: {reading0Color: '#FF0000', reading1Color: '#00FF00'} or null
  } = props;

  // Ref for SVG container to attach touch listeners
  const svgContainerRef = React.useRef(null);

  // Process GC units for handle size
  const processGcProperty = React.useCallback((value, propertyName = 'width') => {
    // Handle if value is already a number
    if (typeof value === 'number') {
      return value;
    }
    
    // Use GridCellFontUtils if available
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      const result = GridCellFontUtils.processGcProperty(value, propertyName);
      if (typeof result === 'string') {
        const numValue = parseFloat(result.replace('px', ''));
        if (!isNaN(numValue)) return numValue;
      }
      if (typeof result === 'number') return result;
    }
    
    // Fallback: try to parse as number
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : 44; // Default to 44px if all else fails
  }, []);

  // Calculate handle size in gc units (25gc for measurement arm handle)
  const handleSizePixels = React.useMemo(() => {
    const processed = processGcProperty('25gc', 'width');
    const finalSize = !isNaN(processed) && processed > 0 ? processed : 44; // Default to 44px if conversion fails
    return finalSize;
  }, [processGcProperty]);

  const angleRad = angle * (Math.PI / 180); // Convert degrees to radians (0° = right, increases counterclockwise)
  
  // Calculate arm end position (for the visual arm line)
  const x = length * Math.cos(angleRad);
  const y = -length * Math.sin(angleRad);  // Negate Y because screen coordinates are inverted
  
  // Use the same radius as the protractor rotation ring
  const guideCircleRadius = rotationRingRadius;
  
  // Calculate handle position on the guide circle (handle moves along the circle)
  const handleX = guideCircleRadius * Math.cos(angleRad);
  const handleY = -guideCircleRadius * Math.sin(angleRad);  // Negate Y because screen coordinates are inverted

  // Determine pointer events for SVG container
  // Allow pointer events if:
  // 1. Readings are clickable, OR
  // 2. Arm is rotatable (onRotationStart or onArrowheadStart provided)
  // Otherwise, block pointer events to allow clicks to pass through
  const svgPointerEvents = (angleReadingsClickable && onAngleReadingClick) || 
                           (onRotationStart || onArrowheadStart) ? 'auto' : 'none';

  // Add non-passive touch event listeners using event delegation on SVG container
  React.useEffect(() => {
    const svgElement = svgContainerRef.current;
    if (!svgElement) {
      console.log('⚠️ [MeasurementArm] SVG element not found for touch listeners');
      return;
    }

    if (!onRotationStart && !onArrowheadStart) {
      console.log('⚠️ [MeasurementArm] No rotation handlers provided');
      return;
    }

    const handleTouchStart = (e) => {
      const target = e.target;
      if (!target) {
        console.log('⚠️ [MeasurementArm] Touch event has no target');
        return;
      }

      // Debug: log what was touched
      const targetTag = target.tagName;
      const targetDataArm = target.getAttribute?.('data-arm-line');
      const targetDataArrowhead = target.getAttribute?.('data-arrowhead');
      
      console.log('🔍 [MeasurementArm] Touch detected:', {
        tagName: targetTag,
        dataArmLine: targetDataArm,
        dataArrowhead: targetDataArrowhead,
        hasOnRotationStart: !!onRotationStart,
        hasOnArrowheadStart: !!onArrowheadStart,
        allAttributes: target.getAttributeNames ? Array.from(target.getAttributeNames()) : 'N/A'
      });

      // Check if touch is on arm line - check multiple ways
      const isArmLine = target.getAttribute && (
        target.getAttribute('data-arm-line') === 'true' ||
        (target.tagName === 'line' && target.getAttribute('data-arm-line') === 'true') ||
        (target.tagName === 'line' && target.getAttribute('stroke') === 'transparent' && parseFloat(target.getAttribute('stroke-width') || 0) > 10)
      );

      // Check if touch is on arrowhead - check multiple ways (including large touch area)
      const arrowheadRadius = target.getAttribute('r') ? parseFloat(target.getAttribute('r')) : 0;
      const isArrowhead = target.getAttribute && (
        target.getAttribute('data-arrowhead') === 'true' ||
        (target.tagName === 'circle' && target.getAttribute('data-arrowhead') === 'true') ||
        (target.tagName === 'circle' && arrowheadRadius >= 5) ||  // Visual arrowhead (r >= 5)
        (target.tagName === 'circle' && arrowheadRadius >= 25 && target.getAttribute('fill') === 'transparent')  // Large touch area (r >= 25, transparent)
      );

      console.log('🔍 [MeasurementArm] Element check:', {
        isArmLine,
        isArrowhead,
        targetTag,
        willHandleArm: isArmLine && onRotationStart,
        willHandleArrowhead: isArrowhead && (onArrowheadStart || onRotationStart)
      });

      if (isArmLine && onRotationStart) {
        e.preventDefault();
        e.stopPropagation();
        console.log('👆 [MeasurementArm] ✅ Arm line touched (delegated) - calling onRotationStart');
        // Convert touch event to mouse-like event for compatibility
        const syntheticEvent = {
          ...e,
          clientX: e.touches?.[0]?.clientX || e.clientX,
          clientY: e.touches?.[0]?.clientY || e.clientY,
          touches: e.touches,
          stopPropagation: () => e.stopPropagation(),
          preventDefault: () => e.preventDefault()
        };
        onRotationStart(syntheticEvent);
      } else if (isArrowhead && (onArrowheadStart || onRotationStart)) {
        e.preventDefault();
        e.stopPropagation();
        console.log('👆 [MeasurementArm] ✅ Arrowhead touched (delegated) - calling handler');
        // Convert touch event to mouse-like event for compatibility
        const syntheticEvent = {
          ...e,
          clientX: e.touches?.[0]?.clientX || e.clientX,
          clientY: e.touches?.[0]?.clientY || e.clientY,
          touches: e.touches,
          stopPropagation: () => e.stopPropagation(),
          preventDefault: () => e.preventDefault()
        };
        if (onArrowheadStart || onRotationStart) {
          (onArrowheadStart || onRotationStart)(syntheticEvent);
        }
      } else {
        console.log('⚠️ [MeasurementArm] Touch detected but not on arm/arrowhead or no handler');
      }
    };

    svgElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    console.log('✅ [MeasurementArm] Touch listener added to SVG container (event delegation)', {
      hasOnRotationStart: !!onRotationStart,
      hasOnArrowheadStart: !!onArrowheadStart
    });

    return () => {
      svgElement.removeEventListener('touchstart', handleTouchStart);
      console.log('🧹 [MeasurementArm] Touch listener removed');
    };
  }, [onRotationStart, onArrowheadStart]);

  return React.createElement('svg', {
    ref: svgContainerRef,
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      pointerEvents: svgPointerEvents,  // Allow clicks when arm is rotatable or readings are clickable
      zIndex: zIndex,  // Apply z-index to be above protractor body
      transform: `rotate(${protractorRotation}deg)`,  // Rotate with protractor body
      transformOrigin: 'center center',
      touchAction: 'none'  // Prevent default touch behaviors (scrolling, zooming) for better touch control
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
    
    // Invisible clickable area along the arm (thicker for easier clicking/touching)
    onRotationStart && React.createElement('line', {
      key: 'arm-clickable',
      'data-arm-line': 'true',  // Data attribute for finding element
      x1: 0,
      y1: 0,
      x2: x,
      y2: y,
      stroke: 'transparent',
      strokeWidth: 50,  // Much wider invisible area for easier touch interaction (increased from 20)
      strokeLinecap: 'round',
      style: {
        cursor: 'crosshair',
        pointerEvents: 'auto',  // This line captures clicks
        touchAction: 'none',  // Prevent default touch behaviors
        WebkitTouchCallout: 'none',  // Prevent iOS callout menu
        userSelect: 'none'  // Prevent text selection
      },
      onMouseDown: onRotationStart
      // Touch events handled via ref and non-passive listener in useEffect
    }),
    
    // Arm line (visual) - extends to handle position on guide circle
    React.createElement('line', {
      key: 'arm',
      x1: 0,
      y1: 0,
      x2: handleX,
      y2: handleY,
      stroke: color,
      strokeWidth: 3,
      strokeLinecap: 'round',
      strokeDasharray: style === 'dashed' ? '8, 4' : 'none',  // Dashed if style is 'dashed'
      opacity: isRotating ? 0.7 : (isBlinking ? undefined : 1),
      style: {
        pointerEvents: 'none',  // Visual line doesn't block clicks
        animation: isBlinking ? 'armBlink 5s ease-in-out infinite' : undefined
      }
    }),

    // Arm rotation guide ring (dashed circle showing the rotation path)
    // Same radius as the protractor rotation ring - shown when arm is rotatable
    (onArrowheadStart || onRotationStart) && React.createElement('circle', {
      key: 'arm-rotation-guide',
      cx: 0,
      cy: 0,
      r: guideCircleRadius,  // Same radius as protractor rotation ring
      fill: 'none',
      stroke: 'rgba(59, 130, 246, 0.4)',  // Light blue dashed
      strokeWidth: 2,
      strokeDasharray: '8, 6',
      style: {
        pointerEvents: 'none'
      }
    }),

    // Large invisible touch area around arrowhead for easier touch interaction
    (onArrowheadStart || onRotationStart) && React.createElement('circle', {
      key: 'arrowhead-touch-area',
      'data-arrowhead': 'true',  // Data attribute for finding element
      cx: handleX,
      cy: handleY,
      r: handleSizePixels / 2 + 8,  // Touch area slightly larger than handle (handle radius + padding)
      fill: 'transparent',
      stroke: 'transparent',
      style: {
        cursor: extendable ? 'move' : (onRotationStart ? 'grab' : 'default'),
        pointerEvents: 'auto',  // Capture touch events
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        userSelect: 'none'
      },
      onMouseDown: onArrowheadStart || onRotationStart,
      // Touch events handled via ref and non-passive listener in useEffect
    }),
    
    // Arrowhead handle at end (same size as rotation handle, styled for angle measurement)
    // Positioned on the guide circle, not at the arm end
    React.createElement('circle', {
      key: 'arrowhead',
      'data-arrowhead': 'true',  // Data attribute for finding element (also on touch area)
      cx: handleX,
      cy: handleY,
      r: handleSizePixels / 2,  // Same size as rotation handle (radius = diameter / 2)
      fill: isRotating ? 'rgba(147, 51, 234, 0.95)' : (arrowheadColor || 'rgba(139, 92, 246, 0.9)'),  // Purple/violet for angle measurement (darker when rotating)
      opacity: arrowheadBlinking ? undefined : 1, // Let animation control opacity when blinking
      style: {
        cursor: extendable ? 'move' : (onRotationStart ? (isRotating ? 'grabbing' : 'grab') : 'default'),
        pointerEvents: (onArrowheadStart || onRotationStart) ? 'auto' : 'none',
        touchAction: 'none',  // Prevent default touch behaviors (scrolling, zooming)
        WebkitTouchCallout: 'none',  // Prevent iOS callout menu
        userSelect: 'none',  // Prevent text selection
        stroke: 'white',
        strokeWidth: 3,
        filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.4))',
        transition: isRotating ? 'none' : 'fill 0.15s ease-out',
        ...(arrowheadBlinking ? {
          animation: 'armBlink 5s ease-in-out infinite',
          WebkitAnimation: 'armBlink 5s ease-in-out infinite' // Safari support
        } : {})
      },
      onMouseDown: onArrowheadStart || onRotationStart,  // Use combined handler if available
      // Touch events handled via ref and non-passive listener in useEffect
      title: extendable ? 'Drag to rotate & extend/retract arm' : 'Drag to rotate arm'
    }),

    // Angle measurement icon inside the handle (protractor/angle symbol)
    (onArrowheadStart || onRotationStart) && React.createElement('g', {
      key: 'arrowhead-icon',
      transform: `translate(${handleX}, ${handleY})`,
      style: {
        pointerEvents: 'none'
      }
    }, 
      // Angle measurement symbol (arc with degree marker)
      React.createElement('path', {
        d: 'M-8,0 A8,8 0 0,1 0,-8 L0,-4 M0,-8 A8,8 0 0,1 8,0',  // Arc from left to right with degree marker
        fill: 'none',
        stroke: 'white',
        strokeWidth: 2.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    ),

    // Angle display - positioned outside the arrowhead with background (never overlapping arrowhead)
    showAngleDisplay && (() => {
      // Calculate the two angle readings for semicircular protractors
      let reading1, reading2;
      if (protractorType === 'semicircular') {
        // Normalize angle to 0-180 range
        let normalizedAngle = angle % 360;
        if (normalizedAngle < 0) normalizedAngle += 360;
        
        // Convert to 0-180 range for semicircular protractor
        if (normalizedAngle <= 180) {
          reading1 = normalizedAngle;
          reading2 = 180 - normalizedAngle;
        } else {
          // Angle is > 180, convert to 0-180 range
          reading1 = 360 - normalizedAngle;
          reading2 = 180 - reading1;
        }
      } else {
        // For circular protractors, only one reading
        reading1 = angle;
        reading2 = null;
      }
      
      const angleText = ProtractorUtils.formatAngleDisplay(angle, anglePrecision, protractorType);
      
      // Arrowhead radius (larger if extendable)
      const arrowheadRadius = extendable ? 8 : 5;
      
      // Estimate text width (approximate: ~0.6 * fontSize per character for monospace-like fonts)
      // For dual reading like "120° / 60°", estimate ~12-15 characters
      const estimatedTextWidth = angleText.length * angleDisplaySize * 0.6;
      const textHeight = angleDisplaySize * 1.2;
      const padding = angleDisplaySize * 0.3; // Padding around text
      const rectWidth = estimatedTextWidth + padding * 2;
      const rectHeight = textHeight + padding * 2;
      
      // Calculate minimum distance from arrowhead center to text center
      // Need to account for: arrowhead radius + padding + half text background height
      const minDistanceFromArrowhead = arrowheadRadius + Math.max(rectWidth, rectHeight) / 2 + padding + 5; // Extra 5px buffer
      
      // Calculate unit vector in the direction of the arm (use handle position for angle display)
      const handleLength = Math.sqrt(handleX * handleX + handleY * handleY);
      const unitX = handleLength > 0 ? handleX / handleLength : 1;
      const unitY = handleLength > 0 ? handleY / handleLength : 0;
      
      // Position text at minimum distance from arrowhead, ensuring it never overlaps
      const textX = handleX + unitX * minDistanceFromArrowhead;
      const textY = handleY + unitY * minDistanceFromArrowhead;
      
      // Determine text color: dark green when snapped, otherwise use angleDisplayColor or arm color
      const defaultTextColor = isSnapped ? '#006600' : (angleDisplayColor || color);
      
      // Get reading colors if provided
      const reading0Color = readingColors?.reading0Color || defaultTextColor;
      const reading1Color = readingColors?.reading1Color || defaultTextColor;
      
      // If readings are clickable and we have two readings, render them separately
      if (angleReadingsClickable && reading2 !== null && onAngleReadingClick) {
        // Estimate width of each reading (approximate)
        const reading1Text = `${reading1.toFixed(anglePrecision)}°`;
        const reading2Text = `${reading2.toFixed(anglePrecision)}°`;
        const separatorText = ' / ';
        const reading1Width = reading1Text.length * angleDisplaySize * 0.6;
        const reading2Width = reading2Text.length * angleDisplaySize * 0.6;
        const separatorWidth = separatorText.length * angleDisplaySize * 0.6;
        const totalWidth = reading1Width + separatorWidth + reading2Width;
        const clickablePadding = angleDisplaySize * 0.2; // Padding for clickable area
        
        // Calculate positions for each element
        const startX = textX - totalWidth / 2;
        const reading1X = startX + reading1Width / 2;
        const separatorX = startX + reading1Width + separatorWidth / 2;
        const reading2X = startX + reading1Width + separatorWidth + reading2Width / 2;
        
        // Update background width to accommodate clickable areas
        const clickableRectWidth = totalWidth + padding * 2 + clickablePadding * 2;
        
        return [
          // Background rectangle with white 50% opacity
          // Counter-rotate to keep it parallel to screen bottom
          React.createElement('rect', {
            key: 'angle-bg',
            x: textX - clickableRectWidth / 2,
            y: textY - rectHeight / 2,
            width: clickableRectWidth,
            height: rectHeight,
            fill: 'rgba(255, 255, 255, 0.5)',  // White with 50% opacity
            rx: 4,  // Rounded corners
            ry: 4,
            transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate to keep parallel to screen bottom
            style: {
              pointerEvents: 'none',
              userSelect: 'none'
            }
          }),
          // First reading (clickable)
          React.createElement('g', {
            key: 'reading1',
            style: {
              cursor: 'pointer',
              pointerEvents: 'auto'
            },
            onClick: (e) => {
              e.stopPropagation();
              console.log(`🖱️ [MeasurementArm] Reading 1 clicked: ${reading1}°`);
              onAngleReadingClick(0, reading1);
            },
            onMouseDown: (e) => {
              e.stopPropagation();
              console.log(`🖱️ [MeasurementArm] Reading 1 mouseDown: ${reading1}°`);
              onAngleReadingClick(0, reading1);
            }
          }, [
            // Clickable background for reading 1
            React.createElement('rect', {
              key: 'reading1-bg',
              x: reading1X - reading1Width / 2 - clickablePadding,
              y: textY - rectHeight / 2,
              width: reading1Width + clickablePadding * 2,
              height: rectHeight,
              fill: 'transparent',
              transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate around text center to keep parallel to screen bottom
              style: {
                pointerEvents: 'auto',
                cursor: 'pointer'
              }
            }),
            // Reading 1 text
            React.createElement('text', {
              key: 'reading1-text',
              x: reading1X,
              y: textY,
              fill: reading0Color,
              fontSize: angleDisplaySize,
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate around text center to keep parallel to screen bottom
              style: {
                pointerEvents: 'none',
                userSelect: 'none',
                cursor: 'pointer'
              }
            }, reading1Text)
          ]),
          // Separator (not clickable)
          React.createElement('text', {
            key: 'separator',
            x: separatorX,
            y: textY,
            fill: defaultTextColor,
            fontSize: angleDisplaySize,
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate around text center to keep parallel to screen bottom
            style: {
              pointerEvents: 'none',
              userSelect: 'none'
            }
          }, separatorText),
          // Second reading (clickable)
          React.createElement('g', {
            key: 'reading2',
            style: {
              cursor: 'pointer',
              pointerEvents: 'auto'
            },
            onClick: (e) => {
              e.stopPropagation();
              console.log(`🖱️ [MeasurementArm] Reading 2 clicked: ${reading2}°`);
              onAngleReadingClick(1, reading2);
            },
            onMouseDown: (e) => {
              e.stopPropagation();
              console.log(`🖱️ [MeasurementArm] Reading 2 mouseDown: ${reading2}°`);
              onAngleReadingClick(1, reading2);
            }
          }, [
            // Clickable background for reading 2
            React.createElement('rect', {
              key: 'reading2-bg',
              x: reading2X - reading2Width / 2 - clickablePadding,
              y: textY - rectHeight / 2,
              width: reading2Width + clickablePadding * 2,
              height: rectHeight,
              fill: 'transparent',
              transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate around text center to keep parallel to screen bottom
              style: {
                pointerEvents: 'auto',
                cursor: 'pointer'
              }
            }),
            // Reading 2 text
            React.createElement('text', {
              key: 'reading2-text',
              x: reading2X,
              y: textY,
              fill: reading1Color,
              fontSize: angleDisplaySize,
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate around text center to keep parallel to screen bottom
              style: {
                pointerEvents: 'none',
                userSelect: 'none',
                cursor: 'pointer'
              }
            }, reading2Text)
          ])
        ];
      } else {
        // Non-clickable mode: render as single text element
        return [
          // Background rectangle with white 50% opacity
          // Counter-rotate to keep it parallel to screen bottom
          React.createElement('rect', {
            key: 'angle-bg',
            x: textX - rectWidth / 2,
            y: textY - rectHeight / 2,
            width: rectWidth,
            height: rectHeight,
            fill: 'rgba(255, 255, 255, 0.5)',  // White with 50% opacity
            rx: 4,  // Rounded corners
            ry: 4,
            transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate to keep parallel to screen bottom
            style: {
              pointerEvents: 'none',
              userSelect: 'none'
            }
          }),
          // Angle text
          // Counter-rotate to keep it parallel to screen bottom
          React.createElement('text', {
      key: 'angle-text',
            x: textX,
            y: textY,
            fill: defaultTextColor,  // Dark green when snapped, otherwise use configured color
      fontSize: angleDisplaySize,
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      transform: `rotate(${-protractorRotation} ${textX} ${textY})`,  // Counter-rotate to keep parallel to screen bottom
      style: {
        pointerEvents: 'none',  // Don't block clicks
        userSelect: 'none'
      }
          }, angleText)
        ];
      }
    })()
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
        size: '30gc',        // Font size in GC units
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
    opacity = 1,
    
    // Center Marker Configuration
    centerMarker = {
      show: false,
      color: '#FF9900',
      borderColor: '#FF9900',
      borderWidth: '3gc',
      size: '24gc',
      innerCircleSize: '8gc',
      animated: false
    }
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
  const [isBaselineSnappedToBC, setIsBaselineSnappedToBC] = React.useState(false); // Track if baseline is snapped to side BC
  const containerRef = React.useRef(null);
  const rotationStartRef = React.useRef({ x: 0, y: 0, angle: 0 }); // Store initial rotation state
  const step2AngleLogRef = React.useRef({ logged: false, lastStep: null }); // Track if we've logged angles for step 2
  const lastTapTimeRef = React.useRef(0); // Track last tap time for double-tap detection
  
  // Helper function to get page-specific state and step
  const getPageState = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2State || 'C';
    if (currentPage === 4) return window.page4State || 'C';
    if (currentPage === 6) return window.page6State || 'C';
    return null;
  }, [currentPage]);
  
  const getPageStep = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2Step || 1;
    if (currentPage === 4) return window.page4Step || 1;
    if (currentPage === 6) return window.page6Step || 1;
    return null;
  }, [currentPage]);
  
  const getPageProtractorFlowConfig = React.useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (currentPage === 2) return window.page2ProtractorFlowConfig;
    if (currentPage === 4) return window.page4ProtractorFlowConfig;
    if (currentPage === 6) return window.page6ProtractorFlowConfig;
    return null;
  }, [currentPage]);
  
  const getPageStateChangedEventName = React.useCallback(() => {
    if (currentPage === 2) return 'pageStateChanged';
    if (currentPage === 4) return 'page4StateChanged';
    if (currentPage === 6) return 'page6StateChanged';
    return null;
  }, [currentPage]);
  
  const getPageStepChangedEventName = React.useCallback(() => {
    if (currentPage === 2) return 'page2StepChanged';
    if (currentPage === 4) return 'page4StepChanged';
    if (currentPage === 6) return 'page6StepChanged';
    return null;
  }, [currentPage]);
  
  // Track page-specific step and state early (needed for effective values)
  const [pageStep, setPageStep] = React.useState(() => getPageStep());
  const [pageState, setPageState] = React.useState(() => getPageState());
  
  // Reset measurement arm to 0° when step is 1 on pages 2, 4, and 6
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) return;
    
    if (pageStep === 1) {
      setCurrentArmAngle(0);
      console.log(`🔄 [Protractor] Reset measurement arm to 0° (page${currentPage}Step = 1)`);
    }
  }, [currentPage, pageStep]);
  
  // Control draggability, rotatability, and arm movement based on page-specific step (defined early for callbacks)
  const effectiveIsDraggable = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4 || currentPage === 6) {
      const currentStep = pageStep || getPageStep() || 1;
      // Not draggable when step = 2, 3, or 4 - only draggable when step = 1
      return isDraggable && currentStep === 1;
    }
    return isDraggable;
  }, [currentPage, pageStep, isDraggable, getPageStep]);
  
  const effectiveIsProtractorRotatable = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4 || currentPage === 6) {
      const currentStep = pageStep || getPageStep() || 1;
      const currentState = pageState || getPageState() || 'C';
      const flowConfig = getPageProtractorFlowConfig();
      
      // Use config to determine rotatability
      if (flowConfig) {
        const stepConfig = flowConfig.helpers.getStepConfig(currentState, currentStep);
        if (stepConfig && stepConfig.protractorRotatable !== undefined) {
          console.log(`🔄 [Protractor] Rotatability from config: state=${currentState}, step=${currentStep}, rotatable=${stepConfig.protractorRotatable}`);
          return stepConfig.protractorRotatable;
        }
      }
      
      // Fallback: Not rotatable when step = 3 or 4 (legacy behavior)
      return isProtractorRotatable && currentStep !== 3 && currentStep !== 4;
    }
    return isProtractorRotatable;
  }, [currentPage, pageStep, pageState, isProtractorRotatable, getPageStep, getPageState, getPageProtractorFlowConfig]);
  
  const effectiveIsRotatable = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4 || currentPage === 6) {
      const currentStep = pageStep || getPageStep() || 1;
      const currentState = pageState || getPageState() || 'C';
      const flowConfig = getPageProtractorFlowConfig();
      
      // Check config for measurementArmRotatable
      if (flowConfig) {
        const stepConfig = flowConfig.helpers.getStepConfig(currentState, currentStep);
        if (stepConfig && stepConfig.measurementArmRotatable !== undefined) {
          return stepConfig.measurementArmRotatable;
        }
      }
      
      // Fallback: not rotatable when step = 4, otherwise use isRotatable prop
      return isRotatable && currentStep !== 4;
    }
    return isRotatable;
  }, [currentPage, pageStep, pageState, isRotatable, getPageStep, getPageState, getPageProtractorFlowConfig]);

  // Log AB and AC angles when entering step 2 in state A
  React.useEffect(() => {
    if (currentPage === 2 && page2Step === 2 && page2State === 'A' && snapPoints && snapPoints.length >= 3) {
      // Reset log flag when step changes
      if (step2AngleLogRef.current.lastStep !== page2Step) {
        step2AngleLogRef.current.logged = false;
      }
      
      // Only log once per step entry
      if (!step2AngleLogRef.current.logged) {
        const vertexA = snapPoints.find(sp => sp.vertexLabel === 'A' || sp.vertexIndex === 0);
        const vertexB = snapPoints.find(sp => sp.vertexLabel === 'B' || sp.vertexIndex === 1);
        const vertexC = snapPoints.find(sp => sp.vertexLabel === 'C' || sp.vertexIndex === 2);
        
        if (vertexA && vertexB && vertexC) {
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
          const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          
          // Convert to screen pixels
          const vertexAPx = {
            x: (vertexA.x / gridCols) * viewportWidth,
            y: (vertexA.y / gridRows) * viewportHeight
          };
          const vertexBPx = {
            x: (vertexB.x / gridCols) * viewportWidth,
            y: (vertexB.y / gridRows) * viewportHeight
          };
          const vertexCPx = {
            x: (vertexC.x / gridCols) * viewportWidth,
            y: (vertexC.y / gridRows) * viewportHeight
          };
          
          // Calculate angles (0° = right/east, increases counterclockwise)
          const abAngleAtoB = ProtractorUtils.calculateAngleToPoint(vertexAPx, vertexBPx);
          const abAngleBtoA = ProtractorUtils.calculateAngleToPoint(vertexBPx, vertexAPx);
          const acAngleAtoC = ProtractorUtils.calculateAngleToPoint(vertexAPx, vertexCPx);
          const acAngleCtoA = ProtractorUtils.calculateAngleToPoint(vertexCPx, vertexAPx);
          
          console.log(`📐 [Step 2 Entry - Side Angles] AB and AC angles with horizontal axis (0° = right/east):`);
          console.log(`   AB: A→B = ${abAngleAtoB.toFixed(1)}° | B→A = ${abAngleBtoA.toFixed(1)}°`);
          console.log(`   AC: A→C = ${acAngleAtoC.toFixed(1)}° | C→A = ${acAngleCtoA.toFixed(1)}°`);
          console.log(`   📍 Expected protractor rotation for visual alignment:`);
          console.log(`      AB should visually align when rotation = ${abAngleAtoB.toFixed(1)}° or ${abAngleBtoA.toFixed(1)}°`);
          console.log(`      AC should visually align when rotation = ${acAngleAtoC.toFixed(1)}° or ${acAngleCtoA.toFixed(1)}°`);
          
          // Mark as logged
          step2AngleLogRef.current.logged = true;
          step2AngleLogRef.current.lastStep = page2Step;
        }
      }
    }
  }, [currentPage, page2Step, page2State, snapPoints]);

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
        size: angleDisplayConfig.size || '30gc',
        color: angleDisplayConfig.color || measurementArm.color || armColor || '#FF0000'
      },
      // Clickable angle readings props
      angleReadingsClickable: measurementArm.angleReadingsClickable !== undefined ? measurementArm.angleReadingsClickable : false,
      onAngleReadingClick: measurementArm.onAngleReadingClick || null
    };
  }, [measurementArm, showArm, armLength, armColor, armAngle]);

  // Baseline configuration will be defined after page2Step is initialized

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

  // Calculate handle size in gc units (25gc for both rotation and measurement arm handles)
  const handleSizePixels = React.useMemo(() => {
    const processed = processGcProperty('25gc', 'width');
    const finalSize = !isNaN(processed) && processed > 0 ? processed : 44; // Default to 44px if conversion fails
    return finalSize;
  }, [processGcProperty]);

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
        top: `${yPercent}%`,
        x: matchingSnapPoint.x,  // Store grid coordinates for rotation logic
        y: matchingSnapPoint.y   // Store grid coordinates for rotation logic
      });
      setIsInitializedToSnapPoint(true); // Mark that we've initialized to a snap point
    }
  }, [centerPoint, snapPoints]); // Only run once on mount or when these change

  // Handle arm rotation
  const handleArmRotationStart = React.useCallback((e) => {
    if (!effectiveIsRotatable || mode === 'static') return;
    
    if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    }
    setIsRotatingArm(true);
  }, [effectiveIsRotatable, mode]);

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
    
    // Snap measurement arm to the blinking side when step === 3
    const currentPageStep = getPageStep();
    const currentPageState = getPageState();
    const flowConfig = getPageProtractorFlowConfig();
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 3 && currentPageState && snapPoints && snapPoints.length >= 3) {
      // Get measurement side from config
      const stateConfig = flowConfig ? 
        flowConfig.helpers.getStateConfig(currentPageState) : null;
      const stepConfig = flowConfig ? 
        flowConfig.helpers.getStepConfig(currentPageState, 3) : null;
      
      if (!stateConfig || !stepConfig) {
        // Fallback: use old logic for state C
        if (currentPageState === 'C') {
          const vertexA = snapPoints.find(sp => sp.vertexIndex === 0 || sp.vertexLabel === 'A');
          const vertexC = snapPoints.find(sp => sp.vertexIndex === 2 || sp.vertexLabel === 'C');
          
          if (vertexA && vertexC && currentPosition) {
            const isAtVertexC = Math.abs(currentPosition.x - vertexC.x) < 5 && 
              Math.abs(currentPosition.y - vertexC.y) < 5;
            
            if (isAtVertexC) {
              // Use existing AC snapping logic (will be replaced below)
            }
          }
        }
      } else {
        // Get measurement side from config (could be dynamic for state A)
        let measurementSide = stateConfig.measurementSide;
        
        // Handle dynamic measurement side for state A
        if (measurementSide === 'dynamic' && stateConfig.runtimeState) {
          const chosenBaseline = stateConfig.runtimeState.chosenBaselineSide;
          if (chosenBaseline === 'AB') {
            measurementSide = 'AC';
          } else if (chosenBaseline === 'AC') {
            measurementSide = 'AB';
          }
        }
        
        if (measurementSide && measurementSide !== 'dynamic') {
          // Get side indices from config
          const sideIndices = flowConfig ? 
            flowConfig.sideIndices : { "AB": 0, "BC": 1, "CA": 2 };
          const vertexIndices = flowConfig ? 
            flowConfig.vertexIndices : { "A": 0, "B": 1, "C": 2 };
          
          // Get vertices for the measurement side (e.g., "AC" -> vertex A and C)
          const vertex1Name = measurementSide[0]; // First letter
          const vertex2Name = measurementSide[1]; // Second letter
          const vertex1Index = vertexIndices[vertex1Name];
          const vertex2Index = vertexIndices[vertex2Name];
          
          const vertex1 = snapPoints.find(sp => sp.vertexIndex === vertex1Index || sp.vertexLabel === vertex1Name);
          const vertex2 = snapPoints.find(sp => sp.vertexIndex === vertex2Index || sp.vertexLabel === vertex2Name);
          
          // Get target vertex (where protractor should be)
          const targetVertexName = stateConfig.targetVertex;
          const targetVertexIndex = stateConfig.targetVertexIndex;
          const targetVertex = snapPoints.find(sp => sp.vertexIndex === targetVertexIndex || sp.vertexLabel === targetVertexName);
          
          if (vertex1 && vertex2 && targetVertex && currentPosition) {
            // Check if protractor is at target vertex (use larger tolerance for grid coordinates)
            const isAtTargetVertex = Math.abs(currentPosition.x - targetVertex.x) < 5 && 
              Math.abs(currentPosition.y - targetVertex.y) < 5;
            
            if (isAtTargetVertex) {
              // Convert coordinates to screen pixels
              const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
              const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
              const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
                GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
              const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
                GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
              
              const vertex1Px = {
                x: (vertex1.x / gridCols) * viewportWidth,
                y: (vertex1.y / gridRows) * viewportHeight
              };
              const vertex2Px = {
                x: (vertex2.x / gridCols) * viewportWidth,
                y: (vertex2.y / gridRows) * viewportHeight
              };
              const targetVertexPx = {
                x: (targetVertex.x / gridCols) * viewportWidth,
                y: (targetVertex.y / gridRows) * viewportHeight
              };
              
              // Get protractor center position in screen pixels
              const protractorCenterPx = {
                x: centerX,
                y: centerY
              };
              
              // Calculate measurement arm direction vector (from protractor center)
              // Arm angle is in protractor's local coordinate system, need to account for protractor rotation
              const armAngleRad = (finalAngle * Math.PI) / 180;
              const armDirX = Math.cos(armAngleRad);
              const armDirY = -Math.sin(armAngleRad); // Negate Y because screen Y is inverted
              
              // Rotate arm direction by protractor rotation to get screen direction
              const protractorRotationRad = currentProtractorRotation * (Math.PI / 180);
              const cosRot = Math.cos(protractorRotationRad);
              const sinRot = Math.sin(protractorRotationRad);
              const screenArmDirX = armDirX * cosRot - armDirY * sinRot;
              const screenArmDirY = armDirX * sinRot + armDirY * cosRot;
              
              // Calculate side direction vector (from target vertex to the other vertex)
              // Determine which vertex is the target and use the other one
              // For "AC" with target "A": use A→C (vertex2)
              // For "AC" with target "C": use C→A (vertex1)
              const isTargetVertex1 = (targetVertexName === vertex1Name);
              const isTargetVertex2 = (targetVertexName === vertex2Name);
              
              let sideEndPx, reverseEndPx;
              if (isTargetVertex1) {
                // Target is vertex1, so side goes from target to vertex2
                sideEndPx = vertex2Px;
                reverseEndPx = vertex1Px;
                console.log(`🔍 [Arm ${measurementSide} Detection] Target is vertex1 (${vertex1Name}), using vertex2 (${vertex2Name}) for side direction`);
              } else if (isTargetVertex2) {
                // Target is vertex2, so side goes from target to vertex1
                sideEndPx = vertex1Px;
                reverseEndPx = vertex2Px;
                console.log(`🔍 [Arm ${measurementSide} Detection] Target is vertex2 (${vertex2Name}), using vertex1 (${vertex1Name}) for side direction`);
              } else {
                // Fallback: use vertex1 (original behavior)
                sideEndPx = vertex1Px;
                reverseEndPx = vertex1Px;
                console.warn(`⚠️ [Arm ${measurementSide} Detection] Target vertex (${targetVertexName}) doesn't match vertex1 (${vertex1Name}) or vertex2 (${vertex2Name}), using fallback`);
              }
              
              const sideDirX = sideEndPx.x - targetVertexPx.x;
              const sideDirY = sideEndPx.y - targetVertexPx.y;
              const sideLength = Math.sqrt(sideDirX * sideDirX + sideDirY * sideDirY);
              
              // Skip if side length is zero (vertices are at same position)
              if (sideLength < 0.001) {
                console.warn(`⚠️ [Arm ${measurementSide} Detection] Side length is zero (${sideLength.toFixed(4)}), skipping snap detection`);
                return; // Skip this iteration
              }
              
              const sideDirXNormalized = sideDirX / sideLength;
              const sideDirYNormalized = sideDirY / sideLength;
              
              // Also check opposite direction
              const reverseDirX = reverseEndPx.x - targetVertexPx.x;
              const reverseDirY = reverseEndPx.y - targetVertexPx.y;
              const reverseLength = Math.sqrt(reverseDirX * reverseDirX + reverseDirY * reverseDirY);
              
              // Calculate reverse direction normalized (use negative of forward if reverse length is zero)
              let reverseDirXNormalized, reverseDirYNormalized;
              if (reverseLength < 0.001) {
                // Use negative of forward direction if reverse length is zero
                reverseDirXNormalized = -sideDirXNormalized;
                reverseDirYNormalized = -sideDirYNormalized;
              } else {
                reverseDirXNormalized = reverseDirX / reverseLength;
                reverseDirYNormalized = reverseDirY / reverseLength;
              }
              
              // Method 1: Check if arm direction matches side direction (dot product)
              const dotProductSide = screenArmDirX * sideDirXNormalized + screenArmDirY * sideDirYNormalized;
              const dotProductReverse = screenArmDirX * reverseDirXNormalized + screenArmDirY * reverseDirYNormalized;
              
              // Clamp dot products to valid range [-1, 1] to prevent NaN from Math.acos
              const clampedDotSide = Math.max(-1, Math.min(1, dotProductSide));
              const clampedDotReverse = Math.max(-1, Math.min(1, dotProductReverse));
              
              // Check for NaN before calculating angles
              if (isNaN(clampedDotSide) || isNaN(clampedDotReverse)) {
                console.warn(`⚠️ [Arm ${measurementSide} Detection] NaN in dot product calculation: side=${clampedDotSide}, reverse=${clampedDotReverse}, screenArmDir=(${screenArmDirX.toFixed(3)}, ${screenArmDirY.toFixed(3)}), sideDir=(${sideDirXNormalized.toFixed(3)}, ${sideDirYNormalized.toFixed(3)})`);
                return; // Skip this iteration
              }
              
              const angleBetweenSide = Math.acos(clampedDotSide) * (180 / Math.PI);
              const angleBetweenReverse = Math.acos(clampedDotReverse) * (180 / Math.PI);
              const angleDiffSide = Math.min(angleBetweenSide, 180 - angleBetweenSide);
              const angleDiffReverse = Math.min(angleBetweenReverse, 180 - angleBetweenReverse);
              const angleDiff = Math.min(angleDiffSide, angleDiffReverse);
              
              // Check for NaN in final angleDiff
              if (isNaN(angleDiff)) {
                console.warn(`⚠️ [Arm ${measurementSide} Detection] NaN in angleDiff calculation: angleBetweenSide=${angleBetweenSide}, angleBetweenReverse=${angleBetweenReverse}`);
                return; // Skip this iteration
              }
              
              // Method 2: Check distance from protractor center to line
              const dx = sideEndPx.x - targetVertexPx.x;
              const dy = sideEndPx.y - targetVertexPx.y;
              const t = ((protractorCenterPx.x - targetVertexPx.x) * dx + (protractorCenterPx.y - targetVertexPx.y) * dy) / (dx * dx + dy * dy);
              const closestPointOnSide = {
                x: targetVertexPx.x + t * dx,
                y: targetVertexPx.y + t * dy
              };
              const distanceToSide = Math.sqrt(
                Math.pow(protractorCenterPx.x - closestPointOnSide.x, 2) +
                Math.pow(protractorCenterPx.y - closestPointOnSide.y, 2)
              );
              
              // Method 3: Check if arm passes through or near the side line segment
              const armLength = 1000; // Long enough to reach the side
              const armEnd = {
                x: protractorCenterPx.x + screenArmDirX * armLength,
                y: protractorCenterPx.y + screenArmDirY * armLength
              };
              
              // Check if arm intersects side line segment (from target vertex to the other vertex)
              const intersection = lineSegmentIntersection(
                protractorCenterPx, armEnd,
                targetVertexPx, sideEndPx
              );
              
              const snapThresholdAngle = 10; // degrees
              const snapThresholdDistance = 20; // pixels
              
              const isAligned = angleDiff <= snapThresholdAngle;
              const isCloseToLine = distanceToSide <= snapThresholdDistance;
              const hasIntersection = intersection !== null;
              
              console.log(`🔍 [Arm ${measurementSide} Detection]`, {
                state: currentPageState,
                measurementSide,
                angleDiff: angleDiff.toFixed(1),
                distanceToSide: distanceToSide.toFixed(1),
                hasIntersection,
                isAligned,
                isCloseToLine,
                willSnap: isAligned || isCloseToLine || hasIntersection
              });
              
              // Snap if arm is aligned with side OR close to side line OR intersects side
              if (isAligned || isCloseToLine || hasIntersection) {
                // Calculate both possible angles (target→sideEnd and sideEnd→target) in screen coordinates
                // These are in our coordinate system (0° = right, counterclockwise)
                const targetToSideEndAngleScreen = ProtractorUtils.calculateAngleToPoint(targetVertexPx, sideEndPx);
                const sideEndToTargetAngleScreen = ProtractorUtils.calculateAngleToPoint(sideEndPx, targetVertexPx);
                
                // Convert protractor rotation from CSS (clockwise) to our system (counterclockwise)
                // CSS to our: ourAngle = (-cssRotation + 360) % 360
                const protractorRotationOur = ((-currentProtractorRotation + 360) % 360);
                
                console.log(`🔍 [Arm ${measurementSide} Angle Calc] Screen angles: A→C=${targetToSideEndAngleScreen.toFixed(1)}°, C→A=${sideEndToTargetAngleScreen.toFixed(1)}°, protractorRotation CSS=${currentProtractorRotation.toFixed(1)}°, protractorRotation Our=${protractorRotationOur.toFixed(1)}°`);
                
                // Convert screen angles to protractor's local coordinate system
                // In local coordinates, 0° = baseline direction (which is at protractorRotation in screen coords)
                // So: localAngle = screenAngle - protractorRotation (both in our coordinate system)
                const targetToSideEndAngleLocal = ((targetToSideEndAngleScreen - protractorRotationOur + 360) % 360);
                const sideEndToTargetAngleLocal = ((sideEndToTargetAngleScreen - protractorRotationOur + 360) % 360);
                
                console.log(`🔍 [Arm ${measurementSide} Angle Calc] Local angles: A→C=${targetToSideEndAngleLocal.toFixed(1)}°, C→A=${sideEndToTargetAngleLocal.toFixed(1)}°`);
                
                // Normalize current angle to 0-360
                const currentAngleNormalized = ((finalAngle % 360) + 360) % 360;
                const targetToSideEndAngleNormalized = ((targetToSideEndAngleLocal % 360) + 360) % 360;
                const sideEndToTargetAngleNormalized = ((sideEndToTargetAngleLocal % 360) + 360) % 360;
                
                // Calculate angle differences (considering both directions)
                const diffToTargetSideEnd = Math.abs(currentAngleNormalized - targetToSideEndAngleNormalized);
                const diffToSideEndTarget = Math.abs(currentAngleNormalized - sideEndToTargetAngleNormalized);
                const minDiffToTargetSideEnd = Math.min(diffToTargetSideEnd, 360 - diffToTargetSideEnd);
                const minDiffToSideEndTarget = Math.min(diffToSideEndTarget, 360 - diffToSideEndTarget);
                
                // Choose the angle that's closer to the current angle to prevent flips
                // Use local angle for setting finalAngle
                // For state A, use same direct angle approach as baseline snapping
                let targetAngle, chosenDirection;
                if (currentPageState === 'A' && measurementSide === 'AC') {
                  // For state A with AC: Use A→C directly (same as baseline uses C→A for AC baseline)
                  // Target is A, sideEnd is C, so we want A→C direction
                  targetAngle = targetToSideEndAngleLocal; // Use A→C (target→sideEnd)
                  chosenDirection = 'target→sideEnd';
                  console.log(`✅ [Arm AC] State A: Using A→C (${targetToSideEndAngleLocal.toFixed(1)}°) directly - same logic as baseline snapping`);
                } else {
                  targetAngle = minDiffToTargetSideEnd < minDiffToSideEndTarget ? targetToSideEndAngleLocal : sideEndToTargetAngleLocal;
                  chosenDirection = minDiffToTargetSideEnd < minDiffToSideEndTarget ? 'target→sideEnd' : 'sideEnd→target';
                }
                const minDiff = Math.min(minDiffToTargetSideEnd, minDiffToSideEndTarget);
                
                // Only snap if we're already reasonably close (within 45°)
                if (minDiff <= 45) {
                  // Apply snapToDegrees to ensure it snaps to the correct interval (e.g., 120° not 119°)
                  let snappedTargetAngle = targetAngle;
                  if (snapToDegrees > 0) {
                    snappedTargetAngle = ProtractorUtils.snapAngleToDegrees(targetAngle, snapToDegrees);
                  }
                  finalAngle = snappedTargetAngle;
                  // Get the name of the side end vertex for logging
                  const sideEndVertexName = isTargetVertex1 ? vertex2Name : (isTargetVertex2 ? vertex1Name : vertex1Name);
                  const directionText = chosenDirection === 'opposite' ? chosenDirection : (minDiffToTargetSideEnd < minDiffToSideEndTarget ? `${targetVertexName}→${sideEndVertexName}` : `${sideEndVertexName}→${targetVertexName}`);
                  console.log(`🎯 [Protractor] Snapped arm to side ${measurementSide}: ${finalAngle.toFixed(1)}° (chose ${directionText}, diff: ${minDiff.toFixed(1)}°, target: ${targetAngle.toFixed(1)}°, snapped: ${snappedTargetAngle.toFixed(1)}°)`);
                  
                  // Mark as snapped - will advance to step 4 on rotation end
                  if (typeof window !== 'undefined') {
                    window.armSnappedToAC = true; // Keep same flag name for compatibility
                  }
                }
              } else {
                // Not snapped
                if (typeof window !== 'undefined') {
                  window.armSnappedToAC = false;
                }
              }
            }
          }
        }
      }
    }
    
    setCurrentArmAngle(finalAngle);
    
    // Call callback if provided
    if (onAngleChange) {
      onAngleChange(finalAngle);
    }
  }, [isRotatingArm, snapToDegrees, onAngleChange, currentProtractorRotation, currentPage, snapPoints, currentPosition, getPageStep, getPageState, getPageProtractorFlowConfig]);

  const handleArmRotationEnd = React.useCallback(() => {
    setIsRotatingArm(false);
    
    // Check if arm is snapped to the measurement side after rotation ends
    const currentPageStep = getPageStep();
    const currentPageState = getPageState();
    const flowConfig = getPageProtractorFlowConfig();
    const stepEventName = getPageStepChangedEventName();
    
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 3 && currentPageState) {
      if (typeof window !== 'undefined' && window.armSnappedToAC) {
        // Get measurement side from config for logging
        const stateConfig = flowConfig ? 
          flowConfig.helpers.getStateConfig(currentPageState) : null;
        let measurementSide = stateConfig?.measurementSide || 'AC';
        
        // Handle dynamic measurement side for state A
        if (measurementSide === 'dynamic' && stateConfig?.runtimeState) {
          const chosenBaseline = stateConfig.runtimeState.chosenBaselineSide;
          if (chosenBaseline === 'AB') {
            measurementSide = 'AC';
          } else if (chosenBaseline === 'AC') {
            measurementSide = 'AB';
          }
        }
        
        // Advance to step 4 when arm is aligned with measurement side (after rotation ends)
        if (currentPageStep === 3 && stepEventName) {
          let oldStep;
          if (currentPage === 2) {
            oldStep = window.page2Step;
            window.page2Step = 4;
            console.log(`[STATE:page2Step] Changed: ${oldStep} → ${window.page2Step} (Arm aligned with side ${measurementSide} after rotation, state=${currentPageState})`);
          } else if (currentPage === 4) {
            oldStep = window.page4Step;
            window.page4Step = 4;
            console.log(`[STATE:page4Step] Changed: ${oldStep} → ${window.page4Step} (Arm aligned with side ${measurementSide} after rotation, state=${currentPageState})`);
          } else if (currentPage === 6) {
            oldStep = window.page6Step;
            window.page6Step = 4;
            console.log(`[STATE:page6Step] Changed: ${oldStep} → ${window.page6Step} (Arm aligned with side ${measurementSide} after rotation, state=${currentPageState})`);
          }
          console.log(`✅ [Protractor] Arm aligned with side ${measurementSide} - set page${currentPage}Step: ${oldStep} → 4`);
          
          const event = new CustomEvent(stepEventName, {
            detail: { step: 4, oldStep: oldStep }
          });
          window.dispatchEvent(event);
          console.log(`[STATE:page${currentPage}Step] Event dispatched:`, event.detail);
          
          // Reset snap flag
          window.armSnappedToAC = false;
        }
      }
    }
  }, [currentPage, getPageStep, getPageState, getPageProtractorFlowConfig, getPageStepChangedEventName]);

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

  // Listen for page-specific step and state changes
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) return;
    
    const checkPageStep = () => {
      const currentStep = getPageStep();
      if (currentStep !== null && currentStep !== undefined) {
        setPageStep(prevStep => {
          if (prevStep !== currentStep) {
            console.log(`[STATE:page${currentPage}Step] Changed: ${prevStep || 'undefined'} → ${currentStep} (ProtractorComponent)`);
            return currentStep;
          }
          return prevStep;
        });
      }
    };
    
    const checkPageState = () => {
      const currentState = getPageState();
      if (currentState !== null) {
        setPageState(prevState => {
          if (prevState !== currentState) {
            console.log(`[STATE:page${currentPage}State] Changed: ${prevState || 'undefined'} → ${currentState} (ProtractorComponent)`);
            return currentState;
          }
          return prevState;
        });
      }
    };
    
    checkPageStep();
    checkPageState();
    
    const interval = setInterval(() => {
      checkPageStep();
      checkPageState();
    }, 100);
    
    const stepEventName = getPageStepChangedEventName();
    const stateEventName = getPageStateChangedEventName();
    
    const handleStepChange = (event) => {
      if (event.detail && event.detail.step !== undefined) {
        setPageStep(event.detail.step);
      } else {
        checkPageStep();
      }
    };
    
    if (stepEventName) {
      window.addEventListener(stepEventName, handleStepChange);
    }
    if (stateEventName) {
      window.addEventListener(stateEventName, checkPageState);
    }
    
    return () => {
      clearInterval(interval);
      if (stepEventName) {
        window.removeEventListener(stepEventName, handleStepChange);
      }
      if (stateEventName) {
        window.removeEventListener(stateEventName, checkPageState);
      }
    };
  }, [currentPage, getPageStep, getPageState, getPageStepChangedEventName, getPageStateChangedEventName]);

  // Handle arrowhead interaction (can both rotate and extend)
  const handleArrowheadStart = React.useCallback((e) => {
    if (mode === 'static') return;
    
    if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();  // Don't trigger protractor dragging
    }
    
    // Start tracking for both rotation and extension
    const currentEffectiveRotatable = currentPage === 2 
      ? (effectiveIsRotatable || (typeof window !== 'undefined' && window.page2Step !== 4))
      : isRotatable;
    if (currentEffectiveRotatable) {
      setIsRotatingArm(true);
    }
    if (armConfig.extendable) {
      setIsExtendingArm(true);
    }
  }, [mode, isRotatable, armConfig.extendable]);

  // Handle arm extension (dragging arrowhead to change length)
  const handleArmExtensionStart = React.useCallback((e) => {
    if (!armConfig.extendable || mode === 'static') return;
    
    if (e && typeof e.stopPropagation === 'function') {
    e.stopPropagation();  // Don't trigger protractor dragging
    }
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
    if (!effectiveIsProtractorRotatable || mode === 'static') return;
    
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
  }, [effectiveIsProtractorRotatable, mode]);

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

    // NEW ROTATION MECHANISM:
    // Calculate absolute angle from protractor center to cursor position
    // This makes the rotation handle "follow" the cursor around the circle
    const dx = clientX - centerX;
    const dy = centerY - clientY; // Invert Y because screen Y is down
    
    // Calculate angle in degrees (0° = right/east, counterclockwise positive)
    let absoluteAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Normalize to 0-360
    while (absoluteAngle < 0) absoluteAngle += 360;
    while (absoluteAngle >= 360) absoluteAngle -= 360;
    
    // Apply offset from initial grab position
    // When user first clicks/touches, we store where on the ring they grabbed
    // Then we maintain that offset so the handle doesn't jump to cursor
    const start = rotationStartRef.current;
    let angle;
    
    if (!start || start.grabOffset === undefined) {
      // First move - calculate the offset between cursor angle and current rotation
      // Convert current CSS rotation back to our coordinate system for offset calculation
      const currentAngleInOurSystem = (-currentProtractorRotation + 360) % 360;
      const grabOffset = absoluteAngle - currentAngleInOurSystem;
      
      // Store the offset
      rotationStartRef.current = {
        ...start,
        grabOffset: grabOffset,
        centerX: centerX,
        centerY: centerY
      };
      
      // Use current rotation (no change on first move)
      angle = currentAngleInOurSystem;
    } else {
      // Apply the stored offset to get the actual rotation angle
      angle = absoluteAngle - start.grabOffset;
      
      // Normalize to 0-360
      while (angle < 0) angle += 360;
      while (angle >= 360) angle -= 360;
    }

    // Snap baseline to target side when step === 2 (using config)
    // Note: angle is in our coordinate system (0°=right, counterclockwise) for snapping detection
    let snappedToSide = false; // Track if snapping occurred (angle will be in CSS format if true)
    const currentPageStep = getPageStep();
    const currentPageState = getPageState();
    const flowConfig = getPageProtractorFlowConfig();
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 2 && currentPageState && snapPoints && snapPoints.length >= 3) {
      // Get config for current state
      let targetVertex = null;
      let baselineSidesToCheck = []; // Array of sides to check (for state A, can be both AB and AC)
      
      if (flowConfig) {
        const stateConfig = flowConfig.states[currentPageState];
        if (stateConfig) {
          targetVertex = stateConfig.targetVertex;
          
          // Check for baselineSides (array) or baselineSide (single string)
          if (stateConfig.baselineSides && Array.isArray(stateConfig.baselineSides)) {
            // Multiple baseline sides (legacy support for dynamic state A)
            if (stateConfig.baselineSides.length > 1) {
              const chosenBaseline = stateConfig.runtimeState?.chosenBaselineSide;
              if (chosenBaseline) {
                // Baseline already chosen, only check that one
                baselineSidesToCheck = [chosenBaseline];
              } else {
                // No baseline chosen yet, check both
                baselineSidesToCheck = stateConfig.baselineSides;
              }
            } else {
              // Single baseline side in array format
              baselineSidesToCheck = stateConfig.baselineSides;
            }
          } else if (stateConfig.baselineSide) {
            // Single baseline side (for states A, C, and B)
            baselineSidesToCheck = [stateConfig.baselineSide];
          } else {
            // Fallback
            baselineSidesToCheck = ['BC'];
          }
        }
      }
      
      if (!targetVertex || baselineSidesToCheck.length === 0) {
        // Fallback to old behavior for state C
        targetVertex = 'C';
        baselineSidesToCheck = ['BC'];
      }
      
      // Get target vertex from snap points
      const targetVertexPoint = snapPoints.find(sp => 
        sp.vertexLabel === targetVertex || 
        (targetVertex === 'A' && sp.vertexIndex === 0) ||
        (targetVertex === 'B' && sp.vertexIndex === 1) ||
        (targetVertex === 'C' && sp.vertexIndex === 2)
      );
      
      if (!targetVertexPoint || !currentPosition) return;
      
      // Check if protractor is at target vertex (use larger tolerance for grid coordinates)
      const isAtTargetVertex = Math.abs(currentPosition.x - targetVertexPoint.x) < 5 && 
        Math.abs(currentPosition.y - targetVertexPoint.y) < 5;
      
      if (!isAtTargetVertex) return;
      
      // Get the two vertices that form the baseline side
      const sideVertexMap = {
        'AB': { v1: 'A', v2: 'B', v1Index: 0, v2Index: 1 },
        'BA': { v1: 'B', v2: 'A', v1Index: 1, v2Index: 0 },
        'BC': { v1: 'B', v2: 'C', v1Index: 1, v2Index: 2 },
        'CB': { v1: 'C', v2: 'B', v1Index: 2, v2Index: 1 },
        'CA': { v1: 'C', v2: 'A', v1Index: 2, v2Index: 0 },
        'AC': { v1: 'A', v2: 'C', v1Index: 0, v2Index: 2 }
      };
      
      // Convert coordinates to screen pixels (do this once, reuse for all sides)
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      
      // Get protractor center position in screen pixels
      const protractorCenterPx = {
        x: centerX,
        y: centerY
      };
      
      // Calculate and log angles for AB and AC when in step 2 (only once per step entry)
      if (currentPageState === 'A' && (!step2AngleLogRef.current.logged || step2AngleLogRef.current.lastStep !== currentPageStep)) {
        const vertexA = snapPoints.find(sp => sp.vertexLabel === 'A' || sp.vertexIndex === 0);
        const vertexB = snapPoints.find(sp => sp.vertexLabel === 'B' || sp.vertexIndex === 1);
        const vertexC = snapPoints.find(sp => sp.vertexLabel === 'C' || sp.vertexIndex === 2);
        
        if (vertexA && vertexB && vertexC) {
          // Convert to screen pixels
          const vertexAPx = {
            x: (vertexA.x / gridCols) * viewportWidth,
            y: (vertexA.y / gridRows) * viewportHeight
          };
          const vertexBPx = {
            x: (vertexB.x / gridCols) * viewportWidth,
            y: (vertexB.y / gridRows) * viewportHeight
          };
          const vertexCPx = {
            x: (vertexC.x / gridCols) * viewportWidth,
            y: (vertexC.y / gridRows) * viewportHeight
          };
          
          // Calculate angles (0° = right/east, increases counterclockwise)
          const abAngleAtoB = ProtractorUtils.calculateAngleToPoint(vertexAPx, vertexBPx);
          const abAngleBtoA = ProtractorUtils.calculateAngleToPoint(vertexBPx, vertexAPx);
          const acAngleAtoC = ProtractorUtils.calculateAngleToPoint(vertexAPx, vertexCPx);
          const acAngleCtoA = ProtractorUtils.calculateAngleToPoint(vertexCPx, vertexAPx);
          
          console.log(`📐 [Step 2 - Side Angles] AB and AC angles with horizontal axis (0° = right/east):`);
          console.log(`   AB: A→B = ${abAngleAtoB.toFixed(1)}° | B→A = ${abAngleBtoA.toFixed(1)}°`);
          console.log(`   AC: A→C = ${acAngleAtoC.toFixed(1)}° | C→A = ${acAngleCtoA.toFixed(1)}°`);
          console.log(`   📍 Expected protractor rotation for visual alignment:`);
          console.log(`      AB should visually align when rotation = ${abAngleAtoB.toFixed(1)}° or ${abAngleBtoA.toFixed(1)}°`);
          console.log(`      AC should visually align when rotation = ${acAngleAtoC.toFixed(1)}° or ${acAngleCtoA.toFixed(1)}°`);
          
          // Mark as logged for this step
          step2AngleLogRef.current.logged = true;
          step2AngleLogRef.current.lastStep = currentPageStep;
        }
      }
      
      // Reset log flag when step changes
      if (step2AngleLogRef.current.lastStep !== null && step2AngleLogRef.current.lastStep !== currentPageStep) {
        step2AngleLogRef.current.logged = false;
      }
      
      // Calculate baseline direction vector (from protractor center)
      // Baseline is at 0° in protractor's coordinate system, but we need to account for protractor rotation
      const baselineAngleRad = (angle * Math.PI) / 180;
      const baselineDirX = Math.cos(baselineAngleRad);
      const baselineDirY = -Math.sin(baselineAngleRad); // Negate Y because screen Y is inverted
      
      // Try each baseline side
      let snappedBaselineSide = null;
      
      // Use the baseline sides from config directly (no filtering needed)
      const filteredBaselineSides = baselineSidesToCheck;
      
      // For state A, calculate AB angle for comparison
      let abAngleDiff = Infinity;
      let abAngle = null;
      let abV1ToV2Angle = null;
      let abV2ToV1Angle = null;
      if (currentPageState === 'A' && targetVertex === 'A') {
        const abSideInfo = sideVertexMap['AB'];
        if (abSideInfo) {
          const abVertex1 = snapPoints.find(sp => 
            sp.vertexLabel === abSideInfo.v1 || sp.vertexIndex === abSideInfo.v1Index
          );
          const abVertex2 = snapPoints.find(sp => 
            sp.vertexLabel === abSideInfo.v2 || sp.vertexIndex === abSideInfo.v2Index
          );
          if (abVertex1 && abVertex2) {
            const abVertex1Px = {
              x: (abVertex1.x / gridCols) * viewportWidth,
              y: (abVertex1.y / gridRows) * viewportHeight
            };
            const abVertex2Px = {
              x: (abVertex2.x / gridCols) * viewportWidth,
              y: (abVertex2.y / gridRows) * viewportHeight
            };
            abV1ToV2Angle = ProtractorUtils.calculateAngleToPoint(abVertex1Px, abVertex2Px);
            abV2ToV1Angle = ProtractorUtils.calculateAngleToPoint(abVertex2Px, abVertex1Px);
            const currentAngleNormalized = ((angle % 360) + 360) % 360;
            const abV1ToV2AngleNormalized = ((abV1ToV2Angle % 360) + 360) % 360;
            const abV2ToV1AngleNormalized = ((abV2ToV1Angle % 360) + 360) % 360;
            const abDiff1 = Math.abs(currentAngleNormalized - abV1ToV2AngleNormalized);
            const abDiff2 = Math.abs(currentAngleNormalized - abV2ToV1AngleNormalized);
            abAngleDiff = Math.min(
              Math.min(abDiff1, 360 - abDiff1),
              Math.min(abDiff2, 360 - abDiff2)
            );
            abAngle = abDiff1 < abDiff2 ? abV1ToV2Angle : abV2ToV1Angle;
            console.log(`🔍 [State A] AB angles: A→B=${abV1ToV2Angle.toFixed(1)}°, B→A=${abV2ToV1Angle.toFixed(1)}°, current=${currentAngleNormalized.toFixed(1)}°, diff=${abAngleDiff.toFixed(1)}°`);
          }
        }
      }
      
      console.log(`🔍 [Protractor] State: ${currentPageState}, Step: ${currentPageStep}, Checking sides:`, filteredBaselineSides);
      if (currentPageState === 'A') {
        console.log(`🔍 [State A] AB angle diff: ${abAngleDiff.toFixed(1)}°`);
      }
      
      for (const baselineSide of filteredBaselineSides) {
        if (!baselineSide) continue;
        
        // No longer skipping AB for state A - config determines which side to snap to
        
        const sideInfo = sideVertexMap[baselineSide];
        if (!sideInfo) continue;
        
        const vertex1 = snapPoints.find(sp => 
          sp.vertexLabel === sideInfo.v1 || sp.vertexIndex === sideInfo.v1Index
        );
        const vertex2 = snapPoints.find(sp => 
          sp.vertexLabel === sideInfo.v2 || sp.vertexIndex === sideInfo.v2Index
        );
        
        if (!vertex1 || !vertex2) continue;
        
        // Convert vertex coordinates to screen pixels
        const vertex1Px = {
          x: (vertex1.x / gridCols) * viewportWidth,
          y: (vertex1.y / gridRows) * viewportHeight
        };
        const vertex2Px = {
          x: (vertex2.x / gridCols) * viewportWidth,
          y: (vertex2.y / gridRows) * viewportHeight
        };
        
        // Calculate target side direction vector (from vertex1 to vertex2)
        const sideDirX = vertex2Px.x - vertex1Px.x;
        const sideDirY = vertex2Px.y - vertex1Px.y;
        const sideLength = Math.sqrt(sideDirX * sideDirX + sideDirY * sideDirY);
        const sideDirXNormalized = sideDirX / sideLength;
        const sideDirYNormalized = sideDirY / sideLength;
        
        // Method 1: Check if baseline direction matches target side direction (dot product)
        const dotProduct = baselineDirX * sideDirXNormalized + baselineDirY * sideDirYNormalized;
        const angleBetween = Math.acos(Math.max(-1, Math.min(1, dotProduct))) * (180 / Math.PI);
        const angleDiff = Math.min(angleBetween, 180 - angleBetween); // Handle 180° ambiguity
        
        // Method 2: Check distance from protractor center to target side line
        // Line: from vertex1Px to vertex2Px
        // Distance from point (protractorCenterPx) to line segment
        const dx = vertex2Px.x - vertex1Px.x;
        const dy = vertex2Px.y - vertex1Px.y;
        const t = ((protractorCenterPx.x - vertex1Px.x) * dx + (protractorCenterPx.y - vertex1Px.y) * dy) / (dx * dx + dy * dy);
        const closestPointOnSide = {
          x: vertex1Px.x + t * dx,
          y: vertex1Px.y + t * dy
        };
        const distanceToSide = Math.sqrt(
          Math.pow(protractorCenterPx.x - closestPointOnSide.x, 2) +
          Math.pow(protractorCenterPx.y - closestPointOnSide.y, 2)
        );
        
        // Method 3: Check if baseline passes through or near the target side line segment
        // Extend baseline from protractor center and check if it intersects the side
        const baselineLength = 1000; // Long enough to reach the side
        const baselineEnd = {
          x: protractorCenterPx.x + baselineDirX * baselineLength,
          y: protractorCenterPx.y + baselineDirY * baselineLength
        };
        
        // Check if baseline intersects target side line segment
        const intersection = lineSegmentIntersection(
          protractorCenterPx, baselineEnd,
          vertex1Px, vertex2Px
        );
        
        const snapThresholdAngle = 10; // degrees
        const snapThresholdDistance = 20; // pixels - how close baseline needs to be to target side line
        
        const isAligned = angleDiff <= snapThresholdAngle;
        const isCloseToLine = distanceToSide <= snapThresholdDistance;
        const hasIntersection = intersection !== null;
        
        console.log(`🔍 [Baseline Detection]`, {
          state: page2State,
          targetVertex: targetVertex,
          baselineSide: baselineSide,
          angleDiff: angleDiff.toFixed(1),
          distanceToSide: distanceToSide.toFixed(1),
          hasIntersection,
          isAligned,
          isCloseToLine,
          willSnap: isAligned || isCloseToLine || hasIntersection
        });
        
        // Snap if baseline is aligned with target side OR close to side line OR intersects side
        if (isAligned || isCloseToLine || hasIntersection) {
            // Protractors are side-agnostic (0-180 and 180-0 are equivalent)
            // Calculate both possible angles (vertex1 to vertex2 and vertex2 to vertex1, which differ by 180°)
            const v1ToV2Angle = ProtractorUtils.calculateAngleToPoint(vertex1Px, vertex2Px);
            const v2ToV1Angle = ProtractorUtils.calculateAngleToPoint(vertex2Px, vertex1Px);
            
            // Normalize current angle to 0-360
            const currentAngleNormalized = ((angle % 360) + 360) % 360;
            const v1ToV2AngleNormalized = ((v1ToV2Angle % 360) + 360) % 360;
            const v2ToV1AngleNormalized = ((v2ToV1Angle % 360) + 360) % 360;
            
            // For state A, log angles for debugging
            if (page2State === 'A' && (baselineSide === 'AB' || baselineSide === 'AC')) {
              console.log(`🔍 [State A] ${baselineSide} angles: ${sideInfo.v1}→${sideInfo.v2}=${v1ToV2Angle.toFixed(1)}°, ${sideInfo.v2}→${sideInfo.v1}=${v2ToV1Angle.toFixed(1)}°, current=${currentAngleNormalized.toFixed(1)}°`);
            }
            
            // Calculate angle differences (considering both directions)
            const diffToV1V2 = Math.abs(currentAngleNormalized - v1ToV2AngleNormalized);
            const diffToV2V1 = Math.abs(currentAngleNormalized - v2ToV1AngleNormalized);
            const minDiffToV1V2 = Math.min(diffToV1V2, 360 - diffToV1V2);
            const minDiffToV2V1 = Math.min(diffToV2V1, 360 - diffToV2V1);
            
            // For state A with AB baseline, no rejection needed - we want to snap to AB
            // (Previous logic was for AC baseline which needed to reject if AB was closer)
            
            // Determine which angle to use based on protractor orientation requirements from config
            let targetAngle = null;
            let minDiff = Infinity;
            let chosenDirection = null;
            
            // Get orientation configuration from config
            let requiredOrientation = null;
            if (flowConfig) {
              const stateConfig = flowConfig.states[currentPageState];
              if (stateConfig && stateConfig.baselineOrientations) {
                const orientationConfig = stateConfig.baselineOrientations[baselineSide];
                if (orientationConfig) {
                  requiredOrientation = orientationConfig.requiredOrientation;
                }
              }
            }
            
            // Calculate baseline angles for both directions
            const baselineAngleV1V2 = ((v1ToV2AngleNormalized % 360) + 360) % 360;
            const baselineAngleV2V1 = ((v2ToV1AngleNormalized % 360) + 360) % 360;
            
            // Determine which orientation (0 or 1) each direction represents based on geometry
            // For states C and B: orientation is based on baseline being horizontal with top facing top
            // For state A: use protractor position as tie-breaker (dot product approach)
            let orientationV1V2 = null;
            let orientationV2V1 = null;
            
            if (currentPageState === 'C' || currentPageState === 'B') {
              // For C and B: orientation 0 = baseline horizontal (0° or 180°) with top facing top
              // Check which direction results in horizontal baseline
              const isHorizontalV1V2 = (baselineAngleV1V2 <= 10 || baselineAngleV1V2 >= 350 || 
                                       (baselineAngleV1V2 >= 170 && baselineAngleV1V2 <= 190));
              const isHorizontalV2V1 = (baselineAngleV2V1 <= 10 || baselineAngleV2V1 >= 350 || 
                                       (baselineAngleV2V1 >= 170 && baselineAngleV2V1 <= 190));
              
              // Assign orientations: whichever is horizontal gets orientation 0
              if (isHorizontalV1V2) orientationV1V2 = 0;
              if (isHorizontalV2V1) orientationV2V1 = 0;
              // The other direction gets orientation 1
              if (orientationV1V2 === null) orientationV1V2 = 1;
              if (orientationV2V1 === null) orientationV2V1 = 1;
            } else if (currentPageState === 'A') {
              // For state A: Use protractor position as tie-breaker (dot product approach)
              // This resolves the 180° ambiguity by choosing the direction that points toward
              // where the protractor is placed relative to the vertex
              
              // Get the target vertex position (vertex A for state A)
              const targetVertexPx = {
                x: (targetVertexPoint.x / gridCols) * viewportWidth,
                y: (targetVertexPoint.y / gridRows) * viewportHeight
              };
              
              // Unit direction vectors for both directions of the line
              const unitV1V2 = {
                x: Math.cos(v1ToV2AngleNormalized * Math.PI / 180),
                y: -Math.sin(v1ToV2AngleNormalized * Math.PI / 180) // Negate Y for screen coords
              };
              const unitV2V1 = {
                x: Math.cos(v2ToV1AngleNormalized * Math.PI / 180),
                y: -Math.sin(v2ToV1AngleNormalized * Math.PI / 180)
              };
              
              // Vector from vertex to protractor center
              const vertexToProtractor = {
                x: protractorCenterPx.x - targetVertexPx.x,
                y: protractorCenterPx.y - targetVertexPx.y
              };
              
              // Dot product: positive means direction points toward protractor side
              const dotV1V2 = vertexToProtractor.x * unitV1V2.x + vertexToProtractor.y * unitV1V2.y;
              const dotV2V1 = vertexToProtractor.x * unitV2V1.x + vertexToProtractor.y * unitV2V1.y;
              
              // The direction with positive dot product points toward the protractor
              // Assign orientation based on which direction the protractor is on
              // For AB: requiredOrientation 1 = arc on right (protractor on right side)
              // For AC: requiredOrientation 0 = arc on left (protractor on left side)
              
              // Orientation is determined by which side of the line the protractor is on
              // Use the sign of the dot product to determine this
              // Positive dot = protractor is in the direction of that vector = that's the "outward" direction
              
              // For AB (going right): if protractor is on right, dotV1V2 > 0 → orientation 1
              // For AC (going left): if protractor is on left, dotV1V2 > 0 → orientation 0
              
              // Simpler: whichever direction has positive dot product gets assigned based on the side
              if (baselineSide === 'AB' || baselineSide === 'BA') {
                // AB: orientation 1 = baseline pointing right with arc on right
                orientationV1V2 = dotV1V2 > 0 ? 1 : 0;
                orientationV2V1 = dotV2V1 > 0 ? 1 : 0;
              } else if (baselineSide === 'AC' || baselineSide === 'CA') {
                // AC: orientation 0 = baseline pointing left with arc on left
                orientationV1V2 = dotV1V2 > 0 ? 0 : 1;
                orientationV2V1 = dotV2V1 > 0 ? 0 : 1;
              }
              
              console.log(`🔍 [State A Orientation - Dot Product] Side: ${baselineSide}`, {
                vertexToProtractor,
                unitV1V2,
                unitV2V1,
                dotV1V2: dotV1V2.toFixed(2),
                dotV2V1: dotV2V1.toFixed(2),
                orientationV1V2,
                orientationV2V1,
                requiredOrientation
              });
            }
            
            // Check orientation requirements
            let orientationCheck = false;
            
            if (requiredOrientation !== null && orientationV1V2 !== null && orientationV2V1 !== null) {
              // Check if the required orientation matches either direction
              const v1V2Matches = (requiredOrientation === orientationV1V2 && minDiffToV1V2 <= 45);
              const v2V1Matches = (requiredOrientation === orientationV2V1 && minDiffToV2V1 <= 45);
              
              // For state A, log debug info
              if (currentPageState === 'A' && (baselineSide === 'AB' || baselineSide === 'AC')) {
                console.log(`🔍 [State A ${baselineSide} Debug] Checking directions: ${sideInfo.v1}→${sideInfo.v2}=${v1ToV2Angle.toFixed(1)}° (orientation ${orientationV1V2}), ${sideInfo.v2}→${sideInfo.v1}=${v2ToV1Angle.toFixed(1)}° (orientation ${orientationV2V1}), required=${requiredOrientation}`);
                console.log(`🔍 [State A ${baselineSide} Debug] Current angle: ${currentAngleNormalized.toFixed(1)}°, diff to ${sideInfo.v1}→${sideInfo.v2}: ${minDiffToV1V2.toFixed(1)}°, diff to ${sideInfo.v2}→${sideInfo.v1}: ${minDiffToV2V1.toFixed(1)}°`);
              }
              
              // For state A: Protractor rotation should equal the angle the line makes with the horizontal axis
              // AC: A→C = 300.2° or C→A = 120.2° (both represent the same line)
              // AB: A→B = 239.8° or B→A = 59.8° (both represent the same line)
              // Use the direction that matches the orientation requirement
              if (currentPageState === 'A') {
                if (baselineSide === 'AC') {
                  // For AC: Use C→A (120.2°) - matches orientation 0 requirement
                  targetAngle = v2ToV1Angle; // Use C→A (120.2°)
                  minDiff = minDiffToV2V1;
                  chosenDirection = `${sideInfo.v2}→${sideInfo.v1}`;
                  orientationCheck = true;
                  console.log(`✅ [Protractor] State A AC: Using C→A (${v2ToV1Angle.toFixed(1)}°) - direct angle match`);
                } else if (baselineSide === 'AB') {
                  // For AB: Use A→B (239.8°) directly - protractor rotation equals the angle the line makes with horizontal
                  targetAngle = v1ToV2Angle; // Use A→B (239.8°)
                  minDiff = minDiffToV1V2;
                  chosenDirection = `${sideInfo.v1}→${sideInfo.v2}`;
                  orientationCheck = true;
                  console.log(`✅ [Protractor] State A AB: Using A→B (${v1ToV2Angle.toFixed(1)}°) - direct angle match`);
                } else {
                  // Fallback to standard logic for other sides
                  if (v1V2Matches && (!v2V1Matches || minDiffToV1V2 < minDiffToV2V1)) {
                    targetAngle = v1ToV2Angle;
                    minDiff = minDiffToV1V2;
                    chosenDirection = `${sideInfo.v1}→${sideInfo.v2}`;
                    orientationCheck = true;
                    console.log(`✅ [Protractor] Orientation match for ${baselineSide}: v1→v2 (orientation ${orientationV1V2}, required ${requiredOrientation})`);
                  } else if (v2V1Matches && (!v1V2Matches || minDiffToV2V1 < minDiffToV1V2)) {
                    targetAngle = v2ToV1Angle;
                    minDiff = minDiffToV2V1;
                    chosenDirection = `${sideInfo.v2}→${sideInfo.v1}`;
                    orientationCheck = true;
                    console.log(`✅ [Protractor] Orientation match for ${baselineSide}: v2→v1 (orientation ${orientationV2V1}, required ${requiredOrientation})`);
                  } else {
                    orientationCheck = false;
                    console.log(`❌ [Protractor] Baseline aligned with ${baselineSide} but orientation incorrect (required: ${requiredOrientation}, v1→v2: ${orientationV1V2}, v2→v1: ${orientationV2V1})`);
                  }
                }
              } else {
                // For other states, use normal logic
                if (v1V2Matches && (!v2V1Matches || minDiffToV1V2 < minDiffToV2V1)) {
                  targetAngle = v1ToV2Angle;
                  minDiff = minDiffToV1V2;
                  chosenDirection = `${sideInfo.v1}→${sideInfo.v2}`;
                  orientationCheck = true;
                  console.log(`✅ [Protractor] Orientation match for ${baselineSide}: v1→v2 (orientation ${orientationV1V2}, required ${requiredOrientation})`);
                } else if (v2V1Matches && (!v1V2Matches || minDiffToV2V1 < minDiffToV1V2)) {
                  targetAngle = v2ToV1Angle;
                  minDiff = minDiffToV2V1;
                  chosenDirection = `${sideInfo.v2}→${sideInfo.v1}`;
                  orientationCheck = true;
                  console.log(`✅ [Protractor] Orientation match for ${baselineSide}: v2→v1 (orientation ${orientationV2V1}, required ${requiredOrientation})`);
                } else {
                  // Required orientation doesn't match, don't snap
                  orientationCheck = false;
                  console.log(`❌ [Protractor] Baseline aligned with ${baselineSide} but orientation incorrect (required: ${requiredOrientation}, v1→v2: ${orientationV1V2}, v2→v1: ${orientationV2V1}, v1V2Matches: ${v1V2Matches}, v2V1Matches: ${v2V1Matches})`);
                }
              }
            } else {
              // No orientation config or couldn't determine orientations, use closest angle (fallback)
              if (minDiffToV1V2 < minDiffToV2V1) {
                targetAngle = v1ToV2Angle;
                minDiff = minDiffToV1V2;
                chosenDirection = `${sideInfo.v1}→${sideInfo.v2}`;
                orientationCheck = true; // Allow snap if no config
              } else {
                targetAngle = v2ToV1Angle;
                minDiff = minDiffToV2V1;
                chosenDirection = `${sideInfo.v2}→${sideInfo.v1}`;
                orientationCheck = true; // Allow snap if no config
              }
            }
            
            // Fallback: if orientation check failed, use closest angle (old behavior)
            if (!targetAngle) {
              targetAngle = minDiffToV1V2 < minDiffToV2V1 ? v1ToV2Angle : v2ToV1Angle;
              minDiff = Math.min(minDiffToV1V2, minDiffToV2V1);
              chosenDirection = minDiffToV1V2 < minDiffToV2V1 ? `${sideInfo.v1}→${sideInfo.v2}` : `${sideInfo.v2}→${sideInfo.v1}`;
            }
            
          // Only snap if we're already reasonably close (within 45°) AND orientation check passed
          if (minDiff <= 45 && orientationCheck) {
            // For state A with AB baseline, no additional verification needed
            // (Previous logic was for AC baseline which needed to verify it wasn't snapping to AB)
            if (currentPageState === 'A' && baselineSide === 'AB') {
              console.log(`✅ [State A] Snapping to AB baseline with angle ${targetAngle.toFixed(1)}°`);
            }
            // Convert from our coordinate system (0°=right, counterclockwise) to CSS rotate (clockwise)
            // CSS rotate() rotates clockwise, so we need to negate our counterclockwise angle
            // Our 239.8° (counterclockwise from right) = CSS -239.8° = 120.2° (clockwise from right)
            const cssRotation = (-targetAngle + 360) % 360; // Negate and normalize to 0-360
            angle = cssRotation;
            console.log(`🎯 [Protractor] Snapped baseline to side ${baselineSide}: ${targetAngle.toFixed(1)}° (our system) → ${cssRotation.toFixed(1)}° (CSS rotate) (chose ${chosenDirection}, diff: ${minDiff.toFixed(1)}°, orientation: ${orientationCheck ? 'OK' : 'FAIL'})`);
            console.log(`🔍 [Protractor Rotation] Setting protractor rotation to ${cssRotation.toFixed(1)}° (CSS) for baseline alignment with ${baselineSide}`);
            // Mark as snapped - detection will happen on rotation end
            setIsBaselineSnappedToBC(true);
            snappedToSide = true;
            snappedBaselineSide = baselineSide;
            
            break; // Found a match, stop checking other sides
          } else {
            // Too far from target or orientation doesn't match for this side, continue checking other sides
            if (minDiff > 45) {
              console.log(`📐 [Protractor] Baseline too far from ${baselineSide} (diff: ${minDiff.toFixed(1)}°)`);
            } else if (!orientationCheck) {
              console.log(`📐 [Protractor] Baseline aligned with ${baselineSide} but orientation incorrect`);
            }
          }
        } else {
          // Not aligned with this side, continue checking other sides
          console.log(`📐 [Protractor] Baseline not aligned with ${baselineSide} (angleDiff: ${angleDiff.toFixed(1)}°, distance: ${distanceToSide.toFixed(1)})`);
        }
      }
      
      // If no side was snapped to, reset the state
      if (!snappedToSide) {
        setIsBaselineSnappedToBC(false);
      }
    }
    
    // Convert from our coordinate system to CSS format before setting state
    // If snapping occurred, angle is already in CSS format; otherwise convert it
    const cssRotation = snappedToSide ? angle : (-angle + 360) % 360;
    
    // Update the start angle for smooth continuation (store in CSS format to match state)
    if (rotationStartRef.current && rotationStartRef.current.x && rotationStartRef.current.y) {
      rotationStartRef.current.angle = cssRotation;
      rotationStartRef.current.x = clientX;
      rotationStartRef.current.y = clientY;
      rotationStartRef.current.centerX = centerX;
      rotationStartRef.current.centerY = centerY;
    }

    setCurrentProtractorRotation(cssRotation);
    
    // Call callback if provided (pass CSS format)
    if (onProtractorRotate) {
      onProtractorRotate(cssRotation);
    }
  }, [isRotatingProtractor, onProtractorRotate, currentPage, snapPoints, currentPosition, getPageStep, getPageState, getPageProtractorFlowConfig]);
  
  // Helper function to check if two line segments intersect
  const lineSegmentIntersection = (p1, p2, p3, p4) => {
    // Line 1: p1 to p2
    // Line 2: p3 to p4
    const denom = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    
    if (Math.abs(denom) < 0.0001) {
      // Lines are parallel
      return null;
    }
    
    const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denom;
    const u = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / denom;
    
    // Check if intersection is within both line segments
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };
    }
    
    return null;
  };
  
  // Note: Baseline alignment detection and step advancement now happens only during rotation
  // in handleProtractorRotationMove, not automatically via useEffect

  const handleProtractorRotationEnd = React.useCallback(() => {
    setIsRotatingProtractor(false);
    
    // Check if baseline is snapped to target side after rotation ends (using config)
    // Also check alignment even if isBaselineSnappedToBC wasn't set during rotation (for manual rotation)
    const currentPageStep = getPageStep();
    const currentPageState = getPageState();
    const flowConfig = getPageProtractorFlowConfig();
    const stepEventName = getPageStepChangedEventName();
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 2 && currentPageState && (isBaselineSnappedToBC || true)) {
      // Re-check alignment to catch cases where user manually rotated to correct angle
      let isAligned = isBaselineSnappedToBC;
      
      if (!isAligned && snapPoints && snapPoints.length >= 3) {
        // Check alignment with current rotation
        if (flowConfig) {
          const stateConfig = flowConfig.states[currentPageState];
          if (stateConfig) {
            const baselineSide = stateConfig.baselineSide || (stateConfig.baselineSides && stateConfig.baselineSides[0]);
            const targetVertex = stateConfig.targetVertex;
            
            if (baselineSide && targetVertex && currentPosition) {
              // Get target vertex
              const targetVertexPoint = snapPoints.find(sp => 
                sp.vertexLabel === targetVertex || 
                (targetVertex === 'A' && sp.vertexIndex === 0) ||
                (targetVertex === 'B' && sp.vertexIndex === 1) ||
                (targetVertex === 'C' && sp.vertexIndex === 2)
              );
              
              if (targetVertexPoint) {
                const isAtTargetVertex = Math.abs(currentPosition.x - targetVertexPoint.x) < 5 && 
                  Math.abs(currentPosition.y - targetVertexPoint.y) < 5;
                
                if (isAtTargetVertex) {
                  // Check if current rotation matches the target angle
                  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
                  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
                  const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
                    GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                  const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
                    GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  
                  const sideVertexMap = {
                    'AB': { v1: 'A', v2: 'B', v1Index: 0, v2Index: 1 },
                    'BA': { v1: 'B', v2: 'A', v1Index: 1, v2Index: 0 },
                    'AC': { v1: 'A', v2: 'C', v1Index: 0, v2Index: 2 },
                    'CA': { v1: 'C', v2: 'A', v1Index: 2, v2Index: 0 }
                  };
                  
                  const sideInfo = sideVertexMap[baselineSide];
                  if (sideInfo) {
                    const vertex1 = snapPoints.find(sp => 
                      sp.vertexLabel === sideInfo.v1 || sp.vertexIndex === sideInfo.v1Index
                    );
                    const vertex2 = snapPoints.find(sp => 
                      sp.vertexLabel === sideInfo.v2 || sp.vertexIndex === sideInfo.v2Index
                    );
                    
                    if (vertex1 && vertex2) {
                      const vertex1Px = {
                        x: (vertex1.x / gridCols) * viewportWidth,
                        y: (vertex1.y / gridRows) * viewportHeight
                      };
                      const vertex2Px = {
                        x: (vertex2.x / gridCols) * viewportWidth,
                        y: (vertex2.y / gridRows) * viewportHeight
                      };
                      
                      // Calculate target angle
                      let targetAngle = ProtractorUtils.calculateAngleToPoint(vertex1Px, vertex2Px);
                      if (currentPageState === 'A' && baselineSide === 'AC') {
                        targetAngle = ProtractorUtils.calculateAngleToPoint(vertex2Px, vertex1Px);
                      }
                      
                      // Convert to CSS rotation
                      const cssTargetRotation = (-targetAngle + 360) % 360;
                      
                      // Check if current rotation is close to target (within 5°)
                      const angleDiff = Math.abs(currentProtractorRotation - cssTargetRotation);
                      const minAngleDiff = Math.min(angleDiff, 360 - angleDiff);
                      
                      if (minAngleDiff < 5) {
                        console.log(`✅ [Protractor] Manual rotation detected alignment: current=${currentProtractorRotation.toFixed(1)}°, target=${cssTargetRotation.toFixed(1)}°, diff=${minAngleDiff.toFixed(1)}°`);
                        isAligned = true;
                        setIsBaselineSnappedToBC(true);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
      if (isAligned) {
        // Get config to determine which side should trigger step advancement
      let expectedBaselineSide = null;
      
      if (flowConfig) {
        const stateConfig = flowConfig.states[currentPageState];
        if (stateConfig) {
          expectedBaselineSide = stateConfig.baselineSide || (stateConfig.baselineSides && stateConfig.baselineSides[0]);
          
          // For state A, check if baseline was already chosen
          if (stateConfig.baselineSides && stateConfig.baselineSides.length > 1) {
            const chosenBaseline = stateConfig.runtimeState?.chosenBaselineSide;
            if (chosenBaseline) {
              expectedBaselineSide = chosenBaseline;
            }
          }
        }
      }
      
        // Advance to step 3 when baseline is aligned with target side (after rotation ends)
        if (currentPageStep === 2 && expectedBaselineSide && stepEventName) {
          let oldStep;
          if (currentPage === 2) {
            oldStep = window.page2Step;
            window.page2Step = 3;
          } else if (currentPage === 4) {
            oldStep = window.page4Step;
            window.page4Step = 3;
          } else if (currentPage === 6) {
            oldStep = window.page6Step;
            window.page6Step = 3;
          }
          console.log(`[STATE:page${currentPage}Step] Changed: ${oldStep} → 3 (Baseline aligned with side ${expectedBaselineSide} after rotation, state=${currentPageState})`);
          console.log(`✅ [Protractor] Baseline aligned with side ${expectedBaselineSide} - set page${currentPage}Step: ${oldStep} → 3`);
          
          const event = new CustomEvent(stepEventName, {
            detail: { step: 3, oldStep: oldStep }
          });
          window.dispatchEvent(event);
          console.log(`[STATE:page${currentPage}Step] Event dispatched:`, event.detail);
        }
      }
    } else {
      // If not snapped, reset the state
      setIsBaselineSnappedToBC(false);
    }
  }, [currentPage, isBaselineSnappedToBC, currentProtractorRotation, snapPoints, currentPosition, getPageStep, getPageState, getPageProtractorFlowConfig, getPageStepChangedEventName]);
  
  // Reset snapped state when conditions change
  React.useEffect(() => {
    const currentPageStep = getPageStep();
    const currentPageState = getPageState();
    if ((currentPage !== 2 && currentPage !== 4 && currentPage !== 6) || currentPageStep !== 2 || currentPageState !== 'C') {
      setIsBaselineSnappedToBC(false);
    }
  }, [currentPage, getPageStep, getPageState]);

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

  // Baseline configuration (separate from arm)
  // Show orange dashed baseline when step === 2 on pages 2, 4, and 6
  const baselineConfig = React.useMemo(() => {
    // Check if we should show baseline based on page-specific step
    let shouldShow = baseline.show !== undefined ? baseline.show : false;
    let baselineColor = baseline.color || '#999999';
    let baselineStyle = baseline.style || 'dashed';
    
    const currentPageStep = getPageStep();
    
    // On pages 2, 4, and 6, show orange dashed baseline when step === 2
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 2) {
      shouldShow = true;
      // If baseline is snapped to target side, make it green; otherwise orange
      baselineColor = isBaselineSnappedToBC ? '#00FF00' : '#FF9900'; // Green when snapped, orange otherwise
      baselineStyle = 'dashed';
    }
    
    // Determine baseline width - use 4gc when showing on step 2
    let baselineWidth = baseline.width !== undefined ? baseline.width : 1;
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 2) {
      baselineWidth = '4gc'; // 4gc when showing on step 2
    }
    
    return {
      show: shouldShow,
      color: baselineColor,
      style: baselineStyle,
      width: baselineWidth
    };
  }, [baseline, currentPage, isBaselineSnappedToBC, getPageStep]);
  
  // Process baseline width from gc units to pixels
  const baselineWidthPixels = React.useMemo(() => {
    return processGcProperty(baselineConfig.width, 'width');
  }, [baselineConfig.width, processGcProperty]);

  // Render center marker if enabled
  const centerMarkerElement = React.useMemo(() => {
    if (!centerMarker || !centerMarker.show) return null;
    
    const HotspotComp = window.HotspotComponent?.HotspotComponent;
    if (!HotspotComp) return null;
    
    // Position at center of protractor (50%, 50%)
    const centerPosition = {
      css: {
        left: '50%',
        top: '50%',
        width: '0%',
        height: '0%'
      }
    };
    
    // Determine if center marker should blink based on page2Step
    // Blink when page2Step === 1, otherwise use the configured animated value
    let shouldAnimate = false;
    if (currentPage === 2) {
      const currentStep = page2Step || (typeof window !== 'undefined' ? window.page2Step : 1);
      shouldAnimate = currentStep === 1;
      console.log(`🔍 [Protractor] Center marker animation check:`, {
        id,
        currentPage,
        page2Step,
        windowPage2Step: typeof window !== 'undefined' ? window.page2Step : 'undefined',
        currentStep,
        shouldAnimate
      });
    } else {
      // For other pages, use the configured animated value
      shouldAnimate = centerMarker.animated !== undefined ? centerMarker.animated : false;
      if (id && id.includes('page2')) {
        console.log(`⚠️ [Protractor] Center marker on page2 but currentPage is ${currentPage}, not animating`);
      }
    }
    
    return React.createElement(HotspotComp, {
      key: 'protractor-center-marker',
      id: `${id || elementName}-center-marker`,
      elementName: `${elementName}-center-marker`,
      currentPage: currentPage,
      position: centerPosition,
      zIndex: (zIndex || 5000) + 100, // Higher than protractor
      backgroundColor: centerMarker.color || '#FF9900',
      borderColor: centerMarker.borderColor || centerMarker.color || '#FF9900',
      borderWidth: centerMarker.borderWidth || '3gc',
      size: centerMarker.size || '24gc',
      innerCircleSize: centerMarker.innerCircleSize || '8gc',
      animated: shouldAnimate,
      cursor: 'default',
      pointerEvents: 'auto'
    });
  }, [centerMarker, id, elementName, currentPage, zIndex, page2Step]);

  // Render protractor face with draggable cursor hint
  const protractorFace = React.createElement(ProtractorFace, {
    protractorType,
    radius: radiusPixels,
    color,
    backgroundColor,
    showDegreeMarks,
    showDegreeLabels,
    degreeInterval,
    labelInterval,
    rotation: protractorRotation,
    labelColor,  // Pass labelColor prop
    labelFontSize,  // Pass font size
    majorTickLength,  // Pass major tick length
    minorTickLength,  // Pass minor tick length
    majorTickWidth,   // Pass major tick width
    minorTickWidth    // Pass minor tick width
  });
  
  // Wrap protractor face in a div that has pointer-events to allow dragging
  // When not rotatable, set pointerEvents to 'none' so measurement arm can receive touch events
  const draggableProtractorFace = React.createElement('div', {
    key: 'protractor-face-wrapper',
    onMouseDown: effectiveIsProtractorRotatable ? handleProtractorRotationStart : undefined,
    onTouchStart: effectiveIsProtractorRotatable ? handleProtractorRotationStart : undefined,
    style: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      cursor: shouldBeDraggable ? 'move' : 'default',
      pointerEvents: effectiveIsProtractorRotatable ? 'auto' : 'none', // Don't capture events when not rotatable
      zIndex: 5,
      transform: `rotate(${currentProtractorRotation}deg)`,
      transition: isRotatingProtractor ? 'none' : 'transform 0.2s ease'
      // Note: CSS rotate() rotates clockwise from top (0° = top, 90° = right, 180° = bottom, 270° = left)
      // Our angle calculations use: 0° = right, 90° = top, 180° = left, 270° = bottom (counterclockwise)
      // This means there's a coordinate system difference that may need conversion
    }
  }, protractorFace);
  
  // Create a visible rotation ring that users can click/drag to rotate the arm
  // This is a ring (donut shape) so clicks inside pass through to the protractor face
  const armRotationRing = isRotatable && armConfig.show && showRotationRing && React.createElement('div', {
    key: 'arm-rotation-ring',
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

  // Function to snap protractor to correct angle on double-click
  const handleDoubleClickSnap = React.useCallback(() => {
    const currentPageStep = getPageStep();
    const currentPageState = getPageState();
    const flowConfig = getPageProtractorFlowConfig();
    const stepEventName = getPageStepChangedEventName();
    if ((currentPage !== 2 && currentPage !== 4 && currentPage !== 6) || !currentPageStep || !currentPageState || !snapPoints || snapPoints.length < 3) {
      console.log('⚠️ [Protractor] Double-click snap: Not in correct state for snapping');
      return;
    }

    // Get config for current state
    if (flowConfig) {
      const stateConfig = flowConfig.states[currentPageState];
      if (stateConfig && currentPageStep === 2) {
        const baselineSide = stateConfig.baselineSide;
        if (!baselineSide) return;

        // Get vertex positions
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
        const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;

        const sideVertexMap = {
          'AB': { v1: 'A', v2: 'B', v1Index: 0, v2Index: 1 },
          'BA': { v1: 'B', v2: 'A', v1Index: 1, v2Index: 0 },
          'AC': { v1: 'A', v2: 'C', v1Index: 0, v2Index: 2 },
          'CA': { v1: 'C', v2: 'A', v1Index: 2, v2Index: 0 }
        };

        const sideInfo = sideVertexMap[baselineSide];
        if (!sideInfo) return;

        const vertex1 = snapPoints.find(sp => 
          sp.vertexLabel === sideInfo.v1 || sp.vertexIndex === sideInfo.v1Index
        );
        const vertex2 = snapPoints.find(sp => 
          sp.vertexLabel === sideInfo.v2 || sp.vertexIndex === sideInfo.v2Index
        );

        if (!vertex1 || !vertex2) return;

        // Convert to screen pixels
        const vertex1Px = {
          x: (vertex1.x / gridCols) * viewportWidth,
          y: (vertex1.y / gridRows) * viewportHeight
        };
        const vertex2Px = {
          x: (vertex2.x / gridCols) * viewportWidth,
          y: (vertex2.y / gridRows) * viewportHeight
        };

        // Calculate angle
        let targetAngle = ProtractorUtils.calculateAngleToPoint(vertex1Px, vertex2Px);
        
        // For state A, use the correct direction based on baseline side
        if (currentPageState === 'A') {
          if (baselineSide === 'AC') {
            // Use C→A (120.2°)
            targetAngle = ProtractorUtils.calculateAngleToPoint(vertex2Px, vertex1Px);
          } else if (baselineSide === 'AB') {
            // Use A→B (239.8°)
            targetAngle = ProtractorUtils.calculateAngleToPoint(vertex1Px, vertex2Px);
          }
        }

        // Convert from our coordinate system to CSS rotate (negate for clockwise)
        const cssRotation = (-targetAngle + 360) % 360;

        console.log(`🎯 [Protractor] Double-click snap: Setting rotation to ${cssRotation.toFixed(1)}° (CSS) for ${baselineSide} (calculated: ${targetAngle.toFixed(1)}°)`);
        
        setCurrentProtractorRotation(cssRotation);
        
        // Mark as snapped and trigger step advancement
        setIsBaselineSnappedToBC(true);
        
        // Use setTimeout to ensure state updates before checking step advancement
        setTimeout(() => {
          // Advance to step 3 when baseline is aligned with target side
          if (currentPageStep === 2 && baselineSide && stepEventName) {
            let oldStep;
            if (currentPage === 2) {
              oldStep = window.page2Step;
              window.page2Step = 3;
            } else if (currentPage === 4) {
              oldStep = window.page4Step;
              window.page4Step = 3;
            } else if (currentPage === 6) {
              oldStep = window.page6Step;
              window.page6Step = 3;
            }
            console.log(`[STATE:page${currentPage}Step] Changed: ${oldStep} → 3 (Baseline aligned with side ${baselineSide} after double-click snap, state=${currentPageState})`);
            console.log(`✅ [Protractor] Baseline aligned with side ${baselineSide} - set page${currentPage}Step: ${oldStep} → 3`);
            
            const event = new CustomEvent(stepEventName, {
              detail: { step: 3, oldStep: oldStep }
            });
            window.dispatchEvent(event);
            console.log(`[STATE:page${currentPage}Step] Event dispatched:`, event.detail);
          }
        }, 100);
        
        // Call callback if provided
        if (onProtractorRotate) {
          onProtractorRotate(cssRotation);
        }
      }
    }
  }, [currentPage, snapPoints, onProtractorRotate, getPageStep, getPageState, getPageProtractorFlowConfig, getPageStepChangedEventName]);

  // Render measurement arm
  // Calculate rotation handle position on the circle
  // The handle moves along a fixed circle (relative to screen) while protractor rotates inside
  const rotationRingRadius = radiusPixels + 25; // Ring is outside the protractor
  
  // Convert CSS rotation to angle for handle position
  // CSS rotation is clockwise from top (0° = up), our system is counterclockwise from right
  // Handle should be at the "top" of the protractor's current orientation
  // When protractor is at 0° CSS rotation, handle is at top (90° in our system)
  // CSS rotate(X) means the protractor has rotated X degrees clockwise
  // So the "top" of the protractor is at angle (90 - X) in screen coordinates
  const handleAngleInOurSystem = (90 - currentProtractorRotation + 360) % 360;
  const handleAngleRad = (handleAngleInOurSystem * Math.PI) / 180;
  const handleX = Math.cos(handleAngleRad) * rotationRingRadius;
  const handleY = -Math.sin(handleAngleRad) * rotationRingRadius; // Negate because screen Y is down
  
  // Rotation ring (fixed circle around protractor)
  const rotationRing = showProtractorRotationHandle && effectiveIsProtractorRotatable && React.createElement('div', {
    key: 'rotation-ring',
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: `${rotationRingRadius * 2}px`,
      height: `${rotationRingRadius * 2}px`,
      borderRadius: '50%',
      border: '3px dashed rgba(59, 130, 246, 0.4)',
      pointerEvents: 'none',
      zIndex: 15
    }
  });
  
  // Rotation handle for touch/TV interfaces - moves along the rotation ring
  const rotationHandle = showProtractorRotationHandle && effectiveIsProtractorRotatable && React.createElement('div', {
    key: 'rotation-handle',
    onDoubleClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log('🔄 [Protractor] Rotation handle double-clicked - snapping to correct angle');
      handleDoubleClickSnap();
    },
    onMouseDown: (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log('🔄 [Protractor] Rotation handle clicked - starting rotation');
      // Reset grab offset so it will be calculated on first move
      rotationStartRef.current = {
        grabOffset: undefined
      };
      setIsRotatingProtractor(true);
    },
    onTouchStart: (e) => {
      e.stopPropagation();
      
      // Check for double-tap (within 300ms of last tap)
      const currentTime = Date.now();
      const timeSinceLastTap = currentTime - lastTapTimeRef.current;
      
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double-tap detected
        e.preventDefault();
        console.log('🔄 [Protractor] Rotation handle double-tapped - snapping to correct angle');
        handleDoubleClickSnap();
        lastTapTimeRef.current = 0; // Reset to prevent triple-tap
        return;
      }
      
      // Single tap - store time for potential double-tap
      lastTapTimeRef.current = currentTime;
      
      // Don't call preventDefault (touchAction: 'none' in style handles scrolling prevention)
      console.log('🔄 [Protractor] Rotation handle touched - starting rotation');
      // Reset grab offset so it will be calculated on first move
      rotationStartRef.current = {
        grabOffset: undefined
      };
      setIsRotatingProtractor(true);
    },
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      // Position handle on the ring at the calculated angle
      transform: `translate(calc(-50% + ${handleX}px), calc(-50% + ${handleY}px))`,
      width: `${handleSizePixels}px`,
      height: `${handleSizePixels}px`,
      borderRadius: '50%',
      backgroundColor: isRotatingProtractor ? 'rgba(34, 197, 94, 0.95)' : 'rgba(59, 130, 246, 0.9)',  // Green when rotating, blue otherwise
      border: '3px solid white',
      boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
      cursor: isRotatingProtractor ? 'grabbing' : 'grab',
      zIndex: 20,  // Above everything
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
      touchAction: 'none',  // Prevent default touch behaviors (scrolling, zooming)
      WebkitTouchCallout: 'none',  // Prevent iOS callout menu
      userSelect: 'none',  // Prevent text selection
      transition: isRotatingProtractor ? 'none' : 'all 0.15s ease-out'
    }
  },
    // Rotation icon (circular arrows)
    React.createElement('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'white',
      strokeWidth: '2.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    },
      // Circular arrow
      React.createElement('path', {
        d: 'M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2'
      })
    )
  );

  // Track if arm is snapped to AC for green feedback
  const [isArmSnappedToAC, setIsArmSnappedToAC] = React.useState(false);
  
  // Track selected angle reading and its color (for step 4)
  const [angleReadingSelected, setAngleReadingSelected] = React.useState(null);
  
  // Listen for arm snap to measurement side (step 3)
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) {
      setIsArmSnappedToAC(false);
      return;
    }
    
    const currentPageStep = getPageStep();
    if (currentPageStep !== 3) {
      setIsArmSnappedToAC(false);
      return;
    }
    
    const checkSnap = () => {
      if (typeof window !== 'undefined' && window.armSnappedToAC !== undefined) {
        setIsArmSnappedToAC(window.armSnappedToAC);
      }
    };
    
    const interval = setInterval(checkSnap, 100);
    checkSnap();
    
    return () => clearInterval(interval);
  }, [currentPage, pageStep, getPageStep]);
  
  // Listen for angle reading selection (for step 4)
  React.useEffect(() => {
    if (currentPage !== 2 && currentPage !== 4 && currentPage !== 6) {
      setAngleReadingSelected(null);
      return;
    }
    
    const currentPageStep = getPageStep();
    if (currentPageStep !== 4) {
      setAngleReadingSelected(null);
      return;
    }
    
    const handleAngleReadingSelected = (event) => {
      const detail = event.detail;
      console.log(`🎨 [Protractor] Angle reading selected:`, detail);
      setAngleReadingSelected(detail);
    };
    
    // Check initial state
    if (typeof window !== 'undefined' && window.angleReadingSelected) {
      setAngleReadingSelected(window.angleReadingSelected);
    }
    
    window.addEventListener('angleReadingSelected', handleAngleReadingSelected);
    
    return () => {
      window.removeEventListener('angleReadingSelected', handleAngleReadingSelected);
    };
  }, [currentPage, pageStep, getPageStep]);
  
  // Determine if arm should blink (when page2Step === 3 on page 2)
  const shouldArmBlink = React.useMemo(() => {
    const shouldBlink = currentPage === 2 && page2Step === 3;
    if (shouldBlink) {
      console.log(`🔍 [Protractor] Arm should blink: currentPage=${currentPage}, page2Step=${page2Step}, shouldBlink=${shouldBlink}`);
    }
    return shouldBlink;
  }, [currentPage, page2Step]);
  
  // Determine arrowhead color (orange when page2Step === 3, green when snapped to AC)
  const arrowheadColor = React.useMemo(() => {
    if (currentPage === 2 && page2Step === 3) {
      if (isArmSnappedToAC) {
        return '#00FF00'; // Green when snapped to AC
      }
      return '#FF9900'; // Orange color
    }
    return null; // Use arm color
  }, [currentPage, page2Step, isArmSnappedToAC]);
  
  // Determine arm color (green when snapped to AC, or based on selected reading in step 4)
  const dynamicArmColor = React.useMemo(() => {
    const currentPageStep = getPageStep();
    // Step 4: Use color from selected reading
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 4 && angleReadingSelected) {
      return angleReadingSelected.armColor || armConfig.color;
    }
    // Step 3: Green when snapped to AC
    if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageStep === 3 && isArmSnappedToAC) {
      return '#00FF00'; // Green when snapped to AC
    }
    return armConfig.color; // Use configured color
  }, [currentPage, pageStep, isArmSnappedToAC, angleReadingSelected, armConfig.color, getPageStep]);
  
  // Determine if angle display should be shown (only when step = 3 or 4 on pages 2, 4, and 6)
  const effectiveShowAngleDisplay = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4 || currentPage === 6) {
      const currentStep = pageStep || getPageStep() || 1;
      // Only show angle display when step = 3 or 4
      return armConfig.angleDisplay.show && (currentStep === 3 || currentStep === 4);
    }
    return armConfig.angleDisplay.show;
  }, [currentPage, pageStep, armConfig.angleDisplay.show, getPageStep]);
  
  // Determine if angle readings should be clickable (only when step = 4 on pages 2, 4, and 6)
  const effectiveAngleReadingsClickable = React.useMemo(() => {
    if (currentPage === 2 || currentPage === 4 || currentPage === 6) {
      const currentStep = pageStep || getPageStep() || 1;
      // Only enable clickable readings when step = 4
      const isClickable = armConfig.angleReadingsClickable && (currentStep === 4);
      if (isClickable) {
        console.log(`🖱️ [Protractor] Angle readings clickable enabled: currentPage=${currentPage}, page${currentPage}Step=${currentStep}`);
      }
      return isClickable;
    }
    return armConfig.angleReadingsClickable;
  }, [currentPage, pageStep, armConfig.angleReadingsClickable, getPageStep]);

  const measurementArmElement = armConfig.show && React.createElement(MeasurementArm, {
    angle: currentArmAngle,
    length: armLengthPixels,
    color: dynamicArmColor, // Use dynamic color (green when snapped to AC)
    style: armConfig.style,        // 'solid' or 'dashed'
    extendable: armConfig.extendable,
    zIndex: armConfig.zIndex,      // Higher than protractor body
    showAngleDisplay: effectiveShowAngleDisplay,
    angleDisplaySize: angleDisplaySizePixels,  // Processed pixel size
    angleDisplayColor: armConfig.angleDisplay.color,
    anglePrecision,
    protractorType: protractorType,  // Pass protractor type for dual reading display
    isSnapped: isArmSnappedToAC,  // Pass snap state to show green when snapped
    isRotating: isRotatingArm || isExtendingArm,  // Show feedback for both actions
    onRotationStart: effectiveIsRotatable ? handleArmRotationStart : null,  // Rotation via arm line
    onArrowheadStart: (effectiveIsRotatable || armConfig.extendable) ? handleArrowheadStart : null,  // Combined handler for arrowhead
    protractorRotation: currentProtractorRotation,  // Pass protractor rotation so baseline rotates with it
    rotationRingRadius: radiusPixels + 25,  // Pass rotation ring radius (same as protractor rotation ring)
    // Blinking props
    isBlinking: shouldArmBlink,
    arrowheadColor: arrowheadColor,
    arrowheadBlinking: shouldArmBlink,
    // Baseline props (separate configuration)
    showBaseline: baselineConfig.show,
    baselineColor: baselineConfig.color,
    baselineStyle: baselineConfig.style,
    baselineWidth: baselineWidthPixels, // Use processed pixels value (6gc converted to pixels)
    // Clickable angle readings props
    angleReadingsClickable: effectiveAngleReadingsClickable,
    onAngleReadingClick: armConfig.onAngleReadingClick,
    // Pass reading colors based on selection
    readingColors: ((currentPage === 2 || currentPage === 4 || currentPage === 6) && pageStep === 4 && angleReadingSelected) ? {
      reading0Color: angleReadingSelected.readingIndex === 0 ? angleReadingSelected.color : undefined,
      reading1Color: angleReadingSelected.readingIndex === 1 ? angleReadingSelected.color : undefined
    } : null
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
    
    // Call onPositionChange during drag to update animated dot position
    if (onPositionChange) {
      onPositionChange(pos, nearest);
    }
  }, [isDragging, findNearestSnapPoint, onPositionChange]);

  const handleDragEnd = React.useCallback((id, pos) => {
    setIsDragging(false);

    // Notify that dragging has ended
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      
    const gridX = (pos.x / viewportWidth) * gridCols;
    const gridY = (pos.y / viewportHeight) * gridRows;
    
    // Dispatch event to notify animated dot that dragging has ended
    if (typeof window !== 'undefined') {
      const oldPos = window.protractorCenterPosition;
      window.protractorCenterPosition = { x: gridX, y: gridY };
      if (!oldPos || oldPos.x !== gridX || oldPos.y !== gridY) {
        console.log(`[STATE:protractorPosition] Changed: (${oldPos?.x || 'N/A'}, ${oldPos?.y || 'N/A'}) → (${gridX}, ${gridY}) [Dragging: false] (ProtractorComponent - drag end)`);
      }
      window.dispatchEvent(new CustomEvent('protractorPositionChanged', {
        detail: { x: gridX, y: gridY, isDragging: false }
      }));
    }

    // If we've already initialized to a snap point and haven't actually dragged,
    // skip the snap logic to prevent unwanted snapping on initial load
    if (isInitializedToSnapPoint && currentPosition) {
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

    if (snapMode === 'free') {
      setNearestSnapPoint(null);
      // Update position to where it was dropped
      const xPercent = (pos.x / viewportWidth) * 100;
      const yPercent = (pos.y / viewportHeight) * 100;
      const gridX = (pos.x / viewportWidth) * gridCols;
      const gridY = (pos.y / viewportHeight) * gridRows;
      const newPosition = {
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        x: gridX,  // Store grid coordinates for rotation logic
        y: gridY   // Store grid coordinates for rotation logic
      };
      setCurrentPosition(newPosition);
      
      // Call callback if provided
      if (onPositionChange) {
        onPositionChange(pos, null); // position, snapPoint
      }
      
      return pos; // Return unmodified position
    }

    // Use gridX and gridY already calculated above for snap point calculation
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
          top: `${yPercent}%`,
          x: nearest.x,  // Store grid coordinates for rotation logic
          y: nearest.y   // Store grid coordinates for rotation logic
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
          top: `${yPercent}%`,
          x: absoluteNearest.x,  // Store grid coordinates for rotation logic
          y: absoluteNearest.y   // Store grid coordinates for rotation logic
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
          top: `${yPercent}%`,
          x: nearest.x,  // Store grid coordinates for rotation logic
          y: nearest.y   // Store grid coordinates for rotation logic
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
        const gridX = (pos.x / viewportWidth) * gridCols;
        const gridY = (pos.y / viewportHeight) * gridRows;
        const newPosition = {
          left: `${xPercent}%`,
          top: `${yPercent}%`,
          x: gridX,  // Store grid coordinates for rotation logic
          y: gridY   // Store grid coordinates for rotation logic
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

  // Hide protractor when pageState = 'complete' on pages 2, 4, and 6
  const currentPageState = getPageState();
  if ((currentPage === 2 || currentPage === 4 || currentPage === 6) && currentPageState === 'complete') {
    return null;
  }

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
        isDisabled: !effectiveIsDraggable || mode === 'static',
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
        React.createElement(React.Fragment, { key: 'measurement-arm' }, measurementArmElement),
        React.createElement(React.Fragment, { key: 'center-marker' }, centerMarkerElement)
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
      React.createElement(React.Fragment, { key: 'measurement-arm' }, measurementArmElement),
      React.createElement(React.Fragment, { key: 'center-marker' }, centerMarkerElement)
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

