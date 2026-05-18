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
    showMinorTicks = true,  // When false, only major ticks (at labelInterval) are shown
    minorTickInterval = 5,  // When showMinorTicks true: 2 or 5 (degrees between minor ticks)
    rotation = 0,
    labelColor = '#333',  // Font color for degree labels
    labelFontSize = '12gc',  // NEW: Font size in GC units
    majorTickLength = '15gc',  // NEW: Length of major ticks
    minorTickLength = '8gc',   // NEW: Length of minor ticks
    majorTickWidth = '2gc',    // NEW: Width of major ticks
    minorTickWidth = '1gc',    // NEW: Width of minor ticks
    tickLabelGap = '5gc',      // Gap between ticks and labels (in gc)
    showSecondaryLabels = false,  // Secondary scale: 180 - primary (semicircular only)
    primarySecondaryLabelGap = '5gc',  // Gap in gc between primary and secondary label
    secondaryLabelColor = '#1919FF',   // Font color for secondary labels
    showCenterSemicircle = false,      // Draw a small semicircle at protractor center
    centerSemicircleRadius = '10gc',  // Radius of center semicircle (gc)
    centerSemicircleThickness = '3gc', // Stroke thickness of center semicircle (gc)
    showCenterCrosshair = true,       // Crosshair at center (inside semicircle)
    centerCrosshairThickness = '3gc', // Line thickness of center crosshair (gc)
    centerCrosshairLength,           // Total length of crosshair in gc (optional; default 1.8x semicircle radius)
    showLabelToSemicircleLines = false, // Straight lines from labels to center semicircle surface
    labelToSemicircleLineGap = '5gc',  // Gap in gc between line end and label (line stops short of label)
    showSecondaryLabelToSemicircleLines = false, // Lines at in-between angles (between label lines)
    secondaryLabelToSemicircleLineGap = '5gc',  // Gap in gc for outer end of secondary lines
    primarySemicircleToSemicircleLineGap = '5gc',   // Gap in gc between primary line inner end and center semicircle
    secondarySemicircleToSemicircleLineGap = '5gc', // Gap in gc between secondary line inner end and center semicircle
    showCenterHotspot = false,       // Hotspot circle at protractor center
    centerHotspotSize = '20gc',      // Diameter of center hotspot (gc)
    centerHotspotBorderThickness = '8gc', // Border thickness (gc)
    centerHotspotBorderColor = 'orange', // Border color
    centerHotspotBackground = 'white',   // Hotspot fill color
    hotspotBlink = false,            // When true and hotspot visible, blink the hotspot
    showBaseline = false,            // Line from first to last label through center
    baselineBlink = false,           // When true and baseline visible, blink the baseline
    scaleLabelHighlightSequence = false, // When true, highlight primary labels one by one (left to right)
    labelHighlightDurationMs = 300,  // Duration per label (ms), e.g. 500 for scale, 1000 for clockwise
    labelHighlightFontScale = 1.15, // Font scale when highlighted, e.g. 1.28 for scale, 1.2 for clockwise
    labelHighlightColor,             // Optional fill color when highlighted (e.g. orange for scale step)
    scaleStepHighlight = false,      // When true, use stronger "scale step" animation (pop + blink) on primary labels
    secondaryLabelHighlightScalePop = false, // When true, use same pop animation on secondary labels (e.g. anticlockwise)
    secondaryLabelHighlightSequence = false, // When true, highlight secondary labels one by one (right to left, 1000ms each, +20% font)
    baselineColor = '#333',          // Baseline stroke color
    baselineThickness = '2gc',       // Baseline stroke width (gc)
    baselineLabelGap = '5gc',        // Gap (gc) inset from first and last label on both ends
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
  const tickLabelGapPx = React.useMemo(() => processGcToPixels(tickLabelGap, 5), [tickLabelGap, processGcToPixels]);
  const primarySecondaryLabelGapPx = React.useMemo(() => processGcToPixels(primarySecondaryLabelGap, 5), [primarySecondaryLabelGap, processGcToPixels]);
  const centerSemicircleRadiusPx = React.useMemo(() => processGcToPixels(centerSemicircleRadius, 10), [centerSemicircleRadius, processGcToPixels]);
  const centerSemicircleThicknessPx = React.useMemo(() => processGcToPixels(centerSemicircleThickness, 3), [centerSemicircleThickness, processGcToPixels]);
  const centerCrosshairThicknessPx = React.useMemo(() => processGcToPixels(centerCrosshairThickness, 3), [centerCrosshairThickness, processGcToPixels]);
  const labelToSemicircleLineGapPx = React.useMemo(() => processGcToPixels(labelToSemicircleLineGap, 5), [labelToSemicircleLineGap, processGcToPixels]);
  const secondaryLabelToSemicircleLineGapPx = React.useMemo(() => processGcToPixels(secondaryLabelToSemicircleLineGap, 5), [secondaryLabelToSemicircleLineGap, processGcToPixels]);
  const primarySemicircleToSemicircleLineGapPx = React.useMemo(() => processGcToPixels(primarySemicircleToSemicircleLineGap, 5), [primarySemicircleToSemicircleLineGap, processGcToPixels]);
  const secondarySemicircleToSemicircleLineGapPx = React.useMemo(() => processGcToPixels(secondarySemicircleToSemicircleLineGap, 5), [secondarySemicircleToSemicircleLineGap, processGcToPixels]);
  const centerHotspotSizePx = React.useMemo(() => processGcToPixels(centerHotspotSize, 20), [centerHotspotSize, processGcToPixels]);
  const centerHotspotBorderThicknessPx = React.useMemo(() => processGcToPixels(centerHotspotBorderThickness, 8), [centerHotspotBorderThickness, processGcToPixels]);
  const baselineThicknessPx = React.useMemo(() => processGcToPixels(baselineThickness, 2), [baselineThickness, processGcToPixels]);
  const baselineLabelGapPx = React.useMemo(() => processGcToPixels(baselineLabelGap, 5), [baselineLabelGap, processGcToPixels]);

  // Scale label highlight sequence: when scaleLabelHighlightSequence is true, step through primary labels left-to-right every 300ms
  const [scaleHighlightLabelIndex, setScaleHighlightLabelIndex] = React.useState(-1);
  // Secondary label highlight sequence: when secondaryLabelHighlightSequence is true, step through secondary labels right-to-left every 1000ms
  const [secondaryHighlightLabelIndex, setSecondaryHighlightLabelIndex] = React.useState(-1);

  const centerCrosshairHalfLengthPx = React.useMemo(() => {
    if (centerCrosshairLength != null && centerCrosshairLength !== '') {
      const totalPx = typeof centerCrosshairLength === 'string' && centerCrosshairLength.includes('gc')
        ? processGcToPixels(centerCrosshairLength, 18)
        : (typeof centerCrosshairLength === 'number' ? centerCrosshairLength : 2 * 0.9 * centerSemicircleRadiusPx);
      return totalPx / 2;
    }
    return 0.9 * centerSemicircleRadiusPx; // default: 1.8x semicircle radius
  }, [centerCrosshairLength, centerSemicircleRadiusPx, processGcToPixels]);

  // Generate degree marks (when showMinorTicks is false, only ticks at labelInterval; else use minorTickInterval for step)
  const degreeMarks = React.useMemo(() => {
    const marks = [];
    const startDegree = isCircular ? 0 : 0;
    const endDegree = isCircular ? 360 : 181; // Changed to 181 to include 180°
    const minorStep = minorTickInterval === 2 || minorTickInterval === 5 ? minorTickInterval : 5;
    const tickStep = showMinorTicks ? minorStep : labelInterval;
    
    for (let degree = startDegree; degree < endDegree; degree += tickStep) {
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
        // Semicircular: 0° on LEFT, 180° on RIGHT, arc on TOP (angle = (180 - degree) so 0→π, 180→0)
        angle = (180 - degree) * (Math.PI / 180);
        x1 = radius * Math.cos(angle);
        y1 = -radius * Math.sin(angle);
        x2 = (radius - markLength) * Math.cos(angle);
        y2 = -(radius - markLength) * Math.sin(angle);
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
  }, [radius, labelInterval, showMinorTicks, minorTickInterval, isCircular, majorTickLengthPx, minorTickLengthPx, majorTickWidthPx, minorTickWidthPx]);

  // Generate degree labels
  const degreeLabels = React.useMemo(() => {
    if (!showDegreeLabels) return [];
    
    const labels = [];
    const startDegree = isCircular ? 0 : 0;
    const endDegree = isCircular ? 360 : 181; // Changed to 181 to include 180°
    
    // Position labels inside the protractor: radius minus tick length minus gap (tickLabelGap)
    const labelRadius = radius - majorTickLengthPx - tickLabelGapPx;
    
    for (let degree = startDegree; degree < endDegree; degree += labelInterval) {
      let angle, x, y;
      
      if (isCircular) {
        angle = (degree - 90) * (Math.PI / 180);  // Circular: start from top
        x = labelRadius * Math.cos(angle);
        y = labelRadius * Math.sin(angle);
      } else {
        // Semicircular: 0° on LEFT, 180° on RIGHT, arc on TOP (same as marks)
        angle = (180 - degree) * (Math.PI / 180);
        x = labelRadius * Math.cos(angle);
        y = -labelRadius * Math.sin(angle);
      }

      labels.push({
        degree,
        x,
        y
      });
    }
    return labels;
  }, [radius, labelInterval, isCircular, showDegreeLabels, majorTickLengthPx, tickLabelGapPx]);

  // Run label highlight sequence: move to next label (left to right) every labelHighlightDurationMs; each label gets +font scale for that duration
  React.useEffect(() => {
    if (!scaleLabelHighlightSequence || degreeLabels.length === 0) {
      setScaleHighlightLabelIndex(-1);
      return;
    }
    setScaleHighlightLabelIndex(0);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('protractorLabelHighlighted', { detail: { index: 0, total: degreeLabels.length } }));
    }
    const duration = Math.max(100, labelHighlightDurationMs || 300);
    const interval = setInterval(() => {
      setScaleHighlightLabelIndex((prev) => {
        const next = prev >= degreeLabels.length - 1 ? -1 : prev + 1;
        if (typeof window !== 'undefined' && next >= 0) {
          window.dispatchEvent(new CustomEvent('protractorLabelHighlighted', { detail: { index: next, total: degreeLabels.length } }));
        }
        if (next < 0) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('page3PrimaryLabelCycleComplete'));
          }
          clearInterval(interval);
        }
        return next;
      });
    }, duration);
    return () => clearInterval(interval);
  }, [scaleLabelHighlightSequence, degreeLabels.length, labelHighlightDurationMs]);

  // Secondary labels (180 - primary for semicircular): same positions, inner radius, value = 180 - degree
  const secondaryLabels = React.useMemo(() => {
    if (!showSecondaryLabels || isCircular) return [];
    if (!showDegreeLabels) return [];
    const secondaryLabelRadius = radius - majorTickLengthPx - tickLabelGapPx - primarySecondaryLabelGapPx;
    const list = [];
    const startDegree = 0;
    const endDegree = 181;
    for (let degree = startDegree; degree < endDegree; degree += labelInterval) {
      const secondaryValue = 180 - degree;
      const angle = (180 - degree) * (Math.PI / 180);
      const x = secondaryLabelRadius * Math.cos(angle);
      const y = -secondaryLabelRadius * Math.sin(angle);
      list.push({ degree: secondaryValue, x, y });
    }
    return list;
  }, [radius, labelInterval, showDegreeLabels, showSecondaryLabels, majorTickLengthPx, tickLabelGapPx, primarySecondaryLabelGapPx]);

  // Run secondary label highlight sequence: step from right to left (index length-1 down to 0) every labelHighlightDurationMs
  React.useEffect(() => {
    if (!secondaryLabelHighlightSequence || secondaryLabels.length === 0) {
      setSecondaryHighlightLabelIndex(-1);
      return;
    }
    const total = secondaryLabels.length;
    setSecondaryHighlightLabelIndex(total - 1);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('protractorLabelHighlighted', { detail: { index: total - 1, total } }));
    }
    const duration = Math.max(100, labelHighlightDurationMs || 1000);
    const interval = setInterval(() => {
      setSecondaryHighlightLabelIndex((prev) => {
        const next = prev <= 0 ? -1 : prev - 1;
        if (typeof window !== 'undefined' && next >= 0) {
          window.dispatchEvent(new CustomEvent('protractorLabelHighlighted', { detail: { index: next, total } }));
        }
        if (next < 0) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('page3SecondaryLabelCycleComplete'));
          }
          clearInterval(interval);
        }
        return next;
      });
    }, duration);
    return () => clearInterval(interval);
  }, [secondaryLabelHighlightSequence, secondaryLabels.length, labelHighlightDurationMs]);

  // Straight lines from near label (with gap) to near center semicircle (with gap), at the same radial angle as the label
  const labelToSemicircleLines = React.useMemo(() => {
    if (!showLabelToSemicircleLines || !showCenterSemicircle || isCircular) return [];
    const innerRadiusPx = centerSemicircleRadiusPx + primarySemicircleToSemicircleLineGapPx;
    const sourceLabels = showSecondaryLabels ? secondaryLabels : degreeLabels;
    return sourceLabels.map((label) => {
      const angle = Math.atan2(-label.y, label.x);
      const labelRadius = Math.sqrt(label.x * label.x + label.y * label.y);
      const outerRadius = Math.max(innerRadiusPx, labelRadius - labelToSemicircleLineGapPx);
      const x1 = outerRadius * Math.cos(angle);
      const y1 = -outerRadius * Math.sin(angle);
      const x2 = innerRadiusPx * Math.cos(angle);
      const y2 = -innerRadiusPx * Math.sin(angle);
      return { x1, y1, x2, y2 };
    });
  }, [showLabelToSemicircleLines, showCenterSemicircle, showSecondaryLabels, degreeLabels, secondaryLabels, centerSemicircleRadiusPx, labelToSemicircleLineGapPx, primarySemicircleToSemicircleLineGapPx, isCircular]);

  // Secondary lines at in-between angles (e.g. 5, 15, 25, ... when labelInterval is 10)
  const secondaryLabelToSemicircleLines = React.useMemo(() => {
    if (!showSecondaryLabelToSemicircleLines || !showCenterSemicircle || isCircular) return [];
    const innerRadiusPx = centerSemicircleRadiusPx + secondarySemicircleToSemicircleLineGapPx;
    const primaryLabelRadius = radius - majorTickLengthPx - tickLabelGapPx;
    const outerRadius = Math.max(innerRadiusPx, primaryLabelRadius - secondaryLabelToSemicircleLineGapPx);
    const lines = [];
    for (let degree = labelInterval / 2; degree < 180; degree += labelInterval) {
      const angle = (180 - degree) * (Math.PI / 180);
      const x1 = outerRadius * Math.cos(angle);
      const y1 = -outerRadius * Math.sin(angle);
      const x2 = innerRadiusPx * Math.cos(angle);
      const y2 = -innerRadiusPx * Math.sin(angle);
      lines.push({ x1, y1, x2, y2 });
    }
    return lines;
  }, [showSecondaryLabelToSemicircleLines, showCenterSemicircle, radius, majorTickLengthPx, tickLabelGapPx, centerSemicircleRadiusPx, secondaryLabelToSemicircleLineGapPx, secondarySemicircleToSemicircleLineGapPx, labelInterval, isCircular]);

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

    // Baseline: first label to last label through center; both ends inset by baselineLabelGap
    showBaseline && (() => {
      const baselineLabels = showSecondaryLabels ? secondaryLabels : degreeLabels;
      if (!baselineLabels || baselineLabels.length < 2) return null;
      const gapPx = baselineLabelGapPx;
      const shorten = (p) => {
        const r = Math.sqrt(p.x * p.x + p.y * p.y) || 1;
        const scale = Math.max(0, 1 - gapPx / r);
        return { x: p.x * scale, y: p.y * scale };
      };
      const first = shorten(baselineLabels[0]);
      const last = shorten(baselineLabels[baselineLabels.length - 1]);
      return React.createElement('line', {
        key: 'baseline',
        x1: first.x,
        y1: first.y,
        x2: last.x,
        y2: last.y,
        stroke: baselineColor,
        strokeWidth: baselineThicknessPx,
        strokeLinecap: 'round',
        pointerEvents: 'none',
        ...(baselineBlink ? { className: 'protractor-baseline-blink' } : {})
      });
    })(),

    // Degree labels (primary); when scaleLabelHighlightSequence, highlight one label at a time (font scale, duration ms each, left to right)
    degreeLabels.map((label, idx) => {
      const isHighlighted = scaleLabelHighlightSequence && scaleHighlightLabelIndex === idx;
      const fontScale = labelHighlightFontScale || 1.15;
      const durationMs = Math.max(100, labelHighlightDurationMs || 300);
      const highlightClass = isHighlighted
        ? (scaleStepHighlight ? 'protractor-label-highlight-blink protractor-label-highlight-scale' : 'protractor-label-highlight-blink')
        : '';
      return React.createElement('text', {
        key: `label-${idx}`,
        x: label.x,
        y: label.y,
        fill: isHighlighted && labelHighlightColor ? labelHighlightColor : labelColor,
        fontSize: isHighlighted ? labelFontSizePx * fontScale : labelFontSizePx,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        pointerEvents: 'none',
        ...(isHighlighted ? { className: highlightClass, style: { animationDuration: durationMs + 'ms' } } : {})
      }, label.degree);
    }),

    // Secondary labels (180 - primary, semicircular only; same font size, inner radius; optional right-to-left highlight sequence)
    showSecondaryLabels && secondaryLabels.map((label, idx) => {
      const isSecondaryHighlighted = secondaryLabelHighlightSequence && secondaryHighlightLabelIndex === idx;
      const secDurationMs = labelHighlightDurationMs || 1000;
      const secHighlightClass = isSecondaryHighlighted
        ? (secondaryLabelHighlightScalePop ? 'protractor-label-highlight-blink protractor-label-highlight-scale' : 'protractor-label-highlight-blink')
        : '';
      return React.createElement('text', {
        key: `secondary-${idx}`,
        x: label.x,
        y: label.y,
        fill: isSecondaryHighlighted && labelHighlightColor ? labelHighlightColor : secondaryLabelColor,
        fontSize: isSecondaryHighlighted ? labelFontSizePx * labelHighlightFontScale : labelFontSizePx,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        pointerEvents: 'none',
        ...(isSecondaryHighlighted ? { className: secHighlightClass, style: { animationDuration: secDurationMs + 'ms' } } : {})
      }, label.degree);
    }),

    // Lines from labels to center semicircle surface (same angle as label)
    showLabelToSemicircleLines && labelToSemicircleLines.map((line, idx) =>
      React.createElement('line', {
        key: `label-line-${idx}`,
        x1: line.x1,
        y1: line.y1,
        x2: line.x2,
        y2: line.y2,
        stroke: color,
        strokeWidth: 1,
        strokeLinecap: 'round',
        pointerEvents: 'none'
      })
    ),

    // Secondary lines at in-between angles (between label lines)
    showSecondaryLabelToSemicircleLines && secondaryLabelToSemicircleLines.map((line, idx) =>
      React.createElement('line', {
        key: `secondary-label-line-${idx}`,
        x1: line.x1,
        y1: line.y1,
        x2: line.x2,
        y2: line.y2,
        stroke: color,
        strokeWidth: 1,
        strokeLinecap: 'round',
        pointerEvents: 'none'
      })
    ),

    // Center semicircle (small semicircle at origin; arc on bottom, inverted from main protractor)
    showCenterSemicircle && React.createElement('path', {
      key: 'center-semicircle',
      d: `M ${centerSemicircleRadiusPx} 0 A ${centerSemicircleRadiusPx} ${centerSemicircleRadiusPx} 0 0 0 ${-centerSemicircleRadiusPx} 0`,
      fill: 'none',
      stroke: color,
      strokeWidth: centerSemicircleThicknessPx,
      strokeLinecap: 'round',
      pointerEvents: 'none'
    }),

    // Center crosshair (intersection at protractor center, size 1.8x semicircle radius)
    showCenterSemicircle && showCenterCrosshair && [
      React.createElement('line', {
        key: 'crosshair-h',
        x1: -centerCrosshairHalfLengthPx,
        y1: 0,
        x2: centerCrosshairHalfLengthPx,
        y2: 0,
        stroke: color,
        strokeWidth: centerCrosshairThicknessPx,
        strokeLinecap: 'round',
        pointerEvents: 'none'
      }),
      React.createElement('line', {
        key: 'crosshair-v',
        x1: 0,
        y1: -centerCrosshairHalfLengthPx,
        x2: 0,
        y2: centerCrosshairHalfLengthPx,
        stroke: color,
        strokeWidth: centerCrosshairThicknessPx,
        strokeLinecap: 'round',
        pointerEvents: 'none'
      })
    ],

    // Center hotspot (circle at protractor center; size = diameter); optional blink when hotspotBlink true
    showCenterHotspot && React.createElement('circle', {
      key: 'center-hotspot',
      cx: 0,
      cy: 0,
      r: centerHotspotSizePx / 2,
      fill: centerHotspotBackground,
      stroke: centerHotspotBorderColor,
      strokeWidth: centerHotspotBorderThicknessPx,
      pointerEvents: 'auto',
      ...(hotspotBlink ? { className: 'protractor-hotspot-blink' } : {})
    }),

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
    strokeWidth = 3,          // Arm line thickness in viewBox units
    color = '#FF0000',
    style = 'solid',          // 'solid' or 'dashed'
    extendable = false,       // Allow extending arm by dragging arrowhead
    showArmLine = true,       // When false, hide arm line only (circle remains)
    zIndex = 10,              // Z-index for arm (higher than protractor body)
    showAngleDisplay = true,
    showCircle = true,
    anglePrecision = 1,
    isRotating = false,
    onRotationStart,          // Callback when user starts rotating (via arm line)
    onArrowheadStart,         // Callback for arrowhead (can both rotate and extend)
    angleDisplaySize = 28,    // Font size in viewBox units (parent converts 28gc→px→viewBox)
    angleDisplayColor = null, // Color for angle display (null = use arm color)
    angleDisplayPaddingX = null,  // X padding in viewBox units (null = angleDisplaySize * 0.8)
    angleDisplayPaddingY = null,  // Y padding in viewBox units (null = angleDisplaySize * 0.8)
    angleDisplayBackground = 'rgba(255,255,255,0.45)', // Background fill for label (e.g. 'white', 'rgba(255,255,255,0.9)')
    angleDisplayGap = null,       // Gap in viewBox units between circle and label (null = 5% of arm length)
    circleRadius = null,      // Circle at arm end radius in viewBox (null = extendable ? 8 : 5)
    circleBlink = false,
    circleBorderColor = null, // e.g. 'white'
    circleBorderWidth = null, // viewBox units (e.g. 2)
    protractorRotation = 0,    // Rotation of the protractor body (so baseline rotates with it)
    rotationTransitionMs = null, // When set, apply transition so arm rotates in sync with protractor body
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

  const rotationTransition = rotationTransitionMs != null && rotationTransitionMs > 0
    ? `transform ${rotationTransitionMs}ms ease`
    : undefined;
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
      transformOrigin: 'center center',
      ...(rotationTransition && { transition: rotationTransition })
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
    
    // Invisible clickable area along the arm (thicker for easier clicking) - only when arm line visible
    showArmLine && onRotationStart && React.createElement('line', {
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
    
    // Arm line (visual) - hidden when showArmLine false (circle only)
    showArmLine && React.createElement('line', {
      key: 'arm',
      x1: 0,
      y1: 0,
      x2: x,
      y2: y,
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: 'round',
      strokeDasharray: style === 'dashed' ? '8, 4' : 'none',  // Dashed if style is 'dashed'
      opacity: isRotating ? 0.7 : 1,
      style: {
        pointerEvents: 'none'  // Visual line doesn't block clicks
      }
    }),

    // Arrowhead at end (clickable for both rotation AND extension)
    showCircle && (() => {
      const r = circleRadius != null ? circleRadius : (extendable ? 8 : 5);
      const strokeColor = circleBorderColor != null ? circleBorderColor : (extendable ? 'white' : 'none');
      const strokeW = circleBorderWidth != null ? circleBorderWidth : (extendable ? 2 : 0);
      return React.createElement('circle', {
        key: 'arrowhead',
        cx: x,
        cy: y,
        r,
        fill: color,
        opacity: isRotating ? 0.7 : 1,
        ...(strokeColor !== 'none' && strokeW > 0 ? { stroke: strokeColor, strokeWidth: strokeW } : {}),
        ...(circleBlink ? { className: 'protractor-hotspot-blink' } : {}),
        style: {
          cursor: extendable ? 'move' : (onRotationStart ? 'crosshair' : 'default'),
          pointerEvents: (onArrowheadStart || onRotationStart) ? 'auto' : 'none'
        },
        onMouseDown: onArrowheadStart || onRotationStart,
        onTouchStart: onArrowheadStart || onRotationStart,
        title: extendable ? 'Drag to rotate & extend/retract arm' : 'Drag to rotate arm'
      });
    })(),

    // Angle display - position label so its background rect clears the circle (no overlap)
    showAngleDisplay && (() => {
      const circleR = circleRadius != null ? circleRadius : (extendable ? 8 : 5);
      const padW = angleDisplayPaddingX != null ? angleDisplayPaddingX : (angleDisplaySize * 0.8);
      const padH = angleDisplayPaddingY != null ? angleDisplayPaddingY : (angleDisplaySize * 0.8);
      const gap = angleDisplayGap != null ? angleDisplayGap : (0.05 * length); // gap between circle edge and label
      const labelGapFactor = (length + circleR + gap + padW) / length; // label center so rect clears circle
      const labelX = x * labelGapFactor;
      const labelY = y * labelGapFactor;
      // Parse background: allow "color" or "color opacity" (e.g. "white 0.9") for fill + fillOpacity
      const bgMatch = typeof angleDisplayBackground === 'string' && angleDisplayBackground.match(/^(.+?)\s+([\d.]+)$/);
      const bgFill = bgMatch ? bgMatch[1].trim() : angleDisplayBackground;
      const bgOpacity = bgMatch ? parseFloat(bgMatch[2]) : (angleDisplayBackground.indexOf('rgba') === 0 ? undefined : 0.45);
      return React.createElement('g', {
        key: 'angle-text-wrapper',
        transform: `rotate(${-protractorRotation}, ${labelX}, ${labelY})`
      }, [
        React.createElement('rect', {
          key: 'angle-label-bg',
          x: labelX - padW,
          y: labelY - padH,
          width: padW * 2,
          height: padH * 2,
          rx: padH * 0.3,
          ry: padH * 0.3,
          fill: bgFill,
          ...(bgOpacity !== undefined ? { fillOpacity: bgOpacity } : {})
        }),
        React.createElement('text', {
          key: 'angle-text',
          x: labelX,
          y: labelY,
          fill: angleDisplayColor || color,
          fontSize: angleDisplaySize,
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          style: {
            pointerEvents: 'none',
            userSelect: 'none'
          }
        }, ProtractorUtils.formatAngleDisplay(angle, anglePrecision))
      ]);
    })()
  ].filter(Boolean));
});

/**
 * Main Protractor Component
 * Supports grouped props: appearance, labels, ticks, interaction (all optional).
 * Flat props are still supported.
 */
const ProtractorComponent = React.memo((props) => {
  const flatProps = React.useMemo(() => ({
    ...props,
    ...(props.appearance || {}),
    ...(props.labels || {}),
    ...(props.ticks || {}),
    ...(props.interaction || {}),
  }), [props]);

  const {
    id,
    elementName,
    currentPage,
    coordinates,
    centerPoint,
    zIndex = 5000,
    
    // Visual Configuration (or from appearance group)
    protractorType = 'semicircular',
    radius = '100gc',
    color = '#333',
    backgroundColor = 'rgba(255, 255, 255, 0.9)',
    showDegreeMarks = true,
    showDegreeLabels = true,
    degreeInterval = 10,
    labelInterval = 30,
    showMinorTicks = true,  // When false, only major ticks (at labelInterval) are shown
    minorTickInterval = 5,  // When showMinorTicks true: 2 or 5 (degrees between minor ticks)
    protractorRotation = 0,
    labelColor = '#333',  // Font color for degree labels
    showRotationRing = true,  // Toggle rotation ring visibility
    rotationRingRadiusFactor = 1.1,  // Ring radius as multiple of protractor radius (ring diameter = 2 * radiusPixels * this)
    defaultRotation,          // Initial rotation in degrees (overrides protractorRotation for initial mount)
    labelFontSize = '12gc',  // Font size in GC units
    majorTickLength = '15gc',  // Length of major ticks in GC
    minorTickLength = '8gc',   // Length of minor ticks in GC
    majorTickWidth = '2gc',    // Width of major ticks in GC
    minorTickWidth = '1gc',    // Width of minor ticks in GC
    tickLabelGap = '5gc',      // Gap between ticks and degree labels (in gc)
    showSecondaryLabels = false,  // Secondary scale: 180 - primary (semicircular only)
    primarySecondaryLabelGap = '5gc',  // Gap in gc between primary and secondary label
    secondaryLabelColor = '#1919FF',   // Font color for secondary labels
    showCenterSemicircle = false,      // Small semicircle at protractor center
    centerSemicircleRadius = '10gc',   // Radius of center semicircle (gc)
    centerSemicircleThickness = '3gc', // Stroke thickness of center semicircle (gc)
    showCenterCrosshair = true,        // Crosshair at center (inside semicircle)
    centerCrosshairThickness = '3gc',  // Line thickness of center crosshair (gc)
    centerCrosshairLength,             // Total length in gc (optional; default 1.8x semicircle radius)
    showLabelToSemicircleLines = false, // Lines from primary/secondary labels to center semicircle
    labelToSemicircleLineGap = '5gc',  // Gap in gc between line end and label
    showSecondaryLabelToSemicircleLines = false, // Lines at in-between angles
    secondaryLabelToSemicircleLineGap = '5gc',  // Gap in gc for outer end of secondary lines
    primarySemicircleToSemicircleLineGap = '5gc',   // Gap in gc between primary line inner end and center semicircle
    secondarySemicircleToSemicircleLineGap = '5gc', // Gap in gc between secondary line inner end and center semicircle
    showCenterHotspot = false,
    centerHotspotSize = '20gc',
    centerHotspotBorderThickness = '8gc',
    centerHotspotBorderColor = 'orange',
    centerHotspotBackground = 'white',
    hotspotBlink = false,              // When true and hotspot visible, animate hotspot with blink
    showBaseline = false,
    baselineBlink = false,             // When true and baseline visible, blink the baseline
    scaleLabelHighlightSequence = false, // When true, highlight primary labels one by one (left to right)
    secondaryLabelHighlightSequence = false, // When true, highlight secondary labels one by one (right to left)
    secondaryLabelHighlightScalePop = false,
    labelHighlightDurationMs = 300,
    labelHighlightFontScale = 1.15,
    labelHighlightColor,
    scaleStepHighlight = false,
    baselineColor = '#333',
    baselineThickness = '2gc',
    baselineLabelGap = '5gc',
    
    // Interactive Configuration (or from interaction group)
    mode = 'interactive',
    isDraggable = true,
    isRotatable = true,
    isProtractorRotatable = false,
    showProtractorRotationHandle = false,
    
    // Measurement Arm Configuration (nested object; use measurementArm.show to toggle visibility)
    measurementArm = {
      show: true,
      showArmLine: true,     // When false, hide only the arm line (circle at end remains visible)
      length: 'auto',        // 'auto', number (viewBox units), or e.g. '200gc'
      thickness: '3gc',     // Stroke width: number (viewBox units) or e.g. '3gc', '6gc'
      color: '#FF0000',
      angle: 0,
      startDeg: 0,           // Starting degree (initial angle) - NEW
      style: 'solid',        // 'solid' or 'dashed'
      extendable: false,     // Can extend beyond protractor edge
      rotatable: true,       // When false, measurement arm cannot be rotated by user (drag/ring)
      zIndex: 10,            // Higher than protractor body (protractor body is at 5)
      // Circle at arm end (arrowhead): size, blink, border
      circleSize: null,      // Radius in gc (e.g. '8gc'); null = use default (extendable ? 8 : 5 viewBox)
      circleBlink: false,
      circleBorderColor: null,  // e.g. 'orange', 'white'; color of the circle border
      circleBorderThickness: null, // in gc (e.g. '4gc'); thickness of circle border; null = no border / 0
      snapAngle: null,       // When set (e.g. 50), arm snaps to this angle when within snapTolerance
      snapTolerance: null,   // Degrees (e.g. 5); when arm within this of snapAngle, snap to snapAngle
      // Angle display configuration
      angleDisplay: {
        show: true,
        size: '28gc',        // Font size in GC units
        color: null,         // Color (null = use arm color)
        paddingX: null,      // X padding in viewBox units or e.g. '6gc' (null = size * 0.8)
        paddingY: null,      // Y padding in viewBox units or e.g. '6gc'
        background: 'rgba(255,255,255,0.45)',  // Label background (e.g. 'white', 'rgba(255,255,255,0.9)')
        gap: null            // Gap between circle and label: viewBox units or e.g. '8gc' (null = 5% of arm length)
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
    snapPoint,        // Optional single snap point for center: [x, y] or {x, y} in grid coordinates; if center within snapTolerance, snap here
    snapTolerance,    // Radius in gc (e.g. 50 or "50gc"); if center is within this distance of snapPoint, snap to snapPoint
    snapRotationAngle,   // Optional angle in degrees; when rotation ends within snapRotationTolerance of this angle, snap to it
    snapRotationTolerance, // Tolerance in degrees (e.g. 5); if current rotation is within this of snapRotationAngle on release, snap
    snapMode = 'free',  // 'free', 'fixed', 'hybrid'
    snapThreshold = 50,  // Distance in pixels to trigger snap (for snapPoints array)
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
    onSnapToRotation,     // Called when rotation snaps to snapRotationAngle (during drag or on release): (angle) => {}
    onAnimateToReady,     // Called with (animateTo) so parent can call animateTo(coordinates, durationMs) to move center to coordinates
    onAnimateToComplete,  // Called when programmatic move animation finishes
    onAnimateRotationReady,   // Called with (animateRotation) so parent can call animateRotation(angleDeg, durationMs) to rotate base to angle
    onAnimateRotationComplete, // Called when programmatic rotation animation finishes
    onAnimateArmReady,        // Called with (animateArmTo) so parent can call animateArmTo(angleDeg, durationMs) to rotate measurement arm to angle
    onAnimateArmComplete,    // Called when measurement arm angle animation finishes
    onArmSnapToAngle,        // Called when measurement arm snaps to snapAngle (during drag or on release): (angle) => {}
    freezeArmCircleAtMarkedPosition = false, // When true, freeze arm-end circle at first visible screen position
    syncRotationFromConfig = true, // When false, do not overwrite rotation from props (e.g. page 3 after user has animated rotation)
    persistRotationKey, // When set (e.g. 'page3ProtractorRotation'), we write final rotation to window[key] and use it as initial state on mount so rotation survives remounts
    
    // Rotation ring handle styling
    rotationRingHandleSize = 28,        // Size in px or e.g. '28gc' (diameter)
    rotationRingHandleBorderColor = 'white',
    rotationRingHandleBorderThickness = 3, // px or e.g. '3gc'
    rotationRingHandleBackground = 'rgba(255, 140, 0, 0.95)',
    rotationRingHandleBlink = false,
    
    // Additional props
    onClick,
    cursor = 'move',
    opacity = 1
  } = flatProps;

  // Calculate initial angle from props
  const initialAngle = React.useMemo(() => {
    return measurementArm.startDeg !== undefined ? measurementArm.startDeg : 
           (measurementArm.angle !== undefined ? measurementArm.angle : 
           (armAngle !== undefined ? armAngle : 0));
  }, [measurementArm.startDeg, measurementArm.angle, armAngle]);

  // State (defaultRotation sets initial protractor angle when provided; persistRotationKey restores after remount)
  const getInitialRotation = () => {
    const persistedValue = (typeof window !== 'undefined' && persistRotationKey) ? window[persistRotationKey] : undefined;
    const hasPersisted = typeof persistedValue === 'number';
    const fallbackValue = defaultRotation !== undefined ? defaultRotation : protractorRotation;
    const result = hasPersisted ? persistedValue : fallbackValue;
    console.log('[Protractor] getInitialRotation CALLED', {
      persistRotationKey,
      persistedValue,
      hasPersisted,
      defaultRotation,
      protractorRotation,
      fallbackValue,
      result,
      syncRotationFromConfig,
      windowPage3PartState: typeof window !== 'undefined' ? window.page3PartState : 'N/A'
    });
    return result;
  };
  const [currentArmAngle, setCurrentArmAngle] = React.useState(initialAngle);
  const [currentProtractorRotation, setCurrentProtractorRotation] = React.useState(getInitialRotation);
  const [currentArmLength, setCurrentArmLength] = React.useState(null); // Track custom arm length (null means use default 1.5x)
  const [isRotatingArm, setIsRotatingArm] = React.useState(false);
  const [isRotatingProtractor, setIsRotatingProtractor] = React.useState(false);
  const [isExtendingArm, setIsExtendingArm] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragSnapOverridePx, setDragSnapOverridePx] = React.useState(null); // When set, Draggable uses this for position during drag (visual snap)
  const [nearestSnapPoint, setNearestSnapPoint] = React.useState(null);
  const [currentPosition, setCurrentPosition] = React.useState(null); // Track position after drag/snap
  const [isInitializedToSnapPoint, setIsInitializedToSnapPoint] = React.useState(false); // Track if we initialized to a snap point
  const [frozenArmCirclePos, setFrozenArmCirclePos] = React.useState(null); // { leftPct, topPct } viewport-relative frozen circle position
  const [positionTransitionMs, setPositionTransitionMs] = React.useState(null); // When set, container uses CSS transition for left/top
  const [rotationTransitionMs, setRotationTransitionMs] = React.useState(null);  // When set, face wrapper uses CSS transition for transform (rotation)
  const containerRef = React.useRef(null);
  const animateToCompleteRef = React.useRef(null);
  const animateToTimeoutRef = React.useRef(null);
  const animateRotationCompleteRef = React.useRef(null);
  const animateRotationTimeoutRef = React.useRef(null);
  const isAnimatingRotationRef = React.useRef(false); // Skip sync effect during programmatic rotation
  const rotationSnapFiredRef = React.useRef(false);   // Fire onSnapToRotation only once per drag gesture
  const currentProtractorRotationRef = React.useRef(currentProtractorRotation);
  currentProtractorRotationRef.current = currentProtractorRotation;
  const mountedWithPersistedRotationRef = React.useRef(
    typeof window !== 'undefined' && persistRotationKey && typeof window[persistRotationKey] === 'number'
  ); // Track if we mounted with a persisted rotation (skip initial transition to avoid visual snap)
  const justFinishedProgrammaticRotationRef = React.useRef(false); // Skip transition for one frame after animation ends so 360°→0° doesn't animate
  const currentArmAngleRef = React.useRef(currentArmAngle);
  currentArmAngleRef.current = currentArmAngle;
  const isAnimatingArmRef = React.useRef(false);
  const animateArmRafRef = React.useRef(null);

  // Merge legacy props with new nested measurementArm object (top-level angleDisplay from spawn options overrides)
  const armConfig = React.useMemo(() => {
    const startAngle = measurementArm.startDeg !== undefined ? measurementArm.startDeg : 
                      (measurementArm.angle !== undefined ? measurementArm.angle : 
                      (armAngle !== undefined ? armAngle : 0));
    
    const angleDisplayFromArm = measurementArm.angleDisplay || {};
    const angleDisplayTopLevel = props.angleDisplay || {};
    const angleDisplayConfig = { ...angleDisplayFromArm, ...angleDisplayTopLevel };
    
    return {
      show: measurementArm.show !== undefined ? measurementArm.show : (showArm !== undefined ? showArm : true),
      showArmLine: measurementArm.showArmLine !== undefined ? measurementArm.showArmLine : true,
      length: measurementArm.length || armLength || 'auto',
      thickness: measurementArm.thickness !== undefined ? measurementArm.thickness : '3gc',
      color: measurementArm.color || armColor || '#FF0000',
      startDeg: startAngle,
      style: measurementArm.style || 'solid',
      extendable: measurementArm.extendable !== undefined ? measurementArm.extendable : false,
      rotatable: measurementArm.rotatable !== false,
      zIndex: measurementArm.zIndex !== undefined ? measurementArm.zIndex : 10,
      circleSize: measurementArm.circleSize,
      circleBlink: measurementArm.circleBlink === true,
      circleBorderColor: measurementArm.circleBorderColor,
      circleBorderThickness: measurementArm.circleBorderThickness,
      snapAngle: measurementArm.snapAngle,
      snapTolerance: measurementArm.snapTolerance,
      angleDisplay: {
        show: angleDisplayConfig.show !== undefined ? angleDisplayConfig.show : true,
        size: angleDisplayConfig.size || '28gc',
        color: angleDisplayConfig.color || measurementArm.color || armColor || '#FF0000',
        paddingX: angleDisplayConfig.paddingX,
        paddingY: angleDisplayConfig.paddingY,
        background: angleDisplayConfig.background !== undefined ? angleDisplayConfig.background : 'rgba(255,255,255,0.45)',
        gap: angleDisplayConfig.gap
      }
    };
  }, [measurementArm, showArm, armLength, armColor, armAngle, props.angleDisplay]);

  // Baseline configuration (separate from arm)
  const baselineConfig = React.useMemo(() => {
    return {
      show: baseline.show !== undefined ? baseline.show : false,
      color: baseline.color || '#999999',
      style: baseline.style || 'dashed',
      width: baseline.width !== undefined ? baseline.width : 1
    };
  }, [baseline]);

  // Sync rotation from props when updated (defaultRotation or protractorRotation from config). Skip when syncRotationFromConfig is false (e.g. page 3 after align steps).
  React.useEffect(() => {
    if (syncRotationFromConfig === false) {
      console.log('[Protractor] Sync rotation SKIPPED (syncRotationFromConfig=false)', { id: id || elementName });
      return;
    }
    if (isAnimatingRotationRef.current) {
      console.log('[Protractor] Sync rotation SKIPPED (programmatic animation in progress)', { id: id || elementName });
      return;
    }
    const value = defaultRotation !== undefined ? defaultRotation : protractorRotation;
    setCurrentProtractorRotation(value);
    console.log('[Protractor] Sync rotation from props', { value, from: defaultRotation !== undefined ? 'defaultRotation' : 'protractorRotation', id: id || elementName });
    if (baselineConfig.show && typeof value === 'number') {
      console.log('[Protractor] Baseline rotation applied:', { value, id: id || elementName });
    }
  }, [syncRotationFromConfig, defaultRotation, protractorRotation, baselineConfig.show, id, elementName]);
  React.useEffect(() => {
    if (isAnimatingArmRef.current) return; // Don't overwrite during programmatic arm animation
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

  // Normalize snapPoint (single center snap) and convert snapTolerance (gc) to pixels
  const snapPointConfig = React.useMemo(() => {
    const point = snapPoint == null ? null : Array.isArray(snapPoint)
      ? { x: snapPoint[0], y: snapPoint[1] }
      : (typeof snapPoint === 'object' && snapPoint !== null && 'x' in snapPoint && 'y' in snapPoint)
        ? { x: snapPoint.x, y: snapPoint.y }
        : null;
    if (point == null) return { point: null, tolerancePx: null };
    const rawTolerance = snapTolerance !== undefined && snapTolerance !== null
      ? snapTolerance
      : 50; // default 50gc when snapPoint is set
    const tolerancePx = typeof rawTolerance === 'number'
      ? processGcProperty(`${rawTolerance}gc`, 'width')
      : processGcProperty(rawTolerance, 'width');
    return { point, tolerancePx: typeof tolerancePx === 'number' && !isNaN(tolerancePx) ? tolerancePx : 50 };
  }, [snapPoint, snapTolerance, processGcProperty]);

  const radiusPixels = React.useMemo(() => {
    const processed = processGcProperty(radius, 'width');
    const finalRadius = !isNaN(processed) && processed > 0 ? processed : 100;
    console.log('🔍 Radius calculation:', { radius, processed, finalRadius });
    return finalRadius;
  }, [radius, processGcProperty]);

  // Arm length in viewBox units (MeasurementArm viewBox is -150..150, so 300 units = 2*radiusPixels). Final length is 1.2x.
  const ARM_LENGTH_FACTOR = 1.75;
  const armLengthInViewBox = React.useMemo(() => {
    let viewBoxLength;
    if (currentArmLength !== null) {
      viewBoxLength = currentArmLength;
    } else {
      const configLength = armConfig.length;
      if (configLength === 'auto') {
        const lengthPx = radiusPixels * 0.8;
        viewBoxLength = (lengthPx * 150) / (radiusPixels > 0 ? radiusPixels : 150);
      } else if (typeof configLength === 'number') {
        viewBoxLength = configLength;
      } else if (typeof configLength === 'string' && configLength.includes('gc')) {
        const lengthPx = processGcProperty(configLength, 'width');
        if (!isNaN(lengthPx) && lengthPx > 0 && radiusPixels > 0) {
          viewBoxLength = (lengthPx * 150) / radiusPixels;
        } else {
          viewBoxLength = 80;
        }
      } else {
        const parsed = processGcProperty(configLength, 'width');
        viewBoxLength = !isNaN(parsed) && parsed > 0 ? parsed : 80;
      }
      if (armConfig.extendable) {
        viewBoxLength = viewBoxLength * 1.5;
      }
    }
    return viewBoxLength * ARM_LENGTH_FACTOR;
  }, [currentArmLength, armConfig.length, armConfig.extendable, radiusPixels, processGcProperty]);

  const armLengthPixels = armLengthInViewBox;

  // Arm thickness (stroke width) in viewBox units for MeasurementArm SVG
  const armThicknessInViewBox = React.useMemo(() => {
    const t = armConfig.thickness;
    if (typeof t === 'number' && t > 0) return t;
    if (typeof t === 'string' && t.includes('gc')) {
      const thicknessPx = processGcProperty(t, 'width');
      if (!isNaN(thicknessPx) && thicknessPx > 0 && radiusPixels > 0) {
        return (thicknessPx * 150) / radiusPixels;
      }
    }
    const parsed = typeof t === 'string' ? processGcProperty(t, 'width') : (typeof t === 'number' ? t : NaN);
    if (!isNaN(parsed) && parsed > 0 && radiusPixels > 0) {
      return (parsed * 150) / radiusPixels;
    }
    return 3; // default strokeWidth in viewBox units
  }, [armConfig.thickness, radiusPixels, processGcProperty]);

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

  // Programmatic move: animate protractor center to given coordinates over duration (ms). Coordinates are grid [x, y] (1-based).
  const animateTo = React.useCallback((coordinates, durationMs) => {
    if (!Array.isArray(coordinates) || coordinates.length < 2 || typeof durationMs !== 'number' || durationMs < 0) return;
    if (animateToTimeoutRef.current) {
      clearTimeout(animateToTimeoutRef.current);
      animateToTimeoutRef.current = null;
    }
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    const xPercent = ((coordinates[0] - 1) / gridCols) * 100;
    const yPercent = ((coordinates[1] - 1) / gridRows) * 100;
    const targetPosition = { left: `${xPercent}%`, top: `${yPercent}%` };
    animateToCompleteRef.current = onAnimateToComplete || null;
    setPositionTransitionMs(durationMs);
    requestAnimationFrame(() => {
      setCurrentPosition(targetPosition);
    });
    if (durationMs > 0) {
      animateToTimeoutRef.current = setTimeout(() => {
        animateToTimeoutRef.current = null;
        setPositionTransitionMs(null);
        if (animateToCompleteRef.current) {
          animateToCompleteRef.current();
          animateToCompleteRef.current = null;
        }
      }, durationMs);
    } else {
      setPositionTransitionMs(null);
      if (onAnimateToComplete) onAnimateToComplete();
    }
  }, [onAnimateToComplete]);

  React.useEffect(() => {
    if (onAnimateToReady && typeof onAnimateToReady === 'function') {
      onAnimateToReady(animateTo);
    }
  }, [onAnimateToReady, animateTo]);

  // Programmatic rotation: animate protractor base to given angle (degrees) over duration (ms).
  // Resultant angle after animation: the protractor base will be at angleDeg (0-360: 0=right, 90=up, 180=left).
  // Uses shortest path (e.g. 330°→45° goes +75° not -285°).
  const animateRotation = React.useCallback((angleDeg, durationMs) => {
    if (typeof angleDeg !== 'number' || typeof durationMs !== 'number' || durationMs < 0) return;
    const current = currentProtractorRotationRef.current;
    const normalize = (a) => { let n = a % 360; if (n < 0) n += 360; return n; };
    const currentNorm = normalize(current);
    const targetNorm = normalize(angleDeg);
    console.log('[Protractor] animateRotation CALLED', {
      requestedAngle: angleDeg,
      durationMs,
      currentRotationFromRef: current,
      currentNorm,
      targetNorm,
      expectedResultantAngle: targetNorm + '° (protractor base aligned at ' + targetNorm + '°; 0=right, 90=up, 180=left)'
    });
    if (animateRotationTimeoutRef.current) {
      clearTimeout(animateRotationTimeoutRef.current);
      animateRotationTimeoutRef.current = null;
      console.log('[Protractor] animateRotation: cleared previous timeout');
    }
    const delta = targetNorm - currentNorm;
    // Transition target must be current + adjusted delta so CSS takes shortest path (never use raw angleDeg: -30° and 330° are the same)
    const adjustedDelta = delta > 180 ? delta - 360 : delta < -180 ? delta + 360 : delta;
    const target = current + adjustedDelta;
    if (delta === 0) {
      console.log('[Protractor] animateRotation: already at target angle (e.g. -30° === 330°), no animation');
      if (onAnimateRotationComplete) onAnimateRotationComplete();
      return;
    }
    // Persist target so if component remounts (e.g. on state change), new instance uses this angle
    if (typeof window !== 'undefined' && persistRotationKey) {
      window[persistRotationKey] = targetNorm;
      console.log('[Protractor] animateRotation: PERSISTED rotation to window', { persistRotationKey, targetNorm, windowValue: window[persistRotationKey] });
    }
    if (adjustedDelta !== delta) {
      console.log('[Protractor] animateRotation: shortest path', { delta, adjustedDelta, target, targetNorm, currentNorm });
    }
    isAnimatingRotationRef.current = true;
    animateRotationCompleteRef.current = onAnimateRotationComplete || null;
    console.log('[Protractor] animateRotation: applying', {
      currentNorm,
      targetNorm,
      delta,
      adjustedDelta,
      targetUsedForTransition: target,
      rotationTransitionMs: durationMs
    });
    setRotationTransitionMs(durationMs);
    requestAnimationFrame(() => {
      setCurrentProtractorRotation(target);
      console.log('[Protractor] animateRotation: requestAnimationFrame set state', { target });
    });
    if (durationMs > 0) {
      animateRotationTimeoutRef.current = setTimeout(() => {
        animateRotationTimeoutRef.current = null;
        console.log('[Protractor] animateRotation: timeout fired, snapping to targetNorm', { targetNorm });
        justFinishedProgrammaticRotationRef.current = true; // Skip transition on next render so 360°→0° doesn't animate
        setRotationTransitionMs(null);
        setCurrentProtractorRotation(targetNorm); // Snap to normalized 0-360 for consistency
        if (typeof window !== 'undefined' && persistRotationKey) {
          window[persistRotationKey] = targetNorm;
          console.log('[Protractor] animateRotation timeout: RE-PERSISTED rotation to window', { persistRotationKey, targetNorm, windowValue: window[persistRotationKey] });
        }
        // Defer clearing so the sync effect (which would reset to config rotation) doesn't overwrite this result
        requestAnimationFrame(() => {
          setTimeout(() => {
            isAnimatingRotationRef.current = false;
            console.log('[Protractor] animateRotation: isAnimatingRotationRef set to false (sync effect will run on next prop change)');
          }, 0);
        });
        if (animateRotationCompleteRef.current) {
          animateRotationCompleteRef.current();
          animateRotationCompleteRef.current = null;
        }
      }, durationMs);
    } else {
      setRotationTransitionMs(null);
      setCurrentProtractorRotation(targetNorm);
      requestAnimationFrame(() => {
        setTimeout(() => { isAnimatingRotationRef.current = false; }, 0);
      });
      if (onAnimateRotationComplete) onAnimateRotationComplete();
    }
  }, [onAnimateRotationComplete, persistRotationKey]);

  React.useEffect(() => {
    if (onAnimateRotationReady && typeof onAnimateRotationReady === 'function') {
      onAnimateRotationReady(animateRotation);
    }
  }, [onAnimateRotationReady, animateRotation]);

  // Programmatic measurement arm rotation: animate arm to target angle over durationMs
  const animateArmTo = React.useCallback((angleDeg, durationMs) => {
    if (typeof angleDeg !== 'number' || typeof durationMs !== 'number' || durationMs < 0) return;
    const current = currentArmAngleRef.current;
    const normalize = (a) => { let n = a % 360; if (n < 0) n += 360; return n; };
    const currentNorm = normalize(current);
    const targetNorm = normalize(angleDeg);
    let delta = targetNorm - currentNorm;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const targetAngle = current + delta;
    if (delta === 0) {
      if (onAnimateArmComplete) onAnimateArmComplete();
      return;
    }
    if (animateArmRafRef.current) cancelAnimationFrame(animateArmRafRef.current);
    isAnimatingArmRef.current = true;
    const startTime = performance.now();
    const startAngle = current;
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeInOutQuad(t);
      const angle = startAngle + (targetAngle - startAngle) * eased;
      setCurrentArmAngle(angle);
      if (t < 1) {
        animateArmRafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrentArmAngle(targetNorm);
        isAnimatingArmRef.current = false;
        animateArmRafRef.current = null;
        if (onAnimateArmComplete) onAnimateArmComplete();
      }
    };
    animateArmRafRef.current = requestAnimationFrame(tick);
  }, [onAnimateArmComplete]);

  React.useEffect(() => {
    if (onAnimateArmReady && typeof onAnimateArmReady === 'function') {
      onAnimateArmReady(animateArmTo);
    }
  }, [onAnimateArmReady, animateArmTo]);

  // Handle arm rotation
  const handleArmRotationStart = React.useCallback((e) => {
    if (!isRotatable || !armConfig.rotatable || mode === 'static') return;
    
    e.stopPropagation();
    setIsRotatingArm(true);
  }, [isRotatable, armConfig.rotatable, mode]);

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
    // Arm snap: if within tolerance of armConfig.snapAngle, snap to it (visual only during drag)
    // Do not call onArmSnapToAngle here - only on release, so state advances only when user releases in zone
    const armSnapAngle = armConfig.snapAngle;
    const armSnapTolerance = armConfig.snapTolerance != null ? Number(armConfig.snapTolerance) : 0;
    if (typeof armSnapAngle === 'number' && !isNaN(armSnapAngle) && armSnapTolerance >= 0) {
      const diff = Math.abs(((finalAngle - armSnapAngle + 180) % 360) - 180);
      if (diff <= armSnapTolerance) finalAngle = armSnapAngle;
    }
    setCurrentArmAngle(finalAngle);
    if (onAngleChange) onAngleChange(finalAngle);
  }, [isRotatingArm, snapToDegrees, onAngleChange, currentProtractorRotation, armConfig.snapAngle, armConfig.snapTolerance]);

  const handleArmRotationEnd = React.useCallback(() => {
    const armSnapAngle = armConfig.snapAngle;
    const armSnapTolerance = armConfig.snapTolerance != null ? Number(armConfig.snapTolerance) : 0;
    if (typeof armSnapAngle === 'number' && !isNaN(armSnapAngle) && armSnapTolerance >= 0) {
      const current = currentArmAngleRef.current;
      const diff = Math.abs(((current - armSnapAngle + 180) % 360) - 180);
      if (diff <= armSnapTolerance) {
        setCurrentArmAngle(armSnapAngle);
        if (onAngleChange) onAngleChange(armSnapAngle);
        if (onArmSnapToAngle) onArmSnapToAngle(armSnapAngle);
      }
    }
    setIsRotatingArm(false);
  }, [armConfig.snapAngle, armConfig.snapTolerance, onAngleChange, onArmSnapToAngle]);

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
    if (isRotatable && armConfig.rotatable) {
      setIsRotatingArm(true);
    }
    if (armConfig.extendable) {
      setIsExtendingArm(true);
    }
  }, [mode, isRotatable, armConfig.rotatable, armConfig.extendable]);

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

    const angleCCW = ProtractorUtils.calculateAngleToPoint(
      { x: centerX, y: centerY },
      { x: clientX, y: clientY }
    );
    // CSS rotate() is clockwise; calculateAngleToPoint is counterclockwise. Flip so drag follows handle.
    let angleCW = (360 - angleCCW) % 360;
    // Live snap during drag: if within tolerance of snapRotationAngle, snap to it
    const snapAngle = snapRotationAngle;
    const tolerance = snapRotationTolerance != null ? Number(snapRotationTolerance) : 5;
    if (typeof snapAngle === 'number' && !isNaN(snapAngle) && tolerance >= 0) {
      const diff = Math.abs(((angleCW - snapAngle + 180) % 360) - 180);
      if (diff <= tolerance) {
        angleCW = snapAngle;
        if (!rotationSnapFiredRef.current && onSnapToRotation) {
          rotationSnapFiredRef.current = true;
          onSnapToRotation(snapAngle);
        }
      }
    }
    setCurrentProtractorRotation(angleCW);
    if (onProtractorRotate) onProtractorRotate(angleCW);
  }, [isRotatingProtractor, onProtractorRotate, onSnapToRotation, snapRotationAngle, snapRotationTolerance]);

  const handleProtractorRotationEnd = React.useCallback(() => {
    const current = currentProtractorRotationRef.current;
    const snapAngle = snapRotationAngle;
    const tolerance = snapRotationTolerance != null ? Number(snapRotationTolerance) : 5;
    if (typeof snapAngle === 'number' && !isNaN(snapAngle) && tolerance >= 0) {
      const diff = Math.abs(((current - snapAngle + 180) % 360) - 180);
      if (diff <= tolerance) {
        setCurrentProtractorRotation(snapAngle);
        if (persistRotationKey && typeof window !== 'undefined') {
          window[persistRotationKey] = snapAngle;
        }
        if (onProtractorRotate) onProtractorRotate(snapAngle);
        if (!rotationSnapFiredRef.current && onSnapToRotation) {
          rotationSnapFiredRef.current = true;
          onSnapToRotation(snapAngle);
        }
      }
    }
    rotationSnapFiredRef.current = false; // reset for next gesture
    setIsRotatingProtractor(false);
  }, [snapRotationAngle, snapRotationTolerance, persistRotationKey, onProtractorRotate, onSnapToRotation]);

  // Attach global listeners for protractor rotation
  React.useEffect(() => {
    if (isRotatingProtractor) {
      rotationSnapFiredRef.current = false; // reset so onSnapToRotation can fire once this gesture
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

  // When protractor is no longer rotatable (e.g. state transition to alignMeasurementArm), cancel any
  // active protractor rotation so global listeners are removed. Otherwise rotating the measurement arm
  // immediately after the transition would still move the protractor (listeners from previous gesture).
  React.useEffect(() => {
    if (!isProtractorRotatable) {
      setIsRotatingProtractor(false);
    }
  }, [isProtractorRotatable]);

  // Determine if component should be draggable based on mode
  const shouldBeDraggable = React.useMemo(() => {
    return mode === 'draggable' || mode === 'interactive';
  }, [mode]);

  // Container style (positionTransitionMs enables smooth programmatic move via animateTo)
  const containerStyle = React.useMemo(() => {
    const isHidden = opacity === 0;
    const baseStyle = {
      position: 'absolute',
      width: `${radiusPixels * 2.5}px`,
      height: `${radiusPixels * 2.5}px`,
      zIndex: zIndex,
      cursor: shouldBeDraggable ? cursor : (isRotatable ? 'crosshair' : 'default'),
      pointerEvents: mode === 'static' || isHidden ? 'none' : 'auto',
      opacity: opacity,
      visibility: isHidden ? 'hidden' : 'visible',
      transform: 'translate(-50%, -50%)'
    };

    if (position) {
      baseStyle.left = position.left;
      baseStyle.top = position.top;
    }
    if (positionTransitionMs != null && positionTransitionMs > 0) {
      baseStyle.transition = `left ${positionTransitionMs}ms ease, top ${positionTransitionMs}ms ease`;
    }

    return baseStyle;
  }, [radiusPixels, zIndex, cursor, position, mode, shouldBeDraggable, isRotatable, opacity, positionTransitionMs]);

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
    showMinorTicks,
    minorTickInterval,
    rotation: 0,
    labelColor,  // Pass labelColor prop
    labelFontSize,  // Pass font size
    majorTickLength,  // Pass major tick length
    minorTickLength,  // Pass minor tick length
    majorTickWidth,   // Pass major tick width
    minorTickWidth,   // Pass minor tick width
    tickLabelGap,     // Gap between ticks and labels (gc)
    showSecondaryLabels,
    primarySecondaryLabelGap,
    secondaryLabelColor,
    showCenterSemicircle,
    centerSemicircleRadius,
    centerSemicircleThickness,
    showCenterCrosshair,
    centerCrosshairThickness,
    centerCrosshairLength,
    showLabelToSemicircleLines,
    labelToSemicircleLineGap,
    showSecondaryLabelToSemicircleLines,
    secondaryLabelToSemicircleLineGap,
    primarySemicircleToSemicircleLineGap,
    secondarySemicircleToSemicircleLineGap,
    showCenterHotspot,
    centerHotspotSize,
    centerHotspotBorderThickness,
    centerHotspotBorderColor,
    centerHotspotBackground,
    hotspotBlink,
    showBaseline,
    baselineBlink,
    scaleLabelHighlightSequence,
    secondaryLabelHighlightSequence,
    secondaryLabelHighlightScalePop,
    labelHighlightDurationMs,
    labelHighlightFontScale,
    labelHighlightColor,
    scaleStepHighlight,
    baselineColor,
    baselineThickness,
    baselineLabelGap
  });
  
  // When syncRotationFromConfig is false, prefer persisted value (window[persistRotationKey]) so rotation survives remounts
  const persistedRotation = (typeof window !== 'undefined' && persistRotationKey && typeof window[persistRotationKey] === 'number')
    ? window[persistRotationKey]
    : null;
  const displayRotation = (rotationTransitionMs != null)
    ? currentProtractorRotation
    : (syncRotationFromConfig === false && persistedRotation !== null
      ? persistedRotation
      : (syncRotationFromConfig === false
        ? currentProtractorRotation
        : (!isProtractorRotatable && (defaultRotation !== undefined || (typeof protractorRotation === 'number'))
          ? (defaultRotation !== undefined ? defaultRotation : protractorRotation)
          : currentProtractorRotation)));
  // Wrap protractor face in a div that has pointer-events to allow dragging
  // Skip transition when: (1) mounted with persisted rotation, or (2) just finished programmatic rotation (avoids 360°→0° animating)
  const skipInitialTransition = mountedWithPersistedRotationRef.current;
  const skipTransitionAfterAnimation = justFinishedProgrammaticRotationRef.current;
  const rotationTransitionStyle = rotationTransitionMs != null && rotationTransitionMs > 0
    ? `transform ${rotationTransitionMs}ms ease`
    : (isRotatingProtractor || skipInitialTransition || skipTransitionAfterAnimation ? 'none' : 'transform 0.2s ease');
  // Clear "just finished programmatic rotation" after one paint so we don't skip transition on later renders
  React.useEffect(() => {
    if (justFinishedProgrammaticRotationRef.current) {
      const id = requestAnimationFrame(() => {
        justFinishedProgrammaticRotationRef.current = false;
      });
      return () => cancelAnimationFrame(id);
    }
  }, [rotationTransitionMs]); // When rotationTransitionMs goes from number to null, we may have set the ref
  // Clear "mounted with persisted rotation" after first render so future rotations can animate
  React.useEffect(() => {
    if (mountedWithPersistedRotationRef.current) {
      const timeoutId = setTimeout(() => {
        mountedWithPersistedRotationRef.current = false;
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, []);
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
      transform: `rotate(${displayRotation}deg)`,
      transition: rotationTransitionStyle
    }
  }, protractorFace);
  
  // Start protractor body rotation from ring (no Ctrl required when isProtractorRotatable)
  const handleRingStartProtractorRotation = React.useCallback((e) => {
    e.stopPropagation();
    if (isProtractorRotatable && mode !== 'static') setIsRotatingProtractor(true);
  }, [isProtractorRotatable, mode]);

  const ringRotatesProtractor = isProtractorRotatable;
  const ringRotationAction = ringRotatesProtractor ? handleRingStartProtractorRotation : handleArmRotationStart;
  const ringTitle = ringRotatesProtractor ? 'Drag the ring or handle to rotate the protractor' : 'Drag the ring or handle to rotate the measurement arm';

  // Handle position on ring: at angle displayRotation (0° = right; where baseline meets the circle)
  const handleAngleRad = (displayRotation ?? 0) * (Math.PI / 180);
  const ringHandleLeftPct = 50 + 50 * Math.cos(handleAngleRad);
  const ringHandleTopPct = 50 + 50 * Math.sin(handleAngleRad);

  const ringHandleSizePx = typeof rotationRingHandleSize === 'number' ? rotationRingHandleSize : processGcProperty(rotationRingHandleSize, 'width');
  const ringHandleBorderPx = typeof rotationRingHandleBorderThickness === 'number' ? rotationRingHandleBorderThickness : processGcProperty(rotationRingHandleBorderThickness, 'width');

  // Create a visible rotation ring: rotates protractor body (if isProtractorRotatable) or measurement arm
  const rotationRingSizePx = radiusPixels * 2 * rotationRingRadiusFactor;
  const rotationRing = (isRotatable || isProtractorRotatable) && showRotationRing && React.createElement('div', {
    key: 'rotation-ring',
    style: {
      position: 'absolute',
      width: `${rotationRingSizePx}px`,
      height: `${rotationRingSizePx}px`,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none', // let children receive events
      zIndex: 15,
      boxSizing: 'border-box'
    }
  }, [
    // Ring band: thicker dashed border so it’s visible and easier to hit
    React.createElement('div', {
      key: 'ring-band',
      onMouseDown: (e) => {
        e.stopPropagation();
        if (ringRotatesProtractor) { ringRotationAction(e); return; }
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        const outerRadius = rect.width / 2;
        const innerRadius = outerRadius * 0.82;
        if (distance >= innerRadius && distance <= outerRadius) handleArmRotationStart(e);
      },
      onTouchStart: (e) => {
        if (ringRotatesProtractor) { e.stopPropagation(); ringRotationAction(e); return; }
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(touch.clientX - centerX, 2) + Math.pow(touch.clientY - centerY, 2));
        const outerRadius = rect.width / 2;
        const innerRadius = outerRadius * 0.82;
        if (distance >= innerRadius && distance <= outerRadius) handleArmRotationStart(e);
      },
      style: {
        position: 'absolute',
        inset: 0,
        border: '6px dashed rgba(255, 120, 80, 0.85)',
        borderRadius: '50%',
        cursor: 'grab',
        pointerEvents: 'auto',
        boxSizing: 'border-box',
        background: 'transparent'
      },
      title: ringTitle
    }),
    // Visible rotation handle on the ring: at displayRotation so it sits where baseline meets the circle
    React.createElement('div', {
      key: 'ring-handle',
      ...(rotationRingHandleBlink ? { className: 'protractor-hotspot-blink' } : {}),
      onMouseDown: (e) => { e.stopPropagation(); ringRotationAction(e); },
      onTouchStart: (e) => { e.stopPropagation(); ringRotationAction(e); },
      style: {
        position: 'absolute',
        left: `${ringHandleLeftPct}%`,
        top: `${ringHandleTopPct}%`,
        transform: 'translate(-50%, -50%)',
        width: `${ringHandleSizePx}px`,
        height: `${ringHandleSizePx}px`,
        borderRadius: '50%',
        background: rotationRingHandleBackground,
        border: `${ringHandleBorderPx}px solid ${rotationRingHandleBorderColor}`,
        boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
        cursor: 'grab',
        pointerEvents: 'auto',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      title: ringTitle
    }, React.createElement('svg', { width: Math.max(8, Math.min(24, ringHandleSizePx - 4)), height: Math.max(8, Math.min(24, ringHandleSizePx - 4)), viewBox: '0 0 24 24', fill: 'none', stroke: rotationRingHandleBorderColor, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: 'M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2' })
    ))
  ]);

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

  // Process angle display size from GC units: gc → pixels, then pixels → viewBox units for MeasurementArm SVG
  const angleDisplaySizePixels = React.useMemo(() => {
    const size = armConfig.angleDisplay.size;
    const fallbackPx = 28; // Match default 28gc when conversion fails
    if (typeof size === 'string' && size.includes('gc')) {
      const processed = processGcProperty(size, 'fontSize');
      let num;
      if (typeof processed === 'string') {
        num = parseFloat(processed.replace(/px/g, '').trim());
        num = !isNaN(num) ? num : fallbackPx;
      } else {
        num = typeof processed === 'number' && !isNaN(processed) ? processed : fallbackPx;
      }
      const requestedGc = parseFloat(String(size).replace(/gc/g, '').trim());
      if (!isNaN(requestedGc) && requestedGc >= 28) {
        return Math.max(num, 28);
      }
      return num;
    }
    return typeof size === 'number' ? size : fallbackPx;
  }, [armConfig.angleDisplay.size, processGcProperty]);

  // MeasurementArm SVG uses viewBox="-150 -150 300 300"; container size is radiusPixels*2.5. Convert px → viewBox units so 28gc renders at correct visual size.
  const angleDisplaySizeViewBox = React.useMemo(() => {
    if (!radiusPixels || radiusPixels <= 0) return 28;
    const containerPx = radiusPixels * 2.5;
    const viewBoxSize = 300;
    return (angleDisplaySizePixels * viewBoxSize) / containerPx;
  }, [angleDisplaySizePixels, radiusPixels]);

  // Angle display padding and gap in viewBox units (from measurementArm.angleDisplay)
  const angleDisplayPaddingViewBox = React.useMemo(() => {
    const toViewBox = (val) => {
      if (val == null) return null;
      if (typeof val === 'number' && val >= 0) return val;
      if (typeof val === 'string' && val.includes('gc')) {
        const px = processGcProperty(val, 'width');
        if (!isNaN(px) && px > 0 && radiusPixels > 0) {
          const containerPx = radiusPixels * 2.5;
          return (px * 300) / containerPx;
        }
      }
      return null;
    };
    return {
      x: toViewBox(armConfig.angleDisplay.paddingX),
      y: toViewBox(armConfig.angleDisplay.paddingY),
      gap: toViewBox(armConfig.angleDisplay.gap)
    };
  }, [armConfig.angleDisplay.paddingX, armConfig.angleDisplay.paddingY, armConfig.angleDisplay.gap, radiusPixels, processGcProperty]);

  // Circle at arm end: size and border thickness in viewBox units (from gc)
  const circleViewBox = React.useMemo(() => {
    const toViewBox = (val) => {
      if (val == null) return null;
      if (typeof val === 'number' && val >= 0) return val;
      if (typeof val === 'string' && val.includes('gc')) {
        const raw = processGcProperty(val, 'width');
        const px = typeof raw === 'string' ? parseFloat(raw) : raw;
        if (!isNaN(px) && px > 0 && radiusPixels > 0) {
          const containerPx = radiusPixels * 2.5;
          return (px * 300) / containerPx;
        }
      }
      return null;
    };
    return {
      radius: toViewBox(armConfig.circleSize),
      borderWidth: toViewBox(armConfig.circleBorderThickness)
    };
  }, [armConfig.circleSize, armConfig.circleBorderThickness, radiusPixels, processGcProperty]);

  const captureFrozenArmCirclePosition = React.useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return null;

    const rect = containerRef.current.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const armAngleRad = currentArmAngleRef.current * (Math.PI / 180);
    const rotationRad = displayRotation * (Math.PI / 180);

    const localX = armLengthPixels * Math.cos(armAngleRad);
    const localY = -armLengthPixels * Math.sin(armAngleRad);

    const rotatedX = localX * Math.cos(rotationRad) - localY * Math.sin(rotationRad);
    const rotatedY = localX * Math.sin(rotationRad) + localY * Math.cos(rotationRad);

    const pxPerViewBoxUnit = rect.width / 300;
    const circleX = centerX + rotatedX * pxPerViewBoxUnit;
    const circleY = centerY + rotatedY * pxPerViewBoxUnit;

    const viewportWidth = window.innerWidth || 1600;
    const viewportHeight = window.innerHeight || 900;

    return {
      leftPct: (circleX / viewportWidth) * 100,
      topPct: (circleY / viewportHeight) * 100
    };
  }, [armLengthPixels, displayRotation]);

  React.useEffect(() => {
    if (freezeArmCircleAtMarkedPosition && armConfig.show) {
      setFrozenArmCirclePos((prev) => prev || captureFrozenArmCirclePosition());
      return;
    }
    setFrozenArmCirclePos(null);
  }, [freezeArmCircleAtMarkedPosition, armConfig.show, captureFrozenArmCirclePosition]);

  const frozenCircleRadiusPx = React.useMemo(() => {
    if (!containerRef.current) return 5;
    const rect = containerRef.current.getBoundingClientRect();
    const radiusViewBox = circleViewBox.radius != null ? circleViewBox.radius : (armConfig.extendable ? 8 : 5);
    return Math.max(2, radiusViewBox * (rect.width / 300));
  }, [circleViewBox.radius, armConfig.extendable, frozenArmCirclePos]);

  const frozenCircleBorderPx = React.useMemo(() => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const borderViewBox = circleViewBox.borderWidth != null ? circleViewBox.borderWidth : (armConfig.extendable ? 2 : 0);
    return Math.max(0, borderViewBox * (rect.width / 300));
  }, [circleViewBox.borderWidth, armConfig.extendable, frozenArmCirclePos]);

  const frozenArmCircleElement = (freezeArmCircleAtMarkedPosition && frozenArmCirclePos && armConfig.show) ? React.createElement('div', {
    key: 'frozen-arm-circle',
    style: {
      position: 'fixed',
      left: `${frozenArmCirclePos.leftPct}%`,
      top: `${frozenArmCirclePos.topPct}%`,
      width: `${frozenCircleRadiusPx * 2}px`,
      height: `${frozenCircleRadiusPx * 2}px`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: armConfig.color,
      border: frozenCircleBorderPx > 0 ? `${frozenCircleBorderPx}px solid ${armConfig.circleBorderColor || (armConfig.extendable ? 'white' : 'transparent')}` : 'none',
      pointerEvents: 'none',
      zIndex: Number(zIndex || 5000) + 20,
      opacity: opacity
    },
    className: armConfig.circleBlink ? 'protractor-hotspot-blink' : undefined
  }) : null;

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

  // Arm color: green when within snap tolerance, else use prop color
  const armSnapAngle = armConfig.snapAngle;
  const armSnapTolerance = armConfig.snapTolerance != null ? Number(armConfig.snapTolerance) : 0;
  let armWithinTolerance = false;
  if (typeof armSnapAngle === 'number' && !isNaN(armSnapAngle) && armSnapTolerance >= 0) {
    const diff = Math.abs(((currentArmAngle - armSnapAngle + 180) % 360) - 180);
    armWithinTolerance = diff <= armSnapTolerance;
  }
  const armColorToUse = armWithinTolerance ? 'green' : armConfig.color;

  const measurementArmElement = armConfig.show && React.createElement(MeasurementArm, {
    angle: currentArmAngle,
    length: armLengthPixels,
    strokeWidth: armThicknessInViewBox,  // Arm line thickness in viewBox units
    showArmLine: armConfig.showArmLine !== false,
    color: armColorToUse,
    style: armConfig.style,        // 'solid' or 'dashed'
    extendable: armConfig.extendable,
    zIndex: armConfig.zIndex,      // Higher than protractor body
    circleRadius: circleViewBox.radius,       // viewBox units; null = default (extendable ? 8 : 5)
    circleBlink: armConfig.circleBlink,
    circleBorderColor: armConfig.circleBorderColor,
    circleBorderWidth: circleViewBox.borderWidth, // viewBox units
    showCircle: !freezeArmCircleAtMarkedPosition,
    showAngleDisplay: armConfig.angleDisplay.show,
    angleDisplaySize: angleDisplaySizeViewBox,  // In viewBox units so SVG text matches 28gc visually
    angleDisplayColor: armConfig.angleDisplay.color,
    angleDisplayPaddingX: angleDisplayPaddingViewBox.x,
    angleDisplayPaddingY: angleDisplayPaddingViewBox.y,
    angleDisplayBackground: armConfig.angleDisplay.background,
    angleDisplayGap: angleDisplayPaddingViewBox.gap,
    anglePrecision,
    isRotating: isRotatingArm || isExtendingArm,  // Show feedback for both actions
    onRotationStart: (isRotatable && armConfig.rotatable) ? handleArmRotationStart : null,  // Rotation via arm line
    onArrowheadStart: (isRotatable && armConfig.rotatable || armConfig.extendable) ? handleArrowheadStart : null,  // Combined handler for arrowhead
    protractorRotation: displayRotation,  // Match visible rotation (from props when not user-rotatable)
    rotationTransitionMs: rotationTransitionMs,  // Sync arm rotation transition with protractor body
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
    setDragSnapOverridePx(null);
    // Reset initialization flag on first drag so snapping works normally
    if (isInitializedToSnapPoint) {
      setIsInitializedToSnapPoint(false);
    }
  }, [isInitializedToSnapPoint]);

  const handleDragMove = React.useCallback((id, pos) => {
    if (!isDragging) return;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;

    // Live snap: when snapPoint + tolerance are set, snap as soon as center enters the tolerance circle
    if (snapPointConfig.point != null && snapPointConfig.tolerancePx != null) {
      const containerEl = typeof document !== 'undefined' && document.querySelector && document.querySelector('.main-container');
      const containerRect = containerEl ? containerEl.getBoundingClientRect() : null;
      const refWidth = containerRect ? containerRect.width : viewportWidth;
      const refHeight = containerRect ? containerRect.height : viewportHeight;
      const refLeft = containerRect ? containerRect.left : 0;
      const refTop = containerRect ? containerRect.top : 0;
      const sp = snapPointConfig.point;
      const snapPixelX = refLeft + ((sp.x - 1) / gridCols) * refWidth;
      const snapPixelY = refTop + ((sp.y - 1) / gridRows) * refHeight;
      const tolerancePx = containerRect
        ? (snapPointConfig.tolerancePx / viewportWidth) * refWidth
        : snapPointConfig.tolerancePx;
      const distance = Math.sqrt(
        Math.pow(pos.x - snapPixelX, 2) +
        Math.pow(pos.y - snapPixelY, 2)
      );
      if (distance <= tolerancePx) {
        const xPercent = ((sp.x - 1) / gridCols) * 100;
        const yPercent = ((sp.y - 1) / gridRows) * 100;
        setCurrentPosition({ left: `${xPercent}%`, top: `${yPercent}%` });
        setDragSnapOverridePx({ x: snapPixelX, y: snapPixelY }); // so Draggable shows snap position during drag
        setNearestSnapPoint(null);
        return;
      }
    }
    setDragSnapOverridePx(null);

    // Convert pixel position to grid position for snapPoints array (if used)
    const gridX = (pos.x / viewportWidth) * gridCols;
    const gridY = (pos.y / viewportHeight) * gridRows;
    const currentGridPos = { x: gridX, y: gridY };
    const nearest = findNearestSnapPoint(currentGridPos);
    setNearestSnapPoint(nearest);
  }, [isDragging, findNearestSnapPoint, snapPointConfig]);

  const handleDragEnd = React.useCallback((id, pos) => {
    setIsDragging(false);
    setDragSnapOverridePx(null);

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

    const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;

    // Use the same container as the app's percentage layout (e.g. .main-container) so snap/drop coords match
    const containerEl = typeof document !== 'undefined' && document.querySelector && document.querySelector('.main-container');
    const containerRect = containerEl ? containerEl.getBoundingClientRect() : null;
    const refWidth = containerRect ? containerRect.width : viewportWidth;
    const refHeight = containerRect ? containerRect.height : viewportHeight;
    const refLeft = containerRect ? containerRect.left : 0;
    const refTop = containerRect ? containerRect.top : 0;

    // If snapPoint + snapTolerance are set: snap center to snapPoint when within tolerance
    // snapPoint uses same 1-based grid coords as animateTo (so [1100, 675] matches animateTo([1100, 675]))
    if (snapPointConfig.point != null && snapPointConfig.tolerancePx != null) {
      const sp = snapPointConfig.point;
      // Snap point in viewport pixels (same space as pos = clientX/clientY)
      const snapPixelX = refLeft + ((sp.x - 1) / gridCols) * refWidth;
      const snapPixelY = refTop + ((sp.y - 1) / gridRows) * refHeight;
      const distance = Math.sqrt(
        Math.pow(pos.x - snapPixelX, 2) +
        Math.pow(pos.y - snapPixelY, 2)
      );
      // When layout is in a container, scale tolerance so 60gc matches container (not full viewport)
      const tolerancePx = containerRect
        ? (snapPointConfig.tolerancePx / viewportWidth) * refWidth
        : snapPointConfig.tolerancePx;
      if (distance <= tolerancePx) {
        setNearestSnapPoint(null);
        const xPercent = ((sp.x - 1) / gridCols) * 100;
        const yPercent = ((sp.y - 1) / gridRows) * 100;
        setCurrentPosition({
          left: `${xPercent}%`,
          top: `${yPercent}%`
        });
        const snappedPos = { x: snapPixelX, y: snapPixelY };
        if (onSnapToPoint) onSnapToPoint({ x: sp.x, y: sp.y });
        if (onPositionChange) onPositionChange(snappedPos, { x: sp.x, y: sp.y });
        return snappedPos;
      }
    }

    if (snapMode === 'free') {
      setNearestSnapPoint(null);
      // Update position to where it was dropped (use container when present so % matches layout)
      const xPercent = containerRect ? ((pos.x - refLeft) / refWidth) * 100 : (pos.x / viewportWidth) * 100;
      const yPercent = containerRect ? ((pos.y - refTop) / refHeight) * 100 : (pos.y / viewportHeight) * 100;
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
  }, [snapMode, snapPoints, snapPointConfig, findNearestSnapPoint, onPositionChange, onSnapToPoint, isInitializedToSnapPoint, currentPosition]);

  // Wrap in draggable if needed
  if (shouldBeDraggable && window.DraggableComponent?.Draggable) {
    const Draggable = window.DraggableComponent.Draggable;
    
    return React.createElement(React.Fragment, null, [
      // Snap indicators (rendered globally)
      snapIndicators,
      frozenArmCircleElement,
      
      // Draggable protractor
      React.createElement(Draggable, {
        key: 'draggable-protractor',
        draggableId: id || `protractor-${elementName}-${currentPage}`,
        isDisabled: !isDraggable || mode === 'static',
        style: containerStyle,
        className: 'protractor-component',
        centerOnMouse: true, // NEW: Always center protractor on mouse pointer
        dragPositionOverride: dragSnapOverridePx,
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
    frozenArmCircleElement,
    
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

