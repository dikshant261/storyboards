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
// =====================================================
// Universal HTML + KaTeX Renderer
// =====================================================
var renderHtmlWithKaTeX = function (input) {
  if (!input || typeof input !== 'string') return input;

  if (typeof katex === 'undefined') {
    console.warn('KaTeX not loaded');
    return input;
  }

  return input.replace(/\$([^$]+)\$/g, function (_, math) {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode: false
      });
    } catch (e) {
      console.warn('KaTeX error:', e);
      return _;
    }
  });
};

(function () {
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
    var scaledVertices = localVertices.map(function (v) {
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
      rotatedVertices = scaledVertices.map(function (v) {
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
    return rotatedVertices.map(function (v) {
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

  var TriangleComponent = React.memo(function (props) {
    // Function to convert LaTeX fractions to HTML fractions
    

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

    // Callbacks
    var onTriangleClick = props.onTriangleClick;
    var onVertexClick = props.onVertexClick;
    var onSideClick = props.onSideClick;

    // Determine position (with backward compatibility for rightAnglePosition)
    var finalPosition = positionProp || rightAnglePosition || 'bottom-left';

    // ============================================================================
    // CALCULATE VERTICES
    // ============================================================================

    var vertexCalcResult = React.useMemo(function () {
      var localVertices = null;
      var sideLengths = null;
      var method = 'unknown';

      // Priority: vertices > sas > sides
      if (inputVertices && Array.isArray(inputVertices) && inputVertices.length === 3) {
        // Direct vertex input - scale by multiplier if needed
        localVertices = inputVertices.map(function (v) {
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
          sideLengths = sides.map(function (s) { return s * multiplier; });
        }
        method = 'sides';
      }

      if (!localVertices) {
        console.warn('⚠️ [Triangle] No valid input provided. Using default 3-4-5 triangle.');
        localVertices = calculateVerticesFromSides([3, 4, 5], multiplier);
        sideLengths = [3, 4, 5].map(function (s) { return s * multiplier; });
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
      var originalSides = sides || (sideLengths ? sideLengths.map(function (s) { return s / multiplier; }) : [3, 4, 5]);
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
    React.useEffect(function () {
      var currentSideColorValue = sideColor || side.color || '#000000';
      var currentInitialSideColor = Array.isArray(currentSideColorValue) ? currentSideColorValue : [currentSideColorValue, currentSideColorValue, currentSideColorValue];

      var currentSideBlinkValue = sideBlink !== undefined ? sideBlink : (side.blink !== undefined ? side.blink : false);
      var currentInitialSideBlink = Array.isArray(currentSideBlinkValue) ? currentSideBlinkValue : [currentSideBlinkValue, currentSideBlinkValue, currentSideBlinkValue];

      var currentSideLabelBlinkValue = sideLabelBlink !== undefined ? sideLabelBlink : (sideLabel.blink !== undefined ? sideLabel.blink : false);
      var currentInitialSideLabelBlink = Array.isArray(currentSideLabelBlinkValue) ? currentSideLabelBlinkValue : [currentSideLabelBlinkValue, currentSideLabelBlinkValue, currentSideLabelBlinkValue];

      var currentSideLabelColorValue = sideLabelColor || sideLabel.color || '#000000';
      var currentInitialSideLabelColor = Array.isArray(currentSideLabelColorValue) ? currentSideLabelColorValue : [currentSideLabelColorValue, currentSideLabelColorValue, currentSideLabelColorValue];

      console.log('🔄 [Triangle] Component ID changed to:', id, '- Resetting dynamic state');
      setDynamicSideColor(currentInitialSideColor);
      setDynamicSideBlink(currentInitialSideBlink);
      setDynamicSideLabels(sideLabels || sideLabel.labels || ['a', 'b', 'c']);
      setDynamicSideLabelBlink(currentInitialSideLabelBlink);
      setDynamicSideLabelColor(currentInitialSideLabelColor);
    }, [id]);

    // Listen for calculation step changes to update triangle labels
    React.useEffect(function () {
      function handleStepChange(event) {
        var detail = event.detail;
        var currentStepIndex = detail.currentStepIndex;
        var pageNumber = detail.pageNumber;
        if (pageNumber === 10 && currentStepIndex === 4 && id && id.includes('page10')) {
          console.log('🔺 [Triangle] Step 5 reached, updating sideLabel config for', id);
          setDynamicSideLabels(['3 m', '4 m', '5 m']);
          setDynamicSideLabelBlink([true, false, false]);
        }
        // Handle page 3 and page 10 side label updates
        if ((pageNumber === 3 || pageNumber === 10) && id && (id.includes('page3') || id.includes('page10'))) {
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
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('calculationStepChanged', handleStepChange);
        return function () { window.removeEventListener('calculationStepChanged', handleStepChange); };
      }
    }, [id]);

    // Listen for quiz correct answer events
    React.useEffect(function () {
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
        return function () { window.removeEventListener('quizCorrectAnswer', handleCorrectAnswer); };
      }
    }, [id]);

    // Listen for quizCompleted events to update triangle labels for page 4 and page 10
    React.useEffect(function () {
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
          setDynamicSideLabels(['c = 120cm', 'a = 60 cm', 'b = 60$\\sqrt{3}$ cm']);
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('quizCompleted', handleQuizCompleted);
        return function () { window.removeEventListener('quizCompleted', handleQuizCompleted); };
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

    var createBlinkAnimation = React.useCallback(function (duration) {
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

    var containerPosition = React.useMemo(function () {
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

    var containerStyle = React.useMemo(function () {
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

    var handleTriangleClick = React.useCallback(function (e) {
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

    var handleVertexClick = React.useCallback(function (vertexIndex, coords) {
      if (onVertexClick) {
        onVertexClick(vertexIndex, coords, finalVertexLabels[vertexIndex]);
      }
    }, [onVertexClick, finalVertexLabels]);

    var handleSideClick = React.useCallback(function (sideIndex, startCoords, endCoords) {
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

    var renderSides = React.useMemo(function () {
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

      var lineElements = sideDefinitions.map(function (sideItem) {
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
          onClick: function () { handleSideClick(sideItem.index, sideItem.origStart, sideItem.origEnd); }
        });
      });

      // Add vertex markers if enabled
      var vertexElements = [];
      if (finalShowVertices) {
        var vertexSizePx = parseFloat(processGcProperty(finalVertexSize, 'width')) || 6;
        var svgVertices = [svgV0, svgV1, svgV2];

        svgVertices.forEach(function (vertex, index) {
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

    var renderRightAngleMarker = React.useMemo(function () {
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
      var svgLeft = ((rightAngleVertex[0] - 1) / gridCols) * 100;
      var svgTop = ((rightAngleVertex[1] - 1) / gridRows) * 100;
      var svgSize = markerSize * 1.5;

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
    }, [finalShowRightAngleMarker, calculatedVertices, rightAngleVertexIndex, finalRightAngleMarkerSize, finalRightAngleMarkerColor, zIndex]);

    // ============================================================================
    // RENDER VERTEX LABELS
    // ============================================================================

    var renderVertexLabels = React.useMemo(function () {
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

      return calculatedVertices.map(function (vertex, index) {
        // Calculate offset direction (away from centroid)
        var dx = vertex[0] - centroid[0];
        var dy = vertex[1] - centroid[1];
        var len = Math.sqrt(dx * dx + dy * dy);
        var offsetDist = finalVertexLabelOffset[index];
        var offsetX = len > 0 ? (dx / len) * offsetDist : 0;
        var offsetY = len > 0 ? (dy / len) * offsetDist : 0;

        var left = ((vertex[0] - 1 + offsetX) / gridCols) * 100;
        var top = ((vertex[1] - 1 + offsetY) / gridRows) * 100;

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

        // Convert LaTeX fractions to HTML
        var convertedVertexLabel = renderHtmlWithKaTeX(finalVertexLabels[index]);
        // Check if label contains HTML (fractions or other HTML tags)
        var vertexLabelContainsHTML = convertedVertexLabel !== finalVertexLabels[index] || /<[^>]+>/.test(convertedVertexLabel);

        var vertexLabelProps = {
          key: 'vertex-label-' + index,
          className: 'vertex-label',
          style: labelStyle,
          onClick: function (e) {
            e.stopPropagation();
            handleVertexClick(index, vertex);
          }
        };

        if (vertexLabelContainsHTML) {
          vertexLabelProps.dangerouslySetInnerHTML = { __html: convertedVertexLabel };
        }

        return React.createElement('div', vertexLabelProps, vertexLabelContainsHTML ? null : convertedVertexLabel);
      });
    }, [finalShowVertexLabels, calculatedVertices, finalVertexLabels, finalVertexLabelColor, finalVertexLabelFontSize, finalVertexLabelFontStyle, finalVertexLabelFontWeight, finalVertexLabelFontFamily, finalVertexLabelTextDecoration, finalVertexLabelOffset, finalVertexLabelRotation, zIndex, handleVertexClick, onVertexClick]);

    // ============================================================================
    // RENDER SIDE LABELS
    // ============================================================================

    var renderSideLabels = React.useMemo(function () {
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

      return sideMidpoints.map(function (pos) {
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
        var convertedSideLabel = renderHtmlWithKaTeX(finalSideLabels[pos.index]);
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

    var children = React.useMemo(function () {
      var elements = [];

      if (renderSides) elements.push(renderSides);
      if (renderRightAngleMarker) elements.push(renderRightAngleMarker);
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
    }, [renderSides, renderRightAngleMarker, renderVertexLabels, renderSideLabels]);

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
        rightAngleMarkerColor: '#000000'
      },

      createOptimized: window.SharedUtilities && window.SharedUtilities.createOptimizedElementFactory
        ? window.SharedUtilities.createOptimizedElementFactory('triangle', function (props, elementId) {
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
        rightAngleMarkerColor: '#000000'
      },

      createOptimized: window.SharedUtilities && window.SharedUtilities.createOptimizedElementFactory
        ? window.SharedUtilities.createOptimizedElementFactory('rightAngleTriangle', function (props, elementId) {
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
