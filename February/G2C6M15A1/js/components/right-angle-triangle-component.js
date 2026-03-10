/**
 * Right Angle Triangle Component - React 18 Optimized
 * 
 * Renders right-angle triangles with configurable:
 * - Sides (as Pythagorean triples with multiplier for gc units)
 * - Side colors and line styles
 * - Vertex labels (A, B, C)
 * - Side labels (a, b, c)
 * - Right angle square marker
 * - Various callbacks for interaction
 */

// Dependencies: React, GridCellFontUtils, GridPrecisionConfig, LineComponent

/**
 * Right Angle Triangle Component
 * @param {Object} props - Component props
 * @param {string} props.id - Component ID
 * @param {string} props.elementName - Element name
 * @param {number} props.currentPage - Current page number
 * @param {Array<number>} props.coordinates - Container coordinates [x1, y1, x2, y2]
 * @param {number} props.zIndex - Base z-index
 * @param {Array<number>} props.sides - Pythagorean triple [a, b, c] where a and b are perpendicular sides
 * @param {number} props.multiplier - Scale factor for gc units (default: 10)
 * @param {string} props.rightAnglePosition - Position of right angle: 'bottom-left', 'bottom-right', 'top-left', 'top-right'
 * @param {string|Array<string>} props.sideColor - Color of sides. Can be a single string for all sides or an array [colorA, colorB, colorC] (default: '#000000')
 * @param {string} props.sideWidth - Width of sides in gc units (default: '3gc')
 * @param {string} props.sideStyle - Line style: 'solid', 'dashed', 'dotted' (default: 'solid')
 * @param {string} props.sideLineJoin - Line join style: 'miter', 'round', 'bevel' (default: 'round')
 * @param {boolean} props.showVertices - Show vertex markers (circles) at line intersections (default: false)
 * @param {string} props.vertexColor - Color of vertex markers (default: same as side color)
 * @param {string} props.vertexSize - Size of vertex markers in gc units (default: '6gc')
 * @param {boolean|Array<boolean>} props.sideBlink - Enable blinking animation for sides. Can be a single boolean for all sides or an array [blinkA, blinkB, blinkC] (default: false)
 * @param {number|Array<number>} props.sideBlinkDuration - Blink animation duration in seconds. Can be a single number for all sides or an array [durationA, durationB, durationC] (default: 1)
 * @param {boolean} props.showVertexLabels - Show vertex labels (default: true)
 * @param {Array<string>} props.vertexLabels - Labels for vertices (default: ['A', 'B', 'C'])
 * @param {string} props.vertexLabelColor - Color of vertex labels (default: '#000000')
 * @param {string} props.vertexLabelFontSize - Font size of vertex labels (default: '16gc')
 * @param {string} props.vertexLabelFontStyle - Font style: 'normal', 'italic', 'oblique' (default: 'normal')
 * @param {string|number} props.vertexLabelFontWeight - Font weight: 'normal', 'bold', '100'-'900' (default: 'bold')
 * @param {string} props.vertexLabelFontFamily - Font family (default: 'inherit')
 * @param {string} props.vertexLabelTextDecoration - Text decoration: 'none', 'underline', 'overline', 'line-through' (default: 'none')
 * @param {number|Array<number>} props.vertexLabelOffset - Offset distance from vertex in grid units. Can be a single number for all labels or an array [offsetA, offsetB, offsetC] (default: 20)
 * @param {number|Array<number>} props.vertexLabelRotation - Rotation angle in degrees. Can be a single number for all labels or an array [rotationA, rotationB, rotationC] (default: 0)
 * @param {boolean} props.showSideLabels - Show side labels (default: true)
 * @param {Array<string>} props.sideLabels - Labels for sides (default: ['a', 'b', 'c'])
 * @param {string|Array<string>} props.sideLabelColor - Color of side labels. Can be a single string for all labels or an array [colorA, colorB, colorC] (default: '#000000')
 * @param {string} props.sideLabelFontSize - Font size of side labels (default: '14gc')
 * @param {string} props.sideLabelFontStyle - Font style: 'normal', 'italic', 'oblique' (default: 'italic')
 * @param {string|number} props.sideLabelFontWeight - Font weight: 'normal', 'bold', '100'-'900' (default: 'normal')
 * @param {string} props.sideLabelFontFamily - Font family (default: 'inherit')
 * @param {string} props.sideLabelTextDecoration - Text decoration: 'none', 'underline', 'overline', 'line-through' (default: 'none')
 * @param {number|Array<number>} props.sideLabelOffset - Offset distance from side midpoint in grid units. Can be a single number for all labels or an array [offsetA, offsetB, offsetC] (default: 25)
 * @param {number|Array<number>} props.sideLabelRotation - Rotation angle in degrees. Can be a single number for all labels or an array [rotationA, rotationB, rotationC] (default: 0)
 * @param {string} props.sideLabelBackgroundColor - Background color of side labels (default: 'rgba(255, 255, 255, 0.8)')
 * @param {string} props.sideLabelBorderColor - Border color of side labels (default: 'transparent')
 * @param {string} props.sideLabelBorderWidth - Border width of side labels (default: '0')
 * @param {string} props.sideLabelBorderRadius - Border radius of side labels (default: '3px')
 * @param {string} props.sideLabelPadding - Padding of side labels (default: '2px 6px')
 * @param {boolean|Array<boolean>} props.sideLabelBlink - Enable blinking animation for side labels. Can be a single boolean for all labels or an array [blinkA, blinkB, blinkC] (default: false)
 * @param {number|Array<number>} props.sideLabelBlinkDuration - Blink animation duration in seconds. Can be a single number for all labels or an array [durationA, durationB, durationC] (default: 1)
 * @param {boolean} props.showRightAngleMarker - Show right angle square marker (default: true)
 * @param {string} props.rightAngleMarkerSize - Size of right angle marker (default: '15gc')
 * @param {string} props.rightAngleMarkerColor - Color of right angle marker (default: '#000000')
 * @param {Function} props.onTriangleClick - Callback when triangle is clicked
 * @param {Function} props.onVertexClick - Callback when a vertex is clicked
 * @param {Function} props.onSideClick - Callback when a side is clicked
 */
const RightAngleTriangleComponent = React.memo((props) => {
  // Support both nested and flat props for backward compatibility
  const {
    id,
    elementName,
    currentPage,
    coordinates = [100, 100, 600, 500],
    zIndex = 50,
    sides = [3, 4, 5],
    multiplier = 10,
    rightAnglePosition = 'bottom-left',
    // Side styling - support nested or flat
    sideColor,
    sideWidth,
    sideStyle,
    sideLineJoin,
    showVertices,
    vertexColor,
    vertexSize,
    sideBlink,
    sideBlinkDuration,
    side = {},
    // Vertex labels - support nested or flat
    showVertexLabels,
    vertexLabels,
    vertexLabelColor,
    vertexLabelFontSize,
    vertexLabelFontStyle,
    vertexLabelFontWeight,
    vertexLabelFontFamily,
    vertexLabelTextDecoration,
    vertexLabelOffset,
    vertexLabelRotation,
    vertexLabel = {},
    // Side labels - support nested or flat
    showSideLabels,
    sideLabels,
    sideLabelColor,
    sideLabelFontSize,
    sideLabelFontStyle,
    sideLabelFontWeight,
    sideLabelFontFamily,
    sideLabelTextDecoration,
    sideLabelOffset,
    sideLabelRotation,
    sideLabelBackgroundColor,
    sideLabelBorderColor,
    sideLabelBorderWidth,
    sideLabelBorderRadius,
    sideLabelPadding,
    sideLabelBlink,
    sideLabelBlinkDuration,
    sideLabel = {},
    // Right angle marker - support nested or flat
    showRightAngleMarker,
    rightAngleMarkerSize,
    rightAngleMarkerColor,
    rightAngleMarker = {},
    onTriangleClick,
    onVertexClick,
    onSideClick
  } = props;

  // Extract side styling (nested or flat) - with dynamic updates from quiz correct answers
  const sideColorValue = sideColor || side.color || '#000000';
  const initialSideColor = Array.isArray(sideColorValue) ? sideColorValue : [sideColorValue, sideColorValue, sideColorValue];
  const [dynamicSideColor, setDynamicSideColor] = React.useState(initialSideColor);
  
  const sideBlinkValue = sideBlink !== undefined ? sideBlink : (side.blink !== undefined ? side.blink : false);
  const initialSideBlink = Array.isArray(sideBlinkValue) ? sideBlinkValue : [sideBlinkValue, sideBlinkValue, sideBlinkValue];
  const [dynamicSideBlink, setDynamicSideBlink] = React.useState(initialSideBlink);
  
  const finalSideColor = dynamicSideColor;
  const finalSideWidth = sideWidth || side.width || '3gc';
  const finalSideStyle = sideStyle || side.style || 'solid';
  const finalSideLineJoin = sideLineJoin || side.lineJoin || 'round';
  const finalShowVertices = showVertices !== undefined ? showVertices : (side.showVertices !== undefined ? side.showVertices : false);
  const finalVertexColor = vertexColor || side.vertexColor || finalSideColor[0]; // Default to first side color
  const finalVertexSize = vertexSize || side.vertexSize || '6gc';
  // Use dynamic blink state
  const finalSideBlink = dynamicSideBlink;
  const sideBlinkDurationValue = sideBlinkDuration !== undefined ? sideBlinkDuration : (side.blinkDuration !== undefined ? side.blinkDuration : 1);
  const finalSideBlinkDuration = Array.isArray(sideBlinkDurationValue) ? sideBlinkDurationValue : [sideBlinkDurationValue, sideBlinkDurationValue, sideBlinkDurationValue];

  // Extract vertex label props (nested or flat)
  const finalShowVertexLabels = showVertexLabels !== undefined ? showVertexLabels : (vertexLabel.show !== undefined ? vertexLabel.show : true);
  const finalVertexLabels = vertexLabels || vertexLabel.labels || ['A', 'B', 'C'];
  const finalVertexLabelColor = vertexLabelColor || vertexLabel.color || '#000000';
  const finalVertexLabelFontSize = vertexLabelFontSize || vertexLabel.fontSize || '16gc';
  const finalVertexLabelFontStyle = vertexLabelFontStyle || vertexLabel.fontStyle || 'normal';
  const finalVertexLabelFontWeight = vertexLabelFontWeight || vertexLabel.fontWeight || 'bold';
  const finalVertexLabelFontFamily = vertexLabelFontFamily || vertexLabel.fontFamily || 'inherit';
  const finalVertexLabelTextDecoration = vertexLabelTextDecoration || vertexLabel.textDecoration || 'none';
  // Support both single number and array for offsets - can be a number or array [offsetA, offsetB, offsetC]
  const vertexLabelOffsetValue = vertexLabelOffset !== undefined ? vertexLabelOffset : (vertexLabel.offset !== undefined ? vertexLabel.offset : 20);
  const finalVertexLabelOffset = Array.isArray(vertexLabelOffsetValue) ? vertexLabelOffsetValue : [vertexLabelOffsetValue, vertexLabelOffsetValue, vertexLabelOffsetValue];
  // Support both single number and array for rotations - can be a number or array [rotationA, rotationB, rotationC]
  const vertexLabelRotationValue = vertexLabelRotation !== undefined ? vertexLabelRotation : (vertexLabel.rotation !== undefined ? vertexLabel.rotation : 0);
  const finalVertexLabelRotation = Array.isArray(vertexLabelRotationValue) ? vertexLabelRotationValue : [vertexLabelRotationValue, vertexLabelRotationValue, vertexLabelRotationValue];

  // Extract side label props (nested or flat) - with dynamic updates from step changes
  const [dynamicSideLabels, setDynamicSideLabels] = React.useState(sideLabels || sideLabel.labels || ['a', 'b', 'c']);
  const sideLabelBlinkValue = sideLabelBlink !== undefined ? sideLabelBlink : (sideLabel.blink !== undefined ? sideLabel.blink : false);
  const initialSideLabelBlink = Array.isArray(sideLabelBlinkValue) ? sideLabelBlinkValue : [sideLabelBlinkValue, sideLabelBlinkValue, sideLabelBlinkValue];
  const [dynamicSideLabelBlink, setDynamicSideLabelBlink] = React.useState(initialSideLabelBlink);
  
  const sideLabelColorValue = sideLabelColor || sideLabel.color || '#000000';
  const initialSideLabelColor = Array.isArray(sideLabelColorValue) ? sideLabelColorValue : [sideLabelColorValue, sideLabelColorValue, sideLabelColorValue];
  const [dynamicSideLabelColor, setDynamicSideLabelColor] = React.useState(initialSideLabelColor);
  
  // Reset dynamic state when component ID changes (page navigation) - moved after all initial values are defined
  React.useEffect(() => {
    // Reset all dynamic state to initial values when component ID changes
    // Recalculate initial values from current props to ensure they're correct for the new page
    const currentSideColorValue = sideColor || side.color || '#000000';
    const currentInitialSideColor = Array.isArray(currentSideColorValue) ? currentSideColorValue : [currentSideColorValue, currentSideColorValue, currentSideColorValue];
    
    const currentSideBlinkValue = sideBlink !== undefined ? sideBlink : (side.blink !== undefined ? side.blink : false);
    const currentInitialSideBlink = Array.isArray(currentSideBlinkValue) ? currentSideBlinkValue : [currentSideBlinkValue, currentSideBlinkValue, currentSideBlinkValue];
    
    const currentSideLabelBlinkValue = sideLabelBlink !== undefined ? sideLabelBlink : (sideLabel.blink !== undefined ? sideLabel.blink : false);
    const currentInitialSideLabelBlink = Array.isArray(currentSideLabelBlinkValue) ? currentSideLabelBlinkValue : [currentSideLabelBlinkValue, currentSideLabelBlinkValue, currentSideLabelBlinkValue];
    
    const currentSideLabelColorValue = sideLabelColor || sideLabel.color || '#000000';
    const currentInitialSideLabelColor = Array.isArray(currentSideLabelColorValue) ? currentSideLabelColorValue : [currentSideLabelColorValue, currentSideLabelColorValue, currentSideLabelColorValue];
    
    console.log('🔄 [RightAngleTriangle] Component ID changed to:', id, '- Resetting dynamic state');
    setDynamicSideColor(currentInitialSideColor);
    setDynamicSideBlink(currentInitialSideBlink);
    setDynamicSideLabels(sideLabels || sideLabel.labels || ['a', 'b', 'c']);
    setDynamicSideLabelBlink(currentInitialSideLabelBlink);
    setDynamicSideLabelColor(currentInitialSideLabelColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Reset when ID changes (new page = new component instance)

  // Listen for calculation step changes to update triangle labels
  React.useEffect(() => {
    const handleStepChange = (event) => {
      const { currentStepIndex, pageNumber } = event.detail;
      // Check if this is page 10 and step 5 (index 4, since steps are 0-based)
      // Also check if this triangle component is on page 10 (id contains 'page10')
      if (pageNumber === 10 && currentStepIndex === 4 && id && id.includes('page10')) {
        console.log('🔺 [RightAngleTriangle] Step 5 reached, updating sideLabel config for', id);
        setDynamicSideLabels(['20 m', '15 m', '25 m']);
        setDynamicSideLabelBlink([false, true, false]);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('calculationStepChanged', handleStepChange);
      return () => {
        window.removeEventListener('calculationStepChanged', handleStepChange);
      };
    }
  }, [id]);
  
  // Listen for quiz correct answer events to update triangle (for page 3, page 4, and page 5)
  React.useEffect(() => {
    const handleCorrectAnswer = (event) => {
      const { quizId: eventQuizId, pageNumber } = event.detail;
      
      // Handle page 3 triangle updates
      if (pageNumber === 3 && eventQuizId === 'page3-quiz' && id && id.includes('page3-right-triangle')) {
        console.log('🔺 [RightAngleTriangle] Correct answer clicked on page 3, updating triangle config for', id);
        // Update side colors: ['#FFFF00', '#FF6600', '#FF6600']
        setDynamicSideColor(['#FFFF00', '#FF6600', '#FF6600']);
        // Update side blink: [true, false, false]
        setDynamicSideBlink([true, false, false]);
        // Update side label colors: ['yellow', 'var(--color-orange)', 'var(--color-orange)']
        setDynamicSideLabelColor(['yellow', 'var(--color-orange)', 'var(--color-orange)']);
        // Update side label blink: [true, false, false]
        setDynamicSideLabelBlink([true, false, false]);
      }
      
      // Handle page 4 triangle updates
      if (pageNumber === 4 && eventQuizId === 'page4-quiz' && id && id.includes('page4-right-triangle')) {
        console.log('🔺 [RightAngleTriangle] Correct answer clicked on page 4, updating triangle config for', id);
        // Update side colors: ['#FF6600', '#FF6600', '#FFFF00']
        setDynamicSideColor(['#FF6600', '#FF6600', '#FFFF00']);
        // Update side blink: [false, false, true]
        setDynamicSideBlink([false, false, true]);
        // Update side label colors: ['var(--color-orange)', 'var(--color-orange)', 'yellow']
        setDynamicSideLabelColor(['var(--color-orange)', 'var(--color-orange)', 'yellow']);
        // Update side label blink: [false, false, true]
        setDynamicSideLabelBlink([false, false, true]);
      }
      
      // Handle page 5 triangle updates
      if (pageNumber === 5 && eventQuizId === 'page5-quiz' && id && id.includes('page5-right-triangle')) {
        console.log('🔺 [RightAngleTriangle] Correct answer clicked on page 5, updating triangle config for', id);
        // Update side colors: ['#FF6600', '#FFFF00', '#FF6600']
        setDynamicSideColor(['#FF6600', '#FFFF00', '#FF6600']);
        // Update side blink: [false, true, false]
        setDynamicSideBlink([false, true, false]);
        // Update side label colors: ['#FF6600', '#FFFF00', '#FF6600']
        setDynamicSideLabelColor(['#FF6600', '#FFFF00', '#FF6600']);
        // Update side label blink: [false, true, false]
        setDynamicSideLabelBlink([false, true, false]);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('quizCorrectAnswer', handleCorrectAnswer);
      return () => {
        window.removeEventListener('quizCorrectAnswer', handleCorrectAnswer);
      };
    }
  }, [id]);

  const finalShowSideLabels = showSideLabels !== undefined ? showSideLabels : (sideLabel.show !== undefined ? sideLabel.show : true);
  const finalSideLabels = dynamicSideLabels;
  // Use dynamic side label color
  const finalSideLabelColor = dynamicSideLabelColor;
  const finalSideLabelFontSize = sideLabelFontSize || sideLabel.fontSize || '14gc';
  const finalSideLabelFontStyle = sideLabelFontStyle || sideLabel.fontStyle || 'italic';
  const finalSideLabelFontWeight = sideLabelFontWeight || sideLabel.fontWeight || 'normal';
  const finalSideLabelFontFamily = sideLabelFontFamily || sideLabel.fontFamily || 'inherit';
  const finalSideLabelTextDecoration = sideLabelTextDecoration || sideLabel.textDecoration || 'none';
  // Support both single number and array for offsets
  const sideLabelOffsetValue = sideLabelOffset !== undefined ? sideLabelOffset : (sideLabel.offset !== undefined ? sideLabel.offset : 25);
  const finalSideLabelOffset = Array.isArray(sideLabelOffsetValue) ? sideLabelOffsetValue : [sideLabelOffsetValue, sideLabelOffsetValue, sideLabelOffsetValue];
  // Support both single number and array for rotations - can be a number or array [rotationA, rotationB, rotationC]
  const sideLabelRotationValue = sideLabelRotation !== undefined ? sideLabelRotation : (sideLabel.rotation !== undefined ? sideLabel.rotation : 0);
  const finalSideLabelRotation = Array.isArray(sideLabelRotationValue) ? sideLabelRotationValue : [sideLabelRotationValue, sideLabelRotationValue, sideLabelRotationValue];
  const finalSideLabelBackgroundColor = sideLabelBackgroundColor || sideLabel.backgroundColor || 'rgba(255, 255, 255, 0.8)';
  const finalSideLabelBorderColor = sideLabelBorderColor || sideLabel.borderColor || 'transparent';
  const finalSideLabelBorderWidth = sideLabelBorderWidth || sideLabel.borderWidth || '0';
  const finalSideLabelBorderRadius = sideLabelBorderRadius || sideLabel.borderRadius || '3px';
  const finalSideLabelPadding = sideLabelPadding || sideLabel.padding || '2px 6px';
  // Use dynamic blink state
  const finalSideLabelBlink = dynamicSideLabelBlink;
  const sideLabelBlinkDurationValue = sideLabelBlinkDuration !== undefined ? sideLabelBlinkDuration : (sideLabel.blinkDuration !== undefined ? sideLabel.blinkDuration : 1);
  const finalSideLabelBlinkDuration = Array.isArray(sideLabelBlinkDurationValue) ? sideLabelBlinkDurationValue : [sideLabelBlinkDurationValue, sideLabelBlinkDurationValue, sideLabelBlinkDurationValue];

  // Extract right angle marker props (nested or flat)
  const finalShowRightAngleMarker = showRightAngleMarker !== undefined ? showRightAngleMarker : (rightAngleMarker.show !== undefined ? rightAngleMarker.show : true);
  const finalRightAngleMarkerSize = rightAngleMarkerSize || rightAngleMarker.size || '15gc';
  const finalRightAngleMarkerColor = rightAngleMarkerColor || rightAngleMarker.color || '#000000';

  // Process GC units for styling
  const processGcProperty = (value, propertyName = 'fontSize') => {
    if (typeof GridCellFontUtils !== 'undefined' && GridCellFontUtils.processGcProperty) {
      return GridCellFontUtils.processGcProperty(value, propertyName);
    }
    return value;
  };

  // Create blink animation style
  const createBlinkAnimation = React.useCallback((duration) => {
    const animationId = `blink-${duration}-${Math.random().toString(36).substr(2, 9)}`;
    if (typeof document !== 'undefined' && !document.getElementById(animationId)) {
      const style = document.createElement('style');
      style.id = animationId;
      style.textContent = `
        @keyframes ${animationId} {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(style);
    }
    return animationId;
  }, []);

  // Get grid dimensions
  const getGridDimensions = () => {
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    return { gridRows, gridCols };
  };

  // Calculate vertex positions based on sides, multiplier, and right angle position
  const calculateVertices = React.useMemo(() => {
    const [a, b, c] = sides;
    const scaledA = a * multiplier; // Vertical side length in gc
    const scaledB = b * multiplier; // Horizontal side length in gc
    
    // Get container dimensions
    const [x1, y1, x2, y2] = coordinates;
    const containerWidth = x2 - x1;
    const containerHeight = y2 - y1;
    
    // Calculate gc unit size within container
    const { gridRows, gridCols } = getGridDimensions();
    const gcWidth = containerWidth / gridCols * 100; // Approximate gc to container ratio
    const gcHeight = containerHeight / gridRows * 100;
    
    // Define vertices based on right angle position
    // Vertex order: [rightAngleVertex, horizontalVertex, verticalVertex]
    let vertices;
    
    // Use percentage-based positioning within the container
    // We'll position the triangle to fit nicely within the container
    const padding = 50; // Padding from edges in grid units
    
    switch (rightAnglePosition) {
      case 'bottom-left':
        // Right angle at bottom-left
        // Horizontal side goes right, vertical side goes up
        vertices = [
          [x1 + padding, y2 - padding],                           // Right angle vertex (bottom-left)
          [x1 + padding + scaledB, y2 - padding],                 // Horizontal end (bottom-right)
          [x1 + padding, y2 - padding - scaledA]                  // Vertical end (top-left)
        ];
        break;
      case 'bottom-right':
        // Right angle at bottom-right
        // Horizontal side goes left, vertical side goes up
        vertices = [
          [x2 - padding, y2 - padding],                           // Right angle vertex (bottom-right)
          [x2 - padding - scaledB, y2 - padding],                 // Horizontal end (bottom-left)
          [x2 - padding, y2 - padding - scaledA]                  // Vertical end (top-right)
        ];
        break;
      case 'top-left':
        // Right angle at top-left
        // Horizontal side goes right, vertical side goes down
        vertices = [
          [x1 + padding, y1 + padding],                           // Right angle vertex (top-left)
          [x1 + padding + scaledB, y1 + padding],                 // Horizontal end (top-right)
          [x1 + padding, y1 + padding + scaledA]                  // Vertical end (bottom-left)
        ];
        break;
      case 'top-right':
        // Right angle at top-right
        // Horizontal side goes left, vertical side goes down
        vertices = [
          [x2 - padding, y1 + padding],                           // Right angle vertex (top-right)
          [x2 - padding - scaledB, y1 + padding],                 // Horizontal end (top-left)
          [x2 - padding, y1 + padding + scaledA]                  // Vertical end (bottom-right)
        ];
        break;
      default:
        // Default to bottom-left
        vertices = [
          [x1 + padding, y2 - padding],
          [x1 + padding + scaledB, y2 - padding],
          [x1 + padding, y2 - padding - scaledA]
        ];
    }
    
    return vertices;
  }, [sides, multiplier, coordinates, rightAnglePosition]);

  // Calculate container position from coordinates
  const containerPosition = React.useMemo(() => {
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      const [x1, y1, x2, y2] = coordinates;
      const { gridRows, gridCols } = getGridDimensions();
      
      const left = ((x1 - 1) / gridCols) * 100;
      const top = ((y1 - 1) / gridRows) * 100;
      const width = ((x2 - x1 + 1) / gridCols) * 100;
      const height = ((y2 - y1 + 1) / gridRows) * 100;
      
      return {
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        width: `${width.toFixed(2)}%`,
        height: `${height.toFixed(2)}%`
      };
    }
    return {};
  }, [coordinates]);

  // Container style
  const containerStyle = React.useMemo(() => ({
    position: 'absolute',
    ...containerPosition,
    zIndex: zIndex,
    boxSizing: 'border-box',
    pointerEvents: 'none',
    overflow: 'visible' // Allow labels to be visible outside container
  }), [containerPosition, zIndex]);

  // Handle triangle click
  const handleTriangleClick = React.useCallback((e) => {
    e.stopPropagation();
    if (onTriangleClick) {
      onTriangleClick({
        id,
        sides,
        multiplier,
        scaledSides: sides.map(s => s * multiplier),
        vertices: calculateVertices,
        rightAnglePosition
      });
    }
  }, [id, sides, multiplier, calculateVertices, rightAnglePosition, onTriangleClick]);

  // Handle vertex click
  const handleVertexClick = React.useCallback((vertexIndex, coords) => {
    if (onVertexClick) {
      onVertexClick(vertexIndex, coords, finalVertexLabels[vertexIndex]);
    }
  }, [onVertexClick, finalVertexLabels]);

  // Handle side click
  const handleSideClick = React.useCallback((sideIndex, startCoords, endCoords) => {
    if (onSideClick) {
      onSideClick(sideIndex, {
        label: finalSideLabels[sideIndex],
        length: sides[sideIndex] * multiplier,
        startCoords,
        endCoords
      });
    }
  }, [onSideClick, finalSideLabels, sides, multiplier]);

  // Render the three sides using SVG for precise control
  const renderSides = React.useMemo(() => {
    const [rightAngleVertex, horizontalVertex, verticalVertex] = calculateVertices;
    const { gridRows, gridCols } = getGridDimensions();
    
    // Get border width in pixels
    const borderWidthPx = parseFloat(processGcProperty(finalSideWidth, 'borderWidth')) || 3;
    
    // Calculate bounding box for SVG
    const allX = [rightAngleVertex[0], horizontalVertex[0], verticalVertex[0]];
    const allY = [rightAngleVertex[1], horizontalVertex[1], verticalVertex[1]];
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    
    // Add small padding for line width
    const padding = borderWidthPx;
    const svgWidth = maxX - minX + padding * 2;
    const svgHeight = maxY - minY + padding * 2;
    
    // Convert vertices to SVG coordinates (relative to minX, minY with padding)
    const toSvgCoords = (vertex) => {
      return [
        vertex[0] - minX + padding,
        vertex[1] - minY + padding
      ];
    };
    
    const svgRightAngle = toSvgCoords(rightAngleVertex);
    const svgHorizontal = toSvgCoords(horizontalVertex);
    const svgVertical = toSvgCoords(verticalVertex);
    
    // Determine stroke-dasharray for line style
    let strokeDasharray = 'none';
    if (finalSideStyle === 'dashed') {
      strokeDasharray = `${borderWidthPx * 2} ${borderWidthPx}`;
    } else if (finalSideStyle === 'dotted') {
      strokeDasharray = `0 ${borderWidthPx * 2}`;
    }
    
    // Side definitions - lines will stop exactly at vertices with strokeLinecap='butt'
    const sideDefinitions = [
      { start: svgRightAngle, end: svgVertical, index: 0 },
      { start: svgRightAngle, end: svgHorizontal, index: 1 },
      { start: svgHorizontal, end: svgVertical, index: 2 }
    ];
    
    // Calculate SVG container position
    const svgLeft = ((minX - padding - 1) / gridCols) * 100;
    const svgTop = ((minY - padding - 1) / gridRows) * 100;
    const svgWidthPercent = (svgWidth / gridCols) * 100;
    const svgHeightPercent = (svgHeight / gridRows) * 100;
    
    const svgStyle = {
      position: 'absolute',
      left: `${svgLeft.toFixed(2)}%`,
      top: `${svgTop.toFixed(2)}%`,
      width: `${svgWidthPercent.toFixed(2)}%`,
      height: `${svgHeightPercent.toFixed(2)}%`,
      pointerEvents: onSideClick ? 'auto' : 'none',
      cursor: onSideClick ? 'pointer' : 'default',
      zIndex: zIndex + 10
    };
    
    // Create line elements
    const lineElements = sideDefinitions.map((side) => {
      // Create individual blink animation for each side if needed
      const sideBlink = finalSideBlink[side.index];
      const sideBlinkDuration = finalSideBlinkDuration[side.index];
      const blinkAnimation = sideBlink ? createBlinkAnimation(sideBlinkDuration) : null;
      // Use individual color for each side
      const sideColor = finalSideColor[side.index];
      
      const lineStyle = {
        stroke: sideColor,
        strokeWidth: borderWidthPx,
        strokeLinecap: 'round', // Rounded line caps for smoother appearance
        strokeLinejoin: finalSideLineJoin, // Use configurable line join (round, miter, bevel)
        strokeMiterlimit: finalSideLineJoin === 'miter' ? 4 : undefined, // Limit miter extension
        strokeDasharray: strokeDasharray,
        pointerEvents: 'stroke',
        ...(blinkAnimation ? {
          animation: `${blinkAnimation} ${sideBlinkDuration}s ease-in-out infinite`
        } : {})
      };
      
      return React.createElement('line', {
        key: `side-${side.index}`,
        x1: side.start[0],
        y1: side.start[1],
        x2: side.end[0],
        y2: side.end[1],
        style: lineStyle,
        onClick: () => handleSideClick(side.index, 
          side.index === 0 ? rightAngleVertex : (side.index === 1 ? rightAngleVertex : horizontalVertex),
          side.index === 0 ? verticalVertex : (side.index === 1 ? horizontalVertex : verticalVertex)
        )
      });
    });
    
    // Add vertex markers if enabled
    const vertexElements = [];
    if (finalShowVertices) {
      const vertexSizePx = parseFloat(processGcProperty(finalVertexSize, 'width')) || 6;
      const vertices = [svgRightAngle, svgHorizontal, svgVertical];
      
      vertices.forEach((vertex, index) => {
        // Use the color of the side that starts at this vertex, or the vertex color
        const vertexSideColor = index === 0 ? finalSideColor[0] : (index === 1 ? finalSideColor[1] : finalSideColor[2]);
        const vColor = finalVertexColor !== finalSideColor[0] ? finalVertexColor : vertexSideColor;
        
        vertexElements.push(
          React.createElement('circle', {
            key: `vertex-${index}`,
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
      viewBox: `0 0 ${svgWidth} ${svgHeight}`,
      xmlns: 'http://www.w3.org/2000/svg',
      preserveAspectRatio: 'none'
    }, [...lineElements, ...vertexElements]);
  }, [calculateVertices, id, finalSideWidth, finalSideColor, finalSideStyle, finalSideLineJoin, finalShowVertices, finalVertexColor, finalVertexSize, finalSideBlink, finalSideBlinkDuration, zIndex, handleSideClick, onSideClick, createBlinkAnimation, processGcProperty]);

  // Render right angle marker (square)
  const renderRightAngleMarker = React.useMemo(() => {
    if (!finalShowRightAngleMarker) return null;

    const [rightAngleVertex, horizontalVertex, verticalVertex] = calculateVertices;
    const markerSize = parseFloat(processGcProperty(finalRightAngleMarkerSize, 'width'));
    
    // Determine the direction of the marker based on right angle position
    let offsetX = 0;
    let offsetY = 0;
    let rotation = 0;
    
    switch (rightAnglePosition) {
      case 'bottom-left':
        offsetX = 0;
        offsetY = -markerSize;
        rotation = 0;
        break;
      case 'bottom-right':
        offsetX = -markerSize;
        offsetY = -markerSize;
        rotation = 0;
        break;
      case 'top-left':
        offsetX = 0;
        offsetY = 0;
        rotation = 0;
        break;
      case 'top-right':
        offsetX = -markerSize;
        offsetY = 0;
        rotation = 0;
        break;
    }

    const { gridRows, gridCols } = getGridDimensions();
    const markerLeft = ((rightAngleVertex[0] - 1 + offsetX / 10) / gridCols) * 100;
    const markerTop = ((rightAngleVertex[1] - 1 + offsetY / 10) / gridRows) * 100;

    const markerStyle = {
      position: 'absolute',
      left: `${markerLeft.toFixed(2)}%`,
      top: `${markerTop.toFixed(2)}%`,
      width: `${markerSize}px`,
      height: `${markerSize}px`,
      border: `2px solid ${finalRightAngleMarkerColor}`,
      borderTop: rightAnglePosition.includes('top') ? `2px solid ${finalRightAngleMarkerColor}` : 'none',
      borderBottom: rightAnglePosition.includes('bottom') ? `2px solid ${finalRightAngleMarkerColor}` : 'none',
      borderLeft: rightAnglePosition.includes('left') ? `2px solid ${finalRightAngleMarkerColor}` : 'none',
      borderRight: rightAnglePosition.includes('right') ? `2px solid ${finalRightAngleMarkerColor}` : 'none',
      backgroundColor: 'transparent',
      pointerEvents: 'none',
      zIndex: zIndex + 15,
      boxSizing: 'border-box'
    };

    // Create a proper right angle marker using SVG for better control
    const svgSize = markerSize * 1.5;
    
    // Calculate the SVG position relative to the right angle vertex
    const svgLeft = ((rightAngleVertex[0] - 1) / gridCols) * 100;
    const svgTop = ((rightAngleVertex[1] - 1) / gridRows) * 100;

    const svgStyle = {
      position: 'absolute',
      left: `${svgLeft.toFixed(2)}%`,
      top: `${svgTop.toFixed(2)}%`,
      width: `${svgSize}px`,
      height: `${svgSize}px`,
      overflow: 'visible',
      pointerEvents: 'none',
      zIndex: zIndex + 15
    };

    // Determine path based on right angle position
    let pathD;
    const size = markerSize * 0.8;
    
    switch (rightAnglePosition) {
      case 'bottom-left':
        // Square in upper-right quadrant from vertex
        pathD = `M 0 ${-size} L ${size} ${-size} L ${size} 0`;
        break;
      case 'bottom-right':
        // Square in upper-left quadrant from vertex
        pathD = `M 0 ${-size} L ${-size} ${-size} L ${-size} 0`;
        break;
      case 'top-left':
        // Square in lower-right quadrant from vertex
        pathD = `M 0 ${size} L ${size} ${size} L ${size} 0`;
        break;
      case 'top-right':
        // Square in lower-left quadrant from vertex
        pathD = `M 0 ${size} L ${-size} ${size} L ${-size} 0`;
        break;
      default:
        pathD = `M 0 ${-size} L ${size} ${-size} L ${size} 0`;
    }

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
  }, [finalShowRightAngleMarker, calculateVertices, rightAnglePosition, finalRightAngleMarkerSize, finalRightAngleMarkerColor, zIndex]);

  // Render vertex labels
  const renderVertexLabels = React.useMemo(() => {
    if (!finalShowVertexLabels) return null;

    const [rightAngleVertex, horizontalVertex, verticalVertex] = calculateVertices;
    const { gridRows, gridCols } = getGridDimensions();
    const fontSize = processGcProperty(finalVertexLabelFontSize, 'fontSize');

    // Vertex label positions with offsets for better visibility
    // Use individual offsets for each label: [offsetA, offsetB, offsetC]
    const labelPositions = [
      { 
        coords: rightAngleVertex, 
        label: finalVertexLabels[0],
        offset: getVertexLabelOffset(rightAnglePosition, 'rightAngle', finalVertexLabelOffset[0])
      },
      { 
        coords: horizontalVertex, 
        label: finalVertexLabels[1],
        offset: getVertexLabelOffset(rightAnglePosition, 'horizontal', finalVertexLabelOffset[1])
      },
      { 
        coords: verticalVertex, 
        label: finalVertexLabels[2],
        offset: getVertexLabelOffset(rightAnglePosition, 'vertical', finalVertexLabelOffset[2])
      }
    ];

    return labelPositions.map((pos, index) => {
      const left = ((pos.coords[0] - 1 + pos.offset.x) / gridCols) * 100;
      const top = ((pos.coords[1] - 1 + pos.offset.y) / gridRows) * 100;

      const labelStyle = {
        position: 'absolute',
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        transform: `translate(-50%, -50%) rotate(${finalVertexLabelRotation[index]}deg)`,
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

      return React.createElement('div', {
        key: `vertex-label-${index}`,
        className: 'vertex-label',
        style: labelStyle,
        onClick: (e) => {
          e.stopPropagation();
          handleVertexClick(index, pos.coords);
        }
      }, pos.label);
    });
  }, [finalShowVertexLabels, calculateVertices, finalVertexLabels, finalVertexLabelColor, finalVertexLabelFontSize, finalVertexLabelFontStyle, finalVertexLabelFontWeight, finalVertexLabelFontFamily, finalVertexLabelTextDecoration, finalVertexLabelOffset, finalVertexLabelRotation, rightAnglePosition, zIndex, handleVertexClick, onVertexClick]);

  // Helper function to get vertex label offset based on position
  function getVertexLabelOffset(rightAnglePos, vertexType, offset) {
    const offsets = {
      'bottom-left': {
        rightAngle: { x: -offset, y: offset },
        horizontal: { x: offset, y: offset },
        vertical: { x: -offset, y: -offset }
      },
      'bottom-right': {
        rightAngle: { x: offset, y: offset },
        horizontal: { x: -offset, y: offset },
        vertical: { x: offset, y: -offset }
      },
      'top-left': {
        rightAngle: { x: -offset, y: -offset },
        horizontal: { x: offset, y: -offset },
        vertical: { x: -offset, y: offset }
      },
      'top-right': {
        rightAngle: { x: offset, y: -offset },
        horizontal: { x: -offset, y: -offset },
        vertical: { x: offset, y: offset }
      }
    };
    
    return offsets[rightAnglePos]?.[vertexType] || { x: 0, y: 0 };
  }

  // Render side labels
  const renderSideLabels = React.useMemo(() => {
    if (!finalShowSideLabels) return null;

    const [rightAngleVertex, horizontalVertex, verticalVertex] = calculateVertices;
    const { gridRows, gridCols } = getGridDimensions();
    const fontSize = processGcProperty(finalSideLabelFontSize, 'fontSize');

    // Calculate midpoints and label positions for each side
    // Use individual offsets for each side label
    const sideMidpoints = [
      { 
        // Side a (vertical): midpoint between right angle and vertical vertex
        coords: [
          (rightAngleVertex[0] + verticalVertex[0]) / 2,
          (rightAngleVertex[1] + verticalVertex[1]) / 2
        ],
        label: finalSideLabels[0],
        offset: getSideLabelOffset(rightAnglePosition, 'vertical', finalSideLabelOffset[0])
      },
      { 
        // Side b (horizontal): midpoint between right angle and horizontal vertex
        coords: [
          (rightAngleVertex[0] + horizontalVertex[0]) / 2,
          (rightAngleVertex[1] + horizontalVertex[1]) / 2
        ],
        label: finalSideLabels[1],
        offset: getSideLabelOffset(rightAnglePosition, 'horizontal', finalSideLabelOffset[1])
      },
      { 
        // Side c (hypotenuse): midpoint between horizontal and vertical vertices
        coords: [
          (horizontalVertex[0] + verticalVertex[0]) / 2,
          (horizontalVertex[1] + verticalVertex[1]) / 2
        ],
        label: finalSideLabels[2],
        offset: getSideLabelOffset(rightAnglePosition, 'hypotenuse', finalSideLabelOffset[2])
      }
    ];

    return sideMidpoints.map((pos, index) => {
      const left = ((pos.coords[0] - 1 + pos.offset.x) / gridCols) * 100;
      const top = ((pos.coords[1] - 1 + pos.offset.y) / gridRows) * 100;

      // Create individual blink animation for each side label if needed
      const labelBlink = finalSideLabelBlink[index];
      const labelBlinkDuration = finalSideLabelBlinkDuration[index];
      const blinkAnimation = labelBlink ? createBlinkAnimation(labelBlinkDuration) : null;
      // Use individual color for each side label
      const labelColor = finalSideLabelColor[index];

      const labelStyle = {
        position: 'absolute',
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        transform: `translate(-50%, -50%) rotate(${finalSideLabelRotation[index]}deg)`,
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
        transformOrigin: 'center center',
        ...(blinkAnimation ? {
          animation: `${blinkAnimation} ${labelBlinkDuration}s ease-in-out infinite`
        } : {})
      };

      return React.createElement('div', {
        key: `side-label-${index}`,
        className: 'side-label',
        style: labelStyle
      }, pos.label);
    });
  }, [finalShowSideLabels, calculateVertices, finalSideLabels, finalSideLabelColor, finalSideLabelFontSize, finalSideLabelFontStyle, finalSideLabelFontWeight, finalSideLabelFontFamily, finalSideLabelTextDecoration, finalSideLabelOffset, finalSideLabelRotation, finalSideLabelBackgroundColor, finalSideLabelBorderColor, finalSideLabelBorderWidth, finalSideLabelBorderRadius, finalSideLabelPadding, finalSideLabelBlink, finalSideLabelBlinkDuration, rightAnglePosition, zIndex, createBlinkAnimation]);

  // Helper function to get side label offset based on position
  function getSideLabelOffset(rightAnglePos, sideType, offset) {
    const offsets = {
      'bottom-left': {
        vertical: { x: -offset, y: 0 },
        horizontal: { x: 0, y: offset },
        hypotenuse: { x: offset, y: -offset }
      },
      'bottom-right': {
        vertical: { x: offset, y: 0 },
        horizontal: { x: 0, y: offset },
        hypotenuse: { x: -offset, y: -offset }
      },
      'top-left': {
        vertical: { x: -offset, y: 0 },
        horizontal: { x: 0, y: -offset },
        hypotenuse: { x: offset, y: offset }
      },
      'top-right': {
        vertical: { x: offset, y: 0 },
        horizontal: { x: 0, y: -offset },
        hypotenuse: { x: -offset, y: offset }
      }
    };
    
    return offsets[rightAnglePos]?.[sideType] || { x: 0, y: 0 };
  }

  // Build all children
  const children = React.useMemo(() => {
    const elements = [];
    
    if (renderSides) elements.push(renderSides); // Single SVG element, not an array
    if (renderRightAngleMarker) elements.push(renderRightAngleMarker);
    if (renderVertexLabels) {
      if (Array.isArray(renderVertexLabels)) {
        elements.push(...renderVertexLabels);
      } else {
        elements.push(renderVertexLabels);
      }
    }
    if (renderSideLabels) {
      if (Array.isArray(renderSideLabels)) {
        elements.push(...renderSideLabels);
      } else {
        elements.push(renderSideLabels);
      }
    }
    
    return elements;
  }, [renderSides, renderRightAngleMarker, renderVertexLabels, renderSideLabels]);

  return React.createElement('div', {
    id: id || `right-angle-triangle-${elementName || 'default'}`,
    className: 'right-angle-triangle-component',
    style: containerStyle,
    onClick: onTriangleClick ? handleTriangleClick : undefined,
    'data-element-name': elementName,
    'data-page': currentPage,
    'data-sides': sides.join(','),
    'data-multiplier': multiplier,
    'data-right-angle-position': rightAnglePosition
  }, children);
});

// Right Angle Triangle Element Configuration
const RightAngleTriangleElement = {
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
    
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('rightAngleTriangle', (props, elementId) => {
      return React.createElement(RightAngleTriangleComponent, props);
    })
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.RightAngleTriangleComponent = {
    RightAngleTriangleComponent,
    RightAngleTriangleElement
  };
}

console.log('✅ RightAngleTriangleComponent loaded successfully');

