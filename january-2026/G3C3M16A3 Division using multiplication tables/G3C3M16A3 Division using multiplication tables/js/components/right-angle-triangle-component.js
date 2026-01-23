/**
 * Triangle Component - React 18 Optimized
 * 
 * A flexible triangle component that supports any triangle type (acute, obtuse, right-angle)
 * with multiple input methods:
 * - sides: [a, b, c] - Three side lengths (uses Law of Cosines to calculate vertices)
 * - vertices: [[x1,y1], [x2,y2], [x3,y3]] - Direct vertex coordinates
 * - sas: { side1, angle, side2 } - Two sides and included angle (SAS)
 * 
 * Features:
 * - Automatic right-angle detection with optional marker
 * - Configurable side colors and line styles
 * - Vertex labels (A, B, C)
 * - Side labels (a, b, c)
 * - Various callbacks for interaction
 * - Full backward compatibility with RightAngleTriangleComponent
 */

// Dependencies: React, GridCellFontUtils, GridPrecisionConfig

(function() {
  'use strict';

  // ============================================================================
  // UTILITY FUNCTIONS (scoped to IIFE to prevent global namespace pollution)
  // ============================================================================

  /**
   * Check if three sides form a valid triangle (triangle inequality theorem)
   */
  function isValidTriangle(a, b, c) {
    return a + b > c && b + c > a && a + c > b && a > 0 && b > 0 && c > 0;
  }

  /**
   * Check if a triangle is a right-angle triangle using Pythagorean theorem
   * Returns the index of the right angle vertex if found, -1 otherwise
   */
  function findRightAngleVertex(sides) {
    const [a, b, c] = sides.map(s => s * s); // Square all sides
    const tolerance = 0.0001;
    
    // Check all three combinations
    if (Math.abs(a + b - c) < tolerance * c) return 2; // Right angle opposite to side c (at vertex C)
    if (Math.abs(a + c - b) < tolerance * b) return 1; // Right angle opposite to side b (at vertex B)
    if (Math.abs(b + c - a) < tolerance * a) return 0; // Right angle opposite to side a (at vertex A)
    
    return -1; // Not a right triangle
  }

  /**
   * Calculate angle using Law of Cosines
   * cos(C) = (a² + b² - c²) / (2ab)
   * Returns angle in radians
   */
  function calculateAngleFromSides(a, b, c) {
    const cosC = (a * a + b * b - c * c) / (2 * a * b);
    // Clamp to [-1, 1] to handle floating point errors
    const clampedCosC = Math.max(-1, Math.min(1, cosC));
    return Math.acos(clampedCosC);
  }

  /**
   * Calculate vertices from three side lengths using Law of Cosines
   * Places vertex A at origin, vertex B along positive x-axis
   * Returns array of [x, y] coordinates for each vertex
   */
  function calculateVerticesFromSides(sides, multiplier) {
    multiplier = multiplier || 1;
    const [a, b, c] = sides.map(s => s * multiplier);
    
    // Validate triangle
    if (!isValidTriangle(a, b, c)) {
      console.warn('⚠️ [Triangle] Invalid triangle sides:', sides);
      return null;
    }
    
    // Place vertex A at origin (this will be repositioned later)
    // Place vertex B along positive x-axis at distance c
    // Calculate vertex C using angle at A
    
    // Angle at A (angle between sides b and c)
    const angleA = calculateAngleFromSides(b, c, a);
    
    // Vertices in local coordinate system
    const vertexA = [0, 0];
    const vertexB = [c, 0]; // Along x-axis
    const vertexC = [b * Math.cos(angleA), b * Math.sin(angleA)];
    
    return [vertexA, vertexB, vertexC];
  }

  /**
   * Calculate vertices from SAS (Side-Angle-Side) input
   * side1 and side2 are the two sides, angle is the included angle in degrees
   */
  function calculateVerticesFromSAS(sas, multiplier) {
    multiplier = multiplier || 1;
    const { side1, angle, side2 } = sas;
    const s1 = side1 * multiplier;
    const s2 = side2 * multiplier;
    const angleRad = (angle * Math.PI) / 180;
    
    // Place first vertex at origin
    // Second vertex along positive x-axis at distance s1
    // Third vertex at angle from first vertex
    const vertexA = [0, 0];
    const vertexB = [s1, 0];
    const vertexC = [s2 * Math.cos(angleRad), s2 * Math.sin(angleRad)];
    
    return [vertexA, vertexB, vertexC];
  }

  /**
   * Transform vertices to fit within container based on position anchor
   * Now includes automatic scaling to fit the container while maintaining proportions
   */
  function transformVerticesToContainer(localVertices, coordinates, position, rotation, autoFit) {
    rotation = rotation || 0;
    autoFit = autoFit !== false; // Default to true
    const [x1, y1, x2, y2] = coordinates;
    const containerWidth = x2 - x1;
    const containerHeight = y2 - y1;
    const padding = 50; // Padding from edges
    
    // Find bounding box of local vertices
    const xs = localVertices.map(v => v[0]);
    const ys = localVertices.map(v => v[1]);
    const minX = Math.min.apply(null, xs);
    const maxX = Math.max.apply(null, xs);
    const minY = Math.min.apply(null, ys);
    const maxY = Math.max.apply(null, ys);
    const localWidth = maxX - minX;
    const localHeight = maxY - minY;
    
    // Calculate scale factor to fit container (maintaining proportions)
    var scaleFactor = 1;
    if (autoFit && localWidth > 0 && localHeight > 0) {
      const availableWidth = containerWidth - (padding * 2);
      const availableHeight = containerHeight - (padding * 2);
      const scaleX = availableWidth / localWidth;
      const scaleY = availableHeight / localHeight;
      scaleFactor = Math.min(scaleX, scaleY); // Use smaller scale to fit both dimensions
    }
    
    // Scale vertices around their centroid
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    var scaledVertices = localVertices.map(function(v) {
      return [
        cx + (v[0] - cx) * scaleFactor,
        cy + (v[1] - cy) * scaleFactor
      ];
    });
    
    // Apply rotation if specified
    var rotatedVertices = scaledVertices;
    if (rotation !== 0) {
      const rotRad = (rotation * Math.PI) / 180;
      const cos = Math.cos(rotRad);
      const sin = Math.sin(rotRad);
      // Rotate around centroid
      const scaledXs = scaledVertices.map(v => v[0]);
      const scaledYs = scaledVertices.map(v => v[1]);
      const scaledCx = (Math.min.apply(null, scaledXs) + Math.max.apply(null, scaledXs)) / 2;
      const scaledCy = (Math.min.apply(null, scaledYs) + Math.max.apply(null, scaledYs)) / 2;
      rotatedVertices = scaledVertices.map(function(v) {
        const dx = v[0] - scaledCx;
        const dy = v[1] - scaledCy;
        return [
          scaledCx + dx * cos - dy * sin,
          scaledCy + dx * sin + dy * cos
        ];
      });
    }
    
    // Recalculate bounding box after scaling and rotation
    const rotXs = rotatedVertices.map(v => v[0]);
    const rotYs = rotatedVertices.map(v => v[1]);
    const rotMinX = Math.min.apply(null, rotXs);
    const rotMaxX = Math.max.apply(null, rotXs);
    const rotMinY = Math.min.apply(null, rotYs);
    const rotMaxY = Math.max.apply(null, rotYs);
    const rotWidth = rotMaxX - rotMinX;
    const rotHeight = rotMaxY - rotMinY;
    
    // Calculate offset based on position anchor
    var offsetX, offsetY;
    
    switch (position) {
      case 'bottom-left':
        offsetX = x1 + padding - rotMinX;
        offsetY = y2 - padding - rotMaxY;
        break;
      case 'bottom-right':
        offsetX = x2 - padding - rotMaxX;
        offsetY = y2 - padding - rotMaxY;
        break;
      case 'top-left':
        offsetX = x1 + padding - rotMinX;
        offsetY = y1 + padding - rotMinY;
        break;
      case 'top-right':
        offsetX = x2 - padding - rotMaxX;
        offsetY = y1 + padding - rotMinY;
        break;
      case 'center':
        offsetX = x1 + (containerWidth - rotWidth) / 2 - rotMinX;
        offsetY = y1 + (containerHeight - rotHeight) / 2 - rotMinY;
        break;
      default:
        offsetX = x1 + padding - rotMinX;
        offsetY = y2 - padding - rotMaxY;
    }
    
    // Apply offset to all vertices
    return rotatedVertices.map(function(v) {
      return [v[0] + offsetX, v[1] + offsetY];
    });
  }

  /**
   * Calculate side lengths from vertices
   */
  function calculateSideLengthsFromVertices(vertices) {
    const v0 = vertices[0];
    const v1 = vertices[1];
    const v2 = vertices[2];
    
    function dist(p1, p2) {
      return Math.sqrt(
        Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)
      );
    }
    
    return [
      dist(v0, v1), // Side opposite to vertex C (between A and B)
      dist(v1, v2), // Side opposite to vertex A (between B and C)
      dist(v2, v0)  // Side opposite to vertex B (between C and A)
    ];
  }

  // ============================================================================
  // MAIN COMPONENT
  // ============================================================================

  var TriangleComponent = React.memo(function(props) {
    // Function to convert LaTeX fractions to HTML fractions
    var convertLatexFractions = function(text) {
      if (!text || typeof text !== 'string') return text;
      
      // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
      // Match pattern: $...$ and replace all \frac{}{} inside
      var result = text.replace(/\$([^$]+)\$/g, function(match, content) {
        // Replace all \frac{numerator}{denominator} patterns within the $...$ block
        var fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
        var convertedContent = content.replace(fractionPattern, function(fracMatch, numerator, denominator) {
          // Create HTML fraction with proper styling
          return '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">' +
            '<span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">' + numerator + '</span>' +
            '<span style="display: block; padding: 0 2px;">' + denominator + '</span>' +
            '</span>';
        });
        // Replace LaTeX commands with their symbols
        var finalContent = convertedContent.replace(/\\times/g, '×');
        finalContent = finalContent.replace(/\\cdot/g, '·');
        return finalContent; // Return without the $ delimiters
      });
      
      // Also handle standalone fractions outside $...$ blocks (backward compatibility)
      var standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
      result = result.replace(standaloneFractionPattern, function(match, numerator, denominator) {
        return '<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">' +
          '<span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">' + numerator + '</span>' +
          '<span style="display: block; padding: 0 2px;">' + denominator + '</span>' +
          '</span>';
      });
      
      return result;
    };
    
    // Support both nested and flat props for backward compatibility
    var id = props.id;
    var elementName = props.elementName;
    var currentPage = props.currentPage;
    var coordinates = props.coordinates || [100, 100, 600, 500];
    var zIndex = props.zIndex || 50;
    
    // Input methods (provide ONE)
    var sides = props.sides;
    var inputVertices = props.vertices;
    var sas = props.sas;
    
    // Transformation
    var autoFit = props.autoFit !== false; // Default to true - automatically fit triangle to container
    var multiplier = props.multiplier || (autoFit ? 1 : 10); // When autoFit is true, multiplier is just for initial calculation
    var positionProp = props.position;
    var rotation = props.rotation || 0;
    var rightAnglePosition = props.rightAnglePosition; // Backward compatibility alias for position
    
    // Side styling - support nested or flat
    var sideColor = props.sideColor;
    var sideWidth = props.sideWidth;
    var sideStyle = props.sideStyle;
    var sideLineJoin = props.sideLineJoin;
    var showVertices = props.showVertices;
    var vertexColor = props.vertexColor;
    var vertexSize = props.vertexSize;
    var sideBlink = props.sideBlink;
    var sideBlinkDuration = props.sideBlinkDuration;
    var side = props.side || {};
    
    // Vertex labels - support nested or flat
    var showVertexLabels = props.showVertexLabels;
    var vertexLabels = props.vertexLabels;
    var vertexLabelColor = props.vertexLabelColor;
    var vertexLabelFontSize = props.vertexLabelFontSize;
    var vertexLabelFontStyle = props.vertexLabelFontStyle;
    var vertexLabelFontWeight = props.vertexLabelFontWeight;
    var vertexLabelFontFamily = props.vertexLabelFontFamily;
    var vertexLabelTextDecoration = props.vertexLabelTextDecoration;
    var vertexLabelOffset = props.vertexLabelOffset;
    var vertexLabelRotation = props.vertexLabelRotation;
    var vertexLabel = props.vertexLabel || {};
    
    // Side labels - support nested or flat
    var showSideLabels = props.showSideLabels;
    var sideLabels = props.sideLabels;
    var sideLabelColor = props.sideLabelColor;
    var sideLabelFontSize = props.sideLabelFontSize;
    var sideLabelFontStyle = props.sideLabelFontStyle;
    var sideLabelFontWeight = props.sideLabelFontWeight;
    var sideLabelFontFamily = props.sideLabelFontFamily;
    var sideLabelTextDecoration = props.sideLabelTextDecoration;
    var sideLabelOffset = props.sideLabelOffset;
    var sideLabelRotation = props.sideLabelRotation;
    var sideLabelBackgroundColor = props.sideLabelBackgroundColor;
    var sideLabelBorderColor = props.sideLabelBorderColor;
    var sideLabelBorderWidth = props.sideLabelBorderWidth;
    var sideLabelBorderRadius = props.sideLabelBorderRadius;
    var sideLabelPadding = props.sideLabelPadding;
    var sideLabelBlink = props.sideLabelBlink;
    var sideLabelBlinkDuration = props.sideLabelBlinkDuration;
    var sideLabel = props.sideLabel || {};
    
    // Right angle marker - support nested or flat
    var showRightAngleMarker = props.showRightAngleMarker;
    var rightAngleMarkerSize = props.rightAngleMarkerSize;
    var rightAngleMarkerColor = props.rightAngleMarkerColor;
    var rightAngleMarker = props.rightAngleMarker || {};
    
    // Angle labels - support nested or flat
    var showAngleLabels = props.showAngleLabels;
    var angleLabels = props.angleLabels; // Array of labels for each vertex angle, e.g., ['', '30°', '60°']
    var angleLabelColor = props.angleLabelColor;
    var angleLabelFontSize = props.angleLabelFontSize;
    var angleLabelFontWeight = props.angleLabelFontWeight;
    var angleLabelFontFamily = props.angleLabelFontFamily;
    var angleLabelOffset = props.angleLabelOffset;
    var angleLabelBlink = props.angleLabelBlink;
    var angleLabelBlinkDuration = props.angleLabelBlinkDuration;
    var angleLabel = props.angleLabel || {};
    
    // Angle arc markers - support nested or flat
    var showAngleArcs = props.showAngleArcs;
    var angleArcRadius = props.angleArcRadius;
    var angleArcColor = props.angleArcColor;
    var angleArcWidth = props.angleArcWidth;
    var angleArc = props.angleArc || {};
    
    // Altitude (perpendicular from vertex to opposite side) - support nested or flat
    var showAltitude = props.showAltitude;
    var altitudeFromVertex = props.altitudeFromVertex; // 0, 1, or 2 (vertex index) or 'A', 'B', 'C'
    var altitudeColor = props.altitudeColor;
    var altitudeWidth = props.altitudeWidth;
    var altitudeStyle = props.altitudeStyle; // 'solid', 'dashed', 'dotted'
    var showAltitudeFoot = props.showAltitudeFoot; // Show marker at foot of altitude
    var altitudeFootSize = props.altitudeFootSize;
    var altitudeFootColor = props.altitudeFootColor;
    var showAltitudeFootLabel = props.showAltitudeFootLabel; // Show label at foot of altitude
    var altitudeFootLabel = props.altitudeFootLabel; // Label text (e.g., 'D', 'H', 'P')
    var altitudeFootLabelColor = props.altitudeFootLabelColor;
    var altitudeFootLabelFontSize = props.altitudeFootLabelFontSize;
    var altitudeFootLabelFontWeight = props.altitudeFootLabelFontWeight;
    var altitudeFootLabelOffset = props.altitudeFootLabelOffset; // Can be number or [horizontal, vertical]
    var altitudeFootLabelOffsetX = props.altitudeFootLabelOffsetX; // Horizontal offset
    var altitudeFootLabelOffsetY = props.altitudeFootLabelOffsetY; // Vertical offset
    var showAltitudeSegmentLabels = props.showAltitudeSegmentLabels; // Show labels for segments created by altitude
    var altitudeSegmentLabels = props.altitudeSegmentLabels; // Array of two labels, e.g., ['AD', 'DB']
    var altitudeSegmentLabelColor = props.altitudeSegmentLabelColor;
    var altitudeSegmentLabelFontSize = props.altitudeSegmentLabelFontSize;
    var altitudeSegmentLabelFontWeight = props.altitudeSegmentLabelFontWeight;
    var altitudeSegmentLabelOffset = props.altitudeSegmentLabelOffset; // Can be number or [x, y] array
    var altitudeSegmentLabelOffsetX = props.altitudeSegmentLabelOffsetX; // Horizontal offset
    var altitudeSegmentLabelOffsetY = props.altitudeSegmentLabelOffsetY; // Vertical offset
    var showAltitudeRightAngle = props.showAltitudeRightAngle; // Show right angle marker at foot
    var altitudeRightAngleSize = props.altitudeRightAngleSize;
    var altitudeRightAngleColor = props.altitudeRightAngleColor;
    var altitudeBlink = props.altitudeBlink; // Blink animation for altitude
    var altitudeBlinkDuration = props.altitudeBlinkDuration; // Duration of blink animation
    var altitudeSegmentLabelBlink = props.altitudeSegmentLabelBlink; // Blink animation for segment labels (can be boolean or array [label1, label2])
    var altitudeSegmentLabelBlinkDuration = props.altitudeSegmentLabelBlinkDuration; // Duration of blink animation for segment labels
    var showAltitudeLineLabel = props.showAltitudeLineLabel; // Show label on the altitude line itself
    var altitudeLineLabel = props.altitudeLineLabel; // Label text for the altitude line (e.g., 'CD', '16√3 cm')
    var altitudeLineLabelColor = props.altitudeLineLabelColor;
    var altitudeLineLabelFontSize = props.altitudeLineLabelFontSize;
    var altitudeLineLabelFontWeight = props.altitudeLineLabelFontWeight;
    var altitudeLineLabelOffsetX = props.altitudeLineLabelOffsetX; // Horizontal offset from midpoint
    var altitudeLineLabelOffsetY = props.altitudeLineLabelOffsetY; // Vertical offset from midpoint
    var altitudeLineLabelBlink = props.altitudeLineLabelBlink; // Blink animation for altitude line label
    var altitudeLineLabelBlinkDuration = props.altitudeLineLabelBlinkDuration; // Duration of blink animation
    var altitude = props.altitude || {};
    
    // Callbacks
    var onTriangleClick = props.onTriangleClick;
    var onVertexClick = props.onVertexClick;
    var onSideClick = props.onSideClick;

    // Determine position (with backward compatibility for rightAnglePosition)
    var finalPosition = positionProp || rightAnglePosition || 'bottom-left';

    // ============================================================================
    // CALCULATE VERTICES
    // ============================================================================
    
    var vertexCalcResult = React.useMemo(function() {
      var localVertices = null;
      var sideLengths = null;
      var method = 'unknown';
      
      // Priority: vertices > sas > sides
      if (inputVertices && Array.isArray(inputVertices) && inputVertices.length === 3) {
        // Direct vertex input - scale by multiplier if needed
        localVertices = inputVertices.map(function(v) {
          return [v[0] * multiplier, v[1] * multiplier];
        });
        sideLengths = calculateSideLengthsFromVertices(localVertices);
        method = 'vertices';
      } else if (sas && typeof sas === 'object' && sas.side1 && sas.angle && sas.side2) {
        // SAS input
        localVertices = calculateVerticesFromSAS(sas, multiplier);
        if (localVertices) {
          sideLengths = calculateSideLengthsFromVertices(localVertices);
        }
        method = 'sas';
      } else if (sides && Array.isArray(sides) && sides.length === 3) {
        // Three sides input (default)
        localVertices = calculateVerticesFromSides(sides, multiplier);
        if (localVertices) {
          sideLengths = sides.map(function(s) { return s * multiplier; });
        }
        method = 'sides';
      }
      
      if (!localVertices) {
        console.warn('⚠️ [Triangle] No valid input provided. Using default 3-4-5 triangle.');
        localVertices = calculateVerticesFromSides([3, 4, 5], multiplier);
        sideLengths = [3, 4, 5].map(function(s) { return s * multiplier; });
        method = 'default';
      }
      
      // Transform to container coordinates (with autoFit scaling)
      var transformedVertices = transformVerticesToContainer(
        localVertices, 
        coordinates, 
        finalPosition, 
        rotation,
        autoFit
      );
      
      // Check for right angle (use original side lengths for accuracy)
      var originalSides = sides || (sideLengths ? sideLengths.map(function(s) { return s / multiplier; }) : [3, 4, 5]);
      var rightAngleIdx = findRightAngleVertex(originalSides);
      
      return {
        calculatedVertices: transformedVertices,
        calculatedSides: sideLengths,
        rightAngleVertexIndex: rightAngleIdx,
        inputMethod: method
      };
    }, [inputVertices, sas, sides, multiplier, coordinates, finalPosition, rotation, autoFit]);

    var calculatedVertices = vertexCalcResult.calculatedVertices;
    var calculatedSides = vertexCalcResult.calculatedSides;
    var rightAngleVertexIndex = vertexCalcResult.rightAngleVertexIndex;
    var inputMethod = vertexCalcResult.inputMethod;

    // ============================================================================
    // STYLING PROPS
    // ============================================================================

    // Extract side styling (nested or flat) - with dynamic updates
    var sideColorValue = sideColor || side.color || '#000000';
    var initialSideColor = Array.isArray(sideColorValue) ? sideColorValue : [sideColorValue, sideColorValue, sideColorValue];
    var dynamicSideColorState = React.useState(initialSideColor);
    var dynamicSideColor = dynamicSideColorState[0];
    var setDynamicSideColor = dynamicSideColorState[1];
    
    var sideBlinkValue = sideBlink !== undefined ? sideBlink : (side.blink !== undefined ? side.blink : false);
    var initialSideBlink = Array.isArray(sideBlinkValue) ? sideBlinkValue : [sideBlinkValue, sideBlinkValue, sideBlinkValue];
    var dynamicSideBlinkState = React.useState(initialSideBlink);
    var dynamicSideBlink = dynamicSideBlinkState[0];
    var setDynamicSideBlink = dynamicSideBlinkState[1];
    
    var finalSideColor = dynamicSideColor;
    var finalSideWidth = sideWidth || side.width || '3gc';
    var finalSideStyle = sideStyle || side.style || 'solid';
    var finalSideLineJoin = sideLineJoin || side.lineJoin || 'round';
    var finalShowVertices = showVertices !== undefined ? showVertices : (side.showVertices !== undefined ? side.showVertices : false);
    var finalVertexColor = vertexColor || side.vertexColor || finalSideColor[0];
    var finalVertexSize = vertexSize || side.vertexSize || '6gc';
    var finalSideBlink = dynamicSideBlink;
    var sideBlinkDurationValue = sideBlinkDuration !== undefined ? sideBlinkDuration : (side.blinkDuration !== undefined ? side.blinkDuration : 1);
    var finalSideBlinkDuration = Array.isArray(sideBlinkDurationValue) ? sideBlinkDurationValue : [sideBlinkDurationValue, sideBlinkDurationValue, sideBlinkDurationValue];

    // Extract vertex label props (nested or flat)
    var finalShowVertexLabels = showVertexLabels !== undefined ? showVertexLabels : (vertexLabel.show !== undefined ? vertexLabel.show : true);
    var finalVertexLabels = vertexLabels || vertexLabel.labels || ['A', 'B', 'C'];
    var finalVertexLabelColor = vertexLabelColor || vertexLabel.color || '#000000';
    var finalVertexLabelFontSize = vertexLabelFontSize || vertexLabel.fontSize || '16gc';
    var finalVertexLabelFontStyle = vertexLabelFontStyle || vertexLabel.fontStyle || 'normal';
    var finalVertexLabelFontWeight = vertexLabelFontWeight || vertexLabel.fontWeight || 'bold';
    var finalVertexLabelFontFamily = vertexLabelFontFamily || vertexLabel.fontFamily || 'inherit';
    var finalVertexLabelTextDecoration = vertexLabelTextDecoration || vertexLabel.textDecoration || 'none';
    var vertexLabelOffsetValue = vertexLabelOffset !== undefined ? vertexLabelOffset : (vertexLabel.offset !== undefined ? vertexLabel.offset : 20);
    var finalVertexLabelOffset = Array.isArray(vertexLabelOffsetValue) ? vertexLabelOffsetValue : [vertexLabelOffsetValue, vertexLabelOffsetValue, vertexLabelOffsetValue];
    var vertexLabelRotationValue = vertexLabelRotation !== undefined ? vertexLabelRotation : (vertexLabel.rotation !== undefined ? vertexLabel.rotation : 0);
    // Handle vertex label blink: can be boolean (applies to all) or array [label1, label2, label3]
    var vertexLabelBlinkValue = vertexLabel.blink !== undefined ? vertexLabel.blink : false;
    var finalVertexLabelBlink = Array.isArray(vertexLabelBlinkValue) ? vertexLabelBlinkValue : [vertexLabelBlinkValue, vertexLabelBlinkValue, vertexLabelBlinkValue];
    var finalVertexLabelBlinkDuration = Array.isArray(vertexLabel.blinkDuration) ? vertexLabel.blinkDuration : (vertexLabel.blinkDuration !== undefined ? [vertexLabel.blinkDuration, vertexLabel.blinkDuration, vertexLabel.blinkDuration] : [1, 1, 1]);
    var finalVertexLabelRotation = Array.isArray(vertexLabelRotationValue) ? vertexLabelRotationValue : [vertexLabelRotationValue, vertexLabelRotationValue, vertexLabelRotationValue];

    // Extract side label props (nested or flat) - with dynamic updates
    var dynamicSideLabelsState = React.useState(sideLabels || sideLabel.labels || ['a', 'b', 'c']);
    var dynamicSideLabels = dynamicSideLabelsState[0];
    var setDynamicSideLabels = dynamicSideLabelsState[1];
    
    var sideLabelBlinkValue = sideLabelBlink !== undefined ? sideLabelBlink : (sideLabel.blink !== undefined ? sideLabel.blink : false);
    var initialSideLabelBlink = Array.isArray(sideLabelBlinkValue) ? sideLabelBlinkValue : [sideLabelBlinkValue, sideLabelBlinkValue, sideLabelBlinkValue];
    var dynamicSideLabelBlinkState = React.useState(initialSideLabelBlink);
    var dynamicSideLabelBlink = dynamicSideLabelBlinkState[0];
    var setDynamicSideLabelBlink = dynamicSideLabelBlinkState[1];
    
    var sideLabelColorValue = sideLabelColor || sideLabel.color || '#000000';
    var initialSideLabelColor = Array.isArray(sideLabelColorValue) ? sideLabelColorValue : [sideLabelColorValue, sideLabelColorValue, sideLabelColorValue];
    var dynamicSideLabelColorState = React.useState(initialSideLabelColor);
    var dynamicSideLabelColor = dynamicSideLabelColorState[0];
    var setDynamicSideLabelColor = dynamicSideLabelColorState[1];
    
    // Reset dynamic state when component ID changes (page navigation)
    React.useEffect(function() {
      var currentSideColorValue = sideColor || side.color || '#000000';
      var currentInitialSideColor = Array.isArray(currentSideColorValue) ? currentSideColorValue : [currentSideColorValue, currentSideColorValue, currentSideColorValue];
      
      var currentSideBlinkValue = sideBlink !== undefined ? sideBlink : (side.blink !== undefined ? side.blink : false);
      var currentInitialSideBlink = Array.isArray(currentSideBlinkValue) ? currentSideBlinkValue : [currentSideBlinkValue, currentSideBlinkValue, currentSideBlinkValue];
      
      var currentSideLabelBlinkValue = sideLabelBlink !== undefined ? sideLabelBlink : (sideLabel.blink !== undefined ? sideLabel.blink : false);
      var currentInitialSideLabelBlink = Array.isArray(currentSideLabelBlinkValue) ? currentSideLabelBlinkValue : [currentSideLabelBlinkValue, currentSideLabelBlinkValue, currentSideLabelBlinkValue];
      
      var currentSideLabelColorValue = sideLabelColor || sideLabel.color || '#000000';
      var currentInitialSideLabelColor = Array.isArray(currentSideLabelColorValue) ? currentSideLabelColorValue : [currentSideLabelColorValue, currentSideLabelColorValue, currentSideLabelColorValue];
      
      var currentInitialShowAltitude = showAltitude !== undefined ? showAltitude : (altitude.show !== undefined ? altitude.show : false);
      
      console.log('🔄 [Triangle] Component ID changed to:', id, '- Resetting dynamic state');
      setDynamicSideColor(currentInitialSideColor);
      setDynamicSideBlink(currentInitialSideBlink);
      setDynamicSideLabels(sideLabels || sideLabel.labels || ['a', 'b', 'c']);
      setDynamicSideLabelBlink(currentInitialSideLabelBlink);
      setDynamicSideLabelColor(currentInitialSideLabelColor);
      setDynamicShowAltitude(currentInitialShowAltitude);
    }, [id]);

    // Listen for calculation step changes to update triangle labels
    React.useEffect(function() {
      function handleStepChange(event) {
        var detail = event.detail;
        var currentStepIndex = detail.currentStepIndex;
        var pageNumber = detail.pageNumber;
        if (pageNumber === 10 && currentStepIndex === 4 && id && id.includes('page10')) {
          console.log('🔺 [Triangle] Step 5 reached, updating sideLabel config for', id);
          setDynamicSideLabels(['3 m', '4 m', '5 m']);
          setDynamicSideLabelBlink([true, false, false]);
        }
        // Handle page 10 side label updates (page 3 removed - no changes to triangle)
        if (pageNumber === 10 && id && id.includes('page10')) {
          if (currentStepIndex === 1) {
            // Step 2: Update to ['c', 'a', 'a']
            console.log('🔺 [Triangle] Step 2 reached, updating sideLabel to [c, a, a] for', id);
            setDynamicSideLabels(['c', 'a', 'a']);
          } else if (currentStepIndex === 3) {
            // Step 4: Update to ['a√2', 'a', 'a']
            console.log('🔺 [Triangle] Step 4 reached, updating sideLabel to [a√2, a, a] for', id);
            setDynamicSideLabels(['a√2', 'a', 'a']);
          }
        }
        // Handle page 13 side label updates - update to show all three sides when last step is revealed
        if (pageNumber === 13 && id && id.includes('page13')) {
          if (currentStepIndex === 3) {
            // Last step (step 4, 0-indexed as 3): Update to ['120 m', '130 m', '50 m']
            console.log('🔺 [Triangle] Page 13 last step reached, updating sideLabel to [120 m, 130 m, 50 m] for', id);
            setDynamicSideLabels(['120 m', '130 m', '50 m']);
          }
        }
        // Handle page 12 - make side AB and label orange and blinking when step 2 is revealed, show altitude when step 3 is revealed
        if (pageNumber === 12 && id && id.includes('page12')) {
          if (currentStepIndex === 1) {
            // Step 2 (0-indexed as 1): Make side AB orange and blinking
            console.log('🔺 [Triangle] Page 12 step 2 reached, making side AB orange and blinking for', id);
            setDynamicSideColor(['var(--color-orange)', '#ffffff', '#ffffff']);
            setDynamicSideBlink([true, false, false]);
            setDynamicSideLabelColor(['var(--color-orange)', '#ffffff', '#ffffff']);
            setDynamicSideLabelBlink([true, false, false]);
          } else if (currentStepIndex === 2) {
            // Step 3 (0-indexed as 2): Show altitude
            console.log('🔺 [Triangle] Page 12 step 3 reached, showing altitude for', id);
            setDynamicShowAltitude(true);
          }
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('calculationStepChanged', handleStepChange);
        return function() { window.removeEventListener('calculationStepChanged', handleStepChange); };
      }
    }, [id]);
    
    // Listen for quiz correct answer events
    React.useEffect(function() {
      function handleCorrectAnswer(event) {
        var detail = event.detail;
        var eventQuizId = detail.quizId;
        var pageNumber = detail.pageNumber;
        
        if ((pageNumber === 3 || pageNumber === 10) && (eventQuizId === 'page3-quiz' || eventQuizId === 'page10-calculation-steps') && id && (id.includes('page3-right-triangle') || id.includes('page10-right-triangle'))) {
          console.log('🔺 [Triangle] Correct answer on page ' + pageNumber + ', updating config for', id);
          setDynamicSideColor(['#FF6600', '#FF6600', '#FFFF00']);
          setDynamicSideBlink([false, false, true]);
          setDynamicSideLabelColor(['#FF6600', '#FF6600', '#FFFF00']);
          setDynamicSideLabelBlink([false, false, true]);
          setDynamicSideLabels(['? m', '? m', '5 m']);
        }
        
        if (pageNumber === 4 && eventQuizId === 'page4-quiz' && id && id.includes('page4-right-triangle')) {
          console.log('🔺 [Triangle] Correct answer on page 4, updating config for', id);
          setDynamicSideColor(['#FF6600', '#FFFF00', '#FF6600']);
          setDynamicSideBlink([false, true, false]);
          setDynamicSideLabelColor(['#FF6600', '#FFFF00', '#FF6600']);
          setDynamicSideLabelBlink([false, true, false]);
          setDynamicSideLabels(['? m', '4 m', '5 m']);
        }
        
        if (pageNumber === 5 && eventQuizId === 'page5-quiz' && id && id.includes('page5-right-triangle')) {
          console.log('🔺 [Triangle] Correct answer on page 5, updating config for', id);
          setDynamicSideColor(['#FFFF00', '#FF6600', '#FF6600']);
          setDynamicSideBlink([true, false, false]);
          setDynamicSideLabelColor(['#FFFF00', '#FF6600', '#FF6600']);
          setDynamicSideLabelBlink([true, false, false]);
          setDynamicSideLabels(['? m', '4 m', '5 m']);
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('quizCorrectAnswer', handleCorrectAnswer);
        return function() { window.removeEventListener('quizCorrectAnswer', handleCorrectAnswer); };
      }
    }, [id]);
    
    // Listen for updateTriangleAngleLabel events to update angle labels dynamically
    React.useEffect(function() {
      function handleUpdateAngleLabel(event) {
        var detail = event.detail || {};
        var triangleId = detail.triangleId;
        var angleIndex = detail.angleIndex;
        var newLabel = detail.newLabel;
        var updateFootAngleLabel = detail.updateFootAngleLabel; // Flag to update altitude foot angle label
        
        if (id && id === triangleId) {
          if (angleIndex !== undefined && newLabel !== undefined) {
            console.log('🔺 [Triangle] Updating angle label for', id, 'at index', angleIndex, 'to', newLabel);
            setDynamicAngleLabels(function(prev) {
              var updated = prev.slice(); // Create a copy
              updated[angleIndex] = newLabel;
              return updated;
            });
          }
          
          if (updateFootAngleLabel && newLabel !== undefined) {
            console.log('🔺 [Triangle] Updating altitude foot angle label for', id, 'to', newLabel);
            setDynamicAltitudeFootAngleLabel(newLabel);
          }
        }
      }
      
      if (typeof window !== 'undefined') {
        window.addEventListener('updateTriangleAngleLabel', handleUpdateAngleLabel);
        return function() { window.removeEventListener('updateTriangleAngleLabel', handleUpdateAngleLabel); };
      }
    }, [id]);
    
    // Listen for updateTriangleSideLabel events to update side labels dynamically
    React.useEffect(function() {
      function handleUpdateSideLabel(event) {
        var detail = event.detail || {};
        var triangleId = detail.triangleId;
        var sideIndex = detail.sideIndex;
        var newLabel = detail.newLabel;
        
        if (id && id === triangleId) {
          if (sideIndex !== undefined && newLabel !== undefined) {
            console.log('🔺 [Triangle] Updating side label for', id, 'at index', sideIndex, 'to', newLabel);
            setDynamicSideLabels(function(prev) {
              var updated = prev.slice(); // Create a copy
              updated[sideIndex] = newLabel;
              return updated;
            });
          }
        }
      }
      
      if (typeof window !== 'undefined') {
        window.addEventListener('updateTriangleSideLabel', handleUpdateSideLabel);
        return function() { window.removeEventListener('updateTriangleSideLabel', handleUpdateSideLabel); };
      }
    }, [id]);
    
    // Listen for quizCompleted events to update triangle labels for page 4, page 10, and page 13
    React.useEffect(function() {
      function handleQuizCompleted(event) {
        var detail = event.detail || {};
        var pageNumber = detail.pageNumber;
        
        // Update page 4 triangle labels when quiz is completed
        if (pageNumber === 4 && id && id.includes('page4-right-triangle')) {
          console.log('🔺 [Triangle] Quiz completed on page 4, updating side labels for', id);
          setDynamicSideLabels(['17', '9', '12']);
        }
        
        // Update page 10 triangle labels when quiz is completed
        if (pageNumber === 10 && id && id.includes('page10-right-triangle')) {
          console.log('🔺 [Triangle] Quiz completed on page 10, updating side labels for', id);
          setDynamicSideLabels(['32 cm', '16 cm', '16√3 cm']); // AB = 32 cm, AC = 16 cm, BC = 16√3 cm
          // Change side label colors: yellow for AB and BC, white for AC
          setDynamicSideLabelColor(['#FFFF00', '#ffffff', '#FFFF00']); // Yellow for AB (side0) and BC (side2), white for AC (side1)
          setDynamicSideLabelBlink([false, false, false]); // No blinking
        }
        
        // Update page 13 triangle labels when last step is revealed (quiz completed)
        if (pageNumber === 13 && id && id.includes('page13-right-triangle')) {
          console.log('🔺 [Triangle] Quiz completed on page 13, updating side labels to [120 m, 130 m, 50 m] for', id);
          setDynamicSideLabels(['120 m', '130 m', '50 m']);
        }
        
        // Update page 15 triangle labels when last step is revealed (quiz completed)
        if (pageNumber === 15 && id && id.includes('page15-right-triangle')) {
          console.log('🔺 [Triangle] Quiz completed on page 15, updating side labels to [120 m, 150 m, 90 m] for', id);
          setDynamicSideLabels(['120 m', '150 m', '90 m']);
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('quizCompleted', handleQuizCompleted);
        return function() { window.removeEventListener('quizCompleted', handleQuizCompleted); };
      }
    }, [id]);

    var finalShowSideLabels = showSideLabels !== undefined ? showSideLabels : (sideLabel.show !== undefined ? sideLabel.show : true);
    var finalSideLabels = dynamicSideLabels;
    var finalSideLabelColor = dynamicSideLabelColor;
    var finalSideLabelFontSize = sideLabelFontSize || sideLabel.fontSize || '14gc';
    var finalSideLabelFontStyle = sideLabelFontStyle || sideLabel.fontStyle || 'italic';
    var finalSideLabelFontWeight = sideLabelFontWeight || sideLabel.fontWeight || 'normal';
    var finalSideLabelFontFamily = sideLabelFontFamily || sideLabel.fontFamily || 'inherit';
    var finalSideLabelTextDecoration = sideLabelTextDecoration || sideLabel.textDecoration || 'none';
    var sideLabelOffsetValue = sideLabelOffset !== undefined ? sideLabelOffset : (sideLabel.offset !== undefined ? sideLabel.offset : 25);
    var finalSideLabelOffset = Array.isArray(sideLabelOffsetValue) ? sideLabelOffsetValue : [sideLabelOffsetValue, sideLabelOffsetValue, sideLabelOffsetValue];
    var sideLabelRotationValue = sideLabelRotation !== undefined ? sideLabelRotation : (sideLabel.rotation !== undefined ? sideLabel.rotation : 0);
    var finalSideLabelRotation = Array.isArray(sideLabelRotationValue) ? sideLabelRotationValue : [sideLabelRotationValue, sideLabelRotationValue, sideLabelRotationValue];
    var finalSideLabelBackgroundColor = sideLabelBackgroundColor || sideLabel.backgroundColor || 'rgba(255, 255, 255, 0.8)';
    var finalSideLabelBorderColor = sideLabelBorderColor || sideLabel.borderColor || 'transparent';
    var finalSideLabelBorderWidth = sideLabelBorderWidth || sideLabel.borderWidth || '0';
    var finalSideLabelBorderRadius = sideLabelBorderRadius || sideLabel.borderRadius || '3px';
    var finalSideLabelPadding = sideLabelPadding || sideLabel.padding || '2px 6px';
    var finalSideLabelBlink = dynamicSideLabelBlink;
    var sideLabelBlinkDurationValue = sideLabelBlinkDuration !== undefined ? sideLabelBlinkDuration : (sideLabel.blinkDuration !== undefined ? sideLabel.blinkDuration : 1);
    var finalSideLabelBlinkDuration = Array.isArray(sideLabelBlinkDurationValue) ? sideLabelBlinkDurationValue : [sideLabelBlinkDurationValue, sideLabelBlinkDurationValue, sideLabelBlinkDurationValue];

    // Right angle marker - only show by default if triangle has a right angle
    var hasRightAngle = rightAngleVertexIndex >= 0;
    var finalShowRightAngleMarker = showRightAngleMarker !== undefined 
      ? showRightAngleMarker 
      : (rightAngleMarker.show !== undefined ? rightAngleMarker.show : hasRightAngle);
    var finalRightAngleMarkerSize = rightAngleMarkerSize || rightAngleMarker.size || '15gc';
    var finalRightAngleMarkerColor = rightAngleMarkerColor || rightAngleMarker.color || '#000000';
    // Handle offset: can be number (single value), array [x, y], or separate x/y props
    var rightAngleMarkerOffsetValue = rightAngleMarker.offset !== undefined ? rightAngleMarker.offset : 0;
    var rightAngleMarkerOffsetXValue = rightAngleMarker.offsetX !== undefined ? rightAngleMarker.offsetX : null;
    var rightAngleMarkerOffsetYValue = rightAngleMarker.offsetY !== undefined ? rightAngleMarker.offsetY : null;
    
    var finalRightAngleMarkerOffsetX, finalRightAngleMarkerOffsetY;
    if (rightAngleMarkerOffsetXValue !== null || rightAngleMarkerOffsetYValue !== null) {
      // Use separate x/y if provided
      finalRightAngleMarkerOffsetX = rightAngleMarkerOffsetXValue !== null ? rightAngleMarkerOffsetXValue : 0;
      finalRightAngleMarkerOffsetY = rightAngleMarkerOffsetYValue !== null ? rightAngleMarkerOffsetYValue : 0;
    } else if (Array.isArray(rightAngleMarkerOffsetValue)) {
      // Use array [x, y]
      finalRightAngleMarkerOffsetX = rightAngleMarkerOffsetValue[0] || 0;
      finalRightAngleMarkerOffsetY = rightAngleMarkerOffsetValue[1] || 0;
    } else {
      // Use single value for both (backward compatibility)
      finalRightAngleMarkerOffsetX = rightAngleMarkerOffsetValue;
      finalRightAngleMarkerOffsetY = rightAngleMarkerOffsetValue;
    }
    
    // Handle blink
    var finalRightAngleMarkerBlink = rightAngleMarker.blink !== undefined ? rightAngleMarker.blink : false;
    var finalRightAngleMarkerBlinkDuration = rightAngleMarker.blinkDuration !== undefined ? rightAngleMarker.blinkDuration : 1;
    
    // Angle labels - extract props (nested or flat)
    var finalShowAngleLabels = showAngleLabels !== undefined ? showAngleLabels : (angleLabel.show !== undefined ? angleLabel.show : false);
    // Dynamic state for angle labels (allows runtime updates)
    var initialAngleLabels = angleLabels || angleLabel.labels || ['', '', '']; // Default to no labels
    var dynamicAngleLabelsState = React.useState(initialAngleLabels);
    var dynamicAngleLabels = dynamicAngleLabelsState[0];
    var setDynamicAngleLabels = dynamicAngleLabelsState[1];
    var finalAngleLabels = dynamicAngleLabels;
    var angleLabelColorValue = angleLabelColor || angleLabel.color || '#ffffff';
    // Support both single color and array of colors (one per vertex)
    var finalAngleLabelColor = Array.isArray(angleLabelColorValue) ? angleLabelColorValue : [angleLabelColorValue, angleLabelColorValue, angleLabelColorValue];
    var finalAngleLabelFontSize = angleLabelFontSize || angleLabel.fontSize || '14gc';
    var finalAngleLabelFontWeight = angleLabelFontWeight || angleLabel.fontWeight || 'normal';
    var finalAngleLabelFontFamily = angleLabelFontFamily || angleLabel.fontFamily || 'inherit';
    // Handle offset: can be number (single value), array [x, y], or separate x/y props
    var angleLabelOffsetValue = angleLabelOffset !== undefined ? angleLabelOffset : (angleLabel.offset !== undefined ? angleLabel.offset : 35);
    var angleLabelOffsetXValue = angleLabel.offsetX !== undefined ? angleLabel.offsetX : null;
    var angleLabelOffsetYValue = angleLabel.offsetY !== undefined ? angleLabel.offsetY : null;
    
    // If separate X/Y offsets are provided, use them; otherwise use the standard offset along bisector
    var useDirectOffset = angleLabelOffsetXValue !== null || angleLabelOffsetYValue !== null;
    var finalAngleLabelOffset = Array.isArray(angleLabelOffsetValue) ? angleLabelOffsetValue : [angleLabelOffsetValue, angleLabelOffsetValue, angleLabelOffsetValue];
    
    // Create arrays for direct X/Y offsets (one per vertex)
    // Support both single values and arrays for offsetX/offsetY
    var finalAngleLabelOffsetX = useDirectOffset ? (
      Array.isArray(angleLabelOffsetXValue) ? angleLabelOffsetXValue : [
        angleLabelOffsetXValue !== null ? angleLabelOffsetXValue : 0,
        angleLabelOffsetXValue !== null ? angleLabelOffsetXValue : 0,
        angleLabelOffsetXValue !== null ? angleLabelOffsetXValue : 0
      ]
    ) : null;
    var finalAngleLabelOffsetY = useDirectOffset ? (
      Array.isArray(angleLabelOffsetYValue) ? angleLabelOffsetYValue : [
        angleLabelOffsetYValue !== null ? angleLabelOffsetYValue : 0,
        angleLabelOffsetYValue !== null ? angleLabelOffsetYValue : 0,
        angleLabelOffsetYValue !== null ? angleLabelOffsetYValue : 0
      ]
    ) : null;
    
    // Handle blink for angle labels
    var angleLabelBlinkValue = angleLabelBlink !== undefined ? angleLabelBlink : (angleLabel.blink !== undefined ? angleLabel.blink : false);
    var finalAngleLabelBlink = Array.isArray(angleLabelBlinkValue) ? angleLabelBlinkValue : [angleLabelBlinkValue, angleLabelBlinkValue, angleLabelBlinkValue];
    var angleLabelBlinkDurationValue = angleLabelBlinkDuration !== undefined ? angleLabelBlinkDuration : (angleLabel.blinkDuration !== undefined ? angleLabel.blinkDuration : 1);
    var finalAngleLabelBlinkDuration = Array.isArray(angleLabelBlinkDurationValue) ? angleLabelBlinkDurationValue : [angleLabelBlinkDurationValue, angleLabelBlinkDurationValue, angleLabelBlinkDurationValue];
    
    // Angle arc markers - extract props (nested or flat)
    var finalShowAngleArcs = showAngleArcs !== undefined ? showAngleArcs : (angleArc.show !== undefined ? angleArc.show : false);
    var angleArcRadiusValue = angleArcRadius || angleArc.radius || '25gc';
    var finalAngleArcRadius = Array.isArray(angleArcRadiusValue) ? angleArcRadiusValue : [angleArcRadiusValue, angleArcRadiusValue, angleArcRadiusValue];
    var angleArcColorValue = angleArcColor || angleArc.color || '#ffffff';
    var finalAngleArcColor = Array.isArray(angleArcColorValue) ? angleArcColorValue : [angleArcColorValue, angleArcColorValue, angleArcColorValue];
    var angleArcWidthValue = angleArcWidth || angleArc.width || '2';
    var finalAngleArcWidth = Array.isArray(angleArcWidthValue) ? angleArcWidthValue : [angleArcWidthValue, angleArcWidthValue, angleArcWidthValue];
    // Handle angle arc blink: can be boolean (applies to all) or array [arc1, arc2, arc3]
    var angleArcBlinkValue = angleArc.blink !== undefined ? angleArc.blink : false;
    var finalAngleArcBlink = Array.isArray(angleArcBlinkValue) ? angleArcBlinkValue : [angleArcBlinkValue, angleArcBlinkValue, angleArcBlinkValue];
    var finalAngleArcBlinkDuration = Array.isArray(angleArc.blinkDuration) ? angleArc.blinkDuration : (angleArc.blinkDuration !== undefined ? [angleArc.blinkDuration, angleArc.blinkDuration, angleArc.blinkDuration] : [1, 1, 1]);

    // Altitude (perpendicular) - extract props (nested or flat) - with dynamic updates
    var initialShowAltitude = showAltitude !== undefined ? showAltitude : (altitude.show !== undefined ? altitude.show : false);
    var dynamicShowAltitudeState = React.useState(initialShowAltitude);
    var dynamicShowAltitude = dynamicShowAltitudeState[0];
    var setDynamicShowAltitude = dynamicShowAltitudeState[1];
    var finalShowAltitude = dynamicShowAltitude;
    var altitudeFromVertexValue = altitudeFromVertex !== undefined ? altitudeFromVertex : (altitude.fromVertex !== undefined ? altitude.fromVertex : 2); // Default vertex C (index 2)
    // Convert vertex label to index if needed
    var finalAltitudeFromVertex = (function() {
      var val = altitudeFromVertexValue;
      if (typeof val === 'string') {
        var labelMap = { 'A': 0, 'B': 1, 'C': 2, 'a': 0, 'b': 1, 'c': 2 };
        return labelMap[val] !== undefined ? labelMap[val] : 2;
      }
      return typeof val === 'number' ? val : 2;
    })();
    var finalAltitudeColor = altitudeColor || altitude.color || '#ffffff';
    var finalAltitudeWidth = altitudeWidth || altitude.width || '2gc';
    var finalAltitudeStyle = altitudeStyle || altitude.style || 'dashed';
    var finalShowAltitudeFoot = showAltitudeFoot !== undefined ? showAltitudeFoot : (altitude.showFoot !== undefined ? altitude.showFoot : true);
    var finalAltitudeFootSize = altitudeFootSize || altitude.footSize || '6gc';
    var finalAltitudeFootColor = altitudeFootColor || altitude.footColor || finalAltitudeColor;
    var finalShowAltitudeFootLabel = showAltitudeFootLabel !== undefined ? showAltitudeFootLabel : (altitude.showFootLabel !== undefined ? altitude.showFootLabel : false);
    var finalAltitudeFootLabel = altitudeFootLabel || altitude.footLabel || 'D';
    var finalAltitudeFootLabelColor = altitudeFootLabelColor || altitude.footLabelColor || '#ffffff';
    var finalAltitudeFootLabelFontSize = altitudeFootLabelFontSize || altitude.footLabelFontSize || '24gc';
    var finalAltitudeFootLabelFontWeight = altitudeFootLabelFontWeight || altitude.footLabelFontWeight || 'bold';
    // Handle offset: can be number (single value), array [x, y], or separate x/y props
    var altitudeFootLabelOffsetValue = altitudeFootLabelOffset !== undefined ? altitudeFootLabelOffset : (altitude.footLabelOffset !== undefined ? altitude.footLabelOffset : 25);
    var altitudeFootLabelOffsetXValue = altitudeFootLabelOffsetX !== undefined ? altitudeFootLabelOffsetX : (altitude.footLabelOffsetX !== undefined ? altitude.footLabelOffsetX : null);
    var altitudeFootLabelOffsetYValue = altitudeFootLabelOffsetY !== undefined ? altitudeFootLabelOffsetY : (altitude.footLabelOffsetY !== undefined ? altitude.footLabelOffsetY : null);
    
    // Determine final offsets
    var finalAltitudeFootLabelOffsetX, finalAltitudeFootLabelOffsetY;
    if (altitudeFootLabelOffsetXValue !== null || altitudeFootLabelOffsetYValue !== null) {
      // Use separate x/y if provided
      finalAltitudeFootLabelOffsetX = altitudeFootLabelOffsetXValue !== null ? altitudeFootLabelOffsetXValue : 0;
      finalAltitudeFootLabelOffsetY = altitudeFootLabelOffsetYValue !== null ? altitudeFootLabelOffsetYValue : 0;
    } else if (Array.isArray(altitudeFootLabelOffsetValue)) {
      // Use array [x, y]
      finalAltitudeFootLabelOffsetX = altitudeFootLabelOffsetValue[0] || 0;
      finalAltitudeFootLabelOffsetY = altitudeFootLabelOffsetValue[1] || 0;
    } else {
      // Use single value for both (backward compatibility)
      finalAltitudeFootLabelOffsetX = altitudeFootLabelOffsetValue;
      finalAltitudeFootLabelOffsetY = altitudeFootLabelOffsetValue;
    }
    
    // Altitude segment labels - extract props (nested or flat)
    var finalShowAltitudeSegmentLabels = showAltitudeSegmentLabels !== undefined ? showAltitudeSegmentLabels : (altitude.showSegmentLabels !== undefined ? altitude.showSegmentLabels : false);
    var altitudeSegmentLabelsValue = altitudeSegmentLabels !== undefined ? altitudeSegmentLabels : (altitude.segmentLabels !== undefined ? altitude.segmentLabels : null);
    var finalAltitudeSegmentLabels = altitudeSegmentLabelsValue || ['AD', 'DB']; // Default labels
    var finalShowAltitudeLineLabel = showAltitudeLineLabel !== undefined ? showAltitudeLineLabel : (altitude.showLineLabel !== undefined ? altitude.showLineLabel : false);
    var finalAltitudeLineLabel = altitudeLineLabel || altitude.lineLabel || '';
    var finalAltitudeLineLabelColor = altitudeLineLabelColor || altitude.lineLabelColor || '#ffffff';
    var finalAltitudeLineLabelFontSize = altitudeLineLabelFontSize || altitude.lineLabelFontSize || '28gc';
    var finalAltitudeLineLabelFontWeight = altitudeLineLabelFontWeight || altitude.lineLabelFontWeight || 'normal';
    var finalAltitudeLineLabelOffsetX = altitudeLineLabelOffsetX !== undefined ? altitudeLineLabelOffsetX : (altitude.lineLabelOffsetX !== undefined ? altitude.lineLabelOffsetX : 0);
    var finalAltitudeLineLabelOffsetY = altitudeLineLabelOffsetY !== undefined ? altitudeLineLabelOffsetY : (altitude.lineLabelOffsetY !== undefined ? altitude.lineLabelOffsetY : 0);
    var finalAltitudeLineLabelBlink = altitudeLineLabelBlink !== undefined ? altitudeLineLabelBlink : (altitude.lineLabelBlink !== undefined ? altitude.lineLabelBlink : false);
    var finalAltitudeLineLabelBlinkDuration = altitudeLineLabelBlinkDuration !== undefined ? altitudeLineLabelBlinkDuration : (altitude.lineLabelBlinkDuration !== undefined ? altitude.lineLabelBlinkDuration : 1);
    var finalAltitudeSegmentLabelColor = altitudeSegmentLabelColor || altitude.segmentLabelColor || '#ffffff';
    var finalAltitudeSegmentLabelFontSize = altitudeSegmentLabelFontSize || altitude.segmentLabelFontSize || '24gc';
    var finalAltitudeSegmentLabelFontWeight = altitudeSegmentLabelFontWeight || altitude.segmentLabelFontWeight || 'bold';
    // Handle offset: can be number (single value), array [x, y], or separate x/y props
    var altitudeSegmentLabelOffsetValue = altitudeSegmentLabelOffset !== undefined ? altitudeSegmentLabelOffset : (altitude.segmentLabelOffset !== undefined ? altitude.segmentLabelOffset : 20);
    var altitudeSegmentLabelOffsetXValue = altitudeSegmentLabelOffsetX !== undefined ? altitudeSegmentLabelOffsetX : (altitude.segmentLabelOffsetX !== undefined ? altitude.segmentLabelOffsetX : null);
    var altitudeSegmentLabelOffsetYValue = altitudeSegmentLabelOffsetY !== undefined ? altitudeSegmentLabelOffsetY : (altitude.segmentLabelOffsetY !== undefined ? altitude.segmentLabelOffsetY : null);
    
    // Determine final offsets
    var finalAltitudeSegmentLabelOffsetX, finalAltitudeSegmentLabelOffsetY;
    if (altitudeSegmentLabelOffsetXValue !== null || altitudeSegmentLabelOffsetYValue !== null) {
      // Use separate x/y if provided
      finalAltitudeSegmentLabelOffsetX = altitudeSegmentLabelOffsetXValue !== null ? altitudeSegmentLabelOffsetXValue : 0;
      finalAltitudeSegmentLabelOffsetY = altitudeSegmentLabelOffsetYValue !== null ? altitudeSegmentLabelOffsetYValue : 0;
    } else if (Array.isArray(altitudeSegmentLabelOffsetValue)) {
      // Use array [x, y]
      finalAltitudeSegmentLabelOffsetX = altitudeSegmentLabelOffsetValue[0] || 0;
      finalAltitudeSegmentLabelOffsetY = altitudeSegmentLabelOffsetValue[1] || 0;
    } else {
      // Use single value for both (backward compatibility)
      finalAltitudeSegmentLabelOffsetX = altitudeSegmentLabelOffsetValue;
      finalAltitudeSegmentLabelOffsetY = altitudeSegmentLabelOffsetValue;
    }
    
    var finalShowAltitudeRightAngle = showAltitudeRightAngle !== undefined ? showAltitudeRightAngle : (altitude.showRightAngle !== undefined ? altitude.showRightAngle : true);
    var finalAltitudeRightAngleSize = altitudeRightAngleSize || altitude.rightAngleSize || '12gc';
    var finalAltitudeRightAngleColor = altitudeRightAngleColor || altitude.rightAngleColor || finalAltitudeColor;
    var finalAltitudeBlink = altitudeBlink !== undefined ? altitudeBlink : (altitude.blink !== undefined ? altitude.blink : false);
    var finalAltitudeBlinkDuration = altitudeBlinkDuration !== undefined ? altitudeBlinkDuration : (altitude.blinkDuration !== undefined ? altitude.blinkDuration : 1);
    // Handle segment label blink: can be boolean (applies to all) or array [label1, label2]
    var altitudeSegmentLabelBlinkValue = altitudeSegmentLabelBlink !== undefined ? altitudeSegmentLabelBlink : (altitude.segmentLabelBlink !== undefined ? altitude.segmentLabelBlink : false);
    var finalAltitudeSegmentLabelBlink = Array.isArray(altitudeSegmentLabelBlinkValue) ? altitudeSegmentLabelBlinkValue : [altitudeSegmentLabelBlinkValue, altitudeSegmentLabelBlinkValue];
    // Altitude triangle fill (for triangle ACD when altitude is from C)
    var showAltitudeTriangleFill = props.showAltitudeTriangleFill;
    var altitudeTriangleFillColor = props.altitudeTriangleFillColor;
    var altitudeTriangleFillOpacity = props.altitudeTriangleFillOpacity;
    var altitudeTriangleFill = props.altitudeTriangleFill || {};
    var finalShowAltitudeTriangleFill = showAltitudeTriangleFill !== undefined ? showAltitudeTriangleFill : (altitudeTriangleFill.show !== undefined ? altitudeTriangleFill.show : false);
    var finalAltitudeTriangleFillColor = altitudeTriangleFillColor || altitudeTriangleFill.color || 'var(--color-orange)';
    var finalAltitudeTriangleFillOpacity = altitudeTriangleFillOpacity !== undefined ? altitudeTriangleFillOpacity : (altitudeTriangleFill.opacity !== undefined ? altitudeTriangleFill.opacity : 0.3);
    // Angle marker at foot (angle ACD when altitude is from C)
    var showAltitudeFootAngle = props.showAltitudeFootAngle;
    var altitudeFootAngleLabel = props.altitudeFootAngleLabel;
    var altitudeFootAngleLabelColor = props.altitudeFootAngleLabelColor;
    var altitudeFootAngleLabelFontSize = props.altitudeFootAngleLabelFontSize;
    var altitudeFootAngleLabelFontWeight = props.altitudeFootAngleLabelFontWeight;
    var altitudeFootAngleLabelOffsetX = props.altitudeFootAngleLabelOffsetX;
    var altitudeFootAngleLabelOffsetY = props.altitudeFootAngleLabelOffsetY;
    var altitudeFootAngleBlink = props.altitudeFootAngleBlink;
    var altitudeFootAngleBlinkDuration = props.altitudeFootAngleBlinkDuration;
    var altitudeFootAngleArcRadius = props.altitudeFootAngleArcRadius;
    var altitudeFootAngleArcColor = props.altitudeFootAngleArcColor;
    var altitudeFootAngleArcWidth = props.altitudeFootAngleArcWidth;
    var altitudeFootAngleArcBlink = props.altitudeFootAngleArcBlink;
    var altitudeFootAngleArcOffsetX = props.altitudeFootAngleArcOffsetX;
    var altitudeFootAngleArcOffsetY = props.altitudeFootAngleArcOffsetY;
    var altitudeFootAngle = props.altitudeFootAngle || {};
    var finalShowAltitudeFootAngle = showAltitudeFootAngle !== undefined ? showAltitudeFootAngle : (altitudeFootAngle.show !== undefined ? altitudeFootAngle.show : false);
    // Dynamic state for altitude foot angle label (allows runtime updates)
    var initialAltitudeFootAngleLabel = altitudeFootAngleLabel !== undefined ? altitudeFootAngleLabel : (altitudeFootAngle.label !== undefined ? altitudeFootAngle.label : '?');
    var dynamicAltitudeFootAngleLabelState = React.useState(initialAltitudeFootAngleLabel);
    var dynamicAltitudeFootAngleLabel = dynamicAltitudeFootAngleLabelState[0];
    var setDynamicAltitudeFootAngleLabel = dynamicAltitudeFootAngleLabelState[1];
    var finalAltitudeFootAngleLabel = dynamicAltitudeFootAngleLabel;
    var finalAltitudeFootAngleLabelColor = altitudeFootAngleLabelColor || altitudeFootAngle.labelColor || '#FFD700';
    var finalAltitudeFootAngleLabelFontSize = altitudeFootAngleLabelFontSize || altitudeFootAngle.labelFontSize || '30gc';
    var finalAltitudeFootAngleLabelFontWeight = altitudeFootAngleLabelFontWeight || altitudeFootAngle.labelFontWeight || 'bold';
    var finalAltitudeFootAngleLabelOffsetX = altitudeFootAngleLabelOffsetX !== undefined ? altitudeFootAngleLabelOffsetX : (altitudeFootAngle.labelOffsetX !== undefined ? altitudeFootAngle.labelOffsetX : 0);
    var finalAltitudeFootAngleLabelOffsetY = altitudeFootAngleLabelOffsetY !== undefined ? altitudeFootAngleLabelOffsetY : (altitudeFootAngle.labelOffsetY !== undefined ? altitudeFootAngle.labelOffsetY : 0);
    var finalAltitudeFootAngleArcOffsetX = altitudeFootAngleArcOffsetX !== undefined ? altitudeFootAngleArcOffsetX : (altitudeFootAngle.arcOffsetX !== undefined ? altitudeFootAngle.arcOffsetX : 0);
    var finalAltitudeFootAngleArcOffsetY = altitudeFootAngleArcOffsetY !== undefined ? altitudeFootAngleArcOffsetY : (altitudeFootAngle.arcOffsetY !== undefined ? altitudeFootAngle.arcOffsetY : 0);
    var finalAltitudeFootAngleBlink = altitudeFootAngleBlink !== undefined ? altitudeFootAngleBlink : (altitudeFootAngle.blink !== undefined ? altitudeFootAngle.blink : false);
    var finalAltitudeFootAngleBlinkDuration = altitudeFootAngleBlinkDuration !== undefined ? altitudeFootAngleBlinkDuration : (altitudeFootAngle.blinkDuration !== undefined ? altitudeFootAngle.blinkDuration : 1);
    var finalAltitudeFootAngleArcRadius = altitudeFootAngleArcRadius || altitudeFootAngle.arcRadius || '50gc';
    var finalAltitudeFootAngleArcColor = altitudeFootAngleArcColor || altitudeFootAngle.arcColor || '#FFD700';
    var finalAltitudeFootAngleArcWidth = altitudeFootAngleArcWidth || altitudeFootAngle.arcWidth || '10';
    var finalAltitudeFootAngleArcBlink = altitudeFootAngleArcBlink !== undefined ? altitudeFootAngleArcBlink : (altitudeFootAngle.arcBlink !== undefined ? altitudeFootAngle.arcBlink : false);
    var finalAltitudeSegmentLabelBlinkDuration = altitudeSegmentLabelBlinkDuration !== undefined ? altitudeSegmentLabelBlinkDuration : (altitude.segmentLabelBlinkDuration !== undefined ? altitude.segmentLabelBlinkDuration : 1);

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    function processGcProperty(value, propertyName) {
      propertyName = propertyName || 'fontSize';
      if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
        return GridCellFontUtils.processGcProperty(value, propertyName);
      }
      return value;
    }

    var createBlinkAnimation = React.useCallback(function(duration) {
      var animationId = 'blink-' + duration + '-' + Math.random().toString(36).substr(2, 9);
      if (typeof document !== 'undefined' && !document.getElementById(animationId)) {
        var style = document.createElement('style');
        style.id = animationId;
        style.textContent = 
          '@keyframes ' + animationId + ' {' +
          '  0%, 100% { opacity: 1; }' +
          '  50% { opacity: 0.3; }' +
          '}';
        document.head.appendChild(style);
      }
      return animationId;
    }, []);

    function getGridDimensions() {
      var gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      var gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      return { gridRows: gridRows, gridCols: gridCols };
    }

    // ============================================================================
    // CONTAINER POSITIONING
    // ============================================================================

    var containerPosition = React.useMemo(function() {
      if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
        var x1 = coordinates[0];
        var y1 = coordinates[1];
        var x2 = coordinates[2];
        var y2 = coordinates[3];
        var dims = getGridDimensions();
        var gridRows = dims.gridRows;
        var gridCols = dims.gridCols;
        
        var left = ((x1 - 1) / gridCols) * 100;
        var top = ((y1 - 1) / gridRows) * 100;
        var width = ((x2 - x1 + 1) / gridCols) * 100;
        var height = ((y2 - y1 + 1) / gridRows) * 100;
        
        return {
          left: left.toFixed(2) + '%',
          top: top.toFixed(2) + '%',
          width: width.toFixed(2) + '%',
          height: height.toFixed(2) + '%'
        };
      }
      return {};
    }, [coordinates]);

    var containerStyle = React.useMemo(function() {
      return Object.assign({
        position: 'absolute',
        zIndex: zIndex,
        boxSizing: 'border-box',
        pointerEvents: 'none',
        overflow: 'visible'
      }, containerPosition);
    }, [containerPosition, zIndex]);

    // ============================================================================
    // EVENT HANDLERS
    // ============================================================================

    var handleTriangleClick = React.useCallback(function(e) {
      e.stopPropagation();
      if (onTriangleClick) {
        onTriangleClick({
          id: id,
          sides: calculatedSides,
          vertices: calculatedVertices,
          inputMethod: inputMethod,
          hasRightAngle: hasRightAngle,
          rightAngleVertexIndex: rightAngleVertexIndex,
          position: finalPosition
        });
      }
    }, [id, calculatedSides, calculatedVertices, inputMethod, hasRightAngle, rightAngleVertexIndex, finalPosition, onTriangleClick]);

    var handleVertexClick = React.useCallback(function(vertexIndex, coords) {
      if (onVertexClick) {
        onVertexClick(vertexIndex, coords, finalVertexLabels[vertexIndex]);
      }
    }, [onVertexClick, finalVertexLabels]);

    var handleSideClick = React.useCallback(function(sideIndex, startCoords, endCoords) {
      if (onSideClick) {
        onSideClick(sideIndex, {
          label: finalSideLabels[sideIndex],
          length: calculatedSides ? calculatedSides[sideIndex] : 0,
          startCoords: startCoords,
          endCoords: endCoords
        });
      }
    }, [onSideClick, finalSideLabels, calculatedSides]);

    // ============================================================================
    // RENDER SIDES (SVG)
    // ============================================================================

    var renderSides = React.useMemo(function() {
      if (!calculatedVertices || calculatedVertices.length !== 3) return null;
      
      var v0 = calculatedVertices[0];
      var v1 = calculatedVertices[1];
      var v2 = calculatedVertices[2];
      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;
      
      var borderWidthPx = parseFloat(processGcProperty(finalSideWidth, 'borderWidth')) || 3;
      
      // Calculate bounding box
      var allX = [v0[0], v1[0], v2[0]];
      var allY = [v0[1], v1[1], v2[1]];
      var minX = Math.min.apply(null, allX);
      var maxX = Math.max.apply(null, allX);
      var minY = Math.min.apply(null, allY);
      var maxY = Math.max.apply(null, allY);
      
      var padding = borderWidthPx;
      var svgWidth = maxX - minX + padding * 2;
      var svgHeight = maxY - minY + padding * 2;
      
      function toSvgCoords(vertex) {
        return [
          vertex[0] - minX + padding,
          vertex[1] - minY + padding
        ];
      }
      
      var svgV0 = toSvgCoords(v0);
      var svgV1 = toSvgCoords(v1);
      var svgV2 = toSvgCoords(v2);
      
      var strokeDasharray = 'none';
      if (finalSideStyle === 'dashed') {
        strokeDasharray = (borderWidthPx * 2) + ' ' + borderWidthPx;
      } else if (finalSideStyle === 'dotted') {
        strokeDasharray = '0 ' + (borderWidthPx * 2);
      }
      
      // Side definitions: side 0 between v0-v1, side 1 between v1-v2, side 2 between v2-v0
      var sideDefinitions = [
        { start: svgV0, end: svgV1, index: 0, origStart: v0, origEnd: v1 },
        { start: svgV1, end: svgV2, index: 1, origStart: v1, origEnd: v2 },
        { start: svgV2, end: svgV0, index: 2, origStart: v2, origEnd: v0 }
      ];
      
      var svgLeft = ((minX - padding - 1) / gridCols) * 100;
      var svgTop = ((minY - padding - 1) / gridRows) * 100;
      var svgWidthPercent = (svgWidth / gridCols) * 100;
      var svgHeightPercent = (svgHeight / gridRows) * 100;
      
      var svgStyle = {
        position: 'absolute',
        left: svgLeft.toFixed(2) + '%',
        top: svgTop.toFixed(2) + '%',
        width: svgWidthPercent.toFixed(2) + '%',
        height: svgHeightPercent.toFixed(2) + '%',
        pointerEvents: onSideClick ? 'auto' : 'none',
        cursor: onSideClick ? 'pointer' : 'default',
        zIndex: zIndex + 10
      };
      
      var lineElements = sideDefinitions.map(function(sideItem) {
        var sideBlinkVal = finalSideBlink[sideItem.index];
        var sideBlinkDur = finalSideBlinkDuration[sideItem.index];
        var blinkAnimation = sideBlinkVal ? createBlinkAnimation(sideBlinkDur) : null;
        var sideColorVal = finalSideColor[sideItem.index];
        
        var lineStyle = {
          stroke: sideColorVal,
          strokeWidth: borderWidthPx,
          strokeLinecap: 'round',
          strokeLinejoin: finalSideLineJoin,
          strokeMiterlimit: finalSideLineJoin === 'miter' ? 4 : undefined,
          strokeDasharray: strokeDasharray,
          pointerEvents: 'stroke'
        };
        
        if (blinkAnimation) {
          lineStyle.animation = blinkAnimation + ' ' + sideBlinkDur + 's ease-in-out infinite';
        }
        
        return React.createElement('line', {
          key: 'side-' + sideItem.index,
          x1: sideItem.start[0],
          y1: sideItem.start[1],
          x2: sideItem.end[0],
          y2: sideItem.end[1],
          style: lineStyle,
          onClick: function() { handleSideClick(sideItem.index, sideItem.origStart, sideItem.origEnd); }
        });
      });
      
      // Add vertex markers if enabled
      var vertexElements = [];
      if (finalShowVertices) {
        var vertexSizePx = parseFloat(processGcProperty(finalVertexSize, 'width')) || 6;
        var svgVertices = [svgV0, svgV1, svgV2];
        
        svgVertices.forEach(function(vertex, index) {
          var vColor = finalVertexColor !== finalSideColor[0] ? finalVertexColor : finalSideColor[index];
          
          vertexElements.push(
            React.createElement('circle', {
              key: 'vertex-' + index,
              cx: vertex[0],
              cy: vertex[1],
              r: vertexSizePx / 2,
              fill: vColor,
              stroke: 'none',
              pointerEvents: 'none'
            })
          );
        });
      }
      
      return React.createElement('svg', {
        key: 'triangle-sides',
        style: svgStyle,
        viewBox: '0 0 ' + svgWidth + ' ' + svgHeight,
        xmlns: 'http://www.w3.org/2000/svg',
        preserveAspectRatio: 'none'
      }, lineElements.concat(vertexElements));
    }, [calculatedVertices, finalSideWidth, finalSideColor, finalSideStyle, finalSideLineJoin, finalShowVertices, finalVertexColor, finalVertexSize, finalSideBlink, finalSideBlinkDuration, zIndex, handleSideClick, onSideClick, createBlinkAnimation]);

    // ============================================================================
    // RENDER RIGHT ANGLE MARKER
    // ============================================================================

    var renderRightAngleMarker = React.useMemo(function() {
      if (!finalShowRightAngleMarker || rightAngleVertexIndex < 0 || !calculatedVertices) return null;

      var rightAngleVertex = calculatedVertices[rightAngleVertexIndex];
      var markerSize = parseFloat(processGcProperty(finalRightAngleMarkerSize, 'width'));
      
      // Get the two adjacent vertices to determine marker orientation
      var prevIndex = (rightAngleVertexIndex + 2) % 3;
      var nextIndex = (rightAngleVertexIndex + 1) % 3;
      var prevVertex = calculatedVertices[prevIndex];
      var nextVertex = calculatedVertices[nextIndex];
      
      // Calculate unit vectors along the two sides meeting at the right angle
      var dx1 = prevVertex[0] - rightAngleVertex[0];
      var dy1 = prevVertex[1] - rightAngleVertex[1];
      var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      var ux1 = dx1 / len1;
      var uy1 = dy1 / len1;
      
      var dx2 = nextVertex[0] - rightAngleVertex[0];
      var dy2 = nextVertex[1] - rightAngleVertex[1];
      var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      var ux2 = dx2 / len2;
      var uy2 = dy2 / len2;
      
      // Create the right angle marker path
      var size = markerSize * 0.8;
      var p1 = [ux1 * size, uy1 * size];
      var p2 = [ux1 * size + ux2 * size, uy1 * size + uy2 * size];
      var p3 = [ux2 * size, uy2 * size];
      
      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;
      
      // Apply offset
      var offsetXPx = parseFloat(processGcProperty(finalRightAngleMarkerOffsetX, 'width')) || 0;
      var offsetYPx = parseFloat(processGcProperty(finalRightAngleMarkerOffsetY, 'width')) || 0;
      
      var svgLeft = ((rightAngleVertex[0] - 1 + offsetXPx) / gridCols) * 100;
      var svgTop = ((rightAngleVertex[1] - 1 + offsetYPx) / gridRows) * 100;
      var svgSize = markerSize * 1.5;

      // Create blink animation if needed
      var blinkAnimationId = null;
      if (finalRightAngleMarkerBlink) {
        blinkAnimationId = createBlinkAnimation(finalRightAngleMarkerBlinkDuration);
      }

      var svgStyle = {
        position: 'absolute',
        left: svgLeft.toFixed(2) + '%',
        top: svgTop.toFixed(2) + '%',
        width: svgSize + 'px',
        height: svgSize + 'px',
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: zIndex + 15
      };
      
      // Add blink animation if enabled
      if (blinkAnimationId) {
        svgStyle.animation = blinkAnimationId + ' ' + finalRightAngleMarkerBlinkDuration + 's infinite';
      }

      var pathD = 'M ' + p1[0] + ' ' + p1[1] + ' L ' + p2[0] + ' ' + p2[1] + ' L ' + p3[0] + ' ' + p3[1];

      return React.createElement('svg', {
        key: 'right-angle-marker',
        className: 'right-angle-marker',
        style: svgStyle,
        xmlns: 'http://www.w3.org/2000/svg'
      }, React.createElement('path', {
        d: pathD,
        fill: 'none',
        stroke: finalRightAngleMarkerColor,
        strokeWidth: '2'
      }));
    }, [finalShowRightAngleMarker, calculatedVertices, rightAngleVertexIndex, finalRightAngleMarkerSize, finalRightAngleMarkerColor, finalRightAngleMarkerOffsetX, finalRightAngleMarkerOffsetY, finalRightAngleMarkerBlink, finalRightAngleMarkerBlinkDuration, zIndex, createBlinkAnimation, processGcProperty]);

    // ============================================================================
    // RENDER ANGLE ARCS (for non-right angles)
    // ============================================================================

    var renderAngleArcs = React.useMemo(function() {
      if (!finalShowAngleArcs || !calculatedVertices) return null;

      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;

      return calculatedVertices.map(function(vertex, index) {
        // Skip if this is the right angle vertex (handled by right angle marker)
        if (index === rightAngleVertexIndex) return null;
        
        // Skip if no label for this angle
        if (!finalAngleLabels[index] || finalAngleLabels[index] === '') return null;

        var arcRadius = parseFloat(processGcProperty(finalAngleArcRadius[index], 'width')) || 25;
        var arcColor = finalAngleArcColor[index];
        var arcWidth = finalAngleArcWidth[index];
        
        // Get adjacent vertices
        var prevIndex = (index + 2) % 3;
        var nextIndex = (index + 1) % 3;
        var prevVertex = calculatedVertices[prevIndex];
        var nextVertex = calculatedVertices[nextIndex];
        
        // Calculate vectors from current vertex to adjacent vertices
        var dx1 = prevVertex[0] - vertex[0];
        var dy1 = prevVertex[1] - vertex[1];
        var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
        var dx2 = nextVertex[0] - vertex[0];
        var dy2 = nextVertex[1] - vertex[1];
        var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        // Calculate angles of each side from the vertex
        var angle1 = Math.atan2(dy1, dx1);
        var angle2 = Math.atan2(dy2, dx2);
        
        // Ensure we draw the arc the shorter way
        var startAngle = angle1;
        var endAngle = angle2;
        
        // Normalize angles
        while (endAngle < startAngle) endAngle += 2 * Math.PI;
        var angleDiff = endAngle - startAngle;
        if (angleDiff > Math.PI) {
          // Swap to go the other way
          var temp = startAngle;
          startAngle = endAngle;
          endAngle = temp + 2 * Math.PI;
        }
        
        // Calculate arc path points
        var startX = vertex[0] + arcRadius * Math.cos(startAngle);
        var startY = vertex[1] + arcRadius * Math.sin(startAngle);
        var endX = vertex[0] + arcRadius * Math.cos(endAngle);
        var endY = vertex[1] + arcRadius * Math.sin(endAngle);
        
        // Determine if we need the large arc flag
        var sweepAngle = endAngle - startAngle;
        while (sweepAngle < 0) sweepAngle += 2 * Math.PI;
        var largeArcFlag = sweepAngle > Math.PI ? 1 : 0;
        
        // Create SVG arc path
        var pathD = 'M ' + startX + ' ' + startY + 
                   ' A ' + arcRadius + ' ' + arcRadius + ' 0 ' + largeArcFlag + ' 1 ' + endX + ' ' + endY;
        
        // Calculate bounding box for SVG
        var padding = arcRadius + 10;
        var svgLeft = ((vertex[0] - padding - 1) / gridCols) * 100;
        var svgTop = ((vertex[1] - padding - 1) / gridRows) * 100;
        var svgSize = padding * 2;
        
        // Create blink animation if needed
        var arcBlinkAnimationId = null;
        if (finalAngleArcBlink[index]) {
          arcBlinkAnimationId = createBlinkAnimation(finalAngleArcBlinkDuration[index]);
        }
        
        var svgStyle = {
          position: 'absolute',
          left: svgLeft.toFixed(2) + '%',
          top: svgTop.toFixed(2) + '%',
          width: (svgSize / gridCols * 100).toFixed(2) + '%',
          height: (svgSize / gridRows * 100).toFixed(2) + '%',
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: zIndex + 12
        };
        
        // Add blink animation if enabled
        if (arcBlinkAnimationId) {
          svgStyle.animation = arcBlinkAnimationId + ' ' + finalAngleArcBlinkDuration[index] + 's infinite';
        }
        
        // Transform path to be relative to SVG origin
        var offsetX = padding;
        var offsetY = padding;
        var transformedStartX = startX - vertex[0] + offsetX;
        var transformedStartY = startY - vertex[1] + offsetY;
        var transformedEndX = endX - vertex[0] + offsetX;
        var transformedEndY = endY - vertex[1] + offsetY;
        
        var transformedPathD = 'M ' + transformedStartX + ' ' + transformedStartY + 
                              ' A ' + arcRadius + ' ' + arcRadius + ' 0 ' + largeArcFlag + ' 1 ' + transformedEndX + ' ' + transformedEndY;
        
        return React.createElement('svg', {
          key: 'angle-arc-' + index,
          className: 'angle-arc',
          style: svgStyle,
          viewBox: '0 0 ' + svgSize + ' ' + svgSize,
          xmlns: 'http://www.w3.org/2000/svg'
        }, React.createElement('path', {
          d: transformedPathD,
          fill: 'none',
          stroke: arcColor,
          strokeWidth: arcWidth
        }));
      }).filter(function(el) { return el !== null; });
    }, [finalShowAngleArcs, calculatedVertices, rightAngleVertexIndex, finalAngleLabels, finalAngleArcRadius, finalAngleArcColor, finalAngleArcWidth, finalAngleArcBlink, finalAngleArcBlinkDuration, zIndex, createBlinkAnimation, processGcProperty]);

    // ============================================================================
    // RENDER ALTITUDE (PERPENDICULAR FROM VERTEX TO OPPOSITE SIDE)
    // ============================================================================

    var renderAltitude = React.useMemo(function() {
      if (!finalShowAltitude || !calculatedVertices || calculatedVertices.length !== 3) return null;

      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;

      // Get the vertex from which to draw the altitude
      var vertexIndex = finalAltitudeFromVertex;
      var vertex = calculatedVertices[vertexIndex];
      
      // Get the opposite side vertices (the side opposite to the vertex)
      // For vertex 0 (A), opposite side is between vertices 1 and 2 (B-C)
      // For vertex 1 (B), opposite side is between vertices 0 and 2 (A-C)
      // For vertex 2 (C), opposite side is between vertices 0 and 1 (A-B)
      var oppVertex1Index = (vertexIndex + 1) % 3;
      var oppVertex2Index = (vertexIndex + 2) % 3;
      var oppVertex1 = calculatedVertices[oppVertex1Index];
      var oppVertex2 = calculatedVertices[oppVertex2Index];
      
      // Calculate the foot of the perpendicular (projection of vertex onto opposite side)
      // Line from oppVertex1 to oppVertex2: P = oppVertex1 + t * (oppVertex2 - oppVertex1)
      // Perpendicular condition: (vertex - P) · (oppVertex2 - oppVertex1) = 0
      var dx = oppVertex2[0] - oppVertex1[0];
      var dy = oppVertex2[1] - oppVertex1[1];
      var lenSq = dx * dx + dy * dy;
      
      if (lenSq === 0) return null; // Degenerate case
      
      // Calculate parameter t for the foot point
      var t = ((vertex[0] - oppVertex1[0]) * dx + (vertex[1] - oppVertex1[1]) * dy) / lenSq;
      
      // Calculate foot of perpendicular
      var footX = oppVertex1[0] + t * dx;
      var footY = oppVertex1[1] + t * dy;
      var foot = [footX, footY];
      
      // Process styling
      var altitudeWidthPx = parseFloat(processGcProperty(finalAltitudeWidth, 'borderWidth')) || 2;
      var footSizePx = parseFloat(processGcProperty(finalAltitudeFootSize, 'width')) || 6;
      var rightAngleSizePx = parseFloat(processGcProperty(finalAltitudeRightAngleSize, 'width')) || 12;
      
      // Calculate bounding box for SVG
      // If filling triangle ACD, include vertex A in bounding box
      var allX = [vertex[0], foot[0]];
      var allY = [vertex[1], foot[1]];
      if (finalShowAltitudeTriangleFill && vertexIndex === 2) {
        var vertexA = calculatedVertices[oppVertex2Index];
        allX.push(vertexA[0]);
        allY.push(vertexA[1]);
      }
      // If showing angle ACD marker, include arc extent in bounding box (arc is at vertex C with offset)
      if (finalShowAltitudeFootAngle && vertexIndex === 2) {
        var vertexA = calculatedVertices[oppVertex2Index];
        var caX = vertexA[0] - vertex[0];
        var caY = vertexA[1] - vertex[1];
        var cdX = foot[0] - vertex[0];
        var cdY = foot[1] - vertex[1];
        var arcRadiusPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcRadius, 'width')) || 50;
        var arcOffsetXPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcOffsetX, 'width')) || 0;
        var arcOffsetYPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcOffsetY, 'width')) || 0;
        var arcCenterX = vertex[0] + arcOffsetXPx;
        var arcCenterY = vertex[1] + arcOffsetYPx;
        // Add points along the arc to bounding box (from offset arc center)
        var angleCA = Math.atan2(caY, caX);
        var angleCD = Math.atan2(cdY, cdX);
        // Normalize angles
        angleCA = angleCA < 0 ? angleCA + 2 * Math.PI : angleCA;
        angleCD = angleCD < 0 ? angleCD + 2 * Math.PI : angleCD;
        for (var i = 0; i <= 10; i++) {
          var t = i / 10;
          var angle = angleCA + (angleCD - angleCA) * t;
          allX.push(arcCenterX + arcRadiusPx * Math.cos(angle));
          allY.push(arcCenterY + arcRadiusPx * Math.sin(angle));
        }
      }
      var minX = Math.min.apply(null, allX);
      var maxX = Math.max.apply(null, allX);
      var minY = Math.min.apply(null, allY);
      var maxY = Math.max.apply(null, allY);
      
      var padding = Math.max(altitudeWidthPx, footSizePx, rightAngleSizePx) + 5;
      if (finalShowAltitudeFootAngle && vertexIndex === 2) {
        var arcRadiusPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcRadius, 'width')) || 50;
        padding = Math.max(padding, arcRadiusPx + 10);
      }
      var svgWidth = maxX - minX + padding * 2;
      var svgHeight = maxY - minY + padding * 2;
      
      // Ensure minimum size
      svgWidth = Math.max(svgWidth, padding * 2 + 10);
      svgHeight = Math.max(svgHeight, padding * 2 + 10);
      
      function toSvgCoords(point) {
        return [
          point[0] - minX + padding,
          point[1] - minY + padding
        ];
      }
      
      var svgVertex = toSvgCoords(vertex);
      var svgFoot = toSvgCoords(foot);
      
      // Calculate stroke dasharray based on style
      var strokeDasharray = 'none';
      if (finalAltitudeStyle === 'dashed') {
        strokeDasharray = (altitudeWidthPx * 3) + ' ' + (altitudeWidthPx * 2);
      } else if (finalAltitudeStyle === 'dotted') {
        strokeDasharray = altitudeWidthPx + ' ' + (altitudeWidthPx * 2);
      }
      
      var svgLeft = ((minX - padding - 1) / gridCols) * 100;
      var svgTop = ((minY - padding - 1) / gridRows) * 100;
      var svgWidthPercent = (svgWidth / gridCols) * 100;
      var svgHeightPercent = (svgHeight / gridRows) * 100;
      
      var svgStyle = {
        position: 'absolute',
        left: svgLeft.toFixed(2) + '%',
        top: svgTop.toFixed(2) + '%',
        width: svgWidthPercent.toFixed(2) + '%',
        height: svgHeightPercent.toFixed(2) + '%',
        pointerEvents: 'none',
        zIndex: zIndex + 11,
        overflow: 'visible'
      };
      
      var elements = [];
      
      // Draw filled triangle ACD if enabled (when altitude is from C)
      // Triangle ACD consists of: A (oppVertex2Index), C (vertexIndex), D (foot)
      if (finalShowAltitudeTriangleFill && vertexIndex === 2) {
        // Get vertex A (oppVertex2Index = 1 when vertexIndex = 2)
        var vertexA = calculatedVertices[oppVertex2Index];
        var svgVertexA = toSvgCoords(vertexA);
        var svgVertexC = svgVertex; // C is the vertex from which altitude is drawn
        var svgFootD = svgFoot; // D is the foot
        
        // Create polygon path: A -> C -> D -> A
        var polygonPoints = svgVertexA[0] + ',' + svgVertexA[1] + ' ' +
                           svgVertexC[0] + ',' + svgVertexC[1] + ' ' +
                           svgFootD[0] + ',' + svgFootD[1];
        
        elements.push(
          React.createElement('polygon', {
            key: 'altitude-triangle-fill',
            points: polygonPoints,
            fill: finalAltitudeTriangleFillColor,
            fillOpacity: finalAltitudeTriangleFillOpacity,
            stroke: 'none',
            pointerEvents: 'none'
          })
        );
      }
      
      // Draw the altitude line
      var altitudeLineStyle = {};
      if (finalAltitudeBlink) {
        var blinkAnimationId = createBlinkAnimation(finalAltitudeBlinkDuration);
        altitudeLineStyle.animation = blinkAnimationId + ' ' + finalAltitudeBlinkDuration + 's ease-in-out infinite';
      }
      
      elements.push(
        React.createElement('line', {
          key: 'altitude-line',
          x1: svgVertex[0],
          y1: svgVertex[1],
          x2: svgFoot[0],
          y2: svgFoot[1],
          stroke: finalAltitudeColor,
          strokeWidth: altitudeWidthPx,
          strokeDasharray: strokeDasharray,
          strokeLinecap: 'round',
          style: altitudeLineStyle
        })
      );
      
      // Draw foot marker if enabled
      if (finalShowAltitudeFoot) {
        elements.push(
          React.createElement('circle', {
            key: 'altitude-foot',
            cx: svgFoot[0],
            cy: svgFoot[1],
            r: footSizePx / 2,
            fill: finalAltitudeFootColor,
            stroke: 'none'
          })
        );
      }
      
      // Draw right angle marker at foot if enabled
      if (finalShowAltitudeRightAngle) {
        // Calculate unit vectors along the opposite side and the altitude
        var sideLen = Math.sqrt(dx * dx + dy * dy);
        var ux = dx / sideLen; // Unit vector along opposite side
        var uy = dy / sideLen;
        
        // Unit vector along altitude (from foot to vertex)
        var altDx = vertex[0] - foot[0];
        var altDy = vertex[1] - foot[1];
        var altLen = Math.sqrt(altDx * altDx + altDy * altDy);
        var altUx = altLen > 0 ? altDx / altLen : 0;
        var altUy = altLen > 0 ? altDy / altLen : 0;
        
        // Create right angle marker path
        var markerSize = rightAngleSizePx * 0.8;
        var p1 = [svgFoot[0] + ux * markerSize, svgFoot[1] + uy * markerSize];
        var p2 = [svgFoot[0] + ux * markerSize + altUx * markerSize, svgFoot[1] + uy * markerSize + altUy * markerSize];
        var p3 = [svgFoot[0] + altUx * markerSize, svgFoot[1] + altUy * markerSize];
        
        var pathD = 'M ' + p1[0] + ' ' + p1[1] + ' L ' + p2[0] + ' ' + p2[1] + ' L ' + p3[0] + ' ' + p3[1];
        
        elements.push(
          React.createElement('path', {
            key: 'altitude-right-angle',
            d: pathD,
            fill: 'none',
            stroke: finalAltitudeRightAngleColor,
            strokeWidth: Math.max(1, altitudeWidthPx * 0.75)
          })
        );
      }
      
      // Draw angle ACD marker at vertex C if enabled (when altitude is from C)
      if (finalShowAltitudeFootAngle && vertexIndex === 2) {
        // Angle ACD is at vertex C, with arms from C to A and C to D
        // Get vertex A (oppVertex2Index = 1 when vertexIndex = 2)
        var vertexA = calculatedVertices[oppVertex2Index];
        var svgVertexA = toSvgCoords(vertexA);
        var svgVertexC = svgVertex; // C is the vertex from which altitude is drawn
        var svgFootD = svgFoot; // D is the foot
        
        // Calculate vectors from C to A and C to D
        var caX = svgVertexA[0] - svgVertexC[0];
        var caY = svgVertexA[1] - svgVertexC[1];
        var cdX = svgFootD[0] - svgVertexC[0];
        var cdY = svgFootD[1] - svgVertexC[1];
        
        // Calculate angles for the arc (in degrees, normalized to 0-360)
        var angleCA = Math.atan2(caY, caX) * (180 / Math.PI);
        var angleCD = Math.atan2(cdY, cdX) * (180 / Math.PI);
        
        // Normalize angles to 0-360 range
        angleCA = angleCA < 0 ? angleCA + 360 : angleCA;
        angleCD = angleCD < 0 ? angleCD + 360 : angleCD;
        
        // Calculate the smaller angle between CA and CD
        var diff = angleCD - angleCA;
        if (diff < 0) diff += 360;
        var angleACD = diff > 180 ? 360 - diff : diff;
        
        // Determine sweep flag based on direction
        // For angle ACD, we want the arc to curve from CA to CD
        // Use cross product to determine if we should go clockwise or counterclockwise
        // Cross product: CA × CD = caX * cdY - caY * cdX
        // If positive, CD is counterclockwise from CA (use sweep=1)
        // If negative, CD is clockwise from CA (use sweep=0)
        var crossProduct = caX * cdY - caY * cdX;
        var sweepFlag = crossProduct > 0 ? 1 : 0;
        
        // Arc radius
        var arcRadiusPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcRadius, 'width')) || 50;
        var arcWidthPx = parseFloat(finalAltitudeFootAngleArcWidth) || 10;
        
        // Apply arc offset
        var arcOffsetXPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcOffsetX, 'width')) || 0;
        var arcOffsetYPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcOffsetY, 'width')) || 0;
        var arcCenterX = svgVertexC[0] + arcOffsetXPx;
        var arcCenterY = svgVertexC[1] + arcOffsetYPx;
        
        // Calculate arc start and end points (from offset center)
        var startX = arcCenterX + arcRadiusPx * Math.cos(angleCA * Math.PI / 180);
        var startY = arcCenterY + arcRadiusPx * Math.sin(angleCA * Math.PI / 180);
        var endX = arcCenterX + arcRadiusPx * Math.cos(angleCD * Math.PI / 180);
        var endY = arcCenterY + arcRadiusPx * Math.sin(angleCD * Math.PI / 180);
        
        // Large arc flag (1 if angle > 180, 0 otherwise)
        var largeArcFlag = angleACD > 180 ? 1 : 0;
        
        // Create arc path
        var arcPathD = 'M ' + startX + ' ' + startY + 
                      ' A ' + arcRadiusPx + ' ' + arcRadiusPx + ' 0 ' + largeArcFlag + ' ' + sweepFlag + ' ' + endX + ' ' + endY;
        
        // Apply blink animation to arc if enabled
        var arcStyle = {};
        if (finalAltitudeFootAngleArcBlink) {
          var arcBlinkAnimationId = createBlinkAnimation(finalAltitudeFootAngleBlinkDuration);
          arcStyle.animation = arcBlinkAnimationId + ' ' + finalAltitudeFootAngleBlinkDuration + 's ease-in-out infinite';
        }
        
        elements.push(
          React.createElement('path', {
            key: 'altitude-foot-angle-arc',
            d: arcPathD,
            fill: 'none',
            stroke: finalAltitudeFootAngleArcColor,
            strokeWidth: arcWidthPx,
            strokeLinecap: 'round',
            style: arcStyle
          })
        );
      }
      
      var svgElement = React.createElement('svg', {
        key: 'altitude',
        className: 'triangle-altitude',
        style: svgStyle,
        viewBox: '0 0 ' + svgWidth + ' ' + svgHeight,
        xmlns: 'http://www.w3.org/2000/svg',
        preserveAspectRatio: 'none'
      }, elements);
      
      // Render foot label if enabled
      var footLabelElement = null;
      if (finalShowAltitudeFootLabel && finalAltitudeFootLabel) {
        var footLabelFontSize = processGcProperty(finalAltitudeFootLabelFontSize, 'fontSize');
        var footLabelOffsetXPx = parseFloat(processGcProperty(finalAltitudeFootLabelOffsetX, 'width')) || 0;
        var footLabelOffsetYPx = parseFloat(processGcProperty(finalAltitudeFootLabelOffsetY, 'width')) || 0;
        
        // Position label offset from foot using horizontal and vertical offsets
        var labelX = foot[0] + footLabelOffsetXPx;
        var labelY = foot[1] + footLabelOffsetYPx;
        
        var labelLeft = ((labelX - 1) / gridCols) * 100;
        var labelTop = ((labelY - 1) / gridRows) * 100;
        
        var footLabelStyle = {
          position: 'absolute',
          left: labelLeft.toFixed(2) + '%',
          top: labelTop.toFixed(2) + '%',
          transform: 'translate(-50%, -50%)',
          fontSize: footLabelFontSize,
          fontWeight: finalAltitudeFootLabelFontWeight,
          color: finalAltitudeFootLabelColor,
          pointerEvents: 'none',
          zIndex: zIndex + 21,
          userSelect: 'none',
          whiteSpace: 'nowrap'
        };
        
        footLabelElement = React.createElement('div', {
          key: 'altitude-foot-label',
          className: 'altitude-foot-label',
          style: footLabelStyle
        }, finalAltitudeFootLabel);
      }
      
      // Render angle ACD label at vertex C if enabled (when altitude is from C)
      var footAngleLabelElement = null;
      if (finalShowAltitudeFootAngle && vertexIndex === 2 && finalAltitudeFootAngleLabel) {
        var footAngleLabelFontSize = processGcProperty(finalAltitudeFootAngleLabelFontSize, 'fontSize');
        var footAngleLabelOffsetXPx = parseFloat(processGcProperty(finalAltitudeFootAngleLabelOffsetX, 'width')) || 0;
        var footAngleLabelOffsetYPx = parseFloat(processGcProperty(finalAltitudeFootAngleLabelOffsetY, 'width')) || 0;
        
        // Calculate the midpoint of the arc for label positioning (from vertex C)
        var vertexA = calculatedVertices[oppVertex2Index];
        var caX = vertexA[0] - vertex[0];
        var caY = vertexA[1] - vertex[1];
        var cdX = foot[0] - vertex[0];
        var cdY = foot[1] - vertex[1];
        
        var angleCA = Math.atan2(caY, caX) * (180 / Math.PI);
        var angleCD = Math.atan2(cdY, cdX) * (180 / Math.PI);
        
        // Normalize angles to 0-360 range
        angleCA = angleCA < 0 ? angleCA + 360 : angleCA;
        angleCD = angleCD < 0 ? angleCD + 360 : angleCD;
        
        var diff = Math.abs(angleCD - angleCA);
        var midAngle = (angleCA + angleCD) / 2;
        if (diff > 180) {
          midAngle = (midAngle + 180) % 360;
        }
        
        var arcRadiusPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcRadius, 'width')) || 50;
        var arcOffsetXPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcOffsetX, 'width')) || 0;
        var arcOffsetYPx = parseFloat(processGcProperty(finalAltitudeFootAngleArcOffsetY, 'width')) || 0;
        var arcCenterX = vertex[0] + arcOffsetXPx;
        var arcCenterY = vertex[1] + arcOffsetYPx;
        var labelDistance = arcRadiusPx * 1.3; // Position label slightly outside the arc
        
        var labelX = arcCenterX + labelDistance * Math.cos(midAngle * Math.PI / 180) + footAngleLabelOffsetXPx;
        var labelY = arcCenterY + labelDistance * Math.sin(midAngle * Math.PI / 180) + footAngleLabelOffsetYPx;
        
        var labelLeft = ((labelX - 1) / gridCols) * 100;
        var labelTop = ((labelY - 1) / gridRows) * 100;
        
        var footAngleLabelStyle = {
          position: 'absolute',
          left: labelLeft.toFixed(2) + '%',
          top: labelTop.toFixed(2) + '%',
          transform: 'translate(-50%, -50%)',
          fontSize: footAngleLabelFontSize,
          fontWeight: finalAltitudeFootAngleLabelFontWeight,
          color: finalAltitudeFootAngleLabelColor,
          pointerEvents: 'none',
          zIndex: zIndex + 23,
          userSelect: 'none',
          whiteSpace: 'nowrap'
        };
        
        // Apply blink animation if enabled
        if (finalAltitudeFootAngleBlink) {
          var footAngleBlinkAnimationId = createBlinkAnimation(finalAltitudeFootAngleBlinkDuration);
          footAngleLabelStyle.animation = footAngleBlinkAnimationId + ' ' + finalAltitudeFootAngleBlinkDuration + 's ease-in-out infinite';
        }
        
        footAngleLabelElement = React.createElement('div', {
          key: 'altitude-foot-angle-label',
          className: 'altitude-foot-angle-label',
          style: footAngleLabelStyle
        }, finalAltitudeFootAngleLabel);
      }
      
      // Render segment labels if enabled
      var segmentLabelElements = [];
      if (finalShowAltitudeSegmentLabels && finalAltitudeSegmentLabels && finalAltitudeSegmentLabels.length >= 2) {
        var segmentLabelFontSize = processGcProperty(finalAltitudeSegmentLabelFontSize, 'fontSize');
        var segmentLabelOffsetXPx = parseFloat(processGcProperty(finalAltitudeSegmentLabelOffsetX, 'width')) || 0;
        var segmentLabelOffsetYPx = parseFloat(processGcProperty(finalAltitudeSegmentLabelOffsetY, 'width')) || 0;
        
        // oppVertex1 and oppVertex2 are already defined above in the function scope
        
        // Calculate midpoints of the two segments
        // Segment 1: from oppVertex1 to foot
        var segment1MidX = (oppVertex1[0] + foot[0]) / 2;
        var segment1MidY = (oppVertex1[1] + foot[1]) / 2;
        
        // Segment 2: from foot to oppVertex2
        var segment2MidX = (foot[0] + oppVertex2[0]) / 2;
        var segment2MidY = (foot[1] + oppVertex2[1]) / 2;
        
        // Position labels using horizontal and vertical offsets
        var label1X = segment1MidX + segmentLabelOffsetXPx;
        var label1Y = segment1MidY + segmentLabelOffsetYPx;
        var label2X = segment2MidX + segmentLabelOffsetXPx;
        var label2Y = segment2MidY + segmentLabelOffsetYPx;
        
        var label1Left = ((label1X - 1) / gridCols) * 100;
        var label1Top = ((label1Y - 1) / gridRows) * 100;
        var label2Left = ((label2X - 1) / gridCols) * 100;
        var label2Top = ((label2Y - 1) / gridRows) * 100;
        
        var segmentLabelStyle = {
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          fontSize: segmentLabelFontSize,
          fontWeight: finalAltitudeSegmentLabelFontWeight,
          color: finalAltitudeSegmentLabelColor,
          pointerEvents: 'none',
          zIndex: zIndex + 22,
          userSelect: 'none',
          whiteSpace: 'nowrap'
        };
        
        // Apply blink animation to segment label 1 if enabled
        var segmentLabel1Style = Object.assign({}, segmentLabelStyle, {
          left: label1Left.toFixed(2) + '%',
          top: label1Top.toFixed(2) + '%'
        });
        if (finalAltitudeSegmentLabelBlink[0]) {
          var blinkAnimationId1 = createBlinkAnimation(finalAltitudeSegmentLabelBlinkDuration);
          segmentLabel1Style.animation = blinkAnimationId1 + ' ' + finalAltitudeSegmentLabelBlinkDuration + 's ease-in-out infinite';
        }
        
        segmentLabelElements.push(
          React.createElement('div', {
            key: 'altitude-segment-label-1',
            className: 'altitude-segment-label',
            style: segmentLabel1Style
          }, finalAltitudeSegmentLabels[0])
        );
        
        // Apply blink animation to segment label 2 if enabled
        var segmentLabel2Style = Object.assign({}, segmentLabelStyle, {
          left: label2Left.toFixed(2) + '%',
          top: label2Top.toFixed(2) + '%'
        });
        if (finalAltitudeSegmentLabelBlink[1]) {
          var blinkAnimationId2 = createBlinkAnimation(finalAltitudeSegmentLabelBlinkDuration);
          segmentLabel2Style.animation = blinkAnimationId2 + ' ' + finalAltitudeSegmentLabelBlinkDuration + 's ease-in-out infinite';
        }
        
        segmentLabelElements.push(
          React.createElement('div', {
            key: 'altitude-segment-label-2',
            className: 'altitude-segment-label',
            style: segmentLabel2Style
          }, finalAltitudeSegmentLabels[1])
        );
      }
      
      // Render altitude line label if enabled
      var altitudeLineLabelElement = null;
      if (finalShowAltitudeLineLabel && finalAltitudeLineLabel) {
        var altitudeLineLabelFontSize = processGcProperty(finalAltitudeLineLabelFontSize, 'fontSize');
        var altitudeLineLabelOffsetXPx = parseFloat(processGcProperty(finalAltitudeLineLabelOffsetX, 'width')) || 0;
        var altitudeLineLabelOffsetYPx = parseFloat(processGcProperty(finalAltitudeLineLabelOffsetY, 'width')) || 0;
        
        // Calculate midpoint of altitude line
        var midX = (vertex[0] + foot[0]) / 2;
        var midY = (vertex[1] + foot[1]) / 2;
        
        // Calculate angle of altitude line for rotation
        var dx = foot[0] - vertex[0];
        var dy = foot[1] - vertex[1];
        var angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Position label at midpoint with offset
        var labelX = midX + altitudeLineLabelOffsetXPx;
        var labelY = midY + altitudeLineLabelOffsetYPx;
        
        var labelLeft = ((labelX - 1) / gridCols) * 100;
        var labelTop = ((labelY - 1) / gridRows) * 100;
        
        var altitudeLineLabelStyle = {
          position: 'absolute',
          left: labelLeft.toFixed(2) + '%',
          top: labelTop.toFixed(2) + '%',
          transform: 'translate(-50%, -50%) rotate(' + angle + 'deg)',
          fontSize: altitudeLineLabelFontSize,
          fontWeight: finalAltitudeLineLabelFontWeight,
          color: finalAltitudeLineLabelColor,
          pointerEvents: 'none',
          zIndex: zIndex + 20,
          userSelect: 'none',
          whiteSpace: 'nowrap'
        };
        
        // Apply blink animation if enabled
        if (finalAltitudeLineLabelBlink) {
          var altitudeLineLabelBlinkAnimationId = createBlinkAnimation(finalAltitudeLineLabelBlinkDuration);
          altitudeLineLabelStyle.animation = altitudeLineLabelBlinkAnimationId + ' ' + finalAltitudeLineLabelBlinkDuration + 's ease-in-out infinite';
        }
        
        altitudeLineLabelElement = React.createElement('div', {
          key: 'altitude-line-label',
          className: 'altitude-line-label',
          style: altitudeLineLabelStyle
        }, finalAltitudeLineLabel);
      }
      
      // Return SVG, foot label, angle label, segment labels, and line label
      return [svgElement, footLabelElement, footAngleLabelElement].concat(segmentLabelElements).concat(altitudeLineLabelElement).filter(function(el) { return el !== null; });
    }, [finalShowAltitude, calculatedVertices, finalAltitudeFromVertex, finalAltitudeColor, finalAltitudeWidth, finalAltitudeStyle, finalShowAltitudeFoot, finalAltitudeFootSize, finalAltitudeFootColor, finalShowAltitudeFootLabel, finalAltitudeFootLabel, finalAltitudeFootLabelColor, finalAltitudeFootLabelFontSize, finalAltitudeFootLabelFontWeight, finalAltitudeFootLabelOffsetX, finalAltitudeFootLabelOffsetY, finalShowAltitudeSegmentLabels, finalAltitudeSegmentLabels, finalAltitudeSegmentLabelColor, finalAltitudeSegmentLabelFontSize, finalAltitudeSegmentLabelFontWeight, finalAltitudeSegmentLabelOffsetX, finalAltitudeSegmentLabelOffsetY, finalShowAltitudeRightAngle, finalAltitudeRightAngleSize, finalAltitudeRightAngleColor, finalAltitudeBlink, finalAltitudeBlinkDuration, finalShowAltitudeTriangleFill, finalAltitudeTriangleFillColor, finalAltitudeTriangleFillOpacity, finalShowAltitudeFootAngle, finalAltitudeFootAngleLabel, finalAltitudeFootAngleLabelColor, finalAltitudeFootAngleLabelFontSize, finalAltitudeFootAngleLabelFontWeight, finalAltitudeFootAngleLabelOffsetX, finalAltitudeFootAngleLabelOffsetY, finalAltitudeFootAngleBlink, finalAltitudeFootAngleBlinkDuration, finalAltitudeFootAngleArcRadius, finalAltitudeFootAngleArcColor, finalAltitudeFootAngleArcWidth, finalAltitudeFootAngleArcBlink, finalAltitudeFootAngleArcOffsetX, finalAltitudeFootAngleArcOffsetY, finalShowAltitudeLineLabel, finalAltitudeLineLabel, finalAltitudeLineLabelColor, finalAltitudeLineLabelFontSize, finalAltitudeLineLabelFontWeight, finalAltitudeLineLabelOffsetX, finalAltitudeLineLabelOffsetY, finalAltitudeLineLabelBlink, finalAltitudeLineLabelBlinkDuration, zIndex, createBlinkAnimation, processGcProperty]);

    // ============================================================================
    // RENDER ANGLE LABELS
    // ============================================================================

    var renderAngleLabels = React.useMemo(function() {
      if (!finalShowAngleLabels || !calculatedVertices) return null;

      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;
      var fontSize = processGcProperty(finalAngleLabelFontSize, 'fontSize');

      return calculatedVertices.map(function(vertex, index) {
        // Skip if no label for this angle
        if (!finalAngleLabels[index] || finalAngleLabels[index] === '') return null;
        
        // Get adjacent vertices to calculate angle bisector direction
        var prevIndex = (index + 2) % 3;
        var nextIndex = (index + 1) % 3;
        var prevVertex = calculatedVertices[prevIndex];
        var nextVertex = calculatedVertices[nextIndex];
        
        // Calculate vectors from current vertex to adjacent vertices
        var dx1 = prevVertex[0] - vertex[0];
        var dy1 = prevVertex[1] - vertex[1];
        var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        var ux1 = dx1 / len1;
        var uy1 = dy1 / len1;
        
        var dx2 = nextVertex[0] - vertex[0];
        var dy2 = nextVertex[1] - vertex[1];
        var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        var ux2 = dx2 / len2;
        var uy2 = dy2 / len2;
        
        // Calculate bisector direction (average of unit vectors)
        var bisectorX = ux1 + ux2;
        var bisectorY = uy1 + uy2;
        var bisectorLen = Math.sqrt(bisectorX * bisectorX + bisectorY * bisectorY);
        
        // Normalize bisector
        if (bisectorLen > 0) {
          bisectorX /= bisectorLen;
          bisectorY /= bisectorLen;
        } else {
          // Fallback: perpendicular to one of the sides
          bisectorX = -uy1;
          bisectorY = ux1;
        }
        
        // Position label - use direct X/Y offset if provided, otherwise use bisector offset
        var labelX, labelY;
        if (useDirectOffset && finalAngleLabelOffsetX && finalAngleLabelOffsetY) {
          // Use direct X/Y offsets
          var offsetXPx = parseFloat(processGcProperty(finalAngleLabelOffsetX[index], 'width')) || 0;
          var offsetYPx = parseFloat(processGcProperty(finalAngleLabelOffsetY[index], 'width')) || 0;
          labelX = vertex[0] + offsetXPx;
          labelY = vertex[1] + offsetYPx;
        } else {
          // Use bisector offset (original behavior)
        var offsetDist = finalAngleLabelOffset[index];
          labelX = vertex[0] + bisectorX * offsetDist;
          labelY = vertex[1] + bisectorY * offsetDist;
        }
        
        var left = ((labelX - 1) / gridCols) * 100;
        var top = ((labelY - 1) / gridRows) * 100;
        
        // Create blink animation if needed
        var blinkAnimationId = null;
        if (finalAngleLabelBlink[index]) {
          blinkAnimationId = createBlinkAnimation(finalAngleLabelBlinkDuration[index]);
        }
        
        var labelStyle = {
          position: 'absolute',
          left: left.toFixed(2) + '%',
          top: top.toFixed(2) + '%',
          transform: 'translate(-50%, -50%)',
          fontSize: fontSize,
          fontWeight: finalAngleLabelFontWeight,
          fontFamily: finalAngleLabelFontFamily,
          color: finalAngleLabelColor[index] || finalAngleLabelColor[0],
          pointerEvents: 'none',
          zIndex: zIndex + 26,
          userSelect: 'none',
          whiteSpace: 'nowrap'
        };
        
        // Add blink animation if enabled
        if (blinkAnimationId) {
          labelStyle.animation = blinkAnimationId + ' ' + finalAngleLabelBlinkDuration[index] + 's infinite';
        }
        
        return React.createElement('div', {
          key: 'angle-label-' + index,
          className: 'angle-label',
          style: labelStyle
        }, finalAngleLabels[index]);
      }).filter(function(el) { return el !== null; });
    }, [finalShowAngleLabels, calculatedVertices, finalAngleLabels, finalAngleLabelColor, finalAngleLabelFontSize, finalAngleLabelFontWeight, finalAngleLabelFontFamily, finalAngleLabelOffset, finalAngleLabelOffsetX, finalAngleLabelOffsetY, finalAngleLabelBlink, finalAngleLabelBlinkDuration, useDirectOffset, zIndex, processGcProperty, createBlinkAnimation]);

    // ============================================================================
    // RENDER VERTEX LABELS
    // ============================================================================

    var renderVertexLabels = React.useMemo(function() {
      if (!finalShowVertexLabels || !calculatedVertices) return null;

      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;
      var fontSize = processGcProperty(finalVertexLabelFontSize, 'fontSize');

      // Calculate centroid for label offset direction
      var centroid = [
        (calculatedVertices[0][0] + calculatedVertices[1][0] + calculatedVertices[2][0]) / 3,
        (calculatedVertices[0][1] + calculatedVertices[1][1] + calculatedVertices[2][1]) / 3
      ];

      return calculatedVertices.map(function(vertex, index) {
        // Calculate offset direction (away from centroid)
        var dx = vertex[0] - centroid[0];
        var dy = vertex[1] - centroid[1];
        var len = Math.sqrt(dx * dx + dy * dy);
        var offsetDist = finalVertexLabelOffset[index];
        var offsetX = len > 0 ? (dx / len) * offsetDist : 0;
        var offsetY = len > 0 ? (dy / len) * offsetDist : 0;

        var left = ((vertex[0] - 1 + offsetX) / gridCols) * 100;
        var top = ((vertex[1] - 1 + offsetY) / gridRows) * 100;

        // Create blink animation if needed
        var vertexBlinkAnimationId = null;
        if (finalVertexLabelBlink[index]) {
          vertexBlinkAnimationId = createBlinkAnimation(finalVertexLabelBlinkDuration[index]);
        }

        var labelStyle = {
          position: 'absolute',
          left: left.toFixed(2) + '%',
          top: top.toFixed(2) + '%',
          transform: 'translate(-50%, -50%) rotate(' + finalVertexLabelRotation[index] + 'deg)',
          fontSize: fontSize,
          fontWeight: finalVertexLabelFontWeight,
          fontStyle: finalVertexLabelFontStyle,
          fontFamily: finalVertexLabelFontFamily,
          textDecoration: finalVertexLabelTextDecoration,
          color: finalVertexLabelColor,
          pointerEvents: onVertexClick ? 'auto' : 'none',
          cursor: onVertexClick ? 'pointer' : 'default',
          zIndex: zIndex + 25,
          userSelect: 'none',
          transformOrigin: 'center center'
        };
        
        // Add blink animation if enabled
        if (vertexBlinkAnimationId) {
          labelStyle.animation = vertexBlinkAnimationId + ' ' + finalVertexLabelBlinkDuration[index] + 's infinite';
        }

        // Convert LaTeX fractions to HTML
        var convertedVertexLabel = convertLatexFractions(finalVertexLabels[index]);
        // Check if label contains HTML (fractions or other HTML tags)
        var vertexLabelContainsHTML = convertedVertexLabel !== finalVertexLabels[index] || /<[^>]+>/.test(convertedVertexLabel);
        
        var vertexLabelProps = {
          key: 'vertex-label-' + index,
          className: 'vertex-label',
          style: labelStyle,
          onClick: function(e) {
            e.stopPropagation();
            handleVertexClick(index, vertex);
          }
        };
        
        if (vertexLabelContainsHTML) {
          vertexLabelProps.dangerouslySetInnerHTML = { __html: convertedVertexLabel };
        }
        
        return React.createElement('div', vertexLabelProps, vertexLabelContainsHTML ? null : convertedVertexLabel);
      });
    }, [finalShowVertexLabels, calculatedVertices, finalVertexLabels, finalVertexLabelColor, finalVertexLabelFontSize, finalVertexLabelFontStyle, finalVertexLabelFontWeight, finalVertexLabelFontFamily, finalVertexLabelTextDecoration, finalVertexLabelOffset, finalVertexLabelRotation, finalVertexLabelBlink, finalVertexLabelBlinkDuration, zIndex, handleVertexClick, onVertexClick, createBlinkAnimation, processGcProperty]);

    // ============================================================================
    // RENDER SIDE LABELS
    // ============================================================================

    var renderSideLabels = React.useMemo(function() {
      if (!finalShowSideLabels || !calculatedVertices) return null;

      var dims = getGridDimensions();
      var gridRows = dims.gridRows;
      var gridCols = dims.gridCols;
      var fontSize = processGcProperty(finalSideLabelFontSize, 'fontSize');

      // Calculate centroid for label offset direction
      var centroid = [
        (calculatedVertices[0][0] + calculatedVertices[1][0] + calculatedVertices[2][0]) / 3,
        (calculatedVertices[0][1] + calculatedVertices[1][1] + calculatedVertices[2][1]) / 3
      ];

      // Side midpoints
      var sideMidpoints = [
        { // Side 0: between v0 and v1
          coords: [(calculatedVertices[0][0] + calculatedVertices[1][0]) / 2, (calculatedVertices[0][1] + calculatedVertices[1][1]) / 2],
          index: 0
        },
        { // Side 1: between v1 and v2
          coords: [(calculatedVertices[1][0] + calculatedVertices[2][0]) / 2, (calculatedVertices[1][1] + calculatedVertices[2][1]) / 2],
          index: 1
        },
        { // Side 2: between v2 and v0
          coords: [(calculatedVertices[2][0] + calculatedVertices[0][0]) / 2, (calculatedVertices[2][1] + calculatedVertices[0][1]) / 2],
          index: 2
        }
      ];

      return sideMidpoints.map(function(pos) {
        // Calculate offset direction (away from centroid)
        var dx = pos.coords[0] - centroid[0];
        var dy = pos.coords[1] - centroid[1];
        var len = Math.sqrt(dx * dx + dy * dy);
        var offsetDist = finalSideLabelOffset[pos.index];
        var offsetX = len > 0 ? (dx / len) * offsetDist : 0;
        var offsetY = len > 0 ? (dy / len) * offsetDist : 0;

        var left = ((pos.coords[0] - 1 + offsetX) / gridCols) * 100;
        var top = ((pos.coords[1] - 1 + offsetY) / gridRows) * 100;

        var labelBlink = finalSideLabelBlink[pos.index];
        var labelBlinkDuration = finalSideLabelBlinkDuration[pos.index];
        var blinkAnimation = labelBlink ? createBlinkAnimation(labelBlinkDuration) : null;
        var labelColor = finalSideLabelColor[pos.index];

        var labelStyle = {
          position: 'absolute',
          left: left.toFixed(2) + '%',
          top: top.toFixed(2) + '%',
          transform: 'translate(-50%, -50%) rotate(' + finalSideLabelRotation[pos.index] + 'deg)',
          fontSize: fontSize,
          fontStyle: finalSideLabelFontStyle,
          fontWeight: finalSideLabelFontWeight,
          fontFamily: finalSideLabelFontFamily,
          textDecoration: finalSideLabelTextDecoration,
          color: labelColor,
          backgroundColor: finalSideLabelBackgroundColor,
          borderColor: finalSideLabelBorderColor,
          borderWidth: finalSideLabelBorderWidth,
          borderStyle: finalSideLabelBorderWidth !== '0' && finalSideLabelBorderWidth !== '0px' ? 'solid' : 'none',
          borderRadius: finalSideLabelBorderRadius,
          padding: finalSideLabelPadding,
          pointerEvents: 'none',
          zIndex: zIndex + 20,
          userSelect: 'none',
          transformOrigin: 'center center'
        };
        
        if (blinkAnimation) {
          labelStyle.animation = blinkAnimation + ' ' + labelBlinkDuration + 's ease-in-out infinite';
        }

        // Convert LaTeX fractions to HTML
        var convertedSideLabel = convertLatexFractions(finalSideLabels[pos.index]);
        // Check if label contains HTML (fractions or other HTML tags)
        var sideLabelContainsHTML = convertedSideLabel !== finalSideLabels[pos.index] || /<[^>]+>/.test(convertedSideLabel);
        
        var sideLabelProps = {
          key: 'side-label-' + pos.index,
          className: 'side-label',
          style: labelStyle
        };
        
        if (sideLabelContainsHTML) {
          sideLabelProps.dangerouslySetInnerHTML = { __html: convertedSideLabel };
        }
        
        return React.createElement('div', sideLabelProps, sideLabelContainsHTML ? null : convertedSideLabel);
      });
    }, [finalShowSideLabels, calculatedVertices, finalSideLabels, finalSideLabelColor, finalSideLabelFontSize, finalSideLabelFontStyle, finalSideLabelFontWeight, finalSideLabelFontFamily, finalSideLabelTextDecoration, finalSideLabelOffset, finalSideLabelRotation, finalSideLabelBackgroundColor, finalSideLabelBorderColor, finalSideLabelBorderWidth, finalSideLabelBorderRadius, finalSideLabelPadding, finalSideLabelBlink, finalSideLabelBlinkDuration, zIndex, createBlinkAnimation]);

    // ============================================================================
    // BUILD CHILDREN
    // ============================================================================

    var children = React.useMemo(function() {
      var elements = [];
      
      if (renderSides) elements.push(renderSides);
      if (renderAltitude) {
        // renderAltitude can return an array (SVG + label), so handle both cases
        if (Array.isArray(renderAltitude)) {
          elements = elements.concat(renderAltitude);
        } else {
          elements.push(renderAltitude);
        }
      }
      if (renderRightAngleMarker) elements.push(renderRightAngleMarker);
      if (renderAngleArcs) {
        if (Array.isArray(renderAngleArcs)) {
          elements = elements.concat(renderAngleArcs);
        } else {
          elements.push(renderAngleArcs);
        }
      }
      if (renderAngleLabels) {
        if (Array.isArray(renderAngleLabels)) {
          elements = elements.concat(renderAngleLabels);
        } else {
          elements.push(renderAngleLabels);
        }
      }
      if (renderVertexLabels) {
        if (Array.isArray(renderVertexLabels)) {
          elements = elements.concat(renderVertexLabels);
        } else {
          elements.push(renderVertexLabels);
        }
      }
      if (renderSideLabels) {
        if (Array.isArray(renderSideLabels)) {
          elements = elements.concat(renderSideLabels);
        } else {
          elements.push(renderSideLabels);
        }
      }
      
      return elements;
    }, [renderSides, renderAltitude, renderRightAngleMarker, renderAngleArcs, renderAngleLabels, renderVertexLabels, renderSideLabels]);

    return React.createElement('div', {
      id: id || ('triangle-' + (elementName || 'default')),
      className: 'triangle-component right-angle-triangle-component', // Include old class for backward compat
      style: containerStyle,
      onClick: onTriangleClick ? handleTriangleClick : undefined,
      'data-element-name': elementName,
      'data-page': currentPage,
      'data-sides': calculatedSides ? calculatedSides.join(',') : '',
      'data-input-method': inputMethod,
      'data-has-right-angle': hasRightAngle,
      'data-position': finalPosition
    }, children);
  });

  // ============================================================================
  // BACKWARD COMPATIBILITY: RightAngleTriangleComponent alias
  // ============================================================================

  var RightAngleTriangleComponent = TriangleComponent;

  // ============================================================================
  // ELEMENT CONFIGURATIONS
  // ============================================================================

  // Triangle Element Configuration (new)
  var TriangleElement = {
    triangle: {
      type: 'triangle',
      coordinates: [100, 100, 600, 500],
      zIndex: 50,
      props: {
        componentType: 'TriangleComponent',
        sides: [3, 4, 5], // Default to 3-4-5 right triangle
        multiplier: 10,
        position: 'bottom-left',
        rotation: 0,
        sideColor: '#000000',
        sideWidth: '3gc',
        sideStyle: 'solid',
        showVertexLabels: true,
        vertexLabels: ['A', 'B', 'C'],
        vertexLabelColor: '#000000',
        vertexLabelFontSize: '16gc',
        vertexLabelFontWeight: 'bold',
        vertexLabelOffset: 20,
        showSideLabels: true,
        sideLabels: ['a', 'b', 'c'],
        sideLabelColor: '#000000',
        sideLabelFontSize: '14gc',
        sideLabelFontStyle: 'italic',
        sideLabelOffset: 25,
        sideLabelBackgroundColor: 'rgba(255, 255, 255, 0.8)',
        showRightAngleMarker: true, // Auto-detected based on triangle type
        rightAngleMarkerSize: '15gc',
        rightAngleMarkerColor: '#000000',
        rightAngleMarker: {
          show: true,
          size: '15gc',
          color: '#000000',
          offset: 0, // Can be number or [x, y] array
          offsetX: 0,
          offsetY: 0,
          blink: false,
          blinkDuration: 1
        },
        // Angle labels (for non-right angles)
        showAngleLabels: false,
        angleLabels: ['', '', ''], // Labels for each vertex angle, e.g., ['', '30°', '60°']
        angleLabelColor: '#ffffff',
        angleLabelFontSize: '14gc',
        angleLabelFontWeight: 'normal',
        angleLabelOffset: 35,
        // Angle arc markers (for non-right angles)
        showAngleArcs: false,
        angleArcRadius: '25gc', // Can be array for per-angle radius
        angleArcColor: '#ffffff', // Can be array for per-angle color
        angleArcWidth: '2', // Can be array for per-angle width
        // Altitude (perpendicular from vertex to opposite side)
        showAltitude: false,
        altitudeFromVertex: 2, // Vertex index (0, 1, 2) or label ('A', 'B', 'C')
        altitudeColor: '#ffffff',
        altitudeWidth: '2gc',
        altitudeStyle: 'dashed', // 'solid', 'dashed', 'dotted'
        showAltitudeFoot: true,
        altitudeFootSize: '6gc',
        altitudeFootColor: '#ffffff',
        showAltitudeFootLabel: false,
        altitudeFootLabel: 'D', // Label for the foot point
        altitudeFootLabelColor: '#ffffff',
        altitudeFootLabelFontSize: '24gc',
        altitudeFootLabelFontWeight: 'bold',
        altitudeFootLabelOffset: 25, // Offset from foot point in grid units
        altitudeFootLabelOffsetX: 0, // Horizontal offset from foot point
        altitudeFootLabelOffsetY: 0, // Vertical offset from foot point
        showAltitudeSegmentLabels: false, // Show labels for segments created by altitude
        altitudeSegmentLabels: ['AD', 'DB'], // Labels for the two segments
        altitudeSegmentLabelColor: '#ffffff',
        altitudeSegmentLabelFontSize: '24gc',
        altitudeSegmentLabelFontWeight: 'bold',
        altitudeSegmentLabelOffset: 20, // Offset from segment midpoint (can be number or [x, y] array)
        altitudeSegmentLabelOffsetX: 0, // Horizontal offset from segment midpoint
        altitudeSegmentLabelOffsetY: 0, // Vertical offset from segment midpoint
        showAltitudeRightAngle: true,
        altitudeRightAngleSize: '12gc',
        altitudeRightAngleColor: '#ffffff'
      },
      
      createOptimized: window.SharedUtilities && window.SharedUtilities.createOptimizedElementFactory 
        ? window.SharedUtilities.createOptimizedElementFactory('triangle', function(props, elementId) {
            return React.createElement(TriangleComponent, props);
          })
        : undefined
    }
  };

  // Right Angle Triangle Element Configuration (backward compatibility)
  var RightAngleTriangleElement = {
    rightAngleTriangle: {
      type: 'rightAngleTriangle',
      coordinates: [100, 100, 600, 500],
      zIndex: 50,
      props: {
        componentType: 'RightAngleTriangleComponent',
        sides: [3, 4, 5],
        multiplier: 10,
        rightAnglePosition: 'bottom-left',
        sideColor: '#000000',
        sideWidth: '3gc',
        sideStyle: 'solid',
        showVertexLabels: true,
        vertexLabels: ['A', 'B', 'C'],
        vertexLabelColor: '#000000',
        vertexLabelFontSize: '16gc',
        vertexLabelFontStyle: 'normal',
        vertexLabelFontWeight: 'bold',
        vertexLabelFontFamily: 'inherit',
        vertexLabelTextDecoration: 'none',
        vertexLabelOffset: 20,
        showSideLabels: true,
        sideLabels: ['a', 'b', 'c'],
        sideLabelColor: '#000000',
        sideLabelFontSize: '14gc',
        sideLabelFontStyle: 'italic',
        sideLabelFontWeight: 'normal',
        sideLabelFontFamily: 'inherit',
        sideLabelTextDecoration: 'none',
        sideLabelOffset: 25,
        sideLabelRotation: 0,
        sideLabelBackgroundColor: 'rgba(255, 255, 255, 0.8)',
        sideLabelBorderColor: 'transparent',
        sideLabelBorderWidth: '0',
        sideLabelBorderRadius: '3px',
        sideLabelPadding: '2px 6px',
        sideLabelBlink: false,
        sideLabelBlinkDuration: 1,
        showRightAngleMarker: true,
        rightAngleMarkerSize: '15gc',
        rightAngleMarkerColor: '#000000',
        rightAngleMarker: {
          show: true,
          size: '15gc',
          color: '#000000',
          offset: 0, // Can be number or [x, y] array
          offsetX: 0,
          offsetY: 0,
          blink: false,
          blinkDuration: 1
        },
        // Angle labels (for non-right angles)
        showAngleLabels: false,
        angleLabels: ['', '', ''], // Labels for each vertex angle, e.g., ['', '30°', '60°']
        angleLabelColor: '#ffffff',
        angleLabelFontSize: '14gc',
        angleLabelFontWeight: 'normal',
        angleLabelFontFamily: 'inherit',
        angleLabelOffset: 35,
        // Angle arc markers (for non-right angles)
        showAngleArcs: false,
        angleArcRadius: '25gc', // Can be array for per-angle radius
        angleArcColor: '#ffffff', // Can be array for per-angle color
        angleArcWidth: '2', // Can be array for per-angle width
        // Altitude (perpendicular from vertex to opposite side)
        showAltitude: false,
        altitudeFromVertex: 2, // Vertex index (0, 1, 2) or label ('A', 'B', 'C')
        altitudeColor: '#ffffff',
        altitudeWidth: '2gc',
        altitudeStyle: 'dashed', // 'solid', 'dashed', 'dotted'
        showAltitudeFoot: true,
        altitudeFootSize: '6gc',
        altitudeFootColor: '#ffffff',
        showAltitudeFootLabel: false,
        altitudeFootLabel: 'D', // Label for the foot point
        altitudeFootLabelColor: '#ffffff',
        altitudeFootLabelFontSize: '24gc',
        altitudeFootLabelFontWeight: 'bold',
        altitudeFootLabelOffset: 25, // Offset from foot point in grid units
        altitudeFootLabelOffsetX: 0, // Horizontal offset from foot point
        altitudeFootLabelOffsetY: 0, // Vertical offset from foot point
        showAltitudeSegmentLabels: false, // Show labels for segments created by altitude
        altitudeSegmentLabels: ['AD', 'DB'], // Labels for the two segments
        altitudeSegmentLabelColor: '#ffffff',
        altitudeSegmentLabelFontSize: '24gc',
        altitudeSegmentLabelFontWeight: 'bold',
        altitudeSegmentLabelOffset: 20, // Offset from segment midpoint (can be number or [x, y] array)
        altitudeSegmentLabelOffsetX: 0, // Horizontal offset from segment midpoint
        altitudeSegmentLabelOffsetY: 0, // Vertical offset from segment midpoint
        showAltitudeRightAngle: true,
        altitudeRightAngleSize: '12gc',
        altitudeRightAngleColor: '#ffffff'
      },
      
      createOptimized: window.SharedUtilities && window.SharedUtilities.createOptimizedElementFactory
        ? window.SharedUtilities.createOptimizedElementFactory('rightAngleTriangle', function(props, elementId) {
            return React.createElement(RightAngleTriangleComponent, props);
          })
        : undefined
    }
  };

  // ============================================================================
  // EXPORTS
  // ============================================================================

  if (typeof window !== 'undefined') {
    // Export new TriangleComponent
    window.TriangleComponent = {
      TriangleComponent: TriangleComponent,
      TriangleElement: TriangleElement
    };
    
    // Export RightAngleTriangleComponent for backward compatibility
    window.RightAngleTriangleComponent = {
      RightAngleTriangleComponent: RightAngleTriangleComponent,
      RightAngleTriangleElement: RightAngleTriangleElement
    };
  }

  console.log('✅ TriangleComponent loaded successfully (supports any triangle type)');
  console.log('✅ RightAngleTriangleComponent alias available for backward compatibility');

})();
